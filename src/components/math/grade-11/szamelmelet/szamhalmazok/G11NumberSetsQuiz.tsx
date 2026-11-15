import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { G11NumberSetsMatcher } from './G11NumberSetsMatcher';
import { G11NumberSetsSorter } from './G11NumberSetsSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Egymásba ágyazott halmazok (Q ⊃ Z ⊃ N); a vizsgált szám a jobb felső sarokban, „?”-lel. */
const VennFig: React.FC<{ value: string }> = ({ value }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="4" y="4" width="232" height="142" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="12" y="30" width="170" height="108" rx="16" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
    <rect x="30" y="50" width="134" height="80" rx="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
    <rect x="52" y="70" width="90" height="52" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="18" y="44" fontSize="10" fontWeight="bold" fill="#065f46">Q</text>
    <text x="36" y="64" fontSize="10" fontWeight="bold" fill="#075985">Z</text>
    <text x="58" y="84" fontSize="10" fontWeight="bold" fill="#5b21b6">N</text>
    <text x="210" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#9f1239">{value}</text>
    <text x="210" y="44" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#9f1239">?</text>
    <text x="10" y="20" fontSize="9" fill="#475569">Hová kerül a szám?</text>
  </svg>
);

const VENN_OPTIONS = ['a természetes számok közé (N)', 'az egész, de nem természetes számok közé', 'a racionális, de nem egész számok közé', 'egyik halmaznak sem eleme'];
const venn = (correct: number): string[] => [VENN_OPTIONS[correct], ...VENN_OPTIONS.filter((_, i) => i !== correct)];

