import React from 'react';
import Navbar from '@/components/system/navbar';

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen w-full">
                {children}
            </main>
        </>
    )
}
