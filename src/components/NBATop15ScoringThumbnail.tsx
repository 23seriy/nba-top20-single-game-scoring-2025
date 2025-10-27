import React, { useState } from 'react';
import { ScoringRecord } from '../types';

interface NBATop15ScoringThumbnailProps {
  records?: ScoringRecord[];
  format?: 'youtube' | 'square';
}

export const NBATop15ScoringThumbnail: React.FC<NBATop15ScoringThumbnailProps> = ({ 
  records = [],
  format = 'youtube'
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Only show thumbnail for YouTube format
  if (format !== 'youtube') {
    return null;
  }

  // Whoosh Hoopers brand colors
  const whooshPink = '#FF4D9E';
  const whooshCream = '#FFFDD0';

  // Get Wilt Chamberlain image
  const getWiltImage = (): string => {
    try {
      return require(`../assets/players/thumbnail_images/wilt_chamberlain.jpg`);
    } catch (error) {
      console.log('Wilt Chamberlain image not found');
      return '';
    }
  };

  const wiltImage = getWiltImage();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      {/* Pink-Purple Gradient Background - Brand Consistency */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #FF4D9E 0%, #8B3A8B 100%)'
      }} />

      {/* Dark overlay for depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)'
      }} />

      {/* WILT CHAMBERLAIN IMAGE */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}>
        {wiltImage && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <img
              src={wiltImage}
              alt="Wilt Chamberlain"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center center',
                filter: `
                  drop-shadow(0 0 40px ${whooshPink}80) 
                  drop-shadow(0 0 80px #FF000060)
                  contrast(1.2) 
                  saturate(1.3)
                `,
              }}
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>

      {/* MASSIVE DRAMATIC "LEGEND" TEXT */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 260,
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontWeight: 'bold',
            color: '#FFFDD0',
            textAlign: 'center',
            textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.7), 0 0 60px rgba(255,255,255,0.5), 6px 6px 12px rgba(0,0,0,0.8)',
            letterSpacing: '4px',
            lineHeight: 0.105,
            transform: 'perspective(500px) rotateX(5deg) translateY(80px)',
            zIndex: 100,
          }}
        >
          LEGEND
        </div>
      </div>
    </div>
  );
};
