import React from 'react'
import { Button } from '../ui/button'
import { IconHome } from '@tabler/icons-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div  className=' w-full border-b '>

        <div className='max-w-4xl mx-auto space-y-8 sm:space-y-12  border-x py-16 sm:py-24 px-4 sm:px-8'>
            <div className=' space-y-6 sm:space-y-8 '>

            <div className=' space-y-3 sm:space-y-4 flex flex-col'>
                <h1 className=' text-3xl sm:text-4xl lg:text-5xl text-pretty font-semibold'>
                    Create & Manage Invoices Effortlessly
                </h1>
                <p className='  text-sm sm:text-base max-w-3xl text-balance'>Professional invoices in minutes. Track payments, manage clients, and stay organized — all with Invoxa.</p>
            </div>
                <div>
                    <Link href={"/sign-up"}>
                    <Button size={"lg"} className="w-full sm:w-auto">
                        Get Started Free
                    </Button>
                    </Link>
                </div>

            </div>

             <div className=' w-full bg-secondary rounded-lg  relative  p-4 sm:p-8 bg-[repeating-linear-gradient(45deg,#e5e7eb_0,#e5e7eb_1px,transparent_1px,transparent_6px)] overflow-hidden'>
                    <div className=' w-full rounded-t-lg px-2 flex gap-3 sm:gap-4 bg-background  border-b'>
                        <div className=' flex gap-1  py-1.5 sm:py-2 '>
                            <div className=' size-2.5 sm:size-3 rounded-full bg-red-400'></div>
                            <div className=' size-2.5 sm:size-3 rounded-full bg-yellow-300'></div>
                            <div className=' size-2.5 sm:size-3 rounded-full bg-green-300'></div>
                        </div>
                        <div className=' py-1.5 sm:py-2  border-x px-1.5 sm:px-2 '>
                            <IconHome className=' size-2.5 sm:size-3 text-primary/60'/>
                        </div>
                    </div>
                    <div  className=' '>
                            <img src={"/image.png"} className=' w-full h-auto' />
                    </div>
                </div>
        </div>

    </div>
  )
}

export default Hero
