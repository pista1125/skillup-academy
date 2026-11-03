import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BreakEvenSvg, ProjectileMotionSvg, GeometricOptSvg } from './PracticalFigures';

export interface PracticalMatcherProps {
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
    title: '1. Szint: Gazdasági és Modellezési Alapfogalmak',
    subtitle: 'Párosítsd a kifejezéseket a hétköznapi és matematikai jelentésükkel!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'Fix költség (K_fix)',
        value: 'A termelt vagy eladott mennyiségtől független állandó kiadás (pl. bérleti díj)',
        figure: <BreakEvenSvg size={70} />
      },
      {
        id: 'pm1-2',
        prompt: 'Változó költség (v · x)',
        value: 'A darabszámmal arányosan növekvő gyártási és alapanyag-kiadás'
      },
      {
        id: 'pm1-3',
        prompt: 'Árbevétel (B(x) = p · x)',
        value: 'A termékek vagy szolgáltatások eladásából befolyó teljes bruttó pénzösszeg'
      },
      {
        id: 'pm1-4',
        prompt: 'Nyereség / Profit (P(x))',
        value: 'Az árbevétel és az összköltség különbsége: P(x) = B(x) - K(x)'
      },
      {
        id: 'pm1-5',
        prompt: 'Fedezeti pont (Break-even)',
        value: 'Az eladott darabszám, ahol a bevétel éppen fedezi az összes költséget (P(x) = 0)'
      },
      {
        id: 'pm1-6',
        prompt: 'Fékút négyzetes törvénye (s = k · v²)',
        value: 'Ha megduplázzuk a sebességet, a fékút négyszeresére nő'
      }
    ]
  },
  2: {
    title: '2. Szint: Hétköznapi Szituációk és Képletek',
    subtitle: 'Párosítsd a szöveges leírásokat a hozzájuk tartozó matematikai függvénnyel!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'Taxi: 1000 Ft alapdíj + 450 Ft kilométerenként',
        value: 'f(x) = 1000 + 450x (x: megtett kilométerek száma)'
      },
      {
        id: 'pm2-2',
        prompt: 'Függőleges felhajítás 30 m/s kezdősebességgel a talajról',
        value: 'h(t) = -5t² + 30t (t: eltelt másodpercek)',
        figure: <ProjectileMotionSvg size={70} />
      },
      {
        id: 'pm2-3',
        prompt: '40 méter kerítésből 4 oldalú téglalap területe',
        value: 'T(x) = x · (20 - x) = -x² + 20x (x: egyik oldal hossza)'
      },
      {
        id: 'pm2-4',
        prompt: 'Víztartály ürülése: 500 literből 25 liter/perc sebességgel',
        value: 'V(t) = 500 - 25t (t: eltelt percek, 0 ≤ t ≤ 20)'
      },
      {
        id: 'pm2-5',
        prompt: 'Kiszállási díj 6000 Ft + 4000 Ft minden megkezdett munkaóra',
        value: 'f(t) = 6000 + 4000t (lineáris költségfüggvény)'
      },
      {
        id: 'pm2-6',
        prompt: 'Folyóparti 3 oldalas kerítés 60 m dróthálóból',
        value: 'T(x) = x · (60 - 2x) = -2x² + 60x',
        figure: <GeometricOptSvg size={70} />
      }
    ]
  },
  3: {
    title: '3. Szint: Kiszámított Eredmények',
    subtitle: 'Párosítsd a feladatokat a pontos számszerű végeredménnyel!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'K(x) = 60 000 + 1500x, B(x) = 3500x fedezeti darabszáma',
        value: 'x = 30 darab (mert 60 000 / (3500 - 1500) = 30)'
      },
      {
        id: 'pm3-2',
        prompt: 'h(t) = -5t² + 40t kő mozgásának maximális magassága',
        value: 'h_max = 80 méter (t = 4 s csúcsponton)'
      },
      {
        id: 'pm3-3',
        prompt: 'Autó fékútja 50 km/h-nál 20 m. Mennyi 100 km/h-nál?',
        value: '80 méter (kétszeres sebesség ⟹ 2² = 4-szeres fékút)'
      },
      {
        id: 'pm3-4',
        prompt: 'V(t) = 600 - 30t tartály kiürülésének időpontja',
        value: 't = 20 perc múlva (V(t) = 0 zérushely)'
      },
      {
        id: 'pm3-5',
        prompt: '36 cm kerületű téglalapok közül a maximális terület',
        value: 'T_max = 81 cm² (9 cm × 9 cm négyzet esetén)'
      },
      {
        id: 'pm3-6',
        prompt: 'Folyóparti kerítés L = 40 m esetén elérhető legnagyobb terület',
        value: 'T_max = 200 m² (x = 10 m, y = 20 m mellett)'
      }
    ]
  }
};

export const PracticalMatcher: React.FC<PracticalMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'gyakorlati-feladatok',
  topicTitle = 'Gyakorlati Feladatok & Modellezés'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      title="Gyakorlati Modellezés Párosító"
      subtitle="Kapcsold össze a hétköznapi gazdasági és fizikai feladatokat a képletükkel és megoldásukkal!"
      levels={matcherLevels}
      currentLevel={activeLevel}
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

