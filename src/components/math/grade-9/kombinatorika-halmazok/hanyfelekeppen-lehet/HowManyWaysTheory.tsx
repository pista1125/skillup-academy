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
  GitFork,
  Calculator,
  Network,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Eye,
  Sliders,
  Scale,
  ArrowRight,
  ListOrdered,
  Shuffle,
  Hash,
  Compass,
  Utensils,
  KeyRound,
  MapPin,
  Layers,
  ArrowRightLeft,
  Dices,
  Trophy,
  Users
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface HowManyWaysTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const HowManyWaysTheory: React.FC<HowManyWaysTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Döntési Fa és Menüválasztó Labor ---
  const [soupCount, setSoupCount] = useState<number>(2); // 2 vagy 3 leves
  const [mainCount, setMainCount] = useState<number>(3); // 2, 3 vagy 4 főétel
  const [dessertCount, setDessertCount] = useState<number>(2); // 1, 2 vagy 3 desszert

  const totalMenus = soupCount * mainCount * dessertCount;

  // --- Interaktív Számképző Labor ---
  const [digitsAllowed, setDigitsAllowed] = useState<number[]>([1, 2, 3, 4]);
  const [allowRepetition, setAllowRepetition] = useState<boolean>(true);
  const [numberLength, setNumberLength] = useState<number>(3);

  const calculateNumbersCount = () => {
    const n = digitsAllowed.length;
    if (allowRepetition) {
      return Math.pow(n, numberLength);
    } else {
      if (numberLength > n) return 0;
      let res = 1;
      for (let i = 0; i < numberLength; i++) {
        res *= (n - i);
      }
      return res;
    }
  };

  // --- Mini Önellenőrző Kvíz Állapotok ---
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="Hányféleképpen lehet? – Szisztematikus Összeszámlálás"
      subtitle="Esetek áttekintése, fadiagramok (döntési fák), a szorzási és összeadási szabály precíz alkalmazása a középiskolai matematikában"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎲 TANANYAG"
      themeColor="blue"
      documentId="how-many-ways-theory-document"
      pdfFilename="9_osztaly_hanyfelekeppen_lehet_tananyag.pdf"
      quickRule={{
        label: 'A Két Alapvető Kombinatorikai Szabály',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-black">Szorzási szabály (ÉS): </span>
              <MathText text="\text{Összes eset} = n_1 \cdot n_2 \cdot \dots \cdot n_k" />
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Összeadási szabály (VAGY): </span>
              <MathText text="\text{Összes eset} = n_1 + n_2 + \dots + n_m" />
            </div>
          </div>
        )
      }}
      practiceTitle="Készen állsz a kombinatorikai feladványokra?"
      practiceSubtitle="30 válogatott feladat 3 szinten, fadiagramokkal, kártyás párosítóval és csoportosítóval!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
    >
      {/* =========================================================================
          1. FEJEZET: A SZISZTEMATIKUS FELSOROLÁS MŰVÉSZETE
          ========================================================================= */}
      <TheorySection
        number={1}
        title="A Szisztematikus Felsorolás Művészete"
        badge="Alapelvek"
        badgeColor="blue"
        icon={<ListOrdered className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A <strong>kombinatorika</strong> a véges halmazok elemeinek kiválasztásával, sorbarendezésével és csoportosításával foglalkozó matematikai tudományág. A mindennapi életben szinte minden percben kombinatorikai döntést hozunk: mit vegyünk fel, milyen útvonalon jussunk el az iskolába, milyen jelszót válasszunk, vagy hányféle menüből rendelhetünk ebédre.
          </p>
          <p>
            Ha a lehetőségek száma nem túl nagy, közvetlenül fel is tudjuk sorolni az összes lehetséges esetet. A véletlenszerű (ad-hoc) próbálgatás azonban szinte biztosan hibához vezet: egyes esetek kimaradnak, másokat pedig többször is megszámolunk.
          </p>

          <TheoryCallout
            title="A Szisztematikus Felsorolás Aranyszabálya"
            type="tip"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs sm:text-sm leading-relaxed">
              A felsorolás során mindig határozzunk meg egy <strong>szilárd rendezési elvet</strong> (pl. nagyság szerinti, ábécé szerinti, helyiérték szerinti sorrend), és azt a legelső esettől a legutolsóig szigorúan kövessük!
            </p>
          </TheoryCallout>

          {/* SVG ÁBRA 1: Szisztematikus Mátrix & Pénzérmék Döntési Fája */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Szemléltető Ábra: Szisztematikus 2D Mátrix és Érmedobási Bináris Fa</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              {/* Bal oldal: 2D Táblázat SVG */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col items-center">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2 text-center">
                  Kétjegyű számok képzése az &#123;1, 2, 3&#125; számjegyekből
                </div>
                <svg viewBox="0 0 320 200" className="w-full max-w-xs h-auto select-none">
                  <defs>
                    <linearGradient id="gradValid" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dbeafe" />
                      <stop offset="100%" stopColor="#bfdbfe" />
                    </linearGradient>
                    <linearGradient id="gradInvalid" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fee2e2" />
                      <stop offset="100%" stopColor="#fecaca" />
                    </linearGradient>
                  </defs>

                  {/* Fejléc címkék */}
                  <text x="50" y="22" className="text-[10px] font-bold fill-slate-500" textAnchor="middle">1. \ 2.</text>
                  <rect x="80" y="8" width="65" height="24" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="112" y="24" className="text-[11px] font-black fill-blue-700" textAnchor="middle">2. jegy: 1</text>
                  <rect x="155" y="8" width="65" height="24" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="187" y="24" className="text-[11px] font-black fill-blue-700" textAnchor="middle">2. jegy: 2</text>
                  <rect x="230" y="8" width="65" height="24" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="262" y="24" className="text-[11px] font-black fill-blue-700" textAnchor="middle">2. jegy: 3</text>

                  {/* 1. sor (1-es kezdés) */}
                  <rect x="10" y="42" width="60" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="40" y="65" className="text-[11px] font-black fill-blue-800" textAnchor="middle">1. jegy: 1</text>
                  {/* 11 - tiltott */}
                  <rect x="80" y="42" width="65" height="38" rx="6" fill="url(#gradInvalid)" stroke="#f87171" strokeWidth="1.2" strokeDasharray="3 2" />
                  <text x="112" y="64" className="text-[13px] font-black fill-rose-700" textAnchor="middle">11</text>
                  <line x1="86" y1="48" x2="139" y2="74" stroke="#dc2626" strokeWidth="1.5" />
                  {/* 12 - érvényes */}
                  <rect x="155" y="42" width="65" height="38" rx="6" fill="url(#gradValid)" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="187" y="66" className="text-[14px] font-black fill-blue-900" textAnchor="middle">12</text>
                  {/* 13 - érvényes */}
                  <rect x="230" y="42" width="65" height="38" rx="6" fill="url(#gradValid)" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="262" y="66" className="text-[14px] font-black fill-blue-900" textAnchor="middle">13</text>

                  {/* 2. sor (2-es kezdés) */}
                  <rect x="10" y="90" width="60" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="40" y="113" className="text-[11px] font-black fill-blue-800" textAnchor="middle">1. jegy: 2</text>
                  {/* 21 - érvényes */}
                  <rect x="80" y="90" width="65" height="38" rx="6" fill="url(#gradValid)" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="112" y="114" className="text-[14px] font-black fill-blue-900" textAnchor="middle">21</text>
                  {/* 22 - tiltott */}
                  <rect x="155" y="90" width="65" height="38" rx="6" fill="url(#gradInvalid)" stroke="#f87171" strokeWidth="1.2" strokeDasharray="3 2" />
                  <text x="187" y="112" className="text-[13px] font-black fill-rose-700" textAnchor="middle">22</text>
                  <line x1="161" y1="96" x2="214" y2="122" stroke="#dc2626" strokeWidth="1.5" />
                  {/* 23 - érvényes */}
                  <rect x="230" y="90" width="65" height="38" rx="6" fill="url(#gradValid)" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="262" y="114" className="text-[14px] font-black fill-blue-900" textAnchor="middle">23</text>

                  {/* 3. sor (3-as kezdés) */}
                  <rect x="10" y="138" width="60" height="38" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="40" y="161" className="text-[11px] font-black fill-blue-800" textAnchor="middle">1. jegy: 3</text>
                  {/* 31 - érvényes */}
                  <rect x="80" y="138" width="65" height="38" rx="6" fill="url(#gradValid)" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="112" y="162" className="text-[14px] font-black fill-blue-900" textAnchor="middle">31</text>
                  {/* 32 - érvényes */}
                  <rect x="155" y="138" width="65" height="38" rx="6" fill="url(#gradValid)" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="187" y="162" className="text-[14px] font-black fill-blue-900" textAnchor="middle">32</text>
                  {/* 33 - tiltott */}
                  <rect x="230" y="138" width="65" height="38" rx="6" fill="url(#gradInvalid)" stroke="#f87171" strokeWidth="1.2" strokeDasharray="3 2" />
                  <text x="262" y="160" className="text-[13px] font-black fill-rose-700" textAnchor="middle">33</text>
                  <line x1="236" y1="144" x2="289" y2="170" stroke="#dc2626" strokeWidth="1.5" />

                  {/* Magyarázat lábléc */}
                  <text x="160" y="193" className="text-[9.5px] font-semibold fill-slate-500" textAnchor="middle">
                    Kék = 6 db különböző jegyű szám • Piros átló = ismétlődő jegyek (kizárva)
                  </text>
                </svg>
              </div>

              {/* Jobb oldal: 3 pénzérme bináris döntési fája */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 flex flex-col items-center">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2 text-center">
                  3 pénzérme feldobásának bináris fadiagramja (2³ = 8 eset)
                </div>
                <svg viewBox="0 0 340 200" className="w-full max-w-sm h-auto select-none">
                  {/* Vonalak Root -> 1. szint */}
                  <line x1="25" y1="100" x2="90" y2="55" stroke="#6366f1" strokeWidth="1.8" />
                  <line x1="25" y1="100" x2="90" y2="145" stroke="#6366f1" strokeWidth="1.8" />

                  {/* Vonalak 1. szint -> 2. szint */}
                  <line x1="90" y1="55" x2="165" y2="30" stroke="#8b5cf6" strokeWidth="1.5" />
                  <line x1="90" y1="55" x2="165" y2="78" stroke="#8b5cf6" strokeWidth="1.5" />
                  <line x1="90" y1="145" x2="165" y2="122" stroke="#8b5cf6" strokeWidth="1.5" />
                  <line x1="90" y1="145" x2="165" y2="170" stroke="#8b5cf6" strokeWidth="1.5" />

                  {/* Vonalak 2. szint -> 3. szint */}
                  <line x1="165" y1="30" x2="240" y2="18" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="30" x2="240" y2="42" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="78" x2="240" y2="66" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="78" x2="240" y2="90" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="122" x2="240" y2="110" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="122" x2="240" y2="134" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="170" x2="240" y2="158" stroke="#a855f7" strokeWidth="1.2" />
                  <line x1="165" y1="170" x2="240" y2="182" stroke="#a855f7" strokeWidth="1.2" />

                  {/* Root node */}
                  <circle cx="25" cy="100" r="10" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                  <text x="25" y="103" className="text-[8px] font-black fill-white" textAnchor="middle">Start</text>

                  {/* 1. szint csomópontok */}
                  <circle cx="90" cy="55" r="11" fill="#4338ca" stroke="#c7d2fe" strokeWidth="1.5" />
                  <text x="90" y="59" className="text-[10px] font-black fill-white" textAnchor="middle">F</text>
                  <circle cx="90" cy="145" r="11" fill="#4338ca" stroke="#c7d2fe" strokeWidth="1.5" />
                  <text x="90" y="149" className="text-[10px] font-black fill-white" textAnchor="middle">Í</text>

                  {/* 2. szint csomópontok */}
                  <circle cx="165" cy="30" r="9" fill="#6d28d9" stroke="#ddd6fe" strokeWidth="1.2" />
                  <text x="165" y="33" className="text-[9px] font-black fill-white" textAnchor="middle">F</text>
                  <circle cx="165" cy="78" r="9" fill="#6d28d9" stroke="#ddd6fe" strokeWidth="1.2" />
                  <text x="165" y="81" className="text-[9px] font-black fill-white" textAnchor="middle">Í</text>
                  <circle cx="165" cy="122" r="9" fill="#6d28d9" stroke="#ddd6fe" strokeWidth="1.2" />
                  <text x="165" y="125" className="text-[9px] font-black fill-white" textAnchor="middle">F</text>
                  <circle cx="165" cy="170" r="9" fill="#6d28d9" stroke="#ddd6fe" strokeWidth="1.2" />
                  <text x="165" y="173" className="text-[9px] font-black fill-white" textAnchor="middle">Í</text>

                  {/* 3. szint végeredmény kártyák */}
                  {[
                    { y: 18, res: 'FFF' },
                    { y: 42, res: 'FFÍ' },
                    { y: 66, res: 'FÍF' },
                    { y: 90, res: 'FÍÍ' },
                    { y: 110, res: 'ÍFF' },
                    { y: 134, res: 'ÍFÍ' },
                    { y: 158, res: 'ÍÍF' },
                    { y: 182, res: 'ÍÍÍ' }
                  ].map((item, idx) => (
                    <g key={`leaf-${idx}`}>
                      <rect x="235" y={item.y - 8} width="46" height="16" rx="4" fill="#10b981" />
                      <text x="258" y={item.y + 4} className="text-[9px] font-black fill-white" textAnchor="middle">
                        {item.res}
                      </text>
                    </g>
                  ))}
                  <text x="295" y="102" className="text-[10px] font-black fill-emerald-600 dark:text-emerald-400" textAnchor="start">
                    &rarr; 8 kimenetel
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Példa 1: Kétjegyű számok képzése" icon={<Hash className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Írjuk fel az összes olyan kétjegyű számot, amely csak az <MathText text="1, 2, 3" /> számjegyekből áll, és a számjegyek <em>különbözőek</em>!
                </p>
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 font-mono text-center text-blue-900 dark:text-blue-200 font-bold">
                  12, 13, 21, 23, 31, 32 &rarr; 6 lehetőség
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Rendszer: Először az 1-essel kezdődőek növekvő sorrendben, majd a 2-essel, végül a 3-assal kezdődőek.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Példa 2: Pénzérmék feldobása" icon={<Scale className="w-4 h-4 text-indigo-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Dobjunk fel háromszor egy pénzérmét (Fej = F, Írás = Í). Hányféle kimenetel lehetséges?
                </p>
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-center text-indigo-900 dark:text-indigo-200 font-bold">
                  FFF, FFÍ, FÍF, FÍÍ, ÍFF, ÍFÍ, ÍÍF, ÍÍÍ &rarr; 8 eset
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Rendszer: Lexikografikus (szótári) sorrend: a Fejekkel kezdődő esetek után következnek az Írással kezdődők.
                </p>
              </div>
            </TheoryCard>
          </div>

          {/* SVG ÁBRA 1C: Két Kockadobás 6×6-os Eseménytér Rácsa */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Dices className="w-4 h-4 text-indigo-600" />
              <span>Szemléltető Ábra: Két Kockadobás 6×6-os Eseménytér Rácsa (6 · 6 = 36 kimenetel)</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 520 310" className="w-full min-w-[480px] h-auto select-none font-sans">
                {/* Fejléc címke: 2. Kocka (Oszlopok) */}
                <rect x="70" y="8" width="430" height="24" rx="6" fill="#eff6ff" stroke="#93c5fd" />
                <text x="285" y="24" className="text-[11px] font-black fill-blue-800" textAnchor="middle">
                  2. KOCKA (Kék kocka eredménye: 1, 2, 3, 4, 5, 6)
                </text>

                {/* Oldalsó címke: 1. Kocka (Sorok) */}
                <rect x="8" y="38" width="54" height="220" rx="6" fill="#fef2f2" stroke="#fca5a5" />
                <text x="35" y="148" className="text-[10px] font-black fill-rose-800" textAnchor="middle" transform="rotate(-90 35 148)">
                  1. KOCKA (Piros)
                </text>

                {/* Oszlopfejlécek 1..6 */}
                {[1, 2, 3, 4, 5, 6].map((col, cIdx) => (
                  <g key={`col-hdr-${col}`}>
                    <rect x={70 + cIdx * 72} y="38" width="68" height="22" rx="4" fill="#dbeafe" stroke="#3b82f6" />
                    <text x={70 + cIdx * 72 + 34} y="53" className="text-[11px] font-black fill-blue-900" textAnchor="middle">
                      {col}
                    </text>
                  </g>
                ))}

                {/* 6x6 Rács sorai és cellái */}
                {[1, 2, 3, 4, 5, 6].map((row, rIdx) => {
                  const y = 65 + rIdx * 32;
                  return (
                    <g key={`row-${row}`}>
                      {/* Sorfejléc */}
                      <rect x="8" y={y} width="54" height="28" rx="4" fill="#fee2e2" stroke="#ef4444" />
                      <text x="35" y={y + 18} className="text-[11px] font-black fill-rose-900" textAnchor="middle">
                        {row}
                      </text>

                      {/* 6 cella a sorban */}
                      {[1, 2, 3, 4, 5, 6].map((col, cIdx) => {
                        const x = 70 + cIdx * 72;
                        const sum = row + col;
                        const isSum7 = sum === 7;
                        const isSum3 = sum === 3;
                        const isDouble = row === col;

                        let fillBg = '#ffffff';
                        let strokeColor = '#e2e8f0';
                        let textFill = '#1e293b';

                        if (isSum7) {
                          fillBg = '#fef3c7'; // sárga kiemelés (leggyakoribb összeg)
                          strokeColor = '#f59e0b';
                          textFill = '#92400e';
                        } else if (isSum3) {
                          fillBg = '#d1fae5'; // zöld kiemelés (összeg = 3)
                          strokeColor = '#10b981';
                          textFill = '#065f46';
                        } else if (isDouble) {
                          fillBg = '#f3e8ff'; // lila (dupla dobások)
                          strokeColor = '#c084fc';
                          textFill = '#6b21a8';
                        }

                        return (
                          <g key={`cell-${row}-${col}`}>
                            <rect
                              x={x}
                              y={y}
                              width="68"
                              height="28"
                              rx="5"
                              fill={fillBg}
                              stroke={strokeColor}
                              strokeWidth={isSum7 || isSum3 ? 1.8 : 1}
                            />
                            <text
                              x={x + 34}
                              y={y + 18}
                              className={`text-[10.5px] ${isSum7 || isSum3 || isDouble ? 'font-black' : 'font-semibold'}`}
                              fill={textFill}
                              textAnchor="middle"
                            >
                              ({row}; {col})
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}

                {/* Jelmagyarázat */}
                <rect x="8" y="265" width="492" height="38" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
                <g transform="translate(18, 275)">
                  {/* Zöld magyarázat */}
                  <rect x="0" y="2" width="14" height="14" rx="3" fill="#d1fae5" stroke="#10b981" />
                  <text x="20" y="13" className="text-[9.5px] font-bold fill-emerald-800">
                    Zöld: Összeg = 3 [(1;2) és (2;1) &rarr; 2 eset]
                  </text>

                  {/* Sárga magyarázat */}
                  <rect x="195" y="2" width="14" height="14" rx="3" fill="#fef3c7" stroke="#f59e0b" />
                  <text x="215" y="13" className="text-[9.5px] font-bold fill-amber-800">
                    Sárga: Összeg = 7 [Átló mentén 6 eset &rarr; leggyakoribb]
                  </text>

                  {/* Lila magyarázat */}
                  <rect x="375" y="2" width="14" height="14" rx="3" fill="#f3e8ff" stroke="#c084fc" />
                  <text x="395" y="13" className="text-[9.5px] font-bold fill-purple-800">
                    Lila: Páros dobás (6 eset)
                  </text>
                </g>
              </svg>
            </div>
            <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300">
              A kockák megkülönböztethetőek: az (1; 2) és a (2; 1) két különböző elemi kimenetel! Összesen:{' '}
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">6 · 6 = 36 kimenetel</span>.
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. FEJEZET: A FADIAGRAM (DÖNTÉSI FA) ÉS GRÁFMODELLEK
          ========================================================================= */}
      <TheorySection
        number={2}
        title="A Fadiagram (Döntési Fa) és Gráfmodellek"
        badge="Szemléltetés"
        badgeColor="indigo"
        icon={<GitFork className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A <strong>fadiagram</strong> (vagy ágrajz, döntési fa) a lehetőségek feltérképezésének leghatékonyabb vizuális eszköze. Egy pontból (a gyökérből) indul ki, és minden egyes döntési lépés egy új szintet, új elágazást jelent a fán.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">1. Döntési Szint</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Első választás</div>
              <div className="text-[11px] text-slate-500 mt-1">A fa fő ágai (pl. levesek száma)</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">2. Döntési Szint</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Második választás</div>
              <div className="text-[11px] text-slate-500 mt-1">Minden ág tovább ágazik (főételek)</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Levelek (Kimenetelek)</div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Végső utak</div>
              <div className="text-[11px] text-slate-500 mt-1">Az összes lehetőség száma</div>
            </div>
          </div>

          {/* SVG ÁBRA 2: Komplett 3-szintes Éttermi Fadiagram */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Utensils className="w-4 h-4 text-indigo-600" />
              <span>Szemléltető Ábra: Teljes 3-Szintes Menü Fadiagram (2 leves × 3 főétel × 2 desszert = 12 menü)</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 740 330" className="w-full min-w-[680px] h-auto select-none font-sans">
                {/* Szint Fejlécek */}
                <rect x="20" y="8" width="80" height="20" rx="4" fill="#e0e7ff" />
                <text x="60" y="22" className="text-[10px] font-black fill-indigo-800" textAnchor="middle">START</text>

                <rect x="130" y="8" width="120" height="20" rx="4" fill="#dbeafe" />
                <text x="190" y="22" className="text-[10px] font-black fill-blue-800" textAnchor="middle">1. LEVESEK (2)</text>

                <rect x="290" y="8" width="140" height="20" rx="4" fill="#ede9fe" />
                <text x="360" y="22" className="text-[10px] font-black fill-purple-800" textAnchor="middle">2. FŐÉTELEK (3)</text>

                <rect x="470" y="8" width="120" height="20" rx="4" fill="#fae8ff" />
                <text x="530" y="22" className="text-[10px] font-black fill-fuchsia-800" textAnchor="middle">3. DESSZERT (2)</text>

                <rect x="615" y="8" width="115" height="20" rx="4" fill="#dcfce7" />
                <text x="672" y="22" className="text-[10px] font-black fill-emerald-800" textAnchor="middle">12 KIMENETEL</text>

                {/* Vonalak Start -> Levesek */}
                <path d="M 60 170 C 100 170, 110 95, 150 95" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M 60 170 C 100 170, 110 245, 150 245" fill="none" stroke="#3b82f6" strokeWidth="2" />

                {/* Start node */}
                <circle cx="60" cy="170" r="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
                <text x="60" y="174" className="text-[10px] font-black fill-white" textAnchor="middle">Ebéd</text>

                {/* Leves 1: Húsleves (y = 95) */}
                <g>
                  <rect x="135" y="80" width="80" height="30" rx="8" fill="#2563eb" />
                  <text x="175" y="99" className="text-[11px] font-black fill-white" textAnchor="middle">Húsleves</text>
                  {/* Ágak Húsleves -> 3 főétel */}
                  <path d="M 215 95 C 255 95, 265 55, 300 55" fill="none" stroke="#8b5cf6" strokeWidth="1.6" />
                  <path d="M 215 95 C 255 95, 265 95, 300 95" fill="none" stroke="#8b5cf6" strokeWidth="1.6" />
                  <path d="M 215 95 C 255 95, 265 135, 300 135" fill="none" stroke="#8b5cf6" strokeWidth="1.6" />
                </g>

                {/* Leves 2: Gulyásleves (y = 245) */}
                <g>
                  <rect x="135" y="230" width="80" height="30" rx="8" fill="#2563eb" />
                  <text x="175" y="249" className="text-[11px] font-black fill-white" textAnchor="middle">Gulyásleves</text>
                  {/* Ágak Gulyásleves -> 3 főétel */}
                  <path d="M 215 245 C 255 245, 265 205, 300 205" fill="none" stroke="#8b5cf6" strokeWidth="1.6" />
                  <path d="M 215 245 C 255 245, 265 245, 300 245" fill="none" stroke="#8b5cf6" strokeWidth="1.6" />
                  <path d="M 215 245 C 255 245, 265 285, 300 285" fill="none" stroke="#8b5cf6" strokeWidth="1.6" />
                </g>

                {/* 6 Főétel csomópont és ágaik */}
                {[
                  { y: 55, name: 'Rántott sajt' },
                  { y: 95, name: 'Pörkölt' },
                  { y: 135, name: 'Cézár saláta' },
                  { y: 205, name: 'Rántott sajt' },
                  { y: 245, name: 'Pörkölt' },
                  { y: 285, name: 'Cézár saláta' }
                ].map((main, idx) => (
                  <g key={`main-branch-${idx}`}>
                    <rect x="300" y={main.y - 12} width="85" height="24" rx="6" fill="#7c3aed" />
                    <text x="342" y={main.y + 4} className="text-[9.5px] font-bold fill-white" textAnchor="middle">
                      {main.name}
                    </text>
                    {/* Ágak tovább 2 desszertre */}
                    <path
                      d={`M 385 ${main.y} C 420 ${main.y}, 435 ${main.y - 10}, 465 ${main.y - 10}`}
                      fill="none"
                      stroke="#d946ef"
                      strokeWidth="1.2"
                    />
                    <path
                      d={`M 385 ${main.y} C 420 ${main.y}, 435 ${main.y + 10}, 465 ${main.y + 10}`}
                      fill="none"
                      stroke="#d946ef"
                      strokeWidth="1.2"
                    />
                  </g>
                ))}

                {/* 12 Desszert csomópont és végeredmény kártyák */}
                {[
                  { y: 45, d: 'Fagylalt', tag: 'Menü 1: H-R-F' },
                  { y: 65, d: 'Somlói', tag: 'Menü 2: H-R-S' },
                  { y: 85, d: 'Fagylalt', tag: 'Menü 3: H-P-F' },
                  { y: 105, d: 'Somlói', tag: 'Menü 4: H-P-S' },
                  { y: 125, d: 'Fagylalt', tag: 'Menü 5: H-C-F' },
                  { y: 145, d: 'Somlói', tag: 'Menü 6: H-C-S' },
                  { y: 195, d: 'Fagylalt', tag: 'Menü 7: G-R-F' },
                  { y: 215, d: 'Somlói', tag: 'Menü 8: G-R-S' },
                  { y: 235, d: 'Fagylalt', tag: 'Menü 9: G-P-F' },
                  { y: 255, d: 'Somlói', tag: 'Menü 10: G-P-S' },
                  { y: 275, d: 'Fagylalt', tag: 'Menü 11: G-C-F' },
                  { y: 295, d: 'Somlói', tag: 'Menü 12: G-C-S' }
                ].map((item, idx) => (
                  <g key={`dessert-leaf-${idx}`}>
                    <rect x="465" y={item.y - 8} width="65" height="16" rx="4" fill="#c026d3" />
                    <text x="497" y={item.y + 4} className="text-[8.5px] font-bold fill-white" textAnchor="middle">
                      {item.d}
                    </text>
                    <line x1="530" y1={item.y} x2="615" y2={item.y} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                    <rect x="615" y={item.y - 8} width="95" height="16" rx="4" fill="#10b981" />
                    <text x="662" y={item.y + 4} className="text-[8px] font-black fill-white" textAnchor="middle">
                      {item.tag}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* SVG ÁBRA 3: Városok és Útvonalak Gráfmodellje */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Városok és Útvonalak Gráfmodellje (3 × 4 = 12 útvonal)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 540 180" className="w-full max-w-xl h-auto select-none">
                <defs>
                  <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                  </marker>
                  <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                  </marker>
                </defs>

                {/* 3 út A-ból B-be */}
                <path d="M 95 90 C 160 30, 210 30, 275 90" fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue)" />
                <path d="M 95 90 L 275 90" fill="none" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
                <path d="M 95 90 C 160 150, 210 150, 275 90" fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue)" />

                <text x="185" y="45" className="text-[10px] font-black fill-blue-700">1. út</text>
                <text x="185" y="82" className="text-[10px] font-black fill-blue-700">2. út</text>
                <text x="185" y="145" className="text-[10px] font-black fill-blue-700">3. út</text>

                {/* 4 út B-ből C-be */}
                <path d="M 285 90 C 340 20, 395 20, 450 90" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowPurple)" />
                <path d="M 285 90 C 340 60, 395 60, 450 90" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowPurple)" />
                <path d="M 285 90 C 340 120, 395 120, 450 90" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowPurple)" />
                <path d="M 285 90 C 340 160, 395 160, 450 90" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowPurple)" />

                <text x="365" y="35" className="text-[10px] font-black fill-purple-700">a út</text>
                <text x="365" y="68" className="text-[10px] font-black fill-purple-700">b út</text>
                <text x="365" y="125" className="text-[10px] font-black fill-purple-700">c út</text>
                <text x="365" y="155" className="text-[10px] font-black fill-purple-700">d út</text>

                {/* Város Csomópontok */}
                <circle cx="90" cy="90" r="24" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="3" />
                <text x="90" y="88" className="text-[12px] font-black fill-white" textAnchor="middle">„A”</text>
                <text x="90" y="103" className="text-[8px] font-bold fill-blue-200" textAnchor="middle">Budapest</text>

                <circle cx="280" cy="90" r="24" fill="#4c1d95" stroke="#a78bfa" strokeWidth="3" />
                <text x="280" y="88" className="text-[12px] font-black fill-white" textAnchor="middle">„B”</text>
                <text x="280" y="103" className="text-[8px] font-bold fill-purple-200" textAnchor="middle">Kecskemét</text>

                <circle cx="455" cy="90" r="24" fill="#065f46" stroke="#34d399" strokeWidth="3" />
                <text x="455" y="88" className="text-[12px] font-black fill-white" textAnchor="middle">„C”</text>
                <text x="455" y="103" className="text-[8px] font-bold fill-emerald-200" textAnchor="middle">Szeged</text>
              </svg>
              <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 mt-2">
                Minden A &rarr; B úthoz (3 db) 4 folytatás választható B &rarr; C felé &rarr;{' '}
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">3 · 4 = 12 útvonal</span>
              </div>
            </div>
          </div>

          {/* SVG ÁBRA 2B: Kézfogások és Körmérkőzések Teljes Gráfmodellje */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Network className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Kézfogások és Körmérkőzések Gráfmodellje (K₄ és K₅ Teljes Gráfok)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Bal oldal: 4 ember kézfogása (K4) */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 text-center">
                  4 barát mindegyike mindenkivel kezet fog (K₄)
                </div>
                <svg viewBox="0 0 240 180" className="w-full max-w-xs h-auto select-none">
                  {/* 6 él a 4 pont között */}
                  <line x1="60" y1="45" x2="180" y2="45" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="180" y1="45" x2="180" y2="135" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="180" y1="135" x2="60" y2="135" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="60" y1="135" x2="60" y2="45" stroke="#3b82f6" strokeWidth="2.5" />
                  <line x1="60" y1="45" x2="180" y2="135" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 2" />
                  <line x1="180" y1="45" x2="60" y2="135" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 2" />

                  {/* 4 csúcs */}
                  <g transform="translate(60, 45)">
                    <circle r="16" fill="#2563eb" stroke="#93c5fd" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">A</text>
                  </g>
                  <g transform="translate(180, 45)">
                    <circle r="16" fill="#2563eb" stroke="#93c5fd" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">B</text>
                  </g>
                  <g transform="translate(180, 135)">
                    <circle r="16" fill="#2563eb" stroke="#93c5fd" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">C</text>
                  </g>
                  <g transform="translate(60, 135)">
                    <circle r="16" fill="#2563eb" stroke="#93c5fd" strokeWidth="2" />
                    <text y="4" className="text-[11px] font-black fill-white" textAnchor="middle">D</text>
                  </g>

                  {/* Élek felirata */}
                  <rect x="75" y="158" width="90" height="18" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
                  <text x="120" y="171" className="text-[10px] font-black fill-blue-900" textAnchor="middle">
                    Élek száma: 6 db
                  </text>
                </svg>
                <div className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 text-center mt-1">
                  Mindenki 3 másikkal: (4 · 3) / 2 = <strong className="text-blue-600 dark:text-blue-400 font-black">6 kézfogás</strong>
                </div>
              </div>

              {/* Jobb oldal: 5 csapat körmérkőzése (K5) */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 text-center">
                  5 csapat körmérkőzése – mindenki mindenkivel (K₅)
                </div>
                <svg viewBox="0 0 240 180" className="w-full max-w-xs h-auto select-none">
                  {/* Belső csillag átlók */}
                  <line x1="120" y1="25" x2="195" y2="135" stroke="#f59e0b" strokeWidth="1.8" />
                  <line x1="120" y1="25" x2="45" y2="135" stroke="#f59e0b" strokeWidth="1.8" />
                  <line x1="205" y1="75" x2="45" y2="135" stroke="#f59e0b" strokeWidth="1.8" />
                  <line x1="205" y1="75" x2="75" y2="160" stroke="#f59e0b" strokeWidth="1.8" />
                  <line x1="195" y1="135" x2="35" y2="75" stroke="#f59e0b" strokeWidth="1.8" />

                  {/* Külső ötszög élek */}
                  <line x1="120" y1="25" x2="205" y2="75" stroke="#10b981" strokeWidth="2.2" />
                  <line x1="205" y1="75" x2="165" y2="155" stroke="#10b981" strokeWidth="2.2" />
                  <line x1="165" y1="155" x2="75" y2="155" stroke="#10b981" strokeWidth="2.2" />
                  <line x1="75" y1="155" x2="35" y2="75" stroke="#10b981" strokeWidth="2.2" />
                  <line x1="35" y1="75" x2="120" y2="25" stroke="#10b981" strokeWidth="2.2" />

                  {/* 5 csúcs */}
                  {[
                    { x: 120, y: 25, label: '1' },
                    { x: 205, y: 75, label: '2' },
                    { x: 165, y: 155, label: '3' },
                    { x: 75, y: 155, label: '4' },
                    { x: 35, y: 75, label: '5' }
                  ].map((node) => (
                    <g key={`k5-node-${node.label}`} transform={`translate(${node.x}, ${node.y})`}>
                      <circle r="14" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                      <text y="4" className="text-[10px] font-black fill-white" textAnchor="middle">{node.label}</text>
                    </g>
                  ))}

                  <rect x="75" y="70" width="90" height="18" rx="4" fill="#ecfdf5" stroke="#a7f3d0" />
                  <text x="120" y="83" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">
                    Élek száma: 10 db
                  </text>
                </svg>
                <div className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-400 text-center mt-1">
                  Mindenki 4 másikkal: (5 · 4) / 2 = <strong className="text-emerald-600 dark:text-emerald-400 font-black">10 mérkőzés</strong>
                </div>
              </div>
            </div>
            <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 pt-1">
              Kapcsolat a Gráfokkal: Amikor a sorrend nem számít (párok kiválasztása), a kézfogások száma az{' '}
              <MathText text="\frac{n(n-1)}{2}" /> képlettel számolható, ami a teljes gráf éleinek felel meg!
            </div>
          </div>

          {/* Interaktív Menüválasztó Fadiagram Labor */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-850 border-2 border-indigo-200/80 dark:border-indigo-900/60 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  Interaktív Menüválasztó Labor
                </h4>
              </div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                Összes menü: <strong className="text-sm">{totalMenus}</strong> féle
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  1. Levesek száma: <span className="text-indigo-600 font-extrabold">{soupCount}</span>
                </label>
                <div className="flex gap-2">
                  {[2, 3].map((num) => (
                    <Button
                      key={`soup-${num}`}
                      size="sm"
                      variant={soupCount === num ? 'default' : 'outline'}
                      onClick={() => setSoupCount(num)}
                      className="flex-1 h-8 text-xs font-bold"
                    >
                      {num} leves
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  2. Főételek száma: <span className="text-indigo-600 font-extrabold">{mainCount}</span>
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4].map((num) => (
                    <Button
                      key={`main-${num}`}
                      size="sm"
                      variant={mainCount === num ? 'default' : 'outline'}
                      onClick={() => setMainCount(num)}
                      className="flex-1 h-8 text-xs font-bold"
                    >
                      {num} főétel
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  3. Desszertek száma: <span className="text-indigo-600 font-extrabold">{dessertCount}</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <Button
                      key={`dessert-${num}`}
                      size="sm"
                      variant={dessertCount === num ? 'default' : 'outline'}
                      onClick={() => setDessertCount(num)}
                      className="flex-1 h-8 text-xs font-bold"
                    >
                      {num} desszert
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-100 dark:border-indigo-900/60 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-slate-600 dark:text-slate-400">
                A fadiagram ágainak matematikai felírása:
              </span>
              <div className="font-mono font-black text-indigo-700 dark:text-indigo-300 text-sm">
                <MathText text={`${soupCount} \\times ${mainCount} \\times ${dessertCount} = ${totalMenus}`} /> különböző 3-fogásos ebéd
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. FEJEZET: A SZORZÁSI SZABÁLY (MULTIPLIKATÍV ELV)
          ========================================================================= */}
      <TheorySection
        number={3}
        title="A Szorzási Szabály (Multiplikatív Elv)"
        badge="Alaptétel"
        badgeColor="purple"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Gyakran a lehetőségek száma több száz, több ezer vagy akár több millió. Ilyenkor a fadiagramot fizikailag már nem lehet lerajzolni, viszont a struktúrájából levezethető az általános <strong>szorzási szabály</strong>.
          </p>

          <TheoryCallout
            title="A Szorzási Szabály Pontos Megfogalmazása"
            type="info"
            icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          >
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                Ha egy összetett folyamat <MathText text="k" /> egymást követő független döntésből áll, ahol:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>az 1. döntést <MathText text="n_1" />-féleképpen hozhatjuk meg,</li>
                <li>a 2. döntést az 1. döntéstől függetlenül <MathText text="n_2" />-féleképpen,</li>
                <li>és így tovább, a <MathText text="k" />-adik döntést <MathText text="n_k" />-féleképpen,</li>
              </ul>
              <p className="pt-1 font-semibold text-purple-900 dark:text-purple-200">
                akkor a teljes folyamatot együttesen <MathText text="n_1 \cdot n_2 \cdot \dots \cdot n_k" /> féleképpen választhatjuk meg.
              </p>
            </div>
          </TheoryCallout>

          {/* SVG ÁBRA 4: Helyiértékes Dobozmodell (Slot Model) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Hash className="w-4 h-4 text-purple-600" />
              <span>Szemléltető Ábra: Helyiértékes Dobozmodell (Ismétlés nélkül vs. Ismétléssel)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 520 220" className="w-full max-w-lg h-auto select-none font-sans">
                {/* 1. Eset: Különböző számjegyek (5 x 4 x 3 = 60) */}
                <rect x="15" y="10" width="490" height="95" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
                <text x="35" y="32" className="text-[11px] font-black fill-indigo-900">
                  A) Ismétlés nélkül az &#123;1, 2, 3, 4, 5&#125; jegyekből (Fogyó választék):
                </text>

                {/* 1. doboz */}
                <rect x="40" y="45" width="85" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                <text x="82" y="66" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">Százasok</text>
                <text x="82" y="85" className="text-[16px] font-black fill-blue-900" textAnchor="middle">5</text>

                <text x="145" y="74" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* 2. doboz */}
                <rect x="165" y="45" width="85" height="48" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
                <text x="207" y="66" className="text-[10px] font-bold fill-purple-700" textAnchor="middle">Tízesek</text>
                <text x="207" y="85" className="text-[16px] font-black fill-purple-900" textAnchor="middle">4</text>

                <text x="270" y="74" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* 3. doboz */}
                <rect x="290" y="45" width="85" height="48" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
                <text x="332" y="66" className="text-[10px] font-bold fill-pink-700" textAnchor="middle">Egyesek</text>
                <text x="332" y="85" className="text-[16px] font-black fill-pink-900" textAnchor="middle">3</text>

                <text x="395" y="74" className="text-[18px] font-black fill-slate-400" textAnchor="middle">=</text>

                {/* Eredmény */}
                <rect x="415" y="45" width="75" height="48" rx="8" fill="#10b981" />
                <text x="452" y="66" className="text-[9px] font-bold fill-emerald-100" textAnchor="middle">Összesen</text>
                <text x="452" y="86" className="text-[16px] font-black fill-white" textAnchor="middle">60 db</text>

                {/* 2. Eset: Ismétlődés megengedett (5 x 5 x 5 = 125) */}
                <rect x="15" y="115" width="490" height="95" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
                <text x="35" y="137" className="text-[11px] font-black fill-indigo-900">
                  B) Ismétlés megengedett az &#123;1, 2, 3, 4, 5&#125; jegyekből (Állandó választék):
                </text>

                {/* 1. doboz */}
                <rect x="40" y="150" width="85" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <text x="82" y="171" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">Százasok</text>
                <text x="82" y="190" className="text-[16px] font-black fill-blue-900" textAnchor="middle">5</text>

                <text x="145" y="179" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* 2. doboz */}
                <rect x="165" y="150" width="85" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <text x="207" y="171" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">Tízesek</text>
                <text x="207" y="190" className="text-[16px] font-black fill-blue-900" textAnchor="middle">5</text>

                <text x="270" y="179" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* 3. doboz */}
                <rect x="290" y="150" width="85" height="48" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <text x="332" y="171" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">Egyesek</text>
                <text x="332" y="190" className="text-[16px] font-black fill-blue-900" textAnchor="middle">5</text>

                <text x="395" y="179" className="text-[18px] font-black fill-slate-400" textAnchor="middle">=</text>

                {/* Eredmény */}
                <rect x="415" y="150" width="75" height="48" rx="8" fill="#2563eb" />
                <text x="452" y="171" className="text-[9px] font-bold fill-blue-100" textAnchor="middle">Összesen</text>
                <text x="452" y="191" className="text-[16px] font-black fill-white" textAnchor="middle">125 db</text>
              </svg>
            </div>
          </div>

          {/* SVG ÁBRA 3B: Verseny Dobogója – Helyezések Dobozmodellje */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Szemléltető Ábra: Verseny Dobogója – Helyezések Sorrendje (4 versenyzőből az 1-3. helyezett)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 540 220" className="w-full max-w-xl h-auto select-none font-sans">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fdba74" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>

                {/* Felső magyarázó sáv: Versenyzők és választási lépések */}
                <rect x="20" y="8" width="500" height="34" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
                <text x="35" y="29" className="text-[11px] font-black fill-blue-900">
                  4 versenyző (A, B, C, D): Minden helyre 1-gyel kevesebb szabad jelölt jut:
                </text>
                <text x="495" y="29" className="text-[12px] font-black fill-indigo-700" textAnchor="end">
                  4 · 3 · 2 = 24 sorrend
                </text>

                {/* 2. Hely (Ezüst dobogó) - Bal oldal */}
                <g>
                  <rect x="80" y="105" width="115" height="95" rx="8" fill="url(#silverGrad)" stroke="#475569" strokeWidth="1.5" />
                  {/* Érem kör */}
                  <circle cx="137" cy="85" r="16" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
                  <text x="137" y="90" className="text-[12px] font-black fill-slate-800" textAnchor="middle">2</text>
                  <text x="137" y="130" className="text-[13px] font-black fill-white" textAnchor="middle">II. HELY</text>
                  <text x="137" y="148" className="text-[10px] font-bold fill-slate-100" textAnchor="middle">Ezüstérem</text>
                  <rect x="95" y="160" width="85" height="24" rx="6" fill="#334155" />
                  <text x="137" y="176" className="text-[11px] font-black fill-white" textAnchor="middle">3 lehetőség</text>
                </g>

                {/* 1. Hely (Arany dobogó) - Közép */}
                <g>
                  <rect x="212" y="70" width="120" height="130" rx="8" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="2" />
                  {/* Érem kör */}
                  <circle cx="272" cy="50" r="18" fill="#fef08a" stroke="#d97706" strokeWidth="2.5" />
                  <text x="272" y="56" className="text-[14px] font-black fill-amber-900" textAnchor="middle">1</text>
                  <text x="272" y="100" className="text-[14px] font-black fill-white" textAnchor="middle">I. HELY</text>
                  <text x="272" y="118" className="text-[10px] font-bold fill-amber-100" textAnchor="middle">Aranyérem</text>
                  <rect x="227" y="135" width="90" height="26" rx="6" fill="#78350f" />
                  <text x="272" y="152" className="text-[11.5px] font-black fill-white" textAnchor="middle">4 lehetőség</text>
                </g>

                {/* 3. Hely (Bronz dobogó) - Jobb oldal */}
                <g>
                  <rect x="348" y="125" width="115" height="75" rx="8" fill="url(#bronzeGrad)" stroke="#78350f" strokeWidth="1.5" />
                  {/* Érem kör */}
                  <circle cx="405" cy="105" r="15" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
                  <text x="405" y="110" className="text-[11px] font-black fill-amber-950" textAnchor="middle">3</text>
                  <text x="405" y="148" className="text-[12.5px] font-black fill-white" textAnchor="middle">III. HELY</text>
                  <text x="405" y="163" className="text-[9.5px] font-bold fill-amber-100" textAnchor="middle">Bronzérem</text>
                  <rect x="363" y="170" width="85" height="22" rx="6" fill="#431407" />
                  <text x="405" y="185" className="text-[10.5px] font-black fill-white" textAnchor="middle">2 lehetőség</text>
                </g>

                {/* Földvonal */}
                <line x1="40" y1="200" x2="500" y2="200" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 mt-2">
                A sorrend számít! Az 1. helyre 4-en pályáznak, a 2. helyre a maradék 3 futó, a 3. helyre 2 futó: {' '}
                <span className="font-mono text-purple-600 dark:text-purple-400 font-black">4 · 3 · 2 = 24 lehetséges dobogó</span>.
              </div>
            </div>
          </div>

          {/* Interaktív Kód- és Számképző Labor */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/60 via-slate-50 to-indigo-50/50 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-850 border-2 border-purple-200/80 dark:border-purple-900/60 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 dark:border-purple-900/40 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                  Interaktív Szám- és Kódgeneráló Szimulátor
                </h4>
              </div>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                Elkészíthető számok: <strong className="text-sm">{calculateNumbersCount()}</strong> db
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Elérhető jegyek:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((digit) => {
                    const isSelected = digitsAllowed.includes(digit);
                    return (
                      <button
                        key={`digit-${digit}`}
                        onClick={() => {
                          if (isSelected && digitsAllowed.length > 2) {
                            setDigitsAllowed(digitsAllowed.filter((d) => d !== digit));
                          } else if (!isSelected) {
                            setDigitsAllowed([...digitsAllowed, digit].sort());
                          }
                        }}
                        className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {digit}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Számjegyek hossza:
                </label>
                <div className="flex gap-2">
                  {[2, 3, 4].map((len) => (
                    <Button
                      key={`len-${len}`}
                      size="sm"
                      variant={numberLength === len ? 'default' : 'outline'}
                      onClick={() => setNumberLength(len)}
                      className="flex-1 h-8 text-xs font-bold"
                    >
                      {len}-jegyű
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Ismétlődés megengedett?
                </label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={allowRepetition ? 'default' : 'outline'}
                    onClick={() => setAllowRepetition(true)}
                    className="flex-1 h-8 text-xs font-bold"
                  >
                    Igen (pl. 222)
                  </Button>
                  <Button
                    size="sm"
                    variant={!allowRepetition ? 'default' : 'outline'}
                    onClick={() => setAllowRepetition(false)}
                    className="flex-1 h-8 text-xs font-bold"
                  >
                    Nem (különböző)
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-purple-100 dark:border-purple-900/60 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">Képlet levezetése:</div>
              <div className="font-mono text-purple-700 dark:text-purple-300 text-xs sm:text-sm">
                {allowRepetition ? (
                  <span>
                    Minden helyre {digitsAllowed.length} lehetőség: {' '}
                    <MathText
                      text={`${Array(numberLength).fill(digitsAllowed.length).join(' \\cdot ')} = ${digitsAllowed.length}^{${numberLength}} = ${calculateNumbersCount()}`}
                    />
                  </span>
                ) : (
                  <span>
                    Egyre kevesebb szabad jegy: {' '}
                    <MathText
                      text={`${Array.from({ length: numberLength }, (_, i) => Math.max(0, digitsAllowed.length - i)).join(' \\cdot ')} = ${calculateNumbersCount()}`}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. FEJEZET: AZ ÖSSZEADÁSI SZABÁLY (ADDITÍV ELV)
          ========================================================================= */}
      <TheorySection
        number={4}
        title="Az Összeadási Szabály (Additív Elv)"
        badge="Esetszétválasztás"
        badgeColor="emerald"
        icon={<Layers className="w-5 h-5 text-emerald-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Míg a szorzási szabályt akkor alkalmazzuk, ha döntéseket <strong>egymás után, együtt</strong> hozunk meg (ÉS kapcsolat), addig az <strong>összeadási szabályt</strong> akkor használjuk, ha egymást kizáró <strong>alternatívák közül választhatunk</strong> (VAGY kapcsolat).
          </p>

          <TheoryCallout
            title="Az Összeadási Szabály Feltétele"
            type="warning"
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          >
            <p className="text-xs sm:text-sm leading-relaxed">
              Csak akkor adhatjuk össze az esetek számát, ha az esetek <strong>egymást páronként kizárják</strong> (nincs olyan kimenetel, amely egyszerre több kategóriába is beletartozna)!
            </p>
          </TheoryCallout>

          {/* SVG ÁBRA 5: Soros (ÉS, Szorzás) vs. Párhuzamos (VAGY, Összeadás) Döntési Hálózat */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Network className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Soros Döntési Lánc (Szorzás) vs. Párhuzamos Alternatívák (Összeadás)</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
              <svg viewBox="0 0 540 220" className="w-full max-w-xl h-auto select-none font-sans">
                <defs>
                  <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#059669" />
                  </marker>
                  <marker id="arrowBlue2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                  </marker>
                </defs>

                {/* 1. Modell: Szorzási szabály (Soros) */}
                <rect x="10" y="8" width="520" height="95" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
                <text x="25" y="27" className="text-[11px] font-black fill-blue-900">
                  A) SZORZÁSI SZABÁLY (ÉS kapcsolat – Soros döntési lánc):
                </text>

                <circle cx="50" cy="62" r="14" fill="#1e40af" />
                <text x="50" y="66" className="text-[9px] font-bold fill-white" textAnchor="middle">Kezdés</text>

                <line x1="64" y1="62" x2="115" y2="62" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue2)" />

                <rect x="115" y="42" width="115" height="40" rx="6" fill="#3b82f6" />
                <text x="172" y="58" className="text-[10px] font-bold fill-blue-100" textAnchor="middle">1. Döntés</text>
                <text x="172" y="74" className="text-[12px] font-black fill-white" textAnchor="middle">n₁ lehetőség</text>

                <line x1="230" y1="62" x2="280" y2="62" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue2)" />

                <rect x="280" y="42" width="115" height="40" rx="6" fill="#2563eb" />
                <text x="337" y="58" className="text-[10px] font-bold fill-blue-100" textAnchor="middle">2. Döntés</text>
                <text x="337" y="74" className="text-[12px] font-black fill-white" textAnchor="middle">n₂ lehetőség</text>

                <line x1="395" y1="62" x2="435" y2="62" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue2)" />

                <rect x="435" y="42" width="85" height="40" rx="6" fill="#1e3a8a" />
                <text x="477" y="58" className="text-[9px] font-bold fill-blue-200" textAnchor="middle">Kimenetelek</text>
                <text x="477" y="74" className="text-[12px] font-black fill-white" textAnchor="middle">n₁ · n₂</text>

                {/* 2. Modell: Összeadási szabály (Párhuzamos) */}
                <rect x="10" y="115" width="520" height="98" rx="8" fill="#ecfdf5" stroke="#a7f3d0" />
                <text x="25" y="134" className="text-[11px] font-black fill-emerald-900">
                  B) ÖSSZEADÁSI SZABÁLY (VAGY kapcsolat – Egymást kizáró alternatív utak):
                </text>

                <circle cx="50" cy="170" r="14" fill="#065f46" />
                <text x="50" y="174" className="text-[9px] font-bold fill-white" textAnchor="middle">Kezdés</text>

                {/* Elágazás 2 ágra */}
                <path d="M 64 170 C 95 170, 110 150, 140 150" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                <path d="M 64 170 C 95 170, 110 190, 140 190" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowGreen)" />

                <rect x="140" y="135" width="170" height="28" rx="6" fill="#10b981" />
                <text x="225" y="153" className="text-[11px] font-bold fill-white" textAnchor="middle">„A” út (pl. 4 vonatjárat: n₁ = 4)</text>

                <rect x="140" y="175" width="170" height="28" rx="6" fill="#059669" />
                <text x="225" y="193" className="text-[11px] font-bold fill-white" textAnchor="middle">„B” út (pl. 3 buszjárat: n₂ = 3)</text>

                {/* Becsatlakozás */}
                <path d="M 310 150 C 350 150, 370 170, 410 170" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowGreen)" />
                <path d="M 310 190 C 350 190, 370 170, 410 170" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowGreen)" />

                <rect x="410" y="148" width="110" height="44" rx="6" fill="#064e3b" />
                <text x="465" y="166" className="text-[9px] font-bold fill-emerald-200" textAnchor="middle">Összes lehetőség</text>
                <text x="465" y="184" className="text-[12px] font-black fill-white" textAnchor="middle">n₁ + n₂ = 7</text>
              </svg>
            </div>
          </div>

          {/* SVG ÁBRA 4B: Halmazábrák (Venn-diagramok) – Diszjunkt vs. Metsző Halmazok */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs sm:text-sm">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Szemléltető Ábra: Halmazábrák (Venn-diagramok) – Összeadási Szabály vs. Logikai Szita</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Bal oldal: Diszjunkt halmazok */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 text-center">
                  A) Diszjunkt halmazok (A ∩ B = ∅) &rarr; Tiszta összeadás
                </div>
                <svg viewBox="0 0 250 170" className="w-full max-w-xs h-auto select-none">
                  {/* Kör A: Vonat */}
                  <circle cx="70" cy="80" r="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
                  <text x="70" y="70" className="text-[12px] font-black fill-blue-900" textAnchor="middle">„A” Halmaz</text>
                  <text x="70" y="86" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">Vonatok</text>
                  <text x="70" y="104" className="text-[14px] font-black fill-blue-950" textAnchor="middle">|A| = 4</text>

                  {/* Kör B: Busz */}
                  <circle cx="180" cy="80" r="45" fill="#d1fae5" stroke="#059669" strokeWidth="2.5" />
                  <text x="180" y="70" className="text-[12px] font-black fill-emerald-900" textAnchor="middle">„B” Halmaz</text>
                  <text x="180" y="86" className="text-[10px] font-bold fill-emerald-700" textAnchor="middle">Buszok</text>
                  <text x="180" y="104" className="text-[14px] font-black fill-emerald-950" textAnchor="middle">|B| = 3</text>

                  {/* Közös rész jelzés: üres */}
                  <text x="125" y="145" className="text-[9.5px] font-extrabold fill-slate-500" textAnchor="middle">
                    Nincs közös elem (A ∩ B = ∅)
                  </text>
                  <rect x="30" y="148" width="190" height="18" rx="4" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="125" y="161" className="text-[10px] font-black fill-blue-900" textAnchor="middle">
                    |A ∪ B| = 4 + 3 = 7 lehetőség
                  </text>
                </svg>
              </div>

              {/* Jobb oldal: Metsző halmazok és Logikai Szita */}
              <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1 text-center">
                  B) Metsző halmazok (A ∩ B ≠ ∅) &rarr; Logikai Szita Elv
                </div>
                <svg viewBox="0 0 250 170" className="w-full max-w-xs h-auto select-none">
                  <defs>
                    <clipPath id="circleClipA">
                      <circle cx="95" cy="75" r="48" />
                    </clipPath>
                  </defs>

                  {/* Kör A (bal) */}
                  <circle cx="95" cy="75" r="48" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />

                  {/* Kör B (jobb) */}
                  <circle cx="155" cy="75" r="48" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />

                  {/* Metszet kiemelése sárgával */}
                  <circle cx="155" cy="75" r="48" clipPath="url(#circleClipA)" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />

                  {/* Feliratok A és B */}
                  <text x="65" y="65" className="text-[11px] font-black fill-purple-900" textAnchor="middle">Angol</text>
                  <text x="65" y="80" className="text-[9px] font-bold fill-purple-700" textAnchor="middle">csak: 7</text>

                  <text x="185" y="65" className="text-[11px] font-black fill-pink-900" textAnchor="middle">Német</text>
                  <text x="185" y="80" className="text-[9px] font-bold fill-pink-700" textAnchor="middle">csak: 5</text>

                  {/* Metszet felirat */}
                  <text x="125" y="73" className="text-[10px] font-black fill-amber-900" textAnchor="middle">Mind-</text>
                  <text x="125" y="85" className="text-[10px] font-black fill-amber-900" textAnchor="middle">kettő: 3</text>

                  {/* Képlet felirat */}
                  <rect x="15" y="135" width="220" height="30" rx="6" fill="#fef9c3" stroke="#facc15" />
                  <text x="125" y="148" className="text-[9.5px] font-bold fill-amber-900" textAnchor="middle">
                    A metszetet nem számolhatjuk kétszer!
                  </text>
                  <text x="125" y="161" className="text-[10px] font-black fill-amber-950" textAnchor="middle">
                    |A ∪ B| = 10 + 8 - 3 = 15 fő
                  </text>
                </svg>
              </div>
            </div>
            <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300 pt-1">
              Kapcsolat a Halmazokkal: Egymást kizáró alternatíváknál (diszjunkt) összeadunk. Ha van átfedés, a duplán számolt közös részt le kell vonni: <MathText text="|A \cup B| = |A| + |B| - |A \cap B|" />.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Példa 1: Utazás Szegedre" icon={<MapPin className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Budapestről Szegedre délelőtt <MathText text="4" /> különböző vonat és <MathText text="3" /> közvetlen buszjárat indul. Hányféle járművel utazhatunk?
                </p>
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-center text-emerald-900 dark:text-emerald-200 font-bold">
                  4 (vonat) + 3 (busz) = 7 lehetőség
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Mivel egy utazás során vagy vonattal, vagy busszal megyünk (egymást kizáró események), a lehetőségek összeadódnak.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Példa 2: Vegyes Alkalmazás (Szorzás + Összeadás)" icon={<Shuffle className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-2 text-xs">
                <p>
                  Hány olyan kétjegyű szám van, amely <MathText text="5" />-tel osztható?
                </p>
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 font-mono text-center text-blue-900 dark:text-blue-200 font-bold text-[11px]">
                  1. eset: 0-ra végződik (9 · 1 = 9) <br />
                  2. eset: 5-re végződik (9 · 1 = 9) <br />
                  Összesen: 9 + 9 = 18 db szám
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  Az egyes eseteken belül szorzási szabályt, a két diszjunkt eset között pedig összeadási szabályt alkalmazunk!
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. FEJEZET: TIPIKUS CSAPDÁK ÉS GYAKORI HIBÁK
          ========================================================================= */}
      <TheorySection
        number={5}
        title="Tipikus Csapdák és Gyakori Hibák"
        badge="Figyelem"
        badgeColor="rose"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm">
          {/* SVG ÁBRA 6: A Nulla mint Kezdőjegy Csapdája */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-900/60 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Szemléltető Ábra: A Nulla (0) Megkötése Többjegyű Számoknál</span>
            </div>

            <div className="bg-rose-50/50 dark:bg-slate-850 p-3 rounded-xl border border-rose-200 dark:border-rose-900/40 flex flex-col items-center">
              <svg viewBox="0 0 500 135" className="w-full max-w-md h-auto select-none font-sans">
                {/* 1. pozíció: Százasok */}
                <rect x="25" y="20" width="115" height="75" rx="8" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
                <text x="82" y="38" className="text-[10px] font-bold fill-rose-700" textAnchor="middle">1. Százasok helye</text>
                <text x="82" y="60" className="text-[13px] font-black fill-slate-800" textAnchor="middle">&#123;1, 2, 3&#125; &rarr; 3 db</text>
                {/* 0 tiltás */}
                <rect x="35" y="68" width="95" height="20" rx="4" fill="#ffe4e6" stroke="#f43f5e" />
                <text x="82" y="82" className="text-[9.5px] font-extrabold fill-rose-800" textAnchor="middle">❌ 0 TILOS (nem 3-jegyű!)</text>

                <text x="160" y="62" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* 2. pozíció: Tízesek */}
                <rect x="180" y="20" width="115" height="75" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
                <text x="237" y="38" className="text-[10px] font-bold fill-emerald-700" textAnchor="middle">2. Tízesek helye</text>
                <text x="237" y="60" className="text-[13px] font-black fill-slate-800" textAnchor="middle">Maradék 3 db</text>
                {/* 0 engedélyezve */}
                <rect x="190" y="68" width="95" height="20" rx="4" fill="#dcfce7" stroke="#22c55e" />
                <text x="237" y="82" className="text-[9.5px] font-extrabold fill-emerald-800" textAnchor="middle">✓ A 0 már bejöhet!</text>

                <text x="315" y="62" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* 3. pozíció: Egyesek */}
                <rect x="335" y="20" width="75" height="75" rx="8" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
                <text x="372" y="38" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">3. Egyesek</text>
                <text x="372" y="64" className="text-[16px] font-black fill-blue-900" textAnchor="middle">2 db</text>
                <text x="372" y="82" className="text-[8.5px] font-semibold fill-slate-500" textAnchor="middle">maradék</text>

                <text x="430" y="62" className="text-[18px] font-black fill-slate-400" textAnchor="middle">=</text>

                {/* Eredmény */}
                <rect x="445" y="32" width="50" height="50" rx="8" fill="#059669" />
                <text x="470" y="62" className="text-[15px] font-black fill-white" textAnchor="middle">18</text>
              </svg>
              <div className="text-[11px] font-bold text-rose-800 dark:text-rose-300 mt-1">
                3-jegyű számok száma a &#123;0, 1, 2, 3&#125; különböző jegyekből: 3 · 3 · 2 = 18 db (nem pedig 4 · 3 · 2 = 24)!
              </div>
            </div>
          </div>

          {/* SVG ÁBRA 5B: Megkötéses Számalkotás – Feltétel Vizsgálata Hátulról Előre */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Szemléltető Ábra: Megkötéses Számalkotás Lépései (3-jegyű Páros Számok az &#123;1, 2, 3, 4, 5&#125; jegyekből)</span>
            </div>

            <div className="bg-indigo-50/50 dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/40 flex flex-col items-center">
              <svg viewBox="0 0 520 150" className="w-full max-w-lg h-auto select-none font-sans">
                <defs>
                  <marker id="arrowCurve" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#7c3aed" />
                  </marker>
                </defs>

                {/* 1. Lépés Nyíl felülről az egyesekhez */}
                <path d="M 330 18 C 360 8, 380 8, 410 22" fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowCurve)" />
                <rect x="235" y="5" width="135" height="18" rx="4" fill="#ede9fe" stroke="#a78bfa" />
                <text x="302" y="17" className="text-[9px] font-black fill-purple-900" textAnchor="middle">
                  ★ 1. LÉPÉS: Megkötés kitöltése!
                </text>

                {/* Doboz 1: Százasok (2. lépés) */}
                <rect x="25" y="32" width="115" height="75" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                <text x="82" y="50" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">2. lépés: Százasok</text>
                <text x="82" y="74" className="text-[18px] font-black fill-blue-950" textAnchor="middle">4</text>
                <text x="82" y="93" className="text-[9px] font-semibold fill-slate-500" textAnchor="middle">maradék 4 jegy</text>

                <text x="160" y="74" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* Doboz 2: Tízesek (3. lépés) */}
                <rect x="180" y="32" width="115" height="75" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
                <text x="237" y="50" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">3. lépés: Tízesek</text>
                <text x="237" y="74" className="text-[18px] font-black fill-blue-950" textAnchor="middle">3</text>
                <text x="237" y="93" className="text-[9px] font-semibold fill-slate-500" textAnchor="middle">maradék 3 jegy</text>

                <text x="315" y="74" className="text-[18px] font-black fill-slate-400" textAnchor="middle">×</text>

                {/* Doboz 3: Egyesek (1. LÉPÉS - KIEMELVE) */}
                <rect x="335" y="28" width="120" height="82" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
                <rect x="345" y="34" width="100" height="16" rx="3" fill="#dcfce7" />
                <text x="395" y="46" className="text-[9px] font-black fill-emerald-800" textAnchor="middle">★ 1. LÉPÉS (Egyesek)</text>
                <text x="395" y="74" className="text-[20px] font-black fill-emerald-950" textAnchor="middle">2</text>
                <text x="395" y="95" className="text-[9px] font-extrabold fill-emerald-700" textAnchor="middle">Páros: &#123;2, 4&#125;</text>

                <text x="470" y="74" className="text-[18px] font-black fill-slate-400" textAnchor="middle">=</text>

                {/* Eredmény */}
                <rect x="480" y="44" width="45" height="48" rx="8" fill="#059669" />
                <text x="502" y="74" className="text-[15px] font-black fill-white" textAnchor="middle">24</text>

                {/* Alsó visszairányító nyíl: Egyesek -> Százasok */}
                <path d="M 335 118 C 240 135, 160 135, 82 118" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeDasharray="3 2" markerEnd="url(#arrowCurve)" />
                <text x="237" y="138" className="text-[9.5px] font-bold fill-blue-700" textAnchor="middle">
                  A feltételes hely lefoglalása után töltjük fel a többit balról jobbra!
                </text>
              </svg>
              <div className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 mt-1">
                Szabály: Mindig annál a helyiértéknél kezdjük a számolást, amelyre speciális megkötés vonatkozik!
              </div>
            </div>
          </div>

          <TheoryTrapBox
            title="1. Csapda: A nulla (0) mint kezdőszámjegy"
            wrong="Hány 3-jegyű szám készíthető a {0, 1, 2, 3} jegyekből (különböző jegyekkel)? Hibás számítás: 4 · 3 · 2 = 24."
            wrongExplanation="Ha a 0 kerül a százasok helyére (pl. 012), az nem háromjegyű, hanem kétjegyű szám!"
            correct="Helyes megoldás: Az első helyre csak 3 számjegy kerülhet (1, 2, 3). A második helyre a maradék 3 számjegy (már a 0 is), a harmadikra 2. Tehát: 3 · 3 · 2 = 18 darab."
            correctExplanation="Többjegyű számoknál mindig az első helyiértékkel kezdjük a feltételek vizsgálatát!"
            tip="Kezdőszámjegy nem lehet 0!"
          />

          <TheoryTrapBox
            title="2. Csapda: Összeadás és szorzás összekeverése"
            wrong="Egy étteremben 3 leves és 4 főétel van. Hányféleképpen választhatunk 1 levest ÉS 1 főételt? Hibás válasz: 3 + 4 = 7."
            wrongExplanation="Az összeadás akkor érvényes, ha VAGY levest, VAGY főételt kérünk (egyetlen tételt)."
            correct="Helyes válasz: 3 · 4 = 12 féle menü."
            correctExplanation="Mivel mind a két fogást választjuk, a döntések kombinálódnak (mindegyik leveshez 4 különböző főétel társítható)."
            tip="ÉS kapcsolat = SZORZÁS; VAGY kapcsolat = ÖSSZEADÁS!"
          />

          <TheoryTrapBox
            title="3. Csapda: Ismétlés és ismétlés nélküli esetek keverése"
            wrong="Négyjegyű PIN kódok száma különböző számjegyekkel: 10⁴ = 10 000."
            wrongExplanation="A 10⁴ a megengedett ismétlésű kódok száma (pl. 1111, 1212)."
            correct="Különböző jegyekkel: 10 · 9 · 8 · 7 = 5040 darab."
            correctExplanation="Mindig figyelmesen olvasd el a feladat szövegében, hogy a jegyek/elemek ismétlődhetnek-e!"
            tip="Ismétlés nélkül a választható lehetőségek száma minden lépésben 1-gyel csökken!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          6. FEJEZET: ÖSSZEFOGLALÓ ÖSSZEHASONLÍTÓ TÁBLÁZAT
          ========================================================================= */}
      <TheorySection
        number={6}
        title="Összefoglaló Rendszerező Táblázat"
        badge="Áttekintés"
        badgeColor="teal"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <TheoryTable
          headers={['Típus / Helyzet', 'Kapcsolat', 'Alkalmazott Művelet', 'Tipikus Mintapélda', 'Képlet']}
          rows={[
            [
              'Független döntéssorozat',
              'ÉS (mindkettőt)',
              'Szorzás',
              '2 nadrág és 3 ing párosítása',
              'n · k = 2 · 3 = 6'
            ],
            [
              'Kizáró alternatívák',
              'VAGY (egyiket a kettőből)',
              'Összeadás',
              '3 busz vagy 4 vonat közül választás',
              'n + k = 3 + 4 = 7'
            ],
            [
              'Kódok ismétléssel',
              'Minden helyre azonos választék',
              'Hatványozás (szorzás)',
              '3 tárcsás számzár 0-9 jegyekkel',
              'nᵏ = 10³ = 1000'
            ],
            [
              'Kódok ismétlés nélkül',
              'Fogyó választék',
              'Csökkenő szorzás',
              '3-jegyű szám különböző {1,2,3,4,5} jegyekből',
              '5 · 4 · 3 = 60'
            ],
            [
              'Kötött feltételes számképzés',
              '0 nem lehet elöl / páros vég',
              'Lépésenkénti szorzás',
              '3-jegyű szám {0,1,2,3,4} különböző jegyekből',
              '4 · 4 · 3 = 48'
            ]
          ]}
        />

        {/* SVG ÁBRA 6B: Kombinatorikai Módszerválasztó Döntési Folyamatábra */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-black text-xs sm:text-sm">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Szemléltető Ábra: Kombinatorikai Módszerválasztó Döntési Folyamatábra</span>
          </div>

          <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <svg viewBox="0 0 640 270" className="w-full min-w-[580px] h-auto select-none font-sans">
              <defs>
                <marker id="flowArrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
                </marker>
                <marker id="flowArrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#059669" />
                </marker>
              </defs>

              {/* Felső Gyökér Csomópont */}
              <rect x="220" y="8" width="200" height="38" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="320" y="24" className="text-[10px] font-bold fill-sky-300" textAnchor="middle">1. LÉPÉS: KÉRDÉS</text>
              <text x="320" y="38" className="text-[11.5px] font-black fill-white" textAnchor="middle">Hogyan kapcsolódnak a részek?</text>

              {/* Elágazás Balra (ÉS) és Jobbra (VAGY) */}
              <path d="M 280 46 C 220 65, 175 75, 160 90" fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#flowArrowBlue)" />
              <path d="M 360 46 C 420 65, 465 75, 480 90" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#flowArrowGreen)" />

              {/* Bal Főág: ÉS KAPCSOLAT */}
              <rect x="70" y="90" width="180" height="42" rx="8" fill="#2563eb" stroke="#93c5fd" strokeWidth="1.5" />
              <text x="160" y="107" className="text-[10px] font-bold fill-blue-100" textAnchor="middle">ÉS KAPCSOLAT (Döntéssorozat)</text>
              <text x="160" y="123" className="text-[13px] font-black fill-white" textAnchor="middle">SZORZÁSI SZABÁLY (·)</text>

              {/* Jobb Főág: VAGY KAPCSOLAT */}
              <rect x="390" y="90" width="180" height="42" rx="8" fill="#059669" stroke="#6ee7b7" strokeWidth="1.5" />
              <text x="480" y="107" className="text-[10px] font-bold fill-emerald-100" textAnchor="middle">VAGY KAPCSOLAT (Alternatívák)</text>
              <text x="480" y="123" className="text-[13px] font-black fill-white" textAnchor="middle">ÖSSZEADÁSI SZABÁLY (+)</text>

              {/* Bal alsó ágak: Ismétlés van / nincs */}
              <path d="M 120 132 L 80 165" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#flowArrowBlue)" />
              <path d="M 200 132 L 240 165" fill="none" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#flowArrowBlue)" />

              {/* Ismétléssel */}
              <rect x="15" y="165" width="130" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="80" y="183" className="text-[10px] font-black fill-blue-900" textAnchor="middle">Ismétlés van</text>
              <text x="80" y="202" className="text-[13px] font-black fill-blue-700" textAnchor="middle">Hatványozás (nᵏ)</text>
              <text x="80" y="222" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">PIN kódok, számzár,</text>
              <text x="80" y="236" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">pénzérmék (2ⁿ)</text>

              {/* Ismétlés nélkül */}
              <rect x="175" y="165" width="130" height="85" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
              <text x="240" y="183" className="text-[10px] font-black fill-purple-900" textAnchor="middle">Ismétlés tilos</text>
              <text x="240" y="202" className="text-[13px] font-black fill-purple-700" textAnchor="middle">Fogyó szorzat</text>
              <text x="240" y="222" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">n · (n-1) · (n-2)...</text>
              <text x="240" y="236" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Dobogó, ülésrend</text>

              {/* Jobb alsó ágak: Diszjunkt / Metsző */}
              <path d="M 440 132 L 400 165" fill="none" stroke="#059669" strokeWidth="1.5" markerEnd="url(#flowArrowGreen)" />
              <path d="M 520 132 L 560 165" fill="none" stroke="#059669" strokeWidth="1.5" markerEnd="url(#flowArrowGreen)" />

              {/* Diszjunkt */}
              <rect x="335" y="165" width="130" height="85" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
              <text x="400" y="183" className="text-[10px] font-black fill-emerald-900" textAnchor="middle">Kizáró esetek</text>
              <text x="400" y="202" className="text-[13px] font-black fill-emerald-700" textAnchor="middle">Sima összeg (n₁+n₂)</text>
              <text x="400" y="222" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">A ∩ B = ∅</text>
              <text x="400" y="236" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Busz VAGY vonat</text>

              {/* Metsző */}
              <rect x="495" y="165" width="130" height="85" rx="8" fill="#fefce8" stroke="#eab308" strokeWidth="1.5" />
              <text x="560" y="183" className="text-[10px] font-black fill-amber-900" textAnchor="middle">Van átfedés</text>
              <text x="560" y="202" className="text-[13px] font-black fill-amber-700" textAnchor="middle">Logikai szita</text>
              <text x="560" y="222" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">n₁ + n₂ - n_közös</text>
              <text x="560" y="236" className="text-[9px] font-semibold fill-slate-600" textAnchor="middle">Nyelvtanulók metszete</text>
            </svg>
          </div>
          <div className="text-center font-bold text-xs text-slate-700 dark:text-slate-300">
            Útmutató: A feladat szövegének olvasásakor először döntsd el: az események egymás után, együtt lépnek fel (ÉS &rarr; szorzás), vagy kizáró alternatívák közül választunk (VAGY &rarr; összeadás)!
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          7. FEJEZET: GYORS ÖNELLENŐRZŐ MINI KVÍZ
          ========================================================================= */}
      <TheorySection
        number={7}
        title="Gyors Önellenőrző Kvíz"
        badge="Teszteld magad!"
        badgeColor="amber"
        icon={<HelpCircle className="w-5 h-5 text-amber-600" />}
      >
        <div className="space-y-4 text-xs sm:text-sm">
          {/* 1. kérdés */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              1. Hányféleképpen választhatunk ki 1 fiút ÉS 1 lányt egy 12 fiúból és 15 lányból álló osztályból az iskolai bál megnyitótáncára?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: '27', isCorrect: false },
                { label: '180', isCorrect: true },
                { label: '90', isCorrect: false }
              ].map((opt, idx) => (
                <button
                  key={`q1-opt-${idx}`}
                  onClick={() => setQuiz1Answer(idx)}
                  className={`p-2.5 rounded-lg border text-left font-bold transition-all text-xs ${
                    quiz1Answer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className={`p-2 rounded text-xs font-semibold ${quiz1Answer === 1 ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40'}`}>
                {quiz1Answer === 1
                  ? 'Helyes! Mivel mindkét választást meg kell hozni (ÉS kapcsolat), a lehetőségek száma 12 · 15 = 180.'
                  : 'Helytelen! Ez független döntések összekapcsolása (ÉS kapcsolat), így szorozni kell: 12 · 15 = 180.'}
              </div>
            )}
          </div>

          {/* 2. kérdés */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              2. Két kockával dobunk egyszerre. Hányféle kimenetel adhat 3-as összeget?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: '1 (csak az 1+2)', isCorrect: false },
                { label: '2 (az (1;2) és (2;1))', isCorrect: true },
                { label: '3', isCorrect: false }
              ].map((opt, idx) => (
                <button
                  key={`q2-opt-${idx}`}
                  onClick={() => setQuiz2Answer(idx)}
                  className={`p-2.5 rounded-lg border text-left font-bold transition-all text-xs ${
                    quiz2Answer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className={`p-2 rounded text-xs font-semibold ${quiz2Answer === 1 ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40'}`}>
                {quiz2Answer === 1
                  ? 'Kiváló! A két kocka megkülönböztethető, így az (1;2) és a (2;1) két különálló kimenetel.'
                  : 'Nem pontos! A két kocka dobása rendezett számpárt alkot: az első kockán 1 és második kockán 2, illetve fordítva két különböző eset (2 db).'}
              </div>
            )}
          </div>

          {/* 3. kérdés */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              3. Hány darab 3-jegyű szám készíthető a 0, 1, 2 számjegyekből, ha a jegyek ismétlődhetnek?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: '27 (mert 3³ = 27)', isCorrect: false },
                { label: '18 (mert 2 · 3 · 3 = 18)', isCorrect: true },
                { label: '12 (mert 2 · 2 · 3 = 12)', isCorrect: false }
              ].map((opt, idx) => (
                <button
                  key={`q3-opt-${idx}`}
                  onClick={() => setQuiz3Answer(idx)}
                  className={`p-2.5 rounded-lg border text-left font-bold transition-all text-xs ${
                    quiz3Answer === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 border-rose-400 text-rose-900 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className={`p-2 rounded text-xs font-semibold ${quiz3Answer === 1 ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40' : 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40'}`}>
                {quiz3Answer === 1
                  ? 'Tökéletes! Az első helyre a 0 nem kerülhet (2 lehetőség), a másodikra és harmadikra viszont mind a 3 jegy: 2 · 3 · 3 = 18.'
                  : 'Figyelj a nullára! A százasok helyére a 0 nem kerülhet, mert akkor a szám nem lenne 3-jegyű. Így: 2 · 3 · 3 = 18.'}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default HowManyWaysTheory;
