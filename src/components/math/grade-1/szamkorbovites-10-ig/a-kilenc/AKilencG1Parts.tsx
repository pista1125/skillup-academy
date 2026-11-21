// „A kilenc” – Játszótér: Díszítsd fel a fát! Koppints az akasztókra: annyi dísz legyen a fán, amennyit a tábla mutat (1–9).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { TreeScene } from './AKilencG1Scenes';

const newTarget = (prev?: number) => {
  // a kilences jön a leggyakrabban, de a kisebb számok is előfordulnak
  const r = Math.random();
  let t = r < 0.4 ? 9 : r < 0.55 ? 8 : r < 0.7 ? 7 : 3 + Math.floor(Math.random() * 4);
  if (t === prev) t = t === 9 ? 8 : 9;
  return t;
};

const SAY = 'Nézd a számot a táblán! Annyi díszt akassz a fára. Koppints egy üres karikára, és oda kerül egy dísz. Ha még egyszer rákoppintasz, leveszed.';

export const DecorateTreePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [target, setTarget] = useState(() => newTarget());
  const [hooks, setHooks] = useState<boolean[]>(() => Array(9).fill(false));
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const count = hooks.filter(Boolean).length;
  const say = SAY;

  const toggle = (i: number) => {
    setMsg(null);
    setHooks((h) => h.map((v, k) => (k === i ? !v : v)));
  };
  const check = () => {
    const ok = count === target;
    let t: string;
    if (ok) {
      t = `${randomPraise()} Pont ${target} dísz van a fán.`;
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else if (count < target) {
      t = 'Kevés dísz van a fán. Akassz még!';
    } else {
      t = 'Túl sok dísz van a fán. Vegyél le!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTarget((p) => newTarget(p));
    setHooks(Array(9).fill(false));
    setMsg(null);
  };
  const btn = 'h-14 px-6 rounded-full text-xl font-black';

  return (
    <div className="space-y-3">
      <PotyiBubble text="Annyi dísz, amennyi a szám!" say={say} mood="happy" dots={9} />
      <div className="rounded-3xl border-4 border-emerald-200 bg-emerald-50 p-2">
        <TreeScene filled={hooks} label={target} onHook={toggle} />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={check} className={cn(btn, 'bg-emerald-500 hover:bg-emerald-400 text-white shadow')}>
          Kész ✔
        </button>
        <button type="button" onClick={next} className={cn(btn, 'bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300')}>
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
DecorateTreePlayground.speechTexts = () => [
  SAY,
  ...PRAISES.flatMap((p) => [3, 4, 5, 6, 7, 8, 9].map((t) => `${p} Pont ${t} dísz van a fán.`)),
  "Kevés dísz van a fán. Akassz még!",
  "Túl sok dísz van a fán. Vegyél le!",
];
