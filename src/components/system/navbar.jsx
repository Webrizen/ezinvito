'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import Logo from "@/assets/logo.png";
import { useAuth } from '@clerk/nextjs';

const transition = { duration: 0.9, ease: [0.76, 0, 0.24, 1] };
const SLICE_COUNT = 6;

const navItems = [
  { title: "Home", href: "/", img: `${Logo.src}` },
  { title: "Events", href: "/events", img: "https://i.pinimg.com/1200x/39/2c/91/392c91abea80c680786f89d02d196607.jpg" },
  { title: "Pricing", href: "/pricing", img: "https://i.pinimg.com/736x/56/62/e6/5662e60f3491e956e1720c862bc84f70.jpg" },
  { title: "About", href: "/about", img: "https://i.pinimg.com/736x/46/23/e8/4623e8d6ffba32df8d04e732a323cf7e.jpg" },
  { title: "Contact", href: "/contact", img: "https://i.pinimg.com/736x/f0/0f/41/f00f417f6599cb0f6a71544c531911f7.jpg" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      <header className='w-full relative'>
        <nav className='w-full flex flex-row items-center justify-between p-4 relative z-50'>
          <Link href="/" className='flex items-center gap-2 hover:bg-accent-foreground/5 rounded-full px-2 py-1'>
            <Image src={Logo} alt="Logo" width={100} height={100} className='size-8 dark:invert-0 invert' />
            <span className='text-xl font-semibold'>EzInvito</span>
          </Link>

          <div className='flex items-center gap-2'>
            <div className='p-1 rounded-full flex flex-row items-center bg-teal-50 gap-0.5 border border-teal-950/10'>
              {isLoaded && isSignedIn ? (
                <Link href="/dashboard" className='px-4 py-2 rounded-l-full text-black bg-linear-to-l hover:from-teal-800 hover:to-teal-900 hover:text-white'>Dashboard</Link>
              ) : (
                <Link href="/auth/sign-in" className='px-4 py-2 rounded-l-full text-black bg-linear-to-l hover:from-teal-800 hover:to-teal-900 hover:text-white'>Sign in</Link>
              )}
              <Link href="/dashboard/create-event" className='px-4 py-2 bg-linear-to-r from-teal-800 to-teal-900 text-white rounded-r-full hover:from-teal-600'>Create event</Link>

            </div>
            <div className="pointer-events-auto">
              <ThemeSwitch variant="circle-blur" start="top-right" />
            </div>
          </div>
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className='size-14 dark:bg-white dark:text-black bg-black text-white rounded-full fixed bottom-8 top-auto mt-auto mx-auto left-0 right-0 flex justify-center items-center cursor-pointer z-40 shadow-2xl hover:scale-105 transition-transform duration-300'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
      </header>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% calc(100% - 60px))' }}
            animate={{ clipPath: 'circle(150% at 50% calc(100% - 60px))' }}
            exit={{ clipPath: 'circle(0% at 50% calc(100% - 60px))' }}
            transition={transition}
            className="fixed inset-0 z-60 bg-[#0a0a0a] text-white overflow-hidden flex items-center"
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 z-70 flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer group"
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] group-hover:-translate-x-1 transition-transform">Close</span>
              <div className="size-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </motion.button>

            <div className="absolute inset-0 w-full h-full md:w-1/2 md:right-0 md:left-auto opacity-60 md:opacity-100 pointer-events-none overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={hoveredIndex}
                  className="absolute inset-0 w-full h-full flex"
                >
                  {Array.from({ length: SLICE_COUNT }).map((_, i) => {
                    const isEven = i % 2 === 0;

                    return (
                      <motion.div
                        key={i}
                        className="relative h-full overflow-hidden"
                        style={{ width: `${100 / SLICE_COUNT}%` }}
                        initial={{
                          clipPath: isEven ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
                          filter: 'blur(20px) contrast(200%)',
                          y: isEven ? 50 : -50
                        }}
                        animate={{
                          clipPath: 'inset(0% 0 0 0)',
                          filter: 'blur(0px) contrast(100%)',
                          y: 0
                        }}
                        exit={{
                          clipPath: isEven ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
                          filter: 'blur(20px) contrast(200%)',
                          y: isEven ? -50 : 50
                        }}
                        transition={{
                          ...transition,
                          delay: i * 0.05
                        }}
                      >
                        <motion.img
                          src={navItems[hoveredIndex].img}
                          alt={navItems[hoveredIndex].title}
                          className="absolute top-0 h-full max-w-none object-cover"
                          style={{
                            width: `${SLICE_COUNT * 100}%`,
                            left: `-${i * 100}%`
                          }}
                          initial={{ scale: 1.3 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 1.3 }}
                          transition={{ ...transition, delay: i * 0.05 }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-transparent to-transparent hidden md:block z-10"></div>
            </div>

            {/* Navigation Links */}
            <div className="relative z-10 w-full px-8 md:px-24 flex flex-col justify-center h-full">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.title}
                    onMouseEnter={() => setHoveredIndex(index)}
                    initial={{ y: 50, opacity: 0, rotateX: -20 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -50, opacity: 0, rotateX: 20 }}
                    transition={{ ...transition, delay: 0.1 + (index * 0.05) }}
                    style={{ perspective: 1000 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-5xl md:text-8xl font-black uppercase tracking-tighter transition-colors duration-500 block w-fit ${hoveredIndex === index ? 'text-teal-300' : 'text-white/40'}`}
                    >
                      <motion.span
                        className="block origin-left"
                        whileHover={{ skewX: -5, x: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {item.title}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-20 mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}