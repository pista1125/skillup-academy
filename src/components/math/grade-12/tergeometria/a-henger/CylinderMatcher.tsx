import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CylinderMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const CYLINDER_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A henger részei',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'cym1', left: 'alaplap és fedőlap', right: 'két egybevágó, párhuzamos körlap' },
      { id: 'cym2', left: 'palást', right: 'a hengert határoló görbe felület' },
      { id: 'cym3', left: 'alkotó', right: 'az alaplapra merőleges, palástra illeszkedő szakasz' },
      { id: 'cym4', left: 'tengely', right: 'a két körlap középpontját összekötő egyenes' },
      { id: 'cym5', left: 'tengelymetszet', right: '2r × m-es téglalap' },
      { id: 'cym6', left: 'kiterített palást', right: '2rπ × m-es téglalap' },
      { id: 'cym7', left: 'egyenlő oldalú henger', right: 'tengelymetszete négyzet (m = 2r)' },
      { id: 'cym8', left: 'forgáshenger', right: 'téglalap megforgatásával keletkező henger' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számolj!',
    description: 'Párosítsd az adatokat az eredménnyel!',
    pairs: [
      { id: 'cym9', left: 'r = 4 cm, m = 10 cm: tengelymetszet területe', right: '80 cm²' },
      { id: 'cym10', left: 'négyzet tengelymetszet, r = 5 cm: magasság', right: '10 cm' },
      { id: 'cym11', left: 'r = 3 cm: alapkör kerülete', right: '6π ≈ 18,85 cm' },
      { id: 'cym12', left: '12 cm oldalú négyzet tengelymetszet: alapkör területe', right: '36π ≈ 113,1 cm²' },
      { id: 'cym13', left: 'kerület 21 cm: sugár', right: '≈ 3,34 cm' },
      { id: 'cym14', left: 'm = 12 cm, tengelymetszet átlója 13 cm: sugár', right: '2,5 cm' },
      { id: 'cym15', left: 'r = 2 cm, m = 5 cm: palást / alapkör', right: '5' },
      { id: 'cym16', left: 'r = 8 cm, m = 32 cm: tengelymetszet átlója', right: '≈ 35,78 cm' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Feladatok',
    description: 'Párosítsd a feladatot az eredménnyel!',
    pairs: [
      { id: 'cym17', left: 'A4-es lap, hosszabb oldalak ragasztva: tengelymetszet', right: '≈ 197,2 cm²' },
      { id: 'cym18', left: 'lámpaernyő foglalatának átmérője', right: '6 cm' },
      { id: 'cym19', left: '32 cm-es négyzet fólia: a cső átmérője', right: '≈ 10,19 cm' },
      { id: 'cym20', left: 'torta egy cikkének kakaós teteje', right: '8π ≈ 25,13 cm²' },
      { id: 'cym21', left: 'torta egy cikkének mázas oldala', right: '20π ≈ 62,83 cm²' },
      { id: 'cym22', left: '2,6 × 4,5 cm-es téglalap a rövidebb oldal körül: alapkör', right: '≈ 63,62 cm²' },
      { id: 'cym23', left: 'tengelymetszet = alapkör területe, r = 4 cm: magasság', right: '2π ≈ 6,28 cm' },
      { id: 'cym24', left: '40 cm-es pálca, r = 8 cm: legkisebb magasság', right: '≈ 36,66 cm' }
    ]
  }
};

export const CylinderMatcher: React.FC<CylinderMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-henger-matcher',
  topicTitle = '4. A henger – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-henger"
      title={topicTitle}
      subtitle="Gyakorold a henger részeit, a tengelymetszetet és a forgatással kapott hengereket!"
      levels={CYLINDER_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default CylinderMatcher;
