import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ExamOverviewSvg, ExamColumnSvg, ExamThreeSvg, ExamDigitsSvg, ExamEstimateSvg, ExamChangesSvg } from './WrittenAddExamG3Figures';
import { rnd, pick, shuffle, ins, opts4, changeText, signed } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { WrittenAddG3Column } from '../irasbeli-osszeadas/WrittenAddG3Column';
import { round10, sumNoCarry, carriesOf } from '../szoveges-feladatok/AddWordProblemsG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Vegyes tudáspróba-gép
// ---------------------------------------------------------------------------
export type ExamKind = 'fejben' | 'becsles' | 'irasbeli' | 'harom' | 'valtozas' | 'szoveges';
export const EXAM_KINDS: ExamKind[] = ['fejben', 'becsles', 'irasbeli', 'harom', 'valtozas', 'szoveges'];
export const EXAM_KIND_NAME: Record<ExamKind, string> = {
  fejben: 'Fejben',
  becsles: 'Becslés',
  irasbeli: 'Írásbeli összeadás',
  harom: 'Három tag',
  valtozas: 'Az összeg változása',
  szoveges: 'Szöveges feladat'
};
export interface ExamTask {
  kind: ExamKind;
  text: string;
  answer: number;
  options: number[];
  /** Tipp a rossz válaszokhoz (a helyeshez nincs). */
  hints: Record<number, string>;
  /** Oszlopos ábra a számításhoz. */
  column?: number[];
  explain: string;
}

const finish = (kind: ExamKind, text: string, answer: number, wrong: [number, string][], explain: string, column?: number[]): ExamTask => {
  const hints: Record<number, string> = {};
  const opts = opts4(answer, wrong.map(([v]) => v), 1000);
  wrong.forEach(([v, h]) => {
    if (opts.includes(v) && v !== answer && hints[v] === undefined) hints[v] = h;
  });
  opts.forEach((v) => {
    if (v !== answer && hints[v] === undefined) hints[v] = 'Nem ez. Számold újra lépésenként!';
  });
  return { kind, text, answer, options: shuffle(opts), hints, column, explain };
};

