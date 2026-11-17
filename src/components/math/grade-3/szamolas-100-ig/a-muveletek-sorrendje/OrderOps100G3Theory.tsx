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
  TrainChainSvg,
  FrogChainSvg,
  OrderRuleSvg,
  OrderBubblesSvg,
  OrderTrapSvg,
  BagsStorySvg
} from './OrderOps100G3Figures';

// ---------------------------------------------------------------------------
// Műveletsor-segédek (zárójel nélkül)
// ---------------------------------------------------------------------------
type Op = '+' | '−' | '·' | ':';
type Tok = number | Op;

const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const isOp = (t: Tok): t is Op => typeof t === 'string';
const high = (t: Tok) => t === '·' || t === ':';

const calc = (a: number, op: Op, b: number): number => {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '·') return a * b;
  return a / b;
};

/** Melyik műveletet kell most elvégezni? (index a token-listában) */
const nextIdx = (toks: Tok[]): number => {
  for (let i = 1; i < toks.length; i += 2) if (high(toks[i])) return i;
  return 1;
};

const applyAt = (toks: Tok[], i: number): Tok[] => {
  const r = calc(toks[i - 1] as number, toks[i] as Op, toks[i + 1] as number);
  return [...toks.slice(0, i - 1), r, ...toks.slice(i + 2)];
};

const steps = (toks: Tok[]): { line: string; res: Tok[] }[] => {
  const out: { line: string; res: Tok[] }[] = [];
  let t = toks;
  while (t.length > 1) {
    const i = nextIdx(t);
    const n = applyAt(t, i);
    out.push({ line: `${t[i - 1]} ${t[i]} ${t[i + 1]} = ${n[i - 1]}`, res: n });
    t = n;
  }
  return out;
};

const valueOf = (toks: Tok[]) => {
  const s = steps(toks);
  return s.length ? (s[s.length - 1].res[0] as number) : (toks[0] as number);
};

/** Balról jobbra, sorrend nélkül – a tipikus hiba. */
const naive = (toks: Tok[]): number | null => {
  let v = toks[0] as number;
  for (let i = 1; i < toks.length; i += 2) {
    v = calc(v, toks[i] as Op, toks[i + 1] as number);
    if (!Number.isInteger(v) || v < 0) return null;
  }
  return v;
};

const valid = (toks: Tok[]) => {
  let t = toks;
  while (t.length > 1) {
    t = applyAt(t, nextIdx(t));
    if (t.some((x) => typeof x === 'number' && (!Number.isInteger(x) || x < 0 || x > 100))) return false;
  }
  return true;
};

const genMixed = (): Tok[] => {
  for (let tries = 0; tries < 400; tries++) {
    const k = rnd(2, 3);
    const toks: Tok[] = [];
    let hasHigh = false;
    for (let j = 0; j < k; j++) {
      if (j > 0) toks.push(Math.random() < 0.55 ? '+' : '−');
      const r = Math.random();
      if (r < 0.4) {
        const a = rnd(2, 9);
        const b = rnd(2, 10);
        toks.push(a, '·', b);
        hasHigh = true;
      } else if (r < 0.65) {
        const d = rnd(2, 9);
        const q = rnd(2, 10);
        toks.push(d * q, ':', d);
        hasHigh = true;
      } else toks.push(rnd(2, 60));
    }
    if (!hasHigh || toks.length > 9) continue;
    if (!valid(toks)) continue;
    const nv = naive(toks);
    if (nv !== null && nv === valueOf(toks)) continue;
    return toks;
  }
  return [30, '−', 4, '·', 6];
};

const genChain = (): Tok[] => {
  for (let tries = 0; tries < 400; tries++) {
    let toks: Tok[];
    if (Math.random() < 0.5) {
      const a = rnd(30, 90);
      const b = rnd(5, a - 10);
      const c = rnd(2, 40);
      toks = [a, '−', b, '+', c];
    } else {
      const a = rnd(2, 9);
      const b = rnd(2, 9);
      const divs = [2, 3, 4, 5, 6].filter((d) => (a * b) % d === 0);
      if (!divs.length) continue;
      const d = divs[rnd(0, divs.length - 1)];
      toks = Math.random() < 0.5 ? [a, '·', b, ':', d] : [a * b, ':', d, '·', rnd(2, 5)];
    }
    if (valid(toks)) return toks;
  }
  return [40, '−', 15, '+', 8];
};

const show = (toks: Tok[]) => toks.join(' ');

