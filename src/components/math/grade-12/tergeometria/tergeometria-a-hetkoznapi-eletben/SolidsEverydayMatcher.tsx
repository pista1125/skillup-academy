import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsEverydayMatcherProps {
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

const SOLIDS_EVERYDAY_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Tárgy és modell",
    description: "Párosítsd a hétköznapi tárgyat azzal a testtel, amellyel modellezhető!",
    pairs: [
      { id: 'sem1', left: "Farsangi kalap", right: "forgáskúp palástja" },
      { id: 'sem2', left: "Kapu díszgömbje", right: "gömb" },
      { id: 'sem3', left: "Kúpos fogaskerék", right: "csonkakúp" },
      { id: 'sem4', left: "Gúla alakú gyertya", right: "négyzet alapú egyenes gúla" },
      { id: 'sem5', left: "Sajtdarab egy kerek sajtból", right: "hengercikk (körcikk alapú hasáb)" },
      { id: 'sem6', left: "Víztároló", right: "félgömb + henger + kúp" },
      { id: 'sem7', left: "Üvegdísz a csilláron", right: "két közös alapú gúla" },
      { id: 'sem8', left: "Védőgallér a kutyán", right: "csonkakúp palástja" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Mértékegységek és arányok",
    description: "Párosítsd az átváltásokat és a százalékos számításokat!",
    pairs: [
      { id: 'sem9', left: "1 dm³", right: "1 liter" },
      { id: 'sem10', left: "1 m³", right: "1000 liter" },
      { id: 'sem11', left: "0,43 g/cm³", right: "0,43 kg/dm³" },
      { id: 'sem12', left: "3,1 kg/dm³", right: "3,1 g/cm³" },
      { id: 'sem13', left: "187,3 dm²", right: "1,873 m²" },
      { id: 'sem14', left: "6% veszteség mellett a szükséges anyag", right: "hasznos / 0,94" },
      { id: 'sem15', left: "36% ráhagyás mellett a papír", right: "felszín · 1,36" },
      { id: 'sem16', left: "8 m² / liter kiadósság", right: "0,125 mm-es réteg" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a gyakorlati feladatot az eredményével!",
    pairs: [
      { id: 'sem17', left: "2 gömb + 2 kúp fenyőfából (d = 4,2 dm, m = 5,4 dm)", right: "≈ 54,8 kg" },
      { id: 'sem18', left: "Torta: hasáb + két félhenger, 120 cm³-es szeletek", right: "47 ember" },
      { id: 'sem19', left: "Gúla alakú gyertya (5 cm, 8 cm) térfogata", right: "≈ 60 cm³" },
      { id: 'sem20', left: "130 gyertya viaszigénye 6% veszteséggel", right: "≈ 8,3 liter" },
      { id: 'sem21', left: "Farsangi kalap kartonigénye (40 cm, 54 cm)", right: "≈ 1105 cm²" },
      { id: 'sem22', left: "Homokkúp (80 cm, 120°) térfogata", right: "≈ 1,61 m³" },
      { id: 'sem23', left: "Víztároló térfogata", right: "99π ≈ 311 m³" },
      { id: 'sem24', left: "Üvegdísz tömege", right: "≈ 18,8 g" }
    ]
  }
];

const SOLIDS_EVERYDAY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SOLIDS_EVERYDAY_MATCHER_LEVELS_LIST[0],
  2: SOLIDS_EVERYDAY_MATCHER_LEVELS_LIST[1],
  3: SOLIDS_EVERYDAY_MATCHER_LEVELS_LIST[2]
};

export const SolidsEverydayMatcher: React.FC<SolidsEverydayMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-hetkoznapi-matcher',
  topicTitle = "17. Térgeometria a hétköznapi életben – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="tergeometria-a-hetkoznapi-eletben"
      title={topicTitle}
      subtitle="Párosítsd a tárgyakat a modelljükkel, a mértékegységeket és a gyakorlati feladatok eredményeit!"
      levels={SOLIDS_EVERYDAY_MATCHER_LEVELS}
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

export default SolidsEverydayMatcher;
