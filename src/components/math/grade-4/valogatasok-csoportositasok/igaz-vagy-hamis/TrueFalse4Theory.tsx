import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { AnimalsGlobeSvg, ThreeSetsSvg, MfSetSvg, QuantifierBoxesSvg, CounterexampleSvg, TK_SETS } from './TrueFalse4Figures';

// ---------------------------------------------------------------------------
// Állítások számhalmazokról (a laborok és a tesztek is használják)
// ---------------------------------------------------------------------------
export interface NumStatement {
  t: string;
  f: (a: number[]) => boolean;
}

const even = (n: number) => n % 2 === 0;

/** A TK 132/3. a) feladat hét állítása, szó szerint. */
export const TK_STATEMENTS: NumStatement[] = [
  { t: 'Mindegyik eleme páros szám.', f: (a) => a.every(even) },
  { t: 'Van olyan eleme, amelyik nem páros.', f: (a) => a.some((n) => !even(n)) },
  { t: 'Egyik eleme sem páratlan.', f: (a) => a.every(even) },
  { t: 'Nincs olyan eleme, amelyik nem páros.', f: (a) => !a.some((n) => !even(n)) },
  { t: 'Nincs olyan eleme, amelyik páratlan.', f: (a) => !a.some((n) => !even(n)) },
  { t: 'Egyik eleme sem páros.', f: (a) => !a.some(even) },
  { t: 'Van olyan eleme, amelyik nem páratlan.', f: (a) => a.some(even) }
];

/** Melyik halmazokra igaz az állítás? */
export const setsWhereTrue = (s: NumStatement) => (Object.keys(TK_SETS) as ('A' | 'B' | 'C')[]).filter((k) => s.f(TK_SETS[k]));

