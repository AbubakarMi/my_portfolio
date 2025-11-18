// Knowledge Base for Custom AI Agent
// This contains all the information the agent knows about Muhammad

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  type: string;
  role: string;
  targetUsers?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  current: boolean;
}

export interface Skill {
  name: string;
  category: string;
  proficiency: 'expert' | 'advanced' | 'intermediate';
  description: string;
  relatedProjects?: string[];
}

export const profile = {
  name: 'Muhammad Idris Abubakar',
  title: 'Software & AI Evaluation Engineer',
  yearsOfExperience: 4,
  summary: 'Analytical and detail-driven Software & AI Evaluation Engineer with 4+ years of experience building scalable systems, conducting AI evaluation workflows, and designing SaaS applications.',
  education: {
    degree: 'B.Sc. (Hons) Computer Science',
    institution: 'Aliko Dangote University of Science and Technology',
    period: '2020 – 2025',
  },
  availability: {
    status: 'available',
    types: ['freelance', 'full-time', 'contract'],
    remote: true,
    responseTime: '24-48 hours',
  },
  startup: {
    name: 'Nyra',
    role: 'Founder & CEO',
    description: 'AI-powered communication and productivity platform',
    vision: 'Break language barriers and make collaboration effortless',
    features: ['Live translation', 'Transcription', 'Meeting summaries', 'Action points'],
    future: 'Nyra Chat - integrated hub for messaging, groups, and meetings with real-time translation',
  },
  dream: {
    vision: 'To build one of the biggest startups in Africa and the entire world',
    goal: 'Create products that the entire world will use',
    aspiration: 'Become the youngest and most successful startup owner that Africa has ever seen',
    origin: 'Started from a local area with big global ambitions',
    mission: 'Prove that world-changing innovation can come from Africa',
  },
};

