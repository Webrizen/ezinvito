"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EzInvito from "@/assets/logo.png";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past 100vh
      if (window.scrollY > window.innerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`p-2 fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
      ? "dark:bg-zinc-900 bg-zinc-50 backdrop-blur-3xl"
      : "bg-transparent backdrop-blur-none"
      }`}>
      <div className="md:container mx-auto flex justify-between items-center md:px-5">
        <Link
          href="/"
          className="h-10 w-auto flex gap-2 items-center p-1 rounded-md hover:bg-[rgba(225,225,225,0.05)] mr-3"
        >
          <Image
            src={EzInvito}
            alt="EzInvito Logo"
            width={500}
            height={500}
            className="h-full w-auto invert dark:filter-none"
          />
          <span className="md:block hidden whitespace-nowrap">EzInvito</span>
        </Link>

        <nav className="lg:flex hidden md:border-l md:border-zinc-500 md:px-3 lg:flex-row flex-col flex-grow md:relative absolute md:w-auto w-full left-0 right-0 md:top-auto top-16 z-50 text-sm items-center">
          <Link
            href="/"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Home
          </Link>

<Link
            href="/#features"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Features
          </Link>
          

          <Link
            href="/pricing"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="relative px-4 py-2 text-sm mr-2 overflow-hidden font-medium text-gray-600 bg-gray-100 border dark:border-zinc-500 border-gray-100 rounded-full shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  Dashboard
                </span>
              </Link>
              <UserButton />
            </>
          ) : (
            <Button asChild>
              <Link
                href="/auth/sign-in"
              >
                Login
              </Link>
            </Button>
          )}
          <ThemeToggleButton variant="circle-blur" start="top-right" />
          <Sheet>
            <SheetTrigger className="w-10 h-10 md:hidden flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)] rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </SheetTrigger>
            <SheetContent className="bg-white dark:bg-black border-l-zinc-100/30">
              <SheetHeader className="text-left">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate Revive Edge. Break limits. Never give up.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-3 p-2">
                {[
                  { href: "/#features", title: "Features", description: "get to know why this platform exist and how better it is..." },
                  { href: "/pricing", title: "Pricing", description: "Affordable plans for every event invitation sent to your guests." },
                  { href: "/about", title: "About", description: "Learn more about us, our mission, and values and more." },
                  { href: "/contact", title: "Contact", description: "Get in touch with us, just say HI and we will reach out to you." }
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block space-y-1 rounded-md p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-[rgba(225,225,225,0.1)]"
                  >
                    <div className="text-sm font-medium leading-none">
                      {link.title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;