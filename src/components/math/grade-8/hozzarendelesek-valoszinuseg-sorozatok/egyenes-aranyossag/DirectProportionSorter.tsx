import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DirectProportionSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Képletek és Hozzárendelések Típusa',
    subtitle: 'Csoportosítsd a függvényeket növekvő vagy csökkenő egyenes arányosság, illetve nem egyenes arányosság szerint!',
    categories: [
      {
        id: 'cat-pos',
        name: 'Egyenes Arányosság (k > 0)',
        description: 'Balról jobbra emelkedő origón átmenő egyenesek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-neg',
        name: 'Egyenes Arányosság (k < 0)',
        description: 'Balról jobbra lejtő origón átmenő egyenesek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-not',
        name: 'NEM Egyenes Arányosság',
        description: 'Nem megy át az origón (b ≠ 0) vagy nem lineáris',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      {
        id: 's1-1',
        label: 'y = 4x',
        category: 'cat-pos'
      },
      {
        id: 's1-2',
        label: 'y = 0,5x',
        category: 'cat-pos'
      },
      {
        id: 's1-3',
        label: 'y = (3/5)x',
        category: 'cat-pos'
      },
      {
        id: 's1-4',
        label: 'y = 10x',
        category: 'cat-pos'
      },
      {
        id: 's1-5',
        label: 'y = -3x',
        category: 'cat-neg'
      },
      {
        id: 's1-6',
        label: 'y = -0,8x',
        category: 'cat-neg'
      },
      {
        id: 's1-7',
        label: 'y = -7x',
        category: 'cat-neg'
      },
      {
        id: 's1-8',
        label: 'y = -x',
        category: 'cat-neg'
      },
      {
        id: 's1-9',
        label: 'y = 2x + 5',
        category: 'cat-not'
      },
      {
        id: 's1-10',
        label: 'y = 12 - 3x',
        category: 'cat-not'
      },
      {
        id: 's1-11',
        label: 'T = a² (négyzet területe)',
        category: 'cat-not'
      },
      {
        id: 's1-12',
        label: 'y = 16 / x (fordított arányosság)',
        category: 'cat-not'
      }
    ]
  },
  2: {
    title: '2. Szint: Grafikon Pontjai és Síknegyedek',
    subtitle: 'Sorold be a megadott pontokat, meredekségeket és egyeneseket az áthaladási síknegyedek szerint!',
    categories: [
      {
        id: 'cat-quad13',
        name: 'I. és III. Síknegyed',
        description: 'Origón átmenő, balról jobbra emelkedő egyenesek (k > 0)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-quad24',
        name: 'II. és IV. Síknegyed',
        description: 'Origón átmenő, balról jobbra lejtő egyenesek (k < 0)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-not-origin',
        name: 'Eltolt vagy Párhuzamos Egyenes',
        description: 'Nem megy át a (0; 0) origón, nem egyenes arányosság',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 's2-1',
        label: 'P(2; 8) és Q(-2; -8) pontokon átmegy',
        category: 'cat-quad13'
      },
      {
        id: 's2-2',
        label: 'Meredeksége: k = 2,5',
        category: 'cat-quad13'
      },
      {
        id: 's2-3',
        label: 'y = x szögfelező egyenes',
        category: 'cat-quad13'
      },
      {
        id: 's2-4',
        label: 'A(4; 12) pontra és az origóra illeszkedik',
        category: 'cat-quad13'
      },
      {
        id: 's2-5',
        label: 'P(3; -9) és Q(-3; 9) pontokon átmegy',
        category: 'cat-quad24'
      },
      {
        id: 's2-6',
        label: 'Meredeksége: k = -1,5',
        category: 'cat-quad24'
      },
      {
        id: 's2-7',
        label: 'y = -x szögfelező egyenes',
        category: 'cat-quad24'
      },
      {
        id: 's2-8',
        label: 'B(5; -20) pontra és az origóra illeszkedik',
        category: 'cat-quad24'
      },
      {
        id: 's2-9',
        label: 'y = 4 vízszintes egyenes',
        category: 'cat-not-origin'
      },
      {
        id: 's2-10',
        label: 'x = -2 függőleges egyenes',
        category: 'cat-not-origin'
      },
      {
        id: 's2-11',
        label: 'y = 3x - 6 (tengelymetszet: -6)',
        category: 'cat-not-origin'
      },
      {
        id: 's2-12',
        label: 'y = -2x + 8 (tengelymetszet: +8)',
        category: 'cat-not-origin'
      }
    ]
  },
  3: {
    title: '3. Szint: Hétköznapi Kapcsolatok és Arányosságok',
    subtitle: 'Döntsd el, hogy a mindennapi helyzetek közül melyik egyenes arányosság, melyik fordított/négyzetes, és melyik nem arányos!',
    categories: [
      {
        id: 'cat-real-direct',
        name: 'Valódi Egyenes Arányosság',
        description: 'Állandó hányados, origón áthaladás, azonos mértékű változás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-other-prop',
        name: 'Fordított vagy Más Arányosság',
        description: 'Állandó szorzat (k / x) vagy négyzetes (a²)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-non-prop',
        name: 'NEM Arányos Kapcsolat',
        description: 'Alapdíjas szolgáltatások vagy természeti összefüggések',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 's3-1',
        label: 'Sajt vásárlása egységárral (3500 Ft/kg)',
        category: 'cat-real-direct'
      },
      {
        id: 's3-2',
        label: 'Állandó 85 km/h sebességű autó ideje és útja',
        category: 'cat-real-direct'
      },
      {
        id: 's3-3',
        label: 'Négyzet oldala és a kerülete (K = 4a)',
        category: 'cat-real-direct'
      },
      {
        id: 's3-4',
        label: 'Euró váltása fix árfolyamon (y = 400x)',
        category: 'cat-real-direct'
      },
      {
        id: 's3-5',
        label: 'Munkások száma és az árokásás ideje (állandó munka)',
        category: 'cat-other-prop'
      },
      {
        id: 's3-6',
        label: 'Sebesség és menetidő egy fix 120 km-es úton',
        category: 'cat-other-prop'
      },
      {
        id: 's3-7',
        label: 'Négyzet oldalhossza és területe (T = a²)',
        category: 'cat-other-prop'
      },
      {
        id: 's3-8',
        label: 'Kocka éle és a térfogata (V = a³)',
        category: 'cat-other-prop'
      },
      {
        id: 's3-9',
        label: 'Ember életkora és a testmagassága',
        category: 'cat-non-prop'
      },
      {
        id: 's3-10',
        label: 'Taxi viteldíja: 1000 Ft alapdíj + km díj',
        category: 'cat-non-prop'
      },
      {
        id: 's3-11',
        label: 'Telefon előfizetés: 2500 Ft havidíj + percdíj',
        category: 'cat-non-prop'
      },
      {
        id: 's3-12',
        label: 'Mozi belépőjegy ára és a néző életkora',
        category: 'cat-non-prop'
      }
    ]
  }
};

export const DirectProportionSorter: React.FC<DirectProportionSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-direct-sorter',
  topicTitle = 'Egyenes Arányosság Csoportosító'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      config={currentConfig}
      levels={sorterLevels}
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      badge="8. Osztály • V. Hozzárendelések"
      topicBadge="📈 1. Lecke • Egyenes arányosság"
      topicTitle={topicTitle}
      topicId={topicId}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      grade={8}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default DirectProportionSorter;
