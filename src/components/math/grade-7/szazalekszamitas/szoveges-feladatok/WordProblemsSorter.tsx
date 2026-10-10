import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Keresett Mennyiség Típusa a Szövegben',
    subtitle: 'Döntsd el a szöveges problémákról, hogy az Alapot (100%), a Részmennyiséget vagy a Százaléklábat keressük!',
    categories: [
      {
        id: 'cat-base',
        name: 'Kiinduló egész / Alap (A)',
        description: 'A teljes egész a kérdés (A = Érték : q)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-value',
        name: 'Részmennyiség / Érték (É)',
        description: 'A megadott százalékhoz tartozó tényleges mennyiség a kérdés (É = A · p/100)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-rate',
        name: 'Százalékláb (p%)',
        description: 'Az arány vagy növekedés százaléka a kérdés (p% = É / A · 100%)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '2,4M Ft előleg a lakás 15%-a, mennyi a lakás teljes ára?', category: 'cat-base' },
      { id: 's1-2', label: '120 km biciklizés az út 5%-a, milyen hosszú a teljes utazás?', category: 'cat-base' },
      { id: 's1-3', label: '35 db zöldséges pizza a rendelések 14%-a, hány pizza készült összesen?', category: 'cat-base' },
      { id: 's1-4', label: '5400 gyerek a megkérdezettek 45%-a, hány gyereket kérdeztek meg?', category: 'cat-base' },
      { id: 's1-5', label: '16M Ft-os lakásra felvett 30%-os bankhitel összege Ft-ban', category: 'cat-value' },
      { id: 's1-6', label: '60 000 Ft kölcsönre 15% kamat felszámolása forintban', category: 'cat-value' },
      { id: 's1-7', label: '450 000 Ft támogatás negyedrésze labdákra Ft-ban', category: 'cat-value' },
      { id: 's1-8', label: '1000 gyerekből a fogat nem mosók száma (5%)', category: 'cat-value' },
      { id: 's1-9', label: '640 000 Ft illeték a 16M Ft lakásnak hány százaléka?', category: 'cat-rate' },
      { id: 's1-10', label: 'Büntetődobás: 40 pontból 26 pont hány százalékos dobóteljesítmény?', category: 'cat-rate' },
      { id: 's1-11', label: '55% jégkrém eladása után hány %-kal kell növelni a megmaradt 45%-ot?', category: 'cat-rate' },
      { id: 's1-12', label: 'A magyar évi chipsfogyasztás hány százaléka az amerikainak?', category: 'cat-rate' }
    ]
  },
  2: {
    title: '2. Szint: Valós Életbeli Témakör és Kontextus',
    subtitle: 'Sorold be a szöveges feladatokat a mindennapi alkalmazási területük szerint!',
    categories: [
      {
        id: 'cat-finance',
        name: 'Pénzügy, lakásvásárlás és hitel',
        description: 'Vételár, foglaló, banki kölcsönök, kamatok és törlesztőrészletek',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-nutrition',
        name: 'Gasztronómia és táplálkozás',
        description: 'Pizzák megoszlása, gyümölcssaláta receptek és chipsfogyasztási adatok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-work-geo',
        name: 'Munkavégzés és geometriai méretezés',
        description: 'Takarítás időtartama közös munkával és síkidomok oldalváltozásai',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Lakásvásárlási szerződés 15% előlege és 30% bankhitele', category: 'cat-finance' },
      { id: 's2-2', label: 'Laptop részletfizetése 15% kamattal és havi törlesztővel', category: 'cat-finance' },
      { id: 's2-3', label: 'Tablet bevezető ára 150% árréssel és későbbi 30% akcióval', category: 'cat-finance' },
      { id: 's2-4', label: 'Toldi-tanya iskola 450 000 Ft-os sportszerpályázata', category: 'cat-finance' },
      { id: 's2-5', label: 'Margarita pizzéria sajtos, sonkás, hawaii és zöldséges pizzái', category: 'cat-nutrition' },
      { id: 's2-6', label: 'Gyümölcssaláta alma, narancs, banán és meggy összetevői', category: 'cat-nutrition' },
      { id: 's2-7', label: 'Amerikai 8 kg és magyar fejenkénti chipsfogyasztás', category: 'cat-nutrition' },
      { id: 's2-8', label: 'Nyári hőségben eladott jégkrémek visszatöltése', category: 'cat-nutrition' },
      { id: 's2-9', label: 'Eszter és Kristóf közös takarítása 50%-os hatékonysággal', category: 'cat-work-geo' },
      { id: 's2-10', label: 'Téglalap oldalainak növelése (+20%) és csökkentése (-30%)', category: 'cat-work-geo' },
      { id: 's2-11', label: '24 cm-es négyzetből azonos területű téglalap készítése', category: 'cat-work-geo' },
      { id: 's2-12', label: 'Heti 168 órából a tanulással és készüléssel töltött idő aránya', category: 'cat-work-geo' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai Megoldási Összefüggés',
    subtitle: 'Azonosítsd a feladat megoldásához szükséges matematikai törvényszerűséget!',
    categories: [
      {
        id: 'cat-direct-ratio',
        name: 'Közvetlen arányosság és részképzés',
        description: 'Összeg szorzása százaléklábbal, egyenes arányú felosztás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-inverse-ratio',
        name: 'Fordított arányosság (idő / hatékonyság)',
        description: 'Több ember kevesebb idő alatt végez, szorzat konstans',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-base-shift',
        name: 'Alapváltás és maradékképzés',
        description: 'A viszonyítási alap a csökkentett értékre tolódik el',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Gyümölcssaláta alapanyagainak többszörözése nagyobb létszámra', category: 'cat-direct-ratio' },
      { id: 's3-2', label: 'Pizzák darabszámából származó bevétel számítása', category: 'cat-direct-ratio' },
      { id: 's3-3', label: 'Kosárlabda büntetődobások százalékos értékelése', category: 'cat-direct-ratio' },
      { id: 's3-4', label: 'Vagyonszerzési illeték kiszámítása a lakás vételárából', category: 'cat-direct-ratio' },
      { id: 's3-5', label: 'Takarítási idő lerövidülése a testvér besegítésekor (6 óra ➔ 4 óra)', category: 'cat-inverse-ratio' },
      { id: 's3-6', label: 'Munkaerő létszámának növelése miatti rövidebb teljesítési idő', category: 'cat-inverse-ratio' },
      { id: 's3-7', label: 'Téglalap egyik oldalának csökkentésekor a másik oldal nyújtása azonos területnél', category: 'cat-inverse-ratio' },
      { id: 's3-8', label: 'Adott fix keretből drágább egységár mellett kevesebb áru vásárolható', category: 'cat-inverse-ratio' },
      { id: 's3-9', label: '55% eladott jégkrém után a 45% megmaradtra számított visszatöltés', category: 'cat-base-shift' },
      { id: 's3-10', label: 'Matek átlag 14%-kal jobb a földrajznál, a földrajz a 100%', category: 'cat-base-shift' },
      { id: 's3-11', label: 'Tablet áremelése 150%-kal majd a megemelt ár csökkentése 30%-kal', category: 'cat-base-shift' },
      { id: 's3-12', label: 'Pályázati összegből költés után a maradék harmadának kiszámítása', category: 'cat-base-shift' }
    ]
  }
};

export const WordProblemsSorter: React.FC<WordProblemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-word-sorter',
  topicTitle = 'Szöveges feladatok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="teal"
      title="Szöveges feladatok - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default WordProblemsSorter;
