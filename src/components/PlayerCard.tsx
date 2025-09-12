import React, { useState } from 'react';
import { AbsoluteFill, useVideoConfig, staticFile, Img, useCurrentFrame, interpolate, Audio } from 'remotion';
import { Watermark } from './Watermark';
import { ScoringRecord } from '../types';
import { getCardNumberAudioPath } from '../utils/audioUtils';

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

  // Dynamic text color system based on team colors
  const getTextColors = () => {
    const primaryRgb = {
      r: parseInt(safeRecord.teamColors.primary.slice(1, 3), 16),
      g: parseInt(safeRecord.teamColors.primary.slice(3, 5), 16),
      b: parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)
    };
    
    const secondaryRgb = {
      r: parseInt(safeRecord.teamColors.secondary.slice(1, 3), 16),
      g: parseInt(safeRecord.teamColors.secondary.slice(3, 5), 16),
      b: parseInt(safeRecord.teamColors.secondary.slice(5, 7), 16)
    };

    // Calculate luminance for better contrast decisions
    const getLuminance = (rgb: {r: number, g: number, b: number}) => {
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const primaryLum = getLuminance(primaryRgb);
    const secondaryLum = getLuminance(secondaryRgb);

    return {
      // Rank number - bright white with team color glow
      rankText: '#FFFFFF',
      rankGlow: `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.8)`,
      
      // Player name - warm white with subtle team tint
      playerName: `rgba(${255 - primaryRgb.r * 0.1}, ${255 - primaryRgb.g * 0.1}, ${255 - primaryRgb.b * 0.1}, 0.98)`,
      
      // Points - dynamic based on team colors
      pointsText: primaryLum > 0.5 ? '#FFFFFF' : `rgba(${Math.min(255, primaryRgb.r + 100)}, ${Math.min(255, primaryRgb.g + 100)}, ${Math.min(255, primaryRgb.b + 100)}, 0.95)`,
      pointsGlow: `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.6)`,
      
      // Details - soft white with team accent
      detailsText: 'rgba(255, 255, 255, 0.92)',
      detailsAccent: `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.85)`,
      
      // Context - team secondary color with enhanced visibility
      contextText: secondaryLum > 0.3 ? 
        `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.9)` : 
        `rgba(${Math.min(255, secondaryRgb.r + 80)}, ${Math.min(255, secondaryRgb.g + 80)}, ${Math.min(255, secondaryRgb.b + 80)}, 0.9)`
    };
  };

  const textColors = getTextColors();

  // Get card number audio
  const cardNumberAudio = getCardNumberAudioPath(safeRecord.rank);
  
  // Debug audio path
  console.log(`Card number audio for rank ${safeRecord.rank}:`, cardNumberAudio);

  // Animation timing with safe frame values and smooth easing
  const safeFrame = Number(frame) || 0;
  const cardEnter = interpolate(safeFrame, [0, 45], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3) // ease-out cubic
  });
  const textReveal = interpolate(safeFrame, [20, 60], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => t * t * (3 - 2 * t) // smooth step
  });
  const pointsReveal = interpolate(safeFrame, [40, 80], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 4) // ease-out quart
  });
  const floatAnimation = Math.sin(safeFrame * 0.05) * 2; // Subtle floating effect

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
      <AbsoluteFill>
        {/* Card Number Audio - Play immediately when card appears */}
        {cardNumberAudio && (
          <Audio
            src={cardNumberAudio}
            startFrom={0} // Start immediately when PlayerCard sequence begins
            endAt={60} // Play for 2 seconds (60 frames at 30fps)
            volume={1.0}
          />
        )}
        
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, 
              rgba(${parseInt(safeRecord.teamColors.primary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)}, 0.15),
              rgba(${parseInt(safeRecord.teamColors.secondary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.secondary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.secondary.slice(5, 7), 16)}, 0.1),
              rgba(26, 26, 46, 0.95)
            )`,
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
              0 20px 40px rgba(0,0,0,0.4),
              inset 0 1px 0 rgba(255,255,255,0.1)
            `,
            display: 'flex',
            ...styles.container,
            opacity: cardEnter,
            transform: `translateY(${20 - cardEnter * 20 + floatAnimation}px) scale(${0.95 + cardEnter * 0.05})`,
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
        {/* Rank Number - Top Right with Glass Card */}
        <div
          style={{
            position: 'absolute',
            top: format === 'youtube' ? '30px' : '30px',
            right: format === 'youtube' ? '30px' : '30px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: format === 'youtube' ? '20px 30px' : '15px 20px',
            opacity: textReveal,
            transform: `translateY(${30 - textReveal * 30}px) scale(${0.8 + textReveal * 0.2})`,
          }}
        >
          <div
            style={{
              fontSize: format === 'youtube' ? '72px' : format === 'shorts' ? '64px' : '48px',
              fontWeight: '200',
              color: textColors.rankText,
              textShadow: `
                0 0 20px ${textColors.rankGlow},
                0 2px 4px rgba(0,0,0,0.8),
                0 0 40px ${textColors.rankGlow}
              `,
              lineHeight: '1',
              letterSpacing: '-2px',
            }}
          >
            #{safeRecord.rank}
          </div>
        </div>

        {/* Player Image Container */}
        <div
          style={{
            ...styles.imageContainer,
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `4px solid rgba(255, 255, 255, 0.3)`,
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.3),
              0 0 0 2px rgba(${parseInt(safeRecord.teamColors.primary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)}, 0.4)
            `,
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
          {/* Player Name with Glass Card */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(15px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: format === 'youtube' ? '15px 25px' : '10px 20px',
              marginBottom: '15px',
              transform: `translateY(${20 - textReveal * 20}px)`,
            }}
          >
            <div
              style={{
                ...styles.playerName,
                color: textColors.playerName,
                fontWeight: '300',
                letterSpacing: '1px',
                textShadow: `
                  0 2px 8px rgba(0,0,0,0.7),
                  0 0 15px ${textColors.rankGlow}
                `,
                margin: 0,
              }}
            >
              {safeRecord.player}
            </div>
          </div>

          {/* Points with Enhanced Glass Card */}
          <div
            style={{
              background: `linear-gradient(135deg, 
                rgba(${parseInt(safeRecord.teamColors.primary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)}, 0.2),
                rgba(${parseInt(safeRecord.teamColors.secondary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.secondary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.secondary.slice(5, 7), 16)}, 0.1)
              )`,
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: `1px solid rgba(${parseInt(safeRecord.teamColors.primary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)}, 0.3)`,
              padding: format === 'youtube' ? '20px 30px' : '15px 25px',
              opacity: pointsReveal,
              transform: `translateY(${30 - pointsReveal * 30}px) scale(${0.9 + pointsReveal * 0.1})`,
            }}
          >
            <div
              style={{
                ...styles.points,
                color: textColors.pointsText,
                fontWeight: '200',
                letterSpacing: '2px',
                textShadow: `
                  0 0 20px ${textColors.pointsGlow},
                  0 3px 6px rgba(0,0,0,0.8),
                  0 0 30px ${textColors.pointsGlow}
                `,
                margin: 0,
              }}
            >
              {safeRecord.points} POINTS
            </div>
          </div>

          {/* Game Details with Glass Card */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: format === 'youtube' ? '20px' : '15px',
              marginTop: '15px',
              transform: `translateY(${25 - textReveal * 25}px)`,
            }}
          >
            <div
              style={{
                ...styles.details,
                color: textColors.detailsText,
                textShadow: `
                  0 1px 3px rgba(0,0,0,0.7),
                  0 0 8px ${textColors.detailsAccent}
                `,
                margin: 0,
              }}
            >
              <div style={{ 
                marginBottom: '8px',
                fontWeight: '300',
                letterSpacing: '0.5px',
                color: textColors.detailsAccent
              }}>
                <strong>{safeRecord.date}</strong>
              </div>
              <div style={{ 
                marginBottom: '8px',
                fontWeight: '300',
                color: textColors.detailsText
              }}>
                vs {safeRecord.opponent}
              </div>
              <div style={{ 
                marginBottom: '12px',
                fontWeight: '300',
                opacity: 0.85,
                color: textColors.detailsText
              }}>
                {safeRecord.venue}
              </div>
              <div style={{ 
                fontStyle: 'italic',
                fontWeight: '200',
                color: textColors.contextText,
                fontSize: format === 'youtube' ? '28px' : format === 'shorts' ? '20px' : '24px',
                textShadow: `
                  0 0 15px ${textColors.contextText},
                  0 2px 4px rgba(0,0,0,0.6)
                `
              }}>
                {safeRecord.context}
              </div>
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
              border: `2px solid rgba(255, 255, 255, 0.2)`,
              boxShadow: `
                0 8px 32px rgba(0,0,0,0.3),
                0 0 0 1px rgba(${parseInt(safeRecord.teamColors.primary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)}, 0.5)
              `,
              opacity: interpolate(safeFrame, [60, 90], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, 
                  rgba(${parseInt(safeRecord.teamColors.primary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.primary.slice(5, 7), 16)}, 0.8),
                  rgba(${parseInt(safeRecord.teamColors.secondary.slice(1, 3), 16)}, ${parseInt(safeRecord.teamColors.secondary.slice(3, 5), 16)}, ${parseInt(safeRecord.teamColors.secondary.slice(5, 7), 16)}, 0.6)
                )`,
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
      </AbsoluteFill>
    );
  } catch (error) {
    console.error('Error in PlayerCard:', error);
    return (
      <AbsoluteFill>
        {/* Card Number Audio - Play immediately when card appears */}
        {cardNumberAudio && (
          <Audio
            src={cardNumberAudio}
            startFrom={0} // Start immediately when PlayerCard sequence begins
            endAt={60} // Play for 2 seconds (60 frames at 30fps)
            volume={1.0}
          />
        )}
        
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
      </AbsoluteFill>
    );
  }
};
