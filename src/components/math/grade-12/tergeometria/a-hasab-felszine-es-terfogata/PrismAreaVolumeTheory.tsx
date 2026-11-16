import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, Solid, Vec3 } from '../shared/Solid3DViewer';
import { HammerHeadSvg, PrismNetSvg, OctaBaseAreaSvg, IBeamSvg, DrainSvg, CardDeckSvg } from './PrismAreaVolumeFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

type V3 = [number, number, number];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: V3, k: number): V3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/**
 * Szabályos n-oldalú egyenes hasáb hálójának kiterítése: t = 0 a test, t = 1 a sík háló.
 * Az oldallapok az alapélek körül fordulnak ki, a fedőlap a 0. oldallaphoz kapcsolódik.
 */
const makeUnfoldingPrism = (n: number, a: number, M: number, t: number): Solid => {
  const R = a / (2 * Math.sin(Math.PI / n));
  const base: V3[] = Array.from({ length: n }, (_, i) => {
    const th = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * i) / n;
    return [R * Math.cos(th), 0, R * Math.sin(th)];
  });
  const phi = (t * Math.PI) / 2;
  const vertices: Vec3[] = [...base];
  const edges: [number, number][] = [];
  for (let i = 0; i < n; i++) edges.push([i, (i + 1) % n]);
  let face0Top: { p0: V3; e: V3; n0: V3 } | null = null;
  for (let i = 0; i < n; i++) {
    const b0 = base[i];
    const b1 = base[(i + 1) % n];
    const mid = mul(add(b0, b1), 0.5);
    const len = Math.hypot(mid[0], mid[2]) || 1;
    const nOut: V3 = [mid[0] / len, 0, mid[2] / len];
    const dirUp: V3 = [0, 1, 0];
    const u = add(mul(dirUp, Math.cos(phi)), mul(nOut, Math.sin(phi)));
    const t0 = add(b0, mul(u, M));
    const t1 = add(b1, mul(u, M));
    const k = vertices.length;
    vertices.push(t0 as Vec3, t1 as Vec3);
    edges.push([i, k], [(i + 1) % n, k + 1], [k, k + 1]);
    if (i === 0) face0Top = { p0: t0, e: mul(add(b1, mul(b0, -1)), 1 / a), n0: nOut };
  }
  // fedőlap a 0. oldallaphoz csatolva (összesen 2φ-vel fordul)
  if (face0Top) {
    const { p0, e, n0 } = face0Top;
    const inward: V3 = mul(n0, -1);
    const w = add(mul(inward, Math.cos(2 * phi)), mul([0, 1, 0], Math.sin(2 * phi)));
    const k = vertices.length;
    base.forEach((b) => {
      const rel = add(b, mul(base[0], -1));
      const ca = dot(rel, e);
      const cb = dot(rel, inward);
      vertices.push(add(p0, add(mul(e, ca), mul(w, cb))) as Vec3);
    });
    for (let i = 0; i < n; i++) edges.push([k + i, k + ((i + 1) % n)]);
  }
  return { vertices, edges };
};

/** Négyzet alapú hasáb, amelynek fedőlapja x irányban d-vel el van tolva (Cavalieri-labor). */
const makeShearedBox = (a: number, M: number, d: number): Solid => {
  const v: Vec3[] = [
    [0, 0, 0], [a, 0, 0], [a, 0, a], [0, 0, a],
    [d, M, 0], [a + d, M, 0], [a + d, M, a], [d, M, a]
  ];
  return {
    vertices: v,
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
    faces: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]]
  };
};

