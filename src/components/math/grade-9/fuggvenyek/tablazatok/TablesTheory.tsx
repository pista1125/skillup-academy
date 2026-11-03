import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  TableStructureSvg,
  ContingencyTableSvg,
  FunctionTableSvg
} from './TablesFigures';
import {
  Table,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Calculator,
  Hash,
  Percent,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface TablesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TablesTheory: React.FC<TablesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV KERESZTTÁBLA LABOR ÁLLAPOTOK ---
  const [fociFiu, setFociFiu] = useState<number>(18);
  const [fociLany, setFociLany] = useState<number>(6);
  const [uszasFiu, setUszasFiu] = useState<number>(12);
  const [uszasLany, setUszasLany] = useState<number>(14);

  // Számított peremösszegek és arányok
  const summary = useMemo(() => {
    const osszesFiu = fociFiu + uszasFiu;
    const osszesLany = fociLany + uszasLany;
    const osszesFoci = fociFiu + fociLany;
    const osszesUszas = uszasFiu + uszasLany;
    const osszesen = osszesFiu + osszesLany;

    const fiuFociPct = osszesFiu > 0 ? ((fociFiu / osszesFiu) * 100).toFixed(1) : '0';
    const lanyFociPct = osszesLany > 0 ? ((fociLany / osszesLany) * 100).toFixed(1) : '0';
    const focistakFiuPct = osszesFoci > 0 ? ((fociFiu / osszesFoci) * 100).toFixed(1) : '0';

    return {
      osszesFiu,
      osszesLany,
      osszesFoci,
      osszesUszas,
      osszesen,
      fiuFociPct,
      lanyFociPct,
      focistakFiuPct
    };
  }, [fociFiu, fociLany, uszasFiu, uszasLany]);

  // --- INTERAKTÍV FÜGGVÉNY ÉRTÉKTÁBLÁZAT LABOR ---
  const [multiplier, setMultiplier] = useState<number>(2);
  const [constant, setConstant] = useState<number>(-1);
  const xValues = [-2, -1, 0, 1, 2, 3];

  return (
    <TheoryTemplate
      title="1. Táblázatok a matematikában"
      subtitle="Adatok rendszerezése, kétdimenziós kereszttáblázatok, relatív gyakoriságok és függvény-értéktáblázatok a 9. osztályban"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 1. TÁBLÁZATOK"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a táblázatok feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Kereszttábla alapszabálya",
        formula: "Sorösszegek összege = Oszlopösszegek összege = Teljes mintaelemszám (N)",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: A TÁBLÁZATOK SZERKEZETE ÉS ALAPFOGALMAI
      ========================================================================= */}
      <TheorySection
        title="1. A táblázatok felépítése és adatolvasás"
        icon={<Table className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Mi a táblázat és miért nélkülözhetetlen a matematikában?"
          icon={<FileSpreadsheet className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A táblázat adatok sorokba és oszlopokba rendezett, áttekinthető struktúrája. A matematika és a statisztika egyik legfontosabb eszköze, mert bonyolult adatkapcsolatokat tesz azonnal átláthatóvá és elemezhetővé.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <TableStructureSvg size={280} />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-800 dark:text-blue-300">Sorok (rekordok):</span> Vízszintes adatsorok, melyek általában egy-egy konkrét egyedhez, időponthoz vagy méréshez tartozó értékeket tartalmaznak.
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-900">
                <span className="font-bold text-indigo-800 dark:text-indigo-300">Oszlopok (mezők / változók):</span> Függőleges adatsorok, amelyek egy adott tulajdonság (pl. magasság, ár, darabszám) értékeit gyűjtik össze.
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-800 dark:text-amber-300">Cellák és fejlécek:</span> A sorok és oszlopok metszéspontjában elhelyezkedő konkrét adat. A fejlécek mutatják a mértékegységet (pl. <code className="font-mono font-bold">Ft</code>, <code className="font-mono font-bold">kg</code>, <code className="font-mono font-bold">fő</code>).
              </div>
            </div>
          </div>

          <TheoryCallout
            title="Mértékegységek szerepe"
            variant="info"
            icon={<Hash className="w-5 h-5 text-blue-600" />}
          >
            A táblázatok fejlécében mindig feltüntetjük a mértékegységet vagy a nagyságrendet (pl. <em>„Bevétel (ezer Ft)”</em>). Ilyenkor a cellában lévő <code className="font-bold">450</code> számérték valójában <code className="font-bold">450 000 Ft</code>-ot jelent! Mindig ellenőrizd a fejlécet számítás előtt!
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: KERESZTTÁBLÁZATOK (KONTINGENCIA-TÁBLÁZATOK)
      ========================================================================= */}
      <TheorySection
        title="2. Kereszttáblázatok (Kontingencia-táblázatok)"
        icon={<Layers className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Két ismérv együttes eloszlása és peremösszegek"
          icon={<Calculator className="w-5 h-5 text-indigo-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A kereszttáblázatban (kontingencia-táblázatban) egyszerre két minőségi vagy diszkrét mennyiségi tulajdonság szerinti megoszlást ábrázolunk. Például egy évfolyam diákjainak nemét és a választott sportágat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <ContingencyTableSvg size={300} />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900">
                <span className="font-bold text-purple-800 dark:text-purple-300">Belső cellák:</span> A két tulajdonság együttes gyakoriságát mutatják (pl. 18 fiú focizik).
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Peremösszegek (Margók):</span> A sorok végén lévő sorösszegek (pl. 30 fiú, 20 lány) és az oszlopok alján lévő oszlopösszegek (pl. 24 focista, 26 úszó).
              </div>
              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-lg border border-sky-200 dark:border-sky-900">
                <span className="font-bold text-sky-800 dark:text-sky-300">Teljes elemszám (N):</span> A jobb alsó sarok, amely a sorösszegek és az oszlopösszegek összege is egyben: <code className="font-bold font-mono">30 + 20 = 24 + 26 = 50</code>.
              </div>
            </div>
          </div>

          {/* =========================================================================
              INTERAKTÍV KERESZTTÁBLA ÉS SZÁZALÉK LABOR
          ========================================================================= */}
          <div className="mt-8 p-5 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Interaktív Kereszttábla & Statisztikai Laboratórium
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Módosítsd a belső cellák értékeit, és figyeld meg, hogyan változnak a peremösszegek és a feltételes százalékos arányok!
            </p>

            {/* Szabályozók és Tábla */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Bal oldal: Beviteli táblázat */}
              <div className="overflow-x-auto">
                <table className="w-full text-center text-xs sm:text-sm border-collapse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-700">
                  <thead>
                    <tr className="bg-indigo-600 text-white font-bold">
                      <th className="p-2.5">Nem \ Sport</th>
                      <th className="p-2.5">Foci</th>
                      <th className="p-2.5">Úszás</th>
                      <th className="p-2.5 bg-indigo-700">Sorösszeg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="p-2 font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50">Fiú</td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={fociFiu}
                          onChange={(e) => setFociFiu(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-blue-50/50 border-blue-300 dark:bg-slate-700 dark:border-slate-600"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={uszasFiu}
                          onChange={(e) => setUszasFiu(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-blue-50/50 border-blue-300 dark:bg-slate-700 dark:border-slate-600"
                        />
                      </td>
                      <td className="p-2 font-black text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-900/40">
                        {summary.osszesFiu}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <td className="p-2 font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50">Lány</td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={fociLany}
                          onChange={(e) => setFociLany(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-blue-50/50 border-blue-300 dark:bg-slate-700 dark:border-slate-600"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={uszasLany}
                          onChange={(e) => setUszasLany(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-16 px-2 py-1 text-center font-bold border rounded-lg bg-blue-50/50 border-blue-300 dark:bg-slate-700 dark:border-slate-600"
                        />
                      </td>
                      <td className="p-2 font-black text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-900/40">
                        {summary.osszesLany}
                      </td>
                    </tr>
                    <tr className="bg-slate-100 dark:bg-slate-900 font-bold">
                      <td className="p-2 font-black text-indigo-900 dark:text-indigo-300">Oszlopösszeg</td>
                      <td className="p-2 text-indigo-800 dark:text-indigo-300">{summary.osszesFoci}</td>
                      <td className="p-2 text-indigo-800 dark:text-indigo-300">{summary.osszesUszas}</td>
                      <td className="p-2 text-base font-black text-white bg-indigo-600 rounded-br-xl">
                        N = {summary.osszesen}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Jobb oldal: Százalékos elemzés */}
              <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">A fiúk hány %-a focizik?</span>
                  <span className="px-2 py-1 font-bold rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {summary.fiuFociPct}%
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700 text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">A lányok hány %-a focizik?</span>
                  <span className="px-2 py-1 font-bold rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    {summary.lanyFociPct}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">A focisták hány %-a fiú?</span>
                  <span className="px-2 py-1 font-bold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {summary.focistakFiuPct}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: FÜGGVÉNYEK ÉS HOZZÁRENDELÉSEK ÉRTÉKTÁBLÁZATA
      ========================================================================= */}
      <TheorySection
        title="3. Hozzárendelések és Értéktáblázatok: x ➔ f(x)"
        icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
      >
        <TheoryCard
          title="Hogyan vezet a táblázat a függvény fogalmához?"
          icon={<Lightbulb className="w-5 h-5 text-emerald-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A függvénytani gondolkodás alapja az <strong>egyértelmű hozzárendelés</strong>: egy bemeneti számhoz (<code className="font-bold">x</code>, független változó) egyértelműen hozzárendelünk egy kimeneti értéket (<code className="font-bold">y = f(x)</code>, függő változó).
          </p>

          <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
            <FunctionTableSvg size={320} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <h5 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">1. x: Független változó</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Az értelmezési tartományból szabadon választott értékek (pl. -2, 0, 1, 3).
              </p>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
              <h5 className="font-bold text-teal-900 dark:text-teal-300 mb-1">2. Szabály: f(x)</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A matematikai képlet, amely megadja a műveletet (pl. kétszerese növelve eggyel: <code className="font-bold">2x + 1</code>).
              </p>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800">
              <h5 className="font-bold text-sky-900 dark:text-sky-300 mb-1">3. Pontok a síkban</h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A táblázat oszlopai pontok koordinátái lesznek a grafikonon: <code className="font-bold">(x; y)</code>.
              </p>
            </div>
          </div>

          {/* Dinamikus függvénytáblázat készítő */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Képlet módosítása:</span>
                <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                  f(x) = {multiplier}x {constant >= 0 ? `+ ${constant}` : `- ${Math.abs(constant)}`}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">Meredekség (m):</span>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    value={multiplier}
                    onChange={(e) => setMultiplier(parseInt(e.target.value))}
                    className="w-24 accent-blue-600"
                  />
                  <span className="text-xs font-bold w-6">{multiplier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">Tengelymetszet (b):</span>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={constant}
                    onChange={(e) => setConstant(parseInt(e.target.value))}
                    className="w-24 accent-indigo-600"
                  />
                  <span className="text-xs font-bold w-6">{constant}</span>
                </div>
              </div>
            </div>

            {/* Dinamikusan generált táblázat */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-blue-600 text-white font-bold text-xs sm:text-sm">
                    <th className="p-2 border-r border-blue-500 w-24">x</th>
                    {xValues.map((x) => (
                      <th key={x} className="p-2 border-r border-blue-500 last:border-r-0">{x}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    <td className="p-2 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 font-mono text-blue-600 dark:text-blue-400">
                      f(x)
                    </td>
                    {xValues.map((x) => (
                      <td key={x} className="p-2 border-r border-slate-200 dark:border-slate-700 last:border-r-0 font-mono text-emerald-600 dark:text-emerald-400">
                        {multiplier * x + constant}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák és érettségi csapdák a táblázatoknál"
        traps={[
          {
            wrong: 'A relatív gyakoriság (százalék) számításánál a teljes mintára vetítünk a megadott részhalmaz helyett.',
            correct: 'Figyelj a kérdés megfogalmazására! „A lányok hány százaléka úszik?” esetén az alap a LÁNYOK ÖSSZESEN száma, nem pedig a teljes osztálylétszám.',
            explanation: 'Mindig azonosítsd az alap (100%) és a részhalmaz kapcsolatát: (rész / alap) · 100%.'
          },
          {
            wrong: 'A táblázat fejlécében megadott nagyságrend figyelmen kívül hagyása (pl. „adatok millió Ft-ban”).',
            correct: 'Ha a táblázatban 12 szerepel, és a fejléc „millió Ft”, az érték 12 000 000 Ft. Számoláskor erre mindig ügyelni kell!',
            explanation: 'Az érettségin gyakori pontlevonási ok a mértékegységek elhagyása vagy nagyságrendi hiba.'
          },
          {
            wrong: 'Gyakorisági táblázatból számított átlagnál egyszerű számtani közepet vonunk a kategóriákból.',
            correct: 'Gyakorisági táblázatnál SÚLYOZOTT ÁTLAGOT kell számolni: minden értéket meg kell szorozni a saját gyakoriságával, és osztani a teljes gyakoriságösszeggel.',
            explanation: 'Képlet: átlag = (Σ x_i · f_i) / Σ f_i.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Táblázattípusok és Alkalmazásuk Gyors Áttekintője"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Táblázat típusa', 'Jellemző struktúra', 'Fő matematikai cél', 'Tipikus feladat']}
          rows={[
            ['Egyváltozós adatsor', '1 sor vagy 1 oszlop értékekkel', 'Sorrend, minimum, maximum, átlag meghatározása', 'Hőmérsékletváltozás naponta'],
            ['Gyakorisági táblázat', 'Értékek (x) és gyakoriságok (f)', 'Súlyozott átlag, módusz, medián számítás', 'Dolgozatjegyek megoszlása az osztályban'],
            ['Kontingencia (Kereszttábla)', '2x2 vagy k x m mátrix peremösszegekkel', 'Két tulajdonság kapcsolata, feltételes valószínűség', 'Nem és szakkörválasztás összefüggése'],
            ['Függvény-értéktáblázat', 'x (bemenet) és f(x) (kimenet)', 'Grafikon megrajzolása, pontok koordinátái', 'y = 2x - 3 egyenes pontjainak felvétele']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};

