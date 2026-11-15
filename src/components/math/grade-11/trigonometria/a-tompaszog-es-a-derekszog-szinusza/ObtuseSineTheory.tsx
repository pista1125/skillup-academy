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
  ObtuseAreaPairSvg,
  SideBySideTrianglesSvg,
  SupplementarySineDefinitionSvg,
  RightAngleSineSvg,
  SineInverseTwoAnglesSvg
} from './ObtuseSineFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
const parse = (s: string) => Number(s.replace(',', '.'));

const PRESETS: { label: string; a: string; b: string; t: string }[] = [
  { label: '1. feladat, 4. háromszög', a: '49', b: '54', t: '1323' },
  { label: 'Dóri adatai', a: '94', b: '54', t: '1323' },
  { label: 'HF 2. b)', a: '10', b: '12', t: '36,1' }
];

export const ObtuseSineTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: területképlet 0° és 180° között
  const [sideA, setSideA] = useState<number>(6.5);
  const [sideB, setSideB] = useState<number>(11.25);
  const [gamma, setGamma] = useState<number>(128);

  const height = sideA * Math.sin(toRad(gamma));
  const area = (sideA * sideB * Math.sin(toRad(gamma))) / 2;
  const suppl = 180 - gamma;
  const angleType = gamma < 90 ? 'hegyesszög' : gamma === 90 ? 'derékszög' : 'tompaszög';

  // Labor I rajz
  const topX = sideA * Math.cos(toRad(gamma));
  const minX = Math.min(0, topX);
  const maxX = Math.max(sideB, topX);
  const scale = Math.min(300 / (maxX - minX), 150 / Math.max(height, 0.5));
  const C = { x: 20 + (0 - minX) * scale, y: 200 };
  const A = { x: C.x + sideB * scale, y: 200 };
  const B = { x: C.x + topX * scale, y: 200 - height * scale };

  // Labor II: szög a területből
  const [inA, setInA] = useState<string>('49');
  const [inB, setInB] = useState<string>('54');
  const [inT, setInT] = useState<string>('1323');
  const a2 = parse(inA);
  const b2 = parse(inB);
  const t2 = parse(inT);
  const valid = a2 > 0 && b2 > 0 && t2 > 0;
  const sinG = valid ? (2 * t2) / (a2 * b2) : NaN;
  const g1 = sinG <= 1 ? toDeg(Math.asin(sinG)) : NaN;
  const isRight = Math.abs(sinG - 1) < 1e-9;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="a-tompaszog-es-a-derekszog-szinusza"
      title="8. A tompaszög és a derékszög szinusza"
      subtitle="Hogyan számolhatjuk ki egy tompaszögű háromszög területét a T = ab · sin γ / 2 képlettel? A szinusz értelmezése tompaszögre és derékszögre."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_tompaszog_es_derekszog_szinusza_tananyag.pdf"
      practiceTitle="Készen állsz a tompaszögek szinuszára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TOMPASZÖG ÉS DERÉKSZÖG SZINUSZA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                sin γ = sin (180° − γ), ha γ tompaszög; sin 90° = 1
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Így a <strong>T = a · b · sin γ / 2</strong> területképlet <strong>minden</strong> háromszögre érvényes (hegyes-, derék- és tompaszögű).
              </li>
              <li>Két kiegészítő szög (összegük 180°) szinusza egyenlő, pl. sin 128° = sin 52°.</li>
              <li>
                Visszakeresésnél a számológép <strong>sin⁻¹</strong> gombja csak a hegyesszöget adja: a tompaszögű megoldás <strong>180° − α</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: 52° vagy 128°?" badge="Tankönyv 24. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Mekkora annak a háromszögnek a területe, amelynek két oldala <strong>26 cm</strong>, illetve <strong>45 cm</strong>, az általuk közbezárt szög pedig <strong>a) 52°; b) 128°</strong>?
            </p>
            <p>
              <strong>a)</strong> A 45 cm-es oldalhoz tartozó magasság: m<sub>a</sub> = 26 · sin 52° ≈ 20,5 cm, ezért
            </p>
            <div className="bg-violet-50 p-3 rounded-xl border border-violet-200 text-center font-mono font-bold text-violet-900">
              T = 45 · 26 · sin 52° / 2 ≈ 461 cm²
            </div>
            <p>
              <strong>b)</strong> A tompaszögű háromszögben a 45 cm-es oldalhoz tartozó magasság a háromszöghöz <strong>toldott derékszögű háromszögben</strong> számolható. Ott a magassággal szemben fekvő hegyesszög a 128°-os szög mellékszöge: 180° − 128° = <strong>52°</strong>. Így a magasság ugyanakkora: m<sub>a</sub> = 26 · sin 52°, és a terület is ugyanannyi: <strong>T ≈ 461 cm²</strong>.
            </p>
          </div>
          <ObtuseAreaPairSvg />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SideBySideTrianglesSvg />
          <TheoryCallout type="info" title="Megjegyzés (tankönyv)">
            A két háromszög egymás mellé is helyezhető: közös a 26 cm-es oldaluk, a 45 cm-es oldalaik egy egyenesre esnek, a C csúcsnál lévő szögeik (52° és 128°) mellékszögek. Ebben az elrendezésben jól látszik, hogy <strong>közös a magasságuk</strong>, és egyenlő az alapjuk – ezért a területük is egyenlő.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A tompaszög és a derékszög szinuszának értelmezése" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SupplementarySineDefinitionSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az ábrán az ABC és CBD háromszögek területe egyenlő, hiszen az AC és CD oldalak hossza egyenlő (b), és a hozzájuk tartozó magasság is közös.
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
              <li>CBD háromszög (hegyesszög): T = a · b · sin (180° − γ) / 2</li>
              <li>ABC háromszög (tompaszög): T = a · b · sin γ / 2</li>
            </ul>
            <p>
              A területek egyenlők. A képlet akkor teljesül a tompaszögű ABC háromszögre is, ha a γ tompaszög szinuszát így értelmezzük: <strong>sin γ = sin (180° − γ)</strong>.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Definíció – tompaszög" badge="90° < γ < 180°" badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Tompaszög szinusza egyenlő kiegészítő szögének szinuszával:</strong> sin γ = sin (180° − γ). Például sin 128° = sin 52° ≈ 0,788; sin 150° = sin 30° = 0,5.
            </p>
          </TheoryCard>
          <TheoryCard title="Definíció – derékszög" badge="γ = 90°" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              A derékszögű háromszög területe T = a · b / 2. Ahhoz, hogy erre is teljesüljön a T = a · b · sin γ / 2 képlet, a derékszög szinusza legyen 1: <strong>sin 90° = 1</strong>.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RightAngleSineSvg />
          <SineInverseTwoAnglesSvg />
        </div>
        <TheoryCallout type="warning" title="A számológép és a sin⁻¹ gomb">
          A <strong>sin</strong> gomb a tompaszög és a derékszög szinuszát is megadja. Vigyázni kell azonban, amikor a szinuszértékhez keressük a szöget! A <strong>sin⁻¹</strong> funkció mindig <strong>hegyesszöget</strong> ad meg. Ha tompaszöget keresünk, akkor ennek kiegészítő szöge a megoldás: <strong>180° − α</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. A táblázatos feladat és Dóri hibája" badge="1–2. feladat" badgeColor="teal">
        <TheoryTable
          headers={['', '1. háromszög', '2. háromszög', '3. háromszög', '4. háromszög', '5. háromszög']}
          rows={[
            ['a', '38 cm', '19 cm', <strong key="a3">19 km</strong>, '49 mm', <strong key="a5">12 m</strong>],
            ['b', '29 cm', <strong key="b2">17 cm</strong>, '17 km', '54 mm', '8 m'],
            ['γ', '142°', '150°', '30°', <strong key="g4">90°</strong>, '90°'],
            ['T', <strong key="t1">≈ 339 cm²</strong>, '80,75 cm²', '80,75 km²', '1323 mm²', '48 m²']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A hiányzó adatok" badge="Megoldás" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1.: T = 38 · 29 · sin 142° / 2 = 551 · sin 38° ≈ <strong>339,2 cm²</strong></li>
              <li>2.: b = 2T / (a · sin γ) = 161,5 / (19 · 0,5) = <strong>17 cm</strong></li>
              <li>3.: a = 161,5 / (17 · sin 30°) = <strong>19 km</strong></li>
              <li>4.: sin γ = 2 · 1323 / (49 · 54) = 2646 / 2646 = 1 ⇒ <strong>γ = 90°</strong></li>
              <li>5.: a = 2 · 48 / (8 · sin 90°) = <strong>12 m</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Dóri megoldása hiányos" badge="2. feladat" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              a = 94 mm-rel: sin γ = 2 · 1323 / (94 · 54) ≈ 0,5213. A számológép γ ≈ 31,4°-ot ad – de ez csak a hegyesszögű megoldás! Ugyanekkora a szinusza a <strong>γ ≈ 180° − 31,4° = 148,6°</strong>-os tompaszögnek is, így <strong>két háromszög</strong> felel meg. Dóri tehát nem oldotta meg hiánytalanul a feladatot.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Házi feladatok röviden">
          <strong>1.</strong> Vitorla: 9 m, 4,4 m, 93° ⇒ T = 9 · 4,4 · sin 93° / 2 ≈ 19,77 m², 12%-kal több anyag: ≈ <strong>22,1 m²</strong>. &nbsp;
          <strong>2.</strong> a) 10 cm, 12 cm, 37° ⇒ T ≈ 36,1 cm²; b) ha T = 36,1 cm², akkor sin γ ≈ 0,602 ⇒ γ ≈ 37° vagy <strong>γ ≈ 143°</strong> – tehát lehet tompaszögű. &nbsp;
          <strong>3.</strong> a) Paralelogramma 36 mm, 54 mm, 145° ⇒ T = 36 · 54 · sin 145° ≈ <strong>1115 mm²</strong>; b) átlók 36 és 54 mm, 35° ⇒ T = 36 · 54 · sin 35° / 2 ≈ 558 mm².
        </TheoryCallout>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: csak a hegyesszöget keressük" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A sin⁻¹ eredménye nem mindig az egyetlen megoldás"
          wrong="sin γ = 0,5213 ⇒ γ ≈ 31,4°, és kész."
          wrongExplanation="A sin⁻¹ funkció mindig hegyesszöget ad. Egy háromszög szöge lehet tompaszög is, amelynek szinusza ugyanennyi."
          correct="sin γ = 0,5213 ⇒ γ₁ ≈ 31,4° vagy γ₂ ≈ 180° − 31,4° = 148,6°"
          correctExplanation="Mindkét szög megfelelhet: ugyanazzal a két oldallal és területtel egy hegyesszögű és egy tompaszögű háromszög is létezik (kivéve ha sin γ = 1, ekkor csak γ = 90°)."
          tip="Ha a feladat szövege eldönti (pl. „tompaszögű háromszög”), csak az egyik megoldás marad."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: A területképlet 0° és 180° között" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">γ közbezárt szög: {gamma}° ({angleType})</label>
                <input
                  type="range"
                  min="1"
                  max="179"
                  value={gamma}
                  onChange={(e) => setGamma(Number(e.target.value))}
                  className="w-full accent-violet-600"
                  aria-label="gamma szög"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">a oldal: {fmt(sideA, 2)} cm</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.25"
                    value={sideA}
                    onChange={(e) => setSideA(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                    aria-label="a oldal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">b oldal: {fmt(sideB, 2)} cm</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.25"
                    value={sideB}
                    onChange={(e) => setSideB(Number(e.target.value))}
                    className="w-full accent-blue-600"
                    aria-label="b oldal"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-violet-50 rounded-xl p-2 border border-violet-200">
                  <div className="text-[11px] text-slate-500">sin {gamma}°</div>
                  <div className="font-mono font-black text-violet-900">{fmt(Math.sin(toRad(gamma)), 4)}</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">m = a · sin γ</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(height)} cm</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">T = ab · sin γ / 2</div>
                  <div className="font-mono font-black text-amber-900">{fmt(area)} cm²</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Kiegészítő szög: 180° − {gamma}° = <strong>{suppl}°</strong>, sin {suppl}° = {fmt(Math.sin(toRad(suppl)), 4)} – ugyanakkora, ezért a {suppl}°-os háromszög területe is {fmt(area)} cm².
                {gamma === 90 && ' Derékszögnél sin 90° = 1, a terület a legnagyobb: T = a · b / 2.'}
              </p>
            </div>
            <svg viewBox="0 0 340 230" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {gamma > 90 && (
                <line x1={B.x} y1={C.y} x2={C.x} y2={C.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
              )}
              <polygon
                points={`${C.x},${C.y} ${A.x},${A.y} ${B.x},${B.y}`}
                fill="rgba(139,92,246,0.14)"
                stroke="#7c3aed"
                strokeWidth="2"
              />
              <line x1={B.x} y1={B.y} x2={B.x} y2={C.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 4" />
              <path d={(() => {
                const r = 22;
                const ex = C.x + r * Math.cos(toRad(gamma));
                const ey = C.y - r * Math.sin(toRad(gamma));
                return `M ${C.x + r} ${C.y} A ${r} ${r} 0 0 0 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
              })()} fill="none" stroke="#dc2626" strokeWidth="2" />
              <text x={C.x + 6} y={C.y + 16} fontSize="11" fill="#b91c1c">γ = {gamma}°</text>
              <text x={(C.x + A.x) / 2 + 20} y={C.y + 16} fontSize="11" fill="#1d4ed8">b</text>
              <text x={(C.x + B.x) / 2 - 12} y={(C.y + B.y) / 2} fontSize="11" fill="#047857">a</text>
              <text x={B.x + 5} y={(B.y + C.y) / 2 + 12} fontSize="11" fill="#047857">m</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Szög visszakeresése a területből" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setInA(p.a);
                  setInB(p.b);
                  setInT(p.t);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a oldal</label>
              <input
                type="text"
                value={inA}
                onChange={(e) => setInA(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="a oldal hossza"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">b oldal</label>
              <input
                type="text"
                value={inB}
                onChange={(e) => setInB(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="b oldal hossza"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">terület (T)</label>
              <input
                type="text"
                value={inT}
                onChange={(e) => setInT(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="terület"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            {!valid ? (
              <div className="text-rose-700 font-semibold">Adj meg pozitív számokat!</div>
            ) : (
              <>
                <div>1. sin γ = 2T / (a · b) = {fmt(2 * t2)} / {fmt(a2 * b2)} = <strong>{fmt(sinG, 4)}</strong></div>
                {sinG > 1 + 1e-9 ? (
                  <div className="text-rose-700 font-semibold">
                    2. sin γ &gt; 1 – ilyen háromszög nem létezik (a terület legfeljebb a · b / 2 = {fmt((a2 * b2) / 2)} lehet).
                  </div>
                ) : isRight ? (
                  <div>2. sin γ = 1 ⇒ egyetlen megoldás: <strong>γ = 90°</strong> (derékszögű háromszög)</div>
                ) : (
                  <>
                    <div>2. sin⁻¹ ⇒ hegyesszögű megoldás: <strong>γ₁ ≈ {fmt(g1, 1)}°</strong></div>
                    <div>3. kiegészítő szög ⇒ tompaszögű megoldás: <strong>γ₂ ≈ 180° − {fmt(g1, 1)}° = {fmt(180 - g1, 1)}°</strong></div>
                    <div className="text-xs text-slate-500 pt-1">Mindkét háromszög létezik: ugyanaz a két oldal, ugyanaz a terület.</div>
                  </>
                )}
              </>
            )}
          </div>
          <TheoryCallout type="success" title="Próbáld ki!">
            A 4. háromszög adataival sin γ = 1, tehát csak a derékszög jó. Dóri adataival két szög is megfelel (≈ 31,4° és ≈ 148,6°). A házi feladat 2. b) részében γ ≈ 37° vagy ≈ 143°.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ObtuseSineTheory;
