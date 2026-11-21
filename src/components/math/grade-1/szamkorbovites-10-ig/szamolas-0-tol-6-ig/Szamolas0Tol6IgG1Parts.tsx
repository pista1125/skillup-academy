// „Számolás 0-tól 6-ig” – Játszótér: Korongfordító. 3–6 korong; koppintásra piros ↔ kék. Legyen annyi kék, amennyit Pötyi kér!
// Alatta élőben látszik az összeadás (pl. 4 + 2 = 6).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';

type Task = { total: number; blue: number };

const newTask = (prev?: Task): Task => {
  let t: Task;
  do {
    const total = Math.random() < 0.5 ? 6 : 3 + Math.floor(Math.random() * 3);
    t = { total, blue: 1 + Math.floor(Math.random() * (total - 1)) };
  } while (prev && prev.total === t.total && prev.blue === t.blue);
  return t;
};

export const DiskFlipPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [blue, setBlue] = useState<boolean[]>(() => Array(task.total).fill(false));
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const nBlue = blue.filter(Boolean).length;
  const nRed = task.total - nBlue;
  const ask = `Fordíts meg ${task.blue} korongot, hogy kék legyen!`;

  const flip = (i: number) => {
    setMsg(null);
    setBlue((b) => b.map((v, k) => (k === i ? !v : v)));
  };
  const check = () => {
    let t: string;
    const ok = nBlue === task.blue;
    if (ok) {
      t = `${randomPraise()} ${nRed} piros meg ${nBlue} kék, az ${task.total}. ${nRed} + ${nBlue} = ${task.total}.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (nBlue < task.blue) {
      t = 'Még kevés a kék. Fordíts meg még egyet!';
    } else {
      t = 'Túl sok a kék. Fordíts vissza egyet pirosra!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    const t = newTask(task);
    setTask(t);
    setBlue(Array(t.total).fill(false));
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={`Legyen ${task.blue} kék!`} say={ask + ' Koppints a korongra, és megfordul.'} mood="happy" dots={6} />
      <div className="flex flex-wrap justify-center gap-3">
        {blue.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => flip(i)}
            className={cn('w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-slate-900 shadow active:scale-95 transition', b ? 'bg-blue-500' : 'bg-red-500')}
            aria-label={b ? 'kék korong' : 'piros korong'}
          />
        ))}
      </div>
      <p className="text-center text-4xl font-black text-slate-800 dark:text-slate-100">
        <span className="text-red-600">{nRed}</span> + <span className="text-blue-600">{nBlue}</span> = {task.total}
      </p>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
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
DiskFlipPlayground.speechTexts = () => {
  const tasks: Task[] = [];
  for (let total = 3; total <= 6; total++) for (let blue = 1; blue < total; blue++) tasks.push({ total, blue });
  const blues = [1, 2, 3, 4, 5];
  return [
    ...blues.map((b) => `Fordíts meg ${b} korongot, hogy kék legyen! Koppints a korongra, és megfordul.`),
    ...PRAISES.flatMap((p) => tasks.map((t) => `${p} ${t.total - t.blue} piros meg ${t.blue} kék, az ${t.total}. ${t.total - t.blue} + ${t.blue} = ${t.total}.`)),
    'Még kevés a kék. Fordíts meg még egyet!',
    'Túl sok a kék. Fordíts vissza egyet pirosra!',
  ];
};
