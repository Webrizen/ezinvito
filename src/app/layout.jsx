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
  title: "EzInvito",
  description:
    "Plan events, create animated invitations, collect RSVPs, manage expenses, and share memories — all in one place.",
  keywords: [
    "event management",
    "RSVP platform",
    "invitation maker",
    "wedding website",
    "animated invitation",
    "custom RSVP",
    "event planner",
    "EzInvito",
    "event dashboard",
    "guest list management",
  ],
  authors: [{ name: "EzInvito Team", url: "https://ezinvito.vercel.app" }],
  creator: "EzInvito",
  openGraph: {
    title: "EzInvito",
    description: "Create, invite, manage — the complete event toolkit.",
    url: "https://ezinvito.vercel.app",
    siteName: "EzInvito",
    images: [
      {
        url: "https://ezinvito.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "EzInvito - Your Event, Elevated",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EzInvito",
    creator: "@shadow_jsx",
    description: "Plan. Invite. Celebrate. All in one place — EzInvito.",
    images: ["https://ezinvito.vercel.app/og-image.png"],
  },
  metadataBase: new URL("https://ezinvito.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
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
