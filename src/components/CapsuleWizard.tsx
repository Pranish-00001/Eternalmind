import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowLeft, ShieldAlert } from 'lucide-react';
import { Capsule, Attachment, User } from '../types';
import StepProgress from './StepProgress';
import CapsuleDetailsStep from './CapsuleDetailsStep';
import UploadMemoriesStep from './UploadMemoriesStep';
import AddHeirsStep from './AddHeirsStep';
import UnlockDateStep from './UnlockDateStep';
import SealSecureStep from './SealSecureStep';
import ConfirmationModal from './ConfirmationModal';

interface CapsuleWizardProps {
  user: User;
  onCloseWizard: () => void;
  onSaveCapsule: (capsule: Capsule) => void;
}

export default function CapsuleWizard({ 
  user, 
  onCloseWizard, 
  onSaveCapsule 
}: CapsuleWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  // Step 1: Specifications
  const [ownerName, setOwnerName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Step 2: Content
  const [memoryText, setMemoryText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  // Step 3: Inherit Lineage
  const [heirEmail, setHeirEmail] = useState("");

  // Step 4: Timelock Gating
  const [unlockDate, setUnlockDate] = useState("");

  // Modal Control
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Auto-connect wallet if previously connected in localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('eternalmind_wallet');
    if (savedWallet) {
      setWalletAddress(savedWallet);
    }
  }, []);

  // Pre-populate user named Maya or generic owner values for testing
  useEffect(() => {
    if (user && user.email) {
      const rawUserName = user.email.split('@')[0];
      const prettyName = rawUserName.charAt(0).toUpperCase() + rawUserName.slice(1);
      setOwnerName(prettyName === "Maya" ? "Maya Lin" : prettyName);
    }
  }, [user]);

  // Step validation rule engine
  const validateCurrentStep = (): boolean => {
    setError("");

    if (currentStep === 1) {
      if (!ownerName.trim()) {
        setError("Owner Full Name is required.");
        return false;
      }
      if (!walletAddress.trim()) {
        setError("MetaMask wallet connection is strictly required to verify ownership.");
        return false;
      }
      if (!title.trim()) {
        setError("Capsule Title is required.");
        return false;
      }
      if (!description.trim()) {
        setError("Capsule Description is required.");
        return false;
      }
    }

    if (currentStep === 2) {
      // Allow blank memories, but suggest adding at least one
      if (!memoryText.trim() && attachments.length === 0) {
        setError("Please either enter a core memory text or upload at least one memory file to proceed.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (!heirEmail.trim()) {
        setError("Heir email is required.");
        return false;
      }
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(heirEmail)) {
        setError("Please enter a valid heir email address.");
        return false;
      }
    }

    if (currentStep === 4) {
      if (!unlockDate) {
        setError("Please specify the timelock release date.");
        return false;
      }
      
      const selected = new Date(unlockDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today

      if (selected <= today) {
        setError("Decryption Release Date must be from tomorrow onward.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  // Safe Cancel -> Saves as Draft
  const handleSaveAsDraft = () => {
    const draftCapsule: Capsule = {
      id: "cap_" + Math.random().toString(36).substring(2, 11),
      ownerName,
      ownerWalletAddress: walletAddress,
      title: title || "Untitled Memory Pod (Draft)",
      description,
      memoryText,
      attachments,
      heirEmail,
      unlockDate,
      status: "draft",
      createdAt: new Date().toISOString()
    };
    onSaveCapsule(draftCapsule);
  };

  // Seal successfully (blockchain transaction resolved on modal confirmation)
  const handleSealConfirmed = (txHash: string) => {
    const sealedCapsule: Capsule = {
      id: "cap_" + Math.random().toString(36).substring(2, 11),
      ownerName,
      ownerWalletAddress: walletAddress,
      title,
      description,
      memoryText,
      attachments,
      heirEmail,
      unlockDate,
      status: "sealed",
      txHash: txHash,
      createdAt: new Date().toISOString()
    };
    onSaveCapsule(sealedCapsule);
  };

  return (
    <div className="w-full min-h-[calc(100vh-76px)] bg-[#0E152D] text-gray-200 py-12 px-6 md:px-12 relative overflow-visible">
      {/* Absolute clean backdrop radial shine */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Navigation back helper */}
        <div className="flex justify-between items-center mb-8 border-b border-[#D4AF37]/10 pb-6">
          <button
            onClick={onCloseWizard}
            className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#D4AF37] transition-colors tracking-widest uppercase cursor-pointer group"
            id="wizard-btn-close-and-exit"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Cancel and Exit Wizard</span>
          </button>
          
          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]/80 uppercase">
            ETERNALMIND SECURE WIZARD // STEP {currentStep}/5
          </span>
        </div>

        {/* Horizontal StepProgress Indicator */}
        <StepProgress currentStep={currentStep} />

        {/* Step Content Wrapper Box */}
        <div className="bg-[#111A3A]/50 border border-[#D4AF37]/15 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl mb-8 min-h-[350px] relative">
          
          {currentStep === 1 && (
            <CapsuleDetailsStep
              ownerName={ownerName}
              setOwnerName={setOwnerName}
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              error={error}
            />
          )}

          {currentStep === 2 && (
            <UploadMemoriesStep
              memoryText={memoryText}
              setMemoryText={setMemoryText}
              attachments={attachments}
              setAttachments={setAttachments}
            />
          )}

          {currentStep === 3 && (
            <AddHeirsStep
              heirEmail={heirEmail}
              setHeirEmail={setHeirEmail}
              error={error}
            />
          )}

          {currentStep === 4 && (
            <UnlockDateStep
              unlockDate={unlockDate}
              setUnlockDate={setUnlockDate}
              error={error}
            />
          )}

          {currentStep === 5 && (
            <SealSecureStep
              ownerName={ownerName}
              walletAddress={walletAddress}
              title={title}
              description={description}
              memoryText={memoryText}
              attachments={attachments}
              heirEmail={heirEmail}
              unlockDate={unlockDate}
            />
          )}

          {/* Validation Alert for standalone error indicators (Step 2 doesn't have local inline label) */}
          {error && currentStep === 2 && (
            <div className="flex items-start gap-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-xs leading-relaxed font-mono mt-6">
              <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

        </div>

        {/* Wizard Controls Action row */}
        <div className="flex items-center justify-between gap-4">
          
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-1 px-5 py-3 border border-gray-800 rounded-lg text-xs font-mono uppercase tracking-widest transition-all ${
              currentStep === 1 
                ? 'opacity-30 cursor-not-allowed text-gray-600' 
                : 'text-gray-300 hover:text-white hover:bg-[#111A3A]/40'
            }`}
            id="wizard-btn-back"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-8 py-3 bg-[#111A3A] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/40 hover:border-[#D4AF37]/80 text-[#D4AF37] hover:text-white font-mono text-xs uppercase tracking-widest rounded-lg shadow-md transition-all cursor-pointer"
              id="wizard-btn-next"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#e7cd70] to-[#b89020] text-black font-semibold uppercase tracking-widest text-xs rounded-lg hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
              id="wizard-btn-seal-capsule"
            >
              <span>Seal Memory Capsule</span>
            </button>
          )}

        </div>

        {/* Confirmation Modal overlay containing multi-stage wallet transaction state transitions */}
        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={handleSaveAsDraft} // User cancelled -> Saved as draft
          onSealSuccess={handleSealConfirmed} // User sealed successfully
        />

      </div>
    </div>
  );
}
