import React from 'react';
import { Calendar, AlertCircle, Sparkles, Clock } from 'lucide-react';

interface UnlockDateStepProps {
  unlockDate: string;
  setUnlockDate: (val: string) => void;
  error?: string;
}

export default function UnlockDateStep({
  unlockDate,
  setUnlockDate,
  error
}: UnlockDateStepProps) {
  
  // Calculate tomorrow's date string dynamically as YYYY-MM-DD
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6" id="unlock-date-step-wrapper">
      
      {/* Step Context banner */}
      <div className="p-4 bg-[#111A3A]/40 border border-[#D4AF37]/15 rounded-xl">
        <h4 className="text-body-sm-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Step 4: Unlock Parameters & Timelocks
        </h4>
        <p className="text-body-sm text-gray-400 font-light leading-relaxed">
          Setup time gate triggers. Memories are secure on-chain but locked from decryption until the system epoch advances past this precise date limit.
        </p>
      </div>

      {/* Date input */}
      <div className="space-y-2">
        <label className="block text-body-sm-bold font-mono tracking-widest text-[#D4AF37] uppercase">
          Decryption Release Date *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Calendar className="w-4 h-4" />
          </div>
          <input
            type="date"
            required
            min={minDateStr} // Native browser validation: prevents past dates and today
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-body-sm text-gray-200 focus:outline-[#D4AF37]/40 font-mono tracking-wider"
            id="input-unlock-date"
          />
        </div>
        
        {/* Mandated helper text */}
        <p className="text-body-sm text-gray-400 mt-2 italic font-light">
          Choose the earliest date this capsule can become available to your heir.
        </p>
      </div>

      {/* Security Assurance Info box */}
      <div className="p-5 bg-[#0A0F24]/40 rounded-xl border border-gray-800 flex items-start gap-3">
        <Clock className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
        <div className="text-left space-y-1">
          <span className="block text-body-sm-bold font-mono text-gray-300 uppercase tracking-wider">Time-Locked Consensus Cryptography</span>
          <p className="text-caption text-gray-500 leading-relaxed font-light">
            Once submitted, our smart contracts reject any requests to retrieve decryption coefficients until the target Unix timestamp is satisfied. This restriction is mathematically sound and cannot be overridden by administrators or executors.
          </p>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-caption leading-relaxed font-mono">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 animate-bounce" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}
