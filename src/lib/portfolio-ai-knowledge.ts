// Comprehensive AI Knowledge Base for Portfolio Chatbot

export interface ConversationContext {
  lastTopic?: string;
  mentionedProjects?: string[];
  askedAbout?: string[];
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string; intent: string }>;
  userCommunicationStyle?: 'formal' | 'casual' | 'technical' | 'brief';
  followUpContext?: string; // For understanding implicit questions
  lastIntent?: string;
  topicsDiscussed?: string[];
}

// Personal information
export const personalInfo = {
  name: "Muhammad Idris Abubakar",
  title: "Software & AI Evaluation Engineer",
  location: "Kano State, Nigeria",
  experience: "4+ years",
  age: 22,
  email: "abubakarmi131@gmail.com",
  phone: ["+234 704 252 6971", "+234 706 916 3505"],
  github: "https://github.com/AbubakarMi",
  linkedin: "https://linkedin.com/in/muhammad-idris-abubakar",
  twitter: "https://x.com/AbubakarM93064",
  startup: "Nyra",
  startupMission: "Building world-class productivity software",
  resumeLink: "https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing",
  education: {
    degree: "BSc in Computer Science",
    university: "Aliko Dangote University of Science and Technology, Wudil",
    status: "Graduated (2020 - 2025)"
  },
  firstLanguage: "C#",
  codingYears: 4,
  dailyCodingHours: "8-10 hours",
  totalProjects: "30+",
  majorProjects: "11+",
  teamSizes: "30-50 people in companies",
  // INTERESTS & PERSONAL LIFE (AI can infer from this)
  personalInterests: {
    primary: "Building legacy through impactful software",
    hobbies: ["Reading about business and tech trends", "Strategic planning", "Continuous learning"],
    values: ["Innovation", "Excellence", "Proving global competitiveness from Africa"],
    lifestyle: "Highly disciplined, goal-oriented, focused on long-term vision",
    relaxation: "Problem-solving activities, strategic games"
  },
  // PERSONALITY (AI infers behavior patterns)
  personality: {
    workEthic: "Obsessively dedicated - codes 8-10 hours daily for 4 years",
    motivation: "Mission to leave lasting legacy and prove Nigerian tech excellence",
    ambition: "Youngest Nigerian founder to build globally recognized startup",
    mindset: "Founder mentality - understands both tech AND business",
    approach: "Build in public, market actively, focus on visibility + quality"
  }
};

// Detailed project information
export const projectsData = {
  "Nubenta Care": {
    description: "An AI-driven health management system designed to digitize hospital operations",
    tech: ["Node.js", "PostgreSQL", "AI/NLP", "SendGrid"],
    role: "Founder & Lead Developer",
    features: [
      "Connects admin, doctors, pharmacy, lab, and finance departments",
      "AI-powered diagnostics assistance",
      "Automated appointment scheduling",
      "Digital prescription management",
      "Real-time patient monitoring"
    ],
    status: "Active Development",
    impact: "Streamlines hospital operations and improves patient care"
  },
  "Nyra Connect": {
    description: "A scalable modular system for an AI-powered productivity app",
    tech: [".NET 8", "React", "PostgreSQL", "Clean Architecture"],
    role: "Founder & Lead Developer",
    features: [
      "AI-powered journals with insights",
      "Focus sessions with analytics",
      "Smart notifications",
      "Cross-platform sync",
      "Habit tracking"
    ],
    status: "In Development",
    impact: "Helps users boost productivity through AI-driven insights"
  },
  "InvoTrek": {
    description: "A multi-tenant SaaS for smart document automation",
    tech: ["Node.js", "PostgreSQL", "Google AI", "SaaS"],
    role: "Creator & Lead Developer",
    features: [
      "AI-assisted field detection",
      "Inventory tracking",
      "Multi-tenant architecture",
      "Automated invoice processing",
      "Analytics dashboard"
    ],
    status: "Live",
    link: "https://invotrek.netlify.app",
    impact: "Saves businesses hours of manual document processing"
  },
  "BuildTrack Pro": {
    description: "A multi-tenant web app for contractors to track construction expenses",
    tech: ["React", "Node.js", "PostgreSQL"],
    role: "Lead Developer",
    features: [
      "Material usage tracking",
      "Worker payment management",
      "Expense categorization",
      "Project timeline visualization",
      "Budget forecasting"
    ],
    status: "Completed",
    impact: "Helps contractors manage projects more efficiently"
  },
  "SmartEd ERP": {
    description: "A comprehensive school ERP for managing attendance, grades, and payments",
    tech: ["ASP.NET Core 8", "PostgreSQL", "MVC"],
    role: "Lead Developer",
    features: [
      "Role-based security",
      "Attendance management",
      "Grade tracking",
      "Payment processing",
      "Parent portal"
    ],
    status: "Completed",
    impact: "Simplifies school administration"
  },
  "BulkPay": {
    description: "An automated salary payment system for companies",
    tech: [".NET", "MVC", "PostgreSQL"],
    role: "Backend Developer",
    features: [
      "Bulk payment processing",
      "Employee management",
      "Payment scheduling",
      "Tax calculations",
      "Payment history"
    ],
    status: "Completed",
    impact: "Streamlines payroll for companies"
  },
  "Adustech Bus Tracker": {
    description: "A real-time bus booking and tracking platform for university students",
    tech: ["Node.js", "Firebase"],
    role: "Full-Stack Developer",
    features: [
      "Real-time tracking",
      "Seat booking",
      "Route management",
      "Push notifications",
      "QR code tickets"
    ],
    status: "Live",
    link: "https://bus-tracker-i4dn.vercel.app/",
    impact: "Improves campus transportation efficiency"
  },
  "Rewardify": {
    description: "A gamification platform for businesses to increase user engagement",
    tech: ["Node.js", "PostgreSQL", "React", "Gamification"],
    role: "Full-Stack Developer",
    features: [
      "Points-based rewards",
      "Leaderboards",
      "Achievement badges",
      "Referral system",
      "Analytics"
    ],
    status: "Completed",
    impact: "Helps businesses retain and engage users"
  }
};

// Skills categorized
export const skillsData = {
  "AI & Testing": ["LLM Evaluation", "QA Design", "NLP Annotation", "JSON/YAML Modeling"],
  "Languages": ["Python", "Java", "C#", "TypeScript"],
  "Backend": [".NET 8", "Node.js", "PostgreSQL", "Clean Architecture"],
  "Frontend": ["React", "Next.js", "Tailwind CSS"],
  "DevOps": ["Docker", "SendGrid", "Git & GitHub"]
};

// Experience data
export const experienceData = [
  {
    company: "Hubuk Technology Limited",
    role: "Full Stack Developer",
    duration: "June 2022 – Present",
    current: true,
    highlights: [
      "Designed modular REST APIs with ASP.NET Core 8 & PostgreSQL",
      "Improved response efficiency by 25%",
      "Developed automated QA scripts for AI models",
      "Built internal AI-powered dashboards"
    ]
  },
  {
    company: "Freelance Contributor",
    role: "AI / QA Evaluation",
    duration: "2024 – Present",
    current: true,
    highlights: [
      "Evaluated LLM outputs for accuracy",
      "Authored test cases using JSON/YAML",
      "Applied precision, recall, and coverage metrics",
      "Collaborated on prompt iteration"
    ]
  },
  {
    company: "FlexiSAF Edusoft Limited",
    role: "Backend Engineering Intern",
    duration: "Sept 2025 – Dec 2025",
    highlights: [
      "Backend feature development with Java and Spring",
      "Worked with SQL databases",
      "Professional development environment experience"
    ]
  },
  {
    company: "Torvix AI",
    role: "Frontend Developer Intern",
    duration: "Oct 2025 – Nov 2025",
    highlights: [
      "Built responsive UIs for AI model visualization",
      "Integrated backend APIs",
      "Real-time data display from AI systems"
    ]
  }
];

