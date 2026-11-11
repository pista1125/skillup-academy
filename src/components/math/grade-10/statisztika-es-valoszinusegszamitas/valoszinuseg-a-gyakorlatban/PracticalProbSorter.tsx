import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface PracticalProbSorterProps {
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
    title: '1. Szint: Halmazműveletek a gyakorlatban',
    instruction: 'Sorold be a gyakorlati szöveges eseményeket a megfelelő eseményalgebrai művelet kategóriájába!',
    categories: [
      {
        id: 'cat-union',
        name: 'Unió (Legalább az egyik: A ∪ B)',
        description: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B) logikai szita formula',
        color: 'purple'
      },
      {
        id: 'cat-inter',
        name: 'Metszet (Mindkettő egyszerre: A ∩ B)',
        description: 'A két feltétel egyidejű bekövetkezése',
        color: 'emerald'
      },
      {
        id: 'cat-diff',
        name: 'Különbség / Egyik sem (A \\ B vagy Komplementer)',
        description: 'Csak az egyik tulajdonság teljesül, vagy egyik sem',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'pps1-1',
        content: 'Egy diák mindkét nyelvet (angol és német) emelt szinten tanulja',
        categoryId: 'cat-inter',
        explanation: 'Mindkét feltétel egyszerre teljesül: metszet (A ∩ B).'
      },
      {
        id: 'pps1-2',
        content: 'Legalább az egyik tantárgyból (matek vagy töri) emelt óraszámra jár',
        categoryId: 'cat-union',
        explanation: 'Legalább az egyik bekövetkezése: logikai unió (A ∪ B).'
      },
      {
        id: 'pps1-3',
        content: 'Csak az angol nyelvet tanulja emelt szinten, a németet nem',
        categoryId: 'cat-diff',
        explanation: 'Különbséghalmaz: az angolosok azon része, akik nem tanulnak németet.'
      },
      {
        id: 'pps1-4',
        content: 'Egy ügyfélnek van lakásbiztosítása VAGY gépjármű-biztosítása',
        categoryId: 'cat-union',
        explanation: 'Vagylagos kapcsolat (legalább az egyik megvan): unió.'
      },
      {
        id: 'pps1-5',
        content: 'Egy ügyfélnek mindkét fajta (lakás és gépjármű) biztosítása megvan',
        categoryId: 'cat-inter',
        explanation: 'Egyidejű kettős érvényesség: halmazok metszete.'
      },
      {
        id: 'pps1-6',
        content: 'Egyetlen tantárgyat sem választott emelt szinten az osztályban',
        categoryId: 'cat-diff',
        explanation: 'Az unió komplementere (egyik halmazba sem tartozik bele).'
      },
      {
        id: 'pps1-7',
        content: 'A véradó vércsoportja 0-s VAGY Rh-pozitív',
        categoryId: 'cat-union',
        explanation: 'A két tulajdonság egyesítése (uniója).'
      },
      {
        id: 'pps1-8',
        content: 'A véradó vércsoportja 0-s ÉS Rh-pozitív',
        categoryId: 'cat-inter',
        explanation: 'Mindkét vércsoport-jellemző egyszerre fennáll: metszet.'
      },
      {
        id: 'pps1-9',
        content: 'A véradó Rh-pozitív, de NEM 0-s vércsoportú',
        categoryId: 'cat-diff',
        explanation: 'Különbségképzés: Rh-pozitívok, kivéve a 0-sokat.'
      },
      {
        id: 'pps1-10',
        content: 'Két kockával dobva az összeg páros VAGY nagyobb 9-nél',
        categoryId: 'cat-union',
        explanation: 'Két esemény uniója a 36-os rácsban.'
      },
      {
        id: 'pps1-11',
        content: 'Két kockával dobva az összeg páros ÉS nagyobb 9-nél',
        categoryId: 'cat-inter',
        explanation: 'Két feltétel közös metszete: páros és > 9 (azaz 10 vagy 12).'
      },
      {
        id: 'pps1-12',
        content: 'Két kockával dobva az összeg páros, de NEM nagyobb 9-nél',
        categoryId: 'cat-diff',
        explanation: 'A páros összegek halmazából kivonjuk a 9-nél nagyobbakat.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Matematikai összefüggések és hibák',
    instruction: 'Döntsd el a valószínűségszámítási és statisztikai állításokról, hogy igazak vagy tévhitek!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikai Igazság',
        description: 'Helyes eseményalgebrai formula vagy tétel',
        color: 'emerald'
      },
      {
        id: 'cat-false',
        name: 'Tévhit / Csapda',
        description: 'Gyakori tévedés vagy hibás összefüggés',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'pps2-1',
        content: 'P(A ∪ B) = P(A) + P(B) – P(A ∩ B) minden tetszőleges eseménypárra igaz',
        categoryId: 'cat-true',
        explanation: 'Igaz: ez a két eseményre vonatkozó logikai szita formula (Poincaré-formula).'
      },
      {
        id: 'pps2-2',
        content: 'Két tetszőleges eseményre P(A vagy B) mindig egyszerűen P(A) + P(B)',
        categoryId: 'cat-false',
        explanation: 'Tévhit: ez kizárólag egymást kizáró (diszjunkt) események esetén érvényes, egyébként levonandó a metszet.'
      },
      {
        id: 'pps2-3',
        content: 'Ha két esemény kizárja egymást, akkor a metszetük valószínűsége P(A ∩ B) = 0',
        categoryId: 'cat-true',
        explanation: 'Igaz: egymást kizáró események egyszerre nem következhetnek be, metszetük az üres halmaz.'
      },
      {
        id: 'pps2-4',
        content: 'Ha egy csoportban 60% beszél angolul és 50% németül, akkor 110% beszél nyelvet',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a valószínűség (és az arány) nem lehet nagyobb 100%-nál; legalább 10% mindkét nyelvet beszéli.'
      },
      {
        id: 'pps2-5',
        content: 'A „csak az A következik be” esemény valószínűsége P(A) – P(A ∩ B)',
        categoryId: 'cat-true',
        explanation: 'Igaz: az A eseményből le kell vonni a B-vel közös metszetet.'
      },
      {
        id: 'pps2-6',
        content: 'A metszet valószínűsége P(A ∩ B) nagyobb is lehet, mint maga a P(A)',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a metszet részhalmaza az A-nak, így valószínűsége sosem haladhatja meg P(A)-t.'
      },
      {
        id: 'pps2-7',
        content: 'Ha P(A) = 0,7 és P(B) = 0,6, akkor a metszetük valószínűsége legalább 0,3',
        categoryId: 'cat-true',
        explanation: 'Igaz: mivel P(A ∪ B) ≤ 1, ezért P(A ∩ B) = P(A) + P(B) – P(A ∪ B) ≥ 0,7 + 0,6 – 1 = 0,3.'
      },
      {
        id: 'pps2-8',
        content: 'Kétdimenziós kontingenciatáblázatban a sorösszegek és oszlopösszegek összege különböző is lehet',
        categoryId: 'cat-false',
        explanation: 'Tévhit: mind a sorok összege, mind az oszlopok összege pontosan a teljes minta elemszámát kell adja.'
      },
      {
        id: 'pps2-9',
        content: 'A „sem A, sem B nem következik be” esemény valószínűsége 1 – P(A ∪ B)',
        categoryId: 'cat-true',
        explanation: 'Igaz: a De Morgan-szabály szerint a komplementerek metszete az unió komplementere.'
      },
      {
        id: 'pps2-10',
        content: 'Ha P(A) = 0,5 és P(B) = 0,5, akkor a két esemény uniója kötelezően biztos esemény',
        categoryId: 'cat-false',
        explanation: 'Tévhit: ha van átfedés (metszet), vagy létezik olyan eset, amikor egyik sem teljesül, az unió < 1.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Gyakorlati esélyek nagyságrendje',
    instruction: 'Becsüld meg vagy számítsd ki a gyakorlati statisztikák valószínűségeit, és helyezd őket a megfelelő esélysávba!',
    categories: [
      {
        id: 'cat-low',
        name: 'Kis valószínűség (P < 30%)',
        description: 'Valószínűsége kisebb mint 30%',
        color: 'blue'
      },
      {
        id: 'cat-mid',
        name: 'Közepes valószínűség (30% ≤ P ≤ 60%)',
        description: 'Valószínűsége 30% és 60% közé esik',
        color: 'emerald'
      },
      {
        id: 'cat-high',
        name: 'Nagy valószínűség (P > 60%)',
        description: 'Valószínűsége meghaladja a 60%-ot',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'pps3-1',
        content: '36 fős osztályból mindkét tantárgyat (matek és töri) emelt szinten tanulja',
        categoryId: 'cat-low',
        explanation: '3 fő a 36-ból: P = 3/36 = 1/12 ≈ 8,33%.'
      },
      {
        id: 'pps3-2',
        content: '36 fős osztályból egyik tantárgyat sem tanulja emelt szinten',
        categoryId: 'cat-mid',
        explanation: '12 fő a 36-ból: P = 12/36 = 1/3 ≈ 33,33%.'
      },
      {
        id: 'pps3-3',
        content: '36 fős osztályból emelt szinten tanulja a történelmet',
        categoryId: 'cat-mid',
        explanation: '18 fő a 36-ból: P = 18/36 = 50%.'
      },
      {
        id: 'pps3-4',
        content: '36 fős osztályból legalább az egyik tantárgyat emelt szinten tanulja',
        categoryId: 'cat-high',
        explanation: '24 fő a 36-ból: P = 24/36 = 2/3 ≈ 66,67%.'
      },
      {
        id: 'pps3-5',
        content: '1000 biztosítási ügyfélből lakásbiztosítással rendelkezik',
        categoryId: 'cat-mid',
        explanation: '389 fő az 1000-ből: P = 389/1000 = 38,9%.'
      },
      {
        id: 'pps3-6',
        content: '1000 biztosítási ügyfélből gépjármű-biztosítással rendelkezik',
        categoryId: 'cat-high',
        explanation: '611 fő az 1000-ből: P = 611/1000 = 61,1%.'
      },
      {
        id: 'pps3-7',
        content: '1000 biztosítási ügyfélből legalább az egyik biztosítással bír',
        categoryId: 'cat-high',
        explanation: '904 fő az 1000-ből: P = 904/1000 = 90,4%.'
      },
      {
        id: 'pps3-8',
        content: '1000 biztosítási ügyfélből egyik fajta biztosítással sem bír',
        categoryId: 'cat-low',
        explanation: '96 fő az 1000-ből: P = 96/1000 = 9,6%.'
      },
      {
        id: 'pps3-9',
        content: '6 felelőjelölt közül te leszel a legelső felelő',
        categoryId: 'cat-low',
        explanation: '1 kedvező a 6-ból: P = 1/6 ≈ 16,67%.'
      },
      {
        id: 'pps3-10',
        content: '6 felelőjelölt közül a két kiválasztott egyike leszel',
        categoryId: 'cat-mid',
        explanation: '2 a 6-ból: P = 2/6 = 1/3 ≈ 33,33%.'
      },
      {
        id: 'pps3-11',
        content: '6 felelőjelölt közül ma egyáltalán NEM fogsz felelni',
        categoryId: 'cat-high',
        explanation: '4 a 6-ból: P = 4/6 = 2/3 ≈ 66,67%.'
      },
      {
        id: 'pps3-12',
        content: '346 véradóból AB-s vagy B-s vércsoportú donor választása',
        categoryId: 'cat-low',
        explanation: '68 donor a 346-ból: P = 68/346 ≈ 19,65%.'
      }
    ]
  }
};

export const PracticalProbSorter: React.FC<PracticalProbSorterProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;

  return (
    <SorterTemplate
      topicTitle="Valószínűség a gyakorlatban"
      topicBadge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="rose"
      levels={sorterLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default PracticalProbSorter;
