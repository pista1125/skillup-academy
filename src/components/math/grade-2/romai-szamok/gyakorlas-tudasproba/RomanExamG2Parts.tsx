import React from 'react';
import {
  ROMAN_FONT,
  toRoman,
  rnd,
  shuffle,
  romanDistractors,
  romanProblem,
  isValidRoman,
  rawRomanValue,
  RomanClockPart,
  LabButton,
  MsgBox,
  ChoiceButton,
  LabMsg
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

/** Római szám felbontása gyerekbarát szöveggel, pl. XIV = X + IV = 10 + 4 = 14. */
export const romanBreakdown = (n: number): string => {
  const r = toRoman(n);
  if (n === 1) return 'I = 1';
  if (n <= 3) return `${r} = ${Array(n).fill('1').join(' + ')} = ${n}`;
  if (n === 4) return 'IV = 5 − 1 = 4';
  if (n === 5) return 'V = 5';
  if (n <= 8) return `${r} = 5 + ${n - 5} = ${n}`;
  if (n === 9) return 'IX = 10 − 1 = 9';
  if (n === 10) return 'X = 10';
  if (n === 20) return 'XX = 10 + 10 = 20';
  return `${r} = X + ${toRoman(n - 10)} = 10 + ${n - 10} = ${n}`;
};

export type ExamTaskKind = 'read' | 'write' | 'compare' | 'clock' | 'calc';

export const ROMAN_EXAM_TASK_KINDS: { id: ExamTaskKind; label: string }[] = [
  { id: 'read', label: 'Olvasd ki!' },
  { id: 'write', label: 'Írd rómaiul!' },
  { id: 'compare', label: '<, >, =' },
  { id: 'clock', label: 'Római óra' },
  { id: 'calc', label: 'Számolj!' }
];

export interface RomanExamTask {
  kind: ExamTaskKind;
  prompt: string;
  show: string;
  hour?: number;
  options: string[];
  answer: string;
  answerValue: number;
  hint: string;
}

const fillNumbers = (n: number, cands: number[]): string[] => {
  const out = Array.from(new Set(cands.filter((v) => v !== n && v >= 1 && v <= 20)));
  while (out.length < 3) {
    const v = rnd(1, 20);
    if (v !== n && !out.includes(v)) out.push(v);
  }
  return shuffle(out).slice(0, 3).map(String);
};

export const makeRomanExamTask = (kind: ExamTaskKind): RomanExamTask => {
  if (kind === 'read') {
    const n = rnd(1, 20);
    const r = toRoman(n);
    const wrong = fillNumbers(n, [n - 1, n + 1, r.endsWith('IV') || r.endsWith('IX') ? n + 2 : n - 2, n > 10 ? n - 10 : n + 10]);
    return {
      kind,
      prompt: 'Mennyi ez a római szám?',
      show: r,
      options: shuffle([String(n), ...wrong]),
      answer: String(n),
      answerValue: n,
      hint: `${romanBreakdown(n)}. Nézd meg, hol áll az I!`
    };
  }
  if (kind === 'write') {
    const n = rnd(1, 20);
    const right = toRoman(n);
    const wrong = shuffle(romanDistractors(n)).slice(0, 3);
    while (wrong.length < 3) {
      const r = toRoman(rnd(1, 20));
      if (r !== right && !wrong.includes(r)) wrong.push(r);
    }
    return {
      kind,
      prompt: 'Melyik római szám ér ennyit?',
      show: String(n),
      options: shuffle([right, ...wrong]),
      answer: right,
      answerValue: n,
      hint: `Bontsd fel: ${romanBreakdown(n)}.`
    };
  }
  if (kind === 'compare') {
    const a = rnd(1, 20);
    const b = Math.random() < 0.15 ? a : rnd(1, 20);
    const sign = a < b ? '<' : a > b ? '>' : '=';
    return {
      kind,
      prompt: 'Melyik jel kerül a két szám közé?',
      show: `${toRoman(a)}  ?  ${toRoman(b)}`,
      options: ['<', '>', '='],
      answer: sign,
      answerValue: a,
      hint: `Írd át: ${toRoman(a)} = ${a}, ${toRoman(b)} = ${b}.`
    };
  }
  if (kind === 'clock') {
    const h = rnd(1, 12);
    // tipikus hiba: tükörkép (12 − h), szomszéd órák
    const uniq = Array.from(
      new Set([12 - h, h + 1, h - 1, h + 2, h - 2].map((v) => String(((v - 1 + 12) % 12) + 1)).filter((v) => v !== String(h)))
    );
    const mirror = String(((12 - h - 1 + 12) % 12) + 1);
    const first = uniq.includes(mirror) ? [mirror, ...shuffle(uniq.filter((u) => u !== mirror))] : shuffle(uniq);
    uniq.splice(0, uniq.length, ...first);
    return {
      kind,
      prompt: 'Hány órát mutat az óra?',
      show: '',
      hour: h,
      options: shuffle([String(h), ...uniq.slice(0, 3)]),
      answer: String(h),
      answerValue: h,
      hint: `A piros kismutató a ${toRoman(h)} jelre mutat. ${romanBreakdown(h)}.`
    };
  }
  // calc
  for (;;) {
    const plus = Math.random() < 0.5;
    const a = rnd(plus ? 1 : 5, plus ? 15 : 20);
    const b = rnd(1, plus ? 20 - a : a - 1);
    if (b < 1) continue;
    const res = plus ? a + b : a - b;
    if (res < 1 || res > 20) continue;
    const wrong = fillNumbers(res, [plus ? Math.abs(a - b) : a + b, res + 1, res - 1, res + 10, res - 10]);
    return {
      kind,
      prompt: 'Írd át arab számmá, és számolj!',
      show: `${toRoman(a)} ${plus ? '+' : '−'} ${toRoman(b)}`,
      options: shuffle([String(res), ...wrong]),
      answer: String(res),
      answerValue: res,
      hint: `${toRoman(a)} = ${a}, ${toRoman(b)} = ${b}. ${a} ${plus ? '+' : '−'} ${b} = ?`
    };
  }
};

/** Labor I: vegyes feladatgenerátor. */
export const RomanMixedLab: React.FC = () => {
  const [kind, setKind] = React.useState<ExamTaskKind | 'mix'>('mix');
  const [task, setTask] = React.useState<RomanExamTask>(() => makeRomanExamTask('read'));
  const [picked, setPicked] = React.useState<string | null>(null);
  const [msg, setMsg] = React.useState<LabMsg>(null);
  const [score, setScore] = React.useState({ ok: 0, all: 0 });

  const newTask = (k: ExamTaskKind | 'mix' = kind) => {
    const real = k === 'mix' ? ROMAN_EXAM_TASK_KINDS[rnd(0, ROMAN_EXAM_TASK_KINDS.length - 1)].id : k;
    setTask(makeRomanExamTask(real));
    setPicked(null);
    setMsg(null);
  };
  const pick = (o: string) => {
    if (picked === task.answer) return;
    const first = picked === null;
    setPicked(o);
    if (o === task.answer) {
      if (first) setScore((s) => ({ ok: s.ok + 1, all: s.all + 1 }));
      setMsg({ ok: true, text: 'Helyes! Jöhet a következő?' });
    } else {
      if (first) setScore((s) => ({ ok: s.ok, all: s.all + 1 }));
      setMsg({ ok: false, text: `Még nem. Segítség: ${task.hint}` });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {[{ id: 'mix' as const, label: 'Vegyes' }, ...ROMAN_EXAM_TASK_KINDS].map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => {
              setKind(k.id);
              newTask(k.id);
            }}
            className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${
              kind === k.id
                ? 'bg-amber-500 text-white border-amber-700'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <div className="text-right text-sm font-bold text-amber-800 dark:text-amber-200">
        Első próbára jó: {score.ok} / {score.all}
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-4 text-center space-y-2">
        <p className="text-lg font-bold text-amber-950 dark:text-amber-100">{task.prompt}</p>
        {task.kind === 'clock' && task.hour ? (
          <svg viewBox="0 0 200 200" className="w-full max-w-[220px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            <RomanClockPart cx={100} cy={100} r={84} hour={task.hour} />
          </svg>
        ) : (
          <p
            className="text-5xl font-black text-amber-950 dark:text-amber-100"
            style={task.kind === 'write' ? undefined : { fontFamily: ROMAN_FONT }}
          >
            {task.show}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {task.options.map((o) => (
          <ChoiceButton
            key={o}
            label={task.kind === 'clock' ? `${o} óra` : o}
            roman={task.kind === 'write'}
            onClick={() => pick(o)}
            state={picked === o ? (o === task.answer ? 'right' : 'wrong') : 'idle'}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <LabButton tone="soft" onClick={() => newTask()}>
          Új feladat
        </LabButton>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

const BAD_ROMANS = ['IIII', 'VV', 'IIX', 'VX', 'XIIII', 'VIIII', 'IIV', 'XVV', 'VIV', 'XIIX'];

export const makeValidityTask = (prev?: string): string => {
  for (;;) {
    const s = Math.random() < 0.5 ? toRoman(rnd(1, 20)) : BAD_ROMANS[rnd(0, BAD_ROMANS.length - 1)];
    if (s !== prev) return s;
  }
};

/** Labor II: Szabályos vagy hibás? */
export const RomanValidityLab: React.FC = () => {
  const [s, setS] = React.useState<string>('XIIII');
  const [answered, setAnswered] = React.useState<boolean>(false);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const valid = isValidRoman(s);
  const answer = (sayValid: boolean) => {
    setAnswered(true);
    if (sayValid === valid) {
      setMsg({
        ok: true,
        text: valid ? `Igen, szabályos! ${s} = ${rawRomanValue(s)}.` : `Igen, hibás! ${romanProblem(s) ?? ''}`
      });
    } else {
      setMsg({
        ok: false,
        text: valid ? `Ez szabályos: ${s} = ${rawRomanValue(s)}.` : `Ez hibás. ${romanProblem(s) ?? ''}`
      });
    }
  };
  const next = () => {
    setS(makeValidityTask(s));
    setAnswered(false);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-4 text-center space-y-2">
        <p className="text-lg font-bold text-sky-950 dark:text-sky-100">Jól írták ezt a római számot?</p>
        <p className="text-5xl font-black text-sky-950 dark:text-sky-100" style={{ fontFamily: ROMAN_FONT }}>
          {s}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <LabButton tone="green" onClick={() => answer(true)} disabled={answered}>
          Szabályos ✓
        </LabButton>
        <LabButton tone="red" onClick={() => answer(false)} disabled={answered}>
          Hibás ✗
        </LabButton>
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
