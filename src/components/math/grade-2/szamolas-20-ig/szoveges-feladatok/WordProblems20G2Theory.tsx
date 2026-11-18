import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
} from '../TheoryTemplate';
import {
  BarChartSnacksSvg,
  BudgetTableSvg,
  FiveStepsLadderSvg,
  InverseComparisonBarsSvg,
  StripModel20Svg,
  TwoStepStripSvg,
} from './WordProblems20G2Figures';
import { UnitStrip20Part, WORD20_FONT } from './WordProblems20G2Parts';

// ---------------------------------------------------------------------------
// Segédek (belső használatra — a fájl csak a WordProblems20G2Theory komponenst exportálja!)
// ---------------------------------------------------------------------------
const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** „-val, -vel” rag 0–20-ig. */
const vel = (n: number): string => {
  if (n === 10) return '10-zel';
  if (n === 20) return '20-szal';
  const ones: Record<number, string> = {
    0: 'val',
    1: 'gyel',
    2: 'vel',
    3: 'mal',
    4: 'gyel',
    5: 'tel',
    6: 'tal',
    7: 'tel',
    8: 'cal',
    9: 'cel',
  };
  return `${n}-${ones[n % 10]}`;
};

type Op = '+' | '−';
const OPS: Op[] = ['+', '−'];

type LabKind = 'join' | 'take' | 'part' | 'more' | 'less' | 'trapMore' | 'trapLess';

interface OneStepTask {
  kind: LabKind;
  text: string;
  a: number;
  b: number;
  op: Op;
  ans: number;
  unit: string;
  topName?: string;
  botName?: string;
  hint: string;
}

const NAMES_PAIR: [string, string][] = [
  ['Bence', 'Eszter'],
  ['Soma', 'Hanga'],
  ['Vince', 'Sára'],
  ['Milán', 'Nóra'],
  ['Matyi', 'Flóra'],
  ['Marci', 'Lotti'],
];

const makeOneStepTask = (): OneStepTask => {
  const kind = pick<LabKind>(['join', 'take', 'part', 'more', 'less', 'trapMore', 'trapLess']);
  const [n1, n2] = pick(NAMES_PAIR);
  switch (kind) {
    case 'join': {
      const a = rnd(4, 11);
      const b = rnd(3, 20 - a);
      return {
        kind,
        a,
        b,
        op: '+',
        ans: a + b,
        unit: 'falevél',
        text: `${n1} ${a} sárga és ${b} piros falevelet gyűjtött. Hány falevele van összesen?`,
        hint: 'A két részt összeillesztjük. Összeadás kell!',
      };
    }
    case 'take': {
      const a = rnd(11, 20);
      const b = rnd(3, a - 3);
      return {
        kind,
        a,
        b,
        op: '−',
        ans: a - b,
        unit: 'veréb',
        text: `A fán ${a} veréb ült. Közülük ${b} elrepült. Hány veréb maradt a fán?`,
        hint: 'Néhányan elmentek, kevesebben maradtak. Kivonás kell!',
      };
    }
    case 'part': {
      const a = pick([14, 15, 16, 17, 18, 20]);
      const b = rnd(5, a - 4);
      return {
        kind,
        a,
        b,
        op: '−',
        ans: a - b,
        unit: 'hely',
        text: `A ${a} fős kisbuszban már ${b} gyerek ül. Hány üres hely van még?`,
        hint: 'Ismerjük az egészet és a foglalt helyeket. Az üres helyeket kivonással kapjuk!',
      };
    }
    case 'more': {
      const a = rnd(4, 12);
      const b = rnd(3, 20 - a);
      return {
        kind,
        a,
        b,
        op: '+',
        ans: a + b,
        unit: 'makk',
        topName: n1,
        botName: n2,
        text: `${n1} ${a} makkot gyűjtött. ${n2} ${vel(b)} többet talált nála. Hány makkot talált ${n2}?`,
        hint: `${n2} többet talált, ezért összeadunk!`,
      };
    }
    case 'less': {
      const a = rnd(11, 20);
      const b = rnd(3, a - 3);
      return {
        kind,
        a,
        b,
        op: '−',
        ans: a - b,
        unit: 'matrica',
        topName: n1,
        botName: n2,
        text: `${n1} ${a} matricát ragasztott be. ${n2} ${vel(b)} kevesebbet. Hány matricája van ${n2}-nak?`,
        hint: `${n2}-nak kevesebb van, ezért kivonunk!`,
      };
    }
    case 'trapLess': {
      const a = rnd(4, 12);
      const b = rnd(3, 20 - a);
      return {
        kind,
        a,
        b,
        op: '+',
        ans: a + b,
        unit: 'dió',
        topName: n1,
        botName: n2,
        text: `${n1} ${a} diót tört fel, ${vel(b)} kevesebbet, mint ${n2}. Hány diót tört fel ${n2}?`,
        hint: `Vigyázz a csapdára! ${n1} tört kevesebbet, tehát ${n2} TÖBBET tört! Összeadás kell!`,
      };
    }
    default: {
      const a = rnd(11, 20);
      const b = rnd(3, a - 3);
      return {
        kind: 'trapMore',
        a,
        b,
        op: '−',
        ans: a - b,
        unit: 'kagyló',
        topName: n1,
        botName: n2,
        text: `${n1} ${a} kagylót gyűjtött, ${vel(b)} többet, mint ${n2}. Hány kagylót gyűjtött ${n2}?`,
        hint: `Vigyázz a csapdára! ${n1} gyűjtött többet, tehát ${n2} KEVESEBBET gyűjtött! Kivonás kell!`,
      };
    }
  }
};

