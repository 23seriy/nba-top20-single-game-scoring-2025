export interface ScoringRecord {
  rank: number;
  player: string;
  points: number;
  date: string;
  opponent: string;
  team: string;
  venue: string;
  context: string;
  teamColors: {
    primary: string;
    secondary: string;
  };
  gameFootage: string | null;
  playerImage: string | null;
  gameImage: string | null;
}

export interface VideoFormat {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}

export const VIDEO_FORMATS = {
  YOUTUBE: { width: 1920, height: 1080, fps: 30, durationInFrames: 3600 }, // 2 minutes
  SHORTS_PART1: { width: 1080, height: 1920, fps: 30, durationInFrames: 1800 }, // 1 minute (ranks 20-11)
  SHORTS_PART2: { width: 1080, height: 1920, fps: 30, durationInFrames: 1800 }, // 1 minute (ranks 10-1)
  SQUARE: { width: 1080, height: 1080, fps: 30, durationInFrames: 2400 }, // 1.33 minutes
  THUMBNAIL: { width: 1280, height: 720, fps: 30, durationInFrames: 1 }
} as const;
