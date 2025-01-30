// app/layout.tsx
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import SidebarHeader from "@/components/sidebar/sidebar-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import type React from "react"; // Import React
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Manage your product inventory",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <SidebarInset>
            <SidebarHeader />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}

