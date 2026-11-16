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
  CompareLineSvg,
  TempChangeSvg,
  FabatkaSvg,
  DebtSlipSvg,
  WealthChangeSvg,
  WalletGroup,
  MiniLine,
  fmtNum
} from './NegativeChangesFigures';

/** A pénztárca értéke: készpénz − adósság (fabatkában). */
export const wealth = (cash: number, debt: number): number => cash - debt;

/** Hány fokot változott a hőmérséklet a-ról b-re (mindig pozitív szám). */
export const tempDiff = (a: number, b: number): number => Math.abs(a - b);

/** Hőmérsékletek sorba rendezése növekvő ('asc') vagy csökkenő ('desc') sorrendbe. */
export const sortTemps = (list: number[], dir: 'asc' | 'desc'): number[] =>
  [...list].sort((a, b) => (dir === 'asc' ? a - b : b - a));

// ---------------------------------------------------------------------------
// Labor I – Fabatka-pénztárca
// ---------------------------------------------------------------------------
export const FABATKA_TARGETS = [4, 5, -1, -4, 3, 0, -2];

const FabatkaLab: React.FC = () => {
  const [cash, setCash] = useState(0);
  const [debt, setDebt] = useState(0);
  const [ti, setTi] = useState(0);
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const target = FABATKA_TARGETS[ti];
  const value = wealth(cash, debt);

  const btn = 'h-12 rounded-xl text-sm font-black border-2';
  const check = () => {
    if (value === target)
      setMsg({ ok: true, t: `Ügyes! ${cash} fabatka és ${debt} adósság együtt ${fmtNum(value)} fabatka.` });
    else
      setMsg({
        ok: false,
        t: `Most ${fmtNum(value)} fabatkát ér a pénztárcád. ${value < target ? 'Tegyél bele készpénzt, vagy vegyél ki adósságot!' : 'Tegyél bele adósságot, vagy vegyél ki készpénzt!'}`
      });
  };
  const repay = () => {
    const p = Math.min(cash, debt);
    setCash(cash - p);
    setDebt(debt - p);
    setMsg(null);
  };

  return (
    <div className="bg-white border-2 border-fuchsia-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-bold text-slate-600">Feladat:</span>
        {FABATKA_TARGETS.map((t, i) => (
          <button
            key={i}
            onClick={() => {
              setTi(i);
              setMsg(null);
            }}
            className={`px-3 h-10 rounded-xl text-sm font-black ${i === ti ? 'bg-fuchsia-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {fmtNum(t)}
          </button>
        ))}
      </div>
      <div className="text-center text-sm text-slate-700">
        Rakj ki a pénztárcába <strong className="text-fuchsia-700 text-lg">{fmtNum(target)} fabatkányi</strong> vagyont!
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 220 170" className="w-full max-w-[280px] h-auto mx-auto">
          <WalletGroup x={20} y={14} cash={cash} debt={debt} w={180} h={110} />
          <MiniLine min={-10} max={10} y={150} x0={14} x1={196} marks={[{ v: Math.max(-10, Math.min(10, value)), color: '#c026d3' }]} />
        </svg>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setCash(Math.min(14, cash + 1)); setMsg(null); }} className={`${btn} bg-red-50 border-red-300 text-red-700`}>+ ● készpénz</button>
            <button onClick={() => { setDebt(Math.min(14, debt + 1)); setMsg(null); }} className={`${btn} bg-blue-50 border-blue-300 text-blue-800`}>+ ■ adósság</button>
            <button onClick={() => { setCash(Math.max(0, cash - 1)); setMsg(null); }} className={`${btn} bg-white border-red-200 text-red-600`}>− ● kivesz</button>
            <button onClick={() => { setDebt(Math.max(0, debt - 1)); setMsg(null); }} className={`${btn} bg-white border-blue-200 text-blue-700`}>− ■ kivesz</button>
          </div>
          <button onClick={repay} className={`${btn} w-full bg-amber-50 border-amber-300 text-amber-800`}>
            Törlesztés: ● + ■ párok kivétele
          </button>
          <div className="text-center text-sm text-slate-600">
            {cash} ● − {debt} ■ = <strong className="text-xl text-slate-800">{fmtNum(value)}</strong> fabatka
          </div>
          <button onClick={check} className="w-full h-12 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black">
            Ellenőrzöm
          </button>
          {msg && <div className={`text-sm font-bold text-center ${msg.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{msg.t}</div>}
        </div>
      </div>
      <p className="text-xs text-slate-500">Tipp: ugyanazt a vagyont többféleképpen is kirakhatod! A 4 fabatka lehet 4 ●, de 6 ● és 2 ■ is.</p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Rendezd sorba a hőmérsékleteket!
// ---------------------------------------------------------------------------
export const ORDER_SETS: { list: number[]; dir: 'asc' | 'desc'; src: string }[] = [
  { list: [-2, -7, -5, 0, -17, 13], dir: 'asc', src: 'Munkafüzet 84. o., 7. a)' },
  { list: [25, -4, 1, -8, 6, -10], dir: 'desc', src: 'Munkafüzet 84. o., 7. b)' },
  { list: [-21, -30, -5, -3, 0, 18], dir: 'desc', src: 'Tankönyv 89. o., 3. b)' },
  { list: [-89, -45, -3, 0, 3], dir: 'asc', src: 'Munkafüzet 83. o., 5. a)' }
];

const OrderLab: React.FC = () => {
  const [si, setSi] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const set = ORDER_SETS[si];
  const sorted = sortTemps(set.list, set.dir);
  const done = picked.length === sorted.length;

  const click = (v: number) => {
    if (done || picked.includes(v)) return;
    if (v === sorted[picked.length]) {
      setPicked([...picked, v]);
      setWrong(null);
    } else setWrong(v);
  };

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {ORDER_SETS.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setSi(i);
              setPicked([]);
              setWrong(null);
            }}
            className={`px-3 h-10 rounded-xl text-xs font-black ${i === si ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}. sor
          </button>
        ))}
      </div>
      <div className="text-sm font-bold text-slate-700 text-center">
        Kattints a hőmérsékletekre <span className="text-orange-600">{set.dir === 'asc' ? 'növekvő sorrendben (a leghidegebbel kezdd)' : 'csökkenő sorrendben (a legmelegebbel kezdd)'}</span>! <span className="text-xs text-slate-400">({set.src})</span>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {set.list.map((v) => {
          const used = picked.includes(v);
          return (
            <button
              key={v}
              onClick={() => click(v)}
              className={`min-w-[84px] h-14 rounded-2xl text-lg font-black border-2 ${
                used ? 'bg-emerald-100 border-emerald-300 text-emerald-700 opacity-60' : wrong === v ? 'bg-rose-100 border-rose-400 text-rose-700' : v < 0 ? 'bg-blue-50 border-blue-300 text-blue-800' : 'bg-red-50 border-red-300 text-red-700'
              }`}
            >
              {fmtNum(v)} °C
            </button>
          );
        })}
      </div>
      <div className="min-h-[44px] rounded-xl bg-slate-50 border border-slate-200 p-3 text-center font-bold text-slate-700">
        {picked.map((v) => `${fmtNum(v)} °C`).join(set.dir === 'asc' ? ' < ' : ' > ') || '…'}
      </div>
      {wrong !== null && !done && (
        <div className="text-sm font-bold text-rose-700 text-center">
          A(z) {fmtNum(wrong)} °C még nem jön. {set.dir === 'asc' ? 'Keresd a leghidegebbet a maradékból – a 0-tól legmesszebb balra lévőt!' : 'Keresd a legmelegebbet a maradékból!'}
        </div>
      )}
      {done && (
        <TheoryCallout type="success" title="Kész a sor! 🎉">
          Jó sorrend! Emlékezz: a negatív számok közül az a nagyobb (melegebb), amelyik közelebb van a 0-hoz.
        </TheoryCallout>
      )}
    </div>
  );
};

export const NegativeChangesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-negatives"
      subtopicId="osszehasonlitas-es-valtozasok"
      title="3. Összehasonlítás és változások"
      subtitle="Melyik a nagyobb? Sorba rendezés, hőmérséklet-változás, készpénz és adósság a fabatkákkal."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="rose"
      pdfFilename="4_osztaly_osszehasonlitas_es_valtozasok_tananyag.pdf"
      practiceTitle="Készen állsz az összehasonlításra és a változásokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MELYIK A NAGYOBB?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
              <span className="font-mono text-base font-black text-rose-900 dark:text-rose-200">−14 &lt; −2 &lt; 0 &lt; 8</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A számegyenesen a jobbra lévő szám a nagyobb.</li>
              <li>Két negatív szám közül az a nagyobb, amelyik közelebb van a 0-hoz: −1 &gt; −2.</li>
              <li>Ha a változás átlépi a 0-t: a két részt összeadjuk (−5 °C → 2 °C: 5 + 2 = 7 fok).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 90. o., 9. feladat" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Tegyük a számkártyákat a számegyenesre! Ami jobbra van, az nagyobb, ami balra, az kisebb.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                A legkisebb a <strong>−14</strong>, a legnagyobb a <strong>11</strong>.
              </li>
              <li>A negatív számok: −2, −6, −5, −8, −14.</li>
              <li>Az 1-nél kisebb számok: a negatív számok és a 0.</li>
              <li>A −3-nál nagyobb számok: −2, 0, 8, 11.</li>
            </ul>
            <TheoryCallout type="info" title="Hőmérővel is megy">
              A hidegebb hőmérséklet a kisebb szám: −7 °C hidegebb, mint −2 °C, ezért −7 &lt; −2.
            </TheoryCallout>
          </div>
          <CompareLineSvg />
        </div>
      </TheorySection>

      {/* 2. Nyitott mondatok */}
      <TheorySection title="2. Nézzük meg együtt! Nyitott mondatok" badge="Tankönyv 90. o., 10. feladat; Munkafüzet 86. o." badgeColor="indigo">
        <TheoryTable
          headers={['Nyitott mondat', 'Gondolkodás a számegyenesen', 'Megoldások']}
          rows={[
            ['−3 < □ < 15', 'a −3-tól jobbra, a 15-től balra', '−2, −1, 0, 1, … 14'],
            ['20 > △ > −5', 'a −5-től jobbra, a 20-tól balra', '−4, −3, … 0, … 19'],
            ['−17 < ○ < −13', 'a −17 és a −13 között', '−16, −15, −14'],
            ['−1 □ −2', 'a −1 jobbra van a −2-től', '−1 > −2'],
            ['−20 □ −10', 'a −20 balra van a −10-től', '−20 < −10']
          ]}
        />
      </TheorySection>

      {/* 3. Igaz vagy hamis */}
      <TheorySection title="3. Igaz vagy hamis?" badge="Tankönyv 89. o., 6. feladat; Munkafüzet 84. o., 8. feladat" badgeColor="violet">
        <TheoryTable
          headers={['Állítás', 'I / H', 'Miért?']}
          rows={[
            ['Amikor −10 °C van, nincs olyan hideg, mint −1 °C-nál.', 'H', 'A −10 °C hidegebb.'],
            ['−5 °C-ról 2 °C-ra: 7 °C-ot melegedett.', 'I', '5 fok a 0-ig, még 2 fok: 7.'],
            ['−4 °C-ról −8 °C-ra: 4 °C-ot hűlt.', 'I', '8 − 4 = 4.'],
            ['−11 °C-ról 3 °C-ra: 14 °C-ot emelkedett.', 'I', '11 + 3 = 14.'],
            ['−6 °C-ról 0 °C-ra: nem melegedett.', 'H', '6 fokot melegedett.'],
            ['A −16 °C hidegebb, mint a −17 °C.', 'H', 'A −17 °C a hidegebb.']
          ]}
        />
      </TheorySection>

      {/* 4. Hőmérséklet-változás */}
      <TheorySection title="4. Hány fokkal változott?" badge="Munkafüzet 83. o., 4–6. feladat; 85. o., 11. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TempChangeSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Ha a 0 egyik oldalán maradunk</strong>, kivonunk: −4 °C → −19 °C: 19 − 4 = <strong>15 °C-kal</strong> lett hidegebb.
            </p>
            <p>
              <strong>Ha átlépjük a 0-t</strong>, összeadjuk a két részt: −11 °C → 3 °C: 11 + 3 = <strong>14 °C-ot</strong> emelkedett.
            </p>
          </div>
        </div>
        <TheoryTable
          headers={['Honnan', 'Hová', 'Ennyivel lett hidegebb']}
          rows={[
            ['−4 °C', '−19 °C', '15 °C'],
            ['−8 °C', '−36 °C', '28 °C'],
            ['−1 °C', '−21 °C', '20 °C'],
            ['−51 °C', '−54 °C', '3 °C'],
            ['−36 °C', '−45 °C', '9 °C'],
            ['−19 °C', '−45 °C', '26 °C']
          ]}
        />
        <TheoryCard title="Szabálytáblázat: ▲ = ● − 3 °C" badge="Munkafüzet 85. o., 11. feladat" badgeColor="sky">
          <p className="text-sm text-slate-700">
            ● = −3 °C → ▲ = −6 °C • ● = −10 °C → ▲ = −13 °C • ● = −5 °C → ▲ = −8 °C • ▲ = −7 °C → ● = −4 °C. A ▲ mindig 3 fokkal hidegebb a ●-nál.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 5. Fabatkák */}
      <TheorySection title="5. Készpénz és adósság – a fabatkák" badge="Tankönyv 92. o., 16–20. feladat" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FabatkaSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A piros kör 1 fabatka <strong>készpénz</strong>, a kék négyzet 1 fabatka <strong>adósság</strong>. 1 fabatka adósságot 1 fabatka készpénzzel törleszthetsz: egy kör és egy négyzet együtt 0.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>7 fabatka és 2 adósságcédula: 7 − 2 = <strong>5</strong>.</li>
              <li>6 fabatka és 3 adósságcédula: <strong>3</strong>.</li>
              <li>9 fabatka és 10 adósságcédula: 1 adósság marad, <strong>−1</strong>.</li>
              <li>9 fabatka és 13 adósságcédula: 4 adósság marad, <strong>−4</strong>.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <TheoryCard title="Kriszti adósságcédulája" badge="18. feladat" badgeColor="indigo">
            <DebtSlipSvg />
            <p className="text-sm text-slate-700 mt-2">500 Ft készpénz és 200 Ft tartozás együtt 500 − 200 = <strong>300 Ft</strong>-ot ér.</p>
          </TheoryCard>
          <TheoryCard title="Mennyit kell kölcsönkérni?" badge="20. feladat; Munkafüzet 87. o., 18." badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Zitának 500 Ft-ja van, az újság 690 Ft. Kölcsön kell kérnie: 690 − 500 = <strong>190 Ft</strong>-ot, így 190 Ft adóssága lesz.
            </p>
            <p className="text-sm text-slate-700 mt-2">
              Ha 50 Ft-od van, és 2080 Ft a tartozásod, még 2080 − 50 = <strong>2030 Ft</strong>-ot kell gyűjtened.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Vagyon változása */}
      <TheorySection title="6. Hogyan változott a vagyon?" badge="Munkafüzet 87. o., 19. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <WealthChangeSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Az „n” azt jelenti, hogy nőtt, a „cs” azt, hogy csökkent a vagyon.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1500 Ft → 2000 Ft: nőtt 500 Ft-tal.</li>
              <li>2500 Ft → 1800 Ft: csökkent 700 Ft-tal.</li>
              <li>500 Ft → −1000 Ft: csökkent 500 + 1000 = 1500 Ft-tal.</li>
              <li>−1500 Ft → 2000 Ft: nőtt 1500 + 2000 = 3500 Ft-tal.</li>
              <li>−1500 Ft → −5000 Ft: csökkent 5000 − 1500 = 3500 Ft-tal.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz! Átléptük a 0-t?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="−5 °C-ról 2 °C-ra nem 3 fokot melegedett"
          wrong="−5 °C → 2 °C: 5 − 2 = 3 fokot melegedett."
          wrongExplanation="A két számot kivonta egymásból, pedig a hőmérséklet átlépte a 0-t."
          correct="−5 °C → 2 °C: 5 + 2 = 7 fokot melegedett."
          correctExplanation="−5 °C-tól a 0 °C-ig 5 fok, a 0 °C-tól a 2 °C-ig még 2 fok."
          tip="Rajzolj hőmérőt vagy számegyenest, és számold meg a lépéseket a 0-n át!"
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Fabatka-pénztárca" badge="Labor" badgeColor="purple">
        <p className="text-sm text-slate-600">
          Rakd ki a kért vagyont piros készpénzzel és kék adóssággal! A „Törlesztés” gomb kiveszi a ● + ■ párokat – az érték nem változik. A számegyenesen is látod, hol tartasz.
        </p>
        <FabatkaLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Rendezd sorba!" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-600">Kattints a hőmérsékletekre a kért sorrendben! Ha rossz kártyát választasz, segítünk.</p>
        <OrderLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NegativeChangesTheory;
