import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SeqPlot, fmt, fmtInt, numIn } from './sumKit';
import {
  SequenceDefinitionSvg,
  ArithGeomCompareSvg,
  PartialSumThresholdSvg,
  PrintingMachineSvg,
  CyclistsSvg,
  CompoundInterestSvg
} from './SequencesSummaryFigures';

type SeqKind = 'szamtani' | 'mertani';
type FinMode = 'kamatos' | 'gyujto' | 'torleszto';

export const SequencesSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [kind, setKind] = useState<SeqKind>('mertani');
  const [a1, setA1] = useState<number>(6);
  const [d, setD] = useState<number>(3);
  const [q, setQ] = useState<number>(2);
  const [n, setN] = useState<number>(10);
  // Labor II
  const [mode, setMode] = useState<FinMode>('kamatos');
  const [amount, setAmount] = useState<number>(2000000);
  const [p, setP] = useState<number>(8);
  const [years, setYears] = useState<number>(2);

  const terms = useMemo(
    () => Array.from({ length: 12 }, (_, i) => (kind === 'szamtani' ? a1 + i * d : a1 * q ** i)),
    [kind, a1, d, q]
  );
  const an = kind === 'szamtani' ? a1 + (n - 1) * d : a1 * q ** (n - 1);
  const sn =
    kind === 'szamtani' ? ((2 * a1 + (n - 1) * d) / 2) * n : q === 1 ? n * a1 : (a1 * (q ** n - 1)) / (q - 1);

  const qf = 1 + p / 100;
  const fin = useMemo(() => {
    const rows: { k: number; v: number }[] = [];
    if (mode === 'kamatos') {
      for (let k = 0; k <= years; k++) rows.push({ k, v: amount * qf ** k });
      return { rows, result: amount * qf ** years };
    }
    if (mode === 'gyujto') {
      let bal = 0;
      for (let k = 1; k <= years; k++) {
        bal = (bal + amount) * qf;
        rows.push({ k, v: bal });
      }
      return { rows, result: (amount * qf * (qf ** years - 1)) / (qf - 1 || 1) };
    }
    const t = p === 0 ? amount / years : (amount * qf ** years * (qf - 1)) / (qf ** years - 1);
    let debt = amount;
    for (let k = 1; k <= years; k++) {
      debt = debt * qf - t;
      rows.push({ k, v: Math.max(0, Math.abs(debt) < 0.5 ? 0 : debt) });
    }
    return { rows, result: t };
  }, [mode, amount, years, qf, p]);

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="sorozatok"
      title="6. Sorozatok – rendszerező összefoglalás"
      subtitle="Számsorozatok megadása, számtani és mértani sorozat, összegképletek, kamatos kamat, gyűjtőjáradék és törlesztőrészlet – érettségi feladatokkal."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_osszefoglalas_sorozatok_tananyag.pdf"
      practiceTitle="Készen állsz az érettségi sorozatos feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'KÉPLETTÁR — SOROZATOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
                <div className="text-[11px] font-bold text-indigo-700">Számtani sorozat</div>
                <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">aₙ = a₁ + (n − 1)d</div>
                <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">Sₙ = (a₁ + aₙ)/2 · n</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
                <div className="text-[11px] font-bold text-rose-700">Mértani sorozat</div>
                <div className="font-mono text-sm font-black text-rose-900 dark:text-rose-200">aₙ = a₁ · qⁿ⁻¹</div>
                <div className="font-mono text-sm font-black text-rose-900 dark:text-rose-200">Sₙ = a₁ · (qⁿ − 1)/(q − 1), q ≠ 1</div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Kamatos kamat:</strong> Aₙ = A₀ · (1 + p/100)ⁿ – a kamattényező mindig a kamatozási időszakra vonatkozzon!
              </li>
              <li>q = 1 esetén Sₙ = n · a₁; a mértani sorozat kvóciense sosem 0.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Fogalmak, tételek, módszerek" badge="Tankönyv 138. o." badgeColor="indigo">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Számsorozat', 'Olyan függvény, amelynek értelmezési tartománya a pozitív egészek halmaza (N⁺), képhalmaza a valós számok halmaza. Jele {aₙ}, aₙ az n-edik tag.'],
            ['M', 'A sorozat megadása', 'Körülírással (a tagok tulajdonságával), képlettel (általános tag n függvényében), rekurzív módon (az előző tag(ok)ból + az első néhány tag).'],
            ['D', 'Számtani sorozat', 'A második tagtól kezdve aₙ − aₙ₋₁ állandó; ez a differencia, d. Pl. 3; 9; 15; 21; … (a₁ = 3, d = 6), 12; 7; 2; −3; … (d = −5).'],
            ['T', 'Számtani sorozat n-edik tagja', 'aₙ = a₁ + (n − 1) · d, pl. a₅ = a₁ + 4d.'],
            ['T', 'Számtani sorozat első n tagjának összege', 'Sₙ = (a₁ + aₙ)/2 · n, másként Sₙ = (2a₁ + (n − 1)d)/2 · n.'],
            ['D', 'Mértani sorozat', 'A második tagtól kezdve aₙ/aₙ₋₁ 0-tól különböző állandó; ez a kvóciens, q. Pl. 3; 6; 12; 24; … (q = 2), 108; −36; 12; −4; … (q = −1/3).'],
            ['T', 'Mértani sorozat n-edik tagja', 'aₙ = a₁ · qⁿ⁻¹, pl. a₁₆ = a₁ · q¹⁵.'],
            ['T', 'Mértani sorozat első n tagjának összege', 'q ≠ 1: Sₙ = a₁ · (qⁿ − 1)/(q − 1); q = 1: Sₙ = n · a₁.'],
            ['M', 'Kamatos kamat', 'A₀ összeg évi p%-os kamattal n év után: Aₙ = A₀ · (1 + p/100)ⁿ. Havi, napi kamatozásnál a kamattényező az adott időszakra vonatkozzon.'],
            ['M', 'Gyűjtőjáradék', 'Ugyanazon a számlán egyenlő időközönként azonos összeget helyezünk el (az alapösszeget rendszeresen ugyanannyival növeljük).'],
            ['M', 'Állandó törlesztőrészlet', 'A felvett hitelt azonos időközönként ugyanakkora összeggel fizetjük vissza.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SequenceDefinitionSvg />
          <ArithGeomCompareSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Pénzügyi számítások mértani sorozattal" badge="Módszerek" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Kamatos kamat:</strong> évente az összeg (1 + p/100)-szorosára nő, így az évenkénti egyenlegek mértani sorozatot alkotnak, q = 1 + p/100. Pl. 2 000 000 Ft évi 8%-kal 2 év alatt: 2 000 000 · 1,08² = <strong>2 332 800 Ft</strong>.
            </p>
            <p>
              <strong>Gyűjtőjáradék</strong> (minden év elején a Ft-ot teszünk be, évi p%): az n-edik év végén a · q + a · q² + … + a · qⁿ = <strong>a · q · (qⁿ − 1)/(q − 1)</strong>.
            </p>
            <p>
              <strong>Állandó törlesztőrészlet</strong> (H hitel, évi p%, n év, év végi részletek): H · qⁿ = t · (qⁿ⁻¹ + … + q + 1), ebből <strong>t = H · qⁿ · (q − 1)/(qⁿ − 1)</strong>.
            </p>
            <TheoryCallout type="info" title="Infláció">
              Évi 6%-os inflációnál a pénz vásárlóértéke évente az előző év 100/106-od részére csökken: n év után A₀/1,06ⁿ.
            </TheoryCallout>
          </div>
          <CompoundInterestSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: a 6; 12; … mértani sorozat" badge="Kidolgozott 1." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Egy mértani sorozat első tagja 6, második tagja 12.</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> q = 12/6 = 2, aₙ = 6 · 2ⁿ⁻¹ = (6/2) · 2ⁿ = <strong>3 · 2ⁿ</strong>.
              </li>
              <li>
                <strong>b)</strong> a₁₀ = 3 · 2¹⁰ = <strong>3072</strong> (ugyanaz, mint 6 · 2⁹).
              </li>
              <li>
                <strong>c)</strong> S₃₀ = 6 · (2³⁰ − 1)/(2 − 1) = 6 442 450 938 ≈ <strong>6,44 · 10⁹</strong>.
              </li>
              <li>
                <strong>d)</strong> 6 · (2ⁿ − 1) &gt; 10⁷ ⇒ 2ⁿ &gt; 10⁷/6 + 1 ⇒ n &gt; lg(10⁷/6 + 1)/lg 2 ≈ 20,67, tehát legalább <strong>21 tagot</strong> kell összeadni (a 2 alapú exponenciális függvény szigorúan nő, ezért a reláció nem fordul meg).
              </li>
            </ol>
          </div>
          <PartialSumThresholdSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladat: a nyomdagép értéke" badge="Kidolgozott 2." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy nyomdagép értéke 42 millió Ft; évente az előző évi 90%-ára esik vissza, de a karbantartás (évi 300 000 Ft) ennyivel növeli. Mennyit ér 8 év múlva?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>1 év múlva: 42 · 10⁶ · 0,9 + 300 000.</li>
              <li>2 év múlva: 42 · 10⁶ · 0,9² + 300 000 · (0,9 + 1).</li>
              <li>8 év múlva: 42 · 10⁶ · 0,9⁸ + 300 000 · (0,9⁷ + 0,9⁶ + … + 0,9 + 1).</li>
              <li>A zárójelben egy mértani sorozat első 8 tagjának összege (a₁ = 1, q = 0,9): (0,9⁸ − 1)/(0,9 − 1).</li>
              <li>
                Az érték: 19 788 221 Ft ≈ <strong>19 800 000 Ft</strong> (százezer Ft-ra kerekítve).
              </li>
            </ol>
          </div>
          <PrintingMachineSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Kidolgozott feladat: két kerékpáros" badge="Kidolgozott 3." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A és B 189 km-re van egymástól. A-ból délben indul egy kerékpáros: az első órában 21 km, utána óránként 1,4 km-rel kevesebb. B-ből 14 órakor indul egy másik: 18 km, majd óránként 2 km-rel több.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Az óránkénti utak számtani sorozatok: a₁ = 21, d_A = −1,4; b₁ = 18, d_B = 2.</li>
              <li>
                <strong>a)</strong> 16–17 óra: A-nak az 5., B-nek a 3. órája: a₅ = 21 + 4 · (−1,4) = <strong>15,4 km</strong>, b₃ = 18 + 2 · 2 = <strong>22 km</strong>.
              </li>
              <li>
                <strong>b)</strong> Ha A n órát halad, B n − 2 órát: (2 · 21 + (n − 1)(−1,4))/2 · n + (2 · 18 + (n − 3) · 2)/2 · (n − 2) = 189.
              </li>
              <li>Rendezve: 0,3n² + 34,7n − 219 = 0, gyökei n₁ = −365/3 (nem jó) és n₂ = 6.</li>
              <li>
                <strong>18 órakor</strong> találkoznak, A-tól <strong>105 km</strong>-re (ellenőrzés: B útja 84 km, 105 + 84 = 189 ✓).
              </li>
            </ol>
          </div>
          <CyclistsSvg />
        </div>
      </TheorySection>

      <TheorySection title="6. Megoldott érettségi típusú feladatok" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Számtani sorozatok" badge="I. rész" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>2 és 54 közé két szám: 3d = 52, d = 52/3 ⇒ 58/3; 110/3.</li>
              <li>a₃ + a₄ + a₅ = 123 ⇒ 3a₄ = 123, a₄ = 41, d = 5 ⇒ a₆ = 51.</li>
              <li>a₁ = 7, d = −5/6: a₂₀ = 7 − 19 · 5/6 = −53/6, S₂₀ = −55/3.</li>
              <li>A kétjegyű páratlan számok összege: (11 + 99)/2 · 45 = 2475.</li>
              <li>Az 50. pozitív egész, amely 7-tel osztva 3 maradékot ad: 3 + 49 · 7 = 346.</li>
              <li>√5; √20; √45 = √5; 2√5; 3√5: számtani sorozat, d = √5.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mértani sorozatok" badge="I. rész + Ráadás" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₂ = −1/9, q = 3 ⇒ a₅ = a₂ · q³ = −3.</li>
              <li>a₃ = −7, a₅ = −112 ⇒ q² = 16 ⇒ q = 4 vagy q = −4.</li>
              <li>a₃ = −2, a₆ = 250 ⇒ q³ = −125, q = −5, a₁₀ = 250 · 5⁴ = 156 250.</li>
              <li>Ráadás (1893): a₃ = 50, a₇ = 31 250 ⇒ q⁴ = 625, q = ±5, a₁ = 2; q = 5: a₁₀ = 3 906 250, S₁₀ = 4 882 812.</li>
              <li>Rekurzió: −9; 4; −5; −1; −6; −7; −13 (minden tag az előző kettő összege – se nem számtani, se nem mértani).</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Cirkusz és összegek" badge="II. rész" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>12 sor, soronként +10 hely, az utolsóban 210 ⇒ a₁ = 100, S₁₂ = (100 + 210)/2 · 12 = 1860 néző.</li>
              <li>1 + 2 + … + n = 66 ⇒ n(n + 1)/2 = 66 ⇒ n = 11 tálca.</li>
              <li>1860 · 1500 Ft = 2 790 000 Ft, ennek 75%-a 2 092 500 Ft; havi 1%-kal egy év múlva 2 092 500 · 1,01¹² ≈ 2 357 881 Ft.</li>
              <li>2,3 cm-től d = 3 cm-es szakaszok, összeg 158 cm ⇒ 1,5n² + 0,8n − 158 = 0, n = 10, a leghosszabb 29,3 cm.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Pénzügyek" badge="II. rész" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>2 millió Ft, évi 8%, 2 év: 2 332 800 Ft.</li>
              <li>10 év, 7%, a végén 32 millió Ft ⇒ A₀ = 32 · 10⁶/1,07¹⁰ ≈ 16,27 millió Ft.</li>
              <li>6%-kal másfélszeres: 1,06ⁿ = 1,5 ⇒ n ≈ 6,96, tehát 7 év alatt.</li>
              <li>20 év alatt duplázódik: (1 + p/100)²⁰ = 2 ⇒ p ≈ 3,53%.</li>
              <li>Gyűjtőjáradék: 6 éven át minden év elején 1,2 millió Ft, 8%: 1,2 · 10⁶ · 1,08 · (1,08⁶ − 1)/0,08 ≈ 9 507 364 Ft.</li>
              <li>1,5 millió Ft hitel, 9%, 4 év, 4 egyenlő részlet: t ≈ 463 003 Ft.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: kitevő és összegképlet" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="aₙ = a₁ · qⁿ⁻¹, és a tagszám nem azonos a sorszámmal"
          wrong="A 6; 12; 24; … sorozat 10. tagja 6 · 2¹⁰ = 6144; a nyomdagép értékénél 0,9⁸ mellé 9 tag összegét írjuk."
          wrongExplanation="Az a₁-től a₁₀-ig csak 9-szer szorzunk q-val. A karbantartási összegek: 1 + 0,9 + … + 0,9⁷ – ez 8 tag (0,9⁰-tól 0,9⁷-ig)."
          correct="a₁₀ = 6 · 2⁹ = 3 · 2¹⁰ = 3072; a nyomdagépnél S₈ = (0,9⁸ − 1)/(0,9 − 1)."
          correctExplanation="Mindig számold meg, hány tag szerepel az összegben, és mennyi a kitevő az első és az utolsó tagban."
          tip="Ellenőrizd a képletet n = 1-re: a₁ · q⁰ = a₁ ✓, S₁ = a₁ ✓."
        />
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: számtani vagy mértani?" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['szamtani', 'mertani'] as SeqKind[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-100'}`}
                  >
                    {k === 'szamtani' ? 'Számtani sorozat' : 'Mértani sorozat'}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Első tag: a₁ = {fmt(a1)}</label>
                <input type="range" min="-10" max="10" step="0.5" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full accent-blue-600" aria-label="a1" />
              </div>
              {kind === 'szamtani' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Differencia: d = {fmt(d)}</label>
                  <input type="range" min="-5" max="5" step="0.5" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="d" />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kvóciens: q = {fmt(q)}</label>
                  <input type="range" min="-2" max="2" step="0.1" value={q} onChange={(e) => setQ(Math.abs(Number(e.target.value)) < 0.05 ? 0.1 : Number(e.target.value))} className="w-full accent-rose-600" aria-label="q" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tagszám: n = {n}</label>
                <input type="range" min="1" max="30" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-purple-600" aria-label="n" />
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900 space-y-1 font-mono">
                {kind === 'szamtani' ? (
                  <>
                    <div>
                      aₙ = {fmt(a1)} + ({n} − 1) · {fmt(d)} = <strong>{fmt(an, 3)}</strong>
                    </div>
                    <div>
                      Sₙ = ({fmt(a1)} + {fmt(an, 3)})/2 · {n} = <strong>{fmt(sn, 3)}</strong>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      aₙ = {fmt(a1)} · {fmt(q)}^{n - 1} = <strong>{Math.abs(an) >= 1e6 ? an.toExponential(3).replace('.', ',') : fmt(an, 4)}</strong>
                    </div>
                    <div>
                      Sₙ = {q === 1 ? `${n} · ${fmt(a1)}` : `${fmt(a1)} · (${fmt(q)}^${n} − 1)/(${fmt(q)} − 1)`} ={' '}
                      <strong>{Math.abs(sn) >= 1e6 ? sn.toExponential(3).replace('.', ',') : fmt(sn, 4)}</strong>
                    </div>
                  </>
                )}
              </div>
              <div className="text-xs text-slate-600">
                {kind === 'szamtani'
                  ? d > 0
                    ? 'd > 0: szigorúan növő; a pontok egy egyenesre esnek.'
                    : d < 0
                      ? 'd < 0: szigorúan csökkenő; a pontok egy egyenesre esnek.'
                      : 'd = 0: konstans sorozat.'
                  : q < 0
                    ? 'q < 0: a tagok előjele váltakozik (nem monoton).'
                    : q === 1
                      ? 'q = 1: konstans sorozat, Sₙ = n · a₁.'
                      : q > 1
                        ? 'q > 1: |aₙ| exponenciálisan nő.'
                        : '0 < q < 1: |aₙ| exponenciálisan csökken, a tagok 0-hoz tartanak.'}
              </div>
            </div>
            <SeqPlot values={terms} highlight={n <= 12 ? [n - 1] : []} className="w-full max-w-md h-auto mx-auto" w={320} h={210} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: pénzügyi kalkulátor" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['kamatos', 'Kamatos kamat'],
                    ['gyujto', 'Gyűjtőjáradék (év elején)'],
                    ['torleszto', 'Törlesztőrészlet (év végén)']
                  ] as [FinMode, string][]
                ).map(([m, t]) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === m ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-purple-100'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>{mode === 'kamatos' ? 'Betét A₀ (Ft):' : mode === 'gyujto' ? 'Évi befizetés a (Ft):' : 'Hitel H (Ft):'}</span>
                <input type="number" min="0" step="100000" value={amount} onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} className={`${numIn} w-32`} aria-label="összeg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Éves kamat: p = {fmt(p)}%</label>
                <input type="range" min="0" max="15" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-purple-600" aria-label="p" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Futamidő: n = {years} év</label>
                <input type="range" min="1" max="20" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-amber-600" aria-label="n év" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: '2 millió, 8%, 2 év', v: ['kamatos', 2000000, 8, 2] },
                  { t: 'Gyűjtő: 1,2 millió, 8%, 6 év', v: ['gyujto', 1200000, 8, 6] },
                  { t: 'Hitel: 1,5 millió, 9%, 4 év', v: ['torleszto', 1500000, 9, 4] }
                ].map((pr) => (
                  <button
                    key={pr.t}
                    onClick={() => {
                      setMode(pr.v[0] as FinMode);
                      setAmount(pr.v[1] as number);
                      setP(pr.v[2] as number);
                      setYears(pr.v[3] as number);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100"
                  >
                    {pr.t}
                  </button>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900">
                {mode === 'kamatos' && (
                  <div>
                    Aₙ = {fmtInt(amount)} · {fmt(qf, 4)}^{years} ≈ <strong>{fmtInt(fin.result)} Ft</strong>
                  </div>
                )}
                {mode === 'gyujto' && (
                  <div>
                    a · q · (qⁿ − 1)/(q − 1) ≈ <strong>{fmtInt(p === 0 ? amount * years : fin.result)} Ft</strong> (befizetve {fmtInt(amount * years)} Ft)
                  </div>
                )}
                {mode === 'torleszto' && (
                  <div>
                    t = H · qⁿ · (q − 1)/(qⁿ − 1) ≈ <strong>{fmtInt(fin.result)} Ft/év</strong> (összesen {fmtInt(fin.result * years)} Ft)
                  </div>
                )}
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Év</th>
                    <th className="p-2 text-right">{mode === 'torleszto' ? 'Fennmaradó tartozás (Ft)' : 'Egyenleg az év végén (Ft)'}</th>
                  </tr>
                </thead>
                <tbody>
                  {fin.rows.map((r) => (
                    <tr key={r.k} className="border-t border-slate-100">
                      <td className="p-2">{r.k}.</td>
                      <td className="p-2 text-right font-mono">{fmtInt(r.v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SequencesSummaryTheory;
