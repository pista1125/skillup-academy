import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CountingMatcherFigure } from './CountingDiagrams';


const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Módszerek és Elvek Besorolása',
    subtitle: 'Csoportosítsd a feladatokat az alkalmazandó kombinatorikai módszer szerint!',
    categories: [
      { id: 'cat-dirichlet', title: 'Skatulya-elv (Dirichlet)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
      { id: 'cat-multi', title: 'Szorzási szabály / Fa-diagram', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-sieve', title: 'Halmazos Szita-módszer', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    ],
    items: [
      {
        id: 's1',
        text: '13 ember közül 2 azonos hónapban született',
        figure: <CountingMatcherFigure type="pigeonhole" size={28} />,
        correctCategoryId: 'cat-dirichlet'
      },
      {
        id: 's2',
        text: '3 leves, 4 főétel és 2 desszert menüválasztása',
        figure: <CountingMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-multi'
      },
      {
        id: 's3',
        text: 'Osztályban angolul és németül tanulók uniója',
        figure: <CountingMatcherFigure type="venn" size={28} />,
        correctCategoryId: 'cat-sieve'
      },
      {
        id: 's4',
        text: 'Zoknihúzás sötétben biztos egyszínű párhoz',
        figure: <CountingMatcherFigure type="socks" size={28} />,
        correctCategoryId: 'cat-dirichlet'
      },
      {
        id: 's5',
        text: '4-jegyű számok készítése 0, 1, 2, 3 jegyekből',
        figure: <CountingMatcherFigure type="permutation" size={28} />,
        correctCategoryId: 'cat-multi'
      },
      {
        id: 's6',
        text: '1-től 100-ig 3-mal vagy 5-tel osztható számok',
        figure: <CountingMatcherFigure type="venn" size={28} />,
        correctCategoryId: 'cat-sieve'
      },
      {
        id: 's7',
        text: '8 ember közül min. 2 a hét azonos napján született',
        figure: <CountingMatcherFigure type="pigeonhole" size={28} />,
        correctCategoryId: 'cat-dirichlet'
      },
      {
        id: 's8',
        text: '3 pénzérme feldobásának lehetséges sorozatai',
        figure: <CountingMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-multi'
      },
      {
        id: 's9',
        text: '|A ∪ B| = |A| + |B| - |A ∩ B| alkalmazása',
        figure: <CountingMatcherFigure type="venn" size={28} />,
        correctCategoryId: 'cat-sieve'
      },
      {
        id: 's10',
        text: 'PIN kódok száma különböző számjegyekkel',
        figure: <CountingMatcherFigure type="pins" size={28} />,
        correctCategoryId: 'cat-multi'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Események Biztossága és Lehetősége',
    subtitle: 'Kategorizáld az állításokat: biztos garancia, lehetséges, vagy lehetetlen esemény!',
    categories: [
      { id: 'cat-sure', title: 'Biztosan bekövetkezik (100%)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-possible', title: 'Lehetséges, de nem biztos', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-impossible', title: 'Lehetetlen esemény (0%)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' }
    ],
    items: [
      {
        id: 's11',
        text: '13 emberből legalább 2 azonos hónapban született',
        figure: <CountingMatcherFigure type="pigeonhole" size={28} />,
        correctCategoryId: 'cat-sure'
      },
      {
        id: 's12',
        text: '2 kockával dobva az összeg 7 lesz',
        figure: <CountingMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-possible'
      },
      {
        id: 's13',
        text: '2 kockával dobva az összeg 13 lesz',
        figure: <CountingMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-impossible'
      },
      {
        id: 's14',
        text: '10 fekete és 10 fehér zokniból 3-at húzva van 1 pár',
        figure: <CountingMatcherFigure type="socks" size={28} />,
        correctCategoryId: 'cat-sure'
      },
      {
        id: 's15',
        text: '2 zoknit húzva egyszínű párt kapunk',
        figure: <CountingMatcherFigure type="socks" size={28} />,
        correctCategoryId: 'cat-possible'
      },
      {
        id: 's16',
        text: 'Két kocka dobásösszege 1 lesz',
        figure: <CountingMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-impossible'
      },
      {
        id: 's17',
        text: '8 emberből legalább 2 a hét azonos napján született',
        figure: <CountingMatcherFigure type="pigeonhole" size={28} />,
        correctCategoryId: 'cat-sure'
      },
      {
        id: 's18',
        text: '52 lapos kártyából 4 lapot húzva mind a 4 ász',
        figure: <CountingMatcherFigure type="cards" size={28} />,
        correctCategoryId: 'cat-possible'
      },
      {
        id: 's19',
        text: '35 diákot 4 csoportba osztva van min. 9 fős csoport',
        figure: <CountingMatcherFigure type="pigeonhole" size={28} />,
        correctCategoryId: 'cat-sure'
      },
      {
        id: 's20',
        text: '1, 2, 3 jegyekből 4-jegyű szám ismétlés nélkül',
        figure: <CountingMatcherFigure type="permutation" size={28} />,
        correctCategoryId: 'cat-impossible'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kimenetek Nagyságrendje',
    subtitle: 'Sorold be a kombinatorikai problémákat a lehetséges kimenetelek száma szerint!',
    categories: [
      { id: 'cat-low', title: 'Kevés eset (≤ 10)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
      { id: 'cat-mid', title: 'Közepes eset (11 - 50)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-high', title: 'Sok eset (> 50)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' }
    ],
    items: [
      {
        id: 's21',
        text: '1, 2, 3 számjegyekből készíthető 3-jegyű számok',
        figure: <CountingMatcherFigure type="permutation" size={28} />,
        correctCategoryId: 'cat-low'
      },
      {
        id: 's22',
        text: '3 pénzérme feldobásának összes kimenetele',
        figure: <CountingMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-low'
      },
      {
        id: 's23',
        text: 'Két kockadobás összege éppen 7',
        figure: <CountingMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-low'
      },
      {
        id: 's24',
        text: '3 különböző póló és 4 nadrág lehetséges szettjei',
        figure: <CountingMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's25',
        text: '4 ember lehetséges ülésrendjei egy padon',
        figure: <CountingMatcherFigure type="permutation" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's26',
        text: 'Két dobókocka összes lehetséges kimenetele',
        figure: <CountingMatcherFigure type="dice" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's27',
        text: 'Két dobókocka dobásának szorzata páros',
        figure: <CountingMatcherFigure type="complement" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's28',
        text: '8 fős sakkbajnokság körmérkőzéses meccsei',
        figure: <CountingMatcherFigure type="tournament" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's29',
        text: '4-jegyű, csupa különböző jegyű PIN kódok',
        figure: <CountingMatcherFigure type="pins" size={28} />,
        correctCategoryId: 'cat-high'
      },
      {
        id: 's30',
        text: '5 ember összes lehetséges sorrendje egy sorban',
        figure: <CountingMatcherFigure type="permutation" size={28} />,
        correctCategoryId: 'cat-high'
      }
    ]
  }
};

interface CountingSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

export const CountingSorter: React.FC<CountingSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-count-it',
  topicTitle = '1. Számold össze!'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Összeszámlálás Csoportosító"
      subtitle="Válaszd ki a kártyát, majd kattints a megfelelő kategóriára a besoroláshoz!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
