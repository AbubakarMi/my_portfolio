
'use server';

/**
 * @fileOverview Email sending flows for contact form and chat transcripts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Resend } from 'resend';

// IMPORTANT: Add your Resend API key to your environment variables.
// You can get a key from https://resend.com
const resendApiKey = process.env.RESEND_API_KEY;
let resend: Resend | null = null;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn(
    'RESEND_API_KEY is not set. Email functionality will be disabled. Please add it to your .env file.'
  );
}

const TO_EMAIL = 'abubakarmi131@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // Resend requires a verified domain or this default email.

// Schema for the contact form
const ContactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});
export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// Schema for the chat transcript
const ChatTranscriptSchema = z.object({
  transcript: z.string(),
});
export type ChatTranscriptInput = z.infer<typeof ChatTranscriptSchema>;

/**
 * Public function to send an email with the contact form data.
 */
export async function sendContactFormEmail(
  input: ContactFormInput
): Promise<{ success: boolean }> {
  return sendContactFormEmailFlow(input);
}

/**
 * Public function to send an email with the chat transcript.
 */
export async function sendChatTranscriptEmail(
  input: ChatTranscriptInput
): Promise<{ success: boolean }> {
  return sendChatTranscriptEmailFlow(input);
}


const sendContactFormEmailFlow = ai.defineFlow(
  {
    name: 'sendContactFormEmailFlow',
    inputSchema: ContactFormSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    if (!resend) {
      console.error('Resend is not initialized. Cannot send contact form email.');
      throw new Error('Email service is not configured.');
    }
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New Contact Form Submission from ${input.name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Message:</strong></p>
          <p>${input.message}</p>
        `,
      });
      return { success: true };
    } catch (error) {
      console.error('Error sending contact form email:', error);
      // It's often better not to throw the raw error to the client.
      // You could return a more generic error message.
      throw new Error('Failed to send email.');
    }
  }
);


const sendChatTranscriptEmailFlow = ai.defineFlow(
  {
    name: 'sendChatTranscriptEmailFlow',
    inputSchema: ChatTranscriptSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
     if (!resend) {
      console.error('Resend is not initialized. Cannot send chat transcript.');
      // We don't throw here, as this is a background task and shouldn't fail the UI.
      return { success: false };
    }
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: 'New Chat Transcript from Portfolio',
        html: `
          <h1>Chat Transcript</h1>
          <pre>${input.transcript}</pre>
        `,
      });
      return { success: true };
    } catch (error) {
      console.error('Error sending chat transcript email:', error);
      throw new Error('Failed to send email.');
    }
  }
);
