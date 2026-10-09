import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Radio, 
  Layers, 
  Cpu, 
  Play, 
  Pause, 
  Sparkles, 
  Video, 
  PenTool, 
  Kanban, 
  Share2, 
  ExternalLink, 
  Mic, 
  Camera, 
  Users, 
  Zap, 
  Monitor, 
  Volume2, 
  ShieldAlert, 
  CheckSquare, 
  FileText, 
  Bot, 
  Building2, 
  Globe2, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { AppTab, AgendaItem } from '../types';

interface OverviewViewProps {
  onNavigateTab: (tab: AppTab) => void;
  agendaItems: AgendaItem[];
  onOpenQuickJoin: () => void;
  onJoinMeeting: (meetingId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateTab,
  agendaItems,
  onOpenQuickJoin,
  onJoinMeeting
}) => {
  const [meetingInputId, setMeetingInputId] = useState('demo-q2-review-2026');
  const [cameraReady, setCameraReady] = useState(true);
  const [audioReady, setAudioReady] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);

  // Live timer simulation for the Run of Show item 2
  const [remainingSeconds, setRemainingSeconds] = useState(758); // 12:38
  const [isTimerPlaying, setIsTimerPlaying] = useState(true);

  useEffect(() => {
    if (!isTimerPlaying) return;
    const interval = setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerPlaying]);

  const formatMinSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen bg-[#140a05] text-[#f5ded5] overflow-hidden">
      {/* Background Solar Halos & Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#ea580c]/20 via-[#f97316]/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] -left-[200px] w-[600px] h-[600px] bg-[#fbbf24]/5 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[1600px] -right-[150px] w-[700px] h-[700px] bg-[#f97316]/8 blur-[180px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a170f] border border-[#f97316]/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#ffb690]">
            A Meeting Operating System
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] sm:leading-[1.12]">
          Meetings that move work <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fed7aa] to-[#ffb690]">
            forward.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#e0c0b1] max-w-2xl mx-auto font-normal leading-relaxed">
          Plan the room. Guide the conversation. Keep the decisions. Sessions brings live collaboration,
          scheduling, events, and trustworthy meeting memory into one workspace.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigateTab('meeting')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:shadow-[0_0_35px_rgba(249,115,22,0.7)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Start a session</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('run-of-show-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#251913]/80 hover:bg-[#342721] text-[#f5ded5] font-medium text-sm sm:text-base border border-[#584237]/70 transition-all cursor-pointer"
          >
            Explore the system
          </button>
        </div>

        {/* Sub-CTA Bullets */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-[#fed7aa]/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span>Original by design — Independent clean-room product</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <span>Secure by default — Tenant isolation and auditability</span>
          </div>
        </div>

        {/* Hero Interactive Floating Feature Cards Row (From the screenshot) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
          {/* 1. Phone Card */}
          <div 
            onClick={() => onNavigateTab('meeting')}
            className="rounded-2xl bg-[#1e120b]/90 border border-[#40322c]/80 p-3.5 shadow-lg relative overflow-hidden group hover:border-[#f97316]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <span className="text-[#f97316] font-bold">📞</span>
                <span>Phone</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#342721] text-[#fed7aa]">
                HD Voice
              </span>
            </div>
            <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-[#2a1a11]">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80" 
                alt="Phone call preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium truncate">
                Quarterly Client Rev...
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#e0c0b1] bg-[#170c07] p-2 rounded-lg border border-[#342721]/50">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                00:14:32 • Active c...
              </span>
              <Mic className="w-3.5 h-3.5 text-[#f97316]" />
            </div>
          </div>

          {/* 2. Webinars Card */}
          <div 
            onClick={() => onNavigateTab('meeting')}
            className="rounded-2xl bg-[#1e120b]/90 border border-[#40322c]/80 p-3.5 shadow-lg relative overflow-hidden group hover:border-[#f97316]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <span className="text-[#f97316] font-bold">👥</span>
                <span>Webinars</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950/60 text-red-400 font-semibold border border-red-800/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-[#2a1a11]">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80" 
                alt="Webinar Host"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-[#e0c0b1] bg-[#170c07] p-2 rounded-lg border border-[#342721]/50">
              <div>
                <div className="text-[10px] text-[#a78b7d]">Attendees</div>
                <div className="font-semibold text-white">4,820</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#a78b7d]">Engaged</div>
                <div className="font-semibold text-[#fbbf24]">98%</div>
              </div>
            </div>
          </div>

          {/* 3. Workspace Card */}
          <div 
            onClick={() => onNavigateTab('board')}
            className="rounded-2xl bg-[#1e120b]/90 border border-[#40322c]/80 p-3.5 shadow-lg relative overflow-hidden group hover:border-[#f97316]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <span className="text-[#f97316] font-bold">⚡</span>
                <span>Workspace</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f97316]/20 text-[#f97316] font-semibold border border-[#f97316]/30">
                AI Flow
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#170c07] border border-[#342721]/60 mb-3 space-y-2">
              <div className="text-[11px] font-semibold text-white flex justify-between items-center">
                <span>Clients Pipeline</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400">Ready</span>
              </div>
              <div className="text-[10px] text-[#a78b7d]">Acme Global</div>
              <div className="flex flex-col gap-1">
                <button className="text-[10px] py-1 px-2 rounded bg-[#291d17] hover:bg-[#342721] text-[#fed7aa] flex items-center justify-between">
                  <span>Send Proposal</span>
                  <ArrowRight className="w-2.5 h-2.5 text-[#f97316]" />
                </button>
                <button className="text-[10px] py-1 px-2 rounded bg-[#f97316]/20 hover:bg-[#f97316]/30 text-[#f97316] flex items-center justify-between">
                  <span>Send Contract</span>
                  <Check className="w-2.5 h-2.5 text-[#f97316]" />
                </button>
              </div>
            </div>
            <div className="text-[11px] text-[#fed7aa] flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
              <span>Workflow automated</span>
            </div>
          </div>

          {/* 4. Rooms Card */}
          <div 
            onClick={() => onNavigateTab('meeting')}
            className="rounded-2xl bg-[#1e120b]/90 border border-[#40322c]/80 p-3.5 shadow-lg relative overflow-hidden group hover:border-[#f97316]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <span className="text-[#f97316] font-bold">📺</span>
                <span>Rooms</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#342721] text-[#fed7aa]">
                Touch Display
              </span>
            </div>
            <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-[#2a1a11]">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80" 
                alt="Boardroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="text-[11px] text-[#e0c0b1] bg-[#170c07] p-2 rounded-lg border border-[#342721]/50 flex items-center justify-between">
              <span>Boardroom A</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected
              </span>
            </div>
          </div>

          {/* 5. Companion Card */}
          <div 
            onClick={() => onNavigateTab('memory')}
            className="rounded-2xl bg-[#1e120b]/90 border border-[#40322c]/80 p-3.5 shadow-lg relative overflow-hidden group hover:border-[#f97316]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <span className="text-[#f97316] font-bold">✨</span>
                <span>Companion</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
            </div>
            <div className="relative h-20 rounded-xl overflow-hidden mb-2 bg-[#2a1a11]">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" 
                alt="Candidate"
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-1 left-2 text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-white">
                Candidate
              </span>
            </div>
            <div className="text-[10px] text-[#e0c0b1] bg-[#170c07] p-2 rounded-lg border border-[#342721]/50 mb-2 leading-tight">
              &quot;Highlight: 5+ years building distributed cloud...&quot;
            </div>
            <div className="text-[11px] text-[#fbbf24] flex items-center justify-between font-medium">
              <span>Auto-summary ON</span>
              <span className="p-1 rounded-full bg-[#f97316]/20 text-[#f97316]">
                <Bot className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — PRODUCT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#342721]/60">
        <div className="text-left mb-12">
          <div className="text-xs font-bold tracking-widest text-[#f97316] uppercase mb-2">
            01 — PRODUCT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            One continuous workflow, not a <br className="hidden sm:inline" />
            pile of disconnected tools.
          </h2>
          <p className="mt-3 text-[#e0c0b1] text-base max-w-2xl">
            A session begins before the call and keeps creating value after everyone leaves.
          </p>
        </div>

        {/* 3 Step Cards: Plan, Guide, Remember */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Plan the Room */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 flex flex-col justify-between hover:border-[#f97316]/40 transition-all group">
            <div>
              <div className="text-xs font-semibold text-[#a78b7d] uppercase tracking-wider mb-2">
                01 | PLAN
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Plan the Room</h3>
              <p className="text-sm text-[#e0c0b1] leading-relaxed mb-6">
                Build a timed agenda, attach the right content, and make ownership explicit before anyone joins.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#251913] border border-[#40322c]/80">
              <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                <span>Pre-session Deck</span>
                <span className="text-[#fbbf24] bg-[#fbbf24]/10 px-2 py-0.5 rounded-full text-[10px]">
                  Ready
                </span>
              </div>
              <div className="text-[11px] text-[#a78b7d]">
                3 co-owners assigned • 4 assets attached
              </div>
            </div>
          </div>

          {/* Card 2: Guide the Conversation */}
          <div className="rounded-3xl bg-[#23150d] border border-[#f97316]/50 p-7 flex flex-col justify-between shadow-[0_10px_35px_-10px_rgba(249,115,22,0.2)] group relative">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#f97316] uppercase tracking-wider">
                  02 | RUN
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f97316] text-[#1a0f0a] font-bold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  IN PROGRESS
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Guide the Conversation</h3>
              <p className="text-sm text-[#fed7aa] leading-relaxed mb-6">
                Bring video, screen share, interactive agenda, and participation tools into one guided workspace.
              </p>
            </div>

            <div 
              onClick={() => onNavigateTab('meeting')}
              className="p-4 rounded-2xl bg-[#2e1910] border border-[#f97316]/40 cursor-pointer hover:bg-[#341d13] transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#fed7aa] mb-1">
                <span className="text-[10px] tracking-wider uppercase text-[#a78b7d]">RUN OF SHOW / HOST VIEW</span>
                <span className="text-[#fbbf24] font-mono text-xs">{formatMinSec(remainingSeconds)} remaining</span>
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2 my-1">
                <Play className="w-3.5 h-3.5 fill-[#f97316] text-[#f97316]" />
                <span>Walk through the prototype</span>
              </div>
              <div className="text-[11px] text-[#e0c0b1]">
                Presenter: Elena R. • 8 questions queued
              </div>
            </div>
          </div>

          {/* Card 3: Keep the Decisions */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 flex flex-col justify-between hover:border-[#f97316]/40 transition-all group">
            <div>
              <div className="text-xs font-semibold text-[#a78b7d] uppercase tracking-wider mb-2">
                03 | REMEMBER
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Keep the Decisions</h3>
              <p className="text-sm text-[#e0c0b1] leading-relaxed mb-6">
                Turn recordings, transcripts, decisions, and actions into a searchable record after the call.
              </p>
            </div>
            <div 
              onClick={() => onNavigateTab('memory')}
              className="p-4 rounded-2xl bg-[#251913] border border-[#40322c]/80 cursor-pointer hover:bg-[#2c1d16] transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Decision Record Dispatched</span>
              </div>
              <div className="text-[11px] text-[#a78b7d] leading-snug">
                Transcript tagged with 4 milestone approvals and synced to enterprise workspace audit vault.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REALTIME RUN OF SHOW SECTION */}
      <section id="run-of-show-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#342721]/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a170f] border border-[#f97316]/30 text-[#f97316] text-[11px] font-bold tracking-wider uppercase mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>REALTIME RUN OF SHOW</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              The agenda is part of the meeting, not a document nobody opens.
            </h2>

            <p className="mt-5 text-[#e0c0b1] text-base leading-relaxed">
              Time-boxed items drive the stage. Move from context to content, polls, Q&A and decisions without sending participants into a maze of tabs.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-white">Shared, realtime agenda state</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-white">Content-aware meeting segments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-white">Durable audit and event history</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onNavigateTab('meeting')}
                className="px-6 py-3 rounded-full bg-[#2e1910] hover:bg-[#3d2317] border border-[#f97316]/40 text-[#fed7aa] font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Launch Stage Controller</span>
                <ArrowRight className="w-4 h-4 text-[#f97316]" />
              </button>
            </div>
          </div>

          {/* Right Stage Controller Interactive Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#1c110b] border border-[#40322c] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#342721]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-white">
                    STAGE CONTROLLER • Q2 REVIEW
                  </span>
                </div>
                <span className="text-xs font-medium text-[#a78b7d]">
                  45 min scheduled
                </span>
              </div>

              {/* Agenda Items List */}
              <div className="mt-6 space-y-3.5">
                {/* 01 Welcome & Context Align */}
                <div className="p-4 rounded-2xl bg-[#251913]/70 border border-[#342721] flex items-center justify-between transition-all">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs font-mono font-bold text-[#a78b7d]">01</span>
                    <div>
                      <div className="text-sm font-semibold text-white">Welcome & Context Align</div>
                      <div className="text-xs text-[#a78b7d]">05:00 • Completed</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                {/* 02 Walk through the prototype (ACTIVE ON STAGE) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2f180e] to-[#25150c] border-2 border-[#f97316] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(249,115,22,0.25)]">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <span className="text-xs font-mono font-bold text-[#f97316] mt-0.5 sm:mt-0">02</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">Walk through the prototype</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#f97316] text-[#120804] text-[10px] font-extrabold uppercase">
                          ON STAGE
                        </span>
                      </div>
                      <div className="text-xs text-[#fed7aa] mt-0.5">
                        Current segment • 20:00 allocated
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={() => setIsTimerPlaying(!isTimerPlaying)}
                      className="p-2 rounded-full bg-[#402214] text-[#fed7aa] hover:text-white"
                      title={isTimerPlaying ? "Pause stage timer" : "Play stage timer"}
                    >
                      {isTimerPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <div className="text-right">
                      <div className="text-lg font-mono font-bold text-[#fbbf24] leading-tight">
                        {formatMinSec(remainingSeconds)}
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-[#f97316]">
                        REMAINING
                      </div>
                    </div>
                  </div>
                </div>

                {/* 03 Live Feedback & Polls */}
                <div className="p-4 rounded-2xl bg-[#251913]/70 border border-[#342721] flex items-center justify-between transition-all">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs font-mono font-bold text-[#a78b7d]">03</span>
                    <div>
                      <div className="text-sm font-semibold text-white">Live Feedback & Polls</div>
                      <div className="text-xs text-[#a78b7d]">10:00 • Ready to trigger</div>
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-[#a78b7d]" />
                </div>

                {/* 04 Action Items & Next Steps */}
                <div className="p-4 rounded-2xl bg-[#251913]/70 border border-[#342721] flex items-center justify-between transition-all">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs font-mono font-bold text-[#a78b7d]">04</span>
                    <div>
                      <div className="text-sm font-semibold text-white">Action Items & Next Steps</div>
                      <div className="text-xs text-[#a78b7d]">10:00 • Decision vault ready</div>
                    </div>
                  </div>
                  <Clock className="w-4 h-4 text-[#a78b7d]" />
                </div>
              </div>

              {/* Bottom Quick Trigger */}
              <div className="mt-6 pt-4 border-t border-[#342721]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#fed7aa]">
                <span>Host controls: Auto-advance & transcript sync active</span>
                <button
                  onClick={() => onNavigateTab('meeting')}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#f97316] text-[#160c07] font-bold hover:bg-[#ea580c] transition-colors"
                >
                  Enter Room as Co-Host
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — ARCHITECTURE SECTION */}
      <section id="architecture-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#342721]/60">
        <div className="text-left mb-12">
          <div className="text-xs font-bold tracking-widest text-[#f97316] uppercase mb-2">
            03 — ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Designed as a system of clear boundaries.
          </h2>
          <p className="mt-3 text-[#e0c0b1] text-base max-w-2xl">
            Media, realtime collaboration, durable business state and AI workloads have different reliability needs. Sessions treats them that way.
          </p>
        </div>

        {/* 3 Architecture Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 01 Control Plane */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#f97316] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-[#a78b7d] uppercase tracking-wider mb-2">
                01 | CONTROL PLANE
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Governance & Identity</h3>
              <p className="text-sm text-[#e0c0b1] leading-relaxed mb-8">
                Verified identity claims, application checks and forced PostgreSQL row-level security.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                PostgreSQL RLS
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                OIDC/SAML
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                Multi-Tenant
              </span>
            </div>
          </div>

          {/* 02 Realtime Plane */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#fbbf24] mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-[#a78b7d] uppercase tracking-wider mb-2">
                02 | REALTIME PLANE
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Collaboration Fabric</h3>
              <p className="text-sm text-[#e0c0b1] leading-relaxed mb-8">
                WebSocket state for presence, agenda, chat, polls, Q&A and collaborative tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                WebSocket Mesh
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                &lt;20ms Latency
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                CRDT Sync
              </span>
            </div>
          </div>

          {/* 03 Media Plane */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#ff6d2c] mb-6">
                <Video className="w-6 h-6" />
              </div>
              <div className="text-xs font-semibold text-[#a78b7d] uppercase tracking-wider mb-2">
                03 | MEDIA PLANE
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Video & Audio SFU</h3>
              <p className="text-sm text-[#e0c0b1] leading-relaxed mb-8">
                LiveKit SFU, TURN, adaptive WebRTC, egress and region-aware capacity.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                LiveKit SFU
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                Adaptive WebRTC
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-mono text-[#fed7aa] border border-[#40322c]">
                Global Edge
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — PRINCIPLES SECTION */}
      <section id="principles-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#342721]/60">
        <div className="text-left mb-12">
          <div className="text-xs font-bold tracking-widest text-[#f97316] uppercase mb-2">
            04 — PRINCIPLES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Trust is a product feature.
          </h2>
          <p className="mt-3 text-[#e0c0b1] text-base max-w-2xl">
            Clean-room architecture engineered so you never compromise security, privacy, or human oversight.
          </p>
        </div>

        {/* 4 Principle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Principle 1 */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-6 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#f97316] mb-5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tenant boundaries</h3>
              <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
                Verified identity claims, application checks and forced PostgreSQL row-level security.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#f97316]">
              Strict Data Isolation
            </div>
          </div>

          {/* Principle 2 */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-6 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#fbbf24] mb-5">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Consent before capture</h3>
              <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
                Recording and transcription require visible disclosure, policy and auditable consent.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#fbbf24]">
              Explicit Participant Rights
            </div>
          </div>

          {/* Principle 3 */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-6 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#ff6d2c] mb-5">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI with a human in control</h3>
              <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
                Suggestions are labeled, editable and reviewed before external actions are taken.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#ff6d2c]">
              Human-in-the-Loop Always
            </div>
          </div>

          {/* Principle 4 */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-6 flex flex-col justify-between hover:border-[#f97316]/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-emerald-400 mb-5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Honest delivery status</h3>
              <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
                Planned capability is never presented as implemented production functionality.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-400">
              Radical Architecture Truth
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY LOGOS RIBBON */}
      <section className="py-14 border-y border-[#342721]/50 bg-[#160c07]/60">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#a78b7d] mb-8">
            TRUSTED BY 500,000+ FORWARD-THINKING BUSINESSES AND FORTUNE 500 TEAMS
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-base sm:text-lg tracking-wider text-white">⬡ NETSCALE</span>
            <span className="font-bold text-base sm:text-lg tracking-wider text-white">◎ VOXFLOW</span>
            <span className="font-bold text-base sm:text-lg tracking-wider text-white">🛡 SENTINEL</span>
            <span className="font-bold text-base sm:text-lg tracking-wider text-white">▥ DATACROFT</span>
            <span className="font-bold text-base sm:text-lg tracking-wider text-white">✚ MEDISYNC</span>
          </div>
        </div>
      </section>

      {/* INSTANT MEETING ENGINE / ZERO DOWNLOADS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a170f] border border-[#f97316]/30 text-[#f97316] text-[11px] font-bold tracking-wider uppercase mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Meeting Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Jump in immediately with zero downloads
            </h2>

            <p className="mt-5 text-[#e0c0b1] text-base leading-relaxed">
              Connect in pristine 1080p60 directly through your browser. Check your camera, microphone, and bandwidth with our 3-second live hardware diagnostic.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-[#fed7aa]">
              <span className="px-4 py-2 rounded-full bg-[#251913] border border-[#40322c] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                99.999% SLA Uptime
              </span>
              <span className="px-4 py-2 rounded-full bg-[#251913] border border-[#40322c] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#f97316]" />
                End-to-End Encrypted
              </span>
            </div>
          </div>

          {/* Right Interactive Join Box from Screenshot */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#1c110b] border border-[#40322c] p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#342721]">
                <span className="text-sm font-bold text-white">Join or Start a Meeting</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Ready
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#a78b7d] mb-1.5">
                    Meeting ID or Personal Link
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={meetingInputId}
                      onChange={(e) => setMeetingInputId(e.target.value)}
                      placeholder="Enter Meeting ID or Personal Link"
                      className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors pr-20 font-mono"
                    />
                    <span className="absolute right-3 top-3 text-xs text-[#a78b7d] font-semibold">
                      Demo ID
                    </span>
                  </div>
                </div>

                {/* Hardware checks */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button 
                    onClick={() => setCameraReady(!cameraReady)}
                    className={`p-3 rounded-xl border flex items-center gap-2 transition-colors ${
                      cameraReady 
                        ? 'bg-[#291d17] border-emerald-500/40 text-[#fed7aa]' 
                        : 'bg-[#1b100a] border-red-500/40 text-[#a78b7d]'
                    }`}
                  >
                    <Camera className={`w-4 h-4 ${cameraReady ? 'text-emerald-400' : 'text-red-400'}`} />
                    <span>Camera: {cameraReady ? 'Ready' : 'Off'}</span>
                  </button>

                  <button 
                    onClick={() => setAudioReady(!audioReady)}
                    className={`p-3 rounded-xl border flex items-center gap-2 transition-colors ${
                      audioReady 
                        ? 'bg-[#291d17] border-emerald-500/40 text-[#fed7aa]' 
                        : 'bg-[#1b100a] border-red-500/40 text-[#a78b7d]'
                    }`}
                  >
                    <Mic className={`w-4 h-4 ${audioReady ? 'text-emerald-400' : 'text-red-400'}`} />
                    <span>Audio: {audioReady ? 'Tested' : 'Muted'}</span>
                  </button>
                </div>

                {/* Join Session CTA and Plus Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onJoinMeeting(meetingInputId)}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] hover:brightness-110 text-white font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Join Session</span>
                  </button>
                  <button
                    onClick={() => onJoinMeeting('instant-' + Date.now().toString(36))}
                    className="w-12 h-12 rounded-2xl bg-[#291d17] hover:bg-[#342721] border border-[#40322c] text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Create new empty room"
                  >
                    <Plus className="w-5 h-5 text-[#f97316]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIFIED ENTERPRISE ARCHITECTURE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#342721]/60">
        <div className="text-left mb-12">
          <div className="text-xs font-bold tracking-widest text-[#f97316] uppercase mb-2">
            Unified Enterprise Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            One unified platform for modern connection
          </h2>
          <p className="mt-3 text-[#e0c0b1] text-base max-w-2xl">
            Ditch fragmented tooling. MeetSpace consolidates meetings, phone systems, asynchronous chat, and generative workflow AI into one seamless enterprise hub.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: HD Video & Immersive Canvases */}
          <div 
            onClick={() => onNavigateTab('whiteboard')}
            className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 hover:border-[#f97316]/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#f97316] mb-5">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">HD Video & Immersive Canvases</h3>
            <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
              Crystal-clear video feeds up to 1,000 interactive participants with intelligent spatial audio and real-time noise cancellation.
            </p>
            <div className="p-4 rounded-2xl bg-[#251913] border border-[#40322c]/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a78b7d]">Bandwidth Optimization</span>
                <span className="text-[#fbbf24] font-bold">64% Reduced</span>
              </div>
              <div className="text-[11px] text-[#e0c0b1]">
                Autonomous bit-rate switching on mobile & low-bandwidth networks.
              </div>
            </div>
          </div>

          {/* Card 2: Companion: Enterprise AI */}
          <div 
            onClick={() => onNavigateTab('memory')}
            className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 hover:border-[#f97316]/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#fbbf24] mb-5">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Companion: Enterprise AI</h3>
            <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
              Automatic executive meeting summaries, action item routing, real-time query answers, and automated multilingual transcriptions.
            </p>
            <div className="p-4 rounded-2xl bg-[#251913] border border-[#40322c]/80 space-y-1.5 text-xs text-[#fed7aa]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#f97316]" />
                <span>Summary auto-dispatched to Slack & Jira</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>14 key deliverables tracked for Sprint 42</span>
              </div>
            </div>
          </div>

          {/* Card 3: Team Chat & Channel Huddles */}
          <div 
            onClick={() => onNavigateTab('meeting')}
            className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 hover:border-[#f97316]/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-[#ff6d2c] mb-5">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Team Chat & Channel Huddles</h3>
            <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
              Centralize conversations with asynchronous voice notes, quick 1-click video huddles, and rich canvas whiteboarding inside threads.
            </p>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#251913] border border-[#40322c]">
              <div className="flex -space-x-2">
                <span className="w-7 h-7 rounded-full bg-[#f97316] text-[#120804] text-[10px] font-bold flex items-center justify-center border-2 border-[#1c110b]">MP</span>
                <span className="w-7 h-7 rounded-full bg-[#fbbf24] text-[#120804] text-[10px] font-bold flex items-center justify-center border-2 border-[#1c110b]">SJ</span>
                <span className="w-7 h-7 rounded-full bg-[#ff6d2c] text-[#120804] text-[10px] font-bold flex items-center justify-center border-2 border-[#1c110b]">JR</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-950 text-red-400 text-xs font-semibold">
                Live in Huddle
              </span>
            </div>
          </div>

          {/* Card 4: Hybrid Rooms & Bank-Grade Compliance */}
          <div className="rounded-3xl bg-[#1b100a] border border-[#3d2c23] p-7 hover:border-[#f97316]/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#291d17] border border-[#40322c] flex items-center justify-center text-emerald-400 mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-right text-[11px] text-[#a78b7d]">
                Auto Ultrasonic Sync
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bank-Grade Compliance</h3>
            <p className="text-xs text-[#e0c0b1] leading-relaxed mb-6">
              SOC 2 Type II, HIPAA, GDPR, and FedRAMP certified. Multi-region data residency controls and customer-managed keys.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-semibold text-white border border-[#40322c]">
                SOC 2
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-semibold text-white border border-[#40322c]">
                HIPAA
              </span>
              <span className="px-3 py-1 rounded-full bg-[#251913] text-xs font-semibold text-white border border-[#40322c]">
                ISO 27001
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-[#342721]/60 relative">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2a170f] text-[#f97316] text-xs font-bold uppercase tracking-wider mb-4">
          SESSIONS
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Make the next meeting <br className="hidden sm:inline" />
          worth everyone&apos;s time.
        </h2>
        <p className="mt-4 text-[#e0c0b1] text-base max-w-xl mx-auto">
          Independent clean-room meeting platform. Start immediately with seamless video, guided agenda, and verifiable trust.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigateTab('meeting')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-semibold text-sm shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:shadow-[0_0_35px_rgba(249,115,22,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open the workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenQuickJoin}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#251913] hover:bg-[#342721] text-white font-medium text-sm border border-[#40322c] transition-all cursor-pointer"
          >
            Talk to Sales
          </button>
        </div>
      </section>

      {/* FOOTER matching original screenshot */}
      <footer className="border-t border-[#342721] bg-[#100703] py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#a78b7d]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#f97316] to-[#fbbf24] flex items-center justify-center shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#160c07]" />
              </div>
              <span className="text-white font-bold text-base">Meet<span className="text-[#f97316]">Space</span></span>
            </div>
            <p className="text-xs text-[#a78b7d] max-w-sm leading-relaxed mb-4">
              Sessions: A clean-room meeting operating system combining realtime collaboration, scheduled runs of show, LiveKit SFU media, and auditable memory.
            </p>
            <div className="flex items-center gap-3 text-[#fed7aa]">
              <Globe2 className="w-4 h-4 cursor-pointer hover:text-white" />
              <ShieldCheck className="w-4 h-4 cursor-pointer hover:text-white" />
              <Video className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="font-semibold text-white mb-3">Products</div>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigateTab('meeting')} className="hover:text-white transition-colors">Meetings</button></li>
              <li><button onClick={() => onNavigateTab('meeting')} className="hover:text-white transition-colors">Run of Show</button></li>
              <li><button onClick={() => onNavigateTab('meeting')} className="hover:text-white transition-colors">Phone System</button></li>
              <li><button onClick={() => onNavigateTab('whiteboard')} className="hover:text-white transition-colors">Interactive Whiteboard</button></li>
              <li><button onClick={() => onNavigateTab('board')} className="hover:text-white transition-colors">Rooms & Workspaces</button></li>
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <div className="font-semibold text-white mb-3">Architecture</div>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">Control Plane</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Realtime Plane</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Media Plane (LiveKit)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">PostgreSQL RLS</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Tenant Isolation</span></li>
            </ul>
          </div>

          {/* Principles & Company */}
          <div>
            <div className="font-semibold text-white mb-3">Principles</div>
            <ul className="space-y-2 mb-4">
              <li><span className="hover:text-white transition-colors cursor-pointer">Consent Before Capture</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Human In Control</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Honest Status</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Audit Vault</span></li>
            </ul>
            <div className="font-semibold text-white mb-3">Company</div>
            <ul className="space-y-2">
              <li><span className="hover:text-white transition-colors cursor-pointer">About Us</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Partners</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#342721]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 MeetSpace Communications, Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#fed7aa]/70">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Legal Policies</span>
            <span className="hover:text-white cursor-pointer">Trust Center</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
            <span className="flex items-center gap-1 text-white">
              <Globe2 className="w-3.5 h-3.5 text-[#f97316]" />
              Global (English)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
