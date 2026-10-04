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
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Scale,
  ArrowRight,
  TrendingUp,
  Boxes,
  HelpCircle,
  Hash,
  Square,
  Triangle
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface FindingPatternsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const FindingPatternsTheory: React.FC<FindingPatternsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Labor tab: 'matches' (Gyufaszál láncok) vagy 'numbers' (Háromszögszámok & Kézfogások)
  const [activeLabTab, setActiveLabTab] = useState<'matches' | 'numbers'>('matches');

  // --- TAB 1: GYUFASZÁL LÁNC ÁLLAPOT ---
  const [shapeType, setShapeType] = useState<'square' | 'triangle' | 'house'>('square');
  const [shapeCount, setShapeCount] = useState<number>(3);
  const [targetMatchCount, setTargetMatchCount] = useState<string>('31');

  // Képlet paraméterei alakzattípus szerint
  // Négyzetlánc: 1->4, 2->7, 3->10 => 3n + 1
  // Háromszöglánc: 1->3, 2->5, 3->7 => 2n + 1
  // Házikólánc: 1->6, 2->11, 3->16 => 5n + 1
  const getMatchFormula = (type: 'square' | 'triangle' | 'house', n: number) => {
    switch (type) {
      case 'square': return { d: 3, b: 1, total: 3 * n + 1, formulaText: 'f(n) = 3n + 1' };
      case 'triangle': return { d: 2, b: 1, total: 2 * n + 1, formulaText: 'f(n) = 2n + 1' };
      case 'house': return { d: 5, b: 1, total: 5 * n + 1, formulaText: 'f(n) = 5n + 1' };
    }
  };

  const currentMatchInfo = getMatchFormula(shapeType, shapeCount);

  // Visszafelé számolás kalkulátor
  const targetNum = parseInt(targetMatchCount, 10);
  const inverseN = !isNaN(targetNum) && targetNum > currentMatchInfo.b && (targetNum - currentMatchInfo.b) % currentMatchInfo.d === 0
    ? (targetNum - currentMatchInfo.b) / currentMatchInfo.d
    : null;

  // --- TAB 2: HÁROMSZÖGSZÁMOK & KÉZFOGÁSOK ÁLLAPOT ---
  const [polyN, setPolyN] = useState<number>(5);

  const triangleNum = (polyN * (polyN + 1)) / 2;
  const handshakes = (polyN * (polyN - 1)) / 2;
  const diagonals = polyN >= 3 ? (polyN * (polyN - 3)) / 2 : 0;

  return (
    <TheoryTemplate
      title="Keressünk Összefüggéseket!"
      subtitle="Mintázatok felismerése, számpárok és táblázatok szabályai, az n. tag algebrai kifejezése (n ↦ f(n)), gyufaszál-láncok, háromszögszámok, kézfogások és sokszögek átlói"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="finding-patterns-theory-doc"
      pdfFilename="8_osztaly_keressunk_osszefuggeseket_tananyag.pdf"
      estimatedReadTime="14 perc"
      quickRule={{
        label: 'Alapképletek',
        formula: 'T_n = \\frac{n(n+1)}{2}, \\quad \\text{Átlók} = \\frac{n(n-3)}{2}, \\quad f(n) = d \\cdot n + b'
      }}
      themeColor="amber"
      practiceTitle="Készen állsz az összefüggések és mintázatok feladványaira?"
      practiceSubtitle="Tedd próbára logikádat különbségvizsgálattal, gyufaszál-láncokkal, háromszögszámokkal és képletalkotással a kvízben!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* 1. SZAKASZ: SZABÁLYFELISMERÉS ÉS KÜLÖNBSÉGVIZSGÁLAT */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. Szabályfelismerés és Különbségvizsgálat"
        subtitle="Hogyan derítjük ki a szabályt számsorozatokból és táblázatokból a különbségek elemzésével?"
        badge="Módszertan"
        icon={<Search className="w-5 h-5 text-amber-600" />}
      >
        <TheoryCallout
          title="A Különbségvizsgálat Lépései"
          icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
        >
          <div className="space-y-2">
            <p>
              Amikor egy számsorozat szabályát keressük, írjuk fel egymás mellé a tagokat, és vizsgáljuk meg az egymást követő számok különbségeit:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">1. Rendű Különbség Állandó (d) → Lineáris Szabály:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Ha a szomszédos számok különbsége mindig ugyanaz a <MathText text="d" /> szám, a képlet lineáris: <MathText text="f(n) = d \cdot n + b" />.
                </p>
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 block">Pl. 5, 8, 11, 14... (d = +3) → f(n) = 3n + 2</span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">2. Rendű Különbség Állandó → Másodfokú Szabály:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Ha a különbségek nem állandóak, de azok különbsége már az, a képletben <MathText text="n^2" /> szerepel: <MathText text="f(n) = a \cdot n^2 + b \cdot n + c" />.
                </p>
                <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300 block">Pl. 2, 5, 10, 17, 26... (diff: 3, 5, 7, 9 → +2) → f(n) = n² + 1</span>
              </div>
            </div>
          </div>
        </TheoryCallout>

        <TheoryTrapBox
          title="Tévhit: Elegendő-e 2 tagból szabályt felállítani?"
          trap="Ha egy sorozat úgy kezdődik: 2, 4, ... sokan azonnal rávágják, hogy a következő tag 6 (mert +2)."
          correction="Valójában 2 tagból nem lehet egyértelmű szabályt megállapítani! A sorozat folytatódhat 6-tal (+2 számtani), de 8-cal is (·2 mértani: 2, 4, 8, 16...), vagy akár 16-tal is (2² = 4, 4² = 16...)! Mindig legalább 3-4 tagot kell megvizsgálni a biztos összefüggéshez!"
        />
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: GYUFASZÁL- ÉS GEOMETRIAI LÁNCALAKZATOK */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. Gyufaszál- és Geometriai Láncalakzatok"
        subtitle="Hogyan írjuk le az egymáshoz csatlakozó cellák gyufaszálainak számát általános képlettel?"
        badge="Mintázatok"
        icon={<Boxes className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Négyzetlánc (3n + 1)"
            subtitle="Közös belső oldalak"
            icon={<Square className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az első négyzet megépítéséhez 4 gyufa kell. Minden további négyzet már meglévő oldalhoz csatlakozik, így csak <strong>3 új gyufaszál</strong> szükséges:
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-mono space-y-0.5 text-amber-950 dark:text-amber-200">
              <div>1 négyzet: 4 gyufa</div>
              <div>2 négyzet: 4 + 3 = 7 gyufa</div>
              <div>3 négyzet: 7 + 3 = 10 gyufa</div>
              <div className="font-bold border-t border-amber-200 dark:border-amber-800 pt-1 mt-1">
                f(n) = 3n + 1
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Háromszöglánc (2n + 1)"
            subtitle="Minden lépésben +2 szál"
            icon={<Triangle className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az első háromszög 3 szálból áll. Minden újabb háromszög az előző egyik oldalára támaszkodik, tehát <strong>2 új gyufa</strong> kell:
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-mono space-y-0.5 text-amber-950 dark:text-amber-200">
              <div>1 háromszög: 3 gyufa</div>
              <div>2 háromszög: 3 + 2 = 5 gyufa</div>
              <div>3 háromszög: 5 + 2 = 7 gyufa</div>
              <div className="font-bold border-t border-amber-200 dark:border-amber-800 pt-1 mt-1">
                f(n) = 2n + 1
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Házikólánc (5n + 1)"
            subtitle="Négyzetalap + háztető"
            icon={<Hash className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Egy különálló házikó 6 gyufából áll (4 fal + 2 tető). Sorban egymáshoz építve a közös fal miatt minden új házikóhoz <strong>5 gyufa</strong> kell:
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-mono space-y-0.5 text-amber-950 dark:text-amber-200">
              <div>1 házikó: 6 gyufa</div>
              <div>2 házikó: 6 + 5 = 11 gyufa</div>
              <div>3 házikó: 11 + 5 = 16 gyufa</div>
              <div className="font-bold border-t border-amber-200 dark:border-amber-800 pt-1 mt-1">
                f(n) = 5n + 1
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: HÍRES SZÁMSOROZATOK ÉS GEOMETRIAI ÖSSZEFÜGGÉSEK */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Híres Számsorozatok és Geometriai Összefüggések"
        subtitle="A háromszögszámok, kézfogások, sokszögek átlói és négyzetszámok kapcsolata"
        badge="Nevezetes Képletek"
        icon={<Scale className="w-5 h-5 text-amber-600" />}
      >
        <TheoryTable
          headers={['Fogalom / Jelenség', 'Képlet', 'Első Tagok (n = 1, 2, 3, 4, 5...)', 'Magyarázat']}
          rows={[
            ['Háromszögszámok (T_n)', 'T_n = n(n + 1) / 2', '1, 3, 6, 10, 15, 21, 28, 36', 'Az első n pozitív egész szám összege: 1 + 2 + ... + n'],
            ['Kézfogások száma (n ember)', 'K = n(n - 1) / 2', '0, 1, 3, 6, 10, 15, 21, 28', 'Mindenki (n-1) emberrel fog kezet, páronként osztva 2-vel'],
            ['Konvex n-szög átlói', 'Á = n(n - 3) / 2', '0 (háromszög), 2 (négyszög), 5, 9, 14, 20', 'Egy csúcsból (n-3) átló indul (önmaga és a 2 szomszéd kiesik)'],
            ['Négyzetszámok (N_n)', 'N_n = n²', '1, 4, 9, 16, 25, 36, 49, 64', 'n × n méretű pontrács, két szomszédos háromszögszám összege!']
          ]}
        />

        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs space-y-2">
          <div className="font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Zseniális geometriai összefüggés: Két háromszögszám összege négyzetszám!
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha két egymást követő háromszögszámot összeadunk, mindig pontosan egy négyzetszámot kapunk:
          </p>
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl font-mono text-center font-bold text-amber-800 dark:text-amber-200">
            <MathText text="T_{n-1} + T_n = \frac{(n-1)n}{2} + \frac{n(n+1)}{2} = \frac{n(n - 1 + n + 1)}{2} = \frac{n(2n)}{2} = n^2" />
          </div>
          <p className="text-[11px] text-slate-500 italic text-center">
            Például: 1 + 3 = 4 (2²), 3 + 6 = 9 (3²), 6 + 10 = 16 (4²), 10 + 15 = 25 (5²)!
          </p>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: ALGEBRAI ÁLTALÁNOSÍTÁS ÉS KÉPLETALKOTÁS */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. Algebrai Általánosítás és Visszafelé Számolás"
        subtitle="Hogyan határozzuk meg a 100. alakzat elemszámát, vagy hogy hányadik alakzat tartalmaz adott darabszámot?"
        badge="Algebra & Egyenletek"
        icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <span className="font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Távoli Elem Kiszámítása (Előrejelzés)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Feladat:</strong> Hány gyufaszálból áll a 100 négyzetből álló négyzetlánc?
            </p>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 font-mono text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
              <div>Képlet: f(n) = 3n + 1</div>
              <div>n = 100 behelyettesítése:</div>
              <div className="font-bold">f(100) = 3 · 100 + 1 = 301 gyufaszál</div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <span className="font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Sorszám Megkeresése (Visszafelé Számolás)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Feladat:</strong> Hány ember volt azon a találkozón, ahol 45 kézfogás történt?
            </p>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 font-mono text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
              <div>Képlet: n(n - 1) / 2 = 45</div>
              <div>n(n - 1) = 90 (két szomszédos szám szorzata 90)</div>
              <div className="font-bold">10 · 9 = 90 → n = 10 ember</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 5. SZAKASZ: INTERAKTÍV MINTÁZAT- ÉS ALAKZAT LABOR */}
      {/* ========================================================================= */}
      <TheorySection
        title="5. Interaktív Mintázat- és Alakzat Labor"
        subtitle="Építs interaktív gyufaszál-láncokat valós időben, vagy vizsgáld meg a háromszögszámok és kézfogások növekedését!"
        badge="Interaktív Szimuláció"
        icon={<Boxes className="w-5 h-5 text-amber-600" />}
      >
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/30 p-5 rounded-3xl border-2 border-amber-200/80 dark:border-amber-900/60 shadow-lg space-y-5">
          {/* Fülválasztó */}
          <div className="flex flex-wrap gap-2 border-b border-amber-100 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveLabTab('matches')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'matches'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              1. Gyufaszál Lánc Építő (Alakzatok & Képletek)
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('numbers')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'numbers'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              2. Háromszögszámok & Kézfogások
            </button>
          </div>

          {/* TAB 1: GYUFASZÁL LÁNC ÉPÍTŐ */}
          {activeLabTab === 'matches' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Bal oszlop: Vezérlők és SVG rajz */}
                <div className="lg:col-span-7 space-y-3.5">
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200">
                        Válassz láncalakzatot:
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShapeType('square')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            shapeType === 'square'
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 hover:bg-amber-50'
                          }`}
                        >
                          Négyzet (3n + 1)
                        </button>
                        <button
                          type="button"
                          onClick={() => setShapeType('triangle')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            shapeType === 'triangle'
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 hover:bg-amber-50'
                          }`}
                        >
                          Háromszög (2n + 1)
                        </button>
                        <button
                          type="button"
                          onClick={() => setShapeType('house')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            shapeType === 'house'
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 hover:bg-amber-50'
                          }`}
                        >
                          Házikó (5n + 1)
                        </button>
                      </div>
                    </div>

                    {/* Csúszka az n értékéhez */}
                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Alakzatok száma a láncban (n):</span>
                        <span className="font-mono text-amber-700 dark:text-amber-300 font-black text-sm">{shapeCount} db</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="8"
                        step="1"
                        value={shapeCount}
                        onChange={(e) => setShapeCount(parseInt(e.target.value, 10))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>1 db</span>
                        <span>4 db</span>
                        <span>8 db</span>
                      </div>
                    </div>
                  </div>

                  {/* Vizuális Gyufaszál SVG Lánc */}
                  <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-inner flex flex-col items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Grafikus Látványkép:
                    </span>
                    <div className="w-full overflow-x-auto p-2 flex justify-center items-center min-h-[90px]">
                      <svg viewBox={`0 0 ${Math.max(200, shapeCount * 35 + 40)} 70`} className="h-16 max-w-full">
                        {Array.from({ length: shapeCount }).map((_, idx) => {
                          const x = 20 + idx * 32;
                          if (shapeType === 'square') {
                            return (
                              <g key={`sq-${idx}`}>
                                {/* Bal oldal (csak az elsőnél kell) */}
                                {idx === 0 && (
                                  <line x1={x} y1="20" x2={x} y2="52" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                                )}
                                {/* Felső oldal */}
                                <line x1={x} y1="20" x2={x + 32} y2="20" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                                {/* Alsó oldal */}
                                <line x1={x} y1="52" x2={x + 32} y2="52" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                                {/* Jobb oldal */}
                                <line x1={x + 32} y1="20" x2={x + 32} y2="52" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                                <text x={x + 16} y="40" className="text-[9px] font-mono font-bold fill-amber-900" textAnchor="middle">{idx + 1}</text>
                              </g>
                            );
                          } else if (shapeType === 'triangle') {
                            return (
                              <g key={`tri-${idx}`}>
                                {idx === 0 && (
                                  <line x1={x} y1="52" x2={x + 16} y2="20" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                                )}
                                <line x1={x + 16} y1="20" x2={x + 32} y2="52" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                                <line x1={x} y1="52" x2={x + 32} y2="52" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                                <text x={x + 16} y="46" className="text-[8px] font-mono font-bold fill-amber-900" textAnchor="middle">{idx + 1}</text>
                              </g>
                            );
                          } else {
                            // Házikó
                            return (
                              <g key={`house-${idx}`}>
                                {idx === 0 && (
                                  <line x1={x} y1="32" x2={x} y2="58" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                                )}
                                <line x1={x} y1="32" x2={x + 32} y2="32" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1={x} y1="58" x2={x + 32} y2="58" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                                <line x1={x + 32} y1="32" x2={x + 32} y2="58" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                                {/* Tető */}
                                <line x1={x} y1="32" x2={x + 16} y2="12" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                                <line x1={x + 16} y1="12" x2={x + 32} y2="32" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
                                <text x={x + 16} y="48" className="text-[8px] font-mono font-bold fill-amber-900" textAnchor="middle">{idx + 1}</text>
                              </g>
                            );
                          }
                        })}
                      </svg>
                    </div>

                    <div className="p-2 px-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 font-mono text-xs font-bold text-amber-900 dark:text-amber-200">
                      Gyufaszálak száma: <strong className="text-sm text-amber-700 dark:text-amber-400">{currentMatchInfo.total} db</strong> (Képlet: {currentMatchInfo.formulaText})
                    </div>
                  </div>
                </div>

                {/* Jobb oszlop: Táblázat és Inverz Kereső */}
                <div className="lg:col-span-5 space-y-3.5 text-xs">
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-2.5">
                    <span className="font-black uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5 text-xs">
                      <Hash className="w-4 h-4 text-amber-600" />
                      Értéktáblázat és Differenciák:
                    </span>

                    <table className="w-full text-center border-collapse font-mono text-[11px]">
                      <thead>
                        <tr className="border-b border-amber-200 dark:border-slate-700 text-slate-500">
                          <th className="py-1">n</th>
                          <th className="py-1">Gyufák</th>
                          <th className="py-1">Különbség</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4].map(nVal => {
                          const info = getMatchFormula(shapeType, nVal);
                          return (
                            <tr key={`tbl-${nVal}`} className={nVal === shapeCount ? 'bg-amber-100/70 dark:bg-amber-950/60 font-bold' : ''}>
                              <td className="py-1">{nVal}.</td>
                              <td className="py-1 text-amber-800 dark:text-amber-300">{info.total} db</td>
                              <td className="py-1 text-slate-400">{nVal === 1 ? '-' : `+${info.d}`}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[11px] font-mono text-amber-900 dark:text-amber-200">
                      <div>Állandó lépésköz: <strong>d = +{currentMatchInfo.d}</strong></div>
                      <div>Kezdőtag korrekció: <strong>b = {currentMatchInfo.b}</strong></div>
                      <div className="font-bold border-t border-amber-200 dark:border-amber-800 pt-1 mt-1">
                        Általános képlet: {currentMatchInfo.formulaText}
                      </div>
                    </div>
                  </div>

                  {/* Sorszámkereső inverz doboz */}
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">
                      🔍 Hányadik alakzatban van adott gyufaszám?
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={targetMatchCount}
                        onChange={(e) => setTargetMatchCount(e.target.value)}
                        className="w-24 p-1.5 rounded-lg border font-mono text-xs text-center"
                        placeholder="Pl. 31"
                      />
                      <span className="text-xs text-slate-500">gyufaszál esetén:</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-700 dark:text-slate-300">
                      {inverseN !== null ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                          ✓ Pontosan a(z) {inverseN}. alakzat!
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400">
                          ✗ Ezzel a gyufaszámmal nem jön ki egész alakzat!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HÁROMSZÖGSZÁMOK & KÉZFOGÁSOK */}
          {activeLabTab === 'numbers' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-amber-100 dark:border-slate-800 shadow-xs space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Elemek / Emberek / Sokszög csúcsainak száma (n):</span>
                    <span className="font-mono text-amber-700 dark:text-amber-300 font-black text-sm">{polyN}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="1"
                    value={polyN}
                    onChange={(e) => setPolyN(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>n = 2</span>
                    <span>n = 7</span>
                    <span>n = 12</span>
                  </div>
                </div>

                {/* 3 Kiszámított Eredmény Kártya */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 text-center">
                      Háromszögszám (T_n)
                    </span>
                    <span className="text-xl font-black font-mono mt-1 text-amber-700 dark:text-amber-200">
                      {triangleNum}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {polyN} · {polyN + 1} / 2
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 text-center">
                      Kézfogások Száma
                    </span>
                    <span className="text-xl font-black font-mono mt-1 text-blue-700 dark:text-blue-200">
                      {handshakes}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {polyN} · {polyN - 1} / 2
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 text-center">
                      Konvex n-szög Átlói
                    </span>
                    <span className="text-xl font-black font-mono mt-1 text-emerald-700 dark:text-emerald-200">
                      {diagonals}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5">
                      {polyN} · {polyN - 3} / 2
                    </span>
                  </div>
                </div>

                {/* Vizuális pontrács kirajzolás háromszögalakban */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Háromszögszám Vizuális Pontrácsa ({triangleNum} pont):
                  </span>
                  <div className="flex flex-col items-center gap-1.5 py-2">
                    {Array.from({ length: polyN }).map((_, rIdx) => (
                      <div key={`dot-row-${rIdx}`} className="flex gap-2">
                        {Array.from({ length: rIdx + 1 }).map((_, cIdx) => (
                          <div
                            key={`dot-${rIdx}-${cIdx}`}
                            className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-xs border border-amber-300"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Összeg soronként: {Array.from({ length: polyN }).map((_, i) => i + 1).join(' + ')} = {triangleNum}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FindingPatternsTheory;
