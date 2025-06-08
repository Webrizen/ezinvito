import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { CalendarDays, UserRound, QrCode, Globe, Lock, Unlock, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Event type color mapping with polished dark mode variants
const eventTypeColors = {
  conference: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
  workshop: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
  meetup: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
  webinar: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
  social: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
  concert: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/60 dark:text-fuchsia-200',
  exhibition: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
  networking: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
  hackathon: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200',
  wedding: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
  birthday: 'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-200',
  corporate: 'bg-gray-100 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200',
};

export default async function page() {
  const { userId } = await auth();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?userId=${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const events = await response.json();

  if (events.error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md p-6 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
          <h3 className="text-lg font-medium text-rose-800 dark:text-rose-200">Error loading events</h3>
          <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">{events.error}</p>
        </div>
      </div>
    );
  }

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md p-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200">Network Error</h3>
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
            We couldn't fetch your events. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Premium Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Guest Management
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Effortlessly manage your event attendees with our intuitive guest tracking system.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link href="/dashboard/invitations">
              <UserRound className="h-4 w-4" />
             Manage Invitations
            </Link>
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6">
            <Users className="h-8 w-8 text-zinc-500 dark:text-zinc-400" />
          </div>
          <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
            No events to manage yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-6">
            Create your first event to start collecting RSVPs and managing guests.
          </p>
          <Button asChild>
            <Link href="/events/create">
              Create Event
            </Link>
          </Button>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div 
            key={event._id}
            className="group relative bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-600"
          >
            {/* Event Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    eventTypeColors[event.eventType] || eventTypeColors.meetup
                  }`}
                >
                  {event.eventType.replace(/-/g, ' ')}
                </span>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {format(new Date(event.date), 'MMM d, yyyy')}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                {event.title}
              </h3>
              
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                {event.description || 'No description provided'}
              </p>
              
              <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  {event.location.onlineEvent ? (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Online</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location.venue || 'Location TBD'}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with subtle gradient */}
            <div className="bg-gradient-to-t from-zinc-50/80 to-white/30 dark:from-zinc-800/80 dark:to-zinc-800/30 px-6 py-4 border-t border-zinc-100 dark:border-zinc-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {event.privacy === 'public' ? (
                    <span className="text-xs flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Unlock className="h-3.5 w-3.5" />
                      Public
                    </span>
                  ) : (
                    <span className="text-xs flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <Lock className="h-3.5 w-3.5" />
                      {event.privacy === 'private' ? 'Private' : 'Invite-only'}
                    </span>
                  )}
                </div>
                
                <Link
                  href={`/dashboard/guests/${event._id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 group"
                >
                  Manage Guests
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
            
            {/* Hover effect indicator */}
            <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-indigo-200 dark:group-hover:border-indigo-900/50 rounded-xl transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}