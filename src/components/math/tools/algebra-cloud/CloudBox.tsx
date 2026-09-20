import React, { useState } from 'react';
import { CloudContainer, CloudItem, RepresentationMode } from './types';
import { CloudItemComponent, DraggedCloudItemPayload } from './CloudItemComponent';
import { formatCloudExpression } from './data';
import {
  Sparkles,
  Layers,
  Copy,
  Trash2,
  Plus,
  Minus,
  Maximize2,
  Flame,
  CheckCircle2,
  Divide,
  X,
  RefreshCw,
  Zap,
  Scissors
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CloudBoxProps {
  cloud: CloudContainer;
  index: number;
  totalClouds: number;
  mode: RepresentationMode;
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdateCloud: (updated: CloudContainer) => void;
  onRemoveCloud?: (id: string) => void;
  onDuplicateCloud?: (id: string) => void;
  onAnimateAction?: (actionName: string) => void;
  onTransferItemBetweenClouds?: (sourceCloudId: string, targetCloudId: string, item: CloudItem) => void;
  onDropPaletteItemIntoCloud?: (cloudId: string, symbol: string, emoji?: string, label?: string, type?: 'variable' | 'constant', coeff?: number) => void;
}

export const CloudBox: React.FC<CloudBoxProps> = ({
  cloud,
  index,
  totalClouds,
  mode,
  isSelected,
  onSelect,
  onUpdateCloud,
  onRemoveCloud,
  onDuplicateCloud,
  onAnimateAction,
  onTransferItemBetweenClouds,
  onDropPaletteItemIntoCloud,
}) => {
  const [animatingAction, setAnimatingAction] = useState<string | null>(null);
  const [isDragOverCloud, setIsDragOverCloud] = useState(false);
  const [selectedPairItemId, setSelectedPairItemId] = useState<string | null>(null);

  const triggerAnimation = (name: string) => {
    setAnimatingAction(name);
    if (onAnimateAction) onAnimateAction(name);
    setTimeout(() => setAnimatingAction(null), 800);
  };

  // 1. Remove individual item
  const handleRemoveItem = (itemId: string) => {
    onUpdateCloud({
      ...cloud,
      items: cloud.items.filter(i => i.id !== itemId)
    });
  };

  // 2. Split a fused item into 1-units
  const handleSplitItem = (itemId: string) => {
    const target = cloud.items.find(i => i.id === itemId);
    if (!target || Math.abs(target.coefficient) <= 1) return;

    const absCount = Math.abs(target.coefficient);
    const sign = target.coefficient < 0 ? -1 : 1;
    const newItems: CloudItem[] = [];

    for (let k = 0; k < absCount; k++) {
      newItems.push({
        ...target,
        id: `split-${Date.now()}-${k}-${Math.random()}`,
        coefficient: sign * 1,
        isFusedBlock: false,
        fusedSize: 1,
      });
    }

    onUpdateCloud({
      ...cloud,
      items: cloud.items.flatMap(i => (i.id === itemId ? newItems : [i]))
    });
    triggerAnimation('split');
  };

  // 3. Increment item coefficient
  const handleIncrementItem = (itemId: string) => {
    onUpdateCloud({
      ...cloud,
      items: cloud.items.map(i => {
        if (i.id === itemId) {
          return { ...i, coefficient: i.coefficient + 1 };
        }
        return i;
      })
    });
  };

  // 4. Decrement item coefficient
  const handleDecrementItem = (itemId: string) => {
    onUpdateCloud({
      ...cloud,
      items: cloud.items
        .map(i => {
          if (i.id === itemId) {
            return { ...i, coefficient: i.coefficient - 1 };
          }
          return i;
        })
        .filter(i => i.coefficient !== 0)
    });
  };

  // 5. Operation: Combine Like Terms (Összevonás)
  const handleCombineLikeTerms = () => {
    if (cloud.items.length === 0) return;

    const grouped = new Map<string, CloudItem>();

    cloud.items.forEach(item => {
      const key = item.symbol;
      const existing = grouped.get(key);

      if (existing) {
        existing.coefficient += item.coefficient;
      } else {
        grouped.set(key, { ...item, id: `comb-${Date.now()}-${key}` });
      }
    });

    const combinedList = Array.from(grouped.values()).filter(i => i.coefficient !== 0);

    onUpdateCloud({
      ...cloud,
      items: combinedList
    });
    triggerAnimation('combine');
  };

  // 6. Operation: Zero Pairs Cancellation (Nullapárok Kiejtése)
  const handleZeroPairs = () => {
    const grouped = new Map<string, { pos: number; neg: number; template: CloudItem }>();

    cloud.items.forEach(item => {
      const key = item.symbol;
      const cur = grouped.get(key) || { pos: 0, neg: 0, template: item };
      if (item.coefficient > 0) cur.pos += item.coefficient;
      else cur.neg += Math.abs(item.coefficient);
      grouped.set(key, cur);
    });

    const newItems: CloudItem[] = [];
    grouped.forEach((val, key) => {
      const net = val.pos - val.neg;
      if (net !== 0) {
        newItems.push({
          ...val.template,
          id: `zp-${Date.now()}-${key}`,
          coefficient: net,
        });
      }
    });

    onUpdateCloud({
      ...cloud,
      items: newItems
    });
    triggerAnimation('zero_pairs');
  };

  // 7. Operation: Expand Brackets (Zárójel Felbontása / Beszorzás)
  const handleExpandBrackets = () => {
    if (cloud.multiplier === 1) return;

    const mult = cloud.multiplier;
    const expandedItems = cloud.items.map(i => ({
      ...i,
      coefficient: i.coefficient * mult,
    }));

    onUpdateCloud({
      ...cloud,
      multiplier: 1,
      items: expandedItems,
    });
    triggerAnimation('expand');
  };

  // 8. Operation: Factor Out Common Factor (Kiemelés)
  const handleFactorOut = () => {
    if (cloud.items.length === 0) return;

    const gcd = (a: number, b: number): number => {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a;
    };

    const coeffs = cloud.items.map(i => Math.abs(i.coefficient)).filter(c => c > 0);
    if (coeffs.length === 0) return;

    let commonGcd = coeffs[0];
    for (let i = 1; i < coeffs.length; i++) {
      commonGcd = gcd(commonGcd, coeffs[i]);
    }

    if (commonGcd > 1) {
      const factoredItems = cloud.items.map(i => ({
        ...i,
        coefficient: i.coefficient / commonGcd,
      }));

      onUpdateCloud({
        ...cloud,
        multiplier: cloud.multiplier * commonGcd,
        items: factoredItems,
      });
      triggerAnimation('factor');
    }
  };

  // 9. CORE DRAG & DROP: Dropping Item A onto Item B
  const handleItemDropOnItem = (dragged: DraggedCloudItemPayload, target: CloudItem, targetCloudId: string) => {
    if (dragged.item.id === target.id) return; // Dropped on itself

    const draggedItem = dragged.item;
    const isSameCloud = dragged.sourceCloudId === targetCloudId;

    if (draggedItem.symbol === target.symbol) {
      const sumCoeff = draggedItem.coefficient + target.coefficient;

      if (sumCoeff === 0) {
        // ZERO PAIR: Complete Cancellation!
        if (isSameCloud) {
          onUpdateCloud({
            ...cloud,
            items: cloud.items.filter(i => i.id !== draggedItem.id && i.id !== target.id)
          });
        } else if (onTransferItemBetweenClouds) {
          // Remove from source, remove target from current cloud
          onTransferItemBetweenClouds(dragged.sourceCloudId, targetCloudId, draggedItem);
          onUpdateCloud({
            ...cloud,
            items: cloud.items.filter(i => i.id !== target.id)
          });
        }
        triggerAnimation('zero_pairs');
      } else {
        // MERGE or Partial Cancellation!
        const updatedTarget: CloudItem = {
          ...target,
          coefficient: sumCoeff,
          isFusedBlock: Math.abs(sumCoeff) > 1,
          fusedSize: Math.abs(sumCoeff),
        };

        if (isSameCloud) {
          onUpdateCloud({
            ...cloud,
            items: cloud.items
              .filter(i => i.id !== draggedItem.id)
              .map(i => i.id === target.id ? updatedTarget : i)
          });
        }
        triggerAnimation((draggedItem.coefficient > 0 && target.coefficient < 0) || (draggedItem.coefficient < 0 && target.coefficient > 0) ? 'zero_pairs' : 'combine');
      }
    } else {
      // Different symbols: if from another cloud, transfer item
      if (!isSameCloud && onTransferItemBetweenClouds) {
        onTransferItemBetweenClouds(dragged.sourceCloudId, targetCloudId, draggedItem);
      }
    }
  };

  // 10. Click-to-Pair (Alternative for touch/smartboards)
  const handleClickItem = (clickedItem: CloudItem) => {
    if (!selectedPairItemId) {
      setSelectedPairItemId(clickedItem.id);
      return;
    }

    if (selectedPairItemId === clickedItem.id) {
      setSelectedPairItemId(null);
      return;
    }

    const firstItem = cloud.items.find(i => i.id === selectedPairItemId);
    setSelectedPairItemId(null);

    if (firstItem && firstItem.symbol === clickedItem.symbol) {
      handleItemDropOnItem({ sourceCloudId: cloud.id, item: firstItem }, clickedItem, cloud.id);
    }
  };

  // 11. Drop on Cloud Container itself (from Palette or another Cloud)
  const handleCloudDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOverCloud) setIsDragOverCloud(true);
  };

  const handleCloudDragLeave = () => {
    setIsDragOverCloud(false);
  };

  const handleCloudDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCloud(false);

    try {
      // 1. Check if dropped from palette
      const paletteData = e.dataTransfer.getData('application/palette-item');
      if (paletteData && onDropPaletteItemIntoCloud) {
        const item = JSON.parse(paletteData);
        onDropPaletteItemIntoCloud(cloud.id, item.symbol, item.emoji, item.label, item.type, item.coefficient);
        triggerAnimation('combine');
        return;
      }

      // 2. Check if dropped from another cloud
      const cloudItemData = e.dataTransfer.getData('application/json');
      if (cloudItemData && onTransferItemBetweenClouds) {
        const payload: DraggedCloudItemPayload = JSON.parse(cloudItemData);
        if (payload.item && payload.sourceCloudId !== cloud.id) {
          onTransferItemBetweenClouds(payload.sourceCloudId, cloud.id, payload.item);
          triggerAnimation('combine');
        }
      }
    } catch (err) {
      console.error('Failed to handle cloud drop', err);
    }
  };

  // Check if zero pairs exist in the cloud
  const hasZeroPairs = (() => {
    let hasPos = false;
    let hasNeg = false;
    cloud.items.forEach(i => {
      if (i.coefficient > 0) hasPos = true;
      if (i.coefficient < 0) hasNeg = true;
    });
    return hasPos && hasNeg;
  })();

  // Current math expression string
  const exprString = formatCloudExpression(cloud, mode);

  return (
    <div
      onClick={onSelect}
      onDragOver={handleCloudDragOver}
      onDragLeave={handleCloudDragLeave}
      onDrop={handleCloudDrop}
      className={cn(
        "relative flex flex-col rounded-3xl transition-all duration-300 backdrop-blur-md select-none",
        "bg-gradient-to-b from-sky-50/90 via-blue-50/60 to-indigo-50/80 dark:from-slate-850 dark:via-slate-900 dark:to-indigo-950/40",
        "border-2 border-sky-200/80 dark:border-slate-700 shadow-md hover:shadow-lg",
        isSelected && "ring-4 ring-primary/40 border-primary shadow-primary/10",
        isDragOverCloud && "ring-4 ring-sky-400 border-sky-400 bg-sky-100/70 scale-[1.01]",
        animatingAction === 'combine' && "animate-pulse ring-4 ring-emerald-400 border-emerald-400",
        animatingAction === 'zero_pairs' && "ring-4 ring-amber-400 border-amber-400",
        animatingAction === 'expand' && "ring-4 ring-indigo-500 border-indigo-500",
        animatingAction === 'factor' && "ring-4 ring-purple-500 border-purple-500"
      )}
    >
      {/* Decorative Cloud Top Bubbles */}
      <div className="absolute -top-3 left-6 w-12 h-6 bg-sky-100/80 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />
      <div className="absolute -top-4 left-14 w-16 h-8 bg-sky-100/90 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />
      <div className="absolute -top-3 right-10 w-14 h-6 bg-sky-100/80 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />

      {/* Cloud Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-sky-100/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xl">☁️</span>
          <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">
            {cloud.title}
          </span>
          {isSelected && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary text-white uppercase tracking-wider">
              Aktív
            </span>
          )}
        </div>

        {/* Multiplier controller */}
        <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-800 px-2 py-0.5 rounded-xl border border-sky-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400">Szorzó:</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCloud({ ...cloud, multiplier: Math.max(1, cloud.multiplier - 1) });
            }}
            disabled={cloud.multiplier <= 1}
            className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold disabled:opacity-40 cursor-pointer"
            title="Szorzó csökkentése"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <span className={cn(
            "text-xs font-black font-mono px-1 rounded",
            cloud.multiplier > 1 ? "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300" : "text-slate-700 dark:text-slate-200"
          )}>
            {cloud.multiplier}·
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCloud({ ...cloud, multiplier: cloud.multiplier + 1 });
            }}
            className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold cursor-pointer"
            title="Szorzó növelése"
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Cloud top controls */}
        <div className="flex items-center gap-1">
          {onDuplicateCloud && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicateCloud(cloud.id);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Felhő másolása"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCloud({ ...cloud, items: [] });
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Felhő kiürítése"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          {totalClouds > 1 && onRemoveCloud && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCloud(cloud.id);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Felhő törlése"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Cloud Main Content Area / Drag & Drop Items Grid */}
      <div className="p-3.5 min-h-[130px] max-h-[220px] flex-1 overflow-y-auto flex flex-wrap content-start gap-2">
        {cloud.items.length === 0 ? (
          <div className="w-full h-28 flex flex-col items-center justify-center text-center p-3 border-2 border-dashed border-sky-200 dark:border-slate-700/80 rounded-2xl bg-white/40 dark:bg-slate-800/30 pointer-events-none">
            <span className="text-2xl mb-0.5 opacity-60">☁️</span>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              A felhő üres
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Kattints az elemekre vagy húzd be őket ide!
            </p>
          </div>
        ) : (
          cloud.items.map((item) => (
            <CloudItemComponent
              key={item.id}
              item={item}
              cloudId={cloud.id}
              mode={mode}
              onRemove={handleRemoveItem}
              onSplit={handleSplitItem}
              onIncrement={handleIncrementItem}
              onDecrement={handleDecrementItem}
              isAnimating={animatingAction !== null}
              isSelectedForPairing={selectedPairItemId === item.id}
              onClickItem={handleClickItem}
              onItemDropOnItem={handleItemDropOnItem}
            />
          ))
        )}
      </div>

      {/* Cloud Operations Toolbar */}
      <div className="px-3.5 py-2 bg-white/60 dark:bg-slate-900/60 border-t border-sky-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleCombineLikeTerms();
          }}
          disabled={cloud.items.length === 0}
          className="h-7 px-2 text-[11px] font-bold gap-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 cursor-pointer"
          title="Egynemű tagok összeadása"
        >
          <Sparkles className="w-3 h-3" />
          Összevonás
        </Button>

        {hasZeroPairs && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleZeroPairs();
            }}
            className="h-7 px-2 text-[11px] font-bold gap-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 animate-pulse cursor-pointer"
            title="Pozitív és negatív ellentétek (+x és -x) semlegesítése"
          >
            <Zap className="w-3 h-3" />
            Nullapárok (0)
          </Button>
        )}

        {cloud.multiplier !== 1 && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleExpandBrackets();
            }}
            disabled={cloud.items.length === 0}
            className="h-7 px-2 text-[11px] font-bold gap-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 cursor-pointer"
            title="Beszorzás a szorzóval"
          >
            <Maximize2 className="w-3 h-3" />
            Zárójelfelbontás
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleFactorOut();
          }}
          disabled={cloud.items.length === 0}
          className="h-7 px-2 text-[11px] font-bold gap-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 cursor-pointer"
          title="Közös osztó kiemelése a zárójel elé"
        >
          <Layers className="w-3 h-3" />
          Kiemelés
        </Button>
      </div>

      {/* Live Math Display Bar */}
      <div className="px-4 py-1.5 bg-gradient-to-r from-sky-100/90 via-blue-100/70 to-indigo-100/90 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 rounded-b-3xl border-t border-sky-200/60 dark:border-slate-700/60 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400">Kifejezés:</span>
        <span className="font-mono font-black text-xs md:text-sm text-indigo-900 dark:text-indigo-200 tracking-wide">
          {exprString}
        </span>
      </div>
    </div>
  );
};
