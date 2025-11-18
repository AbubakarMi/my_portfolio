// Response Generator for Custom AI Agent
// Generates intelligent responses based on intent and knowledge base

import {
  profile,
  projects,
  experiences,
  skills,
  findProject,
  findSkill,
  findSkillsByCategory,
  getCurrentExperience,
} from './knowledge-base';
import { IntentResult, isQuestion, getContextHints } from './intent-engine';

export interface GeneratedResponse {
  text: string;
  actions?: Array<{
    type: string;
    payload?: Record<string, string>;
    label: string;
  }>;
  suggestions?: string[];
}

// Response templates for variety and personality
const greetingResponses = [
  `Hello! 👋 I'm Muhammad's AI assistant. I know everything about his work - from the React apps he's built to his AI startup Nyra. What catches your interest?`,
  `Hey there! Welcome to Muhammad's portfolio. I'm here to give you the inside scoop on his projects, skills, and what he's working on. Fire away with any questions!`,
  `Hi! Great to have you here. Whether you're curious about Muhammad's tech stack, want to see his projects, or thinking about working with him - I've got you covered. What would you like to explore?`,
  `Welcome! I'm Muhammad's digital assistant. Fun fact: he built me from scratch! I can tell you about his 6 major projects, his 4+ years of experience, or his startup Nyra. What sounds interesting?`,
];

const farewellResponses = [
  `Goodbye! It was great chatting with you. If you want to work with Muhammad, he's just a contact form away - and he responds fast! 🚀`,
  `Take care! Remember, Muhammad is available for freelance and full-time work. Don't be a stranger - reach out anytime!`,
  `See you around! If any project ideas come to mind later, Muhammad would love to hear about them. The contact form is always open!`,
];

const thanksResponses = [
  `You're welcome! 😊 Anything else you'd like to know? I could tell you about his coolest project or his tech stack...`,
  `Happy to help! If you're impressed so far, wait until you see his projects in action. Want me to tell you about any specific one?`,
  `Glad I could help! By the way, if you're thinking of working with Muhammad, he's currently available and always excited about new challenges.`,
  `My pleasure! Feel free to ask more - I love talking about Muhammad's work. Did you know he improved system efficiency by 25% at his current job?`,
];

// Fun facts to sprinkle in responses
const funFacts = [
  `Fun fact: Muhammad's startup Nyra can translate conversations in real-time!`,
  `Did you know? Muhammad has built 6 production-ready applications across different industries.`,
  `Here's something cool: Muhammad evaluates AI models for quality - he literally tests other AIs!`,
  `Interesting tidbit: Muhammad improved his company's system efficiency by 25% with his API designs.`,
  `Quick fact: Muhammad is building Nyra to break language barriers globally - from Africa to the world!`,
];

// Helper to pick random response
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper for handling specific "can you" or "do you" questions
function handleCanYouQuestion(message: string): GeneratedResponse | null {
  const lowerMessage = message.toLowerCase();

  // "Can you build X" questions
  if (/can\s*(you|he)\s*build/i.test(lowerMessage)) {
    return {
      text: `Yes! Muhammad can build web applications, mobile backends, SaaS platforms, and AI-integrated systems. He specializes in React/Next.js frontends, Node.js/.NET backends, and PostgreSQL databases. What kind of project do you have in mind?`,
      actions: [{ type: 'open_contact', label: 'Discuss Project' }],
      suggestions: ['What technologies does he use?', 'Show me his projects'],
    };
  }

  // "Do you have experience with X"
  if (/do\s*(you|he)\s*have\s*experience/i.test(lowerMessage)) {
    const expertSkillsList = skills.filter(s => s.proficiency === 'expert').map(s => s.name).slice(0, 5).join(', ');
    return {
      text: `Muhammad has ${profile.yearsOfExperience}+ years of professional experience. His expertise includes ${expertSkillsList}. He's worked on AI systems, SaaS platforms, and enterprise applications. What specific technology are you asking about?`,
      suggestions: ['What about React?', 'Does he know Python?', 'What databases?'],
    };
  }

  return null;
}

