export interface Project {
  slug: string
  title: string
  oneLiner: string
  description: string
  type: "work" | "personal"
  year: number
  featured: boolean
  tags: string[]
  impactBullets: string[]
  repoUrl?: string
  demoUrl?: string
  overview: string
  context: string
  approach: string
  architecture: string
  challenges: string
  results: string
}

export interface Experience {
  company: string
  title: string
  location: string
  remote: boolean
  startDate: string
  endDate: string
  bullets: string[]
  keyInitiatives?: string[]
}

export interface Skill {
  name: string
  years: number
  level: "Expert" | "Advanced" | "Intermediate"
}

export interface Education {
  institution: string
  degree: string
  field: string
  year: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export const projects: Project[] = [
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    oneLiner: "Real-time analytics platform with interactive visualizations",
    description: "A comprehensive analytics dashboard built for enterprise clients to monitor KPIs in real-time.",
    type: "work",
    year: 2025,
    featured: true,
    tags: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    impactBullets: ["40% faster data queries", "Reduced load time by 60%", "Serving 10k+ daily users"],
    repoUrl: "#",
    demoUrl: "#",
    overview: "A full-featured analytics dashboard designed for enterprise-scale data monitoring and visualization. The platform processes millions of events daily and presents actionable insights through interactive charts and customizable widgets.",
    context: "The client needed to replace a legacy reporting system that was slow, difficult to maintain, and lacked real-time capabilities. Stakeholders required a modern solution that could handle growing data volumes while remaining intuitive for non-technical users.",
    approach: "Adopted a modular architecture with React for the frontend and Node.js microservices for the backend. Implemented server-side aggregation to reduce client-side computation and used WebSocket connections for live data updates.",
    architecture: "The system follows a microservices pattern with an API Gateway, dedicated services for data ingestion, processing, and serving. PostgreSQL handles structured data while Redis provides caching for frequently accessed metrics.",
    challenges: "The primary challenge was achieving sub-second query times on datasets exceeding 100M rows. Solved this through materialized views, intelligent caching strategies, and query optimization techniques.",
    results: "Delivered a 40% improvement in query performance, 60% reduction in page load times, and achieved 99.9% uptime over the first six months of deployment.",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    oneLiner: "Scalable marketplace with AI-powered recommendations",
    description: "Built a modern e-commerce platform with personalized shopping experiences.",
    type: "work",
    year: 2024,
    featured: true,
    tags: ["Next.js", "TypeScript", "Stripe", "AWS", "Redis"],
    impactBullets: ["25% increase in conversion rate", "99.9% uptime", "$2M+ processed monthly"],
    repoUrl: "#",
    demoUrl: "#",
    overview: "A modern e-commerce platform built to handle high-traffic shopping experiences with personalized recommendations powered by machine learning algorithms.",
    context: "The previous platform was a monolithic application struggling to scale during peak shopping periods. Cart abandonment was high due to slow page loads and a cumbersome checkout process.",
    approach: "Rebuilt the frontend with Next.js for optimal performance and SEO. Implemented a recommendation engine using collaborative filtering. Streamlined the checkout flow to a single page with Stripe integration.",
    architecture: "Next.js frontend with ISR for product pages, Node.js API layer, PostgreSQL for transactional data, Redis for session management and caching, AWS S3 for media assets.",
    challenges: "Handling inventory consistency during flash sales required implementing distributed locks and optimistic concurrency control to prevent overselling.",
    results: "Achieved a 25% increase in conversion rate, processed over $2M in monthly transactions, and maintained 99.9% uptime during major sale events.",
  },
  {
    slug: "dev-tools-cli",
    title: "DevTools CLI",
    oneLiner: "Developer productivity toolkit for modern workflows",
    description: "An open-source CLI tool that automates common development tasks.",
    type: "personal",
    year: 2024,
    featured: true,
    tags: ["Go", "CLI", "Docker", "Open Source"],
    impactBullets: ["2k+ GitHub stars", "500+ weekly downloads", "Active community"],
    repoUrl: "#",
    overview: "An open-source command-line toolkit designed to streamline developer workflows. Includes scaffolding, code generation, testing utilities, and deployment automation.",
    context: "Frustrated by repetitive setup tasks across projects, I built a tool to automate boilerplate generation, environment configuration, and deployment pipelines.",
    approach: "Written in Go for cross-platform compatibility and fast execution. Uses a plugin architecture to allow community extensions. Comprehensive test coverage with integration tests.",
    architecture: "Core engine with plugin system, configuration parser, template engine, and CLI interface using Cobra. Plugins communicate via a well-defined API contract.",
    challenges: "Designing a flexible plugin API that was both powerful enough for complex use cases and simple enough for community contributors to adopt.",
    results: "Gained 2,000+ GitHub stars, 500+ weekly downloads, and an active community of 30+ contributors maintaining plugins.",
  },
  {
    slug: "health-tracker",
    title: "Health Tracker App",
    oneLiner: "Mobile-first health and wellness tracking application",
    description: "A progressive web app for tracking daily health metrics and habits.",
    type: "personal",
    year: 2023,
    featured: false,
    tags: ["React Native", "TypeScript", "Firebase", "Charts"],
    impactBullets: ["5k+ active users", "4.7 star rating", "Featured on Product Hunt"],
    repoUrl: "#",
    demoUrl: "#",
    overview: "A progressive web application for tracking daily health metrics including sleep, exercise, nutrition, and mental wellness with insightful visualizations.",
    context: "Existing health tracking apps were either too complex or lacked meaningful data visualization. Wanted to create a simple yet powerful tool that makes health data actionable.",
    approach: "Built as a PWA for cross-platform reach. Focus on minimal data entry with smart defaults and suggestions. Used chart libraries to create meaningful trend visualizations.",
    architecture: "React frontend with offline-first architecture using service workers. Firebase for authentication, real-time database, and cloud functions for data processing.",
    challenges: "Implementing reliable offline data sync with conflict resolution was the primary technical challenge, solved through a custom CRDT-based merge strategy.",
    results: "Attracted 5,000+ active users with a 4.7 star rating, and was featured on Product Hunt's daily top 10.",
  },
  {
    slug: "api-gateway",
    title: "API Gateway Service",
    oneLiner: "High-performance API gateway with rate limiting and auth",
    description: "Designed and implemented a centralized API gateway for microservices architecture.",
    type: "work",
    year: 2023,
    featured: true,
    tags: ["Go", "gRPC", "Redis", "Kubernetes", "Prometheus"],
    impactBullets: ["50ms p99 latency", "10k+ req/sec", "Zero-downtime deploys"],
    repoUrl: "#",
    overview: "A high-performance API gateway handling authentication, rate limiting, request routing, and observability for a microservices ecosystem.",
    context: "The organization had grown to 20+ microservices without a unified gateway, leading to inconsistent auth patterns, no centralized rate limiting, and poor observability.",
    approach: "Built in Go for performance. Implemented token-bucket rate limiting with Redis, JWT validation middleware, and integrated OpenTelemetry for distributed tracing.",
    architecture: "Stateless gateway instances behind a load balancer. Redis cluster for rate limiting state. Prometheus metrics with Grafana dashboards. Deployed on Kubernetes with HPA.",
    challenges: "Achieving consistent rate limiting across multiple gateway instances required careful Redis Lua scripting and clock synchronization.",
    results: "Achieved 50ms p99 latency at 10,000+ requests per second with zero-downtime deployments and comprehensive observability.",
  },
  {
    slug: "design-system",
    title: "Component Library",
    oneLiner: "Accessible design system with 50+ components",
    description: "A comprehensive design system and component library used across multiple products.",
    type: "work",
    year: 2024,
    featured: true,
    tags: ["React", "TypeScript", "Storybook", "CSS", "A11y"],
    impactBullets: ["50+ components", "98% a11y score", "Used by 8 product teams"],
    demoUrl: "#",
    overview: "A comprehensive, accessible component library serving as the foundation for multiple product teams. Includes 50+ components with full documentation and visual regression testing.",
    context: "Product teams were building inconsistent UIs with duplicated effort. A unified design system was needed to ensure consistency, accessibility, and developer productivity.",
    approach: "Built with React and TypeScript for type safety. Every component meets WCAG 2.1 AA standards. Storybook for documentation and visual testing. Semantic versioning with automated releases.",
    architecture: "Monorepo with packages for core components, icons, themes, and utilities. Built with Rollup for optimal tree-shaking. CI/CD pipeline with visual regression tests.",
    challenges: "Balancing flexibility for diverse product needs while maintaining consistency required a well-designed token system and composition-based component API.",
    results: "Adopted by 8 product teams, achieved a 98% accessibility score, and reduced UI development time by an estimated 35% across the organization.",
  },
]

