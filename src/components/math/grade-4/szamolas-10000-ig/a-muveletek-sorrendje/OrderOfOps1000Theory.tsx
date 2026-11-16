import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  OrderRulesSvg,
  StepCirclesSvg,
  FishingRodsSvg,
  ParenthesesCompareSvg,
  MillBoardLines,
  MILL_POINTS
} from './OrderOfOps1000Figures';

// ---------------------------------------------------------------------------
// Műveletsor tokenekre bontva + a következő művelet keresése
// ---------------------------------------------------------------------------
export type Tok = { k: 'n'; v: number } | { k: 'o'; v: '+' | '−' | '·' | ':' } | { k: '(' } | { k: ')' };

export const tokenize = (s: string): Tok[] => {
  const out: Tok[] = [];
  const parts = s.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(/\s+/).filter(Boolean);
  for (const p of parts) {
    if (p === '(') out.push({ k: '(' });
    else if (p === ')') out.push({ k: ')' });
    else if (p === '+' || p === '−' || p === '·' || p === ':') out.push({ k: 'o', v: p });
    else out.push({ k: 'n', v: Number(p) });
  }
  return out;
};

/** A következőként elvégzendő művelet indexe a tokenlistában (-1, ha kész). */
export const nextOpIndex = (t: Tok[]): number => {
  let start = 0;
  let end = t.length;
  // legbelső zárójel
  for (let i = 0; i < t.length; i++) {
    if (t[i].k === '(') start = i + 1;
    if (t[i].k === ')') {
      end = i;
      break;
    }
  }
  if (end === t.length) start = 0;
  for (let i = start; i < end; i++) {
    const x = t[i];
    if (x.k === 'o' && (x.v === '·' || x.v === ':')) return i;
  }
  for (let i = start; i < end; i++) if (t[i].k === 'o') return i;
  return -1;
};

const apply = (a: number, op: string, b: number) => (op === '+' ? a + b : op === '−' ? a - b : op === '·' ? a * b : a / b);

/** Elvégzi az i-edik műveletet, és eltávolítja a felesleges zárójeleket. */
export const reduceAt = (t: Tok[], i: number): Tok[] => {
  const a = t[i - 1] as { k: 'n'; v: number };
  const op = t[i] as { k: 'o'; v: string };
  const b = t[i + 1] as { k: 'n'; v: number };
  let out: Tok[] = [...t.slice(0, i - 1), { k: 'n', v: apply(a.v, op.v, b.v) }, ...t.slice(i + 2)];
  let changed = true;
  while (changed) {
    changed = false;
    for (let j = 0; j + 2 < out.length; j++) {
      if (out[j].k === '(' && out[j + 1].k === 'n' && out[j + 2].k === ')') {
        out = [...out.slice(0, j), out[j + 1], ...out.slice(j + 3)];
        changed = true;
        break;
      }
    }
  }
  return out;
};

export const evaluate = (s: string): number => {
  let t = tokenize(s);
  let i = nextOpIndex(t);
  while (i >= 0) {
    t = reduceAt(t, i);
    i = nextOpIndex(t);
  }
  return (t[0] as { k: 'n'; v: number }).v;
};

const tokStr = (x: Tok) => (x.k === 'n' ? String(x.v) : x.k === 'o' ? x.v : x.k);

// ---------------------------------------------------------------------------
// Labor I – Melyik művelet jön?
// ---------------------------------------------------------------------------
const STEP_EXPRS = [
  '500 + 4 · 90',
  '70 · 9 − 8 · 40',
  '180 + 8 · 42 − 9 · 11',
  '1000 : ( 350 − 250 )',
  '70 · ( 9 − 8 ) · 4',
  '350 − 190 + 680 + 160',
  '( 460 − 267 ) · 5 − 400',
  '60 · 5 : 100 · 80'
];

const StepLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [toks, setToks] = useState<Tok[]>(() => tokenize(STEP_EXPRS[0]));
  const [history, setHistory] = useState<string[]>([STEP_EXPRS[0]]);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const next = nextOpIndex(toks);
  const done = next < 0;

  const load = (i: number) => {
    setIdx(i);
    setToks(tokenize(STEP_EXPRS[i]));
    setHistory([STEP_EXPRS[i]]);
    setMsg(null);
  };

  const click = (i: number) => {
    if (done) return;
    if (i === next) {
      const nt = reduceAt(toks, i);
      setToks(nt);
      setHistory((h) => [...h, nt.map(tokStr).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')')]);
      setMsg({ ok: true, t: 'Jó választás! Ezt kellett most elvégezni.' });
    } else {
      const hasParen = toks.some((x) => x.k === '(');
      const nOp = toks[next] as { k: 'o'; v: string };
      setMsg({
        ok: false,
        t: hasParen
          ? 'Nem ez jön! Először a zárójelben lévő műveletet végezzük el.'
          : nOp.v === '·' || nOp.v === ':'
          ? 'Nem ez jön! A szorzás és az osztás megelőzi az összeadást és a kivonást.'
          : 'Nem ez jön! Ha csak összeadás és kivonás maradt, balról jobbra haladunk.'
      });
    }
  };

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {STEP_EXPRS.map((_, i) => (
          <button
            key={i}
            onClick={() => load(i)}
            className={`w-10 h-10 rounded-xl text-sm font-black ${i === idx ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="text-sm font-bold text-slate-600">Kattints arra a műveleti jelre, amelyiket most kell elvégezni!</div>

      <div className="flex flex-wrap items-center justify-center gap-1.5 min-h-[64px]">
        {toks.map((x, i) =>
          x.k === 'o' ? (
            <button
              key={i}
              onClick={() => click(i)}
              className="w-12 h-12 rounded-xl text-2xl font-black bg-violet-100 hover:bg-violet-200 border-2 border-violet-300 text-violet-800"
              aria-label={`művelet ${x.v}`}
            >
              {x.v}
            </button>
          ) : (
            <span key={i} className={`text-2xl font-black ${x.k === 'n' ? 'text-slate-800' : 'text-amber-600'}`}>
              {tokStr(x)}
            </span>
          )
        )}
      </div>

      {msg && !done && (
        <div className={`text-sm font-bold text-center ${msg.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{msg.t}</div>
      )}

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-700 space-y-1">
        {history.map((h, i) => (
          <div key={i}>
            {i === 0 ? '' : '= '}
            {h}
          </div>
        ))}
      </div>

      {done && (
        <TheoryCallout type="success" title="Kész, ügyes vagy! 🎉">
          Az eredmény: {(toks[0] as { k: 'n'; v: number }).v}. Válassz egy másik feladatot a számokkal fent!
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Malom: rakd a korongot az eredményre!
// ---------------------------------------------------------------------------
const MILL_TASKS: { expr: string; who: 'L' | 'M' }[] = [
  { expr: '1000 − 678 + 127', who: 'L' },
  { expr: '1000 − ( 678 + 127 )', who: 'M' },
  { expr: '423 − 144 · 2', who: 'L' },
  { expr: '( 423 − 144 ) · 2', who: 'M' },
  { expr: '3 · 139 + 117', who: 'L' },
  { expr: '3 · ( 139 + 117 )', who: 'M' }
];

const MillLab: React.FC = () => {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState<Record<number, 'L' | 'M'>>({});
  const [wrong, setWrong] = useState<number | null>(null);
  const finished = step >= MILL_TASKS.length;
  const task = MILL_TASKS[Math.min(step, MILL_TASKS.length - 1)];
  const answer = evaluate(task.expr);

  const click = (v: number) => {
    if (finished || placed[v]) return;
    if (v === answer) {
      setPlaced({ ...placed, [v]: task.who });
      setStep(step + 1);
      setWrong(null);
    } else setWrong(v);
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 300 300" className="w-full h-auto max-w-[340px] mx-auto">
          <rect x="1" y="1" width="298" height="298" rx="14" fill="#fef3c7" stroke="#f59e0b" />
          <MillBoardLines />
          {MILL_POINTS.map((p) => {
            const who = placed[p.v];
            return (
              <g key={p.v} onClick={() => click(p.v)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="17"
                  fill={who === 'L' ? '#ef4444' : who === 'M' ? '#3b82f6' : wrong === p.v ? '#fecaca' : '#ffffff'}
                  stroke="#78350f"
                  strokeWidth="1.5"
                />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill={who ? '#ffffff' : '#0f172a'}>
                  {p.v}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="space-y-3">
          {!finished ? (
            <>
              <div className={`rounded-xl p-3 border-2 ${task.who === 'L' ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'}`}>
                <div className="text-sm font-bold text-slate-600">
                  {task.who === 'L' ? 'Levente (piros korong)' : 'Márk (kék korong)'} – {step + 1}. / {MILL_TASKS.length}
                </div>
                <div className="text-2xl font-black text-slate-800 mt-1">{task.expr.replace(/\( /g, '(').replace(/ \)/g, ')')} = ?</div>
              </div>
              <p className="text-sm text-slate-600">Számold ki a füzetedben, aztán kattints a táblán az eredményre!</p>
              {wrong !== null && (
                <div className="text-sm font-bold text-rose-700">
                  Ez a szám ({wrong}) nem jó. Figyelj a sorrendre: {task.expr.includes('(') ? 'először a zárójel!' : 'először a szorzás, aztán balról jobbra.'}
                </div>
              )}
            </>
          ) : (
            <TheoryCallout type="success" title="Minden korong a helyén! 🎉">
              Ugyanazok a számok és jelek, mégis más eredmény: a zárójel megváltoztatja a műveletek sorrendjét. 449 és 195, 135 és 558, 534 és 768.
            </TheoryCallout>
          )}
          <button
            onClick={() => {
              setStep(0);
              setPlaced({});
              setWrong(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
          >
            Újrakezdem
          </button>
        </div>
      </div>
    </div>
  );
};

export const OrderOfOps1000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="a-muveletek-sorrendje"
      title="4. A műveletek sorrendje"
      subtitle="Melyik műveletet végezzük el először? Zárójel, szorzás és osztás, összeadás és kivonás."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="violet"
      pdfFilename="4_osztaly_a_muveletek_sorrendje_tananyag.pdf"
      practiceTitle="Készen állsz a műveletsorok gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A MŰVELETEK SORRENDJE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                ( ) → · és : → + és −
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>1.</strong> A zárójel kijelöli, mit számolunk először.
              </li>
              <li>
                <strong>2.</strong> Utána balról jobbra a szorzások és az osztások.
              </li>
              <li>
                <strong>3.</strong> Végül balról jobbra az összeadások és a kivonások.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 21. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha egy feladatban több művelet is van, nem mindegy, melyikkel kezdünk! Az 500 + 4 · 90 helyes eredménye <strong>860</strong>, mert először a szorzást végezzük el: 4 · 90 = 360, aztán 500 + 360 = 860.
            </p>
            <p>A tankönyv gyerekei így foglalják össze:</p>
            <TheoryCallout type="info" title="Szabály">
              Ha a műveletsor többféle műveletet tartalmaz, akkor először balról jobbra haladva a szorzásokat, osztásokat végezzük el, utána balról jobbra haladva az összeadásokat, kivonásokat. A zárójel kijelöli a műveletek sorrendjét.
            </TheoryCallout>
          </div>
          <OrderRulesSvg />
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt */}
      <TheorySection title="2. Nézzük meg együtt!" badge="Tankönyv 21. o., 1. feladat" badgeColor="indigo">
        <TheoryTable
          headers={['Műveletsor', 'Lépések', 'Eredmény']}
          rows={[
            ['350 − 190 + 680 + 160', 'Csak + és −, balról jobbra: 350 − 190 = 160, 160 + 680 = 840, 840 + 160', '1000'],
            ['60 · 5 : 100 · 80', 'Csak · és :, balról jobbra: 60 · 5 = 300, 300 : 100 = 3, 3 · 80', '240'],
            ['70 · 9 − 8 · 40', 'Először a szorzások: 630 − 320', '310'],
            ['1000 : (350 − 250)', 'Először a zárójel: 1000 : 100', '10'],
            ['500 + 4 · 90', 'Először a szorzás: 500 + 360', '860'],
            ['70 · (9 − 8) · 4', 'Zárójel: 70 · 1 · 4', '280']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <StepCirclesSvg />
          <TheoryCard title="Jelöld a sorrendet!" badge="Munkafüzet 16. o." badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              Írd a műveleti jelek fölé körbe, hányadikként végzed el őket! A 180 + 8 · 42 − 9 · 11 feladatban: ① 8 · 42 = 336, ② 9 · 11 = 99, ③ 180 + 336 = 516, ④ 516 − 99 = <strong>417</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Zárójel */}
      <TheorySection title="3. A zárójel megváltoztatja az eredményt" badge="Munkafüzet 17. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ParenthesesCompareSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Ugyanazok a számok, ugyanazok a műveleti jelek – mégis más az eredmény:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1000 − 678 + 127 = <strong>449</strong>, de 1000 − (678 + 127) = <strong>195</strong></li>
              <li>423 − 144 · 2 = <strong>135</strong>, de (423 − 144) · 2 = <strong>558</strong></li>
              <li>3 · 139 + 117 = <strong>534</strong>, de 3 · (139 + 117) = <strong>768</strong></li>
            </ul>
            <p>A malomjátékban Levente piros korongjai a zárójel nélküli, Márk kék korongjai a zárójeles eredményekre kerülnek.</p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szöveges feladatok */}
      <TheorySection title="4. Nézzük meg együtt! Horgászat" badge="Tankönyv 21. o., 2–3. feladat" badgeColor="sky">
        <FishingRodsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Milyen hosszú a bot?" badge="2. feladat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              124 · 8 − 129 · 6 = 992 − 774 = <strong>218 cm</strong>
              <br />
              97 · 9 − 663 = 873 − 663 = <strong>210 cm</strong>
              <br />
              739 − 67 · 8 = 739 − 536 = <strong>203 cm</strong>
            </p>
          </TheoryCard>
          <TheoryCard title="Mennyi ideig horgásztak?" badge="3. feladat" badgeColor="sky">
            <p className="text-sm text-slate-700">
              Karcsi bácsi 480 percig horgászott, Pista bácsi ennek a felénél fél órával (30 perccel) többet: 480 : 2 + 30 = 240 + 30 = <strong>270 perc</strong>. Összesen 480 + 270 = <strong>750 perc</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Vigyázz! */}
      <TheorySection title="5. Vigyázz! Ne számolj mindig balról jobbra" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az összeadást a szorzás elé vette"
          wrong="500 + 4 · 90 = 504 · 90"
          wrongExplanation="Balról jobbra számolt, pedig a szorzás megelőzi az összeadást. Így hatalmas, rossz eredményt kapott."
          correct="500 + 4 · 90 = 500 + 360 = 860"
          correctExplanation="Először a szorzás: 4 · 90 = 360. Csak utána adunk össze."
          tip="Húzd alá a szorzásokat és osztásokat, és azokkal kezdj! Ha zárójel van, az az első."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Melyik művelet jön?" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">Kattints a műveleti jelre, amelyiket most kell elvégezni! A gép kiszámolja, és megmutatja a következő sort.</p>
        <StepLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Malom – rakd a korongot az eredményre!" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-600">Számold ki Levente és Márk műveletsorait, és tedd a korongot a táblán a helyes eredményre!</p>
        <MillLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OrderOfOps1000Theory;
