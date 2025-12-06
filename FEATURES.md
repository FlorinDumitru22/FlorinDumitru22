# Carpathian Timber Frame - Feature Documentation

## New Features Overview

This document describes the new features added to the Carpathian Timber Frame crowdfunding website.

## 1. Multi-Language Support (English & Romanian)

### What's New
- Complete website translation between English and Romanian
- All content including navigation, hero section, about, funding, features, updates, progress, volunteer, materials, and contact sections are fully translatable
- Language selection persists across sessions using localStorage

### How to Use
- Click the EN/RO buttons in the top navigation bar
- Language preference is automatically saved
- All text content updates instantly

### For Developers
- Translations are defined in `script.js` in the `translations` object
- Use `data-translate` attribute for element text content
- Use `data-translate-placeholder` attribute for input placeholders
- Add new keys to both `en` and `ro` translation objects

## 2. Build Stage Funding Progress

### What's New
- Funding progress is now divided into 5 construction stages:
  1. Fencing & Site Security (€5,000)
  2. Foundations Build (€12,000)
  3. Timber Frame (€18,500)
  4. Insulation & Walls (€14,000)
  5. Roof Installation (€15,000)

### Features
- Visual progress bars for each stage
- Color-coded status indicators (Complete, In Progress, Pending)
- Clear percentage completion for each phase
- Responsive grid layout

### For Administrators
- Update stage progress via the Admin Panel
- Modify budgets and completion percentages
- Change status (complete/progress/pending)

## 3. Shopping Cart System

### What's New
- Professional cart system for support tier selection
- Clear visual feedback when selecting a tier
- Ability to review selection before checkout
- Remove and change selection easily

### User Flow
1. User browses support tiers
2. Clicks "Choose Tier" button
3. Cart section appears showing selected tier and amount
4. User clicks "Proceed to Checkout"
5. Payment options are displayed
6. User selects payment method

### For Developers
- Cart state managed in JavaScript
- Functions: `selectTier()`, `clearCart()`, `proceedToCheckout()`
- Cart visibility toggled via CSS display property

## 4. Enhanced Stripe Integration

### What's New
- Ready-to-use Stripe checkout integration
- Clear instructions for completing setup
- Error handling and validation
- Production-ready code structure (commented out)

### Setup Instructions
1. Get Stripe publishable and secret keys
2. Uncomment production code in `initiateStripePayment()` function
3. Create backend endpoint `/api/create-checkout-session`
4. Test with Stripe test mode first

### Backend Required
See `BACKEND_INTEGRATION.md` for complete backend implementation guide.

## 5. Admin Panel

### What's New
- Comprehensive admin interface at `/admin.html`
- Manage all aspects of the crowdfunding project
- Clean, professional design
- Responsive layout

### Admin Sections

#### Dashboard
- Overview statistics (funding, supporters, volunteers, progress)
- Recent activity feed
- Quick stats at a glance

#### Funding Management
- Update total goal and raised amounts
- Manage supporter count and days remaining
- Edit build stage progress and budgets
- Update stage status

#### Project Gallery
- Upload images by build stage
- Add titles and descriptions
- Manage existing images
- Delete images

#### Build Progress Timeline
- Add construction milestones
- Upload progress photos
- Set event dates and status
- Manage timeline events

#### Volunteer Schedule
- Create build days
- Set max volunteers and track signups
- Specify required skills
- View volunteer registration list

#### Materials & Costs
- Add cost categories
- Track budgeted vs. spent amounts
- Update payment status
- View total budget allocation

#### Live Stream
- Configure streaming platform (YouTube, Twitch, Facebook, Custom)
- Set stream URL/embed code
- Manage stream status (Offline, Live, Scheduled)
- Schedule upcoming streams

### Access Admin Panel
1. Navigate to `/admin.html`
2. (Authentication should be added in production)
3. Use sidebar navigation to switch between sections

### For Developers
- Admin panel files: `admin.html`, `admin-styles.css`, `admin-script.js`
- Section navigation via `showSection()` function
- All update functions are placeholders requiring backend integration
- See `BACKEND_INTEGRATION.md` for API endpoint specifications

## 6. Live Stream Integration

### Supported Platforms
- YouTube Live
- Twitch
- Facebook Live
- Custom RTMP streams

### Setup Guide

#### YouTube Live
1. Create live stream in YouTube Studio
2. Copy video ID
3. Format: `https://www.youtube.com/embed/VIDEO_ID`
4. Add to Admin Panel → Live Stream section

#### Twitch
1. Get Twitch channel name
2. Format: `https://player.twitch.tv/?channel=YOUR_CHANNEL&parent=yourdomain.com`
3. Update domain to match your site
4. Add to Admin Panel

#### Custom Platforms
Provide iframe embed code or player URL.

### For Administrators
- Update stream status in admin panel
- Schedule upcoming streams
- Enable/disable stream display on main site

## File Structure

```
/
├── index.html              # Main website
├── script.js               # Main website JavaScript
├── styles.css              # Main website styles
├── admin.html              # Admin panel
├── admin-script.js         # Admin panel JavaScript
├── admin-styles.css        # Admin panel styles
├── BACKEND_INTEGRATION.md  # Backend integration guide
└── FEATURES.md            # This file
```

## Translation Keys Reference

### Navigation
- `nav.home`, `nav.about`, `nav.funding`, `nav.updates`, `nav.progress`, `nav.volunteer`, `nav.support`

### Hero Section
- `hero.title`, `hero.subtitle`, `hero.cta`

### About Section
- `about.title`, `about.timber.title`, `about.timber.desc`
- `about.offgrid.title`, `about.offgrid.desc`
- `about.community.title`, `about.community.desc`
- `about.eco.title`, `about.eco.desc`

### Funding Section
- `funding.title`, `funding.subtitle`, `funding.stats.*`, `funding.funded`
- `funding.stages.*`, `funding.tiers.*`, `funding.cart.*`, `funding.payment.*`

### Other Sections
- `gallery.*`, `features.*`, `updates.*`, `progress.*`
- `volunteer.*`, `materials.*`, `contact.*`

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized CSS with minimal animations
- Lazy loading for images (can be added)
- Efficient JavaScript with event delegation
- localStorage for client-side data persistence

## Accessibility

- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- Responsive design for all screen sizes
- High contrast color scheme

## Future Enhancements

### Potential Additions
1. **Backend Integration**: Connect all features to a real backend
2. **User Authentication**: Secure login for supporters
3. **Email Notifications**: Automated emails for donations and updates
4. **Social Sharing**: Share project on social media
5. **Progress Photos**: Automatic gallery from construction site
6. **Volunteer Portal**: Dedicated area for volunteers
7. **Donation Certificates**: Downloadable PDFs
8. **Mobile App**: Native mobile applications
9. **Blog System**: Full-featured blog for updates
10. **Analytics Dashboard**: Detailed project metrics

## Support

For technical support or questions:
- Email: dev@carpathiantimber.org
- Documentation: See `BACKEND_INTEGRATION.md`
- Issues: Create GitHub issue in repository

## License

This project is open source and available for use in similar crowdfunding projects.

## Credits

Built for the Carpathian Timber Frame community project.
Developed with HTML5, CSS3, and vanilla JavaScript.
