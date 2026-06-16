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
  { size: 4, count: 1, label: 'Csatahajó', sublabel: '(4 mező)' },
  { size: 3, count: 2, label: 'Cirkáló', sublabel: '(3 mező)' },
  { size: 2, count: 3, label: 'Romboló', sublabel: '(2 mező)' },
  { size: 1, count: 4, label: 'Tengeralattjáró', sublabel: '(1 mező)' },
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
    return SHIP_TYPES.map(type => {
      const placedCount = placedShips.filter(s => s.size === type.size).length;
      return { ...type, remaining: type.count - placedCount };
    });
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

    for (const cell of cells) {
      for (const ship of ships) {
        for (const sCell of ship.cells) {
          const dx = Math.abs(COLS.indexOf(cell.x) - COLS.indexOf(sCell.x));
          const dy = Math.abs(ROWS.indexOf(cell.y) - ROWS.indexOf(sCell.y));
          if (dx <= 1 && dy <= 1) return null;
        }
      }
    }

    return cells;
  };

  const handleCellClick = (x: number, y: number) => {
    if (!currentShipSize) return;
    
    const shipType = SHIP_TYPES.find(s => s.size === currentShipSize);
    const alreadyPlaced = placedShips.filter(s => s.size === currentShipSize).length;
    if (shipType && alreadyPlaced >= shipType.count) {
      toast.error('Ebből a hajóból már minden darabot elhelyeztél!');
      return;
    }

    const cells = isValidPlacement(x, y, currentShipSize, orientation, placedShips);
    if (!cells) {
      toast.error('Ide nem helyezheted a hajót!');
      return;
    }

    setPlacedShips([...placedShips, { size: currentShipSize, orientation, cells }]);
    
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
        handleRandomize();
        return;
      }
    }
    setPlacedShips(newShips);
    setCurrentShipSize(null);
  };

  const isAllPlaced = getRemainingShips().every(s => s.remaining === 0);
  const totalPlaced = placedShips.length;
  const totalNeeded = SHIP_TYPES.reduce((a, t) => a + t.count, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* ── Placement Board ── */}
      <div className="flex-1 flex flex-col items-center">
        <Card className="p-4 sm:p-6 md:p-10 rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl border-slate-200 dark:border-slate-800 relative overflow-visible w-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-[2rem]" />
          
          <div className="flex items-center justify-center">
            {/* Y-Axis Labels */}
            <div className="relative mr-2 sm:mr-3 md:mr-4"
              style={{ 
                height: 'min(78vw, 360px)',
                width: '1.5rem'
              }}
            >
              {ROWS.map((r, i) => (
                <div 
                  key={r} 
                  className="absolute text-[10px] font-black text-slate-400 w-full text-right pr-1 leading-none"
                  style={{ top: `${(i / 10) * 100}%`, transform: 'translateY(-50%)' }}
                >
                  {r}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex flex-col">
              {/* Responsive square grid using CSS min() */}
              <div 
                className="relative bg-slate-50 dark:bg-slate-950/20 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-inner overflow-visible"
                style={{ width: 'min(78vw, 360px)', height: 'min(78vw, 360px)' }}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
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

                {/* Axes */}
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

                {/* Placed ships */}
                {placedShips.map((ship, idx) => {
                  const { left, top, width, height } = getShipLineCoordinates(ship);
                  const isHorizontal = ship.orientation === 'h';
                  return (
                    <div 
                      key={idx}
                      className="absolute bg-indigo-600/90 dark:bg-indigo-500/90 border border-indigo-400 dark:border-indigo-600 rounded-full z-15 shadow-lg pointer-events-none transition-all duration-300"
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

                {/* Hover preview */}
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

                {/* Interactive points */}
                {ROWS.map((y, rowIdx) => (
                  COLS.map((x, colIdx) => {
                    const left = `${(colIdx / 10) * 100}%`;
                    const top = `${(rowIdx / 10) * 100}%`;
                    
                    const isOccupied = placedShips.some(s => s.cells.some((c: any) => c.x === x && c.y === y));
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
                        onTouchStart={() => setHoveredPoint({ x, y })}
                        className="absolute w-8 h-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20 group outline-none"
                        style={{ left, top }}
                      >
                        {isOccupied ? (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                            <Anchor size={9} />
                          </div>
                        ) : isPreview ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-md shadow-emerald-500/30 animate-pulse" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:w-3.5 group-hover:h-3.5 group-hover:bg-indigo-500 group-hover:border-2 group-hover:border-white dark:group-hover:border-slate-900 group-hover:shadow-md group-hover:shadow-indigo-500/30 transition-all duration-150" />
                        )}
                      </button>
                    );
                  })
                ))}
              </div>

              {/* X-Axis labels */}
              <div 
                className="relative mt-2 sm:mt-3 h-6"
                style={{ width: 'min(78vw, 360px)' }}
              >
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

        {/* Hint card */}
        <div className="mt-4 flex items-center gap-3 px-5 py-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 w-full max-w-[min(78vw+60px,420px)]">
          <Info size={16} className="text-indigo-600 shrink-0" />
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Középpontos koordináta-rendszer: az origó a rácsok középpontjában van.
          </p>
        </div>
      </div>

      {/* ── Controls Panel ── */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        
        {/* Progress bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${(totalPlaced / totalNeeded) * 100}%` }}
            />
          </div>
          <span className="text-xs font-black text-slate-500 shrink-0">{totalPlaced}/{totalNeeded} hajó</span>
        </div>

        <Card className="p-4 md:p-6 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl border-slate-200 dark:border-slate-800">
          <h3 className="text-lg md:text-xl font-black mb-4 md:mb-6 flex items-center gap-2 italic">
            <Anchor className="text-indigo-600" size={20} />
            FLOTTA <span className="text-indigo-600">ÖSSZEÁLLÍTÁSA</span>
          </h3>

          {/* Ship type selector – 2-column grid on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 mb-5">
            {getRemainingShips().map(ship => (
              <button
                key={ship.size}
                onClick={() => setCurrentShipSize(ship.size)}
                disabled={ship.remaining === 0}
                className={cn(
                  "p-3 rounded-2xl border-2 flex items-center justify-between transition-all group text-left",
                  currentShipSize === ship.size 
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-md scale-[1.02]" 
                    : ship.remaining === 0 
                      ? "border-slate-100 dark:border-slate-800 opacity-40 bg-slate-50 dark:bg-slate-800/50 grayscale" 
                      : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                )}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className={cn(
                    "h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-400 transition-colors shrink-0",
                    currentShipSize === ship.size && "bg-indigo-600"
                  )} style={{ width: ship.size * 10 }} />
                  <span className="font-bold text-xs tracking-tight truncate">{ship.label}</span>
                  <span className="text-[10px] text-slate-400">{ship.sublabel}</span>
                </div>
                <span className="text-xs font-black px-2 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 shrink-0 ml-2">
                  {ship.remaining}×
                </span>
              </button>
            ))}
          </div>

          {/* Orientation + Clear */}
          <div className="flex gap-2 mb-3">
            <Button 
              variant="outline" 
              onClick={() => setOrientation(orientation === 'h' ? 'v' : 'h')}
              className="flex-1 h-11 rounded-2xl gap-2 font-bold border-2 border-slate-100 dark:border-slate-800 text-sm"
            >
              <RotateCw size={16} className={cn("transition-transform duration-300", orientation === 'v' && "rotate-90")} />
              {orientation === 'h' ? 'Vízszintes' : 'Függőleges'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => { setPlacedShips([]); setCurrentShipSize(4); }}
              className="h-11 w-11 p-0 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 shrink-0"
            >
              <Trash2 size={18} />
            </Button>
          </div>

          {/* Random placement */}
          <Button 
            variant="outline" 
            onClick={handleRandomize}
            className="w-full h-11 rounded-2xl gap-2 font-black italic border-2 border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 mb-3 text-sm"
          >
            <Dices size={18} />
            GYORS ELHELYEZÉS
          </Button>

          {/* Start battle – sticky on mobile */}
          <Button 
            disabled={!isAllPlaced}
            onClick={() => onComplete(placedShips)}
            className="w-full h-13 md:h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black italic text-base md:text-lg shadow-xl shadow-indigo-500/30 gap-3 group transition-all"
          >
            <Play size={18} className="group-hover:translate-x-1 transition-transform" />
            CSATÁBA!
          </Button>
        </Card>

        {/* Info card */}
        <Card className="p-4 md:p-5 rounded-[2rem] bg-indigo-600 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Settings2 size={18} />
            <h4 className="font-bold uppercase tracking-widest text-xs">Szabályok</h4>
          </div>
          <ul className="text-[11px] font-medium space-y-1.5 opacity-90 italic">
            <li>• Kattints (vagy érintsd) a kívánt pontra a hajó elhelyezéséhez.</li>
            <li>• Forgass a 'Vízszintes/Függőleges' gombbal.</li>
            <li>• Hajók nem érhetnek egymáshoz, még átlósan sem!</li>
            <li>• Minden hajót el kell helyezned az induláshoz.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
