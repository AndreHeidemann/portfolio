"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "en" | "pt-br"

type Translations = Record<string, Record<Locale, string>>

const translations: Translations = {
  // Nav
  "nav.home": { en: "Home", "pt-br": "Inicio" },
  "nav.projects": { en: "Projects", "pt-br": "Projetos" },
  "nav.resume": { en: "Resume", "pt-br": "Curriculo" },
  "nav.contact": { en: "Contact", "pt-br": "Contato" },
  // Hero
  "hero.title": { en: "Software Engineer", "pt-br": "Engenheiro de Software" },
  "hero.location": { en: "San Francisco, CA / UTC-8", "pt-br": "San Francisco, CA / UTC-8" },
  "hero.tagline": {
    en: "I build performant, accessible web applications with modern technologies. Focused on clean architecture, developer experience, and delivering measurable impact.",
    "pt-br": "Construo aplicacoes web performaticas e acessiveis com tecnologias modernas. Focado em arquitetura limpa, experiencia do desenvolvedor e impacto mensuravel.",
  },
  "hero.email": { en: "Email", "pt-br": "E-mail" },
  "hero.downloadResume": { en: "Download Resume", "pt-br": "Baixar Curriculo" },
  // Highlights
  "highlights.experience": { en: "Years Experience", "pt-br": "Anos de Experiencia" },
  "highlights.domains": { en: "Key Domains", "pt-br": "Dominios Principais" },
  "highlights.domainsValue": { en: "SaaS, E-Commerce, DevTools, HealthTech", "pt-br": "SaaS, E-Commerce, DevTools, HealthTech" },
  "highlights.stack": { en: "Core Stack", "pt-br": "Stack Principal" },
  "highlights.stackValue": { en: "TypeScript, React, Next.js, Node.js, Go", "pt-br": "TypeScript, React, Next.js, Node.js, Go" },
  // Sections
  "section.featuredProjects": { en: "Featured Projects", "pt-br": "Projetos em Destaque" },
  "section.experience": { en: "Experience", "pt-br": "Experiencia" },
  "section.allProjects": { en: "All Projects", "pt-br": "Todos os Projetos" },
  "section.skills": { en: "Technical Skills", "pt-br": "Habilidades Tecnicas" },
  "section.additionalSkills": { en: "Additional Skills", "pt-br": "Habilidades Adicionais" },
  "section.workHistory": { en: "Work History", "pt-br": "Historico Profissional" },
  "section.sideProjects": { en: "Side Projects", "pt-br": "Projetos Pessoais" },
  "section.education": { en: "Education", "pt-br": "Educacao" },
  "section.certifications": { en: "Awards & Certifications", "pt-br": "Premios e Certificacoes" },
  "section.summary": { en: "Summary", "pt-br": "Resumo" },
  "section.contact": { en: "Get in Touch", "pt-br": "Entre em Contato" },
  "section.cta": { en: "Let's Work Together", "pt-br": "Vamos Trabalhar Juntos" },
  // Project detail
  "project.overview": { en: "Overview", "pt-br": "Visao Geral" },
  "project.context": { en: "Context & Problem", "pt-br": "Contexto e Problema" },
  "project.approach": { en: "Approach", "pt-br": "Abordagem" },
  "project.architecture": { en: "Architecture", "pt-br": "Arquitetura" },
  "project.challenges": { en: "Challenges", "pt-br": "Desafios" },
  "project.results": { en: "Results & Metrics", "pt-br": "Resultados e Metricas" },
  "project.techStack": { en: "Tech Stack", "pt-br": "Stack Tecnologico" },
  "project.links": { en: "Links", "pt-br": "Links" },
  "project.copyLink": { en: "Copy Link", "pt-br": "Copiar Link" },
  "project.copied": { en: "Copied!", "pt-br": "Copiado!" },
  "project.backToProjects": { en: "Back to Projects", "pt-br": "Voltar aos Projetos" },
  // Filters
  "filter.all": { en: "All", "pt-br": "Todos" },
  "filter.work": { en: "Work", "pt-br": "Trabalho" },
  "filter.personal": { en: "Personal", "pt-br": "Pessoal" },
  "filter.search": { en: "Search projects...", "pt-br": "Buscar projetos..." },
  "filter.sortFeatured": { en: "Featured", "pt-br": "Destaque" },
  "filter.sortRecent": { en: "Recent", "pt-br": "Recente" },
  // Resume
  "resume.summaryText": {
    en: "Senior Software Engineer with 6+ years of experience building scalable web applications, APIs, and developer tools. Passionate about clean architecture, performance optimization, and creating exceptional user experiences. Proven track record of leading teams and delivering high-impact projects.",
    "pt-br": "Engenheiro de Software Senior com 6+ anos de experiencia construindo aplicacoes web escalaveis, APIs e ferramentas para desenvolvedores. Apaixonado por arquitetura limpa, otimizacao de performance e criacao de experiencias excepcionais. Historico comprovado de lideranca de equipes e entrega de projetos de alto impacto.",
  },
  "resume.downloadPdf": { en: "Download PDF", "pt-br": "Baixar PDF" },
  "resume.skill": { en: "Skill", "pt-br": "Habilidade" },
  "resume.years": { en: "Years", "pt-br": "Anos" },
  "resume.level": { en: "Level", "pt-br": "Nivel" },
  "resume.keyInitiatives": { en: "Key Initiatives", "pt-br": "Iniciativas Chave" },
  // Contact
  "contact.emailLabel": { en: "Email", "pt-br": "E-mail" },
  "contact.copyEmail": { en: "Copy Email", "pt-br": "Copiar E-mail" },
  "contact.copied": { en: "Copied to clipboard!", "pt-br": "Copiado!" },
  "contact.socialLinks": { en: "Social Links", "pt-br": "Redes Sociais" },
  "contact.formName": { en: "Name", "pt-br": "Nome" },
  "contact.formEmail": { en: "Email", "pt-br": "E-mail" },
  "contact.formMessage": { en: "Message", "pt-br": "Mensagem" },
  "contact.formSend": { en: "Send Message", "pt-br": "Enviar Mensagem" },
  "contact.formTitle": { en: "Send a Message", "pt-br": "Envie uma Mensagem" },
  // CTA
  "cta.description": {
    en: "Interested in working together? I'm always open to discussing new opportunities, interesting projects, or just having a chat.",
    "pt-br": "Interessado em trabalhar juntos? Estou sempre aberto a discutir novas oportunidades, projetos interessantes, ou apenas bater um papo.",
  },
  "cta.bookCall": { en: "Book a Call", "pt-br": "Agendar uma Chamada" },
  "cta.emailMe": { en: "Email Me", "pt-br": "Me Envie um E-mail" },
  // Footer
  "footer.updated": { en: "Last updated: February 2026", "pt-br": "Ultima atualizacao: Fevereiro 2026" },
  // Theme
  "theme.light": { en: "Light", "pt-br": "Claro" },
  "theme.dark": { en: "Dark", "pt-br": "Escuro" },
  // Misc
  "misc.viewProject": { en: "View Project", "pt-br": "Ver Projeto" },
  "misc.viewAll": { en: "View All", "pt-br": "Ver Todos" },
  "misc.present": { en: "Present", "pt-br": "Presente" },
  "misc.remote": { en: "Remote", "pt-br": "Remoto" },
  "misc.repo": { en: "Repository", "pt-br": "Repositorio" },
  "misc.demo": { en: "Live Demo", "pt-br": "Demo" },
  "misc.screenshots": { en: "Screenshots", "pt-br": "Capturas de Tela" },
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[locale] ?? key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
