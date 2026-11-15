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
  KickoffCircleSvg,
  RadiusFivePointsSvg,
  TranslatedCircleSvg,
  CircleEquationDerivationSvg,
  DiameterSquareSvg,
  CompletingSquareSvg,
  G11CircleEquationPlane,
  CE_BLUE,
  CE_RED,
  CE_GREEN,
  CE_AMBER
} from './G11CircleEquationFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return (Number(s) === 0 ? '0' : s).replace('.', ',').replace('-', '−');
};

/** (x − u)² alakú tag; u = 0 esetén x². */
const sqTerm = (name: string, c: number) =>
  Math.abs(c) < 1e-9 ? `${name}²` : c > 0 ? `(${name} − ${fmt(c)})²` : `(${name} + ${fmt(-c)})²`;

/** Előjeles tag: „ + 4y”, „ − 6x”, „ − 12”. */
const signed = (c: number, suffix = '') => {
  if (Math.abs(c) < 1e-9) return '';
  const abs = Math.abs(c);
  const coef = suffix && Math.abs(abs - 1) < 1e-9 ? '' : fmt(abs);
  return `${c > 0 ? ' + ' : ' − '}${coef}${suffix}`;
};

export const G11CircleEquationTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: középpont és sugár → egyenlet
  const [u, setU] = useState<number>(2);
  const [v, setV] = useState<number>(-1);
  const [r, setR] = useState<number>(3);
  const [T, setT] = useState<[number, number]>([4, 1]);

  // Labor II: teljes négyzetté kiegészítés
  const [D, setD] = useState<number>(-6);
  const [E, setE] = useState<number>(4);
  const [F, setF] = useState<number>(-12);

  // Labor I számítások
  const eqStd = `${sqTerm('x', u)} + ${sqTerm('y', v)} = ${fmt(r * r)}`;
  const Dg = -2 * u;
  const Eg = -2 * v;
  const Fg = u * u + v * v - r * r;
  const eqGen = `x² + y²${signed(Dg, 'x')}${signed(Eg, 'y')}${signed(Fg)} = 0`;
  const dist2 = (T[0] - u) ** 2 + (T[1] - v) ** 2;
  const dist = Math.sqrt(dist2);
  const rel = Math.abs(dist2 - r * r) < 1e-9 ? 'on' : dist2 < r * r ? 'in' : 'out';

  // Labor II számítások
  const hx = D / 2;
  const hy = E / 2;
  const R = hx * hx + hy * hy - F;
  const cu = -hx;
  const cv = -hy;
  const rr = R > 0 ? Math.sqrt(R) : 0;
  const isInt = (z: number) => Math.abs(z - Math.round(z)) < 1e-9;

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="a-kor-egyenlete"
      title="11. A kör egyenlete"
      subtitle="A kezdőkörön, belül vagy kívül áll a játékos? A C(u; v) középpontú, r sugarú kör egyenlete: (x − u)² + (y − v)² = r²."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_a_kor_egyenlete_tananyag.pdf"
      practiceTitle="Készen állsz a kör egyenletével kapcsolatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A KÖR EGYENLETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                (x − u)² + (y − v)² = r²
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A P(x; y) pont pontosan akkor van a <strong>C(u; v) középpontú, r sugarú</strong> körön, ha CP = r.
              </li>
              <li>
                Origó középpontú kör: <strong>x² + y² = r²</strong>. Vigyázz az előjelekre: (x + 4)² + (y − 2)² = 25 középpontja C(−4; 2), sugara 5.
              </li>
              <li>
                Ha a pont koordinátáit behelyettesítve a bal oldal kisebb r²-nél, a pont a körön belül, ha nagyobb, kívül van.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: hol álltak a játékosok a kezdőkörhöz képest?" badge="Tankönyv 242. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A szabványos focipályán a kezdőkör középpontja a felezővonal felezőpontja, sugara <strong>9,15 m</strong>. Rögzítsünk koordináta-rendszert: az origó a kezdőkör középpontja, a tengelyek a pálya szimmetriatengelyei, 1 egység = 1 méter.
            </p>
            <p>
              A jeladók szerint a játékosok helye: A(9; 1,65), B(−7; 4,4), C(−5,49; 7,32), D(6,7; −6,4). Elég megvizsgálni az OP = √(x² + y²) távolságot:
            </p>
            <TheoryTable
              headers={['Játékos', 'OP', 'Helyzet']}
              rows={[
                ['A(9; 1,65)', '√(9² + 1,65²) = 9,15', 'a kezdőkörön'],
                ['B(−7; 4,4)', '√((−7)² + 4,4²) ≈ 8,27 < 9,15', 'a kezdőkörön belül'],
                ['C(−5,49; 7,32)', '√((−5,49)² + 7,32²) = 9,15', 'a kezdőkörön'],
                ['D(6,7; −6,4)', '√(6,7² + (−6,4)²) ≈ 9,27 > 9,15', 'a kezdőkörön kívül']
              ]}
            />
            <p className="text-xs text-slate-500">
              Ha P(x; y) a kezdőkörön van, koordinátái teljesítik a √(x² + y²) = 9,15, más alakban az x² + y² = 9,15² egyenletet.
            </p>
          </div>
          <KickoffCircleSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat 1 */}
      <TheorySection title="2. Kidolgozott feladat: pontok adott ponttól 5 egységre" badge="Kidolgozott feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <RadiusFivePointsSvg />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> A sík adott pontjától adott pozitív távolságra lévő pontok halmaza kör, ezért <strong>végtelen sok</strong> ilyen pont van.</li>
              <li>A tengelyeken: (5; 0), (0; 5), (−5; 0), (0; −5). A 3–4–5 oldalú derékszögű háromszögekből: (4; 3), (3; 4), (−4; 3), …</li>
              <li>Tetszőleges P(p₁; p₂) pontra: <strong>p₁² + p₂² = 5²</strong>, pl. (1; √24), (√11; −√14), (−√23; √2).</li>
            </ul>
          </div>
          <div className="space-y-2">
            <TranslatedCircleSvg />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>b)</strong> K′(5; −2) középpontú, 5 egység sugarú kör: az origó középpontú kört a <strong>→v(5; −2) vektorral</strong> eltolva kapjuk.</li>
              <li>Az a) pontjainak eltoltjai: P₂′(9; 1), P₁₁′(8; −6), illetve (√11 + 5; −√14 − 2).</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat 2 */}
      <TheorySection title="3. Kidolgozott feladat: rajta van-e a pont a körön?" badge="Kidolgozott feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="a) K(0; 0), r = 5" badge="2. a)" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>KA = √(3,4² + (−3,4)²) = √23,12 &lt; 5 ⇒ A(3,4; −3,4) a körön <strong>belül</strong> van.</li>
              <li>KB = √((−3/2)² + (√91/2)²) = √(100/4) = 5 ⇒ B(−3/2; √91/2) <strong>rajta van</strong>.</li>
              <li>KC = √(2,5² + 4,5²) = √26,5 &gt; 5 ⇒ C(2,5; 4,5) <strong>kívül</strong> van.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="b) K′(5; −2), r = 5" badge="2. b)" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A távolság: √((p₁ − 5)² + (p₂ + 2)²) – ez a →K′P(p₁ − 5; p₂ + 2) vektor hossza.</li>
              <li>K′D = √((1 − 5)² + (1 + 2)²) = 5 ⇒ D(1; 1) <strong>rajta van</strong>.</li>
              <li>K′E = √(4,5² + 2²) = √24,25 &lt; 5 ⇒ E(9,5; 0) <strong>belül</strong>.</li>
              <li>K′F = √(3,5² + (−14/3)²) ≈ 5,83 &gt; 5 ⇒ F(17/2; −20/3) <strong>kívül</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Elmélet */}
      <TheorySection title="4. A kör egyenlete" badge="Elmélet" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CircleEquationDerivationSvg />
          <div className="space-y-3">
            <TheoryCard title="A C(u; v) középpontú, r sugarú kör egyenlete" badge="Tétel" badgeColor="blue">
              <p className="text-sm text-slate-700 leading-relaxed">
                Legyen adva a C(u; v) pont és az r pozitív valós szám. A P(x; y) pont akkor és csakis akkor van rajta a C középpontú, r sugarú körön, ha CP = r, vagyis
                <strong> √((x − u)² + (y − v)²) = r</strong>, amit
                <strong> (x − u)² + (y − v)² = r²</strong> formában is írhatunk.
              </p>
            </TheoryCard>
            <TheoryCallout type="info" title="Példa">
              Ha egy kör középpontja C(3; 6) és sugara 10, akkor egyenlete (x − 3)² + (y − 6)² = 100. Ha egy pont koordinátáit behelyettesítve teljesül az egyenlőség, a pont rajta van a körön; ha nem, akkor nincs rajta.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 5. Feladatok */}
      <TheorySection title="5. Tankönyvi feladatok – megoldásokkal" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Egyenlet középpontból és sugárból" badge="1–2. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>C(5; 3), r = 2 ⇒ (x − 5)² + (y − 3)² = 4</li>
              <li>C(5; −3), r = 4 ⇒ (x − 5)² + (y + 3)² = 16</li>
              <li>C(−5; 3), r = 0,5 ⇒ (x + 5)² + (y − 3)² = 0,25</li>
              <li>C(0; 0), r = 10 ⇒ x² + y² = 100</li>
              <li>C(4; 2), A(−1; −10): r² = 5² + 12² = 169 ⇒ <strong>(x − 4)² + (y − 2)² = 169</strong></li>
              <li>C(−2; 2), A(1; −3): r² = 3² + 5² = 34 ⇒ <strong>(x + 2)² + (y − 2)² = 34</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Melyik pont nincs a körön?" badge="3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>(x + 4)² + (y − 2)² = 25:</strong> A(−1; −2): 9 + 16 = 25 ✓; B(1; 2): 25 + 0 ✓; C(−8; 5): 16 + 9 ✓; D(−2; −3): 4 + 25 = 29 ⇒ <strong>D nincs rajta</strong>.</li>
              <li><strong>(x − 2)² + (y + 1)² = 10:</strong> A(−1; −2) ✓; B(1; 2) ✓; D(5; 0) ✓; C(3; −5): 1 + 16 = 17 ⇒ <strong>C nincs rajta</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Átmérő végpontjaiból" badge="4. feladat" badgeColor="emerald">
            <DiameterSquareSvg className="w-full h-auto max-w-xs mx-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(1; −14), B(−15; 16): a középpont az AB felezőpontja, K(−7; 1); AB = √(16² + 30²) = 34 ⇒ r = 17.</li>
              <li><strong>a)</strong> (x + 7)² + (y − 1)² = 289</li>
              <li><strong>b)</strong> A körbe írt négyzet átlója 34 ⇒ oldala 34 : √2 = 17√2 ≈ 24,04.</li>
              <li><strong>c)</strong> A négyzet beírt körének sugara az oldal fele, 17√2 / 2 ≈ 12,02 ⇒ (x + 7)² + (y − 1)² = 144,5.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok és ráadás" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> C(2; −5)-től 10 egységre: A(8; 3) és D(10; 1) (36 + 64 = 100); B, a C(0; 5) pont és E nem.</li>
              <li><strong>HF 2.</strong> a) P(−2; 6) rajta van; b) P(−3; 2): 16 + 1 = 17 ≠ 25, nincs rajta (belül van); c) P(2; −6) rajta van; d) P(−2; 7) rajta van.</li>
              <li><strong>HF 3.</strong> A(14; −24), C(0; 24): K(7; 0), AC = 50 ⇒ (x − 7)² + y² = 625; a beírt kör sugara 25√2 / 2, területe 312,5π ≈ 981,7.</li>
              <li><strong>Ráadás.</strong> A(−2; 4), B(6; 0) befogó: a derékszög A-nál vagy B-nél lehet, mindkét oldalra ⇒ 4 háromszög, de csak <strong>2 különböző kör</strong>: (x − 4)² + (y − 6)² = 40 és x² + (y + 2)² = 40.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Kitekintés: teljes négyzetté kiegészítés */}
      <TheorySection title="6. Kitekintés: ha az egyenlet kifejtett alakban adott" badge="Teljes négyzet" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CompletingSquareSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Ha a négyzetre emeléseket elvégezzük, a kör egyenlete <strong>x² + y² + Dx + Ey + F = 0</strong> alakú lesz. Visszafelé teljes négyzetté kiegészítéssel jutunk:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>x² + y² − 6x + 4y − 12 = 0</li>
              <li>(x² − 6x) + (y² + 4y) = 12</li>
              <li>(x − 3)² − 9 + (y + 2)² − 4 = 12</li>
              <li><strong>(x − 3)² + (y + 2)² = 25</strong> ⇒ C(3; −2), r = 5.</li>
            </ul>
            <TheoryCallout type="warning" title="Nem minden ilyen egyenlet kör!">
              x² + y² − 10x + 30 = 0 ⇒ (x − 5)² + y² = −5: nincs ilyen pont. Ha a jobb oldal 0, az egyenletet egyetlen pont elégíti ki.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: előjelek és r² helyett r" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Rossz előjelű középpont, sugár helyett a sugár négyzete"
          wrong="(x + 4)² + (y − 2)² = 25 ⇒ C(4; −2), r = 25"
          wrongExplanation="Az egyenletben x − u áll, ezért x + 4 = x − (−4) miatt u = −4, és y − 2 miatt v = 2. A jobb oldalon a sugár NÉGYZETE áll."
          correct="(x + 4)² + (y − 2)² = 25 ⇒ C(−4; 2), r = √25 = 5"
          correctExplanation="Ellenőrzés: a B(1; 2) pont 5 egységre van C(−4; 2)-től, és valóban (1 + 4)² + (2 − 2)² = 25."
          tip="Fordított irányban is figyelj: C(5; −3), r = 4 ⇒ (x − 5)² + (y + 3)² = 16, nem … = 4."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: középpont és sugár → egyenlet" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {[
                { label: `A középpont első koordinátája u = ${fmt(u)}`, val: u, set: setU, min: -5, max: 5, step: 0.5, cls: 'accent-blue-600' },
                { label: `A középpont második koordinátája v = ${fmt(v)}`, val: v, set: setV, min: -5, max: 5, step: 0.5, cls: 'accent-emerald-600' },
                { label: `Sugár r = ${fmt(r)}`, val: r, set: setR, min: 0.5, max: 6, step: 0.5, cls: 'accent-rose-600' }
              ].map((s) => (
                <div key={s.label.slice(0, 12)}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{s.label}</label>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.val}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className={`w-full ${s.cls}`}
                    aria-label={s.label}
                  />
                </div>
              ))}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>C({fmt(u)}; {fmt(v)}), r = {fmt(r)}</div>
                <div className="text-base text-blue-800"><strong>{eqStd}</strong></div>
                <div className="text-xs text-slate-500">Kifejtve: {eqGen}</div>
                <div className="pt-1 border-t border-slate-200 mt-1">
                  Vizsgált pont: T({fmt(T[0])}; {fmt(T[1])}) – kattints a rácsra a mozgatásához!
                </div>
                <div>
                  ({fmt(T[0])} − ({fmt(u)}))² + ({fmt(T[1])} − ({fmt(v)}))² = {fmt(dist2)} {rel === 'on' ? '=' : rel === 'in' ? '<' : '>'} {fmt(r * r)} = r²
                </div>
                <div className={`font-sans font-bold ${rel === 'on' ? 'text-emerald-700' : rel === 'in' ? 'text-blue-700' : 'text-rose-700'}`}>
                  CT ≈ {fmt(dist, 3)} ⇒ a pont {rel === 'on' ? 'rajta van a körön' : rel === 'in' ? 'a körön belül van' : 'a körön kívül van'}.
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'C(5; 3), r = 2', p: [5, 3, 2] },
                  { name: 'C(0; 0), r = 5', p: [0, 0, 5] },
                  { name: 'K′(5; −2), r = 5', p: [5, -2, 5] },
                  { name: 'C(−4; 2), r = 5', p: [-4, 2, 5] }
                ].map((pr) => (
                  <button
                    key={pr.name}
                    onClick={() => {
                      setU(pr.p[0]);
                      setV(pr.p[1]);
                      setR(pr.p[2]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
            </div>
            <G11CircleEquationPlane
              xMin={-8}
              xMax={8}
              yMin={-8}
              yMax={8}
              unit={18}
              tickEvery={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              onPick={(x, y) => setT([x, y])}
              circles={[{ cx: u, cy: v, r, color: CE_BLUE, width: 2.4, fill: 'rgba(37,99,235,0.07)' }]}
              segments={[
                { from: [u, v], to: [u + r, v], color: CE_RED, width: 1.8 },
                { from: [u, v], to: T, color: CE_AMBER, dashed: true, width: 1.6 }
              ]}
              points={[
                { x: u, y: v, color: '#0f172a', label: 'C', dx: -5, dy: -6, anchor: 'end' },
                { x: T[0], y: T[1], color: rel === 'on' ? CE_GREEN : rel === 'in' ? CE_BLUE : CE_RED, label: 'T' }
              ]}
              texts={[{ x: u + r / 2, y: v + 0.25, text: 'r', color: CE_RED, bold: true, anchor: 'middle' }]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: teljes négyzetté kiegészítés lépésről lépésre" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Add meg az <strong>x² + y² + Dx + Ey + F = 0</strong> egyenlet együtthatóit!
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'D (x együtthatója)', val: D, set: setD },
              { label: 'E (y együtthatója)', val: E, set: setE },
              { label: 'F (konstans tag)', val: F, set: setF }
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  step="1"
                  value={f.val}
                  onChange={(e) => f.set(Number(e.target.value) || 0)}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label={f.label}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'x² + y² − 6x + 4y − 12 = 0', v: [-6, 4, -12] },
              { name: 'x² + y² + 8x − 2y + 8 = 0', v: [8, -2, 8] },
              { name: 'x² + y² + 2x − 3y − 13 = 0', v: [2, -3, -13] },
              { name: 'x² + y² + 4x − 6y + 13 = 0', v: [4, -6, 13] },
              { name: 'x² + y² − 10x + 30 = 0', v: [-10, 0, 30] }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setD(p.v[0]);
                  setE(p.v[1]);
                  setF(p.v[2]);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <ol className="list-decimal pl-5 space-y-2 text-sm font-mono text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-4">
              <li>x² + y²{signed(D, 'x')}{signed(E, 'y')}{signed(F)} = 0</li>
              <li>(x²{signed(D, 'x')}) + (y²{signed(E, 'y')}) = {fmt(-F)}</li>
              <li>
                {sqTerm('x', -hx)} − {fmt(hx * hx)} + {sqTerm('y', -hy)} − {fmt(hy * hy)} = {fmt(-F)}
              </li>
              <li>
                {sqTerm('x', -hx)} + {sqTerm('y', -hy)} = {fmt(hx * hx)} + {fmt(hy * hy)} {F > 0 ? '−' : '+'} {fmt(Math.abs(F))} = <strong>{fmt(R)}</strong>
              </li>
              <li className="font-sans">
                {R > 0 ? (
                  <span className="text-emerald-700 font-bold">
                    Kör: C({fmt(cu)}; {fmt(cv)}), r = {isInt(rr) ? fmt(rr) : `√${fmt(R)} ≈ ${fmt(rr, 3)}`}
                  </span>
                ) : R === 0 ? (
                  <span className="text-amber-700 font-bold">Egyetlen pont elégíti ki: ({fmt(cu)}; {fmt(cv)}) – ez nem kör.</span>
                ) : (
                  <span className="text-rose-700 font-bold">A jobb oldal negatív: nincs ilyen pont, ez nem kör egyenlete.</span>
                )}
              </li>
            </ol>
            <G11CircleEquationPlane
              xMin={-9}
              xMax={9}
              yMin={-9}
              yMax={9}
              unit={15}
              tickEvery={3}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              circles={R > 0 ? [{ cx: cu, cy: cv, r: rr, color: CE_BLUE, width: 2.4, fill: 'rgba(124,58,237,0.07)' }] : []}
              points={R >= 0 ? [{ x: cu, y: cv, color: '#0f172a', label: `C(${fmt(cu)}; ${fmt(cv)})` }] : []}
            />
          </div>
          <TheoryCallout type="success" title="A lépések röviden">
            A középpont koordinátái az x és y együtthatójának fele, ellenkező előjellel: C(−D/2; −E/2); a sugár négyzete r² = (D/2)² + (E/2)² − F. Kör csak akkor van, ha ez pozitív.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default G11CircleEquationTheory;
