# Project Structure & Architecture: EternalMind

This document acts as an interactive system blueprint for other AI systems to understand, build, and modify the **EternalMind** application codebase.

---

## 1. Project Vision & Core Domain
**EternalMind** is a high-end, futuristic data-sealing and digital inheritance application. It allows "secured residents" (users) to upload textual thoughts, voice memories, and files into cryptographic vaults called "Sealed Capsules," which remain locked until a target date or are inherited by designated heirs.

### Core Data Models (`/src/types.ts`)
Another AI can quickly parse these types to interface with the core data engine:

```typescript
export interface Attachment {
  name: string;
  type: string;
  size: number;
}

export interface Capsule {
  id: string;
  ownerName: string;
  ownerWalletAddress: string;
  title: string;
  description: string;
  memoryText: string;
  attachments: Attachment[];
  heirEmail: string;
  unlockDate: string;
  status: "draft" | "sealed";
  txHash?: string;
  createdAt: string;
}

export interface User {
  email: string;
}
```

---

## 2. Technical Stack & Dependencies
The project utilizes a modern development stack configured in `package.json` & `vite.config.ts`:

- **Framework**: React 19 (Single-Page Application) with Vite 6.
- **Language**: TypeScript (strict type check enabled).
- **Styling**: Tailwind CSS v4 using the modern `@import "tailwindcss";` direct theme injection.
- **Animations**: `motion` (imported from `motion/react` or `motion`).
- **Icons**: `lucide-react` (uniform icon usage across all components).
- **3D Graphics**: `three`, `@react-three/fiber`, and `@react-three/drei` for rendering an interactive, responsive 3D particle brain on the Landing Page.

---

## 3. Visual & Aesthetic Architecture
EternalMind implements a premium, high-contrast, cyberpunk obsidian styling language:
- **Canvas Background**: Deep midnight dark `#070B1E` / `#0A0F24` paired with subtle radial glows and neon gold accents (`#D4AF37`).
- **Typography Pairing**: Elegant Sans/Display headers with monospace subtexts (`font-mono`) displaying container status and cryptographic indicators.
- **Authenticity Constraint**: Strict avoidance of generic templates. Focuses on premium geometric lines, transparent glassmorphism panels, and clean gold keyframes.

---

## 4. Routing & Application State Machine (`/src/App.tsx`)
The application operates on a single-screen viewport routing model guided by the `currentView` reactive state:

| View state (`currentView`) | Description |
| :--- | :--- |
| `"landing"` | Immersive home landing page containing the 3D Brain particle network (`BrainScene`), promotional callouts, stats widgets, and the primary "CREATE VAULT" entry triggers. |
| `"auth"` | Dedicated login/signup gateway supporting email/password authenticator and Google dynamics. |
| `"dashboard"`| The central user control panel listing active and sealed capsules with search parameters, live filters, and creation launchers. |
| `"create-capsule"` | Stepper wizard assisting in the 5-part sealing protocol. |

### Persistent State Handlers (localStorage)
- `eternalmind_user`: Stored user object when active.
- `eternalmind_registered_users`: Memory pool array representing user credentials.
- `eternalmind_remembered_email`: Remember login email state.
- `eternalmind_capsules`: Cached array of user-created capsule models.

---

## 5. File System & Component Registry

### Root Configurations
- `package.json`: Main registry of npm packages, compiler limits, and developer startup modes.
- `vite.config.ts`: Configures compilers, HMR disable tags, and asset handling.
- `metadata.json`: Holds app metadata, frame level permissions, and required capabilities (e.g. `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`).

### Source Codes (`/src`)
- `main.tsx`: Client-side mount entry.
- `App.tsx`: Central hub running state machines, handling authentication persistence, layout setups, and routing.
- `index.css`: Injects standard Google Fonts (`Inter` Sans paired with `JetBrains Mono`) and tailwind theme setup:
  ```css
  @import "tailwindcss";
  @theme {
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  }
  ```

