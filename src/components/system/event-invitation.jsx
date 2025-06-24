"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Templates } from "@/enums/template";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Blob SVG Background
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

// Animated Stripes
const Stripes = () => (
    <div className="absolute inset-0 pointer-events-none">
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
                className="absolute top-0 h-full w-[15%] opacity-30 blur-[90px] bg-gradient-to-b from-blue-400 to-blue-600 dark:from-zinc-600 dark:to-zinc-800"
                style={{ left: `${i * 5}%` }}
            />
        ))}
    </div>
);

// Fluid Wave Animation
const Fluid = () => (
    <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 1.2, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-1/3 z-20 pointer-events-none blur-[90px]"
    >
        <svg viewBox="0 0 1440 320" className="w-full h-full fill-current">
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
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        attendanceStatus: "going",
        guests: [{ name: "", relationship: "" }],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuestChange = (index, field, value) => {
        const updatedGuests = [...formData.guests];
        updatedGuests[index][field] = value;
        setFormData((prev) => ({ ...prev, guests: updatedGuests }));
    };

    const addGuest = () =>
        setFormData((prev) => ({
            ...prev,
            guests: [...prev.guests, { name: "", relationship: "" }],
        }));

    const removeGuest = (index) =>
        setFormData((prev) => ({
            ...prev,
            guests: prev.guests.filter((_, i) => i !== index),
        }));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError("");
        try {
            const response = await fetch(`/api/events/${event._id}/guests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Something went wrong");

            toast.success("RSVP submitted successfully! generating passes, please wait...");
            router.push(`/event/${slug}/passes?rsvpId=${result.rsvp._id}`);
        } catch (err) {
            setError(err.message);
            toast.error("Submission failed", { description: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

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

            <Stripes />
            <Fluid />

            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="relative z-30 bg-white shadow-2xl rounded-3xl w-full md:max-w-[450px] md:mx-auto mx-4 aspect-[9/16] md:h-[650px] h-[700px] flex flex-col p-8 justify-between border border-zinc-100 overflow-hidden"
                        style={{
                            backgroundImage: `url(${Templates.find(
                                (t) => t.id === event?.invitationDesign?.templateId
                            )?.image || "/default-invite.jpg"
                                })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Card Content */}
                        <div className="relative z-10 h-full flex flex-col backdrop-blur-[1px] p-6 rounded-2xl bg-card-invite">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-block px-4 py-1 mb-4 text-xs font-medium tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
                                    {event?.eventType || "Workshop"}
                                </div>
                                <h1 className="text-3xl font-bold text-zinc-800 mb-2">
                                    {event?.title || "Tech Innovators Meetup"}
                                </h1>
                                <div className="flex justify-center">
                                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 flex flex-col justify-center space-y-6">
                                <DateTimeDisplay event={event} />
                                <LocationDisplay event={event} />
                                <HostDisplay event={event} />
                            </div>

                            {/* Description */}
                            <div className="mt-6 mb-8 text-center !text-[6px]">
                                <p className="text-sm italic text-zinc-600 px-4">
                                    {event?.description ||
                                        "RSVP Now"}
                                </p>
                            </div>

                            {/* CTA Button */}
                            {isDesktop ? (
                                <RSVPDialog
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleGuestChange={handleGuestChange}
                                    addGuest={addGuest}
                                    removeGuest={removeGuest}
                                    handleSubmit={handleSubmit}
                                    error={error}
                                    isSubmitting={isSubmitting}
                                />
                            ) : (
                                <RSVPDrawer
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleGuestChange={handleGuestChange}
                                    addGuest={addGuest}
                                    removeGuest={removeGuest}
                                    handleSubmit={handleSubmit}
                                    error={error}
                                    isSubmitting={isSubmitting}
                                />
                            )}

                            {/* Decorative Corners */}
                            <CornerDecos />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Reusable Components

const DateTimeDisplay = ({ event }) => (
    <div className="text-center">
        <svg
            className="w-6 h-6 mx-auto mb-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
        </svg>
        <p className="text-xs uppercase tracking-wider text-blue-500 mb-1">When</p>
        <p className="font-medium text-zinc-700">
            {event?.date
                ? new Date(event.date).toLocaleString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })
                : "Saturday, May 25, 2025 at 3:11 PM"}
        </p>
    </div>
);

const LocationDisplay = ({ event }) => (
    <div className="text-center">
        <svg
            className="w-6 h-6 mx-auto mb-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
        <p className="text-xs uppercase tracking-wider text-blue-500 mb-1">Where</p>
        <p className="font-medium text-zinc-700">
            {event?.location?.venue || "The Innovation Hub"}
        </p>
        <p className="text-sm text-zinc-500">
            {event?.location?.address?.city}, {event?.location?.address?.state}
        </p>
    </div>
);

const HostDisplay = ({ event }) => (
    <div className="text-center">
        <svg
            className="w-6 h-6 mx-auto mb-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
        <p className="text-xs uppercase tracking-wider text-blue-500 mb-1">
            Hosted by
        </p>
        <p className="font-medium text-zinc-700">{event?.host || "Alex"}</p>
    </div>
);

