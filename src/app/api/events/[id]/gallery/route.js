import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import cloudinary from '@/lib/cloudinary';
import galleryItem from '@/models/gallery-item';
import Event from '@/models/event';
import connectDB from '@/lib/db';

export async function POST(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);
  const { id: eventId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Verify event exists and belongs to user
    const event = await Event.findOne({ _id: eventId, host: userId });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const caption = formData.get('caption') || '';
    const tags = formData.get('tags') ? formData.get('tags').split(',') : [];

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `events/${eventId}/gallery`,
          resource_type: 'auto',
          transformation: [
            { width: 1000, height: 1000, crop: 'limit', quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(fileBuffer);
    });

    // Create thumbnail URL
    const thumbnailUrl = uploadResult.url.replace('/upload/', '/upload/w_300,h_300,c_fill/');

    // Save to database
    const galleryItems = new galleryItem({
      eventId,
      uploader: userId,
      type: uploadResult.resource_type === 'video' ? 'video' : 'image',
      url: uploadResult.secure_url,
      thumbnailUrl,
      caption,
      tags,
      metadata: {
        width: uploadResult.width,
        height: uploadResult.height,
        size: uploadResult.bytes,
        format: uploadResult.format,
        duration: uploadResult.duration
      }
    });

    await galleryItems.save();

    return NextResponse.json(galleryItems, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || "Failed to upload media" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  await connectDB();
  const { id: eventId } = params;
  const { searchParams } = new URL(request.url);
  const approvedOnly = searchParams.get('approved') === 'true';

  try {
    const query = { eventId };
    if (approvedOnly) query.approved = true;

    const galleryItems = await galleryItem.find(query)
      .sort({ createdAt: -1 })
      .populate('uploader', 'firstName lastName');

    return NextResponse.json(galleryItems);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}