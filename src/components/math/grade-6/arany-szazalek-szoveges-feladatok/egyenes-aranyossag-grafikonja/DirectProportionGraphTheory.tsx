import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  LineChart,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Compass,
  Dot,
  Layers,
  HelpCircle
} from 'lucide-react';

interface DirectProportionGraphTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const DirectProportionGraphTheory: React.FC<DirectProportionGraphTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [slopeK, setSlopeK] = useState<number>(2); // k = arányossági tényező
  const [selectedX, setSelectedX] = useState<number>(3); // kiválasztott x pont
  const [isDiscrete, setIsDiscrete] = useState<boolean>(false); // folytonos vagy diszkrét pontsor

  const calculatedY = slopeK * selectedX;

  // SVG koordináta rendszer paraméterei (0..6 x tengelyen, 0..15 y tengelyen)
  const svgWidth = 360;
  const svgHeight = 260;
  const paddingLeft = 45;
  const paddingBottom = 35;
  const paddingTop = 20;
  const paddingRight = 20;

  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const maxX = 6;
  const maxY = 15;

  const toSvgX = (x: number) => paddingLeft + (x / maxX) * plotWidth;
  const toSvgY = (y: number) => paddingTop + plotHeight - (y / maxY) * plotHeight;

  const sections: TheorySection[] = [
    {
      id: 'kep-koordinata',
      title: 'Az egyenes arányosság képe a koordináta-rendszerben',
      badge: 'Alapszabály',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha két egyenesen arányos mennyiség összetartozó értékeit derékszögű koordináta-rendszerben ábrázoljuk, 
            a kapott pontok <strong>egy origóból ($O(0; 0)$) induló egyenesre vagy félegyenesre</strong> illeszkednek.
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-lime-300 dark:border-lime-800 bg-gradient-to-r from-lime-50 via-emerald-50/50 to-lime-50 dark:from-lime-950/40 dark:via-slate-900 dark:to-lime-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-800 dark:bg-lime-900/60 dark:text-lime-300 border border-lime-200 dark:border-lime-700">
              <Sparkles className="w-3 h-3 text-lime-600" /> Kiemelt összefüggés
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-lime-950 dark:text-lime-100 tracking-wide">
              A grafikon egyenlete: y = k · x &nbsp; (átmegy az O(0; 0) ponton)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              Az egyenes arányosság grafikonja <strong>mindig átmegy az origón</strong>, mert $0$ mennyiséghez pontosan $0$ érték tartozik (pl. $0$ kg áruért $0$ Ft-ot fizetünk).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5">
              <span className="font-bold text-lime-800 dark:text-lime-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-lime-600" /> Vízszintes tengely (x)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A független változó tengelye (első adat). Ide mérjük fel a darabszámot, tömeget (kg), eltelt időt (óra, perc).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Függőleges tengely (y)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A függő változó tengelye (második adat). Ide mérjük a fizetendő összeget (Ft), megtett utat (km), térfogatot.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'folytonos-diszkret',
      title: 'Pontsor vagy folytonos vonal? (Diszkrét vs. folytonos)',
      badge: 'Fontos különbség',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakori feladat annak eldöntése, hogy a koordináta-rendszerben kapott pontokat <strong>össze szabad-e kötni folytonos vonallal</strong>, 
            vagy különálló pontokként (<strong>pontsorként</strong>) kell meghagyni őket.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-2">
              <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Dot className="w-4 h-4 text-blue-600" /> 1. Különálló pontsor (Diszkrét)
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Akkor kapunk pontsort, ha a mennyiség <strong>nem osztható tovább tetszőlegesen</strong>, csak egész darabokban értelmezhető:
              </p>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
                <li>Golyóstollak vagy füzetek darabszáma és ára ($1$ db, $2$ db... nincs $1,5$ füzet)</li>
                <li>Mozijegyek, buszjegyek száma</li>
                <li>Személyek száma és adagok</li>
              </ul>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 font-semibold text-center">
                A pontokat NEM kötjük össze!
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs space-y-2">
              <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-emerald-600" /> 2. Folytonos félegyenes (Folytonos)
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Akkor húzunk folytonos félegyenest, ha a mennyiség <strong>folytonosan mérhető</strong>, bármilyen tört érték létezik:
              </p>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
                <li>Alma, sajt vagy burgonya tömege ($2,4$ kg, $0,35$ kg is létezik)</li>
                <li>Megtett út és eltelt idő ($1,5$ óra, $42$ perc)</li>
                <li>Benzin mennyisége literben</li>
              </ul>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold text-center">
                A pontokat egyenessel/félegyenessel összekötjük!
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'leolvasas',
      title: 'Értékpárok leolvasása és megkeresése a grafikonról',
      badge: 'Gyakorlat',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A grafikon segítségével számolás nélkül is könnyedén leolvashatjuk az összetartozó mennyiségeket mindkét irányban:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="font-bold text-lime-700 dark:text-lime-400 flex items-center gap-1.5 uppercase tracking-wide">
                1. x ismeretében keresem y-t
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Példa:</strong> „Mennyibe kerül 3 kg alma?”
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Keresd meg a vízszintes tengelyen a $3$-at!</li>
                <li>Menj függőlegesen fel a grafikon vonaláig!</li>
                <li>Fordulj balra a függőleges tengelyhez, és olvasd le az értéket (pl. $1200$ Ft)!</li>
              </ol>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5 uppercase tracking-wide">
                2. y ismeretében keresem x-et
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Példa:</strong> „Hány kg almát kapok 2000 Ft-ért?”
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                <li>Keresd meg a függőleges tengelyen a $2000$-et!</li>
                <li>Menj vízszintesen jobbra a grafikon vonaláig!</li>
                <li>Engedd le merőlegesen a vízszintes tengelyhez, és olvasd le a mennyiséget (pl. $5$ kg)!</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'meredekseg',
      title: 'A grafikon meredeksége (Az arányossági tényező: k)',
      badge: 'Meredekség',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az egyenes dőlésszöge (meredeksége) közvetlenül megmutatja az <strong>arányossági tényezőt ($k$)</strong>, 
            azaz az egységárat vagy a sebességet:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">
                Nagyobb k érték ($k = 4$)
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Meredekebb egyenes:</strong> gyorsabban növekszik az ár vagy a távolság. Drágább termék vagy gyorsabb jármű.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Kisebb k érték ($k = 1$)
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Laposabb egyenes:</strong> lassabban növekszik az érték. Olcsóbb áru vagy lassabb sebesség.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-lime-200 dark:border-lime-900/50 bg-lime-50/50 dark:bg-lime-950/20 space-y-1.5">
              <span className="font-bold text-lime-800 dark:text-lime-300 block">
                Hogyan határozzuk meg k-t?
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                Bármely pontból: <code className="font-mono font-bold text-lime-700">k = y / x</code>. Nézd meg, $x = 1$-nél hol metszi a rácsvonalat!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hibak',
      title: 'Gyakori hibák és csapdák a grafikonoknál',
      badge: 'Csapdák',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Nem minden egyenes vonal képvisel egyenes arányosságot! Íme a legfontosabb ellenőrzési pontok:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                1. NEM megy át az origón ($O(0; 0)$)
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az egyenes a függőleges tengelyt nem $0$-nál, hanem pl. $500$-nál metszi (pl. taxi alapdíj: $500$ Ft + $300$ Ft/km), 
                akkor ez <strong>NEM egyenes arányosság</strong>, mert a hányados nem állandó!
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                2. Görbe vonal (nem egyenes)
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a pontok görbén helyezkednek el (pl. négyzet területe $T = a^2$ vagy féktávolság), 
                az nem egyenes arányosság, hanem négyzetes vagy más kapcsolat.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                3. Lefelé tartó vonal (csökkenő)
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az egyik mennyiség nő, a másik pedig csökken (lefelé lejtő vonal vagy hiperbola), 
                az sosem egyenes arányosság (gyakran fordított arányosság).
              </p>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-1">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                4. Tengelyek felcserélése
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Mindig ellenőrizd a tengelyek feliratát és mértékegységeit! A pont koordinátáinak sorrendje mindig $(x; y)$.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Egyenes arányosság grafikonja"
      subtitle="Koordináta-rendszer, origóból induló egyenes, diszkrét pontsor és leolvasás"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="lime"
      pdfFilename="6_osztaly_IV_egyenes_aranyossag_grafikonja_tananyag.pdf"
      quickRule={{
        label: 'A grafikon aranyszabálya',
        formula: 'A grafikon az origóból (0, 0) induló egyenes / félegyenes: y = k · x'
      }}
      practiceTitle="Készen állsz a grafikonos feladványokra?"
      practiceSubtitle="Gyakorold az értékpárok leolvasását, pontok illeszkedését és a meredekség vizsgálatát 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Koordináta-rendszer és Grafikon Labor */}
      <Card className="p-4 sm:p-5 border-lime-200 dark:border-lime-900/50 bg-gradient-to-br from-lime-50/50 via-white to-emerald-50/30 dark:from-slate-900 dark:to-lime-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-lime-200/60 dark:border-lime-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-lime-500 text-white shadow-xs">
                <LineChart className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Grafikon és Koordináta Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Változtasd az arányossági tényezőt ($k$), vizsgáld a meredekséget és az $(x; y)$ pontokat!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setIsDiscrete(false)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  !isDiscrete
                    ? 'bg-white dark:bg-slate-700 text-lime-700 dark:text-lime-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                📈 Folytonos félegyenes
              </button>
              <button
                onClick={() => setIsDiscrete(true)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  isDiscrete
                    ? 'bg-white dark:bg-slate-700 text-lime-700 dark:text-lime-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                • • • Diszkrét pontsor
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG grafikon ábra */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full max-w-[360px] h-auto select-none"
              >
                {/* Rácsvonalak */}
                {Array.from({ length: maxX + 1 }).map((_, i) => (
                  <line
                    key={`grid-x-${i}`}
                    x1={toSvgX(i)}
                    y1={paddingTop}
                    x2={toSvgX(i)}
                    y2={toSvgY(0)}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    className="dark:stroke-slate-800"
                  />
                ))}
                {Array.from({ length: maxY / 3 + 1 }).map((_, i) => {
                  const val = i * 3;
                  return (
                    <line
                      key={`grid-y-${val}`}
                      x1={toSvgX(0)}
                      y1={toSvgY(val)}
                      x2={toSvgX(maxX)}
                      y2={toSvgY(val)}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      className="dark:stroke-slate-800"
                    />
                  );
                })}

                {/* Tengelyek */}
                {/* X tengely */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(maxX) + 10}
                  y2={toSvgY(0)}
                  stroke="#475569"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
                {/* Y tengely */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(0)}
                  y2={paddingTop - 10}
                  stroke="#475569"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />

                {/* Nyíl jelölő definíció */}
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Tengely beosztás feliratok */}
                {Array.from({ length: maxX + 1 }).map((_, i) => (
                  <text
                    key={`label-x-${i}`}
                    x={toSvgX(i)}
                    y={toSvgY(0) + 16}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#64748b"
                    fontWeight="bold"
                  >
                    {i}
                  </text>
                ))}
                {Array.from({ length: maxY / 3 + 1 }).map((_, i) => {
                  const val = i * 3;
                  if (val === 0) return null;
                  return (
                    <text
                      key={`label-y-${val}`}
                      x={toSvgX(0) - 8}
                      y={toSvgY(val) + 3}
                      textAnchor="end"
                      fontSize="10"
                      fill="#64748b"
                      fontWeight="bold"
                    >
                      {val}
                    </text>
                  );
                })}

                {/* Tengely nevek */}
                <text
                  x={toSvgX(maxX) + 12}
                  y={toSvgY(0) + 4}
                  fontSize="11"
                  fontWeight="bold"
                  fill="#0f172a"
                  className="dark:fill-slate-200"
                >
                  x
                </text>
                <text
                  x={toSvgX(0) - 4}
                  y={paddingTop - 12}
                  fontSize="11"
                  fontWeight="bold"
                  fill="#0f172a"
                  className="dark:fill-slate-200"
                >
                  y
                </text>

                {/* Vetítővonalak a kiválasztott ponthoz */}
                {calculatedY <= maxY && (
                  <>
                    <line
                      x1={toSvgX(selectedX)}
                      y1={toSvgY(0)}
                      x2={toSvgX(selectedX)}
                      y2={toSvgY(calculatedY)}
                      stroke="#84cc16"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1={toSvgX(0)}
                      y1={toSvgY(calculatedY)}
                      x2={toSvgX(selectedX)}
                      y2={toSvgY(calculatedY)}
                      stroke="#84cc16"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                  </>
                )}

                {/* Folytonos félegyenes kirajzolása */}
                {!isDiscrete && (
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(0)}
                    x2={toSvgX(Math.min(maxX, maxY / slopeK))}
                    y2={toSvgY(Math.min(maxY, maxX * slopeK))}
                    stroke="#65a30d"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}

                {/* Diszkrét pontok és/vagy koordináta pontok */}
                {Array.from({ length: maxX + 1 }).map((_, i) => {
                  const yVal = slopeK * i;
                  if (yVal > maxY) return null;
                  const isCurrent = i === selectedX;
                  return (
                    <g key={`pt-${i}`}>
                      <circle
                        cx={toSvgX(i)}
                        cy={toSvgY(yVal)}
                        r={isCurrent ? 6 : 4}
                        fill={isCurrent ? '#84cc16' : '#16a34a'}
                        stroke="#ffffff"
                        strokeWidth={isCurrent ? 2 : 1.5}
                        className="cursor-pointer transition-all hover:scale-125"
                        onClick={() => setSelectedX(i)}
                      />
                    </g>
                  );
                })}

                {/* Kiválasztott pont címkéje */}
                {calculatedY <= maxY && (
                  <text
                    x={toSvgX(selectedX) + 8}
                    y={toSvgY(calculatedY) - 8}
                    fontSize="11"
                    fontWeight="black"
                    fill="#15803d"
                    className="dark:fill-lime-400"
                  >
                    P({selectedX}; {calculatedY})
                  </text>
                )}
              </svg>

              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic text-center">
                Kattints a grafikon zöld pontjaira az értékek vizsgálatához!
              </span>
            </div>

            {/* Vezérlők és számítások */}
            <div className="lg:col-span-5 space-y-4">
              {/* k csúszka */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    Arányossági tényező (meredekség, k):
                  </span>
                  <span className="font-mono px-2 py-0.5 rounded bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-lime-300 font-bold">
                    k = {slopeK}
                  </span>
                </div>
                <Slider
                  value={[slopeK]}
                  min={1}
                  max={3}
                  step={0.5}
                  onValueChange={(val) => setSlopeK(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 (laposabb)</span>
                  <span>2 (normál)</span>
                  <span>3 (nagyon meredek)</span>
                </div>
              </div>

              {/* x csúszka */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    Kiválasztott pont x koordinátája:
                  </span>
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                    x = {selectedX}
                  </span>
                </div>
                <Slider
                  value={[selectedX]}
                  min={0}
                  max={5}
                  step={1}
                  onValueChange={(val) => setSelectedX(val[0])}
                  className="py-1"
                />
              </div>

              {/* Eredmény kártya */}
              <div className="p-4 rounded-xl bg-lime-50/80 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-900/60 text-xs space-y-2">
                <span className="font-bold text-lime-900 dark:text-lime-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-lime-600" /> Aktuális pont koordinátái
                </span>
                <div className="font-mono text-sm space-y-1 text-slate-800 dark:text-slate-200">
                  <div>Összefüggés: <strong>y = {slopeK} · x</strong></div>
                  <div>Ha x = {selectedX} &nbsp;⟹&nbsp; <strong>y = {slopeK} · {selectedX} = {calculatedY}</strong></div>
                  <div className="text-lime-700 dark:text-lime-400 font-bold">
                    Pont: P({selectedX}; {calculatedY})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default DirectProportionGraphTheory;
