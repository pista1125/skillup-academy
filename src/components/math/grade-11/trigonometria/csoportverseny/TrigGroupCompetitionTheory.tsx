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
  ParallelogramDiagonalsSvg,
  ParallelogramAreaSvg,
  TowerTriangleSvg,
  AmbiguousTrianglesSvg,
  Segment110Svg,
  SineCurveSvg
} from './TrigGroupCompetitionFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

type Letter = 'A' | 'B' | 'C' | 'D' | 'E';

const KEY: Record<Letter, number> = { A: 6, B: 0, C: 37, D: 180, E: 196 };

const STATIONS: { letter: Letter; task: string; hint: string }[] = [
  { letter: 'A', task: '1. Paralelogramma: átlók 30 és 50 mm, tompaszögük 120°. A kerület (kerekített oldalakkal) számjegyeinek összege.', hint: 'Fél átlók 15 és 25 mm, koszinusztétel 120°-kal és 60°-kal.' },
  { letter: 'B', task: '2. Paralelogramma: oldalak 10 és 70 mm, szögük 150°. A terület számjegyeinek szorzata.', hint: 'T = 10 · 70 · sin 150° – figyeld a számjegyeket!' },
  { letter: 'C', task: '3. Torony: PQ = 15 m, PQB∠ = 42°, QPB∠ = 53°, TQB∠ = 72°. A magasság egészre kerekítve.', hint: 'Szinusztétel a PQB háromszögben, majd tangens.' },
  { letter: 'D', task: '4. a = 50 mm, b = 74 mm, α = 37°. A β két lehetséges értékének összege.', hint: 'A két megoldás egymás kiegészítő szöge.' },
  { letter: 'E', task: '5. r = 20 cm, középponti szög 110°. A kisebbik körszelet területe egészre kerekítve.', hint: 'Körcikk − háromszög.' }
];

