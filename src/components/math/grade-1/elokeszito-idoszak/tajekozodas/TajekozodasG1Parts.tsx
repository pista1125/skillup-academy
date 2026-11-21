// „Tájékozódás” – Játszótér: tedd a tárgyat Pötyi fölé, alá, tőle jobbra vagy balra!
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { ICONS, IconName } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import { PotyiBubble } from '../../shared/MeseKit';
import { speak, randomPraise, PRAISES } from '../../shared/speech';
import { Dir } from './TajekozodasG1Scenes';

const THINGS: { icon: IconName; acc: string }[] = [
  { icon: 'alma', acc: 'az almát' },
  { icon: 'labda', acc: 'a labdát' },
  { icon: 'virag', acc: 'a virágot' },
  { icon: 'csillag', acc: 'a csillagot' },
  { icon: 'eper', acc: 'az epret' },
  { icon: 'gomba', acc: 'a gombát' },
];
const WHERE: Record<Dir, string> = { up: 'Pötyi fölé', down: 'Pötyi alá', left: 'Pötyitől balra', right: 'Pötyitől jobbra' };
const DIRS: Dir[] = ['up', 'down', 'left', 'right'];
const WRONG: Record<Dir, string> = { up: 'Ez Pötyi fölött van.', down: 'Ez Pötyi alatt van.', left: 'Ez Pötyitől balra van.', right: 'Ez Pötyitől jobbra van.' };

const newTask = (prev?: { dir: Dir; thing: number }) => {
  let dir = DIRS[Math.floor(Math.random() * 4)];
  if (prev && dir === prev.dir) dir = DIRS[(DIRS.indexOf(dir) + 1) % 4];
  const thing = Math.floor(Math.random() * THINGS.length);
  return { dir, thing };
};

export const PlacePlayground: React.FC & { speechTexts?: () => string[] } = () => {
  const [task, setTask] = useState(() => newTask());
  const [placed, setPlaced] = useState<Dir | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const th = THINGS[task.thing];
  const ask = `Tedd ${th.acc} ${WHERE[task.dir]}!`;

  const tap = (d: Dir) => {
    setPlaced(d);
    if (d === task.dir) {
      const t = `${randomPraise()} Pont jó helyre tetted.`;
      setMsg({ text: t, ok: true });
      speak(t);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      const t = `${WRONG[d]} Figyelj még egyszer: ${WHERE[task.dir]} kell!`;
      setMsg({ text: t, ok: false });
      speak(t);
    }
  };
  const next = () => {
    setTask((t) => newTask(t));
    setPlaced(null);
    setMsg(null);
  };

  const cell = (d: Dir) => (
    <button
      type="button"
      onClick={() => tap(d)}
      className={cn(
        'aspect-square rounded-2xl border-4 bg-white flex items-center justify-center active:scale-95',
        placed === d ? (d === task.dir ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-sky-200 hover:border-sky-400'
      )}
      aria-label={WHERE[d]}
    >
      {placed === d && <svg viewBox="0 0 60 60" className="w-4/5 h-4/5">{ICONS[th.icon]({ x: 30, y: 30, s: 1.2 })}</svg>}
    </button>
  );

  return (
    <div className="space-y-3">
      <PotyiBubble text={ask} mood="happy" />
      <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto">
        <div />
        {cell('up')}
        <div />
        {cell('left')}
        <div className="aspect-square rounded-2xl border-4 border-amber-300 bg-amber-50 flex items-center justify-center">
          <Potyi mood="happy" dots={7} className="w-4/5 h-4/5" />
        </div>
        {cell('right')}
        <div />
        {cell('down')}
        <div />
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
PlacePlayground.speechTexts = () => [
  ...THINGS.flatMap((th) => DIRS.map((d) => `Tedd ${th.acc} ${WHERE[d]}!`)),
  ...PRAISES.map((p) => `${p} Pont jó helyre tetted.`),
  ...DIRS.flatMap((d) => DIRS.filter((x) => x !== d).map((x) => `${WRONG[d]} Figyelj még egyszer: ${WHERE[x]} kell!`)),
];
