import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  FiveStepsSvg,
  MoreThanSvg,
  SegmentModelSvg,
  TreeDiagramSvg,
  TryTableSvg,
  ClockTripSvg
} from './WordProblems100G3Figures';

// ---------------------------------------------------------------------------
// Segédek
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

/** „-val, -vel” rag a számhoz (3-mal, 7-tel, 8-cal …). */
const vel = (n: number): string => {
  const tens: Record<number, string> = { 10: 'zel', 20: 'szal', 30: 'cal', 40: 'nel', 50: 'nel', 60: 'nal', 70: 'nel', 80: 'nal', 90: 'nel', 100: 'zal' };
  if (tens[n]) return `${n}-${tens[n]}`;
  const ones: Record<number, string> = { 0: 'val', 1: 'gyel', 2: 'vel', 3: 'mal', 4: 'gyel', 5: 'tel', 6: 'tal', 7: 'tel', 8: 'cal', 9: 'cel' };
  return `${n}-${ones[n % 10]}`;
};

type Op = '+' | '−' | '·' | ':';
const OPS: Op[] = ['+', '−', '·', ':'];

type Kind = 'join' | 'take' | 'more' | 'less' | 'part' | 'groups' | 'share' | 'fit' | 'trap';

interface OneStep {
  kind: Kind;
  text: string;
  a: number;
  b: number;
  op: Op;
  ans: number;
  unit: string;
  hint: string;
}

const makeOneStep = (): OneStep => {
  const kind = pick<Kind>(['join', 'take', 'more', 'less', 'part', 'groups', 'share', 'fit', 'trap']);
  switch (kind) {
    case 'join': {
      const a = rnd(12, 60);
      const b = rnd(5, 95 - a);
      return { kind, a, b, op: '+', ans: a + b, unit: 'alma', text: `A kosárban ${a} piros és ${b} zöld alma van. Hány alma van összesen?`, hint: 'A két rész együtt adja az egészet. Ilyenkor összeadunk.' };
    }
    case 'take': {
      const a = rnd(30, 95);
      const b = rnd(5, a - 8);
      return { kind, a, b, op: '−', ans: a - b, unit: 'utas', text: `A buszon ${a} utas ült. A megállóban ${b} utas leszállt. Hányan maradtak a buszon?`, hint: 'Valakik elmentek, kevesebben lettek. Ilyenkor kivonunk.' };
    }
    case 'more': {
      const a = rnd(15, 80);
      const b = rnd(3, 9);
      return { kind, a, b, op: '+', ans: a + b, unit: 'matrica', text: `Dorka ${a} matricát gyűjtött. Ádám ${vel(b)} többet. Hány matricája van Ádámnak?`, hint: 'Ádámnak több van, mint Dorkának. A „több” itt összeadást jelent.' };
    }
    case 'less': {
      const a = rnd(25, 95);
      const b = rnd(3, 9);
      return { kind, a, b, op: '−', ans: a - b, unit: 'tulipán', text: `Az egyik ágyásban ${a} tulipán nyílik. A másikban ${vel(b)} kevesebb. Hány tulipán nyílik a másik ágyásban?`, hint: 'A másikban kevesebb van. Ilyenkor kivonunk.' };
    }
    case 'part': {
      const a = pick([40, 50, 60, 80, 100]);
      const b = rnd(12, a - 6);
      return { kind, a, b, op: '−', ans: a - b, unit: 'darab', text: `A kirakós ${a} darabos. Már ${b} darab a helyén van. Hány darab hiányzik még?`, hint: 'Ismered az egészet és az egyik részt. A másik részt kivonással kapod meg.' };
    }
    case 'groups': {
      const a = rnd(2, 9);
      const b = rnd(2, 10);
      return { kind, a, b, op: '·', ans: a * b, unit: 'ceruza', text: `${a} dobozban ${b}-${b} ceruza van. Hány ceruza van összesen?`, hint: `Minden dobozban ugyanannyi van. ${a}-szor ${b} – ez szorzás.` };
    }
    case 'share': {
      const k = rnd(2, 9);
      const each = rnd(2, 10);
      return { kind, a: k * each, b: k, op: ':', ans: each, unit: 'szem', text: `${k * each} szem cukrot ${k} gyerek egyenlően oszt el. Hány szemet kap egy gyerek?`, hint: 'Egyenlő részekre osztunk. Ez osztás.' };
    }
    case 'fit': {
      const size = rnd(2, 9);
      const cnt = rnd(2, 10);
      return { kind, a: size * cnt, b: size, op: ':', ans: cnt, unit: 'kanna', text: `${size * cnt} liter vizet ${size} literes kannákba töltünk. Hány kanna telik meg?`, hint: `Azt keressük, hányszor van meg a ${size} a ${size * cnt}-ben. Ez osztás.` };
    }
    default: {
      const a = rnd(30, 95);
      const b = rnd(3, 9);
      return { kind: 'trap', a, b, op: '−', ans: a - b, unit: 'cm', text: `A piros szalag ${a} cm hosszú. Ez ${b} cm-rel hosszabb a kéknél. Milyen hosszú a kék szalag?`, hint: 'Vigyázz! A piros a hosszabb, a kék a rövidebb. Ezért kivonunk.' };
    }
  }
};

