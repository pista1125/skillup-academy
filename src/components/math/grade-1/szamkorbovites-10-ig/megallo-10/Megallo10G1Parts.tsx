// „Megálló” – Játszótér: Töltsd meg a kincsesládát! Minden jó válaszért egy drágakő kerül a ládába (10 kell).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { TenFrame } from '../../shared/G1Pics';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { TreasureScene } from './Megallo10G1Scenes';

interface Task {
  text: string;
  say: string;
  answer: number;
  frame?: { n: number; second?: number; crossed?: number };
}

/** névelő a szám elé: az 1, az 5, a többi elé a */
const art = (n: number) => (n === 1 || n === 5 ? 'az' : 'a');

const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));

const makeTask = (): Task => {
  const t = rnd(0, 4);
  if (t === 0) {
    const a = rnd(1, 9);
    const b = rnd(1, 10 - a);
    return { text: `${a} + ${b} = ?`, say: `Mennyi ${a} + ${b}?`, answer: a + b, frame: { n: a, second: b } };
  }
  if (t === 1) {
    const a = rnd(2, 10);
    const b = rnd(1, a - 1);
    return { text: `${a} − ${b} = ?`, say: `Mennyi ${a} − ${b}?`, answer: a - b, frame: { n: a, crossed: b } };
  }
  if (t === 2) {
    const c = rnd(3, 10);
    const a = rnd(1, c - 1);
    return { text: `${a} + □ = ${c}`, say: `${a} meg valahány az ${c}. Melyik szám kell a négyzetbe?`, answer: c - a, frame: { n: a } };
  }
  if (t === 3) {
    const n = rnd(0, 9);
    return { text: `${n} ?`, say: `Melyik szám jön ${art(n)} ${n} után? Mi ${art(n)} ${n} nagyobb szomszédja?`, answer: n + 1 };
  }
  const n = rnd(1, 10);
  return { text: `? ${n}`, say: `Melyik szám áll ${art(n)} ${n} előtt? Mi ${art(n)} ${n} kisebb szomszédja?`, answer: n - 1 };
};

export const TreasurePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => makeTask());
  const [gems, setGems] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [done, setDone] = useState(false);

  const answer = (n: number) => {
    if (done) return;
    let t: string;
    if (n === task.answer) {
      const g = Math.min(10, gems + 1);
      setGems(g);
      setDone(true);
      t = g === 10 ? 'Hurrá! Tele a kincsesláda: 10 drágakő!' : `${randomPraise()} Kapsz egy drágakövet. Már ${g} van a ládában.`;
      if (g === 10) confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } else {
      t = 'Nem egészen. Nézd meg a képet, és számolj újra!';
    }
    setMsg({ text: t, ok: n === task.answer });
    speak(t);
  };
  const next = () => {
    if (gems >= 10) setGems(0);
    const nt = makeTask();
    setTask(nt);
    setDone(false);
    setMsg(null);
    speak(nt.say);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Gyűjts 10 drágakövet!" say={`Minden jó válaszért egy drágakő kerül a ládába. ${task.say}`} mood="happy" dots={10} />
      <div className="rounded-3xl border-4 border-amber-200 bg-amber-50 p-2">
        <TreasureScene gems={gems} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <EqCard text={task.text} className="w-full max-w-[280px] h-auto" />
        {task.frame && <TenFrame n={task.frame.n} second={task.frame.second} crossed={task.frame.crossed} className="w-full max-w-[200px] h-auto" />}
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
        {Array.from({ length: 11 }, (_, n) => (
          <button key={n} type="button" onClick={() => answer(n)} className="h-14 rounded-2xl bg-white border-4 border-sky-300 hover:border-sky-500 text-2xl font-black text-slate-800 active:scale-95">
            {n}
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
TreasurePlayground.speechTexts = () => {
  const says: string[] = [];
  for (let a = 1; a <= 9; a++) for (let b = 1; b <= 10 - a; b++) says.push(`Mennyi ${a} + ${b}?`);
  for (let a = 2; a <= 10; a++) for (let b = 1; b <= a - 1; b++) says.push(`Mennyi ${a} − ${b}?`);
  for (let c = 3; c <= 10; c++) for (let a = 1; a <= c - 1; a++) says.push(`${a} meg valahány az ${c}. Melyik szám kell a négyzetbe?`);
  for (let n = 0; n <= 9; n++) says.push(`Melyik szám jön ${art(n)} ${n} után? Mi ${art(n)} ${n} nagyobb szomszédja?`);
  for (let n = 1; n <= 10; n++) says.push(`Melyik szám áll ${art(n)} ${n} előtt? Mi ${art(n)} ${n} kisebb szomszédja?`);
  return [
    ...says,
    ...says.map((x) => `Minden jó válaszért egy drágakő kerül a ládába. ${x}`),
    "Hurrá! Tele a kincsesláda: 10 drágakő!",
    ...PRAISES.flatMap((p) => Array.from({ length: 9 }, (_, i) => `${p} Kapsz egy drágakövet. Már ${i + 1} van a ládában.`)),
    "Nem egészen. Nézd meg a képet, és számolj újra!",
  ];
};
