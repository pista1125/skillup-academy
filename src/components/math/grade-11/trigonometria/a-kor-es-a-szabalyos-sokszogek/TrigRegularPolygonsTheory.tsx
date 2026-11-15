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
  HubcapNonagonSvg,
  NonagonTriangleSvg,
  ArcSectorSvg,
  CircularSegmentSvg,
  ChordCircleSvg,
  PipeWaterSvg
} from './TrigRegularPolygonsFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const TrigRegularPolygonsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szabályos n-szög a körben
  const [n, setN] = useState<number>(9);
  const [R, setR] = useState<number>(17.5);

  // Labor II: körív, körcikk, körszelet
  const [r, setr] = useState<number>(8.4);
  const [alpha, setAlpha] = useState<number>(106);

  // Labor I számítások
  const central = 360 / n;
  const side = 2 * R * Math.sin(toRad(180 / n));
  const rho = R * Math.cos(toRad(180 / n));
  const perimeter = n * side;
  const area = (n * R * R * Math.sin(toRad(central))) / 2;
  const circleArea = Math.PI * R * R;
  const piPerimeter = perimeter / (2 * R);
  const piArea = area / (R * R);

  // Labor I rajz
  const LC = { x: 150, y: 150 };
  const LR = 120;
  const polyPts = Array.from({ length: n }, (_, i) => {
    const deg = 90 + i * central;
    return `${(LC.x + LR * Math.cos(toRad(deg))).toFixed(2)},${(LC.y - LR * Math.sin(toRad(deg))).toFixed(2)}`;
  }).join(' ');
  const v0 = { x: LC.x + LR * Math.cos(toRad(90)), y: LC.y - LR * Math.sin(toRad(90)) };
  const v1 = { x: LC.x + LR * Math.cos(toRad(90 + central)), y: LC.y - LR * Math.sin(toRad(90 + central)) };

  // Labor II számítások
  const arc = (r * Math.PI * alpha) / 180;
  const sector = (r * r * Math.PI * alpha) / 360;
  const triangleSigned = (r * r * Math.sin(toRad(alpha))) / 2;
  const segment = sector - triangleSigned;
  const chord = 2 * r * Math.sin(toRad(alpha / 2));

  // Labor II rajz
  const SC = { x: 150, y: 150 };
  const SR = 110;
  const from = 270 - alpha / 2;
  const to = from + alpha;
  const pA = { x: SC.x + SR * Math.cos(toRad(from)), y: SC.y - SR * Math.sin(toRad(from)) };
  const pB = { x: SC.x + SR * Math.cos(toRad(to)), y: SC.y - SR * Math.sin(toRad(to)) };
  const large = alpha > 180 ? 1 : 0;
  const sectorD = `M ${SC.x} ${SC.y} L ${pA.x.toFixed(2)} ${pA.y.toFixed(2)} A ${SR} ${SR} 0 ${large} 0 ${pB.x.toFixed(2)} ${pB.y.toFixed(2)} Z`;
  const segmentD = `M ${pA.x.toFixed(2)} ${pA.y.toFixed(2)} A ${SR} ${SR} 0 ${large} 0 ${pB.x.toFixed(2)} ${pB.y.toFixed(2)} Z`;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="a-kor-es-a-szabalyos-sokszogek"
      title="14. A kör és a szabályos sokszögek"
      subtitle="Dísztárcsák, érmék, terítők és csövek: a szabályos sokszögek oldala és területe, a körív, a körcikk és a körszelet kiszámítása szögfüggvényekkel."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_a_kor_es_a_szabalyos_sokszogek_tananyag.pdf"
      practiceTitle="Készen állsz a körös és sokszöges feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZABÁLYOS SOKSZÖG ÉS KÖR',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center space-y-1">
              <div className="font-mono text-sm font-black text-blue-900 dark:text-blue-200">
                középponti szög = 360° : n &nbsp;•&nbsp; a = 2R · sin(180° : n)
              </div>
              <div className="font-mono text-sm font-black text-blue-900 dark:text-blue-200">
                T = n · R² · sin(360° : n) / 2
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Körív:</strong> i = rπα / 180° &nbsp; <strong>Körcikk:</strong> t = r²πα / 360° = i · r / 2
              </li>
              <li>
                <strong>Körszelet:</strong> körcikk − AOB háromszög, ahol T(AOB) = r² · sin α / 2.
              </li>
              <li>A középponti szög, a körív hossza és a körcikk területe egyenesen arányos.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: a kilencküllős dísztárcsa" badge="Tankönyv 38. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az autók dísztárcsáin gyakran 7, 9, 10, 11 vagy 13 küllő van. Ha a szomszédos küllők „csúcspontjait” összekötjük, <strong>szabályos sokszöget</strong> kapunk. A szabályos kilencszög alakú tárcsa OA sugara <strong>17,5 cm</strong>.
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>a) Középponti szög:</strong> a 9 egybevágó háromszög a teljes szöget egyenlő részekre osztja: AOB∠ = 360° : 9 = <strong>40°</strong>.
              </li>
              <li>
                <strong>b) Oldal – első módszer (koszinusztétel):</strong> x² = 17,5² + 17,5² − 2 · 17,5 · 17,5 · cos 40°, így <strong>x ≈ 12 cm</strong>.
              </li>
              <li>
                <strong>b) Oldal – második módszer:</strong> az AOB egyenlő szárú háromszög OP magassága felezi a 40°-os szöget és az AB oldalt. Az APO derékszögű háromszögből AP = 17,5 · sin 20°, tehát x = 2 · AP ≈ <strong>12 cm</strong>.
              </li>
              <li>
                <strong>c) Terület:</strong> T(AOB) = ½ · 17,5² · sin 40° ≈ 98,4 cm², a kilencszög ennek 9-szerese: <strong>T ≈ 886 cm²</strong>.
              </li>
            </ol>
          </div>
          <div className="space-y-3">
            <HubcapNonagonSvg />
            <NonagonTriangleSvg />
          </div>
        </div>
      </TheorySection>

      {/* 2. Általános összefüggések */}
      <TheorySection title="2. A szabályos n-szög és a köré írt kör" badge="Általánosítás" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Felbontás n egybevágó háromszögre" badge="Módszer" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Egy R sugarú körbe írt szabályos n-szöget a középpontból a csúcsokba húzott sugarak <strong>n darab egybevágó, egyenlő szárú háromszögre</strong> bontják. Ezek szárai R hosszúak, a szárak szöge 360° : n. A háromszög alaphoz tartozó magassága a beírt kör sugara (ρ).
            </p>
          </TheoryCard>
          <TheoryCard title="Képletek" badge="sin, cos" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>oldal: a = 2R · sin(180° : n)</li>
              <li>beírt kör sugara: ρ = R · cos(180° : n)</li>
              <li>kerület: K = n · a</li>
              <li>terület: T = n · R² · sin(360° : n) / 2</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['n', 'Középponti szög', 'Oldal (R = 1)', 'Terület (R = 1)']}
          rows={[
            ['3', '120°', '≈ 1,732', '≈ 1,299'],
            ['4', '90°', '≈ 1,414', '2'],
            ['5', '72°', '≈ 1,176', '≈ 2,378'],
            ['6', '60°', '1', '≈ 2,598'],
            ['9', '40°', '≈ 0,684', '≈ 2,893'],
            ['12', '30°', '≈ 0,518', '3'],
            ['96', '3,75°', '≈ 0,065', '≈ 3,139']
          ]}
        />
        <TheoryCallout type="info" title="Megfigyelés: a kör felé">
          Az oldalszám növelésével a beírt sokszög területe egyre jobban megközelíti az egységkör területét, π ≈ 3,1416-ot. (Arkhimédész a 96-szöggel becsülte így π értékét.)
        </TheoryCallout>
      </TheorySection>

      {/* 3. Körív és körcikk */}
      <TheorySection title="3. Elmélet: körív és körcikk" badge="Elmélet" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy körben a <strong>középponti szögek</strong> nagysága, a hozzájuk tartozó <strong>körívek</strong> hosszúsága és a megfelelő <strong>körcikkek</strong> területe egyenesen arányos.
            </p>
            <p>
              Ha egy r cm sugarú körben a középponti szög fokokban mért értéke α, akkor a körív hossza a körkerület 360-ad részének α-szorosa:
            </p>
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-center font-mono font-bold text-teal-900">
              i = 2rπ · α / 360° = rπα / 180°
            </div>
            <p>A körcikk területe a körterület 360-ad részének α-szorosa:</p>
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-center font-mono font-bold text-teal-900">
              t = r²π · α / 360° = i · r / 2
            </div>
          </div>
          <ArcSectorSvg />
        </div>
      </TheorySection>

      {/* 4. Körszelet */}
      <TheorySection title="4. Elmélet: a körszelet területe" badge="Elmélet" badgeColor="indigo">
        <CircularSegmentSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A körszelet területét úgy kapjuk, hogy az α középponti szögű körcikk területéből kivonjuk az AOB háromszög területét. A háromszög területére a szinuszos területképlet a legkényelmesebb:
        </p>
        <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-center font-mono font-bold text-indigo-900">
          t(körszelet) = r²πα / 360° − r · r · sin α / 2
        </div>
        <TheoryCallout type="tip" title="A nagyobbik körszelet">
          A húr a kört két körszeletre vágja. A nagyobbikat a legegyszerűbb a körterületből kivonással kapni: r²π − (kisebbik körszelet).
        </TheoryCallout>
      </TheorySection>

      {/* 5. Kidolgozott feladatok */}
      <TheorySection title="5. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Húr a 8,4 cm sugarú körben" badge="1. feladat" badgeColor="sky">
            <ChordCircleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>AB = 1,6r = 13,44 cm. Az OAB háromszög magassága felezi a szöget: sin(α/2) = 0,8r : r = 0,8 ⇒ α/2 ≈ 53,13°, <strong>α ≈ 106,26°</strong>.</li>
              <li>T(AOB) = ½ · 8,4² · sin 106,26° ≈ <strong>33,87 cm²</strong>.</li>
              <li>Kisebbik ív: i = 8,4 · π · 106,26° / 180° ≈ <strong>15,58 cm</strong>; nagyobbik ív ≈ <strong>37,20 cm</strong>.</li>
              <li>Körcikkek: ≈ <strong>65,43 cm²</strong> és ≈ <strong>156,24 cm²</strong>.</li>
              <li>Körszeletek: 65,43 − 33,87 ≈ <strong>31,56 cm²</strong>, illetve 8,4²π − 31,56 ≈ <strong>190,11 cm²</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Víz a vízszintes csőben" badge="Házi feladat 1." badgeColor="purple">
            <PipeWaterSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>r = 30 cm, a víz 20 cm magas, így a vízfelszín 10 cm-rel a középpont alatt van: cos(α/2) = 10 : 30 ⇒ <strong>α ≈ 141,06°</strong>.</li>
              <li>Körszelet: 30²π · 141,06° / 360° − ½ · 30² · sin 141,06° ≈ 1107,9 − 282,8 ≈ <strong>825,0 cm²</strong>.</li>
              <li>A 2,6 m = 260 cm hosszú csőben: 825,0 · 260 ≈ 214 500 cm³ ≈ <strong>214,5 liter</strong> víz.</li>
              <li>Ez a cső térfogatának 825,0 : (30²π) ≈ <strong>29%</strong>-a.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Az 50 pennys érme" badge="2. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az alaplap szabályos hétszög, a köré írt kör sugara R = 27,3 : 2 = 13,65 mm = 1,365 cm.</li>
              <li>Alapterület: T = 7 · 1,365² · sin(360° : 7) / 2 ≈ <strong>5,10 cm²</strong>.</li>
              <li>Térfogat (vastagság 1,8 mm = 0,18 cm): V ≈ 5,10 · 0,18 ≈ <strong>0,918 cm³</strong>.</li>
              <li>Tömeg: m = V · ρ ≈ 0,918 · 8,7 ≈ <strong>8 g</strong> fémötvözet.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Terítők" badge="3. a) és HF 2. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong>140 cm széles terítő a 160 cm átmérőjű asztalon</strong> (közös középpont): a terítő szélei 70 cm-re vannak a középponttól, cos(α/2) = 70 : 80 ⇒ α ≈ 57,91°. Egy fedetlen körszelet ≈ 523,2 cm², a kettő együtt <strong>≈ 1046 cm²</strong> (az asztallap kb. 5,2%-a).
              </li>
              <li>
                <strong>Szabályos ötszög alakú terítő, R = 70 cm:</strong> a lefedhető legnagyobb kör a beírt kör: ρ = 70 · cos 36° ≈ 56,6 cm, átmérője <strong>≈ 113,3 cm</strong>. Zsinór (kerület): 5 · 2 · 70 · sin 36° ≈ <strong>411,4 cm</strong>. Átló: 2 · 70 · sin 72° ≈ <strong>133,1 cm</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a teljes vagy a fél középponti szög?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A szinusz a FÉL középponti szöghöz tartozik"
          wrong="a = R · sin(360° : n), például a kilencszögnél 17,5 · sin 40° ≈ 11,25 cm"
          wrongExplanation="A derékszögű háromszöget a magasság hozza létre, ami a középponti szöget is, az oldalt is FELEZI. A teljes 40°-os szöggel számolva rossz eredményt kapunk."
          correct="a = 2 · R · sin(180° : n), azaz 2 · 17,5 · sin 20° ≈ 12 cm"
          correctExplanation="Az APO derékszögű háromszögben a 20°-kal szemközti befogó az oldal FELE (AP), az átfogó a sugár."
          tip="A területképletben viszont a TELJES középponti szög szerepel: T(AOB) = R² · sin 40° / 2. Ne keverd a kettőt!"
        />
        <TheoryCallout type="warning" title="Körszelet ≠ körcikk">
          A körszelet a húr és az ív közötti rész. Ha a körcikk területét adod meg körszeletként, elfelejtetted kivonni az AOB háromszöget (pl. az 1. feladatban 65,43 cm² helyett 31,56 cm² a helyes).
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Szabályos n-szög a körben" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Oldalak száma: n = {n}</label>
                <input
                  type="range"
                  min="3"
                  max="60"
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  aria-label="oldalak száma"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Köré írt kör sugara: R = {fmt(R, 1)} cm</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={R}
                  onChange={(e) => setR(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="köré írt kör sugara"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">középponti szög</div>
                  <div className="font-mono font-black text-blue-900">{fmt(central, 2)}°</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">oldal a = 2R·sin(180°/n)</div>
                  <div className="font-mono font-black text-blue-900">{fmt(side)} cm</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">beírt kör sugara ρ</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(rho)} cm</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">kerület K</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(perimeter)} cm</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">terület T</div>
                  <div className="font-mono font-black text-amber-900">{fmt(area)} cm²</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">a kör területe R²π</div>
                  <div className="font-mono font-black text-amber-900">{fmt(circleArea)} cm²</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 font-mono space-y-1">
                <div>K : (2R) = {fmt(piPerimeter, 5)}</div>
                <div>T : R² = {fmt(piArea, 5)}</div>
                <div>A sokszög a körlap {fmt((area / circleArea) * 100, 2)}%-át fedi le.</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Növeld n-et! A K : (2R) és a T : R² hányados egyre közelebb kerül π ≈ 3,14159-hez. Próbáld ki a tankönyvi adatokat: n = 9, R = 17,5 cm ⇒ a ≈ 12 cm, T ≈ 886 cm².
              </p>
            </div>
            <svg viewBox="0 0 300 300" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <circle cx={LC.x} cy={LC.y} r={LR} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx={LC.x} cy={LC.y} r={LR * Math.cos(toRad(180 / n))} fill="none" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
              <polygon points={polyPts} fill="rgba(59,130,246,0.12)" stroke="#2563eb" strokeWidth="2" />
              <polygon
                points={`${LC.x},${LC.y} ${v0.x.toFixed(2)},${v0.y.toFixed(2)} ${v1.x.toFixed(2)},${v1.y.toFixed(2)}`}
                fill="rgba(245,158,11,0.35)"
                stroke="#d97706"
                strokeWidth="1.5"
              />
              <circle cx={LC.x} cy={LC.y} r="3" fill="#0f172a" />
              <text x="10" y="292" fontSize="11" fill="#475569">szaggatott: köré írt kör (szürke), beírt kör (zöld)</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Körív, körcikk, körszelet" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Sugár: r = {fmt(r, 1)} cm</label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="0.1"
                  value={r}
                  onChange={(e) => setr(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="sugár"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Középponti szög: α = {alpha}°</label>
                <input
                  type="range"
                  min="5"
                  max="355"
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="középponti szög"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>körív: i = rπα / 180° = <strong>{fmt(arc)} cm</strong></div>
                <div>körcikk: t = r²πα / 360° = <strong>{fmt(sector)} cm²</strong></div>
                <div>húr: AB = 2r · sin(α/2) = <strong>{fmt(chord)} cm</strong></div>
                <div>AOB háromszög: r² · sin α / 2 = <strong>{fmt(triangleSigned)} cm²</strong></div>
                <div className="text-blue-800">körszelet: t − T(AOB) = <strong>{fmt(segment)} cm²</strong></div>
                <div className="text-slate-500">a másik körszelet: r²π − {fmt(segment)} = {fmt(Math.PI * r * r - segment)} cm²</div>
              </div>
              {alpha > 180 && (
                <TheoryCallout type="info" title="180°-nál nagyobb középponti szög">
                  Ilyenkor sin α negatív, így a képlet automatikusan HOZZÁADJA a háromszög területét: a nagyobbik körszelet a körcikk és az AOB háromszög együttese.
                </TheoryCallout>
              )}
              <p className="text-xs text-slate-500 italic">
                Tankönyvi adatok: r = 8,4 cm és α ≈ 106° (1. feladat), vagy r = 30 cm és α ≈ 141° (a cső).
              </p>
            </div>
            <svg viewBox="0 0 300 300" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <circle cx={SC.x} cy={SC.y} r={SR} fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <path d={sectorD} fill="rgba(16,185,129,0.18)" stroke="#059669" strokeWidth="1.5" />
              <path d={segmentD} fill="rgba(59,130,246,0.35)" stroke="#2563eb" strokeWidth="2" />
              <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke="#1d4ed8" strokeWidth="2" />
              <circle cx={SC.x} cy={SC.y} r="3" fill="#0f172a" />
              <text x={SC.x - 6} y={SC.y - 8} fontSize="12" fontWeight="bold" fill="#0f172a">O</text>
              <text x={pA.x - 14} y={pA.y + 4} fontSize="12" fontWeight="bold" fill="#0f172a">A</text>
              <text x={pB.x + 6} y={pB.y + 4} fontSize="12" fontWeight="bold" fill="#0f172a">B</text>
              <text x="10" y="292" fontSize="11" fill="#475569">zöld: körcikk, kék: körszelet</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TrigRegularPolygonsTheory;
