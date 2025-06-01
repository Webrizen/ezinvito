import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

import Event from "@/models/event";
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  const { userId } = getAuth(request);

  try {
    const event = await Event.findOne({
      _id: id,
      host: userId
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);
const { id } = await params;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, host: userId },
      { $set: body },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
  }
  const { userId } = getAuth(request);
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: id,
      userId: userId
    });
    
    if (!deletedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}