import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  ChapterMapSvg,
  PracticeNumberLineSvg,
  PowersOfTwoSvg,
  ExponentSubstitutionSvg,
  CompareZoomSvg
} from './PowerRootPracticeFigures';

/** Hatvány: alap + felső index. */
const P: React.FC<{ b: React.ReactNode; e: React.ReactNode }> = ({ b, e }) => (
  <span className="whitespace-nowrap">
    {b}
    <sup className="text-[0.7em]">{e}</sup>
  </span>
);

const fmt = (x: number, d = 5) => {
  if (!Number.isFinite(x)) return '–';
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const signed = (x: number) => (x < 0 ? `− ${-x}` : `+ ${x}`);
const coefK = (a: number) => (a === 1 ? 'k' : a === -1 ? '−k' : `${String(a).replace('.', ',').replace('-', '−')}k`);

type Pair = { left: string; right: string; answer: 'L' | 'E' | 'R'; why: string };
const PAIRS: Pair[] = [
  { left: '4^0,5', right: '2^0,25', answer: 'L', why: '4^0,5 = √4 = 2, míg 2^0,25 = ⁴√2 ≈ 1,19.' },
  { left: '3⁵ · 3⁻⁸', right: '(1/27)²', answer: 'L', why: '3⁵ · 3⁻⁸ = 3⁻³ = 1/27, míg (1/27)² = 3⁻⁶ = 1/729.' },
  { left: '25^(3/2)', right: '27^(2/3)', answer: 'L', why: '25^(3/2) = 5³ = 125, míg 27^(2/3) = 3² = 9.' },
  { left: '3⁻²', right: '16^(−3/4)', answer: 'R', why: '3⁻² = 1/9, míg 16^(−3/4) = 1/2³ = 1/8, és 1/8 > 1/9.' },
  { left: '8^(2/3)', right: '16^(1/2)', answer: 'E', why: '8^(2/3) = 2² = 4 és 16^(1/2) = 4.' },
  { left: '2^(1/2)', right: '3^(1/3)', answer: 'R', why: 'Hatodik hatványra emelve: (2^(1/2))⁶ = 8 < 9 = (3^(1/3))⁶.' },
  { left: '81^(−1/2)', right: '27^(−2/3)', answer: 'E', why: '81^(−1/2) = 1/9 és 27^(−2/3) = 1/3² = 1/9.' },
  { left: '32^(3/5)', right: '9^(3/2)', answer: 'R', why: '32^(3/5) = 2³ = 8, míg 9^(3/2) = 3³ = 27.' }
];

export const PowerRootPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kitevő-helyettesítő
  const [base, setBase] = useState<number>(5);
  const [c, setC] = useState<number>(3);
  const [alpha, setAlpha] = useState<number>(3);
  const [beta, setBeta] = useState<number>(-2);
  const k = Math.log(c) / Math.log(base);
  const direct = Math.pow(base, alpha * k + beta);
  const viaRule = Math.pow(c, alpha) * Math.pow(base, beta);
  const alphaInt = Number.isInteger(alpha);
  let fracText = '';
  if (alphaInt) {
    let num = (alpha >= 0 ? c ** alpha : 1) * (beta >= 0 ? base ** beta : 1);
    let den = (alpha < 0 ? c ** -alpha : 1) * (beta < 0 ? base ** -beta : 1);
    const g = gcd(num, den);
    num /= g;
    den /= g;
    fracText = den === 1 ? `${num}` : `${num}/${den}`;
  }

  // Labor II: melyik a nagyobb?
  const [idx, setIdx] = useState<number>(0);
  const [picked, setPicked] = useState<'L' | 'E' | 'R' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [done, setDone] = useState<number>(0);
  const pair = PAIRS[idx];
  const pick = (v: 'L' | 'E' | 'R') => {
    if (picked) return;
    setPicked(v);
    setDone((d) => d + 1);
    if (v === pair.answer) setScore((s) => s + 1);
  };
  const next = () => {
    setIdx((i) => (i + 1) % PAIRS.length);
    setPicked(null);
  };

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="gyakorlas-hatvany-gyok"
      title="5. Gyakorlás"
      subtitle="Hatványok és gyökök összefoglalása: egész és racionális kitevő, n-edik gyök, a hatványozás azonosságai – összehasonlítás, számegyenes, 2 hatványai és kitevő-helyettesítés."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_gyakorlas_hatvany_gyok_tananyag.pdf"
      practiceTitle="Készen állsz a hatványos-gyökös gyakorló feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MINDENT EGY ALAPRA!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              aᵐ · aⁿ = aᵐ⁺ⁿ   aᵐ : aⁿ = aᵐ⁻ⁿ   (aᵐ)ⁿ = aᵐⁿ   <P b="a" e="p/q" /> = (q-adik gyök a)<sup>p</sup>   <P b="a" e="−r" /> = 1/<P b="a" e="r" />
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Gyököket, törteket írj át <strong>hatványalakba</strong>, lehetőleg <strong>közös alappal</strong> (4 = 2², 27 = 3³, 25 = 5²).</li>
              <li>Ha ismert bᵏ értéke, bontsd szét a kitevőt: b<sup>3k − 2</sup> = (bᵏ)³ : b².</li>
              <li>Összehasonlításnál számold ki az értékeket, vagy emeld mindkét számot ugyanarra a pozitív hatványra.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Összefoglaló: hatvány és gyök" badge="Tankönyv 92. o." badgeColor="violet">
        <ChapterMapSvg />
        <TheoryTable
          headers={['Fogalom', 'Szabály', 'Feltétel', 'Példa']}
          rows={[
            ['Nulla kitevő', 'a⁰ = 1', 'a ≠ 0', 'π⁰ = 1; −3⁰ = −1'],
            ['Negatív egész kitevő', 'a⁻ⁿ = 1/aⁿ', 'a ≠ 0', '3⁻² = 1/9'],
            ['n-edik gyök', 'ⁿ√a: az a szám, amelynek n-edik hatványa a', 'páros n esetén a ≥ 0', '∛(−125/8) = −5/2'],
            ['1/n kitevő', 'a^(1/n) = ⁿ√a', 'a ≥ 0', '4^0,5 = 2'],
            ['p/q kitevő', 'a^(p/q) = (q-adik gyök a)^p', 'a > 0', '25^(3/2) = 125'],
            ['Negatív törtkitevő', 'a^(−p/q) = 1/a^(p/q)', 'a > 0', '16^(−3/4) = 1/8']
          ]}
        />
      </TheorySection>

      {/* 2. Összehasonlítás és számegyenes */}
      <TheorySection title="2. Melyik a nagyobb? Hol van a számegyenesen? (1–2. feladat)" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Számológép nélkül: melyik a nagyobb?" badge="1. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> <P b="4" e="0,5" /> = 2 &gt; <P b="2" e="0,25" /> = ⁴√2 ≈ 1,19.
              </li>
              <li>
                <strong>b)</strong> 3⁵ · 3⁻⁸ = 3⁻³ = 1/27 &gt; (1/27)² = 1/729.
              </li>
              <li>
                <strong>c)</strong> <P b="25" e="3/2" /> = 5³ = 125 &gt; <P b="27" e="2/3" /> = 3² = 9.
              </li>
              <li>
                <strong>d)</strong> 3⁻² = 1/9 &lt; <P b="16" e="−3/4" /> = 1/2³ = 1/8.
              </li>
            </ul>
            <CompareZoomSvg className="w-full h-auto mt-3" />
          </TheoryCard>
          <TheoryCard title="B) Számok a számegyenesen (válogatás)" badge="2. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>∛(−125/8) = −5/2 (páratlan gyök negatív számból is vonható).</li>
              <li>−3⁰ = −(3⁰) = −1 (a hatványozás erősebb, mint az előjel).</li>
              <li>∛27 · 2⁻⁴ = 3/16 = 0,1875; 16 · 10⁻² = 0,16.</li>
              <li>π⁰ − 2⁴ · 4⁻² = 1 − 16/16 = 0.</li>
            </ul>
            <PracticeNumberLineSvg className="w-full h-auto mt-3" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. 2 hatványai és kitevő-helyettesítés */}
      <TheorySection title="3. Hatványalakba írás és kitevő-helyettesítés (3–5. feladat)" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) A 2-nek hányadik hatványa?" badge="3. feladat" badgeColor="emerald">
            <PowersOfTwoSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> ⁵√16 · 2⁻³ = <P b="2" e="4/5" /> · 2⁻³ = <P b="2" e="−11/5" />.
              </li>
              <li>
                <strong>d)</strong> <P b="4" e="1,5" /> · 8⁻² = 2³ · 2⁻⁶ = 2⁻³.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Ha 5ᵏ = 3, illetve 7ᵏ = 4 és 7ᵐ = 5" badge="4–5. feladat" badgeColor="sky">
            <ExponentSubstitutionSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                5⁻ᵏ = 1/3; 5²ᵏ = (5ᵏ)² = 9; 5ᵏ⁺¹ = 3 · 5 = 15; 5³ᵏ⁻² = 27/25.
              </li>
              <li>
                7ᵏ⁺ᵐ = 4 · 5 = 20; 7ᵏ⁻ᵐ⁺² = 4 · 49 / 5 = 196/5 = 39,2; 7³ᵏ⁻²ᵐ = 64/25.
              </li>
              <li>
                <strong>HF 4.</strong> Ha 10ᵏ = 7: 10ᵏ⁺³ = 7000; 10⁴ᵏ = 2401; 10⁻²ᵏ = 1/49.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Negatív kitevők nélkül (HF 2. a)" badge="Házi feladat" badgeColor="slate">
            <p className="text-sm text-slate-700">
              a⁻¹ + a⁻² = 1/a + 1/a² = <strong>(a + 1)/a²</strong>, ha a &gt; 0.
            </p>
          </TheoryCard>
          <TheoryCard title="F) Ráadás: gyök a hatvány hatványából" badge="Ráadás 2." badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>a)</strong> ∛((3³)³) = ∛(3⁹) = 3³ ⇒ a <strong>3.</strong> hatvány.
              </li>
              <li>
                <strong>b)</strong> ∛(3^(3³)) = ∛(3²⁷) = 3⁹ ⇒ a <strong>9.</strong> hatvány.
              </li>
              <li>
                <strong>d)</strong> ⁴√((2⁴)⁸) = ⁴√(2³²) = 2⁸ ⇒ a <strong>8.</strong> hatvány.
              </li>
              <li>
                <strong>e)</strong> ⁴√(2^(4⁸)) = 2^(4⁸ : 4) = 2^(4⁷) = 2¹⁶ ³⁸⁴.
              </li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Figyelj: (3³)³ = 3⁹, de 3^(3³) = 3²⁷ – a zárójel helye mindent eldönt!</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: a kitevő összegét nem lehet „szétszedni” összeadássá" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ha 5ᵏ = 3, mennyi 5ᵏ⁺¹?"
          wrong="5^(k+1) = 5^k + 1 = 3 + 1 = 4"
          wrongExplanation="A kitevők összege a hatványok SZORZATÁNAK felel meg, nem az összegüknek: aᵐ⁺ⁿ = aᵐ · aⁿ."
          correct="5^(k+1) = 5^k · 5¹ = 3 · 5 = 15"
          correctExplanation="Hasonlóan 5^(3k−2) = (5^k)³ : 5² = 27/25, és 7^(k+m) = 7^k · 7^m = 20."
          tip="Kitevőben összeg → szorzat; különbség → hányados; szorzó → hatvány."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: kitevő-helyettesítő" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap b</label>
              <div className="flex gap-1">
                {[5, 7, 10].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBase(b)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-bold ${base === b ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-800 hover:bg-violet-100'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                bᵏ = {c}
              </label>
              <input type="range" min="2" max="9" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full accent-violet-600" aria-label="b a k-adikon értéke" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">k szorzója: {String(alpha).replace('.', ',')}</label>
              <input type="range" min="-3" max="3" step="0.5" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="k szorzója" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">hozzáadott szám: {beta}</label>
              <input type="range" min="-3" max="3" value={beta} onChange={(e) => setBeta(Number(e.target.value))} className="w-full accent-pink-600" aria-label="hozzáadott szám" />
            </div>
          </div>
          <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 text-sm text-violet-900 space-y-1">
            <div className="text-base font-bold">
              Ha {base}ᵏ = {c}, akkor {base}
              <sup>
                {coefK(alpha)} {beta !== 0 ? signed(beta) : ''}
              </sup>{' '}
              = ?
            </div>
            <div>
              = ({base}ᵏ)<sup>{String(alpha).replace('.', ',').replace('-', '−')}</sup> · {base}
              <sup>{String(beta).replace('-', '−')}</sup> = {c}
              <sup>{String(alpha).replace('.', ',').replace('-', '−')}</sup> · {base}
              <sup>{String(beta).replace('-', '−')}</sup>
            </div>
            <div className="text-lg">
              = <strong>{alphaInt ? fracText : `≈ ${fmt(viaRule)}`}</strong>
              {alphaInt && fracText.includes('/') && <span className="text-sm"> ≈ {fmt(viaRule)}</span>}
            </div>
            <div className="text-xs text-violet-700">
              Ellenőrzés: k ≈ {fmt(k, 4)}, és {base}^({fmt(alpha * k + beta, 4)}) ≈ {fmt(direct)}.
            </div>
          </div>
          <p className="text-xs text-slate-500">A k értékét nem kell ismerni: elég a kitevőt szétbontani. (Hogy k pontosan mennyi, azt a logaritmus fogalmával tudjuk majd megadni.)</p>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Melyik a nagyobb?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>
              {idx + 1}. pár / {PAIRS.length}
            </span>
            <span>
              Pontszám: {score} / {done}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 items-center">
            <div className="p-4 rounded-xl bg-violet-50 border border-violet-200 text-center text-xl font-black text-violet-900 font-mono">{pair.left}</div>
            <div className="text-center text-2xl font-black text-slate-400">?</div>
            <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 text-center text-xl font-black text-pink-900 font-mono">{pair.right}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ['L', 'A bal nagyobb'],
                ['E', 'Egyenlők'],
                ['R', 'A jobb nagyobb']
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                onClick={() => pick(v)}
                disabled={picked !== null}
                className={`px-3 py-2 rounded-lg text-sm font-bold transition ${
                  picked === null
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : v === pair.answer
                      ? 'bg-emerald-600 text-white'
                      : v === picked
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {picked && (
            <div className={`rounded-xl border p-3 text-sm ${picked === pair.answer ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
              <strong>{picked === pair.answer ? 'Helyes!' : 'Nem egészen.'}</strong> {pair.why}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={next} className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white">
              Következő pár
            </button>
            <button
              onClick={() => {
                setIdx(0);
                setPicked(null);
                setScore(0);
                setDone(0);
              }}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-700"
            >
              Újrakezdés
            </button>
          </div>
          <TheoryCallout type="tip" title="Két ügyes módszer">
            1) Számold ki mindkét értéket pontosan (előbb gyök, aztán hatvány). 2) Ha ez nem megy, emeld mindkét pozitív számot ugyanarra a pozitív egész hatványra – pl. a 6.-ra a 2^(1/2) és 3^(1/3) összehasonlításánál –, ez nem változtat a sorrendjükön.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PowerRootPracticeTheory;
