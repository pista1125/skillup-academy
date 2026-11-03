import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CoordinateSystemSvg,
  ProcessGraphSvg,
  RateOfChangeSvg
} from './ChangesFigures';

interface ChangesMatcherProps {
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
    title: '1. Szint: Pontok és Síknegyedek Párosítása',
    subtitle: 'Párosítsd a síkbeli pontokat a megfelelő síknegyeddel vagy tengellyel!',
    pairs: [
      {
        id: 'cm1-1',
        prompt: 'P(4; 5)',
        value: 'I. síknegyed (+; +)',
        figure: <CoordinateSystemSvg size={70} />
      },
      {
        id: 'cm1-2',
        prompt: 'Q(-3; 8)',
        value: 'II. síknegyed (-; +)'
      },
      {
        id: 'cm1-3',
        prompt: 'R(-6; -2)',
        value: 'III. síknegyed (-; -)'
      },
      {
        id: 'cm1-4',
        prompt: 'S(7; -4)',
        value: 'IV. síknegyed (+; -)'
      },
      {
        id: 'cm1-5',
        prompt: 'A(0; 9)',
        value: 'y-tengelyen fekvő pont'
      },
      {
        id: 'cm1-6',
        prompt: 'B(5; 0)',
        value: 'x-tengelyen fekvő pont'
      }
    ]
  },
  2: {
    title: '2. Szint: Folyamatszakaszok és Meredekség',
    subtitle: 'Párosítsd a grafikon formáját a folyamat jellegével!',
    pairs: [
      {
        id: 'cm2-1',
        prompt: 'Felfelé emelkedő egyenes szakasz',
        value: 'Egyenletes növekedés (m > 0)',
        figure: <ProcessGraphSvg size={70} />
      },
      {
        id: 'cm2-2',
        prompt: 'Vízszintes szakasz út-idő grafikonon',
        value: 'Álló test, pihenőidő (v = 0)'
      },
      {
        id: 'cm2-3',
        prompt: 'Lefelé tartó lejtő szakasz',
        value: 'Csökkenő mennyiség (m < 0)'
      },
      {
        id: 'cm2-4',
        prompt: 'Δs = 240 km 3 óra alatt',
        value: '80 km/h átlagsebesség'
      },
      {
        id: 'cm2-5',
        prompt: 'ΔT = 12 °C melegedés 4 óra alatt',
        value: '3 °C/óra változási ütem'
      },
      {
        id: 'cm2-6',
        prompt: 'Két grafikon metszéspontja',
        value: 'Találkozási hely és időpont'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Folyamatok és Jelenségek',
    subtitle: 'Párosítsd a fizikai/matematikai jelenségeket a grafikon tulajdonságával!',
    pairs: [
      {
        id: 'cm3-1',
        prompt: 'Szabadesés út-idő függvénye: s = 5t²',
        value: 'Egyre meredekebb parabolaív',
        figure: <RateOfChangeSvg size={70} />
      },
      {
        id: 'cm3-2',
        prompt: 'Két pont: (3; 12) és (5; 20)',
        value: 'Meredekség m = 4'
      },
      {
        id: 'cm3-3',
        prompt: 'Sebesség-idő görbe alatti terület',
        value: 'Megtett összes út (s)'
      },
      {
        id: 'cm3-4',
        prompt: '100 km 50 km/h-val + 100 km 100 km/h-val',
        value: 'kb. 66,7 km/h átlagsebesség'
      },
      {
        id: 'cm3-5',
        prompt: 'Alul széles, felül szűk váza töltése',
        value: 'Eleinte lassan, majd gyorsan nő a vízszint'
      },
      {
        id: 'cm3-6',
        prompt: 'v-t grafikon metszi a nullát pozitívból negatívba',
        value: 'Megállás és megfordulás'
      }
    ]
  }
};

export const ChangesMatcher: React.FC<ChangesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-func-valtozasok-matcher',
  topicTitle = '3. Változások ábrázolása'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
    />
  );
};