// ---------------------------------------------------------------------------
// Labor I – Igaz vagy hamis? (TK 132/3.)
// ---------------------------------------------------------------------------
export const JudgeLab: React.FC = () => {
  const [set, setSet] = useState<'A' | 'B' | 'C'>('A');
  const [ans, setAns] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);
  const nums = TK_SETS[set];

  const pickSet = (k: 'A' | 'B' | 'C') => {
    setSet(k);
    setAns({});
    setChecked(false);
  };
  const allAnswered = TK_STATEMENTS.every((_, i) => ans[i] !== undefined);
  const good = TK_STATEMENTS.filter((s, i) => ans[i] === s.f(nums)).length;

  return (
    <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-bold text-slate-600">Halmaz:</span>
        {(['A', 'B', 'C'] as const).map((k) => (
          <button
            key={k}
            onClick={() => pickSet(k)}
            className={`w-12 h-12 rounded-xl text-lg font-black ${set === k ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {k}
          </button>
        ))}
        <div className="flex flex-wrap gap-1.5 ml-2">
          {nums.map((n) => (
            <span key={n} className={`px-2 py-1 rounded-lg font-mono font-bold text-sm border ${checked ? (even(n) ? 'bg-sky-50 border-sky-300' : 'bg-amber-50 border-amber-300') : 'bg-slate-50 border-slate-200'}`}>
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {TK_STATEMENTS.map((s, i) => {
          const truth = s.f(nums);
          const mine = ans[i];
          return (
            <div
              key={s.t}
              className={`flex flex-wrap items-center gap-2 rounded-xl border p-2 ${
                checked && mine !== undefined ? (mine === truth ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50') : 'border-slate-200'
              }`}
            >
              <span className="flex-1 min-w-[200px] text-sm font-semibold text-slate-800">• {s.t}</span>
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => {
                    setAns((a) => ({ ...a, [i]: v }));
                    setChecked(false);
                  }}
                  aria-label={`${i + 1}. állítás ${v ? 'igaz' : 'hamis'}`}
                  className={`w-12 h-11 rounded-xl font-black ${mine === v ? (v ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-slate-100 text-slate-700'}`}
                >
                  {v ? 'I' : 'H'}
                </button>
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 items-center">
        <button disabled={!allAnswered} onClick={() => setChecked(true)} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold disabled:opacity-40">
          Ellenőrzés
        </button>
        {!allAnswered && <span className="text-xs text-slate-500">Minden állításnál válaszd ki: I (igaz) vagy H (hamis).</span>}
      </div>
      {checked && (
        <div className={`text-sm font-bold ${good === TK_STATEMENTS.length ? 'text-emerald-700' : 'text-rose-700'}`}>
          {good === TK_STATEMENTS.length
            ? `Hibátlan! A(z) ${set} halmazról mind a 7 állítást jól döntötted el. 🎉 Próbáld ki a másik halmazzal is!`
            : `${good} jó válasz a 7-ből. Kék keret = páros, sárga = páratlan szám. Keress ellenpéldát a pirossal jelölt állításokhoz!`}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Tedd igazzá!
// ---------------------------------------------------------------------------
export interface MakeTrueChallenge {
  pool: number[];
  goals: NumStatement[];
}

export const MAKE_TRUE: MakeTrueChallenge[] = [
  {
    pool: [12, 35, 400, 1001, 2468, 5000, 7777, 9],
    goals: [
      { t: 'Mindegyik eleme páros.', f: (a) => a.length > 0 && a.every(even) },
      { t: 'Van olyan eleme, amelyik négyjegyű.', f: (a) => a.some((n) => n >= 1000 && n <= 9999) },
      { t: 'Nincs olyan eleme, amelyik nagyobb 3000-nél.', f: (a) => !a.some((n) => n > 3000) }
    ]
  },
  {
    pool: [15, 48, 105, 250, 333, 1010, 4005, 8000],
    goals: [
      { t: 'Egyik eleme sem páros.', f: (a) => a.length > 0 && !a.some(even) },
      { t: 'Van olyan eleme, amelyik háromjegyű.', f: (a) => a.some((n) => n >= 100 && n <= 999) },
      { t: 'Nem mindegyik eleme az 5 többszöröse.', f: (a) => a.some((n) => n % 5 !== 0) }
    ]
  },
  {
    pool: [20, 45, 600, 777, 1500, 2350, 6606, 9999],
    goals: [
      { t: 'Mindegyik eleme a 10 többszöröse.', f: (a) => a.length > 0 && a.every((n) => n % 10 === 0) },
      { t: 'Van olyan eleme, amelyik kétjegyű.', f: (a) => a.some((n) => n >= 10 && n <= 99) },
      { t: 'Van olyan eleme, amelyik nem a 100 többszöröse.', f: (a) => a.some((n) => n % 100 !== 0) }
    ]
  }
];

export const MakeTrueLab: React.FC = () => {
  const [ci, setCi] = useState(0);
  const [inSet, setInSet] = useState<number[]>([]);
  const ch = MAKE_TRUE[ci];
  const results = ch.goals.map((g) => g.f(inSet));
  const allTrue = inSet.length > 0 && results.every(Boolean);

  const toggle = (n: number) => setInSet((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {MAKE_TRUE.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCi(i);
              setInSet([]);
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${i === ci ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}. feladat
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-700">Kattints a számokra: tedd be őket a halmazba, vagy vedd ki! Úgy válogass, hogy mindhárom állítás igaz legyen.</p>
      <div className="flex flex-wrap gap-2">
        {ch.pool.map((n) => (
          <button
            key={n}
            onClick={() => toggle(n)}
            className={`min-w-[64px] px-3 py-3 rounded-xl border-2 font-mono font-black ${
              inSet.includes(n) ? 'border-emerald-600 bg-emerald-100 text-emerald-900' : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-3 min-h-[56px] flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-emerald-800">A halmaz:</span>
        {inSet.length === 0 ? <span className="text-xs text-slate-400">(még üres)</span> : inSet.map((n) => <span key={n} className="px-2 py-1 rounded-lg bg-white border border-emerald-300 font-mono font-bold">{n}</span>)}
      </div>
      <div className="space-y-2">
        {ch.goals.map((g, i) => (
          <div key={g.t} className={`flex items-center gap-3 rounded-xl p-2 border ${results[i] ? 'border-emerald-300 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white ${results[i] ? 'bg-emerald-500' : 'bg-rose-400'}`}>{results[i] ? 'I' : 'H'}</span>
            <span className="text-sm font-semibold text-slate-800">{g.t}</span>
          </div>
        ))}
      </div>
      {allTrue && (
        <TheoryCallout type="success" title="Mindhárom állítás igaz! 🎉">
          Ügyes válogatás! Próbáld meg úgy is, hogy egy számot kiveszel vagy beteszel – melyik állítás lesz hamis?
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tananyag
// ---------------------------------------------------------------------------
export const TrueFalse4Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    grade={4}
    chapterId="valogatasok-csoportositasok"
    topicId="g4-grouping"
    subtopicId="igaz-vagy-hamis"
    title="4. Igaz vagy hamis?"
    subtitle="Állítások az állatokról, számokról és logikai lapokról: mindegyik, van olyan, egyik sem, nincs olyan, nem mindegyik."
    badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
    themeColor="rose"
    pdfFilename="4_osztaly_igaz_vagy_hamis_tananyag.pdf"
    practiceTitle="Készen állsz az állítások eldöntésére?"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS SZABÁLY — A KIS SZAVAK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
            <span className="text-base font-black text-rose-900 dark:text-rose-200">Egy ellenpélda elég, hogy a „mindegyik” hamis legyen!</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>
              <strong>Mindegyik …</strong>: igaz, ha egyetlen kivétel sincs.
            </li>
            <li>
              <strong>Van olyan …</strong>: igaz, ha legalább egy ilyen van.
            </li>
            <li>
              <strong>Egyik sem … – Nincs olyan …</strong>: igaz, ha egy sincs. <strong>Nem mindegyik …</strong> = van olyan, amelyik nem.
            </li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk? Állítások a képről" badge="TK 132. o. 1. b)" badgeColor="rose">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <AnimalsGlobeSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A tankönyv 131. oldalán lévő kép állatairól szólnak az állítások. Döntsük el, igazak vagy hamisak!</p>
          <TheoryTable
            headers={['Állítás', 'I – H', 'Miért?']}
            rows={[
              ['Van közöttük emlősállat.', 'I', 'pl. a tigris'],
              ['Nincs közöttük háziállat.', 'I', 'mind vadon él'],
              ['Nem mindegyik madár.', 'I', 'a farkas nem madár'],
              ['Egyik sem hal.', 'I', 'nincs hal a képen'],
              ['Nincs olyan madár, amelyik ragadozó.', 'H', 'a sas ragadozó'],
              ['Nem mindegyik madár tud repülni.', 'I', 'a pingvin nem tud'],
              ['Az emlősök között van ragadozó.', 'I', 'pl. a farkas'],
              ['Mindegyik vadon élő állat.', 'I', 'nincs háziállat']
            ]}
          />
        </div>
      </div>
    </TheorySection>

    <TheorySection title="2. A kis szavak jelentése" badge="Szabály" badgeColor="indigo">
      <QuantifierBoxesSvg className="w-full max-w-[520px] h-auto mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <TheoryCard title="Mindegyik … – Minden …" badge="mind" badgeColor="emerald">
          <p className="text-sm text-slate-700">Az összesre igaznak kell lennie. Ha csak egy is kilóg, az állítás hamis. Ez a kilógó elem az <strong>ellenpélda</strong>.</p>
        </TheoryCard>
        <TheoryCard title="Van olyan … – Van közöttük …" badge="legalább 1" badgeColor="blue">
          <p className="text-sm text-slate-700">Elég, ha egy is van. Ha többet is találsz, az sem baj – az állítás akkor is igaz.</p>
        </TheoryCard>
        <TheoryCard title="Egyik sem … – Nincs olyan …" badge="0 db" badgeColor="purple">
          <p className="text-sm text-slate-700">Egy sincs ilyen. Ha akár egyet is találsz, az állítás hamis.</p>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Ugyanazt jelentik (TK 132. o. 3. a))">
        „Mindegyik eleme páros szám.” = „Nincs olyan eleme, amelyik páratlan.” = „Egyik eleme sem páratlan.” = „Nincs olyan eleme, amelyik nem páros.”
        <br />
        „Nem mindegyik eleme páros.” = „Van olyan eleme, amelyik nem páros.”
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. Nézzük meg együtt! Melyik állítás melyik halmazra igaz?" badge="TK 132. o. 3. a)" badgeColor="amber">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <ThreeSetsSvg />
          <p className="text-sm text-slate-700">
            Először nézzük meg a számok végét! <strong>A</strong>: mind páros. <strong>B</strong>: páros is, páratlan is van benne. <strong>C</strong>: mind páratlan.
          </p>
        </div>
        <TheoryTable
          headers={['Állítás', 'Igaz erre']}
          rows={TK_STATEMENTS.map((s) => [s.t, setsWhereTrue(s).join(', ')])}
        />
      </div>
    </TheorySection>

    <TheorySection title="4. Számokról szóló állítások" badge="MF II. 51. o. 10." badgeColor="teal">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 items-start">
        <MfSetSvg />
        <TheoryTable
          headers={['Állítás', 'I – H', 'Miért?']}
          rows={[
            ['A halmazban minden szám páratlan.', 'H', 'a 4016 páros (ellenpélda)'],
            ['Nem minden szám kisebb, mint a 10 000.', 'H', 'mindegyik négyjegyű, tehát kisebb'],
            ['Van olyan szám, amelyben a számjegyek összege 26.', 'I', '5 + 9 + 3 + 9 = 26'],
            ['Nincs olyan szám, amelyben három egyforma számjegy van.', 'H', '7000, 8808'],
            ['Több olyan szám van, amelyben benne van a legkisebb alaki értékű számjegy.', 'I', '0 van ezekben: 3063, 4016, 7000, 8808, 9705'],
            ['Két olyan szám van, amely ezresekre kerekített értéke a kisebb ezres számszomszédja.', 'I', '3063 → 3000, 4016 → 4000']
          ]}
        />
      </div>
    </TheorySection>

    <TheorySection title="5. Vigyázz! „Nem mindegyik” ≠ „egyik sem”" badge="Csapda" badgeColor="rose">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <TheoryTrapBox
          title="A „mindegyik” tagadása"
          wrong="„Nem mindegyik madár tud repülni.” = „Egyik madár sem tud repülni.”"
          wrongExplanation="Ez nem igaz! A sas, a bagoly, a gém tud repülni. A „nem mindegyik” csak annyit mond, hogy van kivétel."
          correct="„Nem mindegyik madár tud repülni.” = „Van olyan madár, amelyik nem tud repülni.” (a pingvin)"
          correctExplanation="Egyetlen kivétel elég ahhoz, hogy a „mindegyik” hamis, a „nem mindegyik” pedig igaz legyen."
          tip="Kérdezd meg: hány ilyen van? Mind? Legalább egy? Egy sem?"
        />
        <CounterexampleSvg />
      </div>
    </TheorySection>

    <TheorySection title="6. Interaktív Laboratórium I: Döntsd el!" badge="TK 132. o. 3. a)" badgeColor="rose">
      <JudgeLab />
    </TheorySection>

    <TheorySection title="7. Interaktív Laboratórium II: Tedd igazzá!" badge="Labor" badgeColor="emerald">
      <MakeTrueLab />
    </TheorySection>
  </TheoryTemplate>
);

export default TrueFalse4Theory;
