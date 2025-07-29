# Visual Effects Animation Platform

## Overview

This is a React/Express full-stack application that dynamically loads visual effects from a GitHub repository and provides an interactive interface for testing text animations. The application fetches JavaScript animation effects from a GitHub repository, allows users to input custom text, and displays animated effects on a canvas with keyword-based effect selection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Database Driver**: Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple

## Key Components

### Effect Management System
- **GitHub API Integration**: Fetches effects from a GitHub repository structure (`/Effets/` directory)
- **Dynamic Script Loading**: Loads and executes JavaScript effects at runtime
- **Canvas Rendering**: HTML5 Canvas for animation display
- **Effect Loader**: Custom class managing script loading, canvas setup, and animation execution

### User Interface Components
- **Animation Canvas**: Interactive canvas component with play/pause/restart controls
- **Effect Controls**: Form controls for text input, effect selection, and auto-mode
- **Keyword Detection**: Maps business keywords to appropriate visual effects
- **Mobile Responsive**: Tailwind-based responsive design

### Authentication & Sessions
- **User Schema**: Basic user system with username/password (prepared but not fully implemented)
- **Session Management**: PostgreSQL-based session storage
- **Memory Storage**: Fallback in-memory storage for development

## Data Flow

1. **Effect Loading**: Application fetches effect directories from GitHub API
2. **Effect Selection**: User inputs text, system detects keywords or allows manual selection
3. **Script Execution**: Selected effect script is loaded and executed on canvas
4. **Animation Rendering**: Canvas displays the animated text effect
5. **User Interaction**: Play/pause/restart controls manage animation state

## External Dependencies

### GitHub Integration
- **Repository Structure**: Expects `/Effets/` directory with subdirectories containing:
  - `effect.js`: Main animation script
  - `description.md`: Effect description
  - `config.json`: Effect parameters (planned)

### UI Libraries
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form management with validation
- **Embla Carousel**: Carousel/slider functionality

### Development Tools
- **ESLint/Prettier**: Code quality and formatting (configured via Tailwind)
- **TypeScript**: Type safety across the entire application
- **Vite Plugins**: Hot reload, error overlay, and development enhancements

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **API Proxy**: Express server serves both API routes and Vite assets
- **Environment Variables**: GitHub API configuration via environment variables

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild compiles TypeScript Express server to `dist/index.js`
- **Static Serving**: Express serves built frontend assets in production
- **Database**: PostgreSQL database with connection pooling via Neon

### Environment Configuration
- **Database URL**: Required for PostgreSQL connection
- **GitHub API**: Optional token for higher rate limits
- **Session Secret**: For secure session management
- **Node Environment**: Development/production mode switching

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL, with particular optimization for Replit's development environment including custom error overlays and cartographer integration for enhanced debugging.