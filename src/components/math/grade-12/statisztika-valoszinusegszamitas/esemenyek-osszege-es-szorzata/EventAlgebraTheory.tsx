import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { CoinEventsVennSvg, SumProductVennSvg, WeatherWeekSvg, SwitchCircuitSvg, CountBoundsSvg, Circuit } from './EventAlgebraFigures';
import { Venn2, F_GREEN, bar } from './probKit';

type PredKey = 'even' | 'div3' | 'prime' | 'le8' | 'gt12' | 'square';
const PREDS: Record<PredKey, { name: string; test: (n: number) => boolean }> = {
  even: { name: 'páros', test: (n) => n % 2 === 0 },
  div3: { name: '3-mal osztható', test: (n) => n % 3 === 0 },
  prime: { name: 'prím', test: (n) => n > 1 && Array.from({ length: n - 2 }, (_, i) => i + 2).every((k) => n % k !== 0) },
  le8: { name: 'legfeljebb 8', test: (n) => n <= 8 },
  gt12: { name: '12-nél nagyobb', test: (n) => n > 12 },
  square: { name: 'négyzetszám', test: (n) => Number.isInteger(Math.sqrt(n)) }
};

const A_ = bar('A');
const B_ = bar('B');

type OpKey = 'A' | 'B' | 'Ac' | 'sum' | 'prod' | 'ABc' | 'AcB' | 'sumC' | 'prodC';
const OPS: { key: OpKey; label: string; f: (a: boolean, b: boolean) => boolean }[] = [
  { key: 'A', label: 'A', f: (a) => a },
  { key: 'B', label: 'B', f: (_a, b) => b },
  { key: 'Ac', label: A_, f: (a) => !a },
  { key: 'sum', label: 'A + B', f: (a, b) => a || b },
  { key: 'prod', label: 'A · B', f: (a, b) => a && b },
  { key: 'ABc', label: `A · ${B_}`, f: (a, b) => a && !b },
  { key: 'AcB', label: `${A_} · B`, f: (a, b) => !a && b },
  { key: 'sumC', label: `${A_} · ${B_}`, f: (a, b) => !a && !b },
  { key: 'prodC', label: `${A_} + ${B_}`, f: (a, b) => !a || !b }
];

