// „A sorszámnevek” – Játszótér: Koppints a hányadikra! Egy 9 elemű sorban (balról számolva) a megadott sorszámú tárgyat kell megtalálni.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { XPIC, XPicName } from '../a-kilenc/AKilencG1Scenes';

const ORD = ['első', 'második', 'harmadik', 'negyedik', 'ötödik', 'hatodik', 'hetedik', 'nyolcadik', 'kilencedik'];
const KINDS: { icon: XPicName; acc: string; color: string }[] = [
  { icon: 'disz', acc: 'díszre', color: '#ef4444' },
  { icon: 'szanko', acc: 'szánkóra', color: '#3b82f6' },
  { icon: 'csengo', acc: 'csengőre', color: '#facc15' },
  { icon: 'ajandek', acc: 'ajándékra', color: '#ec4899' },
  { icon: 'suti', acc: 'sütire', color: '#c2410c' },
];

/** névelő: az első, az ötödik; a többi előtt a */
const az = (k: number) => (k === 0 || k === 4 ? 'az' : 'a');

const newTask = (prev?: { k: number; kind: number }) => {
  let k = Math.floor(Math.random() * 9);
  if (prev && k === prev.k) k = (k + 4) % 9;
  return { k, kind: Math.floor(Math.random() * KINDS.length) };
};

const taskSay = (k: number, acc: string) => `Koppints balról ${az(k)} ${ORD[k]} ${acc}! A zöld nyílnál kezdd a számolást: első, második, harmadik…`;
const wrongSay = (i: number, k: number) => `Ez ${az(i)} ${ORD[i]}. Számolj újra balról: első, második, harmadik… ${az(k)} ${ORD[k]} kell!`;

export const OrdinalTapPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [tapped, setTapped] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const kind = KINDS[task.kind];
  const say = taskSay(task.k, kind.acc);

  const tap = (i: number) => {
    setTapped(i);
    const ok = i === task.k;
    const t = ok
      ? `${randomPraise()} Ez ${az(task.k)} ${ORD[task.k]}.`
      : wrongSay(i, task.k);
    setMsg({ text: t, ok });
    speak(t);
    if (ok) confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };
  const next = () => {
    setTask((p) => newTask(p));
    setTapped(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={`Koppints ${az(task.k)} ${task.k + 1}. ${kind.acc}!`} say={say} mood="happy" dots={9} />
      <div className="flex items-center justify-center">
        <span className="px-6 py-2 rounded-3xl bg-white border-4 border-violet-300 text-5xl font-black text-slate-800" aria-label={ORD[task.k]}>
          {task.k + 1}.
        </span>
      </div>
      <div className="flex items-center gap-1 rounded-3xl border-4 border-sky-200 bg-sky-50 p-2">
        <svg viewBox="0 0 30 40" className="w-6 sm:w-8 shrink-0" aria-hidden>
          <path d="M4 20 H24 M16 12 L24 20 L16 28" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="grid grid-cols-9 gap-1 flex-1">
          {Array.from({ length: 9 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => tap(i)}
              className={cn(
                'aspect-square rounded-xl border-4 bg-white flex items-center justify-center active:scale-95',
                tapped === i ? (i === task.k ? 'border-emerald-500 bg-emerald-100' : 'border-rose-400 bg-rose-100') : 'border-sky-200 hover:border-sky-400'
              )}
              aria-label={`${i + 1}. tárgy`}
            >
              <svg viewBox="0 0 50 50" className="w-full h-full">{XPIC(kind.icon)({ x: 25, y: 26, s: 0.95, color: kind.color })}</svg>
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
OrdinalTapPlayground.speechTexts = () => {
  const K = Array.from({ length: 9 }, (_, i) => i);
  return [
    ...KINDS.flatMap((kind) => K.map((k) => taskSay(k, kind.acc))),
    ...PRAISES.flatMap((p) => K.map((k) => `${p} Ez ${az(k)} ${ORD[k]}.`)),
    ...K.flatMap((k) => K.filter((i) => i !== k).map((i) => wrongSay(i, k))),
  ];
};
