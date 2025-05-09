import { NextResponse } from 'next/server';
import Guest from '@/models/guest';
import Event from '@/models/event';
import ScanLog from '@/models/scan-log';
import connectDB from '@/lib/db';

export async function POST(request) {
  await connectDB();

  try {
    const { qrData, deviceInfo, location } = await request.json();
    
    // Parse QR data
    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid QR code data" },
        { status: 400 }
      );
    }

    const { guestId, eventId } = parsedData;

    // Verify guest exists and is confirmed
    const guest = await Guest.findOne({
      _id: guestId,
      eventId,
      status: 'confirmed'
    }).populate('eventId');

    if (!guest) {
      return NextResponse.json(
        { error: "Invalid guest or not confirmed" },
        { status: 404 }
      );
    }

    // Check if event is happening now
    const now = new Date();
    if (now < guest.eventId.date || now > guest.eventId.endDate) {
      return NextResponse.json(
        { 
          error: "Event is not currently active",
          eventTime: {
            start: guest.eventId.date,
            end: guest.eventId.endDate,
            currentTime: now
          }
        },
        { status: 400 }
      );
    }

    // Log the scan
    const scanLog = new ScanLog({
      eventId,
      guestId,
      device: deviceInfo || { type: 'unknown' },
      location: location || null
    });
    await scanLog.save();

    // Return guest and event details
    return NextResponse.json({
      valid: true,
      guest: {
        name: guest.name,
        phone: guest.phone,
        guests: guest.guests
      },
      event: {
        title: guest.eventId.title,
        date: guest.eventId.date,
        endDate: guest.eventId.endDate,
        location: guest.eventId.location
      },
      scanTime: scanLog.scanTime
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}