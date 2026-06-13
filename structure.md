# EternalMind Frontend Project Structure

This document outlines the architecture, components, directory layouts, and design systems of the **EternalMind** application. It is designed to act as a comprehensive reference for AI coding agents to understand, maintain, and build upon this codebase.

---

## 1. Project High-Level Overview

**EternalMind** is a high-end decentralized inheritance and memory vault prototype. It enables residents to create, encrypt, seal, and parameterize digital capsules of their life's memories and secrets. These capsules are bound to a particular owner, next-of-kin heir, release target thresholds (timelocks), and verified cryptographically through simulated on-chain ledger contracts.

### Technical Stack:
- **Framework**: React 19 + TypeScript + Vite 6
- **Global Styling**: Tailwind CSS v4 featuring a premium customized dark-mode aesthetic
- **Animations**: `motion` (imported from `motion/react`)
- **Icons**: `lucide-react`
- **3D Visualization**: `@react-three/fiber`, `@react-three/drei`, and `three.js` to render an interactive, atmospheric 3D brain network on the landing page

---

## 2. Global State & Context Management

The state is managed inside a global React context stored in `/src/context/AppContext.tsx` and persists locally in `localStorage` to ensure a robust offline, secure-feeling behavior. All routed pages seamlessly consume this state via the `useAppContext()` hook.

### Storage Keys (`localStorage`):
- `eternalmind_user`: Tracks current authenticated session and profiles (`User` type).
- `eternalmind_capsules`: Stores list of sealed/draft capsules (`Capsule[]` type).
- `eternalmind_wallet`: Keeps persistence of connected MetaMask wallet address.

---

## 3. Directory Layout & Key Files

```
.
├── package.json              # Main project package manifest
├── vite.config.ts            # Vite & Tailwind compilation pipelines
├── metadata.json             # Applet descriptor (camera/micro/geolocation permissions)
├── structure.md              # [This File] Architectural overview of the system
├── src/
│   ├── main.tsx              # Application entrypoint
│   ├── App.tsx               # Root entrypoint configures standard React Router dom
│   ├── types.ts              # Universal TypeScript models and interfaces
│   ├── index.css             # Global Tailwind stylesheets & Meta-inspired typography tokens
│   ├── assets/               # Static images and visual assets
│   ├── context/
│   │   └── AppContext.tsx    # State context orchestrator (User profile, wallet state, capsule actions)
│   ├── pages/                # High-level full routed pages (Home, Auth, Dashboard, Create)
│   │   ├── HomePage.tsx      # Unlocked landing portal fold & interactive Three.js 3D Brain Stage
│   │   ├── AuthPage.tsx      # Routed login/signup screen wrapper with page guards
│   │   ├── DashboardPage.tsx # Authenticated resident dashboard bento portal
│   │   └── CreateCapsulePage.tsx # Standard timeline initialization creation wizard
│   └── components/           # UI Components and step wizards
```

---

## 4. Typography Scale (Meta-Inspired System)

The authenticated product areas implement a **Meta-inspired typography scale** that leverages specific sizes, line heights, letter-spacing, and font-weights of high-density product interfaces. Defined in `src/index.css`, these utility classes are:

- `text-hero-display`: (`font-size: 36px`, `line-height: 44px`, `letter-spacing: -0.02em`) used for massive impact elements.
- `text-display-lg`: (`font-size: 28px`, `line-height: 36px`, `letter-spacing: -0.015em`) used for featured greetings.
- `text-heading-lg`: (`font-size: 20px`, `line-height: 28px`, `letter-spacing: -0.01em`) used for page headers.
- `text-heading-md`: (`font-size: 16px`, `line-height: 22px`, `letter-spacing: -0.005em`) used for section headers and cards.
- `text-body-sm-bold`: (`font-size: 13px`, `line-height: 18px`, `font-weight: 600`) used for metadata-keys, inline emphasize elements, form labels, and small labels.
- `text-body-sm`: (`font-size: 13px`, `line-height: 18px`, `font-weight: 400`) default readable body density.
- `text-caption`: (`font-size: 11px`, `line-height: 15px`, `font-weight: 400`) used for helper text, disclaimers, microcaps, and captions.
- `text-button-md`: (`font-size: 12px`, `line-height: 16px`, `font-weight: 600`, `letter-spacing: 0.05em`) standard uppercase buttons and actions.

