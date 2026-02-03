import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://invoxa.com'),
  title: {
    default: "Invoxa - Free Online Invoice Generator | Create Professional Invoices Instantly",
    template: "%s | Invoxa"
  },
  description: "Create professional, customizable invoices in seconds with Invoxa. Free online invoice generator with templates, PDF export, and instant payment tracking. No credit card required.",
  keywords: ["invoice generator", "online invoice", "free invoice template", "invoice maker", "create invoice", "professional invoice", "PDF invoice", "billing software", "invoice template"],
  authors: [{ name: "Invoxa" }],
  creator: "Invoxa",
  publisher: "Invoxa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Invoicely - Free Online Invoice Generator | Create Professional Invoices Instantly",
    description: "Create professional, customizable invoices in seconds with Invoicly. Free online invoice generator with templates, PDF export, and instant payment tracking.",
    siteName: "Invoxa",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invoicely - Invoice Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoicely - Free Online Invoice Generator | Create Professional Invoices Instantly",
    description: "Create professional, customizable invoices in seconds with Invoicely. Free online invoice generator with templates.",
    site: "@invoxa",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
            {children}
            </NuqsAdapter>
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
