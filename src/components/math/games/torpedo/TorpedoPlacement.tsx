import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  RotateCw, 
  Trash2, 
  Play, 
  Dices,
  Info,
  Anchor,
  Settings2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TorpedoPlacementProps {
  onComplete: (ships: any[]) => void;
  axisType: 'number' | 'letter';
}

const SHIP_TYPES = [
  { size: 4, count: 1, label: 'Csatahajó (4)' },
  { size: 3, count: 2, label: 'Cirkáló (3)' },
  { size: 2, count: 3, label: 'Romboló (2)' },
  { size: 1, count: 4, label: 'Tengeralattjáró (1)' },
];

const COLS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const ROWS = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

const LETTERS = ['-E', '-D', '-C', '-B', '-A', 'O', 'A', 'B', 'C', 'D', 'E'];

const getShipLineCoordinates = (ship: any) => {
  const xs = ship.cells.map((c: any) => c.x);
  const ys = ship.cells.map((c: any) => c.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const startColIdx = COLS.indexOf(minX);
  const endColIdx = COLS.indexOf(maxX);
  const startRowIdx = ROWS.indexOf(maxY);
  const endRowIdx = ROWS.indexOf(minY);

  return {
    left: `${(startColIdx / 10) * 100}%`,
    top: `${(startRowIdx / 10) * 100}%`,
    width: `${((endColIdx - startColIdx) / 10) * 100}%`,
    height: `${((endRowIdx - startRowIdx) / 10) * 100}%`
  };
};

export default function TorpedoPlacement({ onComplete, axisType }: TorpedoPlacementProps) {
  const [placedShips, setPlacedShips] = useState<any[]>([]);
  const [currentShipSize, setCurrentShipSize] = useState<number | null>(null);
  const [orientation, setOrientation] = useState<'h' | 'v'>('h');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null);

  const getCellLabel = (x: number, y: number) => {
    if (axisType === 'letter') {
      const colIdx = COLS.indexOf(x);
      return `${LETTERS[colIdx]}${y}`;
    }
    return `${x}, ${y}`;
  };

  const getRemainingShips = () => {
    const remaining = SHIP_TYPES.map(type => {
      const placedCount = placedShips.filter(s => s.size === type.size).length;
      return { ...type, remaining: type.count - placedCount };
    });
    return remaining;
  };

  const isValidPlacement = (x: number, y: number, size: number, orient: 'h' | 'v', ships: any[]) => {
    const cells = [];
    const colIdx = COLS.indexOf(x);
    const rowIdx = ROWS.indexOf(y);

    for (let i = 0; i < size; i++) {
      let curX, curY;
      if (orient === 'h') {
        if (colIdx + i >= COLS.length) return null;
        curX = COLS[colIdx + i];
        curY = y;
      } else {
        if (rowIdx + i >= ROWS.length) return null;
        curX = x;
        curY = ROWS[rowIdx + i];
      }
      cells.push({ x: curX, y: curY });
    }

    // Check overlap AND touching
    for (const cell of cells) {
      // Touching rule: no ship in cell or adjacent 8 cells
      for (const ship of ships) {
        for (const sCell of ship.cells) {
          const dx = Math.abs(COLS.indexOf(cell.x) - COLS.indexOf(sCell.x));
          const dy = Math.abs(ROWS.indexOf(cell.y) - ROWS.indexOf(sCell.y));
          if (dx <= 1 && dy <= 1) return null; // Too close or overlapping
        }
      }
    }

    return cells;
  };

  const handleCellClick = (x: number, y: number) => {
    if (!currentShipSize) return;
    
    // Check if we still have this ship type available
    const shipType = SHIP_TYPES.find(s => s.size === currentShipSize);
    const alreadyPlaced = placedShips.filter(s => s.size === currentShipSize).length;
    if (shipType && alreadyPlaced >= shipType.count) {
      toast.error('Ebből a hajóból már minden darabot elhelyeztél!');
      return;
    }

    const cells = isValidPlacement(x, y, currentShipSize, orientation, placedShips);
    if (!cells) {
      toast.error('Ide nem helyezheted a hajót! (Figyelj az érintkezési szabályra)');
      return;
    }

    setPlacedShips([...placedShips, { size: currentShipSize, orientation, cells }]);
    
    // If all ships of this type placed, move to next type or null
    const newRemaining = shipType!.count - (alreadyPlaced + 1);
    if (newRemaining === 0) {
      const nextType = SHIP_TYPES.find(t => {
        const pCount = [...placedShips, { size: currentShipSize }].filter(s => s.size === t.size).length;
        return t.count > pCount;
      });
      setCurrentShipSize(nextType ? nextType.size : null);
    }
  };

  const handleRandomize = () => {
    let newShips: any[] = [];
    const allShipSizes = SHIP_TYPES.flatMap(t => Array(t.count).fill(t.size)).sort((a,b) => b-a);
    
    for (const size of allShipSizes) {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        const x = COLS[Math.floor(Math.random() * COLS.length)];
        const y = ROWS[Math.floor(Math.random() * ROWS.length)];
        const orient = Math.random() > 0.5 ? 'h' : 'v';
        const cells = isValidPlacement(x, y, size, orient, newShips);
        if (cells) {
          newShips.push({ size, orientation: orient, cells });
          placed = true;
        }
        attempts++;
      }
      if (!placed) {
        // Retry whole randomization if stuck
        handleRandomize();
        return;
      }
    }
    setPlacedShips(newShips);
    setCurrentShipSize(null);
  };

  const isAllPlaced = getRemainingShips().every(s => s.remaining === 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Placement Board */}
      <div className="flex-1 flex flex-col items-center">
        <Card className="p-6 sm:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border-slate-200 dark:border-slate-800 relative overflow-visible">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          <div className="flex items-center">
            {/* Y-Axis Labels aligned to grid lines */}
            <div className="relative h-[280px] w-8 mr-3 sm:h-[360px] sm:mr-4">
              {ROWS.map((r, i) => (
                <div 
                  key={r} 
                  className="absolute text-[10px] font-black text-slate-400 w-full text-right pr-2 leading-none"
                  style={{ top: `${(i / 10) * 100}%`, transform: 'translateY(-50%)' }}
                >
                  {r}
                </div>
              ))}
            </div>

            {/* Grid and X-Axis Labels */}
            <div className="flex flex-col">
              {/* Responsive Grid Container */}
              <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] relative bg-slate-50 dark:bg-slate-950/20 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-inner overflow-visible">
                {/* 10x10 cell lines grid */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none p-0">
                  {Array.from({ length: 100 }).map((_, idx) => {
                    const col = idx % 10;
                    const row = Math.floor(idx / 10);
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "border-slate-200/50 dark:border-slate-800/40",
                          col < 9 && "border-r",
                          row < 9 && "border-b"
                        )}
                      />
                    );
                  })}
                </div>

                {/* Major Axes lines representing 0 (Centered) with arrowheads */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2.5px] bg-slate-400 dark:bg-slate-600 -translate-x-1/2 z-10 pointer-events-none overflow-visible">
                  <svg className="absolute top-[-9px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 text-slate-400 dark:text-slate-600 fill-current" viewBox="0 0 10 10">
                    <polygon points="0,10 5,0 10,10" />
                  </svg>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-[2.5px] bg-slate-400 dark:bg-slate-600 -translate-y-1/2 z-10 pointer-events-none overflow-visible">
                  <svg className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-400 dark:text-slate-600 fill-current" viewBox="0 0 10 10">
                    <polygon points="0,0 10,5 0,10" />
                  </svg>
                </div>

                {/* Render Placed Ships as connecting lines/capsules */}
                {placedShips.map((ship, idx) => {
                  const { left, top, width, height } = getShipLineCoordinates(ship);
                  const isHorizontal = ship.orientation === 'h';
                  return (
                    <div 
                      key={idx}
                      className="absolute bg-indigo-600/90 dark:bg-indigo-500/90 border border-indigo-400 dark:border-indigo-600 rounded-full z-15 shadow-lg flex items-center justify-center transition-all duration-300 pointer-events-none"
                      style={{
                        left,
                        top,
                        width: isHorizontal ? `calc(${width} + 18px)` : '16px',
                        height: isHorizontal ? '16px' : `calc(${height} + 18px)`,
                        transform: isHorizontal ? 'translate(-9px, -50%)' : 'translate(-50%, -9px)'
                      }}
                    />
                  );
                })}

                {/* Render Placement Hover Preview */}
                {(() => {
                  if (!hoveredPoint || !currentShipSize) return null;
                  const previewCells = isValidPlacement(hoveredPoint.x, hoveredPoint.y, currentShipSize, orientation, placedShips);
                  if (!previewCells) return null;

                  const xs = previewCells.map(c => c.x);
                  const ys = previewCells.map(c => c.y);
                  const minX = Math.min(...xs);
                  const maxX = Math.max(...xs);
                  const minY = Math.min(...ys);
                  const maxY = Math.max(...ys);

                  const startColIdx = COLS.indexOf(minX);
                  const endColIdx = COLS.indexOf(maxX);
                  const startRowIdx = ROWS.indexOf(maxY);
                  const endRowIdx = ROWS.indexOf(minY);

                  const left = `${(startColIdx / 10) * 100}%`;
                  const top = `${(startRowIdx / 10) * 100}%`;
                  const width = `${((endColIdx - startColIdx) / 10) * 100}%`;
                  const height = `${((endRowIdx - startRowIdx) / 10) * 100}%`;
                  
                  const isHorizontal = orientation === 'h';

                  return (
                    <div 
                      className="absolute bg-emerald-500/30 border-2 border-dashed border-emerald-500 rounded-full z-15 animate-pulse pointer-events-none"
                      style={{
                        left,
                        top,
                        width: isHorizontal ? `calc(${width} + 18px)` : '16px',
                        height: isHorizontal ? '16px' : `calc(${height} + 18px)`,
                        transform: isHorizontal ? 'translate(-9px, -50%)' : 'translate(-50%, -9px)'
                      }}
                    />
                  );
                })()}

                {/* Interactive Points at Grid Line Intersections */}
                {ROWS.map((y, rowIdx) => (
                  COLS.map((x, colIdx) => {
                    const left = `${(colIdx / 10) * 100}%`;
                    const top = `${(rowIdx / 10) * 100}%`;
                    
                    const isOccupied = placedShips.some(s => s.cells.some((c: any) => c.x === x && c.y === y));
                    
                    // Determine if point is part of preview cells
                    const previewCells = hoveredPoint && currentShipSize
                      ? isValidPlacement(hoveredPoint.x, hoveredPoint.y, currentShipSize, orientation, placedShips)
                      : null;
                    const isPreview = previewCells?.some((c: any) => c.x === x && c.y === y);

                    return (
                      <button
                        key={`${x}-${y}`}
                        onClick={() => handleCellClick(x, y)}
                        onMouseEnter={() => setHoveredPoint({ x, y })}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="absolute w-8 h-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20 group outline-none"
                        style={{ left, top }}
                      >
                        {isOccupied ? (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 scale-100 group-hover:scale-110 transition-transform">
                            <Anchor size={10} />
                          </div>
                        ) : isPreview ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-md shadow-emerald-500/30 animate-pulse" />
                        ) : (
                          // Faint interactive dot for intersections
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:w-3.5 group-hover:h-3.5 group-hover:bg-indigo-500 group-hover:border-2 group-hover:border-white dark:group-hover:border-slate-900 group-hover:shadow-md group-hover:shadow-indigo-500/30 transition-all duration-150" />
                        )}
                      </button>
                    );
                  })
                ))}
              </div>

              {/* X-Axis Labels aligned to grid lines */}
              <div className="relative w-[280px] h-6 mt-3 sm:w-[360px] sm:mt-4">
                {COLS.map((c, i) => (
                  <div 
                    key={c} 
                    className="absolute text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none"
                    style={{ left: `${(i / 10) * 100}%`, transform: 'translateX(-50%)' }}
                  >
                    {axisType === 'letter' ? LETTERS[i] : c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Origin help */}
        <div className="mt-6 flex items-center gap-4 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
           <Info size={18} className="text-indigo-600" />
           <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
             Középpontos koordináta-rendszer: a vízszintes és függőleges vonalak metszéspontja az origó.
           </p>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <Card className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2 italic">
            <Anchor className="text-indigo-600" />
            FLOTTA <span className="text-indigo-600">ÖSSZEÁLLÍTÁSA</span>
          </h3>

          <div className="space-y-4 mb-8">
            {getRemainingShips().map(ship => (
              <button
                key={ship.size}
                onClick={() => setCurrentShipSize(ship.size)}
                disabled={ship.remaining === 0}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all group",
                  currentShipSize === ship.size 
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-md scale-[1.02]" 
                    : ship.remaining === 0 
                      ? "border-slate-100 dark:border-slate-800 opacity-40 bg-slate-50 dark:bg-slate-800/50 grayscale" 
                      : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-3 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-400 transition-colors",
                    currentShipSize === ship.size && "bg-indigo-600"
                  )} style={{ width: ship.size * 12 }} />
                  <span className="font-bold text-sm tracking-tight">{ship.label}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-xs font-black px-2 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                     {ship.remaining} db
                   </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setOrientation(orientation === 'h' ? 'v' : 'h')}
              className="flex-1 h-12 rounded-2xl gap-2 font-bold border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <RotateCw size={18} className={cn("transition-transform duration-300", orientation === 'v' && "rotate-90")} />
              {orientation === 'h' ? 'Vízszintes' : 'Függőleges'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { setPlacedShips([]); setCurrentShipSize(4); }}
              className="h-12 w-12 p-0 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <Trash2 size={20} />
            </Button>
          </div>

          <Button 
            variant="outline" 
            onClick={handleRandomize}
            className="w-full h-12 rounded-2xl gap-3 font-black italic border-2 border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 mb-3"
          >
            <Dices size={20} />
            GYORS ELHELYEZÉS
          </Button>

          <Button 
            disabled={!isAllPlaced}
            onClick={() => onComplete(placedShips)}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black italic text-lg shadow-xl shadow-indigo-500/30 gap-3 group"
          >
            <Play size={20} className="group-hover:translate-x-1 transition-transform" />
            CSATÁBA!
          </Button>
        </Card>

        {/* Legend Card */}
        <Card className="p-5 rounded-[2rem] bg-indigo-600 text-white shadow-xl">
           <div className="flex items-center gap-3 mb-3">
              <Settings2 size={20} />
              <h4 className="font-bold uppercase tracking-widest text-xs">Információ</h4>
           </div>
           <ul className="text-[11px] font-medium space-y-2 opacity-90 italic">
              <li>• Kattints egy cellára a hajó elhelyezéséhez.</li>
              <li>• Használd a 'Vízszintes/Függőleges' gombot az irány váltásához.</li>
              <li>• A hajók nem érhetnek egymáshoz, még átlósan sem!</li>
              <li>• Elindítás előtt minden hajót el kell helyezned.</li>
           </ul>
        </Card>
      </div>
    </div>
  );
}
