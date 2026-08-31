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
                  title="Római számok"
                  subtitle="Számok története és római számírás"
                  type="Hamarosan"
                  emoji="🏛️"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
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
                  title="Építőkockás összehasonlítás"
                  subtitle="Számok összehasonlítása kockákkal és relációjelekkel"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('g5-building-blocks-comparison', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
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
                  title="Számok kiolvasása"
                  subtitle="Számcsoportok és osztályok helyes leolvasása"
                  type="Hamarosan"
                  emoji="🗣️"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
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
                  title="Számok helyesírása"
                  subtitle="Kétezres szabály és kötőjelezés"
                  type="Hamarosan"
                  emoji="✍️"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="violet"
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
                  title="Számrendszerek"
                  subtitle="Tízes és kettes (bináris) számrendszer"
                  type="Hamarosan"
                  emoji="💻"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="cyan"
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
                  title="Számegyenes"
                  subtitle="Számok ábrázolása és leolvasása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="emerald"
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
                  title="Kerekítés és Becslés"
                  subtitle="Tízesekre, százasokra, ezresekre kerekítés"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
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
                  title="Írásbeli összeadás"
                  subtitle="Többjegyű számok összeadása átlépéssel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
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
                  title="Írásbeli kivonás"
                  subtitle="Pótlási elv és átlépések gyakorlása"
                  type="Hamarosan"
                  emoji="➖"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
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
                  title="Írásbeli szorzás"
                  subtitle="Egy- és kétjegyű szorzóval"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
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
                  title="Írásbeli osztás"
                  subtitle="Lépcsős osztás levezetése"
                  type="Eszköz"
                  emoji="➗"
                  onClick={() => onActivitySelect('long-division', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás vizuálisan"
                  subtitle="Helyiérték-blokkokkal és szétbontással"
                  type="Eszköz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('manipulative-division', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
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
                  title="Műveleti sorrend"
                  subtitle="Zárójelek és műveletek elsőbbsége"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="purple"
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
                  title="Negatív számok"
                  subtitle="Hőmérő, adósság és magasságok"
                  type="Hamarosan"
                  emoji="❄️"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="cyan"
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
                  title="Ellentett és Abszolút Érték"
                  subtitle="Nullától mért távolság és szimmetria"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="orange"
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
                  title="Számegyenes összeadás/kivonás"
                  subtitle="Előjeles számok összeadása és kivonása"
                  type="Eszköz"
                  emoji="➖"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
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
                  title="Összefoglaló felkészítő"
                  subtitle="I. Az egész számok témazáró összefoglalás"
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

    if (topicId === 'g5-fractions-decimals') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Ismerkedés a törtekkel */}
          {(showAll || activeSubSectionId === 'g5-frac-sec-1') && (
            <section>
              <SectionHeader id="g5-frac-sec-1" number={1} title="Ismerkedés a törtekkel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek alapjai"
                  subtitle="Tört fogalma, számláló, nevező"
                  type="Teszt"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g5-fractions-quiz', topicId)}
                  icon={<Pizza className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Tört Képpárosító"
                  subtitle="Vizuális törtek és törtszámok"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('g5-fraction-visual-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
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
                  title="Törtek Vizualizáló"
                  subtitle="Törtek bővítése és egyszerűsítése"
                  type="Eszköz"
                  emoji="🔍"
                  onClick={() => onActivitySelect('fraction-visualizer', topicId)}
                  icon={<Search className="w-6 h-6" />}
                  color="amber"
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
                  title="Számegyenes törtbeosztással"
                  subtitle="Vegyes törtek és áltörtek ábrázolása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
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
                  title="Azonos nevezőjű törtek műveletei"
                  subtitle="Összeadás és kivonás azonos nevezővel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
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
                  title="Közös nevező és műveletek"
                  subtitle="Különböző nevezőjű törtek összeadása/kivonása"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
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
                  title="Tört szorzása egész számmal"
                  subtitle="Számláló szorzása és egyszerűsítés"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
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
                  title="Tört osztása egész számmal"
                  subtitle="Számláló osztása és nevező szorzása"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
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
                  title="Műveleti sorrend törtekkel"
                  subtitle="Zárójeles törtszámítások"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="violet"
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
                  title="Törtek Modul"
                  subtitle="Közönséges törtek átfogó interaktív gyakorlása"
                  type="Gyakorlás"
                  emoji="📚"
                  onClick={() => onActivitySelect('g5-fractions-module', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
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
                  title="Tizedestörtek Kvíz"
                  subtitle="Helyiértékek és fogalmak"
                  type="Teszt"
                  emoji="🪙"
                  onClick={() => onActivitySelect('decimal-fractions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Tizedestört Korongok"
                  subtitle="Helyiértékek átváltása korongokkal"
                  type="Eszköz"
                  emoji="🪙"
                  onClick={() => onActivitySelect('decimal-fractions', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="yellow"
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
                  title="Tizedesvessző-eltoló"
                  subtitle="Szorzás és osztás 10, 100, 1000-rel"
                  type="Eszköz"
                  emoji="↔️"
                  onClick={() => onActivitySelect('decimal-shifter', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
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
                  title="Írásbeli összeadás/kivonás"
                  subtitle="Tizedesvessző a vessző alá"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
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
                  title="Szorzás Kvíz"
                  subtitle="Tizedestört szorzása egész számmal"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => onActivitySelect('decimal-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Szorzás Párosító"
                  subtitle="Interaktív szorzópárosító játék"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('decimal-multiplication-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="green"
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
                  title="Osztás Kvíz"
                  subtitle="Tizedestört osztása egész számmal"
                  type="Teszt"
                  emoji="➗"
                  onClick={() => onActivitySelect('decimal-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás Párosító"
                  subtitle="Interaktív osztópárosító játék"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('decimal-division-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
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
                  title="Tört - Tizedes Átváltó"
                  subtitle="Közönséges tört és tizedestört párosító"
                  type="Játék"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g5-fraction-to-decimal-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
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
                  title="Összefoglaló felkészítő"
                  subtitle="II. Törtek, tizedes törtek témazáró összefoglalás"
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

    if (topicId === 'g5-geometry-intro') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {(showAll || activeSubSectionId === 'g5-geom-grouping') && (
            <section>
              <SectionHeader number={1} title="Csoportosítások" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tárgyak csoportosítása"
                  subtitle="Állatok, járművek, anyagok"
                  type="Játék"
                  emoji="📦"
                  onClick={() => onActivitySelect('grouping-game', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Számok csoportosítása"
                  subtitle="Páros, prímek, oszthatóság"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => onActivitySelect('number-grouping-game', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-sets') && (
            <section>
              <SectionHeader number={2} title="Halmazok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Venn-diagram elhelyezés"
                  subtitle="Tárgyak és tulajdonságok"
                  type="Játék"
                  emoji="🍎"
                  onClick={() => onActivitySelect('venn-diagram-game', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Venn-diagram (Számhalmazok)"
                  subtitle="Oszthatóság, prímek, alaphalmaz"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => onActivitySelect('venn-diagram-game', topicId, -2)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Hogy mondanád?"
                  subtitle="Venn-diagramok leírása"
                  type="Kvíz"
                  emoji="💬"
                  onClick={() => onActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Venn-diagram leolvasás (Tárgyas)"
                  subtitle="Melyik hova tartozik?"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => onActivitySelect('venn-reading-objects', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Venn-diagram leolvasás (Számok)"
                  subtitle="Számok tulajdonságai"
                  type="Játék"
                  emoji="🧐"
                  onClick={() => onActivitySelect('venn-reading-numbers', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-bodies') && (
            <section>
              <SectionHeader number={3} title="Test, felület, vonal, pont" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D alakzatok"
                  type="Kezdés"
                  onClick={() => onActivitySelect('shape-classification', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-angles') && (
            <section>
              <SectionHeader number={4} title="A szög" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Szögtípusok felismerése"
                  type="Gyakorlás"
                  onClick={() => onActivitySelect('angle-matching', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-triangles') && (
            <section>
              <SectionHeader number={5} title="Síkidomok, sokszögek" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek"
                  subtitle="Csoportosítás tulajdonságok szerint"
                  type="Kezdés"
                  onClick={() => onActivitySelect('triangle-classification', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-building') && (
            <section>
              <SectionHeader number={6} title="Testek építése, szemléltetése" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térfogat és felszín"
                  subtitle="Testek kiterítése és feltöltése"
                  type="Eszköz"
                  onClick={() => onActivitySelect('volume-surface', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-lines') && (
            <section>
              <SectionHeader number={7} title="Egyenesek síkban, térben" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenesek helyzete"
                  subtitle="Párhuzamos és merőleges"
                  type="Gyakorlás"
                  onClick={() => onActivitySelect('line-relationships', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Alapszerkesztés"
                  subtitle="Körző és vonalzó használata"
                  type="Eszköz"
                  onClick={() => onActivitySelect('construction', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-quads') && (
            <section>
              <SectionHeader number={8} title="Téglalap, négyzet" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Négyszögek fajtái"
                  subtitle="Négyszögek felismerése"
                  type="Kezdés"
                  onClick={() => onActivitySelect('quadrilateral-classification', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {(showAll || activeSubSectionId === 'g5-geom-summary') && (
            <section>
              <SectionHeader number={9} title="Összefoglalás" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes tükrözés teszt"
                  subtitle="Ellenőrizd a tudásod!"
                  type="Teszt"
                  onClick={() => onActivitySelect('reflection-quiz', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="purple"
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
                  title="Mértékegység-váltó"
                  subtitle="Hosszúságmértékek átváltása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('unit-converter', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
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
                  title="Kerület Kvíz"
                  subtitle="Téglalap és négyzet kerületszámítása"
                  type="Teszt"
                  emoji="📐"
                  onClick={() => onActivitySelect('perimeter-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="emerald"
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
                  title="Terület Mértékegységek"
                  subtitle="Területmértékek és átváltások kvíz"
                  type="Teszt"
                  emoji="🔲"
                  onClick={() => onActivitySelect('area-conversion-quiz', topicId)}
                  icon={<Layout className="w-6 h-6" />}
                  color="amber"
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
                  title="Területszámítás Kvíz"
                  subtitle="Téglalap és négyzet területe és hiányzó oldala"
                  type="Teszt"
                  emoji="🟩"
                  onClick={() => onActivitySelect('area-calc-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="orange"
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
                  title="Térbeli alakzatok"
                  subtitle="Téglatest és kocka csúcsai, élei, lapjai"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Box className="w-6 h-6" />}
                  color="purple"
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
                  title="Felszínszámítás Kvíz"
                  subtitle="Téglatest és kocka határoló lapjai és felszíne"
                  type="Teszt"
                  emoji="🎁"
                  onClick={() => onActivitySelect('surface-area-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Térfogat és felszín szemléltető"
                  subtitle="Testek kiterítése és hálója"
                  type="Eszköz"
                  emoji="📦"
                  onClick={() => onActivitySelect('volume-surface', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="rose"
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
                  title="Űrmérték-váltó"
                  subtitle="Térfogat- és űrmértékek átváltása"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('capacity-converter', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
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
                  title="Térfogatszámítás Kvíz"
                  subtitle="Téglatest és kocka térfogata egységkockákkal"
                  type="Teszt"
                  emoji="🧊"
                  onClick={() => onActivitySelect('volume-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
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
                  title="Gyakorlati számítások"
                  subtitle="Valós életbeli mérési és területszámítási feladatok"
                  type="Hamarosan"
                  emoji="🏠"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
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
                  title="Összefoglaló felkészítő"
                  subtitle="IV. Hosszúság, terület, térfogat összefoglalás"
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

    if (topicId === 'g5-proportion-problems') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A tömeg mérése, mértékegységei */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-1') && (
            <section>
              <SectionHeader id="g5-prop-sec-1" number={1} title="A tömeg mérése, mértékegységei" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tömegmértékek Kvíz"
                  subtitle="Tömeg mértékegységei és átváltásai"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="blue"
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
                  title="Űrmérték-váltó"
                  subtitle="Térfogat és űrmértékek átváltása"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('capacity-converter', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Űrtartalom Kvíz"
                  subtitle="Folyadékok mérése és mértékváltások"
                  type="Hamarosan"
                  emoji="🫗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
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
                  title="Analóg Óra Szemléltető"
                  subtitle="Óra, perc leolvasása és beállítása"
                  type="Eszköz"
                  emoji="⏰"
                  onClick={() => onActivitySelect('analog-clock', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Időmérés Kvíz"
                  subtitle="Időtartamok számítása és átváltások"
                  type="Hamarosan"
                  emoji="⏳"
                  disabled={true}
                  icon={<Timer className="w-6 h-6" />}
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
                  title="Mértékegység-váltó"
                  subtitle="Hossz, tömeg és űr mértékegységek"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('unit-converter', topicId)}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Összetett Átváltások"
                  subtitle="Vegyes mértékegységek átváltása és számolás"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<RefreshCw className="w-6 h-6" />}
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
                  title="Változó mennyiségek"
                  subtitle="Összefüggések táblázatokban és mindennapi helyzetekben"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="indigo"
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
                  title="Egyenes Arányosság Kvíz"
                  subtitle="Hármasszabály és egységre következtetés"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="violet"
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
                  title="Nyitott Mondatok Kvíz"
                  subtitle="Egyenlőségek, egyenlőtlenségek és ismeretlenek"
                  type="Hamarosan"
                  emoji="🔤"
                  disabled={true}
                  icon={<Variable className="w-6 h-6" />}
                  color="purple"
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
                  title="Lebontogatási Módszer"
                  subtitle="Egyenletek megoldása fordított műveletekkel"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Search className="w-6 h-6" />}
                  color="pink"
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
                  title="Szöveges feladatok modul"
                  subtitle="Gyakorlati problémák és feladatmegoldó lépések"
                  type="Indítás"
                  emoji="📝"
                  onClick={() => onActivitySelect('word-problems', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Szöveges Feladatok Kvíz"
                  subtitle="Kvíz feladatok megoldása lépésről lépésre"
                  type="Teszt"
                  emoji="✍️"
                  onClick={() => onActivitySelect('word-problems-quiz', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
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
                  title="Pénzügyi és Vásárlási Számítások"
                  subtitle="Pénzkezelés, visszajáró és költségvetés"
                  type="Eszköz"
                  emoji="💰"
                  onClick={() => onActivitySelect('money-calculation', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Hétköznapi Feladatok Kvíz"
                  subtitle="Vásárlás, utazás és receptek számításai"
                  type="Hamarosan"
                  emoji="🛒"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g5-prop-sec-11') && (
            <section>
              <SectionHeader id="g5-prop-sec-11" number={11} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="VI. Mérés, arányosság, szöveges feladatok összefoglalás"
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
                  title="Környezeti tájékozódás"
                  subtitle="Címek, házszámok és térképi tájékozódás"
                  type="Hamarosan"
                  emoji="🗺️"
                  disabled={true}
                  icon={<Compass className="w-6 h-6" />}
                  color="blue"
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
                  title="Torpedó Játék"
                  subtitle="Tájékozódás a rácshálón és mezők azonosítása"
                  type="Játék"
                  emoji="⚓"
                  onClick={() => onActivitySelect('torpedo-game', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Helymeghatározás Kvíz"
                  subtitle="Rácsháló, oszlopok és sorok azonosítása"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Grid3X3 className="w-6 h-6" />}
                  color="indigo"
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
                  title="Koordináta-rendszer"
                  subtitle="Tengelyek, origó és síknegyedek alapjai"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<LayoutGrid className="w-6 h-6" />}
                  color="purple"
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
                  title="Pontábrázolás Kvíz"
                  subtitle="Rendezett számpárok leolvasása és megadása"
                  type="Hamarosan"
                  emoji="📍"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
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
                  title="Térbeli tájékozódás"
                  subtitle="3D pozíciók és földrajzi fokhálózat"
                  type="Hamarosan"
                  emoji="🌐"
                  disabled={true}
                  icon={<Globe className="w-6 h-6" />}
                  color="teal"
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
                  title="Sorminták és Ritmusok"
                  subtitle="Ismétlődő motívumok és geometriai minták"
                  type="Hamarosan"
                  emoji="🎨"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="emerald"
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
                  title="Szabálykereső"
                  subtitle="Bemenet-kimenet táblázatok és számgépek"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="amber"
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
                  title="Számsorozatok Kvíz"
                  subtitle="Képzési szabályok, folytatás és hiányzó tagok"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="orange"
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
                  title="Híres sorozatok"
                  subtitle="Négyzetszámok, háromszögszámok és Fibonacci"
                  type="Hamarosan"
                  emoji="🌀"
                  disabled={true}
                  icon={<Brain className="w-6 h-6" />}
                  color="rose"
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
                  title="Összefoglaló felkészítő"
                  subtitle="V. Helymeghatározás, sorozatok összefoglalás"
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
                  title="Venn-diagram (Tárgyak)"
                  subtitle="Tárgyak és formák szétválogatása"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => onActivitySelect('venn-reading-objects', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Venn-diagram (Számok)"
                  subtitle="Számhalmazok és tulajdonságok"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => onActivitySelect('venn-reading-numbers', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Logikai Készlet"
                  subtitle="Formák, színek, méretek válogatása"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('logic-blocks', topicId)}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Venn-diagram Kvíz"
                  subtitle="Halmazok és metszetek leolvasása"
                  type="Teszt"
                  emoji="📋"
                  onClick={() => onActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<CheckCircle2 className="w-6 h-6" />}
                  color="emerald"
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
                  title="Grafikonok és Táblázatok"
                  subtitle="Oszlop-, vonal- és kördiagramok leolvasása"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="blue"
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
                  title="Adatgyűjtés és Strigulázás"
                  subtitle="Gyakorisági táblázat és diagramkészítés"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Table className="w-6 h-6" />}
                  color="cyan"
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
                  title="Átlagszámítás Kvíz"
                  subtitle="Számtani közép számítása és tulajdonságai"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
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
                  title="Valószínűségi Játékok"
                  subtitle="Események minősítése, kocka- és érmekísérletek"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="rose"
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
                  title="Összefoglaló felkészítő"
                  subtitle="VII. Adatgyűjtés, statisztika összefoglalás"
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
        grade={5}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade5View;
