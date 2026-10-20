export const site = {
  name: "Tikamchand Kumawat",
  title: "Senior Software Engineer",
  location: "Mumbai, Maharashtra, India",
  email: "tikamchand7264@gmail.com",
  phone: "7264934079",
  linkedin: "https://linkedin.com/in/tikamchand-kumawat",
  github: "https://github.com/tikamchand",
  x: "https://x.com/NerdyWebdeev",
  tagline:
    "Building scalable platforms across logistics, telehealth, and e-commerce with React, Next.js, Node.js, and TypeScript.",
  summary:
    "Full-stack developer with 3+ years shipping production systems for logistics workflows, telehealth consultations, and high-throughput e-commerce. Experienced in microservices, event-driven architecture, and cloud deployment on AWS — focused on reliability, performance, and clean API design.",
};

export const heroStats = [
  { label: "uptime", value: 99.97, suffix: "%", decimals: 2 },
  { label: "replication-lag", value: 12, suffix: "ms", decimals: 0 },
  {
    label: "deploy-time",
    value: 272,
    suffix: "s",
    decimals: 0,
    displayAs: "duration" as const,
  },
];

export const stackBands = [
  {
    label: "Client",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
  },
  {
    label: "API",
    items: ["Node.js", "Express.js", "GraphQL", "REST", "Microservices"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Elasticsearch"],
  },
  {
    label: "Infra",
    items: ["Docker", "AWS (RDS, S3, ECR)", "NGINX", "EC2", "GitHub Actions"],
  },
];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "ERGO Technologies & services",
    period: "August 2026 – Present",
    description:"",
    highlights: [],
  },
  {
    role: "Full Stack Developer",
    company: "Beeyond Tech",
    period: "May 2025 – july 2026",
    description:
      "Developing a microservices-based e-commerce platform using Node.js, TypeScript, Next.js, PostgreSQL, and MongoDB — enabling independent scaling of product, order, and notification services.",
    highlights: [
      "Microservices architecture with event-driven order processing",
      "PostgreSQL + MongoDB polyglot persistence",
      "Next.js storefront with modular service boundaries",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Techathalon Software Solutions Pvt. Ltd.",
    period: "July 2022 – January 2025",
    description:
      "Built and maintained production platforms spanning logistics operations and telehealth delivery — improving processing efficiency and enabling secure virtual care at scale.",
    highlights: [
      "Logistics workflow platform reducing processing time by 30%",
      "Telehealth platform with secure Twilio video consultations",
      "RBAC, distributed systems, and caching across multiple products",
    ],
  },
];

export const projects = [
  {
    title: "Top 10 Mobiles",
    period: "May 2025 – Jan 2026",
    stack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Elasticsearch",
      "Docker",
      "AWS",
    ],
    summary:
      "Full-stack e-commerce platform handling 50K+ orders/month with multi-store order-splitting, event-driven fulfillment, and sub-150ms product search.",
    outcomes: [
      "50K+ orders/month with multi-store order-splitting",
      "Elasticsearch search under 150ms across 3K+ products",
      "Deployed on AWS (RDS, S3, ECR) via Docker containers",
    ],
    domain: "E-commerce",
  },
  {
    title: "Flowian.ai",
    period: "Nov 2024 – Jan 2025",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Amazon Bedrock"],
    summary:
      "Logistics management platform with custom pipeline creation, vendor management, and AI-powered document scanning for end-to-end shipment tracking.",
    outcomes: [
      "Custom workflow blocks for package movement flows",
      "Amazon Bedrock FMs for pipeline summaries and doc extraction",
      "Reduced quote application time across shipping operations",
    ],
    domain: "Logistics",
  },
  {
    title: "Gal3n",
    period: "Dec 2022 – Jun 2024",
    stack: ["React.js", "Node.js", "GraphQL", "PostgreSQL", "Twilio"],
    summary:
      "Health web application enabling secure video consultations and seamless collaboration between doctors, nurses, and patients worldwide.",
    outcomes: [
      "Twilio-powered secure video consultations",
      "GraphQL API with role-based access for care teams",
      "Bridged doctor–patient gap with accessible virtual care",
    ],
    domain: "Telehealth",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
