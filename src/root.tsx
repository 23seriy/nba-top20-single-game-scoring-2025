import React from 'react';
import { Composition } from '@remotion/core';
import { IntroSection } from './components/IntroSection';
import { CountdownSection } from './components/CountdownSection';
import { OutroSection } from './components/OutroSection';
import { VIDEO_FORMATS, ScoringRecord } from './types';

// Import data
import scoringData from '../data/top20_single_game_scoring.json';

const records: ScoringRecord[] = scoringData;

// Main Video Components
const NBATop20ScoringYouTube = () => {
  return (
    <>
      <IntroSection format="youtube" />
      <CountdownSection 
        records={records} 
        format="youtube" 
        startRank={20} 
        endRank={1} 
      />
      <OutroSection format="youtube" />
    </>
  );
};

const NBATop20ScoringShortsPart1 = () => {
  return (
    <>
      <IntroSection format="shorts" />
      <CountdownSection 
        records={records} 
        format="shorts" 
        startRank={20} 
        endRank={11} 
      />
    </>
  );
};

const NBATop20ScoringShortsPart2 = () => {
  return (
    <>
      <CountdownSection 
        records={records} 
        format="shorts" 
        startRank={10} 
        endRank={1} 
      />
      <OutroSection format="shorts" />
    </>
  );
};

const NBATop20ScoringSquare = () => {
  return (
    <>
      <IntroSection format="square" />
      <CountdownSection 
        records={records} 
        format="square" 
        startRank={20} 
        endRank={1} 
      />
      <OutroSection format="square" />
    </>
  );
};

// Thumbnail Components
const NBATop20ScoringYouTubeThumbnail = () => {
  const wiltRecord = records.find(r => r.rank === 1);
  if (!wiltRecord) return null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '120px',
            color: '#FFD700',
            fontWeight: 'bold',
            textShadow: '4px 4px 8px rgba(0,0,0,0.7)',
            marginBottom: '20px',
          }}
        >
          100 POINTS!
        </div>
        <div
          style={{
            fontSize: '48px',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          }}
        >
          TOP 20 SINGLE GAME SCORING
        </div>
      </div>
      <div
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${wiltRecord.teamColors.primary}, ${wiltRecord.teamColors.secondary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
          border: '8px solid #FFD700',
        }}
      >
        WC
      </div>
    </div>
  );
};

const NBATop20ScoringShortsThumbnail = () => {
  const wiltRecord = records.find(r => r.rank === 1);
  if (!wiltRecord) return null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
        NBA TOP 20
      </div>
      <div style={{ fontSize: '36px', marginBottom: '10px' }}>
        SINGLE GAME SCORING
      </div>
      <div style={{ fontSize: '24px', color: '#ffd700' }}>
        #{wiltRecord.rank}: {wiltRecord.player}
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff6b35' }}>
        {wiltRecord.points} POINTS
      </div>
    </div>
  );
};

const NBATop20ScoringSquareThumbnail = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '150px',
          color: '#FFD700',
          fontWeight: 'bold',
          textShadow: '4px 4px 8px rgba(0,0,0,0.7)',
          marginBottom: '20px',
        }}
      >
        TOP 20
      </div>
      <div
        style={{
          fontSize: '36px',
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        }}
      >
        SINGLE GAME SCORING
      </div>
    </div>
  );
};

export const RemotionRoot = () => {
  return (
    <>
      {/* Main Video Compositions */}
      <Composition
        id="NBATop20ScoringYouTube"
        name="NBATop20Scoring-YouTube"
        component={NBATop20ScoringYouTube}
        durationInFrames={VIDEO_FORMATS.YOUTUBE.durationInFrames}
        fps={VIDEO_FORMATS.YOUTUBE.fps}
        width={VIDEO_FORMATS.YOUTUBE.width}
        height={VIDEO_FORMATS.YOUTUBE.height}
      />
      
      <Composition
        id="NBATop20ScoringShortsPart1"
        name="NBATop20Scoring-ShortsPart1"
        component={NBATop20ScoringShortsPart1}
        durationInFrames={VIDEO_FORMATS.SHORTS_PART1.durationInFrames}
        fps={VIDEO_FORMATS.SHORTS_PART1.fps}
        width={VIDEO_FORMATS.SHORTS_PART1.width}
        height={VIDEO_FORMATS.SHORTS_PART1.height}
      />
      
      <Composition
        id="NBATop20ScoringShortsPart2"
        name="NBATop20Scoring-ShortsPart2"
        component={NBATop20ScoringShortsPart2}
        durationInFrames={VIDEO_FORMATS.SHORTS_PART2.durationInFrames}
        fps={VIDEO_FORMATS.SHORTS_PART2.fps}
        width={VIDEO_FORMATS.SHORTS_PART2.width}
        height={VIDEO_FORMATS.SHORTS_PART2.height}
      />
      
      <Composition
        id="NBATop20ScoringSquare"
        name="NBATop20Scoring-Square"
        component={NBATop20ScoringSquare}
        durationInFrames={VIDEO_FORMATS.SQUARE.durationInFrames}
        fps={VIDEO_FORMATS.SQUARE.fps}
        width={VIDEO_FORMATS.SQUARE.width}
        height={VIDEO_FORMATS.SQUARE.height}
      />

      {/* Thumbnail Compositions */}
      <Composition
        id="NBATop20ScoringYouTubeThumbnail"
        name="NBATop20Scoring-YouTubeThumbnail"
        component={NBATop20ScoringYouTubeThumbnail}
        durationInFrames={VIDEO_FORMATS.THUMBNAIL.durationInFrames}
        fps={VIDEO_FORMATS.THUMBNAIL.fps}
        width={VIDEO_FORMATS.THUMBNAIL.width}
        height={VIDEO_FORMATS.THUMBNAIL.height}
      />
      
      <Composition
        id="NBATop20ScoringShortsThumbnail"
        name="NBATop20Scoring-ShortsThumbnail"
        component={NBATop20ScoringShortsThumbnail}
        durationInFrames={VIDEO_FORMATS.THUMBNAIL.durationInFrames}
        fps={VIDEO_FORMATS.THUMBNAIL.fps}
        width={VIDEO_FORMATS.THUMBNAIL.width}
        height={VIDEO_FORMATS.THUMBNAIL.height}
      />
      
      <Composition
        id="NBATop20ScoringSquareThumbnail"
        name="NBATop20Scoring-SquareThumbnail"
        component={NBATop20ScoringSquareThumbnail}
        durationInFrames={VIDEO_FORMATS.THUMBNAIL.durationInFrames}
        fps={VIDEO_FORMATS.THUMBNAIL.fps}
        width={VIDEO_FORMATS.THUMBNAIL.width}
        height={VIDEO_FORMATS.THUMBNAIL.height}
      />
    </>
  );
};
