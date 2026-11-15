import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatisticsPracticeMatcher } from './StatisticsPracticeMatcher';
import { StatisticsPracticeSorter } from './StatisticsPracticeSorter';
import { StatisticsPracticePieChart, StatisticsPracticeBoxPlot, STATISTICS_PRACTICE_AGE_DATA } from './StatisticsPracticeFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Az 1. feladat kördiagramja kicsiben. */
const AgePieFig: React.FC = () => (
  <svg viewBox="0 0 240 200" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="196" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <StatisticsPracticePieChart
      data={STATISTICS_PRACTICE_AGE_DATA.map((d) => ({ label: `${d.age} év`, pct: d.pct, color: d.color }))}
      cx={120}
      cy={104}
      r={62}
      fontSize={10}
    />
  </svg>
);

/** Dobozdiagram a HF 2. adatsoráról; a kérdezett mennyiség nincs kiírva. */
const MissingBoxFig: React.FC = () => (
  <svg viewBox="0 0 260 120" className={FIG_CLASS}>
    <rect x="2" y="2" width="256" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <StatisticsPracticeBoxPlot min={15} q1={17} med={20} q3={20.5} max={22} axisFrom={14} axisTo={23} x0={18} x1={242} y={44} />
  </svg>
);

/** Íjászverseny: 20 lövés pontszámainak oszlopdiagramja. */
const ArcheryFig: React.FC = () => {
  const freq: [number, number][] = [
    [7, 2],
    [8, 5],
    [9, 8],
    [10, 5]
  ];
  const base = 140;
  return (
    <svg viewBox="0 0 240 170" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="166" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="34" y1={base} x2="226" y2={base} stroke="#475569" />
      <line x1="34" y1={base} x2="34" y2="16" stroke="#475569" />
      {[0, 2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line x1="30" y1={base - v * 14} x2="226" y2={base - v * 14} stroke="#e2e8f0" />
          <text x="26" y={base - v * 14 + 4} fontSize="9" textAnchor="end" fill="#334155">{v}</text>
        </g>
      ))}
      {freq.map(([score, f], i) => (
        <g key={score}>
          <rect x={52 + i * 44} y={base - f * 14} width="28" height={f * 14} fill="#38bdf8" stroke="#0284c7" />
          <text x={66 + i * 44} y={base + 14} fontSize="10" textAnchor="middle" fill="#334155">{score} pont</text>
        </g>
      ))}
      <text x="130" y="164" fontSize="9" textAnchor="middle" fill="#475569">gyakoriság (20 lövés)</text>
    </svg>
  );
};

