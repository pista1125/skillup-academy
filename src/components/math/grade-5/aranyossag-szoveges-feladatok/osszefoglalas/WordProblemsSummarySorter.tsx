import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface WordProblemsSummarySorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const WordProblemsSummarySorter: React.FC<WordProblemsSummarySorterProps> = ({
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
    // 1. SZINT: MENNYISÉGFÁJTÁK CSOPORTOSÍTÁSA
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-mass',
          name: 'Tömeg mértékei (g, dkg, kg, t)',
          description: 'Súlyok, élelmiszerek, járművek és csomagok mérése',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-capacity',
          name: 'Űrtartalom mértékei (ml, cl, dl, l, hl)',
          description: 'Folyadékok, tartályok, üdítők és fürdővíz térfogata',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'cat-time',
          name: 'Idő mértékei (s, min, h, nap, év)',
          description: 'Események hossza, utazási idő és menetrendek',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: '50 dkg finomliszt a kalácshoz',
          categoryId: 'cat-mass',
          explanation: 'A dekagramm (dkg) tömegmértékegység.'
        },
        {
          id: 's1-2',
          text: '2,5 dl meleg tej a kakaóhoz',
          categoryId: 'cat-capacity',
          explanation: 'A deciliter (dl) folyadékok űrtartalmát méri.'
        },
        {
          id: 's1-3',
          text: '45 perc tanóra az iskolában',
          categoryId: 'cat-time',
          explanation: 'A perc (min) az idő mérésére szolgál.'
        },
        {
          id: 's1-4',
          text: '1,5 t teherbírású kis teherautó',
          categoryId: 'cat-mass',
          explanation: 'A tonna (t) nagy tömegek mértékegysége (1000 kg).'
        },
        {
          id: 's1-5',
          text: '500 ml ásványvizes palack',
          categoryId: 'cat-capacity',
          explanation: 'A milliliter (ml) űrmérték (0,5 liter).'
        },
        {
          id: 's1-6',
          text: '3 napos hétvégi kirándulás',
          categoryId: 'cat-time',
          explanation: 'A nap (24 óra) időmértékegység.'
        },
        {
          id: 's1-7',
          text: '350 g túró a palacsintába',
          categoryId: 'cat-mass',
          explanation: 'A gramm (g) tömegmérték.'
        },
        {
          id: 's1-8',
          text: '2 hl esővíz a kerti hordóban',
          categoryId: 'cat-capacity',
          explanation: 'A hektoliter (hl) 100 liter űrtartalmat jelent.'
        },
        {
          id: 's1-9',
          text: '120 másodperc pihenő a futás után',
          categoryId: 'cat-time',
          explanation: 'A másodperc (s) az idő alapmértékegysége.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: NYITOTT MONDATOK ÉS ÁLLÍTÁSOK TÍPUSAI
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-equation',
          name: 'Egyenletek (Egyenlőség =)',
          description: 'Pontosan egy (vagy véges sok) megoldást adó egyensúly',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-inequality',
          name: 'Egyenlőtlenségek (<, >, ≤, ≥)',
          description: 'Számtartományt, intervallumot kijelölő relációk',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'cat-identity',
          name: 'Azonosságok / Mindig igazak',
          description: 'Minden megengedett számra igaz matematikai szabályok',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: '3 · x + 7 = 22',
          categoryId: 'cat-equation',
          explanation: 'Egyenlet, mert egyenlőségjel szerepel benne, megoldása x = 5.'
        },
        {
          id: 's2-2',
          text: 'x − 5 < 12',
          categoryId: 'cat-inequality',
          explanation: 'Egyenlőtlenség, a megoldás az x < 17 tartomány.'
        },
        {
          id: 's2-3',
          text: 'a + b = b + a',
          categoryId: 'cat-identity',
          explanation: 'Az összeadás felcserélhetőségi azonossága, minden számra igaz.'
        },
        {
          id: 's2-4',
          text: '4 · x ≥ 20',
          categoryId: 'cat-inequality',
          explanation: 'Egyenlőtlenség megengedő jellel (x ≥ 5).'
        },
        {
          id: 's2-5',
          text: '(50 − x) : 4 = 10',
          categoryId: 'cat-equation',
          explanation: 'Egyenlet, x = 10 teszi igazzá.'
        },
        {
          id: 's2-6',
          text: 'x · 1 = x',
          categoryId: 'cat-identity',
          explanation: 'Az 1-gyel való szorzás alaptulajdonsága, minden x-re igaz.'
        },
        {
          id: 's2-7',
          text: '2 · x + 1 > 15',
          categoryId: 'cat-inequality',
          explanation: 'Szigorú egyenlőtlenség (x > 7).'
        },
        {
          id: 's2-8',
          text: 'x + 18 = 42',
          categoryId: 'cat-equation',
          explanation: 'Egyszerű egyenlet, x = 24.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ARÁNYOSSÁGI HELYZETEK BESOROLÁSA
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-direct',
          name: 'Egyenes arányosság',
          description: 'Hányszorosára nő az egyik, annyiszorosára nő a másik',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-inverse',
          name: 'Fordított arányosság / összefüggés',
          description: 'Hányszorosára nő az egyik, annyiad részére csökken a másik',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-nonprop',
          name: 'Nem arányos összefüggés',
          description: 'Nincs szorzási arány (életkorok növekedése, fix belépődíj stb.)',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Megvásárolt alma tömege és a fizetendő forintösszeg',
          categoryId: 'cat-direct',
          explanation: 'Kétszer annyi alma kétszer annyiba kerül: egyenes arányosság.'
        },
        {
          id: 's3-2',
          text: 'Ugyanazon árok kiásásához szükséges munkások száma és az eltelt órák',
          categoryId: 'cat-inverse',
          explanation: 'Több munkás kevesebb idő alatt végez: fordított jellegű összefüggés.'
        },
        {
          id: 's3-3',
          text: 'Bence életkora és a testvére életkora az évek során',
          categoryId: 'cat-nonprop',
          explanation: 'Különbségük állandó marad, nem a szorzatuk vagy hányadosuk: nem arányos.'
        },
        {
          id: 's3-4',
          text: 'Autó által állandó sebességgel megtett km-ek és az eltelt órák',
          categoryId: 'cat-direct',
          explanation: 'Kétszer annyi idő alatt kétszer annyi távolságot tesz meg: egyenes arányosság.'
        },
        {
          id: 's3-5',
          text: 'Adott távolság megtételéhez szükséges sebesség és a menetidő',
          categoryId: 'cat-inverse',
          explanation: 'Nagyobb sebességgel kevesebb idő kell ugyanahhoz az úthoz: fordított jelleg.'
        },
        {
          id: 's3-6',
          text: 'Egy gyerek magassága és az életkora évei',
          categoryId: 'cat-nonprop',
          explanation: 'Nem nő a magasságunk az életkorunk arányában (10-ről 20 évre nem duplázódik a testmagasság).'
        },
        {
          id: 's3-7',
          text: 'Füzetek darabszáma és a számla végösszege',
          categoryId: 'cat-direct',
          explanation: 'Darabszám és ár tiszta egyenes arányosság.'
        },
        {
          id: 's3-8',
          text: 'Fix 1000 Ft belépőjegy + fagyi ára a strandon',
          categoryId: 'cat-nonprop',
          explanation: 'A fix alapdíj miatt nem egyenes arányos a fogyasztással.'
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="VI. Fejezet Összefoglaló Csoportosító"
      subtitle="Válogasd szét a mértékegységeket, egyenleteket és arányossági helyzeteket a megfelelő csoportokba!"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK"
      topicId="g5-summary-wp-sorter"
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

export default WordProblemsSummarySorter;
