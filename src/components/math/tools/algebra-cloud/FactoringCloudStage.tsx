import React, { useState, useMemo } from 'react';
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
  AlertCircle,
  ArrowUp,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MAX_CLOUDS = 12;

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

export interface FactoringPreset {
  id: string;
  name: string;
  numClouds: number;
  badge?: string;
  items: {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }[];
}

export const FACTORING_PRESETS: FactoringPreset[] = [
  // 1. Gyümölcsök (4🍎 + 8🍐)
  {
    id: 'preset-fruits-4-8',
    name: '4🍎 + 8🍐',
    numClouds: 4,
    items: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 4 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 8 },
    ],
  },
  // 2. Gyümölcs + Szám (3🍎 + 6)
  {
    id: 'preset-apple-num',
    name: '3🍎 + 6',
    numClouds: 3,
    badge: 'Szám',
    items: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 3 },
      { symbol: '1', emoji: '🪙', label: 'Egység (Érme)', type: 'constant', coeff: 6 },
    ],
  },
  // 3. Ételek (6🍕 + 9🍩)
  {
    id: 'preset-food-pos',
    name: '6🍕 + 9🍩',
    numClouds: 3,
    items: [
      { symbol: 'p', emoji: '🍕', label: 'Pizza', type: 'variable', coeff: 6 },
      { symbol: 'f', emoji: '🍩', label: 'Fánk', type: 'variable', coeff: 9 },
    ],
  },
  // 4. Ételek: Negatív együttható (6🍕 - 9🍩)
  {
    id: 'preset-food-neg',
    name: '6🍕 - 9🍩',
    numClouds: 3,
    badge: 'Negatív',
    items: [
      { symbol: 'p', emoji: '🍕', label: 'Pizza', type: 'variable', coeff: 6 },
      { symbol: 'f', emoji: '🍩', label: 'Fánk', type: 'variable', coeff: -9 },
    ],
  },
  // 5. Állatok (4🐶 + 6🐱)
  {
    id: 'preset-animals-pos',
    name: '4🐶 + 6🐱',
    numClouds: 2,
    items: [
      { symbol: 'k', emoji: '🐶', label: 'Kutya', type: 'variable', coeff: 4 },
      { symbol: 'c', emoji: '🐱', label: 'Cica', type: 'variable', coeff: 6 },
    ],
  },
  // 6. Állatok: Negatív együttható (8🐶 - 4🐱)
  {
    id: 'preset-animals-neg',
    name: '8🐶 - 4🐱',
    numClouds: 4,
    badge: 'Negatív',
    items: [
      { symbol: 'k', emoji: '🐶', label: 'Kutya', type: 'variable', coeff: 8 },
      { symbol: 'c', emoji: '🐱', label: 'Cica', type: 'variable', coeff: -4 },
    ],
  },
  // 7. Étel + Negatív Szám (4🍕 - 8)
  {
    id: 'preset-food-num-neg',
    name: '4🍕 - 8',
    numClouds: 4,
    badge: 'Szám',
    items: [
      { symbol: 'p', emoji: '🍕', label: 'Pizza', type: 'variable', coeff: 4 },
      { symbol: '1', emoji: '🪙', label: 'Egység (Érme)', type: 'constant', coeff: -8 },
    ],
  },
  // 8. Figurák (5⭐ + 10💎)
  {
    id: 'preset-figures',
    name: '5⭐ + 10💎',
    numClouds: 5,
    items: [
      { symbol: 'cs', emoji: '⭐', label: 'Csillag', type: 'variable', coeff: 5 },
      { symbol: 'gy', emoji: '💎', label: 'Gyémánt', type: 'variable', coeff: 10 },
    ],
  },
  // 9. 10 csoport (2 sorba 5-5! Róka & Nyuszi)
  {
    id: 'preset-animals-10',
    name: '10🦊 + 20🐰',
    numClouds: 10,
    badge: '10 felhő',
    items: [
      { symbol: 'r', emoji: '🦊', label: 'Róka', type: 'variable', coeff: 10 },
      { symbol: 'ny', emoji: '🐰', label: 'Nyuszi', type: 'variable', coeff: 20 },
    ],
  },
  // 10. Algebrai Változó + Szám (3x + 6)
  {
    id: 'preset-var-num',
    name: '3x + 6',
    numClouds: 3,
    badge: 'Algebra',
    items: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 3 },
      { symbol: '1', emoji: '🪙', label: 'Egység (Érme)', type: 'constant', coeff: 6 },
    ],
  },
  // 11. Algebrai Változók (4x + 8y)
  {
    id: 'preset-vars-pos',
    name: '4x + 8y',
    numClouds: 4,
    badge: 'Algebra',
    items: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 4 },
      { symbol: 'y', label: 'y változó', type: 'variable', coeff: 8 },
    ],
  },
  // 12. Algebrai Negatív (6a - 9b)
  {
    id: 'preset-ab-neg',
    name: '6a - 9b',
    numClouds: 3,
    badge: 'Algebra',
    items: [
      { symbol: 'a', label: 'a változó', type: 'variable', coeff: 6 },
      { symbol: 'b', label: 'b változó', type: 'variable', coeff: -9 },
    ],
  },
  // 13. 10 csoport Algebrai (10x + 30y)
  {
    id: 'preset-vars-10',
    name: '10x + 30y',
    numClouds: 10,
    badge: '10 felhő',
    items: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 10 },
      { symbol: 'y', label: 'y változó', type: 'variable', coeff: 30 },
    ],
  },
];

