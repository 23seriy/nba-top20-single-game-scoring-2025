import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop20ScoringYouTubeProps {
  records?: ScoringRecord[];
}

export const NBATop20ScoringYouTube: React.FC<NBATop20ScoringYouTubeProps> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // YouTube format: Full countdown from 20 to 1
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#1a1a2e',
      position: 'relative'
    }}>
      <CountdownSection
        records={records}
        format="youtube"
        startRank={20}
        endRank={1}
      />
    </div>
  );
};
