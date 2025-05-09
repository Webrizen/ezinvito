import { NextResponse } from 'next/server';
import Guest from '@/models/guest';
import RSVPResponse from '@/models/rsvp-response';
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const { phone } = params;

  try {
    // Find all guests with this phone number
    const guests = await Guest.find({ phone });

    if (!guests || guests.length === 0) {
      return NextResponse.json(
        { error: "No RSVPs found for this phone number" },
        { status: 404 }
      );
    }

    // Get RSVP responses for these guests
    const guestIds = guests.map(g => g._id);
    const responses = await RSVPResponse.find({ guestId: { $in: guestIds } });

    // Combine guest and response data
    const results = guests.map(guest => {
      const response = responses.find(r => r.guestId.equals(guest._id));
      return {
        eventId: guest.eventId,
        guestId: guest._id,
        name: guest.name,
        phone: guest.phone,
        status: guest.status,
        rsvpResponse: response || null
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}