import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface LogicSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const LOGIC_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  // 1. SZINT: ÁLLÍTÁSOK IGAZSÁGÉRTÉKE
  1: {
    level: 1,
    title: '1. Szint: Állítások Igazságértéke',
    subtitle: 'Sorold be az állításokat a logikai értékük alapján!',
    categories: [
      { id: 'always_true', name: 'Mindig Igaz (I)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
      { id: 'always_false', name: 'Mindig Hamis (H)', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
      { id: 'conditional', name: 'Feltételtől függő / Nyitott mondat', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
    ],
    items: [
      { id: 'i1-1', label: 'Minden derékszög mértéke 90°', category: 'always_true' },
      { id: 'i1-2', label: 'Egy szám négyzete lehet negatív (valósakban)', category: 'always_false' },
      { id: 'i1-3', label: 'x + 5 = 12', category: 'conditional' },
      { id: 'i1-4', label: 'Háromszög belső szögeinek összege 180°', category: 'always_true' },
      { id: 'i1-5', label: 'A 15 prímszám', category: 'always_false' },
      { id: 'i1-6', label: 'Egy természetes szám páros', category: 'conditional' },
      { id: 'i1-7', label: 'Két páratlan szám szorzata páratlan', category: 'always_true' },
      { id: 'i1-8', label: 'Van olyan háromszög, aminek 2 tompaszöge van', category: 'always_false' },
      { id: 'i1-9', label: '2x > 10', category: 'conditional' }
    ]
  },

  // 2. SZINT: LOGIKAI MŰVELETEK ÉS SZABÁLYOK
  2: {
    level: 2,
    title: '2. Szint: Logikai Műveletek Besorolása',
    subtitle: 'Csoportosítsd a kifejezéseket a megfelelő logikai kapcsolat szerint!',
    categories: [
      { id: 'conjunction', name: 'ÉS kapcsolat (Konjunkció)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800' },
      { id: 'disjunction', name: 'VAGY kapcsolat (Diszjunkció)', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800' },
      { id: 'negation', name: 'Tagadás (Negáció)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800' }
    ],
    items: [
      { id: 'i2-1', label: 'Páros ÉS osztható 3-mal', category: 'conjunction' },
      { id: 'i2-2', label: 'Hétvége van VAGY szünnap', category: 'disjunction' },
      { id: 'i2-3', label: 'NEM igaz, hogy esik a hó', category: 'negation' },
      { id: 'i2-4', label: 'Pozitív ÉS kisebb mint 100', category: 'conjunction' },
      { id: 'i2-5', label: 'A vagy B igaz (legalább az egyik)', category: 'disjunction' },
      { id: 'i2-6', label: 'Nem minden diák tanul németül', category: 'negation' },
      { id: 'i2-7', label: 'Téglalap ÉS rombusz (= négyzet)', category: 'conjunction' },
      { id: 'i2-8', label: 'x ≤ 3 VAGY x ≥ 8', category: 'disjunction' },
      { id: 'i2-9', label: 'Nincs olyan madár, ami nem repül tagadása', category: 'negation' }
    ]
  },

  // 3. SZINT: BIZONYÍTÁSI ÉS KÖVETKEZTETÉSI MÓDSZEREK
  3: {
    level: 3,
    title: '3. Szint: Skatulya-elv és Következtetés',
    subtitle: 'Válogasd szét a feladványokat a megoldási elvük szerint!',
    categories: [
      { id: 'pigeonhole', name: 'Skatulya-elv (Dirichlet)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' },
      { id: 'indirect', name: 'Közvetett bizonyítás / Kizárás', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800' },
      { id: 'knight_knave', name: 'Lovagok és Lókötők fejtörő', badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 dark:border-fuchsia-800' }
    ],
    items: [
      { id: 'i3-1', label: '13 ember közt biztosan van azonos születési hónapú', category: 'pigeonhole' },
      { id: 'i3-2', label: 'Feltesszük, hogy √2 racionális, ellentmondásra jutunk', category: 'indirect' },
      { id: 'i3-3', label: '„Azt mondja, hogy a másik hazudik” feladvány', category: 'knight_knave' },
      { id: 'i3-4', label: '7 alma 6 kosárban ⟹ van kosár legalább 2 almával', category: 'pigeonhole' },
      { id: 'i3-5', label: 'Ha n² páratlan, akkor n is páratlan (indirekt)', category: 'indirect' },
      { id: 'i3-6', label: 'Az egyik mindig igazat mond, a másik mindig hazudik', category: 'knight_knave' },
      { id: 'i3-7', label: '3 pár kesztyű sötétben húzva garantált párért', category: 'pigeonhole' },
      { id: 'i3-8', label: 'Kizárásos alapon csak a harmadik gyanúsított maradt', category: 'indirect' },
      { id: 'i3-9', label: '„Én lókötő vagyok” kijelentés vizsgálata', category: 'knight_knave' }
    ]
  }
};

export const LogicSorter: React.FC<LogicSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(level || 1);

  useEffect(() => {
    if (level) {
      setCurrentLevel(level);
    }
  }, [level]);

  return (
    <SorterTemplate
      level={currentLevel}
      levels={LOGIC_SORTER_LEVELS}
      grade={8}
      chapterId="szamok-es-betuk"
      title="Logikai feladatok – Csoportosító Játék"
      subtitle="Húzd vagy kattintással helyezd a feladványokat a megfelelő logikai kategóriába!"
      badge="🧩 8. Osztály • I. Témakör: Logika"
      topicId="g8-logic-sorter"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

(LogicSorter as any).levels = LOGIC_SORTER_LEVELS;
(LogicSorter as any).levelsConfig = LOGIC_SORTER_LEVELS;

export default LogicSorter;
