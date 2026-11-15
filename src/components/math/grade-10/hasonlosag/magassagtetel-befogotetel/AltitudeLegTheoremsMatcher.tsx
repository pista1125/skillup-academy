import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AltitudeLegTheoremsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const ALTITUDE_LEG_THEOREMS_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Magasság- és befogótétel alapjai',
    description: 'Párosítsd a metrikus tételek képleteit és definícióit a megfelelő leírásukkal!',
    pairs: [
      {
        id: 'alt1',
        left: 'Magasságtétel képlete',
        right: 'm = √(p · q) (az átfogóhoz tartozó magasság az átfogószeletek mértani közepe)'
      },
      {
        id: 'alt2',
        left: 'Befogótétel az a befogóra',
        right: 'a = √(p · c) (a befogó hossza az átfogó és a saját merőleges vetületének mértani közepe)'
      },
      {
        id: 'alt3',
        left: 'Befogótétel a b befogóra',
        right: 'b = √(q · c) (a befogó hossza az átfogó és a q vetület mértani közepe)'
      },
      {
        id: 'alt4',
        left: 'Átfogószeletek összege',
        right: 'c = p + q (az átfogó a két merőleges vetületének összege)'
      },
      {
        id: 'alt5',
        left: 'Mértani közép definíciója',
        right: 'Két pozitív szám szorzatának négyzetgyöke: √(x · y)'
      },
      {
        id: 'alt6',
        left: 'Pitagorasz-tétel levezetése a befogótételből',
        right: 'a² + b² = pc + qc = (p + q)c = c · c = c²'
      },
      {
        id: 'alt7',
        left: 'Három derékszögű háromszög hasonlósága',
        right: 'ΔABC ~ ΔC₁BC ~ ΔAC₁C (az I. alapeset: sz-sz alapján szögeik páronként egyenlők)'
      },
      {
        id: 'alt8',
        left: 'Befogó merőleges vetülete az átfogón',
        right: 'A derékszögű csúcsból az átfogóra bocsátott magasság talppontja által levágott szakasz (p vagy q)'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gyakorlati számítások',
    description: 'Párosítsd a geometriai példák adatait a kiszámított eredményekkel!',
    pairs: [
      {
        id: 'alt9',
        left: 'Szikla magassága (p = 42 m, q = 15 m)',
        right: 'm = √(42 · 15) = √630 ≈ 25,1 méter'
      },
      {
        id: 'alt10',
        left: 'Magasság, ha p = 3 cm és q = 2 cm',
        right: 'm = √(3 · 2) = √6 ≈ 2,45 cm'
      },
      {
        id: 'alt11',
        left: 'Hosszabbik befogó (p = 3 cm, q = 2 cm, c = 5 cm)',
        right: 'a = √(3 · 5) = √15 ≈ 3,87 cm'
      },
      {
        id: 'alt12',
        left: 'Háromszög területe (c = 5 cm, m = √6 cm)',
        right: 'T = (c · m) / 2 = (5 · √6) / 2 ≈ 6,12 cm²'
      },
      {
        id: 'alt13',
        left: 'Befogó 30 cm, átfogó 45 cm vetülete',
        right: 'p = a² / c = 30² / 45 = 900 / 45 = 20 cm'
      },
      {
        id: 'alt14',
        left: 'Magasság, ha p = 20 cm és q = 25 cm',
        right: 'm = √(20 · 25) = √500 = 10√5 ≈ 22,36 cm'
      },
      {
        id: 'alt15',
        left: 'Befogók 8 cm és 15 cm átfogója',
        right: 'c = √(8² + 15²) = √(64 + 225) = √289 = 17 cm'
      },
      {
        id: 'alt16',
        left: 'Átfogószeletek (a = 8 cm, b = 15 cm, c = 17 cm)',
        right: 'p = 64/17 ≈ 3,76 cm és q = 225/17 ≈ 13,24 cm'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Bizonyítások és mértani-számtani egyenlőtlenség',
    description: 'Párosítsd a mélyebb tételeket a pontos geometriai leírásukkal!',
    pairs: [
      {
        id: 'alt17',
        left: 'Számtani és mértani közép egyenlőtlensége',
        right: '√(p · q) ≤ (p + q) / 2 minden nemnegatív valós számra'
      },
      {
        id: 'alt18',
        left: 'Egyenlőség feltétele az AM-GM tételben',
        right: 'Akkor és csak akkor, ha p = q (azaz a derékszögű háromszög egyenlő szárú)'
      },
      {
        id: 'alt19',
        left: 'Thálész-félkör sugara (r)',
        right: 'r = (p + q) / 2 = c / 2 (a számtani közép geometriai megfelelője)'
      },
      {
        id: 'alt20',
        left: 'Thálész-félkör magassága (m)',
        right: 'm = √(p · q) (a mértani közép, mely sosem haladhatja meg a sugarat: m ≤ r)'
      },
      {
        id: 'alt21',
        left: 'Szabályos háromszög (a = 12 cm) felezőpontjából vetület',
        right: 'AF₁ = 3 cm és F₁C = 9 cm (a merőleges 1 : 3 arányban osztja az oldalt)'
      },
      {
        id: 'alt22',
        left: 'HF 1. feladat: c = 16 cm, a = 15 cm szelete',
        right: 'p = a² / c = 225 / 16 = 14,0625 cm és q = 1,9375 cm'
      },
      {
        id: 'alt23',
        left: 'HF 3. feladat: p = 5,4 cm, q = 9,6 cm magassága',
        right: 'm = √(5,4 · 9,6) = √51,84 = 7,2 cm'
      },
      {
        id: 'alt24',
        left: 'HF 3. feladat: befogók (p = 5,4 cm, q = 9,6 cm, c = 15 cm)',
        right: 'a = √(5,4 · 15) = 9 cm és b = √(9,6 · 15) = 12 cm'
      }
    ]
  }
];

export const AltitudeLegTheoremsMatcher: React.FC<AltitudeLegTheoremsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = '10. Magasságtétel, befogótétel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="magassagtetel-befogotetel"
      title={topicTitle}
      subtitle="Gyakorold a metrikus tételeket, az átfogószeletek számításait és a számtani-mértani közép geometriai bizonyítását!"
      levels={ALTITUDE_LEG_THEOREMS_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default AltitudeLegTheoremsMatcher;

