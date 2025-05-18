import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { Templates } from '@/enums/template';
import { CalendarDays, UserRound, QrCode, Globe, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Page() {
  const { userId } = await auth();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?userId=${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const events = await response.json();

  if (events.error) {
    return <div className="text-red-500 text-center mt-10">{events.error}</div>;
  }

  if (!response.ok) {
    return <div className="text-red-500 text-center mt-10">Error fetching</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Your Invitations
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Manage all your invitations in one place and keep track of who's coming.
          </p>
        </div>
        <Button variant="outline" asChild size="lg">
            <Link href="/dashboard/invitations/create-invitation">
                Create Invitation
            </Link>
        </Button>
      </div>

      {/* Events List */}
      <div className="mt-10">
        {!events || events.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg">
            <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">No events yet</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Create your first invitation to get started</p>
            <Link
              href="/dashboard/invitations/create-invitation"
              className="inline-block mt-4 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
            >
              Create Invitation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const template = Templates.find(t => t.id === event.invitationDesign?.templateId);
              const templateLabel = template?.label || 'Unknown';

              return (
                <div
                  key={event._id || event.customSlug}
                  className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {template?.image && (
                    <div className="h-40 overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                      <img
                        src={template.image}
                        alt={template.label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <Link href={`/dashboard/invitations/${event.customSlug || event._id}`} className="block">
                    <div className="p-5">
                      {/* Event Title */}
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 line-clamp-1">
                        {event.title}
                      </h3>
                      
                      {/* Event Details */}
                      <div className="space-y-3">
                        {/* Host */}
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <UserRound className="h-4 w-4" />
                          <span>Hosted by <span className="font-medium">{event.host}</span></span>
                        </div>
                        
                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <CalendarDays className="h-4 w-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                            {event.endDate && (
                              <>
                                {' - '}
                                {new Date(event.endDate).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </>
                            )}
                          </span>
                        </div>
                        
                        {/* Template */}
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="inline-block w-4 h-4 rounded-sm" style={{ backgroundColor: template?.color || '#999' }}></span>
                          <span className="capitalize">{templateLabel}</span>
                        </div>
                      </div>
                      
                      {/* Badges */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.qrSettings?.enabled && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                            <QrCode className="h-3 w-3" />
                            QR Code
                          </span>
                        )}
                        
                        {event.location?.onlineEvent && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                            <Globe className="h-3 w-3" />
                            Online
                          </span>
                        )}
                        
                        {event.privacy && (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            event.privacy === 'public'
                              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
                              : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {event.privacy === 'public' ? (
                              <Unlock className="h-3 w-3" />
                            ) : (
                              <Lock className="h-3 w-3" />
                            )}
                            {event.privacy}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}