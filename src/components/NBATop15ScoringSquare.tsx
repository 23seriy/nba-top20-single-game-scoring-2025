import React from 'react';
import { useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';
import { EndScreen } from './EndScreen';
import { calculateCountdownDuration } from '../utils/calculateTotalDuration';

interface NBATop15ScoringSquareProps {
  records?: ScoringRecord[];
}

export const NBATop15ScoringSquare: React.FC<NBATop15ScoringSquareProps> = ({ 
  records = [] 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate accurate countdown duration based on actual video lengths
  const countdownDuration = calculateCountdownDuration(15, 1, fps);
  const endScreenDuration = 240; // 8 seconds for square format

  // Get top 3 records for end screen recap
  const topRecords = records.slice(0, 3);

  // Square format: Condensed countdown from 15 to 1
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#1a1a2e',
      position: 'relative'
    }}>
      {/* Main Countdown Section */}
      <Sequence
        from={0}
        durationInFrames={countdownDuration}
      >
        <CountdownSection
          records={records}
          format="square"
          startRank={15}
          endRank={1}
        />
      </Sequence>

      {/* End Screen */}
      <Sequence
        from={countdownDuration}
        durationInFrames={endScreenDuration}
      >
        <EndScreen
          topRecords={topRecords}
          format="square"
        />
      </Sequence>
    </div>
  );
};
