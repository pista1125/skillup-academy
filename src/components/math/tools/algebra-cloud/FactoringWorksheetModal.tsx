import React, { useState, useMemo } from 'react';
import { CloudContainer, CloudItem, RepresentationMode } from './types';
import { formatCloudExpression } from './data';
import { FACTORING_PRESETS, FactoringPreset } from './FactoringCloudStage';
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
  Palette,
  Sparkles,
  BookOpen,
  LayoutGrid,
  Check
} from 'lucide-react';

export interface WorksheetTask {
  id: string;
  title: string;
  originalExpr: string;
  numClouds: number;
  repMode?: RepresentationMode;
  items: {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }[];
  solution: {
    factor: number;
    innerExpr: string;
    innerItems: {
      symbol: string;
      emoji?: string;
      label?: string;
      coeff: number;
    }[];
  };
}

export const DIDACTIC_LEVELS: { id: RepresentationMode; label: string; shortLabel: string; icon: string; desc: string }[] = [
  { id: 'concrete', label: 'Egyenként rajzolva (külön ikonok)', shortLabel: '🍎 Egyenként', icon: '🍎', desc: 'Minden elem külön ikonként (pl. 3 alma = 🍎 🍎 🍎)' },
  { id: 'concrete-fused', label: 'Csoportosítva (darabszám)', shortLabel: '🔢 Csoportos', icon: '🔢', desc: 'Darabszámos csoportok (pl. 3 db 🍎)' },
  { id: 'bridge', label: 'Áthidaló (kép + betű)', shortLabel: '🌉 Áthidaló', icon: '🌉', desc: 'Betű és kép együtt (pl. 3a 🍎)' },
  { id: 'abstract', label: 'Algebrai tagok (betűk)', shortLabel: '📐 Algebrai', icon: '📐', desc: 'Tiszta algebrai betűk és számok (pl. 3a + 6b)' },
];

interface FactoringWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopCloud: CloudContainer;
  currentSmallClouds: CloudContainer[];
  repMode: RepresentationMode;
}

