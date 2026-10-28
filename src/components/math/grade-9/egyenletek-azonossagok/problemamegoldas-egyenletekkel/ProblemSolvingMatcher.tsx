import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ProblemSolvingStepsSvg,
  AgeProblemTableSvg,
  MixtureProblemSvg,
  MotionProblemSvg
} from './ProblemSolvingFigures';

interface ProblemSolvingMatcherProps {
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
    title: '1. Szint: Szöveges Kifejezések Algebrai Fordítása',
    subtitle: 'Párosítsd a szöveges megfogalmazásokat a nekik megfelelő algebrai alakkal!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'Egy számnál 9-cel több',
        value: 'x + 9',
        figure: <ProblemSolvingStepsSvg size={65} />
      },
      {
        id: 'pm1-2',
        prompt: 'Egy szám négyszerese',
        value: '4x'
      },
      {
        id: 'pm1-3',
        prompt: 'Egy szám felénél 3-mal kevesebb',
        value: 'x / 2 - 3'
      },
      {
        id: 'pm1-4',
        prompt: 'Két szám összege 30, egyikük x',
        value: '30 - x'
      },
      {
        id: 'pm1-5',
        prompt: 'Egy szám 25%-a',
        value: '0,25 · x'
      },
      {
        id: 'pm1-6',
        prompt: 'x-nél 15%-kal nagyobb szám',
        value: '1,15 · x'
      }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Feladatok Felállított Egyenlete',
    subtitle: 'Párosítsd a szöveges feladatok leírását a helyesen felírt egyenletükkel!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'Anya (3x) és fia (x) életkora összesen 48 év',
        value: '3x + x = 48',
        figure: <AgeProblemTableSvg size={65} />
      },
      {
        id: 'pm2-2',
        prompt: 'Gondolt szám háromszorosa mínusz 5 az 22',
        value: '3x - 5 = 22'
      },
      {
        id: 'pm2-3',
        prompt: 'Két egymást követő páros szám összege 46',
        value: 'x + (x + 2) = 46'
      },
      {
        id: 'pm2-4',
        prompt: 'Téglalap kerülete 36 cm, oldalai x és 2x',
        value: '2 · (x + 2x) = 36'
      },
      {
        id: 'pm2-5',
        prompt: '200 g 10%-os sóoldathoz x g vizet adva 5%-os lesz',
        value: '200 · 0,10 = (200 + x) · 0,05',
        figure: <MixtureProblemSvg size={65} />
      },
      {
        id: 'pm2-6',
        prompt: 'Két autó 60 és 80 km/h-val szembe halad, táv 280 km',
        value: '60t + 80t = 280',
        figure: <MotionProblemSvg size={65} />
      }
    ]
  },
  3: {
    title: '3. Szint: Szöveges Feladatok és Válaszok',
    subtitle: 'Párosítsd a szöveges feladatokat a helyes szöveges válasszal!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'Apa 36, fia 12 éves. Hány év múlva lesz apa 2-szer idősebb?',
        value: '12 év múlva (apa 48, fia 24)',
        figure: <AgeProblemTableSvg size={65} />
      },
      {
        id: 'pm3-2',
        prompt: 'Gondolt számhoz 8-at adva, 3-mal szorozva 45 lesz. Mi a szám?',
        value: 'A gondolt szám a 7'
      },
      {
        id: 'pm3-3',
        prompt: 'Három egymást követő egész szám összege 72. Mi a legkisebb?',
        value: 'A legkisebb szám a 23'
      },
      {
        id: 'pm3-4',
        prompt: 'Autó 90 km/h-val halad. Mennyi idő alatt tesz meg 225 km-t?',
        value: '2,5 óra (2 óra 30 perc)',
        figure: <MotionProblemSvg size={65} />
      },
      {
        id: 'pm3-5',
        prompt: '100 g 20%-os cukoroldatból 20 g víz elpárolog. Új töménység?',
        value: '25% töménységű lesz (20 g cukor / 80 g)'
      },
      {
        id: 'pm3-6',
        prompt: 'Téglalap területe 48 cm², egyik oldala 6 cm. Mennyi a kerülete?',
        value: 'K = 28 cm (másik oldal 8 cm)'
      }
    ]
  }
};

export const ProblemSolvingMatcher: React.FC<ProblemSolvingMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenlet-problemamegoldas-quiz',
  topicTitle = 'Problémamegoldás egyenletekkel'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      levels={matcherLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      color="amber"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
