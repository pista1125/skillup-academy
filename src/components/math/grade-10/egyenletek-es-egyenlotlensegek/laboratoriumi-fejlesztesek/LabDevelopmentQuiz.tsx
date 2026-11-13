import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LabDevelopmentMatcher } from './LabDevelopmentMatcher';
import { LabDevelopmentSorter } from './LabDevelopmentSorter';
import {
  MixingBeakersSvg,
  ParallelFlowTubesSvg,
  DilutionStepsSvg,
  TechnicalFormulaBridgeSvg,
  LabBalanceBeakerSvg
} from './LabDevelopmentFigures';

interface LabDevelopmentQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A keverési egyenlet és anyagmérleg',
    description: 'Két oldat keverésekor az oldott anyagok összeadódnak: m₁·w₁ + m₂·w₂ = (m₁ + m₂)·w_új. Hígításnál vízzel: w = 0%. Töményítésnél tiszta sóval/savval: w = 100%. Bepárlásnál víz távozik: m_új = m₁ - m_víz.',
    note: 'Soha ne átlagold közvetlenül a százalékokat, csak akkor adnak számtani közepet, ha a két oldat tömege pontosan megegyezik!',
    color: 'from-emerald-500 to-teal-600',
    figure: <MixingBeakersSvg size={260} />
  },
  {
    title: 'Együttes munkavégzés (Harmonikus modell)',
    description: 'Ha az 1. gép t₁ idő, a 2. gép t₂ idő alatt végez egyedül, 1 időegység alatt az 1/t₁ és 1/t₂ részt végzik el. Együtt: 1/t₁ + 1/t₂ = 1/T ⟹ T = (t₁ · t₂) / (t₁ + t₂).',
    note: 'Ha a két idő eltérése ismert (pl. t₂ = t₁ + d), a reciprok egyenlet másodfokúvá alakul! A negatív gyököt fizikailag kizárjuk.',
    color: 'from-cyan-500 to-blue-600',
    figure: <ParallelFlowTubesSvg size={260} />
  },
  {
    title: 'Kétszeres lépcsőzetes hígítás',
    description: 'Egy V térfogatú oldatból x litert kivéve és vízzel pótolva a koncentráció (1 - x/V)-szorosára csökken. Két egymás utáni hígítás után: c₂ = c₀ · (1 - x/V)², ami másodfokú egyenlethez vezet!',
    note: 'A gyökvonás után az x < V fizikai feltétel alapján választjuk ki a helyes valós megoldást.',
    color: 'from-amber-500 to-orange-600',
    figure: <DilutionStepsSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Keverési és hígítási alapszámítások',
    subtitle: '10 alapozó feladat az anyagmérlegről, tömegszázalékról, hígításról és bepárlásról',
    range: '1–10. kérdés',
    focus: 'Tömegszázalék definíciója, oldott anyag tömege, víz/só hozzáadása',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'ldq1-1',
        level: 1,
        question: 'Hány gramm tiszta konyhasó van 250 g 8%-os sóoldatban?',
        options: [
          '20 g',
          '25 g',
          '16 g',
          '32 g'
        ],
        correctAnswer: 0,
        hint: 'Számold ki a tömeg 8%-át: 250 · 0,08.',
        explanation: 'm_oldott = 250 · 0,08 = 20 g tiszta só.'
      },
      {
        id: 'ldq1-2',
        level: 1,
        question: '300 g 10%-os és 300 g 20%-os oldatot összeöntünk. Hány százalékos lesz a kapott keverék?',
        options: [
          '15%',
          '30%',
          '12%',
          '25%'
        ],
        correctAnswer: 0,
        hint: 'Mivel a két oldat tömege pontosan megegyezik, veheted a számtani közepet!',
        explanation: 'Egyenlő tömegek esetén a töménység a számtani közép: (10% + 20%) / 2 = 15%. Részletesen: (30 + 60) g / 600 g = 90 / 600 = 0,15 = 15%.'
      },
      {
        id: 'ldq1-3',
        level: 1,
        question: '200 g 15%-os cukoroldathoz 100 g tiszta vizet adunk. Hány százalékos lesz a kapott hígabb oldat?',
        options: [
          '10%',
          '7,5%',
          '12%',
          '5%'
        ],
        correctAnswer: 0,
        hint: 'A cukor mennyisége (30 g) nem változik, de az össztömeg 300 g-ra nő.',
        explanation: 'A cukor tömege: 200 · 0,15 = 30 g. Új össztömeg: 200 + 100 = 300 g. Új töménység: 30 / 300 = 0,10 = 10%.'
      },
      {
        id: 'ldq1-4',
        level: 1,
        question: 'Melyik összefüggés írja le az oldott anyag megmaradását két oldat összeöntésekor?',
        options: [
          'm₁ · w₁ + m₂ · w₂ = (m₁ + m₂) · w_új',
          'w₁ + w₂ = w_új',
          'm₁ + m₂ = m₁ · w₁ + m₂ · w₂',
          'm₁ / w₁ + m₂ / w₂ = w_új'
        ],
        correctAnswer: 0,
        hint: 'A komponensekben lévő oldott anyagok összege adja a keverék oldott anyagát.',
        explanation: 'Az 1. oldatban m₁·w₁/100, a 2. oldatban m₂·w₂/100 oldott anyag van. Ezek összege megegyezik a keverékben lévő (m₁ + m₂)·w_új/100 értékkel.'
      },
      {
        id: 'ldq1-5',
        level: 1,
        question: 'Hány gramm tiszta vizet kell adni 400 g 25%-os sóoldathoz, hogy 10%-os oldatot kapjunk?',
        options: [
          '600 g',
          '500 g',
          '400 g',
          '250 g'
        ],
        correctAnswer: 0,
        hint: 'Az oldott só: 400 · 0,25 = 100 g. Ennek kell 10%-nak lennie az új oldatban.',
        explanation: 'A só tömege: 100 g. A 10%-os oldat össztömege: 100 / 0,10 = 1000 g. A hozzáadandó víz: 1000 - 400 = 600 g.'
      },
      {
        id: 'ldq1-6',
        level: 1,
        question: '500 g vízben feloldunk 50 g sót. Hány tömegszázalékos a kapott oldat?',
        options: [
          'kb. 9,09%',
          '10%',
          '5%',
          '11%'
        ],
        correctAnswer: 0,
        hint: 'Vigyázz! Az oldat össztömege nem 500 g, hanem a víz ÉS a só tömegének összege!',
        explanation: 'Az oldat össztömege: 500 g víz + 50 g só = 550 g. A töménység: 50 / 550 = 1 / 11 ≈ 0,0909 = 9,09%.'
      },
      {
        id: 'ldq1-7',
        level: 1,
        question: 'Mi történik a bepárlás (forralás) során egy sóoldattal?',
        options: [
          'Víz párolog el, az oldat össztömege csökken, a só megmarad, így a töménység nő.',
          'A só is elpárolog a vízzel együtt, a töménység állandó marad.',
          'A töménység csökken, mert a melegítés hígítja az oldatot.',
          'Az oldott só mennyisége megduplázódik.'
        ],
        correctAnswer: 0,
        hint: 'A só nem illékony anyag, a forraláskor a gőz tiszta víz.',
        explanation: 'A bepárláskor tiszta víz (w = 0%) távozik. Mivel a számlálóban lévő sómennyiség állandó, a nevezőben lévő össztömeg pedig csökken, a koncentráció növekszik.'
      },
      {
        id: 'ldq1-8',
        level: 1,
        question: '600 g 10%-os sóoldatot addig forralunk, míg 200 g víz elpárolog. Hány százalékos lesz a maradék?',
        options: [
          '15%',
          '20%',
          '12%',
          '30%'
        ],
        correctAnswer: 0,
        hint: 'A sómennyiség 60 g, a maradék oldat tömege 600 - 200 = 400 g.',
        explanation: 'Só: 600 · 0,10 = 60 g. Maradék oldat: 600 - 200 = 400 g. Új töménység: 60 / 400 = 0,15 = 15%.'
      },
      {
        id: 'ldq1-9',
        level: 1,
        question: 'Milyen értéket képvisel a keverési egyenletben a hozzáadott tiszta konyhasó töménysége (w_só)?',
        options: [
          '100%',
          '0%',
          '50%',
          'Nem írható fel egyenlettel'
        ],
        correctAnswer: 0,
        hint: 'A tiszta só teljes egészében az oldott anyagból áll.',
        explanation: 'Mivel a hozzáadott tiszta só 100%-ban maga az oldott anyag, a keverési egyenletben w = 100%-ként (vagy szorzóként 1-gyel) szerepel.'
      },
      {
        id: 'ldq1-10',
        level: 1,
        question: '180 g 10%-os sóoldathoz hozzáadunk 20 g tiszta sót. Hány százalékos lesz a keverék?',
        options: [
          '19%',
          '20%',
          '30%',
          '15%'
        ],
        correctAnswer: 0,
        hint: 'Eredeti só: 18 g. Új só: 18 + 20 = 38 g. Új össztömeg: 180 + 20 = 200 g.',
        explanation: 'Összes só: 18 g + 20 g = 38 g. Össztömeg: 200 g. Töménység: 38 / 200 = 0,19 = 19%.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Együttes munkavégzés, csapok és műszaki képletek',
    subtitle: '10 feladat a teljesítmények összegzéséről, a reciprok-egyenletekről és a fizikai képletek rendezéséről',
    range: '11–20. kérdés',
    focus: 'Harmonikus modell (1/t₁ + 1/t₂ = 1/T), párhuzamos ellenállások, lencsetörvény',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-blue-600',
    questions: [
      {
        id: 'ldq2-1',
        level: 2,
        question: 'Az 1. csap 3 óra, a 2. csap 6 óra alatt töltené fel egyedül a medencét. Hány óra alatt végzik el közösen?',
        options: [
          '2 óra',
          '4,5 óra',
          '9 óra',
          '1,5 óra'
        ],
        correctAnswer: 0,
        hint: '1 óra alatt: 1/3 + 1/6 = 3/6 = 1/2.',
        explanation: 'Együtt 1 óra alatt a medence felét töltik meg (1/3 + 1/6 = 1/2), tehát a teljes medencéhez 2 óra szükséges: T = (3·6)/(3+6) = 18/9 = 2 óra.'
      },
      {
        id: 'ldq2-2',
        level: 2,
        question: 'Két azonos teljesítményű traktor egyszerre szánt fel egy mezőt. Ha az egyik egyedül 8 óra alatt végezne, mennyi ideig dolgoznak együtt?',
        options: [
          '4 óra',
          '8 óra',
          '16 óra',
          '2 óra'
        ],
        correctAnswer: 0,
        hint: 'Két egyforma gép kétszeres sebességgel dolgozik, így felezi az időt.',
        explanation: '1/8 + 1/8 = 2/8 = 1/4 ⟹ T = 4 óra.'
      },
      {
        id: 'ldq2-3',
        level: 2,
        question: 'Egy tartályt az 1. csap 4 óra alatt tölt meg, de egy lefolyó csap 6 óra alatt kiürítené. Ha mindkettő nyitva van, mennyi idő alatt telik meg?',
        options: [
          '12 óra',
          '10 óra',
          '2 óra',
          'Soha nem telik meg'
        ],
        correctAnswer: 0,
        hint: 'A lefolyó csökkenti a vízmennyiséget: 1/4 - 1/6 = ?',
        explanation: '1 óra alatt: 1/4 - 1/6 = 3/12 - 2/12 = 1/12 rész telik meg. Így a teljes feltöltéshez 12 óra szükséges.'
      },
      {
        id: 'ldq2-4',
        level: 2,
        question: 'Melyik képlet fejezi ki az együttes munkaidőt (T) két gép egyéni ideje (t₁, t₂) alapján?',
        options: [
          'T = (t₁ · t₂) / (t₁ + t₂)',
          'T = (t₁ + t₂) / 2',
          'T = t₁ + t₂',
          'T = t₁ · t₂'
        ],
        correctAnswer: 0,
        hint: '1/T = 1/t₁ + 1/t₂ = (t₂ + t₁) / (t₁ t₂). Vedd a reciprokot!',
        explanation: 'Az 1/T = (t₁ + t₂)/(t₁ t₂) reciprokát véve kapjuk: T = (t₁ · t₂) / (t₁ + t₂).'
      },
      {
        id: 'ldq2-5',
        level: 2,
        question: 'Két párhuzamosan kapcsolt ellenállás: R₁ = 12 Ω és R₂ = 4 Ω. Mennyi az eredő ellenállás (R_e)?',
        options: [
          '3 Ω',
          '16 Ω',
          '8 Ω',
          '6 Ω'
        ],
        correctAnswer: 0,
        hint: '1/R_e = 1/12 + 1/4 = 1/12 + 3/12 = 4/12.',
        explanation: '1/R_e = 4/12 = 1/3 ⟹ R_e = 3 Ω.'
      },
      {
        id: 'ldq2-6',
        level: 2,
        question: 'A vékony lencse leképezési törvénye: 1/f = 1/t + 1/k. Ha t = 30 cm és f = 20 cm, mekkora a képtávolság (k)?',
        options: [
          '60 cm',
          '50 cm',
          '10 cm',
          '25 cm'
        ],
        correctAnswer: 0,
        hint: '1/k = 1/f - 1/t = 1/20 - 1/30.',
        explanation: '1/k = 3/60 - 2/60 = 1/60 ⟹ k = 60 cm.'
      },
      {
        id: 'ldq2-7',
        level: 2,
        question: 'Miért nem lehet egy valós munkafeladat megoldása negatív szám?',
        options: [
          'Mert a fizikai idő nemnegatív skalármennyiség (t > 0), a negatív időnek nincs fizikai jelentése.',
          'Mert a törtes egyenletek sosem adhatnak negatív gyököt.',
          'Mert a másodfokú diszkrimináns mindig pozitív.',
          'Mert a harmonikus közép nem létezik negatív számokra.'
        ],
        correctAnswer: 0,
        hint: 'A matematika formálisan kiadja a negatív gyököt is, de a valóságban időben csak előre haladhatunk.',
        explanation: 'A feladat szövegének rejtett kikötése, hogy a fizikai idő t > 0. Ezért az algebrai megoldásból a negatív gyököt fizikailag kizárjuk.'
      },
      {
        id: 'ldq2-8',
        level: 2,
        question: 'Az 1. munkás 2 óra, a 2. munkás 5 óra alatt festene ki egy szobát. Hány perc alatt végeznek együtt?',
        options: [
          'kb. 86 perc (1 óra 26 perc)',
          '210 perc',
          '60 perc',
          '120 perc'
        ],
        correctAnswer: 0,
        hint: 'T = (2 · 5) / (2 + 5) = 10 / 7 óra. Szorozd meg 60-nal!',
        explanation: 'T = 10/7 óra = 600/7 perc ≈ 85,71 perc, azaz kb. 1 óra 26 perc.'
      },
      {
        id: 'ldq2-9',
        level: 2,
        question: 'Fejezd ki a kinetikus energia képletéből (Ek = 1/2 m v²) a sebességet (v > 0)!',
        options: [
          'v = √(2Ek / m)',
          'v = 2Ek / m',
          'v = √(Ek / (2m))',
          'v = √Ek / m'
        ],
        correctAnswer: 0,
        hint: 'Szorozz 2-vel, ossz m-mel, majd vonj négyzetgyököt!',
        explanation: '2Ek = m v² ⟹ v² = 2Ek / m ⟹ v = √(2Ek / m).'
      },
      {
        id: 'ldq2-10',
        level: 2,
        question: 'Két párhuzamos ellenállás eredője R_e = 4 Ω. Ha R₂ = 12 Ω, mekkora az R₁?',
        options: [
          'R₁ = 6 Ω',
          'R₁ = 8 Ω',
          'R₁ = 16 Ω',
          'R₁ = 3 Ω'
        ],
        correctAnswer: 0,
        hint: '1/R₁ = 1/4 - 1/12 = 3/12 - 1/12 = 2/12.',
        explanation: '1/R₁ = 2/12 = 1/6 ⟹ R₁ = 6 Ω.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Másodfokúra vezető modellek és összetett feladatok',
    subtitle: '10 emelt szintű érettségi feladat lépcsőzetes hígításról, ismeretlen időkülönbségről és formulák rendezéséről',
    range: '21–30. kérdés',
    focus: 'Nemlineáris hígítás (c₂ = c₀(1 - x/V)²), csapfeladat másodfokúvá alakulása, optikai/áramköri paraméterek',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        id: 'ldq3-1',
        level: 3,
        question: 'Egy tartályt két csap tölt. Az első csap 3 órával gyorsabb, mint a második. Együtt 2 óra alatt végzik el. Milyen másodfokú egyenlet írja le az 1. csap x idejét?',
        options: [
          'x² - x - 6 = 0',
          'x² + x - 6 = 0',
          'x² - 3x - 2 = 0',
          'x² + 5x - 6 = 0'
        ],
        correctAnswer: 0,
        hint: '1/x + 1/(x + 3) = 1/2. Szorozz be 2x(x + 3)-mal!',
        explanation: '2(x + 3) + 2x = x(x + 3) ⟹ 4x + 6 = x² + 3x ⟹ x² - x - 6 = 0.'
      },
      {
        id: 'ldq3-2',
        level: 3,
        question: 'Az x² - x - 6 = 0 egyenlet gyökei x₁ = 3 és x₂ = -2. Mi a válasz a csapok külön-külön töltési idejére?',
        options: [
          'Az 1. csap 3 óra, a 2. csap 6 óra alatt tölti meg.',
          'Az 1. csap -2 óra, a 2. csap 1 óra.',
          'Mindkét csap 3 óra.',
          'Nincs valós megoldás.'
        ],
        correctAnswer: 0,
        hint: 'Az idő nem lehet negatív, x > 0!',
        explanation: 'Mivel x > 0, az x = -2 fizikai képtelenség. Az 1. csap ideje x = 3 óra, a 2. csap ideje x + 3 = 6 óra.'
      },
      {
        id: 'ldq3-3',
        level: 3,
        question: 'Egy 10 literes, 100%-os savat tartalmazó edényből x litert kiveszünk, felöntjük vízzel, összekeverjük, majd újra kiveszünk x litert és felöntjük vízzel. A végső töménység 49%. Mennyi x?',
        options: [
          'x = 3 liter',
          'x = 5,1 liter',
          'x = 2 liter',
          'x = 4,9 liter'
        ],
        correctAnswer: 0,
        hint: '(1 - x/10)² = 0,49. Vonj négyzetgyököt: 1 - x/10 = 0,7.',
        explanation: '(1 - x/10)² = 0,49 ⟹ 1 - x/10 = 0,7 ⟹ x/10 = 0,3 ⟹ x = 3 liter.'
      },
      {
        id: 'ldq3-4',
        level: 3,
        question: 'Hány gramm 40%-os és hány gramm 15%-os oldatot kell összekeverni, hogy 500 g 25%-os oldatot kapjunk?',
        options: [
          '200 g 40%-os és 300 g 15%-os',
          '250 g és 250 g',
          '150 g és 350 g',
          '100 g és 400 g'
        ],
        correctAnswer: 0,
        hint: 'Legyen a 40%-os x gramm, ekkor a 15%-os (500 - x) gramm. 0,40x + 0,15(500 - x) = 500 · 0,25.',
        explanation: '0,40x + 75 - 0,15x = 125 ⟹ 0,25x = 50 ⟹ x = 200 g (40%-os), és 500 - 200 = 300 g (15%-os).'
      },
      {
        id: 'ldq3-5',
        level: 3,
        question: 'Az A csap 5 órával tovább tölt, mint a B csap. Együtt 6 óra alatt végeznek. Milyen egyenlet írja le a B csap t idejét?',
        options: [
          '1/t + 1/(t + 5) = 1/6 ⟹ t² - 7t - 30 = 0',
          '1/t + 1/(t - 5) = 1/6',
          't + (t + 5) = 6',
          't(t + 5) = 30'
        ],
        correctAnswer: 0,
        hint: 'Szorozz be 6t(t + 5)-tel: 6(t + 5) + 6t = t(t + 5).',
        explanation: '12t + 30 = t² + 5t ⟹ t² - 7t - 30 = 0.'
      },
      {
        id: 'ldq3-6',
        level: 3,
        question: 'A t² - 7t - 30 = 0 egyenletből mennyi a B csap valós töltési ideje?',
        options: [
          't = 10 óra (a t = -3 kiesik)',
          't = 3 óra',
          't = 15 óra',
          't = 7 óra'
        ],
        correctAnswer: 0,
        hint: '(t - 10)(t + 3) = 0.',
        explanation: 'Gyökök: t₁ = 10, t₂ = -3. Mivel az idő pozitív, t = 10 óra (az A csap 15 óra).'
      },
      {
        id: 'ldq3-7',
        level: 3,
        question: 'Egy 20 literes hordóból kiveszünk x l tiszta alkoholt, felöntjük vízzel, majd megismételjük. Az alkohol és víz aránya 9 : 16 lett. Mennyi volt x?',
        options: [
          'x = 8 liter',
          'x = 6 liter',
          'x = 10 liter',
          'x = 4 liter'
        ],
        correctAnswer: 0,
        hint: 'Az alkohol aránya az egészben: 9 / (9 + 16) = 9/25 = 0,36.',
        explanation: '(1 - x/20)² = 0,36 ⟹ 1 - x/20 = 0,6 ⟹ x/20 = 0,4 ⟹ x = 8 liter.'
      },
      {
        id: 'ldq3-8',
        level: 3,
        question: 'Fejezd ki az 1/R_e = 1/R₁ + 1/R₂ képletből az R₁ ellenállást!',
        options: [
          'R₁ = (R_e · R₂) / (R₂ - R_e)',
          'R₁ = R_e - R₂',
          'R₁ = (R_e + R₂) / (R_e · R₂)',
          'R₁ = (R_e · R₂) / (R_e + R₂)'
        ],
        correctAnswer: 0,
        hint: '1/R₁ = 1/R_e - 1/R₂ = (R₂ - R_e) / (R_e · R₂). Vedd a reciprokot!',
        explanation: '1/R₁ = (R₂ - R_e)/(R_e · R₂) ⟹ R₁ = (R_e · R₂) / (R₂ - R_e).'
      },
      {
        id: 'ldq3-9',
        level: 3,
        question: 'Az 1. laboráns 6 órával gyorsabb a 2. laboránsnál. Együtt 4 óra alatt készítik el a mintákat. Hány óra alatt végezne az 1. laboráns egyedül?',
        options: [
          '6 óra',
          '4 óra',
          '12 óra',
          '8 óra'
        ],
        correctAnswer: 0,
        hint: '1/x + 1/(x + 6) = 1/4 ⟹ 4(x + 6) + 4x = x(x + 6) ⟹ x² - 2x - 24 = 0.',
        explanation: 'x² - 2x - 24 = (x - 6)(x + 4) = 0. Mivel x > 0, x = 6 óra (a 2. laboráns 12 óra).'
      },
      {
        id: 'ldq3-10',
        level: 3,
        question: 'Miért előnyös a keverési táblázat (tömeg, százalék, oldott anyag) használata a szöveges feladatoknál?',
        options: [
          'Mert szisztematikusan elválasztja az oldat össztömegét az oldott anyagtól, megelőzve a százalékok téves közvetlen összeadását.',
          'Mert csak táblázattal lehet másodfokú egyenletet megoldani.',
          'Mert a táblázat nélkül a számológép hibát jelez.',
          'Mert a táblázat automatikusan felírja a grafikus ábrát.'
        ],
        correctAnswer: 0,
        hint: 'A táblázat oszlopai biztosítják a tömeg- és anyagmegmaradás tiszta szétválasztását.',
        explanation: 'A táblázatos módszer lényege a két külön megmaradási törvény (össztömeg és oldott anyag) átlátható felírása, ami garantálja a hibátlan egyenletalkotást.'
      }
    ]
  }
};

export const LabDevelopmentQuiz: React.FC<LabDevelopmentQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-laboratoriumi-fejlesztesek-quiz"
      topicTitle="Laboratóriumi modellek – Kvíz és Gyakorló Feladatok"
      themeColor="emerald"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      renderMatcher={(level, onNext, onRules) => (
        <LabDevelopmentMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      )}
      renderSorter={(level, onNext, onRules) => (
        <LabDevelopmentSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      )}
    />
  );
};

