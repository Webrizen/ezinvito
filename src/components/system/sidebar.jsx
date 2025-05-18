"use client"
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const Sidebar = ({ children }) => {
  const [sidebarToggled, setSidebarToggled] = useState(false)
  const pathname = usePathname()
  const toggleSidebar = () => {
    setSidebarToggled(sidebarToggled => !sidebarToggled)
  }

  // Function to check if a link is active
  const isActive = (href) => {
    return pathname === href || 
           (href !== '/dashboard' && pathname.startsWith(href))
  }

  return (
    <div className="flex h-[91dvh] overflow-hidden scrollbar-hide">
      {/* Sidebar */}
      <aside
        data-sidebar
        className={`fixed h-full py-3 overflow-hidden lg:static w-11/12 max-w-[18rem] md:w-72 transition-all ${sidebarToggled ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 bg-white dark:bg-zinc-950 shadow-lg shadow-zinc-200/40 dark:shadow-zinc-800/10 flex flex-col justify-between px-4 z-50`}
      >
        <nav className="flex-1 pt-6">
          <ul className="text-zinc-700 dark:text-zinc-300 space-y-3">
            <li className={`relative ${isActive('/dashboard') ? 'before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:bg-blue-600' : ''}`}>
              <Link 
                href="/dashboard" 
                className={`flex items-center px-4 py-2.5 gap-x-3 rounded-md ${isActive('/dashboard') ? 'text-blue-600 bg-zinc-50 dark:bg-zinc-900/80' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li className={`relative ${isActive('/dashboard/invitations') ? 'before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:bg-blue-600' : ''}`}>
              <Link 
                href="/dashboard/invitations" 
                className={`flex items-center px-4 py-2.5 gap-x-3 rounded-md ${isActive('/dashboard/invitations') ? 'text-blue-600 bg-zinc-50 dark:bg-zinc-900/80' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Invitations
              </Link>
            </li>
            <li className={`relative ${isActive('/dashboard/calender') ? 'before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:bg-blue-600' : ''}`}>
              <Link 
                href="/dashboard/calender" 
                className={`flex items-center px-4 py-2.5 gap-x-3 rounded-md ${isActive('/dashboard/calender') ? 'text-blue-600 bg-zinc-50 dark:bg-zinc-900/80' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Calendar
              </Link>
            </li>
            <li className={`relative ${isActive('/dashboard/guests') ? 'before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:bg-blue-600' : ''}`}>
              <Link 
                href="/dashboard/guests" 
                className={`flex items-center px-4 py-2.5 gap-x-3 rounded-md ${isActive('/dashboard/guests') ? 'text-blue-600 bg-zinc-50 dark:bg-zinc-900/80' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Guests
              </Link>
            </li>
            <li className={`relative ${isActive('/dashboard/qr') ? 'before:absolute before:-left-4 before:w-1.5 before:h-4/5 before:rounded-r-md before:top-1/2 before:-translate-y-1/2 before:bg-blue-600' : ''}`}>
              <Link 
                href="/dashboard/qr" 
                className={`flex items-center px-4 py-2.5 gap-x-3 rounded-md ${isActive('/dashboard/qr') ? 'text-blue-600 bg-zinc-50 dark:bg-zinc-900/80' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                </svg>
                QR verification
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <div className="flex flex-col gap-y-2 text-zinc-700 dark:text-zinc-300">
            <Link 
              href="/contact" 
              className={`flex items-center px-4 py-2.5 gap-x-3 rounded-md ${pathname === '/contact' ? 'text-blue-600 bg-zinc-50 dark:bg-zinc-900/80' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Support
            </Link>
            <button className="outline-none flex items-center px-4 py-2.5 gap-x-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900">
        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden fixed right-2 top-2 p-4 z-40">
          <button
            onClick={toggleSidebar}
            className="p-3 rounded-full bg-blue-600 dark:bg-blue-500 outline-none w-12 aspect-square flex flex-col relative justify-center items-center"
          >
            <span className="sr-only">toggle sidebar</span>
            <span className={`
              w-6 h-0.5 rounded-full bg-zinc-300 transition-transform duration-300 ease-linear
              ${sidebarToggled ? "rotate-[40deg] translate-y-1.5" : ""}
            `} />
            <span className={`
              w-6 origin-center mt-1 h-0.5 rounded-full bg-zinc-300 transition-all duration-300 ease-linear
              ${sidebarToggled ? "opacity-0 scale-x-0" : ""}
            `} />
            <span className={`
              w-6 mt-1 h-0.5 rounded-full bg-zinc-300 transition-all duration-300 ease-linear
              ${sidebarToggled ? "-rotate-[40deg] -translate-y-1.5" : ""}
            `} />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Sidebar