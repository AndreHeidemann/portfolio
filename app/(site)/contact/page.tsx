"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SectionHeader } from "@/components/section-header"
import { CopyButton } from "@/components/copy-button"
import { useI18n } from "@/lib/i18n"

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "X / Twitter", href: "https://x.com", icon: Twitter },
]

export default function ContactPage() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <div className="flex flex-col gap-12 py-12 md:py-20">
        <SectionHeader title={t("section.contact")} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column - Email & Social */}
          <div className="flex flex-col gap-8">
            {/* Email block */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">{t("contact.emailLabel")}</h3>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">alex@example.com</span>
                <CopyButton
                  text="alex@example.com"
                  label={t("contact.copyEmail")}
                  toastMessage={t("contact.copied")}
                />
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">{t("contact.socialLinks")}</h3>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    <link.icon className="size-4 text-muted-foreground" />
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground">{t("contact.formTitle")}</h3>
            <form
              className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                  {t("contact.formName")}
                </Label>
                <Input id="name" placeholder="John Doe" className="h-9 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                  {t("contact.formEmail")}
                </Label>
                <Input id="email" type="email" placeholder="john@example.com" className="h-9 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                  {t("contact.formMessage")}
                </Label>
                <Textarea id="message" placeholder="Your message..." rows={5} className="resize-none text-sm" />
              </div>
              <Button type="submit" size="sm" className="w-fit">
                <Mail className="size-3.5" />
                {t("contact.formSend")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
