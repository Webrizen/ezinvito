import { ThemeProvider } from "@/providers/themes";
import "./globals.css";
import { archivo } from "@/enums/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "EzInvito | LLM powered Event Invitation Management",
  description: "It's actually easy to create event invitations with EzInvito and manage them all in one place using our state of the art large language models trained specifically for event invitations and different traditions worldwide.",
  keywords: ["event invitations", "event management", "llm powered", "ezinvito"],
  authors: [{ name: "Webrizen Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.className} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full w-full" suppressHydrationWarning>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
