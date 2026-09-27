import { ImageResponse } from 'next/server';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Main background circle */}
        <div
          style={{
            position: 'absolute',
            left: 180 / 2 - 86.4,
            top: 180 / 2 - 86.4,
            width: 172.8,
            height: 172.8,
            borderRadius: '50%',
            backgroundColor: '#0C1F1A',
          }}
        />
        {/* Teal ring */}
        <div
          style={{
            position: 'absolute',
            left: 180 / 2 - 55.8,
            top: 180 / 2 - 55.8,
            width: 111.6,
            height: 111.6,
            borderRadius: '50%',
            border: '9.9px solid #5DCAA5',
          }}
        />
        {/* Teal inner circle */}
        <div
          style={{
            position: 'absolute',
            left: 86.4 - 27.9,
            top: 91.8 - 27.9,
            width: 55.8,
            height: 55.8,
            borderRadius: '50%',
            backgroundColor: '#5DCAA5',
          }}
        />
        {/* Coral dot */}
        <div
          style={{
            position: 'absolute',
            left: 131.4 - 11.16,
            top: 48.6 - 11.16,
            width: 22.32,
            height: 22.32,
            borderRadius: '50%',
            backgroundColor: '#F0997B',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
