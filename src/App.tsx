/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/OverviewView';
import { MeetingRoom } from './components/MeetingRoom';
import { SharedWhiteboard } from './components/SharedWhiteboard';
import { ProjectManagementBoard } from './components/ProjectManagementBoard';
import { MeetingCompanion } from './components/MeetingCompanion';
import { QuickJoinModal } from './components/QuickJoinModal';
import { AppTab, AgendaItem, TaskItem, DecisionRecord } from './types';
import { 
  initialAgenda, 
  initialParticipants, 
  initialTasks, 
  initialDecisions 
} from './data/initialData';
import { 
  Globe, 
  Video, 
  PenTool, 
  Kanban, 
  Sparkles 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('overview');
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(initialAgenda);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [decisions, setDecisions] = useState<DecisionRecord[]>(initialDecisions);
  const [isQuickJoinOpen, setIsQuickJoinOpen] = useState(false);

  // Task actions
  const handleAddTask = (newTask: TaskItem) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskItem['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleToggleSubtask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextCompleted = t.subtasks.completed >= t.subtasks.total 
          ? 0 
          : t.subtasks.completed + 1;
        return {
          ...t,
          subtasks: { ...t.subtasks, completed: nextCompleted }
        };
      }
      return t;
    }));
  };

  // Dispatch ratified decision from meeting or whiteboard directly into the Decision Vault & Tasks
  const handleDispatchDecision = (title: string, summary: string) => {
    const newDecision: DecisionRecord = {
      id: `dec-${Date.now()}`,
      timestamp: 'Just now',
      title,
      summary,
      author: 'Elena Rostova & Co-Hosts',
      signers: ['Elena Rostova', 'Marcus Brody', 'Sarah Jenkins', 'David Kim', 'You'],
      status: 'synced',
      auditHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}-vault-e2e`,
      tags: ['Ratified', 'Sprint 42']
    };
    setDecisions(prev => [newDecision, ...prev]);

    // Also auto-generate an action item in tasks
    const newLinkedTask: TaskItem = {
      id: `TSK-${Math.floor(Math.random() * 800) + 420}`,
      title,
      description: summary,
      status: 'in_progress',
      priority: 'high',
      points: 5,
      assignee: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        initials: 'ER'
      },
      tags: ['Decision Vault', 'Ratified'],
      dueDate: 'Oct 19',
      subtasks: { total: 4, completed: 1 }
    };
    setTasks(prev => [newLinkedTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#120804] text-[#f5ded5] flex flex-col font-sans selection:bg-[#f97316]/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenQuickJoin={() => setIsQuickJoinOpen(true)}
        onStartInstantMeeting={() => setCurrentTab('meeting')}
      />

      {/* Main Screen Views */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentTab === 'overview' && (
          <OverviewView
            onNavigateTab={setCurrentTab}
            agendaItems={agendaItems}
            onOpenQuickJoin={() => setIsQuickJoinOpen(true)}
            onJoinMeeting={() => setCurrentTab('meeting')}
          />
        )}

        {currentTab === 'meeting' && (
          <MeetingRoom
            onNavigateTab={setCurrentTab}
            agendaItems={agendaItems}
            onUpdateAgenda={setAgendaItems}
            participants={initialParticipants}
            onDispatchDecision={handleDispatchDecision}
          />
        )}

        {currentTab === 'whiteboard' && (
          <SharedWhiteboard
            onNavigateTab={setCurrentTab}
            onDispatchDecision={handleDispatchDecision}
          />
        )}

        {currentTab === 'board' && (
          <ProjectManagementBoard
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onToggleSubtask={handleToggleSubtask}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'memory' && (
          <MeetingCompanion
            decisions={decisions}
            onNavigateTab={setCurrentTab}
          />
        )}
      </main>

      {/* Mobile Sticky Bottom Tab Bar (for effortless touch navigation on phones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#160c07]/95 backdrop-blur-lg border-t border-[#342721] px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setCurrentTab('overview')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            currentTab === 'overview' ? 'text-[#f97316]' : 'text-[#a78b7d] hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4 mb-0.5" />
          <span>Site</span>
        </button>

        <button
          onClick={() => setCurrentTab('meeting')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors relative ${
            currentTab === 'meeting' ? 'text-[#f97316]' : 'text-[#a78b7d] hover:text-white'
          }`}
        >
          <Video className="w-4 h-4 mb-0.5" />
          <span>Meeting</span>
          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </button>

        <button
          onClick={() => setCurrentTab('whiteboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            currentTab === 'whiteboard' ? 'text-[#f97316]' : 'text-[#a78b7d] hover:text-white'
          }`}
        >
          <PenTool className="w-4 h-4 mb-0.5" />
          <span>Whiteboard</span>
        </button>

        <button
          onClick={() => setCurrentTab('board')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            currentTab === 'board' ? 'text-[#f97316]' : 'text-[#a78b7d] hover:text-white'
          }`}
        >
          <Kanban className="w-4 h-4 mb-0.5" />
          <span>Tasks</span>
        </button>

        <button
          onClick={() => setCurrentTab('memory')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-medium transition-colors ${
            currentTab === 'memory' ? 'text-[#f97316]' : 'text-[#a78b7d] hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>Vault</span>
        </button>
      </div>

      {/* Quick Join Modal */}
      <QuickJoinModal
        isOpen={isQuickJoinOpen}
        onClose={() => setIsQuickJoinOpen(false)}
        onJoin={() => setCurrentTab('meeting')}
      />
    </div>
  );
}
