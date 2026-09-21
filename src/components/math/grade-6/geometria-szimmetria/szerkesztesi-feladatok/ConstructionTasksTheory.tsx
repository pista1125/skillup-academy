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
  InteractiveConstructionWorkbench,
  ConstructionTasksMiniFigure
} from './ConstructionTasksDiagrams';
import { MathText } from '@/components/math/shared/MathText';
import {
  Compass,
  Triangle,
  Square,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Target,
  Lightbulb,
  ShieldCheck,
  Split,
  Maximize2,
  Pencil,
  Ruler,
  HelpCircle,
  Scissors
} from 'lucide-react';

export interface ConstructionTasksTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function ConstructionTasksTheory({ onBack, onStartQuiz }: ConstructionTasksTheoryProps) {
  const sections: TheorySectionData[] = [
    // =========================================================================
    // 1. FEJEZET: A GEOMETRIAI SZERKESZTÉS 4 LÉPÉSE
    // =========================================================================
    {
      id: 'four-steps',
      title: '1. A geometriai szerkesztés 4 alappillére',
      icon: <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A geometriai szerkesztés nem egyszerű rajzolás: <strong>kizárólag körző és egyélű (beosztás nélküli) vonalzó</strong> használatával, szigorú logikai lépések szerint határozzuk meg a síkidomok csúcspontjait. Minden szerkesztési feladatot az alábbi 4 fázisra bontunk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <TheoryCard
              title="1. Vázlat és elemzés"
              badge="Felkészülés"
              variant="teal"
              figure={<ConstructionTasksMiniFigure type="sketch_analysis" size={70} />}
              properties={[
                { label: 'Cél', value: 'Szabadkézi rajzon átlátni az összefüggéseket' },
                { label: 'Színezés', value: 'Az adott adatokat élénk színnel jelöljük' },
                { label: 'Keresés', value: 'Alapszerkesztések és ismert tulajdonságok felfedezése' }
              ]}
            />
            <TheoryCard
              title="2. Szerkesztési terv (menet)"
              badge="Algoritmus"
              variant="cyan"
              figure={<ConstructionTasksMiniFigure type="compass_straightedge" size={70} />}
              properties={[
                { label: 'Leírás', value: 'Lépésről lépésre megfogalmazott utasítások' },
                { label: 'Jelölések', value: 'k(P, r) körív, e egyenes, P = e ∩ k metszéspont' },
                { label: 'Sorrend', value: 'Először az alapszakasz, majd a csúcsok meghatározása' }
              ]}
            />
            <TheoryCard
              title="3. Pontos szerkesztés"
              badge="Kivitelezés"
              variant="emerald"
              figure={<ConstructionTasksMiniFigure type="triangle_sss" size={70} />}
              properties={[
                { label: 'Eszközök', value: 'Hegyes ceruza, feszes körző, egyenes vonalzó' },
                { label: 'Segédvonalak', value: 'Halvány körívek és egyenesek (nem radírozzuk ki!)' },
                { label: 'Kész alakzat', value: 'Erőteljesen kihúzott fővonalak' }
              ]}
            />
            <TheoryCard
              title="4. Bizonyítás és diszkusszió"
              badge="Ellenőrzés"
              variant="indigo"
              figure={<ConstructionTasksMiniFigure type="triangle_inequality_ok" size={70} />}
              properties={[
                { label: 'Bizonyítás', value: 'Igazoljuk, hogy az alakzat megfelel a feltételeknek' },
                { label: 'Diszkusszió', value: 'Hány megoldás létezik? (0, 1 vagy több nem egybevágó)' },
                { label: 'Feltételek', value: 'Háromszög-egyenlőtlenség, szögek összege' }
              ]}
            />
          </div>

          <TheoryCallout
            title="Fontos szabály a segédvonalakról!"
            type="tip"
            icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
          >
            A körzővel húzott köríveket és segédvonalakat <strong>soha nem szabad kiradírozni</strong>! A szerkesztés lényege éppen a szerkesztési nyomvonalak (körívek metszéspontjai, merőlegesek), amelyek bizonyítják a pontos geometriai levezetést.
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 2. FEJEZET: HÁROMSZÖGEK ALAPSZERKESZTÉSEI
    // =========================================================================
    {
      id: 'triangle-constructions',
      title: '2. Háromszögek alapszerkesztései (Egybevágósági esetek)',
      icon: <Triangle className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A háromszögek szerkesztése az <strong>egybevágósági alapeseteken</strong> nyugszik. Egy háromszög egyértelmű megszerkesztéséhez <strong>3 független adatra</strong> van szükségünk.
          </p>

          <TheoryTable
            headers={['Alapeset', 'Megadott adatok', 'Szerkesztés menete', 'Kulcslépés']}
            rows={[
              [
                <span className="font-bold text-teal-700 dark:text-teal-300">ooo (SSS)</span>,
                '3 oldal: a, b, c',
                '1. c szakasz felmérése AB-re\n2. k₁(A; b) és k₂(B; a) körívezés\n3. C = k₁ ∩ k₂ metszéspont',
                'Két körív metszéspontja adja a 3. csúcsot'
              ],
              [
                <span className="font-bold text-blue-700 dark:text-blue-300">oszo (SAS)</span>,
                '2 oldal és közbezárt szög (pl. b, c, α)',
                '1. c szakasz felmérése AB-re\n2. α szög felmérése A csúcsba\n3. b oldal felmérése a szögszárra (C csúcs)',
                'Szög másolása/felmérése és szakasz kijelölése'
              ],
              [
                <span className="font-bold text-indigo-700 dark:text-indigo-300">szosz (ASA)</span>,
                '1 oldal és rajta fekvő 2 szög (c, α, β)',
                '1. c szakasz felmérése AB-re\n2. α szög felmérése A-ba\n3. β szög felmérése B-be\n4. C = szögszárak metszéspontja',
                'A két félegyenes metszéspontja adja a C csúcsot'
              ],
              [
                <span className="font-bold text-rose-700 dark:text-rose-300">oosz (SsA)</span>,
                '2 oldal és a nagyobbikkal szemközti szög',
                '1. Szög felmérése, egyik szárra a szomszédos oldal\n2. A végpontból körívezés a szemközti oldallal',
                'A körív 1 pontban metszi a másik szögszárat'
              ]
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <ConstructionTasksMiniFigure type="triangle_sss" size={80} className="shrink-0" />
              <div>
                <h4 className="font-bold text-teal-800 dark:text-teal-300 text-sm">ooo szerkesztés (3 oldal)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Körzővel mérjük fel a két szárat a végpontokból. A két körív metszéspontja adja a hiányzó csúcsot.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <ConstructionTasksMiniFigure type="triangle_sas" size={80} className="shrink-0" />
              <div>
                <h4 className="font-bold text-blue-800 dark:text-blue-300 text-sm">oszo szerkesztés (2 oldal, közbezárt szög)</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  A szög csúcsából kiinduló két félegyenesre felmérjük az adott szakaszhosszakat, majd összekötjük a végpontokat.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // =========================================================================
    // 3. FEJEZET: HÁROMSZÖG-EGYENLŐTLENSÉG ÉS DISZKUSSZIÓ
    // =========================================================================
    {
      id: 'triangle-inequality',
      title: '3. A háromszög-egyenlőtlenség és a diszkusszió',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Nem minden adathalmazból lehet háromszöget szerkeszteni! A szerkeszthetőség vizsgálatát <strong>diszkussziónak</strong> nevezzük.
          </p>

          <div className="bg-teal-50 dark:bg-teal-950/40 p-4 rounded-xl border border-teal-200 dark:border-teal-800 space-y-2">
            <h4 className="font-bold text-teal-900 dark:text-teal-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" /> A Háromszög-egyenlőtlenség tétele:
            </h4>
            <p className="text-sm">
              Egy háromszög akkor és csak akkor szerkeszthető meg adott <MathText>{'a, b, c'}</MathText> oldalhosszakkal, ha <strong>bármely két oldal összege nagyobb a harmadik oldalnál</strong>:
            </p>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-teal-200 dark:border-teal-700 text-center font-mono font-bold text-teal-700 dark:text-teal-300 text-base">
              <MathText>{'a + b > c \\quad \\text{és} \\quad a + c > b \\quad \\text{és} \\quad b + c > a'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              💡 <em>Gyakorlati gyorsszabály:</em> Elég ellenőrizni, hogy a <strong>két rövidebb oldal összege nagyobb-e a leghosszabb oldalnál</strong>!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                <ConstructionTasksMiniFigure type="triangle_inequality_ok" size={45} />
                <span>Szerkeszthető eset (a + b &gt; c)</span>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-300">
                Példa: <MathText>{'a = 4\\text{ cm}, b = 5\\text{ cm}, c = 6\\text{ cm}'}</MathText><br />
                <MathText>{'4 + 5 = 9 > 6'}</MathText> ✓ A két körív metszi egymást, <strong>1 megoldás</strong> van.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-300">
                <ConstructionTasksMiniFigure type="triangle_inequality_fail" size={45} />
                <span>Nem szerkeszthető (a + b ≤ c)</span>
              </div>
              <p className="text-xs text-rose-900 dark:text-rose-300">
                Példa: <MathText>{'a = 2\\text{ cm}, b = 3\\text{ cm}, c = 7\\text{ cm}'}</MathText><br />
                <MathText>{'2 + 3 = 5 < 7'}</MathText> ✗ A körívek nem érik el egymást, <strong>0 megoldás</strong> van.
              </p>
            </div>
          </div>

          <TheoryTrapBox title="Gyakori csapda: Belső szögek összege">
            Ha a feladatban szögek vannak megadva (pl. <MathText>{'\\alpha = 110^\\circ, \\beta = 80^\\circ'}</MathText>), ellenőrizd a szögek összegét: <MathText>{'110^\\circ + 80^\\circ = 190^\\circ > 180^\\circ'}</MathText>! Mivel a háromszög belső szögeinek összege pontosan <MathText>{'180^\\circ'}</MathText>, ilyen háromszög <strong>nem létezik</strong>.
          </TheoryTrapBox>
        </div>
      )
    },

    // =========================================================================
    // 4. FEJEZET: TENGELYESEN SZIMMETRIKUS ALAKZATOK SZERKESZTÉSE
    // =========================================================================
    {
      id: 'symmetric-constructions',
      title: '4. Tengelyesen szimmetrikus négyszögek és alakzatok szerkesztése',
      icon: <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A tengelyes szimmetria óriási segítség a szerkesztésben: a szimmetriatengelyek felezik a szakaszokat és merőlegesek rájuk, így kevesebb adatból is egyértelműen felépíthető az alakzat!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <TheoryCard
              title="Egyenlő szárú háromszög"
              badge="Alap és magasság (c, m_c)"
              variant="teal"
              figure={<ConstructionTasksMiniFigure type="isosceles_base_height" size={70} />}
              properties={[
                { label: 'Szimmetria', value: 'A magasságvonal egybeesik a felezőmerőlegessel' },
                { label: 'Menet', value: '1. c alap felmérése, 2. felezőmerőleges szerkesztése, 3. m_c felmérése' },
                { label: 'Eredmény', value: 'A C csúcsból meghúzott szárak automatikusan egyenlők' }
              ]}
            />
            <TheoryCard
              title="Rombusz szerkesztése"
              badge="Két átlóból (e, f)"
              variant="cyan"
              figure={<ConstructionTasksMiniFigure type="rhombus_diagonals" size={70} />}
              properties={[
                { label: 'Szimmetria', value: 'Az átlók merőlegesen felezik egymást' },
                { label: 'Menet', value: '1. e átló felmérése, 2. felezőmerőleges, 3. f/2 és f/2 körívezése fel-le' },
                { label: 'Eredmény', value: 'A 4 csúcs összekötésével 4 egyenlő oldalú rombusz jön létre' }
              ]}
            />
            <TheoryCard
              title="Deltoid szerkesztése"
              badge="Szimmetriaátló és oldalak (e, a, b)"
              variant="emerald"
              figure={<ConstructionTasksMiniFigure type="deltoid_construction" size={70} />}
              properties={[
                { label: 'Szimmetria', value: 'A szimmetriaátló a másik átló felezőmerőlegese' },
                { label: 'Menet', value: '1. e átló felvétele (A, C csúcsok), 2. k(A; a) és k(C; b) körívek alul-felül' },
                { label: 'Eredmény', value: 'A körívek metszéspontjai adják a hiányzó B és D csúcsokat' }
              ]}
            />
            <TheoryCard
              title="Szimmetrikus trapéz (húrtrapéz)"
              badge="Alapok és szár (a, c, b)"
              variant="indigo"
              figure={<ConstructionTasksMiniFigure type="trapezoid_construction" size={70} />}
              properties={[
                { label: 'Szimmetria', value: 'Az alapok közös felezőmerőlegese a szimmetriatengely' },
                { label: 'Menet', value: '1. a alap felmérése, 2. (a-c)/2 segédszakasz levágása, 3. szár körívezése' },
                { label: 'Eredmény', value: 'A fedőlap párhuzamos az alappal, szárak és átlók egyenlők' }
              ]}
            />
          </div>

          <TheoryCallout
            title="Szimmetrikus kiegészítés"
            type="info"
            icon={<Maximize2 className="w-5 h-5 text-teal-600" />}
          >
            Ha egy alakzatnak adott a <strong>szimmetriatengelye (t)</strong> és az egyik fele, a másik felét pontonkénti <strong>tengelyes tükrözéssel</strong> szerkesztjük meg: minden csúcsból merőlegest állítunk a tengelyre, és átmérjük a túloldalra a tengelytől mért távolságot.
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 5. FEJEZET: GYAKORLATI SZERKESZTÉSI MESTERFOGÁSOK ÉS TIPPEK
    // =========================================================================
    {
      id: 'practical-tips',
      title: '5. Gyakorlati szerkesztési mesterfogások és összefoglalás',
      icon: <Pencil className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A pontos szerkesztés kulcsa a megfelelő technika és a tiszta rajzolás:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-800 dark:text-teal-300 text-sm">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Körzőhasználat</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A körző hegyét pontosan a csúcspontba szúrd. Körívezéskor ne a lábakat, hanem a felső fogantyút forgasd egyenletesen!
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-800 dark:text-teal-300 text-sm">
                <Ruler className="w-4 h-4 text-teal-600" />
                <span>Vonalvezetés</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Segédvonalakat vékonyan (2H-s ceruzával), a keresett megoldás éleit vastagabban (HB-s ceruzával) húzd ki.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-teal-800 dark:text-teal-300 text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Adatok száma</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Háromszöghöz: 3 független adat kell.<br />
                Általános négyszöghöz: 5 adat kell.<br />
                Rombuszhoz / Téglalaphoz: 2 adat elegendő!
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-900 dark:to-teal-950/40 border border-teal-200 dark:border-teal-800 text-center space-y-2">
            <h4 className="font-bold text-teal-900 dark:text-teal-100 text-base">
              Készen állsz a szerkesztési feladatok gyakorlására?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Próbáld ki az interaktív műhely lépéseit, teszteld tudásodat a 30 kérdéses kvízben, a párosító és csoportosító játékokban!
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
      title="Szerkesztési feladatok tananyag"
      badge="📐 6. Osztály • III. Geometria • 10. Fejezet"
      topicId="g6-construction-tasks-theory"
      pdfFileName="szerkesztesi-feladatok-6-osztaly.pdf"
      themeColor="teal"
      quickRule={{
        label: 'A szerkesztés 4 alapszabálya',
        formula: '1. Vázlat & adatok | 2. Terv | 3. Körző-vonalzó szerkesztés | 4. Diszkusszió (a+b > c)'
      }}
      sections={sections}
      interactiveExplorer={<InteractiveConstructionWorkbench />}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
