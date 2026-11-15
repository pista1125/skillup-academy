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
  DataStatsFireAlarmSvg,
  DataStatsClassSizeChartSvg,
  DataStatsMeasuresSvg,
  DataStatsGradesSvg,
  DataStatsWeightedMeanSvg,
  MiniBarChart,
  DotStrip,
  hu
} from './DataStatisticsFigures';

/** Statisztikai jellemzők egy számsokaságra. */
const describe = (data: number[]) => {
  const s = [...data].sort((a, b) => a - b);
  const n = s.length;
  const sum = s.reduce((acc, x) => acc + x, 0);
  const mean = sum / n;
  const median = n % 2 === 1 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  const freq = new Map<number, number>();
  s.forEach((x) => freq.set(x, (freq.get(x) || 0) + 1));
  const maxF = Math.max(...Array.from(freq.values()));
  const modes = Array.from(freq.entries())
    .filter(([, f]) => f === maxF)
    .map(([v]) => v);
  return { s, n, sum, mean, median, modes, maxF, min: s[0], max: s[n - 1], range: s[n - 1] - s[0] };
};

const parseData = (text: string): number[] =>
  text
    .split(/[;\s]+/)
    .map((t) => t.trim().replace(',', '.').replace('−', '-'))
    .filter((t) => t.length > 0)
    .map(Number)
    .filter((x) => Number.isFinite(x));

const GRADE_PRESETS: { name: string; f: number[] }[] = [
  { name: 'Házi feladat 1.', f: [0, 9, 8, 6, 5] },
  { name: 'egyenletes', f: [5, 5, 5, 5, 5] },
  { name: 'csak 3-as és 4-es', f: [0, 0, 21, 4, 0] },
  { name: 'két módusz', f: [2, 6, 3, 6, 4] }
];

