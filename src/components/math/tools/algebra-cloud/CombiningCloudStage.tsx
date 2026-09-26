import React, { useState, useMemo, useEffect } from 'react';
import {
  CloudContainer,
  CloudItem,
  RepresentationMode,
  ThemeCategoryId,
} from './types';
import { CloudItemComponent, DraggedCloudItemPayload } from './CloudItemComponent';
import { formatCloudExpression } from './data';
import {
  Sparkles,
  RefreshCw,
  Plus,
  Minus,
  Zap,
  RotateCcw,
  ArrowDown,
  CheckCircle2,
  Trash2,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { ExpansionWorksheetModal } from './ExpansionWorksheetModal';

export const CLOUD_COLORS = [
  'blue',
  'indigo',
  'purple',
  'emerald',
  'amber',
  'rose',
  'cyan',
  'teal',
  'violet',
  'fuchsia',
  'orange',
  'pink',
];

export interface CombiningPreset {
  id: string;
  name: string;
  multiplier: number;
  badge?: string;
  baseItems: {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }[];
}

export const COMBINING_PRESETS: CombiningPreset[] = [
  // 1. Alap Csomag (1 · (2🍎 + 3🍐)) – A mese kiindulópontja!
  {
    id: 'comb-preset-fruits-1x',
    name: '1 · (2🍎 + 3🍐)',
    multiplier: 1,
    badge: '1 csomag',
    baseItems: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 2 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 3 },
    ],
  },
  // 2. Két csomag (2 · (2🍎 + 3🍐))
  {
    id: 'comb-preset-fruits-2x',
    name: '2 · (2🍎 + 3🍐)',
    multiplier: 2,
    baseItems: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 2 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 3 },
    ],
  },
  // 3. Gyümölcs + Szám (2 · (3🍎 + 4))
  {
    id: 'comb-preset-apple-num-2x',
    name: '2 · (3🍎 + 4)',
    multiplier: 2,
    badge: 'Szám',
    baseItems: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 3 },
      { symbol: '1', emoji: '🪙', label: 'Egység (Érme)', type: 'constant', coeff: 4 },
    ],
  },
  // 4. Ételek (3 · (1🍕 + 2🥤))
  {
    id: 'comb-preset-food-3x',
    name: '3 · (1🍕 + 2🥤)',
    multiplier: 3,
    baseItems: [
      { symbol: 'p', emoji: '🍕', label: 'Pizza', type: 'variable', coeff: 1 },
      { symbol: 'u', emoji: '🥤', label: 'Üdítő', type: 'variable', coeff: 2 },
    ],
  },
  // 5. Állatok (4 · (2🐶 + 1🐱))
  {
    id: 'comb-preset-animals-4x',
    name: '4 · (2🐶 + 1🐱)',
    multiplier: 4,
    baseItems: [
      { symbol: 'k', emoji: '🐶', label: 'Kutya', type: 'variable', coeff: 2 },
      { symbol: 'c', emoji: '🐱', label: 'Cica', type: 'variable', coeff: 1 },
    ],
  },
  // 6. Algebrai Tagok (3 · (2x + 4y))
  {
    id: 'comb-preset-algebra-3x',
    name: '3 · (2x + 4y)',
    multiplier: 3,
    badge: 'Algebra',
    baseItems: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 2 },
      { symbol: 'y', label: 'y változó', type: 'variable', coeff: 4 },
    ],
  },
  // 7. Algebrai Negatív (2 · (4a - 3b))
  {
    id: 'comb-preset-neg-2x',
    name: '2 · (4a - 3b)',
    multiplier: 2,
    badge: 'Negatív',
    baseItems: [
      { symbol: 'a', label: 'a változó', type: 'variable', coeff: 4 },
      { symbol: 'b', label: 'b változó', type: 'variable', coeff: -3 },
    ],
  },
  // 8. Nagy Csoport (10 · (1x + 2y))
  {
    id: 'comb-preset-10x',
    name: '10 · (1x + 2y)',
    multiplier: 10,
    badge: '10 felhő',
    baseItems: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 1 },
      { symbol: 'y', label: 'y változó', type: 'variable', coeff: 2 },
    ],
  },
];

interface CombiningCloudStageProps {
  repMode: RepresentationMode;
  selectedTheme: ThemeCategoryId;
  baseCloud: CloudContainer;
  setBaseCloud: React.Dispatch<React.SetStateAction<CloudContainer>>;
  playSound: (type: 'pop' | 'sparkle' | 'success' | 'magic') => void;
}

