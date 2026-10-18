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
  Grid,
  Layout,
  Calculator,
  RotateCcw,
  Check
} from 'lucide-react';

export interface RectangleAreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const RectangleAreaTheory: React.FC<RectangleAreaTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Terület Szimulátor Állapotok ---
  const [shapeType, setShapeType] = useState<'rectangle' | 'square'>('rectangle');
  const [sideA, setSideA] = useState<number>(6);
  const [sideB, setSideB] = useState<number>(4);
  const [unit, setUnit] = useState<'cm' | 'm' | 'dm' | 'mm'>('cm');

  const actualA = sideA;
  const actualB = shapeType === 'square' ? sideA : sideB;
  const area = actualA * actualB;
  const perimeter = shapeType === 'square' ? 4 * actualA : 2 * (actualA + actualB);

  return (
    <TheoryTemplate
      documentId="grade-5-rectangle-area-theory"
      pdfFilename="5_osztaly_IV_4_teglalap_negyzet_terulete.pdf"
      title="A téglalap és a négyzet területe"
      subtitle="A területszámítás alapelve, képletei (T = a · b és T = a · a), egységnégyzet-háló, hiányzó oldalhossz visszaszámolása területi adatokból és gyakorlati burkolási feladatok"
      themeColor="orange"
      emoji="🟩"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 4. TANANYAG"
      quickRule={{
        label: 'A fejezet alapszabálya',
        formula: '\\text{Téglalap: } T = a \\cdot b \\quad | \\quad \\text{Négyzet: } T = a \\cdot a = a^2 \\quad | \\quad a = T : b'
      }}
      practiceTitle="Készen állsz a területszámítás gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A TERÜLETSZÁMÍTÁS ALAPÖTLETE */}
      <TheorySection
        id="alapotlet"
        title="1. A területszámítás alapötlete: Négyzetek a hálóban"
        subtitle="Hány egységnégyzet fedi le a téglalapot hézagmentesen?"
        badge="SZEMLÉLTETÉS"
      >
        <TheoryCard title="Miért szorzunk össze két oldalt?">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Képzelj el egy téglalapot, amelynek szélessége <strong>6 cm</strong>, magassága pedig <strong>4 cm</strong>!
            Ha ezt a téglalapot felosztjuk 1 cm × 1 cm méretű egységnégyzetekre:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center my-3">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
              <svg className="w-56 h-40 mx-auto" viewBox="0 0 160 110">
                {/* 6x4 Grid */}
                <rect x="20" y="15" width="120" height="80" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" rx="2" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`v-${i}`} x1={20 + (i + 1) * 20} y1="15" x2={20 + (i + 1) * 20} y2="95" stroke="#fb923c" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                {Array.from({ length: 3 }).map((_, i) => (
                  <line key={`h-${i}`} x1="20" y1={15 + (i + 1) * 20} x2="140" y2={15 + (i + 1) * 20} stroke="#fb923c" strokeWidth="1" strokeDasharray="2,2" />
                ))}
                <text x="80" y="10" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">a = 6 cm (6 oszlop)</text>
                <text x="10" y="58" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" transform="rotate(-90 10 58)">b = 4 cm (4 sor)</text>
                <text x="80" y="59" textAnchor="middle" className="text-xs font-black fill-orange-950">4 sor · 6 oszlop = 24 db</text>
              </svg>
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
                <strong>1. Sorok vizsgálata:</strong> Egy sorban pontosan 6 darab 1 cm²-es négyzetlap fér el.
              </div>
              <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
                <strong>2. Oszlopok száma:</strong> Mivel a magassága 4 cm, összesen 4 ilyen sorunk van egymás felett.
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-bold text-amber-900 dark:text-amber-200">
                👉 <strong>Gyors számlálás:</strong> Ahelyett, hogy egyesével számolnánk meg a 24 kockát, elég összeszorozni: <MathText text="6 \\cdot 4 = 24 \\text{ cm}^2" />!
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: A TÉGLALAP TERÜLETE */}
      <TheorySection
        id="teglalap-terulet"
        title="2. A téglalap területe: T = a · b"
        subtitle="A két szomszédos oldal szorzata adja a síkidom területét"
        badge="KÉPLET"
      >
        <TheoryCard title="A téglalap területképlete">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            A téglalap területe az egymásra merőleges, szomszédos oldalak (hosszúság és szélesség) hosszának szorzata.
          </p>

          <div className="my-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/50 border-2 border-orange-400 dark:border-orange-600 text-center">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-1">
              A téglalap területe
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-orange-900 dark:text-orange-100">
              T = a · b
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              ahol <strong>a</strong> és <strong>b</strong> a téglalap két különböző szomszédos oldalának hossza (azonos mértékegységben!).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              Mintapélda 1:
            </h4>
            <p>
              Egy téglalap oldalai <MathText text="a = 8 \\text{ cm}" /> és <MathText text="b = 5 \\text{ cm}" />. Mekkora a területe?
            </p>
            <div className="font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700 font-bold text-orange-700 dark:text-orange-300">
              T = a · b = 8 cm · 5 cm = 40 cm²
            </div>
            <p className="text-slate-500">
              Válasz: A téglalap területe 40 cm².
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: A NÉGYZET TERÜLETE */}
      <TheorySection
        id="negyzet-terulet"
        title="3. A négyzet területe: T = a · a"
        subtitle="A négyzet olyan téglalap, amelynek minden oldala egyenlő hosszúságú"
        badge="KÉPLET"
      >
        <TheoryCard title="A négyzet területképlete">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Mivel a négyzet minden oldala egyenlő hosszúságú (<MathText text="a = b" />), a képletben a <MathText text="b" /> helyére is <MathText text="a" />-t írunk:
          </p>

          <div className="my-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-400 dark:border-amber-600 text-center">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
              A négyzet területe
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-900 dark:text-amber-100">
              T = a · a = a²
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              „Oldal szorozva önmagával” (vagy „a négyzetre emelve”).
            </p>
          </div>

          <div className="my-3 p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
            <svg className="w-56 h-36 mx-auto" viewBox="0 0 200 130">
              <rect x="55" y="15" width="90" height="90" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" rx="3" />
              {/* Grid lines inside */}
              <line x1="85" y1="15" x2="85" y2="105" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="115" y1="15" x2="115" y2="105" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="55" y1="45" x2="145" y2="45" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="55" y1="75" x2="145" y2="75" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="3,3" />
              {/* Side ticks for equal sides */}
              <line x1="98" y1="12" x2="102" y2="18" stroke="#d97706" strokeWidth="2" />
              <line x1="98" y1="102" x2="102" y2="108" stroke="#d97706" strokeWidth="2" />
              <line x1="52" y1="58" x2="58" y2="62" stroke="#d97706" strokeWidth="2" />
              <line x1="142" y1="58" x2="148" y2="62" stroke="#d97706" strokeWidth="2" />
              {/* Labels */}
              <text x="100" y="10" textAnchor="middle" className="text-[11px] font-bold fill-amber-900 dark:fill-amber-200">a = 3 cm</text>
              <text x="100" y="122" textAnchor="middle" className="text-[11px] font-bold fill-amber-900 dark:fill-amber-200">a = 3 cm</text>
              <text x="40" y="63" textAnchor="middle" className="text-[11px] font-bold fill-amber-900 dark:fill-amber-200">a</text>
              <text x="160" y="63" textAnchor="middle" className="text-[11px] font-bold fill-amber-900 dark:fill-amber-200">a</text>
              <text x="100" y="58" textAnchor="middle" className="text-xs font-black fill-amber-950 dark:fill-amber-100">T = a · a</text>
              <text x="100" y="72" textAnchor="middle" className="text-[10px] font-bold fill-amber-800 dark:fill-amber-300">3 · 3 = 9 cm²</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                Mintapélda 2:
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Egy négyzet alakú virágágyás oldala <MathText text="a = 7 \\text{ m}" />. Mekkora a területe?
              </p>
              <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded border font-bold text-amber-700 dark:text-amber-300">
                T = a · a = 7 m · 7 m = 49 m²
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs">
              <h4 className="font-bold text-teal-900 dark:text-teal-200 mb-1">
                Összehasonlítás: Kerület vs Terület
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mb-1">
                Ha az oldal <MathText text="a = 7 \\text{ m}" />:
              </p>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="text-teal-700 dark:text-teal-300 font-bold">
                  Kerület: K = 4 · a = 4 · 7 = 28 m (hosszúság!)
                </div>
                <div className="text-amber-700 dark:text-amber-300 font-bold">
                  Terület: T = a · a = 7 · 7 = 49 m² (felület!)
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: VISSZAFELÉ SZÁMOLÁS */}
      <TheorySection
        id="visszafele"
        title="4. Visszafelé számolás: Hiányzó oldal meghatározása"
        subtitle="Hogyan tudjuk kiszámolni a hiányzó oldalt a területből és a másik oldalból?"
        badge="EGYENLETEK"
      >
        <TheoryCard title="Téglalap hiányzó oldala: Osztás a területből">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Mivel a terület a két oldal szorzata (<MathText text="T = a \\cdot b" />), a szorzás fordított művelete az <strong>osztás</strong>.
            Ha ismerjük a területet és az egyik oldalt, a másik oldalt egyszerű osztással kapjuk meg:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">„a” oldal keresése</span>
              <div className="text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                a = T : b
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">„b” oldal keresése</span>
              <div className="text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                b = T : a
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-100">
              Mintapélda 3 (Téglalap):
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              Egy téglalap területe <MathText text="T = 54 \\text{ cm}^2" />, az egyik oldala <MathText text="b = 6 \\text{ cm}" />. Milyen hosszú a másik oldala?
            </p>
            <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded border font-bold text-orange-700 dark:text-orange-300">
              a = T : b = 54 cm² : 6 cm = 9 cm
            </div>
            <p className="text-slate-500">
              Ellenőrzés: 9 cm · 6 cm = 54 cm². Helyes!
            </p>
          </div>

          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-100">
              Mintapélda 4 (Négyzet oldala a területből):
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              Egy négyzet területe <MathText text="T = 64 \\text{ cm}^2" />. Hány centiméter hosszú egy oldala?
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Gondolkodjunk el: melyik az a pozitív szám, amit <strong>önmagával megszorozva</strong> 64-et kapunk?
            </p>
            <div className="font-mono bg-white dark:bg-slate-900 p-2 rounded border font-bold text-amber-700 dark:text-amber-300">
              ? · ? = 64 ⟹ 8 · 8 = 64 ⟹ a = 8 cm
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">
              Összetett síkidomok (L-alak) területe felbontással
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">
              Ha egy síkidom nem szabályos téglalap (például egy L-alakú folyosó vagy szoba), akkor egy képzeletbeli egyenes vonallal <strong>több téglalapra bontjuk szét</strong>, kiszámoljuk a részterületeket, majd összeadjuk őket (<MathText text="T = T_1 + T_2" />).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-center">
                <svg className="w-56 h-44 mx-auto" viewBox="0 0 200 150">
                  {/* Part 1 (Orange): x: 30, y: 15, width: 50, height: 115 */}
                  <rect x="30" y="15" width="50" height="115" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" rx="2" />
                  {/* Part 2 (Teal): x: 80, y: 65, width: 85, height: 65 */}
                  <rect x="80" y="65" width="85" height="65" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeDasharray="3,3" rx="2" />

                  {/* Labels for Part 1 */}
                  <text x="55" y="70" textAnchor="middle" className="text-xs font-black fill-orange-950">T₁ = 6 · 2</text>
                  <text x="55" y="84" textAnchor="middle" className="text-[10px] font-bold fill-orange-800">= 12 m²</text>

                  {/* Labels for Part 2 */}
                  <text x="122" y="94" textAnchor="middle" className="text-xs font-black fill-teal-950">T₂ = 5 · 3</text>
                  <text x="122" y="108" textAnchor="middle" className="text-[10px] font-bold fill-teal-800">= 15 m²</text>

                  {/* Dimensions */}
                  <text x="16" y="75" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">6 m</text>
                  <text x="55" y="9" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">2 m</text>
                  <text x="122" y="58" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">5 m</text>
                  <text x="178" y="100" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">3 m</text>
                  <text x="105" y="144" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Teljes alap: 2 + 5 = 7 m</text>
                </svg>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800">
                  <strong>1. lépés:</strong> A szaggatott vonallal 2 külön téglalapra osztjuk az idomot: <MathText text="T_1" /> és <MathText text="T_2" />.
                </div>
                <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                  <strong>2. lépés:</strong> Kiszámoljuk a két külön területet:
                  <br />• <MathText text="T_1 = 6 \\text{ m} \\cdot 2 \\text{ m} = 12 \\text{ m}^2" />
                  <br />• <MathText text="T_2 = 5 \\text{ m} \\cdot 3 \\text{ m} = 15 \\text{ m}^2" />
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-900 dark:text-emerald-200">
                  👉 <strong>3. lépés:</strong> Összeadjuk: <MathText text="T = 12 + 15 = 27 \\text{ m}^2" />!
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV TERÜLET SZIMULÁTOR */}
      <TheorySection
        id="laboratorium"
        title="5. Interaktív Terület Szimulátor"
        subtitle="Változtasd az oldalakat és lásd azonnal a felosztást és a kiszámolt területet!"
        badge="INTERAKTÍV ESZKÖZ"
      >
        <TheoryCard title="Téglalap és Négyzet Képlet Labor">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={() => {
                setShapeType('rectangle');
                setSideA(6);
                setSideB(4);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                shapeType === 'rectangle'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              📐 Téglalap mód (a ≠ b)
            </button>
            <button
              onClick={() => {
                setShapeType('square');
                setSideA(5);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                shapeType === 'square'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              ⏹️ Négyzet mód (a = b)
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
                <option value="mm">mm</option>
              </select>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {shapeType === 'square' ? '„a” oldal hossza:' : '„a” oldal (hosszúság):'}
                </span>
                <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 font-mono font-bold text-orange-700 dark:text-orange-300 text-sm">
                  {sideA} {unit}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={sideA}
                onChange={(e) => setSideA(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {shapeType === 'rectangle' && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    „b” oldal (szélesség):
                  </span>
                  <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 font-mono font-bold text-orange-700 dark:text-orange-300 text-sm">
                    {sideB} {unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Vizuális SVG Rács és Számítási panel */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {/* SVG Grid */}
            <div className="relative p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center min-w-[200px] min-h-[160px]">
              <svg
                className="transition-all duration-300"
                style={{
                  width: `${actualA * 22}px`,
                  height: `${actualB * 22}px`,
                  maxWidth: '240px',
                  maxHeight: '220px'
                }}
                viewBox={`0 0 ${actualA * 20} ${actualB * 20}`}
              >
                {/* Kis kockák */}
                {Array.from({ length: actualA * actualB }).map((_, idx) => {
                  const r = Math.floor(idx / actualA);
                  const c = idx % actualA;
                  return (
                    <rect
                      key={idx}
                      x={c * 20}
                      y={r * 20}
                      width="19"
                      height="19"
                      fill="#ffedd5"
                      stroke="#fb923c"
                      strokeWidth="1"
                      rx="2"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Számítási Eredmények Kártyája */}
            <div className="flex-1 max-w-sm space-y-2.5">
              <div className="p-3 rounded-lg bg-orange-50/80 dark:bg-slate-800/80 border border-orange-200 dark:border-orange-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                  Kiszámított terület (T)
                </span>
                <div className="text-xl font-black font-mono text-slate-800 dark:text-slate-100">
                  {shapeType === 'square'
                    ? `T = ${actualA} · ${actualA} = ${area} ${unit}²`
                    : `T = ${actualA} · ${actualB} = ${area} ${unit}²`}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pontosan {area} darab 1 {unit}² méretű négyzet alkotja.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-teal-50/80 dark:bg-slate-800/80 border border-teal-200 dark:border-teal-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                  Kiszámított kerület (K)
                </span>
                <div className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
                  {shapeType === 'square'
                    ? `K = 4 · ${actualA} = ${perimeter} ${unit}`
                    : `K = 2 · (${actualA} + ${actualB}) = ${perimeter} ${unit}`}
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORLATI FELADATOK ÉS CSAPDÁK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakorlati alkalmazások és tipikus csapdák"
        subtitle="Szoba parkettázása, festése és a 3 leggyakoribb hiba, amit el kell kerülnöd"
        badge="GYAKORLATI ÉLET"
      >
        <TheoryCard title="Mindennapi burkolási és festési feladatok">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-lg block mb-1">🏠</span>
              <strong className="text-slate-800 dark:text-slate-100 block mb-1">Padlóburkolás:</strong>
              Egy 5 m × 4 m-es szoba területe <MathText text="T = 5 \\cdot 4 = 20 \\text{ m}^2" />. Ha egy doboz laminált padló 2 m²-re elég, akkor <MathText text="20 : 2 = 10" /> dobozra van szükség!
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-lg block mb-1">🎨</span>
              <strong className="text-slate-800 dark:text-slate-100 block mb-1">Falfestés:</strong>
              Egy 6 méter hosszú és 2,5 méter magas fal felülete <MathText text="T = 6 \\cdot 2,5 = 15 \\text{ m}^2" />. Ebből a területből számoljuk ki, mennyi festékre lesz szükségünk.
            </div>
          </div>
        </TheoryCard>

        {/* 3 Gyakori Csapda */}
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: Különböző mértékegységek azonnali összeszorzása',
              description: 'Ha a téglalap egyik oldala méterben (pl. a = 3 m), a másik deciméterben (b = 40 dm) van megadva, SOHA nem szabad őket közvetlenül összeszorozni (3 · 40 = 120 értelmetlen)! Először mindig azonos mértékegységre kell váltani (3 m = 30 dm, így T = 30 · 40 = 1200 dm² = 12 m²)!',
              example: 'HIBÁS: 3 m · 40 dm = 120 (?) ❌ | HELYES: 30 dm · 40 dm = 1200 dm² = 12 m² ✅'
            },
            {
              title: '2. CSAPDA: Kerület és Terület keverése a négyzetnél',
              description: 'A kerület a körvonal hossza (K = 4 · a), a terület pedig a belső síkfelület (T = a · a). Egy 4 cm oldalú négyzetnél K = 4 · 4 = 16 cm és T = 4 · 4 = 16 cm². Bár a számérték véletlenül megegyezik, a mértékegység és a jelentés teljesen más (hosszúság vs felület)! Más oldalhossznál (pl. a = 5 cm) K = 20 cm, míg T = 25 cm²!',
              example: 'K = 4 · a (vonal, cm) | T = a · a (felület, cm²)'
            },
            {
              title: '3. CSAPDA: Visszafelé számolásnál összeadás vagy szorzás tévesztése',
              description: 'Ha a téglalap területe 30 cm² és egyik oldala 5 cm, a hiányzó oldal nem 30 - 5 és nem 30 · 5, hanem osztás: 30 : 5 = 6 cm!',
              example: 'HIBÁS: b = 30 - 5 = 25 cm ❌ | HELYES: b = 30 : 5 = 6 cm ✅'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
