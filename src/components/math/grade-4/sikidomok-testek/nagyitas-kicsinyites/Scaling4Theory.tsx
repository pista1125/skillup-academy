import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MagnifierMapSvg, HouseDrawingsSvg, TreeDoubleSvg, SimilarPairsSvg, ArrowStepsSvg, WrongScalingSvg } from './Scaling4Figures';

// ---------------------------------------------------------------------------
// Labor I: nagyító-rajzoló négyzethálón
// ---------------------------------------------------------------------------
type Cell = [number, number];
const key = (c: number, r: number) => `${c}-${r}`;

const SHAPES: { name: string; cells: Cell[] }[] = [
  { name: 'L betű', cells: [[0, 0], [0, 1], [0, 2], [1, 2]] },
  { name: 'T betű', cells: [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]] },
  { name: 'lépcső', cells: [[2, 0], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]] },
  { name: 'plusz jel', cells: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] },
  { name: 'csónak', cells: [[1, 0], [0, 2], [1, 2], [2, 2], [3, 2], [1, 1], [1, 3], [2, 3]] }
];

const scaleCells = (cells: Cell[], s: number): Set<string> => {
  const out = new Set<string>();
  cells.forEach(([c, r]) => {
    for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) out.add(key(c * s + i, r * s + j));
  });
  return out;
};

// ---------------------------------------------------------------------------
// Labor II: lépéssor-varázsló
// ---------------------------------------------------------------------------
type Dir = 'R' | 'D' | 'L' | 'U' | 'SW';
type Style = 'arrow' | 'letter' | 'compass';
const DIR_VEC: Record<Dir, [number, number]> = { R: [1, 0], D: [0, 1], L: [-1, 0], U: [0, -1], SW: [-1, 1] };
const DIR_TXT: Record<Style, Record<Dir, string>> = {
  arrow: { R: '→', D: '↓', L: '←', U: '↑', SW: '↙' },
  letter: { R: 'j', D: 'l', L: 'b', U: 'f', SW: '↙' },
  compass: { R: 'K', D: 'D', L: 'NY', U: 'É', SW: 'DNY' }
};

const PROGRAMS: { name: string; style: Style; steps: [number, Dir][] }[] = [
  { name: 'Téglalap (Tankönyv 5. feladat)', style: 'arrow', steps: [[2, 'R'], [3, 'D'], [2, 'L'], [3, 'U']] },
  { name: 'Négyzet', style: 'arrow', steps: [[2, 'R'], [2, 'D'], [2, 'L'], [2, 'U']] },
  { name: 'Vár (Munkafüzet 2. feladat)', style: 'letter', steps: [[6, 'U'], [2, 'R'], [2, 'D'], [2, 'R'], [2, 'U'], [2, 'R'], [6, 'D'], [6, 'L']] },
  { name: 'Hajó (Munkafüzet 3. feladat)', style: 'compass', steps: [[1, 'U'], [1, 'R'], [1, 'U'], [2, 'R'], [1, 'D'], [2, 'R'], [1, 'SW'], [4, 'L']] }
];

type Op = 'x2' | 'x3' | 'half' | 'plus2';
const OPS: { id: Op; label: string }[] = [
  { id: 'x2', label: 'Kétszerezd!' },
  { id: 'x3', label: 'Háromszorozd!' },
  { id: 'half', label: 'Oszd el 2-vel!' },
  { id: 'plus2', label: 'Adj hozzá 2-t!' }
];
const applyOp = (n: number, op: Op) => (op === 'x2' ? n * 2 : op === 'x3' ? n * 3 : op === 'half' ? n / 2 : n + 2);

const fmtSteps = (steps: [number, Dir][], style: Style) => steps.map(([n, d]) => `${n}${DIR_TXT[style][d]}`).join(', ');

const pathPoints = (steps: [number, Dir][]): [number, number][] => {
  const pts: [number, number][] = [[0, 0]];
  steps.forEach(([n, d]) => {
    const [px, py] = pts[pts.length - 1];
    pts.push([px + DIR_VEC[d][0] * n, py + DIR_VEC[d][1] * n]);
  });
  return pts;
};

const isSimilar = (a: [number, Dir][], b: [number, Dir][]) => {
  const r = b[0][0] / a[0][0];
  return a.every(([n], i) => Math.abs(b[i][0] - n * r) < 1e-9);
};

