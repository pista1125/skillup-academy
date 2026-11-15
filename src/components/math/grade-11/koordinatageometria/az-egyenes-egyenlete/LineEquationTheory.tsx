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
  LadderWallSvg,
  LadderCoordinateSvg,
  LadderCasesSvg,
  LineFormsSvg,
  TwoPointLineSvg,
  AxisInterceptsSvg,
  LineEquationPlane,
  LE_BLUE,
  LE_RED,
  LE_GREEN,
  LE_PURPLE
} from './LineEquationFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return (Number(s) === 0 ? '0' : s).replace('.', ',').replace('-', '−');
};

// ---- Törtek (a laborhoz) ----
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
type Frac = { n: number; d: number };
const frac = (n: number, d: number): Frac => {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
};
const fracStr = (f: Frac) => {
  const s = f.d === 1 ? String(Math.abs(f.n)) : `${Math.abs(f.n)}/${f.d}`;
  return (f.n < 0 ? '−' : '') + s;
};
const absFracStr = (f: Frac) => (f.d === 1 ? String(Math.abs(f.n)) : `${Math.abs(f.n)}/${f.d}`);

/** y = m·x + b szöveges alakja (törtekkel). */
const lineStr = (m: Frac, b: Frac) => {
  if (m.n === 0) return `y = ${fracStr(b)}`;
  let s = 'y = ';
  if (m.n === m.d) s += 'x';
  else if (m.n === -m.d) s += '−x';
  else s += (m.d === 1 ? fracStr(m) : `${m.n < 0 ? '−' : ''}(${absFracStr(m)})`) + 'x';
  if (b.n > 0) s += ` + ${absFracStr(b)}`;
  else if (b.n < 0) s += ` − ${absFracStr(b)}`;
  return s;
};

const RANGE = 6;

