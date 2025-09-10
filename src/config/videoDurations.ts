// Manual video duration configuration for each player
// Duration is in seconds - will be converted to frames automatically
// Default: 50 seconds for all players

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

// Helper function to get video duration in frames
export const getVideoDurationInFrames = (rank: number, fps: number = 30): number => {
  const durationInSeconds = videoDurations[rank] || 50; // Default to 50 seconds
  return Math.ceil(durationInSeconds * fps);
};

// Helper function to get video duration in seconds
export const getVideoDurationInSeconds = (rank: number): number => {
  return videoDurations[rank] || 50; // Default to 50 seconds
};
