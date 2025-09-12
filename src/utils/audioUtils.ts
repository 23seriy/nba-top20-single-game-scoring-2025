// Generate audio filename using rank-based naming convention with format support
export const getAudioPath = (playerName: string, rank: number, format?: string): string => {
  try {
    const slug = playerName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .trim();
    
    const rankPadded = rank.toString().padStart(2, '0'); // 01, 02, etc.
    
    // Use shorts-audio folder for shorts format, regular audio folder for others
    const audioFolder = format === 'shorts' ? 'shorts-audio' : 'audio';
    
    // Import the audio directly from src/assets using rank-based naming
    try {
      const audioPath = require(`../assets/players/${audioFolder}/${rankPadded}-${slug}.mp3`);
      console.log(`Found ${format || 'regular'} audio path for ${playerName} (rank ${rank}):`, audioPath);
      return audioPath;
    } catch (requireError) {
      // Fallback to regular audio if shorts audio not found
      if (format === 'shorts') {
        try {
          const fallbackPath = require(`../assets/players/audio/${rankPadded}-${slug}.mp3`);
          console.log(`Using fallback audio for shorts: ${playerName} (rank ${rank})`);
          return fallbackPath;
        } catch (fallbackError) {
          console.log(`No audio found for ${playerName} at rank ${rank}`);
          return '';
        }
      }
      console.log(`No audio found for ${playerName} at rank ${rank}`);
      return '';
    }
  } catch (error) {
    console.error('Error generating audio path:', error);
    return '';
  }
};

// Generate card number audio filename with format support
export const getCardNumberAudioPath = (rank: number, format?: string): string => {
  try {
    const rankPadded = rank.toString().padStart(2, '0'); // 01, 02, etc.
    
    // Use shorts-specific card numbers if available for shorts format
    const cardFolder = format === 'shorts' ? 'shorts-card-numbers' : 'card_numbers';
    
    try {
      const audioPath = require(`../assets/players/${cardFolder}/${rankPadded}.mp3`);
      console.log(`Found ${format || 'regular'} card number audio for rank ${rank}:`, audioPath);
      return audioPath;
    } catch (requireError) {
      // Fallback to regular card numbers if shorts version not found
      if (format === 'shorts') {
        try {
          const fallbackPath = require(`../assets/players/card_numbers/${rankPadded}.mp3`);
          console.log(`Using fallback card number audio for shorts: rank ${rank}`);
          return fallbackPath;
        } catch (fallbackError) {
          console.log(`No card number audio found for rank ${rank}`);
          return '';
        }
      }
      console.log(`No card number audio found for rank ${rank}`);
      return '';
    }
  } catch (error) {
    console.error('Error generating card number audio path:', error);
    return '';
  }
};

// Get audio duration in frames for a specific player using browser Audio API
export const getAudioDurationInFrames = (playerName: string, rank: number, fps: number, format?: string): Promise<number> => {
  return new Promise((resolve) => {
    try {
      const audioPath = getAudioPath(playerName, rank, format);
      if (!audioPath) {
        console.log(`No audio file found for ${playerName} (rank ${rank}), using default duration`);
        // Shorter default for shorts format
        const defaultDuration = format === 'shorts' ? 900 : 1800; // 30s for shorts, 60s for regular
        resolve(defaultDuration);
        return;
      }

      // Create audio element to get duration
      const audio = new Audio();
      
      const cleanup = () => {
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('error', onError);
        audio.src = '';
      };

      const onLoadedMetadata = () => {
        const durationInSeconds = audio.duration;
        const durationInFrames = Math.ceil(durationInSeconds * fps);
        
        console.log(`Audio duration for ${playerName} (rank ${rank}): ${durationInSeconds}s = ${durationInFrames} frames`);
        cleanup();
        resolve(durationInFrames);
      };

      const onError = () => {
        console.log(`Audio file not found for ${playerName} (rank ${rank}), using default duration`);
        cleanup();
        resolve(1800); // Default 1 minute fallback
      };

      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('error', onError);

      // Set a timeout fallback
      setTimeout(() => {
        console.log(`Timeout getting audio duration for ${playerName} (rank ${rank}), using default`);
        cleanup();
        resolve(1800);
      }, 3000); // Reduced timeout to 3 seconds

      // Set the source last to trigger loading
      audio.src = audioPath;

    } catch (error) {
      console.log(`Error getting audio duration for ${playerName} (rank ${rank}), using default`);
      resolve(1800); // Default 1 minute fallback
    }
  });
};
