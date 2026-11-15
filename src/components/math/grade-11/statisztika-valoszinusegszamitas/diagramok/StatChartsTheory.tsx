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
  StatChartsOrchestraSvg,
  StatChartsTheaterSvg,
  StatChartsTypesSvg,
  StatChartsGradesBandSvg,
  StatChartsInternetPieSvg,
  StatChartsPyramidSvg,
  PieChart,
  StackedBar,
  LineChart,
  CAT_COLORS
} from './StatChartsFigures';
import { MiniBarChart } from '../adatrendezes-statisztikai-jellemzok/DataStatisticsFigures';

const hu = (x: number, d = 2): string => String(Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).replace('.', ',');

type ChartKind = 'oszlop' | 'kör' | 'sáv' | 'vonal';

export const StatChartsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kördiagram-készítő
  const [cats, setCats] = useState<{ name: string; f: number }[]>([
    { name: 'vonós', f: 20 },
    { name: 'fúvós', f: 16 },
    { name: 'ütős', f: 7 },
    { name: 'egyéb', f: 2 }
  ]);
  const total = cats.reduce((a, c) => a + c.f, 0);

  // Labor II: súlyozott átlag és diagramtípusok
  const [freq, setFreq] = useState<number[]>([10, 40, 135, 95, 40]);
  const [kind, setKind] = useState<ChartKind>('sáv');
  const n = freq.reduce((a, b) => a + b, 0);
  const weighted = freq.reduce((a, f, i) => a + f * (i + 1), 0);
  let cumAcc = 0;
  const cum = freq.map((f) => {
    cumAcc += f;
    return n > 0 ? (cumAcc / n) * 100 : 0;
  });
  const medianIdx = n > 0 ? cum.findIndex((c) => c >= 50) : -1;
  const maxF = Math.max(...freq);
  const modes = freq.map((f, i) => (f === maxF && f > 0 ? i + 1 : 0)).filter((x) => x > 0);
  const labels5 = ['1', '2', '3', '4', '5'];

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="diagramok"
      title="2. Diagramok"
      subtitle="Oszlop-, kör-, sáv- és vonaldiagram: melyik mire való, hogyan olvassunk le róluk adatokat, és hogyan számoljunk súlyozott átlagot gyakoriságokból?"
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_diagramok_tananyag.pdf"
      practiceTitle="Készen állsz a diagramokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott, diagramokkal teli interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — DIAGRAMOK ÉS SÚLYOZOTT ÁTLAG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              súlyozott átlag = Σ (érték · gyakoriság) : Σ gyakoriság;  középponti szög = (gyakoriság : összes) · 360°
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Oszlopdiagram:</strong> gyakoriságok összehasonlítása; <strong>kördiagram</strong> és <strong>sávdiagram:</strong> az egész részekre bontása (megoszlás); <strong>vonaldiagram:</strong> változás követése (pl. időben).
              </li>
              <li>Különböző létszámú csoportok százalékait nem szabad egyszerűen átlagolni – előbb számold vissza a darabszámokat!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Zenekar */}
      <TheorySection title="1. Feladat: a szimfonikus zenekar összetétele (kompetenciamérés, 2013)" badge="Tankönyv 162. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryTable
              headers={['Hangszertípus', 'Fő', 'Arány', 'Középponti szög']}
              rows={[
                ['Vonós hangszerek', '20', '44,4%', '160°'],
                ['Fúvós hangszerek', '16', '35,6%', '128°'],
                ['Ütőhangszerek', '7', '15,6%', '56°'],
                ['Egyéb (pl. zongora)', '2', '4,4%', '16°'],
                ['Összesen', '45', '100%', '360°']
              ]}
            />
            <p>
              A feladat négy diagram közül kérdezi, melyik <strong>nem</strong> ábrázolja helyesen a zenekart. Ellenőrzés: az oszlopdiagram oszlopai 20 : 16 : 7 : 2 arányúak legyenek, a kördiagram szeletei 160°, 128°, 56°, 16°-osak, a sávdiagram szakaszai 44,4%, 35,6%, 15,6%, 4,4% szélesek. Amelyik diagramon ezek az arányok nem teljesülnek (pl. a szeletek közel egyformák, vagy a sorrend felcserélődik), az hibás.
            </p>
            <TheoryCallout type="info" title="Egy fő hány fokot ér?">
              360° : 45 = 8°, így 20 vonós 20 · 8° = 160°.
            </TheoryCallout>
          </div>
          <StatChartsOrchestraSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: súlyozott átlag és a diagramtípusok" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryTable
              headers={['Lépés', 'Mit számolunk?']}
              rows={[
                ['az adatok összege', 'az elemeket megszorozzuk a gyakoriságukkal, és a szorzatokat összeadjuk'],
                ['az adatok darabszáma', 'a gyakoriságok összege'],
                ['átlag (súlyozott átlag)', 'az összeget osztjuk a darabszámmal']
              ]}
            />
            <TheoryTable
              headers={['Diagram', 'Mire jó?']}
              rows={[
                ['oszlopdiagram', 'gyakoriságok, mennyiségek összehasonlítása'],
                ['kördiagram', 'az egész részekre bontása; a szelet középponti szöge arányos a gyakorisággal'],
                ['sávdiagram', 'megoszlás egyetlen téglalapon; csoportok megoszlásának összevetése'],
                ['vonaldiagram', 'egy mennyiség változásának követése (pl. idő szerint)']
              ]}
            />
          </div>
          <StatChartsTypesSvg />
        </div>
      </TheorySection>

      {/* 3. Színház */}
      <TheorySection title="3. Feladat: hányszor jár színházba? (érettségi, 2011)" badge="Tankönyv 162. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>200 megkérdezett: 120 fő 40 évesnél fiatalabb, 80 fő legalább 40 éves. A sávdiagram a két csoport százalékos megoszlását mutatja.</p>
            <TheoryCard title="Megoldás" badge="Visszaszámolás" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>a) A legalább 40 évesek 18,75%-a: 0,1875 · 80 = <strong>15 fő</strong> járt 5-nél kevesebbszer.</li>
                <li>b) 5–10 alkalommal: 0,35 · 120 + 0,375 · 80 = 42 + 30 = 72 fő, ez 72 : 200 = <strong>36%</strong>.</li>
                <li>Ellenőrzés: 10-nél többször 15 + 35 = 50 fő (25%), 5-nél kevesebbszer 63 + 15 = 78 fő (39%).</li>
              </ul>
            </TheoryCard>
          </div>
          <StatChartsTheaterSvg />
        </div>
      </TheorySection>

      {/* 4. Pontszámok, góllövők */}
      <TheorySection title="4. Feladatok: oszlopdiagramról leolvasott jellemzők (3–4. feladat)" badge="Tankönyv 162–163. o." badgeColor="violet">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="3. Tanulmányi verseny (érettségi, 2011): 30 diák, két feladat, 0–5 pont" badge="Módszer" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Átlag: a pontszámokat szorozzuk az oszlopok magasságával (a tanulók számával), összeadjuk, és osztjuk 30-cal.</li>
              <li>Medián: 30 adatnál a 15. és 16. adat átlaga – az oszlopokat balról összegezve keressük meg, hová esnek.</li>
              <li>Kördiagram: 30 tanuló = 360°, egy tanuló 12°; a középponti szög = tanulók száma · 12°.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Góllövők a 2021-es Eb-n" badge="Módszer" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>A csoportosított oszlopdiagramon országonként három oszlop (jobb láb, bal láb, fej) áll.</li>
              <li>Egy-egy gólfajta négy adatából (a négy országéból) számolunk móduszt, mediánt, átlagot.</li>
              <li>Ha az ország összes góljával nem egyezik az oszlopok összege, gondolj öngólokra – azokat nem a csapat játékosai szerezték.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Házi feladatok */}
      <TheorySection title="5. Házi feladatok: sávdiagram és kördiagram" badge="Tankönyv 164. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="1. 320 tanuló matematikajegye" badge="Sávdiagram" badgeColor="amber">
              <p className="text-sm">A sávhatárok halmozott (összegzett) százalékok: 0; 3,1; 15,6; 57,8; 87,5; 100.</p>
              <TheoryTable
                headers={['Jegy', '1', '2', '3', '4', '5']}
                rows={[
                  ['Relatív gyakoriság', '3,1%', '12,5%', '42,2%', '29,7%', '12,5%'],
                  ['Gyakoriság', '10', '40', '135', '95', '40']
                ]}
              />
              <p className="text-sm mt-2">
                b) Terjedelem 4, módusz 3, medián 3 (a 160–161. adat), átlag 1075 : 320 ≈ 3,36. c) A sávdiagramról a <strong>módusz</strong> (legszélesebb sáv), a <strong>medián</strong> (az 50%-os pont sávja) és a terjedelem olvasható le egyszerűen; az átlaghoz számolni kell.
              </p>
            </TheoryCard>
            <TheoryCard title="2. Internetezés (érettségi, 2018), 30 diák" badge="Kördiagram" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>360° : 30 = 12° jut egy diákra: 24° → 2, 120° → 10, 132° → 11, 84° → 7 diák.</li>
                <li>a) Legalább 2 órát: 11 + 7 = <strong>18 diák</strong>.</li>
                <li>
                  b) Mindenki használ mobilt (30), laptopot 24-en, tabletet 16-an, pontosan kétfélét 14-en. Ha x diák használ mindhármat, akkor (16 − x) csak mobilt: (16 − x) + 2 · 14 + 3x = 30 + 24 + 16 = 70 ⇒ <strong>x = 13</strong>.
                </li>
              </ul>
            </TheoryCard>
          </div>
          <div className="space-y-4">
            <StatChartsGradesBandSvg />
            <StatChartsInternetPieSvg />
          </div>
        </div>
      </TheorySection>

      {/* 6. Ráadás */}
      <TheorySection title="6. Ráadás: filmértékelések és korfák" badge="Ráadás" badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="1. Az IMDb-szavazatok egy filmre" badge="Súlyozott átlag" badgeColor="indigo">
              <TheoryTable
                headers={['Pont', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1']}
                rows={[
                  ['Szavazat', '544 471', '237 026', '113 042', '45 465', '17 664', '10 310', '5215', '4175', '4226', '31 369'],
                  ['Rel. gyak.', '53,75%', '23,40%', '11,16%', '4,49%', '1,74%', '1,02%', '0,51%', '0,41%', '0,42%', '3,10%']
                ]}
              />
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li>Összesen 1 012 963 szavazat, a pontok összege 9 031 275 ⇒ átlag ≈ <strong>8,92</strong>.</li>
                <li>
                  d) x további 10-es szavazattal: (9 031 275 + 10x) : (1 012 963 + x) = 9,2 ⇒ 0,8x = 287 985 ⇒ x ≈ <strong>359 981</strong>.
                </li>
              </ul>
            </TheoryCard>
            <TheoryCard title="2. Big Voice: 8 szavazó, mind 9 vagy 10 pont, átlag ≈ 9,8" badge="Kerekítés" badgeColor="emerald">
              <p className="text-sm">
                Ha a darab 10-es: 72 + a összeg, (72 + a) : 8 ≈ 9,8. a = 6 esetén 78 : 8 = 9,75 ≈ 9,8; a = 7-nél 9,875 ≈ 9,9. Tehát <strong>6-an adtak 10, 2-en 9 pontot</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="3. Korfák időrendben" badge="Tendencia" badgeColor="rose">
              <p className="text-sm">
                1950: széles alapú „piramis” (sok születés); 1990: „harang”; 2020: keskenyedő alapú „urna”. A születések száma csökken, a várható élettartam nő – a népesség <strong>öregszik</strong>.
              </p>
            </TheoryCard>
          </div>
          <StatChartsPyramidSvg />
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: különböző létszámú csoportok százalékainak átlagolása" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A megkérdezettek hány százaléka jár 10-nél többször színházba?"
          wrong="(12,5% + 43,75%) : 2 = 28,125%"
          wrongExplanation="A két sáv különböző létszámú csoportot ábrázol (120 és 80 fő), ezért a százalékaik egyszerű átlaga hamis eredményt ad."
          correct="0,125 · 120 + 0,4375 · 80 = 15 + 35 = 50 fő ⇒ 50 : 200 = 25%"
          correctExplanation="Előbb számold vissza a darabszámokat, és azokat add össze – ez a súlyozott átlag: 0,6 · 12,5% + 0,4 · 43,75% = 25%."
          tip="Diagram olvasásakor mindig nézd meg a tengely kezdőpontját is: ha az oszlopdiagram függőleges tengelye nem 0-nál kezdődik, az oszlopok aránya félrevezető."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: kördiagram-készítő" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'zenekar', c: [['vonós', 20], ['fúvós', 16], ['ütős', 7], ['egyéb', 2]] },
              { name: 'internetezés', c: [['0–1 óra', 2], ['1–2 óra', 10], ['2–3 óra', 11], ['3 óra felett', 7]] },
              { name: 'színház (mind)', c: [['5-nél kevesebb', 78], ['5–10', 72], ['10-nél több', 50], ['–', 0]] }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => setCats(p.c.map(([nm, f]) => ({ name: String(nm), f: Number(f) })))}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-2">
              {cats.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ background: CAT_COLORS[i] }} />
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => setCats((old) => old.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                    className="w-28 px-2 py-1 rounded border border-sky-200 text-xs"
                    aria-label={`${i + 1}. kategória neve`}
                  />
                  <input
                    type="range"
                    min={0}
                    max={150}
                    value={c.f}
                    onChange={(e) => setCats((old) => old.map((x, j) => (j === i ? { ...x, f: Number(e.target.value) } : x)))}
                    className="flex-1 accent-sky-600"
                    aria-label={`${i + 1}. kategória gyakorisága`}
                  />
                  <span className="w-10 text-right font-mono">{c.f}</span>
                </div>
              ))}
              {total > 0 ? (
                <TheoryTable
                  headers={['kategória', 'gyakoriság', 'arány', 'középponti szög']}
                  rows={[
                    ...cats.map((c) => [c.name, String(c.f), `${hu((c.f / total) * 100, 1)}%`, `${hu((c.f / total) * 360, 1)}°`]),
                    ['összesen', String(total), '100%', '360°']
                  ]}
                />
              ) : (
                <div className="bg-rose-50 rounded-xl border border-rose-200 p-3 text-sm font-bold text-rose-700">Legalább egy gyakoriság legyen pozitív!</div>
              )}
            </div>
            <div>
              {total > 0 && <PieChart values={cats.map((c) => c.f)} labels={cats.map((c) => c.name)} className="w-full max-w-[340px] h-auto mx-auto" />}
              <p className="text-xs text-center text-slate-500 mt-1">1 egység = 360° : {total || '–'} = {total ? hu(360 / total, 2) : '–'}°</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: egy adatsor – négy diagram, súlyozott átlag" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['oszlop', 'kör', 'sáv', 'vonal'] as ChartKind[]).map((k) => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                {k}diagram
              </button>
            ))}
            <button onClick={() => setFreq([10, 40, 135, 95, 40])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              320 tanuló (HF 1.)
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="space-y-2">
              {freq.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-20 font-bold text-slate-700">
                    {i + 1}-es: {f}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={f}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setFreq((old) => old.map((x, j) => (j === i ? v : x)));
                    }}
                    className="flex-1 accent-emerald-600"
                    aria-label={`${i + 1}-es jegyek száma`}
                  />
                </div>
              ))}
              {n > 0 ? (
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-sm space-y-1">
                  <div>
                    Súlyozott átlag: ({freq.map((f, i) => `${i + 1} · ${f}`).join(' + ')}) : {n} = {weighted} : {n} ≈ <strong>{hu(weighted / n, 2)}</strong>
                  </div>
                  <div>Halmozott százalékok: {cum.map((c) => `${hu(c, 1)}%`).join('; ')}</div>
                  <div>
                    Medián: {medianIdx + 1} (az 50% ebbe a sávba esik
                    {cum[medianIdx] === 50 ? ' – pontosan a határon, ilyenkor a két középső adat átlagát vesszük' : ''}); módusz: {modes.join('; ')}
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 rounded-xl border border-rose-200 p-3 text-sm font-bold text-rose-700">Legalább egy jegy legyen!</div>
              )}
            </div>
            <div>
              {n > 0 && kind === 'oszlop' && <MiniBarChart labels={labels5} values={freq} xTitle="osztályzat" yTitle="gyakoriság" width={300} height={190} className="w-full h-auto" />}
              {n > 0 && kind === 'kör' && <PieChart values={freq} labels={labels5.map((l) => `${l}-es`)} colors={[...CAT_COLORS.slice(0, 4), '#be123c']} className="w-full max-w-[340px] h-auto mx-auto" />}
              {n > 0 && kind === 'sáv' && (
                <StackedBar rows={[{ label: `${n} jegy`, values: freq }]} legend={labels5.map((l) => `${l}-es`)} colors={[...CAT_COLORS.slice(0, 4), '#be123c']} width={340} className="w-full h-auto" />
              )}
              {n > 0 && kind === 'vonal' && <LineChart labels={labels5} values={freq} yTitle="gyakoriság" className="w-full h-auto" />}
              <TheoryCallout type="tip" title="Melyik a jobb?">
                Ugyanaz az adatsor minden diagramon: az oszlopdiagram a darabszámokat, a kör- és sávdiagram az arányokat mutatja jól. A vonaldiagram itt csak a „hullámot” mutatja – időbeli adatoknál igazán hasznos.
              </TheoryCallout>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatChartsTheory;