interface FactoringCloudStageProps {
  repMode: RepresentationMode;
  selectedTheme: ThemeCategoryId;
  topCloud: CloudContainer;
  smallClouds: CloudContainer[];
  setTopCloud: React.Dispatch<React.SetStateAction<CloudContainer>>;
  setSmallClouds: React.Dispatch<React.SetStateAction<CloudContainer[]>>;
  onAddItemToTopCloud: (
    symbol: string,
    emoji?: string,
    label?: string,
    type?: 'variable' | 'constant',
    customCoeff?: number
  ) => void;
  playSound: (type: 'pop' | 'sparkle' | 'success' | 'magic') => void;
}

export const FactoringCloudStage: React.FC<FactoringCloudStageProps> = ({
  repMode,
  selectedTheme,
  topCloud,
  smallClouds,
  setTopCloud,
  setSmallClouds,
  onAddItemToTopCloud,
  playSound,
}) => {
  const [isDistributing, setIsDistributing] = useState(false);
  const [animatingCloudIndex, setAnimatingCloudIndex] = useState<number | null>(null);
  const [distributionError, setDistributionError] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Grouped summary of top cloud items by symbol
  const topCloudGroups = useMemo(() => {
    const map = new Map<string, { totalCoeff: number; emoji?: string; label?: string; symbol: string; type: 'variable' | 'constant' }>();
    (topCloud.items || []).forEach(item => {
      const sym = item.symbol;
      const cur = map.get(sym) || {
        totalCoeff: 0,
        emoji: item.emoji,
        label: item.label,
        symbol: item.symbol,
        type: item.type
      };
      cur.totalCoeff += item.coefficient;
      if (item.emoji && !cur.emoji) cur.emoji = item.emoji;
      map.set(sym, cur);
    });
    return Array.from(map.values()).filter(g => g.totalCoeff !== 0);
  }, [topCloud.items]);

  // GCD Calculation to find common factors
  const commonDivisors = useMemo(() => {
    if (topCloudGroups.length === 0) return [];
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

    let g = Math.abs(topCloudGroups[0].totalCoeff);
    for (let i = 1; i < topCloudGroups.length; i++) {
      g = gcd(g, Math.abs(topCloudGroups[i].totalCoeff));
    }

    if (g <= 1) return [];
    // Find all positive divisors of g > 1 up to 12 (pl. 2, 3, 4, 5, 6, 8, 10, 12)
    const divisors: number[] = [];
    for (let d = 2; d <= 12; d++) {
      if (g % d === 0) divisors.push(d);
    }
    return divisors;
  }, [topCloudGroups]);

  // Check if small clouds are currently all identical, non-empty, AND top cloud is completely empty!
  const factoringResult = useMemo(() => {
    // 1. Top cloud must be completely empty (all items must have been distributed)
    if (!topCloud || !topCloud.items || topCloud.items.length > 0) return null;

    // 2. Must have at least 2 small clouds
    if (!smallClouds || smallClouds.length < 2) return null;

    // 3. Every small cloud must have items
    if (smallClouds.some(c => !c || !c.items || c.items.length === 0)) return null;

    // Check if each small cloud has the exact same net content
    const getCloudKey = (c: CloudContainer) => {
      const map = new Map<string, number>();
      (c.items || []).forEach(i => {
        map.set(i.symbol, (map.get(i.symbol) || 0) + i.coefficient);
      });
      return Array.from(map.entries())
        .filter(([_, v]) => v !== 0)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v}`)
        .join('|');
    };

    const firstKey = getCloudKey(smallClouds[0]);
    if (!firstKey) return null;

    const allMatch = smallClouds.every(c => c && getCloudKey(c) === firstKey);
    if (!allMatch) return null;

    // Reconstruct the total original expression by summing all items across all small clouds
    const totalItemsMap = new Map<string, {
      symbol: string;
      emoji?: string;
      label?: string;
      type: 'variable' | 'constant';
      coefficient: number;
    }>();

    smallClouds.forEach(cloud => {
      (cloud.items || []).forEach(item => {
        const key = `${item.symbol}:${item.type}`;
        const existing = totalItemsMap.get(key);
        if (existing) {
          existing.coefficient += item.coefficient;
        } else {
          totalItemsMap.set(key, {
            symbol: item.symbol,
            emoji: item.emoji,
            label: item.label,
            type: item.type,
            coefficient: item.coefficient,
          });
        }
      });
    });

    const virtualTotalCloud: CloudContainer = {
      id: 'total-factored-cloud',
      title: 'Eredeti Kifejezés',
      multiplier: 1,
      items: Array.from(totalItemsMap.values()).map((v, idx) => ({
        id: `total-item-${idx}`,
        symbol: v.symbol,
        emoji: v.emoji,
        label: v.label,
        type: v.type,
        coefficient: v.coefficient,
      })),
    };

    const totalOriginalExpr = formatCloudExpression(virtualTotalCloud, repMode);
    const singleCloudExpr = formatCloudExpression(smallClouds[0], repMode);

    return {
      factor: smallClouds.length,
      innerExpr: singleCloudExpr,
      totalOriginalExpr,
    };
  }, [topCloud, smallClouds, repMode]);

  // 1. Change number of small clouds
  const handleChangeSmallCloudsCount = (newCount: number) => {
    if (newCount < 2 || newCount > MAX_CLOUDS) return;

    if (newCount > smallClouds.length) {
      const additions: CloudContainer[] = [];
      for (let i = smallClouds.length; i < newCount; i++) {
        additions.push({
          id: `small-cloud-${Date.now()}-${i}`,
          title: `${i + 1}. Kis felhő`,
          multiplier: 1,
          colorTheme: CLOUD_COLORS[i % CLOUD_COLORS.length],
          items: [],
        });
      }
      setSmallClouds([...smallClouds, ...additions]);
    } else {
      const keep = smallClouds.slice(0, newCount);
      const removed = smallClouds.slice(newCount);
      const itemsToReturn: CloudItem[] = [];
      removed.forEach(c => {
        if (c && Array.isArray(c.items)) {
          itemsToReturn.push(...c.items);
        }
      });

      if (itemsToReturn.length > 0) {
        setTopCloud(prev => ({
          ...prev,
          items: [...prev.items, ...itemsToReturn],
        }));
      }
      setSmallClouds(keep);
    }
    playSound('pop');
    setDistributionError(null);
  };

  // 2. Spectacular Automatic Distribution (A KÉRT GOMB!)
  const handleAutoDistribute = () => {
    if (topCloud.items.length === 0) {
      setDistributionError('A nagy felhő üres! Adj hozzá elemeket a bal oldali sávból.');
      return;
    }

    const n = smallClouds.length;
    if (n < 2) return;

    // Check divisibility
    const indivisible = topCloudGroups.find(g => Math.abs(g.totalCoeff) % n !== 0);
    if (indivisible) {
      const name = indivisible.label || indivisible.emoji || indivisible.symbol;
      const count = Math.abs(indivisible.totalCoeff);
      setDistributionError(
        `A(z) ${count} db ${name} nem osztható el egyenlően ${n} felhőbe! Válassz egy másik felhőszámot (pl. ${
          commonDivisors.length > 0 ? commonDivisors.join(' vagy ') : 'másik számot'
        }), vagy módosítsd a mennyiséget!`
      );
      playSound('pop');
      return;
    }

    setDistributionError(null);
    setIsDistributing(true);
    playSound('magic');

    // Create the items for each small cloud
    const newSmallClouds = smallClouds.map((cloud, cIdx) => {
      const itemsForThisCloud: CloudItem[] = [];

      topCloudGroups.forEach(group => {
        const perCloudCoeff = group.totalCoeff / n;
        itemsForThisCloud.push({
          id: `dist-${Date.now()}-${cIdx}-${group.symbol}`,
          symbol: group.symbol,
          type: group.type,
          emoji: group.emoji,
          label: group.label,
          coefficient: perCloudCoeff,
          isFusedBlock: Math.abs(perCloudCoeff) > 1,
          fusedSize: Math.abs(perCloudCoeff),
        });
      });

      return {
        ...cloud,
        items: itemsForThisCloud,
      };
    });

    // Animate: step by step glow and sound
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < n) {
        setAnimatingCloudIndex(currentStep);
        playSound('pop');
        currentStep++;
      } else {
        clearInterval(interval);
        setAnimatingCloudIndex(null);
        setIsDistributing(false);
        setTopCloud(prev => ({ ...prev, items: [] }));
        setSmallClouds(newSmallClouds);
        playSound('success');
      }
    }, 180);
  };

  // 3. Return all items from small clouds back to the Top Cloud
  const handleReturnToTopCloud = () => {
    const allItems: CloudItem[] = [];
    smallClouds.forEach(c => {
      if (c && Array.isArray(c.items)) {
        allItems.push(...c.items);
      }
    });

    if (allItems.length === 0) return;

    setTopCloud(prev => ({
      ...prev,
      items: [...prev.items, ...allItems],
    }));

    setSmallClouds(smallClouds.map(c => ({ ...c, items: [] })));
    playSound('sparkle');
    setDistributionError(null);
  };

  // 4. Combine like terms in Top Cloud (Gombnyomásra)
  const handleCombineTopCloud = () => {
    if (topCloud.items.length === 0) return;

    const grouped = new Map<string, CloudItem>();
    topCloud.items.forEach(item => {
      const key = item.symbol;
      const existing = grouped.get(key);
      if (existing) {
        existing.coefficient += item.coefficient;
      } else {
        grouped.set(key, { ...item, id: `comb-${Date.now()}-${key}` });
      }
    });

    const combinedList = Array.from(grouped.values()).filter(i => i.coefficient !== 0);
    setTopCloud({
      ...topCloud,
      items: combinedList,
    });
    playSound('sparkle');
  };

  // 5. Split a fused item into 1-unit items
  const handleSplitItem = (itemId: string, inTopCloud: boolean, cloudId?: string) => {
    const targetList = inTopCloud ? topCloud.items : (smallClouds.find(c => c.id === cloudId)?.items || []);
    const target = targetList.find(i => i.id === itemId);
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

    if (inTopCloud) {
      setTopCloud(prev => ({
        ...prev,
        items: prev.items.flatMap(i => (i.id === itemId ? newItems : [i]))
      }));
    } else if (cloudId) {
      setSmallClouds(prev =>
        prev.map(c => (c.id === cloudId ? { ...c, items: c.items.flatMap(i => (i.id === itemId ? newItems : [i])) } : c))
      );
    }
    playSound('pop');
  };

  // 6. CORE: KÉZI ÖSSZEVONÁS (Dragging item onto item)
  const handleItemDropOnItem = (
    dragged: DraggedCloudItemPayload,
    target: CloudItem,
    targetCloudId: string
  ) => {
    if (dragged.item.id === target.id) return; // Dropped on itself

    const draggedItem = dragged.item;

    if (draggedItem.symbol === target.symbol) {
      const sumCoeff = draggedItem.coefficient + target.coefficient;

      if (targetCloudId === topCloud.id) {
        // Dropped inside topCloud
        if (dragged.sourceCloudId === topCloud.id) {
          // Both from topCloud -> Merge within topCloud!
          if (sumCoeff === 0) {
            setTopCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== draggedItem.id && i.id !== target.id)
            }));
            playSound('pop');
          } else {
            const updatedTarget: CloudItem = {
              ...target,
              coefficient: sumCoeff,
              isFusedBlock: Math.abs(sumCoeff) > 1,
              fusedSize: Math.abs(sumCoeff),
            };
            setTopCloud(prev => ({
              ...prev,
              items: prev.items
                .filter(i => i.id !== draggedItem.id)
                .map(i => i.id === target.id ? updatedTarget : i)
            }));
            playSound('sparkle');
          }
        } else {
          // Dragged from a small cloud onto a topCloud item
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === dragged.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== draggedItem.id) }
                : c
            )
          );
          if (sumCoeff === 0) {
            setTopCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== target.id)
            }));
            playSound('pop');
          } else {
            const updatedTarget: CloudItem = {
              ...target,
              coefficient: sumCoeff,
              isFusedBlock: Math.abs(sumCoeff) > 1,
              fusedSize: Math.abs(sumCoeff),
            };
            setTopCloud(prev => ({
              ...prev,
              items: prev.items.map(i => i.id === target.id ? updatedTarget : i)
            }));
            playSound('sparkle');
          }
        }
      } else {
        // Dropped inside a smallCloud
        if (dragged.sourceCloudId === topCloud.id) {
          setTopCloud(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== draggedItem.id)
          }));
        } else {
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === dragged.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== draggedItem.id) }
                : c
            )
          );
        }

        const updatedTarget: CloudItem = {
          ...target,
          coefficient: sumCoeff,
          isFusedBlock: Math.abs(sumCoeff) > 1,
          fusedSize: Math.abs(sumCoeff),
        };

        setSmallClouds(prev =>
          prev.map(c =>
            c.id === targetCloudId
              ? {
                  ...c,
                  items: sumCoeff === 0
                    ? c.items.filter(i => i.id !== target.id)
                    : c.items.map(i => i.id === target.id ? updatedTarget : i)
                }
              : c
          )
        );
        playSound(sumCoeff === 0 ? 'pop' : 'sparkle');
      }
    } else {
      // Different symbols: transfer item between clouds
      if (dragged.sourceCloudId !== targetCloudId) {
        if (dragged.sourceCloudId === topCloud.id) {
          setTopCloud(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== draggedItem.id)
          }));
          setSmallClouds(prev =>
            prev.map(c => c.id === targetCloudId ? { ...c, items: [...c.items, draggedItem] } : c)
          );
        } else if (targetCloudId === topCloud.id) {
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === dragged.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== draggedItem.id) }
                : c
            )
          );
          setTopCloud(prev => ({ ...prev, items: [...prev.items, draggedItem] }));
        } else {
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

  // 7. Preset loader
  const handleLoadPreset = (preset: FactoringPreset) => {
    setActivePresetId(preset.id);
    const newItems: CloudItem[] = preset.items.map((it, idx) => ({
      id: `preset-${Date.now()}-${idx}`,
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      type: it.type,
      coefficient: it.coeff,
      isFusedBlock: Math.abs(it.coeff) > 1,
      fusedSize: Math.abs(it.coeff),
    }));

    setTopCloud({
      ...topCloud,
      items: newItems,
    });

    const newClouds: CloudContainer[] = [];
    for (let i = 0; i < preset.numClouds; i++) {
      newClouds.push({
        id: `small-cloud-${Date.now()}-${i}`,
        title: `${i + 1}. Kis felhő`,
        multiplier: 1,
        colorTheme: CLOUD_COLORS[i % CLOUD_COLORS.length],
        items: [],
      });
    }
    setSmallClouds(newClouds);
    setDistributionError(null);
    playSound('magic');
  };

  // Drag & drop handlers onto cloud background
  const handleTopCloudDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const paletteData = e.dataTransfer.getData('application/palette-item');
      if (paletteData) {
        const item = JSON.parse(paletteData);
        onAddItemToTopCloud(item.symbol, item.emoji, item.label, item.type, item.coefficient);
        playSound('pop');
        return;
      }

      const cloudItemData = e.dataTransfer.getData('application/json');
      if (cloudItemData) {
        const payload: DraggedCloudItemPayload = JSON.parse(cloudItemData);
        if (payload.item && payload.sourceCloudId !== topCloud.id) {
          setSmallClouds(prev =>
            prev.map(c =>
              c.id === payload.sourceCloudId
                ? { ...c, items: c.items.filter(i => i.id !== payload.item.id) }
                : c
            )
          );
          setTopCloud(prev => ({ ...prev, items: [...prev.items, payload.item] }));
          playSound('pop');
        }
      }
    } catch (err) {
      // ignore
    }
  };

  const handleSmallCloudDrop = (e: React.DragEvent, targetCloudId: string) => {
    e.preventDefault();
    try {
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
        setSmallClouds(prev =>
          prev.map(c => (c.id === targetCloudId ? { ...c, items: [...c.items, newItem] } : c))
        );
        playSound('pop');
        return;
      }

      const cloudItemData = e.dataTransfer.getData('application/json');
      if (cloudItemData) {
        const payload: DraggedCloudItemPayload = JSON.parse(cloudItemData);
        if (payload.item) {
          if (payload.sourceCloudId === topCloud.id) {
            setTopCloud(prev => ({
              ...prev,
              items: prev.items.filter(i => i.id !== payload.item.id),
            }));
            setSmallClouds(prev =>
              prev.map(c => (c.id === targetCloudId ? { ...c, items: [...c.items, payload.item] } : c))
            );
            playSound('pop');
          } else if (payload.sourceCloudId !== targetCloudId) {
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

  const topCloudExpr = formatCloudExpression(topCloud, repMode);

  return (
    <div className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto p-3 md:p-3.5 pb-6 md:pb-8 gap-3 bg-gradient-to-br from-indigo-50/30 via-sky-50/20 to-purple-50/30 dark:from-slate-900/60 dark:to-indigo-950/30 select-none custom-scrollbar">
      {/* 1. Header Bar: Mintapéldák szalag (Kompakt, gazdag választék) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-sky-100 dark:border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-2xs flex-shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 flex-shrink-0 text-slate-700 dark:text-slate-200 pr-1.5 border-r border-slate-200 dark:border-slate-750">
          <span className="text-base">✨</span>
          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
            Mintapéldák:
          </span>
        </div>

        {/* Quick Presets Carousel */}
        <div className="flex items-center gap-1.5 flex-nowrap">
          {FACTORING_PRESETS.map(preset => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all border whitespace-nowrap cursor-pointer flex-shrink-0 flex items-center gap-1",
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs scale-102 font-black"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750"
                )}
                title={`${preset.name} (${preset.numClouds} felhőbe osztható)`}
              >
                <span>{preset.name}</span>
                {preset.badge && (
                  <span
                    className={cn(
                      "text-[9px] px-1 py-0.2 rounded font-black",
                      isActive
                        ? "bg-white/20 text-white"
                        : preset.badge === '10 felhő'
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
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

      {/* 2. Top Area: NAGY FELHŐ (Kiinduló Kifejezés Felhő) */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleTopCloudDrop}
        className={cn(
          "relative rounded-2xl p-3 transition-all duration-300 backdrop-blur-md border-2 shadow-sm flex-shrink-0",
          "bg-gradient-to-b from-sky-100/90 via-blue-50/70 to-indigo-100/80 dark:from-slate-850 dark:via-slate-900 dark:to-indigo-950/50",
          "border-sky-300/80 dark:border-indigo-800",
          isDistributing && "animate-pulse ring-4 ring-indigo-400"
        )}
      >
        {/* Decorative cloud bubbles */}
        <div className="absolute -top-2.5 left-8 w-12 h-5 bg-sky-200/90 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />
        <div className="absolute -top-3 left-18 w-16 h-7 bg-sky-200 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />
        <div className="absolute -top-2.5 right-12 w-14 h-5 bg-sky-200/90 dark:bg-slate-800 rounded-t-full pointer-events-none -z-10" />

        {/* Top Cloud Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-sky-200/60 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">☁️</span>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs md:text-sm text-slate-800 dark:text-slate-100">
                Nagy Felhő (Kiinduló Kifejezés)
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-sky-500 text-white uppercase tracking-wider">
                Kezdő Halmaz
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {topCloud.items.length > 1 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleCombineTopCloud}
                className="h-6 px-2 text-[11px] font-bold gap-1 rounded-lg bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                title="Egynemű tagok összevonása"
              >
                <Sparkles className="w-3 h-3" />
                Összevonás
              </Button>
            )}
            {topCloud.items.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTopCloud(prev => ({ ...prev, items: [] }));
                  playSound('pop');
                }}
                className="h-6 px-1.5 text-[11px] font-bold rounded-lg text-rose-600 hover:bg-rose-50 border-rose-200 cursor-pointer"
                title="Nagy felhő kiürítése"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Top Cloud Items Container with KÉZI ÖSSZEVONÁS! */}
        <div className="py-2 min-h-[70px] flex flex-wrap content-start gap-1.5">
          {topCloud.items.length === 0 ? (
            <div className="w-full h-14 flex flex-col items-center justify-center text-center p-1 border-2 border-dashed border-sky-300/80 dark:border-slate-700 rounded-xl bg-white/40 dark:bg-slate-800/30">
              <span className="text-sm opacity-60">☁️</span>
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                A nagy felhő jelenleg üres
              </p>
              <p className="text-[9px] text-slate-400">
                Kattints a bal oldali elemekre vagy válassz egy fenti mintapéldát! (Húzd az elemeket egymásra az összevonáshoz!)
              </p>
            </div>
          ) : (
            topCloud.items.map(item => (
              <CloudItemComponent
                key={item.id}
                item={item}
                cloudId={topCloud.id}
                mode={repMode}
                onRemove={id =>
                  setTopCloud(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
                }
                onSplit={id => handleSplitItem(id, true)}
                onItemDropOnItem={handleItemDropOnItem}
                isAnimating={isDistributing}
              />
            ))
          )}
        </div>

        {/* Top Cloud Live Expression Display */}
        <div className="pt-1.5 px-2.5 pb-0.5 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-sky-200/80 dark:border-slate-700/80 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase text-slate-400">
            Kifejezés Értéke:
          </span>
          <span className="font-mono font-black text-xs md:text-sm text-indigo-900 dark:text-indigo-200 tracking-wide">
            {topCloudExpr}
          </span>
        </div>
      </div>

      {/* 3. Middle Area: KIS FELHŐK (Az egyenlő csomagok) – Most a fő vizuális tér! */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1 pb-0.5 flex-shrink-0">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span>A {smallClouds.length} egyenlő kis felhő (Csomagok):</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            Tipp: Húzhatsz elemeket egymásra vagy a felhők között is!
          </span>
        </div>

        <div
          className={cn(
            "grid gap-2.5 w-full",
            smallClouds.length === 2 && "grid-cols-1 md:grid-cols-2",
            smallClouds.length === 3 && "grid-cols-1 md:grid-cols-3",
            smallClouds.length === 4 && "grid-cols-2 md:grid-cols-4",
            smallClouds.length === 5 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
            smallClouds.length === 6 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
            smallClouds.length === 7 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
            smallClouds.length === 8 && "grid-cols-2 sm:grid-cols-4 md:grid-cols-4",
            smallClouds.length === 9 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-3",
            smallClouds.length === 10 && "grid-cols-2 sm:grid-cols-5 md:grid-cols-5",
            smallClouds.length === 11 && "grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6",
            smallClouds.length >= 12 && "grid-cols-2 sm:grid-cols-4 md:grid-cols-6"
          )}
        >
          {smallClouds.map((cloud, idx) => {
            if (!cloud) return null;
            const isTargetAnimating = animatingCloudIndex === idx;
            const singleExpr = cloud.items ? formatCloudExpression(cloud, repMode) : '0';

            return (
              <div
                key={cloud.id || `cloud-${idx}`}
                onDragOver={e => e.preventDefault()}
                onDrop={e => handleSmallCloudDrop(e, cloud.id)}
                className={cn(
                  "relative rounded-2xl p-2.5 flex flex-col justify-between transition-all duration-300 backdrop-blur-md border-2 shadow-2xs min-h-[135px]",
                  "bg-gradient-to-b from-white/95 to-slate-50/90 dark:from-slate-800/95 dark:to-slate-900/90",
                  "border-sky-200/80 dark:border-slate-700",
                  isTargetAnimating && "ring-4 ring-emerald-400 border-emerald-400 scale-102 shadow-lg bg-emerald-50/60"
                )}
              >
                {/* Cloud Header */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">☁️</span>
                    <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">
                      {idx + 1}. Kis felhő
                    </span>
                  </div>
                  {cloud.items && cloud.items.length > 0 && (
                    <button
                      onClick={() => {
                        setTopCloud(prev => ({ ...prev, items: [...prev.items, ...cloud.items] }));
                        setSmallClouds(prev =>
                          prev.map(c => (c.id === cloud.id ? { ...c, items: [] } : c))
                        );
                        playSound('pop');
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Vissza a nagy felhőbe"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Items in this small cloud with KÉZI ÖSSZEVONÁS! */}
                <div className="py-1.5 min-h-[60px] flex flex-wrap content-start gap-1">
                  {!cloud.items || cloud.items.length === 0 ? (
                    <div className="w-full h-12 flex items-center justify-center text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-800/30">
                      <span className="text-[10px] text-slate-400 font-bold">Üres felhő</span>
                    </div>
                  ) : (
                    cloud.items.map(item => (
                      <CloudItemComponent
                        key={item.id}
                        item={item}
                        cloudId={cloud.id}
                        mode={repMode}
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
                  <span className="font-mono font-black text-xs text-indigo-700 dark:text-indigo-300">
                    {singleExpr === '0' ? '∅' : `(${singleExpr})`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribution Error Alert (ha nem osztható) */}
      {distributionError && (
        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-2 animate-shake flex-shrink-0">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span className="flex-1">{distributionError}</span>
        </div>
      )}

      {/* 4. Bottom Area: EGYSZERŰ KOMPAKT MENÜSZALAG (A kért alulra helyezett vezérlő!) */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-2xl p-2 px-3 shadow-md flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
        {/* Left: Felhők száma / Közös osztó */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black text-slate-700 dark:text-slate-200 flex items-center gap-1">
            <span>☁️</span> Kis felhők száma:
          </span>

          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleChangeSmallCloudsCount(smallClouds.length - 1)}
              disabled={smallClouds.length <= 2}
              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold disabled:opacity-40 cursor-pointer shadow-2xs"
              title="Eggyel kevesebb felhő"
            >
              <Minus className="w-3 h-3" />
            </button>

            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
              <button
                key={num}
                onClick={() => handleChangeSmallCloudsCount(num)}
                className={cn(
                  "min-w-6 h-6 px-1 rounded-lg text-xs font-black transition-all flex items-center justify-center cursor-pointer",
                  smallClouds.length === num
                    ? "bg-indigo-600 text-white shadow-xs scale-105"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700",
                  commonDivisors.includes(num) && smallClouds.length !== num && "ring-1.5 ring-emerald-500 text-emerald-700 dark:text-emerald-300 font-black bg-emerald-50 dark:bg-emerald-950/40"
                )}
                title={commonDivisors.includes(num) ? `A ${num} közös osztó! ✨` : undefined}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handleChangeSmallCloudsCount(smallClouds.length + 1)}
              disabled={smallClouds.length >= MAX_CLOUDS}
              className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center justify-center text-xs font-bold disabled:opacity-40 cursor-pointer shadow-2xs"
              title="Eggyel több felhő"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Common Divisor Tag with direct clickable buttons */}
          {commonDivisors.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600 fill-current" />
                Közös osztók:
              </span>
              {commonDivisors.map(d => (
                <button
                  key={d}
                  onClick={() => handleChangeSmallCloudsCount(d)}
                  className={cn(
                    "px-1.5 py-0.5 rounded-md text-[11px] font-black cursor-pointer transition-all border",
                    smallClouds.length === d
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                      : "bg-emerald-100/80 hover:bg-emerald-200 border-emerald-300 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                  )}
                  title={`Váltás ${d} felhőre`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: ACTION BUTTONS (Szétosztás és Vissza) */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleAutoDistribute}
            disabled={isDistributing || topCloud.items.length === 0}
            className="h-8 px-3.5 text-xs font-black rounded-xl gap-1.5 shadow-sm transition-all cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-102"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            ⚡ Szétosztás ({smallClouds.length} felhőbe)
          </Button>

          {smallClouds.some(c => c && c.items && c.items.length > 0) && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleReturnToTopCloud}
              className="h-8 px-2.5 text-xs font-bold rounded-xl gap-1 border-indigo-200 hover:bg-indigo-50 text-indigo-700 dark:text-indigo-300 cursor-pointer"
              title="Elemek visszagyűjtése a nagy felhőbe"
            >
              <RotateCcw className="w-3 h-3" />
              ↩ Vissza a Nagy Felhőbe
            </Button>
          )}
        </div>
      </div>

      {/* 5. Final Factoring Deduction Card (A MATEMATIKAI ÖSSZEGZÉS) */}
      {factoringResult && (
        <div className="p-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-slide-up border border-emerald-400 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl">🎉</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-emerald-100">
                Sikeres Kiemelés! (Szorzattá Alakítás)
              </div>
              <div className="flex items-baseline gap-1.5 font-mono font-black text-sm md:text-base text-white">
                <span className="opacity-95">{factoringResult.totalOriginalExpr}</span>
                <span>=</span>
                <span className="bg-white/20 px-2 py-0.5 rounded border border-white/30 text-amber-200">
                  {factoringResult.factor}
                </span>
                <span>·</span>
                <span className="bg-white/20 px-2.5 py-0.5 rounded border border-white/30 text-white">
                  ({factoringResult.innerExpr})
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/15 px-3 py-1.5 rounded-xl text-[11px] font-bold text-emerald-50 text-right">
            💡 {factoringResult.factor} egyforma felhő × ({factoringResult.innerExpr}) = <strong>{factoringResult.factor}·({factoringResult.innerExpr})</strong>
          </div>
        </div>
      )}
    </div>
  );
};
