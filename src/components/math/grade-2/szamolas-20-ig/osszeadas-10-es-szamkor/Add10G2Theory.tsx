import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
} from '../TheoryTemplate';
import {
  JoiningGroupsSvg,
  CommutativeAndZeroSvg,
  TenBeadStringSvg,
  TenBondHouseSvg,
  JumpNumberLine10Svg,
  ComparisonCardSvg,
} from './Add10G2Figures';
import { ADD10_FONT, BeadString10G } from './Add10G2Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

interface BondChallenge {
  target: number;
  given: number;
}

const makeBondChallenge = (): BondChallenge => {
  const target = Math.random() < 0.65 ? 10 : rnd(6, 9);
  const given = rnd(1, target - 1);
  return { target, given };
};

interface TrioChallenge {
  target: number;
  cards: number[];
}

const TRIO_BANK: TrioChallenge[] = [
  { target: 9, cards: [4, 2, 1, 3, 5] },
  { target: 10, cards: [5, 1, 3, 2, 4] },
  { target: 8, cards: [3, 4, 2, 1, 5] },
  { target: 7, cards: [1, 4, 3, 2, 5] },
  { target: 10, cards: [6, 2, 1, 3, 4] },
  { target: 9, cards: [2, 6, 3, 1, 4] },
  { target: 8, cards: [0, 5, 2, 3, 4] },
  { target: 10, cards: [0, 4, 6, 3, 2] },
];

const pickTrioChallenge = (prevTarget?: number): TrioChallenge => {
  const pool = prevTarget !== undefined ? TRIO_BANK.filter((c) => c.target !== prevTarget) : TRIO_BANK;
  return pool[rnd(0, pool.length - 1)];
};

