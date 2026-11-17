import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulDiv500G3Matcher } from './MulDiv500G3Matcher';
import { MulDiv500G3Sorter } from './MulDiv500G3Sorter';
import { BoxesFig, FlatsFig, RodsFig, ShareFig, HopFig, CoinGridFig, CoinsFig, AnalogyFig, PackFig, RibbonFig, TimesBarFig, SeatsFig } from './MulDiv500G3QuizParts';

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MUL_DIV_500_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'md500g3-q1',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    figure: <BoxesFig n={12} label="10" />,
    question: 'Egy dobozban 10 ceruza van. Hány ceruza van 12 dobozban?',
    options: ['120', '22', '112', '102'],
    correctAnswer: 0,
    explanation: '12 · 10 = 12 tízes = 120.'
  },
  {
    id: 'md500g3-q2',
    level: 1,
    questionTypeBadge: 'Szorzás 100-zal',
    figure: <FlatsFig n={4} />,
    question: '4 · 100 = ?',
    options: ['400', '104', '40', '500'],
    correctAnswer: 0,
    explanation: '4 százas = 400.'
  },
  {
    id: 'md500g3-q3',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    figure: <RodsFig groups={3} per={4} />,
    question: '3 · 40 = ?',
    options: ['120', '12', '70', '160'],
    correctAnswer: 0,
    explanation: '3 · 4 = 12, tehát 3 · 4 tízes = 12 tízes = 120.'
  },
  {
    id: 'md500g3-q4',
    level: 1,
    questionTypeBadge: 'Tízszeres',
    question: 'Mennyi a 34 tízszerese?',
    options: ['340', '44', '304', '430'],
    correctAnswer: 0,
    explanation: '34 · 10 = 34 tízes = 340. A 34 végére egy 0 kerül.'
  },
  {
    id: 'md500g3-q5',
    level: 1,
    questionTypeBadge: 'Osztás 10-zel',
    figure: <PackFig total={120} per={10} what="ceruza" />,
    question: '120 ceruzát teszünk dobozokba, tízesével. Hány doboz kell?',
    options: ['12', '120', '11', '110'],
    correctAnswer: 0,
    explanation: '120 = 12 tízes. 120 : 10 = 12 doboz.'
  },
  {
    id: 'md500g3-q6',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: '5 · 60 = ?',
    options: ['300', '30', '65', '360'],
    correctAnswer: 0,
    explanation: '5 · 6 = 30, tehát 5 · 6 tízes = 30 tízes = 300.'
  },
  {
    id: 'md500g3-q7',
    level: 1,
    questionTypeBadge: 'Részekre osztás',
    figure: <ShareFig total={400} k={4} />,
    question: '400 : 4 = ?',
    options: ['100', '10', '40', '396'],
    correctAnswer: 0,
    explanation: '4 százast 4 részre osztunk. Egy részbe 1 százas jut: 100.'
  },
  {
    id: 'md500g3-q8',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    question: '10 · 30 = ?',
    options: ['300', '40', '30', '130'],
    correctAnswer: 0,
    explanation: '10 · 30 = 30 tízes = 300.'
  },
  {
    id: 'md500g3-q9',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig n={8} v={50} />,
    question: 'Mennyi pénz ez?',
    options: ['400 Ft', '58 Ft', '350 Ft', '450 Ft'],
    correctAnswer: 0,
    explanation: '8 db 50 forintos: 8 · 50 = 400 Ft.'
  },
  {
    id: 'md500g3-q10',
    level: 1,
    questionTypeBadge: 'Részekre osztás',
    figure: <ShareFig total={300} k={3} />,
    question: '300 : 3 = ?',
    options: ['100', '10', '30', '297'],
    correctAnswer: 0,
    explanation: '3 százast 3 részre osztunk. Egy részbe 1 százas jut: 100.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'md500g3-q11',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    figure: <AnalogyFig a={6} b={7} />,
    question: 'Tudod, hogy 6 · 7 = 42. Mennyi 6 · 70?',
    options: ['420', '42', '360', '480'],
    correctAnswer: 0,
    explanation: '6 · 7 tízes = 42 tízes = 420.'
  },
  {
    id: 'md500g3-q12',
    level: 2,
    questionTypeBadge: 'Kerek tízesek',
    question: '9 · 40 = ?',
    options: ['360', '36', '320', '49'],
    correctAnswer: 0,
    explanation: '9 · 4 = 36, tehát 9 · 40 = 360.'
  },
  {
    id: 'md500g3-q13',
    level: 2,
    questionTypeBadge: 'Részekre osztás',
    figure: <ShareFig total={320} k={4} />,
    question: '320 : 4 = ?',
    options: ['80', '8', '70', '90'],
    correctAnswer: 0,
    explanation: '32 tízes : 4 = 8 tízes = 80. Ellenőrzés: 4 · 80 = 320.'
  },
  {
    id: 'md500g3-q14',
    level: 2,
    questionTypeBadge: 'Bennfoglalás',
    figure: <HopFig total={320} size={40} />,
    question: '320 : 40 = ?',
    options: ['8', '80', '7', '9'],
    correctAnswer: 0,
    explanation: 'Hányszor van meg a 320-ban a 40? 8 · 40 = 320, tehát 8-szor.'
  },
  {
    id: 'md500g3-q15',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: '480 : 6 = ?',
    options: ['80', '8', '60', '70'],
    correctAnswer: 0,
    explanation: '48 tízes : 6 = 8 tízes = 80. Ellenőrzés: 6 · 80 = 480.'
  },
  {
    id: 'md500g3-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: '□ · 50 = 350. Mennyi a □?',
    options: ['7', '70', '6', '300'],
    correctAnswer: 0,
    explanation: '350 : 50 = 7, mert 7 · 50 = 350.'
  },
  {
    id: 'md500g3-q17',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinGridFig rows={4} cols={6} v={10} />,
    question: 'Mennyi pénz van itt?',
    options: ['240 Ft', '24 Ft', '100 Ft', '200 Ft'],
    correctAnswer: 0,
    explanation: '4 sor, egy sorban 6 · 10 = 60 Ft. 4 · 60 = 240 Ft.'
  },
  {
    id: 'md500g3-q18',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: '40 + 60 · 4 = ?',
    options: ['280', '400', '260', '240'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk: 60 · 4 = 240. Aztán 40 + 240 = 280. (A 400 akkor jönne ki, ha előbb összeadnál.)'
  },
  {
    id: 'md500g3-q19',
    level: 2,
    questionTypeBadge: 'Bennfoglalás',
    question: '450 : 50 = ?',
    options: ['9', '90', '5', '8'],
    correctAnswer: 0,
    explanation: '45 tízesben az 5 tízes 9-szer van meg. 9 · 50 = 450.'
  },
  {
    id: 'md500g3-q20',
    level: 2,
    questionTypeBadge: 'Szorzás',
    figure: <RodsFig groups={7} per={6} />,
    question: '7 csomag matrica van, mindegyikben 60. Hány matrica van összesen?',
    options: ['420', '67', '360', '480'],
    correctAnswer: 0,
    explanation: '7 · 6 tízes = 42 tízes. 7 · 60 = 420.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'md500g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TimesBarFig />,
    question: 'A tanyán 60 tyúk van. Liba ötször annyi. Hány tyúk és liba van összesen?',
    options: ['360', '300', '65', '350'],
    correctAnswer: 0,
    explanation: 'Libák: 5 · 60 = 300. Összesen: 60 + 300 = 360.'
  },
  {
    id: 'md500g3-q22',
    level: 3,
    questionTypeBadge: 'Bennfoglalás',
    figure: <PackFig total={280} per={40} what="tojás" />,
    question: 'Egy dobozba 40 tojás fér. Hány doboz kell 280 tojáshoz?',
    options: ['7', '70', '8', '240'],
    correctAnswer: 0,
    explanation: '280 : 40 = 7, mert 7 · 40 = 280.'
  },
  {
    id: 'md500g3-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: '5 csapat van, minden csapatban 4 gyerek. Mindenki 20 matricát kap. Hány matrica kell?',
    options: ['400', '100', '200', '29'],
    correctAnswer: 0,
    explanation: 'Gyerekek: 5 · 4 = 20. Matrica: 20 · 20 = 400.'
  },
  {
    id: 'md500g3-q24',
    level: 3,
    questionTypeBadge: 'Részekre osztás',
    figure: <RibbonFig len={360} k={9} />,
    question: 'Egy 360 cm-es szalagot 9 egyforma darabra vágunk. Milyen hosszú egy darab?',
    options: ['40 cm', '4 cm', '351 cm', '30 cm'],
    correctAnswer: 0,
    explanation: '36 tízes : 9 = 4 tízes. 360 : 9 = 40 cm.'
  },
  {
    id: 'md500g3-q25',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: '240 : 6 < □ < 250 : 5. Melyik szám lehet a □?',
    options: ['45', '40', '50', '55'],
    correctAnswer: 0,
    explanation: '240 : 6 = 40 és 250 : 5 = 50. A □ nagyobb 40-nél és kisebb 50-nél: a 45 jó.'
  },
  {
    id: 'md500g3-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek a legnagyobb az eredménye?',
    options: ['6 · 80', '9 · 50', '400 + 7 · 10', '40 · 10 + 40'],
    correctAnswer: 0,
    explanation: '6 · 80 = 480, 9 · 50 = 450, 400 + 70 = 470, 400 + 40 = 440. A legnagyobb a 480.'
  },
  {
    id: 'md500g3-q27',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás igaz?',
    options: ['A 45 tízszerese 450.', 'A 400-ban az 50 hétszer van meg.', 'A 6 · 70 kisebb, mint 400.', 'A 250 : 5 = 5.'],
    correctAnswer: 0,
    explanation: '45 · 10 = 450, ez igaz. A többi hamis: 400 : 50 = 8, 6 · 70 = 420, 250 : 5 = 50.'
  },
  {
    id: 'md500g3-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig n={8} v={50} extra={[20]} />,
    question: 'Mennyi pénz ez összesen?',
    options: ['420 Ft', '70 Ft', '400 Ft', '450 Ft'],
    correctAnswer: 0,
    explanation: '8 · 50 = 400 Ft, és még 20 Ft: 400 + 20 = 420 Ft.'
  },
  {
    id: 'md500g3-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BoxesFig n={4} label="60" caption="kell 300 kréta" />,
    question: '4 doboz krétád van, mindegyikben 60. 300 kréta kell. Mennyi hiányzik?',
    options: ['60', '240', '40', '100'],
    correctAnswer: 0,
    explanation: 'Van 4 · 60 = 240 kréta. Hiányzik: 300 − 240 = 60.'
  },
  {
    id: 'md500g3-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SeatsFig />,
    question: 'A teremben 9 sor szék van, minden sorban 50. 380 néző jött. Hány szék maradt üresen?',
    options: ['70', '450', '80', '170'],
    correctAnswer: 0,
    explanation: 'Székek: 9 · 50 = 450. Üres: 450 − 380 = 70.'
  }
];

export const MulDiv500G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId="g3-c500-szorzas-quiz"
      subtopicId="szorzas-es-osztas"
      title="4. Szorzás és osztás – Kvíz"
      subtitle="30 feladat 3 szinten: szorzás 10-zel és 100-zal, kerek tízesek szorzása és osztása, kétféle osztás, pénz, szöveges feladatok."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • KVÍZ"
      questions={MUL_DIV_500_G3_QUESTIONS}
      cheatSheets={[
        {
          title: '10-zel, 100-zal',
          items: ['14 · 10 = 140 (14 tízes)', '4 · 100 = 400', '120 : 10 = 12']
        },
        {
          title: 'Tízesekkel',
          items: ['6 · 70: 6 · 7 = 42 → 420', '480 : 6: 48 : 6 = 8 → 80', 'Ellenőrzés: 6 · 80 = 480']
        },
        {
          title: 'Kétféle osztás',
          items: ['320 : 4 = 80 (egy részbe mennyi jut?)', '320 : 40 = 8 (hányszor van meg?)', 'Előbb szorzás, aztán összeadás: 40 + 60 · 4 = 280']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulDiv500G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MulDiv500G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MulDiv500G3Quiz;
