// „Összehasonlítások” – Játszótér: Pötyi mérőversenye. Véletlen tulajdonság (magas, hosszú, nagy, széles, vastag),
// a gyerek a legnagyobbra vagy a legkisebbre koppint.
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { PotyiBubble, shuffle } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { Branch, Disc, Road, Ribbon, Tree } from './OsszehasonlitasokG1Scenes';

type Prop = 'magas' | 'hosszu' | 'nagy' | 'szeles' | 'vastag';

const WORDS: Record<Prop, { most: string; least: string; mostHint: string; leastHint: string }> = {
  magas: { most: 'Koppints a legmagasabb fára!', least: 'Koppints a legalacsonyabb fára!', mostHint: 'Nézd meg, melyik ér a legfeljebb!', leastHint: 'Nézd meg, melyik marad a legalul!' },
  hosszu: { most: 'Koppints a leghosszabb szalagra!', least: 'Koppints a legrövidebb szalagra!', mostHint: 'Mind ugyanott kezdődik. Melyik ér a legmesszebbre?', leastHint: 'Mind ugyanott kezdődik. Melyik ér véget a leghamarabb?' },
  nagy: { most: 'Koppints a legnagyobb körre!', least: 'Koppints a legkisebb körre!', mostHint: 'Melyik foglal el a legtöbb helyet?', leastHint: 'Melyik a legpicibb?' },
  szeles: { most: 'Koppints a legszélesebb útra!', least: 'Koppints a legkeskenyebb útra!', mostHint: 'Melyiken férne el a legtöbb autó egymás mellett?', leastHint: 'Melyik a legvékonyabb csík?' },
  vastag: { most: 'Koppints a legvastagabb ágra!', least: 'Koppints a legvékonyabb ágra!', mostHint: 'Melyik ág a legerősebb, legkövérebb?', leastHint: 'Melyik ág a legvékonyabb, mint egy szál?' },
};
const PROPS = Object.keys(WORDS) as Prop[];

const draw = (p: Prop, v: number) => {
  switch (p) {
    case 'magas':
      return <Tree h={v} className="w-full h-auto" />;
    case 'hosszu':
      return <Ribbon len={v} className="w-full h-auto" />;
    case 'nagy':
      return <Disc r={8 + 32 * v} className="w-full h-auto" />;
    case 'szeles':
      return <Road w={v} className="w-full h-auto" />;
    case 'vastag':
      return <Branch t={3 + 15 * v} className="w-full h-auto" />;
  }
};

const newTask = (prevProp?: Prop) => {
  let p = PROPS[Math.floor(Math.random() * PROPS.length)];
  if (p === prevProp) p = PROPS[(PROPS.indexOf(p) + 1) % PROPS.length];
  const count = 3 + Math.floor(Math.random() * 2);
  const values = shuffle([0.25, 0.45, 0.65, 0.85, 1].slice(0, 5)).slice(0, count);
  return { p, values, most: Math.random() < 0.5 };
};

export const CompareRacePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [solved, setSolved] = useState(false);
  const w = WORDS[task.p];
  const target = task.most ? Math.max(...task.values) : Math.min(...task.values);

  const tap = (v: number) => {
    if (solved) return;
    if (v === target) {
      const t = randomPraise();
      setMsg({ text: t, ok: true });
      setSolved(true);
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = task.most ? w.mostHint : w.leastHint;
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t.p));
    setMsg(null);
    setSolved(false);
  };

  return (
    <div className="space-y-3">
      <PotyiBubble text={task.most ? w.most : w.least} mood="happy" />
      <div className={cn('grid gap-2', task.values.length === 3 ? 'grid-cols-3' : 'grid-cols-4')}>
        {task.values.map((v, i) => (
          <button
            key={`${task.p}-${i}`}
            type="button"
            onClick={() => tap(v)}
            className={cn('rounded-2xl border-4 bg-white p-1 active:scale-95', solved && v === target ? 'border-emerald-500 ring-4 ring-emerald-300' : 'border-sky-200 hover:border-sky-400')}
            aria-label={`${i + 1}. kép`}
          >
            {draw(task.p, v)}
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
CompareRacePlayground.speechTexts = () => [...PRAISES, ...PROPS.flatMap((p) => [WORDS[p].most, WORDS[p].least, WORDS[p].mostHint, WORDS[p].leastHint])];
