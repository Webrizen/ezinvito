export default async function page({ params, searchParams }) {
    const { slug } = await params;
    const { rsvpId } = await searchParams;
    
    if (!rsvpId) {
        return (
            <div className="text-red-500 text-center mt-10 dark:text-red-400">
                RSVP ID is required
            </div>
        );
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/events/slug/rsvp?slug=${slug}&rsvpId=${rsvpId}`,
        { cache: 'no-store' }
    );
    
    const data = await response.json();

    if (!response.ok) {
        return (
            <div className="text-red-500 text-center mt-10 dark:text-red-400 flex justify-center items-center w-full min-h-screen">
                {data.error || 'Error fetching event details'}
            </div>
        );
    }

    return (
        <div className="text-center mt-10">
            <h2 className="text-2xl font-bold">{data.rsvp?.name || 'Event Details'}</h2>
            <p className="mt-4">{data.rsvp?.email}</p>
        </div>
    );
}