export const TrigGroupCompetitionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: versenyszimulátor
  const [answers, setAnswers] = useState<Record<Letter, string>>({ A: '', B: '', C: '', D: '', E: '' });
  const [checked, setChecked] = useState<Record<Letter, boolean>>({ A: false, B: false, C: false, D: false, E: false });
  const [corrections, setCorrections] = useState<number>(0);

  // Labor II: szinuszgörbe
  const [alpha, setAlpha] = useState<number>(30);

  const parse = (s: string) => Number(s.replace(',', '.'));
  const val = (l: Letter) => (answers[l].trim() === '' ? NaN : parse(answers[l]));
  const isOk = (l: Letter) => val(l) === KEY[l];
  const allFilled = (Object.keys(KEY) as Letter[]).every((l) => answers[l].trim() !== '');
  const finalValue = (15 * val('A') - val('D') / 2) * val('C') - val('B') ** 2 + val('E');
  const score = (Object.keys(KEY) as Letter[]).filter((l) => checked[l] && isOk(l)).length;

  const handleChange = (l: Letter, v: string) => {
    if (checked[l]) setCorrections((c) => c + 1);
    setAnswers((a) => ({ ...a, [l]: v }));
    setChecked((c) => ({ ...c, [l]: false }));
  };

  const reset = () => {
    setAnswers({ A: '', B: '', C: '', D: '', E: '' });
    setChecked({ A: false, B: false, C: false, D: false, E: false });
    setCorrections(0);
  };

  // Labor II rajz
  const X0 = 30;
  const Y0 = 170;
  const SX = 1.4;
  const SY = 130;
  const curve = Array.from({ length: 181 }, (_, d) => `${(X0 + d * SX).toFixed(2)},${(Y0 - Math.sin(toRad(d)) * SY).toFixed(2)}`).join(' ');
  const sinA = Math.sin(toRad(alpha));
  const supp = 180 - alpha;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="csoportverseny"
      title="15. Csoportverseny"
      subtitle="Négyfős csapatok, öt trigonometriai feladat, öt betű – és egy végeredmény. A fejezet eszközei (szinusz- és koszinusztétel, területképlet, körszelet) versenyhelyzetben."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_trigonometria_csoportverseny_tananyag.pdf"
      practiceTitle="Készen állsz a csapatversenyre?"
      practiceSubtitle="Gyakorold a fejezet feladattípusait a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A CSOPORTVERSENY MENETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-sm font-black text-blue-900 dark:text-blue-200">
                Végeredmény = (15 · A − D/2) · C − B² + E
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Négyfős csoportok oldják meg a 6 feladatot; a 6. feladat eredményét kell felírni a táblára.</li>
              <li>Az nyer, aki először írja fel a jó eredményt; mindegyik csoport <strong>egyszer javíthat</strong>.</li>
              <li>
                <strong>Jótanács:</strong> érdemes egy kicsit gondolkozni, mielőtt nekiugrotok a formális számolásnak!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. A verseny és az eszköztár */}
      <TheorySection title="1. A verseny menete és a fejezet eszköztára" badge="Tankönyv 40. o." badgeColor="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szervezés" badge="Csoportmunka" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Alkossatok négyfős csoportokat, és osszátok szét a feladatokat!</li>
              <li>Az 1–5. feladat eredményéből egy-egy betű (A, B, C, D, E) lesz, a 6. feladat ezekből számol.</li>
              <li>A végeredményt a felírás időpontjával együtt írjátok a táblára.</li>
              <li>A verseny végén az első 3 helyezett csapat bemutatja, milyen egyszerű módszereket alkalmazott – például melyik feladatnál nem kellett számolni.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Mit kell tudni?" badge="Ismétlés" badgeColor="emerald">
            <TheoryTable
              headers={['Eszköz', 'Képlet']}
              rows={[
                ['Szinusztétel', 'a : b = sin α : sin β'],
                ['Koszinusztétel', 'c² = a² + b² − 2ab · cos γ'],
                ['Területképlet', 'T = a · b · sin γ / 2'],
                ['Pótló szögek', 'sin(180° − α) = sin α'],
                ['Körszelet', 'r²πα / 360° − r² · sin α / 2']
              ]}
            />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Feladatok 1–2 */}
      <TheorySection title="2. Az 1. és a 2. feladat: paralelogrammák" badge="A és B" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat → A" badge="Koszinusztétel" badgeColor="sky">
            <ParallelogramDiagonalsSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az átlók felezik egymást, így a középpontnál 15 és 25 mm-es szakaszok fognak közre 120°-os, illetve 60°-os szöget. A hosszabb oldal: √(15² + 25² − 2 · 15 · 25 · cos 120°) = √1225 = <strong>35 mm</strong>; a rövidebb: √475 ≈ 21,79 ≈ <strong>22 mm</strong>. Kerület: 2 · (35 + 22) = 114 mm, ezért <strong>A = 1 + 1 + 4 = 6</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="2. feladat → B" badge="Területképlet" badgeColor="emerald">
            <ParallelogramAreaSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A paralelogramma a két oldal által kifeszített háromszög kétszerese: T = 10 · 70 · sin 150° = 700 · 0,5 = <strong>350 mm²</strong>. A számjegyek szorzata 3 · 5 · 0, tehát <strong>B = 0</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Feladatok 3–5 */}
      <TheorySection title="3. A 3–5. feladat: torony, két megoldás, körszelet" badge="C, D, E" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="3. feladat → C" badge="Szinusztétel + tangens" badgeColor="sky">
            <TowerTriangleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A vízszintes PQB háromszögben PBQ∠ = 180° − 42° − 53° = 85°.</li>
              <li>Szinusztétel: QB = 15 · sin 53° / sin 85° ≈ 12,03 m.</li>
              <li>A TBQ háromszög B-nél derékszögű: TB = QB · tg 72° ≈ 37,01 m, így <strong>C = 37</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. feladat → D" badge="Két megoldás" badgeColor="purple">
            <AmbiguousTrianglesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>sin β = 74 · sin 37° / 50 ≈ 0,8907 ⇒ β₁ ≈ 62,96° vagy β₂ ≈ 117,04° (mindkettő jó, mert α + β₂ &lt; 180°).</li>
              <li>
                <strong>Számolás nélkül:</strong> a két szög szinusza egyenlő, ezért egymás kiegészítő szögei: β₁ + β₂ = 180°, tehát <strong>D = 180</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryCard title="5. feladat → E" badge="Körszelet" badgeColor="rose">
            <Segment110Svg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Körcikk: 20² · π · 110° / 360° ≈ 383,97 cm²; háromszög: 20² · sin 110° / 2 ≈ 187,94 cm². A kisebbik körszelet ≈ 196,03 cm², így <strong>E = 196</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="6. feladat: a végeredmény" badge="Gondolkodj előbb!" badgeColor="amber">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p className="font-mono bg-amber-50 border border-amber-200 rounded-xl p-3 text-center font-bold text-amber-900">
                (15 · A − D/2) · C − B² + E
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>15 · A = 15 · 6 = 90 és D/2 = 180 / 2 = 90, ezért a zárójel értéke <strong>0</strong>.</li>
                <li>Így C értéke (a torony magassága) <strong>nem is számít</strong>: 0 · C = 0.</li>
                <li>B = 0 ⇒ B² = 0.</li>
                <li>
                  Végeredmény: 0 − 0 + 196 = <strong>196</strong> – tehát valójában csak az 1., a 4. és az 5. feladatot kellett kiszámolni, a 4.-et is fejben!
                </li>
              </ul>
            </div>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Az egyszerű módszerek (a verseny 2. pontja)">
          A 2. feladatnál elég észrevenni, hogy a terület 0-ra végződik (B = 0); a 4. feladatnál a két szög összege mindig 180°; a 3. feladatot pedig ki sem kell számolni, mert C szorzója 0. Aki ezt észreveszi, percekkel nyerhet!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Házi feladatok */}
      <TheorySection title="4. Házi feladatok" badge="Tankönyv 41. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Trapéz átlói" badge="Koszinusztétel" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Alapok 57 cm és 41 cm, a hosszabb alapon fekvő egyik szög 73°, a mellette fekvő szár 38 cm.</li>
              <li>Átló a 73°-os csúcsból: a két szár szöge a rövidebb alapnál 180° − 73° = 107°, így AC² = 38² + 41² − 2 · 38 · 41 · cos 107° ⇒ <strong>AC ≈ 63,5 cm</strong>.</li>
              <li>Másik átló: BD² = 57² + 38² − 2 · 57 · 38 · cos 73° ⇒ <strong>BD ≈ 58,5 cm</strong>.</li>
              <li>Másik szár (koordinátákkal vagy a BCD háromszögből): <strong>≈ 36,7 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Húrnégyszög a 2 cm sugarú körben" badge="Középponti szögek" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A K középpontnál 70°, 120°, 110° és 360° − 300° = 60° a középponti szögek.</li>
              <li>a) Húrnégyszögben a szemközti szögek összege <strong>180°</strong>.</li>
              <li>b) Oldalak: 2 · 2 · sin(φ/2): ≈ 2,29; ≈ 3,46; ≈ 3,28; 2 cm ⇒ <strong>K ≈ 11,04 cm</strong>. Terület: 4 háromszög, ½ · 2² · sin φ összege ⇒ <strong>T ≈ 7,22 cm²</strong>.</li>
              <li>c) Körszeletek: ≈ 0,56; ≈ 2,46; ≈ 1,96 és ≈ 0,36 cm².</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Ráadás: szinuszgörbe */}
      <TheorySection title="5. Ráadás: a szinuszgörbe" badge="Ráadás" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ábrázoljuk azt a függvényt, amely a 0°-nál nagyobb és 180°-nál kisebb szögekhez hozzárendeli a szög szinuszát! Számológéppel táblázatot készítünk, majd az összetartozó értékeket koordináta-rendszerben ábrázoljuk.
            </p>
            <TheoryTable
              headers={['α', '15°', '30°', '45°', '60°', '75°', '90°']}
              rows={[['sin α', '0,2588', '0,5', '0,7071', '0,866', '0,9659', '1']]}
            />
            <p>
              105°-tól 165°-ig ugyanezek az értékek jönnek visszafelé, mert sin(180° − α) = sin α. Minél több pontot rajzolunk be, annál pontosabban rajzolódik ki a <strong>szinuszgörbe</strong> – ezzel írja le a fizika a rezgőmozgást és a váltakozó áramot is.
            </p>
          </div>
          <SineCurveSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hibák versenyhelyzetben" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elveszett második megoldás a 4. feladatban"
          wrong="sin β ≈ 0,8907 ⇒ β ≈ 62,96°, és kész – D = 62,96"
          wrongExplanation="A számológép csak a hegyesszöget adja meg. Mivel sin(180° − β) = sin β, a 117,04° is megoldás, és mivel α + 117,04° < 180°, ez a háromszög is létezik."
          correct="β₁ ≈ 62,96°, β₂ ≈ 117,04°, összegük D = 180"
          correctExplanation="Ha a nagyobbik oldallal (b = 74) szemközti szöget keressük, két megoldás is lehet. Mindig ellenőrizd, hogy a tompaszögű változat belefér-e a háromszögbe!"
          tip="Az 1. feladatban a feladat kéri, hogy az oldalakat ELŐBB kerekítsd mm-re, és azokkal számold a kerületet: 2 · (35 + 22) = 114, nem 2 · 56,79 ≈ 113,6."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Versenyszimulátor" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Oldjátok meg a feladatokat, írjátok be a betűk értékét, és ellenőrizzétek! A 6. feladat végeredménye a beírt értékekből élőben számolódik. Javítani is lehet – a szimulátor számolja, hányszor javítottatok (a versenyen csak egyszer szabad!).
          </p>
          <div className="space-y-3">
            {STATIONS.map(({ letter, task, hint }) => (
              <div key={letter} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-center bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-sm text-slate-700">
                  <span className="font-black text-blue-800 mr-1">{letter} =</span> {task}
                  <div className="text-xs text-slate-500 italic mt-1">Tipp: {hint}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={answers[letter]}
                    onChange={(e) => handleChange(letter, e.target.value)}
                    className="w-24 border border-slate-300 rounded-lg px-2 py-1 text-sm font-mono"
                    aria-label={`${letter} értéke`}
                  />
                  <button
                    onClick={() => setChecked((c) => ({ ...c, [letter]: true }))}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white"
                  >
                    Ellenőrzés
                  </button>
                  {checked[letter] && (
                    <span className={`text-xs font-bold ${isOk(letter) ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isOk(letter) ? '✓ helyes' : '✗ nem jó'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
              <div className="text-[11px] text-slate-500">(15 · A − D/2) · C − B² + E</div>
              <div className="font-mono font-black text-amber-900 text-lg">{allFilled ? fmt(finalValue, 2) : '…'}</div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
              <div className="text-[11px] text-slate-500">helyes betűk</div>
              <div className="font-mono font-black text-emerald-900 text-lg">{score} / 5</div>
            </div>
            <div className="bg-rose-50 rounded-xl p-3 border border-rose-200">
              <div className="text-[11px] text-slate-500">javítások száma</div>
              <div className="font-mono font-black text-rose-900 text-lg">{corrections}</div>
            </div>
          </div>
          {allFilled && finalValue === 196 && (
            <TheoryCallout type="success" title="Gratulálunk!">
              A végeredmény 196 – felírhatjátok a táblára! Vegyétek észre: a zárójel 0, ezért C értéke nem is befolyásolja az eredményt.
            </TheoryCallout>
          )}
          <button onClick={reset} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 text-slate-700">
            Új verseny
          </button>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Szinuszgörbe-rajzoló" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">α = {alpha}°</label>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="alfa szög"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                  <div className="text-[11px] text-slate-500">sin {alpha}°</div>
                  <div className="font-mono font-black text-purple-900">{fmt(sinA, 4)}</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">sin {supp}° (= sin(180° − α))</div>
                  <div className="font-mono font-black text-amber-900">{fmt(Math.sin(toRad(supp)), 4)}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                A lila és a narancs pont mindig ugyanolyan magasan van: a görbe a 90°-os függőleges egyenesre szimmetrikus. Ezért ad a szinusztétel néha két megoldást (lásd a 4. versenyfeladatot)! 90°-nál a szinusz a legnagyobb: sin 90° = 1.
              </p>
            </div>
            <svg viewBox="0 0 300 200" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1={X0} y1={Y0} x2={X0 + 180 * SX + 10} y2={Y0} stroke="#475569" strokeWidth="1.2" />
              <line x1={X0} y1={Y0 + 5} x2={X0} y2={Y0 - SY - 15} stroke="#475569" strokeWidth="1.2" />
              <line x1={X0 + 90 * SX} y1={Y0} x2={X0 + 90 * SX} y2={Y0 - SY - 10} stroke="#cbd5e1" strokeDasharray="3 3" />
              <polyline points={curve} fill="none" stroke="#2563eb" strokeWidth="2" />
              <line x1={X0 + alpha * SX} y1={Y0 - sinA * SY} x2={X0 + supp * SX} y2={Y0 - sinA * SY} stroke="#94a3b8" strokeDasharray="4 3" />
              <line x1={X0 + alpha * SX} y1={Y0} x2={X0 + alpha * SX} y2={Y0 - sinA * SY} stroke="#7c3aed" strokeWidth="1.5" />
              <circle cx={X0 + alpha * SX} cy={Y0 - sinA * SY} r="5" fill="#7c3aed" />
              <circle cx={X0 + supp * SX} cy={Y0 - sinA * SY} r="5" fill="#f59e0b" />
              <text x={X0 - 6} y={Y0 - SY + 4} fontSize="10" textAnchor="end" fill="#334155">1</text>
              <text x={X0 + 90 * SX} y={Y0 + 14} fontSize="10" textAnchor="middle" fill="#334155">90°</text>
              <text x={X0 + 180 * SX} y={Y0 + 14} fontSize="10" textAnchor="middle" fill="#334155">180°</text>
              <text x={X0 - 4} y={Y0 + 14} fontSize="10" textAnchor="end" fill="#334155">0</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TrigGroupCompetitionTheory;
