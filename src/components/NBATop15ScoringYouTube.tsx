import React from 'react';
import { useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';
import { EndScreen } from './EndScreen';
import { calculateCountdownDuration } from '../utils/calculateTotalDuration';

interface NBATop15ScoringYouTubeProps {
  records?: ScoringRecord[];
}

export const NBATop15ScoringYouTube: React.FC<NBATop15ScoringYouTubeProps> = ({ records }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate accurate countdown duration based on actual video lengths
  const countdownDuration = calculateCountdownDuration(15, 1, fps);
  const endScreenDuration = 300; // 10 seconds for end screen

  // Get top 3 records for end screen recap
  const topRecords = records ? records.slice(0, 3) : [];

  // YouTube format: Full countdown from 15 to 1
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
          format="youtube"
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
          format="youtube"
        />
      </Sequence>
    </div>
  );
};
