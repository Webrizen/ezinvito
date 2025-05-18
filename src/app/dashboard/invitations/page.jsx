import Link from 'next/link';
import React from 'react';

export default async function page() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`, {
        method: 'GET',
        cache: 'no-store',
    });
    const events = await response.json();
    console.log(events);

    if (events.error) {
        return <div className="text-red-500 text-center mt-10">{events.error}</div>;
    }
    
    if (!response.ok) {
        return <div className="text-red-500 text-center mt-10">Error fetching</div>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-y-8 items-center text-center md:text-left md:items-start md:justify-between">
                <div className="text-center space-y-2 md:mx-0 md:text-left">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white capitalize">
                        Your Invitations
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-300 max-w-2xl md:mx-0">
                        Manage all your invitations in one place and keep track of who’s coming.
                    </p>
                </div>
                <div>
                    <Link href="/dashboard/invitations/create-invitation" className="px-5 py-2.5 border border-zinc-100 dark:border-zinc-900 text-zinc-300 dark:text-zinc-900 flex items-center gap-x-3 bg-accent-foreground rounded-full text-sm">
                        Create Invitation
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </div>
            </div>
            <div className="mt-10">
                {!events || events.length === 0 ? (
                    <p className="text-zinc-600 dark:text-zinc-400">You have no events yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {events.map((event) => (
                            <li
                                key={event._id || event.customSlug}
                                className="border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <Link
                                    href={`/events/${event.customSlug || event._id}`}
                                    className="block"
                                >
                                    <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                                        {event.title}
                                    </h2>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Hosted by: {event.hostName}
                                    </p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                                        {event.date ? new Date(event.date).toLocaleString() : 'No date'} -{' '}
                                        {event.endDate ? new Date(event.endDate).toLocaleString() : 'No end date'}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
