import React, { useState } from 'react';
import { 
  Video, 
  Search, 
  Grid, 
  Plus, 
  Menu, 
  X, 
  CheckCircle2, 
  PenTool, 
  Kanban, 
  Sparkles, 
  Globe,
  ChevronDown,
  Layers,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { AppTab } from '../types';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onOpenQuickJoin: () => void;
  onStartInstantMeeting: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickJoin,
  onStartInstantMeeting
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const handleTabClick = (tab: AppTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#160c07]/90 backdrop-blur-md border-b border-[#342721]/60">
      {/* Top Banner from the screenshot */}
      <div className="bg-[#1f1008] text-xs py-1.5 px-4 text-[#fed7aa] border-b border-[#342721]/40 flex items-center justify-between">
        <div className="mx-auto flex items-center gap-2 text-center text-[11px] sm:text-xs">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#f97316]/20 text-[#f97316] font-semibold text-[10px] tracking-wide border border-[#f97316]/30">
            SESSIONS OS
          </span>
          <span className="text-[#e0c0b1]">
            Independent clean-room meeting platform built for real work.
          </span>
          <button 
            onClick={() => onSelectTab('overview')} 
            className="text-[#f97316] hover:text-[#fbbf24] underline ml-1 font-medium transition-colors"
          >
            View architecture
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand + Original Nav Links */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => handleTabClick('overview')}
            className="flex items-center gap-2 group text-left"
          >
            {/* Glowing Logo Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f97316] to-[#fbbf24] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#160c07] shadow-inner" />
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#fed7aa] transition-colors">
                Meet<span className="text-[#f97316]">Space</span>
              </span>
            </div>
          </button>

          {/* Nav links matching original site */}
          <nav className="hidden lg:flex items-center gap-5 text-xs text-[#e0c0b1] font-medium tracking-wide">
            <div className="relative">
              <button 
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="hover:text-white flex items-center gap-1 transition-colors py-1 cursor-pointer"
              >
                <span>01 Product</span>
                <ChevronDown className="w-3 h-3 text-[#f97316]" />
              </button>
              {productDropdownOpen && (
                <div 
                  onMouseLeave={() => setProductDropdownOpen(false)}
                  className="absolute top-8 left-0 w-64 bg-[#1f120a] border border-[#40322c] rounded-xl p-3 shadow-2xl z-50 space-y-2 backdrop-blur-xl"
                >
                  <button 
                    onClick={() => { handleTabClick('meeting'); setProductDropdownOpen(false); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#2e1a10] flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#f97316]/20 flex items-center justify-center text-[#f97316] group-hover:bg-[#f97316] group-hover:text-black transition-colors">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">Video & SFU Media</div>
                      <div className="text-[#a78b7d] text-[10px]">Real-time video & stage run of show</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => { handleTabClick('whiteboard'); setProductDropdownOpen(false); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#2e1a10] flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 flex items-center justify-center text-[#fbbf24] group-hover:bg-[#fbbf24] group-hover:text-black transition-colors">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">Shared Whiteboard</div>
                      <div className="text-[#a78b7d] text-[10px]">Collaborative canvas & sticky notes</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => { handleTabClick('board'); setProductDropdownOpen(false); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#2e1a10] flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-black transition-colors">
                      <Kanban className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">Project & Task Board</div>
                      <div className="text-[#a78b7d] text-[10px]">Sprint 42 deliverables & tracking</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => handleTabClick('meeting')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              02 Agenda
            </button>
            <button 
              onClick={() => {
                handleTabClick('overview');
                const el = document.getElementById('architecture-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              03 Architecture
            </button>
            <button 
              onClick={() => {
                handleTabClick('overview');
                const el = document.getElementById('principles-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              04 Principles
            </button>
            <button 
              onClick={onOpenQuickJoin}
              className="text-[#f97316] hover:text-[#fbbf24] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Quick Join</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
            </button>
          </nav>
        </div>

        {/* Center: Live App Screen Switcher Pills */}
        <div className="hidden md:flex items-center bg-[#251913] p-1 rounded-full border border-[#40322c]/80 shadow-inner">
          <button
            onClick={() => handleTabClick('overview')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'overview'
                ? 'bg-[#40322c] text-white shadow-sm'
                : 'text-[#e0c0b1] hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Site Overview</span>
          </button>
          <button
            onClick={() => handleTabClick('meeting')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'meeting'
                ? 'bg-[#f97316] text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                : 'text-[#e0c0b1] hover:text-[#f97316]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Live Meeting</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </button>
          <button
            onClick={() => handleTabClick('whiteboard')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'whiteboard'
                ? 'bg-[#f97316] text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                : 'text-[#e0c0b1] hover:text-[#f97316]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Whiteboard</span>
          </button>
          <button
            onClick={() => handleTabClick('board')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'board'
                ? 'bg-[#f97316] text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                : 'text-[#e0c0b1] hover:text-[#f97316]'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Tasks</span>
            <span className="px-1.5 py-0.2 bg-[#f97316]/30 text-[#f97316] rounded-full text-[10px]">14</span>
          </button>
          <button
            onClick={() => handleTabClick('memory')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentTab === 'memory'
                ? 'bg-[#f97316] text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                : 'text-[#e0c0b1] hover:text-[#f97316]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vault</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button 
            onClick={onOpenQuickJoin}
            title="Search sessions" 
            className="p-2 text-[#a78b7d] hover:text-white hover:bg-[#251913] rounded-full transition-colors hidden sm:block"
          >
            <Search className="w-4 h-4" />
          </button>
          
          {/* Host a meeting button */}
          <button
            onClick={onStartInstantMeeting}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#f5ded5] bg-[#291d17] hover:bg-[#342721] border border-[#584237]/60 transition-colors"
          >
            <span>Host a Meeting</span>
            <ChevronDown className="w-3 h-3 text-[#f97316]" />
          </button>

          {/* Start Free / Join button */}
          <button
            onClick={onStartInstantMeeting}
            className="relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#1a0f0a] bg-gradient-to-r from-[#ffb690] via-[#f97316] to-[#fbbf24] shadow-[0_0_20px_rgba(249,115,22,0.45)] hover:shadow-[0_0_25px_rgba(249,115,22,0.65)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>Start Free</span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full border border-[#f97316]/50 overflow-hidden relative shadow-sm cursor-pointer" title="User Profile">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
              alt="Elena R." 
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-[#e0c0b1] hover:text-white rounded-lg hover:bg-[#251913]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a0f0a] border-b border-[#40322c] px-4 py-4 space-y-3 transition-all animate-in slide-in-from-top">
          <div className="text-xs font-bold uppercase tracking-wider text-[#a78b7d] px-2">Workspaces & Screens</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTabClick('overview')}
              className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center gap-2 border ${
                currentTab === 'overview'
                  ? 'bg-[#2e1910] text-[#f97316] border-[#f97316]/40'
                  : 'bg-[#251913]/60 text-white border-transparent'
              }`}
            >
              <Globe className="w-4 h-4 text-[#f97316]" />
              <span>Site Overview</span>
            </button>
            <button
              onClick={() => handleTabClick('meeting')}
              className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center gap-2 border ${
                currentTab === 'meeting'
                  ? 'bg-[#2e1910] text-[#f97316] border-[#f97316]/40'
                  : 'bg-[#251913]/60 text-white border-transparent'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Live Video & Stage</span>
            </button>
            <button
              onClick={() => handleTabClick('whiteboard')}
              className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center gap-2 border ${
                currentTab === 'whiteboard'
                  ? 'bg-[#2e1910] text-[#f97316] border-[#f97316]/40'
                  : 'bg-[#251913]/60 text-white border-transparent'
              }`}
            >
              <PenTool className="w-4 h-4 text-[#fbbf24]" />
              <span>Shared Whiteboard</span>
            </button>
            <button
              onClick={() => handleTabClick('board')}
              className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center gap-2 border ${
                currentTab === 'board'
                  ? 'bg-[#2e1910] text-[#f97316] border-[#f97316]/40'
                  : 'bg-[#251913]/60 text-white border-transparent'
              }`}
            >
              <Kanban className="w-4 h-4 text-[#38bdf8]" />
              <span>Project & Tasks (14)</span>
            </button>
            <button
              onClick={() => handleTabClick('memory')}
              className={`p-2.5 rounded-xl text-xs font-medium text-left flex items-center gap-2 border col-span-2 ${
                currentTab === 'memory'
                  ? 'bg-[#2e1910] text-[#f97316] border-[#f97316]/40'
                  : 'bg-[#251913]/60 text-white border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#f97316]" />
              <span>Decision Vault & Meeting Memory</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#342721] flex flex-col gap-2">
            <button
              onClick={onOpenQuickJoin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#291d17] text-white text-xs font-medium flex items-center justify-between border border-[#40322c]"
            >
              <span>Quick Join a Session</span>
              <span className="text-[#f97316] font-bold">#</span>
            </button>
            <button
              onClick={onStartInstantMeeting}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#f97316] to-[#fbbf24] text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Start Instant Meeting</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
