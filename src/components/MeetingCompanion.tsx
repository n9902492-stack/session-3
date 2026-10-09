import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Share2, 
  Bot, 
  Search, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { DecisionRecord, AppTab } from '../types';

interface MeetingCompanionProps {
  decisions: DecisionRecord[];
  onNavigateTab: (tab: AppTab) => void;
}

export const MeetingCompanion: React.FC<MeetingCompanionProps> = ({
  decisions,
  onNavigateTab
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [slackDispatched, setSlackDispatched] = useState(false);
  const [jiraDispatched, setJiraDispatched] = useState(false);

  const handleCopyHash = (id: string, hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDispatchSlack = () => {
    setSlackDispatched(true);
    setTimeout(() => setSlackDispatched(false), 3000);
  };

  const handleDispatchJira = () => {
    setJiraDispatched(true);
    setTimeout(() => setJiraDispatched(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#120804] text-[#f5ded5] p-4 sm:p-6 lg:p-8 flex flex-col max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-[#1b0f09] border border-[#3d2a20] p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-[#f97316]/20 text-[#f97316] text-[10px] font-bold tracking-wider uppercase border border-[#f97316]/30">
                MEETING MEMORY & AUDIT VAULT
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                POSTGRESQL RLS ENFORCED
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Keep the Decisions. Searchable & Verifiable.
            </h1>
            <p className="mt-2 text-sm text-[#e0c0b1] max-w-2xl leading-relaxed">
              Every agreed architectural milestone is cryptographically signed, tagged with participant consensus, and auto-dispatched to enterprise tools.
            </p>
          </div>

          {/* Quick Dispatch Integration Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDispatchSlack}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                slackDispatched 
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300' 
                  : 'bg-[#251913] hover:bg-[#342721] border-[#40322c] text-[#fed7aa]'
              }`}
            >
              {slackDispatched ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[#f97316]" />}
              <span>{slackDispatched ? 'Dispatched to Slack' : 'Dispatch to #eng-q2-review'}</span>
            </button>

            <button
              onClick={handleDispatchJira}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
                jiraDispatched 
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300' 
                  : 'bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white shadow-lg'
              }`}
            >
              {jiraDispatched ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-white" />}
              <span>{jiraDispatched ? 'Synced to Sprint 42 Jira' : 'Sync to Sprint 42 Board'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Executive Summary + Decision Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Executive Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-[#1c100a] border border-[#40322c] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#342721]">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#f97316]" />
                <h3 className="font-bold text-white text-base">Companion AI Executive Digest</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono">
                Model: Antigravity v2
              </span>
            </div>

            <div className="mt-4 space-y-4 text-xs text-[#e0c0b1] leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-[#24130a] border border-[#f97316]/30">
                <div className="font-bold text-[#fed7aa] mb-1">Key Takeaway #1</div>
                LiveKit SFU architecture benchmark achieved <strong className="text-white">64.2% ingress bit-rate reduction</strong> on mobile tiers with zero audio frame drops.
              </div>

              <div className="p-3.5 rounded-2xl bg-[#24130a] border border-[#342721]">
                <div className="font-bold text-[#fed7aa] mb-1">Key Takeaway #2</div>
                Shared Whiteboard CRDT synchronization benchmarked under <strong className="text-[#fbbf24]">17.4ms global edge latency</strong>. Resolved concurrent stroke conflict handling.
              </div>

              <div className="p-3.5 rounded-2xl bg-[#24130a] border border-[#342721]">
                <div className="font-bold text-[#fed7aa] mb-1">Key Takeaway #3</div>
                PostgreSQL RLS strict isolation audited for multi-tenant memory boundary. Unanimous approval from 4 co-owners.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#342721] flex items-center justify-between text-xs">
              <span className="text-[#a78b7d]">Auto-summary generated 4 mins ago</span>
              <button 
                onClick={() => onNavigateTab('board')}
                className="text-[#f97316] font-semibold flex items-center gap-1 hover:underline"
              >
                <span>View 14 Sprint Tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Ratified Decision Ledger Records */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#1c100a] border border-[#40322c] p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#342721]">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Ratified Decision Vault</h3>
              </div>
              <span className="text-xs text-[#fed7aa] font-mono">
                {decisions.length} Immutable Records
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {decisions.map(record => (
                <div
                  key={record.id}
                  className="p-5 rounded-2xl bg-[#25150d] border border-[#f97316]/40 hover:border-[#f97316] transition-all"
                >
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Status: {record.status.toUpperCase()}
                    </span>
                    <span className="text-[#a78b7d] font-mono">{record.timestamp}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {record.title}
                  </h4>

                  <p className="text-xs text-[#e0c0b1] mb-4 leading-relaxed">
                    {record.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#342721] text-xs">
                    <div className="text-[11px] text-[#fed7aa]">
                      <span className="text-[#a78b7d]">Signers: </span>
                      <span className="font-semibold">{record.signers.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#a78b7d] bg-[#1a0e08] px-2 py-0.5 rounded border border-[#342721]">
                        {record.auditHash}
                      </span>
                      <button
                        onClick={() => handleCopyHash(record.id, record.auditHash)}
                        className="p-1 rounded hover:bg-[#342721] text-[#fed7aa]"
                        title="Copy cryptographic audit hash"
                      >
                        {copiedId === record.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
