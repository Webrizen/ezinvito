import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, CheckCircleIcon, XCircleIcon, HelpCircleIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, parseISO } from 'date-fns';
import { auth } from '@clerk/nextjs/server';

export default async function page() {
  const { userId } = await auth();
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard?userId=${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const dashboardData = await response.json();

  if (dashboardData.error) {
    return <div className="text-red-500 text-center mt-10">{dashboardData.error}</div>;
  }

  if (!response.ok) {
    return <div className="text-yellow-500 text-center mt-10">Error fetching</div>;
  }

  const data = dashboardData.response;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'going':
        return <Badge variant="success" className="gap-1"><CheckCircleIcon className="size-3" /> Going</Badge>;
      case 'not-going':
        return <Badge variant="destructive" className="gap-1"><XCircleIcon className="size-3" /> Not Going</Badge>;
      case 'not-sure':
        return <Badge variant="secondary" className="gap-1"><HelpCircleIcon className="size-3" /> Not Sure</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'MMM dd, yyyy h:mm a');
  };

  return (
    <div className="w-full p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Events</CardDescription>
            <CardTitle className="text-2xl font-semibold">{data.totalEvents}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Upcoming Events</CardDescription>
            <CardTitle className="text-2xl font-semibold">{data.totalUpcoming}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Past Events</CardDescription>
            <CardTitle className="text-2xl font-semibold">{data.totalPast}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Guests</CardDescription>
            <CardTitle className="text-2xl font-semibold">{data.totalGuests}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
<div className="lg:col-span-2 space-y-6">
  <h2 className="text-xl font-semibold">Upcoming Events</h2>
  {data.upcomingEvents.length > 0 ? (
    data.upcomingEvents.map((event) => (
      <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <div className="flex flex-col space-y-1 text-sm mt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="size-4" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinIcon className="size-4" />
              {event.location}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="space-y-1 border-r pr-2">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-semibold">{event.stats.total}</p>
            </div>
            <div className="space-y-1 border-r px-2">
              <p className="text-sm text-muted-foreground">Going</p>
              <p className="font-semibold">{event.stats.going}</p>
            </div>
            <div className="space-y-1 border-r px-2">
              <p className="text-sm text-muted-foreground">Not Sure</p>
              <p className="font-semibold">{event.stats.notSure}</p>
            </div>
            <div className="space-y-1 pl-2">
              <p className="text-sm text-muted-foreground">Not Going</p>
              <p className="font-semibold">{event.stats.notGoing}</p>
            </div>
          </div>
        </CardContent>
        {event.rsvpDeadline && (
          <CardFooter className="text-sm text-muted-foreground border-t pt-3 flex items-center gap-2 bg-muted/20 rounded-b-lg">
            <ClockIcon className="size-4" />
            RSVP Deadline: {formatDate(event.rsvpDeadline)}
          </CardFooter>
        )}
      </Card>
    ))
  ) : (
    <Card className="text-center py-8">
      <CardHeader>
        <CardTitle className="text-muted-foreground">No upcoming events</CardTitle>
      </CardHeader>
    </Card>
  )}

  {/* Past Events */}
  <h2 className="text-xl font-semibold mt-8">Past Events</h2>
  {data.pastEvents.length > 0 ? (
    data.pastEvents.map((event) => (
      <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg">{event.title}</CardTitle>
          <div className="flex flex-col space-y-1 text-sm mt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="size-4" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinIcon className="size-4" />
              {event.location}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-semibold">{event.stats.total}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Going</p>
              <p className="font-semibold">{event.stats.going}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Not Sure</p>
              <p className="font-semibold">{event.stats.notSure}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Not Going</p>
              <p className="font-semibold">{event.stats.notGoing}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Checked In</p>
              <p className="font-semibold">{event.stats.checkedIn}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card className="text-center py-8">
      <CardHeader>
        <CardTitle className="text-muted-foreground">No past events</CardTitle>
      </CardHeader>
    </Card>
  )}
</div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Card>
            <CardHeader>
              <CardTitle>Guest Responses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.recentActivity.length > 0 ? (
                data.recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="bg-secondary p-2 rounded-full">
                      <UserIcon className="size-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.name}</p>
                        <span className="text-sm text-muted-foreground">
                          {format(parseISO(activity.respondedAt), 'MMM dd')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.eventTitle}</p>
                      <div className="mt-1">
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}