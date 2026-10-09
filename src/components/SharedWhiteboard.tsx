import React, { useState, useRef, useEffect } from 'react';
import { 
  PenTool, 
  Square, 
  Circle, 
  FileText, 
  Eraser, 
  RotateCcw, 
  Download, 
  Trash2, 
  Plus, 
  Move, 
  Check, 
  Sparkles, 
  Layers, 
  Users, 
  Maximize2,
  MousePointer2,
  ArrowRight,
  Kanban
} from 'lucide-react';
import { WhiteboardElement, AppTab } from '../types';
import { initialWhiteboardElements } from '../data/initialData';

interface SharedWhiteboardProps {
  onNavigateTab: (tab: AppTab) => void;
  onDispatchDecision: (title: string, summary: string) => void;
}

export const SharedWhiteboard: React.FC<SharedWhiteboardProps> = ({
  onNavigateTab,
  onDispatchDecision
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active tool: 'pen' | 'sticky' | 'shape' | 'eraser' | 'select'
  const [activeTool, setActiveTool] = useState<'pen' | 'sticky' | 'shape' | 'eraser' | 'select'>('pen');
  const [selectedColor, setSelectedColor] = useState('#f97316');
  const [brushSize, setBrushSize] = useState(3);
  const [shapeType, setShapeType] = useState<'rect' | 'circle' | 'diamond'>('rect');

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [strokes, setStrokes] = useState<{ points: { x: number; y: number }[]; color: string; width: number }[]>([]);
  
  // Interactive Sticky Notes
  const [stickyNotes, setStickyNotes] = useState<WhiteboardElement[]>(initialWhiteboardElements);
  const [activeStickyId, setActiveStickyId] = useState<string | null>(null);
  const [isDraggingSticky, setIsDraggingSticky] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Simulated peer collaborator cursors
  const [peerCursors, setPeerCursors] = useState<{ id: string; name: string; color: string; x: number; y: number }[]>([
    { id: 'p-1', name: 'Elena R.', color: '#f97316', x: 380, y: 220 },
    { id: 'p-2', name: 'Marcus B.', color: '#fbbf24', x: 620, y: 160 }
  ]);

  // Peer cursors gentle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPeerCursors(prev => prev.map(cursor => ({
        ...cursor,
        x: Math.max(100, Math.min(750, cursor.x + (Math.random() * 40 - 20))),
        y: Math.max(80, Math.min(480, cursor.y + (Math.random() * 40 - 20)))
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Canvas redraw effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid dots
    ctx.fillStyle = 'rgba(255, 182, 144, 0.08)';
    const dotSpacing = 28;
    for (let x = 14; x < canvas.width; x += dotSpacing) {
      for (let y = 14; y < canvas.height; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Render all saved strokes
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    });

    // Render currently active stroke
    if (currentStroke.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
      }
      ctx.stroke();
    }
  }, [strokes, currentStroke, selectedColor, brushSize]);

  // Handle Canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = Math.max(560, window.innerHeight - 240);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse & Touch coordinate helper
  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top
      };
    }
    return { x: 0, y: 0 };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoords(e);

    if (activeTool === 'pen') {
      setIsDrawing(true);
      setCurrentStroke([{ x, y }]);
    } else if (activeTool === 'eraser') {
      // Erase strokes nearby
      setStrokes(prev => prev.filter(s => 
        !s.points.some(p => Math.hypot(p.x - x, p.y - y) < 20)
      ));
    } else if (activeTool === 'sticky') {
      // Add sticky note at point
      const newSticky: WhiteboardElement = {
        id: 'sticky-' + Date.now(),
        type: 'sticky',
        x: Math.max(20, x - 75),
        y: Math.max(20, y - 60),
        width: 170,
        height: 130,
        color: selectedColor,
        fill: '#24140b',
        text: 'New session note\n• Click to edit text\n• Drag to reposition',
        author: 'You'
      };
      setStickyNotes(prev => [...prev, newSticky]);
      setActiveTool('select');
    } else if (activeTool === 'shape') {
      const newShape: WhiteboardElement = {
        id: 'shape-' + Date.now(),
        type: 'shape',
        shapeType: shapeType,
        x: Math.max(20, x - 80),
        y: Math.max(20, y - 45),
        width: 160,
        height: 90,
        color: selectedColor,
        text: `${shapeType.toUpperCase()}\nArchitecture Block`,
        author: 'You'
      };
      setStickyNotes(prev => [...prev, newShape]);
      setActiveTool('select');
    }
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoords(e);
    setCurrentStroke(prev => [...prev, { x, y }]);
  };

  const handlePointerUp = () => {
    if (isDrawing && currentStroke.length > 1) {
      setStrokes(prev => [...prev, { points: currentStroke, color: selectedColor, width: brushSize }]);
    }
    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const handleClear = () => {
    if (confirm('Clear all drawings and annotations from whiteboard?')) {
      setStrokes([]);
      setStickyNotes([]);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `MeetSpace-Whiteboard-${Date.now()}.png`;
    link.click();
  };

  const updateStickyText = (id: string, newText: string) => {
    setStickyNotes(prev => prev.map(item => item.id === id ? { ...item, text: newText } : item));
  };

  const deleteSticky = (id: string) => {
    setStickyNotes(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#120804] text-[#f5ded5] flex flex-col relative select-none">
      {/* Whiteboard Header */}
      <div className="bg-[#180d07] border-b border-[#342721] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#fbbf24]/20 text-[#fbbf24] flex items-center justify-center font-bold">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Shared Architecture Canvas</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-mono">
                CRDT SYNC ACTIVE
              </span>
            </div>
            <div className="text-[11px] text-[#a78b7d]">
              Collaborating in real time with Elena R. and Marcus B. (&lt;18ms latency)
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('meeting')}
            className="px-3 py-1.5 rounded-lg bg-[#291d17] hover:bg-[#342721] text-xs font-medium text-[#fed7aa] border border-[#40322c] transition-colors"
          >
            Back to Video Call
          </button>
          <button
            onClick={() => {
              onDispatchDecision(
                'Whiteboard Architecture Ratified',
                'Diagram including Control Plane RLS, Realtime CRDT Fabric, and Media SFU committed to vault.'
              );
              alert('Whiteboard diagram saved into Decision Vault & dispatched to Sprint 42 tasks!');
            }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white text-xs font-bold shadow-md hover:brightness-110 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commit to Decision Vault</span>
          </button>
        </div>
      </div>

      {/* Floating Toolbar (Mobile-friendly responsive bar) */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-[#1c100a]/95 backdrop-blur-md border border-[#40322c] rounded-2xl p-1.5 sm:p-2 shadow-2xl flex items-center gap-1 sm:gap-2">
        {/* Tool: Select */}
        <button
          onClick={() => setActiveTool('select')}
          className={`p-2 rounded-xl transition-all ${
            activeTool === 'select' ? 'bg-[#f97316] text-black font-bold' : 'text-[#fed7aa] hover:bg-[#291d17]'
          }`}
          title="Select / Move"
        >
          <MousePointer2 className="w-4 h-4" />
        </button>

        {/* Tool: Pen */}
        <button
          onClick={() => setActiveTool('pen')}
          className={`p-2 rounded-xl transition-all ${
            activeTool === 'pen' ? 'bg-[#f97316] text-black font-bold' : 'text-[#fed7aa] hover:bg-[#291d17]'
          }`}
          title="Freehand Draw"
        >
          <PenTool className="w-4 h-4" />
        </button>

        {/* Tool: Sticky */}
        <button
          onClick={() => setActiveTool('sticky')}
          className={`p-2 rounded-xl transition-all ${
            activeTool === 'sticky' ? 'bg-[#f97316] text-black font-bold' : 'text-[#fed7aa] hover:bg-[#291d17]'
          }`}
          title="Add Sticky Note"
        >
          <FileText className="w-4 h-4" />
        </button>

        {/* Tool: Shape */}
        <div className="relative group">
          <button
            onClick={() => setActiveTool('shape')}
            className={`p-2 rounded-xl transition-all ${
              activeTool === 'shape' ? 'bg-[#f97316] text-black font-bold' : 'text-[#fed7aa] hover:bg-[#291d17]'
            }`}
            title="Add Shape"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>

        {/* Tool: Eraser */}
        <button
          onClick={() => setActiveTool('eraser')}
          className={`p-2 rounded-xl transition-all ${
            activeTool === 'eraser' ? 'bg-[#f97316] text-black font-bold' : 'text-[#fed7aa] hover:bg-[#291d17]'
          }`}
          title="Eraser"
        >
          <Eraser className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-6 bg-[#342721] mx-1" />

        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {['#f97316', '#fbbf24', '#38bdf8', '#ffffff', '#a855f7'].map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={`w-5 h-5 rounded-full transition-transform ${
                selectedColor === color ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
              }`}
            />
          ))}
        </div>

        <div className="w-[1px] h-6 bg-[#342721] mx-1" />

        {/* Clear & Download */}
        <button
          onClick={() => setStrokes(prev => prev.slice(0, -1))}
          className="p-2 text-[#a78b7d] hover:text-white hover:bg-[#291d17] rounded-xl"
          title="Undo"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={handleClear}
          className="p-2 text-[#a78b7d] hover:text-red-400 hover:bg-[#291d17] rounded-xl"
          title="Clear canvas"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleDownload}
          className="p-2 text-[#a78b7d] hover:text-[#fbbf24] hover:bg-[#291d17] rounded-xl"
          title="Export as PNG"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Main Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden bg-[#120804] touch-none"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="w-full h-full block cursor-crosshair"
        />

        {/* Simulated Peer Collaborator Cursors */}
        {peerCursors.map(cursor => (
          <div
            key={cursor.id}
            style={{ 
              transform: `translate(${cursor.x}px, ${cursor.y}px)`,
              transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            className="absolute top-0 left-0 pointer-events-none z-20 flex items-start gap-1"
          >
            <MousePointer2 
              className="w-4 h-4" 
              style={{ color: cursor.color, fill: cursor.color }} 
            />
            <span 
              style={{ backgroundColor: cursor.color }}
              className="px-1.5 py-0.5 rounded text-[10px] font-bold text-black shadow-md tracking-wider"
            >
              {cursor.name}
            </span>
          </div>
        ))}

        {/* Render Interactive Sticky Notes & Architecture Blocks */}
        {stickyNotes.map(item => (
          <div
            key={item.id}
            style={{
              top: `${item.y}px`,
              left: `${item.x}px`,
              width: `${item.width || 170}px`,
              minHeight: `${item.height || 120}px`
            }}
            className="absolute z-10 p-3 rounded-2xl bg-[#24130a]/90 backdrop-blur-md border-2 border-[#f97316]/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between group hover:border-[#f97316]"
          >
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#3d2417] text-[10px] text-[#fed7aa]">
              <span className="font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.author || 'Author'}
              </span>
              <button 
                onClick={() => deleteSticky(item.id)}
                className="opacity-0 group-hover:opacity-100 text-[#a78b7d] hover:text-red-400 transition-opacity"
              >
                ✕
              </button>
            </div>

            <textarea
              value={item.text}
              onChange={e => updateStickyText(item.id, e.target.value)}
              className="w-full flex-1 bg-transparent text-xs text-[#f5ded5] font-sans resize-none focus:outline-none"
              rows={4}
            />

            <div className="flex items-center justify-between pt-1 mt-1 border-t border-[#3d2417] text-[9px] text-[#a78b7d]">
              <span>CRDT Synced</span>
              <span className="cursor-move text-[#f97316]">✥ Drag</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
