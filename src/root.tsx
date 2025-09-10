import React from 'react';
import { Composition } from 'remotion';
import {
  NBATop15ScoringYouTube,
  NBATop15ScoringShortsPart1,
  NBATop15ScoringShortsPart2,
  NBATop15ScoringSquare,
  NBATop15ScoringThumbnail
} from './components';
import scoringData from '../data/top20_single_game_scoring.json';
import { ScoringRecord } from './types';
import { compositionDurations } from './utils/calculateTotalDuration';

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
        id="NBATop15Scoring-YouTube"
        component={NBATop15ScoringYouTube}
        durationInFrames={compositionDurations.youtube}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ records: validatedData }}
      />
      
      <Composition
        id="NBATop15Scoring-ShortsPart1"
        component={NBATop15ScoringShortsPart1}
        durationInFrames={compositionDurations.shortsPart1}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ records: validatedData }}
      />
      
      <Composition
        id="NBATop15Scoring-ShortsPart2"
        component={NBATop15ScoringShortsPart2}
        durationInFrames={compositionDurations.shortsPart2}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ records: validatedData }}
      />
      
      <Composition
        id="NBATop15Scoring-Square"
        component={NBATop15ScoringSquare}
        durationInFrames={compositionDurations.square}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{ records: validatedData }}
      />

      {/* Thumbnail Compositions */}
      <Composition
        id="NBATop15Scoring-YouTubeThumbnail"
        component={NBATop15ScoringThumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ records: validatedData, format: 'youtube' }}
      />
      
      <Composition
        id="NBATop15Scoring-ShortsThumbnail"
        component={NBATop15ScoringThumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ records: validatedData, format: 'shorts' }}
      />
      
      <Composition
        id="NBATop15Scoring-SquareThumbnail"
        component={NBATop15ScoringThumbnail}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{ records: validatedData, format: 'square' }}
      />
    </>
  );
};
