import React from 'react';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { QrCode, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '@/lib/format-date';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '@/assets/logo.png';

export default async function page() {
  const { userId } = await auth();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?userId=${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const events = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Event QR Codes
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            QR codes for your event check-ins
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invitations">
            Manage Events
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400">No events with QR codes found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            event.qrSettings?.enabled && (
              <div key={event._id} className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-center">{event.title}</h3>
                <div className="relative">
                  <QRCodeSVG
                    value={JSON.stringify({
                      eventId: event._id,
                      secret: event.qrSettings.secretKey
                    })}
                    size={200}
                    level="H"
                    includeMargin={false}
                    className="border border-zinc-200 rounded-md p-2"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white p-1 rounded-md">
                      <Image 
                        src={Logo} 
                        alt="Logo"
                        placeholder='blur'
                        width={40} 
                        height={40} 
                        className="w-10 h-10 object-contain invert"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                  Expires: {formatDate(event.qrSettings.expiresAt)}
                </p>
                 <Button asChild variant="ghost" className="mt-3 w-full">
                  <Link href={`/dashboard/check-ins/${event._id}`} className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    View Check-ins
                  </Link>
                </Button>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}