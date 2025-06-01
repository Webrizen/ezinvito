import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left: Product Info */}
                <div className="text-center md:text-left">
                    <p>
                        <span className="font-semibold text-zinc-800 dark:text-white">
                            EzInvito
                        </span>{" "}
                        — built by{" "}
                        <a
                            href="https://revive-arsh.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Arsh
                        </a>{" "}
                        under{" "}
                        <a
                            href="https://webrizen.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Webrizen
                        </a>
                    </p>
                    <p className="mt-1">
                        © {new Date().getFullYear()} Webrizen. All rights reserved.
                    </p>
                </div>

                {/* Right: Links */}
                <div className="flex gap-6 justify-center">
                    <Link
                        href="/privacy-policy"
                        className="hover:text-black dark:hover:text-white transition"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms-conditions"
                        className="hover:text-black dark:hover:text-white transition"
                    >
                        Terms and conditions
                    </Link>
                </div>
            </div>
        </footer>
    )
}