// Generate response based on intent
export function generateResponse(intent: IntentResult, message: string): GeneratedResponse {
  const hints = getContextHints(message);

  // Check for special question patterns first
  const canYouResponse = handleCanYouQuestion(message);
  if (canYouResponse && intent.confidence < 50) {
    return canYouResponse;
  }

  switch (intent.intent) {
    case 'greeting':
      return {
        text: pickRandom(greetingResponses),
        suggestions: ['What projects have you built?', 'What technologies do you use?', 'Are you available for hire?'],
      };

    case 'farewell':
      return {
        text: pickRandom(farewellResponses),
        actions: [{ type: 'open_contact', label: 'Contact Muhammad' }],
      };

    case 'thanks':
      return {
        text: pickRandom(thanksResponses),
      };

    case 'capabilities':
      return {
        text: `I'm pretty knowledgeable! 🧠 I can tell you about Muhammad's tech stack (he's an expert in React, Node.js, .NET, and Python), walk you through his 6 major projects, share his work history, or help you get in touch. I even know fun facts about his startup Nyra! What sounds interesting?`,
        suggestions: ['Show me his best projects', 'What makes him unique?', 'Is he available to hire?'],
      };

    case 'about':
      return {
        text: `Muhammad is a ${profile.title} with ${profile.yearsOfExperience}+ years of hands-on experience. But here's what makes him stand out: he's not just a coder - he's a founder! He built Nyra, an AI platform that breaks language barriers. By day, he's at Hubuk Technology Limited designing REST APIs that improved efficiency by 25%. By night, he's evaluating AI models and building his startup. Pretty impressive, right?`,
        actions: [{ type: 'scroll_to_section', payload: { section: 'about' }, label: 'View About Section' }],
        suggestions: ['Tell me about Nyra', 'What projects has he built?', 'What are his top skills?'],
      };

    case 'skills':
      return generateSkillsResponse(intent, hints);

    case 'specific_skill':
      return generateSpecificSkillResponse(intent);

    case 'projects':
      return generateProjectsResponse(hints);

    case 'specific_project':
      return generateSpecificProjectResponse(intent);

    case 'experience':
      return generateExperienceResponse();

    case 'education':
      return {
        text: `🎓 Muhammad holds a ${profile.education.degree} from ${profile.education.institution} (${profile.education.period}). But here's the thing - he didn't wait to graduate to start building! He's been coding professionally since 2022, so his ${profile.yearsOfExperience}+ years of hands-on experience complement his academic foundation perfectly. Theory meets practice!`,
        suggestions: ['What about work experience?', 'What technologies does he use?', 'Show me his projects'],
      };

    case 'startup':
      return {
        text: `Ah, Nyra - this is Muhammad's passion project! 🌍 He founded it to break language barriers globally. Imagine: real-time translation during meetings, instant transcription, and AI-generated summaries. It's built with .NET 8, React, and PostgreSQL. The vision? Making Nyra the go-to platform for global collaboration - built from Africa for the world. The future roadmap includes Nyra Chat for messaging with real-time translation!`,
        actions: [{ type: 'show_project', payload: { projectId: 'nyra-connect' }, label: 'View Nyra Connect' }],
        suggestions: ['What other projects has he built?', 'How can I contact him about Nyra?'],
      };

    case 'availability':
      return {
        text: `Great news - Muhammad is actively looking for new opportunities! 🎯 He's open to freelance projects, full-time roles, and contract work. He works remotely and is pretty responsive - typically within ${profile.availability.responseTime}. Whether you need a React frontend, a .NET backend, or a full AI-integrated system, he's ready to dive in. Want to discuss your project?`,
        actions: [{ type: 'open_contact', label: 'Start a Conversation' }],
        suggestions: ['What are his rates?', 'What can he build?', 'Show me his work'],
      };

    case 'contact':
      return {
        text: `Ready to connect? 📬 Just use the contact form below - Muhammad checks it regularly and typically responds within ${profile.availability.responseTime}. Pro tip: include details about your project and he'll come back with thoughtful ideas. He's currently available for ${profile.availability.types.join(', ')} work and loves interesting challenges!`,
        actions: [{ type: 'open_contact', label: 'Open Contact Form' }],
        suggestions: ['Is he available?', 'What can he build?'],
      };

    case 'pricing':
      return {
        text: `Muhammad's rates are flexible and depend on what you need - project scope, complexity, timeline, and tech stack all factor in. He's worked on everything from simple web apps to complex AI systems, so he can tailor a quote to your budget. Best way to get a number? Drop your project details in the contact form and he'll get back to you within ${profile.availability.responseTime} with ideas and pricing!`,
        actions: [{ type: 'open_contact', label: 'Get a Quote' }],
        suggestions: ['What can he build?', 'Show me his projects', 'Is he available now?'],
      };

    case 'off_topic':
    case 'unknown':
    default:
      return generateUnknownResponse(message);
  }
}

