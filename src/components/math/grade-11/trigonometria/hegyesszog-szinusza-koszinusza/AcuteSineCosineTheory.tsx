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
  SinCosDefinitionSvg,
  MillimeterHypotenuseSvg,
  HikingPathSvg,
  IsoscelesApexSvg,
  CalculatorKeysSvg,
  RectangleDiagonalSvg
} from './AcuteSineCosineFigures';

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;
const hu = (x: number, digits = 2) => x.toFixed(digits).replace('.', ',');

export const AcuteSineCosineTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Lab 1: Átfogó és szög változtatása
  const [labAngle, setLabAngle] = useState<number>(35);
  const [labHyp, setLabHyp] = useState<number>(10);

  const opp = labHyp * Math.sin(toRad(labAngle));
  const adj = labHyp * Math.cos(toRad(labAngle));

  // SVG geometry for Lab 1
  const scale = 20;
  const ox = 30;
  const oy = 250;
  const bx = ox + adj * scale;
  const cy = oy - opp * scale;

  // Lab 2: Derékszögű háromszög számoló
  const [mode, setMode] = useState<'angle-hyp' | 'leg-hyp'>('angle-hyp');
  const [givenAngle, setGivenAngle] = useState<string>('40');
  const [givenHyp, setGivenHyp] = useState<string>('14');
  const [givenLeg, setGivenLeg] = useState<string>('17,3');
  const [givenHyp2, setGivenHyp2] = useState<string>('20');
  const [legType, setLegType] = useState<'opp' | 'adj'>('adj');

  const parse = (s: string) => Number(s.replace(',', '.'));

  const renderLab2Result = () => {
    if (mode === 'angle-hyp') {
      const a = parse(givenAngle);
      const c = parse(givenHyp);
      if (!(a > 0 && a < 90) || !(c > 0)) {
        return <p className="text-rose-700 font-semibold">Adj meg egy 0° és 90° közötti szöget és pozitív átfogót!</p>;
      }
      const o = c * Math.sin(toRad(a));
      const b = c * Math.cos(toRad(a));
      return (
        <div className="space-y-1 font-mono text-sm">
          <div>1. lépés: szemközti befogó = c · sin α = {hu(c, 1)} · sin {hu(a, 1)}° ≈ <strong>{hu(o)}</strong></div>
          <div>2. lépés: szög melletti befogó = c · cos α = {hu(c, 1)} · cos {hu(a, 1)}° ≈ <strong>{hu(b)}</strong></div>
          <div>3. lépés: a másik hegyesszög = 90° − {hu(a, 1)}° = <strong>{hu(90 - a, 1)}°</strong></div>
          <div className="text-xs text-slate-500">Ellenőrzés (Pitagorasz): {hu(o)}² + {hu(b)}² ≈ {hu(o * o + b * b, 1)} = {hu(c, 1)}² = {hu(c * c, 1)}</div>
        </div>
      );
    }
    const l = parse(givenLeg);
    const c = parse(givenHyp2);
    if (!(l > 0) || !(c > 0) || l >= c) {
      return <p className="text-rose-700 font-semibold">A befogó mindig rövidebb az átfogónál! (0 &lt; befogó &lt; átfogó)</p>;
    }
    const ratio = l / c;
    const alpha = legType === 'opp' ? toDeg(Math.asin(ratio)) : toDeg(Math.acos(ratio));
    return (
      <div className="space-y-1 font-mono text-sm">
        <div>
          1. lépés: {legType === 'opp' ? 'sin α' : 'cos α'} = {hu(l, 1)} / {hu(c, 1)} ≈ <strong>{hu(ratio, 4)}</strong>
        </div>
        <div>
          2. lépés: α = {legType === 'opp' ? 'sin⁻¹' : 'cos⁻¹'}({hu(ratio, 4)}) ≈ <strong>{hu(alpha, 1)}°</strong>
        </div>
        <div>3. lépés: a másik hegyesszög = 90° − α ≈ <strong>{hu(90 - alpha, 1)}°</strong></div>
        <div>4. lépés: a hiányzó befogó = √({hu(c, 1)}² − {hu(l, 1)}²) ≈ <strong>{hu(Math.sqrt(c * c - l * l))}</strong></div>
      </div>
    );
  };

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="hegyesszog-szinusza-koszinusza"
      title="3. Hegyesszög szinusza, koszinusza"
      subtitle="A szinusz és a koszinusz definíciója derékszögű háromszögben, számológép-használat (sin, cos, sin⁻¹, cos⁻¹), hiányzó oldalak és szögek kiszámítása valós helyzetekben."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — HEGYESSZÖG SZÖGFÜGGVÉNYEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 font-mono text-xs font-black text-indigo-900 dark:text-indigo-200 text-center">
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-indigo-300">
                sin α = szemközti befogó / átfogó
              </div>
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-indigo-300">
                cos α = szög melletti befogó / átfogó
              </div>
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-indigo-300">
                tg α = szemközti / melletti befogó
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Hegyesszögre:</strong> 0 &lt; sin α &lt; 1 és 0 &lt; cos α &lt; 1, mert a befogó mindig rövidebb az átfogónál.</li>
              <li><strong>Számológép:</strong> mindig DEG (D) módban számolj! Szögből érték: sin, cos; értékből szög: sin⁻¹, cos⁻¹.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: Felfedező feladat */}
      <TheorySection number={1} title="Felfedezés: mindig 25 mm az átfogó" badge="12. oldal" badgeColor="indigo">
        <p className="text-slate-700 leading-relaxed">
          A tankönyv első feladatában milliméterpapírra rajzolt derékszögű háromszögek átfogója mindig <strong>25 mm</strong>, csak a hegyesszög változik.
          Ha leolvassuk a befogókat és elosztjuk őket az átfogóval, azt tapasztaljuk, hogy az arány <strong>csak a szögtől függ</strong> — a háromszög méretétől nem
          (hiszen az azonos szögű derékszögű háromszögek hasonlók).
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MillimeterHypotenuseSvg />
          <TheoryTable
            headers={['Hegyesszög', 'Szemközti befogó (mm)', 'Melletti befogó (mm)', 'Szemközti / átfogó', 'Melletti / átfogó']}
            rows={[
              ['10°', '≈ 4,3', '≈ 24,6', '≈ 0,17', '≈ 0,98'],
              ['20°', '≈ 8,6', '≈ 23,5', '≈ 0,34', '≈ 0,94'],
              ['30°', '12,5', '≈ 21,7', '0,5', '≈ 0,87'],
              ['40°', '≈ 16,1', '≈ 19,2', '≈ 0,64', '≈ 0,77'],
              ['50°', '≈ 19,2', '≈ 16,1', '≈ 0,77', '≈ 0,64']
            ]}
          />
        </div>
        <TheoryCallout type="info" title="Mit figyelhetünk meg a táblázatban?">
          A 40° szemközti/átfogó aránya (≈ 0,64) megegyezik az 50° melletti/átfogó arányával — mert a 40° és az 50° egymás <strong>pótszögei</strong>.
          A leolvasás pontatlan, ezért a tankönyvi táblázat értékei néhány századdal eltérhetnek a számológéppel kapott pontos értékektől.
        </TheoryCallout>
      </TheorySection>

      {/* 2. SECTION: Definíció */}
      <TheorySection number={2} title="A szinusz és a koszinusz definíciója" badge="Elmélet" badgeColor="indigo">
        <div className="mb-4">
          <SinCosDefinitionSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szinusz (sin α)" badge="Definíció" badgeColor="emerald">
            <p className="text-slate-700 text-sm leading-relaxed">
              Ha egy derékszögű háromszög egyik hegyesszöge α, akkor a <strong>szöggel szemben lévő befogó és az átfogó</strong> hosszúságának hányadosát
              az α szinuszának nevezzük: <strong>sin α = a / c</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Koszinusz (cos α)" badge="Definíció" badgeColor="sky">
            <p className="text-slate-700 text-sm leading-relaxed">
              A <strong>szög mellett lévő befogó és az átfogó</strong> hosszúságának hányadosát az α koszinuszának nevezzük: <strong>cos α = b / c</strong>.
            </p>
          </TheoryCard>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed">
          A szögek szinuszát, koszinuszát és tangensét együtt a szögek <strong>szögfüggvényeinek</strong> nevezzük. A háromszög elhelyezkedése és betűzése sokféle lehet:
          ha egy másik háromszögben a φ szöggel szemközti befogó k, a melletti l, az átfogó m, akkor <strong>sin φ = k / m</strong>, <strong>cos φ = l / m</strong>, <strong>tg φ = k / l</strong>.
        </p>
        <TheoryCallout type="tip" title="Mindig jelöld be!">
          Mielőtt felírod a szögfüggvényt, jelöld be a rajzon a <strong>derékszöget</strong> és a feladatban szereplő <strong>hegyesszöget</strong>, majd azonosítsd: melyik az átfogó, melyik a szöggel szemközti, és melyik a szög melletti befogó.
        </TheoryCallout>
      </TheorySection>

      {/* 3. SECTION: Számológép */}
      <TheorySection number={3} title="Szögfüggvények a számológépen" badge="Számológép" badgeColor="amber">
        <CalculatorKeysSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szögből érték" badge="sin, cos" badgeColor="emerald">
            <p className="text-sm text-slate-700">Ismert szög esetén a <strong>sin</strong> vagy <strong>cos</strong> billentyűvel kapjuk meg az értéket: pl. sin 40° ≈ 0,6428, cos 40° ≈ 0,7660.</p>
          </TheoryCard>
          <TheoryCard title="Értékből szög" badge="sin⁻¹, cos⁻¹" badgeColor="amber">
            <p className="text-sm text-slate-700">Ha a szinusz vagy koszinusz ismert, a <strong>sin⁻¹</strong> (cos⁻¹) funkció adja vissza a hegyesszöget: pl. cos α = 0,865 ⇒ α = cos⁻¹(0,865) ≈ 30,1°.</p>
          </TheoryCard>
        </div>
        <TheoryTrapBox
          trap="A számológép radiánban számol"
          wrong="sin 30 = −0,988 (RAD módban)"
          wrongExplanation="Ha a gép RAD módban van, a 30-at radiánnak értelmezi, és teljesen más eredményt ad."
          correct="sin 30° = 0,5 (DEG módban)"
          correctExplanation="Először mindig ellenőrizd, hogy a kijelzőn D vagy DEG látható-e!"
          tip="Gyors ellenőrzés: sin 30° értékének pontosan 0,5-nek kell lennie."
        />
      </TheorySection>

      {/* 4. SECTION: Miért kisebb 1-nél? */}
      <TheorySection number={4} title="Miért nincs 1-nél nagyobb szinusz vagy koszinusz?" badge="Indoklás" badgeColor="rose">
        <p className="text-slate-700 leading-relaxed">
          A derékszögű háromszögben a leghosszabb oldal az átfogó (a legnagyobb szöggel, a derékszöggel szemben fekszik), ezért mindkét befogó <strong>rövidebb</strong> az átfogónál.
          Így a „befogó / átfogó” hányados mindig <strong>0 és 1 közé</strong> esik: 0 &lt; sin α &lt; 1 és 0 &lt; cos α &lt; 1.
        </p>
        <TheoryTrapBox
          trap="Lehetetlen érték"
          wrong="sin α = 1,2 ⇒ α = sin⁻¹(1,2)"
          wrongExplanation="A számológép hibát (Math ERROR) jelez, mert nincs ilyen hegyesszög."
          correct="0 < sin α < 1 minden hegyesszögre"
          correctExplanation="Ha 1-nél nagyobb hányadost kapsz, valószínűleg felcserélted az átfogót és a befogót."
        />
      </TheorySection>

      {/* 5. SECTION: Kidolgozott feladatok */}
      <TheorySection number={5} title="Kidolgozott feladatok a tankönyvből" badge="12–13. oldal" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">A) Turistaút a hegycsúcsra (3. feladat)</h4>
            <HikingPathSvg className="w-full h-auto" />
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Szintkülönbség: m = 500 · sin 15° ≈ <strong>129,4 m</strong>.</li>
              <li>• Vízszintes távolság: d = 500 · cos 15° ≈ 483 m.</li>
              <li>• Térképen (1 : 8000): 48 300 cm / 8000 ≈ <strong>6,04 cm</strong>.</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">B) Egyenlő szárú háromszög (4. feladat)</h4>
            <IsoscelesApexSvg className="w-full h-auto" />
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• A magasság felezi a 44°-os szárszöget: 22°-os szögű derékszögű háromszögek keletkeznek.</li>
              <li>• Alap: a = 2 · 14 · sin 22° ≈ <strong>10,49 cm</strong>.</li>
              <li>• Alaphoz tartozó magasság: m = 14 · cos 22° ≈ <strong>12,98 cm</strong>.</li>
              <li>• Szárhoz tartozó magasság (területből): m_b = a · m / 14 ≈ <strong>9,73 cm</strong>.</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">C) Téglalap átlója (2. b) feladat)</h4>
            <RectangleDiagonalSvg className="w-full h-auto" />
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• cos α = 17,3 / 20 = 0,865 ⇒ α ≈ <strong>30,1°</strong>.</li>
              <li>• Az átló a másik oldallal 90° − 30,1° ≈ <strong>59,9°</strong>-os szöget zár be.</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">D) Befogók a szögből (2. a) feladat)</h4>
            <ul className="text-xs text-slate-700 space-y-1">
              <li>• Átfogó 14 cm, egyik hegyesszög 40°.</li>
              <li>• Szemközti befogó: x = 14 · sin 40° ≈ <strong>9,0 cm</strong>.</li>
              <li>• Szög melletti befogó: y = 14 · cos 40° ≈ <strong>10,7 cm</strong>.</li>
              <li>• Házi feladat 1.: 0,5 m magas plató, 2 m-es palló ⇒ sin α = 0,25 ⇒ α ≈ <strong>14,5°</strong>.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 6. SECTION: Lab 1 */}
      <TheorySection number={6} title="Interaktív Laboratórium I: a szög dönt, nem a méret" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">Változtasd a szöget és az átfogót! Figyeld meg: a befogók hossza változik, de a sin α és cos α arány csak a szögtől függ.</p>
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hegyesszög α: {labAngle}°</label>
              <input type="range" min="5" max="85" value={labAngle} onChange={(e) => setLabAngle(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Átfogó c: {labHyp} cm</label>
              <input type="range" min="4" max="12" step="0.5" value={labHyp} onChange={(e) => setLabHyp(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg viewBox="0 0 320 270" className="w-full h-auto max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon points={`${ox},${oy} ${bx},${oy} ${bx},${cy}`} fill="#eef2ff" stroke="#4338ca" strokeWidth="2.5" strokeLinejoin="round" />
              <path d={`M ${bx - 12} ${oy} A 12 12 0 0 1 ${bx} ${oy - 12}`} fill="none" stroke="#4338ca" strokeWidth="1.2" />
              <circle cx={bx - 4.7} cy={oy - 4.7} r="1.7" fill="#4338ca" />
              <text x={ox + 30} y={oy - 6} fontSize="12" fontWeight="bold" fill="#b91c1c">α</text>
              <text x={(ox + bx) / 2} y={oy + 16} fontSize="11" textAnchor="middle" fill="#0369a1">b ≈ {hu(adj)}</text>
              <text x={bx + 4} y={(oy + cy) / 2} fontSize="11" fill="#047857">a ≈ {hu(opp)}</text>
              <text x={(ox + bx) / 2 - 12} y={(oy + cy) / 2 - 8} fontSize="11" fill="#7c2d12">c = {hu(labHyp, 1)}</text>
            </svg>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <div className="text-xs text-emerald-700 font-semibold">sin α = a / c</div>
                <div className="text-xl font-black text-emerald-900">{hu(Math.sin(toRad(labAngle)), 4)}</div>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
                <div className="text-xs text-sky-700 font-semibold">cos α = b / c</div>
                <div className="text-xl font-black text-sky-900">{hu(Math.cos(toRad(labAngle)), 4)}</div>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
                <div className="text-xs text-indigo-700 font-semibold">tg α = a / b</div>
                <div className="text-xl font-black text-indigo-900">{hu(Math.tan(toRad(labAngle)), 4)}</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <div className="text-xs text-amber-700 font-semibold">Pótszög: 90° − α</div>
                <div className="text-xl font-black text-amber-900">{90 - labAngle}°</div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. SECTION: Lab 2 */}
      <TheorySection number={7} title="Interaktív Laboratórium II: derékszögű háromszög-számoló" badge="Labor" badgeColor="teal">
        <p className="text-sm text-slate-600">Válaszd ki, mit ismersz, és a számoló lépésről lépésre megmutatja a megoldást!</p>
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode('angle-hyp')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${mode === 'angle-hyp' ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              📐 Szög + átfogó → befogók
            </button>
            <button
              onClick={() => setMode('leg-hyp')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${mode === 'leg-hyp' ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              📏 Befogó + átfogó → szög
            </button>
          </div>
          {mode === 'angle-hyp' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-xs font-semibold text-slate-600">
                Hegyesszög (°)
                <input aria-label="Hegyesszög" value={givenAngle} onChange={(e) => setGivenAngle(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                Átfogó
                <input aria-label="Átfogó" value={givenHyp} onChange={(e) => setGivenHyp(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="text-xs font-semibold text-slate-600">
                Befogó
                <input aria-label="Befogó" value={givenLeg} onChange={(e) => setGivenLeg(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                Átfogó
                <input aria-label="Átfogó 2" value={givenHyp2} onChange={(e) => setGivenHyp2(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm" />
              </label>
              <label className="text-xs font-semibold text-slate-600">
                A befogó a keresett α szögnek…
                <select value={legType} onChange={(e) => setLegType(e.target.value as 'opp' | 'adj')} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="opp">szemközti befogója (sin)</option>
                  <option value="adj">melletti befogója (cos)</option>
                </select>
              </label>
            </div>
          )}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-teal-900">{renderLab2Result()}</div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AcuteSineCosineTheory;
