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
  InteractiveSymmetricShapesExplorer,
  SymmetricShapesMiniFigure
} from './SymmetricShapesDiagrams';
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
  Maximize2
} from 'lucide-react';

export interface SymmetricShapesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function SymmetricShapesTheory({ onBack, onStartQuiz }: SymmetricShapesTheoryProps) {
  const sections: TheorySectionData[] = [
    // =========================================================================
    // 1. FEJEZET: TENGELYESEN SZIMMETRIKUS HÁROMSZÖGEK
    // =========================================================================
    {
      id: 'symmetric-triangles',
      title: '1. Tengelyesen szimmetrikus háromszögek',
      icon: <Triangle className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A háromszögek csoportosításakor kiemelkedő szerepet játszik a szimmetriájuk. Az általános háromszögnek nincs szimmetriatengelye (0 tengely), míg a szárak és oldalak egyenlősége szimmetriát eredményez.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <TheoryCard
              title="Egyenlő szárú háromszög"
              badge="1 szimmetriatengely"
              variant="rose"
              figure={<SymmetricShapesMiniFigure type="isosceles_triangle" size={75} />}
              properties={[
                { label: 'Oldalak', value: 'a = b (2 egyenlő szár, 1 alap)' },
                { label: 'Szögek', value: 'α = β (alapon fekvő szögek egyenlők)' },
                { label: 'Szimmetriatengely', value: 'Az alaphoz tartozó felezőmerőleges' },
                { label: 'Egybeeső vonalak', value: 'm_c = f_c = f_γ (magasság, oldalfelező és szögfelező)' }
              ]}
              note="A szimmetriatengely a szárszögből indul, és merőlegesen felezi a szemközti alapot."
            />

            <TheoryCard
              title="Szabályos (egyenlő oldalú) háromszög"
              badge="3 szimmetriatengely"
              variant="rose"
              figure={<SymmetricShapesMiniFigure type="equilateral_triangle" size={75} />}
              properties={[
                { label: 'Oldalak', value: 'a = b = c (mindhárom oldal egyenlő)' },
                { label: 'Belső szögek', value: 'α = β = γ = 60°' },
                { label: 'Szimmetriatengelyek', value: 'A 3 oldalfelező merőleges' },
                { label: 'Középpont', value: 'A 3 tengely egyetlen közös pontban metszi egymást' }
              ]}
              note="Minden csúcson átmegy pontosan egy tengely, amely felezi a szemközti oldalt és a csúcsszöget."
            />
          </div>

          <TheoryCallout title="Fontos összefüggés az egyenlő szárú háromszögeknél" variant="rose">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p>
                Egy háromszögben <strong>egyenlő oldalakkal szemben egyenlő szögek</strong> fekszenek, és megfordítva: ha egy háromszögnek két szöge egyenlő, akkor a háromszög szükségszerűen egyenlő szárú, tehát tengelyesen szimmetrikus!
              </p>
              <div className="p-2 rounded-xl bg-rose-100/70 dark:bg-rose-950/50 font-mono text-center font-bold text-rose-900 dark:text-rose-200">
                a = b ⟺ α = β
              </div>
            </div>
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 2. FEJEZET: 1 TENGELYES NÉGYSZÖGEK: DELTOID ÉS HÚRTRAPÉZ
    // =========================================================================
    {
      id: 'one-axis-quadrilaterals',
      title: '2. Egy szimmetriatengellyel rendelkező négyszögek',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Két olyan nevezetes négyszöget tanulunk, amelynek pontosan <strong>1 szimmetriatengelye</strong> van: a <em>deltoidot</em> és a <em>szimmetrikus trapézt (húrtrapézt)</em>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <TheoryCard
              title="Deltoid"
              badge="1 szimmetriatengely (átló)"
              variant="indigo"
              figure={<SymmetricShapesMiniFigure type="deltoid" size={75} />}
              properties={[
                { label: 'Oldalak', value: '2-2 szomszédos oldal egyenlő (a = d, b = c)' },
                { label: 'Tengely', value: 'A szimmetriaátló egyenese (e)' },
                { label: 'Átlók viszonya', value: 'e ⊥ f (merőlegesek), e felezi f-et' },
                { label: 'Szögek', value: '2 szemközti szög egyenlő (β = δ)' }
              ]}
              note="A szimmetriaátló a különböző oldalak találkozási csúcsait köti össze, és felezi a csúcsszögeket."
            />

            <TheoryCard
              title="Szimmetrikus trapéz (Húrtrapéz)"
              badge="1 szimmetriatengely (oldalfelező)"
              variant="indigo"
              figure={<SymmetricShapesMiniFigure type="isosceles_trapezoid" size={75} />}
              properties={[
                { label: 'Párhuzamos alapok', value: 'a || c (nem egyenlő hosszúak)' },
                { label: 'Szárak', value: 'b = d (a két szár egyenlő)' },
                { label: 'Tengely', value: 'A két párhuzamos alap közös felezőmerőlegese' },
                { label: 'Átlók', value: 'e = f (az átlói egyenlő hosszúak!)' },
                { label: 'Szögek', value: 'Az egy-egy alapon fekvő szögek egyenlők (α = β, γ = δ)' }
              ]}
              note="A húrtrapéz köré mindig írható kör (innen a húrtrapéz elnevezés)."
            />
          </div>

          <TheoryTrapBox
            title="Gyakori buktató: A szimmetriaátló vs. oldalfelező tengely"
            explanation="A deltoid szimmetriatengelye egy ÁTLÓ (csúcsokat köt össze), míg a szimmetrikus trapéz szimmetriatengelye OLDALFELEZŐ (a párhuzamos alapok felezőpontjain halad át). A trapéz átlói NEM szimmetriatengelyek!"
          />
        </div>
      )
    },

    // =========================================================================
    // 3. FEJEZET: 2 ÉS 4 TENGELYES NÉGYSZÖGEK: TÉGLALAP, ROMBUSZ, NÉGYZET
    // =========================================================================
    {
      id: 'two-four-axis-quadrilaterals',
      title: '3. Magasabb szimmetriájú négyszögek: Téglalap, Rombusz és Négyzet',
      icon: <Square className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A téglalap és a rombusz 2-2 szimmetriatengellyel bír, míg a négyzet egyesíti mindkettő előnyeit, így 4 szimmetriatengellyel rendelkezik.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
            <TheoryCard
              title="Téglalap"
              badge="2 szimmetriatengely"
              variant="emerald"
              figure={<SymmetricShapesMiniFigure type="rectangle" size={65} />}
              properties={[
                { label: 'Tengelyek', value: 'A 2 szemközti oldalfelező' },
                { label: 'Szögek', value: 'Mind a 4 szöge 90°' },
                { label: 'Átlók', value: 'e = f, felezik egymást' },
                { label: 'Átlók tengelyek?', value: 'NEM! (Csak négyzetnél)' }
              ]}
            />

            <TheoryCard
              title="Rombusz"
              badge="2 szimmetriatengely"
              variant="emerald"
              figure={<SymmetricShapesMiniFigure type="rhombus" size={65} />}
              properties={[
                { label: 'Tengelyek', value: 'A 2 átló egyenese' },
                { label: 'Oldalak', value: 'Mind a 4 oldala egyenlő' },
                { label: 'Átlók', value: 'e ⊥ f, felezik egymást és a szögeket' },
                { label: 'Oldalfelezők?', value: 'NEM tengelyek! (Csak négyzetnél)' }
              ]}
            />

            <TheoryCard
              title="Négyzet"
              badge="4 szimmetriatengely"
              variant="rose"
              figure={<SymmetricShapesMiniFigure type="square" size={65} />}
              properties={[
                { label: 'Tengelyek', value: '2 oldalfelező + 2 átló' },
                { label: 'Oldalak és szögek', value: '4 egyenlő oldal, 4 db 90°' },
                { label: 'Átlók', value: 'e = f, e ⊥ f, felezik egymást' },
                { label: 'Besorolás', value: 'Szabályos 4-szög' }
              ]}
            />
          </div>

          <TheoryTable
            title="Négyszögek szimmetriatulajdonságainak összehasonlító táblázata"
            headers={['Négyszög típusa', 'Tengelyek száma', 'Mely egyenesek a tengelyek?', 'Átlók merőlegessége', 'Átlók egyenlősége']}
            rows={[
              ['Általános négyszög / trapéz', '0 db', 'Nincs szimmetriatengely', 'Általában nem', 'Általában nem'],
              ['Általános paralelogramma', '0 db', 'Nincs tengely (csak középpontos)', 'Nem', 'Nem'],
              ['Deltoid', '1 db', 'A szimmetriaátló egyenese (e)', 'Igen (e ⊥ f)', 'Nem (e ≠ f)'],
              ['Szimmetrikus trapéz', '1 db', 'Alapok közös felezőmerőlegese', 'Nem', 'Igen (e = f)'],
              ['Téglalap', '2 db', '2 szemközti oldalfelező merőleges', 'Nem', 'Igen (e = f)'],
              ['Rombusz', '2 db', 'A 2 átló egyenese', 'Igen (e ⊥ f)', 'Nem (e ≠ f)'],
              ['Négyzet', '4 db', '2 oldalfelező + 2 átló', 'Igen (e ⊥ f)', 'Igen (e = f)']
            ]}
          />
        </div>
      )
    },

