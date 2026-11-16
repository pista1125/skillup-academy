import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { fmt, S_BLUE, S_RED, S_INK, S_PURPLE, S_GRID } from './sumKit';
import { BoxPlotSvg, ClassHistogramSvg, DiceMaxTableSvg, SamplingCompareSvg, EventVennSvg, BinomialBarsSvg } from './StatProbSummaryFigures';

const median = (s: number[]) => {
  const n = s.length;
  if (n === 0) return NaN;
  return n % 2 === 1 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

/** A tankönyv szerinti kvartilisek: páratlan elemszámnál a mediánt elhagyjuk. */
const describeData = (data: number[]) => {
  const s = [...data].sort((a, b) => a - b);
  const n = s.length;
  const mean = s.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(s.reduce((a, b) => a + (b - mean) ** 2, 0) / n);
  const lower = n % 2 === 0 ? s.slice(0, n / 2) : s.slice(0, (n - 1) / 2);
  const upper = n % 2 === 0 ? s.slice(n / 2) : s.slice((n + 1) / 2);
  const counts = new Map<number, number>();
  s.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
  const maxC = Math.max(...counts.values());
  const modes = [...counts.entries()].filter(([, c]) => c === maxC).map(([v]) => v);
  return { s, n, mean, sd, med: median(s), q1: median(lower), q3: median(upper), min: s[0], max: s[n - 1], modes, maxC };
};

const C = (n: number, k: number) => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};

const PRESET = '16; 20; 24; 28; 28; 32; 36; 37; 38; 39; 41; 42; 43; 44; 46; 46; 47; 48; 48; 50';

