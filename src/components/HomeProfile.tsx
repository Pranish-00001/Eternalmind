import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown, LayoutDashboard, Home } from 'lucide-react';
import { User } from '../types';

interface HomeProfileProps {
  user: User;
  onLogout: () => void;
  onNavigateDashboard: () => void;
}

export default function HomeProfile({ user, onLogout, onNavigateDashboard }: HomeProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-6 right-6 md:right-12 z-50" ref={dropdownRef}>
      {/* Floating profile pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 bg-[#070b1e]/60 backdrop-blur-md hover:bg-[#070b1e]/90 border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 rounded-full transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
        id="home-profile-trigger"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFF2B2] via-[#D4AF37] to-[#AA7C11] p-[1.5px] shadow-[0_0_8px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all">
          <div className="w-full h-full rounded-full bg-[#0E152D] flex items-center justify-center text-[#D4AF37] font-mono text-xs font-bold leading-none">
            {user.email.substring(0, 1).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col items-start text-left max-w-[120px]">
          <span className="text-caption text-[#D4AF37] font-mono tracking-widest font-semibold uppercase leading-none">
            USER
          </span>
          <span className="text-body-sm text-gray-300 font-light truncate w-full mt-0.5 max-w-[80px] sm:max-w-[120px]">
            {user.email.split('@')[0]}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Dropdown Overlay */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-[#0a0f24] border border-[#D4AF37]/25 rounded-2xl p-4 shadow-[0_15px_45px_rgba(0,0,0,0.7)] z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
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

          {/* Actions */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateDashboard();
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-button-md text-gray-300 hover:text-white hover:bg-[#D4AF37]/5 border border-transparent hover:border-[#D4AF37]/10 rounded-lg transition-colors font-mono cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#D4AF37]" />
              SECURE VAULTS
            </button>
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-[#D4AF37]/10 mt-3 pt-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-button-md text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-mono font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              LOG OUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
