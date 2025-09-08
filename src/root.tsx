import React from 'react';
import { Composition } from 'remotion';
import {
  NBATop20ScoringYouTube,
  NBATop20ScoringShortsPart1,
  NBATop20ScoringShortsPart2,
  NBATop20ScoringSquare,
  NBATop20ScoringThumbnail
} from './components';
import scoringData from '../data/top20_single_game_scoring.json';
import { ScoringRecord } from './types';

// Validate and sanitize data
const validateScoringData = (data: any[]): ScoringRecord[] => {
  return data.map((record, index) => ({
    ...record,
    rank: typeof record.rank === 'number' && !isNaN(record.rank) ? record.rank : index + 1,
    points: typeof record.points === 'number' && !isNaN(record.points) ? record.points : 0,
    player: record.player || 'Unknown Player',
    date: record.date || 'Unknown Date',
    opponent: record.opponent || 'Unknown Opponent',
    team: record.team || 'Unknown Team',
    venue: record.venue || 'Unknown Venue',
    context: record.context || '',
    teamColors: {
      primary: record.teamColors?.primary || '#1D428A',
      secondary: record.teamColors?.secondary || '#FFC72C'
    },
    gameFootage: record.gameFootage || null,
    playerImage: record.playerImage || null,
    gameImage: record.gameImage || null
  }));
};

const validatedData = validateScoringData(scoringData);

export const RemotionRoot = () => {
  return (
    <>
      {/* Main Video Compositions */}
      <Composition
        id="NBATop20Scoring-YouTube"
        component={NBATop20ScoringYouTube}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ records: validatedData }}
      />
      
      <Composition
        id="NBATop20Scoring-ShortsPart1"
        component={NBATop20ScoringShortsPart1}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ records: validatedData }}
      />
      
      <Composition
        id="NBATop20Scoring-ShortsPart2"
        component={NBATop20ScoringShortsPart2}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ records: validatedData }}
      />
      
      <Composition
        id="NBATop20Scoring-Square"
        component={NBATop20ScoringSquare}
        durationInFrames={2400}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ records: validatedData }}
      />

      {/* Thumbnail Compositions */}
      <Composition
        id="NBATop20Scoring-YouTubeThumbnail"
        component={NBATop20ScoringThumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ records: validatedData, format: 'youtube' }}
      />
      
      <Composition
        id="NBATop20Scoring-ShortsThumbnail"
        component={NBATop20ScoringThumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ records: validatedData, format: 'shorts' }}
      />
      
      <Composition
        id="NBATop20Scoring-SquareThumbnail"
        component={NBATop20ScoringThumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ records: validatedData, format: 'square' }}
      />
    </>
  );
};