export const Scaling4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [mode, setMode] = useState<'enlarge' | 'shrink'>('enlarge');
  const [shapeIdx, setShapeIdx] = useState<number>(0);
  const [painted, setPainted] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<boolean>(false);
  const shape = SHAPES[shapeIdx];
  // nagyítás: eredeti 4·4, kép 8·8 ; kicsinyítés: eredeti 8·8 (2·2-es blokkok), kép 4·4
  const targetSet = useMemo(() => (mode === 'enlarge' ? scaleCells(shape.cells, 2) : scaleCells(shape.cells, 1)), [mode, shape]);
  const origSet = useMemo(() => (mode === 'enlarge' ? scaleCells(shape.cells, 1) : scaleCells(shape.cells, 2)), [mode, shape]);
  const origN = mode === 'enlarge' ? 4 : 8;
  const workN = mode === 'enlarge' ? 8 : 4;
  const origU = mode === 'enlarge' ? 22 : 11;
  const workU = mode === 'enlarge' ? 34 : 68;
  const wrong = [...painted].filter((k) => !targetSet.has(k)).length;
  const missing = [...targetSet].filter((k) => !painted.has(k)).length;

  const resetLab1 = (m: 'enlarge' | 'shrink', idx: number) => {
    setMode(m);
    setShapeIdx(idx);
    setPainted(new Set());
    setChecked(false);
  };
  const toggleCell = (c: number, r: number) => {
    setChecked(false);
    setPainted((prev) => {
      const next = new Set(prev);
      const k = key(c, r);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  // Labor II
  const [progIdx, setProgIdx] = useState<number>(0);
  const [op, setOp] = useState<Op>('x2');
  const [guess, setGuess] = useState<boolean | null>(null);
  const prog = PROGRAMS[progIdx];
  const opAllowed = (o: Op) => o !== 'half' || prog.steps.every(([n]) => n % 2 === 0);
  const newSteps: [number, Dir][] = prog.steps.map(([n, d]) => [applyOp(n, op), d]);
  const similar = isSimilar(prog.steps, newSteps);
  const ptsA = pathPoints(prog.steps);
  const ptsB = pathPoints(newSteps);
  const allY = [...ptsA.map((p) => p[1]), ...ptsB.map((p) => p[1])];
  const spanA = { minX: Math.min(...ptsA.map((p) => p[0])), maxX: Math.max(...ptsA.map((p) => p[0])) };
  const wA = spanA.maxX - spanA.minX;
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const totalW = wA + 2 + (Math.max(...ptsB.map((p) => p[0])) - Math.min(...ptsB.map((p) => p[0])));
  const gridU = Math.min(26, 340 / (totalW + 2), 200 / (maxY - minY + 2));
  const offA = 1 - spanA.minX;
  const offB = 1 + wA + 2 - Math.min(...ptsB.map((p) => p[0]));
  const offY = 1 - minY;
  const gCols = Math.ceil(totalW + 2);
  const gRows = Math.ceil(maxY - minY + 2);
  const toPoly = (pts: [number, number][], ox: number) => pts.map(([x, y]) => `${(x + ox) * gridU},${(y + offY) * gridU}`).join(' ');

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold text-sm border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="nagyitas-kicsinyites"
      grade={4}
      chapterId="sikidomok-testek"
      title="5. Nagyítás, kicsinyítés"
      subtitle="A nagyító nagyobbnak mutatja a katicát, a térkép kicsiben mutatja az országot. Hogyan nagyítsunk vagy kicsinyítsünk egy rajzot a négyzethálón?"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="blue"
      pdfFilename="4_osztaly_nagyitas_kicsinyites_tananyag.pdf"
      practiceTitle="Készen állsz a nagyításos feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — NAGYÍTÁS, KICSINYÍTÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                Nagyításkor és kicsinyítéskor MINDEN méret ugyanannyiszorosára változik.
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Kétszeresére nagyítás: minden szakasz <strong>2-szer olyan hosszú</strong> lesz (2 kis négyzet → 4 kis négyzet).
              </li>
              <li>
                Felére kicsinyítés: minden szakasz <strong>fele olyan hosszú</strong> lesz (6 kis négyzet → 3 kis négyzet).
              </li>
              <li>
                Az eredeti és a nagyított rajz <strong>ugyanolyan alakú</strong>, de nem ugyanakkora. Ezek az alakzatok <strong>hasonlók</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Nagyítás és kicsinyítés körülöttünk" badge="Tankönyv 126. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A <strong>nagyító</strong>, a <strong>mikroszkóp</strong> és a <strong>vetítő</strong> nagyobbnak mutatja a képet. Ez a <strong>nagyítás</strong>.
            </p>
            <p>
              A <strong>földgömb</strong> és a <strong>térkép</strong> a valóság <strong>kicsinyített mása</strong>. Ez a <strong>kicsinyítés</strong>.
            </p>
            <p>A telefonon is nagyíthatsz egy fényképet két ujjal – a vitorlás egyre nagyobb lesz, de ugyanolyan alakú marad.</p>
          </div>
          <MagnifierMapSvg />
        </div>
      </TheorySection>

      {/* 2. A házikók */}
      <TheorySection title="2. Ki hogyan rajzolta le a házat?" badge="Tankönyv 126. o. 2. feladat" badgeColor="amber">
        <HouseDrawingsSvg />
        <TheoryTable
          headers={['Ki rajzolta?', 'A ház teste', 'A teteje', 'Mi történt?']}
          rows={[
            ['eredeti', '2 négyzet széles, 2 magas', '4 négyzet széles', '–'],
            ['Ábel', '1 széles, 1 magas', '2 széles', 'felére kicsinyítette'],
            ['Kata', '4 széles, 4 magas', '8 széles', 'kétszeresére nagyította'],
            ['Gábor', '2 széles, 2 magas', '4 széles', 'ugyanolyan alakú és ugyanakkora']
          ]}
        />
        <TheoryCallout type="info" title="Figyeld meg!">
          Mindhárom gyerek háza <strong>ugyanolyan alakú</strong>, mint az eredeti. Csak Gábor háza <strong>ugyanakkora</strong> is.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kétszeres nagyítás */}
      <TheorySection title="3. Kétszeresére nagyítás a négyzethálón" badge="Tankönyv 127. o. 3. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TreeDoubleSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Kétszeresére nagyítani azt jelenti, hogy <strong>minden méretet kétszeresére változtatunk</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A fa koronája 4 négyzet széles → a nagyított rajzon <strong>8</strong> négyzet széles.</li>
              <li>A törzse 1 széles és 2 magas → <strong>2 széles és 4 magas</strong>.</li>
              <li>Minden kis négyzetből egy <strong>2 · 2-es nagy négyzet</strong> lesz.</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-center font-bold text-blue-900">
              Ugyanolyan alakú, de nem ugyanakkora → <span className="underline">hasonlók</span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. Hasonló vagy nem */}
      <TheorySection title="4. Melyik alakzatpár hasonló?" badge="Tankönyv 127. o. 4. feladat" badgeColor="sky">
        <SimilarPairsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="a) Két kör" badge="hasonló" badgeColor="emerald">
            <p className="text-sm text-slate-700">Minden kör ugyanolyan alakú. A nagy kör a kicsi kétszeres nagyítása.</p>
          </TheoryCard>
          <TheoryCard title="b) 2 · 1 és 4 · 2" badge="hasonló" badgeColor="emerald">
            <p className="text-sm text-slate-700">A szélesség is és a magasság is a kétszeresére nőtt: 2 → 4 és 1 → 2.</p>
          </TheoryCard>
          <TheoryCard title="c) 6 · 1 és 6 · 2" badge="nem hasonló" badgeColor="rose">
            <p className="text-sm text-slate-700">A szélesség maradt 6, csak a magasság nőtt meg. Ez nem nagyítás!</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt! */}
      <TheorySection title="5. Nézzük meg együtt! Rajzolás lépéssorral" badge="Tankönyv 127. o. 5. feladat, Munkafüzet 39. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A lépéssor megmondja, <strong>merre</strong> és <strong>hány négyzetet</strong> lépj. Háromféle jelölést is használunk:
          </p>
          <TheoryTable
            headers={['Nyilak', 'Betűk', 'Világtájak']}
            rows={[
              ['→ jobbra', 'j = jobbra', 'K = kelet'],
              ['← balra', 'b = balra', 'NY = nyugat'],
              ['↑ fel', 'f = fel', 'É = észak'],
              ['↓ le', 'l = le', 'D = dél']
            ]}
          />
        </div>
        <ArrowStepsSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryCard title="A) 2→, 3↓, 2←, 3↑" badge="Tankönyv 5. feladat" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az eredeti lépéssor egy 2 széles, 3 magas téglalapot rajzol.</li>
              <li>
                <strong>Kétszerezve:</strong> 4→, 6↓, 4←, 6↑. Ez 4 széles és 6 magas: a téglalap <strong>nagyított mása</strong>.
              </li>
              <li>
                <strong>Kettőt hozzáadva:</strong> 4→, 5↓, 4←, 5↑. A szélesség 2-szeres lett, a magasság nem (3 → 5). Ez <strong>nem hasonló</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A vár felére kicsinyítve" badge="Munkafüzet 2. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Eredeti: 6f, 2j, 2l, 2j, 2f, 2j, 6l, 6b</li>
              <li>Minden számot elosztunk 2-vel: 6 : 2 = 3, 2 : 2 = 1.</li>
              <li>
                Kicsinyítve: <strong>3f, 1j, 1l, 1j, 1f, 1j, 3l, 3b</strong>
              </li>
              <li>A betűk (az irányok) nem változnak, csak a számok!</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Négyszeres nagyítás (Munkafüzet 3. feladat)">
          1É, 1K, 1É, 2K, 1D, 2K, 1DNY, 4NY → minden számot 4-gyel szorzunk: <strong>4É, 4K, 4É, 8K, 4D, 8K, 4DNY, 16NY</strong>. A DNY (délnyugat) ferde lépés: egy kis négyzet átlóján megy át.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Szorozni kell, nem hozzáadni" badge="Csapda" badgeColor="rose">
        <WrongScalingSvg />
        <TheoryTrapBox
          title="Minden méret ugyanannyiszorosára változzon!"
          wrong="A 3 · 2-es téglalap kétszeres nagyítása 5 · 4-es, mert mindkét oldalhoz 2-t adtam."
          wrongExplanation="Hozzáadással a téglalap elnyúlik, megváltozik az alakja. 3 → 5 nem kétszeres, 2 → 4 viszont az."
          correct="3 · 2 → 6 · 4 (3 · 2 = 6 és 2 · 2 = 4)"
          correctExplanation="Kétszeres nagyításnál minden méretet 2-vel szorzunk, felére kicsinyítésnél minden méretet 2-vel osztunk."
          tip="Ha csak az egyik oldalt nyújtod meg (mint az elnyúlt mosolygó arcnál), az alakzat nem lesz hasonló!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Nagyító-rajzoló a négyzethálón" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => resetLab1('enlarge', shapeIdx)}
              className={`${btn} ${mode === 'enlarge' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50'}`}
            >
              Nagyítás kétszeresére
            </button>
            <button
              onClick={() => resetLab1('shrink', shapeIdx)}
              className={`${btn} ${mode === 'shrink' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'}`}
            >
              Kicsinyítés felére
            </button>
            <button onClick={() => resetLab1(mode, (shapeIdx + 1) % SHAPES.length)} className={`${btn} bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200`}>
              Új alakzat
            </button>
          </div>
          <p className="text-sm text-slate-700 text-center">
            {mode === 'enlarge'
              ? 'Kattints a nagy rácson azokra a négyzetekre, amelyekből a kétszeresére nagyított kép áll! Minden kis négyzetből 2 · 2 négyzet lesz.'
              : 'Kattints a kis rácson azokra a négyzetekre, amelyekből a felére kicsinyített kép áll! Minden 2 · 2-es blokkból 1 négyzet lesz.'}
          </p>
          <div className="flex flex-wrap items-start justify-center gap-6">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-600 mb-1">Eredeti: {shape.name}</div>
              <svg viewBox={`0 0 ${origN * origU + 2} ${origN * origU + 2}`} className="w-[120px] h-auto bg-slate-50 rounded-lg border border-slate-200">
                {Array.from({ length: origN }, (_, r) =>
                  Array.from({ length: origN }, (_, c) => (
                    <rect
                      key={key(c, r)}
                      x={1 + c * origU}
                      y={1 + r * origU}
                      width={origU}
                      height={origU}
                      fill={origSet.has(key(c, r)) ? '#f59e0b' : '#ffffff'}
                      stroke="#cbd5e1"
                    />
                  ))
                )}
              </svg>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-slate-600 mb-1">{mode === 'enlarge' ? 'Te rajzolod: kétszeres kép' : 'Te rajzolod: feles kép'}</div>
              <svg viewBox={`0 0 ${workN * workU + 2} ${workN * workU + 2}`} className="w-[272px] max-w-full h-auto bg-white rounded-lg border-2 border-blue-300 touch-manipulation">
                {Array.from({ length: workN }, (_, r) =>
                  Array.from({ length: workN }, (_, c) => {
                    const k = key(c, r);
                    const on = painted.has(k);
                    const should = targetSet.has(k);
                    let fill = on ? '#60a5fa' : '#ffffff';
                    if (checked && on) fill = should ? '#4ade80' : '#f87171';
                    return (
                      <g key={k} onClick={() => toggleCell(c, r)} style={{ cursor: 'pointer' }} data-testid={`scale-cell-${k}`}>
                        <rect x={1 + c * workU} y={1 + r * workU} width={workU} height={workU} fill={fill} stroke="#94a3b8" />
                        {checked && !on && should && (
                          <rect
                            x={4 + c * workU}
                            y={4 + r * workU}
                            width={workU - 6}
                            height={workU - 6}
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="2"
                            strokeDasharray="4 3"
                          />
                        )}
                      </g>
                    );
                  })
                )}
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setChecked(true)} className={`${btn} bg-blue-600 text-white border-blue-700 hover:bg-blue-700`}>
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setPainted(new Set(targetSet));
                setChecked(true);
              }}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}
            >
              Mutasd a megoldást
            </button>
            <button
              onClick={() => {
                setPainted(new Set());
                setChecked(false);
              }}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}
            >
              Törlés
            </button>
          </div>
          {checked && (
            <div className={`p-3 rounded-xl text-center font-bold ${wrong === 0 && missing === 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {wrong === 0 && missing === 0
                ? `Hibátlan! Az eredeti ${shape.cells.length} négyzetből ${mode === 'enlarge' ? `${targetSet.size} négyzet lett (minden négyzetből 4).` : `${targetSet.size} négyzet lett.`}`
                : `Még nem jó: ${wrong} négyzet rossz helyen van (piros), ${missing} hiányzik (szaggatott keret).`}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Lépéssor-varázsló – hasonló lesz?" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {PROGRAMS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  setProgIdx(i);
                  setGuess(null);
                  if (op === 'half' && !p.steps.every(([n]) => n % 2 === 0)) setOp('x2');
                }}
                className={`${btn} ${progIdx === i ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-teal-50'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {OPS.map((o) => (
              <button
                key={o.id}
                disabled={!opAllowed(o.id)}
                onClick={() => {
                  setOp(o.id);
                  setGuess(null);
                }}
                className={`${btn} ${op === o.id ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50'} disabled:opacity-40`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-sm">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-xs font-sans font-bold text-blue-800">Eredeti lépéssor</div>
              {fmtSteps(prog.steps, prog.style)}
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-xs font-sans font-bold text-amber-800">Új lépéssor</div>
              {fmtSteps(newSteps, prog.style)}
            </div>
          </div>
          {guess === null ? (
            <div className="text-center space-y-2">
              <p className="text-sm font-bold text-slate-700">Tippelj, mielőtt megrajzolom! Az új alakzat hasonló lesz az eredetihez?</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setGuess(true)} className={`${btn} bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200 min-w-[110px]`}>
                  Igen
                </button>
                <button onClick={() => setGuess(false)} className={`${btn} bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200 min-w-[110px]`}>
                  Nem
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={`p-3 rounded-xl text-center font-bold ${guess === similar ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                {guess === similar ? 'Ügyes vagy, jól tippeltél! ' : 'Nem talált. '}
                {similar
                  ? op === 'plus2'
                    ? 'Most hasonló lett, mert a négyzet minden oldala egyforma: 2 → 4 mindenhol kétszeres.'
                    : 'Hasonló lett, mert minden lépés ugyanannyiszorosára változott.'
                  : 'Nem hasonló: a lépések nem ugyanannyiszorosára változtak, az alakzat eltorzult.'}
              </div>
              <svg viewBox={`0 0 ${gCols * gridU} ${gRows * gridU}`} className="w-full max-w-xl mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
                {Array.from({ length: gCols + 1 }, (_, i) => (
                  <line key={`v${i}`} x1={i * gridU} y1={0} x2={i * gridU} y2={gRows * gridU} stroke="#e2e8f0" />
                ))}
                {Array.from({ length: gRows + 1 }, (_, i) => (
                  <line key={`h${i}`} x1={0} y1={i * gridU} x2={gCols * gridU} y2={i * gridU} stroke="#e2e8f0" />
                ))}
                <polygon points={toPoly(ptsA, offA)} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" strokeLinejoin="round" />
                <polygon
                  points={toPoly(ptsB, offB)}
                  fill={similar ? '#bbf7d0' : '#fecaca'}
                  stroke={similar ? '#15803d' : '#b91c1c'}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx={offA * gridU} cy={offY * gridU} r="4" fill="#dc2626" />
                <circle cx={offB * gridU} cy={offY * gridU} r="4" fill="#dc2626" />
              </svg>
              <div className="text-center">
                <button onClick={() => setGuess(null)} className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}>
                  Újra tippelek
                </button>
              </div>
            </>
          )}
          <TheoryCallout type="tip" title="Próbáld ki!">
            A téglalapnál a „Adj hozzá 2-t!” eltorzítja az alakot. A négyzetnél viszont nem – miért? Mert ott minden oldal egyforma, így mindegyik ugyanannyiszorosára nő.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Scaling4Theory;