// Responses patterns
export const responsePatterns: Record<string, string[]> = {
  // Greetings
  greeting: [
    "Hi! Great to have you here. I'm Muhammad's AI assistant. Whether you're curious about his tech stack, want to see his projects, or thinking about working together - I've got you covered. What would you like to explore?",
    "Hello! Welcome to Muhammad's portfolio. I can tell you about his projects, skills, experience, or help you get in touch. What interests you?",
    "Hey there! I'm here to help you learn about Muhammad's work. Feel free to ask about his projects, technical skills, or anything else!"
  ],

  // Nigerian slang greetings
  nigerianGreeting: [
    "How far! Welcome to Muhammad's portfolio. I'm his AI assistant - ask me anything about his projects, skills, or how to work with him. Wetin you wan know?",
    "My guy! Good to see you here. I can tell you about Muhammad's work - his projects, tech stack, experience, or help you connect with him. What's good?",
    "E be like say you sabi the vibes! Welcome - I'm here to help you learn about Muhammad's work. Ask me anything!"
  ],

  // Rude/offensive message handling
  rude: [
    "I appreciate you stopping by, but I'm here to have helpful conversations about Muhammad's work. Is there something specific about his projects or skills I can help you with?",
    "I understand you might be frustrated, but let's keep things positive! I'm happy to tell you about Muhammad's impressive projects and technical abilities. What would you like to know?",
    "I'm designed to be helpful and respectful. If you have genuine questions about Muhammad's work, skills, or availability, I'd be glad to assist!"
  ],

  // Feelings/How are you
  feelings: [
    "I'm doing great, thanks for asking! I'm always energized when I get to talk about Muhammad's work. What would you like to know about his projects or skills?",
    "Fantastic! Ready to help you explore Muhammad's portfolio. What catches your interest - his AI work, full-stack projects, or maybe his startup Nyra?",
    "I'm excellent! Excited to share Muhammad's journey with you. Are you interested in his technical skills, projects, or perhaps looking to collaborate?"
  ],

  // Boss/Creator questions
  creator: [
    "Yes, Muhammad Idris Abubakar is my creator! He built me to help visitors learn about his work and connect with him. He's a talented Software & AI Evaluation Engineer with 4+ years of experience. Is there something specific you'd like to know about him?",
    "Indeed! Muhammad created me to assist visitors like yourself. He's passionate about AI and building helpful tools. Would you like to know more about his background or projects?"
  ],

  // Who are you
  identity: [
    "I'm an AI assistant created by Muhammad Idris Abubakar to help visitors explore his portfolio. I can answer questions about his projects, skills, experience, and help you get in touch with him. How can I assist you today?",
    "I'm Muhammad's portfolio AI assistant! I'm here to provide information about his work, skills, and projects. Feel free to ask me anything about his professional journey."
  ],

  // What can you do
  capabilities: [
    "I can help you with:\n\n- **Projects**: Details about Muhammad's 10+ major projects\n- **Skills**: His technical expertise and tools\n- **Experience**: Work history and achievements\n- **Contact**: How to reach him\n- **Availability**: Hiring and collaboration\n\nJust ask me anything!",
    "I'm here to tell you about Muhammad's work! I can share details about his projects, technical skills, career experience, startup Nyra, or help you connect with him. What interests you?"
  ],

  // Why should I hire him
  whyHire: [
    "Great question! Here's why Muhammad stands out:\n\n**Technical Excellence**: 4+ years building scalable SaaS applications\n**Full-Stack Expertise**: From .NET and Node.js backends to React frontends\n**AI Specialist**: Experienced in LLM evaluation and NLP\n**Proven Track Record**: 10+ successful projects delivered\n**Entrepreneurial**: Founded Nyra, showing initiative and vision\n**Problem Solver**: Turns complex challenges into elegant solutions\n\nWould you like to discuss a specific project or skill?",
    "Muhammad brings a unique combination of skills:\n\n- Deep technical knowledge across the full stack\n- Real-world AI/ML experience\n- Entrepreneurial mindset (founder of Nyra)\n- Strong communication and documentation skills\n- Passion for clean, maintainable code\n\nHe's delivered 10+ major projects and consistently improves system efficiency. Interested in specific examples?"
  ],

  // Education
  education: [
    "Muhammad has a strong educational foundation combined with extensive hands-on experience. He's continuously learning and staying updated with the latest technologies, especially in AI and full-stack development. His practical skills have been honed through 4+ years of professional work and building real-world applications.",
    "While his formal education provided a solid base, Muhammad's true expertise comes from hands-on experience building 10+ major projects and working with companies like Hubuk Technology. He's also self-taught in many cutting-edge technologies."
  ],

  // Location/Remote
  location: [
    "Muhammad is based in Kano State, Nigeria. He's experienced in remote collaboration and has worked with teams across different time zones. He's open to both remote and on-site opportunities depending on the project.",
    "He's located in Nigeria but is comfortable working remotely with international teams. Modern tools make collaboration seamless regardless of location!"
  ],

  // Pricing/Rates
  pricing: [
    "For pricing and rates, it's best to discuss directly with Muhammad as it depends on the project scope, complexity, and timeline. Please use the **Contact Form** on this website to share your project details and get a tailored quote.",
    "Project costs vary based on requirements. Muhammad offers competitive rates and focuses on delivering value. Fill out the **Contact Form** on this site to discuss your project and get a personalized estimate."
  ],

  // Timeline/Availability
  timeline: [
    "Muhammad is currently available for new projects! Timeline depends on scope and complexity. He typically responds within 24-48 hours. Please use the **Contact Form** on this website to discuss your timeline and requirements.",
    "He can start new projects soon! For specific timelines, it's best to discuss your requirements directly. Use the **Contact Form** below to get accurate estimates for your project."
  ],

  // Languages spoken
  languages: [
    "Muhammad is fluent in English and communicates effectively in both written and verbal forms. His documentation and code comments are clear and well-structured.",
    "He communicates primarily in English and is excellent at technical writing and documentation."
  ],

  // Hobbies/Personal
  personal: [
    "Muhammad is passionate about technology and building products that solve real problems. When not coding, he's likely learning about new AI developments or working on his startup Nyra. His drive to create impactful software is evident in all his projects.",
    "He's deeply passionate about technology, AI, and entrepreneurship. His personal projects and startup Nyra reflect his commitment to building meaningful software solutions."
  ],

  // Strengths
  strengths: [
    "Muhammad's key strengths include:\n\n**Technical**: Full-stack development, AI/ML, clean architecture\n**Soft Skills**: Problem-solving, communication, attention to detail\n**Professional**: Reliable, deadline-driven, quality-focused\n**Leadership**: Entrepreneurial, self-motivated, team player\n\nThese qualities help him deliver exceptional results consistently.",
    "His core strengths are technical excellence, strong problem-solving abilities, clear communication, and a commitment to quality. He combines deep technical knowledge with practical business understanding."
  ],

  // User introduction
  introduction: [
    "Nice to meet you! I'm happy to help you learn about Muhammad's work. What brings you here today - are you interested in his projects, looking to hire, or just exploring?",
    "Great to meet you! Feel free to ask me anything about Muhammad's skills, projects, or experience. How can I help you today?",
    "Hello! Welcome to Muhammad's portfolio. I'd be happy to tell you about his work. What would you like to know?"
  ],

  // Mentorship requests
  mentorship: [
    "That's wonderful that you're looking to learn! While Muhammad doesn't have a formal mentorship program, he's always happy to connect with fellow developers. Use the **Contact Form** on this website to reach out about mentorship opportunities. He's particularly knowledgeable in:\n\n- Full-stack development (.NET, Node.js, React)\n- AI/ML and LLM evaluation\n- Building scalable SaaS applications\n- Clean architecture patterns\n\nWould you like to know more about any of these areas?",
    "Muhammad loves helping others grow in tech! While he doesn't have a structured mentorship program, he's open to connecting with aspiring developers. Use the **Contact Form** below to reach out and discuss how he might be able to help. In the meantime, would you like to explore his projects to see his approach to software development?"
  ],

  // About Muhammad
  about: [
    `Meet Muhammad Idris Abubakar - a 22-year-old Software & AI Evaluation Engineer who's been transforming ideas into production-ready systems for the past 4 years.\n\n**The Journey:**\n\nStarting with C# at 18, Muhammad dove headfirst into the world of software development. What began as curiosity quickly became obsession - 8-10 hours of daily coding for 4 years straight. That dedication led to 30+ projects, with 11+ major applications that solve real business problems.\n\n**What He Does:**\n\nMuhammad specializes in building **scalable SaaS applications** and **AI evaluation workflows**. He's worked with teams of 30-50 people at companies like Hubuk Technology, FlexiSAF, and Torvix AI. His expertise spans the full stack - from .NET and PostgreSQL backends to React frontends - all built with Clean Architecture principles.\n\n**The Founder Side:**\n\nBut Muhammad isn't just a developer for hire. He's the founder of **Nyra**, a startup focused on building world-class productivity software. This isn't just another side project - it's his vision for proving that young Nigerian developers can build globally competitive technology.\n\n**Based in ${personalInfo.location}**, Muhammad codes with a mission: to turn complex problems into elegant, high-impact solutions. Whether it's AI-powered healthcare systems, multi-tenant SaaS platforms, or live translation tools - he builds software that makes a difference.\n\nWant to know more about his projects, skills, or vision? Just ask!`,
    `Let me tell you about Muhammad Idris Abubakar.\n\nHe's 22. He's been coding for 4 years. And in that time, he's built 30+ projects - including an AI-powered hospital management system, multi-tenant SaaS platforms, and productivity tools used by real businesses.\n\n**The Technical Side:**\n\nMuhammad is a **Software & AI Evaluation Engineer** who lives in the intersection of full-stack development and artificial intelligence. His daily work involves:\n\n• Building scalable SaaS applications with .NET 8, Node.js, and PostgreSQL\n• Evaluating large language models (LLMs) for accuracy and performance\n• Architecting systems that handle real user traffic and business logic\n• Writing clean, maintainable code that other developers can understand\n\n**The Entrepreneurial Side:**\n\nHe's also the founder of **Nyra** - a startup building productivity software with a twist: live translation and transcription for global teams. It's his answer to the question: "Can a young developer from Nigeria build world-class software?"\n\nThe answer, based on his track record, is yes.\n\n**The Work Ethic:**\n\nMuhammad codes 8-10 hours a day. He's worked with teams of 30-50 people. He's delivered projects for healthcare, education, finance, and logistics. He doesn't just write code - he solves problems.\n\nBased in Kano State, Nigeria, he's passionate about proving that excellence can come from anywhere. Want to explore his projects or discuss a collaboration? I'm here to help!`,
    `**Muhammad Idris Abubakar** is a name you should remember.\n\nAt 22, he's already a seasoned **Software & AI Evaluation Engineer** with 4 years of intensive experience building systems that matter. Not hobby projects. Not tutorials. Real applications serving real users.\n\n**The Developer:**\n\nMuhammad specializes in:\n\n✓ **Full-Stack SaaS Development** - .NET 8, Node.js, React, PostgreSQL, Clean Architecture\n✓ **AI/ML Engineering** - LLM evaluation, NLP annotation, prompt engineering\n✓ **Scalable Systems** - Multi-tenant platforms, modular architectures, enterprise-grade code\n\nHe's worked at Hubuk Technology, FlexiSAF, and Torvix AI - collaborating with teams of 30-50 people and shipping features that users depend on daily.\n\n**The Founder:**\n\nBut here's what makes Muhammad different: he doesn't just build for others. He builds his own vision.\n\n**Nyra** is his startup - a productivity platform with AI-powered features like live translation, meeting transcription, and smart journaling. It's built for global teams, designed in Nigeria, and created to prove a point: world-class innovation can come from anywhere.\n\n**The Mission:**\n\nMuhammad codes 8-10 hours every single day. Not because he has to - because he's driven by a mission to bring solutions to the world and leave a lasting legacy. He wants to be the youngest Nigerian founder to build a globally recognized startup.\n\nBased in ${personalInfo.location}, he combines technical excellence with entrepreneurial vision. He's not just writing code - he's building the future.\n\nCurious about specific projects? Want to know his tech stack? Ready to collaborate? Let's talk!`
  ],

  // Skills overview
  skills: [
    `Muhammad's skill set is the result of 4 years of intensive, hands-on development - 8-10 hours every single day. Here's what he brings to the table:\n\n**🤖 AI & Machine Learning:**\n• LLM Evaluation (accuracy, precision, recall metrics)\n• NLP Annotation & prompt engineering\n• AI-powered features in production apps\n• Working with GPT, Gemini, and custom models\n\n**💻 Backend Development:**\n• **.NET 8** - His strength. Clean Architecture, CQRS, Mediator patterns\n• **Node.js** - Express, RESTful APIs, real-time systems\n• **PostgreSQL** - Complex queries, row-level security, multi-tenancy\n• **Java/Spring** - Enterprise backend development\n\n**🎨 Frontend Development:**\n• **React & Next.js** - SSR, SSG, App Router, TypeScript\n• **React Native** - Cross-platform mobile apps (iOS/Android)\n• **Native Mobile** - Swift (iOS), Kotlin (Android) basics\n• **Tailwind CSS** - Modern, responsive design systems\n\n**🛠️ DevOps & Tools:**\n• Docker for containerization\n• Git workflows (branching, PRs, code reviews)\n• SendGrid, Resend for email automation\n• CI/CD pipelines and deployment\n\n**🏗️ Architecture & Patterns:**\n• Clean Architecture principles\n• SOLID design patterns\n• Multi-tenant SaaS architecture\n• Microservices and modular systems\n\n**First language?** C# - where it all started at age 18.\n**Current focus?** AI evaluation + full-stack SaaS development.\n\nWant specifics on any of these? I can dive deeper into his experience with each technology!`,
    `Here's the thing about Muhammad's skills - they're not from courses or certificates. They're battle-tested from 30+ real projects over 4 years.\n\n**The Full Stack:**\n\n**Backend Mastery:**\n• .NET 8 (his primary weapon - Clean Architecture, Entity Framework, CQRS)\n• Node.js (Express, RESTful APIs, real-time systems)\n• PostgreSQL (complex queries, multi-tenant setups, optimization)\n• Java/Spring (enterprise backend development)\n\n**Frontend Excellence:**\n• React & Next.js 15 (App Router, Server Actions, TypeScript)\n• React Native (cross-platform mobile - iOS & Android)\n• Swift & Kotlin (native mobile development basics)\n• Tailwind CSS + shadcn/ui (modern design systems)\n\n**AI/ML Engineering:**\n• LLM evaluation workflows (precision, recall, coverage metrics)\n• NLP annotation and prompt engineering\n• Building AI-powered features in production apps\n• Working with GPT, Gemini, and custom models\n\n**Professional Tools:**\n• Git (branching strategies, code reviews, collaboration)\n• Docker (containerization for deployment)\n• SendGrid/Resend (email automation)\n• CI/CD pipelines\n\n**What Makes Him Different:**\n\nMuhammad doesn't just know these technologies - he's built production systems with them. Multi-tenant SaaS platforms. AI-powered healthcare systems. Real-time translation tools. Code that serves real users.\n\nHe started with **C# at 18** and hasn't stopped learning since. 8-10 hours of coding daily for 4 years = deep, practical expertise.\n\nCurious about a specific technology or want to see examples of his work? Just ask!`,
    `Let me break down Muhammad's technical arsenal - built through 4 years of relentless practice and 30+ production projects:\n\n**🎯 Core Strengths:**\n\n**Backend Development** (Primary expertise):\n→ **.NET 8**: Clean Architecture, CQRS, Mediator pattern, Entity Framework, multi-tenancy\n→ **Node.js**: Express APIs, async workflows, real-time systems\n→ **PostgreSQL**: Advanced queries, row-level security, optimization, database design\n→ **Java/Spring**: Enterprise backend patterns\n\n**Frontend Development** (Production-ready):\n→ **React/Next.js 15**: App Router, Server Actions, SSR/SSG, TypeScript mastery\n→ **React Native**: Cross-platform mobile (iOS & Android)\n→ **Swift/Kotlin**: Native mobile development fundamentals\n→ **Tailwind CSS**: Responsive design, component libraries, modern UX\n\n**AI/ML Engineering** (Specialized):\n→ **LLM Evaluation**: Precision, recall, coverage metrics, quality assurance\n→ **NLP**: Annotation, prompt engineering, conversational AI\n→ **Production AI**: Integrating AI into real applications (like this chatbot!)\n→ **Platforms**: OpenAI, Google Gemini, custom models\n\n**Software Architecture** (Founder-level thinking):\n→ Clean Architecture principles (separation of concerns, testability)\n→ SOLID design patterns\n→ Multi-tenant SaaS architecture\n→ Modular systems that scale\n\n**DevOps & Collaboration**:\n→ Docker, Git workflows, CI/CD\n→ Email automation (SendGrid, Resend)\n→ Team collaboration (30-50 person teams)\n\n**Languages:** C# (first love), TypeScript, Python, Java\n\n**The Difference:**\n\nMuhammad's skills aren't theoretical. Every technology listed here has been used in production systems serving real users. He codes 8-10 hours daily and has for 4 years straight. That's roughly 11,000+ hours of hands-on experience.\n\nNeed details on any specific tech? Want to see examples of his work with these tools? I'm here!`
  ],

  // Contact info - Protected, direct to form
  contact: [
    "I'd love to help you connect with Muhammad! For your privacy and his, I don't share contact details directly. Please use the **Contact Form** on this website - just scroll down to the Contact section. Muhammad typically responds within 24-48 hours. Is there anything else about his work I can tell you?",
    "Great that you want to reach out! Please use the **Contact Form** available on this site - it's the best way to get in touch with Muhammad. You can also find links to his GitHub and LinkedIn profiles there. Would you like to know more about his projects while you're here?",
    "To connect with Muhammad, please fill out the **Contact Form** on this website. He checks it regularly and will get back to you promptly. In the meantime, is there anything about his skills or projects I can help you with?"
  ],

  // Resume
  resume: [
    `You can download Muhammad's resume here: ${personalInfo.resumeLink}\n\nIt contains his complete work history, education, and technical skills. Is there anything specific you'd like to know about his experience?`
  ],

  // Startup/Nyra
  startup: [
    `Muhammad founded ${personalInfo.startup} with a mission to ${personalInfo.startupMission}. His flagship product is Nyra Connect - an AI-powered productivity app featuring smart journals, focus sessions, and personalized insights. The app is built using .NET 8, React, and PostgreSQL with Clean Architecture principles.`
  ],

  // Experience overview
  experience: [
    "Muhammad has an impressive professional journey:\n\n**Hubuk Technology Limited** (2022-Present)\nFull Stack Developer - Building modular APIs, AI dashboards\n\n**Freelance AI Evaluation** (2024-Present)\nEvaluating LLMs, designing test cases\n\n**FlexiSAF Edusoft** (2025)\nBackend Engineering Intern\n\n**Torvix AI** (2025)\nFrontend Developer Intern\n\nWant details about any specific role?"
  ],

  // Availability/Hiring
  availability: [
    "Muhammad is always open to interesting opportunities! Whether it's a full-time role, freelance project, or collaboration, he'd love to hear about it. Please use the **Contact Form** on this site to reach out. What kind of project do you have in mind?",
    "Great question! Muhammad is available for:\n- Full-time positions\n- Contract/Freelance work\n- Technical consulting\n- AI evaluation projects\n\nUse the **Contact Form** below to discuss a potential opportunity!"
  ],

  // Technologies
  techStack: [
    "Muhammad's core tech stack includes:\n\n**Primary Languages**: TypeScript, C#, Python, Java, Swift, Kotlin\n**Backend**: .NET 8, Node.js, Express\n**Frontend**: React, Next.js, Tailwind CSS\n**Mobile**: React Native, Swift (iOS), Kotlin (Android)\n**Databases**: PostgreSQL, Firebase\n**AI/ML**: LLM evaluation, NLP, Google AI\n**DevOps**: Docker, Git, CI/CD\n\nHe's comfortable working across the full stack and mobile platforms, specializing in building scalable, maintainable systems."
  ],

  // AI/ML work
  aiWork: [
    "Muhammad's AI expertise includes:\n\n**LLM Evaluation**: Assessing model quality, accuracy, and safety\n**Test Design**: Creating reproducible test scenarios for AI systems\n**Metrics Application**: Using precision, recall, F1 scores\n**NLP Annotation**: Data labeling for model training\n**AI Integration**: Building AI-powered features into applications\n\nHe's worked on AI dashboards, NLP systems, and automated QA for machine learning models."
  ],

  // Unknown/Default
  unknown: [
    "I'm not quite sure about that one, but I'd be happy to tell you about Muhammad's projects, skills, experience, or how to get in touch. What would you like to know?",
    "That's an interesting question! While I might not have that specific info, I can tell you a lot about Muhammad's technical work, his startup Nyra, or help you connect with him. What sounds good?",
    "Hmm, I don't have info on that specifically. But I'm great at sharing details about:\n- His 10+ major projects\n- Technical skills & AI expertise\n- Work experience\n- Contact information\n\nWhat catches your interest?"
  ],

  // Goodbye
  goodbye: [
    "Thanks for visiting! If you have any more questions later, feel free to come back. Good luck with your project!",
    "Great chatting with you! Don't hesitate to reach out to Muhammad directly at abubakarmi131@gmail.com if you want to discuss opportunities. Take care!",
    "Thanks for stopping by! I hope you found what you were looking for. Feel free to come back anytime!"
  ],

  // Thanks
  thanks: [
    "You're welcome! Is there anything else you'd like to know about Muhammad's work?",
    "Happy to help! Feel free to ask if you have more questions.",
    "Anytime! Let me know if there's anything else I can tell you about."
  ],

  // Hourly rate / payment questions
  hourlyRate: [
    "For hourly rates and payment details, it's best to discuss directly with Muhammad since rates vary based on project complexity, timeline, and scope. Please use the **Contact Form** on this website to discuss your specific requirements and get a detailed quote.",
    "Muhammad's rates are competitive and depend on the project details. Use the **Contact Form** below to share your requirements - he'll provide a customized quote based on your needs."
  ],

  // Mobile app development
  mobileApp: [
    "Yes! Muhammad builds native mobile applications for both iOS and Android. His mobile development stack includes:\n\n**React Native**: Cross-platform apps (iOS & Android)\n**Native Development**: Swift/Kotlin when needed\n**Responsive Web**: Progressive Web Apps (PWAs)\n\nHe can handle your mobile project from design to deployment on the App Store and Google Play. Use the **Contact Form** to discuss your mobile app idea!",
    "Absolutely! Muhammad has experience with native iOS and Android development. Whether you need a cross-platform app with React Native or native development with Swift/Kotlin, he's got you covered. Share your mobile app requirements through the **Contact Form**!"
  ],

  // Cloud & DevOps
  cloud: [
    "Yes! Muhammad has experience with cloud platforms and DevOps practices. His stack includes Docker for containerization, and he's worked with cloud deployments. For specific cloud providers (AWS, Azure, Google Cloud) or advanced DevOps needs, use the **Contact Form** to discuss your infrastructure requirements.",
    "Muhammad is comfortable with cloud deployment and has worked with Docker and modern DevOps practices. Share your cloud/DevOps requirements through the **Contact Form** to discuss the best solution for your project."
  ],

  // API development & integrations
  apiIntegration: [
    "Absolutely! Muhammad has extensive experience building REST APIs with .NET 8 and Node.js. He's worked on:\n\n- RESTful API design\n- Third-party API integrations\n- Authentication & authorization\n- Payment gateway integrations\n- Real-time APIs\n\nWant to know more about a specific integration?",
    "API development is one of Muhammad's core strengths! He's built scalable APIs for multiple projects using .NET and Node.js. Use the **Contact Form** to discuss your API requirements."
  ],

  // Working with startups
  startups: [
    "Muhammad loves working with startups! As a founder of Nyra himself, he understands the startup journey - moving fast, building MVPs, and iterating based on feedback. He's helped startups build:\n\n- MVPs and prototypes\n- Scalable SaaS platforms\n- Multi-tenant systems\n\nUse the **Contact Form** to discuss your startup idea!",
    "Great fit! Muhammad is a startup founder himself (Nyra) and understands the unique needs of early-stage companies. He can help you build fast, scale smart, and iterate quickly. Reach out via the **Contact Form**!"
  ],

  // NDA & contracts
  nda: [
    "Yes, Muhammad is open to signing NDAs and working under contracts. He takes confidentiality seriously and has worked with clients under various agreement types. Use the **Contact Form** to discuss your NDA requirements and project details.",
    "Absolutely! Muhammad is professional and willing to work under NDAs or custom contracts. Reach out through the **Contact Form** to discuss your legal requirements."
  ],

  // Development process
  process: [
    "Muhammad follows modern software development best practices:\n\n**Planning**: Understanding requirements, defining scope\n**Design**: Architecture planning, tech stack selection\n**Development**: Agile sprints, regular updates\n**Testing**: Unit tests, integration tests, QA\n**Deployment**: CI/CD pipelines, staging environments\n**Maintenance**: Post-launch support, bug fixes\n\nWant to discuss a specific aspect of the process?",
    "His development process is collaborative and transparent. Muhammad believes in regular communication, iterative development, and delivering quality code. Use the **Contact Form** to discuss how he can adapt his process to your needs!"
  ],

  // Testing & quality assurance
  testing: [
    "Muhammad takes quality seriously! His approach includes:\n\n- Writing unit tests for critical functionality\n- Integration testing for APIs\n- Manual QA before deployment\n- Code reviews and best practices\n- Performance testing for scalability\n\nQuality code is a priority in all his projects.",
    "Yes, testing is built into Muhammad's workflow. He writes tests, conducts thorough QA, and follows best practices to ensure reliable, bug-free software. Want to know more about his quality standards?"
  ],

  // Maintenance & support
  maintenance: [
    "Muhammad offers post-launch maintenance and support! This can include:\n\n- Bug fixes and updates\n- Feature enhancements\n- Performance monitoring\n- Security patches\n- Technical support\n\nMaintenance terms are discussed during the project. Use the **Contact Form** to ask about support options!",
    "Yes! Muhammad provides ongoing support and maintenance based on your needs. Whether it's bug fixes, updates, or new features, he can work out a support plan with you. Reach out via the **Contact Form**!"
  ],

  // Communication & tools
  communication: [
    "Muhammad is very communicative and uses modern collaboration tools:\n\n**Messaging**: Slack, Teams, Discord\n**Project Management**: Jira, Trello, Linear\n**Code**: GitHub, GitLab\n**Meetings**: Zoom, Google Meet\n**Docs**: Notion, Confluence\n\nHe adapts to your team's preferred tools!",
    "Great question! Muhammad believes in clear, regular communication. He's comfortable with Slack, Teams, email, or video calls - whatever works best for your team. He provides regular updates and is responsive to questions."
  ],

  // Industries & domains
  industries: [
    "Muhammad has worked across multiple industries:\n\n- **Healthcare**: Nubenta Care (hospital management)\n- **Education**: SmartEd ERP (school system)\n- **Construction**: BuildTrack Pro (expense tracking)\n- **Logistics**: Bus Tracker (transportation)\n- **Finance**: BulkPay (payroll system)\n- **Productivity**: Nyra Connect (AI productivity)\n\nHe adapts quickly to new domains!",
    "He's worked in healthcare, education, finance, logistics, and productivity software. Muhammad learns domain-specific requirements fast and builds solutions that fit industry needs. What's your industry?"
  ],

  // Code quality
  codeQuality: [
    "Muhammad writes clean, maintainable code following industry best practices:\n\n- **Clean Architecture** principles\n- **SOLID** design patterns\n- **DRY** (Don't Repeat Yourself)\n- Proper documentation and comments\n- Code reviews and refactoring\n- Consistent formatting and style\n\nQuality and maintainability are priorities!",
    "Code quality is a core focus. Muhammad writes well-structured, documented, and tested code that other developers can understand and maintain. He believes in long-term value over quick hacks."
  ],

  // Team collaboration
  teamWork: [
    "Muhammad works great in teams! His experience includes:\n\n- Collaborating with designers, PMs, and other developers\n- Code reviews and pair programming\n- Using Git workflows (branching, PRs, etc.)\n- Agile/Scrum methodologies\n- Clear documentation for team members\n\nHe's both independent and collaborative as needed.",
    "Yes! Muhammad has worked in team environments at Hubuk Technology and as an intern. He's comfortable with code reviews, Git workflows, and team communication. He's a strong team player!"
  ],

  // Deadlines
  deadlines: [
    "Muhammad takes deadlines seriously and plans projects realistically:\n\n- Sets clear milestones and deliverables\n- Provides regular progress updates\n- Communicates early if challenges arise\n- Delivers quality work on time\n\nHe's reliable and deadline-driven. Want to discuss your timeline? Use the **Contact Form**!",
    "Meeting deadlines is important to Muhammad. He plans carefully, communicates proactively, and delivers on schedule. If you have a specific deadline, share it through the **Contact Form** to discuss feasibility!"
  ],

  // Favorite tech / preferences
  favorites: [
    "Muhammad enjoys working with modern, scalable technologies. His favorites include:\n\n**Languages**: TypeScript (type safety & developer experience)\n**Backend**: .NET 8 (performance & enterprise-ready)\n**Frontend**: React/Next.js (great ecosystem)\n**Database**: PostgreSQL (powerful & reliable)\n\nHe loves learning new tech and solving complex problems!",
    "He's passionate about .NET, TypeScript, and React! Muhammad enjoys building scalable systems with clean architecture. He's always excited to learn new technologies that solve real problems."
  ],

  // Blog and writing
  blog: [
    "Yes! Muhammad writes about his journey and technical insights. His latest posts include:\n\n**'Why I Started Nyra'** - His entrepreneurship journey and vision for building global productivity software from Nigeria\n**'Building Modular SaaS Architectures'** - Technical deep-dive into .NET & PostgreSQL\n**'Designing Systems That Scale with People'** - Human-centric system design principles\n\nYou can read them in the Blog section on this site!",
    "Muhammad shares his experiences through blog posts covering entrepreneurship, software architecture, and system design. Check out the Blog section to read his latest thoughts!"
  ],

  // Company size preferences
  companySize: [
    "Muhammad works with clients of all sizes:\n\n**Startups**: MVPs, early-stage products\n**SMBs**: Custom software, process automation\n**Enterprises**: Scalable systems, integrations\n**Individuals**: Freelance projects, consulting\n\nHe adapts his approach based on your company's needs and stage!",
    "From solo entrepreneurs to established companies, Muhammad has experience across the board. He's flexible and tailors his services to fit your organization's size and needs."
  ],

  // Portfolio website questions
  portfolioTech: [
    "Great question! This portfolio was built with:\n\n**Framework**: Next.js 15 (React 18)\n**Styling**: Tailwind CSS + shadcn/ui\n**Animations**: Framer Motion\n**AI Chatbot**: Custom knowledge base (that's me!)\n**Email**: Resend API for transcripts\n**Hosting**: Vercel\n\nIt showcases Muhammad's modern frontend skills and attention to design!",
    "This site is built with Next.js 15, TypeScript, and Tailwind CSS. The AI chatbot you're talking to right now was custom-built by Muhammad - no external AI APIs! Pretty cool, right?"
  ],

  // Future plans and career goals
  futurePlans: [
    "Muhammad has ambitious goals:\n\n**Short-term**: Launch Nyra globally and grow its user base\n**Medium-term**: Become a recognized name in AI and SaaS development\n**Long-term**: Build a globally recognized tech company from Nigeria, proving that world-class innovation can come from anywhere\n\nHe's driven by the mission to show what young Nigerian developers can achieve!",
    "His big dream? To become the youngest Nigerian founder to build a globally recognized startup. Muhammad is focused on growing Nyra, mastering AI/ML, and creating technology that impacts millions worldwide."
  ],

  // Learning and resources
  learning: [
    "Muhammad is always learning! Currently exploring:\n\n**AI/ML**: Advanced LLM evaluation techniques\n**Cloud**: AWS and Azure architecture\n**System Design**: Distributed systems, microservices\n**Leadership**: Building and scaling tech teams\n\nHe believes continuous learning is essential for staying relevant in tech!",
    "He's currently deep-diving into AI evaluation, cloud architecture, and system design patterns. Muhammad is passionate about staying current with emerging technologies while mastering fundamentals."
  ],

  // Open source and GitHub
  openSource: [
    "Muhammad contributes to open source and maintains personal projects on GitHub! You can explore his repositories at:\n\n**GitHub**: https://github.com/AbubakarMi\n\nHe believes in giving back to the developer community and learning through collaboration.",
    "Check out his GitHub for open-source contributions and personal projects: https://github.com/AbubakarMi. Muhammad values the open-source community and contributes when he can!"
  ],

  // Comparisons with other developers
  comparisons: [
    "Every developer brings unique strengths! What makes Muhammad stand out:\n\n✅ Strong foundation in both .NET and modern JS ecosystem\n✅ Real-world startup experience (building Nyra)\n✅ AI evaluation expertise alongside development skills\n✅ Focus on clean architecture and long-term maintainability\n✅ Based in Nigeria, competitive rates, global mindset\n\nUltimately, the best fit depends on your specific needs. Want to discuss your project?",
    "Muhammad combines technical depth with entrepreneurial experience. He's not just a developer - he's a founder who understands the business side. His unique blend of .NET, React, and AI skills makes him versatile for complex projects."
  ],

  // Time zone and availability
  timeZone: [
    "Muhammad is based in West Africa Time (WAT, UTC+1). He's flexible with meeting times and has experience working with:\n\n- **US teams**: Morning meetings WAT = evening US time\n- **European teams**: Overlap during business hours\n- **Asian teams**: Evening WAT = morning Asia time\n\nHe's professional and adapts to your team's schedule!",
    "He's in Nigeria (WAT, UTC+1) but very flexible with scheduling. Muhammad has worked with international teams and can accommodate different time zones for meetings and collaboration."
  ],

  // Project size preferences
  projectSize: [
    "Muhammad handles projects of various sizes:\n\n**Small** (1-4 weeks): Landing pages, small tools, MVPs\n**Medium** (1-3 months): Full applications, SaaS platforms\n**Large** (3+ months): Enterprise systems, complex integrations\n\nFor very large projects, he can collaborate with a trusted network of developers. Use the **Contact Form** to discuss your project scope!",
    "From quick 2-week MVPs to multi-month enterprise systems, Muhammad is flexible. He's most passionate about medium to large projects where he can architect scalable solutions. What's your timeline?"
  ],

  // Technical challenges and stories
  challenges: [
    "Muhammad has tackled interesting technical challenges:\n\n**Multi-tenancy**: Built isolated data systems for SaaS apps\n**AI Integration**: Implemented LLM-powered features in production\n**Performance**: Optimized slow queries, improved load times\n**Architecture**: Migrated monoliths to modular systems\n**Real-time**: Built live collaboration features\n\nHe loves solving complex problems! Have a specific challenge in mind?",
    "From building multi-tenant architectures to integrating AI models, Muhammad thrives on technical challenges. He's solved performance bottlenecks, designed scalable databases, and architected complex systems. What problem are you trying to solve?"
  ],

  // Vague/unclear questions
  clarification: [
    "I'd love to help, but I need a bit more detail! Are you asking about:\n\n- Muhammad's **technical skills** or projects?\n- **Hiring** him for a project?\n- His **availability** or rates?\n- Something **specific** about his work?\n\nFeel free to be more specific, and I'll give you a great answer!",
    "Could you clarify what you'd like to know? I can tell you about:\n\n✓ His projects and experience\n✓ Technical skills and expertise\n✓ How to work with him\n✓ His startup (Nyra)\n✓ Anything else specific!\n\nWhat interests you most?"
  ],

  // Jokes and fun interactions
  joke: [
    "Haha! Here's a dev joke for you:\n\nWhy do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛\n\nMuhammad definitely codes in dark mode. Want to know more about his actual work? 😄",
    "You want tech humor? Alright:\n\nMuhammad's code is so clean, Marie Kondo would be proud! ✨\n\nSeriously though, he does write really maintainable code. Want to see his projects?",
    "Fun fact: Muhammad once debugged a issue for 3 hours... the problem? A missing semicolon. Classic developer moment! 😅\n\nBut in all seriousness, his attention to detail is what makes his code reliable. What would you like to know about his work?"
  ],

  // Portfolio design compliments
  portfolioCompliment: [
    "Thank you! Muhammad put a lot of thought into this design. He wanted a portfolio that's:\n\n✨ **Modern** - Clean, professional aesthetic\n✨ **Interactive** - Smooth animations, great UX\n✨ **Functional** - AI assistant (that's me!), blog, contact form\n✨ **Fast** - Optimized performance with Next.js\n\nHe believes a portfolio should showcase skills, not just list them. Glad you like it!",
    "Appreciate that! Muhammad designed this to demonstrate his frontend skills and attention to user experience. Every detail - from the animations to this AI chat - was built by him. Want to know how it was made?"
  ],

  // Weaknesses or areas improving
  weaknesses: [
    "Great question - Muhammad believes in honest self-awareness. Areas he's actively improving:\n\n📚 **Cloud/DevOps**: Expanding AWS and Azure expertise\n📚 **System Design**: Studying distributed systems at scale\n📚 **DevOps/Infrastructure**: Learning Kubernetes and advanced CI/CD\n\nHe's always learning and transparent about his current skill level. What matters most for your project?",
    "Muhammad is honest about his growth areas. While strong in web development, mobile apps, and .NET/React, he's actively expanding his cloud infrastructure and distributed systems knowledge. He believes in continuous learning and being upfront about capabilities."
  ],

  // What NOT to hire for
  notGoodFor: [
    "To be transparent, Muhammad may not be the best fit for:\n\n❌ **Graphic design** - He works with designers for UI/UX\n❌ **Deep Data Science** - AI evaluation yes, ML research no\n❌ **Hardware/Embedded systems** - Pure software focus\n❌ **Game development** - Not his specialty\n\nHe's honest about his strengths and will recommend specialists when needed. What type of project do you have?",
    "Muhammad believes in transparency. If your project requires deep data science/ML research, hardware engineering, or graphic design, he can collaborate with specialists. His core strengths are full-stack web development, native mobile apps, and AI integration."
  ],

  // Inspiration & motivation
  inspiration: [
    `What drives someone to code 8-10 hours every single day for 4 years straight? Let me tell you about Muhammad's "why":\n\n**The Core Mission:**\n\n"I want to bring solutions to the world and leave a lasting legacy. I want to build products that outlive me and make real impact."\n\nThat's not just a quote - that's Muhammad's daily mantra. At 22, most people are still figuring things out. Muhammad already knows: he wants to build technology that changes lives.\n\n**The Deeper Drive:**\n\nMuhammad is motivated by three powerful ideas:\n\n1️⃣ **Proof of Possibility**: He wants to prove that young Nigerian developers can create world-class technology. Not just locally competitive - globally recognized. He's building to show that excellence can come from anywhere.\n\n2️⃣ **Legacy Over Paycheck**: Sure, he needs to make a living. But that's not the real goal. The real goal is to build products so valuable, so well-made, that they continue serving users long after he's gone. That's legacy.\n\n3️⃣ **Impact at Scale**: Muhammad doesn't want to build small. He wants to solve problems for millions of people. That's why he's building Nyra - a productivity platform designed for global teams, not just local users.\n\n**The Daily Commitment:**\n\n8-10 hours of coding. Every. Single. Day. For 4 years.\n\nThat's roughly 11,000+ hours of focused work. That level of dedication doesn't come from wanting a job - it comes from a burning desire to create something meaningful.\n\n**Why It Matters for You:**\n\nWhen you work with Muhammad, you're not just hiring a developer who clocks in and out. You're partnering with someone who treats every project like it's building toward a legacy. That's the kind of passion that turns good projects into great ones.\n\nCurious about what this drive has produced? Ask me about his projects!`,
    `Let me tell you what really drives Muhammad Idris Abubakar.\n\nMost developers code for a paycheck. Some code for the love of it. But Muhammad? He codes with a mission that's bigger than both.\n\n**The Mission:**\n\n*"To bring solutions to the world and leave a lasting legacy."*\n\nAt 22, he's already thinking about legacy. Not fame. Not wealth. Legacy - building products so impactful they outlive him.\n\n**Three Core Beliefs:**\n\n**1. Nigerian developers can compete globally**\nMuhammad wants to be the youngest Nigerian founder to build a globally recognized startup. Not because of ego - because he wants to prove it's possible. He wants to show that world-class innovation can come from Kano, Nigeria, just as easily as Silicon Valley.\n\n**2. Great software changes lives**\nEvery line of code Muhammad writes is part of something bigger. Whether it's an AI-powered hospital system saving lives or a productivity app helping teams collaborate - he's solving real problems for real people.\n\n**3. Hard work compounds**\n8-10 hours of coding daily for 4 years = 11,000+ hours of practice. That's not luck. That's discipline. Muhammad believes that consistent, focused work is how you turn dreams into reality.\n\n**The Fire:**\n\nMuhammad doesn't just want to build software. He wants to build products that matter. Products people depend on. Products that make the world a little bit better.\n\nThat's why he founded Nyra. That's why he's built 30+ projects. That's why he's constantly learning, constantly improving.\n\n**What This Means for You:**\n\nWhen you work with Muhammad, you get more than technical skills. You get someone who's personally invested in building something great. Someone who won't settle for "good enough." Someone driven by a mission larger than a single project.\n\nWant to see what this drive has created? Ask about his projects!`,
    `Here's the truth about what drives Muhammad:\n\n**It's not money.** (Though he needs to eat, obviously.)\n**It's not fame.** (Though recognition would be nice.)\n\n**It's legacy.**\n\nMuhammad Idris Abubakar, at 22 years old, codes 8-10 hours every single day with one burning question in mind:\n\n*"Will the things I build outlive me? Will they actually matter?"*\n\n**The Three Pillars of His Drive:**\n\n🎯 **Mission: Bring Solutions to the World**\n\nMuhammad doesn't want to build "yet another app." He wants to solve real problems. Healthcare inefficiency? He built Nubenta Care. Language barriers in business? He's building Nyra with live translation. Every project serves a purpose.\n\n🇳🇬 **Vision: Prove Nigeria Can Build World-Class Tech**\n\nHe wants to become the youngest Nigerian founder to build a globally recognized startup. Why? To show that talent isn't limited by geography. To inspire the next generation of African developers. To prove excellence can come from anywhere.\n\n⏳ **Goal: Create Products That Outlast Him**\n\nThis is the big one. Muhammad wants to build technology so valuable, so well-designed, that it continues serving users long after he's gone. That's not arrogance - that's ambition channeled into creation.\n\n**The Discipline:**\n\n8-10 hours daily.\n4 years straight.\n30+ projects built.\n11,000+ hours of hands-on coding.\n\nThat's not talent - that's relentless dedication to a mission.\n\n**Why You Should Care:**\n\nBecause when you hire Muhammad, you're not getting a developer who does the bare minimum. You're getting someone who treats every project as a step toward building something legendary.\n\nThat level of personal investment? You can't fake it. And you can't buy it. But you can partner with someone who has it.\n\nReady to see what this drive produces? Ask about his projects or Nyra!`
  ],

  // Nyra detailed vision
  nyraVision: [
    `Let me tell you about **Nyra** - Muhammad's flagship startup and his answer to a critical global problem.\n\n**The Problem Nyra Solves:**\n\nImagine this: You're in a business meeting. One person speaks only Hausa. Another speaks only English. How do you collaborate? How do you work together effectively?\n\nOr imagine this: You just had a 2-hour strategy meeting. Now you need to write notes, extract action items, create summaries, and send follow-ups. That's another hour of manual work.\n\nThese are real problems that cost businesses time, money, and opportunities every single day.\n\n**Muhammad's Solution:**\n\n**Nyra** is an AI-powered productivity platform with three game-changing features:\n\n✨ **Live Translation & Transcription**\nReal-time meeting transcription with multi-language support. Speak Hausa, your colleague hears English. Speak Mandarin, they hear French. No language barriers. Just seamless communication.\n\n✨ **Smart Meeting Management**\nAutomatic summaries, action item extraction, key decision tracking. Nyra handles the boring stuff so you can focus on what matters.\n\n✨ **AI-Powered Productivity Tools**\nSmart journals with insights, focus sessions with analytics, productivity tracking - all powered by AI that learns from your work patterns.\n\n**The Vision:**\n\nMuhammad isn't building Nyra just for Nigeria. He's building it for the world.\n\n→ **Target market**: Global teams, remote companies, international businesses\n→ **Competitive edge**: Translation + Transcription + Productivity in ONE platform\n→ **Built for**: Teams that need to break language barriers and work smarter\n\n**Coming Soon: Nyra Chat**\n\nAn all-in-one communication hub combining chats, groups, feeds, and meetings - with built-in live translation and transcription. Think Slack meets Zoom meets Google Translate, but better.\n\n**The Mission Behind It:**\n\nMuhammad wants to prove that a young Nigerian founder can build globally competitive technology. Nyra is built in Africa, designed for the world.\n\nHis goal? Become the youngest Nigerian founder to build a globally recognized startup. Nyra is how he's going to do it.\n\n**Why It Will Succeed:**\n\n✓ Solves real pain points (language barriers, meeting inefficiency)\n✓ Built by someone who lives and breathes the product\n✓ Combines multiple solutions into one seamless platform\n✓ Founder who understands both technical execution and business needs\n\nNyra isn't just another productivity app. It's Muhammad's mission to change how global teams communicate and collaborate.\n\nWant to know more about the tech stack or development roadmap? Just ask!`,
    `**Nyra** is Muhammad's answer to two massive global problems:\n\n**Problem #1: Language Barriers Kill Collaboration**\n\nIn our connected world, teams are global. But language barriers still exist. Meetings get awkward. Nuance gets lost. Opportunities slip away.\n\n**Problem #2: Meeting Overhead is Insane**\n\nA 1-hour meeting becomes 2+ hours of work when you add notes, summaries, action items, and follow-ups.\n\n**Muhammad's Solution:**\n\n**Nyra** is an AI-powered productivity platform that makes both problems disappear.\n\n**Core Features:**\n\n🌍 **Live Meeting Translation**\nSpeak your language. Your colleagues hear theirs. Real-time, accurate translation for seamless global collaboration. No more awkward pauses or misunderstandings.\n\n📝 **Intelligent Transcription**\nAutomatic meeting transcription, summarization, and action item extraction. Nyra handles the paperwork so you can focus on decisions.\n\n🧠 **AI Productivity Suite**\n• Smart journaling with insights\n• Focus sessions with analytics\n• Habit tracking and progress monitoring\n• Personalized productivity recommendations\n\n**The Roadmap:**\n\n**Phase 1** (Current): Core productivity features with AI journals and focus tracking\n**Phase 2** (Coming): Meeting transcription and translation\n**Phase 3** (Vision): Nyra Chat - unified communication platform\n\n**The Market:**\n\n→ Remote teams needing seamless cross-language collaboration\n→ Global businesses with multilingual staff\n→ Productivity-focused professionals who want AI assistance\n\n**What Makes Nyra Different:**\n\nMost platforms do ONE thing: translation OR productivity OR communication.\n\nNyra does ALL THREE in one seamless experience. That's the competitive edge.\n\n**Why Muhammad Will Succeed:**\n\nHe's not just a developer building a product. He's a founder solving a problem he deeply understands. He codes 8-10 hours daily on Nyra. He's committed to making it world-class.\n\nPlus, he has the technical chops: .NET 8 backend, React frontend, PostgreSQL, AI integration, Clean Architecture. This isn't amateur hour.\n\n**The Big Picture:**\n\nMuhammad wants Nyra to be proof that Nigerian founders can build globally competitive startups. He wants to become the youngest Nigerian to build a globally recognized company.\n\nNyra is how he's going to do it.\n\nInterested in the tech behind Nyra? Curious about the timeline? Just ask!`,
    `**Nyra**: Muhammad's mission to redefine global team productivity.\n\n**The Insight:**\n\nMuhammad realized something powerful: In a connected world, language shouldn't be a barrier. And meeting overhead shouldn't slow us down.\n\nSo he's building **Nyra** - an AI-powered platform that solves both.\n\n**What Nyra Does:**\n\n**1. Breaks Language Barriers**\n• Live translation during meetings (speak Hausa, they hear English)\n• Real-time transcription with multi-language support\n• No more awkward pauses or misunderstandings\n\n**2. Eliminates Meeting Overhead**\n• Automatic summaries and action item extraction\n• Key decision tracking\n• Smart follow-ups\n\n**3. Boosts Individual Productivity**\n• AI-powered journals with insights\n• Focus sessions with analytics\n• Habit tracking and progress monitoring\n\n**The Vision:**\n\nNyra isn't just for Africa. It's for the WORLD.\n\n→ **Target**: Global teams, remote companies, multilingual businesses\n→ **Edge**: Translation + Transcription + Productivity in ONE platform\n→ **Future**: Nyra Chat - unified communication hub\n\n**Muhammad's Goal:**\n\nBecome the youngest Nigerian founder to build a globally recognized startup.\n\nProve that world-class innovation can come from anywhere - including Kano, Nigeria.\n\n**Tech Stack** (Because it matters):\n• Backend: .NET 8 with Clean Architecture\n• Frontend: React + TypeScript\n• Database: PostgreSQL with multi-tenancy\n• AI: Custom NLP models + OpenAI integration\n\n**Why Nyra Will Win:**\n\n✓ Solves real, painful problems\n✓ Built by a founder who's obsessed with quality\n✓ Combines multiple tools into one seamless experience\n✓ First-mover advantage in multilingual productivity\n\nMuhammad isn't just building software. He's building his legacy.\n\nAnd Nyra is the vehicle.\n\nWant to learn more about the roadmap or tech architecture? Ask away!`
  ],

  // Age & background
  ageBackground: [
    `Muhammad is **22 years old** - and already has 4 years of intensive coding experience under his belt.\n\n**The Timeline:**\n\n→ **Age 18**: Started with C# as his first programming language\n→ **Ages 18-22**: 8-10 hours of daily coding for 4 straight years\n→ **Now (22)**: 30+ projects built, 11+ major applications, founder of Nyra\n\n**Education:**\n\nBSc in Computer Science from Aliko Dangote University of Science and Technology, Wudil (Graduated 2020-2025)\n\n**What Makes This Remarkable:**\n\nAt 22, most developers are just starting out. Muhammad has already:\n• Built production systems serving real users\n• Worked with teams of 30-50 people at multiple companies\n• Founded a startup (Nyra) with global ambitions\n• Accumulated roughly 11,000+ hours of hands-on coding\n\nHe started young, worked relentlessly, and built a track record that rivals developers twice his age.\n\n**The Mission:**\n\nHis goal? Become the youngest Nigerian founder to build a globally recognized startup. At 22, he's well on his way.\n\nCurious about what he's built in those 4 years? Ask about his projects!`,
    `**22 years old.** That's Muhammad's age.\n\nBut here's what matters more than the number:\n\nHe's been coding 8-10 hours every single day since age 18. That's 4 years of relentless practice. Roughly 11,000+ hours of hands-on experience.\n\n**The Journey:**\n\n**Age 18** → Picked up C# as his first language\n**Ages 18-22** → Built 30+ projects while studying Computer Science\n**Age 22 (Now)** → Founded Nyra, working with enterprise teams, building world-class software\n\n**Education Background:**\n\nBSc in Computer Science\nAliko Dangote University of Science and Technology, Wudil\nGraduated (2020-2025)\n\n**Why Age Doesn't Tell the Full Story:**\n\nMost 22-year-olds are still learning. Muhammad is already:\n• Building scalable SaaS platforms\n• Working with teams of 30-50 people\n• Founding startups with global vision\n• Shipping production code that real users depend on\n\nHe didn't wait for permission. He started early, worked hard, and built a portfolio that speaks for itself.\n\n**His Goal:**\n\nBecome the youngest Nigerian founder to build a globally recognized startup. That's the ambition driving every line of code he writes.\n\nWant to see what 4 years of dedication looks like? Ask about his projects!`,
    `Muhammad is **22** - young, but already seasoned.\n\n**The Background:**\n\n→ Started coding at **18** with C#\n→ **4 years** of 8-10 hours daily coding (11,000+ hours total)\n→ **BSc in Computer Science** from Aliko Dangote University (2020-2025)\n→ **30+ projects** built, including 11+ major applications\n→ Founded **Nyra** - his vision for global productivity software\n\n**What 22 Means for Muhammad:**\n\nFor most people, 22 is the beginning. For Muhammad, it's already a track record:\n\n✓ Worked at Hubuk Technology, FlexiSAF, Torvix AI\n✓ Built AI-powered healthcare systems\n✓ Created multi-tenant SaaS platforms\n✓ Collaborated with teams of 30-50 people\n✓ Founded a startup with global ambitions\n\n**The Vision:**\n\nHe wants to become the youngest Nigerian founder to build a globally recognized startup. Not for ego - but to prove that world-class innovation can come from anywhere, even from a 22-year-old in Kano, Nigeria.\n\n**The Difference:**\n\nAge is just a number. Experience, discipline, and results are what matter. Muhammad has all three.\n\nCurious about his work? Ask about his projects or Nyra!`
  ],

  // Failures & lessons learned
  failuresLessons: [
    "Yes, Muhammad has experienced failures that shaped who he is today. Here's a powerful story:\n\n**The InvoTrek Challenge**\n\nMuhammad built InvoTrek - a technically solid invoicing system. The code was clean, the architecture was sound, everything worked perfectly. But there was a problem: nobody knew about it. The product struggled with visibility and market adoption.\n\n**The Painful Truth He Learned:**\n\n\"In a world full of noise, obscurity is death. If no one sees you, no one knows you. And if no one knows you, no one will ever reward you. The marketplace doesn't reward the most talented — it rewards the most visible. The most visible product wins over the most talented.\"\n\n**How This Changed Him:**\n\n• Stopped hiding his work and started actively sharing\n• Began executing and shipping every idea to market\n• Realized marketing and visibility matter as much as great code\n• Started building in public and telling the story behind his products\n\nNow with Nyra, he's applying these lessons: building world-class software AND ensuring people know about it. That's why he's focused on both product excellence and strategic visibility.\n\nThis failure taught him that even the best code in the world is worthless if nobody uses it. It's a lesson that made him a better founder.",
    "Absolutely. Muhammad learned one of his most valuable lessons from failure:\n\n**InvoTrek** - He built it with excellent architecture and clean code, but struggled to get users. Why? Because being talented isn't enough.\n\n**The Hard Lesson:**\nThe marketplace doesn't care how good your code is if nobody sees your product. Visibility beats talent. Marketing matters as much as engineering.\n\n**What Changed:**\nHe stopped being just a developer who builds in silence. He became a founder who builds AND markets. He ships publicly, shares his journey, and focuses on both quality and reach.\n\nWith Nyra, he's applying this wisdom: world-class product + strategic visibility = success.\n\nThat failure was painful, but it transformed how he approaches building products. Sometimes the best lessons come from what doesn't work.",
    "Great question! Yes, Muhammad has faced setbacks that taught him critical lessons:\n\n**The InvoTrek Story:**\n\nImagine building something technically excellent - clean code, solid architecture, no bugs. But hardly anyone uses it. That was InvoTrek.\n\n**What He Discovered:**\n\n*\"Obscurity is death. The marketplace rewards the most visible, not the most talented.\"*\n\nYou can be the best developer in the world, but if people don't know you exist, it doesn't matter.\n\n**The Transformation:**\n\nBefore: Build great code → Hope people find it\nAfter: Build great code → Actively share and market it\n\nHe stopped hiding. Started executing publicly. Began sharing his journey. Focused on making noise alongside making progress.\n\n**Why This Matters for You:**\n\nIf you hire Muhammad, you're getting someone who understands BOTH sides:\n- Technical excellence (he can build it)\n- Business reality (he knows how to make it succeed)\n\nThat's the founder mindset. Failures taught him what most developers never learn."
  ]
};

