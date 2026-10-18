import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Square,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  Scissors,
  Fence,
  Home,
  RotateCcw
} from 'lucide-react';

export interface PerimeterTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const PerimeterTheory: React.FC<PerimeterTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Kerület Laboratórium Állapotok ---
  const [shapeMode, setShapeMode] = useState<'rectangle' | 'square'>('rectangle');
  const [sideA, setSideA] = useState<number>(7);
  const [sideB, setSideB] = useState<number>(4);
  const [unit, setUnit] = useState<'cm' | 'm' | 'dm' | 'mm'>('cm');

  const actualA = sideA;
  const actualB = shapeMode === 'square' ? sideA : sideB;

  const perimeter = shapeMode === 'square' ? 4 * actualA : 2 * (actualA + actualB);
  const semiPerimeter = actualA + actualB;

  return (
    <TheoryTemplate
      documentId="grade-5-perimeter-theory"
      pdfFilename="5_osztaly_IV_2_teglalap_negyzet_kerulete.pdf"
      title="Téglalap és négyzet kerülete"
      subtitle="A kerület fogalma, a határoló szakaszok összege, a négyzet és téglalap kerületképletei, visszafelé számolás és mindennapi gyakorlati példák"
      themeColor="emerald"
      emoji="📐"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 2. TANANYAG"
      quickRule={{
        label: 'A fejezet alapszabálya',
        formula: 'Négyzet: K = 4 · a \\quad | \\quad Téglalap: K = 2 · (a + b)'
      }}
      practiceTitle="Készen állsz a kerületszámítás gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A KERÜLET FOGALMA */}
      <TheorySection
        id="fogalom"
        title="1. Mi a kerület? A körbekerítés fogalma"
        subtitle="A síkidomot határoló szakaszok együttes hossza"
        badge="ALAPFOGALOM"
      >
        <TheoryCard title="Hogyan képzeld el a kerületet?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy síkidom <strong>kerülete (jele: K)</strong> a síkidomot körülvevő határoló vonalak (oldalak) együttes hossza.
            Képzeld el úgy, mintha egy zárt telek köré <strong>kerítést</strong> építenél, vagy a körvonalán végigsétálva megszámolnád a lépéseidet!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-1">
                A kerület jele
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                K
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                A magyar „kerület” szó kezdőbetűje.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/80 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 block mb-1">
                Mértékegysége
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                mm, cm, dm, m, km
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Mindig normál hosszúságmérték, nem területmérték!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-slate-800/80 border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">
                Kiszámításának elve
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                Oldalak összege
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Összeadjuk a határoló szakaszok hosszát.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <strong>Kifeszített fonal hasonlat:</strong> Ha a síkidom körvonala mentén végigfektetnél egy fonalat, majd a két végét megfogva egyenes vonallá feszítenéd ki, a fonal teljes hossza pontosan a síkidom kerülete lenne!
          </div>

          {/* Vizuális kerület-diagram: A határvonal körbejárása */}
          <div className="my-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-[420px] h-32 mx-auto" viewBox="0 0 320 110">
              {/* Telek / Kert alap */}
              <rect x="30" y="20" width="260" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="6 3" />
              {/* Belső mező */}
              <text x="160" y="52" textAnchor="middle" className="text-xs font-black fill-emerald-800 dark:fill-emerald-300">
                KERÜLET (K) = A határoló vonal körben
              </text>
              <text x="160" y="68" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">
                K = a + b + a + b = 2 · (a + b)
              </text>
              {/* Oldalcímkék és nyilak */}
              <text x="160" y="14" textAnchor="middle" className="text-[11px] font-black fill-blue-600">a oldal (hosszúság)</text>
              <text x="160" y="103" textAnchor="middle" className="text-[11px] font-black fill-blue-600">a oldal (hosszúság)</text>
              <text x="16" y="58" textAnchor="middle" className="text-[11px] font-black fill-emerald-600" transform="rotate(-90 16 58)">b oldal</text>
              <text x="304" y="58" textAnchor="middle" className="text-[11px] font-black fill-emerald-600" transform="rotate(90 304 58)">b oldal</text>
              {/* Nyilak a körbejárás irányához */}
              <circle cx="30" cy="20" r="4" fill="#16a34a" />
              <polygon points="170,18 160,14 160,22" fill="#2563eb" />
              <polygon points="150,92 160,88 160,96" fill="#2563eb" />
            </svg>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A NÉGYZET KERÜLETE */}
      <TheorySection
        id="negyzet"
        title="2. A négyzet kerülete"
        subtitle="Négy egyenlő oldal összege: K = 4 · a"
        badge="NÉGYZET"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Képlet és levezetés">
            <div className="p-2 mb-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
                <rect x="15" y="15" width="70" height="70" rx="3" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
                {/* 4 tick mark az egyenlő oldalakra */}
                <line x1="50" y1="11" x2="50" y2="19" stroke="#059669" strokeWidth="2" />
                <line x1="50" y1="81" x2="50" y2="89" stroke="#059669" strokeWidth="2" />
                <line x1="11" y1="50" x2="19" y2="50" stroke="#059669" strokeWidth="2" />
                <line x1="81" y1="50" x2="89" y2="50" stroke="#059669" strokeWidth="2" />
                <text x="50" y="11" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">a</text>
                <text x="50" y="97" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">a</text>
                <text x="8" y="53" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">a</text>
                <text x="94" y="53" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">a</text>
                <text x="50" y="54" textAnchor="middle" className="text-xs font-black fill-emerald-950">K = 4 · a</text>
              </svg>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
              A <strong>négyzet</strong> olyan négyszög, amelynek mind a 4 oldala egyenlő hosszú (mindegyik hossza „a”), és minden szöge derékszög.
            </p>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-sm mb-3">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">
                Kerületképlet:
              </div>
              <div className="text-lg font-mono font-black text-emerald-700 dark:text-emerald-300">
                K = a + a + a + a = 4 · a
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Egyszerűen négyszer vesszük az oldal hosszát!
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Példák:</span>
              <p>• Ha a = 6 cm → K = 4 · 6 cm = <strong>24 cm</strong></p>
              <p>• Ha a = 12 m → K = 4 · 12 m = <strong>48 m</strong></p>
              <p>• Ha a = 2,5 dm → K = 4 · 2,5 dm = <strong>10 dm</strong></p>
            </div>
          </TheoryCard>

          <TheoryCard title="Visszafelé számolás: Ha a kerületet ismerjük">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
              Gyakran előfordul, hogy a kerületet már tudjuk (például van 28 méter drótkerítésünk), és azt kérdezik, mekkora lehet a négyzet egy oldala.
            </p>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-1.5 text-sm mb-3">
              <div className="font-bold text-teal-900 dark:text-teal-200">
                Oldal kiszámítása a kerületből:
              </div>
              <div className="text-lg font-mono font-black text-teal-700 dark:text-teal-300">
                a = K : 4
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Mivel a kerület 4 egyenlő oldalból áll, a kerületet 4-gyel osztjuk el!
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Példa visszafelé:</span>
              <p>• Egy négyzet kerülete K = 36 cm. Mekkora az oldala?</p>
              <p className="font-bold text-teal-700 dark:text-teal-300">a = 36 cm : 4 = 9 cm</p>
              <p>• Ellenőrzés: 4 · 9 cm = 36 cm. Helyes!</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: A TÉGLALAP KERÜLETE */}
      <TheorySection
        id="teglalap"
        title="3. A téglalap kerülete és a félkerület"
        subtitle="Két szomszédos oldal duplázása: K = 2 · (a + b)"
        badge="TÉGLALAP"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Képletek és levezetés">
            <div className="p-2 mb-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <svg className="w-44 h-28 mx-auto" viewBox="0 0 160 90">
                <rect x="25" y="15" width="110" height="60" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
                {/* a oldalak (kék) és b oldalak (zöld) */}
                <line x1="25" y1="15" x2="135" y2="15" stroke="#2563eb" strokeWidth="3" />
                <line x1="25" y1="75" x2="135" y2="75" stroke="#2563eb" strokeWidth="3" />
                <line x1="25" y1="15" x2="25" y2="75" stroke="#16a34a" strokeWidth="3" />
                <line x1="135" y1="15" x2="135" y2="75" stroke="#16a34a" strokeWidth="3" />
                <text x="80" y="11" textAnchor="middle" className="text-[10px] font-black fill-blue-700">a (hosszúság)</text>
                <text x="80" y="86" textAnchor="middle" className="text-[10px] font-black fill-blue-700">a (hosszúság)</text>
                <text x="14" y="49" textAnchor="middle" className="text-[10px] font-black fill-emerald-700" transform="rotate(-90 14 49)">b</text>
                <text x="146" y="49" textAnchor="middle" className="text-[10px] font-black fill-emerald-700" transform="rotate(90 146 49)">b</text>
                <text x="80" y="49" textAnchor="middle" className="text-xs font-black fill-slate-900">K = 2 · (a + b)</text>
              </svg>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
              A <strong>téglalap</strong> szemközti oldalai párhuzamosak és egyenlő hosszúak: két darab „a” oldala (hosszúság) és két darab „b” oldala (szélesség) van.
            </p>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5 text-sm mb-3">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">
                A téglalap kerületének 3 egyenértékű alakja:
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p>1. Összeadás: <span className="font-mono font-bold">K = a + b + a + b</span></p>
                <p>2. Tagolva: <span className="font-mono font-bold">K = 2 · a + 2 · b</span></p>
                <p>3. Kiemelve (leggyorsabb): <span className="font-mono font-black text-base text-emerald-700 dark:text-emerald-300">K = 2 · (a + b)</span></p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              A zárójeles alakot érdemes megjegyezni: <strong>összeadjuk a két szomszédos oldalt, és az eredményt megduplázzuk!</strong>
            </p>
          </TheoryCard>

          <TheoryCard title="A félkerület és a hiányzó oldal keresése">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-3">
              Ha egy téglalap kerületét és az egyik oldalát ismerjük, hogyan tudjuk meg a másik oldalt?
            </p>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-1.5 text-sm mb-3">
              <div className="font-bold text-teal-900 dark:text-teal-200">
                1. Lépés: Kiszámítjuk a félkerületet!
              </div>
              <div className="text-sm font-mono font-bold text-teal-800 dark:text-teal-300">
                a + b = K : 2
              </div>
              <div className="font-bold text-teal-900 dark:text-teal-200 pt-1">
                2. Lépés: Kivonjuk az ismert oldalt!
              </div>
              <div className="text-sm font-mono font-bold text-teal-800 dark:text-teal-300">
                b = (K : 2) - a
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Mintapélda:</span>
              <p>Egy téglalap kerülete K = 30 cm, egyik oldala a = 9 cm. Mennyi a b oldal?</p>
              <p>1. Félkerület: 30 : 2 = 15 cm (ennyi az a + b összege).</p>
              <p>2. Másik oldal: b = 15 - 9 = <strong>6 cm</strong>.</p>
              <p className="text-slate-500">Ellenőrzés: 2 · (9 + 6) = 2 · 15 = 30 cm. Tökéletes!</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: INTERAKTÍV KERÜLET LABORATÓRIUM ÉS VIZUALIZÁLÓ */}
      <TheorySection
        id="laboratorium"
        title="4. Interaktív Kerület Laboratórium és Alakzat Vizualizáló"
        subtitle="Állítsd be az oldalakat csúszkákkal, és figyeld meg az arányos rajzot, a félkerületet és a fonal-kiterítést!"
        badge="INTERAKTÍV"
      >
        <TheoryCard title="Dinamikus Alakzat és Kerület Kalkulátor">
          {/* Módválasztó és beállítások */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-emerald-50/60 dark:bg-slate-800/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Alakzat:</span>
              <div className="flex bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setShapeMode('rectangle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    shapeMode === 'rectangle'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black'
                  }`}
                >
                  Téglalap
                </button>
                <button
                  onClick={() => setShapeMode('square')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                    shapeMode === 'square'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black'
                  }`}
                >
                  Négyzet
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Egység:</span>
              <div className="flex gap-1">
                {(['mm', 'cm', 'dm', 'm'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      unit === u
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {shapeMode === 'square' ? 'Oldal (a):' : 'Hosszúság (a oldal):'}
                </span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {actualA} {unit}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                value={sideA}
                onChange={(e) => setSideA(parseInt(e.target.value) || 2)}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {shapeMode === 'rectangle' && (
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Szélesség (b oldal):
                  </span>
                  <span className="text-sm font-black text-teal-600 dark:text-teal-400">
                    {actualB} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={sideB}
                  onChange={(e) => setSideB(parseInt(e.target.value) || 1)}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Dinamikus SVG Rajz & Élő Levezetés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* SVG Alakzat Rajz */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
              <svg className="w-full max-w-[280px] h-[170px]" viewBox="0 0 280 170">
                {(() => {
                  const maxDim = Math.max(actualA, actualB);
                  const scale = Math.min(180 / maxDim, 100 / maxDim);
                  const w = actualA * scale;
                  const h = actualB * scale;
                  const x = (280 - w) / 2;
                  const y = (170 - h) / 2;

                  return (
                    <g>
                      {/* Belső kitöltés és körvonal */}
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx="6"
                        className="fill-emerald-100/60 dark:fill-emerald-950/40 stroke-emerald-600 dark:stroke-emerald-400"
                        strokeWidth="3"
                        strokeDasharray="none"
                      />

                      {/* Derékszög jelek a sarkokban */}
                      <path
                        d={`M ${x} ${y + 12} L ${x + 12} ${y + 12} L ${x + 12} ${y}`}
                        fill="none"
                        className="stroke-emerald-500"
                        strokeWidth="1.5"
                      />
                      <circle cx={x + 5} cy={y + 5} r="1.5" className="fill-emerald-600" />

                      {/* Felső felirat: a oldal */}
                      <text
                        x={x + w / 2}
                        y={y - 8}
                        textAnchor="middle"
                        className="text-xs font-black fill-emerald-700 dark:fill-emerald-300"
                      >
                        a = {actualA} {unit}
                      </text>

                      {/* Jobb oldali felirat: b oldal */}
                      <text
                        x={x + w + 10}
                        y={y + h / 2 + 4}
                        textAnchor="start"
                        className="text-xs font-black fill-teal-700 dark:fill-teal-300"
                      >
                        {shapeMode === 'square' ? `a = ${actualA} ${unit}` : `b = ${actualB} ${unit}`}
                      </text>

                      {/* Alsó felirat: a oldal */}
                      <text
                        x={x + w / 2}
                        y={y + h + 18}
                        textAnchor="middle"
                        className="text-xs font-bold fill-slate-400"
                      >
                        a = {actualA} {unit}
                      </text>

                      {/* Bal oldali felirat: b oldal */}
                      <text
                        x={x - 10}
                        y={y + h / 2 + 4}
                        textAnchor="end"
                        className="text-xs font-bold fill-slate-400"
                      >
                        {shapeMode === 'square' ? `${actualA} ${unit}` : `${actualB} ${unit}`}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Számítási Eredménykártya */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs uppercase font-extrabold text-emerald-700 dark:text-emerald-400 block mb-1">
                  A kerület pontos értéke:
                </span>
                <div className="text-3xl font-black text-emerald-800 dark:text-emerald-200">
                  K = {perimeter} {unit}
                </div>
              </div>

              {/* Részletes levezetés */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Lépésről lépésre:</span>
                {shapeMode === 'square' ? (
                  <>
                    <p>• Képlet: <span className="font-mono font-bold">K = 4 · a</span></p>
                    <p>• Behelyettesítés: <span className="font-mono font-bold">K = 4 · {actualA} {unit}</span></p>
                    <p>• Eredmény: <span className="font-bold text-emerald-700 dark:text-emerald-300">K = {perimeter} {unit}</span></p>
                  </>
                ) : (
                  <>
                    <p>• Félkerület (két szomszédos oldal összege): <span className="font-mono font-bold">a + b = {actualA} + {actualB} = {semiPerimeter} {unit}</span></p>
                    <p>• Duplázás: <span className="font-mono font-bold">K = 2 · ({actualA} + {actualB}) = 2 · {semiPerimeter} = {perimeter} {unit}</span></p>
                    <p>• Összeadásként: <span className="font-mono font-bold">{actualA} + {actualB} + {actualA} + {actualB} = {perimeter} {unit}</span></p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Kiterített fonal vizualizáció */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Kiterített vonal (a 4 szakasz egymás után illesztve):
            </span>
            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              <div className="flex items-center min-w-[320px] h-9 gap-1 text-xs font-bold text-white text-center">
                <div
                  style={{ flex: actualA }}
                  className="bg-emerald-600 rounded-md py-1 flex items-center justify-center truncate px-1 shadow-2xs"
                  title={`a = ${actualA} ${unit}`}
                >
                  a ({actualA})
                </div>
                <div
                  style={{ flex: actualB }}
                  className="bg-teal-600 rounded-md py-1 flex items-center justify-center truncate px-1 shadow-2xs"
                  title={`b = ${actualB} ${unit}`}
                >
                  {shapeMode === 'square' ? `a (${actualA})` : `b (${actualB})`}
                </div>
                <div
                  style={{ flex: actualA }}
                  className="bg-emerald-600 rounded-md py-1 flex items-center justify-center truncate px-1 shadow-2xs"
                  title={`a = ${actualA} ${unit}`}
                >
                  a ({actualA})
                </div>
                <div
                  style={{ flex: actualB }}
                  className="bg-teal-600 rounded-md py-1 flex items-center justify-center truncate px-1 shadow-2xs"
                  title={`b = ${actualB} ${unit}`}
                >
                  {shapeMode === 'square' ? `a (${actualA})` : `b (${actualB})`}
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1 px-1">
                <span>0</span>
                <span>Teljes hossz: K = {perimeter} {unit}</span>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYAKORLATI ALKALMAZÁSOK ÉS ÉRDEKESSÉGEK */}
      <TheorySection
        id="gyakorlat"
        title="5. Kerületszámítás a való életben"
        subtitle="Mikor van szükségünk a kerületre a mindennapokban?"
        badge="GYAKORLAT"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold mb-2">
              🏡
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Telek bekerítése</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Kerítésépítéskor a telek körvonalát kell körbeérni dróthálóval vagy lécekkel. A kapu szélességét le kell vonni!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold mb-2">
              🪵
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Szegélylécezés</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Parkettázás után a fal tövébe szegélylécet raknak. A szoba kerületéből az ajtónyílások szélességét vonják le.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold mb-2">
              🖼️
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Képkeretezés</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy festmény vagy fénykép bekeretezéséhez a faléc szükséges hossza pontosan a kép kerülete plusz a sarkok illesztése.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-700 dark:text-rose-300 font-bold mb-2">
              🏃
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-1">Futópálya és sport</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Focipálya vagy tornaterem körbefutásakor egy teljes kör hossza a pálya kerületével egyenlő (pl. 105 × 68 m pálya = 346 m körönként).
            </p>
          </div>
        </div>

        {/* Az érdekes L-alakú kivágás trükk */}
        <TheoryCallout
          variant="tip"
          title="Lenyűgöző geometriai trükk: Az L-alakú kivágás rejtélye"
          icon={<Scissors className="w-5 h-5" />}
        >
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p>
              Képzelj el egy <strong>6 méter × 4 méteres</strong> téglalapot (kerülete: 2 · (6 + 4) = <strong>20 méter</strong>).
              Most vágjunk ki az egyik sarkából egy <strong>2 méter × 1 méteres</strong> kis téglalapot!
            </p>
            <p className="font-bold text-amber-800 dark:text-amber-300">
              Kérdés: Kisebb lett az új alakzat kerülete?
            </p>
            <p>
              <strong>Válasz: NEM! A kerület pontosan ugyanúgy 20 méter maradt!</strong>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Miért? Mert a sarokból kiesett egy vízszintes és egy függőleges szakasz, de a vágás mentén pontosan ugyanakkora új belső vízszintes és függőleges szakasz keletkezett! A körvonal teljes hossza így nem változott.
            </p>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        id="csapdak"
        title="6. Tipikus hibák és csapdák a kerületszámításban"
        subtitle="Mire figyelj nagyon a dolgozatban és a feladatmegoldásnál?"
        badge="CSAPDÁK"
      >
        <TheoryTrapBox
          traps={[
            {
              title: 'Csapda: Eltérő mértékegységek összeadása átváltás nélkül',
              mistake: 'a = 3 dm és b = 15 cm esetén K = 2 · (3 + 15) = 36 felírása.',
              correction: 'Először kötelező azonos mértékegységre váltani! 3 dm = 30 cm, így a félkerület 30 + 15 = 45 cm, a kerület pedig 2 · 45 = 90 cm.',
              tip: 'Mindig ellenőrizd az oldalméretek betűjelét (mm, cm, dm, m) a számolás előtt!'
            },
            {
              title: 'Csapda: Kerület és terület összekeverése',
              mistake: 'A négyzet kerületére 6 cm oldal esetén 6 · 6 = 36 cm² számítása.',
              correction: 'A kerület a határoló vonal hossza (4 · a = 24 cm), a terület pedig a belső sík felülete (a · a = 36 cm²). A kerület mértékegysége sima cm, sosem négyzetcentiméter!',
              tip: 'Kerület = vonal, kerítés (K = 4a, cm-ben). Terület = csempe, fű (T = a², cm²-ben).'
            },
            {
              title: 'Csapda: A zárójel elhagyása a téglalap képletében',
              mistake: 'K = 2 · a + b kiszámítása a 2 · (a + b) helyett.',
              correction: 'Mindkét oldalból KETTŐ darab van a téglalapban! Ha nem teszel zárójelet, csak az „a” oldalt duplázod meg. Helyesen: 2 · (a + b) vagy 2 · a + 2 · b.',
              tip: 'Először add össze a két szomszédos oldalt (félkerület), és csak utána szorozz kettővel!'
            },
            {
              title: 'Csapda: Két alakzat összetolásakor a kerületek összeadása',
              mistake: 'Két 5 cm-es négyzet összetolásakor K = 20 + 20 = 40 cm felírása.',
              correction: 'Amikor két négyzetet egymáshoz illesztünk, a két belső érintkező él bekerül a síkidom belsejébe, így már NEM része a körvonalnak! Az új téglalap 10 cm × 5 cm-es, kerülete 2 · (10 + 5) = 30 cm.',
              tip: 'Mindig rajzold le az összetett alakzatot, és csak a külső éleket számold bele a kerületbe!'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PerimeterTheory;
