import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DirectProportionSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Arányossági Típusok Megkülönböztetése',
    subtitle: 'Döntsd el, hogy egyenes, fordított vagy nincs arányosság a megadott mennyiségek között!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Egyenes arányosság',
        description: 'Ha az egyik többszörösére nő, a másik is ugyanannyiszorosára nő',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-inverse',
        name: 'Fordított arányosság',
        description: 'Ha az egyik nő, a másik ugyanannyiszorosára csökken',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-none',
        name: 'Nincs arányosság',
        description: 'Nincs szorzásos egyenes vagy fordított arány a mennyiségek között',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 'dps1-1', label: 'Vásárolt kiflik száma és a fizetendő összeg', category: 'cat-direct' },
      { id: 'dps1-2', label: 'Azonos munkát végző munkások száma és a munkaidő', category: 'cat-inverse' },
      { id: 'dps1-3', label: 'Egy ember életkora és a cipőmérete', category: 'cat-none' },
      { id: 'dps1-4', label: 'Állandó sebességnél az eltelt idő és a megtett út', category: 'cat-direct' },
      { id: 'dps1-5', label: 'Ugyanazon az úton haladó jármű sebessége és a menetidő', category: 'cat-inverse' },
      { id: 'dps1-6', label: 'Egy négyzet oldalhossza és a területe (T = a²)', category: 'cat-none' },
      { id: 'dps1-7', label: 'Négyzet oldalhossza és a kerülete (K = 4a)', category: 'cat-direct' },
      { id: 'dps1-8', label: 'Egy tortát szeletelő gyerekek száma és egy szelet nagysága', category: 'cat-inverse' },
      { id: 'dps1-9', label: 'Egy autó sebessége és a fékút hossza', category: 'cat-none' },
      { id: 'dps1-10', label: 'Festendő falfelület és a szükséges festékmennyiség', category: 'cat-direct' },
      { id: 'dps1-11', label: 'Szivattyúk száma és a medence leürítésének ideje', category: 'cat-inverse' },
      { id: 'dps1-12', label: 'A tanulással töltött órák száma és a testsúly', category: 'cat-none' }
    ]
  },
  2: {
    title: '2. Szint: Arányossági Tényező (Egységérték: y / x)',
    subtitle: 'Számítsd ki az arányossági tényezőt (egységárat vagy egységértéket)!',
    categories: [
      {
        id: 'cat-k200',
        name: 'k = 200',
        description: 'A hányados értéke pontosan 200 (y / x = 200)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-k350',
        name: 'k = 350',
        description: 'A hányados értéke pontosan 350 (y / x = 350)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-k500',
        name: 'k = 500',
        description: 'A hányados értéke pontosan 500 (y / x = 500)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      { id: 'dps2-1', label: '400 Ft fizetve 2 kg almáért', category: 'cat-k200' },
      { id: 'dps2-2', label: '700 Ft fizetve 2 kg körtéért', category: 'cat-k350' },
      { id: 'dps2-3', label: '1000 Ft fizetve 2 kg sajtért', category: 'cat-k500' },
      { id: 'dps2-4', label: '600 km megtéve 3 óra alatt', category: 'cat-k200' },
      { id: 'dps2-5', label: '1050 Ft fizetve 3 csokiért', category: 'cat-k350' },
      { id: 'dps2-6', label: '1500 Ft fizetve 3 mozijegyért', category: 'cat-k500' },
      { id: 'dps2-7', label: '1000 Ft fizetve 5 füzetért', category: 'cat-k200' },
      { id: 'dps2-8', label: '1400 Ft fizetve 4 doboz üdítőért', category: 'cat-k350' },
      { id: 'dps2-9', label: '2500 Ft fizetve 5 könyvért', category: 'cat-k500' },
      { id: 'dps2-10', label: '1600 Ft fizetve 8 gombóc fagyiért', category: 'cat-k200' },
      { id: 'dps2-11', label: '3500 Ft fizetve 10 liter tejért', category: 'cat-k350' },
      { id: 'dps2-12', label: '2000 Ft fizetve 4 kg narancsért', category: 'cat-k500' }
    ]
  },
  3: {
    title: '3. Szint: Végösszeg Kiszámítása Arányosan',
    subtitle: 'Határozd meg a megvásárolt áruk arányos fizetendő végösszegét!',
    categories: [
      {
        id: 'cat-sum-2400',
        name: 'Végösszeg: 2400 Ft',
        description: 'A kiszámított fizetendő összeg 2400 Ft',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-sum-3600',
        name: 'Végösszeg: 3600 Ft',
        description: 'A kiszámított fizetendő összeg 3600 Ft',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-sum-4800',
        name: 'Végösszeg: 4800 Ft',
        description: 'A kiszámított fizetendő összeg 4800 Ft',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 'dps3-1', label: '3 kg szőlő, ha 1 kg ára 800 Ft', category: 'cat-sum-2400' },
      { id: 'dps3-2', label: '3 kg sajt, ha 1 kg ára 1200 Ft', category: 'cat-sum-3600' },
      { id: 'dps3-3', label: '4 kg dió, ha 1 kg ára 1200 Ft', category: 'cat-sum-4800' },
      { id: 'dps3-4', label: '6 db füzet, ha 2 db füzet 800 Ft', category: 'cat-sum-2400' },
      { id: 'dps3-5', label: '4 doboz kávé, ha 2 doboz 1800 Ft', category: 'cat-sum-3600' },
      { id: 'dps3-6', label: '6 doboz bonbon, ha 2 doboz 1600 Ft', category: 'cat-sum-4800' },
      { id: 'dps3-7', label: '4 doboz tea, ha 1 doboz 600 Ft', category: 'cat-sum-2400' },
      { id: 'dps3-8', label: '9 db csoki, ha 1 db 400 Ft', category: 'cat-sum-3600' },
      { id: 'dps3-9', label: '8 méter szalag, ha 1 méter 600 Ft', category: 'cat-sum-4800' },
      { id: 'dps3-10', label: '8 gombóc fagyi, ha 1 gombóc 300 Ft', category: 'cat-sum-2400' },
      { id: 'dps3-11', label: '6 liter szörp, ha 1 liter 600 Ft', category: 'cat-sum-3600' },
      { id: 'dps3-12', label: '12 db füzet, ha 1 db 400 Ft', category: 'cat-sum-4800' }
    ]
  }
};

export const DirectProportionSorter: React.FC<DirectProportionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-direct-prop-sorter',
  topicTitle = 'Egyenes arányosság (Csoportosító)'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      themeColor="amber"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default DirectProportionSorter;
