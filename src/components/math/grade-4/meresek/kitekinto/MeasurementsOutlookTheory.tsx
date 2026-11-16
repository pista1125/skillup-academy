import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { TankChartSvg, GrapeJuiceJugsSvg, FrogJumpsSvg, MarketTradeSvg, MarbleBoxSvg } from './MeasurementsOutlookFigures';

// ---------------------------------------------------------------------------
// Labor I: nagyapa szőlőleve – töltögetős feladvány (8, 5, 3 literes üveg)
// ---------------------------------------------------------------------------
const CAPS = [8, 5, 3] as const;
const START: [number, number, number] = [8, 0, 0];

// ---------------------------------------------------------------------------
// Labor II: békaverseny
// ---------------------------------------------------------------------------
const FROG_TASKS = [
  { a: 100, b: 185, target: 425 },
  { a: 100, b: 150, target: 300 },
  { a: 120, b: 200, target: 400 },
  { a: 90, b: 150, target: 240 }
];

export const MeasurementsOutlookTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [jugs, setJugs] = useState<[number, number, number]>(START);
  const [from, setFrom] = useState<number | null>(null);
  const [steps, setSteps] = useState<number>(0);
  const solved = jugs[0] === 4 && jugs[1] === 4;

  const clickJug = (i: number) => {
    if (solved) return;
    if (from === null) {
      if (jugs[i] > 0) setFrom(i);
      return;
    }
    if (from === i) {
      setFrom(null);
      return;
    }
    const amount = Math.min(jugs[from], CAPS[i] - jugs[i]);
    if (amount > 0) {
      const next = [...jugs] as [number, number, number];
      next[from] -= amount;
      next[i] += amount;
      setJugs(next);
      setSteps((s) => s + 1);
    }
    setFrom(null);
  };

  // Labor II
  const [fIdx, setFIdx] = useState<number>(0);
  const [n, setN] = useState<number>(0);
  const [guess, setGuess] = useState<number | null>(null);
  const ft = FROG_TASKS[fIdx];
  const per = ft.b - ft.a;
  const answer = ft.target / per;
  const diff = n * per;
  const guessOptions = [answer - 1, answer, answer + 1, answer + 2];
  const maxJ = answer + 2;
  const scale = 440 / (maxJ * ft.b);

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="kitekinto"
      title="8. Kitekintő"
      subtitle="Fejtörők a mérések világából: tartályok, szőlőlé átöntögetése, békaverseny, vásári csere és golyóhúzás."
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_meresek_kitekinto_tananyag.pdf"
      practiceTitle="Készen állsz a fejtörőkre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HOGYAN OLDJUNK MEG EGY FEJTÖRŐT?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="text-base font-black text-emerald-900 dark:text-emerald-200">Olvasd el • Rajzold le • Próbálgass • Ellenőrizd!</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Készíts táblázatot vagy rajzot: így jobban látod, mi változik lépésről lépésre.</li>
              <li>Figyeld, mennyivel nő a különbség egy lépésben (pl. ugrásonként 85 cm).</li>
              <li>A végén mindig ellenőrizd a választ a feladat szövegével!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Tartályok */}
      <TheorySection title="1. Mennyi fér a tartályokba?" badge="Tankönyv 69. o. 1. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TankChartSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Olvassuk le a diagramot! Egy osztás 100 liter.</p>
            <TheoryTable
              headers={['Tartály', 'Űrtartalma']}
              rows={[
                ['személyautó', '50 l'],
                ['traktor', '100 l'],
                ['autóbusz', '300 l'],
                ['mezőgazdasági helikopter', '800 l']
              ]}
            />
            <p>
              A legnagyobb és a legkisebb közötti különbség: 800 − 50 = <strong>750 l</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt! */}
      <TheorySection title="2. Nézzük meg együtt! Fejtörők" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GrapeJuiceJugsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) Nagyapa szőlőleve (Gárdonyi Géza története alapján).</strong> 8 liter szőlőlé van a 8 literes üvegben, mellette egy üres 5 literes és egy üres 3 literes üveg. A barátnak a felét, <strong>4 litert</strong> kell kimérni.
            </p>
            <p>Mérőeszköz nincs, csak az üvegeket tölthetjük át egymásba – mindig tele vagy üres lesz valamelyik. Próbáld ki a Laborban!</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FrogJumpsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>B) Békaverseny (3. feladat).</strong> A kecskebéka 1 m = 100 cm-t, az erdei béka 185 cm-t ugrik egyszerre.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egy ugrás után a különbség: 185 − 100 = 85 cm.</li>
              <li>Minden ugrásnál újabb 85 cm-rel nő: 85, 170, 255, 340, <strong>425</strong> cm.</li>
              <li>425 : 85 = 5 → az <strong>5. ugrásnál</strong> van 425 cm-rel előrébb.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MarketTradeSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>C) A debridai vásár (4. feladat).</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>2 ló = 4 szamár, tehát 4 ló = 8 szamár.</li>
              <li>2 szamár = 5 kecske, tehát 8 szamár = 4 · 5 = 20 kecske.</li>
              <li>4 lóért <strong>20 kecskét</strong> kell adni.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MarbleBoxSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>D) Mona golyói (5. feladat).</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>7 golyó kell, hogy biztosan legyen piros: a legrosszabb esetben először az összes kéket húzzuk ki. Tehát <strong>6 kék</strong> van.</li>
              <li>13 kell, hogy biztosan legyen kétféle: a legrosszabb esetben először a több golyós szín mind kijön. Tehát az egyik színből 12 van – ez a <strong>piros: 12</strong>.</li>
              <li>Ellenőrzés: 6 kék + 1 = 7 ✓, 12 piros + 1 = 13 ✓.</li>
            </ul>
          </div>
        </div>
        <TheoryCallout type="info" title="Biztos, lehetetlen vagy lehet?">
          Mona dobozából <strong>biztosan</strong> piros vagy kék golyót húzunk. <strong>Lehetetlen</strong> zöldet húzni. Hogy az első golyó piros lesz-e: <strong>lehet, de nem biztos</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Vigyázz! */}
      <TheorySection title="3. Vigyázz! Nem a teljes távot kell összehasonlítani!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 425 cm-t az erdei béka ugrásával osztottad el?"
          wrong="425 : 185 ≈ 2, tehát a 2. ugrásnál"
          wrongExplanation="Nem az a kérdés, hogy az erdei béka mennyit ugrott, hanem hogy mennyivel van a másik előtt."
          correct="Egy ugrásnál 185 − 100 = 85 cm-rel kerül előbbre. 425 : 85 = 5 → az 5. ugrásnál."
          correctExplanation="Előbb nézd meg, mennyivel nő a különbség egy lépésben, és azzal oszd el a keresett különbséget!"
          tip="Ellenőrzés: 5 ugrás után az erdei béka 925 cm-nél, a kecskebéka 500 cm-nél jár. 925 − 500 = 425 cm."
        />
      </TheorySection>

      {/* 4. Labor I */}
      <TheorySection title="4. Labor I: Mérd ki a 4 liter szőlőlevet!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Koppints arra az üvegre, amelyikből töltesz, aztán arra, amelyikbe! Addig töltünk, amíg az egyik ki nem ürül, vagy a másik meg nem telik. Cél: a 8 literesben és az 5 literesben is 4 liter legyen.
          </p>
          <GrapeJuiceJugsSvg state={jugs} />
          <div className="grid grid-cols-3 gap-3">
            {CAPS.map((c, i) => (
              <button
                key={c}
                onClick={() => clickJug(i)}
                className={`min-h-[56px] rounded-xl border-2 font-bold text-lg transition active:scale-95 ${
                  from === i ? 'bg-purple-600 text-white border-purple-700' : 'bg-white border-purple-300 text-purple-900 hover:bg-purple-50'
                }`}
              >
                {c} l-es üveg: {jugs[i]} l
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold">Átöntések: {steps}</span>
            <button
              onClick={() => {
                setJugs(START);
                setFrom(null);
                setSteps(0);
              }}
              className="min-h-[44px] px-4 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 active:scale-95 transition"
            >
              Újrakezdem
            </button>
          </div>
          {from !== null && !solved && (
            <div className="p-2 rounded-xl text-center text-sm bg-purple-50 text-purple-900">A(z) {CAPS[from]} literesből töltesz. Melyikbe?</div>
          )}
          {solved && (
            <div className="p-3 rounded-xl text-center font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Sikerült {steps} átöntéssel! Nagyapa és a barátja is 4 liter szőlőlét kap. (A legrövidebb megoldás 7 átöntés.)
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. Labor II */}
      <TheorySection title="5. Labor II: Békaverseny" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              A kecskebéka <strong>{ft.a} cm</strong>-t, az erdei béka <strong>{ft.b} cm</strong>-t ugrik egyszerre. Hányadik ugrásnál lesz az erdei béka <strong>{ft.target} cm</strong>-rel előrébb?
            </p>
            <button
              onClick={() => {
                setFIdx((i) => (i + 1) % FROG_TASKS.length);
                setN(0);
                setGuess(null);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 active:scale-95 transition"
            >
              Új verseny
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {guessOptions.map((g) => {
              const cls =
                guess === null
                  ? 'bg-white border-slate-300 hover:bg-emerald-50'
                  : g === answer
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                    : g === guess
                      ? 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-white border-slate-200 opacity-60';
              return (
                <button key={g} onClick={() => guess === null && setGuess(g)} className={`min-h-[52px] rounded-xl border-2 font-bold text-lg transition active:scale-95 ${cls}`}>
                  {g}. ugrás
                </button>
              );
            })}
          </div>
          {guess !== null && (
            <div className={`p-2 rounded-xl text-center font-bold ${guess === answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {guess === answer ? 'Eltaláltad! Nézd meg az ugrásokkal is!' : 'Nem egészen. Ugrálj a békákkal, és figyeld a különbséget!'}
            </div>
          )}
          <svg viewBox="0 0 480 130" className="w-full h-auto bg-emerald-50/50 rounded-xl border border-emerald-200">
            <line x1="20" y1="45" x2="470" y2="45" stroke="#334155" strokeWidth="2" />
            <line x1="20" y1="105" x2="470" y2="105" stroke="#334155" strokeWidth="2" />
            <text x="20" y="20" fontSize="11" fill="#166534">erdei béka</text>
            <text x="20" y="80" fontSize="11" fill="#854d0e">kecskebéka</text>
            <text x={20 + n * ft.b * scale} y="42" textAnchor="middle" fontSize="22">🐸</text>
            <text x={20 + n * ft.a * scale} y="102" textAnchor="middle" fontSize="22">🐸</text>
            <text x="470" y="124" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0f172a">
              {n}. ugrás után: {n * ft.b} cm és {n * ft.a} cm
            </text>
          </svg>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setN((v) => Math.min(maxJ, v + 1))}
              className="min-h-[52px] px-6 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 active:scale-95 transition"
            >
              Ugrás!
            </button>
            <button
              onClick={() => setN(0)}
              className="min-h-[44px] px-4 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 active:scale-95 transition"
            >
              Vissza a rajthoz
            </button>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${diff === ft.target ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-700'}`}>
              Különbség: {diff} cm {diff === ft.target ? '– megvan!' : ''}
            </span>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Gondolkodj tovább!" badge="Kihívás" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Ha 3 ló lenne?" badge="vásár" badgeColor="amber">
            <p className="text-sm text-slate-700">3 ló = 6 szamár = 3 · 5 = 15 kecske, mert 2 szamár = 5 kecske.</p>
          </TheoryCard>
          <TheoryCard title="Hány autót tölt meg a helikopter tartálya?" badge="tartályok" badgeColor="emerald">
            <p className="text-sm text-slate-700">800 l : 50 l = 16 személyautó-tartály.</p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MeasurementsOutlookTheory;
