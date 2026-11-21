// „Az idő mérése” – Játszótér: állítsd be az órát! A gyerek a számlap egy számára koppint, oda ugrik a kismutató, aztán szól, ha kész.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { clock } from './AzIdoMereseG1Scenes';

const EVENTS = [
  'Zümi ekkor kel fel.',
  'Csigusz ekkor indul a tóhoz.',
  'Ekkor kezdődik a mézes uzsonna.',
  'Pötyi ekkor öntözi a virágokat.',
  'Ekkor jön a postás méhecske.',
];

const az = (n: number) => (n === 1 || n === 5 ? 'az' : 'a');

type Task = { h: number; ev: string };
const newTask = (prev?: Task): Task => {
  let h: number;
  do h = 1 + Math.floor(Math.random() * 10);
  while (prev && h === prev.h);
  return { h, ev: EVENTS[Math.floor(Math.random() * EVENTS.length)] };
};

export const ClockSetPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [hand, setHand] = useState(12);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [done, setDone] = useState(false);
  const R = 110;
  const C = 130;

  const setTo = (n: number) => {
    if (done) return;
    setHand(n);
    setMsg(null);
  };
  const check = () => {
    if (done) return;
    if (hand === task.h) {
      const t = `${randomPraise()} A nagymutató felfelé mutat, a kismutató ${az(task.h)} ${task.h} felé. Ez pontosan ${task.h} óra.`;
      setMsg({ text: `${task.h} óra!`, ok: true });
      setDone(true);
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = hand === 12 ? `A kismutató még felfelé mutat. Keresd meg a számlapon ${az(task.h)} ${task.h} számot, és koppints rá!` : `Ez most ${hand} óra. Mi ${task.h} órát keresünk. Próbáld újra!`;
      setMsg({ text: hand === 12 ? 'Koppints egy számra!' : `Ez ${hand} óra.`, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setHand(12);
    setMsg(null);
    setDone(false);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble
        text={`Állítsd be: ${task.h} óra!`}
        say={`${task.ev} Állítsd be az órát ${task.h} órára! Koppints a számlapon arra a számra, ahová a kis piros mutató menjen, aztán koppints a Kész gombra!`}
        mood="think"
      />
      <div className="rounded-3xl border-4 border-sky-200 bg-white p-2 flex justify-center">
        <svg viewBox="0 0 260 260" className="w-full max-w-[300px] h-auto select-none">
          {clock(C, C, R, hand, '#0ea5e9', 'pg')}
          {Array.from({ length: 12 }, (_, i) => {
            const n = i + 1;
            const a = (n * 30 * Math.PI) / 180;
            return (
              <circle
                key={n}
                cx={C + R * 0.66 * Math.sin(a)}
                cy={C - R * 0.66 * Math.cos(a)}
                r="17"
                fill={hand === n && n !== 12 ? 'rgba(220,38,38,0.15)' : 'rgba(0,0,0,0)'}
                stroke={hand === n && n !== 12 ? '#dc2626' : 'none'}
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => setTo(n)}
                role="button"
                aria-label={`${n}`}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={check}
          className={cn('flex-1 min-h-[72px] rounded-3xl border-4 bg-white flex items-center justify-center text-xl font-black text-slate-800 active:scale-95', 'border-emerald-300 hover:border-emerald-500')}
        >
          Kész!
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
ClockSetPlayground.speechTexts = () => {
  const H = Array.from({ length: 10 }, (_, i) => i + 1);
  const hands = Array.from({ length: 11 }, (_, i) => i + 1);
  return [
    ...EVENTS.flatMap((ev) => H.map((h) => `${ev} Állítsd be az órát ${h} órára! Koppints a számlapon arra a számra, ahová a kis piros mutató menjen, aztán koppints a Kész gombra!`)),
    ...PRAISES.flatMap((p) => H.map((h) => `${p} A nagymutató felfelé mutat, a kismutató ${az(h)} ${h} felé. Ez pontosan ${h} óra.`)),
    ...H.map((h) => `A kismutató még felfelé mutat. Keresd meg a számlapon ${az(h)} ${h} számot, és koppints rá!`),
    ...H.flatMap((h) => hands.filter((x) => x !== h).map((x) => `Ez most ${x} óra. Mi ${h} órát keresünk. Próbáld újra!`)),
  ];
};
