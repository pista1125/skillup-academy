import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { DeskPushSvg, CompassRoseSvg, ChairShiftSvg, TrainTemplateSvg, GridShiftSvg, BusStopsSvg } from './Translation4Figures';

type Cell = [number, number];
const key = (c: number, r: number) => `${c}-${r}`;

// Irányok képernyő-koordinátában: észak = fel (y csökken)
const DIRS: { id: string; label: string; v: [number, number] }[] = [
  { id: 'ÉNY', label: 'ÉNY ↖', v: [-1, -1] },
  { id: 'É', label: 'É ↑', v: [0, -1] },
  { id: 'ÉK', label: 'ÉK ↗', v: [1, -1] },
  { id: 'NY', label: 'NY ←', v: [-1, 0] },
  { id: '', label: '', v: [0, 0] },
  { id: 'K', label: 'K →', v: [1, 0] },
  { id: 'DNY', label: 'DNY ↙', v: [-1, 1] },
  { id: 'D', label: 'D ↓', v: [0, 1] },
  { id: 'DK', label: 'DK ↘', v: [1, 1] }
];

/** Eltolás szöveges leírása (pl. „3 négyzettel keletre és 2-vel északra”). */
const describe = (dx: number, dy: number) => {
  if (dx === 0 && dy === 0) return 'még nem mozdult el';
  if (Math.abs(dx) === Math.abs(dy)) {
    const ns = dy < 0 ? 'észak' : 'dél';
    const ew = dx > 0 ? 'kelet' : 'nyugat';
    return `${Math.abs(dx)} lépéssel ${ns}${ew}re`;
  }
  const parts: string[] = [];
  if (dx !== 0) parts.push(`${Math.abs(dx)} négyzettel ${dx > 0 ? 'keletre' : 'nyugatra'}`);
  if (dy !== 0) parts.push(`${Math.abs(dy)} négyzettel ${dy < 0 ? 'északra' : 'délre'}`);
  return parts.join(' és ');
};

// Labor I
const L1_SHAPE: Cell[] = [[0, 0], [0, 1], [1, 1]];
const L1_START: Cell = [4, 3];
const L1_COLS = 12;
const L1_ROWS = 8;
const L1_TASKS: { text: string; dx: number; dy: number }[] = [
  { text: 'Told el 4 négyzettel keletre!', dx: 4, dy: 0 },
  { text: 'Told el 3 négyzettel északra!', dx: 0, dy: -3 },
  { text: 'Told el 2 négyzettel nyugatra és 1-gyel délre!', dx: -2, dy: 1 },
  { text: 'Told el 2 lépéssel északkeletre (átlósan)!', dx: 2, dy: -2 },
  { text: 'Told el 3 lépéssel délkeletre (átlósan)!', dx: 3, dy: 3 },
  { text: 'Told el 4 négyzettel nyugatra és 2-vel északra!', dx: -4, dy: -2 }
];

// Labor II
const L2_TASKS: { name: string; cells: Cell[]; dx: number; dy: number; text: string }[] = [
  { name: 'zászló', cells: [[1, 1], [2, 1], [1, 2], [1, 3], [1, 4]], dx: 5, dy: 0, text: '5 négyzettel keletre' },
  { name: 'lépcső', cells: [[1, 6], [2, 6], [3, 6], [2, 5], [3, 5], [3, 4]], dx: 4, dy: -3, text: '4 négyzettel keletre és 3-mal északra' },
  { name: 'T betű', cells: [[7, 1], [8, 1], [9, 1], [8, 2], [8, 3]], dx: -5, dy: 3, text: '5 négyzettel nyugatra és 3-mal délre' },
  { name: 'csónak', cells: [[1, 4], [2, 4], [3, 4], [2, 3], [2, 2]], dx: 3, dy: -2, text: '3 négyzettel keletre és 2-vel északra' }
];

