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
  BoxPlotSpeedsSvg,
  BoxPlotAnatomySvg,
  BoxPlotExampleSvg,
  BoxPlotFrequencySvg,
  BoxPlotOutlierSvg,
  BoxPlotRubikSvg
} from './BoxPlotFigures';

const fmt = (v: number) => String(Math.round(v * 100) / 100).replace('.', ',');

const median = (a: number[]): number => {
  const n = a.length;
  if (n === 0) return NaN;
  const m = Math.floor(n / 2);
  return n % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

/** Ötszámos összefoglaló a tankönyv eljárásával (páratlan elemszámnál a mediánt elhagyjuk). */
const fiveNumberSummary = (data: number[]) => {
  const a = [...data].sort((x, y) => x - y);
  const n = a.length;
  const h = Math.floor(n / 2);
  const lower = a.slice(0, h);
  const upper = a.slice(n % 2 ? h + 1 : h);
  const q1 = n >= 2 ? median(lower) : a[0];
  const q3 = n >= 2 ? median(upper) : a[0];
  const me = median(a);
  const iqr = q3 - q1;
  const lowFence = q1 - 1.5 * iqr;
  const highFence = q3 + 1.5 * iqr;
  // „legalább a félterjedelem másfélszeresével” – a határ is kiugró, ha a félterjedelem > 0
  const isOutlier = (x: number) => iqr > 0 && (x <= lowFence || x >= highFence);
  const inliers = a.filter((x) => !isOutlier(x));
  return {
    sorted: a,
    n,
    min: a[0],
    max: a[n - 1],
    q1,
    me,
    q3,
    iqr,
    range: a[n - 1] - a[0],
    lowFence,
    highFence,
    outliers: a.filter(isOutlier),
    whiskerLow: inliers.length ? inliers[0] : a[0],
    whiskerHigh: inliers.length ? inliers[inliers.length - 1] : a[n - 1]
  };
};

const AXIS_MIN = 0;
const AXIS_MAX = 30;
const X0 = 40;
const X1 = 560;
const sx = (v: number) => X0 + ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * (X1 - X0);

const parseData = (text: string): number[] | null => {
  const parts = text
    .split(/[;\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  if (parts.length < 2 || parts.length > 40) return null;
  const nums = parts.map((t) => Number(t.replace(',', '.').replace('−', '-')));
  if (nums.some((x) => !Number.isFinite(x) || x < AXIS_MIN || x > AXIS_MAX)) return null;
  return nums;
};

const formatData = (d: number[]) => [...d].sort((a, b) => a - b).map(fmt).join('; ');

const LiveBox: React.FC<{ s: ReturnType<typeof fiveNumberSummary>; y: number; showOutliers?: boolean }> = ({ s, y, showOutliers = true }) => {
  const lo = showOutliers ? s.whiskerLow : s.min;
  const hi = showOutliers ? s.whiskerHigh : s.max;
  return (
    <g>
      <line x1={sx(lo)} y1={y} x2={sx(s.q1)} y2={y} stroke="#0369a1" strokeWidth="2" />
      <line x1={sx(s.q3)} y1={y} x2={sx(hi)} y2={y} stroke="#0369a1" strokeWidth="2" />
      <line x1={sx(lo)} y1={y - 10} x2={sx(lo)} y2={y + 10} stroke="#0369a1" strokeWidth="2" />
      <line x1={sx(hi)} y1={y - 10} x2={sx(hi)} y2={y + 10} stroke="#0369a1" strokeWidth="2" />
      <rect x={sx(s.q1)} y={y - 20} width={Math.max(sx(s.q3) - sx(s.q1), 1)} height="40" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" rx="2" />
      <line x1={sx(s.me)} y1={y - 20} x2={sx(s.me)} y2={y + 20} stroke="#be123c" strokeWidth="3" />
      {showOutliers &&
        s.outliers.map((o, i) => <circle key={i} cx={sx(o)} cy={y} r="5.5" fill="#fda4af" stroke="#be123c" strokeWidth="2" />)}
    </g>
  );
};

const AxisRow: React.FC<{ y: number }> = ({ y }) => (
  <g>
    <line x1={X0 - 8} y1={y} x2={X1 + 8} y2={y} stroke="#475569" strokeWidth="1.5" />
    {Array.from({ length: AXIS_MAX - AXIS_MIN + 1 }, (_, i) => AXIS_MIN + i).map((v) => (
      <g key={v}>
        <line x1={sx(v)} y1={y - (v % 5 === 0 ? 5 : 3)} x2={sx(v)} y2={y + (v % 5 === 0 ? 5 : 3)} stroke="#475569" />
        {v % 5 === 0 && (
          <text x={sx(v)} y={y + 18} fontSize="11" textAnchor="middle" fill="#334155">
            {v}
          </text>
        )}
      </g>
    ))}
  </g>
);

const FREQ_VALUES = [4, 5, 7, 8, 10, 12];

export const BoxPlotTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: húzható adatpontok
  const [data, setData] = useState<number[]>([3, 7, 8, 12, 15, 18, 20]);
  const [text, setText] = useState<string>(formatData([3, 7, 8, 12, 15, 18, 20]));
  const [drag, setDrag] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const s = fiveNumberSummary(data);

  const updateData = (d: number[]) => {
    setData(d);
    setText(formatData(d));
  };

  const valueFromEvent = (e: React.PointerEvent<SVGSVGElement>): number => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / (r.width || 1)) * 600;
    const v = Math.round(AXIS_MIN + ((x - X0) / (X1 - X0)) * (AXIS_MAX - AXIS_MIN));
    return Math.min(AXIS_MAX, Math.max(AXIS_MIN, v));
  };

  // halmozott pontok: az azonos értékek egymás fölé kerülnek
  const stackIndex: number[] = data.map((v, i) => data.slice(0, i).filter((w) => w === v).length);
  const stackStep = Math.min(16, 90 / Math.max(1, ...stackIndex));

  // Labor II: gyakorisági táblázat
  const [freq, setFreq] = useState<number[]>([1, 2, 1, 4, 2, 1]);
  const expanded = FREQ_VALUES.flatMap((v, i) => Array.from({ length: freq[i] }, () => v));
  const fs = expanded.length >= 2 ? fiveNumberSummary(expanded) : null;
  const n2 = expanded.length;
  const h2 = Math.floor(n2 / 2);
  const roleOf = (i: number): string => {
    if (n2 % 2 === 1 && i === h2) return 'me';
    return i < h2 ? 'lo' : 'hi';
  };

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="a-dobozdiagram"
      title="3. A dobozdiagram"
      subtitle="Kvartilisek, terjedelem és félterjedelem: hogyan negyedeljük az adatsokaságot, és hogyan készül belőle dobozdiagram?"
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_dobozdiagram_tananyag.pdf"
      practiceTitle="Készen állsz a dobozdiagramokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KVARTILISEK ÉS DOBOZDIAGRAM',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              Q₀ = min ≤ Q₁ ≤ Q₂ = medián ≤ Q₃ ≤ Q₄ = max;  terjedelem = max − min;  félterjedelem = Q₃ − Q₁
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Rendezd növekvő sorrendbe az adatokat, és határozd meg a mediánt!</li>
              <li>
                <strong>Páros</strong> elemszámnál a mediánnal kettéosztjuk az adatokat; <strong>páratlan</strong> elemszámnál a középső elemet elhagyjuk. Q₁ az alsó, Q₃ a felső „fél” mediánja.
              </li>
              <li>A doboz Q₁-től Q₃-ig tart, benne vonal jelzi a mediánt; a vonalak a minimumig és a maximumig érnek.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat: EB */}
      <TheorySection title="1. Kidolgozott feladat: a válogatott sebességei (1. feladat)" badge="Tankönyv 166. o." badgeColor="sky">
        <div className="space-y-4">
          <div className="text-sm text-slate-700 leading-relaxed space-y-2">
            <p>
              A 2021-es labdarúgó-Európa-bajnokságon a magyar csapat 18 játékosának legnagyobb sebességeit (km/h) egy szimulátorprogram négy kategóriába sorolja: a leglassúbb 25% „Lassú”, a következő 25% „Közepes”, aztán „Gyors”, a leggyorsabb 25% „Villám”.
            </p>
            <p className="font-mono text-xs bg-slate-50 rounded-lg p-2 border border-slate-200">
              19,0 23,8 25,0 25,6 26,1 26,3 27,4 28,1 28,8 | 29,0 29,2 29,7 29,9 30,8 31,3 31,5 31,5 33,8
            </p>
          </div>
          <BoxPlotSpeedsSvg />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="a) és b) Közepes és Gyors határa" badge="Megoldás" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  a) A „Közepes” és a „Gyors” határa a <strong>medián</strong>: a 9. és a 10. elem átlaga, (28,8 + 29,0) / 2 = <strong>28,9 km/h</strong>.
                </li>
                <li>
                  b) Az alsó „fél” (9 adat) mediánja az 5. elem: <strong>26,1 km/h</strong>. „Közepes”, akinek a sebessége legalább 26,1 km/h és kisebb, mint 28,9 km/h.
                </li>
              </ul>
            </TheoryCard>
            <TheoryCard title="c) és d) Villám és a kapus" badge="Megoldás" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  c) A felső „fél” mediánja: <strong>30,8 km/h</strong>. „Villám” az ennél gyorsabb: Botka (31,5), Fiola (31,5), Nego (33,8) és Szalai Attila (31,3). A határon lévő Kleinheisler (30,8) besorolása a programtól függ.
                </li>
                <li>d) Gulácsi Péter sebessége a legkisebb (19,0 km/h), mert ő a kapus.</li>
              </ul>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 2. Kvartilisek */}
      <TheorySection title="2. Elmélet: kvartilisek" badge="Elmélet" badgeColor="indigo">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A medián kettéosztja az adatsokaságot. A <strong>kvartilisek</strong> segítségével négy, körülbelül ugyanannyi elemet tartalmazó csoportra bontjuk az adatokat.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Az <strong>alsó kvartilis (Q₁)</strong> az a szám, amelynél az adatoknak (közelítőleg) a negyede kisebb vagy egyenlő.
            </li>
            <li>
              A <strong>felső kvartilis (Q₃)</strong> az a szám, amelynél az adatoknak (közelítőleg) a negyede nagyobb vagy egyenlő.
            </li>
          </ul>
          <TheoryTable
            headers={['Elemszám', 'Adatok', 'Alsó kvartilis', 'Medián', 'Felső kvartilis']}
            rows={[
              ['8 (páros)', '1 2 3 3 | 4 5 6 6', '2,5', '3,5', '5,5'],
              ['9 (páratlan)', '1 2 3 3 (4) 5 5 6 6', '2,5', '4', '5,5'],
              ['10 (páros)', '1 2 3 3 4 | 5 5 6 6 7', '3', '4,5', '6'],
              ['11 (páratlan)', '1 2 3 3 4 (5) 5 6 6 7 8', '3', '5', '6']
            ]}
          />
          <TheoryCallout type="info" title="Páratlan elemszám">
            Csak a középső elemet hagyjuk el. Az előtte álló elemek az „alsó félbe”, a mögötte állók a „felső félbe” kerülnek – azok is, amelyek esetleg egyenlők a mediánnal.
          </TheoryCallout>
          <TheoryCallout type="tip" title="Megjegyzés">
            A kvartilisekre több meghatározás is létezik; a táblázatkezelők (pl. MS Excel) értékei eltérhetnek ettől az eljárástól, de nagy adatsokaságnál a különbség nem számít. Hasonló felosztások a <strong>decilisek</strong> (10%-onként) és a <strong>percentilisek</strong> (1%-onként) – utóbbit használják a védőnők a kisbabák fejlődésének vizsgálatakor.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 3. Terjedelem, félterjedelem, dobozdiagram */}
      <TheorySection title="3. Elmélet: terjedelem, félterjedelem és a dobozdiagram" badge="Elmélet" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Terjedelem:</strong> a legnagyobb és a legkisebb elem különbsége. <strong>Félterjedelem:</strong> Q₃ − Q₁; az elemek (közelítőleg) 50%-a ebbe a sávba esik.
            </p>
            <p>
              A negyedelés öt határát Q₀, Q₁, Q₂, Q₃, Q₄ jelöli (minimum, alsó kvartilis, medián, felső kvartilis, maximum). Ezekből készül a <strong>dobozdiagram</strong> (box-plot diagram, sodrófadiagram): a doboz két széle Q₁ és Q₃, a dobozon belüli vonal a medián, a dobozból kiinduló vonalak a minimumig és a maximumig tartanak.
            </p>
            <TheoryCallout type="warning" title="Vigyázat!">
              A félterjedelem rendszerint <strong>nem</strong> egyenlő a terjedelem felével! A példában a terjedelem 75, a félterjedelem 28.
            </TheoryCallout>
            <p>
              A dobozdiagram lehet vízszintes vagy függőleges is. Ha az adatok nagy része szűk tartományba esik, a félterjedelem kicsi; kiugró adatok esetén a félterjedelem többet mond, mint a terjedelem.
            </p>
          </div>
          <div className="space-y-4">
            <BoxPlotAnatomySvg />
            <BoxPlotExampleSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. Kiugró adat */}
      <TheorySection title="4. Elmélet: kiugró adatok" badge="Elmélet" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Kiugró adat</strong> az, amely az alsó kvartilisnél legalább a félterjedelem másfélszeresével kisebb, illetve a felső kvartilisnél legalább a félterjedelem másfélszeresével nagyobb:
            </p>
            <p className="font-mono text-center bg-rose-50 rounded-lg p-2 border border-rose-200">
              x ≤ Q₁ − 1,5 · (Q₃ − Q₁)  vagy  x ≥ Q₃ + 1,5 · (Q₃ − Q₁)
            </p>
            <p>
              Lehet mérési hiba eredménye, de felhívhatja a figyelmet egy szélsőséges helyzetre is. A dobozdiagramon külön ponttal jelöljük, és ilyenkor a vonalak csak a legkisebb, illetve legnagyobb <strong>nem kiugró</strong> adatig tartanak.
            </p>
          </div>
          <BoxPlotOutlierSvg />
        </div>
      </TheorySection>

      {/* 5. Kidolgozott feladat: gyakorisági táblázat */}
      <TheorySection title="5. Kidolgozott feladat: dobozdiagram gyakorisági táblázatból (2. feladat)" badge="Tankönyv 169. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryTable
              headers={['adat', '4', '5', '7', '8', '10', '12']}
              rows={[['gyakoriság', '1', '2', '1', '4', '2', '1']]}
            />
            <ol className="list-decimal pl-5 space-y-1">
              <li>Minden adatot annyiszor sorolunk fel, amennyi a gyakorisága: 4, 5, 5, 7, 8, 8, 8, 8, 10, 10, 12.</li>
              <li>A minimum 4, a maximum 12. A 11 elem páratlan, a medián a 6. elem: <strong>8</strong> (a második nyolcas).</li>
              <li>A medián előtt 5 elem áll (4, 5, 5, 7, 8): mediánjuk <strong>Q₁ = 5</strong>.</li>
              <li>A medián után 5 elem áll (8, 8, 10, 10, 12): mediánjuk <strong>Q₃ = 10</strong>.</li>
              <li>Jelöljük a számegyenesen az öt értéket, és rajzoljuk meg a dobozt és a vonalakat!</li>
            </ol>
            <TheoryCallout type="info" title="Megjegyzés">
              Az adatokból egyértelműen elkészíthető a dobozdiagram, visszafelé nem: a diagramból nem lehet felsorolni az adatokat. Mivel lehetnek a kvartilisekkel vagy a mediánnal egyenlő adatok, nem igaz pontosan, hogy az adatok negyede kisebb Q₁-nél vagy fele nagyobb a mediánnál.
            </TheoryCallout>
          </div>
          <BoxPlotFrequencySvg />
        </div>
      </TheorySection>

      {/* 6. Rubik */}
      <TheorySection title="6. Tankönyvi feladat: Rubik-kocka-verseny (3. feladat)" badge="Feladat" badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A 2019-es budapesti bajnokság „legkevesebb forgatás” versenyszámának döntőjében 44 eredmény született (a győztes Balog Dávid 21 forgatással). A gyakorisági táblázatból: a 44 elem páros, így a medián a 22. és 23. elem átlaga: <strong>34</strong>. Az alsó 22 elem mediánja (11. és 12. elem átlaga) <strong>Q₁ = 31</strong>, a felső 22 elemé <strong>Q₃ = 40</strong>. Minimum 21, maximum 53.
          </p>
          <p>
            A félterjedelem 9, másfélszerese 13,5. Mivel 31 − 13,5 = 17,5 &lt; 21 és 40 + 13,5 = 53,5 &gt; 53, <strong>nincs kiugró adat</strong>.
          </p>
          <BoxPlotRubikSvg />
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: a félterjedelem nem a terjedelem fele" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi a félterjedelem, ha min = 5, Q₁ = 18, Me = 38, Q₃ = 46, max = 80?"
          wrong="(80 − 5) / 2 = 37,5"
          wrongExplanation="Ez a terjedelem fele, nem a félterjedelem! A név megtévesztő: a félterjedelem a középső „fél” (az adatok kb. 50%-a) terjedelme."
          correct="Q₃ − Q₁ = 46 − 18 = 28"
          correctExplanation="A félterjedelem a doboz szélessége. Kiugró adatokra sem érzékeny, ezért gyakran többet árul el a szóródásról, mint a terjedelem."
          tip="Egy másik gyakori hiba: páratlan elemszámnál a mediánt is beleszámolni a „felekbe”. A középső elemet hagyd el!"
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: húzható adatpontok – élő dobozdiagram" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Húzd vízszintesen a kék pontokat (0 és 30 között), vagy írd be az adatokat pontosvesszővel elválasztva! A dobozdiagram és a mutatók azonnal frissülnek.
          </p>
          <svg
            ref={svgRef}
            viewBox="0 0 600 250"
            className="w-full h-auto touch-none select-none"
            onPointerMove={(e) => {
              if (drag === null) return;
              const v = valueFromEvent(e);
              if (v !== data[drag]) {
                const d = [...data];
                d[drag] = v;
                updateData(d);
              }
            }}
            onPointerUp={() => setDrag(null)}
            onPointerLeave={() => setDrag(null)}
          >
            <rect x="2" y="2" width="596" height="246" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
            {data.map((v, i) => (
              <circle
                key={i}
                cx={sx(v)}
                cy={110 - stackIndex[i] * stackStep}
                r="7.5"
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
            <AxisRow y={132} />
            <LiveBox s={s} y={195} />
            {s.iqr > 0 && (
              <>
                {s.lowFence >= AXIS_MIN && (
                  <line x1={sx(s.lowFence)} y1="165" x2={sx(s.lowFence)} y2="225" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
                )}
                {s.highFence <= AXIS_MAX && (
                  <line x1={sx(s.highFence)} y1="165" x2={sx(s.highFence)} y2="225" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
                )}
              </>
            )}
            <text x="300" y="242" fontSize="11" textAnchor="middle" fill="#64748b">
              szaggatott narancs vonal: a kiugró adatok határa (Q₁ − 1,5 · félterjedelem; Q₃ + 1,5 · félterjedelem)
            </text>
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">adatok (pontosvesszővel elválasztva, 2–40 db, 0 és 30 között)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  const p = parseData(e.target.value);
                  if (p) setData(p);
                }}
                className="w-full px-3 py-2 rounded-lg border border-sky-200 font-mono text-sm"
                aria-label="adatok"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-end">
              <button
                onClick={() => data.length < 40 && updateData([...data, 15])}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
              >
                + új adat (15)
              </button>
              <button
                onClick={() => data.length > 2 && updateData(data.slice(0, -1))}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-800 hover:bg-rose-100"
              >
                − utolsó törlése
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { t: '7 adat', d: [3, 7, 8, 12, 15, 18, 20] },
              { t: 'tankönyvi 11 adat', d: [4, 5, 5, 7, 8, 8, 8, 8, 10, 10, 12] },
              { t: '8 adat (1…6)', d: [1, 2, 3, 3, 4, 5, 6, 6] },
              { t: 'kiugró adatokkal', d: [2, 10, 11, 12, 13, 14, 15, 16, 30] },
              { t: 'szűk középső 50%', d: [1, 12, 13, 13, 14, 14, 15, 29] }
            ].map((p) => (
              <button key={p.t} onClick={() => updateData(p.d)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                {p.t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              ['minimum (Q₀)', fmt(s.min)],
              ['alsó kvartilis (Q₁)', fmt(s.q1)],
              ['medián (Q₂)', fmt(s.me)],
              ['felső kvartilis (Q₃)', fmt(s.q3)],
              ['maximum (Q₄)', fmt(s.max)],
              ['terjedelem', `${fmt(s.max)} − ${fmt(s.min)} = ${fmt(s.range)}`],
              ['félterjedelem', `${fmt(s.q3)} − ${fmt(s.q1)} = ${fmt(s.iqr)}`],
              ['kiugró adat', s.outliers.length ? s.outliers.map(fmt).join('; ') : 'nincs']
            ].map(([k, v]) => (
              <div key={k} className="bg-sky-50 rounded-xl border border-sky-200 p-3">
                <div className="text-xs text-sky-700 font-semibold">{k}</div>
                <div className="font-mono font-bold text-slate-900">{v}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-600">
            Rendezett adatok ({s.n} db, {s.n % 2 ? 'páratlan – a középső elemet elhagyjuk' : 'páros – a mediánnal kettéosztjuk'}): <span className="font-mono">{formatData(data)}</span>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: gyakorisági táblázatból dobozdiagram" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Állítsd be a gyakoriságokat! Látod, ahogyan az adatokat gyakoriságuk szerint felsoroljuk, hol van a medián, melyik az alsó és a felső „fél” – és hogyan változik a dobozdiagram.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {FREQ_VALUES.map((v, i) => (
              <div key={v} className="bg-teal-50 rounded-xl border border-teal-200 p-2 text-center">
                <div className="text-xs text-teal-700 font-semibold">adat: {v}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <button
                    aria-label={`${v} gyakoriság csökkentése`}
                    onClick={() => setFreq(freq.map((f, j) => (j === i ? Math.max(0, f - 1) : f)))}
                    className="w-7 h-7 rounded-lg bg-white border border-teal-300 font-bold text-teal-800"
                  >
                    −
                  </button>
                  <span className="w-6 font-mono font-bold">{freq[i]}</span>
                  <button
                    aria-label={`${v} gyakoriság növelése`}
                    onClick={() => setFreq(freq.map((f, j) => (j === i ? Math.min(6, f + 1) : f)))}
                    className="w-7 h-7 rounded-lg bg-white border border-teal-300 font-bold text-teal-800"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {expanded.map((v, i) => {
              const role = roleOf(i);
              return (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-md font-mono text-sm font-bold border ${
                    role === 'me' ? 'bg-rose-100 border-rose-400 text-rose-800' : role === 'lo' ? 'bg-sky-50 border-sky-300 text-sky-900' : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  {v}
                </span>
              );
            })}
          </div>
          {!fs ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Legalább 2 adat kell a dobozdiagramhoz!</div>
          ) : (
            <>
              <svg viewBox="0 0 600 120" className="w-full h-auto">
                <rect x="2" y="2" width="596" height="116" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
                {(() => {
                  const f0 = (v: number) => 40 + (v / 13) * 520;
                  return (
                    <g>
                      <line x1={f0(fs.min)} y1="45" x2={f0(fs.q1)} y2="45" stroke="#0f766e" strokeWidth="2" />
                      <line x1={f0(fs.q3)} y1="45" x2={f0(fs.max)} y2="45" stroke="#0f766e" strokeWidth="2" />
                      <line x1={f0(fs.min)} y1="35" x2={f0(fs.min)} y2="55" stroke="#0f766e" strokeWidth="2" />
                      <line x1={f0(fs.max)} y1="35" x2={f0(fs.max)} y2="55" stroke="#0f766e" strokeWidth="2" />
                      <rect x={f0(fs.q1)} y="27" width={Math.max(f0(fs.q3) - f0(fs.q1), 1)} height="36" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
                      <line x1={f0(fs.me)} y1="27" x2={f0(fs.me)} y2="63" stroke="#be123c" strokeWidth="3" />
                      <line x1="32" y1="85" x2="568" y2="85" stroke="#475569" strokeWidth="1.5" />
                      {Array.from({ length: 14 }, (_, k) => (
                        <g key={k}>
                          <line x1={f0(k)} y1="81" x2={f0(k)} y2="89" stroke="#475569" />
                          <text x={f0(k)} y="104" fontSize="11" textAnchor="middle" fill="#334155">
                            {k}
                          </text>
                        </g>
                      ))}
                    </g>
                  );
                })()}
              </svg>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-teal-50 rounded-xl border border-teal-200 p-3">
                  <div className="text-xs text-teal-700 font-semibold">elemszám</div>
                  <div className="font-mono font-bold">
                    {n2} ({n2 % 2 ? 'páratlan' : 'páros'})
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl border border-teal-200 p-3">
                  <div className="text-xs text-teal-700 font-semibold">min; Q₁; Me; Q₃; max</div>
                  <div className="font-mono font-bold">
                    {[fs.min, fs.q1, fs.me, fs.q3, fs.max].map(fmt).join('; ')}
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl border border-teal-200 p-3">
                  <div className="text-xs text-teal-700 font-semibold">terjedelem</div>
                  <div className="font-mono font-bold">{fmt(fs.range)}</div>
                </div>
                <div className="bg-teal-50 rounded-xl border border-teal-200 p-3">
                  <div className="text-xs text-teal-700 font-semibold">félterjedelem</div>
                  <div className="font-mono font-bold">{fmt(fs.iqr)}</div>
                </div>
              </div>
            </>
          )}
          <TheoryCallout type="tip" title="Színek">
            Kék: alsó „fél” (ennek mediánja Q₁), sárga: felső „fél” (ennek mediánja Q₃), piros: a középső elem páratlan elemszámnál (ez a medián, egyik félbe sem kerül).
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default BoxPlotTheory;
