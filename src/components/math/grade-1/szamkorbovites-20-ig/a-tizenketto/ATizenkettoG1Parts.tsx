// „A tizenkettő” – Játszótér: Területfoglaló. Két kockával dobunk, összeadjuk a pöttyöket, és Pötyi-korongot teszünk a jó számra (2–12).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { DiceScene } from './ATizenkettoG1Scenes';

const NUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const roll = () => [1 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 6)] as const;

export const DiceBoardPlayground: React.FC = () => {
  const [dice, setDice] = useState<readonly [number, number]>(() => roll());
  const [taken, setTaken] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const sum = dice[0] + dice[1];
  const say = `Pötyi dobott: ${dice[0]} és ${dice[1]}. Mennyi ${dice[0]} meg ${dice[1]}? Koppints arra a számra!`;

  const tap = (v: number) => {
    if (done) return;
    let t: string;
    if (v === sum) {
      const already = taken.includes(v);
      t = already ? `Igen, ${sum}! Ez a kör már foglalt. Kérj új feladatot!` : `${randomPraise()} ${dice[0]} meg ${dice[1]} egyenlő ${sum}. Pötyi korongot tett erre a körre.`;
      if (!already) {
        setTaken((x) => [...x, v]);
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      }
      setDone(true);
      setMsg({ text: t, ok: true });
    } else {
      t = v < sum ? 'Ez kevés. Számold meg mindkét kockát!' : 'Ez sok. Számold meg újra a pöttyöket!';
      setMsg({ text: t, ok: false });
    }
    speak(t);
  };
  const next = () => {
    setDice(roll());
    setDone(false);
    setMsg(null);
  };
  const reset = () => {
    setTaken([]);
    next();
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Mennyi a két kocka együtt?" say={say} mood="think" dots={10} />
      <DiceScene a={dice[0]} b={dice[1]} />
      <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
        {NUMS.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => tap(v)}
            className={cn(
              'h-14 rounded-full border-4 text-2xl font-black transition active:scale-95',
              taken.includes(v) ? 'bg-rose-500 border-rose-700 text-white' : 'bg-white border-sky-300 text-slate-800 hover:bg-sky-50'
            )}
            aria-label={`${v}`}
          >
            {v}
          </button>
        ))}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={next} className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
        <button type="button" onClick={reset} className="h-14 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-black border-2 border-slate-300">
          Tiszta tábla
        </button>
      </div>
      <p className="text-center text-sm text-slate-500">{taken.length} / {NUMS.length} kör foglalt</p>
    </div>
  );
};
