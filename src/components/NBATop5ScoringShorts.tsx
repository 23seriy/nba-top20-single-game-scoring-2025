import React from 'react';
import { useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { ScoringRecord } from '../types';
import { CountdownSection } from './CountdownSection';
import { EndScreen } from './EndScreen';
import { calculateCountdownDuration } from '../utils/calculateTotalDuration';

interface NBATop5ScoringShortsProps {
  records?: ScoringRecord[];
}

export const NBATop5ScoringShorts: React.FC<NBATop5ScoringShortsProps> = ({ records }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate accurate countdown duration for top 5 only (faster pacing for Shorts)
  const countdownDuration = calculateCountdownDuration(5, 1, fps);
  const endScreenDuration = 240; // 8 seconds for end screen (shorter for Shorts)

  // Get top 3 records for end screen recap
  const topRecords = records ? records.slice(0, 3) : [];

  // Shorts format: Top 5 countdown from 5 to 1
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
          format="shorts"
          startRank={5}
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
          format="shorts"
        />
      </Sequence>
    </div>
  );
};
