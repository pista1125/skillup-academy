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
  Box,
  Layers,
  Cylinder,
  Triangle,
  Circle,
  Globe,
  Calculator,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Maximize2,
  Ruler,
  HelpCircle,
  Scale,
  Award,
  ArrowRight
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';

interface SolidsSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SolidsSummaryTheory: React.FC<SolidsSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Összehasonlító Labor Állapotok ---
  const [selectedSolid, setSelectedSolid] = useState<'cube' | 'prism' | 'cylinder' | 'pyramid' | 'sphere'>('pyramid');
  const [dimensionA, setDimensionA] = useState<number>(6); // cm
  const [heightM, setHeightM] = useState<number>(8); // cm

  // Dinamikus számítások
  let calculatedA = 0;
  let calculatedV = 0;
  let solidDescription = '';

  if (selectedSolid === 'cube') {
    calculatedA = 6 * dimensionA * dimensionA;
    calculatedV = Math.pow(dimensionA, 3);
    solidDescription = `Kocka (a = ${dimensionA} cm): 6 egybevágó négyzetlap, testátló d = a√3 = ${(dimensionA * Math.sqrt(3)).toFixed(2)} cm.`;
  } else if (selectedSolid === 'prism') {
    // Négyzet alapú hasáb
    const ta = dimensionA * dimensionA;
    const ka = 4 * dimensionA;
    const tp = ka * heightM;
    calculatedA = 2 * ta + tp;
    calculatedV = ta * heightM;
    solidDescription = `Négyzet alapú hasáb (a = ${dimensionA} cm, m = ${heightM} cm): Ta = ${ta} cm², Tp = ${tp} cm².`;
  } else if (selectedSolid === 'cylinder') {
    // Henger (r = dimensionA/2)
    const r = dimensionA / 2;
    calculatedA = Math.round(2 * Math.PI * r * (r + heightM));
    calculatedV = Math.round(Math.PI * r * r * heightM);
    solidDescription = `Forgáshenger (r = ${r} cm, m = ${heightM} cm): Alapkör Ta = ${(Math.PI * r * r).toFixed(1)} cm².`;
  } else if (selectedSolid === 'pyramid') {
    // Szabályos négyzet alapú gúla
    const ta = dimensionA * dimensionA;
    const mo = Math.sqrt(heightM * heightM + Math.pow(dimensionA / 2, 2));
    const tp = 4 * ((dimensionA * mo) / 2);
    calculatedA = Math.round(ta + tp);
    calculatedV = Math.round((ta * heightM) / 3);
    solidDescription = `Szabályos négyzet alapú gúla (a = ${dimensionA} cm, m = ${heightM} cm): mo = ${mo.toFixed(2)} cm, harmadoló térfogat.`;
  } else if (selectedSolid === 'sphere') {
    // Gömb (r = dimensionA/2)
    const r = dimensionA / 2;
    calculatedA = Math.round(4 * Math.PI * r * r);
    calculatedV = Math.round((4 / 3) * Math.PI * Math.pow(r, 3));
    solidDescription = `Gömb (r = ${r} cm, d = ${dimensionA} cm): Főkör területe = ${(Math.PI * r * r).toFixed(1)} cm².`;
  }

  // Önellenőrző mini kvíz
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="A Testek Geometriája (Fejezeti Összefoglalás)"
      subtitle="Hasábok, henger, gúlák, gömb és a Föld geometriájának teljes körű szintézise: felszínek, térfogatok, a Pitagorasz-tétel térbeli alkalmazásai, a harmadoló elv és a térbeli hasonlóság törvényei"
      badgeText="8. OSZTÁLY • VII. TESTEK • 🏆 ÖSSZEFOGLALÁS"
      themeColor="indigo"
      documentId="solids-summary-theory-document"
      pdfFilename="8_osztaly_testek_fejezeti_osszefoglalas.pdf"
      quickRule={{
        label: 'A Térgeometria Legfontosabb Alapképletei',
        align: 'left',
        formula: (
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1 text-left font-bold">
            <span className="shrink-0"><MathText text="V_{\text{hasáb}} = T_a \cdot m," /></span>
            <span className="shrink-0"><MathText text="V_{\text{gúla}} = \frac{T_a \cdot m}{3}," /></span>
            <span className="shrink-0"><MathText text="A_{\text{gömb}} = 4\pi r^2," /></span>
            <span className="shrink-0"><MathText text="V_{\text{gömb}} = \frac{4}{3}\pi r^3" /></span>
          </div>
        )
      }}
      practiceTitle="Készen állsz a nagy fejezeti témazáró kvízre?"
      practiceSubtitle="90 kérdés 3 szinten (30 feladat szintenként!), kártyás párosítóval és csoportosító játékkal!"
      practiceButtonText="Témazáró Kvíz Indítása (90 feladat)"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
    >
      {/* =========================================================================
          1. FEJEZET: HASÁBOK ÉS FORGÁSHENGER
          ========================================================================= */}
      <TheorySection
        number={1}
        title="Hasábok és Forgáshenger (Egyenes Testek)"
        badge="Hasábok & Henger"
        badgeColor="indigo"
        icon={<Box className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Közös vonásuk, hogy két egymással párhuzamos, egybevágó alaplapjuk van (alaplap és fedőlap), a palástjuk kiterítve egyetlen nagy téglalap, térfogatuk pedig mindig az <strong>alapterület és a testmagasság szorzata</strong>: <MathText text="V = T_a \cdot m" />.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <TheoryCard title="Kocka (él: a)" icon={<Box className="w-4 h-4 text-indigo-600" />}>
              <div className="space-y-1 text-xs">
                <div className="font-mono font-bold text-indigo-900 dark:text-indigo-200">
                  <MathText text="A = 6a^2, \quad V = a^3" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Lapátló: <MathText text="d_{\text{lap}} = a\sqrt{2}" />
                  <br />
                  Testátló: <MathText text="d_{\text{test}} = a\sqrt{3}" />
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Téglatest (a, b, c)" icon={<Layers className="w-4 h-4 text-purple-600" />}>
              <div className="space-y-1 text-xs">
                <div className="font-mono font-bold text-purple-900 dark:text-purple-200">
                  <MathText text="A = 2(ab + bc + ac)" />
                  <br />
                  <MathText text="V = a \cdot b \cdot c" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Testátló: <MathText text="d = \sqrt{a^2 + b^2 + c^2}" />
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Forgáshenger (r, m)" icon={<Cylinder className="w-4 h-4 text-cyan-600" />}>
              <div className="space-y-1 text-xs">
                <div className="font-mono font-bold text-cyan-900 dark:text-cyan-200">
                  <MathText text="A = 2r^2\pi + 2r\pi m" />
                  <br />
                  <MathText text="V = r^2\pi \cdot m" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Palástterület: <MathText text="T_p = 2r\pi \cdot m" />
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. FEJEZET: A GÚLÁK CSALÁDJA ÉS A HARMADOLÓ ELV
          ========================================================================= */}
      <TheorySection
        number={2}
        title="A Gúlák Családja és a Harmadoló Összefüggés"
        badge="Gúlák"
        badgeColor="indigo"
        icon={<Triangle className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A gúla alaplapja tetszőleges sokszög, egyetlen testcsúcsa van, oldallapjai közös csúcsban találkozó háromszögek.
          </p>

          <TheoryCallout
            title="A térgeometria harmadoló törvénye"
            icon={<Scale className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <p>
              Bármely gúla térfogata <strong>pontosan egyharmada</strong> az azonos alapterületű és azonos magasságú egyenes hasáb térfogatának:
            </p>
            <div className="my-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 text-center font-mono font-black text-sm text-indigo-900 dark:text-indigo-200">
              <MathText text="V_{\text{gúla}} = \frac{T_a \cdot m}{3} = \frac{1}{3} \cdot V_{\text{hasáb}}" />
            </div>
            <p className="text-xs text-slate-500">
              Ez azt jelenti, hogy 3 db azonos alapterületű és magasságú ferde vagy szabályos gúlából pontosan összeállítható 1 hasáb!
            </p>
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <TheoryCard title="Felszín (A)" icon={<Maximize2 className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="font-mono font-bold text-emerald-900 dark:text-emerald-200">
                  <MathText text="A = T_a + T_p" />
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Csak egyetlen alaplapja van! Palástja (<MathText text="T_p" />) a csatlakozó háromszöglapok területének összege. Szabályos négyzet alapú gúlánál: <MathText text="T_p = 4 \cdot \frac{a \cdot m_o}{2} = 2 \cdot a \cdot m_o" />.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Tetraéder (Szabályos 4-oldalú)" icon={<Sparkles className="w-4 h-4 text-purple-600" />}>
              <div className="space-y-1.5 text-xs">
                <p className="text-slate-600 dark:text-slate-400">
                  4 egybevágó szabályos háromszöglap határolja. Euler-tétel érvényes rá:
                </p>
                <div className="p-1.5 rounded bg-purple-50 dark:bg-purple-950/40 text-center font-mono font-bold text-purple-900 dark:text-purple-200">
                  <MathText text="\text{Lapok} (4) + \text{Csúcsok} (4) - \text{Élek} (6) = 2" />
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. FEJEZET: PITAGORASZ-TÉTEL A TÉRGEOMETRIÁBAN
          ========================================================================= */}
      <TheorySection
        number={3}
        title="A Pitagorasz-tétel Kulcsszerepe a Térben"
        badge="Pitagorasz térben"
        badgeColor="indigo"
        icon={<Ruler className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A térbeli feladatok megoldásának kulcsa, hogy a testeket képzeletben síkmetszetekkel szeljük át, és az így keletkező <strong>derékszögű háromszögekre</strong> felírjuk a Pitagorasz-tételt:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TheoryCard title="1. Gúla belső háromszöge" icon={<Triangle className="w-4 h-4 text-indigo-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="font-mono font-bold text-indigo-800 dark:text-indigo-200 text-center py-1 bg-indigo-50 dark:bg-indigo-950/50 rounded">
                  <MathText text="m^2 + \left(\frac{a}{2}\right)^2 = m_o^2" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Befogók: testmagasság (<MathText text="m" />) és alapél fele (<MathText text="a/2" />). Átfogó: oldallap-magasság (<MathText text="m_o" />).
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="2. Gúla oldallapi háromszöge" icon={<Triangle className="w-4 h-4 text-emerald-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="font-mono font-bold text-emerald-800 dark:text-emerald-200 text-center py-1 bg-emerald-50 dark:bg-emerald-950/50 rounded">
                  <MathText text="m_o^2 + \left(\frac{a}{2}\right)^2 = b^2" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Befogók: oldalmagasság (<MathText text="m_o" />) és alapél fele (<MathText text="a/2" />). Átfogó: oldalél (<MathText text="b" />).
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="3. Átlós síkmetszet háromszöge" icon={<Triangle className="w-4 h-4 text-purple-600" />}>
              <div className="space-y-1.5 text-xs">
                <div className="font-mono font-bold text-purple-800 dark:text-purple-200 text-center py-1 bg-purple-50 dark:bg-purple-950/50 rounded">
                  <MathText text="m^2 + \left(\frac{d}{2}\right)^2 = b^2" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Befogók: testmagasság (<MathText text="m" />) és lapátló fele (<MathText text="d/2" />). Átfogó: oldalél (<MathText text="b" />).
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. FEJEZET: A GÖMB ÉS A FÖLD GEOMETRIÁJA
          ========================================================================= */}
      <TheorySection
        number={4}
        title="A Gömb és a Föld Geometriai Modellje"
        badge="Gömb & Föld"
        badgeColor="indigo"
        icon={<Globe className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="A Gömb Képletei" icon={<Circle className="w-4 h-4 text-blue-600" />}>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-200 font-mono font-bold text-blue-900 dark:text-blue-200 text-center">
                  <MathText text="A = 4\pi r^2, \quad V = \frac{4}{3}\pi r^3" />
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Félgömb felszíne:</strong> <MathText text="A = 3\pi r^2" /> (palást <MathText text="2\pi r^2" /> + alapkör <MathText text="\pi r^2" />).</li>
                  <li><strong>Félgömb térfogata:</strong> <MathText text="V = \frac{2}{3}\pi r^3" />.</li>
                  <li><strong>Köré írt henger aránya:</strong> A gömb térfogata a hengerének pontosan <MathText text="\frac{2}{3}" /> része (Archimédész).</li>
                </ul>
              </div>
            </TheoryCard>

            <TheoryCard title="A Föld Gömbmodellje" icon={<Globe className="w-5 h-4 text-teal-600" />}>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 font-mono font-bold text-teal-900 dark:text-teal-200 text-center">
                  <MathText text="R \approx 6370\text{ km}, \quad K_{\text{Egyenlítő}} \approx 40\,000\text{ km}" />
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li><strong>Felszín:</strong> <MathText text="A \approx 510\text{ millió km}^2" /> (71% víz : 29% szárazföld).</li>
                  <li><strong>Térfogat:</strong> <MathText text="V \approx 1083\text{ milliárd km}^3" />.</li>
                  <li><strong>Távolságarány:</strong> <MathText text="1^\circ\text{ szélesség} \approx 111,1\text{ km}" /> a délkör mentén.</li>
                  <li><strong>Ortodróma:</strong> A két ponton átmenő főkör íve a legrövidebb út.</li>
                </ul>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. FEJEZET: TÉRBELI HASONLÓSÁG ÉS ANYAGI TULAJDONSÁGOK
          ========================================================================= */}
      <TheorySection
        number={5}
        title="Térbeli Hasonlóság és Sűrűségszámítás"
        badge="Arányok & Fizika"
        badgeColor="indigo"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-850 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              A hasonlóság aranyszabálya (k, k², k³)
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Ha egy térbeli test minden élét / lineáris méretét a <MathText text="k" />-szorosára növeljük:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2.5">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border text-center font-mono font-bold text-xs text-indigo-700 dark:text-indigo-300">
                Élek, kerületek: <MathText text="k\text{-szoros}" />
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border text-center font-mono font-bold text-xs text-purple-700 dark:text-purple-300">
                Felszínek, területek: <MathText text="k^2\text{-szeres}" />
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border text-center font-mono font-bold text-xs text-rose-700 dark:text-rose-300">
                Térfogatok, tömegek: <MathText text="k^3\text{-szoros}" />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Például ha egy kocka élét a 3-szorosára növeljük: a felülete <MathText text="3^2 = 9" />-szeresére, térfogata és tömege viszont <MathText text="3^3 = 27" />-szeresére nő!
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                Tömeg és sűrűség kapcsolata:
              </span>
              <span className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400">
                <MathText text="m = \rho \cdot V, \quad \rho = \frac{m}{V}" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Figyelj a mértékegységekre: <MathText text="\text{g/cm}^3 \iff \text{kg/dm}^3" />, illetve <MathText text="1\text{ dm}^3 = 1\text{ liter}" />.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV ÖSSZEHASONLÍTÓ LABOR
          ========================================================================= */}
      <TheorySection
        number={6}
        title="Interaktív Összehasonlító Labor: Felszín és Térfogat Skálázás"
        badge="Labor"
        badgeColor="indigo"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Válassz ki egy geometriai testet, állítsd be az élhosszt / átmérőt és magasságot, és figyeld meg a felszín és térfogat alakulását!
          </p>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-sm space-y-5">
            {/* Test választó gombok */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'cube', label: 'Kocka', icon: <Box className="w-4 h-4" /> },
                { id: 'prism', label: 'Hasáb', icon: <Layers className="w-4 h-4" /> },
                { id: 'cylinder', label: 'Henger', icon: <Cylinder className="w-4 h-4" /> },
                { id: 'pyramid', label: 'Gúla', icon: <Triangle className="w-4 h-4" /> },
                { id: 'sphere', label: 'Gömb', icon: <Circle className="w-4 h-4" /> },
              ].map((solid) => (
                <button
                  key={solid.id}
                  onClick={() => setSelectedSolid(solid.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
                    selectedSolid === solid.id
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {solid.icon}
                  <span>{solid.label}</span>
                </button>
              ))}
            </div>

            {/* Csúszkák */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Alapél / Átmérő (a = d):</span>
                  <span className="font-mono text-indigo-600">{dimensionA} cm</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={dimensionA}
                  onChange={(e) => setDimensionA(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-750 rounded-lg"
                />
              </div>

              {selectedSolid !== 'cube' && selectedSolid !== 'sphere' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Testmagasság (m):</span>
                    <span className="font-mono text-indigo-600">{heightM} cm</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={heightM}
                    onChange={(e) => setHeightM(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-750 rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Számított adatok kártyák */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-center">
                <div className="text-[10px] uppercase font-bold text-indigo-800 dark:text-indigo-300 tracking-wider">
                  Felszín (A)
                </div>
                <div className="text-2xl font-black font-mono text-indigo-900 dark:text-indigo-100 mt-1">
                  {calculatedA.toLocaleString()} cm²
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-center">
                <div className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 tracking-wider">
                  Térfogat (V)
                </div>
                <div className="text-2xl font-black font-mono text-purple-900 dark:text-purple-100 mt-1">
                  {calculatedV.toLocaleString()} cm³
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 font-medium italic">
              {solidDescription}
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          7. FEJEZET: ÖNELLENŐRZŐ MINI KVÍZ
          ========================================================================= */}
      <TheorySection
        number={7}
        title="Gyors Önellenőrző Kérdések"
        badge="Teszt"
        badgeColor="indigo"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
      >
        <div className="space-y-3.5 text-xs sm:text-sm">
          {/* 1. kérdés */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              1. Ha egy gúla és egy hasáb alapterülete és testmagassága megegyezik, mekkora a gúla térfogata a hasábéhoz képest?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { text: 'Pontosan az egyharmada (1/3)', correct: true },
                { text: 'A fele (1/2)', correct: false },
                { text: 'A kétszerese', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuiz1Answer(i)}
                  className={`p-2 rounded-xl text-left font-bold text-xs border-2 transition-all cursor-pointer ${
                    quiz1Answer === i
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <p className="text-[11px] text-slate-500 pt-1">
                {quiz1Answer === 0 ? '✓ Helyes! V_gúla = (Ta · m) / 3.' : '✗ Nem jó! A gúla térfogata mindig 1/3-a a megfelelő hasábnak.'}
              </p>
            )}
          </div>

          {/* 2. kérdés */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              2. Ha egy kocka minden élét kétszeresére növeljük, hányszorosára nő a térfogata?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { text: '4-szeresére', correct: false },
                { text: '8-szorosára (2³ = 8)', correct: true },
                { text: '2-szeresére', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuiz2Answer(i)}
                  className={`p-2 rounded-xl text-left font-bold text-xs border-2 transition-all cursor-pointer ${
                    quiz2Answer === i
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <p className="text-[11px] text-slate-500 pt-1">
                {quiz2Answer === 1 ? '✓ Helyes! A térfogat a köbös aránnyal (k³ = 2³ = 8) nő.' : '✗ A térfogat a köbös aránnyal nő: 2³ = 8-szorosára!'}
              </p>
            )}
          </div>

          {/* 3. kérdés */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              3. Mekkora a gömb felszíne, ha a sugara r = 5 cm (π ≈ 3,14)?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { text: '314 cm² (4 · 3,14 · 25)', correct: true },
                { text: '157 cm²', correct: false },
                { text: '523 cm²', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuiz3Answer(i)}
                  className={`p-2 rounded-xl text-left font-bold text-xs border-2 transition-all cursor-pointer ${
                    quiz3Answer === i
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : 'bg-rose-50 border-rose-500 text-rose-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <p className="text-[11px] text-slate-500 pt-1">
                {quiz3Answer === 0 ? '✓ Pontos! A = 4πr² = 4 · 3,14 · 25 = 314 cm².' : '✗ A = 4 · π · r² = 4 · 3,14 · 25 = 314 cm².'}
              </p>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SolidsSummaryTheory;
