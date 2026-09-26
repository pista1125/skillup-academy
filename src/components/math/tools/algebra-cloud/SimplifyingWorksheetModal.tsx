import React, { useState, useMemo } from 'react';
import { CloudContainer, CloudItem, RepresentationMode } from './types';
import { formatCloudExpression } from './data';
import { exportElementToPDF } from '@/utils/pdfExport';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Printer,
  Download,
  Plus,
  Trash2,
  Shuffle,
  FileText,
  X,
  Sparkles,
  BookOpen,
  LayoutGrid,
  Check
} from 'lucide-react';

export interface SimplifyingTask {
  id: string;
  title: string;
  repMode?: RepresentationMode;
  items: {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }[];
  solution: {
    simplifiedExpr: string;
    simplifiedItems: {
      symbol: string;
      emoji?: string;
      label?: string;
      type: 'variable' | 'constant';
      coeff: number;
    }[];
  };
}

export interface SimplifyingPreset {
  id: string;
  name: string;
  badge?: string;
  items: {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }[];
}

export const SIMPLIFYING_PRESETS: SimplifyingPreset[] = [
  {
    id: 'simp-preset-fruits-1',
    name: '3🍎 + 2🍐 + 2🍎',
    badge: 'Gyümölcs',
    items: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 3 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 2 },
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 2 },
    ],
  },
  {
    id: 'simp-preset-fruits-2',
    name: '2🍎 + 4🍐 + 3🍎 + 1🍐',
    badge: 'Kétféle',
    items: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 2 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 4 },
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 3 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 1 },
    ],
  },
  {
    id: 'simp-preset-food-1',
    name: '3🍕 + 2🥤 + 2🍕 + 3🥤',
    badge: 'Büfé',
    items: [
      { symbol: 'p', emoji: '🍕', label: 'Pizza', type: 'variable', coeff: 3 },
      { symbol: 'u', emoji: '🥤', label: 'Üdítő', type: 'variable', coeff: 2 },
      { symbol: 'p', emoji: '🍕', label: 'Pizza', type: 'variable', coeff: 2 },
      { symbol: 'u', emoji: '🥤', label: 'Üdítő', type: 'variable', coeff: 3 },
    ],
  },
  {
    id: 'simp-preset-animals-1',
    name: '4🐶 + 2🐱 + 1🐶 + 3🐱',
    badge: 'Állatok',
    items: [
      { symbol: 'k', emoji: '🐶', label: 'Kutya', type: 'variable', coeff: 4 },
      { symbol: 'c', emoji: '🐱', label: 'Cica', type: 'variable', coeff: 2 },
      { symbol: 'k', emoji: '🐶', label: 'Kutya', type: 'variable', coeff: 1 },
      { symbol: 'c', emoji: '🐱', label: 'Cica', type: 'variable', coeff: 3 },
    ],
  },
  {
    id: 'simp-preset-constants-1',
    name: '4🍎 + 3🪙 + 2🍎 + 5🪙',
    badge: 'Számokkal',
    items: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 4 },
      { symbol: '1', emoji: '🪙', label: 'Egység (Érme)', type: 'constant', coeff: 3 },
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 2 },
      { symbol: '1', emoji: '🪙', label: 'Egység (Érme)', type: 'constant', coeff: 5 },
    ],
  },
  {
    id: 'simp-preset-space-1',
    name: '3🚀 + 2🪐 + 2🚀 + 1🪐',
    badge: 'Világűr',
    items: [
      { symbol: 'r', emoji: '🚀', label: 'Rakéta', type: 'variable', coeff: 3 },
      { symbol: 'b', emoji: '🪐', label: 'Bolygó', type: 'variable', coeff: 2 },
      { symbol: 'r', emoji: '🚀', label: 'Rakéta', type: 'variable', coeff: 2 },
      { symbol: 'b', emoji: '🪐', label: 'Bolygó', type: 'variable', coeff: 1 },
    ],
  },
  {
    id: 'simp-preset-abstract-1',
    name: '4x + 3y + 2x + 5y',
    badge: 'Algebra',
    items: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 4 },
      { symbol: 'y', label: 'y változó', type: 'variable', coeff: 3 },
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 2 },
      { symbol: 'y', label: 'y változó', type: 'variable', coeff: 5 },
    ],
  },
  {
    id: 'simp-preset-abstract-const-1',
    name: '3x + 6 + 2x + 4',
    badge: 'Tag + szám',
    items: [
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 3 },
      { symbol: '1', emoji: '🪙', label: 'Szám', type: 'constant', coeff: 6 },
      { symbol: 'x', label: 'x változó', type: 'variable', coeff: 2 },
      { symbol: '1', emoji: '🪙', label: 'Szám', type: 'constant', coeff: 4 },
    ],
  },
  {
    id: 'simp-preset-signed-1',
    name: '4🍎 - 2🍎 + 3🍐',
    badge: 'Kivonás',
    items: [
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: 4 },
      { symbol: 'a', emoji: '🍎', label: 'Alma', type: 'variable', coeff: -2 },
      { symbol: 'k', emoji: '🍐', label: 'Körte', type: 'variable', coeff: 3 },
    ],
  },
  {
    id: 'simp-preset-signed-2',
    name: '5x + 4y - 2x + 2y',
    badge: 'Nullapár',
    items: [
      { symbol: 'x', label: 'x', type: 'variable', coeff: 5 },
      { symbol: 'y', label: 'y', type: 'variable', coeff: 4 },
      { symbol: 'x', label: 'x', type: 'variable', coeff: -2 },
      { symbol: 'y', label: 'y', type: 'variable', coeff: 2 },
    ],
  },
];

