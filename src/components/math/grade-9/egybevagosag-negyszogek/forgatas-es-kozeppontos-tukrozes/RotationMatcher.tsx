import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CentralSymmetrySvg,
  RotationAngleSvg,
  RotationalSymmetryShapesSvg,
  CoordinateRotationSvg
} from './RotationFigures';

interface RotationMatcherProps {
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
    title: '1. Szint: Alaptulajdonságok és Definíciók',
    subtitle: 'Párosítsd a transzformációk geometriai jellemzőit a pontos meghatározásukkal!',
    pairs: [
      {
        id: 'rm1-1',
        prompt: 'O középpont képe középpontos tükrözésnél',
        value: 'Önmaga (egyetlen fixpont)',
        figure: <CentralSymmetrySvg size={70} />
      },
      {
        id: 'rm1-2',
        prompt: 'Egyenes középpontos tükörképe',
        value: 'Vele párhuzamos egyenes (e\' || e)'
      },
      {
        id: 'rm1-3',
        prompt: 'Középpontos tükrözés síkbeli megfelelője',
        value: '180°-os elforgatás O körül'
      },
      {
        id: 'rm1-4',
        prompt: 'Pozitív forgásirány',
        value: 'Óramutató járásával ellentétes (+)'
      },
      {
        id: 'rm1-5',
        prompt: 'Körüljárási irány forgatásnál',
        value: 'Megmarad (nem fordul meg)'
      },
      {
        id: 'rm1-6',
        prompt: 'Távolságok viszonya forgatás után',
        value: '|A\'B\'| = |AB| (távolságtartó)'
      }
    ]
  },
  2: {
    title: '2. Szint: Koordináták és Origó Körüli Forgatások',
    subtitle: 'Kösd össze a kezdőpontokat és a megadott transzformációval kapott képpontjaikat!',
    pairs: [
      {
        id: 'rm2-1',
        prompt: 'P(3; 2) tükrözése az O(0; 0) origóra',
        value: 'P\'(−3; −2)',
        figure: <CoordinateRotationSvg size={70} />
      },
      {
        id: 'rm2-2',
        prompt: 'P(4; 1) elforgatása +90°-kal az origó körül',
        value: 'P\'(−1; 4)'
      },
      {
        id: 'rm2-3',
        prompt: 'P(−2; 5) elforgatása −90°-kal (270°) az origó körül',
        value: 'P\'(5; 2)'
      },
      {
        id: 'rm2-4',
        prompt: 'A(2; 1) és A\'(6; 7) szakasz felezőpontja (O)',
        value: 'O(4; 4)'
      },
      {
        id: 'rm2-5',
        prompt: 'P(1; 2) tükrözése a C(3; 3) középpontra',
        value: 'P\'(5; 4)'
      },
      {
        id: 'rm2-6',
        prompt: 'Két egymást követő tükrözés ugyanarra az O-ra',
        value: 'Identitás (360°-os fordulat)'
      }
    ]
  },
  3: {
    title: '3. Szint: Forgásszimmetria és Minimális Szögek',
    subtitle: 'Párosítsd a síkidomokat a legkisebb pozitív szimmetria-szögükkel és rendjükkel!',
    pairs: [
      {
        id: 'rm3-1',
        prompt: 'Négyzet forgásszimmetriája',
        value: 'α = 90° (4-edrendű)',
        figure: <RotationalSymmetryShapesSvg size={70} />
      },
      {
        id: 'rm3-2',
        prompt: 'Szabályos háromszög forgásszimmetriája',
        value: 'α = 120° (3-adrendű)'
      },
      {
        id: 'rm3-3',
        prompt: 'Paralelogramma szimmetriája',
        value: 'α = 180° (középpontos)'
      },
      {
        id: 'rm3-4',
        prompt: 'Szabályos hatszög forgásszimmetriája',
        value: 'α = 60° (6-odrendű)'
      },
      {
        id: 'rm3-5',
        prompt: 'Szabályos nyolcszög forgásszimmetriája',
        value: 'α = 45° (8-adrendű)'
      },
      {
        id: 'rm3-6',
        prompt: 'Kör a középpontja körül',
        value: 'Tetszőleges szög (végtelen rendű)'
      }
    ]
  }
};

export const RotationMatcher: React.FC<RotationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-forgatas',
  topicTitle = '1. Forgatás és középpontos tükrözés'
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

