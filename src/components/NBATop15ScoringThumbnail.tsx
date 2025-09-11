import React from 'react';
import { ScoringRecord } from '../types';

interface NBATop15ScoringThumbnailProps {
  records?: ScoringRecord[];
  format?: 'youtube' | 'square';
}

export const NBATop15ScoringThumbnail: React.FC<NBATop15ScoringThumbnailProps> = ({ 
  records = [],
  format = 'youtube'
}) => {
  // Get top 5 players for thumbnail
  const topPlayers = records.slice(0, 5);
  
  // Get Wilt Chamberlain background image
  const getWiltBackgroundImage = (): string => {
    try {
      return require(`../assets/players/thumbnail_images/wilt_chamberlain.jpg`);
    } catch (error) {
      console.log('Wilt Chamberlain background image not found');
      return '';
    }
  };
  
  // Get other player images for overlay
  const getPlayerImage = (imageName: string): string => {
    try {
      return require(`../assets/players/thumbnail_images/${imageName}`);
    } catch (error) {
      console.log(`Player image not found: ${imageName}`);
      return '';
    }
  };
  
  const wiltBackgroundImage = getWiltBackgroundImage();
  const kobeImage = getPlayerImage('kobe_bryant.jpg');
  const lukaDoncicImage = getPlayerImage('luka_doncic.jpg');
  const joelEmbiidImage = getPlayerImage('joel_embiid.jpg');
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      fontFamily: 'Arial Black, Arial, sans-serif',
      overflow: 'hidden',
      backgroundImage: wiltBackgroundImage ? `url(${wiltBackgroundImage})` : 'none',
      backgroundColor: '#C8102E',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
        zIndex: 1
      }} />
      
      {/* Bottom Left Player Images */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        display: 'flex',
        gap: '15px',
        zIndex: 2
      }}>
        {/* Kobe Bryant Image */}
        {kobeImage && (
          <div style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            position: 'relative'
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
              bottom: '-5px',
              right: '-5px',
              backgroundColor: '#552583',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>
              #2
            </div>
          </div>
        )}
        
        {/* Luka Dončić Image */}
        {lukaDoncicImage && (
          <div style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            position: 'relative'
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
              bottom: '-5px',
              right: '-5px',
              backgroundColor: '#00538C',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>
              #4
            </div>
          </div>
        )}
        
        {/* Joel Embiid Image */}
        {joelEmbiidImage && (
          <div style={{
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            position: 'relative'
          }}>
            <img 
              src={joelEmbiidImage} 
              alt="Joel Embiid"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              right: '-5px',
              backgroundColor: '#006BB6',
              color: 'white',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>
              #7
            </div>
          </div>
        )}
      </div>
      
      {/* Content Overlay */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: 0,
        width: '50%',
        height: 'calc(100% - 30px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px 30px',
        zIndex: 2
      }}>

        {/* Main Title */}
        <div style={{
          fontSize: format === 'youtube' ? '90px' : '74px',
          fontWeight: '900',
          color: format === 'youtube' ? '#FF6B35' : 'white',
          textShadow: format === 'youtube' 
            ? '0 0 20px rgba(255, 107, 53, 0.5), 4px 4px 8px rgba(0,0,0,0.8)'
            : '4px 4px 8px rgba(0,0,0,0.8)',
          marginBottom: '15px',
          textAlign: 'center',
          letterSpacing: '-2px',
          textTransform: 'uppercase'
        }}>
          NBA TOP 15
        </div>
      
        {/* Subtitle */}
        <div style={{
          fontSize: format === 'youtube' ? '56px' : '50px',
          fontWeight: 'bold',
          color: format === 'youtube' ? '#FFD700' : 'white',
          textShadow: format === 'youtube'
            ? '0 0 15px rgba(255, 215, 0, 0.5), 2px 2px 4px rgba(0,0,0,0.8)'
            : '2px 2px 4px rgba(0,0,0,0.8)',
          marginBottom: format === 'youtube' ? '20px' : '25px',
          textAlign: 'center',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          SINGLE GAME SCORING
        </div>
      
      
      
        {/* Call to Action */}
        <div style={{
          fontSize: format === 'youtube' ? '34px' : '30px',
          color: format === 'youtube' ? '#FF6B35' : 'white',
          textShadow: format === 'youtube'
            ? '0 0 15px rgba(255, 107, 53, 0.5), 2px 2px 4px rgba(0,0,0,0.8)'
            : '2px 2px 4px rgba(0,0,0,0.8)',
          fontWeight: '900',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {'WATCH THE COUNTDOWN! 🏀'}
        </div>
      </div>
    </div>
  );
};
