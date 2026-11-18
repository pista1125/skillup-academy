// Az 1. osztályos „tananyag”: Pötyi meséje lapozható oldalakon, felolvasással és koppintós mini-feladatokkal.
import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Play, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Potyi, PotyiMood } from './Potyi';
import { speak, stopSpeaking, useStopSpeechOnUnmount, randomPraise, randomRetry } from './speech';
import { MeseOption, OptionButton, PotyiBubble, SpeakButton, SHAKE_KEYFRAMES, shuffle, optionKey } from './MeseKit';

export interface MeseTask {
  /** Rövid kérdés (felolvassuk). */
  ask: string;
  say?: string;
  /** Válaszok – az ELSŐ a helyes, a komponens megkeveri. 2–4 elem. */
  options: MeseOption[];
  /** Mit mondjon Pötyi rossz válasznál (a tipikus hibát nevezze meg). */
  hint?: string;
  /** Mit mondjon jó válasznál (alap: véletlen dicséret). */
  praise?: string;
}

export interface MesePage {
  /** Nagy kép (SVG), max ~480 px széles. Elhagyható, ha a feladat képei elegendők. */
  scene?: React.ReactNode;
  /** Rövid, nagy betűs felirat (1–2 nagyon rövid mondat). */
  text: string;
  /** Hosszabb felolvasott szöveg (alap: text). */
  say?: string;
  mood?: PotyiMood;
  /** Pötyi pöttyeinek száma a buborékban (pl. az aktuális szám). */
  dots?: number;
  task?: MeseTask;
}

