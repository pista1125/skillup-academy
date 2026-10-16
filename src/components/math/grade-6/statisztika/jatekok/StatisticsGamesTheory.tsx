import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Info,
  Circle,
  Layers,
  Table,
  Target,
  ArrowRight,
  BrainCircuit,
  Eye,
  Check,
  X
} from 'lucide-react';
import {
  TwoSetVennDiagramSvg,
  ClassroomStatisticsVennSvg,
  ThreeSetVennDiagramSvg,
  BinarySearchTreeSvg,
  LogicGridPuzzleSvg
} from './StatisticsGamesDiagrams';

interface StatisticsGamesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const StatisticsGamesTheory: React.FC<StatisticsGamesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Venn-diagram játszótér állapota
  const [activeRegion, setActiveRegion] = useState<'A' | 'B' | 'AB' | 'none' | 'all'>('AB');
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Mintafeladat osztálylétszám szimuláció állapota
  const [studentTotal, setStudentTotal] = useState<number>(30);
  const [sportCount, setSportCount] = useState<number>(18);
  const [musicCount, setMusicCount] = useState<number>(16);
  const [bothCount, setBothCount] = useState<number>(8);

  const onlySport = sportCount - bothCount;
  const onlyMusic = musicCount - bothCount;
  const unionCount = onlySport + bothCount + onlyMusic;
  const neitherCount = Math.max(0, studentTotal - unionCount);

  // 8 Részletes Tananyag Szekció
  const sections: TheorySection[] = [
    {
      id: 'sec-venn-intro',
      title: '1. Mi az a Venn-diagram? Halmazok ábrázolása síkban',
      badge: 'Alapfogalom',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A statisztikában és a mindennapi életben gyakran kell adatokat, embereket vagy tárgyakat csoportosítanunk bizonyos tulajdonságaik szerint. Az angol matematikus, <strong>John Venn</strong> (1834–1923) olyan egyszerű és látványos ábrázolást talált fel, amely zárt síkgörbékkel (leggyakrabban körökkel vagy oválisokkal) mutatja be a halmazok közötti átfedéseket és kapcsolatokat.
          </p>

          <TwoSetVennDiagramSvg />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                U • Alaphalmaz
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A téglalap alakú keret, amely <strong>minden vizsgált elemet</strong> tartalmaz (pl. egy iskola összes 6. osztályosa).
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-[11px] font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider block">
                A és B • Halmazok
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A zárt körök, amelyek egy-egy konkrét tulajdonsággal rendelkező elemeket fognak egybe (pl. "sportolók", "zenélők").
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                Tartományok
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Két kör a téglalapon belül pontosan <strong>4 egymást kizáró részre</strong> osztja a síkot!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-set-operations',
      title: '2. Két halmaz alapműveletei: Metszet, Unió, Különbség',
      badge: 'Műveletek',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A logikai és statisztikai gondolkodás három legfontosabb művelete:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-b from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border-2 border-purple-200 dark:border-purple-800 space-y-2">
              <div className="font-black text-purple-900 dark:text-purple-200 text-sm flex items-center justify-between">
                <span>1. Metszet (A ∩ B)</span>
                <span className="text-xs font-mono bg-purple-200 dark:bg-purple-900 px-2 py-0.5 rounded-full">" ÉS "</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Azon elemek halmaza, amelyek <strong>mind az A, mind a B halmazba egyszerre</strong> beletartoznak.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 text-[11px] font-mono text-purple-800 dark:text-purple-300">
                Példa: Páros ÉS 3-mal osztható számok halmaza (a 6 többszörösei).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border-2 border-blue-200 dark:border-blue-800 space-y-2">
              <div className="font-black text-blue-900 dark:text-blue-200 text-sm flex items-center justify-between">
                <span>2. Unió (A ∪ B)</span>
                <span className="text-xs font-mono bg-blue-200 dark:bg-blue-900 px-2 py-0.5 rounded-full">" VAGY "</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Azon elemek összessége, amelyek <strong>legalább az egyik halmazba</strong> beletartoznak (akár A-ban, akár B-ben, akár mindkettőben vannak).
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-[11px] font-mono text-blue-800 dark:text-blue-300">
                Példa: Aki angolul VAGY németül tanul (vagy mindkét nyelven).
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-b from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/40 border-2 border-pink-200 dark:border-pink-800 space-y-2">
              <div className="font-black text-pink-900 dark:text-pink-200 text-sm flex items-center justify-between">
                <span>3. Különbség (A \ B)</span>
                <span className="text-xs font-mono bg-pink-200 dark:bg-pink-900 px-2 py-0.5 rounded-full">" CSAK A "</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Azon elemek halmaza, amelyek <strong>benne vannak az A halmazban, de nincsenek benne a B halmazban</strong>.
              </p>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-800 text-[11px] font-mono text-pink-800 dark:text-pink-300">
                Példa: Aki sportol, de hangszert nem tanul.
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong>Jegyezd meg a szimbólumokat könnyen:</strong>
              <br />
              • A metszet jele <strong>∩</strong> olyan, mint egy lefordított kosár (csak az marad meg benne, ami mindkét helyre illik).
              <br />
              • Az unió jele <strong>∪</strong> mint egy kehely (mindent magába fogad).
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-classroom-stats',
      title: '3. Szöveges statisztikai feladatok: A "metszettől kifelé" aranyszabály',
      badge: 'Módszertan',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A 6. osztályos felvételi és matematika versenyek egyik leggyakoribb feladattípusa az átfedéses csoportlétszámok kiszámítása. <strong>A leggyakoribb hiba</strong>, hogy a diákok egyszerűen összeadják a megadott számokat, így a közös elemeket kétszer számolják!
          </p>

          <ClassroomStatisticsVennSvg />

          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="font-bold text-sm text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" /> A Szita-formula (Két halmaz uniójának elemszáma)
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Két halmaz uniójának elemszámát úgy kapjuk meg, hogy összeadjuk az elemeik számát, de a metszetüket <strong>egyszer le kell vonnunk</strong>, mert különben kétszer számolnánk:
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-indigo-300 text-center font-mono font-black text-indigo-950 dark:text-indigo-100 text-sm sm:text-base">
              |A ∪ B| = |A| + |B| - |A ∩ B|
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Példánkban: 18 (angolos) + 14 (németes) - 8 (mindkettő) = 24 tanuló, aki legalább egy nyelvet tanul.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sec-interactive-lab',
      title: '4. Interaktív Venn-diagram laboratórium',
      badge: 'Gyakorlat',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Próbáld ki a dinamikus osztálylétszám szimulátort! Állítsd be az értékeket, és figyeld meg, hogyan változnak a tartományok:
          </p>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 shadow-sm space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Összlétszám (U): {studentTotal}
                </label>
                <input
                  type="range"
                  min="20"
                  max="40"
                  value={studentTotal}
                  onChange={(e) => setStudentTotal(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <label className="font-bold text-blue-700 dark:text-blue-300 block mb-1">
                  Sportolók (A): {sportCount}
                </label>
                <input
                  type="range"
                  min="10"
                  max={studentTotal}
                  value={sportCount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSportCount(val);
                    if (bothCount > val) setBothCount(val);
                  }}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-amber-700 dark:text-amber-300 block mb-1">
                  Zenélők (B): {musicCount}
                </label>
                <input
                  type="range"
                  min="10"
                  max={studentTotal}
                  value={musicCount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMusicCount(val);
                    if (bothCount > val) setBothCount(val);
                  }}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <label className="font-bold text-purple-700 dark:text-purple-300 block mb-1">
                  Mindkettő (A ∩ B): {bothCount}
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.min(sportCount, musicCount)}
                  value={bothCount}
                  onChange={(e) => setBothCount(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>

            {/* Eredmény kártyák */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-blue-600 block">Csak sportol</span>
                <span className="text-base font-black text-blue-900 dark:text-blue-200">{onlySport} fő</span>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200">
                <span className="text-[10px] uppercase font-bold text-purple-600 block">Mindkettő</span>
                <span className="text-base font-black text-purple-900 dark:text-purple-200">{bothCount} fő</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-600 block">Csak zenél</span>
                <span className="text-base font-black text-amber-900 dark:text-amber-200">{onlyMusic} fő</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200">
                <span className="text-[10px] uppercase font-bold text-rose-600 block">Egyiket sem</span>
                <span className="text-base font-black text-rose-900 dark:text-rose-200">{neitherCount} fő</span>
              </div>
            </div>

            <div className="text-xs text-center text-slate-500 dark:text-slate-400">
              Összegellenőrzés: {onlySport} (csak sport) + {bothCount} (mindkettő) + {onlyMusic} (csak zene) + {neitherCount} (egyik sem) = <strong>{studentTotal} fő (U)</strong> ✓
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-three-sets',
      title: '5. Háromhalmazos Venn-diagram: 7 belső tartomány',
      badge: 'Haladó',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Amikor három tulajdonságot vizsgálunk egyszerre (pl. sportol, zenél, nyelvet tanul), a három egymást metsző kör pontosan <strong>7 belső tartományra</strong> és <strong>1 külső tartományra</strong> osztja az alaphalmazt:
          </p>

          <ThreeSetVennDiagramSvg />

          <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1.5">
            <div className="font-bold text-purple-900 dark:text-purple-200 text-xs sm:text-sm flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-600" /> A háromhalmazos kitöltési stratégia:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              1. <strong>Mindig a legbelső hármas metszettel kezdj</strong> ($A \cap B \cap C$), ahova azok kerülnek, akik mindhárom tulajdonsággal rendelkeznek!
              <br />
              2. Ezután a <strong>három páros metszetet</strong> töltsd ki úgy, hogy levonod belőlük a hármas metszetet!
              <br />
              3. Végül a <strong>három kizárólagos tartományt</strong> számold ki (pl. Csak A = Összes A - páros metszetek - hármas metszet).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sec-binary-search',
      title: '6. Logikai játékok: A Barkochba és az információ felezése',
      badge: 'Stratégia',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            A híres <strong>Barkochba</strong> játékban olyan kérdéseket kell feltennünk, amelyekre a válasz csak <em>"Igen"</em> vagy <em>"Nem"</em> lehet. Matematikailag az a legtökéletesebb kérdés, amely <strong>pontosan megfelezi a lehetséges válaszok halmazát</strong>!
          </p>

          <BinarySearchTreeSvg />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <strong className="text-teal-900 dark:text-teal-300 block mb-1">Miért pont a felezés a legjobb?</strong>
              Ha a kérdéseddel (pl. "Nagyobb mint 50?") a lehetőségek felét kizárod, a bizonytalanság a felére csökken. Így minden kérdés pontosan 1 bit információt ad!
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
              <strong className="text-indigo-900 dark:text-indigo-300 block mb-1">A kettő hatványainak ereje:</strong>
              • 1 kérdés: 2 lehetőség
              <br />
              • 7 kérdés: 2⁷ = 128 lehetőség (1-100 kitalálása!)
              <br />
              • 20 kérdés: 2²⁰ = <strong>1 048 576 lehetőség</strong> (több mint 1 millió tárgy közül is egyértelműen megtalálható a gondolt elem)!
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-logic-grid',
      title: '7. Kizárásos logikai mátrix (Szita táblázat)',
      badge: 'Rejtvények',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>
            Gyakran találkozunk olyan szöveges feladványokkal, ahol több személyhez kell hozzárendelni tulajdonságokat (pl. ki milyen hangszeren játszik, milyen színű házban lakik). Ezt a leghatékonyabban egy <strong>logikai szita táblázattal (mátrixszal)</strong> oldhatjuk meg:
          </p>

          <LogicGridPuzzleSvg />

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-pink-500" /> A deduktív következtetés lépései:
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>Minden közvetlen tagadást jelölj piros <strong>✗</strong> jellel a táblázatban.</li>
              <li>Ha egy sorban minden mező ✗ lett egy kivételével, az az egy mező kötelezően zöld <strong>✓</strong> lesz.</li>
              <li>Amint beírsz egy <strong>✓</strong> jelet, az adott sor és oszlop összes többi mezőjét azonnal <strong>✗</strong>-szel kell kizárnod!</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'sec-sample-problems',
      title: '8. Mintafeladatok részletes levezetéssel',
      badge: 'Önellenőrzés',
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              1. Feladat: Házi feladat és dolgozat
            </div>
            <p className="text-xs">
              Egy 25 fős osztályban mindenki írt dolgozatot. 16 tanuló készített házi feladatot, és 12 tanuló kapott ötöst a dolgozatra. 8 olyan diák van, aki házit is írt, és ötöst is kapott. Hány olyan diák van az osztályban, aki nem kapott ötöst és házi feladatot sem készített?
            </p>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <strong>Megoldás Venn-diagrammal:</strong>
              <div>• Metszet (házi ÉS ötös): <strong>8 fő</strong></div>
              <div>• Csak házi (nem ötös): 16 - 8 = <strong>8 fő</strong></div>
              <div>• Csak ötös (nincs házi): 12 - 8 = <strong>4 fő</strong></div>
              <div>• Legalább az egyik teljesült (Unió): 8 + 8 + 4 = <strong>20 fő</strong></div>
              <div>• Egyik sem teljesült: 25 - 20 = <strong>5 tanuló</strong>. ✓</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              2. Feladat: Számelméleti halmazok metszete
            </div>
            <p className="text-xs">
              Az alaphalmaz az 1-től 20-ig terjedő egész számok halmaza ({"$U = \\{1, 2, \\dots, 20\\}$"}).
              <br />
              $A$ halmaz: a 2-vel osztható számok (párosak).
              <br />
              $B$ halmaz: a 3-mal osztható számok.
              <br />
              Hány elem tartozik az $A \cap B$ metszetbe, és hány elem van a két körön kívül?
            </p>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 text-xs text-purple-900 dark:text-purple-200 space-y-1">
              <strong>Megoldás:</strong>
              <div>• $A$ elemei (párosak): 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 (összesen 10 db).</div>
              <div>• $B$ elemei (3 többszörösei): 3, 6, 9, 12, 15, 18 (összesen 6 db).</div>
              <div>• Metszet ($A \cap B$, 6 többszörösei): 6, 12, 18 $\implies$ <strong>3 elem</strong>.</div>
              <div>• Unió ($A \cup B$): $|A| + |B| - |A \cap B| = 10 + 6 - 3 = 13$ elem.</div>
              <div>• Kívül esők (se nem páros, se nem osztható 3-mal): 20 - 13 = <strong>7 elem</strong> (1, 5, 7, 11, 13, 17, 19). ✓</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Játékok és Logika a Statisztikában"
      subtitle="Venn-diagramok, halmazműveletek, osztálystatisztika, felezési stratégia és kizárásos rejtvények"
      topicBadge="6. OSZTÁLY • VI. STATISZTIKA"
      themeColor="rose"
      pdfFilename="6_osztaly_VI_statisztika_jatekok_tananyag.pdf"
      quickRule={{
        label: 'A Venn-diagramok és Halmazok Alapszabálya',
        formula: '|A ∪ B| = |A| + |B| - |A ∩ B|  •  U = Alaphalmaz'
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};
