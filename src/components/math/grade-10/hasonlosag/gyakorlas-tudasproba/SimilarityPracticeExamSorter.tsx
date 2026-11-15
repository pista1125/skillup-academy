import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimilarityPracticeExamSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const PRACTICE_EXAM_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Transzformációk és arányszámok',
    description: 'Csoportosítsd a geometriai hozzárendeléseket és arányszámokat nagyságuk szerint!',
    categories: [
      { id: 'congruence', name: 'Egybevágóság (|λ| = 1)', color: 'emerald' },
      { id: 'magnification', name: 'Valódi nagyítás (|λ| > 1)', color: 'purple' },
      { id: 'reduction', name: 'Valódi kicsinyítés (|λ| < 1)', color: 'blue' }
    ],
    items: [
      { id: 'pes1', text: 'Tengelyes tükrözés és eltolás (távolságtartó)', categoryId: 'congruence' },
      { id: 'pes2', text: 'Középpontos tükrözés (λ = -1)', categoryId: 'congruence' },
      { id: 'pes3', text: 'Forgatás adott szög körül (|λ| = 1)', categoryId: 'congruence' },
      { id: 'pes4', text: 'Középpontos hasonlóság λ = 2,5 aránnyal', categoryId: 'magnification' },
      { id: 'pes5', text: 'Mikroszkóp nagyítása M = 100 : 1', categoryId: 'magnification' },
      { id: 'pes6', text: 'Negatív középpontos nagyítás λ = -3 aránnyal', categoryId: 'magnification' },
      { id: 'pes7', text: 'Földrajzi térkép méretaránya M = 1 : 25 000', categoryId: 'reduction' },
      { id: 'pes8', text: 'Gúla metszete a magasság felső harmadánál (λ = 1/3)', categoryId: 'reduction' },
      { id: 'pes9', text: 'Negatív középpontos kicsinyítés λ = -0,6 aránnyal', categoryId: 'reduction' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Síkidompárok hasonlósági feltételei',
    description: 'Döntsd el a síkidompárokról, hogy mikor és milyen feltétellel hasonlóak egymáshoz!',
    categories: [
      { id: 'always_sim', name: 'Mindig hasonlóak', color: 'emerald' },
      { id: 'cond_sim', name: 'Egy szög egyezésekor hasonlóak', color: 'amber' },
      { id: 'not_always', name: 'Szögeik egyezése sem garancia', color: 'rose' }
    ],
    items: [
      { id: 'pes10', text: 'Bármely két szabályos háromszög (szögeik 60°)', categoryId: 'always_sim' },
      { id: 'pes11', text: 'Bármely két négyzet és bármely két kör', categoryId: 'always_sim' },
      { id: 'pes12', text: 'Bármely két szabályos nyolcszög', categoryId: 'always_sim' },
      { id: 'pes13', text: 'Két derékszögű háromszög (ha 1 hegyesszögük megegyezik)', categoryId: 'cond_sim' },
      { id: 'pes14', text: 'Két egyenlő szárú háromszög (ha a szárszögük egyenlő)', categoryId: 'cond_sim' },
      { id: 'pes15', text: 'Két rombusz (ha egy belső szögük nagysága egyenlő)', categoryId: 'cond_sim' },
      { id: 'pes16', text: 'Két téglalap (minden szögük 90°, de oldalirányuk eltérhet)', categoryId: 'not_always' },
      { id: 'pes17', text: 'Két húrtrapéz (szögeik egyezése mellett az alapok aránya független)', categoryId: 'not_always' },
      { id: 'pes18', text: 'Két általános paralelogramma', categoryId: 'not_always' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Geometriai mennyiségek skálázódása (λ, λ², λ³)',
    description: 'Csoportosítsd a geometriai méreteket aszerint, hogy λ-szoros hasonlóság esetén hogyan változnak!',
    categories: [
      { id: 'linear_scale', name: 'Lineáris arány: λ', color: 'blue' },
      { id: 'area_scale', name: 'Négyzetes arány: λ²', color: 'purple' },
      { id: 'volume_scale', name: 'Köbös arány: λ³', color: 'rose' }
    ],
    items: [
      { id: 'pes19', text: 'Háromszög kerülete (K\' = λ · K)', categoryId: 'linear_scale' },
      { id: 'pes20', text: 'Háromszög magassága és középvonala (m\' = λ · m)', categoryId: 'linear_scale' },
      { id: 'pes21', text: 'Kör sugara és kerülete (r\' = λ · r)', categoryId: 'linear_scale' },
      { id: 'pes22', text: 'Síkidom területe (T\' = λ² · T)', categoryId: 'area_scale' },
      { id: 'pes23', text: 'Gúla fedőlapjának és alaplapjának aránya (A₂ / A₁ = λ²)', categoryId: 'area_scale' },
      { id: 'pes24', text: 'Pyraminx tetraéder teljes felszíne (A\' = λ² · A)', categoryId: 'area_scale' },
      { id: 'pes25', text: 'Gúla és csonkagúla kiegészítő gúlájának térfogata (V\' = λ³ · V)', categoryId: 'volume_scale' },
      { id: 'pes26', text: 'Gömb és henger térfogata λ-szoros nagyításnál', categoryId: 'volume_scale' },
      { id: 'pes27', text: 'Tömör test tömege azonos sűrűségű anyag esetén', categoryId: 'volume_scale' }
    ]
  }
];

export const SimilarityPracticeExamSorter: React.FC<SimilarityPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Hasonlóság – Fejezeti Összefoglaló Sorter',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Csoportosítsd a transzformációkat, hasonlósági feltételeket és skálázási törvényeket 3 szinten!"
      levels={PRACTICE_EXAM_SORTER_LEVELS}
      badgeText="TUDÁSPRÓBA CSOPORTOSÍTÓ"
      accentColor="violet"
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

