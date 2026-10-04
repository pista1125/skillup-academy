import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter5PythagorasSummaryMatcherProps {
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
    title: '1. Szint: Alapösszefüggések és Alapvető Számítások',
    subtitle: 'Párosítsd a fejezeti alaptételeket és pitagoraszi számhármasokat a megoldásukkal!',
    pairs: [
      {
        id: 'sum-m1-1',
        prompt: 'Pitagorasz-tétel alapegyenlete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 42,23 10,5" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
            <text x="24" y="21" className="text-[6px] font-bold fill-amber-800" textAnchor="middle">a²+b²</text>
          </svg>
        ),
        value: 'a² + b² = c² (derékszögű 3szögben)'
      },
      {
        id: 'sum-m1-2',
        prompt: 'Befogók: 3 cm és 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 38,23 10,7" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
            <text x="24" y="21" className="text-[6px] font-bold fill-amber-800" textAnchor="middle">3 és 4</text>
          </svg>
        ),
        value: 'Átfogó: 5 cm (3-4-5 számhármas)'
      },
      {
        id: 'sum-m1-3',
        prompt: 'Befogók: 5 cm és 12 cm',
        value: 'Átfogó: 13 cm (5-12-13 számhármas)'
      },
      {
        id: 'sum-m1-4',
        prompt: 'Átfogó: 10 cm, egyik befogó: 6 cm',
        value: 'Másik befogó: 8 cm (√(100 - 36))'
      },
      {
        id: 'sum-m1-5',
        prompt: 'Négyzet oldala a = 5 cm',
        value: 'Átló: 5√2 cm (d = a√2)'
      },
      {
        id: 'sum-m1-6',
        prompt: 'Téglalap oldalai: 6 cm és 8 cm',
        value: 'Átló: 10 cm (√(36 + 64))'
      },
      {
        id: 'sum-m1-7',
        prompt: 'Egyiptomi 12 csomós zsinór arányai',
        value: '3 : 4 : 5 arányú derékszög'
      },
      {
        id: 'sum-m1-8',
        prompt: 'Háromszög oldalai: 7 cm, 24 cm, 25 cm',
        value: 'Derékszögű háromszög (49 + 576 = 625)'
      }
    ]
  },
  2: {
    title: '2. Szint: Síkbeli és Nevezetes Háromszögek',
    subtitle: 'Párosítsd a síkgeometriai feladatokat és arányokat a pontos eredményekkel!',
    pairs: [
      {
        id: 'sum-m2-1',
        prompt: 'Szabályos 3szög oldala a = 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,5 10,23 44,23" fill="#f8fafc" stroke="#ea580c" strokeWidth="1.2" />
            <line x1="27" y1="5" x2="27" y2="23" stroke="#ea580c" strokeWidth="1" strokeDasharray="2,1" />
          </svg>
        ),
        value: 'Magassága: 3√3 cm (m = a√3 / 2)'
      },
      {
        id: 'sum-m2-2',
        prompt: 'Szabályos 3szög oldala a = 4 cm',
        value: 'Területe: 4√3 cm² (T = a²√3 / 4)'
      },
      {
        id: 'sum-m2-3',
        prompt: '30°-60°-90° háromszög átfogója c = 14 cm',
        value: '30°-kal szemközti oldal: 7 cm (c/2)'
      },
      {
        id: 'sum-m2-4',
        prompt: '45°-45°-90° háromszög átfogója c = 8 cm',
        value: 'Befogó: 4√2 cm (8 / √2)'
      },
      {
        id: 'sum-m2-5',
        prompt: 'Rombusz átlói e = 12 cm, f = 16 cm',
        value: 'Oldala: 10 cm (félátlók: 6 és 8 cm)'
      },
      {
        id: 'sum-m2-6',
        prompt: 'Egyenlő szárú trapéz: a=16, c=10, szár b=5',
        value: 'Magassága: 4 cm (x = (16-10)/2 = 3)'
      },
      {
        id: 'sum-m2-7',
        prompt: 'Háromszög oldalai: 5 cm, 6 cm, 7 cm',
        value: 'Hegyesszögű háromszög (49 < 25 + 36)'
      },
      {
        id: 'sum-m2-8',
        prompt: 'Háromszög oldalai: 4 cm, 5 cm, 7 cm',
        value: 'Tompaszögű háromszög (49 > 16 + 25)'
      }
    ]
  },
  3: {
    title: '3. Szint: Térbeli Testátlók és Felvételi Feladványok',
    subtitle: 'Párosítsd a térbeli és összetett feladatokat a pontos vagy kerekített értékeikkel!',
    pairs: [
      {
        id: 'sum-m3-1',
        prompt: 'Kocka éle a = 5 cm',
        value: 'Testátló: 5√3 cm (D = a√3)'
      },
      {
        id: 'sum-m3-2',
        prompt: 'Kocka éle a = 6 cm',
        value: 'Lapátló: 6√2 cm (d = a√2)'
      },
      {
        id: 'sum-m3-3',
        prompt: 'Téglatest élei: 2 cm, 3 cm, 6 cm',
        value: 'Testátló: 7 cm (√(4 + 9 + 36))'
      },
      {
        id: 'sum-m3-4',
        prompt: 'Téglatest élei: 1 cm, 4 cm, 8 cm',
        value: 'Testátló: 9 cm (√(1 + 16 + 64))'
      },
      {
        id: 'sum-m3-5',
        prompt: 'Szabályos hatszög oldala a = 6 cm',
        value: 'Főátló: 12 cm, kis átló: 6√3 cm'
      },
      {
        id: 'sum-m3-6',
        prompt: 'Kör sugara r = 10 cm, húr hossza 16 cm',
        value: 'Húr távolsága a kp-tól: 6 cm (√(100-64))'
      },
      {
        id: 'sum-m3-7',
        prompt: 'Theodórosz spirál 3. átfogója',
        value: '√4 = 2 egység (√1=1, √2, √3, √4...)'
      },
      {
        id: 'sum-m3-8',
        prompt: 'Négyzet alapú gúla: alapél a=6, oldalél b=5',
        value: 'Oldallap magassága: 4 cm (√(25 - 9))'
      }
    ]
  }
};

export const Chapter5PythagorasSummaryMatcher: React.FC<Chapter5PythagorasSummaryMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-summary-matcher',
  topicTitle = 'V. Fejezet Összefoglalás'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`sum-matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      title={currentConfig.title || 'Párosító Játék • V. Fejezet Összefoglalás'}
      subtitle={currentConfig.subtitle || 'Kösd össze az összefüggéseket és feladatokat a pontos megoldásukkal!'}
      badge="8. Osztály • V. Fejezet"
      topicBadge="🏆 V. Fejezet • Témazáró Párosító"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="amber"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default Chapter5PythagorasSummaryMatcher;
