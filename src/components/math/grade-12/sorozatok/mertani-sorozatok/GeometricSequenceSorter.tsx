import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricSequenceSorterProps {
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

const GEOMETRIC_SEQUENCE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Mértani sorozat?",
    description: "Mértani-e a sorozat, és ha igen, milyen előjelű a kvóciens?",
    categories: [
      { id: "pos", name: "mértani, q > 0", color: "emerald" },
      { id: "neg", name: "mértani, q < 0", color: "purple" },
      { id: "no", name: "nem mértani", color: "rose" }
    ],
    items: [
      { id: "gss101", text: "2; 6; 18; 54", categoryId: "pos" },
      { id: "gss102", text: "80; 40; 20; 10", categoryId: "pos" },
      { id: "gss103", text: "3; 6; 12; 24", categoryId: "pos" },
      { id: "gss104", text: "7; 7; 7; 7", categoryId: "pos" },
      { id: "gss105", text: "1000; 100; 10; 1", categoryId: "pos" },
      { id: "gss106", text: "64; 32; 16; 8", categoryId: "pos" },
      { id: "gss107", text: "−1; −2; −4; −8", categoryId: "pos" },
      { id: "gss108", text: "0,5; 1; 2; 4", categoryId: "pos" },
      { id: "gss109", text: "12 000; 11 760; 11 524,8", categoryId: "pos" },
      { id: "gss110", text: "5; −10; 20; −40", categoryId: "neg" },
      { id: "gss111", text: "1; −1; 1; −1", categoryId: "neg" },
      { id: "gss112", text: "64; −16; 4; −1", categoryId: "neg" },
      { id: "gss113", text: "−3; 6; −12; 24", categoryId: "neg" },
      { id: "gss114", text: "10; −20; 40; −80", categoryId: "neg" },
      { id: "gss115", text: "2; −1; 0,5; −0,25", categoryId: "neg" },
      { id: "gss116", text: "−8; 4; −2; 1", categoryId: "neg" },
      { id: "gss117", text: "100; −10; 1; −0,1", categoryId: "neg" },
      { id: "gss118", text: "1; −3; 9; −27", categoryId: "neg" },
      { id: "gss119", text: "2; 4; 6; 8", categoryId: "no" },
      { id: "gss120", text: "1; 4; 9; 16", categoryId: "no" },
      { id: "gss121", text: "1; 1/2; 1/3; 1/4", categoryId: "no" },
      { id: "gss122", text: "0; 0; 0; 0", categoryId: "no" },
      { id: "gss123", text: "1; 2; 3; 5; 8", categoryId: "no" },
      { id: "gss124", text: "3; 0; 0; 0", categoryId: "no" },
      { id: "gss125", text: "1; 2; 4; 7", categoryId: "no" },
      { id: "gss126", text: "5; 7; 9; 11", categoryId: "no" },
      { id: "gss127", text: "2; 6; 18; 52", categoryId: "no" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Hány mértani sorozat felel meg?",
    description: "A két megadott tag hány mértani sorozatot határoz meg?",
    categories: [
      { id: "one", name: "pontosan egy", color: "blue" },
      { id: "two", name: "kettő (q és −q)", color: "amber" },
      { id: "none", name: "egy sem", color: "rose" }
    ],
    items: [
      { id: "gss201", text: "a₁ = 7, a₄ = 189", categoryId: "one" },
      { id: "gss202", text: "a₁ = 7, a₄ = −0,875", categoryId: "one" },
      { id: "gss203", text: "a₃ = 32, a₆ = 108", categoryId: "one" },
      { id: "gss204", text: "a₁ = 2, a₂ = 6", categoryId: "one" },
      { id: "gss205", text: "a₁ = 1, a₆ = 32", categoryId: "one" },
      { id: "gss206", text: "a₂ = 5, a₅ = −40", categoryId: "one" },
      { id: "gss207", text: "a₁ = 3, a₄ = 24", categoryId: "one" },
      { id: "gss208", text: "a₁ = 500, a₄ = −864", categoryId: "one" },
      { id: "gss209", text: "a₃ = 400, a₄ = −320", categoryId: "one" },
      { id: "gss210", text: "a₁₂ = 10, a₁₄ = 40", categoryId: "two" },
      { id: "gss211", text: "a₂ = 1600, a₄ = 4", categoryId: "two" },
      { id: "gss212", text: "a₂ = 9, a₄ = 81", categoryId: "two" },
      { id: "gss213", text: "a₁ = 1, a₃ = 9", categoryId: "two" },
      { id: "gss214", text: "a₁ = 2, a₅ = 32", categoryId: "two" },
      { id: "gss215", text: "a₃ = 5, a₅ = 20", categoryId: "two" },
      { id: "gss216", text: "a₁ = −1, a₃ = −4", categoryId: "two" },
      { id: "gss217", text: "a₁ = 3, a₇ = 192", categoryId: "two" },
      { id: "gss218", text: "a₂ = 1, a₄ = 0,25", categoryId: "two" },
      { id: "gss219", text: "a₁ = 4, a₃ = −16", categoryId: "none" },
      { id: "gss220", text: "a₁ = −2, a₃ = 8", categoryId: "none" },
      { id: "gss221", text: "a₂ = 5, a₄ = −20", categoryId: "none" },
      { id: "gss222", text: "a₁ = 1, a₅ = −16", categoryId: "none" },
      { id: "gss223", text: "a₃ = −9, a₅ = 1", categoryId: "none" },
      { id: "gss224", text: "a₁ = 0, a₂ = 5", categoryId: "none" },
      { id: "gss225", text: "a₁ = 6, a₃ = 0", categoryId: "none" },
      { id: "gss226", text: "a₂ = −3, a₆ = 48", categoryId: "none" },
      { id: "gss227", text: "a₁ = 7, a₃ = −7", categoryId: "none" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Növő vagy csökkenő?",
    description: "Figyelj az első tag előjelére is!",
    categories: [
      { id: "inc", name: "szigorúan növő", color: "emerald" },
      { id: "dec", name: "szigorúan csökkenő", color: "blue" },
      { id: "nei", name: "egyik sem (váltakozó vagy konstans)", color: "amber" }
    ],
    items: [
      { id: "gss301", text: "a₁ = 1, q = 2", categoryId: "inc" },
      { id: "gss302", text: "a₁ = 3 000 000, q = 1,035", categoryId: "inc" },
      { id: "gss303", text: "a₁ = −8, q = 0,5", categoryId: "inc" },
      { id: "gss304", text: "a₁ = 0,1, q = 10", categoryId: "inc" },
      { id: "gss305", text: "a₁ = −1, q = 1/3", categoryId: "inc" },
      { id: "gss306", text: "a₁ = 5, q = 1,2", categoryId: "inc" },
      { id: "gss307", text: "a₁ = 14, q = 1,5", categoryId: "inc" },
      { id: "gss308", text: "a₁ = −100, q = 0,9", categoryId: "inc" },
      { id: "gss309", text: "a₁ = 2, q = 3", categoryId: "inc" },
      { id: "gss310", text: "a₁ = 8, q = 0,5", categoryId: "dec" },
      { id: "gss311", text: "a₁ = 12 000, q = 0,98", categoryId: "dec" },
      { id: "gss312", text: "a₁ = 21,5, q = 0,85", categoryId: "dec" },
      { id: "gss313", text: "a₁ = −1, q = 2", categoryId: "dec" },
      { id: "gss314", text: "a₁ = 10²³, q = 0,001", categoryId: "dec" },
      { id: "gss315", text: "a₁ = 64, q = 1/2", categoryId: "dec" },
      { id: "gss316", text: "a₁ = −3, q = 1,1", categoryId: "dec" },
      { id: "gss317", text: "a₁ = 8, q = 1/√2", categoryId: "dec" },
      { id: "gss318", text: "a₁ = 1, q = 0,99", categoryId: "dec" },
      { id: "gss319", text: "a₁ = 1, q = −2", categoryId: "nei" },
      { id: "gss320", text: "a₁ = 5, q = −1", categoryId: "nei" },
      { id: "gss321", text: "a₁ = 7, q = 1", categoryId: "nei" },
      { id: "gss322", text: "a₁ = −4, q = −0,5", categoryId: "nei" },
      { id: "gss323", text: "a₁ = 1600, q = −1/20", categoryId: "nei" },
      { id: "gss324", text: "a₁ = 2, q = −3", categoryId: "nei" },
      { id: "gss325", text: "a₁ = −6, q = 1", categoryId: "nei" },
      { id: "gss326", text: "a₁ = 8, q = −0,5", categoryId: "nei" },
      { id: "gss327", text: "a₁ = 1, q = −1", categoryId: "nei" }
    ]
  }
};

export const GeometricSequenceSorter: React.FC<GeometricSequenceSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-mertani-sorter',
  topicTitle = "5. Mértani sorozatok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="mertani-sorozatok"
      title={topicTitle}
      subtitle="Ismerd fel a mértani sorozatokat, a megoldások számát és a monotonitást!"
      levels={GEOMETRIC_SEQUENCE_SORTER_LEVELS}
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

export default GeometricSequenceSorter;
