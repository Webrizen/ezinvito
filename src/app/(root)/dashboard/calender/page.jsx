import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import CalendarView from '@/components/system/calendar-view';
import { eventTypeColors } from '@/enums/event-types';

export default async function page() {
  const { userId } = await auth();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events?userId=${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const events = await response.json();

  if (events.error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] w-full">
        <div className="text-center w-full h-full p-6 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
          <h3 className="text-lg font-medium text-rose-800 dark:text-rose-200">Error loading events</h3>
          <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">{events.error}</p>
        </div>
      </div>
    );
  }

  if (!response.ok) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] w-full">
        <div className="text-center w-full h-full p-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
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
            Event Calendar
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Visualize and manage all your events in a beautiful calendar interface.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild>
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Calendar Component */}
      <div className="mb-10">
        <CalendarView events={events} eventTypeColors={eventTypeColors} />
      </div>

      {/* Upcoming Events Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">
          Upcoming Events
        </h2>
        
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] text-center p-8 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700">
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6">
              <CalendarDays className="h-8 w-8 text-zinc-500 dark:text-zinc-400" />
            </div>
            <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
              No upcoming events
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-6">
              Create your first event to see it appear in your calendar.
            </p>
            <Button asChild>
              <Link href="/events/create">
                Create Event
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 6)
              .map(event => (
                <div 
                  key={event._id}
                  className="group relative bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-5">
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
                    
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                      {event.description || 'No description provided'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/dashboard/invitations/${event.customSlug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 group"
                      >
                        Manage Event
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}