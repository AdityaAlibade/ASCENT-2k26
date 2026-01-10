# Squid Game Registration Portal

## Overview

This is an immersive Squid Game-themed registration website that simulates an official recruitment portal for the Squid Game. The application features a cinematic intro sequence with loading animations, atmospheric sound design, and a multi-step registration flow where users receive a unique player number upon completing registration. The experience includes dramatic visual effects like scanlines, vignettes, and the iconic circle-triangle-square symbols.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom theme configuration for Squid Game aesthetics (neon pink #FF0060, teal green #249F9C, black backgrounds)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for complex entrance animations, ticket reveals, and scroll effects
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Fonts**: Orbitron (display), Montserrat (body text)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas for type-safe request/response validation
- **Build Tool**: Vite for frontend, esbuild for backend production builds

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: shared/schema.ts contains table definitions
- **Migrations**: Drizzle Kit with migrations stored in /migrations folder
- **Connection**: Node-postgres (pg) pool managed in server/db.ts

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks (use-players, use-toast)
│       ├── pages/        # Route components (Home, not-found)
│       └── lib/          # Utilities (queryClient, utils)
├── server/           # Express backend
│   ├── routes.ts     # API endpoint definitions
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route definitions with Zod schemas
└── attached_assets/  # Design prompts and audio files
```

### Key Design Patterns
- **Shared Types**: Database schema and API contracts are defined once in /shared and imported by both client and server
- **Storage Abstraction**: IStorage interface in storage.ts allows for alternative implementations
- **Type-Safe API**: Zod schemas validate both client requests and server responses

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via DATABASE_URL environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session storage (available but may not be in use)

### Frontend Libraries
- **@tanstack/react-query**: Async state management and caching
- **framer-motion**: Animation library for cinematic effects
- **Radix UI**: Accessible component primitives (dialog, popover, toast, etc.)
- **class-variance-authority**: Component variant management

### Development Tools
- **Vite**: Frontend dev server with HMR
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration tooling

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Replit integration (dev only)