import React from 'react'
import Link from 'next/link'

export default async function page({ params }) {
    const { id } = await params;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${id}/guests`,
        { cache: 'no-store' }
    );

    const data = await response.json();

    if (!data.success) {
        return (
            <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-900">
                <div className="max-w-md text-center p-8 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Event Not Found</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Could not find event with ID: {id}</p>
                    <Link href="/events" className="inline-block px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        Browse Events
                    </Link>
                </div>
            </div>
        );
    }

    const { event, rsvps } = data;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-4 md:p-8">
            <div className="w-full">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                        {event.title}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
                            {event.eventType}
                        </span>
                        <span>•</span>
                        <span>{event.location.venue}, {event.location.address.city}</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                        <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                            Guest Check-ins ({rsvps.length})
                        </h2>
                    </div>

                    <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        {rsvps.map((rsvp) => (
                            <div key={rsvp._id} className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-medium text-zinc-800 dark:text-zinc-100">
                                            {rsvp.name}
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {rsvp.email} • {rsvp.phone}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            rsvp.attendanceStatus === 'going' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                            rsvp.attendanceStatus === 'not-going' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
                                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                                        }`}>
                                            {rsvp.attendanceStatus.replace('-', ' ')}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            rsvp.checkedIn.status ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' :
                                            'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300'
                                        }`}>
                                            {rsvp.checkedIn.status ? 'Checked in' : 'Not checked in'}
                                        </span>
                                    </div>
                                </div>

                                {rsvp.guests.length > 0 && (
                                    <div className="mt-3 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700">
                                        <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2">
                                            Guests ({rsvp.guests.length})
                                        </h4>
                                        <ul className="space-y-2">
                                            {rsvp.guests.map((guest) => (
                                                <li key={guest._id} className="flex justify-between items-center">
                                                    <div>
                                                        <span className="text-zinc-800 dark:text-zinc-100">{guest.name}</span>
                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                                                            ({guest.relationship})
                                                        </span>
                                                    </div>
                                                    {rsvp.checkedIn.status && (
                                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                                                            Checked in
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {rsvp.checkedIn.status && (
                                    <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                                        Checked in at: {new Date(rsvp.checkedIn.at).toLocaleString()}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}