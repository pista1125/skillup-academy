import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TruthTableSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Kifejezések Logikai Jellege',
    subtitle: 'Sorold be a kifejezéseket a megfelelő típusba: Tautológia (Mindig IGAZ), Kontingens, vagy Kontradikció (Mindig HAMIS)!',
    categories: [
      {
        id: 'cat-tautology',
        name: 'Tautológia (Mindig IGAZ)',
        description: 'Az igazságtáblázat minden sorában I értéket ad',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-contingent',
        name: 'Feltételtől Függő (Kontingens)',
        description: 'A változók értékeitől függően lehet igaz vagy hamis is',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-contradiction',
        name: 'Kontradikció (Mindig HAMIS)',
        description: 'Az igazságtáblázat minden sorában H értéket ad (lehetetlen)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Tautológia
      { id: 'ts1-1', label: 'A ∨ ¬A (a kizárt harmadik törvénye)', category: 'cat-tautology' },
      { id: 'ts1-2', label: '¬(A ∧ ¬A) (az ellentmondásmentesség törvénye)', category: 'cat-tautology' },
      { id: 'ts1-3', label: '¬(A ∧ B) ⟺ (¬A ∨ ¬B) (1. De Morgan-azonosság)', category: 'cat-tautology' },
      { id: 'ts1-4', label: '¬(A ∨ B) ⟺ (¬A ∧ ¬B) (2. De Morgan-azonosság)', category: 'cat-tautology' },

      // Kontingens
      { id: 'ts1-5', label: 'A ∧ B (csak az I, I sorban igaz)', category: 'cat-contingent' },
      { id: 'ts1-6', label: 'A ∨ B (csak a H, H sorban hamis)', category: 'cat-contingent' },
      { id: 'ts1-7', label: '¬(A ∧ B) (három sorban igaz, egyben hamis)', category: 'cat-contingent' },
      { id: 'ts1-8', label: '¬(A ∨ B) (egy sorban igaz, háromban hamis)', category: 'cat-contingent' },

      // Kontradikció
      { id: 'ts1-9', label: 'A ∧ ¬A (egy állítás és tagadása egyszerre)', category: 'cat-contradiction' },
      { id: 'ts1-10', label: '(A ∨ ¬A) ∧ HAMIS (tautológia konjunkciója hamissal)', category: 'cat-contradiction' },
      { id: 'ts1-11', label: '(A ∧ B) ∧ ¬A (A és nem-A együttes jelenléte)', category: 'cat-contradiction' },
      { id: 'ts1-12', label: '„A szám egyszerre páros és páratlan egész szám.”', category: 'cat-contradiction' }
    ]
  },
  2: {
    title: 'De Morgan Átalakítások Helyessége',
    subtitle: 'Döntsd el, hogy az adott átalakítás Helyes De Morgan, Nem Tagadás (Azonos), vagy Hibás Átalakítás (Csapda)!',
    categories: [
      {
        id: 'cat-correct-dm',
        name: 'Helyes De Morgan-átalakítás',
        description: 'A kötőszó megfordul (∧ ↔ ∨) és mindkét tag tagadva van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-same-claim',
        name: 'Nem Tagadás (Azonos Állítás)',
        description: 'Ugyanazt a tényt fejezi ki, nincs negálva a kifejezés',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-trap-dm',
        name: 'Hibás Átalakítás (Csapda)',
        description: 'Nem fordult meg a művelet, vagy hibás a tagadás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Helyes De Morgan
      { id: 'ts2-1', label: '„Péter kávét és teát iszik” tagadása: „Péter nem iszik kávét VAGY nem iszik teát”', category: 'cat-correct-dm' },
      { id: 'ts2-2', label: '„A szekrény barna vagy kétajtós” tagadása: „A szekrény nem barna ÉS nem kétajtós”', category: 'cat-correct-dm' },
      { id: 'ts2-3', label: '¬(A ∧ B) átalakítása: ¬A ∨ ¬B', category: 'cat-correct-dm' },
      { id: 'ts2-4', label: '¬(A ∨ B) átalakítása: ¬A ∧ ¬B', category: 'cat-correct-dm' },

      // Azonos
      { id: 'ts2-5', label: '„A szekrény barna vagy kétajtós” helyett: „Barna a szekrény, vagy két ajtaja van”', category: 'cat-same-claim' },
      { id: 'ts2-6', label: 'A ∧ B helyett: B ∧ A (kommutativitás)', category: 'cat-same-claim' },
      { id: 'ts2-7', label: '„Péter kávézik és teázik” helyett: „Péter kávézik, valamint teát is fogyaszt”', category: 'cat-same-claim' },
      { id: 'ts2-8', label: 'A ∨ B helyett: B ∨ A', category: 'cat-same-claim' },

      // Csapda
      { id: 'ts2-9', label: '¬(A ∧ B) tagadásaként: ¬A ∧ ¬B (elfelejtette megfordítani a műveletet!)', category: 'cat-trap-dm' },
      { id: 'ts2-10', label: '¬(A ∨ B) tagadásaként: ¬A ∨ ¬B (nem fordult meg a kötőszó!)', category: 'cat-trap-dm' },
      { id: 'ts2-11', label: '„Péter kávét és teát iszik” tagadásaként: „Péter se kávét, se teát nem iszik” (túl szigorú!)', category: 'cat-trap-dm' },
      { id: 'ts2-12', label: '„Barna vagy kétajtós” tagadásaként: „Nem barna vagy nem kétajtós”', category: 'cat-trap-dm' }
    ]
  },
  3: {
    title: 'Esettáblázatos Fejtörők Tényei',
    subtitle: 'A tankönyvi feladványok táblázatos elemzése alapján: Biztosan Igaz, Biztosan Hamis, vagy Nem dönthető el?',
    categories: [
      {
        id: 'cat-sure-true',
        name: 'Biztosan Igaz Kijelentés',
        description: 'A táblázatos levezetés egyértelműen igazolja',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sure-false',
        name: 'Biztosan Hamis Kijelentés',
        description: 'A táblázatos levezetés kizárja, ellentmondásos',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-uncertain',
        name: 'Nem Dönthető El',
        description: 'A feladat feltételeiből nem következik sem az igazsága, sem a hamissága',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Biztosan Igaz
      { id: 'ts3-1', label: '„Kvarkus erődítményében a 2. szobában lány van.”', category: 'cat-sure-true' },
      { id: 'ts3-2', label: '„A tündék feladványában a kulcs a 2. ládában található.”', category: 'cat-sure-true' },
      { id: 'ts3-3', label: '„A 3 indián közül a Szürke Egér nevű sárga ruhát visel.”', category: 'cat-sure-true' },
      { id: 'ts3-4', label: '„Az úszóverseny 1-es pályáján úszó versenyző a 3. helyet szerezte meg.”', category: 'cat-sure-true' },

      // Biztosan Hamis
      { id: 'ts3-5', label: '„Kvarkus erődítményében az 1. ajtó felirata igaz volt.”', category: 'cat-sure-false' },
      { id: 'ts3-6', label: '„A tündék 1. ládájának felirata igaz volt.”', category: 'cat-sure-false' },
      { id: 'ts3-7', label: '„Fehér Tigris fehér ruhát viselt a tűz körül.”', category: 'cat-sure-false' },
      { id: 'ts3-8', label: '„A győztes úszó belső pályán versenyzett.”', category: 'cat-sure-false' },

      // Nem dönthető el
      { id: 'ts3-9', label: '„A kiszabadított lány neve Anna volt.”', category: 'cat-uncertain' },
      { id: 'ts3-10', label: '„A tündék ládája tölgyfából készült.”', category: 'cat-uncertain' },
      { id: 'ts3-11', label: '„Fehér Tigris idősebb volt, mint Szürke Egér.”', category: 'cat-uncertain' },
      { id: 'ts3-12', label: '„Az aranyhegyis úszó világcsúcsot úszott.”', category: 'cat-uncertain' }
    ]
  }
};

export const TruthTableSorter: React.FC<TruthTableSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-logic-tablazat-sorter',
  topicTitle = '4. Igaz vagy hamis? Foglaljuk táblázatba!'
}) => {
  return (
    <SorterTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={10}
      chapterId="logika"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
    />
  );
};

(TruthTableSorter as any).sorterLevels = sorterLevels;

export default TruthTableSorter;

