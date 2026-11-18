// „A három” – Játszótér: Legyen ugyanannyi! Pötyi sora mellé rakj ugyanannyit (0–3).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { ICONS, IconName } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';

const KINDS: { a: IconName; b: IconName; name: string }[] = [
  { a: 'gomba', b: 'gomba', name: 'gomba' },
  { a: 'virag', b: 'meh', name: 'méh' },
  { a: 'alma', b: 'alma', name: 'alma' },
  { a: 'katica', b: 'level', name: 'levél' },
  { a: 'hal', b: 'hal', name: 'hal' },
];

const newTask = (prev?: { k: number; target: number }) => {
  let k = Math.floor(Math.random() * KINDS.length);
  if (prev && k === prev.k) k = (k + 1) % KINDS.length;
  // a hármas gyakrabban jön, de a 0, 1, 2 is előfordul
  const r = Math.random();
  const target = r < 0.5 ? 3 : r < 0.7 ? 2 : r < 0.88 ? 1 : 0;
  let start = Math.floor(Math.random() * 4);
  if (start === target) start = (start + 1) % 4;
  return { k, target, start };
};

const Cell: React.FC<{ icon: IconName }> = ({ icon }) => <svg viewBox="0 0 60 60" className="w-full h-full">{ICONS[icon]({ x: 30, y: 30, s: 1.2 })}</svg>;

export const SameCountPlayground: React.FC = () => {
  const [task, setTask] = useState(() => newTask());
  const [count, setCount] = useState(task.start);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const kind = KINDS[task.k];
  const say = 'Nézd meg a felső sort! Az alsó sorban legyen ugyanannyi. Tegyél hozzá, vagy koppints egyre, hogy elmenjen!';

  const check = () => {
    let t: string;
    const ok = count === task.target;
    if (ok) {
      t = task.target === 0 ? `${randomPraise()} Mindkét sor üres: nulla és nulla.` : `${randomPraise()} Ugyanannyi! Mindkét sorban ${task.target} van.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (count < task.target) {
      t = 'Lent kevesebb van. Tegyél hozzá!';
    } else {
      t = 'Lent több van. Koppints egyre, hogy elmenjen!';
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
      <PotyiBubble text="Legyen ugyanannyi!" say={say} mood="happy" dots={3} />
      <div className="rounded-3xl border-4 border-amber-300 bg-amber-50 min-h-[100px] p-2 flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: task.target }, (_, i) => (
          <div key={i} className="w-20 h-20 rounded-2xl bg-white border-4 border-amber-200">
            <Cell icon={kind.a} />
          </div>
        ))}
        {task.target === 0 && <span className="text-xl font-black text-amber-700">Üres</span>}
      </div>
      <div className="rounded-3xl border-4 border-dashed border-emerald-400 bg-emerald-50 min-h-[100px] p-2 flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setMsg(null);
              setCount((c) => Math.max(0, c - 1));
            }}
            className="w-20 h-20 rounded-2xl bg-white border-4 border-emerald-200 hover:border-rose-300 active:scale-95"
            aria-label="Elveszem"
          >
            <Cell icon={kind.b} />
          </button>
        ))}
        {count === 0 && <span className="text-xl font-black text-emerald-700">Üres</span>}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setCount((c) => Math.min(5, c + 1));
          }}
          className="h-14 px-5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xl font-black border-2 border-amber-300 flex items-center gap-2"
          aria-label="Tegyél hozzá egyet"
        >
          <svg viewBox="0 0 60 60" className="w-9 h-9">{ICONS[kind.b]({ x: 30, y: 30, s: 1.1 })}</svg>
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
