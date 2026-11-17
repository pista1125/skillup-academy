import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Rounding1000G3Matcher } from './Rounding1000G3Matcher';
import { Rounding1000G3Sorter } from './Rounding1000G3Sorter';
import { QCLS, QFig, NumLine, Mark, DigitCardRow, CARD_COLORS } from '../szamok-1000-ig/Numbers1000G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const LineFig: React.FC<{ lo: number; hi: number; tick: number; big: number; labels: number[]; marks: Mark[] }> = (p) => (
  <NumLine {...p} W={240} H={92} className={QCLS} />
);

const CardsFig: React.FC<{ digits: string[] }> = ({ digits }) => {
  const s = 34;
  const w = digits.length * (s + 6) - 6;
  return (
    <QFig h={66}>
      <DigitCardRow x={(240 - w) / 2} y={11} digits={digits} s={s} colors={CARD_COLORS} />
    </QFig>
  );
};

/** Árcédula. */
const PriceFig: React.FC<{ what: string; price: string }> = ({ what, price }) => (
  <QFig h={84}>
    <path d="M 60 18 L 190 18 L 210 42 L 190 66 L 60 66 Z" fill="#fef9c3" stroke="#a16207" strokeWidth="2" />
    <circle cx="196" cy="42" r="4" fill="#fff" stroke="#a16207" strokeWidth="1.5" />
    <text x="125" y="36" textAnchor="middle" fontSize="12" fill="#713f12">{what}</text>
    <text x="125" y="58" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a">{price}</text>
  </QFig>
);

