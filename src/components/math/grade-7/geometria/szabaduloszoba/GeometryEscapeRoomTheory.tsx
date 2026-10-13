import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Key,
  Lock,
  Unlock,
  ShieldAlert,
  Sparkles,
  Compass,
  Shapes,
  Triangle,
  Square,
  Box,
  Layers,
  Ruler,
  HelpCircle,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface GeometryEscapeRoomTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type LockTab = 'lock1' | 'lock2' | 'lock3';

export const GeometryEscapeRoomTheory: React.FC<GeometryEscapeRoomTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedLock, setSelectedLock] = useState<LockTab>('lock1');

  // Interactive Codebreaker Cipher Simulator state
  const [cipherN, setCipherN] = useState(6); // n-gon
  const [cipherBase, setCipherBase] = useState(10);
  const [cipherHeight, setCipherHeight] = useState(6);
  const [cipherPrismH, setCipherPrismH] = useState(8);

  // Self-check quiz state
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  // Code calculations for interactive simulator
  const lock1Code = ((cipherN - 2) * 180) / 10 + (cipherN * (cipherN - 3)) / 2;
  const lock2Code = (cipherBase * cipherHeight) / 2;
  const lock3Code = lock2Code * cipherPrismH;

  return (
    <TheoryTemplate
      title="11. Geometriai Szabadulószoba"
      subtitle="Kódfejtési elmélet, titkos geometriai lakatok és matematikai szabadulási stratégiák"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 🔐 11. SZABADULÓSZOBA"
      quickRule={{
        label: 'Szabadulókódok kulcsa',
        formula: '1.\\text{ Zár: } S_n = (n-2)180^\\circ, \\ d_n = \\frac{n(n-3)}{2} \\quad • \\quad 2.\\text{ Zár: } T = \\frac{a \\cdot m_a}{2}, \\ k \\cdot m \\quad • \\quad 3.\\text{ Zár: } V = T_a M, \\ C+L=E+2'
      }}
      topicId="g7-geom-escape-room"
      chapterId="geometria"
      grade={7}
      themeColor="violet"
      estimatedReadTime="15 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* FONTOS KÓDFEJTŐ SZABÁLYOK & LAKATKULCSOK BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-2 border-violet-300 dark:border-violet-700/80 shadow-xs mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md bg-violet-600 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            A 3 Titkos Zár Rejtvénykulcsa
          </span>
          <span className="text-xs font-semibold text-violet-950 dark:text-violet-200">
            A szabadulószoba sikeres kinyitásának 3 fő szabálya
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-violet-200 dark:border-slate-700">
            <span className="font-bold text-violet-700 dark:text-violet-400 block mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> 1. Zár: Szögek és Átlók Titka
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              A kombinációs zár számai a belső szögösszegből (<MathText text="$S_n = (n-2)\\cdot 180^\circ$" />) és az átlók számából (<MathText text="$d_n = \\frac{n(n-3)}{2}$" />) keletkeznek.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-violet-200 dark:border-slate-700">
            <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> 2. Zár: Síkidomok Területmátrixa
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              A második kapu a felületek kódja: Háromszög (<MathText text="$\\frac{a \\cdot m_a}{2}$" />), Paralelogramma (<MathText text="$a \\cdot m_a$" />), Trapéz (<MathText text="$k \\cdot m$" />) és Deltoid (<MathText text="$\\frac{e \\cdot f}{2}$" />).
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-violet-200 dark:border-slate-700">
            <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> 3. Zár: Testek és Mesterkód
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              A végső kimenekülés: hasábok térfogata (<MathText text="$V = T_a \\cdot M$" />), kiterített testhálók, és a titkos Euler-képlet (<MathText text="$C + L = E + 2$" />).
            </p>
          </div>
        </div>
      </div>

      {/* TÖRTÉNETI BEVEZETŐ / LORE */}
      <TheoryCallout
        type="tip"
        title="A Szabadulószoba Legendája"
      >
        Egy ódon matematikai kódkamrában rekedtél. A terem ajtaja három nehéz, rézből kovácsolt lakatot őriz. A falakra vésett geometriai hieroglifák és ábrák nem véletlenek: mindegyik egy-egy matematikai számítás végeredményét rejti el. Ha mindhárom zár kódját helyesen fejtetted meg, a titkos kapu kitárul!
      </TheoryCallout>

      {/* 1. SZAKASZ: 1. ZÁR - SZÖGEK ÉS ÁTLÓK */}
      <TheorySection
        title="1. Zár: A Szögek és Átlók Titka"
        subtitle="Sokszögek belső és külső szögösszege, valamint az átlók kódja"
        badge="1. Zár"
        badgeColor="violet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="Belső Szögek Kódfejtése"
            subtitle="Hogyan nyitható a szög-kombináció?"
            icon={<Compass className="w-5 h-5 text-violet-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Ha a zár egy sokszög nevét adja meg, a kombináció első része mindig a belső szögek összege:
            </p>
            <div className="p-2.5 rounded-lg bg-violet-50/70 dark:bg-slate-800 text-xs space-y-1 text-slate-800 dark:text-slate-200 font-mono">
              <div>• Háromszög (n=3): (3-2) · 180° = <strong>180°</strong></div>
              <div>• Négyszög (n=4): (4-2) · 180° = <strong>360°</strong></div>
              <div>• Ötszög (n=5): (5-2) · 180° = <strong>540°</strong></div>
              <div>• Hatszög (n=6): (6-2) · 180° = <strong>720°</strong></div>
              <div>• Nyolcszög (n=8): (8-2) · 180° = <strong>1080°</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Átlók Száma: A Zár Második Számjegye"
            subtitle="Egy csúcsból és összesen"
            icon={<Shapes className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Egy csúcsból <MathText text="$n - 3$" /> átló húzható (önmagába és a 2 szomszédba nem). Az összes átló száma:
            </p>
            <div className="text-center font-black text-sm text-purple-700 dark:text-purple-300 p-2 bg-purple-50 dark:bg-slate-800 rounded-lg mb-2">
              <MathText text="$d_n = \\frac{n(n-3)}{2}$" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Titkos trükk:</strong> Az ötszög (<MathText text="$n=5$" />) az egyetlen alakzat, ahol az oldalak száma és az átlók száma megegyezik (<MathText text="$d_5 = 5$" />)!
            </p>
          </TheoryCard>
        </div>

        <GeometryFigureGrid columns={2}>
          <GeometryFigureCard
            title="A Szögmérő Lakat"
            subtitle="Külső szög tétele"
            badge="α' = β + γ"
            figure={
              <svg viewBox="0 0 110 75" className="w-32 h-20">
                <polygon points="15,55 75,55 45,15" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                <line x1="75" y1="55" x2="105" y2="55" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M 75 55 A 14 14 0 0 1 85 45" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                <text x="89" y="48" className="text-[7.5px] font-bold fill-red-600">α'</text>
                <text x="45" y="27" textAnchor="middle" className="text-[7.5px] font-bold fill-violet-800">γ</text>
                <text x="25" y="50" className="text-[7.5px] font-bold fill-violet-800">β</text>
              </svg>
            }
          >
            Bármely háromszög külső szöge egyenlő a két nem mellette fekvő belső szög összegével. Ez gyakori kódkulcs a szabadulószobában!
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Az Átló-Csillag Lakat"
            subtitle="Ötszög 5 átlója"
            badge="d_5 = 5"
            figure={
              <svg viewBox="0 0 100 80" className="w-28 h-20">
                <polygon points="50,10 85,35 72,72 28,72 15,35" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
                <line x1="50" y1="10" x2="72" y2="72" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 2" />
                <line x1="50" y1="10" x2="28" y2="72" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 2" />
                <line x1="85" y1="35" x2="28" y2="72" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 2" />
                <line x1="85" y1="35" x2="15" y2="35" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 2" />
                <line x1="72" y1="72" x2="15" y2="35" stroke="#9333ea" strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx="50" cy="45" r="4" fill="#6d28d9" />
                <text x="50" y="47" textAnchor="middle" className="text-[6.5px] font-black fill-white">★</text>
              </svg>
            }
          >
            Az átlók egy belső csillagot formáznak. A metszéspontok és vonalak száma kódfejtő rejtvény alapja.
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* 2. SZAKASZ: 2. ZÁR - SÍKIDOMOK TERÜLETMÁTRIXA */}
      <TheorySection
        title="2. Zár: A Síkidomok Területmátrixa"
        subtitle="Felületkódok háromszögből, trapézból, paralelogrammából és deltoidból"
        badge="2. Zár"
        badgeColor="purple"
      >
        <TheoryTable
          headers={['Síkidom', 'Területképlet', 'Kódfejtési elv', 'Gyakori lakat-példa']}
          rows={[
            ['Háromszög', 'T = (a · m_a) / 2', 'Paralelogramma fele', 'a = 10, m = 6 ⟹ Kód = 30'],
            ['Derékszögű 3-szög', 'T = (a · b) / 2', 'Befogók szorzatának fele', 'a = 6, b = 8 ⟹ Kód = 24'],
            ['Paralelogramma', 'T = a · m_a', 'Alap × Magasság', 'a = 8, m = 5 ⟹ Kód = 40'],
            ['Trapéz', 'T = ((a+c)/2) · m', 'Középvonal × Magasság', 'a = 12, c = 4, m = 5 ⟹ k = 8, Kód = 40'],
            ['Deltoid & Rombusz', 'T = (e · f) / 2', 'Merőleges átlók szorzata per 2', 'e = 10, f = 14 ⟹ Kód = 70']
          ]}
        />

        <div className="mt-4">
          <TheoryTrapBox
            title="Szabadulószoba Csapda: A mértékegységek elcsúszása!"
            trap="A lakat feladványa: Az alap 2 dm, a magasság 15 cm. A kód 2 · 15 = 30?"
            solution="CSAPDA! Először közös mértékegységre kell hozni: 2 dm = 20 cm! Így a háromszög területe: T = (20 · 15) / 2 = 150 cm²! A helyes lakatkód 150, nem 30 vagy 15!"
          />
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: 3. ZÁR - TESTEK HÁLÓZATA ÉS TÉRFOGATA */}
      <TheorySection
        title="3. Zár: A Testek Hálózata és a Titkos Térfogat"
        subtitle="Hasábok térfogata, felszíne és a mester-Euler-képlet"
        badge="3. Zár"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="A Térfogat-Mesterkulcs"
            subtitle="V = T_a · M és a Liter"
            icon={<Box className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              A 3. zár leggyakrabban egy folyadéktartály vagy hasáb térfogatát kéri deciliterben vagy literben:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-5">
              <li><MathText text="$V = T_a \\cdot M$" /> (alapterület × testmagasság).</li>
              <li>Aranyhíd: <MathText text="$1\\text{ dm}^3 = 1\\text{ liter} = 1000\\text{ cm}^3$" />.</li>
              <li>Felszín: <MathText text="$A = 2T_a + K_a \\cdot M$" /> (két alaplap + palást).</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Az Euler-Mesterkód"
            subtitle="C + L = E + 2"
            icon={<Layers className="w-5 h-5 text-violet-600" />}
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
              Ha a lakat ismeretlen poliéder éleinek vagy csúcsainak számát kéri:
            </p>
            <div className="text-center font-black text-sm text-violet-700 dark:text-violet-300 p-2 bg-violet-50 dark:bg-slate-800 rounded-lg mb-2">
              <MathText text="$E = C + L - 2$" />
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Például oktaéderre: <MathText text="$C=6, L=8 \\implies E = 6 + 8 - 2 = 12$" />. A kód: <strong>12</strong>.
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV KÓDFEJTŐ SZIMULÁTOR */}
      <TheorySection
        title="4. Interaktív Kódfejtő Szimulátor"
        subtitle="Próbáld ki, hogyan áll össze a lakatkód a geometriai paraméterekből!"
        badge="Kódfejtő Gép"
        badgeColor="violet"
      >
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Control 1: n-oldalú sokszög */}
            <div className="p-3 rounded-xl bg-violet-50/60 dark:bg-slate-800/80 border border-violet-100 dark:border-slate-700">
              <label className="text-xs font-bold text-violet-900 dark:text-violet-300 flex justify-between mb-2">
                <span>1. Zár: Sokszög oldalai (n = {cipherN})</span>
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={cipherN}
                onChange={e => setCipherN(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
              <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
                Szögösszeg: <MathText text={`S_${cipherN} = ${(cipherN - 2) * 180}^\\circ`} /><br />
                Átlók: <MathText text={`d_${cipherN} = ${(cipherN * (cipherN - 3)) / 2}`} />
              </div>
            </div>

            {/* Control 2: Háromszög alap & magasság */}
            <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-slate-800/80 border border-purple-100 dark:border-slate-700">
              <label className="text-xs font-bold text-purple-900 dark:text-purple-300 flex justify-between mb-1">
                <span>2. Zár: Alap ({cipherBase} cm)</span>
              </label>
              <input
                type="range"
                min="4"
                max="20"
                value={cipherBase}
                onChange={e => setCipherBase(Number(e.target.value))}
                className="w-full accent-purple-600 mb-2"
              />
              <label className="text-xs font-bold text-purple-900 dark:text-purple-300 flex justify-between mb-1">
                <span>Magasság ({cipherHeight} cm)</span>
              </label>
              <input
                type="range"
                min="2"
                max="12"
                value={cipherHeight}
                onChange={e => setCipherHeight(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                Terület: <MathText text={`T = \\frac{${cipherBase} \\cdot ${cipherHeight}}{2} = ${(cipherBase * cipherHeight) / 2}\\text{ cm}^2`} />
              </div>
            </div>

            {/* Control 3: Hasáb magasság */}
            <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700">
              <label className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex justify-between mb-2">
                <span>3. Zár: Testmagasság (M = {cipherPrismH} cm)</span>
              </label>
              <input
                type="range"
                min="3"
                max="15"
                value={cipherPrismH}
                onChange={e => setCipherPrismH(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
                Térfogat: <MathText text={`V = T_a \\cdot M = ${lock2Code} \\cdot ${cipherPrismH} = ${lock3Code}\\text{ cm}^3`} />
              </div>
            </div>
          </div>

          {/* Master Lock Code Display */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-center shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-violet-200 block mb-1">
              Generált Szabaduló Lakatkód
            </span>
            <div className="flex items-center justify-center gap-4 text-2xl font-black font-mono">
              <div className="bg-black/30 px-3 py-1.5 rounded-lg border border-white/20">
                1. Kód: {Math.round(lock1Code)}
              </div>
              <span className="text-violet-300">•</span>
              <div className="bg-black/30 px-3 py-1.5 rounded-lg border border-white/20">
                2. Kód: {lock2Code}
              </div>
              <span className="text-violet-300">•</span>
              <div className="bg-black/30 px-3 py-1.5 rounded-lg border border-white/20">
                3. Kód: {lock3Code}
              </div>
            </div>
            <p className="text-xs text-violet-100 mt-2">
              Ha a tanuló ezeket a számokat adja meg a kvíz megfelelő zárainál, a szoba kinyílik!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: GYORS KÓDFEJTŐ PRÓBA */}
      <TheorySection
        title="5. Gyors Kódfejtő Próba"
        subtitle="3 gyors zár-teszt a szabadulás előtt"
        badge="Zár-próba"
        badgeColor="violet"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">
              1. Zár: Egy szabályos ötszög belső szögeinek összege mennyi?
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: '360°', correct: false },
                { label: '540°', correct: true },
                { label: '720°', correct: false },
                { label: '180°', correct: false }
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuiz1Answer(idx)}
                  className={`p-2 rounded-lg font-bold transition-all ${
                    quiz1Answer === idx
                      ? opt.correct
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {quiz1Answer === 1 ? '✓ Helyes! (5 - 2) · 180° = 3 · 180° = 540°.' : '✗ Nem. Képlet: S_n = (n - 2) · 180° = 540°!'}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">
              2. Zár: Egy rombusz átlói 6 cm és 8 cm. Mekkora a terület-kód?
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: '48', correct: false },
                { label: '24', correct: true },
                { label: '14', correct: false },
                { label: '28', correct: false }
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuiz2Answer(idx)}
                  className={`p-2 rounded-lg font-bold transition-all ${
                    quiz2Answer === idx
                      ? opt.correct
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {quiz2Answer === 1 ? '✓ Helyes! T = (6 · 8) / 2 = 24 cm².' : '✗ Nem. Átlók szorzata per kettő: (6 · 8) / 2 = 24!'}
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h5 className="font-bold text-sm text-slate-800 dark:text-white mb-2">
              3. Zár: Egy konvex poliédernek 6 csúcsa és 8 lapja van (oktaéder). Hány éle van?
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: '12 él', correct: true },
                { label: '14 él', correct: false },
                { label: '10 él', correct: false },
                { label: '16 él', correct: false }
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuiz3Answer(idx)}
                  className={`p-2 rounded-lg font-bold transition-all ${
                    quiz3Answer === idx
                      ? opt.correct
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                {quiz3Answer === 0 ? '✓ Helyes! C + L = E + 2 ⟹ 6 + 8 = E + 2 ⟹ E = 12 él.' : '✗ Nem. Euler-tétel: 6 + 8 - 2 = 12 él!'}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
