import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblemsSorterProps {
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
    title: 'Gyökök elfogadhatósága a szöveges kontextus szerint',
    subtitle: 'Válogasd szét a kapott gyökpárokat: mindkét szám jó válasz, csak a pozitív fogadható el, vagy egyik sem?',
    categories: [
      {
        id: 'cat-both',
        name: 'Mindkét gyök elfogadható',
        description: 'Tetszőleges egész vagy valós számok, ahol a negatív érték is tökéletes megoldás.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-positive',
        name: 'Csak a pozitív gyök reális',
        description: 'Fizikai mennyiség (hosszúság, életkor, létszám, darabszám, sebesség, idő).',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-none',
        name: 'Egyik gyök sem felel meg',
        description: 'A kapott gyökök ellentmondanak a feladat szöveges kikötésének.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', content: 'Két egész szám szorzata 56 ⟹ x₁ = 7, x₂ = -8', categoryId: 'cat-both' },
      { id: 's1-2', content: 'Téglalap oldalhossza (cm) ⟹ x₁ = 12, x₂ = -5', categoryId: 'cat-positive' },
      { id: 's1-3', content: 'Egy diák életkora (év) ⟹ x₁ = 16, x₂ = -14', categoryId: 'cat-positive' },
      { id: 's1-4', content: 'Szám és reciproka összege ⟹ x₁ = 3, x₂ = 1/3', categoryId: 'cat-both' },
      { id: 's1-5', content: 'Kiránduló osztály létszáma (fő) ⟹ x₁ = 28, x₂ = -25', categoryId: 'cat-positive' },
      { id: 's1-6', content: 'Két szám különbsége 3, szorzatuk 40 ⟹ x₁ = 5, x₂ = -8', categoryId: 'cat-both' },
      { id: 's1-7', content: 'Autó sebessége (km/h) ⟹ x₁ = 90, x₂ = -60', categoryId: 'cat-positive' },
      { id: 's1-8', content: 'Két szomszédos páros szám szorzata 48 ⟹ x₁ = 6, x₂ = -8', categoryId: 'cat-both' },
      { id: 's1-9', content: 'Kút mélysége (méter) ⟹ x₁ = 15, x₂ = -20', categoryId: 'cat-positive' },
      { id: 's1-10', content: 'Pozitív egész számot keresünk, de a gyökök: x₁ = -3, x₂ = -7', categoryId: 'cat-none' }
    ]
  },
  2: {
    title: 'Szöveges feladat típusának felismerése',
    subtitle: 'Csoportosítsd a feladványokat a matematikai modellszerkezetük szerint!',
    categories: [
      {
        id: 'cat-consec',
        name: 'Szomszédos számok feladata',
        description: 'Egymást követő egész (x, x+1) vagy páros/páratlan (x, x+2) számok szorzata vagy négyzetösszege.',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-recip',
        name: 'Szám és reciprok feladata',
        description: 'Egy szám és a vele vett 1/x reciprok összege vagy különbsége.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-share',
        name: 'Osztozkodási / Költségmegosztási feladat',
        description: 'Fix összeg felosztása létszámváltozással és fejenkénti díjkülönbséggel.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', content: 'Két szomszédos egész szám szorzata 90', categoryId: 'cat-consec' },
      { id: 's2-2', content: 'Egy számhoz hozzáadva a reciprokát 26/5-öt kapunk', categoryId: 'cat-recip' },
      { id: 's2-3', content: 'Színházi páholy 36 000 Ft: 2 fővel többen mennek, 1500 Ft-tal kevesebb a díj', categoryId: 'cat-share' },
      { id: 's2-4', content: 'Két egymást követő páratlan szám négyzetének összege 130', categoryId: 'cat-consec' },
      { id: 's2-5', content: 'Melyik szám tér el a reciprokától 1,5-del?', categoryId: 'cat-recip' },
      { id: 's2-6', content: 'Ajándék ára 18 000 Ft: 3 diák visszalép, fejenként 300 Ft-tal nő a díj', categoryId: 'cat-share' },
      { id: 's2-7', content: 'Két szomszédos szám szorzata 42', categoryId: 'cat-consec' },
      { id: 's2-8', content: 'Egy tört és reciproka összege 13/6', categoryId: 'cat-recip' },
      { id: 's2-9', content: 'Kisbusz bérlés 12 000 Ft: 1 fő lemondta az utat', categoryId: 'cat-share' },
      { id: 's2-10', content: 'Két szomszédos páros szám szorzata 120', categoryId: 'cat-consec' }
    ]
  },
  3: {
    title: 'Helyes modellfelírás vs. Tipikus felállítási hiba',
    subtitle: 'Válogasd szét a szövegből felírt egyenleteket: pontos matematikai modell vagy téves összefüggés?',
    categories: [
      {
        id: 'cat-correct',
        name: 'Helyes algebrai modell',
        description: 'Pontos ismeretlenkijelölés, helyes különbség és szabályos műveleti sorrend.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-flawed',
        name: 'Hibás modell (Tipikus hiba)',
        description: 'Téves különbség páros számoknál, felcserélt kivonási sorrend vagy terület-kerület keverés.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', content: 'Két szomszédos páros szám szorzata: x(x + 2) = 48', categoryId: 'cat-correct' },
      { id: 's3-2', content: 'Két szomszédos páros szám szorzata: x(x + 1) = 48', categoryId: 'cat-flawed' },
      { id: 's3-3', content: 'Szám és reciproka összege: x + 1/x = 2,5', categoryId: 'cat-correct' },
      { id: 's3-4', content: 'Szám és reciproka összege: x + x = 2,5', categoryId: 'cat-flawed' },
      { id: 's3-5', content: 'Téglalap területe 40, egyik oldal 3-mal nagyobb: x(x + 3) = 40', categoryId: 'cat-correct' },
      { id: 's3-6', content: 'Téglalap kerülete 40, egyik oldal 3-mal nagyobb: x(x + 3) = 40', categoryId: 'cat-flawed' },
      { id: 's3-7', content: 'Osztozkodás: 60000/(x - 2) - 60000/x = 1500', categoryId: 'cat-correct' },
      { id: 's3-8', content: 'Osztozkodás: 60000/x - 60000/(x - 2) = 1500', categoryId: 'cat-flawed' },
      { id: 's3-9', content: 'Két szám négyzetösszege: x² + (x + 1)² = 85', categoryId: 'cat-correct' },
      { id: 's3-10', content: 'Két szám különbsége 5: x és x - 5 (szorzatuk: x(x - 5))', categoryId: 'cat-correct' }
    ]
  }
};

export const WordProblemsSorter: React.FC<WordProblemsSorterProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'szoveges-feladatok',
  topicTitle = 'Szöveges feladatok'
}) => {
  const activeLevel = level || currentLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
    />
  );
};

export default WordProblemsSorter;