function generateSkillsResponse(intent: IntentResult, hints: string[]): GeneratedResponse {
  if (intent.entities.category) {
    const categorySkills = findSkillsByCategory(intent.entities.category);
    if (categorySkills.length > 0) {
      const skillNames = categorySkills.map(s => s.name).join(', ');
      const expertCount = categorySkills.filter(s => s.proficiency === 'expert').length;
      return {
        text: `For ${intent.entities.category}, Muhammad works with: ${skillNames}. ${expertCount > 0 ? `He has expert-level mastery in ${expertCount} of these! 💪` : ''} Want to see these skills in action? Check out his projects!`,
        actions: [{ type: 'scroll_to_section', payload: { section: 'skills' }, label: 'View All Skills' }],
        suggestions: ['Show me projects using these', 'What other technologies does he know?'],
      };
    }
  }

  // General skills response
  const expertSkills = skills.filter(s => s.proficiency === 'expert').map(s => s.name);
  const topSkills = expertSkills.slice(0, 6).join(', ');

  const skillResponses = [
    `Muhammad's tech arsenal is pretty impressive! 🛠️ His core technologies include ${topSkills}. He's a true full-stack developer - equally comfortable building sleek React frontends or robust .NET backends. Plus, he tests AI models for a living, so he knows what makes good AI tick!`,
    `Here's what Muhammad brings to the table: ${topSkills}. 🎯 He's not just a coder - he architected APIs that improved system efficiency by 25%! His sweet spot is full-stack development with PostgreSQL as his go-to database.`,
    `Tech-wise, Muhammad is stacked! His expertise includes ${topSkills}. 💻 What sets him apart? He doesn't just use these technologies - he evaluates AI models and understands the bigger picture of building intelligent systems.`,
  ];

  return {
    text: pickRandom(skillResponses),
    actions: [{ type: 'scroll_to_section', payload: { section: 'skills' }, label: 'View All Skills' }],
    suggestions: ['Tell me about React', 'What databases do you use?', 'Show me projects'],
  };
}

function generateSpecificSkillResponse(intent: IntentResult): GeneratedResponse {
  const skillName = intent.entities.skill || intent.entities.technology;
  if (!skillName) {
    return generateSkillsResponse(intent, []);
  }

  const skill = findSkill(skillName);
  if (skill) {
    const proficiencyEmoji = skill.proficiency === 'expert' ? '🏆' : skill.proficiency === 'advanced' ? '⭐' : '✅';

    let response = `${proficiencyEmoji} ${skill.name}? Absolutely! ${skill.description}.`;

    if (skill.proficiency === 'expert') {
      response += ` This is one of Muhammad's strongest skills - expert-level mastery right here!`;
    } else if (skill.proficiency === 'advanced') {
      response += ` He's got advanced proficiency in this and uses it regularly.`;
    }

    const actions: GeneratedResponse['actions'] = [];
    const suggestions: string[] = [];

    if (skill.relatedProjects && skill.relatedProjects.length > 0) {
      const projectId = skill.relatedProjects[0];
      const project = findProject(projectId);
      if (project) {
        response += ` Want proof? Check out ${project.name} - it's built with ${skill.name}!`;
        actions.push({ type: 'show_project', payload: { projectId }, label: `View ${project.name}` });
      }
    }

    suggestions.push('What other technologies does he use?', 'Show me all projects');

    return { text: response, actions, suggestions };
  }

  // Skill not found
  return {
    text: `Hmm, I don't have specific info about that technology. But Muhammad's toolkit is pretty versatile - he works with React, Node.js, ASP.NET Core, PostgreSQL, Python, and Java. Any of these interest you? 🤔`,
    suggestions: ['What technologies does he use?', 'Show me his projects'],
  };
}

