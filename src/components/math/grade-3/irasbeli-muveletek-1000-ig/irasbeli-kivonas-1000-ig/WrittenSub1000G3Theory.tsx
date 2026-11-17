import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RecapSubSvg, ZeroTensSubSvg, RoundHundredSubSvg, ThousandSubSvg, CheckAddSubSvg, PuzzleBarSvg } from './WrittenSub1000G3Figures';
import { WrittenSubG3Column } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import {
  FONT,
  rnd,
  suffixHoz,
  stepsSub,
  colsSub,
  isLeadStep,
  placePluralSub,
  capFirst,
  spokenSub,
  partialDiff,
  carryMarksSub,
  forgotSub,
  swappedSub,
  subHint,
  opts4,
  makeSubTask,
  SubKind,
  SUB_KIND_LABEL,
  ThousandBar
} from './WrittenSub1000G3Parts';

/** -tól/-től rag 0–10-ig. */
const tol = (n: number) => (n === 10 ? 'től' : ['tól', 'től', 'től', 'tól', 'től', 'től', 'tól', 'től', 'tól', 'től'][n % 10]);

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const KeyPad: React.FC<{ onKey: (d: number) => void; bad?: number | null }> = ({ onKey, bad }) => (
  <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
    {KEYS.map((d) => (
      <button
        key={d}
        onClick={() => onKey(d)}
        className={`min-h-[52px] rounded-xl text-2xl font-black border-2 transition-colors ${bad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'}`}
      >
        {d}
      </button>
    ))}
  </div>
);

const Btn: React.FC<{ children: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null; color?: string }> = ({ children, onClick, state, color = 'bg-white border-slate-300 text-slate-800' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-base font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : color}`}
  >
    {children}
  </button>
);

type Phase = 'ask' | 'digit' | 'lead' | 'check' | 'done';

// ---------------------------------------------------------------------------
// Labor II – Mennyi hiányzik az 1000-hez?
// ---------------------------------------------------------------------------
const CTX = [
  { title: '1000 darabos kirakó', done: 'kész', unit: 'darab', q: 'Hány darab van még hátra?' },
  { title: '1000 m-es futóverseny', done: 'megtett', unit: 'm', q: 'Hány méter van még hátra a célig?' },
  { title: '1000 Ft-os ajándékra gyűjtesz', done: 'megvan', unit: 'Ft', q: 'Hány forint hiányzik még?' },
  { title: '1000 oldalas könyvsorozat', done: 'elolvasva', unit: 'oldal', q: 'Hány oldal van még hátra?' }
];
interface FillTask { ctx: number; n: number; opts: number[] }
const makeFill = (): FillTask => {
  for (;;) {
    const n = rnd(123, 877);
    if (n % 10 === 0) continue;
    const ok = 1000 - n;
    return { ctx: rnd(0, CTX.length - 1), n, opts: opts4(ok, [forgotSub(1000, n), ok + 10, ok - 100, ok - 10]) };
  }
};

export const WrittenSub1000G3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: lépésről lépésre ----
  const [kind, setKind] = useState<SubKind>('ezer');
  const [pair, setPair] = useState<[number, number]>([1000, 347]);
  const [col, setCol] = useState(0);
  const [phase, setPhase] = useState<Phase>('ask');
  const [bad, setBad] = useState<number | string | null>(null);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [marks, setMarks] = useState(true);
  const [demo, setDemo] = useState(false);
  const [checkOpts, setCheckOpts] = useState<number[]>([1000, 990, 900, 910]);
  const [a, b] = pair;
  const cols = colsSub(a);
  const st = stepsSub(a, b);
  const diff = a - b;
  const phaseFor = (c: number, s = st): Phase => {
    if (c >= s.length) return 'check';
    if (isLeadStep(s[c], s)) return 'lead';
    if (s.length === 3 && c === 2) return 'digit';
    return 'ask';
  };
  const reset = (p: [number, number]) => {
    setPair(p);
    setCol(0);
    setPhase('ask');
    setBad(null);
    setHint('');
    setLog([]);
    setCheckOpts(opts4(p[0], [p[0] - 10, p[0] - 100, p[0] + 10, p[0] + 100]));
  };
  const newTask = (k: SubKind = kind) => {
    setKind(k);
    setDemo(false);
    reset(makeSubTask(k));
  };
  const advance = (c: number) => {
    const s = st[c];
    setLog((l) => [...l, `${c + 1}. lépés (${placePluralSub(c)}): ${spokenSub(s, st)}`]);
    const next = c + 1;
    setCol(next);
    setPhase(phaseFor(next));
    setBad(null);
    setHint('');
  };
  const cur = st[Math.min(col, st.length - 1)];
  const answerAsk = (ten: boolean) => {
    if (phase !== 'ask' || demo) return;
    if (ten === !!cur.carryOut) {
      setPhase('digit');
      setHint('');
      setBad(null);
      return;
    }
    setBad(ten ? 'ten' : 'own');
    setHint(
      ten
        ? `Van elég: ${cur.from}-${tol(cur.from)} ${cur.digit}-ig pótolhatsz.`
        : cur.digit === 0
          ? `A 0-ig nem tudsz felfelé számolni ${cur.from}-${tol(cur.from)}. Pótolj 10-ig, és maradt 1.`
          : `${cur.digit === 1 || cur.digit === 5 ? 'Az' : 'A'} ${cur.digit} kisebb, mint ${cur.from === 1 || cur.from === 5 ? 'az' : 'a'} ${cur.from}. Pótolj ${cur.target}-ig, és maradt 1.`
    );
  };
  const press = (d: number) => {
    if (phase !== 'digit' || demo) return;
    if (d === cur.write) {
      advance(col);
      return;
    }
    setBad(d);
    setHint(subHint(cur, d));
  };
  const answerLead = (writeZero: boolean) => {
    if (phase !== 'lead' || demo) return;
    if (!writeZero) {
      advance(col);
      return;
    }
    setBad('zero');
    setHint(`A szám elejére nem írunk 0-t. Nem 0${diff}, hanem ${diff}.`);
  };
  const pickCheck = (v: number) => {
    if (phase !== 'check') return;
    if (v === a) {
      setPhase('done');
      setBad(null);
      setHint('');
      return;
    }
    setBad(v);
    setHint('Add össze írásban: egyesek, tízesek, százasok! Ne felejtsd el a maradékot.');
  };
  useEffect(() => {
    if (!demo) return;
    if (col >= st.length) {
      setDemo(false);
      return;
    }
    const t = window.setTimeout(() => {
      if (phase === 'ask') setPhase('digit');
      else advance(col);
    }, 1400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, col, phase]);
  const startDemo = () => {
    reset(pair);
    setDemo(true);
  };

  // ---- Labor II ----
  const [fill, setFill] = useState<FillTask>({ ctx: 0, n: 386, opts: [614, 724, 624, 514] });
  const [fDone, setFDone] = useState(false);
  const [fBad, setFBad] = useState<number | null>(null);
  const [fMsg, setFMsg] = useState('');
  const [streak, setStreak] = useState(0);
  const ctx = CTX[fill.ctx];
  const fOk = 1000 - fill.n;
  const newFill = () => {
    setFill(makeFill());
    setFDone(false);
    setFBad(null);
    setFMsg('');
  };
  const pickFill = (v: number) => {
    if (fDone) return;
    if (v === fOk) {
      setFDone(true);
      setFBad(null);
      setStreak((s) => s + 1);
      setFMsg(`Szuper! 1000 − ${fill.n} = ${fOk}. Ellenőrzés: ${fOk} + ${fill.n} = 1000.`);
      return;
    }
    setFBad(v);
    setStreak(0);
    if (v === forgotSub(1000, fill.n)) setFMsg('Elfelejtetted a maradékot! Az 1000-ből minden oszlopban marad 1: add hozzá a következő kivonandó-jegyhez.');
    else if (v === swappedSub(1000, fill.n)) setFMsg('Fordítva pótoltál! Mindig a kivonandó jegyétől pótolj felfelé.');
    else if (v + fill.n <= 1000) setFMsg(`Próbáld ki: ${v} + ${fill.n} = ${v + fill.n}. Ez nem 1000. Számold ki írásban!`);
    else setFMsg(`Ez túl sok: ${v} + ${fill.n} több lenne, mint 1000. Számold ki írásban!`);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-ops-1000"
      subtopicId="irasbeli-kivonas-1000-ig"
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      title="2. Írásbeli kivonás 1000-ig"
      subtitle="Pótlással, maradékkal: 0 a kisebbítendőben, kivonás kerek százasból és az 1000-ből, ellenőrzés összeadással."
      badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • TANANYAG"
      themeColor="blue"
      pdfFilename="3_osztaly_irasbeli_kivonas_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Vonjunk ki 1000-ig!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — PÓTLÁSOS KIVONÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base font-black text-blue-900 dark:text-blue-200">
              8-hoz 6, az 14. Leírom a 6-ot, maradt 1.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Egymás alá, helyi érték szerint. Kezdd az <strong>egyesekkel</strong>!</li>
              <li>A kivonandó jegyétől <strong>pótolj</strong> a kisebbítendő jegyéig. Ha az kisebb, pótolj 10-zel többig: <strong>maradt 1</strong>.</li>
              <li><strong>0 van felül?</strong> Pótolj 10-ig: 6-hoz 4, az 10.</li>
              <li>A maradékot add a következő kivonandó-jegyhez: <strong>5 meg 1 az 6</strong>.</li>
              <li>Ellenőrizz: <strong>különbség + kivonandó = kisebbítendő</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 118–121. o." badgeColor="blue">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az írásbeli kivonást már ismered. Most a kisebbítendő <strong>1000-ig</strong> bármekkora lehet.</p>
          <p>Újdonság: <strong>0 a kisebbítendőben</strong> (704, 600), és kivonás <strong>az 1000-ből</strong>.</p>
          <p>Ugyanúgy pótolunk: azt mondjuk, <strong>mennyi kell még</strong>. Sorrend: <strong>becslés → számítás → ellenőrzés</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Ismétlés" badge="832 − 467" badgeColor="sky">
        <RecapSubSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Becslés: 800 − 500 = 300. Az egyeseknél és a tízeseknél is <strong>maradt 1</strong>. A zöld 1-es a következő kivonandó-jegy mellett emlékeztet. A különbség <strong>365</strong>.
        </p>
      </TheorySection>

      <TheorySection title="3. 0 a tízesek helyén" badge="704 − 258" badgeColor="purple">
        <ZeroTensSubSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li><strong>Egyesek:</strong> a 4 kisebb, mint a 8. „8-hoz 6, az 14. Leírom a 6-ot, maradt 1.”</li>
          <li><strong>Tízesek:</strong> „5 meg 1 az 6.” A 0-ig nem tudunk felfelé számolni, ezért <strong>10-ig</strong> pótolunk: „6-hoz 4, az 10. Leírom a 4-et, maradt 1.”</li>
          <li><strong>Százasok:</strong> „2 meg 1 az 3. 3-hoz 4, az 7. Leírom a 4-et.” A különbség <strong>446</strong>.</li>
        </ul>
      </TheorySection>

      <TheorySection title="4. Kerek százasból" badge="600 − 274" badgeColor="amber">
        <RoundHundredSubSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Két 0 is van felül. Mindkettőnél <strong>10-ig</strong> pótolunk: „4-hez 6, az 10, maradt 1.” „7 meg 1 az 8. 8-hoz 2, az 10, maradt 1.” „2 meg 1 az 3. 3-hoz 3, az 6.” A különbség <strong>326</strong>.
        </p>
      </TheorySection>

      <TheorySection title="5. Az 1000-ből" badge="1000 − 347" badgeColor="rose">
        <ThousandSubSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Az 1000 négyjegyű: 1 ezres, 0 százas, 0 tízes, 0 egyes. Ezért <strong>négy oszlop</strong> kell. Háromszor pótolunk 10-ig, és háromszor <strong>maradt 1</strong>. Az ezreseknél „1-hez 0, az 1” – a 0-t a szám elejére nem írjuk le. A különbség <strong>653</strong>.
        </p>
        <TheoryCallout type="tip" title="Ellenőrző trükk az 1000-hez">
          Az egyeseket pótold <strong>10-re</strong>, a tízeseket és a százasokat <strong>9-re</strong>: 7-hez 3 az 10, 4-hez 5 az 9, 3-hoz 6 az 9. Ugyanaz jön ki: <strong>653</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Ellenőrzés összeadással" badge="653 + 347" badgeColor="emerald">
        <CheckAddSubSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Add össze a különbséget és a kivonandót! Ha a <strong>kisebbítendőt</strong> kapod, jól számoltál: 653 + 347 = 1000.
        </p>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Szöveges feladatok" badgeColor="purple">
        <PuzzleBarSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Kirakó" badge="1000 − 386" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy 1000 darabos kirakóból 386 darab már a helyén van. Hány darab van hátra?</li>
              <li>„6-hoz 4, az 10, maradt 1.” „8 meg 1 az 9. 9-hez 1, az 10, maradt 1.” „3 meg 1 az 4. 4-hez 6, az 10, maradt 1.”</li>
              <li>Ellenőrzés: 614 + 386 = 1000. Válasz: <strong>614 darab van hátra.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Két iskola" badge="705 − 468" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az egyik iskolába 705, a másikba 468 gyerek jár. Mennyivel többen járnak az elsőbe?</li>
              <li>„8-hoz 7, az 15, maradt 1.” „6 meg 1 az 7. 7-hez 3, az 10, maradt 1.” „4 meg 1 az 5. 5-höz 2, az 7.”</li>
              <li>Ellenőrzés: 237 + 468 = 705. Válasz: <strong>237-tel többen.</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="1000 − 347"
          wrong="1000 − 347 = 763"
          wrongExplanation="Mindenhol 10-ig pótolt, de a maradékot nem adta hozzá a következő kivonandó-jegyhez."
          correct="1000 − 347 = 653"
          correctExplanation="7-hez 3, az 10, maradt 1. 4 meg 1 az 5, 5-höz 5, az 10, maradt 1. 3 meg 1 az 4, 4-hez 6, az 10."
          tip="Ellenőrizz: 763 + 347 nem 1000, de 653 + 347 = 1000."
        />
        <TheoryCallout type="warning" title="A 0-ból nem lesz 0!">
          704 − 258-nál a tízeseknél nem írhatsz 0-t csak azért, mert felül 0 van. A 0 kisebb, mint a 6, ezért <strong>10-ig</strong> pótolsz: 6-hoz 4, az 10.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="9. Labor I: Lépésről lépésre" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTask(kind)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={startDemo} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">Mutasd meg!</button>
            <button onClick={() => setMarks((m) => !m)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${marks ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}>Maradék mutatása: {marks ? 'be' : 'ki'}</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(SUB_KIND_LABEL) as SubKind[]).map((k) => (
              <button key={k} onClick={() => newTask(k)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${kind === k ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-slate-300 text-slate-700'}`}>{SUB_KIND_LABEL[k]}</button>
            ))}
          </div>
          <WrittenSubG3Column
            minuend={a}
            subtrahend={b}
            cols={cols}
            result={partialDiff(diff, col, cols)}
            carries={marks ? carryMarksSub(st, col) : []}
            highlight={col < st.length ? col : null}
            className="w-full max-w-[230px] h-auto mx-auto"
          />
          {phase === 'ask' && !demo && (
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {capFirst(placePluralSub(col))}: {cur.carryIn ? `${cur.need} meg 1 az ${cur.from}. ` : ''}
                {cur.from}-{tol(cur.from)} pótolsz. Meddig?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Btn onClick={() => answerAsk(false)} state={bad === 'own' ? 'bad' : null}>{cur.digit}-ig</Btn>
                <Btn onClick={() => answerAsk(true)} state={bad === 'ten' ? 'bad' : null} color="bg-emerald-50 border-emerald-400 text-emerald-900">{cur.digit + 10}-ig (maradt 1)</Btn>
              </div>
            </div>
          )}
          {phase === 'digit' && !demo && (
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {capFirst(placePluralSub(col))}: {cur.carryIn ? `${cur.need} meg 1 az ${cur.from}. ` : ''}
                {cur.from}-{suffixHoz(cur.from)} mennyi kell, hogy {cur.target} legyen? Melyik jegyet írod le?
              </div>
              <KeyPad onKey={press} bad={typeof bad === 'number' ? bad : null} />
            </div>
          )}
          {phase === 'lead' && !demo && (
            <div className="space-y-2">
              <div className="bg-violet-50 rounded-xl p-3 text-center text-violet-900 font-bold">Ezresek: a maradék 1. 1-hez 0, az 1. Mit írsz az ezresek helyére?</div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Btn onClick={() => answerLead(false)} color="bg-emerald-50 border-emerald-400 text-emerald-900">Nem írok semmit</Btn>
                <Btn onClick={() => answerLead(true)} state={bad === 'zero' ? 'bad' : null}>Leírom a 0-t</Btn>
              </div>
            </div>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-100 text-amber-900">{hint}</div>}
          {log.length > 0 && (
            <ol className="space-y-1 text-sm text-slate-700 bg-slate-50 rounded-xl p-3">
              {log.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ol>
          )}
          {(phase === 'check' || phase === 'done') && (
            <div className="space-y-2">
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                {a} − {b} = {diff}. Ellenőrizz összeadással! {diff} + {b} = ?
              </div>
              <WrittenSubG3Column op="+" minuend={diff} subtrahend={b} cols={cols} result={phase === 'done' ? a : '?'.repeat(String(a).length)} header={false} className="w-full max-w-[160px] h-auto mx-auto" />
              {phase === 'check' && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {checkOpts.map((v) => (
                    <Btn key={v} onClick={() => pickCheck(v)} state={bad === v ? 'bad' : null}>{v}</Btn>
                  ))}
                </div>
              )}
              {phase === 'done' && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Megkaptad a kisebbítendőt ({a}), tehát jól számoltál! Kérj új feladatot!</div>}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="10. Labor II: Mennyi hiányzik az 1000-hez?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newFill} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <svg viewBox="0 0 360 100" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width="358" height="98" rx="12" fill="#fff7ed" stroke="#fdba74" />
            <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">{ctx.title}</text>
            <ThousandBar x={22} y={34} w={316} done={fill.n} label={`${ctx.done}: ${fill.n}`} h={28} />
          </svg>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
            {ctx.q} 1000 − {fill.n} = {fDone ? <span className="text-emerald-700">{fOk}</span> : '?'}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {fill.opts.map((v) => (
              <Btn key={v} onClick={() => pickFill(v)} state={fDone && v === fOk ? 'ok' : fBad === v ? 'bad' : null}>{v} {ctx.unit}</Btn>
            ))}
          </div>
          {fDone && <WrittenSubG3Column op="+" minuend={fOk} subtrahend={fill.n} result={1000} cols={4} header={false} className="w-full max-w-[150px] h-auto mx-auto" />}
          {fMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${fDone ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{fMsg}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenSub1000G3Theory;
