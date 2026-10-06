import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsReviewMatcherProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Alapfogalmak és Képletek',
    subtitle: 'Párosítsd a térgeometriai alakzatokat a hozzájuk tartozó felszín- és térfogatképletekkel!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Kocka felszíne (A)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7.5px] font-black fill-indigo-900" textAnchor="middle">A = 6a²</text>
          </svg>
        ),
        value: 'A = 6 · a² (hat egybevágó négyzetlap területe)'
      },
      {
        id: 'p2',
        prompt: 'Kocka térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7.5px] font-black fill-indigo-900" textAnchor="middle">V = a³</text>
          </svg>
        ),
        value: 'V = a³ (az élhossz harmadik hatványa)'
      },
      {
        id: 'p3',
        prompt: 'Téglatest térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-purple-900" textAnchor="middle">V = a · b · c</text>
          </svg>
        ),
        value: 'V = a · b · c (a három különböző élhossz szorzata)'
      },
      {
        id: 'p4',
        prompt: 'Téglatest felszíne (A)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-purple-900" textAnchor="middle">2(ab+bc+ac)</text>
          </svg>
        ),
        value: 'A = 2 · (ab + bc + ac) (három lapfajta kétszerese)'
      },
      {
        id: 'p5',
        prompt: 'Egyenes hasáb térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-900" textAnchor="middle">V = Ta · m</text>
          </svg>
        ),
        value: 'V = Ta · m (alapterület szorozva testmagassággal)'
      },
      {
        id: 'p6',
        prompt: 'Hasáb palástterülete (Tp)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-900" textAnchor="middle">Tp = Ka · m</text>
          </svg>
        ),
        value: 'Tp = Ka · m (alapkerület szorozva testmagassággal)'
      },
      {
        id: 'p7',
        prompt: 'Körhenger térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#ecfeff" stroke="#06b6d4" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-cyan-900" textAnchor="middle">V = r²π · m</text>
          </svg>
        ),
        value: 'V = r²π · m (alapkör területe szorozva a magassággal)'
      },
      {
        id: 'p8',
        prompt: '1 liter űrtartalom',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="4" width="42" height="20" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7.5px] font-black fill-amber-900" textAnchor="middle">1 l = 1 dm³</text>
          </svg>
        ),
        value: 'Pontosan 1 dm³ (egy 10 cm × 10 cm × 10 cm-es kocka)'
      }
    ]
  },
  2: {
    title: '2. Szint: Mértékegység Átváltások és Számítások',
    subtitle: 'Számítsd ki az értékeket és kapcsold össze a megfelelő mennyiségekkel!',
    pairs: [
      {
        id: 'p2-1',
        prompt: '1 m³ átváltva köbdeciméterbe',
        value: '1000 dm³ (= 1000 liter = 10 hl)'
      },
      {
        id: 'p2-2',
        prompt: '1 dm³ átváltva köbcentiméterbe',
        value: '1000 cm³ (= 1000 ml)'
      },
      {
        id: 'p2-3',
        prompt: '1 m² átváltva négyzetdeciméterbe',
        value: '100 dm² (váltószám a területnél 100)'
      },
      {
        id: 'p2-4',
        prompt: 'a = 4 cm élű kocka térfogata',
        value: 'V = 4³ = 64 cm³'
      },
      {
        id: 'p2-5',
        prompt: 'a = 5 cm élű kocka felszíne',
        value: 'A = 6 · 5² = 6 · 25 = 150 cm²'
      },
      {
        id: 'p2-6',
        prompt: '2 cm, 3 cm, 5 cm élekkel határolt téglatest térfogata',
        value: 'V = 2 · 3 · 5 = 30 cm³'
      },
      {
        id: 'p2-7',
        prompt: '3 cm, 4 cm, 12 cm élekkel határolt téglatest testátlója',
        value: 'd = √(9 + 16 + 144) = √169 = 13 cm'
      },
      {
        id: 'p2-8',
        prompt: 'r = 1 dm, m = 2 dm henger térfogata',
        value: 'V = 1² · π · 2 = 2π dm³ ≈ 6,28 liter'
      }
    ]
  },
  3: {
    title: '3. Szint: Térbeli Tulajdonságok és Gyakorlati Kérdések',
    subtitle: 'Párosítsd az elméleti és gyakorlati összefüggéseket a megfelelő magyarázattal!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'Kocka lapátlójának képlete',
        value: 'dlap = a√2 (egyetlen négyzetlap átlója)'
      },
      {
        id: 'p3-2',
        prompt: 'Kocka belső testátlójának képlete',
        value: 'dtest = a√3 (szemközti csúcsokat összekötő szakasz)'
      },
      {
        id: 'p3-3',
        prompt: 'Kiterített hengerpalást alakja',
        value: 'Téglalap, melynek oldalai 2rπ és m'
      },
      {
        id: 'p3-4',
        prompt: 'Ha a kocka élét kétszeresére növeljük',
        value: 'A térfogata 2³ = 8-szorosára nő'
      },
      {
        id: 'p3-5',
        prompt: 'Ha a kocka élét kétszeresére növeljük',
        value: 'A felszíne 2² = 4-szeresére nő'
      },
      {
        id: 'p3-6',
        prompt: 'Felül nyitott henger felszíne',
        value: 'A = r²π + 2rπ · m (csak egyetlen alapköre van!)'
      },
      {
        id: 'p3-7',
        prompt: 'Test tömegének számítása sűrűségből',
        value: 'm = ρ · V (sűrűség szorozva térfogattal)'
      },
      {
        id: 'p3-8',
        prompt: 'Csomagolópapír, festék vagy csempe szükséglet',
        value: 'Mindig FELSZÍN (A) számítást igényel (m², cm²)'
      }
    ]
  }
};

export const SolidsReviewMatcher: React.FC<SolidsReviewMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-solids-review-matcher',
  topicTitle = 'Mit tanultunk eddig? (Párosító)'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <MatcherTemplate
      key={`sr-matcher-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levelConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="indigo"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • VI. Testek"
    />
  );
};

export default SolidsReviewMatcher;
