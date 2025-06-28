"use client";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In – EzInvito",
  description: "Access your EzInvito dashboard to create, manage, and track your events in one seamless platform.",
};

export default function page() {
  const { theme } = useTheme();
  return (
    <div className="relative z-30">
      <SignIn
      appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
       />
    </div>
  );
}