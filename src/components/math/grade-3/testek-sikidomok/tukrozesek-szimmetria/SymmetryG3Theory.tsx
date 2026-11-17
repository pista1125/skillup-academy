import React, { useEffect, useRef, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SymmetryFoldSvg, SymmetryButterflySvg, SymmetryGridSvg, SymmetryAxesSvg, SymmetryLettersSvg, SymmetryWaterSvg } from './SymmetryG3Figures';
import {
  FONT,
  AXIS,
  GN,
  PALETTE,
  FIRST_GRID_TASK,
  FOLD_SHAPES,
  GridTask,
  FoldShape,
  makeGridTask,
  checkGrid,
  GridCheck,
  cellKey,
  inSource,
  axisFrame,
  FoldArt,
  AxisLine,
  shuffle
} from './SymmetryG3Parts';

const CS = 30; // a labor rácsának kockamérete

/** Labor I – rács. */
const MirrorGrid: React.FC<{
  task: GridTask;
  drawn: Record<string, number>;
  check: GridCheck | null;
  showMirror: boolean;
  onCell: (r: number, c: number) => void;
}> = ({ task, drawn, check, showMirror, onCell }) => {
  const src = new Map(task.cells.map((c) => [cellKey(c.r, c.c), c.col]));
  const extra = new Set(check?.extra ?? []);
  const wrong = new Set(check?.wrongColor ?? []);
  const W = GN * CS;
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < GN; r++) {
    for (let c = 0; c < GN; c++) {
      const k = cellKey(r, c);
      const isSrc = inSource(r, c, task.axis);
      const col = isSrc ? src.get(k) : drawn[k];
      const ghostCol = !isSrc && showMirror ? src.get(cellKey(task.axis === 'h' ? GN - 1 - r : r, task.axis === 'v' ? GN - 1 - c : c)) : undefined;
      cells.push(
        <g key={k} onClick={() => !isSrc && onCell(r, c)} style={{ cursor: isSrc ? 'default' : 'pointer' }}>
          <rect x={c * CS + 2} y={r * CS + 2} width={CS} height={CS} fill={col !== undefined ? PALETTE[col].fill : isSrc ? '#f1f5f9' : '#fff'} stroke="#cbd5e1" strokeWidth="1" />
          {ghostCol !== undefined && col === undefined && (
            <rect x={c * CS + 6} y={r * CS + 6} width={CS - 8} height={CS - 8} fill={PALETTE[ghostCol].fill} opacity="0.35" stroke={PALETTE[ghostCol].fill} strokeDasharray="3 2" />
          )}
          {(extra.has(k) || wrong.has(k)) && <rect x={c * CS + 4} y={r * CS + 4} width={CS - 4} height={CS - 4} fill="none" stroke="#dc2626" strokeWidth="3" />}
        </g>
      );
    }
  }
  return (
    <svg viewBox={`0 0 ${W + 4} ${W + 4}`} className="w-full max-w-md mx-auto h-auto select-none touch-manipulation" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {cells}
      {task.axis === 'v' ? (
        <line x1={2 + (GN / 2) * CS} y1={0} x2={2 + (GN / 2) * CS} y2={W + 4} stroke={AXIS} strokeWidth="4" strokeDasharray="9 5" />
      ) : (
        <line x1={0} y1={2 + (GN / 2) * CS} x2={W + 4} y2={2 + (GN / 2) * CS} stroke={AXIS} strokeWidth="4" strokeDasharray="9 5" />
      )}
    </svg>
  );
};

/** Labor II – a hajtás rajza. s = 1 (nyitva) … −1 (félbehajtva). */
const FoldStage: React.FC<{ shape: FoldShape; s: number; done: boolean }> = ({ shape, s, done }) => {
  const { cx, cy, deg } = axisFrame(shape);
  const back = `rotate(${-deg}) translate(${-cx} ${-cy})`;
  const id = `fold-${shape.id}`;
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[300px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <clipPath id={`${id}-keep`}>
          <rect x="-400" y="-400" width="800" height="400" />
        </clipPath>
        <clipPath id={`${id}-move`}>
          <rect x="-400" y="0" width="800" height="400" />
        </clipPath>
      </defs>
      <rect x="1" y="1" width="198" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <g transform={`translate(${cx} ${cy}) rotate(${deg})`}>
        {/* a helyben maradó fél */}
        <g clipPath={`url(#${id}-keep)`}>
          <g transform={back}>
            <FoldArt s={shape} />
          </g>
        </g>
        {/* a hajtott fél: halványan a helye, és maga a mozgó fél */}
        {s < 1 && (
          <g clipPath={`url(#${id}-move)`}>
            <g transform={back}>
              <FoldArt s={shape} opacity={0.18} />
            </g>
          </g>
        )}
        <g transform={`scale(1 ${s})`}>
          <g clipPath={`url(#${id}-move)`}>
            <g transform={back}>
              <FoldArt s={shape} opacity={s < 1 ? 0.6 : 1} tint={done ? '#f472b6' : undefined} />
            </g>
          </g>
        </g>
      </g>
      <AxisLine x1={shape.axis[0][0]} y1={shape.axis[0][1]} x2={shape.axis[1][0]} y2={shape.axis[1][1]} sw={3} />
    </svg>
  );
};

