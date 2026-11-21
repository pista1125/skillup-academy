// „Pálcikák és korongok” – Játszótér: rakd ki úgy, mint a minta! A szürke elemekre koppintva a szín körbe vált
// (piros → kék → sárga → zöld), a gyerek addig színez, amíg a másolat ugyanolyan nem lesz, mint Pötyi mintája.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { FIG, Fig, FigName, Figure, PC, PC_FILL } from './PalcikakEsKorongokG1Scenes';

const ORDER: PC[] = ['piros', 'kek', 'sarga', 'zold'];
const MODELS: FigName[] = ['haz', 'baba', 'kapu', 'asztal', 'szek', 'roller', 'nyaloka', 'fagyi', 'letra'];

const newTask = (prev?: FigName) => {
  let name = MODELS[Math.floor(Math.random() * MODELS.length)];
  if (name === prev) name = MODELS[(MODELS.indexOf(name) + 1) % MODELS.length];
  const model: Figure = FIG[name].map((p) => ({ ...p, c: ORDER[Math.floor(Math.random() * ORDER.length)] }));
  return { name, model };
};

export const CopyFigurePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [mine, setMine] = useState<(PC | null)[]>(() => task.model.map(() => null));
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const tapPart = (i: number) => {
    setMsg(null);
    setMine((m) => m.map((c, j) => (j === i ? ORDER[(c === null ? 0 : ORDER.indexOf(c) + 1) % ORDER.length] : c)));
  };
  const check = () => {
    const empty = mine.filter((c) => c === null).length;
    const wrong = mine.filter((c, i) => c !== null && c !== task.model[i].c).length;
    let t: string;
    let ok = false;
    if (empty > 0) t = 'Még van szürke elem. Színezd ki mindet!';
    else if (wrong > 0) t = 'Majdnem! Nézd meg újra a mintát, valamelyik színe más.';
    else {
      t = randomPraise() + ' Pont olyan, mint a minta.';
      ok = true;
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    const t = newTask(task.name);
    setTask(t);
    setMine(t.model.map(() => null));
    setMsg(null);
  };

  const order = task.model.map((p, i) => ({ p, i })).sort((a, b) => (a.p.k === b.p.k ? 0 : a.p.k === 's' ? -1 : 1));

  return (
    <div className="space-y-3">
      <PotyiBubble text="Rakd ki úgy, mint a minta!" say="Rakd ki úgy, mint a minta! Koppints a szürke pálcikákra és korongokra, amíg jó színűek nem lesznek." mood="happy" />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl border-4 border-amber-300 bg-amber-50 p-2">
          <p className="text-center font-black text-amber-800">Minta</p>
          <Fig f={task.model} className="w-full h-auto" />
        </div>
        <div className="rounded-3xl border-4 border-sky-300 bg-sky-50 p-2">
          <p className="text-center font-black text-sky-800">A te képed</p>
          <svg viewBox="0 0 120 120" className="w-full h-auto">
            <rect x="2" y="2" width="116" height="116" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
            {order.map(({ p, i }) => {
              const c = mine[i];
              const fill = c ? PC_FILL[c] : '#e2e8f0';
              return p.k === 's' ? (
                <g key={i} onClick={() => tapPart(i)} className="cursor-pointer">
                  <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="transparent" strokeWidth="18" strokeLinecap="round" />
                  <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="#1f2937" strokeWidth="9" strokeLinecap="round" opacity={c ? 1 : 0.35} />
                  <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={fill} strokeWidth="6" strokeLinecap="round" />
                </g>
              ) : (
                <circle key={i} onClick={() => tapPart(i)} className="cursor-pointer" cx={p.x} cy={p.y} r="11" fill={fill} stroke="#1f2937" strokeWidth="2.5" />
              );
            })}
          </svg>
        </div>
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex justify-center gap-3">
        <button type="button" onClick={check} className="h-14 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-xl font-black shadow">
          Kész ✔
        </button>
        <button type="button" onClick={next} className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
CopyFigurePlayground.speechTexts = () => [
  'Rakd ki úgy, mint a minta! Koppints a szürke pálcikákra és korongokra, amíg jó színűek nem lesznek.',
  'Még van szürke elem. Színezd ki mindet!',
  'Majdnem! Nézd meg újra a mintát, valamelyik színe más.',
  ...PRAISES.map((p) => p + ' Pont olyan, mint a minta.'),
];