/** Két könyv oldalszámmal. */
const BooksFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={96}>
    <rect x="40" y="14" width="64" height="70" rx="4" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <rect x="40" y="14" width="9" height="70" fill="#1d4ed8" />
    <text x="76" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{a}</text>
    <text x="76" y="66" textAnchor="middle" fontSize="11" fill="#1e3a8a">oldal</text>
    <rect x="136" y="10" width="64" height="74" rx="4" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
    <rect x="136" y="10" width="9" height="74" fill="#b91c1c" />
    <text x="172" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{b}</text>
    <text x="172" y="64" textAnchor="middle" fontSize="11" fill="#7f1d1d">oldal</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROUNDING_1000_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'r1000g3-q1',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={670} hi={700} tick={1} big={10} labels={[670, 680, 690, 700]} marks={[{ v: 683, label: '683' }]} />,
    question: 'Melyik a 683 kisebb tízes szomszédja?',
    options: ['680', '682', '670', '600'],
    correctAnswer: 0,
    explanation: 'A 683 a 680 és a 690 között van. A kisebb tízes szomszéd a 680.'
  },
  {
    id: 'r1000g3-q2',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={900} hi={1000} tick={10} big={50} labels={[900, 950, 1000]} marks={[{ v: 960, label: '960' }]} />,
    question: 'Melyik a 960 nagyobb százas szomszédja?',
    options: ['1000', '970', '900', '990'],
    correctAnswer: 0,
    explanation: 'A 960 a 900 és az 1000 között van. A nagyobb százas szomszéd az 1000.'
  },
  {
    id: 'r1000g3-q3',
    level: 1,
    questionTypeBadge: 'Kerekítés tízesre',
    figure: <LineFig lo={720} hi={730} tick={1} big={5} labels={[720, 725, 730]} marks={[{ v: 724, label: '724' }]} />,
    question: 'Kerekítsd tízesre: 724 ≈ ?',
    options: ['720', '730', '700', '724'],
    correctAnswer: 0,
    explanation: 'Az egyes 4. Ez kisebb, mint 5, ezért lefelé kerekítünk: 724 ≈ 720.'
  },
  {
    id: 'r1000g3-q4',
    level: 1,
    questionTypeBadge: 'Kerekítés tízesre',
    question: 'Kerekítsd tízesre: 857 ≈ ?',
    options: ['860', '850', '900', '857'],
    correctAnswer: 0,
    explanation: 'Az egyes 7, ezért felfelé kerekítünk: 857 ≈ 860.'
  },
  {
    id: 'r1000g3-q5',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <LineFig lo={600} hi={700} tick={10} big={50} labels={[600, 650, 700]} marks={[{ v: 638, label: '638' }]} />,
    question: 'Kerekítsd százasra: 638 ≈ ?',
    options: ['600', '700', '640', '630'],
    correctAnswer: 0,
    explanation: 'Százasra a tízest nézzük: 3. Ez kisebb, mint 5, ezért 638 ≈ 600.'
  },
  {
    id: 'r1000g3-q6',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    question: 'Kerekítsd százasra: 781 ≈ ?',
    options: ['800', '700', '780', '790'],
    correctAnswer: 0,
    explanation: 'A tízes 8, ezért felfelé kerekítünk: 781 ≈ 800.'
  },
  {
    id: 'r1000g3-q7',
    level: 1,
    questionTypeBadge: 'Kerekítés tízesre',
    figure: <LineFig lo={990} hi={1000} tick={1} big={5} labels={[990, 995, 1000]} marks={[{ v: 995, label: '?' }]} />,
    question: 'A pont a 995. Kerekítsd tízesre!',
    options: ['1000', '990', '900', '995'],
    correctAnswer: 0,
    explanation: 'Az egyes 5. Ilyenkor felfelé kerekítünk: 995 ≈ 1000.'
  },
  {
    id: 'r1000g3-q8',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={830} hi={870} tick={10} big={10} labels={[830, 840, 850, 860, 870]} marks={[{ v: 850, label: '850' }]} />,
    question: 'Melyik két szám a 850 tízes szomszédja?',
    options: ['840 és 860', '800 és 900', '849 és 851', '845 és 855'],
    correctAnswer: 0,
    explanation: 'A 850 kerek tízes. Nem lehet a saját szomszédja. A tízes szomszédai: 840 és 860.'
  },
  {
    id: 'r1000g3-q9',
    level: 1,
    questionTypeBadge: 'Közelítő érték',
    question: 'Melyik mondatban van kerekített szám?',
    options: ['Kb. 800 néző volt a meccsen.', 'A jegy pontosan 650 Ft.', 'A füzet 48 lapos.', 'A buszon 37 ülés van.'],
    correctAnswer: 0,
    explanation: 'A „kb.” azt jelenti: körülbelül. A nézők számát kerekítették.'
  },
  {
    id: 'r1000g3-q10',
    level: 1,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <LineFig lo={900} hi={1000} tick={10} big={50} labels={[900, 1000]} marks={[{ v: 950, label: '?' }]} />,
    question: 'A pont a 950. Kerekítsd százasra!',
    options: ['1000', '900', '950', '990'],
    correctAnswer: 0,
    explanation: 'A 950 pont középen van. Ilyenkor felfelé kerekítünk: 950 ≈ 1000.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'r1000g3-q11',
    level: 2,
    questionTypeBadge: 'Kerekítés százasra',
    figure: <CardsFig digits={['8', '4', '9']} />,
    question: 'Kerekítsd százasra: 849 ≈ ?',
    options: ['800', '900', '850', '840'],
    correctAnswer: 0,
    explanation: 'Csak a tízest nézd: 4. Ez lefelé visz: 849 ≈ 800. Ne kerekíts kétszer!'
  },
  {
    id: 'r1000g3-q12',
    level: 2,
    questionTypeBadge: 'Kerekítés tízesre',
    question: 'Kerekítsd tízesre: 999 ≈ ?',
    options: ['1000', '990', '900', '999'],
    correctAnswer: 0,
    explanation: 'A 999 a 990 és az 1000 között van. Az egyes 9, ezért felfelé: 999 ≈ 1000.'
  },
  {
    id: 'r1000g3-q13',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik számnak a tízes szomszédai a 910 és a 920?',
    options: ['914', '909', '925', '930'],
    correctAnswer: 0,
    explanation: 'A 914 a 910 és a 920 között van. A 909 a 900 és a 910 között van.'
  },
  {
    id: 'r1000g3-q14',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={900} hi={920} tick={2} big={10} labels={[900, 910, 920]} marks={[{ v: 906, label: '?' }]} />,
    question: 'Egy kis osztás 2-t ér. Melyik számot jelöli a pont?',
    options: ['906', '903', '912', '960'],
    correctAnswer: 0,
    explanation: 'A 900-tól 3 kis lépés: 902, 904, 906.'
  },
  {
    id: 'r1000g3-q15',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <PriceFig what="labda" price="689 Ft" />,
    question: 'Kb. mennyibe kerül a labda? Kerekíts százasra!',
    options: ['kb. 700 Ft', 'kb. 600 Ft', 'kb. 690 Ft', 'kb. 680 Ft'],
    correctAnswer: 0,
    explanation: 'A tízes 8, ezért felfelé: 689 ≈ 700. A labda kb. 700 Ft.'
  },
  {
    id: 'r1000g3-q16',
    level: 2,
    questionTypeBadge: 'Letakart jegy',
    figure: <CardsFig digits={['4', '?', '7']} />,
    question: 'A szám százasra kerekítve 400. Melyik jegy lehet a ? helyén?',
    options: ['3', '5', '8', '9'],
    correctAnswer: 0,
    explanation: '437 ≈ 400, mert a tízes 3. A 457, 487, 497 már 500 lenne.'
  },
  {
    id: 'r1000g3-q17',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik szám tízesre kerekítve 740?',
    options: ['736', '746', '734', '730'],
    correctAnswer: 0,
    explanation: '736 ≈ 740, mert az egyes 6. A 746 ≈ 750, a 734 ≈ 730.'
  },
  {
    id: 'r1000g3-q18',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: 'Melyik szám százasra kerekítve 600?',
    options: ['649', '650', '549', '700'],
    correctAnswer: 0,
    explanation: '649: a tízes 4, ezért 649 ≈ 600. A 650 ≈ 700, az 549 ≈ 500.'
  },
  {
    id: 'r1000g3-q19',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik számnak a százas szomszédai a 900 és az 1000?',
    options: ['967', '899', '890', '1000'],
    correctAnswer: 0,
    explanation: 'A 967 a 900 és az 1000 között van. A 899 és a 890 a 800 és a 900 között.'
  },
  {
    id: 'r1000g3-q20',
    level: 2,
    questionTypeBadge: 'Kétféle kerekítés',
    question: 'Melyik szám tízesre és százasra kerekítve is 500?',
    options: ['502', '550', '490', '448'],
    correctAnswer: 0,
    explanation: '502 ≈ 500 tízesre (egyes 2) és százasra is (tízes 0).'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'r1000g3-q21',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <LineFig lo={810} hi={830} tick={1} big={5} labels={[810, 815, 820, 825, 830]} marks={[{ v: 820, label: '820' }]} />,
    question: 'Melyik a legnagyobb szám, amely tízesre kerekítve 820?',
    options: ['824', '825', '829', '819'],
    correctAnswer: 0,
    explanation: '824 ≈ 820. A 825 már felfelé megy: 825 ≈ 830.'
  },
  {
    id: 'r1000g3-q22',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <LineFig lo={500} hi={700} tick={10} big={50} labels={[500, 550, 600, 650, 700]} marks={[{ v: 600, label: '600' }]} />,
    question: 'Melyik a legkisebb szám, amely százasra kerekítve 600?',
    options: ['550', '551', '600', '549'],
    correctAnswer: 0,
    explanation: 'Az 550 pont középen van az 500 és a 600 között, ezért felfelé: 550 ≈ 600. Az 549 ≈ 500.'
  },
  {
    id: 'r1000g3-q23',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <LineFig lo={360} hi={380} tick={1} big={5} labels={[360, 365, 370, 375, 380]} marks={[{ v: 370, label: '370' }]} />,
    question: 'Hány szám van, amely tízesre kerekítve 370?',
    options: ['10', '9', '5', '11'],
    correctAnswer: 0,
    explanation: '365-től 374-ig: 365, 366, 367, 368, 369, 370, 371, 372, 373, 374. Ez 10 szám.'
  },
  {
    id: 'r1000g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <LineFig lo={560} hi={580} tick={1} big={5} labels={[560, 565, 570, 575, 580]} marks={[{ v: 570, label: '570' }]} />,
    question: 'Egy dobozban tízesre kerekítve 570 gyöngy van. Legfeljebb hány gyöngy lehet benne?',
    options: ['574', '575', '579', '570'],
    correctAnswer: 0,
    explanation: '565-től 574-ig minden szám ≈ 570. A legnagyobb a 574.'
  },
  {
    id: 'r1000g3-q25',
    level: 3,
    questionTypeBadge: 'Biztos vagy lehetetlen?',
    figure: <CardsFig digits={['7', '?', '4']} />,
    question: 'Ezt a számot százasra kerekítjük. Az eredmény 900 lesz. Ez…',
    options: ['lehetetlen', 'biztos', 'lehet, de nem biztos'],
    correctAnswer: 0,
    explanation: 'A szám 704 és 794 között van. Százasra 700 vagy 800 lesz, sosem 900.'
  },
  {
    id: 'r1000g3-q26',
    level: 3,
    questionTypeBadge: 'Biztos vagy lehetetlen?',
    figure: <CardsFig digits={['5', '?', '6']} />,
    question: 'Ezt a számot százasra kerekítjük. Az eredmény 600 lesz. Ez…',
    options: ['lehet, de nem biztos', 'biztos', 'lehetetlen'],
    correctAnswer: 0,
    explanation: 'Ha a ? helyén 5, 6, 7, 8 vagy 9 áll, akkor ≈ 600. Ha 0, 1, 2, 3 vagy 4, akkor ≈ 500.'
  },
  {
    id: 'r1000g3-q27',
    level: 3,
    questionTypeBadge: 'Biztos vagy lehetetlen?',
    question: 'Csak a 4, 5, 6 jegyeket használhatod, többször is. Háromjegyű számot raksz ki. Százasra kerekítve legalább 400 lesz. Ez…',
    options: ['biztos', 'lehetetlen', 'lehet, de nem biztos'],
    correctAnswer: 0,
    explanation: 'A legkisebb kirakható szám a 444. Ez is ≈ 400. Minden más még nagyobb.'
  },
  {
    id: 'r1000g3-q28',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={750} hi={800} tick={5} big={25} labels={[750, 775, 800]} marks={[{ v: 765, label: '?' }]} />,
    question: 'Egy kis osztás 5-öt ér. Kerekítsd százasra a jelölt számot!',
    options: ['800', '700', '770', '765'],
    correctAnswer: 0,
    explanation: 'A pont a 765. A tízes 6, ezért felfelé: 765 ≈ 800.'
  },
  {
    id: 'r1000g3-q29',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig lo={700} hi={800} tick={10} big={50} labels={[700, 750, 800]} marks={[{ v: 764, label: '764' }]} />,
    question: 'Melyik a 764 kisebb százas és nagyobb tízes szomszédja?',
    options: ['700 és 770', '760 és 800', '700 és 760', '600 és 770'],
    correctAnswer: 0,
    explanation: 'Kisebb százas szomszéd: 700. Nagyobb tízes szomszéd: 770.'
  },
  {
    id: 'r1000g3-q30',
    level: 3,
    questionTypeBadge: 'Becslés',
    figure: <BooksFig a={296} b={512} />,
    question: 'Kerekítsd százasra mindkét oldalszámot! Kb. hány oldallal vastagabb a piros könyv?',
    options: ['kb. 200', 'kb. 300', 'kb. 100', 'kb. 800'],
    correctAnswer: 0,
    explanation: '296 ≈ 300 és 512 ≈ 500. 500 − 300 = 200. A piros könyv kb. 200 oldallal vastagabb.'
  }
];

export const Rounding1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId="g3-c1000-kerekites-quiz"
      subtopicId="szamszomszedok-kerekites"
      title="2. Számszomszédok, kerekítés – Kvíz"
      subtitle="30 feladat 3 szinten: szomszédok, kerekítés tízesre és százasra, visszafelé, letakart jegy, becslés."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • KVÍZ"
      questions={ROUNDING_1000_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szomszédok',
          items: ['A 683 tízes szomszédai: 680 és 690', 'A 683 százas szomszédai: 600 és 700', 'Kerek szám nem lehet a saját szomszédja: 800 → 700 és 900']
        },
        {
          title: 'Kerekítés',
          items: ['Tízesre: nézd az egyest!', 'Százasra: nézd a tízest!', '0–4: lefelé, 5–9: felfelé', '849 ≈ 850 (tízesre), 849 ≈ 800 (százasra)']
        },
        {
          title: 'Visszafelé',
          items: ['Tízesre 740: 735-től 744-ig', 'Százasra 600: 550-től 649-ig', 'Tízesre 1000: 995-től 999-ig (és az 1000)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Rounding1000G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Rounding1000G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Rounding1000G3Quiz;
