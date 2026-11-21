// „Síkidomok” – Játszótér: Pötyi formavadászata. „Koppints minden háromszögre!” – a gyerek kijelöli az összes kért síkidomot.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { COLORS, ShapeFig, ShapeK } from './SikidomokG1Scenes';

type Main = 'kor' | 'haromszog' | 'negyzet' | 'teglalap';
const ASK: Record<Main, string> = {
  kor: 'Koppints minden körre!',
  haromszog: 'Koppints minden háromszögre!',
  negyzet: 'Koppints minden négyzetre!',
  teglalap: 'Koppints minden téglalapra!',
};
const HINT: Record<Main, string> = {
  kor: 'A kör kerek, nincs sarka.',
  haromszog: 'A háromszögnek három sarka van.',
  negyzet: 'A négyzet négy oldala egyforma hosszú.',
  teglalap: 'A téglalap hosszúkás: két oldala hosszabb, kettő rövidebb.',
};
const MAINS: Main[] = ['kor', 'haromszog', 'negyzet', 'teglalap'];
const PALETTE = Object.values(COLORS);

type Item = { k: ShapeK; color: string; r: number; rot: number; target: boolean };

const newTask = (prev?: Main) => {
  let want = MAINS[Math.floor(Math.random() * MAINS.length)];
  if (want === prev) want = MAINS[(MAINS.indexOf(want) + 1) % MAINS.length];
  const nTarget = 2 + Math.floor(Math.random() * 3); // 2–4
  const others: ShapeK[] = (['kor', 'haromszog', 'negyzet', 'teglalap', 'derekszogu', 'ovalis'] as ShapeK[]).filter(
    (k) => k !== want && !(want === 'haromszog' && k === 'derekszogu')
  );
  const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
  const items: Item[] = [];
  for (let i = 0; i < nTarget; i++) {
    const k: ShapeK = want === 'haromszog' && Math.random() < 0.4 ? 'derekszogu' : want;
    items.push({ k, color: pick(PALETTE), r: 16 + Math.floor(Math.random() * 12), rot: want === 'kor' ? 0 : pick([0, 0, 15, -20, 45]), target: true });
  }
  for (let i = 0; i < 8 - nTarget; i++) {
    items.push({ k: pick(others), color: pick(PALETTE), r: 16 + Math.floor(Math.random() * 12), rot: pick([0, 0, 15, -20]), target: false });
  }
  return { want, items: shuffle(items) };
};

export const ShapeHuntPlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [sel, setSel] = useState<number[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const toggle = (i: number) => {
    setMsg(null);
    setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  };
  const check = () => {
    const wrong = sel.filter((i) => !task.items[i].target).length;
    const missing = task.items.filter((it, i) => it.target && !sel.includes(i)).length;
    let t: string;
    if (!wrong && !missing) {
      t = `${randomPraise()} Mind a ${sel.length} megvan.`;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (wrong) {
      t = `Van, amelyik nem ilyen. ${HINT[task.want]} Koppints rá még egyszer, hogy levedd!`;
    } else {
      t = `Még ${missing} hiányzik. Keresd tovább!`;
    }
    setMsg({ text: t, ok: !wrong && !missing });
    speak(t);
  };
  const next = () => {
    setTask((t) => newTask(t.want));
    setSel([]);
    setMsg(null);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ASK[task.want]} say={`${ASK[task.want]} ${HINT[task.want]}`} mood="happy" />
      <div className="grid grid-cols-4 gap-2">
        {task.items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={cn('aspect-square rounded-2xl border-4 bg-white flex items-center justify-center active:scale-95', sel.includes(i) ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-sky-200 hover:border-sky-400')}
            aria-label={`${i + 1}. forma`}
          >
            <ShapeFig k={it.k} color={it.color} r={it.r} rot={it.rot} frame={false} className="w-full h-full" />
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
ShapeHuntPlayground.speechTexts = () => [
  ...MAINS.flatMap((m) => [`${ASK[m]} ${HINT[m]}`, `Van, amelyik nem ilyen. ${HINT[m]} Koppints rá még egyszer, hogy levedd!`]),
  ...[2, 3, 4].flatMap((n) => PRAISES.map((p) => `${p} Mind a ${n} megvan.`)),
  ...[1, 2, 3, 4].map((n) => `Még ${n} hiányzik. Keresd tovább!`),
];
