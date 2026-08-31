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
  Boxes,
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
  HelpCircle,
  Layers,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  Network,
  Pencil,
  Percent,
  PieChart,
  Pizza,
  Ruler,
  Scale,
  Scissors,
  Section,
  Shapes,
  Share2,
  Sparkle,
  Sparkles,
  Split,
  Target,
  Thermometer,
  TrendingUp,
  Trophy,
  Zap
} from 'lucide-react';

export const Grade3View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
    if (topicId === 'g3-count-100') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számok 100-ig */}
          {(showAll || activeSubSectionId === 'g3-count-sec-1') && (
            <section>
              <SectionHeader id="g3-count-sec-1" number={1} title="Számok 100-ig" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Gyűjtsd össze a számokat a táblán!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Építőkockák"
                  subtitle="Számok összehasonlítása és helyiértékek"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Számegyenes"
                  subtitle="Számok helye és számszomszédok 100-ig"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Számok 100-ig Kvíz"
                  subtitle="Helyiérték, kerekítés és páros-páratlan"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Összeadás és kivonás */}
          {(showAll || activeSubSectionId === 'g3-count-sec-2') && (
            <section>
              <SectionHeader id="g3-count-sec-2" number={2} title="Összeadás és kivonás" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás Kvíz"
                  subtitle="Összeadás gyakorlása 100-as számkörben"
                  type="Teszt"
                  emoji="➕"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Kivonás Kvíz"
                  subtitle="Kivonás gyakorlása tízesátlépéssel"
                  type="Teszt"
                  emoji="➖"
                  onClick={() => onActivitySelect('grade3-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Játék"
                  subtitle="Számolj helyesen és építs magas tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Szorzás és osztás */}
          {(showAll || activeSubSectionId === 'g3-count-sec-3') && (
            <section>
              <SectionHeader id="g3-count-sec-3" number={3} title="Szorzás és osztás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás Kvíz"
                  subtitle="Szorzótábla gyakorlása 1-től 10-ig"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => onActivitySelect('grade3-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Osztás Kvíz"
                  subtitle="Bennfoglalás és osztás 100-as számkörben"
                  type="Teszt"
                  emoji="➗"
                  onClick={() => onActivitySelect('grade3-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 4: Maradékos osztás */}
          {(showAll || activeSubSectionId === 'g3-count-sec-4') && (
            <section>
              <SectionHeader id="g3-count-sec-4" number={4} title="Maradékos osztás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Maradékos Osztás Kvíz"
                  subtitle="Osztás maradékkal és ellenőrzés"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g3-count-sec-5') && (
            <section>
              <SectionHeader id="g3-count-sec-5" number={5} title="Szöveges feladatok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges Feladatok"
                  subtitle="Életszerű feladatok megoldása lépésről lépésre"
                  type="Hamarosan"
                  emoji="📖"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 6: A műveletek sorrendje */}
          {(showAll || activeSubSectionId === 'g3-count-sec-6') && (
            <section>
              <SectionHeader id="g3-count-sec-6" number={6} title="A műveletek sorrendje" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Sorrend Kvíz"
                  subtitle="Szorzás, osztás, összeadás és kivonás rangsora"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 7: A zárójel használata */}
          {(showAll || activeSubSectionId === 'g3-count-sec-7') && (
            <section>
              <SectionHeader id="g3-count-sec-7" number={7} title="A zárójel használata" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Zárójelek Használata"
                  subtitle="Műveleti sorrend módosítása zárójellel"
                  type="Hamarosan"
                  emoji="🧩"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 8: Megálló */}
          {(showAll || activeSubSectionId === 'g3-count-sec-8') && (
            <section>
              <SectionHeader id="g3-count-sec-8" number={8} title="Megálló (Összefoglalás)" color="red" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapműveletek Kvíz"
                  subtitle="Összetett műveleti gyakorlás 100-ig"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="red"
                />
                <ActivityPlaceholder
                  title="Pénzszámolás Játék"
                  subtitle="Érmék és bankjegyek felismerése, fizetés"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Tudáspróba Kvíz"
                  subtitle="Összefoglaló teszt az I. fejezetből"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-roman-numbers') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A római számjegyek és alapszabályok */}
          {(showAll || activeSubSectionId === 'g3-roman-sec-1') && (
            <section>
              <SectionHeader id="g3-roman-sec-1" number={1} title="A római számjegyek és alapszabályok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Római Számok Alapjai"
                  subtitle="I, V, X, L, C jelek és a 3-as szabály"
                  type="Hamarosan"
                  emoji="🏛️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Összeadás és Kivonás Elve"
                  subtitle="Helyes sorrend és alapszabályok gyakorlása"
                  type="Hamarosan"
                  emoji="📜"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Római számok írása és olvasása 100-ig */}
          {(showAll || activeSubSectionId === 'g3-roman-sec-2') && (
            <section>
              <SectionHeader id="g3-roman-sec-2" number={2} title="Római számok írása és olvasása 100-ig" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Átváltás Arab és Római Között"
                  subtitle="Számok felbontása tízesekre és egyesekre"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Rendezés és Számszomszédok"
                  subtitle="Római számok nagyság szerinti sorrendje"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Római számok a mindennapokban és fejtörők */}
          {(showAll || activeSubSectionId === 'g3-roman-sec-3') && (
            <section>
              <SectionHeader id="g3-roman-sec-3" number={3} title="Római számok a mindennapokban és fejtörők" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Római Órák és Fejezetek"
                  subtitle="Óralapok leolvasása és uralkodók sorszáma"
                  type="Hamarosan"
                  emoji="⏱️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Gyufarejtvények"
                  subtitle="Logikai fejtörők és egyenlőségek javítása"
                  type="Hamarosan"
                  emoji="🧩"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-count-200') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számok 200-ig */}
          {(showAll || activeSubSectionId === 'g3-count200-sec-1') && (
            <section>
              <SectionHeader id="g3-count200-sec-1" number={1} title="Számok 200-ig" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Építőkockák 200-ig"
                  subtitle="Számok felépítése és helyiérték-táblázat"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Számok 200-ig Kvíz"
                  subtitle="Helyiérték, alaki és valódi érték"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Számok helye a számegyenesen */}
          {(showAll || activeSubSectionId === 'g3-count200-sec-2') && (
            <section>
              <SectionHeader id="g3-count200-sec-2" number={2} title="Számok helye a számegyenesen" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes 200-ig"
                  subtitle="Tájékozódás és léptékek a számegyenesen"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Gyűjtsd a számokat a táblán 200-ig!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Rendezés és Összehasonlítás"
                  subtitle="Számok növekvő és csökkenő sorrendje"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Számszomszédok, kerekítés */}
          {(showAll || activeSubSectionId === 'g3-count200-sec-3') && (
            <section>
              <SectionHeader id="g3-count200-sec-3" number={3} title="Számszomszédok, kerekítés" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számszomszédok 200-ig"
                  subtitle="Egyes, tízes és százas szomszédok"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Kerekítés Tízesekre és Százasokra"
                  subtitle="Kerekítés szabályai a 200-as számkörben"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Összeadás és kivonás */}
          {(showAll || activeSubSectionId === 'g3-count200-sec-4') && (
            <section>
              <SectionHeader id="g3-count200-sec-4" number={4} title="Összeadás és kivonás" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás 200-ig"
                  subtitle="Összeadás kerek tízesekkel és átlépéssel"
                  type="Teszt"
                  emoji="➕"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Kivonás 200-ig"
                  subtitle="Kivonás és kiegészítés 200-ra"
                  type="Teszt"
                  emoji="➖"
                  onClick={() => onActivitySelect('grade3-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Játék"
                  subtitle="Számolj helyesen és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szorzás és osztás */}
          {(showAll || activeSubSectionId === 'g3-count200-sec-5') && (
            <section>
              <SectionHeader id="g3-count200-sec-5" number={5} title="Szorzás és osztás" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerek Tízesek Szorzása"
                  subtitle="Szorzótáblára épülő szorzások 200-ig"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => onActivitySelect('grade3-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Kerek Tízesek Osztása"
                  subtitle="Osztás és bennfoglalás 200-as számkörben"
                  type="Teszt"
                  emoji="➗"
                  onClick={() => onActivitySelect('grade3-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 6: Megálló */}
          {(showAll || activeSubSectionId === 'g3-count200-sec-6') && (
            <section>
              <SectionHeader id="g3-count200-sec-6" number={6} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="200-as Számkör Tudáspróba"
                  subtitle="Összetett műveleti és számfogalmi feladatok"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Pénzszámolás 200 Ft-ig"
                  subtitle="Fizetés és visszajáró számítása 200 Ft-ig"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Záró Teszt"
                  subtitle="Összefoglaló kvíz a III. fejezetből"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-measurements-1') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Mit mivel mérünk? */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-1') && (
            <section>
              <SectionHeader id="g3-meas-sec-1" number={1} title="Mit mivel mérünk?" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mérőeszközök Párosító"
                  subtitle="Mennyiségek és eszközök felismerése"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Mértékegység Kvíz"
                  subtitle="Mértékegységek helyes megválasztása"
                  type="Hamarosan"
                  emoji="📏"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: A tömeg mérése */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-2') && (
            <section>
              <SectionHeader id="g3-meas-sec-2" number={2} title="A tömeg mérése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mérleg Szimuláció"
                  subtitle="Kétkarú és digitális mérleg használata"
                  type="Eszköz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('scale-tool', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Tömegmérés Kvíz"
                  subtitle="g, dkg, kg, t átváltások és feladatok"
                  type="Teszt"
                  emoji="📦"
                  onClick={() => onActivitySelect('measurement-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az űrtartalom mérése */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-3') && (
            <section>
              <SectionHeader id="g3-meas-sec-3" number={3} title="Az űrtartalom mérése" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Űrtartalom Szemléltető"
                  subtitle="Folyadékok mérése mérőhengerekkel"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('water-measurement-tool', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="sky"
                />
                <ActivityPlaceholder
                  title="Folyadékok Mérése Kvíz"
                  subtitle="ml, cl, dl, l, hl összefüggései"
                  type="Hamarosan"
                  emoji="🥛"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 4: A hosszúság mérése */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-4') && (
            <section>
              <SectionHeader id="g3-meas-sec-4" number={4} title="A hosszúság mérése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Vonalzó Eszköz"
                  subtitle="Szakaszok mérése és rajzolása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('ruler-tool', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Hosszmértékek Kvíz"
                  subtitle="mm, cm, dm, m, km átváltások"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: A kerület mérése */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-5') && (
            <section>
              <SectionHeader id="g3-meas-sec-5" number={5} title="A kerület mérése" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerület Kereső"
                  subtitle="Sokszögek határoló vonalainak összeadása"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Sokszögek Kerülete Kvíz"
                  subtitle="Háromszögek és sokszögek körbejárása"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: A téglalap és a négyzet kerülete */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-6') && (
            <section>
              <SectionHeader id="g3-meas-sec-6" number={6} title="A téglalap és a négyzet kerülete" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerületszámítás Kvíz"
                  subtitle="Négyzet: 4·a, Téglalap: 2·(a+b)"
                  type="Hamarosan"
                  emoji="🟩"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Kerület Képlet Gyakorló"
                  subtitle="Gyakorlati számolások és képletek"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: A terület mérése */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-7') && (
            <section>
              <SectionHeader id="g3-meas-sec-7" number={7} title="A terület mérése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egységnégyzet Lefedés"
                  subtitle="Alakzatok lefedése négyzethálón"
                  type="Hamarosan"
                  emoji="🟧"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Terület Összehasonlítás"
                  subtitle="Melyik alakzat területe nagyobb?"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: A téglalap és a négyzet területe */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-8') && (
            <section>
              <SectionHeader id="g3-meas-sec-8" number={8} title="A téglalap és a négyzet területe" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területszámítás Kvíz"
                  subtitle="Sorok és oszlopok szorzása: a·b és a·a"
                  type="Hamarosan"
                  emoji="🟨"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Kerület vs. Terület Kvíz"
                  subtitle="Kerület és terület összehasonlító feladatok"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 9: Az idő mérése */}
          {(showAll || activeSubSectionId === 'g3-meas-sec-9') && (
            <section>
              <SectionHeader id="g3-meas-sec-9" number={9} title="Az idő mérése" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Óra Leolvasása & Beállítása"
                  subtitle="Analóg és digitális óra perc és másodperc pontossággal"
                  type="Eszköz"
                  emoji="⏱️"
                  onClick={() => onActivitySelect('clock-tool', topicId)}
                  icon={<Clock className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Időmérték Kvíz"
                  subtitle="h, min, s, nap, hét, hónap, év átváltások és eltelt idő"
                  type="Teszt"
                  emoji="📅"
                  onClick={() => onActivitySelect('measurement-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-count-500') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számok 500-ig */}
          {(showAll || activeSubSectionId === 'g3-count500-sec-1') && (
            <section>
              <SectionHeader id="g3-count500-sec-1" number={1} title="Számok 500-ig" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Építőkockák 500-ig"
                  subtitle="Számok felépítése és helyiérték-táblázat"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Számegyenes 500-ig"
                  subtitle="Tájékozódás és léptékek a számegyenesen"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Gyűjtsd a számokat a táblán 500-ig!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Számok 500-ig Kvíz"
                  subtitle="Helyiérték, alaki és valódi érték"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 2: Számszomszédok, kerekítés */}
          {(showAll || activeSubSectionId === 'g3-count500-sec-2') && (
            <section>
              <SectionHeader id="g3-count500-sec-2" number={2} title="Számszomszédok, kerekítés" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számszomszédok 500-ig"
                  subtitle="Egyes, tízes és százas szomszédok"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Kerekítés Tízesekre és Százasokra"
                  subtitle="Kerekítés szabályai az 500-as számkörben"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Rendezés és Összehasonlítás"
                  subtitle="Számok növekvő és csökkenő sorrendje"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összeadás és kivonás */}
          {(showAll || activeSubSectionId === 'g3-count500-sec-3') && (
            <section>
              <SectionHeader id="g3-count500-sec-3" number={3} title="Összeadás és kivonás" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás 500-ig"
                  subtitle="Összeadás kerek tízesekkel és átlépéssel"
                  type="Teszt"
                  emoji="➕"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Kivonás 500-ig"
                  subtitle="Kivonás és kiegészítés 500-ra"
                  type="Teszt"
                  emoji="➖"
                  onClick={() => onActivitySelect('grade3-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Játék"
                  subtitle="Számolj helyesen és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Szorzás és osztás */}
          {(showAll || activeSubSectionId === 'g3-count500-sec-4') && (
            <section>
              <SectionHeader id="g3-count500-sec-4" number={4} title="Szorzás és osztás" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerek Tízesek Szorzása"
                  subtitle="Szorzótáblára épülő szorzások 500-ig"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => onActivitySelect('grade3-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Kerek Tízesek Osztása"
                  subtitle="Osztás és bennfoglalás 500-as számkörben"
                  type="Teszt"
                  emoji="➗"
                  onClick={() => onActivitySelect('grade3-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Műveletek Sorrendje"
                  subtitle="Zárójelek és műveleti prioritás"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: Megálló */}
          {(showAll || activeSubSectionId === 'g3-count500-sec-5') && (
            <section>
              <SectionHeader id="g3-count500-sec-5" number={5} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="500-as Számkör Tudáspróba"
                  subtitle="Összetett műveleti és számfogalmi feladatok"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Pénzszámolás 500 Ft-ig"
                  subtitle="Fizetés és visszajáró számítása 500 Ft-ig"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Záró Teszt"
                  subtitle="Összefoglaló kvíz az V. fejezetből"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-grouping') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Válogatás tulajdonságok szerint */}
          {(showAll || activeSubSectionId === 'g3-group-sec-1') && (
            <section>
              <SectionHeader id="g3-group-sec-1" number={1} title="Válogatás tulajdonságok szerint" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Logikai Készlet"
                  subtitle="Dienes-lapok válogatása szín, forma és méret szerint"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('logic-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Tárgyak Csoportosítása"
                  subtitle="Válogatás megadott tulajdonságok alapján"
                  type="Játék"
                  emoji="📦"
                  onClick={() => onActivitySelect('grouping-game', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Számok Csoportosítása"
                  subtitle="Páros-páratlan, kerek számok válogatása"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => onActivitySelect('number-grouping-game', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Tulajdonság Kvíz"
                  subtitle="Igaz és hamis állítások felismerése"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 2: Venn-diagramok és halmazok */}
          {(showAll || activeSubSectionId === 'g3-group-sec-2') && (
            <section>
              <SectionHeader id="g3-group-sec-2" number={2} title="Venn-diagramok és halmazok" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Venn-diagram Játék"
                  subtitle="Elemek elhelyezése két- és háromkörös halmazábrán"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => onActivitySelect('venn-diagram-game', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Venn-diagram Értelmező"
                  subtitle="Halmazábrák leolvasása és kérdések megválaszolása"
                  type="Teszt"
                  emoji="📊"
                  onClick={() => onActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Tárgyak a Venn-ábrán"
                  subtitle="Tárgyak és élőlények tulajdonságai"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => onActivitySelect('venn-reading-objects', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Számok a Venn-ábrán"
                  subtitle="Számtani tulajdonságok metszetei"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => onActivitySelect('venn-reading-numbers', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Sorba rendezés és lehetőségek (Megálló) */}
          {(showAll || activeSubSectionId === 'g3-group-sec-3') && (
            <section>
              <SectionHeader id="g3-group-sec-3" number={3} title="Sorba rendezés és lehetőségek (Megálló)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyerek Sudoku 4x4"
                  subtitle="Logikai számelhelyezés sorokban és oszlopokban"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => onActivitySelect('sudoku', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Kombinatorika & Sorrend Kvíz"
                  subtitle="Összes lehetőség feltárása és számlálás"
                  type="Teszt"
                  emoji="🎯"
                  onClick={() => onActivitySelect('grade3-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Fejezeti Tudáspróba"
                  subtitle="Összefoglaló teszt a VI. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-written-addition') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Háromjegyű számok összeadása */}
          {(showAll || activeSubSectionId === 'g3-wr-add-sec-1') && (
            <section>
              <SectionHeader id="g3-wr-add-sec-1" number={1} title="Háromjegyű számok összeadása" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Helyiérték Összeadás"
                  subtitle="Számok egymás alá helyezése és szóbeli előkészítés"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Összeadás 500-ig Teszt"
                  subtitle="Szóbeli és helyiértékes számolások"
                  type="Teszt"
                  emoji="➕"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Az összeg becslése */}
          {(showAll || activeSubSectionId === 'g3-wr-add-sec-2') && (
            <section>
              <SectionHeader id="g3-wr-add-sec-2" number={2} title="Az összeg becslése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Becslés Kerek Tízesekkel"
                  subtitle="Összeadandó tagok kerekítése és becslés"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Becslés Kerek Százasokkal"
                  subtitle="Nagyságrend becslése 100-as kerekítéssel"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Írásbeli összeadás */}
          {(showAll || activeSubSectionId === 'g3-wr-add-sec-3') && (
            <section>
              <SectionHeader id="g3-wr-add-sec-3" number={3} title="Írásbeli összeadás" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Összeadás Átlépéssel"
                  subtitle="Tízes- és százasátlépéses összeadások gyakorlása"
                  type="Teszt"
                  emoji="✍️"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Írásbeli Összeadás"
                  subtitle="Számolj pontosan és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Kapd el a helyes összegeket!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 4: Az összeg változásai */}
          {(showAll || activeSubSectionId === 'g3-wr-add-sec-4') && (
            <section>
              <SectionHeader id="g3-wr-add-sec-4" number={4} title="Az összeg változásai" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tagok és Összeg Szabályai"
                  subtitle="Hogyan változik az összeg a tagok változásakor?"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Csoportosítás & Felcserélhetőség"
                  subtitle="Műveleti tulajdonságok és gyors számolási trükkök"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g3-wr-add-sec-5') && (
            <section>
              <SectionHeader id="g3-wr-add-sec-5" number={5} title="Szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett Szöveges Feladatok"
                  subtitle="Adatok, terv, becslés, írásbeli számolás és válasz"
                  type="Teszt"
                  emoji="📖"
                  onClick={() => onActivitySelect('grade3-word-problems-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Pénzszámolás és Vásárlás"
                  subtitle="Összeadás és fizetés forintban"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Megálló */}
          {(showAll || activeSubSectionId === 'g3-wr-add-sec-6') && (
            <section>
              <SectionHeader id="g3-wr-add-sec-6" number={6} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Összeadás Tudáspróba"
                  subtitle="Összefoglaló felmérés a VII. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Fejezeti Záró Kvíz"
                  subtitle="Vegyes írásbeli összeadások és szöveges feladatok"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-written-subtraction') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Háromjegyű számok kivonása */}
          {(showAll || activeSubSectionId === 'g3-wr-sub-sec-1') && (
            <section>
              <SectionHeader id="g3-wr-sub-sec-1" number={1} title="Háromjegyű számok kivonása" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Helyiérték Kivonás"
                  subtitle="Számok egymás alá helyezése és szóbeli előkészítés"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Kivonás 500-ig Teszt"
                  subtitle="Szóbeli és helyiértékes kivonások"
                  type="Teszt"
                  emoji="➖"
                  onClick={() => onActivitySelect('grade3-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 2: A különbség becslése */}
          {(showAll || activeSubSectionId === 'g3-wr-sub-sec-2') && (
            <section>
              <SectionHeader id="g3-wr-sub-sec-2" number={2} title="A különbség becslése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Becslés Kerek Tízesekkel"
                  subtitle="Kisebbítendő és kivonandó kerekítése"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Becslés Kerek Százasokkal"
                  subtitle="Nagyságrend becslése 100-as kerekítéssel"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Írásbeli kivonás */}
          {(showAll || activeSubSectionId === 'g3-wr-sub-sec-3') && (
            <section>
              <SectionHeader id="g3-wr-sub-sec-3" number={3} title="Írásbeli kivonás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Kivonás Átváltással"
                  subtitle="Pótlásos eljárás és átváltások gyakorlása"
                  type="Teszt"
                  emoji="✍️"
                  onClick={() => onActivitySelect('grade3-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Írásbeli Kivonás"
                  subtitle="Számolj pontosan és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Találd meg a helyes különbségeket!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 4: A különbség változásai */}
          {(showAll || activeSubSectionId === 'g3-wr-sub-sec-4') && (
            <section>
              <SectionHeader id="g3-wr-sub-sec-4" number={4} title="A különbség változásai" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kisebbítendő & Kivonandó Változása"
                  subtitle="Egyenes és fordított irányú változások szabályai"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Azonos Változások Szabálya"
                  subtitle="Különbség megőrzése és gyors fejszámolás"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: Megálló */}
          {(showAll || activeSubSectionId === 'g3-wr-sub-sec-5') && (
            <section>
              <SectionHeader id="g3-wr-sub-sec-5" number={5} title="Megálló (Összefoglalás)" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Kivonás Tudáspróba"
                  subtitle="Összefoglaló felmérés a VIII. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Szöveges Feladatok & Pénzszámolás"
                  subtitle="Kivonások és visszajáró számítása"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Fejezeti Záró Kvíz"
                  subtitle="Vegyes írásbeli kivonási és szöveges feladatok"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-negative-numbers') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Negatív számok a mindennapokban */}
          {(showAll || activeSubSectionId === 'g3-neg-sec-1') && (
            <section>
              <SectionHeader id="g3-neg-sec-1" number={1} title="Negatív számok a mindennapokban" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hőmérő Kvíz"
                  subtitle="Hőmérséklet leolvasása fagypont alatt és felett"
                  type="Teszt"
                  emoji="🌡️"
                  onClick={() => onActivitySelect('grade3-quiz', topicId)}
                  icon={<Thermometer className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Lift és Mélygarázs"
                  subtitle="Szintek és emeletek a mindennapokban"
                  type="Hamarosan"
                  emoji="🛗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Pénztartozás Modell"
                  subtitle="Vagyon, nulla és adósság szemléltetése"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: A számegyenes és a nulla */}
          {(showAll || activeSubSectionId === 'g3-neg-sec-2') && (
            <section>
              <SectionHeader id="g3-neg-sec-2" number={2} title="A számegyenes és a nulla" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes Eszköz"
                  subtitle="Számok ábrázolása a nullától jobbra és balra"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Ellentett Számok"
                  subtitle="Számpárok keresése a nulla körül"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Irányítsd a kígyót a negatív számok között!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összehasonlítás és változások (Megálló) */}
          {(showAll || activeSubSectionId === 'g3-neg-sec-3') && (
            <section>
              <SectionHeader id="g3-neg-sec-3" number={3} title="Összehasonlítás és változások (Megálló)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Relációs Jelek (<, >, =)"
                  subtitle="Melyik szám a kisebb/hidegebb a negatív tartományban?"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Hőmérséklet Változások"
                  subtitle="Emelkedés és hűlés számítása"
                  type="Hamarosan"
                  emoji="❄️"
                  disabled={true}
                  icon={<Thermometer className="w-6 h-6" />}
                  color="sky"
                />
                <ActivityPlaceholder
                  title="Negatív Számok Tudáspróba"
                  subtitle="Összefoglaló felmérés a IX. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-shapes-solids') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A testek */}
          {(showAll || activeSubSectionId === 'g3-geom-sec-1') && (
            <section>
              <SectionHeader id="g3-geom-sec-1" number={1} title="A testek" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Testek Osztályozó"
                  subtitle="Síklapú és görbe felületű testek felismerése"
                  type="Játék"
                  emoji="📦"
                  onClick={() => onActivitySelect('shape-classification', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Geometria"
                  subtitle="Építs testekből és számolj!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: A téglatest és a kocka */}
          {(showAll || activeSubSectionId === 'g3-geom-sec-2') && (
            <section>
              <SectionHeader id="g3-geom-sec-2" number={2} title="A téglatest és a kocka" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kockák és Lapok"
                  subtitle="Lapok (6), élek (12) és csúcsok (8) számlálása"
                  type="Játék"
                  emoji="🎲"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Kocka & Téglatest Kvíz"
                  subtitle="Testek tulajdonságai és kiterített hálók"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 3: Síkidomok, sokszögek */}
          {(showAll || activeSubSectionId === 'g3-geom-sec-3') && (
            <section>
              <SectionHeader id="g3-geom-sec-3" number={3} title="Síkidomok, sokszögek" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidomok Csoportosítása"
                  subtitle="Háromszögek, négyszögek, sokszögek és körök"
                  type="Játék"
                  emoji="📐"
                  onClick={() => onActivitySelect('shape-classification', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Kerületszámítás 3. osztály"
                  subtitle="Sokszögek határoló vonalainak összeadása"
                  type="Hamarosan"
                  emoji="📏"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Szögek Párosító"
                  subtitle="Derékszög, hegyesszög és tompaszög"
                  type="Játék"
                  emoji="📐"
                  onClick={() => onActivitySelect('angle-matching', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Tükrözések, szimmetria */}
          {(showAll || activeSubSectionId === 'g3-geom-sec-4') && (
            <section>
              <SectionHeader id="g3-geom-sec-4" number={4} title="Tükrözések, szimmetria" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes Tükrözés Játék"
                  subtitle="Tükrözd az alakzatokat a tengelyre!"
                  type="Játék"
                  emoji="🦋"
                  onClick={() => onActivitySelect('axial-symmetry', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szimmetria Kvíz"
                  subtitle="Szimmetriatengelyek felismerése és számlálása"
                  type="Teszt"
                  emoji="🪞"
                  onClick={() => onActivitySelect('reflection-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 5: Megálló */}
          {(showAll || activeSubSectionId === 'g3-geom-sec-5') && (
            <section>
              <SectionHeader id="g3-geom-sec-5" number={5} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria Tudáspróba"
                  subtitle="Összefoglaló felmérés a X. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Irányítsd a kígyót a geometriai fogalmak között!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Fejezeti Záró Kvíz"
                  subtitle="Vegyes geometriai és szimmetria teszt"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-count-1000') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számok 1000-ig */}
          {(showAll || activeSubSectionId === 'g3-count1000-sec-1') && (
            <section>
              <SectionHeader id="g3-count1000-sec-1" number={1} title="Számok 1000-ig" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Helyiérték 1000-ig"
                  subtitle="Ezresek, százasok, tízesek és egyesek építése"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('grade3-blocks', topicId)}
                  icon={<Blocks className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Számegyenes 1000-ig"
                  subtitle="Számok leolvasása és elhelyezése"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Gyűjtsd be a számokat 1000-ig!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Számszomszédok, kerekítés */}
          {(showAll || activeSubSectionId === 'g3-count1000-sec-2') && (
            <section>
              <SectionHeader id="g3-count1000-sec-2" number={2} title="Számszomszédok, kerekítés" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számszomszédok Kvíz"
                  subtitle="Egyes, tízes és százas szomszédok"
                  type="Teszt"
                  emoji="🔢"
                  onClick={() => onActivitySelect('grade3-rounding-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Kerekítés 1000-ig"
                  subtitle="Kerekítés kerek tízesekre és százasokra"
                  type="Teszt"
                  emoji="🎯"
                  onClick={() => onActivitySelect('grade3-rounding-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összeadás és kivonás */}
          {(showAll || activeSubSectionId === 'g3-count1000-sec-3') && (
            <section>
              <SectionHeader id="g3-count1000-sec-3" number={3} title="Összeadás és kivonás" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szóbeli Műveletek 1000-ig"
                  subtitle="Összeadás és kivonás tízes- és százasátlépéssel"
                  type="Teszt"
                  emoji="➕"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Fejszámolás"
                  subtitle="Számolj gyorsan és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Szorzás és osztás */}
          {(showAll || activeSubSectionId === 'g3-count1000-sec-4') && (
            <section>
              <SectionHeader id="g3-count1000-sec-4" number={4} title="Szorzás és osztás" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás & Osztás Kerek Tízesekkel"
                  subtitle="Pl. 60 · 4 = 240, 420 : 6 = 70"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => onActivitySelect('grade3-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Bennfoglalás 1000-ig"
                  subtitle="Kerek százasok és tízesek osztása"
                  type="Teszt"
                  emoji="➗"
                  onClick={() => onActivitySelect('grade3-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Megálló */}
          {(showAll || activeSubSectionId === 'g3-count1000-sec-5') && (
            <section>
              <SectionHeader id="g3-count1000-sec-5" number={5} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számolás 1000-ig Tudáspróba"
                  subtitle="Összefoglaló felmérés a XI. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Pénzszámolás 1000 Ft-ig"
                  subtitle="Vásárlás, fizetés és visszajáró számítása"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Fejezeti Záró Kvíz"
                  subtitle="Vegyes számolási és szöveges feladatok 1000-ig"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-written-ops-1000') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Írásbeli összeadás 1000-ig */}
          {(showAll || activeSubSectionId === 'g3-wrops-sec-1') && (
            <section>
              <SectionHeader id="g3-wrops-sec-1" number={1} title="Írásbeli összeadás 1000-ig" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás 1000-ig Teszt"
                  subtitle="Több tagú és többszöri átlépéses összeadások"
                  type="Teszt"
                  emoji="➕"
                  onClick={() => onActivitySelect('grade3-addition-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Írásbeli Műveletek"
                  subtitle="Számolj pontosan és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Kapd el a helyes összegeket!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Írásbeli kivonás 1000-ig */}
          {(showAll || activeSubSectionId === 'g3-wrops-sec-2') && (
            <section>
              <SectionHeader id="g3-wrops-sec-2" number={2} title="Írásbeli kivonás 1000-ig" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kivonás 1000-ből Teszt"
                  subtitle="Többszöri átváltás és nullák kezelése"
                  type="Teszt"
                  emoji="➖"
                  onClick={() => onActivitySelect('grade3-subtraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Műveletek Ellenőrzése"
                  subtitle="Kivonás ellenőrzése írásbeli összeadással"
                  type="Hamarosan"
                  emoji="✅"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: A műveletek sorrendje és zárójelek */}
          {(showAll || activeSubSectionId === 'g3-wrops-sec-3') && (
            <section>
              <SectionHeader id="g3-wrops-sec-3" number={3} title="A műveletek sorrendje és zárójelek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Sorrend Kvíz"
                  subtitle="Zárójelek elsőbbsége és számolás balról jobbra"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Zárójelek és Trükkök"
                  subtitle="Zárójelezés és az eredmény megváltozása"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 4: Vegyes műveletek és szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g3-wrops-sec-4') && (
            <section>
              <SectionHeader id="g3-wrops-sec-4" number={4} title="Vegyes műveletek és szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett Szöveges Feladatok"
                  subtitle="Adatok, terv, becslés, számolás és válasz"
                  type="Teszt"
                  emoji="📖"
                  onClick={() => onActivitySelect('grade3-word-problems-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Nyitott Mondatok 1000-ig"
                  subtitle="Hiányzó számok kiszámítása egyenletekben"
                  type="Hamarosan"
                  emoji="❓"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Pénzszámolás 1000 Ft-ig"
                  subtitle="Vásárlás és visszajáró számítása"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Megálló */}
          {(showAll || activeSubSectionId === 'g3-wrops-sec-5') && (
            <section>
              <SectionHeader id="g3-wrops-sec-5" number={5} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Műveletek Tudáspróba"
                  subtitle="Összefoglaló felmérés a XII. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Fejezeti Záró Kvíz"
                  subtitle="Vegyes írásbeli műveletek és szöveges feladatok 1000-ig"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-written-mult') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Szorzás egyjegyű számmal */}
          {(showAll || activeSubSectionId === 'g3-wr-mult-sec-1') && (
            <section>
              <SectionHeader id="g3-wr-mult-sec-1" number={1} title="Szorzás egyjegyű számmal" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szóbeli Szorzás Tagolással"
                  subtitle="Százasok, tízesek és egyesek szorzása és összegzése"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => onActivitySelect('grade3-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Toronyépítő Szorzás"
                  subtitle="Számolj pontosan és építs tornyot!"
                  type="Játék"
                  emoji="🏰"
                  onClick={() => onActivitySelect('grade3-tower-builder', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 2: A szorzat becslése */}
          {(showAll || activeSubSectionId === 'g3-wr-mult-sec-2') && (
            <section>
              <SectionHeader id="g3-wr-mult-sec-2" number={2} title="A szorzat becslése" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzat Becslése Kerek Tízesekkel"
                  subtitle="Szorzandó kerekítése és szorzás"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Szorzat Becslése Kerek Százasokkal"
                  subtitle="Nagyságrend becslése 100-as kerekítéssel"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Írásbeli szorzás egyjegyű szorzóval */}
          {(showAll || activeSubSectionId === 'g3-wr-mult-sec-3') && (
            <section>
              <SectionHeader id="g3-wr-mult-sec-3" number={3} title="Írásbeli szorzás egyjegyű szorzóval" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Szorzás Átlépéssel"
                  subtitle="Egyjegyű szorzóval való írásbeli szorzás gyakorlása"
                  type="Teszt"
                  emoji="✍️"
                  onClick={() => onActivitySelect('grade3-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Kapd el a helyes szorzatokat!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('grade3-snake', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 4: Összefüggések, következtetések */}
          {(showAll || activeSubSectionId === 'g3-wr-mult-sec-4') && (
            <section>
              <SectionHeader id="g3-wr-mult-sec-4" number={4} title="Összefüggések, következtetések" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tényezők és Szorzat Kapcsolata"
                  subtitle="Hogyan változik a szorzat a tényezők változásakor?"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Következtetés Egységárból"
                  subtitle="Árak és mennyiségek szorzása"
                  type="Játék"
                  emoji="🪙"
                  onClick={() => onActivitySelect('grade3-money-quiz', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: A műveletek sorrendje */}
          {(showAll || activeSubSectionId === 'g3-wr-mult-sec-5') && (
            <section>
              <SectionHeader id="g3-wr-mult-sec-5" number={5} title="A műveletek sorrendje" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás Elsőbbsége"
                  subtitle="Műveleti sorrend: szorzás megelőzi az összeadást"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Zárójeles Szorzások"
                  subtitle="Zárójelek elsőbbségének alkalmazása"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 6: Megálló */}
          {(showAll || activeSubSectionId === 'g3-wr-mult-sec-6') && (
            <section>
              <SectionHeader id="g3-wr-mult-sec-6" number={6} title="Megálló (Összefoglalás)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Szorzás Tudáspróba"
                  subtitle="Összefoglaló felmérés a XIII. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Szöveges Feladatok Szorzással"
                  subtitle="Összetett vásárlási és mértékegységes feladatok"
                  type="Teszt"
                  emoji="📖"
                  onClick={() => onActivitySelect('grade3-word-problems-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Fejezeti Záró Kvíz"
                  subtitle="Vegyes írásbeli szorzási és szöveges feladatok"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g3-fractions-intro') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Bevezetés */}
          {(showAll || activeSubSectionId === 'g3-frac-sec-1') && (
            <section>
              <SectionHeader id="g3-frac-sec-1" number={1} title="Bevezetés" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pizza Törtek"
                  subtitle="Az egész felosztása: fél, harmad, negyed részek"
                  type="Játék"
                  emoji="🍕"
                  onClick={() => onActivitySelect('fractions-visualizer', topicId)}
                  icon={<PieChart className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Törtrúd Eszköz"
                  subtitle="Egész és részei szemléltetése színes rudakkal"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('fraction-bars', topicId)}
                  icon={<Boxes className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Közönséges törtek */}
          {(showAll || activeSubSectionId === 'g3-frac-sec-2') && (
            <section>
              <SectionHeader id="g3-frac-sec-2" number={2} title="Közönséges törtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számláló és Nevező Kvíz"
                  subtitle="Tört alakja, részeinek felismerése és lejegyzése"
                  type="Teszt"
                  emoji="🔢"
                  onClick={() => onActivitySelect('fractions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Törtrész Számítás"
                  subtitle="Mennyiségek fele, harmada, negyede"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összehasonlítás (Megálló) */}
          {(showAll || activeSubSectionId === 'g3-frac-sec-3') && (
            <section>
              <SectionHeader id="g3-frac-sec-3" number={3} title="Összehasonlítás (Megálló)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Összehasonlítása"
                  subtitle="Melyik tört a nagyobb? Relációs jelek kitöltése"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Törtek Tudáspróba"
                  subtitle="Összefoglaló felmérés a XIV. fejezetből"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => onActivitySelect('grade3-alapmuveletek', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="pink"
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
        grade={3}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade3View;
