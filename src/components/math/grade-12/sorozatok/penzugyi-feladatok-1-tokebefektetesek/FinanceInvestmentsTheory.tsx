import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SimpleVsCompoundSvg, QuarterlyCompoundingSvg, SavingsTimelineSvg, CarDepreciationSvg, TwoPhaseSavingsSvg } from './FinanceInvestmentsFigures';
import { SeqBarChart, SText, fmtHu, fmtFt, S_BLUE, S_RED, S_GREEN } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

const PERIODS: { m: number; name: string }[] = [
  { m: 1, name: 'évente' },
  { m: 2, name: 'félévente' },
  { m: 4, name: 'negyedévente' },
  { m: 12, name: 'havonta' }
];

export const FinanceInvestmentsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kamatos kamat kalkulátor
  const [k0, setK0] = useState<number>(1000000);
  const [p, setP] = useState<number>(8);
  const [years, setYears] = useState<number>(10);
  const [m, setM] = useState<number>(1);
  // Labor II: gyűjtőjáradék
  const [dep, setDep] = useState<number>(20000);
  const [p2, setP2] = useState<number>(6);
  const [monthly, setMonthly] = useState<boolean>(true);
  const [periods, setPeriods] = useState<number>(24);

  const qPer = 1 + p / 100 / m;
  const compound = useMemo(() => Array.from({ length: years }, (_, i) => k0 * qPer ** (m * (i + 1))), [k0, qPer, m, years]);
  const simple = useMemo(() => Array.from({ length: years }, (_, i) => k0 * (1 + (p / 100) * (i + 1))), [k0, p, years]);
  const finalC = compound[compound.length - 1] ?? k0;
  const finalS = simple[simple.length - 1] ?? k0;
  const effective = (qPer ** m - 1) * 100;

  const q2 = 1 + p2 / 100 / (monthly ? 12 : 1);
  const balances = useMemo(() => Array.from({ length: periods }, (_, i) => (dep * q2 * (q2 ** (i + 1) - 1)) / (q2 - 1)), [dep, q2, periods]);
  const finalB = balances[balances.length - 1] ?? 0;
  const paidIn = dep * periods;

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="penzugyi-feladatok-1-tokebefektetesek"
      title="8. Pénzügyi feladatok I. – tőkebefektetések"
      subtitle="Tőke, kamat, kamatláb; egyszerű és kamatos kamatozás, jóváírási periódusok és a gyűjtőjáradék mint mértani sorozat."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="12_osztaly_penzugyi_feladatok_tokebefektetesek_tananyag.pdf"
      practiceTitle="Készen állsz a pénzügyi számításokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KAMATOS KAMAT ÉS GYŰJTŐJÁRADÉK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                Kₙ = K₀ · qⁿ, q = 1 + p/100 · gyűjtőjáradék: Sₙ = x · q · (qⁿ − 1)/(q − 1)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A kamatlábat éves időtartamra és egyszerű kamatozásra adják meg: havi jóváírásnál a havi kamatláb p/12 %.</li>
              <li>Periódus eleji befizetésnél az első befizetés n-szer, az utolsó egyszer kamatozik.</li>
              <li>Ismeretlen kamatláb: q = ⁿ√(Kₙ/K₀); ismeretlen idő: n = lg(Kₙ/K₀)/lg q.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Elmélet: tőke, kamat, kamatláb" badge="Tankönyv 66. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A pénzügyi számítások alapja, hogy a pénz értéke az idő múlásával változik: a ma meglévő 10 000 Ft az infláció miatt „többet ér”, mint 3 év múlva ugyanennyi.
            </p>
            <TheoryTable
              headers={['Fogalom', 'Jelentés']}
              rows={[
                ['tőke', 'a bankba tett, lekötött pénzösszeg (K₀)'],
                ['kamat', 'az a pénzösszeg, amivel a tőke megnő'],
                ['kamatláb (p%)', 'megadja, hogy a kamat hányszorosa (hány százaléka) a tőkének'],
                ['egyszerű kamatozás', 'a kamat nem adódik a tőkéhez (pl. kivesszük): Kₙ = K₀(1 + n · p/100)'],
                ['kamatos kamatozás', 'a kamat a tőkéhez adódik, és vele együtt kamatozik tovább: Kₙ = K₀ · qⁿ']
              ]}
            />
          </div>
          <SimpleVsCompoundSvg />
        </div>
        <TheoryCallout type="info" title="Éves kamatláb, rövidebb jóváírási periódus">
          A bankoknak a kamatlábat éves időtartamra és egyszerű kamatozásra kell megadniuk. Ha a negyedévre lekötött tőke kamata 3%, a kamatláb évi 12%. Ezért havi,
          negyedéves vagy féléves kamatos kamatozásnál a valódi növekedés (hozam) nagyobb a kamatlábnál. (A kamatadótól a feladatokban általában eltekintünk.)
        </TheoryCallout>
        <QuarterlyCompoundingSvg />
      </TheorySection>

      <TheorySection title="2. Gyűjtőjáradék – kidolgozott feladat" badge="Tankönyv 66. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A megtakarítás gyakori módja, hogy egyenlő időszakonként azonos összeget teszünk egy <strong>gyűjtőszámlára</strong>. A tőke így a betett összegekkel és azok
              kamatos kamataival is nő.
            </p>
            <p>
              <strong>Dalma</strong> minden hónap elején 20 000 Ft-ot tesz gyűjtőszámlára, az éves kamat 6%, a jóváírás havonta, a hónap végén történik. Mennyi lesz a
              számláján 2 év múlva?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Havi kamatláb: 6% : 12 = 0,5%, q = 1,005.</li>
              <li>Az 1. befizetés 24-szer, a 2. 23-szor, …, a 24. egyszer kamatozik: 20 000 · 1,005²⁴ + 20 000 · 1,005²³ + … + 20 000 · 1,005.</li>
              <li>Fordított sorrendben mértani sorozat: első tag 20 000 · 1,005, kvóciens 1,005, 24 tag.</li>
              <li>
                S₂₄ = 20 000 · 1,005 · (1,005²⁴ − 1)/(1,005 − 1) ≈ <strong>511 182 Ft</strong> – ez 31 182 Ft-tal több a befizetett 480 000 Ft-nál.
              </li>
            </ul>
          </div>
          <SavingsTimelineSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Mekkora volt a kamatláb?" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>6 millió Ft 5 év alatt, évenkénti jóváírással 7 millió Ft lett.</li>
              <li>6 · q⁵ = 7 ⇒ q = ⁵√(7/6) ≈ 1,0313.</li>
              <li>
                Az éves kamatláb ≈ <strong>3,13%</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Dávid egyenlő befizetései" badge="5. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>4 éven át minden év elején x Ft, 7%, a 4. kamatozás után 1 140 000 Ft.</li>
              <li>x · 1,07 · (1,07⁴ − 1)/0,07 = 1 140 000 ⇒ x · 4,7507 ≈ 1 140 000.</li>
              <li>
                x ≈ <strong>239 963 Ft</strong> volt egy-egy befizetés.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Az új autó értékcsökkenése (érettségi feladat, 2022)" badge="2. feladat" badgeColor="rose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <CarDepreciationSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a) Lineáris modell: 5 év = 60 hónap alatt 3 millió Ft a csökkenés ⇒ havonta <strong>50 000 Ft</strong>.</li>
              <li>
                b) Exponenciális modell, havonta −1%: 2 év után 6 000 000 · 0,99²⁴ ≈ <strong>4 714 069 Ft</strong>, ez ≈ <strong>21,4%</strong>-os csökkenés.
              </li>
              <li>
                Felére: 0,99ⁿ = 0,5 ⇒ n = lg 0,5 / lg 0,99 ≈ 68,97 ⇒ kb. <strong>69 hónap</strong> alatt.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCard title="D) Ferenc két szakaszos gyűjtőszámlája" badge="3. feladat" badgeColor="emerald">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <TwoPhaseSavingsSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>1–2. év: év elején 200 000 Ft, 7%: 2. év végén 200 000 · 1,07² + 200 000 · 1,07 = 442 980 Ft.</li>
              <li>3–4. év: év elején 300 000 Ft, 9%: 442 980 · 1,09² + 300 000 · 1,09² + 300 000 · 1,09.</li>
              <li>
                A 4. év végén ≈ <strong>1 209 735 Ft</strong> van a számlán.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryTable
          headers={['Feladat', 'Számolás', 'Eredmény']}
          rows={[
            ['4. Cigaretta helyett megtakarítás (havi 10 000 Ft, 10 év, évi 6%)', '10 000 · 1,005 · (1,005¹²⁰ − 1)/0,005', '≈ 1 646 987 Ft'],
            ['HF 1. A: 9,8% évente vagy B: 9,6% havonta (2 év)?', '1,098² ≈ 1,2056; 1,008²⁴ ≈ 1,2107', 'B előnyösebb'],
            ['HF 2. 3 millió → 4,7 millió Ft 12 év alatt', 'q = ¹²√(4,7/3) ≈ 1,0381', '≈ 3,81%'],
            ['HF 3. a) Csilla: 500 000 Ft, 8%, 18 év', '500 000 · 1,08¹⁸', '≈ 1 998 010 Ft'],
            ['HF 3. b) Csongor: 400 000 → 2 000 000 Ft, 36 félév', 'q = ³⁶√5 ≈ 1,0457', 'félévi ≈ 4,57%'],
            ['HF 4. Zsuzsa: 5 éven át év elején 350 000 Ft, 7,5%', '350 000 · 1,075 · (1,075⁵ − 1)/0,075', '≈ 2 185 407 Ft']
          ]}
        />
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: kamatláb és jóváírási periódus" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Havi jóváírásnál nem az éves kamatlábbal hatványozunk"
          wrong="Évi 6%, havi jóváírás, 2 év: 20 000 · 1,06²⁴ …"
          wrongExplanation="Az éves kamatláb egyszerű kamatozásra vonatkozik; havi jóváírásnál a havi kamatláb 6% : 12 = 0,5%, a kitevő pedig a hónapok száma."
          correct="q = 1,005 és 24 periódus: 20 000 · 1,005 · (1,005²⁴ − 1)/0,005 ≈ 511 182 Ft."
          correctExplanation="Periódus eleji befizetésnél az első tag x · q (már az első periódus végén kamatozik); periódus végi befizetésnél az első tag x."
          tip="A 10%-os 2 éves kamatos növekedés nem 20%, hanem 1,1² − 1 = 21%."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: kamatos kamat kalkulátor" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tőke: K₀ = {fmtFt(k0)} Ft</label>
                <input type="range" min="100000" max="10000000" step="100000" value={k0} onChange={(e) => setK0(Number(e.target.value))} className="w-full accent-blue-600" aria-label="tőke" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Éves kamatláb: p = {fmtHu(p, 1)}%</label>
                <input type="range" min="0.5" max="20" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="kamatláb" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Futamidő: {years} év</label>
                <input type="range" min="1" max="30" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-amber-600" aria-label="évek" />
              </div>
              <div className="flex flex-wrap gap-2">
                {PERIODS.map((o) => (
                  <button
                    key={o.m}
                    onClick={() => setM(o.m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${m === o.m ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    jóváírás {o.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-rose-50 rounded-xl p-2 border border-rose-200">
                  <div className="text-[11px] text-slate-500">kamatos kamattal</div>
                  <div className="font-mono font-black text-rose-900 text-sm">{fmtFt(finalC)} Ft</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">egyszerű kamattal</div>
                  <div className="font-mono font-black text-blue-900 text-sm">{fmtFt(finalS)} Ft</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">valódi éves hozam</div>
                  <div className="font-mono font-black text-emerald-900 text-sm">{fmtHu(effective, 3)}%</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Periódusonkénti kamatláb: {fmtHu(p / m, 3)}%, q = {fmtHu(qPer, 5)}, periódusok száma: {m * years}.
              </p>
            </div>
            <svg viewBox="0 0 320 230" className="w-full h-auto" role="img" aria-label="a tőke növekedése évenként">
              <SeqBarChart values={compound.map((v) => v / 1e6)} line={simple.map((v) => v / 1e6)} x={40} y={20} w={260} h={170} color={S_RED} lineColor={S_BLUE} labelEvery={years > 12 ? 5 : 1} />
              <SText x={170} y={224} t="piros: kamatos kamat · kék: egyszerű kamat (millió Ft)" s={10} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: gyűjtőjáradék" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setMonthly(true);
                    setPeriods(24);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${monthly ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  havi befizetés, havi jóváírás
                </button>
                <button
                  onClick={() => {
                    setMonthly(false);
                    setPeriods(5);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!monthly ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  éves befizetés, éves jóváírás
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Befizetés periódusonként (a periódus elején): {fmtFt(dep)} Ft</label>
                <input type="range" min="5000" max="500000" step="5000" value={dep} onChange={(e) => setDep(Number(e.target.value))} className="w-full accent-purple-600" aria-label="befizetés" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Éves kamatláb: {fmtHu(p2, 1)}%</label>
                <input type="range" min="0.5" max="15" step="0.5" value={p2} onChange={(e) => setP2(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="kamatláb" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Periódusok száma: {periods} {monthly ? 'hónap' : 'év'}
                </label>
                <input type="range" min="1" max={monthly ? 120 : 30} value={periods} onChange={(e) => setPeriods(Number(e.target.value))} className="w-full accent-amber-600" aria-label="periódusok" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                  <div className="text-[11px] text-slate-500">egyenleg a végén</div>
                  <div className="font-mono font-black text-purple-900 text-sm">{fmtFt(finalB)} Ft</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-[11px] text-slate-500">befizetve</div>
                  <div className="font-mono font-black text-slate-900 text-sm">{fmtFt(paidIn)} Ft</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">kamatokból</div>
                  <div className="font-mono font-black text-emerald-900 text-sm">{fmtFt(finalB - paidIn)} Ft</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Sₙ = x · q · (qⁿ − 1)/(q − 1), q = {fmtHu(q2, 5)}. Próbáld ki: 20 000 Ft, 6%, 24 hónap ⇒ 511 182 Ft (Dalma); 350 000 Ft, 7,5%, 5 év ⇒ 2 185 407 Ft (Zsuzsa).
              </p>
            </div>
            <svg viewBox="0 0 320 230" className="w-full h-auto" role="img" aria-label="a gyűjtőszámla egyenlege periódusonként">
              <SeqBarChart
                values={balances}
                line={balances.map((_, i) => dep * (i + 1))}
                x={40}
                y={20}
                w={260}
                h={170}
                color={S_GREEN}
                lineColor={S_BLUE}
                labelEvery={periods > 12 ? (periods > 60 ? 20 : 6) : 1}
              />
              <SText x={170} y={224} t="zöld: egyenleg · kék: befizetett összeg" s={10} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FinanceInvestmentsTheory;
