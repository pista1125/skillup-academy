// „Színesrúd-készlet” – Játszótér: melyik rúd fér pontosan a helyére?
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { RodPic, SlotScene, rodName } from './SzinesrudKeszletG1Scenes';

const newTask = (prev?: number) => {
  let len = 1 + Math.floor(Math.random() * 10);
  if (len === prev) len = (len % 10) + 1;
  const pool = new Set<number>([len]);
  // a rossz válaszok között legyen egy szomszédos hosszúságú is (az a nehéz)
  pool.add(len === 10 ? 9 : len + 1);
  while (pool.size < 4) pool.add(1 + Math.floor(Math.random() * 10));
  const opts = [...pool].sort(() => Math.random() - 0.5);
  return { len, opts };
};

export const RodFitPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [picked, setPicked] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const ask = 'Melyik rúd fér pontosan a helyére?';

  const pick = (l: number) => {
    setPicked(l);
    if (l === task.len) {
      const t = `${randomPraise()} A ${rodName(l)} rúd pont odafér.`;
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = l > task.len ? `A ${rodName(l)} rúd túl hosszú, kilóg. Keress rövidebbet!` : `A ${rodName(l)} rúd túl rövid, marad üres hely. Keress hosszabbat!`;
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t.len));
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} say="Nézd a szaggatott helyet! Melyik rúd fér bele pontosan, se nem lóg ki, se nem marad üres hely?" mood="think" />
      <div className="rounded-3xl bg-white border-4 border-violet-200 p-2">
        <SlotScene len={task.len} />
      </div>
      <div className="grid grid-cols-1 gap-2">
        {task.opts.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => pick(l)}
            className={cn(
              'rounded-2xl border-4 bg-white p-2 active:scale-95',
              picked === l ? (l === task.len ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-sky-200 hover:border-sky-400'
            )}
            aria-label={`${rodName(l)} rúd`}
          >
            <RodPic len={l} />
          </button>
        ))}
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
RodFitPlayground.speechTexts = () => {
  const L = Array.from({ length: 10 }, (_, i) => i + 1);
  return [
    'Nézd a szaggatott helyet! Melyik rúd fér bele pontosan, se nem lóg ki, se nem marad üres hely?',
    ...PRAISES.flatMap((p) => L.map((l) => `${p} A ${rodName(l)} rúd pont odafér.`)),
    ...L.flatMap((l) => [`A ${rodName(l)} rúd túl hosszú, kilóg. Keress rövidebbet!`, `A ${rodName(l)} rúd túl rövid, marad üres hely. Keress hosszabbat!`]),
  ];
};
