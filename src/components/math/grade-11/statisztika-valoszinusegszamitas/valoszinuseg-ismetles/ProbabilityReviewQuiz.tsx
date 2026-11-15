import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ProbabilityReviewMatcher } from './ProbabilityReviewMatcher';
import { ProbabilityReviewSorter } from './ProbabilityReviewSorter';
import {
  ProbabilityReviewDieFace,
  ProbabilityReviewCountPie,
  PROBABILITY_REVIEW_CARLSEN_WHITE,
  PROBABILITY_REVIEW_CARLSEN_BLACK
} from './ProbabilityReviewFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** A kocka hat lapja – semmit nem emel ki. */
const DieFacesFig: React.FC = () => (
  <svg viewBox="0 0 240 60" className={FIG_CLASS}>
    {[1, 2, 3, 4, 5, 6].map((v) => (
      <ProbabilityReviewDieFace key={v} x={6 + (v - 1) * 39} y={12} size={34} value={v} />
    ))}
  </svg>
);

/** Carlsen két kördiagramja kicsiben. */
const CarlsenFig: React.FC = () => (
  <svg viewBox="0 0 260 150" className={FIG_CLASS}>
    <rect x="2" y="2" width="256" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="68" y="18" fontSize="10" textAnchor="middle" fill="#334155">világossal</text>
    <text x="192" y="18" fontSize="10" textAnchor="middle" fill="#334155">sötéttel</text>
    <ProbabilityReviewCountPie data={PROBABILITY_REVIEW_CARLSEN_WHITE} cx={68} cy={78} r={50} fontSize={9} />
    <ProbabilityReviewCountPie data={PROBABILITY_REVIEW_CARLSEN_BLACK} cx={192} cy={78} r={50} fontSize={9} />
    <g fontSize="9" fill="#334155">
      <rect x="40" y="134" width="8" height="8" fill="#16a34a" />
      <text x="51" y="141">győzelem</text>
      <rect x="104" y="134" width="8" height="8" fill="#64748b" />
      <text x="115" y="141">döntetlen</text>
      <rect x="170" y="134" width="8" height="8" fill="#dc2626" />
      <text x="181" y="141">vereség</text>
    </g>
  </svg>
);

/** Üres 6 × 6-os táblázat két kockához (a cellákat a diák tölti ki). */
const EmptyGridFig: React.FC<{ op: string }> = ({ op }) => (
  <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto mx-auto">
    <text x="16" y="22" fontSize="14" textAnchor="middle" fill="#0f172a">{op}</text>
    {[1, 2, 3, 4, 5, 6].map((v) => (
      <g key={v}>
        <text x={30 + (v - 0.5) * 27} y="22" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0369a1">{v}</text>
        <text x="18" y={30 + (v - 0.5) * 27 + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#be123c">{v}</text>
      </g>
    ))}
    {[0, 1, 2, 3, 4, 5].map((a) =>
      [0, 1, 2, 3, 4, 5].map((b) => <rect key={`${a}-${b}`} x={30 + b * 27} y={30 + a * 27} width="27" height="27" fill="#ffffff" stroke="#94a3b8" />)
    )}
    <text x="111" y="120" fontSize="28" textAnchor="middle" fill="#9f1239" fillOpacity="0.5">?</text>
  </svg>
);

/** 60 és 56 osztóinak Venn-diagramja, elemek nélkül. */
const VennFig: React.FC = () => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <circle cx="95" cy="75" r="52" fill="#e0f2fe" fillOpacity="0.8" stroke="#0284c7" strokeWidth="1.5" />
    <circle cx="148" cy="75" r="45" fill="#fef3c7" fillOpacity="0.6" stroke="#d97706" strokeWidth="1.5" />
    <text x="60" y="18" fontSize="10" fontWeight="bold" fill="#075985">A: 60 osztói</text>
    <text x="140" y="18" fontSize="10" fontWeight="bold" fill="#92400e">B: 56 osztói</text>
    <text x="121" y="80" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#be123c">?</text>
  </svg>
);