    // =========================================================================
    // 4. FEJEZET: SZABÁLYOS SOKSZÖGEK SZIMMETRIÁJA
    // =========================================================================
    {
      id: 'regular-polygons',
      title: '4. Szabályos sokszögek szimmetriája',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Egy sokszöget <strong>szabályosnak</strong> nevezünk, ha minden oldala egyenlő hosszú és minden belső szöge egyenlő nagyságú.
          </p>

          <TheoryCallout title="A szabályos sokszögek aranyszabálya" variant="amber">
            <div className="space-y-2">
              <p className="font-bold text-sm sm:text-base">
                Minden szabályos <MathText>n</MathText>-szögnek pontosan <MathText>n</MathText> darab szimmetriatengelye van!
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-bold text-xs">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60">Szabályos 3-szög: 3 tengely</div>
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60">Négyzet (4-szög): 4 tengely</div>
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60">Szabályos 5-szög: 5 tengely</div>
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60">Szabályos 6-szög: 6 tengely</div>
              </div>
            </div>
          </TheoryCallout>

          <div className="space-y-3 pt-2">
            <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Split className="w-4 h-4 text-rose-500" />
              Páros vs. Páratlan csúcsszámú szabályos sokszögek szerkezete:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-black text-rose-600 dark:text-rose-400">Páratlan csúcsszám (n = 3, 5, 7, 9, ...):</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Mind az <MathText>n</MathText> tengely egy <strong>csúcson</strong> és a <strong>szemközti oldal felezőpontján</strong> halad át. Egyik tengely sem köt össze két csúcsot!
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="font-black text-indigo-600 dark:text-indigo-400">Páros csúcsszám (n = 4, 6, 8, 10, ...):</span>
                <p className="text-slate-600 dark:text-slate-300">
                  A tengelyek két csoportra oszlanak: <MathText>n/2</MathText> db tengely <strong>szemközti csúcsokat</strong> köt össze (főátlók), és <MathText>n/2</MathText> db tengely <strong>szemközti oldalfelezőket</strong> köt össze.
                </p>
              </div>
            </div>
          </div>

          <InteractiveSymmetricShapesExplorer className="my-6" />
        </div>
      )
    },

    // =========================================================================
    // 5. FEJEZET: GONDOLKODTATÓ MINTAPÉLDÁK ÉS GYAKORLÁS
    // =========================================================================
    {
      id: 'worked-examples',
      title: '5. Kidolgozott geometriai mintapéldák levezetéssel',
      icon: <Lightbulb className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
          {/* 1. Mintapélda */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200">
                1. Mintapélda: Egyenlő szárú háromszög szögszámítása
              </span>
              <span className="text-xs font-bold text-slate-400">α = β</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              Egy egyenlő szárú háromszög szárai által bezárt csúcsszöge γ = 40°. Mekkorák az alapon fekvő α és β szögek?
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1 font-sans">
              <div>• A háromszög belső szögeinek összege: <MathText>α + β + γ = 180°</MathText>.</div>
              <div>• Mivel a háromszög egyenlő szárú, az alapon fekvő szögek egyenlők: <MathText>α = β</MathText>.</div>
              <div>• A két alapszög összege: <MathText>2α = 180° - 40° = 140°</MathText>.</div>
              <div className="font-black text-emerald-600 dark:text-emerald-400 pt-1">
                Eredmény: α = β = 140° / 2 = 70°.
              </div>
            </div>
          </div>

          {/* 2. Mintapélda */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">
                2. Mintapélda: Deltoid átlóinak felosztása
              </span>
              <span className="text-xs font-bold text-slate-400">e ⊥ f</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              Egy deltoid átlói e = 12 cm és f = 8 cm hosszúak. Milyen részekre osztja a szimmetriaátló a másik átlót, és mekkora szöget zárnak be egymással?
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1 font-sans">
              <div>• A deltoid szimmetriatengelye a hosszabbik (szimmetria)átló (<MathText>e</MathText>).</div>
              <div>• A szimmetriatengely merőlegesen felezi a rá merőleges szakaszokat, így az <MathText>f</MathText> átlót is: <MathText>{'f/2 = 8\\text{ cm} / 2 = 4\\text{ cm}'}</MathText>.</div>
              <div className="font-black text-emerald-600 dark:text-emerald-400 pt-1">
                Eredmény: A szimmetriaátló két 4 cm-es szakaszra felezi a másik átlót, és pontosan 90°-os szöget zárnak be egymással.
              </div>
            </div>
          </div>

          {/* 3. Mintapélda */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200">
                3. Mintapélda: Szabályos sokszögek tengelyszámának összege
              </span>
              <span className="text-xs font-bold text-slate-400">Σ = n₁ + n₂ + ...</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              Mennyi a szimmetriatengelyek számának összege egy szabályos háromszög, egy négyzet és egy szabályos nyolcszög esetén?
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-1 font-sans">
              <div>• Szabályos 3-szög: 3 szimmetriatengely.</div>
              <div>• Négyzet (szabályos 4-szög): 4 szimmetriatengely.</div>
              <div>• Szabályos 8-szög: 8 szimmetriatengely.</div>
              <div className="font-black text-emerald-600 dark:text-emerald-400 pt-1">
                Eredmény: Összesen 3 + 4 + 8 = 15 darab szimmetriatengely.
              </div>
            </div>
          </div>

          <TheoryCallout title="Aranyszabályok a dolgozathoz" variant="rose">
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Egy háromszög pontosan akkor tengelyesen szimmetrikus, ha legalább 2 oldala egyenlő.</li>
              <li>A téglalapnak és a rombusznak 2-2 tengelye van, de a téglalapé oldalfelező, a rombuszé átló!</li>
              <li>A négyzet 4 tengelye a 2 oldalfelező és a 2 átló.</li>
              <li>Az általános paralelogramma és az általános trapéz NEM tengelyesen szimmetrikus alakzatok (0 tengely).</li>
            </ul>
          </TheoryCallout>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek"
      subtitle="Egyenlő szárú és szabályos háromszögek, deltoid, húrtrapéz, téglalap, rombusz, négyzet és szabályos sokszögek"
      badge="📐 6. Osztály • III. Geometria • 9. Fejezet"
      topicId="g6-symmetric-shapes-theory"
      themeColor="rose"
      pdfFilename="szimmetrikus-haromszogek-negyszogek-sokszogek-6-osztaly.pdf"
      quickRule={{
        label: 'Nevezetes alakzatok tengelyszámai',
        formula: 'Szabályos n-szög: n db  |  Négyzet: 4  |  Téglalap/Rombusz: 2  |  Deltoid/Húrtrapéz: 1'
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