export const DIDACTIC_LEVELS: { id: RepresentationMode; label: string; shortLabel: string; icon: string; desc: string }[] = [
  { id: 'concrete', label: 'Egyenként rajzolva (külön ikonok)', shortLabel: '🍎 Egyenként', icon: '🍎', desc: 'Minden elem külön ikonként jelenik meg a felhőben' },
  { id: 'concrete-fused', label: 'Csoportosítva (darabszám)', shortLabel: '🔢 Csoportos', icon: '🔢', desc: 'Darabszámos csoportok (pl. 3 db 🍎)' },
  { id: 'bridge', label: 'Áthidaló (kép + betű)', shortLabel: '🌉 Áthidaló', icon: '🌉', desc: 'Betű és kép együtt (pl. 3a 🍎)' },
  { id: 'abstract', label: 'Algebrai tagok (betűk)', shortLabel: '📐 Algebrai', icon: '📐', desc: 'Tiszta algebrai betűk és számok (pl. 3x + 2y + 2x)' },
];

// Helper to format the uncombined expression before simplification
export const formatUncombinedExpression = (
  items: { symbol: string; emoji?: string; label?: string; type: 'variable' | 'constant'; coeff: number }[],
  mode: RepresentationMode
): string => {
  if (!items || items.length === 0) return '0';

  const parts: string[] = [];
  items.forEach((it, idx) => {
    const isNeg = it.coeff < 0;
    const absCoeff = Math.abs(it.coeff);
    const sign = isNeg ? (idx > 0 ? '- ' : '-') : (idx > 0 ? '+ ' : '');

    if (mode === 'concrete' || mode === 'concrete-fused') {
      const displayEmoji = it.emoji || it.symbol;
      parts.push(`${sign}${absCoeff > 1 ? absCoeff : ''}${displayEmoji}`);
    } else if (mode === 'bridge') {
      const varSymbol = it.symbol === '1' ? '' : it.symbol;
      const displayEmoji = it.emoji ? ` (${it.emoji})` : '';
      if (it.symbol === '1') {
        parts.push(`${sign}${absCoeff}${displayEmoji}`);
      } else {
        parts.push(`${sign}${absCoeff === 1 ? '' : absCoeff}${varSymbol}${displayEmoji}`);
      }
    } else {
      // abstract or signed
      if (it.symbol === '1') {
        parts.push(`${sign}${absCoeff}`);
      } else {
        const coeffStr = absCoeff === 1 ? '' : `${absCoeff}`;
        parts.push(`${sign}${coeffStr}${it.symbol}`);
      }
    }
  });

  return parts.length > 0 ? parts.join(' ') : '0';
};

// Helper to compute simplified expression and items
export const computeSimplification = (
  items: { symbol: string; emoji?: string; label?: string; type: 'variable' | 'constant'; coeff: number }[],
  mode: RepresentationMode
) => {
  const symbolMap = new Map<string, {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }>();

  items.forEach(it => {
    const key = `${it.symbol}:${it.type}`;
    const existing = symbolMap.get(key);
    if (existing) {
      existing.coeff += it.coeff;
    } else {
      symbolMap.set(key, { ...it });
    }
  });

  const simplifiedItems = Array.from(symbolMap.values()).filter(it => it.coeff !== 0);

  const virtualCloud: CloudContainer = {
    id: 'sol-cloud',
    title: '',
    multiplier: 1,
    items: simplifiedItems.map((it, idx) => ({
      id: `sol-${idx}`,
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      type: it.type,
      coefficient: it.coeff,
    })),
    colorTheme: 'blue',
  };

  const simplifiedExpr = formatCloudExpression(virtualCloud, mode);

  return {
    simplifiedExpr: simplifiedExpr || '0',
    simplifiedItems,
  };
};

