import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter6SummaryMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  onOpenRules?: () => void;
  onNextLevel?: () => void;
  level?: DifficultyLevel;
  topicId?: string;
  topicTitle?: string;
}

const level1Pairs: MatchPair[] = [
  {
    id: 'c6-l1-p1',
    left: 'Egyenes arányosság',
    right: 'Két változó hányadosa állandó (y / x = k), grafikonja origón átmenő egyenes',
    category: 'Arányosság'
  },
  {
    id: 'c6-l1-p2',
    left: 'Fordított arányosság',
    right: 'Két változó szorzata állandó (x · y = k), grafikonja kétágú hiperbola',
    category: 'Arányosság'
  },
  {
    id: 'c6-l1-p3',
    left: 'Lineáris függvény általános alakja',
    right: 'f(x) = a · x + b (a: meredekség, b: y-tengelymetszet)',
    category: 'Függvények'
  },
  {
    id: 'c6-l1-p4',
    left: 'Függvény zérushelye',
    right: 'Ahol f(x) = 0, azaz ahol a grafikon metszi az x-tengelyt',
    category: 'Függvények'
  },
  {
    id: 'c6-l1-p5',
    left: 'Statisztikai medián',
    right: 'A nagyság szerint sorba rendezett adatsor középső értéke',
    category: 'Statisztika'
  },
  {
    id: 'c6-l1-p6',
    left: 'Klasszikus valószínűség (P)',
    right: 'Kedvező kimenetelek száma osztva az összes lehetséges kimenetel számával (k / n)',
    category: 'Valószínűség'
  },
  {
    id: 'c6-l1-p7',
    left: 'Számtani sorozat',
    right: 'Bármely tag az előzőből egy állandó szám (d = differencia) hozzáadásával kapható',
    category: 'Sorozatok'
  },
  {
    id: 'c6-l1-p8',
    left: 'Mértani sorozat',
    right: 'Bármely tag az előzőből egy állandó számmal (q = kvóciens) való szorzással kapható',
    category: 'Sorozatok'
  }
];

const level2Pairs: MatchPair[] = [
  {
    id: 'c6-l2-p1',
    left: 'Menetdiagram vízszintes szakasza',
    right: 'Sebesség v = 0 km/h, a test egy helyben áll (pihenő)',
    category: 'Grafikonok'
  },
  {
    id: 'c6-l2-p2',
    left: 'f(x) = 3x - 6 zérushelye',
    right: 'x = 2 (mert 3 · 2 - 6 = 0)',
    category: 'Függvények'
  },
  {
    id: 'c6-l2-p3',
    left: 'Két szabályos dobókocka összes kimenetele',
    right: '36 rendezett elemi pár (6 · 6)',
    category: 'Valószínűség'
  },
  {
    id: 'c6-l2-p4',
    left: 'Szabályos érmével „legalább egy fej” két dobásból',
    right: 'P = 3/4 = 75% (csak az Í-Í a rossz)',
    category: 'Valószínűség'
  },
  {
    id: 'c6-l2-p5',
    left: 'Gyufaszál négyzetlánc képlete (n négyzet)',
    right: '3n + 1 gyufaszál (elsőhöz 4, utána +3 elemenként)',
    category: 'Mintázatok'
  },
  {
    id: 'c6-l2-p6',
    left: 'n ember kézfogásainak száma',
    right: 'n · (n - 1) / 2',
    category: 'Mintázatok'
  },
  {
    id: 'c6-l2-p7',
    left: 'Számtani sorozat n. tagja (a_1 és d alapján)',
    right: 'a_n = a_1 + (n - 1) · d',
    category: 'Sorozatok'
  },
  {
    id: 'c6-l2-p8',
    left: 'A Fibonacci-sorozat 6. tagja (F_1 = 1, F_2 = 1...)',
    right: 'F_6 = 8 (a sorozat: 1, 1, 2, 3, 5, 8, 13...)',
    category: 'Sorozatok'
  }
];

const level3Pairs: MatchPair[] = [
  {
    id: 'c6-l3-p1',
    left: '4 munkás 6 nap alatt végez; hány nap kell 8 munkásnak?',
    right: '3 nap (fordított arányosság: 4 · 6 = 24, 24 / 8 = 3)',
    category: 'Alkalmazás'
  },
  {
    id: 'c6-l3-p2',
    left: 'f(x) = 2x + 1 és g(x) = -x + 7 metszéspontja',
    right: 'P(2; 5) (2x + 1 = -x + 7 => 3x = 6 => x = 2, y = 5)',
    category: 'Függvények'
  },
  {
    id: 'c6-l3-p3',
    left: 'Adatok: 4, 7, 7, 8, 9, 13 terjedelme és átlaga',
    right: 'Terjedelem = 9 (13 - 4), Átlag = 8 (48 / 6)',
    category: 'Statisztika'
  },
  {
    id: 'c6-l3-p4',
    left: 'Két kocka dobása: a dobott összeg 7 valószínűsége',
    right: '6 / 36 = 1 / 6 ≈ 16,67% (leggyakoribb összeg)',
    category: 'Valószínűség'
  },
  {
    id: 'c6-l3-p5',
    left: 'Konvex 8-szög összes átlójának száma',
    right: '20 átló (8 · (8 - 3) / 2 = 8 · 5 / 2 = 20)',
    category: 'Mintázatok'
  },
  {
    id: 'c6-l3-p6',
    left: 'Számtani sorozatban a_1 = 5, a_5 = 25 differenciája',
    right: 'd = 5 (a_5 = a_1 + 4d => 25 = 5 + 4d => 4d = 20)',
    category: 'Sorozatok'
  },
  {
    id: 'c6-l3-p7',
    left: 'Mértani sorozatban a_1 = 3, q = 2 negyedik tagja (a_4)',
    right: 'a_4 = 24 (a_4 = 3 · 2^3 = 3 · 8 = 24)',
    category: 'Sorozatok'
  },
  {
    id: 'c6-l3-p8',
    left: '21 gyufás Nim-játék garantált nyerő kulcsállásai',
    right: '1, 5, 9, 13, 17, 21 gyufa (4k + 1 alakú számok)',
    category: 'Játékelmélet'
  }
];

export const Chapter6SummaryMatcher: React.FC<Chapter6SummaryMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  onOpenRules,
  onNextLevel,
  level = 1,
  topicId = 'g8-func-summary',
  topicTitle = 'VI. Fejezet Összefoglalás'
}) => {
  const getPairs = (): MatchPair[] => {
    switch (level) {
      case 2:
        return level2Pairs;
      case 3:
        return level3Pairs;
      case 1:
      default:
        return level1Pairs;
    }
  };

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={level}
      pairs={getPairs()}
      themeColor="emerald"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
      onNextLevel={onNextLevel}
    />
  );
};

export default Chapter6SummaryMatcher;
