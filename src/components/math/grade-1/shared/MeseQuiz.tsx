// Az 1. osztályos „kvíz”: Pötyi játékai – Kérdések, Párosító, Válogató – 3 szinten, felolvasással, képes válaszokkal.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BookOpen, RotateCcw, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizProgress } from '@/services/quizProgressService';
import { Potyi } from './Potyi';
import { speak, stopSpeaking, useStopSpeechOnUnmount, randomPraise, randomRetry } from './speech';
import { MeseOption, OptionButton, PotyiBubble, SpeakButton, Stars, SHAKE_KEYFRAMES, shuffle, optionKey, optionSay, VoiceToggle } from './MeseKit';

export type MeseLevel = 1 | 2 | 3;
export type MeseGameMode = 'quiz' | 'matcher' | 'sorter';

export interface MeseQuestion {
  id: string;
  level: MeseLevel;
  /** Nagyon rövid kérdés – megjelenik és felolvassuk. */
  ask: string;
  /** Hosszabb felolvasott változat (alap: ask). */
  say?: string;
  /** A kérdés képe (SVG). Az ismeretlent "?" jelölje, a kép ne árulja el a választ. */
  scene?: React.ReactNode;
  /** 2–4 válasz, az ELSŐ a helyes (a komponens megkeveri). */
  options: MeseOption[];
  /** Rossz válasznál ezt mondja Pötyi (a tipikus hibát nevezze meg, ne mondja ki a választ). */
  hint?: string;
  /** Rövid témacímke a szülőknek (pl. "Számlálás"). */
  badge: string;
}

export interface MesePairsLevel {
  say: string;
  /** 4–6 pár: a ↔ b (pl. kép ↔ szám). */
  pairs: { a: MeseOption; b: MeseOption }[];
}

export interface MeseSortLevel {
  say: string;
  /** 2–3 kosár. */
  bins: { label: string; figure?: React.ReactNode; say?: string }[];
  /** 6–9 elem, mindegyik a `bin` indexű kosárba való. */
  items: { item: MeseOption; bin: number }[];
}

export interface MeseQuizProps {
  /** Pl. "1. Az egy" */
  title: string;
  badge: string;
  /** A lecke alap-azonosítója (pl. "g1-c5-egy"); a haladás "<base>-quiz/-matcher/-sorter" néven mentődik. */
  base: string;
  chapterId: string;
  grade?: number;
  questions: MeseQuestion[];
  pairs?: Record<MeseLevel, MesePairsLevel>;
  sort?: Record<MeseLevel, MeseSortLevel>;
  initialGameMode?: MeseGameMode | string;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  [key: string]: unknown;
}

const LEVELS: { lvl: MeseLevel; name: string; icon: string; cls: string }[] = [
  { lvl: 1, name: '1. szint', icon: '🌱', cls: 'from-emerald-400 to-emerald-500 border-emerald-600' },
  { lvl: 2, name: '2. szint', icon: '🌷', cls: 'from-amber-400 to-orange-400 border-orange-500' },
  { lvl: 3, name: '3. szint', icon: '🌻', cls: 'from-rose-400 to-pink-500 border-rose-600' },
];

const MODES: { mode: MeseGameMode; name: string; icon: string }[] = [
  { mode: 'quiz', name: 'Kérdések', icon: '❓' },
  { mode: 'matcher', name: 'Párosító', icon: '🔗' },
  { mode: 'sorter', name: 'Válogató', icon: '🧺' },
];

export const MODE_SAY: Record<MeseGameMode, string> = {
  quiz: 'Válassz szintet! Koppints a jó válaszra!',
  matcher: 'Párosító! Válassz szintet! Koppints két összetartozó kártyára!',
  sorter: 'Válogató! Válassz szintet! Tedd a képet a jó kosárba!',
};

export const MATCH_LEFT_FIRST_SAY = 'Előbb a bal oldalon válassz egy kártyát!';

export const resultSay = (ok: number, total: number): string => {
  const pct = ok / Math.max(1, total);
  return pct >= 0.8
    ? `Hűha! ${ok} csillagot gyűjtöttél! Szuper vagy!`
    : pct >= 0.5
      ? `${ok} csillagot gyűjtöttél! Ügyes vagy! Próbáld újra, és lesz még több!`
      : `${ok} csillagot gyűjtöttél. Gyakoroljunk még együtt!`;
};

