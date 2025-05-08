import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Event from "@/models/event";
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);

  try {
    const event = await Event.findOne({
      customSlug: params.slug,
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