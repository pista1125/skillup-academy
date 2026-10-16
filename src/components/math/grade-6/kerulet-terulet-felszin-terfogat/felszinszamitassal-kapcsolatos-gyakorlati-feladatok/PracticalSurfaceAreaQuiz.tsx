import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PracticalSurfaceAreaMatcher } from './PracticalSurfaceAreaMatcher';
import { PracticalSurfaceAreaSorter } from './PracticalSurfaceAreaSorter';

interface PracticalSurfaceAreaQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-open-solids',
    title: '1. Fedetlen Testek (5 lap)',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Képlet:</strong> A_nyitott = a·b + 2·a·c + 2·b·c</div>
        <div><strong>Gyakori példák:</strong> felül nyitott akvárium, kerti medence, fedél nélküli doboz.</div>
        <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
          1 aljzat + 4 oldalfal = 5 határoló lap!
        </div>
      </div>
    )
  },
  {
    id: 'cs-room-painting',
    title: '2. Szobafestés Lépései',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>1. Falak (4 lap):</strong> T_falak = 2·(a + b)·m</div>
        <div><strong>2. Levonások:</strong> T_nettó = T_falak - T_nyílászárók (ajtó, ablak)</div>
        <div><strong>3. Mennyezet (ha kéri):</strong> T_mennyezet = a·b (a padlót sosem festjük!)</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          Festendő felület = T_nettó falak (+ T_mennyezet)
        </div>
      </div>
    )
  },
  {
    id: 'cs-paint-calculation',
    title: '3. Kiadósság és Vödörszám',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Festékszükséglet:</strong> (Felület · Rétegek) / Kiadósság</div>
        <div><strong>Rétegszám:</strong> általában 2 réteg fedés szükséges!</div>
        <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
          A boltban mindig egész vödrökre / dobozokra felfelé kerekítünk!
        </div>
      </div>
    )
  },
  {
    id: 'cs-tiling-packing',
    title: '4. Csempézés és Ráhagyás',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Csempézés:</strong> Felület · 1,10 (10% vágási hulladék ráhagyás).</div>
        <div><strong>Csomagolópapír:</strong> Doboz felszín · 1,20 (20% átlapolás).</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Csempedarabszám = Felület / (csempe hossza · szélessége)
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // --- 1. SZINT: FEDETLEN TESTEK, AKVÁRIUMOK ÉS ALAPVETŐ GYAKORLATI FELÜLETEK (1-10) ---
  {
    id: 'q1',
    level: 1,
    question: 'Hány határoló lappal kell számolnunk egy felül nyitott (fedél nélküli) kocka alakú doboz külső lefestésekor?',
    options: [
      '5 lap',
      '6 lap',
      '4 lap',
      '8 lap'
    ],
    correctAnswer: '5 lap',
    explanation: 'Mivel a doboznak nincs fedele, csak az 1 alsó lapot és a 4 oldalsó lapot kell lefesteni, ami összesen 5 határoló lap.'
  },
  {
    id: 'q2',
    level: 1,
    question: 'Egy fedél nélküli fa játékláda élhossza a = 1 m. Mekkora a külső felülete?',
    options: [
      '5 m²',
      '6 m²',
      '4 m²',
      '1 m²'
    ],
    correctAnswer: '5 m²',
    explanation: 'Egy lap területe 1 · 1 = 1 m². A nyitott doboznak 5 határoló lapja van, ezért a külső felülete 5 · 1 = 5 m².'
  },
  {
    id: 'q3',
    level: 1,
    question: 'Egy felül nyitott üvegakvárium alaplapja 50 cm × 30 cm, magassága 40 cm. Mekkora az alsó lap (aljzat) területe?',
    options: [
      '1500 cm²',
      '2000 cm²',
      '1200 cm²',
      '3000 cm²'
    ],
    correctAnswer: '1500 cm²',
    explanation: 'Az aljzat egy 50 cm × 30 cm méretű téglalap: 50 · 30 = 1500 cm² (ami 15 dm²).'
  },
  {
    id: 'q4',
    level: 1,
    question: 'Az előző akváriumnak (50 cm × 30 cm, magasság 40 cm) mekkora a 4 oldallapjának együttes területe?',
    options: [
      '6400 cm²',
      '3200 cm²',
      '7200 cm²',
      '5000 cm²'
    ],
    correctAnswer: '6400 cm²',
    explanation: 'A 4 oldallap a palást: K_alap · m = 2 · (50 + 30) · 40 = 160 · 40 = 6400 cm².'
  },
  {
    id: 'q5',
    level: 1,
    question: 'Mennyi az akvárium teljes üvegfelülete (50 × 30 cm alapterület, 40 cm magasság)?',
    options: [
      '7900 cm²',
      '9400 cm²',
      '6400 cm²',
      '7500 cm²'
    ],
    correctAnswer: '7900 cm²',
    explanation: 'Aljzat (1500 cm²) + 4 oldallap (6400 cm²) = 7900 cm² (ami 79 dm²).'
  },
  {
    id: 'q6',
    level: 1,
    question: 'Egy 4 m hosszú, 3 m széles és 2,5 m magas szobának csak a 4 függőleges falát festjük le. Mekkora a falak bruttó területe?',
    options: [
      '35 m²',
      '47 m²',
      '24 m²',
      '70 m²'
    ],
    correctAnswer: '35 m²',
    explanation: 'A kerület K = 2 · (4 + 3) = 14 m. A 4 fal területe: K · m = 14 · 2,5 = 35 m².'
  },
  {
    id: 'q7',
    level: 1,
    question: 'Mekkora a fenti szoba (4 m × 3 m, belmagasság 2,5 m) mennyezetének területe?',
    options: [
      '12 m²',
      '10 m²',
      '14 m²',
      '24 m²'
    ],
    correctAnswer: '12 m²',
    explanation: 'A mennyezet megegyezik a szoba alapterületével: 4 · 3 = 12 m².'
  },
  {
    id: 'q8',
    level: 1,
    question: 'Egy zárt ajándékdoboz minden oldalát befedjük csomagolópapírral. Hány lap területét kell figyelembe vennünk?',
    options: [
      '6 lapot',
      '5 lapot',
      '4 lapot',
      '8 lapot'
    ],
    correctAnswer: '6 lapot',
    explanation: 'A zárt téglatest doboznak 6 határoló síklapja van (alsó, felső és 4 oldalsó lap).'
  },
  {
    id: 'q9',
    level: 1,
    question: 'Egy kémény külső felületét vakoljuk a tető felett. Méretei: 0,4 m × 0,6 m, magassága 1 m. Mekkora a vakolandó felület?',
    options: [
      '2 m²',
      '2,48 m²',
      '1,2 m²',
      '4 m²'
    ],
    correctAnswer: '2 m²',
    explanation: 'Csak a 4 oldalfalat kell vakolni (alja-teteje nyitott füstelvezető): 2 · (0,4 + 0,6) · 1 = 2 · 1 = 2 m².'
  },
  {
    id: 'q10',
    level: 1,
    question: 'Egy felül nyitott, kocka alakú fa virágláda éle a = 0,5 m. Mekkora a külső felülete?',
    options: [
      '1,25 m²',
      '1,5 m²',
      '1 m²',
      '0,75 m²'
    ],
    correctAnswer: '1,25 m²',
    explanation: '1 lap területe: 0,5 · 0,5 = 0,25 m². Mivel 5 lapos nyitott láda: 5 · 0,25 = 1,25 m².'
  },

  // --- 2. SZINT: SZOBAFESTÉS NYÍLÁSZÁRÓKKAL, BURKOLÁS ÉS RÉTEGEK (11-20) ---
  {
    id: 'q11',
    level: 2,
    question: 'Egy szoba 4 falának bruttó felülete 48 m². Van benne egy 2 m²-es ajtó és két darab 1,5 m²-es ablak. Mekkora a festendő nettó falfelület?',
    options: [
      '43 m²',
      '45 m²',
      '41 m²',
      '40 m²'
    ],
    correctAnswer: '43 m²',
    explanation: 'A nyílászárók területe: 2 + 2 · 1,5 = 2 + 3 = 5 m². Nettó falfelület: 48 - 5 = 43 m².'
  },
  {
    id: 'q12',
    level: 2,
    question: 'A szoba nettó falfelülete 40 m², a mennyezet pedig 15 m². Mekkora a festendő összfelület, ha a mennyezetet is lefestjük?',
    options: [
      '55 m²',
      '50 m²',
      '70 m²',
      '45 m²'
    ],
    correctAnswer: '55 m²',
    explanation: 'Összes festendő felület = nettó falak + mennyezet: 40 + 15 = 55 m².'
  },
  {
    id: 'q13',
    level: 2,
    question: 'Egy 50 m²-es falfelületet festünk. A festék kiadóssága 10 m² / liter. Hány liter festék szükséges 1 rétegben?',
    options: [
      '5 liter',
      '10 liter',
      '50 liter',
      '2 liter'
    ],
    correctAnswer: '5 liter',
    explanation: '50 : 10 = 5 liter festék kell egy réteghez.'
  },
  {
    id: 'q14',
    level: 2,
    question: 'Ha az 50 m²-es felületet tökéletes fedéshez 2 rétegben kenjük át, hány liter festék kell összesen (10 m²/liter kiadósság mellett)?',
    options: [
      '10 liter',
      '5 liter',
      '20 liter',
      '15 liter'
    ],
    correctAnswer: '10 liter',
    explanation: '2 rétegben 2 · 50 = 100 m²-nek megfelelő felületet kenünk le: 100 : 10 = 10 liter.'
  },
  {
    id: 'q15',
    level: 2,
    question: 'Egy medence hossza 6 m, szélessége 4 m, mélysége 1,5 m. Hány m² felületet kell csempézni (aljzat + 4 belső fal)?',
    options: [
      '54 m²',
      '48 m²',
      '60 m²',
      '78 m²'
    ],
    correctAnswer: '54 m²',
    explanation: 'Aljzat: 6 · 4 = 24 m². 4 oldalfal: 2 · (6 + 4) · 1,5 = 30 m². Összesen 5 lap: 24 + 30 = 54 m².'
  },
  {
    id: 'q16',
    level: 2,
    question: '12 m² felületet burkolunk 20 cm × 20 cm-es négyzet alakú csempékkel. Hány darab csempe szükséges (hulladék nélkül)?',
    options: [
      '300 db',
      '240 db',
      '60 db',
      '120 db'
    ],
    correctAnswer: '300 db',
    explanation: '1 csempe területe 0,2 m · 0,2 m = 0,04 m². Szükséges darabszám: 12 : 0,04 = 300 db.'
  },
  {
    id: 'q17',
    level: 2,
    question: 'A csempézendő felület 30 m². A vágási hulladék miatt a burkoló 10% plusz anyagot kér. Hány m² csempét kell vásárolni?',
    options: [
      '33 m²',
      '30 m²',
      '35 m²',
      '40 m²'
    ],
    correctAnswer: '33 m²',
    explanation: '30 m² 10%-a 3 m², így 30 + 3 = 33 m² (vagy 30 · 1,10 = 33 m²).'
  },
  {
    id: 'q18',
    level: 2,
    question: 'Egy szoba nettó falfelülete 36 m². Egy tekercs tapéta 5 m² falfelület befedésére elegendő. Hány tekercs tapétát kell vennünk a boltban?',
    options: [
      '8 tekercs',
      '7 tekercs',
      '7,2 tekercs',
      '9 tekercs'
    ],
    correctAnswer: '8 tekercs',
    explanation: '36 : 5 = 7,2 tekercs. Mivel a boltban csak egész tekercset árulnak, felfelé kell kerekíteni: 8 tekercs kell.'
  },
  {
    id: 'q19',
    level: 2,
    question: 'Egy 20 cm élű zárt kocka alakú dobozt szeretnénk becsomagolni. Mekkora a doboz teljes felszíne dm²-ben?',
    options: [
      '24 dm²',
      '4 dm²',
      '12 dm²',
      '240 dm²'
    ],
    correctAnswer: '24 dm²',
    explanation: 'a = 2 dm. A zárt kocka felszíne: A = 6 · 2² = 6 · 4 = 24 dm² (ami 2400 cm²).'
  },
  {
    id: 'q20',
    level: 2,
    question: 'Egy felül nyitott faládát kívül és belül is lefestünk. Hány lap felületét kenjük le összesen?',
    options: [
      '10 lapot',
      '5 lapot',
      '12 lapot',
      '6 lapot'
    ],
    correctAnswer: '10 lapot',
    explanation: 'A nyitott ládának 5 lapja van. Kívül-belül lekenve mind az ötöt: 2 · 5 = 10 lapfelületet festünk le.'
  },

  // --- 3. SZINT: ANYAGVÁSÁRLÁS, VÖDÖRSZÁM ÉS ÖSSZETETT GYAKORLATI KALKULÁCIÓK (21-30) ---
  {
    id: 'q21',
    level: 3,
    question: 'Egy szoba festéséhez a számítások szerint 13,2 liter festékre van szükség. A boltban 5 literes vödrökben kapható a festék. Hány vödröt kell vennünk?',
    options: [
      '3 vödröt',
      '2 vödröt',
      '4 vödröt',
      '2,64 vödröt'
    ],
    correctAnswer: '3 vödröt',
    explanation: '13,2 : 5 = 2,64. Két vödör csak 10 liter, ami nem elég, ezért 3 vödröt (15 litert) kell venni.'
  },
  {
    id: 'q22',
    level: 3,
    question: 'Egy téglatest doboz felszíne 0,8 m². A hajtogatások és ragasztások miatt a felszín 120%-ának megfelelő papír kell. Hány m² papír szükséges?',
    options: [
      '0,96 m²',
      '0,88 m²',
      '1,00 m²',
      '1,20 m²'
    ],
    correctAnswer: '0,96 m²',
    explanation: '0,8 · 1,20 = 0,96 m² papír szükséges.'
  },
  {
    id: 'q23',
    level: 3,
    question: 'Egy 5 m × 4 m-es, 3 m belmagasságú szoba falain 6 m² nyílászáró van. Csak a 4 falat festjük 2 rétegben. Hány liter festék kell, ha 1 liter 8 m²-re elég?',
    options: [
      '12 liter',
      '6 liter',
      '10 liter',
      '15 liter'
    ],
    correctAnswer: '12 liter',
    explanation: 'Falak bruttó felülete: 2 · (5 + 4) · 3 = 54 m². Levonva a nyílászárókat: 54 - 6 = 48 m². 2 rétegben: 2 · 48 = 96 m². Festékszükséglet: 96 : 8 = 12 liter.'
  },
  {
    id: 'q24',
    level: 3,
    question: 'A 12 liter festék megvásárlásához a boltban 5 literes (12 000 Ft) és 2,5 literes (7 000 Ft) dobozok vannak. Hogyan jövünk ki a legolcsóbban?',
    options: [
      '2 db 5 literes + 1 db 2,5 literes (31 000 Ft)',
      '3 db 5 literes vödör (36 000 Ft)',
      '5 db 2,5 literes doboz (35 000 Ft)',
      '2 db 5 literes vödör (24 000 Ft)'
    ],
    correctAnswer: '2 db 5 literes + 1 db 2,5 literes (31 000 Ft)',
    explanation: '2 db 5 literes (10 l) + 1 db 2,5 literes (2,5 l) = 12,5 liter, ami éppen elég a 12 literre. Ára: 2 · 12 000 + 7 000 = 31 000 Ft, ami a legkedvezőbb.'
  },
  {
    id: 'q25',
    level: 3,
    question: 'Egy 5 m × 3 m-es, 2 m mély medence alját és falait szigetelik. 1 doboz szigetelőanyag 10 m²-re elég. Hány dobozt kell venni?',
    options: [
      '5 dobozt',
      '4 dobozt',
      '6 dobozt',
      '7 dobozt'
    ],
    correctAnswer: '5 dobozt',
    explanation: 'Aljzat: 5 · 3 = 15 m². Falak: 2 · (5 + 3) · 2 = 32 m². Összesen 5 lap: 15 + 32 = 47 m². Dobozok: 47 : 10 = 4,7 → 5 doboz kell.'
  },
  {
    id: 'q26',
    level: 3,
    question: 'Egy felül nyitott, a = 2 m élű kocka alakú víztartály külső lemezeléséhez hány m² bádoglemez kell, ha 10% hulladékkal számolunk?',
    options: [
      '22 m²',
      '20 m²',
      '24 m²',
      '26 m²'
    ],
    correctAnswer: '22 m²',
    explanation: 'A nyitott tartály 5 lapja: 5 · 2² = 20 m². 10% ráhagyással: 20 · 1,10 = 22 m² lemez kell.'
  },
  {
    id: 'q27',
    level: 3,
    question: '21 m² falfelület burkolásához 10% ráhagyással számolunk. A csempe 1,5 m²-es dobozokban kapható. Hány dobozt kell venni?',
    options: [
      '16 dobozt',
      '14 dobozt',
      '15 dobozt',
      '17 dobozt'
    ],
    correctAnswer: '16 dobozt',
    explanation: 'Csempeszükséglet ráhagyással: 21 · 1,10 = 23,1 m². Dobozok száma: 23,1 : 1,5 = 15,4 → felfelé kerekítve 16 doboz szükséges.'
  },
  {
    id: 'q28',
    level: 3,
    question: 'Egy 60 cm × 40 cm × 30 cm-es felül nyitott üvegakvárium élei mentén ragasztják össze az üveglapokat. Hány cm élt ragasztanak meg összesen?',
    options: [
      '320 cm',
      '520 cm',
      '260 cm',
      '200 cm'
    ],
    correctAnswer: '320 cm',
    explanation: 'Fenéklap 4 éle: 2·60 + 2·40 = 200 cm. A 4 függőleges él: 4 · 30 = 120 cm. Összesen: 200 + 120 = 320 cm. (A nyitott felső széleken nincs ragasztás).'
  },
  {
    id: 'q29',
    level: 3,
    question: '5 darab a = 10 cm élű kockát összeragasztunk egy kereszt alakú testté (1 középen, 4 az oldalain). Mekkora a kapott test külső felülete?',
    options: [
      '2200 cm²',
      '3000 cm²',
      '2600 cm²',
      '2000 cm²'
    ],
    correctAnswer: '2200 cm²',
    explanation: '5 kockának 5 · 6 = 30 lapja lenne. A 4 ragasztási felület miatt 4 · 2 = 8 belső lap eltűnik, kívül marad 22 lap: 22 · 10² = 22 · 100 = 2200 cm².'
  },
  {
    id: 'q30',
    level: 3,
    question: 'Egy 10 m × 8 m-es ház körüli külső lábazatot 0,5 m magasságban kőlapokkal burkolnak. Mekkora a burkolandó felület?',
    options: [
      '18 m²',
      '36 m²',
      '9 m²',
      '40 m²'
    ],
    correctAnswer: '18 m²',
    explanation: 'A ház kerülete: K = 2 · (10 + 8) = 36 m. A lábazat felülete: K · m = 36 · 0,5 = 18 m².'
  }
];

export const PracticalSurfaceAreaQuiz: React.FC<PracticalSurfaceAreaQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Gyakorlati felszínszámítás kvíz"
      subtitle="Szobafestés, dobozok, akváriumok, medencék és csempézés gyakorlati feladványai 3 szinten"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      badgeText="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="rose"
      topicId="g6-practical-surface-quiz"
      topicTitle="Felszínszámítási gyakorlati feladatok"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={PracticalSurfaceAreaMatcher as any}
      sorterComponent={PracticalSurfaceAreaSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PracticalSurfaceAreaQuiz;
