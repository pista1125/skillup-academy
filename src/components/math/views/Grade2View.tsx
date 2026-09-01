import React, { lazy, Suspense } from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  Binary,
  Blocks,
  BookOpen,
  Calculator,
  FileText,
  FlaskConical,
  HelpCircle,
  Layers,
  MoveHorizontal,
  Repeat,
  Scale,
  Sparkles,
  Split,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';

const Grade2MathModule = lazy(() => import('@/components/math/grade-2/Grade2MathModule').then(m => ({ default: m.Grade2MathModule })));

export const Grade2View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  // Topic I: Számolás 0-tól 20-ig
  if (topicId === 'g2-numbers-to-20') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Számok 0-tól 20-ig */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-1') && (
          <section>
            <SectionHeader id="g2-count20-sec-1" number={1} title="Számok 0-tól 20-ig" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Matek Kígyó 🐍"
                subtitle="Gyűjtsd össze a számokat a táblán!"
                type="Játék"
                emoji="🐍"
                onClick={() => onActivitySelect('grade2-snake', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Építőkockák"
                subtitle="Számok összehasonlítása és helyiértékek"
                type="Játék"
                emoji="🧱"
                onClick={() => onActivitySelect('grade2-blocks', topicId)}
                icon={<Blocks className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Számegyenes"
                subtitle="Számok helye és számszomszédok 20-ig"
                type="Eszköz"
                emoji="📏"
                onClick={() => onActivitySelect('number-line', topicId)}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Számok 20-ig Kvíz"
                subtitle="Helyiérték, páros-páratlan és számszomszédok"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Páros és Páratlan"
                subtitle="Párosítás és számok csoportosítása"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 2: Összeadás 10-es számkör */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-2') && (
          <section>
            <SectionHeader id="g2-count20-sec-2" number={2} title="Összeadás 10-es számkör" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összeadás Kaland"
                subtitle="Összeadás alapjai és a 10 bontása"
                type="Játék"
                emoji="➕"
                onClick={() => onActivitySelect('grade2-quiz', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Toronyépítő Játék"
                subtitle="Építs tornyot helyes összeadásokkal!"
                type="Játék"
                emoji="🏰"
                onClick={() => onActivitySelect('grade2-blocks', topicId)}
                icon={<Trophy className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Összeadás 10-ig Kvíz"
                subtitle="Pótlás 10-re és a tagok felcserélhetősége"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="10-es Bontó Kártyák"
                subtitle="Gyakorold a 10-es számpárokat!"
                type="Hamarosan"
                emoji="🃏"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 3: Kivonás 10-es számkör */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-3') && (
          <section>
            <SectionHeader id="g2-count20-sec-3" number={3} title="Kivonás 10-es számkör" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kivonás 10-ig Kvíz"
                subtitle="Kivonás és ellenőrzés összeadással"
                type="Hamarosan"
                emoji="➖"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Különbség Kereső"
                subtitle="Mennyivel több? Mennyivel kevesebb?"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Hiányos Műveletek 10-ig"
                subtitle="Keresd meg a hiányzó tagot!"
                type="Hamarosan"
                emoji="❓"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Összeadás 20-as számkör */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-4') && (
          <section>
            <SectionHeader id="g2-count20-sec-4" number={4} title="Összeadás 20-as számkör" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összeadás 20-ig Kvíz"
                subtitle="Összeadás 10-re pótlási stratégiával"
                type="Hamarosan"
                emoji="🚀"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Tízesátlépés Mester"
                subtitle="Lépésről lépésre a tízesen át"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Háromtagú Összeadás"
                subtitle="Ügyes számolás 10-es csoportokkal"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 5: Kivonás 20-as számkör */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-5') && (
          <section>
            <SectionHeader id="g2-count20-sec-5" number={5} title="Kivonás 20-as számkör" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kivonás 20-ig Kvíz"
                subtitle="Kivonás tízesátlépéssel 20-as számkörben"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Visszaszámláló Kaland"
                subtitle="Lépkedj vissza a számegyenesen!"
                type="Hamarosan"
                emoji="📉"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Bontás és Kivonás"
                subtitle="Kivonandó felbontása lépésekre"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 6: Szöveges feladatok */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-6') && (
          <section>
            <SectionHeader id="g2-count20-sec-6" number={6} title="Szöveges feladatok" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Képes Szöveges Feladatok"
                subtitle="Gyakorlati feladványok képi támogatással"
                type="Hamarosan"
                emoji="📖"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Nyitott Mondatok Kvíz"
                subtitle="Keresd meg a titkos számot!"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Több vagy Kevesebb?"
                subtitle="Összehasonlítás szöveges példákon keresztül"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 7: Megálló */}
        {(showAll || activeSubSectionId === 'g2-count20-sec-7') && (
          <section>
            <SectionHeader id="g2-count20-sec-7" number={7} title="Megálló" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="I. Fejezet Záró Kvíz"
                subtitle="Összefoglaló vegyes tudáspróba 20-ig"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="2. Osztályos Nagydíj"
                subtitle="Minden feladattípus egy kihívásban"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Összefoglaló Mesterpróba"
                subtitle="Bizonyítsd be, hogy mindent tudsz!"
                type="Hamarosan"
                emoji="👑"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic II: Számkörbővítés és számolás 50-ig
  if (topicId === 'g2-numbers-to-50') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Számok 50-ig */}
        {(showAll || activeSubSectionId === 'g2-count50-sec-1') && (
          <section>
            <SectionHeader id="g2-count50-sec-1" number={1} title="Számok 50-ig" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számok 50-ig Kvíz"
                subtitle="Helyiértékek, tízesek és egyesek"
                type="Hamarosan"
                emoji="🔟"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Számszomszéd Kereső"
                subtitle="Egyes és tízes számszomszédok 50-ig"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Páros és Páratlan 50-ig"
                subtitle="Csoportosítsd a számokat tulajdonságaik szerint!"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 2: Összeadás 50-es számkör */}
        {(showAll || activeSubSectionId === 'g2-count50-sec-2') && (
          <section>
            <SectionHeader id="g2-count50-sec-2" number={2} title="Összeadás 50-es számkör" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összeadás 50-ig Kvíz"
                subtitle="Összeadás egyjegyű és kétjegyű számokkal"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Tízesátlépés Mester 50-ig"
                subtitle="Pótlás kerek tízesre lépésről lépésre"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Összegkereső Játék"
                subtitle="Párosítsd a műveleteket az eredménnyel!"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: Kivonás 50-es számkör */}
        {(showAll || activeSubSectionId === 'g2-count50-sec-3') && (
          <section>
            <SectionHeader id="g2-count50-sec-3" number={3} title="Kivonás 50-es számkör" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kivonás 50-ig Kvíz"
                subtitle="Kivonás tízesátlépéssel és anélkül 50-ig"
                type="Hamarosan"
                emoji="➖"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Visszaszámláló Kihívás"
                subtitle="Bontás kerek tízesen keresztül"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Kivonás és Ellenőrzés"
                subtitle="Ellenőrizd a kivonást összeadással!"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 4: Összeadás, kivonás kerek tízesekkel */}
        {(showAll || activeSubSectionId === 'g2-count50-sec-4') && (
          <section>
            <SectionHeader id="g2-count50-sec-4" number={4} title="Összeadás, kivonás kerek tízesekkel" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kerek Tízesek Műveletei"
                subtitle="10, 20, 30, 40, 50 összeadása és kivonása"
                type="Hamarosan"
                emoji="🔟"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Tízesugró Kaland"
                subtitle="Kétjegyű számokhoz kerek tízesek hozzáadása/elvétele"
                type="Hamarosan"
                emoji="🦘"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Gyors Tízes Villámkvíz"
                subtitle="Fejszámolási gyakorlatok kerek tízesekkel"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 5: Szöveges feladatok */}
        {(showAll || activeSubSectionId === 'g2-count50-sec-5') && (
          <section>
            <SectionHeader id="g2-count50-sec-5" number={5} title="Szöveges feladatok" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Életszerű Szöveges Példák"
                subtitle="Vásárlás, gyűjtögetés és méretek 50-es számkörben"
                type="Hamarosan"
                emoji="📖"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Nyitott Mondatok Modellezése"
                subtitle="Írd fel a nyitott mondatot és számold ki a hiányzót!"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Képes Problémamegoldó"
                subtitle="Adatok leolvasása képekről és rajzokról"
                type="Hamarosan"
                emoji="🖼️"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 6: Megálló */}
        {(showAll || activeSubSectionId === 'g2-count50-sec-6') && (
          <section>
            <SectionHeader id="g2-count50-sec-6" number={6} title="Megálló" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="II. Fejezet Záró Kvíz"
                subtitle="Összefoglaló vegyes tudáspróba 50-es számkörben"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="50-es Bajnokság"
                subtitle="Vegyes feladványok minden altémából"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Mesterpróba 50-ig"
                subtitle="Számolási és gondolkodási mester kihívás"
                type="Hamarosan"
                emoji="👑"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic III: Számkörbővítés és számolás 100-ig
  if (topicId === 'g2-numbers-to-100') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Számok 100-ig */}
        {(showAll || activeSubSectionId === 'g2-count100-sec-1') && (
          <section>
            <SectionHeader id="g2-count100-sec-1" number={1} title="Számok 100-ig" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számok 100-ig Kvíz"
                subtitle="Helyiértékek, tízesek, egyesek és a 100"
                type="Hamarosan"
                emoji="💯"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Kerekítés és Számszomszédok"
                subtitle="Kerekítés a legközelebbi tízesre"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="100-as Számtábla Felfedező"
                subtitle="Mintázatok, sorok és oszlopok a számtáblán"
                type="Hamarosan"
                emoji="🗺️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 2: Összeadás 100-as számkör */}
        {(showAll || activeSubSectionId === 'g2-count100-sec-2') && (
          <section>
            <SectionHeader id="g2-count100-sec-2" number={2} title="Összeadás 100-as számkör" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összeadás 100-ig Kvíz"
                subtitle="Kétjegyű számok összeadása 100-ig"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Tízesátlépés Mester 100-ig"
                subtitle="Pótlás a következő kerek tízesre"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Villám Összegkereső"
                subtitle="Gyors fejszámolási kihívás 100-ig"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: Kivonás 100-as számkör */}
        {(showAll || activeSubSectionId === 'g2-count100-sec-3') && (
          <section>
            <SectionHeader id="g2-count100-sec-3" number={3} title="Kivonás 100-as számkör" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kivonás 100-ig Kvíz"
                subtitle="Kivonás tízesátlépéssel és anélkül 100-ig"
                type="Hamarosan"
                emoji="➖"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Kivonás 100-ból"
                subtitle="Bontások és számolás 100-ból"
                type="Hamarosan"
                emoji="💯"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Kivonás és Ellenőrzés 100-ig"
                subtitle="Különbség ellenőrzése összeadással"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 4: Összeadás, kivonás kerek tízesekkel */}
        {(showAll || activeSubSectionId === 'g2-count100-sec-4') && (
          <section>
            <SectionHeader id="g2-count100-sec-4" number={4} title="Összeadás, kivonás kerek tízesekkel" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kerek Tízesek 100-ig"
                subtitle="10, 20, 30... 100 összeadása és kivonása"
                type="Hamarosan"
                emoji="🔟"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Tízesugró Kaland 100-ig"
                subtitle="Kétjegyű számokhoz kerek tízesek műveletei"
                type="Hamarosan"
                emoji="🦘"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Kerek Tízes Villámkvíz"
                subtitle="Fejszámolás kerek tízesekkel"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 5: Szöveges feladatok */}
        {(showAll || activeSubSectionId === 'g2-count100-sec-5') && (
          <section>
            <SectionHeader id="g2-count100-sec-5" number={5} title="Szöveges feladatok" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pénzhasználat és Vásárlás"
                subtitle="Szöveges feladatok forinttal és visszajáróval"
                type="Hamarosan"
                emoji="💰"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Nyitott Mondatok 100-ig"
                subtitle="Egyenletek és hiányzó tagok keresése"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Mérés és Összehasonlítás"
                subtitle="Életszerű szöveges példák mértékegységekkel"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 6: Megálló */}
        {(showAll || activeSubSectionId === 'g2-count100-sec-6') && (
          <section>
            <SectionHeader id="g2-count100-sec-6" number={6} title="Megálló" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="III. Fejezet Záró Kvíz"
                subtitle="Összefoglaló vegyes tudáspróba 100-ig"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="100-as Bajnokság"
                subtitle="Vegyes feladványok minden 100-as altémából"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="100-as Mesterpróba"
                subtitle="A 100-as számkör igazi bajnokainak"
                type="Hamarosan"
                emoji="👑"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VI: A római számok
  if (topicId === 'g2-roman-numbers') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Római számok értelmezése */}
        {(showAll || activeSubSectionId === 'g2-roman-sec-1') && (
          <section>
            <SectionHeader id="g2-roman-sec-1" number={1} title="Római számok értelmezése" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Római Számok Alapjai"
                subtitle="I, V, X, L, C jelek és a szabályok"
                type="Hamarosan"
                emoji="🏛️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Összeadás és Kivonás Elve"
                subtitle="Jobbra írás és balra írás szabályai"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Római Számkereső"
                subtitle="Ismerd fel az ókori számjegyeket!"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 2: Római számok 0-10-ig */}
        {(showAll || activeSubSectionId === 'g2-roman-sec-2') && (
          <section>
            <SectionHeader id="g2-roman-sec-2" number={2} title="Római számok 0-10-ig" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Római Számok 10-ig Kvíz"
                subtitle="I-től X-ig írás és olvasás"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Római Számpárosító"
                subtitle="Párosítsd az arab és római számokat!"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Számszomszédok Rómaiul"
                subtitle="Keresd meg az egyes számszomszédokat!"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 3: Római számok 0-50-ig */}
        {(showAll || activeSubSectionId === 'g2-roman-sec-3') && (
          <section>
            <SectionHeader id="g2-roman-sec-3" number={3} title="Római számok 0-50-ig" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Római Számok 50-ig Kvíz"
                subtitle="Kerek tízesek és kétjegyű számok 50-ig"
                type="Hamarosan"
                emoji="🏛️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="XL és L Kaland"
                subtitle="Gyakorold a 40 és 50 körüli számokat!"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Tízesek és Egyesek Építése"
                subtitle="Állítsd össze a római számokat!"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 4: Római számok 0-100-ig */}
        {(showAll || activeSubSectionId === 'g2-roman-sec-4') && (
          <section>
            <SectionHeader id="g2-roman-sec-4" number={4} title="Római számok 0-100-ig" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Római Számok 100-ig Kvíz"
                subtitle="Számok olvasása és írása 100-ig"
                type="Hamarosan"
                emoji="💯"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Római Számok a Világban"
                subtitle="Órák, könyvfejezetek és történelmi számok"
                type="Hamarosan"
                emoji="⏰"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyufaszálas Fejtörők"
                subtitle="Logikai feladványok római számokkal"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic IV: Szorzás
  if (topicId === 'g2-multiplication') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Szorzás 2-vel */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-2') && (
          <section>
            <SectionHeader id="g2-mult-sec-2" number={1} title="Szorzás 2-vel" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="2-es Szorzótábla Kvíz"
                subtitle="Szorzás 2-vel és duplázás 20-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Páros Szorzatok Gyakorló"
                subtitle="Gyakorold a kettesével lépkedést!"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Villám Kettes Szorzó"
                subtitle="Gyors számolási kihívás"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 2: Szorzás 3-mal */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-3') && (
          <section>
            <SectionHeader id="g2-mult-sec-3" number={2} title="Szorzás 3-mal" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="3-as Szorzótábla Kvíz"
                subtitle="Szorzás 3-mal és hármas ugrások 30-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Hármas Csoportok Játék"
                subtitle="Építs hármas csoportokat!"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Szorzás 3-mal Gyakorló"
                subtitle="Páros és páratlan szorzatok"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 3: Szorzás 4-gyel */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-4') && (
          <section>
            <SectionHeader id="g2-mult-sec-4" number={3} title="Szorzás 4-gyel" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="4-es Szorzótábla Kvíz"
                subtitle="Szorzás 4-gyel és kétszeres duplázás 40-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Duplázás Duplája Kaland"
                subtitle="Kösd össze a 2-es és 4-es szorzótáblát!"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Négyes Lépések Kvíz"
                subtitle="Villámgyors számolás 4-esével"
                type="Hamarosan"
                emoji="🚀"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 4: Szorzás 5-tel */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-5') && (
          <section>
            <SectionHeader id="g2-mult-sec-5" number={4} title="Szorzás 5-tel" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="5-ös Szorzótábla Kvíz"
                subtitle="Szorzás 5-tel 50-ig (0 és 5 végződések)"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Óralap és az 5-ös Tábla"
                subtitle="Percek számlálása ötösével"
                type="Hamarosan"
                emoji="⏰"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Ötös Csoportosító"
                subtitle="Kézujjak és ötös csomagok"
                type="Hamarosan"
                emoji="🖐️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 5: Szorzás 6-tal */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-6') && (
          <section>
            <SectionHeader id="g2-mult-sec-6" number={5} title="Szorzás 6-tal" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="6-os Szorzótábla Kvíz"
                subtitle="Szorzás 6-tal és páros szorzatok 60-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="3-as és 6-os Kapcsolata"
                subtitle="Gyakorold a szorzást 3-as bázissal!"
                type="Hamarosan"
                emoji="🔗"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Bontási Mester 6-tal"
                subtitle="Bontsd fel 5-re és 1-re a szorzást!"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 6: Szorzás 7-tel */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-7') && (
          <section>
            <SectionHeader id="g2-mult-sec-7" number={6} title="Szorzás 7-tel" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="7-es Szorzótábla Kvíz"
                subtitle="Szorzás 7-tel és a hét napjai 70-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Hetes Lépések Kaland"
                subtitle="Napok és hetek átszámítása"
                type="Hamarosan"
                emoji="📅"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="7-es Szorzópárok Mestere"
                subtitle="Jegyezd meg a legnehezebb szorzatokat!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 7: Szorzás 8-cal */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-8') && (
          <section>
            <SectionHeader id="g2-mult-sec-8" number={7} title="Szorzás 8-cal" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="8-as Szorzótábla Kvíz"
                subtitle="Szorzás 8-cal és a 3-szoros duplázás 80-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Duplázási Lánc Játék"
                subtitle="2 -> 4 -> 8 szorzási trükkök"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Nyolcas Ugrások"
                subtitle="Célozd meg a helyes 8-as szorzatot!"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 8: Szorzás 9-cel */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-9') && (
          <section>
            <SectionHeader id="g2-mult-sec-9" number={8} title="Szorzás 9-cel" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="9-es Szorzótábla Kvíz"
                subtitle="Szorzás 9-cel és számjegyösszeg-szabály 90-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="9-es Ujjtrükk Gyakorló"
                subtitle="Számolj villámgyorsan az ujjtrükkel!"
                type="Hamarosan"
                emoji="🪄"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="10 Mínusz 1 Stratégia"
                subtitle="Szorozz 10-zel, majd vonj le egyet!"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 9: Szorzás 10-zel */}
        {(showAll || activeSubSectionId === 'g2-mult-sec-10') && (
          <section>
            <SectionHeader id="g2-mult-sec-10" number={9} title="Szorzás 10-zel" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="10-es Szorzótábla Kvíz"
                subtitle="Szorzás 10-zel és a nulla utánaírása 100-ig"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Kerek Tízesek Mestere"
                subtitle="Lépj be a 100-as számkörbe!"
                type="Hamarosan"
                emoji="💯"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Helyiérték Váltó 10-zel"
                subtitle="Toljuk el egy helyiértékkel a számot!"
                type="Hamarosan"
                emoji="🚀"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic V: Osztás
  if (topicId === 'g2-division') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Osztás 2-vel */}
        {(showAll || activeSubSectionId === 'g2-div-sec-2') && (
          <section>
            <SectionHeader id="g2-div-sec-2" number={1} title="Osztás 2-vel" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="2-es Bennfoglaló Kvíz"
                subtitle="Osztás és bennfoglalás 2-vel 20-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Felező Kaland"
                subtitle="Páros számok felezése"
                type="Hamarosan"
                emoji="🍰"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 2-es Szorzással"
                subtitle="Fordítsd meg a műveletet!"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 2: Osztás 3-mal */}
        {(showAll || activeSubSectionId === 'g2-div-sec-3') && (
          <section>
            <SectionHeader id="g2-div-sec-3" number={2} title="Osztás 3-mal" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="3-as Bennfoglaló Kvíz"
                subtitle="Harmadolás és 3-as csoportok 30-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Harmadoló Játék"
                subtitle="Oszd el 3 egyenlő részre!"
                type="Hamarosan"
                emoji="🍕"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 3-as Szorzással"
                subtitle="Szorozz vissza a pontosságért!"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 3: Osztás 4-gyel */}
        {(showAll || activeSubSectionId === 'g2-div-sec-4') && (
          <section>
            <SectionHeader id="g2-div-sec-4" number={3} title="Osztás 4-gyel" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="4-es Bennfoglaló Kvíz"
                subtitle="Negyedelés és 4-es csoportok 40-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Kétszeres Felező"
                subtitle="Felezd meg kétszer a számot!"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 4-es Szorzással"
                subtitle="Negyedek visszaszorzása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 4: Osztás 5-tel */}
        {(showAll || activeSubSectionId === 'g2-div-sec-5') && (
          <section>
            <SectionHeader id="g2-div-sec-5" number={4} title="Osztás 5-tel" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="5-ös Bennfoglaló Kvíz"
                subtitle="Ötödölés és 5-ös bennfoglalás 50-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="0 és 5 Végű Számok Osztása"
                subtitle="Gyakorold a gyors felismerést!"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 5-ös Szorzással"
                subtitle="Ötös csoportok visszaszámolása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 5: Osztás 6-tal */}
        {(showAll || activeSubSectionId === 'g2-div-sec-6') && (
          <section>
            <SectionHeader id="g2-div-sec-6" number={5} title="Osztás 6-tal" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="6-os Bennfoglaló Kvíz"
                subtitle="Hatodolás és 6-os csoportok 60-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Lépésenkénti Osztás (3 majd 2)"
                subtitle="Okos osztási trükkök"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 6-os Szorzással"
                subtitle="Műveletpár készítése"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 6: Osztás 7-tel */}
        {(showAll || activeSubSectionId === 'g2-div-sec-7') && (
          <section>
            <SectionHeader id="g2-div-sec-7" number={6} title="Osztás 7-tel" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="7-es Bennfoglaló Kvíz"
                subtitle="Hetedelés és 7-es csoportok 70-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Hány Hét Van Benne?"
                subtitle="Szöveges naptáras feladványok"
                type="Hamarosan"
                emoji="📅"
                disabled={true}
                icon={<FileText className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 7-es Szorzással"
                subtitle="Hetes szorzótábla alkalmazása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 7: Osztás 8-cal */}
        {(showAll || activeSubSectionId === 'g2-div-sec-8') && (
          <section>
            <SectionHeader id="g2-div-sec-8" number={7} title="Osztás 8-cal" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="8-as Bennfoglaló Kvíz"
                subtitle="Nyolcadolás és 8-as csoportok 80-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Háromszori Felezés Mester"
                subtitle="Felezd, felezd, majd felezd újra!"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 8-as Szorzással"
                subtitle="Nyolcadok visszaszorzása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 8: Osztás 9-cel */}
        {(showAll || activeSubSectionId === 'g2-div-sec-9') && (
          <section>
            <SectionHeader id="g2-div-sec-9" number={8} title="Osztás 9-cel" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="9-es Bennfoglaló Kvíz"
                subtitle="Kilencedelés és 9-es csoportok 90-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Számjegyösszeg és Osztás"
                subtitle="Ellenőrizd a 9-es oszthatóságot!"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 9-es Szorzással"
                subtitle="Ujjtrükkös ellenőrzés"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 9: Osztás 10-zel */}
        {(showAll || activeSubSectionId === 'g2-div-sec-10') && (
          <section>
            <SectionHeader id="g2-div-sec-10" number={9} title="Osztás 10-zel" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="10-es Bennfoglaló Kvíz"
                subtitle="Tizedelés és a 0 elhagyása 100-ig"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Kerek Tízesek Felezője és Tizedelője"
                subtitle="Műveletek kerek tízesekkel"
                type="Hamarosan"
                emoji="💯"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Ellenőrzés 10-es Szorzással"
                subtitle="Írd vissza a nullát!"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VII: Geometria
  if (topicId === 'g2-geometry') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Bevezető */}
        {(showAll || activeSubSectionId === 'g2-geo-sec-1') && (
          <section>
            <SectionHeader id="g2-geo-sec-1" number={1} title="Bevezető" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tájékozódás a Térben és Síkban"
                subtitle="Irányok, viszonyok és lépések a négyzethálón"
                type="Hamarosan"
                emoji="🧭"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Vonalak és Szakaszok Kvíz"
                subtitle="Egyenes, görbe, törött vonal és szakasz"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Vonalrajzoló Kihívás"
                subtitle="Szakaszok mérése és összekötése vonalzóval"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 2: Testek, síkidomok */}
        {(showAll || activeSubSectionId === 'g2-geo-sec-2') && (
          <section>
            <SectionHeader id="g2-geo-sec-2" number={2} title="Testek, síkidomok" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Síkidomok és Testek"
                subtitle="2D síkidomok és 3D testek interaktív felfedezése"
                type="Eszköz"
                emoji="📐"
                onClick={() => onActivitySelect('geometry', topicId)}
                icon={<Blocks className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Síkidom Felismerő Kvíz"
                subtitle="Négyzet, téglalap, háromszög, kör csúcsai és oldalai"
                type="Hamarosan"
                emoji="🔺"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Testek és Lapjaik"
                subtitle="Kocka, téglatest, henger és gömb tulajdonságai"
                type="Hamarosan"
                emoji="🧊"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: Szimmetria, tükrözés */}
        {(showAll || activeSubSectionId === 'g2-geo-sec-3') && (
          <section>
            <SectionHeader id="g2-geo-sec-3" number={3} title="Szimmetria, tükrözés" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tükörtengely Kereső"
                subtitle="Szimmetria a természetben és a mindennapokban"
                type="Hamarosan"
                emoji="🦋"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Tükrözés Négyzethálón"
                subtitle="Rajzold meg és egészítsd ki a tükörképet!"
                type="Hamarosan"
                emoji="🪞"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Szimmetria Mester Kvíz"
                subtitle="Ismerd fel a tengelyesen szimmetrikus alakzatokat!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VIII: Mérések
  if (topicId === 'g2-measurements') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Hosszúság mérés */}
        {(showAll || activeSubSectionId === 'g2-meas-sec-1') && (
          <section>
            <SectionHeader id="g2-meas-sec-1" number={1} title="Hosszúság mérés" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hosszúság Átváltó"
                subtitle="M, dm, cm, mm vizuális ábrázolása"
                type="Eszköz"
                emoji="📏"
                onClick={() => onActivitySelect('unit-converter', topicId)}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Hosszúság Mérés Kvíz"
                subtitle="Mértékegységek és átváltások m, dm, cm között"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Vonalzó Mester"
                subtitle="Szakaszok pontos mérése és becslése"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 2: Tömeg mérés */}
        {(showAll || activeSubSectionId === 'g2-meas-sec-2') && (
          <section>
            <SectionHeader id="g2-meas-sec-2" number={2} title="Tömeg mérés" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tömeg Mérés Kvíz"
                subtitle="Kilogramm és dekagramm gyakorlása"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Mérleg és Egyensúly"
                subtitle="Kétkarú mérleg feladványok"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Tömeg Becslő Kaland"
                subtitle="Nehezebb vagy könnyebb?"
                type="Hamarosan"
                emoji="🍎"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 3: Űrtartalom mérés */}
        {(showAll || activeSubSectionId === 'g2-meas-sec-3') && (
          <section>
            <SectionHeader id="g2-meas-sec-3" number={3} title="Űrtartalom mérés" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Űrmértékegység Átváltó"
                subtitle="Folyadékok áttöltése mérőpoharakba (l, dl, cl)"
                type="Eszköz"
                emoji="🚰"
                onClick={() => onActivitySelect('capacity-converter', topicId)}
                icon={<FlaskConical className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Űrtartalom Kvíz"
                subtitle="Liter és deciliter átváltási feladatok"
                type="Hamarosan"
                emoji="🥛"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Áttöltési Feladványok"
                subtitle="Logikai fejtörők mérőedényekkel"
                type="Hamarosan"
                emoji="🧪"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Legacy fallback for basic-operations / g2-basic
  if (topicId === 'basic-operations' || topicId === 'g2-basic') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
        <Grade2MathModule
          onBack={() => {}}
          initialView="grade2-basic"
          onStartActivity={(type) => onActivitySelect(type, topicId)}
        />
      </Suspense>
    );
  }

  // Fallback for other topics: textbook materials
  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
      </div>
      <MaterialGallery
        grade={2}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade2View;
