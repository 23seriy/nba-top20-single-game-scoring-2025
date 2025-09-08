import React from 'react';
import { AbsoluteFill, Sequence, useVideoConfig } from '@remotion/core';
import { PlayerCard } from './PlayerCard';
import { ScoringRecord } from '../types';

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

  // Duration per player (in frames)
  const getPlayerDuration = (rank: number): number => {
    if (rank <= 5) return 240; // 8 seconds for top 5
    if (rank <= 10) return 180; // 6 seconds for top 10
    return 150; // 5 seconds for others
  };

  try {
    let currentFrame = 0;

    return (
      <AbsoluteFill>
        {sectionRecords.map((record, index) => {
          const duration = getPlayerDuration(record.rank);
          const sequenceStart = currentFrame;
          
          // Update frame counter for next player
          currentFrame += duration;

          console.log(`Rendering player ${record.player} (#${record.rank}) at frames ${sequenceStart}-${sequenceStart + duration}`);

          return (
            <Sequence
              key={`${record.rank}-${record.player}`}
              from={sequenceStart}
              durationInFrames={duration}
            >
              <PlayerCard
                record={record}
                format={format}
                showGameFootage={record.rank <= 10} // Show game footage for top 10
              />
            </Sequence>
          );
        })}
      </AbsoluteFill>
    );
  } catch (error) {
    console.error('Error in CountdownSection:', error);
    return (
      <AbsoluteFill
        style={{
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
      </AbsoluteFill>
    );
  }
};
