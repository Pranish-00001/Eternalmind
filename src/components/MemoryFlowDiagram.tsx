import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Wallet, 
  Cpu, 
  FolderLock, 
  Database, 
  Key, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowDown
} from 'lucide-react';

interface FlowStep {
  number: number;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  detailsTitle: string;
  detailsDesc: string;
  badge: string;
  badgeColor: string;
  colorClass: string;
  glowColor: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    number: 1,
    title: "CREATE ACCOUNT",
    icon: UserPlus,
    detailsTitle: "Secure Protocol Registration",
    detailsDesc: "Initiate your decentralized profile container. Your biometrics and access vectors are mapped into a secure, gas-optimized protocol address that strictly preserves user privacy.",
    badge: "1. SECURE IDENTIFIER",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    colorClass: "border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 text-gray-300",
    glowColor: "rgba(212,175,55,0.15)"
  },
  {
    number: 2,
    title: "CONNECT WALLET",
    icon: Wallet,
    detailsTitle: "Web3 Vault Integration",
    detailsDesc: "Anchor your identity using non-custodial self-sovereign wallets. This credentials map serves as your private key required for accessing local sandboxes or signing transaction blocks.",
    badge: "2. IDENTITY PAIRING",
    badgeColor: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30",
    colorClass: "border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 text-gray-300",
    glowColor: "rgba(212,175,55,0.2)"
  },
  {
    number: 3,
    title: "BUILD CAPSULE",
    subtitle: "Compiling Memories",
    icon: Cpu,
    detailsTitle: "Semantic Indexing & Vector Synthesis",
    detailsDesc: "Assemble your letters, dynamic photos, audio streams, and physical journals. EternalMind compiles and structures this raw input into a normalized metadata registry for encryption.",
    badge: "3. MEMORY REGISTER",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    colorClass: "border-[#D4AF37]/40 group-hover:border-[#D4AF37]/75 text-gray-300",
    glowColor: "rgba(212,175,55,0.25)"
  },
  {
    number: 4,
    title: "SEAL MEMORY (ENCRYPT)",
    subtitle: "Military-Grade Encryption Applied",
    icon: FolderLock,
    detailsTitle: "AES-256 Symmetric Sharding",
    detailsDesc: "Seal the bundle with multi-layered AES-256-GCM authenticated encryption. The encryption coefficients are decoupled, rendering the memory core mathematically unreadable without authorization keyblocks.",
    badge: "4. ZERO-KNOWLEDGE SEAL",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    colorClass: "border-red-500/20 group-hover:border-red-500/50 text-red-100",
    glowColor: "rgba(239,68,68,0.2)"
  },
  {
    number: 5,
    title: "STORE SECURELY",
    subtitle: "Decentralized Encrypted Storage",
    icon: Database,
    detailsTitle: "Distributed IPFS File Sharding",
    detailsDesc: "The sealed package is shattered into dozens of anonymous shards and broadcast across public InterPlanetary File System nodes. Multiple redundancy clusters guarantee perpetual persistence.",
    badge: "5. P2P PERMANENCE",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    colorClass: "border-[#D4AF37]/40 group-hover:border-[#D4AF37]/70 text-gray-300",
    glowColor: "rgba(212,175,55,0.25)"
  },
  {
    number: 6,
    title: "UNLOCK FOR HEIR",
    subtitle: "Authenticated Heir Access",
    icon: Key,
    detailsTitle: "Temporal Trust Smart Contracts",
    detailsDesc: "Define multi-signature consensus rules or dynamic time-lock triggers on-chain. When conditions are satisfied, specialized encryption blocks unlock and transition keys to verified next-of-kin.",
    badge: "6. INHERITANCE TRIGGER",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    colorClass: "border-[#D4AF37]/50 group-hover:border-[#D4AF37]/80 text-gray-300",
    glowColor: "rgba(212,175,55,0.3)"
  },
  {
    number: 7,
    title: "TALK WITH AI",
    subtitle: "Rediscover Legacy Conversation",
    icon: MessageSquare,
    detailsTitle: "Authenticated Synthesis & Interactive Query",
    detailsDesc: "Your designated heirs securely query the capsule's validated knowledge graphs. Guided by Gemini LLMs, the interface enables meaningful interaction with your authentic letters, memory matrices, and voice prints.",
    badge: "7. COGNITIVE SYNTHESIS",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    colorClass: "border-emerald-500/30 group-hover:border-emerald-500/60 text-emerald-100",
    glowColor: "rgba(16,185,129,0.25)"
  }
];

