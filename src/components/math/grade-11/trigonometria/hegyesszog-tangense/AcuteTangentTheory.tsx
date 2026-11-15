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
  WaterTowerSvg,
  SimilarRightTrianglesSvg,
  TangentDefinitionSvg,
  TangentFanSvg,
  RectangleDiagonalSvg
} from './AcuteTangentFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const AcuteTangentTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: tangens-legyező
  const [alpha, setAlpha] = useState<number>(38);
  const [adjacent, setAdjacent] = useState<number>(5);

  // Labor II: hiányzó oldalak
  const [tgValue, setTgValue] = useState<number>(0.75);
  const [knownSide, setKnownSide] = useState<'opposite' | 'adjacent'>('opposite');
  const [knownLength, setKnownLength] = useState<number>(12);

  const opposite = adjacent * Math.tan(toRad(alpha));

  // Labor I rajz méretezése
  const labMaxB = 270;
  const labScale = Math.min(1, 190 / (labMaxB * Math.tan(toRad(alpha))));
  const drawB = labMaxB * labScale * (adjacent / 10);
  const drawA = drawB * Math.tan(toRad(alpha));
  const LA = { x: 40, y: 210 };

  // Labor II számítások
  const oppLen = knownSide === 'opposite' ? knownLength : knownLength * tgValue;
  const adjLen = knownSide === 'adjacent' ? knownLength : knownLength / tgValue;
  const hyp = Math.hypot(oppLen, adjLen);
  const altitude = (oppLen * adjLen) / hyp;
  const alphaDeg = (Math.atan(tgValue) * 180) / Math.PI;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="hegyesszog-tangense"
      title="1. Hegyesszög tangense"
      subtitle="Hogyan mérhető meg egy víztorony magassága egyetlen szögméréssel? A hasonló derékszögű háromszögek befogóinak aránya – a tangens fogalma."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_hegyesszog_tangense_tananyag.pdf"
      practiceTitle="Készen állsz a tangenses feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HEGYESSZÖG TANGENSE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                tg α = (α-val szemközti befogó) : (α melletti befogó) = a / b
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Az arány <strong>csak a szögtől függ</strong>, a háromszög méretétől nem (a derékszögű háromszögek egy közös hegyesszög esetén hasonlók).
              </li>
              <li>
                Alkalmazás: <strong>szemközti befogó = melletti befogó · tg α</strong>, illetve <strong>melletti = szemközti : tg α</strong>.
              </li>
              <li>Nevezetes érték: tg 45° = 1 (egyenlő szárú derékszögű háromszög).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető probléma */}
      <TheorySection title="1. Bevezető: milyen magas a víztorony?" badge="Tankönyv 6. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A toronytól <strong>30 m</strong> távolságra lévő helyről a torony legfelső pontját <strong>38°</strong>-os emelkedési szögben látjuk. Hogyan határozható meg a magassága?
            </p>
            <p>
              <strong>Kicsinyítéssel és méréssel:</strong> milliméterpapírra rajzolunk egy 38°-os hegyesszögű derékszögű háromszöget. Ha a szög melletti befogó 50 mm, a szöggel szemközti befogó 39 mm. Az arány: 39 : 50 = <strong>0,78</strong>.
            </p>
            <p>
              Mivel minden 38°-os hegyesszögű derékszögű háromszög hasonló, ez az arány mindegyikben ugyanannyi. A torony magassága tehát:
            </p>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center font-mono font-bold text-blue-900">
              h = 30 · 0,78 = 23,4 ≈ 23 m
            </div>
          </div>
          <WaterTowerSvg />
        </div>
      </TheorySection>

      {/* 2. Definíció */}
      <TheorySection title="2. A hegyesszög tangensének definíciója" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SimilarRightTrianglesSvg />
          <TangentDefinitionSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Miért ugyanakkora az arány?" badge="Hasonlóság" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Hasonló háromszögekben a megfelelő oldalak aránya egyenlő. Két derékszögű háromszög hasonló, ha egyik hegyesszögük egyenlő – ezért a megfelelő befogók aránya is egyenlő: <strong>a / b = d / e</strong>. Adott α esetén ez az arány egy konkrét szám.
            </p>
          </TheoryCard>
          <TheoryCard title="Definíció" badge="tg α" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy derékszögű háromszög egyik hegyesszöge α, akkor a vele <strong>szemben lévő befogó</strong> és a <strong>mellette lévő befogó</strong> hosszának hányadosát az α <strong>tangensének</strong> nevezzük. Jelölése: <strong>tg α</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Megfigyelés">
          Egyetlen derékszögű háromszög segítségével sokféle probléma megoldható: minden olyan derékszögű háromszögre érvényes, amelynek van 38°-os szöge, vagy amelynek befogóinak aránya 0,78. Például ha a befogók 7,8 cm és 10 cm, akkor a kisebbik hegyesszög 38°-os.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Táblázat */}
      <TheorySection title="3. Tangensértékek méréssel – az 1. feladat táblázata" badge="Feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TangentFanSvg />
          <TheoryTable
            headers={['Hegyesszög', 'Szemközti befogó (mm)', 'Szög melletti befogó (mm)', 'Arányuk ≈ tg α']}
            rows={[
              ['5°', '4,4', '50', '0,09'],
              ['15°', '13,4', '50', '0,27'],
              ['25°', '23,3', '50', '0,47'],
              ['35°', '35,0', '50', '0,70'],
              ['45°', '50', '50', '1']
            ]}
          />
        </div>
        <TheoryCallout type="tip" title="Mit látunk a táblázatból?">
          A szög növekedésével a tangens is nő. 45°-nál a két befogó egyenlő, ezért tg 45° = 1. 45° alatt a tangens 1-nél kisebb, 45° fölött 1-nél nagyobb. (A táblázat mért értékei tizedmilliméteres pontosságúak, ezért kerekítettek.)
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Téglalap átlója és oldalai" badge="2. b) feladat" badgeColor="sky">
            <RectangleDiagonalSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Egy téglalap oldalai 23,5 cm és 50 cm. Az átló a hosszabb oldallal α szöget zár be: tg α = 23,5 / 50 = 0,47. A táblázat szerint <strong>α ≈ 25°</strong>, a rövidebb oldallal bezárt szög pedig <strong>90° − 25° = 65°</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="B) Hiányzó oldalak tangensből" badge="5. feladat" badgeColor="purple">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>
                Egy derékszögű háromszög egyik befogója 12 cm, az ezzel szemközti szög tangense 0,75. Számítsuk ki a többi oldalt és az átfogóhoz tartozó magasságot!
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>tg α = 12 / b = 0,75 ⇒ <strong>b = 12 : 0,75 = 16 cm</strong></li>
                <li>Pitagorasz-tétellel: c = √(12² + 16²) = √400 = <strong>20 cm</strong></li>
                <li>Területből: m<sub>c</sub> = a · b / c = 12 · 16 / 20 = <strong>9,6 cm</strong></li>
              </ul>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: melyik befogó van felül?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A szemközti és a melletti befogó felcserélése"
          wrong="tg α = (α melletti befogó) / (α-val szemközti befogó)"
          wrongExplanation="Ez éppen a másik hegyesszög (β = 90° − α) tangense lenne! Például 23,5/50 helyett 50/23,5 ≈ 2,13 a 65°-os szög tangense."
          correct="tg α = (α-val szemközti befogó) / (α melletti befogó)"
          correctExplanation="Mindig a szög csúcsából nézz: a szöggel szemben lévő befogó kerül a számlálóba, a szög egyik szárán fekvő befogó a nevezőbe."
          tip="A tangens csak derékszögű háromszögben, hegyesszögre értelmezett így – az átfogó nem szerepel a tangensben!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: A tangens nem függ a háromszög méretétől" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">α hegyesszög: {alpha}°</label>
                <input
                  type="range"
                  min="1"
                  max="80"
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  aria-label="alfa szög"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  α melletti befogó (b): {fmt(adjacent, 1)} cm
                </label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={adjacent}
                  onChange={(e) => setAdjacent(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="melletti befogó"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">szemközti (a)</div>
                  <div className="font-mono font-black text-blue-900">{fmt(opposite)} cm</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">melletti (b)</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(adjacent)} cm</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">a / b = tg α</div>
                  <div className="font-mono font-black text-amber-900">{fmt(opposite / adjacent, 4)}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Változtasd a befogó hosszát: a háromszög nő vagy zsugorodik, de az a / b arány változatlan marad. Csak a szög változtatása módosítja a tangenst!
              </p>
            </div>
            <svg viewBox="0 0 340 230" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon
                points={`${LA.x},${LA.y} ${LA.x + drawB},${LA.y} ${LA.x + drawB},${LA.y - drawA}`}
                fill="rgba(59,130,246,0.12)"
                stroke="#2563eb"
                strokeWidth="2"
              />
              <line x1={LA.x + drawB} y1={LA.y} x2={LA.x + drawB} y2={LA.y - drawA} stroke="#dc2626" strokeWidth="3" />
              <line x1={LA.x} y1={LA.y} x2={LA.x + drawB} y2={LA.y} stroke="#059669" strokeWidth="3" />
              <text x={LA.x + 30} y={LA.y - 8} fontSize="12" fontWeight="bold" fill="#b91c1c">{alpha}°</text>
              <text x={LA.x + drawB / 2} y={LA.y + 16} fontSize="11" textAnchor="middle" fill="#047857">b</text>
              <text x={LA.x + drawB + 8} y={LA.y - drawA / 2} fontSize="11" fill="#b91c1c">a</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Hiányzó oldalak a tangens ismeretében" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">tg α értéke: {fmt(tgValue, 2)}</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.05"
                value={tgValue}
                onChange={(e) => setTgValue(Number(e.target.value))}
                className="w-full accent-purple-600"
                aria-label="tangens érték"
              />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">Melyik befogót ismerjük?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setKnownSide('opposite')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${knownSide === 'opposite' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  α-val szemközti
                </button>
                <button
                  onClick={() => setKnownSide('adjacent')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${knownSide === 'adjacent' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  α melletti
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Ismert befogó hossza (cm)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={knownLength}
                onChange={(e) => setKnownLength(Math.max(0.1, Number(e.target.value) || 0.1))}
                className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="ismert befogó"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            {knownSide === 'opposite' ? (
              <div>1. melletti befogó: b = a : tg α = {fmt(knownLength)} : {fmt(tgValue)} = <strong>{fmt(adjLen)} cm</strong></div>
            ) : (
              <div>1. szemközti befogó: a = b · tg α = {fmt(knownLength)} · {fmt(tgValue)} = <strong>{fmt(oppLen)} cm</strong></div>
            )}
            <div>2. átfogó (Pitagorasz): c = √(a² + b²) = <strong>{fmt(hyp)} cm</strong></div>
            <div>3. átfogóhoz tartozó magasság: m = a · b / c = <strong>{fmt(altitude)} cm</strong></div>
            <div className="text-xs text-slate-500 pt-1">
              (Számológéppel – lásd a 2. leckét – a szög is meghatározható: α ≈ {fmt(alphaDeg, 1)}°)
            </div>
          </div>
          <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
            tg α = 0,75 és szemközti befogó 12 cm ⇒ b = 16 cm, c = 20 cm, m = 9,6 cm. Házi feladat: tg α = 0,55 és melletti befogó 1,6 cm ⇒ a = 0,88 cm, c ≈ 1,83 cm.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AcuteTangentTheory;
