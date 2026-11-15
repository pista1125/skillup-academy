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
  FlightMapSvg,
  CosineLawDerivationSvg,
  CosineLawGeneralSvg,
  WaterMoleculeSvg,
  ParallelogramDiagonalsSvg
} from './CosineLawFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};

export const CosineLawTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: két oldal és a közbezárt szög
  const [sideA, setSideA] = useState<number>(8);
  const [sideB, setSideB] = useState<number>(6);
  const [gamma, setGamma] = useState<number>(60);

  // Labor II: három oldalból a szögek
  const [p, setP] = useState<number>(5);
  const [q, setQ] = useState<number>(6);
  const [r, setR] = useState<number>(7);

  // Labor I számítások
  const cosG = Math.cos(toRad(gamma));
  const correction = -2 * sideA * sideB * cosG;
  const cSq = sideA * sideA + sideB * sideB + correction;
  const c = Math.sqrt(Math.max(0, cSq));
  const pyth = Math.hypot(sideA, sideB);
  // rajz: C a bal alsó részen, CA vízszintes (b), CB γ szögben (a)
  const Bx = sideA * Math.cos(toRad(gamma));
  const By = sideA * Math.sin(toRad(gamma));
  const minX = Math.min(0, Bx);
  const maxX = Math.max(sideB, Bx);
  const scale = Math.min(280 / (maxX - minX || 1), 160 / (By || 1));
  const Cpt = { x: 30 + (0 - minX) * scale, y: 195 };
  const Apt = { x: Cpt.x + sideB * scale, y: Cpt.y };
  const Bpt = { x: Cpt.x + Bx * scale, y: Cpt.y - By * scale };
  const arcR = 24;
  const arcEnd = { x: Cpt.x + arcR * Math.cos(toRad(gamma)), y: Cpt.y - arcR * Math.sin(toRad(gamma)) };

  // Labor II számítások
  const valid = p > 0 && q > 0 && r > 0 && p + q > r && p + r > q && q + r > p;
  const angOpp = (x: number, y: number, z: number) => toDeg(Math.acos((x * x + y * y - z * z) / (2 * x * y)));
  const aP = valid ? angOpp(q, r, p) : NaN;
  const aQ = valid ? angOpp(p, r, q) : NaN;
  const aR = valid ? angOpp(p, q, r) : NaN;
  const longest = Math.max(p, q, r);
  const others = [p, q, r].sort((x, y) => x - y).slice(0, 2);
  const diff = others[0] * others[0] + others[1] * others[1] - longest * longest;
  const kind = !valid
    ? 'nincs ilyen háromszög'
    : Math.abs(diff) < 1e-9
      ? 'derékszögű'
      : diff > 0
        ? 'hegyesszögű'
        : 'tompaszögű';

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="a-koszinusztetel"
      title="12. A koszinusztétel"
      subtitle="Milyen messze van Bécs Zágrábtól? Két oldal és a közbezárt szög ismeretében a harmadik oldal, három oldalból a szögek – a Pitagorasz-tétel általánosítása."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_koszinusztetel_tananyag.pdf"
      practiceTitle="Készen állsz a koszinusztételes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A KOSZINUSZTÉTEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                c² = a² + b² − 2ab · cos γ
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                a, b, c a háromszög oldalai, γ a <strong>c oldallal szemközti</strong> szög – minden háromszögre igaz (γ hegyes-, derék- vagy tompaszög).
              </li>
              <li>
                γ = 90° esetén cos γ = 0, így a tétel a <strong>Pitagorasz-tétel</strong>: c² = a² + b².
              </li>
              <li>
                Használd, ha ismert <strong>két oldal és a közbezárt szög</strong>, vagy ha ismert <strong>mindhárom oldal</strong> (szögek: cos γ = (a² + b² − c²) / (2ab)).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: milyen messze van Bécs Zágrábtól?" badge="Tankönyv 34. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Két kisrepülőgép Budapestről felszállva egyenesen Bécs, illetve Zágráb felé indul. Budapest és Bécs távolsága légvonalban <strong>233 km</strong>, Budapest és Zágráb között <strong>309 km</strong>. A két gép útiránya között <strong>60,9°</strong> az eltérés. Mekkora a Bécs–Zágráb-távolság?
            </p>
            <p>
              Ismerünk két oldalt és az általuk közbezárt szöget – a szinusztétel itt nem segít, mert nincs olyan oldal–szemközti szög párunk, amelynek mindkét tagját ismernénk.
            </p>
          </div>
          <FlightMapSvg />
        </div>
      </TheorySection>

      {/* 2. Levezetés és tétel */}
      <TheorySection title="2. A levezetés és a koszinusztétel" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CosineLawDerivationSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Bontsuk fel a háromszöget a Bécsből induló magassággal két derékszögű háromszögre!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A bal oldali derékszögű háromszögben (Pitagorasz): c² = h² + (309 − x)² = h² + x² + 309² − 2 · 309 · x.</li>
              <li>A jobb oldaliban: h² + x² = 233² és x = 233 · cos 60,9°.</li>
              <li>Behelyettesítve: <strong>c² = 233² + 309² − 2 · 309 · 233 · cos 60,9°</strong> ⇒ <strong>c ≈ 282 km</strong>.</li>
            </ul>
            <p>
              Ez az összefüggés megmutatja, hogyan számítható ki egy oldal hossza a két másik oldal hosszának és a közbezárt szögüknek az ismeretében.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CosineLawGeneralSvg />
          <TheoryCard title="Koszinusztétel" badge="Tétel" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha a, b és c egy háromszög oldalainak hossza, γ pedig a c oldallal szemközti szög nagysága, akkor
              <strong> c² = a² + b² − 2ab cos γ</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>Igaz minden háromszögre, függetlenül attól, hogy γ hegyes-, derék- vagy tompaszög.</li>
              <li>γ = 90° ⇒ cos γ = 0 ⇒ c² = a² + b²: a koszinusztétel a <strong>Pitagorasz-tétel általánosítása</strong>.</li>
              <li>Tompaszögnél cos γ &lt; 0, ezért a −2ab cos γ tag <strong>pozitív</strong>: c² &gt; a² + b².</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Mikor melyik tétel? */}
      <TheorySection title="3. Döntési segéd: szinusztétel vagy koszinusztétel?" badge="Stratégia" badgeColor="teal">
        <TheoryTable
          headers={['Ismert adatok', 'Keresett', 'Melyik tétel?']}
          rows={[
            ['két oldal és a közbezárt szög (o–sz–o)', 'a harmadik oldal', 'koszinusztétel'],
            ['mindhárom oldal (o–o–o)', 'a szögek', 'koszinusztétel a leghosszabb oldallal szemközti szögre, utána szinusztétel'],
            ['két szög és egy oldal', 'a többi oldal', 'szinusztétel'],
            ['két oldal és az egyikkel szemközti szög', 'a másik szemközti szög', 'szinusztétel (vigyázat: 2 megoldás is lehet!)']
          ]}
        />
        <TheoryCallout type="tip" title="Miért a leghosszabb oldallal szemközti szöggel kezdjünk?">
          A leghosszabb oldallal szemközti szög a legnagyobb – csak ez lehet tompaszög. A koszinusz előjele ezt egyértelműen eldönti. A maradék két szög biztosan hegyesszög, így a szinusztétel már nem ad kétértelmű eredményt.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A repülőgépek útiránya Bécsből" badge="Kidolgozott feladat" badgeColor="sky">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Mekkora szöget zárna be a két útirány, ha mindkét gép Bécsből szállna fel Budapest, illetve Zágráb felé?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A keresett α szög a 309 km-es (Budapest–Zágráb) oldallal szemközti szög.</li>
                <li>309² = 282² + 233² − 2 · 282 · 233 · cos α</li>
                <li>cos α = (282² + 233² − 309²) / (2 · 282 · 233) ≈ 0,292</li>
                <li><strong>α ≈ 73°</strong></li>
              </ul>
              <p className="text-xs text-slate-500">
                Megjegyzés: sokkal nagyobb földrajzi távolságoknál (pl. Budapest–San Francisco) a sík háromszöggel való számolás pontatlan, mert a Föld felszíne gömb.
              </p>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Harmadik oldal: 53 mm, 71 mm" badge="1. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a) 60°:</strong> c² = 53² + 71² − 2 · 53 · 71 · 0,5 = 4087 ⇒ <strong>c ≈ 63,9 mm</strong></li>
              <li><strong>b) 147°:</strong> c² = 53² + 71² − 2 · 53 · 71 · cos 147° ≈ 14 162 ⇒ <strong>c ≈ 119,0 mm</strong></li>
              <li>Tompaszögnél cos 147° ≈ −0,839 &lt; 0, ezért a harmadik oldal hosszabb, mint √(53² + 71²) ≈ 88,6 mm.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) A háromszög legnagyobb szöge" badge="2. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A legnagyobb szög a leghosszabb oldallal szemközti: cos γ = (a² + b² − c²) / (2ab).</li>
              <li><strong>a)</strong> 5, 6, 7 cm: cos γ = (25 + 36 − 49) / 60 = 0,2 ⇒ <strong>γ ≈ 78,5°</strong></li>
              <li><strong>b)</strong> 27,2; 51,0; 57,8 mm: 27,2² + 51,0² = 57,8², cos γ = 0 ⇒ <strong>γ = 90°</strong></li>
              <li><strong>c)</strong> 13,2; 14,1; 24,5 m: cos γ ≈ −0,610 ⇒ <strong>γ ≈ 127,6°</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) A vízmolekula" badge="3. feladat" badgeColor="rose">
            <WaterMoleculeSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              d² = 98² + 98² − 2 · 98 · 98 · cos 104,5° ≈ 24 017 ⇒ a két hidrogénatommag távolsága <strong>d ≈ 155 pm</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="E) Paralelogramma: 24 cm, 32 cm, hosszabbik átló 42 cm" badge="4. feladat" badgeColor="orange">
            <ParallelogramDiagonalsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A hosszabbik átló a tompaszöggel szemben van: cos β = (24² + 32² − 42²) / (2 · 24 · 32) ≈ −0,107 ⇒ <strong>β ≈ 96,1°</strong>, így <strong>α ≈ 83,9°</strong>.</li>
              <li>A rövidebbik átló az α-val szemben: f² = 24² + 32² − 2 · 24 · 32 · cos α ≈ 1436 ⇒ <strong>f ≈ 37,9 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> Vasúti megállók: 12 km, 17 km, 52° ⇒ ≈ 13,5 km.</li>
              <li><strong>HF 2. a)</strong> 4,1; 5,3; 9,9 cm: 4,1 + 5,3 = 9,4 &lt; 9,9 ⇒ <strong>nincs ilyen háromszög</strong> (a koszinusz −1-nél kisebbnek adódna).</li>
              <li><strong>HF 2. b)</strong> 14; 33,6; 36,4 m ⇒ ≈ 22,6°, ≈ 67,4°, 90° (derékszögű!).</li>
              <li><strong>HF 3.</strong> Fahíd: 4 m, 1,3 m, 115° ⇒ ≈ 4,7 m.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: rossz szög vagy rossz előjel" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A szög nem a keresett oldallal szemközti, vagy elmarad a negatív koszinusz"
          wrong="c² = a² + b² − 2ab · cos α (ahol α nem a c-vel szemközti szög), illetve tompaszögnél cos γ helyett |cos γ|"
          wrongExplanation="A tételben mindig a kiszámítandó oldallal SZEMKÖZTI szög (a két ismert oldal által KÖZBEZÁRT szög) szerepel. Tompaszögnél a koszinusz negatív – ha előjel nélkül számolsz, a 147°-os feladatban 119,0 mm helyett hibásan ≈ 39,2 mm jön ki."
          correct="c² = a² + b² − 2ab · cos γ, ahol γ az a és b oldal által közbezárt szög"
          correctExplanation="53 mm, 71 mm, 147° ⇒ c² = 2809 + 5041 − 7526 · (−0,8387) ≈ 14 162 ⇒ c ≈ 119,0 mm."
          tip="Ellenőrzés: tompaszöggel szemben a leghosszabb oldal van, és c² > a² + b²; hegyesszöggel szemben c² < a² + b²."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Két oldal és a közbezárt szög" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a oldal: {fmt(sideA, 1)}</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  aria-label="a oldal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">b oldal: {fmt(sideB, 1)}</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="b oldal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">közbezárt szög γ: {gamma}°</label>
                <input
                  type="range"
                  min="1"
                  max="179"
                  value={gamma}
                  onChange={(e) => setGamma(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="gamma szög"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>a² + b² = {fmt(sideA * sideA + sideB * sideB)}</div>
                <div>−2ab · cos γ = {fmt(correction)} {gamma > 90 ? '(tompaszög: hozzáadódik)' : gamma === 90 ? '(derékszög: 0)' : '(hegyesszög: levonódik)'}</div>
                <div>c² = {fmt(cSq)} ⇒ <strong>c ≈ {fmt(c)}</strong></div>
                <div className="text-xs text-slate-500">Pitagorasz-tétellel (γ = 90° esetén): √(a² + b²) ≈ {fmt(pyth)}</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Állítsd γ-t 90°-ra: a korrekciós tag eltűnik. Kisebb szögnél c rövidebb, nagyobb szögnél hosszabb, mint √(a² + b²).
              </p>
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon
                points={`${Cpt.x},${Cpt.y} ${Apt.x},${Apt.y} ${Bpt.x},${Bpt.y}`}
                fill="rgba(59,130,246,0.12)"
                stroke="#2563eb"
                strokeWidth="2"
              />
              <line x1={Apt.x} y1={Apt.y} x2={Bpt.x} y2={Bpt.y} stroke="#dc2626" strokeWidth="3" />
              <path
                d={`M ${Cpt.x + arcR} ${Cpt.y} A ${arcR} ${arcR} 0 0 0 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`}
                fill="rgba(239,68,68,0.15)"
                stroke="#dc2626"
                strokeWidth="1.5"
              />
              <text x={Cpt.x - 6} y={Cpt.y + 16} fontSize="11" fontWeight="bold" fill="#0f172a">C</text>
              <text x={Cpt.x + 28} y={Cpt.y - 6} fontSize="11" fontWeight="bold" fill="#b91c1c">{gamma}°</text>
              <text x={(Cpt.x + Apt.x) / 2} y={Cpt.y + 16} fontSize="11" textAnchor="middle" fill="#047857">b</text>
              <text x={(Cpt.x + Bpt.x) / 2 - 8} y={(Cpt.y + Bpt.y) / 2} fontSize="11" textAnchor="end" fill="#1d4ed8">a</text>
              <text x={(Apt.x + Bpt.x) / 2 + 8} y={(Apt.y + Bpt.y) / 2} fontSize="11" fontWeight="bold" fill="#b91c1c">
                c ≈ {fmt(c, 1)}
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Három oldalból a szögek" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'a oldal', val: p, set: setP },
              { label: 'b oldal', val: q, set: setQ },
              { label: 'c oldal', val: r, set: setR }
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={f.val}
                  onChange={(e) => f.set(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label={f.label}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: '2. a)', v: [5, 6, 7] },
              { name: '2. b)', v: [27.2, 51.0, 57.8] },
              { name: '2. c)', v: [13.2, 14.1, 24.5] },
              { name: 'HF 2. a)', v: [4.1, 5.3, 9.9] },
              { name: 'HF 2. b)', v: [14, 33.6, 36.4] }
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setP(preset.v[0]);
                  setQ(preset.v[1]);
                  setR(preset.v[2]);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {preset.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            {valid ? (
              <>
                <div>cos α = (b² + c² − a²) / (2bc) ⇒ <strong>α ≈ {fmt(aP, 1)}°</strong></div>
                <div>cos β = (a² + c² − b²) / (2ac) ⇒ <strong>β ≈ {fmt(aQ, 1)}°</strong></div>
                <div>cos γ = (a² + b² − c²) / (2ab) ⇒ <strong>γ ≈ {fmt(aR, 1)}°</strong></div>
                <div className="text-xs text-slate-500">Ellenőrzés: α + β + γ ≈ {fmt(aP + aQ + aR, 1)}°</div>
                <div className="font-sans pt-1">
                  A háromszög <strong>{kind}</strong> (a két rövidebb oldal négyzetösszege − a leghosszabb négyzete = {fmt(diff)}).
                </div>
              </>
            ) : (
              <div className="font-sans text-rose-700 font-bold">
                Nincs ilyen háromszög: nem teljesül a háromszög-egyenlőtlenség (két oldal összege nem nagyobb a harmadiknál). A koszinusztétel −1 és 1 közé nem eső „koszinuszt” adna.
              </div>
            )}
          </div>
          <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
            Az 5, 6, 7 cm-es háromszög legnagyobb szöge ≈ 78,5°; a 27,2–51,0–57,8 mm-es derékszögű; a 13,2–14,1–24,5 m-es tompaszögű (≈ 127,6°). A HF 2. a) adataiból nem lehet háromszöget szerkeszteni!
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CosineLawTheory;
