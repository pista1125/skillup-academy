import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, Solid, Vec3 } from '../shared/Solid3DViewer';
import { RubikOctaPrismSvg, PrismAnatomySvg, PrismTypesSvg, HexPrismDiagonalsSvg, TriPrismBillboardSvg } from './PrismFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

/** Tetszőleges (konvex) sokszög alapú hasáb a nézőhöz: alaplap az xz-síkban, a fedőlap (sx, sz)-vel eltolva. */
const makeAnyPrism = (base: [number, number][], m: number, shift: [number, number] = [0, 0]): Solid => {
  const n = base.length;
  const cx = base.reduce((s, p) => s + p[0], 0) / n;
  const cz = base.reduce((s, p) => s + p[1], 0) / n;
  const vertices: Vec3[] = [
    ...base.map(([x, z]) => [x - cx, 0, z - cz] as Vec3),
    ...base.map(([x, z]) => [x - cx + shift[0], m, z - cz + shift[1]] as Vec3)
  ];
  const edges: [number, number][] = [];
  const faces: number[][] = [Array.from({ length: n }, (_, i) => i), Array.from({ length: n }, (_, i) => n + i)];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    edges.push([i, j], [n + i, n + j], [i, n + i]);
    faces.push([i, j, n + j, n + i]);
  }
  return { vertices, edges, faces };
};

const regular = (n: number, r: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const t = Math.PI / 2 + (2 * Math.PI * i) / n;
    return [r * Math.cos(t), r * Math.sin(t)] as [number, number];
  });

type BaseKey = 'haromszog' | 'szabharomszog' | 'negyzet' | 'teglalap' | 'rombusz' | 'paralelogramma' | 'trapez' | 'szabhatszog';
const BASES: Record<BaseKey, { name: string; adj: string; pts: [number, number][]; para?: boolean }> = {
  haromszog: { name: 'háromszög', adj: 'háromszög', pts: [[0, 0], [3, 0], [1, 2]] },
  szabharomszog: { name: 'szabályos háromszög', adj: 'szabályos háromszög', pts: regular(3, 1.5) },
  negyzet: { name: 'négyzet', adj: 'négyzet', pts: [[0, 0], [2, 0], [2, 2], [0, 2]], para: true },
  teglalap: { name: 'téglalap', adj: 'téglalap', pts: [[0, 0], [3, 0], [3, 1.8], [0, 1.8]], para: true },
  rombusz: { name: 'rombusz', adj: 'rombusz', pts: [[0, 0], [2, 0], [3, 1.732], [1, 1.732]], para: true },
  paralelogramma: { name: 'paralelogramma', adj: 'paralelogramma', pts: [[0, 0], [3, 0], [3.8, 1.6], [0.8, 1.6]], para: true },
  trapez: { name: 'trapéz', adj: 'trapéz', pts: [[0, 0], [3.2, 0], [2.4, 1.6], [0.8, 1.6]] },
  szabhatszog: { name: 'szabályos hatszög', adj: 'szabályos hatszög', pts: regular(6, 1.4) }
};

