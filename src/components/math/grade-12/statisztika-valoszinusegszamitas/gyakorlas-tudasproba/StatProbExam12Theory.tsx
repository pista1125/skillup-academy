import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  StatProbExam12ChapterMapSvg,
  StatProbExam12BoxQuartersSvg,
  StatProbExam12StockCompareSvg,
  StatProbExam12DiceTableSvg,
  StatProbExam12WheelSvg,
  StatProbExam12GradesPieSvg
} from './StatProbExam12Figures';
import { SFig, SBoxPlot, SText, S_RED, hu } from './statKit';

/** Álló binomiális együttható (n alatt k). */
const Bn: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-lg leading-none">(</span>
    <span className="inline-flex flex-col items-center text-[0.8em] leading-tight px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-lg leading-none">)</span>
  </span>
);

const median = (s: number[]) => {
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

/** A tankönyv módszere: a mediánnal kettéosztjuk (páratlan elemszámnál a mediánt elhagyjuk), a két fél mediánja Q1 és Q3. */
const quartiles = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y);
  const n = s.length;
  const lower = s.slice(0, Math.floor(n / 2));
  const upper = s.slice(Math.ceil(n / 2));
  const Q1 = lower.length ? median(lower) : s[0];
  const Q3 = upper.length ? median(upper) : s[n - 1];
  const IQR = Q3 - Q1;
  const lo = Q1 - 1.5 * IQR;
  const hi = Q3 + 1.5 * IQR;
  const inner = s.filter((x) => x >= lo && x <= hi);
  const outliers = s.filter((x) => x < lo || x > hi);
  return { s, Q0: s[0], Q1, Q2: median(s), Q3, Q4: s[n - 1], IQR, lo, hi, wMin: inner[0], wMax: inner[inner.length - 1], outliers };
};

const parse = (t: string) =>
  t
    .split(/[;\s]+/)
    .map((x) => x.replace(',', '.'))
    .filter((x) => x !== '')
    .map(Number)
    .filter((x) => Number.isFinite(x));

