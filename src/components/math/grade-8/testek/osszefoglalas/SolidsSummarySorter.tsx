import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsSummarySorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Geometriai Testcsaládok',
    subtitle: 'Sorold be a tulajdonságokat és testeket a megfelelő csoportba!',
    categories: [
      {
        id: 'cat-prisms',
        name: 'Egyenes Testek (Hasábok, Henger)',
        description: 'Két párhuzamos, egybevágó alaplap, V = Tₐ · m',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-pyramids',
        name: 'Csúcsos Testek (Gúlák, Kúp)',
        description: 'Egy alaplap és egyetlen közös csúcspont, V = (Tₐ · m) / 3',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-sphere',
        name: 'Gömb és Gömbfelület',
        description: 'Egyetlen középponttól egyenlő távolságra lévő pontok halmaza',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'ss1-1', label: 'Térfogata: V = Tₐ · m', category: 'cat-prisms' },
      { id: 'ss1-2', label: 'Téglatest, kocka és egyenes körhenger', category: 'cat-prisms' },
      { id: 'ss1-3', label: 'Palástja kiterítve egyetlen nagy téglalap: T_p = Kₐ · m', category: 'cat-prisms' },
      { id: 'ss1-4', label: 'Bármely alappal párhuzamos síkmetszete egybevágó az alaplappal', category: 'cat-prisms' },
      { id: 'ss1-5', label: 'Térfogata: V = (Tₐ · m) / 3', category: 'cat-pyramids' },
      { id: 'ss1-6', label: 'Szabályos négyzetes gúla és egyenes körkúp', category: 'cat-pyramids' },
      { id: 'ss1-7', label: 'Oldallapjai háromszögek, csúcsban futnak össze', category: 'cat-pyramids' },
      { id: 'ss1-8', label: 'Palástja kiterítve körcikk (kúp) vagy háromszögek sokasága (gúla)', category: 'cat-pyramids' },
      { id: 'ss1-9', label: 'Felszíne: A = 4 · π · r²', category: 'cat-sphere' },
      { id: 'ss1-10', label: 'Térfogata: V = (4/3) · π · r³', category: 'cat-sphere' },
      { id: 'ss1-11', label: 'Nincs éle, nincs csúcsa és nincs sík alaplapja', category: 'cat-sphere' },
      { id: 'ss1-12', label: 'A Föld alakjának legjobb egyszerű matematikai modellje', category: 'cat-sphere' }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Dimenziók és Mennyiségek',
    subtitle: 'Válogasd szét a mennyiségeket és kifejezéseket dimenziójuk szerint (1D, 2D, 3D)!',
    categories: [
      {
        id: 'cat-1d',
        name: '1D Vonalas Méretek (Hosszúság)',
        description: 'Élek, magasságok, átmérők, kerületek [cm, m, km]',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-2d',
        name: '2D Síkbeli Méretek (Terület, Felszín)',
        description: 'Alapterület, palástterület, teljes felszín [cm², m²]',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-3d',
        name: '3D Térbeli Méretek (Térfogat, Űrtartalom)',
        description: 'Befogadóképesség, köbméret, literek [dm³, liter, m³]',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ss2-1', label: 'Kocka testátlója: d = a · √3', category: 'cat-1d' },
      { id: 'ss2-2', label: 'Kúp alkotója: a = √(m² + r²)', category: 'cat-1d' },
      { id: 'ss2-3', label: 'Gúla oldalmagassága: mₒ = √(m² + (a/2)²)', category: 'cat-1d' },
      { id: 'ss2-4', label: 'A Föld Egyenlítőjének kerülete: K ≈ 40 000 km', category: 'cat-1d' },
      { id: 'ss2-5', label: 'Henger palástterülete: T_p = 2πr · m', category: 'cat-2d' },
      { id: 'ss2-6', label: 'Kocka teljes felszíne: A = 6a²', category: 'cat-2d' },
      { id: 'ss2-7', label: 'Gömb felszíne: A = 4πr²', category: 'cat-2d' },
      { id: 'ss2-8', label: 'A Föld teljes felszíne: kb. 510 millió km²', category: 'cat-2d' },
      { id: 'ss2-9', label: 'Hasáb térfogata: V = Tₐ · m', category: 'cat-3d' },
      { id: 'ss2-10', label: 'Gúla térfogata: V = (Tₐ · m) / 3', category: 'cat-3d' },
      { id: 'ss2-11', label: '1 köbméter víz: 1000 liter (1000 dm³)', category: 'cat-3d' },
      { id: 'ss2-12', label: 'Gömb térfogata: V = (4/3)πr³', category: 'cat-3d' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai Állítások és Összefüggések',
    subtitle: 'Döntsd el, hogy az állítás mindig igaz, mindig hamis, vagy feltételtől függ!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz Állítás',
        description: 'Tétel, általános azonosság vagy definíció',
        badgeColor: 'bg-green-100 text-green-900 border-green-300'
      },
      {
        id: 'cat-false',
        name: 'Mindig Hamis Állítás',
        description: 'Matematikai tévedés vagy hibás képlet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-cond',
        name: 'Csak Bizonyos Esetekben Igaz',
        description: 'Függ a méretektől, alakoktól vagy a hasonlósági aránytól',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      { id: 'ss3-1', label: 'A kocka élének kétszerezésekor a térfogata 8-szorosára nő (2³ = 8)', category: 'cat-true' },
      { id: 'ss3-2', label: 'Az azonos alapterületű és magasságú gúla térfogata harmada a hasábénak', category: 'cat-true' },
      { id: 'ss3-3', label: '1 m³ pontosan 1000 liternek felel meg', category: 'cat-true' },
      { id: 'ss3-4', label: 'A gömb felszíne 4-szerese a főkörének', category: 'cat-true' },
      { id: 'ss3-5', label: 'Egy test éleinek megduplázásakor a felszíne is pontosan megduplázódik', category: 'cat-false' },
      { id: 'ss3-6', label: 'A henger térfogata mindig kisebb, mint a belé írható kúp térfogata', category: 'cat-false' },
      { id: 'ss3-7', label: 'A Föld Egyenlítője és minden szélességi köre azonos hosszúságú főkör', category: 'cat-false' },
      { id: 'ss3-8', label: 'A gúla oldalmagassága mindig rövidebb, mint a testmagassága (mₒ < m)', category: 'cat-false' },
      { id: 'ss3-9', label: 'Egy hasáb alapterülete megegyezik a palástjának területével (Tₐ = T_p)', category: 'cat-cond' },
      { id: 'ss3-10', label: 'Egy henger magassága egyenlő az alapkörének átmérőjével (m = 2r)', category: 'cat-cond' },
      { id: 'ss3-11', label: 'A gúla oldallapjai szabályos háromszögek', category: 'cat-cond' },
      { id: 'ss3-12', label: 'Egy test mérőszáma a felszínnél és térfogatnál megegyezik (pl. a = 6 kocka)', category: 'cat-cond' }
    ]
  }
};

export const SolidsSummarySorter: React.FC<SolidsSummarySorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-solids-summary',
  topicTitle = 'Fejezeti Összefoglalás: Testek (Csoportosító)'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <SorterTemplate
      key={`solids-summary-sorter-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levelConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="indigo"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • VII. Testek"
    />
  );
};

export default SolidsSummarySorter;
