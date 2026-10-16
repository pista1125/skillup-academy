import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PolygonAreaSorterProps {
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
    title: '1. Szint: Képletek és Síkidomok csoportosítása',
    subtitle: 'Válogasd szét a területképleteket és kifejezéseket az alakzatok szerint!',
    categories: [
      {
        id: 'cat-sq-rect',
        name: 'Négyzet & Téglalap',
        description: 'T = a² és T = a · b szorzások',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-tri',
        name: 'Háromszögek',
        description: 'Befogók vagy alap és magasság szorzatának fele',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-para',
        name: 'Paralelogramma & Rombusz',
        description: 'T = a · mₐ vagy rombusz átlói (e · f) / 2',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-trap-del',
        name: 'Trapéz & Deltoid',
        description: 'Középvonal × magasság vagy átlók szorzatának fele',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'T = a · a (a²)', category: 'cat-sq-rect' },
      { id: 's1-2', label: 'T = (a · mₐ) : 2', category: 'cat-tri' },
      { id: 's1-3', label: 'T = a · mₐ', category: 'cat-para' },
      { id: 's1-4', label: 'T = [(a + c) · m] : 2', category: 'cat-trap-del' },
      { id: 's1-5', label: 'T = a · b', category: 'cat-sq-rect' },
      { id: 's1-6', label: 'T = (a · b) : 2 (két befogó)', category: 'cat-tri' },
      { id: 's1-7', label: 'Rombusz: T = a · m', category: 'cat-para' },
      { id: 's1-8', label: 'Deltoid: T = (e · f) : 2', category: 'cat-trap-del' },
      { id: 's1-9', label: 'Négyzet: 4 egyenlő oldal szorzata', category: 'cat-sq-rect' },
      { id: 's1-10', label: 'T = (c · m_c) : 2', category: 'cat-tri' },
      { id: 's1-11', label: 'Rombusz átlói: (e · f) : 2', category: 'cat-para' },
      { id: 's1-12', label: 'Két párhuzamos alap összege felezve · m', category: 'cat-trap-del' }
    ]
  },
  2: {
    title: '2. Szint: Hasonlítás 24 cm²-es Területhez',
    subtitle: 'Válogasd szét a feladványokat aszerint, hogy területük kisebb, egyenlő vagy nagyobb 24 cm²-nél!',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb, mint 24 cm²',
        description: 'T < 24 cm²',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 24 cm²',
        description: 'T = 24 cm²',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-more',
        name: 'Nagyobb, mint 24 cm²',
        description: 'T > 24 cm²',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'a = 4 cm oldalú négyzet (16 cm²)', category: 'cat-less' },
      { id: 's2-2', label: 'a = 6 cm, b = 4 cm téglalap', category: 'cat-equal' },
      { id: 's2-3', label: 'a = 5 cm oldalú négyzet (25 cm²)', category: 'cat-more' },
      { id: 's2-4', label: 'a = 6 cm, b = 6 cm derékszögű △ (18 cm²)', category: 'cat-less' },
      { id: 's2-5', label: 'a = 8 cm, b = 3 cm téglalap', category: 'cat-equal' },
      { id: 's2-6', label: 'a = 7 cm, b = 4 cm téglalap (28 cm²)', category: 'cat-more' },
      { id: 's2-7', label: 'a = 7 cm, mₐ = 6 cm △ (21 cm²)', category: 'cat-less' },
      { id: 's2-8', label: 'a = 8 cm, mₐ = 6 cm derékszögű △ (48 : 2)', category: 'cat-equal' },
      { id: 's2-9', label: 'a = 6 cm, mₐ = 5 cm paralelogramma (30 cm²)', category: 'cat-more' },
      { id: 's2-10', label: 'e = 6 cm, f = 7 cm deltoid (21 cm²)', category: 'cat-less' },
      { id: 's2-11', label: 'e = 8 cm, f = 6 cm rombusz (48 : 2)', category: 'cat-equal' },
      { id: 's2-12', label: 'a = 10 cm, c = 4 cm, m = 4 cm trapéz (28 cm²)', category: 'cat-more' }
    ]
  },
  3: {
    title: '3. Szint: Számítási Módszerek és Képlettípusok',
    subtitle: 'Csoportosítsd a feladatokat a megoldásukhoz szükséges matematikai művelet szerint!',
    categories: [
      {
        id: 'cat-mul',
        name: 'Közvetlen szorzás (a · b vagy a · m)',
        description: 'Nincs osztás a képletben (négyzet, téglalap, paralelogramma)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-half',
        name: 'Felezés / Osztás 2-vel [(...) : 2]',
        description: 'Háromszög, deltoid, trapéz, rombusz átlói',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-compound',
        name: 'Összetett / Bontásos módszer',
        description: 'Több részterület összege vagy felesleg levonása',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Szoba parkettázása (téglalap alap)', category: 'cat-mul' },
      { id: 's3-2', label: 'Általános háromszög területszámítása', category: 'cat-half' },
      { id: 's3-3', label: 'L-alakú szoba alapterülete', category: 'cat-compound' },
      { id: 's3-4', label: 'Paralelogramma területe alapból és magasságból', category: 'cat-mul' },
      { id: 's3-5', label: 'Deltoid alakú sárkány felülete az átlókból', category: 'cat-half' },
      { id: 's3-6', label: 'Négyzet alakú telek sarkából levágott garázs', category: 'cat-compound' },
      { id: 's3-7', label: 'Négyzet alakú csempe felülete (a²)', category: 'cat-mul' },
      { id: 's3-8', label: 'Trapéz alakú háztető területe [(a+c)·m : 2]', category: 'cat-half' },
      { id: 's3-9', label: 'Téglalap házfal és a háromszög alakú tető együttes területe', category: 'cat-compound' },
      { id: 's3-10', label: 'Földút menti paralelogramma alakú telek (a · mₐ)', category: 'cat-mul' },
      { id: 's3-11', label: 'Derékszögű háromszög vitorla területe', category: 'cat-half' },
      { id: 's3-12', label: 'Keret területe: külső téglalapból levonva a belsőt', category: 'cat-compound' }
    ]
  }
};

export const PolygonAreaSorter: React.FC<PolygonAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-polygon-area-sorter',
  topicTitle = 'A sokszögek területe'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      config={sorterLevels[activeLevel]}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
      themeColor="emerald"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      title="Sokszögek területe csoportosító"
      subtitle="Csoportosítsd a síkidomokat, képleteket és területszámítási módszereket 3 szinten!"
    />
  );
};

(PolygonAreaSorter as any).sorterLevels = sorterLevels;
(PolygonAreaSorter as any).levels = sorterLevels;

export default PolygonAreaSorter;
