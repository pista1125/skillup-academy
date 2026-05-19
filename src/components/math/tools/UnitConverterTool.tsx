import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  RotateCcw,
  Trash2,
  Magnet,
  MousePointer2,
  ZoomIn,
  ZoomOut,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UnitConverterToolProps {
  onBack: () => void;
}

interface TileData {
  id: string;
  unit: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  zIndex: number;
}

// 1mm = 3px
const SIZE_MULTIPLIER = 3;
const UNITS = [
  { id: '1m', label: '1 m', value: 1000, color: 'bg-blue-500 border-blue-700' },
  { id: '1dm', label: '1 dm', value: 100, color: 'bg-emerald-500 border-emerald-700' },
  { id: '1cm', label: '1 cm', value: 10, color: 'bg-orange-500 border-orange-700' },
  { id: '1mm', label: '1 mm', value: 1, color: 'bg-rose-500 border-rose-700' },
];

const SNAP_THRESHOLD = 15;

export function UnitConverterTool({ onBack }: UnitConverterToolProps) {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const [selectedTileIds, setSelectedTileIds] = useState<Set<string>>(new Set());
  const [draggedTileId, setDraggedTileId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ startX: number, startY: number, tileX: number, tileY: number } | null>(null);
  const [isSnapping, setIsSnapping] = useState(true);
  const [activeSnapLines, setActiveSnapLines] = useState<{ x?: number, y?: number }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number, y: number, panX: number, panY: number } | null>(null);
  const [hasPanned, setHasPanned] = useState(false);

  // Handle Ctrl+Wheel for zooming
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomDirection = e.deltaY > 0 ? -1 : 1;
        // Slower zoom
        const zoomAmount = Math.abs(e.deltaY) < 50 ? 0.01 : 0.05;
        
        setScale(prevScale => {
          const newScale = Math.max(0.1, Math.min(3, prevScale + zoomDirection * zoomAmount));
          
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

    const workspace = workspaceRef.current;
    if (workspace) {
      workspace.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (workspace) {
        workspace.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    if (tiles.length === 0) {
      addTile('1m', 50, 50);
    }
  }, []);

  const addTile = (unitId: string, startX?: number, startY?: number) => {
    if (!workspaceRef.current) return;

    const unitDef = UNITS.find(u => u.id === unitId);
    if (!unitDef) return;

    const x = startX ?? 50 + (Math.random() * 50);
    const y = startY ?? 50 + (Math.random() * 50);

    const newTile: TileData = {
      id: `tile-${Date.now()}-${Math.random()}`,
      unit: unitId,
      label: unitDef.label,
      color: unitDef.color,
      x,
      y,
      width: unitDef.value * SIZE_MULTIPLIER,
      zIndex: tiles.length + 1
    };

    setTiles(prev => [...prev, newTile]);
  };

  const clearWorkspace = () => {
    setTiles([]);
    setSelectedTileIds(new Set());
    addTile('1m', 50, 50);
    toast.success("Munkaterület törölve");
  };

  const toggleSelection = (id: string, multi: boolean) => {
    const newSelected = new Set(multi ? selectedTileIds : []);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTileIds(newSelected);
  };

  const clearSelection = () => {
    if (!isDragging && !hasPanned) {
      setSelectedTileIds(new Set());
    }
  };

  const deleteSelected = () => {
    setTiles(prev => prev.filter(t => !selectedTileIds.has(t.id)));
    setSelectedTileIds(new Set());
    toast.success("Kijelölt elemek törölve");
  };

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setHasPanned(false);
    setPanStart({
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    });
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const tile = tiles.find(t => t.id === id);
    if (!tile) return;

    setDraggedTileId(id);
    setDragOffset({
      startX: e.clientX,
      startY: e.clientY,
      tileX: tile.x,
      tileY: tile.y
    });
    setIsDragging(false);

    const maxZ = Math.max(...tiles.map(t => t.zIndex), 0);
    setTiles(prev => prev.map(t => t.id === id ? { ...t, zIndex: maxZ + 1 } : t));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && panStart) {
      if (Math.abs(e.clientX - panStart.x) > 3 || Math.abs(e.clientY - panStart.y) > 3) {
        setHasPanned(true);
      }
      setPan({
        x: panStart.panX + (e.clientX - panStart.x),
        y: panStart.panY + (e.clientY - panStart.y)
      });
      return;
    }

    if (!draggedTileId || !dragOffset) return;

    if (!isDragging) {
      setIsDragging(true);
    }

    let newX = dragOffset.tileX + (e.clientX - dragOffset.startX) / scale;
    let newY = dragOffset.tileY + (e.clientY - dragOffset.startY) / scale;

    const currentTile = tiles.find(t => t.id === draggedTileId);
    if (!currentTile) return;

    let snappedX = newX;
    let snappedY = newY;
    let snapLines: { x?: number, y?: number } = {};

    if (isSnapping) {
      tiles.forEach(other => {
        if (other.id === draggedTileId) return;

        if (Math.abs(newY - other.y) < SNAP_THRESHOLD) {
          snappedY = other.y;
          snapLines.y = other.y;
        }

        if (Math.abs(newY - (other.y + 50)) < SNAP_THRESHOLD) {
            snappedY = other.y + 50;
            snapLines.y = snappedY;
        }

        if (Math.abs(newX - (other.x + other.width)) < SNAP_THRESHOLD) {
          snappedX = other.x + other.width;
          snapLines.x = snappedX;
        }

        if (Math.abs((newX + currentTile.width) - other.x) < SNAP_THRESHOLD) {
          snappedX = other.x - currentTile.width;
          snapLines.x = other.x;
        }

        if (Math.abs(newX - other.x) < SNAP_THRESHOLD) {
          snappedX = other.x;
          snapLines.x = other.x;
        }
      });
    }

    setActiveSnapLines(snapLines);

    setTiles(prev => prev.map(t => {
      if (t.id === draggedTileId) {
        return { ...t, x: snappedX, y: snappedY };
      }
      return t;
    }));
  };

  const handleMouseUp = () => {
    setDraggedTileId(null);
    setDragOffset(null);
    setActiveSnapLines({});
    setIsPanning(false);
    setPanStart(null);
    setTimeout(() => {
      setIsDragging(false);
      // hasPanned is deliberately kept true until next mousedown so onClick doesn't clear selection
    }, 0);
  };

  const removeTile = (id: string) => {
    setTiles(prev => prev.filter(t => t.id !== id));
    if (selectedTileIds.has(id)) {
      const newSelected = new Set(selectedTileIds);
      newSelected.delete(id);
      setSelectedTileIds(newSelected);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden select-none z-50">
      {/* Top Navigation & Toolbar */}
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm z-30 shrink-0">
        <div className="flex items-center gap-6">
          <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza
          </Button>
          <div className="h-8 w-px bg-slate-200 hidden md:block" />
          <h1 className="text-lg font-black bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent hidden md:block">
            Hosszúság Átváltó
          </h1>
        </div>

        <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200">
          {UNITS.map(unit => (
            <Button
              key={`btn-${unit.id}`}
              onClick={() => addTile(unit.id)}
              className={cn(
                "px-4 py-2 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-sm min-w-[60px]",
                unit.color.split(' ')[0] // Just use the bg color for the button
              )}
            >
              <Plus className="w-4 h-4 mr-1" />
              {unit.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {selectedTileIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteSelected}
              className="animate-in zoom-in-50 duration-200 rounded-xl"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Törlés ({selectedTileIds.size})
            </Button>
          )}
          <Button
            variant={isSnapping ? "default" : "outline"}
            size="sm"
            onClick={() => setIsSnapping(!isSnapping)}
            className={cn("rounded-xl transition-all", isSnapping ? "bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700" : "text-slate-500 border-slate-200 hover:bg-slate-50")}
            title="Mágneses illesztés"
          >
            <Magnet className="w-4 h-4" />
          </Button>
          <div className="h-6 w-px bg-slate-200 mx-1" />
          <Button variant="ghost" size="icon" onClick={clearWorkspace} className="rounded-xl text-red-600 hover:bg-red-50" title="Munkaterület törlése">
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
        onClick={clearSelection}
      >
        <div 
          className="w-[10000px] h-[10000px] relative origin-top-left transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {/* Unit Markers (0, 1m) */}
          {[0, 1].map(i => (
            <div key={i} className="absolute top-0 bottom-0 pointer-events-none border-l-2 border-slate-300/50 z-0" style={{ left: i * 1000 * SIZE_MULTIPLIER + 50 }}>
              <div className="absolute top-2 left-2 bg-slate-200/80 backdrop-blur-sm text-slate-500 text-xs font-bold px-2 py-1 rounded shadow-sm">
                {i > 0 ? `${i} méter` : '0'}
              </div>
            </div>
          ))}

          {/* Tiles */}
          {tiles.map(tile => {
            const isSelected = selectedTileIds.has(tile.id);
            return (
              <div
                key={tile.id}
                onMouseDown={(e) => handleMouseDown(e, tile.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) {
                    toggleSelection(tile.id, true);
                  }
                }}
                className={cn(
                  "absolute flex items-center justify-center border-x border-b-4 font-bold text-white cursor-grab active:cursor-grabbing hover:brightness-110 shadow-sm transition-transform text-sm",
                  tile.color,
                  draggedTileId === tile.id && "scale-[1.02] shadow-xl z-50",
                  isSelected && "ring-4 ring-offset-2 ring-indigo-500 z-40 transform scale-[1.02]"
                )}
                style={{
                  left: tile.x,
                  top: tile.y,
                  width: Math.max(tile.width, 10), // minimum width to be clickable
                  height: 50,
                  zIndex: tile.zIndex,
                  userSelect: 'none',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {tile.width >= 30 ? tile.label : ''}
                {!isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTile(tile.id);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 hover:opacity-100 transition-opacity text-red-500 border border-slate-100 hover:scale-110 z-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full p-1 shadow-md z-50">
                    <MousePointer2 className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Visual Snap Lines */}
          {activeSnapLines.x !== undefined && (
            <div className="absolute top-0 bottom-0 border-l-2 border-indigo-400 border-dashed pointer-events-none z-40 opacity-50" style={{ left: activeSnapLines.x }} />
          )}
          {activeSnapLines.y !== undefined && (
            <div className="absolute left-0 right-20 border-t-2 border-indigo-400 border-dashed pointer-events-none z-40 opacity-50" style={{ top: activeSnapLines.y }} />
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-white shadow-2xl z-20">
            <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.1, s - 0.1))} className="rounded-full hover:bg-slate-100 h-10 w-10">
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
