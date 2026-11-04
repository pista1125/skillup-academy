import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  AxialReflectionBasicsSvg,
  CoordinateAxialSvg,
  SymmetryAxesShapesSvg
} from './AxialFigures';

interface AxialMatcherProps {
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
    title: '1. Szint: Geometriai Alaptulajdonságok',
    subtitle: 'Párosítsd a tengelyes tükrözés jellemzőit a pontos matematikai jelentésükkel!',
    pairs: [
      {
        id: 'am1-1',
        prompt: 'Tengely pontjai (P ∈ t)',
        value: 'Fixpontok (P\' = P)',
        figure: <AxialReflectionBasicsSvg size={70} />
      },
      {
        id: 'am1-2',
        prompt: 't tengely és PP\' viszonya',
        value: 't a PP\' szakasz felezőmerőlegese'
      },
      {
        id: 'am1-3',
        prompt: 'Körüljárási irány hatása',
        value: 'Megfordul (ellentétesre változik)'
      },
      {
        id: 'am1-4',
        prompt: 'Távolságok viszonya (|A\'B\'|)',
        value: '|A\'B\'| = |AB| (távolságtartó)'
      },
      {
        id: 'am1-5',
        prompt: 'Fixegyenesek a tengelyen kívül',
        value: 'Minden t-re merőleges egyenes'
      },
      {
        id: 'am1-6',
        prompt: 'Kétszeri tükrözés ugyanarra a tengelyre',
        value: 'Identitás (minden pont helyben marad)'
      }
    ]
  },
  2: {
    title: '2. Szint: Koordináták és Tükrözési Szabályok',
    subtitle: 'Párosítsd a kezdőpontokat és tengelyeket a helyes tükörkép koordinátákkal!',
    pairs: [
      {
        id: 'am2-1',
        prompt: 'P(5; 2) tükrözése az x-tengelyre',
        value: 'P\'(5; −2)',
        figure: <CoordinateAxialSvg size={70} />
      },
      {
        id: 'am2-2',
        prompt: 'P(5; 2) tükrözése az y-tengelyre',
        value: 'P\'(−5; 2)'
      },
      {
        id: 'am2-3',
        prompt: 'P(5; 2) tükrözése az y = x egyenesre',
        value: 'P\'(2; 5)'
      },
      {
        id: 'am2-4',
        prompt: 'P(5; 2) tükrözése az y = −x egyenesre',
        value: 'P\'(−2; −5)'
      },
      {
        id: 'am2-5',
        prompt: 'P(1; 3) tükrözése az x = 4 egyenesre',
        value: 'P\'(7; 3)'
      },
      {
        id: 'am2-6',
        prompt: 'P(2; 1) tükrözése az y = 3 egyenesre',
        value: 'P\'(2; 5)'
      }
    ]
  },
  3: {
    title: '3. Szint: Alakzatok és Szimmetriatengelyek Száma',
    subtitle: 'Kösd össze a síkidomokat a szimmetriatengelyeik pontos számával!',
    pairs: [
      {
        id: 'am3-1',
        prompt: 'Egyenlő szárú háromszög & Húrtrapéz & Deltoid',
        value: '1 szimmetriatengely',
        figure: <SymmetryAxesShapesSvg size={70} />
      },
      {
        id: 'am3-2',
        prompt: 'Téglalap & Rombusz & Szakasz',
        value: '2 szimmetriatengely'
      },
      {
        id: 'am3-3',
        prompt: 'Szabályos háromszög',
        value: '3 szimmetriatengely'
      },
      {
        id: 'am3-4',
        prompt: 'Négyzet (2 oldalfelező + 2 átló)',
        value: '4 szimmetriatengely'
      },
      {
        id: 'am3-5',
        prompt: 'Általános paralelogramma',
        value: '0 szimmetriatengely (nincs tengelye!)'
      },
      {
        id: 'am3-6',
        prompt: 'Kör (bármely átmérője mentén)',
        value: 'Végtelen sok szimmetriatengely'
      }
    ]
  }
};

export const AxialMatcher: React.FC<AxialMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-tengelyes',
  topicTitle = '3. Tengelyes tükrözés'
}) => {
  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={matcherLevels}
      initialLevel={currentLevel || level}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

