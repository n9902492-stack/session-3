import { AgendaItem, Participant, TaskItem, DecisionRecord, MeetingPoll, WhiteboardElement } from '../types';

export const initialAgenda: AgendaItem[] = [
  {
    id: 'ag-1',
    order: '01',
    title: 'Welcome & Context Align',
    durationMin: 5,
    remainingSec: 0,
    status: 'completed',
    presenter: 'Alex Chen',
    allocatedMin: 5,
    description: 'Alignment on Q2 roadmap milestones and quarterly objectives.'
  },
  {
    id: 'ag-2',
    order: '02',
    title: 'Walk through the prototype',
    durationMin: 20,
    remainingSec: 758, // 12m 38s
    status: 'on_stage',
    presenter: 'Elena R.',
    allocatedMin: 20,
    description: 'Interactive demonstration of the new Clean-room media SFU and shared whiteboard.'
  },
  {
    id: 'ag-3',
    order: '03',
    title: 'Live Feedback & Polls',
    durationMin: 10,
    remainingSec: 600,
    status: 'ready',
    presenter: 'Sarah Jenkins',
    allocatedMin: 10,
    description: 'Review participant suggestions, vote on bandwidth optimization thresholds.'
  },
  {
    id: 'ag-4',
    order: '04',
    title: 'Action Items & Next Steps',
    durationMin: 10,
    remainingSec: 600,
    status: 'ready',
    presenter: 'Marcus Brody',
    allocatedMin: 10,
    description: 'Finalize decision ledger approvals and dispatch 14 deliverables to Sprint 42 board.'
  }
];

export const initialParticipants: Participant[] = [
  {
    id: 'p-1',
    name: 'Elena Rostova',
    role: 'Lead Architect',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isHost: true,
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: true,
    audioLevel: 72,
    initials: 'ER',
    color: '#f97316'
  },
  {
    id: 'p-2',
    name: 'Marcus Brody',
    role: 'Media Plane Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
    audioLevel: 25,
    initials: 'MB',
    color: '#fbbf24'
  },
  {
    id: 'p-3',
    name: 'Sarah Jenkins',
    role: 'Product Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    isMuted: true,
    isVideoOff: false,
    isScreenSharing: false,
    audioLevel: 0,
    initials: 'SJ',
    color: '#ec4899'
  },
  {
    id: 'p-4',
    name: 'David Kim',
    role: 'Security & Audit Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isMuted: true,
    isVideoOff: false,
    isScreenSharing: false,
    audioLevel: 0,
    initials: 'DK',
    color: '#3b82f6'
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'TSK-401',
    title: 'Adaptive WebRTC bit-rate switching algorithm on low-bandwidth tiers',
    description: 'Ensure 64% bandwidth reduction with zero perceptible stutter on mobile connections.',
    status: 'in_progress',
    priority: 'urgent',
    points: 8,
    assignee: {
      name: 'Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      initials: 'MB'
    },
    tags: ['Media Plane', 'SFU', 'LiveKit'],
    dueDate: 'Oct 14',
    subtasks: { total: 4, completed: 3 }
  },
  {
    id: 'TSK-402',
    title: 'CRDT synchronizer for shared whiteboard real-time strokes',
    description: 'Resolve concurrent stroke interleaving and implement offline buffer replay under 20ms.',
    status: 'in_progress',
    priority: 'high',
    points: 5,
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      initials: 'ER'
    },
    tags: ['Realtime Fabric', 'CRDT', 'Canvas'],
    dueDate: 'Oct 16',
    subtasks: { total: 6, completed: 4 }
  },
  {
    id: 'TSK-403',
    title: 'PostgreSQL RLS strict tenant isolation policy review',
    description: 'Verify row-level security tokens prevent any cross-tenant memory leakage in audit tables.',
    status: 'in_review',
    priority: 'urgent',
    points: 5,
    assignee: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      initials: 'DK'
    },
    tags: ['Control Plane', 'Security', 'RLS'],
    dueDate: 'Oct 12',
    subtasks: { total: 5, completed: 5 }
  },
  {
    id: 'TSK-404',
    title: 'Automated meeting decision dispatch webhook to Jira & Slack',
    description: 'When all 4 co-owners approve in Decision Vault, dispatch task cards with cryptographic hash.',
    status: 'completed',
    priority: 'high',
    points: 3,
    assignee: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      initials: 'SJ'
    },
    tags: ['Companion AI', 'Integrations'],
    dueDate: 'Oct 10',
    subtasks: { total: 3, completed: 3 }
  },
  {
    id: 'TSK-405',
    title: 'Ultrasonic smart room pairing for DTEN & Neat touch boards',
    description: 'Proximity detection beacon for instant 1-click room takeover without codes.',
    status: 'backlog',
    priority: 'medium',
    points: 5,
    assignee: {
      name: 'Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      initials: 'MB'
    },
    tags: ['Hybrid Rooms', 'Hardware'],
    dueDate: 'Oct 22',
    subtasks: { total: 3, completed: 0 }
  },
  {
    id: 'TSK-406',
    title: 'AI Companion real-time multilingual caption transcription pipeline',
    description: 'Streamed diarization with speaker token binding and confidence score > 98.4%.',
    status: 'in_progress',
    priority: 'high',
    points: 8,
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      initials: 'ER'
    },
    tags: ['Companion AI', 'Audio ML'],
    dueDate: 'Oct 18',
    subtasks: { total: 5, completed: 2 }
  },
  {
    id: 'TSK-407',
    title: 'SOC 2 Type II continuous telemetry audit log exporter',
    description: 'Automate weekly encrypted evidence snapshots directly into customer compliance buckets.',
    status: 'completed',
    priority: 'medium',
    points: 3,
    assignee: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      initials: 'DK'
    },
    tags: ['Compliance', 'Audit Vault'],
    dueDate: 'Oct 08',
    subtasks: { total: 2, completed: 2 }
  },
  {
    id: 'TSK-408',
    title: 'Mobile-responsive Stage Controller gesture controls & haptic feedback',
    description: 'Allow hosts on mobile devices to advance segments and trigger polls with single thumb swipe.',
    status: 'in_review',
    priority: 'medium',
    points: 3,
    assignee: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      initials: 'SJ'
    },
    tags: ['Mobile UI', 'Stage Controller'],
    dueDate: 'Oct 15',
    subtasks: { total: 4, completed: 3 }
  }
];

