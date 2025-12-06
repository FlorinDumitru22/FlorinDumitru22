# Carpathian Mountain Home Financing Website

A professional, responsive website for financing house builds in the Carpathian Mountains.

## Features

### 🏔️ Main Sections
- **Hero Section**: Eye-catching introduction with call-to-action
- **About Section**: Benefits of building in the Carpathians (4 key points)
- **Financing Calculator**: Interactive loan calculator with real-time updates
- **Gallery**: Showcase of 6 different mountain home styles
- **Features Section**: 4 key financing benefits
- **Contact Section**: Form with contact information and custom notification system
- **Footer**: Links, legal info, and social media

### 💻 Technical Features
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- Fully responsive design (mobile, tablet, desktop)
- Interactive financing calculator using standard mortgage formula
- Real-time calculation updates with synchronized input/slider controls
- Canvas-based chart for cost breakdown visualization
- Custom notification system (no browser alerts)
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
├── styles.css       # All styling and responsive design (587 lines)
├── script.js        # Interactive functionality (279 lines)
└── WEBSITE.md       # This documentation
```

## Calculator Formula

The financing calculator uses the standard mortgage payment formula:

```
M = P * [r(1+r)^n] / [(1+r)^n - 1]

Where:
M = Monthly payment
P = Principal loan amount
r = Monthly interest rate (annual rate / 12)
n = Number of payments (years * 12)
```

## Customization

### Colors
Primary colors are defined in CSS variables:
- `--primary-color: #2c5f2d` (Mountain green)
- `--secondary-color: #97c97e` (Light green)
- `--accent-color: #e67e22` (Orange CTA)

### Content
To update content:
1. **Text**: Edit HTML in `index.html`
2. **Styling**: Modify CSS in `styles.css`
3. **Calculator defaults**: Update values in `index.html` lines 113-136
4. **Contact info**: Update in `index.html` contact section

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
✅ No external dependencies or CDNs (except Google Fonts)
✅ Form validation on client side
✅ No sensitive data stored

## Future Enhancements

Potential improvements:
- Add backend API for form submissions
- Integrate with actual financing services
- Add real property listings
- Implement multi-language support (Romanian/English)
- Add image gallery with real photos
- Add testimonials section
- Integrate with Google Maps for office location

## License

© 2024 Carpathian Home Financing. All rights reserved.
