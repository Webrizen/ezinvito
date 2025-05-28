'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckInPage({ slug, rsvpId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [checkingIn, setCheckingIn] = useState(false);
    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState(null);

    // Fetch initial data
    useEffect(() => {
        if (!slug || !rsvpId) {
            setError('Missing required parameters');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/events/slug/rsvp?slug=${slug}&rsvpId=${rsvpId}`,
                    { cache: 'no-store' }
                );
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Failed to fetch');

                setEventData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, rsvpId]);

    const handleCheckIn = async () => {
        if (!slug || !rsvpId) return;

        setCheckingIn(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/events/slug/rsvp?slug=${slug}&rsvpId=${rsvpId}`,
                {
                    method: 'POST',
                    cache: 'no-store',
                }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Check-in failed');

            setEventData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setCheckingIn(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-400 dark:border-zinc-600"></div>
                    <p className="text-zinc-500 dark:text-zinc-400">Loading your details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-900">
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center border border-zinc-200 dark:border-zinc-700">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">Oops!</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 transition-all duration-300 hover:shadow-lg">
                <div className="p-8">
                    {/* Header with event details */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">EVENT CHECK-IN</span>
                            </div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                                {eventData?.event?.name || 'Event Check-In'}
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {eventData?.event?.date && new Date(eventData.event.date).toLocaleString()}
                            </p>
                        </div>
                        {eventData?.rsvp?.checkedIn?.status && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                                Checked In
                            </span>
                        )}
                    </div>

                    {/* Attendee card */}
                    <div className="mb-8">
                        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">Attendee Details</h2>
                        <div className="bg-zinc-50 dark:bg-zinc-700/30 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                                    {eventData?.rsvp?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">{eventData?.rsvp?.name}</p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{eventData?.rsvp?.email}</p>
                                </div>
                            </div>
                            {eventData?.rsvp?.phone && (
                                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {eventData.rsvp.phone}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action area */}
                    <div className="space-y-4">
                        {!eventData?.rsvp?.checkedIn?.status && (
                            <button
                                onClick={handleCheckIn}
                                disabled={checkingIn}
                                className={`w-full py-3 px-4 rounded-xl shadow-sm text-white font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center gap-2 ${
                                    checkingIn ? 'opacity-80 cursor-not-allowed' : ''
                                }`}
                            >
                                {checkingIn ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Check In Now
                                    </>
                                )}
                            </button>
                        )}

                        {eventData?.rsvp?.checkedIn?.status && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/50 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="font-medium text-green-800 dark:text-green-200">Successfully checked in!</p>
                                    <p className="text-sm text-green-600 dark:text-green-300">
                                        {eventData?.rsvp?.checkedIn?.timestamp && 
                                            new Date(eventData.rsvp.checkedIn.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}