export const OrderOps100G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – lépkedő
  const [start, setStart] = useState<Tok[]>([18, '+', 4, '·', 6, '−', 9]);
  const [cur, setCur] = useState<Tok[]>([18, '+', 4, '·', 6, '−', 9]);
  const [hist, setHist] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const tap = (i: number) => {
    const ni = nextIdx(cur);
    if (i === ni) {
      const n = applyAt(cur, i);
      setHist([...hist, `${cur[i - 1]} ${cur[i]} ${cur[i + 1]} = ${n[i - 1]}`]);
      setCur(n);
      setMsg(n.length === 1 ? { ok: true, text: `Kész! Az eredmény: ${n[0]}.` } : { ok: true, text: 'Jó! Melyik jön most?' });
    } else if (!high(cur[i]) && cur.some((t, j) => j % 2 === 1 && high(t))) {
      setMsg({ ok: false, text: 'Várj! Előbb a szorzást és az osztást végezzük el.' });
    } else {
      setMsg({ ok: false, text: 'Balról jobbra haladj! Van előtte egy művelet, amit előbb kell elvégezni.' });
    }
  };
  const newStepper = () => {
    const t = Math.random() < 0.7 ? genMixed() : genChain();
    setStart(t);
    setCur(t);
    setHist([]);
    setMsg(null);
  };

  // Labor II – számold ki
  const [ex, setEx] = useState<Tok[]>([10, '+', 2, '·', 5]);
  const [val, setVal] = useState('');
  const [res, setRes] = useState<null | 'ok' | 'naive' | 'bad'>(null);
  const [showSteps, setShowSteps] = useState(false);
  const exVal = valueOf(ex);
  const check = () => {
    const v = Number(val);
    if (v === exVal) setRes('ok');
    else if (naive(ex) !== null && v === naive(ex)) setRes('naive');
    else setRes('bad');
  };
  const newEx = () => {
    setEx(genMixed());
    setVal('');
    setRes(null);
    setShowSteps(false);
  };

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="a-muveletek-sorrendje"
      grade={3}
      chapterId="szamolas-100-ig"
      title="6. A műveletek sorrendje"
      subtitle="Melyik műveletet végezzük el először? Előbb szorzunk és osztunk, utána adunk össze és vonunk ki."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_muveletek_sorrendje_tananyag.pdf"
      practiceTitle="Készen állsz a műveletsorokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              18 + 4 · 6 = 18 + 24 = 42
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Először a <strong>szorzás</strong> és az <strong>osztás</strong>.</li>
              <li>Utána az <strong>összeadás</strong> és a <strong>kivonás</strong>.</li>
              <li>Ha egyformák a műveletek: <strong>balról jobbra</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 18–19. o." badgeColor="orange">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A <strong>műveletsorban</strong> több művelet van egymás után. Például: 18 + 4 · 6.</p>
          <p>Ha mindenki más sorrendben számolna, mindenkinek más eredmény jönne ki. Ezért van egy <strong>közös szabály</strong>.</p>
        </div>
        <OrderRuleSvg />
      </TheorySection>

      <TheorySection title="2. Csak összeadás és kivonás" badge="Balról jobbra" badgeColor="sky">
        <TrainChainSvg />
        <TheoryCallout type="tip" title="Szabály">
          Ha csak <strong>+</strong> és <strong>−</strong> van, akkor <strong>balról jobbra</strong> számolunk, ahogy olvasunk.
        </TheoryCallout>
        <TheoryCard title="Nézzük meg együtt!" badge="40 − 15 + 8" badgeColor="sky">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Balról az első: 40 − 15 = 25</li>
            <li>Utána: 25 + 8 = <strong>33</strong></li>
          </ol>
          <p className="text-sm text-rose-700 mt-2">Ha hátulról kezdenéd (15 + 8 = 23, 40 − 23 = 17), rossz eredményt kapnál.</p>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="3. Csak szorzás és osztás" badge="Balról jobbra" badgeColor="emerald">
        <FrogChainSvg />
        <TheoryCallout type="tip" title="Szabály">
          Ha csak <strong>·</strong> és <strong>:</strong> van, akkor is <strong>balról jobbra</strong> számolunk.
        </TheoryCallout>
        <TheoryCard title="Nézzük meg együtt!" badge="36 : 6 · 2" badgeColor="emerald">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Balról az első: 36 : 6 = 6</li>
            <li>Utána: 6 · 2 = <strong>12</strong></li>
          </ol>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Vegyes műveletsor" badge="Szorzás, osztás előbb" badgeColor="orange">
        <OrderBubblesSvg />
        <p className="text-sm text-slate-700">
          Írd a műveletek fölé kis körbe, melyik hányadik! A szorzás kapja az <strong>1.</strong> számot, a kivonás a <strong>2.</strong> számot.
        </p>
        <TheoryTable
          headers={['Műveletsor', '1. lépés', '2. lépés', 'Eredmény']}
          rows={[
            ['36 + 4 · 6', '4 · 6 = 24', '36 + 24 = 60', '60'],
            ['3 · 10 − 14', '3 · 10 = 30', '30 − 14 = 16', '16'],
            ['21 + 45 : 5', '45 : 5 = 9', '21 + 9 = 30', '30'],
            ['6 · 8 − 4 · 7', '6 · 8 = 48, 4 · 7 = 28', '48 − 28 = 20', '20']
          ]}
        />
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt! Egy történet" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BagsStorySvg />
          <TheoryCard title="Hány alma van?" badge="3 · 6 + 4" badgeColor="amber">
            <p className="text-sm text-slate-700">3 zacskóban 6-6 piros alma van. Mellettük még 4 zöld alma.</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>A zacskókban: 3 · 6 = 18</li>
              <li>Meg a 4 zöld: 18 + 4 = 22</li>
              <li>Egy műveletsorral: <strong>3 · 6 + 4 = 22</strong></li>
            </ul>
            <p className="text-sm text-slate-700 mt-2"><strong>Válasz:</strong> 22 alma van.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Vigyázz! Ne számolj csak balról jobbra!" badge="Csapda" badgeColor="rose">
        <OrderTrapSvg />
        <TheoryTrapBox
          title="10 + 2 · 5"
          wrong="10 + 2 = 12, 12 · 5 = 60"
          wrongExplanation="Ez a szorzás előtt adott össze. Rossz a sorrend!"
          correct="2 · 5 = 10, 10 + 10 = 20"
          correctExplanation="Először a szorzás: 2 · 5 = 10. Utána az összeadás: 10 + 10 = 20."
          tip="Keresd meg először a · és a : jelet!"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Melyiket számolod először?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-orange-900 bg-orange-50 rounded-xl p-3">Koppints arra a műveleti jelre, amelyiket <strong>most</strong> kell elvégezni!</p>
          <div className="flex flex-wrap items-center justify-center gap-2 py-2">
            {cur.map((t, i) =>
              isOp(t) ? (
                <button
                  key={i}
                  onClick={() => tap(i)}
                  className="w-14 h-14 rounded-2xl bg-orange-100 border-2 border-orange-300 text-3xl font-black text-orange-800 hover:bg-orange-200"
                  aria-label={`művelet ${t}`}
                >
                  {t}
                </button>
              ) : (
                <span key={i} className="text-3xl font-black text-slate-800 px-1">{t}</span>
              )
            )}
          </div>
          {msg && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg.text}</div>}
          {hist.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-3 text-base font-mono text-slate-700 space-y-1">
              <div className="text-xs font-sans font-bold text-slate-500">A feladat: {show(start)}</div>
              {hist.map((h, i) => (
                <div key={i}>
                  {i + 1}. lépés: {h}
                </div>
              ))}
            </div>
          )}
          <button onClick={newStepper} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Számold ki!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-3xl font-black text-slate-800">
            <span>{show(ex)} =</span>
            <input
              value={val}
              onChange={(e) => {
                setVal(e.target.value.replace(/[^0-9]/g, ''));
                setRes(null);
              }}
              inputMode="numeric"
              className="w-24 rounded-xl border-2 border-purple-300 px-2 py-1 text-center"
              aria-label="eredmény"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-base font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={() => setShowSteps(true)} className="px-4 py-2 rounded-xl bg-purple-100 text-purple-800 text-base font-bold min-h-[48px]">
              Mutasd a lépéseket
            </button>
            <button onClick={newEx} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {res === 'ok' && <div className="rounded-xl p-2 text-center bg-emerald-100 text-emerald-800 text-sm font-bold">Szuper! Jó sorrendben számoltál.</div>}
          {res === 'naive' && (
            <div className="rounded-xl p-2 text-center bg-rose-100 text-rose-800 text-sm font-bold">
              Csak balról jobbra számoltál. De a szorzás és az osztás előbb jön! Próbáld újra!
            </div>
          )}
          {res === 'bad' && <div className="rounded-xl p-2 text-center bg-rose-100 text-rose-800 text-sm font-bold">Még nem jó. Keresd meg a · és a : jelet, és kezdd azzal!</div>}
          {showSteps && (
            <div className="bg-slate-50 rounded-xl p-3 text-base font-mono text-slate-700 space-y-1">
              {steps(ex).map((s, i) => (
                <div key={i}>
                  {i + 1}. lépés: {s.line}
                </div>
              ))}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default OrderOps100G3Theory;
