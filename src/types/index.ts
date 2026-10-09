export type AppTab = 'overview' | 'meeting' | 'whiteboard' | 'board' | 'memory';

export interface AgendaItem {
  id: string;
  order: string;
  title: string;
  durationMin: number;
  remainingSec: number;
  status: 'completed' | 'on_stage' | 'ready' | 'pending';
  presenter: string;
  allocatedMin: number;
  description: string;
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isHost?: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  audioLevel: number; // 0 to 100
  initials: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  time: string;
  text: string;
  isSystem?: boolean;
}

export interface MeetingPoll {
  id: string;
  question: string;
  options: { id: string; label: string; votes: number }[];
  totalVotes: number;
  userVotedId?: string;
}

export interface WhiteboardElement {
  id: string;
  type: 'stroke' | 'sticky' | 'shape' | 'text';
  points?: { x: number; y: number }[];
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  fill?: string;
  strokeWidth?: number;
  text?: string;
  shapeType?: 'rect' | 'circle' | 'diamond' | 'arrow';
  author?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in_progress' | 'in_review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  points: number;
  assignee: {
    name: string;
    avatar: string;
    initials: string;
  };
  tags: string[];
  dueDate: string;
  subtasks: { total: number; completed: number };
}

export interface DecisionRecord {
  id: string;
  timestamp: string;
  title: string;
  summary: string;
  author: string;
  signers: string[];
  status: 'approved' | 'synced' | 'pending';
  auditHash: string;
  tags: string[];
}
