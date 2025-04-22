import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

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
    creator: '@shadow_jsx',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
