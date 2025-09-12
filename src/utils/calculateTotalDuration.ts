import { videoDurations } from '../config/videoDurations';

// Calculate countdown duration based on player card + video durations
export const calculateCountdownDuration = (startRank: number, endRank: number, fps: number = 30): number => {
  let totalFrames = 0;
  
  // Player card duration: 5 seconds (150 frames) for all players
  const playerCardDuration = 150;
  
  for (let rank = startRank; rank >= endRank; rank--) {
    const videoDurationSeconds = videoDurations[rank] || 50;
    const videoDurationFrames = Math.ceil(videoDurationSeconds * fps);
    
    // Each player = player card + video footage
    totalFrames += playerCardDuration + videoDurationFrames;
    
    console.log(`Rank ${rank}: ${playerCardDuration} + ${videoDurationFrames} = ${playerCardDuration + videoDurationFrames} frames`);
  }
  
  console.log(`Countdown duration for ranks ${startRank}-${endRank}: ${totalFrames} frames (${Math.ceil(totalFrames / fps)} seconds)`);
  return totalFrames;
};

// Calculate total composition duration including end screen
export const calculateTotalDuration = (startRank: number, endRank: number, endScreenDuration: number, fps: number = 30): number => {
  const countdownDuration = calculateCountdownDuration(startRank, endRank, fps);
  const totalDuration = countdownDuration + endScreenDuration;
  
  console.log(`Total composition duration: ${totalDuration} frames (${Math.ceil(totalDuration / fps)} seconds = ${(totalDuration / fps / 60).toFixed(2)} minutes)`);
  return totalDuration;
};

// Pre-calculated durations for each composition including end screens
export const compositionDurations = {
  // YouTube: All 15 players + 10 second end screen
  youtube: calculateTotalDuration(15, 1, 300, 30),
  
  // Shorts Part 1: Players 15-8 (8 players) + 8 second end screen
  shortsPart1: calculateTotalDuration(15, 8, 240, 30),
  
  // Shorts Part 2: Players 7-1 (7 players) + 8 second end screen
  shortsPart2: calculateTotalDuration(7, 1, 240, 30),
  
  // Shorts: Top 5 players + 8 second end screen
  shorts: calculateTotalDuration(5, 1, 240, 30),
  
  // Square: All 15 players + 8 second end screen
  square: calculateTotalDuration(15, 1, 240, 30),
};
