import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Compass,
  Shapes,
  Maximize2,
  Box,
  Target,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Ruler,
  CircleDot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface TriangleLinesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const TriangleLinesTheory: React.FC<TriangleLinesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab state
  const [triangleType, setTriangleType] = useState<'acute' | 'right' | 'obtuse'>('acute');
  const [showCircumcircle, setShowCircumcircle] = useState(true);
  const [showIncircle, setShowIncircle] = useState(false);
  const [showAltitudes, setShowAltitudes] = useState(false);
  const [showMedians, setShowMedians] = useState(false);
  const [showMidlines, setShowMidlines] = useState(false);

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      title="2. Háromszögek nevezetes vonalai és pontjai"
      subtitle="Ismerd meg az oldalfelező merőlegeseket, belső szögfelezőket, magasságvonalakat, súlyvonalakat és középvonalakat, valamint a köré írható és beírható kört!"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFilename="7_osztaly_haromszogek_nevezetes_vonalai.pdf"
      quickRule={{
        label: 'Nevezetes pontok',
        formula: 'O: Körülírt kör, K: Beírt kör, M: Magasságpont, S: Súlypont'
      }}
      practiceTitle="Készen állsz a háromszögek nevezetes vonalainak és pontjainak tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 szinten ábrákkal, kártyás párosítóval és csoportosítóval!"
    >
      {/* 1. SZEKCIÓ: Oldalfelező merőlegesek & Köré írható kör */}
      <TheorySection
        id="section-circumcenter"
        title="1. Oldalfelező merőlegesek és a Köré írható kör"
        badge="Köré írt kör (O)"
        badgeColor="indigo"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Egy szakasz <strong>oldalfelező merőlegese</strong> a szakasz felezőpontjára állított merőleges egyenes. Minden pontja <strong>egyenlő távolságra van a szakasz két végpontjától</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="A Köré Írható Kör Középpontja (O)"
            badge="OA = OB = OC = R"
            variant="indigo"
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p>
                A háromszög mindhárom oldalfelező merőlegese <strong>egyetlen közös pontban metszi egymást</strong>. Ez a pont ($O$) egyenlő távolságra van a háromszög mindhárom csúcsától.
              </p>
              <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
                <strong>{"Sugár (R):"}</strong> {"R = OA = OB = OC"}. Ez a kör mindhárom csúcson áthalad, így ez a háromszög <strong>köré írt köre</strong>.
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Oldalfelező merőlegesek metszéspontja"
            subtitle="Köré írt kör középpontja (O)"
            figure={
              <svg viewBox="0 0 200 130" className="w-full h-32">
                {/* Circumcircle */}
                <circle cx="100" cy="70" r="50" fill="none" className="stroke-indigo-300 dark:stroke-indigo-700 stroke-[1.5]" strokeDasharray="3 3" />
                {/* Triangle */}
                <polygon points="100,20 56,95 144,95" className="fill-indigo-50/50 dark:fill-indigo-950/30 stroke-indigo-600 stroke-[2.5]" />
                {/* Midpoint perpendicular bisectors */}
                <line x1="100" y1="20" x2="100" y2="120" className="stroke-teal-500 stroke-[1.5]" strokeDasharray="2 2" />
                <line x1="40" y1="40" x2="140" y2="90" className="stroke-teal-500 stroke-[1.5]" strokeDasharray="2 2" />
                <line x1="160" y1="40" x2="60" y2="90" className="stroke-teal-500 stroke-[1.5]" strokeDasharray="2 2" />
                {/* Circumcenter O */}
                <circle cx="100" cy="70" r="4" className="fill-indigo-700" />
                <text x="106" y="72" className="text-[10px] font-black fill-indigo-800 dark:fill-indigo-200">O</text>
                {/* Vertices */}
                <text x="96" y="14" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">A</text>
                <text x="44" y="104" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">B</text>
                <text x="148" y="104" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">C</text>
              </svg>
            }
            properties={[
              { label: "Jelölése", value: "f_a, f_b, f_c" },
              { label: "Metszéspont", value: "O (Köré írt kör középpontja)" },
              { label: "Sugár", value: "R = OA = OB = OC" }
            ]}
          />
        </div>

        {/* 3 Háromszögtípus elhelyezkedése */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-indigo-200 dark:border-indigo-900 text-center">
            <div className="font-bold text-xs text-indigo-700 dark:text-indigo-300">Hegyesszögű háromszög</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Az $O$ pont a háromszög <strong>belsejében</strong> helyezkedik el.
            </div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-teal-200 dark:border-teal-900 text-center">
            <div className="font-bold text-xs text-teal-700 dark:text-teal-300">Derékszögű háromszög</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Az $O$ pont pontosan az <strong>átfogó felezőpontjára</strong> esik (Thalész-tétel!). $R = c/2$.
            </div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-850 rounded-2xl border border-rose-200 dark:border-rose-900 text-center">
            <div className="font-bold text-xs text-rose-700 dark:text-rose-300">Tompaszögű háromszög</div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
              Az $O$ pont a háromszög <strong>területén kívül</strong>, a tompaszög melletti oldallal szemben van.
            </div>
          </div>
        </div>

        <TheoryTrapBox
          title="Gyakori tévedés: Ne keverd a köröket!"
          wrongText="A köré írható kör középpontja mindig a háromszög belsejében van."
          correctText="Tompaszögű háromszögnél a köré írt kör középpontja (O) KÍVÜLRE esik, míg derékszögűnél pontosan az átfogó felezőpontja!"
          explanation="Csak a beírható kör középpontja (K) van mindig a háromszög belsejében, az O pont kifuthat a háromszögből."
        />
      </TheorySection>

      {/* 2. SZEKCIÓ: Belső szögfelezők & Beírható kör */}
      <TheorySection
        id="section-incenter"
        title="2. Belső szögfelezők és a Beírható kör"
        badge="Beírt kör (K vagy I)"
        badgeColor="teal"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A háromszög belső szögét felező félegyenes a <strong>belső szögfelező</strong> ({"w_α, w_β, w_γ"}). Minden pontja <strong>egyenlő távolságra van a szöget bezáró két oldaltól</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="A Beírható Kör Középpontja (K)"
            badge="d(K, a) = d(K, b) = d(K, c) = r"
            variant="teal"
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p>
                A háromszög három belső szögfelezője <strong>egyetlen pontban metszi egymást</strong>. Ez a pont ($K$ vagy $I$) a háromszög mindhárom oldalától egyenlő távolságra van.
              </p>
              <div className="p-2.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200">
                <strong>Fontos szabály:</strong> A beírható kör középpontja <em>bármilyen</em> háromszög esetén (hegyes-, derék-, tompaszögű) <strong>mindig a háromszög belsejében</strong> található!
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Belső szögfelezők és beírt kör"
            subtitle="Beírható kör középpontja (K)"
            figure={
              <svg viewBox="0 0 200 130" className="w-full h-32">
                {/* Triangle */}
                <polygon points="100,20 40,110 160,110" className="fill-teal-50/50 dark:fill-teal-950/30 stroke-teal-600 stroke-[2.5]" />
                {/* Incircle */}
                <circle cx="100" cy="80" r="30" fill="none" className="stroke-teal-500 stroke-[2]" />
                {/* Angle bisectors */}
                <line x1="100" y1="20" x2="100" y2="110" className="stroke-emerald-600 stroke-[1.5]" strokeDasharray="3 3" />
                <line x1="40" y1="110" x2="135" y2="55" className="stroke-emerald-600 stroke-[1.5]" strokeDasharray="3 3" />
                <line x1="160" y1="110" x2="65" y2="55" className="stroke-emerald-600 stroke-[1.5]" strokeDasharray="3 3" />
                {/* Incenter K */}
                <circle cx="100" cy="80" r="4" className="fill-emerald-700" />
                <text x="106" y="82" className="text-[10px] font-black fill-emerald-800 dark:fill-emerald-200">K</text>
                {/* Radius r */}
                <line x1="100" y1="80" x2="100" y2="110" className="stroke-rose-500 stroke-[1.5]" />
                <text x="104" y="98" className="text-[9px] font-bold fill-rose-600 font-mono">r</text>
              </svg>
            }
            properties={[
              { label: "Jelölése", value: "w_α, w_β, w_γ" },
              { label: "Metszéspont", value: "K vagy I (Beírt kör középpontja)" },
              { label: "Elhelyezkedés", value: "Mindig a háromszög belsejében" }
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: Magasságvonalak & Magasságpont */}
      <TheorySection
        id="section-orthocenter"
        title="3. Magasságvonalak és a Magasságpont"
        badge="Magasságpont (M)"
        badgeColor="blue"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A háromszög egy csúcsából a szemközti oldal egyenesére bocsátott <strong>merőleges egyenest</strong> nevezzük a háromszög <strong>magasságvonalának</strong>. A csúcs és az oldalegyenes közötti merőleges szakasz a <strong>magasság</strong> ($m_a, m_b, m_c$).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="A Magasságpont (M) Elhelyezkedése"
            badge="m_a, m_b, m_c metszéspontja"
            variant="blue"
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2.5">
              <p>A három magasságvonal egyenes egy pontban metszi egymást, ez a <strong>magasságpont ($M$)</strong>.</p>
              <ul className="space-y-1.5 list-disc pl-4">
                <li><strong>Hegyesszögű:</strong> $M$ a háromszög <strong>belsejében</strong> van.</li>
                <li><strong>Derékszögű:</strong> $M$ pontosan a <strong>derékszögű csúcsban</strong> van (a két befogó maga a magasságvonal!).</li>
                <li><strong>Tompaszögű:</strong> $M$ a háromszög <strong>területén kívül</strong>, a tompaszögű csúcs mögött fekszik.</li>
              </ul>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Magasságvonalak és Magasságpont"
            subtitle="m_a, m_b, m_c merőleges szakaszok"
            figure={
              <svg viewBox="0 0 200 130" className="w-full h-32">
                {/* Triangle */}
                <polygon points="90,20 35,105 165,105" className="fill-blue-50/50 dark:fill-blue-950/30 stroke-blue-600 stroke-[2.5]" />
                {/* Altitudes */}
                <line x1="90" y1="20" x2="90" y2="105" className="stroke-rose-600 stroke-[1.8]" />
                <line x1="35" y1="105" x2="122" y2="56" className="stroke-rose-600 stroke-[1.8]" />
                <line x1="165" y1="105" x2="66" y2="57" className="stroke-rose-600 stroke-[1.8]" />
                {/* Right angle markers */}
                <rect x="90" y="97" width="8" height="8" fill="none" className="stroke-rose-400 stroke-[1]" />
                {/* Orthocenter M */}
                <circle cx="90" cy="70" r="4" className="fill-rose-600" />
                <text x="96" y="73" className="text-[10px] font-black fill-rose-700 dark:fill-rose-300">M</text>
                <text x="94" y="48" className="text-[9px] font-mono font-bold fill-rose-600">m_a</text>
              </svg>
            }
            properties={[
              { label: "Jelölése", value: "m_a, m_b, m_c" },
              { label: "Metszéspont", value: "M (Magasságpont)" },
              {
                label: "Területképlet",
                value: (
                  <span className="inline-flex items-center gap-1 flex-wrap font-mono">
                    <span>T = </span>
                    <Fraction num="a · m_a" den="2" size="sm" />
                    <span> = </span>
                    <Fraction num="b · m_b" den="2" size="sm" />
                  </span>
                )
              }
            ]}
          />
        </div>

        <TheoryCallout
          type="warning"
          title="Figyelem tompaszögű háromszög szerkesztésénél!"
        >
          Tompaszögű háromszögnél a hegyesszögekből induló magasságok talppontjai <strong>az oldalak meghosszabbításaira</strong> esnek. Ezért a magasság megrajzolásához először meg kell hosszabbítani az oldal egyenesét!
        </TheoryCallout>
      </TheorySection>

      {/* 4. SZEKCIÓ: Súlyvonalak & Súlypont */}
      <TheorySection
        id="section-centroid"
        title="4. Súlyvonalak és a Súlypont (2 : 1 arány)"
        badge="Súlypont (S)"
        badgeColor="purple"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A háromszög egy csúcsát a szemközti oldal <strong>felezőpontjával</strong> összekötő szakaszt <strong>súlyvonalnak</strong> nevezzük (<MathText>{'s_a, s_b, s_c'}</MathText>).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard
            title="A Súlypont Aranyszabálya (2 : 1)"
            badge="Mindig belül van"
            variant="purple"
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p>
                A három súlyvonal <strong>egyetlen pontban, a súlypontban (<MathText>{'S'}</MathText>)</strong> metszi egymást.
              </p>
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 space-y-1.5 font-mono">
                <div className="font-bold text-sm">AS : SF_a = 2 : 1</div>
                <div className="text-xs flex items-center gap-1">
                  <span>AS = </span>
                  <Fraction num="2" den="3" size="sm" />
                  <span>· s_a  (csúcstól számított hosszabb rész)</span>
                </div>
                <div className="text-xs flex items-center gap-1">
                  <span>SF_a = </span>
                  <Fraction num="1" den="3" size="sm" />
                  <span>· s_a  (felezőpont felőli rövidebb rész)</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                <strong>Fizikai jelentés:</strong> A súlypont a homogén lemezből kivágott háromszög tömegközéppontja. Egy tű hegyére állítva ott egyensúlyozható ki!
              </p>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="Súlyvonalak és Súlypont"
            subtitle="Felezőpontok és 2 : 1 osztóarány"
            figure={
              <svg viewBox="0 0 200 130" className="w-full h-32">
                {/* Triangle */}
                <polygon points="100,20 30,110 170,110" className="fill-purple-50/50 dark:fill-purple-950/30 stroke-purple-600 stroke-[2.5]" />
                {/* Medians */}
                <line x1="100" y1="20" x2="100" y2="110" className="stroke-purple-500 stroke-[1.8]" />
                <line x1="30" y1="110" x2="135" y2="65" className="stroke-purple-500 stroke-[1.8]" />
                <line x1="170" y1="110" x2="65" y2="65" className="stroke-purple-500 stroke-[1.8]" />
                {/* Midpoint markers */}
                <circle cx="100" cy="110" r="3" className="fill-slate-600" />
                <text x="96" y="122" className="text-[8px] font-bold fill-slate-700">F_c</text>
                {/* Centroid S */}
                <circle cx="100" cy="80" r="4.5" className="fill-purple-800" />
                <text x="106" y="82" className="text-[10px] font-black fill-purple-900 dark:fill-purple-200">S</text>
                {/* Ratio labels */}
                <text x="86" y="55" className="text-[9px] font-mono font-bold fill-purple-600">2x</text>
                <text x="86" y="98" className="text-[9px] font-mono font-bold fill-purple-600">1x</text>
              </svg>
            }
            properties={[
              { label: "Jelölése", value: "s_a, s_b, s_c" },
              { label: "Metszéspont", value: "S (Súlypont)" },
              { label: "Osztóarány", value: "2 : 1 a csúcstól számítva" }
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: Középvonalak és az Euler-egyenes */}
      <TheorySection
        id="section-midlines-euler"
        title="5. Középvonalak és az Euler-egyenes"
        badge="Összefüggések"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Háromszög Középvonalai"
            badge="k = a / 2"
            variant="teal"
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p>
                A háromszög két oldalának felezőpontját összekötő szakasz a <strong>középvonal</strong> (<MathText>{'k_a, k_b, k_c'}</MathText>).
              </p>
              <ul className="space-y-1.5 list-disc pl-4">
                <li><strong>Párhuzamos</strong> a harmadik oldallal (<MathText>{'k_c ∥ c'}</MathText>).</li>
                <li className="flex items-center gap-1 flex-wrap">
                  <strong>Hossza fele</strong> a harmadik oldal hosszának:
                  <span>k_c = </span>
                  <Fraction num="c" den="2" size="sm" />
                </li>
                <li className="flex items-center gap-1 flex-wrap">
                  A három középvonal <strong>4 egybevágó kis háromszögre</strong> bontja az eredetit, melyek területe az eredeti terület negyede:
                  <span>T_kis = </span>
                  <Fraction num="T" den="4" size="sm" />
                </li>
              </ul>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Az Euler-egyenes"
            badge="M - S - O egy egyenesen"
            variant="rose"
          >
            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p>
                Minden <strong>nem szabályos háromszögben</strong> a magasságpont ($M$), a súlypont ($S$) és a köré írható kör középpontja ($O$) <strong>egy egyenesre esik</strong>. Ezt hívjuk <strong>Euler-egyenesnek</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 font-mono text-xs">
                <strong>Arány:</strong> {"MS : SO = 2 : 1"}
              </div>
              <p className="text-[11px] text-slate-500">
                Szabályos háromszögben a 4 nevezetes pont ($O, K, M, S$) mind egybeesik egyetlen közös középponttá!
              </p>
            </div>
          </TheoryCard>
        </div>

        {/* Összefoglaló táblázat */}
        <TheoryTable
          title="A 4 nevezetes vonal és pont összefoglaló összehasonlítása"
          headers={["Nevezetes vonal", "Jelölés", "Metszéspont", "Hegyesszögű", "Derékszögű", "Tompaszögű"]}
          rows={[
            ["Oldalfelező merőleges", "f_a, f_b, f_c", "O (Köré írt kör kp.)", "Belsejében", "Átfogó felezőpontján", "Kívül"],
            ["Belső szögfelező", "w_α, w_β, w_γ", "K (Beírt kör kp.)", "Belsejében", "Belsejében", "Belsejében"],
            ["Magasságvonal", "m_a, m_b, m_c", "M (Magasságpont)", "Belsejében", "Derékszögű csúcsban", "Kívül"],
            ["Súlyvonal", "s_a, s_b, s_c", "S (Súlypont)", "Belsejében (2:1)", "Belsejében (2:1)", "Belsejében (2:1)"]
          ]}
        />
      </TheorySection>

      {/* 6. SZEKCIÓ: Interaktív Háromszög Laboratórium */}
      <TheorySection
        id="section-interactive-lab"
        title="6. Interaktív Nevezetes Vonal Felfedező Labor"
        badge="Interaktív ábra"
        badgeColor="purple"
      >
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-900 dark:to-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Válaszd ki a háromszög típusát:</h4>
              <p className="text-xs text-slate-500">Figyeld meg a nevezetes pontok vándorlását!</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={triangleType === 'acute' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTriangleType('acute')}
                className="h-8 text-xs rounded-xl"
              >
                Hegyesszögű
              </Button>
              <Button
                variant={triangleType === 'right' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTriangleType('right')}
                className="h-8 text-xs rounded-xl"
              >
                Derékszögű
              </Button>
              <Button
                variant={triangleType === 'obtuse' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTriangleType('obtuse')}
                className="h-8 text-xs rounded-xl"
              >
                Tompaszögű
              </Button>
            </div>
          </div>

          {/* Vonal kapcsoló gombok */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant={showCircumcircle ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowCircumcircle(!showCircumcircle)}
              className={cn("h-7 text-xs rounded-lg", showCircumcircle && "bg-indigo-600 hover:bg-indigo-700")}
            >
              Köré írt kör (O)
            </Button>
            <Button
              variant={showIncircle ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowIncircle(!showIncircle)}
              className={cn("h-7 text-xs rounded-lg", showIncircle && "bg-teal-600 hover:bg-teal-700")}
            >
              Beírt kör (K)
            </Button>
            <Button
              variant={showAltitudes ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowAltitudes(!showAltitudes)}
              className={cn("h-7 text-xs rounded-lg", showAltitudes && "bg-rose-600 hover:bg-rose-700")}
            >
              Magasságpont (M)
            </Button>
            <Button
              variant={showMedians ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowMedians(!showMedians)}
              className={cn("h-7 text-xs rounded-lg", showMedians && "bg-purple-600 hover:bg-purple-700")}
            >
              Súlypont (S, 2:1)
            </Button>
            <Button
              variant={showMidlines ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowMidlines(!showMidlines)}
              className={cn("h-7 text-xs rounded-lg", showMidlines && "bg-amber-600 hover:bg-amber-700")}
            >
              Középvonalak
            </Button>
          </div>

          {/* Dinamikus SVG vászon */}
          <div className="h-64 sm:h-72 w-full bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 relative overflow-hidden shadow-inner">
            {triangleType === 'acute' && (
              <svg viewBox="0 0 300 200" className="w-full h-full max-h-64">
                {/* Circumcircle */}
                {showCircumcircle && (
                  <>
                    <circle cx="150" cy="115" r="76" fill="none" className="stroke-indigo-400 dark:stroke-indigo-600 stroke-[1.5]" strokeDasharray="3 3" />
                    <circle cx="150" cy="115" r="5" className="fill-indigo-600" />
                    <text x="156" y="118" className="text-[11px] font-black fill-indigo-700 dark:fill-indigo-300">O</text>
                  </>
                )}
                {/* Triangle */}
                <polygon points="150,40 80,160 220,160" className="fill-indigo-50/40 dark:fill-indigo-950/20 stroke-slate-800 dark:stroke-slate-200 stroke-[2.5]" />
                {/* Incircle */}
                {showIncircle && (
                  <>
                    <circle cx="150" cy="125" r="35" fill="none" className="stroke-teal-500 stroke-[1.8]" />
                    <circle cx="150" cy="125" r="4.5" className="fill-teal-600" />
                    <text x="156" y="128" className="text-[11px] font-black fill-teal-700 dark:fill-teal-300">K</text>
                  </>
                )}
                {/* Altitudes */}
                {showAltitudes && (
                  <>
                    <line x1="150" y1="40" x2="150" y2="160" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
                    <line x1="80" y1="160" x2="185" y2="100" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
                    <line x1="220" y1="160" x2="115" y2="100" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
                    <circle cx="150" cy="100" r="4.5" className="fill-rose-600" />
                    <text x="156" y="103" className="text-[11px] font-black fill-rose-700 dark:fill-rose-300">M</text>
                  </>
                )}
                {/* Medians */}
                {showMedians && (
                  <>
                    <line x1="150" y1="40" x2="150" y2="160" className="stroke-purple-500 stroke-[1.5]" />
                    <line x1="80" y1="160" x2="185" y2="100" className="stroke-purple-500 stroke-[1.5]" />
                    <line x1="220" y1="160" x2="115" y2="100" className="stroke-purple-500 stroke-[1.5]" />
                    <circle cx="150" cy="120" r="4.5" className="fill-purple-700" />
                    <text x="136" y="123" className="text-[11px] font-black fill-purple-800 dark:fill-purple-300">S</text>
                  </>
                )}
                {/* Midlines */}
                {showMidlines && (
                  <polygon points="115,100 185,100 150,160" fill="none" className="stroke-amber-500 stroke-[2]" strokeDasharray="3 3" />
                )}
                {/* Vertices */}
                <text x="146" y="30" className="text-xs font-bold fill-slate-800 dark:fill-white">A</text>
                <text x="65" y="170" className="text-xs font-bold fill-slate-800 dark:fill-white">B</text>
                <text x="225" y="170" className="text-xs font-bold fill-slate-800 dark:fill-white">C</text>
              </svg>
            )}

            {triangleType === 'right' && (
              <svg viewBox="0 0 300 200" className="w-full h-full max-h-64">
                {/* Circumcircle */}
                {showCircumcircle && (
                  <>
                    <circle cx="150" cy="100" r="78" fill="none" className="stroke-indigo-400 dark:stroke-indigo-600 stroke-[1.5]" strokeDasharray="3 3" />
                    <circle cx="150" cy="100" r="5" className="fill-indigo-600" />
                    <text x="156" y="96" className="text-[11px] font-black fill-indigo-700 dark:fill-indigo-300">O (Átfogó felezője)</text>
                  </>
                )}
                {/* Triangle */}
                <polygon points="80,50 80,150 220,150" className="fill-indigo-50/40 dark:fill-indigo-950/20 stroke-slate-800 dark:stroke-slate-200 stroke-[2.5]" />
                <rect x="80" y="136" width="14" height="14" fill="none" className="stroke-slate-600 stroke-[1.5]" />
                {/* Incircle */}
                {showIncircle && (
                  <>
                    <circle cx="110" cy="120" r="30" fill="none" className="stroke-teal-500 stroke-[1.8]" />
                    <circle cx="110" cy="120" r="4.5" className="fill-teal-600" />
                    <text x="116" y="123" className="text-[11px] font-black fill-teal-700 dark:fill-teal-300">K</text>
                  </>
                )}
                {/* Altitudes / Orthocenter */}
                {showAltitudes && (
                  <>
                    <line x1="80" y1="150" x2="135" y2="89" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
                    <circle cx="80" cy="150" r="5" className="fill-rose-600" />
                    <text x="56" y="162" className="text-[11px] font-black fill-rose-700 dark:fill-rose-300">M = C</text>
                  </>
                )}
                {/* Medians */}
                {showMedians && (
                  <>
                    <line x1="80" y1="50" x2="150" y2="150" className="stroke-purple-500 stroke-[1.5]" />
                    <line x1="220" y1="150" x2="80" y2="100" className="stroke-purple-500 stroke-[1.5]" />
                    <line x1="80" y1="150" x2="150" y2="100" className="stroke-purple-500 stroke-[1.5]" />
                    <circle cx="127" cy="117" r="4.5" className="fill-purple-700" />
                    <text x="133" y="117" className="text-[11px] font-black fill-purple-800 dark:fill-purple-300">S</text>
                  </>
                )}
                {/* Midlines */}
                {showMidlines && (
                  <polygon points="80,100 150,100 150,150" fill="none" className="stroke-amber-500 stroke-[2]" strokeDasharray="3 3" />
                )}
                {/* Vertices */}
                <text x="70" y="45" className="text-xs font-bold fill-slate-800 dark:fill-white">A</text>
                <text x="65" y="160" className="text-xs font-bold fill-slate-800 dark:fill-white">C (90°)</text>
                <text x="228" y="155" className="text-xs font-bold fill-slate-800 dark:fill-white">B</text>
              </svg>
            )}

            {triangleType === 'obtuse' && (
              <svg viewBox="0 0 300 200" className="w-full h-full max-h-64">
                {/* Circumcircle */}
                {showCircumcircle && (
                  <>
                    <circle cx="130" cy="165" r="95" fill="none" className="stroke-indigo-400 dark:stroke-indigo-600 stroke-[1.5]" strokeDasharray="3 3" />
                    <circle cx="130" cy="165" r="5" className="fill-indigo-600" />
                    <text x="136" y="172" className="text-[11px] font-black fill-indigo-700 dark:fill-indigo-300">O (Kívül)</text>
                  </>
                )}
                {/* Triangle */}
                <polygon points="50,110 110,80 230,110" className="fill-indigo-50/40 dark:fill-indigo-950/20 stroke-slate-800 dark:stroke-slate-200 stroke-[2.5]" />
                {/* Incircle */}
                {showIncircle && (
                  <>
                    <circle cx="118" cy="98" r="16" fill="none" className="stroke-teal-500 stroke-[1.8]" />
                    <circle cx="118" cy="98" r="4.5" className="fill-teal-600" />
                    <text x="124" y="100" className="text-[11px] font-black fill-teal-700 dark:fill-teal-300">K</text>
                  </>
                )}
                {/* Altitudes & External Orthocenter */}
                {showAltitudes && (
                  <>
                    <line x1="110" y1="80" x2="110" y2="15" className="stroke-rose-400 stroke-[1.2]" strokeDasharray="2 2" />
                    <line x1="50" y1="110" x2="110" y2="15" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
                    <line x1="230" y1="110" x2="110" y2="15" className="stroke-rose-500 stroke-[1.5]" strokeDasharray="2 2" />
                    <circle cx="110" cy="15" r="5" className="fill-rose-600" />
                    <text x="116" y="18" className="text-[11px] font-black fill-rose-700 dark:fill-rose-300">M (Kívül)</text>
                  </>
                )}
                {/* Medians */}
                {showMedians && (
                  <>
                    <line x1="110" y1="80" x2="140" y2="110" className="stroke-purple-500 stroke-[1.5]" />
                    <line x1="50" y1="110" x2="170" y2="95" className="stroke-purple-500 stroke-[1.5]" />
                    <line x1="230" y1="110" x2="80" y2="95" className="stroke-purple-500 stroke-[1.5]" />
                    <circle cx="130" cy="100" r="4.5" className="fill-purple-700" />
                    <text x="136" y="103" className="text-[11px] font-black fill-purple-800 dark:fill-purple-300">S (Belül)</text>
                  </>
                )}
                {/* Midlines */}
                {showMidlines && (
                  <polygon points="80,95 170,95 140,110" fill="none" className="stroke-amber-500 stroke-[2]" strokeDasharray="3 3" />
                )}
                {/* Vertices */}
                <text x="35" y="115" className="text-xs font-bold fill-slate-800 dark:fill-white">A</text>
                <text x="105" y="72" className="text-xs font-bold fill-slate-800 dark:fill-white">B (Tompaszög)</text>
                <text x="238" y="115" className="text-xs font-bold fill-slate-800 dark:fill-white">C</text>
              </svg>
            )}
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
            <Info className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <strong>Megfigyelés:</strong> A <strong>Súlypont ($S$)</strong> és a <strong>Beírt kör középpontja ($K$)</strong> bármilyen háromszög esetén a belső térben marad. Ezzel szemben a <strong>Magasságpont ($M$)</strong> és a <strong>Köré írt kör középpontja ($O$)</strong> tompaszögű háromszögnél a háromszögön <em>kívülre</em> vándorol!
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TriangleLinesTheory;
