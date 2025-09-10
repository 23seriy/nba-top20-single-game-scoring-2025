// Generate audio filename using rank-based naming convention
export const getAudioPath = (playerName: string, rank: number): string => {
  try {
    const slug = playerName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .trim();
    
    const rankPadded = rank.toString().padStart(2, '0'); // 01, 02, etc.
    
    // Import the audio directly from src/assets using rank-based naming
    try {
      const audioPath = require(`../assets/players/audio/${rankPadded}-${slug}.mp3`);
      console.log(`Found audio path for ${playerName} (rank ${rank}):`, audioPath);
      return audioPath;
    } catch (requireError) {
      console.log(`No audio found for ${playerName} at rank ${rank}`);
      return '';
    }
  } catch (error) {
    console.error('Error generating audio path:', error);
    return '';
  }
};

// Get audio duration in frames for a specific player using browser Audio API
export const getAudioDurationInFrames = (playerName: string, rank: number, fps: number): Promise<number> => {
  return new Promise((resolve) => {
    try {
      const audioPath = getAudioPath(playerName, rank);
      if (!audioPath) {
        console.log(`No audio file found for ${playerName} (rank ${rank}), using default duration`);
        resolve(1800); // Default 1 minute
        return;
      }

      // Create audio element to get duration
      const audio = new Audio(audioPath);
      
      audio.addEventListener('loadedmetadata', () => {
        const durationInSeconds = audio.duration;
        const durationInFrames = Math.ceil(durationInSeconds * fps);
        
        console.log(`Audio duration for ${playerName} (rank ${rank}): ${durationInSeconds}s = ${durationInFrames} frames`);
        resolve(durationInFrames);
      });

      audio.addEventListener('error', (error) => {
        console.error(`Error loading audio for ${playerName} (rank ${rank}):`, error);
        resolve(1800); // Default 1 minute fallback
      });

      // Set a timeout fallback
      setTimeout(() => {
        console.warn(`Timeout getting audio duration for ${playerName} (rank ${rank}), using default`);
        resolve(1800);
      }, 5000);

    } catch (error) {
      console.error(`Error getting audio duration for ${playerName} (rank ${rank}):`, error);
      resolve(1800); // Default 1 minute fallback
    }
  });
};
