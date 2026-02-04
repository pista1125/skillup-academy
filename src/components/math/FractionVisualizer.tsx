import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Plus,
  Trash2,
  RotateCcw,
  Trash,
  MoveHorizontal
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
}

interface RowData {
  id: string;
  tiles: TileData[];
}

const PRESET_DENOMINATORS = [1, 2, 3, 4, 5, 6, 8, 10, 12];

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
  const [rows, setRows] = useState<RowData[]>([
    { id: 'unit-row', tiles: [{ id: 'unit-1', denominator: 1, label: '1 unit', color: GET_COLOR(1) }] },
    { id: 'row-' + Date.now(), tiles: [] }
  ]);
  const [customDen, setCustomDen] = useState<number>(7);
  const [draggedTile, setDraggedTile] = useState<Omit<TileData, 'id'> | null>(null);

  // Adjusted for max-w-4xl container (approx 850px content width)
  // 650px leaves enough room for labels and row actions without scrolling
  const UNIT_WIDTH = 650;

  // ... (keeping existing helper functions)
  const addRow = () => {
    setRows([...rows, { id: 'row-' + Date.now(), tiles: [] }]);
  };

  const removeRow = (rowId: string) => {
    if (rowId === 'unit-row') return;
    setRows(rows.filter(r => r.id !== rowId));
  };

  const addTileToRow = (rowId: string, denominator: number) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        const newTile: TileData = {
          id: `tile-${Date.now()}-${Math.random()}`,
          denominator,
          label: denominator === 1 ? '1' : `1/${denominator}`,
          color: GET_COLOR(denominator)
        };
        return { ...row, tiles: [...row.tiles, newTile] };
      }
      return row;
    }));
  };

  const removeTile = (rowId: string, tileId: string) => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        return { ...row, tiles: row.tiles.filter(t => t.id !== tileId) };
      }
      return row;
    }));
  };

  const clearWorkspace = () => {
    setRows([
      { id: 'unit-row', tiles: [{ id: 'unit-1', denominator: 1, label: '1 unit', color: GET_COLOR(1) }] },
      { id: 'row-' + Date.now(), tiles: [] }
    ]);
    toast.success("Munkaterület törölve");
  };

  const handleDragStart = (den: number) => {
    setDraggedTile({
      denominator: den,
      label: den === 1 ? '1' : `1/${den}`,
      color: GET_COLOR(den)
    });
  };

  const handleDrop = (e: React.DragEvent, rowId: string) => {
    e.preventDefault();
    if (draggedTile) {
      addTileToRow(rowId, draggedTile.denominator);
      setDraggedTile(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Top Navigation & General Actions */}
      <div className="flex items-center justify-between px-2">
        <Button variant="ghost" onClick={onBack} className="hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vissza
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={clearWorkspace} className="border-primary/20 hover:bg-primary/5">
            <RotateCcw className="w-4 h-4 mr-2" />
            Visszaállítás
          </Button>
          <Button variant="secondary" size="sm" onClick={addRow} className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
            <Plus className="w-4 h-4 mr-2" />
            Új sor
          </Button>
        </div>
      </div>

      {/* Top Toolbox: Now horizontal and more compact */}
      <Card className="shadow-sm border-primary/10 bg-slate-50/50">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {PRESET_DENOMINATORS.map(den => (
              <div
                key={`source-${den}`}
                draggable
                onDragStart={() => handleDragStart(den)}
                onClick={() => {
                  const lastRowId = rows[rows.length - 1].id;
                  addTileToRow(lastRowId, den);
                }}
                className={cn(
                  "cursor-grab active:cursor-grabbing px-4 py-2 rounded-lg border-b-4 text-center font-bold text-white transition-all hover:brightness-110 active:scale-95 select-none shadow-sm min-w-[70px]",
                  GET_COLOR(den)
                )}
              >
                {den === 1 ? '1' : `1/${den}`}
              </div>
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
                <Button size="icon" className="h-8 w-8 shrink-0 bg-slate-700" onClick={() => addTileToRow(rows[rows.length - 1].id, customDen)}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground italic text-center mt-3">
            Kattints a hozzáadáshoz (utolsó sorba) vagy húzd egy konkrét sorba!
          </p>
        </CardContent>
      </Card>

      {/* Main Workspace: Full width, no horizontal scroll */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 pt-12 shadow-inner relative overflow-hidden">
        <div className="flex flex-col gap-1 w-full relative">
          {rows.map((row) => (
            <div
              key={row.id}
              onDrop={(e) => handleDrop(e, row.id)}
              onDragOver={handleDragOver}
              className={cn(
                "relative flex items-center min-h-[50px] border-b border-slate-50 last:border-0 group/row",
                row.tiles.length === 0 && "bg-slate-50/20"
              )}
            >
              {/* Row Actions */}
              <div className="absolute -left-2 opacity-0 group-hover/row:opacity-100 transition-opacity z-20">
                {row.id !== 'unit-row' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:bg-destructive/10 bg-white shadow-sm"
                    onClick={() => removeRow(row.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Tiles Container */}
              <div className="flex h-10 items-stretch bg-slate-100/20 rounded-md ml-6" style={{ width: `${UNIT_WIDTH}px` }}>
                {row.tiles.map((tile) => (
                  <div
                    key={tile.id}
                    title={`1/${tile.denominator} - Kattints a törléshez`}
                    onClick={() => removeTile(row.id, tile.id)}
                    className={cn(
                      "relative flex items-center justify-center border-x border-b-4 font-bold text-white cursor-pointer hover:brightness-110 active:scale-95 transition-all text-xs shadow-sm overflow-hidden whitespace-nowrap",
                      tile.color
                    )}
                    style={{ width: `${(1 / tile.denominator) * UNIT_WIDTH}px` }}
                  >
                    {tile.label}
                  </div>
                ))}

                {row.tiles.length === 0 && (
                  <div className="flex items-center px-4 text-slate-300 text-[10px] italic">
                    Húzz ide törteket...
                  </div>
                )}
              </div>

              {/* Total Marker */}
              {row.tiles.length > 0 && (
                <div className="ml-4 px-2 py-0.5 bg-slate-100 rounded text-[9px] font-mono text-slate-500 font-bold border border-slate-200">
                  Σ = {row.tiles.reduce((acc, t) => acc + (1 / t.denominator), 0).toFixed(2)}
                </div>
              )}
            </div>
          ))}

          {/* Guide markers: Absolute positioning within the workspace */}
          <div className="absolute top-0 bottom-0 pointer-events-none border-l-2 border-dashed border-primary/30 z-10" style={{ left: `calc(1.5rem + ${UNIT_WIDTH}px)` }}>
            <div className="absolute -top-10 -left-1/2 translate-x-[-15%] whitespace-nowrap">
              <span className="bg-primary text-white text-[10px] font-black px-2.5 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1">
                🎯 1 Egész
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
        <div className="p-2 bg-blue-500 rounded-lg text-white">
          <MoveHorizontal className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 text-sm">Próbáld ki!</h4>
          <p className="text-blue-800/80 text-xs leading-relaxed">
            Állíts össze különböző törteket a sorokba, és figyeld meg, mikor érik el a <b>1 Egész</b> jelölést!
            A felső sávból egyszerűen húzd le vagy kattints rájuk a hozzáadáshoz.
          </p>
        </div>
      </div>
    </div>
  );
}

