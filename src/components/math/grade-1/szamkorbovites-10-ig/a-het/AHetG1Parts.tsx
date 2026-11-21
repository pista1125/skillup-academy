// „A hét” – Játszótér: Pöttyözd ki Pötyit! Annyi pötty legyen a hátán, amennyit a szám mutat (4–7, leggyakrabban 7).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { Potyi } from '../../shared/Potyi';
import { BigSign } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';

const newTask = (prevTarget?: number) => {
  const r = Math.random();
  let target = r < 0.5 ? 7 : r < 0.7 ? 6 : r < 0.85 ? 5 : 4;
  if (target === prevTarget && target !== 7) target = 7;
  let start = Math.floor(Math.random() * 4);
  if (start === target) start = 0;
  return { target, start };
};

export const SevenDotsPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [dots, setDots] = useState(task.start);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = `Pötyi elvesztette a pöttyeit! Annyi pötty legyen a hátán, amennyit a szám mutat: ${task.target}. Tegyél rá, vagy vegyél le!`;

  const change = (d: number) => {
    setMsg(null);
    setDots((x) => Math.max(0, Math.min(7, x + d)));
  };
  const check = () => {
    let t: string;
    const ok = dots === task.target;
    if (ok) {
      t = `${randomPraise()} Pötyinek most ${task.target} pöttye van.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (dots < task.target) {
      t = 'Még kevés a pötty. Tegyél rá még!';
    } else {
      t = 'Ez túl sok pötty. Vegyél le egyet!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    const t = newTask(task.target);
    setTask(t);
    setDots(t.start);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Hány pötty kell?" say={say} mood="think" dots={dots} />
      <div className="flex items-center justify-center gap-4">
        <BigSign text={task.target} className="w-24 h-24" color="#be123c" />
        <Potyi dots={dots} mood={msg?.ok ? 'cheer' : 'happy'} className="w-44 h-44" />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => change(1)} className="h-14 px-5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 text-xl font-black border-2 border-rose-300" aria-label="Tegyél rá egy pöttyöt">
          ● Még egy
        </button>
        <button type="button" onClick={() => change(-1)} className="h-14 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-black border-2 border-slate-300" aria-label="Vegyél le egy pöttyöt">
          ○ Le egyet
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
SevenDotsPlayground.speechTexts = () => {
  const T = [4, 5, 6, 7];
  return [
    ...T.map((n) => `Pötyi elvesztette a pöttyeit! Annyi pötty legyen a hátán, amennyit a szám mutat: ${n}. Tegyél rá, vagy vegyél le!`),
    ...PRAISES.flatMap((p) => T.map((n) => `${p} Pötyinek most ${n} pöttye van.`)),
    'Még kevés a pötty. Tegyél rá még!',
    'Ez túl sok pötty. Vegyél le egyet!',
  ];
};
