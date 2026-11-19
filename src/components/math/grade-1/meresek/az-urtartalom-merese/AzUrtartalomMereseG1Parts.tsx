// „Az űrtartalom mérése” – Játszótér: tölts a mérőedénybe! Pötyi megmondja, hány deciliter kell; a gyerek 1 dl-es poharanként önti bele a vizet.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { glass, measureJug } from './AzUrtartalomMereseG1Scenes';

const newTarget = (prev?: number) => {
  let n: number;
  do n = 2 + Math.floor(Math.random() * 8);
  while (n === prev);
  return n;
};

export const FillJugPlayground: React.FC = () => {
  const [target, setTarget] = useState(() => newTarget());
  const [dl, setDl] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [done, setDone] = useState(false);

  const change = (d: number) => {
    if (done) return;
    setDl((v) => Math.max(0, Math.min(10, v + d)));
    setMsg(null);
  };
  const check = () => {
    if (done) return;
    if (dl === target) {
      const t = `${randomPraise()} Pontosan ${target} deciliter víz van a mérőedényben.${target === 10 ? ' Ez 1 liter!' : ''}`;
      setMsg({ text: t, ok: true });
      setDone(true);
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = dl < target ? 'Még kevés! Számold meg a vonalakat alulról, és önts még bele!' : 'Túl sok lett! Önts ki egy pohárral!';
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTarget((t) => newTarget(t));
    setDl(0);
    setMsg(null);
    setDone(false);
  };

  const btn = 'flex-1 min-h-[72px] rounded-3xl border-4 bg-white flex items-center justify-center gap-2 active:scale-95 text-lg sm:text-xl font-black text-slate-800';
  return (
    <div className="space-y-3">
      <PotyiBubble text={`Tölts bele ${target} dl vizet!`} say={`Tölts a mérőedénybe ${target} deciliter vizet! Minden pohár 1 deciliter. Ha kész vagy, koppints a Kész gombra!`} mood="think" />
      <div className="rounded-3xl border-4 border-sky-200 bg-white p-2 flex justify-center items-end gap-4">
        <svg viewBox="0 0 120 200" className="w-40 h-auto">
          {measureJug(52, 190, 176, dl)}
        </svg>
        <div className="text-5xl font-black text-indigo-700 pb-6">{target} dl</div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => change(-1)} className={cn(btn, 'border-slate-300 hover:border-slate-500')}>
          − 1 dl
        </button>
        <button type="button" onClick={() => change(1)} className={cn(btn, 'border-sky-300 hover:border-sky-500')}>
          <svg viewBox="0 0 30 40" className="w-6 h-8">
            {glass(15, 36, 22, 30, 0.8)}
          </svg>
          + 1 dl
        </button>
        <button type="button" onClick={check} className={cn(btn, 'border-emerald-300 hover:border-emerald-500')}>
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
