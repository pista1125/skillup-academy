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
  NthRootCubeSvg,
  NthRootDefinitionSvg,
  NthRootEvenOddSvg,
  NthRootPopulationSvg,
  NthRootSphereSvg
} from './NthRootFigures';

/** n-edik gyök jelölése szövegben. */
const R: React.FC<{ n?: number | string; children: React.ReactNode }> = ({ n, children }) => (
  <span className="whitespace-nowrap">
    {n !== undefined && n !== 2 && <sup className="text-[0.7em] mr-[-0.15em]">{n}</sup>}√<span className="border-t border-current">{children}</span>
  </span>
);

const fmt = (x: number, d = 4) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return s.replace('.', ',').replace('-', '−');
};

/** Valós n-edik gyök (páratlan n esetén negatív alapra is), NaN, ha nincs értelmezve. */
const nthRoot = (a: number, n: number) => {
  if (n % 2 === 0) return a < 0 ? NaN : Math.pow(a, 1 / n);
  return a < 0 ? -Math.pow(-a, 1 / n) : Math.pow(a, 1 / n);
};

const GROWTH_PRESETS: { name: string; p0: number; pn: number; n: number; unit: string }[] = [
  { name: 'Magyarország 2001–2021', p0: 10.2, pn: 9.7, n: 20, unit: 'millió fő' },
  { name: 'Hollandia 1950–2013', p0: 10, pn: 16.78, n: 63, unit: 'millió fő' },
  { name: 'Hollandia 2014–2021', p0: 16.83, pn: 17.26, n: 7, unit: 'millió fő' },
  { name: 'Algás tó (7 nap)', p0: 1.5, pn: 27, n: 7, unit: 'm²' }
];

