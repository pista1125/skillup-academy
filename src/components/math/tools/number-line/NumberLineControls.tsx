import React from 'react';
import { NumberLineMode, MagnitudeScale, FractionDisplayType, PresetExample } from './types';
import { NUMBER_LINE_PRESETS } from './numberLinePresets';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  MapPin,
  Move,
  BookOpen,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberLineControlsProps {
  onBack: () => void;
  mode: NumberLineMode;
  setMode: (mode: NumberLineMode) => void;
  denominator: number;
  setDenominator: (den: number) => void;
  magnitude: MagnitudeScale;
  setMagnitude: (mag: MagnitudeScale) => void;
  fractionDisplay: FractionDisplayType;
  setFractionDisplay: (disp: FractionDisplayType) => void;
  showFractionLabels: boolean;
  setShowFractionLabels: (show: boolean) => void;
  toolMode: 'pan' | 'marker' | 'arrow';
  setToolMode: (m: 'pan' | 'marker' | 'arrow') => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onClearAll: () => void;
  onSelectPreset: (preset: PresetExample) => void;
}

const COMMON_DENOMINATORS = [2, 3, 4, 5, 6, 8, 10, 12];
const COMMON_MAGNITUDES: MagnitudeScale[] = [10, 100, 1000];

export function NumberLineControls({
  onBack,
  mode,
  setMode,
  denominator,
  setDenominator,
  magnitude,
  setMagnitude,
  fractionDisplay,
  setFractionDisplay,
  showFractionLabels,
  setShowFractionLabels,
  toolMode,
  setToolMode,
  onZoomIn,
  onZoomOut,
  onResetView,
  onClearAll,
  onSelectPreset
}: NumberLineControlsProps) {
  const [showPresetsMenu, setShowPresetsMenu] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onBack} size="sm" className="font-semibold text-slate-600 dark:text-slate-300">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Vissza
          </Button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setMode('integers')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                mode === 'integers'
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Egész számok
            </button>
            <button
              onClick={() => setMode('fractions')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                mode === 'fractions'
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Törtek (Felosztás)
            </button>
            <button
              onClick={() => setMode('magnitudes')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                mode === 'magnitudes'
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              )}
            >
              Nagy számok (100 / 1000)
            </button>
          </div>
        </div>

        {/* Right Tools: Presets, Clear, Zoom, Reset */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Presets Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Példatár
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </Button>

            {showPresetsMenu && (
              <div
                className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setShowPresetsMenu(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  Pedagógiai feladatok
                </div>
                {NUMBER_LINE_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset);
                      setShowPresetsMenu(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex flex-col gap-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100 font-mono">
                        {preset.title}
                      </span>
                      <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-md font-semibold">
                        {preset.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {preset.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* Interaction Mode: Pan vs Marker */}
          <Button
            variant={toolMode === 'pan' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setToolMode('pan')}
            className={cn("h-8 text-xs font-bold", toolMode === 'pan' ? "bg-slate-800 text-white" : "")}
            title="Mozgatás és pásztázás"
          >
            <Move className="w-3.5 h-3.5 mr-1" />
            Mozgatás
          </Button>

          <Button
            variant={toolMode === 'marker' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setToolMode(toolMode === 'marker' ? 'pan' : 'marker')}
            className={cn("h-8 text-xs font-bold", toolMode === 'marker' ? "bg-amber-500 text-white shadow-sm" : "")}
            title="Pont lerakása a számegyenesre"
          >
            <MapPin className="w-3.5 h-3.5 mr-1" />
            Pont
          </Button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* Zoom & View Controls */}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={onZoomOut} title="Kicsinyítés">
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={onZoomIn} title="Nagyítás">
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs font-semibold" onClick={onResetView} title="Vissza a középponthoz">
            Középre
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            title="Minden törlése"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Törlés
          </Button>
        </div>
      </div>

      {/* Sub-bar: Specific controls per active mode */}
      {mode === 'fractions' && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/60 dark:bg-blue-950/30 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/40 animate-in fade-in">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Egységszakasz felosztása (Nevező):
            </span>
            <div className="flex items-center gap-1">
              {COMMON_DENOMINATORS.map(d => (
                <button
                  key={d}
                  onClick={() => setDenominator(d)}
                  className={cn(
                    "w-7 h-7 rounded-lg text-xs font-bold font-mono transition-all",
                    denominator === d
                      ? "bg-blue-600 text-white shadow-sm scale-105"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Display toggle */}
            <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-lg border border-blue-200 dark:border-blue-800">
              <button
                onClick={() => setFractionDisplay('fraction')}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-bold transition-all",
                  fractionDisplay === 'fraction' ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300"
                )}
              >
                Közönséges tört
              </button>
              <button
                onClick={() => setFractionDisplay('mixed')}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-bold transition-all",
                  fractionDisplay === 'mixed' ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-300"
                )}
              >
                Vegyes tört
              </button>
            </div>

            {/* Labels toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={showFractionLabels}
                onChange={e => setShowFractionLabels(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Tört beosztások feliratozása
            </label>
          </div>
        </div>
      )}

      {mode === 'magnitudes' && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-purple-50/60 dark:bg-purple-950/30 p-2.5 rounded-xl border border-purple-100 dark:border-purple-900/40 animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
              Nagyságrend / Skála kiválasztása:
            </span>
            <div className="flex items-center gap-1.5">
              {COMMON_MAGNITUDES.map(mag => (
                <button
                  key={mag}
                  onClick={() => setMagnitude(mag)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all",
                    magnitude === mag
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100"
                  )}
                >
                  {mag}-es skála
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">
            Tökéletes nagyobb számok (százasok, ezresek) összeadásának és kivonásának gyakorlására!
          </div>
        </div>
      )}
    </div>
  );
}
