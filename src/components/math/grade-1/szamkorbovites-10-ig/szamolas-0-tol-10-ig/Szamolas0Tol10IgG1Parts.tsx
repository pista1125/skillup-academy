// „Számolás 0-tól 10-ig” – Játszótér: Tekézz! A golyó ledönt néhány bábut a 10-ből; hány áll még?
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';
import { PinsScene } from './Szamolas0Tol10IgG1Scenes';

const roll = (prev?: number) => {
  let f = 1 + Math.floor(Math.random() * 9); // 1–9 bábu dől el
  if (f === prev) f = (f % 9) + 1;
  return f;
};

export const BowlingPlayground: React.FC = () => {
  const [fallen, setFallen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const standing = fallen === null ? 10 : 10 - fallen;
  const say = 'A pályán 10 bábu áll. Koppints a Gurítok gombra! Aztán mondd meg, hány bábu áll még.';

  const doRoll = () => {
    const f = roll(fallen ?? undefined);
    setFallen(f);
    setMsg(null);
    speak(`${f} bábu eldőlt. Hány bábu áll még?`);
  };
  const answer = (n: number) => {
    if (fallen === null) return;
    let t: string;
    const ok = n === standing;
    if (ok) {
      t = `${randomPraise()} 10 − ${fallen} = ${standing}. ${standing} bábu áll, ${fallen} eldőlt, ez együtt 10.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      t = 'Nem egészen. Csak az álló bábukat számold, a fekvőket ne!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text="Guríts! Hány bábu áll még?" say={say} mood="happy" dots={10} />
      <div className="rounded-3xl border-4 border-sky-200 bg-sky-50 p-2">
        <PinsScene standing={standing} fallen={fallen ?? 0} ball={fallen === null} />
      </div>
      {fallen !== null && (
        <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
          {Array.from({ length: 11 }, (_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => answer(n)}
              className="h-14 rounded-2xl bg-white border-4 border-sky-300 hover:border-sky-500 text-2xl font-black text-slate-800 active:scale-95"
            >
              {n}
            </button>
          ))}
        </div>
      )}
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex justify-center gap-3">
        <button type="button" onClick={doRoll} className="h-14 px-6 rounded-full bg-violet-500 hover:bg-violet-400 text-white text-xl font-black shadow">
          Gurítok!
        </button>
        <button
          type="button"
          onClick={() => {
            setFallen(null);
            setMsg(null);
          }}
          className="h-14 px-6 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xl font-black border-2 border-sky-300"
        >
          Új feladat
        </button>
      </div>
    </div>
  );
};
