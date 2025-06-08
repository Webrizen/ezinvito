import React from 'react'
import EditForm from '@/components/system/edit-form';
import { auth } from '@clerk/nextjs/server';

export default async function page({ params }) {
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
    return (
        <div className='w-full'>
            <EditForm event={event} />
        </div>
    )
}
