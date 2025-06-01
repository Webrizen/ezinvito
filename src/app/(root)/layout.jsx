import Footer from '@/components/system/footer'
import Navbar from '@/components/system/navbar'
import React from 'react'

export default function RootLayout({ children }) {
  return (
    <>
     <Navbar/>
     {children} 
     <Footer />
    </>
  )
}