### Components Glossary (`/src/components/*`)
The following components constitute the complete functional surface of EternalMind:

1. **`LandingPageContent.tsx`**
   - Renders secondary sections on the Home viewport, including statistics, interactive workflow grids, provenance timelines, quotes, and the responsive base landing footer.

2. **`BrainScene.tsx` & `BrainModel.tsx`**
   - Configures the WebGL Canvas environment utilizing Three.js and `@react-three/fiber` to render a responsive, spinning 3D point-cloud shape resembling a logical neural network (Brain).

3. **`Navbar.tsx`**
   - Renders the header control bar across subpages (like Dashboard or Wizard). It provides quick access to wallet connections, navigation routes, and user triggers. Note: hidden on the home viewport to allow a completely immersive canvas experience.

4. **`HomeProfile.tsx`** (New Floating Profile Controller)
   - Replaces the standard navigation bar when a logged-in User visits the home viewport (`currentView === "landing"`).
   - Provides a clean, floating, gold-outlined profile bubble with an absolute dropdown mechanism displaying active session markers, navigational jump links, and sign-out triggers.

5. **`AuthPage.tsx`**
   - Consolidates User auth.
   - Includes state transitions between "Login" and "Sign up" with standard validators.
   - Includes a stateful **"Remember me"** checkbox storing the email dynamically in storage.
   - Displays a clean, prominent **"Continue with Google"** option, dynamically logs in using profile metadata, and automates user handshake tokens.

6. **`Dashboard.tsx`**
   - Main terminal for reading and managing files.
   - Features dynamic tab switches (All, Sealed, Drafts), cryptographic status tags, time-remaining counters for locked capsules, and comprehensive search indices. Fully stripped of generic summary boxes for architectural honesty.

7. **`CapsuleWizard.tsx`**
   - The interactive 5-step wizard module that handles fresh Capsule composition. Orchestrates the individual micro-steps in sequence:
     - **`CapsuleDetailsStep.tsx`**: Sets Title, description, and key texts.
     - **`UploadMemoriesStep.tsx`**: Interactive Drag-and-Drop file picker accepting documents, voice notes, or assets.
     - **`UnlockDateStep.tsx`**: Dynamic calendar selection setting the locking parameters.
     - **`AddHeirsStep.tsx`**: Associates the Capsule with specific heir emails.
     - **`SealSecureStep.tsx`**: Digitally "seals" the record, generating simulated cryptographic hashes (`txHash`) and locking the record.

8. **`StepProgress.tsx`**
   - A visual, linear indicator showing completion states and key markers across the Capsule creation steps.

9. **`CapsuleCard.tsx`**
   - Compact visual card rendering individual capsule metadata, status indicators (sealed lock vs active drafts), attachments list, and countdown metrics.

10. **`WalletConnectButton.tsx`**
    - High-contrast, interactive button interface simulating MetaMask/Web3 handshake and binding the cryptographic session to an active address.

11. **`ConfirmationModal.tsx`**
    - Standard micro-dialog asking confirmation for destructive/critical steps (e.g. initiating dynamic draft discards or vault sealing).

---

## 6. Engineering Constraints & Protocols for Editing
When editing files in this repository, subsequent AI model instances MUST follow these criteria strictly:

1. **Keep Imports Standard**: Always import animations from `motion` (or `motion/react` depending on version matches) and icons from `lucide-react`.
2. **Never Break Layout Integrity**: The design enforces a strict black-and-gold visual frame. Never introduce bright primary backgrounds (like default blue or red button vectors) unless styled specifically with cryptographic themes.
3. **Handle State Safely**:
   - Always verify storage lists before attempting to push models dynamically.
   - Maintain the standard payload signatures for capsules so they don't crash the list rendering or countdown modules.
4. **Fast Validation Loop**:
   - Run `npm run lint` (`tsc --noEmit`) frequently to identify type mismatches or missing import definitions.
   - Run `npm run build` after editing components to verify production compatibility and asset resolver setups.
