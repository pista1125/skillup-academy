import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GraphMatcherFigure } from './GraphDiagrams';

interface GraphSorterProps {
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
    title: '1. Szint: Gráftípusok és Struktúrák',
    subtitle: 'Csoportosítsd a leírásokat és tulajdonságokat a megfelelő gráftípusba!',
    categories: [
      { id: 'cat-complete', title: 'Teljes Gráf (Kₙ)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { id: 'cat-tree', title: 'Fa Gráf (Körmentes)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: 'cat-cycle', title: 'Kör Gráf (Cₙ)', badgeColor: 'bg-teal-100 text-teal-800 border-teal-300' }
    ],
    items: [
      {
        id: 's1',
        text: 'Minden csúcs össze van kötve minden másik csúccsal',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-complete'
      },
      {
        id: 's2',
        text: 'Összefüggő és nem tartalmaz semmilyen zárt kört',
        figure: <GraphMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-tree'
      },
      {
        id: 's3',
        text: 'n csúcsú és pontosan n - 1 éle van',
        figure: <GraphMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-tree'
      },
      {
        id: 's4',
        text: 'Minden csúcsának fokszáma pontosan 2',
        figure: <GraphMatcherFigure type="cycle" size={28} />,
        correctCategoryId: 'cat-cycle'
      },
      {
        id: 's5',
        text: 'Éleinek száma n · (n - 1) / 2',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-complete'
      },
      {
        id: 's6',
        text: 'Egy négyszög élei átlók nélkül',
        figure: <GraphMatcherFigure type="cycle" size={28} />,
        correctCategoryId: 'cat-cycle'
      },
      {
        id: 's7',
        text: '6 fős társaság összes lehetséges kézfogása',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-complete'
      },
      {
        id: 's8',
        text: 'Családfa vagy elágazó gyökérhálózat',
        figure: <GraphMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-tree'
      },
      {
        id: 's9',
        text: '5 csúcsú körvonal (C₅: 5 éllel)',
        figure: <GraphMatcherFigure type="cycle" size={28} />,
        correctCategoryId: 'cat-cycle'
      },
      {
        id: 's10',
        text: 'K₄ (4 csúcsú teljes gráf 6 éllel)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-complete'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Létezhet-e ilyen Egyszerű Gráf?',
    subtitle: 'Döntsd el a fokszámok alapján, hogy megrajzolható-e az adott egyszerű gráf!',
    categories: [
      { id: 'cat-exists', title: 'LÉTEZIK a gráf', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-not-exists', title: 'NEM LÉTEZIK (Lehetetlen)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' }
    ],
    items: [
      {
        id: 's11',
        text: 'Fokszámok: 2, 2, 2, 2 (C₄ kör gráf)',
        figure: <GraphMatcherFigure type="simple" size={28} />,
        correctCategoryId: 'cat-exists'
      },
      {
        id: 's12',
        text: 'Fokszámok: 1, 1, 1 (Összeg = 3, ami páratlan)',
        figure: <GraphMatcherFigure type="isolated" size={28} />,
        correctCategoryId: 'cat-not-exists'
      },
      {
        id: 's13',
        text: 'Fokszámok: 3, 3, 2, 2 (Összeg = 10, 2 db páratlan)',
        figure: <GraphMatcherFigure type="simple" size={28} />,
        correctCategoryId: 'cat-exists'
      },
      {
        id: 's14',
        text: '4 csúcsú egyszerű gráf, ahol egy csúcs foka 4',
        figure: <GraphMatcherFigure type="isolated" size={28} />,
        correctCategoryId: 'cat-not-exists'
      },
      {
        id: 's15',
        text: 'Fokszámok: 3, 3, 3, 3 (K₄ teljes gráf)',
        figure: <GraphMatcherFigure type="simple" size={28} />,
        correctCategoryId: 'cat-exists'
      },
      {
        id: 's16',
        text: 'Fokszámok: 3, 1, 1 (Összeg = 5, ami páratlan)',
        figure: <GraphMatcherFigure type="isolated" size={28} />,
        correctCategoryId: 'cat-not-exists'
      },
      {
        id: 's17',
        text: 'Fokszámok: 0, 0, 0, 0 (4 db izolált csúcs, 0 él)',
        figure: <GraphMatcherFigure type="simple" size={28} />,
        correctCategoryId: 'cat-exists'
      },
      {
        id: 's18',
        text: 'Fokszámok: 3, 3, 3, 1, 1 (3 db páratlan csúcs ⟹ lehetetlen)',
        figure: <GraphMatcherFigure type="isolated" size={28} />,
        correctCategoryId: 'cat-not-exists'
      },
      {
        id: 's19',
        text: 'Fokszámok: 1, 2, 2, 1 (4 csúcsú út gráf)',
        figure: <GraphMatcherFigure type="simple" size={28} />,
        correctCategoryId: 'cat-exists'
      },
      {
        id: 's20',
        text: 'Fokszámok: 2, 2, 2, 1 (1 db páratlan fokszám ⟹ lehetetlen)',
        figure: <GraphMatcherFigure type="isolated" size={28} />,
        correctCategoryId: 'cat-not-exists'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Élek Száma (|E|) a Gráfban',
    subtitle: 'Sorold be a gráfokat a pontos élszámuk szerint!',
    categories: [
      { id: 'cat-few', title: '1 – 4 él', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { id: 'cat-mid', title: '5 – 10 él', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'cat-many', title: '10-nél több él', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' }
    ],
    items: [
      {
        id: 's21',
        text: 'K₃ teljes gráf élei (3 él)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-few'
      },
      {
        id: 's22',
        text: 'K₄ teljes gráf élei (6 él)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's23',
        text: 'K₅ teljes gráf élei (10 él)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's24',
        text: 'K₆ teljes gráf élei (15 él)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-many'
      },
      {
        id: 's25',
        text: '5 csúcsú fa gráf élei (5 - 1 = 4 él)',
        figure: <GraphMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-few'
      },
      {
        id: 's26',
        text: '8 csúcsú fa gráf élei (8 - 1 = 7 él)',
        figure: <GraphMatcherFigure type="tree" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's27',
        text: '8 fős társaság kézfogásai (8·7/2 = 28 él)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-many'
      },
      {
        id: 's28',
        text: '4 csúcsú kör gráf (C₄: 4 él)',
        figure: <GraphMatcherFigure type="cycle" size={28} />,
        correctCategoryId: 'cat-few'
      },
      {
        id: 's29',
        text: 'Gráf, melynek fokszámai: 3, 3, 2, 2, 2 (|E| = 6 él)',
        figure: <GraphMatcherFigure type="degree" size={28} />,
        correctCategoryId: 'cat-mid'
      },
      {
        id: 's30',
        text: '10 csapatos bajnokság körmérkőzései (45 meccs)',
        figure: <GraphMatcherFigure type="complete" size={28} />,
        correctCategoryId: 'cat-many'
      }
    ]
  }
};

export const GraphSorter: React.FC<GraphSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-graphs',
  topicTitle = '4. Gráfok'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Gráfelmélet Csoportosító"
      subtitle="Kattints a kártyára, és helyezd a megfelelő gráfelméleti kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
