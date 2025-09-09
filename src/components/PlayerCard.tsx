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
  const [logoError, setLogoError] = useState(false);

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
        fontSize: format === 'youtube' ? '120px' : format === 'shorts' ? '200px' : '200px',
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

  // Generate image filename from player name and rank
  const getPlayerImagePath = (playerName: string, rank: number): string => {
    try {
      const slug = playerName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim();
      const rankPadded = rank.toString().padStart(2, '0'); // 01, 02, etc.
      
      // Import the image directly from src/assets
      try {
        const imagePath = require(`../assets/players/${rankPadded}-${slug}.jpg`);
        console.log(`Loaded image for ${playerName} (rank ${rank}):`, imagePath);
        return imagePath;
      } catch (requireError) {
        console.log(`No image found for ${playerName}, using fallback`);
        return '';
      }
    } catch (error) {
      console.error('Error generating image path:', error);
      return '';
    }
  };

  // Get team initials for logo fallback
  const getTeamInitials = (teamName: string): string => {
    try {
      // Handle special cases first
      const specialCases: { [key: string]: string } = {
        'Los Angeles Lakers': 'LAL',
        'Philadelphia Warriors': 'PHW',
        'San Francisco Warriors': 'SFW',
        'Dallas Mavericks': 'DAL',
        'Denver Nuggets': 'DEN',
        'Portland Trail Blazers': 'POR',
        'Cleveland Cavaliers': 'CLE',
        'San Antonio Spurs': 'SAS',
        'Philadelphia 76ers': 'PHI',
        'Phoenix Suns': 'PHX',
        'New York Knicks': 'NYK',
        'Toronto Raptors': 'TOR',
        'Atlanta Hawks': 'ATL',
        'Houston Rockets': 'HOU',
        'Chicago Bulls': 'CHI',
        'Los Angeles Clippers': 'LAC',
        'Boston Celtics': 'BOS',
        'Detroit Pistons': 'DET',
        'Chicago Packers': 'CHI',
        'Syracuse Nationals': 'SYR'
      };

      if (specialCases[teamName]) {
        return specialCases[teamName];
      }

      // Default: take first letter of each word
      return teamName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 3);
    } catch (error) {
      console.error('Error getting team initials:', error);
      return 'NBA';
    }
  };

  // Generate team logo path with fallback support for .svg and .jpg
  const getTeamLogoPath = (teamName: string): string => {
    try {
      const slug = teamName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .trim();
      
      // Try SVG first, then JPG as fallback
      try {
        const logoPath = require(`../assets/logos/${slug}.svg`);
        console.log(`Loaded SVG logo for ${teamName}:`, logoPath);
        return logoPath;
      } catch (svgError) {
        try {
          const logoPath = require(`../assets/logos/${slug}.jpg`);
          console.log(`Loaded JPG logo for ${teamName}:`, logoPath);
          return logoPath;
        } catch (jpgError) {
          console.log(`No logo found for ${teamName} (tried .svg and .jpg), using fallback`);
          return '';
        }
      }
    } catch (error) {
      console.error('Error generating logo path:', error);
      return '';
    }
  };

  // Team logo fallback component
  const TeamLogoFallback = ({ teamName, colors }: { teamName: string; colors: { primary: string; secondary: string } }) => {
    const initials = getTeamInitials(teamName);
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: format === 'youtube' ? '24px' : format === 'shorts' ? '46px' : '30px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          border: '2px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        {initials}
      </div>
    );
  };

  // Format-specific styling
  const getLayoutStyles = () => {
    switch (format) {
      case 'youtube':
        return {
          container: { flexDirection: 'row' as const, padding: '60px' },
          imageContainer: { width: '600px', height: '600px', marginRight: '80px', marginTop: '200px' },
          textContainer: { flex: 1, justifyContent: 'center' as const },
          playerName: { fontSize: '72px', marginBottom: '20px' },
          points: { fontSize: '120px', marginBottom: '30px' },
          details: { fontSize: '36px', lineHeight: '1.4' },
          rank: { fontSize: '180px', position: 'absolute' as const, top: '40px', right: '60px' }
        };
      case 'shorts':
        return {
          container: { flexDirection: 'column' as const, padding: '20px', alignItems: 'center' as const },
          imageContainer: { width: '700px', height: '700px', marginBottom: '200px', marginTop: '300px' },
          textContainer: { width: '100%', alignItems: 'center' as const },
          playerName: { fontSize: '68px', marginBottom: '15px', textAlign: 'center' as const },
          points: { fontSize: '90px', marginBottom: '20px' },
          details: { fontSize: '44px', lineHeight: '1.3', textAlign: 'center' as const },
          rank: { fontSize: '140px', position: 'absolute' as const, top: '20px', right: '30px' }
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
  
  // Generate the image path
  const imagePath = getPlayerImagePath(safeRecord.player, safeRecord.rank);
  
  // Debug logging
  console.log(`PlayerCard for ${safeRecord.player} (rank ${safeRecord.rank}):`, {
    playerImage: safeRecord.playerImage,
    imageError,
    generatedPath: imagePath,
    willShowImage: safeRecord.playerImage || !imageError
  });

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
        {/* Team Logo - Top Left Corner */}
        <div
          style={{
            position: 'absolute',
            top: format === 'youtube' ? '30px' : '30px',
            left: format === 'youtube' ? '30px' : '30px',
            width: format === 'youtube' ? '200px' : format === 'shorts' ? '200px' : '150px',
            height: format === 'youtube' ? '200px' : format === 'shorts' ? '200px' : '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            opacity: textReveal,
            transform: `scale(${0.8 + textReveal * 0.2})`,
            zIndex: 10,
          }}
        >
          {getTeamLogoPath(safeRecord.team) && !logoError ? (
            <img
              src={getTeamLogoPath(safeRecord.team)}
              alt={`${safeRecord.team} logo`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                console.error(`Failed to load logo for ${safeRecord.team}:`, e.currentTarget.src);
                setLogoError(true);
              }}
            />
          ) : (
            <TeamLogoFallback
              teamName={safeRecord.team}
              colors={safeRecord.teamColors}
            />
          )}
        </div>
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
          {safeRecord.playerImage || !imageError ? (
            <img
              src={safeRecord.playerImage || imagePath}
              alt={safeRecord.player}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                console.error(`Failed to load image for ${safeRecord.player} (rank ${safeRecord.rank}):`, e.currentTarget.src);
                setImageError(true);
              }}
            />
          ) : (
            <PlayerImageFallback
              initials={getPlayerInitials(safeRecord.player)}
              colors={safeRecord.teamColors}
            />
          )}

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
