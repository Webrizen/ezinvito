import InvitationPassContainer from "@/components/system/generate-invitation-pass";

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
        <div className="w-full min-h-screen flex justify-center items-center">
            <InvitationPassContainer
                url={`https://ezinvito.webrizen.com/event/${slug}/verify?key=${data?.event?.qrSettings?.secretKey}`}
                expiresAt={data.event.qrSettings.expiresAt}
                eventName={data.event.title}
                host={data.event.host}
                attendee={data.rsvp.name}
                eventDescription={data.event.description}
                eventId={data.event._id}
                eventStartTime={data.event.date}
                location={data.event.location}
            />
        </div>
    );
}