/** Minden szöveg, amit a játék (kérdések, párosító, válogató, eredmény) felolvashat – a hanggeneráláshoz. */
export const quizSpeechTexts = (
  questions: MeseQuestion[],
  pairs?: Record<MeseLevel, MesePairsLevel>,
  sort?: Record<MeseLevel, MeseSortLevel>
): string[] => {
  const out: string[] = [...Object.values(MODE_SAY), MATCH_LEFT_FIRST_SAY];
  const totals = new Set<number>();
  for (const lvl of [1, 2, 3] as MeseLevel[]) {
    const qs = questions.filter((q) => q.level === lvl);
    if (qs.length) totals.add(qs.length);
    for (const q of qs) {
      out.push(q.say || q.ask);
      if (q.hint) out.push(q.hint);
    }
    const pl = pairs?.[lvl];
    if (pl) {
      totals.add(pl.pairs.length);
      out.push(pl.say, ...pl.pairs.map((p) => optionSay(p.a)));
    }
    const sl = sort?.[lvl];
    if (sl) {
      totals.add(sl.items.length);
      out.push(sl.say, ...sl.bins.map((b) => b.say || b.label), ...sl.items.map((it) => optionSay(it.item) || sl.say));
    }
  }
  totals.forEach((t) => {
    for (let ok = 0; ok <= t; ok++) out.push(resultSay(ok, t));
  });
  return out;
};

export const MeseQuiz: React.FC<MeseQuizProps> = ({
  title,
  badge,
  base,
  chapterId,
  grade = 1,
  questions,
  pairs,
  sort,
  initialGameMode,
  onBack,
  onSwitchToTheory,
}) => {
  useStopSpeechOnUnmount();
  const { user, profile } = useAuth() as unknown as {
    user?: { uid: string; displayName?: string | null; email?: string | null } | null;
    profile?: { full_name?: string; email?: string; user_code?: string } | null;
  };
  const startMode: MeseGameMode = initialGameMode === 'matcher' || initialGameMode === 'sorter' ? initialGameMode : 'quiz';
  const [mode, setMode] = useState<MeseGameMode>(startMode);
  const [level, setLevel] = useState<MeseLevel | null>(null);
  const [runKey, setRunKey] = useState(0);
  useEffect(() => {
    setMode(startMode);
    setLevel(null);
  }, [startMode]);

  const available = MODES.filter((m) => m.mode === 'quiz' || (m.mode === 'matcher' && pairs) || (m.mode === 'sorter' && sort));

  const save = (gameType: MeseGameMode, lvl: MeseLevel, percentage: number, scorePoints: number, total: number) => {
    if (!user) return;
    try {
      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade,
        chapterId,
        topicId: `${base}-${gameType}`,
        topicTitle: title,
        gameType,
        level: lvl,
        percentage,
        scorePoints,
        totalQuestions: total,
        bestStreak: 0,
      });
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-sky-50 to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 pb-10">
      <style>{SHAKE_KEYFRAMES}</style>
      <div className="max-w-3xl mx-auto px-3 pt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => (level ? (stopSpeaking(), setLevel(null)) : onBack?.())}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/90 border-2 border-slate-200 shadow-sm hover:bg-white"
          aria-label="Vissza"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs font-black tracking-wider text-violet-600 uppercase truncate">{badge}</div>
          <h1 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 truncate">{title}</h1>
        </div>
        <VoiceToggle />
      </div>

      <div className="max-w-3xl mx-auto px-3 mt-3">
        {!level ? (
          <Hub
            mode={mode}
            modes={available}
            onMode={(m) => setMode(m)}
            onLevel={(l) => {
              setLevel(l);
              setRunKey((k) => k + 1);
            }}
            onTheory={onSwitchToTheory}
          />
        ) : mode === 'quiz' ? (
          <QuizRun
            key={`q${runKey}`}
            questions={questions.filter((q) => q.level === level)}
            level={level}
            onDone={(score, total) => save('quiz', level, Math.round((score / Math.max(1, total)) * 100), score, total)}
            onRestart={() => setRunKey((k) => k + 1)}
            onNext={level < 3 ? () => { setLevel((level + 1) as MeseLevel); setRunKey((k) => k + 1); } : undefined}
            onHub={() => setLevel(null)}
          />
        ) : mode === 'matcher' && pairs ? (
          <PairsRun
            key={`p${runKey}`}
            data={pairs[level]}
            onDone={(pct, ok, total) => save('matcher', level, pct, ok, total)}
            onRestart={() => setRunKey((k) => k + 1)}
            onNext={level < 3 ? () => { setLevel((level + 1) as MeseLevel); setRunKey((k) => k + 1); } : undefined}
            onHub={() => setLevel(null)}
          />
        ) : mode === 'sorter' && sort ? (
          <SortRun
            key={`s${runKey}`}
            data={sort[level]}
            onDone={(pct, ok, total) => save('sorter', level, pct, ok, total)}
            onRestart={() => setRunKey((k) => k + 1)}
            onNext={level < 3 ? () => { setLevel((level + 1) as MeseLevel); setRunKey((k) => k + 1); } : undefined}
            onHub={() => setLevel(null)}
          />
        ) : null}
      </div>
    </div>
  );
};

