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
  Box,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  Grid,
  Layers,
  Scissors,
  Gift,
  Package,
  RotateCcw
} from 'lucide-react';

export interface SurfaceAreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const SurfaceAreaTheory: React.FC<SurfaceAreaTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Felszín Laboratórium Állapotok ---
  const [bodyType, setBodyType] = useState<'cuboid' | 'cube'>('cuboid');
  const [edgeA, setEdgeA] = useState<number>(5);
  const [edgeB, setEdgeB] = useState<number>(3);
  const [edgeC, setEdgeC] = useState<number>(2);
  const [unit, setUnit] = useState<'cm' | 'dm' | 'm'>('cm');

  const actualA = edgeA;
  const actualB = bodyType === 'cube' ? edgeA : edgeB;
  const actualC = bodyType === 'cube' ? edgeA : edgeC;

  // Részterületek
  const areaAB = actualA * actualB;
  const areaAC = actualA * actualC;
  const areaBC = actualB * actualC;

  // Teljes felszín
  const totalSurfaceArea = bodyType === 'cube'
    ? 6 * (actualA * actualA)
    : 2 * (areaAB + areaAC + areaBC);

  return (
    <TheoryTemplate
      documentId="grade-5-surface-area-theory"
      pdfFilename="5_osztaly_IV_6_teglatest_kocka_felszine.pdf"
      title="Téglatest és kocka felszíne"
      subtitle="A felszín fogalma, a testet határoló lapok területeinek összege, a kocka és téglatest felszínképletei, nyitott dobozok és gyakorlati csomagolási feladatok"
      themeColor="pink"
      emoji="🎁"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 6. TANANYAG"
      quickRule={{
        label: 'A fejezet aranyszabálya',
        formula: '\\text{Kocka: } A = 6 \\cdot a^2 \\quad | \\quad \\text{Téglatest: } A = 2 \\cdot (a \\cdot b + a \\cdot c + b \\cdot c)'
      }}
      practiceTitle="Készen állsz a felszínszámítás gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A FELSZÍN FOGALMA */}
      <TheorySection
        id="fogalom"
        title="1. Mi a felszín? A test „csomagolópapírja”"
        subtitle="A térbeli testet körülvevő határoló lapok területeinek összege"
        badge="ALAPFOGALOM"
      >
        <TheoryCard title="Hogyan képzeld el a test felszínét?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy térbeli test <strong>felszíne (jele: A)</strong> a testet határoló összes síklap területének az összege.
            Képzeld el úgy, mintha egy dobozt <strong>ajándékcsomagoló papírral</strong> vonnál be simára hézagok és átfedések nélkül, vagy a doboz minden külső lapját <strong>lefestenéd</strong>!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-pink-50/80 dark:bg-slate-800/80 border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-pink-600 dark:text-pink-400 block mb-1">
                A felszín jele
              </span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                A
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                A latin „area” (terület, felület) szó kezdőbetűje.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-slate-800/80 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-purple-600 dark:text-purple-400 block mb-1">
                Mértékegysége
              </span>
              <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                mm², cm², dm², m²
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Ugyanaz, mint a síkbeli területeknél (négyzetes mértékegységek).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-slate-800/80 border border-rose-200 dark:border-rose-800 text-center">
              <span className="text-xs uppercase tracking-wider font-extrabold text-rose-600 dark:text-rose-400 block mb-1">
                Hány lap összege?
              </span>
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                6 lap
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Téglatestnél és zárt kockánál mind a 6 határoló lap.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A KOCKA FELSZÍNE */}
      <TheorySection
        id="kocka-felszin"
        title="2. A kocka felszíne: A = 6 · a · a"
        subtitle="Hat darab egybevágó négyzetlap területének összege"
        badge="KÉPLET"
      >
        <TheoryCard title="Hogyan számoljuk ki a kocka felszínét?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Mivel a kockát <strong>6 darab egybevágó, „a” oldalú négyzet</strong> határolja, rendkívül egyszerű a dolgunk:
          </p>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs mb-4 space-y-1">
            <div>1. Kiszámoljuk <strong>egy lap területét</strong>: <MathText text="T_{\\text{lap}} = a \\cdot a = a^2" /></div>
            <div>2. Mivel 6 pontosan egyforma lapunk van, megszorozzuk <strong>6-tal</strong>: <MathText text="A = 6 \\cdot T_{\\text{lap}} = 6 \\cdot a \\cdot a" /></div>
          </div>

          <div className="my-3 p-4 rounded-xl bg-pink-50 dark:bg-pink-950/50 border-2 border-pink-400 dark:border-pink-600 text-center">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block mb-1">
              A kocka felszínképlete
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-pink-900 dark:text-pink-100">
              A = 6 · a · a = 6a²
            </div>
          </div>

          <div className="my-3 p-3 bg-pink-50/50 dark:bg-pink-950/20 rounded-xl border border-pink-200 dark:border-pink-800 text-center">
            <svg className="w-full max-w-sm h-36 mx-auto" viewBox="0 0 300 120">
              {/* 3D Kocka */}
              <g transform="translate(20, 18)">
                <polygon points="0,25 20,10 65,10 45,25" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
                <polygon points="45,25 65,10 65,55 45,70" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
                <rect x="0" y="25" width="45" height="45" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" rx="1" />
                <text x="22" y="82" textAnchor="middle" className="text-[10px] font-bold fill-pink-900 dark:fill-pink-200">a</text>
                <text x="-6" y="50" textAnchor="middle" className="text-[10px] font-bold fill-pink-900 dark:fill-pink-200">a</text>
                <text x="22" y="50" textAnchor="middle" className="text-[10px] font-black fill-pink-700">3D</text>
              </g>

              {/* Nyíl: Kiterítés */}
              <path d="M 100 50 L 130 50 M 123 44 L 131 50 L 123 56" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="115" y="40" textAnchor="middle" className="text-[9px] font-bold fill-pink-600">6 lap</text>

              {/* Háló: 6 darab a x a négyzet */}
              <g transform="translate(150, 10)">
                <rect x="30" y="0" width="24" height="24" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
                <rect x="6" y="24" width="24" height="24" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
                <rect x="30" y="24" width="24" height="24" fill="#f472b6" stroke="#db2777" strokeWidth="1.2" />
                <rect x="54" y="24" width="24" height="24" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
                <rect x="30" y="48" width="24" height="24" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
                <rect x="30" y="72" width="24" height="24" fill="#fce7f3" stroke="#db2777" strokeWidth="1.2" />
                <text x="42" y="38" textAnchor="middle" className="text-[8px] font-black fill-white">a²</text>
                <text x="96" y="52" className="text-xs font-black fill-pink-900 dark:fill-pink-100">A = 6 · a²</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                Mintapélda 1 (Közvetlen számítás):
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Egy kocka éle <MathText text="a = 4 \\text{ cm}" />. Mekkora a felszíne?
              </p>
              <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700 font-bold text-pink-700 dark:text-pink-300 space-y-1">
                <div>T_lap = 4 · 4 = 16 cm²</div>
                <div>A = 6 · 16 = 96 cm²</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                Mintapélda 2 (Visszafelé számolás):
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Egy kocka felszíne <MathText text="A = 150 \\text{ cm}^2" />. Milyen hosszú egy éle?
              </p>
              <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700 font-bold text-purple-700 dark:text-purple-300 space-y-1">
                <div>1. Egy lap: 150 : 6 = 25 cm²</div>
                <div>2. Él: ? · ? = 25 ⟹ a = 5 cm</div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: A TÉGLATEST FELSZÍNE */}
      <TheorySection
        id="teglatest-felszin"
        title="3. A téglatest felszíne: A = 2 · (ab + ac + bc)"
        subtitle="A három különböző lapterület összegének kétszerese"
        badge="KÉPLET"
      >
        <TheoryCard title="A téglatest 3 pár egybevágó lapja">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A téglatestnek 3 különböző méretű éle van (<MathText text="a, b, c" />). Ezért a 6 határoló lap <strong>3 pár egybevágó téglalapra</strong> osztható:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3 text-xs">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <strong className="text-blue-900 dark:text-blue-200 block mb-1">1. Alap és fedőlap (2 db)</strong>
              <div className="font-mono font-bold text-blue-700 dark:text-blue-300 mb-1">T₁ = a · b</div>
              <p className="text-[11px] text-slate-500">Alsó és felső lap együtt: 2 · (a · b)</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <strong className="text-emerald-900 dark:text-emerald-200 block mb-1">2. Elülső és hátsó lap (2 db)</strong>
              <div className="font-mono font-bold text-emerald-700 dark:text-emerald-300 mb-1">T₂ = a · c</div>
              <p className="text-[11px] text-slate-500">Szemközti falak együtt: 2 · (a · c)</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <strong className="text-amber-900 dark:text-amber-200 block mb-1">3. Két oldallap (2 db)</strong>
              <div className="font-mono font-bold text-amber-700 dark:text-amber-300 mb-1">T₃ = b · c</div>
              <p className="text-[11px] text-slate-500">Jobb és bal oldal együtt: 2 · (b · c)</p>
            </div>
          </div>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-40 mx-auto" viewBox="0 0 340 145">
              {/* Kiterített háló 3 színnel */}
              {/* Hátlap: zöld */}
              <rect x="90" y="8" width="70" height="32" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="1" />
              <text x="125" y="27" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">Hátsó (a · c)</text>

              {/* Bal oldallap: sárga */}
              <rect x="42" y="40" width="48" height="48" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="1" />
              <text x="66" y="68" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">Bal (b·c)</text>

              {/* Alaplap: kék */}
              <rect x="90" y="40" width="70" height="48" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="1" />
              <text x="125" y="68" textAnchor="middle" className="text-[10px] font-black fill-blue-900">Alap (a · b)</text>

              {/* Jobb oldallap: sárga */}
              <rect x="160" y="40" width="48" height="48" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="1" />
              <text x="184" y="68" textAnchor="middle" className="text-[9px] font-bold fill-amber-800">Jobb (b·c)</text>

              {/* Előlap: zöld */}
              <rect x="90" y="88" width="70" height="32" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="1" />
              <text x="125" y="107" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">Elülső (a · c)</text>

              {/* Fedőlap: kék */}
              <rect x="208" y="40" width="70" height="48" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="1" />
              <text x="243" y="68" textAnchor="middle" className="text-[10px] font-bold fill-blue-800">Fedél (a · b)</text>

              {/* Képlet felirat */}
              <text x="170" y="136" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-slate-100">
                A = 2 · (a·b) + 2 · (a·c) + 2 · (b·c) = 2 · (ab + ac + bc)
              </text>
            </svg>
          </div>

          <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 border-2 border-pink-400 dark:border-pink-600 text-center">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block mb-1">
              A téglatest felszínképlete
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-slate-100">
              A = 2 · (a · b + a · c + b · c)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
              Számítási recept 3 egyszerű lépésben:
            </h4>
            <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <div>1. <strong>Részterületek kiszámítása:</strong> <MathText text="ab" />, <MathText text="ac" />, <MathText text="bc" /></div>
              <div>2. <strong>Részterületek összeadása:</strong> <MathText text="ab + ac + bc" /></div>
              <div>3. <strong>Szorzás 2-vel:</strong> mert minden lapnak van egy vele szemközti párja!</div>
            </div>
            <div className="mt-3 p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-purple-700 dark:text-purple-300 font-bold">
              Példa: a = 5 cm, b = 3 cm, c = 2 cm ⟹ A = 2 · (15 + 10 + 6) = 2 · 31 = 62 cm²
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: NYITOTT DOBOZOK */}
      <TheorySection
        id="nyitott-doboz"
        title="4. Nyitott (fedél nélküli) dobozok és akváriumok"
        subtitle="Mi történik, ha a testnek nincs teteje? 5 határoló lap számolása"
        badge="GYAKORLATI ESET"
      >
        <TheoryCard title="Nem minden doboz zárt!">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Sok valós feladatban nyitott testekkel találkozunk: például egy <strong>akvárium</strong>, egy <strong>medence</strong>, egy <strong>ládika</strong> vagy egy <strong>fiók</strong> felül nyitott, nincs fedőlapja.
          </p>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-56 h-36 mx-auto" viewBox="0 0 200 120">
              {/* Takart belső élek */}
              <line x1="45" y1="75" x2="45" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="15" y1="95" x2="45" y2="75" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="45" y1="75" x2="155" y2="75" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
              {/* Víz / alsó lap */}
              <polygon points="15,95 45,75 155,75 125,95" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" opacity="0.8" />
              {/* Üvegfalak */}
              <rect x="15" y="45" width="110" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" rx="1" />
              <polygon points="125,45 155,25 155,75 125,95" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" opacity="0.6" />
              {/* Nyitott felső perem (piros szaggatott: nincs fedél!) */}
              <polygon points="15,45 45,25 155,25 125,45" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="85" y="20" textAnchor="middle" className="text-[10px] font-black fill-red-600">NINCS FEDÉL! (0 db)</text>
              <text x="70" y="70" textAnchor="middle" className="text-xs font-black fill-sky-900">1 alap + 4 fal</text>
              <text x="70" y="84" textAnchor="middle" className="text-[10px] font-bold fill-sky-800">= 5 határoló lap</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <strong className="text-purple-900 dark:text-purple-200 text-sm block mb-1">
                Fedél nélküli kocka (5 lap)
              </strong>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                A 6 lap helyett csak 5 darab egyforma lapot veszünk számításba:
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono font-bold text-center text-purple-700 dark:text-purple-300">
                A_nyitott = 5 · a · a
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
              <strong className="text-pink-900 dark:text-pink-200 text-sm block mb-1">
                Fedél nélküli téglatest (Akvárium)
              </strong>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Csak egyetlen fenéklapja (<MathText text="a \\cdot b" />) van, fedél nélkül:
              </p>
              <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono font-bold text-center text-pink-700 dark:text-pink-300">
                A_nyitott = a · b + 2 · (a · c + b · c)
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV FELSZÍN LABORATÓRIUM */}
      <TheorySection
        id="laboratorium"
        title="5. Interaktív Felszín Szimulátor és Háló"
        subtitle="Változtasd az éleket, és figyeld a 3 pár határoló lap részterületeit és a teljes felszínt!"
        badge="INTERAKTÍV ESZKÖZ"
      >
        <TheoryCard title="Téglatest és Kocka Felszín Szimulátor">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => {
                setBodyType('cuboid');
                setEdgeA(5);
                setEdgeB(3);
                setEdgeC(2);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                bodyType === 'cuboid'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              📦 Téglatest (a, b, c)
            </button>
            <button
              onClick={() => {
                setBodyType('cube');
                setEdgeA(4);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                bodyType === 'cube'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              🎲 Kocka (a = b = c)
            </button>

            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500">Mértékegység:</span>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
              >
                <option value="cm">cm</option>
                <option value="dm">dm</option>
                <option value="m">m</option>
              </select>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>{bodyType === 'cube' ? 'Oldalél (a):' : '„a” él (hossz):'}</span>
                <span className="font-mono text-pink-700 dark:text-pink-300">{edgeA} {unit}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={edgeA}
                onChange={(e) => setEdgeA(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>

            {bodyType === 'cuboid' && (
              <>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>„b” él (szélesség):</span>
                    <span className="font-mono text-pink-700 dark:text-pink-300">{edgeB} {unit}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={edgeB}
                    onChange={(e) => setEdgeB(Number(e.target.value))}
                    className="w-full accent-pink-600 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>„c” él (magasság):</span>
                    <span className="font-mono text-pink-700 dark:text-pink-300">{edgeC} {unit}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={edgeC}
                    onChange={(e) => setEdgeC(Number(e.target.value))}
                    className="w-full accent-pink-600 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>

          {/* Eredmények bemutatása */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Részterületek listája */}
              <div className="space-y-2 text-xs">
                {bodyType === 'cube' ? (
                  <div className="p-3 rounded-lg bg-pink-100/60 dark:bg-pink-950/40 border border-pink-300 dark:border-pink-800">
                    <span className="font-bold text-pink-900 dark:text-pink-200 block mb-0.5">Egy négyzetlap területe:</span>
                    <div className="text-base font-black font-mono text-pink-700 dark:text-pink-300">
                      T_lap = {actualA} · {actualA} = {actualA * actualA} {unit}²
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex justify-between items-center">
                      <span>Alap- és fedőlap (2 db):</span>
                      <strong className="font-mono text-blue-700 dark:text-blue-300">{actualA} · {actualB} = {areaAB} {unit}² (× 2 = {2 * areaAB})</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                      <span>Elülső és hátsó lap (2 db):</span>
                      <strong className="font-mono text-emerald-700 dark:text-emerald-300">{actualA} · {actualC} = {areaAC} {unit}² (× 2 = {2 * areaAC})</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex justify-between items-center">
                      <span>Két oldallap (2 db):</span>
                      <strong className="font-mono text-amber-700 dark:text-amber-300">{actualB} · {actualC} = {areaBC} {unit}² (× 2 = {2 * areaBC})</strong>
                    </div>
                  </>
                )}
              </div>

              {/* Végeredmény kártya */}
              <div className="p-4 rounded-xl bg-pink-100/80 dark:bg-pink-950/60 border-2 border-pink-400 dark:border-pink-600 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400 block mb-1">
                  Kiszámított teljes felszín (A)
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-pink-900 dark:text-pink-100 mb-1">
                  {totalSurfaceArea} {unit}²
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {bodyType === 'cube'
                    ? `A = 6 · ${actualA * actualA} = ${totalSurfaceArea} ${unit}²`
                    : `A = 2 · (${areaAB} + ${areaAC} + ${areaBC}) = 2 · ${areaAB + areaAC + areaBC} = ${totalSurfaceArea} ${unit}²`}
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: TIPUSOS CSAPDÁK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakorlati csapdák és hibalehetőségek"
        subtitle="Kerüld el a 3 leggyakoribb felszínszámítási hibát!"
        badge="GYAKORLATI ÉLET"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: A 2-es szorzó elfelejtése a téglatestnél',
              description: 'A leggyakoribb tévedés, amikor a diákok összeadják a 3 különböző lap területét (ab + ac + bc), de ELFELEJTIK megszorozni 2-vel! Ne feledd: a téglatestnek 6 lapja van, a 3 lap csak a test felét jelenti!',
              example: 'HIBÁS: A = 15 + 10 + 6 = 31 cm² ❌ | HELYES: A = 2 · 31 = 62 cm² ✅'
            },
            {
              title: '2. CSAPDA: Kockánál 4-gyel vagy 12-vel szorzás 6 helyett',
              description: 'Gyakori hiba, hogy a kocka felszínét 4 · a²-nek veszik (ami csak a 4 oldallap palástja), vagy összekeverik a 12 éllel, és 12 · a²-t számolnak. A kockának pontosan 6 LAPJA van, ezért mindig 6-tal kell szorozni egy lap területét!',
              example: 'HIBÁS: A = 4 · a² vagy 12 · a² ❌ | HELYES: A = 6 · a² ✅'
            },
            {
              title: '3. CSAPDA: Nyitott doboz (akvárium) esetén 6 lap számolása',
              description: 'Ha a feladat szövegében az áll, hogy a láda fedél nélküli, vagy akváriumról van szó (aminek nincs teteje), akkor csak 5 lappal számolunk: a fenéklapot csak EGYSZER vesszük!',
              example: 'Akvárium felszíne: a · b + 2 · (ac + bc)'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