export const LineEquationTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: két pont → egyenlet
  const [P, setP] = useState<[number, number]>([-1, 1]);
  const [Q, setQ] = useState<[number, number]>([2, 7]);
  const [active, setActive] = useState<'P' | 'Q'>('P');

  // Labor II: létra
  const [foot, setFoot] = useState<number>(0.8);
  const [top, setTop] = useState<number>(3);
  const [rungX, setRungX] = useState<number>(0.5);
  const [rungY, setRungY] = useState<number>(2.7);

  // ---- Labor I számítások ----
  const dx = Q[0] - P[0];
  const dy = Q[1] - P[1];
  const same = dx === 0 && dy === 0;
  const vertical = dx === 0 && !same;
  const m = !vertical && !same ? frac(dy, dx) : null;
  const b = m ? frac(P[1] * dx - dy * P[0], dx) : null;
  const eq = same ? '—' : vertical ? `x = ${String(P[0]).replace('-', '−')}` : lineStr(m!, b!);
  const mNum = m ? m.n / m.d : 0;
  const bNum = b ? b.n / b.d : 0;
  const xInt = m && m.n !== 0 ? frac(-b!.n * m.d, b!.d * m.n) : null;
  const pick = (x: number, y: number) => {
    if (active === 'P') setP([x, y]);
    else setQ([x, y]);
  };
  const setCoord = (which: 'P' | 'Q', idx: 0 | 1, v: number) => {
    const val = Math.max(-RANGE, Math.min(RANGE, Math.round(v)));
    if (which === 'P') setP((old) => (idx === 0 ? [val, old[1]] : [old[0], val]));
    else setQ((old) => (idx === 0 ? [val, old[1]] : [old[0], val]));
  };

  // ---- Labor II számítások ----
  const slope = -top / foot;
  const rx = Math.min(rungX, foot);
  const ry = Math.min(rungY, top);
  const hAtX = slope * rx + top;
  const xAtH = (ry - top) / slope;
  const LX = 210 / 1.6;
  const LY = 160 / 4;
  const O = { x: 40, y: 190 };
  const L = (x: number, y: number) => ({ x: O.x + x * LX, y: O.y - y * LY });
  const Ap = L(foot, 0);
  const Bp = L(0, top);
  const Cp = L(rx, hAtX);
  const Dp = L(xAtH, ry);

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="az-egyenes-egyenlete"
      title="10. Az egyenes egyenlete"
      subtitle="Milyen magasan van a létrafok? Az egyenes pontjainak koordinátái egyetlen egyenletet teljesítenek: y = mx + b vagy x = c."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_az_egyenes_egyenlete_tananyag.pdf"
      practiceTitle="Készen állsz az egyenes egyenletével kapcsolatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ EGYENES EGYENLETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                y = mx + b &nbsp; vagy &nbsp; x = c
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Az egyenes egyenletét <strong>csakis az egyenesre illeszkedő</strong> P(x; y) pontok koordinátái teszik igazzá.
              </li>
              <li>
                Az y tengellyel nem párhuzamos egyenes: <strong>y = mx + b</strong> (b: ahol az egyenes az y tengelyt metszi). y = mx: átmegy az origón; y = b: párhuzamos az x tengellyel.
              </li>
              <li>
                Az y tengellyel párhuzamos egyenes: <strong>x = c</strong> – ez nem függvény grafikonja.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: milyen magasan van a létrafok?" badge="Tankönyv 238. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az ezermester a létra talpát a vízszintes talajon a faltól <strong>0,8 m</strong>-re helyezte el, így a létra legfelső pontja <strong>3 m</strong> magasan támaszkodik a függőleges falhoz.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>a)</strong> Milyen magasan van a C létrafok, ha a faltól 0,5 m-re van?</li>
              <li><strong>b)</strong> Milyen messze van a faltól a D létrafok, ha 270 cm magasan van?</li>
            </ul>
            <TheoryCard title="I. módszer: hasonló háromszögek" badge="Megoldás" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>A megfelelő szögek egyenlősége miatt ABK△ ~ ACCₓ△ ~ ADDₓ△ ~ CBCᵧ△ ~ DBDᵧ△.</li>
                <li>CCₓ : CₓA = BK : KA ⇒ CCₓ : (0,8 − 0,5) = 3 : 0,8 ⇒ <strong>CCₓ = 1,125 m</strong>.</li>
                <li>DᵧD : BDᵧ = KA : BK ⇒ DᵧD : (3 − 2,7) = 0,8 : 3 ⇒ <strong>DᵧD = 0,08 m = 8 cm</strong>.</li>
              </ul>
            </TheoryCard>
          </div>
          <LadderWallSvg />
        </div>
      </TheorySection>

      {/* 2. II. módszer */}
      <TheorySection title="2. II. módszer: a létra egyenese a koordináta-rendszerben" badge="Kidolgozott feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <LadderCoordinateSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Helyezzük el a falat, a talajt és a létrát egy derékszögű koordináta-rendszerben (1 m = 1 egység)! Ekkor <strong>A(0,8; 0)</strong> és <strong>B(0; 3)</strong>, a létra pedig az A és B által meghatározott egyenesre illeszkedik.
            </p>
            <p>Ez egy lineáris függvény grafikonja: f(x) = ax + b. A két pont koordinátáit behelyettesítve:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>3 = a · 0 + b ⇒ <strong>b = 3</strong></li>
              <li>0 = a · 0,8 + 3 ⇒ a = −3 : 0,8 = <strong>−3,75</strong></li>
              <li>A hozzárendelési szabály: <strong>f(x) = −3,75x + 3</strong></li>
              <li>C: x = 0,5 ⇒ y = −3,75 · 0,5 + 3 = <strong>1,125</strong> ⇒ 1,125 m magasan van.</li>
              <li>D: y = 2,7 ⇒ 2,7 = −3,75x + 3 ⇒ x = <strong>0,08</strong> ⇒ 0,08 m-re van a faltól.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 3. A létra elhelyezései */}
      <TheorySection title="3. A létra többféle elhelyezése: öt egyenes" badge="Megjegyzés" badgeColor="teal">
        <LadderCasesSvg />
        <TheoryTable
          headers={['Eset', 'Mit tudunk az egyenesről?', 'Egyenlete']}
          rows={[
            ['A', 'illeszkedik a (2; 0) és a (4; 6) pontra – f(x) = 3x − 6', 'y = 3x − 6'],
            ['B', 'illeszkedik az y tengelyre: minden pontjának első koordinátája 0', 'x = 0'],
            ['C', 'párhuzamos az y tengellyel, minden pontjának első koordinátája 2', 'x = 2'],
            ['D', 'párhuzamos az x tengellyel, minden pontjának második koordinátája 3', 'y = 3'],
            ['E', 'illeszkedik az x tengelyre: minden pontjának második koordinátája 0', 'y = 0']
          ]}
        />
        <TheoryCallout type="warning" title="Vigyázat!">
          Az ábrákon nem minden elhelyezés szokványos, és nem minden eset biztonságos – a létrát mindig az előírások szerint, elcsúszás ellen biztosítva támaszd meg!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Elmélet */}
      <TheorySection title="4. Egyenes egyenlete a derékszögű koordináta-rendszerben" badge="Elmélet" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <TheoryCard title="Az egyenes egyenlete" badge="Definíció" badgeColor="blue">
              <p className="text-sm text-slate-700 leading-relaxed">
                A derékszögű koordináta-rendszerben minden egyenes megadható egy olyan egyenlettel (az egyenes pontjainak koordinátáira vonatkozó összefüggéssel), amelyet <strong>csakis az egyenesre illeszkedő P(x; y) pontok</strong> koordinátái tesznek igazzá.
              </p>
            </TheoryCard>
            <TheoryTable
              headers={['Alak', 'Mikor?', 'Példa']}
              rows={[
                ['y = mx + b (m, b ∈ R)', 'az egyenes nem párhuzamos az y tengellyel', 'y = 0,5x + 2'],
                ['y = mx', 'az egyenesre illeszkedik az origó', 'y = −1,5x'],
                ['y = b', 'az egyenes párhuzamos az x tengellyel', 'y = −2'],
                ['x = c (c ∈ R)', 'az egyenes párhuzamos az y tengellyel', 'x = 4']
              ]}
            />
          </div>
          <LineFormsSvg />
        </div>
        <TheoryCallout type="info" title="Egyenes vagy függvénygrafikon?">
          Minden lineáris függvény grafikonja egyenes, de nem minden egyenes lineáris függvény grafikonja. Az x = c egyenletű egyenes (pl. a létra B és C esete) nem függvény grafikonja, mert ugyanahhoz az x értékhez nem csak egy y érték tartozik. A függvényeknél az f(x) = ax + b, az egyeneseknél az y = mx + b vagy az x = c alakot használjuk.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Kidolgozott feladatok */}
      <TheorySection title="5. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Illeszkedik-e a pont az egyenesre?" badge="2. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Helyettesítsd be a pont koordinátáit: ha az egyenlőség igaz, a pont rajta van.</li>
              <li><strong>e: y = 1,5x − 5</strong>, P(2; 2): 1,5 · 2 − 5 = −2 ≠ 2 ⇒ P nincs rajta; Q(4; 1): 1,5 · 4 − 5 = 1 ⇒ <strong>Q rajta van</strong>.</li>
              <li><strong>e: y = −1,7x − 2</strong>, P(0; −2): −2 = −2 ⇒ <strong>P rajta van</strong>; Q(1; 3,7): −1,7 − 2 = −3,7 ≠ 3,7 ⇒ Q nincs rajta.</li>
              <li><strong>e: x = 2</strong>, P(2; 0): az első koordináta 2 ⇒ <strong>P rajta van</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Tengelymetszetek" badge="4. feladat, HF 3." badgeColor="purple">
            <AxisInterceptsSvg className="w-full h-auto max-w-xs mx-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>y tengely: x = 0-t helyettesítünk; x tengely: y = 0-t helyettesítünk.</li>
              <li><strong>y = 2x − 3</strong>: (0; −3) és 0 = 2x − 3 ⇒ <strong>(1,5; 0)</strong>.</li>
              <li><strong>y = −6x + 1</strong>: (0; 1) és <strong>(1/6; 0)</strong>.</li>
              <li><strong>y = −3</strong>: csak az y tengelyt metszi, a (0; −3) pontban (az x tengellyel párhuzamos).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Két pontra illeszkedő egyenes egyenlete" badge="5. feladat" badgeColor="emerald">
            <TwoPointLineSvg className="w-full h-auto max-w-xs mx-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Ha a két pont első koordinátája egyenlő: x = c. <strong>P(0; 5), Q(0; −1) ⇒ x = 0</strong>; P(3; −2), Q(3; 3,7) ⇒ <strong>x = 3</strong>.</li>
              <li>Egyébként y = mx + b, és a két pontot behelyettesítjük (egyenletrendszer):</li>
              <li><strong>P(4; −8), Q(−3; 6)</strong>: −8 = 4m + b, 6 = −3m + b ⇒ m = −2, b = 0 ⇒ <strong>y = −2x</strong>.</li>
              <li><strong>P(−7; −5), Q(2; 0)</strong>: m = 5/9, b = −10/9 ⇒ <strong>y = 5/9 · x − 10/9</strong>.</li>
              <li><strong>P(5; 13), Q(−1; 1)</strong>: m = 12 : 6 = 2, b = 3 ⇒ <strong>y = 2x + 3</strong> (az ábrán a (2; 7) pont is rajta van).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Kapcsolat a koordináták között" badge="1. feladat, HF 1." badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A második koordináta az első 3-szorosa: <strong>y = 3x</strong>.</li>
              <li>A második koordináta 5-tel nagyobb az elsőnél: <strong>y = x + 5</strong>.</li>
              <li>A második koordináta az első ellentettje: <strong>y = −x</strong>.</li>
              <li>y = 0,5x: a második koordináta az első fele; y = x − 2: 2-vel kisebb az elsőnél; y = −x + 3: a két koordináta összege 3.</li>
              <li>y = −8: minden pont második koordinátája −8; x = 11: minden pont első koordinátája 11.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 2.</strong> x = 15: A(15; 0) rajta van, B(0; 15) nincs; y = −2,8x + 2: sem A(−1; −1,8), sem B(2; −7,6) nincs rajta; y = −8: A(1; −8) rajta van, B(−8; 1) nincs.</li>
              <li><strong>HF 3.</strong> y = −6x + 5: (0; 5) és (5/6; 0); y = 9,7: csak (0; 9,7).</li>
              <li><strong>HF 4.</strong> A(−3; 1), B(4,7; 1) ⇒ y = 1; A(−5; 15), B(2; −6) ⇒ y = −3x; A(−2; 7,5), B(−2; −13) ⇒ x = −2; A(4; −7), B(−6; 13) ⇒ y = −2x + 1; A(9; 5), B(−2; −6) ⇒ y = x − 4.</li>
              <li><strong>HF 5. b)</strong> 3x − y = 8 átrendezve: y = 3x − 8.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: fordított hányados, összekevert x = c és y = c" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A meredekséget fordítva számoljuk ki"
          wrong="P(4; −8), Q(−3; 6): m = (−3 − 4) / (6 − (−8)) = −1/2 ⇒ y = −0,5x − 6"
          wrongExplanation="A meredekség a második koordináták változása osztva az első koordináták változásával – nem fordítva. Ellenőrzés: Q(−3; 6) behelyettesítve −0,5 · (−3) − 6 = −4,5 ≠ 6, tehát a kapott egyenes nem illeszkedik Q-ra."
          correct="m = (6 − (−8)) / (−3 − 4) = 14 / (−7) = −2, b = −8 − (−2) · 4 = 0 ⇒ y = −2x"
          correctExplanation="Mindkét pont teljesíti: −2 · 4 = −8 és −2 · (−3) = 6."
          tip="Mindig helyettesítsd vissza MINDKÉT pontot! És ne feledd: az y tengellyel párhuzamos egyenes egyenlete x = c (pl. x = 2), az x tengellyel párhuzamosé y = c."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: két pontból élő egyenlet" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['P', 'Q'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setActive(w)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${active === w ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    {w} mozgatása kattintással
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(['P', 'Q'] as const).map((w) => {
                  const pt = w === 'P' ? P : Q;
                  return (
                    <div key={w} className="space-y-1">
                      <div className="text-xs font-bold text-slate-600">{w} pont</div>
                      <div className="flex gap-2">
                        {([0, 1] as const).map((idx) => (
                          <input
                            key={idx}
                            type="number"
                            min={-RANGE}
                            max={RANGE}
                            step={1}
                            value={pt[idx]}
                            onChange={(e) => setCoord(w, idx, Number(e.target.value) || 0)}
                            className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                            aria-label={`${w} ${idx === 0 ? 'első' : 'második'} koordinátája`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: '(2; 0), (4; 6)', p: [2, 0], q: [4, 6] },
                  { name: '(2; −4), (−3; 6)', p: [2, -4], q: [-3, 6] },
                  { name: '(3; −2), (3; 4)', p: [3, -2], q: [3, 4] },
                  { name: '(−5; 1), (4; 1)', p: [-5, 1], q: [4, 1] },
                  { name: '(−1; 1), (2; 7)', p: [-1, 1], q: [2, 7] }
                ].map((pr) => (
                  <button
                    key={pr.name}
                    onClick={() => {
                      setP(pr.p as [number, number]);
                      setQ(pr.q as [number, number]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>P({fmt(P[0])}; {fmt(P[1])}), Q({fmt(Q[0])}; {fmt(Q[1])})</div>
                {same ? (
                  <div className="font-sans text-rose-700 font-bold">A két pont egybeesik – végtelen sok egyenes illeszkedik rá, válassz két különböző pontot!</div>
                ) : vertical ? (
                  <>
                    <div>Az első koordináták egyenlők ({fmt(P[0])}) ⇒ az egyenes párhuzamos az y tengellyel.</div>
                    <div className="text-base text-blue-800">Egyenlet: <strong>{eq}</strong></div>
                    <div className="text-xs text-slate-500 font-sans">Ez nem függvény grafikonja; y = mx + b alakban nem írható fel.</div>
                  </>
                ) : (
                  <>
                    <div>m = ({fmt(Q[1])} − ({fmt(P[1])})) / ({fmt(Q[0])} − ({fmt(P[0])})) = {fmt(dy)}/{fmt(dx)} = <strong>{fracStr(m!)}</strong></div>
                    <div>b = y₁ − m · x₁ = <strong>{fracStr(b!)}</strong></div>
                    <div className="text-base text-blue-800">Egyenlet: <strong>{eq}</strong></div>
                    <div className="text-xs text-slate-600">
                      Tengelymetszetek: y tengely (0; {fracStr(b!)}){' '}
                      {xInt ? <>; x tengely ({fracStr(xInt)}; 0)</> : '; az x tengellyel párhuzamos' + (b!.n === 0 ? ' (maga az x tengely)' : ', nem metszi')}
                    </div>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 italic">
                Kattints a rácsra: a kijelölt pont oda ugrik. Próbáld ki, mi történik, ha a két pont egymás alatt (azonos első koordináta) vagy egy magasságban van!
              </p>
            </div>
            <LineEquationPlane
              xMin={-RANGE}
              xMax={RANGE}
              yMin={-RANGE}
              yMax={RANGE}
              unit={24}
              tickEvery={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              onPick={pick}
              lines={same ? [] : vertical ? [{ x: P[0], color: LE_BLUE, width: 2.4 }] : [{ m: mNum, b: bNum, color: LE_BLUE, width: 2.4 }]}
              segments={
                same || vertical
                  ? []
                  : [
                      { from: P, to: [Q[0], P[1]], color: LE_GREEN, dashed: true, width: 1.6 },
                      { from: [Q[0], P[1]], to: Q, color: LE_RED, dashed: true, width: 1.6 }
                    ]
              }
              points={[
                { x: P[0], y: P[1], label: 'P', color: active === 'P' ? LE_RED : LE_PURPLE },
                { x: Q[0], y: Q[1], label: 'Q', color: active === 'Q' ? LE_RED : LE_PURPLE }
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: a létra egyenese" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A létra talpa a faltól (A első koordinátája): {fmt(foot, 2)} m</label>
                <input type="range" min="0.4" max="1.6" step="0.05" value={foot} onChange={(e) => setFoot(Number(e.target.value))} className="w-full accent-amber-600" aria-label="létra talpa" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A létra teteje (B második koordinátája): {fmt(top, 2)} m</label>
                <input type="range" min="2" max="4" step="0.05" value={top} onChange={(e) => setTop(Number(e.target.value))} className="w-full accent-purple-600" aria-label="létra teteje" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">C létrafok távolsága a faltól: {fmt(rx, 2)} m</label>
                <input type="range" min="0" max="1.6" step="0.01" value={rungX} onChange={(e) => setRungX(Number(e.target.value))} className="w-full accent-blue-600" aria-label="C létrafok" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">D létrafok magassága: {fmt(ry, 2)} m</label>
                <input type="range" min="0" max="4" step="0.01" value={rungY} onChange={(e) => setRungY(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="D létrafok" />
              </div>
              <button
                onClick={() => {
                  setFoot(0.8);
                  setTop(3);
                  setRungX(0.5);
                  setRungY(2.7);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                Tankönyvi adatok (0,8 m; 3 m; 0,5 m; 2,7 m)
              </button>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>A({fmt(foot)}; 0), B(0; {fmt(top)})</div>
                <div>m = −{fmt(top)} : {fmt(foot)} = {fmt(slope, 4)}</div>
                <div className="text-base text-purple-800"><strong>y = {fmt(slope, 4)}x + {fmt(top)}</strong></div>
                <div className="text-blue-700">C: x = {fmt(rx)} ⇒ y = {fmt(hAtX, 4)} m</div>
                <div className="text-emerald-700">D: y = {fmt(ry)} ⇒ x = ({fmt(ry)} − {fmt(top)}) : ({fmt(slope, 4)}) = {fmt(xAtH, 4)} m</div>
              </div>
            </div>
            <svg viewBox="0 0 280 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <rect x={O.x - 14} y={14} width={14} height={O.y - 14} fill="#cbd5e1" />
              <rect x={O.x - 14} y={O.y} width={250} height={10} fill="#d6d3d1" />
              <line x1={O.x} y1={14} x2={O.x} y2={O.y} stroke="#334155" strokeWidth={1.5} />
              <line x1={O.x} y1={O.y} x2={270} y2={O.y} stroke="#334155" strokeWidth={1.5} />
              <text x={266} y={O.y - 4} fontSize={10} fontStyle="italic" fill="#334155">x</text>
              <text x={O.x + 4} y={22} fontSize={10} fontStyle="italic" fill="#334155">y</text>
              <line x1={Ap.x} y1={Ap.y} x2={Bp.x} y2={Bp.y} stroke="#92400e" strokeWidth={4} strokeLinecap="round" />
              <line x1={Cp.x} y1={Cp.y} x2={Cp.x} y2={O.y} stroke={LE_BLUE} strokeDasharray="4 3" />
              <line x1={Dp.x} y1={Dp.y} x2={O.x} y2={Dp.y} stroke={LE_GREEN} strokeDasharray="4 3" />
              <circle cx={Ap.x} cy={Ap.y} r={3.5} fill={LE_RED} />
              <circle cx={Bp.x} cy={Bp.y} r={3.5} fill={LE_RED} />
              <circle cx={Cp.x} cy={Cp.y} r={4} fill={LE_BLUE} />
              <circle cx={Dp.x} cy={Dp.y} r={4} fill={LE_GREEN} />
              <text x={Ap.x + 4} y={Ap.y - 6} fontSize={11} fontWeight="bold" fill="#0f172a">A</text>
              <text x={Bp.x + 6} y={Bp.y - 4} fontSize={11} fontWeight="bold" fill="#0f172a">B</text>
              <text x={Cp.x + 6} y={Cp.y} fontSize={11} fontWeight="bold" fill={LE_BLUE}>C</text>
              <text x={Dp.x + 6} y={Dp.y + 2} fontSize={11} fontWeight="bold" fill={LE_GREEN}>D</text>
            </svg>
          </div>
          <TheoryCallout type="success" title="Figyeld meg!" className="mt-4">
            Minél meredekebben áll a létra (kisebb talptávolság, nagyobb magasság), annál nagyobb az m meredekség abszolút értéke. Az y = mx + b egyenletben b mindig a létra tetejének magassága, hiszen ott x = 0.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LineEquationTheory;
