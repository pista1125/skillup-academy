// „Számlálások” – Játszótér: koppints mindegyikre, számold meg, és válaszd ki a jó pöttykártyát!
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { DotCard, NUM_WORD, Thing, drawThing } from './SzamlalasokG1Scenes';

const KINDS: Thing[] = ['alma', 'korte', 'eper', 'labda', 'csillag', 'hal', 'szilva'];

const newTask = (prevN?: number) => {
  let n = 1 + Math.floor(Math.random() * 6);
  if (n === prevN) n = (n % 6) + 1;
  const kind = KINDS[Math.floor(Math.random() * KINDS.length)];
  const set = new Set<number>([n]);
  while (set.size < 3) {
    const d = n + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2));
    if (d >= 1 && d <= 6) set.add(d);
  }
  return { n, kind, opts: [...set].sort(() => Math.random() - 0.5) };
};

export const CountPlayground: React.FC = () => {
  const [task, setTask] = useState(() => newTask());
  const [counted, setCounted] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const tapThing = (i: number) => {
    if (counted.includes(i)) return;
    const next = [...counted, i];
    setCounted(next);
    speak(NUM_WORD[next.length]);
  };
  const pick = (k: number) => {
    setPicked(k);
    if (k === task.n) {
      const t = `${randomPraise()} Ugyanannyi pötty van a kártyán, ahány tárgyat számoltál.`;
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = k > task.n ? 'Ezen több pötty van. Számold meg újra a tárgyakat!' : 'Ezen kevesebb pötty van. Számold meg újra a tárgyakat!';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t.n));
    setCounted([]);
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Koppints mindegyikre, és számolj!" say="Koppints mindegyik tárgyra egyszer, és számolj velem! Aztán keresd meg a kártyát, amelyiken ugyanannyi pötty van." mood="happy" />
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: task.n }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tapThing(i)}
            className={cn('aspect-square rounded-2xl border-4 flex items-center justify-center active:scale-95', counted.includes(i) ? 'border-emerald-400 bg-emerald-50' : 'border-sky-200 bg-white hover:border-sky-400')}
            aria-label={`${i + 1}. tárgy`}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              {drawThing(task.kind, 30, 30, 1.2)}
              {counted.includes(i) && <path d="M40 46 L46 52 L56 40" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />}
            </svg>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-[360px] mx-auto">
        {task.opts.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => pick(k)}
            className={cn('rounded-2xl border-4 p-1 bg-white active:scale-95', picked === k ? (k === task.n ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-sky-200 hover:border-sky-400')}
            aria-label={`${NUM_WORD[k]} pötty`}
          >
            <DotCard n={k} className="w-full h-auto" />
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
