import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileText,
  Calculator,
  Info,
  Layers,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Zap,
  Check,
  ArrowRight,
  X,
  AlertTriangle,
  Flame,
  ArrowRightLeft,
  MoveHorizontal,
  Plus,
  Minus,
  Binary,
  Hash,
  Scale,
  Award,
  BookOpen,
  Target,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';

interface Chapter1SummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function Chapter1SummaryTheory({
  onBack,
  onStartQuiz
}: Chapter1SummaryTheoryProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Interactive Hub Active Tab
  const [activeTab, setActiveTab] = useState<'roman' | 'placeValue' | 'rounding' | 'integers'>('roman');

  // Simulator States
  // 1. Roman Simulator
  const [romanInput, setRomanInput] = useState<number>(2026);
  // 2. Place Value Simulator
  const [pvInput, setPvInput] = useState<number>(47825);
  // 3. Rounding Simulator
  const [roundInput, setRoundInput] = useState<number>(6847);
  const [roundUnit, setRoundUnit] = useState<10 | 100 | 1000>(100);
  // 4. Integer Simulator
  const [intA, setIntA] = useState<number>(-4);
  const [intOp, setIntOp] = useState<'+' | '-'>('-');
  const [intB, setIntB] = useState<number>(-7);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF(
      'chapter1-summary-theory-content',
      'I_Egesz_Szamok_Osszefoglalas_Tananyag'
    );
    setIsDownloading(false);
  };

  // Helper for Roman Numerals
  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return '1 és 3999 közötti számot adj meg';
    const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let roman = '';
    let n = num;
    for (let i = 0; i < val.length; i++) {
      while (n >= val[i]) {
        roman += syms[i];
        n -= val[i];
      }
    }
    return roman;
  };

  // Helper for Rounding
  const roundNumber = (val: number, unit: number): number => {
    return Math.round(val / unit) * unit;
  };

  // Helper for Integer Operation
  const intResult = intOp === '+' ? intA + intB : intA - intB;

  return (
    <div className="w-full px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-pdf">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="rounded-xl h-9 px-3 border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-xs sm:text-sm font-medium transition-all"
          >
            <Download className={cn("w-3.5 h-3.5 mr-1.5", isDownloading && "animate-bounce")} />
            {isDownloading ? 'Letöltés...' : 'PDF Tananyag'}
          </Button>

          {onStartQuiz && (
            <Button
              size="sm"
              onClick={onStartQuiz}
              className="rounded-xl h-9 px-4 bg-gradient-to-r from-amber-600 via-indigo-600 to-indigo-700 hover:from-amber-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <Trophy className="w-3.5 h-3.5 mr-1.5" />
              Témazáró Kvíz Indítása
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Printable Area */}
      <div
        id="chapter1-summary-theory-content"
        className="space-y-6 max-w-5xl mx-auto bg-white dark:bg-slate-900/70 p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
      >
        {/* Title Header */}
        <div className="border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-300/40 dark:border-amber-700/40 text-amber-700 dark:text-amber-300">
              I. Fejezet • Nagy Témazáró Összefoglalás
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">16. Témakör</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span>Az egész számok</span>
            <span className="text-xl sm:text-2xl px-3 py-0.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 font-bold">
              Átfogó Tudástár
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Az 5. osztályos matematika első nagy fejezetének (15 témakör) teljes rendszerezése. A római számoktól és helyiértéktől a négy alapműveleten át egészen az előjeles egész számok összeadásáig és kivonásáig.
          </p>
        </div>

        {/* Master Formula & Cheat Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">🏛️</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                Római számok
              </h2>
            </div>
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div className="flex justify-between"><span>I=1, V=5, X=10</span><span>L=50</span></div>
              <div className="flex justify-between"><span>C=100, D=500</span><span>M=1000</span></div>
              <p className="text-[11px] font-sans text-amber-700 dark:text-amber-400 mt-1">Kivonás: balra 1 db kisebb (IV, IX, XL, XC, CD, CM)</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">🔢</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                Helyiérték & Írás
              </h2>
            </div>
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-semibold text-blue-800 dark:text-blue-300">Valódi = Alaki × Helyi</div>
              <p className="text-[11px]">Hármas tagolás hátulról: <code className="font-mono font-bold">12 450 300</code></p>
              <p className="text-[11px] text-blue-700 dark:text-blue-400">2000-ig egybe, felette kötőjel az osztályok között</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">📐</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                Kerekítés & Műveletek
              </h2>
            </div>
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <p className="text-[11px]">Kerekítés: <span className="font-semibold">0-4 lefelé</span>, <span className="font-semibold text-emerald-700 dark:text-emerald-300">5-9 felfelé</span></p>
              <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">Sorrend: () → ·, : → +, -</p>
              <p className="text-[11px]">Azonos szinten: <span className="font-semibold">balról jobbra</span></p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">➕➖</span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">
                Előjeles Számok
              </h2>
            </div>
            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>+(+b) = +b | +(-b) = -b</div>
              <div>-(+b) = -b | -(-b) = +b</div>
              <p className="text-[11px] font-sans text-purple-700 dark:text-purple-300 mt-1">|a| ≥ 0 (távolság a 0-tól), a + (-a) = 0</p>
            </div>
          </div>
        </div>

        {/* 1. Module: Számábrázolás és Írásmódok */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-300/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              A számok világa és írásmódjai (1–5. Témakör)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-900/40">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-amber-500">●</span> Római számok szabályai
                </h3>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Ismétlési szabály:</strong> Legfeljebb 3-szor ismétlődhet: <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">I, X, C, M</code>.</li>
                  <li><strong>Nem ismételhető:</strong> A <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">V, L, D</code> sosem állhat kétszer egymás után.</li>
                  <li><strong>Összeadás:</strong> Kisebb szám a nagyobb jobb oldalán: pl. <code className="font-mono">VIII = 5 + 3 = 8</code>, <code className="font-mono">LX = 50 + 10 = 60</code>.</li>
                  <li><strong>Kivonás:</strong> Csak 1 db kisebb a nagyobb bal oldalán: <code className="font-mono">IV=4, IX=9, XL=40, XC=90, CD=400, CM=900</code>.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-900/40">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-blue-500">●</span> Helyiérték és helyesírás
                </h3>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>3 féle érték:</strong> Alaki (maga a számjegy), Helyi (egyes, tízes, százas, ezres...), Valódi (Alaki × Helyi).</li>
                  <li><strong>Hármas tagolás:</strong> Hátulról (jobbról) hármas csoportokba (osztályokba) tagoljuk szóközzel.</li>
                  <li><strong>Kétezres szabály:</strong> $2000$-ig minden számot egybeírunk (pl. <em>ezerkilencszázkilencvenkilenc</em>). $2000$ felett az osztályok közé kötőjelet teszünk (pl. <em>kétmillió-háromszázezer-ötszáz</em>). Ha kerek ezres: <em>kétezer</em>, <em>háromezer</em> stb. egybeíródik!</li>
                  <li><strong>Számrendszerek:</strong> Tízes (alap 10, jegyek: 0-9), Kettes (alap 2, jegyek: 0, 1; helyiértékek: 1, 2, 4, 8, 16, 32...).</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 2. Module: Számegyenes, Becslés és Kerekítés */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-300/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Számegyenes, viszonyok és kerekítés (6–7. Témakör)
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase mb-1">
                  Szomszédok
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Egyes szomszédok: <code className="font-mono">n-1</code> és <code className="font-mono">n+1</code>.<br />
                  Tízes szomszédok: a legközelebbi alsó és felső kerek 10-es (pl. 473 szomszédai: 470 és 480).
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase mb-1">
                  Kerekítési szabály
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Mindig a <strong>kerekítendő helyiértéktől jobbra</strong> álló jegyet nézzük!<br />
                  <span className="font-semibold text-slate-900 dark:text-white">0, 1, 2, 3, 4</span> → Lefelé kerekítünk.<br />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">5, 6, 7, 8, 9</span> → Felfelé kerekítünk.
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase mb-1">
                  Becslés műveleteknél
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Összeadás, kivonás, szorzás előtt kerekített értékekkel számolunk, hogy megbecsüljük az eredmény nagyságrendjét és észrevegyük az elszámolásokat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Module: Négy Alapművelet és Műveleti Sorrend */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-300/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Négy alapművelet és műveleti sorrend (8–12. Témakör)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-900/40">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-indigo-500">●</span> Írásbeli műveletek szabályai
                </h3>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Összeadás & Kivonás:</strong> Helyiértékeket pontosan egymás alá írjuk (egyes alá egyes). Átlépésnél átvitelt jegyzünk fel.</li>
                  <li><strong>Írásbeli Szorzás:</strong> A szorzandót a szorzó minden egyes jegyével megszorozzuk, a részletszorzatokat a megfelelő helyiértékkel elcsúsztatva írjuk egymás alá, majd összeadjuk.</li>
                  <li><strong>Írásbeli Osztás:</strong> Balról jobbra haladunk. Kétjegyű osztónál becsléssel határozzuk meg a hányados jegyét. Ellenőrzés: <code className="font-mono font-bold">Osztó × Hányados + Maradék = Osztandó</code> ($Maradék &lt; Osztó$).</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 shadow-none bg-slate-50/50 dark:bg-slate-900/40">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-indigo-500">●</span> Műveleti hierarchia piramis
                </h3>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200/80 dark:border-indigo-800/40 font-semibold text-indigo-900 dark:text-indigo-200">
                    1. Zárójelek: legbelső kerek ( ), majd [ ], majd &#123; &#125;
                  </div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200/80 dark:border-blue-800/40 font-semibold text-blue-900 dark:text-blue-200">
                    2. Szorzás (·) és Osztás (:) balról jobbra
                  </div>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    3. Összeadás (+) és Kivonás (-) balról jobbra
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 4. Module: Előjeles Számok és Műveletek */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-300/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Az egész számok és előjeles műveletek (13–15. Témakör)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-800/50 space-y-1.5">
              <h4 className="text-xs font-bold text-cyan-900 dark:text-cyan-300 uppercase flex items-center gap-1.5">
                <span>❄️</span> Negatív számok
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                0-tól balra helyezkednek el a számegyenesen. Két negatív szám közül az a <strong>nagyobb</strong>, amelyik közelebb van a 0-hoz (pl. <code className="font-mono font-bold">-2 &gt; -8</code>). A 0 nem pozitív és nem negatív!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/80 dark:border-orange-800/50 space-y-1.5">
              <h4 className="text-xs font-bold text-orange-900 dark:text-orange-300 uppercase flex items-center gap-1.5">
                <span>🔄</span> Ellentett & Abszolút érték
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Ellentett:</strong> 0-ra vett tükörkép (pl. +5 ellentettje -5, 0 ellentettje 0).<br />
                <strong>Abszolút érték ($|a|$):</strong> a számnak a 0-tól mért távolsága, soha nem negatív ($|-7| = 7$, $|+4| = 4$, $|0| = 0$).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/50 space-y-1.5">
              <h4 className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase flex items-center gap-1.5">
                <span>➕➖</span> Előjeles összeadás & kivonás
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                $+ (+b) \to +b$ (jobbra)<br />
                $+ (-b) \to -b$ (balra)<br />
                $- (+b) \to -b$ (balra)<br />
                <span className="font-bold text-purple-700 dark:text-purple-300">$- (-b) \to +b$</span> (két mínusz = plusz, jobbra!)
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Master Hub Simulator (No-PDF) */}
        <div className="no-pdf pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Interaktív Fejezet Szimulátor & Tesztelő
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Próbáld ki az egyes témakörök interaktív kalkulátorait a vizsgára készüléshez!
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('roman')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  activeTab === 'roman'
                    ? "bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                🏛️ Római
              </button>
              <button
                onClick={() => setActiveTab('placeValue')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  activeTab === 'placeValue'
                    ? "bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                🔢 Helyiérték
              </button>
              <button
                onClick={() => setActiveTab('rounding')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  activeTab === 'rounding'
                    ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                📐 Kerekítés
              </button>
              <button
                onClick={() => setActiveTab('integers')}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all",
                  activeTab === 'integers'
                    ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                ➕➖ Egész számok
              </button>
            </div>
          </div>

          {/* Tab 1: Roman Numerals */}
          {activeTab === 'roman' && (
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Írj be egy arab számot (1–3999):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={3999}
                    value={romanInput}
                    onChange={(e) => setRomanInput(Math.min(3999, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-32 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex-1 min-w-[200px] p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Római számmal:</span>
                  <span className="text-lg sm:text-xl font-black font-mono tracking-widest text-amber-600 dark:text-amber-400">
                    {toRoman(romanInput)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-slate-500 self-center">Gyors példák:</span>
                {[4, 9, 44, 99, 444, 999, 1999, 2026].map(num => (
                  <button
                    key={num}
                    onClick={() => setRomanInput(num)}
                    className="px-2 py-1 rounded-lg bg-amber-100/70 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-mono hover:bg-amber-200 dark:hover:bg-amber-900/70 transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Place Value */}
          {activeTab === 'placeValue' && (
            <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/40 space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                  Szám megadása elemzéshez:
                </label>
                <input
                  type="number"
                  value={pvInput}
                  onChange={(e) => setPvInput(parseInt(e.target.value) || 0)}
                  className="w-48 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Tagolt alak</span>
                  <span className="text-sm font-mono font-bold text-blue-700 dark:text-blue-300">
                    {pvInput.toLocaleString('hu-HU')}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Helyesírás</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {pvInput <= 2000 ? 'Egybeírandó (≤ 2000)' : 'Kötőjeles (> 2000)'}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Kettes rendszerben</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 truncate block">
                    {pvInput > 0 && pvInput < 100000 ? pvInput.toString(2) + '₂' : '—'}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Helyiérték összeg</span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate block">
                    {String(Math.abs(pvInput)).split('').map((d, i, arr) => `${d}·10^${arr.length - 1 - i}`).join('+')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Rounding */}
          {activeTab === 'rounding' && (
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Kerekítendő szám:
                  </label>
                  <input
                    type="number"
                    value={roundInput}
                    onChange={(e) => setRoundInput(parseInt(e.target.value) || 0)}
                    className="w-36 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                    Kerekítési pontosság:
                  </label>
                  <div className="flex gap-1.5">
                    {[10, 100, 1000].map((u) => (
                      <button
                        key={u}
                        onClick={() => setRoundUnit(u as 10 | 100 | 1000)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                          roundUnit === u
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        )}
                      >
                        {u === 10 ? 'Tízesre' : u === 100 ? 'Százasra' : 'Ezresre'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-w-[200px] p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kerekített érték:</span>
                  <span className="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    ≈ {roundNumber(roundInput, roundUnit).toLocaleString('hu-HU')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Integers */}
          {activeTab === 'integers' && (
            <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/40 space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Első szám (a):</span>
                  <input
                    type="number"
                    value={intA}
                    onChange={(e) => setIntA(parseInt(e.target.value) || 0)}
                    className="w-24 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold font-mono text-center"
                  />
                </div>

                <div className="flex gap-1 pt-4">
                  <button
                    onClick={() => setIntOp('+')}
                    className={cn(
                      "w-9 h-9 rounded-xl font-bold font-mono text-base border transition-all",
                      intOp === '+'
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    )}
                  >
                    +
                  </button>
                  <button
                    onClick={() => setIntOp('-')}
                    className={cn(
                      "w-9 h-9 rounded-xl font-bold font-mono text-base border transition-all",
                      intOp === '-'
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                    )}
                  >
                    -
                  </button>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-1">Második szám (b):</span>
                  <input
                    type="number"
                    value={intB}
                    onChange={(e) => setIntB(parseInt(e.target.value) || 0)}
                    className="w-24 px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold font-mono text-center"
                  />
                </div>

                <div className="flex-1 min-w-[200px] p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kifejezés és eredmény:</span>
                  <span className="text-base sm:text-lg font-black font-mono text-purple-700 dark:text-purple-300">
                    ({intA}) {intOp} ({intB}) = <span className="underline decoration-purple-500">{intResult}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top Exam Pitfalls / Gyakori csapdák */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Top 6 Tipikus Hiba a Témazáróban (Kerüld el!)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> 1. Római kivonás túlzásba vitele
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A 99 <strong>nem</strong> <code className="font-mono">IC</code>, hanem <code className="font-mono font-bold">XCIX</code> (90 + 9). Csak közvetlen előtti nagyságrendből vonhatunk ki (I-t csak V-ből és X-ből)!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> 2. Műveleti sorrend figyelmen kívül hagyása
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                $10 + 5 \cdot 2$ eredménye <strong>nem 30</strong>, hanem <code className="font-mono font-bold">20</code>, mert a szorzást kell előbb elvégezni!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> 3. Két mínusz találkozása kivonásnál
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                $-8 - (-3) = -8 + 3 = \mathbf{-5}$. A kivonás jele és a negatív előjel együtt <strong>pluszra</strong> vált!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> 4. Negatív számok nagyságrendje
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                $-15$ <strong>kisebb</strong> mint $-3$, azaz $-15 &lt; -3$, mert a -15 sokkal balrább van a 0-tól a számegyenesen!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> 5. Osztási maradék vizsgálata
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A maradék mindig <strong>szigorúan kisebb</strong> kell legyen, mint az osztó! Ha $maradék \ge osztó$, akkor a hányados túl kicsi lett.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40 space-y-1">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                <X className="w-3.5 h-3.5 text-rose-500" /> 6. Abszolút érték előjele
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                $|-9|$ <strong>nem $-9$</strong>, hanem mindig $+9$! Az abszolút érték a 0-tól mért távolság, ezért sosem lehet negatív.
              </p>
            </div>
          </div>
        </div>

        {/* Practice CTA Banner */}
        {onStartQuiz && (
          <div className="no-pdf p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-300/40 dark:border-amber-700/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Készen állsz az I. Fejezet nagy témazáró tesztjére?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Gyakorolj a 3×30 feladatos átfogó témazáró kvízzel, a kártyanyitogató párosítóval vagy a csoportosítóval!
              </p>
            </div>
            <Button
              onClick={onStartQuiz}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              Témazáró Kvíz Megnyitása
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
