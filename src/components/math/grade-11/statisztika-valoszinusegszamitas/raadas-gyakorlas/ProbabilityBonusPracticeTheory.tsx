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
  ProbabilityBonusPracticeFencersSvg,
  ProbabilityBonusPracticeMaxTableSvg,
  ProbabilityBonusPracticeDominoSvg,
  ProbabilityBonusPracticeLineupSvg,
  ProbabilityBonusPracticeKeysTreeSvg
} from './ProbabilityBonusPracticeFigures';

const dec = (x: number, d = 3) => (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ',');
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const frac = (k: number, n: number) => {
  if (k === 0) return '0';
  const g = gcd(k, n);
  return n / g === 1 ? String(k / g) : `${k / g}/${n / g}`;
};

const sup = (n: number) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[n] ?? String(n);

const RINGS = 5; // a céltábla sugara 5 egység, 5 gyűrű (10 … 6 pont)

export const ProbabilityBonusPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: célba dobás (geometriai valószínűség)
  const [darts, setDarts] = useState<{ x: number; y: number; ring: number }[]>([]);
  const [ringCounts, setRingCounts] = useState<number[]>(Array(RINGS).fill(0));
  const throwDarts = (n: number) => {
    const next = [...ringCounts];
    const fresh: { x: number; y: number; ring: number }[] = [];
    for (let i = 0; i < n; i++) {
      // területarányos (egyenletes) pont a körlapon: r = R·√u
      const r = RINGS * Math.sqrt(Math.random());
      const t = 2 * Math.PI * Math.random();
      const ring = Math.min(RINGS - 1, Math.floor(r));
      next[ring] += 1;
      fresh.push({ x: r * Math.cos(t), y: r * Math.sin(t), ring });
    }
    setRingCounts(next);
    setDarts((d) => [...d, ...fresh].slice(-400));
  };
  const resetDarts = () => {
    setDarts([]);
    setRingCounts(Array(RINGS).fill(0));
  };
  const dartTotal = ringCounts.reduce((s, x) => s + x, 0);

  // Labor II: n kocka, a nagyobbik / kisebbik dobás eloszlása
  const [nDice, setNDice] = useState<number>(2);
  const [rule, setRule] = useState<'max' | 'min'>('max');
  const [simCounts, setSimCounts] = useState<number[] | null>(null);
  const totalCases = Math.pow(6, nDice);
  const favCount = (k: number) =>
    rule === 'max' ? Math.pow(k, nDice) - Math.pow(k - 1, nDice) : Math.pow(7 - k, nDice) - Math.pow(6 - k, nDice);
  const simulate = () => {
    const c = Array(6).fill(0);
    for (let i = 0; i < 100; i++) {
      const rolls = Array.from({ length: nDice }, () => 1 + Math.floor(Math.random() * 6));
      const v = rule === 'max' ? Math.max(...rolls) : Math.min(...rolls);
      c[v - 1] += 1;
    }
    setSimCounts(c);
  };

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="raadas-gyakorlas"
      title="8. Ráadás – Gyakorlás"
      subtitle="Valószínűségszámítási gyakorlás: vívók, védekező erő két kockával, almák, dominók, sorban állás, logaritmus – és célba dobás területarányosan."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_valoszinuseg_raadas_gyakorlas_tananyag.pdf"
      practiceTitle="Készen állsz a ráadás gyakorlásra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HOGYAN SZÁMOLJUNK?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              P(A) = kedvező / összes;   P(A) = 1 − P(nem A)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Előbb döntsd el, <strong>mi az elemi esemény</strong> (egy versenyző, egy rendezett dobáspár, egy sorrend, egy dominókő), és hogy egyformán valószínűek-e.</li>
              <li>Két kockánál a 6 × 6-os táblázat, sorrendeknél a faktoriális (n!) segít.</li>
              <li>
                <strong>Geometriai valószínűség:</strong> ha a találat bárhová egyforma eséllyel érkezik, P = kedvező terület / teljes terület.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Vívók */}
      <TheorySection title="1. Kidolgozott feladat: a tokiói olimpia magyar vívói (1. feladat)" badge="Tankönyv 182. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              13 versenyző közül választunk egyet véletlenszerűen – az elemi események a versenyzők, mind egyformán valószínű. Szilágyi Áron egyéniben aranyérmes, Siklósi Gergely ezüstérmes, a férfi kardcsapat (Decsi, Gémesi, Szatmári, Szilágyi) bronzérmes; Márton Anna negyedik lett.
            </p>
            <TheoryTable
              headers={['Esemény', 'Kedvező', 'P']}
              rows={[
                ['a) női versenyző', '4 tőröző + 4 kardozó = 8', '8/13'],
                ['b) érmet nyert', 'Decsi, Gémesi, Szatmári, Szilágyi, Siklósi = 5', '5/13'],
                ['c) kevesebb mint 25 éves', '23, 23, 20, 18, 23 éves = 5', '5/13'],
                ['d) több mint 30 éves', '32, 45, 38, 34, 31 éves = 5', '5/13']
              ]}
            />
            <TheoryCallout type="warning" title="Szilágyi Áron csak egyszer számít!">
              Két érmet is nyert, de egy versenyző egy elemi esemény – az érmesek száma 5, nem 6.
            </TheoryCallout>
          </div>
          <ProbabilityBonusPracticeFencersSvg />
        </div>
      </TheorySection>

      {/* 2. Védekező erő */}
      <TheorySection title="2. Kidolgozott feladat: védekező erő két kockával (2. feladat)" badge="Tankönyv 182. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A védekező erő a két dobás közül a <strong>nagyobbik</strong> (egyenlő dobásnál a közös érték). A 6 × 6-os táblázatban a k érték 2k − 1 cellában áll: 1, 3, 5, 7, 9, 11 cella.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> P(erő = 5) = 9/36 = <strong>1/4</strong>.
              </li>
              <li>
                <strong>b)</strong> P(erő ≥ 5) = (9 + 11)/36 = 20/36 = <strong>5/9</strong>.
              </li>
              <li>
                <strong>c)</strong> P(erő = 3) = <strong>5/36</strong>.
              </li>
              <li>
                <strong>d)</strong> P(erő &lt; 3) = (1 + 3)/36 = 4/36 = <strong>1/9</strong>.
              </li>
            </ul>
            <TheoryCallout type="tip" title="Gyors számolás">
              P(erő ≤ k) = (k/6)², mert mindkét kockának legfeljebb k-t kell mutatnia. Pl. P(erő ≤ 4) = 16/36, így P(erő ≥ 5) = 1 − 16/36 = 5/9.
            </TheoryCallout>
          </div>
          <ProbabilityBonusPracticeMaxTableSvg />
        </div>
      </TheorySection>

      {/* 3. Almák, dominók */}
      <TheorySection title="3. Almák és dominók (3–4. feladat)" badge="Tankönyv 182. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <TheoryCard title="3. (érettségi, 2005): jonatán vagy idared?" badge="Arányok" badgeColor="teal">
              <p className="text-sm text-slate-700">
                Ha az idaredből n darab fér a ládába, jonatánból 25%-kal több: 1,25n. Összesen 2,25n alma, így P(jonatán) = 1,25n / 2,25n = 125/225 = <strong>5/9</strong>. (A láda tényleges mérete nem számít.)
              </p>
            </TheoryCard>
            <TheoryCard title="4.: dominó illesztése az 1–5-ös kőhöz" badge="Leszámlálás" badgeColor="emerald">
              <p className="text-sm text-slate-700">
                A 28 kőből kivesszük az 1–5-öst, marad 27. Illeszthető az a kő, amelyen van 1-es vagy 5-ös: 1-es van 7 kövön, 5-ös 7 kövön, mindkettő csak az 1–5-ösön. Ez 7 + 7 − 1 = 13 kő, ebből az 1–5-ös már nincs a készletben: <strong>12 kedvező</strong>, P = 12/27 = <strong>4/9</strong>.
              </p>
            </TheoryCard>
          </div>
          <ProbabilityBonusPracticeDominoSvg />
        </div>
      </TheorySection>

      {/* 4. Sorban állás és logaritmus */}
      <TheorySection title="4. Sorban állás és kifejezések értéke (5–6. feladat)" badge="Tankönyv 183. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <TheoryCard title="5.: hat gyerek sorban (Sári és Dóri)" badge="Sorrendek" badgeColor="violet">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>a) Sári áll legelöl: 5!/6! = <strong>1/6</strong>.</li>
                <li>b) Nem Dóri áll leghátul: 1 − 1/6 = <strong>5/6</strong>.</li>
                <li>c) Sári az első és Dóri a második: 4!/6! = 24/720 = <strong>1/30</strong>.</li>
                <li>d) Sári és Dóri egymás mögött áll: 2 · 5!/6! = 240/720 = <strong>1/3</strong>.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="6.: n egyjegyű pozitív egész (1, 2, …, 9)" badge="Hatvány, logaritmus" badgeColor="amber">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>a) 2ⁿ mindig természetes szám: P = <strong>1</strong>.</li>
                <li>b) (1/2)ⁿ = 1/2ⁿ sosem egész (n ≥ 1): P = <strong>0</strong>.</li>
                <li>c) log₂ n természetes, ha n = 1, 2, 4, 8: P = <strong>4/9</strong>.</li>
                <li>d) log₀,₅ n = −log₂ n ≥ 0 csak n = 1-nél (értéke 0): P = <strong>1/9</strong>.</li>
              </ul>
            </TheoryCard>
          </div>
          <ProbabilityBonusPracticeLineupSvg />
        </div>
      </TheorySection>

      {/* 5. Házi feladatok */}
      <TheorySection title="5. Házi feladatok – kidolgozva" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <TheoryCard title="HF 1. (érettségi, 2020): sportcsarnok" badge="Átlag" badgeColor="amber">
              <p className="text-sm text-slate-700">
                a) Az 1. zónában szektoronként átlagosan 82 jegy fogyott, összesen 4 · 82 = 328. Az A, B, C szektorba 69 + 96 + 85 = 250 jegy kelt el, így a D szektor 1. zónájába <strong>78</strong> jegyet váltottak. b) A C vagy D szektorba szóló jegyek száma osztva az összes (1102) jeggyel adja a valószínűséget.
              </p>
            </TheoryCard>
            <TheoryCard title="HF 2. (érettségi, 2019): kockaösszegek" badge="Relatív gyakoriság" badgeColor="sky">
              <p className="text-sm text-slate-700">
                A: az összeg 4-nél nagyobb, de 9-nél kisebb (5, 6, 7, 8). a) A 9, 3, 5, 4, 11, 6, 9, 6, 10 összegek közül 3 ilyen (5, 6, 6): relatív gyakoriság 3/9 = <strong>1/3</strong>. b) A 36 esetből 4 + 5 + 6 + 5 = 20 kedvező: P(A) = 20/36 = <strong>5/9</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="HF 3. (érettségi, 2018): Molnár úr kulcsai" badge="Valószínűségi fa" badgeColor="rose">
              <p className="text-sm text-slate-700">
                Először rossz kulcs: 3/4; utána a maradék 3 kulcsból a jó: 1/3. P = 3/4 · 1/3 = <strong>1/4</strong>. (Sorrendekkel: 3 · 1 · 2 · 1 / 4! = 6/24.)
              </p>
            </TheoryCard>
          </div>
          <ProbabilityBonusPracticeKeysTreeSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a lehetséges értékek nem egyformán valószínűek" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi a valószínűsége, hogy a védekező erő 6?"
          wrong="1/6, mert a védekező erő 6-féle értéket vehet fel"
          wrongExplanation="Az 1, 2, …, 6 értékek nem egyformán valószínűek: az 1 csak egy cellában (1; 1) áll, a 6 viszont 11 cellában."
          correct="P(erő = 6) = 11/36"
          correctExplanation="Az elemi események a 36 rendezett dobáspár. A 6-os erő azokban a cellákban áll, ahol legalább az egyik kocka 6-os: 1 − 25/36 = 11/36."
          tip="Mindig olyan elemi eseményekkel számolj, amelyek egyformán valószínűek – a kiszámolt „értékek” (összeg, maximum) erre ritkán alkalmasak."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: célba dobás – geometriai valószínűség" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Az íjászcéltábla 5 koncentrikus körrel van felosztva (sugaruk 1, 2, 3, 4, 5 egység). Ha a lövés a táblán bárhová egyforma eséllyel érkezik, egy gyűrű eltalálásának valószínűsége a gyűrű területének és a tábla területének aránya: a k-adik gyűrűre (k² − (k − 1)²)π / 25π = (2k − 1)/25.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[1, 10, 100, 1000].map((n) => (
              <button key={n} onClick={() => throwDarts(n)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100">
                +{n} lövés
              </button>
            ))}
            <button onClick={resetDarts} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100">
              nullázás
            </button>
            <span className="text-sm text-slate-700 ml-2">
              lövések száma: <strong>{dartTotal}</strong>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <svg viewBox="-110 -110 220 220" className="w-full max-w-xs mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
              {[5, 4, 3, 2, 1].map((r) => (
                <circle key={r} cx="0" cy="0" r={r * 20} fill={['#fde047', '#f87171', '#60a5fa', '#e5e7eb', '#ffffff'][r - 1]} stroke="#334155" strokeWidth="1" />
              ))}
              {[1, 2, 3, 4, 5].map((r) => (
                <text key={`t${r}`} x={r * 20 - 10} y="4" fontSize="8" textAnchor="middle" fill="#0f172a">
                  {11 - r}
                </text>
              ))}
              {darts.map((d, i) => (
                <circle key={i} cx={d.x * 20} cy={d.y * 20} r="1.8" fill="#0f172a" fillOpacity="0.75" />
              ))}
            </svg>
            <TheoryTable
              headers={['Pont', 'Gyűrű', 'Találat', 'Rel. gyak.', 'P (területarány)']}
              rows={ringCounts.map((c, i) => [
                String(10 - i),
                i === 0 ? 'r ≤ 1' : `${i} < r ≤ ${i + 1}`,
                String(c),
                dartTotal ? dec(c / dartTotal) : '–',
                `${2 * i + 1}/25 = ${dec((2 * i + 1) / 25, 2)}`
              ])}
            />
          </div>
          <TheoryCallout type="tip" title="Ismerős szám?">
            A (2k − 1)/25 ugyanaz a minta, mint a védekező erőnél a (2k − 1)/36: ott a „L alakú” cellacsík, itt a gyűrű területe nő egyenletesen.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: a nagyobbik (kisebbik) dobás több kockával" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kockák száma: {nDice}</label>
              <input
                type="range"
                min={1}
                max={4}
                value={nDice}
                onChange={(e) => {
                  setNDice(Number(e.target.value));
                  setSimCounts(null);
                }}
                className="w-full accent-violet-600"
                aria-label="kockák száma"
              />
            </div>
            <div className="flex gap-2 items-end">
              {(['max', 'min'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRule(r);
                    setSimCounts(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${rule === r ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-800 hover:bg-violet-100'}`}
                >
                  {r === 'max' ? 'a legnagyobb dobás' : 'a legkisebb dobás'}
                </button>
              ))}
              <button onClick={simulate} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
                100 dobás
              </button>
            </div>
          </div>
          <TheoryTable
            headers={['k', 'kedvező eset', 'P', 'P (tizedes)', ...(simCounts ? ['rel. gyak. (100 dobás)'] : [])]}
            rows={[1, 2, 3, 4, 5, 6].map((k) => {
              const f = favCount(k);
              return [
                String(k),
                rule === 'max' ? `${k}${sup(nDice)} − ${k - 1}${sup(nDice)} = ${f}` : `${7 - k}${sup(nDice)} − ${6 - k}${sup(nDice)} = ${f}`,
                `${f}/${totalCases}${frac(f, totalCases) !== `${f}/${totalCases}` ? ` = ${frac(f, totalCases)}` : ''}`,
                dec(f / totalCases),
                ...(simCounts ? [dec(simCounts[k - 1] / 100, 2)] : [])
              ];
            })}
          />
          <TheoryCallout type="info" title="Miért ez a képlet?">
            {rule === 'max'
              ? `A legnagyobb dobás legfeljebb k, ha minden kocka legfeljebb k: kⁿ eset. Pontosan k: kⁿ − (k − 1)ⁿ eset a ${totalCases}-ból.`
              : `A legkisebb dobás legalább k, ha minden kocka legalább k: (7 − k)ⁿ eset. Pontosan k: (7 − k)ⁿ − (6 − k)ⁿ eset a ${totalCases}-ból.`}
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProbabilityBonusPracticeTheory;
