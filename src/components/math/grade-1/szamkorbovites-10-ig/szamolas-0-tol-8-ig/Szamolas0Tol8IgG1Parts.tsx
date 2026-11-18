// „Számolás 0-tól 8-ig” – Játszótér: Hógolyó-számoló. Összeadás és kivonás 8-ig korongképpel, a gyerek a számra koppint.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { TenFrame } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';

type Task = { a: number; b: number; op: '+' | '−' };

const newTask = (prev?: Task): Task => {
  for (;;) {
    const op: Task['op'] = Math.random() < 0.5 ? '+' : '−';
    let a: number;
    let b: number;
    if (op === '+') {
      const sum = 3 + Math.floor(Math.random() * 6); // 3–8
      a = Math.floor(Math.random() * (sum + 1));
      b = sum - a;
    } else {
      a = 3 + Math.floor(Math.random() * 6); // 3–8
      b = Math.floor(Math.random() * (a + 1));
    }
    if (!prev || prev.a !== a || prev.b !== b || prev.op !== op) return { a, b, op };
  }
};

const result = (t: Task) => (t.op === '+' ? t.a + t.b : t.a - t.b);

export const SnowballCalcPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [picked, setPicked] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const r = result(task);
  const eq = `${task.a} ${task.op} ${task.b} = ?`;
  const say =
    task.op === '+'
      ? `Nézd a korongokat! ${task.a} piros és ${task.b} kék. Mennyi ${task.a} meg ${task.b}? Koppints a jó számra!`
      : `Nézd a korongokat! ${task.a} korongból ${task.b} át van húzva. Mennyi ${task.a} elvéve ${task.b}? Koppints a jó számra!`;

  const choose = (v: number) => {
    setPicked(v);
    const ok = v === r;
    let t: string;
    if (ok) {
      t = `${randomPraise()} ${task.a} ${task.op === '+' ? 'meg' : 'elvéve'} ${task.b} az ${r}.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (task.op === '+') {
      t = 'Még nem jó. Számold meg az összes korongot, a pirosakat és a kékeket is!';
    } else {
      t = 'Még nem jó. Csak azokat számold, amelyek nincsenek áthúzva!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTask((p) => newTask(p));
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Számold ki!" say={say} mood="think" dots={8} />
      <div className="rounded-3xl border-4 border-sky-200 bg-sky-50 p-3 space-y-2">
        {task.op === '+' ? <TenFrame n={task.a} second={task.b} /> : <TenFrame n={task.a} crossed={task.b} />}
        <EqCard text={eq} className="w-full max-w-[320px] h-auto mx-auto" />
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
        {Array.from({ length: 9 }, (_, v) => (
          <button
            key={v}
            type="button"
            onClick={() => choose(v)}
            className={cn(
              'h-16 rounded-2xl border-4 text-3xl font-black transition active:scale-95',
              picked === v && msg?.ok && 'bg-emerald-100 border-emerald-500',
              picked === v && msg && !msg.ok && 'bg-rose-100 border-rose-400',
              picked !== v && 'bg-white border-sky-300 hover:border-sky-500'
            )}
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
