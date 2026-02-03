import React from 'react'
import { IconBrandTwitter, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react'

const Footer = () => {
  const productLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Templates', href: '#templates' },
    { name: 'Integrations', href: '#integrations' }
  ]

  const companyLinks = [
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press', href: '#press' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact', href: '#contact' },
    { name: 'Status', href: '#status' },
    { name: 'API Docs', href: '#api' }
  ]

  const legalLinks = [
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
    { name: 'Security', href: '#security' },
    { name: 'Cookies', href: '#cookies' }
  ]

  const socialLinks = [
    { icon: IconBrandTwitter, href: '#twitter', label: 'Twitter' },
    { icon: IconBrandGithub, href: '#github', label: 'GitHub' },
    { icon: IconBrandLinkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: IconMail, href: '#mailto', label: 'Email' }
  ]

  return (
    <footer className='w-full border-b'>
      <div className='max-w-4xl mx-auto border-x px-4 sm:px-8'>
        <div className='py-12 sm:py-16 space-y-8 sm:space-y-12'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8'>
            {/* Brand Column */}
            <div className='col-span-2 md:col-span-1 space-y-3 sm:space-y-4'>
               <h1 className="font-semibold flex items-center   tracking-tight font-mono gap-1 text-lg sm:text-2xl -ml-1 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sm:w-[28px] sm:h-[28px]" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1.65.76l-1.033-.885a1 1 0 0 0-1.301 0l-1.032.884a1 1 0 0 1-1.302 0l-1.031-.884a1 1 0 0 0-1.302 0l-1.031.884a1 1 0 0 1-1.302 0l-1.032-.884a1 1 0 0 0-1.301 0l-1.032.884A1 1 0 0 1 4 21V3Zm5 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" clipRule="evenodd"/></svg>
                  Invoxa</h1>
            
              <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                Professional invoicing made simple. Create, send, and track invoices effortlessly.
              </p>
            </div>

            {/* Product Links */}
            <div className='space-y-3 sm:space-y-4'>
              <h4 className='text-xs sm:text-sm font-semibold uppercase tracking-wider'>Product</h4>
              <ul className='space-y-2 sm:space-y-3'>
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className='space-y-3 sm:space-y-4'>
              <h4 className='text-xs sm:text-sm font-semibold uppercase tracking-wider'>Company</h4>
              <ul className='space-y-2 sm:space-y-3'>
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className='space-y-3 sm:space-y-4'>
              <h4 className='text-xs sm:text-sm font-semibold uppercase tracking-wider'>Support</h4>
              <ul className='space-y-2 sm:space-y-3'>
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className='space-y-3 sm:space-y-4'>
              <h4 className='text-xs sm:text-sm font-semibold uppercase tracking-wider'>Legal</h4>
              <ul className='space-y-2 sm:space-y-3'>
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className='text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className='pt-6 sm:pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4'>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Invoxa. All rights reserved.
            </p>

            <div className='flex items-center gap-3 sm:gap-4'>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    <Icon className='w-4 h-4 sm:w-5 sm:h-5' />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
