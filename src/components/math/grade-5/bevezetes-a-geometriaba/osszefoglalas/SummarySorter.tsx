import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SummarySorter: React.FC<SummarySorterProps> = ({
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

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: DIMENZIÓK SZERINTI CSOPORTOSÍTÁS
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-1d',
          name: '0D és 1D alapelemek',
          description: 'Pont, vonal, egyenes, szakasz, félegyenes (hosszúság)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-2d',
          name: '2D Síkidomok',
          description: 'Síkban fekvő, zárt felületek (kerület és terület)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-3d',
          name: '3D Testek',
          description: 'Térbeli kiterjedésű testek (hossz, szélesség, magasság)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 'ss1-1',
          text: 'P pont',
          categoryId: 'cat-1d',
          explanation: '0 dimenziós alapelem, nincs kiterjedése.'
        },
        {
          id: 'ss1-2',
          text: 'AB szakasz',
          categoryId: 'cat-1d',
          explanation: '1 dimenziós vonal két pont között, csak hossza van.'
        },
        {
          id: 'ss1-3',
          text: 'Egyenlő szárú háromszög',
          categoryId: 'cat-2d',
          explanation: '2 dimenziós síkidom, síkban helyezkedik el.'
        },
        {
          id: 'ss1-4',
          text: 'Kocka',
          categoryId: 'cat-3d',
          explanation: '3 dimenziós test, 6 négyzetlap határolja a térben.'
        },
        {
          id: 'ss1-5',
          text: 'Téglalap',
          categoryId: 'cat-2d',
          explanation: '2 dimenziós sokszög, 4 belső derékszöggel.'
        },
        {
          id: 'ss1-6',
          text: 'Téglatest',
          categoryId: 'cat-3d',
          explanation: '3 dimenziós test, 6 téglalaplap határolja.'
        },
        {
          id: 'ss1-7',
          text: 'e egyenes',
          categoryId: 'cat-1d',
          explanation: '1 dimenziós végtelen vonal.'
        },
        {
          id: 'ss1-8',
          text: 'Kör',
          categoryId: 'cat-2d',
          explanation: '2 dimenziós görbe vonallal határolt síkidom.'
        },
        {
          id: 'ss1-9',
          text: 'Henger',
          categoryId: 'cat-3d',
          explanation: '3 dimenziós görbe felületű forgástest.'
        },
        {
          id: 'ss1-10',
          text: 'Félegyenes',
          categoryId: 'cat-1d',
          explanation: '1 dimenziós, egy irányban végtelen vonal.'
        },
        {
          id: 'ss1-11',
          text: 'Szabályos hatszög',
          categoryId: 'cat-2d',
          explanation: '2 dimenziós sokszög, 6 egyenlő oldallal.'
        },
        {
          id: 'ss1-12',
          text: 'Gömb',
          categoryId: 'cat-3d',
          explanation: '3 dimenziós test, zárt görbe felülettel határolva.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÖGFAJTÁK BESOROLÁSA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-acute',
          name: 'Hegyesszög (0° < α < 90°)',
          description: 'Derékszögnél kisebb, szúró éles szög',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-right',
          name: 'Derékszög (α = 90°)',
          description: 'Pontosan 90°-os szög, merőleges szárak',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-obtuse',
          name: 'Tompaszög (90° < α < 180°)',
          description: 'Derékszögnél nagyobb, de egyenesszögnél kisebb',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 'ss2-1',
          text: '30°-os szög (1 óraköz az óralapon)',
          categoryId: 'cat-acute',
          explanation: '30° kisebb 90°-nál, hegyesszög.'
        },
        {
          id: 'ss2-2',
          text: 'Füzet sarkában lévő szög',
          categoryId: 'cat-right',
          explanation: 'A füzetlap sarkai pontosan 90°-os derékszögek.'
        },
        {
          id: 'ss2-3',
          text: '120°-os szög (4 óraköz)',
          categoryId: 'cat-obtuse',
          explanation: '120° nagyobb 90°-nál és kisebb 180°-nál, tompaszög.'
        },
        {
          id: 'ss2-4',
          text: 'Szabályos háromszög belső szöge (60°)',
          categoryId: 'cat-acute',
          explanation: '60° hegyesszög.'
        },
        {
          id: 'ss2-5',
          text: 'Pontosan 3:00-kor bezárt szög a mutatók között',
          categoryId: 'cat-right',
          explanation: '3 óraköz = 3 · 30° = 90° derékszög.'
        },
        {
          id: 'ss2-6',
          text: '150°-os szög (5 óraköz)',
          categoryId: 'cat-obtuse',
          explanation: '150° tompaszög.'
        },
        {
          id: 'ss2-7',
          text: '45°-os szög (a négyzet átlója által bezárt szög)',
          categoryId: 'cat-acute',
          explanation: '45° hegyesszög.'
        },
        {
          id: 'ss2-8',
          text: 'Négyzet átlóinak metszésszöge',
          categoryId: 'cat-right',
          explanation: 'A négyzet átlói pontosan 90°-ot zárnak be egymással.'
        },
        {
          id: 'ss2-9',
          text: '100°-os szög',
          categoryId: 'cat-obtuse',
          explanation: '100° derékszögnél nagyobb tompaszög.'
        },
        {
          id: 'ss2-10',
          text: '89°-os szög',
          categoryId: 'cat-acute',
          explanation: 'Bár közel van a 90°-hoz, 89° < 90°, így hegyesszög!'
        },
        {
          id: 'ss2-11',
          text: 'Téglalap szomszédos oldalainak szöge',
          categoryId: 'cat-right',
          explanation: 'A téglalap minden belső szöge pontosan 90°.'
        },
        {
          id: 'ss2-12',
          text: '175°-os szög',
          categoryId: 'cat-obtuse',
          explanation: '175° tompaszög (kisebb 180°-nál).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: GEOMETRIAI TÉTELEK ÉS ÁLLÍTÁSOK
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-always-true',
          name: 'Mindig IGAZ állítások',
          description: 'Általánosan érvényes geometriai alaptételek',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-cond-true',
          name: 'Csak bizonyos alakzatokra igaz',
          description: 'Csak négyzetre vagy szabályos sokszögre igaz speciális tulajdonság',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-always-false',
          name: 'Mindig HAMIS (Tévhit)',
          description: 'Matematikailag helytelen, téves állítások',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 'ss3-1',
          text: 'Bármely háromszög belső szögeinek összege 180°',
          categoryId: 'cat-always-true',
          explanation: 'Minden háromszögre érvényes alapvető tétel.'
        },
        {
          id: 'ss3-2',
          text: 'Minden oldala egyenlő hosszú',
          categoryId: 'cat-cond-true',
          explanation: 'Csak a négyzetre és a szabályos sokszögekre igaz, általános téglalapra nem.'
        },
        {
          id: 'ss3-3',
          text: 'A téglalap átlója tükörtengely',
          categoryId: 'cat-always-false',
          explanation: 'Gyakori hiba! A sima téglalap átlója nem tükörtengely.'
        },
        {
          id: 'ss3-4',
          text: 'Bármely négyszög belső szögeinek összege 360°',
          categoryId: 'cat-always-true',
          explanation: 'Minden négyszög belső szögeinek összege 360°.'
        },
        {
          id: 'ss3-5',
          text: 'Átlói merőlegesek egymásra (90°)',
          categoryId: 'cat-cond-true',
          explanation: 'A négyzet átlói merőlegesek, de a sima téglalapé nem.'
        },
        {
          id: 'ss3-6',
          text: 'A háromszög belső szögeinek összege 360°',
          categoryId: 'cat-always-false',
          explanation: 'Hamis, a háromszögé 180°, a négyszögé 360°.'
        },
        {
          id: 'ss3-7',
          text: 'Két pont távolsága a legrövidebb egyenes szakasz hossza',
          categoryId: 'cat-always-true',
          explanation: 'A távolság alapvető definíciója.'
        },
        {
          id: 'ss3-8',
          text: 'Pontosan 4 szimmetriatengelye van',
          categoryId: 'cat-cond-true',
          explanation: 'A négyzetnek 4 tengelye van, a téglalapnak csak 2.'
        },
        {
          id: 'ss3-9',
          text: '2 cm, 3 cm és 6 cm oldalakból háromszög szerkeszthető',
          categoryId: 'cat-always-false',
          explanation: 'Hamis! 2 + 3 = 5 < 6, nem teljesül a háromszög-egyenlőtlenség.'
        },
        {
          id: 'ss3-10',
          text: 'Euler-formula: C + L - É = 2 gömbi konvex testekre',
          categoryId: 'cat-always-true',
          explanation: 'Minden konvex poliéderre (pl. kocka, hasáb, gúla) igaz.'
        },
        {
          id: 'ss3-11',
          text: 'Minden téglalap négyzet',
          categoryId: 'cat-always-false',
          explanation: 'Hamis! Fordítva igaz: minden négyzet téglalap.'
        },
        {
          id: 'ss3-12',
          text: 'Pontosan 2 szimmetriatengelye van',
          categoryId: 'cat-cond-true',
          explanation: 'Ez a téglalapra igaz.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-geom-summary-quiz"
      title="Geometria összefoglaló csoportosító"
      subtitle="Válogasd szét az állításokat, dimenziókat és szögeket kategóriáik szerint!"
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

export default SummarySorter;
