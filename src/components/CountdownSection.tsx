import React, { useState, useEffect } from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { PlayerCard } from './PlayerCard';
import { VideoFootage } from './VideoFootage';
import { getAudioDurationInFrames } from '../utils/audioUtils';

interface CountdownSectionProps {
  records: ScoringRecord[];
  format: 'youtube' | 'shorts' | 'square';
  startRank: number;
  endRank: number;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ 
  records, 
  format, 
  startRank, 
  endRank 
}) => {
  const { fps } = useVideoConfig();
  const [audioDurations, setAudioDurations] = useState<{ [rank: number]: number }>({});
  
  // Filter records for this section
  const sectionRecords = records.filter(record => 
    record.rank >= endRank && record.rank <= startRank
  ).sort((a, b) => b.rank - a.rank); // Sort descending (20 -> 1)

  // Load audio durations for all players on component mount
  useEffect(() => {
    const loadAudioDurations = async () => {
      for (const record of sectionRecords) {
        try {
          const duration = await getAudioDurationInFrames(record.player, record.rank, fps);
          setAudioDurations(prev => ({
            ...prev,
            [record.rank]: duration
          }));
          console.log(`Loaded audio duration for rank ${record.rank}: ${duration} frames`);
        } catch (error) {
          console.error(`Failed to load audio duration for rank ${record.rank}:`, error);
          // Set fallback duration if audio loading fails
          setAudioDurations(prev => ({
            ...prev,
            [record.rank]: 1800 // 1 minute fallback
          }));
        }
      }
    };

    loadAudioDurations();
  }, [sectionRecords, fps]);

  // Duration per player (in frames) - split between player card and video
  const getPlayerCardDuration = (rank: number): number => {
    return 120; // 4 seconds for all player cards (120 frames at 30fps)
  };

  const getVideoDuration = (rank: number): number => {
    // Use detected audio duration for all players
    const detectedDuration = audioDurations[rank];
    if (detectedDuration) {
      console.log(`Using detected audio duration for rank ${rank}: ${detectedDuration} frames`);
      return detectedDuration;
    }
    // Fallback while audio is loading
    return 1800; // Default fallback (1 minute at 30fps)
  };

  try {
    let currentFrame = 0;

    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {sectionRecords.map((record, index) => {
          const playerCardDuration = getPlayerCardDuration(record.rank);
          const videoDuration = getVideoDuration(record.rank);
          const totalDuration = playerCardDuration + videoDuration;
          const sequenceStart = currentFrame;
          
          // Update frame counter for next player
          currentFrame += totalDuration;

          console.log(`Rendering player ${record.player} (#${record.rank}) at frames ${sequenceStart}-${sequenceStart + totalDuration}`);
          console.log(`  - Player card: ${sequenceStart}-${sequenceStart + playerCardDuration}`);
          console.log(`  - Video footage: ${sequenceStart + playerCardDuration}-${sequenceStart + totalDuration}`);

          return (
            <React.Fragment key={`${record.rank}-${record.player}`}>
              {/* Player Card Sequence */}
              <Sequence
                from={sequenceStart}
                durationInFrames={playerCardDuration}
              >
                <PlayerCard
                  record={record}
                  format={format}
                  showGameFootage={false} // Remove the old game footage overlay
                />
              </Sequence>
              
              {/* Video Footage Sequence */}
              <Sequence
                from={sequenceStart + playerCardDuration}
                durationInFrames={videoDuration}
              >
                <VideoFootage
                  record={record}
                  format={format}
                />
              </Sequence>
            </React.Fragment>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error('Error in CountdownSection:', error);
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
          textAlign: 'center',
        }}
      >
        Error loading countdown section
      </div>
    );
  }
};
