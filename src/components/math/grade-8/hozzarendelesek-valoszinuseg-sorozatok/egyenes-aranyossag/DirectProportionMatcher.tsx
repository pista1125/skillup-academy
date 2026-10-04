import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MathText } from '@/components/math/shared/MathText';

interface DirectProportionMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Alapösszefüggések',
    subtitle: 'Párosítsd az egyenes arányosság fogalmait, képleteit és grafikonjának tulajdonságait!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Arányossági tényező (k)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7.5px] font-black fill-cyan-800" textAnchor="middle">k = y / x</text>
          </svg>
        ),
        value: 'Az összetartozó értékpárok állandó hányadosa: k = y / x'
      },
      {
        id: 'p2',
        prompt: 'Hozzárendelési szabály',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7.5px] font-black fill-emerald-800" textAnchor="middle">y = k · x</text>
          </svg>
        ),
        value: 'Képlet: x-hez hozzárendeljük a k · x értéket'
      },
      {
        id: 'p3',
        prompt: 'Origón való áthaladás',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="14" x2="42" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="27" cy="14" r="2.5" fill="#0891b2" />
            <text x="27" y="22" className="text-[5px] font-bold fill-cyan-900" textAnchor="middle">O(0;0)</text>
          </svg>
        ),
        value: 'x = 0 esetén mindig y = 0, így az egyenes átmegy a (0; 0) ponton'
      },
      {
        id: 'p4',
        prompt: 'Pozitív meredekség (k > 0)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="22" x2="44" y2="6" stroke="#059669" strokeWidth="2" />
            <text x="27" y="24" className="text-[5.5px] font-bold fill-emerald-700" textAnchor="middle">k &gt; 0</text>
          </svg>
        ),
        value: 'Balról jobbra emelkedő egyenes az I. és III. síknegyedben'
      },
      {
        id: 'p5',
        prompt: 'Negatív meredekség (k < 0)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="6" x2="44" y2="22" stroke="#e11d48" strokeWidth="2" />
            <text x="27" y="24" className="text-[5.5px] font-bold fill-rose-700" textAnchor="middle">k &lt; 0</text>
          </svg>
        ),
        value: 'Balról jobbra lejtő egyenes a II. és IV. síknegyedben'
      },
      {
        id: 'p6',
        prompt: 'I. és III. negyed szögfelezője',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="24" x2="40" y2="4" stroke="#4f46e5" strokeWidth="1.8" />
            <text x="27" y="22" className="text-[6px] font-black fill-indigo-700" textAnchor="middle">y = x</text>
          </svg>
        ),
        value: 'y = x egyenes, ahol az arányossági tényező k = 1'
      },
      {
        id: 'p7',
        prompt: 'II. és IV. negyed szögfelezője',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="4" x2="40" y2="24" stroke="#ea580c" strokeWidth="1.8" />
            <text x="27" y="22" className="text-[6px] font-black fill-orange-700" textAnchor="middle">y = -x</text>
          </svg>
        ),
        value: 'y = -x egyenes, ahol az arányossági tényező k = -1'
      },
      {
        id: 'p8',
        prompt: 'Azonos arányú változás',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="14" y="12" className="text-[6px] font-bold fill-slate-700">x · 3</text>
            <text x="36" y="12" className="text-[6px] font-bold fill-cyan-700">y · 3</text>
            <path d="M 22 10 L 28 10" stroke="#06b6d4" strokeWidth="1.5" />
          </svg>
        ),
        value: 'Ha az egyik mennyiség 3-szorosára nő, a másik is 3-szorosára nő'
      }
    ]
  },
  2: {
    title: '2. Szint: Értékpárok és Arányossági Tényezők',
    subtitle: 'Párosítsd az adott értékpárokat a hozzájuk tartozó arányossági tényezővel és képlettel!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'x = 4 esetén y = 28',
        value: 'k = 7 (képlete: y = 7x)'
      },
      {
        id: 'p2-2',
        prompt: 'x = 6 esetén y = 15',
        value: 'k = 2,5 (képlete: y = 2,5x)'
      },
      {
        id: 'p2-3',
        prompt: 'x = -3 esetén y = 18',
        value: 'k = -6 (képlete: y = -6x)'
      },
      {
        id: 'p2-4',
        prompt: 'x = 5 esetén y = -10',
        value: 'k = -2 (képlete: y = -2x)'
      },
      {
        id: 'p2-5',
        prompt: 'x = 8 esetén y = 2',
        value: 'k = 0,25 vagy 1/4 (képlete: y = 0,25x)'
      },
      {
        id: 'p2-6',
        prompt: 'x = 10 esetén y = 4',
        value: 'k = 0,4 vagy 2/5 (képlete: y = 0,4x)'
      },
      {
        id: 'p2-7',
        prompt: 'Átmegy a P(-2; -10) ponton',
        value: 'k = 5 (képlete: y = 5x)'
      },
      {
        id: 'p2-8',
        prompt: 'Átmegy a Q(3; -12) ponton',
        value: 'k = -4 (képlete: y = -4x)'
      }
    ]
  },
  3: {
    title: '3. Szint: Gyakorlati Szituációk és Összefüggések',
    subtitle: 'Párosítsd a valós életbeli helyzeteket a megfelelő egyenes arányossági szabállyal!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'Alma vásárlása (650 Ft/kg)',
        value: 'y = 650 · x (x: kg, y: fizetendő forint)'
      },
      {
        id: 'p3-2',
        prompt: 'Egyenletes mozgás (85 km/h)',
        value: 's = 85 · t (t: óra, s: megtett út km-ben)'
      },
      {
        id: 'p3-3',
        prompt: 'Négyzet kerülete az oldalhosszból',
        value: 'K = 4 · a (a: oldal, arányossági tényező: 4)'
      },
      {
        id: 'p3-4',
        prompt: 'Szabályos háromszög kerülete',
        value: 'K = 3 · a (a: oldal, arányossági tényező: 3)'
      },
      {
        id: 'p3-5',
        prompt: 'Méter átváltása centiméterbe',
        value: 'y = 100 · x (k = 100)'
      },
      {
        id: 'p3-6',
        prompt: 'Kilogramm átváltása grammba',
        value: 'y = 1000 · x (k = 1000)'
      },
      {
        id: 'p3-7',
        prompt: 'Valutaváltás (1 EUR = 395 HUF)',
        value: 'y = 395 · x (k = 395)'
      },
      {
        id: 'p3-8',
        prompt: 'Csap egyenletes vízfolyása (15 l/perc)',
        value: 'V = 15 · t (k = 15 liter/perc)'
      }
    ]
  }
};

export const DirectProportionMatcher: React.FC<DirectProportionMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-func-direct-matcher',
  topicTitle = 'Egyenes Arányosság Párosító'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      badge="8. Osztály • V. Hozzárendelések"
      topicBadge="📈 1. Lecke • Egyenes arányosság"
      topicTitle={topicTitle}
      topicId={topicId}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      grade={8}
      themeColor="cyan"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default DirectProportionMatcher;
