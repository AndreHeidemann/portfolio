"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SiteLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isPrintView = pathname?.endsWith("/resume/print") ?? false

  if (isPrintView) {
    return <main className="min-h-screen bg-white text-black">{children}</main>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
