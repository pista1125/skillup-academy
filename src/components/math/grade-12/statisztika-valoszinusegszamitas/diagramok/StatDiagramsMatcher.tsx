import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatDiagramsMatcherProps {
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

const STAT_DIAGRAMS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A dobozdiagram fogalmai',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'sdim1', left: 'Q₀', right: 'minimum: a figyelembe vett legkisebb adat' },
      { id: 'sdim2', left: 'Q₁', right: 'alsó kvartilis: az alsó fél mediánja' },
      { id: 'sdim3', left: 'Q₂', right: 'medián: a rendezett adatsor közepe' },
      { id: 'sdim4', left: 'Q₃', right: 'felső kvartilis: a felső fél mediánja' },
      { id: 'sdim5', left: 'Q₄', right: 'maximum: a figyelembe vett legnagyobb adat' },
      { id: 'sdim6', left: 'terjedelem', right: 'a maximum és a minimum különbsége' },
      { id: 'sdim7', left: 'félterjedelem', right: 'a felső és az alsó kvartilis különbsége' },
      { id: 'sdim8', left: 'kiugró adat', right: 'a kvartilistől több mint 1,5 félterjedelemnyire eltérő adat' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számold ki!',
    description: 'Adatsor: 3; 5; 7; 8; 10; 12; 15. Párosítsd a jellemzőt az értékével!',
    pairs: [
      { id: 'sdim9', left: 'minimum', right: '3' },
      { id: 'sdim10', left: 'alsó kvartilis', right: '5' },
      { id: 'sdim11', left: 'medián', right: '8' },
      { id: 'sdim12', left: 'felső kvartilis', right: '12' },
      { id: 'sdim13', left: 'maximum', right: '15' },
      { id: 'sdim14', left: 'félterjedelem', right: '7' },
      { id: 'sdim15', left: 'átlag', right: '≈ 8,57' },
      { id: 'sdim16', left: 'felső határ (kiugró felett)', right: '22,5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tankönyvi adatok',
    description: 'Párosítsd a kérdést a válasszal!',
    pairs: [
      { id: 'sdim17', left: 'Tamás legjobb ideje', right: '50,59 s' },
      { id: 'sdim18', left: 'Tamás idejeinek mediánja', right: '50,7 s' },
      { id: 'sdim19', left: 'Milák elődöntő: kiugró idő', right: '1:52,39' },
      { id: 'sdim20', left: 'Milák döntő: alsó határ', right: '110,685 s' },
      { id: 'sdim21', left: 'Beamon-döntő: felső határ', right: '8,5625 m' },
      { id: 'sdim22', left: 'góllövőlista: kiugró adat', right: '31 gól' },
      { id: 'sdim23', left: 'mosópor: növekedés jan. → jún.', right: '≈ 0,8%' },
      { id: 'sdim24', left: 'februári átlagos állományi létszám', right: '38 fő' }
    ]
  }
};

export const StatDiagramsMatcher: React.FC<StatDiagramsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-diagramok-matcher',
  topicTitle = '3. Diagramok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="diagramok"
      title={topicTitle}
      subtitle="Gyakorold a dobozdiagram fogalmait, a kvartiliseket és a kiugró adatokat!"
      levels={STAT_DIAGRAMS_MATCHER_LEVELS}
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

export default StatDiagramsMatcher;
