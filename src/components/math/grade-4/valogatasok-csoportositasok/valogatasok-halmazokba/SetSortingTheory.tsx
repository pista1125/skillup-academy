import React, { useRef, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import {
  OtterBoatSvg,
  AnimalVennSvg,
  NestedSetsSvg,
  NumberSetsSvg,
  LogicBlocksVennSvg,
  LogicBlocksRowSvg,
  OddOneOutSvg,
  VENN2,
  Venn3Frame,
  VENN3,
  LogicBlock,
  venn3RegionAt,
  logicRegion,
  BlockColor,
  BlockShape,
  OTTER_ONLY,
  OTTER_BOTH,
  BOAT_ONLY
} from './SetSortingFigures';

// ---------------------------------------------------------------------------
// Segédfüggvények (a tesztek is használják)
// ---------------------------------------------------------------------------
export type Region2 = 'A' | 'AB' | 'B' | 'O';

/** Két karika: melyik részbe kerül az elem? */
export const region2 = (inA: boolean, inB: boolean): Region2 => (inA && inB ? 'AB' : inA ? 'A' : inB ? 'B' : 'O');

/** A kétkarikás ábra melyik részébe esik a pont (az SVG koordinátáiban)? */
export const region2At = (x: number, y: number): Region2 =>
  region2(Math.hypot(x - VENN2.ax, y - VENN2.cy) < VENN2.r, Math.hypot(x - VENN2.bx, y - VENN2.cy) < VENN2.r);

export const REGION2_NAME: Record<Region2, string> = {
  A: 'csak a bal karikába',
  AB: 'a közös részbe',
  B: 'csak a jobb karikába',
  O: 'a karikákon kívülre'
};

const svgPoint = (svg: SVGSVGElement | null, e: React.MouseEvent, w: number, h: number): [number, number] => {
  if (!svg) return [-1, -1];
  const r = svg.getBoundingClientRect();
  if (!r.width || !r.height) return [-1, -1];
  return [((e.clientX - r.left) / r.width) * w, ((e.clientY - r.top) / r.height) * h];
};

// ---------------------------------------------------------------------------
// Labor I – Tedd a helyére! (két karika)
// ---------------------------------------------------------------------------
export interface VennTask {
  name: string;
  frame: string;
  labelA: string;
  labelB: string;
  items: { t: string; inA: boolean; inB: boolean }[];
}

export const VENN_TASKS: VennTask[] = [
  {
    name: 'Állatok',
    frame: 'ÁLLATOK',
    labelA: 'Madár',
    labelB: 'Háziállat',
    items: [
      { t: '🦩 flamingó', inA: true, inB: false },
      { t: '🦆 kacsa', inA: true, inB: true },
      { t: '🐕 kutya', inA: false, inB: true },
      { t: '🦉 bagoly', inA: true, inB: false },
      { t: '🐔 tyúk', inA: true, inB: true },
      { t: '🐴 ló', inA: false, inB: true },
      { t: '🦌 őz', inA: false, inB: false },
      { t: '🪿 liba', inA: true, inB: true }
    ]
  },
  {
    name: 'Kerek számok',
    frame: 'Négyjegyű számok',
    labelA: 'Az 50 többszörösei',
    labelB: 'A 20 többszörösei',
    items: [
      { t: '2350', inA: true, inB: false },
      { t: '4580', inA: false, inB: true },
      { t: '5600', inA: true, inB: true },
      { t: '7200', inA: true, inB: true },
      { t: '8060', inA: false, inB: true },
      { t: '8150', inA: true, inB: false },
      { t: '1040', inA: false, inB: true },
      { t: '1530', inA: false, inB: false }
    ]
  },
  {
    name: 'Páros és négyjegyű',
    frame: 'Számok',
    labelA: 'Páros számok',
    labelB: 'Négyjegyű számok',
    items: [
      { t: '1246', inA: true, inB: true },
      { t: '54', inA: true, inB: false },
      { t: '9579', inA: false, inB: true },
      { t: '475', inA: false, inB: false },
      { t: '6606', inA: true, inB: true },
      { t: '48', inA: true, inB: false },
      { t: '1005', inA: false, inB: true },
      { t: '33', inA: false, inB: false }
    ]
  }
];

const REGION_CENTER: Record<Region2, [number, number]> = { A: [86, 143], AB: [180, 143], B: [274, 143], O: [318, 214] };

export const VennPlaceLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [placed, setPlaced] = useState<Record<number, Region2>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const task = VENN_TASKS[ti];

  const reset = (i: number) => {
    setTi(i);
    setPlaced({});
    setSel(null);
    setChecked(false);
  };

  const put = (reg: Region2) => {
    if (sel === null) return;
    setPlaced((p) => ({ ...p, [sel]: reg }));
    setChecked(false);
    const next = task.items.findIndex((_, i) => i !== sel && placed[i] === undefined);
    setSel(next >= 0 ? next : null);
  };

  const onSvgClick = (e: React.MouseEvent) => {
    const [x, y] = svgPoint(svgRef.current, e, 360, 240);
    if (x < 0) return;
    put(region2At(x, y));
  };

  const correctOf = (i: number) => region2(task.items[i].inA, task.items[i].inB);
  const allPlaced = task.items.every((_, i) => placed[i] !== undefined);
  const good = task.items.filter((_, i) => placed[i] === correctOf(i)).length;

  const byRegion = (reg: Region2) => task.items.map((_, i) => i).filter((i) => placed[i] === reg);

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {VENN_TASKS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => reset(i)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${i === ti ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}. {t.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">
        1. Kattints egy kártyára! 2. Kattints a halmazábra arra a részére, ahová szerinted tartozik (vagy használd a gombokat)! Ha meggondoltad magad, kattints újra a kártyára.
      </p>
      <div className="flex flex-wrap gap-2">
        {task.items.map((it, i) => {
          const isSel = sel === i;
          const st = checked && placed[i] !== undefined ? (placed[i] === correctOf(i) ? 'ok' : 'bad') : '';
          return (
            <button
              key={it.t}
              onClick={() => setSel(i)}
              className={`min-w-[64px] px-3 py-2 rounded-xl border-2 text-sm font-bold transition ${
                isSel
                  ? 'border-indigo-600 bg-indigo-100 text-indigo-900 scale-105'
                  : st === 'ok'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                    : st === 'bad'
                      ? 'border-rose-400 bg-rose-50 text-rose-800'
                      : placed[i] !== undefined
                        ? 'border-slate-200 bg-slate-50 text-slate-400'
                        : 'border-slate-300 bg-white text-slate-800 hover:border-indigo-400'
              }`}
            >
              {it.t}
            </button>
          );
        })}
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 360 240"
        className="w-full max-w-[520px] h-auto mx-auto cursor-pointer select-none"
        fontFamily="system-ui, sans-serif"
        onClick={onSvgClick}
      >
        <rect x="4" y="4" width="352" height="232" rx="12" fill="#f8fafc" stroke="#0f766e" strokeWidth="2" />
        <rect x="4" y="4" width={task.frame.length * 7 + 16} height="22" rx="8" fill="#0f766e" />
        <text x="12" y="19" fontSize="11" fontWeight="bold" fill="#fff">
          {task.frame}
        </text>
        <circle cx={VENN2.ax} cy={VENN2.cy} r={VENN2.r} fill="#16a34a" fillOpacity="0.12" stroke="#16a34a" strokeWidth="2.2" />
        <circle cx={VENN2.bx} cy={VENN2.cy} r={VENN2.r} fill="#dc2626" fillOpacity="0.12" stroke="#dc2626" strokeWidth="2.2" />
        <text x={VENN2.ax - 22} y={VENN2.cy - VENN2.r - 6} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#15803d">
          {task.labelA}
        </text>
        <text x={VENN2.bx + 22} y={VENN2.cy - VENN2.r - 6} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
          {task.labelB}
        </text>
        {(['A', 'AB', 'B', 'O'] as Region2[]).map((reg) => {
          const list = byRegion(reg);
          const [cx, cy] = REGION_CENTER[reg];
          return list.map((i, k) => {
            const x = reg === 'O' ? (k % 2 ? 32 : 328) : cx;
            const y = reg === 'O' ? 216 - Math.floor(k / 2) * 16 : cy + (k - (list.length - 1) / 2) * 17;
            const fill = checked ? (placed[i] === correctOf(i) ? '#047857' : '#be123c') : '#1e293b';
            return (
              <text key={i} x={x} y={y} fontSize="10.5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fill={fill}>
                {task.items[i].t}
              </text>
            );
          });
        })}
      </svg>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(
          [
            ['A', `Csak: ${task.labelA}`],
            ['AB', 'Közös rész (mindkettő)'],
            ['B', `Csak: ${task.labelB}`],
            ['O', 'Egyik karikába sem']
          ] as [Region2, string][]
        ).map(([reg, label]) => (
          <button
            key={reg}
            disabled={sel === null}
            onClick={() => put(reg)}
            className="px-3 py-3 rounded-xl text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-900 hover:bg-indigo-100 disabled:opacity-40"
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          disabled={!allPlaced}
          onClick={() => setChecked(true)}
          className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-40"
        >
          Ellenőrzés
        </button>
        <button onClick={() => reset(ti)} className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold">
          Újrakezdem
        </button>
        {!allPlaced && <span className="text-xs text-slate-500">Még {task.items.filter((_, i) => placed[i] === undefined).length} kártya vár a helyére.</span>}
      </div>
      {checked && (
        <div className={`text-sm font-bold ${good === task.items.length ? 'text-emerald-700' : 'text-rose-700'}`}>
          {good === task.items.length
            ? `Hibátlan! Mind a ${task.items.length} kártya jó helyen van. 🎉`
            : `${good} kártya jó helyen van, ${task.items.length - good} nem. A pirosakat tedd át: kérdezd meg magadtól mindkét címkét!`}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Logikai lapok három karikában
// ---------------------------------------------------------------------------
export const LOGIC_LAB_BLOCKS: { color: BlockColor; shape: BlockShape; holed: boolean }[] = [
  { color: 'kék', shape: 'kör', holed: false },
  { color: 'piros', shape: 'háromszög', holed: true },
  { color: 'kék', shape: 'háromszög', holed: true },
  { color: 'sárga', shape: 'négyzet', holed: false },
  { color: 'zöld', shape: 'téglalap', holed: true },
  { color: 'kék', shape: 'téglalap', holed: true },
  { color: 'sárga', shape: 'háromszög', holed: false },
  { color: 'kék', shape: 'háromszög', holed: false },
  { color: 'piros', shape: 'kör', holed: true },
  { color: 'zöld', shape: 'kör', holed: false }
];

export const blockRegion = (b: { color: BlockColor; shape: BlockShape; holed: boolean }) =>
  logicRegion(b.color === 'kék', b.holed, b.shape === 'háromszög');

export const LogicVennLab: React.FC = () => {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const b = LOGIC_LAB_BLOCKS[i];
  const ans = blockRegion(b);
  const ok = pick === ans;

  const choose = (n: number) => {
    if (ok) return;
    setPick(n);
    if (n === ans) setDone((d) => [...d, i]);
  };

  const next = () => {
    setI((i + 1) % LOGIC_LAB_BLOCKS.length);
    setPick(null);
    if (i + 1 === LOGIC_LAB_BLOCKS.length) setDone([]);
  };

  const yn = (v: boolean) => (v ? 'igen' : 'nem');

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>
          {i + 1}. / {LOGIC_LAB_BLOCKS.length} lap
        </span>
        <span>Jó helyre tett lapok: {done.length}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 items-center">
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 80 80" className="w-24 h-24">
            <rect x="2" y="2" width="76" height="76" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <LogicBlock x={40} y={40} shape={b.shape} color={b.color} holed={b.holed} s={42} />
          </svg>
          <div className="text-xs text-center font-bold text-slate-700">
            {b.color}, {b.holed ? 'lyukas' : 'nem lyukas'}, {b.shape}
          </div>
        </div>
        <svg
          ref={svgRef}
          viewBox="0 0 360 240"
          className="w-full max-w-[480px] h-auto mx-auto cursor-pointer select-none"
          onClick={(e) => {
            const [x, y] = svgPoint(svgRef.current, e, 360, 240);
            if (x >= 0) choose(venn3RegionAt(x, y));
          }}
        >
          <Venn3Frame highlight={pick} />
          {done.map((k) => {
            const bb = LOGIC_LAB_BLOCKS[k];
            const [x, y] = VENN3.numbers[blockRegion(bb)];
            const off = (done.filter((d, j) => j < done.indexOf(k) && blockRegion(LOGIC_LAB_BLOCKS[d]) === blockRegion(bb)).length + 1) * 15;
            return <LogicBlock key={k} x={x + off} y={y + 2} shape={bb.shape} color={bb.color} holed={bb.holed} s={12} />;
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <button
            key={n}
            onClick={() => choose(n)}
            className={`w-12 h-12 rounded-xl text-lg font-black ${
              pick === n ? (ok ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white') : 'bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className={`rounded-xl p-3 text-sm font-bold ${ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          {ok ? 'Helyes! ' : `A(z) ${pick}. rész nem jó. Tedd fel a három kérdést! `}
          Kék? <u>{yn(b.color === 'kék')}</u> · Lyukas? <u>{yn(b.holed)}</u> · Háromszög? <u>{yn(b.shape === 'háromszög')}</u>
          {ok && ` → a(z) ${ans}. részbe kerül.`}
        </div>
      )}
      {ok && (
        <button onClick={next} className="px-5 py-3 rounded-xl bg-amber-500 text-white font-bold">
          Következő lap →
        </button>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tananyag
// ---------------------------------------------------------------------------
export const SetSortingTheory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    grade={4}
    chapterId="valogatasok-csoportositasok"
    topicId="g4-grouping"
    subtopicId="valogatasok-halmazokba"
    title="1. Válogatások halmazokba"
    subtitle="Állatok, gyerekek, számok és logikai lapok szétválogatása halmazábrába: karikák, közös rész, karikán kívüli rész."
    badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
    themeColor="indigo"
    pdfFilename="4_osztaly_valogatasok_halmazokba_tananyag.pdf"
    practiceTitle="Készen állsz a halmazábrás válogatásra?"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS SZABÁLY — HOVÁ KERÜL AZ ELEM?',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
            <span className="text-base font-black text-indigo-900 dark:text-indigo-200">Minden elemnél kérdezd meg mindkét címkét!</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>
              Csak az egyik címke igaz rá → <strong>abba a karikába</strong> kerül, a közös részen kívülre.
            </li>
            <li>
              Mindkét címke igaz rá → a <strong>közös részbe</strong> kerül.
            </li>
            <li>
              Egyik sem igaz rá → a <strong>karikákon kívülre</strong>, de a kereten (az alaphalmazon) belülre kerül.
            </li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 131. o." badgeColor="indigo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Manóék az állatkerti kirándulásra készülnek. Karesz azt javasolja: legyenek a <strong>védett emlősök</strong> az <strong>alaphalmaz</strong> elemei. Az egyik karikába kerüljenek az Európában élők, a másikba az Amerikában élők.
          </p>
          <p>
            A <strong>hód</strong> és a <strong>hiúz</strong> mindkét kontinensen él, ezért a két karika <strong>közös részébe</strong> kerül. A koala egyik helyen sem él, őt a karikákon kívülre, de az alaphalmazba tesszük.
          </p>
          <TheoryCard title="Szavak, amiket használunk" badge="Szótár" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>
                <strong>alaphalmaz</strong>: a keret – az összes elem, amit szétválogatunk;
              </li>
              <li>
                <strong>címke</strong>: megmondja, milyen elemek kerülnek a karikába;
              </li>
              <li>
                <strong>közös rész</strong>: ide az kerül, amire mindkét címke igaz.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <AnimalVennSvg />
      </div>
    </TheorySection>

    <TheorySection title="2. Nézzük meg együtt! Ki melyik programon volt?" badge="TK 132. o. 2." badgeColor="emerald">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <OtterBoatSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A negyedikesek a Tisza-tavi Ökocentrumban jártak. Olvassunk az ábráról!</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Vidraetetést néztek:</strong> a zöld keretben mindenki → {OTTER_ONLY.length + OTTER_BOTH.length} gyerek.
            </li>
            <li>
              <strong>Vidraetetést néztek, de nem csónakáztak:</strong> csak a zöld rész → {OTTER_ONLY.join(', ')}.
            </li>
            <li>
              <strong>Csónakáztak, de nem nézték a vidraetetést:</strong> csak a kék rész → {BOAT_ONLY.join(', ')}.
            </li>
            <li>
              <strong>Mindkét programon részt vettek:</strong> a közös rész → {OTTER_BOTH.length} gyerek ({OTTER_BOTH.join(', ')}).
            </li>
          </ol>
          <TheoryCallout type="tip" title="Figyeld a kis szót: „de nem”!">
            „Vidraetetést néztek” – ide a közös rész is beletartozik. „Vidraetetést néztek, <strong>de nem</strong> csónakáztak” – ide már csak a közös részen kívüliek.
          </TheoryCallout>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="3. Számok halmazokban" badge="TK 132. o. 3. b)" badgeColor="blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <NumberSetsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Minden számnál két kérdést teszünk fel:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Páros?</strong> (Az utolsó számjegye 0, 2, 4, 6 vagy 8?)
            </li>
            <li>
              <strong>Négyjegyű?</strong> (1000 és 9999 között van?)
            </li>
          </ul>
          <TheoryCard title="Nézzük meg együtt!" badge="Példák" badgeColor="sky">
            <ul className="space-y-1 text-sm text-slate-700">
              <li>
                <strong>1246</strong>: páros ✔, négyjegyű ✔ → közös rész.
              </li>
              <li>
                <strong>54</strong>: páros ✔, négyjegyű ✘ → csak a Páros számok karikába.
              </li>
              <li>
                <strong>9579</strong>: páros ✘, négyjegyű ✔ → csak a Négyjegyű számok karikába.
              </li>
              <li>
                <strong>475</strong>: páros ✘, négyjegyű ✘ → a karikákon kívülre, de a Számok keretbe.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="4. Halmaz a halmazban" badge="MF II. 48. o. 2." badgeColor="teal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <NestedSetsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            Néha az egyik karika <strong>teljesen a másik belsejében</strong> van. Minden gyümölcs növény, de nem minden növény gyümölcs. A szörpnek való gyümölcsök a gyümölcsökön belül egy kisebb csoportot alkotnak.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>málna</strong> → gyümölcs, és szörp is készülhet belőle → a legbelső karikába;
            </li>
            <li>
              <strong>dió</strong> → gyümölcs, de szörpöt nem főzünk belőle → csak a Gyümölcs karikába;
            </li>
            <li>
              <strong>hagyma</strong> → növény, de nem gyümölcs → a kereten belül, a karikákon kívül.
            </li>
          </ul>
          <TheoryCallout type="info" title="Síkidomokkal is így van (MF II. 51. o. 11.)">
            A <strong>négyszögek</strong> mind sokszögek, ezért a Négyszögek karika a Sokszögek karikán belül van. A kör, a csepp és a holdsarló görbe vonallal határolt síkidom – ezek nem sokszögek.
          </TheoryCallout>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="5. Keresd a kakukktojást!" badge="MF II. 50. o. 8." badgeColor="amber">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <OddOneOutSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            A <strong>kakukktojás</strong> az az elem, amelyik nem illik a többi közé. Először találd ki, mi a közös a többiben – ez lesz a halmaz címe!
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              a) Mind páros, csak a <strong>3517</strong> páratlan. Cím: <em>Páros számok</em>.
            </li>
            <li>
              b) Mind páratlan, csak a <strong>8128</strong> páros. Cím: <em>Páratlan számok</em>.
            </li>
            <li>
              c) Mind 0-ra végződik, csak a <strong>6195</strong> nem. Cím: <em>Kerek tízesek</em>.
            </li>
          </ul>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="6. Vigyázz! A közös rész csapdája" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A kacsa csak az egyik karikába került"
        wrong="A kacsa madár, ezért a Madár karikába tettem, és kész."
        wrongExplanation="A kacsa háziállat is! Ha csak a Madár karika bal részébe teszed, az ábra azt mondja róla, hogy nem háziállat."
        correct="A kacsa madár is és háziállat is → a két karika közös részébe kerül."
        correctExplanation="Minden elemnél mindkét címkét nézd meg, ne állj meg az első igennél!"
        tip="A karikákon kívüli rész sem üres hely: oda kerül, amire egyik címke sem igaz (például az őz)."
      />
    </TheorySection>

    <TheorySection title="7. Interaktív Laboratórium I: Tedd a helyére!" badge="Labor" badgeColor="indigo">
      <VennPlaceLab />
    </TheorySection>

    <TheorySection title="8. Interaktív Laboratórium II: Logikai lapok három karikában" badge="TK 134. o. 8." badgeColor="amber">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-4">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            Három karika: <strong>Kék</strong>, <strong>Lyukas</strong>, <strong>Háromszög</strong>. A részeket 1-től 8-ig megszámoztuk. A tankönyv lapjai közül például:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>G: kék, lyukas háromszög → mindhárom igaz → <strong>5.</strong> rész (a közepe);</li>
            <li>D: kék, nem lyukas négyzet → csak a Kék igaz → <strong>1.</strong> rész;</li>
            <li>C: zöld, nem lyukas kör → egyik sem igaz → <strong>8.</strong> rész.</li>
          </ul>
          <LogicBlocksRowSvg />
        </div>
        <LogicBlocksVennSvg />
      </div>
      <LogicVennLab />
    </TheorySection>
  </TheoryTemplate>
);

export default SetSortingTheory;
