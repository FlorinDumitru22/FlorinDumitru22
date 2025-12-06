# Backend Integration Guide

This document outlines how to integrate backend services with the Carpathian Timber Frame crowdfunding website.

## Overview

The website is currently a static frontend with placeholders for backend integration. All interactive features are ready to connect to backend APIs.

## Recent Updates

### Version 2.0 Features
- **Multi-language Support**: Full English and Romanian translations
- **Shopping Cart System**: Support tier selection with cart management
- **Build Stage Tracking**: Funding progress divided by construction phases
- **Admin Panel**: Complete admin interface for managing all aspects of the project
- **Enhanced Stripe Integration**: Ready-to-use Stripe checkout flow

## Payment Integration

### Stripe Integration

**Location**: Payment section (`#funding`)

**Frontend Code**: `script.js` - `initiateStripePayment()` function

**Required Steps**:
1. Sign up for Stripe account: https://stripe.com
2. Get your publishable key and secret key
3. Create a backend endpoint to create checkout sessions

**Backend Endpoint Example** (Node.js/Express):
```javascript
const stripe = require('stripe')('your_secret_key');

app.post('/create-checkout-session', async (req, res) => {
  const { amount, tier } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Carpathian Timber Frame - ${tier}`,
        },
        unit_amount: amount * 100, // amount in cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://yoursite.com/success',
    cancel_url: 'https://yoursite.com/cancel',
  });

  res.json({ sessionId: session.id });
});
```

**Frontend Update**:
```javascript
function initiateStripePayment() {
    const stripe = Stripe('your_publishable_key');
    
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            amount: selectedTierAmount,
            tier: selectedTierName
        })
    })
    .then(response => response.json())
    .then(session => stripe.redirectToCheckout({ sessionId: session.id }));
}
```

### PayPal Integration

**Frontend Code**: `script.js` - `initiatePayPalPayment()` function

**Required Steps**:
1. Sign up for PayPal Business account
2. Create PayPal app to get client ID
3. Add PayPal SDK to HTML

**HTML Addition**:
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"></script>
```

**Frontend Update**:
```javascript
function initiatePayPalPayment() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: selectedTierAmount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                showNotification('Payment successful! Thank you for your support.');
                // Send to backend to record transaction
                recordPayment(details);
            });
        }
    }).render('#paypal-button-container');
}
```

## Real-Time Funding Updates

### WebSocket Integration

**Backend Example** (Node.js with Socket.io):
```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send current funding stats
  socket.emit('funding-update', {
    raised: 32450,
    supporters: 147,
    daysRemaining: 68
  });
});

// When payment is processed
function onPaymentSuccess(amount) {
  io.emit('funding-update', {
    raised: getCurrentTotal() + amount,
    supporters: getSupporterCount() + 1,
    daysRemaining: getDaysRemaining()
  });
}
```

**Frontend Update** (`script.js`):
```javascript
const socket = io('wss://yourserver.com');

socket.on('funding-update', (data) => {
    document.getElementById('raisedAmount').textContent = `€ ${data.raised.toLocaleString()}`;
    document.getElementById('supporterCount').textContent = data.supporters;
    document.getElementById('daysLeft').textContent = data.daysRemaining;
    
    const percentage = Math.round((data.raised / 85000) * 100);
    document.getElementById('progressPercent').textContent = percentage;
    document.getElementById('progressFill').style.width = percentage + '%';
    
    updateChart(data.raised, 85000 - data.raised);
});
```

## Blog/Updates Section

### CMS Integration

**Recommended**: Headless CMS like Strapi, Contentful, or Sanity

**Backend API Endpoint**:
```
GET /api/updates?limit=3&sort=-date
```

**Response Format**:
```json
{
  "updates": [
    {
      "id": 1,
      "date": "2024-12-01",
      "title": "Foundation Complete!",
      "excerpt": "We've finished laying the foundation...",
      "content": "Full article content...",
      "image": "https://cdn.yoursite.com/foundation.jpg"
    }
  ]
}
```

