import React from 'react';
import { ScoringRecord } from '../types';

interface NBATop15ScoringThumbnailProps {
  records?: ScoringRecord[];
  format?: 'youtube' | 'shorts' | 'square';
}

export const NBATop15ScoringThumbnail: React.FC<NBATop15ScoringThumbnailProps> = ({ 
  records = [],
  format = 'youtube'
}) => {
  // Get top 3 players for thumbnail
  const topPlayers = records.slice(0, 3);
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #FF6B35, #F7931E, #FFD23F)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Main Title */}
      <div style={{
        fontSize: '72px',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        NBA TOP 15
      </div>
      
      {/* Subtitle */}
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        SINGLE GAME SCORING
      </div>
      
      {/* Top 3 Preview */}
      {topPlayers.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {topPlayers.map((player, index) => (
            <div key={player.rank} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '20px',
              borderRadius: '15px',
              border: index === 0 ? '4px solid #FFD700' : '2px solid white'
            }}>
              {/* Player Image Placeholder */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: player.teamColors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {player.player.split(' ').map(n => n[0]).join('')}
              </div>
              
              {/* Points */}
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#FFD700'
              }}>
                {player.points}
              </div>
              
              {/* Player Name */}
              <div style={{
                fontSize: '16px',
                color: 'white',
                textAlign: 'center',
                maxWidth: '120px'
              }}>
                {player.player}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Call to Action */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        fontSize: '24px',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        fontWeight: 'bold'
      }}>
        WHO'S #1? 🏀
      </div>
    </div>
  );
};
