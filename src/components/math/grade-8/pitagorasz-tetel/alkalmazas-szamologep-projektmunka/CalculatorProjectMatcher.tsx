import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CalculatorProjectMatcherProps {
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
    title: '1. Szint: Számológépes Műveletek és Négyzetek',
    subtitle: 'Párosítsd a gyök alatti kifejezéseket a pontos értékükkel!',
    pairs: [
      {
        id: 'cpj-m1-1',
        prompt: '√(4² + 3²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[7px] font-bold fill-sky-800" textAnchor="middle">√(16+9)</text>
          </svg>
        ),
        value: '5 (egész szám: √25)'
      },
      {
        id: 'cpj-m1-2',
        prompt: '√(1.2² + 1.6²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6px] font-bold fill-sky-800" textAnchor="middle">√(1.44+2.56)</text>
          </svg>
        ),
        value: '2 (pontos tizedes tört: √4)'
      },
      {
        id: 'cpj-m1-3',
        prompt: '√(5² + 12²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6.5px] font-bold fill-sky-800" textAnchor="middle">√(25+144)</text>
          </svg>
        ),
        value: '13 (egész szám: √169)'
      },
      {
        id: 'cpj-m1-4',
        prompt: '√(1.5² + 2²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6px] font-bold fill-sky-800" textAnchor="middle">√(2.25+4)</text>
          </svg>
        ),
        value: '2,5 (véges tizedes: √6.25)'
      },
      {
        id: 'cpj-m1-5',
        prompt: '√(7² + 24²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6.5px] font-bold fill-sky-800" textAnchor="middle">√(49+576)</text>
          </svg>
        ),
        value: '25 (egész szám: √625)'
      },
      {
        id: 'cpj-m1-6',
        prompt: '√(0.6² + 0.8²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6px] font-bold fill-sky-800" textAnchor="middle">√(0.36+0.64)</text>
          </svg>
        ),
        value: '1,0 (pontos érték: √1)'
      },
      {
        id: 'cpj-m1-7',
        prompt: '√(10² - 6²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6.5px] font-bold fill-sky-800" textAnchor="middle">√(100-36)</text>
          </svg>
        ),
        value: '8 (befogó: √64)'
      },
      {
        id: 'cpj-m1-8',
        prompt: '√(2.5² - 1.5²)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="3" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[6px] font-bold fill-sky-800" textAnchor="middle">√(6.25-2.25)</text>
          </svg>
        ),
        value: '2,0 (befogó: √4)'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyökök Becslése és Kerekítése',
    subtitle: 'Párosítsd a négyzetgyököket a szomszédos egész számok közötti elhelyezkedésükkel!',
    pairs: [
      {
        id: 'cpj-m2-1',
        prompt: '√50 értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-black fill-cyan-800" textAnchor="middle">49 &lt; 50 &lt; 64</text>
          </svg>
        ),
        value: '7 és 8 között (≈ 7,07)'
      },
      {
        id: 'cpj-m2-2',
        prompt: '√80 értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-black fill-cyan-800" textAnchor="middle">64 &lt; 80 &lt; 81</text>
          </svg>
        ),
        value: '8 és 9 között (≈ 8,94)'
      },
      {
        id: 'cpj-m2-3',
        prompt: '√20 értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-black fill-cyan-800" textAnchor="middle">16 &lt; 20 &lt; 25</text>
          </svg>
        ),
        value: '4 és 5 között (≈ 4,47)'
      },
      {
        id: 'cpj-m2-4',
        prompt: '√10 értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-black fill-cyan-800" textAnchor="middle">9 &lt; 10 &lt; 16</text>
          </svg>
        ),
        value: '3 és 4 között (≈ 3,16)'
      },
      {
        id: 'cpj-m2-5',
        prompt: '√120 értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-black fill-cyan-800" textAnchor="middle">100 &lt; 120 &lt; 121</text>
          </svg>
        ),
        value: '10 és 11 között (≈ 10,95)'
      },
      {
        id: 'cpj-m2-6',
        prompt: '√99 értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-black fill-cyan-800" textAnchor="middle">81 &lt; 99 &lt; 100</text>
          </svg>
        ),
        value: '9 és 10 között, szinte 10 (≈ 9,95)'
      },
      {
        id: 'cpj-m2-7',
        prompt: '√2 kerekítve',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-bold fill-cyan-800" textAnchor="middle">1.4142135...</text>
          </svg>
        ),
        value: '1,41 (két tizedesjegyre)'
      },
      {
        id: 'cpj-m2-8',
        prompt: '√3 kerekítve',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-bold fill-cyan-800" textAnchor="middle">1.7320508...</text>
          </svg>
        ),
        value: '1,73 (két tizedesjegyre)'
      }
    ]
  },
  3: {
    title: '3. Szint: Theodórosz Spirálja és Szakaszok',
    subtitle: 'Párosítsd a spirál lépéseit és a szerkesztési feladatokat a pontos eredménnyel!',
    pairs: [
      {
        id: 'cpj-m3-1',
        prompt: 'Spirál 1. átfogója (1 és 1 befogók)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,22 36,22 36,10" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
          </svg>
        ),
        value: 'c = √2 cm (1² + 1² = 2)'
      },
      {
        id: 'cpj-m3-2',
        prompt: 'Spirál 2. átfogója (√2 és 1 befogók)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,22 36,22 26,8" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
          </svg>
        ),
        value: 'c = √3 cm ((√2)² + 1² = 3)'
      },
      {
        id: 'cpj-m3-3',
        prompt: 'Spirál 3. átfogója (√3 és 1 befogók)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-bold fill-indigo-700" textAnchor="middle">√3 és 1</text>
          </svg>
        ),
        value: 'c = √4 = 2 cm (egész szám!)'
      },
      {
        id: 'cpj-m3-4',
        prompt: 'Spirál 4. átfogója (2 és 1 befogók)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-bold fill-indigo-700" textAnchor="middle">2 és 1</text>
          </svg>
        ),
        value: 'c = √5 cm (2² + 1² = 5)'
      },
      {
        id: 'cpj-m3-5',
        prompt: 'Spirál 8. átfogója (√8 és 1 befogók)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-bold fill-indigo-700" textAnchor="middle">√8 és 1</text>
          </svg>
        ),
        value: 'c = √9 = 3 cm (egész szám!)'
      },
      {
        id: 'cpj-m3-6',
        prompt: 'Spirál 15. átfogója (√15 és 1 befogók)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-bold fill-indigo-700" textAnchor="middle">√15 és 1</text>
          </svg>
        ),
        value: 'c = √16 = 4 cm (egész szám!)'
      },
      {
        id: 'cpj-m3-7',
        prompt: '√13 cm szerkesztése közvetlenül',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">13 = 4 + 9</text>
          </svg>
        ),
        value: '2 cm és 3 cm befogójú háromszöggel'
      },
      {
        id: 'cpj-m3-8',
        prompt: '√17 cm szerkesztése közvetlenül',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">17 = 16 + 1</text>
          </svg>
        ),
        value: '4 cm és 1 cm befogójú háromszöggel'
      }
    ]
  }
};

export const CalculatorProjectMatcher: React.FC<CalculatorProjectMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-calculator-matcher',
  topicTitle = 'Számológép és Projektmunka'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`cpj-matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      title={currentConfig.title || 'Párosító Játék • Számológép & Projektmunka'}
      subtitle={currentConfig.subtitle || 'Kösd össze a számológépes és szerkesztési feladatokat a megoldásukkal!'}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="🧮 5. Lecke • Számológép és Projekt"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="cyan"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default CalculatorProjectMatcher;
