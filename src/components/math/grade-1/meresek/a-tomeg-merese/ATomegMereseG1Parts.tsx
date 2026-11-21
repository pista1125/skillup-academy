// „A tömeg mérése” – Játszótér: mérj golyókkal! A bal serpenyőben egy gyümölcs van, a gyerek golyókat tesz a jobb serpenyőbe, amíg a mérleg egyensúlyba nem kerül.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { ITEM_SAY, ItemKind, scale } from './ATomegMereseG1Scenes';

const FRUITS: ItemKind[] = ['alma', 'korte', 'mez', 'tok', 'dinnye', 'eper'];
const az = (w: string) => (/^[aáeéiíoóöőuúüű]/i.test(w) ? 'az' : 'a');
type Task = { k: ItemKind; n: number };
const newTask = (prev?: Task): Task => {
  let t: Task;
  do t = { k: FRUITS[Math.floor(Math.random() * FRUITS.length)], n: 1 + Math.floor(Math.random() * 8) };
  while (prev && t.k === prev.k && t.n === prev.n);
  return t;
};

export const BalancePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [n, setN] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const balanced = n === task.n;
  const tilt: -1 | 0 | 1 = n < task.n ? 1 : n > task.n ? -1 : 0;

  const change = (d: number) => {
    if (balanced && msg?.ok) return;
    const v = Math.max(0, Math.min(10, n + d));
    setN(v);
    if (v === task.n) {
      const t = `${randomPraise()} Egyensúlyban van! ${az(ITEM_SAY[task.k])[0].toUpperCase()}${az(ITEM_SAY[task.k]).slice(1)} ${ITEM_SAY[task.k]} ${task.n} golyó nehéz.`;
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = v < task.n ? 'A bal oldal még lent van, az a nehezebb. Tegyél még golyót!' : 'Most a golyók oldala van lent, az a nehezebb. Vegyél el egyet!';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setN(0);
    setMsg(null);
  };

  const btn = 'flex-1 min-h-[72px] rounded-3xl border-4 bg-white flex items-center justify-center gap-2 active:scale-95 text-xl font-black text-slate-800';
  return (
    <div className="space-y-3">
      <PotyiBubble text="Tedd egyensúlyba a mérleget!" say={`Hány golyó nehéz ${az(ITEM_SAY[task.k])} ${ITEM_SAY[task.k]}? Tegyél golyókat a másik serpenyőbe, amíg a mérleg egyenesen nem áll!`} mood="think" />
      <div className="rounded-3xl border-4 border-sky-200 bg-white p-2 flex justify-center">
        <svg viewBox="0 0 200 150" className="w-full max-w-[380px] h-auto">
          {scale(100, 40, 66, tilt, [{ k: task.k, s: 1 }], { balls: n })}
        </svg>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => change(-1)} className={cn(btn, 'border-slate-300 hover:border-slate-500')}>
          − golyó
        </button>
        <button type="button" onClick={() => change(1)} className={cn(btn, 'border-sky-300 hover:border-sky-500')}>
          <svg viewBox="0 0 20 20" className="w-6 h-6">
            <circle cx="10" cy="10" r="8" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
          </svg>
          + golyó
        </button>
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
BalancePlayground.speechTexts = () => {
  const N = Array.from({ length: 8 }, (_, i) => i + 1);
  return [
    ...FRUITS.map((k) => `Hány golyó nehéz ${az(ITEM_SAY[k])} ${ITEM_SAY[k]}? Tegyél golyókat a másik serpenyőbe, amíg a mérleg egyenesen nem áll!`),
    ...PRAISES.flatMap((p) => FRUITS.flatMap((k) => N.map((n) => `${p} Egyensúlyban van! ${az(ITEM_SAY[k])[0].toUpperCase()}${az(ITEM_SAY[k]).slice(1)} ${ITEM_SAY[k]} ${n} golyó nehéz.`))),
    'A bal oldal még lent van, az a nehezebb. Tegyél még golyót!',
    'Most a golyók oldala van lent, az a nehezebb. Vegyél el egyet!',
  ];
};
