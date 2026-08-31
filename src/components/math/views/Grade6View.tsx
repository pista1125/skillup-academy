import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  ArrowRightLeft,
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
  Flag,
  FlaskConical,
  Gamepad2,
  HelpCircle,
  Layers,
  LineChart,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  Network,
  Pencil,
  Percent,
  PieChart,
  Pizza,
  Repeat,
  Ruler,
  Scale,
  Scissors,
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
  Zap
} from 'lucide-react';

export const Grade6View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
    if (topicId === 'g6-integers-divisibility') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Műveletek az egész számok körében */}
          {(showAll || activeSubSectionId === 'g6-sec-muveletek') && (
            <section>
              <SectionHeader id="g6-sec-muveletek" number={1} title="Műveletek az egész számok körében (Mit tanultunk ötödik osztályban?)" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveletek az egész számok körében"
                  subtitle="Egész számok összeadása, kivonása és számegyenes"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Az egész számok szorzása */}
          {(showAll || activeSubSectionId === 'g6-sec-szorzas') && (
            <section>
              <SectionHeader id="g6-sec-szorzas" number={2} title="Az egész számok szorzása" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az egész számok szorzása"
                  subtitle="Pozitív és negatív számok szorzása, előjelszabályok"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az egész számok osztása */}
          {(showAll || activeSubSectionId === 'g6-sec-osztas') && (
            <section>
              <SectionHeader id="g6-sec-osztas" number={3} title="Az egész számok osztása" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az egész számok osztása"
                  subtitle="Egész számok osztása, előjelszabályok és tulajdonságok"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: Hány eset van? Számoljuk össze! */}
          {(showAll || activeSubSectionId === 'g6-sec-hany-eset') && (
            <section>
              <SectionHeader id="g6-sec-hany-eset" number={4} title="Hány eset van? Számoljuk össze!" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hány eset van?"
                  subtitle="Esetek rendszerezett összeszámolása és fastruktúra"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Osztó, többszörös */}
          {(showAll || activeSubSectionId === 'g6-sec-oszto-tobbszoros') && (
            <section>
              <SectionHeader id="g6-sec-oszto-tobbszoros" number={5} title="Osztó, többszörös" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztó és többszörös"
                  subtitle="Az osztó és a többszörös fogalma, tulajdonságai"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Számolás maradékokkal */}
          {(showAll || activeSubSectionId === 'g6-sec-maradekok') && (
            <section>
              <SectionHeader id="g6-sec-maradekok" number={6} title="Számolás maradékokkal" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számolás maradékokkal"
                  subtitle="Maradékos osztás alaptétele és maradékok vizsgálata"
                  type="Hamarosan"
                  emoji="⏳"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: Hány osztója van? */}
          {(showAll || activeSubSectionId === 'g6-sec-hany-osztoja-van') && (
            <section>
              <SectionHeader id="g6-sec-hany-osztoja-van" number={7} title="Hány osztója van?" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Prímtényezők"
                  subtitle="Számok felbontása prímszámok szorzatára"
                  type="Eszköz"
                  emoji="🧱"
                  onClick={() => onActivitySelect('divisibility-factorization', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Párosító Játék"
                  subtitle="Párosítsd a számokat a prímfelbontásukkal!"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => onActivitySelect('divisibility-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 8: Oszthatóság 2-vel, 5-tel, 10-zel */}
          {(showAll || activeSubSectionId === 'g6-sec-oszthatosag-2-5-10') && (
            <section>
              <SectionHeader id="g6-sec-oszthatosag-2-5-10" number={8} title="Oszthatóság 2-vel, 5-tel, 10-zel" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatóság 2-vel, 5-tel, 10-zel"
                  subtitle="Utolsó számjegy alapú oszthatósági szabályok"
                  type="Hamarosan"
                  emoji="🔟"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 9: Oszthatóság 3-mal és 9-cel */}
          {(showAll || activeSubSectionId === 'g6-sec-oszthatosag-3-9') && (
            <section>
              <SectionHeader id="g6-sec-oszthatosag-3-9" number={9} title="Oszthatóság 3-mal és 9-cel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatóság 3-mal és 9-cel"
                  subtitle="Számjegyösszeg alapú oszthatósági szabályok"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 10: Oszthatóság 4-gyel és 100-zal */}
          {(showAll || activeSubSectionId === 'g6-sec-oszthatosag-4-100') && (
            <section>
              <SectionHeader id="g6-sec-oszthatosag-4-100" number={10} title="Oszthatóság 4-gyel és 100-zal" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatóság 4-gyel és 100-zal"
                  subtitle="Utolsó két számjegy vizsgálata és szabályai"
                  type="Hamarosan"
                  emoji="💯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összetett oszthatósági szabályok */}
          {(showAll || activeSubSectionId === 'g6-sec-osszetett-oszthatosag') && (
            <section>
              <SectionHeader id="g6-sec-osszetett-oszthatosag" number={11} title="Összetett oszthatósági szabályok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatósági Kvíz"
                  subtitle="Összetett oszthatósági szabályok gyakorlása"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('divisibility-quiz', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 12: Többszörös, közös többszörös */}
          {(showAll || activeSubSectionId === 'g6-sec-tobbszoros-kozos') && (
            <section>
              <SectionHeader id="g6-sec-tobbszoros-kozos" number={12} title="Többszörös, közös többszörös" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="LKKT Kvíz"
                  subtitle="Legkisebb közös többszörös gyakorlása"
                  type="Kvíz"
                  emoji="✨"
                  onClick={() => onActivitySelect('divisibility-lkktquiz', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 13: Osztó, közös osztó */}
          {(showAll || activeSubSectionId === 'g6-sec-oszto-kozos') && (
            <section>
              <SectionHeader id="g6-sec-oszto-kozos" number={13} title="Osztó, közös osztó" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="LKÖ Kvíz"
                  subtitle="Legnagyobb közös osztó meghatározása"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('divisibility-gcdquiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 14: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g6-sec-osszefoglalas" number={14} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="I. Egész számok, oszthatóság fejezet átfogó ismétlése"
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

    if (topicId === 'g6-fractions') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Mit tanultunk a törtekről? Ismétlés */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-1') && (
            <section>
              <SectionHeader id="g6-frac-sec-1" number={1} title="Mit tanultunk a törtekről? Ismétlés" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Vizuális Tört Párosító"
                  subtitle="Törtek és ábrák párosítása"
                  type="Játék"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g6-fraction-visual-matcher', topicId)}
                  icon={<Pizza className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Tört Kvíz"
                  subtitle="Törtek összeadása, kivonása és egyszerűsítése"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g6-fractions-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Szorzás törttel, a reciprok */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-2') && (
            <section>
              <SectionHeader id="g6-frac-sec-2" number={2} title="Szorzás törttel, a reciprok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört Szorzás Párosító"
                  subtitle="Szorzás egész számmal és törttel, reciprok"
                  type="Játék"
                  emoji="✖️"
                  onClick={() => onActivitySelect('g6-fraction-multiplier', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Osztás törttel */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-3') && (
            <section>
              <SectionHeader id="g6-frac-sec-3" number={3} title="Osztás törttel" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört Osztás Párosító"
                  subtitle="Osztás egész számmal és törttel, reciprokkal való szorzás"
                  type="Játék"
                  emoji="➗"
                  onClick={() => onActivitySelect('g6-fraction-divider', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Mit tanultunk a tizedes törtekről? Ismétlés */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-4') && (
            <section>
              <SectionHeader id="g6-frac-sec-4" number={4} title="Mit tanultunk a tizedes törtekről? Ismétlés" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestört Kvíz"
                  subtitle="Tizedestört helyiértékek, összeadás és kivonás"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('g6-decimal-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Tört - Tizedestört Párosító"
                  subtitle="Közönséges és tizedes tört alakok összerendelése"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g6-to-decimal-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szorzás tizedes törttel */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-5') && (
            <section>
              <SectionHeader id="g6-frac-sec-5" number={5} title="Szorzás tizedes törttel" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestört Szorzás Kvíz"
                  subtitle="Szorzás 10-zel, 100-zal és tizedes törttel"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g6-decimal-multiplier-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Szorzás Párosító"
                  subtitle="Gyakorold a tizedestört szorzást párosító játékkal!"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('g6-decimal-multiplier', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 6: Osztás tizedes törttel */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-6') && (
            <section>
              <SectionHeader id="g6-frac-sec-6" number={6} title="Osztás tizedes törttel" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestört Osztás Kvíz"
                  subtitle="Osztás 10-zel, 100-zal és tizedes törttel"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g6-decimal-divider-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Osztás Párosító"
                  subtitle="Gyakorold a tizedestört osztást párosító játékkal!"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g6-decimal-divider', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összetett műveletek, zárójelfelbontás */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-7') && (
            <section>
              <SectionHeader id="g6-frac-sec-7" number={7} title="Összetett műveletek, zárójelfelbontás" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett műveletek"
                  subtitle="Műveleti sorrend és zárójelfelbontási szabályok"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-8') && (
            <section>
              <SectionHeader id="g6-frac-sec-8" number={8} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Témazáró Teszt"
                  subtitle="A teljes II. Törtek fejezet átfogó ellenőrző tesztje"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-fractions-closing-test', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-geometry-symmetry') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Síkbeli alakzatok */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-1') && (
            <section>
              <SectionHeader id="g6-geom-sec-1" number={1} title="Síkbeli alakzatok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek"
                  subtitle="Alakzatok csoportosítása és tulajdonságai"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => onActivitySelect('shape-classification', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Egyenesek"
                  subtitle="Párhuzamos és merőleges kapcsolatok"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => onActivitySelect('line-relationships', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Szögtípusok és fokok gyakorlása"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => onActivitySelect('angle-matching', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Egybevágóság */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-2') && (
            <section>
              <SectionHeader id="g6-geom-sec-2" number={2} title="Egybevágóság" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egybevágóság"
                  subtitle="Egybevágó alakzatok és transzformációk"
                  type="Hamarosan"
                  emoji="✨"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: A kör */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-3') && (
            <section>
              <SectionHeader id="g6-geom-sec-3" number={3} title="A kör" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kör részei"
                  subtitle="Sugár, átmérő, húr, ív és körcikk felismerése"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => onActivitySelect('circle-parts', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 4: A szakasz felezőmerőlegese */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-4') && (
            <section>
              <SectionHeader id="g6-geom-sec-4" number={4} title="A szakasz felezőmerőlegese" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felezőmerőleges"
                  subtitle="Szakaszfelező merőleges és pontjainak tulajdonságai"
                  type="Hamarosan"
                  emoji="✂️"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szerkesztések */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-5') && (
            <section>
              <SectionHeader id="g6-geom-sec-5" number={5} title="Szerkesztések" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapszerkesztések"
                  subtitle="Körzővel és vonalzóval végzett szerkesztések"
                  type="Eszköz"
                  emoji="✏️"
                  onClick={() => onActivitySelect('construction', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 6: Tengelyes tükrözés */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-6') && (
            <section>
              <SectionHeader id="g6-geom-sec-6" number={6} title="Tengelyes tükrözés" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükörkép keresése"
                  subtitle="Interaktív tengelyes tükrözés kvíz"
                  type="Kvíz"
                  emoji="🪞"
                  onClick={() => onActivitySelect('reflection-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Húzd a helyére!"
                  subtitle="Tükrözés pontról pontra a koordinátarendszerben"
                  type="Játék"
                  emoji="⚡"
                  onClick={() => onActivitySelect('axial-symmetry', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Találd meg a hibát!"
                  subtitle="Diagnosztikai szimmetria hibakereső"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => onActivitySelect('symmetry-error', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: A tengelyes tükrözés tulajdonságai */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-7') && (
            <section>
              <SectionHeader id="g6-geom-sec-7" number={7} title="A tengelyes tükrözés tulajdonságai" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükrözés tulajdonságai"
                  subtitle="Távolságtartás, szögtartás és körüljárási irány"
                  type="Hamarosan"
                  emoji="📖"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Tengelyes szimmetria */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-8') && (
            <section>
              <SectionHeader id="g6-geom-sec-8" number={8} title="Tengelyes szimmetria" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szimmetriatengely Kvíz"
                  subtitle="Szimmetriatengelyek száma alakzatokban"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('axial-symmetry-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="A szimmetria körbevesz"
                  subtitle="Interaktív vizuális bemutató"
                  type="Bemutató"
                  emoji="🦋"
                  onClick={() => onActivitySelect('axial-symmetry-presentation', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 9: Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-9') && (
            <section>
              <SectionHeader id="g6-geom-sec-9" number={9} title="Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek"
                  subtitle="Háromszögek típusai és tengelyes szimmetriája"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => onActivitySelect('triangle-classification', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Négyszögek"
                  subtitle="Négyszögek tulajdonságai és tengelyes szimmetriája"
                  type="Gyakorlás"
                  emoji="🔲"
                  onClick={() => onActivitySelect('quadrilateral-classification', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szerkesztési feladatok */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-10') && (
            <section>
              <SectionHeader id="g6-geom-sec-10" number={10} title="Szerkesztési feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett szerkesztés"
                  subtitle="Háromszögek és négyszögek szerkesztése adatokból"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-11') && (
            <section>
              <SectionHeader id="g6-geom-sec-11" number={11} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek Kvíz"
                  subtitle="III. Geometria fejezet átfogó ismétlése"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('triangle-angles-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-ratio-percent-word') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Az arány fogalma */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-1') && (
            <section>
              <SectionHeader id="g6-ratio-sec-1" number={1} title="Az arány fogalma" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arány felismerés"
                  subtitle="Zászlók, poharak, kísérletek"
                  type="Teszt"
                  emoji="🚩"
                  onClick={() => onActivitySelect('ratio-intro', topicId)}
                  icon={<Flag className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Arány alkotó"
                  subtitle="Színezés, keverés, elosztás"
                  type="Interaktív"
                  emoji="🎨"
                  onClick={() => onActivitySelect('ratio-creator', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Arányos osztás */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-2') && (
            <section>
              <SectionHeader id="g6-ratio-sec-2" number={2} title="Arányos osztás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arányos osztás"
                  subtitle="Mennyiségek szétosztása adott arányban"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Egyenes arányosság */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-3') && (
            <section>
              <SectionHeader id="g6-ratio-sec-3" number={3} title="Egyenes arányosság" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenes arányosság kvíz"
                  subtitle="Összetartozó mennyiségek és állandó hányados"
                  type="Teszt"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('direct-proportion-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 4: Egyenes arányosság grafikonja */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-4') && (
            <section>
              <SectionHeader id="g6-ratio-sec-4" number={4} title="Egyenes arányosság grafikonja" color="lime" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arányosság grafikonja"
                  subtitle="Origón átmenő egyenes és pontsor ábrázolása"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<LineChart className="w-6 h-6" />}
                  color="lime"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szabályok, megfeleltetések */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-5') && (
            <section>
              <SectionHeader id="g6-ratio-sec-5" number={5} title="Szabályok, megfeleltetések" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szabályjáték"
                  subtitle="Hozzárendelések és táblázatok kitöltése"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Repeat className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Törtrész */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-6') && (
            <section>
              <SectionHeader id="g6-ratio-sec-6" number={6} title="Törtrész" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtrész és egész"
                  subtitle="Törtrész kiszámítása és visszaszámolás"
                  type="Hamarosan"
                  emoji="🍕"
                  disabled={true}
                  icon={<Percent className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: Százalékszámítás */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-7') && (
            <section>
              <SectionHeader id="g6-ratio-sec-7" number={7} title="Százalékszámítás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékérték"
                  subtitle="Százalékérték kiszámítása"
                  type="Teszt"
                  emoji="💯"
                  onClick={() => {
                    setPercentMode('calculate-value');
                    onActivitySelect('percentages', topicId);
                  }}
                  icon={<Percent className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Százalékláb"
                  subtitle="Arány megadása %-ban"
                  type="Teszt"
                  emoji="📊"
                  onClick={() => {
                    setPercentMode('calculate-rate');
                    onActivitySelect('percentages', topicId);
                  }}
                  icon={<Percent className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Százalékalap"
                  subtitle="Visszaszámolás a 100%-ra"
                  type="Teszt"
                  emoji="🎯"
                  onClick={() => {
                    setPercentMode('calculate-base');
                    onActivitySelect('percentages', topicId);
                  }}
                  icon={<Percent className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 8: A százalékszámítás gyakorlása */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-8') && (
            <section>
              <SectionHeader id="g6-ratio-sec-8" number={8} title="A százalékszámítás gyakorlása" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékos szöveges feladatok"
                  subtitle="Árleszállítás, drágulás és kedvezmények"
                  type="Gyakorlás"
                  emoji="🏷️"
                  onClick={() => onActivitySelect('percent-value-word-problems', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 9: Nyitott mondatok */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-9') && (
            <section>
              <SectionHeader id="g6-ratio-sec-9" number={9} title="Nyitott mondatok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenletmegoldó"
                  subtitle="Vizuális mérlegmodell és lebontogatás"
                  type="Eszköz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('equation-solver', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-10') && (
            <section>
              <SectionHeader id="g6-ratio-sec-10" number={10} title="Szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok kvíz"
                  subtitle="Gondolkodtató és gyakorlati szöveges feladatok"
                  type="Teszt"
                  emoji="📝"
                  onClick={() => onActivitySelect('g6-word-problems-quiz', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Feladatsorok"
                  subtitle="Szöveges feladatgyűjtemény lépésről lépésre"
                  type="Gyakorlás"
                  emoji="📚"
                  onClick={() => onActivitySelect('g6-word-problems-module', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 11: Több megoldás is lehet */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-11') && (
            <section>
              <SectionHeader id="g6-ratio-sec-11" number={11} title="Több megoldás is lehet" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Esetvizsgálat"
                  subtitle="Feladatok több lehetséges megoldással"
                  type="Hamarosan"
                  emoji="🧩"
                  disabled={true}
                  icon={<Brain className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-ratio-sec-12') && (
            <section>
              <SectionHeader id="g6-ratio-sec-12" number={12} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="IV. Arány, százalék, szöveges feladatok átfogó ismétlés"
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


    if (topicId === 'g6-measurements') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Hosszúság, tömeg, idő */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-1') && (
            <section>
              <SectionHeader id="g6-meas-sec-1" number={1} title="Hosszúság, tömeg, idő" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mértékegység átváltó"
                  subtitle="Hosszúság, tömeg és idő átváltása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('unit-converter', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Analóg Óra"
                  subtitle="Időmérés és időszámítás"
                  type="Eszköz"
                  emoji="⏱️"
                  onClick={() => onActivitySelect('analog-clock', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: A sokszögek kerülete */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-2') && (
            <section>
              <SectionHeader id="g6-meas-sec-2" number={2} title="A sokszögek kerülete" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerület Kvíz"
                  subtitle="Háromszögek és négyszögek kerülete"
                  type="Teszt"
                  emoji="📐"
                  onClick={() => onActivitySelect('perimeter-quiz', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: A terület és a térfogat mérése */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-3') && (
            <section>
              <SectionHeader id="g6-meas-sec-3" number={3} title="A terület és a térfogat mérése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Terület Átváltás Kvíz"
                  subtitle="Mértékegységek 100-as váltószámmal"
                  type="Teszt"
                  emoji="🔄"
                  onClick={() => onActivitySelect('area-conversion-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Űrmérték Átváltó"
                  subtitle="Liter, deciliter és köbdeciméter"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('capacity-converter', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 4: A sokszögek területe */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-4') && (
            <section>
              <SectionHeader id="g6-meas-sec-4" number={4} title="A sokszögek területe" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területszámítás Kvíz"
                  subtitle="Négyzet, téglalap, háromszögek területe"
                  type="Teszt"
                  emoji="🟩"
                  onClick={() => onActivitySelect('area-calc-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Kerület & Terület Műhely"
                  subtitle="Interaktív rácsos síkidom tervező"
                  type="Eszköz"
                  emoji="📐"
                  onClick={() => onActivitySelect('perimeter-area-tool', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Alakzatok a térben */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-5') && (
            <section>
              <SectionHeader id="g6-meas-sec-5" number={5} title="Alakzatok a térben" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térbeli testek és hálók"
                  subtitle="Csúcsok, élek, lapok és testhálók"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Box className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 6: Testek felszíne */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-6') && (
            <section>
              <SectionHeader id="g6-meas-sec-6" number={6} title="Testek felszíne" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felszínszámítás Kvíz"
                  subtitle="Kocka és téglatest felszíne"
                  type="Teszt"
                  emoji="📦"
                  onClick={() => onActivitySelect('surface-area-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="3D Test Stúdió"
                  subtitle="Testek 3D modellje és felszíne"
                  type="Eszköz"
                  emoji="🧊"
                  onClick={() => onActivitySelect('volume-surface-tool', topicId)}
                  icon={<Boxes className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 7: Felszínszámítással kapcsolatos gyakorlati feladatok */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-7') && (
            <section>
              <SectionHeader id="g6-meas-sec-7" number={7} title="Felszínszámítással kapcsolatos gyakorlati feladatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakorlati felszínszámítás"
                  subtitle="Szobafestés, csomagolás, burkolás"
                  type="Hamarosan"
                  emoji="🏠"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 8: Testek térfogata */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-8') && (
            <section>
              <SectionHeader id="g6-meas-sec-8" number={8} title="Testek térfogata" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térfogatszámítás Kvíz"
                  subtitle="Kocka, téglatest térfogata és űrtartalma"
                  type="Teszt"
                  emoji="🛢️"
                  onClick={() => onActivitySelect('volume-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 9: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-meas-sec-9') && (
            <section>
              <SectionHeader id="g6-meas-sec-9" number={9} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="V. Kerület, terület, felszín, térfogat összefoglalás"
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

    if (topicId === 'g6-statistics') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Játékok */}
          {(showAll || activeSubSectionId === 'g6-stat-sec-1') && (
            <section>
              <SectionHeader id="g6-stat-sec-1" number={1} title="Játékok" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Venn-diagram Kvíz"
                  subtitle="Halmazok és logikai adatok értelmezése"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => onActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Venn-diagram Játék"
                  subtitle="Interaktív halmazrendező"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => onActivitySelect('venn-diagram-game', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 2: Grafikonok, diagramok, összefüggések */}
          {(showAll || activeSubSectionId === 'g6-stat-sec-2') && (
            <section>
              <SectionHeader id="g6-stat-sec-2" number={2} title="Grafikonok, diagramok, összefüggések" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Diagramok és Grafikonok"
                  subtitle="Oszlop-, sáv- és vonaldiagramok elemzése"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Kördiagram */}
          {(showAll || activeSubSectionId === 'g6-stat-sec-3') && (
            <section>
              <SectionHeader id="g6-stat-sec-3" number={3} title="Kördiagram" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kördiagram Értelmező"
                  subtitle="Középponti szögek és százalékos részesedés"
                  type="Hamarosan"
                  emoji="🥧"
                  disabled={true}
                  icon={<PieChart className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Adatok ábrázolása, átlag */}
          {(showAll || activeSubSectionId === 'g6-stat-sec-4') && (
            <section>
              <SectionHeader id="g6-stat-sec-4" number={4} title="Adatok ábrázolása, átlag" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Statisztikai Mutatók"
                  subtitle="Átlag, módusz, medián és terjedelem"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-stat-sec-5') && (
            <section>
              <SectionHeader id="g6-stat-sec-5" number={5} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="VI. Statisztika témakör átfogó ellenőrzése"
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


  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
      </div>
      <MaterialGallery
        grade={6}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade6View;
