// „Kivonás 0-tól 5-ig” – Játszótér: húzd át, amennyit Pötyi kér, aztán mondd meg, mennyi maradt.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { ICONS, IconName } from '../../shared/G1Pics';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise } from '../../shared/speech';

const KINDS: IconName[] = ['eper', 'alma', 'madar', 'gomba', 'hal', 'meh'];

type Task = { k: number; a: number; b: number };

const newTask = (prev?: Task): Task => {
  let k = Math.floor(Math.random() * KINDS.length);
  if (prev && k === prev.k) k = (k + 1) % KINDS.length;
  const a = 1 + Math.floor(Math.random() * 5); // 1–5
  // a 0 elvétele és a „mindet elvesszük” is előfordul, de ritkábban
  const r = Math.random();
  const b = r < 0.12 ? 0 : r < 0.24 ? a : 1 + Math.floor(Math.random() * Math.max(1, a - 1));
  const t = { k, a, b: Math.min(a, b) };
  if (prev && t.a === prev.a && t.b === prev.b) return newTask(prev);
  return t;
};

/** Tárgyragos alak: 1-et, 2-t, 3-at, 4-et, 5-öt. */
const ACC = ["0-t", "1-et", "2-t", "3-at", "4-et", "5-öt"];

const Cell: React.FC<{ icon: IconName; crossed: boolean }> = ({ icon, crossed }) => (
  <svg viewBox="0 0 60 60" className="w-full h-full">
    <g opacity={crossed ? 0.4 : 1}>{ICONS[icon]({ x: 30, y: 30, s: 1.2 })}</g>
    {crossed && <path d="M8 8 L52 52" stroke="#111827" strokeWidth="6" strokeLinecap="round" />}
  </svg>
);

export const CrossOutPlayground: React.FC = () => {
  const [task, setTask] = useState<Task>(() => newTask());
  const [crossed, setCrossed] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [solved, setSolved] = useState(false);
  const icon = KINDS[task.k];
  const { a, b } = task;
  const ready = crossed.length === b;
  const intro = b === 0 ? `Itt ${a} van. Most nem kell áthúzni semmit! Hány marad?` : `Itt ${a} van. Húzz át ${ACC[b]}! Koppints rájuk!`;

  const toggle = (i: number) => {
    if (solved) return;
    const next = crossed.includes(i) ? crossed.filter((x) => x !== i) : [...crossed, i];
    setCrossed(next);
    setMsg(null);
    if (next.length > b) {
      const t = 'Ez már túl sok! Koppints egy áthúzottra, hogy visszajöjjön.';
      setMsg({ text: t, ok: false });
      speak(t);
    } else if (next.length === b && b > 0) {
      speak('Ügyes! Most számold meg: hány maradt?');
    }
  };

  const answer = (n: number) => {
    if (solved) return;
    let t: string;
    const ok = n === a - b;
    if (ok) {
      t = `${randomPraise()} ${a} − ${b} = ${a - b}. ${a - b === 0 ? 'Nem maradt semmi.' : `${a - b} maradt.`}`;
      setSolved(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    } else if (n === a) {
      t = 'Az áthúzottakat már ne számold! Csak azokat, amelyek maradtak.';
    } else {
      t = 'Számold meg még egyszer! Mutass rá azokra, amelyek nincsenek áthúzva.';
    }
    setMsg({ text: t, ok });
    speak(t);
  };

  const next = () => {
    setTask((t) => newTask(t));
    setCrossed([]);
    setMsg(null);
    setSolved(false);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={b === 0 ? 'Most semmit sem veszünk el!' : `Húzz át ${ACC[b]}!`} say={intro} mood="happy" dots={a} />
      <div className="rounded-3xl border-4 border-orange-300 bg-orange-50 p-3 flex flex-wrap items-center justify-center gap-2 min-h-[110px]">
        {Array.from({ length: a }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={cn('w-20 h-20 rounded-2xl bg-white border-4 active:scale-95', crossed.includes(i) ? 'border-slate-300' : 'border-orange-200 hover:border-orange-400')}
            aria-label={crossed.includes(i) ? 'Áthúzva' : 'Áthúzom'}
          >
            <Cell icon={icon} crossed={crossed.includes(i)} />
          </button>
        ))}
      </div>
      <p className="text-center text-4xl font-black text-slate-800 tracking-wide">
        {a} <span className="text-rose-600">−</span> {b} = <span className={solved ? 'text-emerald-600' : 'text-violet-600'}>{solved ? a - b : '?'}</span>
      </p>
      {ready && (
        <div className="flex flex-wrap justify-center gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => answer(n)}
              className="w-16 h-16 rounded-2xl bg-white border-4 border-sky-300 hover:border-sky-500 text-3xl font-black text-slate-800 active:scale-95"
            >
              {n}
            </button>
          ))}
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
