import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface ClassicalProbSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  level?: number;
  currentLevel?: number;
  onSelectLevel?: (level: number) => void;
  [key: string]: any;
}

const sorterLevels: Record<number, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Események valószínűségének nagyságrendje',
    instruction: 'Határozd meg az események valószínűségét, és sorold be őket a megfelelő esélykategóriába!',
    categories: [
      {
        id: 'cat-rare',
        name: 'Ritka esemény (P < 15%)',
        description: 'Valószínűsége kisebb mint 15% (kevesebb mint 5-6 kedvező eset a 36-ból)',
        color: 'blue'
      },
      {
        id: 'cat-med',
        name: 'Közepes esély (15% ≤ P ≤ 40%)',
        description: 'Valószínűsége 15% és 40% közé esik',
        color: 'emerald'
      },
      {
        id: 'cat-likely',
        name: 'Valószínű esemény (P > 40%)',
        description: 'Valószínűsége nagyobb mint 40%',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'cps1-1',
        content: 'Két kocka összege 2 vagy 12',
        categoryId: 'cat-rare',
        explanation: 'Csak 2 kedvező eset van a 36-ból: (1,1) és (6,6), így P = 2/36 ≈ 5,56%.'
      },
      {
        id: 'cps1-2',
        content: 'Két kocka összege pontosan 7',
        categoryId: 'cat-med',
        explanation: '6 kedvező eset van a 36-ból: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). P = 6/36 = 1/6 ≈ 16,67%.'
      },
      {
        id: 'cps1-3',
        content: 'Két kocka összege 10 vagy 11',
        categoryId: 'cat-rare',
        explanation: '5 kedvező eset van: (4,6), (5,5), (6,4), (5,6), (6,5). P = 5/36 ≈ 13,89%.'
      },
      {
        id: 'cps1-4',
        content: 'Egy szabályos kockával legalább 3-ast dobunk',
        categoryId: 'cat-likely',
        explanation: 'Kedvező esetek: {3, 4, 5, 6}, azaz 4/6 = 2/3 ≈ 66,67%.'
      },
      {
        id: 'cps1-5',
        content: 'Két kocka dobásakor mindkét szám páros',
        categoryId: 'cat-med',
        explanation: '3 · 3 = 9 kedvező eset a 36-ból: 9/36 = 25%.'
      },
      {
        id: 'cps1-6',
        content: 'Két kocka összege kisebb mint 10',
        categoryId: 'cat-likely',
        explanation: 'Csak a 10, 11, 12 nem kedvező (6 eset), így 30/36 ≈ 83,33%.'
      },
      {
        id: 'cps1-7',
        content: 'Két kockánál dupla 6-os dobása',
        categoryId: 'cat-rare',
        explanation: 'Csak (6,6) kedvező: 1/36 ≈ 2,78%.'
      },
      {
        id: 'cps1-8',
        content: 'Egy kockával páratlan szám dobása',
        categoryId: 'cat-likely',
        explanation: '{1, 3, 5} kedvező: 3/6 = 50%.'
      },
      {
        id: 'cps1-9',
        content: 'Két kocka dobásakor az összeg páros',
        categoryId: 'cat-likely',
        explanation: '18 számpár összege páros: 18/36 = 50%.'
      },
      {
        id: 'cps1-10',
        content: 'Kő-papír-olló játékban egy menetben döntetlen',
        categoryId: 'cat-med',
        explanation: '9 kimenetelből 3 döntetlen (KK, PP, OO): 3/9 = 33,33%.'
      },
      {
        id: 'cps1-11',
        content: 'Magyar kártyából (32 lap) zöld színű lap húzása',
        categoryId: 'cat-med',
        explanation: '8 zöld lap van a 32-ből: 8/32 = 25%.'
      },
      {
        id: 'cps1-12',
        content: 'Két kocka összege pontosan 3',
        categoryId: 'cat-rare',
        explanation: 'Csak (1,2) és (2,1) kedvező: 2/36 ≈ 5,56%.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Matematikai igazság vagy valószínűségi csapda?',
    instruction: 'Döntsd el az állításokról, hogy helyes Laplace-összefüggést tükröznek-e, vagy logikai hibát/tévhitet!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikai Igazság',
        description: 'Helyes valószínűségszámítási szabály vagy tétel',
        color: 'emerald'
      },
      {
        id: 'cat-false',
        name: 'Tévhit / Csapda',
        description: 'Gyakori tévedés vagy hibás logika',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'cps2-1',
        content: 'A klasszikus Laplace-képlet (k/n) csak egyenlően valószínű elemi eseményekre érvényes',
        categoryId: 'cat-true',
        explanation: 'Igaz: ha a kimenetelek esélye eltérő, a kedvező per összes hányados hibás eredményt ad.'
      },
      {
        id: 'cps2-2',
        content: 'Ha egy eseménynek kétféle kimenetele van (nyer vagy veszít), akkor az esélye mindig 50%',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a kimenetelek száma nem jelenti azt, hogy egyenlően valószínűek (pl. lottónál).'
      },
      {
        id: 'cps2-3',
        content: 'Két kocka dobásakor a 7-es összegnek van a legtöbb kedvező esete a 36-ból',
        categoryId: 'cat-true',
        explanation: 'Igaz: a 7 összeghez 6 mező tartozik, minden más összeghez ennél kevesebb.'
      },
      {
        id: 'cps2-4',
        content: 'Két kocka dobásakor a 9-es összegnek ugyanannyi esete van, mint az 5-ös összegnek',
        categoryId: 'cat-true',
        explanation: 'Igaz: mindkettőnek pontosan 4 kedvező elemi eseménye van a szimmetria miatt.'
      },
      {
        id: 'cps2-5',
        content: 'Egy kockával 5-ször dobtunk 1-est, ezért 6-odjára már szinte kizárt az 1-es dobása',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a dobások függetlenek, a kockának nincs memóriája, az 1-es esélye továbbra is 1/6.'
      },
      {
        id: 'cps2-6',
        content: 'Egy esemény és komplementerének (ellentettjének) valószínűségeinek összege pontosan 1',
        categoryId: 'cat-true',
        explanation: 'Igaz: P(A) + P(A̅) = 1, mivel az esemény vagy bekövetkezik, vagy nem.'
      },
      {
        id: 'cps2-7',
        content: 'Két szabályos érme feldobásakor a két egyforma és a két különböző oldal esélye azonos',
        categoryId: 'cat-true',
        explanation: 'Igaz: mindkettőnek 2-2 esete van a 4-ből ({FF, II} és {FI, IF}), így mindkettő 50%.'
      },
      {
        id: 'cps2-8',
        content: 'Egy cinkelt kockánál is 1/6 az egyes oldalak valószínűsége, mert 6 oldala van',
        categoryId: 'cat-false',
        explanation: 'Tévhit: cinkelt (aszimmetrikus súlyozású) kockánál a Laplace-modell nem érvényes.'
      },
      {
        id: 'cps2-9',
        content: 'A biztos esemény valószínűsége 1 (100%), a lehetetlen eseményé pedig 0 (0%)',
        categoryId: 'cat-true',
        explanation: 'Igaz: a Kolmogorov-féle axiómák és a klasszikus definíció alapköve.'
      },
      {
        id: 'cps2-10',
        content: 'Minden kísérletben a relatív gyakoriság pontosan megegyezik a valószínűséggel',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a relatív gyakoriság tapasztalati mérés, amely ingadozik a valószínűség körül.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Számítási modell kiválasztása',
    instruction: 'Válogasd szét az összetett eseményeket aszerint, hogy melyik matematikai szabállyal oldhatók meg legkézenfekvőbben!',
    categories: [
      {
        id: 'cat-comp',
        name: 'Ellentett (komplementer) esemény',
        description: 'P(A) = 1 - P(A̅) alapján célszerű számolni (pl. „legalább egy” típusú kérdések)',
        color: 'purple'
      },
      {
        id: 'cat-sum',
        name: 'Egymást kizáró események összege',
        description: 'P(A vagy B) = P(A) + P(B) szabály alkalmazható közvetlenül',
        color: 'teal'
      },
      {
        id: 'cat-indep',
        name: 'Független események szorzata',
        description: 'P(A és B) = P(A) · P(B) szabály alapján számítható összetett esemény',
        color: 'indigo'
      }
    ],
    items: [
      {
        id: 'cps3-1',
        content: '3 kockával dobva legalább egy 6-ost kapunk',
        categoryId: 'cat-comp',
        explanation: 'A „legalább egy” ellentettje az, hogy „egyik sem 6-os”: 1 - (5/6)³.'
      },
      {
        id: 'cps3-2',
        content: 'Egy kockával páros számot VAGY 5-öst dobunk',
        categoryId: 'cat-sum',
        explanation: 'A páros számok és az 5 egymást kizáró halmazok: P = 3/6 + 1/6 = 4/6.'
      },
      {
        id: 'cps3-3',
        content: 'Két egymástól független érmével mindkettőn fejet dobunk',
        categoryId: 'cat-indep',
        explanation: 'Két független kísérlet egyidejű bekövetkezése: P = 1/2 · 1/2 = 1/4.'
      },
      {
        id: 'cps3-4',
        content: '5 kockadobásból legalább egyszer prímszámot kapunk',
        categoryId: 'cat-comp',
        explanation: 'A komplementer: mind az 5 dobás összetett vagy 1-es (nem prím): 1 - P(egyik sem prím).'
      },
      {
        id: 'cps3-5',
        content: 'Két kockával dobva az első kocka páros, a második kocka pedig 6-os',
        categoryId: 'cat-indep',
        explanation: 'Két külön kocka független kimeneteleinek egyidejűsége: P = (3/6) · (1/6) = 1/12.'
      },
      {
        id: 'cps3-6',
        content: 'Egy pakli magyar kártyából egyetlen húzással királyt VAGY ászt húzunk',
        categoryId: 'cat-sum',
        explanation: 'A király és ász diszjunkt események (nem lehet egy lap mindkettő): 4/32 + 4/32 = 8/32.'
      },
      {
        id: 'cps3-7',
        content: 'Négy pénzérmét feldobva legalább egy fej lesz az eredmény',
        categoryId: 'cat-comp',
        explanation: 'Ellentett: mind a 4 írás (1/16). P = 1 - 1/16 = 15/16.'
      },
      {
        id: 'cps3-8',
        content: 'Két kockát dobva az összeg pontosan 2 VAGY pontosan 12',
        categoryId: 'cat-sum',
        explanation: 'A 2 és a 12 kizárják egymást: P = 1/36 + 1/36 = 2/36 = 1/18.'
      },
      {
        id: 'cps3-9',
        content: 'Három kockát feldobva mindhárom kockán 1-est kapunk',
        categoryId: 'cat-indep',
        explanation: 'Három független esemény szorzata: (1/6) · (1/6) · (1/6) = 1/216.'
      },
      {
        id: 'cps3-10',
        content: '10 lövésből álló sorozatban a céllövőnek legalább egy találata van',
        categoryId: 'cat-comp',
        explanation: 'Tipikus komplementer feladat: 1 - P(mind a 10 mellémegy).'
      },
      {
        id: 'cps3-11',
        content: 'Két kockával dobva az összeg 3 VAGY 4 lesz',
        categoryId: 'cat-sum',
        explanation: 'Az összeg egyszerre nem lehet 3 és 4 is: 2/36 + 3/36 = 5/36.'
      },
      {
        id: 'cps3-12',
        content: 'Egy érmével fejet, egy kockával pedig 6-ost dobunk egyszerre',
        categoryId: 'cat-indep',
        explanation: 'Független kísérletek együttes eseménye: P = 1/2 · 1/6 = 1/12.'
      }
    ]
  }
};

export const ClassicalProbSorter: React.FC<ClassicalProbSorterProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;

  return (
    <SorterTemplate
      topicTitle="Klasszikus valószínűség & Megismerhető véletlen"
      topicBadge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="purple"
      levels={sorterLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default ClassicalProbSorter;
