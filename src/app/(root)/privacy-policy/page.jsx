import React from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function page() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
            Privacy Policy
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 prose dark:prose-invert max-w-none">
          <p className="lead">
            At Webrizen, we take your privacy seriously. This policy explains how we collect, use, and protect your information through Ezinvito.
          </p>

          <h2>1. Information Collection</h2>
          <p>
            We collect information to provide better services to our users:
          </p>
          <ul>
            <li><strong>Account Data:</strong> Name, email address, profile information</li>
            <li><strong>Event Data:</strong> Event details, guest lists, RSVP information</li>
            <li><strong>Usage Data:</strong> How you interact with our platform</li>
            <li><strong>Device Data:</strong> IP address, browser type, operating system</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send notifications</li>
            <li>Respond to customer service requests</li>
            <li>Detect and prevent fraudulent activity</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share information with:</p>
          <ul>
            <li>Service providers who assist with our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Affiliates under common control with Webrizen</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption, access controls, and regular security audits. However, no system can be 100% secure.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and receive a copy of your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
          </ul>
          <p>
            To exercise these rights, contact us at <Link href="mailto:privacy@webrizen.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@webrizen.com</Link>.
          </p>

          <h2>6. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. We'll notify you of significant changes by email or through our platform.
          </p>

          <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <p>
              For privacy-related inquiries: <Link href="mailto:privacy@webrizen.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@webrizen.com</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Webrizen. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}