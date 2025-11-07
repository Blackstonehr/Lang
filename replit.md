# languBridge Education Centre

## Overview

languBridge Education Centre is a study abroad platform that connects students with international education programs across Asia, Europe, and beyond. The application enables students to browse programs, learn about destinations, and submit contact inquiries for study abroad opportunities. Built as a full-stack web application with a focus on clean design and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 19 with TypeScript, bundled via Vite
- **Routing**: wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

**Design System**:
- Typography: Inter font family from Google Fonts
- Color scheme: Education-focused professional design with primary blue, accent colors
- Component library: Comprehensive shadcn/ui components (buttons, cards, forms, dialogs, etc.)
- Layout: Responsive-first approach with Tailwind breakpoints
- Custom CSS variables for theming (light/dark mode support)

**Key Pages**:
- Home page: Hero section, featured programs, testimonials, process steps
- Programs page: Browse all programs with filtering by level and country
- Contact page: Contact form with validation
- 404 page for unmatched routes

**Component Structure**:
- Reusable components: Navigation, Footer, Hero, ProgramCard, Testimonials, ProcessSteps
- Form handling: react-hook-form with Zod validation
- UI primitives: Extensive shadcn/ui component set in `client/src/components/ui/`

### Backend Architecture

**Framework**: Express.js with TypeScript (ESM modules)
- **Server Setup**: Custom Vite middleware for development HMR
- **API Design**: RESTful endpoints under `/api` prefix
- **Data Storage**: In-memory storage (MemStorage class) with interface for future database migration
- **Session Management**: Prepared for connect-pg-simple session store

**API Endpoints**:
- `GET /api/programs` - Fetch all programs
- `GET /api/programs/featured` - Fetch featured programs only
- `GET /api/programs/level/:level` - Filter programs by education level
- `GET /api/programs/:id` - Get single program details
- `POST /api/contact` - Submit contact form

**Data Models**:
- Programs: Study abroad program information (destination, country, duration, price, level, highlights)
- Contact Submissions: Student inquiries with name, email, phone, program interest, message
- Users: Prepared schema for future authentication

**Storage Strategy**:
- Currently using in-memory Map-based storage (MemStorage)
- IStorage interface defined for easy migration to database
- Sample programs initialized on startup
- All CRUD operations abstracted through storage interface

### Database Schema (Prepared)

**ORM**: Drizzle ORM configured for PostgreSQL
- **Provider**: Neon serverless PostgreSQL
- **Configuration**: drizzle.config.ts with migrations directory
- **Schema Location**: shared/schema.ts

**Tables Defined**:
1. **programs**: Study abroad programs
   - Fields: id, destination, country, title, description, duration, startDate, endDate, price, level, highlights (array), imageUrl, featured, spotsAvailable
   - Validation: Zod schemas via drizzle-zod

2. **contactSubmissions**: Student contact form submissions
   - Fields: id, name, email, phone, programInterest, message, createdAt
   - Validation: Custom Zod schemas with field constraints

3. **users**: Prepared for future authentication
   - Currently defined but not actively used

**Migration Strategy**:
- Migrations directory: `./migrations`
- Command: `npm run db:push` to sync schema
- Schema changes tracked via Drizzle Kit

### Form Validation

**Library**: Zod for schema validation
- Integration with react-hook-form via @hookform/resolvers
- Shared validation schemas between client and server
- Type-safe form data with TypeScript inference

**Contact Form Validation**:
- Name: 2-100 characters required
- Email: Valid email format required
- Phone: Optional string
- Message: 10-500 characters required
- Program interest: Optional dropdown selection

## External Dependencies

### Third-Party Services

**Database**: 
- Neon PostgreSQL (configured via @neondatabase/serverless)
- Environment variable: DATABASE_URL
- Currently not active (using in-memory storage as fallback)

**Session Store**:
- connect-pg-simple for PostgreSQL-backed sessions
- Prepared but not currently implemented

### UI Component Libraries

**Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, etc.
- Full list of 20+ component primitives installed

**shadcn/ui**: Pre-styled components built on Radix UI
- Configuration: components.json with New York style
- Path aliases for @/components, @/lib, @/hooks
- Custom Tailwind configuration

### Development Tools

**Build Tools**:
- Vite: Frontend build and dev server
- esbuild: Server-side bundling for production
- tsx: TypeScript execution for development

**Replit Integration**:
- @replit/vite-plugin-runtime-error-modal: Development error overlay
- @replit/vite-plugin-cartographer: Code navigation (dev only)
- @replit/vite-plugin-dev-banner: Development banner (dev only)

### Fonts & Assets

**Typography**: 
- Google Fonts: Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono
- Loaded via HTML link tags in client/index.html

**Images**:
- Generated images stored in attached_assets/generated_images/
- Image imports: Tokyo, Korea, and generic student images
- Fallback system for mapping program images to imports

### Utility Libraries

- class-variance-authority: Component variant management
- clsx + tailwind-merge: Conditional className utilities
- date-fns: Date manipulation and formatting
- embla-carousel-react: Carousel component functionality
- lucide-react: Icon library
- nanoid: Unique ID generation
- wouter: Lightweight routing (React Router alternative)