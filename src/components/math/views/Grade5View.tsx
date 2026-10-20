import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import { useQuizProgress } from '@/hooks/useQuizProgress';
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
  Clock,
  Coins,
  Compass,
  Dice5,
  Dices,
  Droplets,
  Eye,
  FileText,
  FlaskConical,
  Gamepad2,
  GitCompare,
  Globe,
  Grid3X3,
  HelpCircle,
  Layers,
  Layout,
  LayoutGrid,
  Lightbulb,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  Network,
  Pencil,
  Percent,
  PieChart,
  Pizza,
  Puzzle,
  RefreshCw,
  Ruler,
  Scale,
  Scissors,
  Search,
  ShoppingCart,
  Section,
  Shapes,
  Share2,
  Sparkle,
  Sparkles,
  Split,
  Square,
  Table,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Triangle,
  Trophy,
  Variable,
  Zap
} from 'lucide-react';

export const Grade5View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
    const { getTopicProgress } = useQuizProgress();

    if (topicId === 'g5-integers') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A számok kialakulása, a római számok */}
          {(showAll || activeSubSectionId === 'g5-int-sec-1') && (
            <section>
              <SectionHeader id="g5-int-sec-1" number={1} title="A számok kialakulása, a római számok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Római számok elmélet"
                  subtitle="Történet, alapjelek és szabályok PDF letöltéssel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-roman-numerals-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Római számok kvíz"
                  subtitle="1-100-ig római számírás 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🏛️"
                  onClick={() => onActivitySelect('g5-roman-numerals-quiz', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-roman-numerals-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: A helyiértékes írás */}
          {(showAll || activeSubSectionId === 'g5-int-sec-2') && (
            <section>
              <SectionHeader id="g5-int-sec-2" number={2} title="A helyiértékes írás" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Helyiértékes írás elmélet"
                  subtitle="Alaki, helyi- és valódi érték, szorzatos alak PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-place-value-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Helyiértékes írás kvíz"
                  subtitle="Alaki, helyi- és valódi érték 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-place-value-quiz', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-place-value-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: A számjegyek hármas csoportosítása és a számok kiolvasása */}
          {(showAll || activeSubSectionId === 'g5-int-sec-3') && (
            <section>
              <SectionHeader id="g5-int-sec-3" number={3} title="A számjegyek hármas csoportosítása és a számok kiolvasása" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok kiolvasása elmélet"
                  subtitle="Hármas tagolás, osztályok, kétezres szabály PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-number-reading-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Számok kiolvasása kvíz"
                  subtitle="Hármas tagolás és osztályok 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🗣️"
                  onClick={() => onActivitySelect('g5-number-reading-quiz', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-number-reading-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: A természetes számok helyesírása */}
          {(showAll || activeSubSectionId === 'g5-int-sec-4') && (
            <section>
              <SectionHeader id="g5-int-sec-4" number={4} title="A természetes számok helyesírása" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok helyesírása elmélet"
                  subtitle="Kétezres szabály, kötőjelezés, sorszámnevek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-number-spelling-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Számok helyesírása kvíz"
                  subtitle="Kétezres szabály és kötőjelezés 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="✍️"
                  onClick={() => onActivitySelect('g5-number-spelling-quiz', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g5-number-spelling-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Számrendszerek */}
          {(showAll || activeSubSectionId === 'g5-int-sec-5') && (
            <section>
              <SectionHeader id="g5-int-sec-5" number={5} title="Számrendszerek" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számrendszerek elmélet"
                  subtitle="Tízes és kettes számrendszer, átváltások PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-number-systems-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Számrendszerek kvíz"
                  subtitle="Bináris átváltások és számrendszerek 3 szinten"
                  type="Kvíz"
                  emoji="💻"
                  onClick={() => onActivitySelect('g5-number-systems-quiz', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g5-number-systems-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: A számok ábrázolása a számegyenesen */}
          {(showAll || activeSubSectionId === 'g5-int-sec-6') && (
            <section>
              <SectionHeader id="g5-int-sec-6" number={6} title="A számok ábrázolása a számegyenesen" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes elmélet"
                  subtitle="Origó, lépésközök, szomszédok, felezőpont PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-number-line-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Számegyenes kvíz"
                  subtitle="Pontok leolvasása, távolságok és szomszédok 3 szinten"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g5-number-line-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-number-line-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Becslés, kerekítés */}
          {(showAll || activeSubSectionId === 'g5-int-sec-7') && (
            <section>
              <SectionHeader id="g5-int-sec-7" number={7} title="Becslés, kerekítés" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Becslés, kerekítés elmélet"
                  subtitle="Kerekítési szabályok, 9-es átcsapódás, műveleti becslés PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-rounding-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Becslés, kerekítés kvíz"
                  subtitle="Tízesre, százasra, ezresre kerekítés és becslés 3 szinten"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g5-rounding-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-rounding-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Összeadás, írásbeli összeadás */}
          {(showAll || activeSubSectionId === 'g5-int-sec-8') && (
            <section>
              <SectionHeader id="g5-int-sec-8" number={8} title="Összeadás, írásbeli összeadás" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás elmélet"
                  subtitle="Műveleti tulajdonságok, írásbeli lépések és kalkulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-addition-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Összeadás kvíz"
                  subtitle="Fejszámolás, írásbeli összeadás és átlépések 3 szinten"
                  type="Kvíz"
                  emoji="➕"
                  onClick={() => onActivitySelect('g5-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-addition-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Kivonás, írásbeli kivonás */}
          {(showAll || activeSubSectionId === 'g5-int-sec-9') && (
            <section>
              <SectionHeader id="g5-int-sec-9" number={9} title="Kivonás, írásbeli kivonás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kivonás elmélet"
                  subtitle="Pótlási elv, tagok, fejszámolási trükkök és kalkulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-subtraction-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Kivonás kvíz"
                  subtitle="Fejszámolás, írásbeli pótlás és átlépések 3 szinten"
                  type="Kvíz"
                  emoji="➖"
                  onClick={() => onActivitySelect('g5-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g5-subtraction-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 10: Szorzás, írásbeli szorzás */}
          {(showAll || activeSubSectionId === 'g5-int-sec-10') && (
            <section>
              <SectionHeader id="g5-int-sec-10" number={10} title="Szorzás, írásbeli szorzás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás elmélet"
                  subtitle="Műveleti tulajdonságok, helyiértékes szorzás és szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-multiplication-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Szorzás kvíz"
                  subtitle="Fejszámolás, írásbeli szorzás egy- és többjegyűvel 3 szinten"
                  type="Kvíz"
                  emoji="✖️"
                  onClick={() => onActivitySelect('g5-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-multiplication-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 11: Osztás, írásbeli osztás kétjegyű osztóval */}
          {(showAll || activeSubSectionId === 'g5-int-sec-11') && (
            <section>
              <SectionHeader id="g5-int-sec-11" number={11} title="Osztás, írásbeli osztás kétjegyű osztóval" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztás elmélet"
                  subtitle="Osztás tagjai, maradékos osztás és lépcsős szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-division-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás kvíz"
                  subtitle="Fejszámolás, maradékos és írásbeli osztás kétjegyűvel 3 szinten"
                  type="Kvíz"
                  emoji="➗"
                  onClick={() => onActivitySelect('g5-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-division-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 12: Műveletek tulajdonságai, műveleti sorrend, zárójelek */}
          {(showAll || activeSubSectionId === 'g5-int-sec-12') && (
            <section>
              <SectionHeader id="g5-int-sec-12" number={12} title="Műveletek tulajdonságai, műveleti sorrend, zárójelek" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti sorrend elmélet"
                  subtitle="Hierarchia, zárójelek, tulajdonságok és levezető szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-order-of-operations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Műveleti sorrend kvíz"
                  subtitle="Hierarchia, zárójelek, kiemelés és azonosságok 3 szinten"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-order-of-operations-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-order-of-operations-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 13: Negatív számok */}
          {(showAll || activeSubSectionId === 'g5-int-sec-13') && (
            <section>
              <SectionHeader id="g5-int-sec-13" number={13} title="Negatív számok" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Negatív számok elmélet"
                  subtitle="Hőmérő, adósság, tengerszint, nulla és számegyenes PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-negative-numbers-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Negatív számok kvíz"
                  subtitle="Előjelek, összehasonlítás, változások és feladatok 3 szinten"
                  type="Kvíz"
                  emoji="❄️"
                  onClick={() => onActivitySelect('g5-negative-numbers-quiz', topicId)}
                  icon={<Thermometer className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g5-negative-numbers-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 14: A számok ellentettje és abszolút értéke */}
          {(showAll || activeSubSectionId === 'g5-int-sec-14') && (
            <section>
              <SectionHeader id="g5-int-sec-14" number={14} title="A számok ellentettje és abszolút értéke" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Ellentett és abszolút érték elmélet"
                  subtitle="Szimmetria, nullától mért távolság, előjelek és szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-opposite-absolute-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Ellentett és abszolút érték kvíz"
                  subtitle="Előjelváltások, |x| = k egyenletek és műveletek 3 szinten"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g5-opposite-absolute-quiz', topicId)}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g5-opposite-absolute-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 15: Egész számok összeadása és kivonása */}
          {(showAll || activeSubSectionId === 'g5-int-sec-15') && (
            <section>
              <SectionHeader id="g5-int-sec-15" number={15} title="Egész számok összeadása és kivonása" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egész számok összeadása és kivonása tananyag"
                  subtitle="Számegyenes, előjelek találkozása, zárójelek és szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-integer-addition-subtraction-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Egész számok összeadása és kivonása kvíz"
                  subtitle="Előjeles műveletek, zárójelfelbontás és egyenletek 3 szinten"
                  type="Kvíz"
                  emoji="➕➖"
                  onClick={() => onActivitySelect('g5-integer-addition-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-integer-addition-subtraction-quiz')}
                />
                <ActivityPlaceholder
                  title="Számegyenes összeadás/kivonás"
                  subtitle="Előjeles számok összeadása és kivonása"
                  type="Eszköz"
                  emoji="➖"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Adósság-vagyon modell"
                  subtitle="Egész számok összeadása és kivonása (Piros: vagyon, Kék: adósság)"
                  type="Eszköz"
                  emoji="🔴🔵"
                  onClick={() => onActivitySelect('debt-asset-model', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 16: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-int-sec-16') && (
            <section>
              <SectionHeader id="g5-int-sec-16" number={16} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló tananyag"
                  subtitle="I. Az egész számok témazáró összefoglalás, szimulátor és PDF"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-chapter1-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Témazáró felkészítő kvíz"
                  subtitle="Átfogó témazáró teszt 3×30 feladattal, párosítóval és csoportosítóval"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-chapter1-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-chapter1-summary-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-fractions-decimals') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Ismerkedés a törtekkel */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-1') && (
            <section>
              <SectionHeader id="g5-frac-sec-1" number={1} title="Ismerkedés a törtekkel" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Ismerkedés a törtekkel elmélet"
                  subtitle="Tört fogalma, számláló, nevező, törtrész PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fractions-intro-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Ismerkedés a törtekkel kvíz"
                  subtitle="Tört fogalma, fajtái és törtrész 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g5-fractions-intro-quiz', topicId)}
                  icon={<PieChart className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-fractions-intro-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Törtek bővítése, egyszerűsítése, összehasonlítása */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-2') && (
            <section>
              <SectionHeader id="g5-frac-sec-2" number={2} title="Törtek bővítése, egyszerűsítése, összehasonlítása" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek bővítése, egyszerűsítése elmélet"
                  subtitle="Egyenértékű törtek, legegyszerűbb alak, összehasonlítás PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fractions-expand-simplify-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Törtek bővítése, egyszerűsítése kvíz"
                  subtitle="Bővítés, egyszerűsítés és összehasonlítás 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g5-fractions-expand-simplify-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-fractions-expand-simplify-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Törtek ábrázolása számegyenesen, vegyes törtek */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-3') && (
            <section>
              <SectionHeader id="g5-frac-sec-3" number={3} title="Törtek ábrázolása számegyenesen, vegyes törtek" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek a számegyenesen elmélet"
                  subtitle="Számegyenes beosztása, áltörtek és vegyes törtek átváltása PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fractions-number-line-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Törtek a számegyenesen kvíz"
                  subtitle="Ábrázolás, leolvasás és vegyes tört átváltás 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g5-fractions-number-line-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-fractions-number-line-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Egyenlő nevezőjű törtek összeadása és kivonása */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-4') && (
            <section>
              <SectionHeader id="g5-frac-sec-4" number={4} title="Egyenlő nevezőjű törtek összeadása és kivonása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenlő nevezőjű törtek elmélet"
                  subtitle="Összeadás, kivonás, egyszerűsítés és vegyes törtek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fractions-same-denom-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Egyenlő nevezőjű törtek kvíz"
                  subtitle="30 feladat 3 nehézségi szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="➕"
                  onClick={() => onActivitySelect('g5-fractions-same-denom-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-fractions-same-denom-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Különböző nevezőjű törtek összeadása és kivonása */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-5') && (
            <section>
              <SectionHeader id="g5-frac-sec-5" number={5} title="Különböző nevezőjű törtek összeadása és kivonása" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Különböző nevezőjű törtek elmélet"
                  subtitle="LKKT, közös nevezőre bővítés, műveletek és egyszerűsítés PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fractions-diff-denom-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Különböző nevezőjű törtek kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="➕"
                  onClick={() => onActivitySelect('g5-fractions-diff-denom-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-fractions-diff-denom-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Tört szorzása természetes számmal */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-6') && (
            <section>
              <SectionHeader id="g5-frac-sec-6" number={6} title="Tört szorzása természetes számmal" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört szorzása elmélet"
                  subtitle="Számláló szorzása, nevező osztása, egyszerűsítés PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fraction-multiply-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Tört szorzása kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="✖️"
                  onClick={() => onActivitySelect('g5-fraction-multiply-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-fraction-multiply-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Tört osztása pozitív egész számmal */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-7') && (
            <section>
              <SectionHeader id="g5-frac-sec-7" number={7} title="Tört osztása pozitív egész számmal" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört osztása elmélet"
                  subtitle="Számláló osztása, nevező szorzása, vegyes törtek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fraction-divide-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Tört osztása kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="➗"
                  onClick={() => onActivitySelect('g5-fraction-divide-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-fraction-divide-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Műveletek sorrendje, zárójelfelbontás */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-8') && (
            <section>
              <SectionHeader id="g5-frac-sec-8" number={8} title="Műveletek sorrendje, zárójelfelbontás" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveletek sorrendje elmélet"
                  subtitle="Hierarchia, zárójelek, disztributivitás PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fractions-order-of-operations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Műveletek sorrendje kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-fractions-order-of-operations-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g5-fractions-order-of-operations-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Mit tanultunk eddig? Gyakoroljunk! */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-9') && (
            <section>
              <SectionHeader id="g5-frac-sec-9" number={9} title="Mit tanultunk eddig? Gyakoroljunk!" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek összefoglaló elmélet"
                  subtitle="Törtfogalom, bővítés, műveletek áttekintése és kalkulátor PDF-fel"
                  type="Tananyag"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g5-fractions-review-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Törtek átfogó kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-fractions-review-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g5-fractions-review-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 10: Tizedes törtek */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-10') && (
            <section>
              <SectionHeader id="g5-frac-sec-10" number={10} title="Tizedes törtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedes törtek elmélet"
                  subtitle="Helyiérték-táblázat, kiolvasás, átváltások és laboratórium PDF-fel"
                  type="Tananyag"
                  emoji="🪙"
                  onClick={() => onActivitySelect('g5-decimal-fractions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Tizedes törtek kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-decimal-fractions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-decimal-fractions-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 11: Tizedes törtek ábrázolása, kerekítése és összehasonlítása */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-11') && (
            <section>
              <SectionHeader id="g5-frac-sec-11" number={11} title="Tizedes törtek ábrázolása, kerekítése és összehasonlítása" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Ábrázolás, kerekítés elmélet"
                  subtitle="Számegyenes, összehasonlítás és kerekítés laboratórium PDF-fel"
                  type="Tananyag"
                  emoji="📏"
                  onClick={() => onActivitySelect('g5-decimal-compare-rounding-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Ábrázolás, kerekítés kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g5-decimal-compare-rounding-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-decimal-compare-rounding-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 12: Tizedes törtek összeadása és kivonása */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-12') && (
            <section>
              <SectionHeader id="g5-frac-sec-12" number={12} title="Tizedes törtek összeadása és kivonása" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás, kivonás elmélet"
                  subtitle="Írásbeli összeadás és kivonás lépésről lépésre, laboratórium és PDF"
                  type="Tananyag"
                  emoji="➕"
                  onClick={() => onActivitySelect('g5-decimal-add-sub-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Összeadás, kivonás kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-decimal-add-sub-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g5-decimal-add-sub-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 13: Tizedes törtek szorzása természetes számmal */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-13') && (
            <section>
              <SectionHeader id="g5-frac-sec-13" number={13} title="Tizedes törtek szorzása természetes számmal" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás természetes számmal elmélet"
                  subtitle="Szorzás 10-zel, 100-zal, 1000-rel és természetes számmal, interaktív labor és PDF"
                  type="Tananyag"
                  emoji="✖️"
                  onClick={() => onActivitySelect('g5-decimal-multiply-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Szorzás kvíz és játékok"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-decimal-multiply-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-decimal-multiply-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 14: Tizedes törtek osztása pozitív egész számmal */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-14') && (
            <section>
              <SectionHeader id="g5-frac-sec-14" number={14} title="Tizedes törtek osztása pozitív egész számmal" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztás természetes számmal elmélet"
                  subtitle="Osztás 10-zel, 100-zal, 1000-rel és természetes számmal, interaktív labor és PDF"
                  type="Tananyag"
                  emoji="➗"
                  onClick={() => onActivitySelect('g5-decimal-divide-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás kvíz és játékok"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-decimal-divide-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-decimal-divide-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 15: Közönséges törtek tizedes tört alakja */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-15') && (
            <section>
              <SectionHeader id="g5-frac-sec-15" number={15} title="Közönséges törtek tizedes tört alakja" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört - tizedes átváltás elmélet"
                  subtitle="Nevezetes törtek, bővítés 10-re/100-ra/1000-re, írásbeli osztás és PDF"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-fraction-to-decimal-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Tört - tizedes kvíz és játékok"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g5-fraction-to-decimal-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-fraction-to-decimal-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 16: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-16') && (
            <section>
              <SectionHeader id="g5-frac-sec-16" number={16} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló tananyag"
                  subtitle="II. Törtek, tizedes törtek témazáró összefoglalás, szimulátor és PDF"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-chapter2-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Témazáró felkészítő kvíz"
                  subtitle="Átfogó témazáró teszt 3×30 feladattal, párosítóval és csoportosítóval"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-chapter2-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-chapter2-summary-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-geometry-intro') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Csoportosítások */}
          {(showAll || activeSubSectionId === 'g5-geom-grouping') && (
            <section>
              <SectionHeader id="g5-geom-grouping" number={1} title="Csoportosítások" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Csoportosítások elmélet"
                  subtitle="Tárgyak és alakzatok tulajdonságai, szempontok szerinti csoportosítás PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-grouping-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Csoportosítások kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧩"
                  onClick={() => onActivitySelect('g5-geom-grouping-quiz', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-geom-grouping-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Halmazok */}
          {(showAll || activeSubSectionId === 'g5-geom-sets') && (
            <section>
              <SectionHeader id="g5-geom-sets" number={2} title="Halmazok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Halmazok elmélet"
                  subtitle="Halmaz, alaphalmaz, részhalmaz, metszet, unió, Venn-diagram ábrázolás PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-sets-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Halmazok kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g5-geom-sets-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g5-geom-sets-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Test, felület, vonal, pont */}
          {(showAll || activeSubSectionId === 'g5-geom-bodies') && (
            <section>
              <SectionHeader id="g5-geom-bodies" number={3} title="Test, felület, vonal, pont" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Test, felület, vonal, pont elmélet"
                  subtitle="Térbeli testek, síkidomok, határfelületek, élek és csúcsok PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-bodies-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Test, felület, vonal, pont kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧊"
                  onClick={() => onActivitySelect('g5-geom-bodies-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-geom-bodies-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: A szög */}
          {(showAll || activeSubSectionId === 'g5-geom-angles') && (
            <section>
              <SectionHeader id="g5-geom-angles" number={4} title="A szög" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A szög elmélet"
                  subtitle="Szögszár, szögcsúcs, szögtartomány, szögfajták és szögmérés PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-angles-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="A szög kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g5-geom-angles-quiz', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-geom-angles-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Síkidomok, sokszögek */}
          {(showAll || activeSubSectionId === 'g5-geom-triangles') && (
            <section>
              <SectionHeader id="g5-geom-triangles" number={5} title="Síkidomok, sokszögek" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidomok, sokszögek elmélet"
                  subtitle="Sokszögek fogalma, átlók száma, háromszögek, négyszögek és a kör PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-triangles-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Síkidomok, sokszögek kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔺"
                  onClick={() => onActivitySelect('g5-geom-triangles-quiz', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-geom-triangles-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Testek építése, szemléltetése */}
          {(showAll || activeSubSectionId === 'g5-geom-building') && (
            <section>
              <SectionHeader id="g5-geom-building" number={6} title="Testek építése, szemléltetése" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Testek építése, szemléltetése elmélet"
                  subtitle="Kockaépítmények, alaprajz, nézetek és testek kiterítése PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-building-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Testek építése, szemléltetése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧱"
                  onClick={() => onActivitySelect('g5-geom-building-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g5-geom-building-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Egyenesek síkban, térben */}
          {(showAll || activeSubSectionId === 'g5-geom-lines') && (
            <section>
              <SectionHeader id="g5-geom-lines" number={7} title="Egyenesek síkban, térben" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenesek síkban, térben elmélet"
                  subtitle="Metsző, merőleges, párhuzamos és kitérő egyenesek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-lines-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Egyenesek síkban, térben kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g5-geom-lines-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-geom-lines-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Téglalap, négyzet */}
          {(showAll || activeSubSectionId === 'g5-geom-quads') && (
            <section>
              <SectionHeader id="g5-geom-quads" number={8} title="Téglalap, négyzet" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Téglalap, négyzet elmélet"
                  subtitle="Oldalak, szögek és átlók tulajdonságai, szimmetria PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-quads-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Téglalap, négyzet kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🟦"
                  onClick={() => onActivitySelect('g5-geom-quads-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g5-geom-quads-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-geom-summary') && (
            <section>
              <SectionHeader id="g5-geom-summary" number={9} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria összefoglalás elmélet"
                  subtitle="A teljes fejezet áttekintése és összefoglalása PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-geom-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Témazáró felkészítő kvíz"
                  subtitle="Átfogó témazáró teszt 3×30 feladattal, párosítóval és csoportosítóval"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-geom-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-geom-summary-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-measurements') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A hosszúság mérése */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-1') && (
            <section>
              <SectionHeader id="g5-meas-sec-1" number={1} title="A hosszúság mérése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A hosszúság mérése elmélet"
                  subtitle="Mértékegységek, váltószámok, interaktív vonalzó és becslés PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-length-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="A hosszúság mérése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g5-meas-length-quiz', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-meas-length-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Téglalap, négyzet kerülete */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-2') && (
            <section>
              <SectionHeader id="g5-meas-sec-2" number={2} title="Téglalap, négyzet kerülete" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A téglalap és a négyzet kerülete elmélet"
                  subtitle="Kerület fogalma, négyzet és téglalap képletei, interaktív szimuláció PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-perimeter-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Téglalap, négyzet kerülete kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g5-meas-perimeter-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-meas-perimeter-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: A terület mérése */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-3') && (
            <section>
              <SectionHeader id="g5-meas-sec-3" number={3} title="A terület mérése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A terület mérése elmélet"
                  subtitle="Terület fogalma, egységnégyzetek, m² és mezőgazdasági mértékek (a, ha, km²) PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-area-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="A terület mérése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔲"
                  onClick={() => onActivitySelect('g5-meas-area-quiz', topicId)}
                  icon={<Layout className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-meas-area-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Téglalap, négyzet területe */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-4') && (
            <section>
              <SectionHeader id="g5-meas-sec-4" number={4} title="Téglalap, négyzet területe" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Téglalap, négyzet területe elmélet"
                  subtitle="T = a · b és T = a · a képletek, rácsmodell, visszafelé számolás és szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-rectangle-area-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Téglalap, négyzet területe kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🟩"
                  onClick={() => onActivitySelect('g5-meas-rectangle-area-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g5-meas-rectangle-area-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Téglatest, kocka */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-5') && (
            <section>
              <SectionHeader id="g5-meas-sec-5" number={5} title="Téglatest, kocka" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Téglatest, kocka elmélet"
                  subtitle="Térbeli testek, csúcsok, élek, lapok, síkbeli hálók és 3D szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-cuboid-cube-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Téglatest, kocka kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => onActivitySelect('g5-meas-cuboid-cube-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-meas-cuboid-cube-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Téglatest, kocka felszíne */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-6') && (
            <section>
              <SectionHeader id="g5-meas-sec-6" number={6} title="Téglatest, kocka felszíne" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Téglatest, kocka felszíne elmélet"
                  subtitle="Képletek, lapok területe, nyitott dobozok, interaktív 3D szimulátor és PDF mentés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-surface-area-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Téglatest, kocka felszíne kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎁"
                  onClick={() => onActivitySelect('g5-meas-surface-area-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g5-meas-surface-area-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 7: A térfogat mérése */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-7') && (
            <section>
              <SectionHeader id="g5-meas-sec-7" number={7} title="A térfogat mérése" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A térfogat mérése elmélet"
                  subtitle="Egységkockák, köbmértékek, folyadékok űrmértéke és aranyszabályok PDF mentéssel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-volume-measure-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="A térfogat mérése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('g5-meas-volume-measure-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g5-meas-volume-measure-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Téglatest, kocka térfogata */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-8') && (
            <section>
              <SectionHeader id="g5-meas-sec-8" number={8} title="Téglatest, kocka térfogata" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Téglatest, kocka térfogata elmélet"
                  subtitle="Képletek (V = a·b·c, V = a³), alapterület és magasság, 3D víztartály szimulátor és PDF mentés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-cuboid-cube-volume-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Téglatest, kocka térfogata kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧊"
                  onClick={() => onActivitySelect('g5-meas-cuboid-cube-volume-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-meas-cuboid-cube-volume-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Gyakorlati feladatok */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-9') && (
            <section>
              <SectionHeader id="g5-meas-sec-9" number={9} title="Gyakorlati feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakorlati feladatok elmélet"
                  subtitle="Kerítésépítés, parkettázás, dobozcsomagolás, medencék, szobafelújítási szimulátor és PDF mentés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-practical-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Gyakorlati feladatok kvíz"
                  subtitle="30 életszerű feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🏡"
                  onClick={() => onActivitySelect('g5-meas-practical-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-meas-practical-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 10: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-meas-sec-10') && (
            <section>
              <SectionHeader id="g5-meas-sec-10" number={10} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás elmélet"
                  subtitle="Hosszúság, terület, felszín, térfogat és gyakorlat nagytablója szimulátorral és PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-meas-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Témazáró felkészítő kvíz"
                  subtitle="Átfogó témazáró teszt 3×30 feladattal, párosítóval és csoportosítóval"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-meas-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g5-meas-summary-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-proportion-problems') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A tömeg mérése, mértékegységei */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-1') && (
            <section>
              <SectionHeader id="g5-prop-sec-1" number={1} title="A tömeg mérése, mértékegységei" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A tömeg mérése elmélet"
                  subtitle="Mértékegységek, váltószámok (mg, g, dkg, kg, q, t), kétkarú mérleg és nettó-bruttó-tára PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-mass-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="A tömeg mérése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g5-mass-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-mass-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Az űrtartalom mérése, mértékegységei */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-2') && (
            <section>
              <SectionHeader id="g5-prop-sec-2" number={2} title="Az űrtartalom mérése, mértékegységei" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az űrtartalom mérése elmélet"
                  subtitle="Liter, deciliter, milliliter, hektoliter, a térfogat és tömeg kapcsolata PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-cap-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Az űrtartalom mérése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('g5-cap-quiz', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g5-cap-quiz')}
                />
                <ActivityPlaceholder
                  title="Űrmérték-váltó"
                  subtitle="Térfogat és űrmértékek átváltása"
                  type="Eszköz"
                  emoji="💧"
                  onClick={() => onActivitySelect('capacity-converter', topicId)}
                  icon={<Droplets className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az idő mérése, mértékegységei */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-3') && (
            <section>
              <SectionHeader id="g5-prop-sec-3" number={3} title="Az idő mérése, mértékegységei" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az idő mérése elmélet"
                  subtitle="Időegységek (s, min, h, nap), analóg és digitális óra, menetidők és naptár PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-time-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Az idő mérése kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="⏱️"
                  onClick={() => onActivitySelect('g5-time-quiz', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-time-quiz')}
                />
                <ActivityPlaceholder
                  title="Analóg Óra Szemléltető"
                  subtitle="Óra, perc leolvasása és interaktív beállítása"
                  type="Eszköz"
                  emoji="⏰"
                  onClick={() => onActivitySelect('analog-clock', topicId)}
                  icon={<Clock className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Mértékegység-átváltások */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-4') && (
            <section>
              <SectionHeader id="g5-prop-sec-4" number={4} title="Mértékegység-átváltások" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mértékegység-átváltások elmélet"
                  subtitle="Az átváltások aranyszabálya, 4 mennyiségcsalád létrája, tizedestörtek és laboratórium PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-conv-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Mértékegység-átváltások kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g5-conv-quiz', topicId)}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-conv-quiz')}
                />
                <ActivityPlaceholder
                  title="Mértékegység-váltó"
                  subtitle="Interaktív átváltó eszköz (hossz, tömeg, űrtartalom)"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('unit-converter', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Arányosságok, változó mennyiségek */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-5') && (
            <section>
              <SectionHeader id="g5-prop-sec-5" number={5} title="Arányosságok, változó mennyiségek" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Változó mennyiségek elmélet"
                  subtitle="Együtt változó és ellentétes adatok, táblázatok, egységárak és szimulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-var-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Változó mennyiségek kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g5-var-quiz', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-var-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Egyenes arányosság */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-6') && (
            <section>
              <SectionHeader id="g5-prop-sec-6" number={6} title="Egyenes arányosság" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenes arányosság elmélet"
                  subtitle="A hányados állandósága, hármasszabály 2 lépése, origó szabály és kalkulátor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-direct-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Egyenes arányosság kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => onActivitySelect('g5-direct-quiz', topicId)}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g5-direct-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Nyitott mondatok */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-7') && (
            <section>
              <SectionHeader id="g5-prop-sec-7" number={7} title="Nyitott mondatok" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nyitott mondatok elmélet"
                  subtitle="Egyenlőségek, egyenlőtlenségek és ismeretlenek"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-open-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Nyitott Mondatok Kvíz"
                  subtitle="Gyakorlás és igazsághalmaz keresése"
                  type="Kvíz"
                  emoji="🔤"
                  onClick={() => onActivitySelect('g5-open-quiz', topicId)}
                  icon={<Variable className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-open-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Keressük a megoldásokat! */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-8') && (
            <section>
              <SectionHeader id="g5-prop-sec-8" number={8} title="Keressük a megoldásokat!" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Megoldáskeresés elmélet"
                  subtitle="Lebontogatás, fordított műveletek és próbálgatás"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-sol-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Keressük a megoldásokat! Kvíz"
                  subtitle="Lebontás, ellenőrzés és gondoltam egy számra"
                  type="Kvíz"
                  emoji="🔍"
                  onClick={() => onActivitySelect('g5-sol-quiz', topicId)}
                  icon={<Search className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g5-sol-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Egyszerű szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-9') && (
            <section>
              <SectionHeader id="g5-prop-sec-9" number={9} title="Egyszerű szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyszerű szöveges feladatok elmélet"
                  subtitle="Az 5 lépéses stratégia és szakasos ábrák"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-simp-wp-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Egyszerű Szöveges Feladatok Kvíz"
                  subtitle="Gyakorlati feladatok és ellenőrzés"
                  type="Kvíz"
                  emoji="📝"
                  onClick={() => onActivitySelect('g5-simp-wp-quiz', topicId)}
                  icon={<FileText className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-simp-wp-quiz')}
                />
                <ActivityPlaceholder
                  title="Szöveges feladatok modul"
                  subtitle="Gyakorlati problémák és feladatmegoldó lépések"
                  type="Gyakorlás"
                  emoji="💡"
                  onClick={() => onActivitySelect('word-problems', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szöveges feladatok a hétköznapjainkban */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-10') && (
            <section>
              <SectionHeader id="g5-prop-sec-10" number={10} title="Szöveges feladatok a hétköznapjainkban" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hétköznapi szöveges feladatok elmélet"
                  subtitle="Vásárlás, forint kerekítés, receptek és utazás"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-daily-wp-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Hétköznapi Feladatok Kvíz"
                  subtitle="Vásárlás, utazás és receptek számításai"
                  type="Kvíz"
                  emoji="🛒"
                  onClick={() => onActivitySelect('g5-daily-wp-quiz', topicId)}
                  icon={<ShoppingCart className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g5-daily-wp-quiz')}
                />
                <ActivityPlaceholder
                  title="Pénzügyi és Vásárlási Számítások"
                  subtitle="Pénzkezelés, visszajáró és költségvetés"
                  type="Eszköz"
                  emoji="💰"
                  onClick={() => onActivitySelect('money-calculation', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-11') && (
            <section>
              <SectionHeader id="g5-prop-sec-11" number={11} title="Összefoglalás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló elmélet"
                  subtitle="VI. Mérés, arányosság és szöveges feladatok rendszerezése"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-wp-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Fejezeti Összefoglaló Kvíz"
                  subtitle="90 kérdéses átfogó tudáspróba 3 szinten"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-summary-wp-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-summary-wp-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-location-sequences') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A helymeghatározás szerepe környezetünkben */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-1') && (
            <section>
              <SectionHeader id="g5-loc-sec-1" number={1} title="A helymeghatározás szerepe környezetünkben" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A helymeghatározás szerepe elmélet"
                  subtitle="Tájékozódás a mindennapokban, címek, mozijegyek, égtájak és GPS PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-role-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="A helymeghatározás szerepe kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📍"
                  onClick={() => onActivitySelect('g5-loc-role-quiz', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-loc-role-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Helymeghatározás */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-2') && (
            <section>
              <SectionHeader id="g5-loc-sec-2" number={2} title="Helymeghatározás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Helymeghatározás négyzethálón elmélet"
                  subtitle="Oszlopok és sorok, sakktábla, Excel cellák, torpedó és Manhattan-távolság"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-grid-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Helymeghatározás kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🗺️"
                  onClick={() => onActivitySelect('g5-loc-grid-quiz', topicId)}
                  icon={<Grid3X3 className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g5-loc-grid-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: A derékszögű koordináta-rendszer */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-3') && (
            <section>
              <SectionHeader id="g5-loc-sec-3" number={3} title="A derékszögű koordináta-rendszer" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A derékszögű koordináta-rendszer elmélet"
                  subtitle="Tengelyek (abszcissza, ordináta), origó, síknegyedek és pontok tükrözése"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-coord-sys-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="A derékszögű koordináta-rendszer kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => onActivitySelect('g5-loc-coord-sys-quiz', topicId)}
                  icon={<LayoutGrid className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-loc-coord-sys-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Pontok ábrázolása */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-4') && (
            <section>
              <SectionHeader id="g5-loc-sec-4" number={4} title="Pontok ábrázolása" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pontok ábrázolása elmélet"
                  subtitle="Pontok felvétele és leolvasása lépésről lépésre, alakzatok és egyenesek"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-points-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Pontok ábrázolása kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📍"
                  onClick={() => onActivitySelect('g5-loc-points-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g5-loc-points-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Tájékozódás síkban, térben (kiegészítő tananyag) */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-5') && (
            <section>
              <SectionHeader id="g5-loc-sec-5" number={5} title="Tájékozódás síkban, térben (kiegészítő tananyag)" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tájékozódás síkban és térben elmélet"
                  subtitle="Dimenziók (1D, 2D, 3D), földgömb fokhálózata, magasságok és kockamodellek"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-spatial-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Tájékozódás síkban és térben kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🌐"
                  onClick={() => onActivitySelect('g5-loc-spatial-quiz', topicId)}
                  icon={<Globe className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-loc-spatial-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Ritmusok, díszítések */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-6') && (
            <section>
              <SectionHeader id="g5-loc-sec-6" number={6} title="Ritmusok, díszítések" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Ritmusok, díszítések elmélet"
                  subtitle="Alapszakasz, geometriai transzformációk, N-edik elem és díszítősorok"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-patterns-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Ritmusok, díszítések kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎨"
                  onClick={() => onActivitySelect('g5-loc-patterns-quiz', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-loc-patterns-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Keressünk összefüggéseket! */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-7') && (
            <section>
              <SectionHeader id="g5-loc-sec-7" number={7} title="Keressünk összefüggéseket!" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Keressünk összefüggéseket! elmélet"
                  subtitle="Számgépek, bemenet-kimenet táblázatok, inverz műveletek és gyufaszálak"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-relations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Keressünk összefüggéseket! kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔍"
                  onClick={() => onActivitySelect('g5-loc-relations-quiz', topicId)}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-loc-relations-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Sorozatok */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-8') && (
            <section>
              <SectionHeader id="g5-loc-sec-8" number={8} title="Sorozatok" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sorozatok elmélet"
                  subtitle="Tagok, kezdőérték, lépésközök, számtani és mértani sorozatok, hiányzó tagok"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-sequences-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Sorozatok kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-loc-sequences-quiz', topicId)}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g5-loc-sequences-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 9: Nevezetes, érdekes sorozatok */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-9') && (
            <section>
              <SectionHeader id="g5-loc-sec-9" number={9} title="Nevezetes, érdekes sorozatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nevezetes sorozatok elmélet"
                  subtitle="Páros-páratlan titkok, négyzetszámok, háromszögszámok és Fibonacci a természetben"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-famous-seq-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Nevezetes sorozatok kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🌀"
                  onClick={() => onActivitySelect('g5-loc-famous-seq-quiz', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g5-loc-famous-seq-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 10: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-loc-sec-10') && (
            <section>
              <SectionHeader id="g5-loc-sec-10" number={10} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló elmélet"
                  subtitle="A 4 alappillér: koordináták, díszítősorok, számgépek és számsorozatok"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-loc-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Összefoglaló nagyteszt"
                  subtitle="90 feladat 3 szinten (szintenként 30), fejezeti párosító és csoportosító nagyteszt"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-loc-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g5-loc-summary-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-stats') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Játékok */}
          {(showAll || activeSubSectionId === 'g5-stats-sec-1') && (
            <section>
              <SectionHeader id="g5-stats-sec-1" number={1} title="Játékok" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Játékok és logika elmélet"
                  subtitle="A logikai készlet 4 tulajdonsága, különbségi játékok, Venn- és Carroll-diagramok és skatulya-elv PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-games-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Játékok és logika kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g5-games-quiz', topicId)}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-games-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Táblázatok, grafikonok */}
          {(showAll || activeSubSectionId === 'g5-stats-sec-2') && (
            <section>
              <SectionHeader id="g5-stats-sec-2" number={2} title="Táblázatok, grafikonok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Táblázatok, grafikonok elmélet"
                  subtitle="Oszlop-, vonal- és kördiagramok, skálák, arányok és a félrevezető grafikonok leleplezése PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-tables-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Táblázatok, grafikonok kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g5-tables-quiz', topicId)}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-tables-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Adatgyűjtés, az adatok ábrázolása */}
          {(showAll || activeSubSectionId === 'g5-stats-sec-3') && (
            <section>
              <SectionHeader id="g5-stats-sec-3" number={3} title="Adatgyűjtés, az adatok ábrázolása" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Adatgyűjtés és ábrázolás elmélet"
                  subtitle="Adatgyűjtés módszerei, strigulázás, gyakorisági táblázat és diagramkészítés lépései PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-data-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Adatgyűjtés és ábrázolás kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📝"
                  onClick={() => onActivitySelect('g5-data-quiz', topicId)}
                  icon={<Table className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g5-data-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Átlag és tulajdonságai */}
          {(showAll || activeSubSectionId === 'g5-stats-sec-4') && (
            <section>
              <SectionHeader id="g5-stats-sec-4" number={4} title="Átlag és tulajdonságai" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Átlag és tulajdonságai elmélet"
                  subtitle="A számtani közép kiszámítása, tulajdonságai, kiegyenlítés és szélsőséges értékek hatása PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-average-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Átlag és tulajdonságai kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g5-average-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-average-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Lehetetlen, lehetséges, biztos */}
          {(showAll || activeSubSectionId === 'g5-stats-sec-5') && (
            <section>
              <SectionHeader id="g5-stats-sec-5" number={5} title="Lehetetlen, lehetséges, biztos" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Valószínűség elmélet"
                  subtitle="Események minősítése, esélyek, kocka- és érmekísérletek, tévhitek elkerülése PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-prob-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Valószínűség kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g5-prob-quiz', topicId)}
                  icon={<Dices className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g5-prob-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-stats-sec-6') && (
            <section>
              <SectionHeader id="g5-stats-sec-6" number={6} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Statisztika összefoglaló elmélet"
                  subtitle="A teljes VII. témakör nagyszintézise interaktív statisztikai irányítópulttal és PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-stats-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Statisztika összefoglaló nagyteszt"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-stats-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g5-stats-summary-quiz')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-year-end-summary') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Természetes és egész számok, műveletek */}
          {(showAll || activeSubSectionId === 'g5-summary-sec-1') && (
            <section>
              <SectionHeader id="g5-summary-sec-1" number={1} title="Természetes és egész számok, műveletek" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok és műveletek elmélet"
                  subtitle="Egész számok, római számok, negatív számok, műveleti sorrend, kerekítés és becslés PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-numbers-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Számok és műveletek kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g5-summary-numbers-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g5-summary-numbers-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Törtek és tizedestörtek */}
          {(showAll || activeSubSectionId === 'g5-summary-sec-2') && (
            <section>
              <SectionHeader id="g5-summary-sec-2" number={2} title="Törtek és tizedestörtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek és tizedestörtek elmélet"
                  subtitle="Közönséges és tizedes törtek, átváltások, alapműveletek és műveleti tulajdonságok PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-fractions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Törtek és tizedestörtek kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g5-summary-fractions-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g5-summary-fractions-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Geometria és mérések */}
          {(showAll || activeSubSectionId === 'g5-summary-sec-3') && (
            <section>
              <SectionHeader id="g5-summary-sec-3" number={3} title="Geometria és mérések" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria és mérések elmélet"
                  subtitle="Síkidomok, testek, szögek, kerület, terület, felszín és térfogat számítása PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-geometry-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Geometria és mérések kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g5-summary-geometry-quiz', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g5-summary-geometry-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Helymeghatározás, sorozatok és arányosság */}
          {(showAll || activeSubSectionId === 'g5-summary-sec-4') && (
            <section>
              <SectionHeader id="g5-summary-sec-4" number={4} title="Helymeghatározás, sorozatok és arányosság" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sorozatok és arányosság elmélet"
                  subtitle="Koordináta-rendszer, számsorozatok szabályai, egyenes arányosság és szöveges feladatok PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-sequences-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Sorozatok és arányosság kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g5-summary-sequences-quiz', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g5-summary-sequences-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Adatgyűjtés, statisztika és valószínűség */}
          {(showAll || activeSubSectionId === 'g5-summary-sec-5') && (
            <section>
              <SectionHeader id="g5-summary-sec-5" number={5} title="Adatgyűjtés, statisztika és valószínűség" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Statisztika és valószínűség elmélet"
                  subtitle="Diagramok elemzése, számtani közép (átlag), esélyek minősítése és kísérletek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-stats-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Statisztika és valószínűség kvíz"
                  subtitle="30 feladat 3 szinten, párosító és csoportosító játékkal"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g5-summary-stats-quiz', topicId)}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g5-summary-stats-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 6: Átfogó év végi tudáspróba */}
          {(showAll || activeSubSectionId === 'g5-summary-sec-6') && (
            <section>
              <SectionHeader id="g5-summary-sec-6" number={6} title="Átfogó év végi tudáspróba" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Év végi átfogó szintézis"
                  subtitle="A teljes 5. osztályos matematika tananyag nagyszintézise, aranyszabályai és képtára PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g5-summary-final-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Nagy év végi záróteszt"
                  subtitle="Átfogó év végi nagyteszt 3 szinten, párosító és csoportosító vizsgafeladatokkal"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g5-summary-final-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g5-summary-final-quiz')}
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
        grade={5}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade5View;
