import { NextResponse } from 'next/server';
import Event from "@/models/event";
import connectDB from '@/lib/db';
import crypto from 'crypto';
import { auth } from "@clerk/nextjs/server";


export async function POST(request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  
  try {
    const body = await request.json();
    // Generate custom URL if not provided
    if (!body.customSlug) {
      body.customSlug = generateCustomUrl(body.title);
    }

    // Create event with both userId (from auth) and hostName (from form)
    const event = new Event({
      ...body,
      userId,
      qrSettings: {
        enabled: body.qrcodeEnabled !== false, 
        expiresAt: body.endDate || body.date,
        secretKey: crypto.randomBytes(32).toString('hex')
      }
    });
    await event.save();

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.customSlug) {
      return NextResponse.json(
        { error: "This custom URL is already taken" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message }, 
      { status: 400 }
    );
  }
}

export async function GET(request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized to access data!" }, { status: 401 });
  }
  
  await connectDB();

  try {
    const events = await Event.find({ userId });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

function generateCustomUrl(title) {
  return title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '') 
    .substring(0, 50) + '-' + Math.random().toString(36).substring(2, 7);
}