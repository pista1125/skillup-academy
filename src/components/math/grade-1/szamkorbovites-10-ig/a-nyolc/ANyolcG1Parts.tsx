// „A nyolc” – Játszótér: Gombok a hóemberre! Annyi gombot tegyél, amennyit a szám mutat (0–8).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { SnowmanScene, WINTER } from './ANyolcG1Scenes';

const newTarget = (prev?: number) => {
  // a nyolcas jön a leggyakrabban, de a kisebb számok is előfordulnak
  const r = Math.random();
  let t = r < 0.45 ? 8 : r < 0.6 ? 7 : r < 0.72 ? 6 : Math.floor(Math.random() * 6);
  if (t === prev) t = t === 8 ? 7 : 8;
  return t;
};

export const SnowmanButtonsPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [target, setTarget] = useState(() => newTarget());
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = 'Nézd a számot a táblán! Annyi gombot tegyél a hóemberre. A Még egy gombbal teszel fel egyet, az Elveszek gombbal leveszel egyet.';

  const check = () => {
    const ok = count === target;
    let t: string;
    if (ok) {
      t = target === 0 ? `${randomPraise()} Nulla gomb: a hóember most gomb nélkül áll.` : `${randomPraise()} Pont ${target} gomb van a hóemberen.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (count < target) {
      t = 'Kevés gomb van rajta. Tegyél fel még!';
    } else {
      t = 'Túl sok gomb van rajta. Vegyél le egyet!';
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
      <PotyiBubble text="Annyi gomb, amennyi a szám!" say={say} mood="happy" dots={8} />
      <div className="rounded-3xl border-4 border-sky-200 bg-sky-50 p-2">
        <SnowmanScene buttons={count} label={target} />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setCount((c) => Math.min(8, c + 1));
          }}
          className={cn(btn, 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300')}
          aria-label="Tegyél fel egy gombot"
        >
          <svg viewBox="0 0 40 40" className="w-8 h-8">{WINTER.gomb({ x: 20, y: 20, s: 1.2 })}</svg>
          Még egy
        </button>
        <button
          type="button"
          onClick={() => {
            setMsg(null);
            setCount((c) => Math.max(0, c - 1));
          }}
          className={cn(btn, 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-2 border-rose-300')}
          aria-label="Vegyél le egy gombot"
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
SnowmanButtonsPlayground.speechTexts = () => [
  'Nézd a számot a táblán! Annyi gombot tegyél a hóemberre. A Még egy gombbal teszel fel egyet, az Elveszek gombbal leveszel egyet.',
  ...PRAISES.flatMap((p) => [`${p} Nulla gomb: a hóember most gomb nélkül áll.`, ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `${p} Pont ${n} gomb van a hóemberen.`)]),
  'Kevés gomb van rajta. Tegyél fel még!',
  'Túl sok gomb van rajta. Vegyél le egyet!',
];
