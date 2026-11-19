// „A tizenöt” – Játszótér: Halak a hálóba! Annyi korongot (halat) tegyél a két tízes keretbe, amennyit a szám mutat (6–15).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { BigSign } from '../../shared/G1Pics';
import { speak, randomPraise } from '../../shared/speech';
import { TwoFrames } from './ATizenotG1Scenes';

const newTarget = (prev?: number) => {
  // leggyakrabban 11–15 (tízes és egyes), néha 6–10
  let t = Math.random() < 0.75 ? 11 + Math.floor(Math.random() * 5) : 6 + Math.floor(Math.random() * 5);
  if (t === prev) t = t === 15 ? 14 : t + 1;
  return t;
};

export const FishNetPlayground: React.FC = () => {
  const [target, setTarget] = useState(() => newTarget());
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = 'Nézd a számot a táblán! Annyi halat tegyél a két hálóba. Előbb az első háló teljen meg, az tíz. A Még egy gombbal teszel be egyet, az Elveszek gombbal kiveszel egyet.';

  const check = () => {
    const ok = count === target;
    let t: string;
    if (ok) {
      t = target > 10 ? `${randomPraise()} Egy tízes és ${target - 10} egyes: ${target}.` : `${randomPraise()} Pont ${target} hal van a hálóban.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (count < target) {
      t = 'Kevés hal van a hálóban. Tegyél be még!';
    } else {
      t = 'Túl sok hal van a hálóban. Vegyél ki egyet!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTarget((p) => newTarget(p));
    setCount(0);
    setMsg(null);
  };
  const btn = 'h-14 px-5 rounded-full text-xl font-black flex items-center gap-2';

  return (
    <div className="space-y-3">
      <PotyiBubble text="Annyi hal, amennyi a szám!" say={say} mood="happy" dots={10} />
      <div className="rounded-3xl border-4 border-sky-200 bg-sky-50 p-3 space-y-3">
        <BigSign text={target} className="w-20 h-20 mx-auto" />
        <TwoFrames a={count} colorA="#f97316" />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setCount((c) => Math.min(15, c + 1));
          }}
          className={cn(btn, 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300')}
          aria-label="Tegyél be egy halat"
        >
          Még egy
        </button>
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setCount((c) => Math.max(0, c - 1));
          }}
          className={cn(btn, 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-2 border-rose-300')}
          aria-label="Vegyél ki egy halat"
        >
          Elveszek
        </button>
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
