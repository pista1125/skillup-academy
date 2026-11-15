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
  IntroLinesSvg,
  AxisParallelLinesSvg,
  GeneralLineSvg,
  TranslatedLineSvg,
  PointOnLineSvg,
  DirectionNormalSvg
} from './LinesInPlaneFigures';
import { MidpointPlane, CP, PlaneVec, PlaneRightAngle } from '../felezopont/MidpointFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', '−');
};

/** y = ax + b szöveges alakja (pl. „y = −x + 1”, „y = 2x”, „y = 3”). */
const linesInPlaneEquation = (a: number, b: number) => {
  const ax = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '−x' : `${fmt(a)}x`;
  if (!ax) return `y = ${fmt(b)}`;
  if (b === 0) return `y = ${ax}`;
  return `y = ${ax} ${b > 0 ? '+' : '−'} ${fmt(Math.abs(b))}`;
};

type LineKind = 'vertical' | 'horizontal' | 'general';

export const LinesInPlaneTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: rajta van-e a pont az egyenesen?
  const [kind, setKind] = useState<LineKind>('general');
  const [pa, setPa] = useState(-1);
  const [pb, setPb] = useState(1);
  const [px, setPx] = useState(-4);
  const [py, setPy] = useState(5);
  const [showVectors, setShowVectors] = useState(true);

  // Labor II: egyenes eltolása vektorral
  const [m, setM] = useState(1);
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(5);

  // Labor I számítások
  let eqText = '';
  let lhs = '';
  let onLine = false;
  let lineP: CP = [0, 0];
  let lineD: CP = [1, 0];
  let dir: CP = [1, 0];
  let nor: CP = [0, 1];
  if (kind === 'vertical') {
    eqText = `x = ${fmt(pa)}`;
    lhs = `x = ${fmt(px)} ${Math.abs(px - pa) < 1e-9 ? '=' : '≠'} ${fmt(pa)}`;
    onLine = Math.abs(px - pa) < 1e-9;
    lineP = [pa, 0];
    lineD = [0, 1];
    dir = [0, 1];
    nor = [1, 0];
  } else if (kind === 'horizontal') {
    eqText = `y = ${fmt(pb)}`;
    lhs = `y = ${fmt(py)} ${Math.abs(py - pb) < 1e-9 ? '=' : '≠'} ${fmt(pb)}`;
    onLine = Math.abs(py - pb) < 1e-9;
    lineP = [0, pb];
    lineD = [1, 0];
    dir = [1, 0];
    nor = [0, 1];
  } else {
    eqText = linesInPlaneEquation(pa, pb);
    const rhs = pa * px + pb;
    onLine = Math.abs(rhs - py) < 1e-9;
    lhs = `${fmt(pa)} · (${fmt(px)}) ${pb < 0 ? '−' : '+'} ${fmt(Math.abs(pb))} = ${fmt(rhs)} ${onLine ? '=' : '≠'} ${fmt(py)}`;
    lineP = [0, pb];
    lineD = [1, pa];
    dir = [1, pa];
    nor = [-pa, 1];
  }
  // a vektorok kezdőpontja: az egyenes P-hez legközelebbi pontja (vetület)
  const dl = Math.hypot(lineD[0], lineD[1]);
  const ud: CP = [lineD[0] / dl, lineD[1] / dl];
  const tProj = (px - lineP[0]) * ud[0] + (py - lineP[1]) * ud[1];
  const foot: CP = [lineP[0] + tProj * ud[0], lineP[1] + tProj * ud[1]];
  const clampFoot: CP = [Math.max(-6, Math.min(6, foot[0])), Math.max(-6, Math.min(6, foot[1]))];
  const vecEnd = (v: CP): CP => {
    const l = Math.hypot(v[0], v[1]) || 1;
    const k = l > 3 ? 3 / l : 1;
    return [clampFoot[0] + v[0] * k, clampFoot[1] + v[1] * k];
  };
  const labVecs: PlaneVec[] = showVectors
    ? [
        { from: clampFoot, to: vecEnd(dir), color: '#2563eb', width: 2.4, label: 'v', lx: 10, ly: 12 },
        { from: clampFoot, to: vecEnd(nor), color: '#dc2626', width: 2.4, label: 'n', lx: -10, ly: -4 }
      ]
    : [];
  const labRA: PlaneRightAngle[] = showVectors ? [{ at: clampFoot, p: vecEnd(dir), q: vecEnd(nor), color: '#dc2626' }] : [];

  // Labor II számítások
  const newB = v2 - m * v1;
  const parallelShift = Math.abs(v2 - m * v1) < 1e-9;
  const baseSample: CP = [-2, -2 * m];
  const shiftedSample: CP = [baseSample[0] + v1, baseSample[1] + v2];

  const slider = (label: string, val: number, set: (v: number) => void, min: number, max: number, step: number, accent: string) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}: {fmt(val)}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => set(Number(e.target.value))}
        className={`w-full ${accent}`}
        aria-label={label}
      />
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="egyenesek-a-koordinata-rendszerben"
      title="9. Egyenesek a koordináta-rendszerben"
      subtitle="Az alakzat egyenlete: x = a, y = b és y = ax + b alakú egyenesek. Mikor van egy pont az egyenesen? Eltolás vektorral, irány- és normálvektor."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_egyenesek_a_koordinata_rendszerben_tananyag.pdf"
      practiceTitle="Készen állsz az egyenesekkel kapcsolatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ ALAKZAT EGYENLETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                x = a &nbsp;|&nbsp; y = b &nbsp;|&nbsp; y = ax + b
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Egy alakzat egyenletét <strong>azoknak és csakis azoknak</strong> a P(x; y) pontoknak a koordinátái teszik igazzá, amelyek illeszkednek az alakzatra.
              </li>
              <li>
                Az x tengelyre merőleges egyenes: <strong>x = a</strong>; az y tengelyre merőleges egyenes: <strong>y = b</strong>; a mindkét tengelyt metsző egyenes: <strong>y = ax + b</strong>.
              </li>
              <li>
                Rajta van-e a pont? <strong>Helyettesítsd be</strong> a koordinátáit: ha az egyenlőség igaz, rajta van; ha nem, nincs rajta.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: pontok közös tulajdonsága" badge="Tankönyv 236. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A koordináta-rendszerben a sík minden pontja két koordinátájával egyértelműen azonosítható. Minden síkbeli alakzat pontok egy halmaza, ezért megadható a pontjai koordinátái közötti olyan összefüggéssel, ami <strong>pontosan</strong> az alakzat pontjaira igaz.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az <strong>a</strong> egyenes minden pontjának második koordinátája 2, és ha egy pont második koordinátája 2, akkor rajta van: <strong>y = 2</strong>.</li>
              <li>A <strong>b</strong> egyenes a koordinátatengelyek két derékszögének szögfelezője; pontjai egyenlő távolságra vannak a két tengelytől, így két koordinátájuk egyenlő: <strong>y = x</strong>.</li>
              <li>A <strong>c</strong> egyenest a b-ből a (0; 5) vektorral való eltolással kapjuk: második koordinátája 5-tel nagyobb az elsőnél: <strong>y = x + 5</strong>.</li>
            </ul>
          </div>
          <IntroLinesSvg />
        </div>
        <TheoryCallout type="tip" title="Rajta van-e a c egyenesen?">
          Az A(−2,9; 2,1) pont a c egyenes pontja, mert 2,1 = −2,9 + 5. A B(4,3; 9,4) pont nincs rajta, mert 9,4 ≠ 4,3 + 5 = 9,3.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Egyenesek a koordináta-rendszerben" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AxisParallelLinesSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCard title="1. Az x tengelyre merőleges egyenes" badge="x = a" badgeColor="blue">
              <p className="text-sm text-slate-700">
                Ha az e egyenes merőleges az x tengelyre, és azt az (a; 0) pontban metszi, akkor egy pont <strong>pontosan akkor</strong> van rajta e-n, ha az első koordinátája a. Az e egyenes egyenlete: <strong>x = a</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="2. Az y tengelyre merőleges egyenes" badge="y = b" badgeColor="rose">
              <p className="text-sm text-slate-700">
                Ha az f egyenes merőleges az y tengelyre, és azt a (0; b) pontban metszi, akkor egy pont pontosan akkor van rajta f-en, ha a második koordinátája b. Az f egyenes egyenlete: <strong>y = b</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryCard title="3. Mindkét tengelyt metsző egyenes" badge="y = ax + b" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha az egyenes mindkét koordinátatengelyt metszi, akkor a pontjai első és második koordinátájának kapcsolatával adható meg: a g egyenes egyenlete <strong>y = ax + b</strong> – ez egy lineáris függvény grafikonja. A b az y tengellyel való metszéspont második koordinátája.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>y = x: a = 1, b = 0 (szögfelező).</li>
              <li>y = x + 5: a = 1, b = 5 (az y = x eltoltja (0; 5)-tel).</li>
              <li>y = −x + 1: a = −1, b = 1.</li>
            </ul>
          </TheoryCard>
          <GeneralLineSvg />
        </div>
        <TheoryCallout type="info" title="Alakzat egyenlete (definíció)">
          A síkbeli derékszögű koordináta-rendszerben egy alakzat egyenlete olyan x és y változókat tartalmazó egyenlőség, melyet azoknak és csakis azoknak a P(x; y) pontoknak a koordinátái tesznek igazzá, amelyek illeszkednek az alakzatra.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Rajta van-e a pont az y = −x + 1 egyenesen?" badge="3. feladat" badgeColor="sky">
            <PointOnLineSvg className="w-full h-auto mb-3" />
            <TheoryTable
              headers={['Pont', 'Behelyettesítés: −x + 1', 'Rajta van?']}
              rows={[
                ['A(−4; 5)', '4 + 1 = 5', 'igen'],
                ['B(−1; 3)', '1 + 1 = 2 ≠ 3', 'nem'],
                ['C(2; 2)', '−2 + 1 = −1 ≠ 2', 'nem'],
                ['D(5; −4)', '−5 + 1 = −4', 'igen'],
                ['E(100; −99)', '−100 + 1 = −99', 'igen'],
                ['F(871; −872)', '−871 + 1 = −870 ≠ −872', 'nem']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="B) Egyenesek megrajzolása az egyenletükből" badge="2. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>x = 7:</strong> az x tengelyt a (7; 0) pontban merőlegesen metsző egyenes.</li>
              <li><strong>y = x − 3:</strong> két pontja (0; −3) és (3; 0) – ezeket összekötve kapjuk.</li>
              <li><strong>y = −x − 5:</strong> két pontja (0; −5) és (−5; 0).</li>
              <li>Házi feladat: x = −4; y = x − 4 (pontjai (0; −4), (4; 0)); y = −x + 4 (pontjai (0; 4), (4; 0)).</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Tipp: egy egyeneshez két pont elég – a tengelymetszeteket a legkönnyebb kiszámolni (x = 0, illetve y = 0 behelyettesítésével).</p>
          </TheoryCard>
          <TheoryCard title="C) Házi feladat: az y = x − 5 egyenes pontjai" badge="HF 3." badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−5; −9): −5 − 5 = −10 ≠ −9 ⇒ nincs rajta.</li>
              <li>B(−1; −6): −1 − 5 = −6 ⇒ <strong>rajta van</strong>.</li>
              <li>C(2; −2): 2 − 5 = −3 ≠ −2 ⇒ nincs rajta.</li>
              <li>D(5; 0): 5 − 5 = 0 ⇒ <strong>rajta van</strong>.</li>
              <li>E(100; 105): 95 ≠ 105 ⇒ nincs rajta; F(871; −866): 866 ≠ −866 ⇒ nincs rajta.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Eltolás vektorral" badge="Bevezető" badgeColor="orange">
            <TranslatedLineSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az y = x egyenes minden pontját a →v(0; 5) vektorral eltolva a második koordináta 5-tel nő: (t; t) ↦ (t; t + 5). A képpontok egyenlete <strong>y = x + 5</strong>. Általában az y = ax egyenest a (v₁; v₂) vektorral eltolva <strong>y = a(x − v₁) + v₂</strong> adódik.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Kitekintés */}
      <TheorySection title="4. Kitekintés: az egyenes iránya vektorokkal" badge="Kitekintés" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az előző leckékben tanult vektorokkal az egyenes iránya is leírható (a következő leckékben erre építünk):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Irányvektor:</strong> az egyenessel párhuzamos, nem nulla vektor. Az y = ax + b egyenesen 1-et jobbra lépve a-t lépünk felfelé, ezért egy irányvektora <strong>→v(1; a)</strong> (és minden nem nulla számszorosa).
              </li>
              <li>
                <strong>Normálvektor:</strong> az egyenesre merőleges, nem nulla vektor. Az irányvektor 90°-os elforgatottja: (1; a) ↦ <strong>→n(−a; 1)</strong>.
              </li>
              <li>x = a esetén →v(0; 1), →n(1; 0); y = b esetén →v(1; 0), →n(0; 1).</li>
              <li>Ha egy egyenest a saját irányvektorával tolunk el, önmagába megy át.</li>
            </ul>
          </div>
          <DirectionNormalSvg />
        </div>
        <TheoryTable
          headers={['Egyenes', 'Irányvektor', 'Normálvektor']}
          rows={[
            ['y = x', '(1; 1)', '(−1; 1)'],
            ['y = x + 5', '(1; 1)', '(−1; 1)'],
            ['y = −x + 1', '(1; −1)', '(1; 1)'],
            ['y = 2x − 3', '(1; 2)', '(−2; 1)'],
            ['x = 7', '(0; 1)', '(1; 0)'],
            ['y = 2', '(1; 0)', '(0; 1)']
          ]}
        />
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: felcserélt koordináta" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az x = 7 nem vízszintes, az y = 2 nem függőleges egyenes"
          wrong="„Az x = 7 egyenes az x tengellyel párhuzamos, 7 magasságban fut.”"
          wrongExplanation="Az x = 7 egyenletet azok a pontok teszik igazzá, amelyeknek az ELSŐ koordinátája 7, például (7; 0), (7; 3), (7; −5) – ezek egy függőleges egyenesen vannak, amely az x tengelyt a (7; 0) pontban merőlegesen metszi."
          correct="x = 7: az x tengelyre merőleges (függőleges) egyenes; y = 2: az y tengelyre merőleges (vízszintes) egyenes"
          correctExplanation="Az egyenletben szereplő változó mondja meg, melyik koordináta rögzített: x = a esetén az első, y = b esetén a második."
          tip="Ellenőrzésként írj fel az egyenletből két pontot, és rajzold be őket!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Rajta van-e a pont? Irány- és normálvektor" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['vertical', 'x = a'],
                    ['horizontal', 'y = b'],
                    ['general', 'y = ax + b']
                  ] as [LineKind, string][]
                ).map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {kind !== 'horizontal' && slider('a', pa, setPa, -5, 5, 0.5, 'accent-blue-600')}
              {kind !== 'vertical' && slider('b', pb, setPb, -5, 5, 0.5, 'accent-purple-600')}
              <div className="grid grid-cols-2 gap-3">
                {slider('P első koordinátája', px, setPx, -6, 6, 0.5, 'accent-rose-600')}
                {slider('P második koordinátája', py, setPy, -6, 6, 0.5, 'accent-rose-600')}
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <input type="checkbox" checked={showVectors} onChange={(e) => setShowVectors(e.target.checked)} />
                Irány- és normálvektor mutatása
              </label>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>
                  Egyenes: <strong>{eqText}</strong>
                </div>
                <div>
                  P({fmt(px)}; {fmt(py)}) behelyettesítve: {lhs}
                </div>
                <div className={onLine ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                  {onLine ? 'A P pont rajta van az egyenesen.' : 'A P pont nincs rajta az egyenesen.'}
                </div>
                <div className="text-blue-700">irányvektor: →v({fmt(dir[0])}; {fmt(dir[1])})</div>
                <div className="text-rose-700">normálvektor: →n({fmt(nor[0])}; {fmt(nor[1])})</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Próbáld ki a tankönyvi pontokat az y = −x + 1 egyenesre (a = −1, b = 1): A(−4; 5), B(−1; 3), C(2; 2), D(5; −4)!
              </p>
            </div>
            <MidpointPlane
              x={[-7, 7]}
              y={[-7, 7]}
              unit={21}
              labels={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={[{ p: lineP, d: lineD, color: '#7c3aed', width: 2.4 }]}
              vecs={labVecs}
              rightAngles={labRA}
              points={[{ at: [px, py], label: 'P', dx: 9, dy: -6, color: onLine ? '#059669' : '#dc2626', r: 4.5 }]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Egyenes eltolása vektorral" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {slider('az eredeti egyenes: y = a · x, a', m, setM, -3, 3, 0.5, 'accent-green-600')}
              {slider('eltolásvektor első koordinátája v₁', v1, setV1, -5, 5, 0.5, 'accent-amber-600')}
              {slider('eltolásvektor második koordinátája v₂', v2, setV2, -5, 5, 0.5, 'accent-amber-600')}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setM(1);
                    setV1(0);
                    setV2(5);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  Tankönyv: y = x, →v(0; 5)
                </button>
                <button
                  onClick={() => {
                    setM(1);
                    setV1(3);
                    setV2(0);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  y = x, →v(3; 0)
                </button>
                <button
                  onClick={() => {
                    setM(2);
                    setV1(1);
                    setV2(2);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                >
                  Irányvektorral: y = 2x, →v(1; 2)
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>eredeti: {linesInPlaneEquation(m, 0)}</div>
                <div>(t; {fmt(m)}t) ↦ (t + {fmt(v1)}; {fmt(m)}t + {fmt(v2)})</div>
                <div>
                  kép: y = {fmt(m)}(x − {fmt(v1)}) + {fmt(v2)} ⇒ <strong>{linesInPlaneEquation(m, newB)}</strong>
                </div>
                <div className={parallelShift ? 'text-emerald-700 font-bold font-sans' : 'text-slate-500 font-sans text-xs'}>
                  {parallelShift
                    ? 'Az eltolásvektor párhuzamos az egyenessel (irányvektor vagy nullvektor): az egyenes önmagába megy át!'
                    : 'A kép párhuzamos az eredeti egyenessel: a = ' + fmt(m) + ' nem változik, csak b.'}
                </div>
              </div>
            </div>
            <MidpointPlane
              x={[-7, 7]}
              y={[-7, 7]}
              unit={21}
              labels={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={[
                { p: [0, 0], d: [1, m], color: '#059669', width: 2.2 },
                { p: [0, newB], d: [1, m], color: '#7c3aed', width: 2.2, dashed: parallelShift }
              ]}
              vecs={[{ from: baseSample, to: shiftedSample, color: '#b45309', width: 2.2, label: 'v', lx: -10, ly: -2 }]}
              points={[
                { at: baseSample, color: '#059669' },
                { at: shiftedSample, color: '#7c3aed' }
              ]}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LinesInPlaneTheory;
