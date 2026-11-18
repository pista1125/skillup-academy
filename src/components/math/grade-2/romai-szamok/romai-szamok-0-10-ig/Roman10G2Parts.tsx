import React from 'react';
import {
  ROMAN_FONT,
  toRoman,
  rnd,
  shuffle,
  romanDistractors,
  RomanClockPart,
  LabButton,
  MsgBox,
  ChoiceButton,
  LabMsg
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

export interface ConvertTask {
  n: number;
  dir: 'toRoman' | 'toArabic';
  options: string[];
}

/** Arab számok disztraktorai (gyakori hiba: szomszéd, IV/VI csere, IX/XI csere). */
const arabicDistractors = (n: number, min: number, max: number): number[] => {
  const s = new Set<number>();
  const r = toRoman(n);
  if (r.endsWith('IV')) s.add(n + 2);
  if (r.endsWith('VI')) s.add(n - 2);
  if (r.endsWith('IX')) s.add(n + 2);
  if (r.endsWith('XI')) s.add(n - 2);
  s.add(n - 1);
  s.add(n + 1);
  s.add(n + 10);
  s.add(n - 10);
  s.add(r.length);
  return Array.from(s).filter((v) => v !== n && v >= Math.max(1, min - 2) && v <= Math.min(20, max + 2));
};

export const makeConvertTask = (min: number, max: number): ConvertTask => {
  const n = rnd(min, max);
  const dir = Math.random() < 0.5 ? 'toRoman' : 'toArabic';
  const lo = Math.max(1, min - 2);
  const hi = Math.min(20, max + 2);
  if (dir === 'toRoman') {
    const wrongR = shuffle(romanDistractors(n)).slice(0, 3);
    while (wrongR.length < 3) {
      const r = toRoman(rnd(lo, hi));
      if (r !== toRoman(n) && !wrongR.includes(r)) wrongR.push(r);
    }
    return { n, dir, options: shuffle([toRoman(n), ...wrongR]) };
  }
  const wrong = shuffle(arabicDistractors(n, min, max)).slice(0, 3);
  while (wrong.length < 3) {
    const v = rnd(lo, hi);
    if (v !== n && !wrong.includes(v)) wrong.push(v);
  }
  return { n, dir, options: shuffle([String(n), ...wrong.map(String)]) };
};

/** Labor: átváltó játék (arab ↔ római). */
export const ConverterLab: React.FC<{ min?: number; max?: number }> = ({ min = 1, max = 10 }) => {
  const [task, setTask] = React.useState<ConvertTask>(() => makeConvertTask(min, max));
  const [picked, setPicked] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<LabMsg>(null);
  const [streak, setStreak] = React.useState(0);

  const right = task.dir === 'toRoman' ? toRoman(task.n) : String(task.n);
  const pick = (o: string) => {
    if (picked === right) return;
    setPicked(o);
    if (o === right) {
      setStreak((s) => s + 1);
      setMsg({ ok: true, text: `Ügyes! ${toRoman(task.n)} = ${task.n}.` });
    } else {
      setStreak(0);
      const v = task.dir === 'toRoman' ? null : Number(o);
      setMsg({
        ok: false,
        text:
          task.dir === 'toRoman'
            ? 'Nem ez. Bontsd fel a számot: van benne 10? Van benne 5? Próbáld újra!'
            : `Nem ${v}. Nézd meg, hol áll az I: balra elvesz, jobbra hozzáad!`
      });
    }
  };
  const next = () => {
    let t = makeConvertTask(min, max);
    while (t.n === task.n && t.dir === task.dir) t = makeConvertTask(min, max);
    setTask(t);
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center text-sm font-bold text-emerald-800 dark:text-emerald-200">
        <span>{task.dir === 'toRoman' ? 'Írd rómaiul!' : 'Mennyi ez?'}</span>
        <span>Sorozat: {streak}</span>
      </div>
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-4 text-center">
        <span
          className="text-5xl font-black text-emerald-950 dark:text-emerald-100"
          style={task.dir === 'toArabic' ? { fontFamily: ROMAN_FONT } : undefined}
        >
          {task.dir === 'toRoman' ? task.n : toRoman(task.n)}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {task.options.map((o) => (
          <ChoiceButton
            key={o}
            label={o}
            roman={task.dir === 'toRoman'}
            onClick={() => pick(o)}
            state={picked === o ? (o === right ? 'right' : 'wrong') : 'idle'}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <LabButton tone="soft" onClick={next}>
          Új feladat
        </LabButton>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

/** Labor: római óra – állítsd be a kismutatót! (egész órák) */
export const ClockSetLab: React.FC<{ minHour?: number; maxHour?: number; first?: number }> = ({
  minHour = 1,
  maxHour = 10,
  first = 7
}) => {
  const [target, setTarget] = React.useState<number>(first);
  const [hour, setHour] = React.useState<number>(12);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const move = (d: number) => {
    setHour((h) => ((h - 1 + d + 12) % 12) + 1);
    setMsg(null);
  };
  const check = () => {
    if (hour === target) {
      setMsg({ ok: true, text: `Pontos! A kismutató a ${toRoman(target)} jelre mutat: ${target} óra.` });
    } else {
      setMsg({
        ok: false,
        text: `A kismutató most a ${toRoman(hour)} jelen áll, ez ${hour} óra. ${hour < target ? 'Forgasd tovább!' : 'Forgasd vissza!'}`
      });
    }
  };
  const next = () => {
    let t = target;
    while (t === target) t = rnd(minHour, maxHour);
    setTarget(t);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-3 text-center text-blue-950 dark:text-blue-100 text-lg">
        Állítsd az órát erre: <span className="text-3xl font-black align-middle ml-2">{target} óra</span>
      </div>
      <svg viewBox="0 0 220 220" className="w-full max-w-[260px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
        <RomanClockPart cx={110} cy={110} r={92} hour={hour} />
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        <LabButton tone="soft" onClick={() => move(-1)}>
          ↺ vissza 1 órát
        </LabButton>
        <LabButton tone="blue" onClick={() => move(1)}>
          tovább 1 órát ↻
        </LabButton>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton onClick={check}>Ellenőrzés</LabButton>
        <LabButton tone="soft" onClick={next}>
          Új feladat
        </LabButton>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
