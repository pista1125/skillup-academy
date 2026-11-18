// „A kettő” – Játszótér: Legyen pontosan KETTŐ! Tegyél hozzá, vagy vegyél el.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { ICONS, IconName } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';

const KINDS: { icon: IconName; name: string }[] = [
  { icon: 'virag', name: 'virág' },
  { icon: 'meh', name: 'méh' },
  { icon: 'eper', name: 'eper' },
  { icon: 'gomba', name: 'gomba' },
  { icon: 'pillango', name: 'pillangó' },
];
const STARTS = [1, 3, 4];

const newTask = (prev?: { kind: number; start: number }) => {
  let k = Math.floor(Math.random() * KINDS.length);
  if (prev && k === prev.kind) k = (k + 1) % KINDS.length;
  let s = STARTS[Math.floor(Math.random() * STARTS.length)];
  if (prev && s === prev.start) s = STARTS[(STARTS.indexOf(s) + 1) % STARTS.length];
  return { kind: k, start: s };
};

export const MakeTwoPlayground: React.FC = () => {
  const [task, setTask] = useState(() => newTask());
  const [count, setCount] = useState(task.start);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const kind = KINDS[task.kind];
  const ask = 'Legyen itt kettő!';
  const askSay = `Legyen itt pontosan két ${kind.name}! Ha kevés, tegyél hozzá. Ha sok, koppints egyre, és elrepül.`;

  const add = () => {
    setMsg(null);
    setCount((c) => Math.min(5, c + 1));
  };
  const remove = () => {
    setMsg(null);
    setCount((c) => Math.max(0, c - 1));
  };
  const check = () => {
    let t: string;
    const ok = count === 2;
    if (ok) {
      t = `${randomPraise()} Most két ${kind.name} van itt.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (count < 2) {
      t = 'Ez még kevés. Tegyél hozzá!';
    } else {
      t = 'Ez több, mint kettő. Koppints egyre, hogy elmenjen!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    const t = newTask(task);
    setTask(t);
    setCount(t.start);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} say={askSay} mood="happy" dots={2} />
      <div className="rounded-3xl border-4 border-dashed border-emerald-400 bg-emerald-50 min-h-[130px] p-3 flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" onClick={remove} className="w-20 h-20 rounded-2xl bg-white border-4 border-emerald-200 hover:border-rose-300 active:scale-95" aria-label="Elveszem">
            <svg viewBox="0 0 60 60" className="w-full h-full">{ICONS[kind.icon]({ x: 30, y: 30, s: 1.2 })}</svg>
          </button>
        ))}
        {count === 0 && <span className="text-xl font-black text-emerald-700">Üres</span>}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={add} className="h-14 px-5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xl font-black border-2 border-amber-300 flex items-center gap-2" aria-label="Tegyél hozzá egyet">
          <svg viewBox="0 0 60 60" className="w-9 h-9">{ICONS[kind.icon]({ x: 30, y: 30, s: 1.1 })}</svg>
          Még egy
        </button>
        <button type="button" onClick={check} className="h-14 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xl font-black shadow">
          Kész ✔
        </button>
        <button type="button" onClick={next} className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};
