import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  QuadrilateralHierarchySvg,
  QuadrilateralDiagonalsSvg,
  CyclicTangentialSvg
} from './QuadrilateralFigures';

interface QuadrilateralMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Négyszögek és Szimmetriatengelyeik',
    subtitle: 'Párosítsd a négyszögeket a pontos szimmetriáikkal és definíciójukkal!',
    pairs: [
      {
        id: 'qm1-1',
        prompt: 'Húrtrapéz (szimmetrikus trapéz)',
        value: '1 szimmetriatengely (alapok felezőmerőlegese), egyenlő szárak és átlók',
        figure: <QuadrilateralHierarchySvg size={70} />
      },
      {
        id: 'qm1-2',
        prompt: 'Deltoid',
        value: '1 szimmetriatengely (a szimmetriaátló), két-két szomszédos oldal egyenlő'
      },
      {
        id: 'qm1-3',
        prompt: 'Általános paralelogramma',
        value: '0 szimmetriatengely, de középpontosan szimmetrikus az átlók metszéspontjára'
      },
      {
        id: 'qm1-4',
        prompt: 'Téglalap',
        value: '2 szimmetriatengely (szemközti oldalfelezők), minden szöge 90°'
      },
      {
        id: 'qm1-5',
        prompt: 'Rombusz',
        value: '2 szimmetriatengely (a két átlója), minden oldala egyenlő'
      },
      {
        id: 'qm1-6',
        prompt: 'Négyzet',
        value: '4 szimmetriatengely (2 átló + 2 oldalfelező) és 90°-os forgásszimmetria'
      }
    ]
  },
  2: {
    title: '2. Szint: Átlók Geometriai Tulajdonságai',
    subtitle: 'Kösd össze az átlókra vonatkozó összefüggéseket a megfelelő alakzatokkal!',
    pairs: [
      {
        id: 'qm2-1',
        prompt: 'Átlók kölcsönösen felezik egymást',
        value: 'Paralelogramma, Rombusz, Téglalap, Négyzet',
        figure: <QuadrilateralDiagonalsSvg size={70} />
      },
      {
        id: 'qm2-2',
        prompt: 'Átlók egyenlő hosszúak (e = f)',
        value: 'Húrtrapéz, Téglalap, Négyzet'
      },
      {
        id: 'qm2-3',
        prompt: 'Átlók merőlegesek egymásra (e ⊥ f)',
        value: 'Deltoid, Rombusz, Négyzet'
      },
      {
        id: 'qm2-4',
        prompt: 'Átlók felezik a belső szögeket',
        value: 'Rombusz és Négyzet (valamint a deltoid szimmetriaátlója)'
      },
      {
        id: 'qm2-5',
        prompt: 'Csak az egyik átló felezi a másikat',
        value: 'Deltoid (a szimmetriaátló merőlegesen felezi a harántátlót)'
      },
      {
        id: 'qm2-6',
        prompt: 'Átlók egyenlők, merőlegesek és felezik egymást',
        value: 'Kizárólag a Négyzet (minden átlótulajdonság egyszerre teljesül)'
      }
    ]
  },
  3: {
    title: '3. Szint: Húrnégyszögek és Érintőnégyszögek',
    subtitle: 'Párosítsd a kör-négyszög tételeket a matematikai feltételekkel és példákkal!',
    pairs: [
      {
        id: 'qm3-1',
        prompt: 'Húrnégyszög alaptétele',
        value: 'A szemközti szögek összege 180°: α + γ = β + δ = 180°',
        figure: <CyclicTangentialSvg size={70} />
      },
      {
        id: 'qm3-2',
        prompt: 'Érintőnégyszög alaptétele (Pithot-tétel)',
        value: 'A szemközti oldalak összege egyenlő: a + c = b + d'
      },
      {
        id: 'qm3-3',
        prompt: 'Húrnégyszögek a nevezetes négyszögek közül',
        value: 'Húrtrapéz, Téglalap, Négyzet'
      },
      {
        id: 'qm3-4',
        prompt: 'Érintőnégyszögek a nevezetes négyszögek közül',
        value: 'Deltoid, Rombusz, Négyzet'
      },
      {
        id: 'qm3-5',
        prompt: 'Egyszerre húr- és érintőnégyszög',
        value: 'Négyzet (köré is és bele is írható kör)'
      },
      {
        id: 'qm3-6',
        prompt: 'Varignon-tétel',
        value: 'Bármely négyszög oldalfelezőit sorban összekötve paralelogramma keletkezik'
      }
    ]
  }
};

export const QuadrilateralMatcher: React.FC<QuadrilateralMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-negyszogek-matcher',
  topicTitle = '6. Szimmetrikus négyszögek'
}) => {
  return (
    <MatcherTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={9}
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
    />
  );
};

(QuadrilateralMatcher as any).matcherLevels = matcherLevels;

