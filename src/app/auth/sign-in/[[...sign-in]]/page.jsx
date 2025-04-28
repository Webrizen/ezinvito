"use client";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { SignIn } from "@clerk/nextjs";

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