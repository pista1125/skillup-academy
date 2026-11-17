import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { ChapterMapSvg, BlockSignsSvg, VennPartsSvg, CountingRecapSvg, QuantifiersSvg } from './GroupingExamG3Figures';
import { FONT, Block, LogicBlock, Venn, AskTop, Region, CodeRow, ALL_BLOCKS, COLOR_NAME, SHAPE_NAME, blockName, sameBlock, regionOpts, permutations } from './GroupingExamG3Parts';

/** Névelő a szám elé: „az 5”, „az 1”, „a 340”. */
const art = (n: number) => (String(n)[0] === '5' || n === 1 ? 'az' : 'a');
const Art = (n: number) => (art(n) === 'az' ? 'Az' : 'A');
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <X,>(arr: X[]): X => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <X,>(arr: X[]): X[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatsor
// ---------------------------------------------------------------------------
interface NProp {
  id: string;
  label: string;
  /** „A 136 …” mondat folytatása */
  yes: string;
  no: string;
  test: (n: number) => boolean;
}
const NPROPS: NProp[] = [
  { id: 'paros', label: 'páros', yes: 'páros', no: 'páratlan', test: (n) => n % 2 === 0 },
  { id: 'paratlan', label: 'páratlan', yes: 'páratlan', no: 'páros', test: (n) => n % 2 === 1 },
  { id: 'harom', label: 'háromjegyű', yes: 'háromjegyű', no: 'nem háromjegyű', test: (n) => n >= 100 },
  { id: 'tizes', label: 'kerek tízes', yes: 'kerek tízes', no: 'nem kerek tízes', test: (n) => n % 10 === 0 },
  { id: 'kis250', label: '250-nél kisebb', yes: 'kisebb 250-nél', no: 'nem kisebb 250-nél', test: (n) => n < 250 },
  { id: 'nagy300', label: '300-nál nagyobb', yes: 'nagyobb 300-nál', no: 'nem nagyobb 300-nál', test: (n) => n > 300 }
];
const P = (id: string) => NPROPS.find((p) => p.id === id) as NProp;

interface MixTask {
  kind: 'venn' | 'count' | 'stmt' | 'odd';
  question: string;
  options: string[];
  answer: string;
  why: string;
  venn?: { a: string; b: string; n: number };
  nums?: number[];
}

const VENN_PAIRS: [string, string][] = [
  ['paros', 'harom'],
  ['paratlan', 'harom'],
  ['paros', 'kis250'],
  ['tizes', 'nagy300'],
  ['paratlan', 'kis250'],
  ['tizes', 'harom'],
  ['paros', 'nagy300']
];

const makeVenn = (): MixTask => {
  const [ia, ib] = pick(VENN_PAIRS);
  const A = P(ia);
  const Bp = P(ib);
  const target = pick<Region>(['a', 'ab', 'b', 'out']);
  let n = 0;
  for (let k = 0; k < 2000; k++) {
    n = rnd(1, 500);
    const r: Region = A.test(n) && Bp.test(n) ? 'ab' : A.test(n) ? 'a' : Bp.test(n) ? 'b' : 'out';
    if (r === target) break;
  }
  const r: Region = A.test(n) && Bp.test(n) ? 'ab' : A.test(n) ? 'a' : Bp.test(n) ? 'b' : 'out';
  const opts = regionOpts(A.label, Bp.label, r);
  return {
    kind: 'venn',
    question: `Hová kerül ${art(n)} ${n}?`,
    options: shuffle(opts),
    answer: opts[0],
    why: `${Art(n)} ${n} ${A.test(n) ? A.yes : A.no}, és ${Bp.test(n) ? Bp.yes : Bp.no}.`,
    venn: { a: A.label, b: Bp.label, n }
  };
};

const numOpts = (right: number, wrong: number[]): string[] => {
  const out = [right];
  wrong.forEach((w) => {
    if (w > 0 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    if (!out.includes(right + k)) out.push(right + k);
    k++;
  }
  return shuffle(out.map(String));
};

const COLORS_HU = ['piros', 'kék', 'zöld', 'sárga', 'lila'];
const makeCount = (): MixTask => {
  const t = rnd(0, 2);
  if (t === 0) {
    const n = pick([2, 3]);
    const items = shuffle(COLORS_HU).slice(0, n);
    const right = n === 2 ? 2 : 6;
    return {
      kind: 'count',
      question: `Hányféle sorrendben teheted egymás mellé ezeket a golyókat: ${items.join(', ')}?`,
      options: numOpts(right, n === 2 ? [1, 4, 3] : [3, 9, 4]),
      answer: String(right),
      why: n === 2 ? 'Kétféleképpen: vagy az egyik elöl, vagy a másik.' : 'Mindegyik golyó 2-szer állhat elöl: 3 · 2 = 6.'
    };
  }
  if (t === 1) {
    const ds = shuffle(['0', '1', '2', '3', '4']).slice(0, 3);
    const valid = permutations(ds).filter((p) => p[0] !== '0');
    const right = valid.length;
    return {
      kind: 'count',
      question: `Hány háromjegyű számot rakhatsz ki a ${ds.join(', ')} kártyákból? Minden kártyát egyszer használsz.`,
      options: numOpts(right, [right === 6 ? 4 : 6, 3, 9]),
      answer: String(right),
      why: `${valid.map((p) => p.join('')).join(', ')}.${ds.includes('0') ? ' A 0 nem állhat elöl.' : ''} Ez ${right} szám.`
    };
  }
  const a = rnd(2, 3);
  const b = rnd(2, 4);
  return {
    kind: 'count',
    question: `${a} pólód és ${b} nadrágod van. Hányféleképpen öltözhetsz fel?`,
    options: numOpts(a * b, [a + b, a * b + 1, b]),
    answer: String(a * b),
    why: `Mindegyik pólóhoz ${b} nadrág illik: ${a} · ${b} = ${a * b}. Nem összeadunk!`
  };
};

const sample = (test: (n: number) => boolean, k: number, lo = 1, hi = 500): number[] => {
  const out: number[] = [];
  for (let g = 0; g < 5000 && out.length < k; g++) {
    const n = rnd(lo, hi);
    if (test(n) && !out.includes(n)) out.push(n);
  }
  return out;
};

const makeStmt = (): MixTask => {
  const p = pick([P('paros'), P('paratlan'), P('harom'), P('tizes'), P('nagy300')]);
  const kind = pick(['minden', 'van', 'sem'] as const);
  const want = Math.random() < 0.5;
  let nums: number[];
  if (kind === 'minden') nums = want ? sample(p.test, 5) : shuffle([...sample(p.test, 4), ...sample((n) => !p.test(n), 1)]);
  else if (kind === 'van') nums = want ? shuffle([...sample((n) => !p.test(n), 4), ...sample(p.test, 1)]) : sample((n) => !p.test(n), 5);
  else nums = want ? sample((n) => !p.test(n), 5) : shuffle([...sample((n) => !p.test(n), 4), ...sample(p.test, 1)]);
  const hits = nums.filter(p.test);
  const st = kind === 'minden' ? `Minden szám ${p.yes}.` : kind === 'van' ? `Van olyan szám, amelyik ${p.yes}.` : `Egyik szám sem ${p.yes}.`;
  const truth = kind === 'minden' ? hits.length === nums.length : kind === 'van' ? hits.length > 0 : hits.length === 0;
  const bad = nums.filter((n) => !p.test(n));
  const why =
    kind === 'minden'
      ? truth
        ? `Mind az 5 szám ${p.yes}.`
        : `${Art(bad[0])} ${bad[0]} nem ${p.yes}. Egy is elég, és hamis.`
      : kind === 'van'
        ? truth
          ? `${Art(hits[0])} ${hits[0]} ${p.yes}. Egy is elég, és igaz.`
          : `Egyik szám sem ${p.yes}.`
        : truth
          ? `Tényleg egyik sem ${p.yes}.`
          : `${Art(hits[0])} ${hits[0]} ${p.yes}. Ezért hamis.`;
  return { kind: 'stmt', question: `„${st}” Igaz vagy hamis?`, options: ['Igaz', 'Hamis'], answer: truth ? 'Igaz' : 'Hamis', why, nums };
};

const makeOdd = (): MixTask => {
  const t = rnd(0, 2);
  let good: number[];
  let odd: number;
  let why: string;
  const notTen = (n: number) => n % 10 !== 0;
  if (t === 0) {
    good = sample((n) => n % 2 === 0 && notTen(n), 3, 100, 499);
    odd = sample((n) => n % 2 === 1 && n % 10 !== 5, 1, 100, 499)[0];
    why = `A többi páros, ${art(odd)} ${odd} páratlan.`;
  } else if (t === 1) {
    good = sample((n) => n % 10 === 0, 3, 100, 490);
    odd = sample((n) => n % 2 === 0 && notTen(n), 1, 100, 499)[0];
    why = `A többi kerek tízes (0 a vége), ${art(odd)} ${odd} nem.`;
  } else {
    good = sample((n) => n % 2 === 0 && notTen(n), 3, 100, 499);
    odd = sample((n) => n % 2 === 0 && notTen(n), 1, 12, 98)[0];
    why = `A többi háromjegyű, ${art(odd)} ${odd} kétjegyű.`;
  }
  const nums = shuffle([...good, odd]);
  return { kind: 'odd', question: 'Melyik szám nem illik a többi közé?', options: nums.map(String), answer: String(odd), why, nums };
};

const newMix = (): MixTask => pick([makeVenn, makeCount, makeStmt, makeOdd])();

const FIRST_MIX: MixTask = (() => {
  const opts = regionOpts('páros', 'háromjegyű', 'ab');
  return { kind: 'venn', question: 'Hová kerül a 136?', options: [opts[1], opts[0], opts[3], opts[2]], answer: opts[0], why: 'A 136 páros, és háromjegyű.', venn: { a: 'páros', b: 'háromjegyű', n: 136 } };
})();

// ---------------------------------------------------------------------------
// Labor II – Jelkártya: melyik lapra gondoltam?
// ---------------------------------------------------------------------------
const OTHER_COLOR: Record<Block['color'], Block['color'][]> = { piros: ['sarga', 'kek', 'zold'], sarga: ['piros', 'kek', 'zold'], kek: ['piros', 'sarga', 'zold'], zold: ['piros', 'sarga', 'kek'] };
const OTHER_SHAPE: Record<Block['shape'], Block['shape'][]> = { kor: ['haromszog', 'negyzet'], haromszog: ['kor', 'negyzet'], negyzet: ['kor', 'haromszog'] };

const newCode = (): { secret: Block; cands: Block[] } => {
  const secret = pick(ALL_BLOCKS);
  const variants: Block[] = [
    { ...secret, color: pick(OTHER_COLOR[secret.color]) },
    { ...secret, big: !secret.big },
    { ...secret, holed: !secret.holed },
    { ...secret, shape: pick(OTHER_SHAPE[secret.shape]) },
    { ...secret, color: pick(OTHER_COLOR[secret.color]), shape: pick(OTHER_SHAPE[secret.shape]) }
  ];
  const cands: Block[] = [secret];
  variants.forEach((v) => {
    if (!cands.some((c) => sameBlock(c, v))) cands.push(v);
  });
  return { secret, cands: shuffle(cands) };
};
const FIRST_CODE = (() => {
  const secret: Block = { color: 'zold', shape: 'haromszog', big: false, holed: true };
  const cands: Block[] = [
    { color: 'zold', shape: 'haromszog', big: true, holed: true },
    { color: 'kek', shape: 'haromszog', big: false, holed: true },
    secret,
    { color: 'zold', shape: 'haromszog', big: false, holed: false },
    { color: 'zold', shape: 'kor', big: false, holed: true },
    { color: 'sarga', shape: 'negyzet', big: false, holed: true }
  ];
  return { secret, cands };
})();

const diffText = (b: Block, s: Block): string => {
  if (b.color !== s.color) return `Ez a lap ${COLOR_NAME[b.color]}, de a paca ${COLOR_NAME[s.color]}.`;
  if (b.big !== s.big) return `Ez a lap ${b.big ? 'nagy' : 'kicsi'}, de az emberke ${s.big ? 'nagy' : 'kicsi'}.`;
  if (b.holed !== s.holed) return `Ez a lap ${b.holed ? 'lyukas' : 'nem lyukas'}, de a jel ${s.holed ? 'lyukasat' : 'nem lyukasat'} mutat.`;
  return `Ez a lap ${SHAPE_NAME[b.shape]}, de a jel ${SHAPE_NAME[s.shape]}.`;
};

const BlockSvg: React.FC<{ b: Block }> = ({ b }) => (
  <svg viewBox="0 0 56 56" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <LogicBlock b={b} x={28} y={28} sw={2.5} />
  </svg>
);

export const GroupingExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [mix, setMix] = useState<MixTask>(FIRST_MIX);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const choose = (o: string) => {
    if (chosen) return;
    setChosen(o);
    setScore({ ok: score.ok + (o === mix.answer ? 1 : 0), all: score.all + 1 });
  };

  // Labor II
  const [code, setCode] = useState(FIRST_CODE);
  const [codeMsg, setCodeMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [tried, setTried] = useState<number[]>([]);

  return (
    <TheoryTemplate
      topicId="g3-grouping"
      subtopicId="gyakorlas-tudasproba"
      grade={3}
      chapterId="valogatasok-csoportositasok"
      title="4. Gyakorlás, tudáspróba"
      subtitle="Válogatás, halmazábra, sorrend és lehetőségek – minden együtt."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_valogatasok_csoportositasok_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten – mutasd meg, mit tudsz!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A FEJEZET 3 SZABÁLYA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-sm font-black text-emerald-900 dark:text-emerald-200">
              Olvasd el a címkét, és kérdezz: igaz rá?
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Közös rész: mindkét címke igaz.</li>
              <li>3 dolog: 6 sorrend. Elöl nem állhat 0.</li>
              <li>„Minden”: egy rossz is elég, és hamis.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 68–73. o." badgeColor="emerald">
        <ChapterMapSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ebben a fejezetben <strong>válogattál</strong>: logikai lapokat, számokat, gombokat.</p>
          <p>Halmazábrába tetted őket, és megtaláltad a <strong>közös részt</strong>.</p>
          <p>Sorba raktál, és megszámoltad, <strong>hányféle</strong> lehetőség van. Most mindent együtt gyakorolsz.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A logikai lapok és a jelek" badge="4 tulajdonság" badgeColor="sky">
        <BlockSignsSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Minden lapnak 4 tulajdonsága van. A jelekből kitalálod, melyik lapra gondoltunk.</p>
          <p>4 szín · 3 forma · 2 méret · lyukas vagy nem: összesen <strong>48 lap</strong>, nincs két egyforma.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. A halmazábra négy része" badge="közös rész" badgeColor="purple">
        <VennPartsSvg />
        <TheoryCallout type="tip" title="Hány piros lap van?">A „piros” karikában lévő lapokat számold: a közös részben lévőket is! Azok is pirosak.</TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Sorrendek és lehetőségek" badge="rendszerezz!" badgeColor="orange">
        <CountingRecapSvg />
        <p className="text-sm text-slate-700">Először az első helyet rögzítsd, aztán cseréld a többit. Öltözeteknél és útvonalaknál szorzunk.</p>
      </TheorySection>

      <TheorySection title="5. Igaz vagy hamis?" badge="minden, van olyan, egyik sem" badgeColor="emerald">
        <QuantifiersSvg />
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hová kerül a 250?" badge="kerek tízes • 300-nál nagyobb" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Kerek tízes? Igen, 0 a vége.</li>
              <li>300-nál nagyobb? Nem.</li>
              <li>Csak a „kerek tízes” karikába kerül.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány gyerek?" badge="közös rész" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>8 gyerek fest, 6 gyerek gyurmázik.</li>
              <li>3 gyerek mindkettőt csinálja.</li>
              <li>Csak fest: 8 – 3 = <strong>5</strong> gyerek.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Számkártyák" badge="1, 3, 0" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 elöl: 103, 130. 3 elöl: 301, 310.</li>
              <li>A legnagyobb: <strong>310</strong>.</li>
              <li>A legkisebb: <strong>103</strong> (nem 013!).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapdák" badgeColor="rose">
        <TheoryTrapBox
          title="A határ szám"
          wrong="A 150 a „150-nél kisebb” karikába kerül."
          wrongExplanation="A 150 nem kisebb önmagánál. Egyenlő vele."
          correct="A 150 nem kerül a „150-nél kisebb” karikába."
          correctExplanation="Ha a másik címke „kerek tízes”, akkor csak oda kerül."
          tip="„Kisebb” és „nagyobb”: a határ szám egyik sem."
        />
        <TheoryCallout type="warning" title="Közös rész: ne számold kétszer!">
          6 lap a piros karikában, 5 a lyukasban, 2 a közös részben. Összesen nem 11, hanem 6 + 5 – 2 = 9 lap van a karikákban.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Vegyes feladatsor" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          {mix.venn && (
            <svg viewBox="0 0 240 224" className="w-full max-w-[320px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <AskTop n={mix.venn.n} />
              <g transform="translate(0 44)">
                <Venn id="mixlab" frame="Számok 500-ig" a={mix.venn.a} b={mix.venn.b} />
              </g>
            </svg>
          )}
          {mix.nums && (
            <div className="flex flex-wrap justify-center gap-2">
              {mix.kind === 'stmt' &&
                mix.nums.map((n) => (
                  <span key={n} className="px-3 py-2 rounded-xl bg-cyan-50 border-2 border-cyan-300 text-xl font-black text-slate-800">
                    {n}
                  </span>
                ))}
            </div>
          )}
          <p className="text-center text-lg font-black text-emerald-900">{mix.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
            {mix.options.map((o) => {
              let cls = 'bg-white border-slate-300 hover:bg-emerald-50';
              if (chosen && o === mix.answer) cls = 'bg-emerald-100 border-emerald-500';
              else if (chosen === o) cls = 'bg-rose-100 border-rose-500';
              return (
                <button key={o} onClick={() => choose(o)} className={`px-3 py-3 rounded-xl border-2 text-base font-bold min-h-[52px] ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {chosen && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${chosen === mix.answer ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {chosen === mix.answer ? 'Szuper! ' : `Nem egészen. A jó válasz: ${mix.answer}. `}
              {mix.why}
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <span className="text-sm font-bold text-emerald-900">
              Jó válasz: {score.ok} / {score.all}
            </span>
            <button
              onClick={() => {
                setMix(newMix());
                setChosen(null);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Melyik lapra gondoltam?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">Olvasd el a jeleket! Koppints arra a lapra, amelyikre gondoltam.</p>
          <svg viewBox="0 0 220 70" className="w-full max-w-[340px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <CodeRow b={code.secret} x={10} y={4} />
            {['szín', 'méret', 'lyukas?', 'forma'].map((t, i) => (
              <text key={t} x={10 + 25 + i * 50} y={64} textAnchor="middle" fontSize="10" fill="#475569">
                {t}
              </text>
            ))}
          </svg>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-lg mx-auto">
            {code.cands.map((b, i) => {
              const right = sameBlock(b, code.secret);
              const was = tried.includes(i);
              const cls = was ? (right ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-rose-400 bg-rose-50 opacity-50') : 'border-slate-200 bg-white hover:bg-sky-50';
              return (
                <button
                  key={i}
                  aria-label={blockName(b)}
                  onClick={() => {
                    if (codeMsg?.ok || was) return;
                    setTried([...tried, i]);
                    setCodeMsg(right ? { ok: true, text: `Ez az! A ${blockName(b)}.` } : { ok: false, text: `${diffText(b, code.secret)} Próbáld újra!` });
                  }}
                  className={`rounded-xl border-2 p-1 min-h-[64px] ${cls}`}
                >
                  <BlockSvg b={b} />
                </button>
              );
            })}
          </div>
          {codeMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${codeMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{codeMsg.text}</div>}
          <button
            onClick={() => {
              setCode(newCode());
              setTried([]);
              setCodeMsg(null);
            }}
            className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GroupingExamG3Theory;