export const StatProbSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: adatsor
  const [raw, setRaw] = useState<string>(PRESET);
  // Labor II: mintavétel
  const [N, setNN] = useState<number>(20);
  const [M, setM] = useState<number>(14);
  const [n, setN] = useState<number>(5);
  const [k, setK] = useState<number>(3);

  const data = useMemo(
    () =>
      raw
        .split(/[;\s]+/)
        .map((t) => Number(t.replace(',', '.')))
        .filter((v) => Number.isFinite(v))
        .slice(0, 200),
    [raw]
  );
  const st = useMemo(() => (data.length >= 2 ? describeData(data) : null), [data]);

  const Mv = Math.min(M, N);
  const nv = Math.min(n, N);
  const kv = Math.min(k, nv);
  const p = Mv / N;
  const hyper = (j: number) => (C(Mv, j) * C(N - Mv, nv - j)) / C(N, nv);
  const binom = (j: number) => C(nv, j) * p ** j * (1 - p) ** (nv - j);
  const dist = useMemo(() => Array.from({ length: nv + 1 }, (_, j) => ({ j, h: hyper(j), b: binom(j) })), [N, Mv, nv]); // eslint-disable-line react-hooks/exhaustive-deps

  // dobozdiagram méretezése
  const lo = st ? st.min : 0;
  const hi = st ? st.max : 1;
  const span = hi - lo || 1;
  const BX = (v: number) => 30 + ((v - lo) / span) * 300;

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="statisztika-valoszinusegszamitas"
      title="10. Statisztika, valószínűségszámítás – rendszerező összefoglalás"
      subtitle="Középértékek, kvartilisek, szórás, diagramok; események, klasszikus és geometriai valószínűség, függetlenség, várható érték, mintavételek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="purple"
      pdfFilename="12_osztaly_osszefoglalas_statisztika_valoszinuseg_tananyag.pdf"
      practiceTitle="Készen állsz a statisztika- és valószínűség-feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'KÉPLETTÁR — STATISZTIKA, VALÓSZÍNŰSÉG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
                <div className="text-[11px] font-bold text-purple-700">Szórás</div>
                <div className="font-mono text-xs font-black text-purple-900 dark:text-purple-200">σ = √(Σ(xᵢ − x̄)²/n)</div>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
                <div className="text-[11px] font-bold text-blue-700">Visszatevéses</div>
                <div className="font-mono text-xs font-black text-blue-900 dark:text-blue-200">C(n; k) · pᵏ · (1 − p)ⁿ⁻ᵏ</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
                <div className="text-[11px] font-bold text-rose-700">Visszatevés nélküli</div>
                <div className="font-mono text-xs font-black text-rose-900 dark:text-rose-200">C(M; k) · C(N − M; n − k)/C(N; n)</div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Klasszikus modell: P(A) = kedvező/összes elemi esemény; P(Ā) = 1 − P(A); kizáró eseményekre P(A + B) = P(A) + P(B).</li>
              <li>Független események: P(A · B) = P(A) · P(B). Várható érték: a kimenetelek valószínűségekkel súlyozott átlaga.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Statisztikai fogalmak" badge="Tankönyv 166. o." badgeColor="purple">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Átlag', 'x̄ = (x₁ + x₂ + … + xₙ)/n.'],
            ['D', 'Módusz', 'A leggyakrabban előforduló elem (több is lehet).'],
            ['D', 'Medián', 'Az adatok fele kisebb vagy egyenlő nála: páratlan n-nél a középső, páros n-nél a két középső átlaga (nagyság szerint rendezve).'],
            ['D', 'Alsó / felső kvartilis', 'Páros n: az alsó / felső fél mediánja; páratlan n: a mediánt elhagyva az alsó / felső fél mediánja.'],
            ['D', 'Terjedelem, félterjedelem', 'Terjedelem: legnagyobb − legkisebb elem; félterjedelem (interkvartilis terjedelem): felső − alsó kvartilis.'],
            ['D', 'Szórás', 'Az átlagtól való eltérések négyzetének átlaga a szórásnégyzet, ennek gyöke a szórás: σ = √(((x₁ − x̄)² + … + (xₙ − x̄)²)/n).'],
            ['D', 'Relatív gyakoriság', 'n kísérletből k-szor bekövetkező kimenetel relatív gyakorisága k/n.'],
            ['–', 'Diagramok', 'Oszlopdiagram, kördiagram (középponti szög = relatív gyakoriság · 360°), dobozdiagram (min; Q₁; medián; Q₃; max).']
          ]}
        />
        <BoxPlotSvg />
      </TheorySection>

      <TheorySection title="2. Valószínűségszámítási fogalmak" badge="Tankönyv 167. o." badgeColor="blue">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Elemi esemény, eseménytér, esemény', 'Elemi esemény: egy kimenetel (pl. fekete kockán 6, fehéren 1). Eseménytér: az elemi események halmaza (két kockánál 36 elem). Esemény: az eseménytér részhalmaza; biztos és lehetetlen esemény.'],
            ['D', 'Szorzat, összeg, komplementer', 'A · B: mindkettő bekövetkezik; A + B: legalább az egyik; Ā: pontosan akkor, ha A nem.'],
            ['D', 'Egymást kizáró események', 'Nem következhetnek be egyszerre (pl. „az egyik dobás hatos” és „az összeg 5”).'],
            ['T', 'A valószínűség tulajdonságai', '0 ≤ P(A) ≤ 1; P(biztos) = 1, P(lehetetlen) = 0; kizáróakra P(A + B) = P(A) + P(B); P(Ā) = 1 − P(A).'],
            ['D', 'Klasszikus modell', 'Véges sok, egyformán valószínű elemi esemény: P(A) = kedvező/összes.'],
            ['D', 'Geometriai valószínűség', 'Az eseményhez tartozó geometriai mérték (hossz, terület, szög) osztva a teljes eseménytér mértékével.'],
            ['D', 'Független események', 'P(A · B) = P(A) · P(B) (pl. az egyik kocka hatos, a másik kocka hatos).'],
            ['D', 'Várható érték', 'A lehetséges kimenetelek valószínűségekkel súlyozott átlaga.'],
            ['D/T', 'Mintavételek', 'Visszatevéses: P(k) = C(n; k) · pᵏ · (1 − p)ⁿ⁻ᵏ (binomiális eloszlás). Visszatevés nélküli (N elemből M jó, n-et húzunk): P(k) = C(M; k) · C(N − M; n − k)/C(N; n).']
          ]}
        />
        <EventVennSvg />
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok: statisztika" badge="Kidolgozott 1–2." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>1.</strong> 20 dolgozat pontszáma: 16; 20; 24; 28; 28; 32; 36; 37; 38; 39; 41; 42; 43; 44; 46; 46; 47; 48; 48; 50.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> Medián: a 10. és 11. adat átlaga, 40. Alsó kvartilis: az 5. és 6. adat átlaga, 30; felső kvartilis: a 15. és 16. átlaga, 46. Az öt adat: <strong>16; 30; 40; 46; 50</strong>.
              </li>
              <li>
                <strong>b)</strong> Osztályok 16–20, …, 46–50; osztályközepek 18, 23, …, 48; gyakoriságok 2, 1, 2, 1, 4, 4, 6. Átlag: (2 · 18 + 23 + 2 · 28 + 33 + 4 · 38 + 4 · 43 + 6 · 48)/20 = <strong>38</strong>.
              </li>
              <li>σ² = (2 · 400 + 225 + 2 · 100 + 25 + 0 + 4 · 25 + 6 · 100)/20 = 97,5 ⇒ σ ≈ <strong>9,87</strong>. (A nyers adatokból: átlag 37,65, szórás 9,70 – közel azonos.)</li>
            </ol>
            <p>
              <strong>2.</strong> Két úszócsoport: 12 fő 72,6 s átlaggal, n fő 74,3 s átlaggal; az összes átlag 73,28 s.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>73,28 · (n + 12) = 12 · 72,6 + 74,3n ⇒ 73,28n + 879,36 = 871,2 + 74,3n.</li>
              <li>
                8,16 = 1,02n ⇒ <strong>n = 8</strong> fő.
              </li>
            </ol>
          </div>
          <div className="space-y-4">
            <ClassHistogramSvg />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladatok: valószínűség" badge="Kidolgozott 3–5." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>3.</strong> Két kockával dobunk; a nagyobbik (egyezésnél a közös) érték számít. A 6 × 6-os táblázat szerint az 1, 2, …, 6 eredmény valószínűsége 1/36, 3/36, 5/36, 7/36, 9/36, 11/36.
            </p>
            <p>
              E = (1 · 1 + 3 · 2 + 5 · 3 + 7 · 4 + 9 · 5 + 11 · 6)/36 = 161/36 ≈ <strong>4,47</strong>.
            </p>
            <p>
              <strong>4.</strong> 20 tételből 14 magyar, 6 külföldi szerzőhöz kapcsolódik; 5-öt húzunk. P(pontosan 3 magyar):
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> visszatevés nélkül: C(14; 3) · C(6; 2)/C(20; 5) ≈ <strong>0,352</strong>;
              </li>
              <li>
                <strong>b)</strong> visszatevéssel: C(5; 3) · 0,7³ · 0,3² = <strong>0,3087</strong>.
              </li>
            </ul>
            <p>
              <strong>5.</strong> Minden termék 0,015 valószínűséggel selejtes. 200 termékből legfeljebb 2 selejtes: 0,985²⁰⁰ + C(200; 1) · 0,015 · 0,985¹⁹⁹ + C(200; 2) · 0,015² · 0,985¹⁹⁸ ≈ 0,049 + 0,148 + 0,225 ≈ <strong>0,422</strong>.
            </p>
          </div>
          <div className="space-y-4">
            <DiceMaxTableSvg />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SamplingCompareSvg />
          <BinomialBarsSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Megoldott feladatok a feladatsorból" badge="I–II. rész" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Statisztika" badge="A1–A5, B1–B4, P1" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>14–20 gyakoriságokkal (1, 3, 4, 3, 2, 1, 1): módusz 16, medián 16, átlag 249/15 = 16,6.</li>
              <li>2; 4; 5; … (13 adat): 2-es 4-szer, 4-es 5-ször, 5-ös 4-szer ⇒ körcikkek ≈ 110,8°, 138,5°, 110,8°.</li>
              <li>18 (5-ször), 18,3 (3-szor), 18,8 (2-szer): átlag 18,25, szórás ≈ 0,304.</li>
              <li>45 utas: 12 pápai (48 év), 25 zirci (42 év), 8 veszprémi (52 év) ⇒ 2042/45 ≈ 45,4 év.</li>
              <li>12 fő, átlag 24 év, 8 férfi 25,5 év ⇒ a 4 nő átlaga (288 − 204)/4 = 21 év.</li>
              <li>Bevételek (5,5; 6,7; 13,2; 19,6 millió $, összesen 45): 44°, 53,6°, 105,6°, 156,8°.</li>
              <li>42; a; 30, átlag = medián + 2 ⇒ (72 + a)/3 = a + 2 ⇒ a = 33.</li>
              <li>Gyufásdobozok (125 db): átlag (és várható érték) 39,76, szórás ≈ 1,28.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Valószínűség" badge="A7–A12, B5–B12, P3, Q4–Q5" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Két lány nem ül egymás mellett: 1 − 12/24 = 1/2. Összeg 10: 3/36 = 1/12. Kétjegyű szám 3-mal osztható: 12/36 = 1/3.</li>
              <li>Szerencsekerék (1/3), 6 pörgetés, pontosan 2 nyerés: C(6; 2) · (1/3)² · (2/3)⁴ = 240/729 ≈ 0,329.</li>
              <li>3 piros, 5 sárga, 2 húzás: 3/28, 10/28 = 5/14, 15/28.</li>
              <li>12 piros, 3 kék + z zöld: 12/(15 + z) = 0,3 ⇒ z = 25. Kétjegyű, 8-cal osztható: 11/90. Klári Eszter előtt: 1/2. IFI: 1/8.</li>
              <li>8 lépés, 0,3 sérülés, pontosan 3: C(8; 3) · 0,3³ · 0,7⁵ ≈ 0,254. Részvény: 4200 + 0,5 · 210 − 0,2 · 400 = 4225 Ft. Prím összeg: 15/36 = 5/12.</li>
              <li>12 pénzfeldobás: 4096 sorozat; csupa fej 1/4096; első és utolsó fej 1/4; pontosan 6 fej 924/4096 ≈ 0,226.</li>
              <li>Három kocka, van ötös: 1 − (5/6)³ = 91/216 ≈ 0,421. Áramkörök (0,005): 0,995¹⁰⁰ ≈ 0,606, legalább egy selejtes ≈ 0,394, 0,995ⁿ &lt; 0,5 ⇒ n ≥ 139.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Tipikus hiba: kvartilis, szórás, mintavétel" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Visszatevés nélkül nem binomiális!"
          wrong="20 tételből 5-öt húzunk visszatevés nélkül: P(3 magyar) = C(5; 3) · 0,7³ · 0,3² = 0,3087."
          wrongExplanation="Visszatevés nélkül a húzások nem függetlenek – a valószínűség húzásról húzásra változik."
          correct="Visszatevés nélkül: C(14; 3) · C(6; 2)/C(20; 5) ≈ 0,352; a binomiális képlet csak visszatevéses mintavételre (független ismétlésre) érvényes."
          correctExplanation="Mindig döntsd el először: visszatesszük-e a kihúzott elemet?"
          tip="Kvartilisnél páros elemszámnál a két fél mediánját vesszük; a szórásnál az eltérések NÉGYZETÉT átlagoljuk, és a végén gyököt vonunk."
        />
        <TheoryCallout type="info" title="Súlyozott átlag">
          Csoportok összevont átlaga nem a csoportátlagok átlaga: (12 · 72,6 + 8 · 74,3)/20 = 73,28, nem (72,6 + 74,3)/2 = 73,45.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium I: adatsor és dobozdiagram" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Adatok (pontosvesszővel vagy szóközzel elválasztva):</label>
              <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-sm" aria-label="adatok" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { t: 'Dolgozat (20 adat)', v: PRESET },
                { t: '14–20 táblázat', v: '14 15 15 15 16 16 16 16 17 17 17 18 18 19 20' },
                { t: '2; 4; 5 (13 adat)', v: '2; 4; 5; 5; 4; 2; 2; 5; 2; 4; 4; 4; 5' },
                { t: '18; 18,3; 18,8', v: '18 18 18 18 18 18,3 18,3 18,3 18,8 18,8' }
              ].map((pr) => (
                <button key={pr.t} onClick={() => setRaw(pr.v)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100">
                  {pr.t}
                </button>
              ))}
            </div>
            {st ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>Elemszám: <strong>{st.n}</strong></div>
                  <div>Átlag: <strong>{fmt(st.mean, 3)}</strong></div>
                  <div>Medián: <strong>{fmt(st.med, 3)}</strong></div>
                  <div>
                    Módusz: <strong>{st.maxC === 1 ? 'nincs (mind egyszer)' : st.modes.map((m) => fmt(m, 3)).join('; ')}</strong>
                  </div>
                  <div>Alsó kvartilis: <strong>{fmt(st.q1, 3)}</strong></div>
                  <div>Felső kvartilis: <strong>{fmt(st.q3, 3)}</strong></div>
                  <div>Terjedelem: <strong>{fmt(st.max - st.min, 3)}</strong></div>
                  <div>Félterjedelem: <strong>{fmt(st.q3 - st.q1, 3)}</strong></div>
                  <div className="col-span-2">Szórás: <strong>{fmt(st.sd, 3)}</strong> (szórásnégyzet: {fmt(st.sd ** 2, 3)})</div>
                </div>
                <svg viewBox="0 0 360 140" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
                  <line x1="30" x2="330" y1="110" y2="110" stroke={S_INK} />
                  {[st.min, st.q1, st.med, st.q3, st.max].map((v, i) => (
                    <g key={i}>
                      <line x1={BX(v)} x2={BX(v)} y1="106" y2="114" stroke={S_INK} />
                      <text x={BX(v)} y={i % 2 === 0 ? 128 : 22} fontSize="10" textAnchor="middle" fill={i === 2 ? S_RED : S_INK} fontWeight="bold">
                        {fmt(v, 2)}
                      </text>
                    </g>
                  ))}
                  <line x1={BX(st.min)} x2={BX(st.q1)} y1="65" y2="65" stroke={S_INK} strokeWidth="2" />
                  <line x1={BX(st.q3)} x2={BX(st.max)} y1="65" y2="65" stroke={S_INK} strokeWidth="2" />
                  <line x1={BX(st.min)} x2={BX(st.min)} y1="52" y2="78" stroke={S_INK} strokeWidth="2" />
                  <line x1={BX(st.max)} x2={BX(st.max)} y1="52" y2="78" stroke={S_INK} strokeWidth="2" />
                  <rect x={BX(st.q1)} y="35" width={Math.max(1, BX(st.q3) - BX(st.q1))} height="60" fill="#dbeafe" stroke={S_BLUE} strokeWidth="2" />
                  <line x1={BX(st.med)} x2={BX(st.med)} y1="35" y2="95" stroke={S_RED} strokeWidth="3" />
                  <circle cx={BX(st.mean)} cy="65" r="4" fill={S_PURPLE} />
                  <text x="340" y="70" fontSize="9" fill={S_PURPLE} textAnchor="end">
                    ● átlag
                  </text>
                </svg>
              </div>
            ) : (
              <div className="text-rose-700 font-bold">Adj meg legalább két számot!</div>
            )}
          </div>
        </div>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium II: visszatevéses vagy visszatevés nélküli?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-sm">
              {[
                ['Összes elem: N', N, (v: number) => setNN(v), 2, 60],
                ['Jó (megjelölt) elemek: M', Mv, (v: number) => setM(v), 0, N],
                ['Húzások száma: n', nv, (v: number) => setN(v), 1, Math.min(N, 20)],
                ['Kérdezett: pontosan k jó', kv, (v: number) => setK(v), 0, nv]
              ].map(([t, v, set, mn, mx]) => (
                <div key={t as string}>
                  <label className="block text-xs font-semibold text-slate-600 mb-0.5">
                    {t as string} = {v as number}
                  </label>
                  <input type="range" min={mn as number} max={mx as number} value={v as number} onChange={(e) => (set as (x: number) => void)(Number(e.target.value))} className="w-full accent-purple-600" aria-label={t as string} />
                </div>
              ))}
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                <div>
                  Visszatevés nélkül: C({Mv}; {kv}) · C({N - Mv}; {nv - kv})/C({N}; {nv}) ≈ <strong>{fmt(hyper(kv), 4)}</strong>
                </div>
                <div>
                  Visszatevéssel (p = {fmt(p, 3)}): C({nv}; {kv}) · {fmt(p, 3)}^{kv} · {fmt(1 - p, 3)}^{nv - kv} ≈ <strong>{fmt(binom(kv), 4)}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  Várható érték mindkét esetben n · M/N = {fmt(nv * p, 3)}. Ha N nagy n-hez képest, a két eloszlás közel azonos.
                </div>
              </div>
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
              {[0, 0.25, 0.5, 0.75, 1].map((v) => (
                <g key={v}>
                  <line x1="34" x2="330" y1={190 - v * 170} y2={190 - v * 170} stroke={S_GRID} />
                  <text x="30" y={194 - v * 170} fontSize="8.5" textAnchor="end" fill="#64748b">
                    {fmt(v, 2)}
                  </text>
                </g>
              ))}
              {dist.map(({ j, h, b }) => {
                const w = 290 / (nv + 1);
                const x = 36 + j * w;
                const bw = Math.max(2, w * 0.36);
                return (
                  <g key={j}>
                    <rect x={x + w * 0.1} y={190 - h * 170} width={bw} height={h * 170} fill={j === kv ? S_RED : '#fda4af'} />
                    <rect x={x + w * 0.1 + bw} y={190 - b * 170} width={bw} height={b * 170} fill={j === kv ? S_BLUE : '#93c5fd'} />
                    {(nv <= 12 || j % 2 === 0) && (
                      <text x={x + w * 0.1 + bw} y="204" fontSize="9" textAnchor="middle" fill="#475569">
                        {j}
                      </text>
                    )}
                  </g>
                );
              })}
              <line x1="34" x2="330" y1="190" y2="190" stroke={S_INK} />
              <rect x="200" y="10" width="10" height="10" fill={S_RED} />
              <text x="214" y="19" fontSize="9" fill={S_INK}>
                visszatevés nélkül
              </text>
              <rect x="200" y="24" width="10" height="10" fill={S_BLUE} />
              <text x="214" y="33" fontSize="9" fill={S_INK}>
                visszatevéssel
              </text>
              <text x="185" y="216" fontSize="9" textAnchor="middle" fill={S_INK}>
                jó elemek száma a mintában (k)
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatProbSummaryTheory;
