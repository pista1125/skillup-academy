import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { ThreeStepsSvg, CarryOnesSvg, CarryTensSvg, CarryBothSvg, CheckSwapSvg, ThreeTermsSvg } from './WrittenAddG3Figures';
import { WrittenAddG3Column, addSteps, spokenStep, placePlural, ColDigit } from './WrittenAddG3Column';
import { rnd, art } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Feladatgenerátor: beváltás nélkül / egyeseknél / tízeseknél / mindkettőnél; összeg ≤ 499.
// ---------------------------------------------------------------------------
type CarryKind = 'nincs' | 'egyes' | 'tizes' | 'mindketto';
const KIND_LABEL: Record<CarryKind, string> = {
  nincs: 'Beváltás nélkül',
  egyes: 'Beváltás az egyeseknél',
  tizes: 'Beváltás a tízeseknél',
  mindketto: 'Kétszer beváltás'
};
const makePair = (kind: CarryKind): [number, number] => {
  for (;;) {
    const a = rnd(101, 389);
    const b = rnd(101, 389);
    if (a + b > 499) continue;
    const e = (a % 10) + (b % 10);
    const t = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    const ce = e >= 10 ? 1 : 0;
    const okE = kind === 'egyes' || kind === 'mindketto' ? e >= 10 : e <= 9;
    const okT = kind === 'tizes' || kind === 'mindketto' ? t + ce >= 10 : t + ce <= 9;
    if (okE && okT) return [a, b];
  }
};
const randomKind = (): CarryKind => (['nincs', 'egyes', 'tizes', 'mindketto'] as CarryKind[])[rnd(0, 3)];

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const KeyPad: React.FC<{ onKey: (d: number) => void; bad?: number | null; disabled?: boolean }> = ({ onKey, bad, disabled }) => (
  <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
    {KEYS.map((d) => (
      <button
        key={d}
        disabled={disabled}
        onClick={() => onKey(d)}
        className={`min-h-[52px] rounded-xl text-2xl font-black border-2 transition-colors ${
          bad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
        } disabled:opacity-40`}
      >
        {d}
      </button>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Labor II – Számjegy-nyomozó
// ---------------------------------------------------------------------------
interface Detective { a: number; b: number; row: 0 | 1 | 2; col: number }
const makeDetective = (): Detective => {
  const [a, b] = makePair(randomKind());
  return { a, b, row: rnd(0, 2) as 0 | 1 | 2, col: rnd(0, 2) };
};
const hideDigit = (n: number, col: number) => {
  const s = String(n).padStart(3, ' ').split('');
  s[2 - col] = '?';
  return s.join('');
};
const digitAt = (n: number, col: number) => Math.floor(n / 10 ** col) % 10;
const withDigit = (n: number, col: number, d: number) => n - digitAt(n, col) * 10 ** col + d * 10 ** col;

export const WrittenAddG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: lépésről lépésre ----
  const [kind, setKind] = useState<CarryKind>('mindketto');
  const [pair, setPair] = useState<[number, number]>([168, 275]);
  const [col, setCol] = useState(0); // a következő oszlop (0 = egyesek); 3 = kész
  const [bad, setBad] = useState<number | null>(null);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [showCarry, setShowCarry] = useState(true);
  const [demo, setDemo] = useState(false);
  const steps = addSteps(pair, 3);
  const sum = pair[0] + pair[1];
  const newTask = (k: CarryKind = kind) => {
    setKind(k);
    setPair(makePair(k));
    setCol(0);
    setBad(null);
    setHint('');
    setLog([]);
    setDemo(false);
  };
  const doStep = (c: number) => {
    const st = steps[c];
    setLog((l) => [...l, `${c + 1}. lépés (${placePlural(c)}): ${spokenStep(st)}`]);
    setCol(c + 1);
    setBad(null);
    setHint('');
  };
  const press = (d: number) => {
    if (col >= 3 || demo) return;
    const st = steps[col];
    if (d === st.write) {
      doStep(col);
      return;
    }
    setBad(d);
    const own = st.digits.reduce((x, y) => x + y, 0);
    if (st.carryIn > 0 && d === own % 10) setHint(`Ne felejtsd el a maradékot! ${st.digits.join(' meg ')} az ${own}, meg ${st.carryIn} az ${st.sum}.`);
    else if (st.sum >= 10 && d === Math.floor(st.sum / 10)) setHint(`Csak az egyesek helyén álló jegyet írd le! Az eleje (${Math.floor(st.sum / 10)}) a maradék, azt továbbvisszük.`);
    else setHint(`Add össze: ${st.digits.join(' + ')}${st.carryIn ? ` + ${st.carryIn} (maradék)` : ''} = ?`);
  };
  useEffect(() => {
    if (!demo) return;
    if (col >= 3) {
      setDemo(false);
      return;
    }
    const t = window.setTimeout(() => doStep(col), col === 0 ? 700 : 1600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, col]);
  const startDemo = () => {
    setCol(0);
    setLog([]);
    setBad(null);
    setHint('');
    setDemo(true);
  };
  const resultStr = String(sum)
    .padStart(3, ' ')
    .split('')
    .map((ch, i) => (2 - i < col ? ch : ' '))
    .join('');
  const carries: ColDigit[] = [null, null, null];
  if (showCarry) for (let c = 0; c < Math.min(col, 2); c++) if (steps[c].carryOut) carries[c + 1] = steps[c].carryOut;

  // ---- Labor II: számjegy-nyomozó ----
  const [det, setDet] = useState<Detective>({ a: 157, b: 226, row: 2, col: 1 });
  const [dBad, setDBad] = useState<number | null>(null);
  const [dOk, setDOk] = useState(false);
  const [dMsg, setDMsg] = useState('');
  const [streak, setStreak] = useState(0);
  const dSum = det.a + det.b;
  const target = det.row === 0 ? det.a : det.row === 1 ? det.b : dSum;
  const answerDigit = digitAt(target, det.col);
  const newDet = () => {
    setDet(makeDetective());
    setDBad(null);
    setDOk(false);
    setDMsg('');
  };
  const pressDet = (d: number) => {
    if (dOk) return;
    if (d === answerDigit) {
      setDOk(true);
      setDBad(null);
      setDMsg('');
      setStreak((s) => s + 1);
      return;
    }
    setDBad(d);
    setStreak(0);
    if (det.row === 2) {
      const st = addSteps([det.a, det.b], 3)[det.col];
      setDMsg(`Számold ki ezt az oszlopot: ${st.digits.join(' meg ')}${st.carryIn ? ` meg ${st.carryIn} (maradék)` : ''} az ${st.sum}. Melyik jegyet írjuk le?`);
    } else {
      const a2 = det.row === 0 ? withDigit(det.a, det.col, d) : det.a;
      const b2 = det.row === 1 ? withDigit(det.b, det.col, d) : det.b;
      if (det.col === 2 && d === 0) setDMsg('Háromjegyű szám nem kezdődhet 0-val! Próbáld újra!');
      else setDMsg(`Próbáld ki: ha ${d} lenne a helyén, ${a2} + ${b2} = ${a2 + b2} lenne, nem ${dSum}.`);
    }
  };
  const detAddends = [det.row === 0 ? hideDigit(det.a, det.col) : det.a, det.row === 1 ? hideDigit(det.b, det.col) : det.b];
  const detResult = det.row === 2 ? hideDigit(dSum, det.col) : dSum;

  return (
    <TheoryTemplate
      topicId="g3-written-addition"
      subtopicId="irasbeli-osszeadas"
      grade={3}
      chapterId="irasbeli-osszeadas"
      title="3. Írásbeli összeadás"
      subtitle="Helyi érték szerint egymás alá, az egyesekkel kezdve; beváltás, maradék, ellenőrzés a tagok felcserélésével."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG"
      themeColor="blue"
      pdfFilename="3_osztaly_irasbeli_osszeadas_tananyag.pdf"
      practiceTitle="Készen állsz? Számoljunk írásban!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÍRÁSBELI ÖSSZEADÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base font-black text-blue-900 dark:text-blue-200">
              7 meg 6 az 13. Leírom a 3-at, maradt 1.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Írd a számokat helyi érték szerint <strong>egymás alá</strong>!</li>
              <li>Kezdd az <strong>egyesekkel</strong>, aztán tízesek, végül százasok.</li>
              <li>Ha 10 vagy több lett: az egyes jegyet leírod, a <strong>maradékot</strong> hozzáadod a következő oszlophoz.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 77–80. o." badgeColor="blue">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Nagyobb számokat fejben nehéz összeadni. Ezért <strong>leírjuk</strong> őket egymás alá, és oszloponként számolunk.</p>
          <p>Ez az <strong>írásbeli összeadás</strong>. Mindig ugyanúgy megy, lépésről lépésre.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Egymás alá, az egyesekkel kezdve" badge="Beváltás nélkül" badgeColor="emerald">
        <ThreeStepsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Egyes az egyes alá, tízes a tízes alá, százas a százas alá. A „+” jel az alsó szám elé kerül, alá húzunk egy vonalat.</p>
          <p>Mondd ki: <strong>„1 meg 7 az 8. 3 meg 4 az 7. 2 meg 1 az 3.”</strong> Az összeg: 378.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Beváltás az egyeseknél" badge="maradt 1" badgeColor="amber">
        <CarryOnesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>7 meg 6 az 13.</strong> 13 egyes = 1 tízes és 3 egyes. Leírom a 3-at, <strong>maradt 1</strong>.</p>
          <p><strong>5 meg 2 az 7, meg 1 az 8.</strong> Leírom a 8-at. <strong>1 meg 2 az 3.</strong> Leírom a 3-at. Az összeg: 383.</p>
        </div>
        <TheoryCallout type="tip" title="A kis zöld szám">
          A maradékot eleinte kis számmal felírhatod a következő oszlop fölé. Később már fejben tartod: „maradt 1”.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Beváltás a tízeseknél" badge="10 tízes = 1 százas" badgeColor="sky">
        <CarryTensSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>3 meg 4 az 7.</strong> Leírom a 7-et. <strong>6 meg 5 az 11.</strong> Leírom az 1-et, maradt 1. <strong>1 meg 2 az 3, meg 1 az 4.</strong> Az összeg: 417.
        </p>
      </TheorySection>

      <TheorySection title="5. Kétszer is beváltunk" badge="egyes és tízes" badgeColor="purple">
        <CarryBothSvg />
      </TheorySection>

      <TheorySection title="6. Ellenőrzés" badge="Cseréld fel!" badgeColor="emerald">
        <CheckSwapSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Az összeadás tagjai felcserélhetők, az összeg nem változik. Számold ki fordított sorrendben is! Ha ugyanaz jön ki, jól dolgoztál.
        </p>
      </TheorySection>

      <TheorySection title="7. Három tag" badge="Több szám egyszerre" badgeColor="orange">
        <ThreeTermsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">Három számot is írhatsz egymás alá. Ugyanúgy oszloponként haladsz, az egyesekkel kezdve.</p>
      </TheorySection>

      <TheorySection title="8. Nézzük meg együtt!" badge="Szöveges feladat" badgeColor="indigo">
        <TheoryCard title="A könyvtárban 238 mesekönyv és 147 ismeretterjesztő könyv van. Hány könyv van összesen?" badge="lépésről lépésre" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li><strong>Adatok:</strong> mesekönyv 238, ismeretterjesztő 147, összesen: ?</li>
            <li><strong>Terv:</strong> 238 + 147 = □</li>
            <li><strong>Becslés:</strong> 238 ≈ 240, 147 ≈ 150, 240 + 150 = 390.</li>
            <li><strong>Számítás:</strong> 8 meg 7 az 15, leírom az 5-öt, maradt 1. 3 meg 4 az 7, meg 1 az 8. 2 meg 1 az 3. → <strong>385</strong></li>
            <li><strong>Ellenőrzés:</strong> 147 + 238 = 385. A 385 közel van a becsléshez (390) is.</li>
            <li><strong>Válasz:</strong> A könyvtárban 385 könyv van.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett maradék"
          wrong="157 + 226 = 373"
          wrongExplanation="A 13 egyesből leírtad a 3-at, de a maradék 1 tízes elveszett."
          correct="157 + 226 = 383"
          correctExplanation="5 meg 2 az 7, meg 1 (maradék) az 8."
          tip="Írd fel a maradékot kis számmal, amíg biztos nem leszel!"
        />
        <TheoryCallout type="warning" title="Rossz helyre írt szám">
          245 + 32: a 32-t jobbra igazítsd! A 2 az 5 alá, a 3 a 4 alá kerül. Ha balra írnád, 245 + 320-at számolnál.
        </TheoryCallout>
        <TheoryCallout type="warning" title="Jobbról balra">
          Mindig az egyesekkel kezdj! Ha a százasokkal kezdenéd, nem tudnád, hova kerül a maradék.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="10. Labor I: Lépésről lépésre" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTask(randomKind())} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            {(Object.keys(KIND_LABEL) as CarryKind[]).map((k) => (
              <button key={k} onClick={() => newTask(k)} className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold min-h-[48px] border-2 ${kind === k ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-slate-300 text-slate-700'}`}>{KIND_LABEL[k]}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={startDemo} disabled={demo} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px] disabled:opacity-50">Mutasd meg!</button>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 min-h-[48px]">
              <input type="checkbox" checked={showCarry} onChange={(e) => setShowCarry(e.target.checked)} className="w-5 h-5" />
              Maradék kis számmal
            </label>
          </div>
          <WrittenAddG3Column addends={pair} result={resultStr} carries={carries} carryRow highlight={col < 3 ? col : null} cell={40} className="w-full max-w-[260px] h-auto mx-auto" />
          {col < 3 && !demo && (
            <>
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {col === 0 ? 'Kezdd az egyesekkel! ' : ''}
                {`${steps[col].digits.join(' meg ')}${steps[col].carryIn ? `, meg a maradék ${steps[col].carryIn}` : ''}. Melyik számot írod le a ${placePlural(col)} helyére?`}
              </div>
              <KeyPad onKey={press} bad={bad} />
            </>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{hint}</div>}
          {log.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-3 space-y-1 text-sm text-slate-700">
              {log.map((l, i) => (
                <div key={i}>{l}</div>
              ))}
            </div>
          )}
          {col >= 3 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Kész! {pair[0]} + {pair[1]} = {sum}. Ellenőrizd: {pair[1]} + {pair[0]} = {sum}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="11. Labor II: Számjegy-nyomozó" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newDet} className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-rose-800 bg-rose-50 rounded-xl px-3 py-2">Megfejtve egymás után: {streak}</div>
          </div>
          <WrittenAddG3Column addends={dOk ? [det.a, det.b] : detAddends} result={dOk ? dSum : detResult} cell={40} className="w-full max-w-[240px] h-auto mx-auto" />
          <div className="bg-rose-50 rounded-xl p-3 text-center text-rose-900 font-bold">Melyik számjegy van a ? helyén?</div>
          <KeyPad onKey={pressDet} bad={dBad} disabled={dOk} />
          {dMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{dMsg}</div>}
          {dOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Megvan, {art(answerDigit)} {answerDigit} hiányzott! {det.a} + {det.b} = {dSum}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenAddG3Theory;
