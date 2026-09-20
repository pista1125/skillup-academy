import React, { useState } from 'react';
import { CloudItem, RepresentationMode } from './types';
import { X, Sparkles, Minus, Plus, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DraggedCloudItemPayload {
  sourceCloudId: string;
  item: CloudItem;
}

interface CloudItemComponentProps {
  item: CloudItem;
  cloudId: string;
  mode: RepresentationMode;
  onRemove?: (id: string) => void;
  onSplit?: (id: string) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  isAnimating?: boolean;
  isSelectedForPairing?: boolean;
  onClickItem?: (item: CloudItem) => void;
  onItemDropOnItem?: (dragged: DraggedCloudItemPayload, target: CloudItem, targetCloudId: string) => void;
}

export const CloudItemComponent: React.FC<CloudItemComponentProps> = ({
  item,
  cloudId,
  mode,
  onRemove,
  onSplit,
  onIncrement,
  onDecrement,
  isAnimating,
  isSelectedForPairing,
  onClickItem,
  onItemDropOnItem,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragActionType, setDragActionType] = useState<'zero_pair' | 'merge' | 'other' | null>(null);

  const isNegative = item.coefficient < 0;
  const absCoeff = Math.abs(item.coefficient);

  // Drag Start
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    const payload: DraggedCloudItemPayload = {
      sourceCloudId: cloudId,
      item
    };
    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'move';
  };

  // Drag Over & Enter
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const payload: DraggedCloudItemPayload = JSON.parse(dataStr);
        if (payload.item && payload.item.id !== item.id) {
          if (payload.item.symbol === item.symbol) {
            if ((payload.item.coefficient > 0 && item.coefficient < 0) || (payload.item.coefficient < 0 && item.coefficient > 0)) {
              setDragActionType('zero_pair');
            } else {
              setDragActionType('merge');
            }
            return;
          }
        }
      }
    } catch (err) {
      // ignore
    }
    setDragActionType('other');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragActionType(null);
  };

  // Drop onto this item
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragActionType(null);

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const payload: DraggedCloudItemPayload = JSON.parse(dataStr);
        if (payload.item && onItemDropOnItem) {
          onItemDropOnItem(payload, item, cloudId);
        }
      }
    } catch (err) {
      console.error('Failed to parse dropped item', err);
    }
  };

  // Click handler (for click-to-pair and selection)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClickItem) {
      onClickItem(item);
    }
  };

  // 1. Level 1: Concrete Single Emojis
  if (mode === 'concrete') {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "group relative flex items-center justify-center p-2.5 bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:scale-105 transition-all select-none cursor-grab active:cursor-grabbing backdrop-blur-sm",
          isNegative && "border-rose-400/80 bg-rose-50/90 dark:bg-rose-950/40 text-rose-700",
          isSelectedForPairing && "ring-4 ring-indigo-500 scale-110 shadow-lg",
          isDragOver && dragActionType === 'zero_pair' && "ring-4 ring-amber-400 bg-amber-50 scale-110 shadow-xl border-amber-400",
          isDragOver && dragActionType === 'merge' && "ring-4 ring-emerald-400 bg-emerald-50 scale-110 shadow-xl border-emerald-400",
          isAnimating && "animate-bounce ring-2 ring-primary"
        )}
        title="Fogd meg és húzd rá egy másik elemre, vagy kattints rá a párosításhoz!"
      >
        {/* Zero Pair / Merge floating hover badge */}
        {isDragOver && dragActionType === 'zero_pair' && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
            <Zap className="w-3 h-3 fill-current" />
            Kiejtés (0)!
          </div>
        )}
        {isDragOver && dragActionType === 'merge' && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
            <Sparkles className="w-3 h-3" />
            Összevonás!
          </div>
        )}

        <div className="flex items-center gap-1.5 pointer-events-none">
          {absCoeff > 1 && (
            <span className="text-xs font-black text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">
              {isNegative ? `-${absCoeff}` : absCoeff}
            </span>
          )}
          <span className="text-3xl filter drop-shadow-sm select-none">
            {item.emoji || '📦'}
          </span>
        </div>

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20 cursor-pointer"
            title="Törlés"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // 2. Level 2: Fused Multi-item Blocks (Összetapadt tömbök pl. 2-es almatömb)
  if (mode === 'concrete-fused') {
    const emojisArray = Array.from({ length: Math.min(absCoeff, 6) });
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "group relative flex flex-col items-center p-2 bg-gradient-to-b from-white/95 to-slate-50/90 dark:from-slate-800/95 dark:to-slate-900/90 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-primary/50 transition-all select-none cursor-grab active:cursor-grabbing backdrop-blur-sm",
          isNegative && "border-rose-300 bg-rose-50/80 dark:bg-rose-950/30",
          isSelectedForPairing && "ring-4 ring-indigo-500 scale-105 shadow-xl",
          isDragOver && dragActionType === 'zero_pair' && "ring-4 ring-amber-400 bg-amber-50 scale-110 shadow-xl border-amber-400",
          isDragOver && dragActionType === 'merge' && "ring-4 ring-emerald-400 bg-emerald-50 scale-110 shadow-xl border-emerald-400",
          isAnimating && "animate-pulse ring-2 ring-amber-400"
        )}
        title="Fogd meg és húzd rá egy másik elemre!"
      >
        {isDragOver && dragActionType === 'zero_pair' && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
            <Zap className="w-3 h-3 fill-current" />
            Kiejtés (0)!
          </div>
        )}
        {isDragOver && dragActionType === 'merge' && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
            <Sparkles className="w-3 h-3" />
            Összevonás!
          </div>
        )}

        {/* Fused badge title */}
        <div className="flex items-center gap-1 mb-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/80 text-[11px] font-extrabold text-slate-700 dark:text-slate-200 pointer-events-none">
          <span>{isNegative ? `-${absCoeff}` : `${absCoeff} db`}</span>
          <span className="text-xs">{item.emoji || item.symbol}</span>
          {absCoeff > 1 && (
            <span className="text-[9px] px-1 rounded bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-semibold ml-0.5">
              tömb
            </span>
          )}
        </div>

        {/* Connected Fused Emojis Container */}
        <div className="flex items-center justify-center gap-0.5 px-2 py-1 bg-white/80 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 shadow-inner pointer-events-none">
          {emojisArray.map((_, idx) => (
            <span
              key={idx}
              className="text-2xl filter drop-shadow-sm -mx-0.5"
            >
              {item.emoji || '📦'}
            </span>
          ))}
          {absCoeff > 6 && (
            <span className="text-xs font-bold text-slate-500 pl-1">
              +{absCoeff - 6}
            </span>
          )}
        </div>

        {/* Action buttons on hover */}
        <div className="absolute -top-2 -right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          {onSplit && absCoeff > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSplit(item.id);
              }}
              className="w-5 h-5 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-sm text-[10px] font-bold cursor-pointer"
              title="Szétbontás egyes elemekre"
            >
              ✂️
            </button>
          )}
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-sm cursor-pointer"
              title="Törlés"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. Level 4: Bridge Mode (Betűk + Emojik együtt pl. 3a (3🍎))
  if (mode === 'bridge') {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "group relative flex items-center gap-2.5 px-3.5 py-2.5 bg-white/95 dark:bg-slate-800/95 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-indigo-400 transition-all select-none cursor-grab active:cursor-grabbing backdrop-blur-sm",
          isNegative && "border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-700",
          isSelectedForPairing && "ring-4 ring-indigo-500 scale-105 shadow-xl",
          isDragOver && dragActionType === 'zero_pair' && "ring-4 ring-amber-400 bg-amber-50 scale-110 shadow-xl border-amber-400",
          isDragOver && dragActionType === 'merge' && "ring-4 ring-emerald-400 bg-emerald-50 scale-110 shadow-xl border-emerald-400",
          isAnimating && "animate-bounce ring-2 ring-indigo-400"
        )}
        title="Fogd meg és húzd rá egy másik elemre!"
      >
        {isDragOver && dragActionType === 'zero_pair' && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
            <Zap className="w-3 h-3 fill-current" />
            Kiejtés (0)!
          </div>
        )}
        {isDragOver && dragActionType === 'merge' && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
            <Sparkles className="w-3 h-3" />
            Összevonás!
          </div>
        )}

        <div className="flex items-baseline gap-0.5 pointer-events-none">
          <span className={cn("text-base font-black font-mono", isNegative ? "text-rose-600" : "text-indigo-600 dark:text-indigo-400")}>
            {isNegative ? `-${absCoeff === 1 && item.symbol !== '1' ? '' : absCoeff}` : `${absCoeff === 1 && item.symbol !== '1' ? '' : absCoeff}`}
            {item.symbol !== '1' && <span className="italic">{item.symbol}</span>}
          </span>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-700/60 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 pointer-events-none">
          <span className="text-lg">{item.emoji || '📦'}</span>
          <span>{item.label || item.symbol}</span>
        </div>

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20 cursor-pointer"
            title="Törlés"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // 4. Level 5 & 6: Abstract & Signed Mode (Algebra Tiles Card)
  const isConstant = item.symbol === '1' || item.type === 'constant';

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn(
        "group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl shadow-sm border transition-all select-none cursor-grab active:cursor-grabbing backdrop-blur-sm",
        isNegative
          ? "bg-gradient-to-br from-rose-50/90 to-blue-50/60 dark:from-rose-950/40 dark:to-slate-900 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 ring-1 ring-rose-200 dark:ring-rose-900"
          : isConstant
          ? "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-850 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          : "bg-gradient-to-br from-blue-50/90 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300",
        isSelectedForPairing && "ring-4 ring-indigo-500 scale-110 shadow-xl",
        isDragOver && dragActionType === 'zero_pair' && "ring-4 ring-amber-400 bg-amber-50 scale-110 shadow-xl border-amber-400",
        isDragOver && dragActionType === 'merge' && "ring-4 ring-emerald-400 bg-emerald-50 scale-110 shadow-xl border-emerald-400",
        isAnimating && "animate-pulse ring-2 ring-primary"
      )}
      title="Fogd meg és húzd rá egy másik elemre!"
    >
      {isDragOver && dragActionType === 'zero_pair' && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
          <Zap className="w-3 h-3 fill-current" />
          Kiejtés (0)!
        </div>
      )}
      {isDragOver && dragActionType === 'merge' && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px] whitespace-nowrap shadow-md flex items-center gap-1 z-30 animate-bounce">
          <Sparkles className="w-3 h-3" />
          Összevonás!
        </div>
      )}

      {/* Sign indicator */}
      <div className="flex items-center gap-1 pointer-events-none">
        {isNegative ? (
          <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
            -
          </span>
        ) : (
          <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
            +
          </span>
        )}

        {/* Expression value */}
        <span className="text-lg font-black font-mono tracking-tight">
          {isConstant ? (
            absCoeff
          ) : (
            <>
              {absCoeff === 1 ? '' : absCoeff}
              <span className="italic font-serif ml-0.5">{item.symbol}</span>
            </>
          )}
        </span>
      </div>

      {/* Mini Controls on hover */}
      <div className="flex items-center gap-0.5 ml-1 opacity-40 group-hover:opacity-100 transition-opacity">
        {onDecrement && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDecrement(item.id);
            }}
            className="w-4 h-4 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-[10px] cursor-pointer"
            title="Csökkentés"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
        )}
        {onIncrement && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIncrement(item.id);
            }}
            className="w-4 h-4 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center text-[10px] cursor-pointer"
            title="Növelés"
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        )}
      </div>

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-20 cursor-pointer"
          title="Törlés"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
