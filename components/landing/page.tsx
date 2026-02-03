'use client'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <header className='w-full border-b'>
      <motion.div
        className='max-w-4xl border-x py-3 sm:py-4 px-4 sm:px-8 flex justify-between items-center mx-auto'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="font-semibold flex items-center tracking-tight font-mono gap-1 text-xl sm:text-2xl ml-0 sm:ml-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1.65.76l-1.033-.885a1 1 0 0 0-1.301 0l-1.032.884a1 1 0 0 1-1.302 0l-1.031-.884a1 1 0 0 0-1.302 0l-1.031.884a1 1 0 0 1-1.302 0l-1.032-.884a1 1 0 0 0-1.301 0l-1.032.884A1 1 0 0 1 4 21V3Zm5 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" clipRule="evenodd"/></svg>
          Invoxa
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href={"/sign-up"}>
            <Button size={"lg"} className="sm:size-lg">
              Get started
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </header>
  )
}

export default Navbar
