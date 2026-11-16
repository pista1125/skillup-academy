import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ThreeCoinsTreeSvg, SampleSpaceVennSvg, DiceTableSvg, ComplementExclusiveSvg, TwoGamesStarterSvg } from './SampleSpaceFigures';
import { DiceGrid, F_BLUE, F_AMBER } from './probKit';

type DiceEventKey = 'sumEq' | 'sumLt' | 'prodGt' | 'hasSix' | 'equal' | 'whiteGt' | 'sumPrime' | 'prodPrime';

const isPrime = (n: number) => n > 1 && Array.from({ length: n - 2 }, (_, i) => i + 2).every((k) => n % k !== 0);

const DICE_EVENTS: Record<DiceEventKey, { label: (k: number) => string; test: (w: number, b: number, k: number) => boolean; usesK: boolean; kMin: number; kMax: number }> = {
  sumEq: { label: (k) => `A dobások összege ${k}.`, test: (w, b, k) => w + b === k, usesK: true, kMin: 1, kMax: 13 },
  sumLt: { label: (k) => `A dobások összege kisebb, mint ${k}.`, test: (w, b, k) => w + b < k, usesK: true, kMin: 1, kMax: 14 },
  prodGt: { label: (k) => `A dobások szorzata nagyobb, mint ${k}.`, test: (w, b, k) => w * b > k, usesK: true, kMin: 0, kMax: 36 },
  hasSix: { label: () => 'Van hatos dobás.', test: (w, b) => w === 6 || b === 6, usesK: false, kMin: 0, kMax: 0 },
  equal: { label: () => 'A két dobás egyenlő.', test: (w, b) => w === b, usesK: false, kMin: 0, kMax: 0 },
  whiteGt: { label: () => 'A fehér kockával nagyobbat dobunk.', test: (w, b) => w > b, usesK: false, kMin: 0, kMax: 0 },
  sumPrime: { label: () => 'A dobások összege prím.', test: (w, b) => isPrime(w + b), usesK: false, kMin: 0, kMax: 0 },
  prodPrime: { label: () => 'A dobások szorzata prím.', test: (w, b) => isPrime(w * b), usesK: false, kMin: 0, kMax: 0 }
};

const DICE_BUTTONS: { key: DiceEventKey; name: string }[] = [
  { key: 'sumEq', name: 'összeg = k' },
  { key: 'sumLt', name: 'összeg < k' },
  { key: 'prodGt', name: 'szorzat > k' },
  { key: 'hasSix', name: 'van hatos' },
  { key: 'equal', name: 'egyenlő dobások' },
  { key: 'whiteGt', name: 'fehér > fekete' },
  { key: 'sumPrime', name: 'összeg prím' },
  { key: 'prodPrime', name: 'szorzat prím' }
];

type CoinRel = 'eq' | 'ge' | 'le';

