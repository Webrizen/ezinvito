import React from 'react'
import Link from 'next/link'
import { Mail, Twitter, Building2 } from 'lucide-react'

export const metadata = {
  title: "Contact Us – EzInvito",
  description: "Have questions, feedback, or support requests? Reach out to the EzInvito team — we're here to help you plan amazing events.",
};


export default function page() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-34 sm:px-6 lg:px-8">
        {/* Header with company mention */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-4 text-sm">
            <Building2 className="w-4 h-4" />
            <span>A Webrizen Product</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            Connect With Us
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            We're here to support your event planning needs
          </p>
        </div>

        {/* Contact cards grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  Email Support
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  For general inquiries, partnerships, or support questions. Our team typically responds within 24-48 hours.
                </p>
                <Link 
                  href="mailto:webrizen@gmail.com" 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  webrizen@gmail.com
                </Link>
              </div>
            </div>
          </div>

          {/* Twitter Card */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-400 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                <Twitter className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                  Twitter Updates
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Follow us for product updates, announcements, and event planning tips from our team.
                </p>
                <Link 
                  href="https://x.com/webrizen" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  @webrizen
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Developer note */}
        <div className="max-w-4xl mx-auto mt-16 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-200/30 dark:border-blue-900/20">
          <p className="text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-800 dark:text-zinc-200">From the developer:</span> While Webrizen handles official communications, you can still reach me personally at{' '}
            <Link href="mailto:nextjs14dev@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              nextjs14dev@gmail.com
            </Link>{' '}
            or{' '}
            <Link href="https://x.com/shadow_jsx" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-400 hover:underline">
              @shadow_jsx
            </Link>{' '}
            for technical discussions.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
            Check our <Link href="/help" className="text-blue-600 dark:text-blue-400 hover:underline">help center</Link> for documentation and FAQs.
          </p>
        </div>
      </div>
    </div>
  )
}