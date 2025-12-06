# API Routes Documentation

## Authentication Routes

### POST /api/auth/login
Login admin user with username and password.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

**Sets HTTP-only cookie:** `auth-token` (7 days expiry)

---

### POST /api/auth/logout
Logout current admin user.

**Response:**
```json
{
  "success": true
}
```

**Clears cookie:** `auth-token`

---

### GET /api/auth/me
Get currently authenticated admin user.

**Headers:** Cookie: `auth-token=...`

**Response:**
```json
{
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@example.com",
    "lastLogin": "2024-12-06T12:00:00.000Z"
  }
}
```

---

### POST /api/auth/change-password
Change admin password (requires authentication).

**Headers:** Cookie: `auth-token=...`

**Request Body:**
```json
{
  "currentPassword": "admin123",
  "newPassword": "newSecurePassword"
}
```

**Response:**
```json
{
  "success": true
}
```

---

## Admin Routes (Authentication Required)

### GET /api/admin/funding
Get funding data for admin panel.

**Headers:** Cookie: `auth-token=...`

**Response:**
```json
{
  "funding": {
    "totalGoal": 85000,
    "currentAmount": 32450,
    "supporterCount": 147,
    "stages": [
      {
        "name": "Fencing",
        "budget": 8000,
        "progress": 100
      }
    ]
  }
}
```

---

### PUT /api/admin/funding
Update funding data.

**Headers:** Cookie: `auth-token=...`

**Request Body:**
```json
{
  "totalGoal": 90000,
  "currentAmount": 35000,
  "supporterCount": 150
}
```

**Response:**
```json
{
  "success": true,
  "funding": { ... }
}
```

---

## Public Routes

### GET /api/funding
Get public funding information (no authentication required).

**Response:**
```json
{
  "totalGoal": 85000,
  "currentAmount": 32450,
  "supporterCount": 147,
  "stages": [ ... ]
}
```

---

### GET /api/volunteers
Get upcoming build days.

**Response:**
```json
{
  "buildDays": [
    {
      "date": "2024-12-14T00:00:00.000Z",
      "title": "Timber Frame Raising",
      "description": "Help raise the main timber frame structure",
      "maxVolunteers": 20,
      "volunteers": [...],
      "status": "upcoming"
    }
  ]
}
```

---

## Stripe Routes

### POST /api/stripe/create-session
Create Stripe checkout session for donations.

**Request Body:**
```json
{
  "tier": "seed",
  "customAmount": null,
  "email": "supporter@example.com",
  "name": "John Doe",
  "message": "Great project!"
}
```

**Tier Options:**
- `seed`: €25
- `sapling`: €50
- `tree`: €100
- `forest`: €250
- `custom`: Use `customAmount` parameter

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/pay/..."
}
```

---

### POST /api/stripe/webhook
Stripe webhook endpoint (configured in Stripe dashboard).

**Headers:**
- `stripe-signature`: Webhook signature from Stripe

**Handles Events:**
- `checkout.session.completed`: Create supporter record, update funding totals

**Response:**
```json
{
  "received": true
}
```

**Webhook URL:** `https://yourdomain.com/api/stripe/webhook`

---

## Database Models

### Admin
```typescript
{
  username: string
  email: string
  password: string (hashed with bcrypt)
  lastLogin: Date
}
```

### Funding
```typescript
{
  totalGoal: number
  currentAmount: number
  supporterCount: number
  stages: [{
    name: string
    budget: number
    progress: number
  }]
}
```

### Supporter
```typescript
{
  name: string
  email: string
  amount: number
  tier: 'seed' | 'sapling' | 'tree' | 'forest' | 'custom'
  message?: string
  anonymous: boolean
  stripeSessionId?: string
  stripeCustomerId?: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
}
```

### BuildDay
```typescript
{
  date: Date
  title: string
  description: string
  maxVolunteers: number
  volunteers: [{
    name: string
    email: string
    phone?: string
    skills?: string
  }]
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'
  tasks: string[]
}
```

### Material
```typescript
{
  category: string
  name: string
  budgeted: number
  spent: number
  quantity?: number
  unit?: string
  supplier?: string
}
```

### GalleryImage
```typescript
{
  title: string
  description?: string
  imageUrl: string
  thumbnailUrl?: string
  stage: 'fencing' | 'foundation' | 'timber-frame' | 'insulation' | 'roof' | 'other'
  order: number
}
```

### TimelineEvent
```typescript
{
  date: Date
  title: string
  description: string
  category: 'milestone' | 'update' | 'announcement' | 'completion'
  imageUrl?: string
  videoUrl?: string
}
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/carpathian-timber-frame
JWT_SECRET=your-secure-random-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Create Initial Admin User
Run this in MongoDB:
```javascript
use carpathian-timber-frame

db.admins.insertOne({
  username: "admin",
  password: "$2a$10$YourHashedPasswordHere", // Hash "admin123"
  email: "admin@example.com",
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the API after the first admin is created to change credentials.

### 5. Configure Stripe Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to `.env`

---

## Testing APIs

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Funding
```bash
curl http://localhost:3000/api/funding
```

### Create Checkout Session
```bash
curl -X POST http://localhost:3000/api/stripe/create-session \
  -H "Content-Type: application/json" \
  -d '{"tier":"seed","email":"test@example.com","name":"Test User"}'
```

---

## Security Notes

1. **Always use HTTPS in production**
2. **Keep JWT_SECRET secure** - generate with `openssl rand -base64 32`
3. **Never commit API keys** to version control
4. **Validate all inputs** on the server side
5. **Use HTTP-only cookies** for authentication tokens
6. **Implement rate limiting** for public endpoints
7. **Sanitize user inputs** to prevent XSS
8. **Use prepared statements** (Mongoose does this automatically)

---

## Error Handling

All API routes return consistent error format:

```json
{
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in or invalid credentials)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting (To Be Implemented)

Consider adding rate limiting for production:
- Login: 5 attempts per 15 minutes per IP
- Checkout: 10 requests per hour per IP
- Public APIs: 100 requests per minute per IP

Recommended package: `express-rate-limit` or Next.js middleware
