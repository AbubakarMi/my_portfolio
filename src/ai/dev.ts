'use server';
import { config } from 'dotenv';
config();

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize Genkit with the Google AI plugin
genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});
