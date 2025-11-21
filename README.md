# languBridge Education Centre

## Overview

languBridge Education Centre is a study abroad platform that connects students with international education programs across Asia, Europe, and beyond. The application enables students to browse programs, learn about destinations, and submit contact inquiries for study abroad opportunities. Built as a full-stack web application with a focus on clean design and user experience.

## Deployment

### Primary Branch

**Production deployments** should deploy from the `main` branch.

- The `main` branch is the primary development and deployment branch
- All CI/CD workflows are configured to run on `main`
- Production deployments on Vercel should be configured to deploy from `main`

### Legacy Branch

The `Langu-v2` branch is an older v1 release branch maintained for historical reference. It is not used for active development or production deployments.

### Vercel Configuration

If Vercel is configured via the dashboard:

1. **Production Environment**: Should be set to deploy from `main` branch
2. **Preview Deployments**: Will automatically deploy from pull requests
3. **Legacy Branch**: `Langu-v2` may still exist but should not be used for production

To update the production branch in Vercel:
1. Go to your project settings in Vercel dashboard
2. Navigate to Git settings
3. Set the Production Branch to `main`
4. Save changes

## Development

See [replit.md](./replit.md) for detailed architecture and development information.

## System Architecture

### Frontend Architecture

**Framework**: React 19 with TypeScript, bundled via Vite
- **Routing**: wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

### Backend Architecture

**Framework**: Express.js with TypeScript (ESM modules)
- **Server Setup**: Custom Vite middleware for development HMR
- **API Design**: RESTful endpoints under `/api` prefix
- **Data Storage**: In-memory storage (MemStorage class) with interface for future database migration
- **Session Management**: Prepared for connect-pg-simple session store

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## CI/CD

Quality checks and Lighthouse CI run automatically on:
- Pushes to `main` branch
- Pull requests
- Legacy branches (for historical reference)

See [.github/workflows/quality.yml](./.github/workflows/quality.yml) for workflow configuration.

## Additional Documentation

- [Design Guidelines](./design_guidelines.md) - UI/UX design system and guidelines
- [Improvement Recommendations](./IMPROVEMENTS-RECOMMENDATIONS.md) - Prioritized improvement suggestions
- [Offline Viewing](./OFFLINE-VIEWING.md) - Offline functionality documentation




