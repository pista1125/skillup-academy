import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Solid3DViewer, makePyramid, Vec3 } from '../shared/Solid3DViewer';
import {
  PyramidPartsSvg,
  PyramidTypesSvg,
  CheopsSvg,
  PyramidRightTrianglesSvg,
  HexPyramidSvg,
  TetraDihedralSvg
} from './PyramidFigures';
import { RightMark, AngleArc, hu } from './SolidSketch';

const deg = (x: number) => (x * 180) / Math.PI;

export const PyramidTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: forgatható szabályos gúla
  const [n, setN] = useState<number>(4);
  const [edge, setEdge] = useState<number>(6);
  const [height, setHeight] = useState<number>(5);
  const [show, setShow] = useState<'M' | 'mo' | 'b'>('mo');

  const R = edge / (2 * Math.sin(Math.PI / n));
  const rho = edge / (2 * Math.tan(Math.PI / n));
  const mo = Math.hypot(height, rho);
  const lateral = Math.hypot(height, R);
  const alpha = deg(Math.atan(height / R));
  const beta = deg(Math.atan(height / rho));

  const solid = useMemo(() => makePyramid(n, R, height), [n, R, height]);
  const extras = useMemo(() => {
    const apex: Vec3 = [0, height, 0];
    const v0 = solid.vertices[0];
    const v1 = solid.vertices[1];
    const midE: Vec3 = [(v0[0] + v1[0]) / 2, 0, (v0[2] + v1[2]) / 2];
    const list = [{ from: apex, to: [0, 0, 0] as Vec3, color: '#dc2626', label: 'M', dashed: true }];
    if (show === 'mo') {
      list.push({ from: apex, to: midE, color: '#2563eb', label: 'mₒ', dashed: false });
      list.push({ from: [0, 0, 0] as Vec3, to: midE, color: '#64748b', label: 'ρ', dashed: true });
    }
    if (show === 'b') {
      list.push({ from: apex, to: v0, color: '#059669', label: 'b', dashed: false });
      list.push({ from: [0, 0, 0] as Vec3, to: v0, color: '#64748b', label: 'R', dashed: true });
    }
    return list;
  }, [solid, height, show]);

  // Labor II: szabályos négyoldalú gúla metszete (Kheopsz-kalkulátor)
  const [qa, setQa] = useState<number>(232.4);
  const [qM, setQM] = useState<number>(146.7);
  const qmo = Math.hypot(qM, qa / 2);
  const qRatio = qmo / (qa / 2);
  const qFace = (qa * qmo) / 2;
  const qb = Math.hypot(qM, (qa * Math.SQRT2) / 2);
  const qAlpha = deg(Math.atan(qM / ((qa * Math.SQRT2) / 2)));
  const qBeta = deg(Math.atan(qM / (qa / 2)));
  // rajz: F talppont, G alapél-felezőpont, E csúcs
  const sc = Math.min(200 / (qa / 2), 150 / qM);
  const F: [number, number] = [60, 190];
  const G: [number, number] = [60 + (qa / 2) * sc, 190];
  const E: [number, number] = [60, 190 - qM * sc];

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-gula"
      title="10. A gúla"
      subtitle="Alaplap, oldallapok, oldalélek és testmagasság – a szabályos gúla és a tetraéder, a Kheopsz-piramis adataival."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="amber"
      pdfFilename="12_osztaly_a_gula_tananyag.pdf"
      practiceTitle="Készen állsz a gúlás feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZABÁLYOS GÚLA DERÉKSZÖGŰ HÁROMSZÖGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">
                M² + ρ² = m<sub>o</sub>² &nbsp;•&nbsp; M² + R² = b² &nbsp;•&nbsp; m<sub>o</sub>² + (a/2)² = b²
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>n oldalú gúla:</strong> n + 1 lap (1 alaplap + n háromszög), 2n él, n + 1 csúcs.
              </li>
              <li>
                Szabályos gúlában a magasság talppontja az alaplap középpontja; R a köré írt, ρ a beírt kör sugara, m<sub>o</sub> az oldallap magassága.
              </li>
              <li>
                Oldalél–alaplap szöge: tg α = M / R; oldallap–alaplap szöge: tg β = M / ρ (β &gt; α).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a gízai piramisok" badge="Tankönyv 26. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Kairó közelében találhatók a több mint 4000 éves gízai piramisok. <strong>Kheopsz fáraó piramisa</strong> az ókori világ hét csodája közül az egyetlen, amely ma is látható.
            </p>
            <p>
              Alakja <strong>szabályos négyoldalú gúla</strong>: alaplapja négyzet, négy oldallapja egybevágó egyenlő szárú háromszög. Eredeti méretei: alapél <strong>232,4 m</strong>, magasság <strong>146,7 m</strong>.
            </p>
            <p>A megtervezéséhez komoly matematikai tudás kellett – a lecke végére mi is ki tudjuk számolni a piramis jellemző adatait.</p>
          </div>
          <CheopsSvg />
        </div>
      </TheorySection>

      {/* 2. Fogalmak */}
      <TheorySection title="2. A gúla fogalma és részei" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PyramidPartsSvg />
          <div className="space-y-3">
            <TheoryCard title="Definíció" badge="Gúla" badgeColor="amber">
              <p className="text-sm text-slate-700 leading-relaxed">
                A gúla olyan síklapokkal határolt test (poliéder), amelyet <strong>egy sokszög</strong> és <strong>annyi háromszög</strong> határol, ahány oldalú a sokszög. A háromszögek közös csúcsa a <strong>gúla csúcsa</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="Testmagasság" badge="M" badgeColor="rose">
              <p className="text-sm text-slate-700 leading-relaxed">
                A gúla csúcsának az alapsíktól való távolsága a gúla <strong>testmagassága</strong> (röviden magassága, M). Az ábrán ötoldalú gúla látható: 6 lapja van (1 ötszög + 5 háromszög).
              </p>
            </TheoryCard>
          </div>
        </div>
        <TheoryTable
          headers={['Gúla', 'Lapok', 'Élek', 'Csúcsok']}
          rows={[
            ['háromoldalú (tetraéder)', '4', '6', '4'],
            ['négyoldalú', '5', '8', '5'],
            ['ötoldalú', '6', '10', '6'],
            ['hatoldalú', '7', '12', '7'],
            ['n oldalú', 'n + 1', '2n', 'n + 1']
          ]}
        />
        <TheoryCallout type="info" title="Van-e testátlója a gúlának?">
          Nincs: a gúla csúcsa minden alapcsúccsal éllel van összekötve, az alapcsúcsokat összekötő szakaszok pedig az alaplapon fekszenek (alapél vagy lapátló). Ezért a gúlának nincs testátlója.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szabályos gúla, tetraéder */}
      <TheorySection title="3. Szabályos gúla és tetraéder" badge="Elmélet" badgeColor="emerald">
        <PyramidTypesSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Szabályos gúla" badge="Definíció" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha a gúla alaplapja <strong>szabályos sokszög</strong>, és <strong>minden oldaléle egyenlő hosszú</strong>, akkor szabályos gúla. Oldallapjai egybevágó egyenlő szárú háromszögek.
            </p>
          </TheoryCard>
          <TheoryCard title="Egyenlő oldalélek" badge="Tétel" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy gúla minden oldaléle egyenlő, akkor az alaplap <strong>húrsokszög</strong> (körbe írható), és a kör középpontja a csúcs merőleges vetülete az alapsíkon.
            </p>
          </TheoryCard>
          <TheoryCard title="Tetraéder" badge="4 lap" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              A háromoldalú gúla neve <strong>tetraéder</strong>; bármelyik lapja tekinthető alaplapnak. A <strong>szabályos tetraéder</strong> mind a 4 lapja szabályos háromszög.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Derékszögű háromszögek */}
      <TheorySection title="4. Számolás a szabályos gúlában: derékszögű háromszögek" badge="Módszer" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PyramidRightTrianglesSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A szabályos gúla adatai (a alapél, b oldalél, M magasság, m<sub>o</sub> oldallap-magasság) között három derékszögű háromszög teremt kapcsolatot:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>M, ρ, m<sub>o</sub></strong>: a magasság, a beírt kör sugara (négyzetnél a/2) és az oldallap magassága ⇒ ebben van a <strong>β oldallap–alaplap szög</strong>.
              </li>
              <li>
                <strong>M, R, b</strong>: a magasság, a köré írt kör sugara (négyzetnél a√2/2) és az oldalél ⇒ ebben van az <strong>α oldalél–alaplap szög</strong>.
              </li>
              <li>
                <strong>m<sub>o</sub>, a/2, b</strong>: az oldallap fele.
              </li>
            </ul>
            <TheoryCallout type="tip" title="Nevezetes sugarak">
              Négyzet: ρ = a/2, R = a√2/2. Szabályos háromszög: ρ = a√3/6, R = a√3/3. Szabályos hatszög: ρ = a√3/2, R = a.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 5. Kidolgozott feladatok */}
      <TheorySection title="5. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A Kheopsz-piramis adatai" badge="1. feladat" badgeColor="amber">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>AB = 232,4 m, FE = M = 146,7 m, a/2 = 116,2 m.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  a) m<sub>o</sub> = √(146,7² + 116,2²) ≈ <strong>187,1 m</strong>, így m<sub>o</sub> : (a/2) ≈ <strong>1,61</strong> – közel az aranymetszés arányszámához (≈ 1,618).
                </li>
                <li>
                  b) Oldallap területe: 232,4 · 187,1 / 2 ≈ 21 746 m², M² ≈ 21 521 m² – ezresekre kerekítve mindkettő <strong>22 000 m²</strong>.
                </li>
                <li>
                  c) Oldalél–alaplap: tg α = 146,7 / (116,2·√2) ≈ 0,893 ⇒ <strong>α ≈ 41,8°</strong>.
                </li>
                <li>
                  d) Oldallap–alaplap: tg β = 146,7 / 116,2 ≈ 1,262 ⇒ <strong>β ≈ 51,6°</strong>, ez kb. 10°-kal nagyobb α-nál.
                </li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Szabályos hatoldalú gúla" badge="2. feladat" badgeColor="sky">
            <HexPyramidSvg className="w-full h-auto mb-3" />
            <div className="space-y-1 text-sm text-slate-700 leading-relaxed">
              <p>Az oldalél 7√2, az alaplappal 45°-ot zár be.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  a) A 45°-os derékszögű háromszög egyenlő szárú: R = M = 7√2 · cos 45° = 7. Hatszögben R = a, ezért <strong>a = 7 egység</strong>.
                </li>
                <li>
                  b) ρ = 7√3/2 ≈ 6,06; tg β = 7 / 6,06 ≈ 1,155 ⇒ <strong>β ≈ 49,1°</strong>.
                </li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="C) A szabályos tetraéder lapszöge" badge="3. feladat" badgeColor="purple">
            <TetraDihedralSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az AB él F felezőpontjából a két lapon húzott magasság DF = CF = 8·√3/2 = 4√3 cm. A CDF háromszögben a koszinusztétel: 8² = 48 + 48 − 2·48·cos φ ⇒ cos φ = 1/3 ⇒ <strong>φ ≈ 70,5°</strong> (az élhossztól független!).
            </p>
          </TheoryCard>
          <TheoryCard title="D) Szabályos háromszög oldallapú négyoldalú gúla" badge="HF 2." badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az alaplap területe 100 cm² ⇒ a = 10 cm, minden él 10 cm. R = 5√2 ≈ 7,07 cm, M = √(100 − 50) = <strong>5√2 ≈ 7,07 cm</strong>. Oldallap–alaplap: tg β = 7,07 / 5 = √2 ⇒ <strong>β ≈ 54,7°</strong>; oldalél–alaplap: M = R miatt <strong>α = 45°</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: melyik szög melyik háromszögben van?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az oldalél és az oldallap hajlásszögének összekeverése"
          wrong="Oldallap és alaplap szöge: tg β = M / R (a fél átlóval számolva)"
          wrongExplanation="Ez az oldalél és az alaplap szöge! Az oldallap szögéhez az alapélre merőleges szakaszok kellenek: a magasság talppontjából az alapél felezőpontjába húzott ρ és az oldallap magassága."
          correct="Oldallap–alaplap: tg β = M / ρ; oldalél–alaplap: tg α = M / R"
          correctExplanation="Két sík hajlásszögét a metszésvonalukra (az alapélre) merőleges egyenesek szöge adja. Mivel ρ < R, mindig β > α."
          tip="Négyzet alapnál ρ = a/2, R = a√2/2 – ne a teljes alapéllel vagy a teljes átlóval számolj!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Forgatható szabályos gúla" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Oldalak száma (n): {n}</label>
                <input type="range" min="3" max="8" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-amber-600" aria-label="oldalak száma" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapél (a): {hu(edge, 1)} cm</label>
                <input type="range" min="2" max="10" step="0.5" value={edge} onChange={(e) => setEdge(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="alapél" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Testmagasság (M): {hu(height, 1)} cm</label>
                <input type="range" min="1" max="12" step="0.5" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-rose-600" aria-label="magasság" />
              </div>
              <div className="flex flex-wrap gap-2">
                {([
                  ['mo', 'M, ρ, mₒ háromszög'],
                  ['b', 'M, R, b háromszög'],
                  ['M', 'csak a magasság']
                ] as const).map(([k, t]) => (
                  <button
                    key={k}
                    onClick={() => setShow(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${show === k ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">R (köré írt)</div>
                  <div className="font-mono font-black text-slate-900">{hu(R)} cm</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">ρ (beírt)</div>
                  <div className="font-mono font-black text-slate-900">{hu(rho)} cm</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-slate-500">mₒ</div>
                  <div className="font-mono font-black text-blue-900">{hu(mo)} cm</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-slate-500">oldalél b</div>
                  <div className="font-mono font-black text-emerald-900">{hu(lateral)} cm</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">α (oldalél)</div>
                  <div className="font-mono font-black text-amber-900">{hu(alpha, 1)}°</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">β (oldallap)</div>
                  <div className="font-mono font-black text-amber-900">{hu(beta, 1)}°</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Lapok: <strong>{n + 1}</strong>, élek: <strong>{2 * n}</strong>, csúcsok: <strong>{n + 1}</strong> (Euler: {n + 1} + {n + 1} − {2 * n} = 2).
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Solid3DViewer solid={solid} extras={extras} width={320} height={280} />
              <p className="text-xs text-slate-500 italic mt-2 text-center">Húzd az egérrel vagy az ujjaddal a gúla forgatásához! Figyeld meg: β mindig nagyobb α-nál.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Piramis-kalkulátor" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapél (a): {hu(qa, 1)} m</label>
                <input type="range" min="20" max="300" step="0.1" value={qa} onChange={(e) => setQa(Number(e.target.value))} className="w-full accent-purple-600" aria-label="alapél" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Magasság (M): {hu(qM, 1)} m</label>
                <input type="range" min="10" max="250" step="0.1" value={qM} onChange={(e) => setQM(Number(e.target.value))} className="w-full accent-rose-600" aria-label="magasság" />
              </div>
              <button
                onClick={() => {
                  setQa(232.4);
                  setQM(146.7);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800"
              >
                Kheopsz-piramis adatai
              </button>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>mₒ = √(M² + (a/2)²) = <strong>{hu(qmo, 1)} m</strong></div>
                <div>mₒ : (a/2) = <strong>{hu(qRatio, 3)}</strong> {Math.abs(qRatio - 1.618) < 0.02 ? '≈ aranymetszés (1,618)' : ''}</div>
                <div>oldallap területe = <strong>{hu(qFace, 0)} m²</strong>, M² = <strong>{hu(qM * qM, 0)} m²</strong></div>
                <div>oldalél b = <strong>{hu(qb, 1)} m</strong></div>
                <div>α (oldalél–alaplap) = <strong>{hu(qAlpha, 1)}°</strong>, β (oldallap–alaplap) = <strong>{hu(qBeta, 1)}°</strong></div>
                <div className="text-xs text-slate-500">β − α = {hu(qBeta - qAlpha, 1)}°</div>
              </div>
            </div>
            <svg viewBox="0 0 300 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon points={`${F[0]},${F[1]} ${G[0]},${G[1]} ${E[0]},${E[1]}`} fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="2" />
              <RightMark v={F} p1={E} p2={G} r={11} />
              <AngleArc v={G} p1={F} p2={E} t="β" r={18} />
              <text x={F[0] - 8} y={(E[1] + F[1]) / 2} fontSize="12" fontWeight="bold" textAnchor="end" fill="#dc2626">M</text>
              <text x={(F[0] + G[0]) / 2} y={F[1] + 16} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">a/2</text>
              <text x={(E[0] + G[0]) / 2 + 8} y={(E[1] + G[1]) / 2 - 4} fontSize="12" fontWeight="bold" fill="#2563eb">mₒ</text>
              <text x="150" y="212" fontSize="10" textAnchor="middle" fill="#64748b">metszet: magasság, fél alapél, oldallap-magasság</text>
            </svg>
          </div>
          <TheoryCallout type="success" title="Próbáld ki!">
            Állítsd be: a = 10, M = 5√2 ≈ 7,1 (szabályos háromszög oldallapú gúla) ⇒ β ≈ 54,7°, α ≈ 45°. Ha M = a/2, akkor β = 45°.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PyramidTheory;
