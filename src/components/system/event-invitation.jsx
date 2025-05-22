"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Templates } from "@/enums/template";

// Blob SVG
const Blob = ({ className, style }) => (
    <svg
        viewBox="0 0 600 600"
        className={className}
        style={style}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g transform="translate(300,300)">
            <path d="M120,-153.7C157.7,-120.2,191.2,-91.2,200.2,-56.7C209.2,-22.2,193.7,18.8,176.6,59.8C159.5,100.8,140.8,141.7,109.2,162.2C77.7,182.7,33.3,182.8,-10.2,190.1C-53.7,197.3,-107.3,211.7,-142.2,191.2C-177.1,170.7,-193.3,115.3,-191.6,66.7C-189.9,18.1,-170.3,-23.7,-148.2,-60.7C-126.1,-97.7,-101.6,-129.9,-70.2,-163.2C-38.8,-196.5,0.5,-230.9,36.8,-224.2C73.1,-217.5,146.2,-169.2,120,-153.7Z" />
        </g>
    </svg>
);

// Stripes
const Stripes = ({ className }) => (
    <div className={clsx("absolute inset-0 pointer-events-none", className)}>
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ x: "-100vw" }}
                animate={{ x: "100vw" }}
                transition={{
                    delay: 1.2 + i * 0.08,
                    duration: 1.2,
                    ease: "easeInOut",
                }}
                className={clsx(
                    "absolute top-0 h-full w-[5%] opacity-10",
                    "bg-gradient-to-b from-blue-400 to-blue-600 dark:from-zinc-600 dark:to-zinc-800"
                )}
                style={{ left: `${i * 5}%` }}
            />
        ))}
    </div>
);

// Fluid waves
const Fluid = ({ className }) => (
    <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 1.2, ease: "easeInOut" }}
        className={clsx(
            "absolute bottom-0 left-0 w-full h-1/3 z-20 pointer-events-none",
            className
        )}
    >
        <svg viewBox="0 0 1440 320" className="w-full h-full" fill="currentColor">
            <path
                className="fill-blue-400 dark:fill-zinc-700"
                fillOpacity="0.7"
                d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,117.3C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </svg>
    </motion.div>
);

export default function EventInvitation({ event, slug }) {
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 overflow-hidden transition-colors duration-500">
            <motion.div
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{ scale: 1.2, rotate: 20, opacity: 0.8 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute -top-32 -left-32 w-[600px] h-[600px] text-blue-300/50 dark:text-zinc-800/50 z-10"
            >
                <Blob className="blur-[120px]" />
            </motion.div>

            <Stripes className="blur-lg opacity-30" />
            <Fluid className="blur-[100px] opacity-60" />

            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative z-30 bg-white shadow-2xl rounded-3xl w-full max-w-md mx-auto aspect-[9/16] h-[90vh] flex flex-col p-8 justify-between border border-zinc-100 overflow-hidden"
                        style={{
                            backgroundImage: `url(${Templates.find(t => t.id === event?.invitationDesign?.templateId || 'classic')?.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Content container */}
                        <div className="relative z-10 h-full flex flex-col rounded-2xl backdrop-blur-[2px] p-6"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, rgba(225,225,225,0.1) 100%)'
                            }}
                        >
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-block px-4 py-1 mb-4 text-xs font-medium tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
                                    {event?.eventType || 'Workshop'}
                                </div>
                                <h1 className="text-3xl font-bold text-zinc-800 mb-2">
                                    {event?.title || 'Tech Innovators Meetup'}
                                </h1>
                                <div className="flex justify-center">
                                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                                </div>
                            </div>

                            {/* Main content */}
                            <div className="flex-1 flex flex-col justify-center space-y-6">
                                {/* Date & Time */}
                                <div className="text-center">
                                    <svg className="w-6 h-6 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <p className="text-xs uppercase tracking-wider text-blue-500 mb-1">
                                        When
                                    </p>
                                    <p className="font-medium text-zinc-700">
                                        {event?.date ? new Date(event.date).toLocaleString(undefined, {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        }) : "Saturday, May 25, 2025 at 3:11 PM"}
                                    </p>
                                </div>

                                {/* Location */}
                                <div className="text-center">
                                    <svg className="w-6 h-6 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <p className="text-xs uppercase tracking-wider text-blue-500 mb-1">
                                        Where
                                    </p>
                                    <p className="font-medium text-zinc-700">
                                        {event?.location?.venue || "The Innovation Hub"}
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        {event?.location?.address?.city}, {event?.location?.address?.state}
                                    </p>
                                </div>

                                {/* Host */}
                                <div className="text-center">
                                    <svg className="w-6 h-6 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <p className="text-xs uppercase tracking-wider text-blue-500 mb-1">
                                        Hosted by
                                    </p>
                                    <p className="font-medium text-zinc-700">
                                        {event?.host || "Alex"}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6 mb-8 text-center">
                                <p className="text-sm italic text-zinc-600 px-4">
                                    {event?.description || "Join us for an exciting meetup where tech enthusiasts gather to discuss the latest innovations in AI, blockchain, and more."}
                                </p>
                            </div>

                            <button className="relative px-5 py-2 font-medium text-white group mx-auto bottom-2 cursor-pointer">
                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-blue-500 group-hover:bg-blue-700 group-hover:skew-x-12"></span>
                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-blue-700 group-hover:bg-blue-500 group-hover:-skew-x-12"></span>

                                <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-blue-600 -rotate-12"></span>
                                <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-blue-400 -rotate-12"></span>
                                <span className="relative">RSVP Now</span>
                            </button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-200 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-200 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-200 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-200 rounded-br-lg"></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
