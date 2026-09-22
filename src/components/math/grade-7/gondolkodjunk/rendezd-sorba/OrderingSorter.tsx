import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { OrderingMatcherFigure } from './OrderingDiagrams';

interface OrderingSorterProps {
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
    title: '1. Szint: Sorbarendezési Típusok',
    subtitle: 'Csoportosítsd a feladatokat az elrendezés jellege és típusa szerint!',
    categories: [
      { id: 'cat-factorial', title: 'Tiszta Sorbarendezés (n!)', badgeColor: 'bg-violet-100 text-violet-800 border-violet-300' },
      { id: 'cat-constraint', title: 'Megkötéses / Helyiértékes', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-circle', title: 'Körasztalos Elrendezés ((n-1)!)', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' }
    ],
    items: [
      {
        id: 's1',
        text: '4 különböző könyv elrendezése a könyvespolcon',
        figure: <OrderingMatcherFigure type="books" size={28} />,
        correctCategoryId: 'cat-factorial'
      },
      {
        id: 's2',
        text: '4 ember leül egy kerek asztal (körasztal) köré',
        figure: <OrderingMatcherFigure type="circle" size={28} />,
        correctCategoryId: 'cat-circle'
      },
      {
        id: 's3',
        text: '0, 3, 5, 8 jegyekből 4-jegyű számok készítése',
        figure: <OrderingMatcherFigure type="digits" size={28} />,
        correctCategoryId: 'cat-constraint'
      },
      {
        id: 's4',
        text: 'A "MATEK" szó betűinek tetszőleges átrendezése',
        figure: <OrderingMatcherFigure type="anagram" size={28} />,
        correctCategoryId: 'cat-factorial'
      },
      {
        id: 's5',
        text: '3 barát sorba állása a mozipénztárnál',
        figure: <OrderingMatcherFigure type="queue" size={28} />,
        correctCategoryId: 'cat-factorial'
      },
      {
        id: 's6',
        text: '5 ember körasztal köré ül le vacsorázni',
        figure: <OrderingMatcherFigure type="circle" size={28} />,
        correctCategoryId: 'cat-circle'
      },
      {
        id: 's7',
        text: '3-jegyű PÁROS számok 1, 2, 3, 4, 5 jegyekből',
        figure: <OrderingMatcherFigure type="digits" size={28} />,
        correctCategoryId: 'cat-constraint'
      },
      {
        id: 's8',
        text: '5 különböző színű golyó sorrendje a dobozban',
        figure: <OrderingMatcherFigure type="slots" size={28} />,
        correctCategoryId: 'cat-factorial'
      },
      {
        id: 's9',
        text: '3 ember ül le egy kerek kerti asztal köré',
        figure: <OrderingMatcherFigure type="circle" size={28} />,
        correctCategoryId: 'cat-circle'
      },
      {
        id: 's10',
        text: '"MATEK" anagrammák, amelyek "M" betűvel kezdődnek',
        figure: <OrderingMatcherFigure type="anagram" size={28} />,
        correctCategoryId: 'cat-constraint'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Esetek Száma és Nagyságrendje',
    subtitle: 'Sorold be a feladatokat a lehetséges sorrendek száma alapján!',
    categories: [
      { id: 'cat-small', title: '1 – 10 eset', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-medium', title: '11 – 50 eset', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-large', title: '50-nél több eset', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' }
    ],
    items: [
      {
        id: 's11',
        text: '3 diák sorrendje egy padban',
        figure: <OrderingMatcherFigure type="queue" size={28} />,
        correctCategoryId: 'cat-small'
      },
      {
        id: 's12',
        text: '4 könyv sorrendje a könyvespolcon',
        figure: <OrderingMatcherFigure type="books" size={28} />,
        correctCategoryId: 'cat-medium'
      },
      {
        id: 's13',
        text: '5 különböző könyv sorrendje a polcon',
        figure: <OrderingMatcherFigure type="books" size={28} />,
        correctCategoryId: 'cat-large'
      },
      {
        id: 's14',
        text: 'A "FA" szó betűinek összes sorrendje',
        figure: <OrderingMatcherFigure type="anagram" size={28} />,
        correctCategoryId: 'cat-small'
      },
      {
        id: 's15',
        text: '0, 3, 5, 8 jegyekből 4-jegyű számok',
        figure: <OrderingMatcherFigure type="digits" size={28} />,
        correctCategoryId: 'cat-medium'
      },
      {
        id: 's16',
        text: '4-jegyű számok 1, 2, 3, 4 jegyekből ismétléssel',
        figure: <OrderingMatcherFigure type="slots" size={28} />,
        correctCategoryId: 'cat-large'
      },
      {
        id: 's17',
        text: '4 ember körasztal körüli ülésrendje',
        figure: <OrderingMatcherFigure type="circle" size={28} />,
        correctCategoryId: 'cat-small'
      },
      {
        id: 's18',
        text: '5 ember körasztal körüli ülésrendje',
        figure: <OrderingMatcherFigure type="circle" size={28} />,
        correctCategoryId: 'cat-medium'
      },
      {
        id: 's19',
        text: '6 színből 4 sávos lobogó összeállítása',
        figure: <OrderingMatcherFigure type="slots" size={28} />,
        correctCategoryId: 'cat-large'
      },
      {
        id: 's20',
        text: '4 emberből Anna és Béla egymás mellett ül',
        figure: <OrderingMatcherFigure type="blocks" size={28} />,
        correctCategoryId: 'cat-medium'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Alkalmazott Megoldási Módszer',
    subtitle: 'Milyen speciális kombinatorikai módszerrel oldható meg leggyorsabban a feladat?',
    categories: [
      { id: 'cat-block', title: 'Blokk-módszer (Együtt maradók)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
      { id: 'cat-comp', title: 'Komplementer (Összes - Tiltott)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'cat-pos', title: 'Pozíciós Szorzási Szabály', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' }
    ],
    items: [
      {
        id: 's21',
        text: 'Anna és Béla MINDIG egymás mellett ülnek a padon',
        figure: <OrderingMatcherFigure type="blocks" size={28} />,
        correctCategoryId: 'cat-block'
      },
      {
        id: 's22',
        text: 'Anna és Béla NEM ülhetnek egymás mellett a padon',
        figure: <OrderingMatcherFigure type="blocks" size={28} />,
        correctCategoryId: 'cat-comp'
      },
      {
        id: 's23',
        text: '4-jegyű számok képzése a 0 számjegy kizárásával az élen',
        figure: <OrderingMatcherFigure type="digits" size={28} />,
        correctCategoryId: 'cat-pos'
      },
      {
        id: 's24',
        text: '3 matek és 2 fizikakönyv tantárgyankénti csoportosítása',
        figure: <OrderingMatcherFigure type="books" size={28} />,
        correctCategoryId: 'cat-block'
      },
      {
        id: 's25',
        text: 'A legnagyobb könyv NEM kerülhet a könyvespolc szélére',
        figure: <OrderingMatcherFigure type="books" size={28} />,
        correctCategoryId: 'cat-comp'
      },
      {
        id: 's26',
        text: '3 fiú és 3 lány felváltva történő leültetése',
        figure: <OrderingMatcherFigure type="queue" size={28} />,
        correctCategoryId: 'cat-pos'
      },
      {
        id: 's27',
        text: '5 emberből 2 kijelölt személy a pad két szélére kerül',
        figure: <OrderingMatcherFigure type="queue" size={28} />,
        correctCategoryId: 'cat-pos'
      },
      {
        id: 's28',
        text: 'Körasztal körül két jóbarát egymás mellé ültetése',
        figure: <OrderingMatcherFigure type="circle" size={28} />,
        correctCategoryId: 'cat-block'
      },
      {
        id: 's29',
        text: 'Páros végződésű többjegyű számok előállítása',
        figure: <OrderingMatcherFigure type="digits" size={28} />,
        correctCategoryId: 'cat-pos'
      },
      {
        id: 's30',
        text: '4 emberből legalább az egyik szélre lány kerül',
        figure: <OrderingMatcherFigure type="queue" size={28} />,
        correctCategoryId: 'cat-comp'
      }
    ]
  }
};

export const OrderingSorter: React.FC<OrderingSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-order-it',
  topicTitle = '2. Rendezd sorba!'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Sorbarendezés Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a feladatokat a megfelelő kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
