import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TangentConstructionSVG,
  TangentLengthPythagorasSVG,
  RightTriangleConstructionSVG
} from './ThalesAppsFigures';

interface ThalesAppsMatcherProps {
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

export const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Szerkesztési Lépések és Alapfogalmak',
    subtitle: 'Párosítsd a szerkesztési fogalmakat a megfelelő geometriai definícióval!',
    pairs: [
      {
        id: 'tam1-1',
        prompt: 'Érintők szerkesztése külső P pontból',
        value: 'Az OP szakasz mint átmérő fölé rajzolt Thalész-kör segítségével',
        figure: <TangentConstructionSVG size={65} />
      },
      {
        id: 'tam1-2',
        prompt: 'Érintőszakaszok egyenlősége',
        value: '|PE_1| = |PE_2| (a külső pontból húzott két érintőszakasz hossza megegyezik)',
        figure: <TangentLengthPythagorasSVG size={65} />
      },
      {
        id: 'tam1-3',
        prompt: 'Derékszög az érintési pontban',
        value: 'Az érintési ponthoz húzott sugár merőleges az érintőre (OE ⟂ PE)'
      },
      {
        id: 'tam1-4',
        prompt: 'Derékszögű háromszög szerkeszthetősége (c és m_c)',
        value: 'Csak akkor szerkeszthető meg, ha m_c ≤ c / 2 (a magasság legfeljebb a sugár)',
        figure: <RightTriangleConstructionSVG size={65} />
      },
      {
        id: 'tam1-5',
        prompt: 'Az O-E_1-P-E_2 négyszög alakja',
        value: 'Tengelyesen szimmetrikus deltoid, szimmetriatengelye az OP egyenes'
      },
      {
        id: 'tam1-6',
        prompt: 'A Thalész-kör átmérője érintőszerkesztésnél',
        value: 'Az OP szakasz (a kör középpontját és a külső pontot összekötő szakasz)'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Érintőtulajdonságok',
    subtitle: 'Keresd meg az érintőkkel és háromszögekkel kapcsolatos matematikai szabályokat!',
    pairs: [
      {
        id: 'tam2-1',
        prompt: 'Érintőszakasz hossza Pitagorasz-tétellel',
        value: 'e = √(d² - r²) (ahol d = |OP| a pont távolsága, r a sugár)'
      },
      {
        id: 'tam2-2',
        prompt: 'Érintődeltoid területe',
        value: 'T = r · e (a sugár és az érintőszakasz szorzata)'
      },
      {
        id: 'tam2-3',
        prompt: 'Körhöz külső pontból húzható érintők száma',
        value: 'Pontosan 2 darab érintő egyenes húzható'
      },
      {
        id: 'tam2-4',
        prompt: 'Körvonalon lévő pontból húzható érintők száma',
        value: 'Pontosan 1 darab érintő (merőleges a sugárra)'
      },
      {
        id: 'tam2-5',
        prompt: 'Körön belüli pontból húzható érintők száma',
        value: '0 darab (belső pontból nem húzható érintő)'
      },
      {
        id: 'tam2-6',
        prompt: 'Az OP szakasz szerepe a szögben',
        value: 'Felezi a két érintő által bezárt szöget (szögfelező)'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Méretszámítási Feladatok',
    subtitle: 'Párosítsd a feladatokat a pontos numerikus eredménnyel!',
    pairs: [
      {
        id: 'tam3-1',
        prompt: 'Kör sugara r = 6 cm, a külső pont távolsága d = 10 cm. Mennyi az érintőszakasz?',
        value: '8 cm (mert e = √(10² - 6²) = √64 = 8 cm)'
      },
      {
        id: 'tam3-2',
        prompt: 'Kör sugara r = 5 cm, a külső pont távolsága d = 13 cm. Mennyi az érintőszakasz?',
        value: '12 cm (mert e = √(13² - 5²) = √144 = 12 cm)'
      },
      {
        id: 'tam3-3',
        prompt: 'Az érintőszakasz e = 15 cm, a kör sugara r = 8 cm. Milyen messze van P a középponttól?',
        value: '17 cm (mert d = √(15² + 8²) = √289 = 17 cm)'
      },
      {
        id: 'tam3-4',
        prompt: 'Ha a derékszögű háromszög átfogója c = 14 cm, mennyi lehet a magassága maximum?',
        value: '7 cm (mert m_max = c / 2 = 14 / 2 = 7 cm)'
      },
      {
        id: 'tam3-5',
        prompt: 'Mennyi az érintődeltoid területe, ha r = 5 cm és az érintőszakasz e = 12 cm?',
        value: '60 cm² (mert T = r · e = 5 · 12 = 60 cm²)'
      },
      {
        id: 'tam3-6',
        prompt: 'Egy derékszögű háromszögben c = 20 cm és a = 12 cm. Mekkora a másik befogó?',
        value: '16 cm (mert b = √(20² - 12²) = √256 = 16 cm)'
      }
    ]
  }
};

export const ThalesAppsMatcher: React.FC<ThalesAppsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A Thalész-tétel alkalmazásai'
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
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-thales-apps-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

