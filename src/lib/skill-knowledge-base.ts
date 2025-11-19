// Custom skill knowledge base - no external AI needed
export interface SkillAnalysis {
  explanation: string;
  importance: string;
}

export const skillKnowledgeBase: Record<string, SkillAnalysis> = {
  // AI & Testing Skills
  "LLM Evaluation": {
    explanation: "LLM Evaluation is the systematic process of assessing Large Language Models for quality, accuracy, safety, and performance. It involves designing test cases, measuring outputs against gold standards, and applying metrics like precision, recall, and F1 scores to quantify model behavior.",
    importance: "As AI systems become more prevalent in critical applications, rigorous evaluation ensures models behave predictably, avoid harmful outputs, and meet user expectations. Strong evaluation skills are essential for building trustworthy AI products."
  },
  "QA Design": {
    explanation: "QA Design involves creating comprehensive test scenarios, automation frameworks, and quality assurance processes to ensure software reliability. It encompasses unit testing, integration testing, end-to-end testing, and establishing CI/CD pipelines for continuous quality monitoring.",
    importance: "Quality assurance prevents costly bugs from reaching production, maintains user trust, and reduces technical debt. Well-designed QA processes catch issues early, saving development time and ensuring consistent product quality."
  },
  "NLP Annotation": {
    explanation: "NLP Annotation is the process of labeling text data for training machine learning models. This includes entity recognition, sentiment tagging, intent classification, and creating training datasets that teach models to understand language patterns.",
    importance: "High-quality annotated data is the foundation of effective NLP models. Proper annotation directly impacts model accuracy and enables AI systems to understand context, nuance, and domain-specific terminology."
  },
  "JSON/YAML Modeling": {
    explanation: "JSON/YAML Modeling involves designing structured data schemas, configuration files, and API contracts. It includes creating validation rules, nested structures, and documentation for data interchange between systems.",
    importance: "Well-designed data models ensure consistency across applications, simplify API integration, and make configurations maintainable. They serve as contracts between frontend and backend systems."
  },

  // Programming Languages
  "Python": {
    explanation: "Python is a versatile, high-level programming language known for its readable syntax and extensive ecosystem. It excels in AI/ML development, data analysis, automation, web backends, and scientific computing with libraries like TensorFlow, Pandas, and Django.",
    importance: "Python's dominance in AI/ML makes it essential for modern development. Its simplicity accelerates prototyping while its rich ecosystem supports production-grade applications across diverse domains."
  },
  "Java": {
    explanation: "Java is a statically-typed, object-oriented language designed for portability and enterprise scalability. It powers Android apps, enterprise backends, and distributed systems with frameworks like Spring Boot, providing strong typing and robust tooling.",
    importance: "Java's 'write once, run anywhere' philosophy, mature ecosystem, and enterprise adoption make it ideal for large-scale applications requiring reliability, performance, and long-term maintainability."
  },
  "C#": {
    explanation: "C# is Microsoft's modern, type-safe language for the .NET ecosystem. It supports object-oriented, functional, and async programming patterns, excelling in web APIs, desktop apps, game development with Unity, and cloud services.",
    importance: "C# combines the power of C++ with the productivity of modern languages. Its tight integration with Azure and .NET makes it a top choice for enterprise applications and cross-platform development."
  },
  "TypeScript": {
    explanation: "TypeScript is a typed superset of JavaScript that compiles to plain JS. It adds static typing, interfaces, and advanced tooling to JavaScript, catching errors at compile-time and improving code maintainability in large codebases.",
    importance: "TypeScript significantly reduces runtime errors and improves developer productivity through better IDE support. It's become the standard for professional frontend and Node.js development."
  },

  // Backend Technologies
  ".NET 8": {
    explanation: ".NET 8 is Microsoft's latest cross-platform framework for building web APIs, microservices, and cloud applications. It features minimal APIs, improved performance, native AOT compilation, and enhanced container support.",
    importance: ".NET 8's performance rivals Go and Rust while maintaining developer productivity. Its cross-platform support, cloud-native features, and enterprise backing make it ideal for scalable backend systems."
  },
  "Node.js": {
    explanation: "Node.js is a JavaScript runtime built on Chrome's V8 engine, enabling server-side JavaScript. Its event-driven, non-blocking I/O model excels at handling concurrent connections, making it perfect for real-time applications and APIs.",
    importance: "Node.js unifies frontend and backend development with JavaScript, accelerating full-stack development. Its npm ecosystem provides solutions for virtually any development need."
  },
  "PostgreSQL": {
    explanation: "PostgreSQL is an advanced open-source relational database known for reliability, data integrity, and extensibility. It supports complex queries, JSON data, full-text search, and advanced features like CTEs and window functions.",
    importance: "PostgreSQL's ACID compliance and advanced features make it suitable for everything from startups to enterprise systems. Its reliability and performance handle mission-critical data with confidence."
  },
  "Clean Architecture": {
    explanation: "Clean Architecture is a software design philosophy that separates concerns into layers: entities, use cases, interfaces, and frameworks. It keeps business logic independent of UI, databases, and external services, making code testable and maintainable.",
    importance: "Clean Architecture enables long-term maintainability by isolating business logic from technical details. It makes systems easier to test, modify, and scale without cascading changes."
  },

  // Frontend Technologies
  "React": {
    explanation: "React is a JavaScript library for building user interfaces through reusable components. Its virtual DOM, one-way data flow, and hooks API enable efficient rendering and state management for complex interactive applications.",
    importance: "React's component model revolutionized frontend development. Its massive ecosystem, community support, and adoption by major companies make it the most in-demand frontend skill."
  },
  "Next.js": {
    explanation: "Next.js is a React framework that adds server-side rendering, static generation, API routes, and automatic optimization. It simplifies full-stack React development with built-in routing, image optimization, and deployment features.",
    importance: "Next.js bridges the gap between frontend and backend, enabling faster page loads and better SEO. It's become the standard for production React applications."
  },
  "Tailwind CSS": {
    explanation: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes for building custom designs. It eliminates context switching between HTML and CSS files, enabling rapid UI development with consistent design systems.",
    importance: "Tailwind accelerates development while maintaining design consistency. Its purge feature produces minimal CSS bundles, and its customization options support any design system."
  },

  // DevOps & Tools
  "Docker": {
    explanation: "Docker is a containerization platform that packages applications with their dependencies into isolated containers. It ensures consistent environments across development, testing, and production, simplifying deployment and scaling.",
    importance: "Docker eliminates 'works on my machine' problems and enables microservices architecture. It's fundamental to modern DevOps, CI/CD pipelines, and cloud-native development."
  },
  "SendGrid": {
    explanation: "SendGrid is a cloud-based email delivery service that handles transactional and marketing emails at scale. It provides APIs for sending emails, templates, analytics, and deliverability optimization.",
    importance: "Reliable email delivery is critical for user engagement, password resets, and notifications. SendGrid handles the complexity of email infrastructure, ensuring messages reach inboxes."
  },
  "Git & GitHub": {
    explanation: "Git is a distributed version control system for tracking code changes, while GitHub provides cloud hosting, collaboration features, and CI/CD integration. Together they enable team collaboration, code review, and project management.",
    importance: "Version control is fundamental to professional software development. Git enables parallel development, safe experimentation, and complete project history, while GitHub adds collaboration and automation."
  }
};

export function getSkillAnalysis(skillName: string): SkillAnalysis {
  // Try exact match first
  if (skillKnowledgeBase[skillName]) {
    return skillKnowledgeBase[skillName];
  }

  // Try case-insensitive match
  const lowerSkill = skillName.toLowerCase();
  for (const [key, value] of Object.entries(skillKnowledgeBase)) {
    if (key.toLowerCase() === lowerSkill) {
      return value;
    }
  }

  // Return generic response for unknown skills
  return {
    explanation: `${skillName} is a valuable technical skill in the software development ecosystem. It represents expertise in a specific domain that contributes to building robust, scalable applications.`,
    importance: `Proficiency in ${skillName} demonstrates specialized knowledge that can solve specific technical challenges. This skill adds depth to a developer's toolkit and enables tackling diverse project requirements.`
  };
}