// Pattern matching for intent detection
export function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase().trim();

  // Nigerian slang greetings - check first for priority
  if (/^(how\s*far|wetin\s*dey|e\s*dey|na\s*you|abeg|omo|bros?|my\s*guy|e\s*go\s*be|wahala|no\s*wahala|shey)/.test(lowerMessage) ||
      /^(wetin|na\s*wa|make\s*i|oya|jare|o\s*boy|chairmo)/.test(lowerMessage)) {
    return 'nigerianGreeting';
  }

  // Rude/offensive messages - handle gracefully
  if (/stupid|idiot|dumb|fool|useless|trash|garbage|suck|hate\s*you|worst|bad\s*bot|terrible/.test(lowerMessage) ||
      /shut\s*up|go\s*away|fuck|damn|ass|crap|bullshit|nonsense|rubbish/.test(lowerMessage)) {
    return 'rude';
  }

  // Greetings - must be at start or standalone
  if (/^(hi+|hello+|hey+|greetings|howdy|yo+|sup|hola|good\s*(morning|afternoon|evening)|hy+)$/i.test(lowerMessage) ||
      /^(hi+|hello+|hey+|hy+)\s+(there|everyone|all)/.test(lowerMessage)) {
    return 'greeting';
  }

  // User introducing themselves
  if (/^(my\s*name\s*(is|'s)|i\s*am|i'm|call\s*me)\s+\w+/.test(lowerMessage)) {
    return 'introduction';
  }

  // Mentorship/Learning questions
  if (/mentor|mentorship|teach|learn\s*from|guidance|coach|train\s*me/.test(lowerMessage)) {
    return 'mentorship';
  }

  // Hourly rate / Payment questions
  if (/hourly\s*rate|hour\s*rate|per\s*hour|payment|pay\s*method|invoice|billing/.test(lowerMessage)) {
    return 'hourlyRate';
  }

  // Mobile app questions
  if (/mobile\s*app|ios|android|react\s*native|flutter|native\s*app|smartphone\s*app/.test(lowerMessage)) {
    return 'mobileApp';
  }

  // Cloud & DevOps
  if (/aws|azure|google\s*cloud|cloud\s*platform|devops|ci\/cd|deployment|kubernetes|docker/.test(lowerMessage)) {
    return 'cloud';
  }

  // API & Integrations
  if (/\bapi\b|rest\s*api|integration|webhook|third[-\s]party|endpoint|microservice/.test(lowerMessage)) {
    return 'apiIntegration';
  }

  // Startups
  if (/mvp|minimum\s*viable|early[-\s]stage|seed\s*fund|startup\s*work|work.*startup/.test(lowerMessage)) {
    return 'startups';
  }

  // NDA & Contracts
  if (/\bnda\b|non[-\s]disclosure|confidential|contract|agreement|legal\s*doc/.test(lowerMessage)) {
    return 'nda';
  }

  // Development process
  if (/development\s*process|workflow|methodology|agile|scrum|how.*develop|work\s*process/.test(lowerMessage)) {
    return 'process';
  }

  // Testing & QA
  if (/test|testing|quality\s*assurance|\bqa\b|unit\s*test|bug|debug/.test(lowerMessage)) {
    return 'testing';
  }

  // Maintenance & Support
  if (/maintenance|support|post[-\s]launch|update|patch|bug\s*fix|ongoing/.test(lowerMessage)) {
    return 'maintenance';
  }

  // Communication & Tools
  if (/communication\s*tool|slack|jira|trello|collaborate|project\s*management|tool/.test(lowerMessage)) {
    return 'communication';
  }

  // Industries
  if (/industry|sector|domain|healthcare|finance|education|worked\s*in|experience\s*in/.test(lowerMessage)) {
    return 'industries';
  }

  // Code quality
  if (/code\s*quality|clean\s*code|best\s*practice|coding\s*standard|readable|maintainable/.test(lowerMessage)) {
    return 'codeQuality';
  }

  // Team collaboration
  if (/team|collaborate|work\s*with\s*team|git\s*workflow|code\s*review|pair\s*program/.test(lowerMessage)) {
    return 'teamWork';
  }

  // Deadlines
  if (/deadline|on\s*time|deliver.*time|meet.*deadline|schedule/.test(lowerMessage)) {
    return 'deadlines';
  }

  // Favorite technologies
  if (/favorite|prefer|like\s*to\s*use|enjoy\s*work|best\s*tech|love.*tech/.test(lowerMessage)) {
    return 'favorites';
  }

  // Blog and writing
  if (/blog|article|write|writing|post|read.*post|latest.*post/.test(lowerMessage)) {
    return 'blog';
  }

  // Company size questions
  if (/company\s*size|startup\s*or\s*enterprise|small\s*business|work\s*with.*company|enterprise\s*client/.test(lowerMessage)) {
    return 'companySize';
  }

  // Portfolio website questions
  if (/this\s*(site|website|portfolio)|how.*built\s*this|built.*this\s*(site|portfolio)|tech\s*stack.*portfolio|portfolio.*tech/.test(lowerMessage)) {
    return 'portfolioTech';
  }

  // Future plans and goals
  if (/future\s*plan|career\s*goal|5\s*year|where.*see\s*yourself|long[-\s]term|vision|ambition/.test(lowerMessage)) {
    return 'futurePlans';
  }

  // Learning and education
  if (/learning|currently\s*learning|study|course|resource|recommend.*learn|what.*learning/.test(lowerMessage)) {
    return 'learning';
  }

  // Open source and GitHub
  if (/open\s*source|github|contribute|contribution|personal\s*project|side\s*project/.test(lowerMessage)) {
    return 'openSource';
  }

  // Comparisons with others
  if (/compare|better\s*than|vs\s*other|why\s*hire\s*you|what\s*makes.*different|stand\s*out/.test(lowerMessage)) {
    return 'comparisons';
  }

  // Time zone questions
  if (/time\s*zone|timezone|wat|utc|meeting\s*time|schedule\s*call|when\s*can\s*we\s*meet/.test(lowerMessage)) {
    return 'timeZone';
  }

  // Project size
  if (/project\s*size|minimum\s*project|small\s*project|large\s*project|how\s*big|scope/.test(lowerMessage)) {
    return 'projectSize';
  }

  // Technical challenges
  if (/challenge|difficult\s*problem|complex\s*problem|tough\s*bug|hardest\s*thing|struggle/.test(lowerMessage)) {
    return 'challenges';
  }

  // Age and background - enhanced understanding (MOVED BEFORE CLARIFICATION)
  if (/how\s*old|age|your\s*age|young|born\s*in|year\s*born|how\s*many\s*years|what.*age/.test(lowerMessage) ||
      /when.*born|date.*birth|birthday|years\s*old/.test(lowerMessage)) {
    return 'ageBackground';
  }

  // Failures & lessons - enhanced understanding (MOVED BEFORE CLARIFICATION)
  if (/failure|fail|mistake|setback|didn't\s*go\s*well|learn.*from|lesson\s*learn|went\s*wrong/.test(lowerMessage) ||
      /ever.*fail|challenge.*face|difficult.*time|struggle|obstacle|problem.*encounter/.test(lowerMessage) ||
      /what.*learn|experience.*teach|grow.*from|overcome/.test(lowerMessage) ||
      /did\s*he\s*fail|has\s*he\s*fail|any.*failure/.test(lowerMessage)) {
    return 'failuresLessons';
  }

  // About Muhammad - enhanced understanding (MOVED BEFORE CLARIFICATION)
  if (/about\s*(him|muhammad|idris)|who\s*is\s*(he|muhammad)|tell\s*me\s*about\s*(him|muhammad)|background/.test(lowerMessage) ||
      /^about$/i.test(lowerMessage)) {
    return 'about';
  }

  // Skills - enhanced understanding (MOVED BEFORE CLARIFICATION)
  if (/skill|technolog|tech\s*stack|what\s*(can|does)\s*he\s*(do|know)|expertise|proficien|capabilit/.test(lowerMessage) ||
      /what.*language|what.*framework|what.*tool|programming.*language|know.*about/.test(lowerMessage) ||
      /good.*at|specialize|expert.*in|work.*with|use.*tech|familiar.*with/.test(lowerMessage) ||
      /frontend|backend|full.*stack|database|mobile/.test(lowerMessage)) {
    return 'skills';
  }

  // Vague or unclear questions - catch-all for short/unclear input (IMPROVED)
  // Only ask for clarification if it's truly vague, not just short
  if (lowerMessage.length < 10 && lowerMessage.split(' ').length <= 2 &&
      !/^(hi|hello|hey|thanks|ok|yes|no|sure|price|cost|hire|work|help|demo)/.test(lowerMessage) &&
      !/\b(fail|age|old|about|skill|project|experience|nyra|contact|available)\b/.test(lowerMessage)) {
    return 'clarification';
  }

  // Jokes and fun
  if (/joke|funny|humor|laugh|entertain|fun\s*fact|tell\s*me\s*something\s*fun/.test(lowerMessage)) {
    return 'joke';
  }

  // Portfolio compliments
  if (/(nice|great|beautiful|amazing|awesome|cool|impressive|love).*\s*(site|website|portfolio|design)/.test(lowerMessage) ||
      /(site|website|portfolio|design).*\s*(nice|great|beautiful|amazing|awesome|cool|impressive)/.test(lowerMessage)) {
    return 'portfolioCompliment';
  }

  // Weaknesses or improvement areas
  if (/weakness|weak\s*point|not\s*good\s*at|struggle\s*with|improving|working\s*on/.test(lowerMessage)) {
    return 'weaknesses';
  }

  // What NOT to hire for
  if (/not\s*good\s*for|shouldn't\s*hire|when\s*not\s*to|bad\s*at|can't\s*do|don't\s*do/.test(lowerMessage)) {
    return 'notGoodFor';
  }

  // Feelings/How are you
  if (/how\s*(are|r)\s*(you|u)|how('s|s)\s*it\s*going|what('s|s)\s*up|how\s*do\s*you\s*feel/.test(lowerMessage)) {
    return 'feelings';
  }

  // Boss/Creator questions
  if (/boss|creator|made\s*you|built\s*you|created\s*you|your\s*(owner|master|developer)|who\s*made/.test(lowerMessage)) {
    return 'creator';
  }

  // Who are you / Identity
  if (/who\s*(are|r)\s*you|what\s*(are|r)\s*you|your\s*name|introduce\s*yourself/.test(lowerMessage)) {
    return 'identity';
  }

  // What can you do / Capabilities
  if (/what\s*can\s*you\s*do|your\s*capabilit|help\s*me\s*with|what\s*do\s*you\s*know/.test(lowerMessage)) {
    return 'capabilities';
  }

  // Why hire / Convince me
  if (/why\s*(should|would)\s*i\s*hire|convince\s*me|what\s*makes\s*him\s*special|why\s*him|stand\s*out/.test(lowerMessage)) {
    return 'whyHire';
  }

  // Education
  if (/education|degree|university|college|school|study|studied|qualification|certified/.test(lowerMessage)) {
    return 'education';
  }

  // Location/Remote
  if (/where\s*(is|does)\s*he\s*(live|located|based)|location|remote|on-?site|timezone|country/.test(lowerMessage)) {
    return 'location';
  }

  // Pricing/Rates (enhanced with natural money questions)
  if (/price|pricing|rate|cost|charge|fee|budget|how\s*much|expensive|affordable/.test(lowerMessage) ||
      /what.*cost|pay|payment|quote|estimate|dollar|money|\$|cheap/.test(lowerMessage) ||
      /can.*afford|within.*budget|price.*range/.test(lowerMessage)) {
    return 'pricing';
  }

  // Timeline
  if (/timeline|deadline|when\s*can|how\s*long|turnaround|start\s*date|delivery/.test(lowerMessage)) {
    return 'timeline';
  }

  // Languages spoken
  if (/language\s*speak|speak\s*english|communication|fluent/.test(lowerMessage)) {
    return 'languages';
  }

  // Personal/Hobbies
  if (/hobby|hobbies|personal|free\s*time|outside\s*work|interest|passion/.test(lowerMessage)) {
    return 'personal';
  }

  // Strengths
  if (/strength|strong\s*point|good\s*at|excel|best\s*quality/.test(lowerMessage)) {
    return 'strengths';
  }

  // Contact (enhanced with more natural variations)
  if (/contact|reach|email|phone|call|connect|get\s*in\s*touch|message\s*him/.test(lowerMessage) ||
      /how.*reach|how.*contact|talk.*him|speak.*him|reach\s*out/.test(lowerMessage) ||
      /want.*hire|want.*work|interested.*work|discuss.*project/.test(lowerMessage) ||
      /let.*talk|get.*hold|schedule.*call|book.*call/.test(lowerMessage)) {
    return 'contact';
  }

  // Resume/CV
  if (/resume|cv|curriculum|download|portfolio\s*document/.test(lowerMessage)) {
    return 'resume';
  }

  // Startup/Nyra
  if (/nyra|startup|found|company|business|entrepreneur/.test(lowerMessage)) {
    return 'startup';
  }

  // Experience/Work history (enhanced with natural variations)
  if (/experience|work\s*history|career|job|employ|where\s*(has|did)\s*he\s*work|previous|role/.test(lowerMessage) ||
      /\bwork\b|worked|working|background|resume|cv|qualification/.test(lowerMessage) ||
      /tell.*experience|about.*experience|professional.*background|work.*background/.test(lowerMessage) ||
      /how\s*long.*work|years.*experience|how\s*much.*experience/.test(lowerMessage)) {
    return 'experience';
  }

  // Availability/Hiring (enhanced with natural hiring questions)
  if (/available|hire|hiring|open\s*to|looking\s*for|freelance|contract|opportunity|work\s*with/.test(lowerMessage) ||
      /can.*hire|can.*work|free|busy|taking.*project|accepting.*work/.test(lowerMessage) ||
      /start.*project|when.*start|ready.*start/.test(lowerMessage)) {
    return 'availability';
  }

  // Tech stack specific
  if (/react|next\.?js|node|\.net|python|java|typescript|postgres|docker|tailwind/.test(lowerMessage)) {
    return 'techStack';
  }

  // AI/ML work
  if (/\bai\b|ml|machine\s*learning|llm|nlp|evaluation|artificial\s*intelligence|deep\s*learning|model/.test(lowerMessage)) {
    return 'aiWork';
  }

  // Projects - specific (enhanced with natural language)
  if (/nubenta|nyra\s*connect|invotrek|buildtrack|smarted|bulkpay|bus\s*tracker|rewardify|rental|project/.test(lowerMessage) ||
      /what.*built|show.*work|see.*work|your.*work|past.*work|previous.*work/.test(lowerMessage) ||
      /demo|example|sample.*code|portfolio|work\s*sample|showcase/.test(lowerMessage) ||
      /tell.*project|about.*project|project.*work/.test(lowerMessage)) {
    return 'projects';
  }

  // Inspiration & motivation - enhanced understanding
  if (/what\s*drives|what\s*motivates|why.*code|inspiration|motivated?\s*by|passion|drive/.test(lowerMessage) ||
      /why.*build|what\s*inspires|mission|purpose|goal|legacy|why.*create/.test(lowerMessage) ||
      /what.*make.*tick|why.*work\s*hard|dedication|commitment/.test(lowerMessage)) {
    return 'inspiration';
  }

  // Nyra vision - enhanced understanding
  if (/nyra|what.*nyra|tell.*nyra|about.*nyra|nyra.*vision|nyra.*goal/.test(lowerMessage) ||
      /startup.*vision|what.*building|flagship.*product|main.*project/.test(lowerMessage) ||
      /translation.*app|productivity.*platform|meeting.*tool/.test(lowerMessage)) {
    return 'nyraVision';
  }

  // Goodbye (enhanced with more natural farewells)
  if (/bye|goodbye|see\s*you|take\s*care|later|gotta\s*go|leaving/.test(lowerMessage) ||
      /good\s*night|catch\s*you|talk\s*later|peace|cya|ttyl/.test(lowerMessage)) {
    return 'goodbye';
  }

  // Thanks (enhanced with gratitude expressions)
  if (/thank|thanks|appreciate|helpful|great\s*help/.test(lowerMessage) ||
      /awesome|perfect|excellent|amazing|you're\s*good|good\s*bot/.test(lowerMessage)) {
    return 'thanks';
  }

  // Catch questions about capabilities before unknown
  if (/what.*do|what.*know|can\s*you|are\s*you|tell\s*me/.test(lowerMessage)) {
    return 'capabilities';
  }

  return 'unknown';
}

