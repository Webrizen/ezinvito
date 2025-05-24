import { NextResponse } from 'next/server';
import Event from "@/models/event";
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  try {
    const event = await Event.findOne({
      customSlug: slug
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