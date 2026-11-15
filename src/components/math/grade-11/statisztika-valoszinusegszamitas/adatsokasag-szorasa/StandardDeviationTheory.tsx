import React, { useRef, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  StandardDeviationClassesSvg,
  StandardDeviationStepsSvg,
  StandardDeviationTableSvg,
  StandardDeviationSpreadSvg,
  StandardDeviationBulbsSvg,
  StandardDeviationCoffeeSvg
} from './StandardDeviationFigures';

const fmt = (v: number, d = 2) => {
  const r = Math.round(v * 10 ** d) / 10 ** d;
  return String(r).replace('.', ',').replace('-', '−');
};

const AX_MIN = 0;
const AX_MAX = 12;
const X0 = 40;
const X1 = 560;
const sx = (v: number) => X0 + ((v - AX_MIN) / (AX_MAX - AX_MIN)) * (X1 - X0);

const DIE = [1, 2, 3, 4, 5, 6];

export const StandardDeviationTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: húzható adatok, élő szórás
  const [data, setData] = useState<number[]>([2, 4, 6, 7, 8, 8, 10, 11]);
  const [drag, setDrag] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const n = data.length;
  const mean = data.reduce((s, x) => s + x, 0) / n;
  const devs = data.map((x) => x - mean);
  const sq = devs.map((d) => d * d);
  const variance = sq.reduce((s, x) => s + x, 0) / n;
  const sigma = Math.sqrt(variance);
  const stack = data.map((v, i) => data.slice(0, i).filter((w) => w === v).length);
  const stackStep = Math.min(15, 80 / Math.max(1, ...stack));
  const canShift = (k: number) => data.every((x) => x + k >= AX_MIN && x + k <= AX_MAX);
  const valueFromEvent = (e: React.PointerEvent<SVGSVGElement>): number => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / (r.width || 1)) * 600;
    const v = Math.round(AX_MIN + ((x - X0) / (X1 - X0)) * (AX_MAX - AX_MIN));
    return Math.min(AX_MAX, Math.max(AX_MIN, v));
  };
  const sortedIdx = data.map((_, i) => i).sort((a, b) => data[a] - data[b]);

  // Labor II: gyakorisági táblázat (dobókocka)
  const [freq, setFreq] = useState<number[]>([21, 18, 4, 45, 22, 10]);
  const N = freq.reduce((s, f) => s + f, 0);
  const fMean = N ? DIE.reduce((s, v, i) => s + v * freq[i], 0) / N : 0;
  const fRows = DIE.map((v, i) => ({ v, f: freq[i], d: v - fMean, d2: (v - fMean) ** 2, w: freq[i] * (v - fMean) ** 2 }));
  const fSum = fRows.reduce((s, r) => s + r.w, 0);
  const fVar = N ? fSum / N : 0;
  const fSigma = Math.sqrt(fVar);
  const setF = (i: number, val: number) => setFreq(freq.map((f, j) => (j === i ? Math.max(0, Math.min(99, val)) : f)));

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="adatsokasag-szorasa"
      title="4. Adatsokaság szórása"
      subtitle="Az átlag nem mond el mindent: a szórás azt méri, mennyire térnek el az adatok az átlagtól."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_adatsokasag_szorasa_tananyag.pdf"
      practiceTitle="Készen állsz a szórás kiszámítására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZÓRÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              σ = √( ((x₁ − x̄)² + (x₂ − x̄)² + … + (xₙ − x̄)²) / n )
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A gyökjel alatti mennyiség a <strong>szórásnégyzet</strong> (σ²): az átlagtól való eltérések négyzeteinek átlaga.
              </li>
              <li>A szórás nemnegatív szám; ha minden adat egyenlő, a szórás 0.</li>
              <li>Gyakorisággal megadott adatoknál az eltérésnégyzeteket a gyakoriságokkal súlyozzuk.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: azonos átlag, különböző eredmények" badge="Tankönyv 172. o." badgeColor="sky">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Egy iskola több osztályában ugyanazt a 12 kérdéses évfolyamdolgozatot íratták meg (minden helyes válasz 1 pont). Mindhárom osztály átlaga 7 pont, mégis lényeges a különbség: az elsőben a tanulók felkészültsége hasonló, a másodikban jobban szóródnak az eredmények, a harmadikban két jól elkülönülő csoport alakult ki, és senki sem írt átlagos pontszámú dolgozatot. (Az ábra saját adatokkal szemlélteti a tankönyv grafikonjait.)
          </p>
          <StandardDeviationClassesSvg />
          <TheoryCallout type="info" title="A kérdés">
            Keresünk egy olyan számszerű jellemzőt, amely ezeket a különbségeket mutatja. Az adatok szóródását leíró egyik mutató a <strong>szórás</strong>.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: az adatsokaság szórása" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Nagyszámú adat esetén az átlag kevés információt hordoz. Több szóródási mutató létezik (terjedelem, félterjedelem); a <strong>szórás</strong> az adatok átlagtól való eltérését veszi alapul. Az eltéréseket négyzetre emeljük – így nem számít, hogy az eltérés pozitív vagy negatív.
            </p>
            <TheoryCard title="Definíció" badge="Definíció" badgeColor="sky">
              <p className="text-sm">
                Ha egy véges adatsokaság adatai x₁, x₂, …, xₙ, átlaguk x̄, akkor a
              </p>
              <p className="font-mono text-center my-2">((x₁ − x̄)² + (x₂ − x̄)² + … + (xₙ − x̄)²) / n</p>
              <p className="text-sm">
                számot az adatsokaság <strong>szórásnégyzetének</strong>, ennek négyzetgyökét az adatsokaság <strong>szórásának</strong> nevezzük. Jele: <strong>σ</strong> (görög szigma).
              </p>
            </TheoryCard>
            <TheoryCallout type="tip" title="Táblázat segít">
              Az első sorba az adatok, a másodikba az átlagtól való eltérések (xᵢ − x̄), a harmadikba az eltérések négyzetei (xᵢ − x̄)² kerülnek. Ha ismert a gyakoriság, az eltérésnégyzeteket a gyakoriságokkal súlyozzuk.
            </TheoryCallout>
          </div>
          <StandardDeviationStepsSvg />
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat */}
      <TheorySection title="3. Kidolgozott feladat: 33, 33, 45, 45, 45, 45, 45, 45, 46, 48" badge="Tankönyv 173. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <ol className="list-decimal pl-5 space-y-1">
              <li>Átlag: (2 · 33 + 6 · 45 + 46 + 48) / 10 = 430 / 10 = <strong>43</strong>.</li>
              <li>Eltérések: 33 − 43 = −10; 45 − 43 = 2; 46 − 43 = 3; 48 − 43 = 5.</li>
              <li>Négyzetek: 100; 4; 9; 25.</li>
              <li>Súlyozott átlaguk: (2 · 100 + 6 · 4 + 9 + 25) / 10 = 258 / 10 = <strong>25,8</strong> (szórásnégyzet).</li>
              <li>Szórás: σ = √25,8 ≈ <strong>5,1</strong>.</li>
            </ol>
          </div>
          <StandardDeviationTableSvg />
        </div>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Tankönyvi feladatok" badge="Feladatok" badgeColor="amber">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="1. feladat: cinkelt dobókocka, 120 dobás" badge="Feladat" badgeColor="amber">
              <TheoryTable headers={['pontszám', '1', '2', '3', '4', '5', '6']} rows={[['gyakoriság', '21', '18', '4', '45', '22', '10']]} />
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
                <li>b) átlag: 419 / 120 ≈ 3,49</li>
                <li>c) medián: a 60. és 61. elem is 4 ⇒ 4</li>
                <li>d) módusz: 4 (45-ször)</li>
                <li>e) terjedelem: 6 − 1 = 5</li>
                <li>f) szórás: σ ≈ 1,57 (σ² ≈ 2,47)</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="2. feladat: −10; 0; 10; 15; 35" badge="Feladat" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>a) átlag: 50 / 5 = 10; terjedelem: 35 − (−10) = 45</li>
                <li>b) eltérésnégyzetek: 400; 100; 0; 25; 625, összegük 1150</li>
                <li>σ² = 1150 / 5 = 230, σ = √230 ≈ 15,17</li>
              </ul>
              <StandardDeviationSpreadSvg className="w-full h-auto mt-2" />
            </TheoryCard>
          </div>
          <TheoryCard title="3. feladat: kávékóstoló (érettségi alapján, 2014)" badge="Feladat" badgeColor="violet">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              <div className="space-y-2 text-sm text-slate-700">
                <TheoryTable
                  headers={['pontszám', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                  rows={[
                    ['1. csoport', '0', '0', '1', '0', '6', '8', '2', '2', '1', '0'],
                    ['2. csoport', '0', '8', '0', '2', '0', '1', '0', '0', '0', '9']
                  ]}
                />
                <ul className="list-disc pl-5 space-y-1">
                  <li>a) mindkét csoport átlaga: 120 / 20 = <strong>6</strong></li>
                  <li>b) 1. csoport: σ ≈ 1,30 (σ² = 1,7); 2. csoport: σ ≈ 3,74 (σ² = 14)</li>
                  <li>c) 1. csoport: 3; 5; 6; 6,5; 9 — 2. csoport: 2; 2; 5; 10; 10</li>
                  <li>d) A 2. csoport dobozdiagramja sokkal „szélesebb” (félterjedelem 8 a 1,5 helyett), az adatok messzebb vannak az átlagtól – ennek nagyobb a szórása is.</li>
                </ul>
              </div>
              <StandardDeviationCoffeeSvg />
            </div>
          </TheoryCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Házi feladat 1." badge="Házi feladat" badgeColor="rose">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>a) 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 6, 6, 7, 8, 9</li>
                <li>c) terjedelem: 9 − 2 = 7</li>
                <li>d) átlag: 67 / 15 ≈ 4,47</li>
                <li>e) szórás: σ ≈ 2,22</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="Házi feladat 2. (érettségi alapján, 2020)" badge="Házi feladat" badgeColor="slate">
              <p className="text-sm text-slate-700">
                Márton Anita hat dobása a 2016-os olimpiai döntőben (a tankönyvi táblázat szerint): 17,60; 18,72; 19,39; 19,38; 19,10; 19,87 m. Átlaga 114,06 / 6 = <strong>19,01 m</strong>, szórása σ ≈ <strong>0,72 m</strong>. Eredménye a legnagyobb érvényes dobás: 19,87 m.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Ráadás */}
      <TheorySection title="5. Ráadás: oszlopdiagram és az adatok szórása (két izzógyár)" badge="Ráadás" badgeColor="slate">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Mindkét gyár szerint izzóik átlagosan 1000 órán át világítanak; ezt 1000-1000 izzó vizsgálatával támasztják alá (10 órára kerekítve).
          </p>
          <TheoryTable
            headers={['', 'Terjedelem', 'Módusz', 'Medián', 'Átlag', 'Szórás']}
            rows={[
              ['1. gyár', '770', '1010', '1010', '≈ 1002', '≈ 43,6'],
              ['2. gyár', '770', '1010', '1000', '≈ 1001', '≈ 110,5']
            ]}
          />
          <StandardDeviationBulbsSvg />
          <p>
            A terjedelem, a módusz, a medián és az átlag alapján nem látszik lényeges különbség. Az oszlopdiagram viszont azonnal mutatja: az 1. gyárnál az izzók több mint 80%-ának élettartama 980 és 1050 óra közötti (kb. 70 óra széles sáv), a 2. gyárnál ugyanennyi adathoz legalább 160 óra széles sáv kell (pl. 910–1070 óra). A 2. gyár adatainak jóval nagyobb a szórása – <strong>az 1. gyár ígérete megbízhatóbb</strong>.
          </p>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hibák a szórás kiszámításakor" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi a 33, 33, 45, 45, 45, 45, 45, 45, 46, 48 adatsokaság szórása?"
          wrong="σ = 25,8 (vagy a gyakoriságok figyelmen kívül hagyásával számolt érték)"
          wrongExplanation="A 25,8 a szórásnégyzet, a végén még gyököt kell vonni! Gyakori hiba az is, hogy csak a különböző értékekkel (33, 45, 46, 48) számolunk, a gyakoriságokat elfelejtve."
          correct="σ = √25,8 ≈ 5,1"
          correctExplanation="Minden adat annyiszor számít, amennyi a gyakorisága: (2 · 100 + 6 · 4 + 1 · 9 + 1 · 25) / 10 = 25,8, és ebből vonunk gyököt."
          tip="Ellenőrzés: az eltérések (gyakorisággal súlyozott) összege mindig 0: 2 · (−10) + 6 · 2 + 3 + 5 = 0."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: húzd az adatokat, figyeld a szórást!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Húzd vízszintesen a pontokat (0–12 pont)! A piros vonal az átlag, a színes szakaszok az átlagtól való eltérések. Próbáld ki: mi történik, ha minden adatot ugyanannyival eltolsz?
          </p>
          <svg
            ref={svgRef}
            viewBox="0 0 600 230"
            className="w-full h-auto touch-none select-none"
            onPointerMove={(e) => {
              if (drag === null) return;
              const v = valueFromEvent(e);
              if (v !== data[drag]) setData(data.map((x, j) => (j === drag ? v : x)));
            }}
            onPointerUp={() => setDrag(null)}
            onPointerLeave={() => setDrag(null)}
          >
            <rect x="2" y="2" width="596" height="226" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
            {data.map((v, i) => (
              <circle
                key={`p${i}`}
                cx={sx(v)}
                cy={110 - stack[i] * stackStep}
                r="7"
                fill={drag === i ? '#0284c7' : '#38bdf8'}
                stroke="#0369a1"
                strokeWidth="1.5"
                style={{ cursor: 'grab' }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  (e.currentTarget.ownerSVGElement as SVGSVGElement | null)?.setPointerCapture?.(e.pointerId);
                  setDrag(i);
                }}
              />
            ))}
            <line x1={X0 - 8} y1="128" x2={X1 + 8} y2="128" stroke="#475569" strokeWidth="1.5" />
            {Array.from({ length: 13 }, (_, k) => k).map((k) => (
              <g key={k}>
                <line x1={sx(k)} y1="124" x2={sx(k)} y2="132" stroke="#475569" />
                <text x={sx(k)} y="146" fontSize="11" textAnchor="middle" fill="#334155">
                  {k}
                </text>
              </g>
            ))}
            <line x1={sx(mean)} y1="20" x2={sx(mean)} y2="220" stroke="#be123c" strokeWidth="2" strokeDasharray="5 4" />
            <text x={sx(mean)} y="16" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#be123c">
              x̄ = {fmt(mean)}
            </text>
            {sortedIdx.map((idx, k) => {
              const y = 158 + k * (60 / Math.max(n, 1));
              return (
                <line
                  key={`d${idx}`}
                  x1={sx(mean)}
                  y1={y}
                  x2={sx(data[idx])}
                  y2={y}
                  stroke={data[idx] < mean ? '#2563eb' : '#059669'}
                  strokeWidth={Math.max(1.5, Math.min(4, 50 / Math.max(n, 1)))}
                  strokeLinecap="round"
                />
              );
            })}
            {sigma > 0 && (
              <rect x={sx(mean - sigma)} y="150" width={sx(mean + sigma) - sx(mean - sigma)} height="72" fill="#7c3aed" fillOpacity="0.08" stroke="#7c3aed" strokeDasharray="3 3" />
            )}
          </svg>
          <div className="flex flex-wrap gap-2">
            <button disabled={!canShift(1)} onClick={() => setData(data.map((x) => x + 1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100 disabled:opacity-40">
              minden adat +1
            </button>
            <button disabled={!canShift(-1)} onClick={() => setData(data.map((x) => x - 1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100 disabled:opacity-40">
              minden adat −1
            </button>
            <button
              disabled={!data.every((x) => x * 2 <= AX_MAX)}
              onClick={() => setData(data.map((x) => x * 2))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100 disabled:opacity-40"
            >
              minden adat ×2
            </button>
            <button disabled={n >= 20} onClick={() => setData([...data, Math.round(mean)])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 disabled:opacity-40">
              + adat az átlag közelében
            </button>
            <button disabled={n <= 2} onClick={() => setData(data.slice(0, -1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 hover:bg-rose-100 disabled:opacity-40">
              − utolsó adat törlése
            </button>
            {[
              { t: '2, 4, 6', d: [2, 4, 6] },
              { t: '1, 3, 5, 7', d: [1, 3, 5, 7] },
              { t: 'mind egyenlő', d: [5, 5, 5, 5, 5] },
              { t: 'két csoport', d: [3, 3, 3, 4, 4, 10, 10, 11, 11, 11] }
            ].map((p) => (
              <button key={p.t} onClick={() => setData(p.d)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                {p.t}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="text-xs font-mono border-collapse">
              <tbody>
                <tr>
                  <th className="px-2 py-1 text-left bg-sky-50 border border-sky-200">xᵢ</th>
                  {sortedIdx.map((i) => (
                    <td key={i} className="px-2 py-1 border border-sky-100 text-center">
                      {data[i]}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="px-2 py-1 text-left bg-sky-50 border border-sky-200">xᵢ − x̄</th>
                  {sortedIdx.map((i) => (
                    <td key={i} className="px-2 py-1 border border-sky-100 text-center">
                      {fmt(devs[i])}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="px-2 py-1 text-left bg-sky-50 border border-sky-200">(xᵢ − x̄)²</th>
                  {sortedIdx.map((i) => (
                    <td key={i} className="px-2 py-1 border border-sky-100 text-center">
                      {fmt(sq[i])}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              ['elemszám', String(n)],
              ['átlag (x̄)', fmt(mean, 3)],
              ['szórásnégyzet (σ²)', fmt(variance, 3)],
              ['szórás (σ)', fmt(sigma, 3)]
            ].map(([k, v]) => (
              <div key={k} className="bg-sky-50 rounded-xl border border-sky-200 p-3">
                <div className="text-xs text-sky-700 font-semibold">{k}</div>
                <div className="font-mono font-bold text-slate-900">{v}</div>
              </div>
            ))}
          </div>
          <TheoryCallout type="tip" title="Megfigyelés">
            Ha minden adathoz ugyanannyit adunk, az átlag eltolódik, de a szórás nem változik. Ha minden adatot megkétszerezünk, a szórás is kétszeresére nő. A lila sáv az [x̄ − σ; x̄ + σ] intervallum.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: szórás gyakorisági táblázatból" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Egy dobókockával dobott pontszámok gyakoriságát adhatod meg. A táblázat lépésenként mutatja a súlyozott számolást.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { t: 'cinkelt kocka (tankönyv)', f: [21, 18, 4, 45, 22, 10] },
              { t: 'egyenletes (20-20)', f: [20, 20, 20, 20, 20, 20] },
              { t: 'csak 1-es és 6-os', f: [60, 0, 0, 0, 0, 60] },
              { t: 'mind 4-es', f: [0, 0, 0, 120, 0, 0] }
            ].map((p) => (
              <button key={p.t} onClick={() => setFreq(p.f)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100">
                {p.t}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="px-2 py-1 border border-teal-200">pontszám (xᵢ)</th>
                  <th className="px-2 py-1 border border-teal-200">gyakoriság (fᵢ)</th>
                  <th className="px-2 py-1 border border-teal-200">xᵢ − x̄</th>
                  <th className="px-2 py-1 border border-teal-200">(xᵢ − x̄)²</th>
                  <th className="px-2 py-1 border border-teal-200">fᵢ · (xᵢ − x̄)²</th>
                </tr>
              </thead>
              <tbody>
                {fRows.map((r, i) => (
                  <tr key={r.v} className="text-center font-mono">
                    <td className="px-2 py-1 border border-teal-100 font-bold">{r.v}</td>
                    <td className="px-2 py-1 border border-teal-100">
                      <div className="flex items-center justify-center gap-1">
                        <button aria-label={`${r.v} gyakoriság csökkentése`} onClick={() => setF(i, r.f - 1)} className="w-6 h-6 rounded bg-white border border-teal-300 font-bold">
                          −
                        </button>
                        <span className="w-8">{r.f}</span>
                        <button aria-label={`${r.v} gyakoriság növelése`} onClick={() => setF(i, r.f + 1)} className="w-6 h-6 rounded bg-white border border-teal-300 font-bold">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-1 border border-teal-100">{N ? fmt(r.d, 3) : '–'}</td>
                    <td className="px-2 py-1 border border-teal-100">{N ? fmt(r.d2, 3) : '–'}</td>
                    <td className="px-2 py-1 border border-teal-100">{N ? fmt(r.w, 2) : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {N === 0 ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg legalább egy dobást!</div>
          ) : (
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1 text-sm font-mono">
              <div>
                n = {N};  x̄ = {DIE.reduce((s, v, i) => s + v * freq[i], 0)} / {N} ≈ {fmt(fMean, 3)}
              </div>
              <div>
                σ² = {fmt(fSum, 2)} / {N} ≈ {fmt(fVar, 3)}
              </div>
              <div className="text-lg font-sans font-bold text-teal-900">σ ≈ {fmt(fSigma, 3)}</div>
            </div>
          )}
          <TheoryCallout type="info" title="Mit látsz?">
            Ha az adatok az átlag körül sűrűsödnek, kicsi a szórás; ha a két szélső érték körül (1-es és 6-os), a szórás a lehető legnagyobb (2,5). Ha minden dobás ugyanaz, a szórás 0.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StandardDeviationTheory;
