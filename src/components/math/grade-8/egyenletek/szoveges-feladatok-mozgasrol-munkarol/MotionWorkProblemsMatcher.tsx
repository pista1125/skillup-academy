import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MotionWorkProblemsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapképletek és Mértékegység Átváltások',
    subtitle: 'Párosítsd a mozgás és munka alapfogalmait a helyes matematikai kifejezéssel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Megtett út kiszámítása egyenletes mozgásnál',
        value: 's = v · t'
      },
      {
        id: 'p2',
        prompt: 'Sebesség kiszámítása',
        value: 'v = s / t'
      },
      {
        id: 'p3',
        prompt: 'Eltelt idő kiszámítása',
        value: 't = s / v'
      },
      {
        id: 'p4',
        prompt: '45 perc átváltása órára',
        value: '3 / 4 óra = 0,75 h'
      },
      {
        id: 'p5',
        prompt: '30 perc átváltása órára',
        value: '1 / 2 óra = 0,5 h'
      },
      {
        id: 'p6',
        prompt: '15 perc átváltása órára',
        value: '1 / 4 óra = 0,25 h'
      },
      {
        id: 'p7',
        prompt: '1 óra alatt elvégzett munkarész (t idő esetén)',
        value: '1 / t rész (teljesítmény)'
      },
      {
        id: 'p8',
        prompt: '10 m/s átváltása km/h-ba',
        value: '36 km/h (szorozva 3,6-del)'
      },
      {
        id: 'p9',
        prompt: 'Folyásirányban lefelé haladó hajó sebessége',
        value: 'v_saját + v_folyó'
      },
      {
        id: 'p10',
        prompt: 'Folyásiránnyal szemben haladó hajó sebessége',
        value: 'v_saját - v_folyó'
      }
    ]
  },
  2: {
    title: '2. Szint: Mozgásos és Munkavégzési Modellek',
    subtitle: 'Kösd össze a szöveges szituációt a hozzá tartozó alapegyenlettel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Egymással szembe haladás (találkozás)',
        value: 's₁ + s₂ = s_össz → (v₁ + v₂) · t = s'
      },
      {
        id: 'p2',
        prompt: 'Utolérés azonos pontból, későbbi indulással',
        value: 'v_gyors · t = v_lassú · (t + t_előny)'
      },
      {
        id: 'p3',
        prompt: 'Kezdeti s₀ előny ledolgozása utolérésnél',
        value: 't = s₀ / (v_gyors - v_lassú)'
      },
      {
        id: 'p4',
        prompt: 'Két csap együttes medencetöltési egyenlete',
        value: '1 / t₁ + 1 / t₂ = 1 / t_együtt'
      },
      {
        id: 'p5',
        prompt: 'Töltő csap és nyitott lefolyó együttes működése',
        value: '1 / t_töltő - 1 / t_lefolyó = 1 / t_eredő'
      },
      {
        id: 'p6',
        prompt: '1. jármű már ment 1 órát, majd szembe indul a 2.',
        value: 'v₁ · (t + 1) + v₂ · t = s_össz'
      },
      {
        id: 'p7',
        prompt: 'Azonos útszakaszok oda-vissza átlagsebessége',
        value: 'Harmonikus átlag: 2·v₁·v₂ / (v₁ + v₂)'
      },
      {
        id: 'p8',
        prompt: 'Tamás 6h, Péter 3h alatt végez',
        value: '1/6 + 1/3 = 1/2 → t_együtt = 2 óra'
      },
      {
        id: 'p9',
        prompt: '60 km/h és 40 km/h szembehaladás, 200 km táv',
        value: 't = 200 / (60 + 40) = 2 óra'
      },
      {
        id: 'p10',
        prompt: 'Gyalogos 4 km/h, 3h előny, bicikli 16 km/h',
        value: 't = 12 / (16 - 4) = 1 óra'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos Feladatok és Eredmények',
    subtitle: 'Párosítsd a mozgásos és munkavégzési feladatokat a pontos eredménnyel!',
    pairs: [
      {
        id: 'p1',
        prompt: '180 km távolság, 50 és 40 km/h szembe',
        value: '2 óra múlva találkoznak'
      },
      {
        id: 'p2',
        prompt: 'Tamás 12h, Gábor 6h alatt végez a munkával',
        value: '4 óra közös munkával'
      },
      {
        id: 'p3',
        prompt: 'Gyalogos 5 km/h (2h előny), kerékpár 15 km/h',
        value: '1 óra alatt éri utol (15 km-nél)'
      },
      {
        id: 'p4',
        prompt: 'Hajó sajátja 22 km/h, folyó 3 km/h, 4h lefelé',
        value: '100 km megtett út'
      },
      {
        id: 'p5',
        prompt: 'Töltő csap 4h alatt tölt, lefolyó 6h alatt ürít',
        value: '12 óra alatt telik meg a tartály'
      },
      {
        id: 'p6',
        prompt: '240 km távolság, 70 és 50 km/h szembehaladás',
        value: '2 óra múlva találkoznak'
      },
      {
        id: 'p7',
        prompt: 'Festés: 15h és 10h egyedüli időkkel közösen',
        value: '6 óra alatt kész'
      },
      {
        id: 'p8',
        prompt: 'Autós: 60 km/h oda, 40 km/h vissza átlagsebessége',
        value: '48 km/h átlagsebesség'
      },
      {
        id: 'p9',
        prompt: 'Csónak 18 km/h, folyó 2 km/h, 3h felfelé',
        value: '48 km megtett út'
      },
      {
        id: 'p10',
        prompt: '3 munkás: 6h, 12h és 4h egyedüli időkkel együtt',
        value: '2 óra alatt végeznek'
      }
    ]
  }
};

export const MotionWorkProblemsMatcher: React.FC<MotionWorkProblemsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-motion-work-matcher',
  topicTitle = 'Mozgás és Munka Párosító'
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Mozgás és Munka Párosító"
      subtitle="Párosítsd a kifejezéseket, mozgásos képleteket és a pontos végeredményeket!"
      badge="PÁROSÍTÓ JÁTÉK"
      themeColor="blue"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default MotionWorkProblemsMatcher;
