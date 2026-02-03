import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your invoices and clients from your Invoxa dashboard",
  robots: {
    index: false,
    follow: true,
  },
};

const DashboardLayout =async  ({children}:{children:React.ReactNode}) => {
    const session =await auth.api.getSession({
        headers:await headers()
    })
    if(!session?.user || ! session.session){
        redirect("/sign-in")
    }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
  </SidebarProvider>
  )
}

export default DashboardLayout
