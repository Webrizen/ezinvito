import React from 'react';
import EventInvitation from '@/components/system/event-invitation';

export default async function page({ params }) {
  const { slug } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events/slug?slug=${slug}`, {
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
  } else if (!event) {
    return (
      <div className="text-red-500 text-center mt-10 dark:text-red-400">
        Event not found
      </div>
    );
  } 

  return (
        <EventInvitation slug={slug} event={event} />
  );
}