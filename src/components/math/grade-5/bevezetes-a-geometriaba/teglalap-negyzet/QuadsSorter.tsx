import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface QuadsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const QuadsSorter: React.FC<QuadsSorterProps> = ({
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
    // 1. SZINT: TÉGLALAP VS. NÉGYZET TULAJDONSÁGOK
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-both',
          name: 'Mindkettőre igaz (Közös)',
          description: 'A téglalap és a négyzet közös geometriai tulajdonsága',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-square-only',
          name: 'Csak a négyzetre igaz',
          description: 'Olyan speciális tulajdonság, amivel általános téglalap nem rendelkezik',
          badgeColor: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800'
        },
        {
          id: 'cat-neither',
          name: 'Egyikre sem igaz',
          description: 'Hamis geometriai állítás vagy más alakzatra jellemző',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'Mind a 4 belső szöge 90°-os derékszög',
          categoryId: 'cat-both',
          explanation: 'Mind a téglalapnak, mind a négyzetnek minden belső szöge derékszög.'
        },
        {
          id: 's1-2',
          text: 'MINDEN oldala egyenlő hosszú (a = b = c = d)',
          categoryId: 'cat-square-only',
          explanation: 'Csak a négyzet minden oldala egyenlő, a sima téglalapnak lehetnek különböző hosszúságú oldalai.'
        },
        {
          id: 's1-3',
          text: 'Szemközti oldalai párhuzamosak egymással',
          categoryId: 'cat-both',
          explanation: 'Mindkét alakzat paralelogramma: szemközti oldalai párhuzamosak.'
        },
        {
          id: 's1-4',
          text: 'Pontosan 4 szimmetriatengelye van',
          categoryId: 'cat-square-only',
          explanation: 'A négyzetnek 4 tengelye van (2 oldalfelező + 2 átló), míg a téglalapnak csak 2.'
        },
        {
          id: 's1-5',
          text: 'Belső szögeinek összege 180°',
          categoryId: 'cat-neither',
          explanation: 'Ez a háromszögekre igaz! A négyszögek belső szögeinek összege 360°.'
        },
        {
          id: 's1-6',
          text: 'Átlói egyenlő hosszúak és felezik egymást',
          categoryId: 'cat-both',
          explanation: 'Mind a téglalap, mind a négyzet 2 átlója egyenlő hosszú és egymást felezi.'
        },
        {
          id: 's1-7',
          text: 'Átlói merőlegesek egymásra (90°)',
          categoryId: 'cat-square-only',
          explanation: 'Csak a négyzet átlói merőlegesek egymásra, a sima téglalapé nem.'
        },
        {
          id: 's1-8',
          text: 'Átlói felezik a belső derékszögeket (45°-ra)',
          categoryId: 'cat-square-only',
          explanation: 'A négyzet átlói szögfelezők is egyben (45°-os szögekre osztják a 90°-ot).'
        },
        {
          id: 's1-9',
          text: 'Szomszédos oldalai mindig hegyesszöget zárnak be',
          categoryId: 'cat-neither',
          explanation: 'Hamis, mert a szomszédos oldalak mindig 90°-os derékszöget zárnak be.'
        },
        {
          id: 's1-10',
          text: 'Kerülete a 4 határoló oldal összhossza',
          categoryId: 'cat-both',
          explanation: 'A kerület definíciója minden négyszögnél az oldalak összege.'
        },
        {
          id: 's1-11',
          text: 'Szabályos négyszögnek nevezzük',
          categoryId: 'cat-square-only',
          explanation: 'Szabályos alakzatnak azt nevezzük, aminek minden oldala és minden szöge egyenlő: ez a négyzet.'
        },
        {
          id: 's1-12',
          text: 'Nincs egyetlen szimmetriatengelye sem',
          categoryId: 'cat-neither',
          explanation: 'Hamis, a téglalapnak 2, a négyzetnek 4 tükörtengelye van.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZIMMETRIATENGELYEK ÉS ÁTLÓK
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-rect-sym',
          name: 'Csak a téglalapra jellemző (általános)',
          description: 'Olyan tulajdonság, ami általános téglalapra igaz, de négyzetre nem szigorúan',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-sq-sym',
          name: 'A négyzet szimmetriája és átlói',
          description: 'A négyzet gazdagabb szimmetriájához kapcsolódó állítások',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-false-sym',
          name: 'Hamis szimmetria-állítások',
          description: 'Gyakori tévhitek a szimmetriáról és átlókról',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Pontosan 2 szimmetriatengelye van',
          categoryId: 'cat-rect-sym',
          explanation: 'A téglalapnak pontosan 2 tükörtengelye van (a két oldalfelező merőleges).'
        },
        {
          id: 's2-2',
          text: 'Az átlói egyben tükörtengelyek is',
          categoryId: 'cat-sq-sym',
          explanation: 'A négyzet átlói mentén félbehajtva a lapot a csúcsok pontosan fedik egymást.'
        },
        {
          id: 's2-3',
          text: 'A téglalap átlója tükörtengely',
          categoryId: 'cat-false-sym',
          explanation: 'Tévhit! A sima téglalap átlója mentén hajtva a sarkok elcsúsznak egymástól.'
        },
        {
          id: 's2-4',
          text: 'Átlói 4 egybevágó egyenlő szárú derékszögű háromszögre bontják',
          categoryId: 'cat-sq-sym',
          explanation: 'A négyzet átlói 4 db 45°-45°-90°-os egyforma derékszögű háromszögre osztják a testet.'
        },
        {
          id: 's2-5',
          text: 'Átlói két hegyesszöget és két tompaszöget zárnak be egymással',
          categoryId: 'cat-rect-sym',
          explanation: 'Általános téglalapban az átlók nem 90°-ot zárnak be, hanem két kisebb és két nagyobb szöget.'
        },
        {
          id: 's2-6',
          text: 'Összesen 8 szimmetriatengelye van',
          categoryId: 'cat-false-sym',
          explanation: 'Hamis, még a négyzetnek is csak 4 tengelye van.'
        },
        {
          id: 's2-7',
          text: '2 oldalfelező és 2 átlós tengelye van',
          categoryId: 'cat-sq-sym',
          explanation: 'Ez a négyzet 4 szimmetriatengelyének pontos elhelyezkedése.'
        },
        {
          id: 's2-8',
          text: 'Kizárólag az oldalfelező merőlegesei a tükörtengelyei',
          categoryId: 'cat-rect-sym',
          explanation: 'A téglalapnál csak az oldalfelezők a tengelyek, az átlók nem.'
        },
        {
          id: 's2-9',
          text: 'A négyzetnek nincs egyetlen tükörtengelye sem',
          categoryId: 'cat-false-sym',
          explanation: 'Hamis, a négyzetnek 4 szimmetriatengelye van.'
        },
        {
          id: 's2-10',
          text: 'Átlói merőlegesek egymásra: e ⊥ f',
          categoryId: 'cat-sq-sym',
          explanation: 'A négyzet átlói pontosan 90°-os szöget zárnak be.'
        },
        {
          id: 's2-11',
          text: 'Minden négyszögnek legalább 2 szimmetriatengelye van',
          categoryId: 'cat-false-sym',
          explanation: 'Hamis, egy általános négyszögnek egyáltalán nincs szimmetriatengelye.'
        },
        {
          id: 's2-12',
          text: 'Átlói felezik egymást az M pontban',
          categoryId: 'cat-rect-sym',
          explanation: 'Mindkettőre igaz, de a téglalap alapvető átlótulajdonsága.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KERÜLET ÉS TERÜLET
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-perimeter',
          name: 'Kerület (K) fogalma és számolása',
          description: 'A határvonal, körbekerítés hossza, mértékegysége síkban',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-area',
          name: 'Terület (T) fogalma és számolása',
          description: 'A lefedett felület nagysága, egységnégyzetek száma',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-calc-error',
          name: 'Hibás számolás / képlet',
          description: 'Mértékegység-tévesztés vagy helytelen művelet',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Képlete téglalapnál: 2 · (a + b)',
          categoryId: 'cat-perimeter',
          explanation: 'A téglalap kerülete az oldalak összegének kétszerese.'
        },
        {
          id: 's3-2',
          text: 'Képlete téglalapnál: a · b',
          categoryId: 'cat-area',
          explanation: 'A téglalap területe a két szomszédos oldal szorzata.'
        },
        {
          id: 's3-3',
          text: 'Mértékegységei: mm², cm², dm², m²',
          categoryId: 'cat-area',
          explanation: 'A terület mindig négyzetes (síkmérték) mértékegységben értendő.'
        },
        {
          id: 's3-4',
          text: 'Mértékegységei: mm, cm, dm, m',
          categoryId: 'cat-perimeter',
          explanation: 'A kerület hosszúság, így sima hosszmértékegységben mérjük.'
        },
        {
          id: 's3-5',
          text: 'Négyzetnél: 4 · a',
          categoryId: 'cat-perimeter',
          explanation: 'Mivel a négyzet 4 oldala egyenlő, a kerülete 4 · a.'
        },
        {
          id: 's3-6',
          text: 'Négyzetnél: a · a = a²',
          categoryId: 'cat-area',
          explanation: 'A négyzet területe az oldal önmagával vett szorzata.'
        },
        {
          id: 's3-7',
          text: 'a = 3 dm és b = 4 cm esetén T = 3 · 4 = 12 cm²',
          categoryId: 'cat-calc-error',
          explanation: 'Hiba! Nem szabad közvetlenül összeszorozni: 3 dm = 30 cm, így T = 30 · 4 = 120 cm².'
        },
        {
          id: 's3-8',
          text: 'Megadja, hány darab 1 cm²-es négyzet fedi le a síkidomot',
          categoryId: 'cat-area',
          explanation: 'Ez a terület szemléletes geometriai jelentése négyzetrácson.'
        },
        {
          id: 's3-9',
          text: 'A négyszöget körbevevő kerítés hossza',
          categoryId: 'cat-perimeter',
          explanation: 'A kerület a határoló vonalak összessége.'
        },
        {
          id: 's3-10',
          text: 'a = 5 cm négyzet területe: T = 20 cm',
          categoryId: 'cat-calc-error',
          explanation: 'Hiba! A kerület lenne 20 cm, a terület pedig 5 · 5 = 25 cm²!'
        },
        {
          id: 's3-11',
          text: 'Négyzet esetén ha K = 36 cm, akkor a = 9 cm',
          categoryId: 'cat-perimeter',
          explanation: 'Helyes kerületszámítás visszafelé: a = 36 : 4 = 9 cm.'
        },
        {
          id: 's3-12',
          text: 'K = a · b (téglalap kerületének számolása szorzással)',
          categoryId: 'cat-calc-error',
          explanation: 'Hiba! A kerületnél összeadunk (2a + 2b), a szorzás a terület képlete.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      topicId="g5-geom-quads-quiz"
      title="Téglalap, négyzet csoportosító"
      subtitle="Húzd a tulajdonságokat és állításokat a megfelelő csoportba!"
      levels={levels}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

export default QuadsSorter;
