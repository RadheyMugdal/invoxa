import React from 'react'

interface StructuredDataProps {
  data: Record<string, any>
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization structured data generator
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Invoxa',
    description: 'Free online invoice generator for creating professional invoices instantly',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://invoxa.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://invoxa.com'}/logo.png`,
    sameAs: [
      'https://twitter.com/invoxa',
      'https://github.com/invoxa',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@invoxa.com',
    },
  }
}

// WebApplication structured data generator
export function generateWebApplicationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Invoxa - Invoice Generator',
    description: 'Create professional, customizable invoices in seconds with Invoxa. Free online invoice generator with templates, PDF export, and instant payment tracking.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://invoxa.com',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free forever plan available',
    },
    featureList: [
      'Professional invoice templates',
      'PDF export',
      'Customizable branding',
      'Payment tracking',
      'Multiple currency support',
      'No credit card required',
    ],
  }
}

// FAQPage structured data generator
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb structured data generator
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
