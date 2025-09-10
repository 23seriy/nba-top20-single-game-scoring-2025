import { videoDurations } from '../config/videoDurations';

// Calculate total video duration based on player card + video durations
export const calculateTotalDuration = (startRank: number, endRank: number, fps: number = 30): number => {
  let totalFrames = 0;
  
  // Player card duration: 4 seconds (120 frames) for all players
  const playerCardDuration = 120;
  
  for (let rank = startRank; rank >= endRank; rank--) {
    const videoDurationSeconds = videoDurations[rank] || 50;
    const videoDurationFrames = Math.ceil(videoDurationSeconds * fps);
    
    // Each player = player card + video footage
    totalFrames += playerCardDuration + videoDurationFrames;
    
    console.log(`Rank ${rank}: ${playerCardDuration} + ${videoDurationFrames} = ${playerCardDuration + videoDurationFrames} frames`);
  }
  
  console.log(`Total duration for ranks ${startRank}-${endRank}: ${totalFrames} frames (${Math.ceil(totalFrames / fps)} seconds)`);
  return totalFrames;
};

// Pre-calculated durations for each composition
export const compositionDurations = {
  // YouTube: All 15 players (ranks 1-15)
  youtube: calculateTotalDuration(15, 1, 30),
  
  // Shorts Part 1: Players 15-8 (8 players)
  shortsPart1: calculateTotalDuration(15, 8, 30),
  
  // Shorts Part 2: Players 7-1 (7 players) 
  shortsPart2: calculateTotalDuration(7, 1, 30),
  
  // Square: All 15 players (ranks 1-15)
  square: calculateTotalDuration(15, 1, 30),
};
