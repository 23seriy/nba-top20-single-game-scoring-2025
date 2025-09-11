import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from 'remotion';
import { ScoringRecord } from '../types';
import { Watermark } from './Watermark';

interface EndScreenProps {
  topRecords: ScoringRecord[]; // Top 3-5 records for recap
  format: 'youtube' | 'shorts' | 'square';
}

export const EndScreen: React.FC<EndScreenProps> = ({ topRecords, format }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Animation timing
  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [15, 45], [0.8, 1], { extrapolateRight: 'clamp' });
  const statsReveal = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  const ctaReveal = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });
  const pulseAnimation = Math.sin(frame * 0.2) * 0.1 + 1;

  // Format-specific styling
  const getLayoutStyles = () => {
    switch (format) {
      case 'youtube':
        return {
          titleSize: '72px',
          subtitleSize: '36px',
          statSize: '28px',
          ctaSize: '48px',
          padding: '60px',
          spacing: '40px',
          layout: 'horizontal'
        };
      case 'shorts':
        return {
          titleSize: '56px',
          subtitleSize: '28px',
          statSize: '24px',
          ctaSize: '40px',
          padding: '40px',
          spacing: '30px',
          layout: 'vertical'
        };
      case 'square':
        return {
          titleSize: '48px',
          subtitleSize: '24px',
          statSize: '20px',
          ctaSize: '36px',
          padding: '30px',
          spacing: '25px',
          layout: 'compact'
        };
      default:
        return {
          titleSize: '48px',
          subtitleSize: '24px',
          statSize: '20px',
          ctaSize: '36px',
          padding: '30px',
          spacing: '25px',
          layout: 'compact'
        };
    }
  };

  const styles = getLayoutStyles();

  // Get top 3 records for recap
  const top3 = topRecords.slice(0, 3);

  return (
    <AbsoluteFill>
      {/* Background Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          opacity: fadeIn,
        }}
      />

      {/* NBA-themed background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 199, 44, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(200, 16, 46, 0.1) 0%, transparent 50%)
          `,
          opacity: fadeIn * 0.7,
        }}
      />

      {/* Main Content Container */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: styles.padding,
          opacity: fadeIn,
        }}
      >
        {/* Title Section */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: styles.spacing,
            transform: `scale(${titleScale})`,
          }}
        >
          <h1
            style={{
              fontSize: styles.titleSize,
              fontWeight: 'bold',
              color: '#FFC72C',
              margin: '0 0 20px 0',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              fontFamily: 'Arial Black, sans-serif',
            }}
          >
            🏀 LEGENDARY PERFORMANCES
          </h1>
          <p
            style={{
              fontSize: styles.subtitleSize,
              color: 'white',
              margin: 0,
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            The Greatest Single-Game Scoring Feats in NBA History
          </p>
        </div>

        {/* Top 3 Recap */}
        <div
          style={{
            display: 'flex',
            flexDirection: format === 'shorts' ? 'column' : 'row',
            gap: format === 'shorts' ? '20px' : '40px',
            marginBottom: styles.spacing,
            opacity: statsReveal,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {top3.map((record, index) => (
            <div
              key={record.rank}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                borderRadius: '15px',
                padding: format === 'shorts' ? '15px 25px' : '20px 30px',
                border: index === 0 ? '3px solid #FFC72C' : '2px solid rgba(255,255,255,0.3)',
                textAlign: 'center',
                minWidth: format === 'shorts' ? '280px' : '200px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  fontSize: index === 0 ? '36px' : '28px',
                  fontWeight: 'bold',
                  color: index === 0 ? '#FFC72C' : '#C8102E',
                  marginBottom: '8px',
                }}
              >
                #{record.rank}
              </div>
              <div
                style={{
                  fontSize: styles.statSize,
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                {record.points} POINTS
              </div>
              <div
                style={{
                  fontSize: format === 'shorts' ? '18px' : '16px',
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: '600',
                }}
              >
                {record.player}
              </div>
              <div
                style={{
                  fontSize: format === 'shorts' ? '14px' : '12px',
                  color: 'rgba(255,255,255,0.7)',
                  marginTop: '5px',
                }}
              >
                {record.date}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          style={{
            textAlign: 'center',
            opacity: ctaReveal,
            transform: `scale(${pulseAnimation})`,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #C8102E, #FFC72C)',
              borderRadius: '50px',
              padding: format === 'shorts' ? '20px 40px' : '25px 50px',
              marginBottom: '20px',
              boxShadow: '0 10px 30px rgba(200, 16, 46, 0.4)',
              border: '3px solid rgba(255,255,255,0.3)',
            }}
          >
            <p
              style={{
                fontSize: styles.ctaSize,
                fontWeight: 'bold',
                color: 'white',
                margin: 0,
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              🔔 SUBSCRIBE FOR MORE!
            </p>
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: format === 'shorts' ? 'column' : 'row',
              gap: '15px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '25px',
                padding: '12px 25px',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <span
                style={{
                  fontSize: format === 'shorts' ? '20px' : '18px',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                👍 LIKE if you enjoyed!
              </span>
            </div>
            
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '25px',
                padding: '12px 25px',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <span
                style={{
                  fontSize: format === 'shorts' ? '20px' : '18px',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                💬 Comment your favorite!
              </span>
            </div>
          </div>

          {/* Channel branding */}
          <div
            style={{
              marginTop: '30px',
              fontSize: format === 'shorts' ? '24px' : '20px',
              color: '#FFC72C',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            WHOOSH HOOPERS 🏀
          </div>
        </div>
      </div>

      {/* Watermark */}
      <Watermark />
    </AbsoluteFill>
  );
};
