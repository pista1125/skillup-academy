// „A négy” – Játszótér: Színezd a korongokat! (a 4 bontásai: 4|0, 3|1, 2|2, 1|3, 0|4)
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { NumberHouse } from './ANegyG1Scenes';

const newTarget = (total: number, prev?: number) => {
  let t = Math.floor(Math.random() * (total + 1));
  if (t === prev) t = (t + 1) % (total + 1);
  return t;
};

/** A gyerek koppintással pirosra/kékre színezi a korongokat, hogy pontosan `target` piros legyen. */
export const SplitPlayground: React.FC<{ total?: number }> & { speechTexts?: () => string[] } = ({ total = 4 }) => {
  const [target, setTarget] = useState(() => newTarget(total));
  const [red, setRed] = useState<boolean[]>(() => Array(total).fill(false));
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const reds = red.filter(Boolean).length;
  const ask = target === 0 ? 'Egy piros se legyen!' : `Legyen ${target} piros!`;
  const say = `${total} korong van. ${target === 0 ? 'Egyik se legyen piros, mind legyen kék!' : `Koppints a korongokra! ${target} legyen piros, a többi kék.`}`;

  const toggle = (i: number) => {
    setMsg(null);
    setRed((r) => r.map((v, k) => (k === i ? !v : v)));
  };
  const check = () => {
    let t: string;
    const ok = reds === target;
    if (ok) {
      t = `${randomPraise()} ${target} piros és ${total - target} kék. Ez együtt ${total}.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (reds < target) {
      t = 'Még kevés a piros. Koppints egy kék korongra!';
    } else {
      t = 'Túl sok a piros. Koppints egy piros korongra, hogy kék legyen!';
    }
    setMsg({ text: t, ok });
    speak(t);
  };
  const next = () => {
    setTarget((t) => newTarget(total, t));
    setRed(Array(total).fill(false));
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} say={say} mood="happy" dots={total} />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex gap-2 rounded-3xl border-4 border-slate-200 bg-white p-3">
          {red.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn('w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-slate-900 active:scale-95 transition', r ? 'bg-red-500' : 'bg-blue-500')}
              aria-label={r ? 'piros korong' : 'kék korong'}
            />
          ))}
        </div>
        {msg?.ok && <NumberHouse top={total} left={reds} right={total - reds} className="w-28 h-28" />}
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

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). A lecke total={4}-gyel használja. */
SplitPlayground.speechTexts = () => {
  const total = 4;
  const out: string[] = [
    'Még kevés a piros. Koppints egy kék korongra!',
    'Túl sok a piros. Koppints egy piros korongra, hogy kék legyen!',
  ];
  for (let target = 0; target <= total; target++) {
    out.push(`${total} korong van. ${target === 0 ? 'Egyik se legyen piros, mind legyen kék!' : `Koppints a korongokra! ${target} legyen piros, a többi kék.`}`);
    out.push(...PRAISES.map((p) => `${p} ${target} piros és ${total - target} kék. Ez együtt ${total}.`));
  }
  return out;
};
