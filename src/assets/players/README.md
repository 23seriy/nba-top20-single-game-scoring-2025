# Assets Directory

This directory contains all media assets for the NBA Top 20 Single Game Scoring video project.

## Directory Structure

```
assets/
├── players/          # Player images (headshots, action shots)
├── games/           # Game footage screenshots and historical photos
└── README.md        # This file
```

## Asset Requirements

### Player Images (`/players/`)
- **Format**: JPG or PNG
- **Resolution**: Minimum 800x800px (square format preferred)
- **Quality**: High resolution for crisp display
- **Naming**: Use rank-padded prefix with player name slug (e.g., `01-wilt-chamberlain.jpg`)

#### Expected Player Image Files (Top 15 Single Game Scoring Records)
1. `01-wilt-chamberlain.jpg` - Wilt Chamberlain (100 points)
2. `02-kobe-bryant.jpg` - Kobe Bryant (81 points)
3. `03-wilt-chamberlain.jpg` - Wilt Chamberlain (78 points)
4. `04-luka-doni.jpg` - Luka Dončić (73 points)
5. `05-david-thompson.jpg` - David Thompson (73 points)
6. `06-wilt-chamberlain.jpg` - Wilt Chamberlain (73 points)
7. `07-wilt-chamberlain.jpg` - Wilt Chamberlain (73 points)
8. `08-wilt-chamberlain.jpg` - Wilt Chamberlain (72 points)
9. `09-damian-lillard.jpg` - Damian Lillard (71 points)
10. `10-donovan-mitchell.jpg` - Donovan Mitchell (71 points)
11. `11-david-robinson.jpg` - David Robinson (71 points)
12. `12-elgin-baylor.jpg` - Elgin Baylor (71 points)
13. `13-joel-embiid.jpg` - Joel Embiid (70 points)
14. `14-devin-booker.jpg` - Devin Booker (70 points)
15. `15-wilt-chamberlain.jpg` - Wilt Chamberlain (70 points)

### Game Images (`/games/`)
- **Format**: JPG or PNG  
- **Resolution**: Minimum 1280x720px (16:9 aspect ratio preferred)
- **Content**: Historical game photos, arena shots, newspaper clippings
- **Naming**: Use exact filename from data (e.g., `wilt_100_game.jpg`)

## Fallback System

The project includes comprehensive fallback handling:

- **Player Images**: If image fails to load, displays player initials in team colors
- **Game Images**: If image fails to load, displays "GAME FOOTAGE" placeholder in team colors
- **Error Logging**: All failed image loads are logged to console for debugging

## Asset Sources

### Recommended Sources
- NBA official media
- Getty Images (with proper licensing)
- Basketball Reference historical photos
- Team official websites
- Sports Illustrated archives

### Copyright Considerations
- Ensure proper licensing for all images
- Use fair use guidelines for historical content
- Consider creating original graphics for commercial use
- Attribute sources as required

## File Naming Convention

Follow the exact naming from `data/top20_single_game_scoring.json`:

### Player Images
- `wilt_chamberlain.jpg`
- `kobe_bryant.jpg`
- `devin_booker.jpg`
- `jayson_tatum.jpg`
- etc.

### Game Images
- `wilt_100_game.jpg`
- `kobe_81_game.jpg`
- `booker_70_game.jpg`
- `tatum_81_game.jpg`
- etc.

## Optimization Tips

1. **Compress Images**: Use tools like TinyPNG to reduce file sizes
2. **Consistent Aspect Ratios**: Maintain consistency for better layouts
3. **High Quality**: Don't over-compress - maintain visual quality
4. **Batch Processing**: Use tools like ImageMagick for bulk operations

## Testing

To test the fallback system:
1. Temporarily rename or remove image files
2. Run the Remotion preview
3. Verify fallback displays appear correctly
4. Check console for error logging

---

*Remember: The project is designed to work perfectly even without any actual image files, thanks to the comprehensive fallback system.*
