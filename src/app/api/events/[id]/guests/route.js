import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Event from '@/models/event';
import Guest from '@/models/guest';
import connectDB from '@/lib/db';

export async function POST(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);
  const { id } = params;
  const eventId  = id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify event exists and belongs to user
    const event = await Event.findOne({ _id: eventId, host: userId });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, phone, guests = 1 } = body;

    // Check if guest with this phone already exists for event
    const existingGuest = await Guest.findOne({ eventId, phone });
    if (existingGuest) {
      return NextResponse.json(
        { error: "Guest with this phone already exists for this event" },
        { status: 400 }
      );
    }

    const newGuest = new Guest({
      eventId,
      name,
      phone,
      guests,
      status: 'pending'
    });

    await newGuest.save();

    return NextResponse.json(newGuest, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);
  const { id } = params;
  const eventId  = id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify event exists and belongs to user
    const event = await Event.findOne({ _id: eventId, host: userId });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const guests = await Guest.find({ eventId });
    return NextResponse.json(guests);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}