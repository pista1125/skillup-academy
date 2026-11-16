import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { NotebookCoverSvg, RowsColumnsSvg, UnitChoicesSvg, VolleyballCourtsSvg, HalfAreaSvg } from './Area4Figures';

const TARGETS = [12, 18, 24, 16, 20];

type UnitKind = 'sq' | 'tri' | 'dom' | 'big';
const UNITS: { id: UnitKind; name: string; count: number; options: number[] }[] = [
  { id: 'sq', name: 'kis négyzet', count: 24, options: [24, 20, 12, 48] },
  { id: 'tri', name: 'fél négyzet (háromszög)', count: 48, options: [48, 12, 24, 36] },
  { id: 'dom', name: 'dominó (2 kis négyzet)', count: 12, options: [12, 48, 24, 10] },
  { id: 'big', name: 'nagy négyzet (2 · 2 kicsi)', count: 6, options: [6, 96, 12, 8] }
];

export const Area4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: téglalap-építő
  const [cols, setCols] = useState<number>(4);
  const [rows, setRows] = useState<number>(2);
  const [tIdx, setTIdx] = useState<number>(0);
  const [found, setFound] = useState<string[]>([]);
  const target = TARGETS[tIdx];
  const area = cols * rows;
  const key = `${Math.max(cols, rows)} · ${Math.min(cols, rows)}`;
  const isHit = area === target;

  const saveFound = () => {
    if (isHit && !found.includes(key)) setFound((f) => [...f, key]);
  };
  const nextTarget = () => {
    setTIdx((i) => (i + 1) % TARGETS.length);
    setFound([]);
  };

  // Labor II: egységváltó
  const [unit, setUnit] = useState<UnitKind>('sq');
  const [answer, setAnswer] = useState<number | null>(null);
  const cur = UNITS.find((x) => x.id === unit)!;

  const U = 30;
  const stepBtn = 'w-11 h-11 rounded-xl text-xl font-black bg-white border-2 border-slate-300 hover:bg-slate-100 active:scale-95 transition';

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="a-terulet-merese"
      title="3. A terület mérése"
      subtitle="Hány lap kell a füzet lefedéséhez? Hány járólap kell a padlóra? A területet egységekkel lefedve mérjük meg."
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="purple"
      pdfFilename="4_osztaly_a_terulet_merese_tananyag.pdf"
      practiceTitle="Készen állsz a területes feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A TERÜLET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
              <span className="font-mono text-base font-black text-purple-900 dark:text-purple-200">
                Terület (T) = hány egység fedi le a síkidomot hézag és átfedés nélkül
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Téglalapnál: <strong>egy sorban lévő négyzetek száma · sorok száma</strong> (például 6 · 3 = 18).
              </li>
              <li>Kisebb egységből több kell, nagyobb egységből kevesebb.</li>
              <li>Mindig mondd meg, mi volt az egység!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Mi a terület?" badge="Tankönyv 59. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Fedd le a matematikafüzetedet négyzet alakú logikai lapokkal úgy, hogy <strong>ne maradjon hézag</strong>, és a lapok <strong>ne fedjék egymást</strong>. Ahány lap kellett, annyi egység a füzet <strong>területe</strong>.
            </p>
            <p>
              Nagy lapokból kevesebb kell, kis lapokból több. Ezért mindig meg kell mondani, <strong>mi az egység</strong>.
            </p>
            <p>A terület jele: <strong>T</strong>. A kerület (K) a határ hossza, a terület (T) a belseje.</p>
          </div>
          <NotebookCoverSvg />
        </div>
      </TheorySection>

      {/* 2. Sorok és oszlopok */}
      <TheorySection title="2. Gyorsabban: sorok és oszlopok" badge="Munkafüzet 52. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RowsColumnsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy téglalapnál nem kell egyesével számolni! Nézd meg, hány négyzet van <strong>egy sorban</strong>, és <strong>hány sor</strong> van.
            </p>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center font-mono font-bold text-amber-900">
              egy sorban 6, 3 sor: 6 · 3 = 18 kis négyzet
            </div>
            <p>Ugyanígy: 5 · 6 = 30, 7 · 3 = 21, 4 · 5 = 20.</p>
          </div>
        </div>
        <TheoryTable
          headers={['Egy sorban', 'Sorok száma', 'Szorzás', 'Terület']}
          rows={[
            ['6', '2', '6 · 2', '12 egység'],
            ['5', '3', '5 · 3', '15 egység'],
            ['7', '3', '7 · 3', '21 egység'],
            ['6', '4', '6 · 4', '24 egység']
          ]}
        />
      </TheorySection>

      {/* 3. Egységek */}
      <TheorySection title="3. Más-más egység, más-más darabszám" badge="Tankönyv 59–60. o." badgeColor="sky">
        <UnitChoicesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kisebb egység → több darab" badge="háromszög" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Egy kis négyzetet 2 háromszögre vághatsz. Ezért háromszögből <strong>kétszer annyi</strong> kell: 16 kis négyzet = 32 háromszög.
            </p>
          </TheoryCard>
          <TheoryCard title="Nagyobb egység → kevesebb darab" badge="dominó, nagy négyzet" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              Egy dominó 2 kis négyzet: 16 : 2 = <strong>8 dominó</strong>. Egy nagy négyzet 4 kicsi: 16 : 4 = <strong>4 nagy négyzet</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Nézzük meg együtt! */}
      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <VolleyballCourtsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) Két sportpálya (Munkafüzet 4. feladat).</strong> Az egység egy 1 m oldalú négyzet.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Röplabdapálya: egy sorban 18, 9 sor: 18 · 9 = <strong>162 egység</strong></li>
              <li>Strandröplabdapálya: 16 · 8 = <strong>128 egység</strong></li>
              <li>A röplabdapálya 162 − 128 = <strong>34 egységgel</strong> nagyobb.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HalfAreaSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>B) Melyiknek nagyobb a területe? (Munkafüzet 6. feladat)</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A 6 · 6 = 36 négyzetnyi négyzetbe rajzolt alakzat a sarkokat levágja. A 4 levágott sarok éppen kirakja a belső alakzatot, így az <strong>18</strong> négyzetnyi.</li>
              <li>A 8 · 6 = 48 négyzetnyi téglalapba rajzolt háromszög területe a fele: <strong>24</strong> négyzetnyi.</li>
              <li>A nagyobb terület mindkét esetben a kisebbnek a <strong>2-szerese</strong>.</li>
            </ul>
          </div>
        </div>
        <TheoryCallout type="info" title="Csempézés (Tankönyv 6. feladat)">
          Egy fal 8 kis négyzet széles és 7 magas: 8 · 7 = 56 kis csempe kell. Ha a csempe 2 kis négyzetnyi, 56 : 2 = 28 darab kell. Ha 2 · 2 kis négyzetnyi, akkor 56 : 4 = 14 darab.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Vigyázz! */}
      <TheorySection title="5. Vigyázz! Terület vagy kerület?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A szélén lévő vonalakat számoltad?"
          wrong="A 4 · 3-as téglalap területe 14, mert körben 14 vonaldarab van."
          wrongExplanation="A határ vonaldarabjai a kerületet adják (4 + 3 + 4 + 3 = 14). A terület a belsejét lefedő négyzetek száma."
          correct="T = 4 · 3 = 12 kis négyzet, K = 14 egység"
          correctExplanation="Terület: négyzeteket számolunk. Kerület: a határ darabjait számoljuk."
          tip="Két síkidomnak lehet ugyanakkora a területe, de más a kerülete: 4 négyzet sorban (K = 10) és 2 · 2-es négyzet (K = 8)."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Téglalap-építő" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              Építs téglalapot pontosan <strong>{target} kis négyzetből</strong>! Hányféle téglalapot találsz?
            </p>
            <button
              onClick={nextTarget}
              className="px-4 py-2 rounded-xl bg-purple-100 text-purple-800 font-bold hover:bg-purple-200 active:scale-95 transition"
            >
              Új szám
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">egy sorban:</span>
              <button className={stepBtn} onClick={() => setCols((v) => Math.max(1, v - 1))} aria-label="oszlopok csökkentése">−</button>
              <span className="w-10 text-center font-mono text-2xl font-black text-purple-700">{cols}</span>
              <button className={stepBtn} onClick={() => setCols((v) => Math.min(12, v + 1))} aria-label="oszlopok növelése">+</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">sorok:</span>
              <button className={stepBtn} onClick={() => setRows((v) => Math.max(1, v - 1))} aria-label="sorok csökkentése">−</button>
              <span className="w-10 text-center font-mono text-2xl font-black text-purple-700">{rows}</span>
              <button className={stepBtn} onClick={() => setRows((v) => Math.min(8, v + 1))} aria-label="sorok növelése">+</button>
            </div>
          </div>
          <svg viewBox={`0 0 ${12 * U + 20} ${8 * U + 20}`} className="w-full max-w-lg mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: rows }, (_, r) =>
              Array.from({ length: cols }, (_, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={10 + c * U}
                  y={10 + r * U}
                  width={U}
                  height={U}
                  fill={isHit ? '#86efac' : '#c4b5fd'}
                  stroke={isHit ? '#15803d' : '#6d28d9'}
                  strokeWidth="1.5"
                />
              ))
            )}
          </svg>
          <div className="text-center font-mono text-xl font-bold text-slate-800">
            T = {cols} · {rows} = {area} kis négyzet
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={saveFound}
              disabled={!isHit}
              className={`px-5 py-3 rounded-xl font-bold transition active:scale-95 ${isHit ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-200 text-slate-500'}`}
            >
              {isHit ? 'Megvan! Elmentem.' : area < target ? `Még ${target - area} négyzet hiányzik` : `${area - target} négyzettel több`}
            </button>
          </div>
          <div className="text-sm text-center text-slate-700">
            Talált téglalapok: {found.length === 0 ? 'még egy sincs' : found.join(', ')}
          </div>
          <TheoryCallout type="tip" title="Segítség">
            A 3 · 4-es és a 4 · 3-as téglalap ugyanaz, csak elforgattuk. 12 négyzetből így 3-féle téglalap építhető: 12 · 1, 6 · 2, 4 · 3.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: Egységváltó" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            A takaró 6 kis négyzet széles és 4 magas. Válassz egységet, és tippeld meg, hány darab kell a lefedéséhez!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {UNITS.map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  setUnit(x.id);
                  setAnswer(null);
                }}
                className={`min-h-[52px] px-3 rounded-xl font-bold text-sm border-2 transition active:scale-95 ${unit === x.id ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-teal-50'}`}
              >
                {x.name}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 220 150" className="w-full max-w-sm mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: 4 }, (_, r) =>
              Array.from({ length: 6 }, (_, c) => (
                <rect key={`${r}-${c}`} x={20 + c * 30} y={15 + r * 30} width="30" height="30" fill={(r + c) % 2 === 0 ? '#fda4af' : '#fde68a'} stroke="#ffffff" />
              ))
            )}
            {answer !== null && unit === 'sq' &&
              Array.from({ length: 4 }, (_, r) =>
                Array.from({ length: 6 }, (_, c) => (
                  <rect key={`u${r}-${c}`} x={20 + c * 30} y={15 + r * 30} width="30" height="30" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                ))
              )}
            {answer !== null && unit === 'tri' &&
              Array.from({ length: 4 }, (_, r) =>
                Array.from({ length: 6 }, (_, c) => (
                  <g key={`t${r}-${c}`}>
                    <rect x={20 + c * 30} y={15 + r * 30} width="30" height="30" fill="none" stroke="#0f172a" strokeWidth="1.5" />
                    <line x1={20 + c * 30} y1={15 + r * 30} x2={50 + c * 30} y2={45 + r * 30} stroke="#0f172a" strokeWidth="1.5" />
                  </g>
                ))
              )}
            {answer !== null && unit === 'dom' &&
              Array.from({ length: 4 }, (_, r) =>
                Array.from({ length: 3 }, (_, c) => (
                  <rect key={`d${r}-${c}`} x={20 + c * 60} y={15 + r * 30} width="60" height="30" fill="none" stroke="#0f172a" strokeWidth="2" />
                ))
              )}
            {answer !== null && unit === 'big' &&
              Array.from({ length: 2 }, (_, r) =>
                Array.from({ length: 3 }, (_, c) => (
                  <rect key={`b${r}-${c}`} x={20 + c * 60} y={15 + r * 60} width="60" height="60" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                ))
              )}
          </svg>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...cur.options].sort((p, q) => p - q).map((o) => {
              const cls =
                answer === null
                  ? 'bg-white border-slate-300 hover:bg-teal-50'
                  : o === cur.count
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                    : o === answer
                      ? 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-white border-slate-200 opacity-60';
              return (
                <button
                  key={o}
                  onClick={() => answer === null && setAnswer(o)}
                  className={`min-h-[56px] rounded-xl border-2 font-mono text-xl font-bold transition active:scale-95 ${cls}`}
                >
                  {o} db
                </button>
              );
            })}
          </div>
          {answer !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${answer === cur.count ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {answer === cur.count ? 'Pontosan! ' : 'Nem egészen. '}
              {unit === 'sq' && '6 · 4 = 24 kis négyzet.'}
              {unit === 'tri' && 'Minden kis négyzet 2 háromszög: 24 · 2 = 48.'}
              {unit === 'dom' && 'Egy dominó 2 kis négyzet: 24 : 2 = 12.'}
              {unit === 'big' && 'Egy nagy négyzet 4 kis négyzet: 24 : 4 = 6.'}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Area4Theory;
