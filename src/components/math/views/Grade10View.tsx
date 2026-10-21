import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
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
                title="Kijelentések és Igazságértékek"
                subtitle="Állítások felismerése és igazságértékük vizsgálata"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="blue"
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
                title="Negáció és Kvantorok"
                subtitle="Tagadás képzése és a 'minden' / 'van olyan' tagadása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="indigo"
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
                title="Konjunkció és Diszjunkció"
                subtitle="Összetett logikai műveletek és halmazműveleti párhuzamok"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<GitFork className="w-6 h-6" />}
                color="purple"
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
                title="Igazságtáblázatok és De Morgan"
                subtitle="Összetett kifejezések táblázatos elemzése és azonosságok"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="emerald"
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
                title="Implikáció és Megfordítása"
                subtitle="Feltételes állítások, szükséges és elégséges feltételek"
                type="Hamarosan"
                emoji="🔤"
                disabled={true}
                icon={<ArrowRightLeft className="w-6 h-6" />}
                color="amber"
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
                title="Logikai Próba és Bizonyítások"
                subtitle="Fejezeti összefoglaló feladatsor és tudáspróba"
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
                title="Grafikus Megoldás és Metszéspontok"
                subtitle="Egyenesek metszéspontja, párhuzamossága és egybeesése"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="blue"
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
                title="Helyettesítő és Egyenlő Együtthatók Módszere"
                subtitle="Algebrai eljárások és ellentmondások felismerése"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
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
                title="Háromismeretlenes és Másodfokú Rendszerek"
                subtitle="Kiterjesztett egyenletrendszerek és szöveges feladatok"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="purple"
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
                title="Típusfeladatok és Paraméteres Rendszerek"
                subtitle="Megoldási stratégiák és szimmetrikus egyenletrendszerek"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="amber"
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
                title="Egyenletrendszerek Tudáspróba"
                subtitle="Fejezeti feladatsor és érettségi típusú problémák"
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
                title="Hatványozás Alapjai és Azonosságai"
                subtitle="Azonos alapú és kitevőjű hatványok műveletei"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="blue"
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
                title="Nulla és Negatív Kitevők"
                subtitle="a^0 = 1 és a^(-n) = 1/a^n értelmezése és számítások"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Hash className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 3: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-hatvany-gyakorlas') && (
          <section>
            <SectionHeader id="g10-sec-hatvany-gyakorlas" number={3} title="Gyakorlás" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Hatványos Kifejezések"
                subtitle="Betűs algebrai törtek egyszerűsítése és prímhatványok"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
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
                title="Standard Normálalak és Nagyságrendek"
                subtitle="Műveletek a*10^k alakú számokkal és mértékegységek"
                type="Hamarosan"
                emoji="🌐"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="emerald"
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
                title="A Négyzetgyök Fogalma és Azonosságai"
                subtitle="Szorzat és hányados gyöke, sqrt(a^2) = |a| szabály"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="teal"
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
                title="Gyöktelenítés és Részleges Gyökvonás"
                subtitle="Tényező kiemelése/bevitele és nevező gyöktelenítése"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
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
                title="Nevezetes Azonosságok Gyökökkel"
                subtitle="Kikötések, értelmezési tartomány és gyökös egyenletek"
                type="Hamarosan"
                emoji="🧠"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="violet"
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
                title="Hatvány és Gyök Tudáspróba"
                subtitle="Fejezeti feladatsor és érettségi típusfeladatok"
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
                title="Gyakorlati Függvénymodellek"
                subtitle="Értelmezési tartomány és összefüggések a mindennapokban"
                type="Hamarosan"
                emoji="🌐"
                disabled={true}
                icon={<LineChart className="w-6 h-6" />}
                color="blue"
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
                title="Az f(x) = x² Alapfüggvény"
                subtitle="Normálparabola tulajdonságai, szimmetriája és csúcspontja"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="indigo"
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
                title="Párhuzamos Eltolások"
                subtitle="f(x) ± c és f(x ∓ u) transzformációk geometriája"
                type="Hamarosan"
                emoji="↔️"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
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
                title="Nyújtás, Zsugorítás és Tükrözés"
                subtitle="a · f(x) szorzótényező hatása és x-tengelyes tükrözés"
                type="Hamarosan"
                emoji="↕️"
                disabled={true}
                icon={<Maximize2 className="w-6 h-6" />}
                color="emerald"
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
                title="Többlépéses Transzformációk"
                subtitle="Lépések helyes sorrendje és abszolútérték-transzformációk"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<GitFork className="w-6 h-6" />}
                color="purple"
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
                title="Teljes Négyzetté Kiegészítés"
                subtitle="Polinom alak átírása a(x-u)² + v kanonikus alakra"
                type="Hamarosan"
                emoji="🔤"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
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
                title="Parabolák Rajzolása és Jellemzése"
                subtitle="Csúcspont, tengelymetszetek, zérushelyek és monotonitás"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
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
                title="Gyakorlati Szélsőértékek és Egyenletek"
                subtitle="Grafikus egyenletmegoldás és optimalizálási problémák"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="teal"
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
                title="Függvénytranszformációk Tudáspróba"
                subtitle="Fejezeti feladatsor és érettségi típusú feladványok"
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
                title="Alapfogalmak és Azonosságok"
                subtitle="Átalakítás (x ± u)² = v alakra és lépései"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
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
                title="Főegyütthatós Egyenletek Megoldása"
                subtitle="Teljes négyzet alkalmazása a ≠ 1 esetén és gyökvonás"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="orange"
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
                title="A Megoldóképlet Levezetése és Képlete"
                subtitle="Az ax² + bx + c = 0 egyenlet általános megoldóképlete"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="red"
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
                title="Megoldóképlet Gyakorlása"
                subtitle="Együtthatók behelyettesítése, előjelek és gyökvonás"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
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
                title="Számelméleti és Algebrai Problémák"
                subtitle="Egymást követő számok, szorzatok és összegek modellezése"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Hash className="w-6 h-6" />}
                color="blue"
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
                title="A Gyökök Száma és Tulajdonságai"
                subtitle="A D = b² - 4ac értéke és geometriai jelentése"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="purple"
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
                title="Geometriai Szöveges Feladatok"
                subtitle="Téglalapok területe, kerülete és derékszögű háromszögek"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Maximize2 className="w-6 h-6" />}
                color="emerald"
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
                title="Új Ismeretlen Bevezetése és Törtes Egyenletek"
                subtitle="Biquadratikus és helyettesítéses egyenletek megoldása"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<ArrowRightLeft className="w-6 h-6" />}
                color="cyan"
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
                title="Pénzügyi Modellek és Százalékszámítás"
                subtitle="Árváltozások, kamatok és bevételek optimalizálása"
                type="Hamarosan"
                emoji="🪙"
                disabled={true}
                icon={<Coins className="w-6 h-6" />}
                color="amber"
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
                title="Sebesség és Együttes Munkavégzés"
                subtitle="Menetidők, sebességek és munkateljesítmények aránya"
                type="Hamarosan"
                emoji="⏱️"
                disabled={true}
                icon={<Clock className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 11: Csoportverseny */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-csoportverseny') && (
          <section>
            <SectionHeader id="g10-sec-quad-csoportverseny" number={11} title="Csoportverseny" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kooperatív Csapatvetélkedő"
                subtitle="Villámkérdések, hibakeresés és összetett csapatfeladványok"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Users className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 12: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-quad-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-quad-tudasproba" number={12} title="Gyakorlás, tudáspróba" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Másodfokú Egyenletek Tudáspróba"
                subtitle="Átfogó témazáró feladatsor és önértékelés"
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
                title="A Négy Egybevágósági Alapeset"
                subtitle="sss, sas, asa, ssa feltételek és alkalmazásuk"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="emerald"
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
                title="Bizonyítások Egybevágósággal"
                subtitle="Szakaszok és szögek egyenlőségének levezetése"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="teal"
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
                title="Kör Kerület- és Területszámítás"
                subtitle="K = 2rπ és T = r²π összefüggések, a π irracionalitása"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<Circle className="w-6 h-6" />}
                color="cyan"
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
                title="Ívhossz és Körcikk Területe"
                subtitle="Arányosság a középponti szöggel és képletek"
                type="Hamarosan"
                emoji="🍰"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 5: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-gyakorlas-kor') && (
          <section>
            <SectionHeader id="g10-sec-geo-gyakorlas-kor" number={5} title="Gyakorlás" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Síkidomok és Körrészek"
                subtitle="Körgyűrűk, körcikkek és kombinált alakzatok számítása"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
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
                title="Körgeometria a Gyakorlatban"
                subtitle="Kanyarodási sugarak, órák, forgó öntözők és ívek modellezése"
                type="Hamarosan"
                emoji="🌍"
                disabled={true}
                icon={<Clock className="w-6 h-6" />}
                color="purple"
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
                title="Beírt és Köré Írt Körök, Nevezetes Négyszögek"
                subtitle="Szabályos n-szögek, húr- és érintőnégyszögek tételei"
                type="Hamarosan"
                emoji="🔷"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-gyakorlas-sokszogek') && (
          <section>
            <SectionHeader id="g10-sec-geo-gyakorlas-sokszogek" number={8} title="Gyakorlás" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Sokszögek és Körök Számításai"
                subtitle="Metrikus feladatok és szerkesztési eljárások"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 9: Ismétlés */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-ismetles') && (
          <section>
            <SectionHeader id="g10-sec-geo-ismetles" number={9} title="Ismétlés" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Átfogó Geometriai Ismétlés"
                subtitle="Tételek, definíciók és képletek rendszerezése"
                type="Hamarosan"
                emoji="📚"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 10: Tudáspróba */}
        {(showAll || activeSubSectionId === 'g10-sec-geo-tudasproba') && (
          <section>
            <SectionHeader id="g10-sec-geo-tudasproba" number={10} title="Tudáspróba" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egybevágóság és Kör Tudáspróba"
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
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade10View;
