
import { NextResponse } from 'next/server';
import Event from '@/models/event';
import Rsvp from '@/models/rsvp-response';
import connectDB from '@/lib/db';

export async function POST(request, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    // 1. Validate event exists and can accept RSVPs
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // 2. Parse and validate request body
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // 3. Check for existing RSVP from this email
    const existingRsvp = await Rsvp.findOne({
      eventId: id,
      email: body.email.toLowerCase()
    });

    if (existingRsvp) {
      return NextResponse.json(
        { error: 'You have already submitted an RSVP for this event' },
        { status: 409 }
      );
    }

    // 4. Create and save new RSVP
    const newRsvp = new Rsvp({
      eventId: id,
      name: body.name,
      email: body.email.toLowerCase(), // normalize email
      phone: body.phone || undefined, // only store if provided
      attendanceStatus: body.attendanceStatus || 'going',
      guests: body.guests || [],
      respondedAt: new Date()
    });

    await newRsvp.save();

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'RSVP submitted successfully',
        rsvp: newRsvp
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your RSVP',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    // 1. Validate the event exists and get event data
    const event = await Event.findById(id).select('-__v');
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // 2. Get all RSVPs for this event
    const rsvps = await Rsvp.find({
      eventId: id
    }).select('-__v');

    if (!rsvps || rsvps.length === 0) {
      return NextResponse.json(
        { 
          success: true,
          message: 'No RSVPs found for this event',
          event: event,
          rsvps: []
        },
        { status: 200 }
      );
    }

    // 3. Return both event and RSVP information
    return NextResponse.json(
      {
        success: true,
        event: event,
        rsvps: rsvps
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching event and RSVPs:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while fetching event information',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}