interface SimplifyingWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentClouds: CloudContainer[];
  selectedCloudId?: string;
  repMode: RepresentationMode;
}

export const SimplifyingWorksheetModal: React.FC<SimplifyingWorksheetModalProps> = ({
  isOpen,
  onClose,
  currentClouds,
  selectedCloudId,
  repMode,
}) => {
  // 1. Layout configuration: 2 per page or 4 per page
  const [layout, setLayout] = useState<'2-per-page' | '4-per-page'>('2-per-page');

  // 2. Color mode: Full vibrant colors or B&W ink-saver line art
  const [colorMode, setColorMode] = useState<'color' | 'bw'>('color');

  // 3. Worksheet meta
  const [worksheetTitle, setWorksheetTitle] = useState('Matematika Dolgozat: Egynemű Tagok Összevonása');
  const [instructions, setInstructions] = useState('Gyűjtsd össze az egynemű elemeket és vond őket össze! Rajzold vagy írd be az eredményt a felhőbe, majd töltsd ki az egyenlőséget!');
  const [includeSolutions, setIncludeSolutions] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // 4. Global Didactic representation mode
  const [globalRepMode, setGlobalRepMode] = useState<RepresentationMode>(repMode || 'concrete');

  // Helper to size concrete icons nicely inside given cloud
  const getConcreteIconSize = (count: number, isCompact: boolean) => {
    if (isCompact) {
      if (count <= 6) return "w-7 h-7 text-sm";
      if (count <= 12) return "w-6 h-6 text-xs";
      return "w-5 h-5 text-[10px]";
    } else {
      if (count <= 6) return "w-8 h-8 text-base";
      if (count <= 12) return "w-7 h-7 text-sm";
      return "w-6 h-6 text-xs";
    }
  };

  // Convert preset to SimplifyingTask
  const createWorksheetTaskFromPreset = (preset: SimplifyingPreset, index: number, customMode?: RepresentationMode): SimplifyingTask => {
    const taskRep = customMode || globalRepMode;
    const solution = computeSimplification(preset.items, taskRep);

    return {
      id: `simp-task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `${index + 1}. Feladat`,
      repMode: taskRep,
      items: preset.items,
      solution,
    };
  };

  // Convert current stage cloud into a SimplifyingTask
  const createCurrentStageTask = (index: number): SimplifyingTask | null => {
    const targetCloud = currentClouds.find(c => c.id === selectedCloudId) || currentClouds[0];
    if (!targetCloud || !targetCloud.items || targetCloud.items.length === 0) return null;

    const baseItems = targetCloud.items.map(it => ({
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      type: it.type,
      coeff: it.coefficient,
    }));

    const solution = computeSimplification(baseItems, globalRepMode);

    return {
      id: `task-curr-${Date.now()}`,
      title: `${index + 1}. Feladat`,
      repMode: globalRepMode,
      items: baseItems,
      solution,
    };
  };

  // Initial task list: 4 default tasks
  const [tasks, setTasks] = useState<SimplifyingTask[]>(() => {
    const list: SimplifyingTask[] = [];
    const stageTask = createCurrentStageTask(0);
    if (stageTask) {
      list.push(stageTask);
    } else {
      list.push(createWorksheetTaskFromPreset(SIMPLIFYING_PRESETS[0], 0)); // 3🍎 + 2🍐 + 2🍎
    }
    list.push(createWorksheetTaskFromPreset(SIMPLIFYING_PRESETS[1], 1)); // 2🍎 + 4🍐 + 3🍎 + 1🍐
    list.push(createWorksheetTaskFromPreset(SIMPLIFYING_PRESETS[2], 2)); // 3🍕 + 2🥤 + 2🍕 + 3🥤
    list.push(createWorksheetTaskFromPreset(SIMPLIFYING_PRESETS[4], 3)); // 4🍎 + 3🪙 + 2🍎 + 5🪙
    return list;
  });

  // Global Representation Mode switcher
  const handleSetGlobalRepMode = (mode: RepresentationMode) => {
    setGlobalRepMode(mode);
    setTasks(prev => prev.map(t => {
      const solution = computeSimplification(t.items, mode);
      return { ...t, repMode: mode, solution };
    }));
    toast.success(`Ábrázolás beállítva: ${DIDACTIC_LEVELS.find(d => d.id === mode)?.label}`);
  };

  // Per-task representation mode updater
  const handleUpdateTaskRepMode = (taskId: string, mode: RepresentationMode) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const solution = computeSimplification(t.items, mode);
        return { ...t, repMode: mode, solution };
      }
      return t;
    }));
  };

  // Handle adding current stage task
  const handleAddCurrentStage = () => {
    const newTask = createCurrentStageTask(tasks.length);
    if (newTask) {
      setTasks(prev => [...prev, newTask]);
      toast.success('Aktuális felhő hozzáadva a feladatlaphoz!');
    } else {
      toast.error('Az aktív felhő jelenleg üres! Helyezz el elemeket a felhőben.');
    }
  };

  // Handle adding a preset
  const handleAddPreset = (preset: SimplifyingPreset) => {
    const newTask = createWorksheetTaskFromPreset(preset, tasks.length);
    setTasks(prev => [...prev, newTask]);
    toast.success(`Hozzáadva: ${preset.name}`);
  };

  // Handle generating random tasks
  const handleGenerateRandom = (count: number) => {
    const shuffled = [...SIMPLIFYING_PRESETS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    const newTasks = selected.map((p, idx) => createWorksheetTaskFromPreset(p, idx));
    setTasks(newTasks);
    toast.success(`${count} új véletlenszerű összevonás feladat legenerálva!`);
  };

  // Handle removing a task
  const handleRemoveTask = (taskId: string) => {
    setTasks(prev => {
      const filtered = prev.filter(t => t.id !== taskId);
      return filtered.map((t, idx) => ({ ...t, title: `${idx + 1}. Feladat` }));
    });
    toast.info('Feladat eltávolítva');
  };

  // Group tasks into pages based on layout
  const pages = useMemo(() => {
    const perPage = layout === '2-per-page' ? 2 : 4;
    const chunks: SimplifyingTask[][] = [];
    for (let i = 0; i < tasks.length; i += perPage) {
      chunks.push(tasks.slice(i, i + perPage));
    }
    return chunks.length > 0 ? chunks : [[]];
  }, [tasks, layout]);

  // Handle Native Print
  const handlePrint = () => {
    window.print();
  };

  // Handle PDF Download
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const handleDownloadPDF = async () => {
    setIsExportingPdf(true);
    try {
      await exportElementToPDF('printable-combining-terms-worksheet', worksheetTitle);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md animate-fade-in select-none">
      {/* 1. Modal Top Bar */}
      <header className="h-16 px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-md flex-shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-black text-slate-800 dark:text-white truncate">
              Összevonás Dolgozat & Feladatlap Készítő
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold truncate hidden sm:block">
              Egynemű algebrai tagok összevonása – SNI és általános iskolás feladatlap
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handlePrint}
            className="h-9 px-3.5 text-xs font-black rounded-xl gap-1.5 shadow-sm bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            title="Azonnali nyomtatás papírra vagy PDF-be"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Nyomtatás</span>
          </Button>

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isExportingPdf}
            className="h-9 px-3.5 text-xs font-black rounded-xl gap-1.5 shadow-sm bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white cursor-pointer"
            title="Közvetlen mentés letölthető A4-es PDF dokumentumként"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Mentés...' : 'PDF Letöltés'}</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="h-9 w-9 p-0 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ml-1"
            title="Bezárás"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* 2. Main Studio Area: Left Controls + Right Live Preview */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
        {/* Left Settings Sidebar */}
        <aside className="w-full md:w-[360px] lg:w-[400px] min-w-[320px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-y-auto p-4 gap-4 shadow-sm z-20">
          {/* Section A: Layout & Colors */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Elrendezés és Stílus:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLayout('2-per-page')}
                className={cn(
                  "p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1",
                  layout === '2-per-page'
                    ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "border-slate-200 dark:border-slate-750 hover:bg-slate-50 text-slate-700 dark:text-slate-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">2 feladat / oldal</span>
                  <BookOpen className="w-4 h-4 opacity-70" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Tágas, nagy rajzterület, ideális SNI diákoknak
                </span>
              </button>

              <button
                onClick={() => setLayout('4-per-page')}
                className={cn(
                  "p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1",
                  layout === '4-per-page'
                    ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "border-slate-200 dark:border-slate-750 hover:bg-slate-50 text-slate-700 dark:text-slate-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">4 feladat / oldal</span>
                  <LayoutGrid className="w-4 h-4 opacity-70" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Kompakt dolgozat formátum, papírtakarékos
                </span>
              </button>
            </div>

            {/* Color mode selector */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setColorMode('color')}
                className={cn(
                  "py-1.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5",
                  colorMode === 'color'
                    ? "bg-sky-50 dark:bg-sky-950/50 border-sky-400 text-sky-700 dark:text-sky-300 font-black shadow-2xs"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600"
                )}
              >
                <span>🎨 Színes nyomtatás</span>
              </button>

              <button
                onClick={() => setColorMode('bw')}
                className={cn(
                  "py-1.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5",
                  colorMode === 'bw'
                    ? "bg-slate-800 text-white border-slate-900 font-black shadow-2xs"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600"
                )}
              >
                <span>🖤 Fekete-fehér (Takarékos)</span>
              </button>
            </div>
          </div>

          {/* Section B: Global Didactic Level */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Szemléltetés Módja:
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {DIDACTIC_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => handleSetGlobalRepMode(lvl.id)}
                  className={cn(
                    "p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2",
                    globalRepMode === lvl.id
                      ? "bg-indigo-50 border-indigo-500 text-indigo-900 font-black shadow-2xs dark:bg-indigo-950/50 dark:text-indigo-200"
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  )}
                  title={lvl.desc}
                >
                  <span className="text-base">{lvl.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-black leading-tight block truncate">
                      {lvl.shortLabel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section C: Worksheet Headers & Metadata */}
          <div className="space-y-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              Dolgozat Fejléc:
            </span>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500">Cím:</label>
              <input
                type="text"
                value={worksheetTitle}
                onChange={e => setWorksheetTitle(e.target.value)}
                className="w-full text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500">Utasítás a diáknak:</label>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                rows={2}
                className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 resize-none"
              />
            </div>

            <div className="pt-1 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={showHeader}
                  onChange={e => setShowHeader(e.target.checked)}
                  className="rounded text-indigo-600 cursor-pointer"
                />
                Név, Osztály, Dátum mezők
              </label>

              <label className="text-xs font-bold text-indigo-700 dark:text-indigo-300 cursor-pointer flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={includeSolutions}
                  onChange={e => setIncludeSolutions(e.target.checked)}
                  className="rounded text-indigo-600 cursor-pointer"
                />
                Megoldókulcs
              </label>
            </div>
          </div>

          {/* Section D: Task Management */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Feladatok ({tasks.length} db):
              </span>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddCurrentStage}
                  className="h-6 px-2 text-[10px] font-bold rounded-lg gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 cursor-pointer"
                  title="A jelenleg a játéktéren látható aktív felhő hozzáadása"
                >
                  <Plus className="w-3 h-3" />
                  Aktuális
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleGenerateRandom(layout === '4-per-page' ? 4 : 2)}
                  className="h-6 px-2 text-[10px] font-bold rounded-lg gap-1 border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
                  title="Véletlenszerű feladatok generálása a mintákból"
                >
                  <Shuffle className="w-3 h-3" />
                  Véletlen
                </Button>
              </div>
            </div>

            {/* Task list with per-task didactics */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {tasks.map((task, idx) => {
                const currentTaskMode = task.repMode || globalRepMode;
                const uncombExpr = formatUncombinedExpression(task.items, currentTaskMode);
                return (
                  <div
                    key={task.id}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
                          {idx + 1}.
                        </span>
                        <span className="font-mono text-xs font-black text-indigo-700 dark:text-indigo-300 truncate">
                          {uncombExpr}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveTask(task.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded cursor-pointer"
                        title="Feladat törlése"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Per-task didactic mode selector */}
                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[9px] font-bold text-slate-400">Ábrázolás:</span>
                      <div className="flex items-center gap-0.5">
                        {DIDACTIC_LEVELS.map(lvl => {
                          const isSelected = currentTaskMode === lvl.id;
                          return (
                            <button
                              key={lvl.id}
                              onClick={() => handleUpdateTaskRepMode(task.id, lvl.id)}
                              className={cn(
                                "px-1.5 py-0.5 rounded text-[9px] font-bold transition-all whitespace-nowrap cursor-pointer border",
                                isSelected
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs font-black"
                                  : "bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                              )}
                              title={lvl.desc}
                            >
                              {lvl.shortLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Presets Picker */}
            <div className="pt-1">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">
                + Mintapélda hozzáadása a dolgozathoz:
              </span>
              <div className="flex flex-wrap gap-1">
                {SIMPLIFYING_PRESETS.slice(0, 8).map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleAddPreset(preset)}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    + {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Live A4 Sheet Preview Area */}
        <main className="flex-1 min-w-0 bg-slate-200/70 dark:bg-slate-950 p-4 md:p-6 overflow-y-auto flex flex-col items-center gap-6">
          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 self-start max-w-2xl mx-auto w-full">
            <span>📄</span>
            <span>A4 Lap Előnézet ({pages.length} oldal) – Nyomtatáskor vagy PDF letöltéskor pontosan így fog kinézni:</span>
          </div>

          {/* Printable Worksheet Element */}
          <div id="printable-combining-terms-worksheet" className="w-full max-w-[210mm] space-y-6">
            {pages.map((pageTasks, pageIdx) => (
              <div
                key={`page-${pageIdx}`}
                className={cn(
                  "print-page relative w-full bg-white text-slate-900 shadow-2xl rounded-sm flex flex-col justify-between border border-slate-300",
                  layout === '4-per-page' ? "p-4 sm:p-5" : "p-5 sm:p-6 md:p-7",
                  "min-h-[297mm] transition-all"
                )}
                style={{ aspectRatio: '210 / 297' }}
              >
                {/* 1. Page Header (On Page 1 or with title) */}
                {pageIdx === 0 && (
                  <header className={cn("border-b-2 border-slate-800 flex-shrink-0", layout === '4-per-page' ? "pb-2 mb-2.5" : "pb-2.5 mb-2.5")}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h1 className={cn("font-black tracking-tight text-slate-900", layout === '4-per-page' ? "text-lg md:text-xl" : "text-xl md:text-2xl")}>
                          {worksheetTitle}
                        </h1>
                        <p className={cn("font-medium text-slate-600 mt-0.5", layout === '4-per-page' ? "text-[11px]" : "text-xs")}>
                          {instructions}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-300">
                          SNI & Gyakorló Feladatlap
                        </span>
                      </div>
                    </div>

                    {showHeader && (
                      <div className={cn(
                        "grid grid-cols-4 gap-3 border-t border-dashed border-slate-300 font-bold text-slate-700",
                        layout === '4-per-page' ? "mt-2 pt-1.5 text-[11px]" : "mt-2 pt-1.5 text-xs"
                      )}>
                        <div className="border-b border-dotted border-slate-400 pb-0.5">
                          <span>Név:</span>
                        </div>
                        <div className="border-b border-dotted border-slate-400 pb-0.5">
                          <span>Osztály:</span>
                        </div>
                        <div className="border-b border-dotted border-slate-400 pb-0.5">
                          <span>Dátum:</span>
                        </div>
                        <div className="border-b border-dotted border-slate-400 pb-0.5 text-right">
                          <span>Pontszám: _____ / _____</span>
                        </div>
                      </div>
                    )}
                  </header>
                )}

                {pageIdx > 0 && (
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-300 text-xs font-bold text-slate-500 flex-shrink-0">
                    <span>{worksheetTitle}</span>
                    <span>{pageIdx + 1}. Oldal</span>
                  </div>
                )}

                {/* 2. Tasks Container */}
                <div
                  className={cn(
                    "flex-1 grid my-auto",
                    layout === '2-per-page' ? "grid-cols-1 gap-3.5" : "grid-cols-2 gap-3 sm:gap-4"
                  )}
                >
                  {pageTasks.map(task => {
                    const taskMode = task.repMode || globalRepMode;
                    const uncombExpr = formatUncombinedExpression(task.items, taskMode);
                    const isCompact = layout === '4-per-page';
                    const totalCount = task.items.reduce((sum, it) => sum + Math.abs(it.coeff), 0);

                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "rounded-2xl border-2 flex flex-col justify-between transition-all h-full",
                          isCompact ? "p-3 sm:p-3.5" : "p-3.5 sm:p-4",
                          colorMode === 'color'
                            ? "border-indigo-300 bg-gradient-to-b from-sky-50/40 via-white to-indigo-50/30"
                            : "border-slate-800 bg-white"
                        )}
                        style={{ minHeight: layout === '2-per-page' ? '92mm' : undefined }}
                      >
                        {/* Task Title Header */}
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200 flex-shrink-0">
                          <span className={cn("font-black text-slate-900", isCompact ? "text-sm" : "text-base")}>
                            {task.title}: <strong className="font-mono text-indigo-700 whitespace-nowrap">{uncombExpr}</strong>
                          </span>
                          <span className={cn("font-bold text-slate-500 whitespace-nowrap", isCompact ? "text-[11px]" : "text-xs")}>
                            Egyneműek összevonása
                          </span>
                        </div>

                        {/* Top: The Given Uncombined Cloud - Figures have NO '+' signs */}
                        <div className={cn(
                          "rounded-xl border flex flex-col justify-start mt-1.5 flex-shrink-0",
                          isCompact ? "p-2 min-h-[80px]" : "p-2.5 min-h-[90px]",
                          colorMode === 'color'
                            ? "bg-sky-50/50 border-sky-200"
                            : "bg-slate-50 border-slate-300"
                        )}>
                          <div className="flex items-center justify-between text-[11px] leading-tight mb-1 flex-shrink-0">
                            <div className="flex items-center gap-1.5">
                              <span className={isCompact ? "text-xs" : "text-sm"}>☁️</span>
                              <span className="font-extrabold text-slate-800">
                                Kiinduló halmaz elemei (Különálló tagok):
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">
                              {taskMode === 'concrete' && '🍎 Egyenként'}
                              {taskMode === 'concrete-fused' && '🔢 Csoportos'}
                              {taskMode === 'bridge' && '🌉 Áthidaló'}
                              {taskMode === 'abstract' && '📐 Algebrai'}
                            </span>
                          </div>

                          {/* Items drawn in this cloud based on didactic mode - NO + signs */}
                          {taskMode === 'concrete' ? (
                            <div className="flex-1 flex items-center justify-center gap-1.5 flex-wrap content-center py-1">
                              {task.items.flatMap((it) => {
                                const absCount = Math.abs(it.coeff);
                                const isNeg = it.coeff < 0;
                                return Array.from({ length: absCount }).map((_, iIdx) => ({
                                  it,
                                  isNeg,
                                  iIdx,
                                }));
                              }).map(({ it, isNeg }, globalIdx) => {
                                const iconSize = getConcreteIconSize(totalCount, isCompact);
                                return (
                                  <div
                                    key={globalIdx}
                                    className={cn(
                                      "rounded-full border-2 flex items-center justify-center select-none relative shadow-2xs font-bold leading-none overflow-visible",
                                      iconSize,
                                      colorMode === 'color'
                                        ? isNeg ? "bg-rose-50 border-rose-300 text-rose-900" : "bg-white border-sky-300 text-slate-800"
                                        : "bg-white border-slate-400 text-slate-800"
                                    )}
                                  >
                                    <span className="leading-none select-none flex items-center justify-center">
                                      {it.emoji || (it.symbol === '1' ? '🪙' : it.symbol)}
                                    </span>
                                    {isNeg && (
                                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center">
                                        -
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : taskMode === 'concrete-fused' ? (
                            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap content-center py-1">
                              {task.items.map((it, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "rounded-xl border-2 font-black flex items-center gap-1.5 whitespace-nowrap",
                                    isCompact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
                                    colorMode === 'color'
                                      ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                                      : "bg-white border-slate-400 text-slate-900"
                                  )}
                                >
                                  <span className={isCompact ? "text-base" : "text-lg"}>{it.emoji || it.symbol}</span>
                                  <span>{it.coeff} db</span>
                                  {it.label && <span className="text-[10px] text-slate-400 font-medium">({it.label})</span>}
                                </div>
                              ))}
                            </div>
                          ) : taskMode === 'bridge' ? (
                            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap content-center py-1">
                              {task.items.map((it, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "rounded-lg border font-black flex items-center gap-1 font-mono whitespace-nowrap",
                                    isCompact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
                                    colorMode === 'color'
                                      ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                                      : "bg-white border-slate-400 text-slate-900"
                                  )}
                                >
                                  <span className="font-black text-indigo-700">
                                    {it.coeff}{it.symbol === '1' ? '' : it.symbol}
                                  </span>
                                  {it.emoji && <span className={cn("not-italic", isCompact ? "text-sm" : "text-base")}>{it.emoji}</span>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap content-center py-1 font-mono text-xs font-black text-slate-800">
                              <span>{uncombExpr}</span>
                            </div>
                          )}
                        </div>

                        {/* Bottom: Drawing Area (The Large Combined Cloud) */}
                        <div className={cn("flex-1 flex flex-col justify-start mt-2 mb-1.5", isCompact ? "" : "mt-2 mb-1.5")}>
                          <p className={cn("font-bold text-slate-500 mb-1 flex-shrink-0", isCompact ? "text-[11px]" : "text-xs")}>
                            ✍️ Csoportosítsd és rajzold vagy írd be az egynemű elemeket az összevont felhőbe:
                          </p>
                          <div
                            className={cn(
                              "relative rounded-2xl border-2 border-dashed bg-white w-full flex-1 flex flex-col items-center justify-center p-2.5",
                              isCompact ? "min-h-[75px]" : "min-h-[85px]",
                              colorMode === 'color' ? "border-indigo-300 bg-indigo-50/20" : "border-slate-500 bg-white"
                            )}
                          >
                            <span className="text-slate-300 text-xs font-bold select-none text-center">
                              ☁️ Összevont eredmény helye (itt csoportosítsd az azonos elemeket!)
                            </span>
                          </div>
                        </div>

                        {/* Mathematical Conclusion Line (Egyneműek Összevonása) */}
                        <div className={cn(
                          "rounded-xl border flex flex-col flex-shrink-0",
                          isCompact ? "py-1.5 px-3 gap-0.5" : "py-2 px-3.5 gap-1",
                          colorMode === 'color'
                            ? "bg-indigo-50/70 border-indigo-200 text-indigo-950"
                            : "bg-slate-50 border-slate-300 text-slate-900"
                        )}>
                          <div className="flex items-center justify-between">
                            <span className={cn("font-black uppercase tracking-wider text-slate-500", isCompact ? "text-[10px]" : "text-xs")}>
                              Matematikai felírás (Összevonás):
                            </span>
                            <span className={cn("font-bold text-indigo-700", isCompact ? "text-[9px]" : "text-[10px]")}>
                              Írd be az összevont eredményt!
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-nowrap font-mono font-black text-xs md:text-sm whitespace-nowrap overflow-x-visible">
                            <span className="whitespace-nowrap px-2.5 py-0.5 rounded bg-white border border-slate-200 shadow-2xs text-slate-900 font-extrabold tracking-wide">
                              {uncombExpr}
                            </span>
                            <span className="text-slate-600 font-black whitespace-nowrap">=</span>
                            {/* Answer Box */}
                            <div
                              className={cn(
                                "rounded-md border-2 border-dashed border-indigo-400 bg-white flex items-center justify-center flex-shrink-0 shadow-2xs whitespace-nowrap",
                                isCompact ? "h-6 min-w-[120px]" : "h-7 min-w-[160px]"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3. Page Footer */}
                <footer className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-bold flex-shrink-0">
                  <span>Készült a diákzóna.hu eszközével</span>
                  <span>{pageIdx + 1} / {pages.length + (includeSolutions ? 1 : 0)} oldal</span>
                </footer>
              </div>
            ))}

            {/* Optional Solutions Page */}
            {includeSolutions && (
              <div
                className="print-page relative w-full bg-white text-slate-900 shadow-2xl rounded-sm p-8 md:p-10 flex flex-col justify-between border border-slate-300 min-h-[297mm]"
                style={{ aspectRatio: '210 / 297' }}
              >
                <div>
                  <header className="border-b-2 border-slate-800 pb-3 mb-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      Megoldókulcs: {worksheetTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Tanári segédlet és ellenőrző lap
                    </p>
                  </header>

                  <div className="grid grid-cols-2 gap-4">
                    {tasks.map((task, idx) => {
                      const taskMode = task.repMode || globalRepMode;
                      const uncombExpr = formatUncombinedExpression(task.items, taskMode);
                      return (
                        <div
                          key={task.id}
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
                        >
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                            <span className="font-black text-xs text-slate-800">
                              {idx + 1}. Feladat
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                              Összevonás
                            </span>
                          </div>
                          <div className="font-mono text-xs font-bold text-slate-600">
                            Kiinduló: <strong>{uncombExpr}</strong>
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 font-mono font-black text-xs text-emerald-900 flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{uncombExpr} = <strong>{task.solution.simplifiedExpr}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <footer className="mt-6 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span>Készült a diákzóna.hu eszközével</span>
                  <span>{pages.length + 1} / {pages.length + 1} oldal</span>
                </footer>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