// UNIVERSAL REQUEST HANDLER - AI understands action requests (summarize, explain, simplify, etc.)
function handleUniversalRequest(message: string, context?: ConversationContext): string | null {
  const lowerMessage = message.toLowerCase();

  // Get the last assistant message from context
  const lastAssistantMessage = context?.conversationHistory
    ?.slice()
    .reverse()
    .find(msg => msg.role === 'assistant');

  if (!lastAssistantMessage) return null;

  const content = lastAssistantMessage.content;

  // REQUEST 1: Summarize / TLDR / Short version
  if (/(summarize|summary|tldr|tl;dr|short|brief|quick|condensed|in short|main point)/i.test(message)) {
    // Extract key points from last response
    const lines = content.split('\n').filter(line => line.trim());

    // Find bullet points or key statements
    const keyPoints = lines.filter(line =>
      line.includes('•') || line.includes('✓') || line.includes('→') ||
      line.match(/^\d+\./) || line.includes('**') || line.startsWith('-')
    );

    if (keyPoints.length > 0) {
      const summary = keyPoints
        .slice(0, 4)
        .map(point => point.replace(/[•✓→\-]/g, '').trim())
        .map(point => point.replace(/\*\*/g, ''))
        .filter(point => point.length > 10)
        .join('\n\n');

      return `**Quick Summary:**\n\n${summary}\n\nNeed more details on any part?`;
    }

    // Fallback: Extract first few sentences
    const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
    const firstFew = sentences.slice(0, 3).join(' ');
    return `**In Short:**\n\n${firstFew}\n\nWant the full explanation?`;
  }

  // REQUEST 2: Explain / Elaborate / More details
  if (/(explain|elaborate|more detail|tell me more|expand|go deeper)/i.test(message)) {
    // Check if the last response was already detailed
    if (content.length > 500) {
      return `I gave you a pretty detailed answer! Here's what I covered:\n\n${content.substring(0, 300)}...\n\nIs there a specific part you'd like me to expand on?`;
    }

    return `I'd love to elaborate! What specific aspect of my previous answer would you like me to dive deeper into?`;
  }

  // REQUEST 3: Simplify / ELI5 / Make it simpler
  if (/(simplify|simpler|eli5|explain like|easy|basic|plain english)/i.test(message)) {
    // Extract core message without formatting
    const plainText = content
      .replace(/\*\*/g, '')
      .replace(/[•✓→\-]/g, '')
      .split('\n')
      .filter(line => line.trim() && !line.includes(':') && line.length > 20)
      .slice(0, 3)
      .join(' ');

    return `**Simple Version:**\n\n${plainText}\n\nThat's the essence of it! Want me to clarify anything?`;
  }

  // REQUEST 4: Example / Show me
  if (/(example|instance|show me|demonstrate|sample)/i.test(message)) {
    // Provide an example based on the topic
    const topic = lastAssistantMessage.intent || 'general';

    if (topic.includes('skill') || topic.includes('tech')) {
      return `**Concrete Example:**\n\nLet's say you need a **SaaS platform** like Nyra. Muhammad would:\n\n1. Design the modular architecture (separate auth, billing, analytics modules)\n2. Build the backend with .NET + PostgreSQL for scalability\n3. Create the React frontend with real-time updates\n4. Integrate AI features (like Nyra's live transcription)\n5. Deploy with proper CI/CD and monitoring\n\nThat's how he turns concepts into production-ready software.`;
    }

    return `What specific type of example would help? I can show you project examples, code approaches, or real-world applications.`;
  }

  // REQUEST 5: Compare / Difference
  if (/(compare|difference|versus|vs|different from)/i.test(message)) {
    return `To help you compare, could you specify what you'd like to compare? For example:\n\n• Muhammad's skills vs typical developers?\n• Different projects he's built?\n• Technologies he uses?\n\nLet me know and I'll break it down!`;
  }

  return null; // Not a universal request
}

