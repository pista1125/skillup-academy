import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  Activity,
  Binary,
  BookOpen,
  Boxes,
  Brain,
  Building2,
  Calculator,
  Circle,
  Clock,
  Compass,
  Divide,
  Lock,
  Network,
  Scale,
  Shapes,
  Share2,
  Shuffle,
  Split,
  Target,
  TrendingUp,
  Trophy,
  Users
} from 'lucide-react';

export const Grade11View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  // Topic I: Trigonometria
  if (topicId === 'g11-trigonometria') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Hegyesszög tangense */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-hegyesszog-tangense') && (
          <section>
            <SectionHeader id="g11-sec-trig-hegyesszog-tangense" number={1} title="Hegyesszög tangense" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tangens Fogalma és Meredekség"
                subtitle="Szemközti és szomszédos befogó aránya derékszögű háromszögben"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 2: Számolás szögek tangensével */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-szamolas-tangenssel') && (
          <section>
            <SectionHeader id="g11-sec-trig-szamolas-tangenssel" number={2} title="Számolás szögek tangensével" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szög és Oldalszámítás Tangenssel"
                subtitle="Számológép használata, szög visszakeresése és hiányzó befogók"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 3: Hegyesszög szinusza, koszinusza */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-szinusz-koszinusz') && (
          <section>
            <SectionHeader id="g11-sec-trig-szinusz-koszinusz" number={3} title="Hegyesszög szinusza, koszinusza" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szinusz és Koszinusz Definíciója"
                subtitle="Befogók és átfogó aránya, értékkészlet a (0, 1) intervallumon"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: A szögfüggvények tulajdonságai */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-tulajdonsagok') && (
          <section>
            <SectionHeader id="g11-sec-trig-tulajdonsagok" number={4} title="A szögfüggvények tulajdonságai" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Azonosságok és Nevezetes Szögek"
                subtitle="sin²α + cos²α = 1, pótszögek és 30°, 45°, 60° pontos értékei"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 5: Hosszúságok és szögek kiszámítása */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-hosszusagok-szogek') && (
          <section>
            <SectionHeader id="g11-sec-trig-hosszusagok-szogek" number={5} title="Hosszúságok és szögek kiszámítása" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Derékszögű Háromszögek Megoldása"
                subtitle="Oldalak és hegyesszögek kiszámítása két alapadatból"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 6: Új területképlet */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-uj-teruletkeplet') && (
          <section>
            <SectionHeader id="g11-sec-trig-uj-teruletkeplet" number={6} title="Új területképlet" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Trigonometrikus Területszámítás"
                subtitle="T = (a · b · sin γ) / 2 képlet és alkalmazása síkidomokban"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 7: Ráadás – Milyen magas a torony? */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-milyen-magas-a-torony') && (
          <section>
            <SectionHeader id="g11-sec-trig-milyen-magas-a-torony" number={7} title="Ráadás – Milyen magas a torony?" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Közvetett Terepi Magasságmérés"
                subtitle="Megközelíthetetlen alappontú objektumok magasságának számítása"
                type="Hamarosan"
                emoji="🗼"
                disabled={true}
                icon={<Building2 className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 8: A tompaszög és a derékszög szinusza */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-tompaszog-szinusz') && (
          <section>
            <SectionHeader id="g11-sec-trig-tompaszog-szinusz" number={8} title="A tompaszög és a derékszög szinusza" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szinusz Kiterjesztése és az Egységkör"
                subtitle="Forgásszögek, sin(180° - α) = sin α és a pozitív szinusz"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<Circle className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 9: A szinusztétel */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-szinusztetel') && (
          <section>
            <SectionHeader id="g11-sec-trig-szinusztetel" number={9} title="A szinusztétel" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Szinusztétel Alapjai"
                subtitle="Oldalak és szemközti szögek szinuszának aránya és a 2R összefüggés"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 10: Alkalmazások */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-alkalmazasok') && (
          <section>
            <SectionHeader id="g11-sec-trig-alkalmazasok" number={10} title="Alkalmazások" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Háromszögek Megoldása Szinusztétellel"
                subtitle="Egy oldal és két szög, valamint a kétértelmű eset kivizsgálása"
                type="Hamarosan"
                emoji="🧠"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 11: A tompaszög és a derékszög koszinusza */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-tompaszog-koszinusz') && (
          <section>
            <SectionHeader id="g11-sec-trig-tompaszog-koszinusz" number={11} title="A tompaszög és a derékszög koszinusza" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tompaszögek Negatív Koszinusza"
                subtitle="cos(180° - α) = -cos α és az egységkör koordinátái"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Circle className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 12: A koszinusztétel */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-koszinusztetel') && (
          <section>
            <SectionHeader id="g11-sec-trig-koszinusztetel" number={12} title="A koszinusztétel" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Koszinusztétel és Alkalmazása"
                subtitle="Pitagorasz-tétel kiterjesztése, oldalak és szögek egyértelmű kiszámítása"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 13: Sokszögek és szögfüggvények */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-sokszogek-szogfuggvenyek') && (
          <section>
            <SectionHeader id="g11-sec-trig-sokszogek-szogfuggvenyek" number={13} title="Sokszögek és szögfüggvények" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Négyszögek és Általános Sokszögek"
                subtitle="Átlók, belső szögek és területszámítás felbontással"
                type="Hamarosan"
                emoji="🔷"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 14: A kör és a szabályos sokszögek */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-kor-szabalyos-sokszogek') && (
          <section>
            <SectionHeader id="g11-sec-trig-kor-szabalyos-sokszogek" number={14} title="A kör és a szabályos sokszögek" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szabályos Sokszögek Metrikája"
                subtitle="Beírt és köré írt kör sugara, oldalhossz és határátmenet a körhöz"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 15: Csoportverseny */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-csoportverseny') && (
          <section>
            <SectionHeader id="g11-sec-trig-csoportverseny" number={15} title="Csoportverseny" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kooperatív Trigonometriai Vetélkedő"
                subtitle="Villámkérdések, tételválasztási stratégia és hibakeresés"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Users className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 16: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g11-sec-trig-tudasproba') && (
          <section>
            <SectionHeader id="g11-sec-trig-tudasproba" number={16} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Trigonometria Tudáspróba"
                subtitle="Átfogó fejezeti számonkérés és érettségi típusú feladványok"
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

  // Topic II: Kombinatorika, gráfok
  if (topicId === 'g11-kombinatorika-grafok') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Jelszavak */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-jelszavak') && (
          <section>
            <SectionHeader id="g11-sec-comb-jelszavak" number={1} title="Jelszavak" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kódok és Jelszóerősség"
                subtitle="Szorzási szabály, ismétléses variáció (n^k) és biztonsági kombinációk"
                type="Hamarosan"
                emoji="🔐"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 2: Sorba rendezés */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-sorba-rendezes') && (
          <section>
            <SectionHeader id="g11-sec-comb-sorba-rendezes" number={2} title="Sorba rendezés" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Permutáció és Faktoriális"
                subtitle="Ismétlés nélküli (n!) és ismétléses sorba rendezések kötöttségekkel"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Shuffle className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 3: Amikor nem számít a kiválasztás sorrendje */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-nem-szamit-sorrend') && (
          <section>
            <SectionHeader id="g11-sec-comb-nem-szamit-sorrend" number={3} title="Amikor nem számít a kiválasztás sorrendje" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kombinációk és Részhalmazok"
                subtitle="Ismétlés nélküli kombináció, lottóhúzások és bizottságok kiválasztása"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Binomiális együtthatók */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-binomialis-egyutthatok') && (
          <section>
            <SectionHeader id="g11-sec-comb-binomialis-egyutthatok" number={4} title="Binomiális együtthatók" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pascal-háromszög és Binomiális Tétel"
                subtitle="Binomiális együtthatók azonosságai és az (a+b)^n hatványkifejtés"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 5: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-gyakorlas-1') && (
          <section>
            <SectionHeader id="g11-sec-comb-gyakorlas-1" number={5} title="Gyakorlás" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kombinatorikai Modellválasztás"
                subtitle="Permutáció, variáció és kombináció felismerése és begyakorlása"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 6: Esetszétválasztás */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-esetszetvalasztas') && (
          <section>
            <SectionHeader id="g11-sec-comb-esetszetvalasztas" number={6} title="Esetszétválasztás" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összeadási Szabály és Esetszétbontás"
                subtitle="Diszjunkt esetek vizsgálata, komplementer számítás és feltételek"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 7: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-gyakorlas-2') && (
          <section>
            <SectionHeader id="g11-sec-comb-gyakorlas-2" number={7} title="Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Feltételes Feladatok Gyakorlása"
                subtitle="Kockadobások, számjegyek és összetett kiválasztási problémák"
                type="Hamarosan"
                emoji="🎲"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 8: Gráfok jellemzői */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-grafok-jellemzoi') && (
          <section>
            <SectionHeader id="g11-sec-comb-grafok-jellemzoi" number={8} title="Gráfok jellemzői" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Csúcsok, Élek és Kézfogási Lemma"
                subtitle="Gráfok fokszámai, fokszámtétel és teljes gráfok tulajdonságai"
                type="Hamarosan"
                emoji="🕸️"
                disabled={true}
                icon={<Network className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 9: Kombinatorika és gráfok */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-kombinatorika-es-grafok') && (
          <section>
            <SectionHeader id="g11-sec-comb-kombinatorika-es-grafok" number={9} title="Kombinatorika és gráfok" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Utak, Fák és Euler-vonalak"
                subtitle="Összefüggő gráfok, fakövetelmény (n-1 él) és egyvonalas rajzolhatóság"
                type="Hamarosan"
                emoji="🌐"
                disabled={true}
                icon={<Share2 className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 10: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-tudasproba') && (
          <section>
            <SectionHeader id="g11-sec-comb-tudasproba" number={10} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kombinatorika és Gráfok Tudáspróba"
                subtitle="Összefoglaló ellenőrző feladatsor és számonkérés"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 11: Témazáró feladatgyűjtemény */}
        {(showAll || activeSubSectionId === 'g11-sec-comb-temazaro-gyujtemeny') && (
          <section>
            <SectionHeader id="g11-sec-comb-temazaro-gyujtemeny" number={11} title="Témazáró feladatgyűjtemény" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Érettségi Feladatgyűjtemény"
                subtitle="Közép- és emelt szintű érettségi feladatok, skatulya-elv és modellezés"
                type="Hamarosan"
                emoji="📚"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic III: Hatvány, gyök, logaritmus
  if (topicId === 'g11-hatvany-gyok-logaritmus') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Hatványozás – ismétlés */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-hatvanyozas-ismetles') && (
          <section>
            <SectionHeader id="g11-sec-exp-hatvanyozas-ismetles" number={1} title="Hatványozás – ismétlés" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egész Kitevőjű Hatványozás"
                subtitle="Pozitív, nulla és negatív kitevők, azonosságok és normálalak"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 2: Számok n-edik gyöke */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-szamok-n-edik-gyoke') && (
          <section>
            <SectionHeader id="g11-sec-exp-szamok-n-edik-gyoke" number={2} title="Számok n-edik gyöke" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="N-edik Gyök és Azonosságai"
                subtitle="Páros és páratlan gyökkitevők, abszolútérték és szorzat/hányados gyöke"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 3: Racionális számok a kitevőben I. */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-racionalis-szamok-1') && (
          <section>
            <SectionHeader id="g11-sec-exp-racionalis-szamok-1" number={3} title="Racionális számok a kitevőben I." color="yellow" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Törtkitevőjű Hatvány Alapjai"
                subtitle="Kapcsolat a gyökkel (a^(p/q) = q-adik gyök a^p) és alapfeltételek"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 4: Racionális számok a kitevőben II. */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-racionalis-szamok-2') && (
          <section>
            <SectionHeader id="g11-sec-exp-racionalis-szamok-2" number={4} title="Racionális számok a kitevőben II." color="lime" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Műveletek Törtkitevőkkel"
                subtitle="Hatványozási azonosságok racionális kitevőkre és algebrai átalakítások"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="lime"
              />
            </div>
          </section>
        )}

        {/* Section 5: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-gyakorlas-1') && (
          <section>
            <SectionHeader id="g11-sec-exp-gyakorlas-1" number={5} title="Gyakorlás" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hatvány- és Gyökgyakorlatok"
                subtitle="Kifejezések egyszerűsítése, kikötések és számológép nélküli feladatok"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 6: Pénzügyi számítások */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-penzugyi-szamitasok') && (
          <section>
            <SectionHeader id="g11-sec-exp-penzugyi-szamitasok" number={6} title="Pénzügyi számítások" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kamatos Kamat és Tőkésítés"
                subtitle="Jövőérték számítás, növekedési tényező (q^n), tőkésítési periódusok és futamidő"
                type="Hamarosan"
                emoji="💰"
                disabled={true}
                icon={<Building2 className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 7: Exponenciális függvények */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-fuggvenyek') && (
          <section>
            <SectionHeader id="g11-sec-exp-fuggvenyek" number={7} title="Exponenciális függvények" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Az f(x) = a^x Függvény"
                subtitle="Monotonitás alap szerint (a > 1 növekvő, 0 < a < 1 csökkenő), aszimptota és grafikon"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 8: Exponenciális folyamatok */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-folyamatok') && (
          <section>
            <SectionHeader id="g11-sec-exp-folyamatok" number={8} title="Exponenciális folyamatok" color="sky" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Valós Növekedési Modellek"
                subtitle="Népességnövekedés, baktériumok szaporodása és kettőződési idő"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 9: Felezési idő */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-felezesi-ido') && (
          <section>
            <SectionHeader id="g11-sec-exp-felezesi-ido" number={9} title="Felezési idő" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Radioaktív Bomlás és Csillapodás"
                subtitle="Bomlástörvény N(t) = N0 · (1/2)^(t/T), izotópok és radiokarbon kormeghatározás"
                type="Hamarosan"
                emoji="⏳"
                disabled={true}
                icon={<Clock className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 10: A logaritmus fogalma */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-logaritmus-fogalma') && (
          <section>
            <SectionHeader id="g11-sec-exp-logaritmus-fogalma" number={10} title="A logaritmus fogalma" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Logaritmus Definíciója"
                subtitle="log_a b = c ⇔ a^c = b, kikötések és a három alapművelet összefüggése"
                type="Hamarosan"
                emoji="🔑"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 11: A tízes alapú logaritmus használata */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-tizes-alapu-logaritmus') && (
          <section>
            <SectionHeader id="g11-sec-exp-tizes-alapu-logaritmus" number={11} title="A tízes alapú logaritmus használata" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tízes Alapú Logaritmus és Bázisváltás"
                subtitle="lg x, bázisváltó formula és logaritmikus skálák (pH, Richter, decibel)"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 12: Hatvány, gyök, logaritmus */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-hatvany-gyok-logaritmus') && (
          <section>
            <SectionHeader id="g11-sec-exp-hatvany-gyok-logaritmus" number={12} title="Hatvány, gyök, logaritmus" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Logaritmus Műveleti Azonosságai"
                subtitle="Szorzat, hányados és hatvány logaritmusa, kifejezések bontása és összevonása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 13: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-gyakorlas-2') && (
          <section>
            <SectionHeader id="g11-sec-exp-gyakorlas-2" number={13} title="Gyakorlás" color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Logaritmusos Kifejezések Gyakorlása"
                subtitle="Összetett kifejezések egyetlen logaritmusra hozása és alapegyenletek"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="fuchsia"
              />
            </div>
          </section>
        )}

        {/* Section 14: Exponenciális egyenlőtlenségek */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-egyenlotlensegek') && (
          <section>
            <SectionHeader id="g11-sec-exp-egyenlotlensegek" number={14} title="Exponenciális egyenlőtlenségek" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenlőtlenségek és Monotonitás"
                subtitle="Relációjel viselkedése az alap szerint (a > 1 vs 0 < a < 1) és megoldáshalmaz"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 15: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-gyakorlas-3') && (
          <section>
            <SectionHeader id="g11-sec-exp-gyakorlas-3" number={15} title="Gyakorlás" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Egyenletek és Rendszerek"
                subtitle="Helyettesítéses módszer, mindkét oldal logaritmizálása és kikötésellenőrzés"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 16: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g11-sec-exp-tudasproba') && (
          <section>
            <SectionHeader id="g11-sec-exp-tudasproba" number={16} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hatvány, Gyök, Logaritmus Tudáspróba"
                subtitle="Átfogó fejezeti számonkérés, képletgyűjtemény és érettségi típusfeladatok"
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

  // Topic IV: Számelmélet
  if (topicId === 'g11-szamelmelet') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Számhalmazok */}
        {(showAll || activeSubSectionId === 'g11-sec-num-szamhalmazok') && (
          <section>
            <SectionHeader id="g11-sec-num-szamhalmazok" number={1} title="Számhalmazok" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Számhalmazok Rendszere"
                subtitle="N ⊂ Z ⊂ Q ⊂ R, műveleti zártság és a számegyenes felépítése"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 2: Osztó, többszörös */}
        {(showAll || activeSubSectionId === 'g11-sec-num-oszto-tobbszoros') && (
          <section>
            <SectionHeader id="g11-sec-num-oszto-tobbszoros" number={2} title="Osztó, többszörös" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Oszthatóság és Prímfelbontás"
                subtitle="Oszthatóság definíciója, prímszámok és a számelmélet alaptétele"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 3: Legnagyobb közös osztó, legkisebb közös többszörös */}
        {(showAll || activeSubSectionId === 'g11-sec-num-lnko-lkkt') && (
          <section>
            <SectionHeader id="g11-sec-num-lnko-lkkt" number={3} title="Legnagyobb közös osztó, legkisebb közös többszörös" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="LNKO, LKKT és Euklideszi Algoritmus"
                subtitle="Közös osztók, többszörösök, relatív prímek és euklideszi algoritmus"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 4: Oszthatósági szabályok, osztási maradékok */}
        {(showAll || activeSubSectionId === 'g11-sec-num-oszthatosagi-szabalyok') && (
          <section>
            <SectionHeader id="g11-sec-num-oszthatosagi-szabalyok" number={4} title="Oszthatósági szabályok, osztási maradékok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Helyiértékes Szabályok és Maradékok"
                subtitle="2, 3, 4, 5, 8, 9, 10, 11 szabályai, összetett osztók és maradékos osztás"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 5: Oszthatóság és logika */}
        {(showAll || activeSubSectionId === 'g11-sec-num-oszthatosag-es-logika') && (
          <section>
            <SectionHeader id="g11-sec-num-oszthatosag-es-logika" number={5} title="Oszthatóság és logika" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Logika és Bizonyítások"
                subtitle="Szükséges és elégséges feltételek, indirekt bizonyítás és skatulya-elv"
                type="Hamarosan"
                emoji="🧠"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 6: Oszthatósági feladatok */}
        {(showAll || activeSubSectionId === 'g11-sec-num-oszthatosagi-feladatok') && (
          <section>
            <SectionHeader id="g11-sec-num-oszthatosagi-feladatok" number={6} title="Oszthatósági feladatok" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kifejezések Oszthatósága"
                subtitle="Szorzattá alakítás, egymást követő egészek és diofantoszi egyenletek"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 7: Számrendszerek I. */}
        {(showAll || activeSubSectionId === 'g11-sec-num-szamrendszerek-1') && (
          <section>
            <SectionHeader id="g11-sec-num-szamrendszerek-1" number={7} title="Számrendszerek I." color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Helyiértékes Elv és Bináris Rendszer"
                subtitle="Kettes és tízes alapú számrendszer és kölcsönös átváltási technikák"
                type="Hamarosan"
                emoji="💻"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 8: Számrendszerek II. */}
        {(showAll || activeSubSectionId === 'g11-sec-num-szamrendszerek-2') && (
          <section>
            <SectionHeader id="g11-sec-num-szamrendszerek-2" number={8} title="Számrendszerek II." color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Oktális és Hexadecimális Rendszer"
                subtitle="8-as és 16-os rendszerek, bitcsoportosítás és alapműveletek"
                type="Hamarosan"
                emoji="⚙️"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="fuchsia"
              />
            </div>
          </section>
        )}

        {/* Section 9: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-num-gyakorlas-1') && (
          <section>
            <SectionHeader id="g11-sec-num-gyakorlas-1" number={9} title="Gyakorlás" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számelméleti és Rendszergyakorlatok"
                subtitle="Hiányzó számjegyek keresése, összetett oszthatóság és egyenletek"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 10: Racionális számok, irracionális számok */}
        {(showAll || activeSubSectionId === 'g11-sec-num-racionalis-irracionalis') && (
          <section>
            <SectionHeader id="g11-sec-num-racionalis-irracionalis" number={10} title="Racionális számok, irracionális számok" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tizedestörtek és Irracionalitás"
                subtitle="Végtelen szakaszos törtek közönséges törtté alakítása és gyök 2 irracionalitása"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 11: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g11-sec-num-tudasproba') && (
          <section>
            <SectionHeader id="g11-sec-num-tudasproba" number={11} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számelmélet Tudáspróba"
                subtitle="Átfogó fejezeti ismétlés, feladatsor és számonkérés"
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

  // Topic V: Statisztika és valószínűségszámítás
  if (topicId === 'g11-statisztika-valoszinuseg') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Adatrendezés – statisztikai jellemzők */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-adatrendezes') && (
          <section>
            <SectionHeader id="g11-sec-stat-adatrendezes" number={1} title="Adatrendezés – statisztikai jellemzők" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakoriság és Középértékek"
                subtitle="Átlag, medián, módusz, terjedelem és relatív gyakorisági táblázatok"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 2: Diagramok */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-diagramok') && (
          <section>
            <SectionHeader id="g11-sec-stat-diagramok" number={2} title="Diagramok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Diagramtípusok és Ábrázolás"
                subtitle="Oszlop-, sáv-, kör- és vonaldiagramok, középponti szögek és hisztogram"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<Activity className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: A dobozdiagram */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-dobozdiagram') && (
          <section>
            <SectionHeader id="g11-sec-stat-dobozdiagram" number={3} title="A dobozdiagram" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="5 Számos Összefoglaló és Box Plot"
                subtitle="Minimum, Q1, medián, Q3, maximum, kvartilisterjedelem és eloszlás"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Adatsokaság szórása */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-szoras') && (
          <section>
            <SectionHeader id="g11-sec-stat-szoras" number={4} title="Adatsokaság szórása" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Variancia és Szórás"
                subtitle="Átlagtól való négyzetes eltérések, tapasztalati szórás és homogenitás"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 5: Ráadás – Statisztikai számítások számológéppel */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-szamologep') && (
          <section>
            <SectionHeader id="g11-sec-stat-szamologep" number={5} title="Ráadás – Statisztikai számítások számológéppel" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Zsebszámológép és Táblázatkezelő"
                subtitle="STAT mód használata, adatsor bevitele, szórás és átlag lekérdezése"
                type="Hamarosan"
                emoji="🖩"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 6: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-gyakorlas-1') && (
          <section>
            <SectionHeader id="g11-sec-stat-gyakorlas-1" number={6} title="Gyakorlás" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Leíró Statisztikai Gyakorlatok"
                subtitle="Hiányzó adatok visszaszámolása átlagból és diagramok elemzése"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 7: Valószínűség – ismétlés */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-valoszinuseg-ismetles') && (
          <section>
            <SectionHeader id="g11-sec-stat-valoszinuseg-ismetles" number={7} title="Valószínűség – ismétlés" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Klasszikus Valószínűségi Modell"
                subtitle="Kedvező/összes esetek, komplementer esemény és összeadási szabály"
                type="Hamarosan"
                emoji="🎲"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 8: Ráadás – Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-raadas-gyakorlas') && (
          <section>
            <SectionHeader id="g11-sec-stat-raadas-gyakorlas" number={8} title="Ráadás – Gyakorlás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kombinatorikus és Geometriai Valószínűség"
                subtitle="Összetett eseményterek, találkozási probléma és geometriai arányok"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 9: Várható érték */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-varhato-ertek') && (
          <section>
            <SectionHeader id="g11-sec-stat-varhato-ertek" number={9} title="Várható érték" color="yellow" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Diszkrét Változók és Várható Érték"
                subtitle="Valószínűségi eloszlás, E(X) = ∑ xi·pi és méltányos játékok vizsgálata"
                type="Hamarosan"
                emoji="💰"
                disabled={true}
                icon={<Building2 className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 10: Két vagy több elemet húzunk egyszerre */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-tobb-elem-egyszerre') && (
          <section>
            <SectionHeader id="g11-sec-stat-tobb-elem-egyszerre" number={10} title="Két vagy több elemet húzunk egyszerre" color="lime" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyidejű Húzások Valószínűsége"
                subtitle="Kombinációkkal való számítás, lottó és kártyaesélyek kalkulációja"
                type="Hamarosan"
                emoji="🃏"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="lime"
              />
            </div>
          </section>
        )}

        {/* Section 11: Visszatevés nélküli mintavétel */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-visszateves-nelkul') && (
          <section>
            <SectionHeader id="g11-sec-stat-visszateves-nelkul" number={11} title="Visszatevés nélküli mintavétel" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Hipergeometrikus Modell és Fa-diagram"
                subtitle="Egymás utáni húzások, feltételes valószínűség és szorzási szabály"
                type="Hamarosan"
                emoji="🌳"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 12: Ugyanazt többször */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-ugyanazt-tobbszor') && (
          <section>
            <SectionHeader id="g11-sec-stat-ugyanazt-tobbszor" number={12} title="Ugyanazt többször" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Független Bernoulli-kísérletek"
                subtitle="Ismételt próbák, binomiális eloszlás P(X=k) = (n alatt k)·p^k·(1-p)^(n-k)"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Shuffle className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 13: Visszatevéses mintavétel */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-visszateveses') && (
          <section>
            <SectionHeader id="g11-sec-stat-visszateveses" number={13} title="Visszatevéses mintavétel" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Állandó Valószínűségű Mintavétel"
                subtitle="Binomiális eloszlás várható értéke (n·p) és szórása gyök(n·p·q)"
                type="Hamarosan"
                emoji="🔁"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 14: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-gyakorlas-2') && (
          <section>
            <SectionHeader id="g11-sec-stat-gyakorlas-2" number={14} title="Gyakorlás" color="sky" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Összetett Valószínűségi Feladatok"
                subtitle="Visszatevéses vs visszatevés nélküli modellek és 'legalább egy' kérdések"
                type="Hamarosan"
                emoji="🧠"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 15: Ráadás – Visszatevéssel vagy anélkül? */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-visszatevessel-vagy-anelkul') && (
          <section>
            <SectionHeader id="g11-sec-stat-visszatevessel-vagy-anelkul" number={15} title="Ráadás – Visszatevéssel vagy anélkül?" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Modellek Összehasonlítása és Közelítés"
                subtitle="Mikor helyettesíthető a hipergeometrikus eloszlás binomiálissal nagy sokaságnál"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 16: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g11-sec-stat-tudasproba') && (
          <section>
            <SectionHeader id="g11-sec-stat-tudasproba" number={16} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Statisztika és Valószínűség Tudáspróba"
                subtitle="Átfogó fejezeti számonkérés és érettségi típusú feladatsor"
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

  // Topic VI: Koordinátageometria
  if (topicId === 'g11-koordinatageometria') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Vektorok összeadása */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-vektorok-osszeadasa') && (
          <section>
            <SectionHeader id="g11-sec-geo-vektorok-osszeadasa" number={1} title="Vektorok összeadása" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Vektorok Geometriai Összege"
                subtitle="Háromszög-módszer, paralelogramma-módszer és a vektorösszeadás tulajdonságai"
                type="Hamarosan"
                emoji="↗️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 2: Két vektor különbsége */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-ket-vektor-kulonbsege') && (
          <section>
            <SectionHeader id="g11-sec-geo-ket-vektor-kulonbsege" number={2} title="Két vektor különbsége" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Ellentett Vektor és Különbség"
                subtitle="a - b = a + (-b), közös kezdőpontból indított vektorok és a paralelogramma átlója"
                type="Hamarosan"
                emoji="↔️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 3: Vektorok számszorosa */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-vektorok-szamszorosa') && (
          <section>
            <SectionHeader id="g11-sec-geo-vektorok-szamszorosa" number={3} title="Vektorok számszorosa" color="fuchsia" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Vektor Skalárszorosa és Kollinearitás"
                subtitle="λ·a vektor hossza, iránya, párhuzamosság feltétele és disztributivitás"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="fuchsia"
              />
            </div>
          </section>
        )}

        {/* Section 4: Ráadás – Vektor felbontása összetevőkre */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-vektor-felbontasa') && (
          <section>
            <SectionHeader id="g11-sec-geo-vektor-felbontasa" number={4} title="Ráadás – Vektor felbontása összetevőkre" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Bázisvektorok és Komponensek"
                subtitle="Vektorok egyértelmű felírása síkbeli bázisban és lejtőn ható erők"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 5: Vektorok a koordináta-rendszerben */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-vektorok-koordinatai') && (
          <section>
            <SectionHeader id="g11-sec-geo-vektorok-koordinatai" number={5} title="Vektorok a koordináta-rendszerben" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Helyvektorok és Koordinátaműveletek"
                subtitle="AB vektor kiszámítása pontokból, összeadás koordinátánként és vektor hossza"
                type="Hamarosan"
                emoji="📍"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>
        )}

        {/* Section 6: Távolság, kerület, terület */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-tavolsag-kerulet-terulet') && (
          <section>
            <SectionHeader id="g11-sec-geo-tavolsag-kerulet-terulet" number={6} title="Távolság, kerület, terület" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pontok Távolsága és Sokszögek Területe"
                subtitle="Pitagorasz-tétel koordinátákkal, oldalhosszak és háromszögterület-képletek"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Shapes className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 7: Felezőpont */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-felezopont') && (
          <section>
            <SectionHeader id="g11-sec-geo-felezopont" number={7} title="Felezőpont" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Felezőpont és Súlypont Képlete"
                subtitle="Szakaszfelező pont, osztópontok és háromszög súlypontjának koordinátái"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás csoportban */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-gyakorlas-csoportban') && (
          <section>
            <SectionHeader id="g11-sec-geo-gyakorlas-csoportban" number={8} title="Gyakorlás csoportban" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Vektoros Geometriai Bizonyítások"
                subtitle="Középvonal, súlyvonalak és négyszögek tulajdonságainak igazolása vektorokkal"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Users className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 9: Egyenesek a koordináta-rendszerben */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-egyenesek-a-sikban') && (
          <section>
            <SectionHeader id="g11-sec-geo-egyenesek-a-sikban" number={9} title="Egyenesek a koordináta-rendszerben" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Irányvektor és Normálvektor"
                subtitle="Egyenes meghatározása ponttal és vektorral, v(v1; v2) és n(-v2; v1) kapcsolata"
                type="Hamarosan"
                emoji="🧭"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>
        )}

        {/* Section 10: Az egyenes egyenlete */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-az-egyenes-egyenlete') && (
          <section>
            <SectionHeader id="g11-sec-geo-az-egyenes-egyenlete" number={10} title="Az egyenes egyenlete" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Normálvektoros és Általános Alak"
                subtitle="Ax + By = Ax0 + By0, együtthatók geometriai jelentése és egyenletfelírás"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 11: A kör egyenlete */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-a-kor-egyenlete') && (
          <section>
            <SectionHeader id="g11-sec-geo-a-kor-egyenlete" number={11} title="A kör egyenlete" color="lime" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kör Kanonikus és Általános Egyenlete"
                subtitle="(x - u)² + (y - v)² = r², középpont és sugár meghatározása teljes négyzetté alakítással"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<Circle className="w-6 h-6" />}
                color="lime"
              />
            </div>
          </section>
        )}

        {/* Section 12: Körrel kapcsolatos feladatok */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-korrel-kapcsolatos-feladatok') && (
          <section>
            <SectionHeader id="g11-sec-geo-korrel-kapcsolatos-feladatok" number={12} title="Körrel kapcsolatos feladatok" color="yellow" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kör Érintője és Metszéspontjai"
                subtitle="Érintő egyenlete adott pontban, egyenes és kör kölcsönös helyzete"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 13: Meredekség, iránytangens */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-meredekseg-iranytangens') && (
          <section>
            <SectionHeader id="g11-sec-geo-meredekseg-iranytangens" number={13} title="Meredekség, iránytangens" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Irányszög és Meredekséges Alak"
                subtitle="m = tan α = v2/v1 = -A/B, y = mx + b és y - y0 = m(x - x0)"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}

        {/* Section 14: Egyenesek metszéspontja */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-egyenesek-metszespontja') && (
          <section>
            <SectionHeader id="g11-sec-geo-egyenesek-metszespontja" number={14} title="Egyenesek metszéspontja" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Két Egyenes Metszéspontja"
                subtitle="Lineáris egyenletrendszer megoldása, metsző, párhuzamos és egybeeső egyenesek"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        )}

        {/* Section 15: Merőleges, párhuzamos egyenesek */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-meroleges-parhuzamos') && (
          <section>
            <SectionHeader id="g11-sec-geo-meroleges-parhuzamos" number={15} title="Merőleges, párhuzamos egyenesek" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Párhuzamosság és Merőlegesség Feltétele"
                subtitle="m1 = m2, m1·m2 = -1, normálvektorok skaláris szorzata és pont távolsága egyenestől"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}

        {/* Section 16: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-gyakorlas') && (
          <section>
            <SectionHeader id="g11-sec-geo-gyakorlas" number={16} title="Gyakorlás" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Háromszögek Nevezetes Vonalai"
                subtitle="Magasságvonalak, súlyvonalak, oldalfelezők és körülírt kör feladatai"
                type="Hamarosan"
                emoji="🧠"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>
        )}

        {/* Section 17: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g11-sec-geo-tudasproba') && (
          <section>
            <SectionHeader id="g11-sec-geo-tudasproba" number={17} title="Gyakorlás, tudáspróba" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Koordinátageometria Tudáspróba"
                subtitle="Átfogó fejezeti számonkérés és érettségi típusú feladatsor"
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

  // Fallback for other Grade 11 topics: textbook materials
  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">
          11. osztályos tankönyvi tananyagok, feladatgyűjtemények és segédletek.
        </p>
      </div>
      <MaterialGallery
        grade="high-3"
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade11View;
