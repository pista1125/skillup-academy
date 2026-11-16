import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { WholeEqualsSvg, TapeMeasureSvg, TankSvg, RecipeSvg, MorePizzaSvg, HourQuartersSvg, FractionNumberLineSvg, FracLineG, toWholes, compareToOne } from './ImproperFractionsFigures';
import { PizzaG, DENOM_NAMES, fracWord } from '../tortresz-tortek-ertelmezese/FractionIntro4Figures';

const CMP_TEXT: Record<'kisebb' | 'egyenlő' | 'nagyobb', string> = {
  kisebb: 'egynél kisebb',
  egyenlő: 'pontosan 1 egész',
  nagyobb: 'egynél nagyobb'
};

// ---------------------------------------------------------------------------
// Labor I – Pizzaparti: hány pizza kell?
// ---------------------------------------------------------------------------
export const PARTY_DENOMS = [2, 3, 4, 6, 8];
export const PARTY_TASKS: { d: number; k: number }[] = [
  { d: 4, k: 4 },
  { d: 4, k: 5 },
  { d: 2, k: 3 },
  { d: 3, k: 7 },
  { d: 6, k: 6 },
  { d: 8, k: 10 }
];

const PartyLab: React.FC = () => {
  const [d, setD] = useState(4);
  const [k, setK] = useState(0);
  const [ti, setTi] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const task = PARTY_TASKS[ti];
  const max = 3 * d;
  const pizzas = 3;

  const check = () => {
    if (d !== task.d) {
      setMsg(`Hány szeletre kell vágni a pizzákat? A „${DENOM_NAMES[task.d]}” ${task.d} szeletet jelent.`);
      return;
    }
    if (k !== task.k) {
      setMsg(`A vágás jó! Most ${k} szeletet tettél a tálcára, de ${task.k} kell.`);
      return;
    }
    setMsg(`Ügyes vagy! ${fracWord(task.k, task.d)} = ${toWholes(task.k, task.d)}. Ez ${CMP_TEXT[compareToOne(task.k, task.d)]}.`);
    if (!done.includes(ti)) setDone([...done, ti]);
  };

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {PARTY_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setTi(i);
              setMsg(null);
            }}
            className={`px-3 h-11 rounded-xl text-sm font-black border-2 ${
              i === ti ? 'bg-violet-600 text-white border-violet-700' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {fracWord(t.k, t.d)} {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-violet-50 border border-violet-200 p-3 text-center font-bold text-slate-800">
        Feladat: tegyél a tálcára {fracWord(task.k, task.d)} pizzát!
      </div>
      <div className="text-sm font-bold text-slate-600">1. Hány egyenlő szeletre vágod a pizzákat?</div>
      <div className="grid grid-cols-5 gap-2">
        {PARTY_DENOMS.map((n) => (
          <button
            key={n}
            onClick={() => {
              setD(n);
              setK(0);
              setMsg(null);
            }}
            className={`h-12 rounded-xl text-base font-black border-2 ${n === d ? 'bg-violet-600 text-white border-violet-700' : 'bg-white text-slate-800 border-slate-200 hover:bg-violet-50'}`}
          >
            {n}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 360 130" className="w-full max-w-xl h-auto mx-auto">
        {Array.from({ length: pizzas }, (_, p) => (
          <PizzaG key={`${d}-${p}`} cx={62 + p * 118} cy={64} r={52} parts={d} filled={Math.max(0, Math.min(d, k - p * d))} color="#f97316" emptyColor="#f1f5f9" pizza />
        ))}
      </svg>
      <div className="text-sm font-bold text-slate-600">2. Hány szeletet teszel a tálcára?</div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => { setK((x) => Math.max(0, x - 1)); setMsg(null); }} className="w-14 h-14 rounded-xl text-2xl font-black border-2 bg-white border-slate-300 hover:bg-slate-50">
          −
        </button>
        <div className="min-w-[180px] text-center">
          <div className="text-2xl font-black text-violet-700">{k === 0 ? '0 szelet' : fracWord(k, d)}</div>
          <div className="text-sm font-bold text-slate-600">{k === 0 ? '' : `= ${toWholes(k, d)}`}</div>
        </div>
        <button onClick={() => { setK((x) => Math.min(max, x + 1)); setMsg(null); }} className="w-14 h-14 rounded-xl text-2xl font-black border-2 bg-violet-600 text-white border-violet-700 hover:bg-violet-700">
          +
        </button>
      </div>
      {k > 0 && (
        <div className="text-center">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-black ${
              compareToOne(k, d) === 'kisebb' ? 'bg-sky-100 text-sky-800' : compareToOne(k, d) === 'egyenlő' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
            }`}
          >
            {CMP_TEXT[compareToOne(k, d)]}
          </span>
        </div>
      )}
      <button onClick={check} className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black">
        Ellenőrzöm
      </button>
      {msg && <div className={`text-sm font-bold text-center ${msg.startsWith('Ügyes') ? 'text-emerald-700' : 'text-rose-700'}`}>{msg}</div>}
      {done.length === PARTY_TASKS.length && (
        <TheoryCallout type="success" title="Kész a pizzaparti! 🍕">
          Amikor minden szelet egy pizzából a tálcán van, az pontosan 1 egész. Ha ennél több szelet van, a tört egynél nagyobb.
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Törtek a számegyenesen
// ---------------------------------------------------------------------------
export const LINE_TASKS: { d: number; k: number; text: string }[] = [
  { d: 4, k: 3, text: '3 negyed' },
  { d: 4, k: 4, text: '4 negyed (1 egész)' },
  { d: 4, k: 5, text: '5 negyed' },
  { d: 2, k: 3, text: '1 és fél (3 ketted)' },
  { d: 4, k: 7, text: '1 egész és 3 negyed' },
  { d: 5, k: 8, text: '8 ötöd' }
];

const LineLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const task = LINE_TASKS[ti];
  const n = 2 * task.d;
  const X = 30;
  const W = 380;
  const step = W / n;

  const choose = (i: number) => {
    setPick(i);
    if (i === task.k && !done.includes(ti)) setDone([...done, ti]);
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {LINE_TASKS.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setTi(i);
              setPick(null);
            }}
            className={`px-3 h-11 rounded-xl text-sm font-black border-2 ${
              i === ti ? 'bg-emerald-600 text-white border-emerald-700' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {t.text} {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center font-bold text-slate-800">
        Koppints a számegyenesen oda, ahol a(z) <span className="text-emerald-700">{task.text}</span> van! Egy egészet {task.d} egyenlő részre osztottunk.
      </div>
      <svg viewBox="0 0 450 90" className="w-full h-auto select-none">
        <FracLineG x={X} y={45} w={W} wholes={2} d={task.d} marks={pick !== null ? [pick] : []} color={pick === task.k ? '#059669' : '#e11d48'} />
        {Array.from({ length: n + 1 }, (_, i) => (
          <rect key={i} x={X + i * step - step / 2} y={10} width={step} height={60} fill="transparent" onClick={() => choose(i)} style={{ cursor: 'pointer' }} />
        ))}
      </svg>
      {pick !== null && (
        <div className={`text-sm font-bold text-center ${pick === task.k ? 'text-emerald-700' : 'text-rose-700'}`}>
          {pick === task.k
            ? `Helyes! Ez ${fracWord(task.k, task.d)} = ${toWholes(task.k, task.d)}: ${CMP_TEXT[compareToOne(task.k, task.d)]}.`
            : `Ez a pont ${pick === 0 ? 'a 0' : `${fracWord(pick, task.d)} (${toWholes(pick, task.d)})`}. Számold a lépéseket 0-tól: minden kis lépés 1 ${DENOM_NAMES[task.d]}.`}
        </div>
      )}
      {done.length === LINE_TASKS.length && (
        <TheoryCallout type="success" title="Minden pontot megtaláltál! 🎯">
          Az 1-ig tartó részen vannak az egynél kisebb törtek, az 1-nél pont 1 egész van, utána jönnek az egynél nagyobb törtek.
        </TheoryCallout>
      )}
    </div>
  );
};

export const ImproperFractionsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-fractions"
      subtopicId="egynel-nagyobb-tortek"
      title="3. Az 1 egész és az egynél nagyobb törtek"
      subtitle="3 harmad, 4 negyed, 10 tized: mikor kapjuk meg az egészet? És mi van, ha még több részünk van?"
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TANANYAG"
      themeColor="violet"
      pdfFilename="4_osztaly_egynel_nagyobb_tortek_tananyag.pdf"
      practiceTitle="Készen állsz az egészek és a törtek összerakására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ EGÉSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="text-base font-black text-violet-900 dark:text-violet-200">2 ketted = 3 harmad = 4 negyed = 10 tized = 1 egész</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ha MINDEN egyenlő részt veszünk, megkapjuk az egészet.</li>
              <li>Kevesebb rész: egynél kisebb tört (3 negyed).</li>
              <li>Több rész: egynél nagyobb tört (5 negyed = 1 egész és 1 negyed).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 147. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Manó így magyarázta a francia zászlót: „Kék, fehér, piros, minden szín egy-egy harmad, az összesen <strong>három harmad, vagyis egy egész</strong>.”
            </p>
            <p>
              Ha egy egészet egyenlő részekre osztunk, és <strong>minden részt</strong> megtartunk, újra megkapjuk az egészet. Ezért 1 egész = 2 ketted = 3 harmad = 4 negyed = 5 ötöd = 10 tized.
            </p>
            <p>
              És ha még több részünk van? Például 5 szelet negyed pizza? Az már <strong>több, mint 1 egész</strong> – erről is tanulunk.
            </p>
          </div>
          <WholeEqualsSvg />
        </div>
      </TheorySection>

      {/* 2. Az egész sok neve */}
      <TheorySection title="2. Az 1 egész sok neve" badge="Táblázat" badgeColor="indigo">
        <TheoryTable
          headers={['Hány egyenlő részre osztottuk?', 'Egy rész', 'Az egész', 'Példa a könyvből']}
          rows={[
            ['2', 'fél (1 ketted)', '2 ketted', 'a lengyel zászló fele piros, fele fehér'],
            ['3', '1 harmad', '3 harmad', 'a francia zászló 3 csíkja'],
            ['4', '1 negyed', '4 negyed', 'a méter 4 negyede = 100 cm'],
            ['5', '1 ötöd', '5 ötöd', '300 Ft-nak az 5 ötöde = 300 Ft'],
            ['10', '1 tized', '10 tized', 'Janka mind a 10 lövése'],
            ['12', '1 tizenketted', '12 tizenketted', 'a 12 bonbon mindegyike']
          ]}
        />
      </TheorySection>

      {/* 3. Mérőszalag */}
      <TheorySection title="3. Nézzük meg együtt! A mérőszalag" badge="Tankönyv 150. o., 14. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TapeMeasureSvg />
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Hajtsd félbe az 1 méteres mérőszalagot! A hajtásnál 50 cm van: <strong>fél méter = 50 cm</strong>.</li>
            <li>Hajtsd még egyszer félbe! 4 egyenlő részt kapsz: ez a méter <strong>negyede</strong>, 25 cm.</li>
            <li>
              A méter 2 negyede 50 cm, 3 negyede 75 cm, a <strong>4 negyede 100 cm</strong>: ez az egész méter.
            </li>
          </ol>
        </div>
      </TheorySection>

      {/* 4. Mennyi hiányzik az egészhez? */}
      <TheorySection title="4. Mennyi hiányzik az egészhez?" badge="Munkafüzet 71. o., 17–18. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Fanniék dézsája" badge="17. feladat" badgeColor="sky">
            <TankSvg />
            <p className="text-sm text-slate-700 mt-2">
              A dézsa <strong>6 tized</strong> része megtelt. Az egész 10 tized, ezért még <strong>4 tized</strong> részét kell feltölteni: 6 tized + 4 tized = 10 tized.
            </p>
          </TheoryCard>
          <TheoryCard title="Máté sportszelete" badge="18. feladat" badgeColor="amber">
            <RecipeSvg />
            <p className="text-sm text-slate-700 mt-2">
              Összesen 100 dkg van a tálban. A keksz (50 dkg) a <strong>fele</strong>, a margarin és a cukor (25-25 dkg) <strong>1-1 negyede</strong>. Együtt kiadják az egészet.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Egynél nagyobb törtek */}
      <TheorySection title="5. Egynél nagyobb törtek" badge="Tankönyv 151. o., 18. c)" badgeColor="orange">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="5 negyed pizza" badge="Több, mint 1 egész" badgeColor="orange">
            <MorePizzaSvg />
            <p className="text-sm text-slate-700 mt-2">
              4 negyed kiad 1 egész pizzát, és marad még 1 negyed. Ezért <strong>5 negyed = 1 egész és 1 negyed</strong>. Ez egynél nagyobb tört.
            </p>
          </TheoryCard>
          <TheoryCard title="1 és negyed óra" badge="Pogácsasütés" badgeColor="violet">
            <HourQuartersSvg />
            <p className="text-sm text-slate-700 mt-2">
              A pogácsa 1 és negyed óra alatt készült el. 1 óra = 60 perc, 1 negyed óra = 15 perc, összesen <strong>75 perc</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Tört', 'Egészek és részek', 'Hogyan gondolkodom?']}
          rows={[
            ['3 ketted', '1 és fél', '2 ketted = 1 egész, marad 1 ketted'],
            ['5 negyed', '1 egész és 1 negyed', '4 negyed = 1 egész, marad 1 negyed'],
            ['7 harmad', '2 egész és 1 harmad', '3 + 3 = 6 harmad = 2 egész, marad 1'],
            ['8 negyed', '2 egész', '4 + 4 = 8, nem marad semmi']
          ]}
        />
      </TheorySection>

      {/* 6. Számegyenes */}
      <TheorySection title="6. Törtek a számegyenesen" badge="Számegyenes" badgeColor="emerald">
        <FractionNumberLineSvg />
        <p className="text-sm text-slate-700">
          A 0 és az 1 közötti szakaszt 4 egyenlő részre osztottuk. Minden kis lépés 1 negyed. A 4. lépésnél van az 1 egész, utána jön az 5 negyed, a 6 negyed (1 és fél), a 7 negyed, végül a 8 negyed = 2 egész.
        </p>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz! A negyed szótól nem lesz kicsi a tört" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az 5 negyed nem kisebb 1-nél"
          wrong="Az 5 negyed kisebb 1-nél, hiszen negyedekről van szó."
          wrongExplanation="Egy negyed valóban kicsi, de itt 5 darab van belőle. 4 negyed már kiadja az egészet."
          correct="5 negyed = 4 negyed + 1 negyed = 1 egész és 1 negyed, ez több 1-nél."
          correctExplanation="Hasonlítsd össze a két számot: ha több részt veszünk, mint ahány egyenlő részre az egészet osztottuk, a tört egynél nagyobb."
          tip="5 több, mint 4? Akkor több, mint 1 egész!"
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Pizzaparti" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">Válassz feladatot! Vágd fel a pizzákat, és a + gombbal tegyél szeleteket a tálcára. Figyeld, mikor lesz belőle 1 egész!</p>
        <PartyLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Törtek a számegyenesen" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600">Keresd meg a törteket a 0-tól 2-ig tartó számegyenesen!</p>
        <LineLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ImproperFractionsTheory;
