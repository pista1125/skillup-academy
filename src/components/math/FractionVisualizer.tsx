import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  RotateCcw,
  Trash2,
  Magnet,
  MousePointer2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FractionVisualizerProps {
  onBack: () => void;
}

interface TileData {
  id: string;
  denominator: number;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  zIndex: number;
}

const PRESET_DENOMINATORS = [1, 2, 3, 4, 5, 6, 8, 10, 12];
const UNIT_WIDTH = 600; // Pixels for "1 Unit"
const SNAP_THRESHOLD = 15; // Pixels for magnetic snap

const GET_COLOR = (den: number) => {
  const colors: Record<number, string> = {
    1: 'bg-[#ff4d4d] border-[#e60000]', // Red
    2: 'bg-[#ff99cc] border-[#ff4da6]', // Pink
    3: 'bg-[#ff9900] border-[#cc7a00]', // Orange
    4: 'bg-[#ffff4d] border-[#e6e600] text-black', // Yellow
    5: 'bg-[#4db84d] border-[#339933]', // Green
    6: 'bg-[#4db8ff] border-[#0099ff]', // Light Blue
    8: 'bg-[#9966ff] border-[#7733ff]', // Purple
    10: 'bg-[#b38600] border-[#806000]', // Brown
    12: 'bg-[#3366cc] border-[#24478f]', // Dark Blue
  };
  return colors[den] || 'bg-slate-400 border-slate-600';
};

