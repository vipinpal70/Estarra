# Estarra Construction Website

## Overview

This is a modern construction company website for Estarra, built as a full-stack React application with Express.js backend. The project creates a premium, animated construction company website featuring responsive design, contact forms with email integration, and a portfolio showcase. The application uses modern web technologies including React with TypeScript, shadcn/ui components, Tailwind CSS, and GSAP animations to deliver a professional construction company web presence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom construction-themed color palette
- **Animations**: GSAP (GreenSock) and Anime.js for smooth scrolling and interactive animations
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for contact form submissions
- **Validation**: Zod schemas for runtime type validation
- **Email Service**: Nodemailer with SMTP configuration for contact form notifications

### Data Storage Solutions
- **In-Memory Storage**: Currently using MemStorage class for contact messages
- **Database Ready**: Drizzle ORM configured with PostgreSQL schema for future database integration
- **Schema Definition**: Contact messages table with id, name, email, phone, message, and timestamp fields

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Express session infrastructure in place with connect-pg-simple for future use

### Development and Build Configuration
- **Build Tool**: Vite with custom configuration for client and server builds
- **Development**: Hot module replacement and development server setup
- **Production**: ESBuild for server bundling, optimized client build output
- **TypeScript**: Strict type checking with path mapping for clean imports

### Component Structure
- **Page Components**: Single-page application with home page and 404 handler
- **Section Components**: Modular sections (Hero, About, Services, Portfolio, Contact, Footer)
- **UI Components**: Comprehensive shadcn/ui component library integration
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Animation and Interaction Design
- **Scroll Animations**: GSAP ScrollTrigger for reveal animations on scroll
- **Hero Animations**: Staggered text animations for engaging first impression
- **Interactive Elements**: Hover effects, button animations, and smooth transitions
- **Performance**: Lazy loading of animation libraries to optimize initial page load

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **Build Tools**: Vite, ESBuild, TypeScript compiler
- **Server Framework**: Express.js with middleware support

### UI and Styling Libraries
- **Component Library**: Radix UI primitives (40+ components)
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Utility Libraries**: class-variance-authority, clsx for conditional styling
- **Icons**: Lucide React for consistent iconography

### Animation Libraries
- **GSAP**: Primary animation library for scroll-triggered animations
- **Anime.js**: Secondary animation library for specialized effects
- **CSS Animations**: Tailwind CSS animation utilities for micro-interactions

### Database and ORM
- **Drizzle ORM**: Type-safe PostgreSQL ORM with migration support
- **Database Driver**: @neondatabase/serverless for PostgreSQL connectivity
- **Migration Tool**: Drizzle Kit for database schema management

### Email Service Integration
- **Nodemailer**: SMTP email service for contact form submissions
- **SMTP Configuration**: Gmail SMTP with app-specific password authentication
- **Email Templates**: HTML email formatting for contact notifications

### Development Tools
- **Type Safety**: Zod for runtime validation and TypeScript integration
- **Code Quality**: ESLint configuration for code standards
- **Development Experience**: Replit-specific plugins for cloud development environment

### Production Considerations
- **Environment Variables**: Dotenv for configuration management
- **Session Store**: PostgreSQL session storage with connect-pg-simple
- **Error Handling**: Structured error responses and logging
- **Security**: Input validation and CSRF protection ready for implementation