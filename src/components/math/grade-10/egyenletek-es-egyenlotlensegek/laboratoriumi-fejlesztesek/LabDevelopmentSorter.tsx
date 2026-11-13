import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  MixingBeakersSvg,
  ParallelFlowTubesSvg,
  DilutionStepsSvg,
  TechnicalFormulaBridgeSvg,
  LabBalanceBeakerSvg
} from './LabDevelopmentFigures';

interface LabDevelopmentSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
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
    title: 'Modellek és problémák matematikai típusa',
    subtitle: 'Csoportosítsd a gyakorlati feladatokat az alkalmazandó algebrai modell alapján!',
    categories: [
      {
        id: 'cat-mixing',
        name: 'Keverési és hígítási feladat',
        description: 'Oldatok, ötvözetek és anyagmérleg (m·w)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-work',
        name: 'Együttes munkavégzés / Csapfeladat',
        description: 'Teljesítmények összeadása és reciprok-egyenlet (1/t)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-physics',
        name: 'Műszaki és fizikai képletrendezés',
        description: 'Elektromos, optikai és mechanikai formulák átrendezése',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'lds1-1', content: '200 g 10%-os és 300 g 30%-os sósav összeöntése', figure: <MixingBeakersSvg size={42} />, categoryId: 'cat-mixing' },
      { id: 'lds1-2', content: 'Két szivattyú együttesen üríti ki a medencét', figure: <ParallelFlowTubesSvg size={42} />, categoryId: 'cat-work' },
      { id: 'lds1-3', content: 'Párhuzamosan kötött ellenállások eredőjének kiszámítása', figure: <TechnicalFormulaBridgeSvg size={42} />, categoryId: 'cat-physics' },
      { id: 'lds1-4', content: '500 g gyümölcslé hígítása 200 g tiszta vízzel', categoryId: 'cat-mixing' },
      { id: 'lds1-5', content: 'Két kőműves eltérő sebességgel építi fel a téglafalat', categoryId: 'cat-work' },
      { id: 'lds1-6', content: 'A fókusztávolság kifejezése a lencsetörvényből', categoryId: 'cat-physics' },
      { id: 'lds1-7', content: 'Arany és réz ötvözetének új karátszámítása', categoryId: 'cat-mixing' },
      { id: 'lds1-8', content: 'Hideg és meleg víz csapja együtt tölti a fürdőkádat', categoryId: 'cat-work' },
      { id: 'lds1-9', content: 'Sebesség kifejezése a kinetikus energiából: Ek = 1/2 m v²', categoryId: 'cat-physics' }
    ]
  },
  2: {
    title: 'Keverékek végső töménységének tartománya',
    subtitle: 'Határozd meg, melyik koncentráció-tartományba esik a létrejövő keverék!',
    categories: [
      {
        id: 'cat-low',
        name: 'Híg oldat (w < 15%)',
        description: 'Alacsony koncentrációjú keverék',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes töménység (15% ≤ w ≤ 35%)',
        description: 'Mérsékelt koncentrációjú oldat',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-high',
        name: 'Tömény oldat (w > 35%)',
        description: 'Erősen koncentrált keverék',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'lds2-1', content: '200 g 10%-os oldathoz 200 g víz adása (5%)', categoryId: 'cat-low' },
      { id: 'lds2-2', content: '200 g 10%-os és 300 g 30%-os oldat keveréke (22%)', figure: <MixingBeakersSvg size={42} />, categoryId: 'cat-medium' },
      { id: 'lds2-3', content: '500 g 40%-os és 500 g 60%-os oldat keveréke (50%)', categoryId: 'cat-high' },
      { id: 'lds2-4', content: '100 g 20%-os oldathoz 300 g tiszta víz (5%)', categoryId: 'cat-low' },
      { id: 'lds2-5', content: '400 g 20%-os oldathoz 100 g 40%-os adása (24%)', categoryId: 'cat-medium' },
      { id: 'lds2-6', content: '200 g 30%-os oldathoz 100 g tiszta sav (100%) adása (53,3%)', categoryId: 'cat-high' },
      { id: 'lds2-7', content: '300 g 12%-os és 300 g 16%-os keveréke (14%)', categoryId: 'cat-low' },
      { id: 'lds2-8', content: '500 g 20%-oshoz 50 g tiszta só adása (27,3%)', categoryId: 'cat-medium' },
      { id: 'lds2-9', content: '300 g 30%-os oldat bepárlása felére (60%)', categoryId: 'cat-high' }
    ]
  },
  3: {
    title: 'Szabályok, fizikai törvények és tévhitek',
    subtitle: 'Sorold be a modellezéssel kapcsolatos állításokat érvényességük szerint!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig igaz természettudományos szabály',
        description: 'Megmaradási elveken alapuló tény',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-myth',
        name: 'Veszélyes tévhit (Gyakori hiba)',
        description: 'Matematikailag vagy fizikailag hibás elképzelés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-conditional',
        name: 'Feltételesen érvényes összefüggés',
        description: 'Csak adott feltételek mellett (pl. azonos tömegek) érvényes',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 'lds3-1', content: 'Két oldat össztömege megegyezik a komponensek tömegének összegével', categoryId: 'cat-always-true' },
      { id: 'lds3-2', content: 'Két oldat keverékének töménysége a százalékok egyszerű számtani közepe', categoryId: 'cat-myth' },
      { id: 'lds3-3', content: 'A százalékok átlaga pontosan akkor adja az új töménységet, ha m₁ = m₂', categoryId: 'cat-conditional' },
      { id: 'lds3-4', content: 'Tiszta víz hozzáadásakor az oldott anyag abszolút tömege nem változik', categoryId: 'cat-always-true' },
      { id: 'lds3-5', content: 'Két gép együttes ideje az egyéni idők átlaga: (t₁ + t₂) / 2', figure: <ParallelFlowTubesSvg size={42} />, categoryId: 'cat-myth' },
      { id: 'lds3-6', content: 'Két egyforma teljesítményű csap együtt pontosan fele annyi idő alatt végez', categoryId: 'cat-conditional' },
      { id: 'lds3-7', content: 'A valós csapfeladatokban a kapott negatív gyök fizikailag értelmetlen', categoryId: 'cat-always-true' },
      { id: 'lds3-8', content: 'Víz elpárologtatásakor az oldott só mennyisége is csökken', categoryId: 'cat-myth' },
      { id: 'lds3-9', content: 'Két azonos párhuzamos ellenállás eredője a felére csökken: R_e = R/2', figure: <TechnicalFormulaBridgeSvg size={42} />, categoryId: 'cat-conditional' }
    ]
  }
};

export const LabDevelopmentSorter: React.FC<LabDevelopmentSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-laboratoriumi-fejlesztesek-sorter',
  topicTitle = 'Laboratóriumi modellek – Csoportosító játék'
}) => {
  const activeLevel = level || currentLevel || 1;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

