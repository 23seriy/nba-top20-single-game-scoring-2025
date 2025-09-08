import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop20ScoringShortsPart2Props {
  records?: ScoringRecord[];
}

export const NBATop20ScoringShortsPart2: React.FC<NBATop20ScoringShortsPart2Props> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shorts Part 2: Rankings 10-1 (Top 10)
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#1a1a2e',
      position: 'relative'
    }}>
      <CountdownSection
        records={records}
        format="shorts"
        startRank={10}
        endRank={1}
      />
    </div>
  );
};
