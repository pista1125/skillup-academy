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
  StatCalculatorMenuSvg,
  StatCalculatorDataScreenSvg,
  StatCalculatorResultsSvg,
  StatCalculatorBiasSvg,
  StatCalculatorFireSvg
} from './StatCalculatorFigures';

const num = (v: number, digits = 9) => {
  if (!Number.isFinite(v)) return '–';
  const r = Number(v.toPrecision(10));
  const s = Math.abs(r - Math.round(r)) < 1e-12 ? String(Math.round(r)) : String(Number(r.toFixed(digits)));
  return s.replace('.', ',').replace('-', '−');
};

const median = (a: number[]) => {
  const n = a.length;
  const m = Math.floor(n / 2);
  return n % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

/** Egyváltozós statisztika – a számológép (és a tankönyv) kvartilis-eljárásával. */
const oneVarStats = (pairs: { x: number; f: number }[]) => {
  const data = pairs.flatMap((p) => Array.from({ length: p.f }, () => p.x)).sort((a, b) => a - b);
  const n = data.length;
  if (n === 0) return null;
  const sum = data.reduce((s, x) => s + x, 0);
  const sumSq = data.reduce((s, x) => s + x * x, 0);
  const mean = sum / n;
  const ss = data.reduce((s, x) => s + (x - mean) ** 2, 0);
  const pVar = ss / n;
  const sVar = n > 1 ? ss / (n - 1) : NaN;
  const h = Math.floor(n / 2);
  const lower = data.slice(0, h);
  const upper = data.slice(n % 2 ? h + 1 : h);
  return {
    n,
    sum,
    sumSq,
    mean,
    pVar,
    pSd: Math.sqrt(pVar),
    sVar,
    sSd: Math.sqrt(sVar),
    min: data[0],
    max: data[n - 1],
    q1: n > 1 ? median(lower) : data[0],
    med: median(data),
    q3: n > 1 ? median(upper) : data[0]
  };
};

type Row = { x: string; f: string };

const PRESETS: { t: string; rows: [number, number][] }[] = [
  { t: '20 járat (kidolgozott)', rows: [[4, 1], [8, 3], [11, 5], [13, 4], [14, 3], [15, 2], [16, 1], [17, 1]] },
  { t: 'tűzoltóság (1. feladat)', rows: [[0, 1], [1, 11], [2, 6], [4, 8], [6, 4], [14, 1]] },
  { t: 'Márton Anita (2. feladat)', rows: [[17.6, 1], [18.72, 1], [19.39, 1], [19.38, 1], [19.1, 1], [19.87, 1]] },
  { t: 'cinkelt kocka (3. feladat)', rows: [[1, 21], [2, 18], [3, 4], [4, 45], [5, 22], [6, 10]] },
  { t: '33, 45, 46, 48 (HF 2. a)', rows: [[33, 1], [45, 1], [46, 1], [48, 1]] },
  { t: 'HF 2. b) gyakorisággal', rows: [[33, 2], [45, 6], [46, 1], [48, 1]] }
];

const toRows = (r: [number, number][]): Row[] => r.map(([x, f]) => ({ x: String(x).replace('.', ','), f: String(f) }));

const BASES: { t: string; d: number[] }[] = [
  { t: '33, 45, 46, 48', d: [33, 45, 46, 48] },
  { t: '4 és 8', d: [4, 8] },
  { t: '−10; 0; 10; 15; 35', d: [-10, 0, 10, 15, 35] }
];

export const StatCalculatorTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: virtuális számológép
  const [rows, setRows] = useState<Row[]>(toRows(PRESETS[0].rows));
  const [useFreq, setUseFreq] = useState<boolean>(true);
  const [page, setPage] = useState<1 | 2>(1);
  const parsed = rows.map((r) => ({ x: Number(r.x.replace(',', '.').replace('−', '-')), f: useFreq ? Number(r.f) : 1 }));
  const valid = parsed.length > 0 && parsed.every((p) => Number.isFinite(p.x) && Number.isInteger(p.f) && p.f >= 0 && p.f <= 999);
  const st = valid ? oneVarStats(parsed) : null;

  // Labor II: torzított és torzítatlan szórás
  const [baseIdx, setBaseIdx] = useState<number>(0);
  const [copies, setCopies] = useState<number>(1);
  const base = BASES[baseIdx].d;
  const statFor = (k: number) => oneVarStats(base.map((x) => ({ x, f: k })))!;
  const cur = statFor(copies);
  const K = 20;
  const series = Array.from({ length: K }, (_, i) => statFor(i + 1));
  const yMax = Math.max(...series.map((s) => s.sSd)) * 1.1;
  const gx = (k: number) => 50 + ((k - 1) / (K - 1)) * 500;
  const gy = (v: number) => 170 - (v / yMax) * 140;

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="statisztikai-szamitasok-szamologep"
      title="5. Ráadás – Statisztikai számítások számológéppel"
      subtitle="Átlag, szórás, kvartilisek egy gombnyomásra: a számológép statisztika üzemmódja, és mit fogad el belőle az érettségi."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_statisztika_szamologeppel_tananyag.pdf"
      practiceTitle="Készen állsz a számológépes statisztikára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — STATISZTIKA SZÁMOLÓGÉPPEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              MENU → 6: Statisztika → 1: 1 változós → adatok (x, Gyak) → OPTN → 3: 1-változós stat
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A tanult szórás a <strong>σx</strong> (n-nel osztunk, „torzított”); az <strong>sx</strong> (n − 1-gyel osztunk, „torzítatlan”) ettől kissé nagyobb.
              </li>
              <li>Gyakorisággal megadott adatoknál töltsd ki a gyakoriság (Gyak) oszlopot is – üresen minden adat 1-szer számít!</li>
              <li>Az érettségin az átlag és a szórás géppel, indoklás nélkül is számolható, ha a feladat nem kéri a részletszámítást.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: 20 járat megállóinak száma" badge="Tankönyv 176. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy városi közlekedési vállalat 20 járatot üzemeltet. A hálózat átszervezéséhez összeírták, hogy az egyes járatok hány megálló hosszúságú szakaszon közlekednek. Számítsuk ki a számológép statisztikai üzemmódjával az adatok átlagát és szórását!
            </p>
            <TheoryTable
              headers={['megállók száma', '4', '8', '11', '13', '14', '15', '16', '17']}
              rows={[['járatok száma', '1', '3', '5', '4', '3', '2', '1', '1']]}
            />
            <TheoryCallout type="success" title="Eredmény">
              Az adatok átlaga <strong>12</strong>, szórása <strong>3,098386677</strong> (σx). A gép kiírja még: Σx = 240, Σx² = 3072, n = 20, min = 4, Q₁ = 11, Med = 13, Q₃ = 14, max = 17.
            </TheoryCallout>
          </div>
          <StatCalculatorDataScreenSvg />
        </div>
      </TheorySection>

      {/* 2. Érettségi szabály */}
      <TheorySection title="2. Néhány szó a számológépekről – mit fogad el az érettségi?" badge="Érettségi" badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Minden matematika érettségi dolgozat „Fontos tudnivalók” oldalán szerepel, hogy a zsebszámológép – további indoklás nélkül – használható az alapműveletekre, hatványozásra, gyökvonásra, n! és binomiális együtthatók kiszámítására, a függvénytáblázat táblázatainak helyettesítésére (sin, cos, tg, log és inverzeik), π és e közelítésére, a másodfokú egyenlet gyökeinek meghatározására, és:
          </p>
          <TheoryCallout type="info" title="A statisztikára vonatkozó rész">
            „További matematikai indoklás nélkül használhatók a számológépek bizonyos statisztikai mutatók kiszámítására (<strong>átlag, szórás</strong>) abban az esetben, ha a feladat szövege kifejezetten nem követeli meg az ezzel kapcsolatos részletszámítások bemutatását is. Egyéb esetekben a géppel elvégzett számítások indoklás nélküli lépéseknek számítanak, azokért nem jár pont.”
          </TheoryCallout>
          <p>
            Régebbi gépeken általában külön gomb van az átlagra (x̄) és a torzított, illetve torzítatlan szórásra (σ vagy s); az adatokat statisztikai módba váltva az =, M+, STO vagy ENTER gombbal lehetett bevinni.
          </p>
        </div>
      </TheorySection>

      {/* 3. Lépések */}
      <TheorySection title="3. A statisztika üzemmód lépésről lépésre" badge="Számológép" badgeColor="indigo">
        <div className="space-y-4">
          <StatCalculatorMenuSvg />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <TheoryCard title="Adatbevitel" badge="1–4. lépés" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1">
                <li>Bekapcsolás után a menü gomb, majd a <strong>6: Statisztika</strong> pont, azon belül az <strong>1: 1 változós</strong> alpont.</li>
                <li>A táblázatba soronként beírjuk az adatokat (x) és – ha a gép megjeleníti – a gyakoriságukat.</li>
                <li>Ha a gyakoriság oszlopot nem töltjük ki, a gép minden adatot 1 gyakorisággal vesz.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="Eredmények" badge="5. lépés" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1">
                <li>Az <strong>OPTN</strong> gomb után a <strong>3: 1-változós stat</strong> menüpont kiírja a fontos mutatókat.</li>
                <li>Sorban: átlag, összeg, négyzetösszeg, σ²x és σx (torzított), s²x és sx (torzítatlan); lefelé lapozva n, minimum, kvartilisek, medián, maximum.</li>
                <li>Az OPTN gombbal visszatérhetünk az adatokhoz, ha módosítani szeretnénk.</li>
              </ul>
            </TheoryCard>
          </div>
          <StatCalculatorResultsSvg />
        </div>
      </TheorySection>

      {/* 4. Torzított / torzítatlan */}
      <TheorySection title="4. Torzított és torzítatlan szórás" badge="Elmélet" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A <strong>σ²x</strong> és a <strong>σx</strong> a torzított szórásnégyzet és szórás: σ² = Σ(xᵢ − x̄)² / n – ez az, amit az előző leckében tanultunk. Az <strong>s²x</strong> és <strong>sx</strong> a torzítatlan szórásnégyzet és szórás, amely csak a nevezőben tér el: s² = Σ(xᵢ − x̄)² / (n − 1).
            </p>
            <TheoryCallout type="warning" title="Melyiket írjuk le?">
              Középiskolában (és az érettségin) az adatsokaság szórása a <strong>σx</strong> érték. A 20 járatnál σx ≈ 3,098, míg sx ≈ 3,179 – kis elemszámnál a különbség már a második jegyben látszik.
            </TheoryCallout>
          </div>
          <StatCalculatorBiasSvg />
        </div>
      </TheorySection>

      {/* 5. Feladatok */}
      <TheorySection title="5. Tankönyvi feladatok (számológéppel)" badge="Feladatok" badgeColor="teal">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <TheoryCard title="1. feladat: tűzoltóság" badge="Feladat" badgeColor="rose">
              <TheoryTable headers={['riasztás/nap', '0', '1', '2', '4', '6', '14']} rows={[['napok', '1', '11', '6', '8', '4', '1']]} />
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
                <li>a) átlag: 93 / 31 = <strong>3</strong></li>
                <li>b) szórás: σx ≈ <strong>2,69</strong> (sx ≈ 2,73)</li>
              </ul>
            </TheoryCard>
            <StatCalculatorFireSvg />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TheoryCard title="2. feladat: Márton Anita" badge="Feladat" badgeColor="emerald">
              <p className="text-sm text-slate-700">
                17,60; 18,72; 19,39; 19,38; 19,10; 19,87 m → átlag <strong>19,01 m</strong>, szórás σx ≈ <strong>0,72 m</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="3. feladat: cinkelt kocka" badge="Feladat" badgeColor="amber">
              <p className="text-sm text-slate-700">
                Gyakoriságok 21, 18, 4, 45, 22, 10 → átlag 419 / 120 ≈ <strong>3,49</strong>, szórás σx ≈ <strong>1,57</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="Házi feladat 2. és 3." badge="Házi feladat" badgeColor="slate">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>a) 33, 45, 46, 48: σ ≈ 5,87</li>
                <li>b) 33, 33, 45 (6-szor), 46, 48: σ ≈ 5,08</li>
                <li>3. Az EB-sebességek (18 adat): átlag ≈ 28,16 km/h, σ ≈ 3,39 km/h</li>
              </ul>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hibák számológéppel" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 33, 33, 45, 45, 45, 45, 45, 45, 46, 48 adatsokaság szórása géppel"
          wrong="5,87 (a gyakoriság oszlop kitöltése nélkül, csak a 33, 45, 46, 48 bevitelével) vagy 5,35 (sx)"
          wrongExplanation="Ha a gyakoriságokat nem visszük be, a gép minden adatot egyszer számol. Ha pedig az sx-et olvassuk le, az n − 1-gyel osztott (torzítatlan) szórást kapjuk."
          correct="σx ≈ 5,08"
          correctExplanation="Vidd be a gyakoriságokat is (2, 6, 1, 1), és a σx sort olvasd le! Ellenőrzésként nézd meg az n értékét: itt 10-nek kell lennie."
          tip="Mindig ellenőrizd az n-t és a Σx-et: ha nem egyezik a várt elemszámmal, valami kimaradt."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: virtuális számológép – 1 változós statisztika" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Írd be az adatokat és a gyakoriságukat, mint a számológépen! Kapcsold ki a gyakoriság oszlopot, és figyeld meg, mi változik.
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.t}
                onClick={() => {
                  setRows(toRows(p.rows));
                  setUseFreq(true);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
              >
                {p.t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-700 p-3">
              <div className="rounded-lg bg-[#dfe8d8] p-2">
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>1 változós – adatok</span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" checked={useFreq} onChange={(e) => setUseFreq(e.target.checked)} aria-label="gyakoriság oszlop" />
                    Gyak oszlop
                  </label>
                </div>
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="text-slate-700">
                      <th className="text-left w-8">#</th>
                      <th>x</th>
                      {useFreq && <th>Gyak</th>}
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i}>
                        <td className="text-slate-600">{i + 1}</td>
                        <td>
                          <input
                            value={r.x}
                            onChange={(e) => setRows(rows.map((q, j) => (j === i ? { ...q, x: e.target.value } : q)))}
                            className="w-full px-1 py-0.5 bg-white/70 border border-slate-400 rounded text-center"
                            aria-label={`${i + 1}. adat`}
                          />
                        </td>
                        {useFreq && (
                          <td>
                            <input
                              value={r.f}
                              onChange={(e) => setRows(rows.map((q, j) => (j === i ? { ...q, f: e.target.value } : q)))}
                              className="w-full px-1 py-0.5 bg-white/70 border border-slate-400 rounded text-center"
                              aria-label={`${i + 1}. gyakoriság`}
                            />
                          </td>
                        )}
                        <td className="text-center">
                          <button
                            onClick={() => rows.length > 1 && setRows(rows.filter((_, j) => j !== i))}
                            className="text-rose-700 font-bold"
                            aria-label={`${i + 1}. sor törlése`}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={() => rows.length < 20 && setRows([...rows, { x: '0', f: '1' }])}
                  className="mt-2 px-2 py-1 rounded bg-white/80 border border-slate-400 text-xs font-bold text-slate-800"
                >
                  + új sor
                </button>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-700 p-3">
              <div className="rounded-lg bg-[#dfe8d8] p-2 min-h-[240px]">
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-2">
                  <span>1-változós stat ({page}. oldal)</span>
                  <span className="flex gap-1">
                    <button onClick={() => setPage(1)} className={`px-2 rounded ${page === 1 ? 'bg-slate-800 text-white' : 'bg-white/70'}`} aria-label="1. oldal">
                      ▲
                    </button>
                    <button onClick={() => setPage(2)} className={`px-2 rounded ${page === 2 ? 'bg-slate-800 text-white' : 'bg-white/70'}`} aria-label="2. oldal">
                      ▼
                    </button>
                  </span>
                </div>
                {!st ? (
                  <div className="text-sm font-bold text-rose-700">Hibás adat! (Az adat szám legyen, a gyakoriság 0 és 999 közötti egész, és legalább egy adat legyen.)</div>
                ) : (
                  <table className="w-full text-sm font-mono">
                    <tbody>
                      {(page === 1
                        ? [
                            ['x̄', num(st.mean)],
                            ['Σx', num(st.sum)],
                            ['Σx²', num(st.sumSq)],
                            ['σ²x', num(st.pVar)],
                            ['σx', num(st.pSd)],
                            ['s²x', num(st.sVar)],
                            ['sx', num(st.sSd)]
                          ]
                        : [
                            ['n', num(st.n)],
                            ['min(x)', num(st.min)],
                            ['Q₁', num(st.q1)],
                            ['Med', num(st.med)],
                            ['Q₃', num(st.q3)],
                            ['max(x)', num(st.max)]
                          ]
                      ).map(([k, v]) => (
                        <tr key={k} className={k === 'σx' ? 'text-rose-700 font-bold' : 'text-slate-900'}>
                          <td className="py-0.5">{k}</td>
                          <td className="text-right">= {v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <TheoryCallout type="tip" title="Ellenőrizd!">
            Az n a gyakoriságok összege. A 20 járatnál n = 20 és Σx = 240 – ha a Gyak oszlopot kikapcsolod, n = 8 lesz, és az átlag is megváltozik (12,25).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: σx és sx – mikor számít a különbség?" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Válassz egy adatsort, és sokszorozd meg (minden adat k-szor szerepel)! A torzított szórás (σx) nem változik, a torzítatlan (sx) viszont egyre közelebb kerül hozzá.
          </p>
          <div className="flex flex-wrap gap-2">
            {BASES.map((b, i) => (
              <button
                key={b.t}
                onClick={() => setBaseIdx(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${i === baseIdx ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-800 hover:bg-teal-100'}`}
              >
                {b.t}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              minden adat ennyiszer szerepel: k = {copies} (n = {cur.n})
            </label>
            <input type="range" min={1} max={K} value={copies} onChange={(e) => setCopies(Number(e.target.value))} className="w-full accent-teal-600" aria-label="ismétlések száma" />
          </div>
          <svg viewBox="0 0 600 200" className="w-full h-auto">
            <rect x="2" y="2" width="596" height="196" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <line x1="50" y1="170" x2="555" y2="170" stroke="#475569" />
            <line x1="50" y1="25" x2="50" y2="170" stroke="#475569" />
            <polyline points={series.map((s, i) => `${gx(i + 1)},${gy(s.sSd)}`).join(' ')} fill="none" stroke="#d97706" strokeWidth="2.5" />
            <polyline points={series.map((s, i) => `${gx(i + 1)},${gy(s.pSd)}`).join(' ')} fill="none" stroke="#0369a1" strokeWidth="2.5" />
            <circle cx={gx(copies)} cy={gy(cur.sSd)} r="5" fill="#d97706" />
            <circle cx={gx(copies)} cy={gy(cur.pSd)} r="5" fill="#0369a1" />
            {[1, 5, 10, 15, 20].map((k) => (
              <text key={k} x={gx(k)} y="186" fontSize="10" textAnchor="middle" fill="#334155">
                k = {k}
              </text>
            ))}
            <text x="545" y="20" fontSize="11" textAnchor="end" fontWeight="bold" fill="#d97706">
              sx (n − 1-gyel)
            </text>
            <text x="545" y="36" fontSize="11" textAnchor="end" fontWeight="bold" fill="#0369a1">
              σx (n-nel)
            </text>
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-3">
              <div className="text-xs text-sky-700 font-semibold">σx (torzított)</div>
              <div className="font-mono font-bold">{num(cur.pSd, 4)}</div>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
              <div className="text-xs text-amber-700 font-semibold">sx (torzítatlan)</div>
              <div className="font-mono font-bold">{num(cur.sSd, 4)}</div>
            </div>
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-3">
              <div className="text-xs text-teal-700 font-semibold">sx / σx = √(n / (n − 1))</div>
              <div className="font-mono font-bold">{num(cur.sSd / cur.pSd, 4)}</div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatCalculatorTheory;