const RSVPDialog = ({
    formData,
    handleChange,
    handleGuestChange,
    addGuest,
    removeGuest,
    handleSubmit,
    error,
    isSubmitting,
}) => (
    <Dialog>
        <DialogTrigger asChild>
            <button className="relative px-5 py-2 font-medium text-white group mx-auto bottom-6 cursor-pointer">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-blue-500 group-hover:bg-blue-700 group-hover:skew-x-12"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-blue-700 group-hover:bg-blue-500 group-hover:-skew-x-12"></span>
                <span className="relative">RSVP Now</span>
            </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-white rounded-xl border border-zinc-200 p-0 overflow-hidden">
            <DialogBody
                formData={formData}
                handleChange={handleChange}
                handleGuestChange={handleGuestChange}
                addGuest={addGuest}
                removeGuest={removeGuest}
                handleSubmit={handleSubmit}
                error={error}
                isSubmitting={isSubmitting}
            />
        </DialogContent>
    </Dialog>
);

const RSVPDrawer = ({
    formData,
    handleChange,
    handleGuestChange,
    addGuest,
    removeGuest,
    handleSubmit,
    error,
    isSubmitting,
}) => (
    <Drawer>
        <DrawerTrigger asChild>
            <button className="relative px-5 py-2 font-medium text-white group mx-auto bottom-2 cursor-pointer">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-blue-500 group-hover:bg-blue-700 group-hover:skew-x-12"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-blue-700 group-hover:bg-blue-500 group-hover:-skew-x-12"></span>
                <span className="relative">RSVP Now</span>
            </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh]">
            <DrawerBody
                formData={formData}
                handleChange={handleChange}
                handleGuestChange={handleGuestChange}
                addGuest={addGuest}
                removeGuest={removeGuest}
                handleSubmit={handleSubmit}
                error={error}
                isSubmitting={isSubmitting}
            />
        </DrawerContent>
    </Drawer>
);

const DialogBody = ({
    formData,
    handleChange,
    handleGuestChange,
    addGuest,
    removeGuest,
    handleSubmit,
    error,
    isSubmitting,
}) => (
    <>
        <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold text-zinc-800">
                    Join the Event
                </DialogTitle>
                <DialogDescription className="text-zinc-500">
                    Fill out your details below to confirm your attendance.
                </DialogDescription>
            </DialogHeader>
            <div className="p-6 pt-4 space-y-6">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <RSVPForm
                    formData={formData}
                    handleChange={handleChange}
                    handleGuestChange={handleGuestChange}
                    addGuest={addGuest}
                    removeGuest={removeGuest}
                />
            </div>
            <DialogFooter className="p-6 pt-0 flex justify-between">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : "Confirm Attendance"}
                </button>
            </DialogFooter>
        </div>
    </>
);

const DrawerBody = ({
    formData,
    handleChange,
    handleGuestChange,
    addGuest,
    removeGuest,
    handleSubmit,
    error,
    isSubmitting,
}) => (
    <div className="mx-auto w-full max-w-md">
        <DrawerHeader className="text-left px-6 pt-6 pb-0">
            <DrawerTitle className="text-2xl font-bold text-zinc-800">
                Join the Event
            </DrawerTitle>
            <DrawerDescription className="text-zinc-500">
                Fill out your details below to confirm your attendance.
            </DrawerDescription>
        </DrawerHeader>
        <div className="p-6 pt-4 pb-8 overflow-y-auto space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <RSVPForm
                formData={formData}
                handleChange={handleChange}
                handleGuestChange={handleGuestChange}
                addGuest={addGuest}
                removeGuest={removeGuest}
            />
        </div>
        <DrawerFooter className="px-6 pt-0 pb-6">
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Submitting..." : "Confirm Attendance"}
            </button>
            <DrawerClose asChild>
                <button className="mt-2 w-full py-2.5 px-4 text-zinc-700 font-medium rounded-lg border border-zinc-300 hover:bg-zinc-50">
                    Cancel
                </button>
            </DrawerClose>
        </DrawerFooter>
    </div>
);

const RSVPForm = ({
    formData,
    handleChange,
    handleGuestChange,
    addGuest,
    removeGuest,
}) => (
    <>
        <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
        />
        <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
        />
        <InputField
            label="Phone Number (Optional)"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
        />
        <SelectField
            label="Will you attend?"
            name="attendanceStatus"
            value={formData.attendanceStatus}
            onChange={handleChange}
            options={[
                { value: "going", label: "I'm Going 🎉" },
                { value: "not-sure", label: "Not Sure Yet ❓" },
                { value: "not-going", label: "Can't Attend 😢" },
            ]}
        />

        <div className="mt-6">
            <h3 className="font-semibold text-zinc-700 mb-2">Additional Guests</h3>
            {formData.guests.map((guest, index) => (
                <div key={index} className="flex gap-2 items-end mb-3">
                    <InputField
                        placeholder="Name"
                        value={guest.name}
                        onChange={(e) => handleGuestChange(index, "name", e.target.value)}
                        className="flex-1"
                    />
                    <InputField
                        placeholder="Relationship"
                        value={guest.relationship}
                        onChange={(e) =>
                            handleGuestChange(index, "relationship", e.target.value)
                        }
                        className="flex-1"
                    />
                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => removeGuest(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={addGuest}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Guest
            </button>
        </div>
    </>
);

const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    className = "",
    required = false,
}) => (
    <div className={`space-y-1 ${className}`}>
        {label && (
            <label className="block text-sm font-medium text-zinc-700">{label}</label>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-2 border border-zinc-300 dark:text-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-zinc-300 text-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="text-zinc-800">
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

const CornerDecos = () => (
    <>
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-200 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-200 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-200 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-200 rounded-br-lg"></div>
    </>
);