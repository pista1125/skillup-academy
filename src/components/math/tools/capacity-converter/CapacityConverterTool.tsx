import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
  Plus,
  Beaker,
  Droplets,
  FlaskConical,
  TestTube,
  PackagePlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CapacityConverterToolProps {
  onBack: () => void;
}

type ContainerType = '1L' | '1dl' | '1cl' | '1ml' | 'custom';

interface ContainerDef {
  id: ContainerType;
  label: string;
  capacityMl: number;
  width: number;
  height: number;
  ticks: number;
  tickUnit: string;
  icon: React.ElementType;
}

const CONTAINER_DEFS: Record<Exclude<ContainerType, 'custom'>, ContainerDef> = {
  '1L': { id: '1L', label: '1 Liter', capacityMl: 1000, width: 120, height: 240, ticks: 10, tickUnit: 'dl', icon: FlaskConical },
  '1dl': { id: '1dl', label: '1 Deciliter', capacityMl: 100, width: 80, height: 120, ticks: 10, tickUnit: 'cl', icon: Beaker },
  '1cl': { id: '1cl', label: '1 Centiliter', capacityMl: 10, width: 40, height: 80, ticks: 10, tickUnit: 'ml', icon: TestTube },
  '1ml': { id: '1ml', label: '1 Milliliter', capacityMl: 1, width: 20, height: 40, ticks: 1, tickUnit: 'ml', icon: Droplets },
};

interface ContainerInstance {
  id: string;
  type: ContainerType;
  label: string;
  capacityMl: number;
  width: number;
  height: number;
  ticks: number;
  tickUnit: string;
  x: number;
  y: number;
  volumeMl: number;
  isPouring?: boolean;
  targetId?: string;
}