export const NthRootTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: gyök-felfedező
  const [n, setN] = useState<number>(3);
  const [a, setA] = useState<number>(-5);
  const root = nthRoot(a, n);
  const even = n % 2 === 0;
  const k = 40;
  const toS = (x: number, y: number): [number, number] => [170 + x * k, 120 - y * 9];
  let d = '';
  let pen = false;
  for (let i = 0; i <= 240; i++) {
    const x = -3.6 + (7.2 * i) / 240;
    const y = Math.pow(x, n);
    if (y < -11 || y > 11) {
      pen = false;
      continue;
    }
    const [sx, sy] = toS(x, y);
    d += `${pen ? 'L' : 'M'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
    pen = true;
  }
  const intersections = Number.isNaN(root) ? [] : even && a > 0 ? [-root, root] : [root];

  // Labor II: átlagos évi változás
  const [p0, setP0] = useState<number>(10.2);
  const [pn, setPn] = useState<number>(9.7);
  const [years, setYears] = useState<number>(20);
  const [unit, setUnit] = useState<string>('millió fő');
  const ratio = p0 > 0 ? pn / p0 : NaN;
  const q = ratio > 0 && years >= 1 ? Math.pow(ratio, 1 / years) : NaN;
  const rate = (q - 1) * 100;

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="szamok-n-edik-gyoke"
      title="2. Számok n-edik gyöke"
      subtitle="A négyzetgyök és a köbgyök általánosítása: melyik az a szám, amelynek n-edik hatványa a? Páros és páratlan gyökkitevő, kocka éle, gömb sugara, átlagos évi népességváltozás."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_szamok_n_edik_gyoke_tananyag.pdf"
      practiceTitle="Készen állsz az n-edik gyökös feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ n-EDIK GYÖK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                ⁿ√a = b ⇔ bⁿ = a
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>n páros:</strong> csak a ≥ 0 esetén értelmezett, és ⁿ√a ≥ 0 (pl. ⁴√81 = 3, nem −3).</li>
              <li><strong>n páratlan:</strong> minden valós a-ra értelmezett, előjele a előjele (pl. ∛−216 = −6).</li>
              <li>a az alap, n (n ∈ N⁺ \ {'{1}'}) a gyökkitevő; √a = ²√a, ∛a „köbgyök”; ⁿ√0 = 0.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladatok: kocka */}
      <TheorySection title="1. Bevezető: mekkora a kocka éle?" badge="Tankönyv 84. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>1. a)</strong> A kocka felszíne 294 cm²: A = 6a² ⇒ a² = 49 ⇒ a pozitív szám, amelynek négyzete 49: <strong>a = 7 cm</strong>.
            </p>
            <p>
              <strong>1. b)</strong> A kocka térfogata 64 cm³: V = a³ ⇒ a³ = 64 ⇒ a pozitív szám, amelynek köbe 64: <strong>a = 4 cm</strong>.
            </p>
            <p>
              <strong>2. a)</strong> Egy kocka alakú doboz kibéléséhez 102 cm² anyag kell: 6a² = 102 ⇒ a² = 17 ⇒ <strong>a = <R>17</R> ≈ 4,12 cm</strong>.
            </p>
            <p>
              <strong>2. b)</strong> Egy kocka alakú tartályba 45 cm³ víz fér: a³ = 45. Mivel 3³ = 27 &lt; 45 &lt; 64 = 4³ és 3,5³ = 42,875 &lt; 45 &lt; 46,656 = 3,6³, az él 3,5 és 3,6 közé esik:
              <strong> a = <R n={3}>45</R> ≈ 3,56 cm</strong>.
            </p>
            <p className="text-xs text-slate-500">
              Igazolható, hogy <R>17</R> és <R n={3}>45</R> irracionális számok – nem írhatók fel két egész szám hányadosaként.
            </p>
          </div>
          <NthRootCubeSvg />
        </div>
      </TheorySection>

      {/* 2. Népesség */}
      <TheorySection title="2. Kidolgozott feladat: átlagos évi népességfogyás" badge="Tankönyv 84–85. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <NthRootPopulationSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A népességstatisztika képlete: <strong>Pₙ = P₀ · (1 + r)ⁿ</strong>, ahol P₀ a népesség az időszak elején, Pₙ a végén, n az évek száma, r az átlagos évi változás.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Magyarország: 2001-ben ≈ 10,2 millió, 2021-ben ≈ 9,7 millió fő.</li>
              <li>9,7 · 10⁶ = 10,2 · 10⁶ · (1 + r)²⁰ ⇒ (1 + r)²⁰ = 9,7 / 10,2 ≈ 0,95.</li>
              <li>Azt a pozitív számot keressük, amelynek 20. hatványa 0,95: ez a <strong>20. gyök</strong>: 1 + r = <R n={20}>0,95</R> ≈ 0,9974.</li>
              <li>r ≈ −0,0026, vagyis az átlagos évi fogyás ≈ <strong>0,26%</strong> (10 millió embernél ≈ 26 000 fő).</li>
            </ul>
            <TheoryCallout type="info" title="Számológéppel">
              Sok számológépen az <span className="font-mono">ˣ√</span> gombbal: <span className="font-mono">20 ˣ√ 0,95</span>; másokon az <span className="font-mono">x^(1/y)</span> gombbal:
              <span className="font-mono"> 0,95 x^(1/y) 20</span>. (Hogy miért 1/y, az a következő leckékben derül ki.)
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. Az n-edik gyök fogalma" badge="Elmélet" badgeColor="teal">
        <NthRootDefinitionSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Páros gyökkitevő" badge="a ≥ 0" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Minden valós szám páros kitevőjű hatványa nemnegatív, ezért páros kitevőjű gyököt csak nemnegatív számokra értelmezünk. Ha a ≥ 0 és n 1-nél nagyobb páros szám,
              akkor <R n="n">a</R> az a <strong>nemnegatív</strong> szám, amelynek n-edik hatványa a.
            </p>
            <p className="text-sm text-slate-700 mt-2">
              <R n={4}>81</R> = 3, mert 3⁴ = 81; <R n={6}>0,015625</R> = 0,5, mert 0,5⁶ = 0,015625.
            </p>
          </TheoryCard>
          <TheoryCard title="Páratlan gyökkitevő" badge="minden valós a" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Minden valós szám páratlan kitevőjű hatványa olyan előjelű, mint maga a szám, ezért páratlan kitevőjű gyököt minden valós számra értelmezünk:
              <R n="n"> a</R> az a valós szám, amelynek n-edik hatványa a.
            </p>
            <p className="text-sm text-slate-700 mt-2">
              <R n={3}>−216</R> = −6, mert (−6)³ = −216; <R n={5}>−0,03125</R> = −0,5; <R n={7}>128</R> = 2.
            </p>
          </TheoryCard>
        </div>
        <NthRootEvenOddSvg />
        <TheoryTable
          headers={['Kifejezés', 'Érték', 'Ellenőrzés']}
          rows={[
            ['√100; ∛−1000', '10; −10', '10² = 100; (−10)³ = −1000'],
            ['∛1 000 000; ⁶√1 000 000', '100; 10', '100³ = 10⁶; 10⁶ = 10⁶'],
            ['∛1; ∛−125; ¹⁰√1024', '1; −5; 2', '1³ = 1; (−5)³ = −125; 2¹⁰ = 1024'],
            ['⁴√625; ∛0,001', '5; 0,1', '5⁴ = 625; 0,1³ = 0,001'],
            ['∛(27/8); ⁴√(1/16)', '3/2; 1/2', '(3/2)³ = 27/8; (1/2)⁴ = 1/16']
          ]}
        />
      </TheorySection>

      {/* 4. Alkalmazások */}
      <TheorySection title="4. Feladatok megoldása" badge="Tankönyv 86–87. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Közelítő értékek számológéppel (2. feladat)" badge="Két tizedesjegy" badgeColor="sky">
            <TheoryTable
              headers={['a', '10', '60', '120', '920', '1000', '10 000']}
              rows={[
                ['∛a', '2,15', '3,91', '4,93', '9,73', '10', '21,54'],
                ['⁴√a', '1,78', '2,78', '3,31', '5,51', '5,62', '10']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="B) A bűvös kocka (3. feladat)" badge="Kocka" badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              V = 216 cm³ ⇒ a = <R n={3}>216</R> = 6 cm ⇒ A = 6 · 6² = <strong>216 cm²</strong> (a felszín mérőszáma itt éppen megegyezik a térfogatéval).
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mt-2">
              HF 2.: V = 42 cm³ ⇒ a = <R n={3}>42</R> ⇒ A = 6 · (<R n={3}>42</R>)² ≈ <strong>72,50 cm²</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="C) A hidroglóbusz (4. feladat)" badge="Gömb" badgeColor="indigo">
            <NthRootSphereSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 4πR³ / 3 = 113 ⇒ R = <R n={3}>3 · 113 / (4π)</R> ≈ <strong>3,00 m</strong>.</li>
              <li><strong>b)</strong> A = 4πR² ≈ <strong>113 m²</strong> alumínium (R ≈ 3 m-nél V és A mérőszáma közel egyenlő).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Hollandia népessége (5. feladat)" badge="Pₙ = P₀(1 + r)ⁿ" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 1950–2013 (63 év): 1 + r = <R n={63}>16,78 / 10</R> ≈ 1,00825 ⇒ <strong>≈ 0,82%</strong> évente.</li>
              <li><strong>b)</strong> 2014–2021 (7 év): 1 + r = <R n={7}>17,26 / 16,83</R> ≈ 1,00361 ⇒ <strong>≈ 0,36%</strong> évente.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) KSH-táblázat hiányzó adatai (6. feladat)" badge="Visszafelé is" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1920: 7612 · 1,00482¹⁰ ≈ <strong>7987 ezer fő</strong> (ellenőrzés: · 1,00841¹⁰ ≈ 8685 ✓).</li>
              <li>1960: 9205 · 1,0072¹¹ ≈ <strong>9961 ezer fő</strong> (ellenőrzés: · 1,00357¹⁰ ≈ 10 322 ✓).</li>
              <li>1970–1980: <R n={10}>10 709 / 10 322</R> − 1 ≈ <strong>0,369%</strong> évente.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">A táblázat adataiból kiolvasható, hogy a %-os érték a sorban álló évtől a következő adatig tartó időszakra vonatkozik.</p>
          </TheoryCard>
          <TheoryCard title="F) Házi feladatok" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> √0,49 = 0,7; ⁴√256 = 4; ∛27 = 3; ⁵√(3⁴ · 3⁶) = ⁵√3¹⁰ = 9; ∛1 = 1.</li>
              <li><strong>HF 3. (érettségi nyomán, 2014)</strong> Alga: 1,5 · q⁷ = 27 ⇒ q = <R n={7}>18</R> ≈ <strong>1,51-szeresére</strong> nőtt naponta.</li>
              <li><strong>Ráadás:</strong> √3346 jegyenként: 5 → 7 → 8, a 4. lépésben 2 · 578 = 1156, és 11 564 · 4 = 46 256 ≤ 51 600 &lt; 11 565 · 5 = 57 825, így a következő jegy 4, tehát √3346 ≈ 57,84.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: két előjel és negatív szám páros gyöke" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A páros gyök nemnegatív, és negatív számnak nincs páros gyöke"
          wrong="⁴√81 = ±3; ⁴√−16 = −2"
          wrongExplanation="A gyök egyetlen szám: páros gyökkitevőnél a nemnegatív megoldás. Az x⁴ = 81 egyenletnek két megoldása van (±3), de ⁴√81 csak 3. A ⁴√−16 nincs értelmezve, mert (−2)⁴ = +16 – nincs olyan valós szám, amelynek negyedik hatványa negatív."
          correct="⁴√81 = 3; x⁴ = 81 ⇒ x = ±⁴√81 = ±3; ∛−8 = −2 (páratlan gyök negatív számból is vonható)"
          correctExplanation="Egyenlet megoldásakor írjuk ki a ± jelet; a gyökjel önmagában a nemnegatív értéket jelenti (páros n esetén)."
          tip="Kérdezd meg: páros vagy páratlan a gyökkitevő? Párosnál a gyök alatti szám nem lehet negatív."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Gyök-felfedező grafikonon" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">gyökkitevő n: {n} ({even ? 'páros' : 'páratlan'})</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="gyökkitevő"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">gyök alatti szám a: {fmt(a, 1)}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full accent-pink-600"
                  aria-label="gyök alatti szám"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                {Number.isNaN(root) ? (
                  <div className="text-rose-700 font-bold">
                    <R n={n}>{fmt(a, 1)}</R> nincs értelmezve: páros kitevőjű hatvány nem lehet negatív, így az y = xⁿ grafikon nem metszi az y = {fmt(a, 1)} egyenest.
                  </div>
                ) : (
                  <>
                    <div className="text-lg">
                      <R n={n}>{fmt(a, 1)}</R> ≈ <strong className="text-violet-700">{fmt(root)}</strong>
                    </div>
                    <div className="font-mono text-xs">Ellenőrzés: ({fmt(root)})^{n} ≈ {fmt(Math.pow(root, n), 3)}</div>
                    <div className="text-xs">
                      Az xⁿ = {fmt(a, 1)} egyenlet valós megoldásainak száma: <strong>{intersections.length}</strong>
                      {intersections.length === 2 ? ` (x = ±${fmt(root)})` : ''}.
                    </div>
                  </>
                )}
              </div>
              <TheoryCallout type="tip" title="Figyeld meg!">
                Páros n-nél a grafikon „U” alakú, a ≥ 0 felett van: pozitív a-hoz két metszéspont tartozik (±), de a gyök csak a nemnegatív. Páratlan n-nél a grafikon minden vízszintes egyenest pontosan egyszer metsz.
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 340 240" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {[-3, -2, -1, 1, 2, 3].map((t) => (
                <g key={t}>
                  <line x1={toS(t, 0)[0]} y1="15" x2={toS(t, 0)[0]} y2="225" stroke="#e2e8f0" />
                  <text x={toS(t, 0)[0]} y="134" fontSize="9" textAnchor="middle" fill="#64748b">
                    {String(t).replace('-', '−')}
                  </text>
                </g>
              ))}
              <line x1="20" y1="120" x2="320" y2="120" stroke="#64748b" strokeWidth="1.5" />
              <line x1="170" y1="15" x2="170" y2="225" stroke="#64748b" strokeWidth="1.5" />
              <text x="314" y="114" fontSize="10" fill="#334155">
                x
              </text>
              <text x="176" y="22" fontSize="10" fill="#334155">
                y
              </text>
              <path d={d} fill="none" stroke={even ? '#059669' : '#2563eb'} strokeWidth="2.5" />
              <line x1="20" y1={toS(0, a)[1]} x2="320" y2={toS(0, a)[1]} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x="24" y={toS(0, a)[1] - 4} fontSize="10" fill="#b45309">
                y = {fmt(a, 1)}
              </text>
              {intersections.map((x, i) => {
                const [sx, sy] = toS(x, a);
                return (
                  <g key={i}>
                    <line x1={sx} y1={sy} x2={sx} y2="120" stroke="#be185d" strokeDasharray="3 3" />
                    <circle cx={sx} cy={sy} r="5" fill="#be185d" />
                  </g>
                );
              })}
              <text x="320" y="236" fontSize="10" textAnchor="end" fill={even ? '#059669' : '#2563eb'}>
                y = x^{n}
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Átlagos évi változás kalkulátor" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {GROWTH_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setP0(p.p0);
                  setPn(p.pn);
                  setYears(p.n);
                  setUnit(p.unit);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: `P₀ (kezdeti, ${unit})`, val: p0, set: setP0, step: '0.01' },
              { label: `Pₙ (végső, ${unit})`, val: pn, set: setPn, step: '0.01' },
              { label: 'n (időszakok száma)', val: years, set: setYears, step: '1' }
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  min="0"
                  step={f.step}
                  value={f.val}
                  onChange={(e) => f.set(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label={f.label}
                />
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            {Number.isFinite(q) ? (
              <>
                <div className="font-mono">
                  Pₙ / P₀ = {fmt(pn, 2)} / {fmt(p0, 2)} ≈ {fmt(ratio, 5)} = (1 + r)^{years}
                </div>
                <div className="font-mono">
                  1 + r = <R n={years}>{fmt(ratio, 5)}</R> ≈ <strong>{fmt(q, 5)}</strong>
                </div>
                <div className="text-base">
                  Átlagos változás időszakonként:{' '}
                  <strong className={rate < 0 ? 'text-rose-700' : 'text-emerald-700'}>
                    {rate >= 0 ? '+' : ''}
                    {fmt(rate, 3)}%
                  </strong>{' '}
                  ({rate < 0 ? 'fogyás' : 'növekedés'}; szorzó: {fmt(q, 4)})
                </div>
              </>
            ) : (
              <div className="text-rose-700 font-bold">Adj meg pozitív kezdő- és végértéket, valamint legalább 1 időszakot!</div>
            )}
          </div>
          <TheoryCallout type="success" title="Ellenőrizd a tankönyvi eredményeket!">
            Magyarország: ≈ −0,25% (a 0,95-re kerekített aránnyal a tankönyv ≈ −0,26%-ot kap); Hollandia: ≈ +0,82% és ≈ +0,36%; algás tó: naponta ≈ 1,51-szeresére nő a terület.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NthRootTheory;
