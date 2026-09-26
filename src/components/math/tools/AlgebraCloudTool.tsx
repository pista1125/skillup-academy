import React, { useState, useMemo } from 'react';
import {
  ThemeCategoryId,
  RepresentationMode,
  ToolTab,
  CloudContainer,
  CloudItem,
} from './algebra-cloud/types';
import {
  THEME_CATEGORIES,
  ABSTRACT_VARIABLES,
  formatCloudExpression,
} from './algebra-cloud/data';
import { CloudBox } from './algebra-cloud/CloudBox';
import { FactoringCloudStage } from './algebra-cloud/FactoringCloudStage';
import { CombiningCloudStage } from './algebra-cloud/CombiningCloudStage';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  GitMerge,
  Plus,
  RefreshCw,
  Volume2,
  VolumeX,
  LayoutGrid,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AlgebraCloudToolProps {
  onBack: () => void;
}

export function AlgebraCloudTool({ onBack }: AlgebraCloudToolProps) {
  // Navigation & Mode
  const [activeTab, setActiveTab] = useState<ToolTab>('sandbox');
  const [repMode, setRepMode] = useState<RepresentationMode>('concrete-fused');
  const [selectedTheme, setSelectedTheme] = useState<ThemeCategoryId>('fruits');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sandbox State
  const [clouds, setClouds] = useState<CloudContainer[]>([
    {
      id: 'cloud-1',
      title: '1. Felhő',
      multiplier: 1,
      colorTheme: 'blue',
      items: [
        { id: 'init-1', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 3, isFusedBlock: true, fusedSize: 3 },
        { id: 'init-2', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
        { id: 'init-3', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
      ]
    },
    {
      id: 'cloud-2',
      title: '2. Felhő',
      multiplier: 1,
      colorTheme: 'indigo',
      items: [
        { id: 'init-4', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 1 },
        { id: 'init-5', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 4, isFusedBlock: true, fusedSize: 4 },
      ]
    }
  ]);
  const [selectedCloudId, setSelectedCloudId] = useState<string>('cloud-1');

  // Factoring Mode State (Kiemelés Mód)
  const [topCloud, setTopCloud] = useState<CloudContainer>({
    id: 'top-cloud-factoring',
    title: 'Nagy Felhő (Kiinduló Kifejezés)',
    multiplier: 1,
    colorTheme: 'blue',
    items: [
      { id: 'fact-init-1', symbol: 'x', type: 'variable', label: 'x változó', coefficient: 4, isFusedBlock: true, fusedSize: 4 },
      { id: 'fact-init-2', symbol: 'y', type: 'variable', label: 'y változó', coefficient: 8, isFusedBlock: true, fusedSize: 8 },
    ]
  });

  const [smallClouds, setSmallClouds] = useState<CloudContainer[]>([
    { id: 'small-1', title: '1. Kis felhő', multiplier: 1, colorTheme: 'blue', items: [] },
    { id: 'small-2', title: '2. Kis felhő', multiplier: 1, colorTheme: 'indigo', items: [] },
    { id: 'small-3', title: '3. Kis felhő', multiplier: 1, colorTheme: 'purple', items: [] },
    { id: 'small-4', title: '4. Kis felhő', multiplier: 1, colorTheme: 'emerald', items: [] },
  ]);

  // Combining Mode State (Összevonás Mód)
  const [combiningBaseCloud, setCombiningBaseCloud] = useState<CloudContainer>({
    id: 'comb-base-cloud',
    title: 'Alap Kis Felhő',
    multiplier: 1,
    colorTheme: 'purple',
    items: [
      { id: 'comb-base-1', symbol: 'a', type: 'variable', emoji: '🍎', label: 'Alma', coefficient: 2, isFusedBlock: true, fusedSize: 2 },
      { id: 'comb-base-2', symbol: 'k', type: 'variable', emoji: '🍐', label: 'Körte', coefficient: 3, isFusedBlock: true, fusedSize: 3 },
    ]
  });

  // Spawner controls
  const [spawnQuantity, setSpawnQuantity] = useState<number>(1);
  const [spawnSign, setSpawnSign] = useState<1 | -1>(1);
  const [customInputVal, setCustomInputVal] = useState<string>('1');

  const handleCustomInputChange = (valStr: string) => {
    setCustomInputVal(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed)) {
      if (parsed < 0) {
        setSpawnSign(-1);
        setSpawnQuantity(Math.abs(parsed));
      } else if (parsed > 0) {
        setSpawnSign(1);
        setSpawnQuantity(parsed);
      }
    }
  };

  // Simple Sound generator via Web Audio API
  const playSound = (type: 'pop' | 'sparkle' | 'success' | 'magic') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'pop') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === 'sparkle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.06);
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } else if (type === 'magic') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Add Item to Cloud in Sandbox
  const handleAddItemToCloud = (
    symbol: string,
    emoji?: string,
    label?: string,
    type: 'variable' | 'constant' = 'variable',
    targetCloudId?: string,
    customCoeff?: number
  ) => {
    const targetCloud = clouds.find(c => c.id === (targetCloudId || selectedCloudId)) || clouds[0];
    if (!targetCloud) return;

    const coeff = customCoeff !== undefined ? customCoeff : (spawnSign * spawnQuantity);
    const isFused = Math.abs(coeff) > 1;

    const newItem: CloudItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      symbol,
      type,
      emoji,
      label,
      coefficient: coeff,
      category: selectedTheme,
      isFusedBlock: isFused,
      fusedSize: Math.abs(coeff)
    };

    if (activeTab === 'factoring') {
      setTopCloud(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
      playSound('pop');
      return;
    }

    if (activeTab === 'combining') {
      setCombiningBaseCloud(prev => ({
        ...prev,
        items: [...prev.items, newItem]
      }));
      playSound('pop');
      return;
    }

    setClouds(clouds.map(c => {
      if (c.id === targetCloud.id) {
        return {
          ...c,
          items: [...c.items, newItem]
        };
      }
      return c;
    }));

    playSound('pop');
  };

  // Drag start from sidebar palette
  const handlePaletteDragStart = (e: React.DragEvent, item: { symbol: string; emoji?: string; label?: string; type?: 'variable' | 'constant' }) => {
    const coeff = spawnSign * spawnQuantity;
    const payload = {
      symbol: item.symbol,
      emoji: item.emoji,
      label: item.label,
      type: item.type || 'variable',
      coefficient: coeff
    };
    e.dataTransfer.setData('application/palette-item', JSON.stringify(payload));
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Transfer item from Cloud A to Cloud B
  const handleTransferItemBetweenClouds = (sourceCloudId: string, targetCloudId: string, item: CloudItem) => {
    if (sourceCloudId === targetCloudId) return;

    setClouds(clouds.map(c => {
      if (c.id === sourceCloudId) {
        return { ...c, items: c.items.filter(i => i.id !== item.id) };
      }
      if (c.id === targetCloudId) {
        return { ...c, items: [...c.items, { ...item, id: `trans-${Date.now()}-${Math.random().toString(36).substr(2, 6)}` }] };
      }
      return c;
    }));
    playSound('pop');
  };

  // Add a new Cloud container in Sandbox
  const handleAddCloud = () => {
    if (clouds.length >= 4) return;
    const nextIdx = clouds.length + 1;
    const themes = ['blue', 'indigo', 'purple', 'emerald'];
    const newCloud = createInitialCloud(
      `cloud-${Date.now()}`,
      `${nextIdx}. Felhő`,
      themes[(nextIdx - 1) % themes.length]
    );
    setClouds([...clouds, newCloud]);
    setSelectedCloudId(newCloud.id);
    playSound('magic');
  };

  // Remove Cloud container
  const handleRemoveCloud = (id: string) => {
    if (clouds.length <= 1) return;
    const newClouds = clouds.filter(c => c.id !== id);
    setClouds(newClouds);
    if (selectedCloudId === id) {
      setSelectedCloudId(newClouds[0].id);
    }
  };

  // Duplicate Cloud container
  const handleDuplicateCloud = (id: string) => {
    if (clouds.length >= 4) return;
    const target = clouds.find(c => c.id === id);
    if (!target) return;

    const dup: CloudContainer = {
      ...target,
      id: `cloud-${Date.now()}`,
      title: `${clouds.length + 1}. Felhő (Másolat)`,
      items: target.items.map(item => ({
        ...item,
        id: `dup-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
      }))
    };

    setClouds([...clouds, dup]);
    setSelectedCloudId(dup.id);
    playSound('magic');
  };

  // Update specific Cloud
  const handleUpdateCloud = (updated: CloudContainer) => {
    setClouds(clouds.map(c => c.id === updated.id ? updated : c));
  };

  // Global Sandbox Action: Combine All Clouds into One
  const handleCombineAllClouds = () => {
    if (clouds.length <= 1) return;

    const allItems: CloudItem[] = [];
    clouds.forEach(c => {
      const mult = c.multiplier;
      c.items.forEach(item => {
        allItems.push({
          ...item,
          id: `merged-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          coefficient: item.coefficient * mult,
        });
      });
    });

    const unifiedCloud: CloudContainer = {
      id: 'cloud-1',
      title: 'Összesített Felhő',
      multiplier: 1,
      colorTheme: 'purple',
      items: allItems,
    };

    setClouds([unifiedCloud]);
    setSelectedCloudId(unifiedCloud.id);
    playSound('sparkle');
  };

  // Clear all clouds in Sandbox
  const handleClearAllClouds = () => {
    setClouds(clouds.map(c => ({ ...c, items: [] })));
    playSound('pop');
  };

  // Active theme items
  const activeCategory = THEME_CATEGORIES.find(c => c.id === selectedTheme) || THEME_CATEGORIES[0];

  // Total Math expression across all clouds
  const totalFormula = useMemo(() => {
    if (clouds.length === 0) return '0';
    const parts = clouds.map(c => formatCloudExpression(c, repMode, false));
    if (clouds.length === 1) return parts[0];
    return parts.join(' + ');
  }, [clouds, repMode]);

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-50 via-sky-50/50 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 text-slate-800 dark:text-slate-100 select-none">
      {/* 1. Compact Studio Header (52px) */}
      <header className="h-[52px] min-h-[52px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 px-4 flex items-center justify-between z-30 shadow-xs">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 px-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs gap-1.5 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Vissza
          </Button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <span className="text-xl">☁️</span>
            <span className="font-black text-sm md:text-base text-slate-900 dark:text-white tracking-tight">
              Algebrai Felhők Labor
            </span>
          </div>
        </div>

        {/* Center: Mode Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              activeTab === 'sandbox'
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Összevonás
          </button>
          <button
            onClick={() => setActiveTab('combining')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              activeTab === 'combining'
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <GitMerge className="w-3.5 h-3.5" />
            Zárójelfelbontás
          </button>
          <button
            onClick={() => setActiveTab('factoring')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              activeTab === 'factoring'
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            Kiemelés
          </button>
        </div>

        {/* Right: Sound toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={cn(
              "h-8 w-8 rounded-xl flex items-center justify-center transition-colors border cursor-pointer",
              soundEnabled
                ? "bg-sky-50 dark:bg-sky-950/40 border-sky-200 text-sky-600"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400"
            )}
            title={soundEnabled ? "Hangok bekapcsolva" : "Hangok némítva"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* 2. Main Studio Body (Zero Outer Scroll, Split Left Sidebar + Right Stage) */}
      <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
        {/* Left Control Sidebar (Toolbox & Controls) */}
        <aside className="w-full md:w-[340px] lg:w-[360px] min-w-[320px] bg-white/90 dark:bg-slate-900/90 border-r border-sky-100 dark:border-slate-800 flex flex-col h-full overflow-y-auto p-3.5 gap-3 shadow-xs">
              {/* Section 1: Didaktikai Szint */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  1. Didaktikai Szint:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setRepMode('concrete')}
                    className={cn(
                      "px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer",
                      repMode === 'concrete'
                        ? "bg-red-50 dark:bg-red-950/40 border-red-300 text-red-700 dark:text-red-300 shadow-xs font-black"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    )}
                  >
                    <span>🍎</span> 1. Konkrét (1 db)
                  </button>
                  <button
                    onClick={() => setRepMode('concrete-fused')}
                    className={cn(
                      "px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer",
                      repMode === 'concrete-fused'
                        ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-700 dark:text-amber-300 shadow-xs font-black"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    )}
                  >
                    <span>📦</span> 2. Tömbök (2..5)
                  </button>
                  <button
                    onClick={() => setRepMode('bridge')}
                    className={cn(
                      "px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer",
                      repMode === 'bridge'
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300 shadow-xs font-black"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    )}
                  >
                    <span>🔀</span> 3. Híd (3a = 3🍎)
                  </button>
                  <button
                    onClick={() => setRepMode('abstract')}
                    className={cn(
                      "px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all text-left flex items-center gap-1.5 border cursor-pointer",
                      repMode === 'abstract'
                        ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 text-blue-700 dark:text-blue-300 shadow-xs font-black"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    )}
                  >
                    <span>🔤</span> 4. Absztrakt (x, y)
                  </button>
                </div>
                <button
                  onClick={() => setRepMode('signed')}
                  className={cn(
                    "w-full px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1.5 border cursor-pointer",
                    repMode === 'signed'
                      ? "bg-purple-50 dark:bg-purple-950/40 border-purple-300 text-purple-700 dark:text-purple-300 shadow-xs font-black"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                  )}
                >
                  <span>❄️</span> 5. Előjeles Tagok & Nullapárok (+x, -x)
                </button>
              </div>

              {/* Section 2: Mennyiség & Előjel vezérlő */}
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Előjel:
                  </span>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-700 p-0.5 rounded-xl border border-slate-200 dark:border-slate-600">
                    <button
                      onClick={() => {
                        setSpawnSign(1);
                        setCustomInputVal(`${spawnQuantity}`);
                      }}
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-xs font-black transition-all cursor-pointer",
                        spawnSign === 1 ? "bg-emerald-500 text-white shadow-xs" : "text-slate-500"
                      )}
                    >
                      + Pozitív
                    </button>
                    <button
                      onClick={() => {
                        setSpawnSign(-1);
                        setCustomInputVal(`-${spawnQuantity}`);
                      }}
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-xs font-black transition-all cursor-pointer",
                        spawnSign === -1 ? "bg-rose-500 text-white shadow-xs" : "text-slate-500"
                      )}
                    >
                      - Negatív
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Méret (tömb):
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(qty => (
                        <button
                          key={qty}
                          onClick={() => {
                            setSpawnQuantity(qty);
                            setCustomInputVal(spawnSign === -1 ? `-${qty}` : `${qty}`);
                          }}
                          className={cn(
                            "w-6 h-6 rounded-lg text-xs font-black transition-all flex items-center justify-center cursor-pointer",
                            spawnQuantity === qty && parseInt(customInputVal, 10) === (spawnSign * qty)
                              ? "bg-primary text-white shadow-xs"
                              : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100"
                          )}
                        >
                          {qty}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Egyéni szám rubrika */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      Egyéni szám:
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customInputVal}
                        onChange={(e) => handleCustomInputChange(e.target.value)}
                        placeholder="pl. 8, -12"
                        className="w-20 h-6 px-2 text-center text-xs font-mono font-black rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-inner"
                      />
                      <span className="text-[10px] text-slate-400 font-bold">db</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Kategória Tabs (5 Téma) */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  2. Kategória Elemek (kattints vagy húzd a felhőbe!):
                </div>
                <div className="grid grid-cols-5 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                  {THEME_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedTheme(cat.id)}
                      className={cn(
                        "p-1.5 rounded-xl text-center flex flex-col items-center justify-center transition-all cursor-pointer",
                        selectedTheme === cat.id
                          ? "bg-white dark:bg-slate-700 shadow-xs scale-105"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      )}
                      title={cat.name}
                    >
                      <span className="text-lg">{cat.icon}</span>
                    </button>
                  ))}
                </div>

                {/* Elemek gombjai a kiválasztott kategóriából (Draggable) */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {activeCategory.items.map(item => (
                    <button
                      key={item.id}
                      draggable
                      onDragStart={(e) => handlePaletteDragStart(e, { symbol: item.variable, emoji: item.emoji, label: item.name, type: 'variable' })}
                      onClick={() => handleAddItemToCloud(item.variable, item.emoji, item.name, 'variable')}
                      className="flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary hover:shadow-xs transition-all text-left group cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-center gap-1.5 pointer-events-none">
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {item.emoji}
                        </span>
                        <div>
                          <div className="font-bold text-xs text-slate-800 dark:text-slate-200 leading-tight">
                            {spawnSign === -1 ? `-${spawnQuantity}` : spawnQuantity} {item.name}
                          </div>
                          <div className="text-[9px] text-slate-400 font-mono">
                            {item.variable}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-400 group-hover:text-primary pointer-events-none">+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 4: Absztrakt Változók Paletta (Draggable) */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  3. Absztrakt Változók:
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {ABSTRACT_VARIABLES.map(v => (
                    <button
                      key={v.symbol}
                      draggable
                      onDragStart={(e) => handlePaletteDragStart(e, {
                        symbol: v.symbol,
                        emoji: (v as any).emoji || (v.symbol === '1' ? '🪙' : undefined),
                        label: v.label,
                        type: v.symbol === '1' ? 'constant' : 'variable'
                      })}
                      onClick={() => handleAddItemToCloud(
                        v.symbol,
                        (v as any).emoji || (v.symbol === '1' ? '🪙' : undefined),
                        v.label,
                        v.symbol === '1' ? 'constant' : 'variable'
                      )}
                      className="flex items-center justify-between p-1.5 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 hover:shadow-xs transition-all text-left group cursor-grab active:cursor-grabbing"
                    >
                      <span className="font-mono font-black text-xs text-indigo-600 dark:text-indigo-400 pointer-events-none flex items-center gap-0.5">
                        {spawnSign === -1 ? `-${spawnQuantity}` : spawnQuantity}
                        {v.symbol !== '1' ? (
                          <span className="font-serif italic">{v.symbol}</span>
                        ) : (
                          <span className="text-xs">🪙</span>
                        )}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 pointer-events-none">+</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 5: Felhő Kezelők (Alul) */}
              {activeTab === 'sandbox' ? (
                <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      onClick={handleAddCloud}
                      disabled={clouds.length >= 4}
                      className="flex-1 h-8 text-xs font-bold gap-1 bg-sky-500 hover:bg-sky-600 text-white rounded-xl cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      + Felhő ({clouds.length}/4)
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleClearAllClouds}
                      className="h-8 px-2 text-xs font-bold rounded-xl text-rose-600 hover:bg-rose-50 border-rose-200 dark:border-rose-900 cursor-pointer"
                      title="Összes felhő kiürítése"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  {clouds.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCombineAllClouds}
                      className="w-full h-8 text-xs font-bold gap-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Összes Felhő Egybeolvasztása
                    </Button>
                  )}
                  <div className="p-2 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800 text-[11px] text-sky-900 dark:text-sky-200 space-y-0.5">
                    <div className="font-bold flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      Összevonás Mód:
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                      Húzd az azonos elemeket egymásra az összevonáshoz vagy kiejtéshez (Nullapár)!
                    </p>
                  </div>
                </div>
              ) : activeTab === 'combining' ? (
                <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800 text-[11px] text-purple-900 dark:text-purple-200 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Zárójelfelbontás Mód:
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                      A palettáról hozzáadott elemek az <strong>Alap kis felhőbe</strong> kerülnek, ami automatikusan sokszorozódik a beállított szorzóval!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800 text-[11px] text-indigo-900 dark:text-indigo-200 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Kiemelés Mód:
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                      A kiválasztott elemek a felső <strong>Nagy Felhőbe</strong> kerülnek. Onnan oszthatod szét őket a kis felhőkbe!
                    </p>
                  </div>
                </div>
              )}
            </aside>

            {/* Right Main Stage: Sandbox or Factoring */}
            {activeTab === 'sandbox' ? (
              <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden p-3.5 md:p-4 gap-3">
                {/* Formula HUD Bar */}
                <div className="h-12 min-h-[48px] bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-2xl px-4 text-white shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-xl flex-shrink-0">✨</span>
                    <div className="flex items-baseline gap-2 truncate">
                      <span className="text-[10px] uppercase font-black tracking-wider text-sky-200 hidden sm:inline">
                        Kifejezés:
                      </span>
                      <span className="font-mono font-black text-sm md:text-base tracking-wide text-white truncate">
                        {totalFormula}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-sky-100 font-medium bg-white/10 px-2.5 py-1 rounded-xl whitespace-nowrap hidden lg:block">
                    💡 <strong>Tipp:</strong> Húzd az elemeket egymásra az összevonáshoz vagy kiejtéshez (Nullapár)!
                  </div>
                </div>

                {/* Clouds Canvas Area */}
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <div className={cn(
                    "grid gap-4 h-full",
                    clouds.length === 1 && "grid-cols-1 max-w-2xl mx-auto items-center",
                    clouds.length === 2 && "grid-cols-1 md:grid-cols-2",
                    clouds.length === 3 && "grid-cols-1 md:grid-cols-3",
                    clouds.length >= 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                  )}>
                    {clouds.map((cloud, idx) => (
                      <CloudBox
                        key={cloud.id}
                        cloud={cloud}
                        index={idx}
                        totalClouds={clouds.length}
                        mode={repMode}
                        isSelected={cloud.id === selectedCloudId}
                        onSelect={() => setSelectedCloudId(cloud.id)}
                        onUpdateCloud={handleUpdateCloud}
                        onRemoveCloud={handleRemoveCloud}
                        onDuplicateCloud={handleDuplicateCloud}
                        onAnimateAction={(action) => playSound(action === 'combine' ? 'sparkle' : 'magic')}
                        onTransferItemBetweenClouds={handleTransferItemBetweenClouds}
                        onDropPaletteItemIntoCloud={(cId, sym, emo, lbl, tp, coeff) => handleAddItemToCloud(sym, emo, lbl, tp, cId, coeff)}
                      />
                    ))}
                  </div>
                </div>
              </main>
            ) : activeTab === 'combining' ? (
              <CombiningCloudStage
                repMode={repMode}
                selectedTheme={selectedTheme}
                baseCloud={combiningBaseCloud}
                setBaseCloud={setCombiningBaseCloud}
                playSound={playSound}
              />
            ) : (
              <FactoringCloudStage
                repMode={repMode}
                selectedTheme={selectedTheme}
                topCloud={topCloud}
                smallClouds={smallClouds}
                setTopCloud={setTopCloud}
                setSmallClouds={setSmallClouds}
                onAddItemToTopCloud={(sym, emo, lbl, tp, coeff) => handleAddItemToCloud(sym, emo, lbl, tp, undefined, coeff)}
                playSound={playSound}
              />
            )}
      </div>
    </div>
  );
}
