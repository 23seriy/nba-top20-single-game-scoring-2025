import React from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { PlayerCard } from './PlayerCard';
import { VideoFootage } from './VideoFootage';

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
  
  // Filter records for this section
  const sectionRecords = records.filter(record => 
    record.rank >= endRank && record.rank <= startRank
  ).sort((a, b) => b.rank - a.rank); // Sort descending (20 -> 1)

  // Duration per player (in frames) - split between player card and video
  const getPlayerCardDuration = (rank: number): number => {
    if (rank <= 5) return 120; // 4 seconds for top 5 player card
    if (rank <= 10) return 90; // 3 seconds for top 10 player card
    return 75; // 2.5 seconds for others player card
  };

  const getVideoDuration = (rank: number): number => {
    return 90; // 3 seconds for all videos (90 frames at 30fps)
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
