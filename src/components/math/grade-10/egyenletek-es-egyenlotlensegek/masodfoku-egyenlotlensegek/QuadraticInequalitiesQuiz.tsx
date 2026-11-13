import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadraticInequalitiesMatcher } from './QuadraticInequalitiesMatcher';
import { QuadraticInequalitiesSorter } from './QuadraticInequalitiesSorter';
import {
  ParabolaCasesDgt0Svg,
  ParabolaCasesDeq0Svg,
  ParabolaCasesDlt0Svg,
  SignTableChartSvg,
  InequalityIntervalNumberLineSvg
} from './QuadraticInequalitiesFigures';

interface QuadraticInequalitiesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A grafikus módszer: a parabola állása és a zérushelyek (D > 0)',
    description:
      'Mindig rendezzünk nullára (ax² + bx + c ≶ 0). Ha a > 0 (felfelé nyíló parabola) és D > 0 (két valós zérushely x₁ < x₂), akkor a függvény a két gyök között negatív (< 0), a két gyökön kívül pedig pozitív (> 0).',
    note: 'Emlékeztető: > 0 esetén a megoldás ]-∞; x₁[ ∪ ]x₂; ∞[, míg < 0 esetén a korlátos ]x₁; x₂[ intervallum!',
    color: 'from-blue-600 to-indigo-700',
    figure: <ParabolaCasesDgt0Svg size={260} />
  },
  {
    title: 'Különleges diszkriminánsú esetek (D = 0 és D < 0)',
    description:
      'Ha D = 0, a parabola érinti a tengelyt: (x - x₀)² ≥ 0 minden valós számra teljesül, míg ≤ 0 esetén csak az egyetlen x = x₀ pont a megoldás. Ha D < 0 és a > 0, a parabola lebeg az x-tengely felett: a kifejezés mindig pozitív, így > 0 megoldása ℝ, míg < 0 megoldása ∅!',
    note: 'Soha ne téveszd össze: D < 0 nem jelenti azt, hogy az egyenlőtlenségnek nincs megoldása! ax² + bx + c > 0 esetén a megoldás M = ℝ!',
    color: 'from-amber-500 to-rose-600',
    figure: <ParabolaCasesDeq0Svg size={260} />
  },
  {
    title: 'Előjeltáblázat és törtes egyenlőtlenségek',
    description:
      'Törtes egyenlőtlenségnél (pl. (x - a)/(x - b) > 0) tilos ismeretlennel beszorozni! A tört előjele megegyezik a szorzatéval, de a nevező zérushelyét kötelező kizárni (a nevezőnél mindig nyílt az intervallum zárójele).',
    note: 'Ha negatív számmal szorzol vagy osztasz (pl. a főegyüttható negatív volt), a relációjel azonnal MEGKERÜL!',
    color: 'from-emerald-500 to-teal-600',
    figure: <SignTableChartSvg size={260} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Hiányos másodfokú egyenlőtlenségek és alapszabályok',
    subtitle: '10 alapozó feladat a négyzetre emelésről, hiányos egyenlőtlenségekről és intervallumokról',
    range: '1–10. kérdés',
    focus: '0-ra rendezés, x² ≶ k típusú egyenlőtlenségek, szigorú és megengedő relációk',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'qiq1-1',
        level: 1,
        question: 'Mi a legelső és legfontosabb lépés bármely másodfokú egyenlőtlenség megoldásakor?',
        options: [
          'A kifejezés nullára rendezése (ax² + bx + c ≶ 0 alakra hozás).',
          'Azonnali négyzetgyökvonás mindkét oldalból.',
          'Mindkét oldal elosztása az ismeretlen x-szel.',
          'A diszkrimináns kiszámítása rendezés nélkül.'
        ],
        correctAnswer: 0,
        hint: 'Ahhoz, hogy a parabola előjelét vizsgálni tudjuk az x-tengelyhez képest, a jobb oldalon nullának kell állnia.',
        explanation: 'A másodfokú egyenlőtlenségek grafikus vagy előjeles megoldásának feltétele, hogy a kifejezést nullához hasonlítsuk: ax² + bx + c ≶ 0. Közvetlenül x-szel osztani vagy gyököt vonni tilos és hibás!'
      },
      {
        id: 'qiq1-2',
        level: 1,
        question: 'Mi a valós megoldáshalmaza az x² > 16 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-∞; -4[ ∪ ]4; ∞[',
          'x ∈ ]-4; 4[',
          'x > 4',
          'x ∈ [-4; 4]'
        ],
        correctAnswer: 0,
        hint: 'Gondolj egy felfelé nyíló parabolára zérushelyekkel (-4 és 4), vagy teszteld az x = -5 és x = 0 értékeket!',
        explanation: 'Az x² - 16 > 0 zérushelyei -4 és 4. Mivel a kifejezés szigorúan pozitív, a két gyökön KÍVÜLI részek a megoldások: x < -4 vagy x > 4, azaz x ∈ ]-∞; -4[ ∪ ]4; ∞[.'
      },
      {
        id: 'qiq1-3',
        level: 1,
        question: 'Mely valós számokra teljesül az x² ≤ 25 egyenlőtlenség?',
        options: [
          'x ∈ [-5; 5]',
          'x ∈ ]-5; 5[',
          'x ∈ ]-∞; -5] ∪ [5; ∞[',
          'Csak x = 5 és x = -5'
        ],
        correctAnswer: 0,
        hint: 'A megengedő reláció miatt a határértékek is részei a megoldásnak, és a két zérushely között keresünk.',
        explanation: 'x² - 25 ≤ 0 esetén a parabola a két zérushely között fut a tengely alatt vagy azon. A zárt intervallum: x ∈ [-5; 5].'
      },
      {
        id: 'qiq1-4',
        level: 1,
        question: 'Mi az x² < 0 egyenlőtlenség megoldáshalmaza a valós számok halmazán?',
        options: [
          'M = ∅ (üres halmaz, nincs valós megoldás).',
          'M = ℝ (minden valós szám).',
          'x = 0',
          'x ∈ ]-∞; 0['
        ],
        correctAnswer: 0,
        hint: 'Bármely valós szám négyzete legalább nulla (x² ≥ 0). Lehet-e szigorúan negatív?',
        explanation: 'Bármely valós szám négyzete nemnegatív (x² ≥ 0). Emiatt x² soha nem lehet kisebb mint 0, a megoldáshalmaz az üres halmaz: M = ∅.'
      },
      {
        id: 'qiq1-5',
        level: 1,
        question: 'Mely valós számokra teljesül az x² ≥ 0 egyenlőtlenség?',
        options: [
          'M = ℝ (minden valós számra teljesül).',
          'Csak x > 0 esetén.',
          'Csak x = 0 esetén.',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: 'Pozitív szám négyzete pozitív, negatívé pozitív, nulla négyzete nulla.',
        explanation: 'A valós számok alaptulajdonsága, hogy bármely valós szám négyzete legalább nulla. Tehát minden valós szám kielégíti: M = ℝ.'
      },
      {
        id: 'qiq1-6',
        level: 1,
        question: 'Mi a megoldása az (x - 4)² ≤ 0 egyenlőtlenségnek?',
        options: [
          'x = 4 (egyetlen szám: M = {4})',
          'M = ∅ (nincs megoldás)',
          'x ≤ 4',
          'x ∈ [-4; 4]'
        ],
        correctAnswer: 0,
        hint: 'Egy teljes négyzet mindig ≥ 0. Mikor lehet mégis ≤ 0?',
        explanation: 'Mivel (x - 4)² ≥ 0 minden valós számra, a ≤ 0 feltétel kizárólag akkor teljesülhet, ha (x - 4)² = 0, vagyis ha x = 4. A megoldáshalmaz: M = {4}.'
      },
      {
        id: 'qiq1-7',
        level: 1,
        question: 'Mi a megoldása az (x + 3)² > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ℝ \\ {-3} (minden valós szám, kivéve a -3)',
          'M = ℝ',
          'x > -3',
          'x ∈ ]-3; 3['
        ],
        correctAnswer: 0,
        hint: 'A négyzet mindenhol pozitív, kivéve ott, ahol pontosan 0-vá válik!',
        explanation: 'Egy teljes négyzet mindig nemnegatív: (x + 3)² ≥ 0. A szigorúan pozitív (> 0) feltétel pontosan akkor nem teljesül, ha x + 3 = 0, azaz x = -3 esetén (ekkor 0² = 0, ami nem > 0). Így x ∈ ℝ \\ {-3}.'
      },
      {
        id: 'qiq1-8',
        level: 1,
        question: 'Milyen intervallum adja az x² - 9 < 0 egyenlőtlenség megoldását?',
        options: [
          'x ∈ ]-3; 3[',
          'x ∈ [-3; 3]',
          'x ∈ ]-∞; -3[ ∪ ]3; ∞[',
          'x < 3'
        ],
        correctAnswer: 0,
        hint: 'A zérushelyek -3 és 3, a reláció szigorú, és a parabola a két gyök között fut a tengely alatt.',
        explanation: 'Az x² - 9 = 0 gyökei -3 és 3. Felfelé nyíló parabola lévén a két gyök között negatív az érték, a határok a szigorú egyenlőtlenség miatt nincsenek benne: x ∈ ]-3; 3[.'
      },
      {
        id: 'qiq1-9',
        level: 1,
        question: 'Mi történik a relációs jellel, ha az egyenlőtlenség mindkét oldalát megszorozzuk vagy elosztjuk -1-gyel?',
        options: [
          'A relációs jel azonnal megfordul (pl. < jelből > lesz).',
          'A relációs jel nem változik, csak az előjelek.',
          'Egyenlőség jellé alakul.',
          'Csak akkor fordul meg, ha x pozitív szám volt.'
        ],
        correctAnswer: 0,
        hint: 'Pl. 2 < 5, de ha beszorzod -1-gyel: -2 és -5 viszonya: -2 > -5!',
        explanation: 'Az egyenlőtlenségek alaptétele: negatív számmal való szorzáskor vagy osztáskor az egyenlőtlenség relációjele kötelezően megfordul!'
      },
      {
        id: 'qiq1-10',
        level: 1,
        question: 'Mi a valós megoldása az x² + 4 ≤ 0 egyenlőtlenségnek?',
        options: [
          'M = ∅ (nincs megoldás)',
          'x ∈ [-2; 2]',
          'x = -2',
          'M = ℝ'
        ],
        correctAnswer: 0,
        hint: 'x² legalább 0, így x² + 4 legalább 4.',
        explanation: 'Mivel x² ≥ 0 minden valós számra, ezért x² + 4 ≥ 4 mindig pozitív! Így sohasem lehet ≤ 0, a megoldáshalmaz üres: M = ∅.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Két zérushellyel rendelkező normál alakú egyenlőtlenségek (D > 0)',
    subtitle: '10 számításos feladat normál alakú másodfokú kifejezések zérushelyeiről és intervallumairól',
    range: '11–20. kérdés',
    focus: 'Gyökmódszer, parabola rajzolása, szorzattá alakítás, negatív főegyüttható kezelése',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-blue-600',
    questions: [
      {
        id: 'qiq2-1',
        level: 2,
        question: 'Felfelé nyíló parabola esetén (a > 0, D > 0) hol veszi fel a másodfokú függvény a negatív értékeket?',
        options: [
          'Kizárólag a két valós zérushely KÖZÖTT (x₁ < x < x₂).',
          'A két zérushelyen KÍVÜL (x < x₁ vagy x > x₂).',
          'Minden valós számra negatív.',
          'Csak a csúcspontban negatív, máshol nulla.'
        ],
        correctAnswer: 0,
        hint: 'Képzeld el a csésze alakú parabolát: a csúcsa lent van az x-tengely alatt a két tengelymetszet között!',
        explanation: 'Ha a > 0, a parabola felfelé nyílik ("∪"). A két zérushely között a görbe az x-tengely alá süllyed (y < 0), a zérushelyeken kívül pedig a tengely felett fut (y > 0).'
      },
      {
        id: 'qiq2-2',
        level: 2,
        question: 'Mi az x² - 4x + 3 < 0 egyenlőtlenség megoldása?',
        options: [
          'x ∈ ]1; 3[',
          'x ∈ [1; 3]',
          'x ∈ ]-∞; 1[ ∪ ]3; ∞[',
          'x ∈ ]-3; -1['
        ],
        correctAnswer: 0,
        hint: 'Bontsd szorzatra: (x - 1)(x - 3) < 0, vagy oldd meg az egyenletet a megoldóképlettel!',
        explanation: 'Az x² - 4x + 3 = 0 egyenlet gyökei x₁ = 1 és x₂ = 3. Mivel a = 1 > 0 és a feltétel < 0, a megoldás a két zérushely közötti nyílt intervallum: x ∈ ]1; 3[.'
      },
      {
        id: 'qiq2-3',
        level: 2,
        question: 'Mi a megoldása az x² - 5x + 6 ≥ 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-∞; 2] ∪ [3; ∞[',
          'x ∈ [2; 3]',
          'x ∈ ]-∞; 2[ ∪ ]3; ∞[',
          'x ∈ ]2; 3['
        ],
        correctAnswer: 0,
        hint: 'Gyökök: x₁ = 2, x₂ = 3. A reláció ≥ 0 (nemnegatív, azaz kívül és a határokon)!',
        explanation: 'Az x² - 5x + 6 = (x - 2)(x - 3) ≥ 0 zérushelyei 2 és 3. Felfelé nyíló parabolánál a ≥ 0 értékek a két gyökön KÍVÜL és a zérushelyeken találhatók: x ∈ ]-∞; 2] ∪ [3; ∞[.'
      },
      {
        id: 'qiq2-4',
        level: 2,
        question: 'Mely intervallum alkotja az x² - x - 12 ≤ 0 egyenlőtlenség megoldását?',
        options: [
          'x ∈ [-3; 4]',
          'x ∈ ]-3; 4[',
          'x ∈ ]-∞; -3] ∪ [4; ∞[',
          'x ∈ [-4; 3]'
        ],
        correctAnswer: 0,
        hint: 'Szorzatalak: (x - 4)(x + 3) ≤ 0. Melyek a gyökök?',
        explanation: 'Az x² - x - 12 = 0 egyenlet gyökei x₁ = -3 és x₂ = 4. A ≤ 0 feltétel miatt a két gyök közötti zárt intervallum a helyes: x ∈ [-3; 4].'
      },
      {
        id: 'qiq2-5',
        level: 2,
        question: 'Mi a megoldása a 2x² - 8x > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ]-∞; 0[ ∪ ]4; ∞[',
          'x ∈ ]0; 4[',
          'x ∈ [0; 4]',
          'x > 4'
        ],
        correctAnswer: 0,
        hint: 'Emelj ki 2x-et: 2x(x - 4) > 0. A zérushelyek 0 és 4.',
        explanation: 'A 2x(x - 4) > 0 kifejezés zérushelyei x₁ = 0 és x₂ = 4. Mivel a = 2 > 0 és a reláció > 0, a két gyökön kívüli tartomány a megoldás: x ∈ ]-∞; 0[ ∪ ]4; ∞[.'
      },
      {
        id: 'qiq2-6',
        level: 2,
        question: 'Mi az x² + 2x - 8 > 0 egyenlőtlenség megoldása?',
        options: [
          'x ∈ ]-∞; -4[ ∪ ]2; ∞[',
          'x ∈ ]-4; 2[',
          'x ∈ [-4; 2]',
          'x ∈ ]-∞; -2[ ∪ ]4; ∞['
        ],
        correctAnswer: 0,
        hint: 'Gyökök: x₁ = -4 és x₂ = 2 (mert -4 · 2 = -8 és -4 + 2 = -2).',
        explanation: 'Az (x + 4)(x - 2) > 0 zérushelyei -4 és 2. Mivel > 0-t keresünk, a két gyökön kívüli unió a megoldás: x ∈ ]-∞; -4[ ∪ ]2; ∞[.'
      },
      {
        id: 'qiq2-7',
        level: 2,
        question: 'Hogyan célszerű átalakítani a -x² + 3x - 2 > 0 egyenlőtlenséget, hogy a főegyüttható pozitív legyen?',
        options: [
          'Megszorozzuk mindkét oldalt -1-gyel: x² - 3x + 2 < 0 (a relációjel megfordul).',
          'Megszorozzuk -1-gyel: x² - 3x + 2 > 0 (a jel marad változatlan).',
          'Gyököt vonunk belőle.',
          'Hozzáadunk 2-t mindkét oldalhoz és elhagyjuk a mínuszjelet.'
        ],
        correctAnswer: 0,
        hint: 'Negatív számmal szorozva minden tag előjele változik, és a relációjel is megfordul!',
        explanation: 'A -x² + 3x - 2 > 0 egyenlőtlenséget (-1)-gyel beszorozva megkapjuk a standard alakot: x² - 3x + 2 < 0. Ekkor már kényelmesen használható a megszokott felfelé nyíló parabolás szabály.'
      },
      {
        id: 'qiq2-8',
        level: 2,
        question: 'Mely x értékekre negatív az f(x) = (x - 1)(x - 7) függvény értéke?',
        options: [
          'x ∈ ]1; 7[',
          'x ∈ [1; 7]',
          'x ∈ ]-∞; 1[ ∪ ]7; ∞[',
          'x < 1'
        ],
        correctAnswer: 0,
        hint: 'Egy szorzat akkor negatív, ha a két tényező ellentétes előjelű. Ez pontosan a két zérushely között áll fenn.',
        explanation: 'A két zérushely x₁ = 1 és x₂ = 7. A másodfokú tag együtthatója +1 (pozitív), így a két zérushely között f(x) < 0: x ∈ ]1; 7[.'
      },
      {
        id: 'qiq2-9',
        level: 2,
        question: 'Mi a megoldása az x(x + 5) ≤ 0 egyenlőtlenségnek?',
        options: [
          'x ∈ [-5; 0]',
          'x ∈ ]-5; 0[',
          'x ∈ ]-∞; -5] ∪ [0; ∞[',
          'x ∈ [0; 5]'
        ],
        correctAnswer: 0,
        hint: 'A zérushelyek -5 és 0. A feltétel ≤ 0 (zárt intervallum).',
        explanation: 'Az x(x + 5) = 0 zérushelyei -5 és 0. Felfelé nyíló parabolánál a ≤ 0 feltétel a két gyök közötti zárt szakaszon teljesül: x ∈ [-5; 0].'
      },
      {
        id: 'qiq2-10',
        level: 2,
        question: 'Oldd meg a 3x² - 27 ≥ 0 egyenlőtlenséget!',
        options: [
          'x ∈ ]-∞; -3] ∪ [3; ∞[',
          'x ∈ [-3; 3]',
          'x ∈ ]-3; 3[',
          'x ≥ 3'
        ],
        correctAnswer: 0,
        hint: 'Oszd el 3-mal mindkét oldalt: x² - 9 ≥ 0.',
        explanation: '3-mal osztva kapjuk: x² - 9 ≥ 0. A zérushelyek -3 és 3. Mivel ≥ 0, a megoldás a határok és a külső tartományok uniója: x ∈ ]-∞; -3] ∪ [3; ∞[.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Különleges diszkriminánsú esetek, törtek és érettségi feladatok',
    subtitle: '10 összetett feladat D = 0, D < 0 esetekről, törtes egyenlőtlenségekről és paraméteres kérdésekről',
    range: '21–30. kérdés',
    focus: 'Lebegő parabola, érintő parabola, törtes kifejezések kikötései, paraméteres feladatok',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'qiq3-1',
        level: 3,
        question: 'Ha egy másodfokú kifejezésnél D < 0 és a > 0, mi lesz az ax² + bx + c > 0 egyenlőtlenség megoldása?',
        options: [
          'M = ℝ (minden valós szám megoldás, mert a parabola a tengely felett lebeg).',
          'M = ∅ (nincs megoldás, mert a diszkrimináns negatív).',
          'Csak x > 0 számok.',
          'Egyetlen pont {0}.'
        ],
        correctAnswer: 0,
        hint: 'Ha D < 0, a parabolának nincs metszéspontja az x-tengellyel. Ha felfelé nyílik, hol halad a teljes görbe?',
        explanation: 'Ha D < 0, a görbe sehol sem metszi és nem is érinti az x-tengelyt. Mivel a > 0, a csúcspontja és minden pontja szigorúan az x-tengely felett helyezkedik el (y > 0 minden x-re). Így ax² + bx + c > 0 minden valós x-re igaz: M = ℝ!'
      },
      {
        id: 'qiq3-2',
        level: 3,
        question: 'Mi a megoldása az x² + 2x + 5 < 0 egyenlőtlenségnek?',
        options: [
          'M = ∅ (üres halmaz)',
          'M = ℝ',
          'x ∈ ]-5; -1[',
          'x < -1'
        ],
        correctAnswer: 0,
        hint: 'Számold ki a diszkriminánst: D = 2² - 4·1·5 = 4 - 20 = -16 < 0. Lehet-e valaha negatív egy felfelé nyíló lebegő parabola?',
        explanation: 'D = 4 - 20 = -16 < 0, és a = 1 > 0. Ez egy felfelé nyíló lebegő parabola, amelynek értéke minden valós számra pozitív (pl. teljes négyzetté alakítva: (x + 1)² + 4 ≥ 4 > 0). Emiatt a kifejezés sohasem lehet < 0, így M = ∅.'
      },
      {
        id: 'qiq3-3',
        level: 3,
        question: 'Mi az x² - 6x + 9 ≤ 0 egyenlőtlenség megoldáshalmaza?',
        options: [
          'M = {3} (egyetlen szám)',
          'M = ∅',
          'x ≤ 3',
          'x ∈ [0; 6]'
        ],
        correctAnswer: 0,
        hint: 'Vedd észre az azonosságot: x² - 6x + 9 = (x - 3)². Egy négyzet mikor lehet ≤ 0?',
        explanation: '(x - 3)² mindig ≥ 0 minden valós számra. Szigorúan negatív sosem lehet, egyedül x = 3 esetén lesz egyenlő 0-val. Így a megoldás az egyelemű halmaz: M = {3}.'
      },
      {
        id: 'qiq3-4',
        level: 3,
        question: 'Mi a megoldása az x² - 10x + 25 > 0 egyenlőtlenségnek?',
        options: [
          'x ∈ ℝ \\ {5} (minden valós szám, kivéve az 5-öt)',
          'M = ℝ',
          'x > 5',
          'M = ∅'
        ],
        correctAnswer: 0,
        hint: '(x - 5)² mikor szigorúan nagyobb nullánál?',
        explanation: 'x² - 10x + 25 = (x - 5)². Egy valós szám négyzete mindenhol szigorúan pozitív, kivéve ha az alap 0, vagyis ha x = 5 (ekkor 0² = 0, ami nem > 0). Ezért x ∈ ℝ \\ {5}.'
      },
      {
        id: 'qiq3-5',
        level: 3,
        question: 'Mi a megoldása a -x² + 4x - 5 ≥ 0 egyenlőtlenségnek?',
        options: [
          'M = ∅ (nincs megoldás)',
          'M = ℝ',
          'x ∈ [1; 5]',
          'x = 2'
        ],
        correctAnswer: 0,
        hint: 'Szorozd meg -1-gyel: x² - 4x + 5 ≤ 0. Számold ki a diszkriminánst: D = 16 - 20 = -4 < 0!',
        explanation: '(-1)-gyel beszorozva: x² - 4x + 5 ≤ 0. Teljes négyzetté alakítva: (x - 2)² + 1 ≤ 0. Mivel a bal oldal minimuma +1, soha nem lehet ≤ 0. Ezért nincs megoldás: M = ∅.'
      },
      {
        id: 'qiq3-6',
        level: 3,
        question: 'Hogyan oldható meg helyesen az (x - 2) / (x + 3) > 0 törtes egyenlőtlenség?',
        options: [
          'A hányados előjele megegyezik a szorzat (x - 2)(x + 3) > 0 előjelével, kizárva az x = -3 nevezőt: x ∈ ]-∞; -3[ ∪ ]2; ∞[.',
          'Beszorozzuk mindkét oldalt (x + 3)-mal, így x - 2 > 0, azaz x > 2.',
          'Csak a számlálót egyenlővé tesszük nullával.',
          'Mivel tört, soha nincs valós megoldása.'
        ],
        correctAnswer: 0,
        hint: 'Két szám hányadosa akkor pozitív, ha azonos előjelűek (mindkettő pozitív vagy mindkettő negatív), pont úgy, mint a szorzatuk!',
        explanation: 'Egy tört és egy szorzat előjele azonos. Az (x - 2)(x + 3) > 0 gyökei -3 és 2, kívül pozitívak. Mivel törtnél a nevező nem lehet 0 (x ≠ -3), az intervallum nyílt: x ∈ ]-∞; -3[ ∪ ]2; ∞[.'
      },
      {
        id: 'qiq3-7',
        level: 3,
        question: 'Mi a megoldása az (x + 1) / (x - 4) ≤ 0 törtes egyenlőtlenségnek?',
        options: [
          'x ∈ [-1; 4[ (a -1-nél zárt, de a 4-nél NYÍLT a nevező kikötése miatt)',
          'x ∈ [-1; 4] (mindkét oldalon zárt)',
          'x ∈ ]-1; 4[ (mindkét oldalon nyílt)',
          'x ∈ ]-∞; -1] ∪ ]4; ∞['
        ],
        correctAnswer: 0,
        hint: 'A számláló lehet nulla (ekkor a tört értéke 0 ≤ 0 teljesül), de a nevező SOHA nem lehet nulla!',
        explanation: 'A tört értéke 0 lehet, ha x = -1 (ezért a -1 benne van a megoldásban, zárt zárójellel). Viszont x = 4 esetén a nevező 0 lenne, ami nem értelmezett, ezért 4-nél a zárójelnek kötelezően nyíltnak kell lennie: x ∈ [-1; 4[.'
      },
      {
        id: 'qiq3-8',
        level: 3,
        question: 'Milyen k valós paraméter esetén van két különböző valós gyöke az x² - 4x + k = 0 egyenletnek?',
        options: [
          'k < 4',
          'k > 4',
          'k = 4',
          'k ≤ 4'
        ],
        correctAnswer: 0,
        hint: 'Két különböző valós gyök feltétele: D > 0. D = b² - 4ac = 16 - 4k.',
        explanation: 'D = (-4)² - 4·1·k = 16 - 4k. Két különböző gyökhöz D > 0 szükséges: 16 - 4k > 0 ⟹ 16 > 4k ⟹ k < 4.'
      },
      {
        id: 'qiq3-9',
        level: 3,
        question: 'Mi a megoldáshalmaza a 2x² - 4x + 7 > 0 egyenlőtlenségnek?',
        options: [
          'M = ℝ (minden valós szám)',
          'M = ∅',
          'x ∈ ]1; 7[',
          'x > 2'
        ],
        correctAnswer: 0,
        hint: 'Számítsd ki a diszkriminánst: D = (-4)² - 4·2·7 = 16 - 56 = -40 < 0. Főegyüttható: a = 2 > 0.',
        explanation: 'Mivel a = 2 > 0 és a diszkrimináns D = -40 < 0, a parabola a teljes valós számegyenesen az x-tengely felett helyezkedik el. Így az értéke minden x ∈ ℝ esetén szigorúan nagyobb nullánál: M = ℝ.'
      },
      {
        id: 'qiq3-10',
        level: 3,
        question: 'Melyik intervallum adja meg a (2x - 6)(x + 1) < 0 egyenlőtlenség megoldását?',
        options: [
          'x ∈ ]-1; 3[',
          'x ∈ [-1; 3]',
          'x ∈ ]-∞; -1[ ∪ ]3; ∞[',
          'x ∈ ]1; 3['
        ],
        correctAnswer: 0,
        hint: 'A tényezők zérushelyei: 2x - 6 = 0 ⟹ x = 3, és x + 1 = 0 ⟹ x = -1.',
        explanation: 'Kiemelve a 2-est: 2(x - 3)(x + 1) < 0. A gyökök x₁ = -1 és x₂ = 3. Felfelé nyíló parabolánál a negatív értékek a két gyök közötti nyílt intervallumon találhatók: x ∈ ]-1; 3[.'
      }
    ]
  }
};

export const QuadraticInequalitiesQuiz: React.FC<QuadraticInequalitiesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-eq-masodfoku-egyenlotlensegek-quiz"
      topicTitle="Másodfokú egyenlőtlenségek – Kvíz és Gyakorló Feladatok"
      themeColor="blue"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      renderMatcher={(level, onNext, onRules) => (
        <QuadraticInequalitiesMatcher
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
        <QuadraticInequalitiesSorter
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

