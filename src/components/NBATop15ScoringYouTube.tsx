import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';

interface NBATop15ScoringYouTubeProps {
  records?: ScoringRecord[];
}

export const NBATop15ScoringYouTube: React.FC<NBATop15ScoringYouTubeProps> = ({ records }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // YouTube format: Full countdown from 15 to 1
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
        startRank={15}
        endRank={1}
      />
    </div>
  );
};
