import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeCylinder, Solid, Vec3 } from '../shared/Solid3DViewer';
import { TwoCansSvg, CylinderNetSvg, CardboardCutSvg, PaintRollerSvg, ConcertHallSvg } from './CylinderAreaVolumeFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

/**
 * Henger palástjának kiterítése: t = 0 a feltekert henger, t = 1 a sík háló.
 * A palást az elülső alkotó mentén marad a helyén, a körlapok az érintő mentén kihajlanak.
 */
const makeUnrollingCylinder = (r: number, M: number, t: number, seg = 40): Solid => {
  const vertices: Vec3[] = [];
  const edges: [number, number][] = [];
  const R = t < 1e-3 ? r : r / Math.max(1e-3, 1 - t);
  const flat = t > 0.999;
  // palást: seg + 1 alkotó
  for (let i = 0; i <= seg; i++) {
    const u = -Math.PI * r + (2 * Math.PI * r * i) / seg; // ívhossz az elülső alkotótól
    let x: number;
    let z: number;
    if (flat) {
      x = u;
      z = r;
    } else {
      const phi = u / R;
      x = R * Math.sin(phi);
      z = R * Math.cos(phi) - R + r;
    }
    vertices.push([x, 0, z], [x, M, z]);
    const k = 2 * i;
    if (i % 5 === 0) edges.push([k, k + 1]);
    if (i > 0) edges.push([k - 2, k], [k - 1, k + 1]);
  }
  // körlapok az elülső érintő körül kihajtva
  const th = (t * Math.PI) / 2;
  const addCircle = (top: boolean) => {
    const base = vertices.length;
    for (let i = 0; i < seg; i++) {
      const a = (2 * Math.PI * i) / seg;
      const x = r * Math.cos(a);
      const zrel = r * Math.sin(a) - r;
      const y = top ? M - zrel * Math.sin(th) : zrel * Math.sin(th);
      const z = r + zrel * Math.cos(th);
      vertices.push([x, y, z]);
    }
    for (let i = 0; i < seg; i++) edges.push([base + i, base + ((i + 1) % seg)]);
  };
  addCircle(false);
  addCircle(true);
  return { vertices, edges, curved: true };
};

