import { NextResponse } from 'next/server';
import Event from "@/models/event";
import Rsvp from "@/models/rsvp-response";
import connectDB from '@/lib/db';

export async function GET(request) {
    await connectDB();

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    const rsvpId = url.searchParams.get('rsvpId');

    if (!slug || !rsvpId) {
        return NextResponse.json(
            { error: 'Both slug and rsvpId are required' },
            { status: 400 }
        );
    }
    try {
        const event = await Event.findOne({ customSlug: slug });
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }
        // Check if the RSVP ID is valid
        const rsvp = await Rsvp.findOne({ _id: rsvpId, eventId: event._id });
        if (!rsvp) {
            return NextResponse.json(
                { error: 'RSVP not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'RSVP details retrieved', rsvp, event },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching RSVP details:', error);
        return NextResponse.json(
            { error: 'Failed to get RSVP details' },
            { status: 500 }
        );
    }
}