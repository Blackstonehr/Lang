# Design Guidelines: Quick Landing Site

## Design Approach

**Selected Approach**: Reference-Based - Modern SaaS Landing Page

Drawing inspiration from industry leaders like Vercel, Linear, and Stripe to create a contemporary, conversion-focused landing page that balances visual appeal with clarity.

**Core Principles**:
- Visual hierarchy drives user through conversion funnel
- Strategic use of gradients and modern effects without overwhelming
- Clean, spacious layouts emphasize key messages
- Professional polish with purposeful animations

---

## Typography

**Font Family**: Inter (Google Fonts CDN)

**Hierarchy**:
- **Hero Headline**: text-6xl md:text-7xl lg:text-8xl, font-bold, tracking-tight
- **Section Headings**: text-4xl md:text-5xl, font-bold
- **Subheadings**: text-xl md:text-2xl, font-medium
- **Feature Titles**: text-xl md:text-2xl, font-semibold
- **Body Text**: text-base md:text-lg, leading-relaxed
- **Small Text/Captions**: text-sm, font-medium

---

## Layout System

**Spacing Primitives**: Tailwind units of 4, 8, 12, 16, 20, 24, 32

**Container Strategy**:
- Max width: max-w-7xl for main content containers
- Section padding: py-20 md:py-32 for major sections
- Inner spacing: px-4 md:px-8 for horizontal padding
- Component gaps: gap-8 md:gap-12 for grids

**Responsive Breakpoints**: 
- Mobile-first approach
- Key breakpoints: md: (768px), lg: (1024px)

---

## Component Library

### Navigation Header
- Sticky positioning with backdrop blur: sticky top-0 z-50 backdrop-blur-lg
- Container with flex layout: flex justify-between items-center
- Logo on left, navigation links center/right
- Mobile: Hamburger menu (lucide-react Menu icon)
- Height: h-16 md:h-20

### Hero Section
- **Layout**: Full-width section with centered content
- **Structure**: 
  - Headline with gradient text effect (from-primary via-accent to-primary)
  - Subheading below headline (max-w-2xl mx-auto)
  - CTA button group with primary + secondary actions (flex gap-4)
  - Trust indicators: "Trusted by" section with company logo placeholders
  - Hero image: AI-generated dashboard mockup (aspect-[16/9], rounded-2xl with shadow-2xl)
- **Spacing**: py-24 md:py-32 lg:py-40
- **Background**: Gradient overlay with radial-gradient effects

### Features Section
- **Grid Layout**: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- **Feature Cards**:
  - Icon container with gradient background (w-12 h-12, rounded-lg)
  - Lucide-react icons (size-6)
  - Title + description structure
  - Hover effect: subtle scale and shadow transition
  - Padding: p-6 md:p-8
  - Border: border with rounded-xl
- **Count**: 6 feature cards total

### Contact Form
- **Layout**: Two-column layout on desktop (grid md:grid-cols-2 gap-8)
  - Left: Form fields
  - Right: Contact information or placeholder
- **Form Structure**:
  - Input fields using shadcn/ui Input component
  - Label above each field
  - Error messages below fields (text-sm, destructive variant)
  - Textarea for message (min-height: h-32)
  - Submit button (full width on mobile, w-auto on desktop)
- **Validation States**:
  - Error state: border-destructive with shake animation
  - Success state: border-success with checkmark
  - Loading state: button with spinner

### Footer
- **Structure**: Three-column layout on desktop (grid md:grid-cols-3 gap-12)
  - Column 1: Company info and description
  - Column 2: Quick links navigation
  - Column 3: Newsletter signup + social media placeholders
- **Bottom Bar**: Copyright and legal links (border-t pt-8 mt-12)
- **Spacing**: py-16 md:py-20

---

## Visual Elements

### Gradients
- Hero background: radial gradient from center
- Text gradients: bg-gradient-to-r bg-clip-text text-transparent
- Button gradients: subtle gradient overlays on primary actions
- Card accents: gradient borders on feature cards

### Shadows & Depth
- Cards: shadow-lg hover:shadow-xl transitions
- Hero image: shadow-2xl for dramatic depth
- Buttons: shadow-md hover:shadow-lg
- Form inputs: focus:ring-2 for focus states

### Borders & Radius
- Cards: rounded-xl (12px) or rounded-2xl (16px) for larger elements
- Buttons: rounded-lg (8px)
- Inputs: rounded-md (6px)
- Images: rounded-2xl for hero, rounded-lg for smaller images

---

## Animations

**Use Sparingly - Strategic Placement Only**:

1. **Hero Section**: Subtle fade-in on page load (animate-in fade-in duration-700)
2. **Feature Cards**: Hover lift effect (transition-transform hover:-translate-y-1)
3. **Form Validation**: Shake animation on error (animate-shake)
4. **Scroll Reveals**: Fade-in-up on scroll for section entries (intersection observer)

**Transitions**: transition-all duration-300 ease-in-out for interactive elements

---

## Images

### Required Images:

1. **Hero Dashboard Mockup** (Primary)
   - Description: Modern dashboard interface with charts, graphs, and clean UI elements
   - Placement: Center of hero section, below headline and CTAs
   - Dimensions: Aspect ratio 16:9, full container width (max-w-5xl)
   - Treatment: Rounded corners (rounded-2xl), dramatic shadow (shadow-2xl)

2. **Trust Indicator Logos** (Secondary)
   - Description: 4-6 company logo placeholders in grayscale
   - Placement: Below hero CTAs, single row
   - Style: opacity-60 hover:opacity-100 transition

3. **Feature Icons** (Component Level)
   - Use Lucide-react icon library for all feature cards
   - No custom image assets needed

**Hero Image Strategy**: Large, impactful hero image is essential for this landing page - it establishes credibility and showcases the product immediately.

---

## Accessibility & Form Implementation

- All form inputs maintain consistent styling: border, rounded-md, focus:ring-2
- Label associations: htmlFor matching input id
- Error messages: aria-describedby linking to error text
- Focus indicators: visible focus:ring-2 focus:ring-offset-2
- Keyboard navigation: proper tab order throughout
- Color contrast: ensure text meets WCAG AA standards