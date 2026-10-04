import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpecialRightTrianglesSorterProps {
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
    title: '1. Szint: Háromszögek Típusa és Tulajdonságai',
    subtitle: 'Sorold be a tulajdonságokat, arányokat és adatokat a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-45',
        name: '45°-45°-90° (Négyzet fele)',
        description: 'Egyenlő szárú derékszögű háromszög (1 : 1 : √2)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-30',
        name: '30°-60°-90° (Félszabályos)',
        description: 'Szabályos háromszög fele (1 : √3 : 2)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-other',
        name: 'Egyikhez sem tartozik',
        description: 'Általános derékszögű vagy más háromszög',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      {
        id: 'srt-s1-1',
        text: 'Befogók aránya pontosan 1 : 1',
        category: 'cat-45',
        explanation: 'Az egyenlő szárú derékszögű háromszög két befogója azonos hosszúságú.',
        badge: 'a = b'
      },
      {
        id: 'srt-s1-2',
        text: 'Oldalak aránya: 1 : √3 : 2',
        category: 'cat-30',
        explanation: 'A 30°-60°-90°-os háromszög oldalarányai: a : a√3 : 2a.',
        badge: '1 : √3 : 2'
      },
      {
        id: 'srt-s1-3',
        text: 'Átfogó = befogó · √2',
        category: 'cat-45',
        explanation: 'A négyzet átlója d = a√2, ami az átfogó.',
        badge: 'c = a√2'
      },
      {
        id: 'srt-s1-4',
        text: 'Átfogó pontosan a kétszerese a legkisebb befogónak',
        category: 'cat-30',
        explanation: 'A 30°-kal szemközti oldal mindig pontosan fele az átfogónak (c = 2a).',
        badge: 'c = 2a'
      },
      {
        id: 'srt-s1-5',
        text: 'Szabályos háromszög szimmetriatengelye mentén keletkezik',
        category: 'cat-30',
        explanation: 'A szabályos háromszög magassága 30°-60°-90°-os háromszögekre bontja az alakzatot.',
        badge: 'Félszabályos'
      },
      {
        id: 'srt-s1-6',
        text: 'Négyzet szimmetriaátlója mentén keletkezik',
        category: 'cat-45',
        explanation: 'A négyzet átlója két egyenlő szárú derékszögű háromszögre osztja a síkidomot.',
        badge: 'Négyzetátló'
      },
      {
        id: 'srt-s1-7',
        text: 'Oldalhosszak: 3 cm, 4 cm, 5 cm',
        category: 'cat-other',
        explanation: 'Derékszögű háromszög, de szögei kb. 36,87° és 53,13°, nem nevezetes háromszög.',
        badge: '3-4-5 3szög'
      },
      {
        id: 'srt-s1-8',
        text: 'Az átfogóhoz tartozó magasság pontosan fele az átfogónak',
        category: 'cat-45',
        explanation: 'A 45°-45°-90°-os háromszögben m = c/2, mivel két kisebb 45-45-90-re bomlik.',
        badge: 'm = c/2'
      },
      {
        id: 'srt-s1-9',
        text: 'A hosszabbik befogó hossza b = a · √3',
        category: 'cat-30',
        explanation: 'A 60°-os szöggel szemközti befogó a rövid befogó √3-szorosa.',
        badge: 'b = a√3'
      },
      {
        id: 'srt-s1-10',
        text: 'Belső szögei: 40°, 50°, 90°',
        category: 'cat-other',
        explanation: 'Bár derékszögű, nem tartozik a nevezetes (45-45 vagy 30-60) háromszögek közé.',
        badge: '40°-50°-90°'
      },
      {
        id: 'srt-s1-11',
        text: 'Területe: T = a² / 2 (ahol a a befogó)',
        category: 'cat-45',
        explanation: 'Mivel a két befogó egyenlő és derékszöget zár be, T = (a · a) / 2.',
        badge: 'T = a²/2'
      },
      {
        id: 'srt-s1-12',
        text: 'Oldalhosszak: 5 cm, 12 cm, 13 cm',
        category: 'cat-other',
        explanation: 'Pitagoraszi számhármas, de szögei nem 45° vagy 30°-60° fokosak.',
        badge: '5-12-13'
      }
    ]
  },
  2: {
    title: '2. Szint: Kifejezések és Számértékek Típusa',
    subtitle: 'Döntsd el, hogy a keresett mérték pontos egész szám, √2-es vagy √3-as gyökös érték!',
    categories: [
      {
        id: 'cat-int',
        name: 'Egész Szám',
        description: 'Kerek, pontos egész számként kifejezhető érték',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sqrt2',
        name: '√2-es Kifejezés',
        description: 'k · √2 alakú irracionális pontos érték',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-sqrt3',
        name: '√3-as Kifejezés',
        description: 'k · √3 alakú irracionális pontos érték',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 'srt-s2-1',
        text: '6 cm oldalú négyzet átlójának hossza',
        category: 'cat-sqrt2',
        explanation: 'd = a√2 = 6√2 cm.',
        badge: '= 6√2 cm'
      },
      {
        id: 'srt-s2-2',
        text: '10 cm átfogójú 30°-60°-90° háromszög rövid befogója',
        category: 'cat-int',
        explanation: 'A 30°-kal szemközti oldal az átfogó fele: a = 10 / 2 = 5 cm (egész).',
        badge: '= 5 cm'
      },
      {
        id: 'srt-s2-3',
        text: '4 cm rövid befogójú félszabályos háromszög hosszú befogója',
        category: 'cat-sqrt3',
        explanation: 'b = a√3 = 4√3 cm.',
        badge: '= 4√3 cm'
      },
      {
        id: 'srt-s2-4',
        text: '8 cm oldalú szabályos háromszög magassága',
        category: 'cat-sqrt3',
        explanation: 'm = (a / 2) · √3 = 4√3 cm.',
        badge: '= 4√3 cm'
      },
      {
        id: 'srt-s2-5',
        text: '4√2 cm befogójú egyenlő szárú derékszögű 3szög átfogója',
        category: 'cat-int',
        explanation: 'c = a√2 = 4√2 · √2 = 4 · 2 = 8 cm (egész szám).',
        badge: '= 8 cm'
      },
      {
        id: 'srt-s2-6',
        text: '2√3 cm rövid befogójú 30-60-90 háromszög hosszú befogója',
        category: 'cat-int',
        explanation: 'b = a√3 = (2√3) · √3 = 2 · 3 = 6 cm (egész szám).',
        badge: '= 6 cm'
      },
      {
        id: 'srt-s2-7',
        text: '10√2 cm átlójú négyzet oldala',
        category: 'cat-int',
        explanation: 'a = d / √2 = 10√2 / √2 = 10 cm (egész szám).',
        badge: '= 10 cm'
      },
      {
        id: 'srt-s2-8',
        text: '5 cm oldalú négyzet átlója',
        category: 'cat-sqrt2',
        explanation: 'd = a√2 = 5√2 cm.',
        badge: '= 5√2 cm'
      },
      {
        id: 'srt-s2-9',
        text: '12 cm átfogójú félszabályos háromszög hosszú befogója',
        category: 'cat-sqrt3',
        explanation: 'a = 6 cm ⟹ b = 6√3 cm.',
        badge: '= 6√3 cm'
      },
      {
        id: 'srt-s2-10',
        text: '7 cm befogójú 45°-45°-90° háromszög átfogója',
        category: 'cat-sqrt2',
        explanation: 'c = a√2 = 7√2 cm.',
        badge: '= 7√2 cm'
      },
      {
        id: 'srt-s2-11',
        text: '10 cm oldalú szabályos hatszög rövidebb átlója',
        category: 'cat-sqrt3',
        explanation: 'd_{rövid} = a√3 = 10√3 cm.',
        badge: '= 10√3 cm'
      },
      {
        id: 'srt-s2-12',
        text: '6 cm rövid befogójú félszabályos háromszög átfogója',
        category: 'cat-int',
        explanation: 'c = 2a = 2 · 6 = 12 cm (egész szám).',
        badge: '= 12 cm'
      }
    ]
  },
  3: {
    title: '3. Szint: Állítások és Összefüggések Igazsága',
    subtitle: 'Döntsd el az állításokról: Mindig igaz, Csak bizonyos esetekben, vagy Soha nem igaz!',
    categories: [
      {
        id: 'cat-always',
        name: 'Mindig Igaz',
        description: 'Tétel vagy matematikai azonosság',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sometimes',
        name: 'Csak Bizonyos Esetekben',
        description: 'Csak meghatározott háromszögekre vagy feltételre igaz',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-never',
        name: 'Soha Nem Igaz',
        description: 'Matematikai képtelenség vagy tévedés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'srt-s3-1',
        text: 'A 30°-os szöggel szemközti befogó mindig fele az átfogónak',
        category: 'cat-always',
        explanation: 'Ez a 30°-60°-90°-os derékszögű háromszög alapvető törvénye.',
        badge: 'Alaptétel'
      },
      {
        id: 'srt-s3-2',
        text: 'Egy derékszögű háromszög két befogója egyenlő hosszú',
        category: 'cat-sometimes',
        explanation: 'Csak az egyenlő szárú derékszögű (45-45-90) háromszögekre igaz.',
        badge: 'Feltételes'
      },
      {
        id: 'srt-s3-3',
        text: 'A 45°-45°-90°-os háromszög átfogója rövidebb, mint a befogója',
        category: 'cat-never',
        explanation: 'Bármely derékszögű háromszögben az átfogó a leghosszabb oldal (c = a√2 > a).',
        badge: 'Lehetetlen'
      },
      {
        id: 'srt-s3-4',
        text: 'Egy a oldalú szabályos háromszög magassága m = a√3 / 2',
        category: 'cat-always',
        explanation: 'A Pitagorasz-tételből levezetett pontos képlet.',
        badge: 'Magasságképlet'
      },
      {
        id: 'srt-s3-5',
        text: 'A 30°-60°-90°-os háromszögben az átfogó c = a · √3',
        category: 'cat-never',
        explanation: 'Az átfogó kétszerese a rövid befogónak (c = 2a), a hosszabbik befogó az a√3.',
        badge: 'Téves képlet'
      },
      {
        id: 'srt-s3-6',
        text: 'A négyzet átlója felezi a derékszögű belső szögeket (45°-45°)',
        category: 'cat-always',
        explanation: 'A négyzet szimmetriája miatt az átló szögfelező is egyben.',
        badge: 'Szögfelezés'
      },
      {
        id: 'srt-s3-7',
        text: 'Az egyenlő szárú derékszögű háromszög átfogójának négyzete 2a²',
        category: 'cat-always',
        explanation: 'c² = a² + a² = 2a².',
        badge: 'c² = 2a²'
      },
      {
        id: 'srt-s3-8',
        text: 'Egy derékszögű háromszög hegyesszögei 45° és 45° fokosak',
        category: 'cat-sometimes',
        explanation: 'Csak akkor, ha a háromszög egyenlő szárú is.',
        badge: 'Feltételes'
      },
      {
        id: 'srt-s3-9',
        text: 'A 60°-os szöggel szemközti befogó fele az átfogónak',
        category: 'cat-never',
        explanation: 'A 30°-kal szemközti oldal fele az átfogónak, a 60°-kal szemközti az a√3 hosszúságú!',
        badge: 'Rossz szög'
      },
      {
        id: 'srt-s3-10',
        text: 'A szabályos hatszög felbontható 6 egybevágó szabályos háromszögre',
        category: 'cat-always',
        explanation: 'A középpontból a csúcsokba húzott sugarak 6 szabályos háromszöget alkotnak.',
        badge: 'Hatszög bontás'
      },
      {
        id: 'srt-s3-11',
        text: 'A 30°-60°-90° háromszög két befogója azonos hosszúságú',
        category: 'cat-never',
        explanation: 'A két befogó aránya 1 : √3, soha nem egyenlőek.',
        badge: 'Különböző befogók'
      },
      {
        id: 'srt-s3-12',
        text: 'Egy derékszögű háromszög oldalaránya 1 : 1 : √2',
        category: 'cat-sometimes',
        explanation: 'Csak a 45°-45°-90°-os egyenlő szárú derékszögű háromszögre igaz.',
        badge: 'Feltételes'
      }
    ]
  }
};

export const SpecialRightTrianglesSorter: React.FC<SpecialRightTrianglesSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-pyth-special-triangles-sorter',
  topicTitle = 'Nevezetes Derékszögű Háromszögek'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`srt-sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      title={currentConfig.title || 'Csoportosító Játék • Nevezetes Háromszögek'}
      subtitle={currentConfig.subtitle || 'Kategorizáld a tulajdonságokat, kifejezéseket és geometriai tételeket!'}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 6. Lecke • Nevezetes Háromszögek"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default SpecialRightTrianglesSorter;
