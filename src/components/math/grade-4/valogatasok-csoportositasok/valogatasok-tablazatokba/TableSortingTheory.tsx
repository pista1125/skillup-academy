import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  PencilTreeSvg,
  PencilTableSvg,
  PencilVennSvg,
  LineTypesSvg,
  AnimalTableSvg,
  ThreeWaysSvg,
  Pencil,
  TK_PENCILS,
  WATER_ANIMALS,
  PencilColor
} from './TableSortingFigures';
import { Venn2, LogicBlock, LOGIC_BLOCKS_TK } from '../valogatasok-halmazokba/SetSortingFigures';

// ---------------------------------------------------------------------------
// Segédek
// ---------------------------------------------------------------------------
/** Egy 2 × 2-es táblázat mezője: sor (r) és oszlop (c) – true = a tulajdonság igaz. */
export type Cell = 'YY' | 'YN' | 'NY' | 'NN';
export const cellOf = (row: boolean, col: boolean): Cell => `${row ? 'Y' : 'N'}${col ? 'Y' : 'N'}` as Cell;

// ---------------------------------------------------------------------------
// Labor I – Válogass táblázatba!
// ---------------------------------------------------------------------------
interface TItem {
  key: string;
  label: string;
  row: boolean;
  col: boolean;
  pencil?: { color: PencilColor; eraser: boolean };
  block?: (typeof LOGIC_BLOCKS_TK)[number];
}

export interface TableTask {
  name: string;
  rows: [string, string];
  cols: [string, string];
  items: TItem[];
}

export const TABLE_TASKS: TableTask[] = [
  {
    name: 'Ceruzák',
    rows: ['Radíros ceruza', 'Nem radíros ceruza'],
    cols: ['Kék ceruza', 'Nem kék ceruza'],
    items: TK_PENCILS.map((p, i) => ({
      key: `p${i}`,
      label: `${p.color}${p.eraser ? ', radíros' : ', radír nélkül'}`,
      row: p.eraser,
      col: p.color === 'kék',
      pencil: p
    }))
  },
  {
    name: 'Vízi állatok',
    rows: ['Hal', 'Nem hal'],
    cols: ['Emlős', 'Nem emlős'],
    items: WATER_ANIMALS.map((a, i) => ({ key: `a${i}`, label: a.t, row: a.hal, col: a.emlos }))
  },
  {
    name: 'Logikai lapok',
    rows: ['Lyukas', 'Nem lyukas'],
    cols: ['Kék', 'Nem kék'],
    items: LOGIC_BLOCKS_TK.map((b) => ({ key: b.id, label: `${b.id}: ${b.color}, ${b.holed ? 'lyukas' : 'nem lyukas'} ${b.shape}`, row: b.holed, col: b.color === 'kék', block: b }))
  }
];

const ItemFace: React.FC<{ it: TItem; small?: boolean }> = ({ it, small }) => {
  if (it.pencil)
    return (
      <svg viewBox="0 0 60 14" className={small ? 'w-12 h-3' : 'w-16 h-4'} aria-label={it.label}>
        <Pencil x={2} y={7} color={it.pencil.color} eraser={it.pencil.eraser} len={56} />
      </svg>
    );
  if (it.block)
    return (
      <span className="inline-flex items-center gap-1">
        <svg viewBox="0 0 30 30" className={small ? 'w-5 h-5' : 'w-7 h-7'} aria-label={it.label}>
          <LogicBlock x={15} y={15} shape={it.block.shape} color={it.block.color} holed={it.block.holed} s={it.block.small ? 16 : 24} />
        </svg>
        <span className="text-[11px] font-black">{it.block.id}</span>
      </span>
    );
  return <span>{it.label}</span>;
};

