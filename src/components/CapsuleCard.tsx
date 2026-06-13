import React from 'react';
import { 
  FileLock2, 
  Calendar, 
  UserCheck2, 
  Hash, 
  User, 
  FileText, 
  ShieldAlert, 
  CheckCircle,
  Copy
} from 'lucide-react';
import { Capsule } from '../types';

interface CapsuleCardProps {
  capsule: Capsule;
  onSelect?: () => void;
}

export default function CapsuleCard({ capsule, onSelect }: CapsuleCardProps) {
  const isSealed = capsule.status === "sealed";

  const handleCopyTx = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (capsule.txHash) {
      navigator.clipboard.writeText(capsule.txHash);
      alert("Transaction Hash copied to clipboard!");
    }
  };

  const getStatusColor = (status: "draft" | "sealed") => {
    if (status === "sealed") {
      return {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        bullet: "bg-emerald-500"
      };
    }
    return {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      bullet: "bg-amber-500"
    };
  };

  const statusStyle = getStatusColor(capsule.status);

  return (
    <div 
      onClick={onSelect}
      className="bg-[#111A3A]/40 border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 p-6 rounded-xl flex flex-col justify-between tracking-wide transition-all duration-300 h-full group hover:shadow-[0_0_25px_rgba(212,175,55,0.06)] cursor-pointer"
      id={`capsule-card-${capsule.id}`}
    >
      <div>
        {/* Status indicator row */}
        <div className="flex items-center justify-between mb-4">
          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.bullet} ${isSealed ? 'animate-pulse' : ''}`} />
            {capsule.status}
          </span>
          
          <span className="text-[10px] text-gray-500 font-mono">
            {new Date(capsule.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-100 group-hover:text-[#D4AF37] transition-colors uppercase tracking-wider mb-2">
          {capsule.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed mb-6">
          {capsule.description || "No supplemental descriptions registered."}
        </p>

        {/* Core Metadata Stack */}
        <div className="space-y-2.5 border-t border-[#D4AF37]/10 pt-4 mb-6 font-mono text-[11px] text-gray-400">
          
          {/* Owner details */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              OWNER:
            </span>
            <span className="text-gray-300 text-right truncate max-w-[150px]" title={capsule.ownerName}>
              {capsule.ownerName}
            </span>
          </div>

          {/* Wallet Address */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <FileLock2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              WALLET:
            </span>
            <span className="text-gray-300 font-mono text-[10px]" title={capsule.ownerWalletAddress}>
              {capsule.ownerWalletAddress ? `${capsule.ownerWalletAddress.substring(0, 6)}...${capsule.ownerWalletAddress.substring(capsule.ownerWalletAddress.length - 4)}` : "None"}
            </span>
          </div>

          {/* Heir Email */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <UserCheck2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              HEIR:
            </span>
            <span className="text-gray-300 truncate max-w-[150px]" title={capsule.heirEmail}>
              {capsule.heirEmail}
            </span>
          </div>

          {/* Unlock Condition */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              UNLOCKS:
            </span>
            <span className="text-[#D4AF37] font-semibold">
              {new Date(capsule.unlockDate).toLocaleDateString()}
            </span>
          </div>

          {/* Attachments / Text count */}
          <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-gray-500">
            <span>MEMORIES:</span>
            <span className="text-gray-300 flex items-center gap-2">
              {capsule.memoryText ? (
                <span className="flex items-center gap-0.5">
                  <FileText className="w-3 h-3 text-sky-400" /> TEXT
                </span>
              ) : null}
              <span>{capsule.attachments.length} FILE(S)</span>
            </span>
          </div>

        </div>
      </div>

      {/* Transaction Hash section (If Sealed) */}
      {isSealed && capsule.txHash && (
        <div className="mt-2 pt-3 border-t border-dashed border-[#D4AF37]/10 flex items-center justify-between bg-[#0E152D]/40 p-2 rounded">
          <div className="flex items-center gap-1 text-[9px] font-mono text-gray-500 truncate max-w-[80%]">
            <Hash className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="uppercase text-[8px] mr-1">TXHASH:</span>
            <span className="text-gray-400 truncate">{capsule.txHash}</span>
          </div>
          <button 
            onClick={handleCopyTx}
            className="text-[9px] text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
            title="Copy Tx Hash"
            id={`btn-copy-tx-${capsule.id}`}
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Auxiliary design footer */}
      {!isSealed && (
        <div className="mt-2 text-center text-[9px] text-amber-500/70 font-mono flex items-center justify-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-500" />
          <span>VAULT ENCODER SUSPENDED — DRAFT ONLY</span>
        </div>
      )}
    </div>
  );
}
