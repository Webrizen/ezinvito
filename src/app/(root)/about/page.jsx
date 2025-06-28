import React from 'react'
import Link from 'next/link'
import AboutImg from "@/assets/about.jpg";
import Image from 'next/image';
import { Building2, Code, Twitter } from 'lucide-react'

export const metadata = {
  title: "About Us – EzInvito by Webrizen",
  description: "Learn about EzInvito’s mission to simplify event planning through AI-powered digital invites and guest management. Built with love by Webrizen.",
};

export default function page() {
  return (
    <div className="h-screen bg-zinc-50 dark:bg-zinc-900 grid md:grid-cols-[1fr_.5fr] overflow-hidden">
     <div className="w-full px-4 py-26 sm:px-6 lg:px-8 h-full overflow-y-auto no-scrollbar relative z-10 bg-gradient-to-r from-zinc-50/100 via-zinc-50/90 to-zinc-50/0 dark:from-zinc-900/100 dark:via-zinc-900/90 dark:to-zinc-900/0">
        {/* Company Header */}
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-4 text-sm">
          <Building2 className="w-4 h-4" />
          <span>A Webrizen Product</span>
        </div>

        {/* Hero Section */}
        <div className="text-left mb-12 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            Ezinvito by Webrizen
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Professional event management solutions built with care
          </p>
        </div>

        {/* Company Story */}
        <div className="mb-12 w-full">
          <div className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 mb-8">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
              Our Mission
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Webrizen creates tools that simplify digital experiences. Ezinvito embodies our commitment to helping people connect through meaningful events.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              What began as a personal project by our lead developer has grown into a platform trusted by organizations and individuals alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-3">Our Values</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Privacy, simplicity, and reliability guide every decision we make in developing Ezinvito.
              </p>
            </div>
            <div className="bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm p-6 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-3">The Technology</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Built with modern web technologies designed for performance and longevity.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Note */}
        <div className="bg-blue-50/70 dark:bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-blue-100/50 dark:border-blue-900/30 mb-8">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            From Our Lead Developer
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            "Ezinvito represents my commitment to creating tools that outlast their creators. While I maintain some anonymity as 'Shadow Architect', my dedication to this project is absolute."
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Code className="w-4 h-4" />
            <span>Building for the future since 2023</span>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-left w-full">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            Join Our Journey
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 w-full">
            Experience professional event management with Ezinvito's free tier, backed by Webrizen's commitment to quality.
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            <Link 
              href="/dashboard/invitations/create-invitation" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Create Your First Event
            </Link>
            <Link 
              href="https://x.com/webrizen" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-medium rounded-md border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors flex items-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Follow Webrizen
            </Link>
          </div>
        </div>
      </div>
      <div className='relative h-full w-full overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-l from-zinc-100/50 to-transparent dark:from-zinc-800/50 z-10 pointer-events-none' />
        <Image 
          src={AboutImg} 
          alt='Event planning illustration' 
          fill
          placeholder='blur' 
          className='object-cover object-center'
          style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 60%, rgba(0,0,0,0))' }}
        />
      </div>
    </div>
  )
}