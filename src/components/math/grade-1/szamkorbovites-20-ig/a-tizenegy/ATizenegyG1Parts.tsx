// „A tizenegy” – Játszótér: Rakd ki korongokkal! Két tízes keret; a gyerek annyi korongot tesz ki, amennyit a szám mutat.
// Először az első keret telik meg (1 tízes), a többi a második keretbe kerül (egyesek).
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { BigSign } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { TwoFrames } from './ATizenegyG1Scenes';

const pickTarget = (max: number, prev?: number) => {
  // leggyakrabban a lecke száma, vagy 10 fölötti szám
  let t: number;
  const r = Math.random();
  if (r < 0.4) t = max;
  else if (r < 0.75) t = 10 + Math.floor(Math.random() * (max - 9));
  else t = 5 + Math.floor(Math.random() * 5);
  if (t === prev) t = t === max ? 10 : max;
  return t;
};

/** Számkirakó két tízes kerettel, 0-tól `max`-ig (max ≤ 20). */
export const FramesBuildLab: React.FC<{ max: number }> = ({ max }) => {
  const [target, setTarget] = useState(() => pickTarget(max));
  const [n, setN] = useState(0);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const say = `Rakj ki ${target} korongot! Előbb az első keretet töltsd meg, a többi a második keretbe megy.`;

  const change = (d: number) => {
    setMsg(null);
    setN((x) => Math.max(0, Math.min(max, x + d)));
  };
  const check = () => {
    const ok = n === target;
    let t: string;
    if (ok) {
      t = target > 10 ? `${randomPraise()} ${target}: 1 tízes és ${target - 10} egyes.` : target === 10 ? `${randomPraise()} Tele az első keret: ez 1 tízes.` : `${randomPraise()} Ez ${target} korong.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (n < target) {
      t = 'Még kevés a korong. Tegyél még!';
    } else {
      t = 'Ez túl sok. Vegyél le egyet!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTarget((p) => pickTarget(max, p));
    setN(0);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Rakd ki korongokkal!" say={say} mood="think" dots={10} />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <BigSign text={target} className="w-24 h-24 shrink-0" color="#be123c" />
        <TwoFrames a={n} className="w-full max-w-[420px] h-auto" />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => change(1)} className="h-14 px-5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 text-xl font-black border-2 border-rose-300" aria-label="Tegyél ki egy korongot">
          ● Még egy
        </button>
        <button type="button" onClick={() => change(-1)} className="h-14 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-black border-2 border-slate-300" aria-label="Vegyél le egy korongot">
          ○ Le egyet
        </button>
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

export const ElevenFramesPlayground: React.FC = () => <FramesBuildLab max={11} />;
