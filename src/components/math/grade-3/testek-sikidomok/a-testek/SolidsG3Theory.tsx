import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { SolidsAroundUsSvg, SolidFacesSvg, FlatOrCurvedSvg, BuildingPlanSvg } from './SolidsG3Figures';
import { Solid, SolidKind, SOLID_KINDS, SOLID_INFO, FitBuilding, planTotal, FONT, INK } from './SolidsG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Írd fel az alaprajzot!
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Lépcsős építmény: hátulról előre és balról jobbra nem nő, így minden oszlop látszik. */
const newPlan = (): number[][] => {
  for (;;) {
    const b0 = rnd(2, 4);
    const b1 = rnd(1, b0);
    const b2 = rnd(0, b1);
    const back = [b0, b1, b2];
    const front: number[] = [];
    back.forEach((v, c) => front.push(rnd(0, Math.min(v, c === 0 ? v : front[c - 1]))));
    const plan = [back, front];
    const t = planTotal(plan);
    if (t >= 5 && t <= 14) return plan;
  }
};
const FIRST_PLAN = [
  [3, 2, 1],
  [2, 1, 0]
];
const POS = [
  ['hátul balra', 'hátul középen', 'hátul jobbra'],
  ['elöl balra', 'elöl középen', 'elöl jobbra']
];

// ---------------------------------------------------------------------------
// Labor II – Melyik testre gondoltam?
// ---------------------------------------------------------------------------
interface Clue {
  text: string;
  test: (k: SolidKind) => boolean;
}
const cnt = (k: SolidKind, f: string) => SOLID_INFO[k].faces.filter((x) => x === f).length;
const n = (k: SolidKind) => SOLID_INFO[k].faces.length;
const CLUES: Clue[] = [
  { text: 'Csak lapok határolják.', test: (k) => !SOLID_INFO[k].curved },
  { text: 'Van görbe része.', test: (k) => SOLID_INFO[k].curved },
  { text: 'Nincs egyetlen lapja sem.', test: (k) => n(k) === 0 },
  { text: 'Van kör alakú lapja.', test: (k) => cnt(k, 'kor') > 0 },
  { text: '2 kör alakú lapja van.', test: (k) => cnt(k, 'kor') === 2 },
  { text: 'Pontosan 1 lapja van.', test: (k) => n(k) === 1 },
  { text: '6 lapja van.', test: (k) => n(k) === 6 },
  { text: '5 lapja van.', test: (k) => n(k) === 5 },
  { text: '4 lapja van.', test: (k) => n(k) === 4 },
  { text: 'Van háromszög alakú lapja.', test: (k) => cnt(k, 'haromszog') > 0 },
  { text: 'Nincs háromszög alakú lapja.', test: (k) => cnt(k, 'haromszog') === 0 },
  { text: 'Van négyzet alakú lapja.', test: (k) => cnt(k, 'negyzet') > 0 },
  { text: 'Minden lapja négyzet.', test: (k) => n(k) > 0 && cnt(k, 'negyzet') === n(k) },
  { text: 'Minden lapja háromszög.', test: (k) => n(k) > 0 && cnt(k, 'haromszog') === n(k) },
  { text: 'Van olyan téglalap alakú lapja, amelyik nem négyzet.', test: (k) => cnt(k, 'teglalap') > 0 },
  { text: 'Hegyes a teteje.', test: (k) => SOLID_INFO[k].pointy },
  { text: 'Nem hegyes a teteje.', test: (k) => !SOLID_INFO[k].pointy }
];
const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);

const makeRiddle = (target: SolidKind): Clue[] => {
  for (let tries = 0; tries < 50; tries++) {
    const pool = shuffle(CLUES.filter((c) => c.test(target)));
    const chosen: Clue[] = [];
    for (const c of pool) {
      chosen.push(c);
      const left = SOLID_KINDS.filter((k) => chosen.every((cl) => cl.test(k)));
      if (left.length === 1 && chosen.length <= 3) return chosen;
    }
  }
  return CLUES.filter((c) => c.test(target));
};
const FIRST_RIDDLE: { target: SolidKind; clues: Clue[] } = { target: 'henger', clues: [CLUES[1], CLUES[4]] };

const btn = 'px-4 py-2 rounded-xl text-sm font-bold min-h-[48px]';

