import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { GraphDraw, circlePts, completeEdges, degrees, binom, fact, falling, fmtInt, B3_PTS, B3_EDGES, P2_PTS, P2_EDGES } from './graphKit';
import { CountingBoxesSvg, PascalTriangleSvg, HandshakeGraphSvg, DegreeSumSvg, DescendingDigitsSvg } from './CombinatoricsGraphsSummaryFigures';

const ALL_PAIRS = completeEdges(6);
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (x: number) => String(x).split('').map((c) => SUP[Number(c)]).join('');
const keyOf = (e: [number, number]) => `${e[0]}-${e[1]}`;

const PRESETS: { name: string; edges: [number, number][] }[] = [
  { name: 'üres gráf', edges: [] },
  { name: 'teljes gráf (kézfogások)', edges: ALL_PAIRS },
  {
    name: 'kör (mindenkinek 2 ismerőse)',
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [0, 5]
    ]
  },
  {
    name: 'kocka lapjai (6 lap, szomszédos lapok)',
    edges: ALL_PAIRS.filter(([a, b]) => !((a === 0 && b === 3) || (a === 1 && b === 4) || (a === 2 && b === 5)))
  }
];

export const CombinatoricsGraphsSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – kombinatorikai döntési fa
  const [n, setN] = useState<number>(8);
  const [k, setK] = useState<number>(3);
  const [ordered, setOrdered] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(false);
  // Labor II – gráfépítő
  const [edges, setEdges] = useState<string[]>(PRESETS[2].edges.map(keyOf));

  const kk = Math.min(k, n);
  const result = useMemo(() => {
    if (k === n && ordered && !repeat) return { name: 'sorba rendezés (permutáció)', formula: `${n}!`, value: fact(n) };
    if (ordered && repeat) return { name: 'ismétléses variáció', formula: `${n}${sup(k)}`, value: n ** k };
    if (ordered) return { name: 'variáció (ismétlés nélkül)', formula: kk === 0 ? '1' : kk <= 5 ? Array.from({ length: kk }, (_, i) => n - i).join(' · ') : `${n} · ${n - 1} · … · ${n - kk + 1}`, value: falling(n, kk) };
    if (repeat) return { name: 'ismétléses kombináció (érettségin ritka)', formula: `(${n + k - 1} alatt ${k})`, value: binom(n + k - 1, k) };
    return { name: 'kombináció', formula: `(${n} alatt ${kk}) = ${n}! / (${kk}! · ${n - kk}!)`, value: binom(n, kk) };
  }, [n, k, kk, ordered, repeat]);

  const E = edges.map((s) => s.split('-').map(Number) as [number, number]);
  const deg = degrees(6, E);
  const degSum = deg.reduce((a, b) => a + b, 0);
  const pts = circlePts(6, 130, 125, 90);
  const toggle = (e: [number, number]) => {
    const key = keyOf(e);
    setEdges((cur) => (cur.includes(key) ? cur.filter((x) => x !== key) : [...cur, key]));
  };
  const L = ['1', '2', '3', '4', '5', '6'];

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="kombinatorika-grafok"
      title="2. Kombinatorika, gráfok – összefoglalás"
      subtitle="Faktoriális, sorba rendezés, kiválasztás, binomiális együtthatók, részhalmazok száma, gráf, fokszám, fokszámtétel – érettségi ismétlés."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_kombinatorika_grafok_osszefoglalas_tananyag.pdf"
      practiceTitle="Készen állsz a kombinatorikai és gráfos érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SZÁMÍT A SORREND?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">(n alatt k) = n! / (k! · (n − k)!)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>n elem sorba rendezése: n!; k kiválasztása, ha számít a sorrend: n · (n − 1) · … · (n − k + 1), ismétléssel nᵏ.</li>
              <li>Ha a sorrend nem számít: (n alatt k); n elemű halmaz összes részhalmaza: 2ⁿ.</li>
              <li>Fokszámtétel: a fokszámok összege az élek számának kétszerese (mindig páros).</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Fogalmak, tételek, módszerek" badge="Tankönyv 110. o." badgeColor="indigo">
        <p className="text-sm text-slate-700 leading-relaxed">
          A kombinatorikában egy véges halmaz elemeit rendezzük sorba, vagy elemei közül választunk ki néhányat. A gráf pontok (csúcsok) és bizonyos pontokat összekötő élek halmaza.
        </p>
        <TheoryTable
          headers={['', 'Fogalom', 'Lényeg']}
          rows={[
            ['D', 'Faktoriális', 'n! = 1 · 2 · … · n (n ∈ ℤ⁺); 0! = 1'],
            ['T', 'Sorba rendezés', 'n különböző elem sorrendjeinek száma n! (permutáció); pl. 5! = 120'],
            ['T', 'Kiválasztás, ha számít a sorrend', 'legfeljebb egyszer: n · (n − 1) · … · (n − k + 1); akár többször: nᵏ (variáció); pl. 8 · 7 · 6 = 336, 6³ = 216'],
            ['D', 'Binomiális együttható', '(n alatt k) = n! / (k! · (n − k)!), n, k ∈ ℕ, n ≥ k'],
            ['T', 'Kiválasztás, ha nem számít a sorrend', 'n elemből k, mindegyik legfeljebb egyszer: (n alatt k) (kombináció); pl. (8 alatt 3) = 56'],
            ['T', 'Összefüggések', '(n alatt k) = (n alatt n − k); (n alatt n) = (n alatt 0) = 1; (n alatt 1) = n'],
            ['T', 'k elemű részhalmazok száma', 'egy n elemű halmaznak (n alatt k) darab k elemű részhalmaza van'],
            ['T', 'Összes részhalmaz', 'egy n elemű halmaznak 2ⁿ részhalmaza van (az üres halmaz és önmaga is)'],
            ['D', 'Gráf', 'pontok (csúcsok) és bizonyos pontokat összekötő élek halmaza'],
            ['D', 'Fokszám', 'egy csúcsból kiinduló élek száma'],
            ['T', 'Fokszámok összege', 'minden gráfban az élek számának kétszerese, ezért mindig páros']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CountingBoxesSvg />
          <PascalTriangleSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Kidolgozott feladat: csökkenő számjegyek" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Hány olyan ötjegyű szám van, amelynek az utolsót kivéve mindegyik számjegye nagyobb, mint a rákövetkező?</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>A számjegyek mind különbözők, és csökkenő sorrendben állnak; a legkisebb az egyesek helyén (így a 0 sosem kerül előre).</li>
              <li>Bármely 5 különböző számjegyből pontosan egy ilyen szám képezhető (pl. 4, 8, 0, 7, 3 → 87 430).</li>
              <li>Annyi szám van, ahányféleképpen a 10 számjegyből 5-öt kiválaszthatunk, ha a sorrend nem számít: (10 alatt 5) = <strong>252</strong>.</li>
            </ol>
            <TheoryCallout type="tip" title="Számológép">A binomiális együttható az nCr gombbal közvetlenül kiszámolható.</TheoryCallout>
          </div>
          <DescendingDigitsSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: kézfogások és fényképek" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>6 cégvezető találkozik, mindenki mindenkivel pontosan egyszer kezet fog, és minden kézfogásról fotó készül.</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> Mindenki 5 emberrel fog kezet: 6 · 5 = 30, de minden kézfogást kétszer számoltunk ⇒ <strong>15</strong> kézfogás. (A 6 pontú teljes gráf éleinek száma.)
              </li>
              <li>
                <strong>b)</strong> A 15 kép mindegyikéről eldönthető, hogy felkerül-e: 2¹⁵ = 32 768 lehetőség; ebből levonjuk azt, amikor egyik sem kerül fel ⇒ <strong>32 767</strong>.
              </li>
              <li>Ez éppen a 15 elemű halmaz nem üres részhalmazainak száma.</li>
            </ol>
          </div>
          <HandshakeGraphSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Gráfok és a fokszámtétel" badge="Elmélet" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Minden él két csúcs fokszámát növeli eggyel, ezért a fokszámok összege az élszám kétszerese.</p>
            <TheoryCallout type="info" title="Bizonyítás a tételből (Q5. b)">
              7 vállalkozás, minden projektben pontosan 2 dolgozik együtt (gráf: csúcs = vállalkozás, él = projekt). Ha mindegyik 3 projektben venne részt, a fokszámok összege 7 · 3 = 21 lenne – páratlan, ami lehetetlen.
            </TheoryCallout>
            <ul className="list-disc pl-5 space-y-1">
              <li>A9.: a kocka lapjainak „szomszédsági” gráfja: 6 csúcs, mindegyik fokszáma 4 ⇒ 6 · 4 / 2 = 12 él.</li>
              <li>B5.: 7 ember, mindenkinek 2 ismerőse: 7 · 2 / 2 = 7 él (pl. egy 7 hosszú kör, vagy egy 3-as és egy 4-es kör).</li>
              <li>Q5. c): 4 vállalkozás 3, 3 vállalkozás 2 projektben ⇒ (12 + 6) / 2 = 9 projekt; 4 kiválasztása: (9 alatt 4) = 126.</li>
            </ul>
          </div>
          <DegreeSumSvg />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Gráf kiegészítése (B3.)" badge="B3." badgeColor="sky">
            <svg viewBox="0 0 240 168" className="w-full max-w-[280px] h-auto mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a B3. feladat 8 csúcsú, 9 élű gráfja">
              <rect x="1" y="1" width="238" height="166" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <GraphDraw pts={B3_PTS} edges={B3_EDGES} r={5} />
            </svg>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A gráfnak 8 csúcsa és 9 éle van; a fokszámok: 3, 3 és hat darab 2 (összeg 18 = 2 · 9).</li>
              <li>a) A 8 csúcsú teljes gráfnak 8 · 7 / 2 = 28 éle van ⇒ <strong>19</strong> élt kell behúzni.</li>
              <li>b) Ha minden fokszám 5, az élek száma 8 · 5 / 2 = 20 ⇒ <strong>11</strong> új él kell (a hiányzó élek közül ilyen 11 kiválasztható: a két 3-as fokú csúcsból 2-2, a többiből 3-3 új él indul).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="A 63 osztóinak gráfja (P2.)" badge="P2." badgeColor="purple">
            <svg viewBox="0 0 250 176" className="w-full max-w-[280px] h-auto mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="a P2. feladat gráfja a 63 osztóival">
              <rect x="1" y="1" width="248" height="174" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <GraphDraw pts={P2_PTS} edges={P2_EDGES} labels={['1', '3', '21', '7', '63', '9']} r={12} />
            </svg>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Az osztók: 1; 3; 7; 9; 21; 63. Fokszámaik az oszthatósági gráfban: 1 és 63: 5, 3 és 21: 4, 7 és 9: 3 (12 él). Nem szomszédos párok: 3–7, 7–9, 9–21.</li>
              <li>a) Az ábrán a két 5-ödfokú csúcsba 1 és 63, a nem összekötött „útvonal” csúcsaiba sorban 3, 7, 9, 21 kerül (egy kitöltés látható).</li>
              <li>b) Az 1 és a 63 helye felcserélhető (2), és a 3–7–9–21 út megfordítható (2): <strong>4</strong> szabályos kitöltés van.</li>
              <li>c) Legalább egy osztó kiválasztása: 2⁶ − 1 = <strong>63</strong>-féleképpen.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="Körmérkőzéses sakkverseny (Q2.)" badge="Q2." badgeColor="emerald">
          <TheoryTable
            headers={['Név', 'Anna', 'Béla', 'Cili', 'Dani', 'Ede', 'Feri']}
            rows={[
              ['Eddigi ellenfelek', 'Béla, Ede, Feri', 'Anna, Cili, Dani', 'Béla, Dani, Feri', 'Béla, Cili, Ede', 'Anna, Dani, Feri', 'Anna, Cili, Ede'],
              ['Pontszám', '1', '1,5', '1', '2', '1,5', '2']
            ]}
          />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mt-2">
            <li>a) A gráfnak 6 csúcsa és 9 éle van (az eddig lejátszott 9 parti), minden csúcs fokszáma 3.</li>
            <li>b) Összesen (6 alatt 2) = 15 partit játszanak, fordulónként 3-at, tehát 5 forduló van; mindenki 3 partit játszott, így <strong>2 forduló</strong> van hátra.</li>
            <li>c) Anna 1, Béla 1,5, Cili 1, Dani 2, Ede 1,5, Feri 2 pont (összesen 9 pont = 9 parti).</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="5. Megoldott feladatok a blokkból" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Sorrendek" badge="A5., B6., P1. c)" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>7 ember belépése, Péter nem második: 7! − 6! = 5040 − 720 = <strong>4320</strong>.</li>
              <li>8 ember egy sorban, Arnold valamelyik szélen: 2 · 7! = <strong>10 080</strong>.</li>
              <li>5 versenyző, Anna előrébb végez, mint Péter: 5! / 2 = <strong>60</strong> (szimmetria).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Számjegyek" badge="A6., B12., Q3." badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Négyjegyűek, amelyekben van 5-ös: 9000 − 8 · 9³ = <strong>3168</strong> (komplementer módszer).</li>
              <li>Ötjegyűek csupa páros jeggyel: 4 · 5⁴ = 2500; csupa különböző jeggyel: 9 · 9 · 8 · 7 · 6 = 27 216.</li>
              <li>Hatjegyűek szigorúan növekvő jegyekkel: a 0 nem szerepelhet ⇒ (9 alatt 6) = 84.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Részhalmazok" badge="A8., A12., B9." badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>{'{2; 4; …; 14}'} (7 elem) részhalmazai: 2⁷ = 128.</li>
              <li>5 LED-es lámpa: 2⁵ − 1 = 31 világítás; fehér / piros / nem világít: 3⁵ − 1 = 242.</li>
              <li>10 elemű halmaz legalább 7 elemű részhalmazai: 120 + 45 + 10 + 1 = 176.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Kiválasztás csoportokból" badge="A7., B11., P5., Q1. a)" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>4 + 5 fős családok: kezdetben (4 alatt 2) + (5 alatt 2) = 16, a végén (9 alatt 2) = 36 ismeretség.</li>
              <li>34 fős osztály: 2 képviselő és 4 felelős: (34 alatt 2) · (32 alatt 4) = 561 · 35 960 = 20 173 560.</li>
              <li>30 golyó, 5-öt húzunk: csupa fehér (10 alatt 5) = 252; legalább 2 fehér: 142 506 − 15 504 − 48 450 = 78 552; pontosan 2 fehér és pontosan két 10-zel osztható szám (10 fehér, 20 fekete, 30 zöld): 9 · 2 · (18 alatt 2) + (9 alatt 2) · 18 = 2754 + 648 = 3402.</li>
              <li>(n alatt 2) = 50n + 1575 ⇒ n² − 101n − 3150 = 0 ⇒ n = 126.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Tipikus hiba: számít a sorrend, vagy nem?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Kézfogásnál nem kell a sorrend"
          wrong="6 ember kézfogásainak száma 6 · 5 = 30."
          wrongExplanation="Az A–B és a B–A ugyanaz a kézfogás: így minden párt kétszer számoltunk."
          correct="(6 alatt 2) = 6 · 5 / 2 = 15 kézfogás."
          correctExplanation="Ha a kiválasztott elemek sorrendje nem számít, a sorrendes darabszámot k!-sal osztjuk: (n alatt k) = n · (n − 1) · … · (n − k + 1) / k!."
          tip="Kérdezd meg magadtól: ha felcserélem a kiválasztott elemeket, más eredményt kapok? Ha igen → számít a sorrend."
        />
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium I: melyik képlet kell?" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Elemek száma: n = {n}</label>
                <input type="range" min="1" max="12" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-blue-600" aria-label="n" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kiválasztott elemek: k = {k}</label>
                <input type="range" min="0" max="12" value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="k" />
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setOrdered(!ordered)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${ordered ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  Számít a sorrend: {ordered ? 'igen' : 'nem'}
                </button>
                <button onClick={() => setRepeat(!repeat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${repeat ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  Ismétlődhet egy elem: {repeat ? 'igen' : 'nem'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: '8 versenyző dobogója', v: [8, 3, true, false] },
                  { t: '3 kockadobás', v: [6, 3, true, true] },
                  { t: '8 gyerekből 3', v: [8, 3, false, false] },
                  { t: '5 elem sorba', v: [5, 5, true, false] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setN(p.v[0] as number);
                      setK(p.v[1] as number);
                      setOrdered(p.v[2] as boolean);
                      setRepeat(p.v[3] as boolean);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              {!repeat && k > n ? (
                <div className="text-rose-700 font-bold">Ismétlés nélkül nem választhatunk n-nél több elemet (k ≤ n).</div>
              ) : (
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
                  <div className="text-xs text-slate-600">{result.name}</div>
                  <div className="font-mono">
                    {result.formula} = <strong>{fmtInt(result.value)}</strong>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-600">Pascal-háromszög {n}. sora – (n alatt k) értékek, összegük 2ⁿ = {fmtInt(2 ** n)}</div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: n + 1 }, (_, j) => (
                  <span
                    key={j}
                    className={`px-2 py-1 rounded-lg text-xs font-mono border ${!ordered && !repeat && j === kk ? 'bg-amber-200 border-amber-400 font-bold' : 'bg-slate-50 border-slate-200'}`}
                  >
                    ({n} alatt {j}) = {fmtInt(binom(n, j))}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-600">
                Kapcsolat: n · (n − 1) · … · (n − k + 1) = (n alatt k) · k!, pl. {fmtInt(falling(n, kk))} = {fmtInt(binom(n, kk))} · {fmtInt(fact(kk))}.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium II: gráfépítő és fokszámtétel" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 text-sm">
              <p className="text-xs text-slate-600">Kattints egy csúcspárra az él be- vagy kikapcsolásához!</p>
              <div className="grid grid-cols-5 gap-1.5">
                {ALL_PAIRS.map((e) => {
                  const on = edges.includes(keyOf(e));
                  return (
                    <button
                      key={keyOf(e)}
                      onClick={() => toggle(e)}
                      className={`px-1.5 py-1 rounded-md text-[11px] font-bold ${on ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-purple-100'}`}
                    >
                      {L[e[0]]}–{L[e[1]]}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.name} onClick={() => setEdges(p.edges.map(keyOf))} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100">
                    {p.name}
                  </button>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                <div>
                  Élek száma: <strong>{E.length}</strong> (legfeljebb (6 alatt 2) = 15)
                </div>
                <div className="font-mono text-xs">
                  Fokszámok: {deg.join(' + ')} = <strong>{degSum}</strong> = 2 · {E.length} ✓
                </div>
                <div className="text-xs">
                  {E.length === 15 ? 'Teljes gráf: bármely két csúcs között pontosan egy él fut.' : `Teljes gráfhoz még ${15 - E.length} él hiányzik.`}{' '}
                  {deg.every((x) => x === deg[0]) ? `Minden csúcs fokszáma ${deg[0]}.` : ''}
                </div>
              </div>
            </div>
            <svg viewBox="0 0 260 250" className="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <rect x="1" y="1" width="258" height="248" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
              <GraphDraw pts={pts} edges={E} labels={L} notes={deg.map((x) => `fok ${x}`)} edgeColor="#7c3aed" r={13} />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinatoricsGraphsSummaryTheory;
