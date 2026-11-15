import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DilationCenterSvg,
  NegativeRatioSvg,
  AreaPerimeterRatioSvg,
  SquareInTriangleSvg,
  PyramidSliceSvg
} from './CentralDilationFigures';

interface CentralDilationMatcherProps {
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
    title: '1. Szint: Alapfogalmak és szerkesztési szabályok',
    subtitle: 'Párosítsd a középpontos hasonlóság alapfogalmait és szabályait a megfelelő párjukkal!',
    pairs: [
      {
        id: 'cdm1-1',
        prompt: 'Centrum (O pont) definíciója',
        promptFigure: <DilationCenterSvg size={42} />,
        value: 'A középpontos nagyítás/kicsinyítés egyetlen fixpontja (O = O\')'
      },
      {
        id: 'cdm1-2',
        prompt: 'Hasonlósági arány: λ > 1',
        value: 'Középpontos nagyítás (minden szakasz és távolság megnő)'
      },
      {
        id: 'cdm1-3',
        prompt: 'Hasonlósági arány: 0 < λ < 1',
        value: 'Középpontos kicsinyítés (minden szakasz és távolság csökken)'
      },
      {
        id: 'cdm1-4',
        prompt: 'Hasonlósági arány: λ = 1',
        value: 'Identitás (helybenhagyás, egybevágóság)'
      },
      {
        id: 'cdm1-5',
        prompt: 'Hasonlósági arány: λ = -1',
        promptFigure: <NegativeRatioSvg size={42} />,
        value: 'O középpontú középpontos tükrözés (180°-os elforgatás)'
      },
      {
        id: 'cdm1-6',
        prompt: 'Egyenes képe, ha nem illeszkedik O-ra',
        value: 'Az eredetivel párhuzamos egyenes (e\' ∥ e)'
      },
      {
        id: 'cdm1-7',
        prompt: 'Egyenes képe, ha illeszkedik O-ra',
        value: 'Önmagába átmenő fixegyenes (e\' = e), de a pontjai elmozdulnak'
      },
      {
        id: 'cdm1-8',
        prompt: 'Szögtartás elve',
        value: 'Bármely szög képe ugyanakkora nagyságú szög (α\' = α)'
      }
    ]
  },
  2: {
    title: '2. Szint: Kerület-, terület- és távolságszámítások',
    subtitle: 'Párosítsd a méretváltozásokat és számítási összefüggéseket a helyes eredménnyel!',
    pairs: [
      {
        id: 'cdm2-1',
        prompt: 'Oldalhosszak aránya: k = 2',
        promptFigure: <AreaPerimeterRatioSvg size={42} />,
        value: 'A kerület kétszeresére (2×), a terület négyszeresére (4×) nő'
      },
      {
        id: 'cdm2-2',
        prompt: 'Háromszög oldalai 3-szorosra nőnek',
        value: 'A terület a 9-szeresére nő (T\' = 3² · T = 9T)'
      },
      {
        id: 'cdm2-3',
        prompt: 'Kicsinyítés k = 0,5 aránnyal',
        value: 'A képalakzat területe az eredeti negyede (T\' = 0,25 · T)'
      },
      {
        id: 'cdm2-4',
        prompt: 'Szakasz hossza 6 cm, arány λ = -2,5',
        value: 'A képszakasz hossza: |-2,5| · 6 = 15 cm (mindig pozitív)'
      },
      {
        id: 'cdm2-5',
        prompt: 'OP = 4 cm, nagyítás aránya λ = 3',
        value: 'OP\' = 12 cm, és P\' az OP félegyenesen fekszik'
      },
      {
        id: 'cdm2-6',
        prompt: 'OP = 8 cm, negatív arány λ = -0,5',
        value: 'OP\' = 4 cm, és P\' az O ellentétes oldalán van'
      },
      {
        id: 'cdm2-7',
        prompt: 'Gúla felező magasságában vett párhuzamos metszet',
        promptFigure: <PyramidSliceSvg size={42} />,
        value: 'A metszet területe az alapterület negyede (k = 1/2 ⟹ T = 1/4)'
      },
      {
        id: 'cdm2-8',
        prompt: 'Nagyítási centrum O visszakeresése',
        value: 'A megfelelő pontpárokat összekötő egyenesek metszéspontja (AA\' ∩ BB\')'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi buktatók és geometriai alkalmazások',
    subtitle: 'Párosítsd az összetett összefüggéseket és speciális szerkesztéseket a helyes tétellel!',
    pairs: [
      {
        id: 'cdm3-1',
        prompt: 'Négyzet szerkesztése háromszögbe',
        promptFigure: <SquareInTriangleSvg size={42} />,
        value: 'Segédnégyzet csúcsából (A) indított centrális nagyítással M ↦ M\' a BC-re'
      },
      {
        id: 'cdm3-2',
        prompt: 'Alakzat nagyítása két különböző pontból (O és P)',
        value: 'A két kapott kép egybevágó és eltolással fedésbe hozható'
      },
      {
        id: 'cdm3-3',
        prompt: 'Kocka élhossza 3-szorosára nő',
        value: 'Felszíne 9-szeresére (3²), térfogata 27-szeresére (3³) nő'
      },
      {
        id: 'cdm3-4',
        prompt: 'Negatív arány geometriai hatása (λ < 0)',
        value: 'Irányváltás: az alakzat 180°-kal elfordul (középpontos tükrözés + nyújtás)'
      },
      {
        id: 'cdm3-5',
        prompt: 'Szabályos gúla 4 egyenlő magasságú szeletre vágása',
        value: 'A síkmetszetek területeinek aránya: 1 : 4 : 9 : 16'
      },
      {
        id: 'cdm3-6',
        prompt: 'Fixpontok száma λ ≠ 1 esetén',
        value: 'Pontosan 1 fixpont létezik: a centrum (O)'
      },
      {
        id: 'cdm3-7',
        prompt: 'Alak és forma megmaradása',
        value: 'Bármely két belső szakasz hosszának aránya a képen is azonos marad'
      },
      {
        id: 'cdm3-8',
        prompt: 'Térbeli nagyítás (vetítőgép, fotónagyító)',
        value: 'A vetítés centruma (O) nincs benne a nagyítandó alakzat síkjában'
      }
    ]
  }
};

export const CentralDilationMatcher: React.FC<CentralDilationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Középpontos nagyítás, kicsinyítés'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default CentralDilationMatcher;

