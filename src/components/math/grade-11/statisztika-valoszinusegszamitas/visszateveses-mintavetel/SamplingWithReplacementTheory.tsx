import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  SamplingWithReplacementUrnSvg,
  SamplingWithReplacementArrangementsSvg,
  SamplingWithReplacementFormulaSvg,
  SamplingWithReplacementFerkoChartSvg,
  SamplingWithReplacementCoinTenSvg
} from './SamplingWithReplacementFigures';

/** Magyar formátum: tizedesvessző, legfeljebb `d` tizedesjegy; nagyon kicsi számnál normálalak. */
const fmt = (x: number, d = 4): string => {
  if (!Number.isFinite(x)) return '–';
  if (x !== 0 && Math.abs(x) < Math.pow(10, -d)) return x.toExponential(2).replace('.', ',');
  const r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  return r.toLocaleString('hu-HU', { maximumFractionDigits: d });
};

const parseNum = (s: string): number => {
  const t = s.trim().replace(/\s/g, '').replace(',', '.');
  if (t.includes('/')) {
    const [a, b] = t.split('/');
    return Number(a) / Number(b);
  }
  return Number(t);
};

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

/** Egymás alá írt binomiális együttható. */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-[1.6em] font-light leading-none">(</span>
    <span className="inline-flex flex-col items-center leading-tight text-[0.85em] font-semibold">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-[1.6em] font-light leading-none">)</span>
  </span>
);

const Sup: React.FC<{ children: React.ReactNode }> = ({ children }) => <sup className="text-[0.7em]">{children}</sup>;

const PRESETS: { name: string; n: number; k: number; p: string }[] = [
  { name: 'Ferkó: 5 lövés, p = 0,15', n: 5, k: 1, p: '0,15' },
  { name: 'Tünde: 3 palacsinta elszakad, p = 0,2', n: 3, k: 1, p: '0,2' },
  { name: '8 kockadobás, hatos', n: 8, k: 2, p: '1/6' },
  { name: 'gép: 15 termék, p = 0,03', n: 15, k: 2, p: '0,03' },
  { name: 'Panni: 7 dobás, p = 0,8', n: 7, k: 4, p: '0,8' },
  { name: 'rulett: 6 pörgetés, piros', n: 6, k: 4, p: '18/37' },
  { name: '10 érmedobás, fej', n: 10, k: 5, p: '0,5' }
];

