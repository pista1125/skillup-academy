import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RunnersTreeSvg, PodiumSvg, PairsSvg, NapkinsSvg, NumberCardsSvg, BranchProductSvg, permutations, pairsOf, choose } from './PossibilitiesFigures';
import { PencilTreeSvg } from '../valogatasok-tablazatokba/TableSortingFigures';
import { LogicBlock, BlockColor, BlockShape } from '../valogatasok-halmazokba/SetSortingFigures';

// ---------------------------------------------------------------------------
// Labor I – Írd fel az összes sorrendet!
// ---------------------------------------------------------------------------
export interface OrderTask {
  name: string;
  intro: string;
  names: string[];
  fixedFirst?: string;
  slotLabels: string[];
}

export const ORDER_TASKS: OrderTask[] = [
  {
    name: 'Dobogó',
    intro: 'Anna (A), Bianka (B) és Cecília (C) állhat a dobogóra. Ki hányadik lehetett, ha nem volt holtverseny?',
    names: ['A', 'B', 'C'],
    slotLabels: ['1. hely', '2. hely', '3. hely']
  },
  {
    name: 'Futóverseny',
    intro: 'Alex (A), Barna (B), Csaba (Cs) és Dániel (D) fut. Dániel ér célba elsőnek. Hányféle sorrendben jöhet a többi?',
    names: ['A', 'B', 'Cs'],
    fixedFirst: 'D',
    slotLabels: ['1. helyezett', '2. helyezett', '3. helyezett', '4. helyezett']
  }
];

/** Hány különböző sorrend van (a rögzített első helyet nem számolva)? */
export const orderCount = (t: OrderTask) => permutations(t.names).length;

