import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  RoundThingsSvg,
  HulaHoopSvg,
  CompassStepsSvg,
  CircleOrNotSvg,
  ConcentricSvg,
  CirclePatternsSvg,
  Circle4Compass
} from './Circle4Figures';

// ---------------------------------------------------------------------------
// Labor I – körző-labor
// ---------------------------------------------------------------------------
const CM = 30; // 1 cm = 30 px a laborban
const W = 12; // rácsméret cm-ben (szélesség)
const H = 9; // magasság
const OFF = 15;

type Pt = { x: number; y: number }; // fél cm-es rácspontok, cm-ben
const POINTS: Record<string, Pt> = { O: { x: 4, y: 4.5 }, P: { x: 8.5, y: 4.5 }, Q: { x: 6, y: 3 } };

const TASKS: { text: string; at: keyof typeof POINTS; mm: number }[] = [
  { text: 'Rajzolj kört az O pontból 3 cm-es körzőnyílással!', at: 'O', mm: 30 },
  { text: 'Rajzolj kört a P pontból 2 cm-es körzőnyílással!', at: 'P', mm: 20 },
  { text: 'Rajzolj kört az O pontból 13 mm-es körzőnyílással!', at: 'O', mm: 13 },
  { text: 'Rajzolj kört a Q pontból 1 cm 5 mm-es körzőnyílással!', at: 'Q', mm: 15 },
  { text: 'Rajzolj kört a P pontból 35 mm-es körzőnyílással!', at: 'P', mm: 35 }
];

const fmt = (mm: number) => {
  const c = Math.floor(mm / 10);
  const m = mm % 10;
  if (c === 0) return `${m} mm`;
  if (m === 0) return `${c} cm`;
  return `${c} cm ${m} mm`;
};

const arcPath = (cx: number, cy: number, r: number, deg: number) => {
  if (deg >= 360) return '';
  const t = (deg * Math.PI) / 180;
  const ex = cx + r * Math.cos(t);
  const ey = cy + r * Math.sin(t);
  return `M ${cx + r} ${cy} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${ex} ${ey}`;
};