export const SamplingWithReplacementTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: urna-szimuláció visszatevéssel
  const [total, setTotal] = useState<number>(10);
  const [red, setRed] = useState<number>(3);
  const [draws, setDraws] = useState<number>(4);
  const [lastSample, setLastSample] = useState<boolean[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const r = Math.min(red, total);
  const pu = r / total;
  const theo = useMemo(() => Array.from({ length: draws + 1 }, (_, j) => binom(draws, j) * Math.pow(pu, j) * Math.pow(1 - pu, draws - j)), [draws, pu]);
  const samples = counts.reduce((s, c) => s + c, 0);
  const resetSim = () => {
    setCounts([]);
    setLastSample([]);
  };
  const runSamples = (m: number) => {
    const next = counts.length === draws + 1 ? [...counts] : Array(draws + 1).fill(0);
    let last: boolean[] = [];
    for (let i = 0; i < m; i++) {
      last = Array.from({ length: draws }, () => Math.floor(Math.random() * total) < r);
      next[last.filter(Boolean).length]++;
    }
    setCounts(next);
    setLastSample(last);
  };
  const maxBar = Math.max(...theo, ...(samples > 0 ? counts.map((c) => c / samples) : [0]), 1e-9);

  // Labor II: binomiális kalkulátor
  const [bn, setBn] = useState<number>(5);
  const [bk, setBk] = useState<number>(1);
  const [bpStr, setBpStr] = useState<string>('0,15');
  const bp = parseNum(bpStr);
  const validP = Number.isFinite(bp) && bp >= 0 && bp <= 1;
  const kk = Math.min(bk, bn);
  const coef = binom(bn, kk);
  const pk = validP ? Math.pow(bp, kk) : NaN;
  const qk = validP ? Math.pow(1 - bp, bn - kk) : NaN;
  const table = validP ? Array.from({ length: bn + 1 }, (_, j) => binom(bn, j) * Math.pow(bp, j) * Math.pow(1 - bp, bn - j)) : [];
  const tableMax = Math.max(...table, 1e-9);

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="visszateveses-mintavetel"
      title="13. Visszatevéses mintavétel"
      subtitle="Ha minden húzás ugyanazok közül az elemek közül történik, a lépések függetlenek – és megjelenik a binomiális eloszlás."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_visszateveses_mintavetel_tananyag.pdf"
      practiceTitle="Készen állsz a visszatevéses mintavételre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — BINOMIÁLIS ELOSZLÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              P(n kísérletből pontosan k sikeres) = <Binom n="n" k="k" /> · p<Sup>k</Sup> · (1 − p)<Sup>n − k</Sup>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Visszatevéses mintavétel:</strong> minden választás pontosan ugyanazok közül az elemek közül történik – a siker valószínűsége (p) minden lépésben ugyanaz.
              </li>
              <li>
                <Binom n="n" k="k" />: ennyiféleképpen választhatjuk ki, hányadik kísérletek lesznek sikeresek; p<Sup>k</Sup>: ezek sikeresek; (1 − p)<Sup>n − k</Sup>: a többi nem.
              </li>
              <li>
                Szélső esetek: <Binom n="n" k="0" /> = <Binom n="n" k="n" /> = 1, <Binom n="n" k="1" /> = n.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető és definíció */}
      <TheorySection title="1. Bevezető: honnan tudjuk, hogy p = 0,7?" badge="Tankönyv 196. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hogy valaki 0,7 valószínűséggel rúgja be a tizenegyest, vagy egy gép 0,02 valószínűséggel termel selejtet – ezeket az adatokat <strong>nagy elemszámú statisztikai minták</strong> elemzéséből kapjuk. A statisztika szolgáltatja azokat az értékeket, amelyekkel a valószínűségszámítás dolgozik (relatív gyakoriság ↔ valószínűség, átlag ↔ várható érték).
            </p>
            <TheoryCard title="Visszatevéses mintavétel" badge="Definíció" badgeColor="sky">
              <p className="text-sm">
                Visszatevéses mintavételről beszélünk, ha egy mintavétel során <strong>minden választás pontosan ugyanazok közül az elemek közül történik</strong>. Például:
              </p>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                <li>a kiválasztott elemet visszatesszük a halmazba, így a következő alkalommal újból választható;</li>
                <li>a kiválasztott elemet nem vesszük ki a halmazból, csak megvizsgáljuk.</li>
              </ul>
            </TheoryCard>
            <TheoryCallout type="info" title="Miért alkalmazzák?">
              Közvélemény-kutatásnál sokkal egyszerűbb a szervezés, ha nem kell foglalkozni azzal, hogy két kérdező ugyanazt az embert kérdezi meg; minőség-ellenőrzésnél a selejt külön válogatása plusz művelet. Nagy elemszámnál a két mintavétel eredménye alig különbözik: ha 100 000 elem közül választunk ki 200-at, a valószínűségek közel egyenlők.
            </TheoryCallout>
          </div>
          <SamplingWithReplacementUrnSvg />
        </div>
      </TheorySection>

      {/* 2. Ugyanazt többször → binomiális képlet */}
      <TheorySection title="2. Elmélet: 5 kísérletből pontosan 3 sikeres" badge="Tankönyv 196–197. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A visszatevéses mintavételnél minden lépésben ugyanaz a helyzet ismétlődik, ezért matematikailag ugyanaz, mint amikor <strong>ugyanazt a kísérletet többször</strong> elvégezzük (12. lecke).
            </p>
            <p className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
              Egymástól függetlenül ötször elvégzünk egy kísérletet, mindegyik 0,8 valószínűséggel sikeres. Mennyi a valószínűsége, hogy pontosan háromszor lesz sikeres?
            </p>
            <p>
              Egy lehetőség: az első három sikeres, a többi nem: 0,8 · 0,8 · 0,8 · 0,2 · 0,2 = 0,8<Sup>3</Sup> · 0,2<Sup>2</Sup>. De a három siker más helyeken is állhat: az 5 hely közül hármat kell kiválasztani, a sorrend nem számít, így <Binom n="5" k="3" /> = 10 lehetőség van. Mindegyik valószínűsége 0,8<Sup>3</Sup> · 0,2<Sup>2</Sup>, ezért
            </p>
            <p className="text-center font-mono text-base">
              P = <Binom n="5" k="3" /> · 0,8<Sup>3</Sup> · 0,2<Sup>2</Sup> = 10 · 0,512 · 0,04 = 0,2048 ≈ <strong>0,205</strong>
            </p>
          </div>
          <SamplingWithReplacementArrangementsSvg />
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SamplingWithReplacementFormulaSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCallout type="tip" title="Binomiális eloszlás">
              A binomiális együtthatók megjelenése miatt <strong>binomiális eloszlásnak</strong> nevezik az így felírt valószínűségeket.
            </TheoryCallout>
            <TheoryTable
              headers={['Eset', 'Együttható', 'Értéke']}
              rows={[
                ['5 kísérletből 5 sikeres', <Binom key="a" n="5" k="5" />, '1'],
                ['5 kísérletből 1 sikeres', <Binom key="b" n="5" k="1" />, '5'],
                ['5 kísérletből 0 sikeres', <Binom key="c" n="5" k="0" />, '1']
              ]}
            />
            <p>
              A képlet a szélső esetekre is jó: minden n természetes számra <Binom n="n" k="0" /> = 1, ezért például 0 siker valószínűsége (1 − p)<Sup>n</Sup>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat */}
      <TheorySection title="3. Kidolgozott feladat: Ferkó a céllövöldében" badge="Tankönyv 198. o." badgeColor="sky">
        <div className="space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Ferkó 100 lövéséből átlagosan 15 talál, ezért úgy modellezzük, hogy minden lövése 0,15 valószínűséggel talál (0,85 valószínűséggel nem). Ötször lő. Mennyi a valószínűsége, hogy 0, 1, 2, 3, 4, illetve 5 találatot ér el?
          </p>
          <TheoryTable
            headers={['Találatok', 'Számolás', 'Valószínűség']}
            rows={[
              ['0', <span key="0" className="font-mono">0,85<Sup>5</Sup></span>, '≈ 0,4437'],
              ['1', <span key="1" className="font-mono"><Binom n="5" k="1" /> · 0,15 · 0,85<Sup>4</Sup></span>, '≈ 0,3915'],
              ['2', <span key="2" className="font-mono"><Binom n="5" k="2" /> · 0,15<Sup>2</Sup> · 0,85<Sup>3</Sup></span>, '≈ 0,1382'],
              ['3', <span key="3" className="font-mono"><Binom n="5" k="3" /> · 0,15<Sup>3</Sup> · 0,85<Sup>2</Sup></span>, '≈ 0,0244'],
              ['4', <span key="4" className="font-mono"><Binom n="5" k="4" /> · 0,15<Sup>4</Sup> · 0,85</span>, '≈ 0,0022'],
              ['5', <span key="5" className="font-mono">0,15<Sup>5</Sup></span>, '≈ 0,0001']
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Mivel minden esetet felsoroltunk, a valószínűségek összege pontosan 1. A kerekítés miatt a táblázat számainak összege csak közelítőleg 1: 0,4437 + 0,3915 + 0,1382 + 0,0244 + 0,0022 + 0,0001 ≈ 1.</p>
              <p>
                A diagram jól mutatja, hogy 5 lövés esetén Ferkónak arra van a legnagyobb esélye (44%), hogy egyszer sem talál, de majdnem ugyanekkora (39%) az esélye egy találatra is.
              </p>
            </div>
            <SamplingWithReplacementFerkoChartSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Tankönyvi feladatok" badge="Tankönyv 199. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat: Tünde palacsintái (elszakad: 0,2)" badge="Feladat" badgeColor="amber">
            <ul className="text-sm text-slate-700 space-y-1 font-mono">
              <li>0 szakad el: 0,8<Sup>3</Sup> = 0,512</li>
              <li>
                1 szakad el: <Binom n="3" k="1" /> · 0,2 · 0,8<Sup>2</Sup> = 0,384
              </li>
              <li>
                2 szakad el: <Binom n="3" k="2" /> · 0,2<Sup>2</Sup> · 0,8 = 0,096
              </li>
              <li>3 szakad el: 0,2<Sup>3</Sup> = 0,008</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: 8 kockadobás" badge="Feladat" badgeColor="sky">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                a) pontosan 2 hatos: <Binom n="8" k="2" /> · (1/6)<Sup>2</Sup> · (5/6)<Sup>6</Sup> ≈ <strong>0,2605</strong>
              </li>
              <li>
                b) pontosan 3 hatos: <Binom n="8" k="3" /> · (1/6)<Sup>3</Sup> · (5/6)<Sup>5</Sup> ≈ <strong>0,1042</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. feladat: hibás gép, 15 termék (p = 0,03)" badge="Feladat" badgeColor="rose">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                a) pontosan 1 selejtes: 15 · 0,03 · 0,97<Sup>14</Sup> ≈ <strong>0,2938</strong>
              </li>
              <li>
                b) pontosan 2 selejtes: <Binom n="15" k="2" /> · 0,03<Sup>2</Sup> · 0,97<Sup>13</Sup> = 105 · … ≈ <strong>0,0636</strong>
              </li>
              <li>
                c) 1 vagy 2 selejtes: a két szám összege ≈ <strong>0,3574</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. feladat: Jocó érvelése hibás" badge="Feladat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Jocó szerint 10 érmedobás után 0,5 annak a valószínűsége, hogy ugyanannyi fej és írás lesz, „mert vagy egyenlő, vagy nem”. Valójában: <Binom n="10" k="5" /> · 0,5<Sup>5</Sup> · 0,5<Sup>5</Sup> = 252/1024 ≈ <strong>0,246</strong>. A két lehetőség nem egyformán valószínű!
            </p>
          </TheoryCard>
          <TheoryCard title="Házi feladat 1.: a hiányzó együttható" badge="Házi" badgeColor="violet">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>
                10 termékből 2 hibás (p = 0,05): <Binom n="10" k="2" /> = 45, 45 · 0,05<Sup>2</Sup> · 0,95<Sup>8</Sup> ≈ 0,0746
              </li>
              <li>
                Panni 7 dobásból 4-szer talál (p = 0,8): <Binom n="7" k="4" /> = 35, 35 · 0,8<Sup>4</Sup> · 0,2<Sup>3</Sup> ≈ 0,1147
              </li>
              <li>
                6 dobásból 3 kettes: <Binom n="6" k="3" /> = 20, 20 · (1/6)<Sup>3</Sup> · (5/6)<Sup>3</Sup> ≈ 0,0536
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladat 2.: rulett, 6 pörgetés (18 piros, 18 fekete, 1 zöld)" badge="Házi" badgeColor="slate">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>a) mindig piros: (18/37)<Sup>6</Sup> ≈ 0,0133</li>
              <li>b) mindig a 0: (1/37)<Sup>6</Sup> ≈ 3,9 · 10<Sup>−10</Sup></li>
              <li>c) 4 piros, majd 2 fekete (ebben a sorrendben): (18/37)<Sup>4</Sup> · (18/37)<Sup>2</Sup> ≈ 0,0133</li>
              <li>
                d) pontosan 4 piros: <Binom n="6" k="4" /> · (18/37)<Sup>4</Sup> · (19/37)<Sup>2</Sup> ≈ 0,2216 (nem piros: 19/37, a zöld is!)
              </li>
            </ul>
          </TheoryCard>
        </div>
        <div className="mt-4">
          <SamplingWithReplacementCoinTenSvg />
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: lemarad a binomiális együttható" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ötször végzünk el egy kísérletet (p = 0,8). Mennyi a valószínűsége, hogy pontosan háromszor sikeres?"
          wrong="0,8³ · 0,2² = 0,02048"
          wrongExplanation="Ez csak EGY konkrét sorrend (pl. SSSKK) valószínűsége. A 3 siker 10-féle helyen állhat."
          correct="(5 alatt 3) · 0,8³ · 0,2² = 10 · 0,02048 ≈ 0,205"
          correctExplanation="A 10 elrendezés kizárja egymást, és mindegyik ugyanolyan valószínű, ezért szorzunk a binomiális együtthatóval."
          tip="Ha a sorrend rögzített (pl. „az első 4 piros, a következő 2 fekete”), akkor NEM kell az együttható – csak a szorzat."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: húzás urnából visszatevéssel" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Az urnában piros és fehér golyók vannak. Visszatevéssel húzunk, és megszámoljuk a piros golyókat. Hasonlítsd össze sok minta <strong>relatív gyakoriságait</strong> a binomiális képlettel kapott <strong>valószínűségekkel</strong>!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">golyók száma: {total}</label>
              <input
                type="range"
                min={2}
                max={20}
                value={total}
                onChange={(e) => {
                  const t = Number(e.target.value);
                  setTotal(t);
                  if (red > t) setRed(t);
                  resetSim();
                }}
                className="w-full accent-sky-600"
                aria-label="golyók száma"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">ebből piros: {r}</label>
              <input
                type="range"
                min={0}
                max={total}
                value={r}
                onChange={(e) => {
                  setRed(Number(e.target.value));
                  resetSim();
                }}
                className="w-full accent-rose-600"
                aria-label="piros golyók"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">húzások egy mintában: n = {draws}</label>
              <input
                type="range"
                min={1}
                max={10}
                value={draws}
                onChange={(e) => {
                  setDraws(Number(e.target.value));
                  resetSim();
                }}
                className="w-full accent-teal-600"
                aria-label="húzások száma"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1 mr-3" aria-label="urna">
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`inline-block w-4 h-4 rounded-full border ${i < r ? 'bg-rose-500 border-rose-700' : 'bg-white border-slate-400'}`} />
              ))}
            </div>
            <span className="text-sm text-slate-700">
              p = {r}/{total} = <strong>{fmt(pu, 3)}</strong> minden húzásnál
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 10, 100, 1000].map((m) => (
              <button key={m} onClick={() => runSamples(m)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-100 text-sky-900 hover:bg-sky-200">
                +{m} minta
              </button>
            ))}
            <button onClick={resetSim} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              törlés
            </button>
          </div>
          {lastSample.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">utolsó minta:</span>
              {lastSample.map((s, i) => (
                <span key={i} className={`inline-block w-5 h-5 rounded-full border-2 ${s ? 'bg-rose-500 border-rose-700' : 'bg-white border-slate-400'}`} />
              ))}
              <span className="font-bold">{lastSample.filter(Boolean).length} piros</span>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-600">
                  <th className="p-1">piros golyók</th>
                  <th className="p-1">képlet: (n alatt k) · p<Sup>k</Sup> · (1 − p)<Sup>n − k</Sup></th>
                  <th className="p-1">relatív gyakoriság ({samples} minta)</th>
                  <th className="p-1 w-48"></th>
                </tr>
              </thead>
              <tbody>
                {theo.map((t, j) => {
                  const rel = samples > 0 && counts.length === draws + 1 ? counts[j] / samples : NaN;
                  return (
                    <tr key={j} className="border-t border-slate-100">
                      <td className="p-1 font-bold">{j}</td>
                      <td className="p-1 font-mono">{fmt(t, 4)}</td>
                      <td className="p-1 font-mono">{fmt(rel, 4)}</td>
                      <td className="p-1">
                        <div className="h-2 rounded bg-sky-600" style={{ width: `${(t / maxBar) * 180}px` }} />
                        <div className="h-2 mt-0.5 rounded bg-amber-400" style={{ width: `${Number.isFinite(rel) ? (rel / maxBar) * 180 : 0}px` }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">kék sáv: valószínűség (képlet) · sárga sáv: relatív gyakoriság (szimuláció). Sok minta után a kettő közel kerül egymáshoz.</p>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: binomiális kalkulátor lépésenként" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setBn(pr.n);
                  setBk(pr.k);
                  setBpStr(pr.p);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kísérletek száma: n = {bn}</label>
              <input type="range" min={1} max={20} value={bn} onChange={(e) => setBn(Number(e.target.value))} className="w-full accent-teal-600" aria-label="binomiális n" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">sikerek száma: k = {kk}</label>
              <input type="range" min={0} max={bn} value={kk} onChange={(e) => setBk(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="binomiális k" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">siker valószínűsége (pl. 0,15 vagy 1/6)</label>
              <input value={bpStr} onChange={(e) => setBpStr(e.target.value)} className="w-full px-2 py-1 rounded border border-teal-300 font-mono" aria-label="binomiális p" />
            </div>
          </div>
          {!validP ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">A valószínűség 0 és 1 közötti szám legyen (tizedesvesszővel vagy törtként)!</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-violet-50 rounded-xl border border-violet-200 p-3">
                  <div className="text-xs text-violet-700 font-bold">helyek kiválasztása</div>
                  <div className="font-mono text-lg">
                    <Binom n={bn} k={kk} /> = {coef}
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3">
                  <div className="text-xs text-emerald-700 font-bold">{kk} siker</div>
                  <div className="font-mono text-lg">
                    p<Sup>{kk}</Sup> ≈ {fmt(pk, 6)}
                  </div>
                </div>
                <div className="bg-rose-50 rounded-xl border border-rose-200 p-3">
                  <div className="text-xs text-rose-700 font-bold">{bn - kk} kudarc</div>
                  <div className="font-mono text-lg">
                    (1 − p)<Sup>{bn - kk}</Sup> ≈ {fmt(qk, 6)}
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl border-2 border-teal-400 p-3">
                  <div className="text-xs text-teal-700 font-bold">P(pontosan {kk} siker)</div>
                  <div className="font-mono text-lg font-black text-teal-900">≈ {fmt(coef * pk * qk, 4)}</div>
                </div>
              </div>
              <div className="space-y-1">
                {table.map((v, j) => (
                  <button key={j} onClick={() => setBk(j)} className={`w-full flex items-center gap-2 text-xs rounded px-1 ${j === kk ? 'bg-teal-100' : 'hover:bg-slate-50'}`} aria-label={`k = ${j} kiválasztása`}>
                    <span className="w-6 text-right font-bold">{j}</span>
                    <span className="flex-1 h-3 bg-slate-100 rounded">
                      <span className={`block h-3 rounded ${j === kk ? 'bg-teal-600' : 'bg-teal-300'}`} style={{ width: `${(v / tableMax) * 100}%` }} />
                    </span>
                    <span className="w-20 text-right font-mono">{fmt(v, 4)}</span>
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-600">a valószínűségek összege: {fmt(table.reduce((s, v) => s + v, 0), 6)} (kerekítés nélkül pontosan 1)</div>
            </>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SamplingWithReplacementTheory;
