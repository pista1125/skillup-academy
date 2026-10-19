import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FamousSequencesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const FamousSequencesSorter: React.FC<FamousSequencesSorterProps> = ({
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
    // 1. SZINT: SZÁMOK BESOROLÁSA A 3 FŐ CSOPORTBA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-square',
          name: 'Négyzetszámok (n²)',
          description: 'Természetes szám önmagával vett szorzata',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-triangle',
          name: 'Háromszögszámok',
          description: 'Egymást követő számok összege: 1 + 2 + ... + n',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-fib',
          name: 'Fibonacci-számok',
          description: 'A híres rekurzív sorozat elemei (előző kettő összege)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '9 (mivel 3 · 3 = 9)',
          categoryId: 'cat-square',
          explanation: '3 négyzete.'
        },
        {
          id: 's1-2',
          text: '16 (mivel 4 · 4 = 16)',
          categoryId: 'cat-square',
          explanation: '4 négyzete.'
        },
        {
          id: 's1-3',
          text: '25 (mivel 5 · 5 = 25)',
          categoryId: 'cat-square',
          explanation: '5 négyzete.'
        },
        {
          id: 's1-4',
          text: '49 (mivel 7 · 7 = 49)',
          categoryId: 'cat-square',
          explanation: '7 négyzete.'
        },
        {
          id: 's1-5',
          text: '3 (mivel 1 + 2 = 3)',
          categoryId: 'cat-triangle',
          explanation: 'A 2. háromszögszám.'
        },
        {
          id: 's1-6',
          text: '6 (mivel 1 + 2 + 3 = 6)',
          categoryId: 'cat-triangle',
          explanation: 'A 3. háromszögszám.'
        },
        {
          id: 's1-7',
          text: '10 (mivel 1 + 2 + 3 + 4 = 10)',
          categoryId: 'cat-triangle',
          explanation: 'A 4. háromszögszám.'
        },
        {
          id: 's1-8',
          text: '15 (mivel 1 + 2 + 3 + 4 + 5 = 15)',
          categoryId: 'cat-triangle',
          explanation: 'Az 5. háromszögszám.'
        },
        {
          id: 's1-9',
          text: '5 (mivel 2 + 3 = 5)',
          categoryId: 'cat-fib',
          explanation: 'Fibonacci-szám.'
        },
        {
          id: 's1-10',
          text: '8 (mivel 3 + 5 = 8)',
          categoryId: 'cat-fib',
          explanation: 'Fibonacci-szám.'
        },
        {
          id: 's1-11',
          text: '13 (mivel 5 + 8 = 13)',
          categoryId: 'cat-fib',
          explanation: 'Fibonacci-szám.'
        },
        {
          id: 's1-12',
          text: '34 (mivel 13 + 21 = 34)',
          categoryId: 'cat-fib',
          explanation: 'Fibonacci-szám.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SOROZATOK KÉPZÉSI JELLEGE ÉS LÉPÉSKÖZE
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-const',
          name: 'Állandó lépésközű sorozatok (+d)',
          description: 'A szomszédos tagok különbsége teljesen változatlan',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-grow',
          name: 'Növekvő lépésközű sorozatok',
          description: 'A lépésköz minden egyes lépésben egyre nagyobb',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-rapid',
          name: 'Ugrásszerűen robbanó sorozatok (·q vagy rekurzív)',
          description: 'Minden lépésben szorzunk vagy összeadjuk az előzőket',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Páros számok (lépésköz állandó: +2)',
          categoryId: 'cat-const',
          explanation: '2, 4, 6, 8, 10...'
        },
        {
          id: 's2-2',
          text: 'Páratlan számok (lépésköz állandó: +2)',
          categoryId: 'cat-const',
          explanation: '1, 3, 5, 7, 9...'
        },
        {
          id: 's2-3',
          text: '5-tel osztható számok (lépésköz: +5)',
          categoryId: 'cat-const',
          explanation: '5, 10, 15, 20...'
        },
        {
          id: 's2-4',
          text: '10 többszörösei (lépésköz: +10)',
          categoryId: 'cat-const',
          explanation: '10, 20, 30, 40...'
        },
        {
          id: 's2-5',
          text: 'Négyzetszámok (lépésközök: +3, +5, +7, +9...)',
          categoryId: 'cat-grow',
          explanation: 'Páratlan számok szerinti növekedés.'
        },
        {
          id: 's2-6',
          text: 'Háromszögszámok (lépésközök: +2, +3, +4, +5...)',
          categoryId: 'cat-grow',
          explanation: 'Természetes számok szerinti növekedés.'
        },
        {
          id: 's2-7',
          text: 'Pöttyrács külső rétegeinek száma',
          categoryId: 'cat-grow',
          explanation: 'Egyre bővülő keretek.'
        },
        {
          id: 's2-8',
          text: 'Kockákból épülő lépcsőmagasság',
          categoryId: 'cat-grow',
          explanation: 'Lépcsős növekedés.'
        },
        {
          id: 's2-9',
          text: 'Kettő-hatványok: 1, 2, 4, 8, 16, 32...',
          categoryId: 'cat-rapid',
          explanation: 'Duplázódás (·2).'
        },
        {
          id: 's2-10',
          text: 'Három-hatványok: 1, 3, 9, 27, 81...',
          categoryId: 'cat-rapid',
          explanation: 'Triplázódás (·3).'
        },
        {
          id: 's2-11',
          text: 'Fibonacci-sorozat: 1, 1, 2, 3, 5, 8, 13...',
          categoryId: 'cat-rapid',
          explanation: 'Gyorsuló rekurzív növekedés.'
        },
        {
          id: 's2-12',
          text: 'Nyulak szaporodási modellje',
          categoryId: 'cat-rapid',
          explanation: 'Klasszikus Fibonacci-példa.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: TERMÉSZET VS GEOMETRIA VS SZÁMELMÉLET
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-nat',
          name: 'Megjelenés az élő természetben',
          description: 'Növényekben és élőlényekben megfigyelhető mintázatok',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-geom',
          name: 'Geometriai és alakzatos formák',
          description: 'Síkban kirakható alakzatok, pontrácsok és spirálok',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-math',
          name: 'Számelméleti összefüggések',
          description: 'Képletek és meglepő matematikai egyenlőségek',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Napraforgó magjainak spiráljai',
          categoryId: 'cat-nat',
          explanation: '34 és 55 spirál a magtányérban.'
        },
        {
          id: 's3-2',
          text: 'Fenyőtoboz pikkelyeinek spiráljai',
          categoryId: 'cat-nat',
          explanation: '5 és 8 spirálirány.'
        },
        {
          id: 's3-3',
          text: 'Virágszirmok száma (pl. liliom 3, boglárka 5)',
          categoryId: 'cat-nat',
          explanation: 'Fibonacci virágszirmok.'
        },
        {
          id: 's3-4',
          text: 'Ananász héjának hatszöges mintázata',
          categoryId: 'cat-nat',
          explanation: '8 és 13 spirálvonal.'
        },
        {
          id: 's3-5',
          text: 'Négyzet alakú pontrács (n · n pötty)',
          categoryId: 'cat-geom',
          explanation: 'Négyzetszámok geometriája.'
        },
        {
          id: 's3-6',
          text: 'Szabályos háromszög alakú golyósorok',
          categoryId: 'cat-geom',
          explanation: 'Háromszögszámok geometriája.'
        },
        {
          id: 's3-7',
          text: 'Arany téglalap és Fibonacci-spirál',
          categoryId: 'cat-geom',
          explanation: 'Négyzetekből épített spirál.'
        },
        {
          id: 's3-8',
          text: 'Tekebábuk felállítása (10 bábu = T₄)',
          categoryId: 'cat-geom',
          explanation: 'Háromszög alakzat a tekepályán.'
        },
        {
          id: 's3-9',
          text: 'Két szomszédos háromszögszám összege négyzetszám',
          categoryId: 'cat-math',
          explanation: 'Pl. 3 + 6 = 9 = 3².'
        },
        {
          id: 's3-10',
          text: 'Első n darab páratlan szám összege = n²',
          categoryId: 'cat-math',
          explanation: 'Pl. 1 + 3 + 5 = 9 = 3².'
        },
        {
          id: 's3-11',
          text: 'Szomszédos négyzetszámok különbsége páratlan szám',
          categoryId: 'cat-math',
          explanation: 'Pl. 25 - 16 = 9.'
        },
        {
          id: 's3-12',
          text: '36 egyben négyzetszám (6²) és háromszögszám (T₈)',
          categoryId: 'cat-math',
          explanation: 'Különleges kettős számelméleti tulajdonság.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-famous-seq-quiz"
      title="Nevezetes sorozatok csoportosító"
      subtitle="Csoportosítsd a sorozatokat típusuk, növekedési ütemük és természeti megjelenésük szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-famous-sequences-sorter"
      storageKey="g5-loc-famous-seq-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