export const SolidsG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [target, setTarget] = useState<number[][]>(FIRST_PLAN);
  const [mine, setMine] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [checked, setChecked] = useState(false);
  const [countIn, setCountIn] = useState('');
  const [countMsg, setCountMsg] = useState<string | null>(null);
  const wrong: [number, number][] = [];
  target.forEach((row, r) => row.forEach((v, c) => mine[r][c] !== v && wrong.push([r, c])));
  const planOk = wrong.length === 0;
  const tap = (r: number, c: number) => {
    setMine(mine.map((row, rr) => row.map((v, cc) => (rr === r && cc === c ? (v + 1) % 6 : v))));
    setChecked(false);
    setCountMsg(null);
  };
  const newBuild = () => {
    setTarget(newPlan());
    setMine([
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setChecked(false);
    setCountIn('');
    setCountMsg(null);
  };
  const checkCount = () => {
    const t = planTotal(target);
    const v = parseInt(countIn, 10);
    if (v === t) setCountMsg(`Szuper! ${target.flat().filter((x) => x > 0).join(' + ')} = ${t} kis kocka.`);
    else if (v === target.flat().filter((x) => x > 0).length) setCountMsg('Ez a négyzetek száma az alaprajzon. Add össze a bennük lévő számokat!');
    else setCountMsg('Még nem jó. Add össze az alaprajz számait!');
  };

  // Labor II
  const [riddle, setRiddle] = useState(FIRST_RIDDLE);
  const [pickMsg, setPickMsg] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [tried, setTried] = useState<SolidKind[]>([]);
  const pick = (k: SolidKind) => {
    if (solved) return;
    if (k === riddle.target) {
      setSolved(true);
      setPickMsg(`Eltaláltad! ${SOLID_INFO[k].desc}`);
    } else {
      const failed = riddle.clues.find((c) => !c.test(k));
      setTried([...tried, k]);
      setPickMsg(`Nem ez. ${SOLID_INFO[k].desc}${failed ? ` Nézd meg ezt a nyomot: „${failed.text}”` : ''}`);
    }
  };
  const newRiddle = () => {
    let t: SolidKind;
    do t = SOLID_KINDS[rnd(0, SOLID_KINDS.length - 1)];
    while (t === riddle.target);
    setRiddle({ target: t, clues: makeRiddle(t) });
    setPickMsg(null);
    setSolved(false);
    setTried([]);
  };

  const PlanEditor = (
    <svg viewBox="0 0 180 128" className="w-full max-w-[260px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="90" y="14" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">hátul</text>
      {mine.map((row, r) =>
        row.map((v, c) => {
          const bad = checked && target[r][c] !== v;
          return (
            <g key={`${r}-${c}`} onClick={() => tap(r, c)} style={{ cursor: 'pointer' }}>
              <rect x={30 + c * 40} y={20 + r * 40} width={40} height={40} fill={bad ? '#fee2e2' : v ? '#ffedd5' : '#ffffff'} stroke={bad ? '#dc2626' : INK} strokeWidth={bad ? 3 : 2} />
              <text x={50 + c * 40} y={48 + r * 40} textAnchor="middle" fontSize="22" fontWeight="bold" fill={v ? INK : '#cbd5e1'}>
                {v}
              </text>
            </g>
          );
        })
      )}
      <text x="90" y="120" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">elöl</text>
    </svg>
  );

  return (
    <TheoryTemplate
      topicId="g3-shapes-solids"
      subtopicId="a-testek"
      grade={3}
      chapterId="testek-sikidomok"
      title="1. A testek"
      subtitle="Testek körülöttünk, lapok, görbe részek, építés kis kockákból."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_a_testek_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — MIT NÉZÜNK MEG EGY TESTEN?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-sm font-black text-sky-900 dark:text-sky-200">
              Milyen lapok határolják? Van görbe része?
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A lap lapos. Körberajzolva: négyzet, téglalap, háromszög, kör.</li>
              <li>A görbe rész nem lap. Ezért gurul a test.</li>
              <li>Alaprajz: a szám = hány kocka áll ott egymáson.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 100–101. o." badgeColor="sky">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A dobókockát, a labdát, a dobozt kézbe veheted. Ezek <strong>testek</strong>.</p>
          <p>Megnézzük, milyen <strong>lapok</strong> határolják őket. Kis kockákból testeket <strong>építünk</strong>.</p>
        </div>
        <SolidsAroundUsSvg />
        <TheoryCallout type="info" title="Három név, amit már tudsz">
          <strong>kocka</strong> (mint a dobókocka), <strong>téglatest</strong> (mint a cipősdoboz), <strong>gömb</strong> (mint a labda). A többi testet arról nevezzük meg, amire hasonlít.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. A test lapjai" badge="körberajzolás" badgeColor="amber">
        <SolidFacesSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A test lapos részei a <strong>lapok</strong>. A lapok <strong>határolják</strong> a testet.</p>
          <p>Tedd a testet egy papírra, és rajzold körbe! Így látod a lap alakját.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Csak lapok – vagy görbe része is van?" badge="csoportosítás" badgeColor="rose">
        <FlatOrCurvedSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Csak lapok határolják" badge="nem gurul" badgeColor="sky">
            <p className="text-sm text-slate-700">Kocka, téglatest, piramis, sátor. Bármelyik lapjára teszed, megáll.</p>
          </TheoryCard>
          <TheoryCard title="Görbe része is van" badge="gurul" badgeColor="rose">
            <p className="text-sm text-slate-700">A gömb, a konzervdoboz, a tölcsér, a tál. A görbe részén el tud gurulni.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Gyurmából">
          A görbe testeket kis kockákból nem tudod megépíteni. Gyurmából igen!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Építés kis kockákból" badge="alaprajz" badgeColor="orange">
        <BuildingPlanSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Felülről nézzük az építményt. Minden négyzetbe beírjuk, <strong>hány kocka áll ott</strong> egymáson. Ez az <strong>alaprajz</strong>.</p>
          <p>Hány kocka kell? Add össze a számokat: 3 + 2 + 1 + 2 + 1 + 1 = 10.</p>
        </div>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Konzervdoboz" badge="lapok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az alja kerek és lapos: 1 lap.</li>
              <li>A teteje is: még 1 lap.</li>
              <li>Az oldala görbe: ez nem lap.</li>
              <li>Tehát <strong>2 kör alakú lapja</strong> van.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Piramis" badge="lapok" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az alja négyzet: 1 lap.</li>
              <li>Oldalt 4 háromszög.</li>
              <li>1 + 4 = <strong>5 lapja</strong> van.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Alaprajz" badge="hány kocka?" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Alaprajz: hátul 4, 2 – elöl 1, 1.</li>
              <li>4 + 2 + 1 + 1 = <strong>8 kocka</strong>.</li>
              <li>Nem 4! A 4 csak a négyzetek száma.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A görbe rész nem lap!"
          wrong="A konzervdoboznak 3 lapja van: alja, teteje, oldala."
          wrongExplanation="Az oldala görbe. A lap mindig lapos."
          correct="A konzervdoboznak 2 lapja van, és görbe része."
          correctExplanation="Csak az alja és a teteje lapos. Mindkettő kör alakú."
          tip="Kérdezd meg: le tudom ide tenni a vonalzót, hogy teljesen felfeküdjön?"
        />
        <TheoryCallout type="warning" title="A rejtett kockák">
          Egy torony alsó kockáit nem mindig látod. De ott vannak! A felső kocka nem lóghat a levegőben.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Labor I: Írd fel az alaprajzot!" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">
            Nézd meg az építményt! Koppints a négyzetekre, és állítsd be, hány kocka áll ott. Melletted megépül a tiéd is.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <div className="text-center">
              <div className="text-xs font-bold text-orange-700 mb-1">Ezt kell felírni</div>
              <svg viewBox="0 0 200 170" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                <FitBuilding plan={target} x={10} y={10} w={180} h={150} maxU={38} />
              </svg>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-slate-600 mb-1">A te alaprajzod</div>
              {PlanEditor}
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-sky-700 mb-1">Ezt építetted</div>
              <svg viewBox="0 0 200 170" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                <FitBuilding plan={mine.some((r) => r.some((v) => v > 0)) ? mine : [[0]]} x={10} y={10} w={180} h={150} maxU={38} color="#38bdf8" />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setChecked(true)} className={`${btn} bg-orange-600 text-white`}>
              Ellenőrzés
            </button>
            <button onClick={newBuild} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
          {checked && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${planOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {planOk
                ? 'Szuper! Az alaprajzod pontos.'
                : `Nézd meg még egyszer: ${POS[wrong[0][0]][wrong[0][1]]} ${target[wrong[0][0]][wrong[0][1]] === 0 ? 'nem áll kocka' : `${target[wrong[0][0]][wrong[0][1]]} kocka áll egymáson`}, nálad ${mine[wrong[0][0]][wrong[0][1]]}.`}
            </div>
          )}
          {checked && planOk && (
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <span className="text-sm font-bold text-slate-700">Hány kis kocka van összesen?</span>
              <input
                type="number"
                inputMode="numeric"
                value={countIn}
                onChange={(e) => {
                  setCountIn(e.target.value);
                  setCountMsg(null);
                }}
                className="w-20 h-12 text-center text-lg font-bold border-2 border-slate-300 rounded-xl"
                aria-label="kockák száma"
              />
              <button onClick={checkCount} className={`${btn} bg-sky-600 text-white`}>
                Kész
              </button>
            </div>
          )}
          {countMsg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${countMsg.startsWith('Szuper') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{countMsg}</div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="8. Labor II: Melyik testre gondoltam?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="rounded-xl bg-sky-50 border-2 border-sky-200 p-3">
            <div className="text-xs font-bold text-sky-700 mb-1">Nyomok:</div>
            <ul className="list-disc pl-5 space-y-1 text-sm font-bold text-sky-950">
              {riddle.clues.map((c) => (
                <li key={c.text}>{c.text}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-slate-600 text-center">Koppints arra a testre, amelyikre minden nyom igaz!</p>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {SOLID_KINDS.map((k) => {
              const isT = solved && k === riddle.target;
              const isX = tried.includes(k);
              return (
                <button
                  key={k}
                  onClick={() => pick(k)}
                  aria-label={SOLID_INFO[k].name}
                  className={`rounded-xl border-2 p-1 min-h-[80px] transition-colors ${isT ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : isX ? 'border-rose-300 bg-rose-50 opacity-60' : 'border-slate-200 bg-white hover:bg-sky-50'}`}
                >
                  <svg viewBox="0 0 100 90" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <Solid kind={k} cx={50} by={78} s={58} sw={2.4} />
                  </svg>
                </button>
              );
            })}
          </div>
          {pickMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${solved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{pickMsg}</div>}
          <div className="flex justify-center">
            <button onClick={newRiddle} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SolidsG3Theory;
