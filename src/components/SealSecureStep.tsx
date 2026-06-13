import React from 'react';
import { 
  FileCheck2, 
  User, 
  Wallet, 
  FileText, 
  Mail, 
  Calendar, 
  Paperclip, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Attachment } from '../types';

interface SealSecureStepProps {
  ownerName: string;
  walletAddress: string;
  title: string;
  description: string;
  memoryText: string;
  attachments: Attachment[];
  heirEmail: string;
  unlockDate: string;
}

export default function SealSecureStep({
  ownerName,
  walletAddress,
  title,
  description,
  memoryText,
  attachments,
  heirEmail,
  unlockDate
}: SealSecureStepProps) {

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalBytes = attachments.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="space-y-6" id="seal-secure-step-wrapper">
      
      {/* Intro Context banner */}
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0 animate-pulse" />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
            Step 5: Final Integrity Verification
          </h4>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            Verify details below. Upon sealing, memory packages are encrypted end-to-end. Decrypting is locked until the specified release threshold is satisfied.
          </p>
        </div>
      </div>

      {/* Structured Confirmation Card (Layman & High Tech Blend) */}
      <div className="bg-[#111A3A]/60 border border-[#D4AF37]/25 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)]">
        
        {/* Header Ribbon */}
        <div className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/15 py-3.5 px-6 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4" />
            Capsule Integrity Summary
          </span>
          <span className="text-[9px] font-mono text-gray-400 uppercase">
            PROTOCOL: EM_v2.4
          </span>
        </div>

        {/* Info Grid split items */}
        <div className="p-6 md:p-8 space-y-6 font-mono text-xs">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Hand: Identities */}
            <div className="space-y-4 text-left">
              
              {/* Owner */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">REGISTERED OWNER</span>
                <div className="flex items-center gap-2 text-gray-200">
                  <User className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-sans font-bold text-sm tracking-wide">{ownerName || "Unnamed"}</span>
                </div>
              </div>

              {/* Wallet */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">OWNER WALLET SIGNER</span>
                <div className="flex items-center gap-2 text-gray-300 font-mono text-[11px]">
                  <Wallet className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="truncate" title={walletAddress}>
                    {walletAddress ? `${walletAddress.substring(0, 10)}...${walletAddress.substring(walletAddress.length - 8)}` : "No Wallet Connected"}
                  </span>
                </div>
              </div>

              {/* Heir Address */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">DESIGNATED NEXT-OF-KIN HEIR</span>
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-sans text-sm tracking-wide font-medium truncate" title={heirEmail}>{heirEmail || "None Specified"}</span>
                </div>
              </div>

            </div>

            {/* Right Hand: Capsule Contents */}
            <div className="space-y-4 text-left">
              
              {/* Title */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">TARGET CONTAINER TITLE</span>
                <div className="flex items-center gap-2 text-gray-200 font-mono font-bold uppercase tracking-wider text-sm truncate" title={title}>
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>{title || "Untitled Capsule"}</span>
                </div>
              </div>

              {/* Unlock Date */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">TIMELOCK DECRYPTION RELEASE</span>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold">{unlockDate ? new Date(unlockDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "None Specified"}</span>
                </div>
              </div>

              {/* Memory Text & Attachments Metadata check */}
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">PAYLOAD COMPONENT BLOCKS</span>
                <div className="flex flex-col gap-1.5 text-xs text-gray-300 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <FileText className={`w-3.5 h-3.5 ${memoryText ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span>Memory text block: {memoryText ? 'YES' : 'NO'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Paperclip className={`w-3.5 h-3.5 ${attachments.length > 0 ? 'text-emerald-400' : 'text-gray-600'}`} />
                    <span>Attached files: {attachments.length} files ({formatSize(totalBytes)})</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Area: Narrative Description summary */}
          <div className="border-t border-[#D4AF37]/10 pt-4 text-left">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Supplement Narrative / Intent Summary</span>
            <p className="text-gray-300 font-sans font-light leading-relaxed whitespace-pre-line text-xs bg-[#0E152D]/60 p-4 rounded-xl border border-gray-800">
              {description || "No supplemental descriptions entered."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
