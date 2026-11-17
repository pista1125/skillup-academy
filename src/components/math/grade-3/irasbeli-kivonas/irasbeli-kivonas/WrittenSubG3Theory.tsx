import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { StepsNoExchangeSvg, FillUpStepsSvg, ExchangeOnesSvg, ExchangeTensSvg, ExchangeBothSvg, ZeroTensSvg, CheckSvg, WordPlanSvg } from './WrittenSubG3Figures';
import { WrittenSubG3Column, subSteps, spokenSubStep, carryMarks, whyTenText, suffixHoz, placePlural, SubStep } from './WrittenSubG3Column';
import { FONT, rnd, shuffle } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

// ---------------------------------------------------------------------------
// Írásbeli kivonás PÓTLÁSOS-MARADÉKOS módszerrel (a tanító döntése; a tankönyv felváltást tanít).
// Feladatgenerátor (≤ 499, ahogy a tankönyv): maradék nélkül / az egyeseknél / a tízeseknél / kétszer / 0 a tízeseknél
// ---------------------------------------------------------------------------
type Kind = 'nincs' | 'egyes' | 'tizes' | 'mindketto' | 'nulla';
const KIND_LABEL: Record<Kind, string> = {
  nincs: 'Nem marad semmi',
  egyes: 'Maradt 1 az egyeseknél',
  tizes: 'Maradt 1 a tízeseknél',
  mindketto: 'Kétszer maradt 1',
  nulla: '0 a tízeseknél'
};
export const kindOf = (a: number, b: number): Kind => {
  const s = subSteps(a, b);
  if (s[1].digit === 0 && s[0].carryOut) return 'nulla';
  if (s[0].carryOut && s[1].carryOut) return 'mindketto';
  if (s[0].carryOut) return 'egyes';
  if (s[1].carryOut) return 'tizes';
  return 'nincs';
};
export const makeSubPair = (kind: Kind): [number, number] => {
  for (;;) {
    const a = kind === 'nulla' ? rnd(2, 4) * 100 + rnd(0, 9) : rnd(201, 499);
    const b = rnd(101, 389);
    if (a - b < 10) continue;
    if (kind !== 'nulla' && (Math.floor(a / 10) % 10 === 0 || a % 10 === 0)) continue;
    if (kindOf(a, b) === kind) return [a, b];
  }
};
const randomKind = (): Kind => (['nincs', 'egyes', 'tizes', 'mindketto', 'nulla'] as Kind[])[[0, 1, 1, 2, 2, 3, 3, 4][rnd(0, 7)]];

/** Tipikus hibák: a maradék elfelejtése, illetve fordított pótlás (a kisebb jegytől a nagyobbig). */
export const forgotCarry = (a: number, b: number) =>
  [0, 1, 2].reduce((s, c) => {
    const d = Math.floor(a / 10 ** c) % 10;
    const n = Math.floor(b / 10 ** c) % 10;
    return s + ((d < n ? d + 10 : d) - n) * 10 ** c;
  }, 0);
export const swapped = (a: number, b: number) => [0, 1, 2].reduce((s, c) => s + Math.abs((Math.floor(a / 10 ** c) % 10) - (Math.floor(b / 10 ** c) % 10)) * 10 ** c, 0);

/** Visszajelzés egy beírt számjegyre (a laborhoz és a teszthez). */
export const stepHint = (st: SubStep, d: number): string => {
  if (d === st.write) return '';
  if (st.carryIn && d === st.digit + (st.digit < st.need ? 10 : 0) - st.need) return `Ne felejtsd el a maradékot! ${st.need} meg 1 az ${st.from}.`;
  if (st.carryOut && d === st.from - st.digit) return `Fordítva! A kivonandótól pótolj: ${st.from}-${suffixHoz(st.from)} mennyi kell, hogy ${st.target} legyen?`;
  return `Számolj fel: ${st.from}-${suffixHoz(st.from)} mennyi kell, hogy ${st.target} legyen?`;
};

