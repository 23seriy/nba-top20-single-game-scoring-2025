import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop20ScoringSquareProps {
  records?: ScoringRecord[];
}

export const NBATop20ScoringSquare: React.FC<NBATop20ScoringSquareProps> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Square format: Condensed countdown from 20 to 1
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#1a1a2e',
      position: 'relative'
    }}>
      <CountdownSection
        records={records}
        format="square"
        startRank={20}
        endRank={1}
      />
    </div>
  );
};
