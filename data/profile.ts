import profileData from './profile.json'

export type Locale = "en-US" | "pt-BR"

export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "email" | "website"
  label: string
  url: string
}

export interface BasicsTranslation {
  name: string
  headline: string
  location: string
  bio: string
}

export interface Basics {
  translations: Record<Locale, BasicsTranslation>
  email: string
  phone: string
  timezone: string
  summary: Record<Locale, string>
  availability: Record<Locale, string>
  languages: string[]
  yearsExperience: number
  domains: string[]
  coreStack: string[]
  socials: SocialLink[]
  lastUpdated: string
  meetingLink?: string
}

export interface ProjectCopy {
  title: Record<Locale, string>
  oneLiner: Record<Locale, string>
  description: Record<Locale, string>
  overview: Record<Locale, string>
  context: Record<Locale, string>
  approach: Record<Locale, string>
  architecture: Record<Locale, string>
  challenges: Record<Locale, string>
  results: Record<Locale, string>
  impactBullets: Record<Locale, string[]>
}

export interface Project {
  slug: string
  type: "work" | "personal"
  year: number
  featured: boolean
  tags: string[]
  impactScore: number
  repoUrl?: string
  demoUrl?: string
  copy: ProjectCopy
}

export interface Experience {
  company: string
  role: Record<Locale, string>
  location: Record<Locale, string>
  remote: boolean
  startDate: string
  endDate: string | null
  bullets: Record<Locale, string[]>
  tags: string[]
}

export interface Skill {
  name: string
  years: number
  level: "Expert" | "Advanced" | "Intermediate"
}

export interface Education {
  institution: string
  start: string
  end: string
  degree: Record<Locale, string>
}

export interface Certification {
  name: Record<Locale, string>
  issuer: string
  year: string
}

export interface Award {
  title: Record<Locale, string>
  year: string
  issuer?: string
  description?: Record<Locale, string>
}

export interface Testimonial {
  name: string
  role: Record<Locale, string>
  quote: Record<Locale, string>
}

export interface Profile {
  basics: Basics
  projects: Project[]
  experiences: Experience[]
  skills: Skill[]
  additionalSkills: string[]
  education: Education[]
  certifications: Certification[]
  awards: Award[]
  testimonials: Testimonial[]
}

export const profile = profileData as Profile
