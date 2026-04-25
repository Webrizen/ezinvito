import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='w-full flex flex-col gap-6'>
            <Link href="/auth/sign-up" className='bg-muted hover:bg-muted/80 p-4 rounded-lg space-y-3'>
               <h2 className='text-2xl font-bold'>Sign Up</h2>
               <p className='text-muted-foreground'>create a new account for our platform and start creating beautiful invitations.</p>
            </Link>
            <Link href="/auth/sign-in" className='bg-muted hover:bg-muted/80 p-4 rounded-lg space-y-3'>
               <h2 className='text-2xl font-bold'>Sign In</h2>
               <p className='text-muted-foreground'>already have an account? sign in to continue.</p>
            </Link>
        </div>
    )
}
