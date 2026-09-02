import React, { lazy, Suspense } from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  Blocks,
  BookOpen,
  Calculator,
  CircleDot,
  Clock,
  FileText,
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

const Grade1MathModule = lazy(() => import('@/components/math/grade-1/Grade1MathModule').then(m => ({ default: m.Grade1MathModule })));

export const Grade1View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  // Topic I: Előkészítő időszak
  if (topicId === 'g1-prep-period') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Válogatások */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-1') && (
          <section>
            <SectionHeader id="g1-prep-sec-1" number={1} title="Válogatások" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csoportosító Játék"
                subtitle="Válogasd szét a tárgyakat tulajdonságaik szerint!"
                type="Játék"
                emoji="🎨"
                onClick={() => onActivitySelect('grouping-game', topicId)}
                icon={<Blocks className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Venn-diagram Kaland"
                subtitle="Halmazok és metszetek felfedezése"
                type="Játék"
                emoji="⭕"
                onClick={() => onActivitySelect('venn-diagram-game', topicId)}
                icon={<Layers className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Kakukktojás Kereső"
                subtitle="Melyik kép nem illik a csoportba?"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 2: Összehasonlítások */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-2') && (
          <section>
            <SectionHeader id="g1-prep-sec-2" number={2} title="Összehasonlítások" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hosszabb vagy Rövidebb?"
                subtitle="Tárgyak hosszúságának és magasságának összevetése"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Melyik a Nehezebb?"
                subtitle="Súlyérzet és tömeg becslése"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Növekvő Sorrend Építő"
                subtitle="Rendezd sorba a legkisebbtől a legnagyobbig!"
                type="Hamarosan"
                emoji="🪜"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: Logikai lapok */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-3') && (
          <section>
            <SectionHeader id="g1-prep-sec-3" number={3} title="Logikai lapok" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Logikai Lapok Mester"
                subtitle="Szín, forma, méret és lyukasság logikai játéka"
                type="Játék"
                emoji="🧩"
                onClick={() => onActivitySelect('logic-blocks', topicId)}
                icon={<Layers className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Formakereső Kvíz"
                subtitle="Kör, négyzet, háromszög és téglalap"
                type="Hamarosan"
                emoji="🔺"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Egy Tulajdonságban Eltérő"
                subtitle="Keresd meg a szomszédos lapot!"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 4: Pálcikák és korongok */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-4') && (
          <section>
            <SectionHeader id="g1-prep-sec-4" number={4} title="Pálcikák és korongok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számkép Kirakó Korongokkal"
                subtitle="Piros és kék korongok számképei 10-es keretben"
                type="Hamarosan"
                emoji="🔴"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Pálcika Építőműhely"
                subtitle="Építs alakzatokat számolópálcikákból!"
                type="Hamarosan"
                emoji="🥢"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Korongforgató Kihívás"
                subtitle="Számok bontásának játékos gyakorlása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 5: Színesrúd-készlet */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-5') && (
          <section>
            <SectionHeader id="g1-prep-sec-5" number={5} title="Színesrúd-készlet" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Színes Rúdlépcső Építő"
                subtitle="Rudak sorbarendezése fehérről a narancsig (1-től 10-ig)"
                type="Hamarosan"
                emoji="🪜"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Szőnyegezés Rudakkal"
                subtitle="Alkoss azonos hosszúságú vonatelemeket!"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Melyik Szín Melyik Szám?"
                subtitle="Párosítsd a rudakat a számmal!"
                type="Hamarosan"
                emoji="🎨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 6: Tájékozódás */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-6') && (
          <section>
            <SectionHeader id="g1-prep-sec-6" number={6} title="Tájékozódás" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Jobbra vagy Balra?"
                subtitle="Irányok és térbeli helyzetek felismerése"
                type="Hamarosan"
                emoji="🧭"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Lépések a Rácsmezőn"
                subtitle="Kövesd az utasításokat a négyzethálón!"
                type="Hamarosan"
                emoji="🗺️"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Alatta, Felette, Mellette"
                subtitle="Tárgyak elhelyezkedése a térben és képeken"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 7: Számlálások */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-7') && (
          <section>
            <SectionHeader id="g1-prep-sec-7" number={7} title="Számlálások" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számcsoportosító Kaland"
                subtitle="Számold meg és csoportosítsd a tárgyakat!"
                type="Játék"
                emoji="🔢"
                onClick={() => onActivitySelect('number-grouping-game', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Egyenkénti Számláló Kvíz"
                subtitle="Hányat látsz a képen? Számlálás 10-ig"
                type="Hamarosan"
                emoji="👆"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Hangok és Tapsok Számlálása"
                subtitle="Hallás utáni mennyiségmegállapítás"
                type="Hamarosan"
                emoji="🔔"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 8: Több, kevesebb, ugyanannyi */}
        {(showAll || activeSubSectionId === 'g1-prep-sec-8') && (
          <section>
            <SectionHeader id="g1-prep-sec-8" number={8} title="Több, kevesebb, ugyanannyi" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Párosító Összehasonlító"
                subtitle="Kössük össze egy-egy vonallal a párokat!"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Kacsacsőr Bajnokság"
                subtitle="Merre nyílik a kacsacsőr? (<, >, =)"
                type="Hamarosan"
                emoji="🦆"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="I. Fejezet Záró Nagydíj"
                subtitle="Az előkészítő időszak összefoglaló tudáspróbája"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic II: Számolás 0-tól 5-ig
  if (topicId === 'g1-numbers-to-5') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Az egy */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-1') && (
          <section>
            <SectionHeader id="g1-count5-sec-1" number={1} title="Az egy" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Az Egy Felfedezése"
                subtitle="Az 1-es számfogalom, számkép és írás"
                type="Hamarosan"
                emoji="1️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Egy Tárgy Kereső"
                subtitle="Keresd meg, amiből csak egyetlen egy van!"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Fehér Rúd Kaland"
                subtitle="A legkisebb színes rúd értéke 1"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: A kettő */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-2') && (
          <section>
            <SectionHeader id="g1-count5-sec-2" number={2} title="A kettő" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Kettő és a Párok"
                subtitle="2 korong, 2 ujj és párok a világban"
                type="Hamarosan"
                emoji="2️⃣"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="A 2 Bontása Kvíz"
                subtitle="2 = 1 + 1 játékos gyakorlása"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Páros Kereső Játék"
                subtitle="Párosítsd a tárgyakat kettesével!"
                type="Hamarosan"
                emoji="🧦"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: A nulla */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-3') && (
          <section>
            <SectionHeader id="g1-count5-sec-3" number={3} title="A nulla" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Nulla és az Üres Halmaz"
                subtitle="A semmi és a 0 fogalma"
                type="Hamarosan"
                emoji="0️⃣"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Üres vagy Teli?"
                subtitle="Ismerd fel a 0 darabot tartalmazó csoportot!"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="A 0 a Számegyenesen"
                subtitle="A számegyenes kezdőpontja"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 4: A három */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-4') && (
          <section>
            <SectionHeader id="g1-count5-sec-4" number={4} title="A három" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Három Felfedezése"
                subtitle="A 3-as számkép, háromszög és írás"
                type="Hamarosan"
                emoji="3️⃣"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="A 3 Bontásai"
                subtitle="1 + 2 és 2 + 1 bontások kirakása korongokkal"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Világoskék Rúd Műhely"
                subtitle="Építs hármas hosszúságú rudakat!"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 5: A négy */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-5') && (
          <section>
            <SectionHeader id="g1-count5-sec-5" number={5} title="A négy" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Négy Felfedezése"
                subtitle="A 4-es számkép, négyzetek és 4 évszak"
                type="Hamarosan"
                emoji="4️⃣"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="A 4 Bontásai"
                subtitle="1+3, 2+2, 3+1 bontások gyakorlása"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Piros Rúd és Négyzetek"
                subtitle="Formák építése 4 pálcikából"
                type="Hamarosan"
                emoji="🟥"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 6: Az öt */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-6') && (
          <section>
            <SectionHeader id="g1-count5-sec-6" number={6} title="Az öt" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Az Öt és az Öt Ujjunk"
                subtitle="Egy teljes kézfej és a dobókocka 5-ös képe"
                type="Hamarosan"
                emoji="5️⃣"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Az 5 Bontásai Mester"
                subtitle="1+4, 2+3, 3+2, 4+1 bontások"
                type="Hamarosan"
                emoji="🖐️"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Sárga Rúd Kaland"
                subtitle="Kirakó az 5-ös számkörben"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 7: Összeadás 0-tól 5-ig */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-7') && (
          <section>
            <SectionHeader id="g1-count5-sec-7" number={7} title="Összeadás 0-tól 5-ig" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összeadás 5-ig Kvíz"
                subtitle="Összeadás művelete, a + jel és a 0 hozzáadása"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Korong Összetoló Játék"
                subtitle="Vizuális egyesítés piros és kék korongokkal"
                type="Hamarosan"
                emoji="🔴"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="green"
              />
              <ActivityPlaceholder
                title="Számkép Összeadó"
                subtitle="Párosítsd a képeket az összeadással!"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 8: Kivonás 0-tól 5-ig */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-8') && (
          <section>
            <SectionHeader id="g1-count5-sec-8" number={8} title="Kivonás 0-tól 5-ig" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kivonás 5-ig Kvíz"
                subtitle="Kivonás művelete, a - jel és a 0 elvétele"
                type="Hamarosan"
                emoji="➖"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Korong Elvevő Játék"
                subtitle="Elvétel és áthúzás vizuális modellezése"
                type="Hamarosan"
                emoji="🔵"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Művelet Ellenőrző 5-ig"
                subtitle="Különbség ellenőrzése összeadással"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 9: Megálló */}
        {(showAll || activeSubSectionId === 'g1-count5-sec-9') && (
          <section>
            <SectionHeader id="g1-count5-sec-9" number={9} title="Megálló" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="II. Fejezet Záró Kvíz"
                subtitle="Összefoglaló tudáspróba 0-tól 5-ig"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="5-ös Bajnokság"
                subtitle="Számképek, bontások és műveletek egyben"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Kis Bajnok Nagydíj"
                subtitle="Gratulálunk az 5-ös számkör meghódításához!"
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

  // Topic III: Számkörbővítés, számolás 10-ig
  if (topicId === 'g1-numbers-to-10') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: A hat */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-1') && (
          <section>
            <SectionHeader id="g1-count10-sec-1" number={1} title="A hat" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Hat Felfedezése"
                subtitle="A 6-os számkép, dobókocka 6 és írás"
                type="Hamarosan"
                emoji="6️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="A 6 Bontásai"
                subtitle="5+1, 4+2, 3+3 bontások gyakorlása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Sötétzöld Rúd Műhely"
                subtitle="Hat egységnyi rudak kirakása"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 2: Számolás 0-tól 6-ig */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-2') && (
          <section>
            <SectionHeader id="g1-count10-sec-2" number={2} title="Számolás 0-tól 6-ig" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számolás 6-ig Kvíz"
                subtitle="Összeadás és kivonás a 6-os számkörben"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Pótold 6-ra!"
                subtitle="Mennyit kell hozzáadni, hogy 6 legyen?"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Lépkedés a Számegyenesen"
                subtitle="Ugrások 0-tól 6-ig oda-vissza"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: Páros és páratlan számok */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-3') && (
          <section>
            <SectionHeader id="g1-count10-sec-3" number={3} title="Páros és páratlan számok" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Páros és Páratlan Kaland"
                subtitle="Párosítás és a 2-es csoportok felfedezése"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Páros Számok Keresője"
                subtitle="0, 2, 4, 6 válogatása"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Páratlan Magányos Elem"
                subtitle="Ismerd fel az 1, 3, 5 számokat!"
                type="Hamarosan"
                emoji="🧍"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 4: Megálló */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-4') && (
          <section>
            <SectionHeader id="g1-count10-sec-4" number={4} title="Megálló (6-ig)" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="6-os Megálló Kvíz"
                subtitle="Tudáspróba és ismétlés 6-ig"
                type="Hamarosan"
                emoji="🛑"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Kis Bajnok Próbatétel"
                subtitle="Számképek és páros-páratlan feladatok"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 5: A hét */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-5') && (
          <section>
            <SectionHeader id="g1-count10-sec-5" number={5} title="A hét" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Hét Felfedezése"
                subtitle="A 7-es számkép, 7 napja a hétnek és írás"
                type="Hamarosan"
                emoji="7️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="A 7 Bontásai"
                subtitle="6+1, 5+2, 4+3 bontások"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Fekete Rúd Kaland"
                subtitle="7 fehér kocka hosszúságú rúd"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 6: Számolás 0-tól 7-ig */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-6') && (
          <section>
            <SectionHeader id="g1-count10-sec-6" number={6} title="Számolás 0-tól 7-ig" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számolás 7-ig Kvíz"
                subtitle="Összeadás és kivonás 7-ig"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Pótold 7-re!"
                subtitle="Hiányzó tagok keresése"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Számolási Lánc 7-ig"
                subtitle="Többlépéses számolási feladványok"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 7: Számszomszédok */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-7') && (
          <section>
            <SectionHeader id="g1-count10-sec-7" number={7} title="Számszomszédok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számszomszéd Kereső"
                subtitle="Kisebb és nagyobb szomszédok a számegyenesen"
                type="Hamarosan"
                emoji="🏡"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Köztes Számok Kvíz"
                subtitle="Melyik szám van a kettő között?"
                type="Hamarosan"
                emoji="❓"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Szomszédos Lépések"
                subtitle="1-gyel több és 1-gyel kevesebb"
                type="Hamarosan"
                emoji="👣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 8: Megálló */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-8') && (
          <section>
            <SectionHeader id="g1-count10-sec-8" number={8} title="Megálló (7-ig)" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="7-es Megálló Kvíz"
                subtitle="Tudáspróba és ismétlés 7-ig"
                type="Hamarosan"
                emoji="🛑"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Számszomszéd Mester"
                subtitle="Számolási kihívás 7-ig"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 9: A nyolc */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-9') && (
          <section>
            <SectionHeader id="g1-count10-sec-9" number={9} title="A nyolc" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Nyolc Felfedezése"
                subtitle="A 8-as számkép, pók 8 lába és írás"
                type="Hamarosan"
                emoji="8️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="A 8 Bontásai (Felezés)"
                subtitle="4+4, 5+3, 6+2, 7+1 bontások"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Barna Rúd Építő"
                subtitle="8-as vonatok és szőnyegek"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 10: Számolás 0-tól 8-ig */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-10') && (
          <section>
            <SectionHeader id="g1-count10-sec-10" number={10} title="Számolás 0-tól 8-ig" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számolás 8-ig Kvíz"
                subtitle="Összeadás és kivonás 8-ig"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Pótold 8-ra!"
                subtitle="Keresd meg a hiányzó tagot!"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Művelet Párosító 8-ig"
                subtitle="Kapcsolat az összeadás és kivonás között"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 11: Nyitott mondatok */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-11') && (
          <section>
            <SectionHeader id="g1-count10-sec-11" number={11} title="Nyitott mondatok" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Nyitott Mondatok Kaland"
                subtitle="Keresd a dobozba illő számot!"
                type="Hamarosan"
                emoji="🔲"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Egyenlőtlenségek Kvíz"
                subtitle="Mely számok teszik igazzá az állítást?"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Kacsacsőr és Nyitott Dobozok"
                subtitle="Műveletek relációs jelekkel"
                type="Hamarosan"
                emoji="🦆"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 12: Megálló */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-12') && (
          <section>
            <SectionHeader id="g1-count10-sec-12" number={12} title="Megálló (8-ig)" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="8-as Megálló Kvíz"
                subtitle="Tudáspróba és ismétlés 8-ig"
                type="Hamarosan"
                emoji="🛑"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Nyitott Mondat Mester"
                subtitle="Összefoglaló feladatok"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 13: A kilenc */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-13') && (
          <section>
            <SectionHeader id="g1-count10-sec-13" number={13} title="A kilenc" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Kilenc Felfedezése"
                subtitle="A 9-es számkép, 3x3 rács és írás"
                type="Hamarosan"
                emoji="9️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="A 9 Bontásai"
                subtitle="8+1, 7+2, 6+3, 5+4 bontások"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Sötétkék Rúd Kaland"
                subtitle="Kilences hosszúságú rudak"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 14: Számolás 0-tól 9-ig */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-14') && (
          <section>
            <SectionHeader id="g1-count10-sec-14" number={14} title="Számolás 0-tól 9-ig" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számolás 9-ig Kvíz"
                subtitle="Összeadás és kivonás 9-ig"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Pótold 9-re!"
                subtitle="Keresd meg a hiányzó tagot!"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Láncszámolás 9-ig"
                subtitle="Több művelet egymás után"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 15: A sorszámnevek */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-15') && (
          <section>
            <SectionHeader id="g1-count10-sec-15" number={15} title="A sorszámnevek" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Sorszámnevek Kaland"
                subtitle="Első, második, harmadik... 10-ig"
                type="Hamarosan"
                emoji="🥇"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Hol Áll a Sorban?"
                subtitle="Helymeghatározás sorszámnevekkel"
                type="Hamarosan"
                emoji="🚶"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Pont a Szám Után"
                subtitle="Sorszámok helyes lejegyzése"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 16: Megálló */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-16') && (
          <section>
            <SectionHeader id="g1-count10-sec-16" number={16} title="Megálló (9-ig)" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="9-es Megálló Kvíz"
                subtitle="Tudáspróba és ismétlés 9-ig"
                type="Hamarosan"
                emoji="🛑"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Sorszámnév Bajnokság"
                subtitle="Gyakorlás a 9-es számkörben"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 17: A tíz */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-17') && (
          <section>
            <SectionHeader id="g1-count10-sec-17" number={17} title="A tíz" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tíz és a Tízesbarátok"
                subtitle="1 tízes és 0 egyes, két kezünk ujjai"
                type="Hamarosan"
                emoji="🔟"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Tízesbarátok Keresője"
                subtitle="1+9, 2+8, 3+7, 4+6, 5+5 párok"
                type="Hamarosan"
                emoji="🤝"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Narancssárga Rúd Mester"
                subtitle="A teljes tízes rúd és szőnyegezés"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 18: Számolás 0-tól 10-ig */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-18') && (
          <section>
            <SectionHeader id="g1-count10-sec-18" number={18} title="Számolás 0-tól 10-ig" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számolás 10-ig Kvíz"
                subtitle="Összeadás és kivonás a teljes 10-es számkörben"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Pótlás 10-re Kihívás"
                subtitle="Gyors számolás tízesre kiegészítéssel"
                type="Hamarosan"
                emoji="💯"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Műveletsorok 10-ig"
                subtitle="Összeadás és kivonás vegyesen"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 19: Szöveges feladatok */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-19') && (
          <section>
            <SectionHeader id="g1-count10-sec-19" number={19} title="Szöveges feladatok" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges Feladat Megoldó"
                subtitle="Adatok, terv, számolás és válasz 10-ig"
                type="Hamarosan"
                emoji="📖"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Képes Feladványok"
                subtitle="Szöveges feladat alkotása képekről"
                type="Hamarosan"
                emoji="🖼️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Válaszadó Bajnokság"
                subtitle="Egész mondatos válaszadás gyakorlása"
                type="Hamarosan"
                emoji="✍️"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 20: Megálló */}
        {(showAll || activeSubSectionId === 'g1-count10-sec-20') && (
          <section>
            <SectionHeader id="g1-count10-sec-20" number={20} title="Megálló (A teljes 10-es számkör)" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="III. Fejezet Záró Nagydíj"
                subtitle="A teljes 10-es számkör összefoglaló tudáspróbája"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="10-es Számkör Mester"
                subtitle="Bontások, műveletek és szöveges feladatok"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Arany Érem Kitüntetés"
                subtitle="Gratulálunk a 10-es számkör elsajátításához!"
                type="Hamarosan"
                emoji="🥇"
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

  // Topic IV: Geometria
  if (topicId === 'g1-geometry') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Vonalak */}
        {(showAll || activeSubSectionId === 'g1-geo-sec-1') && (
          <section>
            <SectionHeader id="g1-geo-sec-1" number={1} title="Vonalak" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenes és Görbe Vonalak"
                subtitle="Egyenes, görbe, nyitott és zárt vonalak felfedezése"
                type="Hamarosan"
                emoji="〰️"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Nyitott és Zárt Vonalak"
                subtitle="Kívül, belül és a vonalon elhelyezkedő pontok"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Vonalrajzoló Mester"
                subtitle="Vonalzó használata és vonalkövető játék"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 2: Síkidomok */}
        {(showAll || activeSubSectionId === 'g1-geo-sec-2') && (
          <section>
            <SectionHeader id="g1-geo-sec-2" number={2} title="Síkidomok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kör, Négyzet, Háromszög, Téglalap"
                subtitle="A 4 alapvető síkidom felismerése és jellemzői"
                type="Hamarosan"
                emoji="🔺"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Síkidom Kereső Kaland"
                subtitle="Válogasd szét a formákat alak, méret és szín szerint!"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Pálcika és Gyurma Alakzatok"
                subtitle="Építs síkidomokat pálcikákból és gyurmából!"
                type="Hamarosan"
                emoji="🥢"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 3: Testek */}
        {(showAll || activeSubSectionId === 'g1-geo-sec-3') && (
          <section>
            <SectionHeader id="g1-geo-sec-3" number={3} title="Testek" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kocka, Téglatest, Gömb, Henger"
                subtitle="Térbeli testek felismerése a mindennapi tárgyakban"
                type="Hamarosan"
                emoji="🧊"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gurul vagy Csúszik?"
                subtitle="Sík és görbe felületek mozgása a lejtőn"
                type="Hamarosan"
                emoji="⚽"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Építőkocka Műhely"
                subtitle="Várak és tornyok építése geometriai testekből"
                type="Hamarosan"
                emoji="🏰"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="IV. Fejezet Záró Nagydíj"
                subtitle="A geometria fejezet összefoglaló tudáspróbája"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic V: Mérések
  if (topicId === 'g1-measurements') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: A hosszúság mérése */}
        {(showAll || activeSubSectionId === 'g1-meas-sec-1') && (
          <section>
            <SectionHeader id="g1-meas-sec-1" number={1} title="A hosszúság mérése" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hosszabb vagy Rövidebb?"
                subtitle="Tárgyak hosszának és magasságának közvetlen összehasonlítása"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Mérés Természetes Egységekkel"
                subtitle="Hány lépés, arasz, láb vagy pálcika hosszú?"
                type="Hamarosan"
                emoji="👣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="A Centiméter és Méter"
                subtitle="Ismerkedés a vonalzóval és a szabványos mértékekkel (cm, m)"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 2: A tömeg mérése */}
        {(showAll || activeSubSectionId === 'g1-meas-sec-2') && (
          <section>
            <SectionHeader id="g1-meas-sec-2" number={2} title="A tömeg mérése" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Nehezebb vagy Könnyebb?"
                subtitle="Tárgyak súlyának összehasonlítása kézbe véve"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Kétkarú Mérleg Kaland"
                subtitle="Melyik serpenyő billen lejjebb? Egyensúly teremtése"
                type="Hamarosan"
                emoji="🪙"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="A Kilogramm és Dekagramm"
                subtitle="Ismerkedés a kg és dkg mértékegységekkel a boltban"
                type="Hamarosan"
                emoji="🍎"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 3: Az űrtartalom mérése */}
        {(showAll || activeSubSectionId === 'g1-meas-sec-3') && (
          <section>
            <SectionHeader id="g1-meas-sec-3" number={3} title="Az űrtartalom mérése" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Melyikbe Fér Több?"
                subtitle="Edények és poharak befogadóképességének összevetése"
                type="Hamarosan"
                emoji="🥛"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Áttöltögetős Műhely"
                subtitle="Mérés pohárral, bögrével és kancsóval"
                type="Hamarosan"
                emoji="🫗"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="A Liter és Deciliter"
                subtitle="Ismerkedés a liter (l) és deciliter (dl) dobozokkal"
                type="Hamarosan"
                emoji="🧃"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 4: Az idő mérése */}
        {(showAll || activeSubSectionId === 'g1-meas-sec-4') && (
          <section>
            <SectionHeader id="g1-meas-sec-4" number={4} title="Az idő mérése" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Napszakok és a Hét Napjai"
                subtitle="Reggel, dél, este és a hét 7 napjának sorrendje"
                type="Hamarosan"
                emoji="🌅"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Egész Órák a Számlapon"
                subtitle="A kismutató és nagymutató, órák leolvasása"
                type="Hamarosan"
                emoji="⏰"
                disabled={true}
                icon={<Clock className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Gyorsabban vagy Lassabban?"
                subtitle="Események időtartamának játékos becslése"
                type="Hamarosan"
                emoji="⏳"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="V. Fejezet Záró Nagydíj"
                subtitle="A mérések fejezet összefoglaló tudáspróbája"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VI: Számkörbővítés, számolás 20-ig
  if (topicId === 'g1-numbers-to-20') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: A tizenegy */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-1') && (
          <section>
            <SectionHeader id="g1-count20-sec-1" number={1} title="A tizenegy" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenegy Felfedezése"
                subtitle="1 tízes és 1 egyes (10 + 1 = 11)"
                type="Hamarosan"
                emoji="1️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="A 11 Bontásai"
                subtitle="10+1, 9+2, 8+3 bontások a 20-as keretben"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Számegyenes 11-ig"
                subtitle="Lépkedés 10-ről 11-re"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: A tizenkettő */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-2') && (
          <section>
            <SectionHeader id="g1-count20-sec-2" number={2} title="A tizenkettő" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenkettő és a Tucat"
                subtitle="12 darab = 1 tucat, 1 tízes és 2 egyes"
                type="Hamarosan"
                emoji="2️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Felezés és Párosság"
                subtitle="6 + 6 = 12, páros számok a 20-as körben"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="A 12 Bontásai"
                subtitle="10+2, 9+3, 8+4, 7+5 bontások"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: A tizenhárom */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-3') && (
          <section>
            <SectionHeader id="g1-count20-sec-3" number={3} title="A tizenhárom" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenhárom Felfedezése"
                subtitle="1 tízes és 3 egyes (10 + 3 = 13)"
                type="Hamarosan"
                emoji="3️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="A 13 Bontásai"
                subtitle="10+3, 9+4, 8+5, 7+6 bontások"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Páratlan Tizenhármas"
                subtitle="Számszomszédok: 12 és 14"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 4: A tizennégy */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-4') && (
          <section>
            <SectionHeader id="g1-count20-sec-4" number={4} title="A tizennégy" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizennégy Felfedezése"
                subtitle="1 tízes és 4 egyes (10 + 4 = 14)"
                type="Hamarosan"
                emoji="4️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Két Hét – 14 Nap"
                subtitle="7 + 7 = 14, két teljes hét napjai"
                type="Hamarosan"
                emoji="📅"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="A 14 Bontásai"
                subtitle="10+4, 9+5, 8+6, 7+7 bontások"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 5: A tizenöt */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-5') && (
          <section>
            <SectionHeader id="g1-count20-sec-5" number={5} title="A tizenöt" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenöt és a Három Ötös"
                subtitle="5 + 5 + 5 = 15, másfél tízes"
                type="Hamarosan"
                emoji="5️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="A 15 Bontásai"
                subtitle="10+5, 9+6, 8+7 bontások"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Félúton a 10 és 20 Között"
                subtitle="Számegyenes és számszomszédok"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 6: A tizenhat */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-6') && (
          <section>
            <SectionHeader id="g1-count20-sec-6" number={6} title="A tizenhat" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenhat Felfedezése"
                subtitle="1 tízes és 6 egyes (10 + 6 = 16)"
                type="Hamarosan"
                emoji="6️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Két Nyolcas – 16"
                subtitle="8 + 8 = 16, páros számok világa"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="A 16 Bontásai"
                subtitle="10+6, 9+7, 8+8 bontások"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 7: A tizenhét */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-7') && (
          <section>
            <SectionHeader id="g1-count20-sec-7" number={7} title="A tizenhét" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenhét Felfedezése"
                subtitle="1 tízes és 7 egyes (10 + 7 = 17)"
                type="Hamarosan"
                emoji="7️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="A 17 Bontásai"
                subtitle="10+7, 9+8 bontások"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Páratlan Tizenhetes"
                subtitle="Számszomszédok: 16 és 18"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 8: A tizennyolc */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-8') && (
          <section>
            <SectionHeader id="g1-count20-sec-8" number={8} title="A tizennyolc" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizennyolc Felfedezése"
                subtitle="1 tízes és 8 egyes (10 + 8 = 18)"
                type="Hamarosan"
                emoji="8️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Két Kilences – 18"
                subtitle="9 + 9 = 18 felezés és párosság"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="A 18 Bontásai"
                subtitle="10+8, 9+9 bontások a 20-as keretben"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Blocks className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 9: A tizenkilenc */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-9') && (
          <section>
            <SectionHeader id="g1-count20-sec-9" number={9} title="A tizenkilenc" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tizenkilenc Felfedezése"
                subtitle="1 tízes és 9 egyes (10 + 9 = 19)"
                type="Hamarosan"
                emoji="9️⃣"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="A 19 Bontásai"
                subtitle="10+9 bontás, a 20 közvetlen szomszédja"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Csak 1 Hiányzik a 20-hoz!"
                subtitle="Pótlás 20-ra (19 + 1 = 20)"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 10: A húsz */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-10') && (
          <section>
            <SectionHeader id="g1-count20-sec-10" number={10} title="A húsz" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Húsz és a Két Tízes"
                subtitle="2 teljes tízes keret, 20 ujjunk"
                type="Hamarosan"
                emoji="🔟"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Felezés: 10 + 10 = 20"
                subtitle="A húsz páros bontása és tízesbarátok"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="A 20-as Keret Mestere"
                subtitle="A teljes 20-as számkör áttekintése"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 11: Számolás 20-ig */}
        {(showAll || activeSubSectionId === 'g1-count20-sec-11') && (
          <section>
            <SectionHeader id="g1-count20-sec-11" number={11} title="Számolás 20-ig" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Műveletek Tízesátlépés Nélkül"
                subtitle="Összeadás és kivonás (13 + 4, 18 - 5)"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Műveletek Tízesátlépéssel"
                subtitle="Tízesre kiegészítés (8 + 7 = 15, 14 - 6 = 8)"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Nyitott Mondatok 20-ig"
                subtitle="Hiányos egyenletek és kacsacsőrök"
                type="Hamarosan"
                emoji="🔲"
                disabled={true}
                icon={<HelpCircle className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Szöveges Feladatok 20-ig"
                subtitle="Adatok, terv, számolás és válasz"
                type="Hamarosan"
                emoji="📖"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="VI. Fejezet Záró Nagydíj"
                subtitle="A 20-as számkör összefoglaló bajnoksága"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Legacy fallback for basic-operations / g1-basic
  if (topicId === 'basic-operations' || topicId === 'g1-basic') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
        <Grade1MathModule
          onBack={() => {}}
          initialView="grade1-basic"
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
        grade={1}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade1View;