const NUMBER_SETS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'ns-q1',
    level: 1,
    questionTypeBadge: 'Venn-diagram',
    question: 'Hová kerül a 12/2 a Q, Z, N halmazok Venn-diagramján?',
    figure: <VennFig value="12/2" />,
    options: venn(0),
    correctAnswer: 0,
    explanation: '12/2 = 6, ami természetes szám, így a legbelső halmazba (N) kerül – és persze eleme Z-nek és Q-nak is.'
  },
  {
    id: 'ns-q2',
    level: 1,
    questionTypeBadge: 'Venn-diagram',
    question: 'Hová kerül a −5/5 a Q, Z, N halmazok Venn-diagramján?',
    figure: <VennFig value="−5/5" />,
    options: venn(1),
    correctAnswer: 0,
    explanation: '−5/5 = −1, ami egész szám, de nem természetes.'
  },
  {
    id: 'ns-q3',
    level: 1,
    questionTypeBadge: 'Venn-diagram',
    question: 'Hová kerül az 54/45 a Q, Z, N halmazok Venn-diagramján?',
    figure: <VennFig value="54/45" />,
    options: venn(2),
    correctAnswer: 0,
    explanation: '54/45 = 6/5 = 1,2 – racionális, de nem egész szám.'
  },
  {
    id: 'ns-q4',
    level: 1,
    questionTypeBadge: 'Venn-diagram',
    question: 'Hová kerül a √8 a Q, Z, N halmazok Venn-diagramján?',
    figure: <VennFig value="√8" />,
    options: venn(3),
    correctAnswer: 0,
    explanation: 'A √8 = 2√2 irracionális szám, nem írható fel két egész szám hányadosaként, ezért egyik halmaznak sem eleme.'
  },
  {
    id: 'ns-q5',
    level: 1,
    questionTypeBadge: 'Zártság',
    question: 'Melyik alapműveletre NEM zárt a természetes számok halmaza az alábbiak közül?',
    options: ['a kivonásra', 'az összeadásra', 'a szorzásra', 'mindhárom műveletre zárt'],
    correctAnswer: 0,
    explanation: 'Két természetes szám összege és szorzata természetes, de a különbség nem mindig: 1 − 3 = −2.'
  },
  {
    id: 'ns-q6',
    level: 1,
    questionTypeBadge: 'Zártság',
    question: 'Melyik alapműveletre NEM zárt az egész számok halmaza?',
    options: ['az osztásra', 'a kivonásra', 'az összeadásra', 'a szorzásra'],
    correctAnswer: 0,
    explanation: 'Két egész szám hányadosa nem mindig egész: 3 : (−2) = −1,5.'
  },
  {
    id: 'ns-q7',
    level: 1,
    questionTypeBadge: 'Zártság',
    question: 'Melyik állítás igaz a racionális számok halmazára?',
    options: [
      'Zárt mind a négy alapműveletre (0-val nem osztunk).',
      'Csak az összeadásra és a szorzásra zárt.',
      'Az osztásra nem zárt.',
      'A kivonásra nem zárt.'
    ],
    correctAnswer: 0,
    explanation: 'Két racionális szám összege, különbsége, szorzata és (nem 0 osztóval vett) hányadosa is racionális.'
  },
  {
    id: 'ns-q8',
    level: 1,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi a 3/10 tizedes tört alakja?',
    options: ['0,3', '0,3̇', '3,1', '0,03'],
    correctAnswer: 0,
    explanation: '3/10 = 0,3, véges tizedes tört (a nevező 10 = 2 · 5).'
  },
  {
    id: 'ns-q9',
    level: 1,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi a 4/9 tizedes tört alakja?',
    options: ['0,4̇ = 0,444…', '0,49', '0,4', '2,25'],
    correctAnswer: 0,
    explanation: '4 : 9 = 0,444…, végtelen szakaszos tizedes tört, jelölése 0,4̇.'
  },
  {
    id: 'ns-q10',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Melyik számok összessége az egész számok halmaza?',
    options: [
      'amelyek felírhatók két természetes szám különbségeként',
      'amelyek felírhatók két természetes szám hányadosaként',
      'amelyek felírhatók két egész szám hányadosaként',
      'a pozitív számok és a nulla'
    ],
    correctAnswer: 0,
    explanation: 'A kivonás kivezet N-ből; a két természetes szám különbségeként felírható számok alkotják Z-t. (A két egész szám hányadosaként felírhatók Q-t adják.)'
  },

  // LEVEL 2
  {
    id: 'ns-q11',
    level: 2,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi a 13/8 tizedes tört alakja?',
    options: ['1,625', '1,6̇25̇', '1,38', '0,615'],
    correctAnswer: 0,
    explanation: '13/8 = 1625/1000 = 1,625 – véges, mert 8 = 2³.'
  },
  {
    id: 'ns-q12',
    level: 2,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi a 10/12 tizedes tört alakja?',
    options: ['0,83̇ = 0,8333…', '0,8̇3̇ = 0,8383…', '0,83', '1,2'],
    correctAnswer: 0,
    explanation: '10/12 = 5/6 = 0,8333…, csak a 3-as ismétlődik: 0,83̇.'
  },
  {
    id: 'ns-q13',
    level: 2,
    questionTypeBadge: 'Véges / végtelen',
    question: 'Melyik tört tizedes tört alakja véges?',
    options: ['7/25', '5/6', '4/9', '17/11'],
    correctAnswer: 0,
    explanation: '25 = 5², csak 5 prímtényező: 7/25 = 28/100 = 0,28. A többi nevezőben 3 vagy 11 is van.'
  },
  {
    id: 'ns-q14',
    level: 2,
    questionTypeBadge: 'Véges / végtelen',
    question: 'Melyik tört tizedes tört alakja végtelen szakaszos?',
    options: ['25/15', '45/72', '39/52', '13/20'],
    correctAnswer: 0,
    explanation: '25/15 = 5/3, a 3 miatt végtelen szakaszos (1,6̇). 45/72 = 5/8, 39/52 = 3/4, 13/20 – mind véges.'
  },
  {
    id: 'ns-q15',
    level: 2,
    questionTypeBadge: 'Véges / végtelen',
    question: 'A 28 = 2² · 7. Milyen a 21/28 tizedes tört alakja?',
    options: ['véges: 0,75', 'végtelen szakaszos a 7 miatt', 'végtelen, nem szakaszos', '0,7̇5̇'],
    correctAnswer: 0,
    explanation: 'Előbb egyszerűsíteni kell: 21/28 = 3/4, a nevező 2², így véges: 0,75.'
  },
  {
    id: 'ns-q16',
    level: 2,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Mennyi 0,9̇ = 0,999… értéke?',
    options: ['pontosan 1', '0,9', 'kicsit kevesebb 1-nél, de nem 1', 'nem racionális szám'],
    correctAnswer: 0,
    explanation: '0,9̇ = 9 · 0,1̇ = 9 · 1/9 = 1.'
  },
  {
    id: 'ns-q17',
    level: 2,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Igaz-e: „Bármely két, nullától különböző egész szám hányadosa egész szám”?',
    options: ['hamis, pl. 3 : (−2) = −1,5', 'igaz', 'csak pozitív számokra igaz', 'hamis, mert 0-val nem osztunk'],
    correctAnswer: 0,
    explanation: 'Egyetlen ellenpélda is elég: 3 : (−2) = −1,5 nem egész.'
  },
  {
    id: 'ns-q18',
    level: 2,
    questionTypeBadge: 'Műveletek',
    question: 'Melyik két különböző előjelű egész szám hányadosa egész szám?',
    options: ['−9 és 3', '−4 és 3', '−9 és 2', '3 és 100'],
    correctAnswer: 0,
    explanation: '−9 : 3 = −3 egész. −4 : 3 és −9 : 2 nem egész, a 3 és 100 pedig azonos előjelű.'
  },
  {
    id: 'ns-q19',
    level: 2,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi a 63/35 tizedes tört alakja?',
    options: ['1,8', '1,8̇', '0,5̇', '1,2'],
    correctAnswer: 0,
    explanation: '63/35 = 9/5 = 18/10 = 1,8.'
  },
  {
    id: 'ns-q20',
    level: 2,
    questionTypeBadge: 'Tizedes tört',
    question: 'Mennyi a 3/60 tizedes tört alakja?',
    options: ['0,05', '0,05̇', '0,5', '0,2'],
    correctAnswer: 0,
    explanation: '3/60 = 1/20 = 5/100 = 0,05 (20 = 2² · 5).'
  },

  // LEVEL 3
  {
    id: 'ns-q21',
    level: 3,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Mennyi a 2111/990 tizedes tört alakja?',
    options: ['2,13̇2̇ = 2,13232…', '2,1̇3̇ = 2,1313…', '2,13̇ = 2,1333…', '2,132'],
    correctAnswer: 0,
    explanation: '2111 : 990 = 2,132323…: az 1-es után a „32” ismétlődik, jelölése 2,13̇2̇.'
  },
  {
    id: 'ns-q22',
    level: 3,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Mennyi a 17/11 tizedes tört alakja?',
    options: ['1,5̇4̇ = 1,5454…', '1,54̇ = 1,5444…', '1,5̇ = 1,555…', '1,54'],
    correctAnswer: 0,
    explanation: '17 : 11 = 1,545454…, a szakasz „54”.'
  },
  {
    id: 'ns-q23',
    level: 3,
    questionTypeBadge: 'Szakaszos tört',
    question: 'Mennyi a 18/14 tizedes tört alakja?',
    options: ['1,2̇85714̇', '1,28̇', '1,2̇8̇', '1,285714'],
    correctAnswer: 0,
    explanation: '18/14 = 9/7 = 1,285714285714…, a szakasz hat jegyű: 285714.'
  },
  {
    id: 'ns-q24',
    level: 3,
    questionTypeBadge: 'Felbontás',
    question: 'Hányféleképpen bontható fel a 40 két különböző természetes szám összegére (a sorrendtől eltekintve)?',
    options: ['20', '21', '41', '19'],
    correctAnswer: 0,
    explanation: '0 + 40, 1 + 39, …, 19 + 21: 20 lehetőség (a 20 + 20 nem jó, mert a tagok különbözők).'
  },
  {
    id: 'ns-q25',
    level: 3,
    questionTypeBadge: 'Felbontás',
    question: 'Hányféleképpen bontható fel a 40 két természetes szám szorzatára (a sorrendtől eltekintve)?',
    options: ['4', '8', '5', '3'],
    correctAnswer: 0,
    explanation: '1 · 40, 2 · 20, 4 · 10, 5 · 8 – 4 lehetőség (40-nek 8 osztója van, ezek 4 párt alkotnak).'
  },
  {
    id: 'ns-q26',
    level: 3,
    questionTypeBadge: 'Felbontás',
    question: 'Hányféleképpen írható fel a 40 két különböző előjelű egész szám hányadosaként?',
    options: ['sehogy', '4-féleképpen', '8-féleképpen', 'végtelen sokféleképpen'],
    correctAnswer: 0,
    explanation: 'Különböző előjelű számok hányadosa negatív, a 40 pedig pozitív – nincs ilyen felírás.'
  },
  {
    id: 'ns-q27',
    level: 3,
    questionTypeBadge: 'Feltételek',
    question: 'Mely racionális számok pozitívak, véges tizedes törtek, nevezőjük egyjegyű és 2-vel nagyobb a számlálónál, és a közönséges tört alak egyszerűsíthető?',
    options: ['1/2 (= 2/4) és 3/4 (= 6/8)', 'csak 1/2 (= 2/4)', '1/2, 2/3 és 3/4', '1/3 és 3/5'],
    correctAnswer: 0,
    explanation: 'Jelöltek: 2/4, 4/6, 6/8 (páros számlálóval egyszerűsíthetők). A 4/6 = 2/3 végtelen szakaszos, így 1/2 és 3/4 marad.'
  },
  {
    id: 'ns-q28',
    level: 3,
    questionTypeBadge: 'Szakaszos → tört',
    question: 'Írd fel közönséges tört alakban: A = 24,7̇ = 24,777…',
    options: ['223/9', '247/9', '247/10', '223/10'],
    correctAnswer: 0,
    explanation: '10A = 247,7̇, így 10A − A = 9A = 223, A = 223/9.'
  },
  {
    id: 'ns-q29',
    level: 3,
    questionTypeBadge: 'Szakaszos → tört',
    question: 'Írd fel közönséges tört alakban: L = 13,53̇ = 13,5333…',
    options: ['203/15', '1340/99', '1353/100', '1218/99'],
    correctAnswer: 0,
    explanation: '100L = 1353,3̇ és 10L = 135,3̇, így 90L = 1218, L = 1218/90 = 203/15. (1340/99 = 13,5̇3̇ lenne.)'
  },
  {
    id: 'ns-q30',
    level: 3,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Igaz-e: „Két negatív szám összege kisebb a két szám szorzatánál”?',
    options: [
      'igaz, mert az összeg negatív, a szorzat pozitív',
      'hamis, pl. −1 és −1 esetén',
      'csak egész számokra igaz',
      'csak akkor igaz, ha mindkét szám −1-nél kisebb'
    ],
    correctAnswer: 0,
    explanation: 'Két negatív szám összege negatív, szorzata pozitív, így az összeg mindig kisebb. (−1 és −1: −2 < 1.)'
  }
];

