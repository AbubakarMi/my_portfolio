// Comprehensive AI Knowledge Base for Portfolio Chatbot

export interface ConversationContext {
  lastTopic?: string;
  mentionedProjects?: string[];
  askedAbout?: string[];
}

// Personal information
export const personalInfo = {
  name: "Muhammad Idris Abubakar",
  title: "Software & AI Evaluation Engineer",
  location: "Kano State, Nigeria",
  experience: "4+ years",
  email: "abubakarmi131@gmail.com",
  phone: ["+234 704 252 6971", "+234 706 916 3505"],
  github: "https://github.com/AbubakarMi",
  linkedin: "https://linkedin.com/in/muhammad-idris-abubakar",
  twitter: "https://x.com/AbubakarM93064",
  startup: "Nyra",
  startupMission: "Building world-class productivity software",
  resumeLink: "https://drive.google.com/file/d/1P51URCIY7UCDsIQuxrzlb5FvD4mZxNDp/view?usp=sharing"
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
    "For pricing and rates, it's best to discuss directly with Muhammad as it depends on the project scope, complexity, and timeline. You can reach him at abubakarmi131@gmail.com to discuss your specific needs and get a tailored quote.",
    "Project costs vary based on requirements. Muhammad offers competitive rates and focuses on delivering value. Contact him at abubakarmi131@gmail.com to discuss your project and get a personalized estimate."
  ],

  // Timeline/Availability
  timeline: [
    "Muhammad is currently available for new projects! Timeline depends on scope and complexity. He typically responds within 24-48 hours and can discuss deadlines during initial conversations. Reach out at abubakarmi131@gmail.com to discuss your timeline.",
    "He can start new projects soon! For specific timelines, it's best to discuss your requirements directly. Contact him to get accurate estimates for your project."
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

  // About Muhammad
  about: [
    `Muhammad Idris Abubakar is a Software & AI Evaluation Engineer with ${personalInfo.experience} of experience. He specializes in building scalable SaaS applications and conducting AI evaluation workflows. He's also the founder of ${personalInfo.startup}, focused on ${personalInfo.startupMission}. Based in ${personalInfo.location}, he's passionate about turning complex problems into high-impact technology.`,
  ],

  // Skills overview
  skills: [
    "Muhammad has a diverse skill set spanning multiple domains:\n\n**AI & Testing**: LLM Evaluation, QA Design, NLP Annotation\n**Languages**: Python, Java, C#, TypeScript\n**Backend**: .NET 8, Node.js, PostgreSQL\n**Frontend**: React, Next.js, Tailwind CSS\n**DevOps**: Docker, Git, SendGrid\n\nWant me to dive deeper into any specific area?"
  ],

  // Contact info
  contact: [
    `You can reach Muhammad through:\n\n**Email**: ${personalInfo.email}\n**Phone**: ${personalInfo.phone.join(" or ")}\n**GitHub**: ${personalInfo.github}\n**LinkedIn**: ${personalInfo.linkedin}\n\nHe typically responds within 24-48 hours. Would you like to know anything else?`
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
    "Muhammad is always open to interesting opportunities! Whether it's a full-time role, freelance project, or collaboration, he'd love to hear about it. You can reach him at abubakarmi131@gmail.com or through the contact form on this site. What kind of project do you have in mind?",
    "Great question! Muhammad is available for:\n- Full-time positions\n- Contract/Freelance work\n- Technical consulting\n- AI evaluation projects\n\nWould you like to discuss a potential opportunity?"
  ],

  // Technologies
  techStack: [
    "Muhammad's core tech stack includes:\n\n**Primary Languages**: TypeScript, C#, Python, Java\n**Backend**: .NET 8, Node.js, Express\n**Frontend**: React, Next.js, Tailwind CSS\n**Databases**: PostgreSQL, Firebase\n**AI/ML**: LLM evaluation, NLP, Google AI\n**DevOps**: Docker, Git, CI/CD\n\nHe's comfortable working across the full stack and specializes in building scalable, maintainable systems."
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
  ]
};

// Pattern matching for intent detection
export function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|greetings|howdy|yo|sup|hola|good\s*(morning|afternoon|evening))/.test(lowerMessage)) {
    return 'greeting';
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

  // Pricing/Rates
  if (/price|pricing|rate|cost|charge|fee|budget|how\s*much|expensive|affordable/.test(lowerMessage)) {
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

  // About Muhammad
  if (/about\s*(him|muhammad|idris)|who\s*is\s*(he|muhammad)|tell\s*me\s*about\s*(him|muhammad)|background/.test(lowerMessage)) {
    return 'about';
  }

  // Skills
  if (/skill|technolog|tech\s*stack|what\s*(can|does)\s*he\s*(do|know)|expertise|proficien|capabilit/.test(lowerMessage)) {
    return 'skills';
  }

  // Contact
  if (/contact|reach|email|phone|call|connect|get\s*in\s*touch|message\s*him/.test(lowerMessage)) {
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

  // Experience/Work history
  if (/experience|work\s*history|career|job|employ|where\s*(has|did)\s*he\s*work|previous|role/.test(lowerMessage)) {
    return 'experience';
  }

  // Availability/Hiring
  if (/available|hire|hiring|open\s*to|looking\s*for|freelance|contract|opportunity|work\s*with/.test(lowerMessage)) {
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

  // Projects - specific
  if (/nubenta|nyra\s*connect|invotrek|buildtrack|smarted|bulkpay|bus\s*tracker|rewardify|rental|project/.test(lowerMessage)) {
    return 'projects';
  }

  // Goodbye
  if (/bye|goodbye|see\s*you|take\s*care|later|gotta\s*go|leaving/.test(lowerMessage)) {
    return 'goodbye';
  }

  // Thanks
  if (/thank|thanks|appreciate|helpful|great\s*help/.test(lowerMessage)) {
    return 'thanks';
  }

  return 'unknown';
}

// Get project-specific response
function getProjectResponse(projectName: string): string {
  const project = projectsData[projectName as keyof typeof projectsData];
  if (!project) return '';

  return `**${projectName}**\n\n${project.description}\n\n**Role**: ${project.role}\n**Tech Stack**: ${project.tech.join(', ')}\n\n**Key Features**:\n${project.features.map(f => `- ${f}`).join('\n')}\n\n**Status**: ${project.status}${project.link ? `\n**Link**: ${project.link}` : ''}\n\n${project.impact}`;
}

// Main response generator
export function generateResponse(message: string, context?: ConversationContext): string {
  const intent = detectIntent(message);
  const lowerMessage = message.toLowerCase();

  // Handle project-specific queries
  if (intent === 'projects' || lowerMessage.includes('project')) {
    // Check for specific project names
    for (const projectName of Object.keys(projectsData)) {
      if (lowerMessage.includes(projectName.toLowerCase())) {
        return getProjectResponse(projectName);
      }
    }

    // General projects overview
    const projectNames = Object.keys(projectsData);
    return `Muhammad has worked on ${projectNames.length}+ major projects including:\n\n${projectNames.map(name => {
      const p = projectsData[name as keyof typeof projectsData];
      return `**${name}** - ${p.description.split('.')[0]}`;
    }).join('\n\n')}\n\nWould you like details about any specific project?`;
  }

  // Get response from patterns
  const responses = responsePatterns[intent] || responsePatterns.unknown;
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  return randomResponse;
}

// Export types
export type { ConversationContext };
