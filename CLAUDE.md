# AskAldo Website Project Status

## Project Overview
- **Website**: Simple one-page landing site for "ASK ALDO" - a conversational AI guide for Italian beaches
- **Live URL**: https://fr4nky8oy.github.io/askaldo/
- **Repository**: https://github.com/fr4nky8oy/askaldo

## Current Features
1. **ElevenLabs Widget**: Conversational AI widget positioned in bottom-right corner
   - Agent ID: `agent_5601k65yp5g0fzg940m8she410tc`
   - Successfully embedded and working

2. **Background Slideshow**: 10 custom beach photos with fade transitions
   - Photos: beach1.jpg through beach10.jpg in `/images/` folder
   - 5-second intervals between photos (50-second full cycle)
   - 2-second smooth fade transitions

3. **Typography**: Following ElevenLabs brand guidelines
   - Font: Eleven with Inter fallback
   - Title: "ASK ALDO" (uppercase, bold)
   - Subtitle: "Aldo is your conversational AI guide to discovering authentic, hidden Italian beaches and coastal gems that only locals know"

4. **Responsive Design**: Mobile-friendly with proper scaling

## Technical Details
- **Framework**: Pure HTML/CSS/JavaScript (no external dependencies except ElevenLabs widget)
- **Hosting**: GitHub Pages
- **Deployment**: Automatic via git push to main branch

## Recent Issues & Solutions
- **Slideshow Problem**: Some photos (6-10) showing as grey/not loading
  - **Cause**: Large file sizes (up to 9MB per image)
  - **Temporary Fix**: Added fallback background colors and debugging
  - **Recommended**: Compress images to under 2MB each

## File Structure
```
/
├── index.html (main page)
├── images/
│   ├── beach1.jpg through beach10.jpg (user's custom photos)
│   └── README.md
└── CLAUDE.md (this file)
```

## Next Steps / TODO
1. **Image Optimization**: Compress large photos for better loading performance
2. **Widget Customization**: May need styling adjustments for the ElevenLabs widget
3. **Performance**: Monitor loading times and optimize as needed

## Commands for Updates
```bash
# To update and deploy:
git add .
git commit -m "Description of changes"
git push

# Local testing:
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

## Notes
- ElevenLabs widget requires hostname verification (using fr4nky8oy.github.io)
- Typography follows ElevenLabs brand guidelines from: https://11labs-guides-dev.a17.dev/#typography-cuts
- All 10 photos are in HTML but large file sizes may cause loading issues for photos 6-10