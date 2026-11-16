import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  ChapterSummarySvg,
  PartNamesSvg,
  ShapePartsSvg,
  RectValueSvg,
  SameHalfCirclesSvg,
  CampSvg,
  BoardGameG,
  BOARD_FIELDS,
  BOARD_VALUES,
  boardFieldValue
} from './FractionsExamFigures';
import { BarG, fw, fwOf, nak, az, compareFractions, PART_NAMES } from '../tortek-osszehasonlitasa/FractionCompare4Figures';
import { partOf } from '../tortresz-szamitasa/FractionOfAmountFigures';

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatok gépe (ellenőrzéssel)
// ---------------------------------------------------------------------------
export type MixedTask =
  | { kind: 'name'; n: number; d: number; options: string[]; answer: string }
  | { kind: 'compare'; a: [number, number]; b: [number, number]; answer: '<' | '=' | '>' }
  | { kind: 'amount'; amount: number; n: number; d: number; answer: number };

/** Egyszerű, determinisztikus véletlenszám-generátor (a teszthez is). */
export const rng = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const DS = [2, 3, 4, 5, 6, 8, 10];
const AMOUNTS: Record<number, number[]> = {
  2: [12, 24, 60, 300, 684, 1000],
  3: [12, 24, 30, 60, 300, 2400],
  4: [12, 24, 60, 100, 2400, 4000],
  5: [20, 100, 200, 300, 1000, 4000],
  6: [12, 18, 24, 60, 300, 2400],
  8: [24, 40, 4000],
  10: [30, 100, 200, 400, 1000, 6000]
};

export const makeMixedTask = (seed: number): MixedTask => {
  const r = rng(seed);
  const pick = <T,>(a: T[]): T => a[Math.floor(r() * a.length)];
  const kind = pick(['name', 'compare', 'amount'] as const);
  if (kind === 'name') {
    const d = pick(DS);
    const n = 1 + Math.floor(r() * (d - 1));
    const answer = fw(n, d);
    const others = DS.filter((x) => x !== d);
    const cands = [fw(d - n, d), fw(Math.min(n + 1, d), d), fw(n, pick(others)), fw(n, others[(others.indexOf(d - 1) + 1) % others.length] ?? 3), fw(d, d)];
    const options = [answer];
    DS.forEach((x) => cands.push(fw(n, x)));
    cands.forEach((c) => {
      if (!options.includes(c) && options.length < 4) options.push(c);
    });
    return { kind, n, d, options, answer };
  }
  if (kind === 'compare') {
    const d1 = pick(DS);
    const sameKind = r() < 0.5;
    const d2 = sameKind ? d1 : pick(DS);
    const n1 = 1 + Math.floor(r() * (d1 - 1));
    const n2 = sameKind ? 1 + Math.floor(r() * (d2 - 1)) : r() < 0.5 ? n1 : 1 + Math.floor(r() * (d2 - 1));
    return { kind, a: [n1, d1], b: [n2, d2], answer: compareFractions(n1, d1, n2, d2) };
  }
  const d = pick([2, 3, 4, 5, 6, 8, 10]);
  const n = 1 + Math.floor(r() * (d - 1));
  const amount = pick(AMOUNTS[d]);
  return { kind, amount, n, d, answer: partOf(amount, n, d) };
};

