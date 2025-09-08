import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop20ScoringShortsPart1Props {
  records?: ScoringRecord[];
}

export const NBATop20ScoringShortsPart1: React.FC<NBATop20ScoringShortsPart1Props> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Shorts Part 1: Rankings 20-11
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
        startRank={20}
        endRank={11}
      />
    </div>
  );
};
