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
  NewBridgeSvg,
  BridgeCablesSvg,
  SineLawProofSvg,
  ShipDistanceSvg,
  SideSumTriangleSvg
} from './SineLawFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const sin = (deg: number) => Math.sin(toRad(deg));
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const SineLawTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: a szinusztétel élőben
  const [alpha, setAlpha] = useState<number>(55);
  const [beta, setBeta] = useState<number>(70);
  const [sideC, setSideC] = useState<number>(8);
  const gamma = 180 - alpha - beta;
  const okTriangle = gamma > 0;
  const a1 = okTriangle ? (sideC * sin(alpha)) / sin(gamma) : NaN;
  const b1 = okTriangle ? (sideC * sin(beta)) / sin(gamma) : NaN;
  const R = okTriangle ? sideC / (2 * sin(gamma)) : NaN;

  // Labor I rajz: a köré írt kör befér a 340 × 240-es területbe
  const sc = okTriangle ? 200 / (2 * R) : 1;
  const cx = 170;
  const cy = 120;
  // matematikai koordináták: A = (0,0), B = (c,0), C = (b cos α, b sin α); középpont (c/2, (c/2)·ctg γ)
  const Ox = sideC / 2;
  const Oy = okTriangle ? (sideC / 2) * (Math.cos(toRad(gamma)) / sin(gamma)) : 0;
  const map = (x: number, y: number) => ({ x: cx + (x - Ox) * sc, y: cy - (y - Oy) * sc });
  const LA = map(0, 0);
  const LB = map(sideC, 0);
  const LC = okTriangle ? map(b1 * Math.cos(toRad(alpha)), b1 * sin(alpha)) : LA;

  // Labor II: hajó távolsága
  const [base, setBase] = useState<number>(100);
  const [angA, setAngA] = useState<number>(74);
  const [angB, setAngB] = useState<number>(52);
  const angS = 180 - angA - angB;
  const okShip = angS > 0;
  const sideFromA = okShip ? (base * sin(angB)) / sin(angS) : NaN;
  const sideFromB = okShip ? (base * sin(angA)) / sin(angS) : NaN;
  const distance = sideFromA * sin(angA);

  // Labor II rajz
  const footX = sideFromA * Math.cos(toRad(angA));
  const minX = Math.min(0, footX);
  const maxX = Math.max(base, footX);
  const sk = okShip ? Math.min(280 / (maxX - minX), 160 / Math.max(distance, 1)) : 1;
  const P1 = { x: 30 + (0 - minX) * sk, y: 200 };
  const P2 = { x: P1.x + base * sk, y: 200 };
  const SH = { x: P1.x + footX * sk, y: 200 - distance * sk };

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="a-szinusztetel"
      title="9. A szinusztétel"
      subtitle="Milyen hosszú a pozsonyi Új Híd tartókábele? A háromszög területének kétféle felírásából egy új, általános összefüggés: a szinusztétel."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_szinusztetel_tananyag.pdf"
      practiceTitle="Készen állsz a szinusztétel alkalmazására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZINUSZTÉTEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center">
              <span className="font-mono text-base font-black text-sky-900 dark:text-sky-200">
                a / b = sin α / sin β
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A háromszögben két oldal hosszának aránya egyenlő a <strong>velük szemben lévő</strong> szögek szinuszának arányával.
              </li>
              <li>
                Használjuk, ha ismert <strong>két szög és egy oldal</strong>, és egy másik oldalt keresünk.
              </li>
              <li>
                Használjuk, ha ismert <strong>két oldal és az egyikkel szemközti szög</strong>, és a másikkal szemközti szöget keressük. (Vigyázat: egy szinuszérték hegyesszöghöz és tompaszöghöz is tartozhat!)
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: az Új Híd tartókábele" badge="Tankönyv 26. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Pozsony nevezetessége az <strong>Új Híd (Nový Most)</strong>, a világ egyik legnagyobb egypilléres kábelhídja. A pillér kb. <strong>109°</strong>-os szögben dől hátra. A pillér lábától kb. <strong>200 m</strong>-re van a leghosszabb tartókábel rögzítési helye, a kábel kb. <strong>16°</strong>-os szöget alkot a híddal. Milyen hosszú a kábel?
            </p>
            <p>
              Ismerjük az egyik oldalt (a = 200 m) és a háromszög szögeit (109°, 16° és 180° − 109° − 16° = 55°). A b oldalt keressük. Írjuk fel a területet kétféleképpen:
            </p>
            <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 font-mono text-xs text-sky-900 space-y-1">
              <div>T = 200 · c · sin 109° / 2 &nbsp;és&nbsp; T = b · c · sin 55° / 2</div>
              <div>⇒ b · sin 55° = 200 · sin 109° &nbsp;(2-vel szorozva, c-vel osztva)</div>
              <div className="font-bold">⇒ b = 200 · sin 109° / sin 55° ≈ 231 m</div>
            </div>
            <p>
              <strong>Megjegyzés:</strong> az egyenletet rendezve b / 200 = sin 109° / sin 55°: a háromszög két oldalának aránya egyenlő a velük szemközti szögek szinuszának arányával.
            </p>
          </div>
          <NewBridgeSvg />
        </div>
      </TheorySection>

      {/* 2. Tétel és bizonyítás */}
      <TheorySection title="2. A szinusztétel és bizonyítása" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SineLawProofSvg />
          <div className="space-y-3">
            <TheoryCard title="Szinusztétel" badge="Tétel" badgeColor="sky">
              <p className="text-sm text-slate-700 leading-relaxed">
                A háromszögben két oldal hosszának aránya egyenlő a velük szemben lévő szögek szinuszának arányával: <strong>a / b = sin α / sin β</strong>. Ugyanígy b / c = sin β / sin γ és a / c = sin α / sin γ.
              </p>
            </TheoryCard>
            <TheoryCard title="Bizonyítás" badge="Terület kétféleképpen" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>T = a · c · sin β / 2 és T = b · c · sin α / 2, tehát a · c · sin β / 2 = b · c · sin α / 2.</li>
                <li>Mindkét oldalt 2-vel szorozzuk, majd (b · c · sin β)-val osztjuk: <strong>a / b = sin α / sin β</strong>.</li>
              </ul>
            </TheoryCard>
          </div>
        </div>
        <TheoryCallout type="info" title="Mikor használjuk a szinusztételt?">
          <ul className="list-disc pl-5 space-y-1">
            <li>Ismert egy háromszög <strong>két szöge és egy oldala</strong>, és egy másik oldalt keresünk (a harmadik szög 180°-ra kiegészítéssel adódik).</li>
            <li>Ismert <strong>két oldal és az egyikkel szemközti szög</strong>, és a másik oldallal szemközti szöget keressük. Vigyázat: egy szinuszérték hegyesszöghöz és tompaszöghöz is tartozhat – erről a 10. leckében részletesen lesz szó.</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Feladatok az Új Híddal" badge="1–2. feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BridgeCablesSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>1. feladat – a pillér (c):</strong> c / 200 = sin 16° / sin 55° ⇒ c = 200 · sin 16° / sin 55° ≈ <strong>67,3 m</strong>.
            </p>
            <p>
              <strong>2. feladat – a többi kötél:</strong> a kötelek a pályával (B felé) 41°-os és 24°-os szöget zárnak be.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ABP háromszög: szögei 109°, 41°, 30° ⇒ e = c · sin 109° / sin 41° ≈ <strong>97 m</strong>, BP = c · sin 30° / sin 41° ≈ <strong>51,3 m</strong></li>
              <li>ABQ háromszög: szögei 109°, 24°, 47° ⇒ d = c · sin 109° / sin 24° ≈ <strong>156,4 m</strong>, BQ = c · sin 47° / sin 24° ≈ 121,0 m</li>
              <li>PQ = BQ − BP ≈ <strong>69,7 m</strong>, QC = 200 − BQ ≈ <strong>79,0 m</strong></li>
            </ul>
          </div>
        </div>
        <TheoryTable
          headers={['Szakasz', 'Háromszög', 'Számítás', 'Eredmény']}
          rows={[
            ['b (leghosszabb kötél)', 'ABC', '200 · sin 109° / sin 55°', '≈ 230,9 m'],
            ['c (pillér)', 'ABC', '200 · sin 16° / sin 55°', '≈ 67,3 m'],
            ['e', 'ABP', 'c · sin 109° / sin 41°', '≈ 97,0 m'],
            ['d', 'ABQ', 'c · sin 109° / sin 24°', '≈ 156,4 m'],
            ['BP / PQ / QC', 'ABP, ABQ', 'c · sin 30° / sin 41°; BQ − BP; 200 − BQ', '≈ 51,3 / 69,7 / 79,0 m']
          ]}
        />
        <TheoryCallout type="tip" title="Ellenőrzés">
          A b kötél az ABC háromszögből a c pillérrel is kiszámolható: b = c · sin 109° / sin 16° ≈ 230,9 m – ugyanazt kapjuk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. További kidolgozott feladatok" badge="3–4. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Hajó távolsága a parttól" badge="3. feladat" badgeColor="sky">
            <ShipDistanceSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A hajónál lévő szög: 180° − 74° − 52° = 54°.</li>
              <li>Az α csúcsától a hajóig (β-val szemközti oldal): 100 · sin 52° / sin 54° ≈ 97,4 m.</li>
              <li>A távolság a derékszögű háromszögből: x = 97,4 · sin 74° ≈ <strong>93,6 m</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Két oldal összege adott" badge="4. feladat" badgeColor="emerald">
            <SideSumTriangleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a + b = 20 cm, α = 67°, β = 48°, így γ = 65°.</li>
              <li>a / b = sin 67° / sin 48° ⇒ a = 20 · sin 67° / (sin 67° + sin 48°) ≈ <strong>11,07 cm</strong>, b ≈ <strong>8,93 cm</strong>.</li>
              <li>c = a · sin 65° / sin 67° ≈ <strong>10,90 cm</strong>; T = a · b · sin 65° / 2 ≈ <strong>44,8 cm²</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: szögek aránya a szinuszok helyett" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az oldalak a szögek SZINUSZÁVAL arányosak, nem a szögekkel"
          wrong="a / b = α / β, pl. b / 200 = 109 / 55 ⇒ b ≈ 396 m"
          wrongExplanation="A szögek arányával számolni hibás: az oldalak aránya a szemközti szögek szinuszának arányával egyenlő. Gyakori hiba az is, hogy a szemközti szög helyett a mellette lévő szöget írjuk be."
          correct="b / 200 = sin 109° / sin 55° ⇒ b ≈ 231 m"
          correctExplanation="Mindig az oldalt és a vele SZEMBEN lévő szöget párosítsd: a ↔ α, b ↔ β, c ↔ γ."
          tip="Ha csak két szög adott, először számold ki a harmadikat (180°-ra kiegészítés), mert lehet, hogy éppen arra van szükség."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: A szinusztétel élőben" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">α: {alpha}°</label>
                <input type="range" min="5" max="160" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full accent-rose-600" aria-label="alfa" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">β: {beta}°</label>
                <input type="range" min="5" max="160" value={beta} onChange={(e) => setBeta(Number(e.target.value))} className="w-full accent-blue-600" aria-label="beta" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">c oldal: {fmt(sideC, 1)} cm</label>
                <input type="range" min="2" max="15" step="0.5" value={sideC} onChange={(e) => setSideC(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="c oldal" />
              </div>
              {okTriangle ? (
                <>
                  <div className="text-xs text-slate-600">γ = 180° − α − β = <strong>{gamma}°</strong></div>
                  <TheoryTable
                    headers={['Oldal', 'Szemközti szög', 'oldal / szinusz']}
                    rows={[
                      [`a = ${fmt(a1)} cm`, `α = ${alpha}°`, fmt(a1 / sin(alpha), 3)],
                      [`b = ${fmt(b1)} cm`, `β = ${beta}°`, fmt(b1 / sin(beta), 3)],
                      [`c = ${fmt(sideC)} cm`, `γ = ${gamma}°`, fmt(sideC / sin(gamma), 3)]
                    ]}
                  />
                  <div className="text-xs text-slate-600 font-mono">
                    a / b = {fmt(a1 / b1, 4)} &nbsp;|&nbsp; sin α / sin β = {fmt(sin(alpha) / sin(beta), 4)}
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    Kitekintés: az „oldal / szemközti szög szinusza” hányados mindhárom oldalra ugyanannyi – éppen a háromszög köré írt kör átmérője: 2R = {fmt(2 * R, 3)} cm.
                  </p>
                </>
              ) : (
                <div className="text-rose-700 font-semibold text-sm">α + β = {alpha + beta}° ≥ 180° – ilyen háromszög nincs!</div>
              )}
            </div>
            <svg viewBox="0 0 340 240" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {okTriangle && (
                <>
                  <circle cx={cx} cy={cy} r={R * sc} fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 4" />
                  <polygon points={`${LA.x},${LA.y} ${LB.x},${LB.y} ${LC.x},${LC.y}`} fill="rgba(14,165,233,0.14)" stroke="#0284c7" strokeWidth="2" />
                  <text x={LA.x - 10} y={LA.y + 4} fontSize="11" fontWeight="bold" fill="#b91c1c">A</text>
                  <text x={LB.x + 4} y={LB.y + 4} fontSize="11" fontWeight="bold" fill="#1d4ed8">B</text>
                  <text x={LC.x} y={LC.y - 6} fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">C</text>
                  <text x={(LB.x + LC.x) / 2 + 4} y={(LB.y + LC.y) / 2} fontSize="11" fill="#b91c1c">a</text>
                  <text x={(LA.x + LC.x) / 2 - 10} y={(LA.y + LC.y) / 2} fontSize="11" fill="#1d4ed8">b</text>
                  <text x={(LA.x + LB.x) / 2} y={(LA.y + LB.y) / 2 + 14} fontSize="11" fill="#047857">c</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Távolságmérés a partról" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Kimért szakasz: {base} m</label>
              <input type="range" min="50" max="300" step="10" value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-purple-600" aria-label="alap" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">α (bal végpont): {angA}°</label>
              <input type="range" min="10" max="150" value={angA} onChange={(e) => setAngA(Number(e.target.value))} className="w-full accent-purple-600" aria-label="alfa szög" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">β (jobb végpont): {angB}°</label>
              <input type="range" min="10" max="150" value={angB} onChange={(e) => setAngB(Number(e.target.value))} className="w-full accent-purple-600" aria-label="beta szög" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
              {okShip ? (
                <>
                  <div>1. hajónál lévő szög: 180° − {angA}° − {angB}° = <strong>{angS}°</strong></div>
                  <div>2. bal végpont – hajó: {base} · sin {angB}° / sin {angS}° = <strong>{fmt(sideFromA, 1)} m</strong></div>
                  <div>3. jobb végpont – hajó: {base} · sin {angA}° / sin {angS}° = <strong>{fmt(sideFromB, 1)} m</strong></div>
                  <div>4. távolság a parttól: {fmt(sideFromA, 1)} · sin {angA}° = <strong>{fmt(distance, 1)} m</strong></div>
                </>
              ) : (
                <div className="text-rose-700 font-semibold">α + β ≥ 180° – a két irány nem metszi egymást!</div>
              )}
            </div>
            <svg viewBox="0 0 340 230" className="w-full h-auto bg-sky-50 rounded-xl border border-slate-200">
              <line x1="10" y1="200" x2="330" y2="200" stroke="#a16207" strokeWidth="3" />
              {okShip && (
                <>
                  <polygon points={`${P1.x},${P1.y} ${P2.x},${P2.y} ${SH.x},${SH.y}`} fill="rgba(139,92,246,0.12)" stroke="#7c3aed" strokeWidth="2" />
                  <line x1={SH.x} y1={SH.y} x2={SH.x} y2={200} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
                  <circle cx={SH.x} cy={SH.y} r="5" fill="#334155" />
                  <text x={SH.x + 6} y={(SH.y + 200) / 2} fontSize="11" fontWeight="bold" fill="#b91c1c">x ≈ {fmt(distance, 1)} m</text>
                  <text x={(P1.x + P2.x) / 2} y={218} fontSize="11" fontWeight="bold" fill="#6d28d9" textAnchor="middle">{base} m</text>
                </>
              )}
            </svg>
          </div>
          <TheoryCallout type="success" title="Tankönyvi adatok">
            100 m, α ≈ 74°, β ≈ 52° ⇒ a hajó ≈ 93,6 m-re van a parttól. (A 9. lecke 1. feladatában 120 m, 73° és 52° szerepel – próbáld ki azt is!)
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SineLawTheory;
