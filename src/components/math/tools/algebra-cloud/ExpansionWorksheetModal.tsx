import React, { useState, useMemo } from 'react';
import { CloudContainer, CloudItem, RepresentationMode } from './types';
import { formatCloudExpression } from './data';
import { COMBINING_PRESETS, CombiningPreset } from './CombiningCloudStage';
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

export interface ExpansionTask {
  id: string;
  title: string;
  multiplier: number;
  repMode?: RepresentationMode;
  baseItems: {
    symbol: string;
    emoji?: string;
    label?: string;
    type: 'variable' | 'constant';
    coeff: number;
  }[];
  solution: {
    combinedExpr: string;
    combinedItems: {
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
  { id: 'abstract', label: 'Algebrai tagok (betűk)', shortLabel: '📐 Algebrai', icon: '📐', desc: 'Tiszta algebrai betűk és számok (pl. 3x + 6y)' },
];

interface ExpansionWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBaseCloud: CloudContainer;
  currentMultiplier: number;
  repMode: RepresentationMode;
}

export const ExpansionWorksheetModal: React.FC<ExpansionWorksheetModalProps> = ({
  isOpen,
  onClose,
  currentBaseCloud,
  currentMultiplier,
  repMode,
}) => {
  // 1. Layout configuration: 2 per page or 4 per page
  const [layout, setLayout] = useState<'2-per-page' | '4-per-page'>('2-per-page');

  // 2. Color mode: Full vibrant colors or B&W ink-saver line art
  const [colorMode, setColorMode] = useState<'color' | 'bw'>('color');

  // 3. Worksheet meta
  const [worksheetTitle, setWorksheetTitle] = useState('Matematika Dolgozat: Zárójelfelbontás és Beszorzás');
  const [instructions, setInstructions] = useState('Bontsd fel a zárójeleket a csomagok sokszorosításával! Rajzold vagy írd be az összesített elemeket a nagy felhőbe, majd töltsd ki az egyenlőséget!');
  const [includeSolutions, setIncludeSolutions] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // 4. Global Didactic representation mode for the starting packages
  const [globalRepMode, setGlobalRepMode] = useState<RepresentationMode>(repMode || 'concrete');

  // Helper to format a task's base expression
  const getTaskBaseExpr = (task: ExpansionTask, mode: RepresentationMode) => {
    const virtualCloud: CloudContainer = {
      id: task.id,
      title: task.title,
      multiplier: 1,
      items: task.baseItems.map((it, idx) => ({
        id: `${task.id}-item-${idx}`,
        symbol: it.symbol,
        emoji: it.emoji,
        label: it.label,
        type: it.type,
        coefficient: it.coeff,
      })),
      colorTheme: 'purple',
    };
    return formatCloudExpression(virtualCloud, mode);
  };

  // Helper to size concrete icons nicely inside small clouds
  const getSmallCloudIconSize = (count: number, isCompact: boolean) => {
    if (isCompact) {
      if (count <= 4) return "w-7 h-7 text-sm";
      if (count <= 8) return "w-6 h-6 text-xs";
      return "w-5 h-5 text-[10px]";
    } else {
      if (count <= 4) return "w-8 h-8 text-base";
      if (count <= 8) return "w-7 h-7 text-sm";
      return "w-6 h-6 text-xs";
    }
  };

  // Convert a preset into an ExpansionTask
  const createWorksheetTaskFromPreset = (preset: CombiningPreset, index: number, customMode?: RepresentationMode): ExpansionTask => {
    const mult = preset.multiplier;
    const taskRep = customMode || globalRepMode;

    const combinedItems = preset.baseItems.map(it => ({
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      coeff: it.coeff * mult,
    }));

    const combinedVirtualCloud: CloudContainer = {
      id: `virtual-sol-${index}`,
      title: '',
      multiplier: 1,
      items: combinedItems.map((v, i) => ({
        id: `sol-item-${i}`,
        symbol: v.symbol,
        emoji: v.emoji,
        label: v.label,
        type: v.symbol === '1' ? 'constant' : 'variable',
        coefficient: v.coeff,
      })),
      colorTheme: 'blue',
    };

    const combinedExpr = formatCloudExpression(combinedVirtualCloud, taskRep);

    return {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `${index + 1}. Feladat`,
      multiplier: mult,
      repMode: taskRep,
      baseItems: preset.baseItems,
      solution: {
        combinedExpr,
        combinedItems,
      },
    };
  };

  // Convert current stage state into an ExpansionTask
  const createCurrentStageTask = (index: number): ExpansionTask | null => {
    if (!currentBaseCloud.items || currentBaseCloud.items.length === 0) return null;

    const mult = Math.max(1, currentMultiplier || 1);
    const baseItems = currentBaseCloud.items.map(it => ({
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      type: it.type,
      coeff: it.coefficient,
    }));

    const combinedItems = baseItems.map(it => ({
      symbol: it.symbol,
      emoji: it.emoji,
      label: it.label,
      coeff: it.coeff * mult,
    }));

    const combinedVirtual: CloudContainer = {
      id: 'comb-virtual-curr',
      title: '',
      multiplier: 1,
      items: combinedItems.map((v, i) => ({
        id: `curr-${i}`,
        symbol: v.symbol,
        emoji: v.emoji,
        label: v.label,
        type: v.symbol === '1' ? 'constant' : 'variable',
        coefficient: v.coeff,
      })),
      colorTheme: 'blue',
    };

    const combinedExpr = formatCloudExpression(combinedVirtual, globalRepMode);

    return {
      id: `task-curr-${Date.now()}`,
      title: `${index + 1}. Feladat`,
      multiplier: mult,
      repMode: globalRepMode,
      baseItems,
      solution: {
        combinedExpr,
        combinedItems,
      },
    };
  };

  // Initial task list: 2 or 4 tasks
  const [tasks, setTasks] = useState<ExpansionTask[]>(() => {
    const list: ExpansionTask[] = [];
    const stageTask = createCurrentStageTask(0);
    if (stageTask) {
      list.push(stageTask);
    } else {
      list.push(createWorksheetTaskFromPreset(COMBINING_PRESETS[1], 0)); // 2 · (2🍎 + 3🍐)
    }
    list.push(createWorksheetTaskFromPreset(COMBINING_PRESETS[2], 1)); // 2 · (3🍎 + 4)
    list.push(createWorksheetTaskFromPreset(COMBINING_PRESETS[3], 2)); // 3 · (1🍕 + 2🥤)
    list.push(createWorksheetTaskFromPreset(COMBINING_PRESETS[4], 3)); // 4 · (2🐶 + 1🐱)
    return list;
  });

  // Global Representation Mode switcher
  const handleSetGlobalRepMode = (mode: RepresentationMode) => {
    setGlobalRepMode(mode);
    setTasks(prev => prev.map(t => ({ ...t, repMode: mode })));
    toast.success(`Csomagok ábrázolása: ${DIDACTIC_LEVELS.find(d => d.id === mode)?.label}`);
  };

  // Per-task representation mode updater
  const handleUpdateTaskRepMode = (taskId: string, mode: RepresentationMode) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, repMode: mode } : t)));
  };

  // Handle adding current stage task
  const handleAddCurrentStage = () => {
    const newTask = createCurrentStageTask(tasks.length);
    if (newTask) {
      setTasks(prev => [...prev, newTask]);
      toast.success('Aktuális feladat hozzáadva a feladatlaphoz!');
    } else {
      toast.error('Az alapfelhő jelenleg üres! Helyezz el elemeket a játéktéren.');
    }
  };

  // Handle adding a preset
  const handleAddPreset = (preset: CombiningPreset) => {
    const newTask = createWorksheetTaskFromPreset(preset, tasks.length);
    setTasks(prev => [...prev, newTask]);
    toast.success(`Hozzáadva: ${preset.name}`);
  };

  // Handle generating random tasks
  const handleGenerateRandom = (count: number) => {
    const shuffled = [...COMBINING_PRESETS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    const newTasks = selected.map((p, idx) => createWorksheetTaskFromPreset(p, idx));
    setTasks(newTasks);
    toast.success(`${count} új véletlenszerű feladat generálva!`);
  };

  // Remove task
  const handleRemoveTask = (id: string) => {
    if (tasks.length <= 1) {
      toast.error('Legalább egy feladatnak szerepelnie kell a dolgozaton!');
      return;
    }
    setTasks(prev => prev.filter(t => t.id !== id).map((t, idx) => ({ ...t, title: `${idx + 1}. Feladat` })));
  };

  // Export PDF State
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Handle Print Action
  const handlePrint = () => {
    window.print();
  };

  // Handle Download PDF Action
  const handleDownloadPDF = async () => {
    try {
      setIsExportingPdf(true);
      await exportElementToPDF('printable-expansion-worksheet', worksheetTitle);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Chunk tasks into pages (2 tasks per page or 4 tasks per page)
  const pageSize = layout === '4-per-page' ? 4 : 2;
  const pages = useMemo(() => {
    const res: ExpansionTask[][] = [];
    for (let i = 0; i < tasks.length; i += pageSize) {
      res.push(tasks.slice(i, i + pageSize));
    }
    return res;
  }, [tasks, pageSize]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md animate-fade-in select-none">
      {/* 1. Modal Top Bar */}
      <header className="h-16 px-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-md flex-shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-black text-slate-800 dark:text-white truncate">
              Zárójelfelbontás Dolgozat & Feladatlap Készítő
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
            className="h-9 px-3.5 text-xs font-black rounded-xl gap-1.5 shadow-sm bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
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

      {/* 2. Main Studio Body: Left Settings Sidebar + Right Live A4 Sheet Preview */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
        {/* Left Settings Sidebar */}
        <aside className="w-full md:w-[350px] lg:w-[370px] min-w-[320px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-y-auto p-4 gap-4 shadow-sm z-20">
          {/* Section A: Global Didactic Level for Starting Packages */}
          <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                Csomagok Didaktikai Szintje:
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Válaszd ki, hogyan jelenjenek meg az elemek a kis felhőkben a feladatlapon:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {DIDACTIC_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => handleSetGlobalRepMode(lvl.id)}
                  className={cn(
                    "px-2 py-1.5 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer flex flex-col justify-center",
                    globalRepMode === lvl.id
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs font-black"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  )}
                  title={lvl.desc}
                >
                  <span className="flex items-center gap-1">
                    <span>{lvl.icon}</span>
                    <span className="truncate">{lvl.shortLabel}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Page Layout & Appearance */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              Elrendezés & Megjelenés:
            </span>

            {/* Layout switch */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLayout('2-per-page')}
                className={cn(
                  "p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer",
                  layout === '2-per-page'
                    ? "bg-purple-50 dark:bg-purple-950/40 border-purple-300 text-purple-900 dark:text-purple-200 font-black shadow-xs ring-1 ring-purple-300"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">2 feladat / lap</span>
                  <LayoutGrid className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-slate-400">Tágas, nagy rajzolós felhőkkel (SNI ajánlott)</span>
              </button>

              <button
                onClick={() => setLayout('4-per-page')}
                className={cn(
                  "p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer",
                  layout === '4-per-page'
                    ? "bg-purple-50 dark:bg-purple-950/40 border-purple-300 text-purple-900 dark:text-purple-200 font-black shadow-xs ring-1 ring-purple-300"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">4 feladat / lap</span>
                  <LayoutGrid className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-slate-400">Kompakt, 2×2-es mátrix (papírtakarékos)</span>
              </button>
            </div>

            {/* Color mode */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Színmód:</span>
              <div className="flex items-center gap-1 bg-white dark:bg-slate-700 p-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
                <button
                  onClick={() => setColorMode('color')}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer",
                    colorMode === 'color' ? "bg-purple-600 text-white shadow-xs" : "text-slate-500"
                  )}
                >
                  🌈 Színes
                </button>
                <button
                  onClick={() => setColorMode('bw')}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer",
                    colorMode === 'bw' ? "bg-slate-900 text-white shadow-xs" : "text-slate-500"
                  )}
                >
                  🖨️ Fekete-fehér
                </button>
              </div>
            </div>

            {/* Header & Solutions checkboxes */}
            <div className="space-y-1.5 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showHeader}
                  onChange={e => setShowHeader(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Fejléc (Név, Osztály, Dátum, Pontszám)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={includeSolutions}
                  onChange={e => setIncludeSolutions(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Megoldókulcs oldal mellékelése a végén</span>
              </label>
            </div>
          </div>

          {/* Section C: Worksheet Title & Instructions Edit */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              Dolgozat Címe & Utasítás:
            </span>
            <input
              type="text"
              value={worksheetTitle}
              onChange={e => setWorksheetTitle(e.target.value)}
              className="w-full text-xs font-bold p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              placeholder="Dolgozat címe"
            />
            <textarea
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              rows={2}
              className="w-full text-[11px] font-medium p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 resize-none"
              placeholder="Utasítások a diákoknak"
            />
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
                  className="h-6 px-2 text-[10px] font-bold rounded-lg gap-1 border-purple-200 text-purple-700 hover:bg-purple-50 cursor-pointer"
                  title="A jelenleg a játéktéren látható feladat hozzáadása"
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
                const baseExpr = getTaskBaseExpr(task, currentTaskMode);
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
                        <span className="font-mono text-xs font-black text-purple-700 dark:text-purple-300 truncate">
                          {task.multiplier} · ({baseExpr})
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
                                  ? "bg-purple-600 text-white border-purple-600 shadow-2xs font-black"
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
                {COMBINING_PRESETS.slice(0, 8).map(preset => (
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

          {/* Printable Worksheet Element (Container captured or printed) */}
          <div id="printable-expansion-worksheet" className="w-full max-w-[210mm] space-y-6">
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
                    const baseExpr = getTaskBaseExpr(task, taskMode);
                    const isCompact = layout === '4-per-page';
                    const totalBaseCount = task.baseItems.reduce((sum, it) => sum + Math.abs(it.coeff), 0);

                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "rounded-2xl border-2 flex flex-col justify-between transition-all h-full",
                          isCompact ? "p-3 sm:p-3.5" : "p-3.5 sm:p-4",
                          colorMode === 'color'
                            ? "border-purple-300 bg-gradient-to-b from-purple-50/40 via-white to-sky-50/30"
                            : "border-slate-800 bg-white"
                        )}
                        style={{ minHeight: layout === '2-per-page' ? '92mm' : undefined }}
                      >
                        {/* Task Title Header */}
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200 flex-shrink-0">
                          <span className={cn("font-black text-slate-900", isCompact ? "text-sm" : "text-base")}>
                            {task.title}: <strong className="font-mono text-purple-700 whitespace-nowrap">{task.multiplier} · ({baseExpr})</strong>
                          </span>
                          <span className={cn("font-bold text-slate-500 whitespace-nowrap", isCompact ? "text-[11px]" : "text-xs")}>
                            {task.multiplier} egyforma csomag
                          </span>
                        </div>

                        {/* Top: The Given Small Clouds (The k packages) */}
                        <div className={cn(
                          "rounded-xl border flex flex-col justify-start mt-1.5 flex-shrink-0",
                          isCompact ? "p-2 min-h-[80px]" : "p-2.5 min-h-[90px]",
                          colorMode === 'color'
                            ? "bg-purple-50/40 border-purple-200"
                            : "bg-slate-50 border-slate-300"
                        )}>
                          <div className="flex items-center justify-between text-[11px] leading-tight mb-1 flex-shrink-0">
                            <div className="flex items-center gap-1.5">
                              <span className={isCompact ? "text-xs" : "text-sm"}>☁️</span>
                              <span className="font-extrabold text-slate-800">
                                {task.multiplier} egyforma csomag (Kiinduló kis felhők):
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold">
                              {taskMode === 'concrete' && '🍎 Egyenként'}
                              {taskMode === 'concrete-fused' && '🔢 Csoportos'}
                              {taskMode === 'bridge' && '🌉 Áthidaló'}
                              {taskMode === 'abstract' && '📐 Algebrai'}
                            </span>
                          </div>

                          {/* Small clouds row (1..k clouds) */}
                          <div className={cn(
                            "grid gap-2 items-stretch py-1 flex-1",
                            task.multiplier === 1 && "grid-cols-1 max-w-[180px] mx-auto",
                            task.multiplier === 2 && "grid-cols-2",
                            task.multiplier === 3 && "grid-cols-3",
                            task.multiplier === 4 && (isCompact ? "grid-cols-4" : "grid-cols-4"),
                            task.multiplier >= 5 && (isCompact ? "grid-cols-5" : "grid-cols-5")
                          )}>
                            {Array.from({ length: task.multiplier }).map((_, cIdx) => (
                              <div
                                key={cIdx}
                                className={cn(
                                  "rounded-lg border-2 p-1.5 flex flex-col justify-between items-center text-center bg-white shadow-2xs",
                                  colorMode === 'color' ? "border-purple-300 bg-white/95" : "border-slate-500"
                                )}
                              >
                                <span className="text-[9px] font-black text-slate-400 mb-0.5">
                                  {cIdx + 1}. csomag
                                </span>

                                {/* Items drawn in this small cloud based on didactic mode */}
                                {taskMode === 'concrete' ? (
                                  <div className="flex items-center justify-center gap-1 flex-wrap content-center py-0.5">
                                    {task.baseItems.map((it, gIdx) => {
                                      const absCount = Math.abs(it.coeff);
                                      const isNeg = it.coeff < 0;
                                      const iconSize = getSmallCloudIconSize(totalBaseCount, isCompact);
                                      return (
                                        <React.Fragment key={gIdx}>
                                          {gIdx > 0 && <span className="text-[10px] font-bold text-slate-300">+</span>}
                                          <div className="flex items-center gap-0.5 flex-wrap justify-center">
                                            {Array.from({ length: absCount }).map((_, iIdx) => (
                                              <div
                                                key={iIdx}
                                                className={cn(
                                                  "rounded border flex items-center justify-center font-bold leading-none select-none relative",
                                                  iconSize,
                                                  colorMode === 'color'
                                                    ? isNeg ? "bg-rose-50 border-rose-300 text-rose-900" : "bg-white border-purple-200 text-slate-800"
                                                    : "bg-white border-slate-400 text-slate-800"
                                                )}
                                              >
                                                <span>{it.emoji || (it.symbol === '1' ? '🪙' : it.symbol)}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </React.Fragment>
                                      );
                                    })}
                                  </div>
                                ) : taskMode === 'concrete-fused' ? (
                                  <div className="flex items-center justify-center gap-1 flex-wrap content-center py-0.5">
                                    {task.baseItems.map((it, i) => (
                                      <React.Fragment key={i}>
                                        {i > 0 && <span className="text-[10px] text-slate-400 font-bold">+</span>}
                                        <div className="px-1.5 py-0.5 rounded border text-[10px] font-black bg-purple-50 text-purple-900 border-purple-200 flex items-center gap-0.5">
                                          <span>{it.emoji || it.symbol}</span>
                                          <span>{it.coeff}db</span>
                                        </div>
                                      </React.Fragment>
                                    ))}
                                  </div>
                                ) : taskMode === 'bridge' ? (
                                  <div className="flex items-center justify-center gap-1 flex-wrap content-center py-0.5">
                                    {task.baseItems.map((it, i) => (
                                      <React.Fragment key={i}>
                                        {i > 0 && <span className="text-[10px] text-slate-400 font-bold">+</span>}
                                        <div className="px-1.5 py-0.5 rounded border text-[10px] font-mono font-black bg-purple-50 text-purple-900 border-purple-200 flex items-center gap-0.5">
                                          <span>{it.coeff}{it.symbol === '1' ? '' : it.symbol}</span>
                                          {it.emoji && <span>{it.emoji}</span>}
                                        </div>
                                      </React.Fragment>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-1 flex-wrap content-center py-0.5 font-mono text-[10px] font-black text-slate-800">
                                    <span>{baseExpr}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom: Drawing Area (The Large Collector Cloud) */}
                        <div className={cn("flex-1 flex flex-col justify-start mt-2 mb-1.5", isCompact ? "" : "mt-2 mb-1.5")}>
                          <p className={cn("font-bold text-slate-500 mb-1 flex-shrink-0", isCompact ? "text-[11px]" : "text-xs")}>
                            ✍️ Rajzold vagy írd be az összesített elemeket a nagy gyűjtőfelhőbe:
                          </p>
                          <div
                            className={cn(
                              "relative rounded-2xl border-2 border-dashed bg-white w-full flex-1 flex flex-col items-center justify-center p-2.5",
                              isCompact ? "min-h-[75px]" : "min-h-[85px]",
                              colorMode === 'color' ? "border-sky-300 bg-sky-50/20" : "border-slate-500 bg-white"
                            )}
                          >
                            <span className="text-slate-300 text-xs font-bold select-none">
                              ☁️ Összesített fő halmaz helye (ide gyűjtsd az összes elemet!)
                            </span>
                          </div>
                        </div>

                        {/* Mathematical Conclusion Line (Zárójelfelbontás) */}
                        <div className={cn(
                          "rounded-xl border flex flex-col flex-shrink-0",
                          isCompact ? "py-1.5 px-3 gap-0.5" : "py-2 px-3.5 gap-1",
                          colorMode === 'color'
                            ? "bg-purple-50/70 border-purple-200 text-purple-950"
                            : "bg-slate-50 border-slate-300 text-slate-900"
                        )}>
                          <div className="flex items-center justify-between">
                            <span className={cn("font-black uppercase tracking-wider text-slate-500", isCompact ? "text-[10px]" : "text-xs")}>
                              Matematikai felírás (Zárójelfelbontás):
                            </span>
                            <span className={cn("font-bold text-purple-700", isCompact ? "text-[9px]" : "text-[10px]")}>
                              Írd be a végeredményt!
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-nowrap font-mono font-black text-xs md:text-sm whitespace-nowrap overflow-x-visible">
                            <span className="whitespace-nowrap px-2.5 py-0.5 rounded bg-white border border-slate-200 shadow-2xs text-slate-900 font-extrabold tracking-wide">
                              {task.multiplier} · ({baseExpr})
                            </span>
                            <span className="text-slate-600 font-black whitespace-nowrap">=</span>
                            {/* Answer Box */}
                            <div
                              className={cn(
                                "rounded-md border-2 border-dashed border-purple-400 bg-white flex items-center justify-center text-slate-400 font-mono flex-shrink-0 shadow-2xs whitespace-nowrap px-3 font-normal",
                                isCompact ? "h-6 min-w-[120px] text-[10px]" : "h-7 min-w-[160px] text-xs"
                              )}
                            >
                              összesített eredmény
                            </div>
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
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      Megoldókulcs: {worksheetTitle}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Tanári segédlet és ellenőrző lap
                    </p>
                  </header>

                  <div className="grid grid-cols-2 gap-4">
                    {tasks.map((task, idx) => {
                      const taskMode = task.repMode || globalRepMode;
                      const baseExpr = getTaskBaseExpr(task, taskMode);
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
                              {task.multiplier} csomag
                            </span>
                          </div>
                          <div className="font-mono text-xs font-bold text-slate-600">
                            Kiinduló: <strong>{task.multiplier} · ({baseExpr})</strong>
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 font-mono font-black text-xs text-emerald-900 flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{task.multiplier} · ({baseExpr}) = <strong>{task.solution.combinedExpr}</strong></span>
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
