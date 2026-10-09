import React, { useState } from 'react';
import { 
  Camera, 
  Mic, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  X,
  Volume2
} from 'lucide-react';

interface QuickJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (meetingId: string) => void;
}

export const QuickJoinModal: React.FC<QuickJoinModalProps> = ({
  isOpen,
  onClose,
  onJoin
}) => {
  const [meetingId, setMeetingId] = useState('demo-q2-review-2026');
  const [cameraActive, setCameraActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingId.trim()) return;
    onJoin(meetingId.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-[#1c100a] border border-[#f97316]/50 p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#a78b7d] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[#f97316] uppercase">
            INSTANT ZERO-DOWNLOAD MEETING
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Join a Clean-Room Session
        </h3>
        <p className="text-xs text-[#e0c0b1] mb-6 leading-relaxed">
          Connect directly in 1080p60 through browser WebRTC without plugins or software installation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#a78b7d] font-semibold mb-1">
              Meeting ID, Code or Link
            </label>
            <input
              type="text"
              required
              value={meetingId}
              onChange={e => setMeetingId(e.target.value)}
              placeholder="e.g. demo-q2-review-2026"
              className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#f97316] font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCameraActive(!cameraActive)}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                cameraActive 
                  ? 'bg-[#291d17] border-emerald-500/40 text-[#fed7aa]' 
                  : 'bg-[#1b100a] border-red-500/40 text-[#a78b7d]'
              }`}
            >
              <Camera className={`w-4 h-4 ${cameraActive ? 'text-emerald-400' : 'text-red-400'}`} />
              <span>Camera: {cameraActive ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAudioActive(!audioActive)}
              className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                audioActive 
                  ? 'bg-[#291d17] border-emerald-500/40 text-[#fed7aa]' 
                  : 'bg-[#1b100a] border-red-500/40 text-[#a78b7d]'
              }`}
            >
              <Mic className={`w-4 h-4 ${audioActive ? 'text-emerald-400' : 'text-red-400'}`} />
              <span>Mic: {audioActive ? 'Active' : 'Muted'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#251913] border border-[#342721] flex items-center justify-between text-[11px] text-[#fed7aa]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#f97316]" />
              End-to-End Encrypted (AES-GCM)
            </span>
            <span className="text-emerald-400 font-semibold">99.999% SLA</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:brightness-110 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.45)] flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            <span>Enter Session Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
