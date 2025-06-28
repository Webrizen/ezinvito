"use client";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up – Get Started with EzInvito",
  description: "Create a free EzInvito account and start planning events, sending custom invites, and managing RSVPs effortlessly.",
};

export default function page() {
  const { theme } = useTheme();
  return (
    <div className="z-30 w-full flex justify-center items-center">
      <SignUp
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
}
