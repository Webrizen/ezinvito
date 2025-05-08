import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import Event from "@/models/event";
import connectDB from '@/lib/db';

export async function POST(request) {
  await connectDB();
  const { userId } = getAuth(request);
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Generate custom URL if not provided
    if (!body.customSlug) {
      body.customSlug = generateCustomUrl(body.title);
    }
    
    const event = new Event({ ...body, host: userId });
    await event.save();
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 400 }
    );
  }
}

function generateCustomUrl(title) {
  return title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(2, 7);
}

export async function GET(request) {
    await connectDB();
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const events = await Event.find({ host: userId });
      return NextResponse.json(events);
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }
  