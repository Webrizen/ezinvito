import { PricingTable } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <section className='w-full min-h-screen flex justify-center items-center'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <PricingTable />
      </div>
    </section>
  )
}
