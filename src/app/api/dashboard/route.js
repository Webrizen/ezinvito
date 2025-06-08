import connectDB from "@/lib/db";
import event from "@/models/event";
import rsvpResponse from "@/models/rsvp-response";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        await connectDB();
        const { userId: clerkUserId } = await auth();

        const url = new URL(request.url);
        const userIdFromQuery = url.searchParams.get('userId');

        const userId = clerkUserId || userIdFromQuery;
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Get all events for this user
        const events = await event.find({ userId })
            .sort({ date: 1 })
            .lean();

        // If no events, return empty response
        if (!events.length) {
            return NextResponse.json({
                totalEvents: 0,
                upcomingEvents: [],
                pastEvents: [],
                rsvpStats: {},
                recentActivity: []
            });
        }

        // Get event IDs for RSVP queries
        const eventIds = events.map(event => event._id);

        // Get RSVP stats for all events
        const rsvpStats = await rsvpResponse.aggregate([
            { $match: { eventId: { $in: eventIds } } },
            {
                $group: {
                    _id: '$eventId',
                    total: { $sum: 1 },
                    going: {
                        $sum: { $cond: [{ $eq: ['$attendanceStatus', 'going'] }, 1, 0] }
                    },
                    notSure: {
                        $sum: { $cond: [{ $eq: ['$attendanceStatus', 'not-sure'] }, 1, 0] }
                    },
                    notGoing: {
                        $sum: { $cond: [{ $eq: ['$attendanceStatus', 'not-going'] }, 1, 0] }
                    },
                    checkedIn: {
                        $sum: { $cond: ['$checkedIn.status', 1, 0] }
                    }
                }
            }
        ]);

        // Get recent RSVPs (last 5)
        const recentRsvps = await rsvpResponse.find({ eventId: { $in: eventIds } })
            .sort({ respondedAt: -1 })
            .limit(5)
            .populate('eventId', 'title date')
            .lean();

        // Categorize events into upcoming and past
        const now = new Date();
        const upcomingEvents = [];
        const pastEvents = [];

        events.forEach(event => {
            const eventWithStats = {
                ...event,
                rsvpStats: rsvpStats.find(stat => stat._id.equals(event._id)) || {
                    total: 0,
                    going: 0,
                    notSure: 0,
                    notGoing: 0,
                    checkedIn: 0
                }
            };

            if (new Date(event.date) > now) {
                upcomingEvents.push(eventWithStats);
            } else {
                pastEvents.push(eventWithStats);
            }
        });

        // Calculate overall stats
        const totalEvents = events.length;
        const totalUpcoming = upcomingEvents.length;
        const totalPast = pastEvents.length;
        const totalGuests = rsvpStats.reduce((sum, stat) => sum + stat.total, 0);
        const totalGoing = rsvpStats.reduce((sum, stat) => sum + stat.going, 0);
        const totalCheckedIn = rsvpStats.reduce((sum, stat) => sum + stat.checkedIn, 0);

        // Format recent activity
        const recentActivity = recentRsvps.map(rsvp => ({
            id: rsvp._id,
            eventTitle: rsvp.eventId.title,
            eventDate: rsvp.eventId.date,
            name: rsvp.name,
            status: rsvp.attendanceStatus,
            respondedAt: rsvp.respondedAt
        }));

        // Prepare response
        const response = {
            totalEvents,
            totalUpcoming,
            totalPast,
            totalGuests,
            totalGoing,
            totalCheckedIn,
            upcomingEvents: upcomingEvents.map(event => ({
                id: event._id,
                title: event.title,
                date: event.date,
                eventType: event.eventType,
                location: event.location.venue || event.location.address.city || 'Online',
                rsvpDeadline: event.rsvpDeadline,
                stats: {
                    total: event.rsvpStats.total,
                    going: event.rsvpStats.going,
                    notSure: event.rsvpStats.notSure,
                    notGoing: event.rsvpStats.notGoing,
                    checkedIn: event.rsvpStats.checkedIn
                }
            })),
            pastEvents: pastEvents.map(event => ({
                id: event._id,
                title: event.title,
                date: event.date,
                eventType: event.eventType,
                location: event.location.venue || event.location.address.city || 'Online',
                stats: {
                    total: event.rsvpStats.total,
                    going: event.rsvpStats.going,
                    notSure: event.rsvpStats.notSure,
                    notGoing: event.rsvpStats.notGoing,
                    checkedIn: event.rsvpStats.checkedIn
                }
            })),
            recentActivity
        };
        return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
