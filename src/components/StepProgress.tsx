import React from 'react';
import { FileText, UploadCloud, Users, Calendar, ShieldCheck, Check } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "Details", icon: FileText },
  { id: 2, label: "Memories", icon: UploadCloud },
  { id: 3, label: "Heirs", icon: Users },
  { id: 4, label: "Unlock Date", icon: Calendar },
  { id: 5, label: "Seal & Secure", icon: ShieldCheck },
];

export default function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <div className="w-full mb-12" id="step-progress-wrapper">
      {/* Step Circle Timeline */}
      <div className="flex items-center justify-between relative max-w-4xl mx-auto px-4">
        
        {/* Background line behind steps */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-800 -translate-y-1/2 z-0" />
        
        {/* Fill active line */}
        <div 
          className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#b89020] -translate-y-1/2 transition-all duration-500 z-0" 
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isCompleted = idx + 1 < currentStep;
          const isActive = idx + 1 === currentStep;

          let circleClass = "bg-[#0E152D] border-gray-800 text-gray-500";
          let textClass = "text-gray-500";

          if (isActive) {
            circleClass = "bg-[#111A3A] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-2 ring-[#D4AF37]/20";
            textClass = "text-[#D4AF37] font-semibold";
          } else if (isCompleted) {
            circleClass = "bg-gradient-to-r from-[#e7cd70] to-[#b89020] border-transparent text-black";
            textClass = "text-gray-300";
          }

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 select-none">
              
              {/* Circle Bubble icon */}
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${circleClass}`}>
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>

              {/* Step label on Desktop */}
              <span className={`hidden sm:inline text-caption font-mono tracking-widest uppercase mt-2.5 transition-colors duration-300 ${textClass}`}>
                {step.label}
              </span>

              {/* Step number strictly for small mobile preview space */}
              <span className="sm:hidden text-caption font-mono mt-1 text-gray-400">
                S{step.id}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
}