---

## 5. UI Components breakdown

### Views & Layout Orchestrators:
1. **Landing page (`src/components/LandingPageContent.tsx`)**:
   - The marketing landing fold before entering. Non-authenticated area. Features clean displaying typography, visual memory pipeline triggers, interactive steps card, and introductory narrative block.
2. **Interactive 3D Stage (`src/components/BrainScene.tsx` & `BrainModel.tsx`)**:
   - Spawns immersive, custom shaded 3D node networks with orbital controls and camera offsets corresponding to the user's scroll amount on the landing page.
3. **Authentication Gateway (`src/components/AuthPage.tsx`)**:
   - Integrates Login & Sign Up templates using credentials verified against simple in-memory mock endpoints. Completely styled with the Meta scale.
4. **Resident Hub Dashboard (`src/components/Dashboard.tsx`)**:
   - Authenticated product dashboard view. Houses bento-box stats cards, tab indices filters, and the custom grid.
5. **Capsule Vault Previewer (`src/components/CapsuleCard.tsx`)**:
   - Renders individual capsule metadata, timelock statuses, email pointers, blockchain indicators, hash, and content indicators.
6. **Unified Creation Flow (`src/components/CapsuleWizard.tsx`)**:
   - Interactive, multi-step creation engine containing 5 modular wizard steps synchronized with progress tracks:
     - **Step 1: Details (`CapsuleDetailsStep.tsx`)**: Owner inputs personal moniker, verified wallet coordinates, and card titles.
     - **Step 2: Memories (`UploadMemoriesStep.tsx`)**: Multi-method interface for drag-and-drop or selectable attachment uploads and raw text memoirs.
     - **Step 3: Heirs (`AddHeirsStep.tsx`)**: Registers recipient identifiers mapped against the cryptographic lock state.
     - **Step 4: Unlock Parameters (`UnlockDateStep.tsx`)**: Connects system release limits past Unix timelocks bounds.
     - **Step 5: Sealing Integrity (`SealSecureStep.tsx`)**: Final data verification panel prior to initiating state changes.

### Navigation & Utilities:
- **`Navbar.tsx`**: High utility header containing unified navigation controls, disconnected/connected MetaMask indicators, and profile settings overlays.
- **`HomeProfile.tsx`**: Floating resident avatar dropdown pinned strictly at coordinate points on home sections, triggering fast dashboard transitions or sign-out routines.
- **`StepProgress.tsx`**: Staggered iconographic progression tracks showing step statuses.
- **`WalletConnectButton.tsx`**: Integrates MetaMask Web3 wallet injection requests, checking standard browser properties for provider networks.
- **`ConfirmationModal.tsx`**: Interactive blockchain simulated terminal executing network signatures, compiling hashing coefficients (SHA-256), mining peer sequences, and anchoring logs.

---

## 6. Routing Mechanics

The app implements clean **React Router client-side routing** mapped directly within `<Routes>` in `src/App.tsx`:
- `/` -> **Home / Landing Page** (`src/pages/HomePage.tsx`)
- `/auth` -> **Credentials Login & Sign Up page** (`src/pages/AuthPage.tsx`)
- `/dashboard` -> **Resident dashboard screen** (`src/pages/DashboardPage.tsx`) (Guarded)
- `/create` -> **Capsule Wizard flow** (`src/pages/CreateCapsulePage.tsx`) (Guarded)

### Page Access Guards
- **Guest Access**: The dashboard and creation pages strictly redirect unauthenticated guests back to the `/auth` coordinate portal to verify credentials.
- **Auto-Login Forwarding**: Authenticated residents who attempt to access the `/auth` folder are automatically fast-forwarded to their session dashboard panel.
- **Fallback Catch**: Any unrecognized paths or typed extensions automatically redirect users safely back to the home view (`/`).
