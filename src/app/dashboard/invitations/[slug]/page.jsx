import React from 'react';
import { auth } from '@clerk/nextjs/server';
import QRCodeWithLogo from '@/components/system/qr-code-with-logo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit2 } from 'lucide-react';

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

  const qrCodeUrl = `https://ezinvito.webrizen.com/event/${event.customSlug}?key=${event.qrSettings.secretKey}`;

  return (
    <>
      <div className="w-full">
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border overflow-hidden transition-colors duration-300">
          <div className="bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-700 from-zinc-100 to-zinc-200 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white text-zinc-950">{event.title}</h2>
                <p className="dark:text-purple-100 text-zinc-500">{event.description}</p>
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
                    {event.location.onlineEvent ? 'Online Event' : 'In-Person Event'}
                  </p>
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
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">Event QR Code</h3>
                {event.qrSettings.enabled ? (
                  <div className="flex flex-col items-center">
                      <QRCodeWithLogo url={qrCodeUrl} expiresAt={event.qrSettings.expiresAt} eventName={event.title} eventDescription={event.description} attendee="Akash & his wife" host={event.host} eventStartTime={event.date} eventId={event._id} location={event} />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-4">QR codes are disabled for this event</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-4 gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-full flex items-center justify-center cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Event Details</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-full flex items-center justify-center cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Manage Participants</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-full flex items-center justify-center cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Customize Invitation</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-full flex items-center justify-center cursor-pointer p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Event</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}