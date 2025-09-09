# NBA Team Logos

This directory contains NBA team logos for the video compositions.

## Naming Convention

Team logos should be named using the team's primary identifier in lowercase with underscores:

- `philadelphia_warriors.svg` or `philadelphia_warriors.jpg` - Philadelphia Warriors
- `los_angeles_lakers.svg` or `los_angeles_lakers.jpg` - Los Angeles Lakers  
- `dallas_mavericks.svg` or `dallas_mavericks.jpg` - Dallas Mavericks
- `denver_nuggets.svg` or `denver_nuggets.jpg` - Denver Nuggets
- `san_francisco_warriors.svg` or `san_francisco_warriors.jpg` - San Francisco Warriors
- `portland_trail_blazers.svg` or `portland_trail_blazers.jpg` - Portland Trail Blazers
- `cleveland_cavaliers.svg` or `cleveland_cavaliers.jpg` - Cleveland Cavaliers
- `san_antonio_spurs.svg` or `san_antonio_spurs.jpg` - San Antonio Spurs
- `philadelphia_76ers.svg` or `philadelphia_76ers.jpg` - Philadelphia 76ers
- `phoenix_suns.svg` or `phoenix_suns.jpg` - Phoenix Suns

## Format Priority

The system will try to load logos in this order:
1. `.svg` format (preferred for scalability)
2. `.jpg` format (fallback for raster images)
3. Team initials fallback (if no files found)

## Fallback System

If a team logo is not found, the system will:
1. Display a circular fallback with team colors
2. Show the team's initials (e.g., "LAL" for Lakers, "DAL" for Mavericks)
3. Use the team's primary and secondary colors from the data

## Image Requirements

- Format: SVG preferred, JPG as fallback
- Square aspect ratio recommended
- Clean, minimal design suitable for overlay display
- For JPG: High resolution recommended for crisp rendering
