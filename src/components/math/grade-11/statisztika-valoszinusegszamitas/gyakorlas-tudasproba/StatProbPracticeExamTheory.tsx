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
  StatProbExamChapterMapSvg,
  StatProbExamGradesPieSvg,
  StatProbExamMassBoxPlotSvg,
  StatProbExamFrequencyBoxPlotSvg,
  StatProbExamVennSvg,
  StatProbExamStockSvg,
  StatProbExamSpecialDieSvg,
  STAT_PROB_EXAM_GRADES,
  STAT_PROB_EXAM_MASSES,
  statProbExamStats,
  spFmt
} from './StatProbPracticeExamFigures';
import { StatisticsPracticeBoxPlot } from '../gyakorlas-statisztika/StatisticsPracticeFigures';

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  const kk = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= kk; i++) r = (r * (n - kk + i)) / i;
  return r;
};
const binP = (n: number, k: number, p: number) => binom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
const hypP = (N: number, S: number, n: number, k: number) => (binom(N, n) > 0 ? (binom(S, k) * binom(N - S, n - k)) / binom(N, n) : 0);

const DATA_PRESETS = [
  { t: 'tömegmérés (19 adat)', v: STAT_PROB_EXAM_MASSES.join('; ') },
  { t: 'tudáspróba 2. (13 adat)', v: '14; 15; 15; 16; 16; 16; 17; 17; 17; 18; 18; 19; 20' },
  { t: '24 osztályzat', v: STAT_PROB_EXAM_GRADES.flatMap((g) => Array.from({ length: g.count }, () => g.grade)).join('; ') },
  { t: '15 db 222', v: Array.from({ length: 15 }, () => 222).join('; ') }
];

type Mode = 'eq' | 'ge' | 'le';

const PROB_PRESETS: { t: string; model: 'bin' | 'hyp'; n: number; p: number; N: number; S: number; k: number; mode: Mode }[] = [
  { t: 'italautomata: 5 nap, p = 0,8, legalább 4', model: 'bin', n: 5, p: 0.8, N: 36, S: 12, k: 4, mode: 'ge' },
  { t: 'díszkő: 21 doboz, p = 0,99, legalább 20', model: 'bin', n: 21, p: 0.99, N: 36, S: 12, k: 20, mode: 'ge' },
  { t: 'osztály: 36 fő, 14 egyiket sem, 4 diák: mind', model: 'hyp', n: 4, p: 0.5, N: 36, S: 14, k: 4, mode: 'eq' },
  { t: '1–50, 3 szám: mind páros', model: 'hyp', n: 3, p: 0.5, N: 50, S: 25, k: 3, mode: 'eq' }
];

