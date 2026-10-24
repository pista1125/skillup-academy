import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CountingContSorterProps {
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
    title: '1. Szint: Alapvető Kombinatorikai Szituációk Modellje',
    subtitle: 'Csoportosítsd a szituációkat: egyenes sor (n!), körasztal ((n-1)!) vagy kézfogás (n(n-1)/2)!',
    categories: [
      {
        id: 'cat-perm',
        name: 'Egyenes Sorbarendezés (n!)',
        description: 'Minden különböző elemet egy számozott egyenes sorba állítunk',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-circle',
        name: 'Körasztal Körül ((n-1)!)',
        description: 'Ciklikus elrendezés, ahol a körbeforgatás nem hoz létre új ülésrendet',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-pairs',
        name: 'Kölcsönös Kapcsolat (n(n-1)/2)',
        description: 'Mindenki mindenkivel egyszer lép kapcsolatba (kézfogás, koccintás, él)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'cs1-1', label: '5 könyv elrendezése a könyvespolcon', category: 'cat-perm' },
      { id: 'cs1-2', label: '6 futó célba érési sorrendje egy versenyen', category: 'cat-perm' },
      { id: 'cs1-3', label: '4 különböző betűs szó (pl. KERT) összes anagrammája', category: 'cat-perm' },
      { id: 'cs1-4', label: 'A hét 7 napjának tetszőleges program-sorrendje', category: 'cat-perm' },
      { id: 'cs1-5', label: '5 fős család leülése egy kerek ebédlőasztalhoz', category: 'cat-circle' },
      { id: 'cs1-6', label: '6 diplomata leülése egy kerek tárgyalóasztalhoz', category: 'cat-circle' },
      { id: 'cs1-7', label: '4 gyerek körjátékot játszik kézen fogva', category: 'cat-circle' },
      { id: 'cs1-8', label: '8 fős tanács leülése kerekasztal köré', category: 'cat-circle' },
      { id: 'cs1-9', label: '6 fős baráti társaságban mindenki kezet fog mindenkivel', category: 'cat-pairs' },
      { id: 'cs1-10', label: '8 csapat körmérkőzéses bajnokságának összes mérkőzése', category: 'cat-pairs' },
      { id: 'cs1-11', label: '10 fős szilveszteri buliban mindenki koccint mindenkivel', category: 'cat-pairs' },
      { id: 'cs1-12', label: '5 csúcsú teljes gráf összes éle', category: 'cat-pairs' }
    ]
  },
  2: {
    title: '2. Szint: A Sorrend Szerepe és Megkötések Csoportosítása',
    subtitle: 'Rendszerezd a feladatokat aszerint, hogy miként számít a sorrend és hány elemet választunk!',
    categories: [
      {
        id: 'cat-order-full',
        name: 'Minden Elem Sorrendje Számít',
        description: 'Minden elem helye számít vagy blokk-képzéses megkötés van',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-order-partial',
        name: 'Részhalmaz Sorrendje Számít',
        description: 'Kiválasztunk k elemet és megkülönböztetett pozíciókba kerülnek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-order-none',
        name: 'A Belső Sorrend NEM Számít',
        description: 'A kiválasztottak egyenrangúak (kézfogások, csoportok, küldöttségek)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'cs2-1', label: '5 diák padban, ha 2 jóbarát egymás mellett ül', category: 'cat-order-full' },
      { id: 'cs2-2', label: '5 diák padban, ha 2 diák NEM ülhet egymás mellett', category: 'cat-order-full' },
      { id: 'cs2-3', label: '3 fiú és 3 lány felváltva ül egy 6 fős padsorban', category: 'cat-order-full' },
      { id: 'cs2-4', label: '7 különböző tantárgy tankönyveinek sorbarendezése polcon', category: 'cat-order-full' },
      { id: 'cs2-5', label: '8 fős futóverseny dobogósai (arany, ezüst, bronz)', category: 'cat-order-partial' },
      { id: 'cs2-6', label: '20 fős osztályból elnök, titkár és pénztáros választása', category: 'cat-order-partial' },
      { id: 'cs2-7', label: '10 dalból a slágerlista első 3 helyezettje', category: 'cat-order-partial' },
      { id: 'cs2-8', label: '6 autóból az 1. és 2. helyen beparkoló sorrendje', category: 'cat-order-partial' },
      { id: 'cs2-9', label: '20 fős osztályból 2 fős egyenrangú küldöttség választása', category: 'cat-order-none' },
      { id: 'cs2-10', label: '12 fős társaság kézfogásai (mindenki kezet fog mindenkivel)', category: 'cat-order-none' },
      { id: 'cs2-11', label: '6 barátból egy 3 fős egyenrangú munkacsoport kijelölése', category: 'cat-order-none' },
      { id: 'cs2-12', label: '8 csúcsú konvex sokszög összes oldala és átlója', category: 'cat-order-none' }
    ]
  },
  3: {
    title: '3. Szint: Eredmények Nagyságrendi Besorolása',
    subtitle: 'Számold ki fejben a feladatok megoldását és csoportosítsd őket értékük szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kicsi Érték (Legfeljebb 24)',
        description: 'Eredmény: legfeljebb 24',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes Érték (25 és 120 között)',
        description: 'Eredmény: 25 és 120 között',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-large',
        name: 'Nagy Érték (121 felett)',
        description: 'Eredmény: 121 felett',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'cs3-1', label: '4 különböző elem összes sorbarendezése egyenesben', category: 'cat-small' },
      { id: 'cs3-2', label: '4 ember leülése egy körasztalhoz', category: 'cat-small' },
      { id: 'cs3-3', label: '6 fős társaság kézfogásai (mindenki mindenkivel)', category: 'cat-small' },
      { id: 'cs3-4', label: '5 fős futóverseny arany- és ezüstérmese', category: 'cat-small' },
      { id: 'cs3-5', label: '5 elem összes sorbarendezése egyenesben', category: 'cat-medium' },
      { id: 'cs3-6', label: '6 ember leülése egy kerekasztal körül', category: 'cat-medium' },
      { id: 'cs3-7', label: '5 ember padban, 2 jóbarát egymás mellett ül', category: 'cat-medium' },
      { id: 'cs3-8', label: '5 fős versenyen az 1–3. helyezettek sorrendje', category: 'cat-medium' },
      { id: 'cs3-9', label: '6 diák összes ülésrendje egy 6 fős padsorban', category: 'cat-large' },
      { id: 'cs3-10', label: '8 fős verseny arany-, ezüst- és bronzérmesei', category: 'cat-large' },
      { id: 'cs3-11', label: '7 különböző könyv tetszőleges sorrendje a polcon', category: 'cat-large' },
      { id: 'cs3-12', label: '10 fős verseny dobogósai (1–3. helyezettek sorrendje)', category: 'cat-large' }
    ]
  }
};

export const CountingContSorter: React.FC<CountingContSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-osszeszamlalas-sorter'}
      topicTitle={topicTitle || '9. Osztály - Permutációk és Sorbarendezések Csoportosító'}
    />
  );
};

export default CountingContSorter;
