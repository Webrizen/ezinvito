import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 pb-16 pt-36 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Right now, everything's on us. Enjoy our platform completely free as we grow together.
          </p>
        </div>

        {/* Pricing cards container */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 mb-20">
          {/* Free tier card - made more prominent */}
          <div className="relative flex-1 max-w-lg bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden border-2 border-blue-500 dark:border-blue-600 transform hover:scale-[1.02] transition-all duration-200">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Forever Free</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Our gift to early supporters</p>
              </div>
              
              <div className="text-center mb-8">
                <span className="text-5xl font-bold text-zinc-800 dark:text-zinc-100">$0</span>
                <span className="text-zinc-500 dark:text-zinc-400">/month</span>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Unlimited events and guests",
                  "All premium features included",
                  "Custom invitation designs",
                  "QR check-in system",
                  "Guest management tools",
                  "Data privacy guaranteed"
                ].map((feature) => (
                  <div key={feature} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/auth/sign-up" className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center transition-colors">
                Get Started - It's Free
              </Link>
            </div>
          </div>

          {/* Future plans teaser */}
          <div className="flex-1 max-w-lg bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <div className="p-8 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">What's Coming</h2>
                <p className="text-zinc-600 dark:text-zinc-400">Preview of future premium options</p>
              </div>
              
              <div className="flex-grow space-y-6">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg">
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Pro Plan</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">For power users and businesses</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Custom domains</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg">
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Enterprise</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">For large organizations</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>SSO integration</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-4 w-4 text-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Custom contracts</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  These are just ideas - we'd love <Link href="/contact" className="text-blue-500 hover:underline">your input</Link> on what to build next!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value proposition section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "No lock-in",
              icon: "🔓",
              description: "Your data is always yours. Export anytime if you choose to leave."
            },
            {
              title: "Built with care",
              icon: "❤️",
              description: "We're crafting this tool thoughtfully, not chasing growth at all costs."
            },
            {
              title: "Community-first",
              icon: "👥",
              description: "Your feedback directly shapes our roadmap and priorities."
            }
          ].map((item) => (
            <div key={item.title} className="bg-white dark:bg-zinc-800 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-2">{item.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Promise section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center border border-blue-100 dark:border-blue-900/50 mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Our Commitment to You</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-6">
            We promise to always offer a generous free tier, be transparent about changes, and never hold your data hostage. 
            This platform exists to serve you, not the other way around.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="px-6 py-2 bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 font-medium rounded-md border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
              Learn about our values
            </Link>
            <Link href="/contact" className="px-6 py-2 text-blue-600 dark:text-blue-400 font-medium rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              Ask us anything
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}