export const FactoringWorksheetModal: React.FC<FactoringWorksheetModalProps> = ({
  isOpen,
  onClose,
  currentTopCloud,
  currentSmallClouds,
  repMode,
}) => {
  // 1. Layout configuration: 2 per page or 4 per page
  const [layout, setLayout] = useState<'2-per-page' | '4-per-page'>('2-per-page');

  // 2. Color mode: Full vibrant colors or B&W ink-saver line art
  const [colorMode, setColorMode] = useState<'color' | 'bw'>('color');

  // 3. Worksheet meta
  const [worksheetTitle, setWorksheetTitle] = useState('Matematika Dolgozat: Kiemelés és Szétosztás');
  const [instructions, setInstructions] = useState('Oszd szét a felhőben lévő elemeket egyenlően a kis felhőkbe! Rajzold vagy írd be őket, majd töltsd ki az egyenlőséget!');
  const [includeSolutions, setIncludeSolutions] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // 4. Global Didactic representation mode for the starting set
  const [globalRepMode, setGlobalRepMode] = useState<RepresentationMode>(repMode || 'concrete');

  // Dynamic expression formatters based on active didactic mode
  const getTaskExpr = (task: WorksheetTask, mode: RepresentationMode) => {
    const virtualCloud: CloudContainer = {
      id: task.id,
      title: task.title,
      multiplier: 1,
      items: task.items.map((it, idx) => ({
        id: `${task.id}-item-${idx}`,
        symbol: it.symbol,
        emoji: it.emoji,
        label: it.label,
        type: it.type,
        coefficient: it.coeff,
      })),
      colorTheme: 'blue',
    };
    return formatCloudExpression(virtualCloud, mode);
  };

  const getTaskSolutionExpr = (task: WorksheetTask, mode: RepresentationMode) => {
    const innerVirtualCloud: CloudContainer = {
      id: `${task.id}-sol`,
      title: '',
      multiplier: 1,
      items: task.solution.innerItems.map((it, idx) => ({
        id: `${task.id}-sol-item-${idx}`,
        symbol: it.symbol,
        emoji: it.emoji,
        label: it.label,
        type: it.symbol === '1' ? 'constant' : 'variable',
        coefficient: it.coeff,
      })),
      colorTheme: 'blue',
    };
    return formatCloudExpression(innerVirtualCloud, mode);
  };

  // Helper to dynamically size concrete icons so starting clouds fit fixed height
  const getConcreteIconSize = (count: number, isCompact: boolean) => {
    if (isCompact) {
      if (count <= 6) return "w-8 h-8 text-base";
      if (count <= 10) return "w-7 h-7 text-sm";
      if (count <= 16) return "w-6 h-6 text-xs";
      return "w-5 h-5 text-[11px]";
    } else {
      if (count <= 8) return "w-9 h-9 text-lg";
      if (count <= 14) return "w-8 h-8 text-base";
      return "w-7 h-7 text-sm";
    }
  };

  // Helper to convert a preset into a WorksheetTask
  const createWorksheetTaskFromPreset = (preset: FactoringPreset, index: number, customMode?: RepresentationMode): WorksheetTask => {
    const factor = preset.numClouds;
    const taskRep = customMode || globalRepMode;
    const innerItems = preset.items.map(it => ({
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      coeff: Math.round(it.coeff / factor),
    }));

    const innerVirtualCloud: CloudContainer = {
      id: `virtual-sol-${index}`,
      title: '',
      multiplier: 1,
      items: innerItems.map((v, i) => ({
        id: `sol-item-${i}`,
        symbol: v.symbol,
        emoji: v.emoji,
        label: v.label,
        type: v.symbol === '1' ? 'constant' : 'variable',
        coefficient: v.coeff,
      })),
    };

    const innerExpr = formatCloudExpression(innerVirtualCloud, taskRep);

    return {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `${index + 1}. Feladat`,
      originalExpr: preset.name,
      numClouds: preset.numClouds,
      repMode: taskRep,
      items: preset.items,
      solution: {
        factor,
        innerExpr,
        innerItems,
      },
    };
  };

  // Helper to convert current top cloud / stage into a WorksheetTask
  const createCurrentStageTask = (index: number): WorksheetTask | null => {
    // Collect all items either in topCloud or smallClouds
    const allItems: CloudItem[] = [
      ...(currentTopCloud.items || []),
      ...(currentSmallClouds.flatMap(c => c.items || [])),
    ];
    if (allItems.length === 0) return null;

    // Group items
    const grouped = new Map<string, { symbol: string; emoji?: string; label?: string; type: 'variable' | 'constant'; coeff: number }>();
    allItems.forEach(it => {
      const key = `${it.symbol}:${it.type}`;
      const ex = grouped.get(key);
      if (ex) ex.coeff += it.coefficient;
      else grouped.set(key, { symbol: it.symbol, emoji: it.emoji, label: it.label, type: it.type, coeff: it.coefficient });
    });

    const items = Array.from(grouped.values()).filter(i => i.coeff !== 0);
    if (items.length === 0) return null;

    const numClouds = Math.max(2, currentSmallClouds.length || 3);
    const virtualCloud: CloudContainer = {
      id: 'current-virtual',
      title: '',
      multiplier: 1,
      items: items.map((v, i) => ({
        id: `curr-${i}`,
        symbol: v.symbol,
        emoji: v.emoji,
        label: v.label,
        type: v.type,
        coefficient: v.coeff,
      })),
    };
    const originalExpr = formatCloudExpression(virtualCloud, repMode);

    const innerItems = items.map(it => ({
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      coeff: Math.round(it.coeff / numClouds),
    }));

    const innerVirtual: CloudContainer = {
      id: 'inner-virtual',
      title: '',
      multiplier: 1,
      items: innerItems.map((v, i) => ({
        id: `inner-${i}`,
        symbol: v.symbol,
        emoji: v.emoji,
        label: v.label,
        type: v.symbol === '1' ? 'constant' : 'variable',
        coefficient: v.coeff,
      })),
    };
    const innerExpr = formatCloudExpression(innerVirtual, repMode);

    return {
      id: `task-curr-${Date.now()}`,
      title: `${index + 1}. Feladat`,
      originalExpr,
      numClouds,
      repMode: globalRepMode,
      items,
      solution: {
        factor: numClouds,
        innerExpr,
        innerItems,
      },
    };
  };

  // Initial task list: 2 or 4 tasks
  const [tasks, setTasks] = useState<WorksheetTask[]>(() => {
    const list: WorksheetTask[] = [];
    // If current stage has items, include it first
    const stageTask = createCurrentStageTask(0);
    if (stageTask) {
      list.push(stageTask);
    } else {
      list.push(createWorksheetTaskFromPreset(FACTORING_PRESETS[0], 0)); // 4🍎 + 8🍐
    }
    list.push(createWorksheetTaskFromPreset(FACTORING_PRESETS[1], 1)); // 3🍎 + 6
    list.push(createWorksheetTaskFromPreset(FACTORING_PRESETS[2], 2)); // 6🍕 + 9🍩
    list.push(createWorksheetTaskFromPreset(FACTORING_PRESETS[4], 3)); // 4🐶 + 6🐱
    return list;
  });

  // Global Representation Mode switcher
  const handleSetGlobalRepMode = (mode: RepresentationMode) => {
    setGlobalRepMode(mode);
    setTasks(prev => prev.map(t => ({ ...t, repMode: mode })));
    toast.success(`Kiinduló készlet ábrázolása: ${DIDACTIC_LEVELS.find(d => d.id === mode)?.label}`);
  };

  // Per-task representation mode updater
  const handleUpdateTaskRepMode = (taskId: string, mode: RepresentationMode) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, repMode: mode } : t));
  };

  // Handle adding current stage task
  const handleAddCurrentStage = () => {
    const newTask = createCurrentStageTask(tasks.length);
    if (newTask) {
      setTasks(prev => [...prev, newTask]);
      toast.success('Aktuális feladat hozzáadva a feladatlaphoz!');
    } else {
      toast.error('A felhők jelenleg üresek! Helyezz el elemeket a játéktéren.');
    }
  };

  // Handle adding a preset
  const handleAddPreset = (preset: FactoringPreset) => {
    const newTask = createWorksheetTaskFromPreset(preset, tasks.length);
    setTasks(prev => [...prev, newTask]);
    toast.success(`Hozzáadva: ${preset.name}`);
  };

  // Handle generating random tasks
  const handleGenerateRandom = (count: number) => {
    const shuffled = [...FACTORING_PRESETS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    const newTasks = selected.map((p, idx) => createWorksheetTaskFromPreset(p, idx));
    setTasks(newTasks);
    toast.success(`${count} új véletlenszerű feladat legenerálva!`);
  };

  // Handle deleting a task
  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id).map((t, idx) => ({ ...t, title: `${idx + 1}. Feladat` })));
  };

  // Group tasks into pages based on layout
  const pages = useMemo(() => {
    const perPage = layout === '2-per-page' ? 2 : 4;
    const chunks: WorksheetTask[][] = [];
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
      await exportElementToPDF('printable-worksheet', worksheetTitle);
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-black text-slate-800 dark:text-white truncate">
              Kiemelés Dolgozat & Feladatlap Készítő
            </h1>
            <p className="text-[11px] text-slate-500 font-semibold truncate hidden sm:block">
              SNI és Általános iskolás diákoknak nyomtatható játékos felhős feladatlap
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
            <span>Nyomtatás</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={isExportingPdf}
            onClick={handleDownloadPDF}
            className="h-9 px-3.5 text-xs font-black rounded-xl gap-1.5 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
            title="Letöltés közvetlen PDF fájlként"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Mentés...' : 'PDF Mentése'}</span>
          </Button>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            title="Bezárás"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. Main Builder Body (Left: Config & Task Manager | Right: Live A4 Sheet Preview) */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Settings Sidebar */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] bg-white/95 dark:bg-slate-900/95 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto space-y-4 shadow-sm flex-shrink-0">
          {/* Elrendezés választó */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              1. Oldal elrendezés (A4)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLayout('2-per-page')}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1",
                  layout === '2-per-page'
                    ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-2xs font-black"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <LayoutGrid className="w-4 h-4 text-indigo-600" />
                  <span>2 feladat / lap</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Nagy, tágas rajztér (SNI ajánlott)
                </span>
              </button>

              <button
                onClick={() => setLayout('4-per-page')}
                className={cn(
                  "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1",
                  layout === '4-per-page'
                    ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-2xs font-black"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <LayoutGrid className="w-4 h-4 text-indigo-600" />
                  <span>4 feladat / lap</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  Kompakt 2×2 rács (Gyors dolgozat)
                </span>
              </button>
            </div>
          </div>

          {/* Stílus választó: Színes vs Fekete-fehér */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              2. Nyomtatási Stílus
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setColorMode('color')}
                className={cn(
                  "p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5",
                  colorMode === 'color'
                    ? "bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200 shadow-2xs font-black"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <Palette className="w-3.5 h-3.5 text-amber-500" />
                <span>🎨 Színes</span>
              </button>

              <button
                onClick={() => setColorMode('bw')}
                className={cn(
                  "p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5",
                  colorMode === 'bw'
                    ? "bg-slate-100 dark:bg-slate-800 border-slate-400 text-slate-900 dark:text-white shadow-2xs font-black"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>🖨️ Fekete-fehér (vonalas)</span>
              </button>
            </div>
          </div>

          {/* 3. Kiinduló készlet didaktikai szintje (Alapértelmezett választó) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                3. Kiinduló készlet ábrázolása
              </span>
              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">
                Alapértelmezett
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {DIDACTIC_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => handleSetGlobalRepMode(lvl.id)}
                  className={cn(
                    "p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5",
                    globalRepMode === lvl.id
                      ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-2xs font-black"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                  )}
                  title={lvl.desc}
                >
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <span>{lvl.icon}</span>
                    <span className="truncate">{lvl.shortLabel}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 line-clamp-1 leading-tight">
                    {lvl.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Fejléc és Megoldókulcs opciók */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={showHeader}
                onChange={e => setShowHeader(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Fejléc megjelenítése (Név, Dátum, Osztály, Pontszám)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={includeSolutions}
                onChange={e => setIncludeSolutions(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                Tanári megoldókulcs mellékelése
              </span>
            </label>
          </div>

          {/* 5. Feladatok kezelése és feladatonkénti didaktikai szint */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                5. Feladatok a lapon ({tasks.length} db):
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleGenerateRandom(layout === '2-per-page' ? 2 : 4)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 flex items-center gap-1 cursor-pointer"
                  title="Új véletlenszerű feladatok generálása"
                >
                  <Shuffle className="w-3 h-3" />
                  Véletlen
                </button>
                <button
                  onClick={handleAddCurrentStage}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1 cursor-pointer"
                  title="A játéktér jelenlegi feladatának hozzáadása"
                >
                  <Plus className="w-3 h-3" />
                  Aktuális
                </button>
              </div>
            </div>

            {/* Task list with delete and per-task representation mode */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {tasks.map((task, idx) => {
                const currentTaskMode = task.repMode || globalRepMode;
                return (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-black text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-mono font-black text-slate-800 dark:text-slate-100 truncate">
                          {getTaskExpr(task, currentTaskMode)}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          ({task.numClouds} felhő)
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Feladat törlése"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Per-task Didactic Level Selector */}
                    <div className="flex items-center gap-1 pt-1 border-t border-slate-100 dark:border-slate-750">
                      <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">Készlet:</span>
                      <div className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
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
                {FACTORING_PRESETS.slice(0, 8).map(preset => (
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

          {/* Printable Worksheet Element (Container that is captured or printed) */}
          <div id="printable-worksheet" className="w-full max-w-[210mm] space-y-6">
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
                {/* 1. Page Header (Only on Page 1 or if configured) */}
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

                {/* 2. Tasks Container - Fills the available page height evenly */}
                <div
                  className={cn(
                    "flex-1 grid my-auto",
                    layout === '2-per-page' ? "grid-cols-1 gap-3.5" : "grid-cols-2 gap-3 sm:gap-4"
                  )}
                >
                  {pageTasks.map(task => {
                    const taskMode = task.repMode || globalRepMode;
                    const displayExpr = getTaskExpr(task, taskMode);
                    const totalCount = task.items.reduce((sum, it) => sum + Math.abs(it.coeff), 0);
                    const isCompact = layout === '4-per-page';
                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "rounded-2xl border-2 flex flex-col justify-between transition-all h-full",
                          isCompact ? "p-3 sm:p-3.5" : "p-3.5 sm:p-4",
                          colorMode === 'color'
                            ? "border-sky-300 bg-gradient-to-b from-sky-50/50 via-white to-indigo-50/30"
                            : "border-slate-800 bg-white"
                        )}
                        style={{ minHeight: layout === '2-per-page' ? '92mm' : undefined }}
                      >
                        {/* Task Title Header */}
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200 flex-shrink-0">
                          <span className={cn("font-black text-slate-900", isCompact ? "text-sm" : "text-base")}>
                            {task.title}: <strong className="font-mono text-indigo-700 whitespace-nowrap">{displayExpr}</strong>
                          </span>
                          <span className={cn("font-bold text-slate-500 whitespace-nowrap", isCompact ? "text-[11px]" : "text-xs")}>
                            → {task.numClouds} egyenlő felhőbe
                          </span>
                        </div>

                        {/* Visual Starting Cloud - Taller, spacious, no clipping of items */}
                        <div className={cn(
                          "rounded-xl border flex flex-col justify-between mt-1.5 flex-shrink-0",
                          isCompact ? "p-2.5 min-h-[105px] h-[110px]" : "p-3 min-h-[110px] h-[115px]",
                          colorMode === 'color'
                            ? "bg-sky-50/40 border-sky-200"
                            : "bg-slate-50 border-slate-300"
                        )}>
                          <div className="flex items-center justify-between text-[11px] leading-tight mb-1 flex-shrink-0">
                            <div className="flex items-center gap-1.5">
                              <span className={isCompact ? "text-xs" : "text-sm"}>☁️</span>
                              <span className="font-extrabold text-slate-800">
                                {isCompact ? "Kiinduló halmaz:" : "Kiinduló készlet (szétosztandó elemek):"}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">
                              {taskMode === 'concrete' && '🍎 Egyenként'}
                              {taskMode === 'concrete-fused' && '🔢 Csoportos'}
                              {taskMode === 'bridge' && '🌉 Áthidaló'}
                              {taskMode === 'abstract' && '📐 Algebrai'}
                            </span>
                          </div>

                          {/* Content based on taskMode - All in ONE shared space */}
                          {taskMode === 'concrete' ? (
                            <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap content-center py-1">
                              {task.items.map((it, groupIdx) => {
                                const absCount = Math.abs(it.coeff);
                                const isNeg = it.coeff < 0;
                                const displayCount = Math.min(absCount, 24);
                                const iconSize = getConcreteIconSize(totalCount, isCompact);
                                return (
                                  <React.Fragment key={groupIdx}>
                                    {groupIdx > 0 && (
                                      <span className={cn(
                                        "font-black select-none text-slate-400",
                                        isCompact ? "text-xs px-0.5" : "text-sm px-1"
                                      )}>
                                        +
                                      </span>
                                    )}
                                    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                                      {Array.from({ length: displayCount }).map((_, iconIdx) => (
                                        <div
                                          key={iconIdx}
                                          className={cn(
                                            "rounded-lg border flex items-center justify-center select-none relative shadow-2xs font-bold leading-none overflow-visible",
                                            iconSize,
                                            colorMode === 'color'
                                              ? isNeg ? "bg-rose-50 border-rose-300 text-rose-900" : "bg-white border-sky-200 text-slate-800"
                                              : "bg-white border-slate-400 text-slate-800"
                                          )}
                                          title={`${it.label || it.symbol} (${iconIdx + 1}/${absCount})`}
                                        >
                                          <span className="leading-none select-none flex items-center justify-center">
                                            {it.emoji || (it.symbol === '1' ? '🪙' : it.symbol)}
                                          </span>
                                          {isNeg && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center">
                                              -
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                      {absCount > 24 && (
                                        <span className="text-[10px] font-bold text-slate-400">
                                          +{absCount - 24}
                                        </span>
                                      )}
                                    </div>
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          ) : taskMode === 'concrete-fused' ? (
                            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap content-center py-1">
                              {task.items.map((it, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && <span className="font-bold text-slate-400 text-xs">+</span>}
                                  <div
                                    className={cn(
                                      "rounded-lg border font-black flex items-center gap-1.5 whitespace-nowrap",
                                      isCompact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
                                      colorMode === 'color'
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                                        : "bg-white border-slate-400 text-slate-900"
                                    )}
                                  >
                                    <span className={isCompact ? "text-base" : "text-lg"}>{it.emoji || it.symbol}</span>
                                    <span>{it.coeff} db</span>
                                    {it.label && <span className="text-[10px] text-slate-500 font-medium">({it.label})</span>}
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          ) : taskMode === 'bridge' ? (
                            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap content-center py-1">
                              {task.items.map((it, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && <span className="font-bold text-slate-400 text-xs">+</span>}
                                  <div
                                    className={cn(
                                      "rounded-lg border font-black flex items-center gap-1.5 font-mono whitespace-nowrap",
                                      isCompact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
                                      colorMode === 'color'
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-900"
                                        : "bg-white border-slate-400 text-slate-900"
                                    )}
                                  >
                                    <span className="font-black text-indigo-700">
                                      {it.coeff}{it.symbol === '1' ? '' : it.symbol}
                                    </span>
                                    {it.emoji && <span className="not-italic">{it.emoji}</span>}
                                    {it.label && <span className="text-[10px] text-slate-500 font-sans font-medium">({it.label})</span>}
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          ) : (
                            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap content-center py-1">
                              {task.items.map((it, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "rounded-lg border font-mono font-black flex items-center gap-1 whitespace-nowrap",
                                    isCompact ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
                                    colorMode === 'color'
                                      ? "bg-slate-100 border-slate-300 text-slate-800"
                                      : "bg-white border-slate-400 text-slate-900"
                                  )}
                                >
                                  <span>{it.coeff > 0 && i > 0 ? '+' : ''}{it.coeff === 1 && it.symbol !== '1' ? '' : it.coeff}{it.symbol === '1' ? '' : it.symbol}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Drawing Area: The Small Clouds */}
                        <div className={cn("flex-1 flex flex-col justify-start mt-2 mb-1.5", isCompact ? "" : "mt-2 mb-1.5")}>
                          <p className={cn("font-bold text-slate-500 mb-1 flex-shrink-0", isCompact ? "text-[11px]" : "text-xs")}>
                            ✍️ Rajzold vagy írd be az elemeket a felhőkbe:
                          </p>
                          <div
                            className={cn(
                              "grid gap-2 flex-1 items-stretch",
                              task.numClouds === 2 && "grid-cols-2",
                              task.numClouds === 3 && "grid-cols-3",
                              task.numClouds === 4 && (isCompact ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4"),
                              task.numClouds >= 5 && (isCompact ? "grid-cols-5" : "grid-cols-3 sm:grid-cols-5")
                            )}
                          >
                            {Array.from({ length: task.numClouds }).map((_, cIdx) => (
                              <div
                                key={cIdx}
                                className={cn(
                                  "relative rounded-xl border-2 border-dashed bg-white w-full h-full min-h-[80px]",
                                  colorMode === 'color' ? "border-sky-300" : "border-slate-500"
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Mathematical Conclusion Line (Fill in the blanks) */}
                        <div className={cn(
                          "rounded-xl border flex flex-col flex-shrink-0",
                          isCompact ? "py-1.5 px-3 gap-0.5" : "py-2 px-3.5 gap-1",
                          colorMode === 'color'
                            ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                            : "bg-slate-50 border-slate-300 text-slate-900"
                        )}>
                          <div className="flex items-center justify-between">
                            <span className={cn("font-black uppercase tracking-wider text-slate-500", isCompact ? "text-[10px]" : "text-xs")}>
                              Matematikai felírás (Kiemelés):
                            </span>
                            <span className={cn("font-bold text-emerald-700", isCompact ? "text-[9px]" : "text-[10px]")}>
                              Töltsd ki az üreseket!
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-nowrap font-mono font-black text-xs md:text-sm whitespace-nowrap overflow-x-visible">
                            <span className="whitespace-nowrap px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs text-slate-900 font-extrabold tracking-wide">
                              {displayExpr}
                            </span>
                            <span className="text-slate-600 font-black whitespace-nowrap">=</span>
                            {/* Factor box */}
                            <div
                              className={cn(
                                "rounded-md border-2 border-dashed border-indigo-400 bg-white flex items-center justify-center text-indigo-500 font-mono font-black flex-shrink-0 shadow-2xs",
                                layout === '4-per-page' ? "w-6 h-6 text-xs" : "w-7 h-7 text-xs"
                              )}
                              title="Hány felhő van összesen?"
                            >
                              ?
                            </div>
                            <span className="text-slate-600 font-black whitespace-nowrap">· (</span>
                            {/* Inner content box */}
                            <div
                              className={cn(
                                "rounded-md border-2 border-dashed border-indigo-400 bg-white flex items-center justify-center text-slate-400 font-mono flex-shrink-0 shadow-2xs whitespace-nowrap px-2 font-normal",
                                layout === '4-per-page' ? "h-6 min-w-[70px] text-[10px]" : "h-7 min-w-[120px] text-xs"
                              )}
                            >
                              {layout === '4-per-page' ? '1 felhő tartalma' : 'egyes felhő tartalma'}
                            </div>
                            <span className="text-slate-600 font-black whitespace-nowrap">)</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3. Page Footer */}
                <footer className={cn("border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-bold flex-shrink-0", layout === '4-per-page' ? "pt-2 mt-2" : "pt-2 mt-2")}>
                  <span>Készült a diákzóna.hu eszközével</span>
                  <span>{pageIdx + 1} / {pages.length + (includeSolutions ? 1 : 0)} oldal</span>
                </footer>
              </div>
            ))}

            {/* Optional Teacher's Solution Page */}
            {includeSolutions && (
              <div
                className="print-page relative w-full bg-white text-slate-900 shadow-2xl rounded-sm p-8 md:p-10 flex flex-col justify-between border border-emerald-400 min-h-[297mm]"
                style={{ aspectRatio: '210 / 297' }}
              >
                <div>
                  <header className="pb-3 mb-6 border-b-2 border-emerald-600 flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-black text-emerald-900 flex items-center gap-2">
                        <Check className="w-6 h-6 text-emerald-600" />
                        Tanári Megoldókulcs (Dolgozat)
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {worksheetTitle} – Helyes megoldások a feladatlaphoz
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                      Megoldások
                    </span>
                  </header>

                  <div className="space-y-4">
                    {tasks.map((task, idx) => {
                      const taskMode = task.repMode || globalRepMode;
                      const displayExpr = getTaskExpr(task, taskMode);
                      const displaySolutionInner = getTaskSolutionExpr(task, taskMode);
                      return (
                        <div
                          key={task.id}
                          className="p-3.5 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center justify-between text-xs font-black text-emerald-950">
                            <span>{idx + 1}. Feladat Helyes Megoldása:</span>
                            <span className="font-mono text-sm text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 whitespace-nowrap">
                              {displayExpr} = <strong>{task.solution.factor} · ({displaySolutionInner})</strong>
                            </span>
                          </div>

                          <div className="text-xs text-slate-700 flex items-center gap-2 mt-1">
                            <span className="font-bold">Minden kis felhőbe került:</span>
                            <div className="flex items-center gap-1.5">
                              {task.solution.innerItems.map((it, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-white border border-emerald-300 font-bold text-xs text-emerald-800">
                                  {it.coeff} db {it.emoji || it.symbol} {it.label ? `(${it.label})` : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <footer className="pt-3 mt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-bold">
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