export function FractionVisualizer({ onBack }: FractionVisualizerProps) {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [customDen, setCustomDen] = useState<number>(7);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Selection state
  const [selectedTileIds, setSelectedTileIds] = useState<Set<string>>(new Set());

  // Dragging state
  const [draggedTileId, setDraggedTileId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number, y: number } | null>(null);
  const [isSnapping, setIsSnapping] = useState(true); // Toggle snapping
  const [activeSnapLines, setActiveSnapLines] = useState<{ x?: number, y?: number }>({}); // To show visual guides
  const [isDragging, setIsDragging] = useState(false);

  // Initial setup
  useEffect(() => {
    if (tiles.length === 0) {
      addTile(1, 50, 50);
    }
  }, []);

  const addTile = (denominator: number, startX?: number, startY?: number) => {
    if (!workspaceRef.current) return;

    // Default position if not specified (scroll aware? keep simple for now)
    const x = startX ?? 50 + (Math.random() * 50); // Relative to container start
    const y = startY ?? 50 + (Math.random() * 50);

    const newTile: TileData = {
      id: `tile-${Date.now()}-${Math.random()}`,
      denominator,
      label: denominator === 1 ? '1' : `1/${denominator}`,
      color: GET_COLOR(denominator),
      x,
      y,
      width: UNIT_WIDTH / denominator,
      zIndex: tiles.length + 1
    };

    setTiles(prev => [...prev, newTile]);
  };

  const clearWorkspace = () => {
    setTiles([]);
    setSelectedTileIds(new Set());
    addTile(1, 50, 50);
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
    if (!isDragging) {
      setSelectedTileIds(new Set());
    }
  };

  const deleteSelected = () => {
    setTiles(prev => prev.filter(t => !selectedTileIds.has(t.id)));
    setSelectedTileIds(new Set());
    toast.success("Kijelölt elemek törölve");
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const tile = tiles.find(t => t.id === id);
    if (!tile) return;

    setDraggedTileId(id);
    setDragOffset({
      x: e.clientX - tile.x,
      y: e.clientY - tile.y
    });
    setIsDragging(false);

    // Bring to front
    const maxZ = Math.max(...tiles.map(t => t.zIndex), 0);
    setTiles(prev => prev.map(t => t.id === id ? { ...t, zIndex: maxZ + 1 } : t));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedTileId || !dragOffset) return;

    const dx = e.clientX - dragOffset.x;
    const dy = e.clientY - dragOffset.y;

    // Check if actually dragging
    // Only consider it a drag if moved more than a few pixels to allow for clicks
    if (!isDragging) {
      // We can't easily check prev position here without more state, but let's assume if mouse moves while down it is a drag.
      // Actually, we can check displacement logic if we stored start pos.
      // Simplified: set isDragging true immediately.
      setIsDragging(true);
    }

    let newX = dx;
    let newY = dy;

    const currentTile = tiles.find(t => t.id === draggedTileId);
    if (!currentTile) return;

    // Snapping Logic
    let snappedX = newX;
    let snappedY = newY;
    let snapLines: { x?: number, y?: number } = {};

    if (isSnapping) {
      tiles.forEach(other => {
        if (other.id === draggedTileId) return;

        // Vertical Align (Top align)
        if (Math.abs(newY - other.y) < SNAP_THRESHOLD) {
          snappedY = other.y;
          snapLines.y = other.y;
        }

        // Horizontal Snap (Right of other)
        if (Math.abs(newX - (other.x + other.width)) < SNAP_THRESHOLD) {
          snappedX = other.x + other.width;
          snapLines.x = snappedX;
        }

        // Horizontal Snap (Left of other)
        if (Math.abs((newX + currentTile.width) - other.x) < SNAP_THRESHOLD) {
          snappedX = other.x - currentTile.width;
          snapLines.x = other.x;
        }

        // Horizontal Align (Left align)
        if (Math.abs(newX - other.x) < SNAP_THRESHOLD) {
          snappedX = other.x;
          snapLines.x = other.x;
        }
      });
    }

    setActiveSnapLines(snapLines);

    setTiles(prev => prev.map(t => {
      // If selected, move all selected tiles? (Advanced feature, maybe later. For now just move dragged one)
      // If user drags a selected tile, we COULD move all selected.
      // Let's implement moving all selected tiles if the dragged one IS selected.
      if (selectedTileIds.has(draggedTileId)) {
        if (selectedTileIds.has(t.id)) {
          // Calculate delta from its current pos is tricky without tracking previous mouse pos.
          // Easiest is to track delta since drag start for the leader, and apply to others.
          // But here we set absolute pos based on current mouse. 
          // Let's stick to single tile drag for stability, or simple implementation:
        }
      }

      if (t.id === draggedTileId) {
        return { ...t, x: snappedX, y: snappedY };
      }
      return t;
    }));
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // If we didn't drag (much), treat as click for selection
    // note: isDragging is set in mousemove
    // This logic usually requires a separate click handler or careful state management.
    // Let's rely on onClick for selection toggle if not dragging.

    setDraggedTileId(null);
    setDragOffset(null);
    setActiveSnapLines({});

    // Reset dragging flag after a short delay to allow onClick to fire check
    setTimeout(() => setIsDragging(false), 0);
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
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full h-[calc(100vh-100px)]">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-2">
        <Button variant="ghost" onClick={onBack} className="hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vissza
        </Button>
        <div className="flex gap-2">
          {selectedTileIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteSelected}
              className="animate-in zoom-in-50 duration-200"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Kijelöltek törlése ({selectedTileIds.size})
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSnapping(!isSnapping)}
            className={cn(isSnapping ? "bg-blue-100 text-blue-700" : "text-slate-400")}
          >
            <Magnet className="w-4 h-4 mr-2" />
            Mágnes: {isSnapping ? "BE" : "KI"}
          </Button>
          <Button variant="outline" size="sm" onClick={clearWorkspace} className="border-primary/20 hover:bg-primary/5">
            <RotateCcw className="w-4 h-4 mr-2" />
            Visszaállítás
          </Button>
        </div>
      </div>

      {/* Toolbox */}
      <Card className="shadow-sm border-slate-200 bg-white z-10">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {PRESET_DENOMINATORS.map(den => (
              <button
                key={`btn-${den}`}
                onClick={() => addTile(den)}
                className={cn(
                  "px-4 py-2 rounded-lg border-b-4 font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-sm min-w-[60px]",
                  GET_COLOR(den)
                )}
              >
                {den === 1 ? '1' : `1/${den}`}
              </button>
            ))}

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Egyedi:</span>
              <div className="flex gap-1 w-24">
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={customDen}
                  onChange={(e) => setCustomDen(parseInt(e.target.value) || 1)}
                  className="h-8 text-sm px-2"
                />
                <Button size="icon" className="h-8 w-8 shrink-0 bg-slate-700" onClick={() => addTile(customDen)}>
                  <div className="font-bold text-xs">OK</div>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workspace */}
      <div
        ref={workspaceRef}
        className="flex-1 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 relative overflow-x-auto overflow-y-hidden shadow-inner cursor-crosshair select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={clearSelection} // Click background to deselect
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <div className="min-w-[2400px] h-full relative">
          {/* Unit Markers (0, 1, 2, 3, 4) */}
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="absolute top-0 bottom-0 pointer-events-none border-l-2 border-slate-300/50 z-0" style={{ left: i * UNIT_WIDTH + 50 }}>
              <div className="absolute top-2 left-2 bg-slate-200/80 backdrop-blur-sm text-slate-500 text-xs font-bold px-2 py-1 rounded shadow-sm">
                {i > 0 ? `${i}. Egész` : '0'}
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
                    toggleSelection(tile.id, true); // Always multi-select for convenience? Or normal logic.
                  }
                }}
                className={cn(
                  "absolute flex items-center justify-center border-x border-b-4 font-bold text-white cursor-grab active:cursor-grabbing hover:brightness-110 shadow-sm transition-transform",
                  tile.color,
                  draggedTileId === tile.id && "scale-105 shadow-xl z-50",
                  isSelected && "ring-4 ring-offset-2 ring-indigo-500 z-40 transform scale-[1.02]"
                )}
                style={{
                  left: tile.x,
                  top: tile.y,
                  width: tile.width,
                  height: 50,
                  zIndex: tile.zIndex,
                  userSelect: 'none'
                }}
              >
                {tile.label}
                {/* Delete button on hover (only if not selected to avoid clutter) */}
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

        {tiles.length <= 1 && (
          <div className="absolute bottom-10 left-0 right-0 text-center text-slate-400 italic">
            Tipp: Kattints a törtekre a kijelöléshez! Többet is kijelölhetsz a törléshez.
          </div>
        )}
      </div>
    </div>
  );
}