export const PrismTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: n-oldalú hasáb
  const [n, setN] = useState<number>(6);
  const [m, setM] = useState<number>(3);
  const [tilt, setTilt] = useState<number>(0);
  // Labor II: hasábtípus-felismerő
  const [baseKey, setBaseKey] = useState<BaseKey>('negyzet');
  const [right, setRight] = useState<boolean>(true);
  const [cubeHeight, setCubeHeight] = useState<boolean>(false);

  const prismN = useMemo(() => makeAnyPrism(regular(n, 1.6), m, [tilt, 0]), [n, m, tilt]);
  const lateral = Math.hypot(m, tilt);

  const base = BASES[baseKey];
  const h2 = cubeHeight && baseKey === 'negyzet' ? 2 : 3.2;
  const prismT = useMemo(() => makeAnyPrism(base.pts, h2, right ? [0, 0] : [1.2, 0.3]), [base, h2, right]);
  let typeName = `${base.adj} alapú ${right ? 'egyenes' : 'ferde'} hasáb`;
  if (right && baseKey === 'negyzet') typeName = cubeHeight ? 'kocka (minden éle egyenlő)' : 'négyzetes oszlop (négyzet alapú egyenes hasáb)';
  if (right && baseKey === 'teglalap') typeName = 'téglatest (téglalap alapú egyenes hasáb)';

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-hasab"
      title="2. A hasáb"
      subtitle="Egy megvágott bűvös kockától a hirdetőoszlopig: a hasáb fogalma, részei, fajtái, lapátlói és testátlói."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="12_osztaly_a_hasab_tananyag.pdf"
      practiceTitle="Készen állsz a hasábos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HASÁB',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                alaplap ≅ fedőlap (párhuzamos eltolás) · oldallapok: paralelogrammák
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Egyenes hasáb:</strong> az oldallapok téglalapok, az oldalél = a testmagasság (M). Különben <strong>ferde hasáb</strong> (M &lt; oldalél).
              </li>
              <li>A hasáb bármely két oldaléle egyenlő hosszú és párhuzamos.</li>
              <li>
                n-oldalú hasáb: <strong>2n csúcs, 3n él, n + 2 lap</strong>, n(n − 3) testátló.
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a megvágott bűvös kocka" badge="Tankönyv 8. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy 3 egység élű bűvös kocka négy függőleges élénél a fedőlap sarokkockáit egy-egy átlójuk mentén függőlegesen elvágták – 4 háromszög alapú hasábot vágtak le.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                A megmaradt testnek <strong>16 csúcsa, 24 éle</strong> (16 „vízszintes”, 8 „függőleges”) és <strong>10 lapja</strong> van.
              </li>
              <li>Az alaplap nyolcszög: 4 oldala 1 egység, 4 oldala √2 egység (egy kis négyzet átlója).</li>
              <li>A fedőlap egybevágó az alaplappal, síkjaik párhuzamosak; a 8 oldallap merőleges rájuk, 4-4 egybevágó.</li>
              <li>
                A test egy <strong>nyolcszög alapú egyenes hasáb</strong>, magassága 3 egység.
              </li>
            </ul>
          </div>
          <RubikOctaPrismSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. A hasáb fogalma és részei" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PrismAnatomySvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A hasáb olyan poliéder, amelyet a következő lapok határolnak:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>alaplap:</strong> tetszőleges sokszög;</li>
              <li>
                <strong>fedőlap:</strong> az alaplappal egybevágó sokszög, amelyet az alaplapból <strong>párhuzamos eltolással</strong> kapunk (az eltolás iránya nem párhuzamos az alaplap síkjával);
              </li>
              <li>
                <strong>oldallapok:</strong> paralelogrammák, egy-egy párhuzamos oldalpárjukat az alap- és a fedőlap megfelelő élei alkotják.
              </li>
            </ul>
            <p>
              Az alaplap oldalai az <strong>alapélek</strong>, a fedőlapéi a <strong>fedőélek</strong>, a többi él <strong>oldalél</strong>. A hasáb bármely két oldaléle egyenlő hosszú és párhuzamos.
            </p>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="3. A hasábok fajtái" badge="Elmélet" badgeColor="teal">
        <PrismTypesSvg />
        <TheoryTable
          headers={['Név', 'Meghatározás', 'Megjegyzés']}
          rows={[
            ['egyenes hasáb', 'az oldallapok téglalapok', 'az oldalélek merőlegesek az alap- és fedőlap síkjára; M = oldalél'],
            ['ferde hasáb', 'nem egyenes hasáb', 'az oldallapok (nem mind) téglalapok; M < oldalél'],
            ['négyzetes oszlop', 'négyzet alapú egyenes hasáb', 'más néven négyzetes hasáb'],
            ['téglatest', 'téglalap alapú egyenes hasáb', 'minden lapja téglalap'],
            ['kocka', 'egyenlő élű téglatest', 'minden lapja négyzet']
          ]}
        />
        <TheoryCallout type="info" title="Elnevezés">
          A hasábokat az alaplap alakja és az oldalélek alaplapra való merőlegessége alapján nevezzük el: pl. szabályos hatszög alapú egyenes hasáb, rombusz alapú ferde hasáb. (A paralelogramma alapú hasáb neve paralelepipedon.)
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladatok: átlók a hasábban" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A nyolcszög alapú hasáb átlói" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A fedőlap egy csúcsából (A′) 8 − 3 = <strong>5 lapátló</strong> indul: két √5, egy 2√2, egy √10 és egy 3 egység hosszú (a 3 × 3-as rácson Pitagorasz-tétellel).</li>
              <li>
                A′-ből <strong>5 testátló</strong> indul; hosszuk √(d² + 3²): √14 (kettő), √17, √19 és √18 = 3√2 egység.
              </li>
              <li>HF: az alaplapnak 8 · 5 / 2 = 20 átlója van, 4-féle hosszúságú; a testnek 8 · 5 = 40 testátlója van.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Merevítő rudak a hatszög alapú hasábban" badge="2. feladat" badgeColor="purple">
            <HexPrismDiagonalsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Alapél a = 4 m, magasság M = 5 m. A hatszög átlói: 4√3 ≈ 6,93 m és 8 m.</li>
              <li>
                Testátlók: √((4√3)² + 5²) = √73 ≈ <strong>8,54 m</strong> és √(8² + 5²) = √89 ≈ <strong>9,43 m</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Szabályos háromszög alapú hirdetőoszlop" badge="3. feladat" badgeColor="emerald">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <TriPrismBillboardSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Alapél 90 cm, oldalél 300 cm. Oldallapján fekve a magassága a háromszög magassága: 90 · √3 / 2 ≈ <strong>77,9 cm</strong>.</li>
              <li>Két oszlopot oldallapjuk mentén összeillesztve 60°-os rombusz alapú egyenes hasábot kapunk.</li>
              <li>
                A rombusz hosszabb átlója 90√3 ≈ 155,9 cm, így a legtávolabbi csúcsok távolsága √(155,9² + 300²) ≈ <strong>338,1 cm</strong>.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCallout type="tip" title="Hány átló van? (n-oldalú hasáb)">
          Alaplap- és fedőlap-átlók: 2 · n(n − 3)/2 = n(n − 3); oldallapokon 2n lapátló; összesen n(n − 1) lapátló – ez mindig páros. Testátló: minden alapcsúcsból n − 3 indul, összesen n(n − 3). A háromszög alapú hasábnak nincs testátlója; a hétszög alapúnak 7 · 4 = 28 van.
        </TheoryCallout>
        <TheoryCallout type="info" title="HF 3. A svájci csokoládé doboza">
          Az egyenes hasáb alaplapja egy 3 cm × 8 cm-es téglalap, a két 3 cm-es oldalára illesztett egyenlő szárú, 120°-os szárszögű háromszöggel (hatszög); a doboz 15 cm magas. A háromszögek magassága 1,5 / tg 60° = √3/2 ≈ 0,87 cm, így az alaplap leghosszabb átlója a két 120°-os csúcs távolsága: 8 + √3 ≈ 9,73 cm. A leghosszabb kötőtű a leghosszabb testátló: √(9,73² + 15²) ≈ <strong>17,9 cm</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: oldalél vagy magasság?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A ferde hasáb oldaléle nem a magasság"
          wrong="Ferde hasábnál is M = oldalél."
          wrongExplanation="Az oldalél ferdén hajlik az alaplaphoz, a magasság viszont az alap- és fedőlap síkjának távolsága (merőleges szakasz). Pl. 10 cm-es, 60°-ban hajló oldalélnél M = 10 · sin 60° ≈ 8,66 cm."
          correct="M = az alaplap és a fedőlap síkjának távolsága; M ≤ oldalél, egyenlőség csak egyenes hasábnál."
          correctExplanation="Az oldalél, a magasság és az oldalél vetülete derékszögű háromszöget alkot, amelyben az oldalél az átfogó."
          tip="Testátlót is csak egyenes hasábnál számolhatsz √(d² + M²)-tel, ahol d az alaplap megfelelő átlója."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: n-oldalú hasáb – csúcsok, élek, átlók" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Az alaplap oldalszáma: n = {n}</label>
                <input type="range" min="3" max="12" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-blue-600" aria-label="oldalszám" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Testmagasság: M = {fmt(m, 1)}</label>
                <input type="range" min="1" max="5" step="0.5" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="magasság" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A fedőlap eltolása oldalra (ferdeség): {fmt(tilt, 1)}</label>
                <input type="range" min="0" max="2" step="0.1" value={tilt} onChange={(e) => setTilt(Number(e.target.value))} className="w-full accent-amber-600" aria-label="ferdeség" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { t: 'csúcs (2n)', v: 2 * n },
                  { t: 'él (3n)', v: 3 * n },
                  { t: 'lap (n + 2)', v: n + 2 },
                  { t: 'lapátló n(n − 1)', v: n * (n - 1) },
                  { t: 'testátló n(n − 3)', v: n * (n - 3) },
                  { t: 'Euler: c − é + l', v: 2 * n - 3 * n + n + 2 }
                ].map((b) => (
                  <div key={b.t} className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                    <div className="text-[11px] text-slate-500">{b.t}</div>
                    <div className="font-mono font-black text-blue-900">{b.v}</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
                {tilt === 0 ? (
                  <span>
                    <strong>Szabályos {n}-szög alapú egyenes hasáb:</strong> oldalél = M = {fmt(m, 1)}.
                  </span>
                ) : (
                  <span>
                    <strong>Szabályos {n}-szög alapú ferde hasáb:</strong> oldalél = √(M² + eltolás²) = {fmt(lateral)} &gt; M = {fmt(m, 1)}.
                  </span>
                )}
              </div>
            </div>
            <Solid3DViewer solid={prismN} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Hasábtípus-felismerő" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-slate-600 mb-1">Az alaplap alakja</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(BASES) as BaseKey[]).map((k) => (
                    <button
                      key={k}
                      onClick={() => setBaseKey(k)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${baseKey === k ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {BASES[k].name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setRight(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${right ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  oldalélek merőlegesek
                </button>
                <button
                  onClick={() => setRight(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!right ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  oldalélek ferdék
                </button>
                {baseKey === 'negyzet' && (
                  <button
                    onClick={() => setCubeHeight((v) => !v)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${cubeHeight ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    M = alapél {cubeHeight ? '✓' : ''}
                  </button>
                )}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 text-sm text-purple-900">
                <div className="text-xs text-purple-700 mb-1">A test neve:</div>
                <div className="font-black text-base">{typeName}</div>
                <div className="text-xs text-slate-600 mt-2">
                  Oldallapok: {right ? 'téglalapok' : 'paralelogrammák (nem mind téglalap)'}
                  {base.para ? ' · az alaplap paralelogramma, így a test paralelepipedon is' : ''}
                </div>
              </div>
            </div>
            <Solid3DViewer solid={prismT} />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PrismTheory;
