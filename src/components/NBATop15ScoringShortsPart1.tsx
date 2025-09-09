import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop15ScoringShortsPart1Props {
  records?: ScoringRecord[];
}

export const NBATop15ScoringShortsPart1: React.FC<NBATop15ScoringShortsPart1Props> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shorts Part 1: Rankings 15-9 (7 players)
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
        startRank={15}
        endRank={9}
      />
    </div>
  );
};
