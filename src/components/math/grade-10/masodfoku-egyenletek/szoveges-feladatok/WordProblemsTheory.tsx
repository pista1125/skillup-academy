import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryCallout
} from '../TheoryTemplate';
import {
  WordProblemStrategySvg,
  ConsecutiveNumbersSvg,
  ReciprocalProblemSvg,
  SharingCostProblemSvg
} from './WordProblemsFigures';
import {
  HelpCircle,
  Hash,
  Calculator,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Filter,
  Users,
  TrendingUp
} from 'lucide-react';

interface WordProblemsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const WordProblemsTheory: React.FC<WordProblemsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: Egymást követő számok szorzata: x(x+d) = P
  const [diffVal, setDiffVal] = useState<number>(1); // d = 1 (szomszédos), d = 2 (páros/páratlan)
  const [prodVal, setProdVal] = useState<number>(56);
  const [onlyPositive, setOnlyPositive] = useState<boolean>(true);

  // x² + dx - P = 0
  const dVal = diffVal * diffVal - 4 * 1 * (-prodVal);
  const sqrtD = dVal >= 0 ? Math.sqrt(dVal) : NaN;
  const x1 = dVal >= 0 ? (-diffVal + sqrtD) / 2 : NaN;
  const x2 = dVal >= 0 ? (-diffVal - sqrtD) / 2 : NaN;

  const setPreset = (d: number, p: number, pos: boolean) => {
    setDiffVal(d);
    setProdVal(p);
    setOnlyPositive(pos);
  };

  return (
    <TheoryTemplate
      grade={10}
      chapterId="masodfoku-egyenletek"
      topicId="szoveges-feladatok"
      title="Szöveges feladatok másodfokú egyenletekkel"
      subtitle="Számelméleti feladványok, szomszédos számok, reciprokos és osztozkodási problémák algebrai modellezése és a kapott gyökök reális értelmezése."
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TANANYAG"
      themeColor="blue"
      quickRule={{
        label: 'A Szöveges Feladatok Modell-Lépései',
        align: 'left',
        formula: (
          <div className="space-y-1.5 text-slate-800 dark:text-slate-100">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
              <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 block">Modell és Kikötés:</span>
              <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400 block mt-0.5">
                Szöveg ➔ Ismeretlen (x) ➔ Egyenlet ➔ Szöveges próba!
              </span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300">
              Számelmélet: szomszédos: x és x+1; páros/páratlan: x és x+2; reciprok: x és 1/x.
            </div>
          </div>
        )
      }}
      estimatedReadTime="25 perc"
      heroCard={{
        title: 'Szöveges Feladatok Modellezése',
        description:
          'A matematika igazi célja valós és elméleti problémák megoldása. A szöveges feladatoknál a legnehezebb lépés a szöveg gondos lefordítása algebrai egyenletté, majd a megoldóképlet által adott két gyök közül a feladat szövegének megfelelő, életszerű megoldások kiválasztása.',
        formula: 'Szöveg ⟹ Ismeretlen (x) ⟹ Modell (ax² + bx + c = 0) ⟹ Gyökök ⟹ Reális Válasz',
        extraContent: (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-700">1. Szomszédos számok:</span>
              <p className="text-slate-600 mt-0.5">Egész: x és x + 1. Páros/páratlan: x és x + 2.</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-700">2. Reciprokos kapcsolat:</span>
              <p className="text-slate-600 mt-0.5">x + 1/x = s egyenlet mindig kölcsönös gyökpárt ad.</p>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-700">3. Szöveges szűrés:</span>
              <p className="text-slate-600 mt-0.5">Létszám, darabszám, hosszúság nem lehet negatív!</p>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Készen állsz a szöveges feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 feladatos interaktív kvízben és a játékos feladványokban!"
      interactiveSection={
        <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-blue-500/10 border-2 border-blue-200/80 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md">
                <Hash className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Interaktív Szöveges Feladat és Modellaboratórium
                </h3>
                <p className="text-xs text-slate-600">
                  Válassz a klasszikus feladattípusok közül, és figyeld meg az algebrai modell felírását, a gyökök kiszámítását és a szöveges szűrést!
                </p>
              </div>
            </div>

            {/* Mintapélda gombok */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setPreset(1, 56, true)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  diffVal === 1 && prodVal === 56 && onlyPositive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                Szomszédos egészek (szorzat: 56)
              </button>
              <button
                onClick={() => setPreset(2, 48, true)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  diffVal === 2 && prodVal === 48 && onlyPositive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                Páros számok (szorzat: 48)
              </button>
              <button
                onClick={() => setPreset(4, 45, false)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  diffVal === 4 && prodVal === 45 && !onlyPositive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                Különbség 4 (szorzat: 45, egészek)
              </button>
              <button
                onClick={() => setPreset(1, 72, true)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  diffVal === 1 && prodVal === 72 && onlyPositive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                }`}
              >
                Pozitív egészek (szorzat: 72)
              </button>
            </div>
          </div>

          {/* Csúszkák és beállítások */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 p-5 rounded-2xl border border-blue-100">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Számok különbsége (d):</label>
                <span className="text-sm font-mono font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  d = {diffVal} {diffVal === 1 ? '(szomszédos)' : diffVal === 2 ? '(páros/páratlan)' : ''}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={diffVal}
                onChange={(e) => setDiffVal(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1</span>
                <span>3</span>
                <span>6</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Kívánt szorzat (P):</label>
                <span className="text-sm font-mono font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                  P = {prodVal}
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="120"
                step="2"
                value={prodVal}
                onChange={(e) => setProdVal(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>12</span>
                <span>66</span>
                <span>120</span>
              </div>
            </div>

            <div className="space-y-2 flex flex-col justify-center">
              <label className="text-xs font-bold text-slate-700 block">Szöveges feltétel:</label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="onlyPos"
                  checked={onlyPositive}
                  onChange={(e) => setOnlyPositive(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
                />
                <label htmlFor="onlyPos" className="text-xs text-slate-700 cursor-pointer select-none">
                  Csak <strong>pozitív számokat</strong> keresünk (pl. hosszúság, darabszám)
                </label>
              </div>
            </div>
          </div>

          {/* Számított levezetés és szöveges válasz */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-inner space-y-4 font-mono text-sm">
            <div className="border-b border-slate-700 pb-3">
              <span className="text-xs text-slate-400 font-sans uppercase tracking-wider block">
                Algebrai Modell és Egyenlet:
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-400">
                x · (x + {diffVal}) = {prodVal} &nbsp;⟹&nbsp; x² + {diffVal}x - {prodVal} = 0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                <span className="text-blue-400 font-bold block">1. Megoldóképlet:</span>
                <p className="text-slate-300">
                  D = ({diffVal})² - 4 · 1 · (-{prodVal}) = {diffVal * diffVal} + {4 * prodVal} ={' '}
                  <strong>{dVal}</strong>
                </p>
                {dVal >= 0 && (
                  <p className="text-slate-300">
                    x₁,₂ = [-({diffVal}) ± {Number.isInteger(sqrtD) ? `${sqrtD}` : `√${dVal}`}] / 2
                  </p>
                )}
                <p className="text-emerald-400 font-bold text-sm">
                  x₁ = {Number.isInteger(x1) ? x1 : x1.toFixed(2)} &nbsp;|&nbsp; x₂ ={' '}
                  {Number.isInteger(x2) ? x2 : x2.toFixed(2)}
                </p>
              </div>

              <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5">
                <span className="text-amber-400 font-bold block">2. Szöveges Értelmezés és Válasz:</span>
                {onlyPositive ? (
                  x1 > 0 ? (
                    <div className="text-slate-300 space-y-1">
                      <p className="text-emerald-300 font-bold">
                        ✓ x₁ = {x1}: Elfogadható! A két keresett szám: <strong>{x1}</strong> és{' '}
                        <strong>{x1 + diffVal}</strong>.
                      </p>
                      <p className="text-rose-400">
                        ✕ x₂ = {x2}: Kizárva, mert negatív szám nem felel meg a feltételnek!
                      </p>
                    </div>
                  ) : (
                    <p className="text-rose-400">Nincs pozitív valós megoldás a feladatra.</p>
                  )
                ) : (
                  <div className="text-slate-300 space-y-1">
                    <p className="text-emerald-300 font-bold">
                      1. Számpár: <strong>{x1}</strong> és <strong>{x1 + diffVal}</strong> ({x1} · {x1 + diffVal} = {prodVal})
                    </p>
                    <p className="text-blue-300 font-bold">
                      2. Számpár: <strong>{x2}</strong> és <strong>{x2 + diffVal}</strong> ({x2} · {x2 + diffVal} = {prodVal})
                    </p>
                    <p className="text-slate-400 text-[11px]">Tetszőleges egész számoknál mindkét pár helyes!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      }
      sections={[
        {
          id: 'sec-method',
          title: '1. A szöveges feladatok megoldásának 5 aranyszabálya',
          description:
            'Hogyan alakítsunk át egy emberi nyelven leírt problémát hibátlan matematikai modellé?',
          color: 'blue',
          badge: 'Módszertan',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A sikeres szöveges feladatmegoldás 5 lépése"
                color="blue"
                icon={<Layers className="w-5 h-5 text-blue-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    A szöveges feladatok lényege, hogy a valóság egy szeletét lefordítjuk a matematika nyelvére. Ehhez mindig tartsuk be a következő sorrendet:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <WordProblemStrategySvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A szöveges feladat láncolata az ismeretlen kijelölésétől a reális szöveges válaszig
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                      <span className="font-bold text-blue-950 block">1. Ismeretlen kijelölése:</span>
                      <p className="text-slate-600">
                        Mindig pontosan írjuk le, mit jelöl az x (pl. „Legyen x a kisebbik egész szám”).
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1">
                      <span className="font-bold text-indigo-950 block">2. Egyenlet felállítása:</span>
                      <p className="text-slate-600">
                        A szövegben szereplő állításokat összekötjük: szorzat, összeg vagy különbség.
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-950 block">3. Szöveges szűrés:</span>
                      <p className="text-slate-600">
                        A kapott x₁ és x₂ közül csak a szövegnek megfelelőeket fogadjuk el a végén!
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-consecutive',
          title: '2. Egymást követő számok és számelméleti feladványok',
          description:
            'Szomszédos egész, páros és páratlan számok szorzata, valamint négyzetösszegek modellezése.',
          color: 'indigo',
          badge: 'Számelmélet',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Szomszédos számok algebrai alakjai"
                color="indigo"
                icon={<Hash className="w-5 h-5 text-indigo-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    A számelméleti feladatok leggyakoribb szereplői az egymást követő számok. Fontos megkülönböztetni a közönséges szomszédos egészeket és a páros/páratlan számokat:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <ConsecutiveNumbersSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Egymást követő egészek (x, x+1), párosak (x, x+2) és a négyzetösszeg felírása
                    </p>
                  </div>

                  <TheoryCard
                    title="Kidolgozott Mintapélda: Két egymást követő egész szám szorzata 72"
                    color="indigo"
                    variant="example"
                  >
                    <div className="space-y-2 text-xs leading-relaxed">
                      <p className="font-bold text-slate-800">
                        Feladat: Határozzuk meg azt a két egymást követő egész számot, amelyek szorzata 72!
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                        <li><strong>Modell:</strong> Legyen a kisebb szám x, ekkor a rákövetkező x + 1.</li>
                        <li><strong>Egyenlet:</strong> x(x + 1) = 72 ⟹ x² + x - 72 = 0.</li>
                        <li><strong>Megoldóképlet:</strong> D = 1 - 4 · 1 · (-72) = 1 + 288 = 289. √289 = 17.<br />
                        x = (-1 ± 17) / 2 ⟹ <strong>x₁ = 8</strong> és <strong>x₂ = -9</strong>.</li>
                        <li><strong>Értelmezés:</strong> Mivel a feladat <em>egész számokat</em> kért (nem csak pozitívat), mindkét gyök érvényes!</li>
                      </ol>
                      <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-950 font-bold space-y-0.5">
                        <p>1. Megoldáspár: Ha x = 8, akkor x + 1 = 9 ⟹ A két szám: <strong>8 és 9</strong> (8 · 9 = 72).</p>
                        <p>2. Megoldáspár: Ha x = -9, akkor x + 1 = -8 ⟹ A két szám: <strong>-9 és -8</strong> ((-9) · (-8) = 72).</p>
                      </div>
                    </div>
                  </TheoryCard>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-reciprocal',
          title: '3. Szám és reciprokának kapcsolata',
          description:
            'Hogyan vezet egy szám és reciprokának összege törtről másodfokú egyenletre?',
          color: 'amber',
          badge: 'Reciprok',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A reciprokos feladványok szerkezete és szimmetriája"
                color="amber"
                icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Egy 0-tól különböző szám reciproka az $1/x$. Ha egy szám és reciprokának összegét ismerjük ($x + 1/x = s$), az egyenlet beszorzás után mindig másodfokúvá válik:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <ReciprocalProblemSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A szám és reciproka összege mindig kölcsönös gyökpárt eredményez (pl. 2 és 1/2)
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                    <span className="font-bold text-amber-950 block text-sm">Miért ad két egymás reciprokát gyökként?</span>
                    <p className="text-slate-700">
                      Ha $x + 1/x = 2,5$, beszorzunk $2x$-szel: $2x^2 + 2 = 5x \implies 2x^2 - 5x + 2 = 0$.
                    </p>
                    <p className="text-slate-700">
                      A gyökök: $x_1 = 2$ és $x_2 = 1/2$. Ez logikus: ha a keresett szám 2, akkor a reciproka 1/2. Ha a szám 1/2, akkor a reciproka 2! A két gyök egymás tükörképe.
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-sharing',
          title: '4. Osztozkodási és csoportos költségmegosztási problémák',
          description:
            'Tipikus érettségi feladat: közös kirándulás vagy ajándékvásárlás, ahol néhányan visszalépnek.',
          color: 'emerald',
          badge: 'Osztozkodás',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Költségmegosztási feladatok táblázatos felírása"
                color="emerald"
                icon={<Users className="w-5 h-5 text-emerald-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm">
                  <p>
                    Az egyik leggyakoribb másodfokú szöveges feladattípus az <strong>osztozkodás</strong>: egy fix összeget kell szétosztani egyenletesen a résztvevők között, de a létszám változása miatt a fejenkénti díj módosul:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <SharingCostProblemSvg size={500} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Eredeti terv vs. Megváltozott helyzet: a fejenkénti különbség adja az egyenletet
                    </p>
                  </div>

                  <TheoryCard
                    title="Kidolgozott Példa: Buszbérlés 60 000 Ft-ért"
                    color="emerald"
                    variant="example"
                  >
                    <div className="space-y-2 text-xs leading-relaxed">
                      <p className="font-bold text-slate-800">
                        Egy baráti társaság 60 000 Ft-ért bérel kisbuszt. Indulás előtt 2 fő visszalép, emiatt a többieknek fejenként 1500 Ft-tal többet kell fizetniük. Hányan mentek el végül az útra?
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                        <li><strong>Ismeretlen:</strong> Legyen x az eredetileg tervezett létszám (fő). Kikötés: x &gt; 2.</li>
                        <li><strong>Fejenkénti díjak:</strong> Eredetileg 60000/x Ft, ténylegesen 60000/(x - 2) Ft.</li>
                        <li><strong>Egyenlet:</strong> 60000/(x - 2) - 60000/x = 1500.</li>
                        <li><strong>Egyszerűsítés:</strong> Osztunk 1500-zal: 40/(x - 2) - 40/x = 1.</li>
                        <li><strong>Beszorzás x(x - 2)-vel:</strong> 40x - 40(x - 2) = x(x - 2) ⟹ 80 = x² - 2x ⟹ x² - 2x - 80 = 0.</li>
                        <li><strong>Gyökök:</strong> (x - 10)(x + 8) = 0 ⟹ x₁ = 10, x₂ = -8.</li>
                      </ol>
                      <div className="p-2.5 bg-emerald-100/70 border border-emerald-200 rounded-lg text-emerald-950 font-bold">
                        ✓ Szűrés: Mivel az emberlétszám nem lehet negatív, x = -8 hamis gyök! Eredetileg 10 fő indult volna, így végül <strong>10 - 2 = 8 fő ment el</strong> az útra.
                      </div>
                    </div>
                  </TheoryCard>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-selection',
          title: '5. A gyökök szelekciója: melyik gyök reális a valóságban?',
          description:
            'Mikor kell elvetni a negatív gyököt, és mikor van mindkét megoldásnak matematikai értelme?',
          color: 'rose',
          badge: 'Szelekció',
          content: (
            <div className="space-y-6">
              <TheoryTrapBox
                title="1. CSAPDA: Negatív gyök automatikus elvetése, amikor az is jó lenne!"
                color="rose"
              >
                <p>
                  Sok diák megszokásból azonnal áthúzza a negatív gyököt (pl. x = -8), mondván „negatív nem lehet”.
                </p>
                <p className="font-bold text-rose-900 mt-1">
                  Vigyázat! Ha a feladat szövege azt mondja: „Két egész szám szorzata 56”, akkor a (-8) és (-7) pár TELJESEN HELYES és kötelező válasz!
                </p>
                <p className="mt-1">
                  Csak akkor vetjük el a negatív gyököt, ha a fizikai valóság tiltja: hosszúság, életkor, létszám, darabszám, idő.
                </p>
              </TheoryTrapBox>

              <TheoryTrapBox
                title="2. CSAPDA: Nem a feltett kérdésre válaszolnak a végén!"
                color="rose"
              >
                <p>
                  A fenti buszos feladatban az x = 10 az eredetileg tervezett létszám volt.
                </p>
                <p className="font-bold text-rose-900 mt-1">
                  A kérdés viszont az volt: „Hányan mentek el VÉGÜL az útra?”.
                </p>
                <p className="mt-1">
                  Ha valaki a 10-et írja be válaszként 8 helyett, pontot veszít! Mindig olvasd el újra a kérdést a válaszadás előtt!
                </p>
              </TheoryTrapBox>
            </div>
          )
        }
      ]}
    />
  );
};

export default WordProblemsTheory;

