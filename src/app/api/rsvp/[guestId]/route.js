import { NextResponse } from 'next/server';
import Guest from '@/models/guest';
import RSVPResponse from '@/models/rsvp-response';
import connectDB from '@/lib/db';

export async function POST(request, { params }) {
  await connectDB();
  const { guestId } = params;

  try {
    const guest = await Guest.findById(guestId);
    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    const body = await request.json();
    const { response, message, plusOnesAttending, dietaryRestrictions, customAnswers } = body;

    // Update guest status based on response
    const statusMap = {
      'attending': 'confirmed',
      'not_attending': 'rejected',
      'maybe': 'pending'
    };
    guest.status = statusMap[response] || 'pending';
    await guest.save();

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || request.ip;
    const userAgent = request.headers.get('user-agent');

    // Create RSVP response
    const rsvpResponse = new RSVPResponse({
      guestId,
      eventId: guest.eventId,
      response,
      message,
      plusOnesAttending,
      dietaryRestrictions,
      customAnswers,
      ipAddress,
      userAgent
    });

    await rsvpResponse.save();

    return NextResponse.json(
      { success: true, guest, rsvpResponse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}