export const EventAlgebraTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [pa, setPa] = useState<PredKey>('even');
  const [pb, setPb] = useState<PredKey>('div3');
  const [op, setOp] = useState<OpKey>('sum');
  // Labor II
  const [sa, setSa] = useState(true);
  const [sb, setSb] = useState(false);
  const [sc, setSc] = useState(true);

  const H = useMemo(() => Array.from({ length: 20 }, (_, i) => i + 1), []);
  const opDef = OPS.find((o) => o.key === op)!;
  const inA = (n: number) => PREDS[pa].test(n);
  const inB = (n: number) => PREDS[pb].test(n);
  const result = H.filter((n) => opDef.f(inA(n), inB(n)));
  const shade = {
    aOnly: opDef.f(true, false) ? F_GREEN : undefined,
    bOnly: opDef.f(false, true) ? F_GREEN : undefined,
    ab: opDef.f(true, true) ? F_GREEN : undefined,
    out: opDef.f(false, false) ? F_GREEN : undefined
  };
  const cntA = H.filter(inA).length;
  const cntB = H.filter(inB).length;
  const cntAB = H.filter((n) => inA(n) && inB(n)).length;

  const lit = sa || (sb && sc);

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="esemenyek-osszege-es-szorzata"
      title="6. Események összege és szorzata"
      subtitle="Az A vagy B és az A és B esemény: összeg (A + B), szorzat (A · B), komplementer – pénzérmék, időjárás, áramkör és lottószámok."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_esemenyek_osszege_es_szorzata_tananyag.pdf"
      practiceTitle="Készen állsz az eseményalgebra feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÖSSZEG ÉS SZORZAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">A + B: legalább az egyik · A · B: mindkettő</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Összeg (A + B):</strong> pontosan akkor következik be, ha A és B közül <strong>legalább az egyik</strong> bekövetkezik („A vagy B”).
              </li>
              <li>
                <strong>Szorzat (A · B):</strong> pontosan akkor következik be, ha A és B <strong>is</strong> bekövetkezik („A és B”).
              </li>
              <li>Egymást kizáró események szorzata a lehetetlen esemény; komplementer események összege a biztos esemény: A · Ā = ∅, A + Ā = H.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: A vagy B, A és B" badge="Tankönyv 88. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Feldobunk egy 10, egy 20 és egy 50 forintost. A: a 10 forintoson az írás oldal látható; B: az érmék között pontosan egy fej látható.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Az eseménytér 2³ = 8 elemi eseményből áll.</li>
              <li>
                A: III, IIF, IFI, IFF – <strong>4</strong> elemi esemény; B: IIF, IFI, FII – <strong>3</strong> elemi esemény.
              </li>
              <li>
                <strong>A vagy B</strong> (A + B): III, IIF, IFI, IFF, FII – <strong>5</strong> elemi esemény.
              </li>
              <li>
                <strong>A és B</strong> (A · B): IIF, IFI – <strong>2</strong> elemi esemény.
              </li>
              <li>Ellenőrzés: |A + B| = |A| + |B| − |A · B| = 4 + 3 − 2 = 5.</li>
            </ul>
          </div>
          <CoinEventsVennSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Események összege és szorzata" badge="Elmélet" badgeColor="indigo">
        <SumProductVennSvg />
        <TheoryTable
          headers={['Művelet', 'Jele', 'Mikor következik be?', 'Halmazként']}
          rows={[
            ['összeg', 'A + B', 'ha A és B közül legalább az egyik bekövetkezik', 'A ∪ B'],
            ['szorzat', 'A · B', 'ha A és B is bekövetkezik', 'A ∩ B'],
            ['komplementer', A_, 'ha A nem következik be', 'H \\ A'],
            ['kizáró események', 'A · B = ∅', 'egyszerre nem következhetnek be', 'diszjunkt halmazok'],
            ['komplementerek összege', 'A + Ā = H', 'a biztos esemény', 'az egész H']
          ]}
        />
        <TheoryCallout type="info" title="Kiegészítés: a halmazműveletek szabályai érvényesek">
          Az események az eseménytér részhalmazai, ezért az összeg az unió, a szorzat a metszet. Érvényesek a De Morgan-azonosságok is: az A + B komplementere {A_} · {B_} („egyik sem következik be”), az A · B komplementere {A_} + {B_} („legalább az egyik nem következik be”).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok a tankönyvből" badge="Mintapéldák" badgeColor="amber">
        <TheoryCard title="A) Egy hét időjárása" badge="1. feladat" badgeColor="sky">
          <WeatherWeekSvg className="w-full h-auto mb-3" />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>A (több mint 10 °C): hétfő, kedd, szerda, vasárnap. B (több mint 5 mm csapadék): szerda, csütörtök, vasárnap. C (5 km/h-nál erősebb szél): kedd, csütörtök, péntek.</li>
            <li>
              <strong>a)</strong> A + B: hétfő, kedd, szerda, csütörtök, vasárnap. <strong>b)</strong> B · C: csütörtök. <strong>c)</strong> B + C: kedd, szerda, csütörtök, péntek, vasárnap. <strong>d)</strong> A · B · C: egyik nap sem – a héten ez lehetetlen esemény volt.
            </li>
          </ul>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="B) Világít-e a lámpa?" badge="2. feladat" badgeColor="purple">
            <SwitchCircuitSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                A lámpa után az áramkör két ágra válik: az egyik ágban az A kapcsoló, a másikban a sorba kötött B és C kapcsoló van. A lámpa akkor világít, ha
                valamelyik ág zárt, vagyis ha az <strong>A + B · C</strong> esemény bekövetkezik.
              </li>
              <li>
                <strong>a) B · C:</strong> világít (a B–C ág zárt). <strong>b) A · {B_}:</strong> világít (az A ág zárt). <strong>c) {A_} · B · C̄:</strong> nem
                világít (A nyitva, a B–C ágban C nyitva). <strong>d) {A_} · ({B_} + C̄):</strong> nem világít (A nyitva, és B, C közül legalább az egyik nyitva).
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Lottószámok" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>S: Sándor kedvencei – négyzet- és köbszámok (1, 4, 8, 9, 16, 25, 27, 36, 49, 64, 81). J: József kedvencei – 5-tel vagy 7-tel oszthatók. B: Benedek kedvencei – a számjegyek összege 9 vagy 10.</li>
              <li>
                <strong>a)</strong> Kihúzott számok: 42, 45, 49, 63, 64. S + J mind az ötnél bekövetkezik (42, 45, 63 J-be, 64 S-be, 49 mindkettőbe tartozik). J · B: <strong>45 és 63</strong>.
              </li>
              <li>
                <strong>b)</strong> S · J: pl. 25 és 49 (csak ez a kettő van). J + B: pl. 10 és 19.
              </li>
              <li>
                <strong>c)</strong> S · B · J: S · J = {'{'}25; 49{'}'}, ezek számjegyösszege 7 és 13 – <strong>0 ilyen szám</strong> van.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="D) Legalább és legfeljebb hány elemi esemény?" badge="4–5. feladat" badgeColor="rose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <CountBoundsSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                |A| = 18, |B| = 15. Ha B ⊂ A, akkor A + B = 18 és A · B = 15; ha kizárják egymást, akkor A + B = 33 és A · B = 0. Így <strong>18 ≤ |A + B| ≤ 33</strong> és <strong>0 ≤ |A · B| ≤ 15</strong>. Az A · {B_} (A igen, B nem) elemszáma 18 − |A · B|, azaz 3 és 18 közötti.
              </li>
              <li>
                Ha |{A_} · B| = 15 és |A + B| = 16: az A + B két egymást kizáró részből áll, A-ból és {A_} · B-ből, így |A| = 16 − 15 = <strong>1</strong> (legalább és
                legfeljebb is 1). B tartalmazza {A_} · B 15 elemét, és legfeljebb még A egyetlen elemét: <strong>15 ≤ |B| ≤ 16</strong>.
              </li>
              <li>
                HF 3.: |H| = 20, |A| = 12, |B| = 16. <strong>16 ≤ |A + B| ≤ 20</strong> (B ⊂ A + B; ha A és B együtt lefedi H-t, 20). |{A_}| = 8, így{' '}
                <strong>16 ≤ |{A_} + B| ≤ 20</strong> (20, ha A ⊂ B). {A_} · {B_} az A + B komplementere: <strong>0 ≤ |{A_} · {B_}| ≤ 4</strong>. (Közben 8 ≤ |A · B| ≤ 12.)
              </li>
            </ul>
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: összeadás elemszámra" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az A + B elemszáma nem mindig |A| + |B|"
          wrong="|A + B| = |A| + |B|, pl. 4 + 3 = 7 elemi esemény."
          wrongExplanation="A három érme feladatában az IIF és IFI kimenetel A-ba és B-be is beletartozik, így kétszer számoltuk őket."
          correct="|A + B| = |A| + |B| − |A · B| = 4 + 3 − 2 = 5."
          correctExplanation="Az egyszerű összeadás csak egymást kizáró eseményeknél jó (amikor A · B a lehetetlen esemény)."
          tip="Az „A + B” jele ne tévesszen meg: a „+” itt a „vagy” művelete, nem számok összeadása."
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: eseményalgebra a Venn-diagramon" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-600 mb-4">
            Kísérlet: az 1, 2, …, 20 számok közül véletlenszerűen húzunk egyet (H = {'{'}1; 2; …; 20{'}'}). Válaszd ki az A és a B eseményt, majd a műveletet!
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {([['A', pa, setPa], ['B', pb, setPb]] as [string, PredKey, (k: PredKey) => void][]).map(([nm, val, set]) => (
                <div key={nm}>
                  <span className="block text-xs font-semibold text-slate-600 mb-1">{nm}: a kihúzott szám …</span>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(PREDS) as PredKey[]).map((k) => (
                      <button
                        key={k}
                        onClick={() => set(k)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${val === k ? (nm === 'A' ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white') : 'bg-slate-100 text-slate-700'}`}
                      >
                        {PREDS[k].name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <span className="block text-xs font-semibold text-slate-600 mb-1">Művelet</span>
                <div className="flex flex-wrap gap-2">
                  {OPS.map((o) => (
                    <button
                      key={o.key}
                      onClick={() => setOp(o.key)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold font-mono ${op === o.key ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-sm text-emerald-900 space-y-1">
                <div>
                  <strong className="font-mono">{opDef.label}</strong> = {'{'}
                  {result.join('; ')}
                  {'}'}
                </div>
                <div>
                  Elemi események száma: <strong className="font-mono">{result.length}</strong> / 20
                  {result.length === 0 ? ' – lehetetlen esemény' : result.length === 20 ? ' – biztos esemény' : ''}
                </div>
                <div className="text-xs text-slate-600">
                  |A| = {cntA}, |B| = {cntB}, |A · B| = {cntAB}, |A + B| = {cntA} + {cntB} − {cntAB} = {cntA + cntB - cntAB}
                </div>
              </div>
            </div>
            <div>
              <svg viewBox="0 0 240 160" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
                <Venn2 x={10} y={10} w={220} h={140} r={46} gap={58} shade={shade} />
              </svg>
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {H.map((n) => (
                  <span
                    key={n}
                    className={`w-8 text-center py-1 rounded-md font-mono text-xs font-bold border ${result.includes(n) ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: kapcsolók és lámpa" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {([['A', sa, setSa], ['B', sb, setSb], ['C', sc, setSc]] as [string, boolean, (v: boolean) => void][]).map(([nm, v, set]) => (
                  <button
                    key={nm}
                    onClick={() => set(!v)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold ${v ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-700'}`}
                  >
                    {nm} kapcsoló: {v ? 'zárva' : 'nyitva'}
                  </button>
                ))}
              </div>
              <div className={`rounded-xl border p-4 text-sm space-y-1 ${lit ? 'bg-yellow-50 border-yellow-300 text-yellow-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <div>
                  Bekövetkezett események: <strong>{[sa ? 'A' : A_, sb ? 'B' : B_, sc ? 'C' : `C̄`].join(' · ')}</strong>
                </div>
                <div>
                  B · C {sb && sc ? 'bekövetkezett' : 'nem következett be'}; A + B · C {lit ? 'bekövetkezett' : 'nem következett be'}.
                </div>
                <div className="font-black">{lit ? 'A lámpa világít.' : 'A lámpa nem világít.'}</div>
              </div>
              <TheoryTable
                headers={['A', 'B', 'C', 'világít?']}
                rows={[0, 1, 2, 3, 4, 5, 6, 7].map((m) => {
                  const a = !!(m & 4);
                  const b = !!(m & 2);
                  const c = !!(m & 1);
                  const cur = a === sa && b === sb && c === sc;
                  const mark = (v: boolean) => (v ? 'zárva' : 'nyitva');
                  const l = a || (b && c);
                  return [mark(a), mark(b), mark(c), cur ? `▶ ${l ? 'igen' : 'nem'}` : l ? 'igen' : 'nem'];
                })}
              />
            </div>
            <svg viewBox="0 0 250 190" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <Circuit a={sa} b={sb} c={sc} lit={lit} x={5} y={5} />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EventAlgebraTheory;