const MixedLab: React.FC = () => {
  const [seed, setSeed] = useState(7);
  const [task, setTask] = useState<MixedTask>(() => makeMixedTask(7));
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [score, setScore] = useState({ good: 0, all: 0 });
  const [answered, setAnswered] = useState(false);

  const next = () => {
    const s = seed + 1;
    setSeed(s);
    setTask(makeMixedTask(s * 7919));
    setInput('');
    setMsg(null);
    setAnswered(false);
  };
  const judge = (ok: boolean, t: string) => {
    setMsg({ ok, t });
    if (!answered) setScore((sc) => ({ good: sc.good + (ok ? 1 : 0), all: sc.all + 1 }));
    setAnswered(true);
  };

  const btn = 'h-12 px-4 rounded-xl text-base font-black border-2 bg-white text-slate-800 border-slate-200 hover:bg-orange-50';
  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm font-bold text-slate-600">
          Jó válaszok: <span className="text-emerald-700 text-lg">{score.good}</span> / {score.all}
        </div>
        <button onClick={next} className="h-11 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black">
          Új feladat ➜
        </button>
      </div>

      {task.kind === 'name' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-3 text-center text-lg font-black text-slate-800">A csík 1 egészet ér. Hányad része színes?</div>
          <svg viewBox="0 0 320 44" className="w-full max-w-md mx-auto h-auto">
            <BarG x={10} y={6} w={300} h={32} parts={task.d} filled={task.n} color="#f97316" />
          </svg>
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            {task.options.map((o) => (
              <button
                key={o}
                className={btn}
                onClick={() =>
                  judge(o === task.answer, o === task.answer ? `Ügyes! ${task.d} egyenlő részből ${task.n} színes: ${task.answer}.` : `Számold meg: ${task.d} egyenlő rész van (${PART_NAMES[task.d]} részek), ebből ${task.n} színes.`)
                }
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      {task.kind === 'compare' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-3 text-center text-lg font-black text-slate-800">
            Melyik jel illik ide? {fw(task.a[0], task.a[1])} ☐ {fw(task.b[0], task.b[1])}
          </div>
          <svg viewBox="0 0 320 84" className="w-full max-w-md mx-auto h-auto">
            <BarG x={10} y={6} w={300} h={30} parts={task.a[1]} filled={task.a[0]} color="#f97316" />
            <BarG x={10} y={48} w={300} h={30} parts={task.b[1]} filled={task.b[0]} color="#2563eb" />
          </svg>
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            {(['<', '=', '>'] as const).map((s) => (
              <button
                key={s}
                className="h-14 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-3xl font-black"
                onClick={() => judge(s === task.answer, s === task.answer ? `Igen! ${fw(task.a[0], task.a[1])} ${task.answer} ${fw(task.b[0], task.b[1])}.` : 'Nézd meg a két csíkot: melyiken ér tovább a színes rész?')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {task.kind === 'amount' && (
        <div className="space-y-3">
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-3 text-center text-lg font-black text-slate-800">
            Mennyi {nak(task.amount)} {az(task.n)} {fwOf(task.n, task.d)}?
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="font-mono text-lg font-black">
              {task.amount} : {task.d} · {task.n} =
            </span>
            <input
              inputMode="numeric"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
              className="h-12 w-32 rounded-xl border-2 border-slate-300 px-3 text-xl font-black text-center"
              aria-label="eredmény"
            />
            <button
              className="h-12 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black"
              onClick={() =>
                judge(
                  Number(input) === task.answer,
                  Number(input) === task.answer
                    ? `Pontos! ${task.amount} : ${task.d} = ${task.amount / task.d}${task.n > 1 ? `, ${task.amount / task.d} · ${task.n} = ${task.answer}` : ''}.`
                    : `Előbb oszd el ${task.d} egyenlő részre: ${task.amount} : ${task.d} = ${task.amount / task.d}. Utána vegyél ${task.n} részt!`
                )
              }
            >
              Ellenőrzöm
            </button>
          </div>
        </div>
      )}

      {msg && <div className={`rounded-xl p-3 text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>{msg.t}</div>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Társasjáték (TK 152/20)
// ---------------------------------------------------------------------------
const BoardLab: React.FC = () => {
  const [pos, setPos] = useState(-1);
  const [pending, setPending] = useState<number | null>(null);
  const [die, setDie] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [rolls, setRolls] = useState(0);
  const finished = pos >= BOARD_FIELDS.length;

  const roll = () => {
    if (pending !== null || finished) return;
    const v = 1 + Math.floor(Math.random() * 6);
    setDie(v);
    setRolls(rolls + 1);
    const target = pos + v;
    setMsg(null);
    setInput('');
    if (target >= BOARD_FIELDS.length) {
      setPos(BOARD_FIELDS.length);
      setMsg({ ok: true, t: `${v}-t dobtál, beértél a CÉL-ba! ${rolls + 1} dobással, hiba nélkül végigmentél. 🎉` });
    } else {
      setPending(target);
    }
  };
  const check = () => {
    if (pending === null) return;
    const f = BOARD_FIELDS[pending];
    const val = boardFieldValue(pending);
    const whole = BOARD_VALUES[f.c];
    if (Number(input) === val) {
      setPos(pending);
      setPending(null);
      setMsg({ ok: true, t: `Jó! ${whole} : ${f.d} = ${whole / f.d}${f.n > 1 ? `, ${whole / f.d} · ${f.n} = ${val}` : ''}. Dobhatsz újra!` });
    } else {
      setMsg({ ok: false, t: `Nem jó, maradsz a helyeden. A ${f.c} szín értéke ${whole}. Számold ki: ${whole} : ${f.d} · ${f.n} = ?` });
      setPending(null);
    }
  };
  const reset = () => {
    setPos(-1);
    setPending(null);
    setDie(null);
    setInput('');
    setMsg(null);
    setRolls(0);
  };
  const f = pending !== null ? BOARD_FIELDS[pending] : null;

  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        <svg viewBox="0 0 450 330" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
          <BoardGameG token={Math.min(pos, BOARD_FIELDS.length)} ask={pending ?? undefined} />
        </svg>
        <div className="space-y-3">
          <p className="text-sm text-slate-700">
            Dobj a kockával, és lépj! A mező színe egy számot jelent (fent). Számold ki a szám megadott részét! Ha hibázol, a helyeden maradsz.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={roll} disabled={pending !== null || finished} className="h-14 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white text-lg font-black">
              🎲 Dobok
            </button>
            <div className="h-14 w-14 rounded-xl border-2 border-slate-300 flex items-center justify-center text-3xl font-black text-slate-800">{die ?? '–'}</div>
          </div>
          {f && pending !== null && (
            <div className="rounded-xl bg-sky-50 border border-sky-200 p-3 space-y-2">
              <div className="font-bold text-slate-800">
                A {f.c} mezőre léptél: {fw(f.n, f.d)}. Mennyi {nak(BOARD_VALUES[f.c])} {az(f.n)} {fwOf(f.n, f.d)}?
              </div>
              <div className="flex items-center gap-2">
                <input
                  inputMode="numeric"
                  value={input}
                  onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
                  className="h-12 w-32 rounded-xl border-2 border-slate-300 px-3 text-xl font-black text-center"
                  aria-label="mező értéke"
                />
                <button onClick={check} className="h-12 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black">
                  Ellenőrzöm
                </button>
              </div>
            </div>
          )}
          {msg && <div className={`rounded-xl p-3 text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>{msg.t}</div>}
          <button onClick={reset} className="h-11 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold">
            Új játék
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
export const FractionsExamTheory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-fractions"
      subtopicId="gyakorlas-tudasproba"
      title="6. Gyakorlás, tudáspróba"
      subtitle="Amit már tudsz a törtszámokról: törtrészek neve, egynél kisebb és nagyobb törtek, összehasonlítás és a törtrész kiszámítása – vegyes feladatokkal."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_tortszamok_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezet tudáspróbájára?"
      practiceSubtitle="90 feladat vár rád 3 szinten – hajrá!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ — A TÖRTSZÁMOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-mono text-base font-black text-orange-900 dark:text-orange-200">4 egyenlő részből 3 rész = 3 negyed • 12-nek a 3 negyede = 12 : 4 · 3 = 9</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A tört neve megmondja, <strong>hány egyenlő részre</strong> vágtuk az egészet (negyed → 4 rész), és <strong>hány részt</strong> veszünk (3 negyed → 3 rész).</li>
              <li>Ha minden részt veszünk: <strong>1 egész</strong> (4 negyed). Ha többet: <strong>egynél nagyobb</strong> tört (5 negyed = 1 egész és 1 negyed).</li>
              <li>Több részre vágva kisebb egy rész: 1 harmad &gt; 1 negyed. Ugyanolyan részekből a több a nagyobb: 3 negyed &gt; 1 negyed.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz" badge="Összefoglalás: 1–5. lecke" badgeColor="orange">
        <ChapterSummarySvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 items-center">
          <TheoryTable
            headers={['Lecke', 'Amit tudsz']}
            rows={[
              ['1. Törtrész', 'Egyenlő részek neve: fél (1 ketted), harmad, negyed, ötöd, hatod, nyolcad, tized.'],
              ['2. Egynél kisebb törtek', '3 negyed: 4 egyenlő részből 3 rész. A fehér rész: 1 negyed.'],
              ['3. 1 egész, egynél nagyobb', '3 harmad = 4 negyed = 1 egész; 7 harmad = 2 egész és 1 harmad.'],
              ['4. Összehasonlítás', '1 ketted > 1 harmad; 2 negyed = 5 tized; 3 negyed < 4 ötöd.'],
              ['5. Törtrész kiszámítása', '300 Ft-nak a 2 harmada: 300 : 3 · 2 = 200 Ft.']
            ]}
          />
          <PartNamesSvg />
        </div>
      </TheorySection>

      {/* 2. Ellenőrizd a tudásodat */}
      <TheorySection title="2. Ellenőrizd a tudásodat! – színezés és érték" badge="Munkafüzet II. 78. o., 3–4. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Színezd ki a síkidomok megadott részét!" badge="3. feladat" badgeColor="emerald">
            <ShapePartsSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              Számold meg a kis négyzeteket! 9 négyzet harmada 3, 4 négyzet negyede 1, 10 négyzet ötöde 2, 8 négyzet fele 4 négyzet.
            </p>
          </TheoryCard>
          <TheoryCard title="Mennyit ér a színezett rész?" badge="4. feladat" badgeColor="teal">
            <RectValueSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              2400 : 2 = 1200 • 2400 : 3 = 800 • 2400 : 12 = 200 • 2400 : 4 = 600. A tört nevét a <strong>részek száma</strong> adja (a 12 kis négyzetből 1 színes: 1 tizenketted).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Mit tapasztaltál */}
      <TheorySection title="3. Mit tapasztaltál? – ugyanannyi, más néven" badge="Munkafüzet II. 83. o., 8. feladat" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SameHalfCirclesSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Színezd ki a körök 1 kettedét, 4 nyolcadát és 2 negyedét! Mindhárom körnek a <strong>fele</strong> lesz színes: 1 ketted = 4 nyolcad = 2 negyed.
            </p>
            <TheoryCallout type="tip" title="Összehasonlításnál segít">
              Ha két törtről nem látod rögtön, melyik a nagyobb, nézd meg, több-e vagy kevesebb a felénél! 3 nyolcad kevesebb, 2 harmad több, mint a fele – tehát 3 nyolcad &lt; 2 harmad.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Nézzük meg együtt! */}
      <TheorySection title="4. Nézzük meg együtt! – vegyes feladatok" badge="Munkafüzet II. 79. és 83. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A nomád tábor" badge="MF 83. o., 9. feladat" badgeColor="sky">
            <CampSvg className="w-full h-auto" />
          </TheoryCard>
          <div className="space-y-4">
            <TheoryCard title="B) A szakasz tizedrésze" badge="MF 79. o., 5. feladat" badgeColor="indigo">
              <p className="text-sm text-slate-700 leading-relaxed">
                Mérd meg a szakaszt milliméteres pontossággal! Ha például 12 cm = <strong>120 mm</strong>, a tizedrésze 120 : 10 = <strong>12 mm</strong>. Rajzold át pirossal: 1 cm 2 mm hosszú lesz.
              </p>
            </TheoryCard>
            <TheoryCard title="C) Ki jár közelebb?" badge="TK 151. o., 17. b)" badgeColor="amber">
              <p className="text-sm text-slate-700 leading-relaxed">
                1000 km-es út: 2 negyed = 1000 : 4 · 2 = <strong>500 km</strong>, 4 tized = 1000 : 10 · 4 = <strong>400 km</strong>. Aki 2 negyed résznél jár, az van közelebb a célhoz: 2 negyed &gt; 4 tized.
              </p>
            </TheoryCard>
            <TheoryCard title="D) 1 és negyed óra" badge="TK 151. o., 18. c)" badgeColor="purple">
              <p className="text-sm text-slate-700 leading-relaxed">
                1 óra = 60 perc, negyed óra = 15 perc. 1 és negyed óra = 60 + 15 = <strong>75 perc</strong>. Ez 5 negyed óra: egynél nagyobb tört!
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Vigyázz! */}
      <TheorySection title="5. Vigyázz! – a leggyakoribb hibák" badge="Csapda" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="Nem egyenlő részek"
            wrong="Három különböző méretű darabra törtem a csokit, egy darab 1 harmad."
            wrongExplanation="Törtrészről csak akkor beszélünk, ha az egészet egyenlő részekre osztottuk."
            correct="3 egyenlő részre törve egy darab 1 harmad."
            correctExplanation="Először mindig nézd meg: egyformák-e a részek?"
          />
          <TheoryTrapBox
            title="Felcserélt lépések"
            wrong="24-nek a 3 negyede: 24 : 3 · 4 = 32"
            wrongExplanation="A 3 negyed kevesebb, mint az egész, ezért az eredmény nem lehet több 24-nél!"
            correct="24 : 4 · 3 = 18"
            correctExplanation="Negyed → 4-gyel osztunk; 3 rész → 3-mal szorzunk."
            tip="A „maradék fele” a maradékból számolandó, nem az egészből!"
          />
        </div>
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Labor I: Vegyes feladatok gépe" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-700 mb-3">Nyomd meg az „Új feladat” gombot! Kapsz egy leolvasós, egy összehasonlítós vagy egy számolós feladatot. Válaszolj, és rögtön látod, jó-e.</p>
        <MixedLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Labor II: Törtes társasjáték" badge="Tankönyv 152. o., 20. feladat" badgeColor="sky">
        <BoardLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionsExamTheory;
