import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import Guest from '@/models/guest';
import Event from '@/models/event';
import connectDB from '@/lib/db';

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const guest = await Guest.findById(id).populate('eventId');
    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    // Generate QR data with some security
    const qrData = JSON.stringify({
      guestId: guest._id,
      eventId: guest.eventId._id,
      timestamp: Date.now()
    });

    // QR Code options
    const qrOptions = {
      errorCorrectionLevel: 'H', // High error correction
      margin: 2,
      width: 500,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    };

    // Create canvas
    const canvas = createCanvas(qrOptions.width, qrOptions.width);
    const ctx = canvas.getContext('2d');

    // Generate QR code to canvas
    await QRCode.toCanvas(canvas, qrData, qrOptions);

    // Add logo in center (replace with your logo path)
    try {
      const logoPath = './public/logo.png'; // Your logo path in public folder
      const logo = await loadImage(logoPath);
      
      const logoSize = qrOptions.width * 0.2; // Logo size as 20% of QR
      const center = (qrOptions.width - logoSize) / 2;
      
      // Draw white background for logo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(center, center, logoSize, logoSize);
      
      // Draw logo
      ctx.drawImage(logo, center, center, logoSize, logoSize);
    } catch (logoError) {
      console.warn("Could not load logo, generating QR without it");
    }

    // Convert to PNG buffer
    const buffer = canvas.toBuffer('image/png');

    // Save QR code to guest record if not already saved
    if (!guest.qrCode) {
      guest.qrCode = `data:image/png;base64,${buffer.toString('base64')}`;
      await guest.save();
    }

    // Return as image
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="${guest.name}-qr.png"`
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}