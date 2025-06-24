# Project Structure

This document outlines the organized file structure for the DualType project.

## 📁 Source Code Organization

### `/src/components/`

Components are organized by their purpose and functionality:

#### `/layout/` - Layout & Navigation Components

- `Navbar.tsx` - Main navigation bar
- `Header.tsx` - Page header component
- `Footer.tsx` - Site footer
- `Bottombar.tsx` - Bottom navigation/action bar

#### `/sections/` - Page Section Components

- `About.tsx` - About section
- `Features.tsx` & `Feature.tsx` - Features showcase
- `Presentation.tsx` - Product presentation
- `Reviews.tsx` & `Review.tsx` - Customer reviews
- `Specifications.tsx` & `Specification.tsx` - Product specs
- `Article.tsx` - Article/blog content
- `Process.tsx` & `ProcessPart.tsx` - Process explanation
- `FromOrder.tsx` - Order/purchase flow
- `Instruction.tsx` - Usage instructions
- `Inuse.tsx` - In-use demonstrations
- `Usability.tsx` - Usability features

#### `/ui/` - Reusable UI Components

- `Btn.tsx` - Standard button component
- `borderbtn.tsx` - Border-styled button
- `Tag.tsx` - Tag/label component
- `Text.tsx` - Text component
- `Line.tsx` - Line/divider component
- `Links.tsx` - Link components
- `blocks.tsx` - Block layout components
- `switches.tsx` - Switch/toggle components
- `Frame.tsx` - Frame wrapper component
- `HorizontalText.tsx` - Horizontal text layout
- `TextPresentation.tsx` - Text presentation component

#### `/animations/` - Animation Components

- `Appear.tsx` - Basic appear animation
- `CleanAppear.tsx` - Clean appear effect
- `DownsideAppear.tsx` - Downside appear animation
- `FeaturesAppear.tsx` - Features-specific animation
- `Blurout.tsx` - Blur out effect
- `StaggerBlurOut.tsx` - Staggered blur out
- `Rotation.tsx` - Rotation animations
- `ImageSequencePlayer.tsx` - Image sequence player

#### `/three/` - Three.js 3D Components

- `ThreeScene.tsx` - Main Three.js scene
- `Keyboard.tsx` - 3D keyboard model
- `KeyboardView.tsx` - Keyboard view component

### `/src/hooks/` - Custom React Hooks

- `useLenis.tsx` - Smooth scrolling hook using Lenis

### `/src/lib/` - Utility Libraries

_Ready for utility functions and configurations_

### `/src/types/` - TypeScript Type Definitions

_Ready for shared TypeScript interfaces and types_

## 📁 Public Assets Organization

### `/public/assets/`

All static assets are organized by type:

#### `/images/` - Image Assets

- Product images
- UI graphics
- Backgrounds
- Screenshots

#### `/icons/` - Icon Assets

- SVG icons
- Logo files
- UI icons

#### `/models/` - 3D Model Assets

- `.glb` and `.gltf` files
- Texture files
- 3D keyboard models

#### `/videos/` - Video Assets

- Product demonstrations
- Animation sequences
- Background videos

#### `/fonts/` - Font Assets

- Custom font files
- Typography assets

## 🔧 Configuration Files

All configuration files remain in the root:

- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

## 📦 Import Patterns

Thanks to the index files, you can now use cleaner imports:

```typescript
// Layout components
import { Navbar, Header, Footer } from '@/components/layout';

// Section components
import { Features, Reviews, Specifications } from '@/components/sections';

// UI components
import { Button, Tag, Frame } from '@/components/ui';

// Animations
import { Appear, Rotation } from '@/components/animations';

// Three.js components
import { ThreeScene, Keyboard } from '@/components/three';

// Hooks
import useLenisScroll from '@/hooks/useLenis';
```

## 🎯 Benefits of This Organization

1. **Clear Separation of Concerns** - Each folder has a specific purpose
2. **Easier Navigation** - Developers can quickly find what they need
3. **Better Maintainability** - Related components are grouped together
4. **Scalable Structure** - Easy to add new components in the right place
5. **Clean Imports** - Index files provide clean import statements
6. **Asset Organization** - Public assets are logically grouped

## 🔧 Fixed Asset Path Issues

All asset references have been updated from the old structure to the new organized structure:

### Before (404 errors):

```
/img/article1.png → /assets/images/article1.png
/img/article2.png → /assets/images/article2.png
/svg/longarrow.svg → /assets/icons/longarrow.svg
/svg/Vector.svg → /assets/icons/Vector.svg
/3d/object/customczysta2.gltf → /assets/models/object/customczysta2.gltf
/3d/epic/Untitled.gltf → /assets/models/epic/Untitled.gltf
```

### Components Fixed:

- `src/app/page.tsx` - Article images
- `src/components/layout/Navbar.tsx` - Arrow icon
- `src/components/layout/Header.tsx` - Frame image
- `src/components/layout/Footer.tsx` - Signature and background images
- `src/components/sections/Presentation.tsx` - Vector SVG
- `src/components/three/Keyboard.tsx` - 3D model and textures
- `src/components/three/KeyboardView.tsx` - 3D model
- `src/components/ui/borderbtn.tsx` - Arrow icon
- `src/components/ui/Links.tsx` - Border SVG
- `src/app/layout.tsx` - Thumbnail image
- `src/app/globals.css` - Border background image
