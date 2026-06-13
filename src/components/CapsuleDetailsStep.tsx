import React from 'react';
import { User, Wallet, FileText, AlertCircle, Sparkles } from 'lucide-react';
import WalletConnectButton from './WalletConnectButton';

interface CapsuleDetailsStepProps {
  ownerName: string;
  setOwnerName: (val: string) => void;
  walletAddress: string;
  setWalletAddress: (val: string) => void;
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  error?: string;
}

export default function CapsuleDetailsStep({
  ownerName,
  setOwnerName,
  walletAddress,
  setWalletAddress,
  title,
  setTitle,
  description,
  setDescription,
  error
}: CapsuleDetailsStepProps) {

  return (
    <div className="space-y-6" id="capsule-details-step-wrapper">
      
      {/* Intro Context banner */}
      <div className="p-4 bg-[#111A3A]/40 border border-[#D4AF37]/15 rounded-xl">
        <h4 className="text-body-sm-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Step 1: Capsule Metadata Specifications
        </h4>
        <p className="text-body-sm text-gray-400 font-light leading-relaxed">
          Provide identification parameters to register this container on the decentralized database. Connecting MetaMask registers you as the legal owner structure of this capsule.
        </p>
      </div>

      {/* Owner Name field */}
      <div className="space-y-2">
        <label className="block text-body-sm-bold font-mono tracking-widest text-[#D4AF37] uppercase">
          Owner Full Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            required
            placeholder="Maya Lin"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-body-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60"
            id="input-owner-name"
          />
        </div>
      </div>

      {/* Owner Wallet Address - Read-Only with Connect Option */}
      <div className="space-y-2">
        <label className="block text-body-sm-bold font-mono tracking-widest text-[#D4AF37] uppercase">
          Owner Public Wallet Address *
        </label>
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Wallet className="w-4 h-4" />
            </div>
            <input
              type="text"
              readOnly
              required
              placeholder="0x0000...0000 (Connect wallet)"
              value={walletAddress}
              className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/50 border border-[#D4AF37]/10 rounded-lg text-body-sm font-mono text-gray-400 focus:outline-none cursor-not-allowed select-all"
              id="input-owner-wallet"
            />
          </div>
          
          <div className="flex-shrink-0 flex items-center">
            <WalletConnectButton 
              onAddressFetched={(address) => setWalletAddress(address)}
              className="py-3 h-full px-5 text-button-md font-mono"
            />
          </div>
        </div>
        <p className="text-caption text-gray-400 font-mono">
          We strictly secure your digital essence on-chain. Manually typing is prohibited to prevent address typos.
        </p>
      </div>

      {/* Capsule Title */}
      <div className="space-y-2">
        <label className="block text-body-sm-bold font-mono tracking-widest text-[#D4AF37] uppercase">
          Capsule Title *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <FileText className="w-4 h-4" />
          </div>
          <input
            type="text"
            required
            placeholder="Letters to my Daughter"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-body-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60"
            id="input-capsule-title"
          />
        </div>
      </div>

      {/* Capsule Description */}
      <div className="space-y-2">
        <label className="block text-body-sm-bold font-mono tracking-widest text-[#D4AF37] uppercase">
          Capsule Description *
        </label>
        <textarea
          rows={3}
          required
          placeholder="A collections of voice prints, handwritten journals, and images containing teachings for life, only to reveal upon academic coming of age."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-body-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60 resize-none font-light"
          id="input-capsule-description"
        />
      </div>

      {/* Inline Warning/Error if any */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-caption leading-relaxed font-mono">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

    </div>
  );
}
