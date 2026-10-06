import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  ArrowRightLeft,
  Award,
  BarChart,
  BarChart3,
  Binary,
  Blocks,
  BookOpen,
  Box,
  Boxes,
  Brain,
  Calculator,
  CheckCircle2,
  Circle,
  Clock,
  Coins,
  Compass,
  Dice5,
  Dices,
  Eye,
  FileText,
  FlaskConical,
  Gamepad2,
  GitCompare,
  Globe,
  HelpCircle,
  Layers,
  LineChart,
  Maximize2,
  Minimize2,
  MonitorPlay,
  MoveHorizontal,
  Network,
  Pencil,
  Percent,
  PieChart,
  RefreshCw,
  Ruler,
  Scale,
  Scissors,
  Search,
  Section,
  Shapes,
  Share2,
  Sparkle,
  Sparkles,
  Split,
  Square,
  Target,
  Timer,
  TrendingUp,
  Triangle,
  Trophy,
  Users,
  Variable,
  Zap
} from 'lucide-react';

import { useQuizProgress } from '@/hooks/useQuizProgress';

export const Grade8View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  const { getTopicProgress } = useQuizProgress();

    if (topicId === 'g8-numbers-letters') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Logika feladatok */}
          {(showAll || activeSubSectionId === 'g8-sec-logika') && (
            <section>
              <SectionHeader id="g8-sec-logika" number={1} title="Logika feladatok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Logikai feladatok"
                  subtitle="Állítások, tagadás, műveletek, Skatulya-elv"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-logic-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => onActivitySelect('g8-logic-quiz', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-logic')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Mit tudunk a halmazokról? */}
          {(showAll || activeSubSectionId === 'g8-sec-halmazok-alap') && (
            <section>
              <SectionHeader id="g8-sec-halmazok-alap" number={2} title="Mit tudunk a halmazokról?" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Halmazok Alapjai"
                  subtitle="Jelölések, üres halmaz, 2ⁿ részhalmaz"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-set-basics-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-set-basics-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g8-set-basics')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Műveletek halmazokkal */}
          {(showAll || activeSubSectionId === 'g8-sec-halmaz-muveletek') && (
            <section>
              <SectionHeader id="g8-sec-halmaz-muveletek" number={3} title="Műveletek halmazokkal" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Halmazműveletek"
                  subtitle="Metszet, unió, különbség, Szita-formula"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-set-operations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-set-operations-quiz', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-set-operations')}
                />
              </div>
            </section>
          )}

          {/* Section 4: A racionális számok halmaza */}
          {(showAll || activeSubSectionId === 'g8-sec-racionalis-halmaz') && (
            <section>
              <SectionHeader id="g8-sec-racionalis-halmaz" number={4} title="A racionális számok halmaza" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A racionális számok halmaza"
                  subtitle="Hierarchia (ℕ ⊂ ℤ ⊂ ℚ), törtek, szakaszos tizedestörtek"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-rational-set-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-rational-set-quiz', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g8-rational-set')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Mit tudunk a racionális számokról? */}
          {(showAll || activeSubSectionId === 'g8-sec-racionalis-muvelet') && (
            <section>
              <SectionHeader id="g8-sec-racionalis-muvelet" number={5} title="Mit tudunk a racionális számokról?" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mit tudunk a racionális számokról?"
                  subtitle="Azonosságok, előjelszabályok, műveleti sorrend, trükkök"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-rational-operations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-rational-operations-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g8-rational-operations')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Hatványozás */}
          {(showAll || activeSubSectionId === 'g8-sec-hatvanyozas') && (
            <section>
              <SectionHeader id="g8-sec-hatvanyozas" number={6} title="Hatványozás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hatványozás & Normálalak"
                  subtitle="Azonosságok, 0 és negatív kitevő, normálalak"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-powers-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-powers-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-powers')}
                />
              </div>
            </section>
          )}

          {/* Section 7: A négyzetgyök fogalma */}
          {(showAll || activeSubSectionId === 'g8-sec-negyzetgyok-fogalom') && (
            <section>
              <SectionHeader id="g8-sec-negyzetgyok-fogalom" number={7} title="A négyzetgyök fogalma" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A négyzetgyök fogalma"
                  subtitle="Nemnegativitás, értelmezési tartomány, √(a²) = |a|"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-sqrt-concept-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-sqrt-concept-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g8-sqrt-concept')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Számok négyzetgyöke */}
          {(showAll || activeSubSectionId === 'g8-sec-szamok-negyzetgyoke') && (
            <section>
              <SectionHeader id="g8-sec-szamok-negyzetgyoke" number={8} title="Számok négyzetgyöke" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok négyzetgyöke"
                  subtitle="Azonosságok, kiemelés, bevitel, irracionális számok"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-square-roots-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-square-roots-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g8-square-roots')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Betűs kifejezések (ismétlés) */}
          {(showAll || activeSubSectionId === 'g8-sec-betus-ismetles') && (
            <section>
              <SectionHeader id="g8-sec-betus-ismetles" number={9} title="Betűs kifejezések (ismétlés)" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Betűs kifejezések"
                  subtitle="Együtthatók, egynemű tagok, helyettesítési érték"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-algebra-intro-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-algebra-intro-quiz', topicId)}
                  icon={<Variable className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g8-algebra-intro')}
                />
              </div>
            </section>
          )}

          {/* Section 10: Betűs kifejezések szorzása és a kiemelés */}
          {(showAll || activeSubSectionId === 'g8-sec-betus-szorzas') && (
            <section>
              <SectionHeader id="g8-sec-betus-szorzas" number={10} title="Betűs kifejezések szorzása és a kiemelés" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás & Kiemelés"
                  subtitle="Zárójelbontás, közös tényező kiemelése"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-factoring-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-factoring-quiz', topicId)}
                  icon={<Scissors className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g8-factoring')}
                />
              </div>
            </section>
          )}

          {/* Section 11: Többtagú kifejezések szorzata */}
          {(showAll || activeSubSectionId === 'g8-sec-tobbtagu-szorzat') && (
            <section>
              <SectionHeader id="g8-sec-tobbtagu-szorzat" number={11} title="Többtagú kifejezések szorzata" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Többtagúak szorzata"
                  subtitle="Kéttagú szorzás, 3 nevezetes azonosság"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-polynomial-mult-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-polynomial-mult-quiz', topicId)}
                  icon={<Boxes className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-polynomial-mult')}
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g8-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-osszefoglalas" number={12} title="Összefoglalás" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Fejezeti összefoglaló"
                  subtitle="I. Számok és betűk teljes elméleti áttekintése"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-chapter1-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Témazáró Nagyteszt"
                  subtitle="90 feladat (30-30-30), 3 nehézségi szint"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-chapter1-summary-quiz', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-chapter1-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-geometry') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Egybevágósági transzformációk (ismétlés) */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-egybevagosag') && (
            <section>
              <SectionHeader id="g8-sec-geom-egybevagosag" number={1} title="Egybevágósági transzformációk (ismétlés)" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egybevágósági transzformációk"
                  subtitle="Távolságtartás, koordináták, alapesetek"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-geom-congruence-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-geom-congruence-quiz', topicId)}
                  icon={<RefreshCw className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g8-geom-congruence')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Transzformációk */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-transzformaciok') && (
            <section>
              <SectionHeader id="g8-sec-geom-transzformaciok" number={2} title="Transzformációk" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Transzformációk"
                  subtitle="Invariánsok, fixpontok, leképezések"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-geom-transforms-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🔀"
                  onClick={() => onActivitySelect('g8-geom-transforms-quiz', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g8-geom-transforms')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Használjunk szerkesztőprogramot! */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-szerkesztoprogram') && (
            <section>
              <SectionHeader id="g8-sec-geom-szerkesztoprogram" number={3} title="Használjunk szerkesztőprogramot!" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Dinamikus Geometria"
                  subtitle="Eszközök, kötöttségek, mértani helyek"
                  type="Tananyag"
                  emoji="💻"
                  onClick={() => onActivitySelect('g8-geom-software-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="🛠️"
                  onClick={() => onActivitySelect('g8-geom-software-quiz', topicId)}
                  icon={<MonitorPlay className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g8-geom-software')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Hasonlóság */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-hasonlosag') && (
            <section>
              <SectionHeader id="g8-sec-geom-hasonlosag" number={4} title="Hasonlóság" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hasonlóság"
                  subtitle="k arányszám, alapesetek, területek aránya"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-geom-similarity-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-geom-similarity-quiz', topicId)}
                  icon={<Maximize2 className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g8-geom-similarity')}
                />
              </div>
            </section>
          )}

          {/* Section 5: A középpontos hasonlóság */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-kozeppontos') && (
            <section>
              <SectionHeader id="g8-sec-geom-kozeppontos" number={5} title="A középpontos hasonlóság (Kiegészítő tananyag)" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Középpontos Hasonlóság"
                  subtitle="Centrum, λ arányszám, szimulátor"
                  type="Tananyag"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-geom-central-similarity-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-geom-central-similarity-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-geom-central-similarity')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Szerkesztések */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-szerkesztesek') && (
            <section>
              <SectionHeader id="g8-sec-geom-szerkesztesek" number={6} title="Szerkesztések (Kiegészítő tananyag)" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai Szerkesztések"
                  subtitle="Szakaszosztás, arányok, szimulátor"
                  type="Tananyag"
                  emoji="🧭"
                  onClick={() => onActivitySelect('g8-geom-constructions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat, 3 nehézségi szint"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-geom-constructions-quiz', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-geom-constructions')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g8-sec-geom-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-geom-osszefoglalas" number={7} title="Összefoglalás" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria Összefoglalás"
                  subtitle="II. Fejezet teljes áttekintése, összefüggések"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-geom-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="II. Fejezet Témazáró Kvíz"
                  subtitle="90 feladat (30 szintenként), ábrákkal"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-geom-summary-quiz', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-geom-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-equations') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Egyenletek */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-alap') && (
            <section>
              <SectionHeader id="g8-sec-eq-alap" number={1} title="Egyenletek" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenletek Tananyag"
                  subtitle="Mérlegelv, lépések, szabályok és levezetések"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-basic-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g8-eq-basic', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g8-eq-basic')}
                />
                <ActivityPlaceholder
                  title="Mérlegelv Gyakorló"
                  subtitle="Vizuális egyenletmegoldás két karral"
                  type="Gyakorló"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g8-equation-balance', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Egyenletmegoldó eszköz"
                  subtitle="Lépésről lépésre levezetés"
                  type="Eszköz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('equation-solver', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Szöveges feladatok számokról, életkorokról */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-szamok-kor') && (
            <section>
              <SectionHeader id="g8-sec-eq-szamok-kor" number={2} title="Szöveges feladatok számokról, életkorokról" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok és Életkorok Tananyag"
                  subtitle="Helyiérték, 10a+b, arányok és életkori táblázatok"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-numbers-ages-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="👥"
                  onClick={() => onActivitySelect('g8-eq-numbers-ages', topicId)}
                  icon={<Users className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g8-eq-numbers-ages')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Szöveges feladatok összekeverésről */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-keveres') && (
            <section>
              <SectionHeader id="g8-sec-eq-keveres" number={3} title="Szöveges feladatok összekeverésről" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Keverési Feladatok Tananyag"
                  subtitle="Megmaradás, tömegszázalék, hígítás és karát"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-mixing-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('g8-eq-mixing', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g8-eq-mixing')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Szöveges feladatok mozgásról, munkáról */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-mozgas-munka') && (
            <section>
              <SectionHeader id="g8-sec-eq-mozgas-munka" number={4} title="Szöveges feladatok mozgásról, munkáról" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mozgás és Munka Tananyag"
                  subtitle="s = v · t, találkozás, utolérés és együttes munka"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-motion-work-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="⏱️"
                  onClick={() => onActivitySelect('g8-eq-motion-work', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g8-eq-motion-work')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Szöveges geometriai feladatok */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-geometria') && (
            <section>
              <SectionHeader id="g8-sec-eq-geometria" number={5} title="Szöveges geometriai feladatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai Tananyag"
                  subtitle="Szögek, kerület, terület, sokszögek és interaktív labor"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-geometry-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-eq-geometry', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g8-eq-geometry')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Vegyes feladatok */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-vegyes') && (
            <section>
              <SectionHeader id="g8-sec-eq-vegyes" number={6} title="Vegyes feladatok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Vegyes Feladatok Tananyag"
                  subtitle="Fejek és lábak, padok, jegyárak és egyenletrendszerek laborral"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-mixed-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => onActivitySelect('g8-eq-mixed', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g8-eq-mixed')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Pénzügyi feladatok */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-penzugy') && (
            <section>
              <SectionHeader id="g8-sec-eq-penzugy" number={7} title="Pénzügyi feladatok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pénzügyi Feladatok Tananyag"
                  subtitle="Árváltozás szimulátor, kamatszámítás és megtakarítási modellek"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-financial-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => onActivitySelect('g8-eq-financial', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-eq-financial')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g8-sec-eq-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-eq-osszefoglalas" number={8} title="Összefoglalás" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="III. Fejezet Összefoglaló Tananyag"
                  subtitle="A 7 fő feladattípus modellkatalógusa és mérlegelv labor"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-eq-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="III. Fejezet Témazáró Kvíz"
                  subtitle="90 feladat 3 szinten (szintenként 30 kérdés!), párosító és csoportosító játékkal"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-eq-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-eq-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-pythagoras') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Szerkesztések, mérések */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-szerkesztes') && (
            <section>
              <SectionHeader id="g8-sec-pyth-szerkesztes" number={1} title="Szerkesztések, mérések" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szerkesztések & Mérések Tananyag"
                  subtitle="Derékszögű háromszög, Thálész-tétel, területek mérése"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-pyth-constructions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g8-pyth-constructions', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-pyth-constructions')}
                />
              </div>
            </section>
          )}

          {/* Section 2: A Pitagorasz-tétel */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-tetel') && (
            <section>
              <SectionHeader id="g8-sec-pyth-tetel" number={2} title="A Pitagorasz-tétel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A Pitagorasz-tétel Tananyag"
                  subtitle="Geometriai bizonyítás, területi modellek, számítások"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-pyth-theorem-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-pyth-theorem', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g8-pyth-theorem')}
                />
              </div>
            </section>
          )}

          {/* Section 3: A Pitagorasz-tétel megfordítása */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-megforditas') && (
            <section>
              <SectionHeader id="g8-sec-pyth-megforditas" number={3} title="A Pitagorasz-tétel megfordítása" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A Megfordítás Tananyag"
                  subtitle="Derékszögűség vizsgálata, egyiptomi zsinór, számhármasok"
                  type="Tananyag"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-pyth-converse-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="yellow"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-pyth-converse', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="yellow"
                  {...getTopicProgress('g8-pyth-converse')}
                />
              </div>
            </section>
          )}

          {/* Section 4: A Pitagorasz-tétel alkalmazása */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-alkalmazas') && (
            <section>
              <SectionHeader id="g8-sec-pyth-alkalmazas" number={4} title="A Pitagorasz-tétel alkalmazása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alkalmazások Tananyag"
                  subtitle="Négyzet, téglalap, háromszögek, rombusz, trapéz, kör"
                  type="Tananyag"
                  emoji="🔷"
                  onClick={() => onActivitySelect('g8-pyth-applications-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔷"
                  onClick={() => onActivitySelect('g8-pyth-applications', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g8-pyth-applications')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Számológép & Projektmunka */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-szamologep') && (
            <section>
              <SectionHeader id="g8-sec-pyth-szamologep" number={5} title="Számológép és Projektmunka" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számológép & Projekt Tananyag"
                  subtitle="Számológép használat, Theodórosz-spirál, becslés és modellezés"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-pyth-calculator-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('g8-pyth-calculator', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g8-pyth-calculator')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Nevezetes derékszögű háromszögek */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-nevezetes') && (
            <section>
              <SectionHeader id="g8-sec-pyth-nevezetes" number={6} title="Nevezetes derékszögű háromszögek" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nevezetes Háromszögek Tananyag"
                  subtitle="45°-45°-90° (négyzet) és 30°-60°-90° (félszabályos) laborral"
                  type="Tananyag"
                  emoji="💡"
                  onClick={() => onActivitySelect('g8-pyth-special-triangles-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-pyth-special-triangles', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-pyth-special-triangles')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g8-sec-pyth-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-pyth-osszefoglalas" number={7} title="Összefoglalás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="V. Fejezet Összefoglaló Tananyag"
                  subtitle="Átfogó elmélet, 2D/3D interaktív laborok, képletkatalógus és típushibák"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g8-pyth-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="V. Fejezet Témazáró Kvíz"
                  subtitle="90 feladat 3 szinten (szintenként 30 kérdés!), párosító és csoportosító játékkal"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-pyth-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-pyth-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-functions-probability-sequences') {
      const showAll = !activeSubSectionId || activeSubSectionId === 'all';
      return (
        <div className="space-y-12">
          {/* Section 1: Egyenes arányosság */}
          {(showAll || activeSubSectionId === 'g8-sec-func-egyenes') && (
            <section>
              <SectionHeader id="g8-sec-func-egyenes" number={1} title="Egyenes arányosság" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenes Arányosság Tananyag"
                  subtitle="y = k · x, arányossági tényező, labor és grafikon"
                  type="Tananyag"
                  emoji="📈"
                  onClick={() => onActivitySelect('g8-func-direct-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-direct', topicId)}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g8-func-direct')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Hozzárendelések és grafikonjaik */}
          {(showAll || activeSubSectionId === 'g8-sec-func-grafikonok') && (
            <section>
              <SectionHeader id="g8-sec-func-grafikonok" number={2} title="Hozzárendelések és grafikonjaik" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hozzárendelések és Grafikonjaik Tananyag"
                  subtitle="f(x) = ax + b, meredekség, zérushely, labor és nevezetes görbék"
                  type="Tananyag"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-func-graphs-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-graphs', topicId)}
                  icon={<LineChart className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g8-func-graphs')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Fordított arányosság */}
          {(showAll || activeSubSectionId === 'g8-sec-func-forditott') && (
            <section>
              <SectionHeader id="g8-sec-func-forditott" number={3} title="Fordított arányosság" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Fordított Arányosság Tananyag"
                  subtitle="x · y = k, hiperbola görbe, aszimptoták és interaktív labor"
                  type="Tananyag"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-func-inverse-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-inverse', topicId)}
                  icon={<LineChart className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-func-inverse')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Olvassunk a grafikonról! */}
          {(showAll || activeSubSectionId === 'g8-sec-func-olvasas') && (
            <section>
              <SectionHeader id="g8-sec-func-olvasas" number={4} title="Olvassunk a grafikonról!" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Olvassunk a Grafikonról Tananyag"
                  subtitle="Menetdiagramok, tengelyek, leolvasási stratégiák, sebesség és interaktív túralabor"
                  type="Tananyag"
                  emoji="📈"
                  onClick={() => onActivitySelect('g8-func-reading-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-reading', topicId)}
                  icon={<LineChart className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g8-func-reading')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Készítsünk grafikont! */}
          {(showAll || activeSubSectionId === 'g8-sec-func-rajzolas') && (
            <section>
              <SectionHeader id="g8-sec-func-rajzolas" number={5} title="Készítsünk grafikont!" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Készítsünk Grafikont Tananyag"
                  subtitle="Értéktáblázat, lépésháromszög technika, tengelyek skálázása és interaktív labor"
                  type="Tananyag"
                  emoji="📈"
                  onClick={() => onActivitySelect('g8-func-plotting-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-plotting', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g8-func-plotting')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Gyakoriság, relatív gyakoriság, átlag */}
          {(showAll || activeSubSectionId === 'g8-sec-func-gyakorisag') && (
            <section>
              <SectionHeader id="g8-sec-func-gyakorisag" number={6} title="Gyakoriság, relatív gyakoriság, átlag" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakoriság & Átlag Tananyag"
                  subtitle="Mintanagyság, gyakoriságok, középértékek (átlag, módusz, medián), terjedelem és labor"
                  type="Tananyag"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-func-frequency-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-frequency', topicId)}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g8-func-frequency')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Játék */}
          {(showAll || activeSubSectionId === 'g8-sec-func-jatek') && (
            <section>
              <SectionHeader id="g8-sec-func-jatek" number={7} title="Játék" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Játék Tananyag"
                  subtitle="Logikai játékok, nyerő stratégiák, Nim-játék, kocka- és érme-esélyek, Fair Play"
                  type="Tananyag"
                  emoji="♟️"
                  onClick={() => onActivitySelect('g8-func-game-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-game', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-func-game')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Valószínűség */}
          {(showAll || activeSubSectionId === 'g8-sec-func-valoszinuseg') && (
            <section>
              <SectionHeader id="g8-sec-func-valoszinuseg" number={8} title="Valószínűség" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Klasszikus Valószínűség"
                  subtitle="Véletlen kísérlet, eseménytér, P = k/n, biztos és lehetetlen esemény, nagy számok törvénye"
                  type="Tananyag"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g8-func-prob-basics-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-prob-basics', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-func-prob-basics')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Valószínűségszámítási feladatok */}
          {(showAll || activeSubSectionId === 'g8-sec-func-feladatok') && (
            <section>
              <SectionHeader id="g8-sec-func-feladatok" number={9} title="Valószínűségszámítási feladatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett Feladatok"
                  subtitle="Két kocka 36 esete, fa-diagramok, visszatevéses és visszatevés nélküli mintavétel"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g8-func-prob-problems-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-prob-problems', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g8-func-prob-problems')}
                />
              </div>
            </section>
          )}

          {/* Section 10: Keressünk összefüggéseket! */}
          {(showAll || activeSubSectionId === 'g8-sec-func-mintazat') && (
            <section>
              <SectionHeader id="g8-sec-func-mintazat" number={10} title="Keressünk összefüggéseket!" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefüggések és Mintázatok"
                  subtitle="Gyufaszálak, háromszögszámok, kézfogások, sokszögek átlói és szabálykeresés"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g8-func-patterns-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-patterns', topicId)}
                  icon={<Search className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-func-patterns')}
                />
              </div>
            </section>
          )}

          {/* Section 11: Sorozatok */}
          {(showAll || activeSubSectionId === 'g8-sec-func-sorozatok') && (
            <section>
              <SectionHeader id="g8-sec-func-sorozatok" number={11} title="Sorozatok" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számsorozatok Alapjai"
                  subtitle="Függvényként értelmezett sorozatok, számtani és mértani sorozat, rekurzív és explicit képletek, Fibonacci"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g8-func-sequences-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-sequences', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g8-func-sequences')}
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g8-sec-func-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-func-osszefoglalas" number={12} title="Összefoglalás" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="VI. Fejezet Összefoglaló Tananyag"
                  subtitle="Átfogó fejezeti tudástár, képletek és interaktív labor"
                  type="Tananyag"
                  emoji="📘"
                  onClick={() => onActivitySelect('g8-func-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="VI. Fejezet Témazáró Kvíz"
                  subtitle="90 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-func-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g8-func-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-solids') {
      const showAll = !activeSubSectionId || activeSubSectionId === 'all';
      return (
        <div className="space-y-12">
          {/* Section 1: Mit tanultunk eddig? (ismétlés) */}
          {(showAll || activeSubSectionId === 'g8-sec-solids-ismetles') && (
            <section>
              <SectionHeader id="g8-sec-solids-ismetles" number={1} title="Mit tanultunk eddig? (ismétlés)" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térgeometriai Ismétlés Tananyag"
                  subtitle="Mértékegységek, kocka, téglatest, hasábok és forgáshenger laborral"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-solids-review-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-solids-review', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-solids-review')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Gúlák */}
          {(showAll || activeSubSectionId === 'g8-sec-solids-gulak') && (
            <section>
              <SectionHeader id="g8-sec-solids-gulak" number={2} title="Gúlák" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gúlák Geometriája Tananyag"
                  subtitle="Fogalmak, szabályos gúlák, Pitagorasz-kapcsolatok, hálók és Euler-tétel"
                  type="Tananyag"
                  emoji="🔺"
                  onClick={() => onActivitySelect('g8-solids-pyramids-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-solids-pyramids', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g8-solids-pyramids')}
                />
              </div>
            </section>
          )}

          {/* Section 3: A gúla felszíne és térfogata */}
          {(showAll || activeSubSectionId === 'g8-sec-solids-gula-szamitas') && (
            <section>
              <SectionHeader id="g8-sec-solids-gula-szamitas" number={3} title="A gúla felszíne és térfogata (Kiegészítő tananyag)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gúla Felszín és Térfogat Tananyag"
                  subtitle="Képletek, interaktív számolólabor, Pitagorasz-tétel alkalmazása és levezetések"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-solids-pyramids-calc-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-solids-pyramids-calc', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g8-solids-pyramids-calc')}
                />
              </div>
            </section>
          )}

          {/* Section 4: A gömb */}
          {(showAll || activeSubSectionId === 'g8-sec-solids-gomb') && (
            <section>
              <SectionHeader id="g8-sec-solids-gomb" number={4} title="A gömb" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A Gömb Geometriája Tananyag"
                  subtitle="Gömbfelület, főkör, síkmetszetek, A = 4πr², V = (4/3)πr³ és félgömb laborral"
                  type="Tananyag"
                  emoji="⚪"
                  onClick={() => onActivitySelect('g8-solids-sphere-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-solids-sphere', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g8-solids-sphere')}
                />
              </div>
            </section>
          )}

          {/* Section 5: A Föld */}
          {(showAll || activeSubSectionId === 'g8-sec-solids-fold') && (
            <section>
              <SectionHeader id="g8-sec-solids-fold" number={5} title="A Föld" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A Föld Geometriája Tananyag"
                  subtitle="A Föld mint gömb, R ≈ 6370 km, Egyenlítő, fokhálózat, távolságok és Eratoszthenész"
                  type="Tananyag"
                  emoji="🌍"
                  onClick={() => onActivitySelect('g8-solids-earth-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Gyakorló Kvíz"
                  subtitle="30 feladat 3 szinten, fokhálózat, felszín, térfogat, párosító és csoportosító"
                  type="Kvíz"
                  emoji="🌐"
                  onClick={() => onActivitySelect('g8-solids-earth', topicId)}
                  icon={<Globe className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g8-solids-earth')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g8-sec-solids-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-solids-osszefoglalas" number={6} title="Összefoglalás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Testek Fejezeti Összefoglalás"
                  subtitle="Teljes elmélet, hasábok, gúlák, forgástestek, Föld modell, interaktív méretezési labor"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-solids-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="VII. Fejezet Témazáró Kvíz"
                  subtitle="90 feladat 3 szinten (30 szintenként), hasáb, gúla, henger, kúp, gömb, párosító és csoportosító"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-solids-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g8-solids-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
      </div>
      <MaterialGallery
        grade={8}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade8View;
