# Animation System Documentation

This document describes the animation system implemented in the Khao Yai Presentation app.

## Overview

The application uses **Framer Motion** for declarative, performant animations throughout the presentation. All animations respect user accessibility preferences via the `prefers-reduced-motion` media query.

## Key Features

### 1. Slide Transitions
- **Type**: Slide-in from right/left with fade
- **Duration**: 300-500ms with spring physics
- **Implementation**: `PresentationContainer.tsx`
- **Variants**: Defined in `lib/animations.ts`

```typescript
// Slide enters from right when moving forward
// Slide enters from left when moving backward
slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
}
```

### 2. Staggered Fade-In
- **Type**: Sequential fade-in with 100ms delay between elements
- **Duration**: 500-600ms per element
- **Implementation**: Used in all slide components
- **Variants**: `containerVariants` and `itemVariants` in `lib/animations.ts`

```typescript
// Container staggers children animations
containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

// Individual items fade in from below
itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}
```

### 3. Hover Animations
- **Type**: Scale 1.05 with shadow increase
- **Duration**: 300ms
- **Implementation**: `Card.tsx`, `Button.tsx`
- **Effect**: Provides tactile feedback on interactive elements

```typescript
// Cards scale up and increase shadow on hover
whileHover={{
  scale: 1.05,
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  transition: { duration: 0.3 }
}}
```

### 4. Loading Skeleton Screens
- **Type**: Pulsing opacity animation
- **Duration**: 1.5s infinite loop
- **Implementation**: `ImageSkeleton.tsx`, `Image.tsx`
- **Purpose**: Provides visual feedback while images load

```typescript
// Skeleton pulses between 50% and 80% opacity
animate={{ opacity: [0.5, 0.8, 0.5] }}
transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
```

### 5. Reduced Motion Support
- **Type**: Accessibility feature
- **Implementation**: `useReducedMotion` hook, CSS media query
- **Behavior**: Reduces all animations to 0.01ms when user prefers reduced motion
- **Files**: `lib/hooks/useReducedMotion.ts`, `app/globals.css`

```typescript
// Hook detects user preference
const prefersReducedMotion = useReducedMotion();

// Transitions are adjusted accordingly
const transition = getTransition(normalTransition, prefersReducedMotion);
```

## Component-Specific Animations

### PresentationContainer
- Slide transitions (horizontal slide with fade)
- Keyboard and touch gesture support
- URL hash synchronization

### Slide Components (Slide01-Slide12)
- Container-level staggered animations
- Individual element fade-ins
- Conditional animations based on `isActive` prop

### Card Component
- Hover scale (1.05)
- Shadow increase on hover
- Tap scale (0.98) for tactile feedback
- Initial fade-in from below

### Button Component
- Variant-specific hover effects
- Primary: Background darkens, shadow increases
- Secondary: Background fills with sage color
- Ghost: Background fills with sand color
- Tap scale (0.95)

### Image Component
- Loading skeleton while image loads
- Fade-in transition when loaded
- Fallback UI for failed loads
- Lazy loading support

### Timeline Component
- Staggered item animations
- Hover tooltips with fade-in
- Progress indicator animation

### Accordion Component
- Smooth expand/collapse animations
- Content fade-in when expanded
- Icon rotation animation

## Animation Utilities

### `lib/animations.ts`
Centralized animation variants and configurations:
- `slideVariants` - Slide transitions
- `containerVariants` - Staggered container
- `itemVariants` - Staggered items
- `hoverVariants` - Hover effects
- `fadeInVariants` - Fade animations
- `scaleInVariants` - Scale animations
- `pulseVariants` - Pulse effects
- `transitionPresets` - Reusable transitions

### `lib/hooks/useReducedMotion.ts`
Accessibility hook for motion preferences:
- `useReducedMotion()` - Detects user preference
- `getAnimationDuration()` - Adjusts duration
- `getTransition()` - Adjusts transition config

## CSS Animations

### `app/globals.css`
Global animation styles and keyframes:
- `@media (prefers-reduced-motion: reduce)` - Disables animations
- `skeleton-pulse` - Loading animation
- `fade-in` - Simple fade effect
- `slide-in-right` - Slide from right

## Performance Considerations

1. **GPU Acceleration**: All animations use `transform` and `opacity` properties
2. **Will-Change**: Applied sparingly to animated elements
3. **Lazy Loading**: Images use `loading="lazy"` attribute
4. **Code Splitting**: Framer Motion is tree-shaken for optimal bundle size
5. **Reduced Motion**: Respects user preferences for accessibility

## Best Practices

1. **Always use variants**: Define animation variants in `lib/animations.ts`
2. **Respect reduced motion**: Use `useReducedMotion` hook for custom animations
3. **Keep durations consistent**: Use preset durations (0.3s, 0.5s, 0.6s)
4. **Stagger thoughtfully**: Use 100ms delay for optimal perception
5. **Test accessibility**: Verify animations work with reduced motion enabled

## Testing Animations

### Enable Reduced Motion (macOS)
1. System Preferences → Accessibility → Display
2. Enable "Reduce motion"

### Enable Reduced Motion (Windows)
1. Settings → Ease of Access → Display
2. Enable "Show animations in Windows"

### Browser DevTools
- Chrome: DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion`
- Firefox: about:config → `ui.prefersReducedMotion` = 1

## Future Enhancements

- [ ] Add page transition sound effects (optional)
- [ ] Implement parallax scrolling effects
- [ ] Add confetti animation for final slide
- [ ] Create custom loading animations per slide theme
- [ ] Add gesture-based animations (pinch, rotate)

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [Animation Performance](https://web.dev/animations/)
