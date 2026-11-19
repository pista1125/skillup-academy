// „Testek” – Játszótér: Pötyi toronyépítője. A gyerek annyi kockát tesz a toronyra, amennyit a szám mutat.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { BigSign } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { towerEl } from './TestekG1Scenes';

const newTarget = (prev?: number) => {
  let n = 2 + Math.floor(Math.random() * 7); // 2–8
  if (n === prev) n = n === 8 ? 3 : n + 1;
  return n;
};

export const TowerBuilderPlayground: React.FC = () => {
  const [target, setTarget] = useState(() => newTarget());
  const [n, setN] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const ask = `Építs ${target} kockás tornyot!`;
  const a = 30;
  const h = 10 * a + 30;

  const add = () => {
    setMsg(null);
    setN((x) => Math.min(10, x + 1));
  };
  const remove = () => {
    setMsg(null);
    setN((x) => Math.max(0, x - 1));
  };
  const check = () => {
    let t: string;
    if (n === target) {
      t = `${randomPraise()} A torony ${target} kockából áll.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (n < target) {
      t = 'Még alacsony a torony. Számold meg a kockákat, és tegyél rá még!';
    } else {
      t = 'Ez túl magas lett. Számold meg a kockákat, és vegyél le!';
    }
    setMsg({ text: t, ok: n === target });
    speak(t);
  };
  const next = () => {
    setTarget((t) => newTarget(t));
    setN(0);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} mood="happy" />
      <div className="flex items-end justify-center gap-4 rounded-3xl border-4 border-amber-200 bg-amber-50 p-3">
        <BigSign text={target} className="w-20 h-20 shrink-0" />
        <svg viewBox={`0 0 80 ${h}`} className="h-72 w-auto" aria-label={`${n} kocka a tornyon`}>
          <path d={`M4 ${h - 6} H76`} stroke="#a16207" strokeWidth="4" />
          {towerEl(n, 20, h - 8, a)}
        </svg>
      </div>
      <div className="flex justify-center gap-3">
        <button type="button" onClick={add} className="h-14 px-5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 text-xl font-black shadow border-2 border-amber-500">
          + kocka
        </button>
        <button type="button" onClick={remove} className="h-14 px-5 rounded-full bg-white hover:bg-amber-50 text-amber-900 text-xl font-black border-2 border-amber-400">
          − kocka
        </button>
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex justify-center gap-3">
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
