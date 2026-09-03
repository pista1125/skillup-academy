import React from 'react';
import { GradeViewProps } from './types';
import { SectionHeader } from '@/components/math/shared/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  ArrowRightLeft,
  Award,
  Binary,
  Blocks,
  BookOpen,
  Boxes,
  Brain,
  Calculator,
  CheckCircle2,
  CircleDot,
  Coins,
  Compass,
  Divide,
  GitFork,
  Hash,
  HelpCircle,
  Layers,
  ListOrdered,
  Lock,
  MoveHorizontal,
  Network,
  Percent,
  PieChart,
  Repeat,
  Scale,
  Share2,
  Shuffle,
  Sparkles,
  Split,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Variable,
  Zap
} from 'lucide-react';

export const Grade9View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  activeSubSectionId,
  onActivitySelect,
  onMaterialSelect,
}) => {
  // Topic I: Kombinatorika, halmazok
  if (topicId === 'g9-kombinatorika-halmazok') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Hányféleképpen lehet? */}
        {(showAll || activeSubSectionId === 'g9-sec-hanyfelekeppen') && (
          <section>
            <SectionHeader id="g9-sec-hanyfelekeppen" number={1} title="Hányféleképpen lehet?" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szisztematikus Felsorolás"
                subtitle="Esetek áttekinthető csoportosítása és fadiagramok"
                type="Hamarosan"
                emoji="🌲"
                disabled={true}
                icon={<Network className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Összeadási és Szorzási Szabály"
                subtitle="Független döntések és egymást kizáró esetek"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Döntési Fák a Gyakorlatban"
                subtitle="Menüválasztás, útvonalak és színezési feladatok"
                type="Hamarosan"
                emoji="🗺️"
                disabled={true}
                icon={<GitFork className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: Gráfok */}
        {(showAll || activeSubSectionId === 'g9-sec-grafok') && (
          <section>
            <SectionHeader id="g9-sec-grafok" number={2} title="Gráfok" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gráfok Alapfogalmai"
                subtitle="Csúcsok, élek, egyszerű és összefüggő gráfok"
                type="Hamarosan"
                emoji="🕸️"
                disabled={true}
                icon={<Network className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Fokszámok és Kézfogási Lemma"
                subtitle="A fokszámok összege az élek számának kétszerese"
                type="Hamarosan"
                emoji="🤝"
                disabled={true}
                icon={<Share2 className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Ismeretségi Hálózatok"
                subtitle="Gráfmodellek körmérkőzésekre és térképekre"
                type="Hamarosan"
                emoji="👥"
                disabled={true}
                icon={<Users className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: Számzárak */}
        {(showAll || activeSubSectionId === 'g9-sec-szamzarak') && (
          <section>
            <SectionHeader id="g9-sec-szamzarak" number={3} title="Számzárak" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kódok és Számzárak"
                subtitle="Ismétléses variációk: k tárcsás számzár lehetőségei"
                type="Hamarosan"
                emoji="🔒"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="PIN Kódok és Jelszavak"
                subtitle="Biztonsági kódok, rendszámok és telefonszámok"
                type="Hamarosan"
                emoji="🔑"
                disabled={true}
                icon={<Hash className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Megkötéses Számalkotás"
                subtitle="Nem ismétlődő számjegyek és oszthatósági feltételek"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 4: Folytatjuk az összeszámlálást */}
        {(showAll || activeSubSectionId === 'g9-sec-osszeszamlalas') && (
          <section>
            <SectionHeader id="g9-sec-osszeszamlalas" number={4} title="Folytatjuk az összeszámlálást" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Permutációk és Faktoriális"
                subtitle="n különböző elem sorbarendezése (n!)"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<Shuffle className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Ültetési Rendek és Sorrendek"
                subtitle="Padban, körasztal körül és dobogón"
                type="Hamarosan"
                emoji="🪑"
                disabled={true}
                icon={<ListOrdered className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Kiválasztás Sorrenddel"
                subtitle="n elemből k kiválasztása visszatevés nélkül"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 5: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g9-sec-gyakorlas-kombi') && (
          <section>
            <SectionHeader id="g9-sec-gyakorlas-kombi" number={5} title="Gyakorlás (Kombinatorika)" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kombinatorika Feladattár"
                subtitle="Összetett típusfeladatok és versenyfeladványok"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Skatulya-elv Kaland"
                subtitle="Dirichlet-elv bizonyításos feladatokban"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Kombinatorikai Próba"
                subtitle="Időre menő kihívás és pontszámítás"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 6: Halmazok */}
        {(showAll || activeSubSectionId === 'g9-sec-halmazok') && (
          <section>
            <SectionHeader id="g9-sec-halmazok" number={6} title="Halmazok" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Halmaz Fogalma és Megadása"
                subtitle="Eleme/nem eleme reláció, megadás tulajdonsággal"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Nevezetes Számhalmazok"
                subtitle="N, Z, Q, Q* és R hierarchiája"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Variable className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Részhalmazok és Hatványhalmaz"
                subtitle="Üres halmaz, valódi részhalmaz és 2^n részhalmaz"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 7: Halmazok uniója, metszete, különbsége */}
        {(showAll || activeSubSectionId === 'g9-sec-halmaz-muveletek') && (
          <section>
            <SectionHeader id="g9-sec-halmaz-muveletek" number={7} title="Halmazok uniója, metszete, különbsége" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Metszet és Unió"
                subtitle="Közös elemek (és) vs. egyesítés (vagy)"
                type="Hamarosan"
                emoji="∩"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Különbség és Komplementer"
                subtitle="A \ B és az alaphalmazra vonatkozó kiegészítő"
                type="Hamarosan"
                emoji="∖"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="De Morgan Azonosságok & Venn-diagram"
                subtitle="Műveleti szabályok és területek satírozása"
                type="Hamarosan"
                emoji="🎨"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 8: A szitaformula */}
        {(showAll || activeSubSectionId === 'g9-sec-szitaformula') && (
          <section>
            <SectionHeader id="g9-sec-szitaformula" number={8} title="A szitaformula" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Két Halmaz Szitaformulája"
                subtitle="|A ∪ B| = |A| + |B| - |A ∩ B| alkalmazása"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Három Halmazos Venn-diagram"
                subtitle="Összetett szöveges felmérések és adatelemzés"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Számelméleti Szita Feladatok"
                subtitle="Oszthatósági kérdések a szitaformulával"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 9: Intervallumok */}
        {(showAll || activeSubSectionId === 'g9-sec-intervallumok') && (
          <section>
            <SectionHeader id="g9-sec-intervallumok" number={9} title="Intervallumok" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Intervallumok Típusai"
                subtitle="Nyílt, zárt és félig nyílt intervallumok a számegyenesen"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Végtelen Intervallumok"
                subtitle="Félegyenesek és valós számok részhalmazai"
                type="Hamarosan"
                emoji="♾️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Műveletek Intervallumokkal"
                subtitle="Metszet, unió és különbség a valós számegyenesen"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 10: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g9-sec-gyakorlas-halmaz') && (
          <section>
            <SectionHeader id="g9-sec-gyakorlas-halmaz" number={10} title="Gyakorlás (Halmazok)" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Halmazműveleti Feladatgyűjtemény"
                subtitle="Véges és végtelen halmazok műveletei"
                type="Hamarosan"
                emoji="📚"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Szöveges Halmazos Fejtörők"
                subtitle="Venn-diagramos feladványok és levezetések"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Intervallumos Egyenlőtlenségek"
                subtitle="Megoldáshalmazok felírása és ábrázolása"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 11: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g9-sec-tudasproba') && (
          <section>
            <SectionHeader id="g9-sec-tudasproba" number={11} title="Gyakorlás, tudáspróba" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="I. Fejezeti Témazáró Próbadolgozat"
                subtitle="Kombinatorika és halmazelmélet átfogó feladatsora"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Érettségi Előkészítő Feladatok"
                subtitle="9. osztályos középszintű érettségi típusfeladatok"
                type="Hamarosan"
                emoji="🎓"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Villám Kvíz és Eredményértékelés"
                subtitle="Teszteld tudásodat a fejezetből!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic II: A számok világa
  if (topicId === 'g9-szamok-vilaga') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Műveletek számhalmazokban */}
        {(showAll || activeSubSectionId === 'g9-sec-muveletek-szamhalmazokban') && (
          <section>
            <SectionHeader id="g9-sec-muveletek-szamhalmazokban" number={1} title="Műveletek számhalmazokban" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számhalmazok Hierarchiája"
                subtitle="N, Z, Q, Q* és R kapcsolata és szimbólumai"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Variable className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Műveleti Zártság"
                subtitle="Melyik számhalmaz melyik alapműveletre zárt?"
                type="Hamarosan"
                emoji="🔒"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Axiómák és Tulajdonságok"
                subtitle="Kommutativitás, asszociativitás és disztributivitás"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: Számolás törtekkel */}
        {(showAll || activeSubSectionId === 'g9-sec-szamolas-tortekkel') && (
          <section>
            <SectionHeader id="g9-sec-szamolas-tortekkel" number={2} title="Számolás törtekkel" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Törtek Alapműveletei"
                subtitle="Közös nevező, szorzás, reciprok és osztás"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Emeletes Törtek"
                subtitle="Többszintes törtkifejezések egyszerűsítése"
                type="Hamarosan"
                emoji="🏢"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Törtes Kifejezések Számolása"
                subtitle="Műveleti sorrend, zárójelek és egyszerűsítés"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: Racionális és irracionális számok */}
        {(showAll || activeSubSectionId === 'g9-sec-racionalis-irracionalis') && (
          <section>
            <SectionHeader id="g9-sec-racionalis-irracionalis" number={3} title="Racionális és irracionális számok" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Végtelen Szakaszos Törtek"
                subtitle="Áttérés szakaszos tizedestörtből közönséges törtbe"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Irracionális Számok és Gyök 2"
                subtitle="Végtelen nem szakaszos számok és indirekt bizonyítás"
                type="Hamarosan"
                emoji="♾️"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Számok Alakja és Pontossága"
                subtitle="Kerekítés, értékes jegyek és abszolút hiba"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Arányosság */}
        {(showAll || activeSubSectionId === 'g9-sec-aranyossag') && (
          <section>
            <SectionHeader id="g9-sec-aranyossag" number={4} title="Arányosság" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenes és Fordított Arányosság"
                subtitle="Hányados vs. szorzat állandósága és arányossági tényező"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Aránypárok és Keresztszorzat"
                subtitle="a:b = c:d összefüggés és ismeretlen tag kiszámítása"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<ArrowRightLeft className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Grafikonos Arányosságok"
                subtitle="Origón átmenő egyenes és hiperbola görbe"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 5: Arányos osztás */}
        {(showAll || activeSubSectionId === 'g9-sec-aranyos-osztas') && (
          <section>
            <SectionHeader id="g9-sec-aranyos-osztas" number={5} title="Arányos osztás" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Arányos Osztás Algoritmusa"
                subtitle="Egy arányrész értéke és mennyiségek szétosztása"
                type="Hamarosan"
                emoji="🍰"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Többtagú Arányok"
                subtitle="a : b : c arányú felosztások és összetett arányok"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Keverési és Geometriai Feladatok"
                subtitle="Háromszög szögei, oldalai és ötvözetek arányai"
                type="Hamarosan"
                emoji="🧪"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 6: Százalékszámítás */}
        {(showAll || activeSubSectionId === 'g9-sec-szazalekszamitas') && (
          <section>
            <SectionHeader id="g9-sec-szazalekszamitas" number={6} title="Százalékszámítás" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Alap, Százalékláb, Százalékérték"
                subtitle="A három alapképlet és gyors szorzótényezős módszer"
                type="Hamarosan"
                emoji="％"
                disabled={true}
                icon={<Percent className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Áremelés, Leárazás és Áfa"
                subtitle="Többlépcsős árváltozások és bruttó-nettó számítás"
                type="Hamarosan"
                emoji="🏷️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Százalék és Százalékpont"
                subtitle="Gyakori statisztikai buktatók és összehasonlítások"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 7: Hatványozás */}
        {(showAll || activeSubSectionId === 'g9-sec-hatvanyozas') && (
          <section>
            <SectionHeader id="g9-sec-hatvanyozas" number={7} title="Hatványozás" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egész Kitevőjű Hatványok"
                subtitle="a^0 = 1 és a^(-n) = 1/a^n értelmezése"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Azonos Alapú Hatványok"
                subtitle="Szorzáskor kitevők összeadása, osztáskor kivonása"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Hatvány Hatványozása és Szorzat Hatványa"
                subtitle="(a^k)^m = a^(k·m) és (a·b)^k = a^k · b^k azonosságok"
                type="Hamarosan"
                emoji="✨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g9-sec-gyakorlas-hatvany') && (
          <section>
            <SectionHeader id="g9-sec-gyakorlas-hatvany" number={8} title="Gyakorlás (Hatványozás)" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kifejezések Egyszerűsítése"
                subtitle="Törtes hatványkifejezések összevonása és átalakítása"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Hatványok Nagyságrendi Rendezése"
                subtitle="Összehasonlítás közös alapra vagy kitevőre hozással"
                type="Hamarosan"
                emoji="📶"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Negatív Kitevők Bajnoksága"
                subtitle="Trükkös előjeles és törtes hatványfeladatok"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 9: A négyzetgyök */}
        {(showAll || activeSubSectionId === 'g9-sec-negyzetgyok') && (
          <section>
            <SectionHeader id="g9-sec-negyzetgyok" number={9} title="A négyzetgyök" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Négyzetgyök Értelmezése és √(x²)"
                subtitle="Nemnegatív számok négyzetgyöke és az abszolút érték"
                type="Hamarosan"
                emoji="√"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Négyzetgyökvonás Azonosságai"
                subtitle="Szorzat és hányados gyöke: √(a·b) és √(a/b)"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Kiemelés és Nevező Gyöktelenítése"
                subtitle="Tényező kiemelése a gyökjel alól és bővítés"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 10: Számok normálalakja */}
        {(showAll || activeSubSectionId === 'g9-sec-szamok-normalalakja') && (
          <section>
            <SectionHeader id="g9-sec-szamok-normalalakja" number={10} title="Számok normálalakja" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Normálalak Definíciója"
                subtitle="a · 10^k alak, ahol 1 ≤ |a| < 10 és k egész szám"
                type="Hamarosan"
                emoji="🔬"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Mikro- és Makrovilág Számai"
                subtitle="Atomok mérete és csillagászati távolságok normálalakban"
                type="Hamarosan"
                emoji="🌌"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Áttérés Normálalakra és Vissza"
                subtitle="Tizedesvessző léptetése és kitevő meghatározása"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 11: Számolás normálalakkal */}
        {(showAll || activeSubSectionId === 'g9-sec-szamolas-normalalakkal') && (
          <section>
            <SectionHeader id="g9-sec-szamolas-normalalakkal" number={11} title="Számolás normálalakkal" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szorzás és Osztás Normálalakban"
                subtitle="Mantisszák műveletei és kitevők összevonása"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Összeadás és Kivonás Normálalakban"
                subtitle="Azonos 10-es hatványkitevőre hozás lépései"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="SI Prefixumok és Átváltások"
                subtitle="Mega, Giga, Tera és Mikro, Nano, Piko mértékegységek"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 12: Kamatos kamat */}
        {(showAll || activeSubSectionId === 'g9-sec-kamatos-kamat') && (
          <section>
            <SectionHeader id="g9-sec-kamatos-kamat" number={12} title="Kamatos kamat" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kamatos Kamat Képlete"
                subtitle="Tn = T0 · (1 + p/100)^n levezetése és felépítése"
                type="Hamarosan"
                emoji="💰"
                disabled={true}
                icon={<Coins className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Megtakarítások és Hitelek"
                subtitle="Többéves betétek gyarapodása és törlesztőrészletek"
                type="Hamarosan"
                emoji="🏦"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Pénzügyi Modellezés és Infláció"
                subtitle="Reálhozam, vásárlóérték és kamatos kamat grafikonja"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 13: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g9-sec-tudasproba-szamok') && (
          <section>
            <SectionHeader id="g9-sec-tudasproba-szamok" number={13} title="Gyakorlás, tudáspróba" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="II. Fejezeti Témazáró Próbadolgozat"
                subtitle="Számelmélet, hatványok, gyökök és kamatfeladatok"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Középszintű Érettségi Típusfeladatok"
                subtitle="9. osztályos számelméleti és pénzügyi érettségi példák"
                type="Hamarosan"
                emoji="🎓"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Fejezeti Záró Nagydíj & Kvíz"
                subtitle="Ellenőrizd a tudásodat a teljes II. fejezetből!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic III: Egyenletek és azonosságok
  if (topicId === 'g9-egyenletek-azonossagok') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: A betűk szerepe a számolásban */}
        {(showAll || activeSubSectionId === 'g9-sec-betuk-szerepe') && (
          <section>
            <SectionHeader id="g9-sec-betuk-szerepe" number={1} title="A betűk szerepe a számolásban" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Változók és Formulák"
                subtitle="Betűk mint változó mennyiségek és képletek felírása"
                type="Hamarosan"
                emoji="🔤"
                disabled={true}
                icon={<Variable className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Helyettesítési Érték"
                subtitle="Számok behelyettesítése és pontos kiszámítása"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Egytagú és Többtagú Kifejezések"
                subtitle="Monomok és polinomok alapszerkezete"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: Számolás az algebrában */}
        {(showAll || activeSubSectionId === 'g9-sec-algebrai-szamolas') && (
          <section>
            <SectionHeader id="g9-sec-algebrai-szamolas" number={2} title="Számolás az algebrában" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egynemű Tagok Összevonása"
                subtitle="Azonos betűrészű tagok előjeles összeadása"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Polinomok Szorzása"
                subtitle="Minden tagot minden taggal: (a+b)(c+d) szabály"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Shuffle className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Zárójelfelbontás és Előjelek"
                subtitle="A mínusz előjel veszélyei és zárójelek kezelése"
                type="Hamarosan"
                emoji="⚠️"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 3: Nevezetes szorzatok */}
        {(showAll || activeSubSectionId === 'g9-sec-nevezetes-szorzatok') && (
          <section>
            <SectionHeader id="g9-sec-nevezetes-szorzatok" number={3} title="Nevezetes szorzatok" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kéttagú Összeg és Különbség Négyzete"
                subtitle="(a ± b)² = a² ± 2ab + b² azonosságok"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Négyzetek Különbsége"
                subtitle="(a + b)(a - b) = a² - b² és szemléltetés"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Villám Algebrai Szorzások"
                subtitle="Azonosságok alkalmazása a numerikus fejszámolásban"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Szorzattá alakítás */}
        {(showAll || activeSubSectionId === 'g9-sec-szorzatta-alakitas') && (
          <section>
            <SectionHeader id="g9-sec-szorzatta-alakitas" number={4} title="Szorzattá alakítás" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Közös Tényező Kiemelése"
                subtitle="Legnagyobb közös osztó kiemelése a zárójel elé"
                type="Hamarosan"
                emoji="📤"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Azonosságok Visszafelé"
                subtitle="a² - b² és teljes négyzetek felismerése"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Csoportosításos Módszer"
                subtitle="Tagok párosítása és többlépcsős kiemelés"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 5: Egyenletek */}
        {(showAll || activeSubSectionId === 'g9-sec-egyenletek-alap') && (
          <section>
            <SectionHeader id="g9-sec-egyenletek-alap" number={5} title="Egyenletek" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenlet, Azonosság, Ellentmondás"
                subtitle="Kifejezések egyenlősége és a gyök fogalma"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="A Gyök és az Ellenőrzés"
                subtitle="Helyettesítés az eredeti egyenlet mindkét oldalába"
                type="Hamarosan"
                emoji="✅"
                disabled={true}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Grafikus Egyenletmegoldás Alapjai"
                subtitle="A két oldal egy-egy függvényként való metszése"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 6: Problémamegoldás egyenletekkel */}
        {(showAll || activeSubSectionId === 'g9-sec-problemamegoldas-egyenletekkel') && (
          <section>
            <SectionHeader id="g9-sec-problemamegoldas-egyenletekkel" number={6} title="Problémamegoldás egyenletekkel" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szövegből Egyenlet"
                subtitle="Ismeretlen megválasztása és matematikai modell"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Életkoros és Számos Feladatok"
                subtitle="Klasszikus szöveges egyenletek levezetése"
                type="Hamarosan"
                emoji="🎂"
                disabled={true}
                icon={<Users className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Szöveges Ellenőrzés és Válasz"
                subtitle="A valóságnak megfelelő gyökök elfogadása"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 7: Alaphalmaz, értelmezési tartomány, megoldáshalmaz */}
        {(showAll || activeSubSectionId === 'g9-sec-alaphalmaz-megoldashalmaz') && (
          <section>
            <SectionHeader id="g9-sec-alaphalmaz-megoldashalmaz" number={7} title="Alaphalmaz, értelmezési tartomány, megoldáshalmaz" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Alaphalmaz és Kikötések"
                subtitle="A = R és a nullával való osztás szigorú kizárása"
                type="Hamarosan"
                emoji="🚫"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Értelmezési Tartomány (É.T.)"
                subtitle="Törtes kifejezések és feltételek felírása"
                type="Hamarosan"
                emoji="🛡️"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Megoldáshalmaz és Hamis Gyökök"
                subtitle="M halmaz felírása, üres halmaz és ekvivalencia"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 8: Egyenletek megoldása */}
        {(showAll || activeSubSectionId === 'g9-sec-egyenletek-megoldasa') && (
          <section>
            <SectionHeader id="g9-sec-egyenletek-megoldasa" number={8} title="Egyenletek megoldása" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Mérlegelv Mesterei"
                subtitle="Ekvivalens átalakítások mindkét oldalon lépésről lépésre"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Zárójeles és Törtes Egyenletek"
                subtitle="Közös nevezővel beszorzás és szisztematikus rendezés"
                type="Hamarosan"
                emoji="➗"
                disabled={true}
                icon={<Divide className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Egyenletmegoldó Bajnokság"
                subtitle="Középiskolai elsőfokú típusfeladatok megoldása"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        )}

        {/* Section 9: Elsőfokú kétismeretlenes egyenletrendszer */}
        {(showAll || activeSubSectionId === 'g9-sec-ketismeretlenes-egyenletrendszer') && (
          <section>
            <SectionHeader id="g9-sec-ketismeretlenes-egyenletrendszer" number={9} title="Elsőfokú kétismeretlenes egyenletrendszer" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Behelyettesítő Módszer"
                subtitle="Az egyik ismeretlen kifejezése és behelyettesítése"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Egyenlő Együtthatók Módszere"
                subtitle="Együtthatók kiegyenlítése és egyenletek összeadása"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Egyenletrendszeres Nagydíj & Szöveges Példák"
                subtitle="Kétismeretlenes szöveges feladványok és záró próba"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic IV: Bevezetés a geometriába
  if (topicId === 'g9-bevezetes-geometriaba') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: A sík geometriája */}
        {(showAll || activeSubSectionId === 'g9-sec-sik-geometria') && (
          <section>
            <SectionHeader id="g9-sec-sik-geometria" number={1} title="A sík geometriája" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Geometriai Alapfogalmak"
                subtitle="Pont, egyenes, félegyenes, szakasz és sík"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Szögek és Szögfajták"
                subtitle="Hegyesszög, derékszög, tompaszög, egyenesszög"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Nevezetes Szögpárok"
                subtitle="Mellékszögek, csúcsszögek, pótszögek és váltószögek"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: Általános és szimmetrikus háromszögek */}
        {(showAll || activeSubSectionId === 'g9-sec-altalanos-szimmetrikus-haromszogek') && (
          <section>
            <SectionHeader id="g9-sec-altalanos-szimmetrikus-haromszogek" number={2} title="Általános és szimmetrikus háromszögek" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Háromszög-egyenlőtlenség & Szögösszeg"
                subtitle="a + b > c és a belső szögek összege 180°"
                type="Hamarosan"
                emoji="🔺"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Külső Szögek Tétele"
                subtitle="Bármely külső szög a nem mellette fekvők összege"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Egyenlő Szárú & Szabályos Háromszögek"
                subtitle="Szimmetriatengelyek, alapon fekvő és 60°-os szögek"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: Pitagorasz tétele */}
        {(showAll || activeSubSectionId === 'g9-sec-pitagorasz') && (
          <section>
            <SectionHeader id="g9-sec-pitagorasz" number={3} title="Pitagorasz tétele" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Pitagorasz-tétel: a² + b² = c²"
                subtitle="Befogók és átfogó kiszámítása derékszögű háromszögben"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Geometriai Bizonyítások"
                subtitle="Négyzetek területe és átdarabolásos szemléltetés"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="A Tétel Megfordítása & Számhármasok"
                subtitle="Derékszögű-e a háromszög? Pitagoraszi számhármasok"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Különleges derékszögű háromszögek */}
        {(showAll || activeSubSectionId === 'g9-sec-kulonleges-derekszogu') && (
          <section>
            <SectionHeader id="g9-sec-kulonleges-derekszogu" number={4} title="Különleges derékszögű háromszögek" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Félszabályos Háromszög (30°-60°-90°)"
                subtitle="Oldalarányok: 1 : √3 : 2 és a szabályos háromszög felezése"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Egyenlő Szárú Derékszögű (45°-45°-90°)"
                subtitle="Oldalarányok: 1 : 1 : √2 és a négyzet átlója"
                type="Hamarosan"
                emoji="🔲"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Villám Számítások Gyökökkel"
                subtitle="Magasságok és oldalak azonnali meghatározása"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 5: Távolságok */}
        {(showAll || activeSubSectionId === 'g9-sec-tavolsagok') && (
          <section>
            <SectionHeader id="g9-sec-tavolsagok" number={5} title="Távolságok" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pont és Egyenes Távolsága"
                subtitle="A legrövidebb merőleges szakasz meghatározása"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Párhuzamos Egyenesek & Síkok Távolsága"
                subtitle="Állandó távolság és középpárhuzamos egyenes"
                type="Hamarosan"
                emoji="═"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Mértani Helyek a Távolságokból"
                subtitle="Kör, szakaszfelező merőleges és szögfelező"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 6: A kör */}
        {(showAll || activeSubSectionId === 'g9-sec-a-kor') && (
          <section>
            <SectionHeader id="g9-sec-a-kor" number={6} title="A kör" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Körvonal, Sugár és Húr"
                subtitle="Kör geometriai elemei és kölcsönös helyzetek"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Érintő és Sugár Merőlegessége"
                subtitle="Az érintési pontba húzott sugár merőleges az érintőre"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Érintőszakaszok Tétele"
                subtitle="Külső pontból húzott érintők egyenlő hossza"
                type="Hamarosan"
                emoji="✂️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 7: A háromszög nevezetes vonalai és pontjai I. */}
        {(showAll || activeSubSectionId === 'g9-sec-nevezetes-vonalak-1') && (
          <section>
            <SectionHeader id="g9-sec-nevezetes-vonalak-1" number={7} title="A háromszög nevezetes vonalai és pontjai I." color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Oldalfelező Merőlegesek"
                subtitle="A háromszög köré írható kör középpontja (O)"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Belső Szögfelezők"
                subtitle="A háromszög beírt körének középpontja (I)"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Szerkesztések és Helyzetek"
                subtitle="Köré írt kör tompaszögű és derékszögű háromszögben"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 8: A háromszög nevezetes vonalai és pontjai II. */}
        {(showAll || activeSubSectionId === 'g9-sec-nevezetes-vonalak-2') && (
          <section>
            <SectionHeader id="g9-sec-nevezetes-vonalak-2" number={8} title="A háromszög nevezetes vonalai és pontjai II." color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Magasságvonalak és Magasságpont (M)"
                subtitle="Merőlegesek a szemközti oldalakra és metszéspontjuk"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Súlyvonalak és Súlypont (S)"
                subtitle="A súlypont 2:1 arányú harmadoló tulajdonsága"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Középvonalak és az Euler-egyenes"
                subtitle="O, S, M pontok egy egyenesre esése és arányai"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 9: Gyakorlás */}
        {(showAll || activeSubSectionId === 'g9-sec-gyakorlas-geom') && (
          <section>
            <SectionHeader id="g9-sec-gyakorlas-geom" number={9} title="Gyakorlás (Háromszögek)" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Háromszögek Feladattára"
                subtitle="Nevezetes pontok, szögek és oldalszámítások"
                type="Hamarosan"
                emoji="📚"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Összetett Pitagorasz-feladványok"
                subtitle="Magasságok, átlók és szimmetrikus idomok"
                type="Hamarosan"
                emoji="🧠"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Geometriai Fejtörők"
                subtitle="Súlyponti arányok és szerkesztési kihívások"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 10: Thalész tétele */}
        {(showAll || activeSubSectionId === 'g9-sec-thalesz') && (
          <section>
            <SectionHeader id="g9-sec-thalesz" number={10} title="Thalész tétele" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Thalész-tétel Kimondása"
                subtitle="Az átmérőhöz tartozó kerületi szög 90°"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="A Tétel Bizonyítása"
                subtitle="Levezetés egyenlő szárú háromszögek szögösszegével"
                type="Hamarosan"
                emoji="📝"
                disabled={true}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="A Thalész-tétel Megfordítása"
                subtitle="Derékszögű háromszög átfogója mint átmérő és R = c/2"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 11: A Thalész-tétel alkalmazásai */}
        {(showAll || activeSubSectionId === 'g9-sec-thalesz-alkalmazas') && (
          <section>
            <SectionHeader id="g9-sec-thalesz-alkalmazas" number={11} title="A Thalész-tétel alkalmazásai" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Érintők Szerkesztése Külső Pontból"
                subtitle="Thalész-kör alkalmazása az érintési pontokhoz"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Derékszögű Háromszög Súlyvonala"
                subtitle="Az átfogóhoz tartozó súlyvonal: sc = c/2 = R"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Látószögkörívek és Mértani Helyek"
                subtitle="Derékszögű látószög meghatározása a síkban"
                type="Hamarosan"
                emoji="👁️"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 12: Háromszögek kerülete és területe */}
        {(showAll || activeSubSectionId === 'g9-sec-haromszog-kerulet-terulet') && (
          <section>
            <SectionHeader id="g9-sec-haromszog-kerulet-terulet" number={12} title="Háromszögek kerülete és területe" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Alap-Magasság & Derékszögű Terület"
                subtitle="T = (a · ma)/2 és T = (a · b)/2 képletek"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Hérón-képlet és Szabályos Háromszög"
                subtitle="T = √(s(s-a)(s-b)(s-c)) és T = (a²√3)/4"
                type="Hamarosan"
                emoji="📜"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Terület a Beírt & Köré Írt Körrel"
                subtitle="T = r · s és T = abc / (4R) összefüggések"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 13: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g9-sec-tudasproba-geom') && (
          <section>
            <SectionHeader id="g9-sec-tudasproba-geom" number={13} title="Gyakorlás, tudáspróba" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="IV. Fejezeti Témazáró Próbadolgozat"
                subtitle="Átfogó geometriai feladatsor és számítások"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Középszintű Érettségi Geometria"
                subtitle="9. osztályos síkgeometriai érettségi típuspéldák"
                type="Hamarosan"
                emoji="🎓"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Geometriai Nagydíj & Kvíz"
                subtitle="Teszteld geometriai tudásodat a teljes IV. fejezetből!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic V: Függvények
  if (topicId === 'g9-fuggvenyek') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Táblázatok */}
        {(showAll || activeSubSectionId === 'g9-sec-tablazatok') && (
          <section>
            <SectionHeader id="g9-sec-tablazatok" number={1} title="Táblázatok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Táblázatos Adatrendezés"
                subtitle="Sorok, oszlopok és kétdimenziós mátrixok olvasása"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Kereszt-táblázatok"
                subtitle="Gyakorisági és összefüggő adatok gyors feldolgozása"
                type="Hamarosan"
                emoji="📋"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Hozzárendelési Táblázatok"
                subtitle="Bemeneti (x) és kimeneti (y) adatok kapcsolata"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Variable className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: Diagramok */}
        {(showAll || activeSubSectionId === 'g9-sec-diagramok') && (
          <section>
            <SectionHeader id="g9-sec-diagramok" number={2} title="Diagramok" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Oszlop- és Sávdiagram"
                subtitle="Mennyiségi és kategória adatok vizuális összehasonlítása"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Kördiagram és Százalékok"
                subtitle="Rész-egész arányok és 360°-os középponti szögek"
                type="Hamarosan"
                emoji="🥧"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Megtévesztő Diagramok Elemzése"
                subtitle="Torzított tengelyek és statisztikai trükkök leleplezése"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: Változások ábrázolása */}
        {(showAll || activeSubSectionId === 'g9-sec-valtozasok-abrazolasa') && (
          <section>
            <SectionHeader id="g9-sec-valtozasok-abrazolasa" number={3} title="Változások ábrázolása" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Koordinátasík és Folyamatok"
                subtitle="Változások grafikus követése az x- és y-tengelyen"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Növekedés és Csökkenés"
                subtitle="Pozitív és negatív változások, meredekség szemlélete"
                type="Hamarosan"
                emoji="↕️"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Szakaszos Folyamatok"
                subtitle="Időbeli diszkrét és folytonos átmenetek ábrázolása"
                type="Hamarosan"
                emoji="⏱️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Grafikonok a mindennapokban */}
        {(showAll || activeSubSectionId === 'g9-sec-grafikonok-mindennapokban') && (
          <section>
            <SectionHeader id="g9-sec-grafikonok-mindennapokban" number={4} title="Grafikonok a mindennapokban" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Út-Idő (s-t) Diagramok"
                subtitle="Egyenletes mozgás és sebesség meredeksége (v = s/t)"
                type="Hamarosan"
                emoji="🚗"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Sebesség-Idő (v-t) Görbék"
                subtitle="Gyorsulás, lassulás és a görbe alatti terület jelentése"
                type="Hamarosan"
                emoji="🏎️"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Meteorológiai és Gazdasági Görbék"
                subtitle="Hőmérséklet, árfolyamok és trendek olvasása"
                type="Hamarosan"
                emoji="🌡️"
                disabled={true}
                icon={<PieChart className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 5: A függvény fogalma */}
        {(showAll || activeSubSectionId === 'g9-sec-fuggveny-fogalma') && (
          <section>
            <SectionHeader id="g9-sec-fuggveny-fogalma" number={5} title="A függvény fogalma" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyértelmű Hozzárendelés"
                subtitle="Minden bemenethez pontosan egy kimenet rendelése"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Értelmezési Tartomány (Df)"
                subtitle="Megengedett x értékek és kikötések halmaza"
                type="Hamarosan"
                emoji="🛡️"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Értékkészlet (Rf) & Képhalmaz"
                subtitle="A függvény által ténylegesen felvett y értékek"
                type="Hamarosan"
                emoji="📦"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 6: Készítsünk grafikont! */}
        {(showAll || activeSubSectionId === 'g9-sec-keszitsunk-grafikont') && (
          <section>
            <SectionHeader id="g9-sec-keszitsunk-grafikont" number={6} title="Készítsünk grafikont!" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Értéktáblázat Készítése"
                subtitle="Pontpárok (x; y) kiszámítása a szabályból"
                type="Hamarosan"
                emoji="📋"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Pontok és Görbék Rajzolása"
                subtitle="Töréspontok, tengelymetszetek és sima görbék"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Grafikon Ellenőrzési Módszerek"
                subtitle="Függőleges vonal teszt és koordinátapontok vizsgálata"
                type="Hamarosan"
                emoji="✅"
                disabled={true}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 7: Az egyenes és fordított arányosság függvénye */}
        {(showAll || activeSubSectionId === 'g9-sec-aranyossagok-fuggvenye') && (
          <section>
            <SectionHeader id="g9-sec-aranyossagok-fuggvenye" number={7} title="Az egyenes és fordított arányosság függvénye" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenes Arányosság: f(x) = k·x"
                subtitle="Origón átmenő egyenes és a k arányossági tényező"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Fordított Arányosság: g(x) = k/x"
                subtitle="Kétágú hiperbola, aszimptoták és a nullával osztás"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Shuffle className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Arányossági Tényező Kiszámítása"
                subtitle="k meghatározása egy adott pont koordinátáiból"
                type="Hamarosan"
                emoji="🧮"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 8: Egyenesek meredeksége */}
        {(showAll || activeSubSectionId === 'g9-sec-egyenesek-meredeksege') && (
          <section>
            <SectionHeader id="g9-sec-egyenesek-meredeksege" number={8} title="Egyenesek meredeksége" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Meredekség Képlete: m = Δy / Δx"
                subtitle="Iránytényező számítása két pont koordinátáiból"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Emelkedő, Süllyedő és Vízszintes"
                subtitle="m > 0, m < 0 és m = 0 geometriai és fizikai jelentése"
                type="Hamarosan"
                emoji="⛰️"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Párhuzamos Egyenesek Feltétele"
                subtitle="Azonos meredekség: m1 = m2 és szögek kapcsolata"
                type="Hamarosan"
                emoji="═"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 9: Lineáris függvények */}
        {(showAll || activeSubSectionId === 'g9-sec-linearis-fuggvenyek') && (
          <section>
            <SectionHeader id="g9-sec-linearis-fuggvenyek" number={9} title="Lineáris függvények" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Általános Alak: f(x) = mx + b"
                subtitle="Meredekség (m) és tengelymetszet (b) szerepe"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<Variable className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Gyors Grafikonrajzolás Lépései"
                subtitle="Tengelymetszet kijelölése és 1 jobbra, m fel/le"
                type="Hamarosan"
                emoji="⚡"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Zérushely Kiszámítása: x0 = -b/m"
                subtitle="Az x-tengely metszéspontjának algebrai levezetése"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 10: Abszolútérték-függvény */}
        {(showAll || activeSubSectionId === 'g9-sec-abszolut-fuggveny') && (
          <section>
            <SectionHeader id="g9-sec-abszolut-fuggveny" number={10} title="Abszolútérték-függvény" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Alapfüggvény: f(x) = |x|"
                subtitle="V-alakú grafikon, csúcspont az origóban és szimmetria"
                type="Hamarosan"
                emoji="✌️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Transzformált Alak: a|x - u| + v"
                subtitle="Csúcspont C(u; v), eltolás tengelyek mentén és tükrözés"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Abszolútérték-függvény Jellemzése"
                subtitle="Df, Rf = [v; +∞[, minimum és zérushelyek"
                type="Hamarosan"
                emoji="📊"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 11: Függvények jellemzése */}
        {(showAll || activeSubSectionId === 'g9-sec-fuggvenyek-jellemzese') && (
          <section>
            <SectionHeader id="g9-sec-fuggvenyek-jellemzese" number={11} title="Függvények jellemzése" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="7 Szempontú Jellemzés"
                subtitle="Df, Rf, zérushely, menet, szélsőérték, paritás, korlátosság"
                type="Hamarosan"
                emoji="📜"
                disabled={true}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Szigorú Monotonitás"
                subtitle="Növekvő és csökkenő szakaszok intervallumos leírása"
                type="Hamarosan"
                emoji="📈"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Paritás és Korlátosság"
                subtitle="Páros (y-tengely), páratlan (origó) és alsó/felső korlát"
                type="Hamarosan"
                emoji="⚖️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>
        )}

        {/* Section 12: Szélsőértékek */}
        {(showAll || activeSubSectionId === 'g9-sec-szelsoertekek') && (
          <section>
            <SectionHeader id="g9-sec-szelsoertekek" number={12} title="Szélsőértékek" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Minimum és Maximum Fogalma"
                subtitle="Globális és lokális csúcs- és völgypontok"
                type="Hamarosan"
                emoji="🏔️"
                disabled={true}
                icon={<TrendingUp className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Hely (x) vs. Érték (y)"
                subtitle="A szélsőérték helyének és nagyságának felírása"
                type="Hamarosan"
                emoji="📍"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Szélsőérték a Transzformációkból"
                subtitle="A csúcspont koordinátáinak leolvasása a képletből"
                type="Hamarosan"
                emoji="🔍"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 13: Másodfokú függvény és a négyzetgyök-függvény */}
        {(showAll || activeSubSectionId === 'g9-sec-masodfoku-negyzetgyok') && (
          <section>
            <SectionHeader id="g9-sec-masodfoku-negyzetgyok" number={13} title="Másodfokú függvény és a négyzetgyök-függvény" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Parabola Transzformációk: a(x-u)² + v"
                subtitle="Másodfokú függvény csúcsponti alakja és nyílása"
                type="Hamarosan"
                emoji="🪃"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Teljes Négyzetté Alakítás"
                subtitle="Általános alakból (ax² + bx + c) csúcsponti formára hozás"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Négyzetgyök-függvény: g(x) = √x"
                subtitle="Félparabola, Dg = [0; +∞[ és g(x) = a√(x-u) + v"
                type="Hamarosan"
                emoji="√"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="purple"
              />
            </div>
          </section>
        )}

        {/* Section 14: Gyakorlati feladatok */}
        {(showAll || activeSubSectionId === 'g9-sec-fuggveny-gyakorlat') && (
          <section>
            <SectionHeader id="g9-sec-fuggveny-gyakorlat" number={14} title="Gyakorlati feladatok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Költség-, Bevétel- és Nyereségmodellek"
                subtitle="Lineáris és másodfokú gazdasági függvények"
                type="Hamarosan"
                emoji="💰"
                disabled={true}
                icon={<Coins className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Hajítások és Fizikai Mozgások"
                subtitle="Ferde hajítás és parabola alakú pályák elemzése"
                type="Hamarosan"
                emoji="🚀"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="sky"
              />
              <ActivityPlaceholder
                title="Optimalizálási Szöveges Feladatok"
                subtitle="Maximális terület és minimális költség meghatározása"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 15: Egyenletek grafikus megoldása */}
        {(showAll || activeSubSectionId === 'g9-sec-egyenletek-grafikus') && (
          <section>
            <SectionHeader id="g9-sec-egyenletek-grafikus" number={15} title="Egyenletek grafikus megoldása" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Két Görbe Metszéspontja"
                subtitle="f(x) = g(x) egyenlet leolvasása közös koordinátasíkban"
                type="Hamarosan"
                emoji="✖️"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Megoldások Számának Elemzése"
                subtitle="0, 1 vagy 2 metszéspont parabola és egyenes esetén"
                type="Hamarosan"
                emoji="🔢"
                disabled={true}
                icon={<Binary className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Algebrai Ellenőrzés és Pontosítás"
                subtitle="A leolvasott gyökök algebrai igazolása"
                type="Hamarosan"
                emoji="✅"
                disabled={true}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 16: Egyenlőtlenségek */}
        {(showAll || activeSubSectionId === 'g9-sec-egyenlotlensegek') && (
          <section>
            <SectionHeader id="g9-sec-egyenlotlensegek" number={16} title="Egyenlőtlenségek" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Melyik Görbe van Felül?"
                subtitle="f(x) > g(x) és f(x) ≤ g(x) vizuális eldöntése"
                type="Hamarosan"
                emoji="↕️"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Intervallumos Megoldáshalmaz"
                subtitle="Megoldáshalmaz pontos felírása intervallumokkal"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Kisebb, Nagyobb, Egyenlő Feladatok"
                subtitle="Összetett grafikus és algebrai egyenlőtlenségek"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 17: Abszolút értékes egyenletek */}
        {(showAll || activeSubSectionId === 'g9-sec-abszolut-egyenletek') && (
          <section>
            <SectionHeader id="g9-sec-abszolut-egyenletek" number={17} title="Abszolút értékes egyenletek" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Geometriai Távolság Értelmezés"
                subtitle="|x - a| = b távolságpontok a számegyenesen"
                type="Hamarosan"
                emoji="📏"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Algebrai Esetszétválasztás"
                subtitle="Pozitív és negatív előjelű ágak szétbontása és vizsgálata"
                type="Hamarosan"
                emoji="🔀"
                disabled={true}
                icon={<Shuffle className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Abszolút Értékes Egyenlőtlenségek"
                subtitle="|x - a| < b és |x - a| ≥ b környezeti intervallumai"
                type="Hamarosan"
                emoji="🛡️"
                disabled={true}
                icon={<Lock className="w-6 h-6" />}
                color="red"
              />
            </div>
          </section>
        )}

        {/* Section 18: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g9-sec-tudasproba-fuggveny') && (
          <section>
            <SectionHeader id="g9-sec-tudasproba-fuggveny" number={18} title="Gyakorlás, tudáspróba" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="V. Fejezeti Témazáró Próbadolgozat"
                subtitle="Átfogó függvénytani feladatsor és grafikonrajzolás"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Középszintű Érettségi Függvénytan"
                subtitle="9. osztályos függvényes és grafikus érettségi típuspéldák"
                type="Hamarosan"
                emoji="🎓"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Függvények Nagydíja & Kvíz"
                subtitle="Teszteld függvénytani tudásodat a teljes V. fejezetből!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Topic VI: Egybevágóság, négyszögek
  if (topicId === 'g9-egybevagosag-negyszogek') {
    const showAll = !activeSubSectionId;

    return (
      <div className="flex flex-col gap-10 py-6">
        {/* Section 1: Forgatás és középpontos tükrözés */}
        {(showAll || activeSubSectionId === 'g9-sec-forgatas-kozeppontos-tukrozes') && (
          <section>
            <SectionHeader id="g9-sec-forgatas-kozeppontos-tukrozes" number={1} title="Forgatás és középpontos tükrözés" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Középpontos Tükrözés: 180°-os Forgatás"
                subtitle="Fixpont (O), párhuzamos képegyenesek és iránymegőrzés"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Elforgatás Adott Pont Körül"
                subtitle="Forgásszög (α), körüljárási irány és ívmásolás"
                type="Hamarosan"
                emoji="💫"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Forgásszimmetrikus Alakzatok"
                subtitle="360°/n szögű forgásszimmetriák sokszögekben"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="sky"
              />
            </div>
          </section>
        )}

        {/* Section 2: Vektorok és az eltolás */}
        {(showAll || activeSubSectionId === 'g9-sec-vektorok-eltolas') && (
          <section>
            <SectionHeader id="g9-sec-vektorok-eltolas" number={2} title="Vektorok és az eltolás" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Vektor Fogalma & Jellemzői"
                subtitle="Hosszúság, állás, irány és a nullvektor"
                type="Hamarosan"
                emoji="➡️"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Vektorok Összeadása & Kivonása"
                subtitle="Háromszög- és paralelogramma-szabály szerkesztéssel"
                type="Hamarosan"
                emoji="➕"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Eltolás mint Egybevágóság"
                subtitle="Síkbeli pontok és alakzatok eltolása adott vektorral"
                type="Hamarosan"
                emoji="🚀"
                disabled={true}
                icon={<Zap className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 3: Tengelyes tükrözés */}
        {(showAll || activeSubSectionId === 'g9-sec-tengelyes-tukrozes') && (
          <section>
            <SectionHeader id="g9-sec-tengelyes-tukrozes" number={3} title="Tengelyes tükrözés" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="A Tengelyes Tükrözés Definíciója"
                subtitle="Felezőmerőleges, távolságtartás és fixegyenesek"
                type="Hamarosan"
                emoji="🪞"
                disabled={true}
                icon={<Split className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Körüljárási Irány Megfordulása"
                subtitle="Tükörképi egybevágóság és közvetett azonosság"
                type="Hamarosan"
                emoji="🔄"
                disabled={true}
                icon={<Repeat className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Szimmetriatengelyek Keresése"
                subtitle="Háromszögek, négyszögek és sokszögek tengelyei"
                type="Hamarosan"
                emoji="🎯"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 4: Szerkesztések */}
        {(showAll || activeSubSectionId === 'g9-sec-szerkesztesek') && (
          <section>
            <SectionHeader id="g9-sec-szerkesztesek" number={4} title="Szerkesztések" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szakaszfelező & Szögfelező"
                subtitle="Alapszerkesztések körzővel és egyélű vonalzóval"
                type="Hamarosan"
                emoji="✏️"
                disabled={true}
                icon={<Compass className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Merőleges és Párhuzamos Állítás"
                subtitle="Egyenesre bocsátott merőleges és váltószögek másolása"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Nevezetes Szögek Szerkesztése"
                subtitle="60°, 30°, 45°, 90° és 75°-os szögek felépítése"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="yellow"
              />
            </div>
          </section>
        )}

        {/* Section 5: Egybevágósági transzformációk a gyakorlatban */}
        {(showAll || activeSubSectionId === 'g9-sec-transzformaciok-gyakorlatban') && (
          <section>
            <SectionHeader id="g9-sec-transzformaciok-gyakorlatban" number={5} title="Egybevágósági transzformációk a gyakorlatban" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szalagornamensek (Frizek)"
                subtitle="A 7 frizcsoport eltolással, tükrözéssel és forgatással"
                type="Hamarosan"
                emoji="🎀"
                disabled={true}
                icon={<Layers className="w-6 h-6" />}
                color="cyan"
              />
              <ActivityPlaceholder
                title="Parkettázások & Síklefedések"
                subtitle="Háromszögek, négyzetek és hatszögek illeszkedése"
                type="Hamarosan"
                emoji="🧱"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Escher-féle Művészi Mozaikok"
                subtitle="Transzformációkkal létrehozott alakzatok és minták"
                type="Hamarosan"
                emoji="🎨"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        )}

        {/* Section 6: Szimmetrikus négyszögek */}
        {(showAll || activeSubSectionId === 'g9-sec-szimmetrikus-negyszogek') && (
          <section>
            <SectionHeader id="g9-sec-szimmetrikus-negyszogek" number={6} title="Szimmetrikus négyszögek" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Négyszögek Osztályozása"
                subtitle="Hierarchia: trapéz, húrtrapéz, deltoid, paralelogramma"
                type="Hamarosan"
                emoji="🔷"
                disabled={true}
                icon={<Boxes className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="Rombusz, Téglalap és Négyzet"
                subtitle="Átlók merőlegessége, felezése és egyenlősége"
                type="Hamarosan"
                emoji="🔲"
                disabled={true}
                icon={<Target className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Húrnégyszögek & Érintőnégyszögek"
                subtitle="Szemközti szögek összege 180° és oldalak összege"
                type="Hamarosan"
                emoji="⭕"
                disabled={true}
                icon={<CircleDot className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        )}

        {/* Section 7: Nevezetes négyszögek területe */}
        {(showAll || activeSubSectionId === 'g9-sec-negyszogek-terulete') && (
          <section>
            <SectionHeader id="g9-sec-negyszogek-terulete" number={7} title="Nevezetes négyszögek területe" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Paralelogramma & Trapéz Területe"
                subtitle="T = a · ma és T = ((a + c)/2) · m képletek"
                type="Hamarosan"
                emoji="📐"
                disabled={true}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Rombusz & Deltoid Területe"
                subtitle="T = (e · f) / 2 a merőleges átlók szorzatából"
                type="Hamarosan"
                emoji="🔷"
                disabled={true}
                icon={<Scale className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Összetett Síkidomok Területe"
                subtitle="Átdarabolás, Pitagorasz-tétel és húrtrapéz magassága"
                type="Hamarosan"
                emoji="🧩"
                disabled={true}
                icon={<Brain className="w-6 h-6" />}
                color="green"
              />
            </div>
          </section>
        )}

        {/* Section 8: Gyakorlás, tudáspróba */}
        {(showAll || activeSubSectionId === 'g9-sec-tudasproba-negyszogek') && (
          <section>
            <SectionHeader id="g9-sec-tudasproba-negyszogek" number={8} title="Gyakorlás, tudáspróba" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="VI. Fejezeti Témazáró Próbadolgozat"
                subtitle="Egybevágóságok, négyszögek és területszámítás"
                type="Hamarosan"
                emoji="🏆"
                disabled={true}
                icon={<Trophy className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="9. Osztályos Év Végi Geometria Érettségi"
                subtitle="Középszintű szerkesztési és sokszöges típusfeladatok"
                type="Hamarosan"
                emoji="🎓"
                disabled={true}
                icon={<Award className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Geometriai és Négyszög Nagydíj"
                subtitle="Teszteld tudásodat a teljes 9. osztályos geometriából!"
                type="Hamarosan"
                emoji="⭐"
                disabled={true}
                icon={<Sparkles className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        )}
      </div>
    );
  }

  // Fallback for other topics: textbook materials
  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">
          9. osztályos tankönyvi tananyagok, feladatgyűjtemények és segédletek.
        </p>
      </div>
      <MaterialGallery
        grade="high-1"
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade9View;
