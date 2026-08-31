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

export const Grade8View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
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
                  title="Logika Kvíz"
                  subtitle="Állítások, tagadás, skatulya-elv"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => onActivitySelect('g8-logic', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="blue"
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
                  title="Halmaz Alapfogalmak"
                  subtitle="Relációk, részhalmazok száma"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-set-basics', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
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
                  subtitle="Metszet, unió, különbség, szita"
                  type="Kvíz"
                  emoji="📑"
                  onClick={() => onActivitySelect('g8-set-operations', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="indigo"
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
                  title="Racionális Számok (ℚ)"
                  subtitle="Törtek, tizedestörtek, abszolútérték"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g8-rational-set', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="emerald"
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
                  title="Műveletek Racionálisan"
                  subtitle="Előjelek, törtek, műveleti sorrend"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('g8-rational-operations', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
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
                  subtitle="Azonosságok, negatív kitevő"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g8-powers', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="amber"
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
                  title="Négyzetgyök Fogalma"
                  subtitle="Nemnegativitás, értelmezési tartomány"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-sqrt-concept', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="rose"
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
                  title="Számok Négyzetgyöke"
                  subtitle="Azonosságok, kiemelés, becslés"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-square-roots', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="pink"
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
                  title="Betűs Kifejezések"
                  subtitle="Egynemű tagok, helyettesítési érték"
                  type="Kvíz"
                  emoji="🔤"
                  onClick={() => onActivitySelect('g8-algebra-intro', topicId)}
                  icon={<Variable className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Algebra Gyakorló"
                  subtitle="Egyenletek, kifejezések"
                  type="Gyakorlás"
                  onClick={() => onActivitySelect('g8-algebra', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
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
                  type="Kvíz"
                  emoji="✂️"
                  onClick={() => onActivitySelect('g8-factoring', topicId)}
                  icon={<Scissors className="w-6 h-6" />}
                  color="purple"
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
                  title="Nevezetes Azonosságok"
                  subtitle="(a+b)², (a-b)², a²-b² kifejtése"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => onActivitySelect('g8-polynomial-mult', topicId)}
                  icon={<Boxes className="w-6 h-6" />}
                  color="indigo"
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
                  title="I. Fejezet Témazáró Kvíz"
                  subtitle="Számok és betűk átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-chapter1-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
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
                  title="Egybevágósági Kvíz"
                  subtitle="Tükrözések, eltolás, forgatás"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-geom-congruence', topicId)}
                  icon={<RefreshCw className="w-6 h-6" />}
                  color="emerald"
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
                  type="Kvíz"
                  emoji="🔀"
                  onClick={() => onActivitySelect('g8-geom-transforms', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="teal"
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
                  title="Szerkesztőprogram Kvíz"
                  subtitle="Dinamikus geometria, mértani helyek"
                  type="Kvíz"
                  emoji="💻"
                  onClick={() => onActivitySelect('g8-geom-software', topicId)}
                  icon={<MonitorPlay className="w-6 h-6" />}
                  color="cyan"
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
                  title="Hasonlóság Kvíz"
                  subtitle="Hasonlósági arány, alapesetek, területek aránya"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-geom-similarity', topicId)}
                  icon={<Maximize2 className="w-6 h-6" />}
                  color="blue"
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
                  subtitle="Centrum, λ arányszám, párhuzamos szelők"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-geom-central-similarity', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
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
                  subtitle="Szakaszosztás, negyedik arányos"
                  type="Kvíz"
                  emoji="🧭"
                  onClick={() => onActivitySelect('g8-geom-constructions', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="amber"
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
                  title="II. Fejezet Témazáró Kvíz"
                  subtitle="Geometria átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-geom-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
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
                  title="Egyenletek Kvíz"
                  subtitle="Zárójelbontás, törtes egyenletek, kikötések"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g8-eq-basic', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="purple"
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
                  title="Számok és Életkorok"
                  subtitle="Kétjegyű számok és életkori modellek"
                  type="Kvíz"
                  emoji="👥"
                  onClick={() => onActivitySelect('g8-eq-numbers-ages', topicId)}
                  icon={<Users className="w-6 h-6" />}
                  color="rose"
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
                  title="Keverési Feladatok"
                  subtitle="Oldatok, tömegszázalék, ötvözetek"
                  type="Kvíz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('g8-eq-mixing', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="teal"
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
                  title="Mozgás és Munka"
                  subtitle="s = v · t, találkozás, utolérés, munka"
                  type="Kvíz"
                  emoji="⏱️"
                  onClick={() => onActivitySelect('g8-eq-motion-work', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="blue"
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
                  title="Geometriai Egyenletek"
                  subtitle="Kerület, terület és szögek egyenletekkel"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-eq-geometry', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
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
                  title="Vegyes Szöveges Feladatok"
                  subtitle="Összetett és felvételi típusú feladatok"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => onActivitySelect('g8-eq-mixed', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="violet"
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
                  title="Pénzügyi Számítások"
                  subtitle="Árváltozások, kamat, megtakarítás"
                  type="Kvíz"
                  emoji="💰"
                  onClick={() => onActivitySelect('g8-eq-financial', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="amber"
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
                  title="III. Fejezet Témazáró Kvíz"
                  subtitle="Egyenletek átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-eq-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-admissions-prep') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g8-prep-word" number={1} title="Felvételi felkészítő & Szöveges feladatok" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges Feladatok Modul"
                subtitle="Komplex felvételi típusfeladatok"
                type="Modul"
                onClick={() => onActivitySelect('g8-word-problems-module', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="Szöveges és logikai feladványok"
                type="Kvíz"
                onClick={() => onActivitySelect('g8-word-problems-quiz', topicId)}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
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
                  title="Szerkesztések & Mérések"
                  subtitle="Thálész-tétel, területek mérése"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g8-pyth-constructions', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="amber"
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
                  title="Pitagorasz-tétel Kvíz"
                  subtitle="a² + b² = c², befogók és átfogó"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-pyth-theorem', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="orange"
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
                  title="Megfordítás & Számhármasok"
                  subtitle="Derékszögűség, 3-4-5, 5-12-13"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-pyth-converse', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="yellow"
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
                  title="Síkbeli Alkalmazások"
                  subtitle="Négyzet, téglalap, rombusz, trapéz"
                  type="Kvíz"
                  emoji="🔷"
                  onClick={() => onActivitySelect('g8-pyth-applications', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
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
                  title="Számológép & Projekt"
                  subtitle="Gyökcsiga (Theodórosz), hajtogatás"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('g8-pyth-calculator', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
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
                  title="Nevezetes Háromszögek"
                  subtitle="30°-60°-90° és 45°-45°-90°"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-pyth-special-triangles', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
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
                  title="V. Fejezet Témazáró Kvíz"
                  subtitle="Pitagorasz-tétel átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-pyth-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
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
                  title="Egyenes Arányosság Kvíz"
                  subtitle="y = k · x, arányossági tényező"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => onActivitySelect('g8-func-direct', topicId)}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="cyan"
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
                  title="Függvények & Grafikonok"
                  subtitle="y = ax + b, meredekség, zérushely"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-func-graphs', topicId)}
                  icon={<LineChart className="w-6 h-6" />}
                  color="blue"
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
                  title="Fordított Arányosság Kvíz"
                  subtitle="y = k / x, hiperbola, szorzat állandó"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g8-func-inverse', topicId)}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="indigo"
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
                  title="Grafikon Leolvasása"
                  subtitle="Menetdiagramok, szélsőértékek, szakaszok"
                  type="Kvíz"
                  emoji="👁️"
                  onClick={() => onActivitySelect('g8-func-reading', topicId)}
                  icon={<Eye className="w-6 h-6" />}
                  color="teal"
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
                  title="Grafikon Készítés Kvíz"
                  subtitle="Értéktáblázat, skálázás, pontok ábrázolása"
                  type="Gyakorló"
                  emoji="✏️"
                  onClick={() => onActivitySelect('g8-func-plotting', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="blue"
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
                  title="Statisztika & Átlag Kvíz"
                  subtitle="Átlag, medián, módusz, diagramok"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g8-func-frequency', topicId)}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: Játék */}
          {(showAll || activeSubSectionId === 'g8-sec-func-jatek') && (
            <section>
              <SectionHeader id="g8-sec-func-jatek" number={7} title="Játék" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matematikai Játékok"
                  subtitle="Nyerő stratégiák, Nim, esélyek"
                  type="Játék"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g8-func-game', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="purple"
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
                  subtitle="P = kedvező / összes, események"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g8-func-prob-basics', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="amber"
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
                  title="Összetett Valószínűségi Feladatok"
                  subtitle="Két kocka, kártyák, golyóhúzások"
                  type="Gyakorló"
                  emoji="🧠"
                  onClick={() => onActivitySelect('g8-func-prob-problems', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="rose"
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
                  title="Összefüggések Keresése"
                  subtitle="Mintázatok, képletek felírása, n ↦ f(n)"
                  type="Kvíz"
                  emoji="🔍"
                  onClick={() => onActivitySelect('g8-func-patterns', topicId)}
                  icon={<Search className="w-6 h-6" />}
                  color="amber"
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
                  title="Számsorozatok Kvíz"
                  subtitle="Számtani, mértani, Fibonacci sorozat"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g8-func-sequences', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="cyan"
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
                  title="VI. Fejezet Témazáró Kvíz"
                  subtitle="Hozzárendelések, statisztika, sorozatok teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-func-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="emerald"
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
                  title="Testek Ismétlő Kvíz"
                  subtitle="Kocka, téglatest, hasáb, henger, mértékegységek"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => onActivitySelect('g8-solids-review', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
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
                  title="Gúlák Tulajdonságai"
                  subtitle="Alaplap, palást, oldalélek, háló, Euler-tétel"
                  type="Kvíz"
                  emoji="🔺"
                  onClick={() => onActivitySelect('g8-solids-pyramids-intro', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="amber"
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
                  title="Gúla Felszín és Térfogat"
                  subtitle="A = Ta + Tp, V = (Ta · m) / 3, Pitagorasz-tétel"
                  type="Gyakorló"
                  emoji="📐"
                  onClick={() => onActivitySelect('g8-solids-pyramids-calc', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
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
                  title="A Gömb Geometriája"
                  subtitle="A = 4πr², V = (4/3)πr³, főkör, félgömb"
                  type="Kvíz"
                  emoji="⚪"
                  onClick={() => onActivitySelect('g8-solids-sphere', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="blue"
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
                  title="A Föld Mint Gömb"
                  subtitle="R ≈ 6370 km, Egyenlítő, fokhálózat, felszín"
                  type="Kvíz"
                  emoji="🌍"
                  onClick={() => onActivitySelect('g8-solids-earth', topicId)}
                  icon={<Globe className="w-6 h-6" />}
                  color="teal"
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
                  title="VII. Fejezet Témazáró Kvíz"
                  subtitle="Hasábok, gúlák, gömbök átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g8-solids-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="indigo"
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
