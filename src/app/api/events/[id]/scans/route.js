import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Event from '@/models/event';
import ScanLog from '@/models/scan-log';
import Guest from '@/models/guest';
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);
  const { id: eventId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify event belongs to user
    const event = await Event.findOne({ _id: eventId, host: userId });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Get all scans for this event with guest details
    const scans = await ScanLog.find({ eventId })
      .populate('guestId', 'name phone guests')
      .sort({ scanTime: -1 });

    // Get summary statistics
    const totalGuests = await Guest.countDocuments({ eventId, status: 'confirmed' });
    const totalScans = scans.length;
    const uniqueScans = [...new Set(scans.map(s => s.guestId._id.toString()))].length;

    // Group by hour for chart
    const hourlyScans = scans.reduce((acc, scan) => {
      const hour = new Date(scan.scanTime).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      summary: {
        totalGuests,
        totalScans,
        uniqueScans,
        scanRate: totalGuests > 0 ? (uniqueScans / totalGuests * 100).toFixed(1) + '%' : '0%'
      },
      hourlyScans,
      scans: scans.map(scan => ({
        _id: scan._id,
        scanTime: scan.scanTime,
        guest: scan.guestId,
        device: scan.device,
        location: scan.location
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}