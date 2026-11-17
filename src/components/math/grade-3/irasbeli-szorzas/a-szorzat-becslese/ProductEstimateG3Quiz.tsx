import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ProductEstimateG3Matcher } from './ProductEstimateG3Matcher';
import { ProductEstimateG3Sorter } from './ProductEstimateG3Sorter';
import { TagQ, CardsQ } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';
import { EstLineQ, BarsQ } from './ProductEstimateG3Parts';

// ---------------------------------------------------------------------------
// Kérdések – kerekítés: 5-től felfelé. Minden szám legfeljebb 1000.
// ---------------------------------------------------------------------------
export const PRODUCT_ESTIMATE_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'est-q1',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <EstLineQ v={236} to={10} caption="Tízesre: 236 ≈ ?" />,
    question: 'Kerekítsd tízesre! 236 ≈ ?',
    options: ['240', '230', '200', '300'],
    correctAnswer: 0,
    explanation: 'A 236 a 230 és a 240 között van. A 240-hez van közelebb. 236 ≈ 240.'
  },
  {
    id: 'est-q2',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <EstLineQ v={236} to={100} caption="Százasra: 236 ≈ ?" />,
    question: 'Kerekítsd százasra! 236 ≈ ?',
    options: ['200', '300', '240', '100'],
    correctAnswer: 0,
    explanation: 'A 236 a 200 és a 300 között van. A közepe a 250. A 236 előtte van, ezért 236 ≈ 200.'
  },
  {
    id: 'est-q3',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <EstLineQ v={345} to={10} caption="Tízesre: 345 ≈ ?" />,
    question: 'Kerekítsd tízesre! 345 ≈ ?',
    options: ['350', '340', '300', '400'],
    correctAnswer: 0,
    explanation: 'A 345 pont a 340 és a 350 közepén van. Ilyenkor felfelé kerekítünk: 345 ≈ 350.'
  },
  {
    id: 'est-q4',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <EstLineQ v={187} to={100} caption="Százasra: 187 ≈ ?" />,
    question: 'Kerekítsd százasra! 187 ≈ ?',
    options: ['200', '100', '190', '180'],
    correctAnswer: 0,
    explanation: 'A 187 a 150 után van, ezért a 200-hoz van közelebb. 187 ≈ 200.'
  },
  {
    id: 'est-q5',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Becsüljük meg: 214 · 3. Melyik számot kerekítjük?',
    options: ['a 214-et', 'a 3-at', 'mindkettőt', 'egyiket sem'],
    correctAnswer: 0,
    explanation: 'A háromjegyű számot kerekítjük: 214 ≈ 210. Az egyjegyű 3 marad.'
  },
  {
    id: 'est-q6',
    level: 1,
    questionTypeBadge: 'Jelek',
    question: 'Mit jelent ez a jel: ≈ ?',
    options: ['körülbelül egyenlő', 'pontosan egyenlő', 'nagyobb', 'kisebb'],
    correctAnswer: 0,
    explanation: 'A ≈ jel azt jelenti: körülbelül egyenlő. Például 236 ≈ 240.'
  },
  {
    id: 'est-q7',
    level: 1,
    questionTypeBadge: 'Becslés százasra',
    figure: <EstLineQ v={312} to={100} caption="312 · 3 ≈ ? · 3" />,
    question: 'Becsüld meg százasra kerekítve! 312 · 3 ≈ ?',
    options: ['900', '930', '600', '1000'],
    correctAnswer: 0,
    explanation: '312 ≈ 300. 300 · 3 = 900. Tehát 312 · 3 ≈ 900.'
  },
  {
    id: 'est-q8',
    level: 1,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstLineQ v={118} to={10} caption="118 · 4 ≈ ? · 4" />,
    question: 'Becsüld meg tízesre kerekítve! 118 · 4 ≈ ?',
    options: ['480', '400', '440', '122'],
    correctAnswer: 0,
    explanation: '118 ≈ 120. 120 · 4 = 480. Tehát 118 · 4 ≈ 480.'
  },
  {
    id: 'est-q9',
    level: 1,
    questionTypeBadge: 'Vásárlás',
    figure: <TagQ price="195 Ft" m={2} kind="book" caption="2 füzet ≈ ? Ft" />,
    question: 'Egy füzet 195 Ft. Körülbelül mennyibe kerül 2 füzet? Kerekíts tízesre!',
    options: ['400 Ft', '380 Ft', '200 Ft', '360 Ft'],
    correctAnswer: 0,
    explanation: '195 pont a 190 és a 200 közepén van, ezért 195 ≈ 200. 200 · 2 = 400 Ft.'
  },
  {
    id: 'est-q10',
    level: 1,
    questionTypeBadge: 'Becslés százasra',
    figure: <EstLineQ v={410} to={100} caption="2 · 410 ≈ ?" />,
    question: 'Becsüld meg százasra kerekítve! 2 · 410 ≈ ?',
    options: ['800', '1000', '410', '600'],
    correctAnswer: 0,
    explanation: '410 ≈ 400. 2 · 400 = 800.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'est-q11',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstLineQ v={125} to={10} caption="125 · 3 ≈ ?" />,
    question: 'Becsüld meg tízesre kerekítve! 125 · 3 ≈ ?',
    options: ['390', '360', '300', '450'],
    correctAnswer: 0,
    explanation: 'A 125 pont középen van, ezért felfelé kerekítünk: 125 ≈ 130. 130 · 3 = 390.'
  },
  {
    id: 'est-q12',
    level: 2,
    questionTypeBadge: 'Becslés százasra',
    figure: <EstLineQ v={250} to={100} caption="250 · 3 ≈ ?" />,
    question: 'Becsüld meg százasra kerekítve! 250 · 3 ≈ ?',
    options: ['900', '600', '750', '800'],
    correctAnswer: 0,
    explanation: 'A 250 pont a 200 és a 300 közepén van. Felfelé kerekítünk: 250 ≈ 300. 300 · 3 = 900.'
  },
  {
    id: 'est-q13',
    level: 2,
    questionTypeBadge: 'Melyik pontosabb?',
    figure: <EstLineQ v={263} to={10} caption="263 · 3 = 789" />,
    question: '263 · 3 = 789. Melyik becslés van a legközelebb a pontos szorzathoz?',
    options: ['260 · 3 = 780', '270 · 3 = 810', '300 · 3 = 900', '200 · 3 = 600'],
    correctAnswer: 0,
    explanation: 'A 263 tízesre kerekítve 260. 780 csak 9-cel kevesebb, mint 789. Ez a legjobb becslés.'
  },
  {
    id: 'est-q14',
    level: 2,
    questionTypeBadge: 'Több vagy kevesebb?',
    figure: <EstLineQ v={214} to={10} caption="214 · 3 ≈ 210 · 3 = 630" />,
    question: 'Becslés: 214 · 3 ≈ 210 · 3 = 630. A pontos szorzat több vagy kevesebb, mint 630?',
    options: ['több', 'kevesebb', 'pont annyi', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A 214-et lefelé kerekítettük 210-re. Ezért a pontos szorzat több lesz: 214 · 3 = 642.'
  },
  {
    id: 'est-q15',
    level: 2,
    questionTypeBadge: 'Több vagy kevesebb?',
    figure: <EstLineQ v={157} to={10} caption="157 · 2 ≈ 160 · 2 = 320" />,
    question: 'Becslés: 157 · 2 ≈ 160 · 2 = 320. Mit tudsz a pontos szorzatról?',
    options: ['kevesebb, mint 320', 'több, mint 320', 'pont 320', 'több, mint 400'],
    correctAnswer: 0,
    explanation: 'A 157-et felfelé kerekítettük 160-ra. Ezért a pontos szorzat kevesebb: 157 · 2 = 314.'
  },
  {
    id: 'est-q16',
    level: 2,
    questionTypeBadge: 'Vásárlás',
    figure: <TagQ price="185 Ft" m={4} kind="cake" caption="Százasra: 4 db ≈ ? Ft" />,
    question: 'Egy sütemény 185 Ft. Körülbelül mennyibe kerül 4 sütemény? Kerekíts százasra!',
    options: ['800 Ft', '400 Ft', '760 Ft', '600 Ft'],
    correctAnswer: 0,
    explanation: '185 ≈ 200. 200 · 4 = 800 Ft. (Tízesre kerekítve 190 · 4 = 760 Ft lenne.)'
  },
  {
    id: 'est-q17',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    question: 'Melyik szorzat becsült értéke 600? Kerekíts tízesre!',
    options: ['304 · 2', '312 · 2', '206 · 3', '296 · 3'],
    correctAnswer: 0,
    explanation: '304 ≈ 300, 300 · 2 = 600. (312 · 2 ≈ 620, 206 · 3 ≈ 630, 296 · 3 ≈ 900.)'
  },
  {
    id: 'est-q18',
    level: 2,
    questionTypeBadge: 'Két becslés',
    figure: (
      <BarsQ
        max={500}
        bars={[
          { label: 'százasra', v: 400, text: '400', color: '#fecaca' },
          { label: 'tízesre', v: 480, text: '480', color: '#bae6fd' }
        ]}
      />
    ),
    question: '244 · 2. Százasra kerekítve 400, tízesre kerekítve 480. Mennyi a két becslés különbsége?',
    options: ['80', '40', '880', '120'],
    correctAnswer: 0,
    explanation: '480 − 400 = 80. A tízesre kerekített becslés 80-nal több.'
  },
  {
    id: 'est-q19',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    figure: <CardsQ cards={['198 · 4', '492']} mid="=" w={84} />,
    question: 'Valaki ezt írta: 198 · 4 = 492. Becsléssel nézd meg! Jó ez?',
    options: ['Nem jó, kb. 800 kell legyen.', 'Jó, mert 198 ≈ 200.', 'Nem jó, kb. 400 kell legyen.', 'Jó, mert 4 · 8 = 32.'],
    correctAnswer: 0,
    explanation: '198 ≈ 200, és 200 · 4 = 800. A 492 nagyon messze van a 800-tól, ezért hibás. (Pontosan: 792.)'
  },
  {
    id: 'est-q20',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstLineQ v={165} to={10} caption="165 · 5 ≈ ?" />,
    question: 'Becsüld meg tízesre kerekítve! 165 · 5 ≈ ?',
    options: ['850', '800', '1000', '650'],
    correctAnswer: 0,
    explanation: 'A 165 pont középen van, ezért 165 ≈ 170. 170 · 5 = 850.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'est-q21',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    figure: <TagQ price="235 Ft" m={4} kind="bear" caption="Van 1000 Ft-od." />,
    question: 'Egy kis maci 235 Ft. Van 1000 Ft-od. Elég 4 macira? Becsülj tízesre!',
    options: ['Igen, elég.', 'Nem elég.', 'Pont 1000 Ft kell.', 'Csak 3 macira elég.'],
    correctAnswer: 0,
    explanation: '235 ≈ 240, 240 · 4 = 960. Felfelé kerekítettünk, a pontos ár még kevesebb (940 Ft). Elég a pénz.'
  },
  {
    id: 'est-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az állatkertben hétfőn 312 látogató volt, szombaton 3-szor annyi. Körülbelül hány látogató volt szombaton? Becsülj tízesre!',
    options: ['930', '900', '960', '315'],
    correctAnswer: 0,
    explanation: '312 ≈ 310. 310 · 3 = 930. Szombaton körülbelül 930 látogató volt.'
  },
  {
    id: 'est-q23',
    level: 3,
    questionTypeBadge: 'Két becslés',
    figure: <EstLineQ v={128} to={10} caption="128 · 4" />,
    question: 'Egy dobozban 128 gyöngy van. Becsüld meg, hány gyöngy van 4 dobozban! Százasra és tízesre is!',
    options: ['kb. 400 és kb. 520', 'kb. 400 és kb. 480', 'kb. 500 és kb. 520', 'kb. 800 és kb. 520'],
    correctAnswer: 0,
    explanation: 'Százasra: 128 ≈ 100, 100 · 4 = 400. Tízesre: 128 ≈ 130, 130 · 4 = 520.'
  },
  {
    id: 'est-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <CardsQ cards={['205 Ft · 2', '118 Ft · 3']} w={100} />,
    question: 'Egy kifestő 205 Ft, egy zsírkréta 118 Ft. Veszel 2 kifestőt és 3 zsírkrétát. Körülbelül mennyit fizetsz? Becsülj tízesre!',
    options: ['780 Ft', '700 Ft', '660 Ft', '990 Ft'],
    correctAnswer: 0,
    explanation: '205 ≈ 210, 210 · 2 = 420. 118 ≈ 120, 120 · 3 = 360. 420 + 360 = 780 Ft.'
  },
  {
    id: 'est-q25',
    level: 3,
    questionTypeBadge: 'Becslés',
    question: 'Melyik szorzat van körülbelül 700? Becsülj tízesre!',
    options: ['228 · 3', '182 · 3', '328 · 3', '228 · 2'],
    correctAnswer: 0,
    explanation: '228 ≈ 230, 230 · 3 = 690. Ez van közel a 700-hoz. (182 · 3 ≈ 540, 328 · 3 ≈ 990, 228 · 2 ≈ 460.)'
  },
  {
    id: 'est-q26',
    level: 3,
    questionTypeBadge: 'Fel vagy le?',
    question: 'Melyik szorzásnál lesz a tízesre kerekített becslés TÖBB a pontos szorzatnál?',
    options: ['146 · 3', '213 · 4', '321 · 2', '132 · 3'],
    correctAnswer: 0,
    explanation: 'Csak a 146-ot kerekítjük felfelé (150-re). Ezért ott a becslés több: 150 · 3 = 450, pontosan 438.'
  },
  {
    id: 'est-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <EstLineQ v={187} to={10} caption="187 · 4 ≈ ?" />,
    question: 'A bábszínházban 4 előadás lesz. Mindegyikre 187 jegyet adtak el. Körülbelül hány jegy kelt el? Becsülj tízesre!',
    options: ['760', '800', '720', '191'],
    correctAnswer: 0,
    explanation: '187 ≈ 190. 190 · 4 = 760. Körülbelül 760 jegy kelt el.'
  },
  {
    id: 'est-q28',
    level: 3,
    questionTypeBadge: 'Ellenőrzés',
    figure: <CardsQ cards={['312 · 3', '636']} mid="=" w={84} />,
    question: 'Valaki ezt számolta: 312 · 3 = 636. Becsléssel nézd meg! Mit mondasz?',
    options: ['Hibás, kb. 930 kell legyen.', 'Jó, mert 2 · 3 = 6.', 'Jó, mert 312 ≈ 300.', 'Hibás, kb. 600 kell legyen.'],
    correctAnswer: 0,
    explanation: '312 ≈ 310, 310 · 3 = 930. A 636 nagyon messze van, tehát hibás. (Pontosan: 936.)'
  },
  {
    id: 'est-q29',
    level: 3,
    questionTypeBadge: 'Két becslés',
    figure: <TagQ price="245 Ft" m={3} kind="book" caption="3 könyv ≈ ? Ft" />,
    question: 'Egy könyv 245 Ft. Becsüld meg 3 könyv árát százasra és tízesre is! Mennyi a két becslés különbsége?',
    options: ['150 Ft', '50 Ft', '100 Ft', '750 Ft'],
    correctAnswer: 0,
    explanation: 'Százasra: 245 ≈ 200, 200 · 3 = 600. Tízesre: 245 ≈ 250, 250 · 3 = 750. 750 − 600 = 150 Ft.'
  },
  {
    id: 'est-q30',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    question: 'Van 600 Ft-od. Melyik vásárlásra elég biztosan? Becsülj tízesre!',
    options: ['3 db 186 Ft-os', '3 db 214 Ft-os', '2 db 312 Ft-os', '4 db 162 Ft-os'],
    correctAnswer: 0,
    explanation: '186 ≈ 190, 190 · 3 = 570. Felfelé kerekítettünk, a pontos ár még kevesebb. A többi becslés 600 fölött van (630, 620, 640).'
  }
];

export const ProductEstimateG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-szorzas"
    topicId="g3-wmul-becsles-quiz"
    subtopicId="a-szorzat-becslese"
    title="2. A szorzat becslése – Kvíz"
    subtitle="30 feladat 3 szinten: kerekítés tízesre és százasra, becslés, több vagy kevesebb, elég a pénz, ellenőrzés becsléssel."
    badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • KVÍZ"
    questions={PRODUCT_ESTIMATE_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Kerekítés', items: ['5-től felfelé: 345 ≈ 350', 'Tízesre: 236 ≈ 240', 'Százasra: 236 ≈ 200'] },
      { title: 'Becslés', items: ['Csak a háromjegyű számot kerekítsd!', '236 · 3 ≈ 240 · 3 = 720', 'A tízesre kerekítés pontosabb.'] },
      { title: 'Több vagy kevesebb?', items: ['Lefelé kerekítettél → a pontos több.', 'Felfelé kerekítettél → a pontos kevesebb.', 'Messze van a becsléstől? Számold újra!'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<ProductEstimateG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<ProductEstimateG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default ProductEstimateG3Quiz;
