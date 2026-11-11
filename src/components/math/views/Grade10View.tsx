import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import {
  ArrowRightLeft,
  BarChart3,
  Binary,
  BookOpen,
  Boxes,
  Brain,
  Calculator,
  Circle,
  Clock,
  Coins,
  Compass,
  Dices,
  Divide,
  FlaskConical,
  GitFork,
  Hash,
  LineChart,
  Map,
  Maximize2,
  MoveHorizontal,
  PieChart,
  Scale,
  Shapes,
  Sparkles,
  Split,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap
} from 'lucide-react';

export const Grade10View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  const { getTopicProgress } = useQuizProgress();

  // Topic I: Logika
  if (topicId === 'g10-logika') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Igaz vagy hamis */}
        {(showAll || activeSubSectionId === 'g10-sec-igaz-vagy-hamis') && (
          <section>
            <SectionHeader id="g10-sec-igaz-vagy-hamis" number={1} title="Igaz vagy hamis" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Igaz vagy hamis? Tananyag"
                subtitle="Kijelentések, igazságértékek, kizárt harmadik és a negáció elve"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-logic-igaz-hamis-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és kompetencia példákkal"
                type="Kvíz"
                emoji="⚖️"
                onClick={() => onActivitySelect('g10-logic-igaz-hamis-quiz', topicId)}
                icon={<Scale className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-logic-igaz-hamis-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Állítás és tagadása */}
        {(showAll || activeSubSectionId === 'g10-sec-allitas-es-tagadasa') && (
          <section>
            <SectionHeader id="g10-sec-allitas-es-tagadasa" number={2} title="Állítás és tagadása" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Állítás és tagadása Tananyag"
                subtitle="A tagadás feltétele, a 'minden' és 'van olyan' kvantorok negálása és határértékek"
                type="Tananyag"
                emoji="🔄"
                onClick={() => onActivitySelect('g10-logic-allitas-tagadas-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és érettségi példákkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-logic-allitas-tagadas-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="purple"
                {...getTopicProgress('g10-logic-allitas-tagadas-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: VAGY művelet, ÉS művelet */}
        {(showAll || activeSubSectionId === 'g10-sec-vagy-muvelet-es-muvelet') && (
          <section>
            <SectionHeader id="g10-sec-vagy-muvelet-es-muvelet" number={3} title="VAGY művelet, ÉS művelet" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="VAGY és ÉS művelet Tananyag"
                subtitle="Diszjunkció, konjunkció, igazságtáblázatok és a 'de' kötőszó logikája"
                type="Tananyag"
                emoji="🔀"
                onClick={() => onActivitySelect('g10-logic-vagy-es-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és kompetencia példákkal"
                type="Kvíz"
                emoji="⚖️"
                onClick={() => onActivitySelect('g10-logic-vagy-es-quiz', topicId)}
                icon={<Scale className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-logic-vagy-es-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: Igaz vagy hamis? Foglaljuk táblázatba! */}
        {(showAll || activeSubSectionId === 'g10-sec-igaz-vagy-hamis-tablazatba') && (
          <section>
            <SectionHeader id="g10-sec-igaz-vagy-hamis-tablazatba" number={4} title="Igaz vagy hamis? Foglaljuk táblázatba!" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Igazságtáblázatok és De Morgan Tananyag"
                subtitle="Szisztematikus esetelemzés, táblázatkészítés, De Morgan-szabályok és Smullyan-rejtvények"
                type="Tananyag"
                emoji="📊"
                onClick={() => onActivitySelect('g10-logic-tablazat-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és logikai feladványokkal"
                type="Kvíz"
                emoji="🧩"
                onClick={() => onActivitySelect('g10-logic-tablazat-quiz', topicId)}
                icon={<Binary className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g10-logic-tablazat-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: Állítás és megfordítása */}
        {(showAll || activeSubSectionId === 'g10-sec-allitas-es-megforditasa') && (
          <section>
            <SectionHeader id="g10-sec-allitas-es-megforditasa" number={5} title="Állítás és megfordítása" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Állítás és Megfordítása Tananyag"
                subtitle="Implikáció (A ⇒ B), megfordítás (B ⇒ A), szükséges és elégséges feltételek, ekvivalencia"
                type="Tananyag"
                emoji="🔀"
                onClick={() => onActivitySelect('g10-logic-allitas-megforditas-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, geometriai tételekkel és logikai fejtörőkkel"
                type="Kvíz"
                emoji="⚖️"
                onClick={() => onActivitySelect('g10-logic-allitas-megforditas-quiz', topicId)}
                icon={<ArrowRightLeft className="w-6 h-6" />}
                color="orange"
                {...getTopicProgress('g10-logic-allitas-megforditas-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-gyakorlas-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-gyakorlas-tudasproba" number={6} title="Gyakorlás, tudáspróba" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás, Tudáspróba Tananyag"
                subtitle="Fejezeti összefoglaló elmélet, bizonyítási módszerek és esettanulmányok"
                type="Tananyag"
                emoji="📚"
                onClick={() => onActivitySelect('g10-logic-tudasproba-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 válogatott feladat 3 szinten (30 feladat szintenként!), érettségi és kompetencia példákkal"
                type="Kvíz"
                emoji="🏆"
                onClick={() => onActivitySelect('g10-logic-tudasproba-quiz', topicId)}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
                {...getTopicProgress('g10-logic-tudasproba-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic II: Egyenletrendszerek
  if (topicId === 'g10-egyenletrendszerek') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Egyenletrendszerek grafikus megoldása */}
        {(showAll || activeSubSectionId === 'g10-sec-egyenletrendszerek-grafikus') && (
          <section>
            <SectionHeader id="g10-sec-egyenletrendszerek-grafikus" number={1} title="Egyenletrendszerek grafikus megoldása" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Grafikus Megoldás Tananyag"
                subtitle="Kétismeretlenes lineáris egyenletek, egyenesek ábrázolása, metszéspontok és a megoldásszám"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-eq-graphic-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és érettségi példákkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-eq-graphic-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-eq-graphic-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Egyenletrendszerek megoldása algebrai módszerekkel */}
        {(showAll || activeSubSectionId === 'g10-sec-egyenletrendszerek-algebrai') && (
          <section>
            <SectionHeader id="g10-sec-egyenletrendszerek-algebrai" number={2} title="Egyenletrendszerek megoldása algebrai módszerekkel" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Algebrai Megoldás Tananyag"
                subtitle="Behelyettesítés, egyenlő együtthatók módszere, segédváltozók és 3-ismeretlenes rendszerek"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-eq-algebraic-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és érettségi példákkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-eq-algebraic-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="purple"
                {...getTopicProgress('g10-eq-algebraic-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: Egyenletrendszerek */}
        {(showAll || activeSubSectionId === 'g10-sec-egyenletrendszerek-osszetett') && (
          <section>
            <SectionHeader id="g10-sec-egyenletrendszerek-osszetett" number={3} title="Egyenletrendszerek" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Rendszerek Tananyag"
                subtitle="Háromismeretlenes lineáris, másodfokú rendszerek és valós szöveges modellek"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-eq-composite-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és érettségi példákkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-eq-composite-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-eq-composite-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-egyenletrendszerek-gyakorlas') && (
          <section>
            <SectionHeader id="g10-sec-egyenletrendszerek-gyakorlas" number={4} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás Tananyag"
                subtitle="Módszerválasztás, paraméteres rendszerek és érettségi típusfeladatok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-eq-practice-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 válogatott feladat 3 szinten, tankönyvi és érettségi példákkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-eq-practice-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-eq-practice-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-egyenletrendszerek-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-egyenletrendszerek-tudasproba" number={5} title="Gyakorlás, tudáspróba" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tudáspróba Tananyag"
                subtitle="Fejezeti összefoglalás, modellezési stratégiák és kidolgozott mintapéldák"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-eq-exam-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 fejezeti nagyteszt feladat 3 szinten (30 feladat/szint), ábrákkal és részletes magyarázatokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-eq-exam-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-eq-exam-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic III: Hatványozás és a négyzetgyök
  if (topicId === 'g10-hatvanyozas-negyzetgyok') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: A hatványozás (ismétlés) */}
        {(showAll || activeSubSectionId === 'g10-sec-hatvanyozas-ismetles') && (
          <section>
            <SectionHeader id="g10-sec-hatvanyozas-ismetles" number={1} title="A hatványozás (ismétlés)" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A hatványozás Tananyag"
                subtitle="A hatványozás alapfogalma, műveleti azonosságai, előjelszabályai és gyakorlati számítási stratégiák"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-pow-basics-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-pow-basics-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-pow-basics-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Egész kitevőjű hatványok */}
        {(showAll || activeSubSectionId === 'g10-sec-egesz-kitevoju-hatvanyok') && (
          <section>
            <SectionHeader id="g10-sec-egesz-kitevoju-hatvanyok" number={2} title="Egész kitevőjű hatványok" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egész kitevőjű hatványok Tananyag"
                subtitle="A hatványfogalom kiterjesztése permanencia-elvvel, nulla és negatív kitevők, azonosságok és tízes hatványok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-int-powers-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-int-powers-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-int-powers-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: Hatványozás gyakorlása */}
        {(showAll || activeSubSectionId === 'g10-sec-hatvany-gyakorlas') && (
          <section>
            <SectionHeader id="g10-sec-hatvany-gyakorlas" number={3} title="Hatványozás gyakorlása" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hatványozás gyakorlása Tananyag"
                subtitle="Összetett kifejezések, prímhatványokra bontás, algebrai törtek egyszerűsítése és hatványok összehasonlítása"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-powers-practice-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-powers-practice-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-powers-practice-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: Számok normálalakja */}
        {(showAll || activeSubSectionId === 'g10-sec-szamok-normalalakja') && (
          <section>
            <SectionHeader id="g10-sec-szamok-normalalakja" number={4} title="Számok normálalakja" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számok normálalakja Tananyag"
                subtitle="A normálalak fogalma (1 ≤ |a| < 10), nagyságrendi kitevők, SI prefixumok, műveletek és gyakorlati példák"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-scientific-notation-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-scientific-notation-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
                {...getTopicProgress('g10-scientific-notation-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: A gyökvonás azonosságai */}
        {(showAll || activeSubSectionId === 'g10-sec-gyokvonas-azonossagai') && (
          <section>
            <SectionHeader id="g10-sec-gyokvonas-azonossagai" number={5} title="A gyökvonás azonosságai" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A gyökvonás azonosságai Tananyag"
                subtitle="A négyzetgyök fogalma, a √(a²) = |a| szabály, szorzat és hányados négyzetgyöke, kiemelés és bevitel"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-root-identities-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-root-identities-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g10-root-identities-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: Négyzetgyökös feladatok */}
        {(showAll || activeSubSectionId === 'g10-sec-negyzetgyokos-feladatok') && (
          <section>
            <SectionHeader id="g10-sec-negyzetgyokos-feladatok" number={6} title="Négyzetgyökös feladatok" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Négyzetgyökös feladatok Tananyag"
                subtitle="Tényező kiemelése/bevitele, egynemű gyökök összevonása és a nevező gyöktelenítése"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-sqrt-tasks-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-sqrt-tasks-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="amber"
                {...getTopicProgress('g10-sqrt-tasks-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 7: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-gyok-gyakorlas') && (
          <section>
            <SectionHeader id="g10-sec-gyok-gyakorlas" number={7} title="Gyakorlás" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás Tananyag"
                subtitle="Kikötések, értelmezési tartomány, nevezetes azonosságok, emeletes gyökök és egyenletek"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-root-practice-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-root-practice-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="violet"
                {...getTopicProgress('g10-root-practice-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-hatvany-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-hatvany-tudasproba" number={8} title="Gyakorlás, tudáspróba" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tudáspróba Tananyag"
                subtitle="Átfogó fejezeti összefoglaló, hatványozás és gyökvonás szintézise, érettségi típusfeladatok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-hatvany-tudasproba-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Tudáspróba Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🏆"
                onClick={() => onActivitySelect('g10-hatvany-tudasproba-quiz', topicId)}
                icon={<Trophy className="w-6 h-6" />}
                color="rose"
                {...getTopicProgress('g10-hatvany-tudasproba-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic IV: Függvénytranszformációk
  if (topicId === 'g10-fuggvenytranszformaciok') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Függvények egy-egy konkrét problémához */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-konkret-problema') && (
          <section>
            <SectionHeader id="g10-sec-transz-konkret-problema" number={1} title="Függvények egy-egy konkrét problémához" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Függvények modellezése Tananyag"
                subtitle="Valós jelenségek modellezése, változók kapcsolata, reális értelmezési tartomány és szélsőértékek"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-konkret-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-konkret-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-transz-konkret-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Parabolák a koordináta-rendszerben */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-parabolak') && (
          <section>
            <SectionHeader id="g10-sec-transz-parabolak" number={2} title="Parabolák a koordináta-rendszerben" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Parabolák Tananyag"
                subtitle="Normálparabola tulajdonságai, szimmetriája, csúcspontja és eltolásai"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-parabolak-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-parabolak-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-parabolak-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: „Fel”-, „le”, „jobbra”-, „balra” */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-fel-le-jobbra-balra') && (
          <section>
            <SectionHeader id="g10-sec-transz-fel-le-jobbra-balra" number={3} title="„Fel”-, „le”, „jobbra”-, „balra”" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Párhuzamos Eltolások Tananyag"
                subtitle="f(x) ± c és f(x ∓ u) transzformációk, eltolásvektorok és tartományvizsgálat"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-fel-le-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-fel-le-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-fel-le-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: „Soványabb”, „kövérebb” */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-sovanyabb-koverebb') && (
          <section>
            <SectionHeader id="g10-sec-transz-sovanyabb-koverebb" number={4} title="„Soványabb”, „kövérebb”" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Nyújtás és Tükrözés Tananyag"
                subtitle="a · f(x) függőleges skálázás, merőleges affinitás és x-tengelyes tükrözés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-sovanyabb-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-sovanyabb-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-sovanyabb-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: Összetett függvénytranszformációk */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-osszetett') && (
          <section>
            <SectionHeader id="g10-sec-transz-osszetett" number={5} title="Összetett függvénytranszformációk" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Transzformációk Tananyag"
                subtitle="Kanonikus alak, a lépések helyes sorrendje és felhajtott abszolútérték-grafikonok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-osszetett-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-osszetett-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-osszetett-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: Másodfokú függvények */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-masodfoku-fuggvenyek') && (
          <section>
            <SectionHeader id="g10-sec-transz-masodfoku-fuggvenyek" number={6} title="Másodfokú függvények" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Másodfokú Függvények Tananyag"
                subtitle="Polinom alak átírása a(x-u)² + v kanonikus alakra, teljes négyzetté kiegészítés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-masodfoku-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-masodfoku-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-masodfoku-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 7: Másodfokú függvények grafikonja */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-masodfoku-grafikonja') && (
          <section>
            <SectionHeader id="g10-sec-transz-masodfoku-grafikonja" number={7} title="Másodfokú függvények grafikonja" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Másodfokú Grafikonok Tananyag"
                subtitle="A parabola ábrázolása 5 lépésben, segédfüggvény zérushelyei és teljes jellemzés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-masodfoku-grafikon-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-masodfoku-grafikon-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-masodfoku-grafikon-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás, alkalmazás */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-gyakorlas-alkalmazas') && (
          <section>
            <SectionHeader id="g10-sec-transz-gyakorlas-alkalmazas" number={8} title="Gyakorlás, alkalmazás" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás és Alkalmazás Tananyag"
                subtitle="Területoptimalizálás kordonnal, hajítási modellek és grafikus egyenletmegoldás"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-alkalmazas-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-transz-alkalmazas-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-alkalmazas-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 9: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-transz-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-transz-tudasproba" number={9} title="Gyakorlás, tudáspróba" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Fejezeti Tudáspróba Tananyag"
                subtitle="A transzformációk teljes szintézise, mesterképlet és összefoglaló elmélet"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-transz-tudasproba-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Fejezeti Tudáspróba Kvíz"
                subtitle="90 feladat 3 szinten (30 feladat/szint), ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🏆"
                onClick={() => onActivitySelect('g10-transz-tudasproba-quiz', topicId)}
                icon={<Trophy className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-transz-tudasproba-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic V: Másodfokú egyenletek
  if (topicId === 'g10-masodfoku-egyenletek') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Teljes négyzetté kiegészítés */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-teljes-negyzet') && (
          <section>
            <SectionHeader id="g10-sec-quad-teljes-negyzet" number={1} title="Teljes négyzetté kiegészítés" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Teljes négyzetté kiegészítés Tananyag"
                subtitle="Hiányos egyenletek megoldása, geometriai négyzetkiegészítés és az (x ± d)² alakra hozás lépései"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-teljes-negyzet-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-teljes-negyzet-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="orange"
                {...getTopicProgress('g10-quad-teljes-negyzet-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Teljes négyzetté kiegészítés alkalmazása */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-teljes-negyzet-alkalmazasa') && (
          <section>
            <SectionHeader id="g10-sec-quad-teljes-negyzet-alkalmazasa" number={2} title="Teljes négyzetté kiegészítés alkalmazása" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Alkalmazások és Szélsőértékek Tananyag"
                subtitle="Főegyüttható kiemelése és leosztása, törtekkel való négyzetkiegészítés és parabola csúcspontja"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-teljes-negyzet-alkalmazasa-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="amber"
                {...getTopicProgress('g10-quad-teljes-negyzet-alkalmazasa-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: A másodfokú egyenlet megoldóképlete */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-megoldokeplet') && (
          <section>
            <SectionHeader id="g10-sec-quad-megoldokeplet" number={3} title="A másodfokú egyenlet megoldóképlete" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Megoldóképlet és Diszkrimináns Tananyag"
                subtitle="A megoldóképlet 4a-s levezetése, a diszkrimináns szerepe és a 4 aranyszabály"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-megoldokeplet-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-megoldokeplet-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="rose"
                {...getTopicProgress('g10-quad-megoldokeplet-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: Alkalmazzuk a megoldóképletet! */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-megoldokeplet-alkalmazasa') && (
          <section>
            <SectionHeader id="g10-sec-quad-megoldokeplet-alkalmazasa" number={4} title="Alkalmazzuk a megoldóképletet!" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Megoldóképlet Gyakorlása Tananyag"
                subtitle="Összetett egyenletek 0-ra rendezése, törtes egyenletek kikötése és Viète-ellenőrzés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-megoldokeplet-alkalmazasa-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-megoldokeplet-alkalmazasa-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="red"
                {...getTopicProgress('g10-quad-megoldokeplet-alkalmazasa-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: Szöveges feladatok */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-szoveges-alap') && (
          <section>
            <SectionHeader id="g10-sec-quad-szoveges-alap" number={5} title="Szöveges feladatok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges Feladatok Tananyag"
                subtitle="Számelméleti feladványok, szomszédos számok, reciprokos és osztozkodási feladatok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-szoveges-alap-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-szoveges-alap-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-quad-szoveges-alap-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: Diszkrimináns */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-diszkriminans') && (
          <section>
            <SectionHeader id="g10-sec-quad-diszkriminans" number={6} title="Diszkrimináns" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Diszkrimináns Tananyag"
                subtitle="A D = b² - 4ac jelentése, a gyökök száma, parabola és paraméteres vizsgálatok"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-diszkriminans-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, puskákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-diszkriminans-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-quad-diszkriminans-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 7: Szöveges feladatok geometriából */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-szoveges-geometria') && (
          <section>
            <SectionHeader id="g10-sec-quad-szoveges-geometria" number={7} title="Szöveges feladatok geometriából" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Geometriai Feladatok Tananyag"
                subtitle="Téglalapok, derékszögű háromszögek, kerti ösvények és sokszögek átlói"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-szoveges-geometria-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, puskákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-szoveges-geometria-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-quad-szoveges-geometria-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 8: Másodfokú egyenletre visszavezethető feladatok */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-visszavezetheto') && (
          <section>
            <SectionHeader id="g10-sec-quad-visszavezetheto" number={8} title="Másodfokú egyenletre visszavezethető feladatok" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Visszavezethető Egyenletek Tananyag"
                subtitle="Bikvadratikus, törtes és gyökös egyenletek, helyettesítés és szorzattá alakítás"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-visszavezetheto-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, puskákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-visszavezetheto-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-quad-visszavezetheto-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 9: Pénzügyekkel kapcsolatos szöveges feladatok */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-szoveges-penzugy') && (
          <section>
            <SectionHeader id="g10-sec-quad-szoveges-penzugy" number={9} title="Pénzügyekkel kapcsolatos szöveges feladatok" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pénzügyi Modellek Tananyag"
                subtitle="Árváltozások, kamatos kamat, bevételoptimalizálás és költségmegosztás"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-szoveges-penzugy-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, puskákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-szoveges-penzugy-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-quad-szoveges-penzugy-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 10: Szöveges feladatok mozgásról és munkavégzésről */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-szoveges-mozgas-munka') && (
          <section>
            <SectionHeader id="g10-sec-quad-szoveges-mozgas-munka" number={10} title="Szöveges feladatok mozgásról és munkavégzésről" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Mozgás és Munkavégzés Tananyag"
                subtitle="Sebesség, menetidő-különbségek, folyami hajózás és együttes munkavégzés"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-szoveges-mozgas-munka-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, puskákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-quad-szoveges-mozgas-munka-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-quad-szoveges-mozgas-munka-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 11: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-quad-tudasproba" number={11} title="Gyakorlás, tudáspróba" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás és Tudáspróba Tananyag"
                subtitle="A fejezet átfogó összefoglalása, megoldási arzenál, visszavezetési atlasz és vizsgatippek"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-quad-tudasproba-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Tudáspróba Kvíz és Játékok"
                subtitle="90 kérdéses átfogó témazáró kvíz (szintenként 30 kérdés), párosító és rendező kihívások"
                type="Kvíz"
                emoji="🏆"
                onClick={() => onActivitySelect('g10-quad-tudasproba-quiz', topicId)}
                icon={<Trophy className="w-6 h-6" />}
                color="violet"
                {...getTopicProgress('g10-quad-tudasproba-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VI: Egybevágóság és kör
  if (topicId === 'g10-egybevagosag-kor') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Háromszögek egybevágóságának alapesetei */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-haromszog-alapesetek') && (
          <section>
            <SectionHeader id="g10-sec-geo-haromszog-alapesetek" number={1} title="Háromszögek egybevágóságának alapesetei" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Négy Egybevágósági Alapeset Tananyag"
                subtitle="o-o-o, o-sz-o, sz-o-sz, o-o-sz feltételek, az SSA csapda és alkalmazásuk"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-haromszog-alapesetek-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ábrákkal és beépített Wordwall játékokkal"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-haromszog-alapesetek-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
                {...getTopicProgress('g10-geo-haromszog-alapesetek-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 2: Egybevágó háromszögek */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-egybevago-haromszogek') && (
          <section>
            <SectionHeader id="g10-sec-geo-egybevago-haromszogek" number={2} title="Egybevágó háromszögek" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egybevágó Háromszögek Tananyag"
                subtitle="Egybevágósági transzformációk, szakaszok és szögek egyenlőségének levezetése"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-egybevago-haromszogek-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, szimmetriákkal és bizonyítási lépésekkel"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-egybevago-haromszogek-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g10-geo-egybevago-haromszogek-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 3: A kör kerülete és területe */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-kor-kerulet-terulet') && (
          <section>
            <SectionHeader id="g10-sec-geo-kor-kerulet-terulet" number={3} title="A kör kerülete és területe" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Kör Kerülete és Területe Tananyag"
                subtitle="K = 2rπ és T = r²π összefüggések, a π definíciója és körgyűrűk"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-kor-kerulet-terulet-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, kör metrika és körgyűrű feladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-kor-kerulet-terulet-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="cyan"
                {...getTopicProgress('g10-geo-kor-kerulet-terulet-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 4: Középponti szög, körív, körcikk */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-kozepponti-szog-iv-cikk') && (
          <section>
            <SectionHeader id="g10-sec-geo-kozepponti-szog-iv-cikk" number={4} title="Középponti szög, körív, körcikk" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Középponti Szög, Körív és Körcikk Tananyag"
                subtitle="Ívhossz és körcikk területe, arányosság a szöggel és kerületi szögek tétele"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-kozepponti-szog-iv-cikk-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, ívhossz, körcikk és szögszámítások"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-kozepponti-szog-iv-cikk-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="blue"
                {...getTopicProgress('g10-geo-kozepponti-szog-iv-cikk-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 5: Körszámítások és összetett alakzatok */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-gyakorlas-kor') && (
          <section>
            <SectionHeader id="g10-sec-geo-gyakorlas-kor" number={5} title="Körszámítások és összetett alakzatok" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Körszámítások és Összetett Alakzatok Tananyag"
                subtitle="Kombinált alakzatok, futópályák, beírt és körülírt körök feladatai lépésről lépésre"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-gyakorlas-kor-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, összetett síkidomok és körrészek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-gyakorlas-kor-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
                {...getTopicProgress('g10-geo-gyakorlas-kor-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 6: Körívek, körcikkek a mindennapokban */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-korivek-mindennapokban') && (
          <section>
            <SectionHeader id="g10-sec-geo-korivek-mindennapokban" number={6} title="Körívek, körcikkek a mindennapokban" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Körívek és Körcikkek a Mindennapokban Tananyag"
                subtitle="Kerékpárok, fogaskerekek, szórásfejek és kanyarodási sugarak modellezése"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-korivek-mindennapokban-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, forgómozgások és körmodellek a gyakorlatban"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-korivek-mindennapokban-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="purple"
                {...getTopicProgress('g10-geo-korivek-mindennapokban-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 7: Sokszögek és körök */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-sokszogek-es-korok') && (
          <section>
            <SectionHeader id="g10-sec-geo-sokszogek-es-korok" number={7} title="Sokszögek és körök" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Sokszögek és Körök Kapcsolata Tananyag"
                subtitle="Szabályos n-szögek beírt és körülírt köre, húrnégyszögek, érintőnégyszögek és Thálész-tétel"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-sokszogek-es-korok-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, húr- és érintőnégyszög tételek, szabályos sokszögek"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-sokszogek-es-korok-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="amber"
                {...getTopicProgress('g10-geo-sokszogek-es-korok-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 8: Érintőtrapézok és szabályos sokszögek */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-gyakorlas-sokszogek') && (
          <section>
            <SectionHeader id="g10-sec-geo-gyakorlas-sokszogek" number={8} title="Érintőtrapézok és szabályos sokszögek" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Érintőtrapézok és Szabályos Sokszögek Tananyag"
                subtitle="Hatszögek, szimmetrikus és derékszögű érintőtrapézok, sokszögek metrikája"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-gyakorlas-sokszogek-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="30 feladat 3 szinten, összetett felvételi és érettségi típusfeladatok"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-gyakorlas-sokszogek-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="rose"
                {...getTopicProgress('g10-geo-gyakorlas-sokszogek-quiz')}
              />
            </div>
          </section>
        )}

        {/* Section 9: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-ismetles') && (
          <section>
            <SectionHeader id="g10-sec-geo-ismetles" number={9} title="Gyakorlás, tudáspróba" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorlás, Tudáspróba Tananyag"
                subtitle="A 4 alappillér: egybevágóság, kör metrika, szögek és sokszögek szintézise"
                type="Tananyag"
                emoji="📖"
                onClick={() => onActivitySelect('g10-geo-ismetles-theory', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Tudáspróba Kvíz"
                subtitle="30 feladat 3 szinten, átfogó felkészülés és témazáró tudáspróba"
                type="Kvíz"
                emoji="🎯"
                onClick={() => onActivitySelect('g10-geo-ismetles-quiz', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="teal"
                {...getTopicProgress('g10-geo-ismetles-quiz')}
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VII: Statisztika és valószínűségszámítás
  if (topicId === 'g10-statisztika-valoszinuseg') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Átlag, számtani közép */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-atlag-szamtani-kozep') && (
          <section>
            <SectionHeader id="g10-sec-stat-atlag-szamtani-kozep" number={1} title="Átlag, számtani közép" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számtani Közép és Súlyozott Átlag"
                subtitle="Átlag fogalma, tulajdonságai és kiszámítása adatsorokból"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 2: Ráadás – Számtani közép, mértani közép */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-szamtani-mertani-kozep') && (
          <section>
            <SectionHeader id="g10-sec-stat-szamtani-mertani-kozep" number={2} title="Ráadás – Számtani közép, mértani közép" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Nevezetes Középértékek Egyenlőtlensége"
                subtitle="(a+b)/2 ≥ √(ab) bizonyítása és szélsőérték-feladatok"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 3: Változások */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-valtozasok') && (
          <section>
            <SectionHeader id="g10-sec-stat-valtozasok" number={3} title="Változások" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Abszolút és Relatív Változások"
                subtitle="Százalékpont, bázis- és láncviszonyszámok elemzése"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 4: Számsokaságok statisztikai jellemzői */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-statisztikai-jellemzok') && (
          <section>
            <SectionHeader id="g10-sec-stat-statisztikai-jellemzok" number={4} title="Számsokaságok statisztikai jellemzői" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Módusz, Medián, Terjedelem és Szórás"
                subtitle="Helyzeti és szóródási mutatók meghatározása és jelentése"
                type="Hamarosan"
                emoji="📉"
                disabled={true}
                icon={<BarChart3 className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 5: Osztályba sorolás, átlagok átlaga */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-osztalyba-sorolas-atlagok') && (
          <section>
            <SectionHeader id="g10-sec-stat-osztalyba-sorolas-atlagok" number={5} title="Osztályba sorolás, átlagok átlaga" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorisági Táblázat és Csoportátlagok"
                subtitle="Osztályközök, hisztogram és az átlagok helyes súlyozása"
                type="Hamarosan"
                emoji="📋"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 6: Véletlen? – Relatív gyakoriság */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-veletlen-relativ-gyakorisag') && (
          <section>
            <SectionHeader id="g10-sec-stat-veletlen-relativ-gyakorisag" number={6} title="Véletlen? – Relatív gyakoriság" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Véletlen Kísérletek és Tapasztalat"
                subtitle="Gyakoriság, relatív gyakoriság és a kísérleti stabilitás"
                type="Hamarosan"
                emoji="🎲"
                disabled={true}
                icon={<Dices className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 7: Megismerhető véletlen */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-megismerheto-veletlen') && (
          <section>
            <SectionHeader id="g10-sec-stat-megismerheto-veletlen" number={7} title="Megismerhető véletlen" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Klasszikus Valószínűségi Modell"
                subtitle="Eseménytér, elemi események és a kedvező/összes arány"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 8: Biztos, lehetetlen, véletlen */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-biztos-lehetetlen-veletlen') && (
          <section>
            <SectionHeader id="g10-sec-stat-biztos-lehetetlen-veletlen" number={8} title="Biztos, lehetetlen, véletlen" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Eseményalgebra és Valószínűségi Szabályok"
                subtitle="Biztos és lehetetlen esemény, komplementer és események uniója"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 9: Valószínűség a gyakorlatban */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-valoszinuseg-gyakorlatban') && (
          <section>
            <SectionHeader id="g10-sec-stat-valoszinuseg-gyakorlatban" number={9} title="Valószínűség a gyakorlatban" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Mintavétel, Játékok és Kockázatok"
                subtitle="Visszatevéses és visszatevés nélküli valószínűségi problémák"
                type="Hamarosan"
                emoji="🪙"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 10: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-stat-gyakorlas-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-stat-gyakorlas-tudasproba" number={10} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Statisztika és Valószínűség Tudáspróba"
                subtitle="Fejezeti összefoglalás, vegyes feladatok és önértékelés"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VIII: Egyenletek és egyenlőtlenségek
  if (topicId === 'g10-egyenletek-egyenlotlensegek') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Ekvivalens egyenletek */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-ekvivalens-egyenletek') && (
          <section>
            <SectionHeader id="g10-sec-eq-ekvivalens-egyenletek" number={1} title="Ekvivalens egyenletek" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Ekvivalens Átalakítások és Buktatók"
                subtitle="Egyenértékű lépések, hamis gyökök és gyökvesztés megelőzése"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 2: Gyökös egyenletek */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-gyokos-egyenletek') && (
          <section>
            <SectionHeader id="g10-sec-eq-gyokos-egyenletek" number={2} title="Gyökös egyenletek" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Irracionális Egyenletek Megoldása"
                subtitle="Gyökjel izolálása, négyzetre emelés és kötelező ellenőrzés"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 3: Ráadás – Laboratóriumi fejlesztések */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-laboratoriumi-fejlesztesek') && (
          <section>
            <SectionHeader id="g10-sec-eq-laboratoriumi-fejlesztesek" number={3} title="Ráadás – Laboratóriumi fejlesztések" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Keverési és Műszaki Modellek"
                subtitle="Oldatok töménysége, fizikai-kémiai összefüggések egyenletei"
                type="Hamarosan"
                emoji="🧪"
                disabled={true}
                icon={<FlaskConical className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 4: Másodfokú egyenlőtlenségek */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-masodfoku-egyenlotlensegek') && (
          <section>
            <SectionHeader id="g10-sec-eq-masodfoku-egyenlotlensegek" number={4} title="Másodfokú egyenlőtlenségek" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Grafikus és Előjeltáblázatos Megoldás"
                subtitle="Parabolák zérushelyei és állása, intervallum-megoldások"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<LineChart className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 5: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-gyakorlas-egyenlotlensegek') && (
          <section>
            <SectionHeader id="g10-sec-eq-gyakorlas-egyenlotlensegek" number={5} title="Gyakorlás" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Törtes és Abszolútértékes Egyenlőtlenségek"
                subtitle="Közös nevező, tényezők előjele és megoldáshalmazok"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 6: Polinom gyöktényezős alakja */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-polinom-gyoktenyezos-alakja') && (
          <section>
            <SectionHeader id="g10-sec-eq-polinom-gyoktenyezos-alakja" number={6} title="Polinom gyöktényezős alakja" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Másodfokú Szorzattá Alakítás"
                subtitle="a(x - x₁)(x - x₂) képlet és algebrai törtek egyszerűsítése"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 7: Ráadás – Viète-formulák! */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-viete-formulak') && (
          <section>
            <SectionHeader id="g10-sec-eq-viete-formulak" number={7} title="Ráadás – Viète-formulák!" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyökök és Együtthatók Összefüggései"
                subtitle="x₁ + x₂ = -b/a és x₁x₂ = c/a, szimmetrikus kifejezések"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 8: Csoportverseny */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-csoportverseny') && (
          <section>
            <SectionHeader id="g10-sec-eq-csoportverseny" number={8} title="Csoportverseny" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kooperatív Csapatvetélkedő"
                subtitle="Gyorsasági Viète-kihívás és hibakeresés irracionális egyenletekben"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Users className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 9: Ráadás – Másodfokú egyenletrendszerek */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-masodfoku-egyenletrendszerek') && (
          <section>
            <SectionHeader id="g10-sec-eq-masodfoku-egyenletrendszerek" number={9} title="Ráadás – Másodfokú egyenletrendszerek" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kétismeretlenes Nemlineáris Rendszerek"
                subtitle="Behelyettesítés, szimmetrikus rendszerek és metszéspontok"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<GitFork className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 10: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-eq-gyakorlas-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-eq-gyakorlas-tudasproba" number={10} title="Gyakorlás, tudáspróba" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenletek és Egyenlőtlenségek Tudáspróba"
                subtitle="Fejezeti összefoglaló feladatsor és témazáró számonkérés"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic IX: Hasonlóság
  if (topicId === 'g10-hasonlosag') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Középpontos nagyítás, kicsinyítés */}
        {(showAll || activeSubSectionId === 'g10-sec-has-nagyitas-kicsinyites') && (
          <section>
            <SectionHeader id="g10-sec-has-nagyitas-kicsinyites" number={1} title="Középpontos nagyítás, kicsinyítés" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Középpont és Arányosság"
                subtitle="Nagyítás és kicsinyítés O pontból, képpontok szerkesztése"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<Maximize2 className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 2: Középpontos hasonlóság */}
        {(showAll || activeSubSectionId === 'g10-sec-has-kozeppontos-hasonlosag') && (
          <section>
            <SectionHeader id="g10-sec-has-kozeppontos-hasonlosag" number={2} title="Középpontos hasonlóság" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Fixpontok és Körök Hasonlósága"
                subtitle="Invariáns alakzatok és sugarak aránya a hasonlóságban"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 3: Geometriai hozzárendelések */}
        {(showAll || activeSubSectionId === 'g10-sec-has-geometriai-hozzarendelesek') && (
          <section>
            <SectionHeader id="g10-sec-has-geometriai-hozzarendelesek" number={3} title="Geometriai hozzárendelések" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Síktranszformációk Rendszere"
                subtitle="Egybevágóságok és hasonlóságok csoportosítása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<ArrowRightLeft className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 4: Hasonlóság */}
        {(showAll || activeSubSectionId === 'g10-sec-has-hasonlosag-alapjai') && (
          <section>
            <SectionHeader id="g10-sec-has-hasonlosag-alapjai" number={4} title="Hasonlóság" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kerület-, Terület- és Térfogatarányok"
                subtitle="λ, λ² és λ³ összefüggések síkidomokban és testekben"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 5: Ráadás – Mit mutat a tervrajz? */}
        {(showAll || activeSubSectionId === 'g10-sec-has-tervrajz') && (
          <section>
            <SectionHeader id="g10-sec-has-tervrajz" number={5} title="Ráadás – Mit mutat a tervrajz?" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Méretarányos Rajzok és Térképek"
                subtitle="Valós méretek és területek visszaszámítása alaprajzokból"
                type="Hamarosan"
                emoji="🗺️"
                disabled={true}
                icon={<Map className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 6: Alkalmazzuk a hasonlóságot! */}
        {(showAll || activeSubSectionId === 'g10-sec-has-alkalmazzuk-hasonlosagot') && (
          <section>
            <SectionHeader id="g10-sec-has-alkalmazzuk-hasonlosagot" number={6} title="Alkalmazzuk a hasonlóságot!" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Közvetett Magasság- és Távolságmérés"
                subtitle="Thálész árnyékmódszere, tükörmódszer és terepi mérések"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 7: Ráadás – Párhuzamos szelők tétele */}
        {(showAll || activeSubSectionId === 'g10-sec-has-parhuzamos-szelok') && (
          <section>
            <SectionHeader id="g10-sec-has-parhuzamos-szelok" number={7} title="Ráadás – Párhuzamos szelők tétele" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szelők és Szelőszakaszok Tétele"
                subtitle="Szögszárakat metsző párhuzamosok és szakaszosztás"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 8: Háromszögek hasonlósága */}
        {(showAll || activeSubSectionId === 'g10-sec-has-haromszogek-hasonlosaga') && (
          <section>
            <SectionHeader id="g10-sec-has-haromszogek-hasonlosaga" number={8} title="Háromszögek hasonlósága" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Négy Hasonlósági Alapeset"
                subtitle="sz-sz, o-o-o, o-sz-o, o-o-sz feltételek alkalmazása"
                type="Hamarosan"
                emoji="🔺"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 9: Háromszög középvonalai és súlyvonalai */}
        {(showAll || activeSubSectionId === 'g10-sec-has-kozepvonalak-sulyvonalak') && (
          <section>
            <SectionHeader id="g10-sec-has-kozepvonalak-sulyvonalak" number={9} title="Háromszög középvonalai és súlyvonalai" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Középvonalak és a Súlypont 2:1 Aránya"
                subtitle="Nevezetes vonalak tulajdonságai és hasonlósági bizonyítása"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 10: Ráadás – Magasságtétel, befogótétel */}
        {(showAll || activeSubSectionId === 'g10-sec-has-magassag-befogotetel') && (
          <section>
            <SectionHeader id="g10-sec-has-magassag-befogotetel" number={10} title="Ráadás – Magasságtétel, befogótétel" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Derékszögű Háromszögek Metrikus Tételei"
                subtitle="m = √(pq), a = √(cp), b = √(cq) és a Pitagorasz-tétel"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 11: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-has-gyakorlas') && (
          <section>
            <SectionHeader id="g10-sec-has-gyakorlas" number={11} title="Gyakorlás" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Hasonlósági Feladatok"
                subtitle="Oldal- és területszámítások hasonló alakzatokban"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 12: Ráadás – Szépség és művészet */}
        {(showAll || activeSubSectionId === 'g10-sec-has-szepseg-muveszet') && (
          <section>
            <SectionHeader id="g10-sec-has-szepseg-muveszet" number={12} title="Ráadás – Szépség és művészet" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Aranymetszés és Önhasonlóság"
                subtitle="Φ ≈ 1,618 arány, fraktálok és a természet geometriája"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 13: Ismétlés, gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-has-ismetles-gyakorlas') && (
          <section>
            <SectionHeader id="g10-sec-has-ismetles-gyakorlas" number={13} title="Ismétlés, gyakorlás" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Átfogó Hasonlósági Ismétlés"
                subtitle="Fogalmi háló, alapesetek és típushibák megbeszélése"
                type="Hamarosan"
                emoji="📚"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 14: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-has-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-has-tudasproba" number={14} title="Gyakorlás, tudáspróba" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hasonlóság Tudáspróba"
                subtitle="Fejezeti feladatsor és geometriai témazáró"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 15: Témazáró feladatgyűjtemény */}
        {(showAll || activeSubSectionId === 'g10-sec-has-temazaro-gyujtemeny') && (
          <section>
            <SectionHeader id="g10-sec-has-temazaro-gyujtemeny" number={15} title="Témazáró feladatgyűjtemény" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Év Végi Feladatgyűjtemény"
                subtitle="Érettségi és verseny típusú emelt szintű feladatok"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 16: Ráadás – Mindennapi pénzügyeink */}
        {(showAll || activeSubSectionId === 'g10-sec-has-mindennapi-penzugyek') && (
          <section>
            <SectionHeader id="g10-sec-has-mindennapi-penzugyek" number={16} title="Ráadás – Mindennapi pénzügyeink" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pénzügyi Matematika és Tudatosság"
                subtitle="Kamatos kamat, THM, infláció és befektetési stratégiák"
                type="Hamarosan"
                emoji="🪙"
                disabled={true}
                icon={<Coins className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Fallback for other Grade 10 topics: textbook materials
  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">
          10. osztályos tankönyvi tananyagok, feladatgyűjtemények és segédletek.
        </p>
      </div>
      <MaterialGallery
        grade="high-2"
        onView={onMaterialSelect || (() => { })}
      />
    </div>
  );
};

export default Grade10View;
