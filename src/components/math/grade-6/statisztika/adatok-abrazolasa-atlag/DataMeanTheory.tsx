import React, { useState, useMemo } from 'react';
import { TheoryTemplate } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  BarChart2,
  Scale,
  Hash,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Plus,
  RotateCcw,
  Layers,
  HelpCircle
} from 'lucide-react';
import {
  FrequencyTableVisualSvg,
  MeanBalanceScaleSvg,
  MedianFindingSvg,
  ModeAndRangeSvg,
  OutlierEffectSvg
} from './DataMeanDiagrams';

interface DataMeanTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const DataMeanTheory: React.FC<DataMeanTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Dinamikus adatlaboratórium állapota
  const [dataPoints, setDataPoints] = useState<number[]>([3, 4, 4, 5, 2, 4, 5, 3]);
  const [newValInput, setNewValInput] = useState<string>('');

  // Előre beállított minták
  const setPreset = (type: 'grades' | 'siblings' | 'outlier' | 'even') => {
    switch (type) {
      case 'grades':
        setDataPoints([3, 4, 4, 5, 2, 4, 5, 3]);
        break;
      case 'siblings':
        setDataPoints([1, 2, 2, 0, 3, 2, 1, 4]);
        break;
      case 'outlier':
        setDataPoints([10, 11, 12, 13, 85]);
        break;
      case 'even':
        setDataPoints([4, 7, 10, 14, 18, 22]);
        break;
    }
  };

  const handleAddNumber = () => {
    const parsed = parseInt(newValInput.trim(), 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100 && dataPoints.length < 15) {
      setDataPoints([...dataPoints, parsed]);
      setNewValInput('');
    }
  };

  const handleRemoveNumber = (indexToRemove: number) => {
    if (dataPoints.length > 2) {
      setDataPoints(dataPoints.filter((_, idx) => idx !== indexToRemove));
    }
  };

  // Statisztikai számítások memózva
  const stats = useMemo(() => {
    const n = dataPoints.length;
    if (n === 0) {
      return {
        n: 0,
        sum: 0,
        mean: '0',
        sorted: [],
        median: '0',
        medianIdxs: [],
        modes: [],
        range: 0,
        hasOutlier: false
      };
    }

    const sum = dataPoints.reduce((acc, curr) => acc + curr, 0);
    const meanVal = sum / n;
    const mean = (Math.round(meanVal * 100) / 100).toString().replace('.', ',');

    // Rendezés
    const sorted = [...dataPoints].sort((a, b) => a - b);

    // Medián
    let median = '0';
    let medianIdxs: number[] = [];
    if (n % 2 === 1) {
      const mid = Math.floor(n / 2);
      median = sorted[mid].toString();
      medianIdxs = [mid];
    } else {
      const mid1 = n / 2 - 1;
      const mid2 = n / 2;
      const medVal = (sorted[mid1] + sorted[mid2]) / 2;
      median = (Math.round(medVal * 100) / 100).toString().replace('.', ',');
      medianIdxs = [mid1, mid2];
    }

    // Módusz (gyakoriságok)
    const freqMap: Record<number, number> = {};
    let maxFreq = 0;
    for (const val of dataPoints) {
      freqMap[val] = (freqMap[val] || 0) + 1;
      if (freqMap[val] > maxFreq) {
        maxFreq = freqMap[val];
      }
    }
    const modes: number[] = [];
    if (maxFreq > 1) {
      for (const [k, v] of Object.entries(freqMap)) {
        if (v === maxFreq) {
          modes.push(Number(k));
        }
      }
      modes.sort((a, b) => a - b);
    }

    // Terjedelem
    const minVal = sorted[0];
    const maxVal = sorted[n - 1];
    const range = maxVal - minVal;

    // Kiugró érték figyelmeztetés
    const hasOutlier = maxVal > (sorted[Math.floor(n / 2)] || 1) * 2.5 && range > 20;

    return {
      n,
      sum,
      mean,
      sorted,
      median,
      medianIdxs,
      modes,
      maxFreq,
      range,
      hasOutlier
    };
  }, [dataPoints]);

  const sections = [
    {
      id: 'sec-intro',
      title: '1. Miért van szükségünk statisztikai mutatókra?',
      badge: 'Alapgondolat',
      icon: <HelpCircle className="w-5 h-5 text-teal-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Gyakran találkozunk hatalmas adathalmazokkal: az osztály dolgozatjegyeivel, az elmúlt hónap napi hőmérsékleteivel,
            vagy a sportolók futási idejével. Ha mind a 30 vagy 100 számot felsorolnánk, nehéz lenne átlátni a helyzetet.
          </p>
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-2">
            <h4 className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              A statisztikai jellemzők célja:
            </h4>
            <p className="text-sm">
              Néhány jól megválasztott számmal (mutatóval) megragadni az egész adathalmaz lényegét:
              hol van a közepük, melyik a legnépszerűbb, és mekkora távolságban szóródnak a szélsőségek!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sec-freq',
      title: '2. Gyakoriság ($k$) és Relatív gyakoriság ($f$)',
      badge: 'Adateloszlás',
      icon: <Hash className="w-5 h-5 text-cyan-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Mielőtt kiszámolnánk a mutatókat, az adatokat gyakorisági táblázatba rendezzük:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-black">k</span>
                Gyakoriság ($k$)
              </h4>
              <p className="text-xs sm:text-sm">
                Megmutatja, hogy egy adott érték <strong>hányszor fordul elő</strong> a mintában.
                Például: 8 diák választotta a matematikát $\to k = 8$.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black">f</span>
                Relatív gyakoriság ($f$)
              </h4>
              <p className="text-xs sm:text-sm">
                A gyakoriság és az <strong>összes adat ($n$) hányadosa</strong>:
                <br />
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  {"$f = \\frac{k}{n}$"}
                </span> (megadható törtként, tizedestörtként vagy százalékként).
              </p>
            </div>
          </div>

          <FrequencyTableVisualSvg />

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Aranyszabály:</strong> A relatív gyakoriságok összege mindig pontosan <strong>1</strong> (vagyis <strong>100%</strong>)!
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'sec-mean-calc',
      title: '3. A Számtani Közép (Átlag, $\\bar{x}$)',
      badge: 'Középérték',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A számtani közép (hétköznapi nevén <strong>átlag</strong>) a legismertebb statisztikai mutató.
            Azt mutatja meg, mekkora lenne minden egyes adat értéke, ha az összeset összedobnánk, majd <strong>egyenlően szétosztanánk</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-200 dark:border-blue-800 text-center space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Az átlag kiszámításának képlete:
            </div>
            <div className="text-lg sm:text-2xl font-mono font-black text-blue-900 dark:text-blue-100">
              {"$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n} = \\frac{\\text{Adatok összege}}{\\text{Adatok darabszáma}}$"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white">Gyakorlati mintapélda:</h4>
            <p className="text-sm">
              Kati négy matematika jegyet kapott: <strong>5; 4; 5; 2</strong>. Mennyi a dolgozatainak átlaga?
            </p>
            <ol className="list-decimal list-inside text-xs sm:text-sm space-y-1">
              <li><strong>1. Lépés:</strong> Összeadjuk a jegyeket: $5 + 4 + 5 + 2 = 16$.</li>
              <li><strong>2. Lépés:</strong> Megszámoljuk az adatokat: $n = 4$ darab jegy van.</li>
              <li><strong>3. Lépés:</strong> Elosztjuk az összeget a darabszámmal: <strong>16 : 4 = 4,0</strong>. Kati átlaga 4,0!</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'sec-mean-balance',
      title: '4. Az Átlag mint egyensúlyi pont a számegyenesen',
      badge: 'Szemléltetés',
      icon: <Scale className="w-5 h-5 text-amber-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Vajon hogyan képzelhetjük el az átlagot geometriailag és fizikailag? Képzeljünk el egy vízszintes mérleghintát
            (számegyenest), amelyre azonos súlyú nehezékeket helyezünk az adatok pozícióiba!
          </p>

          <MeanBalanceScaleSvg />

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>Fizikai jelentés:</strong> Az alátámasztást pontosan az <strong>{"átlagnál ($\\bar{x} = 4$)"}</strong> kell elhelyezni,
            mert a balra eső súlyok távolságainak összege ($2 + 2 = 4$) pontosan megegyezik a jobbra eső súlyok távolságainak összegével ($1 + 3 = 4$).
            Ezért a számtani közép az adathalmaz tömegközéppontja (súlypontja)!
          </div>
        </div>
      )
    },
    {
      id: 'sec-mode',
      title: '5. A Módusz ($Mo$): A leggyakoribb adat',
      badge: 'Csúcsérték',
      icon: <BarChart2 className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A <strong>módusz</strong> az adatsor <strong>leggyakrabban előforduló</strong> eleme. Oszlopdiagramon vagy pontdiagramon
            ez a legmagasabb oszlopnak (a minta csúcsának) felel meg.
          </p>

          <ModeAndRangeSvg />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Egy módusz</span>
              Pl. {"$\\{1, 2, 2, 3, 5\\} \\to Mo = 2$"}.
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Több módusz</span>
              Pl. {"$\\{2, 2, 4, 5, 5\\} \\to$"} kettő is van: 2 és 5 (bimodális).
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Nincs módusz</span>
              Ha minden adat csak egyszer szerepel: {"$\\{1, 3, 4, 7\\} \\to$"} nincs módusz.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-median',
      title: '6. A Medián ($Me$): A rendezett adatsor KÖZÉPSŐ értéke',
      badge: 'Helyzeti középérték',
      icon: <Layers className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>
              FIGYELEM: A mediánt KIZÁRÓLAG akkor határozhatjuk meg, ha az adatokat először NAGYSÁG SZERINT NÖVEKVŐ SORRENDBE állítottuk!
            </span>
          </div>

          <p>
            A medián a rendezett minta pontosan felező eleme: az adatok fele kisebb vagy egyenlő nála, másik fele nagyobb vagy egyenlő nála.
          </p>

          <MedianFindingSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <h5 className="font-bold text-emerald-900 dark:text-emerald-200 mb-1">Páratlan elemszám esetén ($n$ páratlan):</h5>
              <p>Pontosan 1 darab középső elem van. Az indexe: {"$\\frac{n+1}{2}$"}.</p>
              <div className="mt-2 font-mono text-xs text-emerald-800 dark:text-emerald-300">
                Pl. {"$n = 7 \\to$"} 4. elem a medián: {"$\\{2, 3, 3, \\mathbf{5}, 6, 8, 9\\} \\to Me = 5$"}.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <h5 className="font-bold text-purple-900 dark:text-purple-200 mb-1">Páros elemszám esetén ($n$ páros):</h5>
              <p>Két középső elem van! A medián e két középső szám <strong>számtani közepe</strong>.</p>
              <div className="mt-2 font-mono text-xs text-purple-800 dark:text-purple-300">
                Pl. {"$n = 6 \\to$"} középsők: 5 és 7 {"$\\to Me = \\frac{5 + 7}{2} = \\mathbf{6}$"}.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-range',
      title: '7. A Terjedelem ($R$): A szóródás legegyszerűbb mérőszáma',
      badge: 'Szóródási mutató',
      icon: <TrendingUp className="w-5 h-5 text-pink-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Két osztályban is lehet 3,5 a matematika átlag, mégis teljesen más a helyzetük:
            az egyikben mindenki 3-ast vagy 4-est kapott, a másikban pedig sok 1-es és 5-ös született.
            Ezt a különbséget fejezi ki a <strong>terjedelem</strong>!
          </p>

          <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border-2 border-pink-200 dark:border-pink-800 text-center space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              A terjedelem képlete:
            </div>
            <div className="text-xl sm:text-2xl font-mono font-black text-pink-900 dark:text-pink-100">
              {"$R = x_{\\max} - x_{\\min} = \\text{Legnagyobb adat} - \\text{Legkisebb adat}$"}
            </div>
          </div>

          <p className="text-sm">
            Ha egy adatsor: {"$\\{2; 3; 4; 8; 10\\}$"}, akkor {"$x_{\\max} = 10$, $x_{\\min} = 2$"},
            így a terjedelem: <strong>R = 10 - 2 = 8</strong>.
          </p>
        </div>
      )
    },
    {
      id: 'sec-outliers',
      title: '8. Átlag vs. Medián: A kiugró értékek csapdája a valóságban',
      badge: 'Kritikus gondolkodás',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Gyakori hiba azt hinni, hogy az átlag mindig a legjobb mutató.
            Ha egy adathalmazban <strong>extrém kiugró érték (outlier)</strong> található,
            az átlag teljesen félrevezetővé válhat!
          </p>

          <OutlierEffectSvg />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">Mikor jobb az ÁTLAG?</h5>
              <p>
                Szimmetrikus, egyenletesen eloszló adatoknál, ahol nincsenek kirívó szélsőségek
                (pl. diákok magassága, dolgozatok pontszámai, napi hőmérséklet).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">Mikor jobb a MEDIÁN?</h5>
              <p>
                Olyan helyzetekben, ahol kiugró adatok fordulhatnak elő (pl. fizetések: 1 milliárdos fizetése eltorzítja 100 munkás átlagát,
                vagy ingatlanárak, vagy futóversenyen eleső versenyző ideje).
              </p>
            </div>
          </div>

          {/* Záró összefoglalás */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 space-y-3 mt-4">
            <h4 className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-teal-600" />
              Gyors összefoglaló a 4 mutató megjegyzéséhez:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>{"Átlag ($\\bar{x}$):"}</strong> összeg osztva darabszámmal (érzékeny a kiugróra).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Medián ($Me$):</strong> sorba rendezve a középső (stabil a kiugróval szemben).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Módusz ($Mo$):</strong> leggyakoribb érték (lehet több is, vagy egy sem).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Terjedelem ($R$):</strong> maximum mínusz minimum (szóródás fesztávja).</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {onStartQuiz && (
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold gap-2 shadow-md"
              >
                Tovább a gyakorló kvízre <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="4. Adatok ábrázolása, átlag"
      subtitle="Gyakoriság, relatív gyakoriság, számtani közép (átlag), módusz, medián, terjedelem és kiugró értékek"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 4. ALTÉMA"
      themeColor="teal"
      pdfFilename="6_osztaly_VI_adatok_atlag_tananyag.pdf"
      quickRule={{
        label: 'A 4 Fő Statisztikai Mutató',
        formula: 'Átlag: ∑x / n  •  Medián: Rendezett közép  •  Módusz: Leggyakoribb  •  Terjedelem: Max - Min'
      }}
      interactiveLab={
        <div className="p-5 rounded-2xl bg-slate-900 border-2 border-teal-500/30 text-white space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-base sm:text-lg text-teal-300">
                  Interaktív Adatlaboratórium & Élő Mutatószámoló
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Módosítsd az adatsort, figyelj a rendezésre és nézd meg élőben, hogyan változnak a statisztikai mutatók!
              </p>
            </div>

            {/* Minta sablon gombok */}
            <div className="flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPreset('grades')}
                className="text-[11px] h-7 bg-slate-800 border-slate-700 text-slate-200 hover:bg-teal-900/50"
              >
                Jegyek
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPreset('siblings')}
                className="text-[11px] h-7 bg-slate-800 border-slate-700 text-slate-200 hover:bg-teal-900/50"
              >
                Testvérek
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPreset('outlier')}
                className="text-[11px] h-7 bg-slate-800 border-slate-700 text-rose-300 hover:bg-rose-950/50"
              >
                Kiugró adat!
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPreset('even')}
                className="text-[11px] h-7 bg-slate-800 border-slate-700 text-purple-300 hover:bg-purple-950/50"
              >
                Páros elemszám
              </Button>
            </div>
          </div>

          {/* Adatok hozzáadása és listája */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Szám (0-100)"
                value={newValInput}
                onChange={(e) => setNewValInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNumber()}
                className="w-28 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-400"
              />
              <Button
                size="sm"
                onClick={handleAddNumber}
                disabled={dataPoints.length >= 15}
                className="bg-teal-600 hover:bg-teal-500 text-white gap-1 text-xs h-8"
              >
                <Plus className="w-3.5 h-3.5" /> Hozzáadás
              </Button>
              <span className="text-xs text-slate-400 ml-auto">
                Kattints egy számra az eltávolításához (min. 3 elem marad)
              </span>
            </div>

            {/* Jelenlegi adatsor kártyák */}
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs text-slate-400 font-semibold mr-1">Eredeti adatok:</span>
              {dataPoints.map((val, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveNumber(idx)}
                  title="Kattints az eltávolításhoz"
                  className="px-2.5 py-1 rounded-md bg-slate-700 hover:bg-rose-900/60 hover:border-rose-500 border border-slate-600 text-white font-mono text-sm font-bold transition-colors cursor-pointer group"
                >
                  {val}
                  <span className="text-[10px] text-slate-400 group-hover:text-rose-300 ml-1">×</span>
                </button>
              ))}
            </div>

            {/* Rendezett sorozat megjelenítése */}
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-teal-950/40 border border-teal-800/60">
              <span className="text-xs text-teal-300 font-semibold mr-1">Növekvő sorrend (mediánhoz):</span>
              {stats.sorted.map((val, idx) => {
                const isMedian = stats.medianIdxs.includes(idx);
                const isMode = stats.modes.includes(val);
                return (
                  <div
                    key={idx}
                    className={`relative px-3 py-1 rounded-md font-mono text-sm font-black border ${
                      isMedian
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                        : isMode
                        ? 'bg-amber-600/80 border-amber-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    {val}
                    {isMedian && (
                      <span className="absolute -top-2.5 -right-1 text-[9px] bg-emerald-400 text-emerald-950 px-1 rounded font-bold">
                        Me
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Fő Eredmény Kártya */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Átlag */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 space-y-1">
              <div className="flex items-center justify-between text-xs text-blue-300 font-semibold">
                <span>Számtani közép (Átlag)</span>
                <span className="font-mono">{"$\\bar{x}$"}</span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-blue-200">
                {stats.mean}
              </div>
              <div className="text-[11px] text-slate-400">
                Összeg: {stats.sum} : {stats.n} db
              </div>
            </div>

            {/* Medián */}
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
                <span>Medián (Középső)</span>
                <span className="font-mono">$Me$</span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-200">
                {stats.median}
              </div>
              <div className="text-[11px] text-slate-400">
                {stats.n % 2 === 1 ? '1 középső elem' : '2 középső átlaga'}
              </div>
            </div>

            {/* Módusz */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-1">
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span>Módusz (Gyakori)</span>
                <span className="font-mono">$Mo$</span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-200">
                {stats.modes.length > 0 ? stats.modes.join(' és ') : 'Nincs'}
              </div>
              <div className="text-[11px] text-slate-400">
                {stats.modes.length > 0 ? `${stats.maxFreq} db előfordulás` : 'Minden adat egyszeri'}
              </div>
            </div>

            {/* Terjedelem */}
            <div className="p-3 rounded-xl bg-pink-950/40 border border-pink-800/60 space-y-1">
              <div className="flex items-center justify-between text-xs text-pink-300 font-semibold">
                <span>Terjedelem</span>
                <span className="font-mono">$R$</span>
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-pink-200">
                {stats.range}
              </div>
              <div className="text-[11px] text-slate-400">
                Max ({stats.sorted[stats.sorted.length - 1]}) - Min ({stats.sorted[0]})
              </div>
            </div>
          </div>

          {/* Kiugró érték figyelmeztetés ha aktív */}
          {stats.hasOutlier && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/80 text-rose-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                <strong>Extrém kiugró érték észlelve!</strong> Figyeld meg: az átlag ({stats.mean}) messze elszállt a legtöbb adattól, míg a medián ({stats.median}) stabilan jelzi a csoport valódi középpontját!
              </span>
            </div>
          )}
        </div>
      }
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};

export default DataMeanTheory;
