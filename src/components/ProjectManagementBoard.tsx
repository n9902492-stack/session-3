import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Filter, 
  Search, 
  User, 
  Tag, 
  ChevronRight, 
  MoreHorizontal,
  Flame,
  CheckSquare
} from 'lucide-react';
import { TaskItem, AppTab } from '../types';

interface ProjectManagementBoardProps {
  tasks: TaskItem[];
  onAddTask: (task: TaskItem) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskItem['status']) => void;
  onToggleSubtask: (taskId: string) => void;
  onNavigateTab: (tab: AppTab) => void;
}

export const ProjectManagementBoard: React.FC<ProjectManagementBoardProps> = ({
  tasks,
  onAddTask,
  onUpdateTaskStatus,
  onToggleSubtask,
  onNavigateTab
}) => {
  // Mobile active column filter
  const [mobileActiveColumn, setMobileActiveColumn] = useState<TaskItem['status']>('in_progress');
  
  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  // New task modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<TaskItem['priority']>('high');
  const [newPoints, setNewPoints] = useState(5);
  const [newAssignee, setNewAssignee] = useState('Elena Rostova');
  const [newTag, setNewTag] = useState('Realtime Fabric');

  // Columns definition
  const columns: { id: TaskItem['status']; label: string; color: string; bg: string }[] = [
    { id: 'backlog', label: 'Backlog', color: '#a78b7d', bg: 'bg-[#1b100a]' },
    { id: 'in_progress', label: 'In Progress', color: '#f97316', bg: 'bg-[#22120a]' },
    { id: 'in_review', label: 'In Review', color: '#38bdf8', bg: 'bg-[#121c24]' },
    { id: 'completed', label: 'Completed', color: '#34d399', bg: 'bg-[#0f1d16]' }
  ];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignee.name === assigneeFilter;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `TSK-${Math.floor(Math.random() * 900) + 410}`,
      title: newTitle.trim(),
      description: newDescription.trim() || 'Deliverable committed from live meeting consensus.',
      status: 'in_progress',
      priority: newPriority,
      points: Number(newPoints),
      assignee: {
        name: newAssignee,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        initials: newAssignee.split(' ').map(n => n[0]).join('')
      },
      tags: [newTag],
      dueDate: 'Oct 20',
      subtasks: { total: 3, completed: 0 }
    };

    onAddTask(newTask);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  // Metrics
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const completedPoints = tasks.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.points, 0);
  const completionPercentage = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#120804] text-[#f5ded5] p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Sprint Header & Velocity Stats */}
      <div className="mb-6 rounded-3xl bg-[#1b0f09] border border-[#3d2a20] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f97316]/20 text-[#f97316] text-[10px] font-bold tracking-wider uppercase border border-[#f97316]/30">
                ACTIVE SPRINT 42
              </span>
              <span className="text-xs text-[#a78b7d]">
                Ends in 6 days • Q2 Review Roadmap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Realtime Collaboration & Media SFU Architecture
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#e0c0b1] max-w-2xl">
              14 key deliverables tracked directly from meeting consensus and Decision Vault.
            </p>
          </div>

          {/* Sprint Velocity Progress */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="min-w-[180px]">
              <div className="flex justify-between items-baseline mb-1 text-xs">
                <span className="text-[#a78b7d]">Sprint Completion</span>
                <span className="text-[#fbbf24] font-mono font-bold text-sm">
                  {completedPoints}/{totalPoints} Pts ({completionPercentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#291d17] overflow-hidden border border-[#40322c]">
                <div 
                  className="h-full bg-gradient-to-r from-[#f97316] to-[#fbbf24] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Deliverable</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 pt-4 border-t border-[#342721] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[260px]">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#a78b7d]" />
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tasks, tags, or keys..."
                className="w-full bg-[#251913] border border-[#40322c] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#a78b7d] focus:outline-none focus:border-[#f97316]"
              />
            </div>

            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="bg-[#251913] border border-[#40322c] rounded-xl px-3 py-1.5 text-xs text-[#fed7aa] focus:outline-none cursor-pointer"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>

            <select
              value={assigneeFilter}
              onChange={e => setAssigneeFilter(e.target.value)}
              className="bg-[#251913] border border-[#40322c] rounded-xl px-3 py-1.5 text-xs text-[#fed7aa] focus:outline-none cursor-pointer"
            >
              <option value="all">All Owners</option>
              <option value="Elena Rostova">Elena Rostova</option>
              <option value="Marcus Brody">Marcus Brody</option>
              <option value="Sarah Jenkins">Sarah Jenkins</option>
              <option value="David Kim">David Kim</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('meeting')}
              className="px-3 py-1.5 rounded-xl bg-[#251913] hover:bg-[#342721] text-[#fed7aa] border border-[#40322c] transition-colors"
            >
              Sync with Live Call
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Column Tabs Switcher */}
      <div className="md:hidden flex rounded-2xl bg-[#1b0f09] border border-[#342721] p-1 mb-4 overflow-x-auto text-xs">
        {columns.map(col => {
          const count = filteredTasks.filter(t => t.status === col.id).length;
          const isActive = mobileActiveColumn === col.id;
          return (
            <button
              key={col.id}
              onClick={() => setMobileActiveColumn(col.id)}
              className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl text-center font-semibold transition-all flex items-center justify-center gap-1.5 ${
                isActive ? 'bg-[#f97316] text-black shadow-md' : 'text-[#fed7aa]'
              }`}
            >
              <span>{col.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-black/20 text-black' : 'bg-[#291d17] text-[#a78b7d]'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanban Board Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map(column => {
          const colTasks = filteredTasks.filter(t => t.status === column.id);
          const isMobileHidden = mobileActiveColumn !== column.id;

          return (
            <div 
              key={column.id}
              className={`rounded-3xl border border-[#3d2a20] p-4 flex flex-col min-h-[480px] ${column.bg} ${
                isMobileHidden ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#342721]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: column.color }} />
                  <span className="font-bold text-sm text-white">{column.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#251913] text-[#fed7aa] text-xs font-mono font-bold border border-[#40322c]">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl bg-[#251913]/90 hover:bg-[#2b1c15] border border-[#40322c] hover:border-[#f97316]/60 transition-all shadow-md group relative"
                  >
                    {/* Top Row: ID & Priority */}
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className="font-mono font-bold text-[#a78b7d]">{task.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        task.priority === 'urgent'
                          ? 'bg-red-950 text-red-400 border border-red-800/40'
                          : task.priority === 'high'
                          ? 'bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/30'
                          : 'bg-[#291d17] text-[#a78b7d]'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {task.title}
                    </h4>

                    {/* Description preview */}
                    <p className="text-xs text-[#e0c0b1] mb-3 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {task.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-[#190e09] text-[#fed7aa] border border-[#342721]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Subtask checklist progress */}
                    <div className="mb-3 pt-2 border-t border-[#342721] flex items-center justify-between text-[11px] text-[#a78b7d]">
                      <button 
                        onClick={() => onToggleSubtask(task.id)}
                        className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Click to toggle a completed subtask"
                      >
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{task.subtasks.completed}/{task.subtasks.total} Subtasks</span>
                      </button>
                      <span className="font-mono text-[#fbbf24] font-semibold">{task.points} pts</span>
                    </div>

                    {/* Bottom: Assignee & Column Move Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#342721]/60">
                      <div className="flex items-center gap-2">
                        <img 
                          src={task.assignee.avatar} 
                          alt={task.assignee.name} 
                          className="w-5 h-5 rounded-full object-cover border border-[#f97316]/40"
                        />
                        <span className="text-[11px] text-white font-medium truncate max-w-[100px]">
                          {task.assignee.name}
                        </span>
                      </div>

                      {/* Move status buttons */}
                      <div className="flex items-center gap-1">
                        {column.id !== 'backlog' && (
                          <button
                            onClick={() => {
                              const prevStatus = column.id === 'completed' ? 'in_review' : column.id === 'in_review' ? 'in_progress' : 'backlog';
                              onUpdateTaskStatus(task.id, prevStatus);
                            }}
                            className="p-1 rounded bg-[#1c110b] hover:bg-[#342721] text-[#a78b7d] hover:text-white"
                            title="Move Back"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {column.id !== 'completed' && (
                          <button
                            onClick={() => {
                              const nextStatus = column.id === 'backlog' ? 'in_progress' : column.id === 'in_progress' ? 'in_review' : 'completed';
                              onUpdateTaskStatus(task.id, nextStatus);
                            }}
                            className="p-1 rounded bg-[#1c110b] hover:bg-[#342721] text-[#f97316] hover:text-[#fbbf24]"
                            title="Advance Status"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-[#342721] rounded-2xl flex items-center justify-center text-xs text-[#a78b7d]">
                    No deliverables in this phase
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE DELIVERABLE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#1c100a] border border-[#f97316]/40 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#342721]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f97316]" />
                <span>New Sprint 42 Deliverable</span>
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#a78b7d] hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[#a78b7d] mb-1 font-semibold">Deliverable Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement WebRTC dynamic jitter buffer"
                  className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-[#a78b7d] mb-1 font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Details ratified during meeting walkthrough..."
                  className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#f97316] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a78b7d] mb-1 font-semibold">Priority</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a78b7d] mb-1 font-semibold">Story Points</label>
                  <input
                    type="number"
                    min="1"
                    max="21"
                    value={newPoints}
                    onChange={e => setNewPoints(Number(e.target.value))}
                    className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#a78b7d] mb-1 font-semibold">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={e => setNewAssignee(e.target.value)}
                    className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Elena Rostova">Elena Rostova</option>
                    <option value="Marcus Brody">Marcus Brody</option>
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="David Kim">David Kim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a78b7d] mb-1 font-semibold">Architecture Tag</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    className="w-full bg-[#251913] border border-[#40322c] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#342721]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#251913] text-[#fed7aa] hover:bg-[#342721]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-bold hover:brightness-110 shadow-md"
                >
                  Commit Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
