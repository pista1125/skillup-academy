import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TriangleSimilarityMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const TRIANGLE_SIMILARITY_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: A 4 hasonlósági alapeset',
    description: 'Párosítsd a háromszögek hasonlósági alapeseteit a pontos geometriai feltételekkel!',
    pairs: [
      {
        id: 'ts1',
        left: 'I. alapeset (sz-sz)',
        right: 'Két-két szög egyenlő nagyságú (a harmadik szög 180° - (α+β) miatt automatikusan egyezik)'
      },
      {
        id: 'ts2',
        left: 'II. alapeset (o-sz-o)',
        right: 'Két-két oldal hosszának aránya megegyezik és az általuk közbezárt szög egyenlő nagyságú'
      },
      {
        id: 'ts3',
        left: 'III. alapeset (o-o-o)',
        right: 'A három oldal hosszának aránya páronként egyenlő (a₁/a₂ = b₁/b₂ = c₁/c₂ = λ)'
      },
      {
        id: 'ts4',
        left: 'IV. alapeset (o-o-sz)',
        right: 'Két-két oldal aránya megegyezik és a nagyobbikkal szemben fekvő szög nagysága egyenlő'
      },
      {
        id: 'ts5',
        left: 'Nem elégséges feltétel',
        right: 'Két oldal aránya és a kisebbikkel szemközti szög egyenlősége (nem garantál egyértelmű alakot)'
      },
      {
        id: 'ts6',
        left: 'Belső szögek összege',
        right: 'Bármely síkbeli háromszögben pontosan 180°, emiatt két egyező szög már elégséges'
      },
      {
        id: 'ts7',
        left: 'Derékszögű háromszögek hasonlósága',
        right: 'Elegendő egyetlen hegyesszögük egyenlősége, mert a derékszög (90°) adott (I. alapeset)'
      },
      {
        id: 'ts8',
        left: 'Szabályos (egyenlő oldalú) háromszögek',
        right: 'Bármely két szabályos háromszög hasonló, mert minden szögük 60° (I. és III. alapeset)'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Terepi mérések és gyakorlati példák',
    description: 'Párosítsd a gyakorlati feladatokat a megfelelő számítási lépéssel és eredménnyel!',
    pairs: [
      {
        id: 'ts9',
        left: 'Három matróz átlagos α szöge',
        right: '(72° + 73° + 77°) / 3 = 74°'
      },
      {
        id: 'ts10',
        left: 'Három matróz átlagos β szöge',
        right: '(53° + 51° + 52°) / 3 = 52°'
      },
      {
        id: 'ts11',
        left: 'Matrózok bázisszakasz kicsinyítése (100 m -> 10 cm)',
        right: 'A rajz méretaránya 1 : 1000 (1 cm a rajzon = 10 m a valóságban)'
      },
      {
        id: 'ts12',
        left: 'Hajó parttól való valós távolsága',
        right: 'A 9,2 cm-es rajzbeli merőleges szakasz a valóságban kb. 92 méternek felel meg'
      },
      {
        id: 'ts13',
        left: 'Matrózok adatai közötti eltérés',
        right: 'A szögmérési hibák miatt kb. 9,1 méteres eltérés adódik a számításokban'
      },
      {
        id: 'ts14',
        left: 'Felhőkarcoló modell méretaránya (280 m / 1,4 m)',
        right: 'λ = 280 / 1,4 = 200 (a valódi épület minden mérete 200-szorosa a modellének)'
      },
      {
        id: 'ts15',
        left: 'Valódi felhőkarcoló kilengése (1 cm modellnél)',
        right: 'ΔX = 1 cm · 200 = 200 cm = 2 méter valódi kilengés a csúcsnál'
      },
      {
        id: 'ts16',
        left: 'ABCD téglalap negyedelőpontja (CD = 8 cm)',
        right: 'CP = 2 cm (C-hez közelebbi negyedelőpont) és PD = 6 cm'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Homokóra, téglalap és derékszögű trapéz feladatok',
    description: 'Párosítsd az emelt szintű érettségi geometriai konfigurációkat a pontos értékekkel!',
    pairs: [
      {
        id: 'ts17',
        left: 'Homokóra alakzat metsző egyenesekkel',
        right: 'A csúcsszögek és a párhuzamosok váltószögei egyenlők, így a háromszögek hasonlók (sz-sz)'
      },
      {
        id: 'ts18',
        left: 'ΔABQ ~ ΔCPQ hasonlósági aránya',
        right: 'λ = AB / CP = 8 cm / 2 cm = 4 (a szakaszok 4 : 1 arányban osztódnak a Q pontban)'
      },
      {
        id: 'ts19',
        left: 'QC távolság az AC átlón',
        right: 'Az átló 1/(4+1) = 1/5 része, megközelítőleg 3,33 cm'
      },
      {
        id: 'ts20',
        left: 'HF 1. trapéz: BC szakasz hossza (AB=9, AC=15)',
        right: 'Pitagorasz-tétel a derékszögű ΔABC-ben: BC = √(15² - 9²) = √144 = 12 cm'
      },
      {
        id: 'ts21',
        left: 'HF 1. trapéz hasonlósági aránya (ΔABC ~ ΔCAD)',
        right: 'λ = AC / AB = 15 / 9 = 5/3 (1,667)'
      },
      {
        id: 'ts22',
        left: 'HF 1. trapéz CD hosszabb alapja',
        right: 'CD = AC · λ = 15 · (5/3) = 25 cm'
      },
      {
        id: 'ts23',
        left: 'HF 1. trapéz kerülete (9 + 12 + 25 + 20)',
        right: 'K = 9 + 12 + 25 + 20 = 66 cm'
      },
      {
        id: 'ts24',
        left: 'HF 1. trapéz területe ((9 + 25) / 2 · 12)',
        right: 'T = (a + c)/2 · m = (9 + 25)/2 · 12 = 17 · 12 = 204 cm²'
      }
    ]
  }
];

export const TriangleSimilarityMatcher: React.FC<TriangleSimilarityMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = '8. Háromszögek hasonlósága – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="haromszogek-hasonlosaga"
      title={topicTitle}
      subtitle="Gyakorold a 4 hasonlósági alapesetet, a matrózok és a felhőkarcoló arányszámításait, valamint az érettségi geometriai konfigurációkat!"
      levels={TRIANGLE_SIMILARITY_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default TriangleSimilarityMatcher;

