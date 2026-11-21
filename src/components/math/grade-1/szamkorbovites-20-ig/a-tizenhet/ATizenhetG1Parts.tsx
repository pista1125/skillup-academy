// „A tizenhét” – Játszótér: Vissza a tízig! Tízen átlépő kivonás két lépésben (a könyv módszere: 17 − 8 = 17 − 7 − 1), 11–17-ből.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { OptionButton, PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { ExprScene, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';

type Task = { n: number; b: number };

const newTask = (prev?: Task): Task => {
  for (;;) {
    const n = 11 + Math.floor(Math.random() * 7); // 11–17
    const minB = n - 9; // az eredmény legfeljebb 9 → átlépjük a tízet
    const maxB = 9;
    if (minB > maxB) continue;
    const b = Math.max(minB, n - 10 + 1) + Math.floor(Math.random() * (maxB - Math.max(minB, n - 10 + 1) + 1));
    if (!prev || prev.n !== n || prev.b !== b) return { n, b };
  }
};

const opts = (right: number, lo: number, hi: number) => {
  const set = new Set<number>([right]);
  for (const d of [1, -1, 2, -2]) {
    if (set.size >= 3) break;
    const v = right + d;
    if (v >= lo && v <= hi) set.add(v);
  }
  return shuffle(Array.from(set));
};

export const BackToTenPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wrong, setWrong] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const { n, b } = task;
  const first = n - 10;
  const rest = b - first;
  const res = n - b;
  const [o1, setO1] = useState(() => opts(task.n - 10, 1, 7));
  const [o2, setO2] = useState(() => opts(task.n - task.b, 0, 10));

  const say = 'Vissza a tízig! Először mondd meg, hányat kell elvenni, hogy pont 10 maradjon. Aztán mondd meg, mennyi marad a végén.';

  const answer = (v: number) => {
    if (step === 1) {
      if (v === first) {
        const t = `${randomPraise()} ${n} elvéve ${first} az 10. Ebből vegyél el még ennyit: ${rest}.`;
        setMsg({ text: t, ok: true });
        speak(t);
        setStep(2);
        setWrong(null);
      } else {
        const t = 'Nézd a második keretet: annyit vegyél el, hogy csak a teli első keret maradjon!';
        setMsg({ text: t, ok: false });
        speak(t);
        setWrong(v);
      }
    } else if (step === 2) {
      if (v === res) {
        const t = `${randomPraise()} ${n} − ${b} = ${res}.`;
        setMsg({ text: t, ok: true });
        speak(t);
        setStep(3);
        setWrong(null);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else {
        const t = `A 10-ből vegyél el még ennyit: ${rest}. Számolj visszafelé!`;
        setMsg({ text: t, ok: false });
        speak(t);
        setWrong(v);
      }
    }
  };

  const next = () => {
    const t = newTask(task);
    setTask(t);
    setO1(opts(t.n - 10, 1, 7));
    setO2(opts(t.n - t.b, 0, 10));
    setStep(1);
    setWrong(null);
    setMsg(null);
  };

  const lines = step === 1 ? [`${n} − ${b} = ?`] : [`${n} − ${b} = ${step === 3 ? res : '?'}`, `${n} − ${first} − ${rest} = ${step === 3 ? res : '?'}`];
  const crossed = step === 1 ? 0 : step === 2 ? first : b;
  const current = step === 1 ? o1 : o2;

  return (
    <div className="space-y-3">
      <PotyiBubble text={step === 1 ? 'Mennyit veszünk el a tízig?' : step === 2 ? 'Mennyi marad?' : 'Ügyes vagy!'} say={say} mood={step === 3 ? 'cheer' : 'think'} dots={10} />
      <div className="rounded-3xl border-4 border-violet-200 bg-violet-50 p-3 space-y-3">
        <ExprScene text={lines} bg="#ffffff" />
        <TwoFrames a={n} crossed={crossed} />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      {step !== 3 && (
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {current.map((v) => (
            <OptionButton key={`${step}-${v}`} option={v} state={wrong === v ? 'wrong' : 'idle'} onClick={() => answer(v)} />
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <button type="button" onClick={next} className="h-14 px-6 rounded-full text-xl font-black bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
BackToTenPlayground.speechTexts = () => {
  const tasks: Task[] = [];
  for (let n = 11; n <= 17; n++) for (let b = n - 9; b <= 9; b++) tasks.push({ n, b });
  return [
    'Vissza a tízig! Először mondd meg, hányat kell elvenni, hogy pont 10 maradjon. Aztán mondd meg, mennyi marad a végén.',
    ...PRAISES.flatMap((p) => tasks.flatMap(({ n, b }) => [`${p} ${n} elvéve ${n - 10} az 10. Ebből vegyél el még ennyit: ${b - (n - 10)}.`, `${p} ${n} − ${b} = ${n - b}.`])),
    'Nézd a második keretet: annyit vegyél el, hogy csak a teli első keret maradjon!',
    ...tasks.map(({ n, b }) => `A 10-ből vegyél el még ennyit: ${b - (n - 10)}. Számolj visszafelé!`),
  ];
};
