import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpecialRightTrianglesMatcherProps {
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
    title: '1. Szint: 45°-45°-90° Háromszög és Négyzet Átlója',
    subtitle: 'Párosítsd az egyenlő szárú derékszögű háromszögek adatait a helyes értékükkel!',
    pairs: [
      {
        id: 'srt-m1-1',
        prompt: 'Befogó a = 5 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 38,23 38,5" fill="#f8fafc" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="24" y="21" className="text-[6.5px] font-bold fill-indigo-800" textAnchor="middle">a=5</text>
          </svg>
        ),
        value: 'Átfogó: 5√2 cm (c = a√2)'
      },
      {
        id: 'srt-m1-2',
        prompt: 'Befogó a = 8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 38,23 38,5" fill="#f8fafc" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="24" y="21" className="text-[6.5px] font-bold fill-indigo-800" textAnchor="middle">a=8</text>
          </svg>
        ),
        value: 'Átfogó: 8√2 cm (c = a√2)'
      },
      {
        id: 'srt-m1-3',
        prompt: 'Átfogó c = 6√2 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 38,23 38,5" fill="#f8fafc" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="20" y="12" className="text-[6px] font-bold fill-purple-800">6√2</text>
          </svg>
        ),
        value: 'Befogók: 6 cm (a = c / √2)'
      },
      {
        id: 'srt-m1-4',
        prompt: 'Átfogó c = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 38,23 38,5" fill="#f8fafc" stroke="#4f46e5" strokeWidth="1.2" />
            <text x="20" y="12" className="text-[6.5px] font-bold fill-purple-800">c=10</text>
          </svg>
        ),
        value: 'Befogók: 5√2 cm (10 / √2 = 5√2)'
      },
      {
        id: 'srt-m1-5',
        prompt: 'Befogók: a = b = 1 cm',
        value: 'Átfogó: √2 cm (egységnyi háromszög)'
      },
      {
        id: 'srt-m1-6',
        prompt: 'Négyzet területe: T = 36 cm²',
        value: 'Átló: 6√2 cm (oldal a = 6)'
      },
      {
        id: 'srt-m1-7',
        prompt: 'Négyzet átlója: d = 4 cm',
        value: 'Terület: 8 cm² (T = d² / 2)'
      },
      {
        id: 'srt-m1-8',
        prompt: '45°-45°-90° oldalarány',
        value: '1 : 1 : √2 (befogó : befogó : átfogó)'
      }
    ]
  },
  2: {
    title: '2. Szint: 30°-60°-90° Félszabályos Háromszög',
    subtitle: 'Párosítsd a félszabályos háromszögek ismert oldalait a keresett oldalhosszakkal!',
    pairs: [
      {
        id: 'srt-m2-1',
        prompt: 'Átfogó c = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 44,23 20,5" fill="#f8fafc" stroke="#7e22ce" strokeWidth="1.2" />
            <text x="34" y="12" className="text-[6px] font-bold fill-indigo-800">c=12</text>
          </svg>
        ),
        value: '30°-os szemközti befogó: 6 cm (fele!)'
      },
      {
        id: 'srt-m2-2',
        prompt: 'Rövid befogó a = 4 cm (30° szemben)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 44,23 20,5" fill="#f8fafc" stroke="#7e22ce" strokeWidth="1.2" />
            <text x="14" y="21" className="text-[6.5px] font-bold fill-purple-800">a=4</text>
          </svg>
        ),
        value: 'Átfogó: 8 cm (c = 2a)'
      },
      {
        id: 'srt-m2-3',
        prompt: 'Rövid befogó a = 5 cm',
        value: 'Hosszú befogó: 5√3 cm (b = a√3)'
      },
      {
        id: 'srt-m2-4',
        prompt: 'Átfogó c = 10 cm',
        value: 'Hosszú befogó: 5√3 cm (60°-kal szemben)'
      },
      {
        id: 'srt-m2-5',
        prompt: 'Hosszú befogó b = 6√3 cm',
        value: 'Rövid befogó: 6 cm (a = b / √3)'
      },
      {
        id: 'srt-m2-6',
        prompt: 'Hosszú befogó b = 4√3 cm',
        value: 'Átfogó: 8 cm (a = 4 ⟹ c = 2a = 8)'
      },
      {
        id: 'srt-m2-7',
        prompt: 'Szabályos 3szög oldala a = 6 cm',
        value: 'Magassága: 3√3 cm (m = a√3 / 2)'
      },
      {
        id: 'srt-m2-8',
        prompt: '30°-60°-90° oldalarány',
        value: '1 : √3 : 2 (rövid : hosszú : átfogó)'
      }
    ]
  },
  3: {
    title: '3. Szint: Gyakorlati és Összetett Feladatok',
    subtitle: 'Párosítsd a geometriai modellek feladványait a pontos vagy kerekített eredményekkel!',
    pairs: [
      {
        id: 'srt-m3-1',
        prompt: 'Szabályos 3szög oldala a = 10 cm',
        value: 'Terület: 25√3 cm² (≈ 43,3 cm²)'
      },
      {
        id: 'srt-m3-2',
        prompt: 'Szabályos hatszög oldala a = 4 cm',
        value: 'Hosszabb átló: 8 cm (d = 2a)'
      },
      {
        id: 'srt-m3-3',
        prompt: 'Szabályos hatszög oldala a = 6 cm',
        value: 'Rövidebb átló: 6√3 cm (≈ 10,39 cm)'
      },
      {
        id: 'srt-m3-4',
        prompt: '60°-os rombusz oldala a = 8 cm',
        value: 'Rövidebb átló: 8 cm (szabályos 3szög)'
      },
      {
        id: 'srt-m3-5',
        prompt: '30°-os emelkedőjű rámpa hossza: 10 m',
        value: 'Magasságemelkedés: 5 m (fele a hossznak)'
      },
      {
        id: 'srt-m3-6',
        prompt: '45°-os tető fél-szélessége: 4 m',
        value: 'Tetőgerinc magassága: 4 m (m = alap/2)'
      },
      {
        id: 'srt-m3-7',
        prompt: 'Egyenlő szárú derékszögű 3szög átfogója: c = 8 cm',
        value: 'Átfogóhoz tartozó magasság: 4 cm (m = c / 2)'
      },
      {
        id: 'srt-m3-8',
        prompt: '60°-ban falnak támasztott 6 m létra talpa',
        value: 'Faltól mért távolság: 3 m (létra fele)'
      }
    ]
  }
};

export const SpecialRightTrianglesMatcher: React.FC<SpecialRightTrianglesMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-special-triangles-matcher',
  topicTitle = 'Nevezetes Derékszögű Háromszögek'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`srt-matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      title={currentConfig.title || 'Párosító Játék • Nevezetes Háromszögek'}
      subtitle={currentConfig.subtitle || 'Kösd össze az arányokat és feladatokat a helyes végeredményükkel!'}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 6. Lecke • Nevezetes Háromszögek"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="indigo"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default SpecialRightTrianglesMatcher;
