import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddSub500G3Matcher } from './AddSub500G3Matcher';
import { AddSub500G3Sorter } from './AddSub500G3Sorter';
import { Jumps, CoinsFig, BlocksFig, BarFig, CompareFig, ShopFig, TrailFig } from './AddSub500G3QuizParts';

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ADD_SUB_500_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'as500g3-q1',
    level: 1,
    questionTypeBadge: 'Kerek százasok',
    figure: <CoinsFig groups={[[100, 100], [100, 100, 100]]} />,
    question: 'Mennyi pénz van összesen?',
    options: ['500 Ft', '400 Ft', '50 Ft', '230 Ft'],
    correctAnswer: 0,
    explanation: '2 százas + 3 százas = 5 százas. 200 + 300 = 500 Ft.'
  },
  {
    id: 'as500g3-q2',
    level: 1,
    questionTypeBadge: 'Százas és tízes',
    figure: <BlocksFig a={[3, 0]} b={[0, 7]} />,
    question: '300 + 70 = ?',
    options: ['370', '307', '100', '310'],
    correctAnswer: 0,
    explanation: '3 százas és 7 tízes: 370. Nem 307, mert a 7 itt tízeseket jelent!'
  },
  {
    id: 'as500g3-q3',
    level: 1,
    questionTypeBadge: 'Kerek százasok',
    question: '480 − 300 = ?',
    options: ['180', '280', '450', '80'],
    correctAnswer: 0,
    explanation: '4 százasból elveszel 3 százast, marad 1 százas. A 8 tízes megmarad: 180.'
  },
  {
    id: 'as500g3-q4',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    figure: <CoinsFig groups={[[100, 100, 10], [100, 50]]} />,
    question: '210 + 150 = ?',
    options: ['360', '260', '350', '370'],
    correctAnswer: 0,
    explanation: 'Százasok: 2 + 1 = 3. Tízesek: 1 + 5 = 6. Együtt 360.'
  },
  {
    id: 'as500g3-q5',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: '460 − 120 = ?',
    options: ['340', '360', '440', '240'],
    correctAnswer: 0,
    explanation: 'Százasok: 4 − 1 = 3. Tízesek: 6 − 2 = 4. Az eredmény 340.'
  },
  {
    id: 'as500g3-q6',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <Jumps lo={300} hi={400} start={320} jumps={[{ to: 370, label: '+50' }]} />,
    question: 'Hová érkezik az ugrás?',
    options: ['370', '360', '380', '470'],
    correctAnswer: 0,
    explanation: '32 tízes + 5 tízes = 37 tízes. 320 + 50 = 370.'
  },
  {
    id: 'as500g3-q7',
    level: 1,
    questionTypeBadge: 'Pótlás',
    figure: <BarFig known={340} total={400} />,
    question: 'Mennyi kell a 340-hez, hogy 400 legyen?',
    options: ['60', '40', '160', '70'],
    correctAnswer: 0,
    explanation: '340-ben 34 tízes van, a 400-ban 40 tízes. Hiányzik 6 tízes: 60. Ellenőrzés: 340 + 60 = 400.'
  },
  {
    id: 'as500g3-q8',
    level: 1,
    questionTypeBadge: 'Tízesekkel',
    question: '26 tízes + 3 tízes = ?',
    options: ['290', '29', '263', '230'],
    correctAnswer: 0,
    explanation: '26 + 3 = 29, tehát 29 tízes. Az 290.'
  },
  {
    id: 'as500g3-q9',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig groups={[[200, 100, 50]]} caption="Elköltöd az 50 Ft-ost." />,
    question: 'Van 350 Ft-od. 50 Ft-ot elköltesz. Mennyi marad?',
    options: ['300 Ft', '250 Ft', '400 Ft', '340 Ft'],
    correctAnswer: 0,
    explanation: '200 + 100 marad: 350 − 50 = 300 Ft.'
  },
  {
    id: 'as500g3-q10',
    level: 1,
    questionTypeBadge: 'Kerek százasok',
    question: '500 − 200 = ?',
    options: ['300', '200', '250', '30'],
    correctAnswer: 0,
    explanation: '5 százas − 2 százas = 3 százas. 500 − 200 = 300.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'as500g3-q11',
    level: 2,
    questionTypeBadge: 'Százasátlépés',
    figure: <Jumps lo={260} hi={350} start={280} jumps={[{ to: 300, label: '+20' }, { to: 330, label: '+30' }]} />,
    question: '280 + 50 = ?',
    options: ['330', '230', '340', '320'],
    correctAnswer: 0,
    explanation: 'Előbb a 300-ig: 280 + 20 = 300. Az 50-ből még 30 maradt: 300 + 30 = 330.'
  },
  {
    id: 'as500g3-q12',
    level: 2,
    questionTypeBadge: 'Százasátlépés',
    figure: <BlocksFig a={[3, 5]} b={[0, 8]} />,
    question: '350 + 80 = ?',
    options: ['430', '330', '420', '440'],
    correctAnswer: 0,
    explanation: '5 tízes + 8 tízes = 13 tízes. 10 tízes egy új százas! 3 + 1 = 4 százas, marad 3 tízes: 430.'
  },
  {
    id: 'as500g3-q13',
    level: 2,
    questionTypeBadge: 'Százasátlépés',
    figure: <Jumps minus lo={350} hi={440} start={420} jumps={[{ to: 400, label: '−20' }, { to: 370, label: '−30' }]} />,
    question: '420 − 50 = ?',
    options: ['370', '430', '470', '360'],
    correctAnswer: 0,
    explanation: 'Előbb vissza a 400-ig: 420 − 20 = 400. Aztán még 30: 400 − 30 = 370.'
  },
  {
    id: 'as500g3-q14',
    level: 2,
    questionTypeBadge: 'Százasátlépés',
    question: '310 − 40 = ?',
    options: ['270', '370', '350', '280'],
    correctAnswer: 0,
    explanation: '310 − 10 = 300. Aztán még 30: 300 − 30 = 270.'
  },
  {
    id: 'as500g3-q15',
    level: 2,
    questionTypeBadge: 'Tízesekkel',
    question: 'Tudod, hogy 37 − 9 = 28. Mennyi 370 − 90?',
    options: ['280', '380', '28', '270'],
    correctAnswer: 0,
    explanation: '37 tízes − 9 tízes = 28 tízes, vagyis 280.'
  },
  {
    id: 'as500g3-q16',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: <Jumps lo={240} hi={440} start={260} jumps={[{ to: 360, label: '+100' }, { to: 410, label: '+50' }]} />,
    question: '260 + 150 = ?',
    options: ['410', '310', '400', '420'],
    correctAnswer: 0,
    explanation: 'Előbb +100: 260 + 100 = 360. Aztán +50: 360 + 50 = 410.'
  },
  {
    id: 'as500g3-q17',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: <Jumps minus lo={240} hi={460} start={440} jumps={[{ to: 340, label: '−100' }, { to: 260, label: '−80' }]} />,
    question: '440 − 180 = ?',
    options: ['260', '340', '360', '250'],
    correctAnswer: 0,
    explanation: 'Előbb −100: 440 − 100 = 340. Aztán −80: 340 − 40 = 300, 300 − 40 = 260.'
  },
  {
    id: 'as500g3-q18',
    level: 2,
    questionTypeBadge: 'Pótlás 500-ra',
    figure: <BarFig known={230} />,
    question: '230 + □ = 500. Mennyi a □?',
    options: ['270', '330', '370', '280'],
    correctAnswer: 0,
    explanation: '230-tól 300-ig 70. 300-tól 500-ig 200. Együtt 270. Ellenőrzés: 230 + 270 = 500.'
  },
  {
    id: 'as500g3-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: '□ − 140 = 290. Mennyi a □?',
    options: ['430', '150', '330', '420'],
    correctAnswer: 0,
    explanation: 'Ami maradt, meg amit elvettél, együtt adja az egészet: 290 + 140 = 430.'
  },
  {
    id: 'as500g3-q20',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig groups={[[200, 100, 100, 50, 20, 10]]} />,
    question: 'Mennyi pénz van itt?',
    options: ['480 Ft', '470 Ft', '380 Ft', '490 Ft'],
    correctAnswer: 0,
    explanation: '200 + 100 + 100 = 400. Aztán 50 + 20 + 10 = 80. Együtt 480 Ft.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'as500g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TrailFig />,
    question: 'Az ösvény 500 m hosszú. Hanna előbb 180 m-t, aztán 150 m-t gyalogol. Mennyi van még hátra?',
    options: ['170 m', '330 m', '270 m', '230 m'],
    correctAnswer: 0,
    explanation: 'Eddig: 180 + 150 = 330 m. Hátra van: 500 − 330 = 170 m.'
  },
  {
    id: 'as500g3-q22',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: <ShopFig items={[{ name: 'füzet', price: 230 }, { name: 'toll', price: 120 }]} />,
    question: 'Marci vesz egy füzetet és egy tollat. 500 Ft-tal fizet. Mennyit kap vissza?',
    options: ['150 Ft', '350 Ft', '250 Ft', '130 Ft'],
    correctAnswer: 0,
    explanation: 'A két dolog ára: 230 + 120 = 350 Ft. Visszajár: 500 − 350 = 150 Ft.'
  },
  {
    id: 'as500g3-q23',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    figure: <CompareFig a={{ name: 'péntek', v: 260 }} b={{ name: 'szombat', v: 410 }} diff="?" />,
    question: 'A bábszínházban pénteken 260, szombaton 410 néző volt. Mennyivel többen voltak szombaton?',
    options: ['150', '250', '160', '140'],
    correctAnswer: 0,
    explanation: '410 − 260 = 410 − 200 − 60 = 210 − 60 = 150. Ellenőrzés: 260 + 150 = 410.'
  },
  {
    id: 'as500g3-q24',
    level: 3,
    questionTypeBadge: 'Mennyivel kevesebb?',
    figure: <CompareFig a={{ name: 'kék', v: 320 }} b={{ name: 'zöld', v: 230, hide: true }} diff="90" />,
    question: 'A kék csapat 320 pontot gyűjtött. A zöld csapat 90-nel kevesebbet. Hány pontja van a zöldnek?',
    options: ['230', '410', '330', '240'],
    correctAnswer: 0,
    explanation: '„Kevesebb”, ezért kivonunk: 320 − 90 = 320 − 20 − 70 = 230.'
  },
  {
    id: 'as500g3-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A könyvtárban 180 mesekönyv és 150 verseskönyv van. Kikölcsönöztek 90 könyvet. Hány könyv maradt a polcon?',
    options: ['240', '330', '420', '260'],
    correctAnswer: 0,
    explanation: 'Összesen: 180 + 150 = 330 könyv. Maradt: 330 − 90 = 240.'
  },
  {
    id: 'as500g3-q26',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    question: '450 − 70 + 40 = ?',
    options: ['420', '340', '380', '410'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 450 − 70 = 380. Aztán 380 + 40 = 420.'
  },
  {
    id: 'as500g3-q27',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: '290 + 60 < □ < 400 − 30. Melyik szám lehet a □?',
    options: ['360', '350', '370', '340'],
    correctAnswer: 0,
    explanation: '290 + 60 = 350 és 400 − 30 = 370. A □ nagyobb 350-nél és kisebb 370-nél: a 360 jó.'
  },
  {
    id: 'as500g3-q28',
    level: 3,
    questionTypeBadge: 'Műveletek',
    question: 'Melyik eredménye NEM 300?',
    options: ['170 + 140', '360 − 60', '220 + 80', '450 − 150'],
    correctAnswer: 0,
    explanation: '170 + 140 = 310. A többi mind 300: 360 − 60, 220 + 80, 450 − 150.'
  },
  {
    id: 'as500g3-q29',
    level: 3,
    questionTypeBadge: 'Gondolt szám',
    figure: <BarFig known={160} total={410} />,
    question: 'Gondoltam egy számot. Hozzáadtam 160-at, és 410 lett. Melyik számra gondoltam?',
    options: ['250', '350', '270', '240'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 410 − 160 = 250. Ellenőrzés: 250 + 160 = 410.'
  },
  {
    id: 'as500g3-q30',
    level: 3,
    questionTypeBadge: 'Visszajáró',
    figure: <ShopFig items={[{ name: 'labda', price: 270 }, { name: 'síp', price: 90 }]} />,
    question: 'Zoé vesz egy labdát és egy sípot. 500 Ft-tal fizet. Mennyit kap vissza?',
    options: ['140 Ft', '360 Ft', '240 Ft', '130 Ft'],
    correctAnswer: 0,
    explanation: 'Az ár együtt: 270 + 90 = 360 Ft. Visszajár: 500 − 360 = 140 Ft.'
  }
];

export const AddSub500G3Quiz: React.FC<{
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
      topicId="g3-c500-osszeadas-quiz"
      subtopicId="osszeadas-es-kivonas"
      title="3. Összeadás és kivonás – Kvíz"
      subtitle="30 feladat 3 szinten: kerek tízesek és százasok, átlépés a százason, bontás, pótlás 500-ra, pénz, szöveges feladatok."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • KVÍZ"
      questions={ADD_SUB_500_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Százasok, tízesek',
          items: ['210 + 150: 3 százas 6 tízes = 360', '480 − 300 = 180', '300 + 70 = 370 (nem 307!)']
        },
        {
          title: 'Átlépés a százason',
          items: ['280 + 50 = 280 + 20 + 30 = 330', '420 − 50 = 420 − 20 − 30 = 370', 'Előbb mindig a kerek százasig lépj!']
        },
        {
          title: 'Bontás, pótlás',
          items: ['260 + 150 = 260 + 100 + 50 = 410', '440 − 180 = 440 − 100 − 80 = 260', '230 + □ = 500 → □ = 270']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddSub500G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AddSub500G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AddSub500G3Quiz;