export const experiences: Experience[] = [
  {
    company: "TechCorp Inc.",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    remote: true,
    startDate: "Jan 2023",
    endDate: "Present",
    bullets: [
      "Led development of analytics dashboard serving 10k+ daily users with real-time data visualization",
      "Architected API gateway handling 10k+ req/sec with 50ms p99 latency",
      "Mentored team of 5 junior engineers, establishing code review standards and best practices",
      "Reduced CI/CD pipeline execution time by 45% through parallelization and caching strategies",
    ],
    keyInitiatives: [
      "Spearheaded migration from monolith to microservices architecture",
      "Implemented observability stack with OpenTelemetry, Prometheus, and Grafana",
    ],
  },
  {
    company: "StartupXYZ",
    title: "Full Stack Developer",
    location: "New York, NY",
    remote: false,
    startDate: "Mar 2021",
    endDate: "Dec 2022",
    bullets: [
      "Built e-commerce platform processing $2M+ monthly with 25% conversion rate improvement",
      "Developed component library with 50+ accessible components used by 8 product teams",
      "Implemented real-time collaboration features using WebSocket and CRDT-based conflict resolution",
    ],
  },
  {
    company: "Digital Agency Co.",
    title: "Frontend Developer",
    location: "Austin, TX",
    remote: false,
    startDate: "Jun 2019",
    endDate: "Feb 2021",
    bullets: [
      "Delivered 15+ client projects including responsive web apps and progressive web applications",
      "Introduced TypeScript adoption across the team, reducing production bugs by 30%",
      "Built internal scaffolding tool that reduced project setup time from 2 days to 15 minutes",
    ],
  },
]