export const initialDecisions: DecisionRecord[] = [
  {
    id: 'dec-1',
    timestamp: '10:14 AM PDT',
    title: 'Approved LiveKit SFU as sole media plane engine for enterprise tier',
    summary: 'Decision ratified unanimously after benchmark showed 64% reduction in ingress bit-rate under high packet loss.',
    author: 'Elena Rostova',
    signers: ['Elena Rostova', 'Marcus Brody', 'Sarah Jenkins', 'David Kim'],
    status: 'synced',
    auditHash: '0x8f2a...c93b-vault-e2e',
    tags: ['Architecture', 'Media Plane']
  },
  {
    id: 'dec-2',
    timestamp: '10:28 AM PDT',
    title: 'Enforced zero-silent-recording policy with explicit participant opt-in',
    summary: 'Any audio recording requires explicit consent badge verification before transcript stream can initialize.',
    author: 'David Kim',
    signers: ['David Kim', 'Elena Rostova'],
    status: 'approved',
    auditHash: '0x3e17...41aa-vault-e2e',
    tags: ['Principles', 'Compliance']
  }
];

export const initialPoll: MeetingPoll = {
  id: 'poll-1',
  question: 'Should we prioritize the Autonomous SFU bit-rate switching for Mobile tier in Sprint 42?',
  options: [
    { id: 'opt-1', label: 'Yes, urgent priority for field teams', votes: 12 },
    { id: 'opt-2', label: 'Balance equally with Whiteboard CRDT', votes: 5 },
    { id: 'opt-3', label: 'Defer to Sprint 43', votes: 1 }
  ],
  totalVotes: 18,
  userVotedId: 'opt-1'
};

export const initialWhiteboardElements: WhiteboardElement[] = [
  {
    id: 'wb-sticky-1',
    type: 'sticky',
    x: 80,
    y: 70,
    width: 170,
    height: 140,
    color: '#fbbf24',
    fill: '#2a1a08',
    text: 'Control Plane\n• PostgreSQL RLS\n• OIDC/SAML Auth\n• Tenant Isolation',
    author: 'Elena R.'
  },
  {
    id: 'wb-sticky-2',
    type: 'sticky',
    x: 290,
    y: 70,
    width: 170,
    height: 140,
    color: '#f97316',
    fill: '#2e1306',
    text: 'Realtime Fabric\n• WebSocket Mesh\n• <20ms Latency\n• CRDT State Sync',
    author: 'Marcus B.'
  },
  {
    id: 'wb-sticky-3',
    type: 'sticky',
    x: 500,
    y: 70,
    width: 170,
    height: 140,
    color: '#38bdf8',
    fill: '#082032',
    text: 'Media Plane SFU\n• LiveKit Core\n• Adaptive WebRTC\n• 64% Bandwidth Drop',
    author: 'Elena R.'
  },
  {
    id: 'wb-shape-1',
    type: 'shape',
    shapeType: 'diamond',
    x: 290,
    y: 260,
    width: 170,
    height: 100,
    color: '#f5ded5',
    text: 'Decision Vault\n(Audit Hash Valid)',
    author: 'David K.'
  }
];
