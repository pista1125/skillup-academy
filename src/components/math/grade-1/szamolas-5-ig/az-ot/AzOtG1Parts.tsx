// „Az öt” – Játszótér: Legyen 5 tök a talicskában! (a talicskában már van néhány, a gyerek pótolja 5-re)
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { pumpkin } from '../a-negy/ANegyG1Scenes';

const Pumpkin: React.FC = () => <svg viewBox="0 0 60 60" className="w-full h-full">{pumpkin(30, 32, 1.3)}</svg>;

const newStart = (prev?: number) => {
  let s = Math.floor(Math.random() * 5); // 0–4
  if (s === prev) s = (s + 2) % 5;
  return s;
};

export const WheelbarrowPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [start, setStart] = useState(() => newStart());
  const [count, setCount] = useState(start);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = `A talicskában ${start === 0 ? 'még egy tök sincs' : `már ${start} tök van`}. Koppints a tökökre a halomban, hogy pontosan 5 legyen a talicskában!`;

  const add = () => {
    setMsg(null);
    setCount((c) => Math.min(7, c + 1));
  };
  const remove = () => {
    setMsg(null);
    setCount((c) => Math.max(0, c - 1));
  };
  const check = () => {
    let t: string;
    const ok = count === 5;
    if (ok) {
      t = `${randomPraise()} Öt tök van a talicskában. ${start === 5 ? '' : `${start} volt benne, és ${5 - start} kellett még.`}`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (count < 5) {
      t = 'Még nincs öt. Tegyél bele még!';
    } else {
      t = 'Ez több, mint öt. Koppints egy tökre a talicskában, hogy kivedd!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    const s = newStart(start);
    setStart(s);
    setCount(s);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Legyen 5 tök a talicskában!" say={say} mood="happy" dots={5} />
      <div className="rounded-3xl border-4 border-slate-300 bg-slate-100 min-h-[110px] p-2 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xl font-black text-slate-600 mr-1">Talicska:</span>
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" onClick={remove} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-4 border-orange-200 hover:border-rose-300 active:scale-95" aria-label="Kiveszem">
            <Pumpkin />
          </button>
        ))}
        {count === 0 && <span className="text-xl font-black text-slate-500">üres</span>}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xl font-black text-emerald-700">Halom:</span>
        {Array.from({ length: 4 }, (_, i) => (
          <button key={i} type="button" onClick={add} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border-4 border-emerald-300 hover:border-emerald-500 active:scale-95" aria-label="Beteszek egy tököt">
            <Pumpkin />
          </button>
        ))}
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
WheelbarrowPlayground.speechTexts = () => [
  'Még nincs öt. Tegyél bele még!',
  'Ez több, mint öt. Koppints egy tökre a talicskában, hogy kivedd!',
  ...[0, 1, 2, 3, 4].flatMap((start) => [
    `A talicskában ${start === 0 ? 'még egy tök sincs' : `már ${start} tök van`}. Koppints a tökökre a halomban, hogy pontosan 5 legyen a talicskában!`,
    ...PRAISES.map((p) => `${p} Öt tök van a talicskában. ${start === 5 ? '' : `${start} volt benne, és ${5 - start} kellett még.`}`),
  ]),
];
