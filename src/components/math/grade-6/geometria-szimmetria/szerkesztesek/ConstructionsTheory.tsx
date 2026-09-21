import React from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import {
  AngleBisectorConstructionDiagram,
  PerpendicularFromPointDiagram,
  PerpendicularFromExternalPointDiagram,
  TriangleConstructionDiagram
} from './ConstructionsDiagrams';
import { Compass, Pencil, ShieldCheck, AlertTriangle, Lightbulb, Target, Sparkles, MoveHorizontal } from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

export interface ConstructionsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function ConstructionsTheory({ onBack, onStartQuiz }: ConstructionsTheoryProps) {
  const sections: TheorySection[] = [
    // 1. FEJEZET: AZ EUKLIDESZI SZERKESZTÉSEK ALAPELVEI
    {
      id: 'principles',
      title: '1. Az euklideszi szerkesztések alapelvei és eszközei',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A geometriai szerkesztések a matematika több mint 2000 éves hagyományán, az ókori görög matematikus, 
            <strong>Eukleidész</strong> elvein alapulnak. A szerkesztések során szigorú szabályok szerint 
            kizárólag két alapeszközt használhatunk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800/60 shadow-xs">
              <h4 className="font-black text-indigo-950 dark:text-indigo-200 text-sm sm:text-base flex items-center gap-2 mb-1.5">
                <Compass className="w-5 h-5 text-indigo-600" />
                1. A körző
              </h4>
              <p className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-300 font-medium">
                • <strong>Mire használjuk?</strong> Adott középpontú és sugarú kör vagy körív rajzolására, valamint 
                <strong>távolságok pontos átvitelére és felmérésére</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/60 shadow-xs">
              <h4 className="font-black text-amber-950 dark:text-amber-200 text-sm sm:text-base flex items-center gap-2 mb-1.5">
                <Pencil className="w-5 h-5 text-amber-600" />
                2. Az egyélű vonalzó
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 font-medium">
                • <strong>Mire használjuk?</strong> Két tetszőleges pont összekötésére, félegyenesek és egyenesek húzására. 
                <span className="block mt-1 font-bold text-amber-950 dark:text-amber-200">
                  Fontos: A vonalzón lévő beosztást mérésre a tiszta elméleti szerkesztésben nem használjuk!
                </span>
              </p>
            </div>
          </div>
        </div>
      )
    },