/* ---------------- Hub ---------------- */
const Hub: React.FC<{
  mode: MeseGameMode;
  modes: typeof MODES;
  onMode: (m: MeseGameMode) => void;
  onLevel: (l: MeseLevel) => void;
  onTheory?: () => void;
}> = ({ mode, modes, onMode, onLevel, onTheory }) => {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    speak(MODE_SAY[mode]);
  }, [mode]);
  return (
    <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-violet-200 shadow-lg p-4 sm:p-6">
      <PotyiBubble text={mode === 'quiz' ? 'Válassz szintet!' : mode === 'matcher' ? 'Keresd a párokat!' : 'Tedd a jó kosárba!'} say={MODE_SAY[mode]} mood="cheer" />
      {modes.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {modes.map((m) => (
            <button
              key={m.mode}
              type="button"
              onClick={() => onMode(m.mode)}
              className={cn(
                'h-14 sm:h-16 rounded-2xl border-[3px] font-black text-base sm:text-lg flex items-center justify-center gap-1.5 transition',
                mode === m.mode ? 'bg-violet-500 text-white border-violet-600 shadow-md' : 'bg-white text-violet-700 border-violet-200 hover:bg-violet-50'
              )}
            >
              <span className="text-2xl">{m.icon}</span>
              <span className="hidden sm:inline">{m.name}</span>
            </button>
          ))}
        </div>
      )}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {LEVELS.map((l) => (
          <button
            key={l.lvl}
            type="button"
            onClick={() => onLevel(l.lvl)}
            className={cn('h-24 sm:h-32 rounded-3xl bg-gradient-to-br text-white border-4 shadow-lg active:scale-95 transition flex sm:flex-col items-center justify-center gap-3', l.cls)}
          >
            <span className="text-5xl">{l.icon}</span>
            <span className="text-2xl font-black">{l.name}</span>
          </button>
        ))}
      </div>
      {onTheory && (
        <div className="mt-5 text-center">
          <button type="button" onClick={onTheory} className="inline-flex items-center gap-2 px-5 h-12 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-black border-2 border-rose-300">
            <BookOpen className="w-5 h-5" /> Vissza a meséhez
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- Eredmény ---------------- */
const Result: React.FC<{ ok: number; total: number; onRestart: () => void; onNext?: () => void; onHub: () => void }> = ({ ok, total, onRestart, onNext, onHub }) => {
  const pct = ok / Math.max(1, total);
  useEffect(() => {
    speak(resultSay(ok, total));
    if (pct >= 0.8) confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 } });
  }, [ok, pct]);
  return (
    <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-emerald-200 shadow-lg p-6 text-center">
      <Potyi mood={pct >= 0.5 ? 'cheer' : 'think'} dots={Math.min(10, ok)} className="w-36 h-36 mx-auto" />
      <Stars value={ok} max={total} className="mt-2" />
      <p className="mt-2 text-3xl font-black text-slate-800 dark:text-slate-100">
        {ok} / {total}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onRestart} className="inline-flex items-center gap-2 px-5 h-14 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-lg font-black border-2 border-sky-300">
          <RotateCcw className="w-6 h-6" /> Újra
        </button>
        {onNext && (
          <button type="button" onClick={onNext} className="inline-flex items-center gap-2 px-6 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-black shadow-md">
            Következő szint <ChevronRight className="w-6 h-6" />
          </button>
        )}
        <button type="button" onClick={onHub} className="inline-flex items-center gap-2 px-5 h-14 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-800 text-lg font-black border-2 border-violet-300">
          Szintek
        </button>
      </div>
    </div>
  );
};

