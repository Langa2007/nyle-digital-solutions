import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vantech Software Solutions';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom, #020617, #0f172a)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: 120,
            color: '#3b82f6',
            fontWeight: 'bold',
            padding: '20px 40px',
            border: '8px solid #3b82f6',
            borderRadius: '20px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          }}>V</div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 'bold', textAlign: 'center' }}>Vantech Software Solutions</div>
        <div style={{ fontSize: 36, marginTop: 30, color: '#94a3b8', textAlign: 'center' }}>Software, Cloud and Product Delivery</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
