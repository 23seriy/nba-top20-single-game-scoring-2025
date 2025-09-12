import React, { useState, useEffect } from 'react';
import { AbsoluteFill, useVideoConfig, staticFile, Video, Audio, useCurrentFrame, interpolate } from 'remotion';
import { Watermark } from './Watermark';
import { ScoringRecord } from '../types';

interface VideoFootageProps {
  record: ScoringRecord;
  format: 'youtube' | 'shorts' | 'square';
}

export const VideoFootage: React.FC<VideoFootageProps> = ({ record, format }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Validate record data to prevent NaN values
  const safeRecord = {
    ...record,
    rank: Number(record.rank) || 1,
    points: Number(record.points) || 0,
    player: String(record.player || 'Unknown Player'),
    teamColors: {
      primary: String(record.teamColors?.primary || '#1D428A'),
      secondary: String(record.teamColors?.secondary || '#FFC72C')
    }
  };

  // Animation timing with safe frame values
  const safeFrame = Number(frame) || 0;
  const videoEnter = interpolate(safeFrame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const overlayReveal = interpolate(safeFrame, [15, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Generate audio filename using rank-based naming convention
  const getAudioPath = (playerName: string, rank: number): string => {
    try {
      const slug = playerName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .trim();
      
      const rankPadded = rank.toString().padStart(2, '0'); // 01, 02, etc.
      
      // Import the audio directly from src/assets using rank-based naming
      try {
        const audioPath = require(`../assets/players/audio/${rankPadded}-${slug}.mp3`);
        console.log(`Loaded audio for ${playerName} (rank ${rank}):`, audioPath);
        return audioPath;
      } catch (requireError) {
        console.log(`No audio found for ${playerName} at rank ${rank}, continuing without narration`);
        return '';
      }
    } catch (error) {
      console.error('Error generating audio path:', error);
      return '';
    }
  };

  // Generate video filename using rank-based naming convention
  const getVideoPath = (playerName: string, rank: number, format: string): string => {
    try {
      const slug = playerName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .trim();
      
      const rankPadded = rank.toString().padStart(2, '0'); // 01, 02, etc.
      
      // Use shorts-videos folder for shorts format, regular videos folder for others
      const videoFolder = format === 'shorts' ? 'shorts-videos' : 'videos';
      
      // Import the video directly from src/assets using rank-based naming
      try {
        const videoPath = require(`../assets/players/${videoFolder}/${rankPadded}-${slug}.mp4`);
        console.log(`Loaded ${format} video for ${playerName} (rank ${rank}):`, videoPath);
        return videoPath;
      } catch (requireError) {
        console.log(`No ${format} video found for ${playerName} at rank ${rank}, using fallback`);
        return '';
      }
    } catch (error) {
      console.error('Error generating video path:', error);
      return '';
    }
  };

  // Video fallback component
  const VideoFallback = ({ playerName, colors }: { playerName: string; colors: { primary: string; secondary: string } }) => (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: format === 'youtube' ? '48px' : format === 'shorts' ? '64px' : '36px',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Basketball icon */}
      <div style={{
        fontSize: format === 'youtube' ? '120px' : format === 'shorts' ? '160px' : '100px',
        marginBottom: '20px',
        opacity: 0.8
      }}>
        🏀
      </div>
      
      {/* Text */}
      <div style={{ marginBottom: '10px' }}>
        GAME HIGHLIGHTS
      </div>
      <div style={{
        fontSize: format === 'youtube' ? '32px' : format === 'shorts' ? '48px' : '24px',
        opacity: 0.8
      }}>
        {playerName}
      </div>
      
      {/* Animated background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 20px,
          rgba(255,255,255,0.1) 20px,
          rgba(255,255,255,0.1) 40px
        )`,
        animation: 'slide 3s linear infinite',
        zIndex: -1
      }} />
    </div>
  );

  // Format-specific styling for fullscreen display
  const getLayoutStyles = () => {
    switch (format) {
      case 'youtube':
        return {
          container: { 
            width: '100%', 
            height: '100%',
            padding: '0px' // Fullscreen - no padding
          },
          videoContainer: { 
            width: '100%', 
            height: '100%',
            borderRadius: '0px' // Fullscreen - no border radius
          },
          overlay: {
            fontSize: '72px',
            padding: '40px'
          }
        };
      case 'shorts':
        return {
          container: { 
            width: '100%', 
            height: '100%',
            padding: '0px' // Fullscreen - no padding
          },
          videoContainer: { 
            width: '100%', 
            height: '100%',
            borderRadius: '0px' // Fullscreen - no border radius
          },
          overlay: {
            fontSize: '64px',
            padding: '30px'
          }
        };
      case 'square':
        return {
          container: { 
            width: '100%', 
            height: '100%',
            padding: '0px' // Fullscreen - no padding
          },
          videoContainer: { 
            width: '100%', 
            height: '100%',
            borderRadius: '0px' // Fullscreen - no border radius
          },
          overlay: {
            fontSize: '48px',
            padding: '30px'
          }
        };
    }
  };

  const styles = getLayoutStyles();
  const videoPath = getVideoPath(safeRecord.player, safeRecord.rank, format);
  const audioPath = getAudioPath(safeRecord.player, safeRecord.rank);

  // Debug logging
  console.log(`VideoFootage for ${safeRecord.player} (rank ${safeRecord.rank}):`, {
    videoError,
    audioError,
    generatedVideoPath: videoPath,
    generatedAudioPath: audioPath,
    willShowVideo: videoPath && !videoError,
    willPlayAudio: audioPath && !audioError
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
          background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...styles.container,
          opacity: videoEnter,
          transform: `scale(${0.9 + videoEnter * 0.1})`,
        }}
      >
        {/* Video Container */}
        <div
          style={{
            ...styles.videoContainer,
            position: 'relative',
            overflow: 'hidden',
            border: 'none', // Remove border for fullscreen
            boxShadow: 'none', // Remove shadow for fullscreen
          }}
        >
          {/* Audio Narration */}
          {audioPath && !audioError && (
            <Audio
              src={audioPath}
              volume={0.8}
              {...(safeRecord.rank === 15 ? { endAt: Infinity } : {})} // For rank 15, let audio determine duration
              onError={() => {
                console.error(`Failed to load audio for ${safeRecord.player} (rank ${safeRecord.rank})`);
                setAudioError(true);
              }}
            />
          )}

          {videoPath && !videoError ? (
            <Video
              src={videoPath}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={() => {
                console.error(`Failed to load video for ${safeRecord.player} (rank ${safeRecord.rank})`);
                setVideoError(true);
              }}
            />
          ) : (
            <VideoFallback
              playerName={safeRecord.player}
              colors={safeRecord.teamColors}
            />
          )}

          {/* Video Overlay Info */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: 'white',
              ...styles.overlay,
              opacity: overlayReveal,
              transform: `translateY(${(1 - overlayReveal) * 50}px)`,
            }}
          >
            <div style={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              marginBottom: '10px'
            }}>
              {safeRecord.player}
            </div>
            <div style={{
              fontSize: format === 'youtube' ? '48px' : format === 'shorts' ? '48px' : '32px',
              color: safeRecord.teamColors.secondary,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              {safeRecord.points} POINTS
            </div>
          </div>

          {/* Rank Badge */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: safeRecord.teamColors.primary,
              color: 'white',
              fontSize: format === 'youtube' ? '36px' : format === 'shorts' ? '42px' : '28px',
              fontWeight: 'bold',
              padding: format === 'youtube' ? '15px 25px' : format === 'shorts' ? '20px 30px' : '12px 20px',
              borderRadius: '50px',
              border: '3px solid white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              opacity: overlayReveal,
              transform: `scale(${0.8 + overlayReveal * 0.2})`,
            }}
          >
            #{safeRecord.rank}
          </div>

          {/* Channel Watermark */}
          <Watermark />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering VideoFootage:', error);
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
        Error loading video for #{safeRecord.rank}
      </div>
    );
  }
};
