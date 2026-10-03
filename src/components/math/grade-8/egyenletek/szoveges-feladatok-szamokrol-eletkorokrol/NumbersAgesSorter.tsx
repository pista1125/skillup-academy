import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumbersAgesSorterProps {
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
    title: '1. Szint: Szöveges Állítások és Kifejezések Csoportosítása',
    subtitle: 'Sorold be a kifejezéseket az alapművelet, sorozat vagy arány/százalék kategóriába!',
    categories: [
      {
        id: 'cat-arith',
        name: 'Számok alapműveletei',
        description: 'Összeg, különbség, szorzat, hányados és gondolt szám',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-seq',
        name: 'Számsorozatok',
        description: 'Egymást követő egész, páros és páratlan számok',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-ratio',
        name: 'Arány és százalék',
        description: 'Arányos részekre bontás, százalékos növelés és csökkentés',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Egy gondolt szám 4-szeresénél 9-cel több: 4x + 9',
        category: 'cat-arith'
      },
      {
        id: 's2',
        label: 'Két szám különbsége 15: a - b = 15',
        category: 'cat-arith'
      },
      {
        id: 's3',
        label: 'Egy szám fele hozzáadva a harmadához: x/2 + x/3',
        category: 'cat-arith'
      },
      {
        id: 's4',
        label: 'A keresett szám háromszorosából kivonunk 6-ot: 3x - 6',
        category: 'cat-arith'
      },
      {
        id: 's5',
        label: 'Három egymást követő természetes szám: n, n+1, n+2',
        category: 'cat-seq'
      },
      {
        id: 's6',
        label: 'Két egymást követő páros szám: 2k, 2k+2',
        category: 'cat-seq'
      },
      {
        id: 's7',
        label: 'Egymást követő páratlan számok: 2k+1, 2k+3, 2k+5',
        category: 'cat-seq'
      },
      {
        id: 's8',
        label: 'Három egymást követő páros szám összege: 6k + 6',
        category: 'cat-seq'
      },
      {
        id: 's9',
        label: 'Két szám aránya 3 : 7 (a számok: 3x és 7x)',
        category: 'cat-ratio'
      },
      {
        id: 's10',
        label: 'Egy számot 20%-kal megnövelünk: 1,2x',
        category: 'cat-ratio'
      },
      {
        id: 's11',
        label: 'Egy összeget 2 : 3 : 5 arányban osztunk fel',
        category: 'cat-ratio'
      },
      {
        id: 's12',
        label: 'Egy számot 15%-kal csökkentünk: 0,85x',
        category: 'cat-ratio'
      }
    ]
  },
  2: {
    title: '2. Szint: Életkori Idődimenziók és Relációk',
    subtitle: 'Csoportosítsd az állításokat múltbeli, jelenbeli vagy jövőbeli időviszonylat szerint!',
    categories: [
      {
        id: 'cat-past',
        name: 'Múltbeli időugrás (k éve)',
        description: 'Évek levonása mindkét szereplő korából: (A - k)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-present',
        name: 'Jelenbeli állapot (Ma)',
        description: 'Mostani életkorok, korkülönbség és jelenlegi arányok',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-future',
        name: 'Jövőbeli időugrás (m év múlva)',
        description: 'Évek hozzáadása minden szereplő korához: (A + m)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '5 évvel ezelőtt apa háromszor annyi idős volt: A - 5 = 3(F - 5)',
        category: 'cat-past'
      },
      {
        id: 's14',
        label: '3 évvel ezelőtt a lány kora L - 3 év volt',
        category: 'cat-past'
      },
      {
        id: 's15',
        label: 'Múltbeli korok összege 4 évvel ezelőtt 42 év volt',
        category: 'cat-past'
      },
      {
        id: 's16',
        label: 'Amikor a gyermek megszületett, az édesanya 27 éves volt',
        category: 'cat-past'
      },
      {
        id: 's17',
        label: 'Péter jelenleg kétszer annyi idős, mint Anna: P = 2A',
        category: 'cat-present'
      },
      {
        id: 's18',
        label: 'Kettejük életkorának összege most pontosan 54 év',
        category: 'cat-present'
      },
      {
        id: 's19',
        label: 'Az apa jelenleg 28 évvel idősebb a fiánál: A - F = 28',
        category: 'cat-present'
      },
      {
        id: 's20',
        label: 'A nagypapa, apa és fiú életkorának mostani aránya 12 : 7 : 2',
        category: 'cat-present'
      },
      {
        id: 's21',
        label: '6 év múlva az anya kora A + 6 lesz',
        category: 'cat-future'
      },
      {
        id: 's22',
        label: 'Hány év múlva lesz az apa életkora a fia korának háromszorosa?',
        category: 'cat-future'
      },
      {
        id: 's23',
        label: '8 év múlva a két testvér életkorának összege 36 év lesz',
        category: 'cat-future'
      },
      {
        id: 's24',
        label: 'x év múlva az idősebb testvér kora: T₁ + x',
        category: 'cat-future'
      }
    ]
  },
  3: {
    title: '3. Szint: Helyiérték és Oszthatósági Törvényszerűségek',
    subtitle: 'Kategorizáld a formulákat a 9-es, 11-es törvény vagy az általános helyiérték szerint!',
    categories: [
      {
        id: 'cat-div9',
        name: '9-es oszthatóság (Különbség)',
        description: 'Számjegycsere különbsége: 9(a - b), mindig 9-cel osztható',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-div11',
        name: '11-es oszthatóság (Összeg)',
        description: 'Számjegycsere összege: 11(a + b), mindig 11-gyel osztható',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-placeval',
        name: 'Helyiértékes alapszabály',
        description: 'A tízes számrendszer felépítése és a számjegyek megszorításai',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'Eredeti és felcserélt kétjegyű szám különbsége: 9(a - b)',
        category: 'cat-div9'
      },
      {
        id: 's26',
        label: 'Kétjegyű számból kivonva jegyei összegét: (10a+b) - (a+b) = 9a',
        category: 'cat-div9'
      },
      {
        id: 's27',
        label: 'A számjegyek felcserélésekor bekövetkező változás: ±9, ±18, ±27...',
        category: 'cat-div9'
      },
      {
        id: 's28',
        label: '(10a + b) - (10b + a) mindig maradék nélkül osztható 9-cel',
        category: 'cat-div9'
      },
      {
        id: 's29',
        label: 'Eredeti és felcserélt szám összege: 11(a + b)',
        category: 'cat-div11'
      },
      {
        id: 's30',
        label: 'Kétjegyű szám, melynek mindkét jegye azonos (pl. 33, 44, 77)',
        category: 'cat-div11'
      },
      {
        id: 's31',
        label: '(10a + b) + (10b + a) = 11a + 11b',
        category: 'cat-div11'
      },
      {
        id: 's32',
        label: 'Egy kétjegyű szám és felcseréltje összege mindig osztható 11-gyel',
        category: 'cat-div11'
      },
      {
        id: 's33',
        label: 'Kétjegyű szám értéke tízes a és egyes b jeggyel: 10a + b',
        category: 'cat-placeval'
      },
      {
        id: 's34',
        label: 'Háromjegyű szám felírása: 100a + 10b + c',
        category: 'cat-placeval'
      },
      {
        id: 's35',
        label: 'A tízes helyiértéken nem állhat 0: a ∈ {1, 2, ..., 9}',
        category: 'cat-placeval'
      },
      {
        id: 's36',
        label: 'Számjegyek összege a feladat szövegében: a + b',
        category: 'cat-placeval'
      }
    ]
  }
};

export const NumbersAgesSorter: React.FC<NumbersAgesSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-numbers-ages-sorter',
  topicTitle = '2. Szöveges feladatok számokról, életkorokról'
}) => {
  return (
    <SorterTemplate
      title="Szöveges Feladatok Csoportosító"
      subtitle="Kategorizáld az összefüggéseket matematikai műveletek, idődimenziók és helyiértékes törvények szerint!"
      badge="8. OSZTÁLY • III. EGYENLETEK • 📊 CSOPORTOSÍTÓ"
      levels={sorterLevels}
      currentLevel={level}
      themeColor="rose"
      topicId={topicId}
      topicTitle={topicTitle}
      grade={8}
      chapterId="egyenletek"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default NumbersAgesSorter;