// ---------------------------------------------------------------------------
// Labor II – kör vagy nem kör? (távolság a középponttól)
// ---------------------------------------------------------------------------
type ShapeId = 'circle' | 'oval' | 'square' | 'hex' | 'circle2';
const SHAPES: { id: ShapeId; name: string; isCircle: boolean }[] = [
  { id: 'oval', name: '1. alakzat', isCircle: false },
  { id: 'circle', name: '2. alakzat', isCircle: true },
  { id: 'square', name: '3. alakzat', isCircle: false },
  { id: 'circle2', name: '4. alakzat', isCircle: true },
  { id: 'hex', name: '5. alakzat', isCircle: false }
];
const C2 = { x: 150, y: 110 };
/** a határvonal pontja a t (0–360°) irányban, px-ben; 1 cm = 25 px */
const boundary = (id: ShapeId, deg: number): [number, number] => {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  let r = 75;
  if (id === 'circle2') r = 50;
  if (id === 'oval') r = 1 / Math.sqrt((c / 95) ** 2 + (s / 55) ** 2);
  if (id === 'square') r = 65 / Math.max(Math.abs(c), Math.abs(s));
  if (id === 'hex') {
    const sector = ((deg % 60) + 60) % 60;
    r = (80 * Math.cos(Math.PI / 6)) / Math.cos(((sector - 30) * Math.PI) / 180);
  }
  return [C2.x + r * c, C2.y + r * s];
};
const shapePath = (id: ShapeId) =>
  Array.from({ length: 121 }, (_, i) => {
    const [x, y] = boundary(id, i * 3);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ') + ' Z';

export const Circle4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [task, setTask] = useState(0);
  const [needle, setNeedle] = useState<Pt | null>(null);
  const [mm, setMm] = useState(20);
  const [turn, setTurn] = useState(0);
  const [drawn, setDrawn] = useState<{ x: number; y: number; mm: number }[]>([]);
  const [result, setResult] = useState<'ok' | 'bad' | null>(null);
  const [msg, setMsg] = useState('Kattints egy rácspontra: oda szúrod a körző hegyét!');

  const cur = TASKS[task];
  const target = POINTS[cur.at];

  const placeNeedle = (p: Pt) => {
    setNeedle(p);
    setTurn(0);
    setResult(null);
    setMsg('Most állítsd be a körzőnyílást, aztán forgasd körbe a körzőt!');
  };
  const rotate = (deg: number) => {
    if (!needle) return;
    setTurn(deg);
    if (deg >= 360) {
      setDrawn((d) => [...d, { x: needle.x, y: needle.y, mm }]);
      const good = needle.x === target.x && needle.y === target.y && mm === cur.mm;
      setResult(good ? 'ok' : 'bad');
      if (good) setMsg('Pontosan! Ez a kör tökéletes lett.');
      else if (!(needle.x === target.x && needle.y === target.y)) setMsg(`A körző hegyét a(z) ${cur.at} pontba kell szúrni!`);
      else setMsg(`A körzőnyílás ${fmt(mm)} volt, de ${fmt(cur.mm)} kellett. Próbáld újra!`);
      setTimeout(() => setTurn(0), 50);
    }
  };
  const nextTask = () => {
    setTask((t) => (t + 1) % TASKS.length);
    setResult(null);
    setTurn(0);
    setMsg('Kattints egy rácspontra: oda szúrod a körző hegyét!');
  };

  const pencil = needle
    ? {
        x: OFF + needle.x * CM + ((mm / 10) * CM) * Math.cos((turn * Math.PI) / 180),
        y: OFF + needle.y * CM + ((mm / 10) * CM) * Math.sin((turn * Math.PI) / 180)
      }
    : null;

  // Labor II
  const [shape, setShape] = useState<ShapeId>('oval');
  const [walk, setWalk] = useState(0);
  const [guess, setGuess] = useState<Record<string, boolean | null>>({});
  const [bx, by] = boundary(shape, walk);
  const distMm = Math.round((Math.hypot(bx - C2.x, by - C2.y) / 25) * 10);
  const curShape = SHAPES.find((s) => s.id === shape)!;
  const answered = guess[shape];

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="a-kor"
      grade={4}
      chapterId="sikidomok-testek"
      title="2. A kör"
      subtitle="Óra, gomb, kerék, pénzérme – mind kör alakú. Mitől lesz kör a kör? Hogyan rajzolunk kört körzővel?"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="rose"
      pdfFilename="4_osztaly_a_kor_tananyag.pdf"
      practiceTitle="Készen állsz a körös feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A KÖR',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
              <span className="text-base font-black text-rose-900 dark:text-rose-200">
                A kör minden pontja ugyanolyan messze van a kör középpontjától.
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kört körzővel rajzolunk: a hegyét a középpontba szúrjuk, és körbeforgatjuk.</li>
              <li>A körzőnyílás megmutatja, milyen messze van a kör a középponttól.</li>
              <li>Nagyobb körzőnyílás → nagyobb kör. A kör nem sokszög, görbe vonal határolja.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk? Kör alakú tárgyak" badge="Tankönyv 117. o." badgeColor="rose">
        <RoundThingsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Az óra, a gomb, az érem, a bicikli kereke, a pénzérme és az óriáskerék is <strong>kör alakú</strong>. Húzd végig az ujjad egy pénzérme szélén: sehol sincs sarka, a szélét <strong>görbe vonal</strong> határolja. Ezért a kör síkidom, de <strong>nem sokszög</strong>.
        </p>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Mitől kör a kör? A középpont" badge="Tankönyv 117. o." badgeColor="purple">
        <HulaHoopSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            Álljon egy társad egy hulahoppkarika közepére! Mérjétek meg, milyen messze van tőle a karika egy-egy pontja. Mindegyik pont <strong>ugyanolyan messze</strong> van!
          </p>
          <p>
            A kör közepét a kör <strong>középpontjának</strong> hívjuk, és általában <strong>O</strong> betűvel jelöljük.
          </p>
        </div>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Körvonal és körlap" badge="Munkafüzet 29. o." badgeColor="sky">
        <CircleOrNotSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Körvonal" badge="a széle" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              A körző ceruzája a <strong>körvonalat</strong> rajzolja meg. A hulahoppkarika is olyan, mint egy körvonal.
            </p>
          </TheoryCard>
          <TheoryCard title="Körlap" badge="a belseje is" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha a körvonal belsejét is kiszínezed, <strong>körlapot</strong> kapsz. A pénzérme, a gomb körlap alakú.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="warning" title="Nem minden „kerek” alakzat kör!">
          Az ovális vagy a tojás alakú síkidom nem kör: a pontjai nem ugyanolyan messze vannak a közepüktől. Próbáld ki a II. laborban!
        </TheoryCallout>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Kör rajzolása körzővel" badge="Tankönyv 117. o." badgeColor="orange">
        <CompassStepsSvg />
        <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
          <li>Jelölj ki egy pontot a lapon! Ez lesz a kör középpontja.</li>
          <li>Nyisd ki a körződet! A körzőnyílást vonalzón mérheted le: az egyik szár hegyét a 0-hoz, a ceruzát a kívánt számhoz tedd.</li>
          <li>Szúrd a pont közepébe a körző hegyes végét!</li>
          <li>Forgasd körbe a körzőt úgy, hogy közben ne változzon a körzőnyílás!</li>
        </ol>
        <TheoryCallout type="tip" title="Tárgyakkal is rajzolhatsz kört">
          Körberajzolhatod egy pohár vagy egy termosz alját, egy pénzérmét. Ollóval, vonalzóval vagy egy körtével nem tudsz kört rajzolni.
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Körzőnyílás és a kör nagysága" badge="Munkafüzet 29–30. o." badgeColor="emerald">
        <ConcentricSvg />
        <TheoryTable
          headers={['Körzőnyílás', 'Ugyanez mm-ben', 'A kör szélessége a középponton át']}
          rows={[
            ['1 cm', '10 mm', '2 cm'],
            ['1 cm 3 mm', '13 mm', '2 cm 6 mm'],
            ['1 cm 5 mm', '15 mm', '3 cm'],
            ['2 cm', '20 mm', '4 cm'],
            ['3 cm', '30 mm', '6 cm']
          ]}
        />
        <TheoryCallout type="info" title="Miért kétszeres a szélesség?">
          A kör egyik szélétől a középpontig egy körzőnyílásnyi a távolság, és a középponttól a másik széléig is. Együtt: kétszer annyi.
        </TheoryCallout>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <CirclePatternsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) A kör-hernyó (Munkafüzet 30. o. 4. feladat)" badge="1. példa" badgeColor="amber">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>A körzőnyílások: O1 13 mm, O2 15 mm, O3 1 cm, O4 1 cm, O5 13 mm.</li>
              <li>Írjuk át mindet mm-be: 1 cm = 10 mm.</li>
              <li>Sorba: 10 mm = 10 mm &lt; 13 mm = 13 mm &lt; 15 mm.</li>
              <li>A legnagyobb kör az O2 pontból rajzolt, a legkisebbek az O3 és az O4 pontból rajzoltak.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Hány kört látsz? (Tankönyv 117. o. 3. feladat)" badge="2. példa" badgeColor="rose">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Az ötkarikás ábrán 5 kör van – számold meg színenként.</li>
              <li>A virágban 6 kis kör és 1 nagy kör van: 6 + 1 = 7 kör.</li>
              <li>A malacka feje, két füle, két szeme és az orra is kör.</li>
            </ol>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Vigyázz! Közben ne változzon a körzőnyílás!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Melyik körzőnyílás nagyobb?"
          wrong="Az 1 cm-es körzőnyílás nagyobb, mint a 13 mm-es, mert a cm nagyobb egység."
          wrongExplanation="Előbb ugyanarra a mértékegységre kell váltani: 1 cm = 10 mm, ami kisebb, mint 13 mm."
          correct="13 mm = 1 cm 3 mm, ez nagyobb, mint 1 cm (10 mm)."
          correctExplanation="Mindig ugyanabban az egységben hasonlíts össze!"
          tip="Rajzolás közben fogd a körzőt a tetején, és ne nyomd szét a szárait – különben nem lesz szép kerek a kör."
        />
      </TheorySection>

      {/* 8 Labor I */}
      <TheorySection title="8. Labor I: Körző-labor" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-base font-bold text-rose-900">Feladat: {cur.text}</p>
            <button onClick={nextTask} className={`${btn} bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100`}>
              Új feladat
            </button>
          </div>
          <svg viewBox={`0 0 ${W * CM + 2 * OFF} ${H * CM + 2 * OFF}`} className="w-full max-w-xl mx-auto h-auto bg-white rounded-xl border border-slate-200 touch-manipulation">
            {Array.from({ length: 2 * W + 1 }, (_, i) => (
              <line key={`v${i}`} x1={OFF + (i * CM) / 2} y1={OFF} x2={OFF + (i * CM) / 2} y2={OFF + H * CM} stroke={i % 2 === 0 ? '#e2e8f0' : '#f1f5f9'} />
            ))}
            {Array.from({ length: 2 * H + 1 }, (_, i) => (
              <line key={`h${i}`} x1={OFF} y1={OFF + (i * CM) / 2} x2={OFF + W * CM} y2={OFF + (i * CM) / 2} stroke={i % 2 === 0 ? '#e2e8f0' : '#f1f5f9'} />
            ))}
            {drawn.map((c, i) => (
              <circle key={i} cx={OFF + c.x * CM} cy={OFF + c.y * CM} r={(c.mm / 10) * CM} fill="none" stroke="#e11d48" strokeWidth="2" opacity="0.8" />
            ))}
            {Object.entries(POINTS).map(([k, p]) => (
              <g key={k}>
                <path
                  d={`M ${OFF + p.x * CM - 5} ${OFF + p.y * CM - 5} L ${OFF + p.x * CM + 5} ${OFF + p.y * CM + 5} M ${OFF + p.x * CM - 5} ${OFF + p.y * CM + 5} L ${OFF + p.x * CM + 5} ${OFF + p.y * CM - 5}`}
                  stroke={k === cur.at ? '#be123c' : '#334155'}
                  strokeWidth="2"
                />
                <text x={OFF + p.x * CM + 7} y={OFF + p.y * CM + 15} fontSize="14" fontWeight="bold" fill={k === cur.at ? '#be123c' : '#334155'}>
                  {k}
                </text>
              </g>
            ))}
            {/* kattintható fél-cm-es rácspontok */}
            {Array.from({ length: 2 * H - 1 }, (_, j) =>
              Array.from({ length: 2 * W - 1 }, (_, i) => {
                const p = { x: (i + 1) / 2, y: (j + 1) / 2 };
                return (
                  <rect
                    key={`${i}-${j}`}
                    x={OFF + p.x * CM - CM / 4}
                    y={OFF + p.y * CM - CM / 4}
                    width={CM / 2}
                    height={CM / 2}
                    fill="transparent"
                    style={{ cursor: 'crosshair' }}
                    onClick={() => placeNeedle(p)}
                  />
                );
              })
            )}
            {needle && pencil && (
              <g pointerEvents="none">
                {turn > 0 && (
                  <path d={arcPath(OFF + needle.x * CM, OFF + needle.y * CM, (mm / 10) * CM, turn)} fill="none" stroke="#e11d48" strokeWidth="2.5" />
                )}
                <Circle4Compass cx={OFF + needle.x * CM} cy={OFF + needle.y * CM} px={pencil.x} py={pencil.y} lift={50} />
              </g>
            )}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Körzőnyílás: <span className="font-mono text-rose-700 text-lg">{fmt(mm)}</span> ({mm} mm)
              </span>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={mm}
                onChange={(e) => {
                  setMm(Number(e.target.value));
                  setTurn(0);
                  setResult(null);
                }}
                className="w-full h-10 accent-rose-600"
                aria-label="körzőnyílás"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Forgasd körbe a körzőt! ({Math.round((turn / 360) * 100)} %)</span>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={turn}
                disabled={!needle}
                onChange={(e) => rotate(Number(e.target.value))}
                className="w-full h-10 accent-rose-600 disabled:opacity-40"
                aria-label="körző forgatása"
              />
            </label>
          </div>
          {/* vonalzó: a körzőnyílás lemérése */}
          <svg viewBox="0 0 330 60" className="w-full max-w-md mx-auto h-auto">
            <rect x="10" y="22" width="310" height="30" rx="4" fill="#fef9c3" stroke="#a16207" />
            {Array.from({ length: 61 }, (_, i) => (
              <line key={i} x1={15 + i * 5} y1="22" x2={15 + i * 5} y2={i % 10 === 0 ? 36 : i % 5 === 0 ? 31 : 28} stroke="#713f12" strokeWidth="1" />
            ))}
            {Array.from({ length: 7 }, (_, i) => (
              <text key={i} x={15 + i * 50} y="48" textAnchor="middle" fontSize="10" fill="#713f12">
                {i}
              </text>
            ))}
            <line x1="15" y1="20" x2={15 + mm * 5} y2="20" stroke="#e11d48" strokeWidth="3" />
            <circle cx="15" cy="20" r="3" fill="#334155" />
            <circle cx={15 + mm * 5} cy="20" r="3.5" fill="#f59e0b" />
            <text x="320" y="14" textAnchor="end" fontSize="10" fill="#334155">cm</text>
          </svg>
          <div className={`p-3 rounded-xl text-center font-bold ${result === 'ok' ? 'bg-emerald-50 text-emerald-800' : result === 'bad' ? 'bg-rose-50 text-rose-800' : 'bg-slate-50 text-slate-700'}`}>
            {msg}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setDrawn([]);
                setNeedle(null);
                setTurn(0);
                setResult(null);
                setMsg('Kattints egy rácspontra: oda szúrod a körző hegyét!');
              }}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-100`}
            >
              Lap törlése
            </button>
          </div>
          <TheoryCallout type="tip" title="Játssz is!">
            A megrajzolt körök a lapon maradnak. Rajzolj több kört ugyanabból a pontból különböző körzőnyílással – céltáblát kapsz!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 9 Labor II */}
      <TheorySection title="9. Labor II: Kör vagy nem kör?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Járd körbe a piros pöttyel az alakzat szélét a csúszkával! Figyeld a mérőszalagot: <strong>változik-e a távolság a középponttól?</strong> Aztán döntsd el: kör vagy nem kör?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {SHAPES.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setShape(s.id);
                  setWalk(0);
                }}
                className={`${btn} ${shape === s.id ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-purple-50'}`}
              >
                {s.name}
                {guess[s.id] === true ? ' ✓' : guess[s.id] === false ? ' ✗' : ''}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 300 220" className="w-full max-w-sm mx-auto h-auto bg-purple-50/40 rounded-xl border border-purple-200">
            <path d={shapePath(shape)} fill="#ede9fe" stroke="#6d28d9" strokeWidth="3" />
            <line x1={C2.x} y1={C2.y} x2={bx} y2={by} stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />
            <circle cx={C2.x} cy={C2.y} r="4" fill="#0f172a" />
            <text x={C2.x - 8} y={C2.y - 8} fontSize="12" fontWeight="bold" fill="#0f172a">
              O
            </text>
            <circle cx={bx} cy={by} r="8" fill="#e11d48" stroke="#fff" strokeWidth="2" />
          </svg>
          <input
            type="range"
            min={0}
            max={359}
            step={1}
            value={walk}
            onChange={(e) => setWalk(Number(e.target.value))}
            className="w-full h-10 accent-purple-600"
            aria-label="körbejárás"
          />
          <div className="text-center font-mono text-2xl font-black text-amber-700">
            Távolság a középponttól: {fmt(distMm)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => setGuess((g) => ({ ...g, [shape]: v === curShape.isCircle }))}
                className={`${btn} min-h-[56px] text-lg bg-white border-slate-300 hover:bg-purple-50`}
              >
                {v ? 'Ez kör' : 'Ez nem kör'}
              </button>
            ))}
          </div>
          {answered !== undefined && answered !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${answered ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {answered ? 'Igazad van! ' : 'Nem egészen. '}
              {curShape.isCircle
                ? 'A szélének minden pontja ugyanolyan messze van a középponttól, ezért ez kör.'
                : 'Körbejárva a távolság változik, ezért ez nem kör.'}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Circle4Theory;
