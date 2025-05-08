import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Test database connection
    const result = await db.command({ ping: 1 });    
    return NextResponse.json({
      status: 200,
      message: "Pinged your deployment. You successfully connected to MongoDB!",
      result
    });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      message: "Error connecting to MongoDB",
      error: e.message
    });
  }
}