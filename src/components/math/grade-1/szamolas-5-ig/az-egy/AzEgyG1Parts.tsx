// „Az egy” – Játszótér: tegyél pontosan EGY tárgyat a kosárba.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { ICONS, IconName } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';

const KINDS: { icon: IconName; name: string }[] = [
  { icon: 'alma', name: 'almát' },
  { icon: 'labda', name: 'labdát' },
  { icon: 'virag', name: 'virágot' },
  { icon: 'hal', name: 'halat' },
  { icon: 'eper', name: 'epret' },
];

const newTask = (prev?: number) => {
  let k = Math.floor(Math.random() * KINDS.length);
  if (k === prev) k = (k + 1) % KINDS.length;
  return { kind: k, total: 3 + Math.floor(Math.random() * 3) };
};

export const OneTapPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [inBasket, setInBasket] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const kind = KINDS[task.kind];
  const ask = `Tegyél egy ${kind.name} a kosárba!`;

  const toggle = (i: number) => {
    setMsg(null);
    setInBasket((b) => (b.includes(i) ? b.filter((x) => x !== i) : [...b, i]));
  };
  const check = () => {
    if (inBasket.length === 1) {
      const t = randomPraise() + ' Egy van a kosárban.';
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = inBasket.length === 0 ? 'A kosár még üres. Tegyél bele egyet!' : 'Ez több, mint egy. Vegyél ki belőle!';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t.kind));
    setInBasket([]);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} mood="happy" dots={1} />
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: task.total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={cn('aspect-square rounded-2xl border-4 bg-white flex items-center justify-center active:scale-95', inBasket.includes(i) ? 'opacity-25 border-slate-200' : 'border-sky-200 hover:border-sky-400')}
            aria-label={`${i + 1}. tárgy`}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">{ICONS[kind.icon]({ x: 30, y: 30, s: 1.2 })}</svg>
          </button>
        ))}
      </div>
      <div className="rounded-3xl border-4 border-dashed border-amber-400 bg-amber-50 min-h-[110px] p-2 flex items-center justify-center gap-2">
        <span className="text-4xl">🧺</span>
        {inBasket.map((i) => (
          <button key={i} type="button" onClick={() => toggle(i)} className="w-16 h-16" aria-label="Kiveszem">
            <svg viewBox="0 0 60 60" className="w-full h-full">{ICONS[kind.icon]({ x: 30, y: 30, s: 1.2 })}</svg>
          </button>
        ))}
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
OneTapPlayground.speechTexts = () => [
  ...KINDS.map((k) => `Tegyél egy ${k.name} a kosárba!`),
  'A kosár még üres. Tegyél bele egyet!',
  'Ez több, mint egy. Vegyél ki belőle!',
  ...PRAISES.map((p) => p + ' Egy van a kosárban.'),
];
