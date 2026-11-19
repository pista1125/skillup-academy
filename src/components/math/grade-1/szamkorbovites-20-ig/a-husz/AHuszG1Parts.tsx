// „A húsz” – Játszótér: Rudak és kockák. A táblán egy szám (10–20); a gyerek tízesrudakat és egyes kockákat rak ki, amíg ugyanannyi nem lesz.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { BigSign } from '../../shared/G1Pics';
import { speak, randomPraise } from '../../shared/speech';
import { RodsScene } from './AHuszG1Scenes';

const newTarget = (prev?: number) => {
  // gyakran 20, egyébként 10–19
  let t = Math.random() < 0.3 ? 20 : 10 + Math.floor(Math.random() * 10);
  if (t === prev) t = t === 20 ? 17 : t + 1;
  return t;
};

const nameOnes = (o: number) => (o === 0 ? 'nulla egyes' : `${o} egyes`);

export const RodsPlayground: React.FC = () => {
  const [target, setTarget] = useState(() => newTarget());
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say =
    'Nézd a számot a táblán! Rakd ki rudakkal és kockákkal. Egy narancs rúd 10 kocka, egy tízes. A sárga kocka egy egyes. A gombokkal teszel hozzá vagy veszel el.';

  const check = () => {
    const n = tens * 10 + ones;
    const ok = n === target;
    let t: string;
    if (ok) {
      t = `${randomPraise()} ${tens} tízes és ${nameOnes(ones)}: ${target}.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (tens < Math.floor(target / 10)) {
      t = 'Kevés a rúd. Tegyél be még egy tízest!';
    } else if (tens > Math.floor(target / 10)) {
      t = 'Túl sok a rúd. Vegyél ki egy tízest!';
    } else if (ones < target % 10) {
      t = 'Kevés a kocka. Tegyél be még egyest!';
    } else {
      t = 'Túl sok a kocka. Vegyél ki egyet!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTarget((p) => newTarget(p));
    setTens(0);
    setOnes(0);
    setMsg(null);
  };
  const btn = 'h-14 px-4 rounded-full text-lg font-black flex items-center gap-2';
  const change = (f: () => void) => {
    setMsg(null);
    f();
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Rakd ki rudakkal és kockákkal!" say={say} mood="happy" dots={10} />
      <div className="rounded-3xl border-4 border-orange-200 bg-orange-50 p-3 space-y-3">
        <BigSign text={target} className="w-20 h-20 mx-auto" />
        <RodsScene n={tens * 10 + ones} />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => change(() => setTens((c) => Math.min(2, c + 1)))} className={cn(btn, 'bg-orange-100 hover:bg-orange-200 text-orange-900 border-2 border-orange-300')} aria-label="Tegyél be egy tízesrudat">
          + rúd
        </button>
        <button type="button" onClick={() => change(() => setTens((c) => Math.max(0, c - 1)))} className={cn(btn, 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-2 border-orange-200')} aria-label="Vegyél ki egy tízesrudat">
          − rúd
        </button>
        <button type="button" onClick={() => change(() => setOnes((c) => Math.min(9, c + 1)))} className={cn(btn, 'bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border-2 border-yellow-300')} aria-label="Tegyél be egy egyes kockát">
          + kocka
        </button>
        <button type="button" onClick={() => change(() => setOnes((c) => Math.max(0, c - 1)))} className={cn(btn, 'bg-yellow-50 hover:bg-yellow-100 text-yellow-900 border-2 border-yellow-200')} aria-label="Vegyél ki egy egyes kockát">
          − kocka
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={check} className={cn(btn, 'px-6 bg-emerald-500 hover:bg-emerald-400 text-white shadow')}>
          Kész ✔
        </button>
        <button type="button" onClick={next} className={cn(btn, 'px-6 bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300')}>
          Új feladat
        </button>
      </div>
    </div>
  );
};
