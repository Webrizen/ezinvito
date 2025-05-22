"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <div className="relative overflow-hidden py-24 lg:py-32">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r dark:from-black/50 dark:to-black from-slate-100/50 to-slate-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem]  from-slate-200/50 to-slate-200 dark:from-[#1f1f1f] dark:to-slate-900" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="text-muted-foreground">
                Oops! You’ve wandered off...
              </p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  404 - Page Not Found
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Looks like the page you're looking for doesn't exist. It might
                  have been moved, deleted, or you took a wrong turn on the
                  internet highway.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Button size="lg" onClick={() => { router.back() }}>
                  Go Back
                </Button>
                <Button size="lg" variant="ghost">
                  <Link
                    href="/contact"
                    className="size-full flex justify-center items-center text-center"
                  >
                    {" "}
                    Get Help
                  </Link>
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}