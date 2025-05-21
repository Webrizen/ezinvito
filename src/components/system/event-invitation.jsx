"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const EventInvitation = ({ slug, event }) => {
    const [currentScreen, setCurrentScreen] = useState(0);

    const screens = [
        // Screen 1: Formal Invitation
        {
            content: (
                <div className="flex flex-col items-center justify-center h-[93vh] text-center px-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-12"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-2xl md:text-3xl text-gold-500 dark:text-gold-400 mb-8 italic"
                        >
                            You Are Cordially Invited
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            {event.title}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        >
                            Your presence would be an honor at this distinguished gathering
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.8 }}
                        className="absolute bottom-12"
                    >
                        <div className="animate-bounce">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            )
        },
        // Screen 2: Date & Time (Royal Decree Style)
        {
            content: (
                <div className="flex flex-col items-center justify-center h-[93vh] text-center px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-lg text-gold-500 dark:text-gold-400 mb-12 italic"
                    >
                        The event shall commence at the stroke of
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-gold-500/10 dark:bg-gold-400/10 rounded-xl blur-lg"></div>
                        <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-lg border border-gold-200 dark:border-gold-800">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2"
                            >
                                {format(new Date(event.date), "MMMM do, yyyy")}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-2xl text-gold-600 dark:text-gold-400"
                            >
                                {event.endDate && (
                                    <span className="text-gray-600 dark:text-gray-300"> until {format(new Date(event.endDate), "h:mm a")}</span>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="mt-12 text-lg text-gray-600 dark:text-gray-300 italic"
                    >
                        We kindly request the pleasure of your company
                    </motion.div>
                </div>
            )
        },
        // Screen 3: Location (Royal Venue)
        {
            content: (
                <div className="flex flex-col items-center justify-center h-[93vh] text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-lg text-gold-500 dark:text-gold-400 mb-12 italic"
                    >
                        At this distinguished venue
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        className="mb-8"
                    >
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gold-500 dark:text-gold-400"
                        >
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                            />
                            <motion.circle
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                cx="12"
                                cy="10"
                                r="3"
                                fill="currentColor"
                            />
                        </svg>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2"
                    >
                        {event.location.venue}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                    >
                        {event.location.address.city}, {event.location.address.state}
                    </motion.div>
                </div>
            )
        },
        // Screen 4: Royal Summons Card
        {
            content: (
                <div className="flex flex-col items-center justify-center h-[93vh] text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md aspect-[9/16] bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-gold-200 dark:border-gold-800 mb-8 relative"
                    >
                        {/* Parchment-like background */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="absolute inset-0 bg-gradient-to-b from-amber-50/50 to-amber-100/30 dark:from-zinc-800/50 dark:to-zinc-900/50"
                        />

                        {/* Wax seal decoration */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-red-700/90 border border-red-800 flex items-center justify-center shadow-lg z-10"
                        >
                            <span className="text-white font-serif text-xs">SEAL</span>
                        </motion.div>

                        {/* Header */}
                        <div className="h-1/3 bg-gradient-to-b from-gold-500 to-gold-600 dark:from-gold-700 dark:to-gold-800 p-6 flex flex-col justify-end relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]"></div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="relative z-10"
                            >
                                <h3 className="text-2xl font-serif font-bold text-white">{event.title}</h3>
                                <p className="text-white/90">{format(new Date(event.date), "MMMM do, yyyy")}</p>
                            </motion.div>
                        </div>

                        {/* Body */}
                        <div className="p-6 text-left relative z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="mb-4"
                            >
                                <h4 className="text-sm font-medium text-gold-600 dark:text-gold-400">VENUE</h4>
                                <p className="text-gray-900 dark:text-white">{event.location.venue}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="mb-4"
                            >
                                <h4 className="text-sm font-medium text-gold-600 dark:text-gold-400">HOSTED BY</h4>
                                <p className="text-gray-900 dark:text-white">{event.host}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                className="mb-4"
                            >
                                <h4 className="text-sm font-medium text-gold-600 dark:text-gold-400">TIME</h4>
                                <p className="text-gray-900 dark:text-white">
                                    {format(new Date(event.date), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                                </p>
                            </motion.div>

                            {event.tags && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.6 }}
                                    className="flex flex-wrap gap-2 mt-4"
                                >
                                    {event.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs rounded-full bg-gold-100 dark:bg-gold-900/50 text-gold-800 dark:text-gold-200 border border-gold-200 dark:border-gold-800"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* RSVP Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="w-full max-w-md text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 0.6 }}
                            className="text-lg text-gray-600 dark:text-gray-300 mb-6 italic"
                        >
                            Kindly respond by {format(new Date(event.rsvpDeadline), "MMMM do")}
                        </motion.div>

                        <Link
                            href={`/event/${slug}/rsvp`}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-600 dark:to-gold-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Accept This Invitation</span>
                            <motion.span
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '0%' }}
                                className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-500 dark:from-gold-700 dark:to-gold-600 z-0 transition-all duration-500"
                            />
                        </Link>
                    </motion.div>
                </div>
            )
        }
    ];

    // Auto-advance screens every 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
        }, 8000);
        return () => clearTimeout(timer);
    }, [currentScreen]);

    return (
        <div className="w-full bg-amber-50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Gold dust particles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gold-500/20 dark:bg-gold-400/20"
                    style={{
                        width: `${Math.random() * 8 + 2}px`,
                        height: `${Math.random() * 8 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, (Math.random() - 0.5) * 40],
                        x: [0, (Math.random() - 0.5) * 20],
                        opacity: [0.1, 0.6, 0.1],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            ))}

            {/* Main content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    {screens[currentScreen].content}
                </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {screens.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentScreen(index)}
                        className={`w-2 h-2 rounded-full transition-all ${currentScreen === index ? 'bg-gold-500 dark:bg-gold-400 w-4' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventInvitation;