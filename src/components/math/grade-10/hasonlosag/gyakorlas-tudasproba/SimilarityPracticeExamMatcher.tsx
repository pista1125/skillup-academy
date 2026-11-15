import React from 'react';
import { MatcherTemplate, MatcherLevelData } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimilarityPracticeExamMatcherProps {
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

const PRACTICE_EXAM_MATCHER_LEVELS: MatcherLevelData[] = [
  {
    level: 1,
    title: '1. szint: Fejezeti alapfogalmak és arányok',
    description: 'Párosítsd a hasonlóság alaptételeit és definícióit a megfelelő leírásukkal!',
    pairs: [
      {
        id: 'pem1',
        left: 'Hasonlósági arány (λ)',
        right: 'A megfelelő szakaszok és oldalhosszak hányadosa: a\' / a = λ'
      },
      {
        id: 'pem2',
        left: 'Kerületek aránya hasonló síkidomokban',
        right: 'Megegyezik a hasonlóság arányával: K\' / K = λ'
      },
      {
        id: 'pem3',
        left: 'Területek aránya hasonló síkidomokban',
        right: 'A hasonlóság arányának négyzete: T\' / T = λ²'
      },
      {
        id: 'pem4',
        left: 'Középpontos hasonlóság fixpontja',
        right: 'A hasonlóság középpontja (O), amely önmagába képeződik le'
      },
      {
        id: 'pem5',
        left: 'Párhuzamos szelők tétele',
        right: 'A szög szárait metsző párhuzamosok az egyik száron ugyanolyan arányú szakaszokat vágnak le, mint a másikon'
      },
      {
        id: 'pem6',
        left: 'Háromszög középvonala',
        right: 'Két oldalfelező pontot összekötő szakasz, párhuzamos a harmadik oldallal és feleakkora'
      },
      {
        id: 'pem7',
        left: 'Háromszög súlypontja (S)',
        right: 'A súlyvonalak metszéspontja, amely a csúcstól számítva 2 : 1 arányban osztja a súlyvonalakat'
      },
      {
        id: 'pem8',
        left: 'Magasságtétel derékszögű háromszögben',
        right: 'm = √(p · q), az átfogóhoz tartozó magasság az átfogószeletek mértani közepe'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Geometriai számítások és gyakorlati feladatok',
    description: 'Párosítsd a geometriai problémákat a pontos numerikus vagy algebrai eredménnyel!',
    pairs: [
      {
        id: 'pem9',
        left: 'Tükörmódszeres lámpamagasság (184 cm szem, 1,6 m és 5,6 m)',
        right: 'M = 184 · (5,6 / 1,6) = 184 · 3,5 = 644 cm = 6,44 m'
      },
      {
        id: 'pem10',
        left: 'Háromszög oldalai 14, 28, 35 cm; hasonló kerülete K\' = 7,7 cm',
        right: 'λ = 7,7 / 77 = 0,1 ➔ oldalak: 1,4 cm; 2,8 cm; 3,5 cm'
      },
      {
        id: 'pem11',
        left: '12 cm-es gúla felső harmadánál síkmetszet (m₁ = 4 cm)',
        right: 'λ = 4/12 = 1/3, a kis gúla alapéle 4 cm, területe 1/9-e a nagynak'
      },
      {
        id: 'pem12',
        left: 'Csonkagúla kiegészítése (A₁ = 400, A₂ = 64, m_csonka = 21 cm)',
        right: 'λ = √(400/64) = 20/8 = 2,5 ➔ kiegészítő gúla magassága x = 14 cm'
      },
      {
        id: 'pem13',
        left: 'Varignon-tétel bármely négyszögre',
        right: 'Az oldalfelező pontok paralelogrammát alkotnak, területe T_négyszög / 2'
      },
      {
        id: 'pem14',
        left: 'Befogótétel az a befogóra',
        right: 'a² = p · c, azaz a = √(p · c)'
      },
      {
        id: 'pem15',
        left: 'Trapéz átlómetszéspontja K, alapok 24 és 96',
        right: 'AK / KC = 96 / 24 = 4 : 1, az átlók az alapok arányában osztják egymást'
      },
      {
        id: 'pem16',
        left: 'Szabályos hatszög rövid átlója (a = 6 cm)',
        right: 'd = a · √3 = 6√3 ≈ 10,39 cm'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tételbizonyítások és emelt szintű összefüggések',
    description: 'Kösd össze az emelt szintű matematikai tételeket a precíz bizonyítási logikával!',
    pairs: [
      {
        id: 'pem17',
        left: 'AM-GM egyenlőtlenség geometriai bizonyítása',
        right: 'Thálész-félkörben a magasság m = √(pq) legfeljebb akkora, mint a sugár r = (p+q)/2'
      },
      {
        id: 'pem18',
        left: 'Pyraminx élhosszának 1,5-szerezése',
        right: 'A test egy lapjának területe és teljes felszíne is 1,5² = 2,25-szörösére nő'
      },
      {
        id: 'pem19',
        left: 'Trapéz átlómetszéspontján átmenő alapokkal párhuzamos szakasz',
        right: 'Hossza az alapok harmonikus közepe: EF = 2ac / (a + c)'
      },
      {
        id: 'pem20',
        left: 'Varignon-paralelogramma mikor lesz téglalap?',
        right: 'Akkor és csak akkor, ha az eredeti négyszög átlói merőlegesek egymásra'
      },
      {
        id: 'pem21',
        left: 'Varignon-paralelogramma mikor lesz rombusz?',
        right: 'Akkor és csak akkor, ha az eredeti négyszög átlói egyenlő hosszúak'
      },
      {
        id: 'pem22',
        left: 'Hasonló testek térfogatának aránya',
        right: 'A hasonlósági arány köbe: V\' / V = λ³'
      },
      {
        id: 'pem23',
        left: 'Háromszög 3 súlyvonala által alkotott 6 részháromszög',
        right: 'Mind a hat részháromszög területe pontosan egyenlő: T / 6'
      },
      {
        id: 'pem24',
        left: 'IV. hasonlósági alapeset (o-o-sz) kritikus feltétele',
        right: 'A szög a két oldal közül a NAGYOBBIKKAL szemben fekszik'
      }
    ]
  }
];

export const SimilarityPracticeExamMatcher: React.FC<SimilarityPracticeExamMatcherProps> = ({
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
  topicTitle = 'Hasonlóság – Fejezeti Összefoglaló Matcher',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd az elméleti tételeket, geometriai összefüggéseket és számítási eredményeket 3 szinten!"
      levels={PRACTICE_EXAM_MATCHER_LEVELS}
      badgeText="TUDÁSPRÓBA PÁROSÍTÓ"
      accentColor="violet"
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

