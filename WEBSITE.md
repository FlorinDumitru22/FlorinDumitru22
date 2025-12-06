# Carpathian Timber Frame - Crowdsourced Off-Grid Project

A crowdfunding website for building an off-grid timber frame house in the Carpathian Mountains through community support.

## Project Overview

This is a **community-driven crowdsourcing platform** for building a sustainable off-grid timber frame house in the Carpathian Mountains. The project demonstrates sustainable living practices and brings together supporters who believe in eco-friendly, self-sufficient mountain living.

### Core Concept
- **Timber Frame Construction**: Traditional building methods using locally sourced sustainable wood
- **Off-Grid Living**: Solar panels, rainwater harvesting, natural heating systems
- **Community Crowdsourced**: Built by volunteers and funded by supporters worldwide
- **Open Source**: All plans and learnings shared freely with the community

## Features

### 🏔️ Main Sections
- **Hero Section**: Project introduction with call-to-action
- **About Section**: 4 key project pillars (Timber Frame, Off-Grid, Community, Eco-Friendly)
- **Crowdfunding Progress**: Live funding tracker with statistics and visual progress bar
- **Support Tiers**: 4 reward levels from €25 to €1,500 with unique benefits
- **Project Gallery**: Showcase of design plans and off-grid features
- **Features Section**: Project values (Transparent, Community Driven, Educational, Open Source)
- **Join Community**: Contact form for supporters, volunteers, and visitors
- **Footer**: Links, resources, and social media

### 💻 Technical Features
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- Fully responsive design (mobile, tablet, desktop)
- Interactive crowdfunding progress tracker
- Real-time funding statistics display
- Tiered support system with reward descriptions
- Custom notification system
- Smooth scrolling navigation
- Mobile hamburger menu
- Form validation
- Accessibility improvements

### 📱 Responsive Design
- Desktop: Full layout with side-by-side sections
- Tablet: Adjusted grid layouts
- Mobile: Hamburger menu, stacked sections, optimized touch targets

## File Structure

```
├── index.html       # Main HTML structure (305 lines)
├── styles.css       # Styling with crowdfunding elements (755 lines)
├── script.js        # Funding tracker and interactions (224 lines)
└── WEBSITE.md       # This documentation
```

## Crowdfunding System

### Funding Goal: €85,000
Current progress tracked in real-time with visual indicators.

### Support Tiers

**Seed Supporter - €25**
- Project updates via email
- Name on supporter wall
- Digital thank you card

**Timber Friend - €100** (Most Popular)
- All Seed Supporter benefits
- Invitation to build events
- Photo with completed house
- Personalized timber beam

**Forest Guardian - €500**
- All Timber Friend benefits
- Weekend stay in completed house
- Workshop on timber framing
- Commemorative plaque

**Mountain Builder - €1,500**
- All Forest Guardian benefits
- Week-long stay privilege
- Hands-on building experience
- Name on foundation stone

## Project Features

### Off-Grid Systems
- **Solar Power**: Complete solar panel system for electricity
- **Water**: Rainwater collection and filtration
- **Heating**: Natural heating with thermal mass and wood backup
- **Waste**: Composting toilet and greywater system

### Timber Frame Details
- Traditional mortise and tenon joinery
- Locally sourced Carpathian hardwood
- Sustainable forestry practices
- Expert craftsmanship workshops

### Community Involvement
- Weekend and holiday build days
- Skills workshops (timber framing, solar installation, etc.)
- Volunteer opportunities
- Open documentation and learning resources

## Customization

### Colors
Primary colors defined in CSS variables:
- `--primary-color: #2c5f2d` (Forest green)
- `--secondary-color: #97c97e` (Light green)
- `--accent-color: #e67e22` (Orange CTA)

### Content
To update content:
1. **Text**: Edit HTML in `index.html`
2. **Styling**: Modify CSS in `styles.css`
3. **Funding Progress**: Update values in `script.js` updateFundingProgress() function
4. **Support Tiers**: Edit tier cards in `index.html` funding section

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

This is a static website that can be deployed on:
- GitHub Pages (recommended)
- Netlify
- Vercel
- Any static hosting service

No build process or server required - just upload the files!

## Local Development

To test locally:
```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Security

✅ CodeQL security scan passed with no vulnerabilities
✅ No external dependencies except Google Fonts
✅ Form validation on client side
✅ No sensitive data stored

## Project Values

- **100% Transparent**: Every euro tracked publicly
- **Community Driven**: Built by volunteers
- **Educational**: Workshops and tutorials available
- **Open Source**: Plans shared freely

## Future Enhancements

Potential improvements:
- Backend integration for actual payment processing
- Real-time funding updates from payment API
- Build progress photo gallery
- Live streaming of build days
- Multi-language support (Romanian/English)
- Blog/updates section
- Volunteer scheduling system
- Materials cost tracker

## Contact

- **Email**: hello@carpathiantimber.org
- **Location**: Carpathian Mountains, Brașov County, Romania
- **Social**: @CarpathianTimber
- **Build Days**: Weekends & Holidays

## License

© 2024 Carpathian Timber Frame Project. Open Source & Community Driven.
