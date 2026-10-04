import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityBasicsMatcherProps {
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
    id: 'l1-p1',
    left: 'Klasszikus valószínűség képlete',
    right: 'P(A) = kedvező esetek / összes esetek = k / n',
    category: 'Alapfogalmak'
  },
  {
    id: 'l1-p2',
    left: 'Biztos esemény valószínűsége',
    right: 'P(I) = 1 (pontosan 100% esély)',
    category: 'Eseménytípusok'
  },
  {
    id: 'l1-p3',
    left: 'Lehetetlen esemény valószínűsége',
    right: 'P(∅) = 0 (pontosan 0% esély)',
    category: 'Eseménytípusok'
  },
  {
    id: 'l1-p4',
    left: 'Egy kockával páros szám dobása',
    right: '3 / 6 = 1 / 2 = 50% (kedvező: 2, 4, 6)',
    category: 'Kockadobás'
  },
  {
    id: 'l1-p5',
    left: 'Szabályos érmével fej dobása',
    right: '1 / 2 = 50% (két egyenlő kimenetel: fej, írás)',
    category: 'Érmefeldobás'
  },
  {
    id: 'l1-p6',
    left: 'Valószínűség értéktartománya',
    right: 'Mindig 0 és 1 (0% és 100%) közötti valós szám',
    category: 'Alapfogalmak'
  },
  {
    id: 'l1-p7',
    left: 'Elemi esemény fogalma',
    right: 'A véletlen kísérlet egyetlen, tovább nem bontható kimenetele',
    category: 'Alapfogalmak'
  },
  {
    id: 'l1-p8',
    left: 'Eseménytér (Omega)',
    right: 'A kísérlet összes lehetséges kimenetelének összessége',
    category: 'Alapfogalmak'
  }
];

const level2Pairs: MatchPair[] = [
  {
    id: 'l2-p1',
    left: '32 lapos magyar kártyából ász húzása',
    right: '4 / 32 = 1 / 8 (pontosan 12,5%)',
    category: 'Kártyahúzás'
  },
  {
    id: 'l2-p2',
    left: '32 lapos magyar kártyából piros színű lap',
    right: '8 / 32 = 1 / 4 (pontosan 25%)',
    category: 'Kártyahúzás'
  },
  {
    id: 'l2-p3',
    left: 'Egy kockával prímszám dobása',
    right: '3 / 6 = 1 / 2 = 50% (kedvező: 2, 3, 5)',
    category: 'Kockadobás'
  },
  {
    id: 'l2-p4',
    left: 'Egy kockával 4-nél nagyobb szám dobása',
    right: '2 / 6 = 1 / 3 (kb. 33,3%, kedvező: 5, 6)',
    category: 'Kockadobás'
  },
  {
    id: 'l2-p5',
    left: 'Urna: 3 piros és 7 kék golyóból piros',
    right: '3 / 10 = 0,3 = 30%',
    category: 'Urnamodell'
  },
  {
    id: 'l2-p6',
    left: 'Urna: 5 fehér és 5 fekete golyóból fehér',
    right: '5 / 10 = 1 / 2 = 50%',
    category: 'Urnamodell'
  },
  {
    id: 'l2-p7',
    left: 'Két érmével dobva: mindkettő írás',
    right: '1/2 · 1/2 = 1 / 4 (25% esély)',
    category: 'Kombinációk'
  },
  {
    id: 'l2-p8',
    left: '52 lapos francia kártyából treff szín',
    right: '13 / 52 = 1 / 4 = 25%',
    category: 'Kártyahúzás'
  }
];

const level3Pairs: MatchPair[] = [
  {
    id: 'l3-p1',
    left: 'Ellentett (komplementer) esemény',
    right: 'P(Nem A) = 1 - P(A)',
    category: 'Komplementer'
  },
  {
    id: 'l3-p2',
    left: 'P(eső) = 0,35 ellentettjének esélye',
    right: 'P(nem esik) = 1 - 0,35 = 0,65 (65%)',
    category: 'Komplementer'
  },
  {
    id: 'l3-p3',
    left: 'A nagy számok törvénye',
    right: 'Sok kísérletnél a relatív gyakoriság rásimul a valószínűségre',
    category: 'Elmélet'
  },
  {
    id: 'l3-p4',
    left: 'Egymást kizáró események összege',
    right: 'P(A vagy B) = P(A) + P(B)',
    category: 'Összegszabály'
  },
  {
    id: 'l3-p5',
    left: 'Egy kockával NEM 6-ost dobni',
    right: '1 - 1/6 = 5 / 6 (kb. 83,3%)',
    category: 'Komplementer'
  },
  {
    id: 'l3-p6',
    left: 'Urna: 4 zöld, 6 sárga golyóból NEM zöld',
    right: '1 - 4/10 = 6 / 10 = 60%',
    category: 'Urnamodell'
  },
  {
    id: 'l3-p7',
    left: 'P(A) = 1,45 állítás megítélése',
    right: 'Lehetetlen: a valószínűség nem haladhatja meg az 1-et (100%-ot)',
    category: 'Hibás fogalmak'
  },
  {
    id: 'l3-p8',
    left: 'Empirikus valószínűség',
    right: 'Ténylegesen elvégzett kísérletsorozat alapján mért relatív gyakoriság',
    category: 'Elmélet'
  }
];

const matcherLevels = {
  1: {
    pairs: level1Pairs,
    title: '1. Szint: Alapfogalmak és Szabályos Eszközök',
    subtitle: 'Kösd össze a klasszikus valószínűség képletét és a biztos/lehetetlen eseményeket!',
    badgeText: '8 Pár • Alapfogalmak'
  },
  2: {
    pairs: level2Pairs,
    title: '2. Szint: Számítások Kockával, Kártyával és Urnával',
    subtitle: 'Találd meg a feladványokhoz tartozó pontos valószínűségi értékeket!',
    badgeText: '8 Pár • Számítások'
  },
  3: {
    pairs: level3Pairs,
    title: '3. Szint: Komplementer Esemény és Törvényszerűségek',
    subtitle: 'Párosítsd az ellentett esemény képleteit, a nagy számok törvényét és a haladó szabályokat!',
    badgeText: '8 Pár • Mester szint'
  }
};

export const ProbabilityBasicsMatcher: React.FC<ProbabilityBasicsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'probability-basics',
  topicTitle = 'Klasszikus Valószínűség'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      title="Klasszikus Valószínűség"
      subtitle="Találd meg az események, képletek és konkrét valószínűségi értékek párjait!"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="amber"
      onBack={onSwitchToQuiz}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default ProbabilityBasicsMatcher;
