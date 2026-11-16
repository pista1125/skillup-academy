import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Solid3DViewer, makePyramid, makeBox, Vec3 } from '../shared/Solid3DViewer';
import {
  MilkTetraSvg,
  PyramidNetSvg,
  PrismVsPyramidSvg,
  CubeTetraSvg,
  RoofSvg,
  CubeThreePyramidsSvg
} from './PyramidAreaVolumeFigures';
import { hu } from '../a-gula/SolidSketch';

export const PyramidAreaVolumeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szabályos gúla felszíne és térfogata
  const [n, setN] = useState<number>(4);
  const [edge, setEdge] = useState<number>(8);
  const [height, setHeight] = useState<number>(3);
  const R = edge / (2 * Math.sin(Math.PI / n));
  const rho = edge / (2 * Math.tan(Math.PI / n));
  const Ta = (n * edge * rho) / 2;
  const mo = Math.hypot(height, rho);
  const Tp = (n * edge * mo) / 2;
  const A = Ta + Tp;
  const V = (Ta * height) / 3;
  const solid = useMemo(() => makePyramid(n, R, height), [n, R, height]);
  const extras = useMemo(() => [{ from: [0, height, 0] as Vec3, to: [0, 0, 0] as Vec3, color: '#dc2626', dashed: true, label: 'M' }], [height]);

  // Labor II: a kocka három egybevágó gúlára bontása
  const [cubeA, setCubeA] = useState<number>(6);
  const [part, setPart] = useState<0 | 1 | 2 | 3>(0);
  const cube = useMemo(() => makeBox(cubeA, cubeA, cubeA), [cubeA]);
  const cubePolys = useMemo(() => {
    const v = cube.vertices;
    // közös csúcs: G (index 6); alaplapok: ABCD (alsó), ABFE (első), ADHE (bal)
    const G = v[6];
    const bases: { idx: number[]; fill: string }[] = [
      { idx: [0, 1, 2, 3], fill: 'rgba(37,99,235,0.35)' },
      { idx: [0, 1, 5, 4], fill: 'rgba(16,185,129,0.35)' },
      { idx: [0, 3, 7, 4], fill: 'rgba(245,158,11,0.4)' }
    ];
    const chosen = part === 0 ? bases : [bases[part - 1]];
    const polys: { points: Vec3[]; fill: string }[] = [];
    chosen.forEach((b) => {
      polys.push({ points: b.idx.map((i) => v[i]), fill: b.fill });
      if (part !== 0) {
        for (let i = 0; i < 4; i++) polys.push({ points: [v[b.idx[i]], v[b.idx[(i + 1) % 4]], G], fill: b.fill.replace(/0\.(35|4)\)/, '0.12)') });
      }
    });
    return polys;
  }, [cube, part]);
  const cubeExtras = useMemo(() => {
    const v = cube.vertices;
    return [0, 1, 3, 4].map((i) => ({ from: v[6], to: v[i], color: '#dc2626', dashed: false }));
  }, [cube]);

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-gula-felszine-es-terfogata"
      title="11. A gúla felszíne és térfogata"
      subtitle="Mennyi karton kell egy háromszögletű tejszínes dobozhoz, és mennyi tejszín fér bele? A gúla felszíne és térfogata."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="emerald"
      pdfFilename="12_osztaly_gula_felszine_es_terfogata_tananyag.pdf"
      practiceTitle="Készen állsz a gúla felszínére és térfogatára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A GÚLA FELSZÍNE ÉS TÉRFOGATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                A = T<sub>alaplap</sub> + T<sub>palást</sub> &nbsp;•&nbsp; V = T<sub>alaplap</sub> · M / 3
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A felszín a gúlát határoló lapok területének összege.</li>
              <li>A gúla térfogata a vele azonos alapterületű és magasságú hasáb térfogatának harmada.</li>
              <li>Tetraédernél bármelyik lap lehet alaplap – de a hozzá tartozó magassággal kell számolni!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott bevezető */}
      <TheorySection title="1. Kidolgozott feladat: a tejszínes doboz" badge="Tankönyv 28. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A „háromszögletű” tejszínes doboz tetraéder. Egyik lapja szabályos háromszög, a másik három egy-egy <strong>10 cm befogójú, egyenlő szárú derékszögű háromszög</strong>.
            </p>
            <p>
              <strong>a) Karton (+5% ragasztás):</strong> a derékszögű lapok egyenként 10 · 10 / 2 = 50 cm². Átfogójuk 10√2 ≈ 14,1 cm, ez a szabályos lap oldala: T = (10√2)² · √3 / 4 ≈ 86,6 cm². Összesen ≈ 236,6 cm², a karton ≈ 236,6 · 1,05 ≈ <strong>248 cm²</strong>.
            </p>
            <p>
              <strong>b) Térfogat:</strong> alaplapnak egy derékszögű lapot választva a rá merőleges 10 cm-es él a magasság: V = 50 · 10 / 3 ≈ <strong>166,7 cm³</strong>, tehát kb. 1,7 dl tejszín fér bele.
            </p>
          </div>
          <MilkTetraSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A gúla felszíne és térfogata" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PrismVsPyramidSvg />
          <div className="space-y-3">
            <TheoryCard title="Felszín" badge="A" badgeColor="emerald">
              <p className="text-sm text-slate-700 leading-relaxed">
                A gúla felszíne a határoló lapok területének összege: <strong>A = T<sub>alaplap</sub> + T<sub>palást</sub></strong>. Szabályos n oldalú gúlánál a palást n egybevágó háromszög: T<sub>palást</sub> = n · a · m<sub>o</sub> / 2.
              </p>
            </TheoryCard>
            <TheoryCard title="Térfogat" badge="V" badgeColor="blue">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>V = T<sub>alaplap</sub> · M / 3</strong> – az alapterület és a testmagasság szorzatának harmadrésze. Ugyanez a képlet érvényes ferde gúlára is, ha M a csúcs és az alapsík távolsága.
              </p>
            </TheoryCard>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CubeThreePyramidsSvg />
          <TheoryCallout type="info" title="Miért éppen harmad?">
            A kocka felbontható <strong>három egybevágó gúlára</strong>, amelyek közös csúcsa a kocka egyik csúcsa, alaplapjaik pedig a vele nem szomszédos három lap. Mindegyik gúla alapterülete a², magassága a, és a három együtt a kockát adja: V<sub>gúla</sub> = a³ / 3 = a² · a / 3.
          </TheoryCallout>
        </div>
        <TheoryTable
          headers={['Gúla', 'Alapterület', 'Felszín', 'Térfogat']}
          rows={[
            ['szabályos négyoldalú (a, M, mₒ)', 'a²', 'a² + 2a·mₒ', 'a²·M / 3'],
            ['szabályos tetraéder (a)', 'a²√3 / 4', 'a²√3', 'a³√2 / 12'],
            ['szabályos hatoldalú (a, M, mₒ)', '6·a²√3 / 4', '6·a²√3/4 + 3a·mₒ', 'a²√3·M / 2']
          ]}
        />
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Tetraéder a kockában" badge="2. feladat" badgeColor="rose">
            <CubeTetraSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az A–B–C–D töröttvonal három egymásra merőleges kockaél, ezért <strong>mind a 4 lap derékszögű háromszög</strong>.</li>
              <li>Élek: 10, 10, 10, 10√2, 10√2 és 10√3 cm.</li>
              <li>Felszín: 2 · 50 + 2 · (10 · 10√2 / 2) = 100 + 100√2 ≈ <strong>241,4 cm²</strong>.</li>
              <li>Térfogat: alaplap ABC (50 cm²), magasság CD = 10 cm ⇒ V = 50 · 10 / 3 ≈ <strong>166,7 cm³</strong> (a kocka hatoda).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A tetőtér" badge="3. feladat" badgeColor="sky">
            <RoofSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Trapéz alakú lapok: tg α = 3,2 / 3,5 ⇒ <strong>α ≈ 42,4°</strong>; háromszög alakú lapok: tg β = 3,2 / 2 ⇒ <strong>β ≈ 58,0°</strong>.</li>
              <li>A két trapéz síkjának szöge: 180° − 2 · 42,4° ≈ <strong>95,1°</strong>.</li>
              <li>Térfogat: középen háromszög alapú hasáb (7 · 3,2 / 2 · 6 = 67,2 m³), a két végén 2 · 7 m-es téglalap alapú gúla (2 · 14 · 3,2 / 3 ≈ 29,9 m³) ⇒ <strong>V ≈ 97,1 m³</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Gúla a hálójából" badge="HF 1." badgeColor="emerald">
            <PyramidNetSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Szabályos négyoldalú gúla, minden éle 30 cm (nem tetraéder: 5 lap, 8 él, 5 csúcs). A = 900 + 900√3 ≈ <strong>2458,8 cm²</strong>; M = 30/√2 ≈ 21,2 cm; V = 900 · 21,2 / 3 ≈ <strong>6364 cm³</strong>. Két ilyen gúlát összeragasztva szabályos <strong>oktaédert</strong> kapunk (8 lap, 12 él, 6 csúcs): A ≈ 3117,7 cm², V ≈ 12 728 cm³.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Szabályos hatoldalú gúla" badge="HF 2." badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              a = 12 cm, b = 13 cm. M = √(13² − 12²) = <strong>5 cm</strong>; T<sub>alap</sub> = 6 · 144√3 / 4 ≈ 374,1 cm²; V = 374,1 · 5 / 3 ≈ <strong>623,5 cm³</strong>. Oldalél–alaplap: tg α = 5/12 ⇒ α ≈ 22,6°; oldallap–alaplap: tg β = 5 / (6√3) ⇒ β ≈ 25,7°. m<sub>o</sub> = √(169 − 36) ≈ 11,53 cm ⇒ A ≈ 374,1 + 6 · 12 · 11,53 / 2 ≈ <strong>789,3 cm²</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="E) Három 15 cm magas gúla" badge="1. feladat" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Alaplapok: rombusz (átlók 18 és 15 cm), szabályos ötszög (a = 9 cm), szabályos háromszög (a = 17 cm); M = 15 cm. Mindhárom alaplapnak van beírt köre, a magasság talppontja ennek középpontja, így minden oldallap magassága m<sub>o</sub> = √(M² + ρ²).
            </p>
            <TheoryTable
              headers={['Alaplap', 'T_alap', 'ρ', 'mₒ', 'Felszín', 'Térfogat']}
              rows={[
                ['rombusz (oldal ≈ 11,72)', '135 cm²', '≈ 5,76', '≈ 16,07', '≈ 511,5 cm²', '675 cm³'],
                ['szabályos ötszög', '≈ 139,4 cm²', '≈ 6,19', '≈ 16,23', '≈ 504,5 cm²', '≈ 696,8 cm³'],
                ['szabályos háromszög', '≈ 125,1 cm²', '≈ 4,91', '≈ 15,78', '≈ 527,6 cm²', '≈ 625,7 cm³']
              ]}
            />
            <p className="text-sm text-slate-700 leading-relaxed mt-2">
              a) Térfogat: a legnagyobb az <strong>ötszög</strong> alapú, a legkisebb a <strong>háromszög</strong> alapú gúla. b) Felszín: a legnagyobb a <strong>háromszög</strong> alapú, a legkisebb az <strong>ötszög</strong> alapú gúla.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: melyik magasság?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az oldallap magassága a testmagasság helyett"
          wrong="V = T_alaplap · mₒ / 3 (az oldallap magasságával)"
          wrongExplanation="Az mₒ az oldallap háromszögének magassága, a felszínhez kell. A térfogatba a testmagasság (M) kerül, amely mindig kisebb mₒ-nál."
          correct="V = T_alaplap · M / 3, de T_palást = n · a · mₒ / 2"
          correctExplanation="Felszínhez a lapok területei (mₒ), térfogathoz a csúcs és az alapsík távolsága (M) kell. Gyakran Pitagorasz-tétellel kell átszámolni: M² + (a/2)² = mₒ²."
          tip="Ne felejtsd el a harmadolást sem: a gúla térfogata a hasábénak csak harmada!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Szabályos gúla felszíne és térfogata" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Oldalak száma (n): {n}</label>
                <input type="range" min="3" max="8" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="oldalak száma" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapél (a): {hu(edge, 1)} cm</label>
                <input type="range" min="2" max="12" step="0.5" value={edge} onChange={(e) => setEdge(Number(e.target.value))} className="w-full accent-blue-600" aria-label="alapél" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Testmagasság (M): {hu(height, 1)} cm</label>
                <input type="range" min="1" max="15" step="0.5" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-rose-600" aria-label="magasság" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>T<sub>alaplap</sub> = n·a·ρ/2 = <strong>{hu(Ta)} cm²</strong></div>
                <div>mₒ = √(M² + ρ²) = {hu(mo)} cm</div>
                <div>T<sub>palást</sub> = n·a·mₒ/2 = <strong>{hu(Tp)} cm²</strong></div>
                <div>A = <strong>{hu(A)} cm²</strong></div>
                <div>V = T·M/3 = <strong>{hu(V)} cm³</strong></div>
                <div className="text-xs text-slate-500">azonos alapú és magasságú hasáb: {hu(Ta * height)} cm³ = 3 · V</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Solid3DViewer solid={solid} extras={extras} width={320} height={280} />
              <p className="text-xs text-slate-500 italic mt-2 text-center">Tankönyvi próba: n = 4, a = 8, M = 3 ⇒ mₒ = 5, A = 144 cm², V = 64 cm³.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: A kocka három gúlára bontása" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kockaél (a): {cubeA} cm</label>
                <input type="range" min="2" max="12" value={cubeA} onChange={(e) => setCubeA(Number(e.target.value))} className="w-full accent-blue-600" aria-label="kockaél" />
              </div>
              <div className="flex flex-wrap gap-2">
                {([
                  [0, 'mind a 3 alaplap'],
                  [1, '1. gúla (ABCD alap)'],
                  [2, '2. gúla (ABFE alap)'],
                  [3, '3. gúla (ADHE alap)']
                ] as const).map(([k, t]) => (
                  <button
                    key={k}
                    onClick={() => setPart(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${part === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>V<sub>kocka</sub> = a³ = <strong>{cubeA ** 3} cm³</strong></div>
                <div>egy gúla: T = a² = {cubeA ** 2} cm², M = a = {cubeA} cm</div>
                <div>V<sub>gúla</sub> = a² · a / 3 = <strong>{hu(cubeA ** 3 / 3)} cm³</strong></div>
                <div className="text-xs text-slate-500">3 · V<sub>gúla</sub> = {cubeA ** 3} cm³ = V<sub>kocka</sub> ✓</div>
              </div>
              <TheoryCallout type="tip" title="Megfigyelés">
                Mindhárom gúla csúcsa G, és mindhárom egybevágó (forgatással egymásba vihetők). A kocka „sarkából” levágott, három egymásra merőleges élű tetraéder térfogata ennek is a fele: a³ / 6.
              </TheoryCallout>
            </div>
            <div className="flex flex-col items-center">
              <Solid3DViewer solid={cube} polygons={cubePolys} extras={cubeExtras} width={320} height={280} />
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PyramidAreaVolumeTheory;
