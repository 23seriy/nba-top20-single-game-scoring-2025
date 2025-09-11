import { getVideoDurationInFrames } from '../config/videoDurations';

// Calculate total duration for the countdown section
export const calculateCountdownDuration = (
  startRank: number, 
  endRank: number, 
  fps: number = 30
): number => {
  let totalFrames = 0;
  
  // Player card duration is now 150 frames (5 seconds)
  const playerCardDuration = 150;
  
  // Calculate for each player from startRank down to endRank
  for (let rank = startRank; rank >= endRank; rank--) {
    const videoDuration = getVideoDurationInFrames(rank, fps);
    const playerTotal = playerCardDuration + videoDuration;
    totalFrames += playerTotal;
    
    console.log(`Player #${rank}: ${playerCardDuration} frames (card) + ${videoDuration} frames (video) = ${playerTotal} frames`);
  }
  
  console.log(`Total countdown duration: ${totalFrames} frames (${totalFrames / fps} seconds)`);
  return totalFrames;
};

// Calculate total video duration including end screen
export const calculateTotalVideoDuration = (
  startRank: number, 
  endRank: number, 
  endScreenDuration: number,
  fps: number = 30
): number => {
  const countdownDuration = calculateCountdownDuration(startRank, endRank, fps);
  const totalDuration = countdownDuration + endScreenDuration;
  
  console.log(`Total video duration: ${totalDuration} frames (${totalDuration / fps} seconds = ${(totalDuration / fps / 60).toFixed(2)} minutes)`);
  return totalDuration;
};
