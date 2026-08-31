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
  GitCompare,
  Grid3X3,
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
  Puzzle,
  Repeat,
  Scale,
  Scissors,
  Section,
  Shapes,
  Share2,
  Sparkle,
  Sparkles,
  Split,
  Table,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Trophy,
  Variable,
  Zap
} from 'lucide-react';

export const Grade4View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
    if (topicId === 'g4-count-10k') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számok 0-tól 1000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-1') && (
            <section>
              <SectionHeader id="g4-count-sec-1" number={1} title="Számok 0-tól 1000-ig" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Gyűjtsd össze a számokat a táblán!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => onActivitySelect('snake-game', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Számfogalom 1000-ig Kvíz"
                  subtitle="Helyiértékek, számegyenes és számszomszédok"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Összeadás és kivonás 1000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-2') && (
            <section>
              <SectionHeader id="g4-count-sec-2" number={2} title="Összeadás és kivonás 1000-ig" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás és Kivonás Kvíz"
                  subtitle="Szóbeli és írásbeli műveletek átlépéssel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Szorzás és osztás 1000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-3') && (
            <section>
              <SectionHeader id="g4-count-sec-3" number={3} title="Szorzás és osztás 1000-ig" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás és Osztás Kvíz"
                  subtitle="Szorzótáblák, maradékos osztás és kerek számok"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: A műveletek sorrendje */}
          {(showAll || activeSubSectionId === 'g4-count-sec-4') && (
            <section>
              <SectionHeader id="g4-count-sec-4" number={4} title="A műveletek sorrendje" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Sorrend Kvíz"
                  subtitle="Zárójelek és műveleti erősorrend szabályai"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 5: Nyitott mondatok */}
          {(showAll || activeSubSectionId === 'g4-count-sec-5') && (
            <section>
              <SectionHeader id="g4-count-sec-5" number={5} title="Nyitott mondatok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nyitott Mondatok Kvíz"
                  subtitle="Hiányzó számok, egyenlőségek és egyenlőtlenségek"
                  type="Hamarosan"
                  emoji="🔤"
                  disabled={true}
                  icon={<Variable className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 6: Szöveges feladatok 1000-es számkörben */}
          {(showAll || activeSubSectionId === 'g4-count-sec-6') && (
            <section>
              <SectionHeader id="g4-count-sec-6" number={6} title="Szöveges feladatok 1000-es számkörben" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges Feladatok Kvíz"
                  subtitle="Értelmezés, modell, számolás és válaszadás"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: A római számok */}
          {(showAll || activeSubSectionId === 'g4-count-sec-7') && (
            <section>
              <SectionHeader id="g4-count-sec-7" number={7} title="A római számok" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Római Számok Kvíz"
                  subtitle="I, V, X, L, C, D, M írása és átváltása 1000-ig"
                  type="Hamarosan"
                  emoji="🏛️"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 8: Játékok a logikai lapokkal */}
          {(showAll || activeSubSectionId === 'g4-count-sec-8') && (
            <section>
              <SectionHeader id="g4-count-sec-8" number={8} title="Játékok a logikai lapokkal" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Logikai Készlet"
                  subtitle="Formák, színek, méretek és tulajdonságok"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('logic-blocks', topicId)}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Mátrix Válogatás"
                  subtitle="Elhelyezés a 2x2-es táblázatban"
                  type="Játék"
                  emoji="🔲"
                  onClick={() => onActivitySelect('matrix-sorting-game', topicId)}
                  icon={<Table className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 9: Csoportosítások és számok 10 000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-9') && (
            <section>
              <SectionHeader id="g4-count-sec-9" number={9} title="Csoportosítások és számok 10 000-ig" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Építőkockás Összehasonlítás"
                  subtitle="Négyjegyű számok és helyiértékek kockákkal"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => onActivitySelect('g5-building-blocks-comparison', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Tízezres Számfogalom Kvíz"
                  subtitle="Négyjegyű számok írása, olvasása és helyiértékei"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 10: Számszomszédok, kerekítés 10 000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-10') && (
            <section>
              <SectionHeader id="g4-count-sec-10" number={10} title="Számszomszédok, kerekítés 10 000-ig" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számszomszédok és Kerekítés"
                  subtitle="Egyes, tízes, százas és ezres szomszédok kerekítése"
                  type="Hamarosan"
                  emoji="📏"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összeadás és kivonás 10 000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-11') && (
            <section>
              <SectionHeader id="g4-count-sec-11" number={11} title="Összeadás és kivonás 10 000-ig" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás és Kivonás 10 000-ig"
                  subtitle="Műveletek kerek ezresekkel és négyjegyű számokkal"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 12: Szorzás és osztás 10 000-ig */}
          {(showAll || activeSubSectionId === 'g4-count-sec-12') && (
            <section>
              <SectionHeader id="g4-count-sec-12" number={12} title="Szorzás és osztás 10 000-ig" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás és Osztás 10 000-ig"
                  subtitle="Szorzás és osztás 10-zel, 100-zal, 1000-rel"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 13: Megálló és Kitekintő (Összefoglalás) */}
          {(showAll || activeSubSectionId === 'g4-count-sec-13') && (
            <section>
              <SectionHeader id="g4-count-sec-13" number={13} title="Megálló és Kitekintő (Összefoglalás)" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló Megálló és Kitekintő"
                  subtitle="I. Számolás 0-tól 10 000-ig témazáró összefoglalás"
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

    if (topicId === 'g4-measurements') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A hosszúság mérése */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-1') && (
            <section>
              <SectionHeader id="g4-meas-sec-1" number={1} title="A hosszúság mérése" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hosszúság Átváltó"
                  subtitle="Mértékegységek (m, dm, cm, mm) vizuális ábrázolása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => onActivitySelect('unit-converter', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Hosszúság Kvíz"
                  subtitle="Hosszúság mértékegységek és átváltásuk"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: A kerület mérése */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-2') && (
            <section>
              <SectionHeader id="g4-meas-sec-2" number={2} title="A kerület mérése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerület és Terület"
                  subtitle="Szemléltető eszköz síkidomok kerületéhez és területéhez"
                  type="Eszköz"
                  emoji="🔲"
                  onClick={() => onActivitySelect('perimeter-area', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Kerületszámítás Kvíz"
                  subtitle="Téglalap, négyzet és sokszögek kerülete"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: A terület mérése */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-3') && (
            <section>
              <SectionHeader id="g4-meas-sec-3" number={3} title="A terület mérése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területszámítás Kvíz"
                  subtitle="Egységnégyzetek, téglalap és négyzet területe"
                  type="Hamarosan"
                  emoji="🟩"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: A tömeg mérése */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-4') && (
            <section>
              <SectionHeader id="g4-meas-sec-4" number={4} title="A tömeg mérése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tömeg Mértékegységek Kvíz"
                  subtitle="g, dkg, kg, t átváltása és mérlegelése"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Az űrtartalom mérése */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-5') && (
            <section>
              <SectionHeader id="g4-meas-sec-5" number={5} title="Az űrtartalom mérése" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Űrtartalom Átváltó"
                  subtitle="Folyadékok mértékegységei (hl, l, dl, cl, ml)"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => onActivitySelect('capacity-converter', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Űrtartalom Kvíz"
                  subtitle="Űrmértékek átváltása és gyakorlati feladatok"
                  type="Hamarosan"
                  emoji="🥛"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Az idő mérése */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-6') && (
            <section>
              <SectionHeader id="g4-meas-sec-6" number={6} title="Az idő mérése" color="amber" />
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
                  title="Időmérés és Naptár Kvíz"
                  subtitle="Óra, perc, másodperc, időtartam és naptár"
                  type="Hamarosan"
                  emoji="⏱️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Megálló */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-7') && (
            <section>
              <SectionHeader id="g4-meas-sec-7" number={7} title="Megálló (Összefoglalás)" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pénztár"
                  subtitle="Számolás pénzzel, fizetés és visszajáró"
                  type="Eszköz"
                  emoji="💰"
                  onClick={() => onActivitySelect('money-calculation', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Mérések Összefoglaló Kvíz"
                  subtitle="Tudáspróba a mérési témakörökből"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 8: Kitekintő */}
          {(showAll || activeSubSectionId === 'g4-meas-sec-8') && (
            <section>
              <SectionHeader id="g4-meas-sec-8" number={8} title="Kitekintő" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Különleges Mértékegységek"
                  subtitle="Régi magyar és nemzetközi mértékek, méretrekordok"
                  type="Hamarosan"
                  emoji="🌍"
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

    if (topicId === 'g4-written-ops') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Írásbeli összeadás és kivonás */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-1') && (
            <section>
              <SectionHeader id="g4-wops-sec-1" number={1} title="Írásbeli összeadás és kivonás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Összeadás és Kivonás"
                  subtitle="Többjegyű számok összeadása és kivonása átlépéssel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Írásbeli szorzás egyjegyű számmal */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-2') && (
            <section>
              <SectionHeader id="g4-wops-sec-2" number={2} title="Írásbeli szorzás egyjegyű számmal" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Szorzás"
                  subtitle="Szorzás algoritmusa egyjegyű számmal és átvitelekkel"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Írásbeli osztás egyjegyű osztóval */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-3') && (
            <section>
              <SectionHeader id="g4-wops-sec-3" number={3} title="Írásbeli osztás egyjegyű osztóval" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Osztás Eszköz"
                  subtitle="Lépcsős osztás algoritmusának levezetése"
                  type="Eszköz"
                  emoji="➗"
                  onClick={() => onActivitySelect('long-division', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Írásbeli Osztás Kvíz"
                  subtitle="Lépcsős osztás, maradékos osztás és ellenőrzés"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: A számok tulajdonságai */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-4') && (
            <section>
              <SectionHeader id="g4-wops-sec-4" number={4} title="A számok tulajdonságai" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számtulajdonságok és Oszthatóság"
                  subtitle="Páros-páratlan, oszthatóság 2-vel, 5-tel, 10-zel"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Összefüggések, következtetések */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-5') && (
            <section>
              <SectionHeader id="g4-wops-sec-5" number={5} title="Összefüggések, következtetések" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefüggések és Szabályok"
                  subtitle="Táblázatos szabálykeresés és logikai következtetések"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: A műveletek közötti kapcsolatok */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-6') && (
            <section>
              <SectionHeader id="g4-wops-sec-6" number={6} title="A műveletek közötti kapcsolatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Kapcsolatok"
                  subtitle="Inverz műveletek, felcserélhetőség és csoportosítás"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: A műveletek sorrendje */}
          {(showAll || activeSubSectionId === 'g4-wops-sec-7') && (
            <section>
              <SectionHeader id="g4-wops-sec-7" number={7} title="A műveletek sorrendje" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Sorrend Kvíz"
                  subtitle="Zárójelek és műveleti erősorrend alkalmazása"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-negatives') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A negatív számok a mindennapokban */}
          {(showAll || activeSubSectionId === 'g4-neg-sec-1') && (
            <section>
              <SectionHeader id="g4-neg-sec-1" number={1} title="A negatív számok a mindennapokban" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakorlati Negatív Számok"
                  subtitle="Hőmérő, lift, mélygarázs és tengerszint"
                  type="Hamarosan"
                  emoji="❄️"
                  disabled={true}
                  icon={<Thermometer className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: Számegyenes és ellentettek */}
          {(showAll || activeSubSectionId === 'g4-neg-sec-2') && (
            <section>
              <SectionHeader id="g4-neg-sec-2" number={2} title="Számegyenes és ellentettek" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes"
                  subtitle="Negatív számok ábrázolása és távolsága a nullától"
                  type="Eszköz"
                  emoji="↔️"
                  onClick={() => onActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Ellentett Számok Kvíz"
                  subtitle="Ellentettek keresése és szimmetria a számegyenesen"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összehasonlítás és változások */}
          {(showAll || activeSubSectionId === 'g4-neg-sec-3') && (
            <section>
              <SectionHeader id="g4-neg-sec-3" number={3} title="Összehasonlítás és változások" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összehasonlítás és Változások"
                  subtitle="Negatív számok rendezése és hőmérséklet-változások"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}
        </div>
      );
    }



    if (topicId === 'g4-shapes-solids') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Síkidomok, sokszögek */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-1') && (
            <section>
              <SectionHeader id="g4-geom-sec-1" number={1} title="Síkidomok, sokszögek" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek"
                  subtitle="Alakzatok felismerése és csoportosítása"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => onActivitySelect('shape-classification', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Egyenesek"
                  subtitle="Párhuzamos és merőleges egyenesek"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => onActivitySelect('line-relationships', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Sokszögek Kvíz"
                  subtitle="Háromszögek, négyszögek tulajdonságai"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: A kör */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-2') && (
            <section>
              <SectionHeader id="g4-geom-sec-2" number={2} title="A kör" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kör részei"
                  subtitle="Középpont, sugár és átmérő"
                  type="Gyakorlás"
                  emoji="⭕"
                  onClick={() => onActivitySelect('circle-parts', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Kör Kvíz"
                  subtitle="Körvonal, körlap és körzőhasználat"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 3: A testek */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-3') && (
            <section>
              <SectionHeader id="g4-geom-sec-3" number={3} title="A testek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D alakzatok megkülönböztetése"
                  type="Játék"
                  emoji="🧊"
                  onClick={() => onActivitySelect('shape-classification', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Testek és Hálók Kvíz"
                  subtitle="Lapok, élek, csúcsok és kockahálók"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: A tükrözés */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-4') && (
            <section>
              <SectionHeader id="g4-geom-sec-4" number={4} title="A tükrözés" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes tükrözés"
                  subtitle="Tükörkép keresése és azonosítása"
                  type="Teszt"
                  emoji="🪞"
                  onClick={() => onActivitySelect('reflection-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Húzd a helyére!"
                  subtitle="Tükrözés gyakorlása interaktívan"
                  type="Gyakorlás"
                  emoji="⚡"
                  onClick={() => onActivitySelect('axial-symmetry', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Találd meg a hibát!"
                  subtitle="Szimmetriahibák felderítése"
                  type="Gyakorlás"
                  emoji="🎯"
                  onClick={() => onActivitySelect('symmetry-error', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Szimmetria eszköz"
                  subtitle="Szerkessz tükörképeket a táblán!"
                  type="Eszköz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('symmetry-construction', topicId)}
                  icon={<Repeat className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: Nagyítás, kicsinyítés */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-5') && (
            <section>
              <SectionHeader id="g4-geom-sec-5" number={5} title="Nagyítás, kicsinyítés" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nagyítás és kicsinyítés"
                  subtitle="Arányos méretváltoztatások négyzethálón"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 6: Eltolás */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-6') && (
            <section>
              <SectionHeader id="g4-geom-sec-6" number={6} title="Eltolás" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Párhuzamos Eltolás"
                  subtitle="Alakzatok mozgatása adott irányba és távolságra"
                  type="Hamarosan"
                  emoji="➡️"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 7: Elforgatás */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-7') && (
            <section>
              <SectionHeader id="g4-geom-sec-7" number={7} title="Elforgatás" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Elforgatás Pont Körül"
                  subtitle="Forgatás 90°, 180° és 270° szögekben"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Repeat className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 8: Tájékozódás */}
          {(showAll || activeSubSectionId === 'g4-geom-sec-8') && (
            <section>
              <SectionHeader id="g4-geom-sec-8" number={8} title="Tájékozódás" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tájékozódás és Nézetek"
                  subtitle="Elölnézet, felülnézet, oldalnézet és útvonalak"
                  type="Hamarosan"
                  emoji="🧭"
                  disabled={true}
                  icon={<Compass className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-fractions') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A törtrész és a törtek értelmezése */}
          {(showAll || activeSubSectionId === 'g4-frac-sec-1') && (
            <section>
              <SectionHeader id="g4-frac-sec-1" number={1} title="A törtrész és a törtek értelmezése" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek vizuálisan"
                  subtitle="Törtek modellezése, számláló és nevező szemléltetése"
                  type="Eszköz"
                  emoji="🍕"
                  onClick={() => onActivitySelect('fraction-tool', topicId)}
                  icon={<Pizza className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Törtek Alapjai Kvíz"
                  subtitle="Törtrészek felismerése és leolvasása ábrákról"
                  type="Teszt"
                  emoji="📝"
                  onClick={() => onActivitySelect('fraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Egynél kisebb törtek */}
          {(showAll || activeSubSectionId === 'g4-frac-sec-2') && (
            <section>
              <SectionHeader id="g4-frac-sec-2" number={2} title="Egynél kisebb törtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egynél Kisebb Törtek"
                  subtitle="Valódi törtek és kiegészítés egy egészre"
                  type="Hamarosan"
                  emoji="🥧"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az 1 egész és az egynél nagyobb törtek */}
          {(showAll || activeSubSectionId === 'g4-frac-sec-3') && (
            <section>
              <SectionHeader id="g4-frac-sec-3" number={3} title="Az 1 egész és az egynél nagyobb törtek" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egynél Nagyobb Törtek"
                  subtitle="Egészek, áltörtek és vegyes számok szemléltetése"
                  type="Hamarosan"
                  emoji="🎂"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 4: Törtek összehasonlítása és rendezése */}
          {(showAll || activeSubSectionId === 'g4-frac-sec-4') && (
            <section>
              <SectionHeader id="g4-frac-sec-4" number={4} title="Törtek összehasonlítása és rendezése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Összehasonlítása"
                  subtitle="Azonos számlálójú és nevezőjű törtek vizsgálata"
                  type="Eszköz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('fraction-comparison', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Összehasonlítás Kvíz"
                  subtitle="Törtek rendezése és relációs jelek alkalmazása"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: Törtrész kiszámítása és szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g4-frac-sec-5') && (
            <section>
              <SectionHeader id="g4-frac-sec-5" number={5} title="Törtrész kiszámítása és szöveges feladatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtrész Számítása"
                  subtitle="Mennyiségek törtrésze és mindennapi szöveges feladatok"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-written-mult') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Szorzás kétjegyű szorzóval */}
          {(showAll || activeSubSectionId === 'g4-wmult-sec-1') && (
            <section>
              <SectionHeader id="g4-wmult-sec-1" number={1} title="Szorzás kétjegyű szorzóval" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás Kerek Tízesekkel"
                  subtitle="Szorzás 10-zel, 20-szal és összeggel való szorzás"
                  type="Hamarosan"
                  emoji="🔟"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Írásbeli szorzás */}
          {(showAll || activeSubSectionId === 'g4-wmult-sec-2') && (
            <section>
              <SectionHeader id="g4-wmult-sec-2" number={2} title="Írásbeli szorzás" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Szorzás Kétjegyűvel"
                  subtitle="Részletszorzatok eltolása, összeadása és maradékok"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összefüggések, következtetések */}
          {(showAll || activeSubSectionId === 'g4-wmult-sec-3') && (
            <section>
              <SectionHeader id="g4-wmult-sec-3" number={3} title="Összefüggések, következtetések" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefüggések és Szövegesek"
                  subtitle="Tényezők változása, nyitott mondatok és szöveges feladatok"
                  type="Hamarosan"
                  emoji="📝"
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

    if (topicId === 'g4-grouping') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Válogatások halmazokba */}
          {(showAll || activeSubSectionId === 'g4-group-sec-1') && (
            <section>
              <SectionHeader id="g4-group-sec-1" number={1} title="Válogatások halmazokba" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Válogatás halmazokba"
                  subtitle="Venn-diagramok és csoportosítás"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => onActivitySelect('venn-diagram-game', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Számcsoportosítás"
                  subtitle="Számok válogatása tulajdonságaik szerint"
                  type="Gyakorlás"
                  emoji="🔢"
                  onClick={() => onActivitySelect('number-grouping-game', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Halmazok Kvíz"
                  subtitle="Venn-karikák és közös tulajdonságok"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Válogatások táblázatokba */}
          {(showAll || activeSubSectionId === 'g4-group-sec-2') && (
            <section>
              <SectionHeader id="g4-group-sec-2" number={2} title="Válogatások táblázatokba" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Táblázatos válogatás"
                  subtitle="Elhelyezés a 2x2-es hálóban két szempont szerint"
                  type="Játék"
                  emoji="📊"
                  onClick={() => onActivitySelect('matrix-sorting-game', topicId)}
                  icon={<Table className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Táblázatos Válogatás Kvíz"
                  subtitle="Sorok és oszlopok metszéspontjai"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Hányféle lehetőség van? */}
          {(showAll || activeSubSectionId === 'g4-group-sec-3') && (
            <section>
              <SectionHeader id="g4-group-sec-3" number={3} title="Hányféle lehetőség van?" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kombinatorika és Esetek"
                  subtitle="Sorbarendezések, fadiagram és lehetőségek számlálása"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Igaz vagy hamis? */}
          {(showAll || activeSubSectionId === 'g4-group-sec-4') && (
            <section>
              <SectionHeader id="g4-group-sec-4" number={4} title="Igaz vagy hamis?" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sudoku Játék"
                  subtitle="Logikai következtetés és rácskitöltés"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => onActivitySelect('sudoku', topicId)}
                  icon={<Grid3X3 className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Logikai Állítások Kvíz"
                  subtitle="Minden, van olyan, egyik sem állítások vizsgálata"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<CheckCircle2 className="w-6 h-6" />}
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
        grade={4}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade4View;
