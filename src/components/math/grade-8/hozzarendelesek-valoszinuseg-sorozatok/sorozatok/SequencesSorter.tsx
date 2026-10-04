import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequencesSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Sorozatok Típusának Meghatározása',
    subtitle: 'Válogasd szét: Számtani (+d), Mértani (·q), vagy Fibonacci / Egyéb szabályú sorozat!',
    categories: [
      {
        id: 'cat-arith',
        name: 'Számtani Sorozat',
        description: 'A szomszédos tagok különbsége állandó (d = konstans)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-geom',
        name: 'Mértani Sorozat',
        description: 'A szomszédos tagok hányadosa állandó (q = konstans)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-other',
        name: 'Fibonacci / Egyéb Sorozat',
        description: 'Nem állandó sem a különbség, sem a szorzó (pl. négyzetszámok, Fibonacci)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'seq-s1-1', label: '4, 7, 10, 13, 16... (mindig +3)', category: 'cat-arith' },
      { id: 'seq-s1-2', label: '2, 6, 18, 54, 162... (mindig ·3)', category: 'cat-geom' },
      { id: 'seq-s1-3', label: '1, 1, 2, 3, 5, 8, 13, 21...', category: 'cat-other' },
      { id: 'seq-s1-4', label: '50, 42, 34, 26, 18... (mindig -8)', category: 'cat-arith' },
      { id: 'seq-s1-5', label: '80, 40, 20, 10, 5... (mindig ·0.5)', category: 'cat-geom' },
      { id: 'seq-s1-6', label: 'Négyzetszámok: 1, 4, 9, 16, 25, 36...', category: 'cat-other' },
      { id: 'seq-s1-7', label: 'a_n = 5n - 2 (lineáris függvény)', category: 'cat-arith' },
      { id: 'seq-s1-8', label: 'a_n = 3 · 2^n (exponenciális függvény)', category: 'cat-geom' },
      { id: 'seq-s1-9', label: '1, 8, 27, 64, 125... (köbszámok)', category: 'cat-other' },
      { id: 'seq-s1-10', label: '-10, -5, 0, 5, 10... (d = +5)', category: 'cat-arith' },
      { id: 'seq-s1-11', label: '3, -6, 12, -24, 48... (q = -2)', category: 'cat-geom' },
      { id: 'seq-s1-12', label: 'Háromszögszámok: 1, 3, 6, 10, 15...', category: 'cat-other' }
    ]
  },
  2: {
    title: '2. Szint: Monotonitás és Sorozat-viselkedés',
    subtitle: 'Csoportosítsd: Szigorúan növekvő, Szigorúan csökkenő, vagy Oszcilláló (váltakozó jelű)!',
    categories: [
      {
        id: 'cat-inc',
        name: 'Monoton Növekvő',
        description: 'Minden tag nagyobb az előzőnél (a_(n+1) > a_n)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-dec',
        name: 'Monoton Csökkenő',
        description: 'Minden tag kisebb az előzőnél (a_(n+1) < a_n)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-osc',
        name: 'Oszcilláló / Váltakozó előjelű',
        description: 'A tagok előjele lépésről lépésre váltakozik (+, -, +, -...)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'seq-s2-1', label: 'Számtani sorozat pozitív differenciával: d = +4', category: 'cat-inc' },
      { id: 'seq-s2-2', label: 'Számtani sorozat negatív differenciával: d = -7', category: 'cat-dec' },
      { id: 'seq-s2-3', label: 'Mértani sorozat negatív kvócienssel: q = -3', category: 'cat-osc' },
      { id: 'seq-s2-4', label: 'Mértani sorozat: a_1 = 5 és q = 2', category: 'cat-inc' },
      { id: 'seq-s2-5', label: 'Mértani sorozat: a_1 = 100 és q = 0.8', category: 'cat-dec' },
      { id: 'seq-s2-6', label: 'a_n = (-1)^n · 5 (-5, 5, -5, 5...)', category: 'cat-osc' },
      { id: 'seq-s2-7', label: 'Fibonacci-sorozat: 1, 1, 2, 3, 5, 8, 13...', category: 'cat-inc' },
      { id: 'seq-s2-8', label: '1, 1/2, 1/3, 1/4, 1/5... (reciprok sorozat)', category: 'cat-dec' },
      { id: 'seq-s2-9', label: '2, -4, 8, -16, 32, -64... (q = -2)', category: 'cat-osc' },
      { id: 'seq-s2-10', label: 'a_n = 2n + 10 (meredekség m = 2 > 0)', category: 'cat-inc' },
      { id: 'seq-s2-11', label: 'a_n = 50 - 3n (meredekség m = -3 < 0)', category: 'cat-dec' },
      { id: 'seq-s2-12', label: 'a_n = -3 · (-0.5)^n', category: 'cat-osc' }
    ]
  },
  3: {
    title: '3. Szint: Igaz, Hamis és Tévhitek a Sorozatokról',
    subtitle: 'Döntsd el a matematikai definíciókról és állításokról, hogy igazak vagy tévhitek!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikailag Igaz',
        description: 'Helytálló szabályok, tételek és definíciók',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis / Tévhit',
        description: 'Gyakori diákcsapdák és hibás következtetések',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'seq-s3-1', label: 'Számtani sorozatban a_n = a_1 + (n - 1)d, és NEM a_1 + nd.', category: 'cat-true' },
      { id: 'seq-s3-2', label: 'TÉVHIT: A 10. taghoz mindig 10-szer kell hozzáadni a differenciát.', category: 'cat-false' },
      { id: 'seq-s3-3', label: 'Minden számtani sorozat bármely tagja a két közvetlen szomszédjának számtani közepe.', category: 'cat-true' },
      { id: 'seq-s3-4', label: 'TÉVHIT: Két tag (pl. 2 és 4) mindig egyértelműen meghatározza az egész sorozatot.', category: 'cat-false' },
      { id: 'seq-s3-5', label: 'A Fibonacci-sorozatban minden tag az előző két tag összege (F_n = F_(n-1) + F_(n-2)).', category: 'cat-true' },
      { id: 'seq-s3-6', label: 'TÉVHIT: A Fibonacci-sorozat számtani sorozat, mert számok összeadásából keletkezik.', category: 'cat-false' },
      { id: 'seq-s3-7', label: 'A koordináta-rendszerben a sorozat pontjait NEM köthetjük össze folytonos vonallal.', category: 'cat-true' },
      { id: 'seq-s3-8', label: 'TÉVHIT: Ha egy mértani sorozat kvóciense 0 és 1 közötti (pl. q = 0.5), akkor negatív számok lesznek a tagok.', category: 'cat-false' },
      { id: 'seq-s3-9', label: 'A konstans 5, 5, 5, 5... sorozat egyszerre számtani (d = 0) és mértani (q = 1).', category: 'cat-true' },
      { id: 'seq-s3-10', label: 'TÉVHIT: Mértani sorozat n. tagjának képlete a_n = a_1 · q^n.', category: 'cat-false' },
      { id: 'seq-s3-11', label: 'Fibonacci egymást követő tagjainak hányadosa az aranymetszéshez tart (≈ 1,618).', category: 'cat-true' },
      { id: 'seq-s3-12', label: 'TÉVHIT: A mértani sorozatban a tagok mindig gyorsabban nőnek, mint a számtani sorozatban.', category: 'cat-false' }
    ]
  }
};

export const SequencesSorter: React.FC<SequencesSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-func-sequences',
  topicTitle = 'Sorozatok'
}) => {
  return (
    <SorterTemplate
      levelConfig={sorterLevels[level]}
      currentLevel={level}
      topicId={topicId}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicTitle={topicTitle}
      themeColor="cyan"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default SequencesSorter;