export const projects: Project[] = [
  {
    id: 'nyra-connect',
    name: 'Nyra Connect',
    description: 'AI productivity app with journals and insights, currently under active development. Muhammad\'s flagship startup project focused on breaking language barriers. Developed under his startup Nyra where he serves as Founder & CEO.',
    techStack: ['.NET 8', 'React', 'PostgreSQL'],
    features: ['Live translation', 'Transcription', 'Meeting summaries', 'Journal insights'],
    type: 'AI Productivity App',
    role: 'Founder & CEO / Lead Developer',
  },
  {
    id: 'shoplynk',
    name: 'ShopLynk',
    description: 'Multi-platform WhatsApp store builder currently under development. Lets small businesses create mini e-commerce stores from WhatsApp chats. Auto-lists products, manages orders, and collects payments - no coding required.',
    techStack: ['React', 'Node.js', 'React Native', 'PostgreSQL'],
    features: ['WhatsApp integration', 'Auto product listing', 'Order management', 'Payment collection', 'Mobile app'],
    type: 'E-commerce Platform',
    role: 'Founder & Lead Developer',
    targetUsers: 'Small business owners using WhatsApp for business',
  },
  {
    id: 'invotrek',
    name: 'InvoTrek',
    description: 'Multi-tenant SaaS for smart document automation with AI-assisted field detection.',
    techStack: ['Node.js', 'PostgreSQL', 'Google AI'],
    features: ['AI field detection', 'Document processing', 'Multi-tenant architecture', 'Invoice automation'],
    type: 'Document Automation SaaS',
    role: 'Lead Developer',
    targetUsers: 'Businesses automating document workflows',
  },
  {
    id: 'rental-management',
    name: 'Rental Management System',
    description: 'Modern rental platform for houses, apartments, and event centers with secure bookings, payments, reviews, and role-based dashboards for renters, owners, and admins.',
    techStack: ['Node.js', 'Express', 'React', 'TypeScript', 'PostgreSQL'],
    features: ['Property listings', 'Secure bookings', 'Payment integration', 'Reviews system', 'Role-based dashboards'],
    type: 'Property Management Platform',
    role: 'Lead Developer',
    targetUsers: 'Property owners, renters, and event center managers',
  },
  {
    id: 'buildtrack-pro',
    name: 'BuildTrack Pro',
    description: 'Multi-tenant web app for contractors to track construction expenses, material usage, and worker payments.',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    features: ['Expense tracking', 'Budget management', 'Reporting', 'Project tracking'],
    type: 'Construction Management',
    role: 'Lead Developer',
    targetUsers: 'Contractors and construction companies',
  },
  {
    id: 'nubenta-care',
    name: 'Nubenta Care',
    description: 'AI-driven health management system for hospitals with smart consultations and prescription suggestions.',
    techStack: ['Node.js', 'PostgreSQL', 'AI/NLP', 'SendGrid'],
    features: ['Smart consultations', 'Prescription suggestions', 'Patient management', 'AI diagnostics'],
    type: 'Healthcare AI System',
    role: 'Lead Developer',
    targetUsers: 'Hospitals and healthcare providers',
  },
  {
    id: 'bulkpay',
    name: 'BulkPay',
    description: 'Automated salary payment system for companies to manage and disburse salaries efficiently.',
    techStack: ['.NET', 'MVC', 'PostgreSQL'],
    features: ['Automated payroll', 'Employee management', 'Secure disbursement', 'Payment scheduling'],
    type: 'Payroll Management System',
    role: 'Backend Developer',
    targetUsers: 'Companies managing employee salaries',
  },
  {
    id: 'rewardify',
    name: 'Rewardify',
    description: 'Gamification platform that helps businesses increase user engagement with a points-based reward system.',
    techStack: ['Node.js', 'React', 'PostgreSQL'],
    features: ['Points-based rewards', 'User engagement tracking', 'Gamification mechanics', 'Analytics'],
    type: 'Gamification Platform',
    role: 'Lead Developer',
    targetUsers: 'Businesses seeking to boost user engagement',
  },
  {
    id: 'adustech-bus-tracker',
    name: 'Adustech Bus Tracker',
    description: 'Real-time bus booking and tracking platform designed for university students.',
    techStack: ['Node.js', 'Firebase'],
    features: ['Live tracking', 'Booking system', 'Schedule management', 'Real-time updates'],
    type: 'Transportation Platform',
    role: 'Lead Developer',
    targetUsers: 'University students and campus transportation',
  },
  {
    id: 'smarted-erp',
    name: 'SmartEd ERP',
    description: 'Comprehensive school ERP for managing attendance, grades, and payments with role-based security.',
    techStack: ['ASP.NET Core 8', 'PostgreSQL', 'MVC'],
    features: ['Student management', 'Grades tracking', 'Attendance', 'Payment processing'],
    type: 'Education ERP',
    role: 'Lead Developer',
    targetUsers: 'Schools and educational institutions',
  },
  {
    id: 'online-management',
    name: 'Online Management System',
    description: 'General-purpose system for small businesses to track inventory, sales, and customer data.',
    techStack: ['Node.js', 'React', 'PostgreSQL'],
    features: ['Inventory tracking', 'Sales monitoring', 'Customer management', 'Reporting'],
    type: 'Business Management System',
    role: 'Lead Developer',
    targetUsers: 'Small businesses managing operations',
  },
];

export const experiences: Experience[] = [
  {
    company: 'Hubuk Technology Limited',
    role: 'Software Engineer',
    period: 'June 2022 – Present',
    description: 'Designing modular REST APIs and developing automated QA scripts for AI models.',
    achievements: [
      'Designed modular REST APIs with ASP.NET Core 8 & PostgreSQL',
      'Improved system efficiency by 25%',
      'Developed automated QA scripts for AI models',
      'Implemented clean architecture patterns',
    ],
    current: true,
  },
  {
    company: 'Freelance',
    role: 'AI/QA Contributor',
    period: '2024 – Present',
    description: 'Evaluating LLM outputs and authoring test cases for AI companies.',
    achievements: [
      'Evaluated LLM outputs for quality and accuracy',
      'Authored test cases using JSON/YAML formats',
      'Applied metrics like precision and recall',
      'Worked with various AI companies on model evaluation',
    ],
    current: true,
  },
  {
    company: 'FlexiSAF Solutions Limited',
    role: 'Backend Engineering Intern',
    period: 'Sept 2025 – Dec 2025',
    description: 'Assisted in backend development with Java and Spring.',
    achievements: [
      'Assisted in backend development with Java and Spring',
      'Learned enterprise-level development practices',
    ],
    current: false,
  },
  {
    company: 'Torvix AI',
    role: 'Frontend Developer Intern',
    period: 'Nov 2025 – Dec 2025',
    description: 'Built responsive UIs and integrated APIs for AI model visualization.',
    achievements: [
      'Built responsive UIs with modern frameworks',
      'Integrated APIs for AI model visualization',
    ],
    current: false,
  },
];

