import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimilarityMatcherProps {
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
  [key: string]: any;
}

const SIMILARITY_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Alapfogalmak és metrikus arányok',
    description: 'Párosítsd a hasonlósági transzformáció definícióit és alapvető skálázási összefüggéseit!',
    pairs: [
      {
        id: 'p1',
        left: 'Hasonlósági transzformáció',
        right: 'Középpontos hasonlóság és egybevágóság egymásutánja (kompozíciója)'
      },
      {
        id: 'p2',
        left: 'Hasonlóság aránya (λ)',
        right: 'A megfelelő szakaszok hosszának állandó hányadosa (a\' / a)'
      },
      {
        id: 'p3',
        left: 'Kerületek aránya (K\' / K)',
        right: 'Megegyezik a hasonlóság arányával (λ)'
      },
      {
        id: 'p4',
        left: 'Területek aránya (T\' / T)',
        right: 'A hasonlóság arányának négyzete (λ²)'
      },
      {
        id: 'p5',
        left: 'Térfogatok aránya (V\' / V)',
        right: 'A hasonlóság arányának köbe (λ³)'
      },
      {
        id: 'p6',
        left: 'Felszínek aránya (A\' / A)',
        right: 'A hasonlóság arányának négyzete (λ²)'
      },
      {
        id: 'p7',
        left: 'Megfelelő szögek kapcsolata',
        right: 'Mindig pontosan egyenlő nagyságúak (szögtartás)'
      },
      {
        id: 'p8',
        left: 'Egybevágóság kapcsolata',
        right: 'Olyan speciális hasonlóság, amelynél a hasonlósági arány λ = 1'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számításos összefüggések és alakzatok',
    description: 'Párosítsd a konkrét méretezési feladatokat a helyes matematikai megoldással!',
    pairs: [
      {
        id: 'p9',
        left: 'λ = 3 arányú nagyítás',
        right: 'A kerület 3-szorosára, a terület 9-szeresére nő'
      },
      {
        id: 'p10',
        left: 'Területek aránya: T₂ / T₁ = 25',
        right: 'A kerületek és oldalak aránya: λ = √25 = 5'
      },
      {
        id: 'p11',
        left: 'Kockák térfogataránya: V₂ / V₁ = 8',
        right: 'Az élhossz és felület aránya: λ = ∛8 = 2, illetve A₂/A₁ = 4'
      },
      {
        id: 'p12',
        left: '12 cm, 15 cm, 16 cm háromszög; hasonlóé 10 cm',
        right: '3 különböző hasonlósági arány lehetséges (10/12, 10/15, 10/16)'
      },
      {
        id: 'p13',
        left: 'Gúla magasságának felezése párhuzamos síkkal',
        right: 'A levágott csúcsgúla térfogata az egésznek az 1/8 része ((1/2)³)'
      },
      {
        id: 'p14',
        left: '3 cm × 12 cm-es téglalap hasonló levágott része',
        right: 'Egy 3 cm × 0,75 cm méretű téglalap (arány 4 : 1)'
      },
      {
        id: 'p15',
        left: 'M = 1 : 50 méretarányú tervrajz',
        right: 'A tervrajzon mért 1 cm a valóságban 50 cm (0,5 m)'
      },
      {
        id: 'p16',
        left: 'Tervrajzon mért 4 cm² terület M = 1 : 100 esetén',
        right: 'A valóságban: 4 · 100² cm² = 40 000 cm² = 4 m²'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Geometriai tételek és érettségi alkalmazások',
    description: 'Párosítsd a tételeket, alakzattulajdonságokat és gyakorlati tényeket!',
    pairs: [
      {
        id: 'p17',
        left: 'Bármely két síkbeli kör',
        right: 'Mindig hasonló egymáshoz, a hasonlóság aránya a sugarak hányadosa (r₂/r₁)'
      },
      {
        id: 'p18',
        left: 'Bármely két síkbeli négyzet',
        right: 'Mindig hasonló egymáshoz, a hasonlóság aránya az oldalak hányadosa (a₂/a₁)'
      },
      {
        id: 'p19',
        left: 'Két téglalap hasonlóságának feltétele',
        right: 'Szomszédos oldalaik aránya megegyezik (a₁/b₁ = a₂/b₂)'
      },
      {
        id: 'p20',
        left: 'Gúla 4 egyenlő magasságú szintre osztása',
        right: 'Az alaplapok területeinek aránya 1 : 4 : 9 : 16'
      },
      {
        id: 'p21',
        left: '4 szintre vágott gúla szeleteinek térfogataránya',
        right: 'A rétegek térfogatai: 1 : 7 : 19 : 37 arányban állnak egymással'
      },
      {
        id: 'p22',
        left: 'Amerikai tervrajz mértékegysége: 1 ft (foot)',
        right: 'Hivatalosan 0,3048 m, gyakorlati közelítéssel 0,3 m (30 cm)'
      },
      {
        id: 'p23',
        left: 'Hasonló háromszögek beírt/körülírt körének sugara',
        right: 'A sugarak aránya pontosan megegyezik az oldalak arányával (r\' / r = λ)'
      },
      {
        id: 'p24',
        left: 'Azonos anyagú hasonló tömör szobrok tömege',
        right: 'A tömeg a térfogattal arányos, ezért a hasonlósági arány köbével skálázódik (λ³)'
      }
    ]
  }
];

export const SimilarityMatcher: React.FC<SimilarityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Hasonlóság – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="hasonlosag"
      title={topicTitle}
      subtitle="Gyakorold a hasonlóság definícióit, kerület-, terület- és térfogatarányait, valamint tervrajzi alkalmazásait!"
      levels={SIMILARITY_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      {...rest}
    />
  );
};

export default SimilarityMatcher;

