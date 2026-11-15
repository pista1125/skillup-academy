import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticalSimilarityMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const PRACTICAL_SIMILARITY_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Közvetett mérési módszerek és alapfogalmak',
    description: 'Párosítsd a közvetett távolság- és magasságmérési elveket a geometriai hátterükkel!',
    pairs: [
      {
        id: 'ps1',
        left: 'Árnyékmérés alapelve',
        right: 'A párhuzamos napsugarak miatt a magasságok aránya egyenlő az árnyékhosszak arányával'
      },
      {
        id: 'ps2',
        left: 'Síktükrös magasságmérés a talajon',
        right: 'A fényvisszaverődés törvénye miatt a beesési és visszaverődési szög egyenlő (α = α)'
      },
      {
        id: 'ps3',
        left: 'Thálész hajótávolság-mérési módszere',
        right: 'A tengerparti kitűzés során keletkező ΔABH és ΔCBD háromszögek hasonlósága'
      },
      {
        id: 'ps4',
        left: 'Szemmagasság szerepe a mérésben',
        right: 'A megfigyelő szemmagasságát utólag hozzá kell adni a háromszög kiszámított magasságához'
      },
      {
        id: 'ps5',
        left: 'Folyómeder mélységmérése (HF 3)',
        right: 'Egyenletes lejtés mellett a mélység egyenesen arányos a parttól mért távolsággal'
      },
      {
        id: 'ps6',
        left: 'A4-es papírlap oldalaránya',
        right: '29,7 cm / 21 cm ≈ √2 ≈ 1,414 (szabványos ívarány)'
      },
      {
        id: 'ps7',
        left: 'Egyenlő szélességű margó levonása téglalapból',
        right: 'Megváltoztatja az oldalarányt, így a belső téglalap NEM hasonló az eredetihez'
      },
      {
        id: 'ps8',
        left: 'Szabályos háromszög közlekedési tábla szegélye',
        right: 'A belső kisebb háromszög hasonló az eredetihez, hasonlósági centrumuk a súlypont'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Gyakorlati számításos feladatok',
    description: 'Párosítsd a konkrét mérési szituációkat a helyes levezetéssel és végeredménnyel!',
    pairs: [
      {
        id: 'ps9',
        left: 'Péter (1,6 m) és a fa árnyéka (4,5 m + 1,2 m)',
        right: 'A fa magassága: M = 1,6 · (5,7 / 1,2) = 1,6 · 4,75 = 7,6 méter'
      },
      {
        id: 'ps10',
        left: 'Gyöngyszálló (8 m távolság, 1,6 m szemmagasság, 70°)',
        right: 'M = 1,6 + 8 · tan(70°) ≈ 1,6 + 21,98 ≈ 23,6 méter'
      },
      {
        id: 'ps11',
        left: 'Tükör 20 m-re a toronytól, ember 2 m-re (1,7 m magas)',
        right: 'A torony magassága: M = 1,7 · (20 / 2) = 17 méter'
      },
      {
        id: 'ps12',
        left: 'Folyó mélysége (180 cm mély, majd 6 m-rel bentebb 720 cm)',
        right: 'Az 1. tábla 2 méterre, a 2. tábla 8 méterre van a parttól'
      },
      {
        id: 'ps13',
        left: 'A4-es lap 2,5 cm-es margóval (16 cm × 24,7 cm)',
        right: 'Belső arány: 24,7 / 16 = 1,544 ≠ 1,414 (nem hasonló!)'
      },
      {
        id: 'ps14',
        left: '1 : 3000 térképen 3,2 cm × 3,8 cm telek területe',
        right: 'Valóságban: 96 m × 114 m ≈ 10 944 m² ≈ 1,1 hektár'
      },
      {
        id: 'ps15',
        left: '1 : 3 000 000 térképen Magyarország (93 000 km²)',
        right: 'A térképen elfoglalt terület: kb. 103 cm² (kb. 1 dm²)'
      },
      {
        id: 'ps16',
        left: '4,5 km hosszú út 225 mm-es szakaszként a térképen',
        right: 'A térkép méretaránya: M = 1 : 20 000 (4500 m / 0,225 m)'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Biometria, logika és emelt szintű alkalmazások',
    description: 'Párosítsd a biológiai, logikai és emelt szintű hasonlósági tételeket!',
    pairs: [
      {
        id: 'ps17',
        left: 'Izomerő változása kicsinyítéskor',
        right: 'Az izomrostok felületével (keresztmetszetével), vagyis λ² -tel arányos'
      },
      {
        id: 'ps18',
        left: 'Testtömeg változása kicsinyítéskor',
        right: 'A test térfogatával, vagyis λ³ -nel arányos'
      },
      {
        id: 'ps19',
        left: 'Relatív teherbírás (erő / testtömeg) skálázódása',
        right: 'A mérettel fordítottan arányos: λ² / λ³ = 1 / λ'
      },
      {
        id: 'ps20',
        left: 'Ember hangyaméretre kicsinyítve (λ = 1/120)',
        right: 'Relatív ereje 120-szorosára nő: elbírná testtömege 120-szorosát'
      },
      {
        id: 'ps21',
        left: 'Állítás: „Ha 2 négyszög hasonló ⇒ szögeik egyenlők”',
        right: 'Mindig IGAZ (a hasonlóság szögtartó transzformáció)'
      },
      {
        id: 'ps22',
        left: 'Megfordítás: „Ha 2 négyszög szögei egyenlők ⇒ hasonlók”',
        right: 'HAMIS (ellenpélda: téglalapok, amelyek oldalaránya eltérő)'
      },
      {
        id: 'ps23',
        left: '900 m²-es telek területe 1 : 300 méretarányú tervrajzon',
        right: 'Rajzbeli terület: 900 m² / 300² = 9 000 000 cm² / 90 000 = 100 cm²'
      },
      {
        id: 'ps24',
        left: 'Folyó szélességének mérése partról, átkelés nélkül',
        right: 'A partvonalon kimért hasonló háromszögekkel (szög- vagy távolságarány)'
      }
    ]
  }
];

export const PracticalSimilarityMatcher: React.FC<PracticalSimilarityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Alkalmazzuk a hasonlóságot! – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="alkalmazzuk-a-hasonlosagot"
      title={topicTitle}
      subtitle="Gyakorold az árnyékmérést, a tükörmódszert, a Thálész-féle tengeri mérést és a biometrikus skálázódást!"
      levels={PRACTICAL_SIMILARITY_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      {...rest}
    />
  );
};

export default PracticalSimilarityMatcher;

