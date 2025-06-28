import React from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export const metadata = {
  title: "Terms & Conditions – EzInvito",
  description: "Read the terms and conditions for using EzInvito. Understand your rights, responsibilities, and the platform's usage policies.",
};


export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 prose dark:prose-invert max-w-none">
          <p className="lead">
            By accessing or using Ezinvito ("Service"), you agree to be bound by these Terms. If you disagree, you may not use the Service.
          </p>

          <h2>1. Account Registration</h2>
          <ul>
            <li>You must provide accurate and complete registration information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must be at least 16 years old to use the Service</li>
          </ul>

          <h2>2. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for illegal purposes</li>
            <li>Harass, abuse, or harm others</li>
            <li>Upload malicious code or viruses</li>
            <li>Attempt unauthorized access to our systems</li>
            <li>Use automated systems to access the Service</li>
          </ul>

          <h2>3. Content Ownership</h2>
          <ul>
            <li>You retain ownership of content you create using Ezinvito</li>
            <li>You grant Webrizen a license to use your content to provide the Service</li>
            <li>We may remove content that violates these Terms</li>
          </ul>

          <h2>4. Payments & Refunds</h2>
          <ul>
            <li>Premium features require payment</li>
            <li>All fees are non-refundable except as required by law</li>
            <li>We may change pricing with 30 days notice</li>
          </ul>

          <h2>5. Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these Terms. You may terminate your account at any time.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            WEBRIZEN SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES RESULTING FROM USE OF THE SERVICE.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.
          </p>

          <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <p>
              For questions about these Terms: <Link href="mailto:legal@webrizen.com" className="text-blue-600 dark:text-blue-400 hover:underline">legal@webrizen.com</Link>
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