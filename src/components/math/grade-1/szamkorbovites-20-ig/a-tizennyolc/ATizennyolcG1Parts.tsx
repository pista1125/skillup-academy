// „A tizennyolc” – Játszótér: Előbb vissza a tízig! Tízen átlépő kivonás két lépésben
// (a könyv módszere: 18 − 9 = 18 − 8 − 1). A kisebbítendő 11–18, a kivonandó legfeljebb 9.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { OptionButton, PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { ExprScene, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';

type Task = { a: number; b: number };

const newTask = (prev?: Task): Task => {
  for (;;) {
    const a = 11 + Math.floor(Math.random() * 8); // 11–18
    const minB = a - 9; // így átlépjük a tízet: a − b legfeljebb 9
    const b = minB + Math.floor(Math.random() * (9 - minB + 1)); // b: (a − 9)…9
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

export const BackToTenPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wrong, setWrong] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const { a, b } = task;
  const first = a - 10; // ennyit veszünk el először: épp a tízig
  const rest = b - first;
  const diff = a - b;
  const [o1, setO1] = useState(() => opts(task.a - 10, 1, 9));
  const [o2, setO2] = useState(() => opts(task.a - task.b, 1, 10));

  const say = 'Előbb vissza a tízig! Először mondd meg, hányat kell elvenni, hogy pont 10 maradjon. Aztán mondd meg, mennyi marad a végén.';

  const answer = (v: number) => {
    if (step === 1) {
      if (v === first) {
        const t = `${randomPraise()} ${a} elvéve ${first}, az 10. Még ${rest} kell elvenni.`;
        setMsg({ text: t, ok: true });
        speak(t);
        setStep(2);
        setWrong(null);
      } else {
        const t = 'Nézd a második keretet! Annyit vegyél el, hogy csak a teli keret maradjon.';
        setMsg({ text: t, ok: false });
        speak(t);
        setWrong(v);
      }
    } else if (step === 2) {
      if (v === diff) {
        const t = `${randomPraise()} ${a} − ${b} = ${diff}.`;
        setMsg({ text: t, ok: true });
        speak(t);
        setStep(3);
        setWrong(null);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else {
        const t = `A 10-ből még ${rest} kell elvenni. Számolj visszafelé!`;
        setMsg({ text: t, ok: false });
        speak(t);
        setWrong(v);
      }
    }
  };

  const next = () => {
    const t = newTask(task);
    setTask(t);
    setO1(opts(t.a - 10, 1, 9));
    setO2(opts(t.a - t.b, 1, 10));
    setStep(1);
    setWrong(null);
    setMsg(null);
  };

  const lines = step === 1 ? [`${a} − ${b} = ?`] : [`${a} − ${b} = ${step === 3 ? diff : '?'}`, `${a} − ${first} − ${rest} = ${step === 3 ? diff : '?'}`];
  const current = step === 1 ? o1 : o2;

  return (
    <div className="space-y-3">
      <PotyiBubble text={step === 1 ? 'Hányat vegyünk el a tízig?' : step === 2 ? 'Mennyi marad?' : 'Ügyes vagy!'} say={say} mood={step === 3 ? 'cheer' : 'think'} dots={10} />
      <div className="rounded-3xl border-4 border-orange-200 bg-orange-50 p-3 space-y-3">
        <ExprScene text={lines} bg="#ffffff" />
        <TwoFrames a={a} crossed={step === 1 ? 0 : step === 2 ? first : b} />
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
  for (let a = 11; a <= 18; a++) for (let b = a - 9; b <= 9; b++) tasks.push({ a, b });
  return [
    'Előbb vissza a tízig! Először mondd meg, hányat kell elvenni, hogy pont 10 maradjon. Aztán mondd meg, mennyi marad a végén.',
    ...PRAISES.flatMap((p) => tasks.flatMap(({ a, b }) => [`${p} ${a} elvéve ${a - 10}, az 10. Még ${b - (a - 10)} kell elvenni.`, `${p} ${a} − ${b} = ${a - b}.`])),
    'Nézd a második keretet! Annyit vegyél el, hogy csak a teli keret maradjon.',
    ...tasks.map(({ a, b }) => `A 10-ből még ${b - (a - 10)} kell elvenni. Számolj visszafelé!`),
  ];
};
