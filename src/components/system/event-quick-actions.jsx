"use client";
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Eye, PencilIcon, TrashIcon, UsersRoundIcon } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs';

export default function EventQuickActions({ slug, eventId }) {
    const { userId } = useAuth();
    const router = useRouter();

    const handleDeleteEvent = async () => {

        // Check if window is available (client-side)
        if (typeof window !== 'undefined') {
            const confirmed = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');
            if (!confirmed) return;
        }
        
        if (!userId) {
            toast('You must be logged in to delete an event');
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${eventId}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            toast('Event deleted successfully');
            router.push('/dashboard');
        } catch (error) {
            console.error('Error deleting event:', error);
            toast('Failed to delete event');
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm transition-colors duration-300">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/dashboard/invitations/${slug}/edit`} className="w-full flex items-center justify-center cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition duration-200">
                                <PencilIcon className="size-4 text-zinc-400" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit Event Details</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/event/${slug || "not-found"}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition duration-200">
                                <Eye className="size-4 text-zinc-400" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Event Details</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/dashboard/guests/${eventId}`} className="w-full flex items-center justify-center cursor-pointer p-3 bg-zinc-50 dark:bg-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-600 rounded-lg transition duration-200">
                                <UsersRoundIcon className="size-4 text-zinc-400" />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Manage Participants</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild onClick={handleDeleteEvent}>
                            <button className="w-full flex items-center justify-center cursor-pointer p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition duration-200">
                                <TrashIcon className="size-4 text-red-400" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete Event</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}