export function CapacityConverterTool({ onBack }: CapacityConverterToolProps) {
  const [containers, setContainers] = useState<ContainerInstance[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Custom inputs
  const [customContainerMl, setCustomContainerMl] = useState<string>('500');
  const [customPourMl, setCustomPourMl] = useState<string>('50');

  // View state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Drag state
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [hoveredTargetId, setHoveredTargetId] = useState<string | null>(null);
  
  // Pouring animation state
  const [activePouring, setActivePouring] = useState<{ sourceId: string, targetId: string, amount: number } | null>(null);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Prevent browser zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomDirection = e.deltaY > 0 ? -1 : 1;
        const zoomAmount = Math.abs(e.deltaY) < 50 ? 0.01 : 0.05;
        
        setScale(prevScale => {
          const newScale = Math.max(0.2, Math.min(3, prevScale + zoomDirection * zoomAmount));
          
          if (newScale !== prevScale && workspaceRef.current) {
             const rect = workspaceRef.current.getBoundingClientRect();
             const mouseX = e.clientX - rect.left;
             const mouseY = e.clientY - rect.top;
             
             const scaleRatio = newScale / prevScale;
             
             setPan(prevPan => ({
                x: mouseX - (mouseX - prevPan.x) * scaleRatio,
                y: mouseY - (mouseY - prevPan.y) * scaleRatio
             }));
          }
          
          return newScale;
        });
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const getCenterCoords = () => {
    if (!workspaceRef.current) return { x: 100, y: 100 };
    const rect = workspaceRef.current.getBoundingClientRect();
    return {
      x: (rect.width / 2 - pan.x) / scale,
      y: (rect.height / 2 - pan.y) / scale
    };
  };

  const addContainer = (type: Exclude<ContainerType, 'custom'>) => {
    const center = getCenterCoords();
    const def = CONTAINER_DEFS[type];

    const newContainer: ContainerInstance = {
      id: `cont-${Date.now()}`,
      type,
      label: def.label,
      capacityMl: def.capacityMl,
      width: def.width,
      height: def.height,
      ticks: def.ticks,
      tickUnit: def.tickUnit,
      x: center.x - def.width / 2,
      y: center.y - def.height / 2,
      volumeMl: 0
    };
    setContainers(prev => [...prev, newContainer]);
    setSelectedId(newContainer.id);
  };

  const addCustomContainer = () => {
    const ml = parseInt(customContainerMl, 10);
    if (isNaN(ml) || ml <= 0) {
      toast.error('Kérlek érvényes űrtartalmat adj meg (ml)!');
      return;
    }
    if (ml > 100000) {
      toast.error('Túl nagy edény! Max 100 000 ml engedélyezett.');
      return;
    }

    const center = getCenterCoords();
    
    // Calculate visual dimensions logarithmically / proportionally so they don't break the screen
    // Base is 1000ml = 120w x 240h
    // We limit height between 60 and 400, width between 40 and 300
    const heightRatio = Math.log10(Math.max(10, ml)) / Math.log10(1000); // 1000ml -> ratio 1
    const height = Math.min(Math.max(240 * heightRatio, 60), 400);
    const width = Math.min(Math.max(120 * heightRatio, 40), 300);

    let ticks = 10;
    let tickUnit = 'ml';
    if (ml >= 1000) { tickUnit = 'l'; ticks = 10; }
    else if (ml >= 100) { tickUnit = 'dl'; ticks = 10; }
    else if (ml >= 10) { tickUnit = 'cl'; ticks = 10; }
    
    // Simple heuristic for ticks: if divisible by 10, use 10, else try 5 or just 1.
    if (ml % 10 !== 0) ticks = 5;
    if (ml < 5) ticks = ml;

    const newContainer: ContainerInstance = {
      id: `cont-${Date.now()}`,
      type: 'custom',
      label: `${ml} ml Edény`,
      capacityMl: ml,
      width,
      height,
      ticks,
      tickUnit,
      x: center.x - width / 2,
      y: center.y - height / 2,
      volumeMl: 0
    };
    setContainers(prev => [...prev, newContainer]);
    setSelectedId(newContainer.id);
  };

  const deleteSelected = () => {
    if (selectedId) {
      setContainers(prev => prev.filter(c => c.id !== selectedId));
      setSelectedId(null);
    }
  };

  const clearWorkspace = () => {
    setContainers([]);
    setSelectedId(null);
    setPan({ x: 0, y: 0 });
    setScale(1);
  };

  // --- Interaction Handlers ---

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    // Check if clicked directly on background, not on inputs
    if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'BUTTON') return;
    if (e.button !== 0 && e.button !== 1) return; // Only left or middle click
    setIsPanning(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setSelectedId(null);
  };

  const handleContainerMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (activePouring) return; // Block dragging while pouring
    if (e.button !== 0) return;

    setSelectedId(id);
    const container = containers.find(c => c.id === id);
    if (container) {
      setDraggedId(id);
      dragOffset.current = {
        x: e.clientX / scale - container.x,
        y: e.clientY / scale - container.y
      };
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (draggedId) {
      const x = e.clientX / scale - dragOffset.current.x;
      const y = e.clientY / scale - dragOffset.current.y;

      setContainers(prev => prev.map(c => c.id === draggedId ? { ...c, x, y } : c));

      // Hit detection for pouring (hovering over another container)
      const draggedContainer = containers.find(c => c.id === draggedId)!;
      const draggedCenter = { x: x + draggedContainer.width / 2, y: y + draggedContainer.height / 2 };

      let foundTarget = null;
      for (const c of containers) {
        if (c.id === draggedId) continue;
        if (
          draggedCenter.x >= c.x && draggedCenter.x <= c.x + c.width &&
          draggedCenter.y >= c.y && draggedCenter.y <= c.y + c.height
        ) {
          foundTarget = c.id;
          break;
        }
      }
      setHoveredTargetId(foundTarget);
    }
  }, [isPanning, draggedId, containers, scale]);

  const handleMouseUp = useCallback(() => {
    if (isPanning) setIsPanning(false);

    if (draggedId && hoveredTargetId) {
      // Trigger drag-and-drop pouring
      const source = containers.find(c => c.id === draggedId);
      const target = containers.find(c => c.id === hoveredTargetId);
      
      if (source && target && source.volumeMl > 0) {
        const remainingSpace = target.capacityMl - target.volumeMl;
        const amountToPour = Math.min(source.volumeMl, remainingSpace);

        if (amountToPour > 0) {
          executePour(source.id, target.id, amountToPour);
        } else {
          toast.error('A cél edény már tele van!');
        }
      }
    }

    setDraggedId(null);
    setHoveredTargetId(null);
  }, [isPanning, draggedId, hoveredTargetId, containers]);

  // Execute pouring animation and state update
  const executePour = (sourceId: string, targetId: string, amount: number) => {
    const source = containers.find(c => c.id === sourceId)!;
    const target = containers.find(c => c.id === targetId)!;

    setActivePouring({ sourceId, targetId, amount });

    // Step 1: Move source above target and tilt
    setContainers(prev => prev.map(c => {
      if (c.id === sourceId) {
        return {
          ...c,
          x: target.x + target.width / 2 - c.width / 2, // Center above target
          y: target.y - c.height - 20, // 20px above
          isPouring: true,
          targetId
        };
      }
      return c;
    }));

    // Step 2: Transfer volume after tilt animation (500ms)
    setTimeout(() => {
      setContainers(prev => prev.map(c => {
        if (c.id === sourceId) return { ...c, volumeMl: c.volumeMl - amount };
        if (c.id === targetId) return { ...c, volumeMl: c.volumeMl + amount };
        return c;
      }));

      // Step 3: Reset source position after pour animation (another 500ms)
      setTimeout(() => {
        setContainers(prev => prev.map(c => {
          if (c.id === sourceId) {
            return {
              ...c,
              isPouring: false,
              targetId: undefined,
              // Move back slightly so it doesn't overlap immediately
              x: c.x - 50,
              y: c.y + 50
            };
          }
          return c;
        }));
        setActivePouring(null);
      }, 800);
    }, 500);
  };

  const pourFromToolbar = (amountMl: number) => {
    if (!selectedId || activePouring) return;
    const container = containers.find(c => c.id === selectedId);
    if (!container) return;

    if (amountMl > 0) {
      // Adding liquid
      const remainingSpace = container.capacityMl - container.volumeMl;
      const amountToAdd = Math.min(amountMl, remainingSpace);
      if (amountToAdd > 0) {
        setContainers(prev => prev.map(c => c.id === selectedId ? { ...c, volumeMl: c.volumeMl + amountToAdd } : c));
      } else {
        toast.error('Az edény már tele van!');
      }
    } else {
      // Removing liquid (amountMl is negative)
      const amountToRemove = Math.min(Math.abs(amountMl), container.volumeMl);
      if (amountToRemove > 0) {
        setContainers(prev => prev.map(c => c.id === selectedId ? { ...c, volumeMl: c.volumeMl - amountToRemove } : c));
      }
    }
  };

  const handleCustomPour = () => {
    const ml = parseInt(customPourMl, 10);
    if (isNaN(ml) || ml === 0) return;
    pourFromToolbar(ml);
  };

  // --- Rendering ---

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden select-none z-50">
      {/* Top Navigation & Toolbar */}
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden lg:inline">Vissza</span>
          </Button>
          <div className="h-8 w-px bg-slate-200 hidden xl:block" />
          <h1 className="text-lg font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hidden xl:block">
            Űrmértékegység Átváltó
          </h1>
        </div>

        {/* Add Containers Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mx-2">
          <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200">
            {(Object.keys(CONTAINER_DEFS) as Array<Exclude<ContainerType, 'custom'>>).map(type => {
              const def = CONTAINER_DEFS[type];
              return (
                <Button
                  key={`add-${type}`}
                  onClick={() => addContainer(type)}
                  className="px-3 py-2 rounded-xl font-bold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm border border-slate-200 shrink-0"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  <def.icon className="w-4 h-4 mr-1 text-blue-500 hidden sm:block" />
                  {def.label}
                </Button>
              );
            })}
            
            <div className="w-px h-6 bg-slate-300 mx-1" />
            
            {/* Custom Container Input */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
              <Input 
                type="number" 
                value={customContainerMl} 
                onChange={e => setCustomContainerMl(e.target.value)}
                className="w-20 h-8 text-center font-bold"
                placeholder="ml"
              />
              <span className="text-xs font-bold text-slate-500 mr-1">ml</span>
              <Button 
                onClick={addCustomContainer}
                size="sm"
                className="h-8 px-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold rounded-lg"
              >
                <PackagePlus className="w-4 h-4 mr-1" /> Egyedi
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={clearWorkspace} className="rounded-xl text-red-600 hover:bg-red-50 shrink-0" title="Munkaterület törlése">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Workspace */}
      <main
        ref={workspaceRef}
        className={cn(
          "flex-1 relative overflow-hidden bg-[#f1f5f9] select-none",
          isPanning ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleBackgroundMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Infinite Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 2px, transparent 2px)`,
            backgroundSize: `${40 * scale}px ${40 * scale}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }}
        />

        <div
          className="absolute inset-0 transform-origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          }}
        >
          {containers.map(container => {
            const isSelected = container.id === selectedId;
            const isHoveredTarget = container.id === hoveredTargetId;
            const fillPercentage = (container.volumeMl / container.capacityMl) * 100;

            // Tick marks
            const ticks = [];
            for (let i = 1; i <= container.ticks; i++) {
              ticks.push(
                <div key={i} className="absolute w-4 border-b-2 border-black/20 left-0" style={{ bottom: `${(i / container.ticks) * 100}%` }}>
                  <span className="absolute left-6 -translate-y-1/2 text-[10px] font-black text-black/40">
                    {Math.round(i * (container.capacityMl / container.ticks) / (container.tickUnit === 'l' ? 1000 : container.tickUnit === 'dl' ? 100 : container.tickUnit === 'cl' ? 10 : 1) * 10) / 10}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={container.id}
                onMouseDown={(e) => handleContainerMouseDown(e, container.id)}
                className={cn(
                  "absolute flex items-end justify-center",
                  container.isPouring ? "transition-all duration-500 z-40" : (draggedId === container.id ? "z-30" : (isSelected ? "z-20" : "z-10"))
                )}
                style={{
                  left: container.x,
                  top: container.y,
                  width: container.width,
                  height: container.height,
                  transform: container.isPouring ? 'rotate(-45deg)' : 'rotate(0deg)',
                  transformOrigin: 'bottom right',
                  cursor: draggedId === container.id ? 'grabbing' : 'grab'
                }}
              >
                {/* The glass beaker */}
                <div 
                  className={cn(
                    "relative w-full h-full bg-white/40 backdrop-blur-sm border-4 rounded-b-xl border-t-0 shadow-lg overflow-hidden transition-all",
                    isSelected ? "border-blue-500 shadow-blue-200" : isHoveredTarget ? "border-emerald-500 shadow-emerald-200" : "border-slate-300"
                  )}
                >
                  {/* Liquid */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-blue-400/80 backdrop-blur-md transition-all duration-500 ease-in-out"
                    style={{ height: `${fillPercentage}%` }}
                  >
                    {/* Liquid surface highlight */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-white/20" />
                  </div>

                  {/* Tick Marks */}
                  <div className="absolute inset-0 pointer-events-none">
                    {ticks}
                  </div>
                </div>

                {/* Pouring stream animation */}
                {container.isPouring && (
                  <div className="absolute left-full bottom-full w-2 h-40 bg-blue-400/80 -translate-x-4 translate-y-4 animate-in fade-in zoom-in slide-in-from-top duration-300 origin-top pointer-events-none rounded-full" />
                )}

                {/* Info badge */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-xl shadow-sm border border-slate-200 whitespace-nowrap pointer-events-none flex flex-col items-center">
                  <span className="text-xs font-black text-slate-700">{container.label}</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xs font-black text-blue-600">{container.volumeMl} ml</span>
                    <span className="text-[10px] text-slate-400">/ {container.capacityMl} ml</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Sidebar for Pouring */}
        {selectedId && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white shadow-2xl z-50 min-w-[120px]">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider text-center mb-1">Öntés</h3>
            
            <Button variant="ghost" size="sm" onClick={() => pourFromToolbar(1000)} className="text-blue-700 hover:bg-blue-50 font-bold bg-white justify-start">
              <Plus className="w-4 h-4 mr-2" /> 1 l
            </Button>
            <Button variant="ghost" size="sm" onClick={() => pourFromToolbar(100)} className="text-blue-700 hover:bg-blue-50 font-bold bg-white justify-start">
              <Plus className="w-4 h-4 mr-2" /> 1 dl
            </Button>
            <Button variant="ghost" size="sm" onClick={() => pourFromToolbar(10)} className="text-blue-700 hover:bg-blue-50 font-bold bg-white justify-start">
              <Plus className="w-4 h-4 mr-2" /> 1 cl
            </Button>
            <Button variant="ghost" size="sm" onClick={() => pourFromToolbar(1)} className="text-blue-700 hover:bg-blue-50 font-bold bg-white justify-start">
              <Plus className="w-4 h-4 mr-2" /> 1 ml
            </Button>

            <div className="h-px bg-slate-200 my-1" />
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase text-center">Egyedi (ml)</span>
              <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-blue-100 shadow-sm">
                 <Input 
                  type="number" 
                  value={customPourMl} 
                  onChange={e => setCustomPourMl(e.target.value)}
                  className="w-full h-8 text-center font-bold text-sm p-0 border-none focus-visible:ring-0"
                  placeholder="ml"
                />
              </div>
              <Button variant="ghost" size="sm" onClick={handleCustomPour} className="font-bold text-blue-700 hover:bg-blue-50 bg-blue-50/50 mt-1">
                Betölt
              </Button>
            </div>

            <div className="h-px bg-slate-200 my-1" />

            <Button variant="ghost" size="sm" onClick={() => pourFromToolbar(-100000)} className="text-amber-600 hover:bg-amber-50 font-bold bg-white justify-start" title="Teljes ürítés">
              <RotateCcw className="w-4 h-4 mr-2" /> Ürít
            </Button>
            
            <Button variant="destructive" size="sm" onClick={deleteSelected} className="font-bold w-full mt-2">
              <Trash2 className="w-4 h-4 mr-2" /> Törlés
            </Button>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-2xl z-20">
          <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.2, s - 0.1))} className="rounded-full hover:bg-slate-100 h-10 w-10">
            <ZoomOut className="w-5 h-5 text-slate-600" />
          </Button>
          <div className="w-px h-6 bg-slate-200" />
          <Button variant="ghost" onClick={() => { setScale(1); setPan({x: 0, y: 0}); }} className="text-sm font-black text-slate-600 min-w-[5ch] text-center px-2 hover:bg-slate-100 rounded-xl" title="Nézet alaphelyzetbe">
            {Math.round(scale * 100)}%
          </Button>
          <div className="w-px h-6 bg-slate-200" />
          <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(3, s + 0.1))} className="rounded-full hover:bg-slate-100 h-10 w-10">
            <ZoomIn className="w-5 h-5 text-slate-600" />
          </Button>
        </div>
      </main>
    </div>
  );
}
