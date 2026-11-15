import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AltitudeLegTheoremsMatcher } from './AltitudeLegTheoremsMatcher';
import { AltitudeLegTheoremsSorter } from './AltitudeLegTheoremsSorter';

const ALTITUDE_LEG_THEOREMS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapfogalmak és tételek (1-10)
  {
    id: 'alt-q1',
    level: 1,
    question: 'Mit mond ki a derékszögű háromszögek magasságtétele?',
    options: [
      'Az átfogóhoz tartozó magasság négyzete egyenlő az átfogó két szeletének szorzatával: m = √(p · q)',
      'A magasság hossza a két befogó számtani közepe',
      'A magasság mindig felezi az átfogót',
      'A magasság négyzete a két befogó négyzetének összege'
    ],
    correctAnswer: 0,
    explanation: 'A magasságtétel szerint a derékszögű háromszögben az átfogóhoz tartozó magasság az átfogó két szeletének mértani közepe: m = √(p · q).'
  },
  {
    id: 'alt-q2',
    level: 1,
    question: 'Mit mond ki a derékszögű háromszögek befogótétele?',
    options: [
      'Bármelyik befogó hossza az átfogó és a befogó átfogóra eső merőleges vetületének mértani közepe: a = √(p · c)',
      'A befogó hossza a magasság és az átfogó számtani közepe',
      'A befogó mindig fele akkora, mint az átfogó',
      'A két befogó szorzata egyenlő az átfogóval'
    ],
    correctAnswer: 0,
    explanation: 'A befogótétel kimondja, hogy a² = p · c és b² = q · c, azaz a befogó az átfogó és a hozzá tartozó szelet mértani közepe.'
  },
  {
    id: 'alt-q3',
    level: 1,
    question: 'Mit jelent a p és q jelölés a derékszögű háromszög metrikus tételeiben?',
    options: [
      'Az átfogó magasság talppontja által levágott két szelete (a befogók merőleges vetületei az átfogón)',
      'A háromszög két hegyesszöge radiánban',
      'A két befogóhoz tartozó magasság',
      'A beírt és körülírt körök sugara'
    ],
    correctAnswer: 0,
    explanation: 'p és q az átfogó két darabja, amelyeket az átfogóhoz tartozó magasság talppontja határoz meg (p + q = c).'
  },
  {
    id: 'alt-q4',
    level: 1,
    question: 'Mivel egyenlő az átfogó hossza a két szelet segítségével?',
    options: [
      'c = p + q',
      'c = p · q',
      'c = √(p² + q²)',
      'c = (p + q) / 2'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a magasság talppontja az átfogót két egymáshoz csatlakozó szakaszra bontja, hosszuk összege adja a teljes átfogót: c = p + q.'
  },
  {
    id: 'alt-q5',
    level: 1,
    question: 'Hány darab egymáshoz hasonló derékszögű háromszög keletkezik az átfogóhoz tartozó magasság behúzásával?',
    options: [
      '3 darab: az eredeti nagy háromszög és a két levágott kisebb háromszög',
      '2 darab',
      '4 darab',
      'Egyik sem hasonló a másikhoz'
    ],
    correctAnswer: 0,
    explanation: 'A magasság behúzásával 3 derékszögű háromszög keletkezik (ΔABC, ΔC₁BC, ΔAC₁C), és mindhárom hasonló egymáshoz.'
  },
  {
    id: 'alt-q6',
    level: 1,
    question: 'Melyik hasonlósági alapeset bizonyítja a három derékszögű háromszög hasonlóságát?',
    options: [
      'Az I. alapeset (sz-sz), mivel mindháromban van egy 90°-os szög és hegyesszögeik páronként megegyeznek (α és β)',
      'A III. alapeset (o-o-o)',
      'A IV. alapeset (o-o-sz)',
      'Csak a Pitagorasz-tétellel igazolható'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a háromszögek derékszögűek és az egyik hegyesszögük közös az eredetivel, az I. alapeset (sz-sz) azonnal teljesül.'
  },
  {
    id: 'alt-q7',
    level: 1,
    question: 'Hogyan vezethető le a Pitagorasz-tétel a két befogótételből?',
    options: [
      'a² + b² = p · c + q · c = (p + q) · c = c · c = c²',
      'a² - b² = c²',
      'a · b = m · c',
      'a + b = c'
    ],
    correctAnswer: 0,
    explanation: 'A két befogótételt összeadva: a² + b² = pc + qc = c(p + q). Mivel p + q = c, azonnal adódik a² + b² = c².'
  },
  {
    id: 'alt-q8',
    level: 1,
    question: 'Mit jelent két pozitív szám (x és y) mértani közepe?',
    options: [
      'A két szám szorzatának négyzetgyöke: √(x · y)',
      'A két szám összegének fele: (x + y) / 2',
      'A két szám hányadosa: x / y',
      'A két szám négyzetének összege: x² + y²'
    ],
    correctAnswer: 0,
    explanation: 'Két nemnegatív szám mértani közepe definíció szerint szorzatuk négyzetgyöke: √(x · y).'
  },
  {
    id: 'alt-q9',
    level: 1,
    question: 'Egy derékszögű háromszögben p = 4 cm és q = 9 cm. Mekkora az átfogóhoz tartozó magasság?',
    options: [
      '6 cm (mivel m = √(4 · 9) = √36 = 6 cm)',
      '6,5 cm',
      '13 cm',
      '36 cm'
    ],
    correctAnswer: 0,
    explanation: 'A magasságtétel szerint: m = √(p · q) = √(4 · 9) = √36 = 6 cm.'
  },
  {
    id: 'alt-q10',
    level: 1,
    question: 'Az előző háromszögben (p = 4 cm, q = 9 cm, c = 13 cm) mekkora a p szelethez tartozó a befogó?',
    options: [
      '√52 ≈ 7,21 cm (mivel a = √(p · c) = √(4 · 13) = √52)',
      '2√13 cm',
      '52 cm',
      '13 cm'
    ],
    correctAnswer: 0,
    explanation: 'A befogótétel szerint: a = √(p · c) = √(4 · 13) = √52 = 2√13 ≈ 7,21 cm.'
  },

  // LEVEL 2: Gyakorlati számítások (11-20)
  {
    id: 'alt-q11',
    level: 2,
    question: 'Egy szikla magasságát derékszögű háromszöggel mérték meg, az átfogószeletek: p = 42 m és q = 15 m. Mekkora a szikla magassága?',
    options: [
      'Körülbelül 25,1 méter (m = √(42 · 15) = √630 ≈ 25,1 m)',
      '28,5 méter',
      '30 méter',
      '21,4 méter'
    ],
    correctAnswer: 0,
    explanation: 'A magasságtétel szerint: m² = p · q = 42 · 15 = 630  ⇒  m = √630 ≈ 25,1 m.'
  },
  {
    id: 'alt-q12',
    level: 2,
    question: 'Egy derékszögű háromszög átfogóját a magasság 2 cm és 3 cm szeletekre osztja. Mekkora a magasság?',
    options: [
      '√6 ≈ 2,45 cm (m = √(2 · 3) = √6)',
      '2,5 cm',
      '5 cm',
      '6 cm'
    ],
    correctAnswer: 0,
    explanation: 'm = √(p · q) = √(2 · 3) = √6 ≈ 2,45 cm.'
  },
  {
    id: 'alt-q13',
    level: 2,
    question: 'Mekkora a hosszabbik befogó hossza, ha p = 3 cm, q = 2 cm és az átfogó c = 5 cm?',
    options: [
      '√15 ≈ 3,87 cm (a = √(3 · 5) = √15)',
      '√10 ≈ 3,16 cm',
      '4 cm',
      '15 cm'
    ],
    correctAnswer: 0,
    explanation: 'A hosszabbik szelethez tartozó befogó: a = √(p · c) = √(3 · 5) = √15 ≈ 3,87 cm.'
  },
  {
    id: 'alt-q14',
    level: 2,
    question: 'Mekkora az előző háromszög területe (c = 5 cm, m = √6 cm)?',
    options: [
      'Kb. 6,12 cm² (T = (c · m) / 2 = (5 · √6) / 2 ≈ 6,12 cm²)',
      '12,25 cm²',
      '5 cm²',
      '7,5 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A terület az alap és a hozzá tartozó magasság szorzatának fele: T = (5 · √6) / 2 ≈ 6,12 cm².'
  },
  {
    id: 'alt-q15',
    level: 2,
    question: 'Egy derékszögű háromszög egyik befogója a = 30 cm, átfogója c = 45 cm. Mekkora ezen befogó merőleges vetülete (p)?',
    options: [
      '20 cm (p = a² / c = 30² / 45 = 900 / 45 = 20 cm)',
      '15 cm',
      '25 cm',
      '30 cm'
    ],
    correctAnswer: 0,
    explanation: 'A befogótétel átrendezésével: a² = p · c  ⇒  p = a² / c = 900 / 45 = 20 cm.'
  },
  {
    id: 'alt-q16',
    level: 2,
    question: 'Mekkora a másik átfogószelet (q) a fenti háromszögben (c = 45 cm, p = 20 cm)?',
    options: [
      '25 cm (q = c - p = 45 - 20 = 25 cm)',
      '20 cm',
      '15 cm',
      '35 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az átfogó a két szelet összege: q = c - p = 45 - 20 = 25 cm.'
  },
  {
    id: 'alt-q17',
    level: 2,
    question: 'Mekkora az átfogóhoz tartozó magasság, ha p = 20 cm és q = 25 cm?',
    options: [
      '10√5 ≈ 22,36 cm (m = √(20 · 25) = √500 = 10√5)',
      '20 cm',
      '25 cm',
      '500 cm'
    ],
    correctAnswer: 0,
    explanation: 'm = √(p · q) = √(20 · 25) = √500 = 10√5 ≈ 22,36 cm.'
  },
  {
    id: 'alt-q18',
    level: 2,
    question: 'Egy derékszögű háromszög befogói 8 cm és 15 cm. Mekkora az átfogója?',
    options: [
      '17 cm (c = √(8² + 15²) = √(64 + 225) = √289 = 17 cm)',
      '19 cm',
      '23 cm',
      '16 cm'
    ],
    correctAnswer: 0,
    explanation: 'Pitagorasz-tétellel: c = √(64 + 225) = √289 = 17 cm.'
  },
  {
    id: 'alt-q19',
    level: 2,
    question: 'Mekkora szeletekre osztja a magasság az átfogót a fenti háromszögben (a = 8 cm, b = 15 cm, c = 17 cm)?',
    options: [
      'p = 64/17 ≈ 3,76 cm és q = 225/17 ≈ 13,24 cm',
      'p = 8 cm és q = 9 cm',
      'p = 4 cm és q = 13 cm',
      'p = 5 cm és q = 12 cm'
    ],
    correctAnswer: 0,
    explanation: 'p = a² / c = 64 / 17 ≈ 3,76 cm, és q = b² / c = 225 / 17 ≈ 13,24 cm (összegük: 64/17 + 225/17 = 289/17 = 17 cm).'
  },
  {
    id: 'alt-q20',
    level: 2,
    question: 'Mekkora a magasság a fenti háromszögben (a = 8 cm, b = 15 cm, c = 17 cm)?',
    options: [
      '120/17 ≈ 7,06 cm (m = (a · b) / c = (8 · 15) / 17 = 120 / 17)',
      '8 cm',
      '7,5 cm',
      '6,8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A terület kétféle felírásából: T = (a · b) / 2 = (c · m) / 2  ⇒  m = (a · b) / c = 120 / 17 ≈ 7,06 cm.'
  },

  // LEVEL 3: Mélyebb összefüggések, AM-GM és házi feladatok (21-30)
  {
    id: 'alt-q21',
    level: 3,
    question: 'Mit mond ki a számtani és mértani közép közötti egyenlőtlenség (AM-GM)?',
    options: [
      'Két nemnegatív valós szám mértani közepe legfeljebb akkora, mint a számtani közepe: √(p · q) ≤ (p + q) / 2',
      'A mértani közép mindig szigorúan nagyobb a számtani középnél',
      'A számtani és mértani közép összege mindig 1',
      'A mértani közép csak egész számokra értelmezhető'
    ],
    correctAnswer: 0,
    explanation: 'Bármely p, q ≥ 0 valós számra: √(pq) ≤ (p + q)/2.'
  },
  {
    id: 'alt-q22',
    level: 3,
    question: 'Hogyan bizonyítható ez az egyenlőtlenség Thálész-félkörrel geometriai úton?',
    options: [
      'A félkör sugara (p+q)/2, a talppontból húzott merőleges magasság √(pq), és a körben a magasság sosem nagyobb a sugárnál (m ≤ r)',
      'A kör kerületének képletével',
      'Csak integrálszámítással igazolható',
      'A húrnégyszögek tételével'
    ],
    correctAnswer: 0,
    explanation: 'Az átfogó a Thálész-kör átmérője (p+q), sugara r = (p+q)/2. A magasság m = √(pq). Mivel a körben minden merőleges szakasz legfeljebb a sugár (m ≤ r), így √(pq) ≤ (p+q)/2!'
  },
  {
    id: 'alt-q23',
    level: 3,
    question: 'Mikor áll fenn pontos egyenlőség a számtani és mértani közép között (√(pq) = (p+q)/2)?',
    options: [
      'Akkor és csak akkor, ha p = q (vagyis ha a derékszögű háromszög egyenlő szárú)',
      'Ha p = 0 vagy q = 0',
      'Soha nem állhat fenn egyenlőség',
      'Ha a háromszög tompaszögű'
    ],
    correctAnswer: 0,
    explanation: 'Egyenlőség kizárólag akkor teljesül, ha a magasság pontosan a kör középpontjában áll, vagyis p = q.'
  },
  {
    id: 'alt-q24',
    level: 3,
    question: 'Egy 12 cm oldalú szabályos háromszög AB oldalának F felezőpontjából merőlegest állítunk az AC oldalra. Milyen szakaszokra osztja a talppont az AC oldalt?',
    options: [
      '3 cm és 9 cm hosszú részekre (1 : 3 arányban)',
      '6 cm és 6 cm (felezi az oldalt)',
      '4 cm és 8 cm',
      '2 cm és 10 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az AF = 6 cm. A derékszögű ΔAF₁F-ben az A-nál lévő szög 60°, így AF₁ = 6 · cos(60°) = 3 cm. A maradék F₁C = 12 - 3 = 9 cm.'
  },
  {
    id: 'alt-q25',
    level: 3,
    question: 'Egy derékszögű háromszög átfogója c = 16 cm, egyik befogója a = 15 cm. Mekkora az a befogó merőleges vetülete az átfogón?',
    options: [
      '14,0625 cm (p = 15² / 16 = 225 / 16 = 14,0625 cm)',
      '15 cm',
      '13,5 cm',
      '12 cm'
    ],
    correctAnswer: 0,
    explanation: 'A befogótételből: p = a² / c = 225 / 16 = 14,0625 cm. (A másik szelet: q = 16 - 14,0625 = 1,9375 cm).'
  },
  {
    id: 'alt-q26',
    level: 3,
    question: 'Mekkora az átfogóhoz tartozó magasság az előző derékszögű háromszögben (p = 14,0625 cm, q = 1,9375 cm)?',
    options: [
      'Kb. 5,22 cm (m = √(14,0625 · 1,9375) ≈ 5,22 cm)',
      '6,12 cm',
      '4,5 cm',
      '7,1 cm'
    ],
    correctAnswer: 0,
    explanation: 'A magasságtétel szerint: m = √(14,0625 · 1,9375) = √27,246 ≈ 5,22 cm.'
  },
  {
    id: 'alt-q27',
    level: 3,
    question: 'Mekkora az előző háromszög területe (c = 16 cm, m ≈ 5,22 cm)?',
    options: [
      'Kb. 41,76 cm² (T = (16 · 5,22) / 2 ≈ 41,76 cm²)',
      '83,5 cm²',
      '30 cm²',
      '50 cm²'
    ],
    correctAnswer: 0,
    explanation: 'A terület: T = (c · m) / 2 = (16 · 5,22) / 2 ≈ 41,76 cm².'
  },
  {
    id: 'alt-q28',
    level: 3,
    question: 'Egy derékszögű háromszög átfogóját a magasság p = 5,4 cm és q = 9,6 cm szeletekre osztja. Mekkora a magasság?',
    options: [
      '7,2 cm (m = √(5,4 · 9,6) = √51,84 = 7,2 cm)',
      '7,5 cm',
      '8 cm',
      '6,8 cm'
    ],
    correctAnswer: 0,
    explanation: 'm = √(5,4 · 9,6) = √51,84 = 7,2 cm.'
  },
  {
    id: 'alt-q29',
    level: 3,
    question: 'Mekkorák az előző háromszög befogói, ha p = 5,4 cm, q = 9,6 cm és c = 15 cm?',
    options: [
      'a = 9 cm és b = 12 cm (a = √(5,4 · 15) = √81 = 9 cm, b = √(9,6 · 15) = √144 = 12 cm)',
      'a = 8 cm és b = 10 cm',
      'a = 10 cm és b = 11 cm',
      'a = 6 cm és b = 8 cm'
    ],
    correctAnswer: 0,
    explanation: 'A befogótétel szerint: a = √(5,4 · 15) = √81 = 9 cm, és b = √(9,6 · 15) = √144 = 12 cm.'
  },
  {
    id: 'alt-q30',
    level: 3,
    question: 'Mekkora az előző háromszög körülírt körének sugara (c = 15 cm)?',
    options: [
      '7,5 cm (R = c / 2 = 15 / 2 = 7,5 cm a Thálész-tétel miatt)',
      '15 cm',
      '5 cm',
      '7,2 cm'
    ],
    correctAnswer: 0,
    explanation: 'Derékszögű háromszögben a körülírt kör átmérője az átfogó, így a sugara R = c / 2 = 15 / 2 = 7,5 cm.'
  }
];

export const AltitudeLegTheoremsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-hasonlosag"
      subtopicId="magassagtetel-befogotetel"
      title="10. Magasságtétel, befogótétel – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: tételek és képletek, numerikus számítások, Pitagorasz-levezetés és a számtani-mértani közép egyenlőtlensége."
      questions={ALTITUDE_LEG_THEOREMS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Magasságtétel és Befogótétel Képletei',
          content:
            '• Magasságtétel: m² = p · q  ⇒  m = √(p · q) (mértani közép).\n• Befogótétel: a² = p · c  ⇒  a = √(p · c), valamint b² = q · c  ⇒  b = √(q · c).\n• Átfogó: c = p + q.\n• Pitagorasz levezetése: a² + b² = pc + qc = c(p + q) = c².\n• Terület: T = (c · m) / 2 = (a · b) / 2  ⇒  m = (a · b) / c.'
        },
        {
          title: 'Gyakorlati Mintaszámítások',
          content:
            '• Szikla magassága: p = 42 m, q = 15 m ⇒ m = √(42 · 15) = √630 ≈ 25,1 m.\n• p = 3, q = 2 ⇒ c = 5, m = √6 ≈ 2,45 cm, a = √15 ≈ 3,87 cm, T ≈ 6,12 cm².\n• a = 30, c = 45 ⇒ p = 900 / 45 = 20 cm, q = 25 cm, m = √500 = 10√5 ≈ 22,36 cm.\n• a = 8, b = 15 ⇒ c = 17 cm, p = 64/17 ≈ 3,76 cm, q = 225/17 ≈ 13,24 cm, m = 120/17 ≈ 7,06 cm.\n• p = 5,4, q = 9,6 ⇒ c = 15 cm, m = 7,2 cm, a = 9 cm, b = 12 cm, R = 7,5 cm.'
        },
        {
          title: 'Számtani és Mértani Közép Geometriai Bizonyítása',
          content:
            '• Thálész-félkör c = p + q átmérővel.\n• Sugár (számtani közép): r = (p + q) / 2.\n• Magasság (mértani közép): m = √(p · q).\n• Geometriai tétel: m ≤ r  ⇒  √(p · q) ≤ (p + q) / 2.\n• Egyenlőség akkor és csak akkor áll fenn, ha p = q (egyenlő szárú derékszögű háromszög).'
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AltitudeLegTheoremsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AltitudeLegTheoremsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};
export default AltitudeLegTheoremsQuiz;

