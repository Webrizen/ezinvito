import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Event from "@/models/event";
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const { userId: clerkUserId } = await auth();

  const url = new URL(request.url);
  const userIdFromQuery = url.searchParams.get('userId');

  const userId = clerkUserId || userIdFromQuery;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const event = await Event.findOne({
      customSlug: slug,
      userId: userId
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