**Frontend Update** (`script.js`):
```javascript
async function loadUpdates() {
    const response = await fetch('/api/updates?limit=3');
    const data = await response.json();
    
    const updatesGrid = document.querySelector('.updates-grid');
    updatesGrid.innerHTML = data.updates.map(update => `
        <article class="update-card">
            <div class="update-date">${formatDate(update.date)}</div>
            <h3>${update.title}</h3>
            <p>${update.excerpt}</p>
            <a href="/update/${update.id}" class="read-more">Read More →</a>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadUpdates);
```

## Volunteer Scheduling

### Database Schema

**Table: build_days**
```sql
CREATE TABLE build_days (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_start DATE,
    date_end DATE,
    activity VARCHAR(255),
    max_volunteers INT,
    current_volunteers INT DEFAULT 0,
    skills_required VARCHAR(255),
    status ENUM('available', 'full', 'cancelled')
);
```

**Table: volunteer_signups**
```sql
CREATE TABLE volunteer_signups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    build_day_id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (build_day_id) REFERENCES build_days(id)
);
```

### API Endpoints

**GET /api/build-days**
```json
{
  "buildDays": [
    {
      "id": 1,
      "dateRange": "Dec 7-8",
      "activity": "Timber Frame Raising",
      "volunteers": "12/20",
      "skills": "No experience needed",
      "status": "available"
    }
  ]
}
```

**POST /api/volunteer-signup**
```json
{
  "buildDayId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+40 123 456 789"
}
```

**Frontend Update**:
```javascript
async function signupForBuildDay(buildDayId) {
    const response = await fetch('/api/volunteer-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            buildDayId,
            name: prompt('Your name:'),
            email: prompt('Your email:'),
            phone: prompt('Your phone:')
        })
    });
    
    if (response.ok) {
        showNotification('Successfully signed up! Check your email for details.');
        loadBuildDays(); // Refresh the list
    }
}
```

## Materials Cost Tracker

### Real-Time Cost Updates

**API Endpoint**:
```
GET /api/materials-costs
```

**Response**:
```json
{
  "categories": [
    {
      "name": "Timber Frame",
      "budgeted": 18500,
      "spent": 18500,
      "status": "paid"
    },
    {
      "name": "Roof & Insulation",
      "budgeted": 15000,
      "spent": 9000,
      "status": "in_progress"
    }
  ],
  "totalBudget": 85000,
  "totalSpent": 54500
}
```

**Frontend Update**:
```javascript
async function updateMaterialsCosts() {
    const response = await fetch('/api/materials-costs');
    const data = await response.json();
    
    const costItems = document.querySelector('.cost-items');
    costItems.innerHTML = data.categories.map(cat => {
        const percentage = (cat.spent / cat.budgeted) * 100;
        return `
            <div class="cost-item">
                <div class="cost-info">
                    <span class="cost-category">${cat.name}</span>
                    <span class="cost-status">${cat.status}</span>
                </div>
                <div class="cost-bar">
                    <div class="cost-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="cost-amount">€${cat.spent} / €${cat.budgeted}</div>
            </div>
        `;
    }).join('');
}
```

## Live Streaming

### YouTube Live Integration

**Option 1: YouTube Embed**
```html
<div class="stream-container">
    <iframe width="800" height="450" 
            src="https://www.youtube.com/embed/LIVE_VIDEO_ID" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
    </iframe>
</div>
```

**Option 2: Twitch Embed**
```html
<div class="stream-container">
    <iframe src="https://player.twitch.tv/?channel=YOUR_CHANNEL&parent=yoursite.com" 
            height="450" 
            width="800">
    </iframe>
</div>
```

**Frontend Update**:
```javascript
function showLiveStream(streamUrl) {
    const container = document.querySelector('.stream-placeholder');
    container.innerHTML = `
        <iframe src="${streamUrl}" 
                width="100%" 
                height="450" 
                frameborder="0" 
                allowfullscreen>
        </iframe>
    `;
}

