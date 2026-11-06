import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegationSorterProps {
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
    title: 'Kvantor Szerinti Csoportosítás',
    subtitle: 'Sorold be a kifejezéseket a megadott kategóriákba: Általános (∀), Létezési (∃) vagy Kvantor nélküli egyedi állítás!',
    categories: [
      {
        id: 'cat-universal',
        name: 'Általános Kvantoros (∀)',
        description: '„Minden”, „bármely”, „összes” vagy rejtett általánosítás',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-existential',
        name: 'Létezési Kvantoros (∃)',
        description: '„Van olyan”, „létezik legalább egy”, „némely”',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-individual',
        name: 'Kvantor Nélküli Egyedi',
        description: 'Egyetlen konkrét objektumra vagy nevesített dologra vonatkozik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Universal
      { id: 'ns1-1', label: 'Minden diák szereti a szünidőt.', category: 'cat-universal' },
      { id: 'ns1-2', label: 'A háromszög belső szögeinek összege 180°.', category: 'cat-universal' },
      { id: 'ns1-3', label: 'Bármely két ponton át pontosan egy egyenes fektethető.', category: 'cat-universal' },
      { id: 'ns1-4', label: 'A páros számok 2-vel oszthatók.', category: 'cat-universal' },

      // Existential
      { id: 'ns1-5', label: 'Van olyan macska, amelyik fekete.', category: 'cat-existential' },
      { id: 'ns1-6', label: 'Létezik páros prímszám.', category: 'cat-existential' },
      { id: 'ns1-7', label: 'Van olyan háromszög, amely tompaszögű.', category: 'cat-existential' },
      { id: 'ns1-8', label: 'Található olyan egész szám, amelynek négyzete 0.', category: 'cat-existential' },

      // Individual
      { id: 'ns1-9', label: 'A sósav kémiai képlete HCl.', category: 'cat-individual' },
      { id: 'ns1-10', label: 'Svájc fővárosa Bern.', category: 'cat-individual' },
      { id: 'ns1-11', label: 'A 17 egy páratlan prímszám.', category: 'cat-individual' },
      { id: 'ns1-12', label: 'A Duna átfolyik Budapesten.', category: 'cat-individual' }
    ]
  },
  2: {
    title: 'Tagadások Minősége és Csapdák',
    subtitle: 'Döntsd el, hogy az adott tagadási kísérlet Helyes Tagadás, Hibás Szélső Érték (Csapda), vagy Ekvivalens állítás!',
    categories: [
      {
        id: 'cat-correct-neg',
        name: 'Helyes Logikai Tagadás',
        description: 'Pontosan az egyik igaz, és nem lehetnek egyszerre hamisak sem',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-trap-neg',
        name: 'Hibás Szélső Érték (Csapda)',
        description: 'Túl sokat mond, mindkettő lehet egyszerre hamis',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-equivalent',
        name: 'Nem Tagadás (Azonos / Ekvivalens)',
        description: 'Ugyanazt a tényt fejezi ki más szavakkal, mindkettő egyszerre igaz',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Helyes tagadás
      { id: 'ns2-1', label: '„Minden autó piros” tagadása: „Van olyan autó, ami nem piros”', category: 'cat-correct-neg' },
      { id: 'ns2-2', label: '„Legalább 50 pont” tagadása: „Kevesebb mint 50 pont”', category: 'cat-correct-neg' },
      { id: 'ns2-3', label: '„Mindenki eljött” tagadása: „Nem mindenki jött el”', category: 'cat-correct-neg' },
      { id: 'ns2-4', label: '„Van zöld alma” tagadása: „Egyetlen zöld alma sincs”', category: 'cat-correct-neg' },

      // Csapda
      { id: 'ns2-5', label: '„Minden autó piros” tagadásaként: „Egyik autó sem piros”', category: 'cat-trap-neg' },
      { id: 'ns2-6', label: '„Minden diák szereti a matekot” tagadásaként: „Minden diák utálja a matekot”', category: 'cat-trap-neg' },
      { id: 'ns2-7', label: '„Legalább 5 pont” tagadásaként: „Legfeljebb 5 pont”', category: 'cat-trap-neg' },
      { id: 'ns2-8', label: '„Van fekete macska” tagadásaként: „Van nem fekete macska”', category: 'cat-trap-neg' },

      // Ekvivalens
      { id: 'ns2-9', label: '„Minden páros szám osztható 2-vel” helyett: „Nincs olyan páros szám, ami ne lenne osztható 2-vel”', category: 'cat-equivalent' },
      { id: 'ns2-10', label: '„x > 5” állításra: „x nem lehet kisebb vagy egyenlő 5-nél”', category: 'cat-equivalent' },
      { id: 'ns2-11', label: '„Egyik kutya sem beszél” helyett: „Nincs olyan kutya, amelyik tud beszélni”', category: 'cat-equivalent' },
      { id: 'ns2-12', label: '„Minden négyszög 4 oldalú” helyett: „Bármely négyszög 4 oldallal rendelkezik”', category: 'cat-equivalent' }
    ]
  },
  3: {
    title: 'Matematikai Állítások Vizsgálati Módja',
    subtitle: 'Hogyan dönthető el az állítás igazsága: Ellenpéldával cáfolható, Egyetlen példával igazolható, vagy Általános tételt kell bizonyítani?',
    categories: [
      {
        id: 'cat-counterexample',
        name: 'Egyetlen Ellenpéldával Cáfolható',
        description: 'Általános állítás, amely hamis (1 ellenpélda azonnal megdönti)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-single-example',
        name: 'Egyetlen Példával Igazolható',
        description: 'Létezési állítás, amely igaz (1 konkrét példa bizonyítja)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-universal-proof',
        name: 'Minden Esetre Bizonyítást Igényel',
        description: 'Általános érvényű igaz tétel (példák mutatása nem elég)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Counterexample
      { id: 'ns3-1', label: '„Minden prímszám páratlan.” (Ellenpélda: a 2)', category: 'cat-counterexample' },
      { id: 'ns3-2', label: '„Két páros szám összege osztható 4-gyel.” (Ellenpélda: 2 + 4 = 6)', category: 'cat-counterexample' },
      { id: 'ns3-3', label: '„Minden rombusz négyzet.” (Ellenpélda: nem derékszögű rombusz)', category: 'cat-counterexample' },
      { id: 'ns3-4', label: '„Minden páros szám 2-re végződik.” (Ellenpélda: 14 vagy 20)', category: 'cat-counterexample' },

      // Single example
      { id: 'ns3-5', label: '„Létezik páros prímszám.” (Bizonyító példa: 2)', category: 'cat-single-example' },
      { id: 'ns3-6', label: '„Van olyan egész szám, amelynek négyzete megegyezik önmagával.” (Példa: 1 vagy 0)', category: 'cat-single-example' },
      { id: 'ns3-7', label: '„Van olyan háromszög, amely szabályos.” (Példa: 60°-60°-60° háromszög)', category: 'cat-single-example' },
      { id: 'ns3-8', label: '„Található olyan páros szám, ami nem osztható 4-gyel.” (Példa: 6)', category: 'cat-single-example' },

      // Universal proof
      { id: 'ns3-9', label: '„A háromszög belső szögeinek összege 180°.” (Minden háromszögre érvényes)', category: 'cat-universal-proof' },
      { id: 'ns3-10', label: '„Két páratlan szám szorzata mindig páratlan.” (Általános algebrai tétel)', category: 'cat-universal-proof' },
      { id: 'ns3-11', label: '„Bármely konvex négyszög belső szögeinek összege 360°.” (Geometriai alaptétel)', category: 'cat-universal-proof' },
      { id: 'ns3-12', label: '„A trapéz középvonala párhuzamos az alapjaival.” (Minden trapézra igaz tétel)', category: 'cat-universal-proof' }
    ]
  }
};

export const NegationSorter: React.FC<NegationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-logic-allitas-tagadas-sorter',
  topicTitle = '2. Állítás és tagadása'
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

(NegationSorter as any).sorterLevels = sorterLevels;
