// „Szöveges feladatok” – Játszótér: Pötyi mesegépe. Pötyi elmond egy rövid mesét (10-ig, egy lépés),
// a gyerek előbb kiválasztja a műveletet (+ vagy −), aztán a választ (0–10).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble, SpeakButton } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { CountBox, PicName } from '../a-nyolc/ANyolcG1Scenes';

interface Kind {
  icon: PicName;
  colorB?: string;
  add: (a: number, b: number) => string;
  sub: (a: number, b: number) => string;
}

const KINDS: Kind[] = [
  {
    icon: 'hogolyo',
    colorB: '#93c5fd',
    add: (a, b) => `Pötyi gyúrt ${a} hógolyót. Aztán gyúrt még ${b} hógolyót. Hány hógolyója van most?`,
    sub: (a, b) => `Pötyinek ${a} hógolyója volt. ${b} hógolyót eldobott. Hány hógolyója maradt?`,
  },
  {
    icon: 'madar',
    colorB: '#fb923c',
    add: (a, b) => `Az etetőn ${a} madár ült. Jött még ${b} madár. Hány madár van most az etetőn?`,
    sub: (a, b) => `Az etetőn ${a} madár ült. ${b} madár elrepült. Hány madár maradt az etetőn?`,
  },
  {
    icon: 'alma',
    colorB: '#22c55e',
    add: (a, b) => `Zümi kosarában ${a} alma volt. Csigusz tett bele még ${b} almát. Hány alma van most a kosárban?`,
    sub: (a, b) => `A tányéron ${a} alma volt. Csigusz megevett ${b} almát. Hány alma maradt a tányéron?`,
  },
];

interface Story {
  kind: number;
  op: '+' | '−';
  a: number;
  b: number;
}

/** „-tól/-től” rag a számhoz (3-tól, 6-tól, 8-tól, a többi -től). */
const tol = (n: number) => `${n}-${n === 3 || n === 6 || n === 8 ? 'tól' : 'től'}`;

const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));

const newStory = (prev?: Story): Story => {
  let kind = rnd(0, KINDS.length - 1);
  if (prev && kind === prev.kind) kind = (kind + 1) % KINDS.length;
  const op = Math.random() < 0.5 ? '+' : '−';
  if (op === '+') {
    const a = rnd(1, 8);
    return { kind, op, a, b: rnd(1, 10 - a) };
  }
  const a = rnd(3, 10);
  return { kind, op, a, b: rnd(1, a - 1) };
};

export const StoryMachinePlayground: React.FC = () => {
  const [story, setStory] = useState<Story>(() => newStory());
  const [opOk, setOpOk] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const k = KINDS[story.kind];
  const text = story.op === '+' ? k.add(story.a, story.b) : k.sub(story.a, story.b);
  const result = story.op === '+' ? story.a + story.b : story.a - story.b;


  const chooseOp = (op: '+' | '−') => {
    let t: string;
    if (op === story.op) {
      t = op === '+' ? 'Igen! Több lett, ez összeadás.' : 'Igen! Kevesebb lett, ez kivonás.';
      setOpOk(true);
      setMsg({ text: t, ok: true });
    } else {
      t = story.op === '+' ? 'Figyeld meg: jött még, vagy elment? Több lett vagy kevesebb?' : 'Figyeld meg: elment valami. Több lett vagy kevesebb?';
      setMsg({ text: t, ok: false });
    }
    speak(t);
  };
  const answer = (n: number) => {
    let t: string;
    if (n === result) {
      t = `${randomPraise()} ${story.a} ${story.op} ${story.b} = ${result}.`;
      setMsg({ text: t, ok: true });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      t = story.op === '+' ? `Számolj tovább ${story.a === 1 || story.a === 5 ? 'az' : 'a'} ${tol(story.a)}!` : 'Az áthúzottakat ne számold!';
      setMsg({ text: t, ok: false });
    }
    speak(t);
  };
  const next = () => {
    const ns = newStory(story);
    setStory(ns);
    speak(ns.op === '+' ? KINDS[ns.kind].add(ns.a, ns.b) : KINDS[ns.kind].sub(ns.a, ns.b));
    setOpOk(false);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Hallgasd meg a mesét!" say={text} mood="happy" dots={10} />
      <div className="flex items-center justify-center gap-3 rounded-3xl border-4 border-amber-200 bg-amber-50 p-2">
        <CountBox icon={k.icon} n={story.a} nb={story.op === '+' ? story.b : 0} colorB={k.colorB} crossed={story.op === '−' ? story.b : 0} className="w-full max-w-[320px] h-auto" />
        <SpeakButton text={text} label="Mondd el újra!" />
      </div>
      {!opOk ? (
        <div className="flex justify-center gap-4">
          {(['+', '−'] as const).map((op) => (
            <button key={op} type="button" onClick={() => chooseOp(op)} className="w-24 h-24 rounded-3xl bg-white border-4 border-violet-300 hover:border-violet-500 text-6xl font-black text-slate-800 active:scale-95" aria-label={op === '+' ? 'összeadás' : 'kivonás'}>
              {op}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-center text-3xl font-black text-slate-800">
            {story.a} {story.op} {story.b} = ?
          </p>
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
            {Array.from({ length: 11 }, (_, n) => (
              <button key={n} type="button" onClick={() => answer(n)} className="h-14 rounded-2xl bg-white border-4 border-sky-300 hover:border-sky-500 text-2xl font-black text-slate-800 active:scale-95">
                {n}
              </button>
            ))}
          </div>
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
