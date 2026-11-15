import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  NumberSetsVennSvg,
  UnitSquareDiagonalSvg,
  Sqrt5ConstructionSvg,
  TheodorusSpiralSvg,
  DecimalKindsSvg,
  RightAngleMark,
  theodorusPoints
} from './G11RationalIrrationalFigures';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const fmtDec = (x: number, d = 4) => x.toFixed(d).replace('.', ',');
const onlyDigits = (s: string, max = 6) => s.replace(/\D/g, '').slice(0, max);

/** Csak 2-es és 5-ös prímtényezője van-e? */
const only25 = (n: number) => {
  let m = n;
  while (m % 2 === 0) m /= 2;
  while (m % 5 === 0) m /= 5;
  return m === 1;
};

const PROOF_STEPS = [
  'Tegyük fel, hogy √2 racionális: √2 = p/q, ahol p és q relatív prím pozitív egészek.',
  'Négyzetre emelve: 2 = p²/q², azaz p² = 2q².',
  'p² páros, ezért p is páros (páratlan szám négyzete páratlan): p = 2k.',
  'Behelyettesítve: 4k² = 2q², azaz q² = 2k², így q is páros.',
  'p és q is osztható 2-vel – ez ellentmond annak, hogy relatív prímek.',
  'Tehát a feltevés hamis: √2 irracionális.'
];

