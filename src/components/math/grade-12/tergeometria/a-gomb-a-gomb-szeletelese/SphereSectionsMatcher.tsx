import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SphereSectionsMatcherProps {
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

const SPHERE_SECTIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmakat a pontos jelentésükkel!',
    pairs: [
      { id: 'ssm1', left: 'Gömbfelület', right: 'A tér egy pontjától adott távolságra lévő pontok halmaza' },
      { id: 'ssm2', left: 'Gömb', right: 'A gömbfelület által határolt test' },
      { id: 'ssm3', left: 'A gömb sugara', right: 'A középpont és a gömbfelület pontjainak távolsága' },
      { id: 'ssm4', left: 'Főkör', right: 'A középponton átmenő sík metszete, sugara R' },
      { id: 'ssm5', left: 'Síkmetszet (nem főkör)', right: 'Kör, amelynek sugara kisebb R-nél' },
      { id: 'ssm6', left: 'Gömbsüveg', right: 'A gömb egyik része, amelyet egy sík lemetsz' },
      { id: 'ssm7', left: 'Érintősík (d = R)', right: 'Egyetlen közös pont a gömbbel' },
      { id: 'ssm8', left: 'Pont és sík távolsága', right: 'A pontból a síkra állított merőleges szakasz hossza' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A metszetkör sugara',
    description: 'Párosítsd a gömbsugarat (R) és a sík távolságát (d) a metszetkör sugarával (r)!',
    pairs: [
      { id: 'ssm9', left: 'R = 5, d = 3', right: 'r = 4' },
      { id: 'ssm10', left: 'R = 10, d = 6', right: 'r = 8' },
      { id: 'ssm11', left: 'R = 13, d = 12', right: 'r = 5' },
      { id: 'ssm12', left: 'R = 4, d = 2', right: 'r = √12 ≈ 3,46' },
      { id: 'ssm13', left: 'R = 10, d = 2', right: 'r = √96 ≈ 9,80' },
      { id: 'ssm14', left: 'R = 7, d = 0', right: 'r = 7 (főkör)' },
      { id: 'ssm15', left: 'R = 5, d = 2', right: 'r = √21 ≈ 4,58' },
      { id: 'ssm16', left: 'R = 6, d = 6', right: 'r = 0 (érintési pont)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'ssm17', left: 'Metszetkör r = 4, d = 3 ⇒ gömbsugár', right: 'R = 5 cm' },
      { id: 'ssm18', left: 'R = 12,8 cm, metszet átmérője 10,2 cm ⇒ d', right: '≈ 11,74 cm' },
      { id: 'ssm19', left: 'R = 3,2 dm, a sugár felezőmerőleges síkja ⇒ terület', right: '7,68π ≈ 24,13 dm²' },
      { id: 'ssm20', left: 'Főkörök kerülete 10 cm-rel tér el ⇒ sugárkülönbség', right: '≈ 1,59 cm' },
      { id: 'ssm21', left: 'A 8 cm élű kocka éleit érintő gömb sugara', right: '4√2 ≈ 5,66 cm' },
      { id: 'ssm22', left: 'A Ráktérítő sugara (R = 6371 km, 23°26′)', right: '≈ 5846 km' },
      { id: 'ssm23', left: 'Kupola: alapkör 50 m átmérő, magasság 16 m ⇒ R', right: '≈ 27,5 m' },
      { id: 'ssm24', left: 'R = 6,2 cm, merőleges síkok az egész pontokban ⇒ metsző síkok', right: '13 darab' }
    ]
  }
];

const SPHERE_SECTIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SPHERE_SECTIONS_MATCHER_LEVELS_LIST[0],
  2: SPHERE_SECTIONS_MATCHER_LEVELS_LIST[1],
  3: SPHERE_SECTIONS_MATCHER_LEVELS_LIST[2]
};

export const SphereSectionsMatcher: React.FC<SphereSectionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-gomb-szeletelese-matcher',
  topicTitle = '6. A gömb, a gömb szeletelése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gomb-a-gomb-szeletelese"
      title={topicTitle}
      subtitle="Gyakorold a gömb fogalmait, a metszetkör sugarának kiszámítását és a tankönyvi feladatokat!"
      levels={SPHERE_SECTIONS_MATCHER_LEVELS}
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

export default SphereSectionsMatcher;
