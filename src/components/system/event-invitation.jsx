"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Helper: Blob SVG
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

// Helper: Stripes
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

// Helper: Fluid waves
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
            {/* Blob */}
            <motion.div
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{ scale: 1.2, rotate: 20, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute -top-32 -left-32 w-[600px] h-[600px] text-blue-300 dark:text-zinc-800 z-10"
            >
                <Blob className="blur-[90px]" />
            </motion.div>

            <Stripes className="blur-md" />
            <Fluid className="blur-[90px]" />

            {/* Card */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative z-30 bg-white/90 dark:bg-zinc-800/90 shadow-2xl rounded-3xl p-8 w-full max-w-md mx-auto flex flex-col items-center aspect-[9/16] h-[80vh]"
                    >
                        <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-zinc-100">
                            {event?.title || "You're Invited!"}
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-300 mb-4 text-center">
                            {event?.description || "Join us for a special event."}
                        </p>
                        <div className="mb-4 text-blue-500 dark:text-zinc-400 font-semibold">
                            {event?.date && (
                                <span>
                                    {new Date(event.date).toLocaleString(undefined, {
                                        dateStyle: "long",
                                        timeStyle: "short",
                                    })}
                                </span>
                            )}
                        </div>
                        {slug && (
                            <a
                                href={`/events/${slug}`}
                                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition dark:bg-zinc-700 dark:hover:bg-zinc-600"
                            >
                                View Event
                            </a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