const STATISTICS_PRACTICE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'stp-q1',
    level: 1,
    questionTypeBadge: 'Átlag',
    question: 'Egy kosárlabdacsapat öt mérkőzésen 77, 60, 83, 73 és 90 pontot szerzett. Mennyi a pontszámok átlaga?',
    options: ['76,6', '77', '73', '75'],
    correctAnswer: 0,
    explanation: '(77 + 60 + 83 + 73 + 90) / 5 = 383 / 5 = 76,6. (A 77 a medián.)'
  },
  {
    id: 'stp-q2',
    level: 1,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5 számok mediánja?',
    options: ['5,5', '5', '6', '5,67'],
    correctAnswer: 0,
    explanation: 'Rendezve: 1, 2, 4, 5, 5, 5, 6, 6, 6, 7, 10, 11. Páros elemszám: a két középső (6. és 7.) átlaga (5 + 6) / 2 = 5,5. (5,67 az átlag.)'
  },
  {
    id: 'stp-q3',
    level: 1,
    questionTypeBadge: 'Módusz',
    question: 'Mi a 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5 számok módusza?',
    options: ['az 5 és a 6 is módusz', 'csak az 5', 'csak a 6', '5,5'],
    correctAnswer: 0,
    explanation: 'Az 5 és a 6 is háromszor fordul elő, a többi szám ritkábban – így két módusz van: {5; 6}.'
  },
  {
    id: 'stp-q4',
    level: 1,
    questionTypeBadge: 'Kördiagram',
    question: 'A kördiagram egy gimnázium diákjainak életkor szerinti megoszlását mutatja. Mennyi az életkorok terjedelme?',
    figure: <AgePieFig />,
    options: ['6 év', '7 év', '17 év', '23%'],
    correctAnswer: 0,
    explanation: 'Terjedelem = legnagyobb − legkisebb adat = 20 − 14 = 6 év. (7 a különböző életkorok száma.)'
  },
  {
    id: 'stp-q5',
    level: 1,
    questionTypeBadge: 'Kördiagram',
    question: 'A kördiagram alapján mennyi a diákok életkorának módusza?',
    figure: <AgePieFig />,
    options: ['16 év', '17 év', '14 év', '20 év'],
    correctAnswer: 0,
    explanation: 'A módusz a leggyakoribb adat, ez a legnagyobb szelet: a 16 évesek (23%).'
  },
  {
    id: 'stp-q6',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Melyik mutató jellemzi az adatok szóródását (az átlagtól való eltérését)?',
    options: ['a szórás', 'a medián', 'a módusz', 'az átlag'],
    correctAnswer: 0,
    explanation: 'A medián, a módusz és az átlag középértékek. A szórás az adatok átlagtól való eltérését méri.'
  },
  {
    id: 'stp-q7',
    level: 1,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Mennyi a dobozdiagramon ábrázolt adatsokaság félterjedelme?',
    figure: <MissingBoxFig />,
    options: ['3,5', '7', '3', '20'],
    correctAnswer: 0,
    explanation: 'A félterjedelem a doboz szélessége: Q3 − Q1 = 20,5 − 17 = 3,5. (7 a terjedelem, 3 = Me − Q1.)'
  },
  {
    id: 'stp-q8',
    level: 1,
    questionTypeBadge: 'Hiányzó adat',
    question: 'A csapat 5 mérkőzésen 77, 60, 83, 73 és 90 pontot szerzett. Hány pontot kell szereznie a 6. mérkőzésen, hogy a hat mérkőzés átlaga 75 legyen?',
    options: ['67', '75', '76,6', '90'],
    correctAnswer: 0,
    explanation: '6 · 75 = 450 pont kell összesen, eddig 383 van, így 450 − 383 = 67 pont kell.'
  },
  {
    id: 'stp-q9',
    level: 1,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a szórása annak az adatsokaságnak, amelyben minden adat 7?',
    options: ['0', '7', '1', '49'],
    correctAnswer: 0,
    explanation: 'Ha minden adat egyenlő, mindegyik eltérés az átlagtól 0, ezért a szórás 0.'
  },
  {
    id: 'stp-q10',
    level: 1,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a 18, 21, 15, 20, 20, 18, 16, 22, 20 adatok mediánja?',
    options: ['20', '18', '18,89', '21'],
    correctAnswer: 0,
    explanation: 'Rendezve: 15, 16, 18, 18, 20, 20, 20, 21, 22 – kilenc adatnál az 5. elem a medián: 20. (18,89 az átlag.)'
  },

  // LEVEL 2
  {
    id: 'stp-q11',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Mennyi az 1, 2, 3, 3, 4, 5, 5, 6, 6 adatsor alsó kvartilise (a tankönyvi módszerrel)?',
    options: ['2,5', '3', '2', '3,5'],
    correctAnswer: 0,
    explanation: 'Kilenc adat: a medián (4) kimarad, az alsó fél 1, 2, 3, 3, ennek mediánja (2 + 3) / 2 = 2,5.'
  },
  {
    id: 'stp-q12',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Mennyi az 1, 2, 3, 3, 4, 5, 5, 6, 6, 7 adatsor felső kvartilise?',
    options: ['6', '5,5', '6,5', '5'],
    correctAnswer: 0,
    explanation: 'Tíz adat: a felső fél 5, 5, 6, 6, 7, ennek mediánja a 6.'
  },
  {
    id: 'stp-q13',
    level: 2,
    questionTypeBadge: 'Medián',
    question: 'Melyik a legnagyobb szám a 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5 közül, amelynek elhagyásával a megmaradt 11 szám mediánja 6?',
    options: ['5', '6', '4', '11'],
    correctAnswer: 0,
    explanation: 'Rendezve 1, 2, 4, 5, 5, 5, 6, 6, 6, 7, 10, 11. 11 adatnál a 6. elem a medián; ez csak akkor 6, ha 6-nál kisebbet hagyunk el – a legnagyobb ilyen az 5. Egy 6-os elhagyásakor a medián 5.'
  },
  {
    id: 'stp-q14',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Melyik a legnagyobb szám a 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5 közül, amelynek elhagyásával a megmaradt 11 szám alsó kvartilise 4?',
    options: ['11', '4', '5', '2'],
    correctAnswer: 0,
    explanation: '11 adatnál Q1 a 3. elem. Ha 4-nél nagyobbat hagyunk el, az első három elem 1, 2, 4 marad, így Q1 = 4 – a legnagyobb ilyen szám a 11.'
  },
  {
    id: 'stp-q15',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Melyik a legnagyobb szám a 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5 közül, amelynek elhagyásával a megmaradt 11 szám felső kvartilise 7?',
    options: ['6', '7', '10', '5'],
    correctAnswer: 0,
    explanation: '11 adatnál Q3 a 9. elem. Rendezve a 9. elem 6, a 10. a 7; a 7 akkor kerül a 9. helyre, ha egy 7 előtti számot hagyunk el – a legnagyobb ilyen a 6.'
  },
  {
    id: 'stp-q16',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 2, 4, 4, 4, 5, 5, 7, 9 adatsokaság szórása?',
    options: ['2', '4', '1,5', '5'],
    correctAnswer: 0,
    explanation: 'Átlag 40 / 8 = 5. Eltérésnégyzetek: 9, 1, 1, 1, 0, 0, 4, 16, összegük 32, így σ² = 32 / 8 = 4, σ = 2. (4 a szórásnégyzet, 5 az átlag.)'
  },
  {
    id: 'stp-q17',
    level: 2,
    questionTypeBadge: 'Változások',
    question: 'Egy adatsokaság minden adatához 3-at adunk. Mi történik az átlaggal és a szórással?',
    options: ['az átlag 3-mal nő, a szórás nem változik', 'mindkettő 3-mal nő', 'az átlag nem változik, a szórás 3-mal nő', 'az átlag 3-mal nő, a szórás 3-szorosára nő'],
    correctAnswer: 0,
    explanation: 'Minden adat és így az átlag is 3-mal tolódik el, az átlagtól való eltérések változatlanok, ezért a szórás sem változik.'
  },
  {
    id: 'stp-q18',
    level: 2,
    questionTypeBadge: 'Változások',
    question: 'Egy adatsokaság szórása 2. Minden adatot megkétszerezünk. Mennyi lesz az új szórás?',
    options: ['4', '2', '8', '16'],
    correctAnswer: 0,
    explanation: 'Minden eltérés kétszeres lesz, így a szórás is kétszeres: 2 · 2 = 4. (A szórásnégyzet négyszeres: 16.)'
  },
  {
    id: 'stp-q19',
    level: 2,
    questionTypeBadge: 'Oszlopdiagram',
    question: 'Egy íjász 20 lövésének pontszámait mutatja az oszlopdiagram. Mennyi a találatok átlaga?',
    figure: <ArcheryFig />,
    options: ['8,8', '9', '8,5', '9,5'],
    correctAnswer: 0,
    explanation: '(7 · 2 + 8 · 5 + 9 · 8 + 10 · 5) / 20 = (14 + 40 + 72 + 50) / 20 = 176 / 20 = 8,8. (A 9 a medián és a módusz.)'
  },
  {
    id: 'stp-q20',
    level: 2,
    questionTypeBadge: 'Kördiagram',
    question: 'A kördiagram alapján mennyi a diákok életkorának mediánja?',
    figure: <AgePieFig />,
    options: ['16 év', '17 év', '15 év', '16,5 év'],
    correctAnswer: 0,
    explanation: 'Halmozva: 14 év 14%, 15 év 32%, 16 év 55%. Az 50% a 16 évesek közé esik, így a medián 16 év.'
  },

  // LEVEL 3
  {
    id: 'stp-q21',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Milák Kristóf 200 m pillangón: 50 m-es szakaszai 24,66; 28,22; 28,69 és 29,16 s. Mennyi ezen időeredmények szórása?',
    options: ['≈ 1,78 s', '≈ 3,16 s', '≈ 2,05 s', '≈ 27,68 s'],
    correctAnswer: 0,
    explanation: 'Átlag 110,73 / 4 = 27,6825. Eltérésnégyzetek összege ≈ 12,6225, σ² ≈ 3,156, σ ≈ 1,78 s. (3,16 a szórásnégyzet; 2,05 az (n − 1)-gyel osztott, torzítatlan érték.)'
  },
  {
    id: 'stp-q22',
    level: 3,
    questionTypeBadge: 'Részidők',
    question: 'Milák Kristóf részidői: 100 m: 52,88 s; 150 m: 1:21,57. Mennyi idő alatt úszta le a harmadik 50 m-es szakaszt?',
    options: ['28,69 s', '81,57 s', '29,16 s', '28,22 s'],
    correctAnswer: 0,
    explanation: '1:21,57 = 81,57 s, így a szakasz ideje 81,57 − 52,88 = 28,69 s.'
  },
  {
    id: 'stp-q23',
    level: 3,
    questionTypeBadge: 'Hiányzó adat',
    question: 'Egy 9 adatból álló adatsokaság: 18, 21, 15, x, 20, 18, 16, 22, 20. Terjedelme 7, mediánja 20, alsó kvartilise 17, felső kvartilise 20,5. Mennyi x?',
    options: ['20', '19', '21', '18'],
    correctAnswer: 0,
    explanation: 'A medián (5. elem) csak x ≥ 20 esetén 20. Q3 = 20,5 a felső fél (20, x, 21, 22 rendezve) mediánja, ez x = 20-nál teljesül (x = 21-nél 21 lenne).'
  },
  {
    id: 'stp-q24',
    level: 3,
    questionTypeBadge: 'Változások',
    question: 'Az 1, 1, 5, 5 adatsor átlaga 3, szórása 2. Új adatként hozzávesszük az átlagot (3). Mennyi lesz a szórás?',
    options: ['≈ 1,79', '2', '≈ 2,24', '1,6'],
    correctAnswer: 0,
    explanation: 'Az eltérésnégyzetek összege 16 marad, az elemszám 5 lesz: σ′ = √(16/5) ≈ 1,79. A szórás csökken.'
  },
  {
    id: 'stp-q25',
    level: 3,
    questionTypeBadge: 'Érettségi',
    question: 'A vízilabda-kezdőcsapat 6 mezőnyjátékosáról: a legidősebb és a legfiatalabb különbsége 12 év, az egyetlen módusz 22 év, a medián 23 év, az átlag 24 év. Melyik lehet a hat életkor?',
    options: ['19, 22, 22, 24, 26, 31', '20, 22, 22, 24, 25, 31', '19, 22, 22, 23, 27, 31', '19, 22, 23, 23, 26, 31'],
    correctAnswer: 0,
    explanation: 'Összeg 6 · 24 = 144; medián (22 + 24) / 2 = 23; módusz 22; 31 − 19 = 12. A 2. sorban a terjedelem 11, a 3.-ban a medián 22,5, a 4.-ben a módusz 23.'
  },
  {
    id: 'stp-q26',
    level: 3,
    questionTypeBadge: 'Dobozdiagram',
    question: 'A kördiagram adataiból dobozdiagramot készítünk. Hol lesz a doboz két széle (Q1 és Q3)?',
    figure: <AgePieFig />,
    options: ['15 és 17 évnél', '14 és 20 évnél', '15,5 és 17,5 évnél', '16 és 18 évnél'],
    correctAnswer: 0,
    explanation: 'Halmozott gyakoriságok: 14%, 32%, 55%, 76%, … A 25% a 15 évesek közé esik (Q1 = 15), a 75% a 17 évesek közé (Q3 = 17).'
  },
  {
    id: 'stp-q27',
    level: 3,
    questionTypeBadge: 'Súlyozott átlag',
    question: 'A kördiagram alapján mennyi a diákok átlagéletkora?',
    figure: <AgePieFig />,
    options: ['16,43 év', '17 év', '16 év', '16,5 év'],
    correctAnswer: 0,
    explanation: 'Súlyozott átlag: 14 · 0,14 + 15 · 0,18 + 16 · 0,23 + 17 · 0,21 + 18 · 0,10 + 19 · 0,08 + 20 · 0,06 = 16,43. (17 a hét életkor egyszerű átlaga.)'
  },
  {
    id: 'stp-q28',
    level: 3,
    questionTypeBadge: 'Kiugró adat',
    question: 'Egy adatsokaságban Q1 = 17 és Q3 = 20,5. Az alábbiak közül melyik adat számít kiugrónak?',
    options: ['11', '13', '25', '24'],
    correctAnswer: 0,
    explanation: 'Félterjedelem 3,5, ennek másfélszerese 5,25. Kiugró, ami ≤ 17 − 5,25 = 11,75 vagy ≥ 20,5 + 5,25 = 25,75. Csak a 11 ilyen.'
  },
  {
    id: 'stp-q29',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi az oszlopdiagramon ábrázolt 20 lövés pontszámainak szórása? (Az átlag 8,8.)',
    figure: <ArcheryFig />,
    options: ['≈ 0,93', '≈ 0,86', '≈ 1,12', '1,5'],
    correctAnswer: 0,
    explanation: 'Eltérésnégyzetek: 2 · 1,8² + 5 · 0,8² + 8 · 0,2² + 5 · 1,2² = 6,48 + 3,2 + 0,32 + 7,2 = 17,2. σ² = 17,2 / 20 = 0,86, σ ≈ 0,93.'
  },
  {
    id: 'stp-q30',
    level: 3,
    questionTypeBadge: 'Gyakorisági tábla',
    question: 'A 13 fős vízilabdacsapat életkorai: 17 (2 fő), 18, 19, 21, 22 (2 fő), 23, 24 (2 fő), 25, 26, 31 (1-1 fő). Mennyi az átlagéletkor?',
    options: ['≈ 22,2 év', '≈ 22,6 év', '22 év', '28,9 év'],
    correctAnswer: 0,
    explanation: 'Összeg: 34 + 18 + 19 + 21 + 44 + 23 + 48 + 25 + 26 + 31 = 289, 289 / 13 ≈ 22,2. (22,6 a gyakoriságok nélkül számolt átlag, 22 a medián.)'
  }
];