/** Három érme. */
const CoinsFig: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 240 70" className="w-full max-w-[220px] h-auto mx-auto">
    {Array.from({ length: n }, (_, i) => {
      const cx = 120 + (i - (n - 1) / 2) * 62;
      return (
        <g key={i}>
          <circle cx={cx} cy="35" r="26" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          <circle cx={cx} cy="35" r="20" fill="none" stroke="#d97706" strokeDasharray="3 3" />
          <text x={cx} y="40" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#92400e">?</text>
        </g>
      );
    })}
  </svg>
);

const PROBABILITY_REVIEW_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'prr-q1',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott szám osztója 6-nak?',
    figure: <DieFacesFig />,
    options: ['2/3', '1/2', '1/6', '5/6'],
    correctAnswer: 0,
    explanation: 'A 6 osztói a kockán: 1, 2, 3, 6 – 4 kedvező eset a 6-ból: 4/6 = 2/3.'
  },
  {
    id: 'prr-q2',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy prímszámot dobunk?',
    figure: <DieFacesFig />,
    options: ['1/2', '2/3', '1/3', '4/6'],
    correctAnswer: 0,
    explanation: 'Prímszámok a kockán: 2, 3, 5 (az 1 nem prím) – 3/6 = 1/2.'
  },
  {
    id: 'prr-q3',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott szám osztója 5!-nak?',
    options: ['1', '5/6', '1/6', '0'],
    correctAnswer: 0,
    explanation: '5! = 120, ennek 1, 2, 3, 4, 5, 6 mindegyike osztója – biztos esemény, valószínűsége 1.'
  },
  {
    id: 'prr-q4',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy négyzetszámot dobunk?',
    figure: <DieFacesFig />,
    options: ['1/3', '1/6', '1/2', '2/3'],
    correctAnswer: 0,
    explanation: 'Négyzetszám a kockán: 1 és 4 – 2/6 = 1/3.'
  },
  {
    id: 'prr-q5',
    level: 1,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott szám osztható 5-tel?',
    options: ['1/6', '1/5', '1/3', '5/6'],
    correctAnswer: 0,
    explanation: 'Csak az 5 osztható 5-tel: 1/6.'
  },
  {
    id: 'prr-q6',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'Egy esemény valószínűsége 0,3. Mennyi a valószínűsége annak, hogy az esemény NEM következik be?',
    options: ['0,7', '0,3', '−0,3', '1,3'],
    correctAnswer: 0,
    explanation: 'P(nem A) = 1 − P(A) = 1 − 0,3 = 0,7.'
  },
  {
    id: 'prr-q7',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Melyik szám NEM lehet egy esemény valószínűsége?',
    options: ['1,2', '0', '1', '0,75'],
    correctAnswer: 0,
    explanation: 'A valószínűség legalább 0 és legfeljebb 1: 0 ≤ P(A) ≤ 1. Az 1,2 nagyobb 1-nél.'
  },
  {
    id: 'prr-q8',
    level: 1,
    questionTypeBadge: 'Két kocka',
    question: 'Két (megkülönböztetett) dobókockával dobunk. Hány elemi esemény van?',
    figure: <EmptyGridFig op="" />,
    options: ['36', '12', '21', '6'],
    correctAnswer: 0,
    explanation: 'Mindkét kocka 6-féle lehet, a 6 × 6-os táblázatnak 36 cellája van. (21 a rendezetlen párok száma – ezek nem egyformán valószínűek.)'
  },
  {
    id: 'prr-q9',
    level: 1,
    questionTypeBadge: 'Kördiagram',
    question: 'Carlsen játszmái közül véletlenszerűen kiválasztunk egyet. Mennyi a valószínűsége, hogy világossal játszotta?',
    figure: <CarlsenFig />,
    options: ['765/1499', '734/1499', '765/734', '1/2'],
    correctAnswer: 0,
    explanation: 'Világossal 384 + 303 + 78 = 765, összesen 765 + 734 = 1499 játszma: 765/1499 ≈ 0,51.'
  },
  {
    id: 'prr-q10',
    level: 1,
    questionTypeBadge: 'Pénzérme',
    question: 'Két pénzérmével dobunk. Mennyi a valószínűsége, hogy mindkettő fej lesz?',
    figure: <CoinsFig n={2} />,
    options: ['1/4', '1/2', '1/3', '2/3'],
    correctAnswer: 0,
    explanation: 'Elemi események (megkülönböztetett érmékkel): FF, FI, IF, II – 4 egyformán valószínű eset, ebből 1 kedvező.'
  },

  // LEVEL 2
  {
    id: 'prr-q11',
    level: 2,
    questionTypeBadge: 'Kördiagram',
    question: 'Carlsen játszmái közül véletlenszerűen kiválasztunk egyet. Mennyi a valószínűsége, hogy Carlsen nyert?',
    figure: <CarlsenFig />,
    options: ['634/1499', '384/1499', '384/765', '250/734'],
    correctAnswer: 0,
    explanation: 'Győzelmek: 384 (világossal) + 250 (sötéttel) = 634, így P = 634/1499 ≈ 0,42.'
  },
  {
    id: 'prr-q12',
    level: 2,
    questionTypeBadge: 'Kördiagram',
    question: 'Mennyi a valószínűsége, hogy a véletlenszerűen kiválasztott játszmában Carlsen ellenfele sötéttel nyert?',
    figure: <CarlsenFig />,
    options: ['78/1499', '65/1499', '250/1499', '143/1499'],
    correctAnswer: 0,
    explanation: 'Ha az ellenfél sötéttel van, Carlsen világossal játszik; az ellenfél győzelme Carlsen veresége világossal: 78 játszma, P = 78/1499.'
  },
  {
    id: 'prr-q13',
    level: 2,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk, és a dobások eredményét összeszorozzuk. Mennyi a valószínűsége, hogy a szorzat nagyobb, mint 10?',
    figure: <EmptyGridFig op="·" />,
    options: ['17/36', '1/2', '13/36', '19/36'],
    correctAnswer: 0,
    explanation: 'A 6 × 6-os táblázatban 17 olyan szorzat van, amely 10-nél nagyobb (pl. 12, 15, 16, 18, 20, 24, 25, 30, 36 és párjaik): 17/36.'
  },
  {
    id: 'prr-q14',
    level: 2,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok szorzata négyzetszám?',
    figure: <EmptyGridFig op="·" />,
    options: ['2/9', '1/6', '1/3', '1/4'],
    correctAnswer: 0,
    explanation: 'Négyzetszám szorzatok: (1;1), (2;2), (3;3), (4;4), (5;5), (6;6), (1;4), (4;1) – 8 eset: 8/36 = 2/9.'
  },
  {
    id: 'prr-q15',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok szorzata páros?',
    options: ['3/4', '1/2', '1/4', '2/3'],
    correctAnswer: 0,
    explanation: 'A szorzat csak akkor páratlan, ha mindkét szám páratlan: 3 · 3 = 9 eset. Így P(páros) = 1 − 9/36 = 27/36 = 3/4.'
  },
  {
    id: 'prr-q16',
    level: 2,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok szorzata prímszám?',
    options: ['1/6', '1/12', '1/4', '1/2'],
    correctAnswer: 0,
    explanation: 'A szorzat csak akkor prím, ha az egyik szám 1, a másik prím: (1;2), (1;3), (1;5) és fordítva – 6 eset: 6/36 = 1/6.'
  },
  {
    id: 'prr-q17',
    level: 2,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott szám relatív prím a 30-hoz?',
    figure: <DieFacesFig />,
    options: ['1/6', '1/3', '1/2', '0'],
    correctAnswer: 0,
    explanation: '30 = 2 · 3 · 5. A 2, 3, 4, 5, 6 mindegyikének van közös prímosztója a 30-cal, csak az 1 relatív prím hozzá: 1/6.'
  },
  {
    id: 'prr-q18',
    level: 2,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy a dobott szám faktoriálisa páros?',
    options: ['5/6', '1/2', '2/3', '1'],
    correctAnswer: 0,
    explanation: '1! = 1 páratlan, de 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720 mind páros: 5/6.'
  },
  {
    id: 'prr-q19',
    level: 2,
    questionTypeBadge: 'Venn-diagram',
    question: 'Véletlenszerűen kiválasztjuk 60 egyik pozitív osztóját. Mennyi a valószínűsége, hogy 56-nak is osztója?',
    figure: <VennFig />,
    options: ['1/4', '3/8', '3/17', '1/3'],
    correctAnswer: 0,
    explanation: '60-nak 12 pozitív osztója van, ezek közül 1, 2, 4 osztója 56-nak is: 3/12 = 1/4.'
  },
  {
    id: 'prr-q20',
    level: 2,
    questionTypeBadge: 'Venn-diagram',
    question: 'Véletlenszerűen kiválasztjuk 56 egyik pozitív osztóját. Mennyi a valószínűsége, hogy 60-nak is osztója?',
    figure: <VennFig />,
    options: ['3/8', '1/4', '3/17', '1/2'],
    correctAnswer: 0,
    explanation: '56 osztói: 1, 2, 4, 7, 8, 14, 28, 56 (8 db), ezek közül 1, 2, 4 osztója 60-nak: 3/8.'
  },

  // LEVEL 3
  {
    id: 'prr-q21',
    level: 3,
    questionTypeBadge: 'Venn-diagram',
    question: 'Véletlenszerűen kiválasztunk egy számot 56 vagy 60 pozitív osztói közül (minden szám egyszer szerepel). Mennyi a valószínűsége, hogy 56-nak és 60-nak is osztója?',
    figure: <VennFig />,
    options: ['3/17', '3/20', '1/4', '3/8'],
    correctAnswer: 0,
    explanation: 'A ∪ B elemszáma 12 + 8 − 3 = 17, a közös osztók száma 3: P = 3/17. (3/20 akkor jönne ki, ha a közös osztókat kétszer számolnánk.)'
  },
  {
    id: 'prr-q22',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Két fiú és két lány véletlenszerűen leül négy egymás melletti helyre. Mennyi a valószínűsége, hogy a két lány nem ül egymás mellé?',
    options: ['1/2', '1/3', '2/3', '1/4'],
    correctAnswer: 0,
    explanation: 'Összesen 4! = 24 ültetés. Lányok egymás mellett: 3 · 2 · 2 = 12. Nem egymás mellett: 24 − 12 = 12, P = 1/2.'
  },
  {
    id: 'prr-q23',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy legalább az egyik kockán hatos van?',
    figure: <EmptyGridFig op="" />,
    options: ['11/36', '1/3', '1/6', '25/36'],
    correctAnswer: 0,
    explanation: 'Komplementer: egyik sem hatos 5 · 5 = 25 eset. P = 1 − 25/36 = 11/36. (1/3 = 2/6 hibás, mert a (6;6) kétszer számolódna.)'
  },
  {
    id: 'prr-q24',
    level: 3,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege 7?',
    figure: <EmptyGridFig op="+" />,
    options: ['1/6', '1/12', '7/36', '1/11'],
    correctAnswer: 0,
    explanation: '(1;6), (2;5), (3;4), (4;3), (5;2), (6;1) – 6 eset: 6/36 = 1/6. (1/11 hibás: a 11 lehetséges összeg nem egyformán valószínű.)'
  },
  {
    id: 'prr-q25',
    level: 3,
    questionTypeBadge: 'Pénzérme',
    question: 'Három egyforma pénzérmével dobunk. Mennyi a valószínűsége, hogy legalább egy fej lesz?',
    figure: <CoinsFig n={3} />,
    options: ['7/8', '3/4', '1/2', '2/3'],
    correctAnswer: 0,
    explanation: 'Különböztessük meg az érméket: 2³ = 8 eset. Csak az III-ben nincs fej: P = 1 − 1/8 = 7/8. (3/4 akkor jönne ki, ha a 4 „fej-darabszámot” egyformán valószínűnek vennénk.)'
  },
  {
    id: 'prr-q26',
    level: 3,
    questionTypeBadge: 'Relatív gyakoriság',
    question: 'Két kockával 100-szor dobtak, és egy esemény 46-szor következett be. A dobások szorzatára vonatkozó alábbi események közül melyiknek a valószínűségéhez van legközelebb ez a relatív gyakoriság?',
    options: ['a szorzat nagyobb, mint 10', 'a szorzat páros', 'a szorzat négyzetszám', 'a szorzat prímszám'],
    correctAnswer: 0,
    explanation: 'A relatív gyakoriság 46/100 = 0,46. A valószínűségek: > 10: 17/36 ≈ 0,47; páros: 0,75; négyzetszám: ≈ 0,22; prím: ≈ 0,17.'
  },
  {
    id: 'prr-q27',
    level: 3,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege legalább 10?',
    figure: <EmptyGridFig op="+" />,
    options: ['1/6', '1/12', '1/4', '5/36'],
    correctAnswer: 0,
    explanation: 'Összeg 10: 3 eset, 11: 2 eset, 12: 1 eset – összesen 6: 6/36 = 1/6.'
  },
  {
    id: 'prr-q28',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a két dobott szám különböző?',
    options: ['5/6', '1/6', '2/3', '15/36'],
    correctAnswer: 0,
    explanation: 'Egyforma számok: 6 eset (a táblázat átlója). P(különböző) = 1 − 6/36 = 30/36 = 5/6.'
  },
  {
    id: 'prr-q29',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Öt gyerek – köztük Anna és Bea – véletlenszerűen sorba áll. Mennyi a valószínűsége, hogy Anna és Bea egymás mellett áll?',
    options: ['2/5', '1/5', '1/10', '1/2'],
    correctAnswer: 0,
    explanation: 'Összes sorrend 5! = 120. Annát és Beát egy „blokknak” tekintve 4! = 24 sorrend, a blokkon belül 2-féle: 48. P = 48/120 = 2/5.'
  },
  {
    id: 'prr-q30',
    level: 3,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok szorzata 12?',
    figure: <EmptyGridFig op="·" />,
    options: ['1/9', '1/18', '1/12', '1/6'],
    correctAnswer: 0,
    explanation: '12 = 2 · 6 = 6 · 2 = 3 · 4 = 4 · 3 – 4 eset: 4/36 = 1/9. (1/18 jönne ki, ha a (2;6) és (6;2) párt egynek számolnánk.)'
  }
];