export const makeExamTask = (kind?: ExamKind): ExamTask => {
  const k = kind ?? pick(EXAM_KINDS);
  for (;;) {
    if (k === 'fejben') {
      const a = rnd(11, 68) * 10;
      const b = pick([100, 200, 300, rnd(2, 9) * 10]);
      const r = a + b;
      if (r > 1000) continue;
      const wr: [number, string][] = [
        [b >= 100 ? a + b / 10 : a + b * 10, b >= 100 ? `A ${b} kerek százas, ${b / 100} százast adsz hozzá!` : `A ${b} csak ${b / 10} tízes, nem ${b / 10} százas!`],
        [r - 100, 'Ha a tízesek összege 10-nél több, 1 új százas keletkezik!'],
        [r + 10, 'Számold meg újra a tízeseket!']
      ];
      return finish(k, `${a} + ${b} = ?`, r, wr, `${a} + ${b} = ${r}.`);
    }
    if (k === 'becsles') {
      const a = rnd(105, 489);
      const b = rnd(105, 489);
      if (a % 10 === 0 || b % 10 === 0) continue;
      const e = round10(a) + round10(b);
      const wr: [number, string][] = [
        [Math.floor(a / 10) * 10 + Math.floor(b / 10) * 10, 'Ez nem kerekítés, csak levágtad az egyeseket. Ha az egyes 5 vagy több, felfelé kerekíts!'],
        [e + 100, 'Túl sok. Kerekíts tízesre, és add össze!'],
        [a + b, 'Ez a pontos eredmény. Most csak becsülni kell, kerek tízesekkel!']
      ];
      return finish(k, `Becsüld meg tízesre kerekítve! ${a} + ${b} ≈ ?`, e, wr, `${a} ≈ ${round10(a)}, ${b} ≈ ${round10(b)}. B: ${e}.`);
    }
    if (k === 'irasbeli' || k === 'harom') {
      const nums = k === 'irasbeli' ? [rnd(105, 589), rnd(105, 409)] : [rnd(101, 349), rnd(101, 349), rnd(11, 99)];
      const r = nums.reduce((s, n) => s + n, 0);
      if (r > 999) continue;
      const nc = sumNoCarry(nums);
      if (nc === r) continue;
      const wr: [number, string][] = [
        [nc, 'Elfelejtetted a maradékot hozzáadni!'],
        [r + 10, 'A tízeseknél eggyel több jött ki. A maradék csak 1!'],
        [r - 100 >= 0 ? r - 100 : r + 100, 'Nézd meg a százasokat és a maradékot!']
      ];
      return finish(k, `Számold ki írásban! ${nums.join(' + ')} = ?`, r, wr, `${nums.join(' + ')} = ${r}.`, nums);
    }
    if (k === 'valtozas') {
      const a = rnd(120, 450);
      const b = rnd(120, 450);
      const da = pick([100, 10, -10, 20, 0, 1]);
      const db = da === 0 ? pick([10, -10, 100]) : pick([0, -da, 10, -10]);
      const s = a + b;
      const ns = s + da + db;
      if (ns > 1000 || a + da < 10 || b + db < 10) continue;
      const wr: [number, string][] = [
        [s, da + db === 0 ? '' : `Az összeg ${changeText(da + db)}, nem marad ugyanannyi!`],
        [s + da - db, 'Figyelj az előjelre: amelyik tag csökken, attól csökken az összeg!'],
        [s + 2 * (da + db) === s ? s + 10 : s + 2 * (da + db), 'Mindkét tag változását csak egyszer add hozzá!']
      ];
      const text = `${a} + ${b} = ${s}. Mennyi ${a + da} + ${b + db}?`;
      return finish(k, text, ns, wr.filter(([v, h]) => h !== '' && v !== ns), `Az 1. tag ${signed(da)}, a 2. tag ${signed(db)}. Az összeg ${changeText(da + db)}: ${ns}.`);
    }
    // szöveges: „…-val több / kevesebb, mint”
    const a = rnd(105, 420);
    const d = rnd(28, 280);
    const r = a + d;
    if (r > 999) continue;
    const less = Math.random() < 0.5;
    const text = less ? `A fiúk ${a} papírhajót hajtogattak. Ez ${ins(d)} kevesebb, mint amennyit a lányok. Hányat hajtogattak a lányok?` : `Szombaton ${a} néző volt a bábszínházban, vasárnap ${ins(d)} több. Hányan voltak vasárnap?`;
    const wr: [number, string][] = [
      [Math.abs(a - d), less ? 'Vigyázz! A lányok hajtogattak többet, ezért össze kell adni.' : 'Vasárnap többen voltak, ezért összeadunk.'],
      [sumNoCarry([a, d]), 'Elfelejtetted a maradékot hozzáadni!'],
      [a + r, 'Ez már a kettő együtt. Csak az egyik kell!']
    ];
    return finish(k, text, r, wr, `${a} + ${d} = ${r}.`, [a, d]);
  }
};

// ---------------------------------------------------------------------------
// Labor II – Számjegy-nyomozó
// ---------------------------------------------------------------------------
export interface DigitTask {
  a: number;
  b: number;
  c: number;
  /** Rejtett jegyek: col = helyi érték jobbról (0 = egyes), row: 0 = 1. tag, 1 = 2. tag, 2 = összeg. Oszloponként egy, jobbról balra. */
  hidden: { col: number; row: number; digit: number }[];
}
const dig = (n: number, col: number) => Math.floor(n / 10 ** col) % 10;

export const makeDigitTask = (): DigitTask => {
  for (;;) {
    const a = rnd(105, 689);
    const b = rnd(105, 489);
    const c = a + b;
    if (c > 999) continue;
    if (sumNoCarry([a, b]) === c && Math.random() < 0.8) continue;
    const cols = shuffle([0, 1, 2]).slice(0, rnd(2, 3)).sort();
    const hidden = cols.map((col) => {
      const row = rnd(0, 2);
      return { col, row, digit: dig([a, b, c][row], col) };
    });
    return { a, b, c, hidden };
  }
};

