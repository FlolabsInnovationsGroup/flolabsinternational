# EXACT WordPress Match - Action Items

**WordPress Reference**: https://flolabs.international
**Current Next.js**: https://flolabsfrontend-fupkdqz3x-flomad-dev.vercel.app

---

## CRITICAL VISUAL DIFFERENCES

### 1. ❌ HERO SECTION - COMPLETELY WRONG
**WordPress**: Dark hero with gradient overlay, barely visible background image
- Background: VERY dark (#222 or darker)
- Gradient overlay: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)`  
- Text color: Bright blue (#4A9EFF or similar)
- Overall feel: **DARK AND DRAMATIC**

**Current Next.js**: Light gray background with visible Frame-4.jpg
- ❌ TOO LIGHT
- ❌ Wrong gradient
- ❌ Image too visible

**FIX**: Make hero MUCH darker, almost black background with heavy dark gradient overlay

---

### 2. ❌ SECTION COLOR ALTERNATION
**WordPress Pattern**:
1. Hero: **DARK (#222-#333)**
2. Get Recruited: **WHITE**
3. Our Projects: **BLUE (#0047AB)**  
4. Ambitious Projects: **WHITE**
5. Our Verticals: **BLUE (#0047AB)**
6. Long Live Learning: **WHITE**
7. Our Benefits: **BLUE (#0047AB)**
8. Methodology: **BLUE (#0047AB)** (stays blue, no alternation here)
9. Footer: **DARK BLACK (#000 or #111)**

**Current Next.js**: 
- ❌ Some sections using wrong colors
- ❌ Not matching WordPress pattern

**FIX**: Update each component to match exact background colors from WordPress

---

### 3. ❌ TYPOGRAPHY & SPACING
**WordPress**:
- Body font: Appears to be system font or Roboto
- Line height: 1.8 for body text
- Heading font weight: Bold but not extra-bold
- Letter spacing: Normal, not too tight

**Current Next.js**:
- ✅ Generally close but needs verification

**FIX**: Match exact font weights and line heights

---

### 4. ❌ COMPONENT CARDS
**WordPress "Our Projects" cards**:
- White cards on BLUE background
- Clean shadows
- Blue headings inside white cards
- Proper padding

**Current Next.js**:
- Need to verify card styling matches

---

### 5. ❌ HEADER/NAV BAR
**WordPress**:
- White background
- Logo: Small Flo Labs logo (91x50px)
- Nav items: Blogs, About us, Projects, Internships (exact order)
- Simple, clean design
- Sticky header

**Current Next.js**:
- ✅ Logo added
- ✅ Nav order corrected
- Needs visual comparison

---

### 6. ⚠️ MISSING IMAGES

**Known missing**:
- Hero section: Frame-4.jpg exists but used incorrectly (too visible)
- Project cards: May need images from Strapi
- Verticals: May have icons/images
- About page hero: Frame-4.jpg added but needs dark overlay

**Need to check**:
- Do project cards have images in WordPress?
- Do verticals have icons?
- Are there other background images?

---

### 7. ❌ FOOTER
**WordPress Footer**:
- **PURE BLACK background** (#000 or very close)
- White text
- Three columns: "Flo Labs", "Our Projects", "Follow Us"
- Minimal padding
- Clean, professional look

**Current Next.js**:
- Need to verify exact match

---

## IMMEDIATE ACTION PLAN

### Phase 1: FIX HERO (HIGHEST PRIORITY)
```tsx
// hero.tsx - Make it DARK like WordPress
<section className="relative overflow-hidden bg-[#222222] py-32 md:py-48 min-h-[70vh]">
  <div className="absolute inset-0">
    {/* Image at very low opacity or removed */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50" />
  </div>
  {/* Text in bright blue #4A9EFF */}
</section>
```

### Phase 2: FIX SECTION BACKGROUNDS
- Get Recruited: `className="bg-white"`
- Projects: `className="bg-[#0047AB]"` (royal blue)
- Ambitious: `className="bg-white"`
- Verticals: `className="bg-[#0047AB]"`
- Long Live: `className="bg-white"`
- Benefits: `className="bg-[#0047AB]"`
- Methodology: `className="bg-[#0047AB]"`

### Phase 3: FIX ABOUT PAGE
- Hero: Frame-4.jpg with HEAVY dark blue overlay
- Match WordPress layout exactly

### Phase 4: VERIFY ALL TEXT CONTENT
- Every heading
- Every paragraph
- Every button text
- Make sure they match WordPress word-for-word

---

## TESTING CHECKLIST

- [ ] Hero section is DARK (not light gray)
- [ ] Logo displays correctly in header
- [ ] Navigation order matches: Blogs, About us, Projects, Internships
- [ ] Section backgrounds alternate: white → blue → white → blue
- [ ] All text content matches WordPress exactly
- [ ] Footer is pure black with white text
- [ ] Cards have proper shadows and styling
- [ ] Mobile responsive design works
- [ ] All links work correctly

---

## COLOR PALETTE (FROM WORDPRESS)

```css
/* Primary Colors */
--hero-bg: #222222 (very dark gray/black)
--primary-blue: #0047AB (royal blue for sections)
--text-blue: #4A9EFF (bright blue for hero text)
--white: #FFFFFF
--footer-black: #000000 or #111111

/* Text Colors */
--body-text: #4C4C4C or similar gray
--heading-dark: #0047AB (blue)

/* Shadows */
--card-shadow: 0 1px 4px 0 rgba(0,0,0,0.05)
--card-hover-shadow: 0 3px 15px -5px rgba(0,0,0,0.2)
```

---

## NEXT STEPS

1. **URGENT**: Fix hero section to be DARK
2. **URGENT**: Fix all section background colors  
3. Verify footer is pure black
4. Side-by-side comparison of both sites
5. Page-by-page verification (Home, About, Internships, Projects, Blogs, Contact)
6. Test on mobile devices

---

**Goal**: Make Next.js site look IDENTICAL to WordPress site before adding improvements.
