// „Megálló” (8) – Játszótér: Kulcsrejtvény. Csigusz feladványai alapján kiesnek a rossz kulcsok; a végén a megmaradt kulcs nyit.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { KeyPic } from './Megallo8G1Scenes';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7'];
/** tárgyrag és -s képző a számokhoz (beszédhez) */
const ACC = ['0-t', '1-et', '2-t', '3-at', '4-et', '5-öt', '6-ot', '7-et', '8-at'];
const ADJ = ['0-s', '1-es', '2-es', '3-as', '4-es', '5-ös', '6-os', '7-es', '8-as'];

/** Egy feladvány, amelynek az eredménye v (0–8): összeadás, kivonás vagy nyitott mondat. */
const clueFor = (v: number): { text: string; say: string } => {
  const kind = rnd(0, 2);
  if (kind === 0) {
    const a = rnd(0, v);
    return { text: `${a} + ${v - a}`, say: `${a} meg ${v - a}` };
  }
  if (kind === 1 || v + 1 > 8) {
    const a = rnd(v, 8);
    return { text: `${a} − ${a - v}`, say: `${a} elvéve ${a - v}` };
  }
  const b = rnd(1, 8 - v);
  return { text: `□ + ${b} = ${v + b}`, say: `az a szám, amelyikhez ${ACC[b]} adva ${v + b} lesz` };
};

type Puzzle = { keys: number[]; answer: number; order: number[]; clues: { text: string; say: string }[] };

const makePuzzle = (): Puzzle => {
  const pool = Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5);
  const keys = pool.slice(0, 5).sort((a, b) => a - b);
  const answer = keys[rnd(0, 4)];
  const order = keys.filter((k) => k !== answer).sort(() => Math.random() - 0.5);
  return { keys, answer, order, clues: order.map(clueFor) };
};

const sayFor = (clueSay: string | null) =>
  clueSay !== null
    ? `Csigusz azt mondja: nem ${clueSay}. Számold ki, és koppints arra a kulcsra, amelyiket áthúzzuk!`
    : 'Minden rossz kulcsot áthúztunk. Melyik kulcs maradt? Koppints rá!';

export const KeyPuzzlePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [pz, setPz] = useState<Puzzle>(() => makePuzzle());
  const [step, setStep] = useState(0);
  const [opened, setOpened] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const crossed = pz.order.slice(0, step);
  const finished = step >= pz.order.length;
  const clue = finished ? null : pz.clues[step];
  const say = sayFor(clue ? clue.say : null);

  const tap = (k: number) => {
    if (opened || crossed.includes(k)) return;
    let t: string;
    let ok = false;
    if (!finished) {
      if (k === pz.order[step]) {
        ok = true;
        t = step + 1 < pz.order.length ? `${randomPraise()} Ezt a kulcsot áthúzzuk. Jön a következő feladvány!` : `${randomPraise()} Melyik kulcs maradt? Koppints rá!`;
        setStep(step + 1);
      } else {
        t = "Ez a kulcs még jó lehet. Számold ki újra a feladványt!";
      }
    } else if (k === pz.answer) {
      ok = true;
      setOpened(true);
      t = `${randomPraise()} Kinyílt a kamra! ${k === 1 || k === 5 ? "Az" : "A"} ${ADJ[k]} kulcs nyitja.`;
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } else {
      t = 'Ezt már áthúztuk. Keresd a megmaradt kulcsot!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setPz(makePuzzle());
    setStep(0);
    setOpened(false);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={clue ? 'Melyik kulcs NEM jó?' : 'Melyik kulcs maradt?'} say={say} mood="think" dots={8} />
      <div className="rounded-3xl border-4 border-amber-200 bg-amber-50 p-3 space-y-2">
        {clue && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black text-rose-600" aria-label="nem">✘</span>
            <EqCard text={clue.text} className="w-full max-w-[300px] h-auto" />
          </div>
        )}
        <div className="grid grid-cols-5 gap-2">
          {pz.keys.map((k, i) => (
            <button
              key={k}
              type="button"
              onClick={() => tap(k)}
              className={cn('rounded-2xl bg-white border-4 p-1 active:scale-95 transition', opened && k === pz.answer ? 'border-emerald-500' : 'border-sky-200 hover:border-sky-400')}
              aria-label={`${ADJ[k]} kulcs`}
            >
              <svg viewBox="0 0 80 150" className="w-full h-auto">
                <KeyPic n={k} cx={40} cy={40} color={COLORS[i]} crossed={crossed.includes(k)} />
              </svg>
            </button>
          ))}
        </div>
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
KeyPuzzlePlayground.speechTexts = () => {
  const V = Array.from({ length: 9 }, (_, i) => i);
  const clueSays = new Set<string>();
  V.forEach((v) => {
    for (let a = 0; a <= v; a++) clueSays.add(`${a} meg ${v - a}`);
    for (let a = v; a <= 8; a++) clueSays.add(`${a} elvéve ${a - v}`);
    for (let b = 1; b <= 8 - v; b++) clueSays.add(`az a szám, amelyikhez ${ACC[b]} adva ${v + b} lesz`);
  });
  return [
    ...[...clueSays].map((c) => sayFor(c)),
    sayFor(null),
    ...PRAISES.flatMap((p) => [
      `${p} Ezt a kulcsot áthúzzuk. Jön a következő feladvány!`,
      `${p} Melyik kulcs maradt? Koppints rá!`,
      ...V.map((k) => `${p} Kinyílt a kamra! ${k === 1 || k === 5 ? "Az" : "A"} ${ADJ[k]} kulcs nyitja.`),
    ]),
    "Ez a kulcs még jó lehet. Számold ki újra a feladványt!",
    "Ezt már áthúztuk. Keresd a megmaradt kulcsot!",
  ];
};
