import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { NumberSetsSvg, IntervalsSvg, GcdLcmSvg, PowerRootLogSvg, NumberBaseSvg } from './ArithmeticSummaryFigures';

const numIn = 'w-28 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (x: number) => (x === 1 ? '' : String(x).split('').map((c) => SUP[Number(c)]).join(''));

/** Prímtényezős felbontás: [[p, kitevő], …] */
const factorize = (n: number): [number, number][] => {
  const out: [number, number][] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
};
const showF = (f: [number, number][]) => (f.length ? f.map(([p, e]) => `${p}${sup(e)}`).join(' · ') : '1');
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

/** Magyar formátum: tizedesvessző. */
const fmt = (x: number, d = 4): string => {
  if (!Number.isFinite(x)) return '–';
  const r = Math.round(x * 10 ** d) / 10 ** d;
  let s = r.toFixed(d);
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return (s === '-0' ? '0' : s).replace('.', ',').replace('-', '−');
};

export const ArithmeticSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – LNKO, LKKT
  const [a, setA] = useState<number>(18);
  const [b, setB] = useState<number>(20);
  // Labor II – hatvány, gyök, logaritmus
  const [base, setBase] = useState<number>(2);
  const [val, setVal] = useState<number>(8);

  const lab1 = useMemo(() => {
    const ok = Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b >= 1 && a <= 1e7 && b <= 1e7;
    if (!ok) return null;
    const fa = factorize(a);
    const fb = factorize(b);
    const primes = Array.from(new Set([...fa.map((x) => x[0]), ...fb.map((x) => x[0])])).sort((x, y) => x - y);
    const ea = (p: number) => fa.find((x) => x[0] === p)?.[1] ?? 0;
    const eb = (p: number) => fb.find((x) => x[0] === p)?.[1] ?? 0;
    const g = gcd(a, b);
    const l = (a / g) * b;
    const gf = primes.filter((p) => Math.min(ea(p), eb(p)) > 0).map((p) => [p, Math.min(ea(p), eb(p))] as [number, number]);
    const lf = primes.map((p) => [p, Math.max(ea(p), eb(p))] as [number, number]);
    return { fa, fb, g, l, gf, lf };
  }, [a, b]);

  const lab2 = useMemo(() => {
    const okBase = base > 0 && base !== 1;
    const okVal = val > 0;
    const x = okBase && okVal ? Math.log10(val) / Math.log10(base) : NaN;
    return { okBase, okVal, x };
  }, [base, val]);

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="szamtan"
      title="3. Számtan – összefoglalás"
      subtitle="Valós számkör, intervallumok, oszthatóság, prímek, LNKO és LKKT, hatványozás, gyökvonás, logaritmus, számrendszerek, arányosság, százalék."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_szamtan_osszefoglalas_tananyag.pdf"
      practiceTitle="Készen állsz a számtani érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HATVÁNY, GYÖK, LOGARITMUS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">aˣ = b ⇔ x = logₐ b (a &gt; 0, a ≠ 1, b &gt; 0)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>aⁿ · aᵐ = aⁿ⁺ᵐ; aⁿ / aᵐ = aⁿ⁻ᵐ; (aⁿ)ᵐ = aⁿᵐ; a⁻ⁿ = 1/aⁿ; a⁰ = 1 (a ≠ 0).</li>
              <li>√(a²) = |a|; a^(p/q) = q-adik gyök alatt aᵖ (a &gt; 0); logₐ b = lg b / lg a.</li>
              <li>LNKO: közös prímtényezők a legkisebb kitevőn; LKKT: minden prímtényező a legnagyobb kitevőn.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Fogalmak, tételek, módszerek – számok" badge="Tankönyv 116–117. o." badgeColor="indigo">
        <TheoryTable
          headers={['', 'Fogalom', 'Lényeg']}
          rows={[
            ['D', 'A valós számkör', 'ℕ ⊂ ℤ ⊂ ℚ; az irracionális számok (ℚ*) nem írhatók fel két egész hányadosaként (√2, lg 3, π); ℚ ∪ ℚ* = ℝ'],
            ['T', 'Tizedes tört alak', 'racionális: véges vagy végtelen szakaszos (3/5 = 0,6; 1/6 = 0,1666…); irracionális: végtelen, nem szakaszos'],
            ['D', 'Intervallum', ']a; b[: a < x < b; [a; b[: a ≤ x < b; ]a; b]: a < x ≤ b; [a; b]: a ≤ x ≤ b; ]a; ∞[: a < x'],
            ['D', 'Oszthatóság', 'b | a, ha van olyan c természetes szám, hogy a = b · c (pl. 2 | 6, 0 | 0)'],
            ['D', 'Prím, összetett', 'prím: pontosan két pozitív osztója van; összetett: kettőnél több; az 1 egyik sem'],
            ['D/M', 'LNKO (a; b)', 'a legnagyobb közös osztó: a közös prímtényezők a legkisebb kitevőn; ha nincs közös, 1'],
            ['D/M', 'LKKT [a; b]', 'a legkisebb pozitív közös többszörös: minden előforduló prímtényező a legnagyobb kitevőn'],
            ['D', 'Relatív prímek', 'legnagyobb közös osztójuk 1'],
            ['T', 'Műveleti tulajdonságok', 'kommutativitás, asszociativitás, disztributivitás: a(b + c) = ab + ac'],
            ['D', 'n alapú számrendszer', 'jegyek 0; 1; …; n − 1; helyi értékek 1; n; n²; …; pl. 2304₆ = 2 · 216 + 3 · 36 + 0 · 6 + 4 = 544']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <NumberSetsSvg />
          <IntervalsSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Hatvány, gyök, logaritmus" badge="Tankönyv 117–118. o." badgeColor="blue">
        <TheoryTable
          headers={['', 'Fogalom', 'Lényeg']}
          rows={[
            ['D', 'Egész kitevőjű hatvány', 'aⁿ: n tényezős szorzat; a¹ = a; a⁰ = 1 és a⁻ⁿ = 1/aⁿ (a ≠ 0); a 0 nulladik és negatív kitevős hatványa nincs értelmezve'],
            ['T', 'Hatványozás azonosságai', 'aⁿ · aᵐ = aⁿ⁺ᵐ; aⁿ / aᵐ = aⁿ⁻ᵐ; (aⁿ)ᵐ = aⁿᵐ; (a · b)ⁿ = aⁿ · bⁿ; (a / b)ⁿ = aⁿ / bⁿ'],
            ['D', 'Négyzetgyök', '√a (a ≥ 0) az a nemnegatív szám, amelynek négyzete a; √9 = 3; bármely valós a-ra √(a²) = |a|'],
            ['T', 'Gyökvonás azonosságai', '√(a · b) = √a · √b; √(a / b) = √a / √b; √(aᵏ) = (√a)ᵏ; pl. √200 = √100 · √2'],
            ['D', 'n-edik gyök', 'páros n: a ≥ 0, eredmény ≥ 0; páratlan n: bármely valós a; ∛8 = 2, ⁴√625 = 5, ⁵√(−32) = −2'],
            ['D', 'Törtkitevőjű hatvány', 'a > 0: a^(p/q) = q-adik gyök alatt aᵖ; pl. 5^{2/3} = ∛(5²), a^{1/2} = √a'],
            ['D', 'Logaritmus', 'logₐ b (a, b > 0, a ≠ 1) az a kitevő, amelyre a-t emelve b-t kapunk; log₂ 8 = 3, log₉ 3 = 1/2, log₅ (1/5) = −1, lg 100 = 2'],
            ['T', 'Áttérés más alapra', 'logₐ b = lg b / lg a (bármely közös alappal); pl. log₄ 3 = log₂ 3 / 2'],
            ['D', 'Egyenes / fordított arányosság', 'egyenes: a hányados állandó; fordított: a szorzat állandó'],
            ['D', 'Százalék', 'a p%-a: k = a / 100 · p; pl. 72 · 15 / 100 = 10,8']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PowerRootLogSvg />
          <GcdLcmSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: számrendszerek" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Írd át 6-os számrendszerbe a 3014₅ számot!</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Tízes számrendszerbe: 3 · 5³ + 0 · 5² + 1 · 5 + 4 = 375 + 5 + 4 = 384.</li>
              <li>A 6 hatványai: 1, 6, 36, 216, 1296 – a legnagyobb, ami nem nagyobb 384-nél: 216.</li>
              <li>384 = 1 · 216 + 168; 168 = 4 · 36 + 24; 24 = 4 · 6 + 0.</li>
              <li>
                Tehát 3014₅ = 384 = <strong>1440₆</strong>.
              </li>
            </ol>
          </div>
          <NumberBaseSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladatok: százalék és logaritmus a gyakorlatban" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Kovács úr lakása (6. feladat)" badge="Százalék" badgeColor="sky">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Adóalap: 7,8 − (5,2 + 0,4) = 2,2 millió Ft; az adó 15%-a: 2,2 · 10⁶ · 0,15 = <strong>330 000 Ft</strong>.</li>
              <li>Évi 3% értékcsökkenés: minden évben 0,97-szeresére esik. 4 év után 7,8 · 10⁶ · 0,97⁴ ≈ <strong>6,9 millió Ft</strong>.</li>
              <li>Vigyázat: 4 · 3% = 12% levonása (6,86 millió) nem ugyanaz – a százalékok nem adódnak össze.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="A Föld népessége (7. feladat)" badge="Logaritmus" badgeColor="purple">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>2020 vége: 7,753 milliárd; 19 hónappal később (2022 július vége): 7,963 milliárd. 7,963 = 7,753 · q¹⁹ ⇒ q = {'(7,963 / 7,753)^{1/19}'} ≈ 1,0014: havi kb. <strong>0,14%</strong>.</li>
              <li>2022 végéig még 5 hónap: 7,963 · 1,0014⁵ ≈ <strong>8,018 milliárd</strong>.</li>
              <li>9 = 7,753 · 1,0014ˣ ⇒ x = log₁,₀₀₁₄ 1,161 = lg 1,161 / lg 1,0014 ≈ 107 hónap ⇒ 2029 végén (novemberben).</li>
            </ol>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Megoldott feladatok a blokkból" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Oszthatóság, LNKO, LKKT" badge="A1., B4., P2., P5." badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>[90; 75] = 450 (nem 900); (90; 75) = 15.</li>
              <li>5A7B osztható 15-tel: B ∈ {'{0; 5}'} és a jegyösszeg osztható 3-mal ⇒ 7 szám (5070, 5370, 5670, 5970, 5175, 5475, 5775).</li>
              <li>Hajók 18 és 20 naponként: [18; 20] = 180 ⇒ március 1. után 180 nappal, augusztus 28-án indulnak ismét együtt.</li>
              <li>Flashmob: a létszám 4-gyel több [6; 8; 9; 10] = 360 többszörösénél és 500-nál kisebb ⇒ 364 = 7 · 52 (52 sor, soronként 7 diák).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hatványok, gyökök, logaritmus" badge="A4., A6., B10., B12., Q1., Q2., P3." badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A4.: 9/√27 = 3² / 3^{'{3/2}'} = 3^{'{1/2}'} – a 3-nak az <strong>1/2</strong>-edik hatványa.</li>
              <li>B10.: 2x − 7 ≤ 0 ⇒ x ≤ 3,5: a 0; 1; 2; 3 – <strong>4</strong> természetes szám.</li>
              <li>
                Q1. (a = 0,3 = 3/10, b = 1/3): a) (a²)⁻¹ · a³ / b = a / b = <strong>9/10</strong>; b) √(10 · b · a⁻¹) = √(10 · 1/3 · 10/3) = <strong>10/3</strong>; c) 0,5 · log_b (10a) = 0,5 · log
                <sub>1/3</sub> 3 = <strong>−1/2</strong>.
              </li>
              <li>√(47 − 3x) értelmezett, ha x ≤ 47/3 ≈ 15,7: 0, 1, …, 15 – <strong>16</strong> természetes szám.</li>
              <li>{'8^{-3/4} = (2³)^{-3/4} = 2^{-9/4}'}.</li>
              <li>ID = log₂ (2x / d): x = 8 cm, d = 0,5 cm ⇒ log₂ 32 = 5; 4-szer távolabbról log₂ 128 = 7, azaz 1,4-szeres.</li>
              <li>Légnyomás 100 m-en: 10⁵ · {'2,718^{-0,01275}'} ≈ 98 700 Pa.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Százalék, arányosság" badge="A2., A11., B5." badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>6%-os csökkenés után 2 280 000 Ft: az eredeti x · 0,94 = 2 280 000 ⇒ x ≈ 2 425 532 Ft.</li>
              <li>21 gép 4,4 óra ⇒ 18 gép (fordított arányosság): 21 · 4,4 / 18 ≈ 5,13 óra = 308 perc.</li>
              <li>0,28 · 0,75 · N = 168 ⇒ N = 800 diák.</li>
              <li>B11.: 72/□4 &gt; 1 ⇒ a nevező 14, 24, …, 64; véges tizedes tört (nem egész): 72/64 = 9/8 = 1,125, tehát □ = <strong>6</strong> (a 72/24 = 3 egész szám, a többi végtelen szakaszos).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Számrendszerek, fejtörők" badge="A1., B9., Q4., Ráadás" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>101111₂ = 32 + 8 + 4 + 2 + 1 = 47; 1234₆ = 310 = 100110110₂.</li>
              <li>20123ₙ = 539 ⇒ n = 4; 1000₃ = 27 &lt; 333₄ = 63.</li>
              <li>6-ra végződő szám, a 6-ot előre téve négyszeres: 153 846 (· 4 = 615 384).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Tipikus hiba: √(a²) és az egymás utáni százalékok" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="√(a²) nem mindig a"
          wrong="√((−5)²) = −5"
          wrongExplanation="A négyzetgyök értéke definíció szerint nemnegatív."
          correct="√((−5)²) = |−5| = 5"
          correctExplanation="Általában √(a²) = |a|. Ugyanígy: egymás utáni százalékos változásokat szorzással kezelünk (0,97⁴), nem összeadással (1 − 4 · 0,03)."
          tip="Az 1 nem prímszám, és nem is összetett – ezt gyakran kérdezik!"
        />
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium I: LNKO és LKKT" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span>a =</span>
                <input type="number" min="1" value={a} onChange={(e) => setA(Math.round(Number(e.target.value)))} className={numIn} aria-label="a" />
                <span>b =</span>
                <input type="number" min="1" value={b} onChange={(e) => setB(Math.round(Number(e.target.value)))} className={numIn} aria-label="b" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'Hajók: 18 és 20', v: [18, 20] },
                  { t: '90 és 75', v: [90, 75] },
                  { t: '120 és 150', v: [120, 150] },
                  { t: '360 és 84', v: [360, 84] },
                  { t: '35 és 48', v: [35, 48] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setA(p.v[0]);
                      setB(p.v[1]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
            </div>
            {lab1 ? (
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-blue-900 space-y-1.5 text-sm">
                <div>
                  {a} = <strong>{showF(lab1.fa)}</strong>
                </div>
                <div>
                  {b} = <strong>{showF(lab1.fb)}</strong>
                </div>
                <div className="text-emerald-800">
                  ({a}; {b}) = {showF(lab1.gf)} = <strong>{lab1.g}</strong>
                </div>
                <div className="text-purple-800">
                  [{a}; {b}] = {showF(lab1.lf)} = <strong>{lab1.l}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  Ellenőrzés: {lab1.g} · {lab1.l} = {lab1.g * lab1.l} = {a} · {b} ✓ {lab1.g === 1 ? '– a két szám relatív prím.' : ''}
                </div>
              </div>
            ) : (
              <div className="text-rose-700 font-bold">Adj meg két pozitív egész számot (legfeljebb 10 millió)!</div>
            )}
          </div>
        </div>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium II: hatvány – gyök – logaritmus" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span>alap: a =</span>
                <input type="number" step="any" value={base} onChange={(e) => setBase(Number(e.target.value))} className={numIn} aria-label="alap" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>hatványérték: b =</span>
                <input type="number" step="any" value={val} onChange={(e) => setVal(Number(e.target.value))} className={numIn} aria-label="hatványérték" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'log₂ 8', v: [2, 8] },
                  { t: 'log₉ 3', v: [9, 3] },
                  { t: 'log₅ 0,2', v: [5, 0.2] },
                  { t: 'lg 100', v: [10, 100] },
                  { t: 'Népesség: 1,0014ˣ = 1,161', v: [1.0014, 1.161] },
                  { t: 'Lakás: 0,97ˣ = 0,5', v: [0.97, 0.5] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setBase(p.v[0]);
                      setVal(p.v[1]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
            </div>
            {lab2.okBase && lab2.okVal ? (
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 text-purple-900 space-y-1.5 text-sm">
                <div>
                  Keressük x-et: {fmt(base)}ˣ = {fmt(val)}
                </div>
                <div className="font-mono">
                  x = log<sub>{fmt(base)}</sub> {fmt(val)} = lg {fmt(val)} / lg {fmt(base)} ≈ <strong>{fmt(lab2.x)}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  Ellenőrzés: {fmt(base)}^{fmt(lab2.x)} ≈ {fmt(Math.pow(base, lab2.x))}
                </div>
                {Math.abs(lab2.x) > 1e-9 && (
                  <div className="text-xs text-emerald-800">
                    Gyökvonással ugyanez: az alap a = b^(1/x) = {fmt(val)}^(1/{fmt(lab2.x)}) ≈ {fmt(Math.pow(val, 1 / lab2.x))}
                  </div>
                )}
                <div className="text-xs">{base > 1 ? 'a > 1: az aˣ függvény szigorúan nő.' : '0 < a < 1: az aˣ függvény szigorúan csökken.'}</div>
              </div>
            ) : (
              <div className="text-rose-700 font-bold">A logaritmus csak a &gt; 0, a ≠ 1 alapra és b &gt; 0 számra értelmezett!</div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ArithmeticSummaryTheory;
