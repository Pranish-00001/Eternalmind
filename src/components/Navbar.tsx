import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User as UserIcon, ChevronDown, Shield, LayoutDashboard, Home, Wallet } from 'lucide-react';
import WalletConnectButton from './WalletConnectButton';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigateHome?: () => void;
  onNavigateDashboard?: () => void;
  onWalletConnected?: (address: string) => void;
  hideWalletConnect?: boolean;
}

export default function Navbar({ 
  user, 
  onLogout, 
  onNavigateHome,
  onNavigateDashboard,
  onWalletConnected,
  hideWalletConnect = false
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-[#070B1E]/90 backdrop-blur-md border-b border-[#D4AF37]/10 py-4 px-6 md:px-12 flex items-center justify-between relative z-40">

      {/* Branding */}
      <div 
        onClick={onNavigateHome}
        className="flex items-center gap-3 cursor-pointer group"
        id="navbar-brand"
      >
        <svg 
          width="36" 
          height="36" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300"
        >
          <defs>
            <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
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
            stroke="url(#navGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
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
            stroke="url(#navGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />

          {/* Far Left and Right horizontal circuit lines */}
          <g stroke="url(#navGold)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
            <path d="M 14, 54 H 28" />
            <path d="M 86, 54 H 72" />
            <path d="M 50, 74 L 50, 81" />
          </g>

          {/* Connective neural nodes */}
          <g stroke="url(#navGold)" strokeWidth="3.5" fill="#0E152D">
            <rect x="29" y="23" width="6" height="6" rx="1" />
            <rect x="65" y="23" width="6" height="6" rx="1" />
            <rect x="11" y="51" width="6" height="6" rx="1" />
            <rect x="83" y="51" width="6" height="6" rx="1" />
            <rect x="47" y="81" width="6" height="6" rx="1" />
          </g>

          {/* Central infinity loop overlay */}
          <path 
            d="M 50 50 C 40 40, 25 35, 25 50 C 25 65, 40 60, 50 50 C 60 40, 75 35, 75 50 C 75 65, 60 60, 50 50 Z" 
            fill="none" 
            stroke="url(#navGold)" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        <h1 className="text-sm md:text-base font-display font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA7C11] tracking-[0.3em] uppercase select-none">
          ETERNALMIND
        </h1>
      </div>

      {/* Controls Container */}
      <div className="flex items-center gap-4">
        {/* Wallet Connector */}
        {!hideWalletConnect && (
          <WalletConnectButton 
            onAddressFetched={onWalletConnected} 
            className="px-3.5 py-1.5 font-mono text-[11px]" 
          />
        )}

        {/* User Status / Logout Dropdown */}
        {user && (
          <div className="relative pl-4 border-l border-[#D4AF37]/15" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 hover:bg-[#D4AF37]/5 border border-transparent hover:border-[#D4AF37]/15 rounded-lg transition-all cursor-pointer group"
              id="profile-dropdown-trigger"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFF2B2] via-[#D4AF37] to-[#AA7C11] p-[1.5px] shadow-[0_0_8px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all">
                <div className="w-full h-full rounded-full bg-[#0E152D] flex items-center justify-center text-[#D4AF37] font-mono text-xs font-bold leading-none">
                  {user.email.substring(0, 1).toUpperCase()}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-start text-left max-w-[120px]">
                <span className="text-caption text-[#D4AF37] font-mono tracking-widest font-semibold uppercase leading-none">
                  USER
                </span>
                <span className="text-body-sm text-gray-300 font-light truncate w-full mt-0.5">
                  {user.email.split('@')[0]}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Overlay */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-64 bg-[#0a0f24] border border-[#D4AF37]/20 rounded-xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] z-50 text-left">
                {/* Profile Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#D4AF37]/10 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FFF2B2] via-[#D4AF37] to-[#AA7C11] p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-[#0E152D] flex items-center justify-center text-[#D4AF37] font-mono text-sm font-bold">
                      {user.email.substring(0, 1).toUpperCase()}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-caption text-[#D4AF37] font-mono tracking-widest uppercase">
                      SECURED USER
                    </div>
                    <div className="text-body-sm text-gray-300 font-light truncate" title={user.email}>
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* Options list */}
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onNavigateHome) onNavigateHome();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-button-md text-gray-300 hover:text-white hover:bg-[#D4AF37]/5 rounded-lg transition-colors font-mono cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
                    GO TO HOME VIEW
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (onNavigateDashboard) onNavigateDashboard();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-button-md text-gray-300 hover:text-white hover:bg-[#D4AF37]/5 rounded-lg transition-colors font-mono cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#D4AF37]" />
                    SECURE VAULTS
                  </button>
                </div>

                {/* Sign Out Button */}
                <div className="border-t border-[#D4AF37]/10 mt-3 pt-3">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 text-button-md text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-mono font-bold cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    LOG OUT
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
