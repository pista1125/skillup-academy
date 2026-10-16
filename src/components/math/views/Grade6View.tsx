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

import { useQuizProgress } from '@/hooks/useQuizProgress';

export const Grade6View: React.FC<GradeViewProps> = ({
  topicId,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
  setPercentMode,
}) => {
  const { getTopicProgress } = useQuizProgress();

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
                  title="Műveletek tananyag"
                  subtitle="Egész számok halmaza, előjeles műveletek és zárójelek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-operations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Műveletek kvíz"
                  subtitle="Előjeles összeadás, kivonás és zárójelfelbontás 3 szinten"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g6-integers-operations-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g6-integers-operations')}
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
                  title="Szorzás tananyag"
                  subtitle="Előjelszabályok, szorzás nullával, disztributivitás és PDF"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-mult-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szorzás kvíz"
                  subtitle="Egész számok szorzása, negatív hatványok és műveleti sorrend"
                  type="Kvíz"
                  emoji="✖️"
                  onClick={() => onActivitySelect('g6-integers-mult-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-integers-mult')}
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
                  title="Osztás tananyag"
                  subtitle="Előjelszabályok, osztás nullával, inverz kapcsolat és PDF"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-div-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Osztás kvíz"
                  subtitle="Egész számok osztása, műveleti sorrend és törtek 3 szinten"
                  type="Kvíz"
                  emoji="➗"
                  onClick={() => onActivitySelect('g6-integers-div-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g6-integers-div')}
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
                  title="Összeszámolás tananyag"
                  subtitle="Fastruktúra, fa-diagram, szorzási szabály és kombinációk PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-cases-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Összeszámolás kvíz"
                  subtitle="Fastruktúra, permutációk, PIN kódok és esetek 3 szinten"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g6-integers-cases-quiz', topicId)}
                  icon={<Dices className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-integers-cases')}
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
                  title="Osztó, többszörös tananyag"
                  subtitle="Osztópárok, véges osztók, többszörösök és prímek PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-divisors-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Osztó, többszörös kvíz"
                  subtitle="Osztók, többszörösök, négyzetszámok és LNKO/LKKT 3 szinten"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g6-integers-divisors-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g6-integers-divisors')}
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
                  title="Maradékos tananyag"
                  subtitle="Maradékos osztás alaptétele, maradékosztályok és naptárszámítás PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-remainders-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Maradékos kvíz"
                  subtitle="Maradékos osztás, naptári napok és periodikus szabályok 3 szinten"
                  type="Kvíz"
                  emoji="⏳"
                  onClick={() => onActivitySelect('g6-integers-remainders-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-integers-remainders')}
                />
              </div>
            </section>
          )}

          {/* Section 7: Hány osztója van? */}
          {(showAll || activeSubSectionId === 'g6-sec-hany-osztoja-van') && (
            <section>
              <SectionHeader id="g6-sec-hany-osztoja-van" number={7} title="Hány osztója van? (Prímtényezők)" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Prímtényezők tananyag"
                  subtitle="Prímek, kanonikus alak, d(n) képlet és négyzetszámok PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-factorization-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Prímtényezők kvíz"
                  subtitle="Prímfelbontás, törzstényezők és osztók száma 3 szinten"
                  type="Kvíz"
                  emoji="🧱"
                  onClick={() => onActivitySelect('g6-integers-factorization-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-integers-factorization')}
                />
                <ActivityPlaceholder
                  title="Prímtényezős eszköz"
                  subtitle="Interaktív törzstényezős osztóoszlop kalkulátor"
                  type="Eszköz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('divisibility-factorization', topicId)}
                  icon={<Binary className="w-6 h-6" />}
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
                  title="Oszthatóság (2, 5, 10) tananyag"
                  subtitle="Utolsó számjegy szabályai, helyiértékes elmélet és labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-divisibility-2-5-10-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="sky"
                />
                <ActivityPlaceholder
                  title="Oszthatóság (2, 5, 10) kvíz"
                  subtitle="Párosság, oszthatóság, hiányzó jegyek és maradékok 3 szinten"
                  type="Kvíz"
                  emoji="🔟"
                  onClick={() => onActivitySelect('g6-integers-divisibility-2-5-10-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="sky"
                  {...getTopicProgress('g6-integers-divisibility-2-5-10')}
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
                  title="Oszthatóság (3, 9) tananyag"
                  subtitle="Számjegyösszeg szabályai, algebrai levezetés és labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-divisibility-3-9-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Oszthatóság (3, 9) kvíz"
                  subtitle="Számjegyösszegek, 3-as és 9-es maradékok, hiányzó jegyek 3 szinten"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('g6-integers-divisibility-3-9-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g6-integers-divisibility-3-9')}
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
                  title="Oszthatóság (4, 100) tananyag"
                  subtitle="Utolsó 2 jegy szabálya, 100 = 4 · 25 kapcsolat és labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-divisibility-4-100-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Oszthatóság (4, 100) kvíz"
                  subtitle="Utolsó 2 számjegy vizsgálata, maradékok, felezési trükkök 3 szinten"
                  type="Kvíz"
                  emoji="💯"
                  onClick={() => onActivitySelect('g6-integers-divisibility-4-100-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g6-integers-divisibility-4-100')}
                />
              </div>
            </section>
          )}

          {/* Section 11: Összetett oszthatósági szabályok */}
          {(showAll || activeSubSectionId === 'g6-sec-osszetett-oszthatosag') && (
            <section>
              <SectionHeader id="g6-sec-osszetett-oszthatosag" number={11} title="Összetett oszthatósági szabályok" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett oszthatóság tananyag"
                  subtitle="6, 12, 15, 18, 20, 24, 36, 45 szabályai, relatív prím felbontás és labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-composite-divisibility-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Összetett oszthatóság kvíz"
                  subtitle="Relatív prím szabályok, hiányzó jegyek és összetett osztók 3 szinten"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g6-integers-composite-divisibility-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-integers-composite-divisibility')}
                />
              </div>
            </section>
          )}

          {/* Section 12: Többszörös, közös többszörös */}
          {(showAll || activeSubSectionId === 'g6-sec-tobbszoros-kozos') && (
            <section>
              <SectionHeader id="g6-sec-tobbszoros-kozos" number={12} title="Többszörös, közös többszörös (LKKT)" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="LKKT tananyag"
                  subtitle="Többszörösök, LKKT kiszámítása prímfelbontással és labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-lcm-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="LKKT kvíz"
                  subtitle="Legkisebb közös többszörös, kanonikus alak és találkozós feladatok 3 szinten"
                  type="Kvíz"
                  emoji="✨"
                  onClick={() => onActivitySelect('g6-integers-lcm-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-integers-lcm')}
                />
              </div>
            </section>
          )}

          {/* Section 13: Osztó, közös osztó */}
          {(showAll || activeSubSectionId === 'g6-sec-oszto-kozos') && (
            <section>
              <SectionHeader id="g6-sec-oszto-kozos" number={13} title="Osztó, közös osztó (LNKO)" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="LNKO tananyag"
                  subtitle="Osztópárok, LNKO prímtényezőkkel, Euklideszi algoritmus és labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-gcd-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="LNKO kvíz"
                  subtitle="Legnagyobb közös osztó, relatív prímek és szétosztási feladatok 3 szinten"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => onActivitySelect('g6-integers-gcd-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-integers-gcd')}
                />
              </div>
            </section>
          )}

          {/* Section 14: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g6-sec-osszefoglalas" number={14} title="I. Fejezeti Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Fejezeti összefoglaló tananyag"
                  subtitle="Műveletek, kombinatorika, oszthatósági tabló és mesterlabor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-integers-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Fejezeti záró kvíz"
                  subtitle="Átfogó 30 kérdéses szintfelmérő az I. fejezet teljes anyagából 3 szinten"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-integers-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g6-integers-summary')}
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
                  title="Törtek ismétlése tananyag"
                  subtitle="Törtfogalom, bővítés, egyszerűsítés, műveletek és vizuális labor PDF-fel"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-fractions-review-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Törtek ismétlése kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g6-fractions-review-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-fractions-review-quiz')}
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
                  title="Szorzás törttel tananyag"
                  subtitle="Tört szorzása egész számmal és törttel, keresztbe egyszerűsítés, reciprok"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-fraction-multiplication-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Szorzás törttel kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="✖️"
                  onClick={() => onActivitySelect('g6-fraction-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-fraction-multiplication-quiz')}
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
                  title="Osztás törttel tananyag"
                  subtitle="Tört osztása egész számmal és törttel, reciprokkal szorzás, egyszerűsítés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-fraction-division-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás törttel kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="➗"
                  onClick={() => onActivitySelect('g6-fraction-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g6-fraction-division-quiz')}
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
                  title="Tizedestört tananyag"
                  subtitle="Tizedestört helyiértékek, átváltás, kerekítés, összeadás és kivonás"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-decimal-fractions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Tizedestört kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => onActivitySelect('g6-decimal-fractions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-decimal-fractions-quiz')}
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
                  title="Szorzás tizedes törttel tananyag"
                  subtitle="Szorzás 10-zel, 100-zal, tizedes tört szorzása egésszel és törttel, becslés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-decimal-multiplication-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Szorzás tizedes törttel kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g6-decimal-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g6-decimal-multiplication-quiz')}
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
                  title="Osztás tizedes törttel tananyag"
                  subtitle="Osztás 10-zel, 100-zal, tizedes tört osztása egésszel és törttel, bővítés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-decimal-division-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Osztás tizedes törttel kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="➗"
                  onClick={() => onActivitySelect('g6-decimal-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g6-decimal-division-quiz')}
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
                  title="Összetett műveletek tananyag"
                  subtitle="Műveleti sorrend, zárójelfelbontás, előjelszabályok és vegyes törtek"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-complex-operations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Összetett műveletek kvíz"
                  subtitle="30 feladatos átfogó szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g6-complex-operations-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="sky"
                  {...getTopicProgress('g6-complex-operations-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-frac-sec-8') && (
            <section>
              <SectionHeader id="g6-frac-sec-8" number={8} title="II. Fejezeti Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Fejezeti összefoglaló tananyag"
                  subtitle="Törtek és tizedestörtek műveletei, reciprok, osztás és mesterkalkulátor"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-fractions-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Fejezeti záró kvíz"
                  subtitle="Átfogó 90 feladatos szintfelmérő (30-30-30 feladat 3 szinten) a II. fejezet teljes anyagából"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-fractions-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g6-fractions-summary-quiz')}
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
                  title="Síkbeli alakzatok tananyag"
                  subtitle="Pont, egyenes, szakasz, félegyenes, szögtípusok és sokszögek"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-planar-shapes-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Síkbeli alakzatok kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g6-planar-shapes-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g6-planar-shapes-quiz')}
                />
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
              </div>
            </section>
          )}

          {/* Section 2: Egybevágóság */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-2') && (
            <section>
              <SectionHeader id="g6-geom-sec-2" number={2} title="Egybevágóság" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egybevágóság tananyag"
                  subtitle="Egybevágó alakzatok, transzformációk és háromszögek egybevágósága"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-congruence-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Egybevágóság kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="✨"
                  onClick={() => onActivitySelect('g6-congruence-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g6-congruence-quiz')}
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
                  title="A kör tananyag"
                  subtitle="Kör, körvonal, sugár, átmérő, húr, ív, körcikk és körszelet"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-circle-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="A kör kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="⭕"
                  onClick={() => onActivitySelect('g6-circle-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g6-circle-quiz')}
                />
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
                  title="Felezőmerőleges tananyag"
                  subtitle="Szakaszfelező merőleges definíciója, távolságtartás, pontok mértani helye"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-bisector-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Felezőmerőleges kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="✂️"
                  onClick={() => onActivitySelect('g6-bisector-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g6-bisector-quiz')}
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
                  title="Szerkesztések tananyag"
                  subtitle="Körző és vonalzó használata, szakaszmásolás, szögmásolás, merőlegesek és párhuzamosak"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-constructions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szerkesztések kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g6-constructions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-constructions-quiz')}
                />
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
                  title="Tengelyes tükrözés tananyag"
                  subtitle="Definíció, távolságtartás, körüljárási irány és koordinátatükrözés"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-axial-reflection-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Tengelyes tükrözés kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🪞"
                  onClick={() => onActivitySelect('g6-axial-reflection-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g6-axial-reflection-quiz')}
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
                  title="Tükrözés tulajdonságai tananyag"
                  subtitle="Távolságtartás, szögtartás, körüljárási irány, fix elemek és kettős tükrözések"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-reflection-properties-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Tükrözés tulajdonságai kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => onActivitySelect('g6-reflection-properties-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-reflection-properties-quiz')}
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
                  title="Tengelyes szimmetria tananyag"
                  subtitle="Definíció, szimmetriatengelyek száma, betűk, szimbólumok és természet"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-axial-symmetry-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Tengelyes szimmetria kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="🦋"
                  onClick={() => onActivitySelect('g6-axial-symmetry-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g6-axial-symmetry-quiz')}
                />
                <ActivityPlaceholder
                  title="A szimmetria körbevesz"
                  subtitle="Interaktív vizuális bemutató"
                  type="Bemutató"
                  emoji="✨"
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
                  title="Szimmetrikus alakzatok tananyag"
                  subtitle="Háromszögek, deltoid, húrtrapéz, téglalap, rombusz, négyzet és sokszögek"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-symmetric-shapes-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Szimmetrikus alakzatok kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="✨"
                  onClick={() => onActivitySelect('g6-symmetric-shapes-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g6-symmetric-shapes-quiz')}
                />
                <ActivityPlaceholder
                  title="Háromszögek"
                  subtitle="Háromszögek típusai és tengelyes szimmetriája"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => onActivitySelect('triangle-classification', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Négyszögek"
                  subtitle="Négyszögek tulajdonságai és tengelyes szimmetriája"
                  type="Gyakorlás"
                  emoji="🔲"
                  onClick={() => onActivitySelect('quadrilateral-classification', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="purple"
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
                  title="Szerkesztési feladatok tananyag"
                  subtitle="A szerkesztés 4 lépése, alapesetek, háromszög-egyenlőtlenség és diszkusszió"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-construction-tasks-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Szerkesztési feladatok kvíz"
                  subtitle="30 feladatos interaktív szintfelmérő 3 nehézségi szinten"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g6-construction-tasks-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-construction-tasks-quiz')}
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeSubSectionId === 'g6-geom-sec-11') && (
            <section>
              <SectionHeader id="g6-geom-sec-11" number={11} title="Összefoglalás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria összefoglalás tananyag"
                  subtitle="A teljes III. fejezet átfogó elmélete, szemléltető labor és témazáró kisokos"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-geometry-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Geometria összefoglaló kvíz"
                  subtitle="90 feladatos átfogó szintfelmérő (30-30-30 kérdés 3 szinten)"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-geometry-summary-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-geometry-summary-quiz')}
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
                  title="Az arány fogalma tananyag"
                  subtitle="Két mennyiség hányadosa, egyszerűsítés, bővítés és gyakorlat"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-ratio-intro-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Az arány fogalma kvíz"
                  subtitle="Arányok felírása, egyszerűsítése, aránypárok 3 szinten"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g6-ratio-intro-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g6-ratio-intro')}
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
                  title="Arányos osztás tananyag"
                  subtitle="Mennyiségek szétosztása lépésről lépésre, interaktív szimulációval"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-ratio-division-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Arányos osztás kvíz"
                  subtitle="Felosztási feladatok, szögek, keverékek és különbségek 3 szinten"
                  type="Kvíz"
                  emoji="➗"
                  onClick={() => onActivitySelect('g6-ratio-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-ratio-division')}
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
                  title="Egyenes arányosság tananyag"
                  subtitle="Összetartozó mennyiségek, állandó hányados és következtetés 1 egységre"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-direct-prop-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="yellow"
                />
                <ActivityPlaceholder
                  title="Egyenes arányosság kvíz"
                  subtitle="Összetartozó mennyiségek, egységár, következtetés és mindennapi feladatok 3 szinten"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g6-direct-prop-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="yellow"
                  {...getTopicProgress('g6-direct-prop')}
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
                  title="Egyenes arányosság grafikonja tananyag"
                  subtitle="Koordináta-rendszer, origóból induló egyenes, diszkrét pontsor és leolvasás"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-direct-prop-graph-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="lime"
                />
                <ActivityPlaceholder
                  title="Egyenes arányosság grafikonja kvíz"
                  subtitle="Értékpárok leolvasása, pontok illeszkedése, meredekség és szöveges diagramok 3 szinten"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => onActivitySelect('g6-direct-prop-graph-quiz', topicId)}
                  icon={<LineChart className="w-6 h-6" />}
                  color="lime"
                  {...getTopicProgress('g6-direct-prop-graph')}
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
                  title="Szabályok, megfeleltetések tananyag"
                  subtitle="Hozzárendelési szabályok, értéktáblázatok, szabálykeresés és visszafelé számolás"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-rules-relations-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Szabályok, megfeleltetések kvíz"
                  subtitle="Szabályok felismerése, értéktáblázatok kitöltése és nyitott mondatok 3 szinten"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => onActivitySelect('g6-rules-relations-quiz', topicId)}
                  icon={<Repeat className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g6-rules-relations')}
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
                  title="Törtrész és egész tananyag"
                  subtitle="Törtrész kiszámítása, visszaszámolás az egészre és hányadrész meghatározása"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-fraction-part-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Törtrész és egész kvíz"
                  subtitle="Törtrész keresése, visszaszámolás az egészre és mindennapi szöveges feladatok 3 szinten"
                  type="Kvíz"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g6-fraction-part-quiz', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-fraction-part')}
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
                  title="Százalékszámítás tananyag"
                  subtitle="A százalék fogalma, a százalékérték, százalékalap és százalékláb kiszámítása"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-percentage-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Százalékszámítás kvíz"
                  subtitle="Százalékérték, százalékalap visszaszámolása és százalékláb feladványok 3 szinten"
                  type="Kvíz"
                  emoji="💯"
                  onClick={() => onActivitySelect('g6-percentage-quiz', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g6-percentage')}
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
                  title="Százalékszámítás a gyakorlatban tananyag"
                  subtitle="Árleszállítás, drágulás, kedvezmények és keverékek a való életben"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-percent-practice-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Gyakorlati százalékszámítás kvíz"
                  subtitle="Akciók, drágulás, egymást követő változások és szöveges feladatok 3 szinten"
                  type="Kvíz"
                  emoji="🏷️"
                  onClick={() => onActivitySelect('g6-percent-practice-quiz', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g6-percent-practice')}
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
                  title="Nyitott mondatok és egyenletek tananyag"
                  subtitle="A mérlegelv, ismeretlen fogalma és lebontogatás lépésről lépésre"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-open-sentences-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Nyitott mondatok és egyenletek kvíz"
                  subtitle="Mérlegelv, egyenletmegoldás és szöveges átírások 3 szinten"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g6-open-sentences-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                  {...getTopicProgress('g6-open-sentences')}
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
                  title="Szöveges feladatok tananyag"
                  subtitle="Az 5 aranyszabály, modellalkotás és szöveges ellenőrzés lépésről lépésre"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-word-problems-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Szöveges feladatok kvíz"
                  subtitle="Számkeresős, életkoros, geometriai és törtrészes feladatok 3 szinten"
                  type="Kvíz"
                  emoji="📝"
                  onClick={() => onActivitySelect('g6-word-problems-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-word-problems')}
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
                  title="Több megoldás is lehet tananyag"
                  subtitle="Módszeres esetvizsgálat, táblázatkészítés és megoldások száma"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-multiple-solutions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Több megoldás is lehet kvíz"
                  subtitle="Megoldások száma, alaphalmaz és szisztematikus keresés 3 szinten"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-multiple-solutions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-multiple-solutions')}
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
                  title="Témaköri összefoglaló tananyag"
                  subtitle="Arány, százalék, egyenes arányosság és egyenletek áttekintése"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-ratio-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Témazáró összefoglaló kvíz"
                  subtitle="Átfogó felkészülés a IV. fejezet témazárójára 3 szinten"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-ratio-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g6-ratio-summary')}
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
                  title="Hosszúság, tömeg, idő tananyag"
                  subtitle="Mértékegységrendszer, váltószámok, prefixumok és tizedestörtes átváltások"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-length-mass-time-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Hosszúság, tömeg, idő kvíz"
                  subtitle="Mértékegységek átváltása, tizedestörtek és szöveges feladatok 3 szinten"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g6-length-mass-time-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="cyan"
                  {...getTopicProgress('g6-length-mass-time')}
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
                  title="A sokszögek kerülete tananyag"
                  subtitle="A határoló vonalak összhossza, háromszögek, négyszögek és szabályos sokszögek kerülete"
                  type="Tananyag"
                  emoji="📐"
                  onClick={() => onActivitySelect('g6-polygon-perimeter-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="A sokszögek kerülete kvíz"
                  subtitle="Háromszögek, négyszögek és szabályos sokszögek kerülete, hiányzó oldalak 3 szinten"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => onActivitySelect('g6-polygon-perimeter-quiz', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g6-polygon-perimeter')}
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
                  title="A terület és a térfogat mérése tananyag"
                  subtitle="Mértékegységrendszer, 100-as és 1000-es váltószámok, űrtartalom és átváltások"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-area-volume-measurement-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="A terület és a térfogat mérése kvíz"
                  subtitle="Terület- és térfogatmértékek átváltása, űrtartalom és szöveges feladatok 3 szinten"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => onActivitySelect('g6-area-volume-measurement-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-area-volume-measurement')}
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
                  title="A sokszögek területe tananyag"
                  subtitle="Négyzet, téglalap, háromszög, paralelogramma, trapéz és deltoid területe"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-polygon-area-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="A sokszögek területe kvíz"
                  subtitle="Alapképletek, háromszögek, négyszögek és összetett alakzatok területe 3 szinten"
                  type="Kvíz"
                  emoji="🟩"
                  onClick={() => onActivitySelect('g6-polygon-area-quiz', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g6-polygon-area')}
                />
                <ActivityPlaceholder
                  title="Területszámítás Teszt"
                  subtitle="Négyzet, téglalap, háromszögek területe"
                  type="Teszt"
                  emoji="🎯"
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
                  title="Alakzatok a térben tananyag"
                  subtitle="Térbeli testek, csúcsok, élek, lapok, Euler-tétel, testhálók és nézetek"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-spatial-shapes-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Alakzatok a térben kvíz"
                  subtitle="Poliéderek, forgástestek, csúcs-él-lap számítások, hálók és nézetek 3 szinten"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => onActivitySelect('g6-spatial-shapes-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="purple"
                  {...getTopicProgress('g6-spatial-shapes')}
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
                  title="Testek felszíne tananyag"
                  subtitle="Kocka, téglatest és egyenes hasábok felszíne, hálók és interaktív labor"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-surface-area-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Testek felszíne kvíz"
                  subtitle="Kocka, téglatest és hasábok felszínszámítása, él visszaszámolás 3 szinten"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => onActivitySelect('g6-surface-area-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-surface-area')}
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
                  title="Gyakorlati felszín tananyag"
                  subtitle="Szobafestés, fedetlen testek, csempézés, kiadósság és interaktív festőkalkulátor"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-practical-surface-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Gyakorlati felszín kvíz"
                  subtitle="Szobafestés, nyílászárók levonása, medencék, csempézés és vödörszám 3 szinten"
                  type="Kvíz"
                  emoji="🏠"
                  onClick={() => onActivitySelect('g6-practical-surface-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                  {...getTopicProgress('g6-practical-surface')}
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
                  title="Testek térfogata tananyag"
                  subtitle="Kocka, téglatest térfogata, egységkockák, űrtartalom és 3D labor"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-volume-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Testek térfogata kvíz"
                  subtitle="Kocka, téglatest térfogata, űrtartalom, literek és folyadékmennyiségek 3 szinten"
                  type="Kvíz"
                  emoji="🛢️"
                  onClick={() => onActivitySelect('g6-volume-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-volume')}
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
                  title="Fejezeti összefoglaló tananyag"
                  subtitle="Kerület, terület, felszín, térfogat és mértékegységek teljes szintézise, mesterkalkulátor laborral"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-chapter5-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Fejezeti összefoglaló kvíz"
                  subtitle="Átfogó témazáró felkészítő és vizsgateszt 3 szinten (30 kérdés, párosító és csoportosító módokkal)"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-chapter5-summary-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g6-chapter5-summary')}
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
                  title="Játékok tananyag"
                  subtitle="Venn-diagramok, halmazműveletek, osztálytermi szita-formula és barkochba"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-stat-games-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Játékok kvíz"
                  subtitle="Halmazok, szita-formula, barkochba és logikai rejtvények 3 szinten"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => onActivitySelect('g6-stat-games-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="pink"
                  {...getTopicProgress('g6-stat-games')}
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
                  title="Grafikonok és diagramok tananyag"
                  subtitle="Oszlop-, sáv- és vonaldiagramok, skálázás, folyamatok és félrevezető ábrák"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-charts-diagrams-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Grafikonok és diagramok kvíz"
                  subtitle="Diagramok olvasása, számítások, trendek és manipulatív ábrák 3 szinten"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g6-charts-diagrams-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g6-charts-diagrams')}
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
                  title="Kördiagram tananyag"
                  subtitle="Az egész részekre bontása, középponti szögek (1% = 3,6°), szerkesztés és 3D csapdák"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-pie-chart-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Kördiagram kvíz"
                  subtitle="Szögek és százalékok számítása, nevezetes arányok és szerkesztési szabályok 3 szinten"
                  type="Kvíz"
                  emoji="🥧"
                  onClick={() => onActivitySelect('g6-pie-chart-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                  {...getTopicProgress('g6-pie-chart')}
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
                  title="Adatok és átlag tananyag"
                  subtitle="Gyakoriság, relatív gyakoriság, számtani közép mint egyensúly, módusz, medián és terjedelmi szóródás"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-data-mean-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Adatok és átlag kvíz"
                  subtitle="Ábrák és diagramok leolvasása: átlag, medián, módusz, terjedelem és kiugró értékek 3 szinten"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => onActivitySelect('g6-data-mean-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-data-mean')}
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
                  title="Statisztika összefoglaló"
                  subtitle="A teljes VI. témakör átfogó rendszerezése, diagramválasztó mátrix és vizsgaellenőrző lista"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-stat-summary-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="slate"
                />
                <ActivityPlaceholder
                  title="Statisztika záróteszt"
                  subtitle="Átfogó témazáró kvíz: diagramleolvasás, mutatók, kördiagram és manipulált ábrák felismerése"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-stat-summary-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="slate"
                  {...getTopicProgress('g6-stat-summary')}
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-year-end-summary') {
      const showAll = !activeSubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számelmélet és egész számok */}
          {(showAll || activeSubSectionId === 'g6-summary-sec-1') && (
            <section>
              <SectionHeader id="g6-summary-sec-1" number={1} title="Számelmélet és egész számok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számelmélet tananyag"
                  subtitle="Egész számok, műveletek, oszthatóság, prímtényezők, LKKT és LNKO összefoglalása"
                  type="Tananyag"
                  emoji="📜"
                  onClick={() => onActivitySelect('g6-summary-numbers-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Számelmélet kvíz"
                  subtitle="Átfogó gyakorló feladatok: műveletek, előjelek, oszthatósági szabályok és osztópárok"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => onActivitySelect('g6-summary-numbers-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                  {...getTopicProgress('g6-summary-numbers')}
                />
              </div>
            </section>
          )}

          {/* Section 2: Törtek és tizedes törtek */}
          {(showAll || activeSubSectionId === 'g6-summary-sec-2') && (
            <section>
              <SectionHeader id="g6-summary-sec-2" number={2} title="Törtek és tizedes törtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek tananyag"
                  subtitle="Közönséges és tizedes törtek átváltása, alapműveletek, reciprok és műveleti sorrend"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-summary-fractions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Törtek kvíz"
                  subtitle="Összeadás, kivonás, szorzás, osztás törtekkel és tizedestörtekkel 3 szinten"
                  type="Kvíz"
                  emoji="🍕"
                  onClick={() => onActivitySelect('g6-summary-fractions-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                  {...getTopicProgress('g6-summary-fractions')}
                />
              </div>
            </section>
          )}

          {/* Section 3: Arány, százalék, szöveges feladatok */}
          {(showAll || activeSubSectionId === 'g6-summary-sec-3') && (
            <section>
              <SectionHeader id="g6-summary-sec-3" number={3} title="Arány, százalék, szöveges feladatok" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arány és százalék tananyag"
                  subtitle="Arányos osztás, egyenes arányosság, százalékláb, százalékérték és alapszámítás"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-summary-proportions-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Arány és százalék kvíz"
                  subtitle="Gyakorlati életből vett szöveges feladatok és arányos következtetések"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => onActivitySelect('g6-summary-proportions-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="orange"
                  {...getTopicProgress('g6-summary-proportions')}
                />
              </div>
            </section>
          )}

          {/* Section 4: Geometria, szimmetria és mérések */}
          {(showAll || activeSubSectionId === 'g6-summary-sec-4') && (
            <section>
              <SectionHeader id="g6-summary-sec-4" number={4} title="Geometria, szimmetria és mérések" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria és mérések tananyag"
                  subtitle="Tengelyes tükrözés, síkidomok, kerület, terület, testek hálója, felszíne és térfogata"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-summary-geometry-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Geometria és mérések kvíz"
                  subtitle="Alakzatok tulajdonságai, szerkesztések, átváltások és számítási feladatok"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => onActivitySelect('g6-summary-geometry-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                  {...getTopicProgress('g6-summary-geometry')}
                />
              </div>
            </section>
          )}

          {/* Section 5: Átfogó év végi tudáspróba */}
          {(showAll || activeSubSectionId === 'g6-summary-sec-5') && (
            <section>
              <SectionHeader id="g6-summary-sec-5" number={5} title="Átfogó év végi tudáspróba" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Év végi összefoglaló tananyag"
                  subtitle="A teljes 6. osztályos tananyag képlet- és fogalomtára, vizsgatippek és ellenőrző lista"
                  type="Tananyag"
                  emoji="📖"
                  onClick={() => onActivitySelect('g6-summary-final-theory', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Év végi záróteszt"
                  subtitle="Nagy év végi próbateszt: a teljes tanév legfontosabb feladattípusai vegyesen 3 szinten"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => onActivitySelect('g6-summary-final-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                  {...getTopicProgress('g6-summary-final')}
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
