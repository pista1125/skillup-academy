// „Számszomszédok” – Játszótér: Szomszédkereső. Középen egy szám (1–6), a gyerek előbb a kisebb, aztán a nagyobb szomszédot választja.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { HousesScene } from '../a-het/AHetG1Scenes';

const art = (k: number) => (k === 1 || k === 5 ? 'az' : 'a');
const Art = (k: number) => (k === 1 || k === 5 ? 'Az' : 'A');

const newNum = (prev?: number) => {
  let n = 1 + Math.floor(Math.random() * 6);
  if (n === prev) n = (n % 6) + 1;
  return n;
};

export const NeighbourPlayground: React.FC = () => {
  const [n, setN] = useState(() => newNum());
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const askingLeft = left === null;
  const done = left !== null && right !== null;
  const ask = askingLeft ? `Ki lakik ${art(n)} ${n} előtt?` : done ? 'Megvan mindkét szomszéd!' : `Ki lakik ${art(n)} ${n} után?`;
  const say = askingLeft ? `A középső házban ${art(n)} ${n} lakik. Ki a kisebb szomszédja, aki előtte lakik?` : `Most keresd meg ${art(n)} ${n} nagyobb szomszédját, aki utána lakik!`;

  const pick = (v: number) => {
    if (done) return;
    let t: string;
    if (askingLeft) {
      if (v === n - 1) {
        setLeft(v);
        t = `${randomPraise()} ${Art(n)} ${n} előtt ${art(v)} ${v} lakik. Most jöhet a nagyobb szomszéd!`;
        setMsg({ text: t, ok: true });
      } else {
        t = v === n ? 'Ez maga a szám. A szomszédját keresd!' : v > n ? 'Ez nagyobb szám. A kisebb szomszéd eggyel kevesebb.' : 'Ez nem a szomszéd, messzebb lakik. Eggyel kevesebb kell.';
        setMsg({ text: t, ok: false });
      }
    } else if (v === n + 1) {
      setRight(v);
      t = `${randomPraise()} ${n - 1}, ${n}, ${v}: így laknak egymás mellett.`;
      setMsg({ text: t, ok: true });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      t = v === n ? 'Ez maga a szám. A szomszédját keresd!' : v < n ? 'Ez kisebb szám. A nagyobb szomszéd eggyel több.' : 'Ez nem a szomszéd, messzebb lakik. Eggyel több kell.';
      setMsg({ text: t, ok: false });
    }
    speak(t);
  };
  const next = () => {
    setN((x) => newNum(x));
    setLeft(null);
    setRight(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} say={say} mood="think" dots={7} />
      <HousesScene houses={[{ label: left ?? '?' }, { label: n, who: 'potyi', hi: true }, { label: right ?? '?' }]} />
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {Array.from({ length: 8 }, (_, v) => (
          <button
            key={v}
            type="button"
            onClick={() => pick(v)}
            disabled={done}
            className={cn('h-16 rounded-2xl border-4 bg-white text-3xl font-black active:scale-95', v === left || v === right ? 'border-emerald-500 bg-emerald-100' : 'border-sky-200 hover:border-sky-400')}
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
