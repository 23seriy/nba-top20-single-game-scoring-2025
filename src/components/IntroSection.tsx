import React from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from '@remotion/core';

interface IntroSectionProps {
  format: 'youtube' | 'shorts' | 'square';
}

export const IntroSection: React.FC<IntroSectionProps> = ({ format }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation timings
  const titleEnter = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleEnter = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const hookEnter = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });

  // Format-specific styling
  const getLayoutStyles = () => {
    switch (format) {
      case 'youtube':
        return {
          title: { fontSize: '120px', marginBottom: '30px' },
          subtitle: { fontSize: '48px', marginBottom: '40px' },
          hook: { fontSize: '36px', lineHeight: '1.4' }
        };
      case 'shorts':
        return {
          title: { fontSize: '72px', marginBottom: '20px' },
          subtitle: { fontSize: '32px', marginBottom: '30px' },
          hook: { fontSize: '24px', lineHeight: '1.3' }
        };
      case 'square':
        return {
          title: { fontSize: '84px', marginBottom: '25px' },
          subtitle: { fontSize: '38px', marginBottom: '35px' },
          hook: { fontSize: '28px', lineHeight: '1.3' }
        };
    }
  };

  const styles = getLayoutStyles();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
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
          transform: `translateY(${(1 - titleEnter) * 50}px)`,
        }}
      >
        TOP 20
      </div>

      {/* Subtitle */}
      <div
        style={{
          ...styles.subtitle,
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          opacity: subtitleEnter,
          transform: `translateY(${(1 - subtitleEnter) * 30}px)`,
        }}
      >
        SINGLE GAME SCORING PERFORMANCES
      </div>

      {/* Hook Text */}
      <div
        style={{
          ...styles.hook,
          color: 'rgba(255,255,255,0.9)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          opacity: hookEnter,
          transform: `translateY(${(1 - hookEnter) * 20}px)`,
          maxWidth: format === 'youtube' ? '1200px' : '800px',
        }}
      >
        From modern era explosions to Wilt Chamberlain's legendary dominance...
        <br />
        <span style={{ color: '#FFD700', fontWeight: 'bold' }}>
          Including the IMPOSSIBLE 100-point game!
        </span>
      </div>

      {/* Animated Basketball */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          fontSize: '80px',
          opacity: hookEnter,
          transform: `rotate(${frame * 2}deg)`,
        }}
      >
        🏀
      </div>
    </div>
  );
};
