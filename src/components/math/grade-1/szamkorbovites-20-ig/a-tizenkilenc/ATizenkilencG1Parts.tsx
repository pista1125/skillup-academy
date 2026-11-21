// „A tizenkilenc” – Játszótér: Eperépítő. Pötyi mond egy számot (11–19); a gyerek kosárból (1 tízes)
// és szem eperből (egyesek) rakja ki, aztán megnyomja a „Kész” gombot.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { BigSign } from '../../shared/G1Pics';
import { BasketIcon, BasketScene, EperIcon } from './ATizenkilencG1Scenes';

const newTarget = (prev?: number): number => {
  for (;;) {
    const t = 11 + Math.floor(Math.random() * 9); // 11–19
    if (t !== prev) return t;
  }
};

const btn = 'h-20 min-w-[88px] px-3 rounded-3xl border-4 flex items-center justify-center gap-1 bg-white dark:bg-slate-800 shadow-sm active:scale-95 transition';

export const EperEpitoPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [target, setTarget] = useState<number>(() => newTarget());
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const tell = (text: string, ok: boolean) => {
    setMsg({ text, ok });
    speak(text);
  };

  const say = `Rakd ki ezt a számot eperből: ${target}. Egy teli kosárban 10 eper van, ez egy tízes. A szem eprek az egyesek. Ha kész vagy, nyomd meg a pipát!`;

  const addBasket = () => {
    if (done) return;
    if (tens >= 1) return tell('Egy kosár elég! Két kosár már 20 lenne.', false);
    setTens(1);
    setMsg(null);
  };
  const addOne = () => {
    if (done) return;
    if (ones >= 9) return tell('Tíz szem eper már egy teli kosár! Tegyél inkább egy kosarat.', false);
    setOnes(ones + 1);
    setMsg(null);
  };
  const removeOne = () => {
    if (done || ones === 0) return;
    setOnes(ones - 1);
    setMsg(null);
  };
  const removeBasket = () => {
    if (done || tens === 0) return;
    setTens(0);
    setMsg(null);
  };

  const check = () => {
    if (done) return;
    const have = tens * 10 + ones;
    if (have === target) {
      tell(`${randomPraise()} 1 tízes és ${ones} egyes: 10 + ${ones} = ${target}.`, true);
      setDone(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else if (tens === 0) {
      tell('Hiányzik a kosár! A tízes is kell.', false);
    } else if (have < target) {
      tell('Ez még kevés. Tegyél még szem epret!', false);
    } else {
      tell('Ez túl sok. Vegyél el egy kicsit!', false);
    }
  };

  const next = () => {
    setTarget(newTarget(target));
    setTens(0);
    setOnes(0);
    setDone(false);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={done ? 'Ügyes vagy!' : `Rakd ki: ${target}`} say={say} mood={done ? 'cheer' : 'think'} dots={10} />
      <div className="rounded-3xl border-4 border-teal-200 bg-teal-50 p-3 space-y-2">
        <div className="flex justify-center">
          <BigSign text={target} className="w-20 h-20" />
        </div>
        <BasketScene tens={tens} ones={ones} label={done ? `10 + ${ones} = ${target}` : undefined} className="w-full max-w-[440px] h-auto mx-auto" />
      </div>
      {msg && <p className={cn('text-center text-xl font-black', msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.text}</p>}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" aria-label="Kosár hozzá" onClick={addBasket} className={cn(btn, 'border-amber-300 hover:border-amber-500')}>
          <span className="text-3xl font-black text-emerald-600">+</span>
          <BasketIcon />
        </button>
        <button type="button" aria-label="Kosár el" onClick={removeBasket} className={cn(btn, 'border-amber-300 hover:border-amber-500')}>
          <span className="text-3xl font-black text-rose-600">−</span>
          <BasketIcon />
        </button>
        <button type="button" aria-label="Eper hozzá" onClick={addOne} className={cn(btn, 'border-rose-300 hover:border-rose-500')}>
          <span className="text-3xl font-black text-emerald-600">+</span>
          <EperIcon />
        </button>
        <button type="button" aria-label="Eper el" onClick={removeOne} className={cn(btn, 'border-rose-300 hover:border-rose-500')}>
          <span className="text-3xl font-black text-rose-600">−</span>
          <EperIcon />
        </button>
        <button type="button" aria-label="Kész" onClick={check} className={cn(btn, 'border-emerald-400 bg-emerald-100 hover:bg-emerald-200 text-4xl font-black text-emerald-700')}>
          ✓
        </button>
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={next} className="h-14 px-6 rounded-full text-xl font-black bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
EperEpitoPlayground.speechTexts = () => {
  const T = Array.from({ length: 9 }, (_, i) => i + 11);
  return [
    ...T.map((t) => `Rakd ki ezt a számot eperből: ${t}. Egy teli kosárban 10 eper van, ez egy tízes. A szem eprek az egyesek. Ha kész vagy, nyomd meg a pipát!`),
    ...PRAISES.flatMap((p) => T.map((t) => `${p} 1 tízes és ${t - 10} egyes: 10 + ${t - 10} = ${t}.`)),
    'Egy kosár elég! Két kosár már 20 lenne.',
    'Tíz szem eper már egy teli kosár! Tegyél inkább egy kosarat.',
    'Hiányzik a kosár! A tízes is kell.',
    'Ez még kevés. Tegyél még szem epret!',
    'Ez túl sok. Vegyél el egy kicsit!',
  ];
};
