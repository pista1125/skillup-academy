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
  Layout,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  Grid,
  Layers,
  MapPin,
  Trees,
  Compass,
  ArrowRightLeft
} from 'lucide-react';

export interface AreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

// Terület mértékegységek adatai a laboratóriumhoz (m²-hez viszonyított szorzó)
const AREA_UNITS = [
  { id: 'mm2', name: 'Négyzetmilliméter', symbol: 'mm²', factorToM2: 0.000001, desc: 'Pici felületek, pl. tű hegye, bélyegfogazat' },
  { id: 'cm2', name: 'Négyzetcentiméter', symbol: 'cm²', factorToM2: 0.0001, desc: 'Kisebb tárgyak, pl. füzetlap, bankkártya, telefon' },
  { id: 'dm2', name: 'Négyzetdeciméter', symbol: 'dm²', factorToM2: 0.01, desc: 'Közepes tárgyak, pl. tányéralátét, cipősdoboz teteje' },
  { id: 'm2', name: 'Négyzetméter (alapegység)', symbol: 'm²', factorToM2: 1, desc: 'Szoba, tanterem padlója, szőnyeg, falak' },
  { id: 'a', name: 'Ár (100 m²)', symbol: 'a', factorToM2: 100, desc: 'Konyhakertek, családi házas telkek' },
  { id: 'ha', name: 'Hektár (10 000 m²)', symbol: 'ha', factorToM2: 10000, desc: 'Focipályák, szántóföldek, erdők' },
  { id: 'km2', name: 'Négyzetkilométer', symbol: 'km²', factorToM2: 1000000, desc: 'Települések, Balaton, országok területe' }
];

