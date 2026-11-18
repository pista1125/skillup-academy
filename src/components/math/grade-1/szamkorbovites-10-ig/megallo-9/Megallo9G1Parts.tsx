// „Megálló (9)” – Játszótér: Levélhordó. A levélen egy művelet áll (9-ig); abba a postaládába kell vinni, amelyiken az eredmény van.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { MailboxesScene } from './Megallo9G1Scenes';

type Task = { text: string; result: number; boxes: number[] };

const rnd = (n: number) => Math.floor(Math.random() * n);

const newTask = (prev?: Task): Task => {
  for (;;) {
    let text: string;
    let result: number;
    const kind = rnd(3);
    if (kind === 0) {
      const a = 1 + rnd(8);
      const b = 1 + rnd(9 - a);
      text = `${a} + ${b}`;
      result = a + b;
    } else if (kind === 1) {
      const a = 3 + rnd(7);
      const b = 1 + rnd(a);
      text = `${a} − ${b}`;
      result = a - b;
    } else {
      const a = 1 + rnd(4);
      const b = 1 + rnd(4);
      const c = 1 + rnd(Math.max(1, 9 - a - b));
      text = `${a} + ${b} + ${c}`;
      result = a + b + c;
    }
    if (result > 9 || (prev && prev.text === text)) continue;
    const set = new Set<number>([result]);
    while (set.size < 4) {
      const d = result + (rnd(2) ? 1 : -1) * (1 + rnd(3));
      if (d >= 0 && d <= 9) set.add(d);
    }
    const boxes = [...set].sort((x, y) => x - y);
    return { text, result, boxes };
  }
};

export const LetterPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [marks, setMarks] = useState<Record<number, 'ok' | 'bad'>>({});
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = `A levélen ez áll: ${task.text}. Számold ki, és vidd a levelet abba a postaládába, amelyiken az eredmény van!`;

  const pick = (i: number) => {
    const v = task.boxes[i];
    const ok = v === task.result;
    setMarks((m) => ({ ...m, [i]: ok ? 'ok' : 'bad' }));
    const t = ok ? `${randomPraise()} ${task.text} = ${task.result}. Megérkezett a levél!` : `Ezen a ládán ${v} áll. Számold ki újra: ${task.text}!`;
    setMsg({ text: t, ok });
    speak(t);
    if (ok) confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };
  const next = () => {
    setTask((p) => newTask(p));
    setMarks({});
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Melyik ládába megy a levél?" say={say} mood="think" dots={9} />
      <div className="rounded-3xl border-4 border-amber-200 bg-amber-50 p-2 space-y-2">
        <EqCard text={`${task.text} = ?`} />
        <MailboxesScene numbers={task.boxes} onBox={pick} marks={marks} />
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
