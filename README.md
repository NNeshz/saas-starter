# SaaS Starter ⚡

## Overview
This is a monorepo project structure with a Next.js frontend client and a NestJS backend server. This template for creating a SaaS, this will not use Stripe because this will be selled to a niche in my town/city.

## Prerequisites
- Node.js 18 or higher
- pnpm (Package manager)
- PostgreSQL database (Supabase)

## Project Structure
```
.
├── client/          # Next.js frontend application
├── server/          # NestJS backend application
└── package.json     # Root package.json for monorepo management
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/nneshz/saas-starter.git
cd saas-starter
```

2. Install Dependencies

```bash
pnpm install
```

3. Enviroment Setup
- Copy the enviroment files
```bash
# For server
cp server/.env.example server/.env
```
- Update the enviroment variables in `server/.env` with your credentials:
  - Database configuration (Supabase)
  - Google OAuth credentials
  - Supabase configuration

4. Start the Development Servers

For development (runs both client and server):
```bash
pnpm dev
```

Individual services:
```bash
# Start client
pnpm build:client
pnpm start:client

# Start server
pnpm build:server
pnpm start:server
```

## Environment Variables
The main environment variables are documented in `server/.env.example`. Make sure to set up:

- `DATABASE_URL`: Your Supabase PostgreSQL connection string
- `DIRECT_URL`: Direct database connection for migrations
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Supabase API key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Features
- 🔐 Authentication with Google OAuth
- 📦 Supabase as database
- ⚡ Next.js 14 frontend
- 🚀 NestJS backend
- 🎯 TypeScript support
- 📱 Responsive design

## Development
- Frontend runs on `http://localhost:3000` by default
- Server runs on `http://localhost:3001` by default

