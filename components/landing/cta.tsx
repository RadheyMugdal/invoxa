import React from 'react'
import { Button } from '../ui/button'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import Link from 'next/link'


const CTA = () => {
  const benefits = [
    'Free forever plan available',
    'No credit card required',
    'Cancel anytime',
    '24/7 customer support'
  ]

  return (
    <div className='w-full border-b '>
      <div className='max-w-4xl mx-auto space-y-8 sm:space-y-12 border-x py-8 sm:py-12 bg-primary text-primary-foreground    px-4 sm:px-8'>
        <div className='space-y-6 sm:space-y-8 text-center'>
          <div className='space-y-3 sm:space-y-4 flex flex-col'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl text-pretty '>
              Ready to Get Started?
            </h2>
            <p className='text-sm sm:text-base max-w-2xl text-balance mx-auto'>
              Join thousands of businesses already using Invoxa to streamline their invoicing. Start creating professional invoices in minutes.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'>
            <Link href={"/sign-up"}>
            <Button size={"lg"} variant={"secondary"} className="w-full sm:w-auto">
              Start Free Trial
              <IconArrowRight className="ml-2 w-4 h-4" />
            </Button>
            </Link>
            <Link href={"/sign-up"}>
            <Button size={"lg"} variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
            </Link>
          </div>


        </div>
      </div>
    </div>
  )
}

export default CTA
