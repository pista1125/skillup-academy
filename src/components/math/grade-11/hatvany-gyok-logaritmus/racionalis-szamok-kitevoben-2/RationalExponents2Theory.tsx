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
  PopulationTwoThirdsSvg,
  TwoPathsSvg,
  NegativeFractionalSvg,
  IdentityTableSvg,
  RootIndexReduceSvg
} from './RationalExponents2Figures';

/** Hatvány: alap + felső index. */
const P: React.FC<{ b: React.ReactNode; e: React.ReactNode }> = ({ b, e }) => (
  <span className="whitespace-nowrap">
    {b}
    <sup className="text-[0.7em]">{e}</sup>
  </span>
);

const fmt = (x: number, d = 6) => {
  if (!Number.isFinite(x)) return '–';
  if (Math.abs(x) >= 1e12) return x.toExponential(4).replace('.', ',');
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
const parseNum = (s: string) => Number(s.trim().replace(',', '.').replace('−', '-'));
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const rootSym = (q: number) => (q === 2 ? '√' : q === 3 ? '∛' : q === 4 ? '∜' : `${q}√`);

/** Közel egész / rövid tizedes tört esetén a kerekített érték. */
const nice = (x: number): number | null => {
  for (let d = 0; d <= 4; d++) {
    const c = Math.round(x * 10 ** d) / 10 ** d;
    if (Math.abs(c - x) < 1e-9 * Math.max(1, Math.abs(x))) return c;
  }
  return null;
};

type Simplify = { name: string; start: string; steps: string[] };
const SIMPLIFY: Simplify[] = [
  {
    name: '8^(5/3)',
    start: '8^(5/3)',
    steps: ['8 = 2³, tehát 8^(5/3) = (2³)^(5/3)', '(aᵐ)ⁿ = aᵐ·ⁿ: 2^(3 · 5/3) = 2⁵', '2⁵ = 32']
  },
  {
    name: '28^(2/3) · 28^(4/3)',
    start: '28^(2/3) · 28^(4/3)',
    steps: ['Azonos alapú hatványok szorzata: a kitevők összeadódnak', '28^(2/3 + 4/3) = 28^(6/3)', '28^(6/3) = 28² = 784']
  },
  {
    name: '6,25^(1/3) · 6,25^(1/6)',
    start: '6,25^(1/3) · 6,25^(1/6)',
    steps: ['A kitevők összeadódnak: 1/3 + 1/6 = 2/6 + 1/6 = 3/6', '3/6 = 1/2, így 6,25^(1/2)', '6,25^(1/2) = √6,25 = 2,5']
  },
  {
    name: '36^0,4 · 36^0,6',
    start: '36^0,4 · 36^0,6',
    steps: ['A kitevők összeadódnak: 0,4 + 0,6 = 1', '36¹ = 36']
  },
  {
    name: '5^1,8 · 25^(−0,4)',
    start: '5^1,8 · 25^(−0,4)',
    steps: ['Közös alap: 25 = 5², így 25^(−0,4) = (5²)^(−0,4) = 5^(−0,8)', '5^1,8 · 5^(−0,8) = 5^(1,8 − 0,8)', '5¹ = 5']
  },
  {
    name: '27^(4/3)',
    start: '27^(4/3)',
    steps: ['Előbb gyököt vonunk: ∛27 = 3', 'Majd hatványozunk: 3⁴', '3⁴ = 81']
  },
  {
    name: '(1/9)^(−3/2)',
    start: '(1/9)^(−3/2)',
    steps: ['Negatív kitevő: az ellentett kitevőjű hatvány reciproka, (1/9)^(−3/2) = 9^(3/2)', '√9 = 3', '3³ = 27']
  },
  {
    name: '¹⁵√(7⁶)',
    start: '¹⁵√(7⁶)',
    steps: ['Törtkitevős alak: 7^(6/15)', 'Egyszerűsítünk 3-mal: 7^(2/5)', '7^(2/5) = ⁵√(7²) = ⁵√49']
  },
  {
    name: '(225 · 196)^(1/2)',
    start: '(225 · 196)^(1/2)',
    steps: ['(a · b)ⁿ = aⁿ · bⁿ: 225^(1/2) · 196^(1/2)', '√225 · √196 = 15 · 14', '210']
  }
];

export const RationalExponents2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: a^(p/q) két úton
  const [baseText, setBaseText] = useState<string>('32');
  const [p, setP] = useState<number>(3);
  const [q, setQ] = useState<number>(5);
  const a = parseNum(baseText);
  const valid = baseText.trim() !== '' && Number.isFinite(a) && a > 0;
  const g = gcd(p, q) || 1;
  const sp = p / g;
  const sq = q / g;
  const absP = Math.abs(p);
  const rootFirst = valid ? Math.pow(Math.pow(a, 1 / q), absP) : NaN;
  const powerFirst = valid ? Math.pow(Math.pow(a, absP), 1 / q) : NaN;
  const value = valid ? Math.pow(a, p / q) : NaN;
  const rootVal = valid ? Math.pow(a, 1 / q) : NaN;
  const niceVal = nice(value);

  // Labor II: lépésenkénti egyszerűsítő
  const [task, setTask] = useState<number>(0);
  const [shown, setShown] = useState<number>(0);
  const cur = SIMPLIFY[task];

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="racionalis-szamok-kitevoben-2"
      title="4. Racionális számok a kitevőben II."
      subtitle="A p/q kitevő: a nevező a gyökkitevő, a számláló a hatványkitevő. A negatív törtkitevő reciprokot jelent, és a hatványozás azonosságai racionális kitevőkre is érvényesek."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_racionalis_szamok_a_kitevoben_2_tananyag.pdf"
      practiceTitle="Készen állsz a törtkitevős hatványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÖRTKITEVŐJŰ HATVÁNY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              <P b="a" e="p/q" /> = (<P b="a" e="1/q" />)<sup>p</sup> = (q-adik gyök a)<sup>p</sup> = q-adik gyök (a<sup>p</sup>)   (a &gt; 0)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Negatív törtkitevő:</strong> <P b="a" e="−p/q" /> = 1 / <P b="a" e="p/q" />, pl. <P b="81" e="−1/2" /> = 1/9.
              </li>
              <li>
                <strong>Permanenciaelv:</strong> pozitív a, b és racionális m, n esetén aᵐ · aⁿ = aᵐ⁺ⁿ, aᵐ : aⁿ = aᵐ⁻ⁿ, (ab)ⁿ = aⁿbⁿ, (a/b)ⁿ = aⁿ/bⁿ, (aᵐ)ⁿ = aᵐⁿ.
              </li>
              <li>Számolásnál előbb gyököt vonjunk, aztán hatványozzunk – így kisebbek a számok.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: hányszorosára nő a népesség 2/3 év alatt?" badge="Tankönyv 90. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az előző órán a népességet az N(t) = 6,98 · 1,011<sup>t</sup> képlettel számoltuk (milliárd fő). 2011. június végétől 2012. február végéig{' '}
              <strong>2/3 év</strong> telik el. Mit jelent <P b="1,011" e="2/3" />?
            </p>
            <p>
              Harmad évenként x-szeres a növekedés, ahol x = <P b="1,011" e="1/3" /> = ∛1,011. Február végére két harmad év telt el, tehát a népesség x²-szeresére nőtt:
            </p>
            <div className="p-3 rounded-xl bg-violet-50 border border-violet-200 font-mono text-center font-bold text-violet-900">
              <P b="1,011" e="2/3" /> = (∛1,011)² = ∛(1,011²) ≈ 1,0073
            </div>
            <p>
              A modell szerint 2012. február végén kb. 6,98 · 1,0073 ≈ <strong>7,031 milliárd</strong> ember élt a Földön.
            </p>
          </div>
          <PopulationTwoThirdsSvg />
        </div>
      </TheorySection>

      {/* 2. Definíciók */}
      <TheorySection title="2. Definíciók: pozitív és negatív törtkitevő" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <TheoryCard title="Pozitív törtkitevő" badge="Definíció" badgeColor="violet">
              <p className="text-sm text-slate-700">
                Ha <strong>0 &lt; a</strong>, p és q pozitív egész szám, de q ≠ 1, akkor
              </p>
              <p className="text-center text-lg font-black text-violet-800 my-2">
                <P b="a" e="p/q" /> = (<P b="a" e="1/q" />)<sup>p</sup>, vagyis <P b="a" e="p/q" /> = (q-adik gyök a)<sup>p</sup>.
              </p>
              <p className="text-sm text-slate-700">
                Például: <P b="32" e="3/5" /> = (⁵√32)³ = 2³ = <strong>8</strong>. Ugyanez: ⁵√(32³) = ⁵√32 768 = 8.
              </p>
            </TheoryCard>
            <TheoryCard title="Negatív törtkitevő" badge="Definíció" badgeColor="rose">
              <p className="text-sm text-slate-700">
                Figyeljük meg: <P b="32" e="−3/5" /> = (<P b="32" e="3/5" />)<sup>−1</sup> = 1 / <P b="32" e="3/5" /> = <strong>1/8</strong>.
              </p>
              <p className="text-sm text-slate-700 mt-1">
                <strong>A negatív törtkitevőjű hatvány egyenlő az ellentett kitevőjű hatvány reciprokával.</strong> Például <P b="81" e="−1/2" /> = 1 / <P b="81" e="1/2" /> = 1/9.
              </p>
            </TheoryCard>
          </div>
          <div className="space-y-4">
            <TwoPathsSvg />
            <NegativeFractionalSvg />
          </div>
        </div>
        <TheoryCallout type="warning" title="Miért csak pozitív alap?">
          Negatív alapnál a tört bővítése ellentmondáshoz vezetne: ha (−8)<sup>1/3</sup> = ∛(−8) = −2 lenne, akkor 1/3 = 2/6 miatt (−8)<sup>2/6</sup> = ⁶√((−8)²) = ⁶√64 = 2 is ugyanaz a szám kellene legyen. Ezért a törtkitevőjű hatványt csak pozitív alapra értelmezzük.
        </TheoryCallout>
        <TheoryTable
          headers={['1. feladat', 'Előbb gyök', 'Aztán hatvány', 'Érték']}
          rows={[
            ['25^(3/2)', '√25 = 5', '5³', '125'],
            ['64^(3/2)', '√64 = 8', '8³', '512'],
            ['9^(3/2)', '√9 = 3', '3³', '27'],
            ['27^(2/3)', '∛27 = 3', '3²', '9'],
            ['8^(5/3)', '∛8 = 2', '2⁵', '32'],
            ['125^(4/3)', '∛125 = 5', '5⁴', '625']
          ]}
        />
      </TheorySection>

      {/* 3. Azonosságok */}
      <TheorySection title="3. Kidolgozott feladat és a hatványozás azonosságai" badge="Tankönyv 90–91. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCard title="Kidolgozott feladat: igazoljuk!" badge="Tankönyv" badgeColor="amber">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>a)</strong> <P b="28" e="1/3" /> · <P b="28" e="1/3" /> = (<P b="28" e="1/3" />)², ami a definíció miatt valóban <P b="28" e="2/3" />.
                </li>
                <li>
                  <strong>b)</strong> A definíció miatt <P b="28" e="2/3" /> · <P b="28" e="4/3" /> = (<P b="28" e="1/3" />)² · (<P b="28" e="1/3" />)⁴. Az egész kitevős azonosság (a² · a⁴ = a⁶) szerint ez (<P b="28" e="1/3" />)⁶ = <P b="28" e="6/3" />, vagyis <strong>28²</strong>.
                </li>
              </ul>
            </TheoryCard>
            <p>
              Bizonyítható, hogy a hatványozás azonosságai változatlan formában érvényben maradnak a pozitív számok racionális kitevőjű hatványaira is (<strong>permanenciaelv</strong>).
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <P b="8" e="5/3" /> = (2³)<sup>5/3</sup> = <P b="2" e="3 · 5/3" /> = 2⁵ = 32.
              </li>
              <li>
                <P b="6,25" e="1/3" /> · <P b="6,25" e="1/6" /> = <P b="6,25" e="1/3 + 1/6" /> = <P b="6,25" e="1/2" /> = √6,25 = 2,5.
              </li>
            </ul>
          </div>
          <IdentityTableSvg />
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Tankönyvi feladatok" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Egyetlen hatványként (2. feladat)" badge="Feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>(∛10)⁶ = (<P b="10" e="1/3" />)⁶ = 10².</li>
              <li>
                <P b="8" e="1/3" /> · <P b="8" e="2/3" /> = 8¹ = 8; <P b="16" e="1/2" /> · 16⁻¹ = <P b="16" e="−1/2" />.
              </li>
              <li>
                <P b="5" e="5/7" /> · <P b="5" e="−5/7" /> = 5⁰ = 1; (1/9)<sup>−3/2</sup> = <P b="9" e="3/2" /> = 27.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kisebb gyökkitevővel (3. feladat)" badge="Feladat" badgeColor="sky">
            <RootIndexReduceSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>¹⁵√(7⁶) = <P b="7" e="6/15" /> = <P b="7" e="2/5" /> = ⁵√(7²) = ⁵√49.</li>
              <li>⁸√(6²) = <P b="6" e="2/8" /> = <P b="6" e="1/4" /> = ⁴√6; ²⁰√(3¹⁰) = <P b="3" e="1/2" /> = √3; ³⁶√(7⁵⁴) = <P b="7" e="3/2" /> = √(7³).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Az eredmény egész szám (4. feladat)" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <P b="27" e="4/3" /> = (∛27)⁴ = 3⁴ = <strong>81</strong>; <P b="81" e="3/4" /> = (∜81)³ = 3³ = <strong>27</strong>.
              </li>
              <li>
                <P b="36" e="0,4" /> · <P b="36" e="0,6" /> = 36¹ = <strong>36</strong>.
              </li>
              <li>
                <P b="5" e="1,8" /> · <P b="25" e="−0,4" /> = <P b="5" e="1,8" /> · <P b="5" e="−0,8" /> = 5¹ = <strong>5</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladat (válogatás)" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <P b="7" e="2/5" /> · <P b="7" e="8/5" /> = 7² = <strong>49</strong>.
              </li>
              <li>
                (225 · 196)<sup>1/2</sup> = 15 · 14 = <strong>210</strong>.
              </li>
              <li>
                (81/16)<sup>1/4</sup> = 3/2.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: a negatív kitevő nem negatív előjel" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi 81 a −1/2-ediken?"
          wrong="81^(−1/2) = −√81 = −9"
          wrongExplanation="A kitevő előjele nem az eredmény előjelét adja meg! Pozitív alap bármely racionális kitevőjű hatványa pozitív."
          correct="81^(−1/2) = 1 / 81^(1/2) = 1/9"
          correctExplanation="A negatív törtkitevőjű hatvány az ellentett kitevőjű hatvány reciproka. Hasonlóan 32^(−3/5) = 1/8, és (1/9)^(−3/2) = 9^(3/2) = 27."
          tip="Három lépés: 1) negatív kitevő → reciprok; 2) nevező → gyök; 3) számláló → hatvány."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: törtkitevő két úton" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alap (a &gt; 0)</label>
              <input type="text" value={baseText} onChange={(e) => setBaseText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono" aria-label="alap" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">számláló p: {p}</label>
              <input type="range" min="-6" max="6" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-violet-600" aria-label="számláló" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">nevező q: {q}</label>
              <input type="range" min="2" max="8" value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="nevező" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['32', 3, 5],
              ['25', 3, 2],
              ['27', 2, 3],
              ['125', 4, 3],
              ['81', -1, 2],
              ['32', -3, 5],
              ['1,011', 2, 3]
            ].map(([b, pp, qq]) => (
              <button
                key={`${b}-${pp}-${qq}`}
                onClick={() => {
                  setBaseText(String(b));
                  setP(Number(pp));
                  setQ(Number(qq));
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
              >
                {b}^({pp}/{qq})
              </button>
            ))}
          </div>
          {!valid ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">
              A törtkitevőjű hatványt csak pozitív alapra értelmezzük – adj meg egy 0-nál nagyobb számot!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1">
                <div className="font-bold text-teal-800">1. út: előbb gyök, aztán hatvány</div>
                <div>
                  {rootSym(q)}
                  {baseText} ≈ {fmt(rootVal)}
                </div>
                <div>
                  ({fmt(rootVal)})<sup>{absP}</sup> ≈ <strong>{fmt(rootFirst)}</strong>
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 space-y-1">
                <div className="font-bold text-orange-800">2. út: előbb hatvány, aztán gyök</div>
                <div>
                  {baseText}
                  <sup>{absP}</sup> = {fmt(Math.pow(a, absP))}
                </div>
                <div>
                  {rootSym(q)}({fmt(Math.pow(a, absP))}) ≈ <strong>{fmt(powerFirst)}</strong>
                </div>
              </div>
              <div className="md:col-span-2 bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
                {g > 1 && (
                  <div>
                    A kitevő egyszerűsíthető: {p}/{q} = {sp}/{sq}.
                  </div>
                )}
                {p < 0 && (
                  <div>
                    Negatív kitevő ⇒ reciprok: <P b={baseText} e={`${p}/${q}`} /> = 1 / {fmt(rootFirst)}.
                  </div>
                )}
                {p === 0 && <div>A 0 kitevőjű hatvány értéke 1.</div>}
                <div className="text-lg">
                  <P b={baseText} e={`${p}/${q}`} /> {niceVal !== null ? '=' : '≈'} <strong className="text-violet-800">{fmt(niceVal ?? value)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: lépésenkénti egyszerűsítő" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {SIMPLIFY.map((s, i) => (
              <button
                key={s.name}
                onClick={() => {
                  setTask(i);
                  setShown(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${task === i ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2 text-sm text-slate-700">
            <div className="text-lg font-black text-slate-900 font-mono">{cur.start}</div>
            {cur.steps.slice(0, shown).map((s, i) => (
              <div key={i} className={`flex gap-2 ${i === cur.steps.length - 1 ? 'font-bold text-emerald-800' : ''}`}>
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span>{s}</span>
              </div>
            ))}
            {shown === 0 && <div className="text-slate-500 italic">Próbáld meg előbb fejben, aztán nézd meg lépésenként!</div>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShown((s) => Math.min(s + 1, cur.steps.length))}
              disabled={shown >= cur.steps.length}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white disabled:opacity-40"
            >
              Következő lépés
            </button>
            <button onClick={() => setShown(cur.steps.length)} className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-100 text-emerald-800">
              Teljes megoldás
            </button>
            <button onClick={() => setShown(0)} className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-700">
              Újra
            </button>
            <span className="self-center text-xs text-slate-500">
              {shown} / {cur.steps.length} lépés
            </span>
          </div>
          <TheoryCallout type="tip" title="Közös alapra hozás">
            Ha az alapok különbözők, de ugyanannak a számnak hatványai (25 = 5², 8 = 2³, 27 = 3³), először írjuk át őket közös alapra – utána már csak a kitevőkkel kell számolni.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RationalExponents2Theory;
