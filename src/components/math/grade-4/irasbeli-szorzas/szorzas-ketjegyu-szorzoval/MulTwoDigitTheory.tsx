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
  CoinGroupsSvg,
  TimesTenTableSvg,
  FactorChainSvg,
  RoundTensSvg,
  SplitMulSvg,
  PV_COLORS,
  PV_HEADS
} from './MulTwoDigitFigures';

/**
 * Kerek tízessel való szorzás lépései: a · (d · 10) = (a · d) · 10.
 * Visszaadja a részeredményt és a szorzatot.
 */
export const roundTensSteps = (a: number, tens: number) => {
  const d = tens / 10;
  const first = a * d;
  return { d, first, product: first * 10 };
};

const SHIFT_NUMBERS = [71, 45, 893, 284, 171, 60];

/** I. labor: helyiérték-táblázat, a számjegyek 10-zel szorzáskor balra lépnek. */
const ShiftLab: React.FC = () => {
  const [base, setBase] = useState(71);
  const [times, setTimes] = useState(1);
  const value = base * times;
  const canTen = value * 10 <= 9999;
  const digits = String(value).padStart(4, ' ').split('');
  const zeros = times === 1 ? 0 : times === 10 ? 1 : 2;

  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {SHIFT_NUMBERS.map((n) => (
          <button
            key={n}
            onClick={() => {
              setBase(n);
              setTimes(1);
            }}
            className={`px-4 h-12 rounded-xl text-lg font-black border-2 ${
              base === n ? 'bg-blue-600 border-blue-700 text-white' : 'bg-white border-blue-200 hover:bg-blue-50 text-blue-800'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-4 gap-1 font-mono text-4xl font-black text-center">
          {PV_HEADS.map((h, i) => (
            <div key={h} className="w-16 text-base text-white rounded-t-md py-1" style={{ backgroundColor: PV_COLORS[i] }}>
              {h}
            </div>
          ))}
          {digits.map((d, i) => (
            <div
              key={`${i}-${value}`}
              className={`w-16 py-3 rounded-b-md transition-all ${i >= 4 - zeros ? 'text-rose-600' : 'text-slate-800'}`}
              style={{ backgroundColor: `${PV_COLORS[i]}22` }}
            >
              {d.trim()}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-lg font-bold text-slate-700">
        {times === 1 ? (
          <>A szám: {base}</>
        ) : (
          <>
            {base} · {times} = <span className="text-blue-700">{value}</span>
          </>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          disabled={!canTen || times === 100}
          onClick={() => setTimes(times * 10)}
          className="px-6 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white text-lg font-black"
        >
          · 10
        </button>
        <button onClick={() => setTimes(1)} className="px-6 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-lg font-bold">
          Vissza
        </button>
      </div>
      <TheoryCallout type={times === 1 ? 'info' : 'success'} title={times === 1 ? 'Próbáld ki!' : 'Mit látsz?'}>
        {times === 1
          ? 'Nyomd meg a „· 10” gombot! Figyeld, hová lépnek a számjegyek.'
          : `Minden számjegy ${zeros} hellyel balra lépett, az üres helyekre 0 került. ${
              !canTen || times === 100 ? 'Többször most nem szorozhatsz, mert túllépnénk a 10 000-et.' : ''
            }`}
      </TheoryCallout>
    </div>
  );
};

export const WITH: Record<number, string> = {
  1: '1-gyel',
  2: '2-vel',
  3: '3-mal',
  4: '4-gyel',
  5: '5-tel',
  6: '6-tal',
  7: '7-tel',
  8: '8-cal',
  9: '9-cel'
};

const TRAIN: [number, number][] = [
  [23, 50],
  [41, 20],
  [16, 20],
  [43, 40],
  [32, 50],
  [24, 30],
  [56, 70],
  [130, 60]
];

/** II. labor: szorzás kerek tízessel, választós gyakorló lépésekkel. */
const RoundTensLab: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [a, t] = TRAIN[idx];
  const { d, first, product } = roundTensSteps(a, t);
  // jellegzetes hibák: elfelejtett 0, eggyel több 0, a tízesek számával szorzott szám
  const options = [product, first, product * 10, product + 10].sort((x, y) => (x * 7) % 11 - (y * 7) % 11);
  const answered = picked !== null;
  const good = picked === product;

  const pick = (o: number) => {
    if (answered) return;
    setPicked(o);
    if (o === product) setScore(score + 1);
  };
  const next = () => {
    setIdx((idx + 1) % TRAIN.length);
    setPicked(null);
  };

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xl font-black text-violet-800">
          {a} · {t} = ?
        </div>
        <div className="text-sm font-bold text-slate-600">Pontjaid: {score}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => pick(o)}
            className={`h-14 rounded-xl text-2xl font-black border-2 ${
              answered && o === product
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                : answered && o === picked
                ? 'bg-rose-100 border-rose-400 text-rose-700'
                : 'bg-white border-violet-200 hover:bg-violet-50 text-slate-800'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {answered && (
        <TheoryCallout type={good ? 'success' : 'warning'} title={good ? 'Ügyes vagy! 🎉' : 'Nézzük meg lépésenként!'}>
          {t} = {d} · 10, ezért előbb {WITH[d]} szorzok: {a} · {d} = {first}. Utána
          10-zel: {first} · 10 = {product}.
        </TheoryCallout>
      )}
      <button onClick={next} className="px-5 h-12 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold">
        Következő feladat ➜
      </button>
    </div>
  );
};

export const MulTwoDigitTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-mult"
      subtopicId="szorzas-ketjegyu-szorzoval"
      grade={4}
      chapterId="irasbeli-szorzas"
      title="1. Szorzás kétjegyű szorzóval"
      subtitle="Szorzás 10-zel, 100-zal és kerek tízesekkel; hogyan változik a szorzat; szorzás tagonként."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="blue"
      pdfFilename="4_osztaly_szorzas_ketjegyu_szorzoval_tananyag.pdf"
      practiceTitle="Készen állsz a kerek tízesekkel szorzás gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZORZÁS KEREK TÍZESSEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                23 · 50 = 23 · 5 · 10 = 115 · 10 = 1150
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>10-zel</strong> szorzáskor minden számjegy egy hellyel balra lép, a végére <strong>0</strong> kerül: 71 · 10 = 710.
              </li>
              <li>
                <strong>Kerek tízessel</strong> szorzáskor szorozz a tízesek számával, aztán 10-zel: 43 · 20 = 86 · 10 = 860.
              </li>
              <li>Ha a szorzó 10-szeresére nő, a szorzat is 10-szeresére nő.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 135–136. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CoinGroupsSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az osztály kirándulni készül. Sokszor kell majd kiszámolni, mennyibe kerül valami <strong>sok gyereknek</strong>: 26
              gyereknek, 14 napra, 23 főnek… Ehhez meg kell tanulnunk <strong>kétjegyű számmal szorozni</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Szorzás 10-zel és 100-zal.</li>
              <li>Szorzás kerek tízesekkel: 20, 30, 50 …</li>
              <li>Hogyan változik a szorzat, ha a szorzót vagy a szorzandót 10-szeresére változtatjuk?</li>
              <li>Szorzás tagonként: 130 · 60 = 100 · 60 + 30 · 60.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szorzás 10-zel */}
      <TheorySection title="2. Szorzás 10-zel" badge="Tankönyv 136. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TimesTenTableSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Mennyit ér 25 tízes?</strong> 25 · 10 = 250. És 170 tízes? 170 · 10 = 1700.
            </p>
            <p>
              Ha egy számot 10-zel szorzunk, az egyesekből tízesek, a tízesekből százasok, a százasokból ezresek lesznek. Ezért a
              számjegyek <strong>egy hellyel balra lépnek</strong>, és az egyesek helyére <strong>0</strong> kerül.
            </p>
            <TheoryTable
              headers={['Szorzás', 'Szorzat']}
              rows={[
                ['71 · 10', '710'],
                ['10 · 43', '430 (a tényezők felcserélhetők)'],
                ['893 · 10', '8930'],
                ['100 · 10', '1000']
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 3. Szorzó és szorzandó változása */}
      <TheorySection title="3. Hogyan változik a szorzat?" badge="Tankönyv 137. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FactorChainSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Ha a szorzót</strong> 10-szeresére változtatjuk, a szorzat is 10-szeresére változik: 9 · 7 = 63, 9 · 70 = 630, 9
              · 700 = 6300.
            </p>
            <p>
              <strong>Ha a szorzandót</strong> változtatjuk 10-szeresére, ugyanez történik: 8 · 2 = 16, 80 · 2 = 160, 800 · 2 = 1600.
            </p>
            <TheoryCard title="Mit veszel észre?" badge="Szabály" badgeColor="amber">
              <p className="text-sm text-slate-700">
                Ha az egyik tényező 10-szeresére nő, a szorzat is 10-szeresére nő. Ha 100-szorosára nő, a szorzat is 100-szorosára: 8 · 2
                = 16 → 8 · 200 = 1600.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 4. Kerek tízesek */}
      <TheorySection title="4. Nézzük meg együtt! Szorzás kerek tízessel" badge="Tankönyv 136. o., 1. b)" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RoundTensSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Eszternek 23 darab 50 forintos érméje van. Mennyi pénze van?</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Terv: 23 · 50 = ?</li>
              <li>50 = 5 · 10, ezért előbb 5-tel szorzok: 23 · 5 = 115.</li>
              <li>Utána 10-zel: 115 · 10 = 1150.</li>
              <li>
                Válasz: Eszternek <strong>1150 Ft</strong>-ja van.
              </li>
            </ol>
            <TheoryTable
              headers={['Feladat', 'Gondolkodás', 'Szorzat']}
              rows={[
                ['41 · 20', '41 · 2 = 82 → 82 · 10', '820'],
                ['43 · 40', '43 · 4 = 172 → 172 · 10', '1720'],
                ['12 · 800', '12 · 8 = 96 → 96 · 100', '9600']
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 5. Szorzás tagonként */}
      <TheorySection title="5. Nézzük meg együtt! 130 · 60" badge="Tankönyv 137. o., 4. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SplitMulSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A 130-at bontsd két részre: 130 = 100 + 30. Mindkét részt szorozd meg 60-nal, aztán add össze!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>100 · 60 = 6000</li>
              <li>30 · 60 = 1800</li>
              <li>
                6000 + 1800 = <strong>7800</strong>
              </li>
            </ul>
            <p>
              Felcserélve is ugyanannyi: 60 · 130 = 7800. Próbáld ki: 140 · 20 = 100 · 20 + 40 · 20 = 2000 + 800 = 2800.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! A nullák száma" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett 0"
          wrong="23 · 50 = 115"
          wrongExplanation="Csak 5-tel szorzott, a 10-zel szorzást kihagyta, ezért lemaradt a végéről a 0."
          correct="23 · 50 = 1150"
          correctExplanation="23 · 5 = 115, és még 10-zel is szorozni kell: 1150."
          tip="Becsülj! 23 · 50 körülbelül 20 · 50 = 1000, tehát a 115 túl kicsi."
        />
        <TheoryCallout type="warning" title="Nem mindig csak egy 0 van a végén!">
          25 · 20 = 500: két 0 van a végén, mert már 25 · 2 = 50 is 0-ra végződik. Ne írj „csak egy” 0-t: 25 · 20 nem 50, és nem is 5000.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Tízszerező gép" badge="Labor" badgeColor="blue">
        <p className="text-sm text-slate-600">Válassz egy számot, és szorozd meg 10-zel! Figyeld a helyiérték-táblázatot.</p>
        <ShiftLab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Szorozz kerek tízessel!" badge="Labor" badgeColor="purple">
        <p className="text-sm text-slate-600">Válaszd ki a helyes szorzatot! Ha hibázol, megmutatom a lépéseket.</p>
        <RoundTensLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulTwoDigitTheory;