// Check if stream is live
async function checkStreamStatus() {
    const response = await fetch('/api/stream-status');
    const data = await response.json();
    
    if (data.isLive) {
        showLiveStream(data.streamUrl);
    }
}
```

## Multi-Language Content

### Backend Translation Management

**Database Schema**:
```sql
CREATE TABLE translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key VARCHAR(255),
    language VARCHAR(5),
    value TEXT,
    UNIQUE KEY unique_translation (key, language)
);
```

**API Endpoint**:
```
GET /api/translations/{language}
```

**Response**:
```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "hero.title": "Crowdsourced Off-Grid Timber Frame House",
  ...
}
```

**Frontend Update**:
```javascript
async function loadTranslations(lang) {
    const response = await fetch(`/api/translations/${lang}`);
    const translations = await response.json();
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}
```

## Email Notifications

### Contact Form Integration

**Backend Endpoint**:
```javascript
const nodemailer = require('nodemailer');

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, interest, message } = req.body;
    
    // Send email to project team
    await transporter.sendMail({
        from: email,
        to: 'hello@carpathiantimber.org',
        subject: `New Contact: ${interest}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Interest:</strong> ${interest}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    });
    
    // Send confirmation to user
    await transporter.sendMail({
        from: 'hello@carpathiantimber.org',
        to: email,
        subject: 'Thank you for your interest!',
        html: `
            <h2>Thank you, ${name}!</h2>
            <p>We received your message and will get back to you within 24 hours.</p>
        `
    });
    
    res.json({ success: true });
});
```

## Security Considerations

1. **HTTPS**: All backend APIs must use HTTPS
2. **CORS**: Configure CORS properly for your domain
3. **Rate Limiting**: Implement rate limiting on all endpoints
4. **Input Validation**: Validate and sanitize all user inputs
5. **SQL Injection**: Use parameterized queries
6. **XSS Protection**: Sanitize HTML content
7. **Payment Security**: Never store credit card details
8. **API Keys**: Store all API keys in environment variables

## Deployment Checklist

- [ ] Set up production database
- [ ] Configure payment gateway accounts (Stripe/PayPal)
- [ ] Set up email service (SendGrid, AWS SES, etc.)
- [ ] Configure domain and SSL certificate
- [ ] Set up CDN for static assets
- [ ] Configure environment variables
- [ ] Set up monitoring and logging
- [ ] Test all payment flows
- [ ] Test email notifications
- [ ] Load test API endpoints
- [ ] Set up backup strategy

## Admin Panel Integration

### Overview

The admin panel (`admin.html`) provides a complete interface for managing all aspects of the crowdfunding project. It requires backend API integration to function fully.

### Admin API Endpoints

#### 1. Funding Management

**POST /api/admin/funding/stats**
```json
{
  "totalGoal": 85000,
  "raisedAmount": 32450,
  "supporterCount": 147,
  "daysRemaining": 68
}
```

**POST /api/admin/funding/stages**
```json
{
  "stage": "timber",
  "budget": 18500,
  "progress": 75,
  "status": "progress"
}
```

#### 2. Gallery Management

**POST /api/admin/gallery/upload**
- Multipart form data with image file
- Fields: `stage`, `title`, `description`, `image`

**GET /api/admin/gallery**
- Returns list of all gallery images

**DELETE /api/admin/gallery/:id**
- Removes gallery image by ID

#### 3. Build Progress Timeline

**POST /api/admin/timeline**
```json
{
  "title": "Timber Frame Raising",
  "description": "Main structure assembly",
  "date": "2024-12-07",
  "status": "active",
  "photos": []
}
```

**PUT /api/admin/timeline/:id**
- Updates existing timeline event

#### 4. Volunteer Schedule

**POST /api/admin/volunteers/build-day**
```json
{
  "dateStart": "2024-12-07",
  "dateEnd": "2024-12-08",
  "activity": "Timber Frame Raising",
  "maxVolunteers": 20,
  "currentVolunteers": 12,
  "skillsRequired": "No experience needed"
}
```

**GET /api/admin/volunteers/signups/:buildDayId**
- Returns list of volunteer signups for specific build day

#### 5. Materials & Costs

**POST /api/admin/materials**
```json
{
  "category": "Timber Frame",
  "budgeted": 18500,
  "spent": 18500,
  "status": "paid"
}
```

**PUT /api/admin/materials/:id**
- Updates cost item

#### 6. Live Stream

**POST /api/admin/livestream**
```json
{
  "platform": "youtube",
  "streamUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "status": "live",
  "scheduledDate": "2024-12-07T09:00:00Z"
}
```

### Admin Authentication

The admin panel requires authentication. Recommended implementation:

```javascript
// Backend: Express middleware
const jwt = require('jsonwebtoken');

function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Protect all admin routes
app.use('/api/admin', authenticateAdmin);
```

### Admin Panel Features

1. **Dashboard**: Overview stats and recent activity
2. **Funding Progress**: Manage overall funding and build stage progress
3. **Project Gallery**: Upload and manage images by build stage
4. **Build Progress**: Timeline of construction milestones
5. **Volunteer Schedule**: Manage build days and volunteer signups
6. **Materials & Costs**: Track expenses and budget allocation
7. **Live Stream**: Configure streaming platform and schedule

### Security Considerations

- All admin endpoints must require authentication
- Use HTTPS for all admin API calls
- Implement CSRF protection
- Rate limit admin endpoints
- Log all admin actions for audit trail
- Use secure session management
- Implement role-based access control if multiple admin levels needed

## Multi-Language Support

### Translation Management

The website supports English and Romanian. Translations are managed in `script.js`:

```javascript
const translations = {
  en: { /* English translations */ },
  ro: { /* Romanian translations */ }
};
```

For dynamic content (from database), implement backend translation:

**GET /api/translations/:language**
```json
{
  "en": {
    "key": "value"
  },
  "ro": {
    "key": "value"
  }
}
```

### Adding New Languages

1. Add translations to `translations` object in `script.js`
2. Add language button to navbar in `index.html`
3. Update `switchLanguage()` function if needed
4. Test all translatable elements

## Cart and Checkout Flow

### Frontend Flow

1. User selects support tier → `selectTier(amount, tierName)`
2. Cart section displays with selection
3. User clicks "Proceed to Checkout" → `proceedToCheckout()`
4. Payment options displayed
5. User selects Stripe → `initiateStripePayment()`
6. Stripe checkout session created
7. User redirected to Stripe
8. Payment processed
9. User redirected back to success page

### Backend Implementation

```javascript
// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, tierName } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Carpathian Timber Frame - ${tierName}`,
          description: 'Support tier contribution'
        },
        unit_amount: amount * 100, // cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN}/#funding`,
    metadata: {
      tierName: tierName,
      projectId: 'carpathian-timber-frame'
    }
  });
  
  res.json({ sessionId: session.id });
});

