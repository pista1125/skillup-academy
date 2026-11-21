// „Összeadás 0-tól 5-ig” – Játszótér: rakd ki a tízes keretbe két színnel, aztán mondd meg, mennyi összesen!
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { TenFrame } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';

const newTask = (prev?: { a: number; b: number }) => {
  for (;;) {
    const a = Math.floor(Math.random() * 5); // 0–4
    const b = Math.floor(Math.random() * (6 - a)); // a + b ≤ 5
    if (a + b === 0) continue;
    if (prev && prev.a === a && prev.b === b) continue;
    return { a, b };
  }
};

export const AddFramePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [red, setRed] = useState(0);
  const [blue, setBlue] = useState(0);
  const [step, setStep] = useState<'build' | 'sum' | 'done'>('build');
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const { a, b } = task;
  const ask = step === 'build' ? `Rakj ki: ${a} piros + ${b} kék!` : step === 'sum' ? 'Hány korong van összesen?' : `${a} + ${b} = ${a + b}`;
  const say =
    step === 'build'
      ? `Tegyél a keretbe ${a} piros korongot, aztán tegyél hozzá ${b} kéket! Ha elrontod, koppints a Töröl gombra.`
      : step === 'sum'
        ? 'Most számold meg az összeset! Hány korong van összesen a keretben?'
        : `${a} meg ${b} egyenlő ${a + b}.`;

  const addRed = () => {
    setMsg(null);
    if (blue > 0) {
      const t = 'Először a pirosakat tedd ki, utána a kékeket!';
      setMsg({ text: t, ok: false });
      speak(t);
      return;
    }
    if (red + blue < 5) setRed((r) => r + 1);
  };
  const addBlue = () => {
    setMsg(null);
    if (red + blue < 5) setBlue((v) => v + 1);
  };
  const clear = () => {
    setRed(0);
    setBlue(0);
    setMsg(null);
  };
  const checkBuild = () => {
    if (red === a && blue === b) {
      setStep('sum');
      setMsg(null);
      speak('Ügyes! Most számold meg az összeset! Hány korong van összesen?');
    } else {
      const t = red !== a ? `Nézd meg a pirosakat! ${a} piros kell.` : `Nézd meg a kékeket! ${b} kék kell.`;
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const answer = (n: number) => {
    if (n === a + b) {
      const t = `${randomPraise()} ${a} meg ${b} egyenlő ${a + b}.`;
      setStep('done');
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = 'Számold meg még egyszer az összes korongot, a pirosat és a kéket is!';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setRed(0);
    setBlue(0);
    setStep('build');
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} say={say} mood={step === 'done' ? 'cheer' : 'happy'} dots={step === 'done' ? a + b : 5} />
      <TenFrame n={red} second={blue} />
      {step === 'build' && (
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={addRed} className="h-16 px-5 rounded-full bg-red-500 hover:bg-red-400 text-white text-xl font-black shadow" aria-label="Piros korong">
            + piros
          </button>
          <button type="button" onClick={addBlue} className="h-16 px-5 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xl font-black shadow" aria-label="Kék korong">
            + kék
          </button>
          <button type="button" onClick={clear} className="h-16 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xl font-black border-2 border-slate-300">
            Töröl
          </button>
          <button type="button" onClick={checkBuild} className="h-16 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xl font-black shadow">
            Kész ✔
          </button>
        </div>
      )}
      {step === 'sum' && (
        <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => answer(n)} className="h-16 rounded-2xl border-4 border-sky-300 bg-white hover:border-sky-500 text-3xl font-black text-slate-800 active:scale-95">
              {n}
            </button>
          ))}
        </div>
      )}
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
AddFramePlayground.speechTexts = () => {
  const out: string[] = [
    'Most számold meg az összeset! Hány korong van összesen a keretben?',
    'Először a pirosakat tedd ki, utána a kékeket!',
    'Ügyes! Most számold meg az összeset! Hány korong van összesen?',
    'Számold meg még egyszer az összes korongot, a pirosat és a kéket is!',
  ];
  for (let a = 0; a <= 4; a++)
    for (let b = 0; a + b <= 5; b++) {
      if (a + b === 0) continue;
      out.push(
        `Tegyél a keretbe ${a} piros korongot, aztán tegyél hozzá ${b} kéket! Ha elrontod, koppints a Töröl gombra.`,
        `${a} meg ${b} egyenlő ${a + b}.`,
        `Nézd meg a pirosakat! ${a} piros kell.`,
        `Nézd meg a kékeket! ${b} kék kell.`,
        ...PRAISES.map((p) => `${p} ${a} meg ${b} egyenlő ${a + b}.`)
      );
    }
  return [...new Set(out)];
};
