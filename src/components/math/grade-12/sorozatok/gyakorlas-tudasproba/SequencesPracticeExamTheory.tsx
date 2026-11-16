import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ChapterMapSvg, StairsFibonacciSvg, HorseshoeNailsSvg, InheritanceSvg, SalaryOffersSvg, RabbitsSvg } from './SequencesPracticeExamFigures';
import { SeqBarChart, SText, fmtHu, fmtFt, S_BLUE, S_RED, S_PURPLE } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

type Kind = 'ar' | 'ge' | 'fib';

export const SequencesPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: sorozatépítő
  const [kind, setKind] = useState<Kind>('ar');
  const [a1, setA1] = useState<number>(2);
  const [d, setD] = useState<number>(3);
  const [q, setQ] = useState<number>(1.5);
  const [n, setN] = useState<number>(10);
  // Labor II: fizetési ajánlatok
  const [start, setStart] = useState<number>(200000);
  const [raise, setRaise] = useState<number>(5000);
  const [pct, setPct] = useState<number>(2);
  const [months, setMonths] = useState<number>(48);

  const terms = useMemo(() => {
    const t: number[] = [];
    for (let i = 0; i < n; i++) {
      if (kind === 'ar') t.push(a1 + i * d);
      else if (kind === 'ge') t.push(a1 * q ** i);
      else t.push(i < 2 ? a1 : t[i - 1] + t[i - 2]);
    }
    return t;
  }, [kind, a1, d, q, n]);
  const sum = terms.reduce((s, x) => s + x, 0);

  const offerI = (months * (2 * start + (months - 1) * raise)) / 2;
  const qq = 1 + pct / 100;
  const offerII = (start * (qq ** months - 1)) / (qq - 1);
  const salI = Array.from({ length: months }, (_, i) => (start + i * raise) / 1000);
  const salII = Array.from({ length: months }, (_, i) => (start * qq ** i) / 1000);

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="gyakorlas-tudasproba"
      title="10. Gyakorlás, tudáspróba"
      subtitle="A teljes Sorozatok fejezet összefoglalása: képlettár, érettségi típusú feladatok és a tankönyv tudáspróbája megoldásokkal."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_sorozatok_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten a teljes Sorozatok fejezetből!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FEJEZET KÉT FŐ SOROZATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                számtani: aₙ = a₁ + (n − 1)d · mértani: aₙ = a₁ · qⁿ⁻¹
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Számtani összeg: Sₙ = (a₁ + aₙ)/2 · n = (2a₁ + (n − 1)d)/2 · n.</li>
              <li>Mértani összeg: Sₙ = a₁(qⁿ − 1)/(q − 1), ha q ≠ 1; q = 1 esetén Sₙ = n · a₁.</li>
              <li>Pénzügyek: Kₙ = K₀ · qⁿ; gyűjtőjáradék x · q(qⁿ − 1)/(q − 1); hitelrészlet x = T · qⁿ(q − 1)/(qⁿ − 1).</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Összefoglalás: képlettár" badge="1–9. lecke" badgeColor="violet">
        <ChapterMapSvg />
        <TheoryTable
          headers={['Téma', 'Lényeg', 'Példa']}
          rows={[
            ['sorozat', 'függvény: ℤ⁺ → ℝ, n ↦ aₙ; jele {aₙ}', 'aₙ = 3n + 2: 5; 8; 11; …'],
            ['megadás', 'képlettel, rekurzióval (kezdőtagokkal), utasítással', 'a₁ = 1, a₂ = 2, aₙ = aₙ₋₁ + aₙ₋₂'],
            ['számtani sorozat', 'aₙ − aₙ₋₁ = d; aₙ = a₁ + (n − 1)d; aᵢ − aⱼ = (i − j)d', 'a₁₂ = 40, a₁₅ = 46 ⇒ d = 2'],
            ['számtani összeg', 'Sₙ = (a₁ + aₙ)/2 · n', '1 + 2 + … + 40 = 820 (Gauss)'],
            ['mértani sorozat', 'aₙ/aₙ₋₁ = q ≠ 0; aₙ = a₁qⁿ⁻¹; két tagból q kétféle is lehet', 'a₁₂ = 10, a₁₄ = 40 ⇒ q = ±2'],
            ['mértani összeg', 'Sₙ = a₁(qⁿ − 1)/(q − 1)', '1 + 2 + … + 2⁶³ = 2⁶⁴ − 1'],
            ['közepek', 'aₙ = (aₙ₋₁ + aₙ₊₁)/2, illetve aₙ² = aₙ₋₁ · aₙ₊₁', '4; 6; 9 mértani'],
            ['kamatos kamat', 'Kₙ = K₀ · qⁿ, q = 1 + p/100', '100 000 · 1,1² = 121 000'],
            ['gyűjtőjáradék', 'periódus elején x: Sₙ = x · q(qⁿ − 1)/(q − 1)', 'Dalma: ≈ 511 182 Ft'],
            ['hitel', 'T · qⁿ = x(qⁿ − 1)/(q − 1)', 'Tamás: ≈ 804 230 Ft']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 items-center">
          <StairsFibonacciSvg />
          <TheoryCallout type="info" title="Rekurzív sorozatok (1–2. lecke)">
            A lépcsőfeladatban (1 vagy 2 fokot lépünk) a₁ = 1, a₂ = 2 és aₙ = aₙ₋₁ + aₙ₋₂, így a₈ = 34. a₁₈ = 4181 és a₂₀ = 10 946 ismeretében a₁₉ = 10 946 − 4181 = 6765, a₁₇ =
            6765 − 4181 = 2584. Az aₙ = 8 · (−1)ⁿ sorozat értékkészlete kételemű (a −8 és a 8), első 25 tagjának összege −8.
          </TheoryCallout>
        </div>
      </TheorySection>

      <TheorySection title="2. Gyakorló feladatok (tankönyv 72. o.)" badge="Feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) a₁₅ = 21, S₁₅ = ±52,5" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a) (a₁ + 21)/2 · 15 = 52,5 ⇒ a₁ + 21 = 7 ⇒ a₁ = −14; 14d = 35 ⇒ d = 2,5.</li>
              <li>b) (a₁ + 21)/2 · 15 = −52,5 ⇒ a₁ = −28; 14d = 49 ⇒ d = 3,5.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mértani táblázat" badge="2. feladat" badgeColor="purple">
            <TheoryTable
              headers={['b₁', 'q', 'n', 'bₙ', 'Sₙ']}
              rows={[
                ['120', '0,5', '10', '0,234375', '239,765625'],
                ['−5', '3', '8', '−10 935', '−16 400'],
                ['−9', '−2', '4', '72', '45'],
                ['5', '2', '5', '80', '155']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="C) Vetélkedő jutalmai" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁ = 3800, d = −200, Sₙ = 29 000: n(7800 − 200n)/2 = 29 000 ⇒ n² − 39n + 290 = 0.</li>
              <li>n = 10 vagy n = 29; 29 helyezettnél a jutalom negatív lenne (a₂₉ = −1800), így <strong>10 versenyzőt</strong> jutalmaztak.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Péter fizetési ajánlatai (érettségi feladat, 2016)" badge="4. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>I.: számtani sorozat, a₁ = 200 000, d = 5000, 48 hónap: S₄₈ = 15 240 000 Ft.</li>
              <li>II.: mértani sorozat, q = 1,02: S₄₈ = 200 000 · (1,02⁴⁸ − 1)/0,02 ≈ 15 870 704 Ft.</li>
              <li>
                A <strong>II. ajánlat</strong> kínál nagyobb összjövedelmet.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <SalaryOffersSvg />
      </TheorySection>

      <TheorySection title="3. A tankönyv tudáspróbája megoldásokkal" badge="Tudáspróba" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. és 3. feladat: számtani sorozatok" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₂ = 5, a₈ = 14 ⇒ 6d = 9 ⇒ d = 1,5; a₁ = 3,5; S₂₀ = (7 + 19 · 1,5)/2 · 20 = <strong>355</strong>.</li>
              <li>a₁ = 8, d = 1,5, Sₙ = 1233: n(16 + 1,5(n − 1))/2 = 1233 ⇒ 3n² + 29n − 4932 = 0 ⇒ <strong>n = 36</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: Betyár ára" badgeColor="amber">
            <HorseshoeNailsSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              S₃₂ = 2³² − 1 = 4 294 967 295 fillér ≈ <strong>42 949 673 Ft</strong> – egy „ingyen” ló!
            </p>
          </TheoryCard>
        </div>
        <TheoryCard title="4. feladat: a gazda hagyatéka" badgeColor="emerald">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <InheritanceSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A k-adik fiú része: 0,2 · 0,8ᵏ⁻¹ (mértani sorozat, q = 0,8).</li>
              <li>a) A középső (4.) fiú: 0,2 · 0,8³ = 0,1024 = <strong>10,24%</strong>.</li>
              <li>b) A legkisebb (7.) fiú: 0,2 · 0,8⁶ ≈ <strong>5,24%</strong>.</li>
              <li>
                c) Jótékony célra: 1 − S₇ = 0,8⁷ ≈ <strong>20,97%</strong> (S₇ = 0,2 · (1 − 0,8⁷)/(1 − 0,8) = 1 − 0,8⁷).
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCallout type="tip" title="5. feladat: Kinga gyűjtőszámlája">
          Öt éven át minden év elején 450 000 Ft, 9%, év végi jóváírás: S₅ = 450 000 · 1,09 · (1,09⁵ − 1)/0,09 ≈ <strong>2 935 501 Ft</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. További érettségi típusú feladatok (31. lecke anyagából)" badge="Gyakorlás" badgeColor="teal">
        <TheoryTable
          headers={['Feladat', 'Megoldás', 'Eredmény']}
          rows={[
            ['Vera (érettségi 2017): 25 feladat, 75 perc, az első 1 perc, egyenletes növelés', '25(2 + 24d)/2 = 75 ⇒ d = 1/6; a₂₂ + … + a₂₅ = 4,5 + 4,67 + 4,83 + 5', '19 perc'],
            ['Webszerver: 1, 3, 5, … mp várakozás', 'a₁₀ = 19; S₁₀ = 10²', '19 mp; 100 mp'],
            ['Webszerver 10%-os növeléssel', 'a₁₀ = 1,1⁹; S₁₀ = (1,1¹⁰ − 1)/0,1', '≈ 2,36 mp; ≈ 15,94 mp'],
            ['Anna (érettségi 2021): 200 m → 5200 m, 21 nap', 'számtani: (200 + 5200)/2 · 21; mértani: q²⁰ = 26', '56 700 m; ≈ 33 461 m'],
            ['Sierpiński-háromszög, 20. ábra', 'fekete háromszögek: 3¹⁹; terület: Tₙ = 3/4 · Tₙ₋₁', '3¹⁹ = 1 162 261 467; (3/4)¹⁹ ≈ 0,42%'],
            ['Csoportverseny: K = 20, L = 5, M = 1180, N = 1, P = 2, Q = 7, R = 6', '(M/K)x² − (RQ + 3)x − 2(LN + P) = 59x² − 45x − 14 = 0', 'pozitív gyök: x = 1']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 items-center">
          <RabbitsSvg />
          <TheoryCallout type="info" title="Ráadás: a Fibonacci-sorozat">
            Leonardo Pisano (Fibonacci, kb. 1170–1250) 800 éves feladata: egy nyúlpár két hónapos korától havonta egy új párt hoz világra. A párok száma: f₁ = f₂ = 1, fₙ =
            fₙ₋₂ + fₙ₋₁. Egy év után f₁₃ = 233 pár él, az eredetin kívül 232 pár, azaz 464 nyúl származott az első pártól.
          </TheoryCallout>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: d vagy q? n vagy n − 1?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne keverd a két sorozat képleteit!"
          wrong="Péter II. ajánlata: 48 · (200 000 + 200 000 · 1,02⁴⁷)/2 ≈ 16,97 millió Ft."
          wrongExplanation="Az (a₁ + aₙ)/2 · n képlet csak számtani sorozatra érvényes. A 2%-os emelés mértani sorozatot ad, annak összegét az Sₙ = a₁(qⁿ − 1)/(q − 1) képlettel kell számolni."
          correct="S₄₈ = 200 000 · (1,02⁴⁸ − 1)/(1,02 − 1) ≈ 15 870 704 Ft."
          correctExplanation="A 48. havi fizetés a₄₈ = 200 000 · 1,02⁴⁷ (a kitevő n − 1), az összegképletben viszont 1,02⁴⁸ áll (a kitevő n)."
          tip="Mindig döntsd el először: állandó különbség (számtani) vagy állandó hányados (mértani)?"
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: sorozatépítő" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['ar', 'számtani'],
                    ['ge', 'mértani'],
                    ['fib', 'Fibonacci-típusú (a₁ = a₂)']
                  ] as [Kind, string][]
                ).map(([k, t]) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a₁ = {a1}</label>
                <input type="range" min="-10" max="10" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full accent-blue-600" aria-label="első tag" />
              </div>
              {kind === 'ar' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">d = {d}</label>
                  <input type="range" min="-5" max="5" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="differencia" />
                </div>
              )}
              {kind === 'ge' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">q = {fmtHu(q, 2)}</label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.25"
                    value={q}
                    onChange={(e) => setQ(Number(e.target.value) === 0 ? 0.25 : Number(e.target.value))}
                    className="w-full accent-rose-600"
                    aria-label="kvóciens"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">n = {n}</label>
                <input type="range" min="2" max="20" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-amber-600" aria-label="tagszám" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">aₙ</div>
                  <div className="font-mono font-black text-blue-900">{fmtHu(terms[n - 1] ?? 0, 3)}</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">Sₙ</div>
                  <div className="font-mono font-black text-emerald-900">{fmtHu(sum, 3)}</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                {kind === 'ar' && `Képlettel: aₙ = ${a1} + (n − 1) · ${d}, Sₙ = (a₁ + aₙ)/2 · n.`}
                {kind === 'ge' && `Képlettel: aₙ = ${a1} · ${fmtHu(q, 2)}ⁿ⁻¹, Sₙ = a₁(qⁿ − 1)/(q − 1)${q === 1 ? ' – itt q = 1, így Sₙ = n · a₁' : ''}.`}
                {kind === 'fib' && 'Rekurzióval: a₁ = a₂ = a₁, aₙ = aₙ₋₁ + aₙ₋₂ – se nem számtani, se nem mértani.'}
              </p>
            </div>
            <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="a sorozat tagjainak pontgrafikonja">
              <SeqBarChart values={terms} x={40} y={20} w={260} h={170} points color={kind === 'ge' ? S_RED : kind === 'fib' ? S_PURPLE : S_BLUE} labelEvery={n > 10 ? 5 : 1} />
              <SText x={170} y={214} t="az első n tag pontgrafikonja" s={10} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: melyik fizetési ajánlat?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Induló havi fizetés: {fmtFt(start)} Ft</label>
                <input type="range" min="100000" max="600000" step="10000" value={start} onChange={(e) => setStart(Number(e.target.value))} className="w-full accent-purple-600" aria-label="induló fizetés" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">I. ajánlat: havi emelés {fmtFt(raise)} Ft</label>
                <input type="range" min="0" max="20000" step="500" value={raise} onChange={(e) => setRaise(Number(e.target.value))} className="w-full accent-blue-600" aria-label="havi emelés" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">II. ajánlat: havi emelés {fmtHu(pct, 1)}%</label>
                <input type="range" min="0.5" max="5" step="0.5" value={pct} onChange={(e) => setPct(Number(e.target.value))} className="w-full accent-rose-600" aria-label="százalékos emelés" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Időtartam: {months} hónap</label>
                <input type="range" min="6" max="96" step="6" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-amber-600" aria-label="hónapok" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className={`rounded-xl p-2 border ${offerI >= offerII ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] text-slate-500">I. (számtani) összesen</div>
                  <div className="font-mono font-black">{fmtFt(offerI)} Ft</div>
                </div>
                <div className={`rounded-xl p-2 border ${offerII > offerI ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[11px] text-slate-500">II. (mértani) összesen</div>
                  <div className="font-mono font-black">{fmtFt(offerII)} Ft</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">Alapbeállítás: az érettségi feladat (15 240 000 Ft vs. ≈ 15 870 704 Ft). Rövid időtartamnál gyakran a számtani ajánlat nyer!</p>
            </div>
            <svg viewBox="0 0 320 230" className="w-full h-auto" role="img" aria-label="a havi fizetések a két ajánlatban">
              <SeqBarChart values={salI} line={salII} x={40} y={20} w={260} h={170} color={S_BLUE} lineColor={S_RED} labelEvery={12} />
              <SText x={170} y={224} t="kék: I. ajánlat · piros: II. ajánlat (ezer Ft/hó)" s={10} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SequencesPracticeExamTheory;
