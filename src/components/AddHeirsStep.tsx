import React from 'react';
import { Mail, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface AddHeirsStepProps {
  heirEmail: string;
  setHeirEmail: (val: string) => void;
  error?: string;
}

export default function AddHeirsStep({
  heirEmail,
  setHeirEmail,
  error
}: AddHeirsStepProps) {
  return (
    <div className="space-y-6" id="add-heirs-step-wrapper">
      
      {/* Intro Context banner */}
      <div className="p-4 bg-[#111A3A]/40 border border-[#D4AF37]/15 rounded-xl">
        <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Step 3: Define Legacy Heirs & Accessors
        </h4>
        <p className="text-xs text-gray-400 font-light leading-relaxed">
          Specify target entities cleared to assume custody of this capsule folder. Once unlock condition parameters are resolved on-chain, our lineage protocols trigger secure invitations to decrypt of-record nodes.
        </p>
      </div>

      {/* Heir Email Input */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
          Heir Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            required
            placeholder="heir@legacy.com"
            value={heirEmail}
            onChange={(e) => setHeirEmail(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60"
            id="input-heir-email"
          />
        </div>
        
        {/* Mandated helper text */}
        <p className="text-xs text-gray-400 mt-2 italic font-light">
          Your heir will receive an invitation to access this capsule when the unlock condition is met.
        </p>
      </div>

      {/* Trust & Ethics Disclaimer box */}
      <div className="bg-[#0A0F24]/40 p-5 rounded-xl border border-gray-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Active Lineage Guarantee</span>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed font-light">
          The specified heir identity is mapped natively alongside the capsule hash. To claim access, the system sends an authenticated link that decodes on-chain only after proof of unlock state matches. They do not require an active Web3 wallet to read basic archives.
        </p>
      </div>

      {/* Error display */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-xs leading-relaxed font-mono">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 animate-bounce" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}
