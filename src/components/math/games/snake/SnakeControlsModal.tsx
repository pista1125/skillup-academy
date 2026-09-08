import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Gamepad2,
  X,
  RotateCcw,
  Check,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Pause,
  Keyboard,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface SnakeKeyBindings {
  up: string;
  down: string;
  left: string;
  right: string;
  pause: string;
}

export const DEFAULT_KEY_BINDINGS: SnakeKeyBindings = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  pause: ' '
};

export const PRESET_KEY_BINDINGS: Record<string, { label: string; icon: string; desc: string; keys: SnakeKeyBindings }> = {
  arrows: {
    label: 'Nyilak',
    icon: '🏹',
    desc: '↑, ↓, ←, → és Szóköz',
    keys: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', pause: ' ' }
  },
  wasd: {
    label: 'WASD',
    icon: '🎮',
    desc: 'W, S, A, D és Szóköz (Gamer mód)',
    keys: { up: 'w', down: 's', left: 'a', right: 'd', pause: ' ' }
  },
  ijkl: {
    label: 'IJKL',
    icon: '🕹️',
    desc: 'I, K, J, L és P (Jobbkezes)',
    keys: { up: 'i', down: 'k', left: 'j', right: 'l', pause: 'p' }
  },
  numpad: {
    label: 'Numpad',
    icon: '🔢',
    desc: '8, 2, 4, 6 és 0 (Numerikus)',
    keys: { up: '8', down: '2', left: '4', right: '6', pause: '0' }
  }
};

export function formatKeyLabel(key: string): string {
  if (!key) return 'Nincs';
  const lower = key.toLowerCase();
  if (lower === 'arrowup' || key === 'Up') return '↑ Nyíl Fel';
  if (lower === 'arrowdown' || key === 'Down') return '↓ Nyíl Le';
  if (lower === 'arrowleft' || key === 'Left') return '← Nyíl Balra';
  if (lower === 'arrowright' || key === 'Right') return '→ Nyíl Jobbra';
  if (lower === ' ' || lower === 'space') return 'Szóköz (Space)';
  if (lower === 'enter') return 'Enter ↵';
  if (lower === 'tab') return 'Tab ⇥';
  if (lower === 'shift') return 'Shift ⇧';
  if (lower === 'control' || lower === 'ctrl') return 'Ctrl';
  if (lower === 'alt') return 'Alt';
  if (lower === 'escape' || lower === 'esc') return 'Esc';
  if (lower === 'backspace') return 'Backspace ⌫';
  if (key.length === 1) return key.toUpperCase();
  return key;
}

export function isKeyMatch(targetConfigKey: string, evtKey: string, evtCode?: string): boolean {
  if (!targetConfigKey) return false;
  const t = targetConfigKey.toLowerCase();
  const k = evtKey.toLowerCase();
  const c = (evtCode || '').toLowerCase();

  // Exact match
  if (t === k) return true;

  // Space matches
  if ((t === ' ' || t === 'space') && (k === ' ' || k === 'space' || c === 'space')) return true;

  // Arrow matches
  if (t === 'arrowup' && (k === 'arrowup' || c === 'arrowup' || k === 'up')) return true;
  if (t === 'arrowdown' && (k === 'arrowdown' || c === 'arrowdown' || k === 'down')) return true;
  if (t === 'arrowleft' && (k === 'arrowleft' || c === 'arrowleft' || k === 'left')) return true;
  if (t === 'arrowright' && (k === 'arrowright' || c === 'arrowright' || k === 'right')) return true;

  // Numpad & Digits
  if (t === '8' && (k === '8' || c === 'numpad8' || c === 'digit8')) return true;
  if (t === '2' && (k === '2' || c === 'numpad2' || c === 'digit2')) return true;
  if (t === '4' && (k === '4' || c === 'numpad4' || c === 'digit4')) return true;
  if (t === '6' && (k === '6' || c === 'numpad6' || c === 'digit6')) return true;
  if (t === '0' && (k === '0' || c === 'numpad0' || c === 'digit0')) return true;

  // Single characters
  if (t.length === 1) {
    if (k === t) return true;
    if (c === `key${t}`) return true;
  }

  return false;
}

interface SnakeControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bindings: SnakeKeyBindings;
  onSave: (newBindings: SnakeKeyBindings) => void;
}

