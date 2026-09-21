import React from 'react';
import {
  TheoryTemplate,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  TheorySectionData
} from '../TheoryTemplate';
import {
  InteractiveGeometrySummaryWorkbench,
  GeometrySummaryMiniFigure
} from './GeometrySummaryDiagrams';
import { MathText } from '@/components/math/shared/MathText';
import {
  Trophy,
  Compass,
  Sparkles,
  Layers,
  Target,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Split,
  Eye,
  BookOpen,
  Ruler,
  HelpCircle,
  Shapes,
  Maximize2
} from 'lucide-react';

export interface GeometrySummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function GeometrySummaryTheory({ onBack, onStartQuiz }: GeometrySummaryTheoryProps) {
  const sections: TheorySectionData[] = [
    // =========================================================================
    // 1. FEJEZET: SÍKBELI ALAPFOGALMAK ÉS A KÖR
    // =========================================================================
    {
      id: 'planar-and-circle',
      title: '1. Síkbeli alapfogalmak, alakzatok és a kör',
      icon: <Shapes className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A síkgeometria a legalapvetőbb geometriai objektumokból építkezik: <strong>pontokból, egyenesekből, félegyenesekből és szakaszokból</strong>, valamint az ezek által bezárt szögekből és határolt síkidomokból.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <TheoryCard
              title="Alapfogalmak és egyenesek"
              badge="Síkalaktan"
              variant="blue"
              figure={<GeometrySummaryMiniFigure type="planar_elements" size={70} />}
              properties={[
                'Pont: kiterjedés nélküli hely a síkon (nagybetűvel: A, B, P).',
                'Egyenes: mindkét irányban végtelen vonal (kisbetűvel: e, f).',
                'Szakasz: egyenesnek két pont közé eső, mérhető hosszúságú darabja (AB).',
                'Egyenesek kölcsönös helyzete: metsző, párhuzamos (e || f) vagy merőleges (e ⊥ f).'
              ]}
            />

            <TheoryCard
              title="A kör és részei"
              badge="Körgeometria"
              variant="amber"
              figure={<GeometrySummaryMiniFigure type="circle_parts" size={70} />}
              properties={[
                'Kör (k(O, r)): a sík azon pontjai, melyek O-tól pontosan r távolságra vannak.',
                'Átmérő (d): a középponton átmenő leghosszabb húr (d = 2r).',
                'Húr: a körvonal két tetszőleges pontját összekötő szakasz.',
                'Érintő (e): pontosan 1 közös pontja van a körrel, és e ⊥ r az érintési pontban!'
              ]}
            />
          </div>

          <TheoryCallout
            title="Aranyszabály az érintőről"
            variant="tip"
            icon={<Lightbulb className="w-5 h-5 text-amber-600" />}
          >
            A kör bármely pontjába húzott <strong>érintő egyenes merőleges</strong> az adott pontba húzott sugárra: <code className="font-bold text-amber-700 dark:text-amber-300">e ⊥ r</code>. Ez a szerkesztési feladatok és a derékszögű háromszögek egyik legfontosabb kiindulópontja.
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 2. FEJEZET: EGYBEVÁGÓSÁG ÉS A TENGELYES TÜKRÖZÉS 5 TULAJDONSÁGA
    // =========================================================================
    {
      id: 'reflection-properties',
      title: '2. Egybevágóság és a tengelyes tükrözés 5 alaptulajdonsága',
      icon: <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Két alakzatot <strong>egybevágónak</strong> nevezünk (<MathText text="F_1 \cong F_2" />), ha alakjuk és méretük megegyezik, azaz egybevágósági transzformációval egymásba vihetők. A tengelyes tükrözés a legalapvetőbb síkbeli egybevágóság.
          </p>

          <TheoryTable
            headers={['Tulajdonság', 'Mit jelent a gyakorlatban?', 'Matematikai jelölés']}
            rows={[
              ['1. Távolságtartó', 'Bármely két pont távolsága megegyezik a képeik távolságával.', '|A\'B\'| = |AB|'],
              ['2. Szögtartó', 'Bármely szög nagysága megegyezik a tükörképének nagyságával.', 'α\' = α'],
              ['3. Egyenestartó', 'Egyenes képe egyenes, szakasz képe szakasz, párhuzamosak képe párhuzamos.', 'e\' || f\' ⇔ e || f'],
              ['4. Egybevágóság', 'Minden alakzat képe egybevágó az eredetivel (kerület, terület változatlan).', 'T\' = T, K\' = K'],
              ['5. Orientációváltó', 'A körüljárási irány megfordul (az óramutatóval ellentétesből egyező lesz).', 'ABC ⤹ ⟶ A\'B\'C\' ⤸']
            ]}
          />

          <TheoryTrapBox
            title="Gyakori témazáró csapda: Fixpontok vs. Invariáns alakzatok"
            items={[
              'Fixpont: Olyan pont, amely a tükrözés során önmagába megy át. Tengelyes tükrözésnél KIZÁRÓLAG a tengely pontjai fixpontok (P = P\' ⇔ P ∈ t).',
              'Fix egyenes / Invariáns alakzat: Maga az egyenes mint ponthalmaz önmagába megy át. A tengely pontonként fix, míg a tengelyre MERŐLEGES egyenesek egészében invariánsak (pontjaik helyet cserélnek, de az egyenes ugyanaz marad).'
            ]}
          />
        </div>
      )
    },

    // =========================================================================
    // 3. FEJEZET: MÉRTANI HELYEK ÉS ALAPSZERKESZTÉSEK
    // =========================================================================
    {
      id: 'loci-and-constructions',
      title: '3. Nevezetes mértani helyek és alapszerkesztések',
      icon: <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A <strong>pontok mértani helye</strong> a sík azon pontjainak összessége, amelyek egy vagy több előre meghatározott geometriai tulajdonságnak eleget tesznek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <TheoryCard
              title="Szakaszfelező merőleges (f)"
              badge="Alap mértani hely"
              variant="teal"
              figure={<GeometrySummaryMiniFigure type="perpendicular_bisector" size={70} />}
              properties={[
                'Definíció: Azon pontok halmaza a síkban, amelyek egy szakasz két végpontjától (A és B) egyenlő távolságra vannak: PA = PB.',
                'Szerkesztése: Mindkét végpontból azonos sugarú (r > AB/2) körívekkel metszéspontokat keresünk.',
                'Alkalmazás: Háromszög köré írható körének középpontja az oldalfelező merőlegesek metszéspontja!'
              ]}
            />

            <TheoryCard
              title="Szögfelező félegyenes (f_szög)"
              badge="Alap mértani hely"
              variant="rose"
              figure={<GeometrySummaryMiniFigure type="angle_bisector" size={70} />}
              properties={[
                'Definíció: Azon belső pontok halmaza, amelyek a szög két szárától egyenlő távolságra vannak: d(P, e) = d(P, f).',
                'Két egyenlő félre osztja az adott szöget (α/2 és α/2).',
                'Alkalmazás: Háromszögbe írható körének középpontja a belső szögfelezők metszéspontja!'
              ]}
            />
          </div>

          <TheoryCallout
            title="A 4 klasszikus alapszerkesztés (körző és egyélű vonalzó)"
            variant="info"
            icon={<Ruler className="w-5 h-5 text-blue-600" />}
          >
            <ol className="list-decimal pl-5 space-y-1 mt-1 text-xs sm:text-sm">
              <li><strong>Szakasz másolása és felmérése:</strong> adott pontból körzőnyílással körívet húzunk az egyenesre.</li>
              <li><strong>Szög másolása:</strong> csúcsból körívet húzunk a szárakra, majd a húrhosszt átmásoljuk az új félegyenesre.</li>
              <li><strong>Szakaszfelező merőleges és merőleges állítás:</strong> körívek metszéspontjait összekötő egyenes.</li>
              <li><strong>Szögfelezés:</strong> a szárakon kijelölt azonos távolságú pontokból húzott azonos sugarú körívek metszéspontjának összekötése a csúccsal.</li>
            </ol>
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 4. FEJEZET: TENGELYESEN SZIMMETRIKUS SÍKIDOMOK
    // =========================================================================
    {
      id: 'symmetric-shapes',
      title: '4. Tengelyesen szimmetrikus síkidomok rendszere',
      icon: <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Egy síkidomot <strong>tengelyesen szimmetrikusnak</strong> nevezünk, ha létezik olyan egyenes a síkban, amelyre tükrözve a síkidom önmagába megy át. Ezt az egyenest <strong>szimmetriatengelynek</strong> hívjuk.
          </p>

          <TheoryTable
            headers={['Alakzat', 'Szimmetriatengelyek száma', 'Tengelyek elhelyezkedése', 'Kiemelt tulajdonságok']}
            rows={[
              ['Általános háromszög / trapéz', '0 tengely', 'Nincs szimmetriatengely', 'Oldalak és szögek általában mind különbözőek.'],
              ['Egyenlő szárú háromszög', '1 tengely', 'Alap felezőmerőlegese', '2 szár egyenlő, alapon fekvő 2 szög egyenlő.'],
              ['Szabályos háromszög', '3 tengely', '3 oldalfelező merőleges', 'Minden oldal egyenlő, minden szög 60°.'],
              ['Deltoid', '1 tengely', 'Szimmetriaátló egyenese', '2-2 szomszédos oldal egyenlő, átlói merőlegesek.'],
              ['Húrtrapéz', '1 tengely', 'Alapok közös oldalfelezője', 'Szárai egyenlők, átlói egyenlők, kör írható köré.'],
              ['Rombusz', '2 tengely', 'A két átló egyenese', 'Minden oldal egyenlő, átlói merőlegesen felezik egymást.'],
              ['Téglalap', '2 tengely', 'Szemközti oldalak felezői', 'Minden szöge 90°, átlói egyenlő hosszúak és felezik egymást.'],
              ['Négyzet', '4 tengely', '2 oldalfelező + 2 átló', 'Szabályos 4-szög: minden oldala és szöge egyenlő, átlói merőlegesek és egyenlők.'],
              ['Szabályos n-szög', 'n tengely', 'Csúcsokon / oldalfelezőkön át', 'Minden oldala és belső szöge egyenlő.'],
              ['Kör', '∞ (végtelen sok)', 'Bármely egyenes az O ponton át', 'Minden átmérője szimmetriatengely.']
            ]}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
            <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900 text-center">
              <GeometrySummaryMiniFigure type="symmetry_axis_isosceles" size={50} className="mx-auto" />
              <div className="font-bold text-xs mt-1 text-amber-900 dark:text-amber-100">Egyenlő szárú</div>
              <div className="text-[10px] text-slate-500">1 tengely</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900 text-center">
              <GeometrySummaryMiniFigure type="symmetry_axis_rhombus" size={50} className="mx-auto" />
              <div className="font-bold text-xs mt-1 text-amber-900 dark:text-amber-100">Rombusz</div>
              <div className="text-[10px] text-slate-500">2 tengely (átlók)</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900 text-center">
              <GeometrySummaryMiniFigure type="symmetry_axis_rectangle" size={50} className="mx-auto" />
              <div className="font-bold text-xs mt-1 text-amber-900 dark:text-amber-100">Téglalap</div>
              <div className="text-[10px] text-slate-500">2 tengely (oldalfelezők)</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl border border-amber-200 dark:border-amber-900 text-center">
              <GeometrySummaryMiniFigure type="symmetry_axis_square" size={50} className="mx-auto" />
              <div className="font-bold text-xs mt-1 text-amber-900 dark:text-amber-100">Négyzet</div>
              <div className="text-[10px] text-slate-500">4 tengely</div>
            </div>
          </div>
        </div>
      )
    },

    // =========================================================================
    // 5. FEJEZET: SZERKESZTÉSI FELADATOK ÉS A 4 FÁZIS
    // =========================================================================
    {
      id: 'construction-steps',
      title: '5. Szerkesztési feladatok: a 4 fázis és a háromszög-egyenlőtlenség',
      icon: <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A szerkesztési feladatok megoldásának szigorú 4 lépéses menete van. A témazáró dolgozatban és a vizsgákon mind a 4 fázis megléte elengedhetetlen a maximális pontszámhoz:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <TheoryCard
              title="1. Vázlat & Elemzés"
              badge="Előkészítés"
              variant="teal"
              figure={<GeometrySummaryMiniFigure type="construction_4steps" size={60} />}
              properties={[
                'Szabadkézi rajz készítése megfelelő betűzéssel.',
                'Az ismert adatok színessel való kiemelése.',
                'Összefüggések és keresett alapháromszögek azonosítása.'
              ]}
            />

            <TheoryCard
              title="2. Szerkesztési terv"
              badge="Logikai leírás"
              variant="blue"
              properties={[
                'A szerkesztés lépéseinek pontos, szöveges vagy szimbólumos lejegyzése.',
                'Melyik pontot mely alakzatok (körívek, félegyenesek) metszéspontjaként kapjuk meg.'
              ]}
            />

            <TheoryCard
              title="3. Pontos szerkesztés"
              badge="Gyakorlati kivitelezés"
              variant="purple"
              properties={[
                'Kizárólag körző és egyélű vonalzó használata ceruzával.',
                'Minden segédvonal és körív világosan látható kell maradjon!'
              ]}
            />

            <TheoryCard
              title="4. Bizonyítás & Diszkusszió"
              badge="Ellenőrzés & Megoldások száma"
              variant="rose"
              figure={<GeometrySummaryMiniFigure type="triangle_inequality_rule" size={60} />}
              properties={[
                'Bizonyítás: Annak igazolása, hogy a kapott alakzat megfelel az adatoknak.',
                'Diszkusszió: Hány megoldás létezik az adatok függvényében? (0, 1 vagy 2 egybevágóság erejéig).'
              ]}
            />
          </div>

          <TheoryCallout
            title="A háromszög-egyenlőtlenség szabálya"
            variant="warning"
            icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
          >
            Bármely háromszög csak akkor szerkeszthető meg valóságosan, ha <strong>a két rövidebb oldal összege szigorúan nagyobb a leghosszabb oldalnál</strong>:
            <div className="text-center font-bold text-base my-1 text-amber-800 dark:text-amber-200">
              a + b &gt; c &nbsp;&nbsp;|&nbsp;&nbsp; a + c &gt; b &nbsp;&nbsp;|&nbsp;&nbsp; b + c &gt; a
            </div>
            Ha <code className="font-bold">a + b &le; c</code>, akkor a körívek nem metszik egymást, a megoldások száma: <strong>0 (nem szerkeszthető)</strong>!
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 6. FEJEZET: TÉMAZÁRÓ ARANYKÖPÉSEK ÉS ÖSSZEFOGLALÓ KISOKOS
    // =========================================================================
    {
      id: 'exam-prep-cheat-sheet',
      title: '6. Témazáró kisokos és vizsgatippek',
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Ezek a legfontosabb képletek, szabályok és összefüggések, amelyek a témazáró dolgozatban a leggyakrabban előfordulnak:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Szögek összege síkidomokban
              </h4>
              <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4">
                <li>Bármely háromszög belső szögeinek összege: <strong>180°</strong> (<MathText text="\alpha + \beta + \gamma = 180^\circ" />).</li>
                <li>Bármely négyszög belső szögeinek összege: <strong>360°</strong>.</li>
                <li>Bármely konvex sokszög külső szögeinek összege: <strong>360°</strong>.</li>
                <li>Egyenes szög: <strong>180°</strong>, teljes szög: <strong>360°</strong>, derékszög: <strong>90°</strong>.</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-100 flex items-center gap-2 text-sm sm:text-base">
                <Compass className="w-5 h-5 text-purple-600" />
                Adatok száma a szerkesztésekhez
              </h4>
              <ul className="text-xs sm:text-sm space-y-1 list-disc pl-4">
                <li>Háromszög egyértelmű meghatározásához: <strong>3 független adat</strong> (ooo, oszo, szosz, d-á-befogó).</li>
                <li>Általános négyszöghöz: <strong>5 független adat</strong>.</li>
                <li>Paralelogrammához / Húrtrapézhoz / Deltoidhoz: <strong>3 adat</strong>.</li>
                <li>Téglalaphoz / Rombuszhoz: <strong>2 adat</strong>.</li>
                <li>Négyzethez / Szabályos háromszöghöz / Körhöz: <strong>1 adat</strong> (oldalhossz, sugár)!</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 dark:from-slate-900 dark:via-amber-950/30 dark:to-slate-800 border border-amber-300 dark:border-amber-700 text-center space-y-2">
            <h4 className="font-bold text-amber-900 dark:text-amber-100 text-base flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />
              Készen állsz az átfogó Geometria Kvízre?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Teszteld a tudásodat a 30-30-30 kérdéses szintfelmérőben (összesen 90 feladat), próbáld ki a párosító és csoportosító játékokat, és szerezd meg a mesteri minősítést!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Geometria és Szimmetria Összefoglalás"
      badge="📐 6. Osztály • III. Geometria • 11. Fejezet"
      topicId="g6-geometry-summary-theory"
      pdfFileName="geometria-szimmetria-osszefoglalas-6-osztaly.pdf"
      themeColor="amber"
      quickRule={{
        label: 'A fejezet kulcsszabálya',
        formula: 'Tengelyes tükrözés: egybevágó, távolságtartó, orientációváltó | Háromszög: a+b > c, α+β+γ = 180°'
      }}
      sections={sections}
      interactiveExplorer={<InteractiveGeometrySummaryWorkbench />}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
