import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { OrderingMatcherFigure } from './OrderingDiagrams';

interface OrderingMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Sorrendek és Faktoriális',
    description: 'Párosítsd a sorbarendezési feladványokat a pontos számításokkal és eredményekkel!',
    pairs: [
      {
        id: 'p1',
        promptFigure: <OrderingMatcherFigure type="queue" />,
        prompt: '3 barát sorba állása egy padon',
        value: '3 · 2 · 1 = 6 sorrend'
      },
      {
        id: 'p2',
        promptFigure: <OrderingMatcherFigure type="books" />,
        prompt: '4 különböző könyv elrendezése a polcon',
        value: '4! = 24 féle sorrend'
      },
      {
        id: 'p3',
        promptFigure: <OrderingMatcherFigure type="slots" />,
        prompt: '1, 2, 3 jegyekből 3-jegyű számok (különböző)',
        value: '3! = 6 különböző szám'
      },
      {
        id: 'p4',
        promptFigure: <OrderingMatcherFigure type="slots" />,
        prompt: '5 különböző színű golyó sorrendje',
        value: '5! = 120 sorrend'
      },
      {
        id: 'p5',
        promptFigure: <OrderingMatcherFigure type="anagram" />,
        prompt: 'A "FA" szó betűinek sorrendje',
        value: '2! = 2 szó (FA, AF)'
      },
      {
        id: 'p6',
        promptFigure: <OrderingMatcherFigure type="queue" />,
        prompt: '2 diák ülésrendje egy kétszemélyes padban',
        value: '2! = 2 ülésrend'
      },
      {
        id: 'p7',
        promptFigure: <OrderingMatcherFigure type="slots" />,
        prompt: '4 ceruza sorrendje a tolltartóban',
        value: '4 · 3 · 2 · 1 = 24 eset'
      },
      {
        id: 'p8',
        promptFigure: <OrderingMatcherFigure type="queue" />,
        prompt: '3 futóversenyző dobogós sorrendje',
        value: '3! = 6 féle dobogó'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Megkötések, 0 Számjegy & Körasztal',
    description: 'Párosítsd a feltételes sorbarendezési feladatokat a pontos levezetésekkel!',
    pairs: [
      {
        id: 'p9',
        promptFigure: <OrderingMatcherFigure type="digits" />,
        prompt: '0, 3, 5, 8 jegyekből 4-jegyű számok',
        value: '3 · 3 · 2 · 1 = 18 szám (első nem 0)'
      },
      {
        id: 'p10',
        promptFigure: <OrderingMatcherFigure type="anagram" />,
        prompt: '"MATEK" szó 5-betűs anagrammái',
        value: '5! = 120 betűsorozat'
      },
      {
        id: 'p11',
        promptFigure: <OrderingMatcherFigure type="anagram" />,
        prompt: '"MATEK" szavak "M" kezdőbetűvel',
        value: '1 · 4! = 24 szó'
      },
      {
        id: 'p12',
        promptFigure: <OrderingMatcherFigure type="books" />,
        prompt: '3 matek és 2 fizikakönyv tantárgyanként',
        value: '2! · 3! · 2! = 24 sorrend'
      },
      {
        id: 'p13',
        promptFigure: <OrderingMatcherFigure type="queue" />,
        prompt: '4 ember sorban, "A" legelöl áll',
        value: '1 · 3! = 6 sorrend'
      },
      {
        id: 'p14',
        promptFigure: <OrderingMatcherFigure type="digits" />,
        prompt: '1, 2, 3, 4, 5 jegyekből 3-jegyű PÁROS számok',
        value: '4 · 3 · 2 = 24 szám'
      },
      {
        id: 'p15',
        promptFigure: <OrderingMatcherFigure type="circle" />,
        prompt: '4 ember körasztal köré ül',
        value: '(4 - 1)! = 3! = 6 ülésrend'
      },
      {
        id: 'p16',
        promptFigure: <OrderingMatcherFigure type="slots" />,
        prompt: '4-jegyű számok 1, 2, 3, 4 jegyekből (ismétlődhetnek)',
        value: '4⁴ = 256 szám'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Mesteri Permutációk és Komplementer',
    description: 'Párosítsd az összetett logikai megkötéseket a matematikai megoldásokkal!',
    pairs: [
      {
        id: 'p17',
        promptFigure: <OrderingMatcherFigure type="blocks" />,
        prompt: '4 ember, Anna és Béla egymás mellett ül',
        value: '2 · 3! = 12 ülésrend (blokk)'
      },
      {
        id: 'p18',
        promptFigure: <OrderingMatcherFigure type="blocks" />,
        prompt: '4 ember, Anna és Béla NEM ülhetnek egymás mellett',
        value: '24 - 12 = 12 ülésrend (komplementer)'
      },
      {
        id: 'p19',
        promptFigure: <OrderingMatcherFigure type="circle" />,
        prompt: '5 ember körasztal köré ül',
        value: '(5 - 1)! = 4! = 24 ülésrend'
      },
      {
        id: 'p20',
        promptFigure: <OrderingMatcherFigure type="digits" />,
        prompt: '0, 1, 2, 3, 4 jegyekből 4-jegyű PÁROS számok',
        value: '24 (0-ra) + 36 (2,4-re) = 60 szám'
      },
      {
        id: 'p21',
        promptFigure: <OrderingMatcherFigure type="queue" />,
        prompt: '3 fiú és 3 lány felváltva ül le egy padra',
        value: '2 · 3! · 3! = 72 ülésrend'
      },
      {
        id: 'p22',
        promptFigure: <OrderingMatcherFigure type="anagram" />,
        prompt: '"BALATON" szó betűinek anagrammái (két "A")',
        value: '7! / 2! = 2520 szó'
      },
      {
        id: 'p23',
        promptFigure: <OrderingMatcherFigure type="queue" />,
        prompt: '5 emberből 2 kijelölt személy a két szélen ül',
        value: '2 · 3! = 12 ülésrend'
      },
      {
        id: 'p24',
        promptFigure: <OrderingMatcherFigure type="slots" />,
        prompt: '6 színből 4 sávos lobogó készítése',
        value: '6 · 5 · 4 · 3 = 360 zászló'
      }
    ]
  }
};

export const OrderingMatcher: React.FC<OrderingMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onBack,
  onSwitchToQuiz,
  topicId = 'g7-logic-order-it',
  topicTitle = '2. Rendezd sorba!'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="gondolkodjunk"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Sorbarendezés Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a sorbarendezési feladványokat a pontos matematikai eredményekkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
