// app/app/[subdomain]/layout.tsx
import { auth } from "@/auth";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { redirect } from "next/navigation";
import type React from "react"; // Added import for React

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
  params: { subdomain: string }
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  // Here you can verify if the user has access to this subdomain
  // For example, check if the subdomain matches their username or organization

  return (
    <div className="flex">
      <AppSidebar className="hidden md:flex" />
      <main className="flex-1">{children}</main>
    </div>
  )
}