/** -tól/-től rag számhoz 0–10-ig: 3-tól, 7-től, 10-től. */
const tol = (n: number) => (n === 10 ? 'től' : ['tól', 'től', 'től', 'tól', 'től', 'től', 'tól', 'től', 'tól', 'től'][n % 10]);

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const KeyPad: React.FC<{ onKey: (d: number) => void; bad?: number | null; disabled?: boolean }> = ({ onKey, bad, disabled }) => (
  <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
    {KEYS.map((d) => (
      <button
        key={d}
        disabled={disabled}
        onClick={() => onKey(d)}
        className={`min-h-[52px] rounded-xl text-2xl font-black border-2 transition-colors ${bad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'} disabled:opacity-40`}
      >
        {d}
      </button>
    ))}
  </div>
);

/** Pótló sáv: 0–19 számegyenes, a kivonandó jegyétől (+ maradék) a célig ugrunk. */
const FillStrip: React.FC<{ st: SubStep; showTarget: boolean; done: boolean }> = ({ st, showTarget, done }) => {
  const x0 = 20;
  const k = 19;
  const X = (n: number) => x0 + n * k;
  return (
    <svg viewBox="0 0 420 120" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="418" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={X(0)} y1={78} x2={X(19)} y2={78} stroke="#475569" strokeWidth="2" />
      {Array.from({ length: 20 }).map((_, n) => (
        <g key={n}>
          <line x1={X(n)} y1={n % 5 === 0 ? 70 : 73} x2={X(n)} y2={n % 5 === 0 ? 86 : 83} stroke="#475569" strokeWidth={n === 10 ? 3 : 1.3} />
          <text x={X(n)} y={102} textAnchor="middle" fontSize="11.5" fontWeight={n === st.from || (showTarget && n === st.target) ? 'bold' : 'normal'} fill={n === st.from ? '#dc2626' : showTarget && n === st.target ? '#1d4ed8' : '#64748b'}>{n}</text>
        </g>
      ))}
      <circle cx={X(st.from)} cy={78} r="6" fill="#dc2626" />
      <text x={X(st.from)} y={60} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">innen</text>
      {showTarget && (
        <g>
          <circle cx={X(st.target)} cy={78} r="6" fill="#1d4ed8" />
          {st.target !== st.from && <path d={`M ${X(st.from)} 70 Q ${(X(st.from) + X(st.target)) / 2} ${30} ${X(st.target)} 70`} fill="none" stroke="#15803d" strokeWidth="2.6" />}
          <text x={(X(st.from) + X(st.target)) / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#15803d">+{done ? st.write : '?'}</text>
          {st.carryOut ? <text x={X(19)} y={22} textAnchor="end" fontSize="12" fontWeight="bold" fill="#15803d">átléptük a 10-et: maradt 1</text> : null}
        </g>
      )}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Hibavadász
// ---------------------------------------------------------------------------
type Mistake = 'jo' | 'felejt' | 'fordit' | 'szazas';
interface Hunt { a: number; b: number; r: number; mistake: Mistake }
export const makeHunt = (): Hunt => {
  for (;;) {
    const [a, b] = makeSubPair(randomKind());
    const ok = a - b;
    const m = (['jo', 'jo', 'felejt', 'fordit', 'szazas'] as Mistake[])[rnd(0, 4)];
    let r = ok;
    if (m === 'felejt') r = forgotCarry(a, b);
    if (m === 'fordit') r = swapped(a, b);
    if (m === 'szazas') r = ok + (rnd(0, 1) ? 100 : -100);
    if (m !== 'jo' && (r === ok || r < 0 || r > 999)) continue;
    return { a, b, r, mistake: m };
  }
};

const Btn: React.FC<{ children: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null; color?: string }> = ({ children, onClick, state, color = 'bg-white border-slate-300 text-slate-800' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-base font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : color}`}
  >
    {children}
  </button>
);

export const WrittenSubG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: lépésről lépésre ----
  const [kind, setKind] = useState<Kind>('mindketto');
  const [pair, setPair] = useState<[number, number]>([364, 178]);
  const [col, setCol] = useState(0); // aktuális oszlop; 3 = kész
  const [phase, setPhase] = useState<'ask' | 'digit' | 'check' | 'done'>('ask');
  const [bad, setBad] = useState<number | null>(null);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [marks, setMarks] = useState(true);
  const [demo, setDemo] = useState(false);
  const [checkOpts, setCheckOpts] = useState<number[]>([]);
  const [checkBad, setCheckBad] = useState<number | null>(null);
  const [a, b] = pair;
  const steps = subSteps(a, b);
  const diff = a - b;
  const startPhase = (c: number) => (c >= 3 ? 'check' : c < 2 ? 'ask' : 'digit');
  const reset = (p: [number, number]) => {
    setPair(p);
    setCol(0);
    setPhase('ask');
    setBad(null);
    setHint('');
    setLog([]);
    setCheckBad(null);
    setCheckOpts(shuffle([p[0], p[0] + 10, p[0] - 10 > p[1] ? p[0] - 10 : p[0] + 100]));
  };
  const newTask = (k: Kind = kind) => {
    setKind(k);
    setDemo(false);
    reset(makeSubPair(k));
  };
  useEffect(() => {
    setCheckOpts(shuffle([a, a + 10, a + 100]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resultStr = String(diff)
    .padStart(3, ' ')
    .split('')
    .map((ch, i) => (2 - i < col ? ch : ' '))
    .join('');

  const writeDigit = (c: number) => {
    const st = steps[c];
    setLog((l) => [...l, `${c + 1}. lépés (${placePlural(c)}): ${spokenSubStep(st)}`]);
    const next = c + 1;
    setCol(next);
    setPhase(startPhase(next));
    setBad(null);
    setHint('');
  };
  const st = steps[Math.min(col, 2)];
  /** Melyik számig pótolsz? (a kisebbítendő jegyéig, vagy 10-zel többig) */
  const answerAsk = (ten: boolean) => {
    if (phase !== 'ask' || demo) return;
    if (ten === !!st.carryOut) {
      setPhase('digit');
      setHint('');
      return;
    }
    setHint(ten ? `Van elég: ${st.from}-${tol(st.from)} ${st.digit}-ig pótolhatsz. Nem kell 10-zel több.` : whyTenText(st));
  };
  const press = (d: number) => {
    if (phase !== 'digit' || demo) return;
    if (d === st.write) {
      writeDigit(col);
      return;
    }
    setBad(d);
    setHint(stepHint(st, d));
  };
  const pickCheck = (v: number) => {
    if (phase !== 'check') return;
    if (v === a) {
      setPhase('done');
      setCheckBad(null);
      return;
    }
    setCheckBad(v);
  };
  // bemutató: magától végigmegy
  useEffect(() => {
    if (!demo) return;
    if (col >= 3) {
      setDemo(false);
      return;
    }
    const t = window.setTimeout(() => {
      if (phase === 'ask') setPhase('digit');
      else writeDigit(col);
    }, 1300);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, col, phase]);
  const startDemo = () => {
    reset(pair);
    setDemo(true);
  };

  // ---- Labor II: hibavadász ----
  const [hunt, setHunt] = useState<Hunt>({ a: 372, b: 145, r: 237, mistake: 'felejt' });
  const [hStage, setHStage] = useState<'judge' | 'fix' | 'done'>('judge');
  const [hMsg, setHMsg] = useState('');
  const [hBad, setHBad] = useState<string | number | null>(null);
  const [hOpts, setHOpts] = useState<number[]>(shuffle([227, 237, 233, 327]));
  const [streak, setStreak] = useState(0);
  const okH = hunt.a - hunt.b;
  const newHunt = () => {
    const h = makeHunt();
    setHunt(h);
    setHStage('judge');
    setHMsg('');
    setHBad(null);
    const ok = h.a - h.b;
    const f = forgotCarry(h.a, h.b);
    const sw = swapped(h.a, h.b);
    setHOpts(shuffle(Array.from(new Set([ok, h.r === ok ? ok + 10 : h.r, f === ok ? ok + 100 : f, sw === ok ? ok - 10 : sw]))));
  };
  const judge = (good: boolean) => {
    if (hStage !== 'judge') return;
    const isGood = hunt.r === okH;
    if (good === isGood) {
      setHBad(null);
      if (isGood) {
        setHStage('done');
        setStreak((s) => s + 1);
        setHMsg(`Igazad van! Ellenőrzés: ${hunt.r} + ${hunt.b} = ${hunt.a}. Megkaptuk a kisebbítendőt.`);
      } else {
        setHStage('fix');
        setHMsg(`Igen, hibás! Ellenőrzés: ${hunt.r} + ${hunt.b} = ${hunt.r + hunt.b}, nem ${hunt.a}. Mennyi a jó eredmény?`);
      }
      return;
    }
    setHBad(good ? 'jo' : 'rossz');
    setStreak(0);
    setHMsg(`Ellenőrizd összeadással: ${hunt.r} + ${hunt.b} = ? Ha ${hunt.a} jön ki, jó a kivonás.`);
  };
  const fix = (v: number) => {
    if (hStage !== 'fix') return;
    if (v === okH) {
      setHStage('done');
      setHBad(null);
      setStreak((s) => s + 1);
      const why =
        hunt.mistake === 'felejt'
          ? 'A hiba: elfelejtette a maradékot hozzáadni a következő kivonandó-jegyhez.'
          : hunt.mistake === 'fordit'
            ? 'A hiba: fordítva pótolt, a kisebb jegytől a nagyobbig.'
            : 'A hiba: a százasoknál tévedett.';
      setHMsg(`Szuper! ${hunt.a} − ${hunt.b} = ${okH}. ${why}`);
      return;
    }
    setHBad(v);
    setStreak(0);
    setHMsg('Számold ki lépésről lépésre, az egyesekkel kezdve! Ne felejtsd el a maradékot!');
  };

  return (
    <TheoryTemplate
      topicId="g3-written-subtraction"
      subtopicId="irasbeli-kivonas"
      grade={3}
      chapterId="irasbeli-kivonas"
      title="3. Írásbeli kivonás"
      subtitle="Helyi érték szerint egymás alá, az egyesekkel kezdve; pótlás, maradék, ellenőrzés összeadással."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG"
      themeColor="blue"
      pdfFilename="3_osztaly_irasbeli_kivonas_tananyag.pdf"
      practiceTitle="Készen állsz? Vonjunk ki írásban!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÍRÁSBELI KIVONÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base font-black text-blue-900 dark:text-blue-200">
              5-höz 7, az 12. Leírom a 7-et, maradt 1.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Írd a számokat helyi érték szerint <strong>egymás alá</strong>! Kezdd az <strong>egyesekkel</strong>!</li>
              <li><strong>Pótolj</strong>: a kivonandó jegyétől a kisebbítendő jegyéig. Ha az kisebb, pótolj 10-zel többig: <strong>maradt 1</strong>.</li>
              <li>A maradékot add a következő kivonandó-jegyhez: <strong>4 meg 1 az 5</strong>.</li>
              <li>Ellenőrizz <strong>összeadással</strong>: különbség + kivonandó = kisebbítendő.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 89–93. o." badgeColor="blue">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Háromjegyű számokat vonunk ki <strong>írásban</strong>. Így nagy számokkal is biztosan megy.</p>
          <p><strong>kisebbítendő − kivonandó = különbség</strong>. A kisebbítendő van felül, a kivonandó alatta.</p>
          <p>Pótlással számolunk: azt mondjuk, <strong>mennyi kell még</strong> a kivonandóhoz. Sorrend: <strong>becslés → számítás → ellenőrzés</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Pótlás, maradék nélkül" badge="486 − 253" badgeColor="emerald">
        <StepsNoExchangeSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Becslés: 490 − 250 = 240. Számítás az egyesekkel kezdve: „3-hoz 3, az 6. Leírom a 3-at.” „5-höz 3, az 8.” „2-höz 2, az 4.” A különbség <strong>233</strong>. Közel van a becsléshez.
        </p>
      </TheorySection>

      <TheorySection title="3. Ha kisebb a felső jegy" badge="Maradt 1" badgeColor="teal">
        <FillUpStepsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A 7-től nem tudunk 2-ig felfelé számolni. Ezért <strong>12-ig</strong> pótolunk: 7-hez 5, az 12. Átléptük a 10-et, ezért <strong>maradt 1</strong>. Ezt az 1-et a következő oszlopban a kivonandó jegyéhez adjuk.
        </p>
      </TheorySection>

      <TheorySection title="4. Maradt 1 az egyeseknél" badge="372 − 145" badgeColor="sky">
        <ExchangeOnesSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li><strong>1. lépés:</strong> a 2 kisebb, mint az 5. „5-höz 7, az 12. Leírom a 7-et, maradt 1.”</li>
          <li><strong>2. lépés:</strong> „4 meg 1 az 5. 5-höz 2, az 7. Leírom a 2-t.”</li>
          <li><strong>3. lépés:</strong> „1-hez 2, az 3. Leírom a 2-t.” A különbség <strong>227</strong>.</li>
        </ul>
        <TheoryCallout type="info" title="A zöld 1-es">
          A maradékot kicsi zöld 1-essel a következő kivonandó-jegy mellé írjuk, hogy ne felejtsük el. Ha már megy fejben, elhagyhatod.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Maradt 1 a tízeseknél" badge="428 − 175" badgeColor="purple">
        <ExchangeTensSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>„5-höz 3, az 8. Leírom a 3-at.”</li>
          <li>A 2 kisebb, mint a 7: „7-hez 5, az 12. Leírom az 5-öt, maradt 1.”</li>
          <li>„1 meg 1 az 2. 2-höz 2, az 4. Leírom a 2-t.” A különbség <strong>253</strong>.</li>
        </ul>
      </TheorySection>

      <TheorySection title="6. Kétszer is marad 1" badge="421 − 186" badgeColor="amber">
        <ExchangeBothSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>„6-hoz 5, az 11. Leírom az 5-öt, maradt 1.”</li>
          <li>„8 meg 1 az 9. 9-hez 3, az 12. Leírom a 3-at, maradt 1.”</li>
          <li>„1 meg 1 az 2. 2-höz 2, az 4. Leírom a 2-t.” A különbség <strong>235</strong>.</li>
        </ul>
      </TheorySection>

      <TheorySection title="7. Ha 0 van a tízesek helyén" badge="403 − 157" badgeColor="rose">
        <ZeroTensSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          „7-hez 6, az 13, maradt 1.” A tízeseknél: „5 meg 1 az 6.” A 0-ig nem tudunk felfelé számolni, ezért <strong>10-ig</strong> pótolunk: „6-hoz 4, az 10. Leírom a 4-et, maradt 1.” Végül: „1 meg 1 az 2. 2-höz 2, az 4.” A különbség <strong>246</strong>.
        </p>
      </TheorySection>

      <TheorySection title="8. Ellenőrzés" badge="Összeadással" badgeColor="emerald">
        <CheckSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Add össze a különbséget és a kivonandót! Ha a <strong>kisebbítendőt</strong> kapod, jól számoltál. Kivonással is ellenőrizhetsz: 372 − 227 = 145.
        </p>
      </TheorySection>

      <TheorySection title="9. Nézzük meg együtt!" badge="Szöveges feladat" badgeColor="purple">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>A moziteremben 364 szék van. 178 néző ül le. Hány szék marad üresen?</strong></p>
        </div>
        <WordPlanSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Számítás" badge="364 − 178" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>„8-hoz 6, az 14. Leírom a 6-ot, maradt 1.”</li>
              <li>„7 meg 1 az 8. 8-hoz 8, az 16. Leírom a 8-at, maradt 1.”</li>
              <li>„1 meg 1 az 2. 2-höz 1, az 3. Leírom az 1-et.” Eredmény: 186.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ellenőrzés" badge="186 + 178" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>186 + 178 = 364. Jó!</li>
              <li>A 186 közel van a becsült 180-hoz.</li>
              <li>Válasz: <strong>186 szék marad üresen.</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="372 − 145"
          wrong="372 − 145 = 233"
          wrongExplanation="Az egyeseknél a 2-től pótolt az 5-ig. Fordítva! Mindig a kivonandó jegyétől pótolunk."
          correct="372 − 145 = 227"
          correctExplanation="5-höz 7, az 12, maradt 1. 4 meg 1 az 5, 5-höz 2, az 7. 1-hez 2, az 3."
          tip="Alulról felfelé pótolunk: a kivonandótól a kisebbítendőig."
        />
        <TheoryCallout type="warning" title="Ne felejtsd el a maradékot!">
          372 − 145 nem 237! Ha az egyeseknél maradt 1, a tízeseknél „4 meg 1 az 5”, és 5-höz 2, az 7.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="11. Labor I: Lépésről lépésre" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTask(kind)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={startDemo} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">Mutasd meg!</button>
            <button onClick={() => setMarks((m) => !m)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${marks ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}>Maradék mutatása: {marks ? 'be' : 'ki'}</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
              <button key={k} onClick={() => newTask(k)} className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold min-h-[44px] border-2 ${kind === k ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-slate-300 text-slate-700'}`}>{KIND_LABEL[k]}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <WrittenSubG3Column minuend={a} subtrahend={b} result={resultStr} carries={marks ? carryMarks(steps, col) : []} highlight={col < 3 ? col : null} className="w-full max-w-[220px] h-auto mx-auto" />
            {col < 3 && <FillStrip st={st} showTarget={phase === 'digit'} done={false} />}
          </div>
          {phase === 'ask' && !demo && (
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {placePlural(col)[0].toUpperCase() + placePlural(col).slice(1)}: {st.carryIn ? `${st.need} meg 1 az ${st.from}. ` : ''}
                {st.from}-{tol(st.from)} pótolsz. Meddig?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Btn onClick={() => answerAsk(false)} color="bg-white border-slate-300 text-slate-800">{st.digit}-ig</Btn>
                <Btn onClick={() => answerAsk(true)} color="bg-emerald-50 border-emerald-400 text-emerald-900">{st.digit + 10}-ig (maradt 1)</Btn>
              </div>
            </div>
          )}
          {phase === 'digit' && !demo && (
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {placePlural(col)[0].toUpperCase() + placePlural(col).slice(1)}: {st.carryIn ? `${st.need} meg 1 az ${st.from}. ` : ''}
                {st.from}-{suffixHoz(st.from)} mennyi kell, hogy {st.target} legyen? Melyik számjegyet írod le?
              </div>
              <KeyPad onKey={press} bad={bad} />
            </div>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-100 text-amber-900">{hint}</div>}
          {log.length > 0 && (
            <ol className="space-y-1 text-sm text-slate-700 bg-slate-50 rounded-xl p-3">
              {log.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ol>
          )}
          {(phase === 'check' || phase === 'done') && (
            <div className="space-y-2">
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                {a} − {b} = {diff}. Most ellenőrizz összeadással! {diff} + {b} = ?
              </div>
              <WrittenSubG3Column op="+" minuend={diff} subtrahend={b} result={phase === 'done' ? a : '???'} header={false} className="w-full max-w-[150px] h-auto mx-auto" />
              {phase === 'check' && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {checkOpts.map((v) => (
                    <Btn key={v} onClick={() => pickCheck(v)} state={checkBad === v ? 'bad' : null}>{v}</Btn>
                  ))}
                </div>
              )}
              {checkBad !== null && phase === 'check' && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">Add össze írásban: egyesek, tízesek, százasok!</div>}
              {phase === 'done' && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Megkaptad a kisebbítendőt ({a}), tehát jól számoltál! Kérj új feladatot!</div>}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="12. Labor II: Hibavadász" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newHunt} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">Egy gyerek így számolt. Jó vagy hibás? Ellenőrizd összeadással!</div>
          <WrittenSubG3Column minuend={hunt.a} subtrahend={hunt.b} result={hunt.r} header={false} className="w-full max-w-[170px] h-auto mx-auto" />
          {hStage === 'judge' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Btn onClick={() => judge(true)} state={hBad === 'jo' ? 'bad' : null} color="bg-emerald-50 border-emerald-400 text-emerald-900">Jó</Btn>
              <Btn onClick={() => judge(false)} state={hBad === 'rossz' ? 'bad' : null} color="bg-rose-50 border-rose-400 text-rose-900">Hibás</Btn>
            </div>
          )}
          {hStage === 'fix' && (
            <div className="flex flex-wrap gap-2 justify-center">
              {hOpts.map((v) => (
                <Btn key={v} onClick={() => fix(v)} state={hBad === v ? 'bad' : null}>{v}</Btn>
              ))}
            </div>
          )}
          {hMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${hStage === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{hMsg}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenSubG3Theory;
