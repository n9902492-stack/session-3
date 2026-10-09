import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  Share2, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  Settings, 
  Sparkles, 
  PenTool, 
  Kanban, 
  CheckCircle2, 
  Clock, 
  Play, 
  Pause, 
  ChevronRight, 
  Send, 
  ThumbsUp, 
  Smile, 
  Maximize2, 
  Minimize2,
  Volume2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Participant, AgendaItem, MeetingPoll, ChatMessage, AppTab } from '../types';

interface MeetingRoomProps {
  onNavigateTab: (tab: AppTab) => void;
  agendaItems: AgendaItem[];
  onUpdateAgenda: (items: AgendaItem[]) => void;
  participants: Participant[];
  onDispatchDecision: (title: string, summary: string) => void;
}

export const MeetingRoom: React.FC<MeetingRoomProps> = ({
  onNavigateTab,
  agendaItems,
  onUpdateAgenda,
  participants: initialPeers,
  onDispatchDecision
}) => {
  // Local user media states
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(true);
  const [cameraStreamActive, setCameraStreamActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Active view layout: 'grid' | 'stage'
  const [layoutMode, setLayoutMode] = useState<'stage' | 'grid'>('stage');
  const [pinnedSpeakerId, setPinnedSpeakerId] = useState<string>('p-1'); // Elena R.

  // Run of show active segment timer
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(1); // 02 Walk through the prototype
  const [timerSeconds, setTimerSeconds] = useState(758); // 12:38
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Side panels: 'none' | 'chat' | 'agenda' | 'poll' | 'participants'
  const [activeSidePanel, setActiveSidePanel] = useState<'none' | 'chat' | 'agenda' | 'poll' | 'participants'>('agenda');

  // Floating reactions
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: string; emoji: string; x: number }[]>([]);

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'c-1',
      sender: 'Elena Rostova',
      time: '10:15 AM',
      text: 'Starting prototype walkthrough. Notice how the LiveKit SFU automatically throttles bit-rate when packet loss reaches 4%.'
    },
    {
      id: 'c-2',
      sender: 'Marcus Brody',
      time: '10:16 AM',
      text: 'Strokes on the shared whiteboard are syncing via CRDT in under 18ms on global edge.'
    },
    {
      id: 'c-3',
      sender: 'Sarah Jenkins',
      time: '10:18 AM',
      text: 'Ready to dispatch action items into Sprint 42 board once we wrap the live feedback stage.'
    }
  ]);
  const [inputChat, setInputChat] = useState('');

  // Meeting Poll state
  const [poll, setPoll] = useState<MeetingPoll>({
    id: 'poll-1',
    question: 'Should we prioritize the Autonomous SFU bit-rate switching for Mobile tier in Sprint 42?',
    options: [
      { id: 'opt-1', label: 'Yes, urgent priority for field teams', votes: 12 },
      { id: 'opt-2', label: 'Balance equally with Whiteboard CRDT sync', votes: 6 },
      { id: 'opt-3', label: 'Defer to Sprint 43', votes: 2 }
    ],
    totalVotes: 20,
    userVotedId: undefined
  });

  // Real device camera attempt
  useEffect(() => {
    let stream: MediaStream | null = null;
    const enableCamera = async () => {
      try {
        if (!isVideoMuted && navigator.mediaDevices?.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
            setCameraStreamActive(true);
          }
        }
      } catch (err) {
        // Fallback to simulated camera feed
        setCameraStreamActive(false);
      }
    };

    if (!isVideoMuted) {
      enableCamera();
    } else {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
        localVideoRef.current.srcObject = null;
      }
      setCameraStreamActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isVideoMuted]);

  // Run of Show timer tick
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextSegment = () => {
    if (currentSegmentIndex < agendaItems.length - 1) {
      const nextIdx = currentSegmentIndex + 1;
      setCurrentSegmentIndex(nextIdx);
      setTimerSeconds(agendaItems[nextIdx].allocatedMin * 60);
      setIsTimerRunning(true);
      
      // Update agenda items status
      const updated = agendaItems.map((item, idx) => {
        if (idx < nextIdx) return { ...item, status: 'completed' as const };
        if (idx === nextIdx) return { ...item, status: 'on_stage' as const };
        return { ...item, status: 'ready' as const };
      });
      onUpdateAgenda(updated);
    }
  };

  const triggerReaction = (emoji: string) => {
    const id = Date.now().toString() + Math.random();
    const x = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    setFloatingEmojis(prev => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 2500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'You (Co-Host)',
      time: 'Just now',
      text: inputChat.trim()
    };
    setChatMessages(prev => [...prev, msg]);
    setInputChat('');
  };

  const handleVote = (optionId: string) => {
    if (poll.userVotedId) return;
    setPoll(prev => ({
      ...prev,
      userVotedId: optionId,
      totalVotes: prev.totalVotes + 1,
      options: prev.options.map(opt => 
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    }));
  };

  const activeSegment = agendaItems[currentSegmentIndex] || agendaItems[1];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#120804] text-[#f5ded5] flex flex-col overflow-hidden">
      {/* Top Session Bar */}
      <div className="bg-[#1a0f0a] border-b border-[#342721] px-4 py-2 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-white tracking-wide text-sm">
              Q2 Engineering Review & Prototype Walkthrough
            </span>
            <span className="text-[#a78b7d] hidden sm:inline">
              Session #MS-4892 • LiveKit SFU Global Mesh
            </span>
          </div>
        </div>

        {/* Live Segment Badge in Header */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#291d17] border border-[#f97316]/40 text-[#fed7aa]">
            <Clock className="w-3.5 h-3.5 text-[#f97316]" />
            <span className="font-medium text-[11px] truncate max-w-[200px]">
              Stage: {activeSegment.title}
            </span>
            <span className="font-mono font-bold text-[#fbbf24] ml-1">
              {formatTimer(timerSeconds)}
            </span>
          </div>

          {/* Quick jump to collaborative tools */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigateTab('whiteboard')}
              className="px-2.5 py-1 rounded-lg bg-[#251913] hover:bg-[#342721] text-xs text-[#fed7aa] border border-[#40322c] flex items-center gap-1 transition-colors"
              title="Open Shared Whiteboard"
            >
              <PenTool className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="hidden sm:inline">Whiteboard</span>
            </button>
            <button
              onClick={() => onNavigateTab('board')}
              className="px-2.5 py-1 rounded-lg bg-[#251913] hover:bg-[#342721] text-xs text-[#fed7aa] border border-[#40322c] flex items-center gap-1 transition-colors"
              title="Open Sprint 42 Task Board"
            >
              <Kanban className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="hidden sm:inline">Tasks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Stage + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Floating animated emoji layer */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {floatingEmojis.map(item => (
            <div
              key={item.id}
              style={{ left: `${item.x}%` }}
              className="absolute bottom-16 text-3xl animate-bounce transition-all duration-1000 select-none"
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Video Canvas & Presentation Stage */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 gap-3 overflow-y-auto">
          {layoutMode === 'stage' ? (
            /* STAGE VIEW: Big Presentation Canvas + Speaker Carousel */
            <div className="flex-1 flex flex-col gap-3 min-h-[460px]">
              {/* Main Presentation Stage */}
              <div className="flex-1 rounded-2xl bg-[#1a0e08] border border-[#40322c] relative overflow-hidden flex flex-col shadow-2xl">
                {/* Stage Header Info */}
                <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs border border-white/10 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#f97316] animate-ping" />
                    <span className="font-semibold">Elena Rostova&apos;s Screen</span>
                    <span className="text-[#a78b7d] text-[10px]">1080p60 • LiveKit Adaptive SFU</span>
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={() => setLayoutMode('grid')}
                      className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-[#fed7aa] border border-white/10 text-xs flex items-center gap-1"
                      title="Switch to Grid view"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Grid</span>
                    </button>
                  </div>
                </div>

                {/* Simulated High-Res Interactive Screen Share: Prototype Walkthrough */}
                <div className="flex-1 bg-gradient-to-br from-[#1d120c] via-[#24150d] to-[#160c07] p-6 flex flex-col justify-center items-center text-center relative overflow-hidden select-none">
                  {/* Glowing background grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#342721_1px,transparent_1px),linear-gradient(to_bottom,#342721_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
                  
                  {/* Prototype Preview Card in Stage */}
                  <div className="relative z-10 max-w-2xl w-full rounded-2xl bg-[#251913]/95 border-2 border-[#f97316]/50 p-6 shadow-[0_0_40px_rgba(249,115,22,0.2)] text-left">
                    <div className="flex items-center justify-between pb-4 border-b border-[#40322c]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#f97316]" />
                        <span className="font-bold text-white text-sm">
                          Clean-Room Architecture Spec v2.4 (Live Prototype)
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-mono font-bold">
                        99.999% SLA
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#190e09] border border-[#342721]">
                        <div className="text-[#a78b7d] text-[10px] uppercase font-bold">Latency Metric</div>
                        <div className="text-xl font-mono font-bold text-[#fbbf24] mt-1">17.4 ms</div>
                        <div className="text-[10px] text-emerald-400">Global SFU mesh</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#190e09] border border-[#342721]">
                        <div className="text-[#a78b7d] text-[10px] uppercase font-bold">Ingress Reduction</div>
                        <div className="text-xl font-mono font-bold text-[#f97316] mt-1">-64.2%</div>
                        <div className="text-[10px] text-[#fed7aa]">Adaptive mobile stream</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#190e09] border border-[#342721]">
                        <div className="text-[#a78b7d] text-[10px] uppercase font-bold">Audit Vault State</div>
                        <div className="text-xl font-mono font-bold text-white mt-1">4 Signed</div>
                        <div className="text-[10px] text-emerald-400">PostgreSQL RLS Isolated</div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-[#1e110a] border border-[#f97316]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-[#fed7aa]">
                        <span className="font-semibold text-white">Active Milestone:</span> Ready to ratify decision on Sprint 42 tasks.
                      </div>
                      <button
                        onClick={() => {
                          onDispatchDecision(
                            'LiveKit SFU adaptive bitrate rollout ratified',
                            'Approved unanimously during Q2 Prototype Walkthrough. 14 deliverables synced to Sprint 42 board.'
                          );
                          triggerReaction('🚀');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white text-xs font-bold hover:brightness-110 shadow-md transition-all whitespace-nowrap"
                      >
                        Ratify & Dispatch Decision
                      </button>
                    </div>
                  </div>

                  {/* Active presenter avatar pip */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 p-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-[#f97316]/50">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                      alt="Elena R." 
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="text-left pr-2">
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>Elena R. (Host)</span>
                        <Mic className="w-3 h-3 text-[#f97316] animate-pulse" />
                      </div>
                      <div className="text-[10px] text-[#fbbf24]">Speaking...</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants Carousel along bottom of stage */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5 h-32">
                {/* 1. Local User (You) */}
                <div className={`rounded-xl border p-2 flex flex-col justify-between relative overflow-hidden transition-all ${
                  isMicMuted ? 'bg-[#1e110a] border-[#342721]' : 'bg-[#25150d] border-[#f97316]/40 ring-1 ring-[#f97316]/30'
                }`}>
                  <div className="flex-1 rounded-lg overflow-hidden relative bg-[#170c07] flex items-center justify-center">
                    {isVideoMuted ? (
                      <div className="w-10 h-10 rounded-full bg-[#f97316] text-[#120804] font-bold flex items-center justify-center text-sm shadow-md">
                        YOU
                      </div>
                    ) : (
                      <video 
                        ref={localVideoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className={`w-full h-full object-cover ${cameraStreamActive ? '' : 'hidden'}`}
                      />
                    )}

                    {!cameraStreamActive && !isVideoMuted && (
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                        alt="Simulated User" 
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60">
                      {isMicMuted ? (
                        <MicOff className="w-3 h-3 text-red-400" />
                      ) : (
                        <Mic className="w-3 h-3 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white">You (Co-Host)</span>
                    <span className="text-[9px] text-[#a78b7d] uppercase">HD</span>
                  </div>
                </div>

                {/* 2. Elena Rostova */}
                <div className="rounded-xl bg-[#25150d] border-2 border-[#f97316] p-2 flex flex-col justify-between relative overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                  <div className="flex-1 rounded-lg overflow-hidden relative bg-[#170c07]">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" 
                      alt="Elena" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-[#fbbf24] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-ping" />
                      SPEAKER
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white truncate">Elena Rostova</span>
                    <Mic className="w-3 h-3 text-[#f97316]" />
                  </div>
                </div>

                {/* 3. Marcus Brody */}
                <div className="rounded-xl bg-[#1e110a] border border-[#342721] p-2 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex-1 rounded-lg overflow-hidden relative bg-[#170c07]">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" 
                      alt="Marcus" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white truncate">Marcus Brody</span>
                    <Mic className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>

                {/* 4. Sarah Jenkins */}
                <div className="rounded-xl bg-[#1e110a] border border-[#342721] p-2 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex-1 rounded-lg overflow-hidden relative bg-[#170c07]">
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80" 
                      alt="Sarah" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white truncate">Sarah Jenkins</span>
                    <MicOff className="w-3 h-3 text-[#a78b7d]" />
                  </div>
                </div>

                {/* 5. David Kim */}
                <div className="hidden md:flex rounded-xl bg-[#1e110a] border border-[#342721] p-2 flex-col justify-between relative overflow-hidden">
                  <div className="flex-1 rounded-lg overflow-hidden relative bg-[#170c07]">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" 
                      alt="David" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white truncate">David Kim</span>
                    <MicOff className="w-3 h-3 text-[#a78b7d]" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* FULL GRID VIEW */
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Elena */}
              <div className="rounded-2xl bg-[#25150d] border-2 border-[#f97316] relative overflow-hidden flex flex-col justify-end p-4 min-h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80" 
                  alt="Elena" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Elena Rostova (Lead Architect)</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f97316] text-black font-bold text-[10px]">HOST</span>
                </div>
              </div>

              {/* You */}
              <div className="rounded-2xl bg-[#1a0e08] border border-[#40322c] relative overflow-hidden flex flex-col justify-end p-4 min-h-[220px]">
                {cameraStreamActive ? (
                  <video ref={localVideoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" 
                    alt="You" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white">
                  <span>You (Co-Host)</span>
                  <span className="text-[10px] text-emerald-400">Connected</span>
                </div>
              </div>

              {/* Marcus */}
              <div className="rounded-2xl bg-[#1a0e08] border border-[#40322c] relative overflow-hidden flex flex-col justify-end p-4 min-h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" 
                  alt="Marcus" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Marcus Brody (Media SFU)</span>
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Sarah */}
              <div className="rounded-2xl bg-[#1a0e08] border border-[#40322c] relative overflow-hidden flex flex-col justify-end p-4 min-h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80" 
                  alt="Sarah" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Sarah Jenkins (Product Lead)</span>
                  <MicOff className="w-3.5 h-3.5 text-[#a78b7d]" />
                </div>
              </div>

              {/* David */}
              <div className="rounded-2xl bg-[#1a0e08] border border-[#40322c] relative overflow-hidden flex flex-col justify-end p-4 min-h-[220px]">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80" 
                  alt="David" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 flex items-center justify-between text-xs font-semibold text-white">
                  <span>David Kim (Security & Audit)</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Side Drawer: Agenda / Chat / Polls */}
        {activeSidePanel !== 'none' && (
          <div className="w-full lg:w-80 xl:w-96 bg-[#180d07] border-l border-[#342721] flex flex-col h-auto lg:h-full max-h-[500px] lg:max-h-none shrink-0">
            {/* Panel Tab Selector */}
            <div className="flex items-center justify-around p-2 bg-[#20110a] border-b border-[#342721] text-xs font-semibold">
              <button
                onClick={() => setActiveSidePanel('agenda')}
                className={`py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeSidePanel === 'agenda' ? 'bg-[#f97316] text-[#120804]' : 'text-[#fed7aa] hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Run of Show</span>
              </button>
              <button
                onClick={() => setActiveSidePanel('chat')}
                className={`py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeSidePanel === 'chat' ? 'bg-[#f97316] text-[#120804]' : 'text-[#fed7aa] hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
              </button>
              <button
                onClick={() => setActiveSidePanel('poll')}
                className={`py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeSidePanel === 'poll' ? 'bg-[#f97316] text-[#120804]' : 'text-[#fed7aa] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Poll</span>
              </button>
            </div>

            {/* PANEL CONTENT 1: RUN OF SHOW (STAGE CONTROLLER) */}
            {activeSidePanel === 'agenda' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#342721]">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Stage Controller • Q2 Review
                  </span>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="text-xs font-mono font-bold text-[#fbbf24] flex items-center gap-1 bg-[#251913] px-2 py-0.5 rounded-md"
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{formatTimer(timerSeconds)}</span>
                  </button>
                </div>

                {agendaItems.map((item, idx) => {
                  const isCurrent = idx === currentSegmentIndex;
                  const isPast = idx < currentSegmentIndex;

                  return (
                    <div 
                      key={item.id}
                      className={`p-3 rounded-xl border text-xs transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-[#2e170e] to-[#25140b] border-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                          : isPast
                          ? 'bg-[#1e1009] border-[#342721] opacity-75'
                          : 'bg-[#1b0e08] border-[#342721]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-[#a78b7d]">{item.order}</span>
                        {isPast ? (
                          <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-semibold">
                            <CheckCircle2 className="w-3 h-3" /> Completed
                          </span>
                        ) : isCurrent ? (
                          <span className="px-2 py-0.5 rounded-full bg-[#f97316] text-black text-[9px] font-extrabold uppercase">
                            ON STAGE
                          </span>
                        ) : (
                          <span className="text-[#a78b7d] text-[10px]">
                            {item.durationMin}:00 Allocated
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-white mb-0.5">{item.title}</div>
                      <div className="text-[11px] text-[#fed7aa]/80 leading-tight">
                        {item.description}
                      </div>

                      {isCurrent && (
                        <div className="mt-3 pt-2 border-t border-[#f97316]/30 flex items-center justify-between">
                          <span className="text-[10px] text-[#f97316] font-semibold">
                            Presenter: {item.presenter}
                          </span>
                          <button
                            onClick={handleNextSegment}
                            className="px-2.5 py-1 rounded-lg bg-[#f97316] text-black font-bold text-[10px] flex items-center gap-1 hover:brightness-110"
                          >
                            <span>Next Segment</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-2">
                  <button
                    onClick={() => {
                      onDispatchDecision(
                        'Sprint 42 Deliverables Ratified',
                        'Decisions on CRDT sync and LiveKit SFU thresholds recorded into Decision Vault.'
                      );
                      triggerReaction('🎉');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#291d17] hover:bg-[#342721] text-[#fed7aa] border border-[#f97316]/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Dispatch Decision Record to Vault</span>
                  </button>
                </div>
              </div>
            )}

            {/* PANEL CONTENT 2: LIVE IN-MEETING CHAT */}
            {activeSidePanel === 'chat' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="text-xs p-2.5 rounded-xl bg-[#22130b] border border-[#342721]">
                      <div className="flex items-center justify-between text-[10px] text-[#a78b7d] mb-1">
                        <span className="font-bold text-[#fed7aa]">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <div className="text-[#f5ded5] leading-relaxed">{msg.text}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="p-3 bg-[#1e1009] border-t border-[#342721] flex gap-2">
                  <input
                    type="text"
                    value={inputChat}
                    onChange={e => setInputChat(e.target.value)}
                    placeholder="Type a message to participants..."
                    className="flex-1 bg-[#120804] border border-[#40322c] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f97316]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#f97316] text-black font-bold hover:brightness-110 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* PANEL CONTENT 3: LIVE POLLS */}
            {activeSidePanel === 'poll' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="p-4 rounded-2xl bg-[#24140b] border border-[#f97316]/40">
                  <div className="flex items-center justify-between text-[11px] text-[#f97316] font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      ACTIVE MEETING POLL
                    </span>
                    <span>{poll.totalVotes} Votes</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-4 leading-snug">
                    {poll.question}
                  </h4>

                  <div className="space-y-2.5">
                    {poll.options.map(opt => {
                      const percentage = poll.totalVotes > 0 
                        ? Math.round((opt.votes / poll.totalVotes) * 100) 
                        : 0;
                      const isSelected = poll.userVotedId === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleVote(opt.id)}
                          disabled={!!poll.userVotedId}
                          className={`w-full text-left p-3 rounded-xl border relative overflow-hidden transition-all ${
                            isSelected
                              ? 'border-[#f97316] bg-[#341d13]'
                              : 'border-[#40322c] bg-[#1a0e08] hover:border-[#f97316]/40'
                          }`}
                        >
                          {/* Progress fill bar */}
                          <div 
                            className="absolute top-0 bottom-0 left-0 bg-[#f97316]/20 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />

                          <div className="relative z-10 flex items-center justify-between text-xs">
                            <span className="font-medium text-white">{opt.label}</span>
                            <span className="font-mono font-bold text-[#fbbf24] ml-2">
                              {percentage}% ({opt.votes})
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {poll.userVotedId && (
                    <div className="mt-3 text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Your vote recorded into Session Consensus Ledger</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FLOATING ACTION TOOLBAR (Mobile Responsive Pill) */}
      <div className="bg-[#180d07] border-t border-[#342721] p-3 px-4 flex items-center justify-between gap-2 sm:gap-4 z-40">
        {/* Left: Audio/Video Core Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMicMuted(!isMicMuted)}
            className={`p-3 rounded-full text-white transition-all shadow-md ${
              isMicMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-[#2e1910] hover:bg-[#3d2216] border border-[#f97316]/40'
            }`}
            title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            className={`p-3 rounded-full text-white transition-all shadow-md ${
              isVideoMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-[#2e1910] hover:bg-[#3d2216] border border-[#f97316]/40'
            }`}
            title={isVideoMuted ? "Turn Video On" : "Turn Video Off"}
          >
            {isVideoMuted ? <VideoOff className="w-4 h-4" /> : <VideoIcon className="w-4 h-4 text-[#f97316]" />}
          </button>

          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-3 rounded-full text-white transition-all hidden sm:block ${
              isScreenSharing 
                ? 'bg-[#f97316] text-black font-bold' 
                : 'bg-[#2e1910] hover:bg-[#3d2216] border border-[#40322c]'
            }`}
            title="Toggle Screen Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Quick Emoji Reactions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {['👏', '🔥', '🚀', '❤️', '💡'].map(emoji => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              className="p-1.5 sm:p-2 rounded-full hover:bg-[#2e1910] text-sm sm:text-base transition-transform active:scale-125"
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Right: Drawer toggles & Leave Call */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSidePanel(activeSidePanel === 'chat' ? 'none' : 'chat')}
            className={`p-2.5 sm:p-3 rounded-full transition-colors ${
              activeSidePanel === 'chat' ? 'bg-[#f97316] text-black' : 'bg-[#291d17] text-[#fed7aa] hover:bg-[#342721]'
            }`}
            title="Toggle Chat"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveSidePanel(activeSidePanel === 'agenda' ? 'none' : 'agenda')}
            className={`p-2.5 sm:p-3 rounded-full transition-colors ${
              activeSidePanel === 'agenda' ? 'bg-[#f97316] text-black' : 'bg-[#291d17] text-[#fed7aa] hover:bg-[#342721]'
            }`}
            title="Toggle Run of Show"
          >
            <Clock className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigateTab('overview')}
            className="px-3 sm:px-4 py-2.5 rounded-full bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-lg"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Leave</span>
          </button>
        </div>
      </div>
    </div>
  );
};
