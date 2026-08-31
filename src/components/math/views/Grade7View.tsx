import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import { Button } from '@/components/ui/button';
import {
  ArrowRightLeft,
  BarChart,
  BarChart3,
  Binary,
  Blocks,
  BookOpen,
  Box,
  Boxes,
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
  HelpCircle,
  Layers,
  LayoutGrid,
  Lightbulb,
  LineChart,
  Maximize2,
  Minimize2,
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
  Table,
  Target,
  TrendingUp,
  Triangle,
  Trophy,
  Variable,
  Wrench,
  Zap
} from 'lucide-react';

export const Grade7View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
    if (topicId === 'geometry' || topicId === 'g7-other') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onActivitySelect('shape-classification')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
              <Box className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Síkidom vagy Test?</h4>
              <p className="text-[10px] text-slate-500">2D vagy 3D alakzatok</p>
            </div>
          </button>

          <button
            onClick={() => onActivitySelect('angle-matching')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Szögek párosítása</h4>
              <p className="text-[10px] text-slate-500">Szögtípusok felismerése</p>
            </div>
          </button>

          <button
            onClick={() => onActivitySelect('triangle-classification')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
              <Triangle className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Háromszögek</h4>
              <p className="text-[10px] text-slate-500">Csoportosítás tulajdonságok szerint</p>
            </div>
          </button>

          <button
            onClick={() => onActivitySelect('quadrilateral-classification')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-violet-50 rounded-xl text-violet-600 group-hover:scale-110 transition-transform">
              <Square className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Négyszögek</h4>
              <p className="text-[10px] text-slate-500">Négyszögek fajtái</p>
            </div>
          </button>

          <button
            onClick={() => onActivitySelect('line-relationships')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
              <MoveHorizontal className="w-8 h-8 rotate-45" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Egyenesek helyzete</h4>
              <p className="text-[10px] text-slate-500">Párhuzamos, merőleges</p>
            </div>
          </button>

          <button
            onClick={() => onActivitySelect('circle-parts')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-red-50 rounded-xl text-red-600 group-hover:scale-110 transition-transform">
              <Circle className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Kör és részei</h4>
              <p className="text-[10px] text-slate-500">Sugár, átmérő, húr</p>
            </div>
          </button>

          <button
            onClick={() => onActivitySelect('triangle-angles-quiz')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-teal-50 rounded-xl text-teal-600 group-hover:scale-110 transition-transform">
              <Triangle className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Háromszögek szögei</h4>
              <p className="text-[10px] text-slate-500">Belső és külső szögek</p>
            </div>
          </button>
        </div>
      );
    }

    if (topicId === 'g7-geom-trans') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Geometriai fogalmak */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-fogalmak') && (
            <section>
              <SectionHeader id="g7-sec-trans-fogalmak" number={1} title="Geometriai fogalmak" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Hegyesszög, derékszög, tompaszög stb."
                  type="Gyakorlás"
                  emoji="🎯"
                  onClick={() => onActivitySelect('angle-matching', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D geometriai alakzatok"
                  type="Gyakorlás"
                  emoji="📦"
                  onClick={() => onActivitySelect('shape-classification', 'g7-geom-trans')}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Egyenesek helyzete"
                  subtitle="Párhuzamos, merőleges, metsző"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => onActivitySelect('line-relationships', 'g7-geom-trans')}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: Háromszögek nevezetes vonalai */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-haromszog-vonalak') && (
            <section>
              <SectionHeader id="g7-sec-trans-haromszog-vonalak" number={2} title="Háromszögek nevezetes vonalai" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapszerkesztések"
                  subtitle="Körző és vonalzó szerkesztő eszköz"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => onActivitySelect('construction', 'g7-geom-trans')}
                  icon={<Pencil className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Nevezetes vonalak"
                  subtitle="Oldalfelezők, szögfelezők, magasságok és súlyvonalak"
                  type="Hamarosan"
                  emoji="📏"
                  disabled={true}
                  icon={<Triangle className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Háromszögek és négyszögek */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-haromszog-negyszog') && (
            <section>
              <SectionHeader id="g7-sec-trans-haromszog-negyszog" number={3} title="Háromszögek és négyszögek" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek fajtái"
                  subtitle="Oldalak és szögek szerinti csoportosítás"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => onActivitySelect('triangle-classification', 'g7-geom-trans')}
                  icon={<Triangle className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Háromszögek szögei kvíz"
                  subtitle="Belső és külső szögek kiszámítása"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('triangle-angles-quiz', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Négyszögek fajtái"
                  subtitle="Négyszögek tulajdonságai és típusai"
                  type="Gyakorlás"
                  emoji="🟩"
                  onClick={() => onActivitySelect('quadrilateral-classification', 'g7-geom-trans')}
                  icon={<Square className="w-6 h-6" />}
                  color="green"
                />
              </div>
            </section>
          )}

          {/* Section 4: Geometriai transzformációk */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-transzformaciok') && (
            <section>
              <SectionHeader id="g7-sec-trans-transzformaciok" number={4} title="Geometriai transzformációk" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenesek helyzete"
                  subtitle="Transzformációs tengelyek és egyenesek"
                  type="Gyakorlás"
                  emoji="↔️"
                  onClick={() => onActivitySelect('line-relationships', 'g7-geom-trans')}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Transzformációk"
                  subtitle="Egybevágóságok és invariáns tulajdonságok"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<RefreshCw className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Középpontos tükrözés */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-kozeppontos-tukrozes') && (
            <section>
              <SectionHeader id="g7-sec-trans-kozeppontos-tukrozes" number={5} title="Középpontos tükrözés" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükrözés kvíz"
                  subtitle="Alakzatok tükörképeinek felismerése"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('reflection-quiz', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Középpontos tükrözés"
                  subtitle="Pont és alakzat tükrözése, szerkesztés"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 6: A középpontos tükrözés alkalmazása */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-kozeppontos-alkalmazas') && (
            <section>
              <SectionHeader id="g7-sec-trans-kozeppontos-alkalmazas" number={6} title="A középpontos tükrözés alkalmazása" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükrözési alkalmazások"
                  subtitle="Pont és szakasz tükrözése, szimmetria"
                  type="Gyakorlás"
                  emoji="✨"
                  onClick={() => onActivitySelect('symmetry-construction', 'g7-geom-trans')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 7: Szögpárok */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-szogparok') && (
            <section>
              <SectionHeader id="g7-sec-trans-szogparok" number={7} title="Szögpárok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek és Szögpárok"
                  subtitle="Mellékszögek, csúcsszögek, pótszögek felismerése"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => onActivitySelect('angle-matching', 'g7-geom-trans')}
                  icon={<Compass className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Középpontos és tengelyes szimmetria */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-szimmetria') && (
            <section>
              <SectionHeader id="g7-sec-trans-szimmetria" number={8} title="Középpontos és tengelyes szimmetria" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes szimmetria kvíz"
                  subtitle="Szimmetriatengelyek keresése és berajzolása"
                  type="Kvíz"
                  emoji="🦋"
                  onClick={() => onActivitySelect('axial-symmetry-quiz', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Szimmetria a világban"
                  subtitle="Interaktív prezentáció természetbeli példákkal"
                  type="Gyakorlás"
                  emoji="🌟"
                  onClick={() => onActivitySelect('axial-symmetry-presentation', 'g7-geom-trans')}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Tengelyes tükrözés rajzoló"
                  subtitle="Rajzold meg az alakzat pontos tükörképét!"
                  type="Játék"
                  emoji="🪞"
                  onClick={() => onActivitySelect('axial-symmetry', 'g7-geom-trans')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szimmetria hibakereső"
                  subtitle="Keresd meg a hibás tükrözést!"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => onActivitySelect('symmetry-error', 'g7-geom-trans')}
                  icon={<Zap className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 9: Paralelogramma és deltoid */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-paralelogramma-deltoid') && (
            <section>
              <SectionHeader id="g7-sec-trans-paralelogramma-deltoid" number={9} title="Paralelogramma és deltoid" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Paralelogramma és deltoid"
                  subtitle="Négyszögek szimmetriái és tulajdonságai"
                  type="Gyakorlás"
                  emoji="🪁"
                  onClick={() => onActivitySelect('quadrilateral-classification', 'g7-geom-trans')}
                  icon={<LayoutGrid className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 10: Középpontosan szimmetrikus alakzatok */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-kozeppontosan-szimmetrikus') && (
            <section>
              <SectionHeader id="g7-sec-trans-kozeppontosan-szimmetrikus" number={10} title="Középpontosan szimmetrikus alakzatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Középpontos szimmetria"
                  subtitle="Forgásszimmetria és szimmetriaközéppont teszt"
                  type="Kvíz"
                  emoji="💠"
                  onClick={() => onActivitySelect('reflection-quiz', 'g7-geom-trans')}
                  icon={<Boxes className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 11: Szabályos sokszögek */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-szabalyos-sokszogek') && (
            <section>
              <SectionHeader id="g7-sec-trans-szabalyos-sokszogek" number={11} title="Szabályos sokszögek" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek csoportosítása"
                  subtitle="Szabályos n-szögek szögei és szimmetriái"
                  type="Gyakorlás"
                  emoji="🛑"
                  onClick={() => onActivitySelect('shape-classification', 'g7-geom-trans')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 12: A kör */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-kor') && (
            <section>
              <SectionHeader id="g7-sec-trans-kor" number={12} title="A kör" color="red" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A kör és részei"
                  subtitle="Sugár, átmérő, húr, ív, körcikk és körszelet"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => onActivitySelect('circle-parts', 'g7-geom-trans')}
                  icon={<Circle className="w-6 h-6" />}
                  color="red"
                />
              </div>
            </section>
          )}

          {/* Section 13: Szerkesztések */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-szerkesztesek') && (
            <section>
              <SectionHeader id="g7-sec-trans-szerkesztesek" number={13} title="Szerkesztések" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai szerkesztő"
                  subtitle="Körzővel és vonalzóval végzett alapszerkesztések"
                  type="Gyakorlás"
                  emoji="✏️"
                  onClick={() => onActivitySelect('construction', 'g7-geom-trans')}
                  icon={<Pencil className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 14: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-trans-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-trans-osszefoglalas" number={14} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Transzformációk Záróteszt"
                  subtitle="III. Geometriai transzformációk összefoglaló kvíz"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('quiz', 'g7-geom-trans')}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-powers-divisibility') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Nagy számok és a hatványalak */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-nagy-szamok') && (
            <section>
              <SectionHeader id="g7-sec-pow-nagy-szamok" number={1} title="Nagy számok és a hatványalak" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nagy számok és a hatványalak"
                  subtitle="Hatványozás fogalma, 10 hatványai és normálalak"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Hatványok alkalmazása */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-alkalmazas') && (
            <section>
              <SectionHeader id="g7-sec-pow-alkalmazas" number={2} title="Hatványok alkalmazása" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hatványok alkalmazása"
                  subtitle="Hatványozás azonosságai, előjeles számok és törtek hatványai"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Mit tanultunk az oszthatóságról? (Ismétlés) */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-mit-tanultunk-ismetles') && (
            <section>
              <SectionHeader id="g7-sec-pow-mit-tanultunk-ismetles" number={3} title="Mit tanultunk az oszthatóságról? (Ismétlés)" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mit tanultunk az oszthatóságról?"
                  subtitle="Alapvető szabályok (2, 3, 4, 5, 8, 9, 10, 25, 100), összeg és szorzat"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 4: Egy kis logika */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-logika') && (
            <section>
              <SectionHeader id="g7-sec-pow-logika" number={4} title="Egy kis logika" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egy kis logika"
                  subtitle="Logikai következtetések, szükséges és elégséges feltételek"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: A prímszámok. A számok prímtényezős felbontása */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-prim-felbontas') && (
            <section>
              <SectionHeader id="g7-sec-pow-prim-felbontas" number={5} title="A prímszámok. A számok prímtényezős felbontása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Prímszámok és felbontás"
                  subtitle="Számelmélet alaptétele, prímfelbontás és kanonikus alak"
                  type="Hamarosan"
                  emoji="🧱"
                  disabled={true}
                  icon={<Boxes className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Készítsünk magunknak oszthatósági szabályokat! */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-szabaly-keszites') && (
            <section>
              <SectionHeader id="g7-sec-pow-szabaly-keszites" number={6} title="Készítsünk magunknak oszthatósági szabályokat!" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatósági szabályok alkotása"
                  subtitle="Összetett szabályok (6, 12, 15, 18, 36, 45) relatív prímekkel"
                  type="Hamarosan"
                  emoji="🛠️"
                  disabled={true}
                  icon={<Wrench className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: Osztókról, többszörösökről még egyszer */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-osztok-tobbszorosok') && (
            <section>
              <SectionHeader id="g7-sec-pow-osztok-tobbszorosok" number={7} title="Osztókról, többszörösökről még egyszer" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztók és többszörösök"
                  subtitle="Osztópárok, osztók száma és négyzetszámok tulajdonsága"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Table className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 8: Legnagyobb közös osztó */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-lnko') && (
            <section>
              <SectionHeader id="g7-sec-pow-lnko" number={8} title="Legnagyobb közös osztó" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Legnagyobb közös osztó (LNKO)"
                  subtitle="Közös osztók, prímfelbontásos kiszámítás és relatív prímek"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 9: Legkisebb közös többszörös */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-lkkt') && (
            <section>
              <SectionHeader id="g7-sec-pow-lkkt" number={9} title="Legkisebb közös többszörös" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Legkisebb közös többszörös (LKKT)"
                  subtitle="Közös többszörösök, közös nevező és LNKO·LKKT tétel"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 10: Matematikai játékok */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-jatekok') && (
            <section>
              <SectionHeader id="g7-sec-pow-jatekok" number={10} title="Matematikai játékok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matematikai játékok"
                  subtitle="Számelméleti játékok, nyerő stratégiák és paritás"
                  type="Hamarosan"
                  emoji="🎮"
                  disabled={true}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-pow-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-pow-osszefoglalas" number={11} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="IV. Hatványozás, oszthatóság fejezet átfogó rendszerezése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'word-problems') {
      return (
        <div className="flex justify-center py-4">
          <Button
            onClick={() => onActivitySelect('word-problems')}
            className="gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-8"
          >
            <Sparkles className="w-4 h-4" />
            Szöveges feladatok indítása
          </Button>
        </div>
      );
    }

    if (topicId === 'g7-rational-algebra') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Az egész számok tulajdonságainak áttekintése */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-egesz-attekintes') && (
            <section>
              <SectionHeader id="g7-sec-rat-egesz-attekintes" number={1} title="Az egész számok tulajdonságainak áttekintése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egész számok áttekintése"
                  subtitle="Előjelek, abszolútérték, ellentett"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Törtek, tizedes törtek – minden, amit erről tudni kell */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-tortek-tizedes') && (
            <section>
              <SectionHeader id="g7-sec-rat-tortek-tizedes" number={2} title="Törtek, tizedes törtek – minden, amit erről tudni kell" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek és tizedes törtek"
                  subtitle="Bővítés, egyszerűsítés, átváltások"
                  type="Hamarosan"
                  emoji="🍕"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Műveletek a racionális számok halmazán */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-muveletek') && (
            <section>
              <SectionHeader id="g7-sec-rat-muveletek" number={3} title="Műveletek a racionális számok halmazán" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveletek racionális számokkal"
                  subtitle="Alapműveletek, reciprokok, előjelek"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-szoveges') && (
            <section>
              <SectionHeader id="g7-sec-rat-szoveges" number={4} title="Szöveges feladatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok"
                  subtitle="Törtrész- és arányszámítás"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Összetett műveletek, zárójelfelbontás */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-osszetett-zarojel') && (
            <section>
              <SectionHeader id="g7-sec-rat-osszetett-zarojel" number={5} title="Összetett műveletek, zárójelfelbontás" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett műveletek"
                  subtitle="Műveleti sorrend, zárójelszabályok"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: Számok és betűk használata */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-szamok-betuk') && (
            <section>
              <SectionHeader id="g7-sec-rat-szamok-betuk" number={6} title="Számok és betűk használata" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok és betűk használata"
                  subtitle="Változók, algebrai kifejezések"
                  type="Hamarosan"
                  emoji="🔤"
                  disabled={true}
                  icon={<Variable className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összevonás, helyettesítési érték */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-osszevonas-ertek') && (
            <section>
              <SectionHeader id="g7-sec-rat-osszevonas-ertek" number={7} title="Összevonás, helyettesítési érték" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összevonás és behelyettesítés"
                  subtitle="Egynemű tagok, számérték"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Zárójelfelbontás, kiemelés */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-zarojel-kiemeles') && (
            <section>
              <SectionHeader id="g7-sec-rat-zarojel-kiemeles" number={8} title="Zárójelfelbontás, kiemelés" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Zárójelfelbontás, kiemelés"
                  subtitle="Beszorzás és közös tényező kiemelése"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 9: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-rat-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-rat-osszefoglalas" number={9} title="Összefoglalás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="II. Racionális számok és kifejezések ismétlése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-percent-equations' || topicId === 'percentages') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Az arányosságról még egyszer */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-aranyossag') && (
            <section>
              <SectionHeader id="g7-sec-pct-aranyossag" number={1} title="Az arányosságról még egyszer" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az arányosságról még egyszer"
                  subtitle="Egyenes és fordított arányosság, arányos osztás"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Mit tanultunk a százalékszámításról? */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-mit-tanultunk') && (
            <section>
              <SectionHeader id="g7-sec-pct-mit-tanultunk" number={2} title="Mit tanultunk a százalékszámításról?" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékszámítás alapjai"
                  subtitle="Százalék fogalma, alap, százalékláb, százalékérték"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Percent className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 3: A 100% kiszámítása */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-100-szazalek') && (
            <section>
              <SectionHeader id="g7-sec-pct-100-szazalek" number={3} title="A 100% kiszámítása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A 100% kiszámítása"
                  subtitle="Százalékalap meghatározása értékből és lábból"
                  type="Hamarosan"
                  emoji="💯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 4: Hány százalék? */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-hany-szazalek') && (
            <section>
              <SectionHeader id="g7-sec-pct-hany-szazalek" number={4} title="Hány százalék?" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hány százalék?"
                  subtitle="Százalékláb kiszámítása tört és tizedes alakból"
                  type="Hamarosan"
                  emoji="❓"
                  disabled={true}
                  icon={<Percent className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 5: A százalékszámítás gyakorlása */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-gyakorlas') && (
            <section>
              <SectionHeader id="g7-sec-pct-gyakorlas" number={5} title="A százalékszámítás gyakorlása" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékszámítás gyakorlása"
                  subtitle="Százalékos növekedés és csökkenés egylépésben"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 6: Összetett százalékszámítási feladatok */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-osszetett') && (
            <section>
              <SectionHeader id="g7-sec-pct-osszetett" number={6} title="Összetett százalékszámítási feladatok" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett feladatok"
                  subtitle="Egymást követő árváltozások, kamat, keverékek"
                  type="Hamarosan"
                  emoji="🧩"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 7: Szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-szoveges') && (
            <section>
              <SectionHeader id="g7-sec-pct-szoveges" number={7} title="Szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok"
                  subtitle="Gyakorlati problémák modellezése és megoldása"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 8: Egyenletmegoldási módszerek: próbálgatás és lebontogatás */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-egyenlet-modszerek') && (
            <section>
              <SectionHeader id="g7-sec-pct-egyenlet-modszerek" number={8} title="Egyenletmegoldási módszerek: próbálgatás és lebontogatás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Próbálgatás és lebontogatás"
                  subtitle="Alaphalmaz, gyökök, szisztematikus próbálgatás, lebontogatás"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Search className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 9: A mérlegelv */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-merlegelv') && (
            <section>
              <SectionHeader id="g7-sec-pct-merlegelv" number={9} title="A mérlegelv" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A mérlegelv"
                  subtitle="Mérleg modell, ekvivalens átalakítások és ellenőrzés"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 10: Egyenletek megoldása mérlegelvvel */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-egyenletek-merlegelvvel') && (
            <section>
              <SectionHeader id="g7-sec-pct-egyenletek-merlegelvvel" number={10} title="Egyenletek megoldása mérlegelvvel" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenletek mérlegelvvel"
                  subtitle="Zárójelek, törtek eltüntetése, rendezési algoritmus"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 11: Szöveges feladatok megoldása egyenlettel */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-szoveges-egyenlettel') && (
            <section>
              <SectionHeader id="g7-sec-pct-szoveges-egyenlettel" number={11} title="Szöveges feladatok megoldása egyenlettel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok egyenlettel"
                  subtitle="Az 5 lépéses modell, életkoros és számelméleti feladatok"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-pct-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-pct-osszefoglalas" number={12} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="V. Százalékszámítás, egyenletek átfogó rendszerezése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-geometry') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Egybevágó háromszögek, szerkesztések */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-egybevagosag') && (
            <section>
              <SectionHeader id="g7-sec-geom-egybevagosag" number={1} title="Egybevágó háromszögek, szerkesztések" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapszerkesztések"
                  subtitle="Körző és vonalzó szerkesztő eszköz"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => onActivitySelect('construction', 'g7-geometry')}
                  icon={<Pencil className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Háromszögek fajtái"
                  subtitle="Egybevágóság 4 alapesete és csoportosítás"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => onActivitySelect('triangle-classification', 'g7-geometry')}
                  icon={<Triangle className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Összefüggések a háromszög oldalai és szögei között */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-oldalak-szogek') && (
            <section>
              <SectionHeader id="g7-sec-geom-oldalak-szogek" number={2} title="Összefüggések a háromszög oldalai és szögei között" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek szögei kvíz"
                  subtitle="Belső és külső szögek kiszámítása"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('triangle-angles-quiz', 'g7-geometry')}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Háromszög-egyenlőtlenség"
                  subtitle="Oldalak és szemközti szögek kapcsolata"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => onActivitySelect('triangle-classification', 'g7-geometry')}
                  icon={<Ruler className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Hegyesszög, derékszög, tompaszög stb."
                  type="Gyakorlás"
                  emoji="🧭"
                  onClick={() => onActivitySelect('angle-matching', 'g7-geometry')}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Sokszögek szögei és átlói */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-sokszogek-szogei-atloi') && (
            <section>
              <SectionHeader id="g7-sec-geom-sokszogek-szogei-atloi" number={3} title="Sokszögek szögei és átlói" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek osztályozása"
                  subtitle="Négyszögek és konvex sokszögek tulajdonságai"
                  type="Gyakorlás"
                  emoji="🛑"
                  onClick={() => onActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Sokszögek szögei és átlói"
                  subtitle="Átlók száma és belső szögek összege"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: A terület és a térfogat mértékegységei */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-mertekegysegek') && (
            <section>
              <SectionHeader id="g7-sec-geom-mertekegysegek" number={4} title="A terület és a térfogat mértékegységei" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területmértékegységek kvíz"
                  subtitle="mm², cm², dm², m², ár, ha átváltások"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('area-conversion-quiz', 'g7-geometry')}
                  icon={<Ruler className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Térfogat és űrmértékek kvíz"
                  subtitle="m³, dm³, cm³, mm³, liter, hl átváltások"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => onActivitySelect('volume-quiz', 'g7-geometry')}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 5: A paralelogramma területe */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-paralelogramma-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-paralelogramma-terulet" number={5} title="A paralelogramma területe" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Paralelogramma terület kvíz"
                  subtitle="T = a · ma interaktív ábrás számítások"
                  type="Kvíz"
                  emoji="🟩"
                  onClick={() => onActivitySelect('parallelogram-area-quiz', 'g7-geometry')}
                  icon={<Square className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Paralelogrammák típusai"
                  subtitle="Téglalap, négyzet, rombusz tulajdonságai"
                  type="Gyakorlás"
                  emoji="🔷"
                  onClick={() => onActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: A háromszög területe */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-haromszog-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-haromszog-terulet" number={6} title="A háromszög területe" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszög területe gyakorlás"
                  subtitle="T = (a · ma) / 2 és derékszögű háromszög"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => onActivitySelect('area-calculation-quiz', 'g7-geometry')}
                  icon={<Triangle className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Háromszögek csoportosítása"
                  subtitle="Oldalak és magasságok kapcsolata"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => onActivitySelect('triangle-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: A trapéz területe */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-trapez-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-trapez-terulet" number={7} title="A trapéz területe" color="green" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Trapézok felismerése"
                  subtitle="Alapok, szárak és középvonal tulajdonságai"
                  type="Gyakorlás"
                  emoji="⏢"
                  onClick={() => onActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="green"
                />
                <ActivityPlaceholder
                  title="Trapéz területszámítás"
                  subtitle="T = ((a+c)/2) · m képlet feladatai"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 8: A deltoid területe */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-deltoid-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-deltoid-terulet" number={8} title="A deltoid területe" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Deltoid tulajdonságai"
                  subtitle="Merőleges átlók és szimmetria"
                  type="Gyakorlás"
                  emoji="🪁"
                  onClick={() => onActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Deltoid területe"
                  subtitle="T = (e · f) / 2 képlet feladatai"
                  type="Hamarosan"
                  emoji="✨"
                  disabled={true}
                  icon={<Shapes className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 9: A hasáb felszíne és térfogata */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-hasab-felszin-terfogat') && (
            <section>
              <SectionHeader id="g7-sec-geom-hasab-felszin-terfogat" number={9} title="A hasáb felszíne és térfogata" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felszín és térfogat eszköz"
                  subtitle="3D testek térfogata és felszíne"
                  type="Eszköz"
                  emoji="🏛️"
                  onClick={() => onActivitySelect('volume-surface', 'g7-geometry')}
                  icon={<Box className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Felszínszámítás kvíz"
                  subtitle="Téglatest, kocka és hasáb felszíne"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('surface-area-quiz', 'g7-geometry')}
                  icon={<Layers className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 10: Testek térben és síkban */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-testek-terben-sikban') && (
            <section>
              <SectionHeader id="g7-sec-geom-testek-terben-sikban" number={10} title="Testek térben és síkban" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D alakzatok szétválogatása"
                  type="Gyakorlás"
                  emoji="🧊"
                  onClick={() => onActivitySelect('shape-classification', 'g7-geometry')}
                  icon={<Box className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Testhálók és nézetek"
                  subtitle="Kiterített hálók és Euler-tétel"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 11: Szabadulószoba */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-szabaduloszoba') && (
            <section>
              <SectionHeader id="g7-sec-geom-szabaduloszoba" number={11} title="Szabadulószoba" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai Szabadulószoba"
                  subtitle="Interaktív kódfejtés és geometriai feladványok"
                  type="Kvíz"
                  emoji="🔐"
                  onClick={() => onActivitySelect('quiz', 'g7-geometry')}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-geom-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-geom-osszefoglalas" number={12} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria Záróteszt"
                  subtitle="VI. Geometria átfogó összefoglaló kvíz"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('quiz', 'g7-geometry')}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-stats') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Két halmaz közötti hozzárendelések */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-halmazok-hozzarendeles') && (
            <section>
              <SectionHeader id="g7-sec-stats-halmazok-hozzarendeles" number={1} title="Két halmaz közötti hozzárendelések" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hozzárendelés Kvíz"
                  subtitle="Halmazok összekötése nyilakkal, függvény fogalma"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g7-mapping-quiz', 'g7-stats')}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: A hozzárendelések megadási módjai */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-megadasi-modok') && (
            <section>
              <SectionHeader id="g7-sec-stats-megadasi-modok" number={2} title="A hozzárendelések megadási módjai" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Megadási módok kvíz"
                  subtitle="Utasítás, képlet, értéktáblázat és számpárok"
                  type="Kvíz"
                  emoji="📋"
                  onClick={() => onActivitySelect('g7-mapping-quiz', 'g7-stats')}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Függvény leolvasás"
                  subtitle="Táblázat kitöltése szabály alapján"
                  type="Gyakorlás"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g7-function-table-quiz', 'g7-stats')}
                  icon={<LineChart className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Olvassunk a grafikonról! */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-olvassunk-grafikonrol') && (
            <section>
              <SectionHeader id="g7-sec-stats-olvassunk-grafikonrol" number={3} title="Olvassunk a grafikonról!" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Függvény leolvasás"
                  subtitle="Táblázat kitöltése grafikonról, folyamatok elemzése"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => onActivitySelect('g7-function-table-quiz', 'g7-stats')}
                  icon={<LineChart className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 4: Átlag, módusz, medián */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-atlag-modusz-median') && (
            <section>
              <SectionHeader id="g7-sec-stats-atlag-modusz-median" number={4} title="Átlag, módusz, medián" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Átlag, módusz, medián"
                  subtitle="Számtani közép, leggyakoribb érték és terjedelem"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Gyakoriság, relatív gyakoriság */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-gyakorisag-relativ') && (
            <section>
              <SectionHeader id="g7-sec-stats-gyakorisag-relativ" number={5} title="Gyakoriság, relatív gyakoriság" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakoriság és Relatív gyakoriság"
                  subtitle="Gyakorisági táblázatok, tört és százalékos alak, kördiagram"
                  type="Hamarosan"
                  emoji="📑"
                  disabled={true}
                  icon={<PieChart className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Valószínűség */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-valoszinuseg') && (
            <section>
              <SectionHeader id="g7-sec-stats-valoszinuseg" number={6} title="Valószínűség" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Klasszikus valószínűség"
                  subtitle="P(A) = kedvező / összes eset, kocka- és érmedobás"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Tippelj, kísérletezz, ellenőrizz! */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-tippelj-kiserletezz') && (
            <section>
              <SectionHeader id="g7-sec-stats-tippelj-kiserletezz" number={7} title="Tippelj, kísérletezz, ellenőrizz!" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kísérletek és statisztika"
                  subtitle="A nagy számok törvénye, relatív gyakoriság vs. valószínűség"
                  type="Hamarosan"
                  emoji="🧪"
                  disabled={true}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-stats-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-stats-osszefoglalas" number={8} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hozzárendelések és statisztika teszt"
                  subtitle="VII. fejezet átfogó összefoglaló kvíz"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('quiz', 'g7-stats')}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-other') {
      return (
        <div className="py-2">
          <MaterialGallery
            grade={7}
            onView={handleMaterialSelect}
            initialMaterialId={new URLSearchParams(location.search).get('material')}
          />
        </div>
      );
    }

    if (topicId === 'g7-logic') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számold össze! */}
          {(showAll || activeSubSectionId === 'g7-sec-szamold-ossze') && (
            <section>
              <SectionHeader id="g7-sec-szamold-ossze" number={1} title="Számold össze!" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számold össze!"
                  subtitle="Leszámlálás és elemi kombinatorika"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Rendezd sorba! */}
          {(showAll || activeSubSectionId === 'g7-sec-rendezd-sorba') && (
            <section>
              <SectionHeader id="g7-sec-rendezd-sorba" number={2} title="Rendezd sorba!" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Rendezd sorba!"
                  subtitle="Sorrendek, permutációk alapjai"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Hány eset van? */}
          {(showAll || activeSubSectionId === 'g7-sec-hany-eset-van') && (
            <section>
              <SectionHeader id="g7-sec-hany-eset-van" number={3} title="Hány eset van?" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hány eset van?"
                  subtitle="Esetszétválasztás, szorzási szabály"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Gráfok */}
          {(showAll || activeSubSectionId === 'g7-sec-grafok') && (
            <section>
              <SectionHeader id="g7-sec-grafok" number={4} title="Gráfok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gráfok"
                  subtitle="Csúcsok, élek, fokszámok összefüggései"
                  type="Hamarosan"
                  emoji="🕸️"
                  disabled={true}
                  icon={<Network className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Igazold! Cáfold! */}
          {(showAll || activeSubSectionId === 'g7-sec-igazold-cafold') && (
            <section>
              <SectionHeader id="g7-sec-igazold-cafold" number={5} title="Igazold! Cáfold!" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Igazold! Cáfold!"
                  subtitle="Kijelentések, bizonyítások és ellenpéldák"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: Matematikai játékok */}
          {(showAll || activeSubSectionId === 'g7-sec-matematikai-jatekok') && (
            <section>
              <SectionHeader id="g7-sec-matematikai-jatekok" number={6} title="Matematikai játékok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matematikai játékok"
                  subtitle="Nyerő stratégiák, szimmetria, logikai fejtörők"
                  type="Hamarosan"
                  emoji="🎮"
                  disabled={true}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g7-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-osszefoglalas" number={7} title="Összefoglalás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="I. Gondolkodjunk! fejezet rendszerezése és tesztje"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="rose"
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
        grade={7}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade7View;
