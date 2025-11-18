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

// Response templates for variety
const greetingResponses = [
  `Hello! I'm Muhammad's AI assistant. I can tell you about his skills, projects, and experience. What would you like to know?`,
  `Hey there! I'm here to help you learn about Muhammad's work. Feel free to ask about his projects, technical skills, or availability.`,
  `Hi! Great to meet you. I can help you explore Muhammad's portfolio - his projects, skills, or work experience. What interests you?`,
];

const farewellResponses = [
  `Goodbye! Feel free to come back if you have more questions. You can also use the contact form to reach Muhammad directly.`,
  `Take care! If you'd like to discuss a project with Muhammad, the contact form is always available.`,
];

const thanksResponses = [
  `You're welcome! Is there anything else you'd like to know about Muhammad's work?`,
  `Happy to help! Let me know if you have more questions about his projects or skills.`,
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
        text: `I can help you learn about Muhammad's technical skills (React, Node.js, .NET, Python, and more), his projects (like Nyra Connect, InvoTrek, BuildTrack Pro), work experience, and availability for new projects. What would you like to explore?`,
        suggestions: ['Show me projects', 'What are his skills?', 'Is he available?'],
      };

    case 'about':
      return {
        text: `Muhammad is a ${profile.title} with ${profile.yearsOfExperience}+ years of experience. ${profile.summary} He's also the founder of Nyra, an AI-powered communication platform. He currently works at Hubuk Technology Limited while also taking on freelance AI/QA projects.`,
        actions: [{ type: 'scroll_to_section', payload: { section: 'about' }, label: 'View About Section' }],
        suggestions: ['What are his main skills?', 'Tell me about Nyra'],
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
        text: `Muhammad holds a ${profile.education.degree} from ${profile.education.institution} (${profile.education.period}). His education combined with ${profile.yearsOfExperience}+ years of hands-on experience gives him a strong foundation in software engineering and AI evaluation.`,
        suggestions: ['What about work experience?', 'What technologies does he use?'],
      };

    case 'startup':
      return {
        text: `Muhammad founded ${profile.startup.name}, an ${profile.startup.description}. The vision is to ${profile.startup.vision}. Key features include ${profile.startup.features.join(', ')}. The future roadmap includes ${profile.startup.future}.`,
        actions: [{ type: 'show_project', payload: { projectId: 'nyra-connect' }, label: 'View Nyra Connect' }],
        suggestions: ['What tech stack is Nyra built with?', 'What other projects has he built?'],
      };

    case 'availability':
      return {
        text: `Muhammad is currently ${profile.availability.status} for ${profile.availability.types.join(', ')} opportunities. He's open to ${profile.availability.remote ? 'remote work' : 'on-site work'} and typically responds within ${profile.availability.responseTime}. Would you like to discuss a potential project?`,
        actions: [{ type: 'open_contact', label: 'Contact Muhammad' }],
        suggestions: ['What are his rates?', 'What technologies does he work with?'],
      };

    case 'contact':
      return {
        text: `You can reach Muhammad through the contact form on this website. He typically responds within ${profile.availability.responseTime}. He's currently available for ${profile.availability.types.join(' and ')} work.`,
        actions: [{ type: 'open_contact', label: 'Open Contact Form' }],
      };

    case 'pricing':
      return {
        text: `Muhammad's rates depend on the project scope, complexity, and timeline. For a personalized quote, I'd recommend reaching out with your project details through the contact form. He'll get back to you within ${profile.availability.responseTime}.`,
        actions: [{ type: 'open_contact', label: 'Request Quote' }],
        suggestions: ['Is he available for freelance?', 'What technologies does he use?'],
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
      return {
        text: `For ${intent.entities.category}, Muhammad works with: ${skillNames}. ${categorySkills[0].proficiency === 'expert' ? 'He has expert-level proficiency in these technologies.' : ''}`,
        actions: [{ type: 'scroll_to_section', payload: { section: 'skills' }, label: 'View All Skills' }],
        suggestions: ['Show me projects using these', 'What other technologies does he know?'],
      };
    }
  }

  // General skills response
  const expertSkills = skills.filter(s => s.proficiency === 'expert').map(s => s.name);
  const topSkills = expertSkills.slice(0, 6).join(', ');

  return {
    text: `Muhammad's core technologies include ${topSkills}. He specializes in full-stack development with React and Node.js or ASP.NET Core, PostgreSQL for databases, and has strong experience in AI/ML evaluation and LLM testing.`,
    actions: [{ type: 'scroll_to_section', payload: { section: 'skills' }, label: 'View All Skills' }],
    suggestions: ['Do you know React?', 'What databases do you use?', 'Show me your projects'],
  };
}