export const CylinderAreaVolumeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: palást kiterítése
  const [r, setR] = useState<number>(2.5);
  const [m, setM] = useState<number>(3);
  const [unroll, setUnroll] = useState<number>(0);
  // Labor II: konzervdoboz-optimalizáló
  const [vol, setVol] = useState<number>(1000);
  const [cr, setCr] = useState<number>(6);

  const roll = useMemo(() => makeUnrollingCylinder(r, m, unroll), [r, m, unroll]);
  const A = 2 * r * r * Math.PI + 2 * r * Math.PI * m;
  const V = r * r * Math.PI * m;

  const cm = vol / (Math.PI * cr * cr);
  const cA = 2 * Math.PI * cr * cr + 2 * Math.PI * cr * cm;
  const rOpt = Math.cbrt(vol / (2 * Math.PI));
  const aOpt = 6 * Math.PI * rOpt * rOpt;
  const can = useMemo(() => makeCylinder(cr, Math.min(cm, 60), 48, 10), [cr, cm]);

  // A(r) görbe
  const curve = useMemo(() => {
    const pts: string[] = [];
    const rs: number[] = [];
    for (let x = 2; x <= 14; x += 0.2) rs.push(x);
    const As = rs.map((x) => 2 * Math.PI * x * x + (2 * vol) / x);
    const maxA = Math.max(...As);
    rs.forEach((x, i) => pts.push(`${(20 + ((x - 2) / 12) * 200).toFixed(1)},${(150 - (As[i] / maxA) * 130).toFixed(1)}`));
    return { pts: pts.join(' '), maxA };
  }, [vol]);
  const px = (x: number) => 20 + ((x - 2) / 12) * 200;
  const py = (a: number) => 150 - (a / curve.maxA) * 130;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-henger-felszine-es-terfogata"
      title="5. A henger felszíne és térfogata"
      subtitle="Mennyi alumínium kell egy konzervdobozhoz, és hány gramm májkrém fér bele? A henger felszíne két körlap és a palást, térfogata alapterület szorozva magassággal."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="orange"
      pdfFilename="12_osztaly_henger_felszine_terfogata_tananyag.pdf"
      practiceTitle="Készen állsz a henger felszínére és térfogatára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HENGER FELSZÍNE ÉS TÉRFOGATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-orange-900 dark:text-orange-200">A = 2 · r²π + 2rπ · M</div>
              <div className="font-mono text-base font-black text-orange-900 dark:text-orange-200">V = r²π · M</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ugyanaz, mint a hasábnál: A = 2 · T_alaplap + K_alaplap · M, V = T_alaplap · M.</li>
              <li>A palást kiterítve 2rπ × M-es téglalap.</li>
              <li>Minden méret λ-szorosa: a felszín λ²-szeres, a térfogat λ³-szeres.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: a májkrémkonzervek" badge="Tankönyv 14. o." badgeColor="orange">
        <TwoCansSvg />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="a) Alumínium a kis dobozhoz" badge="felszín" badgeColor="orange">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Két kör: 2 · 2,5²π = 12,5π cm².</li>
              <li>Palást: 5π · 3 = 15π cm² (a kiterített téglalap 5π × 3-as).</li>
              <li>
                Összesen 27,5π ≈ <strong>86,4 cm²</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="b) A nagy doboz felszíne" badge="arány" badgeColor="amber">
            <p className="text-sm text-slate-700">
              2 · 5²π + 10π · 6 = 110π cm². A felszínek aránya 110π : 27,5π = <strong>4 = 2²</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="c) Májkrém a nagy dobozban" badge="térfogat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              V_nagy = 5²π · 6 = 150π, V_kis = 2,5²π · 3 = 18,75π cm³. Arányuk <strong>8 = 2³</strong>, így 8 · 65 = <strong>520 g</strong> fér bele.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Megfigyelés">
          A két doboz hasonló, a hasonlóság aránya 2: a felszínek aránya 2², a térfogatoké 2³. Ezt az összefüggést a 8. leckében általánosan is megfogalmazzuk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. Elmélet: felszín és térfogat" badge="Elmélet" badgeColor="indigo">
        <CylinderNetSvg />
        <TheoryTable
          headers={['Mennyiség', 'Képlet', 'Megjegyzés']}
          rows={[
            ['alapkör területe', 'T = r²π', 'a fedőlapé ugyanennyi'],
            ['palást területe', 'T_p = 2rπ · M', 'kiterítve téglalap'],
            ['felszín', 'A = 2r²π + 2rπM = 2rπ(r + M)', 'egyenlő oldalú hengernél (M = 2r): 6r²π'],
            ['térfogat', 'V = r²π · M', 'egyenlő oldalú hengernél: 2r³π']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Téglalap forgatása" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>2,6 × 4,5 cm-es téglalap a rövidebb oldal körül: r = 4,5, M = 2,6 ⇒ A = 63,9π ≈ 200,75 cm², V = 52,65π ≈ 165,40 cm³.</li>
              <li>A hosszabb oldal körül: r = 2,6, M = 4,5 ⇒ A = 36,92π ≈ 115,99 cm², V = 30,42π ≈ 95,57 cm³.</li>
              <li>HF 3.: ha az egyik oldal a másik 4-szerese, a rövidebb oldal körüli forgatás 16πa³, a hosszabb körüli 4πa³ térfogatot ad – 4-szeres.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Festőhenger" badge="2. feladat" badgeColor="purple">
            <PaintRollerSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              Egy fordulat 80π ≈ 251,3 cm²-t fest be 3 ml festékkel. 40 m²-hez ≈ 1591,5 fordulat, azaz ≈ <strong>4,8 liter</strong> festék kell; a 16 cm átmérőjű vödörben ez ≈ <strong>23,7 cm</strong> magasan áll.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Henger A4-es kartonból" badge="3. feladat" badgeColor="emerald">
            <CardboardCutSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A két kör a karton felső sávjában egymás mellett, a 2rπ × (21 − 2r)-es palást alattuk fér el: 4r ≤ 29,7 és 2rπ ≤ 29,7 kell.</li>
              <li>r = 3 cm: A = 108π ≈ 339,3 cm²; r = 4 cm: A = 136π ≈ 427,3 cm²; r = 5 cm nem lehet (2 · 5 · π ≈ 31,4 &gt; 29,7).</li>
              <li>2rπ = 29,7 ⇒ r ≈ 4,73 cm, M ≈ 11,55 cm, A ≈ 483,3 cm², a hulladék ≈ 22,5%.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) A koncertterem festése" badge="4. feladat" badgeColor="rose">
            <ConcertHallSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              A falak egy része hengerpalást (félkör × 4,5 m). Az alaprajz egy 22 m × 12 m-es téglalap, a 12 m-es oldalára illesztett félkörrel; a festendő felület ≈ <strong>637,4 m²</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Házi feladatok eredményei">
          HF 1.: a 3 m átmérőjű, 1,2 m magasan töltött medencében ≈ 8,48 m³ víz van – ez ≈ 0,47 hónapra (kb. 14 napra) elég, ára ≈ 5259 Ft; a 160 cm magas medence bevont belső felülete ≈ 22,15 m². HF 2.: a magasabb üveg térfogata fele a kisebbikének (½² · 2), így 210 Ft fél egységért drágább, mint 410 Ft egy egységért – az alacsonyabb üveg a jobb vétel. HF 4.: a 37,7 cm kerületű edény sugara 6 cm, 4,5 dl víz ≈ 4 cm-rel emeli a szintet: ≈ 16 cm-en áll.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: az átmérő a sugár helyett" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Átmérővel számolt térfogat"
          wrong="A 16 cm átmérőjű vödör alapterülete 16²π."
          wrongExplanation="A képletekben a sugár szerepel. 16²π = 256π a valódi alapterület 4-szerese, így a vízszint negyedakkorának adódna."
          correct="r = d / 2 = 8 cm ⇒ T = 64π ≈ 201,1 cm²."
          correctExplanation="Mindig írd ki először a sugarat, és ellenőrizd a mértékegységeket (1 dm³ = 1 liter = 1000 cm³)."
          tip="A felszínben 2 alapkör szerepel; nyitott edénynél (medence, vödör, pohár) csak 1!"
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: A palást kiterítése" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">sugár: r = {fmt(r, 1)} cm</label>
                <input type="range" min="1" max="5" step="0.5" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-orange-600" aria-label="sugár" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">magasság: M = {fmt(m, 1)} cm</label>
                <input type="range" min="1" max="10" step="0.5" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="magasság" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">kiterítés: {Math.round(unroll * 100)}%</label>
                <input type="range" min="0" max="1" step="0.02" value={unroll} onChange={(e) => setUnroll(Number(e.target.value))} className="w-full accent-amber-600" aria-label="kiterítés" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>két körlap: 2 · r²π = {fmt(2 * r * r * Math.PI)} cm²</div>
                <div>
                  palást: 2rπ · M = {fmt(2 * r * Math.PI)} · {fmt(m, 1)} = {fmt(2 * r * Math.PI * m)} cm²
                </div>
                <div>
                  A = <strong>{fmt(A)} cm²</strong>
                </div>
                <div>
                  V = r²π · M = <strong>{fmt(V)} cm³</strong>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">Kiindulás: a kisebbik konzervdoboz (r = 2,5 cm, M = 3 cm) – A ≈ 86,39 cm².</p>
            </div>
            <Solid3DViewer solid={roll} initialPitch={0.45} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: Konzervdoboz-optimalizáló" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-sm text-slate-700">Adott térfogatú dobozt kell készíteni a lehető legkevesebb lemezből. Milyen sugarat válasszunk?</p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">térfogat: V = {vol} cm³ ({fmt(vol / 1000, 2)} liter)</label>
                <input type="range" min="250" max="3000" step="50" value={vol} onChange={(e) => setVol(Number(e.target.value))} className="w-full accent-purple-600" aria-label="térfogat" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">sugár: r = {fmt(cr, 1)} cm</label>
                <input type="range" min="2" max="14" step="0.1" value={cr} onChange={(e) => setCr(Number(e.target.value))} className="w-full accent-orange-600" aria-label="doboz sugara" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>M = V / (r²π) = {fmt(cm)} cm</div>
                <div>
                  A = 2r²π + 2rπM = <strong>{fmt(cA, 1)} cm²</strong>
                </div>
                <div className="text-emerald-700">
                  legjobb: r ≈ {fmt(rOpt)} cm, M = 2r ≈ {fmt(2 * rOpt)} cm, A ≈ {fmt(aOpt, 1)} cm²
                </div>
                <div className="text-xs text-slate-500">többletlemez: {fmt(((cA - aOpt) / aOpt) * 100, 1)}%</div>
              </div>
              <svg viewBox="0 0 240 170" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
                <line x1="20" y1="150" x2="225" y2="150" stroke="#94a3b8" />
                <line x1="20" y1="15" x2="20" y2="150" stroke="#94a3b8" />
                <polyline points={curve.pts} fill="none" stroke="#7c3aed" strokeWidth="2" />
                <line x1={px(rOpt)} y1={py(aOpt)} x2={px(rOpt)} y2="150" stroke="#059669" strokeDasharray="4 3" />
                <circle cx={px(cr)} cy={py(cA)} r="4" fill="#ea580c" />
                <text x="225" y="164" fontSize="10" textAnchor="end" fill="#334155">r (cm)</text>
                <text x="24" y="14" fontSize="10" fill="#334155">A(r)</text>
              </svg>
              <TheoryCallout type="success" title="Megfigyelés">
                Adott térfogatnál a felszín akkor a legkisebb, ha a henger egyenlő oldalú: M = 2r, azaz r = ∛(V / (2π)).
              </TheoryCallout>
            </div>
            <Solid3DViewer solid={can} />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CylinderAreaVolumeTheory;
