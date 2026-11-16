import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Solid3DViewer, Solid, Vec3 } from '../shared/Solid3DViewer';
import {
  ConePartsSvg,
  ConeFromTriangleSvg,
  RightTriangleConeSvg,
  TriangulumSvg,
  ConicSectionsSvg,
  DoubleConeSvg
} from './ConeFigures';
import { RightMark, AngleArc, hu } from '../a-gula/SolidSketch';

const deg = (x: number) => (x * 180) / Math.PI;
const rad = (x: number) => (x * Math.PI) / 180;

export const ConeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: forgassunk meg egy háromszöget
  const [r, setR] = useState<number>(4);
  const [M, setM] = useState<number>(7);
  const [theta, setTheta] = useState<number>(220);

  const sweep = useMemo<Solid>(() => {
    const seg = 48;
    const steps = Math.max(1, Math.round((seg * theta) / 360));
    const vertices: Vec3[] = [];
    for (let i = 0; i <= steps; i++) {
      const t = rad((theta * i) / steps);
      vertices.push([r * Math.cos(t), 0, r * Math.sin(t)]);
    }
    const apex = vertices.length;
    vertices.push([0, M, 0]);
    const edges: [number, number][] = [];
    for (let i = 0; i < steps; i++) edges.push([i, i + 1]);
    for (let i = 0; i <= steps; i += 6) edges.push([i, apex]);
    edges.push([steps, apex]);
    return { vertices, edges, curved: true };
  }, [r, M, theta]);
  const tEnd = rad(theta);
  const rim: Vec3 = [r * Math.cos(tEnd), 0, r * Math.sin(tEnd)];
  const sweepExtras = useMemo(
    () => [
      { from: [0, M, 0] as Vec3, to: [0, 0, 0] as Vec3, color: '#dc2626', dashed: true, label: 'M' },
      { from: [0, 0, 0] as Vec3, to: rim, color: '#64748b', label: 'r' },
      { from: [0, M, 0] as Vec3, to: rim, color: '#059669', width: 3, label: 'a' }
    ],
    [M, rim[0], rim[2]] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const sweepPolys = useMemo(() => [{ points: [[0, M, 0], [0, 0, 0], rim] as Vec3[], fill: 'rgba(245,158,11,0.35)' }], [M, rim[0], rim[2]]); // eslint-disable-line react-hooks/exhaustive-deps
  const a1 = Math.hypot(r, M);
  const phi1 = 2 * deg(Math.atan(r / M));

  // Labor II: tengelymetszet-kalkulátor
  const [mode, setMode] = useState<'rM' | 'ar' | 'aphi'>('ar');
  const [in1, setIn1] = useState<number>(24);
  const [in2, setIn2] = useState<number>(10);
  let cr = 0;
  let cM = 0;
  let ca = 0;
  let valid = true;
  if (mode === 'rM') {
    cr = in1;
    cM = in2;
    ca = Math.hypot(cr, cM);
  } else if (mode === 'ar') {
    ca = in1;
    cr = in2;
    valid = ca > cr;
    cM = valid ? Math.sqrt(ca * ca - cr * cr) : 0;
  } else {
    ca = in1;
    const half = rad(in2 / 2);
    valid = in2 > 0 && in2 < 180;
    cr = ca * Math.sin(half);
    cM = ca * Math.cos(half);
  }
  const cphi = valid ? 2 * deg(Math.atan(cr / cM)) : 0;
  const cbase = 90 - cphi / 2;
  const sc = valid ? Math.min(110 / cr, 160 / cM) : 1;
  const Tp: [number, number] = [150, 24];
  const Fp: [number, number] = [150, 24 + cM * sc];
  const Lp: [number, number] = [150 - cr * sc, Fp[1]];
  const Rp: [number, number] = [150 + cr * sc, Fp[1]];
  const labels = mode === 'rM' ? ['r (sugár)', 'M (magasság)'] : mode === 'ar' ? ['a (alkotó)', 'r (sugár)'] : ['a (alkotó)', 'φ (nyílásszög, °)'];

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-forgaskup"
      title="12. A forgáskúp"
      subtitle="Mi lesz a gyorsan forgó triangulumból? Az egyenlő szárú háromszög megforgatásával keletkező forgáskúp részei, nyílásszöge és tengelymetszete."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_a_forgaskup_tananyag.pdf"
      practiceTitle="Készen állsz a forgáskúpos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FORGÁSKÚP TENGELYMETSZETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                a² = r² + M² &nbsp;•&nbsp; sin(φ/2) = r / a &nbsp;•&nbsp; tg(φ/2) = r / M
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A tengelymetszet egyenlő szárú háromszög: alapja 2r (az alapkör átmérője), szárai az alkotók (a), magassága M.</li>
              <li>A forgáskúp minden alkotója egyenlő hosszú; φ a nyílásszög (a tengelymetszet szárszöge).</li>
              <li>Az alkotó és az alaplap szöge 90° − φ/2 (a nyílásszög felének pótszöge).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a forgó triangulum" badge="Tankönyv 30. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A <strong>triangulum</strong> fémrúdból hajlított szabályos háromszög alakú ütőhangszer (oldala általában 10–30 cm). Az egyik csúcsánál lazán felfüggesztve szólaltatják meg.
            </p>
            <p>
              Ha a felfüggesztésre illeszkedő tengely körül gyorsan megforgatjuk, szemünk tehetetlensége miatt egybefüggő térbeli alakzatnak látjuk: ez egy <strong>forgáskúp</strong>.
            </p>
            <p>
              <strong>2. feladat:</strong> 20 cm-es oldalú triangulumnál r = 10 cm, M = √(20² − 10²) = 10√3 ≈ <strong>17,3 cm</strong>, az alapkör kerülete 20π ≈ <strong>62,8 cm</strong>, területe 100π ≈ <strong>314,2 cm²</strong>.
            </p>
          </div>
          <TriangulumSvg />
        </div>
      </TheorySection>

      {/* 2. Fogalmak */}
      <TheorySection title="2. A forgáskúp fogalma és részei" badge="Elmélet" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ConeFromTriangleSvg />
          <ConePartsSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Definíció" badge="Forgáskúp" badgeColor="indigo">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy <strong>egyenlő szárú háromszöget</strong> megforgatunk a szimmetriatengelye körül, <strong>forgáskúp</strong> (más néven egyenes körkúp) keletkezik. A forgáskúpot egy körlap (az alapkör) és a kúppalást határolja.
            </p>
          </TheoryCard>
          <TheoryCard title="Alkotó, magasság" badge="a, M" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              A csúcsot az alapkör pontjaival összekötő szakaszok az <strong>alkotók</strong> (a) – mind egyenlők, akkorák, mint a háromszög szárai. A csúcsot az alapkör középpontjával összekötő szakasz merőleges az alapsíkra: ez a <strong>testmagasság</strong> (M).
            </p>
          </TheoryCard>
          <TheoryCard title="Nyílásszög" badge="φ" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              A megforgatott egyenlő szárú háromszög szárszöge a forgáskúp <strong>nyílásszöge</strong> (φ). Az alapkör átmérője a háromszög alapja: 2r.
            </p>
          </TheoryCard>
          <TheoryCard title="Tengelymetszet" badge="Metszet" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              A megforgatott egyenlő szárú háromszög a forgáskúp <strong>tengelymetszete</strong>: a tengelyre illeszkedő sík ebben metszi a kúpot.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Egyenlő szárú háromszög', 'Forgáskúp']}
          rows={[
            ['alap (2r)', 'az alapkör átmérője'],
            ['szár', 'alkotó (a)'],
            ['alaphoz tartozó magasság', 'testmagasság (M)'],
            ['szárszög', 'nyílásszög (φ)'],
            ['alapon fekvő szög', 'alkotó és alaplap szöge (90° − φ/2)']
          ]}
        />
      </TheorySection>

      {/* 3. Derékszögű háromszög forgatása */}
      <TheorySection title="3. Derékszögű háromszög forgatása" badge="1. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RightTriangleConeSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha egy derékszögű háromszöget az egyik <strong>befogója egyenese körül</strong> forgatunk meg, akkor is forgáskúpot kapunk: a tengely menti befogó lesz a magasság, a másik befogó az alapkör sugara, az átfogó az alkotó.
            </p>
            <p>
              (Valójában a derékszögű háromszög és a tükörképe együtt adja ki a tengelymetszetet – ez a fele az egyenlő szárú háromszögnek.)
            </p>
            <TheoryCallout type="tip" title="HF 2. – melyik befogó körül?">
              Átfogó 51 cm, egyik befogó 24 cm ⇒ másik befogó √(51² − 24²) = 45 cm. A hosszabbik (45 cm) befogó körül forgatva r = 24 cm, M = 45 cm: φ = 2 · arctg(24/45) ≈ <strong>56,1°</strong>, T = 576π ≈ <strong>1809,6 cm²</strong>.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok: a nyílásszög" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Alkotóból és átmérőből" badge="3. feladat" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Alkotó 24 mm, átmérő 2 cm = 20 mm ⇒ r = 10 mm. A tengelymetszet felében: sin(φ/2) = 10 / 24 ≈ 0,4167 ⇒ φ/2 ≈ 24,6° ⇒ <strong>φ ≈ 49,2°</strong>. Vigyázz a mértékegységekre!
            </p>
          </TheoryCard>
          <TheoryCard title="B) Alapterületből" badge="4. feladat" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              r²π = 1256,6 ⇒ r ≈ 20 cm; K = 40π ≈ 125,7 cm, M = K / 4 = 10π ≈ 31,4 cm. tg(φ/2) = 20 / 31,4 ⇒ φ/2 ≈ 32,5° ⇒ <strong>φ ≈ 65,0°</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="C) A háromszög a kúpból" badge="HF 3." badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              Alkotó 2 dm, φ = 40°. A háromszög alapja 2 · 2 · sin 20° ≈ 1,37 dm, kerülete 2 + 2 + 1,37 ≈ <strong>5,37 dm</strong>, területe ½ · 2 · 2 · sin 40° ≈ <strong>1,29 dm²</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Kettős kúp" badge="HF 4." badgeColor="rose">
            <DoubleConeSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A rombuszt átlója körül forgatva két, közös alapkörű kúp keletkezik. r²π = 1964 ⇒ r ≈ 25,0 cm; sin 25° = r / oldal ⇒ oldal ≈ 25,0 / 0,4226 ≈ <strong>59,2 cm</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Igaz vagy hamis? (HF 1.)">
          A) Háromszoros nagyításnál a nyílásszög <strong>nem változik</strong> (hasonló testek szögei egyenlők) – hamis. B) Az alkotó és az alaplap szöge 90° − φ/2, ez a nyílásszög felének pótszöge – <strong>igaz</strong>. C) Az alkotó nem mindig nagyobb az átmérőnél (pl. φ = 90°-nál a = r√2 &lt; 2r) – hamis. D) A sugár lehet nagyobb a magasságnál (lapos kúp) – hamis.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Ráadás: kúpszeletek */}
      <TheorySection title="5. Ráadás: kúpszeletek" badge="Érdekesség" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ConicSectionsSvg />
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
            <li>A sík merőleges a tengelyre ⇒ <strong>kör</strong>.</li>
            <li>Minden alkotót metsz, de nem merőleges a tengelyre ⇒ <strong>ellipszis</strong>.</li>
            <li>Egy alkotóval párhuzamos ⇒ <strong>parabolaív</strong>.</li>
            <li>Két alkotóval párhuzamos ⇒ <strong>hiperbolaív</strong>.</li>
            <li className="text-xs text-slate-500">(A metsző sík nem megy át a kúp csúcsán.)</li>
          </ul>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a nyílásszög fele" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A teljes nyílásszög helyett a fele (vagy fordítva)"
          wrong="sin φ = r / a"
          wrongExplanation="A tengelymetszet felében, a derékszögű háromszögben csak a nyílásszög fele (φ/2) szerepel. A 24 mm-es alkotó és 10 mm-es sugár esetén így 24,6° jönne ki 49,2° helyett."
          correct="sin(φ/2) = r / a, tg(φ/2) = r / M, és φ = 2 · (φ/2)"
          correctExplanation="Először a derékszögű háromszögből φ/2-t számolunk ki, majd megduplázzuk. Ha átmérő adott, előbb felezzük: r = d / 2."
          tip="Az alkotó és az alaplap szöge nem a nyílásszög, hanem 90° − φ/2!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Forgassunk meg egy háromszöget!" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Elforgatás szöge: {theta}°</label>
                <input type="range" min="5" max="360" step="5" value={theta} onChange={(e) => setTheta(Number(e.target.value))} className="w-full accent-amber-600" aria-label="forgatás szöge" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sugár (r): {hu(r, 1)} cm</label>
                <input type="range" min="1" max="10" step="0.5" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-slate-600" aria-label="sugár" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Magasság (M): {hu(M, 1)} cm</label>
                <input type="range" min="1" max="15" step="0.5" value={M} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-rose-600" aria-label="magasság" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-slate-500">alkotó a</div>
                  <div className="font-mono font-black text-emerald-900">{hu(a1)} cm</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">nyílásszög φ</div>
                  <div className="font-mono font-black text-amber-900">{hu(phi1, 1)}°</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">alapkör területe</div>
                  <div className="font-mono font-black text-slate-900">{hu(r * r * Math.PI)} cm²</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                A sárga derékszögű háromszög (M, r, a) a tengely körül forogva „kirajzolja” a kúp palástját. 360°-nál kész a forgáskúp.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Solid3DViewer solid={sweep} extras={sweepExtras} polygons={sweepPolys} width={320} height={280} />
              <p className="text-xs text-slate-500 italic mt-2 text-center">Húzd a testet a forgatáshoz!</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Tengelymetszet-kalkulátor" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {([
              ['rM', 'r és M adott', 6, 8],
              ['ar', 'a és r adott', 24, 10],
              ['aphi', 'a és φ adott', 2, 40]
            ] as const).map(([k, t, d1, d2]) => (
              <button
                key={k}
                onClick={() => {
                  setMode(k);
                  setIn1(d1);
                  setIn2(d2);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === k ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold text-slate-600">
                  {labels[0]}
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={in1}
                    onChange={(e) => setIn1(Math.max(0.1, Number(e.target.value) || 0.1))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label={labels[0]}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  {labels[1]}
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={in2}
                    onChange={(e) => setIn2(Math.max(0.1, Number(e.target.value) || 0.1))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label={labels[1]}
                  />
                </label>
              </div>
              {valid ? (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                  <div>r = <strong>{hu(cr)}</strong>, M = <strong>{hu(cM)}</strong>, a = <strong>{hu(ca)}</strong></div>
                  <div>nyílásszög φ = <strong>{hu(cphi, 1)}°</strong></div>
                  <div>alkotó–alaplap szög = 90° − φ/2 = <strong>{hu(cbase, 1)}°</strong></div>
                  <div>alapkör: K = 2rπ = {hu(2 * cr * Math.PI)}, T = r²π = {hu(cr * cr * Math.PI)}</div>
                  <div>tengelymetszet területe: r · M = {hu(cr * cM)}</div>
                </div>
              ) : (
                <TheoryCallout type="warning" title="Nincs ilyen kúp">
                  Az alkotónak hosszabbnak kell lennie a sugárnál, a nyílásszögnek 0° és 180° közé kell esnie.
                </TheoryCallout>
              )}
            </div>
            <svg viewBox="0 0 300 210" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {valid && (
                <>
                  <polygon points={`${Lp[0]},${Lp[1]} ${Rp[0]},${Rp[1]} ${Tp[0]},${Tp[1]}`} fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="2" />
                  <line x1={Tp[0]} y1={Tp[1]} x2={Fp[0]} y2={Fp[1]} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
                  <RightMark v={Fp} p1={Tp} p2={Rp} r={10} />
                  <AngleArc v={Tp} p1={Lp} p2={Rp} t="φ" r={16} tr={28} />
                  <AngleArc v={Rp} p1={Lp} p2={Tp} r={14} />
                  <text x={Fp[0] - 6} y={(Tp[1] + Fp[1]) / 2} fontSize="12" fontWeight="bold" textAnchor="end" fill="#dc2626">M</text>
                  <text x={(Fp[0] + Rp[0]) / 2} y={Fp[1] + 15} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">r</text>
                  <text x={(Tp[0] + Rp[0]) / 2 + 8} y={(Tp[1] + Rp[1]) / 2} fontSize="12" fontWeight="bold" fill="#059669">a</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ConeTheory;
