// Offline fallback for the portfolio chatbot.
//
// The chatbot answers with the LLM (see src/ai/flows/chat-flow.ts, which is fed
// by src/lib/agent-config.ts). This file only answers when the LLM is
// unavailable, so it is deliberately small: every fact here must match the CV
// and the Experience/Projects sections. Update all three together.

import { MEETING_URL, RESUME_PATH, SITE_URL } from '@/lib/seo';

export interface ConversationContext {
  lastTopic?: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string; intent: string }>;
  userCommunicationStyle?: 'formal' | 'casual' | 'technical' | 'brief';
  lastIntent?: string;
  topicsDiscussed?: string[];
}

type Intent =
  | 'greeting'
  | 'thanks'
  | 'goodbye'
  | 'about'
  | 'current_role'
  | 'experience'
  | 'hubuk'
  | 'bookdirect'
  | 'kredinou'
  | 'bizscan360'
  | 'forge'
  | 'anvil'
  | 'pension'
  | 'sfmp'
  | 'abiiapp'
  | 'vitalink'
  | 'projects'
  | 'skills'
  | 'education'
  | 'resume'
  | 'availability'
  | 'pricing'
  | 'contact'
  | 'location'
  | 'default';

// Order matters: the first matching pattern wins, so specific topics come
// before broad ones like "projects" and "experience".
const intentPatterns: Array<[Intent, RegExp]> = [
  ['thanks', /\b(thanks|thank you|appreciate)\b/],
  ['goodbye', /\b(bye|goodbye|see you|later)\b/],
  ['resume', /\b(resume|cv|curriculum)\b/],
  ['bookdirect', /book\s*direct/],
  ['hubuk', /\bhubuk\b/],
  ['kredinou', /kredi\s*nou/],
  ['bizscan360', /biz\s*scan/],
  ['anvil', /\banvil\b/],
  ['forge', /\bforge\b|startup|founder|found(ed)?\b/],
  ['pension', /pension/],
  ['sfmp', /\bsfmp\b|sterloan|sterling|sustainable finance/],
  ['abiiapp', /abii/],
  ['vitalink', /vitalink|clinex|techserv/],
  ['pricing', /\b(price|pricing|rate|rates|cost|charge|budget|salary)\b/],
  ['availability', /\b(available|availability|hire|hiring|freelance|open to|work with|work together)\b/],
  ['contact', /\b(contact|email|phone|reach|call|meeting|meet|schedule|calendly|whatsapp|linkedin|github|twitter)\b/],
  ['current_role', /\b(current(ly)?|now|these days|present)\b.*\b(work|job|role|doing|employ)|where does he work|what does he do\b/],
  ['education', /\b(education|degree|university|school|study|studied|graduate)\b/],
  ['location', /\b(where|location|based|live|country|city|from)\b/],
  ['skills', /\b(skill|skills|stack|tech|technology|technologies|language|languages|framework|frameworks|tools?)\b|c#|\.net|python|django|react|next\.?js|flutter|laravel|postgres/],
  ['projects', /\b(project|projects|portfolio|built|build|work samples?|apps?)\b/],
  ['experience', /\b(experience|years|career|background|history|worked|jobs?|roles?|employ)/],
  ['about', /\b(who|about|tell me|introduce|muhammad|himself)\b/],
  ['greeting', /^(hi|hello|hey|yo|good (morning|afternoon|evening)|how far|salam|assalam)/],
];

export function detectIntent(message: string): string {
  const text = message.toLowerCase().trim();
  for (const [intent, pattern] of intentPatterns) {
    if (pattern.test(text)) return intent;
  }
  return 'default';
}

const responses: Record<Intent, string> = {
  greeting:
    "Hi! I'm Muhammad's portfolio assistant. Ask me about his experience, projects, skills, or how to get in touch.",
  thanks:
    "You're welcome! Anything else you'd like to know about Muhammad's work?",
  goodbye:
    "Thanks for stopping by! If you'd like to work with Muhammad, the contact form on this page reaches him directly.",
  about:
    "Muhammad Idris Abubakar is a Software Engineer and Mobile App Developer based in Kano, Nigeria, with 5+ years of writing software (since 2020). He works across fintech, healthcare, and government systems with C# .NET, Python, Node.js, Next.js, React, Flutter, Laravel, and PostgreSQL. He is currently a Software Engineer at Book Direct, part-time Lead Developer at Kredinou, and the founder of Forge.",
  current_role:
    "Muhammad's full-time role is Software Engineer at Book Direct (bookdirect.ng), a hotel and shortlet booking platform for Nigeria, which he joined in September 2026. He also supports Kredinou part-time as Lead Developer and is building his own startup, Forge.",
  experience:
    "Muhammad has been writing software for 5+ years. He started teaching himself in 2020, and his real training began when he joined Hubuk Technology in 2021.\n\n- Book Direct: Software Engineer, Sep 2026 to present (full-time)\n- Kredinou: Lead Developer, Feb 2026 to present (part-time)\n- Forge: Founder, Jan 2024 to present\n- Techserv Intelligence: Software Engineer, May to Sep 2026\n- Hubuk Technology: 2021 to Aug 2026, rising from trainee to Full-Stack Developer\n- BizScan360: Lead Developer, Nov 2025 to Mar 2026\n- Internships at FlexiSAF and Torvix AI in 2025",
  hubuk:
    "Muhammad was at Hubuk Technology Limited in Kano from 2021 to August 2026. He joined in 2021 and learned on the job, interned in 2022, became a Junior Backend Developer in 2023, Backend Developer in 2024, and Full-Stack Developer in 2025. There he shipped the Kano State Pension Management System and worked on SFMP for Sterling Bank.",
  bookdirect:
    "Book Direct (bookdirect.ng) is a platform for booking hotels and shortlet apartments across Nigeria, part of the Staylier Group, built with Next.js and Node.js. Muhammad has been a remote Software Engineer there since September 2026, helping build its scalable, clean-architecture backend. It is his current full-time role.",
  kredinou:
    "KrediNou is a cross-border fintech super-app for the Haitian diaspora: multi-currency wallets, instant P2P transfers, remittance, and micro-loans on an auditable double-entry ledger. Muhammad joined as Lead Developer in February 2026, when the existing app was not working and had processed $0. He rebuilt it and took it live; it has since processed and settled over $73,869 and he helped recover over $12,299 in loans. He now supports it part-time.",
  bizscan360:
    "BizScan360 is a business health evaluation platform that turns financial data into a 0-100 health score, with KPI analysis, PDF reports, and dashboards. It has 2,800+ users and is trusted by 500+ businesses. Muhammad built it from the ground up as Lead Developer, from November 2025 until March 2026.",
  forge:
    "Forge is the startup Muhammad founded in January 2024: an AI-powered bulk payment and disbursement platform for African businesses. Its Python AI engine validates and auto-corrects bank account details before disbursing, bringing failure rates close to zero. He started it after cleaning a 30,000-beneficiary disbursement by hand. It is currently pre-launch.",
  anvil:
    "Anvil is a cross-border money transfer app Muhammad is building with Flutter, .NET, and PostgreSQL. Recipients automatically receive funds in their local currency, with no manual conversion step. It is under development.",
  pension:
    "The Kano State Pension Management System is a live pension administration platform managing records for over 50,000 pensioners. Muhammad built it at Hubuk Technology with ASP.NET Core MVC, PostgreSQL, and EF Core, covering enrollment, verification, disbursement tracking, and role-based admin dashboards.",
  sfmp:
    "SFMP, the Sustainable Finance Marketplace, is a renewable-energy structured-finance marketplace built for Sterling Bank. It connects borrowers, financiers, and administrators. Muhammad worked on it as a full-stack developer at Hubuk Technology.",
  abiiapp:
    "AbiiApp is a social super-app combining a social network, AI-powered content moderation, an in-app wallet and marketplace, and a unified social inbox. Muhammad led its development on a Laravel backend as a client project through Infira Technology. It is live on Google Play and the App Store.",
  vitalink:
    "Vitalink is a patient monitoring and vital-signs tracking platform with real-time health data pipelines, part of Techserv Intelligence's Clinex healthcare ecosystem. Muhammad worked on it as a Software Engineer at Techserv from May to September 2026, using C# .NET, React, and PostgreSQL.",
  projects:
    "Some of Muhammad's key projects:\n\n- Kano State Pension Management System: live, 50,000+ pensioners\n- KrediNou: fintech super-app, over $73,869 settled\n- BizScan360: business health platform, 2,800+ users\n- SFMP: structured-finance marketplace for Sterling Bank\n- AbiiApp: social super-app on Google Play and the App Store\n- Forge: his AI payment validation startup\n\nAsk about any of them, or see the Projects section.",
  skills:
    "Muhammad's core stack:\n\n- Languages: C#, Python, JavaScript, PHP, Java, SQL\n- Backend: ASP.NET Core, Node.js/Express, Django, Laravel, EF Core\n- Frontend and mobile: React, Next.js, Flutter\n- Data: PostgreSQL, Firebase\n- Strengths: REST API design, JWT auth and RBAC, system design, AI model integration",
  education:
    "Muhammad holds a B.Sc. (Hons) in Computer Science from Aliko Dangote University of Science and Technology, Kano (2020 to 2025). Most of his engineering skill came from working in industry alongside his studies; he started teaching himself in 2020 and joined Hubuk Technology in 2021.",
  resume:
    `You can download Muhammad's CV here: ${SITE_URL}${RESUME_PATH}`,
  availability:
    "Muhammad works full-time at Book Direct, and is open to conversations about freelance projects and new opportunities. The best way to start is the contact form on this page.",
  pricing:
    "Rates depend on the scope of the project. Send the details through the contact form and Muhammad will reply with a quote.",
  contact:
    `The best way to reach Muhammad is the contact form on this page; he usually replies within 24 to 48 hours. You can also book a call with him here: ${MEETING_URL}`,
  location:
    "Muhammad is based in Kano, Nigeria, and works remotely with teams anywhere.",
  default:
    "I can tell you about Muhammad's experience, projects, skills, or how to contact him. What would you like to know?",
};

export function generateResponse(message: string, context?: ConversationContext): string {
  const intent = detectIntent(message) as Intent;
  if (context) {
    context.lastIntent = intent;
    context.lastTopic = intent;
  }
  return responses[intent];
}
