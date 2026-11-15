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
  SpecialAnglesSvg,
  ComplementaryAnglesSvg,
  UnitHypotenuseSvg,
  MontserratCableCarSvg,
  ParasailingSvg,
  BuildingElevationSvg
} from './TrigPropertiesFigures';

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;
const hu = (x: number, digits = 4) => x.toFixed(digits).replace('.', ',');

export const TrigPropertiesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Lab 1: Összefüggések élőben
  const [alpha, setAlpha] = useState<number>(37);
  const s = Math.sin(toRad(alpha));
  const c = Math.cos(toRad(alpha));
  const t = Math.tan(toRad(alpha));

  // Lab 2: Egyikből a másik
  const [given, setGiven] = useState<'sin' | 'cos'>('sin');
  const [valueStr, setValueStr] = useState<string>('0,8');
  const value = Number(valueStr.replace(',', '.'));
  const valid = value > 0 && value < 1;
  const other = valid ? Math.sqrt(1 - value * value) : 0;
  const sinV = given === 'sin' ? value : other;
  const cosV = given === 'cos' ? value : other;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="a-szogfuggvenyek-tulajdonsagai"
      title="4. A szögfüggvények tulajdonságai"
      subtitle="A nevezetes szögek (30°, 45°, 60°) pontos szögfüggvényértékei, a pótszögek összefüggése, tg α = sin α / cos α, a sin²α + cos²α = 1 azonosság és a hegyesszögek szögfüggvényeinek értékkészlete."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="purple"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — A SZÖGFÜGGVÉNYEK TULAJDONSÁGAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 font-mono text-xs font-black text-purple-900 dark:text-purple-200 text-center">
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-purple-300">sin(90° − α) = cos α</div>
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-purple-300">tg α = sin α / cos α</div>
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-purple-300">sin²α + cos²α = 1</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Nevezetes értékek:</strong> sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2; tg 45° = 1.</li>
              <li><strong>Hegyesszögre:</strong> 0 &lt; sin α &lt; 1, 0 &lt; cos α &lt; 1, 0 &lt; tg α.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: Nevezetes szögek */}
      <TheorySection number={1} title="Kidolgozott feladat: a nevezetes szögek pontos értékei" badge="14. oldal" badgeColor="purple">
        <p className="text-slate-700 leading-relaxed">
          A <strong>szabályos háromszög</strong> magassága a háromszöget két 30°–60°–90°-os derékszögű háromszögre bontja: az átfogó <strong>a</strong>, a rövidebb befogó <strong>a/2</strong>,
          a magasság <strong>(√3/2)·a</strong>. Az <strong>egyenlő szárú derékszögű háromszögben</strong> a befogók <strong>b</strong> hosszúak, az átfogó <strong>b·√2</strong>.
          A szögfüggvények értékét a megfelelő oldalak elosztásával kapjuk, pl. sin 45° = b / (b·√2) = 1/√2 = √2/2.
        </p>
        <SpecialAnglesSvg />
        <TheoryTable
          headers={['α', 'sin α', 'cos α', 'tg α']}
          rows={[
            ['30°', '1/2', '√3/2', '√3/3'],
            ['45°', '√2/2', '√2/2', '1'],
            ['60°', '√3/2', '1/2', '√3']
          ]}
        />
        <TheoryCallout type="tip" title="Emlékeztető minta">
          A szinusz értékei 30°, 45°, 60° sorrendben: √1/2, √2/2, √3/2 — a koszinusznál ugyanez fordított sorrendben. A tangens: √3/3, 1, √3.
        </TheoryCallout>
      </TheorySection>

      {/* 2. SECTION: Pótszögek */}
      <TheorySection number={2} title="Pótszögek szögfüggvényei" badge="Elmélet 1." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ComplementaryAnglesSvg />
          <div className="space-y-3">
            <p className="text-slate-700 text-sm leading-relaxed">
              A derékszögű háromszög két hegyesszöge, α és β, <strong>pótszögek</strong>: α + β = 90°. Az α-val szemközti befogó éppen a β melletti befogó, ezért
              <strong> sin β = b/c = cos α</strong> és <strong>cos β = a/c = sin α</strong>.
            </p>
            <TheoryCard title="Szabály" badge="Pótszög" badgeColor="orange">
              <p className="text-sm text-slate-700">Hegyesszög szinusza egyenlő a pótszögének koszinuszával: <strong>sin α = cos(90° − α)</strong>, pl. sin 25° = cos 65°.</p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. SECTION: tg = sin/cos */}
      <TheorySection number={3} title="A tangens kifejezése a szinusszal és a koszinusszal" badge="Elmélet 2." badgeColor="indigo">
        <TheoryCard title="tg α = sin α / cos α" badge="Azonosság" badgeColor="indigo">
          <p className="text-sm text-slate-700 leading-relaxed">
            sin α / cos α = (a/c) / (b/c) = a/b = tg α. Tehát ha a szinusz és a koszinusz ismert, a tangens osztással adódik — nem kell külön háromszöget rajzolni.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 4. SECTION: Pitagoraszi azonosság */}
      <TheorySection number={4} title="A sin²α + cos²α = 1 azonosság" badge="Elmélet 3." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <UnitHypotenuseSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Vegyünk egy derékszögű háromszöget, amelynek az átfogója <strong>1 egység</strong>. Ekkor sin α = a/1, azaz a = sin α, és cos α = b/1, azaz b = cos α.
              A Pitagorasz-tétel szerint a² + b² = 1, vagyis <strong>(sin α)² + (cos α)² = 1</strong>.
            </p>
            <p>A szögfüggvény négyzetét így jelöljük: sin²α = (sin α)². Az azonosság segítségével a szinuszból kiszámítható a koszinusz, és fordítva:</p>
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 font-mono text-center text-teal-900 font-bold">
              cos α = √(1 − sin²α) &nbsp;|&nbsp; sin α = √(1 − cos²α)
            </div>
          </div>
        </div>
        <TheoryTrapBox
          trap="A négyzet helye"
          wrong="sin²α = sin(α²)"
          wrongExplanation="A sin²α jelölés a szinusz értékének négyzete, nem a szög négyzetének szinusza."
          correct="sin²α = (sin α)²"
          correctExplanation="Pl. sin²30° = (1/2)² = 1/4, míg sin(30²) = sin 900° egészen mást jelent."
          tip="Hegyesszögnél a gyökvonás után mindig a pozitív értéket vesszük, mert 0 < cos α."
        />
      </TheorySection>

      {/* 5. SECTION: Értékkészlet */}
      <TheorySection number={5} title="Milyen értékeket vehetnek fel a hegyesszögek szögfüggvényei?" badge="Elmélet 4." badgeColor="rose">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="0 < sin α < 1" badge="szinusz" badgeColor="emerald">
            <p className="text-sm text-slate-700">Két pozitív hosszúság hányadosa, és a befogó rövidebb az átfogónál.</p>
          </TheoryCard>
          <TheoryCard title="0 < cos α < 1" badge="koszinusz" badgeColor="sky">
            <p className="text-sm text-slate-700">Ugyanezért a koszinusz is 0 és 1 közé esik.</p>
          </TheoryCard>
          <TheoryCard title="0 < tg α" badge="tangens" badgeColor="amber">
            <p className="text-sm text-slate-700">Két befogó hányadosa: bármilyen pozitív szám lehet (pl. tg 80° ≈ 5,67).</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SECTION: Alkalmazások */}
      <TheorySection number={6} title="Alkalmazások a tankönyvből" badge="15. oldal" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">A) Montserrat drótkötélpálya (1. feladat)</h4>
            <MontserratCableCarSvg className="w-full h-auto" />
            <p className="text-xs text-slate-700">
              Ha a 680 m-es pálya végig 82°-ban emelkedne, a szintkülönbség 680 · sin 82° ≈ <strong>673 m</strong> lenne, nem 535 m. Egyenletes emelkedésnél sin α = 535/680 ⇒ α ≈ <strong>51,9°</strong>.
              A magyarázat: a 82° csak a pálya legmeredekebb szakaszára igaz.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">B) Siklóernyőzés (3. feladat)</h4>
            <ParasailingSvg className="w-full h-auto" />
            <p className="text-xs text-slate-700">
              80 · sin 35° ≈ <strong>45,9 m</strong> és 50 · sin 58° ≈ <strong>42,4 m</strong> ⇒ a 80 m-es kötélnél, 35°-nál száll magasabban.
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">C) Az épület magassága (HF 3.)</h4>
            <BuildingElevationSvg className="w-full h-auto" />
            <p className="text-xs text-slate-700">
              A szemmagasság fölötti rész 8 · tg 70° ≈ 21,98 m, így az épület ≈ 1,6 + 21,98 ≈ <strong>23,6 m</strong> magas.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCallout type="success" title="4. feladat: sin α = 0,8">
            cos α = √(1 − 0,64) = √0,36 = <strong>0,6</strong>, tg α = 0,8 / 0,6 = <strong>4/3</strong>.
          </TheoryCallout>
          <TheoryCallout type="info" title="5. feladat: számológép nélkül">
            sin²37° + sin 37° − cos 53° + sin²53° = (sin²37° + cos²37°) + (sin 37° − sin 37°) = <strong>1</strong>, mert sin 53° = cos 37° és cos 53° = sin 37°.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. SECTION: Lab 1 */}
      <TheorySection number={7} title="Interaktív Laboratórium I: az összefüggések élőben" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">Mozgasd a csúszkát! Bármelyik hegyesszögnél teljesül a három összefüggés.</p>
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Hegyesszög α: {alpha}°</label>
            <input type="range" min="1" max="89" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full accent-purple-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <div className="text-xs text-emerald-700 font-semibold">sin α</div>
              <div className="text-xl font-black text-emerald-900">{hu(s)}</div>
            </div>
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
              <div className="text-xs text-sky-700 font-semibold">cos α</div>
              <div className="text-xl font-black text-sky-900">{hu(c)}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="text-xs text-amber-700 font-semibold">tg α</div>
              <div className="text-xl font-black text-amber-900">{hu(t)}</div>
            </div>
          </div>
          <div className="space-y-2 text-sm font-mono">
            <div className="bg-slate-50 border rounded-lg p-2">
              Pótszög: cos({90 - alpha}°) = {hu(Math.cos(toRad(90 - alpha)))} = sin {alpha}° ✓
            </div>
            <div className="bg-slate-50 border rounded-lg p-2">
              sin α / cos α = {hu(s)} / {hu(c)} = {hu(s / c)} = tg α ✓
            </div>
            <div className="bg-slate-50 border rounded-lg p-2">
              sin²α + cos²α = {hu(s * s)} + {hu(c * c)} = {hu(s * s + c * c, 2)} ✓
            </div>
          </div>
          <div aria-label="sin² és cos² sáv" className="flex h-6 w-full rounded-full overflow-hidden border border-slate-300">
            <div className="bg-emerald-400 text-[10px] font-bold text-emerald-950 flex items-center justify-center" style={{ width: `${s * s * 100}%` }}>
              sin²
            </div>
            <div className="bg-sky-400 text-[10px] font-bold text-sky-950 flex items-center justify-center" style={{ width: `${c * c * 100}%` }}>
              cos²
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center">A két sáv együtt mindig pontosan kitölti a teljes (1 hosszú) sávot.</p>
        </div>
      </TheorySection>

      {/* 8. SECTION: Lab 2 */}
      <TheorySection number={8} title="Interaktív Laboratórium II: egyikből a másik" badge="Labor" badgeColor="teal">
        <p className="text-sm text-slate-600">Add meg a szög szinuszát vagy koszinuszát: a sin²α + cos²α = 1 azonossággal kiszámoljuk a többit.</p>
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setGiven('sin')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${given === 'sin' ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Ismert: sin α
            </button>
            <button
              onClick={() => setGiven('cos')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${given === 'cos' ? 'bg-teal-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Ismert: cos α
            </button>
          </div>
          <label className="block text-xs font-semibold text-slate-600">
            {given === 'sin' ? 'sin α' : 'cos α'} értéke
            <input aria-label="Ismert érték" value={valueStr} onChange={(e) => setValueStr(e.target.value)} className="mt-1 w-full max-w-xs border rounded-lg px-3 py-2 text-sm block" />
          </label>
          {valid ? (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-teal-900 font-mono text-sm space-y-1">
              <div>
                1. lépés: {given === 'sin' ? 'cos α' : 'sin α'} = √(1 − {hu(value, 4)}²) = √{hu(1 - value * value, 4)} ≈ <strong>{hu(other)}</strong>
              </div>
              <div>
                2. lépés: tg α = sin α / cos α = {hu(sinV)} / {hu(cosV)} ≈ <strong>{hu(sinV / cosV)}</strong>
              </div>
              <div>3. lépés: α ≈ <strong>{hu(toDeg(Math.asin(sinV)), 2)}°</strong> (ellenőrzés számológéppel)</div>
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 font-semibold text-sm">
              Hegyesszög szinusza és koszinusza csak 0 és 1 közötti szám lehet!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TrigPropertiesTheory;