// KNOWLEDGE SYNTHESIS ENGINE - AI generates NEW answers by combining facts
function synthesizeAnswerFromKnowledge(question: string, concepts: string[]): string | null {
  const lowerQuestion = question.toLowerCase();

  // SYNTHESIS 1: Interests after/beyond tech
  if (/(interest|hobby|hobbies|passion|outside|beyond|after|besides).*tech/i.test(question) ||
      /(what.*do|enjoy|like).*\b(outside|beyond|besides|after).*\b(work|coding|tech)/i.test(question)) {

    // SYNTHESIZE from personalInfo.personalInterests + personality
    return `Beyond tech, Muhammad's interests reveal a **strategically-minded individual** focused on long-term impact:\n\n**Primary Drive:**\n${personalInfo.personalInterests.primary} - He doesn't just code for the sake of coding; every project is a step toward leaving a meaningful legacy.\n\n**What He Enjoys:**\n• **Reading** about business strategy and tech trends - staying ahead of the curve\n• **Strategic planning** - thinking 5-10 years ahead\n• **Continuous learning** - always expanding his knowledge base\n• **Problem-solving activities** and strategic games - keeps his mind sharp\n\n**Core Values:**\n${personalInfo.personalInterests.values.map(v => `✓ ${v}`).join('\n')}\n\n**Lifestyle:**\n${personalInfo.personalInterests.lifestyle}\n\nNotice a pattern? Even his "non-tech" interests are **strategic and goal-oriented**. Muhammad approaches life like he approaches code - with discipline, long-term vision, and a relentless focus on excellence.\n\nHe's not just building software; he's building a **legacy**. Everything he does - from daily coding to reading about business - ties back to his mission of proving that world-class innovation can come from anywhere, including Nigeria.`;
  }

  // SYNTHESIS 2: Personality / Who is he as a person
  if (/(personality|character|person|kind of person|type of person|like as a person)/i.test(question)) {
    // SYNTHESIZE from personality + work ethic + mission
    return `Let me paint a picture of Muhammad as a **person**, not just a developer:\n\n**The Disciplined Obsessive:**\n${personalInfo.personality.workEthic}\n\nThis isn't someone who "tries hard." This is someone who's **obsessed** with his craft. Most people talk about discipline - Muhammad lives it.\n\n**The Mission-Driven Founder:**\n${personalInfo.personality.motivation}\n\nHe's not coding for a paycheck or clout. He's on a **mission**. Every line of code, every project, every hour spent learning - it's all building toward something bigger.\n\n**The Strategic Thinker:**\nMuhammad doesn't just build; he **thinks**. His interests outside tech? Reading about strategy, planning long-term, problem-solving. Even his relaxation is mentally stimulating.\n\n**The Ambitious Realist:**\n${personalInfo.personality.ambition}\n\nBut here's the key - he's not just dreaming. He's **executing**. 30+ projects. 4 years of daily dedication. A startup already in motion. He backs his ambition with action.\n\n**The Value-Driven Builder:**\nCore values: ${personalInfo.personalInterests.values.join(', ')}\n\nThese aren't buzzwords. They shape every decision he makes - from choosing projects to how he markets Nyra.\n\n**In Summary:**\nMuhammad is the rare combination of **technical brilliance, business acumen, relentless work ethic, and missionary zeal**. He's not just building apps - he's proving a point about what's possible when talent meets determination, regardless of geography.`;
  }

  // SYNTHESIS 3: Life balance / work-life
  if (/(work.*life|balance|burnout|rest|relax|free time|spare time)/i.test(question)) {
    // INFER from daily hours + interests
    return `Interesting question! Let's be honest about Muhammad's approach:\n\n**The Reality:**\nWith **${personalInfo.dailyCodingHours} of daily coding** for ${personalInfo.codingYears} years straight, traditional "work-life balance" isn't his current model. But here's the nuance:\n\n**It's Not Burnout - It's Obsession:**\nThere's a difference between grinding yourself to dust and being obsessively passionate. Muhammad falls in the latter camp. When you're building toward a **mission** (youngest Nigerian founder of a global startup), it doesn't feel like "work" in the draining sense.\n\n**How He Recharges:**\n• ${personalInfo.personalInterests.relaxation}\n• Reading about business and tech trends\n• Strategic planning for Nyra's future\n\nNotice: even his downtime is **productive**. He's not vegging out - he's engaging his mind differently.\n\n**The Philosophy:**\nMuhammad's lifestyle is **${personalInfo.personalInterests.lifestyle}**. He's in his **early 20s**, building something meaningful. This is his time to go all-in. Balance might look different in 10 years, but right now? He's maximizing his prime years.\n\n**The Sustainability:**\nIs this sustainable forever? Probably not. But for a mission-driven 22-year-old founder trying to prove something to the world? It's exactly the intensity needed.\n\nHe's trading short-term "balance" for long-term **legacy**.`;
  }

  // SYNTHESIS 4: Motivation / Why does he do this
  if (/(why.*code|what motivates|drives him|why.*build|reason|purpose)/i.test(question) && !lowerQuestion.includes('fail')) {
    // COMBINE motivation + values + ambition
    return `Muhammad's motivation runs **deeper than money or fame**. Here's what truly drives him:\n\n**1. Legacy Over Everything**\n"${personalInfo.personalInterests.primary}"\n\nHe's obsessed with building things that **outlive him**. Not just apps that work today, but products so valuable they're still serving users decades from now.\n\n**2. Proving the Possible**\n${personalInfo.personality.motivation}\n\nThis is personal. Muhammad wants to be living proof that:\n• Excellence isn't limited by geography\n• A kid from Nigeria can build world-class tech\n• African developers can compete globally\n\n**3. The Founder Ambition**\n${personalInfo.personality.ambition}\n\nNot for ego - but to **inspire the next generation**. When a 16-year-old developer in Lagos sees Muhammad succeed, it expands what they believe is possible.\n\n**4. Core Values in Action**\n${personalInfo.personalInterests.values.map(v => `• **${v}**: Drives every decision`).join('\n')}\n\n**The Daily Fuel:**\nEvery morning, Muhammad codes **${personalInfo.dailyCodingHours}** not because he has to, but because he's building toward that vision. Every project, every line of code, every hour of learning - it's a brick in the legacy he's constructing.\n\n**The Beautiful Part:**\nHe's not waiting for permission. He's not waiting to be "ready." He's **building now**, at 22, with 4 years of intensive experience already under his belt.\n\nThat's what makes him different - he's not just talented. He's **mission-obsessed**.`;
  }

  return null; // No synthesis possible
}

