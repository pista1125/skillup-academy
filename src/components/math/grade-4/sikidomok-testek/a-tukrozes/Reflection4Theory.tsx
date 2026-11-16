import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { WaterMirrorSvg, GridDogSvg, FoldCutSvg, ShapeAxesSvg, FlagFlipSvg, BlocksMirrorSvg, DOG_CELLS } from './Reflection4Figures';

// ---------------------------------------------------------------------------
// Labor I – tükrözés négyzetrácson
// ---------------------------------------------------------------------------
const COLS = 12;
const ROWS = 8;
type Dir = 'v' | 'h';
type C = [number, number];
const key = ([x, y]: C) => `${x},${y}`;

const PATTERNS: { name: string; dir: Dir; cells: C[] }[] = [
  {
    name: 'Kutya',
    dir: 'v',
    cells: DOG_CELLS.map(([x, y]) => [x, y + 2] as C)
  },
  {
    name: 'Ház',
    dir: 'v',
    cells: [
      [3, 1],
      [2, 2],
      [3, 2],
      [4, 2],
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [2, 4],
      [4, 4],
      [2, 5],
      [3, 5],
      [4, 5],
      [2, 6],
      [4, 6]
    ]
  },
  {
    name: 'Szétszórt pöttyök',
    dir: 'v',
    cells: [
      [0, 1],
      [2, 2],
      [5, 3],
      [4, 5],
      [1, 6]
    ]
  },
  {
    name: 'Fenyőfa',
    dir: 'h',
    cells: [
      [5, 0],
      [4, 1],
      [5, 1],
      [6, 1],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [7, 2],
      [5, 3]
    ]
  },
  {
    name: 'Hajó',
    dir: 'h',
    cells: [
      [6, 0],
      [6, 1],
      [7, 1],
      [6, 2],
      [7, 2],
      [8, 2],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
      [7, 3],
      [8, 3],
      [9, 3]
    ]
  }
];
const mirror = (dir: Dir, [x, y]: C): C => (dir === 'v' ? [COLS - 1 - x, y] : [x, ROWS - 1 - y]);
const onMirrorSide = (dir: Dir, [x, y]: C) => (dir === 'v' ? x >= COLS / 2 : y >= ROWS / 2);

// ---------------------------------------------------------------------------
// Labor II – tükörtengely-kereső
// ---------------------------------------------------------------------------
type P = [number, number];
type Line = [number, number, number, number];
const SHAPES: { name: string; pts: P[]; lines: Line[]; answer: string }[] = [
  {
    name: 'négyzet',
    pts: [
      [40, 40],
      [160, 40],
      [160, 160],
      [40, 160]
    ],
    lines: [
      [100, 15, 100, 185],
      [15, 100, 185, 100],
      [25, 25, 175, 175],
      [175, 25, 25, 175]
    ],
    answer: '4'
  },
  {
    name: 'téglalap',
    pts: [
      [25, 60],
      [175, 60],
      [175, 140],
      [25, 140]
    ],
    lines: [
      [100, 35, 100, 165],
      [10, 100, 190, 100],
      [10, 52, 190, 148],
      [190, 52, 10, 148]
    ],
    answer: '2'
  },
  {
    name: 'egyenlő oldalú háromszög',
    pts: [
      [40, 150],
      [160, 150],
      [100, 46.08]
    ],
    lines: [
      [100, 30, 100, 170],
      [27, 157.5, 147, 88.2],
      [173, 157.5, 53, 88.2],
      [20, 115.36, 180, 115.36]
    ],
    answer: '3'
  },
  {
    name: '„vödör” alakú négyszög',
    pts: [
      [30, 150],
      [170, 150],
      [140, 60],
      [60, 60]
    ],
    lines: [
      [100, 35, 100, 175],
      [15, 105, 185, 105],
      [22, 156.5, 148, 53.5]
    ],
    answer: '1'
  },
  {
    name: 'ferde négyszög',
    pts: [
      [30, 150],
      [140, 150],
      [170, 60],
      [60, 60]
    ],
    lines: [
      [100, 35, 100, 175],
      [15, 105, 185, 105],
      [20, 160, 180, 50],
      [50, 50, 150, 160]
    ],
    answer: '0'
  },
  {
    name: 'kör',
    pts: Array.from({ length: 72 }, (_, i) => [100 + 70 * Math.cos((i * Math.PI) / 36), 100 + 70 * Math.sin((i * Math.PI) / 36)] as P),
    lines: [
      [100, 15, 100, 185],
      [15, 100, 185, 100],
      [40, 40, 160, 160],
      [160, 40, 40, 160],
      [57.5, 26.4, 142.5, 173.6]
    ],
    answer: 'végtelen sok'
  }
];
const reflect = ([px, py]: P, [x1, y1, x2, y2]: Line): P => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy);
  const ux = dx / L;
  const uy = dy / L;
  const t = (px - x1) * ux + (py - y1) * uy;
  const fx = x1 + t * ux;
  const fy = y1 + t * uy;
  return [2 * fx - px, 2 * fy - py];
};
const isAxis = (pts: P[], ln: Line) =>
  pts.every((p) => {
    const q = reflect(p, ln);
    return pts.some((r) => Math.hypot(r[0] - q[0], r[1] - q[1]) < 0.6);
  });
