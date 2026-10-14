import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Layers,
  Table,
  Search,
  RotateCcw
} from 'lucide-react';

interface MultipleSolutionsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const MultipleSolutionsTheory: React.FC<MultipleSolutionsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota: kiválasztott feladat és szűrés
  const [selectedCase, setSelectedCase] = useState<'rect' | 'coins' | 'sum'>('rect');

  const sections: TheorySection[] = [
    {
      id: 'megoldasok-szama',
      title: 'Hány megoldása lehet egy matematikai feladatnak?',
      badge: 'Alapismeretek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A mindennapi feladatokban gyakran egyetlen végeredményt várunk, ám a matematikában és a valóságban 
            egy problémának nem feltétlenül csak egy válasza létezik. A megoldások száma lehet:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 uppercase text-[11px]">
                <AlertTriangle className="w-4 h-4" /> 1. Nincs megoldás (0 db)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A feltételek ellentmondanak egymásnak (pl. $x + 5 = x + 8$), vagy az algebrai eredmény 
                nem értelmezhető az adott valós alaphalmazon (pl. egy osztálylétszám nem lehet $14,5$ vagy negatív szám).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/40 dark:bg-teal-950/20 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5 uppercase text-[11px]">
                <CheckCircle2 className="w-4 h-4" /> 2. Pontosan egy megoldás (1 db)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A feltételek egyértelműen meghatározzák az ismeretlent.
                <br /><strong className="text-slate-800 dark:text-slate-200">Példa:</strong> $3x + 4 = 19 \implies x = 5$.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 space-y-1.5">
              <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 uppercase text-[11px]">
                <Layers className="w-4 h-4" /> 3. Több (véges sok) megoldás
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Több olyan számpár vagy érték is létezik, amely kielégíti a feltételeket.
                <br /><strong className="text-slate-800 dark:text-slate-200">Példa:</strong> Egész oldalú téglalap területe 24 cm² ($1\times 24$, $2\times 12$, $3\times 8$, $4\times 6$).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-1.5">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 uppercase text-[11px]">
                <Sparkles className="w-4 h-4" /> 4. Végtelen sok megoldás
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Azonosságoknál (pl. $2(x + 3) = 2x + 6$) bármely valós szám megoldás, 
                vagy egyenlőtlenségeknél (pl. $x &gt; 5$ a valós számokon).
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'modszeres-esetvizsgalat',
      title: 'A módszeres esetvizsgálat és a táblázatkészítés',
      badge: 'Módszertan',
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha egy feladatban több lehetséges megoldás van, a legfontosabb, hogy <strong>rendszeresen és tervszerűen</strong> 
            haladj, különben könnyen kifelejtesz egy-egy helyes megoldást!
          </p>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 space-y-2">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
              <Table className="w-4 h-4 text-amber-600" /> A szisztematikus keresés 3 alapszabálya:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
              <li><strong>Rögzítsd a szélső értékeket:</strong> Határozd meg a legkisebb és a legnagyobb szóba jöhető értéket!</li>
              <li><strong>Haladj növekvő vagy csökkenő sorrendben:</strong> Kezdd az egyik változó legkisebb értékével ($x = 1, 2, 3\dots$), és vizsgáld meg, ad-e érvényes megoldást a másik változóra!</li>
              <li><strong>Zárd ki az érvénytelen eseteket:</strong> Ellenőrizd az alaphalmazt (pl. természetes szám-e, pozitív-e, megfelel-e a szöveg minden mondatának).</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Több megoldás is lehet"
      subtitle="Módszeres esetvizsgálat, táblázatkészítés és a megoldások számának meghatározása"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="amber"
      pdfFilename="6_osztaly_IV_tobb_megoldas_tananyag.pdf"
      quickRule={{
        label: 'Esetvizsgálat alapszabálya',
        formula: 'Vizsgáld az alaphalmazt! Készíts szisztematikus táblázatot az összes lehetséges megoldás megtalálásához!'
      }}
      practiceTitle="Készen állsz az esetvizsgálatokra?"
      practiceSubtitle="Gyakorold a lehetséges megoldások szisztematikus megkeresését és a kizárást 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Esetvizsgáló Labor */}
      <Card className="p-4 sm:p-5 border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 dark:from-slate-900 dark:to-amber-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 dark:border-amber-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-amber-600 text-white shadow-xs">
                <Search className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Esetvizsgáló és Táblázat Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nézd meg, hogyan találjuk meg az összes megoldást lépésről lépésre!
                </p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <Button
                size="sm"
                variant={selectedCase === 'rect' ? 'default' : 'outline'}
                onClick={() => setSelectedCase('rect')}
                className={`text-xs ${selectedCase === 'rect' ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold' : 'border-amber-200 text-amber-900 dark:border-slate-800 dark:text-slate-300'}`}
              >
                1. Téglalap T = 24 cm²
              </Button>
              <Button
                size="sm"
                variant={selectedCase === 'coins' ? 'default' : 'outline'}
                onClick={() => setSelectedCase('coins')}
                className={`text-xs ${selectedCase === 'coins' ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold' : 'border-amber-200 text-amber-900 dark:border-slate-800 dark:text-slate-300'}`}
              >
                2. 2x + 5y = 20
              </Button>
              <Button
                size="sm"
                variant={selectedCase === 'sum' ? 'default' : 'outline'}
                onClick={() => setSelectedCase('sum')}
                className={`text-xs ${selectedCase === 'sum' ? 'bg-amber-600 hover:bg-amber-700 text-white font-bold' : 'border-amber-200 text-amber-900 dark:border-slate-800 dark:text-slate-300'}`}
              >
                3. Háromszög szögei
              </Button>
            </div>
          </div>

          {/* Dinamikus tartalom a választott eset alapján */}
          {selectedCase === 'rect' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                  Feladat: Egy téglalap területe 24 cm², és mindkét oldalának hossza egész centiméter. Hányféle ilyen téglalap létezik?
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Módszer: Keressük a 24 egész osztópárjait szisztematikusan $a \le b$ feltétellel!
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200">
                      <th className="p-2 border border-amber-200 dark:border-amber-800 font-bold">a oldal (cm)</th>
                      <th className="p-2 border border-amber-200 dark:border-amber-800 font-bold">b oldal (cm)</th>
                      <th className="p-2 border border-amber-200 dark:border-amber-800 font-bold">Terület: a · b</th>
                      <th className="p-2 border border-amber-200 dark:border-amber-800 font-bold">Kerület: 2(a + b)</th>
                      <th className="p-2 border border-amber-200 dark:border-amber-800 font-bold">Státusz</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    <tr>
                      <td className="p-2 font-mono font-bold text-amber-700 dark:text-amber-300 border">1 cm</td>
                      <td className="p-2 font-mono border">24 cm</td>
                      <td className="p-2 font-mono border">24 cm²</td>
                      <td className="p-2 font-mono text-slate-600 dark:text-slate-400 border">50 cm</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ 1. Megoldás</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-amber-700 dark:text-amber-300 border">2 cm</td>
                      <td className="p-2 font-mono border">12 cm</td>
                      <td className="p-2 font-mono border">24 cm²</td>
                      <td className="p-2 font-mono text-slate-600 dark:text-slate-400 border">28 cm</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ 2. Megoldás</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-amber-700 dark:text-amber-300 border">3 cm</td>
                      <td className="p-2 font-mono border">8 cm</td>
                      <td className="p-2 font-mono border">24 cm²</td>
                      <td className="p-2 font-mono text-slate-600 dark:text-slate-400 border">22 cm</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ 3. Megoldás</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-amber-700 dark:text-amber-300 border">4 cm</td>
                      <td className="p-2 font-mono border">6 cm</td>
                      <td className="p-2 font-mono border">24 cm²</td>
                      <td className="p-2 font-mono text-slate-600 dark:text-slate-400 border">20 cm</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ 4. Megoldás</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-400">
                      <td className="p-2 font-mono border">5 cm</td>
                      <td className="p-2 font-mono border">4,8 cm</td>
                      <td className="p-2 font-mono border">24 cm²</td>
                      <td className="p-2 font-mono border">-</td>
                      <td className="p-2 text-rose-500 font-medium border">✗ Nem egész szám</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                Összegzés: A feladatnak pontosan <strong>4 különböző megoldása</strong> létezik!
              </div>
            </div>
          )}

          {selectedCase === 'coins' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                  Feladat: Oldjuk meg a 2x + 5y = 20 egyenletet a természetes számok (0, 1, 2, 3...) halmazán!
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Módszer: Mivel 5y értéke legfeljebb 20 lehet, y csak 0, 1, 2, 3, 4 lehet. Vizsgáljuk meg mindet!
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse">
                  <thead>
                    <tr className="bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200">
                      <th className="p-2 border font-bold">y értéke</th>
                      <th className="p-2 border font-bold">5y értéke</th>
                      <th className="p-2 border font-bold">2x = 20 - 5y</th>
                      <th className="p-2 border font-bold">x értéke</th>
                      <th className="p-2 border font-bold">Eredmény (x, y)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    <tr>
                      <td className="p-2 font-mono font-bold border">y = 0</td>
                      <td className="p-2 font-mono border">0</td>
                      <td className="p-2 font-mono border">2x = 20</td>
                      <td className="p-2 font-mono font-bold text-emerald-600 border">x = 10</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ (10; 0)</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-400">
                      <td className="p-2 font-mono border">y = 1</td>
                      <td className="p-2 font-mono border">5</td>
                      <td className="p-2 font-mono border">2x = 15</td>
                      <td className="p-2 font-mono border">x = 7,5</td>
                      <td className="p-2 text-rose-500 font-medium border">✗ Nem természetes szám</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold border">y = 2</td>
                      <td className="p-2 font-mono border">10</td>
                      <td className="p-2 font-mono border">2x = 10</td>
                      <td className="p-2 font-mono font-bold text-emerald-600 border">x = 5</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ (5; 2)</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800/40 text-slate-400">
                      <td className="p-2 font-mono border">y = 3</td>
                      <td className="p-2 font-mono border">15</td>
                      <td className="p-2 font-mono border">2x = 5</td>
                      <td className="p-2 font-mono border">x = 2,5</td>
                      <td className="p-2 text-rose-500 font-medium border">✗ Nem természetes szám</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold border">y = 4</td>
                      <td className="p-2 font-mono border">20</td>
                      <td className="p-2 font-mono border">2x = 0</td>
                      <td className="p-2 font-mono font-bold text-emerald-600 border">x = 0</td>
                      <td className="p-2 text-emerald-600 font-bold border">✓ (0; 4)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                Összegzés: A természetes számokon pontosan <strong>3 számpár</strong> ad megoldást: (10; 0), (5; 2), (0; 4)!
              </div>
            </div>
          )}

          {selectedCase === 'sum' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                  Feladat: Egy egyenlő szárú háromszög egyik szöge 40°. Mekkorák a háromszög többi szögei?
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Módszer: Esetvizsgálat! A 40°-os szög lehet az alapon fekvő szög, vagy lehet a szárszög!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-white dark:bg-slate-900 space-y-1.5">
                  <span className="font-bold text-teal-700 dark:text-teal-300 uppercase text-[11px] block">
                    1. Eset: A 40°-os szög a szárszög
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                    A két alapon fekvő szög összege: 180° - 40° = 140°.
                    <br />Mivel az alapon fekvő szögek egyenlők: 140° : 2 = 70°.
                    <br /><strong className="text-teal-600">Szögek: 40°, 70°, 70°.</strong>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 space-y-1.5">
                  <span className="font-bold text-sky-700 dark:text-sky-300 uppercase text-[11px] block">
                    2. Eset: A 40°-os szög az alapon fekvő szög
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
                    Ekkor a másik alapon fekvő szög is 40°.
                    <br />A szárszög: 180° - (40° + 40°) = 100°.
                    <br /><strong className="text-sky-600">Szögek: 40°, 40°, 100°.</strong>
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                Összegzés: A geometriai feladatnak pontosan <strong>2 különböző megoldása</strong> van!
              </div>
            </div>
          )}
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default MultipleSolutionsTheory;