export const Add10G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Gyöngysor-pótlás 10-ig
  const [bond, setBond] = useState<BondChallenge>({ target: 10, given: 4 });
  const [added, setAdded] = useState<number>(0);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);

  const checkBond = () => {
    const missing = bond.target - bond.given;
    const total = bond.given + added;
    if (added === missing) {
      setMsg1({
        ok: true,
        text: `Szuper! ${bond.given} + ${added} = ${bond.target}. Pontosan ${missing} gyöngyöt tettél hozzá!`,
      });
    } else if (total < bond.target) {
      setMsg1({
        ok: false,
        text: `Most ${bond.given} + ${added} = ${total} gyöngy van. Még kevesebb, mint ${bond.target}. Tegyél hozzá többet!`,
      });
    } else {
      setMsg1({
        ok: false,
        text: `Most ${bond.given} + ${added} = ${total} gyöngy van. Ez már több, mint ${bond.target}. Vegyél el belőle!`,
      });
    }
  };

  const newBond = () => {
    setBond(makeBondChallenge());
    setAdded(0);
    setMsg1(null);
  };

  // Labor II: Három kártya összege = célszám
  const [trio, setTrio] = useState<TrioChallenge>(TRIO_BANK[0]);
  const [selectedIdx, setSelectedIdx] = useState<number[]>([]);
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);

  const toggleCard = (idx: number) => {
    setMsg2(null);
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((i) => i !== idx));
    } else if (selectedIdx.length < 3) {
      setSelectedIdx([...selectedIdx, idx]);
    }
  };

  const chosenSum = selectedIdx.reduce((acc, idx) => acc + trio.cards[idx], 0);

  const checkTrio = () => {
    if (selectedIdx.length !== 3) {
      setMsg2({
        ok: false,
        text: `Pontosan 3 kártyát válassz ki! Most ${selectedIdx.length} van kijelölve.`,
      });
      return;
    }
    const nums = selectedIdx.map((i) => trio.cards[i]);
    if (chosenSum === trio.target) {
      setMsg2({
        ok: true,
        text: `Ügyes vagy! ${nums.join(' + ')} = ${trio.target}.`,
      });
    } else {
      setMsg2({
        ok: false,
        text: `A három szám összege: ${nums.join(' + ')} = ${chosenSum}. A cél a ${trio.target}. Próbálj másik 3 kártyát!`,
      });
    }
  };

  const newTrio = () => {
    setTrio(pickTrioChallenge(trio.target));
    setSelectedIdx([]);
    setMsg2(null);
  };

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="osszeadas-10-es-szamkor"
      grade={2}
      chapterId="szamolas-20-ig"
      title="2. Összeadás 10-es számkör"
      subtitle="Összeadás 0-tól 10-ig, a tagok felcserélése, a 10 bontása, három tag összege, pótlás és összehasonlítás."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="2_osztaly_osszeadas_10_es_szamkor_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Oldd meg a 30 feladatot a 3 szintes kvízben, vagy játssz a Párosítóval és a Csoportosítóval!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÖSSZEADÁS 10-IG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              4 + 5 = 9 &nbsp;&nbsp;(tag + tag = összeg)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A tagok sorrendje felcserélhető: <strong>3 + 6 = 6 + 3 = 9</strong>.</li>
              <li>Ha <strong>0</strong>-t adunk hozzá, a szám nem változik: <strong>7 + 0 = 7</strong>.</li>
              <li>Tudd álmodból felébresztve is a <strong>10 bontásait</strong> (1+9, 2+8, 3+7, 4+6, 5+5)!</li>
            </ul>
          </div>
        ),
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="TK 10–11. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            Két csoportot összerakunk, és megszámoljuk, mennyi lett <strong>összesen</strong>. Ez az <strong>összeadás</strong>!
          </p>
          <p>
            Megtanuljuk fejből a <strong>10-es számpárokat</strong>, ugrálunk a számegyenesen, három számot is összeadunk,
            és megkeressük a hiányzó számot a □ helyén.
          </p>
        </div>
      </TheorySection>

      {/* 2. Az összeadás, a csere és a nulla */}
      <TheorySection title="2. Összeadás, felcserélés és a nulla" badge="tag + tag = összeg" badgeColor="blue">
        <JoiningGroupsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A tagok felcserélhetők" badge="2 + 7 = 7 + 2" badgeColor="sky">
            <p className="text-sm text-slate-700">
              Mindegy, hogy a 2 piros koronghoz teszed a 7 kéket, vagy a 7 kékhez a 2 pirosat: az összeg mindig <strong>9</strong>.
              Mindig könnyebb a <strong>nagyobb</strong> számhoz hozzáadni a kisebbet!
            </p>
          </TheoryCard>
          <TheoryCard title="Összeadás 0-val" badge="6 + 0 = 6" badgeColor="amber">
            <p className="text-sm text-slate-700">
              A <strong>0</strong> azt jelenti, hogy semmit sem teszünk hozzá. Ezért <strong>6 + 0 = 6</strong> és{' '}
              <strong>0 + 8 = 8</strong>.
            </p>
          </TheoryCard>
        </div>
        <CommutativeAndZeroSvg />
      </TheorySection>

      {/* 3. A 10 bontása */}
      <TheorySection title="3. A 10 bontása — számpárok a 10-hez" badge="Nagyon fontos!" badgeColor="amber">
        <TenBeadStringSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <TenBondHouseSvg />
          <div className="space-y-3">
            <TheoryTable
              headers={['Első tag', 'Második tag', 'Összeg']}
              rows={[
                ['0', '10', '0 + 10 = 10'],
                ['1', '9', '1 + 9 = 10'],
                ['2', '8', '2 + 8 = 10'],
                ['3', '7', '3 + 7 = 10'],
                ['4', '6', '4 + 6 = 10'],
                ['5', '5', '5 + 5 = 10'],
              ]}
            />
            <TheoryCallout type="tip" title="Miért fontos a 10 bontása?">
              Ha tudod, hogy <strong>3 + 7 = 10</strong>, akkor rögtön tudod azt is, hogy <strong>7 + 3 = 10</strong>, és hamarosan a
              20-as számkörben is villámgyors leszel!
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Számegyenes, három tag és összehasonlítás */}
      <TheorySection title="4. Számegyenes, három tag, összehasonlítás" badge="0–10" badgeColor="purple">
        <JumpNumberLine10Svg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Ugrás a számegyenesen" badge="jobbra lépünk" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Az összeadásnál mindig <strong>jobbra</strong> ugrunk. Ha a 3-ról 5-öt ugrunk jobbra, a <strong>8</strong>-ra érkezünk:
              <strong> 3 + 5 = 8</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Három tag összeadása" badge="2 + 3 + 4" badgeColor="purple">
            <p className="text-sm text-slate-700">
              Haladj sorban, vagy keresd meg előbb a 10-et! Például: <strong>2 + 5 + 3</strong> → a 2 + 3 + 5-ből a <strong>2 + 5 = 7</strong>,
              aztán <strong>7 + 3 = 10</strong>.
            </p>
          </TheoryCard>
        </div>
        <ComparisonCardSvg />
      </TheorySection>

      {/* 5. Pótlás, nyitott mondat, páros-páratlan */}
      <TheorySection title="5. Pótlás, nyitott mondat, páros vagy páratlan" badge="□ és △" badgeColor="teal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Pótlás (hiányzó tag)" badge="3 + □ = 8" badgeColor="sky">
            <p className="text-sm text-slate-700">
              Kérdezd meg magadtól: <em>„Mennyit kell a 3-hoz tenni, hogy 8 legyen?”</em> Számolj 3-tól 8-ig: 4, 5, 6, 7, 8 → ez{' '}
              <strong>5</strong>. Tehát <strong>□ = 5</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Nyitott mondat" badge="2 + 4 < △" badgeColor="purple">
            <p className="text-sm text-slate-700">
              Előbb számold ki a bal oldalt: <strong>2 + 4 = 6</strong>. Így <strong>6 &lt; △</strong>. A 0-tól 10-ig terjedő számok közül{' '}
              <strong>7, 8, 9, 10</strong> teheti igazzá!
            </p>
          </TheoryCard>
          <TheoryCard title="Páros vagy páratlan?" badge="összeg" badgeColor="amber">
            <p className="text-sm text-slate-700">
              Előbb számold ki az összeget, aztán döntsd el! Például <strong>4 + 5 = 9</strong> (páratlan), <strong>3 + 5 = 8</strong>{' '}
              (páros).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Cseréld fel, hogy könnyebb legyen!" badge="2 + 7" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 2-höz 7-et számolni hosszabb.</li>
              <li>Cseréld fel: <strong>7 + 2</strong>.</li>
              <li>7 után még kettő: 8, <strong>9</strong>.</li>
              <li>Tehát <strong>2 + 7 = 9</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hiányzó tag a 10-hez" badge="□ + 6 = 10" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Képzelj el egy 10-es gyöngysort!</li>
              <li>6 gyöngy már megvan.</li>
              <li>Számolj 6-tól 10-ig: 7, 8, 9, 10 → <strong>4</strong> gyöngy hiányzik.</li>
              <li>Ellenőrzés: <strong>4 + 6 = 10</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyik jel kell közéjük?" badge="3 + 4 □ 2 + 6" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Bal oldal: <strong>3 + 4 = 7</strong>.</li>
              <li>Jobb oldal: <strong>2 + 6 = 8</strong>.</li>
              <li>A 7 kisebb, mint a 8.</li>
              <li>Tehát <strong>3 + 4 &lt; 2 + 6</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi 5 + 0?"
          wrong="5 + 0 = 0 vagy 50"
          wrongExplanation="A 0 hozzáadása nem szorozza meg a számot, és nem írjuk a végére új számjegyként!"
          correct="5 + 0 = 5"
          correctExplanation="Ha 5 almádhoz 0 almát kapsz, pontosan 5 almád marad."
          tip="Összeadásnál a 0 nem változtatja meg a másik számot!"
        />
        <TheoryCallout type="warning" title="Figyelj a nyitott mondatoknál a 0-ra is!">
          Ha egy feladatban azt látod: <strong>○ &lt; 2 + 3</strong> (vagyis <strong>○ &lt; 5</strong>), a 0-tól 10-ig terjedő számok közül a{' '}
          <strong>0</strong> is jó megoldás, mert <strong>0 &lt; 5</strong>!
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I: Gyöngysor-pótlás */}
      <TheorySection title="8. Labor I: Pótold a gyöngysort!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-950 font-bold text-base sm:text-lg">
            Legyen összesen <span className="text-2xl font-black text-emerald-700 mx-1">{bond.target}</span> gyöngy!
            Már van <span className="text-2xl font-black text-green-700 mx-1">{bond.given}</span> zöld gyöngyöd.{' '}
            Mennyi sárga gyöngyöt teszel mellé?
          </div>

          <svg viewBox="0 0 340 84" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={ADD10_FONT}>
            <rect x="1" y="1" width="338" height="82" rx="10" fill="#f8fafc" />
            <BeadString10G a={bond.given} b={added} x0={44} y={36} step={28} r={10} />
            <text x="170" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
              {bond.given} + {added} = {bond.given + added} (cél: {bond.target})
            </text>
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setAdded(Math.max(0, added - 1));
                setMsg1(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-sm min-h-[48px] border border-amber-300 cursor-pointer"
            >
              − 1 sárga gyöngy
            </button>
            <span className="text-xl font-black text-slate-800 px-3">
              {bond.given} + {added} = {bond.given + added}
            </span>
            <button
              type="button"
              onClick={() => {
                setAdded(Math.min(10 - bond.given, added + 1));
                setMsg1(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-amber-950 font-bold text-sm min-h-[48px] border border-amber-500 cursor-pointer"
            >
              + 1 sárga gyöngy
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={checkBond}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newBond}
              className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {msg1 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                msg1.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {msg1.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II: Három kártya összege = célszám */}
      <TheorySection title="9. Labor II: Válassz 3 kártyát!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 rounded-xl p-3 text-center text-purple-950 font-bold text-base sm:text-lg">
            Válassz ki pontosan <strong>3 kártyát</strong> úgy, hogy az összegük{' '}
            <span className="text-2xl font-black text-purple-700 mx-1">{trio.target}</span> legyen!
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {trio.cards.map((num, idx) => {
              const isSel = selectedIdx.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleCard(idx)}
                  className={`w-16 h-20 rounded-2xl border-2 text-2xl font-black transition-all cursor-pointer min-h-[48px] ${
                    isSel
                      ? 'bg-purple-600 text-white border-purple-800 shadow-md scale-105'
                      : 'bg-slate-50 text-slate-900 border-slate-300 hover:border-purple-400'
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <div className="text-center text-sm font-bold text-slate-700">
            Kiválasztott kártyák: {selectedIdx.length} (3 kell) • Jelenlegi összeg:{' '}
            <span className="text-lg font-black text-purple-800">{chosenSum}</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <button
              type="button"
              onClick={checkTrio}
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newTrio}
              className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {msg2 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                msg2.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {msg2.text}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Add10G2Theory;