function generateProjectsResponse(hints: string[]): GeneratedResponse {
  if (hints.includes('wants_highlights')) {
    const topProjects = projects.slice(0, 3);
    const projectList = topProjects.map(p => `${p.name} (${p.type})`).join(', ');
    return {
      text: `🌟 Muhammad's crown jewels: ${projectList}. Nyra Connect is his baby - it's an AI platform that translates conversations in real-time! Imagine talking to anyone in the world without language barriers. Want the details on any of these?`,
      actions: [{ type: 'scroll_to_section', payload: { section: 'projects' }, label: 'View All Projects' }],
      suggestions: ['Tell me about Nyra Connect', 'What is InvoTrek?'],
    };
  }

  const projectNames = projects.map(p => p.name).join(', ');

  const projectResponses = [
    `Muhammad has built ${projects.length} production-ready projects! 🚀 Here's the lineup: ${projectNames}. From AI translation to healthcare systems to construction management - he's tackled diverse industries. Which one catches your eye?`,
    `Check this out - ${projects.length} complete projects: ${projectNames}. 💼 Each one solves a real problem for real users. My personal favorite? Nyra Connect - it's breaking language barriers! What would you like to explore?`,
    `Muhammad's portfolio spans ${projects.length} major projects: ${projectNames}. 🎨 What's cool is the variety - AI apps, SaaS platforms, healthcare systems, even a bus tracking app! Want me to deep-dive into any of these?`,
  ];

  return {
    text: pickRandom(projectResponses),
    actions: [{ type: 'scroll_to_section', payload: { section: 'projects' }, label: 'View Projects' }],
    suggestions: ['Tell me about Nyra Connect', 'What is BuildTrack Pro?', 'Show me InvoTrek'],
  };
}

function generateSpecificProjectResponse(intent: IntentResult): GeneratedResponse {
  const projectId = intent.entities.project;
  if (!projectId) {
    return generateProjectsResponse([]);
  }

  const project = findProject(projectId);
  if (project) {
    const techStack = project.techStack.join(', ');
    const features = project.features.slice(0, 3).join(', ');

    // Different intros based on project type
    const projectIntros: Record<string, string> = {
      'nyra-connect': `🌍 Nyra Connect is Muhammad's passion project and flagship startup!`,
      'shoplynk': `📱 ShopLynk is Muhammad's latest venture as Founder & Lead Developer - turning WhatsApp into a full e-commerce platform!`,
      'invotrek': `📄 InvoTrek is a clever SaaS solution Muhammad built for businesses drowning in paperwork!`,
      'rental-management': `🏠 The Rental Management System showcases Muhammad's full-stack skills with a complete property booking platform!`,
      'buildtrack-pro': `🏗️ BuildTrack Pro tackles a real pain point for construction companies!`,
      'nubenta-care': `🏥 Nubenta Care is Muhammad's dive into AI-powered healthcare!`,
      'bulkpay': `💰 BulkPay automates payroll - because paying employees shouldn't be complicated!`,
      'rewardify': `🎮 Rewardify brings gamification to businesses - points, rewards, and engagement!`,
      'adustech-bus-tracker': `🚌 Adustech Bus Tracker - because waiting for buses shouldn't be a guessing game!`,
      'smarted-erp': `🎓 SmartEd ERP brings modern tech to education management!`,
      'online-management': `📊 Online Management System helps small businesses stay organized!`,
    };

    const intro = projectIntros[project.id] || `✨ ${project.name} is an impressive ${project.type.toLowerCase()}!`;

    let response = `${intro} ${project.description} Muhammad's role: ${project.role}. Tech stack: ${techStack}. Key features include ${features}.`;

    if (project.targetUsers) {
      response += ` Built for ${project.targetUsers.toLowerCase()}.`;
    }

    // Add a hook to encourage further exploration
    response += ` Pretty cool, right? Want to see the other projects or learn about the tech behind it?`;

    return {
      text: response,
      actions: [{ type: 'show_project', payload: { projectId: project.id }, label: `View ${project.name}` }],
      suggestions: ['What other projects has he built?', 'What technologies does he use?'],
    };
  }

  return generateProjectsResponse([]);
}

