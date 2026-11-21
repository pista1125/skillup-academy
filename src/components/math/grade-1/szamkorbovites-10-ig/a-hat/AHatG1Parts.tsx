// „A hat” – Játszótér: Pötyi pöttyei. Rakj Pötyi hátára annyi pöttyöt, amennyit a kártya mutat (0–6, leggyakrabban 6).
// `mode="op"` esetén a kártyán művelet áll (pl. 6 − 2), a pöttyök száma az eredmény (a Megálló használja).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { Potyi } from '../../shared/Potyi';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';

type Task = { label: string; target: number; start: number };

const newDigitTask = (prev?: Task): Task => {
  const r = Math.random();
  let target = r < 0.5 ? 6 : 2 + Math.floor(Math.random() * 4);
  if (prev && target === prev.target && target !== 6) target = 6;
  let start = Math.floor(Math.random() * 7);
  if (start === target) start = (start + 2) % 7;
  return { label: String(target), target, start };
};

const newOpTask = (prev?: Task): Task => {
  let t: Task;
  do {
    if (Math.random() < 0.5) {
      const a = 1 + Math.floor(Math.random() * 6);
      const b = Math.floor(Math.random() * (7 - a));
      t = { label: `${a} + ${b}`, target: a + b, start: 0 };
    } else {
      const a = 2 + Math.floor(Math.random() * 5);
      const b = Math.floor(Math.random() * a);
      t = { label: `${a} − ${b}`, target: a - b, start: 0 };
    }
  } while (prev && t.label === prev.label);
  return t;
};

export const PotyiDotsPlayground: React.FC<{ mode?: 'digit' | 'op' }> & { speechTexts?: () => string[] } = ({ mode = 'digit' }) => {
  const gen = mode === 'op' ? newOpTask : newDigitTask;
  const [task, setTask] = useState<Task>(() => gen());
  const [count, setCount] = useState(task.start);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say =
    mode === 'op'
      ? `Számold ki: ${task.label}! Annyi pötty legyen Pötyi hátán, amennyi az eredmény.`
      : `Nézd a kártyát! ${task.target} pötty legyen Pötyi hátán. Tegyél rá, vagy vegyél el!`;

  const check = () => {
    const ok = count === task.target;
    let t: string;
    if (ok) {
      t = mode === 'op' ? `${randomPraise()} ${task.label} = ${task.target}.` : `${randomPraise()} Pötyi hátán ${task.target} pötty van.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (count < task.target) {
      t = 'Ez még kevés. Tegyél rá még pöttyöt!';
    } else {
      t = 'Ez túl sok. Vegyél el egy pöttyöt!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    const t = gen(task);
    setTask(t);
    setCount(t.start);
    setMsg(null);
  };
  const change = (d: number) => {
    setMsg(null);
    setCount((c) => Math.max(0, Math.min(6, c + d)));
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={mode === 'op' ? 'Számolj, és rakd ki!' : 'Annyi pötty legyen!'} say={say} mood="happy" dots={6} />
      <div className="flex items-center justify-center gap-4">
        <div className="min-w-[96px] h-24 px-4 rounded-3xl border-4 border-violet-400 bg-white flex items-center justify-center text-5xl font-black text-violet-700 whitespace-nowrap">{task.label}</div>
        <Potyi dots={count} mood={msg?.ok ? 'cheer' : 'happy'} className="w-40 h-40" />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => change(1)}
          disabled={count >= 6}
          className="h-14 px-5 rounded-full bg-amber-100 hover:bg-amber-200 disabled:opacity-40 text-amber-900 text-xl font-black border-2 border-amber-300 flex items-center gap-2"
          aria-label="Tegyél rá egy pöttyöt"
        >
          <span className="w-6 h-6 rounded-full bg-slate-900 inline-block" /> Még egy
        </button>
        <button
          type="button"
          onClick={() => change(-1)}
          disabled={count <= 0}
          className="h-14 px-5 rounded-full bg-rose-100 hover:bg-rose-200 disabled:opacity-40 text-rose-900 text-xl font-black border-2 border-rose-300"
          aria-label="Vegyél el egy pöttyöt"
        >
          Vegyél el
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

/** Az adott mód minden lehetséges feladat-címkéje és eredménye. */
const allOpTasks = (): Task[] => {
  const out: Task[] = [];
  for (let a = 1; a <= 6; a++) for (let b = 0; b < 7 - a; b++) out.push({ label: `${a} + ${b}`, target: a + b, start: 0 });
  for (let a = 2; a <= 6; a++) for (let b = 0; b < a; b++) out.push({ label: `${a} − ${b}`, target: a - b, start: 0 });
  return out;
};

/** Minden mondat, amit a játszótér az adott módban mondhat – a hanggeneráláshoz (scripts/tts). */
export const potyiDotsSpeechTexts = (mode: 'digit' | 'op'): string[] => {
  const common = ['Ez még kevés. Tegyél rá még pöttyöt!', 'Ez túl sok. Vegyél el egy pöttyöt!'];
  if (mode === 'op') {
    const tasks = allOpTasks();
    return [
      ...tasks.map((t) => `Számold ki: ${t.label}! Annyi pötty legyen Pötyi hátán, amennyi az eredmény.`),
      ...PRAISES.flatMap((p) => tasks.map((t) => `${p} ${t.label} = ${t.target}.`)),
      ...common,
    ];
  }
  const targets = [2, 3, 4, 5, 6];
  return [
    ...targets.map((n) => `Nézd a kártyát! ${n} pötty legyen Pötyi hátán. Tegyél rá, vagy vegyél el!`),
    ...PRAISES.flatMap((p) => targets.map((n) => `${p} Pötyi hátán ${n} pötty van.`)),
    ...common,
  ];
};
PotyiDotsPlayground.speechTexts = () => potyiDotsSpeechTexts('digit');
