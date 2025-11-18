// Intent Recognition Engine for Custom AI Agent
// Identifies what the user wants to know

export type Intent =
  | 'greeting'
  | 'skills'
  | 'specific_skill'
  | 'projects'
  | 'specific_project'
  | 'experience'
  | 'education'
  | 'availability'
  | 'contact'
  | 'pricing'
  | 'startup'
  | 'about'
  | 'capabilities'
  | 'farewell'
  | 'thanks'
  | 'off_topic'
  | 'unknown';

export interface IntentResult {
  intent: Intent;
  confidence: number;
  entities: {
    skill?: string;
    project?: string;
    technology?: string;
    category?: string;
  };
}

interface IntentPattern {
  intent: Intent;
  patterns: RegExp[];
  keywords: string[];
  priority: number;
}

const intentPatterns: IntentPattern[] = [
  {
    intent: 'greeting',
    patterns: [
      /^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|sup|yo)[\s!?.]*$/i,
      /^what'?s\s*up/i,
      /^how\s*are\s*you/i,
    ],
    keywords: ['hi', 'hello', 'hey', 'greetings'],
    priority: 10,
  },
  {
    intent: 'farewell',
    patterns: [
      /^(bye|goodbye|see\s*you|later|take\s*care|ciao)[\s!?.]*$/i,
    ],
    keywords: ['bye', 'goodbye', 'later'],
    priority: 10,
  },
  {
    intent: 'thanks',
    patterns: [
      /\b(thank|thanks|thank\s*you|appreciate|grateful)\b/i,
    ],
    keywords: ['thank', 'thanks', 'appreciate'],
    priority: 9,
  },
  {
    intent: 'contact',
    patterns: [
      /\b(contact|reach|email|phone|call|message|get\s*in\s*touch|talk\s*to)\b/i,
      /how\s*(can|do)\s*i\s*(contact|reach|email)/i,
    ],
    keywords: ['contact', 'email', 'phone', 'reach', 'message'],
    priority: 8,
  },
  {
    intent: 'availability',
    patterns: [
      /\b(available|availability|hire|hiring|open|freelance|work\s*with)\b/i,
      /are\s*you\s*(available|open|free)/i,
      /can\s*(i|we)\s*hire/i,
    ],
    keywords: ['available', 'hire', 'freelance', 'open'],
    priority: 8,
  },
  {
    intent: 'pricing',
    patterns: [
      /\b(price|pricing|rate|rates|cost|charge|fee|budget|quote)\b/i,
      /how\s*much\s*(do\s*you|does\s*(he|it))\s*(charge|cost)/i,
    ],
    keywords: ['price', 'rate', 'cost', 'charge', 'fee', 'budget'],
    priority: 8,
  },
  {
    intent: 'startup',
    patterns: [
      /\b(nyra|startup|start-up|founded|founder)\b/i,
      /\b(language\s*barrier|translation|transcription)\b/i,
    ],
    keywords: ['nyra', 'startup', 'founder', 'translation'],
    priority: 7,
  },
  {
    intent: 'specific_project',
    patterns: [
      /\b(nyra\s*connect|shoplynk|shop\s*lynk|invotrek|buildtrack|nubenta|adustech|smarted|bulkpay|rewardify|rental\s*management)\b/i,
      /tell\s*me\s*(about|more)\s*(the\s*)?\w+\s*project/i,
      /what\s*is\s*(nyra|invotrek|buildtrack|nubenta|shoplynk|bulkpay|rewardify|rental)/i,
    ],
    keywords: ['nyra connect', 'shoplynk', 'invotrek', 'buildtrack', 'nubenta', 'smarted', 'adustech', 'bulkpay', 'rewardify', 'rental', 'whatsapp store'],
    priority: 7,
  },
  {
    intent: 'projects',
    patterns: [
      /\b(project|projects|portfolio|work|built|created|developed|made)\b/i,
      /what\s*(have\s*you|has\s*he)\s*(built|created|made|worked)/i,
      /show\s*me\s*(your|his)\s*(work|projects)/i,
    ],
    keywords: ['project', 'portfolio', 'built', 'created', 'work'],
    priority: 6,
  },
  {
    intent: 'specific_skill',
    patterns: [
      /\b(react|node|nodejs|python|java|javascript|typescript|csharp|c#|\.net|dotnet|postgresql|mongodb|firebase|nextjs|next\.js|express|asp\.net)\b/i,
      /do\s*you\s*know\s*\w+/i,
      /experience\s*with\s*\w+/i,
      /can\s*you\s*(use|work\s*with)\s*\w+/i,
    ],
    keywords: ['react', 'node', 'python', 'java', 'javascript', 'typescript', 'c#', '.net', 'postgresql', 'mongodb'],
    priority: 6,
  },
  {
    intent: 'skills',
    patterns: [
      /\b(skill|skills|technologies|technology|tech\s*stack|programming|languages?|frameworks?|tools?)\b/i,
      /what\s*(do\s*you|does\s*he)\s*(know|use|work\s*with)/i,
      /what\s*(are|is)\s*(your|his)\s*(skills?|expertise)/i,
    ],
    keywords: ['skill', 'technology', 'tech stack', 'programming', 'framework'],
    priority: 5,
  },
  {
    intent: 'experience',
    patterns: [
      /\b(experience|career|job|employment|worked|company|companies|hubuk)\b/i,
      /where\s*(have\s*you|has\s*he)\s*worked/i,
      /work\s*history/i,
    ],
    keywords: ['experience', 'career', 'job', 'worked', 'company'],
    priority: 5,
  },
  {
    intent: 'education',
    patterns: [
      /\b(education|degree|university|college|school|study|studied|graduate|graduated)\b/i,
      /where\s*did\s*(you|he)\s*(study|graduate)/i,
    ],
    keywords: ['education', 'degree', 'university', 'study'],
    priority: 5,
  },
  {
    intent: 'about',
    patterns: [
      /\b(about|who|introduce|introduction|yourself|himself|background)\b/i,
      /tell\s*me\s*about\s*(yourself|him|muhammad)/i,
      /who\s*(are\s*you|is\s*(he|muhammad))/i,
    ],
    keywords: ['about', 'who', 'introduce', 'background'],
    priority: 4,
  },
  {
    intent: 'capabilities',
    patterns: [
      /what\s*can\s*you\s*do/i,
      /how\s*can\s*you\s*help/i,
      /what\s*do\s*you\s*know/i,
    ],
    keywords: ['can you', 'help', 'do'],
    priority: 3,
  },
];

