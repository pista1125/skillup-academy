import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DirectProportionalitySvg,
  InverseProportionalitySvg,
  ProportionalityComparisonSvg
} from './ProportionalityFigures';

interface ProportionalityMatcherProps {
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
    title: '1. Szint: Arányossági Alapfogalmak és Képletek',
    subtitle: 'Párosítsd a matematikai leírásokat és grafikonformákat az arányosság típusával!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'f(x) = k · x képlet',
        value: 'Egyenes arányosság hozzárendelési szabálya',
        figure: <DirectProportionalitySvg size={70} />
      },
      {
        id: 'pm1-2',
        prompt: 'g(x) = k / x képlet',
        value: 'Fordított arányosság hozzárendelési szabálya',
        figure: <InverseProportionalitySvg size={70} />
      },
      {
        id: 'pm1-3',
        prompt: 'y / x = k állandó',
        value: 'Egyenes arányosság invariánsa (állandó hányados)'
      },
      {
        id: 'pm1-4',
        prompt: 'x · y = k állandó',
        value: 'Fordított arányosság invariánsa (állandó szorzat)'
      },
      {
        id: 'pm1-5',
        prompt: 'Origón átmenő egyenes',
        value: 'Egyenes arányosság grafikonja'
      },
      {
        id: 'pm1-6',
        prompt: 'Kétágú hiperbola (x ≠ 0)',
        value: 'Fordított arányosság grafikonja'
      }
    ]
  },
  2: {
    title: '2. Szint: Arányossági Tényező és Pontok',
    subtitle: 'Számold ki k értékét vagy a megfelelő összefüggést a pont koordinátáiból!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'P(3; 15) pont egyenes arányosságon',
        value: 'k = 15 / 3 = 5 ➔ f(x) = 5x'
      },
      {
        id: 'pm2-2',
        prompt: 'P(4; 5) pont fordított arányosságon',
        value: 'k = 4 · 5 = 20 ➔ g(x) = 20 / x'
      },
      {
        id: 'pm2-3',
        prompt: 'P(-2; 6) pont egyenes arányosságon',
        value: 'k = 6 / (-2) = -3 ➔ f(x) = -3x'
      },
      {
        id: 'pm2-4',
        prompt: 'P(-3; 8) pont fordított arányosságon',
        value: 'k = -3 · 8 = -24 ➔ g(x) = -24 / x'
      },
      {
        id: 'pm2-5',
        prompt: 'k > 0 fordított arányosságnál',
        value: 'Hiperbola ágai az I. és III. síknegyedben futnak'
      },
      {
        id: 'pm2-6',
        prompt: 'k < 0 fordított arányosságnál',
        value: 'Hiperbola ágai a II. és IV. síknegyedben futnak'
      }
    ]
  },
  3: {
    title: '3. Szint: Gyakorlati Modellhelyzetek',
    subtitle: 'Párosítsd a valós életbeli helyzetet a pontos matematikai modellel!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'Vásárolt alma tömege (m) és ára (Á)',
        value: 'Egyenes arányosság: Á = egységár · m'
      },
      {
        id: 'pm3-2',
        prompt: 'Adott távolság megtételéhez szükséges idő és a sebesség',
        value: 'Fordított arányosság: t = s / v (v · t = s)'
      },
      {
        id: 'pm3-3',
        prompt: 'Fix 36 m² alapterületű szoba oldalhosszúságai (a és b)',
        value: 'Fordított arányosság: b = 36 / a (a · b = 36)'
      },
      {
        id: 'pm3-4',
        prompt: 'Állandó sebességgel haladó vonat által megtett út és az idő',
        value: 'Egyenes arányosság: s = v · t'
      },
      {
        id: 'pm3-5',
        prompt: 'Medence feltöltési ideje és a beömlő csövek száma',
        value: 'Fordított arányosság: idő = összmunka / csövek'
      },
      {
        id: 'pm3-6',
        prompt: 'Dolgozat pontszáma és a megszerzett százalékos eredmény',
        value: 'Egyenes arányosság: százalék = k · pontszám'
      }
    ]
  }
};

export const ProportionalityMatcher: React.FC<ProportionalityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'az-egyenes-es-forditott-aranyossag-fuggvenye',
  topicTitle = 'Az egyenes és fordított arányosság függvénye'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-aranyossag-matcher"
    />
  );
};