export const skills: Skill[] = [
  // Programming Languages
  {
    name: 'JavaScript',
    category: 'Programming Languages',
    proficiency: 'expert',
    description: 'Full-stack web development, Node.js backends, React frontends',
    relatedProjects: ['invotrek', 'buildtrack-pro', 'nubenta-care'],
  },
  {
    name: 'TypeScript',
    category: 'Programming Languages',
    proficiency: 'expert',
    description: 'Type-safe JavaScript development, Next.js applications',
    relatedProjects: ['nyra-connect'],
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    proficiency: 'advanced',
    description: 'AI/ML scripts, automation, data processing',
  },
  {
    name: 'Java',
    category: 'Programming Languages',
    proficiency: 'advanced',
    description: 'Enterprise applications, Spring Boot backends',
  },
  {
    name: 'C#',
    category: 'Programming Languages',
    proficiency: 'expert',
    description: '.NET applications, APIs, enterprise systems',
    relatedProjects: ['nyra-connect', 'smarted-erp'],
  },
  {
    name: 'SQL',
    category: 'Programming Languages',
    proficiency: 'expert',
    description: 'Database design, optimization, complex queries',
  },
  // Frontend
  {
    name: 'React',
    category: 'Frontend',
    proficiency: 'expert',
    description: 'Component-based UIs, state management, hooks',
    relatedProjects: ['nyra-connect', 'buildtrack-pro'],
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    proficiency: 'expert',
    description: 'Server-side rendering, API routes, full-stack apps',
  },
  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    proficiency: 'expert',
    description: 'Fast API development, microservices',
    relatedProjects: ['invotrek', 'buildtrack-pro', 'nubenta-care', 'adustech-bus-tracker'],
  },
  {
    name: 'ASP.NET Core',
    category: 'Backend',
    proficiency: 'expert',
    description: 'RESTful APIs, clean architecture',
    relatedProjects: ['nyra-connect', 'smarted-erp'],
  },
  {
    name: 'Express',
    category: 'Backend',
    proficiency: 'advanced',
    description: 'Node.js web framework, REST APIs',
  },
  // Databases
  {
    name: 'PostgreSQL',
    category: 'Databases',
    proficiency: 'expert',
    description: 'Primary database, optimization, complex queries',
    relatedProjects: ['nyra-connect', 'invotrek', 'nubenta-care', 'smarted-erp'],
  },
  {
    name: 'MongoDB',
    category: 'Databases',
    proficiency: 'advanced',
    description: 'Document-based storage, flexible schemas',
  },
  {
    name: 'Firebase',
    category: 'Databases',
    proficiency: 'advanced',
    description: 'Real-time data, mobile backends',
    relatedProjects: ['adustech-bus-tracker'],
  },
  // AI/ML
  {
    name: 'LLM Evaluation',
    category: 'AI/ML',
    proficiency: 'expert',
    description: 'Prompt testing, output quality assessment',
  },
  {
    name: 'NLP Annotation',
    category: 'AI/ML',
    proficiency: 'advanced',
    description: 'Data labeling, model training data',
  },
];

// Helper functions to query the knowledge base
export function findProject(query: string): Project | undefined {
  const lowerQuery = query.toLowerCase();
  return projects.find(p =>
    p.id.includes(lowerQuery) ||
    p.name.toLowerCase().includes(lowerQuery) ||
    p.techStack.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export function findSkillsByCategory(category: string): Skill[] {
  return skills.filter(s => s.category.toLowerCase() === category.toLowerCase());
}

export function findSkill(name: string): Skill | undefined {
  const lowerName = name.toLowerCase();
  return skills.find(s => s.name.toLowerCase().includes(lowerName));
}

export function getCurrentExperience(): Experience[] {
  return experiences.filter(e => e.current);
}

export function getAllTechnologies(): string[] {
  const techs = new Set<string>();
  skills.forEach(s => techs.add(s.name));
  projects.forEach(p => p.techStack.forEach(t => techs.add(t)));
  return Array.from(techs);
}
