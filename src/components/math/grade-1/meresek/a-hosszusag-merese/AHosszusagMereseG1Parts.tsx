// „A hosszúság mérése” – Játszótér: mérj rudakkal! A gyerek egyenként lerakja a narancssárga rudakat a szalag alá, majd szól, ha kész.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { rodRow, thing } from './AHosszusagMereseG1Scenes';

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#facc15'];
const KINDS = ['szalag', 'ceruza', 'palcika'] as const;
const NAME: Record<(typeof KINDS)[number], string> = { szalag: 'a szalag', ceruza: 'a ceruza', palcika: 'a pálca' };

type Task = { n: number; kind: (typeof KINDS)[number]; color: string };
const newTask = (prev?: Task): Task => {
  let n: number;
  do n = 2 + Math.floor(Math.random() * 7);
  while (prev && n === prev.n);
  return { n, kind: KINDS[Math.floor(Math.random() * KINDS.length)], color: COLORS[Math.floor(Math.random() * COLORS.length)] };
};

export const RodMeasurePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [rods, setRods] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [done, setDone] = useState(false);
  const u = 40;

  const add = () => {
    if (done || rods >= 10) return;
    setRods((r) => r + 1);
    setMsg(null);
  };
  const remove = () => {
    if (done || rods === 0) return;
    setRods((r) => r - 1);
    setMsg(null);
  };
  const check = () => {
    if (done) return;
    if (rods === task.n) {
      const t = `${randomPraise()} ${NAME[task.kind][0].toUpperCase()}${NAME[task.kind].slice(1)} ${task.n} rúd hosszú, vagyis ${task.n} deciméter.`;
      setMsg({ text: t, ok: true });
      setDone(true);
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = rods < task.n ? 'Még nem értél a végéig! Tegyél le még rudat.' : 'Túl sok! A rúd kilóg a végén. Vegyél el egyet.';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setRods(0);
    setMsg(null);
    setDone(false);
  };

  const btn = 'flex-1 min-h-[72px] rounded-3xl border-4 bg-white flex items-center justify-center gap-2 active:scale-95 text-lg sm:text-xl font-black text-slate-800';
  return (
    <div className="space-y-3">
      <PotyiBubble text="Mérd meg rudakkal!" say={`Mérd meg narancssárga rudakkal, milyen hosszú ${NAME[task.kind]}! Tegyél le annyi rudat, hogy épp a végéig érjen, aztán koppints a Kész gombra!`} mood="think" />
      <div className="rounded-3xl border-4 border-sky-200 bg-white p-2 flex justify-center">
        <svg viewBox="0 0 440 110" className="w-full max-w-[460px] h-auto">
          <path d="M10 6 V104" stroke="#64748b" strokeWidth="2.5" strokeDasharray="6 5" />
          <path d={`M${10 + task.n * u} 6 V104`} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 5" />
          {thing(task.kind, 10, 34, task.n * u, task.color)}
          {rodRow(10, 66, rods, u, 22)}
        </svg>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={remove} className={cn(btn, 'border-slate-300 hover:border-slate-500')}>
          − rúd
        </button>
        <button type="button" onClick={add} className={cn(btn, 'border-orange-300 hover:border-orange-500')}>
          <svg viewBox="0 0 44 22" className="w-10 h-6">
            <rect x="2" y="2" width="40" height="18" rx="3" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" />
          </svg>
          + rúd
        </button>
        <button type="button" onClick={check} className={cn(btn, 'border-emerald-300 hover:border-emerald-500')}>
          Kész!
        </button>
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
RodMeasurePlayground.speechTexts = () => {
  const N = Array.from({ length: 7 }, (_, i) => i + 2);
  return [
    ...KINDS.map((k) => `Mérd meg narancssárga rudakkal, milyen hosszú ${NAME[k]}! Tegyél le annyi rudat, hogy épp a végéig érjen, aztán koppints a Kész gombra!`),
    ...PRAISES.flatMap((p) => KINDS.flatMap((k) => N.map((n) => `${p} ${NAME[k][0].toUpperCase()}${NAME[k].slice(1)} ${n} rúd hosszú, vagyis ${n} deciméter.`))),
    'Még nem értél a végéig! Tegyél le még rudat.',
    'Túl sok! A rúd kilóg a végén. Vegyél el egyet.',
  ];
};
