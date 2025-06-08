import { GuestTable } from '@/components/system/guest-table';
import Link from 'next/link';

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
        <div className="p-4 max-w-7xl mx-auto space-y-6 min-h-screen bg-zinc-50 dark:bg-zinc-900">
            {/* Enhanced Event Header */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{event.title}</h1>
                            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                                {event.eventType}
                            </span>
                        </div>
                        {event.description && (
                            <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl line-clamp-3">{event.description}</p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                            <span 
                                key={index} 
                                className="bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded-full text-xs font-medium transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Guest Table Section */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <GuestTable rsvps={rsvps} />
            </div>
        </div>
    );
};