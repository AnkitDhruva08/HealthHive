# Tailwind CSS v4 Monorepo with Vite, React Native, and Supabase

This monorepo contains a web application built with Vite + React and a native application built with Expo + React Native, both sharing Tailwind CSS v4 styling and Supabase for user management.

## Project Structure

```
├── apps/
│   ├── web/                 # Vite + React web app
│   └── native/              # Expo + React Native app
├── packages/
│   └── shared/              # Shared utilities and Supabase client
├── global.css               # Root Tailwind CSS v4 styles
├── postcss.config.mjs       # PostCSS configuration
└── pnpm-workspace.yaml      # pnpm workspace configuration
```

## Prerequisites

- Node.js 18+
- pnpm 8+
- Expo CLI (for native development)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install all dependencies across the monorepo
pnpm install
```

### 2. Environment Variables

Create `.env.local` files in both `apps/web` and `apps/native` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Build Shared Package

```bash
# Build the shared package
pnpm --filter shared build
```

### 4. Development

#### Web App (Vite + React)
```bash
# Start the web development server
pnpm dev:web
```

#### Native App (Expo + React Native)
```bash
# Start the Expo development server
pnpm dev:native
```

## Features

### ✅ Implemented
- **Monorepo Structure**: Organized with pnpm workspaces
- **Web App**: Vite + React with TypeScript
- **Native App**: Expo + React Native with TypeScript
- **Tailwind CSS v4**: Latest version with PostCSS
- **NativeWind**: Tailwind CSS for React Native
- **Shared Package**: Common utilities and Supabase client
- **TypeScript**: Full type safety across all packages

### 🔄 Ready for Integration
- **Supabase**: Authentication and database client configured
- **Shared Components**: Cross-platform component library
- **Environment Configuration**: Ready for production deployment

## Scripts

- `pnpm dev:web` - Start web development server
- `pnpm dev:native` - Start native development server
- `pnpm build:web` - Build web app for production
- `pnpm build:native` - Build native app for production
- `pnpm lint` - Run linting across all packages
- `pnpm type-check` - Run TypeScript type checking

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Web Bundler**: Vite
- **Mobile Framework**: Expo + React Native
- **Styling**: Tailwind CSS v4, NativeWind
- **Backend**: Supabase
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

## Next Steps

1. Set up your Supabase project and update environment variables
2. Customize the Tailwind configuration in `global.css`
3. Add your app-specific components and screens
4. Configure authentication flows using the shared Supabase client
5. Deploy your applications

## Troubleshooting

- Make sure to run `pnpm install` in the root directory
- Build the shared package before starting development servers
- Check that all environment variables are properly configured
- For React Native development, ensure you have the Expo CLI installed