import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface VintageRetroCourtProps {
  size?: number;
}

export const VintageRetroCourt: React.FC<VintageRetroCourtProps> = ({ 
  size = 400 
}) => {
  const frame = useCurrentFrame();

  // Subtle glow pulse
  const glowPulse = interpolate(
    Math.sin((frame / 50) * Math.PI * 2),
    [-1, 1],
    [0.8, 1]
  );

  // Clean 80s/90s color palette
  const retroPink = '#FF1493';
  const retroCyan = '#00FFFF';
  const retroPurple = '#8A2BE2';
  const retroGold = '#FFD700';
  const darkBg = '#0F0F23';
  const neonWhite = '#FFFFFF';

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: darkBg,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 40% 30%, ${retroPurple}40, ${darkBg})`,
        border: `4px solid ${retroPink}`,
        boxShadow: `0 0 20px ${retroPink}60`
      }}
    >
      {/* Three-point arc with neon glow */}
      <div
        style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          border: `3px solid ${retroCyan}`,
          borderRadius: '50%',
          borderTop: 'transparent',
          borderLeft: 'transparent',
          borderRight: 'transparent',
          transform: 'rotate(180deg)',
          opacity: glowPulse,
          boxShadow: `0 0 15px ${retroCyan}`
        }}
      />

      {/* Center circle */}
      <div
        style={{
          position: 'absolute',
          width: '35%',
          height: '35%',
          border: `2px solid ${retroGold}`,
          borderRadius: '50%',
          opacity: glowPulse * 0.9,
          boxShadow: `0 0 10px ${retroGold}`
        }}
      />

      {/* Basketball hoop */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30%',
          height: '5px',
          backgroundColor: retroPink,
          borderRadius: '3px',
          opacity: glowPulse,
          boxShadow: `0 0 12px ${retroPink}`
        }}
      />

      {/* Basketball */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12%',
          height: '12%',
          backgroundColor: retroGold,
          borderRadius: '50%',
          boxShadow: `0 0 10px ${retroGold}80`
        }}
      />

      {/* Brand text with neon effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          color: neonWhite,
          fontSize: size * 0.08,
          fontWeight: 800,
          fontFamily: 'Impact, Arial Black, sans-serif',
          letterSpacing: '2px',
          textShadow: `
            0 0 15px ${retroCyan},
            0 0 25px ${retroCyan}60,
            2px 2px 4px rgba(0,0,0,0.8)
          `,
          textTransform: 'uppercase'
        }}
      >
        WHOOSH
      </div>

      {/* Retro accent lines */}
      {[0, 1, 2, 3].map((corner) => {
        const angle = corner * 90 + frame * 0.5;
        const cornerX = corner < 2 ? '20%' : '80%';
        const cornerY = corner % 2 === 0 ? '20%' : '80%';
        const colors = [retroPink, retroCyan, retroPurple, retroGold];
        
        return (
          <div
            key={corner}
            style={{
              position: 'absolute',
              left: cornerX,
              top: cornerY,
              width: '15%',
              height: '2px',
              backgroundColor: colors[corner],
              borderRadius: '1px',
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              opacity: glowPulse * 0.7,
              boxShadow: `0 0 6px ${colors[corner]}`
            }}
          />
        );
      })}
    </div>
  );
};