export const PrismAreaVolumeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: háló
  const [n, setN] = useState<number>(6);
  const [edge, setEdge] = useState<number>(2);
  const [height, setHeight] = useState<number>(3);
  const [unfold, setUnfold] = useState<number>(0);
  // Labor II: Cavalieri
  const [shift, setShift] = useState<number>(0);
  const [cards, setCards] = useState<number>(6);
  const ca = 3;
  const cM = 4;

  const net = useMemo(() => makeUnfoldingPrism(n, edge, height, unfold), [n, edge, height, unfold]);
  const Tbase = (n * edge * edge) / (4 * Math.tan(Math.PI / n));
  const Kbase = n * edge;
  const area = 2 * Tbase + Kbase * height;
  const vol = Tbase * height;

  const deck = useMemo(() => makeShearedBox(ca, cM, shift), [shift]);
  const cardLines = useMemo(
    () =>
      Array.from({ length: cards - 1 }, (_, i) => {
        const y = ((i + 1) * cM) / cards;
        const dx = (shift * y) / cM;
        return [
          { from: [dx, y, 0] as Vec3, to: [ca + dx, y, 0] as Vec3, color: '#6366f1', width: 1.2 },
          { from: [ca + dx, y, 0] as Vec3, to: [ca + dx, y, ca] as Vec3, color: '#6366f1', width: 1.2 }
        ];
      }).flat(),
    [cards, shift]
  );
  const lateralEdge = Math.hypot(cM, shift);
  const deckArea = 2 * ca * ca + 2 * ca * cM + 2 * ca * lateralEdge;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-hasab-felszine-es-terfogata"
      title="3. A hasáb felszíne és térfogata"
      subtitle="Hány gramm a kalapácsfej? Mennyi víz fér az árokba? A hasáb felszíne a lapok területének összege, térfogata alapterület szorozva magassággal."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="teal"
      pdfFilename="12_osztaly_hasab_felszine_terfogata_tananyag.pdf"
      practiceTitle="Készen állsz a felszín- és térfogatszámításra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HASÁB FELSZÍNE ÉS TÉRFOGATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-teal-900 dark:text-teal-200">A = 2 · T_alaplap + K_alaplap · M (egyenes hasáb)</div>
              <div className="font-mono text-base font-black text-teal-900 dark:text-teal-200">V = T_alaplap · M (egyenes és ferde hasáb)</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A palást kiterítve egy K_alaplap × M méretű téglalap: T_palást = K_alaplap · M.</li>
              <li>Kocka: V = a³, A = 6a²; téglatest: V = abc, A = 2(ab + bc + ca).</li>
              <li>Ferde hasábnál A = 2 · T_alaplap + T_palást, ahol a palást paralelogrammák összege.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: hány gramm a kalapácsfej?" badge="Tankönyv 10. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HammerHeadSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A 7,87 g/cm³ sűrűségű vasból készült kalapácsfej egy M = 3 cm magas egyenes hasáb; a beillesztett nyél a fej 23%-át foglalja el.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Az alaplap egy 8 × 2,5-es téglalapra és egy szimmetrikus trapézra (alapjai 2,5 és 0,5, magassága 5) bontható: T = 8 · 2,5 + (2,5 + 0,5)/2 · 5 = 27,5 cm².</li>
              <li>V_hasáb = T · M = 27,5 · 3 = 82,5 cm³.</li>
              <li>A vas a térfogat 77%-a: 82,5 · 0,77 ≈ 63,53 cm³.</li>
              <li>
                Tömeg: 63,53 · 7,87 ≈ <strong>500 g</strong>, vagyis körülbelül fél kilogramm.
              </li>
            </ol>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="2. A hasáb felszíne és térfogata" badge="Elmélet" badgeColor="indigo">
        <PrismNetSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Felszín" badge="A" badgeColor="indigo">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az egyenes hasáb felszíne a lapok területének összege. Az oldallapok együtt alkotják a <strong>palástot</strong>; síkba terítve egy téglalap, amelynek egyik oldala az alaplap kerülete, a másik a magasság (M). Így <strong>A = 2 · T_alaplap + K_alaplap · M</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Térfogat" badge="V" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az egyenes és a ferde hasáb térfogatát is az alaplap területének és a testmagasságnak a szorzata adja: <strong>V = T_alaplap · M</strong>. Kocka: V = a³; téglatest: V = abc.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Mértékegység', 'Átváltás']}
          rows={[
            ['1 dm³', '1 liter = 1000 cm³'],
            ['1 m³', '1000 liter'],
            ['1 cm³', '1 ml'],
            ['1 m²', '10 000 cm²']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A megvágott bűvös kocka" badge="3. feladat" badgeColor="sky">
            <OctaBaseAreaSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              A 2. lecke nyolcszög alapú hasábja: T = 7, K = 4 + 4√2, M = 3. <strong>V = 21</strong> térfogategység, <strong>A = 26 + 12√2 ≈ 42,97</strong> területegység.
            </p>
          </TheoryCard>
          <TheoryCard title="B) Az I-tartó sűrűsége és felszíne" badge="2. feladat" badgeColor="purple">
            <IBeamSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              A 6 m-es, 96 kg-os gerenda anyagának sűrűsége ≈ <strong>7,84 g/cm³</strong> (acél), felszíne ≈ <strong>30 401 cm²</strong>. (A keresztmetszet: 140 mm magas, 60 mm széles, 10 mm vastag övek, 7 mm vastag gerinc.)
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) A vízelvezető árok" badge="HF 3." badgeColor="emerald">
            <DrainSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              Az árok <strong>37,5 cm</strong> mély; 120 m hosszú szakaszába <strong>112 500 liter</strong> víz fér.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Szabályos háromszög alapú hasáb" badge="4. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A palást területe az alaplap √3-szorosa: 3aM = √3 · (√3/4)a² ⇒ M = a/4.</li>
              <li>Tehát nem a magasság az alapél 4-szerese, hanem fordítva: az alapél a magasság 4-szerese.</li>
              <li>a = 8 cm ⇒ M = 2 cm, T = 16√3 cm², V = 32√3 ≈ <strong>55,43 cm³</strong>.</li>
              <li>3-szoros nagyításnál a felszín 3² = 9-szeres, a térfogat 3³ = 27-szeres lesz.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="További házi feladatok eredményei">
          HF 1.: a lap oldalai 12 cm és 16 cm, a harmadik él 14 cm, V = 2688 cm³; minden élt 2 cm-rel növelve V = 14 · 18 · 16 = 4032 cm³, a térfogat 1,5-szeresére nő. HF 2.: a dobogó felszíne (alaplapok nélkül) 24 525 cm². HF 4.: a 2240 literes hatszög alapú medence alapéle ≈ 1,2 m, a locsolófej hatósugara legfeljebb a beírt kör sugara, ≈ 1,04 m.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: oldalél a magasság helyett" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ferde hasáb térfogata"
          wrong="V = T_alaplap · oldalél"
          wrongExplanation="A ferde hasáb oldaléle hosszabb a magasságnál, így a térfogat túl nagy lenne. A kártyapakli elcsúsztatásakor a lapok és a pakli magassága sem változik – a térfogat sem."
          correct="V = T_alaplap · M, ahol M az alap- és fedőlap síkjának távolsága."
          correctExplanation="Pl. T = 20 cm², oldalél 10 cm, 30°-os hajlás: M = 10 · sin 30° = 5 cm, V = 100 cm³ (nem 200 cm³)."
          tip="A felszínnél se feledkezz meg a 2 alaplapról: A = 2 · T + T_palást, nem T + T_palást!"
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: A háló kiterítése" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Az alaplap oldalszáma: n = {n}</label>
                <input type="range" min="3" max="8" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-teal-600" aria-label="oldalszám" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapél: a = {fmt(edge, 1)} cm</label>
                <input type="range" min="1" max="4" step="0.5" value={edge} onChange={(e) => setEdge(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="alapél" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Magasság: M = {fmt(height, 1)} cm</label>
                <input type="range" min="1" max="6" step="0.5" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="magasság" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kiterítés: {Math.round(unfold * 100)}%</label>
                <input type="range" min="0" max="1" step="0.02" value={unfold} onChange={(e) => setUnfold(Number(e.target.value))} className="w-full accent-amber-600" aria-label="kiterítés" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>T_alaplap = {fmt(Tbase)} cm²</div>
                <div>K_alaplap = {n} · {fmt(edge, 1)} = {fmt(Kbase, 1)} cm</div>
                <div>T_palást = K · M = {fmt(Kbase * height)} cm²</div>
                <div>
                  A = 2 · {fmt(Tbase)} + {fmt(Kbase * height)} = <strong>{fmt(area)} cm²</strong>
                </div>
                <div>
                  V = T · M = <strong>{fmt(vol)} cm³</strong>
                </div>
              </div>
            </div>
            <Solid3DViewer solid={net} initialPitch={0.6} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: Kártyapakli – egyenes és ferde hasáb" badge="Labor" badgeColor="purple">
        <CardDeckSvg />
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-sm text-slate-700">
                Egy 3 × 3-as alapú, 4 egység magas „pakli” lapjait elcsúsztatjuk. Hogyan változik a térfogat és a felszín?
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A fedőlap elcsúsztatása: {fmt(shift, 1)}</label>
                <input type="range" min="0" max="4" step="0.1" value={shift} onChange={(e) => setShift(Number(e.target.value))} className="w-full accent-purple-600" aria-label="elcsúsztatás" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kártyák száma a rajzon: {cards}</label>
                <input type="range" min="2" max="12" value={cards} onChange={(e) => setCards(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="kártyák száma" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">V = 9 · 4</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(ca * ca * cM, 1)}</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">oldalél</div>
                  <div className="font-mono font-black text-amber-900">{fmt(lateralEdge)}</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-2 border border-rose-200">
                  <div className="text-[11px] text-slate-500">felszín</div>
                  <div className="font-mono font-black text-rose-900">{fmt(deckArea)}</div>
                </div>
              </div>
              <TheoryCallout type="info" title="Megfigyelés">
                A térfogat mindig 36, mert sem az alapterület, sem a magasság nem változik. A felszín viszont nő: két oldallap 3 × 4-es paralelogramma marad, a másik kettő 3 × {fmt(lateralEdge)}-es téglalappá nyúlik.
              </TheoryCallout>
            </div>
            <Solid3DViewer solid={deck} extras={cardLines} />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PrismAreaVolumeTheory;
