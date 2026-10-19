import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RhythmPatternsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const RhythmPatternsSorter: React.FC<RhythmPatternsSorterProps> = ({
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
    // 1. SZINT: PERIÓDUSHOSSZ SZERINTI CSOPORTOSÍTÁS
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-len-2',
          name: '2 elemű periódus (hossz = 2)',
          description: 'Két állapot vagy motívum váltakozása',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-len-3',
          name: '3 elemű periódus (hossz = 3)',
          description: 'Három egymást követő elem ismétlődése',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-len-4',
          name: '4 elemű periódus (hossz = 4)',
          description: 'Négy elem ciklikus ismétlődése a sorban',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '🔴 🔵 🔴 🔵 🔴 🔵 ...',
          categoryId: 'cat-len-2',
          explanation: 'Piros és kék váltakozik &rarr; periódus: 2.'
        },
        {
          id: 's1-2',
          text: '▲ ▼ ▲ ▼ ▲ ▼ ...',
          categoryId: 'cat-len-2',
          explanation: 'Felfelé és lefelé mutató háromszög &rarr; 2 elem.'
        },
        {
          id: 's1-3',
          text: 'X O X O X O ...',
          categoryId: 'cat-len-2',
          explanation: 'Két betű váltakozik &rarr; periódus: 2.'
        },
        {
          id: 's1-4',
          text: 'Igen, Nem, Igen, Nem ...',
          categoryId: 'cat-len-2',
          explanation: 'Kétállapotú ritmus &rarr; periódus: 2.'
        },
        {
          id: 's1-5',
          text: 'Piros, Sárga, Zöld, Piros, Sárga, Zöld ...',
          categoryId: 'cat-len-3',
          explanation: 'Közlekedési lámpa 3 színe &rarr; periódus: 3.'
        },
        {
          id: 's1-6',
          text: 'A B C A B C A B C ...',
          categoryId: 'cat-len-3',
          explanation: 'Három betű ismétlődik &rarr; periódus: 3.'
        },
        {
          id: 's1-7',
          text: '⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ...',
          categoryId: 'cat-len-3',
          explanation: 'Két csillag és egy hold &rarr; 3 elemű alapszakasz.'
        },
        {
          id: 's1-8',
          text: '1 2 3 1 2 3 1 2 3 ...',
          categoryId: 'cat-len-3',
          explanation: 'Három szám ciklikusan &rarr; periódus: 3.'
        },
        {
          id: 's1-9',
          text: 'Tavasz, Nyár, Ősz, Tél, Tavasz ...',
          categoryId: 'cat-len-4',
          explanation: 'A négy évszak &rarr; periódus: 4.'
        },
        {
          id: 's1-10',
          text: 'Észak, Kelet, Dél, Nyugat, Észak ...',
          categoryId: 'cat-len-4',
          explanation: 'A négy fő égtáj &rarr; periódus: 4.'
        },
        {
          id: 's1-11',
          text: '■ ● ▲ ◆ ■ ● ▲ ◆ ...',
          categoryId: 'cat-len-4',
          explanation: 'Négy geometriai alakzat &rarr; periódus: 4.'
        },
        {
          id: 's1-12',
          text: '1 1 2 2 1 1 2 2 1 1 2 2 ...',
          categoryId: 'cat-len-4',
          explanation: 'Az [1, 1, 2, 2] szakasz ismétlődik &rarr; periódus: 4.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: GEOMETRIAI TRANSZFORMÁCIÓK SZERINT
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-trans',
          name: 'Eltolásos ritmus (transzláció)',
          description: 'A motívum azonos méretben és változatlan irányban halad tovább',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-refl',
          name: 'Tükrözéses ritmus (reflexió)',
          description: 'Tengelyre tükrözött, váltakozva egymás felé vagy ellentétesen néző alakzatok',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-rot',
          name: 'Forgatásos ritmus (rotáció)',
          description: 'A motívum egy pont körül lépésenként elfordul (pl. 90°-kal)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Egyforma virágmotívumok egymás mellett változatlanul',
          categoryId: 'cat-trans',
          explanation: 'Csak a helyzetük tolódik el &rarr; eltolás.'
        },
        {
          id: 's2-2',
          text: 'Jobbra mutató nyilak sora: ➡ ➡ ➡ ➡',
          categoryId: 'cat-trans',
          explanation: 'Minden nyíl iránya és formája azonos &rarr; eltolás.'
        },
        {
          id: 's2-3',
          text: 'Változatlan körök egyenletes távolságra',
          categoryId: 'cat-trans',
          explanation: 'Tiszta eltolásos mintázat.'
        },
        {
          id: 's2-4',
          text: 'Kerítéslécek szabályos ismétlődése a kerítésen',
          categoryId: 'cat-trans',
          explanation: 'Egyforma lécek eltolása.'
        },
        {
          id: 's2-5',
          text: 'Váltakozva jobbra és balra néző madárkák bordűrje',
          categoryId: 'cat-refl',
          explanation: 'Függőleges tengelyes tükrözés.'
        },
        {
          id: 's2-6',
          text: 'Felfelé és lefelé mutató háromszögek: ▲ ▼ ▲ ▼',
          categoryId: 'cat-refl',
          explanation: 'Vízszintes tengelyes tükrözés.'
        },
        {
          id: 's2-7',
          text: 'P q P q betűsor sormintaként',
          categoryId: 'cat-refl',
          explanation: 'A P és a q egymás tükörképei.'
        },
        {
          id: 's2-8',
          text: 'Szembefordított tulipánok a hímzésen',
          categoryId: 'cat-refl',
          explanation: 'Tükrös szimmetria a népművészetben.'
        },
        {
          id: 's2-9',
          text: 'Forgó nyíl: ⬆ ➡ ⬇ ⬅ ⬆ ➡',
          categoryId: 'cat-rot',
          explanation: 'Lépésenként 90°-os órajárás szerinti forgatás.'
        },
        {
          id: 's2-10',
          text: 'Szélkerék lapátjai lépésről lépésre forogva',
          categoryId: 'cat-rot',
          explanation: 'Középpont körüli rotáció.'
        },
        {
          id: 's2-11',
          text: 'Derékszögű háromszög fordulása 90 fokonként',
          categoryId: 'cat-rot',
          explanation: 'Forgatással létrehozott sorminta.'
        },
        {
          id: 's2-12',
          text: 'Óramutató számlapon bejárt állásai',
          categoryId: 'cat-rot',
          explanation: 'Forgási szögek szerinti ritmus.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: MARADÉKOS OSZTÁS [A, B, C] (HOSSZ = 3) ESETÉN
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-rem-1',
          name: '1-es maradék &rarr; az "A" elem (1. elem)',
          description: 'A sorszám 3-mal osztva 1 maradékot ad: sorszám = 3k + 1',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-rem-2',
          name: '2-es maradék &rarr; a "B" elem (2. elem)',
          description: 'A sorszám 3-mal osztva 2 maradékot ad: sorszám = 3k + 2',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-rem-0',
          name: '0 maradék &rarr; a "C" elem (3. utolsó elem)',
          description: 'A sorszám pontosan osztható 3-mal: sorszám = 3k',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: '4. elem sorszáma',
          categoryId: 'cat-rem-1',
          explanation: '4 : 3 = 1, maradék 1 &rarr; A elem.'
        },
        {
          id: 's3-2',
          text: '10. elem sorszáma',
          categoryId: 'cat-rem-1',
          explanation: '10 : 3 = 3, maradék 1 &rarr; A elem.'
        },
        {
          id: 's3-3',
          text: '25. elem sorszáma',
          categoryId: 'cat-rem-1',
          explanation: '25 : 3 = 8, maradék 1 &rarr; A elem.'
        },
        {
          id: 's3-4',
          text: '100. elem sorszáma',
          categoryId: 'cat-rem-1',
          explanation: '100 : 3 = 33, maradék 1 &rarr; A elem.'
        },
        {
          id: 's3-5',
          text: '5. elem sorszáma',
          categoryId: 'cat-rem-2',
          explanation: '5 : 3 = 1, maradék 2 &rarr; B elem.'
        },
        {
          id: 's3-6',
          text: '11. elem sorszáma',
          categoryId: 'cat-rem-2',
          explanation: '11 : 3 = 3, maradék 2 &rarr; B elem.'
        },
        {
          id: 's3-7',
          text: '26. elem sorszáma',
          categoryId: 'cat-rem-2',
          explanation: '26 : 3 = 8, maradék 2 &rarr; B elem.'
        },
        {
          id: 's3-8',
          text: '101. elem sorszáma',
          categoryId: 'cat-rem-2',
          explanation: '101 : 3 = 33, maradék 2 &rarr; B elem.'
        },
        {
          id: 's3-9',
          text: '6. elem sorszáma',
          categoryId: 'cat-rem-0',
          explanation: '6 : 3 = 2, maradék 0 &rarr; C (utolsó) elem.'
        },
        {
          id: 's3-10',
          text: '12. elem sorszáma',
          categoryId: 'cat-rem-0',
          explanation: '12 : 3 = 4, maradék 0 &rarr; C (utolsó) elem.'
        },
        {
          id: 's3-11',
          text: '30. elem sorszáma',
          categoryId: 'cat-rem-0',
          explanation: '30 : 3 = 10, maradék 0 &rarr; C (utolsó) elem.'
        },
        {
          id: 's3-12',
          text: '99. elem sorszáma',
          categoryId: 'cat-rem-0',
          explanation: '99 : 3 = 33, maradék 0 &rarr; C (utolsó) elem.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-loc-patterns-quiz"
      title="Ritmusok, díszítések csoportosító"
      subtitle="Csoportosítsd a sormintákat periódushosszuk, transzformációjuk és maradékuk szerint!"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-rhythm-patterns-sorter"
      storageKey="g5-loc-patterns-sorter"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