export function SnakeControlsModal({
  isOpen,
  onClose,
  bindings,
  onSave
}: SnakeControlsModalProps) {
  const [currentBindings, setCurrentBindings] = useState<SnakeKeyBindings>(bindings);
  const [listeningFor, setListeningFor] = useState<keyof SnakeKeyBindings | null>(null);

  useEffect(() => {
    setCurrentBindings(bindings);
  }, [bindings, isOpen]);

  // Key listening effect
  useEffect(() => {
    if (!isOpen || !listeningFor) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Cancel on Escape
      if (e.key === 'Escape') {
        setListeningFor(null);
        toast.info('Gomb beállítás megszakítva.');
        return;
      }

      let capturedKey = e.key;
      if (capturedKey === ' ') capturedKey = ' ';

      // Check if key is already assigned to another action
      const conflicts = Object.entries(currentBindings).find(
        ([action, key]) => action !== listeningFor && key.toLowerCase() === capturedKey.toLowerCase()
      );

      if (conflicts) {
        const [conflictAction] = conflicts;
        const actionLabels: Record<string, string> = {
          up: 'FEL',
          down: 'LE',
          left: 'BALRA',
          right: 'JOBBRA',
          pause: 'SZÜNET'
        };
        toast.warning(`Ez a gomb (${formatKeyLabel(capturedKey)}) már be van állítva a(z) ${actionLabels[conflictAction]} irányhoz! Felülírva.`);
      }

      const updated = {
        ...currentBindings,
        [listeningFor]: capturedKey
      };

      setCurrentBindings(updated);
      setListeningFor(null);
      toast.success(`${formatKeyLabel(capturedKey)} gomb sikeresen beállítva!`);
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isOpen, listeningFor, currentBindings]);

  if (!isOpen) return null;

  const handleApplyPreset = (presetKey: string) => {
    const preset = PRESET_KEY_BINDINGS[presetKey];
    if (preset) {
      setCurrentBindings(preset.keys);
      toast.success(`${preset.label} elrendezés betöltve!`);
    }
  };

  const handleResetToDefault = () => {
    setCurrentBindings(DEFAULT_KEY_BINDINGS);
    toast.info('Alapértelmezett beállítások visszaállítva.');
  };

  const handleSaveAndClose = () => {
    onSave(currentBindings);
    onClose();
    toast.success('Irányítás beállításai elmentve!');
  };

  const controlFields: Array<{
    id: keyof SnakeKeyBindings;
    label: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    { id: 'up', label: 'Fel (UP)', icon: <ArrowUp className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'down', label: 'Le (DOWN)', icon: <ArrowDown className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'left', label: 'Balra (LEFT)', icon: <ArrowLeft className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'right', label: 'Jobbra (RIGHT)', icon: <ArrowRight className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'pause', label: 'Szünet / Folytatás', icon: <Pause className="w-4 h-4" />, color: 'bg-amber-50 text-amber-700 border-amber-200' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-emerald-100 p-5 sm:p-6 overflow-hidden relative space-y-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-800">
                Irányítás Beállításai
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Válassz előre beállított sémát vagy állíts be egyéni gombokat!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Gyors sémák:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(PRESET_KEY_BINDINGS).map(([key, preset]) => {
              const isSelected =
                currentBindings.up.toLowerCase() === preset.keys.up.toLowerCase() &&
                currentBindings.down.toLowerCase() === preset.keys.down.toLowerCase() &&
                currentBindings.left.toLowerCase() === preset.keys.left.toLowerCase() &&
                currentBindings.right.toLowerCase() === preset.keys.right.toLowerCase();

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleApplyPreset(key)}
                  className={cn(
                    "p-2.5 rounded-2xl border text-center transition-all hover:scale-102 flex flex-col items-center justify-center gap-0.5 shadow-2xs",
                    isSelected
                      ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/40 text-emerald-800 font-black"
                      : "bg-slate-50/80 border-slate-200 hover:border-emerald-300 text-slate-700 font-bold"
                  )}
                >
                  <span className="text-base">{preset.icon}</span>
                  <span className="text-xs">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Key Slots */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Keyboard className="w-3.5 h-3.5 text-emerald-600" />
            Egyéni gombok testreszabása (kattints a módosításhoz):
          </label>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {controlFields.map(field => {
              const isListening = listeningFor === field.id;
              const currentKey = currentBindings[field.id];

              return (
                <div
                  key={field.id}
                  className={cn(
                    "flex items-center justify-between p-2.5 rounded-2xl border transition-all",
                    isListening
                      ? "bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/40 animate-pulse"
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-xl border flex items-center justify-center", field.color)}>
                      {field.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {field.label}
                    </span>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant={isListening ? "default" : "outline"}
                    onClick={() => setListeningFor(isListening ? null : field.id)}
                    className={cn(
                      "h-8 px-3 rounded-xl font-black text-xs min-w-[110px] transition-all",
                      isListening
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white animate-bounce shadow-md"
                        : "bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:text-emerald-700 shadow-xs"
                    )}
                  >
                    {isListening ? (
                      "Nyomj le egy gombot..."
                    ) : (
                      <span className="font-mono">{formatKeyLabel(currentKey)}</span>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tip info */}
        <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            Kattints bármelyik gombra, majd nyomd le a kívánt billentyűt a billentyűzeten! A beállítások automatikusan mentődnek a böngésződben.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResetToDefault}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 h-9 px-3 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Alaphelyzet
          </Button>

          <Button
            type="button"
            onClick={handleSaveAndClose}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs h-9 px-5 rounded-xl shadow-md"
          >
            <Check className="w-4 h-4 mr-1.5" />
            Mentés és Kész
          </Button>
        </div>
      </Card>
    </div>
  );
}
