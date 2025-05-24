import React from 'react';
import { auth } from '@clerk/nextjs/server';
import QRCodeWithLogo from '@/components/system/qr-code-with-logo';
import EventQuickActions from '@/components/system/event-quick-actions';

export default async function Page({ params }) {
  const { slug } = await params;
  const { userId } = await auth();
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events/slug/${slug}?userId=${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });
  const event = await response.json();

  if (event.error || !response.ok) {
    return (
      <div className="text-red-500 text-center mt-10 dark:text-red-400">
        {event.error || 'Error fetching'}
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const qrCodeUrl = `https://ezinvito.webrizen.com/event/${event.customSlug}/verify?key=${event.qrSettings.secretKey}`;

  return (
    <>
      <div className="w-full">
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-700 from-zinc-100 to-zinc-200 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white text-zinc-950">{event.title}</h2>
                <p className="dark:text-purple-100 text-zinc-500 max-w-3xl">{event.description}</p>
              </div>
              <div className="dark:bg-white/20 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="font-semibold">{event.privacy === 'public' ? 'Public Event' : 'Private Event'}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Host & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Hosted By</h3>
                  <p className="text-lg font-medium text-zinc-800 dark:text-white">{event.host}</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Event Type</h3>
                  <p className="text-lg font-medium text-zinc-800 dark:text-white">
                    {(event.location.onlineEvent ? 'Online Event' : 'In-Person Event') + ` - ${event.eventType}`}                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Start Date</h3>
                  <p className="text-lg font-medium text-zinc-800 dark:text-white">{formatDate(event.date)}</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">End Date</h3>
                  <p className="text-lg font-medium text-zinc-800 dark:text-white">{formatDate(event.endDate)}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">RSVP Deadline</h3>
                  <p className="text-lg font-medium text-zinc-800 dark:text-white">{formatDate(event.rsvpDeadline)}</p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Custom URL</h3>
                  <a href={`https://ezinvito.webrizen.com/event/${event.customSlug}`} target="_blank" rel="noopener noreferrer" className='text-lg font-medium text-blue-600 dark:text-blue-400 w-full flex white-space-nowrap overflow-hidden text-ellipsis'>
                    ezinvito.webrizen.com/event/{event.customSlug}
                  </a>
                </div>
              </div>

              {/* Features */}
              <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Enabled Features</h3>
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${event.galleryEnabled
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-200'
                      }`}
                  >
                    {event.galleryEnabled ? 'Gallery Enabled' : 'Gallery Disabled'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${event.guestbookEnabled
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-200'
                      }`}
                  >
                    {event.guestbookEnabled ? 'Guestbook Enabled' : 'Guestbook Disabled'}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${event.qrSettings.enabled
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-200'
                      }`}
                  >
                    {event.qrSettings.enabled ? 'QR Codes Enabled' : 'QR Codes Disabled'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {event.invitationDesign.templateId} Invitation Design
                  </span>
                </div>
              </div>

              {/* System Info */}
              <div className="bg-zinc-50 dark:bg-zinc-800 p-5 rounded-xl border border-zinc-100 dark:border-zinc-600 transition-colors duration-300">
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Event ID</p>
                    <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate">{event._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">User ID</p>
                    <p className="text-sm font-mono text-zinc-700 dark:text-zinc-300 truncate">{event.userId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Created</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{formatDate(event.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Last Updated</p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{formatDate(event.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - QR Code & Actions */}
            <div className="space-y-6">
              {/* QR Code */}
              <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4 text-center">Event QR Code</h3>
                {event.qrSettings.enabled ? (
                  <div className="flex flex-col items-center">
                    <QRCodeWithLogo url={qrCodeUrl} expiresAt={event.qrSettings.expiresAt} eventName={event.title} eventDescription={event.description} attendee="Demo User" host={event.host} eventStartTime={event.date} eventId={event._id} location={event.location} />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-4">QR codes are disabled for this event</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
             <EventQuickActions slug={slug} eventId={event._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}