export const AreaTheory: React.FC<AreaTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Terület Laboratórium Állapotok ---
  const [labValue, setLabValue] = useState<number>(5);
  const [labUnit, setLabUnit] = useState<string>('m2');

  // Kiválasztott egység értéke m²-ben
  const selectedUnitObj = AREA_UNITS.find(u => u.id === labUnit) || AREA_UNITS[3];
  const valueInM2 = labValue * selectedUnitObj.factorToM2;

  // Vizuális rács állapot (1 dm² = 100 cm²)
  const [activeCellCount, setActiveCellCount] = useState<number>(25);

  return (
    <TheoryTemplate
      documentId="grade-5-area-theory"
      pdfFilename="5_osztaly_IV_3_a_terulet_merese.pdf"
      title="A terület mérése és mértékegységei"
      subtitle="A terület fogalma, síkidomok lefedése egységnégyzetekkel, a négyzetméter és származtatott egységei (mm², cm², dm², m², a, ha, km²), a 100-as váltószám logikája és mindennapi becslések"
      themeColor="amber"
      emoji="🔲"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 3. TANANYAG"
      quickRule={{
        label: 'A fejezet aranyszabálya',
        formula: '1 \\text{ m}^2 = 100 \\text{ dm}^2 = 10\\,000 \\text{ cm}^2 \\quad | \\quad 1 \\text{ a} = 100 \\text{ m}^2 \\quad | \\quad 1 \\text{ ha} = 100 \\text{ a} = 10\\,000 \\text{ m}^2'
      }}
      practiceTitle="Készen állsz a területmértékek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A TERÜLET FOGALMA */}
      <TheorySection
        id="fogalom"
        title="1. Mi a terület? A síkidom kiterjedése és lefedése"
        subtitle="A felület nagyságának mérése hézagmentes egységnégyzetekkel"
        badge="ALAPFOGALOM"
      >
        <TheoryCard title="Hogyan képzeld el a területet?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy síkidom <strong>területe (jele: T)</strong> azt fejezi ki, hogy mekkora a síkidom által elfoglalt felület a síkban.
            Gondolj úgy a területre, mint a <strong>szoba parkettázására vagy járólapozására</strong>: hány egybevágó kis négyzetlapra van szükségünk ahhoz, hogy a felületet rések (hézagok) és átfedések nélkül teljesen befedjük!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-amber-600 dark:text-amber-400 block mb-1">
                A terület jele
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                T
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                A magyar „terület” szó kezdőbetűje.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-orange-50/80 dark:bg-slate-800/80 border border-orange-200 dark:border-orange-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-orange-600 dark:text-orange-400 block mb-1">
                Mértékegysége
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                mm², cm², dm², m²
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Négyzettel jelölt (² kiteszős) egységek.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-yellow-50/80 dark:bg-slate-800/80 border border-yellow-200 dark:border-yellow-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-yellow-600 dark:text-yellow-400 block mb-1">
                Lefedési alapelv
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                Egységnégyzet
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Hézagmentes lefedés átfedések nélkül.
              </p>
            </div>
          </div>
        </TheoryCard>

        <TheoryCallout
          type="info"
          title="Kerület vagy Terület? A legfontosabb különbség!"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-1">
                <span className="text-lg">📏</span> Kerület (K) — Hosszúság
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A körvonal hossza. Képzeld el a kert köré vont <strong>drótkerítésként</strong>! Egysége: sima hosszúság (mm, cm, dm, m, km).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-1">
                <span className="text-lg">🟩</span> Terület (T) — Kiterjedés
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A belső síkfelület nagysága. Képzeld el a kert <strong>fűvel való bevetéseként vagy lekövezéseként</strong>! Egysége: négyzetes (mm², cm², dm², m²).
              </p>
            </div>
          </div>

          {/* Vizuális összehasonlító grafika: Kerület vs Terület */}
          <div className="mt-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-[460px] h-32 mx-auto" viewBox="0 0 400 110">
              {/* Bal: Kerület */}
              <g transform="translate(20, 15)">
                <rect x="0" y="0" width="160" height="70" rx="4" fill="#f8fafc" stroke="#dc2626" strokeWidth="3" strokeDasharray="6 3" />
                <text x="80" y="32" textAnchor="middle" className="text-xs font-black fill-rose-700 dark:fill-rose-400">KERÜLET (K)</text>
                <text x="80" y="48" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">Határvonal: 2 · (a + b)</text>
                <text x="80" y="62" textAnchor="middle" className="text-[9px] font-bold fill-rose-600">Egysége: m, cm (1D)</text>
                <text x="80" y="-4" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">a</text>
                <text x="-6" y="38" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">b</text>
              </g>

              {/* Jobb: Terület */}
              <g transform="translate(220, 15)">
                <rect x="0" y="0" width="160" height="70" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                {/* Belső rácsozás mintázata */}
                <line x1="40" y1="0" x2="40" y2="70" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="80" y1="0" x2="80" y2="70" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="120" y1="0" x2="120" y2="70" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="35" x2="160" y2="35" stroke="#86efac" strokeWidth="1" strokeDasharray="2 2" />
                <text x="80" y="32" textAnchor="middle" className="text-xs font-black fill-emerald-800 dark:fill-emerald-300">TERÜLET (T)</text>
                <text x="80" y="48" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">Lefedett felület: a · b</text>
                <text x="80" y="62" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">Egysége: m², cm² (2D)</text>
                <text x="80" y="-4" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">a</text>
                <text x="-6" y="38" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">b</text>
              </g>
            </svg>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: ALAPMÉRTÉKEGYSÉG ÉS KISEBB EGYSÉGEK */}
      <TheorySection
        id="egysegek-kicsik"
        title="2. A négyzetméter és a kisebb mértékegységek"
        subtitle="Az 1 m² és törtrészei: négyzetdeciméter, négyzetcentiméter, négyzetmilliméter"
        badge="METRIKUS RENDSZER"
      >
        <TheoryCard title="Az alapegység: a négyzetméter (1 m²)">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A terület alapvető nemzetközi mértékegysége a <strong>négyzetméter (jele: m²)</strong>.
            Egy négyzetméter akkora terület, mint egy olyan négyzet területe, amelynek minden oldala pontosan <strong>1 méter</strong> hosszú.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <strong>Gyakorlati példa:</strong> Egy szabványos kétszemélyes íróasztal vagy egy nagyobb ablak felülete hozzávetőleg 1 m² nagyságú.
          </div>
        </TheoryCard>

        <TheoryTable
          headers={['Mértékegység', 'Jele', 'Mit jelent?', 'Hány alapegység?']}
          rows={[
            [
              <strong key="mm2">Négyzetmilliméter</strong>,
              <code key="s-mm2" className="text-amber-700 dark:text-amber-300 font-bold">mm²</code>,
              '1 mm oldalú négyzet területe (pl. apró csavarfej, bogár szárnya)',
              '1 cm² = 100 mm²'
            ],
            [
              <strong key="cm2">Négyzetcentiméter</strong>,
              <code key="s-cm2" className="text-amber-700 dark:text-amber-300 font-bold">cm²</code>,
              '1 cm oldalú négyzet területe (pl. egy kockás füzet 4 kis négyzete együtt)',
              '1 dm² = 100 cm²'
            ],
            [
              <strong key="dm2">Négyzetdeciméter</strong>,
              <code key="s-dm2" className="text-amber-700 dark:text-amber-300 font-bold">dm²</code>,
              '10 cm × 10 cm oldalú négyzet területe (pl. tenyérnyi felület, CD tok)',
              '1 m² = 100 dm²'
            ],
            [
              <strong key="m2">Négyzetméter</strong>,
              <code key="s-m2" className="text-amber-700 dark:text-amber-300 font-bold">m²</code>,
              '1 m oldalú négyzet területe (pl. heverő, íróasztal lapja, bejárati ajtó)',
              'A terület alapegysége'
            ]
          ]}
        />
      </TheorySection>

      {/* 3. SZEKCIÓ: MEZŐGAZDASÁGI ÉS NAGYOBB EGYSÉGEK */}
      <TheorySection
        id="egysegek-nagyok"
        title="3. Mezőgazdasági és nagyobb területegységek"
        subtitle="Az ár (a), a hektár (ha) és a négyzetkilométer (km²)"
        badge="FÖLDTERÜLETEK"
      >
        <TheoryCard title="Miért van szükség különleges egységekre?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Amikor egy telket, szántóföldet, erdőt vagy egész országot mérünk, a négyzetméter túlságosan pici lenne (túl sok nulla szerepelne a számokban). Ezért a mezőgazdaságban és földmérésben két nagyon fontos köztes mértékegységet használunk: az <strong>árt</strong> és a <strong>hektárt</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Ár (jele: a)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Egy olyan négyzet területe, melynek oldala <strong>10 méter</strong>.
              </p>
              <div className="text-sm font-mono font-black text-amber-700 dark:text-amber-300 bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-amber-200 dark:border-amber-700 text-center">
                1 a = 100 m²
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Gyakorlatban: Egy átlagos családi ház kertje 6-10 ár nagyságú (600 - 1000 m²).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-orange-50/70 dark:bg-slate-800/80 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-2 mb-2">
                <Trees className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Hektár (jele: ha)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Egy olyan négyzet területe, melynek oldala <strong>100 méter</strong>.
              </p>
              <div className="text-sm font-mono font-black text-orange-700 dark:text-orange-300 bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-orange-200 dark:border-orange-700 text-center">
                1 ha = 100 a = 10 000 m²
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Gyakorlatban: Egy szabályos focipálya területe kb. 0,7 hektár (7000 m²).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-yellow-50/70 dark:bg-slate-800/80 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-bold text-slate-800 dark:text-slate-100">Négyzetkilométer (km²)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Egy olyan négyzet területe, melynek oldala <strong>1 kilométer (1000 m)</strong>.
              </p>
              <div className="text-sm font-mono font-black text-yellow-700 dark:text-yellow-300 bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-yellow-200 dark:border-yellow-700 text-center">
                1 km² = 100 ha = 1 000 000 m²
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                Gyakorlatban: A Balaton vízfelülete kb. 592 km², Magyarország területe kb. 93 030 km².
              </p>
            </div>
          </div>

          {/* Vizuális mezőgazdasági méretarány-diagram */}
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-[480px] h-32 mx-auto" viewBox="0 0 440 110">
              {/* 1 m² */}
              <g transform="translate(15, 60)">
                <rect width="25" height="25" rx="2" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                <text x="12.5" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-700 dark:fill-slate-300">1 m²</text>
              </g>

              {/* 1 ár (100 m²) */}
              <g transform="translate(70, 35)">
                <rect width="50" height="50" rx="3" fill="#fde68a" stroke="#d97706" strokeWidth="1.8" />
                <text x="25" y="28" textAnchor="middle" className="text-[9px] font-black fill-amber-900">1 ár</text>
                <text x="25" y="40" textAnchor="middle" className="text-[8px] font-bold fill-amber-800">100 m²</text>
                <text x="25" y="63" textAnchor="middle" className="text-[8px] font-bold fill-slate-700 dark:fill-slate-300">10m × 10m</text>
              </g>

              {/* Nyíl 100x */}
              <text x="145" y="62" textAnchor="middle" className="text-[10px] font-black fill-slate-400">· 100 ➔</text>

              {/* 1 hektár (10 000 m²) */}
              <g transform="translate(185, 10)">
                <rect width="100" height="75" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                <text x="50" y="36" textAnchor="middle" className="text-xs font-black fill-emerald-900">1 hektár (ha)</text>
                <text x="50" y="52" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">10 000 m² = 100 ár</text>
                <text x="50" y="90" textAnchor="middle" className="text-[8px] font-bold fill-slate-700 dark:fill-slate-300">100m × 100m (pl. focipálya)</text>
              </g>

              {/* Nyíl 100x */}
              <text x="315" y="62" textAnchor="middle" className="text-[10px] font-black fill-slate-400">· 100 ➔</text>

              {/* 1 km² */}
              <g transform="translate(345, 10)">
                <rect width="80" height="75" rx="4" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
                <text x="40" y="36" textAnchor="middle" className="text-xs font-black fill-indigo-900">1 km²</text>
                <text x="40" y="52" textAnchor="middle" className="text-[9px] font-bold fill-indigo-800">100 hektár</text>
                <text x="40" y="90" textAnchor="middle" className="text-[8px] font-bold fill-slate-700 dark:fill-slate-300">1000m × 1000m</text>
              </g>
            </svg>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: A VÁLTÓSZÁMOK TITKA - MIÉRT 100? */}
      <TheorySection
        id="valtoszamok"
        title="4. A váltószámok titka: Miért 100 és miért nem 10?"
        subtitle="A területi váltószámok geometriai szemléltetése és a 100-as lépcső"
        badge="SZÁMÍTÁSI SZABÁLY"
      >
        <TheoryCard title="A leggyakoribb kérdés: Honnan jön a 100-as szorzó?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Sokan összekeverik a hosszúság és a terület váltószámait.
            Míg hosszúságban <MathText text="1 \\text{ dm} = 10 \\text{ cm}" />, addig a területnél egy <MathText text="1 \\text{ dm} \\times 1 \\text{ dm}" />-es négyzetbe <strong>10 sorban és 10 oszlopban</strong> pontosan <MathText text="10 \\cdot 10 = 100" /> darab <MathText text="1 \\text{ cm}^2" />-es kis négyzet fér bele!
          </p>

          {/* Vizuális 10x10 rács szemléltető */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 my-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  1 dm² felbontása 100 db 1 cm²-es négyzetre
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kattints a csúszkára és figyeld meg a kis négyzetek darabszámát!
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Színezett:</span>
                <span className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-sm font-mono">
                  {activeCellCount} cm²
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* SVG 10x10 Grid */}
              <div className="relative p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm">
                <svg className="w-48 h-48 sm:w-56 sm:h-56" viewBox="0 0 100 100">
                  {Array.from({ length: 100 }).map((_, idx) => {
                    const row = Math.floor(idx / 10);
                    const col = idx % 10;
                    const isActive = idx < activeCellCount;
                    return (
                      <rect
                        key={idx}
                        x={col * 10}
                        y={row * 10}
                        width={9.2}
                        height={9.2}
                        rx={1}
                        fill={isActive ? '#f59e0b' : '#f1f5f9'}
                        stroke={isActive ? '#d97706' : '#cbd5e1'}
                        strokeWidth="0.6"
                        className="transition-colors duration-150"
                      />
                    );
                  })}
                </svg>
                <div className="text-center mt-1 text-[10px] font-bold text-slate-400">
                  1 dm = 10 cm széles és 10 cm magas
                </div>
              </div>

              {/* Magyarázó panel */}
              <div className="flex-1 max-w-sm space-y-3">
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                    <span>1 oszlopban:</span>
                    <strong className="text-slate-800 dark:text-slate-100">10 db 1 cm²-es négyzet</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                    <span>Összesen 10 oszlop:</span>
                    <strong className="text-slate-800 dark:text-slate-100">10 · 10 = 100 db kis négyzet</strong>
                  </div>
                  <div className="flex justify-between pt-1 text-amber-700 dark:text-amber-400 font-bold">
                    <span>Képlet:</span>
                    <span>1 dm² = 100 cm²</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Rácskockák beállítása ({activeCellCount} db):
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={activeCellCount}
                    onChange={(e) => setActiveCellCount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Területváltó Létra */}
          <div className="my-5 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-200 dark:border-amber-800/60">
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm mb-3 text-center uppercase tracking-wider">
              A Területmértékek Metrikus Lépcsője (Minden lépésben 100-as váltószám!)
            </h4>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {['mm²', 'cm²', 'dm²', 'm²', 'a', 'ha', 'km²'].map((unitName, index, arr) => (
                <React.Fragment key={unitName}>
                  <div className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border-2 border-amber-400 dark:border-amber-600 shadow-sm text-center min-w-[54px]">
                    <span className="font-black text-slate-800 dark:text-slate-100 text-sm block">
                      {unitName}
                    </span>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="flex flex-col items-center px-1">
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">· 100</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500 -my-0.5" />
                      <span className="text-[9px] font-bold text-slate-400">: 100</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-2 rounded bg-white/70 dark:bg-slate-800/70 border border-amber-200 dark:border-amber-800">
                👉 <strong>Nagyobb egységből kisebb felé:</strong> Szorzunk 100-zal lépésenként (pl. <MathText text="3 \\text{ m}^2 = 3 \\cdot 100 = 300 \\text{ dm}^2" />).
              </div>
              <div className="p-2 rounded bg-white/70 dark:bg-slate-800/70 border border-amber-200 dark:border-amber-800">
                👈 <strong>Kisebb egységből nagyobb felé:</strong> Osztunk 100-zal lépésenként (pl. <MathText text="500 \\text{ cm}^2 = 500 : 100 = 5 \\text{ dm}^2" />).
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV TERÜLET-ÁTVÁLTÓ LABORATÓRIUM */}
      <TheorySection
        id="laboratorium"
        title="5. Interaktív Terület-Átváltó Laboratórium"
        subtitle="Próbáld ki az azonnali átváltást bármelyik egységből a többire!"
        badge="INTERAKTÍV ESZKÖZ"
      >
        <TheoryCard title="Válassz mértékegységet és írj be egy számot!">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                Átváltandó érték:
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={labValue}
                onChange={(e) => setLabValue(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-mono text-base font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                Kiinduló mértékegység:
              </label>
              <select
                value={labUnit}
                onChange={(e) => setLabUnit(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {AREA_UNITS.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.symbol} — {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Eredmények táblázata / rácsa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {AREA_UNITS.map(targetUnit => {
              const convertedValue = valueInM2 / targetUnit.factorToM2;
              const isSelected = targetUnit.id === labUnit;

              // Szép formázás a számokhoz
              let displayStr = '';
              if (convertedValue >= 1000000 || (convertedValue > 0 && convertedValue < 0.0001)) {
                displayStr = convertedValue.toLocaleString('hu-HU', { maximumFractionDigits: 6 });
              } else {
                displayStr = convertedValue.toLocaleString('hu-HU', { maximumFractionDigits: 4 });
              }

              return (
                <div
                  key={targetUnit.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-amber-100/80 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {targetUnit.symbol}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[120px]">
                      {targetUnit.name}
                    </span>
                  </div>
                  <div className="text-base font-black font-mono text-slate-800 dark:text-slate-100 truncate">
                    {displayStr} {targetUnit.symbol}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Tipp:</strong> Ha 2 lépcsőfokot ugrasz (pl. <MathText text="\\text{m}^2 \\to \\text{cm}^2" />), a váltószám <MathText text="100 \\cdot 100 = 10\\,000" />!
            </span>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: MINDENNAPI BECSLÉSEK ÉS CSAPDÁK */}
      <TheorySection
        id="becsles-csapdak"
        title="6. Mindennapi becslések és tipikus csapdák"
        subtitle="Mekkora egy focipálya? Hány négyzetméter a szobád? Kerüld el a leggyakoribb hibákat!"
        badge="GYAKORLATI ÉLET"
      >
        <TheoryCard title="Tipikus felületek a környezetünkben">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xl block mb-1">🏷️</span>
              <strong className="text-xs text-slate-800 dark:text-slate-100 block">Postabélyeg</strong>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">kb. 4-6 cm²</span>
              <p className="text-[11px] text-slate-500 mt-1">Kis centiméteres egység.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xl block mb-1">📖</span>
              <strong className="text-xs text-slate-800 dark:text-slate-100 block">Tankönyv borítója</strong>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">kb. 6 dm² (600 cm²)</span>
              <p className="text-[11px] text-slate-500 mt-1">A5/A4 méretű füzetek felülete.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xl block mb-1">🛏️</span>
              <strong className="text-xs text-slate-800 dark:text-slate-100 block">Gyerekszoba padlója</strong>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">kb. 12-16 m²</span>
              <p className="text-[11px] text-slate-500 mt-1">Négyzetméteres lakótér.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xl block mb-1">🥕</span>
              <strong className="text-xs text-slate-800 dark:text-slate-100 block">Családi ház telke</strong>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">kb. 8 ár (800 m²)</span>
              <p className="text-[11px] text-slate-500 mt-1">Kert és ház alapja együtt.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xl block mb-1">⚽</span>
              <strong className="text-xs text-slate-800 dark:text-slate-100 block">Szabvány focipálya</strong>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">kb. 0,7 ha (7140 m²)</span>
              <p className="text-[11px] text-slate-500 mt-1">105 méter × 68 méter.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-xl block mb-1">⛵</span>
              <strong className="text-xs text-slate-800 dark:text-slate-100 block">Balaton felülete</strong>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">kb. 592 km²</span>
              <p className="text-[11px] text-slate-500 mt-1">Közép-Európa legnagyobb tava.</p>
            </div>
          </div>
        </TheoryCard>

        {/* 3 Gyakori Csapda */}
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: A 10-es és a 100-as váltószám összekeverése',
              description: 'Mivel a hosszúságnál 1 m = 10 dm, a diákok gyakran azt hiszik, hogy a területnél is 10 a szorzó. NEM! A területnél minden lépésben 100 a szorzó, mert mindkét dimenzió (szélesség és hosszúság) 10-szeresére nő (10 · 10 = 100)!',
              example: 'HIBÁS: 1 m² = 10 dm² ❌ | HELYES: 1 m² = 100 dm² = 10 000 cm² ✅'
            },
            {
              title: '2. CSAPDA: Két lépcsőfok átugrása (pl. m²-ből cm²-be)',
              description: 'Ha m²-ből cm²-be váltasz, kettőt lépsz a létrán: először dm²-be (·100), majd cm²-be (·100). Ezért a szorzó NEM 200 és NEM 1000, hanem 100 · 100 = 10 000!',
              example: 'HIBÁS: 3 m² = 300 cm² vagy 3000 cm² ❌ | HELYES: 3 m² = 300 dm² = 30 000 cm² ✅'
            },
            {
              title: '3. CSAPDA: Ár és hektár felcserélése',
              description: 'Az ár a kisebb mezőgazdasági egység (100 m²), a hektár pedig a nagyobb (10 000 m²). A hektár szó elején lévő „hekt-” előtag a százszorost jelenti: 1 hektár = 100 ár!',
              example: 'HIBÁS: 1 a = 100 ha ❌ | HELYES: 1 ha = 100 a = 10 000 m² ✅'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
