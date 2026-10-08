import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Sparkles,
  Binary,
  Zap,
  Calculator,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Globe,
  Gauge,
  Scale,
  Hash,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface LargeNumbersPowersTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const LargeNumbersPowersTheory: React.FC<LargeNumbersPowersTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Power Calculator State ---
  const [base, setBase] = useState<number>(2);
  const [exponent, setExponent] = useState<number>(4);

  // Calculate power result
  const powerResult = Math.pow(base, exponent);

  // Generate expanded factors string (e.g. 2 · 2 · 2 · 2)
  const getFactorsString = () => {
    if (exponent === 0) return '1 (definíció szerint: a⁰ = 1, ha a ≠ 0)';
    if (exponent === 1) return `${base} (önmaga 1-szer)`;
    const arr = Array(exponent).fill(base < 0 ? `(${base})` : `${base}`);
    return arr.join(' · ');
  };

  // Sign explanation
  const getSignExplanation = () => {
    if (base >= 0) return 'Pozitív alap esetén minden egész kitevőjű hatvány pozitív.';
    if (exponent === 0) return 'Bármely nemnulla szám 0-dik hatványa +1.';
    if (exponent % 2 === 0) {
      return `Páros kitevő (${exponent}): a negatív előjelek páronként kiejtik egymást → az eredmény POZITÍV (+${powerResult}).`;
    } else {
      return `Páratlan kitevő (${exponent}): egy negatív előjel megmarad → az eredmény NEGATÍV (${powerResult}).`;
    }
  };

  // --- Interactive Scientific Notation State ---
  const sampleNumbers = [
    { label: 'Fénysebesség (km/s)', value: 300000, notation: '3 · 10⁵' },
    { label: 'Magyarország lakossága (fő)', value: 9600000, notation: '9,6 · 10⁶' },
    { label: 'Föld–Nap távolság (km)', value: 149600000, notation: '1,496 · 10⁸' },
    { label: 'A Föld népessége (fő)', value: 8000000000, notation: '8 · 10⁹' },
    { label: 'Példaszám (45 230)', value: 45230, notation: '4,523 · 10⁴' }
  ];
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const selectedSample = sampleNumbers[selectedSampleIdx];

  // Calculate scientific representation dynamically
  const formatScientific = (num: number) => {
    const s = num.toString();
    const len = s.length;
    const exponentK = len - 1;
    const mantissa = num / Math.pow(10, exponentK);
    const mantissaStr = mantissa.toString().replace('.', ',');
    return {
      mantissa: mantissaStr,
      exponent: exponentK,
      steps: exponentK,
      resultText: `${mantissaStr} · 10^${exponentK}`
    };
  };

  const sciData = formatScientific(selectedSample.value);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-powers-large-numbers-theory-doc"
      pdfFilename="7_osztaly_nagy_szamok_es_hatvanyalak.pdf"
      badgeText="7. OSZTÁLY • MATEMATIKA IV. TÉMAKÖR • 📖 TANANYAG"
      title="1. Nagy számok és a hatványalak"
      subtitle="A hatványozás fogalma, műveleti szabályok, előjeles számok és törtek hatványai, a 10 hatványai és a számok normálalakja"
      quickRule={{
        label: 'Fontos Szabályok & Képletek',
        formula: 'aⁿ = a · a · ... · a,  a⁰ = 1,  Normálalak: a · 10ᵏ (1 ≤ a < 10)'
      }}
      themeColor="amber"
      practiceTitle="Készen állsz a hatványozás és a normálalak tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 szinten részletes levezetésekkel és azonnali magyarázatokkal!"
    >
      {/* SECTION 1: A Hatványozás Fogalma és Elemei */}
      <TheorySection
        number={1}
        title="A hatványozás fogalma és elemei"
        icon={<Binary className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Amikor egy összeadásban minden tag azonos, azt a szorzással rövidítjük (3 + 3 + 3 + 3 = 4 · 3). 
          Hasonlóan: ha egy szorzásban <strong>minden tényező megegyezik</strong>, a szorzatot rövidebben 
          <strong> hatványozással</strong> írjuk fel.
        </p>

        {/* Formula Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-300/70 dark:border-amber-700/60 text-center my-3 space-y-3">
          <div className="text-xs font-bold tracking-wider text-amber-800 dark:text-amber-300">
            A HATVÁNYOZÁS ALAPTÖRVÉNYE <span className="normal-case font-mono font-semibold">(n ∈ ℤ⁺)</span>
          </div>

          <div className="flex flex-col items-center justify-center py-1">
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl font-mono font-black text-amber-900 dark:text-amber-100">
              <span className="flex items-baseline">
                a<sup className="text-amber-600 dark:text-amber-400 text-lg sm:text-xl ml-0.5">n</sup>
              </span>
              <span className="text-slate-400 font-light">=</span>
              <div className="flex flex-col items-center">
                {/* Factors */}
                <div className="px-3 py-0.5 text-slate-800 dark:text-slate-100 tracking-wide text-lg sm:text-2xl">
                  a · a · a · ... · a
                </div>
                {/* Horizontal curly brace SVG */}
                <svg viewBox="0 0 200 16" className="w-48 sm:w-60 h-3.5 text-amber-600 dark:text-amber-400 stroke-current fill-none stroke-[2] mt-0.5">
                  <path d="M 5,2 Q 5,10 20,10 L 90,10 Q 100,10 100,15 Q 100,10 110,10 L 180,10 Q 195,10 195,2" />
                </svg>
                <div className="text-xs sm:text-sm font-sans font-bold text-amber-800 dark:text-amber-300 mt-1">
                  n darab tényező
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-amber-200/60 dark:border-amber-800/60 flex flex-wrap justify-center gap-x-6 gap-y-1">
            <span><strong className="text-amber-700 dark:text-amber-300 font-mono text-sm">a</strong>: hatványalap</span>
            <span><strong className="text-amber-700 dark:text-amber-300 font-mono text-sm">n</strong>: hatványkitevő (exponens)</span>
            <span><strong className="text-amber-700 dark:text-amber-300 font-mono text-sm">a<sup>n</sup></strong>: hatványérték</span>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          <TheoryCard
            title="Hatványalap (a)"
            badge="Tényező"
            variant="amber"
            properties={[
              { label: 'Jelentése', value: 'Az a szám, amelyet önmagával szorzunk.' },
              { label: 'Halmaza', value: 'Bármilyen valós szám lehet (pozitív, negatív, tört, 0).' },
              { label: 'Példa', value: 'A 2⁵ kifejezésben az alap: 2.' }
            ]}
          />

          <TheoryCard
            title="Kitevő / Exponens (n)"
            badge="Darabszám"
            variant="orange"
            properties={[
              { label: 'Jelentése', value: 'Megmutatja, hány azonos tényező szorzata szerepel.' },
              { label: 'Pozíciója', value: 'Az alap jobb felső sarkába írjuk felső indexként.' },
              { label: 'Példa', value: 'A 2⁵ kifejezésben a kitevő: 5.' }
            ]}
          />

          <TheoryCard
            title="Első hatvány (a¹)"
            badge="a¹ = a"
            variant="emerald"
            properties={[
              { label: 'Szabály', value: 'Bármely szám első hatványa önmaga.' },
              { label: 'Képlet', value: 'a¹ = a' },
              { label: 'Példák', value: '7¹ = 7,  (-15)¹ = -15,  (2/3)¹ = 2/3' }
            ]}
          />

          <TheoryCard
            title="Nulladik hatvány (a⁰)"
            badge="a⁰ = 1"
            variant="rose"
            properties={[
              { label: 'Szabály', value: 'Bármely 0-tól különböző szám 0-dik hatványa pontosan 1.' },
              { label: 'Képlet', value: 'a⁰ = 1  (ha a ≠ 0)' },
              { label: 'Fontos kivétel', value: '0⁰ nincs értelmezve a matematikában!' }
            ]}
          />
        </div>

        {/* INTERACTIVE DEMO 1: Hatványkalkulátor & Szemléltető */}
        <div className="mt-5 p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-900/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                Interaktív Hatványkalkulátor és Szemléltető
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full w-fit">
              Változtasd az alapot és a kitevőt!
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                  Válassz hatványalapot (a):
                </label>
                <div className="flex flex-wrap gap-2">
                  {[2, 3, 5, 10, -2, -3].map((val) => (
                    <Button
                      key={val}
                      size="sm"
                      variant={base === val ? 'default' : 'outline'}
                      onClick={() => setBase(val)}
                      className={cn(
                        'h-8 px-3 rounded-xl font-bold text-xs',
                        base === val && 'bg-amber-600 hover:bg-amber-700 text-white'
                      )}
                    >
                      {val < 0 ? `(${val})` : val}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Kitevő (n):</span>
                  <span className="font-mono text-amber-600 text-sm font-black">{exponent}</span>
                </div>
                <Slider
                  min={0}
                  max={base === 10 ? 8 : 6}
                  step={1}
                  value={[exponent]}
                  onValueChange={(val) => setExponent(val[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0</span>
                  <span>{base === 10 ? 8 : 6}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-amber-600 dark:text-amber-400">Előjel-magyarázat: </span>
                {getSignExplanation()}
              </div>
            </div>

            {/* Visualizer Display Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-850 dark:to-slate-900 border-2 border-amber-300/80 dark:border-amber-800 space-y-3 text-center">
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                Hatványkifejezés és szorzatalak
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                {base < 0 ? `(${base})` : base}
                <sup className="text-amber-600 dark:text-amber-400 text-xl font-black">{exponent}</sup>
                <span className="mx-2 text-slate-400">=</span>
                <span className="text-amber-700 dark:text-amber-300">
                  {powerResult.toLocaleString('hu-HU')}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/40 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 break-words">
                {getFactorsString()}
              </div>

              {exponent > 0 && Math.abs(base) <= 5 && exponent <= 5 && (
                <div className="pt-2 flex flex-wrap justify-center gap-1">
                  {Array.from({ min: 0, length: Math.min(powerResult > 0 ? powerResult : -powerResult, 32) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-xs bg-amber-500 dark:bg-amber-400 opacity-90"
                      title={`Egység #${i + 1}`}
                    />
                  ))}
                  {Math.abs(powerResult) > 32 && (
                    <span className="text-[10px] text-slate-500 self-center ml-1">
                      ...+{Math.abs(powerResult) - 32} további egység
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 2: Előjeles számok és törtek hatványai */}
      <TheorySection
        number={2}
        title="Előjeles számok és törtek hatványozása"
        icon={<Scale className="w-5 h-5 text-orange-600" />}
        badgeColor="orange"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Kiemelten fontos megfigyelni, hogyan viselkedik a hatványérték negatív alapok és törtek esetén, 
          valamint mikor elhagyhatatlan a zárójel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {/* Negatív alap páros kitevővel */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Negatív alap, páros kitevő → POZITÍV</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A negatív tényezők páronként összeszorozva pozitív előjelet adnak ((-1) · (-1) = +1).
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
              (-2)⁴ = (-2) · (-2) · (-2) · (-2) = +16
            </div>
            <div className="text-[11px] text-slate-500">
              További példák: (-3)² = 9, (-5)² = 25, (-10)⁶ = 1 000 000.
            </div>
          </div>

          {/* Negatív alap páratlan kitevővel */}
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>2. Negatív alap, páratlan kitevő → NEGATÍV</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A páros számú tényezők pozitívvá válnak, de az egyetlen megmaradó negatív tényező miatt a végösszeg negatív marad.
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900 font-mono text-xs font-bold text-rose-700 dark:text-rose-300">
              (-2)³ = (-2) · (-2) · (-2) = -8
            </div>
            <div className="text-[11px] text-slate-500">
              További példák: (-3)³ = -27, (-5)³ = -125, (-1)⁹⁹ = -1.
            </div>
          </div>
        </div>

        {/* Törtek és tizedes törtek */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Hash className="w-4 h-4 text-amber-500" />
            <span>Törtek és tizedes törtek hatványozása</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-800 dark:text-slate-200">Közönséges törtek:</div>
              <div className="font-mono text-amber-700 dark:text-amber-300 font-bold text-sm">
                (a/b)ⁿ = aⁿ / bⁿ
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                A számlálót és a nevezőt is a kitevőre emeljük:
                <br />
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  (2/3)³ = 2³/3³ = 8/27
                </span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="font-bold text-slate-800 dark:text-slate-200">Tizedes törtek:</div>
              <div className="font-mono text-amber-700 dark:text-amber-300 font-bold">
                0,1² = 0,01;  0,2³ = 0,008
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                A tizedesjegyek száma a kitevővel szorzódik:
                <br />
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  0,3² = 0,09 (1 jegyből 1 · 2 = 2 tizedesjegy lesz).
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* CSAPDA: Zárójel nélküli előjel */}
        <TheoryTrapBox
          title="Végzetes Hiba: (-a)ⁿ és -aⁿ sosem ugyanaz!"
          traps={[
            {
              mistake: '-4² = +16',
              correct: '-4² = -(4²) = -16',
              explanation: 'A hatványozás magasabb rendű művelet, mint az előjeladás! Zárójel nélkül a kitevő csak a 4-esre vonatkozik, a mínusz előjel pedig elé kerül.'
            },
            {
              mistake: '(-4)² és -4² értéke megegyezik',
              correct: '(-4)² = (-4) · (-4) = +16, míg -4² = -16',
              explanation: 'Mindig ellenőrizd: van zárójel a negatív szám körül vagy nincs!'
            }
          ]}
        />
      </TheorySection>

      {/* SECTION 3: A 10 Hatványai és a Helyiértékek */}
      <TheorySection
        number={3}
        title="A 10 hatványai és a helyiértékes összeg"
        icon={<Calculator className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Tízes számrendszerünkben minden helyiérték a <strong>10 egy-egy hatványának</strong> felel meg.
          Egy 10ⁿ hatvány értéke mindig egy 1-esből és utána pontosan n darab nullából áll.
        </p>

        {/* Table of Powers of 10 */}
        <TheoryTable
          title="A 10 hatványainak elnevezései és nagyságrendjei"
          headers={['Hatványalak', 'Érték számmal', 'Elnevezés', 'Nullák száma', 'Gyakorlati példa']}
          rows={[
            ['10⁰', '1', 'Egy', '0 darab', 'Egyetlen ember'],
            ['10¹', '10', 'Tíz', '1 darab', 'Egy kéz ujjai'],
            ['10²', '100', 'Száz', '2 darab', 'Egy iskola egy évfolyama'],
            ['10³', '1 000', 'Ezer (kilo-)', '3 darab', '1 kilométer = 1 000 méter'],
            ['10⁴', '10 000', 'Tízezer', '4 darab', 'Egy sportcsarnok befogadóképessége'],
            ['10⁵', '100 000', 'Százezer', '5 darab', 'Egy nagyobb magyar város (pl. Kecskemét)'],
            ['10⁶', '1 000 000', 'Millió (mega-)', '6 darab', 'Budapest lakossága kb. 1,7 millió'],
            ['10⁹', '1 000 000 000', 'Milliárd (giga-)', '9 darab', 'A Föld össznépessége kb. 8 milliárd'],
            ['10¹²', '1 000 000 000 000', 'Billió (tera-)', '12 darab', '1 Terabájt = 10¹² bájt (merevlemez)']
          ]}
        />

        {/* Helyiértékes összeg levezetés */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/70 dark:border-amber-700 space-y-2.5">
          <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Számok felírása 10 hatványainak összegeként</span>
          </h4>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Bármely természetes szám felbontható a számjegyei és a megfelelő 10-hatványok szorzatának összegére:
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 text-center">
            5423 = 5 · 10³ + 4 · 10² + 2 · 10¹ + 3 · 10⁰
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 text-center">
            60 807 = 6 · 10⁴ + 0 · 10³ + 8 · 10² + 0 · 10¹ + 7 · 10⁰ = 6 · 10⁴ + 8 · 10² + 7 · 10⁰
          </div>
        </div>
      </TheorySection>

      {/* SECTION 4: A Számok Normálalakja */}
      <TheorySection
        number={4}
        title="A számok normálalakja (Tudományos jelölés)"
        icon={<Globe className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A csillagászatban, fizikában és a digitális világban rendkívül nagy számokkal dolgozunk.
          Sok nullát kiírni nehézkes és könnyű elszámolni őket. Ezért vezették be a nemzetközi 
          <strong> normálalakot</strong> (scientific notation).
        </p>

        {/* Definition Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-2 border-amber-400 dark:border-amber-700 text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200">
            A normálalak pontos matematikai definíciója
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
            a · 10ᵏ
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex flex-wrap justify-center gap-x-6 gap-y-1 font-semibold">
            <span>
              <strong><MathText>{'1 \\le a < 10'}</MathText></strong>: az egész része egyetlen, 1 és 9 közötti számjegy
            </span>
            <span>
              <strong><MathText>{'k \\in \\mathbb{Z}'}</MathText></strong>: a nagyságrendi kitevő (egész szám)
            </span>
          </div>
        </div>

        {/* INTERACTIVE DEMO 2: Normálalak Átváltó & Lépésszámláló */}
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-900/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-amber-500" />
              <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                Interaktív Normálalak Átváltó és Lépésszámláló
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
              Hány lépést tolódik a tizedesvessző balra?
            </span>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
              Válassz egy valós mintaszámot:
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleNumbers.map((s, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={selectedSampleIdx === idx ? 'default' : 'outline'}
                  onClick={() => setSelectedSampleIdx(idx)}
                  className={cn(
                    'h-8 px-3 rounded-xl text-xs font-bold',
                    selectedSampleIdx === idx && 'bg-amber-600 hover:bg-amber-700 text-white'
                  )}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase">1. Eredeti szám:</div>
              <div className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
                {selectedSample.value.toLocaleString('hu-HU')}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                A tizedesvessző a szám végén áll. Lépjünk balra annyit, hogy pontosan egyetlen nemnulla jegy maradjon előtte!
              </div>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-xs font-bold text-amber-800 dark:text-amber-300">
                ➡️ Balra lépések száma: <span className="font-mono text-sm">{sciData.exponent} lépés</span> = 10 kitevője (k = {sciData.exponent})
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-850 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-800 text-center space-y-2">
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                2. Elkészült Normálalak
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-black text-amber-900 dark:text-amber-200">
                <MathText>{sciData.resultText}</MathText>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Mantissza (a): <strong>{sciData.mantissa}</strong> (1 ≤ {sciData.mantissa} &lt; 10 ✅)
                <br />
                Kitevő (k): <strong>{sciData.exponent}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Normálalak összehasonlítása és szorzása */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <TheoryCard
            title="Normálalakú számok összehasonlítása"
            badge="Összehasonlítás"
            variant="amber"
            properties={[
              { label: '1. Lépés', value: 'Nézd meg a 10 kitevőjét! A nagyobb kitevőjű szám a nagyobb (pl. 2 · 10⁶ > 9 · 10⁵).' },
              { label: '2. Lépés', value: 'Ha a kitevők egyenlőek, az első tényezőt (a-t) hasonlítjuk össze (pl. 4,8 · 10⁷ > 3,2 · 10⁷).' }
            ]}
          />

          <TheoryCard
            title="Szorzás normálalakban"
            badge="Szorzás"
            variant="orange"
            properties={[
              { label: 'Módszer', value: 'A számokat összeszorozzuk a számokkal, a 10-hatványokat a 10-hatványokkal.' },
              { label: 'Példa', value: '(2 · 10⁴) · (3 · 10³) = (2 · 3) · (10⁴ · 10³) = 6 · 10⁷' },
              { label: 'Ügyelj a végére', value: 'Ha a szorzat ≥ 10 (pl. 4 · 5 = 20), újra normálalakra kell hozni: 20 · 10⁶ = 2 · 10⁷!' }
            ]}
          />
        </div>

        {/* CSAPDA: Nem megengedett formátumok */}
        <TheoryTrapBox
          title="Gyakori hiba a normálalak felismerésénél"
          traps={[
            {
              mistake: '35 · 10⁴ normálalak',
              correct: 'Helyesen: 3,5 · 10⁵',
              explanation: 'A 35 nem esik az [1, 10) intervallumba, mert 35 ≥ 10! A tizedesvesszőt még egy hellyel balra kell vinni, és a kitevőt 1-gyel növelni.'
            },
            {
              mistake: '0,4 · 10⁶ normálalak',
              correct: 'Helyesen: 4 · 10⁵',
              explanation: 'A 0,4 kisebb mint 1! A tizedesvesszőt egy hellyel jobbra toljuk, miközben a kitevő 1-gyel csökken.'
            },
            {
              mistake: '2,5 · 5⁴ normálalak',
              correct: 'A normálalakban mindig a 10 hatványa szerepel: 2,5 · 10⁴',
              explanation: 'Más alapú hatvány nem minősül normálalaknak, kizárólag a 10 hatványai!'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LargeNumbersPowersTheory;
