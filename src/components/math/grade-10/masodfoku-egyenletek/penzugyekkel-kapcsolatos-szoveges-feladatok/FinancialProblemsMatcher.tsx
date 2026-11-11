import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinancialProblemsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Pénzügyi szituáció és a helyes algebrai modell',
    subtitle: 'Párosítsd a leírt pénzügyi helyzetet a megfelelő egyenlettel vagy szorzótényezővel!',
    pairs: [
      { id: 'fpm1-1', left: 'Kétszeri egymást követő p%-os áremelés', right: 'Á₂ = Á₀ · (1 + p/100)²' },
      { id: 'fpm1-2', left: 'Előbb p% emelés, majd p% leárazás', right: 'Á₂ = Á₀ · (1 - p²/10 000)' },
      { id: 'fpm1-3', left: '2 éves kamatos kamat T₀ tőkére', right: 'T₂ = T₀ · q², ahol q = 1 + p/100' },
      { id: 'fpm1-4', left: 'Bevétel jegyáremelés (x) esetén', right: 'B(x) = (Á₀ + x) · (Q₀ - k·x)' },
      { id: 'fpm1-5', left: 'Közös vásárlás: k fő visszalép', right: 'Ö / (n - k) - Ö / n = d többletköltség' },
      { id: 'fpm1-6', left: 'Év eleji befizetések (A és B)', right: 'A · q² + B · q = Végső tőke' },
      { id: 'fpm1-7', left: 'Kamatláb kifejezése q tényezőből', right: 'p = (q - 1) · 100%' },
      { id: 'fpm1-8', left: 'Lefelé nyíló bevételi parabola maximuma', right: 'x_opt = -b / (2a)' }
    ]
  },
  2: {
    title: 'Feladat és a pontos számítási eredmény',
    subtitle: 'Párosítsd a konkrét gazdasági feladványokat a helyes végeredménnyel!',
    pairs: [
      { id: 'fpm2-1', left: '10 000 Ft-os termék: +20%, majd -20%', right: 'Végső ár: 9 600 Ft (4%-os veszteség)' },
      { id: 'fpm2-2', left: '100 000 Ft 2 év után 121 000 Ft lett', right: 'Éves kamatláb: p = 10%' },
      { id: 'fpm2-3', left: '40 000 Ft-os kabát: +p%, majd -p% ⟹ 38 400 Ft', right: 'Százalékláb: p = 20%' },
      { id: 'fpm2-4', left: '200 000 Ft 2 év alatt 288 000 Ft lett', right: 'Éves kamatláb: p = 20% (q = 1,2)' },
      { id: 'fpm2-5', left: 'B(x) = (2000 + x)(500 - 0,1x) csúcspontja', right: 'Optimális áremelés: x = 1500 Ft' },
      { id: 'fpm2-6', left: '60 000 Ft bérleti díj, 1 fő kiesik, fejenként +2000 Ft', right: 'Eredeti létszám: 6 fő (5 fő maradt)' },
      { id: 'fpm2-7', left: '50 000 Ft kétszeri 10%-os leértékelés után', right: 'Végső ár: 40 500 Ft (q² = 0,81)' },
      { id: 'fpm2-8', left: '1 000 000 Ft 2 év alatt 1 102 500 Ft', right: 'Éves kamatláb: p = 5% (q = 1,05)' }
    ]
  },
  3: {
    title: 'Gazdasági összefüggések és magyarázatok',
    subtitle: 'Párosítsd a pénzügyi jelenségeket a pontos elméleti magyarázatukkal!',
    pairs: [
      { id: 'fpm3-1', left: 'Miért nem 100% az ár +p% és -p% után?', right: 'Mert a csökkentés bázisa már a megemelt, nagyobb összeg' },
      { id: 'fpm3-2', left: 'Mi a különbség egyszerű és kamatos kamat közt?', right: 'Kamatos kamatnál a kamat is kamatozik a 2. évben' },
      { id: 'fpm3-3', left: 'Miért lefelé nyíló parabola a bevétel függvénye?', right: 'Mert a másodfokú tag együtthatója negatív: -k · x²' },
      { id: 'fpm3-4', left: 'Miért vetjük el az egyenlet negatív gyökét (pl. n = -8)?', right: 'Mert személyek száma csak pozitív egész szám lehet' },
      { id: 'fpm3-5', left: 'Hogyan érhető el egy adott célbevétel 2 különböző áron?', right: 'Olcsón nagy eladott darabszámmal, vagy drágán kevesebb vevővel' },
      { id: 'fpm3-6', left: 'Mit jelent a q = 1,12 kamattényező?', right: '12%-os éves növekedést (100% + 12% = 112%)' },
      { id: 'fpm3-7', left: 'Miért vezet a közös költségmegosztás törtes egyenletre?', right: 'Mert az ismeretlen létszám (n) a nevezőben szerepel' },
      { id: 'fpm3-8', left: 'Mit mutat meg a parabola csúcspontja bevétel esetén?', right: 'Azt az árat, ahol a vállalkozás maximális árbevételt ér el' }
    ]
  }
};

export const FinancialProblemsMatcher: React.FC<FinancialProblemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Pénzügyi Szöveges Feladatok Párosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      currentLevel={activeLevel}
      levelConfigs={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