export const ProbabilityReviewQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-valoszinuseg-ismetles-quiz"
      subtopicId="valoszinuseg-ismetles"
      title="7. Valószínűség – ismétlés – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: kockadobás, pénzérme, két kocka 6 × 6-os táblázata, komplementer esemény, kördiagram és Venn-diagram."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={PROBABILITY_REVIEW_QUESTIONS}
      cheatSheets={[
        {
          title: 'Klasszikus valószínűség',
          items: [
            'P(A) = kedvező / összes elemi esemény',
            'csak egyformán valószínű elemi eseményekkel!',
            '0 ≤ P(A) ≤ 1; biztos esemény: 1, lehetetlen: 0',
            'sok kísérletnél: relatív gyakoriság ≈ valószínűség'
          ]
        },
        {
          title: 'Komplementer esemény',
          items: [
            'P(A) = 1 − P(nem A)',
            'legalább egy hatos két kockával: 1 − 25/36 = 11/36',
            'páros szorzat: 1 − 9/36 = 3/4',
            'legalább egy fej 3 érmével: 1 − 1/8 = 7/8'
          ]
        },
        {
          title: 'Két kocka, egyforma tárgyak',
          items: [
            'különböztesd meg a kockákat: 6 · 6 = 36 eset',
            'összeg 7: 6 eset; összeg ≥ 10: 6 eset',
            'egyforma számok: 6 eset (átló)',
            'egyforma érméket, golyókat is jelöld meg gondolatban'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ProbabilityReviewMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ProbabilityReviewSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ProbabilityReviewQuiz;
