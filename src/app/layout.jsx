import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from 'nextjs-toploader';

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "EzInvito – Event Invitations & Guest Management by Webrizen",
  description:
    "Plan stunning events, create animated invites, manage RSVPs, track expenses, and share memories — all with EzInvito by Webrizen.",
  keywords: [
    "event management software",
    "RSVP platform",
    "invitation maker by Webrizen",
    "animated wedding invitations",
    "digital RSVP tool",
    "guest list manager",
    "event dashboard SaaS",
    "custom RSVP link generator",
    "EzInvito by Webrizen",
    "wedding website builder",
    "event automation tool",
    "Webrizen event tools"
  ],
  authors: [{ name: "Webrizen Team", url: "https://webrizen.com" }],
  creator: "Webrizen",
  openGraph: {
    title: "EzInvito – Event Planning, Invitations & RSVP by Webrizen",
    description:
      "Simplify your events with EzInvito by Webrizen: custom invitations, smart RSVPs, guest tracking, and analytics — all in one powerful platform.",
    url: "https://ezinvito.vercel.app",
    siteName: "EzInvito by Webrizen",
    images: [
      {
        url: "https://ezinvito.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "EzInvito by Webrizen – Event Planning Simplified",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EzInvito – Plan, Invite, Celebrate | By Webrizen",
    creator: "@shadow_jsx",
    description:
      "Send beautiful animated invites, manage RSVPs, and plan events with ease. EzInvito by Webrizen is your complete event toolkit — free forever.",
    images: ["https://ezinvito.vercel.app/og-image.png"],
  },
  metadataBase: new URL("https://ezinvito.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'kThCblVYK2X0Rwp5rR1Tuy4Pv50WA26VgDFB4MZTt2o',
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${bricolage.className} antialiased`} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="#1d4ed8"
              initialPosition={0.1}
              crawlSpeed={250}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease-in-out"
              speed={300}
              shadow="0 0 8px rgba(29, 78, 216, 0.4)"
              template='
    <div class="bar" role="bar" style="
      background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #1d4ed8 100%);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    ">
      <div class="peg" style="
        height: 100%;
        background: #fafafa;
        opacity: 0.6;
      "></div>
    </div>'
              zIndex={1000}
              showAtBottom={false}
              showForHashAnchor={true}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
