// „Nyitott mondatok” – Játszótér: Melyik szám bújt a hó alá? A gyerek kipróbál egy számot, Pötyi megmondja, igaz-e a mondat.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { TruthIcon } from './NyitottMondatokG1Scenes';

type Task = { text: string; test: (x: number) => boolean; many: boolean };

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const makeTask = (): Task => {
  const kind = rnd(0, 5);
  if (kind === 0) {
    const c = rnd(2, 8), a = rnd(0, c);
    return { text: `${a} + □ = ${c}`, test: (x) => a + x === c, many: false };
  }
  if (kind === 1) {
    const c = rnd(2, 8), b = rnd(0, c);
    return { text: `□ + ${b} = ${c}`, test: (x) => x + b === c, many: false };
  }
  if (kind === 2) {
    const a = rnd(3, 8), c = rnd(0, a);
    return { text: `${a} − □ = ${c}`, test: (x) => a - x === c, many: false };
  }
  if (kind === 3) {
    const b = rnd(1, 5), c = rnd(0, 8 - b);
    return { text: `□ − ${b} = ${c}`, test: (x) => x - b === c, many: false };
  }
  if (kind === 4) {
    const k = rnd(1, 7);
    return Math.random() < 0.5
      ? { text: `□ < ${k}`, test: (x) => x < k, many: true }
      : { text: `□ > ${k}`, test: (x) => x > k, many: true };
  }
  const lo = rnd(0, 4), hi = rnd(lo + 2, 8);
  return { text: `${lo} < □ < ${hi}`, test: (x) => lo < x && x < hi, many: true };
};

const SAY = 'A hó betakart egy számot. Próbálj ki egy számot: koppints rá! Pötyi megmondja, igaz lesz-e a mondat.';

export const OpenSentencePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => makeTask());
  const [picked, setPicked] = useState<number | null>(null);
  const [found, setFound] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = SAY;
  const ok = picked !== null && task.test(picked);

  const choose = (v: number) => {
    setPicked(v);
    const good = task.test(v);
    let t: string;
    if (good) {
      const all = found.includes(v) ? found : [...found, v];
      setFound(all);
      const total = Array.from({ length: 9 }, (_, i) => i).filter(task.test).length;
      if (!task.many) t = `${randomPraise()} Igaz! ${v === 1 || v === 5 ? "Az" : "A"} ${v} illik a helyére.`;
      else if (all.length < total) t = `${randomPraise()} Igaz! De más szám is jó lehet. Keress még!`;
      else t = `${randomPraise()} Megtaláltad az összes jó számot!`;
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
    } else {
      t = 'Ez hamis. Próbálj ki egy másik számot!';
    }
    setMsg({ text: t, ok: good });
    speak(t);
  };
  const next = () => {
    setTask(makeTask());
    setPicked(null);
    setFound([]);
    setMsg(null);
  };
  const boxIdx = 0;

  return (
    <div className="space-y-3">
      <PotyiBubble text="Melyik szám bújt a hó alá?" say={say} mood="think" dots={8} />
      <div className="rounded-3xl border-4 border-violet-200 bg-violet-50 p-3 flex items-center justify-center gap-3">
        <EqCard text={task.text} className="w-full max-w-[360px] h-auto" filled={picked !== null ? { at: boxIdx, value: picked, ok } : undefined} />
        {picked !== null && <TruthIcon ok={ok} className="w-14 h-14 shrink-0" />}
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
        {Array.from({ length: 9 }, (_, v) => (
          <button
            key={v}
            type="button"
            onClick={() => choose(v)}
            className={cn(
              'h-16 rounded-2xl border-4 text-3xl font-black transition active:scale-95',
              found.includes(v) ? 'bg-emerald-100 border-emerald-500' : picked === v ? 'bg-rose-100 border-rose-400' : 'bg-white border-sky-300 hover:border-sky-500'
            )}
          >
            {v}
          </button>
        ))}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex justify-center">
        <button type="button" onClick={next} className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
OpenSentencePlayground.speechTexts = () => {
  const V = Array.from({ length: 9 }, (_, i) => i);
  return [
    SAY,
    ...PRAISES.flatMap((p) => [
      ...V.map((v) => `${p} Igaz! ${v === 1 || v === 5 ? "Az" : "A"} ${v} illik a helyére.`),
      `${p} Igaz! De más szám is jó lehet. Keress még!`,
      `${p} Megtaláltad az összes jó számot!`,
    ]),
    "Ez hamis. Próbálj ki egy másik számot!",
  ];
};