export const G11NumberSetsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId="g11-num-szamhalmazok-quiz"
      subtopicId="szamhalmazok"
      title="1. Számhalmazok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: N, Z, Q és a műveleti zártság, véges és végtelen szakaszos tizedes törtek."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      themeColor="emerald"
      questions={NUMBER_SETS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számhalmazok',
          items: [
            'N = {0; 1; 2; …} ⊂ Z ⊂ Q',
            'Z: két természetes szám különbsége',
            'Q: két egész szám hányadosa',
            'irracionális (pl. √5, √8): egyik halmaznak sem eleme'
          ]
        },
        {
          title: 'Zártság',
          items: [
            'N: zárt +, · (a − és a : kivezet)',
            'Z: zárt +, −, · (a : kivezet)',
            'Q: zárt +, −, ·, : (0-val nem osztunk)',
            'ellenpélda: 1 − 3 = −2; 3 : (−2) = −1,5'
          ]
        },
        {
          title: 'Tizedes tört alak',
          items: [
            'Előbb egyszerűsíts, aztán bontsd fel a nevezőt!',
            'csak 2 és 5 ⇒ véges: 13/8 = 1,625',
            'más prím is ⇒ végtelen szakaszos: 5/6 = 0,83̇',
            '10A − A módszer: 24,7̇ = 223/9; 0,9̇ = 1'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <G11NumberSetsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <G11NumberSetsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default G11NumberSetsQuiz;
