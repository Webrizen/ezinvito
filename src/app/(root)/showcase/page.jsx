import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

export default function page() {
    const stats = {
        users: 1248,
        eventsCreated: 5723,
        invitesSent: 84156,
        activeNow: 87,
    };

   const testimonials = [
  {
    quote: "Cut our event setup time by 70%. Absolute game-changer.",
    name: "Sarah K.",
    company: "Elegant Weddings Co.",
    role: "Lead Wedding Planner"
  },
  {
    quote: "My club's attendance doubled after switching to automated invites.",
    name: "Alex T.",
    company: "NYU Entrepreneurship Club",
    role: "President"
  },
  {
    quote: "The AI suggestions for invite wording have made our corporate events feel more personal.",
    name: "James L.",
    company: "Microsoft",
    role: "Event Coordinator"
  },
  {
    quote: "Saved $3,000 last quarter by reducing no-shows with smart reminders.",
    name: "Priya M.",
    company: "TEDx Mumbai",
    role: "Organizer"
  },
  {
    quote: "Finally an event tool that doesn't require a PhD to use! Our volunteers love it.",
    name: "Carlos G.",
    company: "Food Bank Network",
    role: "Volunteer Coordinator"
  },
  {
    quote: "The analytics helped us identify our most engaged attendees - game changing for fundraising.",
    name: "Naomi W.",
    company: "Metropolitan Museum",
    role: "Development Director"
  }
];

const recentEvents = [
  { 
    name: "TechConf 2024", 
    attendees: 320, 
    location: "San Francisco",
    type: "conference",
    date: "2024-05-15"
  },
  { 
    name: "Beach Cleanup", 
    attendees: 85, 
    location: "Miami",
    type: "volunteer",
    date: "2024-06-02"
  },
  { 
    name: "Startup Mixer", 
    attendees: 147, 
    location: "Berlin",
    type: "networking",
    date: "2024-05-28"
  },
  { 
    name: "Annual Gala", 
    attendees: 420, 
    location: "New York",
    type: "fundraiser",
    date: "2024-06-10"
  },
  { 
    name: "Developer Workshop", 
    attendees: 63, 
    location: "Remote",
    type: "workshop",
    date: "2024-05-20"
  },
  { 
    name: "Community Yoga", 
    attendees: 38, 
    location: "Austin",
    type: "wellness",
    date: "2024-06-05"
  },
  { 
    name: "Investor Pitch Day", 
    attendees: 92, 
    location: "London",
    type: "business",
    date: "2024-05-22"
  },
  { 
    name: "Book Launch", 
    attendees: 115, 
    location: "Paris",
    type: "cultural",
    date: "2024-06-08"
  }
];

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-32">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Live Community Data
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-zinc-600 to-zinc-400 dark:from-zinc-400 dark:to-zinc-600 bg-clip-text text-transparent">
                            Join Our Growing Community
                        </span>
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                        Trusted by {stats.users.toLocaleString()}+ event professionals worldwide
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {[
                        { label: "Active Now", value: stats.activeNow, icon: "👥", trend: "↑ 12%" },
                        { label: "Total Users", value: stats.users, icon: "🚀", trend: "↑ 24% this month" },
                        { label: "Events Created", value: stats.eventsCreated, icon: "🎉", trend: "↑ 18% this week" },
                        { label: "Invites Sent", value: stats.invitesSent, icon: "✉️", trend: "↑ 31% today" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-zinc-800/50 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-2xl">{stat.icon}</div>
                                <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500 px-2 py-1 rounded-full">
                                    {stat.trend}
                                </span>
                            </div>
                            <div className="text-3xl font-bold mt-2 text-zinc-900 dark:text-white">
                                {stat.value.toLocaleString()}
                            </div>
                            <div className="text-zinc-500 dark:text-zinc-400 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {/* Recent Events */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-semibold flex items-center">
                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Recent Events
                            </h2>
                        </div>
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {recentEvents.map((event, index) => (
                                <div key={index} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{event.name}</h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {event.location}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                                                {event.attendees} attending
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-semibold flex items-center">
                                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                What Users Say
                            </h2>
                        </div>
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="p-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-medium mr-4">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <blockquote className="text-zinc-600 dark:text-zinc-300 italic">
                                                "{testimonial.quote}"
                                            </blockquote>
                                            <div className="mt-3">
                                                <div className="font-medium">{testimonial.name}</div>
                                                <div className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.company}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
                        Be part of the {stats.users.toLocaleString()}+ professionals transforming event management
                    </p>
                    <Button asChild className="cursor-pointer">
                        <Link href="/dashboard">
                            Get Started Free
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}