export const Translation4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [taskIdx, setTaskIdx] = useState<number>(0);
  const [pos, setPos] = useState<Cell>(L1_START);
  const [l1Result, setL1Result] = useState<null | boolean>(null);
  const [moves, setMoves] = useState<string[]>([]);
  const task = L1_TASKS[taskIdx];
  const dx = pos[0] - L1_START[0];
  const dy = pos[1] - L1_START[1];
  const labRef = useRef<HTMLDivElement>(null);

  const move = (v: [number, number], id: string) => {
    setL1Result(null);
    setPos(([c, r]) => {
      const nc = c + v[0];
      const nr = r + v[1];
      const fits = L1_SHAPE.every(([sc, sr]) => sc + nc >= 0 && sc + nc < L1_COLS && sr + nr >= 0 && sr + nr < L1_ROWS);
      return fits ? [nc, nr] : [c, r];
    });
    setMoves((m) => [...m, id]);
  };
  const resetL1 = (idx: number) => {
    setTaskIdx(idx);
    setPos(L1_START);
    setMoves([]);
    setL1Result(null);
  };

  useEffect(() => {
    const el = labRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [[number, number], string]> = {
        ArrowUp: [[0, -1], 'É'],
        ArrowDown: [[0, 1], 'D'],
        ArrowLeft: [[-1, 0], 'NY'],
        ArrowRight: [[1, 0], 'K']
      };
      const m = map[e.key];
      if (m) {
        e.preventDefault();
        move(m[0], m[1]);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  // Labor II
  const [l2Idx, setL2Idx] = useState<number>(0);
  const [painted, setPainted] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<boolean>(false);
  const l2 = L2_TASKS[l2Idx];
  const l2Orig = useMemo(() => new Set(l2.cells.map(([c, r]) => key(c, r))), [l2]);
  const l2Target = useMemo(() => new Set(l2.cells.map(([c, r]) => key(c + l2.dx, r + l2.dy))), [l2]);
  const wrong = [...painted].filter((k) => !l2Target.has(k)).length;
  const missing = [...l2Target].filter((k) => !painted.has(k)).length;
  const toggle = (c: number, r: number) => {
    if (l2Orig.has(key(c, r))) return;
    setChecked(false);
    setPainted((prev) => {
      const n = new Set(prev);
      const k = key(c, r);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  };
  const U = 30;
  const btn = 'min-h-[48px] px-4 rounded-xl font-bold text-sm border-2 transition active:scale-95';
  // a nyíl az alakzat első cellájának közepéből
  const [ac, ar] = l2.cells[0];

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="eltolas"
      grade={4}
      chapterId="sikidomok-testek"
      title="6. Eltolás"
      subtitle="Arrébb toljuk az asztalt, a széket, a radírt. Mit kell megmondani, hogy pontosan oda kerüljön, ahová szeretnénk?"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_eltolas_tananyag.pdf"
      practiceTitle="Készen állsz az eltolásos feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ ELTOLÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-mono text-base font-black text-orange-900 dark:text-orange-200">
                Eltolás = IRÁNY + TÁVOLSÁG (merre? mennyivel?)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Az irányt a <strong>fő- és mellékvilágtájakkal</strong> adjuk meg: például keletre 1 m, északkeletre 1 m.
              </li>
              <li>
                Eltoláskor az alakzat <strong>alakja és nagysága nem változik</strong>, és nem is fordul el – csak a helye változik.
              </li>
              <li>Az alakzat minden pontja ugyanannyit és ugyanabba az irányba mozdul el.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Mit kell megmondani?" badge="Tankönyv 128. o. 1. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A teadélutánra a gyerekek átrendezték a termet. Kati megkért két fiút, hogy <strong>tolják arrébb</strong> a tanári asztalt. Az asztal rossz helyre került. Miért?
            </p>
            <p>Mert Kati nem mondta meg pontosan, mit szeretne. Két dolgot kellett volna megmondania:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Mekkora távolságra?</strong> (például 2 m-rel)
              </li>
              <li>
                <strong>Milyen irányban?</strong> (például az ablak felé, keletre)
              </li>
            </ul>
          </div>
          <DeskPushSvg />
        </div>
      </TheorySection>

      {/* 2. Irányok */}
      <TheorySection title="2. Az irány megadása: fő- és mellékvilágtájak" badge="Tankönyv 128. o. 2. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CompassRoseSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A 4 <strong>fővilágtáj</strong>: észak (É), kelet (K), dél (D), nyugat (NY).
            </p>
            <p>
              Közöttük vannak a <strong>mellékvilágtájak</strong>: északkelet (ÉK), délkelet (DK), délnyugat (DNY), északnyugat (ÉNY).
            </p>
            <p>
              A térképen és a négyzethálón az <strong>észak felfelé</strong> van, a kelet jobbra, a nyugat balra, a dél lefelé.
            </p>
          </div>
        </div>
        <ChairShiftSvg />
        <TheoryCallout type="info" title="Példák a tankönyvből">
          „Told el a széket <strong>keletre 1 m</strong>-rel!” vagy „Told el <strong>északkeletre 1 m</strong>-rel!” – így mindenki pontosan tudja, hová kerül a szék.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Mi változik? */}
      <TheorySection title="3. Változik-e az alakzat eltoláskor?" badge="Tankönyv 128. o. 3. feladat" badgeColor="indigo">
        <TrainTemplateSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Ami NEM változik" badge="alak, nagyság" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              A vonatsablont az egyenes mentén toltuk el, és az A, B, C, D pontoknál körberajzoltuk. Minden rajz <strong>ugyanolyan alakú és ugyanakkora</strong>, és a vonat ugyanarra néz.
            </p>
          </TheoryCard>
          <TheoryCard title="Ami változik" badge="hely" badgeColor="orange">
            <p className="text-sm text-slate-700">
              Csak a vonat <strong>helye</strong> változott. Ha visszatolnánk, pontosan fedné az eredetit.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Négyzethálón */}
      <TheorySection title="4. Eltolás a négyzethálón" badge="Elmélet" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GridShiftSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A háromszöget <strong>6 négyzettel keletre</strong> és <strong>2 négyzettel északra</strong> toltuk el.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mindhárom csúcsa 6-ot lépett jobbra és 2-t felfelé.</li>
              <li>A kék nyilak egyforma hosszúak és párhuzamosak.</li>
              <li>Tipp: told el először az egyik csúcsot, aztán a többit ugyanígy, végül kösd össze őket!</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt! */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Tankönyv 128. o., Munkafüzet 40. o." badgeColor="amber">
        <BusStopsSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryCard title="A) A busz megállói (Tankönyv 4. feladat)" badge="5 cm-enként" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A megállók 5 cm-re vannak egymástól, a busz az egyenes úton halad.</li>
              <li>A 2. megálló az elsőtől 5 cm-re van.</li>
              <li>A 3. megálló: 5 + 5 = 10 cm-re.</li>
              <li>A 4. megálló: 5 + 5 + 5 = 15 cm-re az elsőtől.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Háromszög 3 cm-enként (Munkafüzet 2. feladat)" badge="jelölések" badgeColor="emerald">
            <TheoryTable
              headers={['Jelölés', '1.', '2.', '3.', '4.', '5.']}
              rows={[['Hol van?', '0 cm', '3 cm', '6 cm', '9 cm', '12 cm']]}
            />
            <p className="text-sm text-slate-700 mt-2">A háromszöget mindig a következő jelölésig toljuk el, és körberajzoljuk.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="C) Zöld négyzet lépésről lépésre (Munkafüzet 3. feladat)">
          A kis zöld négyzetet egymás után eltoljuk: keletre 2 cm, északra 3 cm, északnyugatra 4 cm, nyugatra 7 cm. Minden eltolás után körberajzoljuk. A négyzet sosem fordul el, és mindig ugyanakkora marad!
        </TheoryCallout>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Irány nélkül nem eltolás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mindig mondd meg az irányt ÉS a távolságot!"
          wrong="„Told el a radírt 5 cm-rel!”"
          wrongExplanation="Nem tudjuk, merre! Lehet jobbra, balra, előre, hátra… A társad bárhová tolhatja."
          correct="„Told el a radírt 5 cm-rel keletre!”"
          correctExplanation="Így egyértelmű: az irány kelet, a távolság 5 cm. Ellenőrizd vonalzóval!"
          tip="Eltoláskor az alakzat nem fordul el. Ha a kép elfordult vagy tükörkép lett, az már nem eltolás!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Eltoló gép – told el a nyilakkal!" badge="Labor" badgeColor="orange">
        <div ref={labRef} tabIndex={0} className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4 outline-none focus:ring-2 focus:ring-orange-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-base font-bold text-orange-900">{task.text}</p>
            <button onClick={() => resetL1((taskIdx + 1) % L1_TASKS.length)} className={`${btn} bg-orange-100 text-orange-900 border-orange-300 hover:bg-orange-200`}>
              Új feladat
            </button>
          </div>
          <p className="text-xs text-slate-500">Használd a gombokat (vagy kattints ide, és használd a billentyűzet nyilait). Észak felfelé van.</p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            <svg viewBox={`0 0 ${L1_COLS * U + 2} ${L1_ROWS * U + 2}`} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {Array.from({ length: L1_ROWS }, (_, r) =>
                Array.from({ length: L1_COLS }, (_, c) => (
                  <rect key={key(c, r)} x={1 + c * U} y={1 + r * U} width={U} height={U} fill="#ffffff" stroke="#e2e8f0" />
                ))
              )}
              {L1_SHAPE.map(([c, r]) => (
                <rect
                  key={`o${c}${r}`}
                  x={1 + (c + L1_START[0]) * U}
                  y={1 + (r + L1_START[1]) * U}
                  width={U}
                  height={U}
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeDasharray="4 3"
                />
              ))}
              {L1_SHAPE.map(([c, r]) => (
                <rect
                  key={`m${c}${r}`}
                  x={1 + (c + pos[0]) * U}
                  y={1 + (r + pos[1]) * U}
                  width={U}
                  height={U}
                  fill={l1Result === true ? '#4ade80' : '#fb923c'}
                  stroke="#9a3412"
                  strokeWidth="2"
                />
              ))}
              {(dx !== 0 || dy !== 0) && (
                <line
                  x1={1 + (L1_START[0] + 0.5) * U}
                  y1={1 + (L1_START[1] + 0.5) * U}
                  x2={1 + (pos[0] + 0.5) * U}
                  y2={1 + (pos[1] + 0.5) * U}
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
              )}
              <text x={L1_COLS * U - 10} y="20" textAnchor="end" fontSize="13" fontWeight="bold" fill="#dc2626">
                É ↑
              </text>
            </svg>
            <div className="grid grid-cols-3 gap-2 w-[210px] mx-auto">
              {DIRS.map((d, i) =>
                d.id === '' ? (
                  <div key={i} className="flex items-center justify-center text-xs text-slate-400 font-bold">
                    lépés: {moves.length}
                  </div>
                ) : (
                  <button
                    key={d.id}
                    onClick={() => move(d.v, d.id)}
                    className={`${btn} px-1 ${d.id.length === 1 || d.id === 'NY' ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-orange-50'}`}
                    aria-label={`lépés ${d.id}`}
                  >
                    {d.label}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="text-center text-sm text-slate-700">
            Most az alakzat <strong>{describe(dx, dy)}</strong> van eltolva.
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setL1Result(dx === task.dx && dy === task.dy)} className={`${btn} bg-orange-600 text-white border-orange-700 hover:bg-orange-700`}>
              Ellenőrzés
            </button>
            <button onClick={() => resetL1(taskIdx)} className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}>
              Vissza a helyére
            </button>
          </div>
          {l1Result !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${l1Result ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {l1Result
                ? `Szuper! Pontosan ${describe(task.dx, task.dy)} toltad el. Az alakzat nem fordult el és nem változott a mérete.`
                : `Még nem jó. A feladat: ${describe(task.dx, task.dy)}. Most: ${describe(dx, dy)}.`}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Rajzold meg az eltolt képet!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              Told el ezt az alakzatot (<strong>{l2.name}</strong>) <strong>{l2.text}</strong>! Kattints a négyzetekre, amelyek az eltolt képhez tartoznak.
            </p>
            <button
              onClick={() => {
                setL2Idx((i) => (i + 1) % L2_TASKS.length);
                setPainted(new Set());
                setChecked(false);
              }}
              className={`${btn} bg-teal-100 text-teal-900 border-teal-300 hover:bg-teal-200`}
            >
              Új alakzat
            </button>
          </div>
          <svg viewBox={`0 0 ${12 * U + 2} ${8 * U + 2}`} className="w-full max-w-xl mx-auto h-auto bg-white rounded-xl border-2 border-teal-300 touch-manipulation">
            {Array.from({ length: 8 }, (_, r) =>
              Array.from({ length: 12 }, (_, c) => {
                const k = key(c, r);
                const isOrig = l2Orig.has(k);
                const on = painted.has(k);
                const should = l2Target.has(k);
                let fill = isOrig ? '#5eead4' : on ? '#fdba74' : '#ffffff';
                if (checked && on) fill = should ? '#4ade80' : '#f87171';
                return (
                  <g key={k} onClick={() => toggle(c, r)} style={{ cursor: isOrig ? 'default' : 'pointer' }}>
                    <rect x={1 + c * U} y={1 + r * U} width={U} height={U} fill={fill} stroke="#cbd5e1" />
                    {checked && !on && should && (
                      <rect x={4 + c * U} y={4 + r * U} width={U - 6} height={U - 6} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
                    )}
                  </g>
                );
              })
            )}
            <line
              x1={1 + (ac + 0.5) * U}
              y1={1 + (ar + 0.5) * U}
              x2={1 + (ac + 0.5 + l2.dx) * U}
              y2={1 + (ar + 0.5 + l2.dy) * U}
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              pointerEvents="none"
            />
            <circle cx={1 + (ac + 0.5 + l2.dx) * U} cy={1 + (ar + 0.5 + l2.dy) * U} r="5" fill="#2563eb" pointerEvents="none" />
          </svg>
          <p className="text-xs text-center text-slate-500">A kék vonal megmutatja, hová kerül az alakzat első (bal felső) négyzete.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setChecked(true)} className={`${btn} bg-teal-600 text-white border-teal-700 hover:bg-teal-700`}>
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setPainted(new Set(l2Target));
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
                ? 'Hibátlan! Az eltolt kép ugyanolyan alakú és ugyanakkora, mint az eredeti.'
                : `Még nem jó: ${wrong} négyzet rossz helyen van (piros), ${missing} hiányzik (szaggatott keret).`}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Translation4Theory;
