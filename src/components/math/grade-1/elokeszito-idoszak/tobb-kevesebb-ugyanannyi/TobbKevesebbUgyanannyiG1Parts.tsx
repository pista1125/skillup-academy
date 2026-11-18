// „Több, kevesebb, ugyanannyi” – Játszótér: párosítsd a két sort, és tedd ki a jó jelet!
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { PairRows, Sign, Thing, TwoSets, signOf } from './TobbKevesebbUgyanannyiG1Scenes';

const PAIRS: [Thing, Thing][] = [
  ['eper', 'alma'],
  ['hal', 'csillag'],
  ['labda', 'virag'],
  ['korte', 'szilva'],
  ['katica', 'level'],
];

const newTask = () => {
  const [ta, tb] = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const a = 1 + Math.floor(Math.random() * 5);
  // kb. minden harmadik feladat legyen „ugyanannyi”
  const b = Math.random() < 0.33 ? a : 1 + Math.floor(Math.random() * 5);
  return { ta, tb, a, b };
};

export const SignPlayground: React.FC = () => {
  const [task, setTask] = useState(newTask);
  const [lines, setLines] = useState(false);
  const [picked, setPicked] = useState<Sign | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const right = signOf(task.a, task.b);

  const pick = (s: Sign) => {
    setPicked(s);
    if (s === right) {
      const t =
        right === '=' ? `${randomPraise()} Mindegyiknek jutott pár: ugyanannyi.` : right === '>' ? `${randomPraise()} Bal oldalon több van, a jel a bal oldal felé nyílik.` : `${randomPraise()} Bal oldalon kevesebb van, a jel hegye a bal oldal felé mutat.`;
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = 'Nem egészen. Nézd, párosítottam őket! Amelyik sorból marad pár nélkül, abból van több.';
      setMsg({ text: t, ok: false });
      setLines(true);
      speak(t);
    }
  };
  const next = () => {
    setTask(newTask());
    setLines(false);
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Melyik jel kell középre?" say="Hasonlítsd össze a két oldalt! A jel a több felé nyílik, a hegye a kevesebb felé mutat. Ha ugyanannyi, egyenlőségjel kell. Ha nem vagy biztos, párosítsd őket!" mood="think" />
      <div className="rounded-3xl bg-white border-4 border-violet-200 p-2">
        <TwoSets a={[task.ta, task.a]} b={[task.tb, task.b]} sign={picked === right ? right : '?'} />
      </div>
      {lines && (
        <div className="rounded-3xl bg-white border-4 border-violet-100 p-2">
          <PairRows top={[task.ta, task.a]} bottom={[task.tb, task.b]} />
        </div>
      )}
      <div className="flex justify-center">
        <button type="button" onClick={() => setLines(true)} className="h-12 px-5 rounded-full bg-violet-100 hover:bg-violet-200 text-violet-800 text-lg font-black border-2 border-violet-300">
          Párosítsd!
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-[340px] mx-auto">
        {(['<', '=', '>'] as Sign[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => pick(s)}
            className={cn('h-20 rounded-2xl border-4 bg-white text-5xl font-black active:scale-95', picked === s ? (s === right ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-sky-200 hover:border-sky-400')}
            aria-label={s === '<' ? 'kisebb' : s === '>' ? 'nagyobb' : 'egyenlő'}
          >
            {s}
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
