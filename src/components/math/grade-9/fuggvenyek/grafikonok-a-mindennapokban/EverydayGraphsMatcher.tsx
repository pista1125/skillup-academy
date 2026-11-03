import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DistanceTimeSvg,
  SpeedTimeAreaSvg,
  HeartRateOrWeatherSvg
} from './EverydayGraphsFigures';

interface EverydayGraphsMatcherProps {
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
    title: '1. Szint: Grafikonformák és Fizikai Jelentésük',
    subtitle: 'Párosítsd a grafikon vizuális formáját a gyakorlati történéssel!',
    pairs: [
      {
        id: 'em1-1',
        prompt: 'Vízszintes szakasz s-t grafikonon',
        value: 'Álló jármű, pihenőidő',
        figure: <DistanceTimeSvg size={70} />
      },
      {
        id: 'em1-2',
        prompt: 'Két s-t egyenes metszéspontja',
        value: 'Két test találkozása'
      },
      {
        id: 'em1-3',
        prompt: '140 km megtétele 2 óra alatt',
        value: '70 km/h sebesség'
      },
      {
        id: 'em1-4',
        prompt: 'Napi T_max = 24 °C, T_min = 6 °C',
        value: '18 °C hőingadozás'
      },
      {
        id: 'em1-5',
        prompt: 'Lefelé tartó egyenes s-t grafikonon',
        value: 'Visszatérés a kiindulóponthoz'
      },
      {
        id: 'em1-6',
        prompt: 'Sprinteléskor a pulzusgörbe csúcsa',
        value: 'Maximális terhelés'
      }
    ]
  },
  2: {
    title: '2. Szint: v-t Terület és Átlagsebesség',
    subtitle: 'Párosítsd a számítási feladatokat a pontos eredménnyel!',
    pairs: [
      {
        id: 'em2-1',
        prompt: 'v = 15 m/s 10 másodpercig',
        value: '150 méter megtett út',
        figure: <SpeedTimeAreaSvg size={70} />
      },
      {
        id: 'em2-2',
        prompt: 'Gyorsulás 0-ról 20 m/s-ra 8 s alatt',
        value: '80 méter út (háromszög)'
      },
      {
        id: 'em2-3',
        prompt: '40 km út 2,5 óra alatt (pihenővel)',
        value: '16 km/h teljes átlagsebesség'
      },
      {
        id: 'em2-4',
        prompt: 'Fékezés 30 m/s-ról 6 s alatt',
        value: '90 méter fékút'
      },
      {
        id: 'em2-5',
        prompt: 'v-t grafikon meredeksége (Δv / Δt)',
        value: 'Gyorsulás (a)'
      },
      {
        id: 'em2-6',
        prompt: 'v-t grafikon alatti terület',
        value: 'Megtett összes távolság (s)'
      }
    ]
  },
  3: {
    title: '3. Szint: Komplex Hétköznapi Modellek',
    subtitle: 'Párosítsd a speciális folyamatokat a modell jellemzőjével!',
    pairs: [
      {
        id: 'em3-1',
        prompt: 'Odafelé 60 km/h, vissza 40 km/h (120 km)',
        value: '48 km/h átlagsebesség'
      },
      {
        id: 'em3-2',
        prompt: '90 km/h autó és 30 km előnyű 70 km/h motor',
        value: '1,5 óra múlva utolérés'
      },
      {
        id: 'em3-3',
        prompt: 'Fix 3000 Ft alapdíj 5 GB-ig, majd sávos díj',
        value: 'Lépcsős költségfüggvény'
      },
      {
        id: 'em3-4',
        prompt: 'Évi fix 8% kamatos kamat',
        value: 'Exponenciálisan ívelő görbe'
      },
      {
        id: 'em3-5',
        prompt: 'Lift megállása két közbenső emeleten',
        value: '2 vízszintes szakasz a grafikonon'
      },
      {
        id: 'em3-6',
        prompt: 'v-t trapéz: 4s gyorsul + 6s halad + 2s fékez (12 m/s)',
        value: '108 méter teljes út'
      }
    ]
  }
};

export const EverydayGraphsMatcher: React.FC<EverydayGraphsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-func-mindennapok-matcher',
  topicTitle = '4. Grafikonok a mindennapokban'
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

