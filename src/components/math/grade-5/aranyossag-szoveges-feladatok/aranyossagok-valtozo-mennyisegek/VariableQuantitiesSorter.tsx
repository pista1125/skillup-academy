import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface VariableQuantitiesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const VariableQuantitiesSorter: React.FC<VariableQuantitiesSorterProps> = ({
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
    // 1. SZINT: VÁLTOZÁSI KAPCSOLAT TÍPUSA A VALÓSÁGBAN
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-together',
          name: 'Együtt növekvő / csökkenő mennyiségek',
          description: 'Ha az egyik több lesz, a másik is több lesz; ha az egyik kevesebb, a másik is kevesebb',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-opposite',
          name: 'Ellentétesen változó mennyiségek',
          description: 'Ha az egyik több lesz, a másik kevesebb lesz (pl. megosztás, munkatempó)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-independent',
          name: 'Független, nem összefüggő adatok',
          description: 'Nincs közöttük semmilyen matematikai vagy közvetlen fizikai összefüggés',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 's1-1',
          text: 'A megvásárolt ceruzák száma és a fizetendő végösszeg',
          categoryId: 'cat-together',
          explanation: 'Több ceruzáért többet fizetünk.'
        },
        {
          id: 's1-2',
          text: 'A szobafestők száma és a munka befejezésének ideje',
          categoryId: 'cat-opposite',
          explanation: 'Több munkás gyorsabban (kevesebb idő alatt) végez.'
        },
        {
          id: 's1-3',
          text: 'Egy felnőtt ember életkora és a cipőmérete',
          categoryId: 'cat-independent',
          explanation: 'A felnőtt lábméret nem nő az évek múlásával.'
        },
        {
          id: 's1-4',
          text: 'A kerékpározás ideje és a megtett távolság állandó sebességnél',
          categoryId: 'cat-together',
          explanation: 'Több idő alatt nagyobb távolságot teszünk meg.'
        },
        {
          id: 's1-5',
          text: 'Egy csomag cukorka elosztása a gyerekek között és az 1 gyerekre jutó darabszám',
          categoryId: 'cat-opposite',
          explanation: 'Több gyermek között elosztva mindenkinek kevesebb cukorka jut.'
        },
        {
          id: 's1-6',
          text: 'A tanár úr magassága és az autója rendszáma',
          categoryId: 'cat-independent',
          explanation: 'Teljesen független, véletlenszerű adatok.'
        },
        {
          id: 's1-7',
          text: 'Egy gépkocsi sebessége és a fix 100 km-es út menetideje',
          categoryId: 'cat-opposite',
          explanation: 'Gyorsabban hajtva kevesebb ideig tart az út.'
        },
        {
          id: 's1-8',
          text: 'A kerti medencébe folyó víz ideje és a medencében lévő vízmennyiség',
          categoryId: 'cat-together',
          explanation: 'Minél tovább van nyitva a csap, annál több víz gyűlik össze.'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: MATEMATIKAI SZABÁLYOK TÍPUSA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-rule-mult',
          name: 'Szorzásos szabály (y = c · x)',
          description: 'Állandó egységárral, sebességgel vagy váltószámmal való szorzás',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-rule-div',
          name: 'Osztásos szabály (y = C : x)',
          description: 'Egy fix mennyiség szétosztása egyre több részre',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-rule-add',
          name: 'Állandó különbség (y = x + c vagy x − c)',
          description: 'A két adat közötti különbség mindig ugyanannyi marad',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        {
          id: 's2-1',
          text: 'Egy gombóc fagyi 400 Ft, a fizetendő összeg kiszámítása',
          categoryId: 'cat-rule-mult',
          explanation: 'Összeg = 400 · darab (szorzás).'
        },
        {
          id: 's2-2',
          text: '30 tanuló felosztása egyforma létszámú csoportokra',
          categoryId: 'cat-rule-div',
          explanation: 'Csoportlétszám = 30 : csoportok száma (osztás).'
        },
        {
          id: 's2-3',
          text: 'Dániel 3 évvel idősebb a húgánál, életkoraik kapcsolata',
          categoryId: 'cat-rule-add',
          explanation: 'Dániel kora = Húg kora + 3 (a különbség mindig 3 év marad).'
        },
        {
          id: 's2-4',
          text: 'Egy szabályos háromszög kerületének kiszámítása az oldalhosszból',
          categoryId: 'cat-rule-mult',
          explanation: 'Kerület = 3 · oldal (szorzás).'
        },
        {
          id: 's2-5',
          text: '120 km-es út menetidejének számítása a sebesség függvényében',
          categoryId: 'cat-rule-div',
          explanation: 'Idő = 120 : sebesség (osztás).'
        },
        {
          id: 's2-6',
          text: 'Méterek átszámítása centiméterekre',
          categoryId: 'cat-rule-mult',
          explanation: 'Centiméter = 100 · Méter (szorzás).'
        },
        {
          id: 's2-7',
          text: 'Egy vonat menetrend szerinti érkezése, ha a késés mindig fix 15 perc',
          categoryId: 'cat-rule-add',
          explanation: 'Tényleges idő = Menetrendi idő + 15 perc.'
        },
        {
          id: 's2-8',
          text: 'Egy 60 szeletes torta elosztása x vendég között',
          categoryId: 'cat-rule-div',
          explanation: '1 főre jutó szelet = 60 : vendégek száma.'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: HOGYAN VÁLTOZIK A KAPCSOLT MENNYISÉG A DUPLÁZÓDÁSKOR?
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-doubles',
          name: 'Pontosan a duplájára (2-szeresére) nő',
          description: 'Kétszer annyi lesz az eredmény is',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-halves',
          name: 'Pontosan a felére (1/2-ére) csökken',
          description: 'Feleakkora lesz az eredmény',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        },
        {
          id: 'cat-other',
          name: 'Nem duplázódik és nem feleződik',
          description: 'Változatlan marad, vagy más arányban módosul (pl. négyszereződik)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        {
          id: 's3-1',
          text: 'Fizetendő összeg, ha 2 füzet helyett 4 füzetet veszünk',
          categoryId: 'cat-doubles',
          explanation: 'Dupla darabszámért dupla árat fizetünk.'
        },
        {
          id: 's3-2',
          text: 'Egy árok kiásásának ideje, ha 2 munkás helyett 4 munkás dolgozik',
          categoryId: 'cat-halves',
          explanation: 'Kétszer annyi munkás feleannyi idő alatt végez.'
        },
        {
          id: 's3-3',
          text: 'Egy négyzet területe, ha az oldala 2 cm-ről 4 cm-re (duplájára) nő',
          categoryId: 'cat-other',
          explanation: 'A terület 4 cm²-ről 16 cm²-re nő, azaz NÉGYSZEREZŐDIK (nem duplázódik)!'
        },
        {
          id: 's3-4',
          text: 'A megtett távolság, ha 1 óra helyett 2 órán át gyalogolunk azonos tempóban',
          categoryId: 'cat-doubles',
          explanation: 'Kétszer annyi idő alatt kétszer akkora utat teszünk meg.'
        },
        {
          id: 's3-5',
          text: 'Egy pizza egy főre jutó része, ha 2 barát helyett 4 barát osztozik rajta',
          categoryId: 'cat-halves',
          explanation: 'Kétszer annyi ember esetén mindenkinek feleannyi pizza jut.'
        },
        {
          id: 's3-6',
          text: 'Egy mozijegy ára személyenként, ha egyedül mész vagy a barátoddal',
          categoryId: 'cat-other',
          explanation: 'Az egy főre jutó jegyár fixen ugyanannyi marad, nem változik.'
        },
        {
          id: 's3-7',
          text: 'Egy szabályos ötszög kerülete, ha az oldala a kétszeresére nő',
          categoryId: 'cat-doubles',
          explanation: 'Kerület = 5 · oldal; ha az oldal duplázódik, a kerület is duplázódik.'
        },
        {
          id: 's3-8',
          text: 'A menetidő, ha az autó sebessége 50 km/h-ról 100 km/h-ra nő',
          categoryId: 'cat-halves',
          explanation: 'Kétszeres sebességgel feleannyi idő alatt érünk oda.'
        }
      ]
    }
  };

  const currentConfig = levels[currentLevel] || levels[1];

  return (
    <SorterTemplate
      title="Változó Mennyiségek Csoportosító"
      subtitle="Húzd vagy kattintással helyezd az elemeket a megfelelő kategóriába!"
      categories={currentConfig.categories}
      items={currentConfig.items}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onComplete={onNextLevel}
      level={currentLevel}
      onLevelChange={(lvl) => setCurrentLevel(lvl)}
      onOpenRules={onOpenRules}
    />
  );
};