export const SymmetryG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [task, setTask] = useState<GridTask>(FIRST_GRID_TASK);
  const [drawn, setDrawn] = useState<Record<string, number>>({});
  const [color, setColor] = useState(0);
  const [check, setCheck] = useState<GridCheck | null>(null);
  const [showMirror, setShowMirror] = useState(false);
  const [gScore, setGScore] = useState(0);
  const newGrid = (axis?: 'v' | 'h') => {
    setTask(makeGridTask(axis));
    setDrawn({});
    setCheck(null);
    setShowMirror(false);
  };
  const onCell = (r: number, c: number) => {
    if (check?.ok) return;
    const k = cellKey(r, c);
    const next = { ...drawn };
    if (next[k] === color) delete next[k];
    else next[k] = color;
    setDrawn(next);
    setCheck(null);
  };
  const doCheck = () => {
    const res = checkGrid(task, drawn);
    setCheck(res);
    if (res.ok) setGScore(gScore + 1);
  };
  const usedCols = Array.from(new Set(task.cells.map((c) => c.col))).sort();

  // ---- Labor II ----
  const [order, setOrder] = useState<FoldShape[]>(FOLD_SHAPES);
  const [fi, setFi] = useState(0);
  const [guess, setGuess] = useState<boolean | null>(null);
  const [s, setS] = useState(1);
  const [folded, setFolded] = useState(false);
  const [fScore, setFScore] = useState(0);
  const raf = useRef<number | null>(null);
  const shape = order[fi];
  useEffect(
    () => () => {
      if (raf.current !== null && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(raf.current);
    },
    []
  );
  const pickGuess = (g: boolean) => {
    if (guess !== null) return;
    setGuess(g);
    if (g === shape.isAxis) setFScore(fScore + 1);
    // hajtás animáció
    if (typeof requestAnimationFrame === 'undefined') {
      setS(-1);
      setFolded(true);
      return;
    }
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1100);
      setS(Math.cos(Math.PI * p));
      if (p < 1) raf.current = requestAnimationFrame(step);
      else setFolded(true);
    };
    raf.current = requestAnimationFrame(step);
  };
  const nextShape = () => {
    if (raf.current !== null && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(raf.current);
    let ni = fi + 1;
    if (ni >= order.length) {
      setOrder(shuffle(FOLD_SHAPES));
      ni = 0;
    }
    setFi(ni);
    setGuess(null);
    setS(1);
    setFolded(false);
  };
  const unfold = () => {
    setS(1);
    setFolded(false);
    setGuess(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-shapes-solids"
      subtopicId="tukrozesek-szimmetria"
      grade={3}
      chapterId="testek-sikidomok"
      title="4. Tükrözések, szimmetria"
      subtitle="Hajtsd félbe, nézd meg tükörben! Mikor fedi a két fele pontosan egymást?"
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG"
      themeColor="rose"
      pdfFilename="3_osztaly_tukrozesek_szimmetria_tananyag.pdf"
      practiceTitle="Készen állsz? Tükrözzünk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A TÜKÖRTENGELY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ha egy ábrát egy vonal mentén félbehajtunk, és a két fele <strong>pontosan fedi egymást</strong>, akkor az ábra <strong>szimmetrikus</strong> (tengelyesen tükrös).</li>
              <li>Ez a vonal a <strong>tükörtengely</strong>.</li>
              <li>A tükörkép a tengely <strong>másik oldalán</strong>, <strong>ugyanannyi kockára</strong> van, és <strong>ugyanakkora</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 106–107. o." badgeColor="rose">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Hajts félbe egy papírt, és vágj ki belőle egy formát! Ha kinyitod, a két fele egyforma.</p>
          <p>Az ilyen ábra <strong>szimmetrikus</strong>. A hajtás vonala a <strong>tükörtengely</strong>.</p>
          <p>Megtanulod azt is, hogyan rajzold meg egy ábra <strong>tükörképét</strong> négyzetrácson.</p>
        </div>
        <SymmetryFoldSvg />
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. A tükörtengely" badge="Szimmetrikus" badgeColor="sky">
        <SymmetryButterflySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Félbehajtás" badge="papírral" badgeColor="emerald">
            <p className="text-sm text-slate-700">Hajtsd félbe a tengely mentén! A két fele <strong>pontosan fedi</strong> egymást. Semmi nem lóg ki.</p>
          </TheoryCard>
          <TheoryCard title="Tükör" badge="tükörrel" badgeColor="sky">
            <p className="text-sm text-slate-700">Állíts tükröt a tengelyre! A tükörben az ábra <strong>másik felét</strong> látod.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Nézz körül!">
          Szimmetrikus a pillangó, a falevél, a legtöbb ablak, egy szék elölről nézve, és a te arcod is, majdnem.
        </TheoryCallout>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Tükrözés négyzetrácson" badge="Számold a kockákat!" badgeColor="blue">
        <SymmetryGridSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Keresd meg a tengelyt!</li>
          <li>Számold meg: hány kockára van az ábra a tengelytől?</li>
          <li>A túloldalon, <strong>ugyanabban a sorban</strong>, ugyanannyi kockára színezz!</li>
          <li>A tengely melletti kocka tükörképe is a tengely mellé kerül.</li>
        </ul>
        <SymmetryWaterSvg />
        <p className="text-sm text-slate-700">A víz is tükör. A fa tükörképe <strong>fejjel lefelé</strong> áll. A tükörben a jobbra mutató nyíl <strong>balra</strong> mutat.</p>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Hány tükörtengelye van?" badge="Síkidomok" badgeColor="amber">
        <SymmetryAxesSvg />
        <TheoryTable
          headers={['Síkidom', 'Tükörtengely']}
          rows={[
            ['téglalap', '2 (a két középvonala)'],
            ['négyzet', '4 (2 középvonal és 2 átló)'],
            ['sárkány alakú négyszög, háromszög 2 egyforma oldallal', '1'],
            ['háromszög, minden oldala egyforma', '3'],
            ['kör', 'akárhány (minden középen átmenő vonal)'],
            ['ferde négyszög, háromszög 3 különböző oldallal', 'nincs']
          ]}
        />
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Betűk és tárgyak" badge="Betűk" badgeColor="emerald">
        <SymmetryLettersSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Függőleges tengely" badge="A M T V U" badgeColor="sky">
            <p className="text-sm text-slate-700">A bal és a jobb fele egyforma.</p>
          </TheoryCard>
          <TheoryCard title="Vízszintes tengely" badge="B C D E K" badgeColor="amber">
            <p className="text-sm text-slate-700">A felső és az alsó fele egyforma.</p>
          </TheoryCard>
          <TheoryCard title="Mindkettő" badge="H I O X" badgeColor="emerald">
            <p className="text-sm text-slate-700">Fent-lent és jobbra-balra is félbehajthatod.</p>
          </TheoryCard>
          <TheoryCard title="Nincs tengelye" badge="F G J L N P R S Z" badgeColor="rose">
            <p className="text-sm text-slate-700">Sehogy sem fedi a két fele egymást.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Egészítsd ki!" badge="négyzetrács" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy kék kocka 2 kockára van a tengelytől, balra.</li>
              <li>A tükörképe 2 kockára lesz, jobbra, ugyanabban a sorban.</li>
              <li>Így haladj végig minden kockán!</li>
              <li>Végül számold meg: ugyanannyi kocka van a két oldalon?</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Tükörtengely-e?" badge="téglalap átlója" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hajtsuk félbe a téglalapot az átlója mentén!</li>
              <li>A két háromszög egyforma, de a csúcsok <strong>kilógnak</strong>.</li>
              <li>Tehát az átló <strong>nem</strong> tükörtengely.</li>
              <li>Próbáld ki a 2. laborban!</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Mit vágtunk ki?" badge="félbehajtott papír" badgeColor="emerald">
          <p className="text-sm text-slate-700">A hajtásnál fél fenyőfát vágtunk ki. Kinyitva <strong>egész fenyőfa</strong> lesz, kétszer olyan széles. A hajtás vonala lesz a tükörtengelye.</p>
        </TheoryCard>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Két egyforma rész még nem elég"
          wrong="A téglalap átlója tükörtengely, mert két egyforma háromszögre vágja."
          wrongExplanation="Hajtsd félbe! A háromszögek nem fedik egymást, a csúcsok kilógnak."
          correct="A téglalapnak csak 2 tükörtengelye van: a két középvonala."
          correctExplanation="A tükörtengelynél a két fél hajtás után pontosan fedi egymást."
        />
        <TheoryTrapBox
          title="A tükörkép nem eltolás"
          wrong="A jobbra mutató nyilat átrajzolom a tengely másik oldalára, ugyanúgy jobbra."
          wrongExplanation="Ez csak eltolás. A tükörben a kép megfordul."
          correct="A tükörképe balra mutat."
          correctExplanation="Ami a tengelyhez közel van, a tükörképben is közel lesz hozzá."
          tip="Mindig a tengelytől számold a kockákat!"
        />
      </TheorySection>

      {/* 8 – Labor I */}
      <TheorySection title="8. Labor I: Tükrözz a négyzetrácson!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => newGrid('v')} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">Új feladat (álló tengely)</button>
              <button onClick={() => newGrid('h')} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat (fekvő tengely)</button>
            </div>
            <div className="text-sm font-bold text-blue-900 bg-blue-50 rounded-xl px-3 py-2">Kész ábra: {gScore}</div>
          </div>
          <div className="text-sm text-slate-700 text-center font-bold">
            Színezd ki a tükörképet a {task.axis === 'v' ? 'jobb' : 'alsó'} oldalon! Válassz színt, aztán koppints a kockákra.
          </div>
          <div className="flex gap-3 justify-center">
            {usedCols.map((ci) => (
              <button
                key={ci}
                onClick={() => setColor(ci)}
                aria-label={PALETTE[ci].name}
                className={`w-14 h-14 rounded-xl border-4 ${color === ci ? 'border-slate-800 scale-110' : 'border-white ring-1 ring-slate-300'}`}
                style={{ background: PALETTE[ci].fill }}
              />
            ))}
          </div>
          <MirrorGrid task={task} drawn={drawn} check={check} showMirror={showMirror} onCell={onCell} />
          <div className="flex flex-wrap gap-2 justify-center">
            {!check?.ok && (
              <button onClick={doCheck} className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px]">Ellenőrzöm</button>
            )}
            {!check?.ok && (
              <button onClick={() => setShowMirror(!showMirror)} className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold min-h-[48px]">
                {showMirror ? 'Tükör el' : 'Tükörrel megnézem'}
              </button>
            )}
            {!check?.ok && Object.keys(drawn).length > 0 && (
              <button
                onClick={() => {
                  setDrawn({});
                  setCheck(null);
                }}
                className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold min-h-[48px]"
              >
                Törlöm
              </button>
            )}
          </div>
          {check && !check.ok && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{check.msg}</div>}
          {check?.ok && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! Minden kocka ugyanannyira van a tengelytől, mint az eredeti. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9 – Labor II */}
      <TheorySection title="9. Labor II: Hajtsd félbe!" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <button onClick={nextShape} className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-rose-900 bg-rose-50 rounded-xl px-3 py-2">Jó tipp: {fScore}</div>
          </div>
          <div className="text-sm text-slate-700 text-center font-bold">Ez itt: {shape.name}. Tükörtengely a piros szaggatott vonal?</div>
          <FoldStage shape={shape} s={s} done={folded && shape.isAxis} />
          {guess === null ? (
            <div className="flex gap-3 justify-center">
              <button onClick={() => pickGuess(true)} className="px-6 py-3 rounded-2xl text-lg font-black border-2 bg-emerald-50 border-emerald-400 text-emerald-800 min-h-[56px]">
                Igen, az
              </button>
              <button onClick={() => pickGuess(false)} className="px-6 py-3 rounded-2xl text-lg font-black border-2 bg-rose-50 border-rose-300 text-rose-800 min-h-[56px]">
                Nem az
              </button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              {folded && (
                <button onClick={unfold} className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold min-h-[48px]">
                  Kinyitom
                </button>
              )}
            </div>
          )}
          {folded && guess !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${guess === shape.isAxis ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {guess === shape.isAxis ? 'Jól tippeltél! ' : 'Nézd meg a hajtást! '}
              {shape.isAxis ? 'A két fele pontosan fedi egymást: ez tükörtengely. ' : 'A két fele nem fedi egymást: ez nem tükörtengely. '}
              {shape.why}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SymmetryG3Theory;
