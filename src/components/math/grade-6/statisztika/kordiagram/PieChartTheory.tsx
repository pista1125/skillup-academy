import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  PieChart,
  Circle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  Maximize2,
  Calculator,
  Compass,
  AlertTriangle
} from 'lucide-react';
import {
  BasicPieChartSvg,
  ClassroomPieChartSvg,
  DegreeConversionSvg,
  PieConstructionStepsSvg,
  Misleading3DPieSvg
} from './PieChartDiagrams';

interface PieChartTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PieChartTheory: React.FC<PieChartTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Dinamikus laboratórium állapota (3 kategória arányai, pl. Sport, Zene, Rajz)
  const [valA, setValA] = useState<number>(25); // Sport %
  const [valB, setValB] = useState<number>(45); // Zene %
  const [valC, setValC] = useState<number>(30); // Rajz %
  const [classSize, setClassSize] = useState<number>(30); // Osztálylétszám

  // Normalizálás 100%-ra
  const totalVal = valA + valB + valC;
  const pctA = Math.round((valA / totalVal) * 100);
  const pctB = Math.round((valB / totalVal) * 100);
  const pctC = Math.max(0, 100 - pctA - pctB); // kerekítési hiba elkerülése

  // Szögek fokban
  const angleA = Math.round(pctA * 3.6);
  const angleB = Math.round(pctB * 3.6);
  const angleC = Math.max(0, 360 - angleA - angleB);

  // Tanulók száma az osztálylétszámból
  const countA = Math.round((classSize * pctA) / 100);
  const countB = Math.round((classSize * pctB) / 100);
  const countC = Math.max(0, classSize - countA - countB);

  // SVG kördiagram körcikk pontok számítása
  const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians)
    };
  };

  const createArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', cx, cy,
      'L', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const arc1 = createArc(120, 120, 85, 0, angleA);
  const arc2 = createArc(120, 120, 85, angleA, angleA + angleB);
  const arc3 = createArc(120, 120, 85, angleA + angleB, 360);

  const sections: TheorySection[] = [
    {
      id: 'sec-pie-intro',
      title: '1. Mi az a kördiagram? Az egész részekre bontása',
      badge: 'Alapfogalom',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A <strong>kördiagram</strong> (angolul <em>pie chart</em>, azaz "tortadiagram") a statisztika egyik leglátványosabb és legszemléletesebb eszköze. Arra szolgál, hogy megmutassa, hogyan oszlik meg egy <strong>teljes egész</strong> a különböző részek, csoportok között.
          </p>

          <BasicPieChartSvg />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                A Teljes Körlap = 100%
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A teljes $360^\circ$-os teljesszög reprezentálja a teljes egészet ($100\%$, vagy az összes mért adat összegét).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                Körcikkek (Szeletek)
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Minden kategóriának egy-egy körcikk felel meg. Minél nagyobb a részarány, annál nagyobb a körcikk területe és szöge!
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block">
                Egyenes Arányosság
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A körcikk középponti szöge ($\alpha$) <strong>egyenesen arányos</strong> a kategória százalékos részesedésével.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-angles-conversion',
      title: '2. A középponti szög kiszámítása: Az 1% = 3,6° aranyszabály',
      badge: 'Számítási elv',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Hogyan tudjuk megállapítani, hogy mekkora szöget kell kimérnünk a szögmérőnkkel egy-egy körcikk megrajzolásához?
            Mivel a teljes kör $360^\circ$, és ez felel meg a $100\%$-nak, egy egyszerű osztással megkapjuk az <strong>$1\%$-nak megfelelő szöget</strong>:
          </p>

          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-2 border-indigo-300 dark:border-indigo-700 text-center space-y-2">
            <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
              A KÖRDIAGRAM ALAPKÉPLETE
            </span>
            <div className="text-lg sm:text-2xl font-black text-indigo-950 dark:text-indigo-100 font-mono">
              1% = 360° : 100 = 3,6°
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ezért bármilyen $p\%$-os részesedéshez tartozó középponti szög ($\alpha$):
            </p>
            <div className="text-base sm:text-xl font-black text-purple-700 dark:text-purple-300 font-mono">
              α = p · 3,6°
            </div>
          </div>

          <DegreeConversionSvg />
        </div>
      )
    },
    {
      id: 'sec-fractions-and-angles',
      title: '3. Nevezetes törtrészek és szögek fejből',
      badge: 'Gyakorlati tippek',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Sok feladatban nem százalékban, hanem közönséges törtekben adják meg a részeket (pl. a diákok fele, negyede, harmada). Ezeket a nevezetes szögeket érdemes fejből ismerni:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <strong className="text-blue-900 dark:text-blue-200 block text-sm">Fél (1/2)</strong>
              <span className="text-xs text-blue-600 font-mono font-bold block my-0.5">50%</span>
              <span className="text-base font-black text-blue-800 dark:text-blue-300">180°</span>
              <span className="text-[10px] text-slate-500 block mt-1">Egyenesszög</span>
            </div>

            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
              <strong className="text-cyan-900 dark:text-cyan-200 block text-sm">Negyed (1/4)</strong>
              <span className="text-xs text-cyan-600 font-mono font-bold block my-0.5">25%</span>
              <span className="text-base font-black text-cyan-800 dark:text-cyan-300">90°</span>
              <span className="text-[10px] text-slate-500 block mt-1">Derékszög</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <strong className="text-emerald-900 dark:text-emerald-200 block text-sm">Harmad (1/3)</strong>
              <span className="text-xs text-emerald-600 font-mono font-bold block my-0.5">33,3%</span>
              <span className="text-base font-black text-emerald-800 dark:text-emerald-300">120°</span>
              <span className="text-[10px] text-slate-500 block mt-1">360° : 3</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <strong className="text-amber-900 dark:text-amber-200 block text-sm">Ötöd (1/5)</strong>
              <span className="text-xs text-amber-600 font-mono font-bold block my-0.5">20%</span>
              <span className="text-base font-black text-amber-800 dark:text-amber-300">72°</span>
              <span className="text-[10px] text-slate-500 block mt-1">360° : 5</span>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <strong className="text-purple-900 dark:text-purple-200 block text-sm">Hatod (1/6)</strong>
              <span className="text-xs text-purple-600 font-mono font-bold block my-0.5">16,7%</span>
              <span className="text-base font-black text-purple-800 dark:text-purple-300">60°</span>
              <span className="text-[10px] text-slate-500 block mt-1">360° : 6</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
              <strong className="text-rose-900 dark:text-rose-200 block text-sm">Nyolcad (1/8)</strong>
              <span className="text-xs text-rose-600 font-mono font-bold block my-0.5">12,5%</span>
              <span className="text-base font-black text-rose-800 dark:text-rose-300">45°</span>
              <span className="text-[10px] text-slate-500 block mt-1">90° : 2</span>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-200 block text-sm">Tized (1/10)</strong>
              <span className="text-xs text-teal-600 font-mono font-bold block my-0.5">10%</span>
              <span className="text-base font-black text-teal-800 dark:text-teal-300">36°</span>
              <span className="text-[10px] text-slate-500 block mt-1">360° : 10</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-slate-200 block text-sm">Háromnegyed (3/4)</strong>
              <span className="text-xs text-slate-600 font-mono font-bold block my-0.5">75%</span>
              <span className="text-base font-black text-slate-800 dark:text-slate-300">270°</span>
              <span className="text-[10px] text-slate-500 block mt-1">3 · 90°</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-classroom-example',
      title: '4. Részletes mintapélda: Egy 24 fős osztály szakkörei',
      badge: 'Mintapélda',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Egy 24 fős osztályban a tanulók <strong>40%-a</strong> zenét tanul, <strong>35%-a</strong> kézműves szakkörre jár, <strong>25%-a</strong> pedig sportkörös:
          </p>

          <ClassroomPieChartSvg />

          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-1.5 text-xs sm:text-sm">
            <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" /> A számítás lépései:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Zene (40%):</strong> Szög = $40 \cdot 3,6^\circ = 144^\circ$. Létszám = $24 \cdot 0,40 \approx 10$ fő.</li>
              <li><strong>Kézműves (35%):</strong> Szög = $35 \cdot 3,6^\circ = 126^\circ$. Létszám = $24 \cdot 0,35 \approx 8$ fő.</li>
              <li><strong>Sport (25%):</strong> Szög = $25 \cdot 3,6^\circ = 90^\circ$ (derékszög). Létszám = $24 \cdot 0,25 = 6$ fő.</li>
              <li><strong>Kötelező ellenőrzés:</strong> $144^\circ + 126^\circ + 90^\circ = 360^\circ$ és $40\% + 35\% + 25\% = 100\%$.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sec-interactive-lab',
      title: '5. Interaktív Kördiagram Műhely',
      badge: 'Gyakorlat',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Változtasd a csúszkákkal a három tevékenység arányát, és figyeld meg, hogyan számolódnak újra a szögek és a körcikkek valós időben!
          </p>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Bal oldal: Csúszkák */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-blue-700 dark:text-blue-300 mb-1">
                    <span>1. Kategória: Sport</span>
                    <span>{pctA}% → {angleA}° ({countA} fő)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={valA}
                    onChange={(e) => setValA(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-amber-700 dark:text-amber-300 mb-1">
                    <span>2. Kategória: Zene</span>
                    <span>{pctB}% → {angleB}° ({countB} fő)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={valB}
                    onChange={(e) => setValB(Number(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                    <span>3. Kategória: Kézműves</span>
                    <span>{pctC}% → {angleC}° ({countC} fő)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={valC}
                    onChange={(e) => setValC(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <span>Összlétszám (osztály):</span>
                    <span className="font-mono text-indigo-600 font-black">{classSize} fő</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="40"
                    value={classSize}
                    onChange={(e) => setClassSize(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              {/* Jobb oldal: Dinamikusan generált SVG kördiagram */}
              <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <svg viewBox="0 0 240 240" className="w-48 h-48 drop-shadow-sm">
                  {/* Arc 1: Sport */}
                  <path d={arc1} fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                  {/* Arc 2: Zene */}
                  <path d={arc2} fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  {/* Arc 3: Kézműves */}
                  <path d={arc3} fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="120" cy="120" r="4" fill="#1e293b" />
                </svg>

                <div className="flex gap-2.5 mt-2 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-blue-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Sport: {pctA}% ({angleA}°)
                  </span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Zene: {pctB}% ({angleB}°)
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Rajz: {pctC}% ({angleC}°)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-center text-slate-500 dark:text-slate-400">
              Összeg: {pctA}% + {pctB}% + {pctC}% = <strong>100%</strong> | Szögek: {angleA}° + {angleB}° + {angleC}° = <strong>360°</strong>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-construction-guide',
      title: '6. Hogyan szerkesszünk kördiagramot füzetben szögmérővel?',
      badge: 'Szerkesztés',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A matematika órán és felvételi feladatokban gyakran saját magunknak kell megszerkeszteni a kördiagramot egy megadott adattáblázatból. Íme a 4 aranyszabály:
          </p>

          <PieConstructionStepsSvg />

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs sm:text-sm">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" /> A pontos szerkesztés lépései:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li><strong>Számold ki az összes szöget:</strong> Mindig ellenőrizd az elején, hogy az összeadott szögek pontosan 360°-ot tesznek-e ki!</li>
              <li><strong>Húzz egy függőleges kezdősugarat:</strong> Ettől indul az első körcikk kimérése.</li>
              <li><strong>Illeszd pontosan a szögmérőt:</strong> A szögmérő középpontját tedd a kör középpontjára, alapvonalát pedig a legutóbb meghúzott sugárra.</li>
              <li><strong>Az utolsó szeletet már nem kell kimérni:</strong> Ha pontosan dolgoztál, a megmaradó rész automatikusan kiadja az utolsó szöget!</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'sec-misleading-pie',
      title: '7. Kritikus szemlélet: Félrevezető kördiagramok a reklámokban',
      badge: 'Médiatudatosság',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A kördiagram a leggyakrabban manipulált diagramtípus a marketingben. A döntött, térhatású (3D) ábrázolás segítségével egy termék kisebb piaci részesedését optikailag hatalmasnak lehet mutatni:
          </p>

          <Misleading3DPieSvg />

          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 space-y-1.5 text-xs sm:text-sm">
            <div className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> Mire figyelj mindig a hírekben és hirdetésekben?
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Kerüld a döntött 3D-s tortadiagramokat:</strong> Az elülső szelet a perspektíva miatt akár kétszer-háromszor akkorának tűnik, mint az azonos szögű hátsó szelet!</li>
              <li><strong>Mindig add össze a százalékokat:</strong> Ha az összeg nem pontosan 100% (pl. csak 85% vagy 115%), a diagram hamis és megbízhatatlan.</li>
              <li><strong>Nem való túl sok kategóriához:</strong> Ha 7-nél több szelet van, a kördiagram átláthatatlanná válik; ilyenkor jobb az oszlop- vagy sávdiagram!</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sec-summary',
      title: '8. Összefoglaló ellenőrző lista és képletek',
      badge: 'Szintézis',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <h4 className="font-black text-indigo-950 dark:text-indigo-200 text-sm">
              Mit kell biztosan tudnod a 6. osztályos kördiagram témakörből?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>$100\% = 360^\circ$ és $1\% = 3,6^\circ$.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Középponti szög: $\alpha = p \cdot 3,6^\circ$.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Százalék kiszámítása szögből: $p = \alpha : 3,6^\circ$.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Nevezetes szögek: $90^\circ = 25\%$, $180^\circ = 50\%$, $270^\circ = 75\%$.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            {onStartQuiz && (
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 shadow-md"
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
      title="Kördiagram"
      subtitle="Az egész részekre bontása, középponti szögek kiszámítása (1% = 3,6°), kördiagram szerkesztése és adatok leolvasása"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 3. ALTÉMA"
      themeColor="indigo"
      pdfFilename="6_osztaly_VI_kordiagram_tananyag.pdf"
      quickRule={{
        label: 'A Kördiagram Aranyszabályai',
        formula: '100% = 360°  •  1% = 3,6°  •  α = p · 3,6°  •  p = α : 3,6°'
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};

export default PieChartTheory;