/** A jegyek szövege a WrittenAddG3Column-nak: a még meg nem fejtett rejtett jegy „?”. */
export const digitRows = (t: DigitTask, solved: number): [string, string, string] => {
  const rows = [t.a, t.b, t.c].map((n) => String(n).padStart(3, ' ').split(''));
  t.hidden.forEach((h, i) => {
    if (i >= solved) rows[h.row][2 - h.col] = '?';
  });
  return [rows[0].join(''), rows[1].join(''), rows[2].join('')];
};

/** Tipp egy oszlophoz: mit tudunk, mi a kérdés. */
export const digitHint = (t: DigitTask, i: number): string => {
  const h = t.hidden[i];
  const carryIn = h.col === 0 ? 0 : Math.floor(((t.a % 10 ** h.col) + (t.b % 10 ** h.col)) / 10 ** h.col);
  const da = h.row === 0 ? '?' : String(dig(t.a, h.col));
  const db = h.row === 1 ? '?' : String(dig(t.b, h.col));
  const dc = h.row === 2 ? '?' : String(dig(t.c, h.col));
  const name = ['Egyesek', 'Tízesek', 'Százasok'][h.col];
  const plus = carryIn ? ` + ${carryIn} (maradék)` : '';
  if (h.row === 2) return `${name}: ${da} + ${db}${plus} = ${Number(da) + Number(db) + carryIn}. Melyik jegyet írjuk le?`;
  const target = h.col === 2 ? dc : `${dc} vagy 1${dc}`;
  return `${name}: ${da} + ${db}${plus} = ${target}. Melyik szám kell a ? helyére?`;
};