    // 2. FEJEZET: SZÖGFELEZŐ SZERKESZTÉSE ÉS TULAJDONSÁGAI
    {
      id: 'angle-bisector',
      title: '2. A szögfelező szerkesztése és a szögfelező tétel',
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Egy szög <strong>szögfelezője</strong> (<MathText>f_\alpha</MathText>) a szög csúcsából kiinduló félegyenes, 
            amely a szöget két egyenlő nagyságú részre (<MathText>{"\\alpha_1 = \\alpha_2 = \\frac{\\alpha}{2}"}</MathText>) osztja.
          </p>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800/60 shadow-xs">
            <h4 className="font-black text-indigo-950 dark:text-indigo-200 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              A szögfelező mint geometriai ponthalmaz (Tétel)
            </h4>
            <p className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-300 font-medium">
              A szögfelező a sík mindazon pontjainak halmaza a szögtartományban, amelyek 
              <strong>egyenlő távolságra vannak a szög két szárától</strong>:
            </p>
            <div className="mt-2 text-xs font-mono font-bold text-indigo-800 dark:text-indigo-200">
              d(P, a) = d(P, b)    ahol    P ∈ f_α
            </div>
          </div>

          <AngleBisectorConstructionDiagram />
        </div>
      )
    },

    // 3. FEJEZET: MERŐLEGES EGYENESEK SZERKESZTÉSE
    {
      id: 'perpendiculars',
      title: '3. Merőleges egyenesek szerkesztése (adott pontban és külső pontból)',
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A merőleges egyenesek szerkesztése a szakaszfelező merőleges szerkesztési elvén alapul. Két alapvető esetet különböztetünk meg:
          </p>

          <PerpendicularFromPointDiagram />

          <PerpendicularFromExternalPointDiagram />
        </div>
      )
    },

    // 4. FEJEZET: PÁRHUZAMOS EGYENESEK ÉS NEVEZETES SZÖGEK
    {
      id: 'parallels-angles',
      title: '4. Párhuzamos egyenesek és nevezetes szögek szerkesztése (60°, 30°, 45°, 120°)',
      icon: <MoveHorizontal className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Párhuzamos egyenest úgy szerkesztünk, hogy az adott egyenesre merőlegest állítunk, majd a kapott merőlegesre egy másik pontban újra merőlegest szerkesztünk (merőleges merőlegese párhuzamos).
          </p>

          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border-2 border-teal-200 dark:border-teal-800/60 shadow-xs">
            <h4 className="font-black text-teal-950 dark:text-teal-200 text-sm sm:text-base flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-teal-600" />
              Nevezetes szögek szerkesztése körzővel (szögmérő nélkül!)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-200 dark:border-teal-800">
                <strong className="text-amber-600 block">1. 60°-os szög:</strong>
                Szabályos háromszög szerkesztése: a szög csúcsából <MathText>R</MathText> sugarú körívet húzunk, majd a metszéspontból ugyanezzel az <MathText>R</MathText> sugárral elmetsszük az ívet.
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-200 dark:border-teal-800">
                <strong className="text-emerald-600 block">2. 30°-os szög:</strong>
                A megszerkesztett <MathText>60^\circ</MathText>-os szög szögfelezőjének megszerkesztése (<MathText>60^\circ / 2 = 30^\circ</MathText>).
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-200 dark:border-teal-800">
                <strong className="text-cyan-600 block">3. 90°-os és 45°-os szög:</strong>
                Egyenes adott pontjában merőlegest állítunk (<MathText>90^\circ</MathText>), majd a kapott derékszöget elfelezzük (<MathText>90^\circ / 2 = 45^\circ</MathText>).
              </div>
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-teal-200 dark:border-teal-800">
                <strong className="text-purple-600 block">4. 120°-os és 75°-os szög:</strong>
                <MathText>120^\circ = 2 \times 60^\circ</MathText> (egymás mellé mérve két 60°-os ív), <MathText>75^\circ = 60^\circ + 15^\circ</MathText> vagy <MathText>(60^\circ + 90^\circ)/2</MathText>.
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 5. FEJEZET: HÁROMSZÖGEK SZERKESZTÉSE ÉS SZERKESZTHETŐSÉG
    {
      id: 'triangle-constructions',
      title: '5. Háromszögek szerkesztése és a háromszög-egyenlőtlenség',
      icon: <AlertTriangle className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Háromszöget egyértelműen meghatároz és szerkeszthetővé tesz 3 független adat (az egybevágósági alapesetek szerint):
            3 oldal (<MathText>ooo</MathText>), 2 oldal és a közbezárt szög (<MathText>osz</MathText>), vagy 1 oldal és a rajta fekvő 2 szög (<MathText>szosz</MathText>).
          </p>

          <TriangleConstructionDiagram />

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-800/60 shadow-xs">
            <h4 className="font-black text-rose-950 dark:text-rose-200 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Gyakori csapda: A háromszög-egyenlőtlenség!
            </h4>
            <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-300 font-medium">
              Nem minden 3 számból lehet háromszöget szerkeszteni! A szerkeszthetőség elengedhetetlen feltétele: 
              <strong>bármely két oldal összegének szigorúan nagyobbnak kell lennie a harmadik oldalnál</strong>:
            </p>
            <div className="mt-2 text-xs font-mono font-bold text-rose-800 dark:text-rose-200">
              a + b &gt; c    és    a + c &gt; b    és    b + c &gt; a
            </div>
            <p className="text-[11px] text-rose-800 dark:text-rose-300 mt-1">
              Gyors ellenőrzés: A két rövidebb oldal összege legyen nagyobb a leghosszabb oldalnál (pl. <MathText>3 + 4 &lt; 10</MathText>, így a 3 cm, 4 cm, 10 cm oldalakból <strong>nem szerkeszthető</strong> háromszög).
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Geometriai szerkesztések"
      subtitle="Körző és vonalzó használata, szögfelezés, merőleges és párhuzamos szerkesztése, nevezetes szögek és háromszögek"
      badge="📐 6. Osztály • III. Geometria • 5. Fejezet"
      themeColor="indigo"
      sections={sections}
      quickRule={{
        label: 'A szerkesztések alapösszefüggései',
        formula: 'f_α: d(P, a) = d(P, b)    és    60° (R = a)    és    a + b > c'
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
