import { ImageResponse } from 'next/og';
import { FULL_NAME } from '@/lib/seo';

export const alt =`${FULL_NAME} — Lead Developer at Kredinou & BizScan360`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 55%, #1e1b4b 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#818cf8',
            marginBottom: 28,
          }}
        >
          Portfolio
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {FULL_NAME}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 38,
            color: '#cbd5e1',
            lineHeight: 1.3,
          }}
        >
          Lead Developer at Kredinou &amp; BizScan360
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 30,
            color: '#94a3b8',
          }}
        >
          Software Engineer · Fintech · AI Healthcare · SaaS
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: 26,
            color: '#6366f1',
          }}
        >
          abubakarmi.netlify.app
        </div>
      </div>
    ),
    { ...size }
  );
}
