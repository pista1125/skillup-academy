import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinancialProblemsSorterProps {
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
    title: '1. Szint: Árváltozás és Pénzügyi Alapfogalmak',
    subtitle: 'Sorold be az állításokat Áremelés, Leértékelés vagy Kamat & Megtakarítás kategóriába!',
    categories: [
      {
        id: 'cat-markup',
        name: 'Áremelés & Drágulás',
        description: 'Szorzó > 1, növekedés, haszonkulcs és ÁFA',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-discount',
        name: 'Leértékelés & Akció',
        description: 'Szorzó < 1, csökkenés, szezonális kedvezmény',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-interest',
        name: 'Kamat & Megtakarítás',
        description: 'Időarányos banki hozam, lekötött tőke gyarapodása',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Egy termék ára 15%-kal emelkedik (szorzó: 1,15)',
        category: 'cat-markup'
      },
      {
        id: 's2',
        label: 'Kereskedői 20%-os haszonkulcs felszámítása a beszerzési árra',
        category: 'cat-markup'
      },
      {
        id: 's3',
        label: '27%-os általános forgalmi adó (ÁFA) hozzáadása a nettó árhoz',
        category: 'cat-markup'
      },
      {
        id: 's4',
        label: 'Éves 8%-os infláció miatti fogyasztói drágulás',
        category: 'cat-markup'
      },
      {
        id: 's5',
        label: 'Szezonvégi kiárusítás: 30% kedvezmény minden ruhára',
        category: 'cat-discount'
      },
      {
        id: 's6',
        label: 'Törzsvásárlói 10%-os engedmény a számla végösszegéből',
        category: 'cat-discount'
      },
      {
        id: 's7',
        label: 'Egy elektronikai cikk ára 20%-kal csökkent (szorzó: 0,80)',
        category: 'cat-discount'
      },
      {
        id: 's8',
        label: 'Két termék vásárlásakor a második féláron kapható',
        category: 'cat-discount'
      },
      {
        id: 's9',
        label: '100 000 Ft lekötése a bankban évi 6%-os kamatra',
        category: 'cat-interest'
      },
      {
        id: 's10',
        label: 'Féléves betét után jóváírt 25 000 Ft kamatösszeg',
        category: 'cat-interest'
      },
      {
        id: 's11',
        label: 'Egyszerű kamatozás kiszámítása: (Tőke · p · t) / 100',
        category: 'cat-interest'
      },
      {
        id: 's12',
        label: 'Kamatadó (15%) levonása a betéti hozamból',
        category: 'cat-interest'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítási Modellek és Egyenletek',
    subtitle: 'Különböztesd meg az egy lépéses, láncolt és visszaszámolós modelleket!',
    categories: [
      {
        id: 'cat-single-step',
        name: 'Egyetlen Árváltozás',
        description: 'Közvetlen szorzás: x · (1 ± p/100) = új ár',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-multi-step',
        name: 'Egymást Követő Változások',
        description: 'Összetett láncszorzás: x · q₁ · q₂',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-reversal',
        name: 'Eredeti Ár Visszaszámolása',
        description: 'Ismert új ár osztása a szorzóval: x = Új ár / q',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '40 000 Ft-os kabát 20%-kal leárazva: 40 000 · 0,80 = 32 000 Ft',
        category: 'cat-single-step'
      },
      {
        id: 's14',
        label: '5000 Ft-os könyv 10%-os áremelés után: 5000 · 1,10 = 5500 Ft',
        category: 'cat-single-step'
      },
      {
        id: 's15',
        label: 'Nettó 100 000 Ft bruttósítása 27% ÁFA-val: 100 000 · 1,27',
        category: 'cat-single-step'
      },
      {
        id: 's16',
        label: 'Egy munkabér 15%-os megemelése: Fizetés · 1,15',
        category: 'cat-single-step'
      },
      {
        id: 's17',
        label: '20% emelés, majd az új ár 20%-os csökkentése: x · 1,20 · 0,80',
        category: 'cat-multi-step'
      },
      {
        id: 's18',
        label: 'Kétszer egymás után 10%-os leértékelés: x · 0,90 · 0,90',
        category: 'cat-multi-step'
      },
      {
        id: 's19',
        label: '10% drágulás, majd további 15% áremelés: x · 1,10 · 1,15',
        category: 'cat-multi-step'
      },
      {
        id: 's20',
        label: '30% leárazás után még 10% kuponkedvezmény: x · 0,70 · 0,90',
        category: 'cat-multi-step'
      },
      {
        id: 's21',
        label: 'Akciós áron 18 000 Ft a cipő (25% leárazás után): x = 18 000 / 0,75',
        category: 'cat-reversal'
      },
      {
        id: 's22',
        label: 'Bruttó 127 000 Ft-os laptop nettó ára: Nettó = 127 000 / 1,27',
        category: 'cat-reversal'
      },
      {
        id: 's23',
        label: '20%-os haszonnal 60 000 Ft-ért eladott bicikli beszerzési ára: x = 60 000 / 1,20',
        category: 'cat-reversal'
      },
      {
        id: 's24',
        label: '15%-os fizetésemelés után 460 000 Ft a bér: x = 460 000 / 1,15',
        category: 'cat-reversal'
      }
    ]
  },
  3: {
    title: '3. Szint: Gazdasági Matematikai Összefüggések és Hatások',
    subtitle: 'Rendszerezd az összetett pénzügyi tételeket és matematikai szabályszerűségeket!',
    categories: [
      {
        id: 'cat-net-loss',
        name: 'Végleges Értékcsökkenés',
        description: 'Azonos %-os emelés és csökkentés mindig nettó veszteséget okoz',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-proportional',
        name: 'Lineáris és Időarányos Növekedés',
        description: 'Időtartammal és tőkével egyenesen arányos kamatnövekedés',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-asymmetry',
        name: 'Százalékos Aszimmetria Szabálya',
        description: 'A csökkenés kompenzálásához magasabb százalékos emelés szükséges',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: '+20% majd -20% végeredménye mindig 4%-os csökkenés (0,96x)',
        category: 'cat-net-loss'
      },
      {
        id: 's26',
        label: '+50% majd -50% végeredménye mindig 25%-os csökkenés (0,75x)',
        category: 'cat-net-loss'
      },
      {
        id: 's27',
        label: '+10% majd -10% végeredménye mindig 1%-os csökkenés (0,99x)',
        category: 'cat-net-loss'
      },
      {
        id: 's28',
        label: 'Bármely +p% majd -p% árváltozás együttes szorzata: 1 - (p/100)² < 1',
        category: 'cat-net-loss'
      },
      {
        id: 's29',
        label: 'Kétszer annyi futamidő alatt kétszer annyi egyszerű kamat íródik jóvá',
        category: 'cat-proportional'
      },
      {
        id: 's30',
        label: '3 hónapos lekötésre az éves kamat negyede (3/12) jár',
        category: 'cat-proportional'
      },
      {
        id: 's31',
        label: 'A kapott kamatösszeg egyenesen arányos a kezdeti betét tőkeösszegével',
        category: 'cat-proportional'
      },
      {
        id: 's32',
        label: 'Egyszerű kamatképlet: K = (T · p · t) / 100, ahol t a futamidő években',
        category: 'cat-proportional'
      },
      {
        id: 's33',
        label: '50%-os árzuhanás után 100%-os áremelés szükséges az eredeti ár eléréséhez',
        category: 'cat-asymmetry'
      },
      {
        id: 's34',
        label: '20%-os leárazás után 25%-os áremelés állítja pontosan vissza az árat (0,8 · 1,25 = 1)',
        category: 'cat-asymmetry'
      },
      {
        id: 's35',
        label: '25%-os leárazás után 33,3%-os emelés kell az eredeti ár eléréséhez',
        category: 'cat-asymmetry'
      },
      {
        id: 's36',
        label: '10%-os fizetéscsökkentés után 11,11%-os emelés kompenzálja a veszteséget',
        category: 'cat-asymmetry'
      }
    ]
  }
};

export const FinancialProblemsSorter: React.FC<FinancialProblemsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-financial-sorter',
  topicTitle = 'Pénzügyi Feladatok Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Pénzügyi Feladatok Csoportosító"
      subtitle="Kategorizáld az áremeléseket, akciókat, kamatszámításokat és gazdasági összefüggéseket!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      themeColor="amber"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default FinancialProblemsSorter;
