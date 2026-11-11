import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  RegularHexagonCirclesSvg,
  CyclicQuadrilateralSvg,
  TangentialQuadrilateralSvg,
  ThalesRightAngleSvg
} from './PolygonsAndCirclesFigures';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Sparkles,
  Maximize2,
  Check,
  XCircle,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PolygonsAndCirclesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PolygonsAndCirclesTheory: React.FC<PolygonsAndCirclesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab State ---
  const [activeTab, setActiveTab] = useState<'cyclic' | 'tangential'>('cyclic');

  // Húrnégyszög szögek:
  const [alpha, setAlpha] = useState<number>(75);
  const [beta, setBeta] = useState<number>(110);
  const [gammaCustom, setGammaCustom] = useState<number>(105); // 180 - alpha = 105
  const [deltaCustom, setDeltaCustom] = useState<number>(70); // 180 - beta = 70

  // Érintőnégyszög oldalak:
  const [sideA, setSideA] = useState<number>(12);
  const [sideB, setSideB] = useState<number>(9);
  const [sideC, setSideC] = useState<number>(8);
  const [sideDCustom, setSideDCustom] = useState<number>(11); // a + c = 20, b + d = 9 + 11 = 20

  // Húrnégyszög validáció:
  const isCyclic = alpha + gammaCustom === 180 && beta + deltaCustom === 180;

  // Érintőnégyszög validáció:
  const sumOpp1 = sideA + sideC;
  const sumOpp2 = sideB + sideDCustom;
  const isTangential = sumOpp1 === sumOpp2;

  const fixCyclic = () => {
    setGammaCustom(180 - alpha);
    setDeltaCustom(180 - beta);
  };

  const fixTangential = () => {
    setSideDCustom(sideA + sideC - sideB);
  };

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • VI. EGYBEVÁGÓSÁG ÉS KÖR • TANANYAG"
      title="Sokszögek és körök kapcsolata: Húrnégyszögek és érintőnégyszögek"
      subtitle="A húrnégyszögek szögtétele (α + γ = 180°), az érintőnégyszögek oldaltétele (a + c = b + d), az érintősokszögek területe (T = s·r) és szabályos sokszögek."
      themeColor="indigo"
      pdfFilename="10_osztaly_sokszogek_es_korok_tananyag.pdf"
      quickRule={{
        label: 'A HÚRNÉGYSZÖGEK ÉS ÉRINTŐNÉGYSZÖGEK TÉTELEI',
        align: 'left',
        formula: (
          <div className="space-y-2.5 text-slate-800 text-xs sm:text-sm">
            <div className="bg-indigo-50/90 p-2.5 rounded-xl border border-indigo-200">
              <span className="font-black text-indigo-900 block mb-0.5">A két legfontosabb érettségi tétel:</span>
              <ul className="space-y-1 font-mono text-indigo-950 mt-1">
                <li>• <strong>Húrnégyszög tétele:</strong> Körbe írható ⟺ α + γ = β + δ = 180° (szemközti szögek összege 180°!)</li>
                <li>• <strong>Érintőnégyszög tétele:</strong> Kör köré írható ⟺ a + c = b + d (szemközti oldalak összege egyenlő!)</li>
                <li>• <strong>Érintősokszög területe:</strong> T = s · r, ahol s = K/2 (félkerület)</li>
                <li>• <strong>Szabályos hatszög:</strong> R = a, r = (a√3)/2, T = (3a²√3)/2</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-900 text-[11px] leading-tight font-medium">
              <strong>💡 MEMÓRIATÜKKÖK:</strong> <strong>Húr</strong>négyszög ➔ <strong>Szögek</strong> összege 180° &bull; <strong>Érintő</strong>négyszög ➔ <strong>Oldalak</strong> összege egyenlő!
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a húrnégyszögek és érintőnégyszögek feladataira?"
      practiceSubtitle="Gyakorold a szögek és oldalak kiszámítását a 30 kérdéses kvízben!"
      interactiveSection={
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500 text-white rounded-2xl shadow-lg">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-indigo-100">
                  Interaktív Négyszög &amp; Kör Tétel-Labor
                </h3>
                <p className="text-xs text-indigo-300/80">
                  Ellenőrizd a feltételeket valós időben! Húrnégyszögnél a szemközti szögek összegét, érintőnégyszögnél az oldalak összegét.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'cyclic' ? 'bg-indigo-500 text-white font-bold border-indigo-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('cyclic')}
              >
                🔵 Húrnégyszög (Köré írt kör)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`text-xs h-8 ${activeTab === 'tangential' ? 'bg-purple-500 text-white font-bold border-purple-300' : 'bg-slate-800/80 border-slate-700 text-slate-200'}`}
                onClick={() => setActiveTab('tangential')}
              >
                🔴 Érintőnégyszög (Beírt kör)
              </Button>
            </div>
          </div>

          {/* 1. Mód: Húrnégyszög */}
          {activeTab === 'cyclic' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-indigo-800/40">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Belső szögek beállítása
                  </span>
                  <Button size="sm" variant="ghost" className="text-xs h-7 text-indigo-300" onClick={fixCyclic}>
                    Automatikus illesztés (180°)
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>α szög:</span>
                    <span className="font-mono text-cyan-300 font-bold">{alpha}°</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={alpha}
                    onChange={(e) => setAlpha(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>γ szög (szemközti):</span>
                    <span className="font-mono text-cyan-300 font-bold">{gammaCustom}°</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={gammaCustom}
                    onChange={(e) => setGammaCustom(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>β szög:</span>
                    <span className="font-mono text-purple-300 font-bold">{beta}°</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={beta}
                    onChange={(e) => setBeta(Number(e.target.value))}
                    className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-200">
                    <span>δ szög (szemközti):</span>
                    <span className="font-mono text-purple-300 font-bold">{deltaCustom}°</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="150"
                    step="5"
                    value={deltaCustom}
                    onChange={(e) => setDeltaCustom(Number(e.target.value))}
                    className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-start gap-2.5 ${
                  isCyclic ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                }`}>
                  {isCyclic ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />}
                  <div className="leading-snug">
                    {isCyclic
                      ? 'ÉRVÉNYES HÚRNÉGYSZÖG! Mivel α + γ = 180° és β + δ = 180°, mind a 4 csúcs egyetlen körvonalra illeszkedik!'
                      : `NEM HÚRNÉGYSZÖG! α + γ = ${alpha + gammaCustom}° (nem 180°) vagy β + δ = ${beta + deltaCustom}°. Nem létezik kör, amely mind a 4 csúcsán átmenne!`}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">1. Szemközti pár összege:</span>
                    <p className={`text-base font-bold ${alpha + gammaCustom === 180 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      α + γ = {alpha + gammaCustom}° {alpha + gammaCustom === 180 ? '✓' : '✕'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">2. Szemközti pár összege:</span>
                    <p className={`text-base font-bold ${beta + deltaCustom === 180 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      β + δ = {beta + deltaCustom}° {beta + deltaCustom === 180 ? '✓' : '✕'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Mód: Érintőnégyszög */}
          {activeTab === 'tangential' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-purple-800/40">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    Oldalhosszak beállítása
                  </span>
                  <Button size="sm" variant="ghost" className="text-xs h-7 text-purple-300" onClick={fixTangential}>
                    Illesztés (a + c = b + d)
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-300">a oldal:</span>
                    <input
                      type="number"
                      value={sideA}
                      onChange={(e) => setSideA(Number(e.target.value))}
                      className="w-full mt-1 p-2 bg-slate-800 rounded-lg text-amber-300 font-mono font-bold text-sm border border-slate-700"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300">c oldal (szemközti):</span>
                    <input
                      type="number"
                      value={sideC}
                      onChange={(e) => setSideC(Number(e.target.value))}
                      className="w-full mt-1 p-2 bg-slate-800 rounded-lg text-amber-300 font-mono font-bold text-sm border border-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-300">b oldal:</span>
                    <input
                      type="number"
                      value={sideB}
                      onChange={(e) => setSideB(Number(e.target.value))}
                      className="w-full mt-1 p-2 bg-slate-800 rounded-lg text-cyan-300 font-mono font-bold text-sm border border-slate-700"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300">d oldal (szemközti):</span>
                    <input
                      type="number"
                      value={sideDCustom}
                      onChange={(e) => setSideDCustom(Number(e.target.value))}
                      className="w-full mt-1 p-2 bg-slate-800 rounded-lg text-cyan-300 font-mono font-bold text-sm border border-slate-700"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-start gap-2.5 ${
                  isTangential ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                }`}>
                  {isTangential ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" /> : <XCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />}
                  <div className="leading-snug">
                    {isTangential
                      ? 'ÉRVÉNYES ÉRINTŐNÉGYSZÖG! Mivel a + c = b + d, a négy oldal mindegyike érinti a beírt kört!'
                      : `NEM ÉRINTŐNÉGYSZÖG! a + c = ${sumOpp1}, míg b + d = ${sumOpp2}. Nem létezik olyan kör, amely mind a 4 oldalt érintené!`}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">a + c összege:</span>
                    <p className={`text-base font-bold ${isTangential ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {sideA} + {sideC} = {sumOpp1}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">b + d összege:</span>
                    <p className={`text-base font-bold ${isTangential ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      {sideB} + {sideDCustom} = {sumOpp2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      {/* 1. Szakasz: Húrnégyszög tétele */}
      <TheorySection
        id="hurnegyszog-tetele"
        number={1}
        title="A húrnégyszögek definíciója és alaptétele"
        badge="HÚRNÉGYSZÖG"
        badgeColor="indigo"
      >
        <TheoryCard title="Mikor írható egy négyszög köré kör?" color="indigo">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Egy négyszöget <strong>húrnégyszögnek</strong> nevezünk, ha létezik olyan kör, amely mind a 4 csúcsán átmegy 
                (oldalai a kör húrjai).
              </p>
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-mono text-indigo-950 dark:text-indigo-300 font-bold space-y-1">
                <span className="text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block font-sans">
                  A húrnégyszögek tétele és megfordítása:
                </span>
                <p className="text-base"><MathText>{'\\alpha + \\gamma = 180^\\circ \\quad \\text{és} \\quad \\beta + \\delta = 180^\\circ'}</MathText></p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans font-normal">
                  Egy konvex négyszög akkor és csak akkor húrnégyszög, ha szemközti belső szögeinek összege 180°!
                </p>
              </div>
              <p className="text-xs text-slate-500">
                <strong>Példák húrnégyszögekre:</strong> Téglalap, négyzet, szimmetrikus trapéz (húrtrapéz).
                Az általános paralelogramma vagy rombusz NEM húrnégyszög!
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <CyclicQuadrilateralSvg />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szakasz: Érintőnégyszög tétele */}
      <TheorySection
        id="erintonegyszog-tetele"
        number={2}
        title="Az érintőnégyszögek definíciója és alaptétele"
        badge="ÉRINTŐNÉGYSZÖG"
        badgeColor="purple"
      >
        <TheoryCard title="Mikor írható egy négyszögbe kör?" color="purple">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Egy négyszöget <strong>érintőnégyszögnek</strong> nevezünk, ha létezik olyan kör, amely mind a 4 oldalát érinti 
                (oldalai a kör érintői).
              </p>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 font-mono text-purple-950 dark:text-purple-300 font-bold space-y-1">
                <span className="text-xs uppercase tracking-wider text-purple-600 dark:text-purple-400 block font-sans">
                  Az érintőnégyszögek tétele és megfordítása:
                </span>
                <p className="text-base"><MathText>{'a + c = b + d'}</MathText></p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans font-normal">
                  Egy konvex négyszög akkor és csak akkor érintőnégyszög, ha szemközti oldalainak összege páronként egyenlő!
                </p>
              </div>
              <p className="text-xs text-slate-500">
                <strong>Példák érintőnégyszögekre:</strong> Rombusz, deltoid, négyzet, szimmetrikus érintőtrapéz.
                A téglalap (ha nem négyzet) NEM érintőnégyszög!
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <TangentialQuadrilateralSvg />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szakasz: Érintősokszögek területe */}
      <TheorySection
        id="erintosokszog-terulet"
        number={3}
        title="Az érintősokszögek univerzális területképlete: T = s · r"
        badge="TERÜLETKÉPLET"
        badgeColor="teal"
      >
        <TheoryCard title="Hogyan számoljuk ki a beírt körös sokszögek területét?" color="teal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha egy sokszögbe kör írható, a beírt kör <MathText>{'O'}</MathText> középpontját összekötve a csúcsokkal, 
            a sokszög <MathText>{'n'}</MathText> darab háromszögre bomlik. Mindegyik háromszög magassága éppen a beírt kör sugara (<MathText>{'r'}</MathText>):
          </p>
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono text-teal-950 dark:text-teal-300 font-bold my-3 text-sm sm:text-base text-center">
            <MathText>{'T = \\frac{a \\cdot r}{2} + \\frac{b \\cdot r}{2} + \\frac{c \\cdot r}{2} + \\dots = \\frac{a+b+c+\\dots}{2} \\cdot r = s \\cdot r'}</MathText>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Ahol <MathText>{'s = \\frac{K}{2}'}</MathText> a sokszög <strong>félkerülete</strong>. Ez a képlet érvényes bármely háromszögre, rombuszra, 
            deltoidra, érintőtrapézra és szabályos sokszögre!
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szakasz: Szabályos sokszögek */}
      <TheorySection
        id="szabalyos-sokszogek"
        number={4}
        title="Szabályos sokszögek körkapcsolatai"
        badge="SZABÁLYOS SOKSZÖGEK"
        badgeColor="indigo"
      >
        <TheoryCard title="A szabályos hatszög mint az érettségi kedvence" color="indigo">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A szabályos hatszög 6 darab egybevágó szabályos háromszögből áll:
              </p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                <li><strong>Körülírt kör sugara:</strong> <MathText>{'R = a'}</MathText> (megegyezik az oldallal!)</li>
                <li><strong>Beírt kör sugara:</strong> <MathText>{'r = \\frac{a\\sqrt{3}}{2}'}</MathText> (a háromszög magassága)</li>
                <li><strong>Területe:</strong> <MathText>{'T = 6 \\cdot \\frac{a^2\\sqrt{3}}{4} = \\frac{3a^2\\sqrt{3}}{2}'}</MathText></li>
              </ul>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <RegularHexagonCirclesSvg />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szakasz: Összehasonlító táblázat */}
      <TheorySection
        id="osszehasonlito-tablazat"
        number={5}
        title="Húrnégyszög vs Érintőnégyszög: Szisztematikus összehasonlítás"
        badge="ÖSSZEHASONLÍTÁS"
        badgeColor="slate"
      >
        <TheoryTable
          headers={['Tulajdonság', 'Húrnégyszög (Körbe írt)', 'Érintőnégyszög (Köré írt)']}
          rows={[
            ['Kör helyzete', 'A kör átmegy a 4 csúcson (körülírt kör)', 'A kör érinti a 4 oldalt (beírt kör)'],
            ['Feltétel', 'α + γ = β + δ = 180° (szemközti szögek)', 'a + c = b + d (szemközti oldalak)'],
            ['Tipikus alakzatok', 'Téglalap, négyzet, szimmetrikus trapéz', 'Rombusz, deltoid, négyzet, érintőtrapéz'],
            ['Nem tartozik ide', 'Általános paralelogramma, rombusz (nem 90°)', 'Téglalap (ha nem négyzet), paralelogramma'],
            ['Területképlet', 'Ptolemaiosz-tétel / Brahmagupta', 'T = s · r (félkerület × sugár)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
