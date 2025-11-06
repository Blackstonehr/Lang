# Design Guidelines: languBridge Education Centre

## Design Approach

**Selected Approach**: Education-Focused Professional Design

Creating a trustworthy, inspiring platform for international education that balances professionalism with approachability. Drawing inspiration from leading education platforms while emphasizing cultural exchange and student success.

**Core Principles**:
- Build trust through professional design and clear information
- Inspire through vibrant imagery of study abroad experiences
- Guide students through clear, simple application journey
- Showcase success stories and cultural immersion

---

## Typography

**Font Family**: Inter (already loaded via Google Fonts)

**Hierarchy**:
- **Hero Headline**: text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight
- **Section Headings**: text-3xl md:text-4xl lg:text-5xl, font-bold
- **Subheadings**: text-xl md:text-2xl, font-semibold
- **Program Titles**: text-2xl md:text-3xl, font-bold
- **Body Text**: text-base md:text-lg, leading-relaxed
- **Small Text/Labels**: text-sm, font-medium

---

## Color Strategy

**Primary**: Blue - Trust, education, reliability (var(--primary))
**Accent**: Vibrant highlights for CTAs and important elements
**Backgrounds**: Clean whites and subtle grays for readability
**Success**: Green for positive outcomes and completed steps

---

## Layout System

**Spacing Primitives**: Tailwind spacing scale (4, 6, 8, 12, 16, 20, 24, 32)

**Container Strategy**:
- Max width: max-w-7xl for main content
- Section padding: py-16 md:py-24 for major sections
- Inner spacing: px-4 md:px-8 for horizontal padding
- Card spacing: p-6 md:p-8 for content cards

**Responsive Breakpoints**: 
- Mobile-first approach
- Key breakpoints: md: (768px), lg: (1024px), xl: (1280px)

---

## Component Library

### Navigation
- Sticky header with backdrop blur
- Logo on left, main navigation center
- CTA button (Apply Now) on right
- Mobile: Hamburger menu with slide-out panel
- Height: h-20

### Hero Section
- **Layout**: Full-screen hero with compelling imagery
- **Structure**: 
  - Large headline with gradient accent
  - Subheading describing value proposition
  - Dual CTA buttons (primary + secondary)
  - Background: Hero image with overlay for text readability
- **Spacing**: py-24 md:py-32 lg:py-40
- **Image Treatment**: Subtle dark overlay for text contrast

### Program Cards
- **Card Design**: Clean white cards with subtle shadow
- **Image**: Destination photo at top (aspect-[16/9])
- **Content**: 
  - Destination flag/name
  - Program title
  - Duration and dates
  - Key highlights (3-4 bullets)
  - Price indicator
  - CTA button
- **Hover**: Subtle lift effect (transform: translateY(-4px))
- **Spacing**: p-6 with gap-4 for internal elements

### Testimonial Cards
- **Layout**: Card with student photo, quote, and details
- **Photo**: Circular avatar (w-16 h-16 rounded-full)
- **Quote**: Italic text in quotes
- **Details**: Student name, program, year
- **Background**: Subtle bg-muted or bg-card
- **Spacing**: p-6 md:p-8

### Process Steps
- **Layout**: Horizontal timeline on desktop, vertical on mobile
- **Step Indicator**: Numbered circles connected by lines
- **Content**: Step title and brief description
- **Active State**: Primary color for current step
- **Completed State**: Success color with checkmark

### Contact Form
- **Layout**: Single column, full-width inputs
- **Fields**: Name, Email, Phone, Program Interest (select), Message
- **Validation**: Real-time with clear error messages
- **Submit Button**: Full-width on mobile, auto-width on desktop
- **Success State**: Confirmation message with next steps

### Footer
- **Structure**: Four-column layout on desktop
  - Column 1: Logo and description
  - Column 2: Programs quick links
  - Column 3: Resources (FAQ, Blog, Contact)
  - Column 4: Contact info and social media
- **Bottom Bar**: Copyright and legal links
- **Spacing**: py-12 md:py-16

---

## Visual Elements

### Images
**Required Images**:

1. **Hero Backgrounds** (Primary)
   - Students in Tokyo
   - Students in Korea
   - Students in modern classroom
   - Treatment: Dark overlay (bg-black/40) for text readability

2. **Program Destination Images**
   - Tokyo cityscape
   - Seoul landmarks
   - University campuses
   - Treatment: Aspect ratio 16:9, rounded-xl

3. **Student Testimonials**
   - Real student photos (or realistic placeholders)
   - Treatment: Circular avatars, border-2 border-white shadow

### Gradients
- Hero text: bg-gradient-to-r from-primary to-accent
- Card accents: Subtle gradient overlays on program cards
- Button gradients: Primary CTAs with subtle gradient

### Shadows & Depth
- Cards: shadow-md hover:shadow-lg transitions
- Program images: shadow-lg
- Form inputs: focus:ring-2 focus:ring-primary
- Navigation: shadow-sm with backdrop-blur

### Borders & Radius
- Cards: rounded-xl (12px)
- Images: rounded-xl for large, rounded-lg for medium
- Buttons: rounded-lg (8px)
- Inputs: rounded-md (6px)
- Avatars: rounded-full

---

## Animations

**Strategic Placement**:

1. **Hero Section**: Fade-in on load (animate-in fade-in duration-700)
2. **Program Cards**: Hover lift (transition-all hover:-translate-y-1)
3. **Scroll Reveals**: Staggered fade-in for testimonials
4. **Form Validation**: Shake on error, checkmark on success
5. **Process Steps**: Progress indicator animation

**Transitions**: transition-all duration-300 ease-in-out for interactive elements

---

## Trust & Credibility Elements

### Success Metrics
- Display key statistics (students placed, countries, success rate)
- Use large numbers with subtle animations on scroll

### Partner Logos
- University partner logos in grayscale (opacity-60)
- Hover: Full color (opacity-100)

### Accreditations
- Display relevant certifications and memberships
- Small badges in footer or dedicated section

### Social Proof
- Student testimonials prominently featured
- Video testimonials embedded (YouTube/Vimeo)
- Success stories with photos

---

## Accessibility & Forms

- All interactive elements maintain min-height of h-10 (touch-friendly)
- Form labels clearly associated with inputs
- Error messages with aria-describedby
- Focus indicators: visible ring-2 ring-primary
- Color contrast: WCAG AA compliant
- Keyboard navigation: proper tab order

---

## Mobile Optimization

- Stack multi-column layouts vertically on mobile
- Larger touch targets (min 44x44px)
- Simplified navigation in hamburger menu
- Full-width CTAs on mobile
- Optimize images for mobile bandwidth

---

## Content Strategy

### Homepage
1. Hero with compelling value proposition
2. Featured programs (3-4 destinations)
3. Why Choose Us section (benefits)
4. Student testimonials
5. Application process steps
6. Contact CTA

### Programs Page
1. Filter by destination, duration, level
2. Grid of program cards
3. Comparison feature
4. Application deadline indicators

### Contact/Apply Page
1. Consultation booking form
2. Contact information
3. Office locations/hours
4. FAQ section
