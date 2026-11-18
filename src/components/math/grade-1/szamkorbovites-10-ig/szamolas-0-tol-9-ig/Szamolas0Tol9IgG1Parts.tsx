// „Számolás 0-tól 9-ig” – Játszótér: Süti-számoló. A tálca képéről összeadás vagy kivonás (9-ig), a választ a számgombokkal adja meg a gyerek.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { TrayScene } from './Szamolas0Tol9IgG1Scenes';

type Task = { plus: boolean; a: number; b: number };

const newTask = (prev?: Task): Task => {
  for (;;) {
    const plus = Math.random() < 0.5;
    let t: Task;
    if (plus) {
      const a = 1 + Math.floor(Math.random() * 8); // 1–8
      const b = 1 + Math.floor(Math.random() * (9 - a)); // a + b ≤ 9
      t = { plus, a, b };
    } else {
      const a = 4 + Math.floor(Math.random() * 6); // 4–9
      const b = 1 + Math.floor(Math.random() * a); // 1–a
      t = { plus, a, b };
    }
    if (!prev || prev.a !== t.a || prev.b !== t.b || prev.plus !== t.plus) return t;
  }
};

export const CookieCalcPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [picked, setPicked] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const result = task.plus ? task.a + task.b : task.a - task.b;
  const eq = `${task.a} ${task.plus ? '+' : '−'} ${task.b} = □`;
  const say = task.plus
    ? `A tálcán ${task.a} csillag és ${task.b} szív alakú süti van. Hány süti van összesen? ${task.a} + ${task.b} = ?`
    : `A tálcán ${task.a} süti volt. ${task.b} sütit megettek, ezeket áthúztuk. Hány maradt? ${task.a} − ${task.b} = ?`;

  const choose = (v: number) => {
    setPicked(v);
    const ok = v === result;
    const t = ok
      ? `${randomPraise()} ${task.a} ${task.plus ? '+' : '−'} ${task.b} = ${result}.`
      : task.plus
        ? 'Nem egészen. Számold meg a csillagokat, aztán számolj tovább a szívekkel!'
        : 'Nem egészen. Csak azokat a sütiket számold, amelyek nincsenek áthúzva!';
    setMsg({ text: t, ok });
    speak(t);
    if (ok) confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };
  const next = () => {
    setTask((p) => newTask(p));
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={task.plus ? 'Hány süti van összesen?' : 'Hány süti maradt?'} say={say} mood="think" dots={9} />
      <div className="rounded-3xl border-4 border-amber-200 bg-amber-50 p-2 space-y-2">
        {task.plus ? <TrayScene a={task.a} b={task.b} /> : <TrayScene a={task.a} crossed={task.b} />}
        <EqCard text={eq} filled={picked !== null ? { at: 0, value: picked, ok: picked === result } : undefined} />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, v) => (
          <button
            key={v}
            type="button"
            onClick={() => choose(v)}
            className={cn(
              'h-14 rounded-2xl border-4 text-3xl font-black active:scale-95',
              picked === v ? (v === result ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-400') : 'bg-white border-sky-200 hover:border-sky-400'
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
