
import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon, generated at build time so no binary asset is needed. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 96,
          fontWeight: 700,
          color: '#ffffff',
          background: 'linear-gradient(135deg, #111827 0%, #1e1b4b 100%)',
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
