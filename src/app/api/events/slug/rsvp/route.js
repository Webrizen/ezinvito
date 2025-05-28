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

export async function POST(request) {
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

        // Check if current time is within allowed check-in window
        const now = new Date();
        const oneHourBeforeEvent = new Date(event.date);
        oneHourBeforeEvent.setHours(oneHourBeforeEvent.getHours() - 1);

        if (now < oneHourBeforeEvent) {
            return NextResponse.json(
                { 
                    error: 'Check-in not available yet',
                    message: `Check-in opens at ${oneHourBeforeEvent.toLocaleString()}`
                },
                { status: 403 }
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

        // Update check-in status if not already checked in
        if (rsvp.checkedIn?.status) {
            return NextResponse.json(
                { 
                    message: 'Already checked in',
                    rsvp,
                    event 
                },
                { status: 200 }
            );
        }

        const updatedRsvp = await Rsvp.findByIdAndUpdate(
            rsvpId,
            {
                'checkedIn.status': true,
                'checkedIn.at': new Date()
            },
            { new: true }
        );

        return NextResponse.json(
            { 
                message: 'Check-in successful', 
                rsvp: updatedRsvp,
                event 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error during check-in:', error);
        return NextResponse.json(
            { error: 'Failed to process check-in' },
            { status: 500 }
        );
    }
}