export default function MemoryFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number>(1); // Default to Step 1 "Create account"

  const activeData = FLOW_STEPS[activeStep - 1];

  return (
    <div id="journey-of-memory" className="w-full pt-16 pb-8 bg-[#0E152D]/10 relative z-10 border-b border-[#D4AF37]/5 overflow-visible">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Title with minimalist styling */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-3">
            System Mechanics & Secure Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-gray-100 tracking-wider uppercase">
            The Journey of a Memory Capsule
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light mt-2 max-w-2xl leading-relaxed">
            The work flow of EternalMind to turn data into a secure legacy capsule for your chosen heir.
          </p>
        </div>

        {/* FLOW GRAPH CONTAINER */}
        <div className="relative w-full overflow-visible mb-10">
          
          {/* Connector Line (Desktop Horizontal Base) - hidden on mobile */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-[2px] bg-gradient-to-r from-blue-500/20 via-[#D4AF37]/30 to-emerald-500/20 z-0 pointer-events-none" />

          {/* Stepper Grid (Horizontal on lg/xl, Vertical/Wrapped grid on smaller screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-1.5 xl:gap-2.5 z-10 relative">
            {FLOW_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.number;
              
              return (
                <div 
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`cursor-pointer group relative flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center p-4 lg:p-3 rounded-xl border transition-all duration-300 select-none ${
                    isActive 
                      ? 'bg-[#111A3A]/80 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                      : 'bg-[#111A3A]/25 hover:bg-[#111A3A]/55 border-[#D4AF37]/10 hover:border-[#D4AF37]/30'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 20px ${step.glowColor}` : 'none'
                  }}
                >
                  {/* Step Circle Pin / Icon */}
                  <div className="relative flex-none flex items-center justify-center">
                    
                    {/* Ring Outer Shadow/Pulse animation for Active Steps */}
                    {isActive && (
                      <span className="absolute animate-ping inline-flex h-9 w-9 rounded-full bg-[#D4AF37]/20 opacity-75 z-0" />
                    )}

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs border z-10 transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-[#D4AF37] text-[#0E152D] border-[#D4AF37]' 
                        : 'bg-[#0E152D] text-[#D4AF37] border-[#D4AF37]/45 group-hover:border-[#D4AF37]'
                    }`}>
                      {step.number}
                    </div>

                    {/* Miniature Indicator inside circle */}
                    <div className={`absolute -right-1 -bottom-1 w-4 h-4 rounded-full border flex items-center justify-center p-0.5 z-20 shadow-md ${
                      isActive 
                        ? 'bg-[#0E152D] text-green-400 border-green-500/50' 
                        : 'bg-[#111A3A] text-gray-500 border-gray-700'
                    }`}>
                      <Icon className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Connecting Arrow for Mobile Layout (appears between list items) */}
                  <div className="flex-grow lg:flex-none pl-4 lg:pl-0 mt-0 lg:mt-4 text-left lg:text-center overflow-hidden">
                    <h3 className={`text-xs font-bold tracking-tight uppercase line-clamp-1 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'
                    }`}>
                      {step.title}
                    </h3>
                  </div>

                  {/* Horizontal joining arrow for large displays */}
                  {step.number < 7 && (
                    <div className="hidden lg:flex absolute top-12 -right-3 w-5 h-5 items-center justify-center z-10 text-gray-500 pointer-events-none">
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTIVE DETAIL DISPLAY PORT (Smooth transitions using Framer Motion) */}
        <div className="w-full relative min-h-[170px] lg:min-h-[140px] pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-[#111A3A]/30 border border-[#D4AF37]/15 p-6 sm:p-8 rounded-xl flex flex-col md:flex-row gap-6 items-start justify-between hover:border-[#D4AF37]/25 transition-all"
            >
              {/* Badge & Detailed Text */}
              <div className="flex-grow max-w-3xl">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-semibold tracking-wider uppercase border ${activeData.badgeColor}`}>
                    {activeData.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-gray-100 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="text-[#D4AF37] font-mono text-sm">[0{activeData.number}]</span>
                  {activeData.detailsTitle}
                </h4>

                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                  {activeData.detailsDesc}
                </p>
              </div>

              {/* Status Diagnostic Panel (Simplified & Layman Level) */}
              <div id="capsule-diagnostics" className="flex-none w-full md:w-56 bg-[#0E152D]/70 border border-[#D4AF37]/10 rounded-lg p-4 font-mono text-[10px] text-gray-400">
                <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-2 mb-2 leading-none">
                  <span className="text-[9px] text-[#D4AF37] font-bold">CAPSULE STATUS</span>
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-emerald-400 font-bold">ONLINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ENCRYPTION:</span>
                    <span className="text-gray-300">SECURED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HEIR ACCESS:</span>
                    <span className="text-[#D4AF37] font-bold">READY</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] text-gray-500 uppercase leading-none border-t border-[#D4AF37]/5 pt-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  All secure
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
