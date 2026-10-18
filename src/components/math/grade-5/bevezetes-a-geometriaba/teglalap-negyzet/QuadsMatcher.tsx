import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface QuadsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const QuadsMatcher: React.FC<QuadsMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: ALAPFOGALMAK ÉS OLDALAK
    // ========================================================
    1: {
      title: '1. Szint: Alapfogalmak és oldalak',
      subtitle: 'Párosítsd a téglalap és a négyzet alapvető fogalmait a leírásukkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Téglalap belső szögei',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <rect x="5" y="6" width="30" height="20" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
              <path d="M 10 26 A 5 5 0 0 0 5 21" fill="none" stroke="#be123c" strokeWidth="1" />
              <circle cx="7.5" cy="23.5" r="0.6" fill="#be123c" />
            </svg>
          ),
          value: 'Mind a 4 belső szöge derékszög (90°)'
        },
        {
          id: 'p1-2',
          prompt: 'Négyzet oldalai',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Minden oldala egyenlő hosszú (a = b = c = d)'
        },
        {
          id: 'p1-3',
          prompt: 'Téglalap szemközti oldalai',
          value: 'Párhuzamosak és egyenlő hosszúak (a = a és b = b)'
        },
        {
          id: 'p1-4',
          prompt: 'Belső szögek összege',
          value: 'Minden négyszögben pontosan 360° (4 · 90°)'
        },
        {
          id: 'p1-5',
          prompt: 'Szomszédos oldalak helyzete',
          value: 'Merőlegesek egymásra (a ⊥ b)'
        },
        {
          id: 'p1-6',
          prompt: 'Négyzet és téglalap kapcsolata',
          value: 'Minden négyzet téglalap, de nem minden téglalap négyzet'
        },
        {
          id: 'p1-7',
          prompt: 'Szabályos négyszög',
          value: 'A négyzet (minden oldala és minden szöge egyenlő)'
        },
        {
          id: 'p1-8',
          prompt: 'Csúcsok körüljárási iránya',
          value: 'Az óramutató járásával ellentétesen jelöljük (ABCD)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: ÁTLÓK ÉS SZIMMETRIA
    // ========================================================
    2: {
      title: '2. Szint: Átlók és szimmetriatengelyek',
      subtitle: 'Párosítsd az átlók és a tengelyes szimmetria speciális tulajdonságait!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Téglalap szimmetriatengelyei',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <rect x="6" y="6" width="28" height="20" stroke="#475569" strokeWidth="1.2" fill="none" />
              <line x1="20" y1="2" x2="20" y2="30" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 1" />
              <line x1="2" y1="16" x2="38" y2="16" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 1" />
            </svg>
          ),
          value: 'Pontosan 2 db van (a két szemközti oldalfelező merőleges)'
        },
        {
          id: 'p2-2',
          prompt: 'Négyzet szimmetriatengelyei',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" stroke="#475569" strokeWidth="1.2" fill="none" />
              <line x1="16" y1="2" x2="16" y2="30" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 1" />
              <line x1="2" y1="16" x2="30" y2="16" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 1" />
              <line x1="4" y1="28" x2="28" y2="4" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
              <line x1="4" y1="4" x2="28" y2="28" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
            </svg>
          ),
          value: 'Pontosan 4 db van (2 oldalfelező + 2 átló)'
        },
        {
          id: 'p2-3',
          prompt: 'Téglalap átlói',
          value: 'Egyenlő hosszúak és felezik egymást, de NEM merőlegesek'
        },
        {
          id: 'p2-4',
          prompt: 'Négyzet átlói',
          value: 'Egyenlő hosszúak, felezik egymást ÉS merőlegesek egymásra (90°)'
        },
        {
          id: 'p2-5',
          prompt: 'Téglalap átlója tükörtengely-e?',
          value: 'NEM tükörtengely (félbehajtva elcsúsznak a csúcsok)'
        },
        {
          id: 'p2-6',
          prompt: 'Négyzet átlója tükörtengely-e?',
          value: 'IGEN, mert átló mentén hajtva a két fél tökéletesen fedi egymást'
        },
        {
          id: 'p2-7',
          prompt: 'Négyzet átlóinak szöge a csúcsnál',
          value: 'Felezik a derékszöget: két 45°-os szögre bontják'
        },
        {
          id: 'p2-8',
          prompt: 'Átlók metszéspontja (M)',
          value: 'Mindkét négyszög geometriai középpontja, a szimmetriatengelyek metszéspontja'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KERÜLET, TERÜLET ÉS SZÁMOLÁSOK
    // ========================================================
    3: {
      title: '3. Szint: Kerület és terület számolása',
      subtitle: 'Párosítsd a méreteket, képleteket és a kiszámolt értékeket!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Téglalap kerület képlete',
          value: 'K = 2 · (a + b) vagy 2a + 2b'
        },
        {
          id: 'p3-2',
          prompt: 'Négyzet kerület képlete',
          value: 'K = 4 · a'
        },
        {
          id: 'p3-3',
          prompt: 'Téglalap terület képlete',
          value: 'T = a · b (egységnégyzetek száma)'
        },
        {
          id: 'p3-4',
          prompt: 'Négyzet terület képlete',
          value: 'T = a · a = a²'
        },
        {
          id: 'p3-5',
          prompt: 'Téglalap: a = 6 cm, b = 4 cm kerülete',
          value: 'K = 2 · (6 + 4) = 20 cm'
        },
        {
          id: 'p3-6',
          prompt: 'Téglalap: a = 6 cm, b = 4 cm területe',
          value: 'T = 6 · 4 = 24 cm²'
        },
        {
          id: 'p3-7',
          prompt: 'Négyzet: a = 5 cm kerülete és területe',
          value: 'K = 20 cm, T = 25 cm²'
        },
        {
          id: 'p3-8',
          prompt: 'Négyzet: K = 28 cm oldalhossza',
          value: 'a = 28 : 4 = 7 cm'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-geom-quads-quiz"
      title="Téglalap, négyzet párosító"
      subtitle="Keresd meg a fogalmak, képletek és tulajdonságok összetartozó párjait!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

export default QuadsMatcher;