const COUNT_OPTIONS = ['0', '1', '2', '3', '4', 'végtelen sok'];

export const Reflection4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [pi, setPi] = useState(0);
  const [mode, setMode] = useState<'task' | 'free'>('task');
  const [drawn, setDrawn] = useState<string[]>([]);
  const [free, setFree] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const pat = PATTERNS[pi];
  const dir: Dir = mode === 'free' ? 'v' : pat.dir;
  const target = useMemo(() => new Set(pat.cells.map((c) => key(mirror(pat.dir, c)))), [pat]);
  const orig = useMemo(() => new Set(pat.cells.map(key)), [pat]);
  const missing = [...target].filter((k) => !drawn.includes(k));
  const extra = drawn.filter((k) => !target.has(k));
  const perfect = checked && missing.length === 0 && extra.length === 0;

  const clickCell = (c: C) => {
    if (mode === 'free') {
      if (onMirrorSide('v', c)) return;
      const k1 = key(c);
      const k2 = key(mirror('v', c));
      setFree((f) => (f.includes(k1) ? f.filter((k) => k !== k1 && k !== k2) : [...f, k1, k2]));
      return;
    }
    if (!onMirrorSide(pat.dir, c)) return;
    setChecked(false);
    const k = key(c);
    setDrawn((d) => (d.includes(k) ? d.filter((x) => x !== k) : [...d, k]));
  };
  const choosePattern = (i: number) => {
    setPi(i);
    setDrawn([]);
    setChecked(false);
    setMode('task');
  };
  const U = 32;

  // Labor II
  const [si, setSi] = useState(0);
  const [tested, setTested] = useState<number | null>(null);
  const [found, setFound] = useState<number[]>([]);
  const [guess, setGuess] = useState<string | null>(null);
  const shape = SHAPES[si];
  const ghost = tested === null ? null : shape.pts.map((p) => reflect(p, shape.lines[tested]));
  const testedOk = tested !== null && isAxis(shape.pts, shape.lines[tested]);
  const pickShape = (i: number) => {
    setSi(i);
    setTested(null);
    setFound([]);
    setGuess(null);
  };
  const testLine = (i: number) => {
    setTested(i);
    if (isAxis(shape.pts, shape.lines[i]) && !found.includes(i)) setFound((f) => [...f, i]);
  };

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="a-tukrozes"
      grade={4}
      chapterId="sikidomok-testek"
      title="4. A tükrözés"
      subtitle="Tükörkép a vízen, a tükörben, négyzetrácson. Mi a tükörtengely? Hány szimmetriatengelye van a négyzetnek?"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="purple"
      pdfFilename="4_osztaly_a_tukrozes_tananyag.pdf"
      practiceTitle="Készen állsz a tükrözéses feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A TÜKRÖZÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
              <span className="text-base font-black text-purple-900 dark:text-purple-200">
                Minden pont tükörképe ugyanolyan messze van a tükörtengelytől, csak a másik oldalon.
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A tükörkép ugyanakkora és ugyanolyan alakú, de fordított: ami jobbra mutatott, balra mutat.</li>
              <li>Ha egy alakzatot a szimmetriatengelye mentén összehajtunk, a két fele pontosan fedi egymást.</li>
              <li>Négyzet: 4, téglalap: 2, egyenlő oldalú háromszög: 3, kör: végtelen sok szimmetriatengely.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk? Tükörkép a vízen és a tükörben" badge="Tankönyv 123. o." badgeColor="purple">
        <WaterMirrorSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A tó vize olyan, mint egy tükör. A fóka és a fa <strong>tükörképe</strong> fejjel lefelé látszik a vízben. A víz felszíne a <strong>tükörtengely</strong>. A rajzokon a tükör helyét általában <strong className="text-red-600">piros vonal</strong> jelzi.
        </p>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Tükrözés négyzetrácson" badge="Tankönyv 123. o. 2. feladat" badgeColor="sky">
        <GridDogSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Számold a négyzeteket!" badge="szabály" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Minden kis négyzet tükörképe <strong>ugyanabban a sorban</strong> van, és <strong>ugyanannyi négyzetnyire</strong> a tükörtengelytől, csak a másik oldalon. Ami a tengely mellett van, a tükörképe is a tengely mellett lesz.
            </p>
          </TheoryCard>
          <TheoryCard title="Ellenőrizd tükörrel!" badge="tipp" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Állíts egy kis tükröt a piros vonalra! A tükörben azt kell látnod, amit a másik oldalra rajzoltál.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. A tükörkép fordított" badge="Tankönyv 123. o. 1. c)" badgeColor="orange">
        <FlagFlipSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A tükörkép ugyanakkora és ugyanolyan alakú, mint az eredeti, de <strong>fordított</strong>: a jobbra mutató zászló tükörképe balra mutat. Ha a tükör előtt a jobb kezedet emeled fel, a tükörképed a „bal” kezét emeli.
        </p>
        <BlocksMirrorSvg />
        <TheoryCallout type="info" title="Logikai lapokból (Tankönyv 124. o. 3. feladat)">
          A vonat elején a háromszög, a végén a zöld négyzet van, a zöld négyzet áll a tükör mellett. A tükörképben is a zöld négyzet lesz a tükör mellett, a háromszög pedig a legmesszebb.
        </TheoryCallout>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Szimmetrikus alakzatok, szimmetriatengely" badge="Tankönyv 124. o." badgeColor="rose">
        <FoldCutSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Hajts félbe egy írólapot, és vágj ki belőle egy mintát! Kinyitva a minta két fele egymás tükörképe: az alakzat <strong>szimmetrikus</strong>. A hajtásvonal a <strong>szimmetriatengely</strong>. Szimmetrikus a pillangó, a hópehely, a budapesti Parlament és a Szent István-bazilika homlokzata is.
        </p>
        <ShapeAxesSvg />
        <TheoryTable
          headers={['Síkidom', 'Szimmetriatengelyek száma']}
          rows={[
            ['négyzet', '4 (2 középvonal és 2 átló)'],
            ['téglalap (amely nem négyzet)', '2 (csak a 2 középvonal)'],
            ['egyenlő oldalú háromszög', '3'],
            ['„vödör” alakú négyszög (két egyforma szárral)', '1'],
            ['ferde négyszög (két-két párhuzamos oldallal)', '0'],
            ['kör', 'végtelen sok'],
            ['szív', '1']
          ]}
        />
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Tükrözz egy négyzetet!" badge="1. példa" badgeColor="amber">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>A piros négyzet a 3. sorban van, a tengelytől balra 2 négyzetnyire.</li>
              <li>A tükörképe is a 3. sorban lesz.</li>
              <li>A tengelytől jobbra lépj 2 négyzetnyit: oda színezd!</li>
              <li>A négyzet és a tükörképe között 2 + 2 = 4 négyzetnyi a távolság.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Szimmetrikus-e a téglalap az átlójára?" badge="2. példa" badgeColor="rose">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Vágj ki egy hosszúkás téglalapot, és hajtsd össze az átlója mentén!</li>
              <li>A két fele nem fedi egymást: kilógnak a sarkok.</li>
              <li>Tehát az átló nem szimmetriatengelye a téglalapnak.</li>
              <li>A négyzetnél viszont az átló mentén is pontosan fedik egymást a felek!</li>
            </ol>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Alaprajz tükrözése (Tankönyv 125. o. 9. feladat)">
          Az alaprajz mezőit is négyzetenként tükrözzük: a tengely melletti mező tükörképe is a tengely mellé kerül, és a magasság (a szám) nem változik.
        </TheoryCallout>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Vigyázz! Ez nem tükörkép, csak eltolás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Átmásoltad a mintát?"
          wrong="A kutyát egyszerűen átrajzoltam a tengely másik oldalára ugyanúgy, ahogy volt: a feje most is jobbra néz."
          wrongExplanation="Ez eltolás, nem tükrözés. A tükörképben a kutya feje a másik irányba, balra néz."
          correct="A tengelyhez legközelebbi négyzet tükörképe is a tengely mellett van; ami messze volt, az messze lesz."
          correctExplanation="Soronként haladj, és számold meg, hány négyzetnyire van az egyes négyzet a tengelytől!"
          tip="Ellenőrizz tükörrel: tedd a tükröt a piros vonalra!"
        />
      </TheorySection>

      {/* 7 Labor I */}
      <TheorySection title="7. Labor I: Tükrözés négyzetrácson" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {PATTERNS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => choosePattern(i)}
                className={`${btn} ${mode === 'task' && pi === i ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-purple-50'}`}
              >
                {p.name}
              </button>
            ))}
            <button
              onClick={() => {
                setMode('free');
                setFree([]);
              }}
              className={`${btn} ${mode === 'free' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'}`}
            >
              Szimmetria-gép
            </button>
          </div>
          <p className="text-sm text-slate-700 text-center">
            {mode === 'task'
              ? `Színezd ki a ${dir === 'v' ? 'jobb oldalon' : 'tengely alatt'} a minta tükörképét! Kattints a négyzetekre, aztán ellenőrizd!`
              : 'Rajzolj a bal oldalra – a gép azonnal megrajzolja a tükörképet!'}
          </p>
          <svg viewBox={`0 0 ${COLS * U + 20} ${ROWS * U + 20}`} className="w-full max-w-lg mx-auto h-auto bg-white rounded-xl border border-slate-200 touch-manipulation">
            {Array.from({ length: ROWS }, (_, y) =>
              Array.from({ length: COLS }, (_, x) => {
                const k = key([x, y]);
                const isOrig = mode === 'task' && orig.has(k);
                const isDrawn = mode === 'task' && drawn.includes(k);
                const isFree = mode === 'free' && free.includes(k);
                const miss = checked && mode === 'task' && missing.includes(k);
                const wrong = checked && mode === 'task' && isDrawn && !target.has(k);
                const active = mode === 'free' ? !onMirrorSide('v', [x, y]) : onMirrorSide(pat.dir, [x, y]);
                return (
                  <g key={k} onClick={() => clickCell([x, y])} style={{ cursor: active ? 'pointer' : 'default' }}>
                    <rect
                      x={10 + x * U}
                      y={10 + y * U}
                      width={U}
                      height={U}
                      fill={isOrig ? '#f97316' : wrong ? '#fecaca' : isDrawn ? '#a78bfa' : isFree ? (onMirrorSide('v', [x, y]) ? '#6ee7b7' : '#10b981') : active ? '#ffffff' : '#f8fafc'}
                      stroke="#cbd5e1"
                    />
                    {miss && <rect x={10 + x * U + 4} y={10 + y * U + 4} width={U - 8} height={U - 8} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 3" />}
                    {wrong && (
                      <path
                        d={`M ${14 + x * U} ${14 + y * U} L ${6 + (x + 1) * U} ${6 + (y + 1) * U} M ${6 + (x + 1) * U} ${14 + y * U} L ${14 + x * U} ${6 + (y + 1) * U}`}
                        stroke="#dc2626"
                        strokeWidth="2.5"
                      />
                    )}
                  </g>
                );
              })
            )}
            {dir === 'v' ? (
              <line x1={10 + (COLS / 2) * U} y1="4" x2={10 + (COLS / 2) * U} y2={ROWS * U + 16} stroke="#dc2626" strokeWidth="4" pointerEvents="none" />
            ) : (
              <line x1="4" y1={10 + (ROWS / 2) * U} x2={COLS * U + 16} y2={10 + (ROWS / 2) * U} stroke="#dc2626" strokeWidth="4" pointerEvents="none" />
            )}
          </svg>
          {mode === 'task' && (
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => setChecked(true)} className={`${btn} bg-purple-600 text-white border-purple-700 hover:bg-purple-700`}>
                Ellenőrzöm
              </button>
              <button
                onClick={() => {
                  setDrawn([]);
                  setChecked(false);
                }}
                className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-100`}
              >
                Törlés
              </button>
            </div>
          )}
          {checked && mode === 'task' && (
            <div className={`p-3 rounded-xl text-center font-bold ${perfect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'}`}>
              {perfect
                ? 'Hibátlan tükörkép! Minden négyzet ugyanolyan messze van a tengelytől, mint az eredeti.'
                : `Még nem jó: ${missing.length} négyzet hiányzik (zöld keret)${extra.length ? `, ${extra.length} négyzet rossz helyen van (piros X)` : ''}.`}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8 Labor II */}
      <TheorySection title="8. Labor II: Tükörtengely-kereső" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {SHAPES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => pickShape(i)}
                className={`${btn} ${si === i ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50'}`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-700 text-center">
            Kattints egy szaggatott vonalra: „összehajtjuk” mentén a síkidomot! Ha a lila tükörkép pontosan ráillik, az a vonal <strong>tükörtengely</strong>.
          </p>
          <svg viewBox="0 0 200 200" className="w-full max-w-sm mx-auto h-auto bg-rose-50/40 rounded-xl border border-rose-200 touch-manipulation">
            <polygon points={shape.pts.map((p) => p.join(',')).join(' ')} fill="#fecdd3" stroke="#9f1239" strokeWidth="2" />
            {ghost && <polygon points={ghost.map((p) => p.join(',')).join(' ')} fill="#a78bfa" fillOpacity="0.35" stroke="#6d28d9" strokeWidth="2" strokeDasharray="4 3" />}
            {shape.lines.map((ln, i) => {
              const isFound = found.includes(i);
              const isTested = tested === i;
              return (
                <g key={i} onClick={() => testLine(i)} style={{ cursor: 'pointer' }}>
                  <line x1={ln[0]} y1={ln[1]} x2={ln[2]} y2={ln[3]} stroke="transparent" strokeWidth="16" />
                  <line
                    x1={ln[0]}
                    y1={ln[1]}
                    x2={ln[2]}
                    y2={ln[3]}
                    stroke={isFound ? '#16a34a' : isTested ? '#dc2626' : '#64748b'}
                    strokeWidth={isTested || isFound ? 3.5 : 2}
                    strokeDasharray={isFound ? undefined : '6 4'}
                  />
                </g>
              );
            })}
          </svg>
          {tested !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${testedOk ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {testedOk ? 'Ráillik! Ez tükörtengely.' : 'Nem illik rá – ez a vonal nem tükörtengely.'}
            </div>
          )}
          <p className="text-sm text-center text-slate-700">
            Megtalált tükörtengelyek: <strong>{found.length}</strong>
          </p>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-700 text-center">Hány szimmetriatengelye van összesen a(z) {shape.name} alakzatnak?</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {COUNT_OPTIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => setGuess(o)}
                  className={`min-h-[48px] rounded-xl border-2 font-bold transition active:scale-95 ${
                    guess === null ? 'bg-white border-slate-300 hover:bg-rose-50' : o === shape.answer ? 'bg-emerald-100 border-emerald-500' : o === guess ? 'bg-rose-100 border-rose-500' : 'bg-white border-slate-200 opacity-60'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            {guess !== null && (
              <p className={`text-center text-sm font-semibold ${guess === shape.answer ? 'text-emerald-700' : 'text-rose-700'}`}>
                {guess === shape.answer ? 'Pontosan! ' : 'Nem egészen. '}
                {shape.answer === 'végtelen sok'
                  ? 'A kör minden átmérője tükörtengely: végtelen sok van.'
                  : `A(z) ${shape.name} szimmetriatengelyeinek száma: ${shape.answer}.`}
              </p>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Reflection4Theory;
