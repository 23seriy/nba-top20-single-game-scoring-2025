import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';

type Variant = 'minimal' | 'hoop';

export const Watermark: React.FC<{
  variant?: Variant;
  initials?: string;
  shape?: 'circle' | 'rounded';
  cornerRadius?: number;
  fg?: string;
  bg?: string;
  ring?: string;
  ringPx?: number;
  showSeams?: boolean;
  seamsColor?: string;
  seamsOpacity?: number;
  seamsWidthPx?: number;
  strictAlpha?: boolean;
}> = ({
  variant = 'minimal',
  initials = 'WH',
  shape = 'circle',
  cornerRadius = 20,
  fg,
  bg,
  ring,
  ringPx = 2,
  showSeams = true,
  seamsColor = 'rgba(0,0,0,0.75)',
  seamsOpacity = 0.18,
  seamsWidthPx = 2,
  strictAlpha = true,
}) => {
  const {width, height} = useVideoConfig();
  const size = Math.min(width, height) * 0.08; // Smaller watermark for video
  const cx = size / 2;
  const cy = size / 2;

  const isHoop = variant === 'hoop';
  const textColor = fg ?? (isHoop ? '#fff' : '#111');
  const badgeBg   = bg ?? (isHoop ? '#E66E12' : 'rgba(255,255,255,0.96)');
  const borderCol = ring ?? (isHoop ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.25)');

  const fontSize = Math.round(size * 0.52);
  const textStrokePx = Math.max(1, Math.round(size * 0.025));
  const textStrokeColor = isHoop ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)';

  // basketball seams
  const seams = (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{position:'absolute', inset:0, opacity: seamsOpacity, pointerEvents:'none'}}
    >
      <g stroke={seamsColor} strokeWidth={seamsWidthPx} fill="none" strokeLinecap="round">
        <path d={`M -10 ${cy} Q ${cx} ${cy - size*0.18} ${size + 10} ${cy}`} />
        <path d={`M ${cx} -10 Q ${cx - size*0.18} ${cy} ${cx} ${size + 10}`} />
        <path d={`M -10 ${cy - size*0.32} Q ${cx} ${cy - size*0.02} ${size + 10} ${cy - size*0.32}`} />
        <path d={`M -10 ${cy + size*0.32} Q ${cx} ${cy + size*0.02} ${size + 10} ${cy + size*0.32}`} />
      </g>
    </svg>
  );

  // Hard circular mask to prevent any bleed outside the disc
  const maskEdgePx = 0.4;
  const radialMask = `radial-gradient(circle at 50% 50%, #000 ${size/2 - maskEdgePx}px, transparent ${size/2 - (maskEdgePx - 0.1)}px)`;

  // Simple transparent text watermark style like in highest-paid project
  const watermarkStyle: React.CSSProperties = {
    position: 'absolute',
    top: 50,
    left: 50,
    opacity: 0.7, // Semi-transparent
    fontSize: 29,
    fontWeight: 'bold',
    color: '#888888',
    fontFamily: 'Arial Black, sans-serif',
    zIndex: 1000,
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Subtle shadow for readability
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0, top: 0, width: size, height: size,
    display: 'grid', placeItems: 'center',
    borderRadius: shape === 'circle' ? '50%' : cornerRadius,
    background: badgeBg,
    boxShadow: strictAlpha ? undefined : '0 4px 18px rgba(0,0,0,0.18)',
    border: borderCol ? `${ringPx}px solid ${borderCol}` : undefined,
  };

  return (
    <div style={watermarkStyle}>
      WHOOSH HOOPERS
    </div>
  );
};
