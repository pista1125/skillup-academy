import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RightTriangleSolvingMatcherProps {
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

const RIGHT_TRIANGLE_SOLVING_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szögfüggvények és alapfogalmak',
    description: 'Párosítsd a szögfüggvényeket és fogalmakat a jelentésükkel!',
    pairs: [
      { id: 'rtsm1', left: 'sin α', right: 'szöggel szemközti befogó : átfogó' },
      { id: 'rtsm2', left: 'cos α', right: 'szög melletti befogó : átfogó' },
      { id: 'rtsm3', left: 'tg α', right: 'szöggel szemközti befogó : szög melletti befogó' },
      { id: 'rtsm4', left: 'ctg α', right: 'szög melletti befogó : szöggel szemközti befogó' },
      { id: 'rtsm5', left: 'sin²α + cos²α', right: '1' },
      { id: 'rtsm6', left: 'A másik hegyesszög (β)', right: '90° − α' },
      { id: 'rtsm7', left: 'Az első lépés a tankönyv tanácsa szerint', right: 'Keress derékszögű háromszöget!' },
      { id: 'rtsm8', left: 'A derékszögű háromszög leghosszabb oldala', right: 'az átfogó' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik képlet kell?',
    description: 'Párosítsd a keresett mennyiséget (a: α-val szemközti, b: α melletti befogó, c: átfogó) a kiszámítás módjával!',
    pairs: [
      { id: 'rtsm9', left: 'a, ha c és α ismert', right: 'a = c · sin α' },
      { id: 'rtsm10', left: 'b, ha c és α ismert', right: 'b = c · cos α' },
      { id: 'rtsm11', left: 'a, ha b és α ismert', right: 'a = b · tg α' },
      { id: 'rtsm12', left: 'c, ha b és α ismert', right: 'c = b : cos α' },
      { id: 'rtsm13', left: 'c, ha a és α ismert', right: 'c = a : sin α' },
      { id: 'rtsm14', left: 'b, ha a és α ismert', right: 'b = a : tg α' },
      { id: 'rtsm15', left: 'α, ha a és c ismert', right: 'sin α = a / c' },
      { id: 'rtsm16', left: 'α, ha b és c ismert', right: 'cos α = b / c' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok eredményei',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'rtsm17', left: 'Egyenlő szárú △: alap 12 cm, szárhoz tartozó magasság 10,8 cm ⇒ alapon fekvő szög', right: '≈ 64,2°' },
      { id: 'rtsm18', left: 'Ugyanennek a háromszögnek a szárszöge', right: '51,6°' },
      { id: 'rtsm19', left: 'Ugyanennek a háromszögnek a szára', right: '≈ 13,8 cm' },
      { id: 'rtsm20', left: 'Új út: m = 30 · sin 37°', right: '≈ 18,1 km' },
      { id: 'rtsm21', left: 'Az új AD út hossza (24 + 25 + 8,6)', right: '≈ 57,6 km' },
      { id: 'rtsm22', left: 'Daru legnagyobb vízszintes hatótávolsága (12 · cos 10°)', right: '≈ 11,8 m' },
      { id: 'rtsm23', left: 'A Szabadság-szobor látószöge 70 m-ről', right: '≈ 19,2°' },
      { id: 'rtsm24', left: 'Antenna: 230 m-es út 21,3°-kal, csúcsa 39,8° alatt', right: '≈ 95 m' }
    ]
  }
];

const RIGHT_TRIANGLE_SOLVING_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: RIGHT_TRIANGLE_SOLVING_MATCHER_LEVELS_LIST[0],
  2: RIGHT_TRIANGLE_SOLVING_MATCHER_LEVELS_LIST[1],
  3: RIGHT_TRIANGLE_SOLVING_MATCHER_LEVELS_LIST[2]
};

export const RightTriangleSolvingMatcher: React.FC<RightTriangleSolvingMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-derekszogu-megoldas-matcher',
  topicTitle = '5. Hosszúságok és szögek kiszámítása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="hosszusagok-es-szogek-kiszamitasa"
      title={topicTitle}
      subtitle="Gyakorold a szögfüggvényeket, a képletek átrendezését és a tankönyvi feladatok eredményeit!"
      levels={RIGHT_TRIANGLE_SOLVING_MATCHER_LEVELS}
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

export default RightTriangleSolvingMatcher;
