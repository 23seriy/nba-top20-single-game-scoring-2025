// Manual video duration configuration for each player
// Duration is in seconds - will be converted to frames automatically
// Default: 50 seconds for all players

export const videoDurations: { [rank: number]: number } = {
  // Top 15 NBA Single Game Scoring Records
  // Format: rank: duration_in_seconds
  
  1: 69,
  2: 57, 
  3: 57,
  4: 55,
  5: 57,
  6: 56,
  7: 50,
  8: 53,
  9: 55,
  10: 58,
  11: 53,
  12: 52,
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
