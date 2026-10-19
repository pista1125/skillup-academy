import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RelationsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RelationsSorter: React.FC<RelationsSorterProps> = ({
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
    // 1. SZINT: SZABÁLYOK TÍPUSA MŰVELETEK SZERINT
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-mult',
          name: 'Szorzásos összefüggések (y = a · x)',
          description: 'A kimenetet a bemenet egyetlen szorzásával kapjuk',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-add',
          name: 'Összeadásos / kivonásos szabályok (y = x ± c)',
          description: 'A bemenethez egy állandó számot adunk hozzá vagy vonunk ki belőle',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-comp',
          name: 'Összetett szabályok (szorzás és összeadás)',
          description: 'A bemenetet megszorozzuk, majd hozzáadunk vagy kivonunk egy értéket',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'A bemenő szám háromszorosa: y = 3 · x',
          categoryId: 'cat-mult',
          explanation: 'Tiszta szorzás.'
        },
        {
          id: 's1-2',
          text: 'A négyzet kerülete: K = 4 · a',
          categoryId: 'cat-mult',
          explanation: 'Az oldalhossz négyszerese.'
        },
        {
          id: 's1-3',
          text: 'Öttel való szorzás: y = 5 · x',
          categoryId: 'cat-mult',
          explanation: 'Szorzásos szabály.'
        },
        {
          id: 's1-4',
          text: 'Egy dobozban 6 ceruza van: y = 6 · x',
          categoryId: 'cat-mult',
          explanation: 'Darabszám szorzása.'
        },
        {
          id: 's1-5',
          text: 'Mindig 5-tel nagyobb szám: y = x + 5',
          categoryId: 'cat-add',
          explanation: 'Állandó szám hozzáadása.'
        },
        {
          id: 's1-6',
          text: 'A bemenetnél 3-mal kisebb szám: y = x - 3',
          categoryId: 'cat-add',
          explanation: 'Kivonás.'
        },
        {
          id: 's1-7',
          text: 'Minden évben 1 évvel idősebb: y = x + 1',
          categoryId: 'cat-add',
          explanation: 'Eggyel való növelés.'
        },
        {
          id: 's1-8',
          text: 'Tízből levonjuk a számot: y = 10 - x',
          categoryId: 'cat-add',
          explanation: 'Kivonásos összefüggés.'
        },
        {
          id: 's1-9',
          text: 'Kétszerese plusz egy: y = 2 · x + 1',
          categoryId: 'cat-comp',
          explanation: 'Szorzás és összeadás.'
        },
        {
          id: 's1-10',
          text: 'Háromszorosa mínusz kettő: y = 3 · x - 2',
          categoryId: 'cat-comp',
          explanation: 'Szorzás és kivonás.'
        },
        {
          id: 's1-11',
          text: 'Négyszerese plusz három: y = 4 · x + 3',
          categoryId: 'cat-comp',
          explanation: 'Összetett művelet.'
        },
        {
          id: 's1-12',
          text: 'Gyufalánc képlete: y = 3 · n + 1',
          categoryId: 'cat-comp',
          explanation: 'Összetett geometriai képlet.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÁMGÉP ÉRTÉKPÁROK (SZABÁLY: y = 2x + 3)
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-valid',
          name: 'Helyes kimenet (y = 2x + 3)',
          description: 'A 2 · x + 3 szabállyal helyesen kiszámolt bemenet &rarr; kimenet párok',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-wrong',
          name: 'Hibás kimenet (y = 2x + 3)',
          description: 'A szabályhoz tévesen megadott kimeneti értékek',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-reverse',
          name: 'Helyes visszafelé számolás [ (y - 3) : 2 ]',
          description: 'A kimenetből az eredeti bemenet helyes visszakövetése',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Bemenet: 1 &rarr; Kimenet: 5',
          categoryId: 'cat-valid',
          explanation: '2 · 1 + 3 = 5 (helyes).'
        },
        {
          id: 's2-2',
          text: 'Bemenet: 3 &rarr; Kimenet: 9',
          categoryId: 'cat-valid',
          explanation: '2 · 3 + 3 = 9 (helyes).'
        },
        {
          id: 's2-3',
          text: 'Bemenet: 4 &rarr; Kimenet: 11',
          categoryId: 'cat-valid',
          explanation: '2 · 4 + 3 = 11 (helyes).'
        },
        {
          id: 's2-4',
          text: 'Bemenet: 10 &rarr; Kimenet: 23',
          categoryId: 'cat-valid',
          explanation: '2 · 10 + 3 = 23 (helyes).'
        },
        {
          id: 's2-5',
          text: 'Bemenet: 2 &rarr; Kimenet: 8',
          categoryId: 'cat-wrong',
          explanation: 'Hibás! 2 · 2 + 3 = 7 lenne.'
        },
        {
          id: 's2-6',
          text: 'Bemenet: 5 &rarr; Kimenet: 15',
          categoryId: 'cat-wrong',
          explanation: 'Hibás! 2 · 5 + 3 = 13 lenne.'
        },
        {
          id: 's2-7',
          text: 'Bemenet: 6 &rarr; Kimenet: 12',
          categoryId: 'cat-wrong',
          explanation: 'Hibás! 2 · 6 + 3 = 15 lenne.'
        },
        {
          id: 's2-8',
          text: 'Bemenet: 0 &rarr; Kimenet: 0',
          categoryId: 'cat-wrong',
          explanation: 'Hibás! 2 · 0 + 3 = 3 lenne.'
        },
        {
          id: 's2-9',
          text: 'Kimenet: 7 &rarr; Bemenet: 2',
          categoryId: 'cat-reverse',
          explanation: '(7 - 3) : 2 = 2 (helyes visszafelé).'
        },
        {
          id: 's2-10',
          text: 'Kimenet: 13 &rarr; Bemenet: 5',
          categoryId: 'cat-reverse',
          explanation: '(13 - 3) : 2 = 5 (helyes visszafelé).'
        },
        {
          id: 's2-11',
          text: 'Kimenet: 17 &rarr; Bemenet: 7',
          categoryId: 'cat-reverse',
          explanation: '(17 - 3) : 2 = 7 (helyes visszafelé).'
        },
        {
          id: 's2-12',
          text: 'Kimenet: 21 &rarr; Bemenet: 9',
          categoryId: 'cat-reverse',
          explanation: '(21 - 3) : 2 = 9 (helyes visszafelé).'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: GEOMETRIAI KÉPLETEK ALAKZATOK SZERINT
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-square',
          name: 'Négyzettel kapcsolatos szabályok',
          description: 'A 4 egyenlő oldallal és derékszögekkel rendelkező alakzat összefüggései',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-triangle',
          name: 'Háromszöggel kapcsolatos szabályok',
          description: 'A 3 oldallal és csúccsal rendelkező síkidom összefüggései',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-rect-box',
          name: 'Téglalappal és kockával kapcsolatos szabályok',
          description: 'Téglalap és téglatest/kocka dimenziói és méretei',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Kerület képlete: K = 4 · a',
          categoryId: 'cat-square',
          explanation: 'Négy egyenlő oldal kerülete.'
        },
        {
          id: 's3-2',
          text: 'Terület képlete: T = a · a',
          categoryId: 'cat-square',
          explanation: 'Négyzet területe az oldal négyzete.'
        },
        {
          id: 's3-3',
          text: 'Négyzetek gyufalánca: 3 · n + 1',
          categoryId: 'cat-square',
          explanation: 'Összekapcsolt négyzetek gyufaszálai.'
        },
        {
          id: 's3-4',
          text: 'Csúcsok száma = 4',
          categoryId: 'cat-square',
          explanation: 'A négyzetnek 4 csúcsa van.'
        },
        {
          id: 's3-5',
          text: 'Szabályos háromszög kerülete: K = 3 · a',
          categoryId: 'cat-triangle',
          explanation: 'Három egyenlő oldal összege.'
        },
        {
          id: 's3-6',
          text: 'Háromszögek gyufalánca: 2 · n + 1',
          categoryId: 'cat-triangle',
          explanation: 'Összekapcsolt háromszögek gyufaszálai.'
        },
        {
          id: 's3-7',
          text: 'Csúcsok száma = 3',
          categoryId: 'cat-triangle',
          explanation: 'Minden háromszögnek 3 csúcsa van.'
        },
        {
          id: 's3-8',
          text: 'Belső szögek összege mindig 180°',
          categoryId: 'cat-triangle',
          explanation: 'A háromszögek alaptörvénye.'
        },
        {
          id: 's3-9',
          text: 'Téglalap kerülete: K = 2 · (a + b)',
          categoryId: 'cat-rect-box',
          explanation: 'A szemközti oldalak összege duplázva.'
        },
        {
          id: 's3-10',
          text: 'Téglalap területe: T = a · b',
          categoryId: 'cat-rect-box',
          explanation: 'Két szomszédos oldal szorzata.'
        },
        {
          id: 's3-11',
          text: 'Kocka összes élének hossza: 12 · a',
          categoryId: 'cat-rect-box',
          explanation: 'A kockának 12 egyenlő éle van.'
        },
        {
          id: 's3-12',
          text: 'Kocka csúcsainak száma = 8',
          categoryId: 'cat-rect-box',
          explanation: 'A kockának 8 csúcsa van térben.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-relations-quiz"
      title="Keressünk összefüggéseket! csoportosító"
      subtitle="Csoportosítsd a szabályokat műveletek, kimenetek és alakzatok szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-relations-sorter"
      storageKey="g5-loc-relations-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
