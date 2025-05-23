import { ThemeToggleButton } from "@/components/ui/theme-toggle-button";
import { Toaster } from "@/components/ui/sonner";


export default function EventLayout({ children }) {
  return (
    <div className="relative">
      {children}
      <div className="absolute bottom-2 right-2 z-50 p-4">
        <ThemeToggleButton variant="circle-blur" start="bottom-right" />
      </div>
      <Toaster />
    </div>
  )
}