// Extract key concepts/entities from user's question for semantic understanding
function extractKeyConceptsFromMessage(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const concepts: string[] = [];

  // Extract named entities (people, places, things)
  const entities = {
    // Personal references
    person: /\b(muhammad|idris|abubakar|he|him|his|developer|engineer|founder|owner)\b/g,
    // Technology terms
    tech: /\b(code|coding|program|software|app|application|website|system|platform|tool|api|database|server|frontend|backend|fullstack|mobile|web|ai|ml|llm)\b/g,
    // Skills/abilities
    skills: /\b(skill|ability|capable|proficient|expert|know|knowledge|experience|qualification|talent)\b/g,
    // Projects/work
    work: /\b(project|build|built|made|created|develop|work|portfolio|product|startup|company|nyra|nubenta)\b/g,
    // Business/hiring
    business: /\b(hire|hiring|available|cost|price|rate|pay|budget|freelance|contract|work|job|employ)\b/g,
    // Time/availability
    time: /\b(when|time|timeline|deadline|available|start|begin|duration|long|quick|fast|slow)\b/g,
    // Quality/comparison
    quality: /\b(good|best|better|quality|reliable|professional|experienced|skilled|talented)\b/g,
    // Questions words
    questions: /\b(what|how|why|where|when|who|can|does|is|are|tell|explain|describe|show)\b/g
  };

  // Extract matches for each category
  for (const [_, regex] of Object.entries(entities)) {
    const matches = lowerMessage.match(regex);
    if (matches) {
      concepts.push(...matches);
    }
  }

  return [...new Set(concepts)]; // Remove duplicates
}

