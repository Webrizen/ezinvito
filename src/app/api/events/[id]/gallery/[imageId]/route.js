import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import cloudinary from '@/lib/cloudinary';
import galleryItem from '@/models/gallery-item';
import connectDB from '@/lib/db';

export async function DELETE(request, { params }) {
  await connectDB();
  const { userId } = getAuth(request);
  const { imageId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const galleryItems = await galleryItem.findOne({
      _id: imageId,
      $or: [
        { uploader: userId },
        { eventId: { $exists: true } } // In reality, you'd check if user is event host
      ]
    });

    if (!galleryItems) {
      return NextResponse.json({ error: "Image not found or unauthorized" }, { status: 404 });
    }

    // Extract public ID from Cloudinary URL
    const urlParts = galleryItems.url.split('/');
    const publicId = urlParts
      .slice(urlParts.indexOf('upload') + 1)
      .join('/')
      .replace(/\.[^/.]+$/, ''); // Remove file extension

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await galleryItem.deleteOne({ _id: imageId });

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete image" },
      { status: 500 }
    );
  }
}