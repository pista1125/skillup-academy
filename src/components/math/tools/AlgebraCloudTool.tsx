import React, { useState, useMemo } from 'react';
import {
  ThemeCategoryId,
  RepresentationMode,
  ToolTab,
  CloudContainer,
  CloudItem,
  MissionStep,
  PracticeChallenge,
} from './algebra-cloud/types';
import {
  THEME_CATEGORIES,
  ABSTRACT_VARIABLES,
  createInitialCloud,
  formatCloudExpression,
  GUIDED_MISSIONS,
  PRACTICE_CHALLENGES
} from './algebra-cloud/data';
import { CloudBox } from './algebra-cloud/CloudBox';
import { FactoringCloudStage } from './algebra-cloud/FactoringCloudStage';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Zap,
  Plus,
  Minus,
  Maximize2,
  RefreshCw,
  Trophy,
  Compass,
  CheckCircle2,
  HelpCircle,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Info,
  Flame,
  LayoutGrid,
  Scissors,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  // Guided Missions State
  const [currentMissionIdx, setCurrentMissionIdx] = useState<number>(0);
  const currentMission = GUIDED_MISSIONS[currentMissionIdx];
  const [missionClouds, setMissionClouds] = useState<CloudContainer[]>(
    JSON.parse(JSON.stringify(GUIDED_MISSIONS[0].clouds))
  );
  const [missionCompleted, setMissionCompleted] = useState<boolean>(false);
  const [showMissionHint, setShowMissionHint] = useState<boolean>(false);

  // Practice Challenges State
  const [selectedChallengeLevel, setSelectedChallengeLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const filteredChallenges = useMemo(() => {
    return PRACTICE_CHALLENGES.filter(c => c.level === selectedChallengeLevel);
  }, [selectedChallengeLevel]);
  const currentChallenge = filteredChallenges[currentChallengeIdx] || PRACTICE_CHALLENGES[0];
  const [challengeClouds, setChallengeClouds] = useState<CloudContainer[]>(
    JSON.parse(JSON.stringify(currentChallenge.initialClouds))
  );
  const [challengeStatus, setChallengeStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showChallengeHint, setShowChallengeHint] = useState<boolean>(false);

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

  // Mission Step Change
  const handleSelectMission = (idx: number) => {
    setCurrentMissionIdx(idx);
    const mission = GUIDED_MISSIONS[idx];
    setMissionClouds(JSON.parse(JSON.stringify(mission.clouds)));
    setRepMode(mission.repMode);
    setSelectedTheme(mission.category);
    setMissionCompleted(false);
    setShowMissionHint(false);
  };

  // Update Mission Cloud & Check validation
  const handleUpdateMissionCloud = (updated: CloudContainer) => {
    const updatedClouds = missionClouds.map(c => c.id === updated.id ? updated : c);
    setMissionClouds(updatedClouds);

    if (currentMission.targetCheck(updatedClouds)) {
      setMissionCompleted(true);
      playSound('success');
    }
  };

  // Challenge Update & Check
  const handleUpdateChallengeCloud = (updated: CloudContainer) => {
    const updatedClouds = challengeClouds.map(c => c.id === updated.id ? updated : c);
    setChallengeClouds(updatedClouds);
  };

  const handleCheckChallenge = () => {
    const isOk = currentChallenge.checkAnswer(challengeClouds);
    if (isOk) {
      setChallengeStatus('correct');
      playSound('success');
    } else {
      setChallengeStatus('incorrect');
    }
  };

  const handleNextChallenge = () => {
    const nextIdx = (currentChallengeIdx + 1) % filteredChallenges.length;
    setCurrentChallengeIdx(nextIdx);
    const nextChallenge = filteredChallenges[nextIdx];
    setChallengeClouds(JSON.parse(JSON.stringify(nextChallenge.initialClouds)));
    setRepMode(nextChallenge.repMode);
    setSelectedTheme(nextChallenge.category);
    setChallengeStatus('idle');
    setShowChallengeHint(false);
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
            Szabad Labor
          </button>
          <button
            onClick={() => {
              setActiveTab('missions');
              handleSelectMission(currentMissionIdx);
            }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              activeTab === 'missions'
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Compass className="w-3.5 h-3.5" />
            8 Küldetés
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              handleNextChallenge();
            }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
              activeTab === 'challenges'
                ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Trophy className="w-3.5 h-3.5" />
            Gyakorló Kvíz
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
        {/* ========================================================= */}
        {/* TAB 1 & 4: SZABAD LABORATÓRIUM & KIEMELÉS                 */}
        {/* ========================================================= */}
        {(activeTab === 'sandbox' || activeTab === 'factoring') && (
          <>
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
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 2: VEZETETT KÜLDETÉSEK                                */}
        {/* ========================================================= */}
        {activeTab === 'missions' && (
          <>
            {/* Left Sidebar: Mission Navigation & Story */}
            <aside className="w-full md:w-[360px] lg:w-[380px] min-w-[340px] bg-white/90 dark:bg-slate-900/90 border-r border-sky-100 dark:border-slate-800 flex flex-col h-full overflow-y-auto p-4 gap-3 shadow-xs">
              {/* Stepper Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Küldetés Választó (1 - 8):
                  </span>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                    {currentMission.badge}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {GUIDED_MISSIONS.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMission(idx)}
                      className={cn(
                        "py-1.5 px-1 rounded-xl text-center border font-bold transition-all text-xs flex flex-col items-center gap-0.5 cursor-pointer",
                        idx === currentMissionIdx
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                      )}
                    >
                      <span className="text-sm">{idx + 1 === 1 ? '🍎' : idx + 1 === 2 ? '📦' : idx + 1 === 3 ? '🐾' : idx + 1 === 4 ? '🔀' : idx + 1 === 5 ? '🔤' : idx + 1 === 6 ? '❄️' : idx + 1 === 7 ? '🔓' : '🏆'}</span>
                      <span className="text-[10px]">{idx + 1}. szint</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mission Content Card */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/70 border border-indigo-200 dark:border-indigo-900 space-y-2.5">
                <div>
                  <h3 className="font-black text-sm md:text-base text-slate-900 dark:text-white leading-tight">
                    {currentMission.title}
                  </h3>
                  <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-semibold mt-0.5">
                    {currentMission.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  📖 {currentMission.story}
                </p>

                {/* Instruction */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 flex items-start gap-2 shadow-xs">
                  <span className="text-lg">🎯</span>
                  <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200 leading-tight">
                    {currentMission.instruction}
                  </div>
                </div>

                {showMissionHint && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs font-semibold text-amber-900 dark:text-amber-200">
                    💡 <strong>Tipp:</strong> {currentMission.hint}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowMissionHint(!showMissionHint)}
                  className="flex-1 h-8 text-xs font-bold border-amber-300 text-amber-700 bg-amber-50 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 mr-1" />
                  {showMissionHint ? 'Tipp elrejtése' : 'Tipp'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSelectMission(currentMissionIdx)}
                  className="h-8 text-xs font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Újra
                </Button>
              </div>
            </aside>

            {/* Right Stage: Mission Interactive Clouds */}
            <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden p-4 gap-4 items-center justify-center">
              <div className="w-full max-w-2xl">
                {missionClouds.map((cloud, idx) => (
                  <CloudBox
                    key={cloud.id}
                    cloud={cloud}
                    index={idx}
                    totalClouds={missionClouds.length}
                    mode={currentMission.repMode}
                    isSelected={true}
                    onUpdateCloud={handleUpdateMissionCloud}
                    onAnimateAction={() => playSound('sparkle')}
                  />
                ))}
              </div>

              {/* Success Notification Banner */}
              {missionCompleted && (
                <div className="w-full max-w-xl p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white shadow-xl text-center space-y-2 animate-slide-up">
                  <div className="text-2xl">🎉 Szuper, küldetés teljesítve!</div>
                  <p className="text-xs font-semibold text-emerald-100">
                    {currentMission.successMessage}
                  </p>
                  {currentMissionIdx < GUIDED_MISSIONS.length - 1 && (
                    <Button
                      onClick={() => handleSelectMission(currentMissionIdx + 1)}
                      className="bg-white text-emerald-800 hover:bg-emerald-50 font-black rounded-xl px-5 h-8 text-xs shadow-md mt-1 cursor-pointer"
                    >
                      Következő Küldetés ({currentMissionIdx + 2}. szint)
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              )}
            </main>
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 3: GYAKORLÓ KVÍZ                                      */}
        {/* ========================================================= */}
        {activeTab === 'challenges' && (
          <>
            {/* Left Sidebar: Question & Level */}
            <aside className="w-full md:w-[340px] lg:w-[360px] min-w-[320px] bg-white/90 dark:bg-slate-900/90 border-r border-sky-100 dark:border-slate-800 flex flex-col h-full overflow-y-auto p-4 gap-3 shadow-xs">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                  Nehézségi Szint:
                </div>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setSelectedChallengeLevel('easy');
                      setCurrentChallengeIdx(0);
                      setChallengeStatus('idle');
                    }}
                    className={cn(
                      "py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      selectedChallengeLevel === 'easy' ? "bg-emerald-500 text-white shadow-xs" : "text-slate-500"
                    )}
                  >
                    Kezdő
                  </button>
                  <button
                    onClick={() => {
                      setSelectedChallengeLevel('medium');
                      setCurrentChallengeIdx(0);
                      setChallengeStatus('idle');
                    }}
                    className={cn(
                      "py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      selectedChallengeLevel === 'medium' ? "bg-amber-500 text-white shadow-xs" : "text-slate-500"
                    )}
                  >
                    Haladó
                  </button>
                  <button
                    onClick={() => {
                      setSelectedChallengeLevel('hard');
                      setCurrentChallengeIdx(0);
                      setChallengeStatus('idle');
                    }}
                    className={cn(
                      "py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      selectedChallengeLevel === 'hard' ? "bg-purple-600 text-white shadow-xs" : "text-slate-500"
                    )}
                  >
                    Mester
                  </button>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white">
                    {currentChallenge.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {currentChallengeIdx + 1} / {filteredChallenges.length}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  ❓ {currentChallenge.question}
                </p>

                {showChallengeHint && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-medium border border-amber-200">
                    💡 {currentChallenge.hint}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <Button
                  onClick={handleCheckChallenge}
                  className="w-full h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Válasz Ellenőrzése
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowChallengeHint(!showChallengeHint)}
                    className="flex-1 h-8 text-xs font-bold border-amber-300 text-amber-700 bg-amber-50 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 mr-1" />
                    Tipp
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleNextChallenge}
                    className="flex-1 h-8 text-xs font-bold cursor-pointer"
                  >
                    Következő
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </aside>

            {/* Right Stage: Challenge Interactive Cloud & Results */}
            <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden p-4 gap-4 items-center justify-center">
              <div className="w-full max-w-xl">
                {challengeClouds.map((cloud, idx) => (
                  <CloudBox
                    key={cloud.id}
                    cloud={cloud}
                    index={idx}
                    totalClouds={challengeClouds.length}
                    mode={currentChallenge.repMode}
                    isSelected={true}
                    onUpdateCloud={handleUpdateChallengeCloud}
                    onAnimateAction={() => playSound('sparkle')}
                  />
                ))}
              </div>

              {challengeStatus === 'correct' && (
                <div className="w-full max-w-xl p-3.5 rounded-2xl bg-emerald-500 text-white text-center space-y-1 shadow-lg animate-slide-up">
                  <div className="text-base font-black">🌟 Helyes Megoldás!</div>
                  <p className="text-xs text-emerald-100">
                    {currentChallenge.explanation}
                  </p>
                </div>
              )}

              {challengeStatus === 'incorrect' && (
                <div className="w-full max-w-xl p-3.5 rounded-2xl bg-rose-500 text-white text-center space-y-1 shadow-lg animate-slide-up">
                  <div className="text-base font-black">❌ Még nem pontos!</div>
                  <p className="text-xs text-rose-100">
                    Próbáld meg elvégezni az összevonást vagy zárójelfelbontást a felhő alján lévő gombokkal!
                  </p>
                </div>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
}
