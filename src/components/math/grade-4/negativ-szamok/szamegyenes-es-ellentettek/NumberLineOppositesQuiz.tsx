import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumberLineOppositesMatcher } from './NumberLineOppositesMatcher';
import { NumberLineOppositesSorter } from './NumberLineOppositesSorter';
import { NumberLineGroup, NLPoint, NLJump, DiversSvg } from './NumberLineOppositesFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const FONT = 'system-ui, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Számegyenes a kérdésekhez. */
const QLine: React.FC<{
  min: number;
  max: number;
  tick?: number;
  labels?: number[];
  points?: NLPoint[];
  jumps?: NLJump[];
  note?: string;
}> = ({ min, max, tick = 1, labels, points, jumps, note }) => (
  <QFig h={note ? 100 : 80} w={280}>
    <NumberLineGroup x0={18} x1={250} y={48} min={min} max={max} tick={tick} labels={labels} points={points} jumps={jumps} fontSize={8} />
    {note && (
      <text x="140" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{note}</text>
    )}
  </QFig>
);

const Q = (v: number): NLPoint => ({ v, label: '?', color: C_UNK });
const G = (v: number, label?: string): NLPoint => ({ v, label, color: '#16a34a' });

const QDivers: React.FC<{ ask?: string }> = ({ ask }) => <DiversSvg className="w-full max-w-[300px] h-auto mx-auto" ask={ask ?? null} />;

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBER_LINE_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'nl-q1',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine min={-6} max={6} labels={[-6, 0, 6]} points={[Q(-4)]} />,
    question: 'Melyik számot jelöli a „?” a számegyenesen?',
    options: ['−4', '4', '−3', '−5'],
    correctAnswer: 0,
    explanation: 'A pont a 0-tól balra van, 4 lépésre. A 0-tól balra a negatív számok vannak: −4.'
  },
  {
    id: 'nl-q2',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    question: 'Hol vannak a negatív számok a számegyenesen?',
    options: ['a 0-tól balra', 'a 0-tól jobbra', 'pontosan a 0-n', 'a 10 után'],
    correctAnswer: 0,
    explanation: 'A számegyenesen a 0-tól balra a negatív, a 0-tól jobbra a pozitív számok vannak.'
  },
  {
    id: 'nl-q3',
    level: 1,
    questionTypeBadge: 'Ellentett',
    question: 'Melyik szám a 7 ellentettje?',
    options: ['−7', '7', '0', '−6'],
    correctAnswer: 0,
    explanation: 'Az ellentett ugyanolyan messze van a 0-tól, de a másik oldalon. A 7 jobbra van 7 lépésre, a −7 balra 7 lépésre.'
  },
  {
    id: 'nl-q4',
    level: 1,
    questionTypeBadge: 'Ellentett',
    question: 'Melyik szám a −3 ellentettje?',
    options: ['3', '−3', '0', '−4'],
    correctAnswer: 0,
    explanation: 'A −3 a 0-tól balra van 3 lépésre. Az ellentettje jobbra 3 lépésre: a 3.'
  },
  {
    id: 'nl-q5',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <QLine min={-8} max={8} labels={[-8, 0, 8]} points={[Q(6)]} />,
    question: 'Melyik számot jelöli a „?” a számegyenesen?',
    options: ['6', '−6', '5', '7'],
    correctAnswer: 0,
    explanation: 'A pont a 0-tól jobbra van, 6 lépésre. Ez pozitív szám: 6.'
  },
  {
    id: 'nl-q6',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám van a 0-tól balra 2 lépésre?',
    options: ['−2', '2', '−1', '1'],
    correctAnswer: 0,
    explanation: 'Balra a negatív számok vannak: 0 → −1 → −2. A szám a −2.'
  },
  {
    id: 'nl-q7',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik szám a −10-nél eggyel nagyobb?',
    options: ['−9', '−11', '9', '11'],
    correctAnswer: 0,
    explanation: 'Eggyel nagyobb = egyet lépünk jobbra. A −10-től jobbra a −9 áll.'
  },
  {
    id: 'nl-q8',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik szám a −10-nél eggyel kisebb?',
    options: ['−11', '−9', '11', '−1'],
    correctAnswer: 0,
    explanation: 'Eggyel kisebb = egyet lépünk balra. A −10-től balra a −11 áll.'
  },
  {
    id: 'nl-q9',
    level: 1,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik szám a 0-nál 5-tel kisebb?',
    options: ['−5', '5', '−4', '−6'],
    correctAnswer: 0,
    explanation: 'A 0-tól 5-öt lépünk balra: −1, −2, −3, −4, −5.'
  },
  {
    id: 'nl-q10',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <QLine min={-6} max={2} points={[G(-3, '−3')]} />,
    question: 'Melyik szám a −3 kisebb számszomszédja?',
    options: ['−4', '−2', '4', '2'],
    correctAnswer: 0,
    explanation: 'A kisebb szomszéd balra van. A −3-tól balra a −4 áll. A −2 a nagyobb szomszéd.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'nl-q11',
    level: 2,
    questionTypeBadge: 'Szöcske',
    figure: <QLine min={-6} max={10} labels={[-6, -4, -2, 0, 2, 4, 6, 8, 10]} points={[G(3, '🦗')]} note="jobbra 4 ugrás → ?" />,
    question: 'A szöcske a 3-on áll. Hová érkezik, ha jobbra ugrik 4-et?',
    options: ['7', '−1', '4', '8'],
    correctAnswer: 0,
    explanation: 'Jobbra a nagyobb számok felé lépünk: 3 → 4 → 5 → 6 → 7.'
  },
  {
    id: 'nl-q12',
    level: 2,
    questionTypeBadge: 'Szöcske',
    figure: <QLine min={-6} max={10} labels={[-6, -4, -2, 0, 2, 4, 6, 8, 10]} points={[G(3, '🦗')]} note="balra 7 ugrás → ?" />,
    question: 'A szöcske a 3-on áll. Hová érkezik, ha balra ugrik 7-et?',
    options: ['−4', '4', '−3', '10'],
    correctAnswer: 0,
    explanation: '3-tól a 0-ig 3 ugrás, onnan még 4 ugrás balra: −4.'
  },
  {
    id: 'nl-q13',
    level: 2,
    questionTypeBadge: 'Szöcske',
    figure: <QLine min={-6} max={10} labels={[-6, -4, -2, 0, 2, 4, 6, 8, 10]} points={[G(3, '🦗')]} note="jobbra 6, majd balra 10 → ?" />,
    question: 'A szöcske a 3-on áll. Először jobbra ugrik 6-ot, majd balra 10-et. Hová érkezik?',
    options: ['−1', '1', '−7', '9'],
    correctAnswer: 0,
    explanation: 'Jobbra 6: a 9-re ér. Onnan balra 10: 9 ugrással a 0-ra, még 1-gyel a −1-re.'
  },
  {
    id: 'nl-q14',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik szám a −4 nagyobb számszomszédja?',
    options: ['−3', '−5', '3', '5'],
    correctAnswer: 0,
    explanation: 'A nagyobb szomszéd jobbra van. A −4-től jobbra a −3 áll.'
  },
  {
    id: 'nl-q15',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <QLine min={-6} max={6} labels={[-6, 0, 6]} points={[G(2, '2')]} note="5-tel kisebb: ?" />,
    question: 'Melyik szám a 2-nél 5-tel kisebb?',
    options: ['−3', '3', '7', '−7'],
    correctAnswer: 0,
    explanation: 'A 2-től 5-öt lépünk balra: 1, 0, −1, −2, −3.'
  },
  {
    id: 'nl-q16',
    level: 2,
    questionTypeBadge: 'Mélység',
    figure: <QDivers ask="B" />,
    question: 'Olvasd le az oszlopdiagramról! Milyen mélyre merült a B búvár?',
    options: ['−8 m', '8 m', '−7 m', '−10 m'],
    correctAnswer: 0,
    explanation: 'A B oszlop alja a −5 és a −10 között van, a −10-hez közelebb: −8 m. A víz alatt negatív a mélység.'
  },
  {
    id: 'nl-q17',
    level: 2,
    questionTypeBadge: 'Mélység',
    figure: <QDivers />,
    question: 'Melyik búvár van a legközelebb a víz felszínéhez?',
    options: ['E', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'Az E búvár csak −7 m mélyen van, a legrövidebb oszlop az övé. A búvár −28 m-en van, ő a legmélyebben.'
  },
  {
    id: 'nl-q18',
    level: 2,
    questionTypeBadge: 'Távolság a 0-tól',
    question: 'Hány lépésre van a −6 a 0-tól a számegyenesen?',
    options: ['6 lépésre', '0 lépésre', '12 lépésre', '5 lépésre'],
    correctAnswer: 0,
    explanation: 'A −6-tól a 0-ig jobbra 6 lépés: −5, −4, −3, −2, −1, 0.'
  },
  {
    id: 'nl-q19',
    level: 2,
    questionTypeBadge: 'Ellentett',
    question: 'Melyik két szám ellentettje egymásnak?',
    options: ['−5 és 5', '5 és 6', '−5 és −6', '0 és 5'],
    correctAnswer: 0,
    explanation: 'Az ellentett számok ugyanolyan messze vannak a 0-tól, a két oldalán: −5 és 5.'
  },
  {
    id: 'nl-q20',
    level: 2,
    questionTypeBadge: 'Osztásköz',
    figure: <QLine min={-600} max={600} tick={100} labels={[0, 100]} points={[Q(-300)]} />,
    question: 'Ezen a számegyenesen egy osztás 100. Melyik számot jelöli a „?”?',
    options: ['−300', '−3', '300', '−30'],
    correctAnswer: 0,
    explanation: 'A pont a 0-tól balra 3 osztásra van. Egy osztás 100, így 3 · 100 = 300 balra: −300.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'nl-q21',
    level: 3,
    questionTypeBadge: 'Lépegetés',
    figure: <QLine min={-8} max={8} labels={[-8, -4, 0, 4, 8]} points={[G(0, 'start')]} note="jobbra 5, balra 6, jobbra 1, balra 4" />,
    question: 'A 0-tól indulsz. Lépj jobbra ötöt, balra hatot, jobbra egyet, majd balra négyet! Hová érkezel?',
    options: ['−4', '4', '−5', '−3'],
    correctAnswer: 0,
    explanation: '0 → 5 (jobbra 5) → −1 (balra 6) → 0 (jobbra 1) → −4 (balra 4).'
  },
  {
    id: 'nl-q22',
    level: 3,
    questionTypeBadge: 'Lépegetés',
    question: 'A −4-en állsz. Lépj balra négyet, még egyszer balra négyet, jobbra hetet, jobbra tízet, majd balra tizenhetet! Hová érkezel?',
    options: ['−12', '12', '−8', '5'],
    correctAnswer: 0,
    explanation: '−4 → −8 → −12 → −5 (jobbra 7) → 5 (jobbra 10) → −12 (balra 17).'
  },
  {
    id: 'nl-q23',
    level: 3,
    questionTypeBadge: 'Tízes szomszéd',
    question: 'Melyik a −15 kisebb tízes számszomszédja?',
    options: ['−20', '−10', '−16', '−14'],
    correctAnswer: 0,
    explanation: 'A −15 a −20 és a −10 között van. A kisebb (balra lévő) tízes szomszéd a −20. A −16 a kisebb egyes szomszéd.'
  },
  {
    id: 'nl-q24',
    level: 3,
    questionTypeBadge: 'Tízes szomszéd',
    figure: <QLine min={-42} max={-28} labels={[-40, -30]} points={[G(-37, '−37')]} />,
    question: 'Melyik a −37 nagyobb tízes számszomszédja?',
    options: ['−30', '−40', '−36', '−38'],
    correctAnswer: 0,
    explanation: 'A −37 a −40 és a −30 között van. A nagyobb (jobbra lévő) tízes szomszéd a −30.'
  },
  {
    id: 'nl-q25',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    question: 'Mi a −41 kisebb és nagyobb egyes számszomszédja (ebben a sorrendben)?',
    options: ['−42 és −40', '−40 és −42', '−42 és −41', '−50 és −40'],
    correctAnswer: 0,
    explanation: 'Balra a kisebb: −42. Jobbra a nagyobb: −40. A −50 és −40 a tízes szomszédok.'
  },
  {
    id: 'nl-q26',
    level: 3,
    questionTypeBadge: 'Mélység',
    figure: <QDivers ask="C" />,
    question: 'A C búvár −14 m mélyen van. Hány métert kell még süllyednie, hogy elérje az 56 méteres mélységet?',
    options: ['42 m-t', '70 m-t', '52 m-t', '32 m-t'],
    correctAnswer: 0,
    explanation: 'Már 14 m mélyen van, 56 m-ig még 56 − 14 = 42 m van hátra.'
  },
  {
    id: 'nl-q27',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: <QDivers ask="E" />,
    question: 'Az E búvár −7 m mélyen van. Hány dm-t kell még süllyednie az 56 méteres mélységig?',
    options: ['490 dm-t', '49 dm-t', '630 dm-t', '4900 dm-t'],
    correctAnswer: 0,
    explanation: '56 − 7 = 49 m van hátra. 1 m = 10 dm, így 49 m = 490 dm.'
  },
  {
    id: 'nl-q28',
    level: 3,
    questionTypeBadge: 'Ellentett',
    figure: <QLine min={-6} max={6} labels={[-6, 0, 6]} points={[G(-5, '−5'), G(5, '5')]} note="Hány lépés?" />,
    question: 'Hány lépés van a számegyenesen a −5 és az 5 között?',
    options: ['10', '0', '5', '11'],
    correctAnswer: 0,
    explanation: 'A −5-től a 0-ig 5 lépés, a 0-tól az 5-ig még 5 lépés: 5 + 5 = 10.'
  },
  {
    id: 'nl-q29',
    level: 3,
    questionTypeBadge: 'Osztásköz',
    figure: <QLine min={-6000} max={6000} tick={1000} labels={[0, 1000, 2000]} points={[Q(-4000)]} />,
    question: 'Ezen a számegyenesen egy osztás 1000. Melyik számot jelöli a „?”?',
    options: ['−4000', '−4', '4000', '−400'],
    correctAnswer: 0,
    explanation: 'A pont a 0-tól balra 4 osztásra van. 4 · 1000 = 4000, és balra van, tehát −4000.'
  },
  {
    id: 'nl-q30',
    level: 3,
    questionTypeBadge: 'Ellentett',
    figure: <QLine min={-8} max={8} labels={[-8, -4, 0, 4, 8]} points={[G(-6, '🦗')]} note="az ellentettjére ugrik: ? lépés" />,
    question: 'A szöcske a −6-on áll. Hányat kell jobbra ugrania, hogy a −6 ellentettjére érkezzen?',
    options: ['12-t', '6-ot', '0-t', '10-et'],
    correctAnswer: 0,
    explanation: 'A −6 ellentettje a 6. A −6-tól a 0-ig 6 ugrás, onnan a 6-ig még 6: 6 + 6 = 12.'
  }
];

