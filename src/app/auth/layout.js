import React from 'react';
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Logo from "@/assets/logo.png";
import Image from 'next/image';
import AuthImg from "@/assets/auth.png";
import { ThemeSwitch } from '@/components/ui/theme-switch';

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-full w-full p-4 lg:grid-cols-2">
        <div className="m-auto flex w-full max-w-xs flex-col items-center">
          <Image src={Logo} alt="Logo" placeholder="blur" className="h-9 w-9" />
          <p className="mt-4 font-medium text-xl">
            Sign up for EzInvito
          </p>


          <div className="my-7 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span className="px-2 text-sm whitespace-nowrap">It's Ez</span>
            <Separator />
          </div>

          {children}

          <p className="mt-5 text-center text-sm">
            Before you continue, please read our <Link className="ml-1 text-muted-foreground underline" href="/terms">Terms of Service</Link> and <Link className="ml-1 text-muted-foreground underline" href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
        <div className="relative hidden rounded-lg border bg-muted lg:block overflow-hidden group">
          <Image src={AuthImg} alt="Auth" placeholder='blur' className="h-full w-full object-cover absolute inset-0 grayscale-100 group-hover:grayscale-0 transition-all duration-300" />
          <div className="absolute top-4 left-4 flex flex-row items-center gap-2 bg-muted/10 backdrop-blur-sm rounded-full py-2 px-3 pr-6">
            <ThemeSwitch />
            <span className="text-sm text-white">Switch Theme</span>
          </div>
        </div>
      </div>
    </div>
  )
}
