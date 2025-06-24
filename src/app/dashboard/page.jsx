import React from 'react';
import { CalendarIcon, ClockIcon, MapPinIcon, CheckCircleIcon, XCircleIcon, HelpCircleIcon, UserIcon, Loader2 } from "lucide-react";
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

  // Initialize with default values
  let dashboardData = {
    error: null,
    response: {
      totalEvents: 0,
      totalUpcoming: 0,
      totalPast: 0,
      totalGuests: 0,
      upcomingEvents: [],
      pastEvents: [],
      recentActivity: []
    }
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard?userId=${userId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data) {
      dashboardData = data;
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    dashboardData.error = error.message || 'Failed to fetch dashboard data';
  }

  // Handle error state
  if (dashboardData.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <XCircleIcon className="size-12 text-red-500" />
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-muted-foreground max-w-md text-center">
          {dashboardData.error}
        </p>
      </div>
    );
  }

  // Safely extract data with fallbacks
  const data = dashboardData.response || {};
  const stats = {
    totalEvents: data.totalEvents || 0,
    totalUpcoming: data.totalUpcoming || 0,
    totalPast: data.totalPast || 0,
    totalGuests: data.totalGuests || 0,
  };
  const upcomingEvents = Array.isArray(data.upcomingEvents) ? data.upcomingEvents : [];
  const pastEvents = Array.isArray(data.pastEvents) ? data.pastEvents : [];
  const recentActivity = Array.isArray(data.recentActivity) ? data.recentActivity : [];

  const getStatusBadge = (status) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;
    
    switch (status.toLowerCase()) {
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
    if (!dateString) return 'N/A';
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy h:mm a');
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  };

  const getEventStats = (stats) => {
    if (!stats) return {
      total: 0,
      going: 0,
      notSure: 0,
      notGoing: 0,
      checkedIn: 0
    };
    
    return {
      total: stats.total || 0,
      going: stats.going || 0,
      notSure: stats.notSure || 0,
      notGoing: stats.notGoing || 0,
      checkedIn: stats.checkedIn || 0
    };
  };

  return (
    <div className="w-full p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Events</CardDescription>
            <CardTitle className="text-2xl font-semibold">{stats.totalEvents}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Upcoming Events</CardDescription>
            <CardTitle className="text-2xl font-semibold">{stats.totalUpcoming}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Past Events</CardDescription>
            <CardTitle className="text-2xl font-semibold">{stats.totalPast}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Guests</CardDescription>
            <CardTitle className="text-2xl font-semibold">{stats.totalGuests}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              const eventStats = getEventStats(event.stats);
              return (
                <Card key={event.id || Math.random()} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="text-lg">{event.title || 'Untitled Event'}</CardTitle>
                    <div className="flex flex-col space-y-1 text-sm mt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="size-4" />
                        {formatDate(event.date)}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPinIcon className="size-4" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="space-y-1 border-r pr-2">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-semibold">{eventStats.total}</p>
                      </div>
                      <div className="space-y-1 border-r px-2">
                        <p className="text-sm text-muted-foreground">Going</p>
                        <p className="font-semibold">{eventStats.going}</p>
                      </div>
                      <div className="space-y-1 border-r px-2">
                        <p className="text-sm text-muted-foreground">Not Sure</p>
                        <p className="font-semibold">{eventStats.notSure}</p>
                      </div>
                      <div className="space-y-1 pl-2">
                        <p className="text-sm text-muted-foreground">Not Going</p>
                        <p className="font-semibold">{eventStats.notGoing}</p>
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
              );
            })
          ) : (
            <Card className="text-center py-8">
              <CardHeader>
                <CardTitle className="text-muted-foreground">No upcoming events</CardTitle>
                <CardDescription>When you have upcoming events, they'll appear here</CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Past Events */}
          <h2 className="text-xl font-semibold mt-8">Past Events</h2>
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => {
              const eventStats = getEventStats(event.stats);
              return (
                <Card key={event.id || Math.random()} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b pb-4">
                    <CardTitle className="text-lg">{event.title || 'Untitled Event'}</CardTitle>
                    <div className="flex flex-col space-y-1 text-sm mt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="size-4" />
                        {formatDate(event.date)}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPinIcon className="size-4" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-semibold">{eventStats.total}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Going</p>
                        <p className="font-semibold">{eventStats.going}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Not Sure</p>
                        <p className="font-semibold">{eventStats.notSure}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Not Going</p>
                        <p className="font-semibold">{eventStats.notGoing}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Checked In</p>
                        <p className="font-semibold">{eventStats.checkedIn}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="text-center py-8">
              <CardHeader>
                <CardTitle className="text-muted-foreground">No past events</CardTitle>
                <CardDescription>Your past events will appear here</CardDescription>
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
              {recentActivity.length > 0 ? (
                recentActivity.map(activity => (
                  <div key={activity.id || Math.random()} className="flex items-start gap-3">
                    <div className="bg-secondary p-2 rounded-full">
                      <UserIcon className="size-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.name || 'Guest'}</p>
                        <span className="text-sm text-muted-foreground">
                          {activity.respondedAt ? format(parseISO(activity.respondedAt), 'MMM dd') : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.eventTitle || 'Event'}</p>
                      <div className="mt-1">
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No recent activity</p>
                  <p className="text-sm text-muted-foreground mt-1">Guest responses will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}