export const WrittenAddExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [et, setEt] = useState<ExamTask>(() => ({
    kind: 'irasbeli',
    text: 'Számold ki írásban! 278 + 145 = ?',
    answer: 423,
    options: [413, 423, 313, 433],
    hints: { 413: 'Nézd meg újra a tízeseket: 7 + 4 + 1 = 12!', 313: 'Elfelejtetted a maradékot hozzáadni!', 433: 'A tízeseknél eggyel több jött ki. A maradék csak 1!' },
    column: [278, 145],
    explain: '278 + 145 = 423.'
  }));
  const [ePick, setEPick] = useState<number | null>(null);
  const [eScore, setEScore] = useState(0);
  const [eTotal, setETotal] = useState(0);
  const [eKind, setEKind] = useState<ExamKind | 'vegyes'>('vegyes');
  const newExam = (kk: ExamKind | 'vegyes' = eKind) => {
    setEt(makeExamTask(kk === 'vegyes' ? undefined : kk));
    setEPick(null);
  };
  const pickE = (v: number) => {
    if (ePick === et.answer) return;
    if (ePick === null) {
      setETotal(eTotal + 1);
      if (v === et.answer) setEScore(eScore + 1);
    }
    setEPick(v);
  };

  // ---- Labor II ----
  const [dt, setDt] = useState<DigitTask>({ a: 248, b: 175, c: 423, hidden: [{ col: 1, row: 1, digit: 7 }, { col: 2, row: 0, digit: 2 }] });
  const [dSolved, setDSolved] = useState(0);
  const [dBad, setDBad] = useState<number | null>(null);
  const newDigit = () => {
    setDt(makeDigitTask());
    setDSolved(0);
    setDBad(null);
  };
  const pickD = (d: number) => {
    if (dSolved >= dt.hidden.length) return;
    if (d === dt.hidden[dSolved].digit) {
      setDSolved(dSolved + 1);
      setDBad(null);
    } else setDBad(d);
  };
  const rows = digitRows(dt, dSolved);
  const dDone = dSolved >= dt.hidden.length;

  return (
    <TheoryTemplate
      topicId="g3-written-addition"
      subtopicId="megallo"
      grade={3}
      chapterId="irasbeli-osszeadas"
      title="6. Megálló – tudáspróba"
      subtitle="Amit már tudsz: fejben és írásban összeadni, becsülni, a hiányzó jegyet megtalálni, az összeg változását látni és szöveges feladatot megoldani."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_irasbeli_osszeadas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten – mutasd meg, mit tudsz!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — AZ ÍRÁSBELI ÖSSZEADÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
              278 + 145 = 423
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Helyi érték szerint <strong>egymás alá</strong> írjuk.</li>
              <li>Az <strong>egyesekkel</strong> kezdjük, jobbról balra haladunk.</li>
              <li>Ha 10 vagy több jön ki, leírjuk az egyest, <strong>1 marad</strong>, és a következőhöz adjuk.</li>
              <li>Előtte <strong>becsülj</strong>, utána <strong>ellenőrizz</strong> felcseréléssel!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 74–85. o." badgeColor="indigo">
        <ExamOverviewSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ebben a fejezetben megtanultál háromjegyű számokat összeadni.</p>
          <p>Itt mindent átismételünk. A tudáspróbában 90 feladat vár rád.</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Fejben" badge="1. lecke" badgeColor="rose">
        <TheoryTable
          headers={['Feladat', 'Így gondold', 'Eredmény']}
          rows={[
            ['418 + 300', 'Csak a százasok változnak: 4 + 3 = 7', '718'],
            ['350 + 40', 'Tízesek: 5 + 4 = 9', '390'],
            ['270 + 50', '27 t + 5 t = 32 t', '320'],
            ['290 + 340', '29 t + 34 t = 63 t', '630']
          ]}
        />
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Becslés" badge="2. lecke" badgeColor="amber">
        <ExamEstimateSvg />
        <p className="text-sm text-slate-700">Kerekíts tízesre (vagy százasra), és add össze. A becslés jele: <strong>B:</strong>, a „körülbelül” jele: <strong>≈</strong>.</p>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Írásbeli összeadás" badge="3. lecke" badgeColor="blue">
        <ExamColumnSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <ExamThreeSvg />
          <TheoryCard title="Három tag" badge="207 + 164 + 98" badgeColor="blue">
            <p className="text-sm text-slate-700">7 meg 4 meg 8 az 19, leírom a 9-et, maradt 1. 0 meg 6 meg 9 az 15, meg 1 az 16, leírom a 6-ot, maradt 1. 2 meg 1 az 3, meg 1 az 4. <strong>469</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Ellenőrzés">
          Cseréld fel a tagokat: 145 + 278 = 423. Ha ugyanaz jön ki, jól számoltál.
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Hiányzó számjegyek" badge="Nyomozás" badgeColor="orange">
        <ExamDigitsSvg />
        <p className="text-sm text-slate-700">Mindig az egyesektől indulj! Ha egy oszlopban 10-nél több jött ki, a maradékot vidd tovább.</p>
        <TheoryCard title="Hiányos összeadás" badge="168 + □ = 435" badgeColor="orange">
          <p className="text-sm text-slate-700">Egyesek: 8 meg mennyi az 15? 7, maradt 1. Tízesek: 6 meg 1 az 7, meg mennyi az 13? 6, maradt 1. Százasok: 1 meg 1 az 2, meg mennyi az 4? 2. <strong>□ = 267</strong>. Ellenőrzés: 168 + 267 = 435.</p>
        </TheoryCard>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Az összeg változásai" badge="4. lecke" badgeColor="emerald">
        <ExamChangesSvg />
        <p className="text-sm text-slate-700">Az 1. tag +100, a 2. tag −20. Együtt +80, ezért az összeg 80-nal nő: 734 → 814.</p>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Szöveges feladatok" badge="5. lecke" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Két lépés" badge="…-val több" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Délelőtt 186 jegy, délután 147-tel több. Egész nap?</li>
              <li>1. Délután: 186 + 147 = 333.</li>
              <li>2. Egész nap: 186 + 333 = 519.</li>
              <li><strong>Egész nap 519 jegy kelt el.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Csapda" badge="…-val kevesebb, mint" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 3.a 268 kg papírt gyűjtött, ez 85 kg-mal kevesebb, mint a 3.b.</li>
              <li>A 3.b gyűjtött többet: 268 + 85 = 353.</li>
              <li><strong>A 3.b 353 kg papírt gyűjtött.</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Vigyázz!" badge="Tipikus hibák" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett maradék"
          wrong="278 + 145 = 313"
          wrongExplanation="8 + 5 = 13 és 7 + 4 = 11: a maradékokat nem adtuk hozzá."
          correct="278 + 145 = 423"
          correctExplanation="Mindig írd fel kicsiben a maradékot, amíg gyakorolsz!"
        />
        <TheoryTrapBox
          title="Rossz helyre írt szám"
          wrong="358 + 64: a 64-et a százasok alá írtuk → 998"
          wrongExplanation="A 64 kétjegyű: 6 tízes és 4 egyes."
          correct="358 + 64 = 422"
          correctExplanation="Az egyeseket az egyesek alá, a tízeseket a tízesek alá írd!"
          tip="Becsülj: 360 + 60 = 420. A 998 nagyon messze van!"
        />
      </TheorySection>

      {/* 9 – Labor I */}
      <TheorySection title="9. Labor I: Tudáspróba-gép" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['vegyes', ...EXAM_KINDS] as (ExamKind | 'vegyes')[]).map((kk) => (
              <button
                key={kk}
                onClick={() => {
                  setEKind(kk);
                  newExam(kk);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${eKind === kk ? 'bg-indigo-600 border-indigo-700 text-white' : 'bg-white border-indigo-200 text-indigo-800'}`}
              >
                {kk === 'vegyes' ? 'Vegyes' : EXAM_KIND_NAME[kk]}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 rounded-lg px-2 py-1">{EXAM_KIND_NAME[et.kind]}</span>
            <span className="text-sm font-bold text-slate-700">Elsőre jó: {eScore} / {eTotal}</span>
          </div>
          <div className="rounded-xl bg-indigo-50 p-3 text-lg font-bold text-slate-800 text-center">{et.text}</div>
          {et.column && (
            <WrittenAddG3Column
              addends={et.column}
              result={ePick === et.answer ? et.answer : '___'}
              carries={ePick === et.answer ? carriesOf(et.column) : undefined}
              className="w-full max-w-[160px] h-auto mx-auto"
            />
          )}
          <div className="flex flex-wrap gap-2 justify-center">
            {et.options.map((v) => (
              <button
                key={v}
                onClick={() => pickE(v)}
                className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[80px] border-2 ${
                  ePick === v ? (v === et.answer ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-rose-100 border-rose-400 text-rose-700') : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {et.kind === 'becsles' ? `B: ${v}` : v}
              </button>
            ))}
          </div>
          {ePick !== null && ePick !== et.answer && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{et.hints[ePick]} Próbáld újra!</div>}
          {ePick === et.answer && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800 space-y-2">
              <div>Ügyes! {et.explain}</div>
              <button onClick={() => newExam()} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold min-h-[44px]">Következő feladat</button>
            </div>
          )}
          {ePick !== et.answer && (
            <div className="flex justify-center">
              <button onClick={() => newExam()} className="px-4 py-2 rounded-xl bg-white border-2 border-indigo-300 text-indigo-700 text-sm font-bold min-h-[44px]">Új feladat</button>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10 – Labor II */}
      <TheorySection title="10. Labor II: Számjegy-nyomozó" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <button onClick={newDigit} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          <div className="text-sm text-slate-700 text-center font-bold">Melyik számjegy bújt el a „?” mögé? Kezdd az egyesektől!</div>
          <WrittenAddG3Column
            addends={[rows[0], rows[1]]}
            result={rows[2]}
            highlight={dDone ? null : dt.hidden[dSolved].col}
            className="w-full max-w-[190px] h-auto mx-auto"
          />
          {!dDone && (
            <>
              <div className="rounded-xl bg-orange-50 p-3 text-center text-orange-900 font-bold">{digitHint(dt, dSolved)}</div>
              <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
                {Array.from({ length: 10 }).map((_, d) => (
                  <button
                    key={d}
                    onClick={() => pickD(d)}
                    className={`min-h-[52px] rounded-xl text-2xl font-black border-2 ${dBad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-orange-50'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {dBad !== null && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">A {dBad} nem jó ide. Számold ki: mennyi kell, hogy kijöjjön az oszlop eredménye?</div>}
            </>
          )}
          {dDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Megfejtetted! {dt.a} + {dt.b} = {dt.c}. Ellenőrzés: {dt.b} + {dt.a} = {dt.c}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenAddExamG3Theory;
