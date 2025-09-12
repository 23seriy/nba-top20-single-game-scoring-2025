// Manual video duration configuration for each player
// Duration is in seconds - will be converted to frames automatically
// Default: 50 seconds for regular videos, 15 seconds for shorts

// Regular video durations (YouTube 16:9)
export const videoDurations: { [rank: number]: number } = {
  // Top 15 NBA Single Game Scoring Records
  // Format: rank: duration_in_seconds
  
  1: 70,
  2: 58, 
  3: 58,
  4: 56,
  5: 58,
  6: 57,
  7: 51,
  8: 54,
  9: 56,
  10: 59,
  11: 54,
  12: 52.5,
  13: 54,
  14: 50,
  15: 53.5,
};

// Shorts video durations (9:16 vertical) - shorter for faster pacing
export const shortsVideoDurations: { [rank: number]: number } = {
  // Top 5 NBA Single Game Scoring Records for Shorts
  // Format: rank: duration_in_seconds
  
  1: 30,  // Wilt's 100-point game - longest for dramatic effect
  2: 32,  // Kobe's 81 points
  3: 33,  // David Thompson's 73 points
  4: 30,  // Elgin Baylor's 71 points
  5: 30,  // David Robinson's 71 points
};

// Helper function to get video duration in frames with format support
export const getVideoDurationInFrames = (rank: number, fps: number = 30, format: string = 'youtube'): number => {
  let durationInSeconds: number;
  
  if (format === 'shorts') {
    durationInSeconds = shortsVideoDurations[rank] || 15; // Default to 15 seconds for shorts
  } else {
    durationInSeconds = videoDurations[rank] || 50; // Default to 50 seconds for regular
  }
  
  return Math.ceil(durationInSeconds * fps);
};

// Helper function to get video duration in seconds with format support
export const getVideoDurationInSeconds = (rank: number, format: string = 'youtube'): number => {
  if (format === 'shorts') {
    return shortsVideoDurations[rank] || 15; // Default to 15 seconds for shorts
  } else {
    return videoDurations[rank] || 50; // Default to 50 seconds for regular
  }
};

// Helper function to get total shorts video duration
export const getTotalShortsVideoDuration = (fps: number = 30): number => {
  const playerCardDuration = 150; // 5 seconds per card
  const endScreenDuration = 240; // 8 seconds
  
  // Calculate total video footage duration for top 5
  const totalVideoFootage = Object.keys(shortsVideoDurations)
    .slice(0, 5)
    .reduce((total, rank) => {
      const rankNum = parseInt(rank);
      const videoDuration = getVideoDurationInFrames(rankNum, fps, 'shorts');
      return total + playerCardDuration + videoDuration;
    }, 0);
  
  return totalVideoFootage + endScreenDuration;
};

// Export both duration objects for external use
export { videoDurations as regularVideoDurations };