function generateSpecificSkillResponse(intent: IntentResult): GeneratedResponse {
  const skillName = intent.entities.skill || intent.entities.technology;
  if (!skillName) {
    return generateSkillsResponse(intent, []);
  }

  const skill = findSkill(skillName);
  if (skill) {
    let response = `Yes, Muhammad works with ${skill.name}. ${skill.description}.`;

    if (skill.proficiency === 'expert') {
      response += ` He has expert-level proficiency in this technology.`;
    }

    const actions: GeneratedResponse['actions'] = [];
    const suggestions: string[] = [];

    if (skill.relatedProjects && skill.relatedProjects.length > 0) {
      const projectId = skill.relatedProjects[0];
      const project = findProject(projectId);
      if (project) {
        response += ` He used it in projects like ${project.name}.`;
        actions.push({ type: 'show_project', payload: { projectId }, label: `View ${project.name}` });
      }
    }

    suggestions.push('What other technologies does he use?', 'Show me all projects');

    return { text: response, actions, suggestions };
  }

  // Skill not found
  return {
    text: `I don't have specific information about that technology. Muhammad's main skills include React, Node.js, ASP.NET Core, PostgreSQL, Python, and Java. Would you like to know about any of these?`,
    suggestions: ['What technologies does he use?', 'Show me his projects'],
  };
}

function generateProjectsResponse(hints: string[]): GeneratedResponse {
  if (hints.includes('wants_highlights')) {
    const topProjects = projects.slice(0, 3);
    const projectList = topProjects.map(p => `${p.name} (${p.type})`).join(', ');
    return {
      text: `Muhammad's top projects are ${projectList}. Nyra Connect is his flagship startup project for breaking language barriers. Would you like to know more about any specific project?`,
      actions: [{ type: 'scroll_to_section', payload: { section: 'projects' }, label: 'View All Projects' }],
      suggestions: ['Tell me about Nyra Connect', 'What is InvoTrek?'],
    };
  }

  const projectSummary = projects.map(p => p.name).join(', ');
  return {
    text: `Muhammad has built ${projects.length} key projects: ${projectSummary}. These range from AI productivity apps to healthcare systems and SaaS platforms. Which one would you like to learn more about?`,
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

    let response = `${project.name} is a ${project.type.toLowerCase()}. ${project.description} It's built with ${techStack} and features ${features}.`;

    if (project.targetUsers) {
      response += ` Target users: ${project.targetUsers}.`;
    }

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

  let response = '';
  if (mainJob) {
    response = `Muhammad is currently a ${mainJob.role} at ${mainJob.company} (${mainJob.period}). ${mainJob.description} Key achievements include: ${mainJob.achievements.slice(0, 2).join('; ')}.`;
  }

  const freelance = currentJobs.find(e => e.company === 'Freelance');
  if (freelance) {
    response += ` He also does ${freelance.role.toLowerCase()} work, ${freelance.achievements[0].toLowerCase()}.`;
  }

  response += ` He's also the founder of ${profile.startup.name}.`;

  return {
    text: response,
    actions: [{ type: 'scroll_to_section', payload: { section: 'experience' }, label: 'View Experience' }],
    suggestions: ['Tell me about Nyra', 'What projects has he built?'],
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
    return {
      text: `I'm not great at jokes, but I can tell you something cool - Muhammad built an AI translation platform called Nyra that breaks language barriers! That's pretty amazing, right? Want to know more about it?`,
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

  // If user asks for help
  if (lowerMessage.includes('help')) {
    return {
      text: `I can help you learn about Muhammad's technical skills, projects he's built, work experience, and availability for new opportunities. What would you like to know?`,
      suggestions: ['What are his skills?', 'Show me projects', 'Is he available?'],
    };
  }

  // Generic fallback - still helpful
  return {
    text: `That's an interesting question! While I'm specialized in answering questions about Muhammad's portfolio, I'm happy to help you learn about his work. He's a Software Engineer with expertise in React, Node.js, .NET, and AI/ML. What aspect interests you?`,
    suggestions: ['What technologies does he use?', 'Show me his projects', 'Is he available for hire?'],
  };
}