export const StatisticsPracticeQuiz: React.FC<{
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
      topicId="g11-stat-statisztika-gyakorlas-quiz"
      subtopicId="gyakorlas-statisztika"
      title="6. Gyakorlás – Kvíz"
      subtitle="30 vegyes statisztikai feladat 3 nehézségi szinten: középértékek, kvartilisek, dobozdiagram, szórás és érettségi feladatok."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={STATISTICS_PRACTICE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Középértékek',
          items: [
            'átlag = adatok összege / darabszám',
            'súlyozott átlag: Σ (érték · gyakoriság) / Σ gyakoriság',
            'medián: a rendezett sor közepe (páros n: két középső átlaga)',
            'módusz: a leggyakoribb adat (több is lehet)'
          ]
        },
        {
          title: 'Kvartilisek, dobozdiagram',
          items: [
            'a mediánnal kettéosztjuk a sort (páratlan n: a medián kimarad)',
            'Q1 = alsó fél mediánja, Q3 = felső fél mediánja',
            'félterjedelem = Q3 − Q1; terjedelem = max − min',
            'kiugró: ≤ Q1 − 1,5 · (Q3 − Q1) vagy ≥ Q3 + 1,5 · (Q3 − Q1)'
          ]
        },
        {
          title: 'Szórás',
          items: [
            'σ = √( Σ (xᵢ − x̄)² / n )',
            'minden adat + c ⇒ σ nem változik',
            'minden adat · k (k > 0) ⇒ σ is k-szoros',
            'az átlagot hozzávéve: σ′ = σ · √(n / (n + 1))'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatisticsPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <StatisticsPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default StatisticsPracticeQuiz;
