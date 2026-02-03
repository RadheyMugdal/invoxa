import CTA from "@/components/landing/cta";
import FAQ from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/page";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import StructuredData, {
  generateOrganizationStructuredData,
  generateWebApplicationStructuredData,
  generateFAQStructuredData,
  generateBreadcrumbStructuredData
} from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Invoxa - Invoice Generator",
  description: "Create professional invoices in minutes with Invoxa. Free invoice generator with customizable templates, PDF export, and payment tracking. Start invoicing today!",
  keywords: ["invoice generator", "free invoice maker", "online invoice creator", "professional invoice template", "PDF invoice"],
  openGraph: {
    title: "Invoxa - Invoice Generator",
    description: "Free online invoice generator with customizable templates. Create, download, and send professional invoices instantly.",
    url: "/",
  },
  twitter: {
    title: "Invoxa - Invoice Generator",
    description: "Free online invoice generator with customizable templates. Create, download, and send professional invoices instantly.",
  },
  alternates: {
    canonical: "/",
  },
};

// FAQ data for structured data
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
];

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://invoxa.com';

  return(
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />
      <StructuredData data={generateWebApplicationStructuredData()} />
      <StructuredData data={generateFAQStructuredData(faqs)} />
      <StructuredData data={generateBreadcrumbStructuredData([
        { name: 'Home', url: baseUrl }
      ])} />

      <Navbar/>
      <Hero/>
      <Features/>
      <FAQ/>
      <CTA/>
      <Footer/>
    </>
  )
}