export const SampleSpaceTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: dobókocka-események
  const [ev, setEv] = useState<DiceEventKey>('sumEq');
  const [k, setK] = useState<number>(7);
  const [compl, setCompl] = useState<boolean>(false);
  // Labor II: n pénzérme
  const [n, setN] = useState<number>(3);
  const [heads, setHeads] = useState<number>(2);
  const [rel, setRel] = useState<CoinRel>('ge');

  const def = DICE_EVENTS[ev];
  const kk = Math.min(Math.max(k, def.kMin), def.kMax);
  const inEvent = (w: number, b: number) => (compl ? !def.test(w, b, kk) : def.test(w, b, kk));
  const count = useMemo(() => {
    let c = 0;
    for (let w = 1; w <= 6; w++) for (let b = 1; b <= 6; b++) if (inEvent(w, b)) c++;
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ev, kk, compl]);
  const status = count === 0 ? 'lehetetlen esemény' : count === 36 ? 'biztos esemény' : 'se nem biztos, se nem lehetetlen';

  const outcomes = useMemo(() => {
    const res: string[] = [];
    for (let m = 0; m < 1 << n; m++) {
      let s = '';
      for (let i = n - 1; i >= 0; i--) s += (m >> i) & 1 ? 'I' : 'F';
      res.push(s);
    }
    return res.sort();
  }, [n]);
  const h = Math.min(heads, n);
  const coinTest = (s: string) => {
    const f = s.split('').filter((c) => c === 'F').length;
    return rel === 'eq' ? f === h : rel === 'ge' ? f >= h : f <= h;
  };
  const coinCount = outcomes.filter(coinTest).length;
  const relText = rel === 'eq' ? 'pontosan' : rel === 'ge' ? 'legalább' : 'legfeljebb';

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="az-esemenyter"
      title="5. Az eseménytér"
      subtitle="Pénzérmék, dobókockák, társasjáték: elemi események, eseménytér, biztos és lehetetlen esemény, komplementer és egymást kizáró események."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_az_esemenyter_tananyag.pdf"
      practiceTitle="Készen állsz az eseménytér feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ ESEMÉNYTÉR',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                elemi esemény ∈ H (eseménytér) · esemény ⊆ H
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Elemi események:</strong> a véletlen kísérlet lehetséges kimenetelei; halmazuk az <strong>eseménytér (H)</strong>.
              </li>
              <li>
                <strong>Esemény:</strong> az eseménytér részhalmaza. <strong>Biztos esemény:</strong> biztosan bekövetkezik (= H). <strong>Lehetetlen esemény:</strong> nem következhet be (= ∅).
              </li>
              <li>
                <strong>Komplementer (Ā):</strong> pontosan akkor következik be, amikor A nem. <strong>Egymást kizáró események:</strong> egyszerre nem következhetnek be.
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: három pénzérme" badge="Tankönyv 86. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Feldobunk egy 10, egy 20 és egy 50 forintost, és ebben a sorrendben feljegyezzük, hogy fej (F) vagy írás (I) látható. Pl. az <strong>FIF</strong> azt jelenti, hogy a 10 Ft-oson fej, a 20 Ft-oson írás, az 50 Ft-oson fej van.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> Mindhárom érmén kétféle eredmény lehet: 2 · 2 · 2 = 2³ = <strong>8 kimenetel</strong>: FFF, FFI, FIF, FII, IFF, IFI, IIF, III.
              </li>
              <li>
                <strong>b)</strong> Több fej, mint írás: FFF, FFI, FIF, IFF – <strong>4 lehetőség</strong>.
              </li>
              <li>
                <strong>c)</strong> A fejek és írások száma együtt 3, ami páratlan, ezért a kettő nem lehet egyenlő: <strong>nincs ilyen lehetőség</strong> (lehetetlen esemény).
              </li>
            </ul>
          </div>
          <ThreeCoinsTreeSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Alapfogalmak" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryTable
            headers={['Fogalom', 'Jelentés']}
            rows={[
              ['elemi események', 'egy véletlen kísérlet lehetséges kimenetelei'],
              ['eseménytér (H)', 'az elemi események halmaza'],
              ['esemény (A, B, …)', 'az eseménytér részhalmaza'],
              ['biztos esemény', 'olyan esemény, amely biztosan bekövetkezik'],
              ['lehetetlen esemény', 'olyan esemény, amely nem következhet be'],
              ['Ā (A komplementere)', 'pontosan akkor következik be, amikor A nem'],
              ['egymást kizáró események', 'egyszerre nem következhetnek be']
            ]}
          />
          <SampleSpaceVennSvg />
        </div>
        <TheoryCallout type="info" title="Jelölés">
          Az eseményeket nagybetűkkel (A, B, …), az eseményteret H-val jelöljük. Egy esemény akkor következik be, ha a kísérlet kimenetele (az elemi esemény) az eseményhez tartozik.
        </TheoryCallout>
        <ComplementExclusiveSvg />
      </TheorySection>

      <TheorySection title="3. Példák: a három pénzérme kísérlete" badge="Elmélet" badgeColor="teal">
        <TheoryTable
          headers={['Fogalom', 'Példa']}
          rows={[
            ['elemi esemény', 'a 10 Ft-ossal és a 20 Ft-ossal fejet, az 50 Ft-ossal írást dobunk: FFI'],
            ['eseménytér', 'a 8 elemi esemény halmaza: {FFF, FFI, FIF, FII, IFF, IFI, IIF, III}'],
            ['biztos esemény', 'a fejek száma kisebb vagy egyenlő, mint 3'],
            ['lehetetlen esemény', 'a fejek száma és az írások száma egyenlő'],
            ['egy A esemény', 'a 10 Ft-ossal fejet dobunk: {FFF, FFI, FIF, FII}'],
            ['az Ā esemény', 'a 10 Ft-ossal írást dobunk: {IFF, IFI, IIF, III}'],
            ['egymást kizáró események', 'A és Ā']
          ]}
        />
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladatok a tankönyvből" badge="Mintapéldák" badgeColor="amber">
        <TheoryCard title="A) Két dobókocka: fehér és fekete" badge="3. feladat" badgeColor="sky">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <DiceTableSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                <strong>a)</strong> Az elemi események a (fehér; fekete) számpárok: 6 · 6 = <strong>36</strong>.
              </li>
              <li>
                <strong>b)</strong> A: a fehér hatos – <strong>6</strong>; B: pontosan az egyik hatos – 5 + 5 = <strong>10</strong>; C: van hatos – 6 + 6 − 1 = <strong>11</strong>; D: mindkettő hatos – <strong>1</strong>; E: egyik sem hatos – 5 · 5 = <strong>25</strong>; F: van nem hatos – 36 − 1 = <strong>35</strong>.
              </li>
              <li>
                <strong>c)</strong> Komplementerek: <strong>C és E</strong> (11 + 25 = 36), valamint <strong>D és F</strong> (1 + 35 = 36).
              </li>
              <li>
                <strong>d)</strong> 5 elemi esemény: pl. „a dobások összege 8”: (2;6), (3;5), (4;4), (5;3), (6;2).
              </li>
              <li>
                <strong>e)</strong> L: összeg &lt; 36 – <strong>biztos</strong> (legfeljebb 12); M: összeg 1 – <strong>lehetetlen</strong> (legalább 2). K: a szorzat prím (6 eset, pl. (1;3)) és N: az összeg köbszám (= 8, 5 eset) egyik sem.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="B) Ki kezdi a társasjátékot?" badge="2. feladat" badgeColor="purple">
            <TwoGamesStarterSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                <strong>a)</strong> Mindkét menet kezdője 4-féle lehet: 4 · 4 = <strong>16</strong> elemi esemény.
              </li>
              <li>
                <strong>b)</strong> „Anna kezdi az első játékot”: AA, AB, AC, AD.
              </li>
              <li>
                <strong>c)</strong> Egymást kizárók: K és L, K és N, L és M, M és N. (K és M nem: M esetén K is bekövetkezik; L és N sem: pl. AD.)
              </li>
              <li>
                <strong>d)</strong> K̄: nem Bea kezdi a másodikat; L̄: legalább az egyik játékot Bea kezdi; M̄: legfeljebb az egyik játékot kezdi Bea; N̄: nem Dénes kezdi a másodikat.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Nyelvórán: biztos vagy lehetetlen?" badge="1. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>13 diák tanul olaszt, 10 spanyolt, 7 mindkettőt: csak olaszt 6, csak spanyolt 3, összesen 6 + 7 + 3 = <strong>16</strong> diák.</li>
              <li>
                <strong>B: van köztük olaszos – biztos</strong>, mert csak 3 diák nem tanul olaszt, 4 kiválasztottból legalább egy olaszos.
              </li>
              <li>
                <strong>D: mind a négyen spanyolt, de olaszt nem – lehetetlen</strong>, mert csak 3 ilyen diák van.
              </li>
              <li>A (mind olaszt tanul) és C (egyikük sem tanul mindkettőt) bekövetkezhet, de nem biztos.</li>
            </ul>
            <TheoryCallout type="tip" title="Házi feladat-ötlet">
              Pénzérmét háromszor feldobva „az első két dobás fej, és a második két dobás írás” lehetetlen esemény, hiszen a 2. dobás nem lehet egyszerre fej és írás.
            </TheoryCallout>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: kizáró vagy komplementer?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Nem minden egymást kizáró esemény komplementer"
          wrong="Ha A és B kizárják egymást, akkor B = Ā."
          wrongExplanation="Két kockával a „mindkettő hatos” (D) és az „egyik sem hatos” (E) kizárja egymást, de 1 + 25 = 26 ≠ 36: van olyan kimenetel (pl. (6;2)), amikor egyik sem következik be."
          correct="B = Ā akkor, ha A és B kizárják egymást, ÉS együtt az egész eseményteret kiadják."
          correctExplanation="A komplementer párok mindig kizárják egymást, és elemszámuk összege az eseménytér elemszáma (pl. C: 11 és E: 25, összesen 36)."
          tip="A sorrend is számít: a (fehér 2; fekete 5) és a (fehér 5; fekete 2) két különböző elemi esemény, ezért 36 és nem 21 a kimenetelek száma."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: események a 6 × 6-os táblázatban" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-slate-600 mb-1">Válassz eseményt!</span>
                <div className="flex flex-wrap gap-2">
                  {DICE_BUTTONS.map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setEv(d.key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ev === d.key ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
              {def.usesK && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">k = {kk}</label>
                  <input
                    type="range"
                    min={def.kMin}
                    max={def.kMax}
                    value={kk}
                    onChange={(e) => setK(Number(e.target.value))}
                    className="w-full accent-violet-600"
                    aria-label="k értéke"
                  />
                </div>
              )}
              <button
                onClick={() => setCompl((v) => !v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${compl ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                komplementer (Ā) {compl ? '✓' : ''}
              </button>
              <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 text-sm text-violet-900 space-y-1">
                <div>
                  <strong>{compl ? 'NEM igaz, hogy: ' : 'Esemény: '}</strong>
                  {def.label(kk)}
                </div>
                <div>
                  Elemi események száma: <strong className="font-mono">{count}</strong> / 36 · a komplementeré: <strong className="font-mono">{36 - count}</strong>
                </div>
                <div className="text-xs text-slate-600">Ez {status}.</div>
              </div>
            </div>
            <svg viewBox="0 0 250 230" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <DiceGrid x={50} y={36} cell={31} fs={9} text={(w, b) => `${w};${b}`} hl={(w, b) => (inEvent(w, b) ? (compl ? F_AMBER : F_BLUE) : undefined)} />
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: n pénzérme eseménytere" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Érmék száma: n = {n}</label>
                <input type="range" min="1" max="5" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-purple-600" aria-label="érmék száma" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Fejek száma: {h}</label>
                <input type="range" min="0" max={n} value={h} onChange={(e) => setHeads(Number(e.target.value))} className="w-full accent-amber-600" aria-label="fejek száma" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(['eq', 'ge', 'le'] as CoinRel[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRel(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${rel === r ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {r === 'eq' ? 'pontosan' : r === 'ge' ? 'legalább' : 'legfeljebb'}
                  </button>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 text-sm text-purple-900 space-y-1">
                <div>
                  Eseménytér: 2<sup>{n}</sup> = <strong>{1 << n}</strong> elemi esemény.
                </div>
                <div>
                  „{relText} {h} fej”: <strong className="font-mono">{coinCount}</strong> elemi esemény, komplementere: <strong className="font-mono">{(1 << n) - coinCount}</strong>.
                </div>
                <div className="text-xs text-slate-600">
                  {coinCount === 1 << n ? 'Ez biztos esemény.' : coinCount === 0 ? 'Ez lehetetlen esemény.' : 'Az esemény bekövetkezhet, de nem biztos.'}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {outcomes.map((o) => (
                <span
                  key={o}
                  className={`px-2 py-1 rounded-md font-mono text-xs font-bold border ${coinTest(o) ? 'bg-purple-600 text-white border-purple-700' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SampleSpaceTheory;
