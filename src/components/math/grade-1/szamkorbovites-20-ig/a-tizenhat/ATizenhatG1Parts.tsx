// „A tizenhat” – Játszótér: Előbb a tízig! Tízen átlépő összeadás két lépésben (a könyv módszere: 7 + 9 = 7 + 3 + 6), összeg legfeljebb 16.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { OptionButton, PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { ExprScene, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';

type Task = { a: number; b: number };

const newTask = (prev?: Task): Task => {
  for (;;) {
    const a = 6 + Math.floor(Math.random() * 4); // 6–9
    const minB = 11 - a;
    const maxB = Math.min(9, 16 - a);
    const b = minB + Math.floor(Math.random() * (maxB - minB + 1));
    if (!prev || prev.a !== a || prev.b !== b) return { a, b };
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

export const TenBridgePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wrong, setWrong] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const { a, b } = task;
  const fill = 10 - a;
  const rest = b - fill;
  const sum = a + b;
  const [o1, setO1] = useState(() => opts(10 - task.a, 1, 9));
  const [o2, setO2] = useState(() => opts(task.a + task.b, 10, 16));

  const say = 'Előbb a tízig! Először mondd meg, hány kell a piros korongokhoz, hogy az első keret tele legyen. Aztán mondd meg, mennyi az összesen.';

  const answer = (v: number) => {
    if (step === 1) {
      if (v === fill) {
        const t = `${randomPraise()} ${a} meg ${fill} az 10. Maradt még ${rest}.`;
        setMsg({ text: t, ok: true });
        speak(t);
        setStep(2);
        setWrong(null);
      } else {
        const t = `Számolj tovább a 10-ig, és figyeld, hányat mondasz!`;
        setMsg({ text: t, ok: false });
        speak(t);
        setWrong(v);
      }
    } else if (step === 2) {
      if (v === sum) {
        const t = `${randomPraise()} ${a} + ${b} = ${sum}.`;
        setMsg({ text: t, ok: true });
        speak(t);
        setStep(3);
        setWrong(null);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else {
        const t = `A 10-hez még ${rest} kell. Számolj a 10-től tovább!`;
        setMsg({ text: t, ok: false });
        speak(t);
        setWrong(v);
      }
    }
  };

  const next = () => {
    const t = newTask(task);
    setTask(t);
    setO1(opts(10 - t.a, 1, 9));
    setO2(opts(t.a + t.b, 10, 16));
    setStep(1);
    setWrong(null);
    setMsg(null);
  };

  const lines = step === 1 ? [`${a} + ${b} = ?`] : [`${a} + ${b} = ${step === 3 ? sum : '?'}`, `${a} + ${fill} + ${rest} = ${step === 3 ? sum : '?'}`];
  const current = step === 1 ? o1 : o2;

  return (
    <div className="space-y-3">
      <PotyiBubble text={step === 1 ? 'Hány kell a tízhez?' : step === 2 ? 'Mennyi összesen?' : 'Ügyes vagy!'} say={say} mood={step === 3 ? 'cheer' : 'think'} dots={10} />
      <div className="rounded-3xl border-4 border-violet-200 bg-violet-50 p-3 space-y-3">
        <ExprScene text={lines} bg="#ffffff" />
        <TwoFrames a={a} b={step === 1 ? 0 : b} />
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
TenBridgePlayground.speechTexts = () => {
  const tasks: Task[] = [];
  for (let a = 6; a <= 9; a++) for (let b = 11 - a; b <= Math.min(9, 16 - a); b++) tasks.push({ a, b });
  return [
    'Előbb a tízig! Először mondd meg, hány kell a piros korongokhoz, hogy az első keret tele legyen. Aztán mondd meg, mennyi az összesen.',
    ...PRAISES.flatMap((p) => tasks.flatMap(({ a, b }) => [`${p} ${a} meg ${10 - a} az 10. Maradt még ${b - (10 - a)}.`, `${p} ${a} + ${b} = ${a + b}.`])),
    'Számolj tovább a 10-ig, és figyeld, hányat mondasz!',
    ...tasks.map(({ a, b }) => `A 10-hez még ${b - (10 - a)} kell. Számolj a 10-től tovább!`),
  ];
};