const LabStripModel: React.FC<{ p: OneStepTask }> = ({ p }) => {
  if (p.kind === 'more' || p.kind === 'less' || p.kind === 'trapMore' || p.kind === 'trapLess') {
    const firstIsLarger = p.kind === 'less' || p.kind === 'trapMore';
    const big = firstIsLarger ? p.a : p.ans;
    const small = firstIsLarger ? p.ans : p.a;
    const unit = 16;
    const x0 = 88;
    const topBarW = firstIsLarger ? big * unit : small * unit;
    const botBarW = firstIsLarger ? small * unit : big * unit;
    const topFill = '#7dd3fc';
    const topStroke = '#0369a1';
    const botFill = '#fda4af';
    const botStroke = '#be123c';

    return (
      <svg viewBox="0 0 460 116" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={WORD20_FONT}>
        <text x="14" y="38" fontSize="13" fontWeight="bold" fill="#0c4a6e">
          {p.topName}
        </text>
        <rect x={x0} y="18" width={topBarW} height="28" rx="6" fill={topFill} stroke={topStroke} strokeWidth="2" />
        <text x={x0 + topBarW / 2} y="37" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">
          {p.a}
        </text>

        <text x="14" y="84" fontSize="13" fontWeight="bold" fill="#881337">
          {p.botName}
        </text>
        {firstIsLarger ? (
          <>
            <rect x={x0} y="64" width={botBarW} height="28" rx="6" fill={botFill} stroke={botStroke} strokeWidth="2" />
            <text x={x0 + botBarW / 2} y="83" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">
              ?
            </text>
            <rect
              x={x0 + botBarW}
              y="64"
              width={p.b * unit}
              height="28"
              rx="6"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <text x={x0 + botBarW + (p.b * unit) / 2} y="83" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
              {p.b}
            </text>
          </>
        ) : (
          <>
            <rect x={x0} y="64" width={small * unit} height="28" rx="6" fill={botFill} stroke={botStroke} strokeWidth="2" />
            <rect x={x0 + small * unit} y="64" width={p.b * unit} height="28" rx="6" fill="#fde047" stroke="#a16207" strokeWidth="2" />
            <text x={x0 + (botBarW) / 2} y="83" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">
              ? ({p.b}-vel több)
            </text>
          </>
        )}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 460 94" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={WORD20_FONT}>
      <UnitStrip20Part
        x={20}
        y={26}
        sqSize={21}
        first={p.kind === 'part' ? p.b : p.a}
        second={p.kind === 'join' ? p.b : 0}
        crossed={p.kind === 'take' ? p.b : 0}
        unknownStart={p.kind === 'part' ? p.b : undefined}
        unknownCount={p.kind === 'part' ? p.ans : 0}
        showIndexNumbers
      />
      <text x="230" y="76" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        {p.kind === 'join'
          ? `Első rész: ${p.a}, második rész: ${p.b} → Mennyi összesen?`
          : p.kind === 'take'
          ? `Összesen ${p.a} volt, ${p.b} áthúzva → Mennyi maradt?`
          : `Összesen ${p.a} hely, ${p.b} foglalt → Mennyi a sárga „?” rész?`}
      </text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Labor II — Kétlépéses feladat az 5 lépéssel (0–20)
// ---------------------------------------------------------------------------
interface TwoStepTask {
  text: string;
  data: string[]; // [helyes, rossz1, rossz2]
  plans: string[]; // [helyes, rossz1, rossz2]
  step1: number;
  ans: number;
  check: string;
  answers: string[]; // [helyes, rossz1, rossz2]
}

const makeTwoStepTask = (): TwoStepTask => {
  const mode = rnd(0, 2);
  const [n1, n2] = pick(NAMES_PAIR);

  if (mode === 0) {
    const a = rnd(5, 9);
    const b = rnd(4, 19 - a);
    const c = rnd(2, Math.min(7, a + b - 2));
    const s1 = a + b;
    const ans = s1 - c;
    return {
      text: `${n1} ${a} piros és ${b} kék lufit fújt fel, de ${c} kipukkadt. Hány ép lufi maradt?`,
      data: [
        `piros: ${a}, kék: ${b}, kipukkadt: ${c}`,
        `piros: ${a}, kék: ${c}, kipukkadt: ${b}`,
        `összesen volt: ${a}, maradt: ${b}, kipukkadt: ${c}`,
      ],
      plans: [
        `${a} + ${b} = □,   □ − ${c} = △`,
        `${a} + ${b} = □,   □ + ${c} = △`,
        `${a} − ${b} = □,   □ − ${c} = △`,
      ],
      step1: s1,
      ans,
      check: `${ans} + ${c} = ${s1}, és ${a} + ${b} = ${s1}. Stimmel!`,
      answers: [
        `${ans} ép lufi maradt.`,
        `${s1} ép lufi maradt.`,
        `${ans} csomag lufi maradt.`,
      ],
    };
  }

  if (mode === 1) {
    const m = pick([16, 18, 20]);
    const p1 = rnd(4, 8);
    const p2 = rnd(3, m - p1 - 2);
    const s1 = m - p1;
    const ans = s1 - p2;
    return {
      text: `${n1} ${m} zsetont vitt a vásárba. Vett egy ${p1} zsetonos matricát és egy ${p2} zsetonos radírt. Hány zsetonja maradt?`,
      data: [
        `volt: ${m} zseton, matrica: ${p1}, radír: ${p2}`,
        `volt: ${m} zseton, matrica: ${p2}, radír: ${s1}`,
        `volt: ${p1 + p2} zseton, matrica: ${p1}, radír: ${p2}`,
      ],
      plans: [
        `${m} − ${p1} = □,   □ − ${p2} = △`,
        `${m} − ${p1} = □,   □ + ${p2} = △`,
        `${p1} + ${p2} = □,   □ + ${m} = △`,
      ],
      step1: s1,
      ans,
      check: `${ans} + ${p2} + ${p1} = ${m}. Stimmel!`,
      answers: [
        `${ans} zsetonja maradt.`,
        `${p1 + p2} zsetonja maradt.`,
        `${ans} radírja maradt.`,
      ],
    };
  }

  // Fordított vagy közvetlen összehasonlítás után összesen <= 20
  const a = rnd(8, 12);
  const diff = rnd(2, Math.min(5, a - 3));
  const s1 = a - diff; // második gyerek kevesebb, így a + s1 <= 20 garantált ha a + (a-diff) <= 20
  // ellenőrizzük, hogy a + s1 <= 20
  const safeA = a + s1 > 20 ? 10 : a;
  const safeS1 = safeA - diff;
  const total = safeA + safeS1;
  return {
    text: `${n1} ${safeA} gesztenyét talált, ${vel(diff)} többet, mint ${n2}. Hány gesztenyét találtak összesen?`,
    data: [
      `${n1}: ${safeA}, és ${n1} ${vel(diff)} többet talált, mint ${n2}`,
      `${n1}: ${safeA}, ${n2}: ${diff}`,
      `${n1}: ${safeA}, és ${n2} ${vel(diff)} többet talált`,
    ],
    plans: [
      `${safeA} − ${diff} = □,   ${safeA} + □ = △`,
      `${safeA} + ${diff} = □,   ${safeA} + □ = △`,
      `${safeA} − ${diff} = □,   □ − ${diff} = △`,
    ],
    step1: safeS1,
    ans: total,
    check: `${n2} ${safeS1} gesztenyét talált (${safeS1} + ${diff} = ${safeA}). Együtt: ${safeA} + ${safeS1} = ${total}. Stimmel!`,
    answers: [
      `Összesen ${total} gesztenyét találtak.`,
      `Összesen ${safeS1} gesztenyét találtak.`,
      `Összesen ${total} kagylót találtak.`,
    ],
  };
};

const shuffledIdx = () => shuffle([0, 1, 2]);
const STEP_NAMES = ['1. Adatok', '2. Terv', '3. Számolás', '4. Ellenőrzés', '5. Válasz'];

export const WordProblems20G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [p, setP] = useState<OneStepTask>(() => ({
    kind: 'join',
    a: 7,
    b: 6,
    op: '+',
    ans: 13,
    unit: 'falevél',
    text: 'Bence 7 sárga és 6 piros falevelet gyűjtött. Hány falevele van összesen?',
    hint: 'A két részt összeillesztjük. Összeadás kell!',
  }));
  const [chosenOp, setChosenOp] = useState<Op | null>(null);
  const [val, setVal] = useState('');
  const [res, setRes] = useState<null | 'ok' | 'bad'>(null);

  const opOk = chosenOp === p.op;
  const newP = () => {
    setP(makeOneStepTask());
    setChosenOp(null);
    setVal('');
    setRes(null);
  };
  const checkVal = () => {
    if (val.trim() === '') {
      setRes('bad');
      return;
    }
    setRes(Number(val) === p.ans ? 'ok' : 'bad');
  };
  const diffVal = Math.abs(Number(val) - p.ans);

  // Labor II
  const [q, setQ] = useState<TwoStepTask>(() => makeTwoStepTask());
  const [order, setOrder] = useState<{ d: number[]; p: number[]; a: number[] }>(() => ({
    d: shuffledIdx(),
    p: shuffledIdx(),
    a: shuffledIdx(),
  }));
  const [step, setStep] = useState(0);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [calcMsg, setCalcMsg] = useState<string | null>(null);

  const newQ = () => {
    setQ(makeTwoStepTask());
    setOrder({ d: shuffledIdx(), p: shuffledIdx(), a: shuffledIdx() });
    setStep(0);
    setWrongPick(null);
    setV1('');
    setV2('');
    setCalcMsg(null);
  };

  const choose = (idx: number) => {
    if (idx === 0) {
      setWrongPick(null);
      setStep(step + 1);
    } else {
      setWrongPick(idx);
    }
  };

  const checkCalc = () => {
    if (v1.trim() === '' || Number(v1) !== q.step1) {
      setCalcMsg('Az első lépés még nem jó. Számold újra az első számfeladatot!');
    } else if (v2.trim() === '' || Number(v2) !== q.ans) {
      setCalcMsg(`Az első lépés jó (${q.step1}). A másodikat számold újra!`);
    } else {
      setCalcMsg(null);
      setStep(3);
    }
  };

  const optList = step === 0 ? q.data : step === 1 ? q.plans : q.answers;
  const optOrder = step === 0 ? order.d : step === 1 ? order.p : order.a;

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="szoveges-feladatok"
      grade={2}
      chapterId="szamolas-20-ig"
      title="6. Szöveges feladatok"
      subtitle="Adatok, kérdés, terv, számolás ellenőrzéssel és válasz 0-tól 20-ig!"
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="2_osztaly_szoveges_feladatok_tananyag.pdf"
      practiceTitle="Készen állsz a szöveges feladatokra?"
      practiceSubtitle="Próbáld ki tudásodat a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AZ 5 LÉPÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
              Adatok → Kérdés → Terv → Számolás + Ellenőrzés → Válasz
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Olvasd el <strong>kétszer</strong> a történetet!</li>
              <li>Segít a <strong>20-as szalagmodell</strong> és az összehasonlító rajz.</li>
              <li>A végén mindig <strong>mondatban</strong> válaszolj!</li>
            </ul>
          </div>
        ),
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Az 5 lépés" badge="Bevezető" badgeColor="amber">
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>A szöveges feladat egy rövid történet. A végén egy <strong>kérdésre</strong> keressük a választ.</p>
          <p>Mielőtt számolsz, mindig gondold végig az <strong>5 lépést</strong>, így nem téveszted el a műveletet!</p>
        </div>
        <FiveStepsLadderSvg />
      </TheorySection>

      {/* 2. Szalagmodell és nyitott mondat */}
      <TheorySection title="2. Szalagmodell és nyitott mondat" badge="Részek és egész" badgeColor="sky">
        <StripModel20Svg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Összesen mennyi? (+)" badge="Egyesítés" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Hanga <strong>8 kék</strong> és <strong>7 zöld</strong> gyöngyöt fűzött fel. Hány gyöngy van összesen?
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Adatok:</strong> 8 kék, 7 zöld.</li>
              <li><strong>Terv:</strong> 8 + 7 = □</li>
              <li><strong>Számolás:</strong> 8 + 2 + 5 = 15.</li>
              <li><strong>Ellenőrzés:</strong> 15 − 7 = 8. Jó!</li>
              <li><strong>Válasz:</strong> Összesen 15 gyöngyöt fűzött fel.</li>
            </ol>
          </TheoryCard>

          <TheoryCard title="Mennyi maradt? (−)" badge="Elvétel" badgeColor="orange">
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              A kosárban <strong>16 alma</strong> volt. Megettünk <strong>7</strong>-et. Hány alma maradt?
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Adatok:</strong> volt 16, megettünk 7-et.</li>
              <li><strong>Terv:</strong> 16 − 7 = □</li>
              <li><strong>Számolás:</strong> 16 − 6 − 1 = 9.</li>
              <li><strong>Ellenőrzés:</strong> 9 + 7 = 16. Jó!</li>
              <li><strong>Válasz:</strong> 9 alma maradt a kosárban.</li>
            </ol>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Vigyázz! Fordított összehasonlítás */}
      <TheorySection title="3. Vigyázz! A „több” nem mindig összeadás!" badge="Fontos csapda" badgeColor="rose">
        <InverseComparisonBarsSvg />
        <TheoryTrapBox
          title="Fordított összehasonlítás — kinek van több?"
          wrong="14 + 5 = 19 kagyló"
          wrongExplanation="Vince 14 kagylót gyűjtött, 5-tel többet, mint Sára. Ha összeadsz, Sárának lenne több (19). Pedig Vince gyűjtött többet!"
          correct="14 − 5 = 9 kagyló"
          correctExplanation="Sárának kevesebb van, mint Vincének, ezért kivonunk. Ellenőrzés: 9 + 5 = 14!"
          tip="Mindig kérdezd meg először: Kinek van TÖBB? Ha a kevesebbet keressük, KIVONUNK!"
        />
        <TheoryCallout type="info" title="És fordítva: a „kevesebb” is lehet összeadás!">
          Ha azt olvasod: <em>„Matyi 7 lépést tett, 6-tal kevesebbet, mint Vince”</em>, akkor Matyi lépett kevesebbet, tehát Vince <strong>többet</strong>! Ilyenkor összeadunk: <strong>7 + 6 = 13</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kétlépéses feladatok és egyenlő két rész */}
      <TheorySection title="4. Kétlépéses feladatok és egyenlő két rész" badge="Több lépés" badgeColor="purple">
        <TwoStepStripSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Előbb a másikat, aztán az összeset!" badge="2 lépés" badgeColor="purple">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Milán <strong>12</strong> gólt lőtt, Bence <strong>5-tel kevesebbet</strong>. Hány gólt lőttek együtt?
              <br />
              1. lépés: Bence góljai: <strong>12 − 5 = 7</strong>.
              <br />
              2. lépés: Együtt: <strong>12 + 7 = 19</strong> gól.
            </p>
          </TheoryCard>

          <TheoryCard title="Egyenlő elosztás korongokkal" badge="Párosítás" badgeColor="teal">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A polcon <strong>20 játék</strong> van: 6 kisautó, a többi egyenlően elosztva két kosárban van. Hány jut egy kosárba?
              <br />
              1. lépés: <strong>20 − 6 = 14</strong> játék megy a két kosárba.
              <br />
              2. lépés: Rakjuk két egyforma részre: <strong>7 + 7 = 14</strong>, tehát <strong>7 játék</strong> jut egy kosárba!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Oszlopdiagram és próbálgatás táblázattal */}
      <TheorySection title="5. Oszlopdiagram és próbálgatás táblázattal" badge="Adatolvasás" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <BarChartSnacksSvg />
          <BudgetTableSvg />
        </div>
        <TheoryCallout type="tip" title="Így olvasd a diagramot és a táblázatot!">
          Az oszlopdiagramon számold meg a színes négyzeteket (például Banán: <strong>8</strong>, Alma: <strong>7</strong>). A táblázatban minden oszlop egy-egy jó megoldás: ellenőrizd, hogy az alsó sorban mindig <strong>18</strong> legyen az összeg!
        </TheoryCallout>
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Melyik művelet kell?" badge="Interaktív labor" badgeColor="orange">
        <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-orange-50 dark:bg-orange-950/40 rounded-xl p-3 text-base text-orange-950 dark:text-orange-100 font-medium">
            {p.text}
          </div>
          <LabStripModel p={p} />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">1. Melyik művelettel számolsz?</p>
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            {OPS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setChosenOp(o);
                  setRes(null);
                }}
                className={`rounded-2xl text-3xl font-black min-h-[56px] border-2 ${
                  chosenOp === o
                    ? o === p.op
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'bg-rose-500 border-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          {chosenOp && !opOk && (
            <div className="rounded-xl p-2.5 bg-rose-100 text-rose-800 text-sm font-bold">
              Nem ez a művelet. {p.hint}
            </div>
          )}
          {opOk && (
            <>
              <div className="rounded-xl p-2.5 bg-emerald-100 text-emerald-800 text-sm font-bold">
                Jó művelet! {p.hint}
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">2. Számolj és ellenőrizz!</p>
              <div className="flex flex-wrap items-center gap-2 text-2xl font-black text-slate-800 dark:text-slate-100">
                <span>
                  {p.a} {p.op} {p.b} =
                </span>
                <input
                  value={val}
                  onChange={(e) => {
                    setVal(e.target.value.replace(/[^0-9]/g, ''));
                    setRes(null);
                  }}
                  inputMode="numeric"
                  className="w-24 rounded-xl border-2 border-orange-300 px-2 py-1 text-center text-slate-900 bg-white"
                  aria-label="eredmény"
                />
                <button
                  type="button"
                  onClick={checkVal}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-base font-bold min-h-[48px]"
                >
                  Ellenőrzés
                </button>
              </div>
              {res === 'ok' && (
                <div className="rounded-xl p-2.5 bg-emerald-100 text-emerald-800 text-sm font-bold">
                  Szuper! Az eredmény {p.ans} ({p.unit}). Ne felejts el mondatban válaszolni!
                </div>
              )}
              {res === 'bad' && (
                <div className="rounded-xl p-2.5 bg-rose-100 text-rose-800 text-sm font-bold">
                  {diffVal === 1
                    ? 'Majdnem! Számolj még egyszer egyesével!'
                    : `Számold újra: ${p.a} ${p.op} ${p.b}.`}
                </div>
              )}
            </>
          )}
          <button
            type="button"
            onClick={newP}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-base font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: Kétlépéses feladat az 5 lépéssel" badge="Interaktív labor" badgeColor="purple">
        <div className="bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 dark:bg-purple-950/40 rounded-xl p-3 text-base text-purple-950 dark:text-purple-100 font-medium">
            {q.text}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STEP_NAMES.map((s, i) => (
              <span
                key={s}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  i < step
                    ? 'bg-emerald-500 text-white'
                    : i === step
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {s}
              </span>
            ))}
          </div>

          {(step === 0 || step === 1 || step === 4) && (
            <>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {step === 0
                  ? 'Melyik az adatok helyes lejegyzése?'
                  : step === 1
                  ? 'Melyik a jó terv?'
                  : 'Melyik a helyes válaszmondat?'}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {optOrder.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => choose(i)}
                    className={`text-left rounded-xl border-2 px-3 py-3 text-base font-bold min-h-[52px] ${
                      wrongPick === i
                        ? 'bg-rose-100 border-rose-400 text-rose-800'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-purple-50'
                    }`}
                  >
                    {optList[i]}
                  </button>
                ))}
              </div>
              {wrongPick !== null && (
                <div className="rounded-xl p-2.5 bg-rose-100 text-rose-800 text-sm font-bold">
                  {step === 0
                    ? 'Olvasd el újra! Melyik szám mit jelent a történetben?'
                    : step === 1
                    ? 'Gondold végig: mi történik először, és mi utána?'
                    : 'Erre kérdeztünk? Nézd meg a számot és a szót is a kérdésben!'}
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Számolj! Terv: {q.plans[0]}</p>
              <div className="flex flex-wrap items-center gap-2 text-xl font-black text-slate-800 dark:text-slate-100">
                <span>□ =</span>
                <input
                  value={v1}
                  onChange={(e) => setV1(e.target.value.replace(/[^0-9]/g, ''))}
                  inputMode="numeric"
                  className="w-20 rounded-xl border-2 border-purple-300 px-2 py-1 text-center text-slate-900 bg-white"
                  aria-label="első lépés"
                />
                <span className="ml-3">△ =</span>
                <input
                  value={v2}
                  onChange={(e) => setV2(e.target.value.replace(/[^0-9]/g, ''))}
                  inputMode="numeric"
                  className="w-20 rounded-xl border-2 border-purple-300 px-2 py-1 text-center text-slate-900 bg-white"
                  aria-label="második lépés"
                />
                <button
                  type="button"
                  onClick={checkCalc}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-base font-bold min-h-[48px]"
                >
                  Ellenőrzés
                </button>
              </div>
              {calcMsg && <div className="rounded-xl p-2.5 bg-rose-100 text-rose-800 text-sm font-bold">{calcMsg}</div>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="rounded-xl p-3 bg-emerald-50 text-emerald-900 text-base font-bold">
                Ellenőrzés: {q.check}
              </div>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-base font-bold min-h-[48px]"
              >
                Tovább a válaszhoz
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="rounded-xl p-3 bg-emerald-100 text-emerald-800 text-base font-bold">
              Ügyes vagy! Mind az 5 lépést sikeresen megoldottad.
            </div>
          )}

          <button
            type="button"
            onClick={newQ}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-base font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WordProblems20G2Theory;