function generateExperienceResponse(): GeneratedResponse {
  const currentJobs = getCurrentExperience();
  const mainJob = currentJobs.find(e => e.company === 'Hubuk Technology Limited');

  const experienceResponses = [];

  if (mainJob) {
    experienceResponses.push(
      `💼 Muhammad's main gig: ${mainJob.role} at ${mainJob.company} since June 2022. The highlight? He improved system efficiency by 25% with his API designs - that's the kind of impact he brings! He's designing REST APIs and developing automated QA scripts for AI models.`,
      `🏢 Currently, Muhammad works as a ${mainJob.role} at ${mainJob.company}. Here's the impressive part: he designed APIs that boosted efficiency by 25%! He's also into clean architecture patterns and automated QA for AI - basically making systems smarter and faster.`,
      `📊 At ${mainJob.company}, Muhammad is the guy behind efficient REST APIs and AI quality testing. Since 2022, he's been improving systems - and that 25% efficiency boost he achieved? That's real, measurable impact from his work.`
    );
  }

  let response = pickRandom(experienceResponses);

  const freelance = currentJobs.find(e => e.company === 'Freelance');
  if (freelance) {
    response += ` On the side, he evaluates LLM outputs for AI companies - yes, he literally tests other AIs! 🤖`;
  }

  response += ` Oh, and he's building a startup (${profile.startup.name}) that's tackling global language barriers. The man stays busy!`;

  return {
    text: response,
    actions: [{ type: 'scroll_to_section', payload: { section: 'experience' }, label: 'View Full Experience' }],
    suggestions: ['Tell me about Nyra', 'What projects has he built?', 'What are his skills?'],
  };
}

