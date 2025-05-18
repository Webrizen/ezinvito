import React from "react";
import Sidebar from "@/components/system/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="w-full">
     <Sidebar children={children} />
    </section>
  );
}