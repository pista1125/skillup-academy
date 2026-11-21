// „Logikai lapok” – Játszótér: Pötyi megnevez egy lapot (nagyság, szín, lyuk, alak), a gyerek megkeresi a hat lap közül.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { Lap, LapColor, LapShape, LapSpec, lapName } from './LogikaiLapokG1Scenes';

const SHAPES: LapShape[] = ['kor', 'negyzet', 'haromszog'];
const COLORS: LapColor[] = ['piros', 'kek', 'sarga', 'zold'];
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const same = (a: LapSpec, b: LapSpec) => a.sh === b.sh && a.c === b.c && !!a.big === !!b.big && !!a.hole === !!b.hole;

const newTask = () => {
  const target: LapSpec = { sh: pick(SHAPES), c: pick(COLORS), big: Math.random() < 0.5, hole: Math.random() < 0.5 };
  // csalik: mindegyik pontosan egy tulajdonságban tér el, aztán véletlen lapok
  const near: LapSpec[] = [
    { ...target, sh: pick(SHAPES.filter((s) => s !== target.sh)) },
    { ...target, c: pick(COLORS.filter((c) => c !== target.c)) },
    { ...target, big: !target.big },
    { ...target, hole: !target.hole },
  ];
  const others: LapSpec[] = [...near];
  while (others.length < 5) {
    const r: LapSpec = { sh: pick(SHAPES), c: pick(COLORS), big: Math.random() < 0.5, hole: Math.random() < 0.5 };
    if (!same(r, target) && !others.some((o) => same(o, r))) others.push(r);
  }
  return { target, tiles: shuffle([target, ...others]) };
};

export const FindTilePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [solved, setSolved] = useState(false);
  const ask = `Keresd meg: ${lapName(task.target)}!`;

  const tap = (l: LapSpec) => {
    if (solved) return;
    if (same(l, task.target)) {
      const t = randomPraise();
      setMsg({ text: t, ok: true });
      setSolved(true);
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      return;
    }
    const t = task.target;
    const why =
      l.sh !== t.sh ? 'Nézd meg az alakját!' : l.c !== t.c ? 'Nézd meg a színét!' : !!l.big !== !!t.big ? (t.big ? 'Ez kicsi. Nagyot keresünk!' : 'Ez nagy. Kicsit keresünk!') : t.hole ? 'Ez nem lyukas. Lyukasat keresünk!' : 'Ez lyukas. Olyat keresünk, ami nem lyukas!';
    setMsg({ text: why, ok: false });
    speak(why);
  };
  const next = () => {
    const t = newTask();
    setTask(t);
    speak(`Keresd meg: ${lapName(t.target)}!`);
    setMsg(null);
    setSolved(false);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} mood="happy" />
      <div className="grid grid-cols-3 gap-2">
        {task.tiles.map((l, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tap(l)}
            className={cn('rounded-2xl border-4 bg-white p-1 active:scale-95 flex justify-center', solved && same(l, task.target) ? 'border-emerald-500 ring-4 ring-emerald-300' : 'border-sky-200 hover:border-sky-400')}
            aria-label={lapName(l)}
          >
            <Lap {...l} frame={false} className="w-full max-w-[120px] h-auto" />
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
FindTilePlayground.speechTexts = () => {
  const names = SHAPES.flatMap((sh) => COLORS.flatMap((c) => [true, false].flatMap((big) => [true, false].map((hole) => `Keresd meg: ${lapName({ sh, c, big, hole })}!`))));
  return [...PRAISES, ...names, 'Nézd meg az alakját!', 'Nézd meg a színét!', 'Ez kicsi. Nagyot keresünk!', 'Ez nagy. Kicsit keresünk!', 'Ez nem lyukas. Lyukasat keresünk!', 'Ez lyukas. Olyat keresünk, ami nem lyukas!'];
};
