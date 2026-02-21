"use client"

import { I18nProvider } from "@/lib/i18n"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </I18nProvider>
  )
}
