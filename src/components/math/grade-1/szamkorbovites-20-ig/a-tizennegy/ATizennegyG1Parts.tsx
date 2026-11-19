// „A tizennégy” – Játszótér: Melyik hálóba? A halon egy művelet (eredménye 5–14), a gyerek a jó számú hálóra koppint.
// Tízes + egyes (10 + 4), tízen belüli (11 + 3, 14 − 2) és a könyv módszerével tízen átlépő műveletek (9 + 5, 14 − 6).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { OptionButton, PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { NetCard, OpFish } from './ATizennegyG1Scenes';

type Task = { a: number; b: number; op: '+' | '−' };

const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));

const makeTask = (): Task => {
  const kind = rnd(0, 3);
  if (kind === 0) {
    // tízes + egyes, vagy 11–13 + egy kicsi (tízen belül)
    const a = rnd(10, 13);
    return { a, b: rnd(1, 14 - a), op: '+' };
  }
  if (kind === 1) {
    // tízen átlépő összeadás: 5–9 + valamennyi, összeg 11–14
    const a = rnd(5, 9);
    const b = rnd(11 - a, Math.min(9, 14 - a));
    return { a, b, op: '+' };
  }
  if (kind === 2) {
    // kivonás tízen belül: 11–14 − annyi, hogy legalább 10 maradjon
    const a = rnd(11, 14);
    return { a, b: rnd(1, a - 10), op: '−' };
  }
  // tízen átlépő kivonás: 11–14 − valamennyi, eredmény 5–9
  const a = rnd(11, 14);
  const b = rnd(a - 9, Math.min(9, a - 5));
  return { a, b, op: '−' };
};

const newTask = (prev?: Task): Task => {
  for (;;) {
    const t = makeTask();
    if (!prev || prev.a !== t.a || prev.b !== t.b || prev.op !== t.op) return t;
  }
};

const resultOf = (t: Task) => (t.op === '+' ? t.a + t.b : t.a - t.b);

/** 4 egymás utáni háló-szám, köztük az eredmény (legfeljebb 14). */
const netsFor = (r: number) => {
  const start = Math.max(0, Math.min(11, r - rnd(0, 3)));
  return [start, start + 1, start + 2, start + 3];
};

export const NetSortPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [nets, setNets] = useState<number[]>(() => netsFor(resultOf(task)));
  const [done, setDone] = useState(false);
  const [wrong, setWrong] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const { a, b, op } = task;
  const res = resultOf(task);
  const cross = op === '+' ? a < 10 && res > 10 : a > 10 && res < 10;

  const say = 'Nézd a halat! Számold ki, mennyi a műveletének az eredménye, és koppints arra a hálóra, amelyiken ez a szám áll. A korongok segítenek.';

  const answer = (v: number) => {
    if (done) return;
    if (v === res) {
      const t = `${randomPraise()} ${a} ${op} ${b} = ${res}. A hal a jó hálóba úszott.`;
      setMsg({ text: t, ok: true });
      speak(t);
      setDone(true);
      setWrong(null);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      let t: string;
      if (cross && op === '+') t = `Előbb a tízig: ${a} meg ${10 - a} az 10. Aztán a 10-hez még ${b - (10 - a)}.`;
      else if (cross) t = `Előbb vissza a tízig: ${a} elvéve ${a - 10} az 10. Aztán a 10-ből még ${b - (a - 10)}.`;
      else t = op === '+' ? `Indulj a ${a} számtól, és számolj tovább ${b} lépést!` : `Indulj a ${a} számtól, és számolj visszafelé ${b} lépést!`;
      setMsg({ text: t, ok: false });
      speak(t);
      setWrong(v);
    }
  };

  const next = () => {
    const t = newTask(task);
    setTask(t);
    setNets(netsFor(resultOf(t)));
    setDone(false);
    setWrong(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={done ? 'Ügyes vagy!' : 'Melyik hálóba úszik a hal?'} say={say} mood={done ? 'cheer' : 'think'} dots={10} />
      <div className="rounded-3xl border-4 border-sky-200 bg-sky-50 p-3 space-y-3">
        <OpFish text={`${a} ${op} ${b}${done ? ` = ${res}` : ''}`} />
        {op === '+' ? <TwoFrames a={a} b={b} /> : <TwoFrames a={a} crossed={b} />}
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="grid grid-cols-4 gap-2 max-w-lg mx-auto">
        {nets.map((v) => (
          <OptionButton
            key={v}
            compact
            option={{ figure: <NetCard n={v} />, say: String(v) }}
            state={done ? (v === res ? 'correct' : 'dim') : wrong === v ? 'wrong' : 'idle'}
            onClick={() => answer(v)}
          />
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