type EventKey = 'sum' | 'prod' | 'six' | 'firstEven' | 'double' | 'sumGe';
const EVENTS: Record<EventKey, { name: (v: number) => string; test: (a: number, b: number, v: number) => boolean; range: [number, number] }> = {
  sum: { name: (v) => `az összeg ${v}`, test: (a, b, v) => a + b === v, range: [2, 12] },
  prod: { name: (v) => `a szorzat ${v}`, test: (a, b, v) => a * b === v, range: [1, 36] },
  sumGe: { name: (v) => `az összeg legalább ${v}`, test: (a, b, v) => a + b >= v, range: [2, 12] },
  six: { name: () => 'legalább az egyik hatos', test: (a, b) => a === 6 || b === 6, range: [0, 0] },
  firstEven: { name: () => 'az első dobás páros', test: (a) => a % 2 === 0, range: [0, 0] },
  double: { name: () => 'a két dobás egyenlő', test: (a, b) => a === b, range: [0, 0] }
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const fr = (k: number) => {
  if (k === 0) return '0';
  const g = gcd(k, 36);
  return `${k}/36${g > 1 ? ` = ${k / g}/${36 / g}` : ''}`;
};

export const StatProbExam12Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: dobozdiagram
  const [text, setText] = useState<string>('50,59; 50,62; 50,62; 50,7; 50,7; 50,7; 50,76; 50,76; 50,76; 50,79; 50,81');
  const data = useMemo(() => parse(text), [text]);
  const q = useMemo(() => (data.length >= 2 ? quartiles(data) : null), [data]);

  // Labor II: két kocka eseményei
  const [ea, setEa] = useState<EventKey>('sum');
  const [va, setVa] = useState<number>(5);
  const [eb, setEb] = useState<EventKey>('prod');
  const [vb, setVb] = useState<number>(4);
  const grid = useMemo(() => {
    const cells: { a: number; b: number; inA: boolean; inB: boolean }[] = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) cells.push({ a, b, inA: EVENTS[ea].test(a, b, va), inB: EVENTS[eb].test(a, b, vb) });
    return cells;
  }, [ea, va, eb, vb]);
  const nA = grid.filter((c) => c.inA).length;
  const nB = grid.filter((c) => c.inB).length;
  const nAB = grid.filter((c) => c.inA && c.inB).length;
  const nApB = grid.filter((c) => c.inA || c.inB).length;
  const independent = nAB * 36 === nA * nB;

  const eventSelect = (key: EventKey, setKey: (k: EventKey) => void, v: number, setV: (n: number) => void, label: string) => (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-slate-600">{label} esemény</label>
      <select
        value={key}
        onChange={(e) => {
          const k = e.target.value as EventKey;
          setKey(k);
          if (EVENTS[k].range[1]) setV(Math.min(Math.max(v, EVENTS[k].range[0]), EVENTS[k].range[1]));
        }}
        className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
        aria-label={`${label} esemény típusa`}
      >
        <option value="sum">az összeg = …</option>
        <option value="sumGe">az összeg ≥ …</option>
        <option value="prod">a szorzat = …</option>
        <option value="six">legalább az egyik hatos</option>
        <option value="firstEven">az első dobás páros</option>
        <option value="double">a két dobás egyenlő</option>
      </select>
      {EVENTS[key].range[1] > 0 && (
        <input
          type="range"
          min={EVENTS[key].range[0]}
          max={EVENTS[key].range[1]}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          className="w-full accent-indigo-600"
          aria-label={`${label} esemény értéke`}
        />
      )}
      <div className="text-xs text-slate-600">{EVENTS[key].name(v)}</div>
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="gyakorlas-tudasproba"
      title="11. Gyakorlás, tudáspróba"
      subtitle="A statisztika és valószínűségszámítás fejezet összefoglalása: képlettár, érettségi típusú feladatok, tudáspróba."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_statisztika_valoszinuseg_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
      practiceSubtitle="90 kérdés 3 szinten a teljes statisztika és valószínűségszámítás fejezetből!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A FEJEZET LEGFONTOSABB KÉPLETEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
                σ = √( ((x₁ − x̄)² + … + (xₙ − x̄)²) / n )
              </div>
              <div className="p-2 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
                P(A) = kedvező / összes elemi esemény
              </div>
              <div className="p-2 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
                E = x₁p₁ + x₂p₂ + … + xₙpₙ
              </div>
              <div className="p-2 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
                P(k) = <Bn n="n" k="k" /> p<sup>k</sup>(1 − p)<sup>n − k</sup>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Statisztika: minta, középértékek, szórás, dobozdiagram, osztályközepek.</li>
              <li>Valószínűségszámítás: eseménytér, A + B, A · B, Ā, klasszikus és geometriai valószínűség, várható érték, mintavételek.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. A fejezet áttekintése" badge="Összefoglalás" badgeColor="indigo">
        <StatProbExam12ChapterMapSvg />
      </TheorySection>

      <TheorySection title="2. Képlettár I: statisztika" badge="Képlettár" badgeColor="teal">
        <TheoryTable
          headers={['Fogalom', 'Meghatározás / képlet', 'Lecke']}
          rows={[
            ['reprezentatív minta', 'a minta adatai megfelelően tükrözik a teljes sokaságot (csoportarányok, mintanagyság)', '1.'],
            ['átlag, súlyozott átlag', 'x̄ = (x₁ + … + xₙ) / n; gyakoriságokkal súlyozva', '2.'],
            ['medián, módusz, terjedelem', 'középső adat; leggyakoribb adat; legnagyobb − legkisebb', '2.'],
            ['szórás, relatív szórás', 'σ = √(eltérésnégyzetek átlaga); σ / x̄', '2.'],
            ['hozam', 'hány %-kal nőtt / csökkent az árfolyam az előző időszakhoz képest', '2.'],
            ['dobozdiagram', 'Q0 minimum, Q1 alsó kvartilis, Q2 medián, Q3 felső kvartilis, Q4 maximum', '3.'],
            ['félterjedelem', 'Q3 − Q1 (az adatok középső fele ebbe esik)', '3.'],
            ['kiugró adat', 'Q3-nál több mint 1,5 · (Q3 − Q1)-gyel nagyobb, vagy Q1-nél ennyivel kisebb', '3.'],
            ['osztályközép', 'az osztály két határának számtani közepe; minden adatot ezzel helyettesítünk', '4.']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Képlettár II: valószínűségszámítás" badge="Képlettár" badgeColor="emerald">
        <TheoryTable
          headers={['Fogalom', 'Meghatározás / képlet', 'Lecke']}
          rows={[
            ['eseménytér (H)', 'az elemi események halmaza; esemény = H részhalmaza', '5.'],
            ['biztos / lehetetlen esemény', 'biztosan bekövetkezik / nem következhet be', '5.'],
            ['komplementer (Ā)', 'pontosan akkor következik be, ha A nem; P(Ā) = 1 − P(A)', '5., 7.'],
            ['A + B (összeg)', 'legalább az egyik bekövetkezik', '6.'],
            ['A · B (szorzat)', 'mindkettő bekövetkezik; kizáró eseményeknél lehetetlen esemény', '6.'],
            ['klasszikus valószínűség', 'P(A) = kedvező elemi események száma / összes elemi esemény száma', '7.'],
            ['kizáró események', 'P(A + B) = P(A) + P(B)', '7.'],
            ['független események', 'P(A · B) = P(A) · P(B)', '7.'],
            ['geometriai valószínűség', 'kedvező hossz / terület / szög ÷ teljes; kerék: szög / 360°', '8.'],
            ['várható érték', 'E = x₁p₁ + … + xₙpₙ (súlyozott átlag)', '9.'],
            ['visszatevés nélkül', 'P(k) = (M alatt k)(N − M alatt n − k) / (N alatt n)', '10.'],
            ['visszatevéssel', 'P(k) = (n alatt k) p^k (1 − p)^(n − k)', '10.']
          ]}
        />
        <TheoryCallout type="info" title="Összetartozó fogalompárok">
          relatív gyakoriság ↔ valószínűség · átlag, súlyozott átlag ↔ várható érték · adatok szórása ↔ a valószínűségi változó szórása (kockázat)
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Érettségi típusú feladatok (tankönyv 102. o.)" badge="Feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Angoljegyek (érettségi 2021)" badge="1. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Dávid: 3; 3; 3; 5; 5 → medián 3, átlag 3,8.</li>
              <li>János: medián 4, átlag 2,8 → összeg 14. Rendezve a ≤ b ≤ 4 ≤ d ≤ e, d + e ≥ 8, így a + b ≤ 2 → a = b = 1, d = e = 4.</li>
              <li>
                János jegyei: <strong>1; 1; 4; 4; 4</strong>.
              </li>
              <li>
                Eszter: (9 · 3 + 6 · 4,5) / 15 = 54 / 15 = <strong>3,6</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Dobozdiagram és visszatevéses minta" badge="2. feladat" badgeColor="sky">
            <StatProbExam12BoxQuartersSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                12 adat, mindegyik osztály valószínűsége ¼. a) mind B-be vagy C-be: 0,5<sup>12</sup> ≈ <strong>0,000244</strong>.
              </li>
              <li>
                b) pontosan 3 (a negyede) kisebb Q1-nél: <Bn n="12" k="3" /> · 0,25<sup>3</sup> · 0,75<sup>9</sup> ≈ <strong>0,258</strong>.
              </li>
              <li>
                c) legfeljebb 2 adat ≥ Q3: P(0) + P(1) + P(2) ≈ 0,032 + 0,127 + 0,232 ≈ <strong>0,391</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <TheoryCard title="C) Melyik részvény kockázatosabb?" badge="3. feladat" badgeColor="purple">
            <StatProbExam12StockCompareSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              Az átlagos hozamok eltérnek, ezért a relatív szórást nézzük: A: 3 / 13 ≈ 0,23; B: 6 / 24 = 0,25. A relatív szórás alapján a{' '}
              <strong>B részvény</strong> a kockázatosabb (bár a különbség kicsi; az átlagos árfolyam a kockázatról nem mond semmit).
            </p>
          </TheoryCard>
          <TheoryCard title="D) Hatoslottó és kuponok" badge="4–5. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                1–45 között 7 szám osztható 6-tal (6, 12, …, 42). P = <Bn n="7" k="2" /> · <Bn n="38" k="4" /> / <Bn n="45" k="6" /> = 21 · 73 815 / 8 145 060 ≈{' '}
                <strong>0,190</strong>.
              </li>
              <li>
                Kupon: E = 0,9 · 1000 + 0,08 · 2000 + 0,02 · 8000 = <strong>1220 Ft</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Tudáspróba (tankönyv 103. o.)" badge="Tudáspróba" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Két kocka: összeg 5, szorzat 4" badge="2. feladat" badgeColor="sky">
            <StatProbExam12DiceTableSvg className="w-full max-w-[300px] h-auto mx-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A = {'{(1;4), (2;3), (3;2), (4;1)}'}: P(A) = 4/36 = 1/9; B = {'{(1;4), (2;2), (4;1)}'}: P(B) = 3/36 = 1/12.</li>
              <li>A · B = {'{(1;4), (4;1)}'}: P(A · B) = 2/36 = 1/18; P(A + B) = (4 + 3 − 2) / 36 = 5/36.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Mérges pók, szerencsekerék, szóbeli tételek" badge="3–5. feladat" badgeColor="purple">
            <StatProbExam12WheelSvg className="w-full max-w-[220px] h-auto mx-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                Pók (p = 0,7, 5 alkalom): egyszer sem 0,3<sup>5</sup> ≈ 0,0024; legfeljebb egyszer 0,3<sup>5</sup> + 5 · 0,7 · 0,3<sup>4</sup> ≈ 0,0308.
              </li>
              <li>Kerék: E = (3000 · 60 + 200 · 150 + 5000 · 30 + 500 · 120) / 360 = 420 000 / 360 ≈ 1166,67 Ft.</li>
              <li>
                20 tétel, 9 XX. századi, 6 húzás visszatevés nélkül: a) 11/20 = 0,55; b) <Bn n="9" k="2" /> · <Bn n="11" k="4" /> / <Bn n="20" k="6" /> =
                36 · 330 / 38 760 ≈ 0,306; c) legfeljebb 2: ≈ 0,426.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="A tudáspróba dobozdiagramja" badge="1. feladat" badgeColor="emerald">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Az ábráról: Q0 = 26, Q1 = 32, Q2 = 34, Q3 = 42, Q4 = 49.</li>
            <li>
              a) Félterjedelem 42 − 32 = 10, másfélszerese 15: kiugró az lenne, ami 17-nél kisebb vagy 57-nél nagyobb – <strong>nincs kiugró adat</strong>. b) Medián:{' '}
              <strong>34</strong>. c) Terjedelem 49 − 26 = 23, ez a félterjedelem <strong>2,3-szerese</strong>. d) Az adatok negyede legalább{' '}
              <strong>42</strong> (a felső kvartilis).
            </li>
          </ul>
        </TheoryCard>
        <TheoryCallout type="tip" title="Ráadás: katonai erő három kockával">
          A katonai erő a dobások maximuma. Maximum legfeljebb m: m³ dobás, ezért pontosan m: m³ − (m − 1)³. Erő 2: 8 − 1 = 7 dobás (P = 7/216), erő 3: 27 − 8 =
          19 (P = 19/216), erő 4: 64 − 27 = 37 (P = 37/216).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. További gyakorló feladatok (tankönyv 100–101. o.)" badge="Gyakorlás" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Érettségi jegyek (érettségi 2012)" badge="2. feladat" badgeColor="sky">
            <StatProbExam12GradesPieSvg className="w-full max-w-[260px] h-auto mx-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>András: 3; 4; 4; 3; 5 → átlag 3,8, szórás √0,56 ≈ 0,75. Bea átlaga 4,6.</li>
              <li>Cili szórása 0, átlaga 3,8 és 4,6 közé esik → minden jegye 4.</li>
              <li>Dávid: medián 4, átlag 4,4 → 4; 4; 4; 5; 5, ezek 5! / (3! · 2!) = 10-féleképpen írhatók be.</li>
              <li>Kördiagram: 4 jeles ↔ 60°, így 1 fő ↔ 15°. Közepes: 360° − 60° − 150° − 45° = 105° → 7 fő.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Sorsjegy, biztosító, PIN-kód, hozamok" badge="3. f., HF" badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Sorsjegy: E = 0,1 · 700 + 0,09 · 2000 + 0,01 · 10 000 = 350 Ft; 1000 db eladása 500 Ft-ért: haszon 150 000 Ft.</li>
              <li>Biztosító (n = 1200, p = 0,005): pontosan 3 ≈ 0,089; legfeljebb 1 ≈ 0,017.</li>
              <li>Iskola: (373 · 3,11 + 120 · 4,12 + 89 · 3,78) / 582 ≈ 3,42; 3,5-höz a helyben lakóknak ≈ 3,23-ra (≈ 0,12-dal) kellene javítaniuk.</li>
              <li>PIN 3; 6; 6; 9: 4! / 2! = 12 sorrend; elsőre, csak másodikra, csak harmadikra egyaránt 1/12; három próbából 3/12 = 1/4.</li>
              <li>Hozamok 4%, 8%, −2%, −4% (25 600 → 26 624 → 28 753,92 → 28 179 → 27 051,84 Ft): átlag 1,5%, szórás √22,75 ≈ 4,77%.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hibák a fejezetben" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Nem kizáró eseményeknél nem elég összeadni"
          wrong="P(A + B) = P(A) + P(B) = 4/36 + 3/36 = 7/36 (összeg 5 vagy szorzat 4)."
          wrongExplanation="Az (1;4) és (4;1) dobás mindkét eseményben benne van, így kétszer számoltuk őket."
          correct="P(A + B) = P(A) + P(B) − P(A · B) = (4 + 3 − 2) / 36 = 5/36."
          correctExplanation="Az összeadási szabály csak egymást kizáró eseményekre igaz; különben le kell vonni a közös részt."
          tip="További gyakori hibák: szórásnégyzet a szórás helyett; a binomiális képletből kimarad a (n alatt k); visszatevés nélküli húzást binomiálisan számolunk."
        />
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: Dobozdiagram és kiugró adatok" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Adatok (pontosvesszővel vagy szóközzel elválasztva)</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono" aria-label="adatok" />
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                ['úszóedzés (35. lecke)', '50,59; 50,62; 50,62; 50,7; 50,7; 50,7; 50,76; 50,76; 50,76; 50,79; 50,81'],
                ['kiugró adattal', '12; 14; 15; 15; 16; 17; 18; 19; 20; 35'],
                ['András jegyei', '3; 4; 4; 3; 5'],
                ['csapadék 2021', '63; 28; 13; 34; 47; 22; 19; 34; 26; 14; 53; 67']
              ].map(([n, v]) => (
                <button key={n} onClick={() => setText(v)} className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  {n}
                </button>
              ))}
            </div>
          </div>
          {q ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {[
                  ['Q0 minimum', hu(q.Q0, 3)],
                  ['Q1 alsó kvartilis', hu(q.Q1, 3)],
                  ['Q2 medián', hu(q.Q2, 3)],
                  ['Q3 felső kvartilis', hu(q.Q3, 3)],
                  ['Q4 maximum', hu(q.Q4, 3)],
                  ['félterjedelem Q3 − Q1', hu(q.IQR, 3)],
                  ['kiugró, ha kisebb mint', hu(q.lo, 3)],
                  ['kiugró, ha nagyobb mint', hu(q.hi, 3)]
                ].map(([t, v]) => (
                  <div key={t} className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                    <div className="text-[11px] text-slate-500">{t}</div>
                    <div className="font-mono font-black text-indigo-900">{v}</div>
                  </div>
                ))}
              </div>
              {(() => {
                const span = q.Q4 - q.Q0 || 1;
                const axMin = q.Q0 - span * 0.08;
                const axMax = q.Q4 + span * 0.08;
                const ticks = [q.Q0, q.Q2, q.Q4];
                return (
                  <SFig w={320} h={130} className="w-full max-w-[520px] h-auto mx-auto">
                    <SBoxPlot
                      q={[q.wMin, q.Q1, q.Q2, q.Q3, q.wMax]}
                      outliers={q.outliers}
                      axMin={axMin}
                      axMax={axMax}
                      ticks={ticks}
                      x0={20}
                      w={280}
                      y={55}
                      bh={28}
                      tickFmt={(v) => hu(v, 2)}
                    />
                    {q.outliers.length > 0 && <SText x={160} y={122} t={`kiugró adat: ${q.outliers.map((o) => hu(o, 2)).join('; ')}`} s={8} c={S_RED} b />}
                  </SFig>
                );
              })()}
              <p className="text-xs text-slate-600">
                A mediánnal kettéosztjuk a rendezett adatsort (páratlan elemszámnál a mediánt elhagyjuk), a két rész mediánja Q1 és Q3. Kiugró az az adat, amely Q1
                alatt vagy Q3 felett több mint 1,5 · (Q3 − Q1)-gyel tér el; a bajusz a legszélső nem kiugró adatig tart.
              </p>
            </>
          ) : (
            <p className="text-sm text-rose-600">Adj meg legalább két számot!</p>
          )}
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: Események két kockával" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eventSelect(ea, setEa, va, setVa, 'A')}
            {eventSelect(eb, setEb, vb, setVb, 'B')}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <SFig w={200} h={170} className="w-full max-w-[300px] h-auto mx-auto">
              {grid.map((c) => (
                <g key={`${c.a}-${c.b}`}>
                  <rect
                    x={40 + (c.b - 1) * 24}
                    y={20 + (c.a - 1) * 24}
                    width={24}
                    height={24}
                    fill={c.inA && c.inB ? '#c4b5fd' : c.inA ? '#bfdbfe' : c.inB ? '#fde68a' : '#ffffff'}
                    stroke="#94a3b8"
                    strokeWidth={0.6}
                  />
                  <SText x={40 + (c.b - 1) * 24 + 12} y={20 + (c.a - 1) * 24 + 15} t={`${c.a};${c.b}`} s={6.5} />
                </g>
              ))}
              <SText x={112} y={14} t="2. kocka →" s={7} />
              <SText x={20} y={95} t="1. kocka" s={7} rot={-90} />
              <SText x={112} y={166} t="kék: A · sárga: B · lila: A · B" s={7} />
            </SFig>
            <div className="grid grid-cols-2 gap-2 text-center">
              {[
                ['P(A)', fr(nA)],
                ['P(B)', fr(nB)],
                ['P(A · B)', fr(nAB)],
                ['P(A + B)', fr(nApB)],
                ['P(Ā)', fr(36 - nA)],
                ['független?', independent ? 'igen: P(A · B) = P(A) · P(B)' : 'nem']
              ].map(([t, v]) => (
                <div key={t} className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                  <div className="text-[11px] text-slate-500">{t}</div>
                  <div className="font-mono font-black text-purple-900 text-xs">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-600">
            Ellenőrzés: P(A + B) = P(A) + P(B) − P(A · B) → {nA} + {nB} − {nAB} = {nApB} kedvező eset. {nAB === 0 ? 'A két esemény kizárja egymást.' : ''}
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatProbExam12Theory;