export const CombiningCloudStage: React.FC<CombiningCloudStageProps> = ({
  repMode,
  selectedTheme,
  baseCloud,
  setBaseCloud,
  playSound,
}) => {
  // Scale starts from 1x ("Nézd, van 1 csomagom...")
  const [multiplier, setMultiplier] = useState<number>(1);
  const [activePresetId, setActivePresetId] = useState<string | null>('comb-preset-fruits-1x');
  const [animatingCloudIndex, setAnimatingCloudIndex] = useState<number | null>(null);
  const [isAutoCombining, setIsAutoCombining] = useState<boolean>(false);
  const [isWorksheetModalOpen, setIsWorksheetModalOpen] = useState<boolean>(false);

  // Small top clouds: array of CloudContainer of length = multiplier
  const [smallClouds, setSmallClouds] = useState<CloudContainer[]>(() => {
    return Array.from({ length: 1 }, (_, idx) => ({
      id: `comb-small-${idx + 1}`,
      title: `${idx + 1}. Kis felhő`,
      multiplier: 1,
      colorTheme: CLOUD_COLORS[idx % CLOUD_COLORS.length],
      items: baseCloud.items.map((it, itemIdx) => ({
        ...it,
        id: `small-${idx}-${itemIdx}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      })),
    }));
  });

  // Bottom collected / aggregated cloud
  const [bottomCloud, setBottomCloud] = useState<CloudContainer>({
    id: 'combining-bottom-cloud',
    title: 'Összesített Fő Halmaz',
    multiplier: 1,
    colorTheme: 'blue',
    items: [],
  });

  // Track if celebration confetti already fired for current complete state
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  // Synchronize smallClouds when baseCloud or multiplier changes from outside/preset
  const reinitializeSmallClouds = (newMultiplier: number, itemsToClone: CloudItem[]) => {
    const newClouds: CloudContainer[] = Array.from({ length: newMultiplier }, (_, idx) => ({
      id: `comb-small-${idx + 1}`,
      title: `${idx + 1}. Kis felhő`,
      multiplier: 1,
      colorTheme: CLOUD_COLORS[idx % CLOUD_COLORS.length],
      items: itemsToClone.map((it, itemIdx) => ({
        ...it,
        id: `small-${idx}-${itemIdx}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      })),
    }));
    setSmallClouds(newClouds);
    setBottomCloud(prev => ({ ...prev, items: [] }));
    setHasCelebrated(false);
  };

  // When multiplier changes via user controls (1..10)
  const handleMultiplierChange = (newMult: number) => {
    if (newMult < 1 || newMult > 10) return;
    setMultiplier(newMult);

    const activePreset = COMBINING_PRESETS.find(p => p.id === activePresetId);
    if (activePreset && activePreset.multiplier !== newMult) {
      setActivePresetId(null);
    }

    reinitializeSmallClouds(newMult, baseCloud.items);
    playSound('magic');
  };

  // Load preset
  const handleLoadPreset = (preset: CombiningPreset) => {
    setActivePresetId(preset.id);
    setMultiplier(preset.multiplier);

    const newBaseItems: CloudItem[] = preset.baseItems.map((it, idx) => ({
      id: `base-item-${Date.now()}-${idx}`,
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      type: it.type,
      coefficient: it.coeff,
      isFusedBlock: Math.abs(it.coeff) > 1,
      fusedSize: Math.abs(it.coeff),
    }));

    setBaseCloud({
      ...baseCloud,
      items: newBaseItems,
    });

    reinitializeSmallClouds(preset.multiplier, newBaseItems);
    playSound('magic');
  };

  // When baseCloud items are modified (e.g. from sidebar palette)
  useEffect(() => {
    // If bottom cloud is completely empty, keep small clouds in sync with baseCloud
    if (bottomCloud.items.length === 0) {
      const newClouds: CloudContainer[] = Array.from({ length: multiplier }, (_, idx) => ({
        id: `comb-small-${idx + 1}`,
        title: `${idx + 1}. Kis felhő`,
        multiplier: 1,
        colorTheme: CLOUD_COLORS[idx % CLOUD_COLORS.length],
        items: baseCloud.items.map((it, itemIdx) => ({
          ...it,
          id: `small-${idx}-${itemIdx}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        })),
      }));
      setSmallClouds(newClouds);
    }
  }, [baseCloud.items, multiplier]);

  // Total items remaining in all small top clouds
  const remainingTopItemsCount = useMemo(() => {
    return smallClouds.reduce((sum, c) => sum + (c.items ? c.items.length : 0), 0);
  }, [smallClouds]);

  // Combining complete check: all small clouds empty AND bottom cloud has items
  const isComplete = useMemo(() => {
    if (baseCloud.items.length === 0) return false;
    return remainingTopItemsCount === 0 && bottomCloud.items.length > 0;
  }, [remainingTopItemsCount, bottomCloud.items, baseCloud.items]);

  // Trigger celebration on completion
  useEffect(() => {
    if (isComplete && !hasCelebrated) {
      setHasCelebrated(true);
      playSound('success');
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore if confetti fails
      }
    } else if (!isComplete) {
      setHasCelebrated(false);
    }
  }, [isComplete, hasCelebrated]);

  // Move single item from a small cloud down into bottom cloud
  const handleMoveItemDown = (sourceCloudId: string, item: CloudItem) => {
    setSmallClouds(prev =>
      prev.map(c => (c.id === sourceCloudId ? { ...c, items: c.items.filter(i => i.id !== item.id) } : c))
    );
    setBottomCloud(prev => ({
      ...prev,
      items: [...prev.items, { ...item, id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 6)}` }],
    }));
    playSound('pop');
  };

  // Move entire small cloud down into bottom cloud
  const handleDumpSmallCloud = (sourceCloudId: string) => {
    const targetCloud = smallClouds.find(c => c.id === sourceCloudId);
    if (!targetCloud || !targetCloud.items || targetCloud.items.length === 0) return;

    const itemsToMove = targetCloud.items.map(it => ({
      ...it,
      id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    }));

    setSmallClouds(prev =>
      prev.map(c => (c.id === sourceCloudId ? { ...c, items: [] } : c))
    );
    setBottomCloud(prev => ({
      ...prev,
      items: [...prev.items, ...itemsToMove],
    }));
    playSound('sparkle');
  };

  // Return single item from bottom cloud back up to the first small cloud that has space or matching
  const handleReturnItemUp = (item: CloudItem) => {
    setBottomCloud(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== item.id),
    }));

    // Find first small cloud with fewest items or space
    setSmallClouds(prev => {
      let targetIdx = 0;
      let minLen = Infinity;
      prev.forEach((c, idx) => {
        const len = c.items ? c.items.length : 0;
        if (len < minLen) {
          minLen = len;
          targetIdx = idx;
        }
      });

      return prev.map((c, idx) =>
        idx === targetIdx
          ? { ...c, items: [...c.items, { ...item, id: `ret-${Date.now()}-${Math.random().toString(36).substr(2, 6)}` }] }
          : c
      );
    });

    playSound('pop');
  };

  // Return ALL items from bottom cloud back to small clouds (Reset)
  const handleReset = () => {
    reinitializeSmallClouds(multiplier, baseCloud.items);
    playSound('magic');
  };

  // Clear everything (base, small, bottom)
  const handleClearAll = () => {
    setActivePresetId(null);
    setBaseCloud(prev => ({ ...prev, items: [] }));
    setSmallClouds(prev => prev.map(c => ({ ...c, items: [] })));
    setBottomCloud(prev => ({ ...prev, items: [] }));
    playSound('pop');
  };

  // AUTOMATED COMBINING: "⚡ Automatikus Zárójelfelbontás"
  const handleAutoCombine = async () => {
    if (isAutoCombining || remainingTopItemsCount === 0) return;

    setIsAutoCombining(true);

    // Stagger through each small cloud with items
    for (let i = 0; i < smallClouds.length; i++) {
      const cloud = smallClouds[i];
      if (cloud && cloud.items && cloud.items.length > 0) {
        setAnimatingCloudIndex(i);
        playSound('pop');

        // Copy items down
        const itemsToMove = cloud.items.map(it => ({
          ...it,
          id: `bot-auto-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        }));

        setSmallClouds(prev =>
          prev.map((c, idx) => (idx === i ? { ...c, items: [] } : c))
        );
        setBottomCloud(prev => ({
          ...prev,
          items: [...prev.items, ...itemsToMove],
        }));

        // Delay between clouds for smooth visual feedback
        await new Promise(r => setTimeout(r, 200));
      }
    }

    setAnimatingCloudIndex(null);

    // Now automatically combine like terms in the bottom cloud!
    await new Promise(r => setTimeout(r, 150));
    handleCombineBottomCloud();

    setIsAutoCombining(false);
  };

  // Merge like terms inside bottom cloud
  const handleCombineBottomCloud = () => {
    const symbolMap = new Map<string, {
      symbol: string;
      emoji?: string;
      label?: string;
      type: 'variable' | 'constant';
      coefficient: number;
      category?: ThemeCategoryId;
    }>();

    bottomCloud.items.forEach(item => {
      const key = `${item.symbol}:${item.type}`;
      const existing = symbolMap.get(key);
      if (existing) {
        existing.coefficient += item.coefficient;
      } else {
        symbolMap.set(key, {
          symbol: item.symbol,
          emoji: item.emoji,
          label: item.label,
          type: item.type,
          coefficient: item.coefficient,
          category: item.category,
        });
      }
    });

    const mergedItems: CloudItem[] = Array.from(symbolMap.values())
      .filter(entry => entry.coefficient !== 0)
      .map((entry, idx) => ({
        id: `bot-merged-${Date.now()}-${idx}`,
        symbol: entry.symbol,
        emoji: entry.emoji,
        label: entry.label,
        type: entry.type,
        coefficient: entry.coefficient,
        category: entry.category,
        isFusedBlock: Math.abs(entry.coefficient) > 1,
        fusedSize: Math.abs(entry.coefficient),
      }));

    setBottomCloud(prev => ({
      ...prev,
      items: mergedItems,
    }));

    playSound('sparkle');
  };

  // Combine like terms inside a single small cloud (and sync across clouds if bottom cloud is empty)
  const handleCombineSingleSmallCloud = (cloudId: string) => {
    const targetCloud = smallClouds.find(c => c.id === cloudId);
    if (!targetCloud || !targetCloud.items) return;

    const symbolMap = new Map<string, {
      symbol: string;
      emoji?: string;
      label?: string;
      type: 'variable' | 'constant';
      coefficient: number;
      category?: ThemeCategoryId;
    }>();

    targetCloud.items.forEach(item => {
      const key = `${item.symbol}:${item.type}`;
      const existing = symbolMap.get(key);
      if (existing) {
        existing.coefficient += item.coefficient;
      } else {
        symbolMap.set(key, {
          symbol: item.symbol,
          emoji: item.emoji,
          label: item.label,
          type: item.type,
          coefficient: item.coefficient,
          category: item.category,
        });
      }
    });

    const mergedItems: CloudItem[] = Array.from(symbolMap.values())
      .filter(entry => entry.coefficient !== 0)
      .map((entry, idx) => ({
        id: `small-merged-${Date.now()}-${idx}`,
        symbol: entry.symbol,
        emoji: entry.emoji,
        label: entry.label,
        type: entry.type,
        coefficient: entry.coefficient,
        category: entry.category,
        isFusedBlock: Math.abs(entry.coefficient) > 1,
        fusedSize: Math.abs(entry.coefficient),
      }));

    if (bottomCloud.items.length === 0) {
      setBaseCloud(prev => ({
        ...prev,
        items: mergedItems,
      }));
      reinitializeSmallClouds(multiplier, mergedItems);
    } else {
      setSmallClouds(prev =>
        prev.map(c => (c.id === cloudId ? { ...c, items: mergedItems } : c))
      );
    }
    playSound('sparkle');
  };

  // Combine like terms in baseCloud
  const handleCombineBaseCloud = () => {
    const symbolMap = new Map<string, {
      symbol: string;
      emoji?: string;
      label?: string;
      type: 'variable' | 'constant';
      coefficient: number;
      category?: ThemeCategoryId;
    }>();

    baseCloud.items.forEach(item => {
      const key = `${item.symbol}:${item.type}`;
      const existing = symbolMap.get(key);
      if (existing) {
        existing.coefficient += item.coefficient;
      } else {
        symbolMap.set(key, {
          symbol: item.symbol,
          emoji: item.emoji,
          label: item.label,
          type: item.type,
          coefficient: item.coefficient,
          category: item.category,
        });
      }
    });

    const mergedItems: CloudItem[] = Array.from(symbolMap.values())
      .filter(entry => entry.coefficient !== 0)
      .map((entry, idx) => ({
        id: `base-merged-${Date.now()}-${idx}`,
        symbol: entry.symbol,
        emoji: entry.emoji,
        label: entry.label,
        type: entry.type,
        coefficient: entry.coefficient,
        category: entry.category,
        isFusedBlock: Math.abs(entry.coefficient) > 1,
        fusedSize: Math.abs(entry.coefficient),
      }));

    setBaseCloud(prev => ({
      ...prev,
      items: mergedItems,
    }));

    reinitializeSmallClouds(multiplier, mergedItems);
    playSound('sparkle');
  };

  // Item splitting (e.g. from fused block into individual 1s)
  const handleSplitItem = (itemId: string, inBottomCloud: boolean, cloudId?: string) => {
    const targetCloud = inBottomCloud
      ? bottomCloud
      : smallClouds.find(c => c.id === cloudId);
    if (!targetCloud) return;

    const target = targetCloud.items.find(i => i.id === itemId);
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

    if (inBottomCloud) {
      setBottomCloud(prev => ({
        ...prev,
        items: prev.items.flatMap(i => (i.id === itemId ? newItems : [i])),
      }));
    } else if (cloudId) {
      if (bottomCloud.items.length === 0) {
        // Update baseCloud and all small clouds
        const currentTargetCloud = smallClouds.find(c => c.id === cloudId);
        if (currentTargetCloud) {
          const updated = currentTargetCloud.items.flatMap(i => (i.id === itemId ? newItems : [i]));
          setBaseCloud(prev => ({
            ...prev,
            items: updated,
          }));
          reinitializeSmallClouds(multiplier, updated);
        }
      } else {
        setSmallClouds(prev =>
          prev.map(c => (c.id === cloudId ? { ...c, items: c.items.flatMap(i => (i.id === itemId ? newItems : [i])) } : c))
        );
      }
    }
    playSound('pop');
  };

  // Dropping an item onto another item (merging or zero-pair)
  const handleItemDropOnItem = (
    dragged: DraggedCloudItemPayload,
    target: CloudItem,
    targetCloudId: string
  ) => {
    if (dragged.item.id === target.id) return;
    const draggedItem = dragged.item;

    if (draggedItem.symbol === target.symbol) {
      const sumCoeff = draggedItem.coefficient + target.coefficient;

      if (targetCloudId === bottomCloud.id) {
        // Dropped onto an item inside bottomCloud
        if (dragged.sourceCloudId === bottomCloud.id) {
          // Within bottom cloud
          if (sumCoeff === 0) {
            setBottomCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== draggedItem.id && i.id !== target.id),
            }));
            playSound('pop');
          } else {
            const updatedTarget: CloudItem = {
              ...target,
              coefficient: sumCoeff,
              isFusedBlock: Math.abs(sumCoeff) > 1,
              fusedSize: Math.abs(sumCoeff),
            };
            setBottomCloud(prev => ({
              ...prev,
              items: prev.items
                .filter(i => i.id !== draggedItem.id)
                .map(i => (i.id === target.id ? updatedTarget : i)),
            }));
            playSound('sparkle');
          }
        } else {
          // Dragged from small cloud to bottom cloud item
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === dragged.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== draggedItem.id) }
                : c
            )
          );

          if (sumCoeff === 0) {
            setBottomCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== target.id),
            }));
            playSound('pop');
          } else {
            const updatedTarget: CloudItem = {
              ...target,
              coefficient: sumCoeff,
              isFusedBlock: Math.abs(sumCoeff) > 1,
              fusedSize: Math.abs(sumCoeff),
            };
            setBottomCloud(prev => ({
              ...prev,
              items: prev.items.map(i => (i.id === target.id ? updatedTarget : i)),
            }));
            playSound('sparkle');
          }
        }
      } else {
        // TARGET IS A SMALL CLOUD (targetCloudId is a small cloud)!
        const updatedTarget: CloudItem = {
          ...target,
          coefficient: sumCoeff,
          isFusedBlock: Math.abs(sumCoeff) > 1,
          fusedSize: Math.abs(sumCoeff),
        };

        const isSameSmallCloud = dragged.sourceCloudId === targetCloudId;

        // If bottomCloud is empty: synchronize all small clouds & baseCloud!
        if (bottomCloud.items.length === 0) {
          const targetCloud = smallClouds.find(c => c.id === targetCloudId);
          if (targetCloud) {
            let updatedItems: CloudItem[];
            if (isSameSmallCloud) {
              updatedItems = sumCoeff === 0
                ? targetCloud.items.filter(i => i.id !== draggedItem.id && i.id !== target.id)
                : targetCloud.items
                    .filter(i => i.id !== draggedItem.id)
                    .map(i => (i.id === target.id ? updatedTarget : i));
            } else {
              // Dragged from another small cloud onto this small cloud's matching item
              const partnerItem = targetCloud.items.find(i => i.id !== target.id && i.symbol === draggedItem.symbol);
              if (partnerItem) {
                const partnerId = partnerItem.id;
                updatedItems = sumCoeff === 0
                  ? targetCloud.items.filter(i => i.id !== partnerId && i.id !== target.id)
                  : targetCloud.items
                      .filter(i => i.id !== partnerId)
                      .map(i => (i.id === target.id ? updatedTarget : i));
              } else {
                updatedItems = targetCloud.items.map(i => (i.id === target.id ? updatedTarget : i));
              }
            }

            const newBaseItems: CloudItem[] = updatedItems.map((it, idx) => ({
              ...it,
              id: `base-${Date.now()}-${idx}`,
            }));

            // Update baseCloud & synchronize all small clouds!
            setBaseCloud(prev => ({
              ...prev,
              items: newBaseItems,
            }));
            reinitializeSmallClouds(multiplier, newBaseItems);
          }
        } else {
          // If items were already moved down, or dragged from another cloud
          if (dragged.sourceCloudId === bottomCloud.id) {
            // Dragged from bottomCloud to small cloud item
            setBottomCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== draggedItem.id),
            }));
            setSmallClouds(prev =>
              prev.map(c =>
                c.id === targetCloudId
                  ? {
                      ...c,
                      items: sumCoeff === 0
                        ? c.items.filter(i => i.id !== target.id)
                        : c.items.map(i => (i.id === target.id ? updatedTarget : i)),
                    }
                  : c
              )
            );
          } else {
            // Dragged within or between small clouds after distribution started
            setSmallClouds(prev =>
              prev.map(c => {
                if (c.id === dragged.sourceCloudId && c.id === targetCloudId) {
                  return {
                    ...c,
                    items: sumCoeff === 0
                      ? c.items.filter(i => i.id !== draggedItem.id && i.id !== target.id)
                      : c.items
                          .filter(i => i.id !== draggedItem.id)
                          .map(i => (i.id === target.id ? updatedTarget : i)),
                  };
                }
                if (c.id === dragged.sourceCloudId) {
                  return { ...c, items: c.items.filter(i => i.id !== draggedItem.id) };
                }
                if (c.id === targetCloudId) {
                  return {
                    ...c,
                    items: sumCoeff === 0
                      ? c.items.filter(i => i.id !== target.id)
                      : c.items.map(i => (i.id === target.id ? updatedTarget : i)),
                  };
                }
                return c;
              })
            );
          }
        }
        playSound(sumCoeff === 0 ? 'pop' : 'sparkle');
      }
    } else {
      // DIFFERENT SYMBOLS:
      if (dragged.sourceCloudId !== targetCloudId) {
        if (dragged.sourceCloudId === bottomCloud.id) {
          // From bottom cloud into small cloud
          setBottomCloud(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== draggedItem.id),
          }));
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === targetCloudId ? { ...c, items: [...c.items, draggedItem] } : c
            )
          );
        } else if (targetCloudId === bottomCloud.id) {
          // From small cloud into bottom cloud
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === dragged.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== draggedItem.id) }
                : c
            )
          );
          setBottomCloud(prev => ({ ...prev, items: [...prev.items, draggedItem] }));
        } else {
          // Between two small clouds
          setSmallClouds(prev =>
            prev.map(c => {
              if (c.id === dragged.sourceCloudId) {
                return { ...c, items: c.items.filter(i => i.id !== draggedItem.id) };
              }
              if (c.id === targetCloudId) {
                return { ...c, items: [...c.items, draggedItem] };
              }
              return c;
            })
          );
        }
        playSound('pop');
      }
    }
  };

  // Dropping into small cloud background
  const handleSmallCloudDrop = (e: React.DragEvent, targetCloudId: string) => {
    e.preventDefault();
    try {
      // From sidebar palette
      const paletteData = e.dataTransfer.getData('application/palette-item');
      if (paletteData) {
        const item = JSON.parse(paletteData);
        const newItem: CloudItem = {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          symbol: item.symbol,
          type: item.type || 'variable',
          emoji: item.emoji,
          label: item.label,
          coefficient: item.coefficient || 1,
          isFusedBlock: Math.abs(item.coefficient || 1) > 1,
          fusedSize: Math.abs(item.coefficient || 1),
        };

        if (bottomCloud.items.length === 0) {
          setBaseCloud(prev => ({
            ...prev,
            items: [...prev.items, newItem],
          }));
        } else {
          setSmallClouds(prev =>
            prev.map(c => (c.id === targetCloudId ? { ...c, items: [...c.items, newItem] } : c))
          );
        }
        playSound('pop');
        return;
      }

      // Dragged item from another cloud
      const cloudItemData = e.dataTransfer.getData('application/json');
      if (cloudItemData) {
        const payload: DraggedCloudItemPayload = JSON.parse(cloudItemData);
        if (payload.item && payload.sourceCloudId !== targetCloudId) {
          if (payload.sourceCloudId === bottomCloud.id) {
            setBottomCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== payload.item.id),
            }));
            setSmallClouds(prev =>
              prev.map(c =>
                c.id === targetCloudId ? { ...c, items: [...c.items, payload.item] } : c
              )
            );
            playSound('pop');
          } else {
            setSmallClouds(prev =>
              prev.map(c => {
                if (c.id === payload.sourceCloudId) {
                  return { ...c, items: c.items.filter(i => i.id !== payload.item.id) };
                }
                if (c.id === targetCloudId) {
                  return { ...c, items: [...c.items, payload.item] };
                }
                return c;
              })
            );
            playSound('pop');
          }
        }
      }
    } catch (err) {
      // ignore
    }
  };

  // Dropping into bottom cloud background
  const handleBottomCloudDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      // From sidebar palette
      const paletteData = e.dataTransfer.getData('application/palette-item');
      if (paletteData) {
        const item = JSON.parse(paletteData);
        const newItem: CloudItem = {
          id: `bot-item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          symbol: item.symbol,
          type: item.type || 'variable',
          emoji: item.emoji,
          label: item.label,
          coefficient: item.coefficient || 1,
          isFusedBlock: Math.abs(item.coefficient || 1) > 1,
          fusedSize: Math.abs(item.coefficient || 1),
        };
        setBottomCloud(prev => ({
          ...prev,
          items: [...prev.items, newItem],
        }));
        playSound('pop');
        return;
      }

      // Dragged from top small cloud
      const cloudItemData = e.dataTransfer.getData('application/json');
      if (cloudItemData) {
        const payload: DraggedCloudItemPayload = JSON.parse(cloudItemData);
        if (payload.item && payload.sourceCloudId !== bottomCloud.id) {
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === payload.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== payload.item.id) }
                : c
            )
          );
          setBottomCloud(prev => ({
            ...prev,
            items: [...prev.items, payload.item],
          }));
          playSound('pop');
        }
      }
    } catch (err) {
      // ignore
    }
  };

  // Formatted expressions
  const baseCloudExpr = useMemo(() => {
    return formatCloudExpression(baseCloud, repMode);
  }, [baseCloud, repMode]);

  const bottomCloudExpr = useMemo(() => {
    return formatCloudExpression(bottomCloud, repMode);
  }, [bottomCloud, repMode]);

  // Check if baseCloud or smallClouds has multiple items with the same symbol (like terms to combine)
  const canMergeSmallClouds = useMemo(() => {
    const seen = new Set<string>();
    for (const item of baseCloud.items) {
      const key = `${item.symbol}:${item.type}`;
      if (seen.has(key)) return true;
      seen.add(key);
    }
    for (const sc of smallClouds) {
      if (sc.items) {
        const scSeen = new Set<string>();
        for (const item of sc.items) {
          const key = `${item.symbol}:${item.type}`;
          if (scSeen.has(key)) return true;
          scSeen.add(key);
        }
      }
    }
    return false;
  }, [baseCloud.items, smallClouds]);

  // Check if bottom cloud has multiple items of the same symbol (can be merged)
  const canMergeBottomCloud = useMemo(() => {
    const seen = new Set<string>();
    for (const item of bottomCloud.items) {
      const key = `${item.symbol}:${item.type}`;
      if (seen.has(key)) return true;
      seen.add(key);
    }
    return false;
  }, [bottomCloud.items]);

  return (
    <div className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto p-3 md:p-3.5 pb-6 md:pb-8 gap-3 bg-gradient-to-br from-purple-50/30 via-indigo-50/20 to-sky-50/30 dark:from-slate-900/60 dark:to-indigo-950/30 select-none custom-scrollbar">
      {/* 1. Header Bar: Mintapéldák szalag */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-purple-100 dark:border-slate-800 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 shadow-2xs flex-shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 flex-nowrap overflow-x-auto no-scrollbar flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-shrink-0 text-slate-700 dark:text-slate-200 pr-1.5 border-r border-slate-200 dark:border-slate-750">
            <span className="text-base">✨</span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
              Zárójelfelbontás Minták:
            </span>
          </div>

          {/* Quick Presets Carousel */}
          <div className="flex items-center gap-1.5 flex-nowrap">
            {COMBINING_PRESETS.map(preset => {
              const isActive = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-bold transition-all border whitespace-nowrap cursor-pointer flex-shrink-0 flex items-center gap-1",
                    isActive
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs scale-102 font-black"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750"
                  )}
                  title={`${preset.name} (${preset.multiplier} kis felhő)`}
                >
                  <span>{preset.name}</span>
                  {preset.badge && (
                    <span
                      className={cn(
                        "text-[9px] px-1 py-0.2 rounded font-black",
                        isActive
                          ? "bg-white/20 text-white"
                          : preset.badge === '1 csomag'
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : preset.badge === '10 felhő'
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                          : preset.badge === 'Negatív'
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : preset.badge === 'Szám'
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                      )}
                    >
                      {preset.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dolgozat / Feladatlap (PDF) gomb + Clear / Reset buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto pl-2 border-l border-slate-200 dark:border-slate-750">
          <Button
            size="sm"
            onClick={() => setIsWorksheetModalOpen(true)}
            className="h-7.5 px-3 text-xs font-black rounded-lg gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-xs cursor-pointer hover:scale-102 transition-all whitespace-nowrap"
            title="Nyomtatható feladatlap és dolgozat generálása SNI és általános iskolás diákoknak"
          >
            <FileText className="w-3.5 h-3.5 text-purple-100" />
            <span>📄 Dolgozat / PDF</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="h-7 px-2.5 text-xs font-bold rounded-lg gap-1 border-purple-200 hover:bg-purple-50 text-purple-700 dark:text-purple-300 cursor-pointer"
            title="Felhők visszaállítása a kiinduló állapotba"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Visszaállítás</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearAll}
            className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
            title="Minden felhő kiürítése"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Top Area: A SOKSZOROSÍTOTT KIS FELHŐK (Small Clouds on TOP, starting from 1x) */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm">☁️</span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Kiinduló Kis Halmazok ({multiplier} darab felhő):
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              Egy kis felhő tartalma: ({baseCloudExpr})
            </span>
            {canMergeSmallClouds && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCombineBaseCloud}
                className="h-6 px-2 text-[10px] font-black gap-1 rounded-lg bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 cursor-pointer shadow-2xs animate-pulse"
                title="Azonos elemek összevonása a csomagokban"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>✨ Egyneműek összevonása a csomagban</span>
              </Button>
            )}
          </div>

          {multiplier === 1 ? (
            <div className="text-[11px] text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-lg border border-purple-200 dark:border-purple-800">
              <span>📦</span>
              <span>„Nézd, van 1 csomagod!” Kattints a <strong>[+]</strong> vagy <strong>2×</strong> gombra, ha kapsz még egyet!</span>
            </div>
          ) : (
            <div className="text-[10px] text-slate-500 font-medium">
              💡 <strong>Tipp:</strong> Húzd az azonos elemeket egymásra az összevonáshoz, vagy kattints a <ArrowDown className="inline w-3 h-3 text-purple-600" /> gombra a leküldéshez!
            </div>
          )}
        </div>

        {/* Small clouds grid layout: 1x centered, 2..5 1 row, 6..10 2 rows */}
        <div
          className={cn(
            "grid gap-2.5 w-full",
            multiplier === 1 && "grid-cols-1 max-w-sm sm:max-w-md mx-auto",
            multiplier === 2 && "grid-cols-1 md:grid-cols-2",
            multiplier === 3 && "grid-cols-1 md:grid-cols-3",
            multiplier === 4 && "grid-cols-2 md:grid-cols-4",
            multiplier === 5 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
            multiplier === 6 && "grid-cols-3 md:grid-cols-3 lg:grid-cols-3", // 2 rows of 3
            multiplier === 7 && "grid-cols-2 sm:grid-cols-4 md:grid-cols-4",
            multiplier === 8 && "grid-cols-2 sm:grid-cols-4 md:grid-cols-4", // 2 rows of 4
            multiplier === 9 && "grid-cols-3 sm:grid-cols-3 md:grid-cols-3", // 3 rows of 3
            multiplier === 10 && "grid-cols-2 sm:grid-cols-5 md:grid-cols-5" // 2 rows of 5!
          )}
        >
          {smallClouds.map((cloud, idx) => {
            const isTargetAnimating = animatingCloudIndex === idx;
            const singleExpr = cloud.items ? formatCloudExpression(cloud, repMode) : '0';
            const isCloudEmpty = !cloud.items || cloud.items.length === 0;

            // Check if this specific small cloud has like terms that can be merged
            const seenSymbols = new Set<string>();
            let hasMergeableItems = false;
            if (cloud.items) {
              for (const it of cloud.items) {
                const key = `${it.symbol}:${it.type}`;
                if (seenSymbols.has(key)) {
                  hasMergeableItems = true;
                  break;
                }
                seenSymbols.add(key);
              }
            }

            return (
              <div
                key={cloud.id || `comb-cloud-${idx}`}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleSmallCloudDrop(e, cloud.id)}
                className={cn(
                  "relative rounded-2xl p-2.5 flex flex-col justify-between transition-all duration-300 backdrop-blur-md border-2 shadow-2xs min-h-[125px]",
                  "bg-gradient-to-b from-white/95 to-slate-50/90 dark:from-slate-800/95 dark:to-slate-900/90",
                  "border-purple-200/80 dark:border-slate-700",
                  isTargetAnimating && "ring-4 ring-purple-400 border-purple-400 scale-102 shadow-lg bg-purple-50/60",
                  isCloudEmpty && "opacity-60 border-dashed border-slate-300 dark:border-slate-700"
                )}
              >
                {/* Cloud Header */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">☁️</span>
                    <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">
                      {multiplier === 1 ? '1. Kis felhő (Kiinduló csomag)' : `${idx + 1}. Kis felhő`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {hasMergeableItems && (
                      <button
                        onClick={() => handleCombineSingleSmallCloud(cloud.id)}
                        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                        title="Azonos elemek összevonása ebben a felhőben"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Összevonás</span>
                      </button>
                    )}
                    {!isCloudEmpty && (
                      <button
                        onClick={() => handleDumpSmallCloud(cloud.id)}
                        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
                        title="Minden elem küldése a fő halmazba"
                      >
                        <ArrowDown className="w-3 h-3 text-purple-600" />
                        <span>Le mind</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Items in this small cloud */}
                <div className="py-1.5 min-h-[55px] flex flex-wrap content-start gap-1">
                  {isCloudEmpty ? (
                    <div className="w-full h-11 flex items-center justify-center text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/40">
                      {baseCloud.items.length === 0 ? (
                        <span className="text-[10px] text-slate-400 font-bold">
                          Üres csomag (válassz mintát vagy adj hozzá elemet!)
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Áthúzva a fő halmazba!
                        </span>
                      )}
                    </div>
                  ) : (
                    cloud.items.map(item => (
                      <CloudItemComponent
                        key={item.id}
                        item={item}
                        cloudId={cloud.id}
                        mode={repMode}
                        onClickItem={() => handleMoveItemDown(cloud.id, item)}
                        onRemove={id =>
                          setSmallClouds(prev =>
                            prev.map(c =>
                              c.id === cloud.id ? { ...c, items: c.items.filter(i => i.id !== id) } : c
                            )
                          )
                        }
                        onSplit={id => handleSplitItem(id, false, cloud.id)}
                        onItemDropOnItem={handleItemDropOnItem}
                      />
                    ))
                  )}
                </div>

                {/* Cloud Expression Badge */}
                <div className="pt-1 px-2 pb-0.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-lg flex items-center justify-between border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[9px] font-bold text-slate-400">Tartalom:</span>
                  <span className="font-mono font-black text-xs text-purple-700 dark:text-purple-300">
                    {singleExpr === '0' ? '∅' : `(${singleExpr})`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Middle HUD: VEZÉRLŐ ÉS MŰVELETI SÁV (Multiplier 1..10 + Animated Action + Live Formula) */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl p-2.5 px-3.5 shadow-md flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
        {/* Left: Sokszorosító skála (1..10) */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-1">
            <span>✖️</span> Sokszorozás:
          </span>

          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleMultiplierChange(multiplier - 1)}
              disabled={multiplier <= 1}
              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold disabled:opacity-40 cursor-pointer shadow-2xs"
              title="Eggyel kevesebb felhő"
            >
              <Minus className="w-3 h-3" />
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <button
                key={num}
                onClick={() => handleMultiplierChange(num)}
                className={cn(
                  "min-w-6.5 h-6 px-1 rounded-lg text-xs font-black transition-all flex items-center justify-center cursor-pointer",
                  multiplier === num
                    ? "bg-purple-600 text-white shadow-xs scale-105"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
                title={`${num} darab felhő létrehozása`}
              >
                {num}×
              </button>
            ))}

            <button
              onClick={() => handleMultiplierChange(multiplier + 1)}
              disabled={multiplier >= 10}
              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold disabled:opacity-40 cursor-pointer shadow-2xs"
              title="Eggyel több felhő"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center: Live Formula Status */}
        <div className="flex items-center gap-2 bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 px-3 py-1 rounded-xl">
          <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300">
            Kifejezés:
          </span>
          <div className="font-mono font-black text-xs md:text-sm text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
            <span>{multiplier} · ({baseCloudExpr})</span>
            <span>=</span>
            <span className={cn(
              "px-2 py-0.5 rounded",
              isComplete
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-white/80 dark:bg-slate-800 text-purple-700 dark:text-purple-300"
            )}>
              {bottomCloud.items.length === 0 ? '?' : bottomCloudExpr}
            </span>
          </div>
        </div>

        {/* Right: ACTION BUTTONS (Automated machine combine + Hand combine) */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleAutoCombine}
            disabled={isAutoCombining || remainingTopItemsCount === 0}
            className="h-8 px-3.5 text-xs font-black rounded-xl gap-1.5 shadow-sm transition-all cursor-pointer bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:scale-102"
            title="Az összes fenti kis felhő elemeinek egy gombnyomásos beszorzása és felbontása alulra"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            ⚡ Automatikus Zárójelfelbontás
          </Button>

          {bottomCloud.items.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              className="h-8 px-2.5 text-xs font-bold rounded-xl gap-1 border-purple-200 hover:bg-purple-50 text-purple-700 dark:text-purple-300 cursor-pointer"
              title="Elemek visszaállítása a kis felhőkbe"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Visszaállítás</span>
            </Button>
          )}
        </div>
      </div>

      {/* 4. Bottom Area: ÖSSZESÍTETT FŐ HALMAZ (Main Collector Cloud at BOTTOM) */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleBottomCloudDrop}
        className={cn(
          "relative rounded-2xl p-3.5 transition-all duration-300 backdrop-blur-md border-2 shadow-sm flex-shrink-0 min-h-[140px]",
          "bg-gradient-to-b from-sky-100/90 via-blue-50/70 to-indigo-100/80 dark:from-slate-850 dark:via-slate-900 dark:to-indigo-950/50",
          "border-sky-300/80 dark:border-indigo-800",
          isAutoCombining && "animate-pulse ring-4 ring-indigo-400"
        )}
      >
        {/* Decorative cloud bubbles */}
        <div className="absolute -top-2.5 left-8 w-12 h-5 bg-sky-200/90 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />
        <div className="absolute -top-3 left-18 w-16 h-7 bg-sky-200 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />
        <div className="absolute -top-2.5 right-12 w-14 h-5 bg-sky-200/90 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />

        {/* Bottom Cloud Header */}
        <div className="flex items-center justify-between pb-2 border-b border-sky-200/60 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">☁️</span>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs md:text-sm text-slate-800 dark:text-slate-100">
                Összesített Fő Halmaz (Eredmény)
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-500 text-white uppercase tracking-wider">
                Gyűjtő Halmaz
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {canMergeBottomCloud && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCombineBottomCloud}
                className="h-6 px-2 text-[11px] font-bold gap-1 rounded-lg bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100 cursor-pointer shadow-2xs"
                title="Azonos elemek összevonása és együtthatók összeadása"
              >
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Egyneműek összevonása</span>
              </Button>
            )}

            {bottomCloud.items.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setBottomCloud(prev => ({ ...prev, items: [] }));
                  playSound('pop');
                }}
                className="h-6 px-1.5 text-[11px] font-bold rounded-lg text-rose-600 hover:bg-rose-50 border-rose-200 cursor-pointer"
                title="Fő halmaz kiürítése"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Bottom Cloud Items Container */}
        <div className="py-2.5 min-h-[75px] flex flex-wrap content-start gap-1.5">
          {bottomCloud.items.length === 0 ? (
            <div className="w-full h-16 flex flex-col items-center justify-center text-center p-1 border-2 border-dashed border-sky-300/80 dark:border-slate-700 rounded-xl bg-white/40 dark:bg-slate-800/30">
              <span className="text-sm opacity-60">☁️</span>
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                A gyűjtő halmaz még üres
              </p>
              <p className="text-[9px] text-slate-400">
                Kattints a fenti kis felhők elemeire vagy nyomd meg a „⚡ Automatikus Zárójelfelbontás” gombot!
              </p>
            </div>
          ) : (
            bottomCloud.items.map(item => (
              <CloudItemComponent
                key={item.id}
                item={item}
                cloudId={bottomCloud.id}
                mode={repMode}
                onClickItem={() => handleReturnItemUp(item)}
                onRemove={id =>
                  setBottomCloud(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
                }
                onSplit={id => handleSplitItem(id, true)}
                onItemDropOnItem={handleItemDropOnItem}
              />
            ))
          )}
        </div>

        {/* Bottom Cloud Live Expression Display */}
        <div className="pt-1.5 px-2.5 pb-0.5 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-sky-200/80 dark:border-slate-700/80 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase text-slate-400">
            Fő Halmaz Összesített Értéke:
          </span>
          <span className="font-mono font-black text-xs md:text-sm text-indigo-900 dark:text-indigo-200 tracking-wide">
            {bottomCloudExpr}
          </span>
        </div>
      </div>

      {/* 5. Final Mathematical Success Card */}
      {isComplete && (
        <div className="p-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-slide-up border border-purple-400 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl">🎉</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-purple-100">
                Sikeres Zárójelfelbontás! (Beszorzás és Összevonás)
              </div>
              <div className="flex items-baseline gap-1.5 font-mono font-black text-sm md:text-base text-white">
                <span className="bg-white/20 px-2 py-0.5 rounded border border-white/30 text-amber-200">
                  {multiplier}
                </span>
                <span>·</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded border border-white/30 text-white">
                  ({baseCloudExpr})
                </span>
                <span>=</span>
                <span className="bg-emerald-400/30 px-2.5 py-0.5 rounded border border-emerald-300 text-emerald-100">
                  {bottomCloudExpr}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/15 px-3 py-1.5 rounded-xl text-[11px] font-bold text-purple-50 text-right">
            {multiplier === 1 ? (
              <span>💡 1 csomag tartalmát tettük a gyűjtő halmazba: <strong>1·({baseCloudExpr}) = {bottomCloudExpr}</strong></span>
            ) : (
              <span>💡 {multiplier} egyforma kis felhőt bontottunk fel egy nagy halmazba: <strong>{multiplier}·({baseCloudExpr}) = {bottomCloudExpr}</strong></span>
            )}
          </div>
        </div>
      )}

      {/* 6. Printable Worksheet Modal (SNI & Iskolai Dolgozat Zárójelfelbontáshoz) */}
      <ExpansionWorksheetModal
        isOpen={isWorksheetModalOpen}
        onClose={() => setIsWorksheetModalOpen(false)}
        currentBaseCloud={baseCloud}
        currentMultiplier={multiplier}
        repMode={repMode}
      />
    </div>
  );
};
