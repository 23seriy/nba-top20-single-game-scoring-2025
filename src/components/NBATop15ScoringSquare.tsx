import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop15ScoringSquareProps {
  records?: ScoringRecord[];
}

export const NBATop15ScoringSquare: React.FC<NBATop15ScoringSquareProps> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Square format: Condensed countdown from 15 to 1
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
        startRank={15}
        endRank={1}
      />
    </div>
  );
};