function generateUnknownResponse(message: string): GeneratedResponse {
  const lowerMessage = message.toLowerCase();

  // Handle common off-topic questions gracefully

  // Weather questions
  if (/\b(weather|temperature|rain|sunny|cold|hot|forecast)\b/.test(lowerMessage)) {
    return {
      text: `I don't have access to weather information, but I'd be happy to tell you about Muhammad's work instead! He's a Software Engineer specializing in React, Node.js, and .NET. Would you like to know about his projects or skills?`,
      suggestions: ['What projects has he built?', 'What are his skills?'],
    };
  }

  // Time/date questions
  if (/\b(time|date|day|today|tomorrow|yesterday|clock)\b/.test(lowerMessage)) {
    return {
      text: `I can't tell you the time, but I can tell you that Muhammad is currently available for new projects! He's a Software Engineer with 4+ years of experience. Want to learn more about his work?`,
      suggestions: ['Is he available for hire?', 'What does he specialize in?'],
    };
  }

  // News/current events
  if (/\b(news|happening|world|politics|sports|game|match)\b/.test(lowerMessage)) {
    return {
      text: `I don't follow the news, but I know a lot about Muhammad's work! He's built projects like Nyra Connect (AI translation app) and InvoTrek (document automation). Would you like to hear more?`,
      suggestions: ['Tell me about Nyra', 'What other projects?'],
    };
  }

  // Personal questions about the AI
  if (/\b(your name|who are you|what are you|are you real|are you human|are you ai|are you a bot)\b/.test(lowerMessage)) {
    return {
      text: `I'm Muhammad's custom AI assistant, built to help visitors learn about his portfolio. I can answer questions about his skills (React, Node.js, Python, .NET), projects, experience, and availability. What would you like to know?`,
      suggestions: ['What are his skills?', 'Show me projects', 'Is he available?'],
    };
  }

  // Jokes/fun
  if (/\b(joke|funny|laugh|humor|tell me a)\b/.test(lowerMessage)) {
    const funnyResponses = [
      `I'm better at tech talk than comedy, but here's something fun: Muhammad evaluates AI models for a living - so technically, I'm being graded by someone who tests AIs! 😅 Want to hear about his work instead?`,
      `Why did the developer quit? Because he didn't get arrays! 😄 Okay, that's my best shot. What I'm actually good at is telling you about Muhammad's impressive projects. Want to hear about Nyra?`,
      `My humor algorithms need work, but here's a cool fact: Muhammad is building Nyra to let people chat across languages in real-time. That's kind of like a universal translator from Star Trek! Want details?`,
    ];
    return {
      text: pickRandom(funnyResponses),
      suggestions: ['Tell me about Nyra', 'What else has he built?'],
    };
  }

  // Food/recommendations
  if (/\b(food|eat|restaurant|hungry|lunch|dinner|breakfast|coffee)\b/.test(lowerMessage)) {
    return {
      text: `I can't recommend restaurants, but Muhammad can definitely build you a food delivery app! He's experienced with React, Node.js, and databases like PostgreSQL. Want to discuss a project idea?`,
      suggestions: ['What technologies does he use?', 'How can I contact him?'],
    };
  }

  // General life advice
  if (/\b(advice|should i|what should|help me decide|opinion)\b/.test(lowerMessage)) {
    return {
      text: `I'm best at answering questions about Muhammad's portfolio! But if you need a developer for your project, he's available for freelance and full-time work. He specializes in web apps, AI integration, and SaaS platforms.`,
      suggestions: ['What can he build?', 'Is he available?', 'Show me his work'],
    };
  }

  // Math/calculations
  if (/\b(calculate|math|\d+\s*[\+\-\*\/]\s*\d+|equals|sum|multiply)\b/.test(lowerMessage)) {
    return {
      text: `I'm not a calculator, but Muhammad certainly knows his way around algorithms! He's worked on complex systems including AI evaluation and database optimization. Want to know about his technical projects?`,
      suggestions: ['What are his skills?', 'Tell me about his AI work'],
    };
  }

  // Location questions
  if (/\b(where is|location|address|city|country|live|based)\b/.test(lowerMessage)) {
    return {
      text: `Muhammad is based in Nigeria and is open to remote work worldwide. He's currently available for freelance projects and full-time opportunities. Would you like to discuss working with him?`,
      suggestions: ['Is he available?', 'How can I contact him?'],
    };
  }

  // Greetings in different languages
  if (/\b(bonjour|hola|ciao|guten tag|konnichiwa|salaam|namaste|olá)\b/i.test(lowerMessage)) {
    return {
      text: `Hello! 👋 Great to meet you! I speak tech fluently, but Muhammad's Nyra project is actually built to break language barriers with real-time translation! I can tell you about his ${projects.length}+ projects, skills, or availability. What interests you?`,
      suggestions: ['Tell me about Nyra', 'What are his skills?', 'Is he available?'],
    };
  }

  // Questions about age/how old
  if (/\b(how old|age|born|birthday)\b/.test(lowerMessage)) {
    return {
      text: `I don't have Muhammad's exact age, but I know he's got ${profile.yearsOfExperience}+ years of professional experience and has built ${projects.length}+ production projects. Experience speaks louder than age! Want to see his work?`,
      suggestions: ['Show me his projects', 'What is his experience?'],
    };
  }

  // Questions about salary/money expectations
  if (/\b(salary|pay|compensation|earn|income|money)\b/.test(lowerMessage)) {
    return {
      text: `Compensation depends on the role, scope, and requirements. Muhammad is open to discussing rates for freelance work or salary for full-time positions. Best to reach out directly through the contact form to discuss specifics!`,
      actions: [{ type: 'open_contact', label: 'Discuss Compensation' }],
      suggestions: ['Is he available?', 'What can he build?'],
    };
  }

  // Questions about hobbies/interests
  if (/\b(hobby|hobbies|free time|fun|interests|like to do)\b/.test(lowerMessage)) {
    return {
      text: `Muhammad is passionate about building things that solve real problems! His startup Nyra is his main passion project - breaking language barriers globally. He also evaluates AI models and stays on top of the latest tech trends. Want to know more about his projects?`,
      suggestions: ['Tell me about Nyra', 'What projects has he built?'],
    };
  }

  // Questions about languages spoken
  if (/\b(speak|language|languages|english|french|arabic)\b/.test(lowerMessage) && !/\b(programming|coding)\b/.test(lowerMessage)) {
    return {
      text: `Muhammad speaks English fluently. And fun fact - his startup Nyra is designed to help people communicate across ANY language with real-time translation! 🌍 Want to know more about it?`,
      suggestions: ['Tell me about Nyra', 'How can I contact him?'],
    };
  }

  // Questions about working hours/timezone
  if (/\b(timezone|time zone|hours|schedule|when.*work|working hours)\b/.test(lowerMessage)) {
    return {
      text: `Muhammad is based in Nigeria (WAT timezone) but works with clients globally. He's flexible with scheduling and typically responds within ${profile.availability.responseTime}. Remote collaboration is his standard!`,
      suggestions: ['Is he available?', 'How can I contact him?'],
    };
  }

  // Comparison questions
  if (/\b(better than|compared to|vs|versus|difference between)\b/.test(lowerMessage)) {
    return {
      text: `I can best answer questions specifically about Muhammad's skills and projects! He's proficient in multiple technologies - React, Node.js, .NET, Python. What technology or project would you like to know about?`,
      suggestions: ['What technologies does he use?', 'Show me his projects'],
    };
  }

  // Thank you / appreciation
  if (/\b(awesome|great|nice|cool|amazing|impressive|wow)\b/.test(lowerMessage)) {
    return {
      text: `Thanks! 😊 Muhammad's work is pretty impressive - ${projects.length}+ projects, a 25% efficiency improvement at his job, and a startup tackling global language barriers. Want to dive deeper into any of these?`,
      suggestions: ['Tell me more about his achievements', 'Show me his projects', 'Is he available?'],
    };
  }

  // Yes/No/Maybe responses
  if (/^(yes|yeah|yep|sure|okay|ok|no|nope|nah|maybe)[\s!?.]*$/i.test(lowerMessage)) {
    return {
      text: `I'd love to tell you more! What aspect of Muhammad's work interests you? His ${projects.length}+ projects, technical skills, work experience, or availability for new opportunities?`,
      suggestions: ['Show me his projects', 'What are his skills?', 'Is he available?'],
    };
  }

  // If user asks for help
  if (lowerMessage.includes('help')) {
    return {
      text: `I can help you learn about Muhammad's technical skills, ${projects.length}+ projects he's built, work experience, and availability for new opportunities. What would you like to know?`,
      suggestions: ['What are his skills?', 'Show me projects', 'Is he available?'],
    };
  }

  // Generic fallback - still helpful
  const fallbackResponses = [
    `Interesting question! 🤔 I'm wired to talk about Muhammad's portfolio - his skills, projects, and experience. He's a Software Engineer who's built ${projects.length}+ major projects and improved system efficiency by 25% at his job. What would you like to know?`,
    `That's a bit outside my wheelhouse! I'm Muhammad's portfolio assistant, and I've got the inside scoop on his tech skills, ${projects.length}+ projects like Nyra Connect, and his work experience. What sounds interesting?`,
    `I appreciate the curiosity! 😊 I'm best at discussing Muhammad's work - he's a full-stack developer with expertise in React, Node.js, and .NET, plus he evaluates AI models. Want to explore any of that?`,
  ];

  return {
    text: pickRandom(fallbackResponses),
    suggestions: ['What technologies does he use?', 'Show me his projects', 'Is he available for hire?'],
  };
}
