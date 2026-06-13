import React, { useState } from 'react';
import { Plus, Database, Sparkles, FolderLock, Heart, HelpCircle, LayoutGrid } from 'lucide-react';
import { Capsule, User } from '../types';
import CapsuleCard from './CapsuleCard';

interface DashboardProps {
  user: User;
  capsules: Capsule[];
  onOpenWizard: () => void;
  onSelectCapsule?: (capsule: Capsule) => void;
}

export default function Dashboard({ 
  user, 
  capsules, 
  onOpenWizard,
  onSelectCapsule 
}: DashboardProps) {
  const [filter, setFilter] = useState<"all" | "sealed" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCapsules = capsules.filter(cap => {
    // Stage 1 filter: Status match
    if (filter !== "all" && cap.status !== filter) return false;
    
    // Stage 2 filter: Search match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        cap.title.toLowerCase().includes(q) ||
        cap.description.toLowerCase().includes(q) ||
        cap.ownerName.toLowerCase().includes(q) ||
        cap.heirEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const rawUserName = user.email.split('@')[0];
  const userName = rawUserName.charAt(0).toUpperCase() + rawUserName.slice(1);

  const sealedCount = capsules.filter(c => c.status === "sealed").length;
  const draftCount = capsules.filter(c => c.status === "draft").length;

  return (
    <div className="w-full min-h-[calc(100vh-76px)] bg-[#0E152D] text-gray-200 py-12 px-6 md:px-12 relative overflow-visible">
      {/* Dynamic decorative backdrop glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-15">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-b border-[#D4AF37]/10 pb-8">
          <div>
            <h2 className="text-heading-md font-display font-light text-gray-100 tracking-wider">
              WELCOME, <span className="text-[#D4AF37] font-semibold uppercase">{userName}</span>
            </h2>
            <p className="text-caption text-gray-400 font-mono uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
              <FolderLock className="w-3.5 h-3.5 text-[#D4AF37]" />
              Secured Decentralized Sanctuary Vault
            </p>
          </div>

          <button
            onClick={onOpenWizard}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black tracking-widest text-button-md uppercase rounded-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
            id="btn-create-capsule"
          >
            <Plus className="w-4 h-4 ml-[-4px]" strokeWidth={2.5} />
            <span>Create Capsule</span>
          </button>
        </div>

        {/* Vault Stats Row (Bento Style metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-[#111A3A]/40 border border-emerald-500/15 rounded-xl p-5 hover:border-emerald-500/35 transition-all">
            <div className="text-caption font-mono text-gray-400 tracking-widest uppercase mb-1">SEALED CAPSULES</div>
            <div className="text-heading-md font-mono font-bold text-emerald-400">{sealedCount}</div>
            <div className="text-caption text-emerald-500/75 font-mono uppercase mt-2">CRYPTOGRAPHICALLY SEALED FILESETS</div>
          </div>

          <div className="bg-[#111A3A]/40 border border-amber-500/15 rounded-xl p-5 hover:border-amber-500/35 transition-all">
            <div className="text-caption font-mono text-gray-400 tracking-widest uppercase mb-1">ACTIVE DRAFTS</div>
            <div className="text-heading-md font-mono font-bold text-amber-400">{draftCount}</div>
            <div className="text-caption text-amber-500/75 font-mono uppercase mt-2">UNSEALED TEMPORARY DRAFTS</div>
          </div>

        </div>

        {/* Action / Control Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          
          {/* Tabs Filter */}
          <div className="flex items-center gap-1 bg-[#111A3A]/60 border border-[#D4AF37]/10 p-1 rounded-lg">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded text-button-md font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "all" ? "bg-[#D4AF37] text-black font-bold" : "text-gray-400 hover:text-white"
              }`}
              id="filter-all"
            >
              All Records
            </button>
            <button
              onClick={() => setFilter("sealed")}
              className={`px-4 py-1.5 rounded text-button-md font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "sealed" ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30" : "text-gray-400 hover:text-white"
              }`}
              id="filter-sealed"
            >
              Sealed
            </button>
            <button
              onClick={() => setFilter("draft")}
              className={`px-4 py-1.5 rounded text-button-md font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filter === "draft" ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30" : "text-gray-400 hover:text-white"
              }`}
              id="filter-draft"
            >
              Drafts
            </button>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72">
            <input 
              type="text"
              placeholder="Search capsules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-[#111A3A]/40 border border-[#D4AF37]/15 rounded-lg text-body-sm font-mono text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50"
              id="capsule-search"
            />
          </div>

        </div>

        {/* Vault Grid Area */}
        {filteredCapsules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="capsules-grid">
            {filteredCapsules.map((capsule) => (
              <CapsuleCard 
                key={capsule.id} 
                capsule={capsule} 
                onSelect={() => onSelectCapsule && onSelectCapsule(capsule)} 
              />
            ))}
          </div>
        ) : (
          /* Empty State Display (Matched UI rules) */
          <div className="w-full text-center py-20 bg-[#111A3A]/20 border border-dashed border-[#D4AF37]/10 rounded-2xl flex flex-col items-center justify-center p-8 max-w-2xl mx-auto" id="dashboard-empty-state">
            <div className="p-4 rounded-full bg-[#111A3A]/60 border border-[#D4AF37]/25 mb-6 text-[#D4AF37]/80">
              <Database className="w-10 h-10 animate-pulse" />
            </div>
            
            <h3 className="text-subtitle-lg font-bold text-gray-200 uppercase tracking-widest mb-2 font-mono">
              No memory capsules yet.
            </h3>
            
            <p className="text-body-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
              Maya, your personal memory vault in the EternalMind network is vacant. Initialize a secure container to protect files and texts for your designated heir.
            </p>

            <button
              onClick={onOpenWizard}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black font-semibold text-button-md uppercase tracking-widest hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.15)] rounded-lg transition-transform duration-300 active:scale-95 cursor-pointer"
              id="empty-state-cta"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initialize First Capsule</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