export const DataStatisticsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: számsokaság jellemzői
  const [dataText, setDataText] = useState<string>('32; 18; 20; 18; 20; 24; 15; 18; 55; 10');
  const data = parseData(dataText).slice(0, 60);
  const st = data.length > 0 ? describe(data) : null;
  const pad = st ? Math.max(1, (st.max - st.min) * 0.08) : 1;
  const tick = st ? (st.range <= 10 ? 1 : st.range <= 30 ? 5 : st.range <= 100 ? 10 : 50) : 5;

  // Labor II: osztályzatok gyakorisága
  const [freq, setFreq] = useState<number[]>([0, 9, 8, 6, 5]);
  const gradeData = freq.flatMap((f, i) => Array.from({ length: f }, () => i + 1));
  const gs = gradeData.length > 0 ? describe(gradeData) : null;

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="adatrendezes-statisztikai-jellemzok"
      title="1. Adatrendezés – statisztikai jellemzők"
      subtitle="Átlag, módusz, medián, minimum, maximum és terjedelem: hogyan írjunk le egy adatsokaságot néhány jellemző számmal, és melyik középérték mikor a „legjellemzőbb”?"
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_adatrendezes_statisztikai_jellemzok_tananyag.pdf"
      practiceTitle="Készen állsz a statisztikai jellemzőkre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — STATISZTIKAI JELLEMZŐK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              átlag = (adatok összege) : (adatok száma);  terjedelem = maximum − minimum
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Medián:</strong> a nagyság szerint <strong>rendezett</strong> sor középső eleme; páros számú adatnál a két középső átlaga.
              </li>
              <li>
                <strong>Módusz:</strong> a leggyakoribb adat; ha több ilyen van, a móduszok halmazáról beszélünk.
              </li>
              <li>Az átlag, a módusz és a medián a számsokaság <strong>középértékei</strong>; az átlagot egy kiugró adat erősen eltolhatja.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: kinek van igaza a tűzoltók közül?" badge="Tankönyv 160. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Egy kisváros tűzoltóparancsnoka összesítette, hogy az előző hónap 31 napján naponta hány riasztás volt:</p>
            <TheoryTable
              headers={['Napi riasztások', '0', '1', '2', '4', '6', '14']}
              rows={[['Hány napon?', '1', '11', '6', '8', '4', '1']]}
            />
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Átlag:</strong> 0 · 1 + 1 · 11 + 2 · 6 + 4 · 8 + 6 · 4 + 14 · 1 = 93, és 93 : 31 = <strong>3</strong>. A kiugró 14 nélkül a többi 30 adat átlaga csak 79 : 30 ≈ 2,63.
              </li>
              <li>
                <strong>Medián:</strong> a 31 rendezett adat közül a 16. áll középen; az első 12 adat 0 vagy 1, a 13–18. adat 2, így a medián <strong>2</strong>.
              </li>
              <li>
                <strong>Módusz:</strong> a leggyakoribb érték az <strong>1</strong> (11 napon).
              </li>
            </ul>
            <TheoryCallout type="success" title="Mindhárom tűzoltónak igaza van">
              Egy adatsokaságot egyetlen „legjellemzőbb” számmal többféleképpen is leírhatunk: az egyik az átlagra, a másik a mediánra, a harmadik a móduszra gondolt.
            </TheoryCallout>
          </div>
          <DataStatsFireAlarmSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: a véges adatsokaság legfőbb jellemzői" badge="Elmélet" badgeColor="indigo">
        <TheoryTable
          headers={['Jellemző', 'Jelentése', 'Példa: 10; 15; 18; 18; 18; 20; 20; 24; 32; 55']}
          rows={[
            ['Átlag (számtani közép)', 'az elemek összege osztva az elemek számával', '230 : 10 = 23'],
            ['Módusz', 'a legtöbbször előforduló adat (lehet több is)', '18'],
            ['Medián', 'a rendezett sor közepén álló adat, páros elemszámnál a két középső átlaga', '(18 + 20) : 2 = 19'],
            ['Minimum', 'a legkisebb adat', '10'],
            ['Maximum', 'a legnagyobb adat', '55'],
            ['Terjedelem', 'a legnagyobb és a legkisebb adat különbsége', '55 − 10 = 45']
          ]}
        />
        <div className="mt-4">
          <DataStatsMeasuresSvg />
        </div>
      </TheorySection>

      {/* 3. Feladat 1–2 */}
      <TheorySection title="3. Kidolgozott feladat: osztálylétszámok (1–2. feladat)" badge="Tankönyv 160–161. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Gimnáziumi osztályok: A, B, C, D (4 évfolyam), szakiskolai: E, F, G (3 évfolyam):</p>
            <TheoryTable
              headers={['', 'A', 'B', 'C', 'D', 'E', 'F', 'G']}
              rows={[
                ['9.', '36', '36', '34', '36', '25', '38', '26'],
                ['10.', '35', '29', '30', '31', '27', '33', '20'],
                ['11.', '30', '31', '36', '33', '21', '26', '12'],
                ['12.', '27', '29', '34', '31', '–', '–', '–']
              ]}
            />
            <TheoryCard title="1. a)–d) Átlagok" badge="Megoldás" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>a) 9.: 231 : 7 = 33; 10.: 205 : 7 ≈ 29,29; 11.: 189 : 7 = 27; 12.: 121 : 4 = 30,25 fő.</li>
                <li>c) K = 518 : 16 = 32,375 (gimnázium); L = 228 : 9 ≈ 25,33 (szakiskola).</li>
                <li>
                  d) 16K + 9L = 518 + 228 = 746 az összes tanuló száma, így (16K + 9L) : 25 = 29,84 az <strong>összes (25) osztály átlagos létszáma</strong>.
                </li>
              </ul>
            </TheoryCard>
            <TheoryCard title="2. A 25 létszám jellemzői" badge="Megoldás" badgeColor="sky">
              <p>Rendezve: 12, 20, 21, 25, 26, 26, 27, 27, 29, 29, 30, 30, 31, 31, 31, 33, 33, 34, 34, 35, 36, 36, 36, 36, 38.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                <li>a) Módusz: 36 (négyszer). b) Medián: a 13. adat, 31.</li>
                <li>c) Minimum 12, maximum 38, terjedelem 26.</li>
              </ul>
            </TheoryCard>
          </div>
          <div className="space-y-2">
            <DataStatsClassSizeChartSvg />
            <p className="text-xs text-center text-slate-500">1. b) Oszlopdiagram az évfolyamok átlagos létszámáról</p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Feladat 3–5 */}
      <TheorySection title="4. Kidolgozott feladatok: adatsokaság megadott jellemzőkkel (3–5. feladat)" badge="Tankönyv 161. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="3. 32, 18, 20, 18, 20, 24, 15, 18, 55, 10" badge="Megoldás" badgeColor="violet">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>a) Átlag 23, módusz 18, medián (18 + 20) : 2 = 19.</li>
                <li>b) Ugyanaz a módusz és medián, kétszeres átlag (46, összeg 230): pl. 18; 18; 19; 80; 95.</li>
                <li>c) Ugyanaz az átlag (23, összeg 115) és medián (19), a módusz 3-mal kisebb (15): pl. 15; 15; 19; 30; 36.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="4. Kilenc szám (érettségi, 2017)" badge="Megoldás" badgeColor="amber">
              <p className="text-sm">
                Egyetlen módusz 1, medián 2, átlag 16/9, terjedelem 2 ⇒ az adatok 1, 2 vagy 3, összegük 16. Ha a darabszámok a, b, c, akkor a + b + c = 9 és a + 2b + 3c = 16. A medián (5. adat) 2 és a módusz egyedül az 1 ⇒ a = 4, b = 3, c = 2:
              </p>
              <p className="text-sm font-bold mt-1">1; 1; 1; 1; 2; 2; 2; 3; 3</p>
            </TheoryCard>
            <TheoryCard title="5. Balaton-átúszás (érettségi, 2021)" badge="Súlyozott átlag" badgeColor="sky">
              <p className="text-sm">
                Az indulók 36%-a nő (átlag 35 év), 64%-a férfi (átlag 38 év): 0,36 · 35 + 0,64 · 38 = <strong>36,92 év</strong>. Nem a két átlag számtani közepe (36,5), mert a férfiak többen vannak!
              </p>
            </TheoryCard>
          </div>
          <DataStatsWeightedMeanSvg />
        </div>
      </TheorySection>

      {/* 5. Házi feladatok */}
      <TheorySection title="5. Házi feladatok kidolgozva" badge="Tankönyv 161. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="1. Történelemdolgozat" badge="Gyakoriság" badgeColor="amber">
              <TheoryTable headers={['Osztályzat', '1', '2', '3', '4', '5']} rows={[['Gyakoriság', '0', '9', '8', '6', '5'], ['Relatív gyakoriság', '0%', '32,1%', '28,6%', '21,4%', '17,9%']]} />
              <p className="text-sm mt-2">
                28 dolgozat; terjedelem 5 − 2 = 3 (1-es nem volt!), módusz 2, medián a 14. és 15. adat átlaga: 3, átlag 91 : 28 = 3,25.
              </p>
            </TheoryCard>
            <TheoryCard title="2. 25 dolgozat, átlag 3,16" badge="Összeg" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>a) A jegyek összege 25 · 3,16 = 79.</li>
                <li>e) Csak 3-as és 4-es: 3x + 4(25 − x) = 79 ⇒ x = 21 – lehetséges: 21 db 3-as és 4 db 4-es.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="3. Bence lázmérései: 5 mérés, átlag 36,8 °C" badge="Lehetséges?" badgeColor="rose">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>A mért értékek összege 5 · 36,8 = 184 °C.</li>
                <li>a) Igen, pl. ötször 36,8 °C. b) Igen: a többi három összege 184 − 75,6 = 108,4, pl. 36,1; 36,1; 36,2.</li>
                <li>c) Igen, pl. 37; 37; 37; 36,5; 36,5. d) Igen, pl. 36,5; 36,6; 36,6; 37,1; 37,2.</li>
              </ul>
            </TheoryCard>
          </div>
          <DataStatsGradesSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: rendezés nélkül keresett medián" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi a 32, 18, 20, 18, 20, 24, 15, 18, 55, 10 számok mediánja?"
          wrong="A felsorolás két középső eleme 20 és 24, a medián 22"
          wrongExplanation="A medián a nagyság szerint RENDEZETT sor közepe – a felsorolás sorrendjének nincs jelentése."
          correct="Rendezve: 10, 15, 18, 18, 18, 20, 20, 24, 32, 55 ⇒ medián (18 + 20) : 2 = 19"
          correctExplanation="Páros számú (10) adat esetén a két középső (5. és 6.) adat átlaga a medián. Gyakorisági táblázatnál az összesített gyakoriságokkal keressük meg a középső helyet."
          tip="Terjedelemnél is figyelj: a történelemdolgozatnál nem volt 1-es, ezért a terjedelem 5 − 2 = 3, nem 4."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: számsokaság-elemző" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">adatok pontosvesszővel vagy szóközzel elválasztva (tizedesvessző is használható)</label>
          <input type="text" value={dataText} onChange={(e) => setDataText(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-sky-200 font-mono" aria-label="adatok" />
          <div className="flex flex-wrap gap-2">
            {[
              ['3. feladat', '32; 18; 20; 18; 20; 24; 15; 18; 55; 10'],
              ['9. évfolyam', '36; 36; 34; 36; 25; 38; 26'],
              ['érettségi 2017', '1; 1; 1; 1; 2; 2; 2; 3; 3'],
              ['lázmérés', '36,5; 36,6; 36,6; 37,1; 37,2'],
              ['kiugró adattal', '2; 3; 3; 4; 5; 100']
            ].map(([name, val]) => (
              <button key={name} onClick={() => setDataText(val)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100">
                {name}
              </button>
            ))}
          </div>
          {!st ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg legalább egy számot!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="space-y-2 text-sm">
                <div className="bg-sky-50 rounded-xl border border-sky-200 p-3">
                  <div className="font-bold text-sky-800">Rendezett sor (n = {st.n})</div>
                  <div className="font-mono break-words">{st.s.map((x) => hu(x)).join('; ')}</div>
                </div>
                <TheoryTable
                  headers={['Jellemző', 'Érték']}
                  rows={[
                    ['összeg', hu(st.sum)],
                    ['átlag', `${hu(st.sum)} : ${st.n} = ${hu(st.mean, 3)}`],
                    ['medián', st.n % 2 === 1 ? `a(z) ${(st.n + 1) / 2}. adat: ${hu(st.median)}` : `a(z) ${st.n / 2}. és ${st.n / 2 + 1}. adat átlaga: ${hu(st.median)}`],
                    ['módusz', st.maxF === 1 && st.n > 1 ? 'minden adat egyszer fordul elő' : `${st.modes.map((m) => hu(m)).join('; ')} (${st.maxF}-szor)`],
                    ['minimum / maximum', `${hu(st.min)} / ${hu(st.max)}`],
                    ['terjedelem', hu(st.range)]
                  ]}
                />
              </div>
              <div className="space-y-2">
                <DotStrip
                  values={st.s}
                  min={st.min - pad}
                  max={st.max + pad}
                  tick={tick}
                  width={320}
                  height={Math.min(220, 90 + st.maxF * 10)}
                  className="w-full h-auto"
                  marks={[
                    { value: st.median, label: 'medián', color: '#7c3aed' },
                    { value: st.mean, label: 'átlag', color: '#d97706' }
                  ]}
                />
                <TheoryCallout type="tip" title="Kísérletezz!">
                  Írj a sor végére egy nagyon nagy számot: az átlag erősen elmozdul, a medián alig – ezért kiugró adatnál a medián jobban jellemzi a „tipikus” értéket.
                </TheoryCallout>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: gyakorisági táblázat és oszlopdiagram" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {GRADE_PRESETS.map((p) => (
              <button key={p.name} onClick={() => setFreq(p.f)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-2">
              {freq.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-16 font-bold text-slate-700">{i + 1}-es: {f}</span>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={f}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setFreq((old) => old.map((x, j) => (j === i ? v : x)));
                    }}
                    className="flex-1 accent-emerald-600"
                    aria-label={`${i + 1}-es osztályzatok száma`}
                  />
                </div>
              ))}
              {gs ? (
                <TheoryTable
                  headers={['n', 'átlag', 'medián', 'módusz', 'terjedelem']}
                  rows={[[String(gs.n), hu(gs.mean, 2), hu(gs.median), gs.modes.join('; '), String(gs.range)]]}
                />
              ) : (
                <div className="bg-rose-50 rounded-xl border border-rose-200 p-3 text-sm font-bold text-rose-700">Legalább egy dolgozat kell!</div>
              )}
            </div>
            <div className="space-y-2">
              <MiniBarChart labels={['1', '2', '3', '4', '5']} values={freq} xTitle="osztályzat" yTitle="gyakoriság" width={300} height={180} className="w-full h-auto" />
              {gs && (
                <TheoryTable
                  headers={['jegy', '1', '2', '3', '4', '5']}
                  rows={[['relatív gyakoriság', ...freq.map((f) => `${hu((f / gs.n) * 100, 1)}%`)]]}
                />
              )}
            </div>
          </div>
          <TheoryCallout type="info" title="Relatív gyakoriság">
            A relatív gyakoriság = gyakoriság : összes adat. Összegük mindig 1 (100%). Az átlag gyakorisági táblázatból: Σ (érték · gyakoriság) : n.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DataStatisticsTheory;
