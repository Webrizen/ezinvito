"use client";
import { Suspense, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import { formatDate, formatFullAddress } from '@/lib/utils';
import { jsPDF } from 'jspdf';
import { toPng, toCanvas } from 'html-to-image';

export function InvitationPassSkeleton() {
    return (
        <div className="bg-black p-6 rounded-xl shadow-2xl border border-zinc-800 w-full max-w-3xl aspect-[2/1] animate-pulse">
            <div className="h-full flex flex-row">
                <div className="w-2/5 h-full flex flex-col justify-between p-6 border-r border-zinc-800">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-md bg-zinc-800"></div>
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-zinc-800 rounded"></div>
                                <div className="h-4 w-24 bg-zinc-700 rounded"></div>
                            </div>
                        </div>
                        <div className="h-8 w-3/4 bg-zinc-800 rounded"></div>
                        <div className="h-4 w-full bg-zinc-800 rounded"></div>
                        <div className="h-4 w-2/3 bg-zinc-800 rounded"></div>
                    </div>
                    <div className="h-3 w-32 bg-zinc-800 rounded"></div>
                </div>
                <div className="w-3/5 h-full flex flex-col p-6">
                    <div className="flex-1 space-y-6">
                        <div className="pb-6 border-b border-zinc-800 space-y-3">
                            <div className="h-3 w-16 bg-zinc-800 rounded"></div>
                            <div className="h-8 w-3/4 bg-zinc-700 rounded"></div>
                            <div className="h-1 w-12 bg-yellow-500 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-zinc-800 rounded"></div>
                                <div className="h-6 w-32 bg-zinc-700 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-zinc-800 rounded"></div>
                                <div className="h-6 w-40 bg-zinc-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-4 w-24 bg-zinc-800 rounded ml-auto"></div>
                </div>
            </div>
        </div>
    );
}

export function InvitationPass({
    url,
    expiresAt,
    eventName,
    host,
    attendee,
    eventDescription,
    eventStartTime,
    eventId,
    location
}) {
    const passRef = useRef(null);

    const downloadAsPNG = async () => {
        if (!passRef.current) return;

        try {
           const scale = window.devicePixelRatio || 2; // Better for retina screens
                const desiredWidth = 1150;
                const desiredHeight = 600;
          
                const canvas = await toCanvas(passRef.current, {
                  cacheBust: true,
                  canvasWidth: desiredWidth * scale,
                  canvasHeight: desiredHeight * scale,
                  scale: scale, // Render at higher resolution
                  backgroundColor: '#000000', // Optional: black background for dark themes
                  ignoreElements: (element) =>
                    element.classList?.contains('ignore-on-export'), // Optional: skip some UI parts
                });
          
                // Downscale canvas for crisp output
                const finalCanvas = document.createElement('canvas');
                finalCanvas.width = desiredWidth;
                finalCanvas.height = desiredHeight;
                const ctx = finalCanvas.getContext('2d');
          
                ctx?.drawImage(canvas, 0, 0, desiredWidth, desiredHeight);
          
                const link = document.createElement('a');
                link.download = `${eventName.replace(/\s+/g, '-')}-pass.png`;
                link.href = finalCanvas.toDataURL('image/png');
                link.click();
        } catch (error) {
            console.error('Error generating PNG:', error);
        }
    };

    return (
        <div className="relative">
            <div className="flex gap-2 mb-4 justify-end">
                <button
                    onClick={downloadAsPNG}
                    className="px-4 py-2 bg-zinc-800 cursor-pointer text-white rounded-md hover:bg-zinc-700 transition-colors text-sm flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PNG
                </button>
            </div>
            <div ref={passRef} className="bg-zinc-50 p-6 rounded-xl shadow-xl border border-zinc-200 w-full max-w-3xl relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 bg-white opacity-95"></div>
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(0,0,0,0.05) 0%, transparent 20%)'
                }}></div>

                {/* Metallic border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(212,212,216,0.5) 50%, rgba(255,255,255,0.8) 100%)'
                }}></div>

                {/* Main content */}
                <div className="relative h-full flex flex-row aspect-[2/1]">
                    {/* Left side - Branding */}
                    <div className="w-2/5 h-full flex flex-col justify-between p-6 border-r border-zinc-200">
                        <div>
                            <div className="flex items-center mb-8">
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                    placeholder='blur'
                                    className="w-12 h-12 rounded-md invert"
                                />
                                <div className="ml-3">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Event by</p>
                                    <p className="text-zinc-800 font-medium">{host}</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-zinc-900 mb-2">{eventName}</h2>
                            {eventDescription && (
                                <p className="text-zinc-600 text-sm">{eventDescription}</p>
                            )}
                        </div>

                        <div className="text-zinc-500 text-xs mt-auto">
                            <p>Valid until {new Date(expiresAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}</p>
                        </div>
                    </div>

                    {/* Right side - Attendee Details */}
                    <div className="w-3/5 h-full flex flex-col p-6">
                        {/* Top section with attendee info */}
                        <div className="flex-1 flex flex-col">
                            {/* Attendee info with decorative border */}
                            <div className="mb-6 pb-6 border-b border-zinc-200">
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Attendee</p>
                                <p className="text-zinc-900 text-2xl font-bold tracking-tight">{attendee || "Guest"}</p>
                                <div className="mt-2 h-[2px] w-16 bg-amber-400 rounded-full"></div>
                            </div>

                            {/* Event details in a grid layout */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Event Date</p>
                                    <p className="text-zinc-800 text-md font-medium">
                                        {formatDate(eventStartTime)}
                                    </p>
                                </div>
                                <div className='col-span-2'>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-zinc-800">{formatFullAddress(location)}</p>
                                </div>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="absolute top-6 right-6">
                            <div className="bg-white p-2 rounded-lg shadow-md border border-zinc-200">
                                <div className="relative w-[100px] h-[100px]">
                                    <QRCodeSVG
                                        value={url}
                                        size={100}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        level="H"
                                        includeMargin={true}
                                    />
                                    <Image
                                        src={Logo}
                                        alt="Logo"
                                        width={20}
                                        height={20}
                                        placeholder='blur'
                                        className="absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-1 border border-zinc-800 invert"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom section with ID */}
                        <div className="flex justify-end items-end mt-8">
                            <div className="text-right">
                                <div className="text-zinc-500 text-sm">
                                    <p className="text-xs mb-1">Ticket ID</p>
                                    <p className="font-mono text-zinc-800 text-xs tracking-wider">#{eventId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-amber-400 opacity-20 blur-md"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-blue-300 opacity-10 blur-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-300 opacity-30"></div>
            </div>
        </div>
    );
}

export default function InvitationPassContainer(props) {
    return (
        <Suspense fallback={<InvitationPassSkeleton />}>
            <InvitationPass {...props} />
        </Suspense>
    );
}