import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface ProbabilityGameMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  onOpenRules?: () => void;
  onNextLevel?: () => void;
  level?: number;
}

const level1Pairs: MatchPair[] = [
  {
    id: 'l1-p1',
    left: 'Tiszta stratégiai játék',
    right: 'Sakk, amőba, Nim-játék (nincs benne véletlen)',
    category: 'Játéktípusok'
  },
  {
    id: 'l1-p2',
    left: 'Tiszta szerencsejáték',
    right: 'Lottó, rulett, tombolahúzás (csak a véletlen dönt)',
    category: 'Játéktípusok'
  },
  {
    id: 'l1-p3',
    left: 'Vegyes játék',
    right: 'Póker, Monopoly, Gazdálkodj okosan (kártya/kocka + döntések)',
    category: 'Játéktípusok'
  },
  {
    id: 'l1-p4',
    left: 'Kő-papír-olló döntetlen esélye',
    right: '3 / 9 = 1 / 3 (pontosan 33,3%)',
    category: 'Valószínűségek'
  },
  {
    id: 'l1-p5',
    left: 'Szabályos érme fej esélye',
    right: '1 / 2 = 50% (két egyenlő esélyű kimenetel)',
    category: 'Alapfogalmak'
  },
  {
    id: 'l1-p6',
    left: 'Fair Play (igazságos játék)',
    right: 'Mindkét játékos nyerési esélye egyenlő (50% - 50%)',
    category: 'Játékelmélet'
  },
  {
    id: 'l1-p7',
    left: 'Teljes információjú játék',
    right: 'Minden játékos ismeri a tábla és bábuk teljes állását',
    category: 'Játékelmélet'
  },
  {
    id: 'l1-p8',
    left: 'Véletlen kísérlet kimenetele',
    right: 'Egyedi eredmény, ami előre pontosan nem jósolható meg',
    category: 'Alapfogalmak'
  }
];

const level2Pairs: MatchPair[] = [
  {
    id: 'l2-p1',
    left: 'Két kocka összege = 7',
    right: 'Legvalószínűbb összeg: 6 eset a 36-ból (1/6 = 16,7%)',
    category: 'Kockajátékok'
  },
  {
    id: 'l2-p2',
    left: 'Két kocka összege = 2 vagy 12',
    right: 'Legritkább összegek: csupán 1-1 eset a 36-ból (1/36)',
    category: 'Kockajátékok'
  },
  {
    id: 'l2-p3',
    left: 'Két kocka összes lehetséges esete',
    right: '6 · 6 = 36 egyenlően valószínű rendezett pár',
    category: 'Kombinatorika'
  },
  {
    id: 'l2-p4',
    left: 'Nim-játék (1-2-3 vehető) lépésösszeg',
    right: 'Mindig 4-re egészítjük ki az ellenfél által elvett gyufát',
    category: 'Nyerő stratégiák'
  },
  {
    id: 'l2-p5',
    left: 'Nim-játék (21 gyufa, utolsó veszít) célok',
    right: '17, 13, 9, 5, végül pontosan 1 gyufa hagyása az ellenfélnek',
    category: 'Nyerő stratégiák'
  },
  {
    id: 'l2-p6',
    left: 'Két kocka összege páros',
    right: 'Pontosan 18 kedvező eset a 36-ból (18/36 = 50%)',
    category: 'Valószínűségek'
  },
  {
    id: 'l2-p7',
    left: 'Két érme dobása: két fej esélye',
    right: '1/2 · 1/2 = 1/4 (25% valószínűség)',
    category: 'Független események'
  },
  {
    id: 'l2-p8',
    left: 'Dupla dobás két kockával (pl. 3-3, 6-6)',
    right: '6 eset a 36-ból (6/36 = 1/6 valószínűség)',
    category: 'Kockajátékok'
  }
];

const level3Pairs: MatchPair[] = [
  {
    id: 'l3-p1',
    left: 'Szerencsejátékosok tévedése',
    right: 'Azt hinni, hogy a korábbi dobások befolyásolják a következőt',
    category: 'Valószínűségi paradoxonok'
  },
  {
    id: 'l3-p2',
    left: 'Független kísérletek alaptörvénye',
    right: 'Az érmének és a dobókockának nincsen memóriája',
    category: 'Valószínűségszámítás'
  },
  {
    id: 'l3-p3',
    left: 'Monty Hall probléma döntése',
    right: 'Mindig megéri váltani (a nyerési esély 1/3-ról 2/3-ra nő)',
    category: 'Döntéselmélet'
  },
  {
    id: 'l3-p4',
    left: 'Szimmetria stratégia lényege',
    right: 'Az ellenfél lépésének tükrözése a pálya középpontjára',
    category: 'Nyerő stratégiák'
  },
  {
    id: 'l3-p5',
    left: 'Visszalépéses elemzés (Retrográd)',
    right: 'A játék elemzése a végállásból visszafelé gondolkozva',
    category: 'Nyerő stratégiák'
  },
  {
    id: 'l3-p6',
    left: 'Nyerő pozíció',
    right: 'Olyan állás, amelyből helyes játékkal garantált a győzelem',
    category: 'Játékelmélet'
  },
  {
    id: 'l3-p7',
    left: 'Vesztes pozíció',
    right: 'Olyan állás, ahonnan az ellenfél tudja kikényszeríteni a nyerést',
    category: 'Játékelmélet'
  },
  {
    id: 'l3-p8',
    left: 'Nem igazságos (unfair) játék',
    right: 'Az egyik fél matematikai előnnyel rendelkezik a szabályok miatt',
    category: 'Játékelmélet'
  }
];

export const ProbabilityGameMatcher: React.FC<ProbabilityGameMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  onOpenRules,
  onNextLevel,
  level = 1
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Játék: Stratégia és Szerencse"
      subtitle="Párosítsd össze a játékok típusait, esélyeit, a Nim-stratégiát és a valószínűségi szabályokat!"
      topicId="probability-games"
      topicTitle="Játék: Stratégia és Szerencse"
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="indigo"
      levels={{
        1: {
          pairs: level1Pairs,
          title: '1. Szint: Játéktípusok és Alapfogalmak',
          subtitle: 'Kösd össze a játékfajtákat, alapfogalmakat és a Fair Play szabályait!',
          badgeText: '8 Pár • Alapfogalmak'
        },
        2: {
          pairs: level2Pairs,
          title: '2. Szint: Kockák, Érmék és a Nim-játék',
          subtitle: 'Találd meg a két kocka összegeinek és a Nim-stratégiának a párjait!',
          badgeText: '8 Pár • Stratégiák & Esélyek'
        },
        3: {
          pairs: level3Pairs,
          title: '3. Szint: Paradoxonok, Tévedések és Játékelmélet',
          subtitle: 'Párosítsd a haladó játékelméleti fogalmakat, Monty Hallt és a függetlenséget!',
          badgeText: '8 Pár • Játékelmélet Mester'
        }
      }}
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default ProbabilityGameMatcher;
