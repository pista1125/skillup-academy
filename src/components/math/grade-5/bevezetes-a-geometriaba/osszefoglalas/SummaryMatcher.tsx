import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SummaryMatcher: React.FC<SummaryMatcherProps> = ({
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
    // 1. SZINT: GEOMETRIAI ALAPFOGALMAK ÉS DIMENZIÓK
    // ========================================================
    1: {
      title: '1. Szint: Alapfogalmak és dimenziók',
      subtitle: 'Párosítsd a geometriai alapelemeket a dimenziójukkal és leírásukkal!',
      pairs: [
        {
          id: 'sm1-1',
          prompt: '0D alapelem: Pont (P)',
          promptFigure: (
            <svg className="w-10 h-8 mx-auto" viewBox="0 0 30 24" fill="none">
              <circle cx="15" cy="12" r="3" fill="#4f46e5" />
            </svg>
          ),
          value: 'Nincs kiterjedése (0D), helyet jelöl a térben'
        },
        {
          id: 'sm1-2',
          prompt: '1D alakzat: Szakasz (AB)',
          promptFigure: (
            <svg className="w-12 h-8 mx-auto" viewBox="0 0 40 24" fill="none">
              <line x1="6" y1="12" x2="34" y2="12" stroke="#059669" strokeWidth="2" />
              <circle cx="6" cy="12" r="2" fill="#047857" />
              <circle cx="34" cy="12" r="2" fill="#047857" />
            </svg>
          ),
          value: 'Egyenes vonal két végpont között, mérhető hosszúságú (1D)'
        },
        {
          id: 'sm1-3',
          prompt: '2D alakzat: Síkidom (felület)',
          value: 'Zárt vonallal határolt síkrész, van kerülete és területe (2D)'
        },
        {
          id: 'sm1-4',
          prompt: '3D alakzat: Test',
          value: 'Térbeli zárt felülettel határolt alakzat, van térfogata (3D)'
        },
        {
          id: 'sm1-5',
          prompt: 'Félegyenes',
          value: 'Egy kezdőpontból kiinduló, egy irányban a végtelenbe tartó vonal'
        },
        {
          id: 'sm1-6',
          prompt: 'Egyenes (e)',
          value: 'Mindkét irányban a végtelenbe tartó, végtelen hosszú egyenes vonal'
        },
        {
          id: 'sm1-7',
          prompt: 'Derékszög (⊥)',
          value: 'Pontosan 90°-os szög (negyedkörív + pont jelöli)'
        },
        {
          id: 'sm1-8',
          prompt: 'Kör átmérője (d)',
          value: 'A középponton átmenő leghosszabb húr: d = 2 · r'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÖGEK, HÁROMSZÖGEK ÉS TESTEK
    // ========================================================
    2: {
      title: '2. Szint: Szögek, háromszögek és testek',
      subtitle: 'Párosítsd az alakzatokat a legfontosabb szabályaikkal!',
      pairs: [
        {
          id: 'sm2-1',
          prompt: 'Háromszög belső szögeinek összege',
          value: 'Minden háromszögben pontosan 180° (α + β + γ = 180°)'
        },
        {
          id: 'sm2-2',
          prompt: 'Háromszög-egyenlőtlenség',
          value: 'A két rövidebb oldal összege nagyobb a leghosszabbnál (a + b > c)'
        },
        {
          id: 'sm2-3',
          prompt: 'Szabályos háromszög',
          value: 'Mind 3 oldala egyenlő és minden belső szöge 60°'
        },
        {
          id: 'sm2-4',
          prompt: 'Euler-formula testekre',
          value: 'Csúcsok + Lapok - Élek = 2 (C + L - É = 2)'
        },
        {
          id: 'sm2-5',
          prompt: 'Kocka éleinek száma',
          value: 'Pontosan 12 darab egyenlő hosszú él'
        },
        {
          id: 'sm2-6',
          prompt: 'Kockahálók száma',
          value: 'Összesen 11-féle különböző kiterített háló létezik'
        },
        {
          id: 'sm2-7',
          prompt: 'Óralap 1 óraköze',
          value: '360° : 12 = 30° szögelfordulás'
        },
        {
          id: 'sm2-8',
          prompt: 'Kitérő egyenesek a térben',
          value: 'Nincsenek egy síkban, nem metszik egymást és nem párhuzamosak'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KÉPLETEK, SZIMMETRIA ÉS MESTERFOK
    // ========================================================
    3: {
      title: '3. Szint: Képletek, szimmetria és téglalap-négyzet',
      subtitle: 'Párosítsd a kerület- és területképleteket a szimmetriatulajdonságokkal!',
      pairs: [
        {
          id: 'sm3-1',
          prompt: 'Téglalap kerületképlet',
          value: 'K = 2 · (a + b) = 2a + 2b'
        },
        {
          id: 'sm3-2',
          prompt: 'Téglalap területképlet',
          value: 'T = a · b (egységnégyzetek száma)'
        },
        {
          id: 'sm3-3',
          prompt: 'Négyzet kerületképlet',
          value: 'K = 4 · a'
        },
        {
          id: 'sm3-4',
          prompt: 'Négyzet területképlet',
          value: 'T = a · a = a²'
        },
        {
          id: 'sm3-5',
          prompt: 'Téglalap szimmetriatengelyei',
          value: 'Pontosan 2 db (kizárólag az oldalfelező merőlegesek)'
        },
        {
          id: 'sm3-6',
          prompt: 'Négyzet szimmetriatengelyei',
          value: 'Pontosan 4 db (2 oldalfelező + 2 átló)'
        },
        {
          id: 'sm3-7',
          prompt: 'Négyszög belső szögeinek összege',
          value: 'Pontosan 360° (4 · 90° = 360°)'
        },
        {
          id: 'sm3-8',
          prompt: 'Téglalap és négyzet kapcsolata',
          value: 'Minden négyzet téglalap, de nem minden téglalap négyzet'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-geom-summary-quiz"
      title="Geometria összefoglaló párosító"
      subtitle="Párosítsd a fogalmakat, képleteket, tételeket és szimbólumokat 3 szinten!"
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

export default SummaryMatcher;
