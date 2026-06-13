import React, { useState, useEffect } from 'react';
import BrainScene from './components/BrainScene';
import LandingPageContent from './components/LandingPageContent';
import Navbar from './components/Navbar';
import HomeProfile from './components/HomeProfile';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import CapsuleWizard from './components/CapsuleWizard';
import { User, Capsule } from './types';

type ViewMode = "landing" | "auth" | "dashboard" | "wizard";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  
  // Navigation Routing System
  const [currentView, setCurrentView] = useState<ViewMode>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [signUpByDefault, setSignUpByDefault] = useState<boolean>(false);

  // Initialize and load session parameters
  useEffect(() => {
    // 1. Load User Session
    const savedUser = localStorage.getItem('eternalmind_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse user session", e);
      }
    }

    // 2. Load Secured Capsules
    const savedCapsules = localStorage.getItem('eternalmind_capsules');
    if (savedCapsules) {
      try {
        const parsed = JSON.parse(savedCapsules) as Capsule[];
        setCapsules(parsed);
      } catch (e) {
        console.error("Failed to parse capsules collection", e);
      }
    }

    // 3. Load Wallet Signer
    const savedWallet = localStorage.getItem('eternalmind_wallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollAmount(e.currentTarget.scrollTop);
  };

  const scrollToJourney = () => {
    const element = document.getElementById("journey-of-memory");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Create Vault Trigger
  const handleCreateVaultClick = (defaultSignUpTab = false) => {
    setSignUpByDefault(defaultSignUpTab);
    if (user) {
      setCurrentView("dashboard");
    } else {
      setCurrentView("auth");
    }
  };

  // Auth Success transition
  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView("dashboard");
  };

  // Logout Trigger
  const handleLogout = () => {
    localStorage.removeItem('eternalmind_user');
    setUser(null);
    setCurrentView("landing");
  };

  // Sync and save updated capsules collection
  const handleSaveCapsule = (newCapsule: Capsule) => {
    const updatedCollection = [newCapsule, ...capsules];
    setCapsules(updatedCollection);
    localStorage.setItem('eternalmind_capsules', JSON.stringify(updatedCollection));
    setCurrentView("dashboard");
  };

  return (
    <div 
      className={`relative w-screen h-screen overflow-hidden bg-[#0E152D] font-sans selection:bg-[#D4AF37]/30 selection:text-white ${
        !hasEntered && currentView === "landing" ? 'cursor-pointer' : ''
      }`}
      onClick={() => !hasEntered && currentView === "landing" && setHasEntered(true)}
    >
      
      {/* Absolute Profile header element for logged-in residents on the home viewport */}
      {currentView === "landing" && user && (
        <HomeProfile 
          user={user} 
          onLogout={handleLogout} 
          onNavigateDashboard={() => setCurrentView("dashboard")}
        />
      )}
      
      {/* BACKGROUND 3D BRAIN - Rendered while in landing page to keep it highly visually immersive */}
      {currentView === "landing" && (
        <div 
          style={{
            pointerEvents: hasEntered && scrollAmount > 200 ? 'none' : 'auto'
          }}
          className={`absolute inset-0 z-0 origin-center transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            hasEntered 
              ? 'translate-x-[5%] translate-y-[32%] sm:translate-y-[28%] md:translate-y-[10%] md:translate-x-[25vw] lg:translate-x-[30vw] xl:translate-x-[32vw] scale-[0.75] md:scale-[0.9]' 
              : 'translate-x-[5%] -translate-y-[6%] sm:-translate-y-[4%] md:-translate-y-[2%] scale-[0.8] md:scale-[0.88]'
          }`}
        >
          <div 
            style={{
              transform: `translateY(${-scrollAmount}px)`,
            }}
            className="w-full h-full pointer-events-auto"
          >
            <BrainScene />
          </div>
        </div>
      )}

      {/* FOREGROUND HEADER LOGO IN LANDING FOLD */}
      {currentView === "landing" && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div 
            style={{
              transform: `translateY(${-scrollAmount}px)`,
            }}
            className="w-full h-full pointer-events-none"
          >
            <header className={`w-full py-12 flex justify-center items-center transition-all duration-[1500ms] delay-500 ${
              hasEntered ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-12 opacity-0'
            }`}>
              <div 
                onClick={() => handleCreateVaultClick(false)}
                className="pointer-events-auto cursor-pointer flex justify-center items-center hover:scale-105 active:scale-95 transition-transform duration-300" 
                id="header-logo"
              >
                <svg 
                  width="63" 
                  height="63" 
                  viewBox="0 0 100 100" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="opacity-90 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transform -translate-y-[23%]" 
                  id="header-logo-svg"
                >
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2B2" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#AA7C11" />
                    </linearGradient>
                  </defs>
                  
                  {/* Left Hemisphere Outline */}
                  <path
                    d="
                      M 48, 44 
                      L 48, 16 
                      C 48, 8, 32, 8, 32, 16
                      L 32, 23
                      M 32, 29
                      L 32, 34
                      C 25, 34, 18, 38, 18, 46
                      C 18, 52, 14, 54, 14, 54
                      C 14, 54, 18, 56, 18, 62
                      C 18, 70, 25, 74, 32, 74
                      L 32, 80
                      C 32, 88, 48, 88, 48, 80
                      L 48, 56
                    "
                    stroke="url(#goldGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.85"
                    id="brain-outline-left"
                  />

                  {/* Right Hemisphere Outline */}
                  <path
                    d="
                      M 52, 44 
                      L 52, 16 
                      C 52, 8, 68, 8, 68, 16
                      L 68, 23
                      M 68, 29
                      L 68, 34
                      C 75, 34, 82, 38, 82, 46
                      C 82, 52, 86, 54, 86, 54
                      C 86, 54, 82, 56, 82, 62
                      C 82, 70, 75, 74, 75, 74
                      L 68, 80
                      C 68, 88, 52, 88, 52, 80
                      L 52, 56
                    "
                    stroke="url(#goldGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.85"
                    id="brain-outline-right"
                  />

                  {/* Far Left and Right horizontal circuit lines */}
                  <g stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" id="circuit-lines">
                    <path d="M 14, 54 H 28" />
                    <path d="M 86, 54 H 72" />
                    <path d="M 50, 74 L 50, 81" />
                  </g>

                  {/* Connective neural nodes */}
                  <g stroke="url(#goldGradient)" strokeWidth="3" fill="#0E152D" id="circuit-nodes">
                    <rect x="29" y="23" width="6" height="6" rx="1" />
                    <rect x="65" y="23" width="6" height="6" rx="1" />
                    <rect x="11" y="51" width="6" height="6" rx="1" />
                    <rect x="83" y="51" width="6" height="6" rx="1" />
                    <rect x="47" y="81" width="6" height="6" rx="1" />
                  </g>

                  {/* Central golden infinity loop overlay */}
                  <path 
                    d="M 50 50 C 40 40, 25 35, 25 50 C 25 65, 40 60, 50 50 C 60 40, 75 35, 75 50 C 75 65, 60 60, 50 50 Z" 
                    fill="none" 
                    stroke="url(#goldGradient)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    id="infinity-loop"
                  />
                </svg>
              </div>
            </header>
          </div>
        </div>
      )}

      {/* VIEWPORT 1: UNIGNITED ENTER PROMPT (Cover Page Overlay) */}
      {currentView === "landing" && (
        <div 
          className={`absolute inset-x-0 bottom-16 flex justify-center z-20 pointer-events-none transition-all duration-[1000ms] ${
            hasEntered ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0 animate-pulse'
          }`}
        >
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-light opacity-85 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
            Click to Ignite
          </p>
        </div>
      )}

      {/* VIEWMODE 1: IMMERSIVE LANDING PAGE */}
      {currentView === "landing" && (
        <div 
          id="dashboard-scroll-container"
          onScroll={handleScroll}
          className={`absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scroll-smooth transition-all duration-[1500ms] ${
            hasEntered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-24'
          }`}
        >
          {/* First Fold: Hero Sanctuary Panel */}
          <div className="w-full min-h-screen flex flex-col justify-center relative px-8 md:px-16 lg:px-24">
            <div className="max-w-7xl mx-auto w-full relative z-10 pt-32 pb-40">
              <div className="max-w-2xl backdrop-blur-sm lg:backdrop-blur-none bg-[#0E152D]/40 lg:bg-transparent p-6 -ml-6 rounded-2xl lg:p-0 lg:ml-0 overflow-visible">
                
                <h2 className="text-gray-100 uppercase tracking-[0.3em] font-light mb-4 text-xs sm:text-sm">
                  What if data could outlive
                </h2>
                
                <h1 className="text-[#D4AF37] font-display font-bold text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] leading-none uppercase mb-6 tracking-tight scale-y-[1.15] origin-bottom-left">
                  Mortality?
                </h1>
                
                <p className="text-gray-400 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg">
                  EternalMind takes your words, stories, and voice, and seals them within an unbreakable cryptographic vault.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <button 
                    onClick={() => handleCreateVaultClick(false)} // Default to login tab
                    className="px-10 py-4 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black font-semibold uppercase tracking-widest text-xs hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
                    id="hero-create-vault-btn"
                  >
                    Create Vault
                  </button>
                  {user && (
                    <button 
                      onClick={() => setCurrentView("dashboard")}
                      className="px-8 py-4 border border-[#D4AF37]/30 hover:border-[#D4AF37] bg-[#111A3A]/44 text-[#D4AF37] hover:text-white font-semibold uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer"
                    >
                      Enter Dashboard
                    </button>
                  )}
                  <button 
                    onClick={scrollToJourney}
                    className="px-4 py-4 text-gray-300 font-medium uppercase tracking-[0.18em] text-xs hover:text-white transition-colors duration-300"
                  >
                    The Journey of a Memory
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Informational Sections (Stats, Numbered Cards, Mirror, Provenance, Quotes, Footer) */}
          <LandingPageContent onEnter={() => handleCreateVaultClick(false)} />
        </div>
      )}

      {/* VIEWMODE 2, 3, 4: AUTHENTICATION, DASHBOARD, AND CAPSULE WIZARD */}
      {currentView !== "landing" && (
        <div className="w-full h-screen bg-[#0E152D] flex flex-col overflow-y-auto">
          {/* Header persistent control */}
          <Navbar 
            user={user} 
            onLogout={handleLogout} 
            onNavigateHome={() => setCurrentView("landing")} 
            onNavigateDashboard={() => setCurrentView("dashboard")}
            onWalletConnected={(address) => setWalletAddress(address)}
            hideWalletConnect={currentView === "auth"}
          />

          {/* Render Route view */}
          <div className="flex-grow flex flex-col justify-stretch">
            {currentView === "auth" && (
              <AuthPage
                onAuthSuccess={handleAuthSuccess}
                onBackToLanding={() => setCurrentView("landing")}
                defaultToSignUp={signUpByDefault}
              />
            )}

            {currentView === "dashboard" && user && (
              <Dashboard
                user={user}
                capsules={capsules}
                onOpenWizard={() => setCurrentView("wizard")}
                onSelectCapsule={(cap) => {
                  alert(`Accessing Capsule "${cap.title}" // Status: ${cap.status.toUpperCase()} \nUnlock Date: ${new Date(cap.unlockDate).toLocaleDateString()}`);
                }}
              />
            )}

            {currentView === "wizard" && user && (
              <CapsuleWizard
                user={user}
                onCloseWizard={() => setCurrentView("dashboard")}
                onSaveCapsule={handleSaveCapsule}
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
