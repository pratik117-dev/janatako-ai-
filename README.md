# 🤖 जनताको AI (JAI Platform)

A modern, full-stack AI platform built with **Next.js**, featuring public accountability analysis, interactive projects, and a secure admin dashboard for Nepal's Election 2082.

## 🔗 Live Links

- **Frontend:** https://janatako.ai/

## ✨ Features

### 🔹 Public Features
- Modern and responsive homepage with AI platform branding  
- Dynamic analysis listing page (ISR – Incremental Static Regeneration)  
- Individual analysis detail pages with rich content, statically generated for speed  
- Dynamic project showcase page  
- About JAI section with platform mission and methodology  
- Fully responsive design for all devices  
- Public question submission form with validation  

### 🔹 Admin Features
- Secure authentication managed by NextAuth.js  
- Private admin dashboard with sidebar layout  
- Full CRUD functionality for analyses  
- Full CRUD functionality for projects  
- Rich text editor for content using TipTap  
- Admin password change functionality  
- Protected routes and API endpoints for admin-only access  
- Query management for public submissions  

### 🔹 Technical Features
- SSR, SSG, and ISR supported  
- Type-safe API routes using Zod validation  
- Centralized API error handling  
- Optimized images using Next.js Image component  
- Modern toast notifications with Sonner  
- Professional form validation using React Hook Form  
- Accessible UI components built with shadcn/ui  

## 🛠️ Tech Stack

### Frontend
- Framework: Next.js 15 (App Router)  
- Language: TypeScript  
- Styling: Tailwind CSS  
- UI Components: shadcn/ui  
- Form Handling: React Hook Form + Zod  
- Authentication: NextAuth.js  
- Rich Text Editor: TipTap  
- Notifications: Sonner  
- Icons: Lucide React  

### Backend
- Framework: Next.js API Routes  
- Database: PostgreSQL  
- ORM: Prisma  

### Deployment
- Platform: Vercel  
- Database: Neon PostgreSQL  

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+  
- pnpm (or npm/yarn)  
- A PostgreSQL database (e.g., Neon)  

### 1. Clone Repository
```bash
git clone https://github.com/your-username/janatakoai.git
cd janatakoai
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup

Create a .env file in root directory and add following variables:
```bash
# Database Connection String from Neon
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# NextAuth Secret Key (generate a long random string)
AUTH_SECRET="your-super-secret-key-for-next-auth"

# Base URL for local development
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma Client based on your schema
pnpm exec prisma generate

# Apply migrations to create database tables
pnpm exec prisma migrate dev

# Seed database with initial admin user
pnpm exec prisma db seed
```

### 5. Run Development Server
```bash
pnpm run dev
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure

``` bash
janatakoai/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
├── public/                  # Static assets
└── src/
    ├── app/
    │   ├── (private)/       # Protected admin routes (e.g., /dashboard)
    │   ├── (public)/        # Public pages (e.g., /, /about, /blogs)
    │   └── api/             # API routes (e.g., /api/v1/blogs)
    ├── components/
    │   ├── ui/              # shadcn/ui components
    │   ├── shared/          # Shared components (Navbar, Footer)
    │   ├── dashboard/       # Dashboard specific components
    │   └── providers/       # Context providers (e.g., AuthProvider)
    └── lib/
        ├── modules/         # Business logic (services, controllers)
        ├── middlewares/     # Custom middlewares (e.g., catchAsync)
        ├── utils/           # Utility functions (e.g., jwt.ts)
        └── validations/     # Zod schemas
```

## 🚀 Deployment

This project is optimized for deployment on Vercel.

Push your code to a GitHub repository.

Import the project in your Vercel dashboard.

Add the production environment variables in Vercel's project settings.

Deploy!

Environment Variables for Production
```bash
DATABASE_URL="your-production-database-url"
AUTH_SECRET="your-production-secret"
NEXT_PUBLIC_API_BASE_URL="https://janatakoai.com"
```

## 📝 API Endpoints

All endpoints are prefixed with /api/v1.

## Authentication

POST /api/auth/signin: (Handled by NextAuth)

POST /api/auth/signout: (Handled by NextAuth)

PATCH /api/v1/auth/change-password: Change admin password (Protected)

## Analyses (Blogs)

GET /api/v1/blogs: Get all analyses.

GET /api/v1/blogs/[id]: Get a single analysis.

POST /api/v1/blogs: Create a new analysis (Protected).

PATCH /api/v1/blogs/[id]: Update an analysis (Protected).

DELETE /api/v1/blogs/[id]: Delete an analysis (Protected).

## Projects

GET /api/v1/projects: Get all projects.

GET /api/v1/projects/[id]: Get a single project.

POST /api/v1/projects: Create a new project (Protected).

PATCH /api/v1/projects/[id]: Update a project (Protected).

DELETE /api/v1/projects/[id]: Delete a project (Protected).

## Submissions (Queries)

GET /api/v1/submissions: Get all public submissions.

POST /api/v1/submissions: Create new public submission.

## 🏛️ About JAI Platform

जनताको AI (JAI) is a public accountability and fact-based analysis platform for Nepal's Election 2082. 
The platform provides:

- **Fact-based Analysis**: Evidence-driven political and policy analysis
- **Public Accountability**: Tools for holding leaders accountable  
- **Interactive Projects**: Data visualization and analysis tools
- **Citizen Engagement**: Platform for public questions and submissions


JAI focuses on providing accurate, data-driven insights to help citizens make informed decisions during Nepal's democratic processes.