export const OrderBuilderLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);
  const [found, setFound] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const task = ORDER_TASKS[ti];
  const total = orderCount(task);

  const reset = (i: number) => {
    setTi(i);
    setSlots(ORDER_TASKS[i].names.map(() => null));
    setFound([]);
    setMsg(null);
  };
  const add = (n: string) => {
    if (slots.includes(n)) return;
    const k = slots.indexOf(null);
    if (k < 0) return;
    const s = [...slots];
    s[k] = n;
    setSlots(s);
    setMsg(null);
  };
  const clear = (k: number) => {
    const s = [...slots];
    s[k] = null;
    setSlots(s);
  };
  const write = () => {
    if (slots.includes(null)) {
      setMsg({ ok: false, t: 'Előbb töltsd ki az összes helyet!' });
      return;
    }
    const key = [task.fixedFirst, ...slots].filter(Boolean).join('–');
    if (found.includes(key)) {
      setMsg({ ok: false, t: `A(z) ${key} sorrendet már felírtad! Keress egy újat.` });
    } else {
      const f = [...found, key];
      setFound(f);
      setMsg({ ok: true, t: f.length === total ? `Megvan mind a ${total}! 🎉` : `Új sorrend: ${key}. Még ${total - f.length} hiányzik.` });
    }
    setSlots(task.names.map(() => null));
  };

  const allSlots = task.fixedFirst ? [task.fixedFirst, ...slots] : slots;

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {ORDER_TASKS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => reset(i)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${i === ti ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}. {t.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-700">{task.intro}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {allSlots.map((s, k) => {
          const fixed = !!task.fixedFirst && k === 0;
          const realK = task.fixedFirst ? k - 1 : k;
          return (
            <button
              key={k}
              onClick={() => !fixed && clear(realK)}
              className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center ${
                fixed ? 'bg-slate-200 border-slate-300' : s ? 'bg-amber-100 border-amber-400' : 'bg-white border-dashed border-amber-300'
              }`}
            >
              <span className="text-[10px] text-slate-500">{task.slotLabels[k]}</span>
              <span className="text-2xl font-black text-slate-800">{s ?? '·'}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {task.names.map((n) => (
          <button
            key={n}
            onClick={() => add(n)}
            disabled={slots.includes(n)}
            className="w-14 h-14 rounded-full bg-amber-500 text-white text-xl font-black disabled:opacity-30"
            aria-label={`név ${n}`}
          >
            {n}
          </button>
        ))}
        <button onClick={write} className="px-5 h-14 rounded-xl bg-emerald-600 text-white font-bold">
          Felírom ✍️
        </button>
      </div>
      {msg && <div className={`text-sm font-bold text-center ${msg.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{msg.t}</div>}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
        <div className="text-xs font-bold text-amber-900 mb-2">
          Felírt sorrendek: {found.length} / {total}
        </div>
        <div className="flex flex-wrap gap-2">
          {found
            .slice()
            .sort()
            .map((f) => (
              <span key={f} className="px-2 py-1 rounded-lg bg-white border border-amber-300 font-mono font-bold text-sm">
                {f}
              </span>
            ))}
        </div>
      </div>
      {found.length === total && (
        <TheoryCallout type="success" title="Rendszerezve könnyű!">
          Ha ábécérendbe teszed a sorrendeket, látod: mindegyik betűvel kezdve pontosan 2 sorrend van. 3 · 2 = {total}.
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Logikai lap tervező (szorzás az ágrajzon)
// ---------------------------------------------------------------------------
const ALL_COLORS: BlockColor[] = ['piros', 'kék', 'sárga', 'zöld'];
const ALL_SHAPES: BlockShape[] = ['kör', 'háromszög', 'négyzet', 'téglalap'];

export const countProduct = (colors: number, shapes: number, withHoles: boolean) => colors * shapes * (withHoles ? 2 : 1);

export const ProductLab: React.FC = () => {
  const [colors, setColors] = useState<BlockColor[]>(['piros', 'kék']);
  const [shapes, setShapes] = useState<BlockShape[]>(['kör', 'háromszög', 'négyzet']);
  const [holes, setHoles] = useState(false);
  const [guess, setGuess] = useState(4);
  const [shown, setShown] = useState(false);
  const n = countProduct(colors.length, shapes.length, holes);

  const toggle = <T,>(list: T[], v: T, set: (l: T[]) => void, order: T[]) => {
    const next = list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
    if (next.length === 0) return;
    set(order.filter((x) => next.includes(x)));
    setShown(false);
  };

  const blocks = colors.flatMap((c) => shapes.flatMap((s) => (holes ? [false, true] : [false]).map((h) => ({ c, s, h }))));

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <p className="text-sm text-slate-700">Válaszd ki, milyen színű és milyen alakú lapokat gyártunk! Minden színből minden alakot elkészítünk. Előbb tippelj, aztán nézd meg!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <div className="text-xs font-bold text-slate-600 mb-1">Színek ({colors.length})</div>
          <div className="flex flex-wrap gap-2">
            {ALL_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => toggle(colors, c, setColors, ALL_COLORS)}
                className={`px-3 py-2 rounded-xl text-sm font-bold border-2 ${colors.includes(c) ? 'border-violet-600 bg-violet-100' : 'border-slate-200 bg-white text-slate-400'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-600 mb-1">Alakok ({shapes.length})</div>
          <div className="flex flex-wrap gap-2">
            {ALL_SHAPES.map((s) => (
              <button
                key={s}
                onClick={() => toggle(shapes, s, setShapes, ALL_SHAPES)}
                className={`px-3 py-2 rounded-xl text-sm font-bold border-2 ${shapes.includes(s) ? 'border-violet-600 bg-violet-100' : 'border-slate-200 bg-white text-slate-400'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-600 mb-1">Lyuk</div>
          <button
            onClick={() => {
              setHoles(!holes);
              setShown(false);
            }}
            className={`px-3 py-2 rounded-xl text-sm font-bold border-2 ${holes ? 'border-violet-600 bg-violet-100' : 'border-slate-200 bg-white'}`}
          >
            {holes ? 'lyukas is, nem lyukas is (2)' : 'csak nem lyukas (1)'}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 justify-center">
        <span className="text-sm font-bold text-slate-700">A tippem:</span>
        <button onClick={() => setGuess(Math.max(1, guess - 1))} className="w-12 h-12 rounded-xl bg-slate-100 text-xl font-black" aria-label="kevesebb">
          −
        </button>
        <span className="w-12 text-center text-3xl font-black text-violet-700">{guess}</span>
        <button onClick={() => setGuess(Math.min(32, guess + 1))} className="w-12 h-12 rounded-xl bg-slate-100 text-xl font-black" aria-label="több">
          +
        </button>
        <button onClick={() => setShown(true)} className="px-5 py-3 rounded-xl bg-violet-600 text-white font-bold">
          Megnézem
        </button>
      </div>
      {shown && (
        <div className="space-y-3">
          <div className={`rounded-xl p-3 text-sm font-bold text-center ${guess === n ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
            {guess === n ? 'Telitalálat! ' : `Nem ${guess}, hanem ${n}. `}
            {colors.length} szín · {shapes.length} alak{holes ? ' · 2 (lyukas, nem lyukas)' : ''} = {n} különböző lap
          </div>
          <div className="space-y-1">
            {colors.map((c) => (
              <div key={c} className="flex items-center gap-2 flex-wrap">
                <span className="w-14 text-xs font-bold text-slate-600">{c} →</span>
                {blocks
                  .filter((b) => b.c === c)
                  .map((b, i) => (
                    <svg key={i} viewBox="0 0 34 34" className="w-9 h-9">
                      <LogicBlock x={17} y={17} shape={b.s} color={b.c} holed={b.h} s={24} />
                    </svg>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tananyag
// ---------------------------------------------------------------------------
const LAKE_PAIRS = pairsOf(['A', 'B', 'C', 'D', 'E']).map((p) => p.join(''));
const NAPKIN_SETS = choose(['S', 'P', 'K', 'Z', 'F'], 3).map((p) => p.join(''));

export const PossibilitiesTheory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    grade={4}
    chapterId="valogatasok-csoportositasok"
    topicId="g4-grouping"
    subtopicId="hanyfele-lehetoseg-van"
    title="3. Hányféle lehetőség van?"
    subtitle="Sorrendek, párok, választások: rendszerezett felírás kezdőbetűkkel és elágazásos rajzzal – hogy egy lehetőség se maradjon ki, és egyik se ismétlődjön."
    badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
    themeColor="amber"
    pdfFilename="4_osztaly_hanyfele_lehetoseg_van_tananyag.pdf"
    practiceTitle="Készen állsz a lehetőségek összeszámolására?"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS SZABÁLY — RENDSZEREZZ!',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
            <span className="text-base font-black text-amber-900 dark:text-amber-200">Kezdőbetűk + elágazásos rajz = semmi sem marad ki</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Sorrend: 3 gyerek → 3 · 2 · 1 = 6 sorrend; 4 gyerek → 4 · 3 · 2 · 1 = 24 sorrend.</li>
            <li>Két választás egymás után (pl. 2 szín, minden színből 3 alak) → 2 · 3 = 6 lehetőség.</li>
            <li>Párok, ha AB = BA: minden párt csak egyszer írunk fel (A-val kezdve, aztán B-vel …).</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk? Az elágazásos rajz" badge="TK 25. o. 11." badgeColor="amber">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Alex, Barna, Csaba és Dániel versenyt fut. <strong>Hányféle sorrendben érhetnek célba, ha Dániel fut be elsőnek?</strong>
          </p>
          <p>
            A tankönyv tanácsa: <em>„Ennek a feladatnak a megoldásához célszerű elágazásos rajzot készíteni. A lejegyzéshez a fiúk nevének kezdőbetűjét használjuk.”</em>
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Az 1. hely biztos: D.</li>
            <li>A 2. helyre 3 fiú kerülhet: A, B vagy Cs → 3 ág.</li>
            <li>Mindegyik ágon a 3. helyre már csak 2 fiú maradt → 2-2 ág.</li>
            <li>A 4. helyre az egyetlen maradék kerül.</li>
          </ol>
          <TheoryCallout type="success" title="Eredmény">
            3 · 2 · 1 = <strong>6 sorrend</strong>: D–A–B–Cs, D–A–Cs–B, D–B–A–Cs, D–B–Cs–A, D–Cs–A–B, D–Cs–B–A.
          </TheoryCallout>
        </div>
        <RunnersTreeSvg />
      </div>
    </TheorySection>

    <TheorySection title="2. Nézzük meg együtt! Ki állhat a dobogón?" badge="TK 86. o. 3–4." badgeColor="blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <PodiumSvg names={['A', 'B', 'C']} />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Anna, Bianka és Cecília állhat a dobogóra. Rendszerezve írjuk fel, ki melyik helyre kerül:</p>
          <div className="grid grid-cols-3 gap-2 font-mono font-bold text-center">
            {permutations(['A', 'B', 'C']).map((p) => (
              <span key={p.join('')} className="px-2 py-1 rounded-lg bg-blue-50 border border-blue-200">
                {p.join('–')}
              </span>
            ))}
          </div>
          <p>
            Előbb az összes A-val kezdődőt (2), aztán a B-vel (2), végül a C-vel kezdődőt (2): <strong>3 · 2 = 6</strong> lehetőség.
          </p>
          <TheoryCard title="Szülők sétálnak a kisfiúval" badge="TK 86. o. 4. a)" badgeColor="sky">
            <p className="text-sm text-slate-700">
              A szülők közrefogják a kisfiút. Csak két lehetőség van: <strong>apa – fiú – anya</strong> vagy <strong>anya – fiú – apa</strong>. Ha Anna is velük tart, ő a sor bal vagy jobb szélére állhat: 2 · 2 = <strong>4</strong> lehetőség.
            </p>
          </TheoryCard>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="3. Szorzás az ágakon: két választás egymás után" badge="TK 133. o. 4." badgeColor="purple">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <PencilTreeSvg />
          <p className="text-xs text-slate-600">Kitti ceruzái: 2 szín-ág (kékek, nem kékek), mindegyik 2 felé ágazik (radíros, nem radíros) → 2 · 2 = 4 csoport.</p>
        </div>
        <div className="space-y-3">
          <BranchProductSvg />
          <p className="text-xs text-slate-600">Logikai lapok: 2 szín, minden színhez 3 alak → 2 · 3 = 6 különböző lap.</p>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="4. Párok és választások – ahol a sorrend nem számít" badge="MF I" badgeColor="teal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-2">
          <PairsSvg />
          <p className="text-sm text-slate-700">
            Az A, B, C, D, E tavakat párba állítjuk. <strong>AB = BA</strong>, ezért mindegyik párt csak egyszer írjuk fel. Rendszerezve: A-val 4 pár, B-vel (A nélkül) 3, C-vel 2, D-vel 1. Összesen 4 + 3 + 2 + 1 = <strong>{LAKE_PAIRS.length}</strong> pár.
          </p>
        </div>
        <div className="space-y-2">
          <NapkinsSvg />
          <p className="text-sm text-slate-700">
            A papírboltban 5 színű szalvéta van. <strong>Hányféleképpen vásárolhatok 3 különböző színűt?</strong> Kezdőbetűkkel, rendszerezve (a sorrend nem számít):
          </p>
          <div className="flex flex-wrap gap-1.5 font-mono font-bold text-sm">
            {NAPKIN_SETS.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded bg-teal-50 border border-teal-200">
                {s}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-700">
            Összesen <strong>{NAPKIN_SETS.length}</strong> lehetőség.
          </p>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="5. Számkártyák" badge="Gyakorlás" badgeColor="emerald">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-2">
          <NumberCardsSvg className="w-full max-w-[240px] h-auto" />
          <p className="text-sm text-slate-700">
            Az 1, 2, 3 kártyával (mindegyiket egyszer használva) ennyi háromjegyű szám rakható ki: <strong>{permutations(['1', '2', '3']).map((p) => p.join('')).join(', ')}</strong> – ez 6 szám.
          </p>
        </div>
        <div className="space-y-2">
          <NumberCardsSvg className="w-full max-w-[240px] h-auto" digits={['0', '5', '7']} />
          <p className="text-sm text-slate-700">
            A 0, 5, 7 kártyával csak 4 háromjegyű szám készül: 507, 570, 705, 750. A <strong>0 nem állhat elöl</strong>, mert akkor nem háromjegyű számot kapnánk!
          </p>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="6. Vigyázz! Kimaradt vagy kétszer írtad?" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Összevissza felírt sorrendek"
        wrong="ABC, BCA, CAB, ACB, BCA – kész, ez 5 lehetőség."
        wrongExplanation="A BCA kétszer szerepel, a BAC és a CBA pedig kimaradt. Ha össze-vissza írunk, könnyen tévedünk."
        correct="ABC, ACB · BAC, BCA · CAB, CBA – 6 lehetőség."
        correctExplanation="Rendszerezz: előbb az összes A-val kezdődőt, aztán B-vel, végül C-vel. Mindegyik kezdőbetűhöz ugyanannyi sorrend tartozik."
        tip="Párosításnál figyeld meg: AB és BA ugyanaz a pár, ha csak az számít, kik vannak együtt!"
      />
    </TheorySection>

    <TheorySection title="7. Interaktív Laboratórium I: Írd fel az összes sorrendet!" badge="Labor" badgeColor="amber">
      <OrderBuilderLab />
    </TheorySection>

    <TheorySection title="8. Interaktív Laboratórium II: Logikai lap tervező" badge="Labor" badgeColor="violet">
      <ProductLab />
    </TheorySection>
  </TheoryTemplate>
);

export default PossibilitiesTheory;
