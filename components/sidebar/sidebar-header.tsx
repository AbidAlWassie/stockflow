// components/sidebar/sidebar-header.tsx
"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouteInfo } from "@/hooks/use-hook-info"
import React from "react"; // Import React

export default function SidebarHeader() {
  const route = useRouteInfo()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        {route && (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {route.parent &&
                  route.parent.map((parent, index) => (
                    <React.Fragment key={parent.href}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={parent.href}>{parent.label}</BreadcrumbLink>
                      </BreadcrumbItem>
                      {route.parent && index < route.parent.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                  ))}
                {route.parent && route.parent.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem>
                  <BreadcrumbPage>{route.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </>
        )}
      </div>
    </header>
  )
}

