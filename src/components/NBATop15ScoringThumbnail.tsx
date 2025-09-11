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
  
  const wiltBackgroundImage = getWiltBackgroundImage();
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      fontFamily: 'Arial Black, Arial, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Left Side - Wilt Chamberlain Background */}
      <div style={{
        width: '67%',
        height: '100%',
        position: 'relative',
        backgroundImage: wiltBackgroundImage ? `url(${wiltBackgroundImage})` : 'none',
        backgroundColor: wiltBackgroundImage ? 'transparent' : (format === 'youtube' ? '#2d2d2d' : '#FF6B35'),
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
          background: 'linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
          zIndex: 1
        }} />
        
        {/* Wilt's Achievement Badge */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          backgroundColor: '#FFD700',
          color: '#1a1a1a',
          padding: '15px 25px',
          borderRadius: '15px',
          fontSize: '24px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
          zIndex: 2
        }}>
          #1 • 100 PTS
        </div>
        
        {/* Wilt's Name */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          color: 'white',
          fontSize: '36px',
          fontWeight: '900',
          textShadow: '0 0 20px rgba(0,0,0,0.8), 2px 2px 8px rgba(0,0,0,0.9)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          zIndex: 2
        }}>
          WILT<br/>CHAMBERLAIN
        </div>
      </div>
      
      {/* Right Side - Content */}
      <div style={{
        width: '33%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        position: 'relative',
        background: format === 'youtube' 
          ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)'
          : 'linear-gradient(135deg, #F7931E, #FFD23F)'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 107, 53, 0.1)',
          filter: 'blur(40px)'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          right: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 210, 63, 0.1)',
          filter: 'blur(30px)'
        }} />

        {/* Main Title */}
        <div style={{
          fontSize: format === 'youtube' ? '72px' : '56px',
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
          fontSize: format === 'youtube' ? '36px' : '30px',
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
          fontSize: format === 'youtube' ? '24px' : '20px',
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
