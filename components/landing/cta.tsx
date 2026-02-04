'use client'

import React from 'react'
import { Button } from '../ui/button'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const CTA = () => {
  const benefits = [
    'Free forever plan available',
    'No credit card required',
    'Cancel anytime',
    '24/7 customer support'
  ]

  return (
    <div className='w-full border-b'>
      <motion.div
        className='max-w-4xl mx-auto space-y-8 sm:space-y-12 border-x py-8 sm:py-12 bg-primary text-primary-foreground px-4 sm:px-8'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className='space-y-6 sm:space-y-8 text-center'>
          <motion.div
            className='space-y-3 sm:space-y-4 flex flex-col'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className='text-3xl sm:text-4xl lg:text-5xl text-pretty'>
              Ready to Get Started?
            </h2>
            <motion.p
              className='text-sm sm:text-base max-w-2xl text-balance mx-auto'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of businesses already using Invoxa to streamline their invoicing. Start creating professional invoices in minutes.
            </motion.p>
          </motion.div>

          <motion.div
            className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
           
              <Link href={"/sign-up"}>
                <Button size={"lg"} variant={"secondary"} className="w-full sm:w-auto">
                  Start Free Trial
                  <IconArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
           
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default CTA
