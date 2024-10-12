import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-8 justify-center'>
            <h1 className="font-bold text-center text-3xl">Root's backends</h1>
            <p className='text-foreground-200 text-center'>Welcome to here, manage all of your backend efficiently</p>
            <div className='flex items-center gap-4 w-full justify-center'>
                <Link href="/ath/lggdn/cntnt/psts/notes/" className='bg-foreground px-4 text-background rounded-md p-2 text-sm font-bold cursor-pointer'>
                    <div>
                        <span>Notes</span>
                    </div>
                </Link>
                <Link href="/" className='bg-foreground px-4 text-background rounded-md p-2 text-sm font-bold cursor-pointer'>
                    <div>
                        <span>Developments</span>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default page