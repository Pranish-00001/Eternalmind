import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Loader2, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  Fingerprint,
  Cpu,
  Bookmark
} from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void; // Saved as draft
  onSealSuccess: (txHash: string) => void; // Successfully sealed
}

type StepState = "idle" | "awaiting_approval" | "submitted" | "confirming" | "success";

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onSealSuccess 
}: ConfirmationModalProps) {
  const [txState, setTxState] = useState<StepState>("idle");
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [mockTxHash, setMockTxHash] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTxState("idle");
      setProgressLog([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Simulate Seal Transaction method
  const simulateSealTransaction = async () => {
    setTxState("awaiting_approval");
    setProgressLog(["Initiating sandbox network validation...", "Awaiting MetaMask user signature authorization..."]);

    // Phase 1: Sign approval (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTxState("submitted");
    const generatedHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setMockTxHash(generatedHash);
    setProgressLog(prev => [
      ...prev, 
      "MetaMask signature validated on-chain", 
      "Transaction payload compiled successfully",
      `Transaction submitted: ${generatedHash.substring(0, 16)}...`
    ]);

    // Phase 2: Mine Block confirmation (2.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));
    setTxState("confirming");
    setProgressLog(prev => [
      ...prev,
      "Awaiting consensus anchor nodes (1/3 block confirmation completed)",
      "Syncing IPFS decentralized cluster keys...",
      "Consensus finalized (3/3 block confirmations completed)"
    ]);

    // Phase 3: Sealed Successfully (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1800));
    setTxState("success");
    setProgressLog(prev => [...prev, "Capsule cryptographically locked with SHA-256 coefficients!"]);

    // Phase 4: Trigger success redirection
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSealSuccess(generatedHash);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6 overflow-y-auto">
      
      {/* Container Dialog */}
      <div 
        className="bg-[#0E152D] border border-[#D4AF37]/30 max-w-lg w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col"
        id="confirmation-modal-container"
      >
        
        {/* Header Ribbon */}
        <div className="p-5 border-b border-[#D4AF37]/10 flex items-center justify-between">
          <h3 className="text-sm font-mono tracking-widest font-bold text-[#D4AF37] uppercase flex items-center gap-2">
            <Fingerprint className="w-4 h-4 animate-pulse" />
            CONFIRM CAPSULE SEALING
          </h3>
          
          {/* Cancel button - only visible if not in progress */}
          {txState === "idle" && (
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-white transition-colors cursor-pointer"
              id="confirm-modal-close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 flex-grow">
          
          {txState === "idle" ? (
            /* Warning Setup Step */
            <div className="space-y-6 text-left" id="modal-idle-content">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-xs font-light leading-relaxed font-sans">
                  You are about to seal this memory capsule. Your memories will be prepared for secure storage, and your wallet will be asked to sign a blockchain transaction.
                </p>
              </div>

              <div className="text-xs text-gray-400 font-light space-y-2 Leading-relaxed">
                <p>
                  <strong>Draft Saving Clause:</strong> Clicking cancel or exit preserves this capsule locally as a draft. You'll be returned to your dashboard safely.
                </p>
                <p>
                  <strong>Permanent Lock:</strong> Cryptographic sealing means information parameters cannot be edited or erased once finalized on the distributed ledger.
                </p>
              </div>

              {/* Actions row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  id="modal-btn-draft"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>X / Save Draft</span>
                </button>
                <button
                  type="button"
                  onClick={simulateSealTransaction}
                  className="flex-1 py-3 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  id="modal-btn-seal"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SEAL CAPSULE</span>
                </button>
              </div>
            </div>
          ) : (
            /* Running Transaction Simulation Console (Premium visual) */
            <div className="space-y-6 text-center" id="modal-active-simulation">
              
              <div className="flex flex-col items-center justify-center py-6">
                {txState === "success" ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <ShieldCheck className="w-12 h-12 stroke-[1.5]" />
                  </div>
                ) : (
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin stroke-[1.5] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]" />
                    <Cpu className="w-6 h-6 text-sky-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                )}

                <h4 className="text-sm font-mono font-bold tracking-widest text-[#D4AF37] uppercase mt-6">
                  {txState === "awaiting_approval" && "Awaiting Wallet Approval..."}
                  {txState === "submitted" && "Transaction Submitted..."}
                  {txState === "confirming" && "Waiting for Network confirmation..."}
                  {txState === "success" && "Capsule Sealed Successfully!"}
                </h4>
                
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                  Blockchain State Engine Processing
                </p>
              </div>

              {/* Interactive terminal output logs */}
              <div className="bg-[#0A0F24]/90 p-4 rounded-xl border border-gray-800 text-left font-mono text-[10px] text-gray-400 h-40 overflow-y-auto space-y-1.5 select-text">
                <div className="text-sky-400 border-b border-gray-800 pb-1 mb-2">SYSTEM@ETERNALMIND_VAULT_ENGINE // STATUS ACTIVE</div>
                {progressLog.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start leading-relaxed">
                    <span className="text-gray-600 flex-shrink-0">&gt;&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                {txState !== "success" && (
                  <div className="flex items-center gap-1.5 text-[#D4AF37]/50 animate-pulse mt-1">
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full" />
                    <span>Executing pipeline segment...</span>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