// Webhook to handle successful payments
app.post('/api/stripe-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Update funding totals
      await updateFundingProgress(session);
      
      // Send thank you email
      await sendThankYouEmail(session);
      
      // Emit WebSocket event to update live stats
      io.emit('funding-update', await getFundingStats());
    }
    
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

## Real-Time Updates

### WebSocket Integration for Live Stats

```javascript
// Backend
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  // Send current stats
  socket.emit('funding-update', getCurrentFundingStats());
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// When admin updates stats or payment received
function broadcastFundingUpdate(stats) {
  io.emit('funding-update', stats);
}
```

```javascript
// Frontend (add to script.js)
const socket = io('wss://your-backend-url');

socket.on('funding-update', (data) => {
  document.getElementById('raisedAmount').textContent = `€ ${data.raised.toLocaleString()}`;
  document.getElementById('supporterCount').textContent = data.supporters;
  document.getElementById('daysLeft').textContent = data.daysRemaining;
  
  const percentage = Math.round((data.raised / 85000) * 100);
  document.getElementById('progressPercent').textContent = percentage;
  document.getElementById('progressFill').style.width = percentage + '%';
  
  updateChart(data.raised, 85000 - data.raised);
});
```

## Recommended Tech Stack

**Backend**:
- Node.js with Express or NestJS
- PostgreSQL or MySQL for database
- Redis for caching and real-time features
- Socket.io for WebSocket connections

**Hosting**:
- Frontend: Netlify, Vercel, or GitHub Pages
- Backend: AWS, Google Cloud, or DigitalOcean
- Database: AWS RDS, Google Cloud SQL, or managed PostgreSQL

**Services**:
- Stripe for payments
- SendGrid for emails
- Cloudinary for image hosting
- YouTube or Twitch for live streaming

## Support

For questions about backend integration, contact: dev@carpathiantimber.org