/* ---------------- Kérdések ---------------- */
const QuizRun: React.FC<{
  questions: MeseQuestion[];
  level: MeseLevel;
  onDone: (score: number, total: number) => void;
  onRestart: () => void;
  onNext?: () => void;
  onHub: () => void;
}> = ({ questions, onDone, onRestart, onNext, onHub }) => {
  const list = useMemo(() => shuffle(questions).map((q) => ({ q, opts: shuffle(q.options.map((o, i) => ({ o, ok: i === 0 }))) })), [questions]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const done = i >= list.length;
  const reported = useRef(false);

  useEffect(() => {
    if (done) {
      if (!reported.current) {
        reported.current = true;
        onDone(score, list.length);
      }
      return;
    }
    const q = list[i].q;
    const t = window.setTimeout(() => speak(q.say || q.ask), 200);
    return () => window.clearTimeout(t);
  }, [i, done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return <Result ok={score} total={list.length} onRestart={onRestart} onNext={onNext} onHub={onHub} />;
  const { q, opts } = list[i];

  const pick = (o: MeseOption, ok: boolean) => {
    if (solved) return;
    if (ok) {
      setSolved(true);
      if (wrong.length === 0) setScore((s) => s + 1);
      speak(randomPraise());
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.75 } });
      window.setTimeout(() => {
        setI((x) => x + 1);
        setWrong([]);
        setSolved(false);
      }, 1500);
    } else {
      setWrong((w) => [...w, optionKey(o)]);
      speak(q.hint || randomRetry());
    }
  };

  return (
    <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-sky-200 shadow-lg p-3 sm:p-5">
      <div className="flex items-center gap-1.5 justify-center mb-3">
        {list.map((_, k) => (
          <span key={k} className={cn('w-3.5 h-3.5 rounded-full', k < i ? 'bg-emerald-400' : k === i ? 'bg-violet-500 scale-125' : 'bg-slate-200')} />
        ))}
      </div>
      {q.scene && (
        <div className="rounded-3xl bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-800 border-2 border-sky-100 p-2 sm:p-3 flex items-center justify-center min-h-[160px] [&>svg]:w-full [&>svg]:max-w-[440px] [&>svg]:h-auto [&>svg]:max-h-[260px]">
          {q.scene}
        </div>
      )}
      <PotyiBubble className="mt-3" text={q.ask} say={q.say || q.ask} mood={solved ? 'cheer' : wrong.length ? 'think' : 'happy'} />
      <div className={cn('mt-4 grid gap-3', opts.length <= 2 ? 'grid-cols-2' : opts.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4')}>
        {opts.map(({ o, ok }, k) => {
          const key = optionKey(o);
          const state = solved ? (ok ? 'correct' : 'dim') : wrong.includes(key) ? 'wrong' : 'idle';
          return <OptionButton key={`${i}-${k}`} option={o} state={state} disabled={solved || wrong.includes(key)} onClick={() => pick(o, ok)} />;
        })}
      </div>
      <p className="mt-3 text-center text-xs font-bold text-slate-400">{q.badge}</p>
    </div>
  );
};

/* ---------------- Párosító ---------------- */
const PairsRun: React.FC<{
  data: MesePairsLevel;
  onDone: (pct: number, ok: number, total: number) => void;
  onRestart: () => void;
  onNext?: () => void;
  onHub: () => void;
}> = ({ data, onDone, onRestart, onNext, onHub }) => {
  const left = useMemo(() => shuffle(data.pairs.map((p, i) => ({ o: p.a, i }))), [data]);
  const right = useMemo(() => shuffle(data.pairs.map((p, i) => ({ o: p.b, i }))), [data]);
  const [sel, setSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState<number | null>(null);
  const total = data.pairs.length;
  const done = matched.length === total;
  const reported = useRef(false);
  const ok = Math.max(0, total - mistakes);

  useEffect(() => {
    const t = window.setTimeout(() => speak(data.say), 200);
    return () => window.clearTimeout(t);
  }, [data]);
  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      onDone(Math.round((total / (total + mistakes)) * 100), ok, total);
    }
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return <Result ok={ok} total={total} onRestart={onRestart} onNext={onNext} onHub={onHub} />;

  const tapLeft = (i: number) => {
    if (matched.includes(i)) return;
    setSel(i);
    speak(optionSay(data.pairs[i].a));
  };
  const tapRight = (i: number) => {
    if (matched.includes(i)) return;
    if (sel === null) {
      speak(MATCH_LEFT_FIRST_SAY);
      return;
    }
    if (sel === i) {
      setMatched((m) => [...m, i]);
      setSel(null);
      speak(randomPraise());
    } else {
      setMistakes((m) => m + 1);
      setShake(i);
      window.setTimeout(() => setShake(null), 450);
      speak(randomRetry());
    }
  };

  return (
    <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-violet-200 shadow-lg p-3 sm:p-5">
      <PotyiBubble text="Keresd a párokat!" say={data.say} mood="happy" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-6">
        <div className="flex flex-col gap-3">
          {left.map(({ o, i }) => (
            <div key={`l${i}`} className={cn('rounded-3xl', sel === i && 'ring-4 ring-violet-400')}>
              <OptionButton compact option={o} state={matched.includes(i) ? 'correct' : 'idle'} disabled={matched.includes(i)} onClick={() => tapLeft(i)} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {right.map(({ o, i }) => (
            <OptionButton key={`r${i}`} compact option={o} state={matched.includes(i) ? 'correct' : shake === i ? 'wrong' : 'idle'} disabled={matched.includes(i)} onClick={() => tapRight(i)} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Válogató ---------------- */
const SortRun: React.FC<{
  data: MeseSortLevel;
  onDone: (pct: number, ok: number, total: number) => void;
  onRestart: () => void;
  onNext?: () => void;
  onHub: () => void;
}> = ({ data, onDone, onRestart, onNext, onHub }) => {
  const items = useMemo(() => shuffle(data.items), [data]);
  const [k, setK] = useState(0);
  const [placed, setPlaced] = useState<number[][]>(() => data.bins.map(() => []));
  const [firstTryOk, setFirstTryOk] = useState(0);
  const [missed, setMissed] = useState(false);
  const [shakeBin, setShakeBin] = useState<number | null>(null);
  const total = items.length;
  const done = k >= total;
  const reported = useRef(false);

  useEffect(() => {
    const t = window.setTimeout(() => speak(data.say), 200);
    return () => window.clearTimeout(t);
  }, [data]);
  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      onDone(Math.round((firstTryOk / Math.max(1, total)) * 100), firstTryOk, total);
    }
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return <Result ok={firstTryOk} total={total} onRestart={onRestart} onNext={onNext} onHub={onHub} />;
  const cur = items[k];

  const drop = (b: number) => {
    if (b === cur.bin) {
      if (!missed) setFirstTryOk((s) => s + 1);
      setPlaced((p) => p.map((arr, i) => (i === b ? [...arr, k] : arr)));
      setMissed(false);
      setK((x) => x + 1);
      speak(randomPraise());
    } else {
      setMissed(true);
      setShakeBin(b);
      window.setTimeout(() => setShakeBin(null), 450);
      speak(randomRetry());
    }
  };

  return (
    <div className="rounded-[2rem] bg-white/90 dark:bg-slate-800 border-4 border-amber-200 shadow-lg p-3 sm:p-5">
      <PotyiBubble text="Melyik kosárba való?" say={data.say} mood="happy" />
      <div className="mt-4 flex justify-center">
        <div className="w-44 sm:w-52">
          <OptionButton option={cur.item} onClick={() => speak(optionSay(cur.item) || data.say)} />
        </div>
      </div>
      <p className="mt-1 text-center text-sm font-bold text-slate-400">
        {k + 1} / {total}
      </p>
      <div className={cn('mt-4 grid gap-3', data.bins.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
        {data.bins.map((bin, b) => (
          <button
            key={b}
            type="button"
            onClick={() => drop(b)}
            className={cn(
              'min-h-[140px] rounded-3xl border-4 border-dashed border-amber-400 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 p-2 flex flex-col items-center gap-1 active:scale-95 transition',
              shakeBin === b && 'border-rose-400 bg-rose-50 animate-[g1shake_0.4s_ease-in-out]'
            )}
          >
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-200 leading-tight">{bin.label}</span>
              <SpeakButton text={bin.say || bin.label} className="w-8 h-8" />
            </div>
            {bin.figure && <div className="[&_svg]:max-h-[60px] [&_svg]:w-auto">{bin.figure}</div>}
            <div className="flex flex-wrap justify-center gap-1 mt-auto">
              {placed[b].map((idx) => (
                <span key={idx} className="text-xl">⭐</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MeseQuiz;
