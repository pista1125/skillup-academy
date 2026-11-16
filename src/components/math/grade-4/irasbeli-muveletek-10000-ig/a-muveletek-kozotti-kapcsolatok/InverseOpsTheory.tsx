import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { InversePairsSvg, CombineArrowsSvg, ThinkNumberSvg, FlowchartSvg, HalfOfSumSvg } from './InverseOpsFigures';

// ---------------------------------------------------------------------------
// Segédek
// ---------------------------------------------------------------------------
export type Op = { s: '+' | '−' | '·' | ':'; n: number };

export const applyStep = (v: number, o: Op): number =>
  o.s === '+' ? v + o.n : o.s === '−' ? v - o.n : o.s === '·' ? v * o.n : v / o.n;

export const inverseOf = (o: Op): Op => ({
  s: o.s === '+' ? '−' : o.s === '−' ? '+' : o.s === '·' ? ':' : '·',
  n: o.n
});

export const opStr = (o: Op) => `${o.s} ${o.n}`;

/** Visszafelé számol: az utolsó lépéstől az elsőig az ellentett műveletekkel. */
export const solveBackwards = (ops: Op[], result: number): number =>
  [...ops].reverse().reduce((v, o) => applyStep(v, inverseOf(o)), result);

/** A munkafüzet folyamatábrája: adj hozzá 1348-at, amíg az összeg kisebb 5000-nél, aztán felezz. */
export const runFlowchart = (start: number): number[] => {
  const out = [start];
  let n = start;
  do {
    n += 1348;
    out.push(n);
  } while (n < 5000);
  out.push(n / 2);
  return out;
};

// ---------------------------------------------------------------------------
// Labor I – Visszafelé gép
// ---------------------------------------------------------------------------
export const BACK_TASKS: { ops: Op[]; result: number; text: string }[] = [
  { ops: [{ s: '+', n: 1345 }], result: 4135, text: 'Ha hozzáadom az 1345-öt, 4135-öt kapok.' },
  { ops: [{ s: '·', n: 2 }], result: 3600, text: 'Ha megszorzom kettővel, 3600-at kapok.' },
  { ops: [{ s: '+', n: 2400 }, { s: '·', n: 2 }], result: 7200, text: 'Hozzáadtam 2400-at, az összeget megszoroztam kettővel: 7200 lett.' },
  { ops: [{ s: ':', n: 4 }, { s: ':', n: 2 }], result: 1031, text: 'Elosztottam 4-gyel, aztán 2-vel: 1031 lett.' },
  { ops: [{ s: '−', n: 1425 }, { s: '−', n: 1275 }], result: 1558, text: 'Elvettem belőle 1425-öt, aztán 1275-öt: 1558 maradt.' },
  { ops: [{ s: '·', n: 2 }, { s: '·', n: 3 }], result: 6396, text: 'Megszoroztam 2-vel, aztán 3-mal: 6396 lett.' }
];

const BackwardsLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const task = BACK_TASKS[ti];
  const rev = [...task.ops].reverse();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<number[]>([task.result]);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const done = step >= rev.length;

  const load = (i: number) => {
    setTi(i);
    setStep(0);
    setValues([BACK_TASKS[i].result]);
    setMsg(null);
  };

  const current = rev[Math.min(step, rev.length - 1)];
  const correct = inverseOf(current);
  const sameOp = current;
  const otherKind: Op = { s: current.s === '+' || current.s === '−' ? (current.s === '+' ? ':' : '·') : current.s === '·' ? '−' : '+', n: current.n };
  const choices = [correct, sameOp, otherKind].sort((a, b) => (a.s < b.s ? -1 : 1));

  const pick = (o: Op) => {
    if (done) return;
    if (o.s === correct.s) {
      const nv = applyStep(values[values.length - 1], o);
      setValues([...values, nv]);
      setStep(step + 1);
      setMsg({ ok: true, t: `Jó! A(z) „${opStr(current)}” lépést a(z) „${opStr(o)}” csinálja vissza.` });
    } else if (o.s === sameOp.s) {
      setMsg({ ok: false, t: 'Ez ugyanaz a művelet, nem a visszafelé lépés! Az ellentett műveletet keresd.' });
    } else {
      setMsg({ ok: false, t: 'Nem jó párt választottál. Az összeadást a kivonás, a szorzást az osztás csinálja vissza – és fordítva.' });
    }
  };

  const start = values[values.length - 1];
  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {BACK_TASKS.map((_, i) => (
          <button
            key={i}
            onClick={() => load(i)}
            className={`w-10 h-10 rounded-xl text-sm font-black ${i === ti ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-3">
        <div className="text-sm font-bold text-slate-600">Melyik számra gondoltam?</div>
        <div className="text-lg font-black text-slate-800">{task.text}</div>
      </div>
      {/* előre lánc */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-lg font-black">
        <span className="px-3 py-1 rounded-full bg-orange-100 border-2 border-orange-300 text-orange-700">{done ? start : '?'}</span>
        {task.ops.map((o, i) => (
          <React.Fragment key={i}>
            <span className="text-emerald-700 text-base">→ {opStr(o)} →</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border-2 border-slate-300">
              {i === task.ops.length - 1 ? task.result : done || values.length > task.ops.length - 1 - i ? values[task.ops.length - 1 - i] : '?'}
            </span>
          </React.Fragment>
        ))}
      </div>
      {!done ? (
        <>
          <p className="text-sm text-slate-700">
            Most {start}-ból indulsz visszafelé. Melyik művelet csinálja vissza a(z) <strong>„{opStr(current)}”</strong> lépést?
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {choices.map((o) => (
              <button
                key={o.s}
                onClick={() => pick(o)}
                className="min-w-[96px] h-14 rounded-xl text-xl font-black bg-white border-2 border-emerald-300 text-emerald-800 hover:bg-emerald-50"
              >
                {opStr(o)}
              </button>
            ))}
          </div>
        </>
      ) : (
        <TheoryCallout type="success" title={`A gondolt szám: ${start} 🎉`}>
          Ellenőrzés előre: {start}
          {task.ops.map((o) => ` ${opStr(o)}`).join('')} = {task.result}. Válassz másik feladványt!
        </TheoryCallout>
      )}
      {msg && !done && <div className={`text-sm font-bold text-center ${msg.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{msg.t}</div>}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-700">
        Visszafelé: {values.join(' → ')}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Folyamatábra-futtató
// ---------------------------------------------------------------------------
const FLOW_STARTS = [1348, 2696, 4044, 1000, 3000];

const FlowLab: React.FC = () => {
  const [start, setStart] = useState(1348);
  const seq = runFlowchart(start);
  const [shown, setShown] = useState(1);
  const finished = shown >= seq.length;
  const [results, setResults] = useState<Record<number, number>>({});

  const next = () => {
    if (finished) return;
    const ns = shown + 1;
    setShown(ns);
    if (ns >= seq.length) setResults({ ...results, [start]: seq[seq.length - 1] });
  };

  // aktív doboz a folyamatábrán
  const active = shown === 1 ? 0 : finished ? 4 : shown === seq.length - 1 ? 3 : 1;

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-bold text-slate-600">Kiinduló szám:</span>
        {FLOW_STARTS.map((s) => (
          <button
            key={s}
            onClick={() => {
              setStart(s);
              setShown(1);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black ${s === start ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <FlowchartSvg active={active} className="w-full h-auto max-w-[280px] mx-auto" />
        <div className="space-y-3">
          <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-3 font-mono text-base text-slate-800 space-y-1 min-h-[140px]">
            {seq.slice(0, shown).map((v, i) => (
              <div key={i}>
                {i === 0
                  ? `START: ${v}`
                  : i === seq.length - 1
                  ? `${seq[i - 1]} : 2 = ${v}  → CÉL`
                  : `${seq[i - 1]} + 1348 = ${v}  ${v < 5000 ? '(kisebb 5000-nél: igen)' : '(kisebb 5000-nél: nem)'}`}
              </div>
            ))}
          </div>
          <button
            onClick={next}
            disabled={finished}
            className={`w-full h-14 rounded-xl text-lg font-black ${finished ? 'bg-slate-200 text-slate-400' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}
          >
            {finished ? 'Megérkeztél a CÉL-hoz!' : 'Következő lépés'}
          </button>
          <div className="text-sm text-slate-700">
            <strong>Eredmények:</strong>{' '}
            {Object.keys(results).length ? Object.entries(results).map(([s, r]) => `${s} → ${r}`).join(';  ') : 'még nincs'}
          </div>
          {[1348, 2696, 4044].every((s) => results[s] !== undefined) && (
            <TheoryCallout type="success" title="Mit tapasztaltál?">
              Az 1348, a 2696 és a 4044 mind az 1348 többszörösei, ezért mindhárom 5392-höz jut el (4 · 1348), és ennek fele mindig 2696.
            </TheoryCallout>
          )}
        </div>
      </div>
    </div>
  );
};

export const InverseOpsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-written-ops"
      subtopicId="a-muveletek-kozotti-kapcsolatok"
      title="6. A műveletek közötti kapcsolatok"
      subtitle="Összeadás és kivonás, szorzás és osztás: összevonás, visszafelé számolás, ellenőrzés."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_a_muveletek_kozotti_kapcsolatok_tananyag.pdf"
      practiceTitle="Készen állsz a műveletek kapcsolatainak gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A MŰVELETEK PÁRJAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">+ ⇄ − &nbsp;&nbsp;&nbsp; · ⇄ :</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A kivonás visszacsinálja az összeadást, az osztás a szorzást (és fordítva).</li>
              <li>+ 2425, majd + 3575 egy lépésben: + 6000. &nbsp; : 4, majd : 2 egy lépésben: : 8.</li>
              <li>Visszafelé számolunk az ellentett műveletekkel: □ + 1345 = 4135 → □ = 4135 − 1345.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 105. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A négy alapművelet párokat alkot:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Az <strong>összeadás</strong> és a <strong>kivonás</strong>: ha a 2790-hez hozzáadok 1345-öt, 4135-öt kapok. Ha a 4135-ből elveszem az 1345-öt, visszakapom a 2790-et.
              </li>
              <li>
                A <strong>szorzás</strong> és az <strong>osztás</strong>: 1800 · 2 = 3600, és 3600 : 2 = 1800.
              </li>
            </ul>
            <TheoryCallout type="info" title="Mire jó ez?">
              Ezzel <strong>ellenőrizzük</strong> a számolást (a kivonást összeadással, az osztást szorzással), és ezzel találjuk ki a „gondolt számot” is.
            </TheoryCallout>
          </div>
          <InversePairsSvg />
        </div>
      </TheorySection>

      {/* 2. Összevonás */}
      <TheorySection title="2. Nézzük meg együtt! Két nyíl helyett egy" badge="Tankönyv 105. o., 1. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CombineArrowsSvg />
          <TheoryTable
            headers={['Lépések', 'Egy lépésben', 'Eredmény']}
            rows={[
              ['1258 + 2425 = 3683 (A), 3683 + 3575 = 7258 (B)', '+ 6000', '1258 + 6000 = 7258'],
              ['2682 + 1564 = 4246 (C), 4246 + 2536 = 6782 (D)', '+ 4100', '2682 + 4100 = 6782'],
              ['4258 − 1425 = 2833 (E), 2833 − 1275 = 1558 (F)', '− 2700', '4258 − 2700 = 1558'],
              ['8248 : 4 = 2062 (J), 2062 : 2 = 1031 (K)', ': 8', '8248 : 8 = 1031'],
              ['6828 : 3 = 2276 (L), 2276 : 2 = 1138 (M)', ': 6', '6828 : 6 = 1138'],
              ['1066 · 2 = 2132 (P), 2132 · 3 = 6396 (Q)', '· 6', '1066 · 6 = 6396']
            ]}
          />
        </div>
        <TheoryCallout type="tip" title="Figyeld meg!">
          Két összeadás helyett hozzáadhatjuk a két szám <strong>összegét</strong>. Két kivonás helyett elvehetjük a két szám összegét. Két szorzás helyett szorozhatunk a két szám <strong>szorzatával</strong>, két osztás helyett oszthatunk a szorzatukkal (: 4 és : 2 → : 8).
        </TheoryCallout>
      </TheorySection>

      {/* 3. Gondoltam egy számra */}
      <TheorySection title="3. Melyik számra gondoltam? Számolj visszafelé!" badge="Tankönyv 105. o., 2–3. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ThinkNumberSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCard title="A) és B) feladvány" badge="2. feladat" badgeColor="orange">
              <p>
                A) Ha hozzáadom az 1345-öt, 4135 lesz: 4135 − 1345 = <strong>2790</strong>. Ellenőrzés: 1445 + 1345 = 2790 is igaz. A 1445-től a 4135-ig + 2690 vezet (kétszer 1345).
              </p>
              <p className="mt-2">
                B) Ha megszorzom kettővel, 3600 lesz: 3600 : 2 = <strong>1800</strong>. És 900 · 2 = 1800 is igaz.
              </p>
            </TheoryCard>
            <TheoryCard title="Két lépés visszafelé" badge="3. feladat" badgeColor="sky">
              <p>
                a) □ + 2400, aztán · 2 → 7200. Visszafelé: 7200 : 2 = 3600, 3600 − 2400 = <strong>1200</strong>.
              </p>
              <p className="mt-1">
                b) □ + 2400 kétszerese (4800) → 7200. Visszafelé: 7200 − 4800 = <strong>2400</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. Hiányzó számok, összeg fele */}
      <TheorySection title="4. A hiányzó szám és az összeg fele" badge="Tankönyv 105. o., 4. feladat · Munkafüzet 19–20. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HalfOfSumSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              (4646 + 3788) : 2 = 8434 : 2 = <strong>4217</strong>, és 4646 : 2 + 3788 : 2 = 2323 + 1894 = <strong>4217</strong>. Ugyanannyi!
            </p>
            <p>Hasonlóan: 5436 : 3 − 3042 : 3 = 1812 − 1014 = 798, és (5436 − 3042) : 3 = 2394 : 3 = 798.</p>
            <TheoryTable
              headers={['Mit keresünk?', 'Hogyan?', 'Eredmény']}
              rows={[
                ['osztandó (osztó 7, hányados 528, maradék 2)', '528 · 7 + 2', '3698'],
                ['kisebbítendő (különbség 3645, kivonandó 3587)', '3645 + 3587', '7232'],
                ['3. tag (789 + 4789 + □ = 9564)', '9564 − 789 − 4789', '3986'],
                ['szorzandó (□ · 7 = 2492)', '2492 : 7', '356']
              ]}
            />
            <p>
              A repülő óránként 963 km-t, a gyorsvonat 119 km-t tesz meg. 7 óra alatt a különbség: 7 · 963 − 7 · 119 = 6741 − 833 = 5908 km, vagy rövidebben 7 · (963 − 119) = 7 · 844 = <strong>5908 km</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! Visszafelé fordított sorrendben" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Visszafelé is az elejéről kezdte"
          wrong="(□ + 2400) · 2 = 7200 → 7200 − 2400 = 4800, 4800 : 2 = 2400"
          wrongExplanation="Visszafelé a legutolsó lépést kell először visszacsinálni. Itt az utolsó lépés a szorzás volt, nem az összeadás."
          correct="7200 : 2 = 3600, 3600 − 2400 = 1200"
          correctExplanation="Ellenőrzés: 1200 + 2400 = 3600, 3600 · 2 = 7200. Igaz!"
          tip="Visszafelé úgy haladj, mintha a videót visszafelé játszanád le: az utolsó lépés jön először, és mindig az ellentett művelettel."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Visszafelé gép" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600">Válassz egy feladványt! Lépésenként válaszd ki az ellentett műveletet, és a gép visszavezet a gondolt számhoz.</p>
        <BackwardsLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Folyamatábra-futtató" badge="Labor · Munkafüzet 19. o." badgeColor="amber">
        <p className="text-sm text-slate-600">Válassz kiinduló számot, és lépkedj végig a folyamatábrán! Melyik számot kapod a végén?</p>
        <FlowLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default InverseOpsTheory;
