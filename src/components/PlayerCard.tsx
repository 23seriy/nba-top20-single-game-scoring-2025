import React, { useState, useEffect } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { ScoringRecord } from '../types';

interface PlayerCardProps {
  record: ScoringRecord;
  format: 'youtube' | 'shorts' | 'square';
  showGameFootage?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ record, format, showGameFootage = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [imageError, setImageError] = useState(false);
  const [gameImageError, setGameImageError] = useState(false);

  // Validate record data to prevent NaN values
  const safeRecord = {
    ...record,
    rank: Number(record.rank) || 1,
    points: Number(record.points) || 0,
    player: String(record.player || 'Unknown Player'),
    date: String(record.date || 'Unknown Date'),
    opponent: String(record.opponent || 'Unknown Opponent'),
    venue: String(record.venue || 'Unknown Venue'),
    context: String(record.context || 'No context available'),
    teamColors: {
      primary: String(record.teamColors?.primary || '#1D428A'),
      secondary: String(record.teamColors?.secondary || '#FFC72C')
    }
  };

  // Animation timing with safe frame values
  const safeFrame = Number(frame) || 0;
  const cardEnter = interpolate(safeFrame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textReveal = interpolate(safeFrame, [15, 45], [0, 1], { extrapolateRight: 'clamp' });
  const pointsReveal = interpolate(safeFrame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });

  // Local fallback component for player images
  const PlayerImageFallback = ({ initials, colors }: { initials: string; colors: { primary: string; secondary: string } }) => (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: format === 'youtube' ? '120px' : format === 'shorts' ? '80px' : '100px',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      {initials}
    </div>
  );

  // Get player initials for fallback
  const getPlayerInitials = (name: string): string => {
    try {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    } catch (error) {
      console.error('Error getting player initials:', error);
      return 'NBA';
    }
  };

  // Format-specific styling
  const getLayoutStyles = () => {
    switch (format) {
      case 'youtube':
        return {
          container: { flexDirection: 'row' as const, padding: '60px' },
          imageContainer: { width: '500px', height: '500px', marginRight: '80px' },
          textContainer: { flex: 1, justifyContent: 'center' as const },
          playerName: { fontSize: '72px', marginBottom: '20px' },
          points: { fontSize: '120px', marginBottom: '30px' },
          details: { fontSize: '36px', lineHeight: '1.4' },
          rank: { fontSize: '180px', position: 'absolute' as const, top: '40px', right: '60px' }
        };
      case 'shorts':
        return {
          container: { flexDirection: 'column' as const, padding: '40px', alignItems: 'center' as const },
          imageContainer: { width: '300px', height: '300px', marginBottom: '40px' },
          textContainer: { width: '100%', alignItems: 'center' as const },
          playerName: { fontSize: '48px', marginBottom: '15px', textAlign: 'center' as const },
          points: { fontSize: '80px', marginBottom: '20px' },
          details: { fontSize: '24px', lineHeight: '1.3', textAlign: 'center' as const },
          rank: { fontSize: '120px', position: 'absolute' as const, top: '20px', right: '30px' }
        };
      case 'square':
        return {
          container: { flexDirection: 'column' as const, padding: '50px', alignItems: 'center' as const },
          imageContainer: { width: '350px', height: '350px', marginBottom: '30px' },
          textContainer: { width: '100%', alignItems: 'center' as const },
          playerName: { fontSize: '54px', marginBottom: '15px', textAlign: 'center' as const },
          points: { fontSize: '90px', marginBottom: '25px' },
          details: { fontSize: '28px', lineHeight: '1.3', textAlign: 'center' as const },
          rank: { fontSize: '140px', position: 'absolute' as const, top: '30px', right: '40px' }
        };
    }
  };

  const styles = getLayoutStyles();

  try {
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
          ...styles.container,
          opacity: cardEnter,
          transform: `scale(${0.8 + cardEnter * 0.2})`,
        }}
      >
        {/* Rank Number */}
        <div
          style={{
            ...styles.rank,
            color: safeRecord.teamColors.secondary,
            fontWeight: 'bold',
            textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
            opacity: textReveal,
          }}
        >
          #{safeRecord.rank}
        </div>

        {/* Player Image Container */}
        <div
          style={{
            ...styles.imageContainer,
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `6px solid ${safeRecord.teamColors.primary}`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <PlayerImageFallback
            initials={getPlayerInitials(safeRecord.player)}
            colors={safeRecord.teamColors}
          />
        </div>

        {/* Text Content */}
        <div
          style={{
            ...styles.textContainer,
            display: 'flex',
            flexDirection: 'column',
            opacity: textReveal,
          }}
        >
          {/* Player Name */}
          <div
            style={{
              ...styles.playerName,
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            }}
          >
            {safeRecord.player}
          </div>

          {/* Points */}
          <div
            style={{
              ...styles.points,
              color: safeRecord.teamColors.secondary,
              fontWeight: 'bold',
              textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
              opacity: pointsReveal,
              transform: `scale(${0.8 + pointsReveal * 0.2})`,
            }}
          >
            {safeRecord.points} POINTS
          </div>

          {/* Game Details */}
          <div
            style={{
              ...styles.details,
              color: 'rgba(255,255,255,0.9)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <strong>{safeRecord.date}</strong>
            </div>
            <div style={{ marginBottom: '10px' }}>
              vs {safeRecord.opponent}
            </div>
            <div style={{ marginBottom: '10px' }}>
              {safeRecord.venue}
            </div>
            <div style={{ 
              fontStyle: 'italic',
              color: safeRecord.teamColors.secondary,
              fontSize: format === 'youtube' ? '32px' : format === 'shorts' ? '22px' : '26px'
            }}>
              {safeRecord.context}
            </div>
          </div>
        </div>

        {/* Game Image Overlay (if showing game footage) */}
        {showGameFootage && (
          <div
            style={{
              position: 'absolute',
              bottom: format === 'youtube' ? '60px' : '40px',
              right: format === 'youtube' ? '60px' : '40px',
              width: format === 'youtube' ? '300px' : '200px',
              height: format === 'youtube' ? '200px' : '130px',
              borderRadius: '15px',
              overflow: 'hidden',
              border: `3px solid ${safeRecord.teamColors.primary}`,
              boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
              opacity: interpolate(safeFrame, [60, 90], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${safeRecord.teamColors.primary}, ${safeRecord.teamColors.secondary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: format === 'youtube' ? '24px' : '16px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              GAME<br/>FOOTAGE
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error rendering PlayerCard:', error);
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
          textAlign: 'center',
        }}
      >
        Error loading player #{safeRecord.rank}
      </div>
    );
  }
};