export const NumberLineOppositesQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-neg-szamegyenes-quiz"
      subtopicId="szamegyenes-es-ellentettek"
      title="2. Számegyenes és ellentettek – Kvíz"
      subtitle="30 feladat 3 szinten: számok a számegyenesen, ellentett számok, lépegetés, számszomszédok, mélységek."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NUMBER_LINE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számegyenes',
          items: [
            'A 0-tól balra: negatív számok (−1, −2, −3 …).',
            'A 0-tól jobbra: pozitív számok (1, 2, 3 …).',
            'Jobbra lépve nagyobb, balra lépve kisebb.',
            'Nézd meg, mennyit ér egy osztás (1, 100, 1000)!'
          ]
        },
        {
          title: 'Ellentett számok',
          items: [
            'Ugyanolyan messze a 0-tól, a két oldalán.',
            '4 és −4, 7 és −7, −10 és 10.',
            'A 0 ellentettje a 0.',
            '−5 és 5 között 5 + 5 = 10 lépés van.'
          ]
        },
        {
          title: 'Számszomszédok',
          items: [
            'A kisebb szomszéd balra, a nagyobb jobbra van.',
            '−15: egyes szomszédok −16 és −14.',
            '−15: tízes szomszédok −20 és −10.',
            '2-nél 5-tel kisebb: 1, 0, −1, −2, −3.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumberLineOppositesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumberLineOppositesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumberLineOppositesQuiz;