export const G11RationalIrrationalTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szakaszos tizedes tört → közönséges tört
  const [intPart, setIntPart] = useState<string>('0');
  const [pre, setPre] = useState<string>('1');
  const [rep, setRep] = useState<string>('6');

  // Labor II: Theodorus-spirál
  const [spiralN, setSpiralN] = useState<number>(13);

  // Bizonyítás lépésenként
  const [shownSteps, setShownSteps] = useState<number>(1);

  const conv = useMemo(() => {
    const I = Number(onlyDigits(intPart, 4) || '0');
    const a = pre.length;
    const b = rep.length;
    const A = Number(pre || '0');
    const AB = Number((pre + rep) || '0');
    if (b === 0) {
      const den = 10 ** a;
      const num = I * den + A;
      const g = gcd(num, den) || 1;
      return { I, a, b, num, den, sNum: num / g, sDen: den / g, big: 0, small: 0 };
    }
    const den = 10 ** a * (10 ** b - 1);
    const num = I * den + (AB - A);
    const g = gcd(num, den) || 1;
    return { I, a, b, num, den, sNum: num / g, sDen: den / g, big: I * 10 ** (a + b) + AB, small: I * 10 ** a + A };
  }, [intPart, pre, rep]);

  const decimalText = `${conv.I},${pre}${rep ? `(${rep})` : ''}`;
  const expanded = `${conv.I},${pre}${rep.repeat(Math.max(1, Math.ceil(8 / Math.max(1, rep.length))))}…`;
  const finite = only25(conv.sDen);
  const tail = `${rep.repeat(Math.max(1, Math.ceil(6 / Math.max(1, rep.length))))}…`;

  const spiral = useMemo(() => {
    const s = 26;
    const O: [number, number] = [170, 150];
    const pts = theodorusPoints(spiralN).map(([x, y]) => [O[0] + x * s, O[1] - y * s] as [number, number]);
    return { O, pts };
  }, [spiralN]);
  const hyp = Math.sqrt(spiralN);
  const isSquare = Number.isInteger(hyp);

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="racionalis-irracionalis-szamok"
      title="10. Racionális számok, irracionális számok"
      subtitle="Mikor nem írható fel egy szám két egész szám hányadosaként? Az irracionális számok, a tizedes törtek fajtái, a valós számok halmaza és a √2 irracionalitása."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_racionalis_irracionalis_szamok_tananyag.pdf"
      practiceTitle="Készen állsz a racionális és irracionális számokról szóló feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — RACIONÁLIS VAGY IRRACIONÁLIS?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              ℚ ∪ ℚ* = ℝ, ℚ ∩ ℚ* = ∅
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Racionális</strong>: felírható két egész szám hányadosaként; tizedes tört alakja <strong>véges</strong> vagy <strong>végtelen szakaszos</strong>.</li>
              <li><strong>Irracionális</strong> (ℚ*): nem írható fel így; tizedes tört alakja <strong>végtelen, nem szakaszos</strong>. Pl. √2, √3, √5, π, 2π.</li>
              <li>Pozitív egész szám négyzetgyöke csak akkor racionális, ha a szám négyzetszám (√4 = 2, de √5 irracionális).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: helyezzük el a számokat a halmazábrában!" badge="Tankönyv 152. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>a)</strong> 12-nek az 5/2 része: 12 · 5/2 = 30</li>
              <li><strong>b)</strong> 8 nulladik hatványa: 8⁰ = 1</li>
              <li><strong>c)</strong> 144 négyzetgyöke: √144 = 12</li>
              <li><strong>d)</strong> 82-nek a 25 százaléka: 82 · 0,25 = 20,5</li>
              <li><strong>e)</strong> 7 ellentettje: −7</li>
              <li><strong>f)</strong> az 5 és 12 oldalú téglalap átlója: √(5² + 12²) = √169 = 13</li>
              <li><strong>g)</strong> 1/5-nél 2/3-dal kisebb szám: 1/5 − 2/3 = −7/15</li>
              <li><strong>h)</strong> a 4 sugarú kör területe: T = 4² · π = 16π ≈ 50,27</li>
              <li><strong>i)</strong> az egységnégyzet átlója: √(1² + 1²) = √2 ≈ 1,41</li>
            </ul>
            <p>
              A 16π és a √2 közelítő értékében nem ismerhető fel ismétlődő szakasz – ezek <strong>irracionális</strong> számok. (Vigyázat: létezik olyan racionális szám is, amelynek a szakasza hosszabb, mint amennyi jegyet a számológép kiír!)
            </p>
          </div>
          <NumberSetsVennSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Az irracionális számok" badge="Elmélet" badgeColor="indigo">
        <DecimalKindsSvg />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Definíció" badge="ℚ*" badgeColor="purple">
            <p className="text-sm text-slate-700">
              Azok a valós számok, amelyek <strong>nem írhatók fel két egész szám hányadosaként</strong>, az irracionális számok. A nemnegatív racionális számokon végzett négyzetgyökvonás kivezethet ℚ-ból.
            </p>
          </TheoryCard>
          <TheoryCard title="Példák irracionális számokra" badge="Végtelen sok" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>√2, √3, √5, … – ha a gyökjel alatt nem négyzetszám áll (a √4 = 2 racionális!).</li>
              <li>π, 2π, 16π, …</li>
              <li>Szabállyal képzett tizedes tört: 0,12112211122211112222…</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Miért nem szakaszos a 0,121122111222…?" badge="Indirekt" badgeColor="rose">
            <p className="text-sm text-slate-700">
              Ha szakaszos lenne, legyen a szakasz hossza k. A képzési szabály miatt egyszer k darab 1-es áll egymás után, így a szakasz csupa 1-esből állna – de végtelen sok 2-es is előfordul. Ellentmondás.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Szakaszos tizedes tört közönséges tört alakja">
          x = 0,1666… esetén 10x = 1,666… és 100x = 16,666…; kivonva 90x = 15, tehát x = 15/90 = <strong>1/6</strong>. Hasonlóan 0,(27) = 27/99 = 3/11 és 0,(9) = 9/9 = 1.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szerkesztés */}
      <TheorySection title="3. Irracionális számok a számegyenesen" badge="Szerkesztés" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <UnitSquareDiagonalSvg />
            <p className="text-sm text-slate-700">Az egységnégyzet átlóját körzővel a számegyenesre forgatva megkapjuk a √2 helyét.</p>
          </div>
          <div className="space-y-3">
            <Sqrt5ConstructionSvg />
            <p className="text-sm text-slate-700">A 2 és 1 befogójú derékszögű háromszög átfogója √5. Hasonlóan: √13 a 3 és 2 befogójú háromszög átfogója (3. feladat).</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheodorusSpiralSvg />
          <TheoryCallout type="tip" title="Theodorus-spirál">
            Az 1 befogójú derékszögű háromszögeket egymáshoz illesztve (négyzetgyökspirál, Einstein-spirál, Pitagorasz-spirál) minden pozitív egész szám négyzetgyöke megszerkeszthető: √(n + 1) = √((√n)² + 1²). A π hosszúságú szakasz viszont nem szerkeszthető meg euklideszi módon – ehhez a kör négyszögesítése kellene, ami megoldhatatlan.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Műveletek */}
      <TheorySection title="4. Kidolgozott feladatok: műveletek irracionális számokkal" badge="Tankönyv 154. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. feladat: két irracionális szám" badge="Igaz vagy hamis?" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>A:</strong> összegük mindig irracionális – <strong>hamis</strong>: √2 + (−√2) = 0.</li>
              <li><strong>B:</strong> szorzatuk lehet racionális – <strong>igaz</strong>: √3 · 2√3 = 2 · 3 = 6.</li>
              <li><strong>C:</strong> hányadosuk lehet irracionális vagy racionális – <strong>igaz</strong>: √8 : √2 = √4 = 2; √10 : √2 = √5.</li>
              <li><strong>D:</strong> a 6 felírható két irracionális szám összegeként – <strong>igaz</strong>: √2 + (6 − √2) = 6.</li>
              <li><strong>E:</strong> különbségük mindig racionális – <strong>hamis</strong>: 8π − 5π = 3π.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. feladat: egy racionális és egy irracionális szám" badge="Igaz vagy hamis?" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>A:</strong> összegük mindig racionális – <strong>hamis</strong>: 0 + √2 = √2. (Sőt, az összeg <em>mindig</em> irracionális: ha r + i = q racionális volna, akkor i = q − r is racionális lenne.)</li>
              <li><strong>B:</strong> szorzatuk lehet racionális – <strong>igaz</strong>: 0 · √3 = 0 (csak a 0-val).</li>
              <li><strong>C:</strong> hányadosuk lehet irracionális – <strong>igaz</strong>: 8π : 2 = 4π.</li>
              <li><strong>D:</strong> szorzatuk lehet irracionális – <strong>igaz</strong>: 5 · π = 5π.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Halmazművelet (5. feladat)', 'Eredmény', 'Indoklás']}
          rows={[
            ['ℚ ∖ ℚ*', 'ℚ', 'nincs közös elemük'],
            ['ℚ ∩ ℚ*', '∅', 'egy szám nem lehet egyszerre racionális és irracionális'],
            ['ℝ ∖ ℚ*', 'ℚ', 'a valós számokból elhagyjuk az irracionálisakat'],
            ['ℝ ∪ ℚ*', 'ℝ', 'ℚ* ⊂ ℝ'],
            ['ℚ ∖ ℝ', '∅', 'ℚ ⊂ ℝ'],
            ['ℤ ∩ ℚ*', '∅', 'minden egész szám racionális']
          ]}
        />
        <TheoryCallout type="success" title="6. feladat: P = 5π + 2">
          a) P + (−5π) = 2 racionális; b) 3 · P = 15π + 6 irracionális; c) P : P = 1 racionális (P maga irracionális osztó); d) P − 2 = 5π irracionális. Az irracionális számok halmaza nem zárt a négy alapműveletre, a valós számoké igen.
        </TheoryCallout>
      </TheorySection>

      {/* 5. √2 bizonyítás */}
      <TheorySection title="5. Bizonyítás: a √2 irracionális" badge="Indirekt bizonyítás" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 shadow-sm space-y-3">
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
            {PROOF_STEPS.slice(0, shownSteps).map((s) => (
              <li key={s} className="p-2 rounded-lg bg-rose-50 border border-rose-100">{s}</li>
            ))}
          </ol>
          <div className="flex gap-2">
            <button
              onClick={() => setShownSteps((k) => Math.min(PROOF_STEPS.length, k + 1))}
              disabled={shownSteps >= PROOF_STEPS.length}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white disabled:opacity-40"
            >
              Következő lépés
            </button>
            <button onClick={() => setShownSteps(1)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200">
              Újra
            </button>
          </div>
          <p className="text-xs text-slate-500">Ugyanígy látható be, hogy √3, √5 vagy bármely nem négyzetszám pozitív egész négyzetgyöke irracionális.</p>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: „ami gyökjeles, az irracionális”" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Racionális-e a √(4/9), a √144 vagy a √(81 · 225)?"
          wrong="√(4/9), √144 és √(81 · 225) irracionális, mert gyökjel van bennük"
          wrongExplanation="A gyökjel még nem jelent irracionális számot. A döntés a gyökjel alatti számon múlik: négyzetszámnak (vagy két négyzetszám hányadosának) a gyöke racionális."
          correct="√(4/9) = 2/3, √144 = 12, √(81 · 225) = 9 · 15 = 135 – mind racionális"
          correctExplanation="Prímtényezős alakban: egy pozitív egész négyzetgyöke pontosan akkor racionális (sőt egész), ha minden prímtényezőjének kitevője páros. Pl. 700/1575 = 4/9, így a gyöke 2/3; de √168 irracionális, mert 168 = 2³ · 3 · 7."
          tip="Fordítva is figyelj: a 22/7 ≈ 3,142857… racionális (szakaszos), csak a π közelítése!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Szakaszos tizedes törtből közönséges tört" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egészrész</label>
              <input value={intPart} onChange={(e) => setIntPart(onlyDigits(e.target.value, 4))} className="w-full px-3 py-2 rounded-lg border border-emerald-300 font-mono" aria-label="egészrész" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">nem ismétlődő jegyek (a vessző után)</label>
              <input value={pre} onChange={(e) => setPre(onlyDigits(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-emerald-300 font-mono" aria-label="nem ismétlődő jegyek" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">ismétlődő szakasz</label>
              <input value={rep} onChange={(e) => setRep(onlyDigits(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-emerald-300 font-mono" aria-label="ismétlődő szakasz" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['0', '', '3'],
              ['0', '1', '6'],
              ['0', '', '27'],
              ['2', '1', '32'],
              ['0', '', '9'],
              ['1', '625', '']
            ].map(([i, p, r]) => (
              <button
                key={`${i}-${p}-${r}`}
                onClick={() => {
                  setIntPart(i);
                  setPre(p);
                  setRep(r);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-mono"
              >
                {i},{p}
                {r ? `(${r})` : ''}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>
              x = <strong className="font-mono">{decimalText}</strong> = <span className="font-mono">{rep ? expanded : decimalText}</span>
            </div>
            {conv.b > 0 ? (
              <>
                <div className="font-mono">
                  10<sup>{conv.a + conv.b}</sup> · x = {conv.big},{tail}
                </div>
                <div className="font-mono">
                  10<sup>{conv.a}</sup> · x = {conv.small},{tail}
                </div>
                <div className="font-mono">
                  kivonva (a végtelen farok kiesik): {conv.den} · x = {conv.num}
                </div>
              </>
            ) : (
              <div className="font-mono">véges tizedes tört: x = {conv.num}/{conv.den}</div>
            )}
            <div className="text-base">
              x = {conv.num}/{conv.den} = <strong className="text-emerald-800 text-lg font-mono">{conv.sDen === 1 ? conv.sNum : `${conv.sNum}/${conv.sDen}`}</strong>
            </div>
            <div className="text-xs text-slate-500">
              {conv.sDen === 1
                ? 'Egész szám jött ki (pl. 0,(9) = 1).'
                : finite
                  ? `A nevező (${conv.sDen}) prímtényezői csak 2 és 5, ezért a szám véges tizedes tört alakban is felírható.`
                  : `A nevező (${conv.sDen}) prímtényezői között 2-től és 5-től különböző is van: végtelen szakaszos tizedes tört.`}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Theodorus-spirál" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">a legnagyobb átfogó: √{spiralN}</label>
            <input type="range" min="2" max="17" value={spiralN} onChange={(e) => setSpiralN(Number(e.target.value))} className="w-full accent-purple-600" aria-label="spirál mérete" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <svg viewBox="0 0 340 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="336" height="296" rx="12" fill="#faf5ff" stroke="#e9d5ff" />
              {spiral.pts.slice(0, -1).map((p, k) => {
                const q = spiral.pts[k + 1];
                const last = k === spiral.pts.length - 2;
                return (
                  <g key={k}>
                    <polygon points={`${spiral.O[0]},${spiral.O[1]} ${p[0]},${p[1]} ${q[0]},${q[1]}`} fill={last ? '#ddd6fe' : k % 2 ? '#ecfdf5' : '#e0f2fe'} stroke="#64748b" strokeWidth="1" />
                    <RightAngleMark v={p} a={spiral.O} b={q} r={6} color="#334155" />
                  </g>
                );
              })}
              <line
                x1={spiral.O[0]}
                y1={spiral.O[1]}
                x2={spiral.pts[spiral.pts.length - 1][0]}
                y2={spiral.pts[spiral.pts.length - 1][1]}
                stroke={isSquare ? '#047857' : '#7c3aed'}
                strokeWidth="3"
              />
            </svg>
            <div className="space-y-3 text-sm text-slate-700">
              <div className={`rounded-xl border p-3 ${isSquare ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-purple-200 bg-purple-50 text-purple-900'}`}>
                Az utolsó átfogó: <strong className="font-mono">√{spiralN} {isSquare ? `= ${hyp}` : `≈ ${fmtDec(hyp)}`}</strong> –{' '}
                {isSquare ? `racionális, mert ${spiralN} = ${hyp}² négyzetszám.` : `irracionális, mert ${spiralN} nem négyzetszám.`}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: spiralN - 1 }, (_, i) => i + 2).map((k) => {
                  const sq = Number.isInteger(Math.sqrt(k));
                  return (
                    <span key={k} className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${sq ? 'bg-emerald-600 text-white' : 'bg-purple-100 text-purple-800'}`}>
                      √{k}
                    </span>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500">
                Minden új háromszög befogói √n és 1, így az átfogó √(n + 1). Zölddel a racionális (egész) hosszak.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default G11RationalIrrationalTheory;
