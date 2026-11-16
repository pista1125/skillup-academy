import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeCylinder, Vec3 } from '../shared/Solid3DViewer';
import { CylinderPartsSvg, RectangleRotationSvg, PaperRollSvg, SpoonInPotSvg, LampShadeSvg } from './CylinderFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const CylinderTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: téglalap forgatása
  const [sideA, setSideA] = useState<number>(2.6);
  const [sideB, setSideB] = useState<number>(4.5);
  const [axisSide, setAxisSide] = useState<'a' | 'b'>('a');
  // Labor II: papírhenger
  const [w, setW] = useState<number>(21);
  const [l, setL] = useState<number>(29.5);
  const [glue, setGlue] = useState<'long' | 'short'>('long');

  // a tengely a választott oldal egyenese: az az oldal lesz a magasság, a másik a sugár
  const m1 = axisSide === 'a' ? sideA : sideB;
  const r1 = axisSide === 'a' ? sideB : sideA;
  const cyl = useMemo(() => makeCylinder(r1, m1, 48, 12), [r1, m1]);
  const axial: Vec3[] = [[-r1, 0, 0], [r1, 0, 0], [r1, m1, 0], [-r1, m1, 0]];

  // ha a hosszabb oldalakat ragasztjuk, a rövidebb oldal lesz a kerület
  const longS = Math.max(w, l);
  const shortS = Math.min(w, l);
  const circ = glue === 'long' ? shortS : longS;
  const m2 = glue === 'long' ? longS : shortS;
  const r2 = circ / (2 * Math.PI);
  const axialArea = 2 * r2 * m2;
  const diag = Math.hypot(2 * r2, m2);
  const sc = 150 / Math.max(2 * r2, m2);

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-henger"
      title="4. A henger"
      subtitle="Fazék, cilinder, jéghoki-korong, hirdetőoszlop: az egyenes körhenger részei, tengelymetszete és származtatása téglalap forgatásával."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="amber"
      pdfFilename="12_osztaly_a_henger_tananyag.pdf"
      practiceTitle="Készen állsz a hengeres feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ EGYENES KÖRHENGER',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-base font-black text-amber-900 dark:text-amber-200">tengelymetszet: 2r × m-es téglalap · kiterített palást: 2rπ × m</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Két egybevágó, párhuzamos körlap (alaplap, fedőlap) és a palást határolja.</li>
              <li>Az alkotók merőlegesek az alaplapra, hosszuk = a testmagasság (m).</li>
              <li>Téglalapot az egyik oldalegyenese körül forgatva forgáshengert kapunk: a tengelyen fekvő oldal a magasság, a másik a sugár.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: hengerek papírból" badge="Tankönyv 12. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A fazék, a cilinder, a jéghoki korongja és a hirdetőoszlop alakja ugyanaz a mértani test: az <strong>egyenes körhenger</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Ha egy téglalap alakú papírlap két szemközti oldalát átfedés és hézag nélkül összeillesztjük, a szabadon maradt oldalak kört formálnak: azok hossza a <strong>kör kerülete</strong>, az összeragasztott oldalak hossza a <strong>henger magassága</strong>.
              </li>
              <li>
                Egy névjegykártyát a tollba tűzve és megforgatva <strong>forgáshengert</strong> kapunk.
              </li>
              <li>Az összetekert A4-es lap elbírja a matekkönyvet – a hengeres forma kivételes teherbírású.</li>
            </ul>
          </div>
          <PaperRollSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Az egyenes körhenger részei" badge="Elmélet" badgeColor="indigo">
        <CylinderPartsSvg />
        <TheoryTable
          headers={['Rész', 'Jellemzés']}
          rows={[
            ['alaplap, fedőlap', 'két egybevágó, párhuzamos síkban lévő körlap (sugaruk r)'],
            ['palást', 'görbe felület; síkba kiterítve 2rπ × m-es téglalap'],
            ['alkotó', 'az alaplapra merőleges, palástra illeszkedő szakasz; hossza m'],
            ['tengely', 'a két körlap középpontját összekötő egyenes'],
            ['tengelymetszet', 'két párhuzamos átmérő és a végpontjaikba állított két alkotó által alkotott téglalap: 2r × m']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Forgáshenger" badge="forgatás" badgeColor="amber">
            <RectangleRotationSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">A téglalapot egyik oldalegyenese körül megforgatva keletkezik; a tengelyen fekvő oldal a magasság, a másik oldal az alapkör sugara.</p>
          </TheoryCard>
          <TheoryCard title="Egyenlő oldalú henger" badge="m = 2r" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha a tengelymetszet négyzet, akkor <strong>m = 2r</strong>, vagyis r : m = 1 : 2. A palást és az alapkör területének hányadosa 2rπm / (r²π) = 2m/r, ami a m/r hányados kétszerese.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Az A4-es lap tengelymetszete" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A 29,5 cm-es oldalakat ragasztjuk össze: m = 29,5 cm, a kerület 21 cm.</li>
              <li>2rπ = 21 ⇒ r ≈ 3,34 cm, 2r ≈ 6,68 cm.</li>
              <li>
                T_tengelymetszet = 2r · m ≈ 6,68 · 29,5 ≈ <strong>197,2 cm²</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A fakanál a fazékban" badge="3. feladat" badgeColor="purple">
            <SpoonInPotSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              r = 8 cm, m = 32 cm: a leghosszabb kanál a tengelymetszet átlója, √(16² + 32²) ≈ <strong>35,78 cm</strong>.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) A lámpaernyő foglalata" badge="4. feladat" badgeColor="amber">
            <LampShadeSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              A palást 1885 cm², a magasság 20 cm ⇒ a kerület 94,25 cm, R ≈ 15 cm. A 12 cm-es pálcák után a belső kör sugara 3 cm, <strong>átmérője 6 cm</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok" badge="HF" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>2,6 × 4,5 cm-es téglalap: a rövidebb oldal körül r = 4,5 cm, T_alap ≈ 63,62 cm²; a hosszabb körül r = 2,6 cm, T_alap ≈ 21,24 cm².</li>
              <li>32 cm-es négyzet alakú fólia: 32/π ≈ 10,19 cm átmérőjű, 32 cm hosszú cső palástjára elég.</li>
              <li>16 cm átmérőjű, 10 cm magas torta 8 cikkre vágva: egy cikk teteje 8π ≈ 25,13 cm² (kakaó), oldala 20π ≈ 62,83 cm² (máz).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: melyik oldal a sugár?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A forgatás tengelye és a sugár összekeverése"
          wrong="A 2,6 × 4,5-es téglalapot a rövidebb oldala körül forgatva r = 2,6 cm."
          wrongExplanation="A tengelyen fekvő oldal nem mozdul – ez lesz a magasság. A sugár a tengelyre merőleges oldal: itt 4,5 cm."
          correct="Forgástengely = az egyik oldal ⇒ m = ez az oldal, r = a másik oldal."
          correctExplanation="Papírhengernél hasonló: az összeragasztott oldal a magasság, a szabadon maradó oldal a kerület (2rπ), nem az átmérő!"
          tip="Tengelymetszetben az átmérő (2r) szerepel, nem a sugár: T = 2r · m."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: Téglalap forgatása" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a oldal: {fmt(sideA, 1)} cm</label>
                <input type="range" min="1" max="6" step="0.1" value={sideA} onChange={(e) => setSideA(Number(e.target.value))} className="w-full accent-amber-600" aria-label="a oldal" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">b oldal: {fmt(sideB, 1)} cm</label>
                <input type="range" min="1" max="6" step="0.1" value={sideB} onChange={(e) => setSideB(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="b oldal" />
              </div>
              <div className="flex gap-2">
                {(['a', 'b'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setAxisSide(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${axisSide === s ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    tengely: a(z) {s} oldal egyenese
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>magasság m = {fmt(m1, 1)} cm, sugár r = {fmt(r1, 1)} cm</div>
                <div>alapkör területe r²π = {fmt(r1 * r1 * Math.PI)} cm²</div>
                <div>tengelymetszet 2r · m = {fmt(2 * r1 * m1)} cm²</div>
                <div>{Math.abs(m1 - 2 * r1) < 0.05 ? 'egyenlő oldalú henger (m = 2r)!' : `m : 2r = ${fmt(m1 / (2 * r1))}`}</div>
              </div>
              <p className="text-xs text-slate-500 italic">A narancs téglalap a tengelymetszet – forgasd a testet, és nézd meg különböző irányokból!</p>
            </div>
            <Solid3DViewer
              solid={cyl}
              extras={[{ from: [0, -0.4, 0], to: [0, m1 + 0.4, 0], color: '#7c3aed', dashed: true, width: 1.5 }]}
              polygons={[{ points: axial, fill: '#f59e0b', opacity: 0.25, stroke: '#d97706' }]}
            />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: Henger egy papírlapból" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">egyik oldal (cm)</label>
                  <input type="number" min="1" step="0.1" value={w} onChange={(e) => setW(Math.max(1, Number(e.target.value) || 1))} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="egyik oldal" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">másik oldal (cm)</label>
                  <input type="number" min="1" step="0.1" value={l} onChange={(e) => setL(Math.max(1, Number(e.target.value) || 1))} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="másik oldal" />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setGlue('long')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${glue === 'long' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  a hosszabb oldalakat ragasztom
                </button>
                <button onClick={() => setGlue('short')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${glue === 'short' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  a rövidebb oldalakat ragasztom
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>kerület 2rπ = {fmt(circ, 1)} ⇒ r = {fmt(r2)} cm</div>
                <div>magasság m = {fmt(m2, 1)} cm</div>
                <div>tengelymetszet: 2r · m = <strong>{fmt(axialArea)} cm²</strong></div>
                <div>leghosszabb benne elférő pálca: √((2r)² + m²) = <strong>{fmt(diag)} cm</strong></div>
              </div>
              <TheoryCallout type="tip" title="Megfigyelés">
                A tengelymetszet területe mindkét ragasztásnál ugyanannyi: 2r · m = (kerület / π) · m = (a lap területe) / π. A4-re: 21 · 29,5 / π ≈ 197,2 cm².
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 240 200" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <rect x={120 - r2 * sc} y={100 - (m2 * sc) / 2} width={2 * r2 * sc} height={m2 * sc} fill="rgba(245,158,11,0.2)" stroke="#d97706" strokeWidth="2" />
              <line x1={120 - r2 * sc} y1={100 + (m2 * sc) / 2} x2={120 + r2 * sc} y2={100 - (m2 * sc) / 2} stroke="#dc2626" strokeWidth="2.4" />
              <text x="120" y={100 + (m2 * sc) / 2 + 14} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#059669">
                2r = {fmt(2 * r2)}
              </text>
              <text x={120 + r2 * sc + 6} y="104" fontSize="11" fontWeight="bold" fill="#2563eb">
                m
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CylinderTheory;