export interface MeseLessonProps {
  /** Pl. "1. Az egy" – a diákzóna szekciószámával. */
  title: string;
  /** A mese címe, pl. "Pötyi és a nagy piros alma". */
  storyTitle: string;
  /** Pl. "1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE". */
  badge: string;
  pages: MesePage[];
  /** A mese végén megjelenő szabad játék (pl. koppintós számláló labor). */
  playground?: React.ReactNode;
  playgroundTitle?: string;
  /** Rövid tájékoztató a szülőknek / tanítóknak (mit tanul a gyerek). */
  parentNote?: string;
  /** A kezdőképernyő Pötyi-pöttyszáma. */
  coverDots?: number;
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const MeseLesson: React.FC<MeseLessonProps> = ({
  title,
  storyTitle,
  badge,
  pages,
  playground,
  playgroundTitle = 'Játszótér',
  parentNote,
  coverDots = 7,
  onBack,
  onStartQuiz,
}) => {
  useStopSpeechOnUnmount();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [solved, setSolved] = useState<Record<number, boolean>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const finished = idx >= pages.length;
  const page = pages[idx];

  const shuffled = useMemo(() => pages.map((p) => (p.task ? shuffle(p.task.options.map((o, i) => ({ o, ok: i === 0 }))) : [])), [pages]);

  useEffect(() => {
    if (!started) return;
    setWrong(null);
    setChosen(null);
    if (finished) {
      speak('Vége a mesének. Ügyes voltál! Most játsszunk!');
      return;
    }
    const p = pages[idx];
    const t = window.setTimeout(() => speak(`${p.say || p.text}${p.task ? ' ' + (p.task.say || p.task.ask) : ''}`), 250);
    return () => window.clearTimeout(t);
  }, [idx, started, finished, pages]);

  const answer = (o: MeseOption, ok: boolean) => {
    if (!page?.task || solved[idx]) return;
    const k = optionKey(o);
    setChosen(k);
    if (ok) {
      setSolved((s) => ({ ...s, [idx]: true }));
      setWrong(null);
      speak(page.task.praise || randomPraise());
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else {
      setWrong(k);
      speak(page.task.hint || randomRetry());
    }
  };

  const go = (d: number) => {
    stopSpeaking();
    setIdx((i) => Math.max(0, Math.min(pages.length, i + d)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 pb-10">
      <style>{SHAKE_KEYFRAMES}</style>
      {/* fejléc */}
      <div className="max-w-3xl mx-auto px-3 pt-3 flex items-center gap-2">
        {onBack && (
          <button type="button" onClick={onBack} className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 border-2 border-slate-200 shadow-sm hover:bg-white" aria-label="Vissza">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs font-black tracking-wider text-rose-600 uppercase truncate">{badge}</div>
          <h1 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 truncate">{title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-3 mt-3">
        {!started ? (
          <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-rose-200 shadow-lg p-6 sm:p-10 text-center">
            <Potyi mood="cheer" dots={coverDots} className="w-40 h-40 sm:w-52 sm:h-52 mx-auto" />
            <p className="mt-2 text-sm font-bold text-rose-500">Pötyi meséje</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100">{storyTitle}</h2>
            <button
              type="button"
              onClick={() => {
                setStarted(true);
                setIdx(0);
              }}
              className="mt-6 inline-flex items-center gap-3 px-8 h-16 rounded-full bg-rose-500 hover:bg-rose-400 active:scale-95 text-white text-2xl font-black shadow-lg"
            >
              <Play className="w-8 h-8 fill-white" /> Mesét kérek!
            </button>
            {onStartQuiz && (
              <div className="mt-4">
                <button type="button" onClick={onStartQuiz} className="inline-flex items-center gap-2 px-5 h-12 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 font-black border-2 border-sky-300">
                  <Gamepad2 className="w-5 h-5" /> Rögtön játszom
                </button>
              </div>
            )}
            {parentNote && (
              <details className="mt-6 text-left max-w-xl mx-auto text-sm text-slate-600 dark:text-slate-300">
                <summary className="cursor-pointer font-bold text-slate-500">Szülőknek, tanítóknak</summary>
                <p className="mt-2 leading-relaxed">{parentNote}</p>
              </details>
            )}
          </div>
        ) : !finished && page ? (
          <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-sky-200 shadow-lg p-3 sm:p-5">
            {page.scene && (
              <div className="rounded-3xl bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 border-sky-100 p-2 sm:p-4 flex items-center justify-center min-h-[200px] [&>svg]:w-full [&>svg]:max-w-[480px] [&>svg]:h-auto">
                {page.scene}
              </div>
            )}
            <PotyiBubble className="mt-3" text={page.text} say={page.say || page.text} mood={page.mood} dots={page.dots} />

            {page.task && (
              <div className="mt-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <p className="text-xl sm:text-2xl font-black text-indigo-700 dark:text-indigo-300 text-center">{page.task.ask}</p>
                  <SpeakButton text={page.task.say || page.task.ask} className="w-10 h-10" />
                </div>
                <div className={cn('grid gap-3', shuffled[idx].length <= 2 ? 'grid-cols-2' : shuffled[idx].length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4')}>
                  {shuffled[idx].map(({ o, ok }, i) => {
                    const k = optionKey(o);
                    const state = solved[idx] ? (ok ? 'correct' : 'dim') : wrong === k ? 'wrong' : 'idle';
                    return <OptionButton key={`${idx}-${i}-${chosen === k ? 'c' : ''}`} option={o} state={state} onClick={() => answer(o, ok)} />;
                  })}
                </div>
              </div>
            )}

            {/* lapozó */}
            <div className="mt-5 flex items-center justify-between gap-2">
              <button type="button" onClick={() => go(-1)} disabled={idx === 0} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-30 border-2 border-slate-300" aria-label="Előző oldal">
                <ChevronLeft className="w-9 h-9 text-slate-700" />
              </button>
              <div className="flex flex-wrap justify-center gap-1.5">
                {pages.map((_, i) => (
                  <span key={i} className={cn('w-3 h-3 rounded-full', i === idx ? 'bg-rose-500 scale-125' : i < idx ? 'bg-rose-300' : 'bg-slate-300')} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className={cn(
                  'inline-flex items-center justify-center w-16 h-16 rounded-full border-2 text-white shadow-md',
                  page.task && !solved[idx] ? 'bg-slate-300 border-slate-300' : 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600 animate-pulse'
                )}
                aria-label="Következő oldal"
              >
                <ChevronRight className="w-9 h-9" />
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-emerald-200 shadow-lg p-6 sm:p-8 text-center">
            <Potyi mood="cheer" dots={coverDots} className="w-36 h-36 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">Vége a mesének!</h2>
            <p className="text-lg font-bold text-slate-600 dark:text-slate-300">Ügyes voltál! 🌟</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {onStartQuiz && (
                <button type="button" onClick={onStartQuiz} className="inline-flex items-center gap-3 px-7 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white text-2xl font-black shadow-lg">
                  <Gamepad2 className="w-8 h-8" /> Játsszunk!
                </button>
              )}
              <button type="button" onClick={() => setIdx(0)} className="inline-flex items-center gap-2 px-5 h-16 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-lg font-black border-2 border-sky-300">
                <RotateCcw className="w-6 h-6" /> Újra a mese
              </button>
            </div>
          </div>
        )}

        {started && playground && (
          <div className="mt-6 rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-amber-200 shadow-lg p-3 sm:p-5">
            <h3 className="text-xl sm:text-2xl font-black text-amber-700 mb-3 flex items-center gap-2">🎈 {playgroundTitle}</h3>
            {playground}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeseLesson;
