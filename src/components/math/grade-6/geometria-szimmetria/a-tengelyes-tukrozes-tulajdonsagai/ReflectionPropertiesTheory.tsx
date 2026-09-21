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
  PropertiesOverviewDiagram,
  InvarianceProofDiagram,
  FixedElementsDiagram,
  DoubleReflectionParallelDiagram,
  DoubleReflectionIntersectingDiagram,
  InteractiveInvarianceExplorer
} from './ReflectionPropertiesDiagrams';
import { MathText } from '@/components/math/shared/MathText';
import {
  Sparkles,
  Layers,
  ArrowRightLeft,
  Compass,
  CheckCircle2,
  AlertTriangle,
  MoveRight,
  Target,
  Clock,
  RotateCcw,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

export interface ReflectionPropertiesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function ReflectionPropertiesTheory({ onBack, onStartQuiz }: ReflectionPropertiesTheoryProps) {
  const sections: TheorySectionData[] = [
    // =========================================================================
    // 1. FEJEZET: TÁVOLSÁGTARTÁS, SZÖGTARTÁS ÉS EGYBEVÁGÓSÁG
    // =========================================================================
    {
      id: 'isometry',
      title: '1. Távolságtartás, szögtartás és egybevágóság (Izometria)',
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A tengelyes tükrözés a sík egyik legfontosabb <strong>egybevágósági transzformációja (izometriája)</strong>. Ez azt jelenti, hogy a sík bármely két pontjának távolsága a tükrözés után pontosan megegyezik a képpontok távolságával:
          </p>

          <TheoryCallout
            title="Távolságtartás (Hossztartás) alaptétele"
            variant="amber"
          >
            <div className="space-y-2">
              <p>
                Ha a sík tetszőleges <MathText>A</MathText> és <MathText>B</MathText> pontjának tükörképe <MathText>A'</MathText> és <MathText>B'</MathText>, akkor:
              </p>
              <div className="p-2.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/50 text-center font-black text-base text-amber-900 dark:text-amber-200">
                <MathText>{"|A'B'| = |AB|"}</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Bármely szakasz tengelyes tükörképe egy vele pontosan egyenlő hosszúságú szakasz.
              </p>
            </div>
          </TheoryCallout>

          <InvarianceProofDiagram />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
            <TheoryCard title="Szögtartás" variant="amber">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bármely szög nagysága a tükrözés során változatlan marad: <MathText>{"\\alpha' = \\alpha"}</MathText>. Derékszög tükörképe derékszög.
              </p>
            </TheoryCard>

            <TheoryCard title="Területtartás" variant="emerald">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mivel a méretek és szögek nem változnak, bármely síkidom területe és kerülete megegyezik a tükörképével: <MathText>{"T' = T"}</MathText>, <MathText>{"K' = K"}</MathText>.
              </p>
            </TheoryCard>

            <TheoryCard title="Egyenestartás & Párhuzamosság" variant="indigo">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Egyenes képe egyenes, szakaszé szakasz. Párhuzamos egyenesek tükörképei is egymással párhuzamosak (<MathText>{"a' \\parallel b'"}</MathText>).
              </p>
            </TheoryCard>
          </div>
        </div>
      )
    },

    // =========================================================================
    // 2. FEJEZET: KÖRÜLJÁRÁSI IRÁNY MEGFORDULÁSA
    // =========================================================================
    {
      id: 'orientation',
      title: '2. A körüljárási irány megfordulása (Másodfajú egybevágóság)',
      icon: <RotateCcw className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Bár a tengelyes tükrözés minden távolságot és szöget megtart, van egy alapvető tulajdonsága, amelyben különbözik az <em>eltolástól</em> és az <em>elforgatástól</em>: <strong>megfordítja a sík orientációját (körüljárási irányát)</strong>.
          </p>

          <TheoryCallout
            title="Körüljárási irány (Orientáció) szabálya"
            variant="rose"
          >
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                Ha az <MathText>ABC</MathText> háromszög csúcsainak körüljárási iránya az óramutató járásával <strong>ellentétes (pozitív, +)</strong>, akkor az <MathText>A'B'C'</MathText> tükörkép csúcsainak körüljárási iránya az óramutató járásával <strong>megegyező (negatív, −)</strong> lesz.
              </p>
              <div className="p-2 rounded-lg bg-rose-100/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-bold">
                💡 <strong>Másodfajú egybevágóság:</strong> Az alakzat a síkon belül sima forgatással nem csúsztatható át a tükörképére anélkül, hogy kiemelnénk a 3D térbe és átfordítanánk!
              </div>
            </div>
          </TheoryCallout>

          <PropertiesOverviewDiagram />

          <TheoryTrapBox
            title="Gyakori tévedés: Fedésbe hozható-e a tükörkép a síkban forgatással?"
            wrong="A tükörkép és az eredeti háromszög egymásra forgatható a síkban, mint az eltolásnál."
            correct="A tükörkép síkbeli forgatással NEM hozható fedésbe az eredetivel a körüljárási irány megfordulása miatt (jobb kéz ↔ bal kéz analógia)."
            explanation="Csak akkor fednék egymást a síkban, ha az alakzatnak eleve van saját szimmetriatengelye."
          />
        </div>
      )
    },

    // =========================================================================
    // 3. FEJEZET: FIX ELEMEK (FIXPONTOK ÉS FIXEGYENESEK)
    // =========================================================================
    {
      id: 'fixed-elements',
      title: '3. Fix elemek: Fixpontok és fixegyenesek',
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Egy geometriai transzformáció során kulcsfontosságú megvizsgálni, hogy mely pontok és vonalak maradnak a helyükön. Ezeket nevezzük <strong>fix elemeknek (invariánsoknak)</strong>.
          </p>

          <FixedElementsDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            <TheoryCard title="1. Fixpontok (Helyben maradó pontok)" variant="amber">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A tengelyes tükrözés során pontosan a <strong>tükrözési tengely (<MathText>t</MathText>) pontjai fixpontok</strong>:
              </p>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 font-bold text-center text-amber-800 dark:text-amber-300 my-1 text-xs">
                <MathText>{"P \\in t \\iff P' = P"}</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                A tengelyen kívül nincs a síkban semmilyen más fixpont.
              </p>
            </TheoryCard>

            <TheoryCard title="2. Fixegyenesek (Önmagukba képződő vonalak)" variant="indigo">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Egy egyenes akkor fixegyenes, ha a tükörképe mint vonal önmagával esik egybe (<MathText>{"e' = e"}</MathText>):
              </p>
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 font-bold text-center text-indigo-800 dark:text-indigo-300 my-1 text-xs">
                <MathText>{"t \\text{ maga (pontonként fix)} \\quad \\text{és} \\quad m \\perp t \\text{ (globálisan fix)}"}</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                A merőleges <MathText>m</MathText> egyenes pontjai helyet cserélnek, de maga a vonal helyben marad.
              </p>
            </TheoryCard>
          </div>
        </div>
      )
    },

    // =========================================================================
    // 4. FEJEZET: KETTŐS TÜKRÖZÉSEK ÉS TRANSZFORMÁCIÓK ÖSSZETÉTELE
    // =========================================================================
    {
      id: 'double-reflections',
      title: '4. Kettős tükrözések és transzformációk összetétele',
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Mi történik, ha egy alakzatot egymás után többször tükrözünk? A tükrözések összetétele a síkgeometria egyik legharmonikusabb törvényszerűsége!
          </p>

          <DoubleReflectionParallelDiagram />
          <DoubleReflectionIntersectingDiagram />

          <TheoryTable
            title="Kettős tükrözések összefoglaló táblázata"
            headers={['Tengelyek viszonya', 'Eredmény transzformáció', 'Körüljárási irány', 'Fixpontok']}
            rows={[
              [
                'Ugyanaz a tengely (t = t)',
                'Identitás (helyben maradás): (P\')\' = P',
                'Változatlan (+)',
                'A sík minden pontja'
              ],
              [
                'Párhuzamos tengelyek (t₁ ∥ t₂)',
                'Párhuzamos eltolás (2·d távolság)',
                'Változatlan (+)',
                'Nincs fixpont a síkban'
              ],
              [
                'Metsző tengelyek (α szög, O pont)',
                'Elforgatás O körül 2·α szöggel',
                'Változatlan (+)',
                'Pontosan 1 fixpont (az O metszéspont)'
              ],
              [
                'Merőleges tengelyek (t₁ ⊥ t₂, 90°)',
                'Középpontos tükrözés (180° forgatás)',
                'Változatlan (+)',
                'Pontosan 1 fixpont (az O metszéspont)'
              ]
            ]}
          />
        </div>
      )
    },

    // =========================================================================
    // 5. FEJEZET: INTERAKTÍV GYAKORLÓ SZIMULÁTOR
    // =========================================================================
    {
      id: 'interactive-simulator',
      title: '5. Interaktív Geometriai Szimulátor',
      icon: <Sparkles className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-4">
          <InteractiveInvarianceExplorer />
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      grade={6}
      chapterId="g6-geometry"
      title="A tengelyes tükrözés tulajdonságai"
      subtitle="Távolságtartás, szögtartás, körüljárási irány megfordulása, fix elemek és kettős tükrözések"
      badge="📐 6. Osztály • III. Geometria • 7. Fejezet"
      themeColor="amber"
      pdfFilename="tengelyes-tukrozes-tulajdonsagai-6-osztaly.pdf"
      quickRule={{
        label: 'Alaptétel',
        formula: '|A\'B\'| = |AB|  és  α\' = α  (egybevágóság)'
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