// Extract entities from the message
function extractEntities(message: string): IntentResult['entities'] {
  const entities: IntentResult['entities'] = {};
  const lowerMessage = message.toLowerCase();

  // Extract specific technologies/skills
  const techPatterns: Record<string, string> = {
    'react': 'React',
    'node': 'Node.js',
    'nodejs': 'Node.js',
    'python': 'Python',
    'java': 'Java',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'c#': 'C#',
    'csharp': 'C#',
    '.net': 'ASP.NET Core',
    'dotnet': 'ASP.NET Core',
    'asp.net': 'ASP.NET Core',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'firebase': 'Firebase',
    'next.js': 'Next.js',
    'nextjs': 'Next.js',
    'express': 'Express',
    'sql': 'SQL',
  };

  for (const [pattern, name] of Object.entries(techPatterns)) {
    if (lowerMessage.includes(pattern)) {
      entities.skill = name;
      entities.technology = name;
      break;
    }
  }

  // Extract project names
  const projectPatterns: Record<string, string> = {
    'nyra connect': 'nyra-connect',
    'nyra-connect': 'nyra-connect',
    'shoplynk': 'shoplynk',
    'shop lynk': 'shoplynk',
    'whatsapp store': 'shoplynk',
    'invotrek': 'invotrek',
    'rental': 'rental-management',
    'rental management': 'rental-management',
    'buildtrack': 'buildtrack-pro',
    'buildtrack pro': 'buildtrack-pro',
    'nubenta': 'nubenta-care',
    'nubenta care': 'nubenta-care',
    'bulkpay': 'bulkpay',
    'bulk pay': 'bulkpay',
    'payroll': 'bulkpay',
    'rewardify': 'rewardify',
    'gamification': 'rewardify',
    'adustech': 'adustech-bus-tracker',
    'bus tracker': 'adustech-bus-tracker',
    'smarted': 'smarted-erp',
    'smarted erp': 'smarted-erp',
    'online management': 'online-management',
  };

  for (const [pattern, id] of Object.entries(projectPatterns)) {
    if (lowerMessage.includes(pattern)) {
      entities.project = id;
      break;
    }
  }

  // Extract skill categories
  const categoryPatterns: Record<string, string> = {
    'frontend': 'Frontend',
    'front-end': 'Frontend',
    'backend': 'Backend',
    'back-end': 'Backend',
    'database': 'Databases',
    'databases': 'Databases',
    'ai': 'AI/ML',
    'machine learning': 'AI/ML',
    'ml': 'AI/ML',
  };

  for (const [pattern, category] of Object.entries(categoryPatterns)) {
    if (lowerMessage.includes(pattern)) {
      entities.category = category;
      break;
    }
  }

  return entities;
}

// Main intent recognition function
export function recognizeIntent(message: string): IntentResult {
  const lowerMessage = message.toLowerCase().trim();
  let bestMatch: { intent: Intent; confidence: number } = { intent: 'unknown', confidence: 0 };

  for (const pattern of intentPatterns) {
    let score = 0;

    // Check regex patterns
    for (const regex of pattern.patterns) {
      if (regex.test(message)) {
        score += 50;
        break;
      }
    }

    // Check keywords
    for (const keyword of pattern.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        score += 30;
      }
    }

    // Apply priority boost
    score += pattern.priority;

    // Update best match
    if (score > bestMatch.confidence) {
      bestMatch = { intent: pattern.intent, confidence: score };
    }
  }

  // Normalize confidence to 0-100
  const normalizedConfidence = Math.min(100, bestMatch.confidence);

  return {
    intent: normalizedConfidence > 20 ? bestMatch.intent : 'unknown',
    confidence: normalizedConfidence,
    entities: extractEntities(message),
  };
}

// Check if message is a question
export function isQuestion(message: string): boolean {
  return /\?$/.test(message.trim()) ||
    /^(what|who|where|when|why|how|can|do|does|is|are|will|would|could|should)\b/i.test(message);
}

// Get conversation context hints
export function getContextHints(message: string): string[] {
  const hints: string[] = [];
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('more') || lowerMessage.includes('detail')) {
    hints.push('wants_details');
  }
  if (lowerMessage.includes('example') || lowerMessage.includes('show')) {
    hints.push('wants_examples');
  }
  if (lowerMessage.includes('best') || lowerMessage.includes('favorite') || lowerMessage.includes('top')) {
    hints.push('wants_highlights');
  }
  if (lowerMessage.includes('all') || lowerMessage.includes('list')) {
    hints.push('wants_list');
  }

  return hints;
}
