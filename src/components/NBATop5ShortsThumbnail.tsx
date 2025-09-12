import React from 'react';
import { ScoringRecord } from '../types';

interface NBATop5ShortsThumbnailProps {
  records?: ScoringRecord[];
  format?: 'shorts';
}

export const NBATop5ShortsThumbnail: React.FC<NBATop5ShortsThumbnailProps> = ({ 
  records = [],
  format = 'shorts'
}) => {
  // Get top 3 players for Shorts thumbnail
  const topPlayers = records.slice(0, 3);
  
  // Get player images for overlay
  const getPlayerImage = (imageName: string): string => {
    try {
      return require(`../assets/players/thumbnail_images/${imageName}`);
    } catch (error) {
      console.log(`Player image not found: ${imageName}`);
      return '';
    }
  };
  
  const wiltImage = getPlayerImage('wilt_chamberlain.jpg');
  const kobeImage = getPlayerImage('kobe_bryant.jpg');
  const lukaDoncicImage = getPlayerImage('luka_doncic.jpg');

  // Dynamic text color system for Shorts thumbnails
  const getTextColors = () => {
    return {
      mainTitle: {
        color: '#FFFFFF',
        shadow: `0 0 40px rgba(255, 107, 53, 0.9), 0 0 80px rgba(255, 107, 53, 0.5), 6px 6px 15px rgba(0,0,0,0.9)`,
        stroke: '#FF6B35'
      },
      subtitle: {
        color: '#FFD700',
        shadow: `0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4), 4px 4px 10px rgba(0,0,0,0.8)`,
        stroke: '#B8860B'
      },
      cta: {
        color: '#FF6B35',
        shadow: `0 0 25px rgba(255, 107, 53, 0.9), 0 0 50px rgba(255, 107, 53, 0.5), 3px 3px 8px rgba(0,0,0,0.8)`,
        stroke: '#CC5429'
      }
    };
  };

  const textColors = getTextColors();
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      fontFamily: 'Arial Black, Arial, sans-serif',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #C8102E 0%, #1D428A 50%, #000000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 30px'
    }}>
      {/* CSS Animation Keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.9; }
            100% { transform: scale(1.08); opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* Top Section - Title */}
      <div style={{
        textAlign: 'center',
        zIndex: 3
      }}>
        {/* Main Title */}
        <div style={{
          fontSize: '110px',
          fontWeight: '900',
          color: textColors.mainTitle.color,
          textShadow: textColors.mainTitle.shadow,
          WebkitTextStroke: `3px ${textColors.mainTitle.stroke}`,
          marginBottom: '20px',
          textAlign: 'center',
          letterSpacing: '-3px',
          textTransform: 'uppercase',
          filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.6))',
          background: `linear-gradient(45deg, ${textColors.mainTitle.color}, rgba(255,255,255,0.8))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '0.9'
        }}>
          TOP 5
        </div>
      
        {/* Subtitle */}
        <div style={{
          fontSize: '65px',
          fontWeight: 'bold',
          color: textColors.subtitle.color,
          textShadow: textColors.subtitle.shadow,
          WebkitTextStroke: `2px ${textColors.subtitle.stroke}`,
          textAlign: 'center',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))',
          background: `linear-gradient(45deg, ${textColors.subtitle.color}, rgba(255,215,0,0.7))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: '1'
        }}>
          SINGLE GAME
        </div>

        {/* Points Emphasis */}
        <div style={{
          fontSize: '55px',
          fontWeight: 'bold',
          color: textColors.subtitle.color,
          textShadow: textColors.subtitle.shadow,
          WebkitTextStroke: `1px ${textColors.subtitle.stroke}`,
          textAlign: 'center',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginTop: '10px',
          background: `linear-gradient(45deg, ${textColors.subtitle.color}, rgba(255,215,0,0.7))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          SCORING
        </div>
      </div>

      {/* Middle Section - Player Images */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        zIndex: 2,
        animation: 'float 3s ease-in-out infinite'
      }}>
        {/* Wilt Chamberlain - Center (Largest) */}
        {wiltImage && (
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 0 6px rgba(255,255,255,0.3)',
            position: 'relative',
            border: '4px solid #FFD700'
          }}>
            <img 
              src={wiltImage} 
              alt="Wilt Chamberlain"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              backgroundColor: '#1D428A',
              color: 'white',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              border: '3px solid white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
            }}>
              #1
            </div>
          </div>
        )}
        
        {/* Kobe Bryant - Left */}
        {kobeImage && (
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.2)',
            position: 'relative',
            border: '3px solid #552583',
            transform: 'translateY(40px)'
          }}>
            <img 
              src={kobeImage} 
              alt="Kobe Bryant"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              backgroundColor: '#552583',
              color: 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>
              #2
            </div>
          </div>
        )}

        {/* Luka Dončić - Right */}
        {lukaDoncicImage && (
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.2)',
            position: 'relative',
            border: '3px solid #00538C',
            transform: 'translateY(40px)'
          }}>
            <img 
              src={lukaDoncicImage} 
              alt="Luka Dončić"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              backgroundColor: '#00538C',
              color: 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>
              #4
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section - Call to Action */}
      <div style={{
        textAlign: 'center',
        zIndex: 3
      }}>
        <div style={{
          fontSize: '48px',
          color: textColors.cta.color,
          textShadow: textColors.cta.shadow,
          WebkitTextStroke: `2px ${textColors.cta.stroke}`,
          fontWeight: '900',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
          background: `linear-gradient(45deg, ${textColors.cta.color}, rgba(255,107,53,0.8))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'pulse 2.5s ease-in-out infinite alternate'
        }}>
          WATCH NOW! 🏀
        </div>
      </div>
    </div>
  );
};
