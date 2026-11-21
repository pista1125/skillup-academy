// „Páros és páratlan számok” – Játszótér: Párba állítás. 1–6 katica; koppints kettőre, és párt alkotnak.
// Végül: páros (mindenkinek jutott pár) vagy páratlan (egy egyedül maradt)?
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { ICONS } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { ParityIcon } from './ParosEsParatlanSzamokG1Scenes';

const PAIR_COLORS = ['#bbf7d0', '#fde68a', '#bfdbfe'];

const newN = (prev?: number) => {
  let n = 1 + Math.floor(Math.random() * 6);
  if (n === prev) n = (n % 6) + 1;
  return n;
};

export const PairingPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [n, setN] = useState(() => newN());
  // pairOf[i] = a pár sorszáma, vagy -1
  const [pairOf, setPairOf] = useState<number[]>(() => Array(n).fill(-1));
  const [sel, setSel] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const pairs = Math.max(-1, ...pairOf) + 1;
  const even = n % 2 === 0;
  const allPaired = pairs === Math.floor(n / 2);
  const art = n === 1 || n === 5 ? 'Az' : 'A';

  const tap = (i: number) => {
    setMsg(null);
    if (pairOf[i] >= 0) {
      // pár bontása
      const p = pairOf[i];
      setPairOf((a) => a.map((v) => (v === p ? -1 : v > p ? v - 1 : v)));
      setSel(null);
      return;
    }
    if (sel === null) {
      setSel(i);
    } else if (sel === i) {
      setSel(null);
    } else {
      const p = pairs;
      setPairOf((a) => a.map((v, k) => (k === i || k === sel ? p : v)));
      setSel(null);
      speak('Kész egy pár!');
    }
  };
  const answer = (saysEven: boolean) => {
    let t: string;
    const ok = saysEven === even;
    if (!allPaired) {
      t = 'Előbb állíts párba mindenkit, akit csak lehet! Koppints két katicára.';
    } else if (ok) {
      t = even ? `${randomPraise()} Mindenkinek jutott pár. ${art} ${n} páros szám.` : `${randomPraise()} Egy katica egyedül maradt. ${art} ${n} páratlan szám.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      t = even ? 'Nézd meg jól: maradt valaki pár nélkül?' : 'Nézd meg jól: van valaki, akinek nincs párja!';
    }
    setMsg({ text: t, ok: ok && allPaired });
    speak(t);
  };
  const next = () => {
    const m = newN(n);
    setN(m);
    setPairOf(Array(m).fill(-1));
    setSel(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Állítsd párba a katicákat!" say="Koppints két katicára, és párban táncolnak. Utána mondd meg: páros vagy páratlan? Jutott mindenkinek pár?" mood="happy" dots={6} />
      <div className="flex flex-wrap justify-center gap-3">
        {pairOf.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tap(i)}
            className={cn('w-20 h-20 rounded-3xl border-4 active:scale-95 transition', sel === i ? 'border-violet-500 ring-4 ring-violet-300 bg-violet-50' : p >= 0 ? 'border-emerald-500' : 'border-sky-200 bg-white')}
            style={p >= 0 ? { background: PAIR_COLORS[p % PAIR_COLORS.length] } : undefined}
            aria-label={p >= 0 ? `${p + 1}. pár` : 'katica'}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">{ICONS.katica({ x: 30, y: 32, s: 1.4 })}</svg>
          </button>
        ))}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => answer(true)} className="h-20 px-4 rounded-3xl bg-white border-4 border-emerald-400 hover:bg-emerald-50 flex items-center gap-2 text-xl font-black text-slate-800">
          <ParityIcon even /> páros
        </button>
        <button type="button" onClick={() => answer(false)} className="h-20 px-4 rounded-3xl bg-white border-4 border-orange-400 hover:bg-orange-50 flex items-center gap-2 text-xl font-black text-slate-800">
          <ParityIcon even={false} /> páratlan
        </button>
        <button type="button" onClick={next} className="h-14 self-center px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
PairingPlayground.speechTexts = () => {
  const N = [1, 2, 3, 4, 5, 6];
  const art = (n: number) => (n === 1 || n === 5 ? 'Az' : 'A');
  return [
    'Koppints két katicára, és párban táncolnak. Utána mondd meg: páros vagy páratlan? Jutott mindenkinek pár?',
    'Kész egy pár!',
    'Előbb állíts párba mindenkit, akit csak lehet! Koppints két katicára.',
    ...PRAISES.flatMap((p) =>
      N.map((n) => (n % 2 === 0 ? `${p} Mindenkinek jutott pár. ${art(n)} ${n} páros szám.` : `${p} Egy katica egyedül maradt. ${art(n)} ${n} páratlan szám.`)),
    ),
    'Nézd meg jól: maradt valaki pár nélkül?',
    'Nézd meg jól: van valaki, akinek nincs párja!',
  ];
};
