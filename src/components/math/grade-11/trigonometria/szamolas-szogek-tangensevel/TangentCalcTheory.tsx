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
  CalculatorKeysSvg,
  TowerMeasurementRangeSvg,
  SlopePercentSvg,
  GardenRectangleSvg,
  InterpolationTableSvg
} from './TangentCalcFigures';

type AngleMode = 'DEG' | 'RAD' | 'GRAD';

const fmt = (x: number, d = 4) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : 'Hiba');
const toRadByMode = (x: number, mode: AngleMode) =>
  mode === 'DEG' ? (x * Math.PI) / 180 : mode === 'GRAD' ? (x * Math.PI) / 200 : x;
const fromRadByMode = (r: number, mode: AngleMode) =>
  mode === 'DEG' ? (r * 180) / Math.PI : mode === 'GRAD' ? (r * 200) / Math.PI : r;
const parseNum = (s: string) => Number(s.replace(',', '.'));

export const TangentCalcTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: számológép-szimulátor
  const [mode, setMode] = useState<AngleMode>('DEG');
  const [degPart, setDegPart] = useState<string>('14');
  const [minPart, setMinPart] = useState<string>('24');
  const [tgInput, setTgInput] = useState<string>('0,2308');

  // Labor II: meredekség és mérési bizonytalanság
  const [percent, setPercent] = useState<number>(9);
  const [distance, setDistance] = useState<number>(30);
  const [minAngle, setMinAngle] = useState<number>(36);
  const [maxAngle, setMaxAngle] = useState<number>(38);

  const decimalAngle = (parseNum(degPart) || 0) + (parseNum(minPart) || 0) / 60;
  const tanResult = Math.tan(toRadByMode(decimalAngle, mode));
  const correctTan = Math.tan((decimalAngle * Math.PI) / 180);
  const invResult = fromRadByMode(Math.atan(parseNum(tgInput)), mode);

  const slopeAngle = (Math.atan(percent / 100) * 180) / Math.PI;
  const lo = Math.min(minAngle, maxAngle);
  const hi = Math.max(minAngle, maxAngle);
  const hLo = distance * Math.tan((lo * Math.PI) / 180);
  const hHi = distance * Math.tan((hi * Math.PI) / 180);

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="szamolas-szogek-tangensevel"
      title="2. Számolás szögek tangensével"
      subtitle="A tan és a tan⁻¹ funkció a számológépen, fok–perc átváltás, mérési pontosság, lejtők meredeksége százalékban és a függvénytáblázat használata."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="cyan"
      pdfFilename="11_osztaly_szamolas_szogek_tangensevel_tananyag.pdf"
      practiceTitle="Készen állsz a számológépes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — TANGENS A SZÁMOLÓGÉPEN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-center font-mono text-xs font-black text-cyan-900 dark:text-cyan-200">
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-cyan-300">1. DEG (D) mód beállítása</div>
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-cyan-300">tan: szög → tg α</div>
              <div className="p-1.5 bg-white/80 dark:bg-slate-900/60 rounded border border-cyan-300">2ndf / SHIFT tan: tg α → szög</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Szögperc átváltása: <strong>14° 24′ = 14 + 24/60 = 14,4°</strong>.</li>
              <li>Lejtő meredeksége: <strong>p% ⇔ tg α = p / 100</strong> (100% = 45°).</li>
              <li>Mérési adatoknál ne írjunk ki több tizedesjegyet, mint amennyit a mérés pontossága indokol!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Számológép */}
      <TheorySection title="1. A tangens kiszámítása számológéppel" badge="Tankönyv 8. o." badgeColor="cyan">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CalculatorKeysSvg />
          <div className="space-y-3">
            <TheoryCard title="Először: fokban számoljon a gép!" badge="DRG / MODE" badgeColor="amber">
              <p className="text-sm text-slate-700 leading-relaxed">
                A szögeket nemcsak fokban mérhetjük. A kijelzőn <strong>D / DEG</strong> (fok), <strong>R / RAD</strong> (radián) vagy <strong>G / GRAD</strong> (gradián) jelenhet meg. A DRG gombbal, a MODE menüben vagy külön menüben válthatunk – a fokokhoz a <strong>D</strong> állás kell.
              </p>
            </TheoryCard>
            <TheoryCard title="tg 64° kiszámítása" badge="1. mintapélda" badgeColor="blue">
              <p className="text-sm text-slate-700 leading-relaxed">
                D módban: <strong>tan 64 =</strong> ⇒ 2,050303842, vagyis <strong>tg 64° ≈ 2,0503</strong>. Egysoros kijelzőjű gépeken előbb a 64-et kell beírni, és csak utána a tan gombot.
              </p>
            </TheoryCard>
            <TheoryCard title="tg 14° 24′ kiszámítása" badge="Szögperc" badgeColor="purple">
              <p className="text-sm text-slate-700 leading-relaxed">
                1° = 60′, ezért 14° 24′ = 14 + 24/60 = <strong>14,4°</strong>. Beírva: tan 14,4 = 0,25675636 ⇒ <strong>tg 14° 24′ ≈ 0,2568</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. tan⁻¹ */}
      <TheorySection title="2. Melyik szögnek ennyi a tangense? – a tan⁻¹ funkció" badge="Elmélet" badgeColor="indigo">
        <TheoryTable
          headers={['Feladat', 'Gombok', 'Kijelző (D mód)', 'Válasz']}
          rows={[
            ['tg α = 0,2308', '2ndf tan 0,2308 =', '12,99629059', 'α ≈ 13°'],
            ['tg α = 5', '2ndf tan 5 =', '78,69006753', 'α ≈ 78,69°'],
            ['tg α = 1', '2ndf tan 1 =', '45', 'α = 45°'],
            ['tg α = 0,09 (9%-os lejtő)', '2ndf tan 0,09 =', '5,142764558', 'α ≈ 5°']
          ]}
        />
        <TheoryCallout type="info" title="2ndf vagy SHIFT?">
          A 2ndf helyett egyes gépeken a vele azonos hatású SHIFT billentyű található. A tan⁻¹ (vagy tg⁻¹) funkció a tangens ismeretében megadja a megfelelő hegyesszög nagyságát.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladat */}
      <TheorySection title="3. Kidolgozott feladat: a mérés pontossága" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy osztály egy torony magasságát méri. A toronytól 30 m-re lévő pontból mért emelkedési szögek <strong>36° és 38°</strong> között szóródnak. Mit mondhatnak a magasságról?
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 font-mono text-xs space-y-1">
              <div>h / 30 = tg α ⇒ h = 30 · tg α</div>
              <div>α = 36° ⇒ h = 30 · tg 36° ≈ 21,8 m</div>
              <div>α = 38° ⇒ h = 30 · tg 38° ≈ 23,4 m</div>
              <div className="font-bold">⇒ 21,8 m &lt; h &lt; 23,4 m</div>
            </div>
            <p>
              Ha a mérések pontosabbak (<strong>36,5° és 37,5°</strong> között), a tartomány szűkebb: 30 · tg 36,5° ≈ 22,2 m és 30 · tg 37,5° ≈ 23,0 m.
            </p>
          </div>
          <TowerMeasurementRangeSvg />
        </div>
        <TheoryCallout type="tip" title="Megfigyelés">
          A hétköznapi szögmérésnél 1–2 fokos eltérés nem ritka, ezért nincs értelme a számológép sok tizedesjegyét kiírni: még ilyen kis távolságnál is akár 1 méteres a bizonytalanság. A csillagászok nagyon pontosan mérnek szöget, mégis több millió km-t tévedhetnek a hatalmas távolságok miatt.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Lejtők és kert */}
      <TheorySection title="4. Alkalmazások: lejtők meredeksége és a kert területe" badge="Feladatok" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Lejtők meredeksége százalékban" badge="6. feladat" badgeColor="emerald">
            <SlopePercentSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>9%: 100 m vízszintes úton 9 m emelkedés ⇒ tg α = 0,09 ⇒ α ≈ 5°.</li>
              <li>15°-os lejtő: tg 15° ≈ 0,268 ⇒ <strong>≈ 26,8%</strong>.</li>
              <li>250 m-t gurulva 23 m-rel lejjebb: vízszintesen √(250² − 23²) ≈ 248,9 m ⇒ 23 / 248,9 ≈ <strong>9,2%</strong>, α ≈ <strong>5,3°</strong>.</li>
              <li>100%-os meredekség: tg α = 1 ⇒ <strong>α = 45°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Mekkora lehet a kert területe?" badge="4. feladat" badgeColor="teal">
            <GardenRectangleSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A téglalap egyik oldala 25 m, az oldal és az átló szöge 39,5° és 40,5° közötti. A másik oldal 25 · tg α, így 25 · tg 39,5° ≈ 20,6 m és 25 · tg 40,5° ≈ 21,4 m között van. A terület tehát kb. <strong>515 m² és 534 m²</strong> közé esik.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: rossz szögmód a számológépen" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="RAD módban számolt tangens"
          wrong="R (RAD) módban: tan 64 = 2,3478…"
          wrongExplanation="A gép a 64-et radiánnak értelmezte! (64 radián ≈ 3667°.) Az eredmény teljesen más, mint tg 64°."
          correct="D (DEG) módban: tan 64 = 2,0503…"
          correctExplanation="Számolás előtt mindig ellenőrizd, hogy a kijelzőn D vagy DEG látható-e!"
          tip="Gyors ellenőrzés: D módban tan 45 = 1. Ha nem 1-et kapsz, rossz módban van a géped."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Számológép-szimulátor" badge="Labor" badgeColor="cyan">
        <div className="bg-white border-2 border-cyan-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Szögmód (DRG):</span>
            {(['DEG', 'RAD', 'GRAD'] as AngleMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === m ? 'bg-cyan-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-cyan-50 rounded-xl border border-cyan-200 p-4 space-y-3">
              <h5 className="font-bold text-cyan-900 text-sm">tan: szög → tangens</h5>
              <div className="flex items-center gap-2 text-sm">
                <input
                  value={degPart}
                  onChange={(e) => setDegPart(e.target.value)}
                  className="w-20 border border-slate-300 rounded-lg px-2 py-1"
                  aria-label="fok"
                />
                <span>°</span>
                <input
                  value={minPart}
                  onChange={(e) => setMinPart(e.target.value)}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1"
                  aria-label="perc"
                />
                <span>′</span>
              </div>
              <div className="text-xs text-slate-600">
                Tizedes fokban: {fmt(decimalAngle, 4)}° &nbsp;→&nbsp; beírva: <span className="font-mono">tan {fmt(decimalAngle, 4)} =</span>
              </div>
              <div className="bg-lime-100 border border-lime-400 rounded-lg p-2 text-right font-mono text-lg font-black text-lime-950">
                <span className="text-[10px] float-left text-lime-800">{mode}</span>
                {fmt(tanResult, 8)}
              </div>
              {mode !== 'DEG' && (
                <div className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2">
                  Figyelem! A gép {mode} módban van, a beírt számot nem fokként értelmezi. Fokban a helyes érték: tg {fmt(decimalAngle, 2)}° ≈ {fmt(correctTan, 4)}.
                </div>
              )}
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-3">
              <h5 className="font-bold text-amber-900 text-sm">2ndf tan: tangens → szög</h5>
              <input
                value={tgInput}
                onChange={(e) => setTgInput(e.target.value)}
                className="w-32 border border-slate-300 rounded-lg px-2 py-1 text-sm"
                aria-label="tangens érték"
              />
              <div className="text-xs text-slate-600">
                Beírva: <span className="font-mono">2ndf tan {tgInput} =</span>
              </div>
              <div className="bg-lime-100 border border-lime-400 rounded-lg p-2 text-right font-mono text-lg font-black text-lime-950">
                <span className="text-[10px] float-left text-lime-800">{mode}</span>
                {fmt(invResult, 8)}
              </div>
              <p className="text-xs text-slate-500 italic">Próbáld ki: 0,2308 → ≈ 13°; 5 → ≈ 78,69°; 1 → 45°.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Meredekség és mérési bizonytalanság" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="font-bold text-emerald-900 text-sm">A) Százalék ↔ fok</h5>
            <label className="block text-xs font-semibold text-slate-600">Meredekség: {percent}%</label>
            <input
              type="range"
              min="0"
              max="150"
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className="w-full accent-emerald-600"
              aria-label="meredekség százalék"
            />
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 font-mono text-sm text-emerald-900">
              tg α = {percent} / 100 = {fmt(percent / 100, 2)} ⇒ α ≈ <strong>{fmt(slopeAngle, 2)}°</strong>
            </div>
            <p className="text-xs text-slate-500 italic">
              Figyeld meg: a 100%-os lejtő 45°-os, nem 90°-os! 100 m vízszintes elmozduláshoz 100 m emelkedés tartozik.
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-emerald-900 text-sm">B) Magasság a szögmérés hibahatáraival</h5>
            <label className="block text-xs font-semibold text-slate-600">Távolság a toronytól: {distance} m</label>
            <input
              type="range"
              min="10"
              max="200"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-emerald-600"
              aria-label="távolság"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600">legkisebb mért szög: {minAngle}°</label>
                <input
                  type="range"
                  min="5"
                  max="85"
                  step="0.5"
                  value={minAngle}
                  onChange={(e) => setMinAngle(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  aria-label="legkisebb szög"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600">legnagyobb mért szög: {maxAngle}°</label>
                <input
                  type="range"
                  min="5"
                  max="85"
                  step="0.5"
                  value={maxAngle}
                  onChange={(e) => setMaxAngle(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="legnagyobb szög"
                />
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-xs text-slate-800 space-y-1">
              <div>h_min = {distance} · tg {fmt(lo, 1)}° ≈ {fmt(hLo, 1)} m</div>
              <div>h_max = {distance} · tg {fmt(hi, 1)}° ≈ {fmt(hHi, 1)} m</div>
              <div className="font-bold">bizonytalanság: ≈ {fmt(hHi - hLo, 1)} m</div>
            </div>
            <p className="text-xs text-slate-500 italic">
              Állítsd a szögeket 70° és 71° közé: ugyanaz az 1°-os hiba sokkal nagyobb magasságbeli eltérést okoz, mint 20° és 21° között!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 8. Ráadás */}
      <TheorySection title="8. Ráadás: a függvénytáblázat és a lineáris interpoláció" badge="Ráadás" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A számológépek előtt évszázados munkával összeállított táblázatokból dolgoztak. A <strong>Négyjegyű függvénytáblázatból</strong> leolvasható például: tg 14° 24′ ≈ 0,2568, illetve a 0,1370 tangensű szög 7° 48′ = 7,8°.
            </p>
            <p>
              Ha a keresett szög nincs a táblázatban, <strong>lineáris interpolációval</strong> közelítünk: feltételezzük, hogy két szomszédos táblázati érték között a tangens egyenletesen nő.
            </p>
          </div>
          <InterpolationTableSvg />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TangentCalcTheory;
