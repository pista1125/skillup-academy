// „Megálló (7)” – Játszótér: Pötyi dobókockája. A szemközti lapokon együtt mindig 7 pötty van: fent ennyi, lent mennyi?
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { Domino } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { DieScene } from './Megallo7G1Scenes';

const newTop = (prev?: number) => {
  let t = 1 + Math.floor(Math.random() * 6);
  if (t === prev) t = (t % 6) + 1;
  return t;
};

export const DicePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [top, setTop] = useState(() => newTop());
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const ok = chosen === 7 - top;
  const say = `A kocka tetején ${top} pötty van. A szemközti, alsó lapon annyi van, hogy együtt hét legyen. Hány pötty van alul?`;

  const pick = (v: number) => {
    if (ok) return;
    setChosen(v);
    let t: string;
    if (v === 7 - top) {
      t = `${randomPraise()} ${top} meg ${v}, az 7.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setMsg({ text: t, ok: true });
    } else {
      t = top + v < 7 ? `${top} meg ${v} még kevés, nem hét. Kell még pötty!` : `${top} meg ${v} több, mint hét. Kevesebb pötty kell!`;
      setMsg({ text: t, ok: false });
    }
    speak(t);
  };
  const next = () => {
    setTop((x) => newTop(x));
    setChosen(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Fent ennyi. Lent mennyi?" say={say} mood="think" dots={7} />
      <DieScene top={top} bottom={ok ? 7 - top : undefined} />
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => pick(v)}
            className={cn('rounded-2xl border-4 bg-white p-1 active:scale-95', ok && v === chosen ? 'border-emerald-500 bg-emerald-100' : 'border-sky-200 hover:border-sky-400')}
            aria-label={`${v} pötty`}
          >
            <Domino left={v} single className="w-full h-auto" />
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
DicePlayground.speechTexts = () => {
  const S = [1, 2, 3, 4, 5, 6];
  return [
    ...S.map((t) => `A kocka tetején ${t} pötty van. A szemközti, alsó lapon annyi van, hogy együtt hét legyen. Hány pötty van alul?`),
    ...PRAISES.flatMap((p) => S.map((t) => `${p} ${t} meg ${7 - t}, az 7.`)),
    ...S.flatMap((t) => S.filter((v) => t + v !== 7).map((v) => (t + v < 7 ? `${t} meg ${v} még kevés, nem hét. Kell még pötty!` : `${t} meg ${v} több, mint hét. Kevesebb pötty kell!`))),
  ];
};
