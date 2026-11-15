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
  AirplaneBeaconSvg,
  AmbiguousCaseSvg,
  MountainHeightSvg,
  ConstructibilitySvg,
  PisaTowerSvg
} from './SineLawApplicationsFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const sin = (deg: number) => Math.sin(toRad(deg));
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

type Solution = { beta: number; gamma: number; c: number };

/** a, b és az a-val szemközti α ismeretében a lehetséges (β, γ, c) megoldások. */
const solveSSA = (a: number, b: number, alpha: number): { sinBeta: number; solutions: Solution[] } => {
  const sinBeta = (b * sin(alpha)) / a;
  if (sinBeta > 1 + 1e-9) return { sinBeta, solutions: [] };
  const b1 = sinBeta >= 1 - 1e-9 ? 90 : toDeg(Math.asin(sinBeta));
  const candidates = Math.abs(b1 - 90) < 1e-9 ? [90] : [b1, 180 - b1];
  const solutions = candidates
    .filter((beta) => alpha + beta < 180 - 1e-9)
    .map((beta) => {
      const gamma = 180 - alpha - beta;
      return { beta, gamma, c: (a * sin(gamma)) / sin(alpha) };
    });
  return { sinBeta, solutions };
};

export const SineLawApplicationsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: két megoldás esete
  const [sa, setSa] = useState<number>(4.5);
  const [sb, setSb] = useState<number>(6);
  const [sAlpha, setSAlpha] = useState<number>(45);
  const { sinBeta, solutions } = solveSSA(sa, sb, sAlpha);

  // Labor I rajz (matematikai koordináták: A = (0,0), a B csúcs az x tengelyen, C = b·(cos α, sin α))
  const Cx = sb * Math.cos(toRad(sAlpha));
  const Cy = sb * sin(sAlpha);
  const xmin = Math.min(0, Cx - sa);
  const xmax = Math.max(0.5, Cx + sa);
  const ymin = Math.min(0, Cy - sa);
  const ymax = Cy + sa;
  const scale = Math.min(320 / (xmax - xmin), 200 / (ymax - ymin));
  const map = (x: number, y: number) => ({ x: 10 + (x - xmin) * scale, y: 220 - (y - ymin) * scale });
  const LA = map(0, 0);
  const LC = map(Cx, Cy);
  const Bpts = solutions.map((s) => map(s.c, 0));
  const solColors = ['#2563eb', '#e11d48'];

  // Labor II: repülőgép
  const [flight, setFlight] = useState<number>(3000);
  const [dep1, setDep1] = useState<number>(27);
  const [dep2, setDep2] = useState<number>(57);
  const okPlane = dep2 > dep1;
  const angJ = dep2 - dep1;
  const dist1 = okPlane ? (flight * sin(dep2)) / sin(angJ) : NaN;
  const dist2 = okPlane ? (flight * sin(dep1)) / sin(angJ) : NaN;
  const height = dist1 * sin(dep1);
  const ground1 = dist1 * Math.cos(toRad(dep1));
  const pk = okPlane ? Math.min(300 / Math.max(ground1, flight), 150 / Math.max(height, 1)) : 1;
  const PR1 = { x: 20, y: 40 };
  const PR2 = { x: PR1.x + flight * pk, y: 40 };
  const PJ = { x: PR1.x + ground1 * pk, y: 40 + height * pk };

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="alkalmazasok-szinusztetel"
      title="10. Alkalmazások (szinusztétel)"
      subtitle="Repülőgép, hajó, hegycsúcs – és az a meglepő eset, amikor ugyanazokhoz az adatokhoz két különböző háromszög tartozik."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="indigo"
      pdfFilename="11_osztaly_szinusztetel_alkalmazasok_tananyag.pdf"
      practiceTitle="Készen állsz a szinusztétel alkalmazásaira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉT OLDAL ÉS AZ EGYIKKEL SZEMKÖZTI SZÖG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                sin β = b · sin α / a
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>sin β &gt; 1</strong> ⇒ nincs ilyen háromszög.</li>
              <li><strong>sin β = 1</strong> ⇒ β = 90°, egy (derékszögű) háromszög.</li>
              <li>
                <strong>sin β &lt; 1</strong> ⇒ β₁ hegyesszög és β₂ = 180° − β₁ tompaszög is szóba jön – mindkettőt ellenőrizni kell: <strong>α + β &lt; 180°</strong> legyen. Ha a nagyobb oldallal szemközti szög adott (a ≥ b), csak a hegyesszögű megoldás marad.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a repülőgép és a jeladó" badge="Tankönyv 28. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy állandó magasságban repülő gép a földi jeladót <strong>27°</strong>-os depressziószög (lehajlási szög) alatt látja, további <strong>3000 m</strong> repülés után <strong>57°</strong>-os depressziószög alatt. Mekkora távolságra volt a jeladótól a két időpontban, és milyen magasan repül? (Tíz méterre kerekítünk.)
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az R₁R₂J háromszög szögei: R₁-nél 27°, R₂-nél 180° − 57° = 123°, J-nél 180° − 27° − 123° = 30°.</li>
              <li>d / 3000 = sin 123° / sin 30° ⇒ <strong>d = 3000 · sin 123° / sin 30° ≈ 5030 m</strong></li>
              <li>e / 3000 = sin 27° / sin 30° ⇒ <strong>e = 3000 · sin 27° / sin 30° ≈ 2720 m</strong></li>
              <li>
                A magasság az R₁PJ derékszögű háromszögből: a J-nél fekvő hegyesszög 27° (váltószög), így <strong>h = d · sin 27° ≈ 2280 m</strong>.
              </li>
            </ul>
          </div>
          <AirplaneBeaconSvg />
        </div>
        <TheoryCallout type="info" title="Depressziószög">
          A depressziószög (lehajlási szög) a vízszintes és a lefelé néző látóirány szöge. Párhuzamos egyenesek miatt a földön, a J pontban ugyanekkora (váltószög) emelkedési szög mérhető.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Két megoldás */}
      <TheorySection title="2. Kidolgozott feladat: hegyesszögű vagy tompaszögű?" badge="Tankönyv 29. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy háromszögben <strong>a = 4,5 cm, b = 6 cm</strong>, és az a oldallal szemközti szög <strong>α = 45°</strong>. Lehetséges-e, hogy a háromszög a) hegyesszögű; b) tompaszögű?
            </p>
            <p>
              Ha van ilyen háromszög, a 6 cm-es oldallal szemközti szög 45°-nál nagyobb. A szinusztétel szerint
              sin β / sin 45° = 6 / 4,5, ebből <strong>sin β = 6 · sin 45° / 4,5 ≈ 0,9428</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> β ≈ 70,53° ⇒ γ = 180° − (α + β) ≈ <strong>64,47°</strong> – van hegyesszögű háromszög (c ≈ 5,74 cm).
              </li>
              <li>
                <strong>b)</strong> A tompaszög szinusza a kiegészítő szögéé: β ≈ 180° − 70,53° = <strong>109,47°</strong> ⇒ γ ≈ <strong>25,53°</strong> – van tompaszögű háromszög is (c ≈ 2,74 cm).
              </li>
            </ul>
          </div>
          <AmbiguousCaseSvg />
        </div>
        <TheoryCallout type="warning" title="Megfigyelés">
          Két lényegesen különböző (nem egybevágó) háromszög is van, amelynek oldalai 4,5 cm és 6 cm, és a kisebb oldallal szemközti szög 45°. Az ábrán a két háromszög egymás mellé illesztve látható: a C körüli 4,5 cm sugarú kör két pontban metszi az alap egyenesét.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Van-e ilyen háromszög? */}
      <TheorySection title="3. Kidolgozott feladat: van-e ilyen háromszög?" badge="2. kidolgozott feladat" badgeColor="amber">
        <p className="text-sm text-slate-700">
          b = 7 cm és α = 68° mellett az a oldal hosszát változtatjuk. sin β = b · sin α / a = 7 · sin 68° / a.
        </p>
        <TheoryTable
          headers={['a', 'sin β', 'Lehetséges β', 'Ellenőrzés', 'Megoldás']}
          rows={[
            ['2 cm', '≈ 3,24', '–', 'sin β > 1', <strong key="r1">nincs háromszög</strong>],
            ['6,5 cm', '≈ 0,9985', '86,9° vagy 93,1°', 'mindkettő: 68° + β < 180°', <strong key="r2">két háromszög: 68°, 86,9°, 25,1° és 68°, 93,1°, 18,9°</strong>],
            ['8 cm', '≈ 0,811', '54,2° vagy 125,8°', '68° + 125,8° > 180°', <strong key="r3">egy háromszög: 68°, 54,2°, 57,8°</strong>]
          ]}
        />
        <TheoryCallout type="tip" title="Szabály a gyakorlatban">
          Ha az adott szög a <strong>nagyobb</strong> oldallal szemközti (a = 8 cm &gt; b = 7 cm), akkor a keresett β szög csak hegyesszög lehet, mert nagyobb oldallal szemben nagyobb szög van. Ha az adott szög a <strong>kisebb</strong> oldallal szemközti, két megoldás is lehet.
        </TheoryCallout>
        <TheoryTable
          headers={['3. feladat', 'sin β', 'Megoldás(ok)']}
          rows={[
            ['a = 6, b = 4,5, α = 45°', '≈ 0,530', 'egy: β ≈ 32,0°, γ ≈ 103,0° (a 148,0° túl nagy)'],
            ['a = 5, b = 10, α = 30°', '= 1', 'egy: β = 90°, γ = 60° (derékszögű)'],
            ['a = 6, b = 7,5, α = 65°', '≈ 1,133', 'nincs ilyen háromszög'],
            ['a = 6, b = 7,5, α = 30°', '= 0,625', 'kettő: β ≈ 38,7°, γ ≈ 111,3° vagy β ≈ 141,3°, γ ≈ 8,7°']
          ]}
        />
      </TheorySection>

      {/* 4. Alkalmazások */}
      <TheorySection title="4. Alkalmazási feladatok" badge="1. és 4. feladat, házi feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Hegycsúcs magassága" badge="4. feladat" badgeColor="teal">
            <MountainHeightSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az ABH háromszögben AB = 223 m, α = 74°, β = 51°, így H-nál 55° van.</li>
              <li>BH a 74°-kal szemközti oldal: BH = 223 · sin 74° / sin 55° ≈ <strong>261,7 m</strong>.</li>
              <li>A BKH derékszögű háromszögből (B-nél 11°): m = BH · sin 11° ≈ <strong>50 m</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A pisai ferde torony" badge="Házi feladat 1." badgeColor="amber">
            <PisaTowerSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A torony 4°-kal dől dél felé, a déli napsugár 77°-os, az árnyék 9 m.</li>
              <li>A háromszög szögei: árnyék végén 77°, a torony tövénél 90° + 4° = 94°, a csúcsnál 9°.</li>
              <li>L = 9 · sin 77° / sin 9° ≈ <strong>56 m</strong> lenne a torony kiegyenesítve.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="C) Hajó a tengeren" badge="1. feladat" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              120 m-es parti szakasz, α ≈ 73°, β ≈ 52° ⇒ a hajónál 55°. A háromszög két ismeretlen oldala: 120 · sin 52° / sin 55° ≈ <strong>115,4 m</strong> (az α csúcsától) és 120 · sin 73° / sin 55° ≈ <strong>140,1 m</strong> (a β csúcsától). A hajó távolsága a parttól: x = 115,4 · sin 73° ≈ <strong>110,4 m</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Mars-szonda a kráterben" badge="Házi feladat 2." badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              A lejtő 31 m, 25°-os. A felemelt radarból a perem 22°-os szögben látszik. A háromszög szögei: a kráter alján 90° − 25° = 65°, a radarnál 90° + 22° = 112°, a peremnél 3°. A radar magassága: 31 · sin 3° / sin 112° ≈ <strong>1,75 m</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Ráadás */}
      <TheorySection title="5. Ráadás: szerkeszthetőség és a szinusztétel" badge="Tankönyv 31. o." badgeColor="violet">
        <ConstructibilitySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A szerkesztés menete" badge="a, b, β adott" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Felvesszük az a = BC szakaszt.</li>
              <li>B-ben megszerkesztjük a β = 30°-os szöget (egyik szára BC).</li>
              <li>Megrajzoljuk a C középpontú, b sugarú kört.</li>
              <li>A kör és a szög másik szárának metszéspontja adja az A csúcsot.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Számítással" badge="sin α = a · sin β / b" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>b = 4 cm: sin α = 5/4 &gt; 1 ⇒ nincs háromszög (nincs metszéspont).</li>
              <li>b = 5 cm: sin α = 1 ⇒ α = 90°, egy háromszög (a kör érinti a szárat).</li>
              <li>b = 6 cm: sin α = 5/6 ⇒ α ≈ 56,44° vagy α ≈ 123,56°, két háromszög.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hibák a szögkeresésnél" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett vagy hamis második megoldás"
          wrong="sin β ≈ 0,9428 ⇒ β ≈ 70,53°, más megoldás nincs. – illetve: sin β ≈ 0,811 ⇒ β ≈ 54,2° vagy 125,8°, tehát két háromszög van."
          wrongExplanation="Az első esetben elveszett a tompaszögű β ≈ 109,47° megoldás. A második esetben a 125,8° nem jó, mert 68° + 125,8° > 180°."
          correct="Mindig írd fel mindkét jelöltet (β₁ és 180° − β₁), majd ellenőrizd: α + β < 180°?"
          correctExplanation="Így derül ki, hogy 0, 1 vagy 2 háromszög tartozik az adatokhoz."
          tip="Gyors ellenőrzés: ha az adott szöggel szemközti oldal a nagyobb (a ≥ b), csak egy (hegyesszögű β) megoldás lehet."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Nulla, egy vagy két háromszög?" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">α (az a oldallal szemközti szög): {sAlpha}°</label>
                <input type="range" min="5" max="170" value={sAlpha} onChange={(e) => setSAlpha(Number(e.target.value))} className="w-full accent-rose-600" aria-label="alfa" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">a: {fmt(sa, 1)} cm</label>
                  <input type="range" min="1" max="12" step="0.1" value={sa} onChange={(e) => setSa(Number(e.target.value))} className="w-full accent-blue-600" aria-label="a oldal" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">b: {fmt(sb, 1)} cm</label>
                  <input type="range" min="1" max="12" step="0.1" value={sb} onChange={(e) => setSb(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="b oldal" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { l: '4,5 / 6 / 45°', a: 4.5, b: 6, al: 45 },
                  { l: '6,5 / 7 / 68°', a: 6.5, b: 7, al: 68 },
                  { l: '8 / 7 / 68°', a: 8, b: 7, al: 68 },
                  { l: '2 / 7 / 68°', a: 2, b: 7, al: 68 },
                  { l: '5 / 10 / 30°', a: 5, b: 10, al: 30 }
                ].map((p) => (
                  <button
                    key={p.l}
                    onClick={() => {
                      setSa(p.a);
                      setSb(p.b);
                      setSAlpha(p.al);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200"
                  >
                    {p.l}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 font-mono space-y-1">
                <div>sin β = b · sin α / a = <strong>{fmt(sinBeta, 4)}</strong></div>
                {sinBeta > 1 + 1e-9 ? (
                  <div className="text-rose-700 font-semibold">sin β &gt; 1 ⇒ nincs ilyen háromszög.</div>
                ) : solutions.length === 0 ? (
                  <div className="text-rose-700 font-semibold">A lehetséges β szögekkel α + β ≥ 180° ⇒ nincs ilyen háromszög.</div>
                ) : (
                  solutions.map((s, i) => (
                    <div key={i} style={{ color: solColors[i] }}>
                      {i + 1}. megoldás: β ≈ {fmt(s.beta, 2)}°, γ ≈ {fmt(s.gamma, 2)}°, c ≈ {fmt(s.c, 2)} cm
                    </div>
                  ))
                )}
                <div className="text-xs text-slate-500 pt-1">
                  Megoldások száma: <strong>{solutions.length}</strong>
                </div>
              </div>
            </div>
            <svg viewBox="0 0 340 240" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="0" y1={LA.y} x2="340" y2={LA.y} stroke="#94a3b8" strokeWidth="1.2" />
              <circle cx={LC.x} cy={LC.y} r={sa * scale} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 4" />
              <line x1={LA.x} y1={LA.y} x2={LC.x} y2={LC.y} stroke="#047857" strokeWidth="2.5" />
              {Bpts.map((P, i) => (
                <g key={i}>
                  <polygon points={`${LA.x},${LA.y} ${P.x},${P.y} ${LC.x},${LC.y}`} fill={i === 0 ? 'rgba(37,99,235,0.12)' : 'rgba(225,29,72,0.12)'} stroke={solColors[i]} strokeWidth="2" />
                  <circle cx={P.x} cy={P.y} r="3.5" fill={solColors[i]} />
                  <text x={P.x} y={P.y + 14} fontSize="10" fontWeight="bold" fill={solColors[i]} textAnchor="middle">B{i + 1}</text>
                </g>
              ))}
              <circle cx={LA.x} cy={LA.y} r="3.5" fill="#0f172a" />
              <circle cx={LC.x} cy={LC.y} r="3.5" fill="#0f172a" />
              <text x={LA.x - 4} y={LA.y + 14} fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="end">A</text>
              <text x={LC.x} y={LC.y - 6} fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="middle">C</text>
              <text x="170" y="234" fontSize="10" textAnchor="middle" fill="#475569">C körüli a sugarú kör ∩ alapegyenes = B csúcs(ok)</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Repülési magasság két mérésből" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Repült táv: {flight} m</label>
              <input type="range" min="500" max="6000" step="100" value={flight} onChange={(e) => setFlight(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="repült táv" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">1. depressziószög: {dep1}°</label>
              <input type="range" min="5" max="85" value={dep1} onChange={(e) => setDep1(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="első depressziószög" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">2. depressziószög: {dep2}°</label>
              <input type="range" min="6" max="89" value={dep2} onChange={(e) => setDep2(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="második depressziószög" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
              {okPlane ? (
                <>
                  <div>1. szögek: R₁: {dep1}°, R₂: {180 - dep2}°, J: {angJ}°</div>
                  <div>2. d = {flight} · sin {180 - dep2}° / sin {angJ}° ≈ <strong>{fmt(dist1, 0)} m</strong></div>
                  <div>3. e = {flight} · sin {dep1}° / sin {angJ}° ≈ <strong>{fmt(dist2, 0)} m</strong></div>
                  <div>4. h = d · sin {dep1}° ≈ <strong>{fmt(height, 0)} m</strong></div>
                </>
              ) : (
                <div className="text-rose-700 font-semibold">A második depressziószögnek nagyobbnak kell lennie (a gép közeledik a jeladóhoz)!</div>
              )}
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-sky-50 rounded-xl border border-slate-200">
              {okPlane && (
                <>
                  <line x1="0" y1={PJ.y} x2="340" y2={PJ.y} stroke="#a16207" strokeWidth="2.5" />
                  <polygon points={`${PR1.x},${PR1.y} ${PR2.x},${PR2.y} ${PJ.x},${PJ.y}`} fill="rgba(99,102,241,0.12)" stroke="#4f46e5" strokeWidth="2" />
                  <line x1={PR1.x} y1={PR1.y} x2={PR1.x} y2={PJ.y} stroke="#059669" strokeWidth="1.8" strokeDasharray="5 4" />
                  <circle cx={PR1.x} cy={PR1.y} r="4" fill="#0f172a" />
                  <circle cx={PR2.x} cy={PR2.y} r="4" fill="#0f172a" />
                  <circle cx={PJ.x} cy={PJ.y} r="4" fill="#dc2626" />
                  <text x={PR1.x + 4} y={PR1.y - 8} fontSize="10" fontWeight="bold" fill="#0f172a">R₁</text>
                  <text x={PR2.x} y={PR2.y - 8} fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="middle">R₂</text>
                  <text x={PJ.x} y={PJ.y - 8} fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">J</text>
                  <text x={PR1.x + 6} y={(PR1.y + PJ.y) / 2} fontSize="10" fontWeight="bold" fill="#047857">h ≈ {fmt(height, 0)} m</text>
                </>
              )}
            </svg>
          </div>
          <TheoryCallout type="success" title="Tankönyvi adatok">
            3000 m, 27° és 57° ⇒ d ≈ 5030 m, e ≈ 2720 m, h ≈ 2280 m (tíz méterre kerekítve).
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SineLawApplicationsTheory;
