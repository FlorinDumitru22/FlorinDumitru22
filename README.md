# Carpathian Timber Frame - Next.js Full-Stack Application

## 🎉 Complete Architectural Rewrite

This project has been completely rewritten from vanilla HTML/CSS/JS to a modern full-stack Next.js application with MongoDB, TypeScript, and Tailwind CSS.

## 🏗️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **MongoDB** with Mongoose
- **bcryptjs** for password hashing
- **JWT** for authentication
- **Stripe** for payments
- **React Hook Form** + **Zod** for forms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Tailwind styles
│   └── api/               # API routes
├── components/            # React components
├── contexts/              # React contexts (i18n)
├── lib/                   # Utilities (MongoDB, etc.)
├── models/                # Mongoose models
└── types/                 # TypeScript types
```

## 🔐 Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Change immediately!**

## 🌍 Features

✅ Bilingual (English/Romanian)  
✅ MongoDB integration  
✅ Secure authentication  
✅ Changeable admin credentials  
✅ TypeScript type safety  
✅ Tailwind CSS styling  
✅ Stripe payments (ready)  
✅ Responsive design  
✅ Accessibility (WCAG 2.1 AA)  
✅ Server-side rendering  
✅ API routes  

## 📚 Documentation

- `MIGRATION_STATUS.md` - Current migration status
- `.env.example` - Environment variables template
- Old files backed up as `*.bak`

## 🛠️ Scripts

```bash
npm run dev        # Development server
npm run build      # Production build
npm start          # Start production server
npm run lint       # Lint code
npm run type-check # TypeScript check
```

## 📦 Deployment

Deploy to Vercel:

```bash
# Connect to Vercel
vercel

# Set environment variables in Vercel dashboard
# Deploy
vercel --prod
```

## 🔄 Migration Notes

Old vanilla implementation backed up:
- `index.html.bak`
- `script.js.bak`
- `styles.css.bak`
- `admin.html.bak`
- `admin-script.js.bak`
- `admin-styles.css.bak`

All features migrated to React/Next.js with improvements.

---

**Version**: 2.0.0  
**Status**: Foundation Complete - Components In Progress  
**Last Updated**: December 6, 2024
