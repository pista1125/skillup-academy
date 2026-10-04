import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityGameSorterProps {
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
    title: '1. Szint: Játékok Csoportosítása Jellegük Szerint',
    subtitle: 'Válogasd szét a játékokat és tulajdonságaikat a három alapkategóriába!',
    categories: [
      {
        id: 'cat-strat',
        name: 'Tiszta Stratégiai Játék',
        description: 'Nincs benne véletlen, teljes információ, létezik nyerő stratégia',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-luck',
        name: 'Tiszta Szerencsejáték',
        description: 'A kimenetel kizárólag a véletlenen múlik, nem befolyásolható',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-mixed',
        name: 'Vegyes Játék',
        description: 'A véletlen és a játékos taktikai döntései együttesen alakítják a játékot',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Sakk és amőba (ötödölő)', category: 'cat-strat' },
      { id: 's1-2', label: 'Nim-játék (21 gyufaszál felváltva elvétele)', category: 'cat-strat' },
      { id: 's1-3', label: 'Malom és dámajáték', category: 'cat-strat' },
      { id: 's1-4', label: 'Bármely állásban a játékosok ismerik a teljes helyzetet, nincs rejtett elem', category: 'cat-strat' },
      { id: 's1-5', label: 'Ötöslottó és hatoslottó sorsolás', category: 'cat-luck' },
      { id: 's1-6', label: 'Kaszínói rulettkerék forgatása', category: 'cat-luck' },
      { id: 's1-7', label: 'Egyetlen szabályos érme feldobása (fej vagy írás)', category: 'cat-luck' },
      { id: 's1-8', label: 'Tombolahúzás a falunapon', category: 'cat-luck' },
      { id: 's1-9', label: 'Póker és snapszer kártyajáték', category: 'cat-mixed' },
      { id: 's1-10', label: 'Monopoly és Gazdálkodj okosan társasjáték', category: 'cat-mixed' },
      { id: 's1-11', label: 'Catan telepesei társasjáték (kockadobás + kereskedés + építkezés)', category: 'cat-mixed' },
      { id: 's1-12', label: 'A véletlenszerű lapjárás mellett döntő a kockázatkezelési stratégia', category: 'cat-mixed' }
    ]
  },
  2: {
    title: '2. Szint: Két Kocka Összegeinek Gyakorisága',
    subtitle: 'Csoportosítsd a két szabályos kockával dobható összegeket esélyük szerint!',
    categories: [
      {
        id: 'cat-rare',
        name: 'Ritka Összegek (1-2 eset a 36-ból)',
        description: 'Nagyon kicsi esély: legfeljebb 2 kedvező dobáspár létezik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes Gyakoriság (3-4 eset a 36-ból)',
        description: 'Mérsékelt esély: 3 vagy 4 kedvező dobáspár a 36 lehetőségből',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-common',
        name: 'Leggyakoribb Összegek (5-6 eset a 36-ból)',
        description: 'Nagy esélyű, központi összegek (a harangcsúcs)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: '2-es összeg (csak (1,1) dobással: 1/36)', category: 'cat-rare' },
      { id: 's2-2', label: '12-es összeg (csak (6,6) dobással: 1/36)', category: 'cat-rare' },
      { id: 's2-3', label: '3-as összeg (csak (1,2) és (2,1) dobással: 2/36)', category: 'cat-rare' },
      { id: 's2-4', label: '11-es összeg (csak (5,6) és (6,5) dobással: 2/36)', category: 'cat-rare' },
      { id: 's2-5', label: '4-es összeg ((1,3), (2,2), (3,1): 3/36)', category: 'cat-medium' },
      { id: 's2-6', label: '10-es összeg ((4,6), (5,5), (6,4): 3/36)', category: 'cat-medium' },
      { id: 's2-7', label: '5-ös összeg ((1,4), (2,3), (3,2), (4,1): 4/36)', category: 'cat-medium' },
      { id: 's2-8', label: '9-es összeg ((3,6), (4,5), (5,4), (6,3): 4/36)', category: 'cat-medium' },
      { id: 's2-9', label: '7-es összeg (6 eset a 36-ból: 6/36 = 1/6, a legvalószínűbb)', category: 'cat-common' },
      { id: 's2-10', label: '6-os összeg (5 eset a 36-ból: (1,5), (2,4), (3,3), (4,2), (5,1))', category: 'cat-common' },
      { id: 's2-11', label: '8-as összeg (5 eset a 36-ból: (2,6), (3,5), (4,4), (5,3), (6,2))', category: 'cat-common' },
      { id: 's2-12', label: '6, 7 vagy 8 kidobásának együttes esélye: 16/36 (csaknem 45%)', category: 'cat-common' }
    ]
  },
  3: {
    title: '3. Szint: Játékhelyzetek és Állítások Megítélése',
    subtitle: 'Döntsd el, hogy az állítás helyes stratégia, tipikus tévedés vagy Fair Play!',
    categories: [
      {
        id: 'cat-correct',
        name: 'Helyes Stratégia / Matematikai Igazság',
        description: 'Tényeken és valószínűségszámításon alapuló bizonyított törvényszerűség',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-fallacy',
        name: 'Szerencsejátékosok Tévedése / Tévhit',
        description: 'Helytelen emberi megérzés, amely figyelmen kívül hagyja a függetlenséget',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-fair',
        name: 'Fair Play (50-50% / Döntetlen)',
        description: 'A felek egyenlő feltételekkel és azonos nyerési eséllyel játszanak',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A Monty Hall játékban mindig érdemes ajtót váltani, mert 2/3 az esély', category: 'cat-correct' },
      { id: 's3-2', label: 'Nim-játékban az ellenfél elvett gyufáit 4-re kiegészítve biztos a győzelem', category: 'cat-correct' },
      { id: 's3-3', label: 'A szabályos érmének és dobókockának nincsen memóriája', category: 'cat-correct' },
      { id: 's3-4', label: 'Szimmetrikus táblán az ellenfél tükrözése nyerő stratégiát adhat', category: 'cat-correct' },
      { id: 's3-5', label: '"Tíz piros után a ruletten most már biztosan a fekete következik"', category: 'cat-fallacy' },
      { id: 's3-6', label: '"Az én szerencseszámaimat soha nem húzták ki, így most nagyobb az esélyük"', category: 'cat-fallacy' },
      { id: 's3-7', label: '"A dobókocka előbb-utóbb kompenzálja a sok kis dobot nagy számmal"', category: 'cat-fallacy' },
      { id: 's3-8', label: '"Ha tegnap nyertem a sorsjegyen, ma már semmi esélyem nincs nyerni"', category: 'cat-fallacy' },
      { id: 's3-9', label: 'Kő-papír-olló egyetlen menetében a nyerés, vesztés és döntetlen esélye (1/3)', category: 'cat-fair' },
      { id: 's3-10', label: 'Két játékos feldob egy érmét: Anna fejnél, Béla írásnál kap pontot', category: 'cat-fair' },
      { id: 's3-11', label: 'Két kocka összegénél: Anna páros összegnél, Béla páratlannál nyer (18-18 eset)', category: 'cat-fair' },
      { id: 's3-12', label: 'Szabályos kockadobás: Anna 1-2-3-nál, Béla 4-5-6-nál győz', category: 'cat-fair' }
    ]
  }
};

export const ProbabilityGameSorter: React.FC<ProbabilityGameSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'probability-games',
  topicTitle = 'Játék: Stratégia és Szerencse'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="indigo"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default ProbabilityGameSorter;
