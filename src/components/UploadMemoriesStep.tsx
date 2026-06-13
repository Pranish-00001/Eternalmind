import React, { useRef, useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Trash2, 
  Sparkles, 
  FileCode,
  Image as ImageIcon,
  FileDigit,
  Music,
  Video as VideoIcon
} from 'lucide-react';
import { Attachment } from '../types';

interface UploadMemoriesStepProps {
  memoryText: string;
  setMemoryText: (val: string) => void;
  attachments: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
}

const SUPPORTED_LABELS = [
  { label: "Text file", ext: ".txt, .md" },
  { label: "PDF Document", ext: ".pdf" },
  { label: "Image Asset", ext: ".png, .jpg, .jpeg" },
  { label: "Audio Track", ext: ".mp3, .wav, .m4a" },
  { label: "Video Reel", ext: ".mp4, .mov" }
];

export default function UploadMemoriesStep({
  memoryText,
  setMemoryText,
  attachments,
  setAttachments,
}: UploadMemoriesStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helper to resolve suitable icons for various file types
  const getFileIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('image')) return ImageIcon;
    if (t.includes('audio') || t.includes('mp3')) return Music;
    if (t.includes('video') || t.includes('mp4')) return VideoIcon;
    if (t.includes('pdf')) return FileDigit;
    return FileCode;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: Attachment[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        newFiles.push({
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size
        });
      }
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles: Attachment[] = [];
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        newFiles.push({
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: file.size
        });
      }
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addSimulatedSample = (filename: string, simulatedType: string, bytes: number) => {
    setAttachments(prev => [...prev, {
      name: filename,
      type: simulatedType,
      size: bytes
    }]);
  };

  return (
    <div className="space-y-6" id="upload-memories-step-wrapper">
      
      {/* Step Context banner */}
      <div className="p-4 bg-[#111A3A]/45 border border-[#D4AF37]/15 rounded-xl">
        <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Step 2: Upload Files & Memory Scripts
        </h4>
        <p className="text-xs text-gray-400 font-light leading-relaxed">
          Type down precious experiences using standard digital texts or attach archives. Attached documents are sealed inside IPFS blocks with cryptographic wrappers on sealing confirmation.
        </p>
      </div>

      {/* Memory Text input */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
          Option A: Core Memory Narrative Text
        </label>
        <textarea
          rows={5}
          placeholder="Type down accounts, diary logs, advice, or wisdom vectors for your chosen heir..."
          value={memoryText}
          onChange={(e) => setMemoryText(e.target.value)}
          className="block w-full px-4 py-3 bg-[#0A0F24]/80 border border-[#D4AF37]/15 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/60 font-light leading-relaxed resize-none"
          id="textarea-memory-text"
        />
      </div>

      {/* Attachments Section */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
          Option B: Upload Memory Files (Text, PDF, Image, Audio, Video)
        </label>

        {/* Drag & Drop Visual Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
            isDragging 
              ? 'border-[#D4AF37] bg-[#111A3A]/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
              : 'border-[#D4AF37]/15 bg-[#0A0F24]/50 hover:border-[#D4AF37]/35'
          }`}
          id="dropzone-area"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            id="file-element-input"
          />
          
          <UploadCloud className="w-10 h-10 text-gray-400 mb-3 group-hover:scale-105 transition-transform" />
          
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-1">
            Drag & Drop Files Here or Click to Browse
          </span>
          
          <span className="text-[10px] text-gray-500 font-mono mt-2">
            MAX SIZE: 100MB per file
          </span>

          {/* Supported tags display */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mt-5 max-w-lg">
            {SUPPORTED_LABELS.map((item, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-[#111A3A]/44 border border-[#D4AF37]/10 text-gray-400 rounded text-[9px] font-mono whitespace-nowrap">
                {item.label} ({item.ext})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Simulated Sample Attachments Generator (To facilitate testing easily on the web) */}
      <div className="space-y-2 pt-2 border-t border-[#D4AF37]/10">
        <span className="block text-[10px] font-mono tracking-widest text-gray-400 uppercase">
          Quick Demo Presets (Click to Auto-Attach):
        </span>
        <div className="flex flex-wrap gap-2">
          <button 
            type="button"
            onClick={() => addSimulatedSample("Will_And_Testament.pdf", "application/pdf", 1420500)}
            className="px-2.5 py-1 text-[10px] font-mono bg-[#111A3A]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 rounded text-gray-300 hover:text-white transition-colors cursor-pointer"
            id="preset-attach-pdf"
          >
            + Will_And_Testament.pdf (1.4 MB)
          </button>
          <button 
            type="button"
            onClick={() => addSimulatedSample("Family_Archives_1998.jpg", "image/jpeg", 2390800)}
            className="px-2.5 py-1 text-[10px] font-mono bg-[#111A3A]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 rounded text-gray-300 hover:text-white transition-colors cursor-pointer"
            id="preset-attach-jpg"
          >
            + Family_Archives_1998.jpg (2.3 MB)
          </button>
          <button 
            type="button"
            onClick={() => addSimulatedSample("Grandpa_Voice_Note.mp3", "audio/mpeg", 7512400)}
            className="px-2.5 py-1 text-[10px] font-mono bg-[#111A3A]/50 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 rounded text-gray-300 hover:text-white transition-colors cursor-pointer"
            id="preset-attach-mp3"
          >
            + Grandpa_Voice_Note.mp3 (7.5 MB)
          </button>
        </div>
      </div>

      {/* Attached Files List Preview (Dynamic state) */}
      {attachments.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#D4AF37]/15" id="attachments-preview-list">
          <span className="block text-xs font-mono font-medium tracking-widest text-[#D4AF37] uppercase">
            Queued Files Preview Block ({attachments.length})
          </span>

          <div className="space-y-2 bg-[#0A0F24]/40 border border-[#D4AF37]/10 p-3 rounded-xl max-h-56 overflow-y-auto">
            {attachments.map((file, index) => {
              const FileAvatar = getFileIcon(file.type);
              return (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2.5 rounded bg-[#111A3A]/40 border border-gray-800 hover:border-[#D4AF37]/20 transition-colors"
                >
                  <div className="flex items-center gap-3 truncate max-w-[80%]">
                    <div className="p-1.5 rounded bg-[#0E152D] text-[#D4AF37] flex-shrink-0">
                      <FileAvatar className="w-4 h-4" />
                    </div>
                    <div className="truncate flex flex-col text-left">
                      <span className="text-xs font-medium text-gray-200 truncate font-mono" title={file.name}>
                        {file.name}
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono tracking-wider uppercase mt-0.5">
                        {file.type ? file.type.split('/')[1] || file.type : 'binary'} • {formatSize(file.size)}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/5 rounded transition-colors cursor-pointer"
                    title="Remove attachment"
                    id={`btn-remove-attachment-${index}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
