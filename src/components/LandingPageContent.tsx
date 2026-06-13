import React from 'react';
import { 
  Shield, 
  Award, 
  Cpu, 
  ChevronDown, 
  Twitter, 
  MessageSquare, 
  Database, 
  Flame, 
  Fingerprint, 
  Sparkles
} from 'lucide-react';
// @ts-ignore
import neuralPortrait from '../assets/images/neural_mirror_portrait_1781325570231.jpg';
import MemoryFlowDiagram from './MemoryFlowDiagram';

interface LandingPageContentProps {
  onEnter: () => void;
}

export default function LandingPageContent({ onEnter }: LandingPageContentProps) {
  return (
    <div className="w-full relative text-gray-200">
      
      {/* SECTION 1: Ribbons of Core Stats */}
      <div className="w-full py-12 border-y border-[#D4AF37]/10 bg-[#0A0F24]/60 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex items-center justify-center gap-3 group">
            <Shield className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-300 font-mono group-hover:text-white transition-colors">
              Quantum-Resistant Encryption
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 group">
            <Award className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-300 font-mono group-hover:text-white transition-colors">
              ISO 27001 Certified
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 group">
            <Cpu className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-300 font-mono group-hover:text-white transition-colors">
              Decentralized Provenance
            </span>
          </div>
        </div>
      </div>

      {/* SECTION: Lifecycle Flow Diagram (Journey of a Memory Capsule) */}
      <MemoryFlowDiagram />

      {/* SECTION 2: Numbered Blocks (Preserve, Encrypt, Inherit) */}
      <div className="w-full pt-12 pb-24 relative z-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 01 */}
          <div className="bg-[#111A3A]/40 border border-[#D4AF37]/10 p-10 rounded-xl hover:border-[#D4AF37]/35 transition-all duration-500 flex flex-col justify-between group h-full hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <div>
              <span className="text-[2.5rem] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/40 to-transparent block mb-6 leading-none">
                01
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wider text-[#D4AF37] mb-4">
                Preserve
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm sm:text-base">
                We spend a lifetime becoming someone. Then time erases the evidence. We preserve your memories as IPFS nodes for permanent, distributed storage.
              </p>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
              IPFS PROTOCOL V2.4
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-[#111A3A]/40 border border-[#D4AF37]/10 p-10 rounded-xl hover:border-[#D4AF37]/35 transition-all duration-500 flex flex-col justify-between group h-full hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <div>
              <span className="text-[2.5rem] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/40 to-transparent block mb-6 leading-none">
                02
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wider text-[#D4AF37] mb-4">
                Encrypt
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm sm:text-base">
                EternalMind protects each capsule with AES-256-GCM encryption before storage, keeping private memories off-chain while preserving verifiable ownership, access, and timestamp records on-chain.
              </p>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
              MILITARY-GRADE SECURITY
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-[#111A3A]/40 border border-[#D4AF37]/10 p-10 rounded-xl hover:border-[#D4AF37]/35 transition-all duration-500 flex flex-col justify-between group h-full hover:shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <div>
              <span className="text-[2.5rem] font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37]/40 to-transparent block mb-6 leading-none">
                03
              </span>
              <h3 className="text-xl font-bold uppercase tracking-wider text-[#D4AF37] mb-4">
                Inherit
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-sm sm:text-base">
                Smart contracts execute lineage protocols, ensuring your digital essence is transferred only to verified on-chain heirs.
              </p>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
              SMART CONTRACT VERIFIED
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: The Digital Mirror */}
      <div className="w-full py-24 bg-[#0A0F24]/40 relative z-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-gray-100 tracking-wider uppercase mb-6 relative">
              The Digital Mirror
              <span className="absolute bottom-[-10px] left-0 w-16 h-[2px] bg-[#D4AF37]" />
            </h2>
            <p className="text-gray-400 font-light leading-relaxed mb-12 text-sm sm:text-base md:text-lg max-w-xl">
              Turn your memories into a protected legacy. EternalMind lets you preserve the real stories in a secure capsule for the people you choose. Powered by AI, EternalMind transforms preserved memories into meaningful conversations.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-[#D4AF37]/10 pt-8 max-w-md">
              <div>
                <div className="text-2xl md:text-3xl font-mono font-bold text-[#D4AF37]">100%</div>
                <div className="text-[10px] tracking-widest text-gray-400 uppercase mt-1 font-mono">Universal File Compatibility</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-mono font-bold text-[#D4AF37]">256-bit</div>
                <div className="text-[10px] tracking-widest text-gray-400 uppercase mt-1 font-mono">Military-Grade Protocol</div>
              </div>
            </div>
          </div>

          {/* Visual Profile Graphics Column */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-8">
            <div className="relative w-80 h-80 flex justify-center items-center select-none scale-[0.9] sm:scale-100">
              
              {/* Outer orbit ring 1 */}
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/15 animate-[spin_30s_linear_infinite]" />
              {/* Outer orbit ring 2 */}
              <div className="absolute inset-4 rounded-full border border-dashed border-[#D4AF37]/20 animate-[spin_45s_linear_infinite_reverse]" />
              {/* Outer orbit ring 3 */}
              <div className="absolute inset-8 rounded-full border border-[#D4AF37]/30" />

              {/* LAT: 0.04ms Indicator */}
              <div className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 origin-left -rotate-90 text-[9px] font-mono tracking-[0.2em] text-[#D4AF37]/60 uppercase">
                LAT: 0.04ms
              </div>

              {/* Sync active text */}
              <div className="absolute right-[-2.5rem] top-1/3 text-[9px] font-mono tracking-[0.2em] text-green-400 uppercase flex items-center gap-1.5 rotate-90 origin-right">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Sync Active
              </div>

              {/* Portrait image container */}
              <div className="absolute inset-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.2)] bg-[#111A3A]/80 flex justify-center items-center">
                <img 
                  src={neuralPortrait} 
                  alt="Neural Avatar Profile" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating tech markings / crosshairs */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent absolute" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent absolute" />
              </div>
            </div>
          </div>

        </div>
        
        {/* Underlay tracking status bar */}
        <div className="mt-8 text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37]/60 uppercase animate-pulse">
            Neural Mirroring in Progress...
          </span>
        </div>
      </div>

      {/* SECTION 4: Digital Provenance */}
      <div className="w-full py-32 relative z-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Header Row */}
          <div className="w-full text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-gray-100 tracking-wider uppercase mb-6 inline-block relative">
              Digital Provenance
              <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-16 h-[2px] bg-[#D4AF37]" />
            </h2>
            <p className="text-gray-400 font-light leading-relaxed max-w-2xl mx-auto text-sm sm:text-base mt-6">
              Every memory stored in the EternalMind Sanctuary is timestamped and signed with your unique On-chain Identity. This creates an immutable record of existence that cannot be altered, censored, or deleted by any central authority.
            </p>
          </div>

          {/* Cards Split Layout */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Cryptographic Verification Left box */}
            <div className="md:col-span-5 bg-[#111A3A]/40 border border-[#D4AF37]/15 p-10 rounded-xl flex flex-col justify-between hover:border-[#D4AF37]/45 transition-all duration-300">
              <div>
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#D4AF37] block mb-4 uppercase">
                  Cryptographic Verification
                </span>
                <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
                  All data packets are hashed and anchored to the Ethereum mainnet for absolute, permanent verification of origin. Any verification request seamlessly resolves instantly on-chain.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/10 flex items-center gap-3">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                  Live Anchor Nodes Active
                </span>
              </div>
            </div>

            {/* Standard Right boxes layout */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Box 1 (SHA-256) */}
              <div className="bg-[#111A3A]/30 border border-[#D4AF37]/10 p-10 rounded-xl flex flex-col justify-center items-center text-center hover:border-[#D4AF37]/35 transition-all duration-300 h-full">
                <span className="text-2xl font-mono font-bold text-[#D4AF37] tracking-wider mb-2">SHA-256</span>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Hashing Standard</span>
              </div>

              {/* Box 2 (ERC-721) */}
              <div className="bg-[#111A3A]/30 border border-[#D4AF37]/10 p-10 rounded-xl flex flex-col justify-center items-center text-center hover:border-[#D4AF37]/35 transition-all duration-300 h-full">
                <span className="text-2xl font-mono font-bold text-[#D4AF37] tracking-wider mb-2">ERC-721</span>
                <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Identity Standard</span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* SECTION 5: The Quote Segment */}
      <div className="w-full py-32 bg-[#0A0F24]/50 border-y border-[#D4AF37]/15 relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="text-[#D4AF37] text-4xl font-serif">"</span>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-gray-100 font-light leading-relaxed max-w-3xl">
            Death is merely a technical limitation. EternalMind is the patch that ensures the human story continues, unbroken, through the digital eons.
          </blockquote>
          
          {/* Author Tag on Golden Divider lines */}
          <div className="flex items-center gap-4 w-full justify-center mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <cite className="not-italic text-xs font-mono font-semibold tracking-[0.25em] text-[#D4AF37] uppercase">
              Dr. Elias Vance
            </cite>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
        </div>
      </div>

      {/* SECTION 6: Call To Action - Secure Your Place in History */}
      <div className="w-full py-32 relative z-10 px-6">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-b from-[#111A3A]/80 to-[#0A0F24]/90 border border-[#D4AF37]/20 p-10 md:p-16 text-center flex flex-col items-center shadow-[0_0_50px_rgba(212,175,55,0.03)] relative overflow-hidden group">
          
          {/* Decorative ambient gold glow in center */}
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[#D4AF37]/5 blur-[80px] -z-10 group-hover:bg-[#D4AF37]/10 transition-colors duration-[1500ms]" />
          
          <h2 className="text-3xl md:text-5xl font-display font-medium text-gray-100 tracking-wider uppercase mb-6 max-w-2xl leading-tight">
            Secure Your Place in History
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base md:text-lg mb-12 max-w-xl">
            The vault is ready. Your memories deserve more than a hard drive. They deserve eternity.
          </p>
          
          {/* Buttons Area */}
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            
            {/* CTA action button that ignites */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const scrollContainer = document.getElementById('dashboard-scroll-container');
                if (scrollContainer) {
                  scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-12 py-5 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black font-semibold uppercase tracking-widest text-sm hover:brightness-110 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_45px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
            >
              Initialize Sanctuary
            </button>
            
            {/* Auxiliary info block */}
            <div className="text-left py-2 border-l border-[#D4AF37]/20 pl-4">
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Authenticated Access
              </div>
              <div className="text-xs font-mono font-semibold text-[#D4AF37] uppercase tracking-wider mt-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Web3 Identity Required
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 7: Premium Styled Footer */}
      <footer className="w-full bg-[#070B1E] border-t border-[#D4AF37]/10 pt-20 pb-12 relative z-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Logo Head */}
          <h3 className="text-xl font-display font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#D4AF37] to-[#AA7C11] tracking-[0.52em] uppercase select-none mb-12">
            EternalMind
          </h3>

          {/* Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-12 text-xs font-mono tracking-widest text-gray-400 uppercase">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">Privacy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">Ethics</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">Lineage</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">Support</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors duration-300">Technical Audit</span>
          </div>

          {/* Social Icons row */}
          <div className="flex items-center gap-8 mb-12 text-gray-400">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#D4AF37] active:scale-95 transition-all duration-300"
              onClick={e => e.stopPropagation()}
            >
              <Twitter className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#D4AF37] active:scale-95 transition-all duration-300"
              onClick={e => e.stopPropagation()}
            >
              <MessageSquare className="w-5 h-5 stroke-[1.5]" />
            </a>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/15 rounded bg-[#111A3A]/40 mb-8">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase">
              Verified Security: CertiK Audited
            </span>
          </div>

          {/* Copyright details */}
          <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase text-center">
            © 2026 ETERNALMIND SANCTUARY — INFINITE PERSISTENCE
          </p>

        </div>
      </footer>

    </div>
  );
}