/** Kis szemléltető rajz a laborhoz. */
const LabModel: React.FC<{ p: OneStep }> = ({ p }) => {
  if (p.kind === 'fit') {
    return (
      <svg viewBox="0 0 460 110" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
        <rect x="40" y="18" width="120" height="70" rx="10" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" />
        <text x="100" y="58" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0c4a6e">{p.a} liter</text>
        <path d="M 175 53 L 225 53" stroke="#64748b" strokeWidth="2.5" />
        <polygon points="225,53 215,47 215,59" fill="#64748b" />
        <path d="M 250 40 L 300 40 L 296 88 L 254 88 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
        <text x="275" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">{p.b} l</text>
        <text x="370" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626">? kanna</text>
      </svg>
    );
  }
  if (p.kind === 'groups' || p.kind === 'share') {
    const boxes = p.kind === 'groups' ? p.a : p.b;
    const w = Math.min(46, 420 / boxes);
    return (
      <svg viewBox="0 0 460 110" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
        {Array.from({ length: boxes }, (_, i) => {
          const x = 20 + i * (w + 2);
          return (
            <g key={i}>
              <rect x={x} y="20" width={w - 4} height="58" rx="6" fill="#ede9fe" stroke="#7c3aed" />
              {p.kind === 'groups'
                ? Array.from({ length: p.b }, (_, j) => (
                    <circle key={j} cx={x + 9 + (j % 2) * (w - 22)} cy={30 + Math.floor(j / 2) * 10} r="3.5" fill="#f59e0b" />
                  ))
                : (
                  <text x={x + (w - 4) / 2} y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">?</text>
                )}
            </g>
          );
        })}
        <text x="230" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6">
          {p.kind === 'groups' ? `${p.a} doboz, mindegyikben ${p.b}` : `${p.a} szem cukor, ${p.b} gyerek`}
        </text>
      </svg>
    );
  }
  // összeadás/kivonás: szalagos ábra
  const whole = p.kind === 'join' || p.kind === 'more' ? p.ans : p.a;
  const sc = 380 / whole;
  const x0 = 50;
  if (p.kind === 'more' || p.kind === 'less' || p.kind === 'trap') {
    const big = p.kind === 'more' ? p.ans : p.a;
    const small = p.kind === 'more' ? p.a : p.ans;
    const s2 = 360 / big;
    const bigLabel = p.kind === 'more' ? '?' : String(big);
    const smallLabel = p.kind === 'more' ? String(small) : '?';
    const topName = p.kind === 'more' ? 'Ádám' : p.kind === 'less' ? '1. ágyás' : 'piros';
    const botName = p.kind === 'more' ? 'Dorka' : p.kind === 'less' ? '2. ágyás' : 'kék';
    return (
      <svg viewBox="0 0 460 110" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
        <text x="8" y="36" fontSize="11" fontWeight="bold" fill="#334155">{topName}</text>
        <rect x="70" y="20" width={big * s2} height="24" rx="5" fill="#fda4af" stroke="#be123c" />
        <text x={70 + (big * s2) / 2} y="37" textAnchor="middle" fontSize="13" fontWeight="bold" fill={bigLabel === '?' ? '#dc2626' : '#881337'}>{bigLabel}</text>
        <text x="8" y="76" fontSize="11" fontWeight="bold" fill="#334155">{botName}</text>
        <rect x="70" y="60" width={small * s2} height="24" rx="5" fill="#7dd3fc" stroke="#0369a1" />
        <text x={70 + (small * s2) / 2} y="77" textAnchor="middle" fontSize="13" fontWeight="bold" fill={smallLabel === '?' ? '#dc2626' : '#0c4a6e'}>{smallLabel}</text>
        <rect x={70 + small * s2} y="60" width={(big - small) * s2} height="24" rx="5" fill="none" stroke="#a16207" strokeDasharray="4 3" />
        <text x={70 + small * s2 + ((big - small) * s2) / 2} y="100" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">{p.b}</text>
      </svg>
    );
  }
  const first = p.kind === 'join' ? p.a : p.kind === 'take' ? p.ans : p.b;
  const firstLabel = p.kind === 'join' ? String(p.a) : p.kind === 'take' ? '?' : String(p.b);
  const second = whole - first;
  const secondLabel = p.kind === 'join' ? String(p.b) : p.kind === 'take' ? String(p.b) : '?';
  const wholeLabel = p.kind === 'join' ? '?' : String(whole);
  return (
    <svg viewBox="0 0 460 110" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
      <rect x={x0} y="16" width={whole * sc} height="24" rx="5" fill="#fed7aa" stroke="#c2410c" />
      <text x={x0 + (whole * sc) / 2} y="33" textAnchor="middle" fontSize="13" fontWeight="bold" fill={wholeLabel === '?' ? '#dc2626' : '#7c2d12'}>{wholeLabel}</text>
      <rect x={x0} y="58" width={first * sc} height="24" rx="5" fill="#bbf7d0" stroke="#15803d" />
      <text x={x0 + (first * sc) / 2} y="75" textAnchor="middle" fontSize="13" fontWeight="bold" fill={firstLabel === '?' ? '#dc2626' : '#14532d'}>{firstLabel}</text>
      <rect x={x0 + first * sc} y="58" width={second * sc} height="24" rx="5" fill="#bfdbfe" stroke="#1d4ed8" />
      <text x={x0 + first * sc + (second * sc) / 2} y="75" textAnchor="middle" fontSize="13" fontWeight="bold" fill={secondLabel === '?' ? '#dc2626' : '#1e3a8a'}>{secondLabel}</text>
      <text x="230" y="102" textAnchor="middle" fontSize="11" fill="#475569">{p.kind === 'take' ? 'leszállt: ' + p.b : p.kind === 'part' ? 'már a helyén: ' + p.b : 'piros + zöld'}</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Labor II – kétlépéses feladat az 5 lépéssel
// ---------------------------------------------------------------------------
interface TwoStep {
  text: string;
  data: string[]; // [helyes, rossz1, rossz2]
  plans: string[]; // [helyes, rossz1, rossz2]
  step1: number;
  ans: number;
  check: string;
  answers: string[]; // [helyes, rossz1, rossz2]
}

const NAMES = ['Gergő', 'Zsófi', 'Levi', 'Noémi', 'Kristóf', 'Vivi'];

const makeTwoStep = (): TwoStep => {
  const t = rnd(0, 2);
  const n = pick(NAMES);
  if (t === 0) {
    const x = rnd(2, 5);
    const y = rnd(4, 9);
    const z = rnd(5, Math.min(30, 99 - x * y));
    const s1 = x * y;
    return {
      text: `${n} ${x} csomag kártyát vett. Mindegyikben ${y} kártya van. Már volt ${z} kártyája. Hány kártyája lett?`,
      data: [`csomag: ${x}, egy csomagban: ${y}, már volt: ${z}`, `csomag: ${x}, egy csomagban: ${z}, már volt: ${y}`, `csomag: ${y}, egy csomagban: ${y}, már volt: ${z}`],
      plans: [`${x} · ${y} = □,   □ + ${z} = △`, `${x} + ${y} = □,   □ + ${z} = △`, `${x} · ${y} = □,   □ − ${z} = △`],
      step1: s1,
      ans: s1 + z,
      check: `${s1 + z} − ${z} = ${s1}, és ${s1} : ${x} = ${y}. Stimmel!`,
      answers: [`Most ${s1 + z} kártyája van.`, `Most ${s1} kártyája van.`, `Most ${s1 + z} csomagja van.`]
    };
  }
  if (t === 1) {
    const m = pick([50, 60, 80, 100]);
    const p1 = rnd(8, Math.floor(m / 2) - 2);
    const p2 = rnd(5, m - p1 - 3);
    const s1 = m - p1;
    return {
      text: `${n} ${m} Ft-ot vitt a boltba. Vett egy ${p1} Ft-os radírt és egy ${p2} Ft-os ceruzát. Mennyi pénze maradt?`,
      data: [`volt: ${m} Ft, radír: ${p1} Ft, ceruza: ${p2} Ft`, `volt: ${m} Ft, radír: ${p2} Ft, ceruza: ${m - p2} Ft`, `volt: ${p1 + p2} Ft, radír: ${p1} Ft, ceruza: ${p2} Ft`],
      plans: [`${m} − ${p1} = □,   □ − ${p2} = △`, `${m} − ${p1} = □,   □ + ${p2} = △`, `${p1} + ${p2} = □,   □ + ${m} = △`],
      step1: s1,
      ans: s1 - p2,
      check: `${s1 - p2} + ${p2} + ${p1} = ${m}. Stimmel!`,
      answers: [`${s1 - p2} Ft-ja maradt.`, `${p1 + p2} Ft-ja maradt.`, `${s1 - p2} ceruzája maradt.`]
    };
  }
  const a = rnd(15, 44);
  const b = rnd(3, 9);
  const s1 = a + b;
  return {
    text: `Az 1. polcon ${a} könyv van. A 2. polcon ${vel(b)} több. Hány könyv van a két polcon összesen?`,
    data: [`1. polc: ${a}, a 2. polcon ${vel(b)} több`, `1. polc: ${a}, 2. polc: ${b}`, `1. polc: ${a}, a 2. polcon ${vel(b)} kevesebb`],
    plans: [`${a} + ${b} = □,   ${a} + □ = △`, `${a} + ${b} = □,   □ + ${b} = △`, `${a} − ${b} = □,   ${a} + □ = △`],
    step1: s1,
    ans: a + s1,
    check: `A 2. polcon ${s1} könyv van, ez ${vel(b)} több, mint ${a}. ${a} + ${s1} = ${a + s1}. Stimmel!`,
    answers: [`A két polcon összesen ${a + s1} könyv van.`, `A 2. polcon ${s1} könyv van.`, `A két polcon összesen ${a + s1} füzet van.`]
  };
};

const shuffledIdx = () => shuffle([0, 1, 2]);

const STEP_NAMES = ['1. Adatok', '2. Terv', '3. Számolás', '4. Ellenőrzés', '5. Válasz'];

export const WordProblems100G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [p, setP] = useState<OneStep>(() => ({ kind: 'join', a: 23, b: 14, op: '+', ans: 37, unit: 'alma', text: 'A kosárban 23 piros és 14 zöld alma van. Hány alma van összesen?', hint: 'A két rész együtt adja az egészet. Ilyenkor összeadunk.' }));
  const [chosenOp, setChosenOp] = useState<Op | null>(null);
  const [val, setVal] = useState('');
  const [res, setRes] = useState<null | 'ok' | 'bad'>(null);
  const opOk = chosenOp === p.op;
  const newP = () => {
    setP(makeOneStep());
    setChosenOp(null);
    setVal('');
    setRes(null);
  };
  const checkVal = () => setRes(Number(val) === p.ans ? 'ok' : 'bad');
  const diff = Math.abs(Number(val) - p.ans);

  // Labor II
  const [q, setQ] = useState<TwoStep>(() => makeTwoStep());
  const [order, setOrder] = useState<{ d: number[]; p: number[]; a: number[] }>(() => ({ d: shuffledIdx(), p: shuffledIdx(), a: shuffledIdx() }));
  const [step, setStep] = useState(0);
  const [wrongPick, setWrongPick] = useState<number | null>(null);
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [calcMsg, setCalcMsg] = useState<string | null>(null);
  const newQ = () => {
    setQ(makeTwoStep());
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
    } else setWrongPick(idx);
  };
  const checkCalc = () => {
    if (Number(v1) !== q.step1) setCalcMsg(`Az első lépés még nem jó. Számold újra az első számfeladatot!`);
    else if (Number(v2) !== q.ans) setCalcMsg(`Az első lépés jó (${q.step1}). A másodikat számold újra!`);
    else {
      setCalcMsg(null);
      setStep(3);
    }
  };
  const optList = step === 0 ? q.data : step === 1 ? q.plans : q.answers;
  const optOrder = step === 0 ? order.d : step === 1 ? order.p : order.a;

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="szoveges-feladatok"
      grade={3}
      chapterId="szamolas-100-ig"
      title="5. Szöveges feladatok"
      subtitle="Olvasd el, gyűjtsd ki az adatokat, tervezz, számolj, ellenőrizz, és válaszolj!"
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_szoveges_feladatok_tananyag.pdf"
      practiceTitle="Készen állsz a szöveges feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AZ 5 LÉPÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center text-base font-black text-amber-900 dark:text-amber-200">
              Adatok → Terv → Számolás → Ellenőrzés → Válasz
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Olvasd el <strong>kétszer</strong> a feladatot.</li>
              <li>Írd fel a számfeladatot. Segít egy <strong>rajz</strong> vagy <strong>táblázat</strong>.</li>
              <li>A végén <strong>mondatban</strong> válaszolj.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 16–17. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A szöveges feladat egy kis történet. A végén egy <strong>kérdés</strong> van.</p>
          <p>A számolás előtt <strong>meg kell érteni</strong> a történetet. Ebben segít az 5 lépés.</p>
        </div>
        <FiveStepsSvg />
      </TheorySection>

      <TheorySection title="2. Nézzük meg együtt!" badge="Mintapélda" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MoreThanSvg />
          <TheoryCard title="Misi és Lili kavicsai" badge="7-tel több" badgeColor="sky">
            <p className="text-sm text-slate-700 mb-2">Misi 26 kavicsot gyűjtött. Lili 7-tel többet. Hány kavicsot gyűjtött Lili?</p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>Adatok:</strong> Misi: 26. Lili: 7-tel több. Kérdés: Lili kavicsai.</li>
              <li><strong>Terv:</strong> 26 + 7 = □</li>
              <li><strong>Számolás:</strong> 26 + 7 = 33</li>
              <li><strong>Ellenőrzés:</strong> 33 − 7 = 26. Jó!</li>
              <li><strong>Válasz:</strong> Lili 33 kavicsot gyűjtött.</li>
            </ol>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Még egy kérdés">
          Hány kavicsot gyűjtöttek együtt? <strong>26 + 33 = 59</strong>. Együtt 59 kavicsot gyűjtöttek.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Rajzolj szakaszt!" badge="Szakaszos ábra" badgeColor="orange">
        <SegmentModelSvg />
        <p className="text-sm text-slate-700">
          A kerítés 50 m hosszú. Apa már 32 m-t lefestett. Hány métert kell még festenie? A rajzon jól látszik: az <strong>egészből</strong> elveszem a <strong>kész részt</strong>.
          <br />
          <strong>Válasz:</strong> Még 18 métert kell festenie.
        </p>
      </TheorySection>

      <TheorySection title="4. Táblázat, rajz, óra" badge="Segítő eszközök" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Hányféleképpen?" badge="Elágazás" badgeColor="purple">
            <TreeDiagramSvg />
            <p className="text-sm text-slate-700">Minden sapkához 3 sál illik. 2 sapka van, ezért <strong>2 · 3 = 6</strong> öltözék.</p>
          </TheoryCard>
          <TheoryCard title="Próbálgatás" badge="Táblázat" badgeColor="emerald">
            <TryTableSvg />
            <p className="text-sm text-slate-700">Bori kétszer annyi matricát gyűjtött, mint Dani. Együtt 36 matricájuk van. Próbálgatunk: Dani 12, Bori 24. <strong>12 + 24 = 36</strong>. Ez jó!</p>
          </TheoryCard>
        </div>
        <TheoryCard title="Mennyi idő telt el?" badge="Óra" badgeColor="sky">
          <ClockTripSvg />
          <p className="text-sm text-slate-700">A kirándulás 9 órakor kezdődött és 13 órakor ért véget. Számolj tovább 9-től 13-ig: <strong>4 óra</strong>. (13 − 9 = 4)</p>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="5. Vigyázz! A „több” nem mindig összeadás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Melyik szalag hosszabb?"
          wrong="40 + 6 = 46 cm"
          wrongExplanation="A piros szalag 40 cm. Ez 6 cm-rel hosszabb a kéknél. Ha összeadsz, a kék lenne a hosszabb. Pedig a piros a hosszabb!"
          correct="40 − 6 = 34 cm"
          correctExplanation="A kék szalag a rövidebb, ezért kivonunk. Ellenőrzés: 34 + 6 = 40. Jó!"
          tip="Kérdezd meg magadtól: kinek van több? Kinek van kevesebb?"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="6. Labor I: Melyik művelet kell?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-orange-50 rounded-xl p-3 text-base text-orange-950 font-medium">{p.text}</div>
          <LabModel p={p} />
          <p className="text-sm font-bold text-slate-700">1. Melyik művelettel számolsz?</p>
          <div className="grid grid-cols-4 gap-2">
            {OPS.map((o) => (
              <button
                key={o}
                onClick={() => {
                  setChosenOp(o);
                  setRes(null);
                }}
                className={`rounded-2xl text-3xl font-black min-h-[60px] border-2 ${
                  chosenOp === o ? (o === p.op ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-rose-500 border-rose-600 text-white') : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          {chosenOp && !opOk && <div className="rounded-xl p-2 bg-rose-100 text-rose-800 text-sm font-bold">Nem ez. {p.hint}</div>}
          {opOk && (
            <>
              <div className="rounded-xl p-2 bg-emerald-100 text-emerald-800 text-sm font-bold">Jó művelet! {p.hint}</div>
              <p className="text-sm font-bold text-slate-700">2. Számolj!</p>
              <div className="flex flex-wrap items-center gap-2 text-2xl font-black text-slate-800">
                <span>{p.a} {p.op} {p.b} =</span>
                <input
                  value={val}
                  onChange={(e) => {
                    setVal(e.target.value.replace(/[^0-9]/g, ''));
                    setRes(null);
                  }}
                  inputMode="numeric"
                  className="w-24 rounded-xl border-2 border-orange-300 px-2 py-1 text-center"
                  aria-label="eredmény"
                />
                <button onClick={checkVal} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-base font-bold min-h-[48px]">
                  Ellenőrzés
                </button>
              </div>
              {res === 'ok' && <div className="rounded-xl p-2 bg-emerald-100 text-emerald-800 text-sm font-bold">Szuper! Az eredmény {p.ans}. Ne felejts el mondatban válaszolni!</div>}
              {res === 'bad' && (
                <div className="rounded-xl p-2 bg-rose-100 text-rose-800 text-sm font-bold">
                  {diff === 10 || diff === 20 ? 'Majdnem! Nézd meg újra a tízeseket!' : diff === 1 ? 'Majdnem! Nézd meg újra az egyeseket!' : `Számold újra: ${p.a} ${p.op} ${p.b}.`}
                </div>
              )}
            </>
          )}
          <button onClick={newP} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="7. Labor II: Lépésről lépésre" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 rounded-xl p-3 text-base text-purple-950 font-medium">{q.text}</div>
          <div className="flex flex-wrap gap-1">
            {STEP_NAMES.map((s, i) => (
              <span key={s} className={`px-2 py-1 rounded-lg text-xs font-bold ${i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {s}
              </span>
            ))}
          </div>
          {(step === 0 || step === 1 || step === 4) && (
            <>
              <p className="text-sm font-bold text-slate-700">
                {step === 0 ? 'Melyik az adatok jó lejegyzése?' : step === 1 ? 'Melyik a jó terv?' : 'Melyik a jó válasz?'}
              </p>
              <div className="grid grid-cols-1 gap-2">
                {optOrder.map((i) => (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    className={`text-left rounded-xl border-2 px-3 py-3 text-base font-bold min-h-[52px] ${wrongPick === i ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-purple-50'}`}
                  >
                    {optList[i]}
                  </button>
                ))}
              </div>
              {wrongPick !== null && (
                <div className="rounded-xl p-2 bg-rose-100 text-rose-800 text-sm font-bold">
                  {step === 0 ? 'Olvasd el újra! Melyik szám mit jelent a történetben?' : step === 1 ? 'Gondold végig: mi történik először, és mi utána?' : 'Erre kérdeztünk? Nézd meg a kérdést és a mértékegységet is!'}
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-700">Számolj! Terv: {q.plans[0]}</p>
              <div className="flex flex-wrap items-center gap-2 text-xl font-black">
                <span>□ =</span>
                <input value={v1} onChange={(e) => setV1(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" className="w-20 rounded-xl border-2 border-purple-300 px-2 py-1 text-center" aria-label="első lépés" />
                <span className="ml-4">△ =</span>
                <input value={v2} onChange={(e) => setV2(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" className="w-20 rounded-xl border-2 border-purple-300 px-2 py-1 text-center" aria-label="második lépés" />
                <button onClick={checkCalc} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-base font-bold min-h-[48px]">
                  Kész
                </button>
              </div>
              {calcMsg && <div className="rounded-xl p-2 bg-rose-100 text-rose-800 text-sm font-bold">{calcMsg}</div>}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <div className="rounded-xl p-3 bg-emerald-50 text-emerald-900 text-base font-bold">Ellenőrzés: {q.check}</div>
              <button onClick={() => setStep(4)} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-base font-bold min-h-[48px]">
                Tovább a válaszhoz
              </button>
            </div>
          )}
          {step === 5 && <div className="rounded-xl p-3 bg-emerald-100 text-emerald-800 text-base font-bold">Ügyes vagy! Mind az 5 lépést megcsináltad.</div>}
          <button onClick={newQ} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WordProblems100G3Theory;
