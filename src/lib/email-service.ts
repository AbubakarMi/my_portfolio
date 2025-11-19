import { Resend } from 'resend';

const resend = new Resend('re_UMoE8FfE_NrH5hKwK7R8UxCMFJu2HxvYP');

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SendTranscriptInput {
  messages: ChatMessage[];
  sessionId?: string;
  userInfo?: {
    name?: string;
    email?: string;
  };
}

export async function sendChatTranscript(input: SendTranscriptInput): Promise<{ success: boolean; error?: string }> {
  try {
    const { messages, sessionId, userInfo } = input;

    // Format messages into readable transcript
    const transcriptHtml = formatTranscriptHtml(messages, sessionId, userInfo);
    const transcriptText = formatTranscriptText(messages, sessionId, userInfo);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio AI <onboarding@resend.dev>',
      to: ['abubakarmi131@gmail.com'],
      subject: `AI Chat Transcript - ${new Date().toLocaleDateString()}${userInfo?.name ? ` from ${userInfo.name}` : ''}`,
      html: transcriptHtml,
      text: transcriptText,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Email service error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}

function formatTranscriptHtml(messages: ChatMessage[], sessionId?: string, userInfo?: SendTranscriptInput['userInfo']): string {
  const messageRows = messages.map(msg => {
    const isUser = msg.role === 'user';
    const bgColor = isUser ? '#e3f2fd' : '#f5f5f5';
    const roleLabel = isUser ? 'User' : 'AI Assistant';
    const roleColor = isUser ? '#1976d2' : '#388e3c';

    return `
      <tr>
        <td style="padding: 16px; background-color: ${bgColor}; border-radius: 8px; margin-bottom: 8px;">
          <div style="font-weight: 600; color: ${roleColor}; margin-bottom: 8px; font-size: 14px;">
            ${roleLabel}
            <span style="font-weight: normal; color: #666; font-size: 12px; margin-left: 8px;">
              ${new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">
            ${escapeHtml(msg.content)}
          </div>
        </td>
      </tr>
      <tr><td style="height: 12px;"></td></tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 20px; background-color: #f0f0f0;">
      <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
          <td style="padding: 24px 24px 16px 24px; border-bottom: 1px solid #eee;">
            <h1 style="margin: 0; font-size: 24px; color: #333;">AI Chat Transcript</h1>
            <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">
              ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            ${sessionId ? `<p style="margin: 4px 0 0 0; color: #999; font-size: 12px;">Session: ${sessionId}</p>` : ''}
            ${userInfo?.name ? `<p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">From: ${userInfo.name}${userInfo.email ? ` (${userInfo.email})` : ''}</p>` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 24px;">
            <table cellpadding="0" cellspacing="0" style="width: 100%;">
              ${messageRows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 24px 24px 24px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
              Total messages: ${messages.length} |
              Sent from Muhammad Idris Abubakar's Portfolio
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function formatTranscriptText(messages: ChatMessage[], sessionId?: string, userInfo?: SendTranscriptInput['userInfo']): string {
  const header = [
    'AI CHAT TRANSCRIPT',
    '==================',
    `Date: ${new Date().toLocaleDateString()}`,
    sessionId ? `Session: ${sessionId}` : '',
    userInfo?.name ? `From: ${userInfo.name}${userInfo.email ? ` (${userInfo.email})` : ''}` : '',
    '',
    'CONVERSATION:',
    '-------------',
    ''
  ].filter(Boolean).join('\n');

  const messageText = messages.map(msg => {
    const roleLabel = msg.role === 'user' ? 'USER' : 'AI';
    const time = new Date(msg.timestamp).toLocaleTimeString();
    return `[${time}] ${roleLabel}:\n${msg.content}\n`;
  }).join('\n');

  const footer = `\n-------------\nTotal messages: ${messages.length}`;

  return header + messageText + footer;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
