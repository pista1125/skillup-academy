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
  Binary,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Scale,
  ArrowRight,
  Boxes,
  HelpCircle,
  Hash,
  LineChart,
  Layers,
  Compass,
  Zap
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface SequencesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SequencesTheory: React.FC<SequencesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Labor tab: 'generator' (Számtani és mértani sorozat generátor) vagy 'fibonacci' (Fibonacci & Aranymetszés)
  const [activeLabTab, setActiveLabTab] = useState<'generator' | 'fibonacci'>('generator');

  // --- TAB 1: GENERÁTOR ÁLLAPOT ---
  const [seqType, setSeqType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [a1, setA1] = useState<number>(3);
  const [paramVal, setParamVal] = useState<number>(2); // d ha számtani, q ha mértani
  const termCount = 8;

  // Tagok generálása
  const terms: number[] = [];
  for (let i = 0; i < termCount; i++) {
    if (seqType === 'arithmetic') {
      terms.push(a1 + i * paramVal);
    } else {
      terms.push(a1 * Math.pow(paramVal, i));
    }
  }

  // --- TAB 2: FIBONACCI ÁLLAPOT ---
  const [fibN, setFibN] = useState<number>(10);
  const fibList: number[] = [1, 1];
  for (let i = 2; i < fibN; i++) {
    fibList.push(fibList[i - 1] + fibList[i - 2]);
  }

  return (
    <TheoryTemplate
      title="Sorozatok"
      subtitle="A számsorozat mint speciális diszkrét függvény (n ∈ ℤ⁺), explicit és rekurzív megadási módok, számtani és mértani sorozatok alaptulajdonságai, valamint a lenyűgöző Fibonacci-sorozat"
      topicBadge="8. Osztály • VI. Fejezet"
      documentId="sequences-theory-doc"
      pdfFilename="8_osztaly_sorozatok_tananyag.pdf"
      estimatedReadTime="15 perc"
      quickRule={{
        label: 'Alapképletek',
        formula: 'a_n = a_1 + (n-1)d, \\quad a_n = a_1 \\cdot q^{n-1}, \\quad F_n = F_{n-1} + F_{n-2}'
      }}
      themeColor="cyan"
      practiceTitle="Készen állsz a sorozatok feladványaira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintű kvízben számtani és mértani sorozatokkal, az n. tag képletével és a Fibonacci-számokkal!"
      practiceButtonText="Kvíz indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* ========================================================================= */}
      {/* 1. SZAKASZ: A SOROZAT FOGALMA ÉS MEGADÁSI MÓDJAI */}
      {/* ========================================================================= */}
      <TheorySection
        title="1. A Sorozat Fogalma és Megadási Módjai"
        subtitle="Mi a matematikai kapcsolat a sorozatok és a függvények között?"
        badge="Alapfogalmak"
        icon={<Binary className="w-5 h-5 text-cyan-600" />}
      >
        <TheoryCallout
          title="A Sorozat mint Függvény"
          icon={<Compass className="w-5 h-5 text-cyan-600" />}
        >
          <div className="space-y-2">
            <p>
              A <strong>számsorozat</strong> nem más, mint egy olyan speciális függvény, amelynek <strong>értelmezési tartománya a pozitív egész számok halmaza</strong> (<MathText text="D = \{1, 2, 3, 4, \dots\}" />).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-800 space-y-1">
                <span className="font-bold text-cyan-900 dark:text-cyan-200 block">Jelölésmód és Indexelés:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  A hagyományos <MathText text="f(n)" /> helyett sorozatoknál az <MathText text="a_n" /> alsó indexes jelölést használjuk:
                </p>
                <div className="font-mono text-cyan-700 dark:text-cyan-300 font-bold">
                  a₁ = 1. tag, a₂ = 2. tag, ... aₙ = n. tag
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-800 space-y-1">
                <span className="font-bold text-cyan-900 dark:text-cyan-200 block">Diszkrét Grafikon:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Mivel a sorozat csak egész <MathText text="n" /> értékekre értelmezett, a derékszögű koordináta-rendszerben ábrázolva a pontokat <strong>nem szabad folytonos vonallal összekötni</strong>! Csak különálló, diszkrét pontok halmaza.
                </p>
              </div>
            </div>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Felsorolással"
            subtitle="Közvetlen elemlista"
            icon={<Hash className="w-4 h-4 text-cyan-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Megadjuk a sorozat első néhány elemét vesszővel elválasztva.
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 font-mono text-cyan-900 dark:text-cyan-200">
              <MathText text="a_n = (4, 7, 10, 13, 16\dots)" />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Hátránya: távoli tagok (pl. 100. elem) csak nehezen, sok számolással találhatók meg.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Explicit Képlettel"
            subtitle="Közvetlen számítási szabály"
            icon={<Zap className="w-4 h-4 text-cyan-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Olyan zárt képlet, amelybe behelyettesítve a sorszámot (<MathText text="n" />), közvetlenül megkapjuk az <MathText text="a_n" /> értéket.
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 font-mono text-cyan-900 dark:text-cyan-200">
              <MathText text="a_n = 3n + 1" />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Előnye: azonnal kiszámítható az <MathText text="a_{100} = 3 \cdot 100 + 1 = 301" />.
            </p>
          </TheoryCard>

          <TheoryCard
            title="3. Rekurzív Képlettel"
            subtitle="Visszalépő definíció"
            icon={<RotateCcw className="w-4 h-4 text-cyan-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Megadjuk a kezdőtagot (vagy kezdőtagokat), és egy szabályt, amellyel a következő tag az előzőből számítható.
            </p>
            <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 font-mono text-cyan-900 dark:text-cyan-200">
              <MathText text="a_1 = 4, \quad a_{n+1} = a_n + 3" />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Minden lépésben a legutóbbi tagra támaszkodik a számolás.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 2. SZAKASZ: SZÁMTANI SOROZATOK (ARITMETIKAI) */}
      {/* ========================================================================= */}
      <TheorySection
        title="2. Számtani Sorozatok (Aritmetikai Sorozatok)"
        subtitle="Ahol az egymást követő tagok különbsége állandó számmal növekszik vagy csökken"
        badge="Számtani"
        icon={<TrendingUp className="w-5 h-5 text-cyan-600" />}
      >
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900 space-y-3">
            <span className="text-xs font-black uppercase text-cyan-800 dark:text-cyan-200">
              A Számtani Sorozat Definíciója és Differenciája (d)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Egy sorozatot <strong>számtani sorozatnak</strong> nevezünk, ha a második tagjától kezdve bármelyik tagból kivonva az azt megelőző tagot, a különbség mindig ugyanaz az állandó <MathText text="d" /> valós szám:
            </p>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-950/60 rounded-xl border border-cyan-200 font-mono text-center text-xs font-bold text-cyan-900 dark:text-cyan-200">
              <MathText text="d = a_{n+1} - a_n = \text{állandó (differencia)}" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">Ha d &gt; 0:</span>
                <span>A sorozat <strong>szigorúan monoton nő</strong> (pl. 2, 5, 8, 11...).</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">Ha d &lt; 0:</span>
                <span>A sorozat <strong>szigorúan monoton csökken</strong> (pl. 20, 16, 12, 8...).</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">Ha d = 0:</span>
                <span>A sorozat <strong>állandó (konstans)</strong> (pl. 7, 7, 7, 7...).</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
              <span className="font-bold text-cyan-800 dark:text-cyan-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Az n. tag Általános Képlete
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Mivel az <MathText text="a_1" /> kezdőtagtól indulva az <MathText text="n." /> tagig pontosan <strong>(n - 1) lépést</strong> teszünk:
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 font-mono text-center text-xs font-bold text-cyan-900 dark:text-cyan-200">
                <MathText text="a_n = a_1 + (n - 1) \cdot d" />
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Példa: Ha a₁ = 4 és d = 3, akkor a₁₀ = 4 + 9 · 3 = 4 + 27 = 31.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
              <span className="font-bold text-cyan-800 dark:text-cyan-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-600" />
                A Számtani Közép Tulajdonság
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A sorozat bármely belső tagja a két közvetlen szomszédjának pontosan a <strong>számtani közepe</strong> (innen ered a számtani elnevezés!):
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 font-mono text-center text-xs font-bold text-cyan-900 dark:text-cyan-200">
                <MathText text="a_k = \frac{a_{k-1} + a_{k+1}}{2}" />
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Példa a (5, 9, 13) sorozatban: (5 + 13) / 2 = 18 / 2 = 9.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 3. SZAKASZ: MÉRTANI SOROZATOK (GEOMETRIAI) */}
      {/* ========================================================================= */}
      <TheorySection
        title="3. Mértani Sorozatok (Geometriai Sorozatok)"
        subtitle="Ahol az egymást követő tagok hányadosa állandó: exponenciális növekedés és feleződés"
        badge="Mértani"
        icon={<Layers className="w-5 h-5 text-cyan-600" />}
      >
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900 space-y-3">
            <span className="text-xs font-black uppercase text-cyan-800 dark:text-cyan-200">
              A Mértani Sorozat Definíciója és Kvóciense (q)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Egy nem-nulla tagokból álló sorozatot <strong>mértani sorozatnak</strong> nevezünk, ha a második tagjától kezdve bármelyik tagot elosztva az azt megelőző taggal, a hányados mindig ugyanaz az állandó <MathText text="q" /> szám (kvóciens):
            </p>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-950/60 rounded-xl border border-cyan-200 font-mono text-center text-xs font-bold text-cyan-900 dark:text-cyan-200">
              <MathText text="q = \frac{a_{n+1}}{a_n} = \text{állandó (kvóciens)}" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">Ha a₁ &gt; 0 és q &gt; 1:</span>
                <span>Robbanásszerűen <strong>monoton nő</strong> (pl. 2, 6, 18, 54...).</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">Ha a₁ &gt; 0 és 0 &lt; q &lt; 1:</span>
                <span>Gyorsan <strong>monoton csökken</strong> a 0 felé (pl. 80, 40, 20, 10...).</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">Ha q &lt; 0:</span>
                <span><strong>Oszcilláló</strong> (váltakozó előjelű: +, -, +, -...).</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
              <span className="font-bold text-cyan-800 dark:text-cyan-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Az n. tag Hatványos Képlete
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Az <MathText text="a_1" /> kezdőtagtól az <MathText text="n." /> tagig pontosan <MathText text="n - 1" /> alkalommal szorzunk a <MathText text="q" /> számmal:
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 font-mono text-center text-xs font-bold text-cyan-900 dark:text-cyan-200">
                <MathText text="a_n = a_1 \cdot q^{n - 1}" />
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Példa: Ha a₁ = 3 és q = 2, akkor a₆ = 3 · 2⁵ = 3 · 32 = 96.
              </p>
            </div>

            <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs space-y-2 text-xs">
              <span className="font-bold text-cyan-800 dark:text-cyan-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-600" />
                A Mértani Közép Tulajdonság
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Pozitív tagú mértani sorozatban bármely tag a két szomszédjának a <strong>mértani közepe</strong> (szorzatuk négyzetgyöke):
              </p>
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 font-mono text-center text-xs font-bold text-cyan-900 dark:text-cyan-200">
                <MathText text="a_k = \sqrt{a_{k-1} \cdot a_{k+1}}" />
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Példa a (4, 12, 36) sorozatban: √(4 · 36) = √144 = 12.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 4. SZAKASZ: FIBONACCI ÉS NEVEZETES SOROZATOK + TÉVHITEK */}
      {/* ========================================================================= */}
      <TheorySection
        title="4. A Fibonacci-sorozat és Tipikus Tévhitek"
        subtitle="A természet leggyakoribb mintázata és a diákok leggyakoribb csapdái"
        badge="Fibonacci & Tévhitek"
        icon={<Sparkles className="w-5 h-5 text-cyan-600" />}
      >
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 text-xs space-y-2">
            <span className="font-bold text-cyan-900 dark:text-cyan-200 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              A Fibonacci-sorozat Képzési Szabálya
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              A sorozat első két tagja 1 és 1, majd a harmadik tagtól kezdve minden elem az <strong>előző két elem összege</strong>:
            </p>
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl font-mono text-center font-bold text-cyan-900 dark:text-cyan-200">
              <MathText text="F_1 = 1, \quad F_2 = 1, \quad F_n = F_{n-1} + F_{n-2} \quad (n \ge 3)" />
            </div>
            <div className="text-center font-mono text-cyan-800 dark:text-cyan-300 text-xs font-semibold py-1">
              1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377...
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Megjelenik a napraforgó magjainak spiráljában, fenyőtobozokon, virágszirmok számában, és a szomszédos elemek hányadosa a híres Aranymetszéshez tart (<MathText text="\Phi \approx 1,618" />)!
            </p>
          </div>

          <TheoryTable
            headers={['Sorozat Neve', 'Típus', 'Első 5 Tag', 'Általános Képlet']}
            rows={[
              ['Páros számok', 'Számtani (d = 2)', '2, 4, 6, 8, 10', 'a_n = 2n'],
              ['Páratlan számok', 'Számtani (d = 2)', '1, 3, 5, 7, 9', 'a_n = 2n - 1'],
              ['Kettő-hatványok', 'Mértani (q = 2)', '2, 4, 8, 16, 32', 'a_n = 2^n'],
              ['Négyzetszámok', 'Másodfokú', '1, 4, 9, 16, 25', 'a_n = n²'],
              ['Fibonacci', 'Rekurzív additív', '1, 1, 2, 3, 5', 'F_n = F_(n-1) + F_(n-2)']
            ]}
          />

          <TheoryTrapBox
            title="A 3 Leggyakoribb Diákcsapda a Sorozatoknál:"
            trap="1. Csapda: A 10. taghoz 10-szer adják hozzá a differenciát (a₁₀ = a₁ + 10d). 2. Csapda: A mértani sorozat képletében a_n = a₁ · qⁿ-t használnak (n - 1 helyett). 3. Csapda: Azt hiszik, a Fibonacci-sorozat számtani sorozat, mert összeadással képződik."
            correction="A valóságban az 1. tagtól a 10. tagig pontosan 9 lépést teszünk (n - 1 = 9), így a képlet mindig a_n = a₁ + (n - 1)d, mértaninál pedig a_n = a₁ · q^(n-1)! A Fibonacci-sorozatban pedig nem állandó a különbség (1, 1, 2, 3, 5 különbségei: 0, 1, 1, 2...), ezért nem számtani sorozat!"
          />
        </div>
      </TheorySection>

      {/* ========================================================================= */}
      {/* 5. SZAKASZ: INTERAKTÍV SOROZAT LABORATÓRIUM */}
      {/* ========================================================================= */}
      <TheorySection
        title="5. Interaktív Sorozat Laboratórium"
        subtitle="Kísérletezz a számtani és mértani sorozatok tagjaival, vagy vizsgáld meg a Fibonacci-sorozat aranymetszését!"
        badge="Interaktív Szimuláció"
        icon={<LineChart className="w-5 h-5 text-cyan-600" />}
      >
        <div className="bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/30 p-5 rounded-3xl border-2 border-cyan-200/80 dark:border-cyan-900/60 shadow-lg space-y-5">
          {/* Fülválasztó */}
          <div className="flex flex-wrap gap-2 border-b border-cyan-100 dark:border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveLabTab('generator')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'generator'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              1. Számtani & Mértani Generátor
            </button>
            <button
              type="button"
              onClick={() => setActiveLabTab('fibonacci')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeLabTab === 'fibonacci'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              2. Fibonacci & Aranymetszés
            </button>
          </div>

          {/* TAB 1: GENERÁTOR */}
          {activeLabTab === 'generator' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* Vezérlők (5 col) */}
                <div className="lg:col-span-5 p-4 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs space-y-3.5">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSeqType('arithmetic')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        seqType === 'arithmetic'
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50'
                      }`}
                    >
                      Számtani (+d)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSeqType('geometric')}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        seqType === 'geometric'
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-50'
                      }`}
                    >
                      Mértani (·q)
                    </button>
                  </div>

                  {/* a1 csúszka */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Kezdőtag (a₁):</span>
                      <span className="font-mono text-cyan-700 dark:text-cyan-300 font-bold">{a1}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={a1}
                      onChange={(e) => setA1(parseInt(e.target.value, 10))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>

                  {/* d vagy q csúszka */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>{seqType === 'arithmetic' ? 'Differencia (d):' : 'Kvóciens (q):'}</span>
                      <span className="font-mono text-cyan-700 dark:text-cyan-300 font-bold">{paramVal}</span>
                    </div>
                    <input
                      type="range"
                      min={seqType === 'arithmetic' ? -5 : 1.5}
                      max={seqType === 'arithmetic' ? 10 : 3}
                      step={seqType === 'arithmetic' ? 1 : 0.5}
                      value={paramVal}
                      onChange={(e) => setParamVal(parseFloat(e.target.value))}
                      className="w-full accent-cyan-600 cursor-pointer"
                    />
                  </div>

                  {/* Képlet kártya */}
                  <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl font-mono text-xs space-y-1">
                    <div className="text-[11px] text-slate-500 font-sans font-bold">Kiszámított képlet:</div>
                    <div className="font-black text-cyan-900 dark:text-cyan-200">
                      <MathText
                        text={
                          seqType === 'arithmetic'
                            ? `a_n = ${a1} + (n - 1) \\cdot (${paramVal}) = ${paramVal}n + ${a1 - paramVal}`
                            : `a_n = ${a1} \\cdot ${paramVal}^{n - 1}`
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Táblázat és Pontgrafikon (7 col) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Első 8 tag értékei:
                    </span>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 text-center font-mono">
                      {terms.map((t, idx) => (
                        <div
                          key={`term-${idx}`}
                          className="p-1.5 rounded-lg bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900 flex flex-col items-center"
                        >
                          <span className="text-[9px] text-slate-400 font-mono">
                            <MathText text={`a_{${idx + 1}}`} />
                          </span>
                          <span className="text-xs font-bold text-cyan-900 dark:text-cyan-200">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SVG Pontgrafikon */}
                  <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-inner flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-500 mb-1">
                      Diszkrét Pontok a Koordináta-rendszerben:
                    </span>
                    <svg viewBox="0 0 280 120" className="w-full max-w-[340px] h-28">
                      {/* Tengelyek */}
                      <line x1="25" y1="105" x2="270" y2="105" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="25" y1="105" x2="25" y2="10" stroke="#64748b" strokeWidth="1.5" />
                      <polygon points="270,105 264,102 264,108" fill="#64748b" />
                      <polygon points="25,10 22,16 28,16" fill="#64748b" />

                      <text x="268" y="117" className="text-[7.5px] font-bold fill-slate-500" textAnchor="end">n</text>
                      <text x="32" y="15" className="text-[7.5px] font-bold fill-slate-500">
                        a<tspan baselineShift="sub" fontSize="5.5px">n</tspan>
                      </text>

                      {/* Pontok kirajzolása */}
                      {(() => {
                        const maxVal = Math.max(...terms, 10);
                        const minVal = Math.min(...terms, 0);
                        const valRange = maxVal - minVal || 1;

                        return terms.map((t, idx) => {
                          const px = 40 + idx * 28;
                          const py = 100 - ((t - minVal) / valRange) * 85;

                          return (
                            <g key={`pt-${idx}`}>
                              {/* Függőleges szaggatott vonal az x tengelytől */}
                              <line x1={px} y1="105" x2={px} y2={py} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                              <circle cx={px} cy={py} r="3.5" fill="#0891b2" stroke="#fff" strokeWidth="1.2" />
                              <text x={px} y="115" className="text-[7px] font-mono fill-slate-400" textAnchor="middle">
                                {idx + 1}
                              </text>
                            </g>
                          );
                        });
                      })()}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FIBONACCI */}
          {activeLabTab === 'fibonacci' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-cyan-100 dark:border-slate-800 shadow-xs space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Megjelenítendő tagok száma:</span>
                    <span className="font-mono text-cyan-700 dark:text-cyan-300 font-black text-sm">{fibN} tag</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="14"
                    step="1"
                    value={fibN}
                    onChange={(e) => setFibN(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                </div>

                {/* Fibonacci tagok kártyái */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {fibList.map((f, idx) => (
                    <div
                      key={`fib-${idx}`}
                      className="px-3 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 flex flex-col items-center min-w-[50px]"
                    >
                      <span className="text-[9px] text-slate-400 font-mono">
                        <MathText text={`F_{${idx + 1}}`} />
                      </span>
                      <span className="text-sm font-black font-mono text-cyan-900 dark:text-cyan-200">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Szomszédos tagok hányadosának konvergenciája az aranymetszéshez */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    ✨ Szomszédos Tagok Aránya (<MathText text="F_{n+1} / F_n" />) és az Aranymetszés (Φ ≈ 1,618):
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
                    {fibList.slice(1, 9).map((f, idx) => {
                      const prev = fibList[idx];
                      const ratio = (f / prev).toFixed(4);
                      return (
                        <div key={`ratio-${idx}`} className="p-2 bg-white dark:bg-slate-950 rounded-lg border border-cyan-100 text-center">
                          <span className="text-[10px] text-slate-400 block">{f} / {prev} =</span>
                          <span className="font-bold text-cyan-800 dark:text-cyan-200">{ratio}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-500 italic text-center pt-1">
                    Minél távolabbi tagokat osztunk el, a hányados annál közelebb kerül a híres aranymetszési állandóhoz (1,61803398...)!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SequencesTheory;
