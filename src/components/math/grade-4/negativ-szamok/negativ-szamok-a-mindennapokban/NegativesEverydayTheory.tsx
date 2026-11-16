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
  ThermometerSvg,
  SeaLevelSvg,
  TownTempsSvg,
  DayGraphSvg,
  FloorsSvg,
  WeatherWordsSvg,
  ThermoGroup,
  fmtNum,
  fmtTemp
} from './NegativesEverydayFigures';

/** Fagypont alatt / fagypont / fagypont felett. */
export const tempWord = (v: number): string =>
  v < 0 ? `${Math.abs(v)} fokkal fagypont alatt` : v === 0 ? 'pont fagypont' : `${v} fokkal fagypont felett`;

// ---------------------------------------------------------------------------
// Labor I – Játék hőmérő
// ---------------------------------------------------------------------------
const TARGETS = [-21, -30, -5, -3, 0, 18];

const ThermoLab: React.FC = () => {
  const [v, setV] = useState(0);
  const [ti, setTi] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const target = TARGETS[ti];
  const hit = v === target;
  const change = (d: number) => setV((x) => Math.max(-30, Math.min(30, x + d)));

  const check = () => {
    if (hit && !done.includes(ti)) setDone([...done, ti]);
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {TARGETS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTi(i)}
            className={`px-3 h-11 rounded-xl text-sm font-black border-2 ${
              i === ti ? 'bg-sky-600 text-white border-sky-700' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {fmtTemp(t)} {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 120 250" className="w-full max-w-[160px] h-auto mx-auto">
          <ThermoGroup x={60} y={24} h={180} min={-30} max={30} value={v} color={v < 0 ? '#3b82f6' : '#ef4444'} />
        </svg>
        <div className="space-y-3">
          <div className="text-sm font-bold text-slate-600">
            Állítsd be a hőmérőn: <span className="text-sky-700 text-lg">{fmtTemp(target)}</span>
          </div>
          <div className="text-4xl font-black text-center text-slate-800">{fmtTemp(v)}</div>
          <div className={`text-center text-sm font-bold ${v < 0 ? 'text-blue-700' : v > 0 ? 'text-red-600' : 'text-slate-700'}`}>{tempWord(v)}</div>
          <div className="grid grid-cols-4 gap-2">
            {[-5, -1, 1, 5].map((d) => (
              <button
                key={d}
                onClick={() => change(d)}
                className={`h-12 rounded-xl text-lg font-black border-2 ${d < 0 ? 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100' : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'}`}
              >
                {d < 0 ? `▼ ${Math.abs(d)}` : `▲ ${d}`}
              </button>
            ))}
          </div>
          <button onClick={check} className="w-full h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black">
            Ellenőrzöm
          </button>
          {done.includes(ti) ? (
            <div className="text-sm font-bold text-emerald-700 text-center">Ügyes vagy! A hőmérő {fmtTemp(target)}-ot mutat. Válassz egy másik kártyát!</div>
          ) : (
            !hit && (
              <div className="text-xs text-slate-500 text-center">
                Tipp: {v > target ? 'hidegebbet kell beállítanod, lépj lefelé ▼' : 'melegebbet kell beállítanod, lépj felfelé ▲'}
              </div>
            )
          )}
          {done.length === TARGETS.length && (
            <TheoryCallout type="success" title="Minden kártya kész! 🎉">
              Csökkenő sorrendben: 18 °C, 0 °C, −3 °C, −5 °C, −21 °C, −30 °C. A legmagasabb 18 °C, a legalacsonyabb −30 °C.
            </TheoryCallout>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Írd le számmal!
// ---------------------------------------------------------------------------
export const SIGN_TASKS: { text: string; emoji: string; options: string[]; answer: string; why: string }[] = [
  { text: 'A hőmérő 6 fokkal fagypont alatt áll.', emoji: '🌡️', options: ['−6 °C', '6 °C', '0 °C', '−60 °C'], answer: '−6 °C', why: 'Fagypont alatt: mínusz előjel.' },
  { text: 'A mélygarázs második szintjén parkolunk.', emoji: '🚗', options: ['−2', '2', '0', '−1'], answer: '−2', why: 'A földszint 0, alatta −1, −2.' },
  { text: 'A hegy csúcsa 400 méterrel a tengerszint felett van.', emoji: '⛰️', options: ['400 m', '−400 m', '0 m', '40 m'], answer: '400 m', why: 'A tengerszint felett pozitív számmal mérünk.' },
  { text: 'A hal 50 méterrel a tengerszint alatt úszik.', emoji: '🐟', options: ['−50 m', '50 m', '−5 m', '0 m'], answer: '−50 m', why: 'A tengerszint alatt mínusz előjel.' },
  { text: 'Kriszti 200 Ft-tal tartozik a büfésnek.', emoji: '🥪', options: ['−200 Ft', '200 Ft', '0 Ft', '−20 Ft'], answer: '−200 Ft', why: 'Az adósságot negatív számmal írjuk.' },
  { text: 'A lift a földszinten áll.', emoji: '🛗', options: ['0', '1', '−1', '10'], answer: '0', why: 'A földszint a 0. szint.' },
  { text: 'Nyári kánikula van, 32 fokkal fagypont felett.', emoji: '☀️', options: ['32 °C', '−32 °C', '23 °C', '0 °C'], answer: '32 °C', why: 'Fagypont felett pozitív szám, ki sem kell írni a + jelet.' },
  { text: 'A búvár 14 méter mélyre merült a víz felszíne alá.', emoji: '🤿', options: ['−14 m', '14 m', '−41 m', '0 m'], answer: '−14 m', why: 'A víz felszíne a 0, alatta negatív számok vannak.' }
];

const SignLab: React.FC = () => {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const task = SIGN_TASKS[i];
  const finished = i >= SIGN_TASKS.length - 1 && pick === task.answer;

  const choose = (o: string) => {
    if (pick === task.answer) return;
    setPick(o);
    if (o === task.answer && pick === null) setScore((s) => s + 1);
  };
  const next = () => {
    setI((x) => Math.min(SIGN_TASKS.length - 1, x + 1));
    setPick(null);
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>
          {i + 1}. / {SIGN_TASKS.length} helyzet
        </span>
        <span>Elsőre eltalált: {score}</span>
      </div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
        <div className="text-4xl">{task.emoji}</div>
        <div className="text-lg font-bold text-slate-800 mt-2">{task.text}</div>
        <div className="text-sm text-slate-500 mt-1">Melyik számmal írod le?</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {task.options.map((o) => (
          <button
            key={o}
            onClick={() => choose(o)}
            className={`h-14 rounded-xl text-xl font-black border-2 ${
              pick === o ? (o === task.answer ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-100 text-rose-700 border-rose-300') : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {pick && (
        <div className={`text-sm font-bold text-center ${pick === task.answer ? 'text-emerald-700' : 'text-rose-700'}`}>
          {pick === task.answer ? `Helyes! ${task.why}` : 'Nem ez az. Gondold végig: a 0 felett vagy alatt vagyunk?'}
        </div>
      )}
      <div className="flex gap-2 justify-center">
        {pick === task.answer && i < SIGN_TASKS.length - 1 && (
          <button onClick={next} className="px-5 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black">
            Következő →
          </button>
        )}
        <button
          onClick={() => {
            setI(0);
            setPick(null);
            setScore(0);
          }}
          className="px-4 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
        >
          Újrakezdem
        </button>
      </div>
      {finished && (
        <TheoryCallout type="success" title="Kész vagy! 🎉">
          {score} helyzetet találtál el elsőre a {SIGN_TASKS.length}-ból. Ami a 0 alatt van (fagypont, tengerszint, földszint alatt, adósság), azt mínusz előjellel írjuk.
        </TheoryCallout>
      )}
    </div>
  );
};

export const NegativesEverydayTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-negatives"
      subtopicId="negativ-szamok-a-mindennapokban"
      title="1. A negatív számok a mindennapokban"
      subtitle="Hőmérő, fagypont, tengerszint, emeletek: hol találkozunk a 0-nál kisebb számokkal?"
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="sky"
      pdfFilename="4_osztaly_negativ_szamok_a_mindennapokban_tananyag.pdf"
      practiceTitle="Készen állsz a hőmérők leolvasására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A 0 A VISZONYÍTÁSI PONT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center">
              <span className="font-mono text-base font-black text-sky-900 dark:text-sky-200">0 alatt: − (negatív) • 0 felett: + (pozitív)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Hőmérő:</strong> 0 °C a fagypont. −6 °C = 6 fokkal fagypont alatt.
              </li>
              <li>
                <strong>Tengerszint:</strong> 0 m. A hegyek fölötte (+), a tenger mélye alatta (−).
              </li>
              <li>
                <strong>Ház:</strong> a földszint 0, a mélygarázs −1, −2.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 87. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy téli reggelen Manó ezt mondta az osztályban: „Reggel 7 órakor <strong>−6 °C</strong> volt.” Ezt így olvassuk: <em>mínusz 6 fok</em>. Ez azt jelenti, hogy 6 fokkal hidegebb volt, mint a fagypont.
            </p>
            <p>
              A <strong>0 °C</strong> a fagypont: ekkor fagy meg a víz. Ami ennél melegebb, az <strong>pozitív</strong> (+), ami ennél hidegebb, az <strong>negatív</strong> (−) hőmérséklet. A pozitív számok elé nem kell kiírni a + jelet: 18 °C = +18 °C.
            </p>
            <TheoryCallout type="info" title="Jó tudni">
              Grönlandon télen a −40 °C is természetes. Magyarországon is mértek már −30 °C alatti hideget!
            </TheoryCallout>
          </div>
          <ThermometerSvg />
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt – táblázat */}
      <TheorySection title="2. Nézzük meg együtt! Reggeli hőmérsékletek" badge="Tankönyv 88. o., 1. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TownTempsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Olvassuk le és hasonlítsuk össze!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                A legmelegebb <strong>Pécsett</strong> volt: 5 °C. A leghidegebb <strong>Zabaron</strong>: −10 °C.
              </li>
              <li>
                A különbség: −10 °C-tól 0 °C-ig 10 fok, onnan 5 °C-ig még 5 fok: <strong>15 °C</strong>.
              </li>
              <li>
                Miskolcon (−3 °C) <strong>6 fokkal</strong> volt hidegebb, mint Budapesten (3 °C): 3 lépés le a 0-ig, aztán még 3.
              </li>
              <li>
                Szegeden (0 °C) <strong>1 fokkal</strong> volt melegebb, mint Zircen (−1 °C).
              </li>
            </ul>
          </div>
        </div>
        <TheoryTable
          headers={['Este ennyit változott', 'Reggel', 'Este']}
          rows={[
            ['Budapest: 3 °C-kal hidegebb lett', '3 °C', '0 °C'],
            ['Pécs: 2 °C-kal melegebb lett', '5 °C', '7 °C'],
            ['Zirc: 4 °C-ot csökkent', '−1 °C', '−5 °C'],
            ['Zabar: 2 °C-ot emelkedett', '−10 °C', '−8 °C'],
            ['Miskolc: nem változott', '−3 °C', '−3 °C'],
            ['Szeged: 2 °C-ot hűlt', '0 °C', '−2 °C']
          ]}
        />
      </TheorySection>

      {/* 3. Grafikon */}
      <TheorySection title="3. Manó grafikonja egy téli napon" badge="Tankönyv 88. o., 2. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DayGraphSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Manó óránként megmérte a hőmérsékletet, és pontokkal jelölte a grafikonon.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>8 órakor −3 °C, 10 órakor 0 °C volt.</li>
              <li>13 órakor volt a legmelegebb: <strong>6 °C</strong>.</li>
              <li>Délután hűlni kezdett: 16 órakor 0 °C, 19 órakor <strong>−4 °C</strong>.</li>
              <li>Ahol a vonal felfelé megy, ott <strong>emelkedett</strong>, ahol lefelé, ott <strong>csökkent</strong> a hőmérséklet.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Tengerszint és emeletek */}
      <TheorySection title="4. Tengerszint, emeletek, adósság" badge="Tankönyv 87. o. kép, 91–92. o." badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Milyen magasan van?" badge="Tengerszint = 0 m" badgeColor="sky">
            <SeaLevelSvg />
            <p className="text-sm text-slate-700 mt-2">
              A hegyek magasságát és a tenger mélységét a <strong>tengerszinthez</strong> viszonyítjuk. A jegesmedve 350 m magasan van, a zászló 400 m magasan, a mélyben úszó hal −50 m-en.
            </p>
          </TheoryCard>
          <TheoryCard title="Hányadik szinten vagy?" badge="Földszint = 0" badgeColor="amber">
            <FloorsSvg />
            <p className="text-sm text-slate-700 mt-2">
              A liftben a földszint gombja 0. Az emeletek 1, 2, 3, a föld alatti mélygarázs szintjei <strong>−1</strong> és <strong>−2</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Pénz és adósság">
          Ha valakinek tartozása (adóssága) van, azt is negatív számmal írhatjuk: 200 Ft adósság = −200 Ft. Erről a 3. leckében még sokat tanulunk!
        </TheoryCallout>
      </TheorySection>

      {/* 5. Mihez illik */}
      <TheorySection title="5. Mihez illik ez a hőmérséklet?" badge="Munkafüzet 82–83. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <WeatherWordsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Szánkózni csak fagyban lehet, napozni kánikulában jó. A víz 0 °C-on olvad (fagy), 100 °C-on forr.</p>
            <TheoryCard title="Melyik szám kisebb 0-nál?" badge="Munkafüzet 82. o., 1. feladat" badgeColor="violet">
              <p className="text-sm text-slate-700">
                −100, 50, 2400, −520, −13, 1250, −2005, −1000, −37, −25 közül a <strong>mínusz előjelűek</strong> kisebbek a 0-nál. A nem negatív számok: 50, 2400, 1250. Összegük: 50 + 2400 + 1250 = <strong>3700</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz! A nagyobb szám után nem mindig melegebb" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A −10 °C nem melegebb, mint a −1 °C"
          wrong="−10 °C melegebb, mert 10 több, mint 1."
          wrongExplanation="A mínusz jel azt mutatja, hogy fagypont alatt vagyunk. Minél nagyobb szám áll a mínusz után, annál mélyebben vagyunk a 0 alatt."
          correct="−10 °C hidegebb, mint −1 °C."
          correctExplanation="A −10 °C 10 fokkal van fagypont alatt, a −1 °C csak 1 fokkal. A hőmérőn a −10 lejjebb van."
          tip="Képzeld el a hőmérőt: ami lejjebb van, az hidegebb."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Állítsd be a hőmérőt!" badge="Labor" badgeColor="sky">
        <p className="text-sm text-slate-600">
          Válassz egy kártyát (tankönyv 89. o., 3. feladat), és a ▲ ▼ gombokkal állítsd be a hőmérőt! Pirossal a fagypont feletti, kékkel a fagypont alatti hőmérséklet látszik.
        </p>
        <ThermoLab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Írd le számmal!" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600">Olvasd el a helyzetet, és válaszd ki a számot, amellyel leírjuk! Mi a 0: a fagypont, a tengerszint vagy a földszint?</p>
        <SignLab />
        <p className="text-xs text-slate-500">Emlékeztető: {fmtNum(-6)} °C, {fmtNum(-2)}. szint, {fmtNum(-50)} m – mind a 0 alatt van.</p>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NegativesEverydayTheory;
