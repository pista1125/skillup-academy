import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PossibilitiesMatcherFigure } from './PossibilitiesDiagrams';

interface PossibilitiesSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alkalmazandó Szabály Típusa',
    subtitle: 'Sorold be a feladatokat az alkalmazandó alapvető összefüggés szerint!',
    categories: [
      { id: 'cat-addition', title: 'Összeadási Szabály (VAGY)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-multiplication', title: 'Szorzási Szabály (ÉS)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-tree', title: 'Vegyes / Döntési Fa', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    ],
    items: [
      {
        id: 's1',
        text: '3 póló és 4 nadrág lehetséges párosításai',
        figure: <PossibilitiesMatcherFigure type="outfit" size={28} />,
        correctCategoryId: 'cat-multiplication'
      },
      {
        id: 's2',
        text: 'Utazás: 3 vonatjárat vagy 4 buszjárat közötti választás',
        figure: <PossibilitiesMatcherFigure type="addition" size={28} />,
        correctCategoryId: 'cat-addition'
      },
      {
        id: 's3',
        text: '2 leves, 3 főétel és 2 desszertből álló ebédmenü',
        figure: <PossibilitiesMatcherFigure type="outfit" size={28} />,
        correctCategoryId: 'cat-multiplication'
      },
      {
        id: 's4',
        text: 'Egy dobozból 1 piros vagy 1 kék golyó kihúzása',
        figure: <PossibilitiesMatcherFigure type="addition" size={28} />,
        correctCategoryId: 'cat-addition'
      },
      {
        id: 's5',
        text: '3 egymást követő pénzérmedobás kimenetelei',
        figure: <PossibilitiesMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-multiplication'
      },
      {
        id: 's6',
        text: 'A-ból B-be 3 út, B-ből C-be 2 út: útvonalak A-ból C-be',
        figure: <PossibilitiesMatcherFigure type="roads" size={28} />,
        correctCategoryId: 'cat-multiplication'
      },
      {
        id: 's7',
        text: 'Döntés: B-n át utazunk (2·3 út) VAGY D-n át (4 út)',
        figure: <PossibilitiesMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-tree'
      },
      {
        id: 's8',
        text: 'Választás: 5 almás süti vagy 3 túrós süti közül egy',
        figure: <PossibilitiesMatcherFigure type="addition" size={28} />,
        correctCategoryId: 'cat-addition'
      },
      {
        id: 's9',
        text: '1 dobókocka és 1 pénzérme együttes feldobása',
        figure: <PossibilitiesMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-multiplication'
      },
      {
        id: 's10',
        text: 'Kieséses torna meccsei, ahol a vesztes kiesik',
        figure: <PossibilitiesMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-tree'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Esetek Száma és Nagyságrendje',
    subtitle: 'Sorold be a feladványokat a lehetséges kimenetelek száma alapján!',
    categories: [
      { id: 'cat-small', title: '1 – 15 eset', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-medium', title: '16 – 100 eset', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-large', title: '100-nál több eset', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' }
    ],
    items: [
      {
        id: 's11',
        text: '2 pénzérme feldobása (2 · 2 = 4)',
        figure: <PossibilitiesMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-small'
      },
      {
        id: 's12',
        text: 'Két dobókocka együttes feldobása (6 · 6 = 36)',
        figure: <PossibilitiesMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-medium'
      },
      {
        id: 's13',
        text: '4-jegyű bankkártya PIN kód (10⁴ = 10 000)',
        figure: <PossibilitiesMatcherFigure type="pin" size={28} />,
        correctCategoryId: 'cat-large'
      },
      {
        id: 's14',
        text: '3 póló és 4 nadrág szettjei (3 · 4 = 12)',
        figure: <PossibilitiesMatcherFigure type="outfit" size={28} />,
        correctCategoryId: 'cat-small'
      },
      {
        id: 's15',
        text: '3-jegyű számok 1..5 jegyekből ismétléssel (5³ = 125)',
        figure: <PossibilitiesMatcherFigure type="pin" size={28} />,
        correctCategoryId: 'cat-large'
      },
      {
        id: 's16',
        text: '3-jegyű számok 1..5 jegyekből különböző jegyekkel (5·4·3 = 60)',
        figure: <PossibilitiesMatcherFigure type="replacement" size={28} />,
        correctCategoryId: 'cat-medium'
      },
      {
        id: 's17',
        text: '3 pénzérme feldobása (2³ = 8)',
        figure: <PossibilitiesMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-small'
      },
      {
        id: 's18',
        text: '8 futó dobogós helyezései (8 · 7 · 6 = 336)',
        figure: <PossibilitiesMatcherFigure type="replacement" size={28} />,
        correctCategoryId: 'cat-large'
      },
      {
        id: 's19',
        text: '3-jegyű kód az A, B, C betűkből (3³ = 27)',
        figure: <PossibilitiesMatcherFigure type="pin" size={28} />,
        correctCategoryId: 'cat-medium'
      },
      {
        id: 's20',
        text: 'A-ból B-be 3 út, B-ből C-be 4 út (3 · 4 = 12)',
        figure: <PossibilitiesMatcherFigure type="roads" size={28} />,
        correctCategoryId: 'cat-small'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kiválasztási Típus és Megoldási Módszer',
    subtitle: 'Milyen matematikai megközelítéssel vagy módszerrel oldható meg a feladat?',
    categories: [
      { id: 'cat-rep', title: 'Visszatevéses (Ismétléses)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
      { id: 'cat-norep', title: 'Visszatevés nélküli (Különböző)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-comp-sieve', title: 'Komplementer / Szita-módszer', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' }
    ],
    items: [
      {
        id: 's21',
        text: 'Bankkártya PIN kód képzése tetszőleges jegyekkel',
        figure: <PossibilitiesMatcherFigure type="pin" size={28} />,
        correctCategoryId: 'cat-rep'
      },
      {
        id: 's22',
        text: 'Futóverseny 1., 2. és 3. helyezettjeinek kiosztása',
        figure: <PossibilitiesMatcherFigure type="norep" size={28} />,
        correctCategoryId: 'cat-norep'
      },
      {
        id: 's23',
        text: '3 érmedobásnál legalább egy fej dobásának esetei',
        figure: <PossibilitiesMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-comp-sieve'
      },
      {
        id: 's24',
        text: '3-jegyű számok készítése, ha a számjegyek ismétlődhetnek',
        figure: <PossibilitiesMatcherFigure type="pin" size={28} />,
        correctCategoryId: 'cat-rep'
      },
      {
        id: 's25',
        text: '3-jegyű számok képzése csupa különböző számjegyből',
        figure: <PossibilitiesMatcherFigure type="norep" size={28} />,
        correctCategoryId: 'cat-norep'
      },
      {
        id: 's26',
        text: 'Matek vagy fizika szakkörösök száma közös tagokkal',
        figure: <PossibilitiesMatcherFigure type="sieve" size={28} />,
        correctCategoryId: 'cat-comp-sieve'
      },
      {
        id: 's27',
        text: 'Tombolahúzás az 1., 2. és 3. díjra egy kalapból',
        figure: <PossibilitiesMatcherFigure type="norep" size={28} />,
        correctCategoryId: 'cat-norep'
      },
      {
        id: 's28',
        text: '4 betűs jelszó az angol ábécé betűiből ismétléssel',
        figure: <PossibilitiesMatcherFigure type="pin" size={28} />,
        correctCategoryId: 'cat-rep'
      },
      {
        id: 's29',
        text: 'Számok 1-től 50-ig: 2-vel vagy 5-tel oszthatók száma',
        figure: <PossibilitiesMatcherFigure type="sieve" size={28} />,
        correctCategoryId: 'cat-comp-sieve'
      },
      {
        id: 's30',
        text: 'Két kockadobásból legalább az egyik páros',
        figure: <PossibilitiesMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-comp-sieve'
      }
    ]
  }
};

export const PossibilitiesSorter: React.FC<PossibilitiesSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-how-many-cases',
  topicTitle = '3. Hány eset van?'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Esetszámolás Csoportosító"
      subtitle="Kattints a feladványra, majd válaszd ki a megfelelő kategóriát a besoroláshoz!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
