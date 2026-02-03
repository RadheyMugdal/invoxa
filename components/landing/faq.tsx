'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { motion } from 'framer-motion'

const FAQ = () => {
  const faqs = [
    {
      question: 'Is Invoxa really free to use?',
      answer: 'Yes! Invoxa offers a generous free plan that includes up to 20 invoices per month, unlimited clients, and all essential features. No credit card required to get started.'
    },
    {
      question: 'Can I customize my invoices?',
      answer: 'Absolutely. You can add your logo, change colors, customize payment terms, and choose from multiple professional templates to match your brand identity.'
    },
    {
      question: 'How do I get paid?',
      answer: 'Invoxa integrates with popular payment gateways like Stripe and PayPal. Clients can pay directly from the invoice via a secure payment link.'
    },
    {
      question: 'Is my data secure?',
      answer: 'We take security seriously. All data is encrypted in transit and at rest. We use bank-level security measures and comply with GDPR regulations.'
    },
    {
      question: 'Can I use Invoxa for my business?',
      answer: 'Invoxa is perfect for freelancers, small businesses, consultants, and agencies. It scales with your needs from solo projects to enterprise clients.'
    },
    {
      question: 'Do you offer support?',
      answer: 'Yes! We provide email support for all users. Pro and Enterprise plans include priority support and access to our knowledge base and video tutorials.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className='w-full border-b'>
      <div className='max-w-4xl mx-auto space-y-12 border-x py-16 sm:py-24 px-4 sm:px-8'>
        <motion.div
          className='space-y-3 sm:space-y-4 flex flex-col text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl text-pretty'>
            Frequently Asked Questions
          </h2>
          <motion.p
            className='text-sm sm:text-base max-w-3xl text-balance mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about Invoxa. Can't find what you're looking for? Contact our support team.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Accordion type='single' collapsible>
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className='text-sm sm:text-base text-primary/90'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-xs sm:text-sm'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