export const TableSortLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [placed, setPlaced] = useState<Record<string, Cell>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const task = TABLE_TASKS[ti];

  const reset = (i: number) => {
    setTi(i);
    setPlaced({});
    setSel(null);
    setChecked(false);
  };
  const put = (c: Cell) => {
    if (!sel) return;
    setPlaced((p) => ({ ...p, [sel]: c }));
    setChecked(false);
    const next = task.items.find((it) => it.key !== sel && placed[it.key] === undefined);
    setSel(next ? next.key : null);
  };
  const ok = (it: TItem) => placed[it.key] === cellOf(it.row, it.col);
  const allPlaced = task.items.every((it) => placed[it.key] !== undefined);
  const good = task.items.filter(ok).length;

  const cellBox = (c: Cell) => (
    <button
      key={c}
      onClick={() => put(c)}
      aria-label={`mező ${c}`}
      className={`min-h-[84px] p-2 rounded-xl border-2 flex flex-wrap gap-1.5 content-start text-left transition ${
        sel ? 'border-purple-400 bg-purple-50 hover:bg-purple-100' : 'border-slate-200 bg-white'
      }`}
    >
      {task.items
        .filter((it) => placed[it.key] === c)
        .map((it) => (
          <span
            key={it.key}
            className={`px-1.5 py-0.5 rounded-lg text-xs font-bold border ${
              checked ? (ok(it) ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : 'border-rose-400 bg-rose-50 text-rose-800') : 'border-slate-200 bg-slate-50 text-slate-800'
            }`}
          >
            <ItemFace it={it} small />
          </span>
        ))}
    </button>
  );

  return (
    <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {TABLE_TASKS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => reset(i)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${i === ti ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}. {t.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">Kattints egy elemre, aztán a táblázat megfelelő mezőjére! Minden elem pontosan egy mezőbe kerül.</p>
      <div className="flex flex-wrap gap-2">
        {task.items
          .filter((it) => placed[it.key] === undefined || sel === it.key)
          .map((it) => (
            <button
              key={it.key}
              onClick={() => setSel(it.key)}
              className={`px-3 py-2 rounded-xl border-2 text-sm font-bold ${sel === it.key ? 'border-purple-600 bg-purple-100 scale-105' : 'border-slate-300 bg-white hover:border-purple-400'}`}
            >
              <ItemFace it={it} />
            </button>
          ))}
        {task.items.every((it) => placed[it.key] !== undefined) && <span className="text-sm text-slate-500 italic">Minden elem a táblázatban van.</span>}
      </div>
      <div className="grid grid-cols-[90px_1fr_1fr] gap-2 items-stretch">
        <div />
        <div className="rounded-xl bg-purple-600 text-white text-center text-sm font-bold py-2">{task.cols[0]}</div>
        <div className="rounded-xl bg-purple-600 text-white text-center text-sm font-bold py-2">{task.cols[1]}</div>
        <div className="rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center text-center p-1">{task.rows[0]}</div>
        {cellBox('YY')}
        {cellBox('YN')}
        <div className="rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center text-center p-1">{task.rows[1]}</div>
        {cellBox('NY')}
        {cellBox('NN')}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={!allPlaced} onClick={() => setChecked(true)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-40">
          Ellenőrzés
        </button>
        <button onClick={() => reset(ti)} className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold">
          Újrakezdem
        </button>
      </div>
      {checked && (
        <div className={`text-sm font-bold ${good === task.items.length ? 'text-emerald-700' : 'text-rose-700'}`}>
          {good === task.items.length
            ? 'Hibátlan! Minden elem a saját sorában ÉS a saját oszlopában van. 🎉'
            : `${good} elem jó helyen van, ${task.items.length - good} nem. Nézd meg a pirosakat: jó a sor? jó az oszlop?`}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Táblázat és halmazábra egyszerre
// ---------------------------------------------------------------------------
export const LINK_NUMBERS = [1246, 54, 475, 9579, 600, 33, 6606, 1005, 48, 8889, 77, 8002, 423, 9998, 1001];

export const isFourDigit = (n: number) => n >= 1000 && n <= 9999;

export const TableVennLab: React.FC = () => {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Cell | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const n = LINK_NUMBERS[i];
  const ans = cellOf(n % 2 === 0, isFourDigit(n));
  const ok = pick === ans;
  const finished = placed.length === LINK_NUMBERS.length;

  const choose = (c: Cell) => {
    if (ok || finished) return;
    setPick(c);
    if (c === ans) setPlaced((p) => [...p, n]);
  };
  const next = () => {
    setPick(null);
    setI((v) => Math.min(v + 1, LINK_NUMBERS.length - 1));
  };
  const restart = () => {
    setI(0);
    setPick(null);
    setPlaced([]);
  };
  const inCell = (c: Cell) => placed.filter((m) => cellOf(m % 2 === 0, isFourDigit(m)) === c);

  const cellBtn = (c: Cell, rowLbl: string, colLbl: string) => (
    <button
      key={c}
      onClick={() => choose(c)}
      className={`min-h-[64px] rounded-xl border-2 p-2 text-sm font-bold flex flex-wrap gap-1 content-start ${
        pick === c ? (ok ? 'border-emerald-500 bg-emerald-50' : 'border-rose-400 bg-rose-50') : 'border-slate-200 bg-white hover:bg-blue-50'
      }`}
      aria-label={`${rowLbl} – ${colLbl}`}
    >
      {inCell(c).map((m) => (
        <span key={m} className="px-1.5 rounded bg-blue-100 text-blue-900">
          {m}
        </span>
      ))}
    </button>
  );

  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>
          {Math.min(placed.length + 1, LINK_NUMBERS.length)}. / {LINK_NUMBERS.length} szám
        </span>
        <span>Elhelyezve: {placed.length}</span>
      </div>
      <div className="text-center">
        <span className="text-sm text-slate-600">Melyik mezőbe kerül a(z) </span>
        <span className="text-3xl font-black text-blue-700">{finished ? '✔' : n}</span>
        <span className="text-sm text-slate-600"> ?</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <div className="grid grid-cols-[80px_1fr_1fr] gap-2">
          <div />
          <div className="rounded-lg bg-blue-600 text-white text-center text-xs font-bold py-2">Négyjegyű</div>
          <div className="rounded-lg bg-blue-600 text-white text-center text-xs font-bold py-2">Nem négyjegyű</div>
          <div className="rounded-lg bg-green-600 text-white text-xs font-bold flex items-center justify-center">Páros</div>
          {cellBtn('YY', 'Páros', 'Négyjegyű')}
          {cellBtn('YN', 'Páros', 'Nem négyjegyű')}
          <div className="rounded-lg bg-green-600 text-white text-xs font-bold flex items-center justify-center text-center">Nem páros</div>
          {cellBtn('NY', 'Nem páros', 'Négyjegyű')}
          {cellBtn('NN', 'Nem páros', 'Nem négyjegyű')}
        </div>
        <Venn2
          frame="Számok"
          labelA="Páros számok"
          labelB="Négyjegyű számok"
          colorB="#2563eb"
          onlyA={inCell('YN').map(String)}
          both={inCell('YY').map(String)}
          onlyB={inCell('NY').map(String)}
          outside={inCell('NN').map(String)}
          fontSize={10.5}
        />
      </div>
      {pick !== null && !finished && (
        <div className={`rounded-xl p-3 text-sm font-bold ${ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          {ok ? 'Helyes! ' : 'Nem jó. '}
          {n} → {n % 2 === 0 ? 'páros' : 'nem páros'} ({String(n).slice(-1)} a végén), {isFourDigit(n) ? 'négyjegyű' : 'nem négyjegyű'} ({String(n).length} jegyű).
          {ok && ' Nézd: a halmazábrán is megjelent!'}
        </div>
      )}
      {ok && !finished && (
        <button onClick={next} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold">
          Következő szám →
        </button>
      )}
      {finished && (
        <TheoryCallout type="success" title="Mind a 15 szám a helyén! 🎉">
          A táblázat 4 mezője pontosan a halmazábra 4 részének felel meg. A „Nem páros – Nem négyjegyű” mező a karikákon kívüli rész.
          <div className="mt-2">
            <button onClick={restart} className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold">
              Újra
            </button>
          </div>
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tananyag
// ---------------------------------------------------------------------------
export const TableSortingTheory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    grade={4}
    chapterId="valogatasok-csoportositasok"
    topicId="g4-grouping"
    subtopicId="valogatasok-tablazatokba"
    title="2. Válogatások táblázatokba"
    subtitle="Két szempont – négy mező. Ceruzák, vízi állatok, logikai lapok és számok válogatása táblázatba, elágazásos rajzzal és halmazábrával."
    badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
    themeColor="purple"
    pdfFilename="4_osztaly_valogatasok_tablazatokba_tananyag.pdf"
    practiceTitle="Készen állsz a táblázatos válogatásra?"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS SZABÁLY — A 2 × 2-ES TÁBLÁZAT',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
            <span className="text-base font-black text-purple-900 dark:text-purple-200">sor: 1. szempont · oszlop: 2. szempont · 2 · 2 = 4 mező</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Minden elemnél két kérdés: melyik sorba? melyik oszlopba? Ahol a kettő találkozik, oda kerül.</li>
            <li>Minden elem pontosan egy mezőbe kerül. Egy mező üres is maradhat.</li>
            <li>A „Nem kék” oszlopba minden más színű kerül: piros, sárga, zöld, lila…</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk? Három gyerek – háromféle válogatás" badge="TK 133. o. 4." badgeColor="purple">
      <p className="text-sm text-slate-700 leading-relaxed mb-4">
        Kitti, Manó és Mona ugyanazt a 11 ceruzát válogatta szét két szempont szerint: <strong>kék-e</strong>, és <strong>van-e rajta radír</strong>. Mindhárman ugyanazt a négy csoportot kapták – csak másképp rajzolták le.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TheoryCard title="Kitti: elágazásos rajz" badge="ágak" badgeColor="amber">
          <PencilTreeSvg />
          <p className="text-xs text-slate-600 mt-2">Először szín szerint két ágra, aztán mindkét ágat radír szerint még kettőre: 2 · 2 = 4 ágvég.</p>
        </TheoryCard>
        <TheoryCard title="Manó: táblázat" badge="mezők" badgeColor="rose">
          <PencilTableSvg />
          <p className="text-xs text-slate-600 mt-2">A sorok a radírról, az oszlopok a színről szólnak. A 4 mező = Kitti 4 ágvége.</p>
        </TheoryCard>
        <TheoryCard title="Mona: halmazábra" badge="karikák" badgeColor="blue">
          <PencilVennSvg />
          <p className="text-xs text-slate-600 mt-2">B: a kék ceruzák, C: a radíros ceruzák, A: az összes ceruza. A közös részben a kék, radíros ceruzák vannak.</p>
        </TheoryCard>
      </div>
      <ThreeWaysSvg className="w-full max-w-[520px] h-auto mx-auto mt-4" />
    </TheorySection>

    <TheorySection title="2. Nézzük meg együtt! Olvassunk a táblázatból" badge="Mintapélda" badgeColor="emerald">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TheoryTable
          headers={['', 'Kék ceruza', 'Nem kék ceruza', 'Összesen']}
          rows={[
            ['Radíros ceruza', '2', '5', '7'],
            ['Nem radíros ceruza', '3', '1', '4'],
            ['Összesen', '5', '6', '11']
          ]}
        />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Hány kék, radíros ceruza van?</strong> Kék oszlop és Radíros sor találkozása → <strong>2</strong>.
            </li>
            <li>
              <strong>Hány radíros ceruza van összesen?</strong> A Radíros sor két mezője: 2 + 5 = <strong>7</strong>.
            </li>
            <li>
              <strong>Hány kék ceruza van?</strong> A Kék oszlop két mezője: 2 + 3 = <strong>5</strong>.
            </li>
            <li>
              <strong>Mona B és C csoportjának közös része?</strong> A kék ÉS radíros ceruzák → a táblázat bal felső mezője.
            </li>
          </ol>
          <TheoryCallout type="tip" title="Ellenőrizd!">
            A négy mező együtt mindig az összes elem: 2 + 5 + 3 + 1 = 11 ceruza.
          </TheoryCallout>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="3. Vízi állatok táblázatban – az üres mező" badge="TK 133. o. 5." badgeColor="teal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <AnimalTableSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A tankönyv vízi állatait sokféleképpen csoportosíthatod. Most két szempont: <strong>hal-e</strong>, és <strong>emlős-e</strong>.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A <strong>bálna</strong> és a <strong>delfin</strong> a vízben él, de nem hal: emlős, kicsinyét anyatejjel táplálja.</li>
            <li>
              A <strong>csikóhal</strong> furcsa alakú, mégis hal!
            </li>
            <li>A „Hal – Emlős” mező <strong>üres marad</strong>: nincs olyan állat, amelyik hal is és emlős is.</li>
          </ul>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="4. Vonalak csoportosítása" badge="TK 134. o. 6." badgeColor="sky">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <LineTypesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Szempontok: vékony – vastag, folytonos – szaggatott, egyenes – görbe. Két szempontból már táblázat lesz:</p>
          <TheoryTable
            headers={['', 'Egyenes', 'Görbe']}
            rows={[
              ['Folytonos', 'vékony vonal, vastag vonal', 'szabadkézi vonal'],
              ['Nem folytonos', 'szaggatott vonal, pontvonal', '–']
            ]}
          />
        </div>
      </div>
    </TheorySection>

    <TheorySection title="5. Vigyázz! Sor és oszlop összekeverése" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A piros, radíros ceruza rossz mezőbe került"
        wrong="Piros, radíros → a „Nem radíros” sorba, mert „nem kék”."
        wrongExplanation="A „nem” szó az oszlop címében volt (Nem kék ceruza), nem a sorban! Így a ceruza rossz sorba került."
        correct="Piros, radíros → Radíros sor és Nem kék oszlop találkozása."
        correctExplanation="Egyszerre csak egy kérdést tegyél fel: 1. Melyik sor? (radíros? – igen) 2. Melyik oszlop? (kék? – nem)."
        tip="Ujjal kövesd: az egyik kezed a sor mentén, a másik az oszlop mentén halad – ahol találkoznak, az a mező."
      />
    </TheorySection>

    <TheorySection title="6. Interaktív Laboratórium I: Válogass táblázatba!" badge="Labor" badgeColor="purple">
      <TableSortLab />
    </TheorySection>

    <TheorySection title="7. Interaktív Laboratórium II: Táblázat és halmazábra egyszerre" badge="TK 132. o. 3." badgeColor="blue">
      <p className="text-sm text-slate-700 mb-3">
        A tankönyv A, B, C halmazának 15 számát válogatjuk. Te a táblázatba teszed a számot, a halmazábra magától kitöltődik – figyeld meg, melyik mező melyik résznek felel meg!
      </p>
      <TableVennLab />
    </TheorySection>
  </TheoryTemplate>
);

export default TableSortingTheory;