export const skills: Skill[] = [
  { name: "TypeScript", years: 6, level: "Expert" },
  { name: "React", years: 6, level: "Expert" },
  { name: "Next.js", years: 5, level: "Expert" },
  { name: "Node.js", years: 6, level: "Expert" },
  { name: "Go", years: 3, level: "Advanced" },
  { name: "PostgreSQL", years: 5, level: "Advanced" },
  { name: "AWS", years: 4, level: "Advanced" },
  { name: "Docker", years: 4, level: "Advanced" },
  { name: "Kubernetes", years: 3, level: "Intermediate" },
  { name: "Redis", years: 4, level: "Advanced" },
  { name: "GraphQL", years: 3, level: "Advanced" },
  { name: "Python", years: 3, level: "Intermediate" },
]

export const additionalSkills = [
  "Git", "CI/CD", "REST APIs", "gRPC", "WebSockets",
  "Tailwind CSS", "Storybook", "Jest", "Playwright",
  "Figma", "Agile/Scrum", "System Design",
]

export const education: Education[] = [
  {
    institution: "University of Technology",
    degree: "B.Sc.",
    field: "Computer Science",
    year: "2019",
  },
]

export const certifications: Certification[] = [
  { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
  { name: "Google Cloud Professional", issuer: "Google", year: "2022" },
]
