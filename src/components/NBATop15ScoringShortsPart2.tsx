import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop15ScoringShortsPart2Props {
  records?: ScoringRecord[];
}

export const NBATop15ScoringShortsPart2: React.FC<NBATop15ScoringShortsPart2Props> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shorts Part 2: Rankings 8-1 (Top 8)
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
        startRank={8}
        endRank={1}
      />
    </div>
  );
};
