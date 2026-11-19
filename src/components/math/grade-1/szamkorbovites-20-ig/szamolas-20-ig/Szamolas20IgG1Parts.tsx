// „Számolás 20-ig” – Játszótér: Lufik az ünnepre! Vegyes feladatok 20-ig (összeadás, kivonás, a tízen át is, kiegészítés 20-ra);
// minden jó válasz egy lufi a füzérre, 10 lufinál kezdődhet az ünnep.
import React, { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { ExprScene, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';

type Task = { kind: 'add' | 'sub' | 'fill'; a: number; b: number; answer: number };

const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));

const newTask = (): Task => {
  const r = Math.random();
  if (r < 0.4) {
    // összeadás: fele tízen át (pl. 8 + 6), fele tízes + egyesek (pl. 13 + 4)
    if (Math.random() < 0.5) {
      const a = rnd(5, 9);
      const b = rnd(11 - a, 9);
      return { kind: 'add', a, b, answer: a + b };
    }
    const a = rnd(10, 16);
    const b = rnd(1, 19 - a);
    return { kind: 'add', a, b, answer: a + b };
  }
  if (r < 0.8) {
    // kivonás: fele tízen át (pl. 14 − 6), fele a tízes fölött marad (pl. 17 − 4)
    if (Math.random() < 0.5) {
      const a = rnd(11, 18);
      const b = rnd(a - 9, 9);
      return { kind: 'sub', a, b, answer: a - b };
    }
    const a = rnd(12, 19);
    const b = rnd(1, a - 10);
    return { kind: 'sub', a, b, answer: a - b };
  }
  const a = rnd(11, 18);
  return { kind: 'fill', a, b: 20 - a, answer: 20 - a };
};

const options = (t: Task) => {
  const set = new Set<number>([t.answer]);
  for (const d of [1, -1, 2, -2, 10]) {
    const v = t.answer + d;
    if (set.size < 3 && v >= 0 && v <= 20) set.add(v);
  }
  return shuffle([...set]);
};

const HOZ: Record<number, string> = { 11: '-hez', 12: '-höz', 13: '-hoz', 14: '-hez', 15: '-höz', 16: '-hoz', 17: '-hez', 18: '-hoz' };

const textOf = (t: Task) => (t.kind === 'add' ? `${t.a} + ${t.b} = ?` : t.kind === 'sub' ? `${t.a} − ${t.b} = ?` : `${t.a} + □ = 20`);
const sayOf = (t: Task) =>
  t.kind === 'add'
    ? `${t.a} meg ${t.b}, az mennyi?`
    : t.kind === 'sub'
      ? `${t.a} elvéve ${t.b}, az mennyi?`
      : `Hány kell a ${t.a}${HOZ[t.a] ?? '-hoz'}, hogy 20 legyen?`;
const hintOf = (t: Task) => {
  if (t.kind === 'fill') return 'Számold meg az üres helyeket a keretekben!';
  if (t.kind === 'add') return t.a < 10 ? 'Előbb töltsd meg az első keretet, az 10. Aztán számolj tovább!' : 'Az egyesekhez add hozzá, a tízes marad!';
  return t.a - t.b < 10 ? 'Előbb vegyél el annyit, hogy 10 maradjon. Aztán vegyél el még!' : 'Az egyesekből vegyél el, a tízes marad!';
};

const GOAL = 10;
const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f97316', '#ec4899', '#a855f7'];

export const BalloonPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [balloons, setBalloons] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [solved, setSolved] = useState(false);
  const opts = useMemo(() => options(task), [task]);
  const say = 'Oldd meg a feladatot! Minden jó válaszért egy lufi kerül a füzérre. Ha 10 lufi lesz, kezdődhet az ünnep!';

  const pick = (v: number) => {
    if (solved) return;
    if (v === task.answer) {
      const nb = Math.min(GOAL, balloons + 1);
      setBalloons(nb);
      setSolved(true);
      const t = nb === GOAL ? `${randomPraise()} Itt a 10 lufi, kezdődhet az ünnep!` : `${randomPraise()} Az eredmény ${task.answer}. Kaptál egy lufit!`;
      if (nb === GOAL) confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      setMsg({ text: t, ok: true });
      speak(t);
    } else {
      const t = hintOf(task);
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    if (balloons >= GOAL) setBalloons(0);
    setTask(newTask());
    setSolved(false);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Lufik az ünnepre!" say={say} mood="happy" dots={7} />
      <div className="rounded-3xl border-4 border-lime-200 bg-lime-50 p-3 space-y-3">
        <svg viewBox="0 0 480 70" className="w-full max-w-[460px] h-auto mx-auto" aria-label={`${balloons} lufi`}>
          <path d="M10 14 Q240 44 470 14" fill="none" stroke="#78350f" strokeWidth="3" />
          {Array.from({ length: GOAL }, (_, i) => {
            const x = 34 + i * 45.8;
            const t = (x / 480) * 2 - 1;
            const y = 14 + 30 * (1 - t * t);
            return i < balloons ? (
              <ellipse key={i} cx={x} cy={y + 12} rx="15" ry="18" fill={COLORS[i % COLORS.length]} stroke="#1f2937" strokeWidth="2.5" />
            ) : (
              <ellipse key={i} cx={x} cy={y + 12} rx="15" ry="18" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeDasharray="4 4" />
            );
          })}
        </svg>
        <button type="button" className="block w-full" onClick={() => speak(sayOf(task))} aria-label="Hallgasd meg a feladatot">
          <ExprScene text={textOf(task)} />
        </button>
        {task.kind === 'add' && <TwoFrames a={task.a} b={task.b} />}
        {task.kind === 'sub' && <TwoFrames a={task.a} crossed={task.b} />}
        {task.kind === 'fill' && <TwoFrames a={task.a} />}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        {opts.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => pick(v)}
            className={cn(
              'w-20 h-20 rounded-3xl text-4xl font-black border-4 shadow',
              solved && v === task.answer ? 'bg-emerald-100 border-emerald-400 text-emerald-800' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            )}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={next} className="h-14 px-6 rounded-full text-xl font-black bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};
