import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsReviewSorterProps {
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
    title: '1. Szint: Testek Kategóriái és Képletei',
    subtitle: 'Csoportosítsd a fogalmakat és képleteket a megfelelő geometriai test szerint!',
    categories: [
      {
        id: 'cat-cuboid',
        name: 'Kocka és Téglatest',
        description: 'Téglalap vagy négyzet lapok, derékszögű élek',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-prism',
        name: 'Egyenes Hasábok (nem téglatest)',
        description: 'Háromszög, trapéz, sokszög alapú hasábok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-cylinder',
        name: 'Forgáshenger',
        description: 'Kör alaplapok, téglalap palást, forgástest',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'V = a · b · c', category: 'cat-cuboid' },
      { id: 's1-2', label: 'A = 6 · a²', category: 'cat-cuboid' },
      { id: 's1-3', label: 'Testátló: d = √(a² + b² + c²)', category: 'cat-cuboid' },
      { id: 's1-4', label: '12 egyenlő éle és 6 négyzetlapja van', category: 'cat-cuboid' },
      { id: 's1-5', label: 'Háromszög alapú hasáb (Ta = (a·ma)/2)', category: 'cat-prism' },
      { id: 's1-6', label: 'Szabályos hatszög alapú hasáb', category: 'cat-prism' },
      { id: 's1-7', label: 'V = Ta · m (tetszőleges alapsokszöggel)', category: 'cat-prism' },
      { id: 's1-8', label: 'Tp = Ka · m (palást = alapkerület · testmagasság)', category: 'cat-prism' },
      { id: 's1-9', label: 'Alaplapja r sugarú körlap (Ta = r²π)', category: 'cat-cylinder' },
      { id: 's1-10', label: 'V = r²π · m', category: 'cat-cylinder' },
      { id: 's1-11', label: 'A = 2r²π + 2rπ · m', category: 'cat-cylinder' },
      { id: 's1-12', label: 'Téglalap egyik oldala körüli megforgatásával keletkezik', category: 'cat-cylinder' }
    ]
  },
  2: {
    title: '2. Szint: Mértékegységek Dimenziója',
    subtitle: 'Döntsd el, hogy az adott mennyiség térfogat (3D), felszín (2D) vagy hosszúság (1D)!',
    categories: [
      {
        id: 'cat-3d',
        name: 'Térfogat és Űrtartalom (3D)',
        description: 'Köbös egységek és folyadékmértékek (váltószám: 1000)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-2d',
        name: 'Felszín és Terület (2D)',
        description: 'Négyzetes egységek és síkfelületek (váltószám: 100)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-1d',
        name: 'Hosszúság és Élhossz (1D)',
        description: 'Lineáris szakaszok és kerületek (váltószám: 10)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 's2-1', label: '1 köbméter (1 m³)', category: 'cat-3d' },
      { id: 's2-2', label: '2,5 liter víz űrtartalma', category: 'cat-3d' },
      { id: 's2-3', label: '500 köbcentiméter (cm³)', category: 'cat-3d' },
      { id: 's2-4', label: '10 hektoliter (hl)', category: 'cat-3d' },
      { id: 's2-5', label: '15 négyzetméter (m²) falfelület', category: 'cat-2d' },
      { id: 's2-6', label: '300 négyzetdeciméter (dm²)', category: 'cat-2d' },
      { id: 's2-7', label: '1 hektár (ha = 10 000 m²)', category: 'cat-2d' },
      { id: 's2-8', label: '80 négyzetcentiméter (cm²)', category: 'cat-2d' },
      { id: 's2-9', label: '12 méter hosszú kerítés (m)', category: 'cat-1d' },
      { id: 's2-10', label: 'Kocka testátlójának hossza (cm)', category: 'cat-1d' },
      { id: 's2-11', label: 'Henger alapkörének kerülete (Ka)', category: 'cat-1d' },
      { id: 's2-12', label: '50 milliméter élhosszúság (mm)', category: 'cat-1d' }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Állítások Igazságértéke',
    subtitle: 'Döntsd el a geometriai állításokról, hogy mindig igazak, csak néha vagy mindig hamisak!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz',
        description: 'Tétel vagy definíció szerint minden esetben helyes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sometimes',
        name: 'Csak Bizonyos Esetekben Igaz',
        description: 'Csak speciális méretek vagy alakzatok esetén teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-false',
        name: 'Mindig Hamis',
        description: 'Matematikai képtelenség vagy téves állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: '1 dm³ térfogatú edénybe pontosan 1 liter víz fér.', category: 'cat-true' },
      { id: 's3-2', label: 'Minden kocka egyben speciális téglatest is.', category: 'cat-true' },
      { id: 's3-3', label: 'Bármely egyenes hasáb térfogata V = Ta · m.', category: 'cat-true' },
      { id: 's3-4', label: 'A kocka belső testátlója d = a√3.', category: 'cat-true' },
      { id: 's3-5', label: 'A hasáb magassága megegyezik az alapsokszög oldalával.', category: 'cat-sometimes' },
      { id: 's3-6', label: 'Egy hasáb alapterülete és magassága megegyezik.', category: 'cat-sometimes' },
      { id: 's3-7', label: 'A test felszíne és térfogata mérőszámban azonos (pl. a=6-nál).', category: 'cat-sometimes' },
      { id: 's3-8', label: 'Egy henger magassága pontosan kétszerese az alapkör sugarának.', category: 'cat-sometimes' },
      { id: 's3-9', label: 'A kocka éle és a testátlója azonos hosszúságú.', category: 'cat-false' },
      { id: 's3-10', label: '1 m³ víz pontosan 100 liter vizet jelent.', category: 'cat-false' },
      { id: 's3-11', label: 'A henger felszíne csak a két alapkör területének összege.', category: 'cat-false' },
      { id: 's3-12', label: 'Egy téglatestnek 8 lapja és 6 csúcsa van.', category: 'cat-false' }
    ]
  }
};

export const SolidsReviewSorter: React.FC<SolidsReviewSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-solids-review-sorter',
  topicTitle = 'Mit tanultunk eddig? (Csoportosító)'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <SorterTemplate
      key={`sr-sorter-${activeLvl}`}
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
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • VI. Testek"
    />
  );
};

export default SolidsReviewSorter;
