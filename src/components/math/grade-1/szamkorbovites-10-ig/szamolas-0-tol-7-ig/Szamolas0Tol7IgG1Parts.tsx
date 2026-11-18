// „Számolás 0-tól 7-ig” – Játszótér: Eperpiknik. Véletlen összeadás vagy elvétel 7-ig, képpel; a gyerek a számra koppint.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { OpScene } from '../a-het/AHetG1Scenes';

const ACC = ['nullát', 'egyet', 'kettőt', 'hármat', 'négyet', 'ötöt', 'hatot', 'hetet'];

type Task = { a: number; b: number; op: '+' | '−' };

const newTask = (prev?: Task): Task => {
  for (let i = 0; i < 20; i++) {
    const op: '+' | '−' = Math.random() < 0.5 ? '+' : '−';
    let t: Task;
    if (op === '+') {
      const sum = 4 + Math.floor(Math.random() * 4); // 4–7
      const a = 1 + Math.floor(Math.random() * (sum - 1));
      t = { a, b: sum - a, op };
    } else {
      const a = 4 + Math.floor(Math.random() * 4); // 4–7
      const b = 1 + Math.floor(Math.random() * (a - 1));
      t = { a, b, op };
    }
    if (!prev || t.a !== prev.a || t.b !== prev.b || t.op !== prev.op) return t;
  }
  return { a: 5, b: 2, op: '+' };
};

export const PicnicPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const res = task.op === '+' ? task.a + task.b : task.a - task.b;
  const say =
    task.op === '+'
      ? `Pötyinek ${task.a} epre van. Zümi hoz még ${ACC[task.b]}. Hány eper lesz összesen?`
      : `Pötyinek ${task.a} epre van. Csigusz megeszik ${ACC[task.b]}. Hány marad?`;

  const pick = (v: number) => {
    let t: string;
    const ok = v === res;
    if (ok) {
      t = `${randomPraise()} ${task.a} ${task.op === '+' ? 'meg' : 'elvéve'} ${task.b}, az ${res}.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (task.op === '+') {
      t = v < res ? 'Kevés. Számold meg az összes epret együtt!' : 'Sok. Számold meg újra az epreket!';
    } else {
      t = v < res ? 'Kevés. Csak az áthúzottak tűntek el!' : 'Sok. Az áthúzott epreket ne számold!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTask((t) => newTask(t));
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={task.op === '+' ? 'Hány lesz összesen?' : 'Hány marad?'} say={say} mood="happy" dots={7} />
      <div className="rounded-3xl border-4 border-rose-200 bg-rose-50 p-2">
        <OpScene icon="eper" a={task.a} b={task.b} op={task.op} />
        <p className="text-center text-3xl font-black text-slate-800">
          {task.a} {task.op} {task.b} = ?
        </p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {Array.from({ length: 8 }, (_, v) => (
          <button
            key={v}
            type="button"
            onClick={() => pick(v)}
            className={cn('h-16 rounded-2xl border-4 bg-white text-3xl font-black active:scale-95', msg?.ok && v === res ? 'border-emerald-500 bg-emerald-100' : 'border-sky-200 hover:border-sky-400')}
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
