import React from 'react';
import {
  ROMAN_FONT,
  toRoman,
  rnd,
  shuffle,
  NumberLinePart,
  LabButton,
  MsgBox,
  ChoiceButton,
  LabMsg
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

/** Számegyenes-labor feladata: egy szám 1 és 20 között (inkább 11–20). */
export const makeLineTarget = (prev?: number): number => {
  for (;;) {
    const t = Math.random() < 0.75 ? rnd(11, 20) : rnd(1, 10);
    if (t !== prev) return t;
  }
};

/** Labor: tedd a jelölőt a római szám helyére a számegyenesen! */
export const RomanLineLab: React.FC = () => {
  const [target, setTarget] = React.useState<number>(14);
  const [pos, setPos] = React.useState<number>(10);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const move = (d: number) => {
    setPos((p) => Math.min(20, Math.max(0, p + d)));
    setMsg(null);
  };
  const check = () => {
    if (pos === target) {
      setMsg({ ok: true, text: `Telitalálat! ${toRoman(target)} = ${target}.` });
      return;
    }
    const tip = target > 10 ? `${toRoman(target)} = X + ${toRoman(target - 10)} = 10 + ${target - 10}.` : '';
    setMsg({
      ok: false,
      text: `A jelölő most itt áll: ${pos}. ${pos < target ? 'Menj jobbra!' : 'Menj balra!'} ${tip}`.trim()
    });
  };
  const next = () => {
    setTarget(makeLineTarget(target));
    setPos(10);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100 text-lg">
        Hol van ez a szám?{' '}
        <span className="text-4xl font-black align-middle ml-2" style={{ fontFamily: ROMAN_FONT }}>
          {toRoman(target)}
        </span>
      </div>
      <svg viewBox="0 0 480 100" className="w-full max-w-[480px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="478" height="98" rx="12" fill="#faf5ff" stroke="#ddd6fe" strokeWidth="2" />
        <NumberLinePart x={20} y={56} w={420} from={0} to={20} />
        <path d={`M ${20 + pos * 21} 46 l -9 -20 h 18 Z`} fill="#7c3aed" stroke="#3b0764" strokeWidth="1.5" />
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton tone="soft" onClick={() => move(-5)}>
          ◀◀ 5
        </LabButton>
        <LabButton tone="soft" onClick={() => move(-1)}>
          ◀ 1
        </LabButton>
        <LabButton tone="blue" onClick={() => move(1)}>
          1 ▶
        </LabButton>
        <LabButton tone="blue" onClick={() => move(5)}>
          5 ▶▶
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

/** Sorba rendező feladat: 4 különböző szám, legalább 3 a 11–20 közül. */
export const makeOrderTask = (): number[] => {
  const set = new Set<number>();
  set.add(rnd(1, 10));
  while (set.size < 4) set.add(rnd(11, 20));
  return shuffle(Array.from(set));
};

/** Labor: koppints a római számokra a legkisebbtől a legnagyobbig! */
export const RomanOrderLab: React.FC = () => {
  const [cards, setCards] = React.useState<number[]>([15, 9, 19, 12]);
  const [picked, setPicked] = React.useState<number[]>([]);
  const [wrong, setWrong] = React.useState<number | null>(null);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const sorted = [...cards].sort((a, b) => a - b);
  const tap = (n: number) => {
    if (picked.includes(n) || picked.length === cards.length) return;
    const need = sorted[picked.length];
    if (n === need) {
      const nextPicked = [...picked, n];
      setPicked(nextPicked);
      setWrong(null);
      if (nextPicked.length === cards.length) {
        setMsg({ ok: true, text: `Kész! ${sorted.map((v) => toRoman(v)).join(' < ')}` });
      } else {
        setMsg(null);
      }
    } else {
      setWrong(n);
      setMsg({
        ok: false,
        text: `${toRoman(n)} = ${n}. Van ennél kisebb is! Írd át fejben mindet arab számmá.`
      });
    }
  };
  const next = () => {
    setCards(makeOrderTask());
    setPicked([]);
    setWrong(null);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100 text-lg">
        Koppints a számokra a <strong>legkisebbtől</strong> a <strong>legnagyobbig</strong>!
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {cards.map((n) => (
          <ChoiceButton
            key={n}
            label={toRoman(n)}
            roman
            onClick={() => tap(n)}
            state={picked.includes(n) ? 'right' : wrong === n ? 'wrong' : 'idle'}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 min-h-[56px] bg-slate-50 dark:bg-slate-800 rounded-xl p-2">
        {picked.length === 0 ? (
          <span className="text-sm text-slate-500">Itt jelenik meg a sorrend.</span>
        ) : (
          picked.map((n, i) => (
            <React.Fragment key={n}>
              {i > 0 && <span className="text-2xl font-black text-slate-500">&lt;</span>}
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300" style={{ fontFamily: ROMAN_FONT }}>
                {toRoman(n)}
              </span>
            </React.Fragment>
          ))
        )}
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
