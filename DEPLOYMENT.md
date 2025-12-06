# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB instance)
- Stripe account for payment processing
- Vercel account (recommended) or other Next.js hosting

## Environment Setup

### Required Environment Variables

Create a `.env` file with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/carpathian?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=<your-secure-random-string-min-32-chars>

# Stripe
STRIPE_SECRET_KEY=sk_live_<your-stripe-secret-key>
STRIPE_PUBLIC_KEY=pk_live_<your-stripe-public-key>
STRIPE_WEBHOOK_SECRET=whsec_<your-webhook-secret>

# App URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_STRIPE_SUCCESS_URL=https://your-domain.com/thank-you
NEXT_PUBLIC_STRIPE_CANCEL_URL=https://your-domain.com

# Email (optional for future implementation)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## MongoDB Atlas Setup

1. **Create a Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Choose a region close to your users

2. **Configure Database Access**
   - Create a database user with read/write permissions
   - Whitelist your IP addresses (or 0.0.0.0/0 for all IPs in production)

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Create Initial Admin**
   - Connect to your database using MongoDB Compass
   - Create a document in the `admins` collection:
   ```json
   {
     "username": "admin",
     "password": "$2a$10$...", // Use bcrypt to hash "admin123"
     "createdAt": "2024-01-01T00:00:00.000Z"
   }
   ```

## Stripe Setup

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Complete account verification

2. **Get API Keys**
   - Go to Developers > API keys
   - Copy Secret key and Publishable key
   - For testing, use test keys (starting with `sk_test_` and `pk_test_`)

3. **Configure Webhooks**
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `checkout.session.completed`
   - Copy the webhook signing secret

4. **Test Mode**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   - Go to your project on Vercel dashboard
   - Settings > Environment Variables
   - Add all variables from `.env`

5. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t carpathian-timber .
   docker run -p 3000:3000 --env-file .env carpathian-timber
   ```

### Option 3: Traditional VPS

1. **Install Dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd carpathian-timber
   npm install
   npm run build
   ```

3. **Use PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "carpathian" -- start
   pm2 startup
   pm2 save
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment Checklist

- [ ] Verify MongoDB connection
- [ ] Test admin login
- [ ] Test Stripe payment flow
- [ ] Configure custom domain
- [ ] Set up SSL certificate (Let's Encrypt)
- [ ] Test all API endpoints
- [ ] Verify webhook delivery
- [ ] Change default admin password
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Configure email notifications
- [ ] Test responsive design on mobile
- [ ] Run accessibility audit
- [ ] Check SEO metadata
- [ ] Set up backups for MongoDB

## Performance Optimization

1. **Enable Caching**
   - Configure Next.js `next.config.js` for optimal caching
   - Use CDN for static assets

2. **Image Optimization**
   - Use Next.js Image component
   - Configure image CDN (Cloudinary, Imgix)

3. **Database Indexing**
   - Add indexes to MongoDB collections
   - Monitor slow queries

4. **Security Headers**
   - Configure CSP headers
   - Enable HSTS
   - Set secure cookie flags

## Monitoring & Maintenance

1. **Application Monitoring**
   - Set up Sentry for error tracking
   - Use Vercel Analytics for performance

2. **Database Monitoring**
   - MongoDB Atlas provides built-in monitoring
   - Set up alerts for high CPU/memory usage

3. **Uptime Monitoring**
   - Use services like UptimeRobot or Pingdom
   - Set up alerts for downtime

## Troubleshooting

### Database Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

### Stripe Webhook Failures
- Verify webhook secret is correct
- Check endpoint URL is accessible
- Review Stripe dashboard logs

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

## Scaling

For high traffic:
- Use MongoDB Atlas auto-scaling
- Enable Vercel Edge Functions
- Implement Redis caching
- Use CDN for static assets
- Consider database read replicas

## Security Best Practices

- Rotate JWT_SECRET regularly
- Use environment-specific Stripe keys
- Enable 2FA for admin accounts
- Regular security audits
- Keep dependencies updated
- Use HTTPS only
- Implement rate limiting
- Sanitize all user inputs
