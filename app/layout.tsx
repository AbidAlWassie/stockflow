// app/layout.tsx
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Manage your product inventory",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
      <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
