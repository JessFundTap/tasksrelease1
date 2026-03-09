# Accordion Scroll Logic Documentation

## CRITICAL: DO NOT MODIFY

This document explains the accordion scrolling behavior in the Tasks page. This logic has been carefully tuned for optimal user experience.

## Overview

The task accordion uses custom smooth scrolling to create an elegant, slow transition when moving between tasks. This provides visual continuity and helps users understand their progress through the onboarding flow.

## Key Components

### 1. Custom Smooth Scroll Function (`smoothScrollTo`)

**Location:** `src/pages/TasksPage.tsx`

**Purpose:** Provides smooth, controlled scrolling with custom easing

**Configuration:**
- **Duration:** 1000ms (1 second)
- **Easing:** Cubic easing (easeInOutCubic)
- **Why cubic easing:** Creates natural acceleration at the start and deceleration at the end, mimicking real-world physics

```typescript
const smoothScrollTo = (targetY: number, duration: number = 800) => {
  // Uses requestAnimationFrame for 60fps smooth animation
  // Cubic easing for natural motion
  // DO NOT MODIFY
}
```

### 2. Viewport Positioning

**Magic Number:** `viewportHeight * 0.25`

**Why 25% from top:**
- Shows the **completed task** above the scroll target (in the top 25% of viewport)
- Shows the **new expanding task** below (occupying the remaining 75% of viewport)
- Creates visual continuity - users see WHERE they came from and WHERE they're going
- Builds confidence in the onboarding progression

**DO NOT change this to:**
- `0` (top of viewport) - loses context of completed task
- `0.5` (center) - wastes viewport space
- `'start'`, `'center'`, `'end'` blocks - not precise enough

### 3. Timing Breakdown

#### handleNextTask() and handleTaskClick()

```
0ms    - State updates (setActiveTaskId, setCurrentFlowTaskIndex)
400ms  - Scroll calculation begins (allows accordion to start expanding)
400-1400ms - Smooth scroll animation (1000ms duration)
1200ms - Clear transition state (1600ms total)
```

**Why these delays:**
1. **400ms delay:** Gives the accordion time to start its CSS expansion animation
2. **1000ms scroll:** Slow enough to be elegant, fast enough to not feel sluggish
3. **1200ms transition clear:** Accounts for scroll completion (400 + 1000 = 1400ms, with 200ms buffer)

## Common Mistakes to Avoid

### ❌ DON'T DO THIS:

1. **Using native `scrollIntoView` with behavior: 'smooth':**
   - Browser-native smooth scroll is too fast
   - Cannot customize easing or duration
   - Inconsistent across browsers

2. **Changing viewport positioning to 'start' or 'center':**
   - Loses visual continuity
   - Users can't see the completed task
   - Feels jarring and disorienting

3. **Reducing animation duration below 800ms:**
   - Feels rushed and cheap
   - Doesn't give users time to process the transition

4. **Increasing animation duration above 1200ms:**
   - Feels sluggish
   - Users may try to interact before animation completes

5. **Removing the 400ms delay before scroll:**
   - Scroll calculates position before accordion expands
   - Results in incorrect final position
   - Creates janky, two-step animation

## Testing Checklist

When making changes to the Tasks page, verify:

- [ ] Clicking "Continue" smoothly scrolls to show both completed and new task
- [ ] Animation takes approximately 1 second
- [ ] Previous completed task is visible in viewport after scroll
- [ ] New task header appears at roughly 1/4 down from top
- [ ] No jerky or jumpy behavior during accordion expansion
- [ ] Clicking directly on task headers produces same smooth scroll
- [ ] Works on different screen sizes (mobile, tablet, desktop)

## Related Files

- `src/pages/TasksPage.tsx` - Contains scroll logic (DO NOT MODIFY scroll functions)
- `src/components/Tasks/TaskExpander.tsx` - Accordion component
- `src/components/TasksSection/TasksSection.tsx` - Task list container
- `src/index.css` - Global styles (note: scroll-behavior set to 'auto' to allow custom control)

## Questions?

If you think this scroll behavior needs to change, first ask:
1. Why was it designed this way? (Re-read this document)
2. Does the proposed change improve UX for ALL users?
3. Have you tested the change across all device sizes?
4. Does it maintain visual continuity between tasks?

If you still believe changes are needed, document your reasoning thoroughly before proceeding.
