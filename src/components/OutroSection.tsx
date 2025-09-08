import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from '@remotion/core';

interface OutroSectionProps {
  format: 'youtube' | 'shorts' | 'square';
}

export const OutroSection: React.FC<OutroSectionProps> = ({ format }) => {
  const frame = useCurrentFrame();

  // Animation timings
  const titleEnter = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const ctaEnter = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const subscribeEnter = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });

  // Format-specific styling
  const getLayoutStyles = () => {
    switch (format) {
      case 'youtube':
        return {
          title: { fontSize: '96px', marginBottom: '40px' },
          cta: { fontSize: '42px', marginBottom: '30px' },
          subscribe: { fontSize: '36px' }
        };
      case 'shorts':
        return {
          title: { fontSize: '64px', marginBottom: '25px' },
          cta: { fontSize: '28px', marginBottom: '20px' },
          subscribe: { fontSize: '24px' }
        };
      case 'square':
        return {
          title: { fontSize: '72px', marginBottom: '30px' },
          cta: { fontSize: '32px', marginBottom: '25px' },
          subscribe: { fontSize: '28px' }
        };
    }
  };

  const styles = getLayoutStyles();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f3460, #16213e, #1a1a2e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: format === 'youtube' ? '80px' : '60px',
        textAlign: 'center',
      }}
    >
      {/* Main Title */}
      <div
        style={{
          ...styles.title,
          color: '#FFD700',
          fontWeight: 'bold',
          textShadow: '4px 4px 8px rgba(0,0,0,0.7)',
          opacity: titleEnter,
          transform: `scale(${0.8 + titleEnter * 0.2})`,
        }}
      >
        WILT'S 100!
      </div>

      {/* CTA Text */}
      <div
        style={{
          ...styles.cta,
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          opacity: ctaEnter,
          maxWidth: format === 'youtube' ? '1000px' : '700px',
          lineHeight: '1.3',
        }}
      >
        Which performance surprised you the most?
        <br />
        Drop your thoughts in the comments! 👇
      </div>

      {/* Subscribe CTA */}
      <div
        style={{
          ...styles.subscribe,
          color: '#FFD700',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          opacity: subscribeEnter,
          transform: `translateY(${(1 - subscribeEnter) * 20}px)`,
        }}
      >
        🔔 SUBSCRIBE for more NBA history! 🔔
      </div>

      {/* Animated Elements */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '60px',
          opacity: subscribeEnter,
        }}
      >
        🏀 🏆 🏀
      </div>
    </AbsoluteFill>
  );
};