export const StatProbPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: statisztikai kalkulátor
  const [dataText, setDataText] = useState<string>(DATA_PRESETS[0].v);
  const parsed = dataText
    .split(/[;\s]+/)
    .map((t) => t.trim().replace(',', '.'))
    .filter((t) => t.length > 0)
    .map(Number);
  const valid = parsed.length >= 1 && parsed.length <= 200 && parsed.every((x) => Number.isFinite(x));
  const st = valid ? statProbExamStats(parsed) : null;
  const span = st ? Math.max(1, st.max - st.min) : 1;
  const axisFrom = st ? Math.floor(st.min - span * 0.1) : 0;
  const axisTo = st ? Math.ceil(st.max + span * 0.1) : 1;
  const axisStep = Math.max(1, Math.ceil((axisTo - axisFrom) / 10));

  // Labor II: valószínűségi modellek
  const [model, setModel] = useState<'bin' | 'hyp'>('bin');
  const [n, setN] = useState<number>(5);
  const [pPct, setPPct] = useState<number>(80);
  const [N, setNN] = useState<number>(36);
  const [S, setS] = useState<number>(12);
  const [k, setK] = useState<number>(4);
  const [mode, setMode] = useState<Mode>('ge');
  const p = pPct / 100;
  const nn = model === 'hyp' ? Math.min(n, N) : n;
  const SS = Math.min(S, N);
  const kk = Math.min(k, nn);
  const pk = (j: number) => (model === 'bin' ? binP(nn, j, p) : hypP(N, SS, nn, j));
  const dist = Array.from({ length: nn + 1 }, (_, j) => pk(j));
  const selected = (j: number) => (mode === 'eq' ? j === kk : mode === 'ge' ? j >= kk : j <= kk);
  const total = dist.reduce((s, v, j) => (selected(j) ? s + v : s), 0);
  const E = model === 'bin' ? nn * p : (nn * SS) / N;
  const maxBar = Math.max(...dist, 0.01);

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="gyakorlas-tudasproba"
      title="16. Gyakorlás, tudáspróba"
      subtitle="A fejezet összefoglalása: statisztikai jellemzők, diagramok, dobozdiagram, szórás, valószínűség, várható érték, egyszerre húzás, visszatevéses és visszatevés nélküli mintavétel – érettségi típusú feladatokkal."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_statisztika_valoszinuseg_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezet tudáspróbájára?"
      practiceSubtitle="90 kérdés 3 szinten a teljes V. fejezetből – próbáld ki magad!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A FEJEZET LEGFONTOSABB KÉPLETEI',
        align: 'left',
        formula: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-800 dark:text-slate-100 font-normal text-xs">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 space-y-1">
              <div className="font-black text-sky-900 dark:text-sky-200 text-sm">Statisztika</div>
              <div>átlag = (x₁ + x₂ + … + xₙ) / n; medián: a rendezett sor középső eleme (két középső átlaga)</div>
              <div>terjedelem = max − min; félterjedelem = Q₃ − Q₁</div>
              <div>szórás: σ = √(((x₁ − x̄)² + … + (xₙ − x̄)²) / n)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 space-y-1">
              <div className="font-black text-amber-900 dark:text-amber-200 text-sm">Valószínűség</div>
              <div>P(A) = kedvező / összes; P(nem A) = 1 − P(A); E = x₁p₁ + … + xₙpₙ</div>
              <div>visszatevés nélkül: (S alatt k)(N − S alatt n − k) / (N alatt n)</div>
              <div>visszatevéssel: (n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ</div>
            </div>
          </div>
        )
      }}
    >
      {/* 1. Áttekintés – statisztika */}
      <TheorySection title="1. Összefoglalás: statisztika (1–6. lecke)" badge="Áttekintés" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryTable
              headers={['Jellemző', 'Jelentés, kiszámítás']}
              rows={[
                ['átlag (számtani közép)', 'az adatok összege osztva az adatok számával; gyakorisági táblázatból súlyozott átlag'],
                ['medián', 'a nagyság szerint rendezett adatsor középső eleme; páros elemszámnál a két középső átlaga'],
                ['módusz', 'a leggyakoribb adat (több is lehet)'],
                ['terjedelem', 'a legnagyobb és a legkisebb adat különbsége'],
                ['alsó / felső kvartilis', 'a medián két oldalán lévő „fél” adatsor mediánja (páratlan elemszámnál a mediánt elhagyjuk)'],
                ['félterjedelem', 'Q₃ − Q₁'],
                ['szórás', 'az átlagtól való eltérések négyzetének átlagából vont négyzetgyök; ha minden adat egyenlő, 0']
              ]}
            />
            <TheoryCallout type="tip" title="Diagramok">
              Kördiagramon a középponti szög arányos a gyakorisággal: szög = relatív gyakoriság · 360°. Oszlop- és sávdiagramon az egység megváltoztatásával a gyakoriság helyett a relatív gyakoriság is leolvasható. A dobozdiagram az öt jellemzőt (min, Q₁, Me, Q₃, max) mutatja.
            </TheoryCallout>
          </div>
          <StatProbExamChapterMapSvg />
        </div>
      </TheorySection>

      {/* 2. Áttekintés – valószínűség */}
      <TheorySection title="2. Összefoglalás: valószínűségszámítás (7–15. lecke)" badge="Áttekintés" badgeColor="indigo">
        <TheoryTable
          headers={['Helyzet', 'Modell', 'Képlet / példa']}
          rows={[
            ['egyenlően valószínű kimenetelek', 'klasszikus modell', 'P(A) = kedvező / összes; két kockánál 36 kimenetel'],
            ['„legalább egy”', 'komplementer', 'P(legalább egy) = 1 − P(egy sem)'],
            ['nyeremény, pontszám átlagos értéke', 'várható érték', 'E = Σ xᵢ · pᵢ; méltányos játék: E = 0'],
            ['egyszerre több elemet húzunk', 'kombinációk', '(m alatt k) / (n alatt k)'],
            ['egymás után, vissza nem tesszük', 'visszatevés nélküli mintavétel', '(S alatt k)(N − S alatt n − k) / (N alatt n)'],
            ['ugyanazt a kísérletet többször', 'független ismétlés', 'P(mindig sikerül) = pⁿ'],
            ['n ismétlésből pontosan k siker', 'visszatevéses (binomiális)', '(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ'],
            ['nagy sokaság, kis minta', 'a két mintavétel közel azonos', '250 fő, 20 utalvány: alig van eltérés']
          ]}
        />
      </TheorySection>

      {/* 3. Gyakorló 1–3 */}
      <TheorySection title="3. Gyakorló feladatok 1–3: jellemzők és logika" badge="Tankönyv 206. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="1. feladat (érettségi, 2010)" badge="Feladat" badgeColor="teal">
            <p className="text-sm text-slate-700">17 dolgozat (1–5-ös jegyek): medián 4, módusz 4, terjedelem 4, átlag ≈ 3,41.</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 mt-1 space-y-1">
              <li>
                <strong>A</strong> (több mint a fele jobb hármasnál): <strong>igaz</strong>. A medián a 9. jegy, és 4; így a 9.–17. jegy legalább 4-es, ez 9 &gt; 8,5 dolgozat.
              </li>
              <li>
                <strong>B</strong> (nincs hármasnál rosszabb): <strong>hamis</strong>. A terjedelem 4, tehát van 5-ös és van 1-es is.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: minden adat egyenlő" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a) 15 db 222: módusz = medián = 222, terjedelem 0, szórás 0.</li>
              <li>b) Ha minden elem egyenlő, a szórás 0: <strong>igaz</strong>.</li>
              <li>c) Ha a szórás 0, minden elem egyenlő: <strong>igaz</strong> (négyzetek összege csak így 0).</li>
              <li>d) Ha az átlag 0, minden adat egyenlő: <strong>hamis</strong> (pl. −1; 1).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. feladat: dobozdiagram leolvasása" badge="Feladat" badgeColor="violet">
            <p className="text-sm text-slate-700">
              A doboz széleiről Q₁ és Q₃, a belső vonalról a medián, a „bajusz” végeiről a minimum és a maximum olvasható le. Terjedelem = max − min, félterjedelem = Q₃ − Q₁. (Gyakorold a 4. ábrán és a kvízben!)
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Gyakorló 4 */}
      <TheorySection title="4. Gyakorló feladat 4: tömegmérés (érettségi alapján, 2005)" badge="Tankönyv 206. o." badgeColor="emerald">
        <div className="space-y-4">
          <p className="text-sm text-slate-700">19 tanuló mérési eredményei grammban: {STAT_PROB_EXAM_MASSES.join(', ')}.</p>
          <TheoryTable headers={['tömeg (g)', '33', '35', '36', '37', '38', '40']} rows={[['gyakoriság', '2', '4', '4', '6', '2', '1']]} />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>b) átlag: 688 / 19 ≈ 36,21 ⇒ grammra kerekítve <strong>36 g</strong>;</li>
            <li>c) medián: a 10. adat, <strong>36 g</strong>; módusz: <strong>37 g</strong> (6-szor);</li>
            <li>d) dobozdiagram: min 33, Q₁ = 35 (az alsó 9 adat mediánja), Me = 36, Q₃ = 37, max 40.</li>
          </ul>
          <StatProbExamMassBoxPlotSvg />
        </div>
      </TheorySection>

      {/* 5. Gyakorló 5–7 */}
      <TheorySection title="5. Gyakorló feladatok 5–7: várható érték, Venn-diagram, binomiális eloszlás" badge="Tankönyv 206. o." badgeColor="amber">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="5. feladat: részvény" badge="Várható érték" badgeColor="amber">
              <p className="text-sm text-slate-700">Ma 3200 Ft; jövőre 0,2 eséllyel változatlan, 0,4 eséllyel +15% (3680 Ft), 0,4 eséllyel −10% (2880 Ft).</p>
              <p className="text-sm text-slate-700 mt-1">E = 0,2 · 3200 + 0,4 · 3680 + 0,4 · 2880 = 640 + 1472 + 1152 = <strong>3264 Ft</strong>.</p>
            </TheoryCard>
            <StatProbExamStockSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="6. feladat: olvasók az osztályban" badge="Visszatevés nélkül" badgeColor="sky">
              <p className="text-sm text-slate-700">36 fő: 12 olvasta A gyűrűk urát, 10 az Alkonyatot, senki sem mindkettőt ⇒ 14 egyiket sem. 4 tanulót választunk: (36 alatt 4) = 58 905.</p>
              <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                <li>a) egyikük sem olvasta egyiket sem: (14 alatt 4) / 58 905 = 1001 / 58 905 ≈ <strong>0,017</strong></li>
                <li>b) hárman A gyűrűk urát, egy az Alkonyatot: (12 alatt 3) · 10 / 58 905 = 2200 / 58 905 ≈ <strong>0,037</strong></li>
              </ul>
            </TheoryCard>
            <StatProbExamVennSvg />
          </div>
          <TheoryCard title="7. feladat (érettségi, 2019): az italautomata" badge="Binomiális" badgeColor="violet">
            <p className="text-sm text-slate-700">
              Szénsavmentes víz 0,8 valószínűséggel; Anna 5 napon kér. Legalább 4 napon kap szénsavmentest: (5 alatt 4) · 0,8<sup>4</sup> · 0,2 + 0,8<sup>5</sup> = 0,4096 + 0,32768 = <strong>0,73728 ≈ 0,737</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Tudáspróba */}
      <TheorySection title="6. Tudáspróba – megoldások" badge="Tankönyv 207. o." badgeColor="rose">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="1. A 12. B osztály 24 dolgozata" badge="Kördiagram" badgeColor="sky">
              <p className="text-sm text-slate-700">Egy tanuló 360° / 24 = 15°-nak felel meg, így a gyakoriság = szög / 15°.</p>
              <TheoryTable
                headers={['Osztályzat', '5', '4', '3', '2', '1']}
                rows={[
                  ['Gyakoriság', ...STAT_PROB_EXAM_GRADES.map((g) => String(g.count))],
                  ['Relatív gyakoriság', ...STAT_PROB_EXAM_GRADES.map((g) => `${g.count}/24`)]
                ]}
              />
              <ul className="list-disc pl-5 text-sm text-slate-700 mt-1 space-y-1">
                <li>c) Sávdiagramon 24 egység helyett 1 egységnyi teljes hossz: a sávok hossza a relatív gyakoriság.</li>
                <li>d) átlag = (15 + 16 + 27 + 12 + 2) / 24 = 72 / 24 = <strong>3</strong>; módusz <strong>3</strong>; medián (12. és 13. jegy) <strong>3</strong>.</li>
                <li>e) szórás = √((2 · 4 + 6 · 1 + 9 · 0 + 4 · 1 + 3 · 4) / 24) = √(30/24) = √1,25 ≈ <strong>1,12</strong>.</li>
              </ul>
            </TheoryCard>
            <StatProbExamGradesPieSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="2. Dobozdiagram gyakorisági táblázatból" badge="Dobozdiagram" badgeColor="teal">
              <p className="text-sm text-slate-700">
                13 adat; a medián a 7.: <strong>17</strong>. Az alsó 6 adat (14, 15, 15, 16, 16, 16) mediánja Q₁ = <strong>15,5</strong>, a felső 6 adaté (17, 17, 18, 18, 19, 20) Q₃ = <strong>18</strong>. Min 14, max 20.
              </p>
            </TheoryCard>
            <StatProbExamFrequencyBoxPlotSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="3. A különleges dobókocka" badge="Várható érték" badgeColor="amber">
              <TheoryTable headers={['pont', '1', '3', '6']} rows={[['oldalak', '3', '2', '1'], ['valószínűség', '1/2', '1/3', '1/6']]} />
              <p className="text-sm text-slate-700 mt-1">E = 1 · 1/2 + 3 · 1/3 + 6 · 1/6 = 0,5 + 1 + 1 = <strong>2,5</strong>.</p>
            </TheoryCard>
            <StatProbExamSpecialDieSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TheoryCard title="4. Három szám az 1–50 közül" badge="Visszatevés nélkül" badgeColor="violet">
              <p className="text-sm text-slate-700">Összes eset: (50 alatt 3) = 19 600.</p>
              <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                <li>a) mind páros (25 páros szám): (25 alatt 3) / 19 600 = 2300 / 19 600 ≈ <strong>0,117</strong></li>
                <li>b) kettő osztható 5-tel (10 ilyen), egy nem (40): (10 alatt 2) · 40 / 19 600 = 1800 / 19 600 ≈ <strong>0,092</strong></li>
              </ul>
            </TheoryCard>
            <TheoryCard title="5. Díszburkolat (érettségi, 2020)" badge="Binomiális" badgeColor="emerald">
              <p className="text-sm text-slate-700">
                Rossz matrica: 0,01. 21 dobozból legalább 20-ban valóban szürke kő: 0,99<sup>21</sup> + 21 · 0,01 · 0,99<sup>20</sup> ≈ 0,8097 + 0,1718 ≈ <strong>0,981</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: a „legalább” esetek kihagyása" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Anna 5 napon kér szénsavmentes vizet (p = 0,8). Mennyi a valószínűsége, hogy legalább 4 napon kap?"
          wrong="0,8⁴ ≈ 0,41"
          wrongExplanation="Ez csak annak a valószínűsége, hogy négy kijelölt napon szénsavmenteset kap – nem számol az ötödik nappal, a sorrendekkel és az „5 napból 5” esettel."
          correct="(5 alatt 4) · 0,8⁴ · 0,2 + 0,8⁵ ≈ 0,737"
          correctExplanation="A „legalább 4” két, egymást kizáró esetből áll: pontosan 4 (5-féle sorrendben) vagy pontosan 5 nap. A két valószínűséget összeadjuk."
          tip="„Legalább k”: P(k) + P(k + 1) + … + P(n); ha ez hosszú, használd a komplementert: 1 − P(0) − … − P(k − 1)."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: statisztikai jellemzők és dobozdiagram" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Adatok (pontosvesszővel vagy szóközzel elválasztva):</label>
            <textarea
              value={dataText}
              onChange={(e) => setDataText(e.target.value)}
              rows={2}
              className="w-full border border-sky-200 rounded-lg p-2 text-sm font-mono"
              aria-label="adatok"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {DATA_PRESETS.map((ps) => (
              <button key={ps.t} onClick={() => setDataText(ps.v)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100">
                {ps.t}
              </button>
            ))}
          </div>
          {st ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                {[
                  ['elemszám', String(st.n)],
                  ['átlag', spFmt(st.mean, 3)],
                  ['medián', spFmt(st.median, 2)],
                  ['módusz', st.modes.length > 4 ? 'több (≥ 5)' : st.modes.map((m) => spFmt(m)).join('; ')],
                  ['szórás', spFmt(st.sd, 3)],
                  ['minimum', spFmt(st.min)],
                  ['alsó kvartilis', spFmt(st.q1)],
                  ['felső kvartilis', spFmt(st.q3)],
                  ['terjedelem', spFmt(st.max - st.min)],
                  ['félterjedelem', spFmt(st.q3 - st.q1)]
                ].map(([l, v]) => (
                  <div key={l} className="bg-sky-50 rounded-xl border border-sky-200 p-2">
                    <div className="text-[11px] text-slate-600">{l}</div>
                    <div className="font-black text-sky-900">{v}</div>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 560 140" className="w-full max-w-xl mx-auto h-auto">
                <rect x="2" y="2" width="556" height="136" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
                <StatisticsPracticeBoxPlot min={st.min} q1={st.q1} med={st.median} q3={st.q3} max={st.max} axisFrom={axisFrom} axisTo={axisTo} step={axisStep} x0={40} x1={520} y={50} />
              </svg>
              <div className="text-xs text-slate-600">rendezett adatsor: {st.sorted.map((x) => spFmt(x)).join('; ')}</div>
            </div>
          ) : (
            <div className="text-sm text-rose-700">Adj meg legalább egy (legfeljebb 200) számot!</div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: valószínűségi modellek" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setModel('bin')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${model === 'bin' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800'}`}>
              visszatevéssel / független ismétlés (binomiális)
            </button>
            <button onClick={() => setModel('hyp')} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${model === 'hyp' ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800'}`}>
              visszatevés nélkül / egyszerre húzás
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kísérletek / minta mérete (n): {nn}</label>
              <input type="range" min={1} max={30} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-teal-600" aria-label="n" />
            </div>
            {model === 'bin' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">egy kísérletben a siker valószínűsége (p): {spFmt(p)}</label>
                <input type="range" min={1} max={99} value={pPct} onChange={(e) => setPPct(Number(e.target.value))} className="w-full accent-teal-600" aria-label="p" />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600">sokaság (N): {N}, ebből „jó” (S): {SS}</label>
                <input type="range" min={2} max={90} value={N} onChange={(e) => setNN(Number(e.target.value))} className="w-full accent-teal-600" aria-label="N" />
                <input type="range" min={0} max={N} value={SS} onChange={(e) => setS(Number(e.target.value))} className="w-full accent-amber-600" aria-label="S" />
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600">k = {kk}</label>
              <input type="range" min={0} max={nn} value={kk} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-teal-600" aria-label="k" />
              <div className="flex gap-1">
                {(
                  [
                    ['eq', 'pontosan'],
                    ['ge', 'legalább'],
                    ['le', 'legfeljebb']
                  ] as [Mode, string][]
                ).map(([m, l]) => (
                  <button key={m} onClick={() => setMode(m)} className={`px-2 py-1 rounded text-xs font-bold ${mode === m ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 560 170" className="w-full max-w-xl mx-auto h-auto">
            <rect x="2" y="2" width="556" height="166" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <line x1="30" y1="140" x2="540" y2="140" stroke="#334155" />
            {dist.map((v, j) => {
              const w = 510 / dist.length;
              const h = (v / maxBar) * 110;
              return (
                <g key={j}>
                  <rect x={30 + j * w + w * 0.15} y={140 - h} width={w * 0.7} height={h} fill={selected(j) ? '#0d9488' : '#cbd5e1'} />
                  {(dist.length <= 16 || j % 2 === 0) && (
                    <text x={30 + j * w + w / 2} y="155" fontSize="9.5" textAnchor="middle" fill="#334155">
                      {j}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4">
              P({mode === 'eq' ? `pontosan ${kk}` : mode === 'ge' ? `legalább ${kk}` : `legfeljebb ${kk}`}) ≈ <strong className="text-lg">{spFmt(total, 4)}</strong>
              <div className="text-xs text-slate-600 mt-1">
                {model === 'bin' ? `P(j) = (${nn} alatt j) · ${spFmt(p)}^j · ${spFmt(1 - p)}^(${nn} − j)` : `P(j) = (${SS} alatt j) · (${N - SS} alatt ${nn} − j) / (${N} alatt ${nn})`}
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              a sikerek számának várható értéke: <strong>{spFmt(E, 3)}</strong>
              <div className="text-xs text-slate-600 mt-1">{model === 'bin' ? 'E = n · p' : 'E = n · S / N'} – mindkét mintavételnél ugyanannyi.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROB_PRESETS.map((ps) => (
              <button
                key={ps.t}
                onClick={() => {
                  setModel(ps.model);
                  setN(ps.n);
                  setPPct(Math.round(ps.p * 100));
                  setNN(ps.N);
                  setS(ps.S);
                  setK(ps.k);
                  setMode(ps.mode);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100"
              >
                {ps.t}
              </button>
            ))}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatProbPracticeExamTheory;
