import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityProblemsSorterProps {
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
    title: '1. Szint: Két Kocka Dobása Összegek Szerint',
    subtitle: 'Csoportosítsd a két kockával dobott összegeket gyakoriság és nagyságrend szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kis Összeg (2, 3, 4 vagy 5)',
        description: 'Ritkább összegek az alsó tartományban (összesen 10 eset a 36-ból)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-mid',
        name: 'Középértékek (6, 7 vagy 8)',
        description: 'A leggyakoribb összegek a piramis csúcsán (összesen 16 eset a 36-ból)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-large',
        name: 'Nagy Összeg (9, 10, 11 vagy 12)',
        description: 'Ritkább összegek a felső tartományban (összesen 10 eset a 36-ból)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Összeg = 2 [párok: (1,1)]', category: 'cat-small' },
      { id: 's1-2', label: 'Összeg = 3 [párok: (1,2), (2,1)]', category: 'cat-small' },
      { id: 's1-3', label: 'Összeg = 4 [párok: (1,3), (2,2), (3,1)]', category: 'cat-small' },
      { id: 's1-4', label: 'Összeg = 5 [párok: (1,4), (2,3), (3,2), (4,1)]', category: 'cat-small' },
      { id: 's1-5', label: 'Összeg = 6 [5 db kedvező kimenetel]', category: 'cat-mid' },
      { id: 's1-6', label: 'Összeg = 7 [A leggyakoribb: 6 db kedvező eset]', category: 'cat-mid' },
      { id: 's1-7', label: 'Összeg = 8 [5 db kedvező kimenetel]', category: 'cat-mid' },
      { id: 's1-8', label: 'Mindkét kockával 3-ast dobunk (3 + 3 = 6)', category: 'cat-mid' },
      { id: 's1-9', label: 'Összeg = 9 [4 db kedvező kimenetel]', category: 'cat-large' },
      { id: 's1-10', label: 'Összeg = 10 [párok: (4,6), (5,5), (6,4)]', category: 'cat-large' },
      { id: 's1-11', label: 'Összeg = 11 [párok: (5,6), (6,5)]', category: 'cat-large' },
      { id: 's1-12', label: 'Összeg = 12 [egyedül a (6,6) dupla]', category: 'cat-large' }
    ]
  },
  2: {
    title: '2. Szint: Kísérlettípusok és Mintavétel',
    subtitle: 'Válogasd szét a feladatokat: Visszatevéses (független), Visszatevés nélküli (függő), vagy Egy lépéses kísérlet!',
    categories: [
      {
        id: 'cat-with-rep',
        name: 'Visszatevéssel (Független)',
        description: 'A húzott elem visszakerül, a halmaz összetétele nem változik a lépések között',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-no-rep',
        name: 'Visszatevés Nélkül (Függő)',
        description: 'A kihúzott elem kint marad, a nevező és a kedvező darabszám is csökken a következő húzásnál',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-single',
        name: 'Egy Lépéses Kísérlet',
        description: 'Egyetlen tárgyat (kockát, kártyát, golyót) vizsgálunk, nincs egymást követő mintavétel',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Urnából 1 piros golyót húzunk, visszatesszük, majd újra húzunk egyet', category: 'cat-with-rep' },
      { id: 's2-2', label: 'PIN kód 4 számjegyének generálása (a számjegyek ismétlődhetnek: 0-9)', category: 'cat-with-rep' },
      { id: 's2-3', label: 'Pénzérme feldobása háromszor egymás után', category: 'cat-with-rep' },
      { id: 's2-4', label: 'Két dobókockával egyszerre dobunk (független kimenetelek)', category: 'cat-with-rep' },
      { id: 's2-5', label: '32 lapos pakliból egymás után 2 lapot húzunk úgy, hogy az elsőt félretesszük', category: 'cat-no-rep' },
      { id: 's2-6', label: 'Urnában lévő 10 golyóból egyszerre kihúzunk 2 golyót', category: 'cat-no-rep' },
      { id: 's2-7', label: 'Lottósorsolás: 90 számból 5 golyó kihúzása a gömbből', category: 'cat-no-rep' },
      { id: 's2-8', label: 'Egy osztályból kiválasztunk 1 felelőt és 1 hetest (különböző diákok)', category: 'cat-no-rep' },
      { id: 's2-9', label: 'Egy dobozból kihúzunk pontosan egy darab ceruzát', category: 'cat-single' },
      { id: 's2-10', label: 'Egyetlen hatoldalú kockával dobunk egy páros számot', category: 'cat-single' },
      { id: 's2-11', label: 'Kártyacsomagból 1 lapot húzva megnézzük, hogy zöld ász-e', category: 'cat-single' },
      { id: 's2-12', label: 'Egy szerencsekerék egyetlen megpörgetése', category: 'cat-single' }
    ]
  },
  3: {
    title: '3. Szint: Igaz, Hamis és Tévhitek Összetett Eseményeknél',
    subtitle: 'Döntsd el a több lépéses valószínűségszámítási állításokról, hogy érvényesek vagy tévedések!',
    categories: [
      {
        id: 'cat-true',
        name: 'Igaz Állítás',
        description: 'Matematikailag helytálló szabály vagy összefüggés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-spec',
        name: 'Feltételes Szabály',
        description: 'Csak bizonyos feltételek (pl. függetlenség vagy kizáró események) esetén teljesül',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-false',
        name: 'Matematikai Tévhit',
        description: 'Gyakori diákhiba, hamis állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A fa-diagram egy ágán lévő valószínűségeket összeszorozzuk', category: 'cat-true' },
      { id: 's3-2', label: 'A „legalább egy” esemény valószínűsége: 1 - P(egyik sem)', category: 'cat-true' },
      { id: 's3-3', label: 'Két kocka összege 7 a leggyakoribb, mert 6 pár adja ki a 36-ból', category: 'cat-true' },
      { id: 's3-4', label: 'Visszatevés nélkül a második húzásnál a nevező eggyel csökken', category: 'cat-true' },
      { id: 's3-5', label: 'P(A és B) = P(A) · P(B) kizárólag FÜGGETLEN eseményeknél érvényes', category: 'cat-spec' },
      { id: 's3-6', label: 'P(A vagy B) = P(A) + P(B) kizárólag EGYMÁST KIZÁRÓ eseményeknél igaz', category: 'cat-spec' },
      { id: 's3-7', label: 'Az összeg valószínűsége csak akkor számolható kedvező/36 alapon, ha a kocka szabályos', category: 'cat-spec' },
      { id: 's3-8', label: 'Két golyó kihúzása egyszerre egyenértékű a visszatevés nélküli egymás utáni húzással', category: 'cat-spec' },
      { id: 's3-9', label: '„Két kockával dobva az összeg 2 és 12 között bármi lehet, így mind a 11 összeg egyenlő esélyű”', category: 'cat-false' },
      { id: 's3-10', label: '„Visszatevés nélkül a második húzás esélye nem változik meg, mert a golyók színe azonos marad”', category: 'cat-false' },
      { id: 's3-11', label: '„Két érmével dobva 3 eset lehetséges: két fej, két írás, vagy egy fej és egy írás, mind 1/3 eséllyel”', category: 'cat-false' },
      { id: 's3-12', label: '„Ha egy érmével 5 fejet dobtunk, a 6. dobásnál már 90% feletti az írás esélye”', category: 'cat-false' }
    ]
  }
};

export const ProbabilityProblemsSorter: React.FC<ProbabilityProblemsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'probability-problems',
  topicTitle = 'Valószínűségszámítási Feladatok'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="rose"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default ProbabilityProblemsSorter;
