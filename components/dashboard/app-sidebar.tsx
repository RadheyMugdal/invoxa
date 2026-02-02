"use client";

import * as React from "react";
import { FileText, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconFileInvoiceFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const {state}=useSidebar()
  const user = session?.user
    ? {
        name: session.user.name || "User",
        email: session.user.email || "",
        avatar: session.user.image || "/avatars/default.jpg",
      }
    : {
        name: "Guest",
        email: "",
        avatar: "/avatars/default.jpg",
      };

  const navMain = [
    {
      title: "Recent Invoices",
      url: "/dashboard",
      icon: FileText,
      isActive: true,
    },
    {
      title: "Create Invoice",
      url: "/dashboard/create",
      icon: Plus,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="w-[250px]" {...props}>
      <SidebarHeader>
        <Link href={"/dashboard"}>
        <div className="flex items-center gap-1  px-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" fillRule="evenodd" d="M4 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1.65.76l-1.033-.885a1 1 0 0 0-1.301 0l-1.032.884a1 1 0 0 1-1.302 0l-1.031-.884a1 1 0 0 0-1.302 0l-1.031.884a1 1 0 0 1-1.302 0l-1.032-.884a1 1 0 0 0-1.301 0l-1.032.884A1 1 0 0 1 4 21V3Zm5 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>
          <span className={cn(`font-semibold text-2xl tracking-tight font-mono`,
            state==="collapsed"&&"hidden"
          )}>Invoxa</span>
        </div></Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
