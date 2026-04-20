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

const COLS = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
const ROWS = [5, 4, 3, 2, 1, -1, -2, -3, -4, -5];

const LETTERS = ['-E', '-D', '-C', '-B', '-A', 'A', 'B', 'C', 'D', 'E'];

export default function TorpedoPlacement({ onComplete, axisType }: TorpedoPlacementProps) {
  const [placedShips, setPlacedShips] = useState<any[]>([]);
  const [currentShipSize, setCurrentShipSize] = useState<number | null>(null);
  const [orientation, setOrientation] = useState<'h' | 'v'>('h');

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
        <Card className="p-4 sm:p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Legend / Axes */}
          <div className="grid grid-cols-[30px_repeat(10,1fr)] gap-1 mb-1">
             <div />
             {COLS.map((c, i) => (
               <div key={c} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                 {axisType === 'letter' ? LETTERS[i] : c}
               </div>
             ))}
          </div>

          <div className="flex gap-1">
            <div className="flex flex-col gap-1 pr-1">
              {ROWS.map(r => (
                <div key={r} className="h-8 sm:h-10 flex items-center justify-center text-[10px] font-black text-slate-400 w-6">
                  {r}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-10 gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800/50 p-1 sm:p-2 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-inner">
              {ROWS.map(y => (
                COLS.map(x => {
                  const isOccupied = placedShips.some(s => s.cells.some((c: any) => c.x === x && c.y === y));
                  const isCurrentValid = currentShipSize && isValidPlacement(x, y, currentShipSize, orientation, placedShips);
                  
                  return (
                    <button
                      key={`${x}-${y}`}
                      onClick={() => handleCellClick(x, y)}
                      className={cn(
                        "w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 flex items-center justify-center relative group",
                        isOccupied 
                          ? "bg-indigo-600 text-white shadow-lg scale-90 ring-4 ring-indigo-500/20" 
                          : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      )}
                    >
                      {isOccupied && <Anchor size={16} className="animate-in fade-in zoom-in" />}
                      {!isOccupied && isCurrentValid && (
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-lg border-2 border-emerald-500/30 opacity-0 group-hover:opacity-100" />
                      )}
                    </button>
                  );
                })
              ))}
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