// Semantic reasoning: Try to understand what user is REALLY asking about
function semanticIntentReasoning(message: string, concepts: string[]): string | null {
  const lowerMessage = message.toLowerCase();

  // REASONING: Question about "asking" or "requesting"
  if (/(can i ask|may i ask|is it okay|allowed to ask)/i.test(message)) {
    return 'capabilities'; // They want to know what they can ask
  }

  // REASONING: "can" + tech term = asking about capabilities
  if (/\bcan\b/.test(lowerMessage) && concepts.some(c => ['code', 'build', 'develop', 'create', 'make'].includes(c))) {
    return 'skills';
  }

  // REASONING: Question words + person reference = asking about Muhammad
  if (/(what|who|tell|describe).*\b(muhammad|he|him|developer|engineer)\b/.test(lowerMessage)) {
    if (concepts.includes('skill') || concepts.includes('know')) {
      return 'skills';
    }
    if (concepts.includes('work') || concepts.includes('project')) {
      return 'projects';
    }
    return 'about';
  }

  // REASONING: "I" + action verb = user wants something
  if (/\b(i want|i need|i'm looking|looking for|interested in)\b/.test(lowerMessage)) {
    if (concepts.includes('hire') || concepts.includes('work')) {
      return 'availability';
    }
  }

  // REASONING: Tech term + question = asking about tech skills
  const techTerms = ['react', 'node', 'python', 'java', 'dotnet', 'typescript'];
  if (techTerms.some(tech => lowerMessage.includes(tech))) {
    return 'techStack';
  }

  return null;
}

// Intelligent fallback: construct answer from related info
function constructIntelligentFallback(message: string, concepts: string[]): string {
  const lowerMessage = message.toLowerCase();

  // CASE: Question about asking/requesting
  if (/(can i ask|may i ask|question|request)/i.test(message)) {
    return "Of course! Feel free to ask me anything about Muhammad - his projects, skills, experience, availability, or how to work with him. I'm here to help! What would you like to know?";
  }

  // CASE: Mentions technology but unclear
  if (concepts.some(c => ['code', 'tech', 'software', 'app'].includes(c))) {
    return `Muhammad is a full-stack software engineer with 4 years of experience. He specializes in:\n\n• .NET 8 & Node.js backends\n• React & Next.js frontends\n• AI/ML evaluation\n• Mobile apps (React Native, Swift, Kotlin)\n\nAre you asking about his technical skills, specific projects, or looking to hire him?`;
  }

  // CASE: Business-related but unclear
  if (concepts.some(c => ['hire', 'work', 'cost', 'price'].includes(c))) {
    return "Interested in working with Muhammad? Here's what you should know:\n\n• He's currently available for new projects\n• Rates depend on project scope\n• Works remotely globally\n• Experienced in full-stack, mobile, AI\n\nUse the **Contact Form** to discuss your project. What kind of project do you have in mind?";
  }

  // CASE: Comparative question
  if (/(better|best|top|vs|versus)/i.test(message)) {
    return "Muhammad stands out for:\n\n✅ Unique combo: .NET + React + AI\n✅ Startup founder experience\n✅ 4 years intensive practice\n✅ Competitive pricing\n\nWhat specific comparison interests you?";
  }

  // DEFAULT: Smart unknown with context
  const mainConcept = concepts.find(c => ['skill', 'project', 'work', 'hire', 'tech', 'experience'].includes(c));
  if (mainConcept) {
    return `I can help with ${mainConcept}! Could you be more specific about what you'd like to know? I have detailed info about Muhammad's ${mainConcept === 'skill' ? 'technical skills' : mainConcept}s.`;
  }

  return "I want to give you the best answer! Here's what I can help with:\n\n**Technical:** Skills, tech stack, projects, AI expertise\n**Business:** Availability, pricing, hiring\n**About:** Background, motivation, startup Nyra\n\nWhat interests you?";
}

// Detect user's communication style from their message
function detectCommunicationStyle(message: string): 'formal' | 'casual' | 'technical' | 'brief' {
  const lowerMessage = message.toLowerCase();

  // Brief/direct style (short, no pleasantries)
  if (message.length < 20 && !/(please|thanks|hello|hi)/i.test(message)) {
    return 'brief';
  }

  // Technical style (uses tech terms)
  if (/\b(api|framework|architecture|backend|frontend|database|deployment|ci\/cd|docker|kubernetes)\b/i.test(message)) {
    return 'technical';
  }

  // Casual style (informal language, slang)
  if (/(hey|yo|sup|cool|awesome|dude|bro|lol|btw|gonna|wanna|kinda)/i.test(message)) {
    return 'casual';
  }

  // Default to formal
  return 'formal';
}

// Analyze conversation context to understand implicit meaning
function analyzeConversationContext(message: string, context?: ConversationContext): {
  isFollowUp: boolean;
  impliedIntent?: string;
  needsContextualAnswer: boolean;
} {
  const lowerMessage = message.toLowerCase();

  // Check if it's a follow-up question
  const followUpIndicators = /^(what about|how about|and|also|what else|tell me more|more|elaborate|continue|go on)/i;
  const pronounReferences = /\b(it|that|this|them|those|he|his|him)\b/i;

  const isFollowUp = followUpIndicators.test(message) ||
                     (pronounReferences.test(message) && !!context?.lastIntent);

  // Detect implied questions based on context
  let impliedIntent: string | undefined;

  if (isFollowUp && context?.lastIntent) {
    // If they asked about a project and then say "more", they want more details
    if (/(more|details|elaborate|tell me more)/i.test(message)) {
      impliedIntent = context.lastIntent;
    }

    // If they say "what about [topic]" after discussing something
    if (/what about/i.test(message)) {
      // Extract the new topic
      const match = message.match(/what about (.+)/i);
      if (match) {
        impliedIntent = 'projects'; // Or detect based on the topic mentioned
      }
    }
  }

  // Check if answer needs context from previous conversation
  const needsContextualAnswer = isFollowUp ||
                                 /\b(also|too|as well|additionally)\b/i.test(lowerMessage);

  return { isFollowUp, impliedIntent, needsContextualAnswer };
}

// Infer intent from partial/vague messages using context
function inferIntentFromContext(message: string, context?: ConversationContext): string | null {
  const lowerMessage = message.toLowerCase();

  // If they just say "more" or "tell me more"
  if (/(^more$|^tell me more$|^elaborate$|^continue$|^go on$)/i.test(message)) {
    return context?.lastIntent || null;
  }

  // If they reference "it" or "that" and we know what they're talking about
  if (/^(it|that|this)$/i.test(message)) {
    return context?.lastIntent || null;
  }

  // If they say "yes" after we asked if they want details
  if (/^(yes|yeah|sure|okay|ok|yep|yup)$/i.test(message)) {
    if (context?.followUpContext === 'offered_project_details') {
      return 'projects';
    }
  }

  // If they mention a topic that was discussed before
  if (context?.topicsDiscussed) {
    for (const topic of context.topicsDiscussed) {
      if (lowerMessage.includes(topic)) {
        return topic;
      }
    }
  }

  return null;
}

// Generate contextual bridge to connect to previous conversation
function generateContextualBridge(context?: ConversationContext): string {
  if (!context?.lastIntent) return '';

  const bridges: Record<string, string[]> = {
    projects: [
      "Building on what we discussed about his projects, ",
      "Since you asked about his work, ",
      "Speaking of his projects, "
    ],
    skills: [
      "Related to his technical skills, ",
      "On the tech side, ",
      "To add to that, "
    ],
    experience: [
      "About his professional background, ",
      "Regarding his work experience, ",
      "Speaking of his career, "
    ],
    nyraVision: [
      "More about Nyra, ",
      "Regarding his startup vision, ",
      "Building on Nyra's mission, "
    ]
  };

  const bridgeOptions = bridges[context.lastIntent];
  if (bridgeOptions) {
    return bridgeOptions[Math.floor(Math.random() * bridgeOptions.length)];
  }

  return '';
}

// Adapt response tone to match user's communication style
function adaptResponseTone(response: string, style: 'formal' | 'casual' | 'technical' | 'brief'): string {
  switch (style) {
    case 'brief':
      // Make response more concise - keep only essential info
      const lines = response.split('\n').filter(line => line.trim());
      if (lines.length > 8) {
        // Truncate long responses for brief users
        return lines.slice(0, 6).join('\n') + '\n\nWant more details?';
      }
      return response;

    case 'technical':
      // Technical users appreciate specifics
      // Already technical enough, no change needed
      return response;

    case 'casual':
      // Add casual touches if response is too formal
      if (!/(awesome|cool|great|amazing)/i.test(response.substring(0, 100))) {
        // Already casual enough
      }
      return response;

    default: // formal
      return response;
  }
}

// Get project-specific response
function getProjectResponse(projectName: string): string {
  const project = projectsData[projectName as keyof typeof projectsData];
  if (!project) return '';

  const projectWithLink = project as typeof project & { link?: string };
  return `**${projectName}**\n\n${project.description}\n\n**Role**: ${project.role}\n**Tech Stack**: ${project.tech.join(', ')}\n\n**Key Features**:\n${project.features.map(f => `- ${f}`).join('\n')}\n\n**Status**: ${project.status}${projectWithLink.link ? `\n**Link**: ${projectWithLink.link}` : ''}\n\n${project.impact}`;
}

// Main response generator with contextual intelligence + SEMANTIC REASONING
export function generateResponse(message: string, context?: ConversationContext): string {
  const lowerMessage = message.toLowerCase();

  // 1. DETECT USER'S COMMUNICATION STYLE
  const userStyle = detectCommunicationStyle(message);

  // 2. EXTRACT KEY CONCEPTS from the message (semantic analysis)
  const concepts = extractKeyConceptsFromMessage(message);

  // 3. ANALYZE CONVERSATION CONTEXT (for follow-ups and implicit questions)
  const conversationAnalysis = analyzeConversationContext(message, context);

  // 4. TRY TO DETECT INTENT (pattern matching first)
  let intent = detectIntent(message);

  // 5. IF INTENT IS UNKNOWN, USE SEMANTIC REASONING to figure it out
  if (intent === 'unknown' || intent === 'clarification') {
    // Try semantic reasoning based on concepts
    const semanticIntent = semanticIntentReasoning(message, concepts);
    if (semanticIntent) {
      intent = semanticIntent;
    } else if (context) {
      // Try context-based inference
      const inferredIntent = inferIntentFromContext(message, context);
      if (inferredIntent) {
        intent = inferredIntent;
      }
    }
  }

  // 6. HANDLE CONTEXTUAL FOLLOW-UPS
  if (conversationAnalysis.isFollowUp && conversationAnalysis.impliedIntent) {
    intent = conversationAnalysis.impliedIntent;
  }

  // 7. CHECK FOR UNIVERSAL REQUESTS FIRST (summarize, explain, simplify, etc.)
  // This is HIGHEST PRIORITY - if user wants to process a previous response
  const universalRequestResponse = handleUniversalRequest(message, context);
  if (universalRequestResponse) {
    return adaptResponseTone(universalRequestResponse, userStyle);
  }

  // 8. HANDLE PROJECT-SPECIFIC QUERIES
  if (intent === 'projects' || lowerMessage.includes('project')) {
    // Check for specific project names
    for (const projectName of Object.keys(projectsData)) {
      if (lowerMessage.includes(projectName.toLowerCase())) {
        return getProjectResponse(projectName);
      }
    }

    // General projects overview
    const projectNames = Object.keys(projectsData);
    const projectsResponse = `Muhammad has worked on ${projectNames.length}+ major projects including:\n\n${projectNames.map(name => {
      const p = projectsData[name as keyof typeof projectsData];
      return `**${name}** - ${p.description.split('.')[0]}`;
    }).join('\n\n')}\n\nWould you like details about any specific project?`;

    return adaptResponseTone(projectsResponse, userStyle);
  }

  // 9. TRY KNOWLEDGE SYNTHESIS (AI generates NEW answers by combining facts!)
  let synthesizedAnswer = synthesizeAnswerFromKnowledge(message, concepts);

  // 10. GET BASE RESPONSE FROM PATTERNS or USE INTELLIGENT FALLBACK
  let response: string;

  if (synthesizedAnswer) {
    // AI SYNTHESIZED a completely new answer from knowledge base!
    response = synthesizedAnswer;
  } else if (intent === 'unknown') {
    // USE INTELLIGENT FALLBACK - construct answer from concepts
    response = constructIntelligentFallback(message, concepts);
  } else {
    // Use predefined patterns
    const responses = responsePatterns[intent] || responsePatterns.unknown;
    response = responses[Math.floor(Math.random() * responses.length)];
  }

  // 11. ADD CONTEXTUAL BRIDGE if it's a follow-up conversation (skip for synthesized answers)
  if (!synthesizedAnswer && conversationAnalysis.needsContextualAnswer && context?.lastIntent && intent !== 'unknown') {
    const bridge = generateContextualBridge(context);
    if (bridge && intent !== 'greeting' && intent !== 'goodbye') {
      response = bridge + response;
    }
  }

  // 12. ADAPT RESPONSE TONE to match user's communication style
  response = adaptResponseTone(response, userStyle);

  // 13. HANDLE IMPLICIT COMPARISONS (if user asks "vs X" or "compared to Y")
  if (/\bvs\b|\bversus\b|compared to|better than/i.test(message)) {
    // Add comparative context
    if (intent === 'skills') {
      response += "\n\nMuhammad's unique combination of .NET, React, and AI evaluation skills sets him apart in the market.";
    }
  }

  // 14. HANDLE ELABORATION REQUESTS ("tell me more", "elaborate", "more details")
  // Note: This is separate from universal request handler - handles general elaboration
  if (/(tell me more|elaborate|more detail|expand|explain further)/i.test(message) && context?.lastIntent) {
    // Provide deeper answer
    const elaborationNote = "\n\nLet me know if you'd like to dive deeper into any specific aspect!";
    if (!response.includes("Let me know") && !response.includes("Would you like")) {
      response += elaborationNote;
    }
  }

  return response;
}
