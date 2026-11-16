import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { OrderLadderSvg, MonaManoSvg, TrainWagonsSvg, OpenSentenceLineSvg, FishHookSvg, WAGONS, Wagon } from './OrderOfOps10000Figures';

// ---------------------------------------------------------------------------
// Műveletsor kiértékelése lépésenként (zárójel → · és : → + és −, balról jobbra)
// ---------------------------------------------------------------------------
type T = number | string;

const tokens = (s: string): T[] =>
  s
    .replace(/10 000/g, '10000')
    .replace(/([()])/g, ' $1 ')
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => (/^\d+$/.test(p) ? Number(p) : p));

const calc = (a: number, op: string, b: number) => (op === '+' ? a + b : op === '−' ? a - b : op === '·' ? a * b : a / b);

const fmt = (t: T[]) =>
  t
    .map(String)
    .join(' ')
    .replace(/\( /g, '(')
    .replace(/ \)/g, ')');

/** Egy lépés: a következő elvégzendő művelet elvégzése. */
const stepOnce = (t: T[]): T[] | null => {
  if (t.length === 1) return null;
  let s = 0;
  let e = t.length;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '(') s = i + 1;
    if (t[i] === ')') {
      e = i;
      break;
    }
  }
  if (e === t.length) s = 0;
  let k = -1;
  for (let i = s; i < e; i++) if (t[i] === '·' || t[i] === ':') { k = i; break; }
  if (k < 0) for (let i = s; i < e; i++) if (t[i] === '+' || t[i] === '−') { k = i; break; }
  if (k < 0) return null;
  let out: T[] = [...t.slice(0, k - 1), calc(t[k - 1] as number, t[k] as string, t[k + 1] as number), ...t.slice(k + 2)];
  // felesleges zárójel eltávolítása
  for (let j = 0; j + 2 < out.length; j++) {
    if (out[j] === '(' && typeof out[j + 1] === 'number' && out[j + 2] === ')') {
      out = [...out.slice(0, j), out[j + 1], ...out.slice(j + 3)];
      break;
    }
  }
  return out;
};

/** A műveletsor összes lépése szövegként (az első a kiinduló sor). */
export const evalSteps = (s: string): string[] => {
  let t = tokens(s);
  const out = [fmt(t)];
  let n = stepOnce(t);
  while (n) {
    t = n;
    out.push(fmt(t));
    n = stepOnce(t);
  }
  return out;
};

export const evaluate = (s: string): number => {
  let t = tokens(s);
  let n = stepOnce(t);
  while (n) {
    t = n;
    n = stepOnce(t);
  }
  return t[0] as number;
};

// ---------------------------------------------------------------------------
// Labor I – Jelfelrakó (tankönyv 107. o., 9. feladat)
// ---------------------------------------------------------------------------
export const SIGN_TASKS: { target: number; left: boolean }[] = [
  { target: 4870, left: false },
  { target: 800, left: true },
  { target: 5400, left: false },
  { target: 4794, left: true },
  { target: 4200, left: false },
  { target: 90, left: true }
];
const SIGNS = ['+', '−', '·', ':'];

const SignLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [s1, setS1] = useState<string | null>(null);
  const [s2, setS2] = useState<string | null>(null);
  const [solved, setSolved] = useState<Record<number, string>>({});
  const task = SIGN_TASKS[ti];
  const expr = s1 && s2 ? `4800 ${s1} 60 ${s2} 10` : null;
  const steps = expr ? evalSteps(expr) : [];
  const value = expr ? evaluate(expr) : null;
  const ok = value === task.target;

  const choose = (which: 1 | 2, s: string) => {
    const n1 = which === 1 ? s : s1;
    const n2 = which === 2 ? s : s2;
    if (which === 1) setS1(s);
    else setS2(s);
    if (n1 && n2 && evaluate(`4800 ${n1} 60 ${n2} 10`) === task.target) setSolved({ ...solved, [ti]: `${n1} ${n2}` });
  };

  const load = (i: number) => {
    setTi(i);
    setS1(null);
    setS2(null);
  };

  const signRow = (which: 1 | 2, cur: string | null) => (
    <div className="flex flex-col gap-1">
      {SIGNS.map((s) => (
        <button
          key={s}
          onClick={() => choose(which, s)}
          aria-label={`${which}. jel: ${s}`}
          className={`w-12 h-12 rounded-xl text-2xl font-black border-2 ${
            cur === s ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-purple-800 border-purple-300 hover:bg-purple-50'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );

  const box = (cur: string | null) => (
    <span className={`inline-flex w-10 h-10 items-center justify-center rounded-lg text-2xl font-black ${cur ? 'bg-purple-100 text-purple-800' : 'bg-rose-500 text-white'}`}>
      {cur ?? '?'}
    </span>
  );

  return (
    <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {SIGN_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => load(i)}
            className={`px-3 h-10 rounded-xl text-sm font-black ${
              i === ti ? 'bg-purple-600 text-white' : solved[i] ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {String.fromCharCode(97 + i)}) {t.target} {solved[i] ? '✔' : ''}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-2xl font-black text-slate-800">
        {task.left && <span>{task.target} =</span>}
        <span>4800</span>
        {box(s1)}
        <span>60</span>
        {box(s2)}
        <span>10</span>
        {!task.left && <span>= {task.target}</span>}
      </div>
      <div className="flex justify-center gap-10">
        <div className="text-center space-y-1">
          <div className="text-xs font-bold text-slate-500">1. jel</div>
          {signRow(1, s1)}
        </div>
        <div className="text-center space-y-1">
          <div className="text-xs font-bold text-slate-500">2. jel</div>
          {signRow(2, s2)}
        </div>
        <div className="flex-1 max-w-xs bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-700 space-y-1 self-stretch">
          {steps.length ? (
            steps.map((st, i) => (
              <div key={i}>
                {i === 0 ? '' : '= '}
                {st}
              </div>
            ))
          ) : (
            <div>Válassz két jelet!</div>
          )}
        </div>
      </div>
      {value !== null && (
        <div className={`text-center text-base font-black ${ok ? 'text-emerald-700' : 'text-rose-700'}`}>
          {ok
            ? 'Igaz az állítás! 🎉'
            : Number.isInteger(value)
            ? `Ez ${value}, nem ${task.target}. Figyelj: a szorzás és az osztás megelőzi az összeadást és a kivonást!`
            : `Ez nem egész szám. Próbálj másik jelet!`}
        </div>
      )}
      {Object.keys(solved).length === SIGN_TASKS.length && (
        <TheoryCallout type="success" title="Mind a hat állítás igaz lett!">
          Ugyanazok a számok, más jelek – és a sorrend miatt teljesen más eredmények: 4870, 800, 5400, 4794, 4200, 90.
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Melyik város a végállomás? (106. o., 4. feladat)
// ---------------------------------------------------------------------------
export const WAGON_ORDER = [...WAGONS].sort((a, b) => evaluate(a.expr) - evaluate(b.expr)).map((w) => w.l);

const TrainLab: React.FC = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const done = picked.length === WAGONS.length;

  const click = (l: string) => {
    if (done || picked.includes(l)) return;
    if (WAGON_ORDER[picked.length] === l) {
      setPicked([...picked, l]);
      setWrong(null);
    } else setWrong(l);
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <p className="text-sm text-slate-700">
        Számold ki a kocsikon lévő műveletsorokat a füzetedben! Aztán kattints a kocsikra az eredményük szerint <strong>növekvő sorrendben</strong> (a legkisebbel kezdd)!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {WAGONS.map((w) => {
          const used = picked.includes(w.l);
          return (
            <button
              key={w.l}
              onClick={() => click(w.l)}
              disabled={used}
              className={`rounded-xl border-2 p-1 ${used ? 'opacity-40 border-slate-200' : wrong === w.l ? 'border-rose-500 bg-rose-50' : 'border-sky-200 hover:border-sky-400'}`}
              aria-label={`${w.l} kocsi: ${w.expr}`}
            >
              <svg viewBox="0 0 160 62" className="w-full h-auto">
                <Wagon x={2} y={2} l={w.l} expr={w.expr} c={w.c} w={156} />
              </svg>
            </button>
          );
        })}
      </div>
      {wrong && (
        <div className="text-sm font-bold text-rose-700 text-center">
          A(z) {wrong} kocsi eredménye nem a legkisebb a megmaradtak közül. Számold újra – figyelj a sorrendre!
        </div>
      )}
      <div className="flex items-end gap-1 overflow-x-auto pb-1">
        <div className="shrink-0 w-14 h-12 rounded-t-xl bg-slate-700 text-white text-xs font-black flex items-center justify-center">🚂</div>
        {picked.map((l) => {
          const w = WAGONS.find((x) => x.l === l)!;
          return (
            <div key={l} className="shrink-0 w-20 h-12 rounded-lg text-white text-center font-black leading-tight pt-1" style={{ background: w.c }}>
              <div className="text-lg">{l}</div>
              <div className="text-[10px]">{evaluate(w.expr)}</div>
            </div>
          );
        })}
      </div>
      {done && (
        <TheoryCallout type="success" title="A végállomás: PUTNOK 🎉">
          866 &lt; 1732 &lt; 3273 &lt; 5045 &lt; 7086 &lt; 9274 – a betűk sorban: P, U, T, N, O, K.
        </TheoryCallout>
      )}
      <button
        onClick={() => {
          setPicked([]);
          setWrong(null);
        }}
        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
      >
        Újrakezdem
      </button>
    </div>
  );
};

export const OrderOfOps10000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-written-ops"
      subtopicId="a-muveletek-sorrendje"
      title="7. A műveletek sorrendje"
      subtitle="Műveletsorok 10 000-ig: zárójel, szorzás és osztás, összeadás és kivonás – írásbeli számolással."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="purple"
      pdfFilename="4_osztaly_a_muveletek_sorrendje_10000_tananyag.pdf"
      practiceTitle="Készen állsz a nagy számos műveletsorokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'EMLÉKEZTETŐ — A MŰVELETEK SORRENDJE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
              <span className="font-mono text-base font-black text-purple-900 dark:text-purple-200">( ) → · és : → + és −</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ugyanaz a szabály, mint 1000-ig (I. fejezet, 4. lecke) – csak most nagyobb számokkal, írásban számolunk.</li>
              <li>4264 − 1316 · 3 = 4264 − 3948 = 316, de (4264 − 1316) · 3 = 2948 · 3 = 8844.</li>
              <li>A részeredményeket a füzetben írásbeli művelettel számold ki!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 106. o. · Munkafüzet 21. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A műveletek sorrendjét már ismered. Most <strong>10 000-ig</strong> számolunk, és a részeredményeket <strong>írásban</strong> kapjuk meg.
            </p>
            <TheoryCallout type="info" title="A szabály">
              Először a zárójelben lévő műveletet végezzük el. Utána balról jobbra a szorzásokat és osztásokat, végül balról jobbra az összeadásokat és kivonásokat.
            </TheoryCallout>
            <p>
              Tipp: írd a műveleti jelek fölé körbe, hányadikként végzed el őket – ahogy a munkafüzetben!
            </p>
          </div>
          <OrderLadderSvg />
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt */}
      <TheorySection title="2. Nézzük meg együtt! Zárójellel és zárójel nélkül" badge="Munkafüzet 21. o., 1. feladat" badgeColor="indigo">
        <TheoryTable
          headers={['Műveletsor', 'Lépések', 'Eredmény']}
          rows={[
            ['4264 − 1316 · 3', '① 1316 · 3 = 3948, ② 4264 − 3948', '316'],
            ['(4264 − 1316) · 3', '① 4264 − 1316 = 2948, ② 2948 · 3', '8844'],
            ['9464 − 3518 + 1325', 'balról jobbra: ① 9464 − 3518 = 5946, ② 5946 + 1325', '7271'],
            ['5 · 1614 : 3', 'balról jobbra: ① 5 · 1614 = 8070, ② 8070 : 3', '2690'],
            ['1386 + 2634 : 6', '① 2634 : 6 = 439, ② 1386 + 439', '1825'],
            ['(1386 + 2634) : 6', '① 1386 + 2634 = 4020, ② 4020 : 6', '670']
          ]}
        />
        <TheoryCallout type="tip" title="Figyeld meg!">
          A 4264 − 1316 · 3 és a (4264 − 1316) · 3 csak egy zárójelben különbözik, mégis 316 és 8844 az eredmény!
        </TheoryCallout>
      </TheorySection>

      {/* 3. Mona és Manó */}
      <TheorySection title="3. Ki osztotta el helyesen a pénzt?" badge="Tankönyv 106. o., 1–3. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MonaManoSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Mona: 2550 : 2 + 3450 : 2 = 1275 + 1725 = <strong>3000 Ft</strong>. Manó: (2550 + 3450) : 2 = 6000 : 2 = <strong>3000 Ft</strong>. <strong>Mindketten</strong> helyesen gondolkodtak!
            </p>
            <TheoryCard title="Szövegből műveletsor" badge="2. feladat" badgeColor="sky">
              <ul className="list-disc pl-4 space-y-1">
                <li>A 6540 és a 3120 összegének harmada: (6540 + 3120) : 3 = 9660 : 3 = 3220</li>
                <li>A 8915 és a 4875 különbségének fele: (8915 − 4875) : 2 = 4040 : 2 = 2020</li>
                <li>Az 5543 és a 4129 különbségének ötszöröse: (5543 − 4129) · 5 = 1414 · 5 = 7070</li>
                <li>Az 1312 és a 2879 összegének kétszerese: (1312 + 2879) · 2 = 4191 · 2 = 8382</li>
              </ul>
            </TheoryCard>
            <p>
              „Valaminek az összege / különbsége” → ez kerül zárójelbe! 3 · 450 + 1450 = 2800, de 3 · (450 + 1450) = 5700.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szöveges feladatok, nyitott mondatok */}
      <TheorySection title="4. Tábor, bevásárlás, nyitott mondatok" badge="Tankönyv 107. o., 5–8. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A tábori tájékoztató" badge="5. feladat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              9000 : (7953 − 7053) = 10 és (6875 − 5475) : 100 = 14 → <strong>10–14 éves</strong> gyerekeknek. Július 9400 : 100 − 66 = <strong>28</strong>-tól augusztus 7794 : 3 − 2595 = <strong>3</strong>-ig. Díj: 1657 · 4 + 2872 = <strong>9500 Ft</strong>. Létszám: 1294 · 7 − 9026 = <strong>32 fő</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Bevásárlás" badge="6–7. feladat" badgeColor="orange">
            <p className="text-sm text-slate-700">
              Bakancs 6450 Ft és 3 pár zokni 285 Ft-ért: 10 000 − (6450 + 3 · 285) = 10 000 − 7305 = <strong>2695 Ft</strong> a visszajáró.
              <br />3 egyforma pulóver, 1450 Ft visszajáró: (10 000 − 1450) : 3 = 8550 : 3 = <strong>2850 Ft</strong> egy pulóver.
              <br />Hanna és Péter: 6120 − 6120 : 3 = 4080 Ft maradt, 6000 − 4080 = <strong>1920 Ft</strong>-ot kell még gyűjteniük.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <OpenSentenceLineSvg />
          <div className="space-y-2 text-sm text-slate-700">
            <p>Nyitott mondatnál előbb kiszámoljuk mindkét oldal műveletsorát, aztán keressük a számokat:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>7835 − 1349 + 134 − 5476 − 448 = 696 → 696 &gt; □</li>
              <li>345 : 3 · 8 · 5 : 100 = 46 → 46 &lt; □</li>
              <li>972 · 7 = 6804 és 2973 + 4122 : 3 = 4347 → 6804 &gt; □ &gt; 4347</li>
              <li>9848 : 4 + 3 · 1127 = 5843 és 9968 − 5 · 1135 + 1036 = 5329</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FishHookSvg />
          <p className="text-sm text-slate-700 leading-relaxed">
            Norbi apukája lékhorgászik. 8569 − 1456 · 3 = 4201, tehát 4201 &gt; □ &gt; 4150: a <strong>4197</strong>-es hal jó. 6543 − 1492 = 5051 és 9468 : 4 + 5628 = 7995, tehát 5051 &lt; □ &lt; 7995: az <strong>5734</strong>-es hal jó.
          </p>
        </div>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! A szöveg sorrendje nem mindig a számolás sorrendje" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Kifelejtette a zárójelet"
          wrong="A 6540 és a 3120 összegének harmada: 6540 + 3120 : 3 = 6540 + 1040 = 7580"
          wrongExplanation="Zárójel nélkül csak a 3120-at osztotta el 3-mal. Pedig az összeg harmadát kérdezték, vagyis előbb össze kell adni."
          correct="(6540 + 3120) : 3 = 9660 : 3 = 3220"
          correctExplanation="Az „összegének a harmada” azt jelenti: először összeadunk, aztán osztunk. Ezt a zárójel mutatja meg."
          tip="Ha a szövegben „összegének”, „különbségének” szerepel, azt a részt tedd zárójelbe!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Jelfelrakó" badge="Labor · Tankönyv 107. o., 9. feladat" badgeColor="purple">
        <p className="text-sm text-slate-600">Tedd a piros négyzetek helyére a műveleti jeleket úgy, hogy az állítás igaz legyen! A gép a helyes sorrendben számol.</p>
        <SignLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Hová megy a vonat?" badge="Labor · Tankönyv 106. o., 4. feladat" badgeColor="sky">
        <TrainWagonsSvg className="w-full h-auto max-w-[420px] mx-auto" />
        <TrainLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OrderOfOps10000Theory;
