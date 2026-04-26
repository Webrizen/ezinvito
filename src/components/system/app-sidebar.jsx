"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/assets/logo.png"
import { useUser } from "@clerk/nextjs"
import { ThemeSwitch } from "../ui/theme-switch"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Events",
      url: "/dashboard/events",
      items: [
        {
          title: "All Events",
          url: "/dashboard/events",
        },
        {
          title: "Create Event",
          url: "/dashboard/events/create",
        },
      ],
    },
    {
      title: "Invitations",
      url: "/dashboard/invitations",
      items: [
        {
          title: "All Invitations",
          url: "/dashboard/invitations",
        },
        {
          title: "Create Invitation",
          url: "/dashboard/invitations/create",
        },
      ],
    },
    {
      title: "Guests",
      url: "/dashboard/guests",
      items: [
        {
          title: "All Guests",
          url: "/dashboard/guests",
        },
        {
          title: "Add Guest",
          url: "/dashboard/guests/add",
        },
      ],
    },
    {
      title: "QR Codes",
      url: "/dashboard/qr-entries",
      items: [
        {
          title: "All QR Codes",
          url: "/dashboard/qr-entries",
        },
        {
          title: "Generate QR Code",
          url: "/dashboard/qr-entries/create",
        },
        {
          title: "Scan QR Code",
          url: "/dashboard/qr-entries/scan",
        },
      ],
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      items: [
        {
          title: "View Calendar",
          url: "/dashboard/calendar",
        },
      ],
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-teal-900 text-sidebar-primary-foreground">
                  <Image src={Logo} alt="Logo" placeholder="blur" width={40} height={40} className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">EzInvito Dashboard</span>
                  <span className="text-xs text-muted-foreground">v1.2.4</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center">
            {isLoaded && isSignedIn && user ? (
              <Link href="/dashboard/profile" className="flex items-center gap-4 p-2 rounded-full hover:bg-muted transition-colors duration-300">
                <img
                  src={user.imageUrl}
                  alt={`${user.fullName}'s profile picture`}
                  className="size-8 rounded-full object-cover ring-2 ring-background shadow-md shrink-0"
                />

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold leading-tight truncate">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight truncate mt-0.5">
                    {user.emailAddresses[0].emailAddress}
                  </span>
                </div>
              </Link>
            ) : <div className="w-full h-10 bg-muted rounded-full flex items-center justify-center text-sm">Not Signed In</div>}
            <ThemeSwitch variant="circle-blur" start="bottom-left" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
