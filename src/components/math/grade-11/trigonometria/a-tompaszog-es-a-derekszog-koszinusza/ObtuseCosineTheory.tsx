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
  UnitCircleAcuteSvg,
  UnitCircleObtuseSvg,
  RightAngleCosineSvg,
  CosineGraphSvg,
  IsoscelesObtuseSvg
} from './ObtuseCosineFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 4) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};

export const ObtuseCosineTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: egységkör 0°–180°
  const [angle, setAngle] = useState<number>(130);

  // Labor II: visszakeresés koszinuszból / szinuszból
  const [mode, setMode] = useState<'cos' | 'sin'>('cos');
  const [cosInput, setCosInput] = useState<number>(-0.591);
  const [sinInput, setSinInput] = useState<number>(0.7355);

  const cosA = Math.cos(toRad(angle));
  const sinA = Math.sin(toRad(angle));
  const supp = 180 - angle;
  const O = { x: 170, y: 170 };
  const R = 130;
  const P = { x: O.x + R * cosA, y: O.y - R * sinA };
  const Pm = { x: O.x - R * cosA, y: P.y };
  const kind = angle < 90 ? 'hegyesszög' : angle === 90 ? 'derékszög' : angle < 180 ? 'tompaszög' : 'egyenesszög';

  const cosClamped = Math.max(-1, Math.min(1, cosInput));
  const angleFromCos = toDeg(Math.acos(cosClamped));
  const sinFromCos = Math.sqrt(1 - cosClamped * cosClamped);
  const sinClamped = Math.max(0, Math.min(1, sinInput));
  const acuteFromSin = toDeg(Math.asin(sinClamped));
  const cosFromSin = Math.sqrt(1 - sinClamped * sinClamped);

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="a-tompaszog-es-a-derekszog-koszinusza"
      title="11. A tompaszög és a derékszög koszinusza"
      subtitle="Az egységkörön a P pont első koordinátája a szög koszinusza – így a koszinusz derékszögre és tompaszögre is kiterjeszthető, és tompaszögre negatív."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_tompaszog_derekszog_koszinusza_tananyag.pdf"
      practiceTitle="Készen állsz a tompaszögek koszinuszára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TOMPASZÖG ÉS DERÉKSZÖG KOSZINUSZA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                ha α tompaszög: cos α = −cos(180° − α); &nbsp; cos 90° = 0
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Az egységkör P pontjának koordinátái: <strong>P(cos α; sin α)</strong> – hegyes-, derék- és tompaszögre egyaránt.
              </li>
              <li>
                Hegyesszögre <strong>0 &lt; cos α &lt; 1</strong>, tompaszögre <strong>−1 &lt; cos α &lt; 0</strong>.
              </li>
              <li>
                Kiegészítő szögek (γ + δ = 180°): <strong>sin γ = sin δ</strong>, de <strong>cos γ = −cos δ</strong>. Mindig: <strong>sin² α + cos² α = 1</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a hegyesszög koszinusza az egységkörön" badge="Tankönyv 32. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Helyezzük el az α hegyesszöget a derékszögű koordináta-rendszerben! Vegyünk fel egy P pontot az I. síknegyedben úgy, hogy <strong>OP = 1 egység</strong>, és az OP szakasz α szöget zárjon be az x tengely pozitív félegyenesével. P rajta van az origó középpontú, 1 egység sugarú körön (<strong>egységkör</strong>).
            </p>
            <p>
              A keletkező derékszögű háromszög befogói éppen a P pont x és y koordinátája, az átfogó 1:
            </p>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center font-mono font-bold text-blue-900">
              sin α = y / 1 ⇒ y = sin α; &nbsp; cos α = x / 1 ⇒ x = cos α
            </div>
            <p>
              Vagyis a P pont koordinátái: <strong>P(cos α; sin α)</strong>. Ezt a tulajdonságot használjuk a koszinusz kiterjesztésére.
            </p>
          </div>
          <UnitCircleAcuteSvg />
        </div>
      </TheorySection>

      {/* 2. Tompaszög és derékszög */}
      <TheorySection title="2. A tompaszög és a derékszög koszinusza" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <UnitCircleObtuseSvg />
          <RightAngleCosineSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Tompaszög (b) feladat)" badge="II. síknegyed" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Vegyünk fel egy Q pontot a II. síknegyedben úgy, hogy OQ = 1, és OQ β tompaszöget zárjon be az x tengely pozitív félegyenesével. Legyen <strong>cos β</strong> a Q pont x koordinátája, <strong>sin β</strong> az y koordinátája: Q(cos β; sin β). Q tükörképe az y tengelyre a 180° − β hegyesszöghöz tartozik, ezért
              <strong> cos β = −cos(180° − β)</strong> és <strong>sin β = sin(180° − β)</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Derékszög (c) feladat)" badge="M(0; 1)" badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              A 90°-hoz tartozó pont az egységkörön M(0; 1). Ha azt akarjuk, hogy most is M(cos 90°; sin 90°) teljesüljön, akkor <strong>cos 90° = 0</strong> és <strong>sin 90° = 1</strong>. A gondolatmenet tetszőleges forgásszögre is folytatható – ekkor figyelni kell a forgás irányára is.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Definíció" badge="tompaszög" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Tompaszög koszinusza egyenlő kiegészítő szöge koszinuszának ellentettjével.</strong> Vagyis ha α tompaszög, akkor <strong>cos α = −cos(180° − α)</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Definíció" badge="derékszög" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Derékszög koszinusza 0</strong>, vagyis cos 90° = 0. Akár hegyesszög, akár derékszög, akár tompaszög az α, teljesül, hogy <strong>sin² α + cos² α = 1</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Előjelek, táblázat */}
      <TheorySection title="3. Előjelek és értékek – az 1. feladat táblázata" badge="Feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CosineGraphSvg />
          <TheoryTable
            headers={['', 'α hegyesszög', 'β tompaszög', 'γ és δ kiegészítő szögek']}
            rows={[
              ['sin', '0 < sin α < 1', '0 < sin β < 1', 'sin γ = sin δ'],
              ['cos', '0 < cos α < 1', '−1 < cos β < 0', 'cos γ = −cos δ']
            ]}
          />
        </div>
        <TheoryTable
          headers={['α', '92°', '102°', '112°', '122°', '132°', '142°', '152°', '162°', '172°']}
          rows={[
            ['sin α', '0,9994', '0,9781', '0,9272', '0,8480', '0,7431', '0,6157', '0,4695', '0,3090', '0,1392'],
            ['cos α', '−0,0349', '−0,2079', '−0,3746', '−0,5299', '−0,6691', '−0,7880', '−0,8829', '−0,9511', '−0,9903']
          ]}
        />
        <TheoryCallout type="tip" title="Számológéppel">
          A számológép a <strong>cos</strong> billentyűvel tompaszög koszinuszát is megadja. Visszafelé is egyszerű: ha negatív koszinuszértéket adunk meg, a <strong>cos⁻¹</strong> funkció a hozzá tartozó <strong>tompaszöget</strong> adja (pl. cos⁻¹(−0,5) = 120°). A koszinusz 0° és 180° között egyértelműen meghatározza a szöget – a szinusznál ez nem így van!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Háromszög harmadik szöge" badge="2. feladat" badgeColor="sky">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p><strong>a)</strong> Két szög koszinusza 0,5 és 0.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>cos α = 0,5 ⇒ α = 60°; cos β = 0 ⇒ β = 90°</li>
                <li>γ = 180° − 60° − 90° = 30°</li>
                <li><strong>cos γ = √3/2 ≈ 0,866; sin γ = 1/2</strong></li>
              </ul>
              <p><strong>b)</strong> Két szög koszinusza √3/2 és −0,5.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>cos α = √3/2 ⇒ α = 30°; cos β = −0,5 ⇒ β = 120° (tompaszög!)</li>
                <li>γ = 180° − 30° − 120° = 30°</li>
                <li><strong>cos γ = √3/2; sin γ = 1/2</strong></li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Koszinusz a szinuszból" badge="3. feladat" badgeColor="purple">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Mennyi lehet cos α, ha sin α = √2/2, illetve 0,7355?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>sin² α + cos² α = 1 ⇒ cos α = ±√(1 − sin² α)</li>
                <li>A pozitív szinuszhoz egy hegyesszög és egy tompaszög is tartozik, ezért <strong>két érték</strong> lehetséges.</li>
                <li>sin α = √2/2 ⇒ cos α = <strong>√2/2</strong> (α = 45°) vagy <strong>−√2/2</strong> (α = 135°)</li>
                <li>sin α = 0,7355 ⇒ cos α ≈ <strong>0,6775</strong> (α ≈ 47,3°) vagy <strong>−0,6775</strong> (α ≈ 132,7°)</li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="C) Egyenlő szárú háromszög, cos = −0,777" badge="4. a) feladat" badgeColor="rose">
            <IsoscelesObtuseSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Negatív koszinusz ⇒ a szög tompaszög. Egy háromszögben legfeljebb egy tompaszög van, és az alapon fekvő két szög egyenlő ⇒ ez csak a <strong>szárszög</strong> lehet: γ = cos⁻¹(−0,777) ≈ 141,0°.</li>
              <li>sin γ = √(1 − 0,777²) ≈ 0,6295.</li>
              <li>Alapon fekvő szögek: (180° − 141,0°) / 2 ≈ 19,5°; sin ≈ 0,3339, cos ≈ 0,9426.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Egyenlő szárú háromszög, cos = 0,726" badge="4. b) feladat" badgeColor="emerald">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>A 0,726 koszinuszú szög hegyesszög: cos⁻¹ 0,726 ≈ 43,4°, sin ≈ 0,6877. Két eset van:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Alapon fekvő szög:</strong> a szárszög 180° − 2 · 43,4° ≈ 93,1° (tompaszög!): sin ≈ 0,9985, cos ≈ −0,0542.</li>
                <li><strong>Szárszög:</strong> az alapon fekvő szögek (180° − 43,4°) / 2 ≈ 68,3°: sin ≈ 0,9290, cos ≈ 0,3701.</li>
              </ul>
              <p className="text-xs text-slate-500">
                (A 4. c) feladatban sin = 0,428 ⇒ a szög ≈ 25,3° vagy ≈ 154,7° – itt már három eset is adódik.)
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: a koszinusz előjele" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A kiegészítő szög koszinusza nem ugyanannyi"
          wrong="cos 120° = cos 60° = 0,5"
          wrongExplanation="A kiegészítő szögek szinusza egyenlő, de a koszinuszuk egymás ellentettje! A tompaszög koszinusza mindig negatív."
          correct="cos 120° = −cos(180° − 120°) = −cos 60° = −0,5"
          correctExplanation="Az egységkörön a 120°-hoz tartozó pont a II. síknegyedben van, x koordinátája negatív."
          tip="Fordítva is figyelj: sin α ismeretében cos α = ±√(1 − sin² α) – a pozitív és a negatív érték is szóba jöhet, ha a szög tompaszög is lehet."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Egységkör 0° és 180° között" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  α forgásszög: {angle}° ({kind})
                </label>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  aria-label="alfa szög"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-red-50 rounded-xl p-2 border border-red-200">
                  <div className="text-[11px] text-slate-500">cos α (x)</div>
                  <div className="font-mono font-black text-red-900">{fmt(cosA)}</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">sin α (y)</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(sinA)}</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">sin² α + cos² α</div>
                  <div className="font-mono font-black text-amber-900">{fmt(sinA * sinA + cosA * cosA, 2)}</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>kiegészítő szög: 180° − {angle}° = {supp}°</div>
                <div>cos {supp}° = {fmt(Math.cos(toRad(supp)))} ⇒ cos {angle}° = −cos {supp}° = <strong>{fmt(cosA)}</strong></div>
                <div>sin {supp}° = sin {angle}° = <strong>{fmt(sinA)}</strong></div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Figyeld meg: a pont és a kiegészítő szöghöz tartozó szürke pont egymás tükörképei az y tengelyre – az y koordináta (szinusz) azonos, az x koordináta (koszinusz) ellentett.
              </p>
            </div>
            <svg viewBox="0 0 340 210" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="20" y1={O.y} x2="320" y2={O.y} stroke="#475569" strokeWidth="1.2" />
              <line x1={O.x} y1="195" x2={O.x} y2="20" stroke="#475569" strokeWidth="1.2" />
              <path d={`M ${O.x + R} ${O.y} A ${R} ${R} 0 0 0 ${O.x - R} ${O.y}`} fill="none" stroke="#94a3b8" strokeDasharray="5 4" />
              <line x1={O.x} y1={O.y} x2={Pm.x} y2={Pm.y} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 4" />
              <circle cx={Pm.x} cy={Pm.y} r="4" fill="#cbd5e1" />
              <line x1={O.x} y1={O.y} x2={P.x} y2={O.y} stroke="#dc2626" strokeWidth="4" />
              <line x1={P.x} y1={O.y} x2={P.x} y2={P.y} stroke="#059669" strokeWidth="4" />
              <line x1={O.x} y1={O.y} x2={P.x} y2={P.y} stroke="#0f172a" strokeWidth="2.5" />
              <circle cx={P.x} cy={P.y} r="5" fill="#7c3aed" />
              <text x={O.x + 18} y={O.y - 6} fontSize="11" fontWeight="bold" fill="#b91c1c">{angle}°</text>
              <text x={O.x + R - 4} y={O.y + 14} fontSize="10" fill="#334155">1</text>
              <text x={O.x - R - 10} y={O.y + 14} fontSize="10" fill="#334155">−1</text>
              <text x={P.x + (cosA < 0 ? -8 : 8)} y={P.y - 8} fontSize="11" fontWeight="bold" textAnchor={cosA < 0 ? 'end' : 'start'} fill="#5b21b6">
                P({fmt(cosA, 2)}; {fmt(sinA, 2)})
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Szögkereső – cos⁻¹ és a két lehetőség" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('cos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'cos' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Ismert: cos α
            </button>
            <button
              onClick={() => setMode('sin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'sin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              Ismert: sin α
            </button>
          </div>
          {mode === 'cos' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">cos α értéke: {fmt(cosClamped, 3)}</label>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.001"
                    value={cosClamped}
                    onChange={(e) => setCosInput(Number(e.target.value))}
                    className="w-full accent-purple-600"
                    aria-label="koszinusz érték"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">vagy írd be (−1 és 1 között)</label>
                  <input
                    type="number"
                    min="-1"
                    max="1"
                    step="0.001"
                    value={cosInput}
                    onChange={(e) => setCosInput(Number(e.target.value) || 0)}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label="koszinusz beírva"
                  />
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>α = cos⁻¹({fmt(cosClamped, 3)}) ≈ <strong>{fmt(angleFromCos, 2)}°</strong> ({cosClamped < 0 ? 'tompaszög' : cosClamped === 0 ? 'derékszög' : 'hegyesszög'})</div>
                <div>sin α = √(1 − cos² α) ≈ <strong>{fmt(sinFromCos)}</strong></div>
                <div>kiegészítő szög: {fmt(180 - angleFromCos, 2)}°, koszinusza {fmt(-cosClamped, 3)}</div>
              </div>
              <TheoryCallout type="info" title="Egyetlen megoldás">
                0° és 180° között minden −1 és 1 közötti koszinuszértékhez <strong>pontosan egy</strong> szög tartozik. Próbáld ki a házi feladat adataival: −0,591 ⇒ ≈ 126,2° (a paralelogramma tompaszöge).
              </TheoryCallout>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">sin α értéke: {fmt(sinClamped, 3)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.001"
                    value={sinClamped}
                    onChange={(e) => setSinInput(Number(e.target.value))}
                    className="w-full accent-purple-600"
                    aria-label="szinusz érték"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">vagy írd be (0 és 1 között)</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.001"
                    value={sinInput}
                    onChange={(e) => setSinInput(Number(e.target.value) || 0)}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label="szinusz beírva"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 space-y-1">
                  <div className="font-sans font-bold text-emerald-900">1. eset: hegyesszög</div>
                  <div>α ≈ {fmt(acuteFromSin, 2)}°</div>
                  <div>cos α ≈ <strong>{fmt(cosFromSin)}</strong></div>
                </div>
                <div className="bg-rose-50 rounded-xl border border-rose-200 p-3 space-y-1">
                  <div className="font-sans font-bold text-rose-900">2. eset: tompaszög</div>
                  <div>α ≈ {fmt(180 - acuteFromSin, 2)}°</div>
                  <div>cos α ≈ <strong>{fmt(-cosFromSin)}</strong></div>
                </div>
              </div>
              <TheoryCallout type="success" title="Két lehetőség">
                A szinusz nem határozza meg egyértelműen a szöget: sin α = 0,7355 esetén cos α ≈ 0,6775 vagy cos α ≈ −0,6775. (Ha sin α = 1, a két eset egybeesik: α = 90°, cos α = 0.)
              </TheoryCallout>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ObtuseCosineTheory;
