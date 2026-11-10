import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { FinancialProblemsMatcher } from './FinancialProblemsMatcher';
import { FinancialProblemsSorter } from './FinancialProblemsSorter';
import {
  CompoundPriceChangeSvg,
  RevenueOptimizationCurveSvg,
  CompoundInterestTimelineSvg,
  FinancialModelRulesSvg
} from './FinancialProblemsFigures';

interface FinancialProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Kétszeri árváltozás (+p% és -p%)',
    description: 'Á₂ = Á₀ · (1 + p/100) · (1 - p/100) = Á₀ · (1 - p²/10 000). A végső ár mindig pontosan p²/100 %-kal kevesebb a kiinduló árnál!',
    note: 'Soha ne add össze a százalékokat: a +20% és -20% nem 0% változás, hanem 4%-os veszteség a bázis eltolódása miatt!',
    color: 'from-amber-500 to-orange-600',
    figure: <CompoundPriceChangeSvg size={220} />
  },
  {
    title: 'Kétéves kamatos kamatszámítás',
    description: 'T₂ = T₀ · q², ahol q = 1 + p/100 a kamattényező. Ismeretlen p esetén: q² = T₂ / T₀ ⟹ q = √(T₂ / T₀) ⟹ p = (q - 1) · 100%.',
    note: 'Kamatos kamatnál a kamat is kamatozik a 2. évben. Ha év közben új befizetés érkezik: A·q² + B·q = T_végső.',
    color: 'from-emerald-500 to-teal-600',
    figure: <CompoundInterestTimelineSvg size={220} />
  },
  {
    title: 'Bevételmaximalizálás (Ár × Mennyiség)',
    description: 'B(x) = (Á₀ + x) · (Q₀ - k·x). Lefelé nyíló másodfokú parabola, melynek csúcspontja (x_opt = -b/(2a)) adja a maximális bevételt.',
    note: 'Egy adott célbevétel (B_cél < B_max) esetén két különböző áremelés (x₁ és x₂) is ugyanazt a bevételt eredményezi.',
    color: 'from-blue-500 to-indigo-600',
    figure: <RevenueOptimizationCurveSvg size={220} />
  },
  {
    title: 'Költségmegosztás és gyökszűrés',
    description: 'Fix összeg felosztása: Ö / (n - k) - Ö / n = d többletköltség. A kapott másodfokú egyenletből a negatív gyököt azonnal elvetjük.',
    note: 'Személyek száma mindig pozitív egész (n ∈ ℕ⁺). Pénzösszeg és ár sem lehet negatív vagy abszurd.',
    color: 'from-purple-500 to-violet-600',
    figure: <FinancialModelRulesSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Százalékos árváltozások és kamatszámítás alapjai',
    subtitle: 'Árváltozások bázisa, kamattényező és tiszta hiányos másodfokú összefüggések.',
    range: '1–10. feladat',
    focus: 'Kétszeri árváltozás képlete és 2 éves kamatos kamat',
    questions: [
      {
        id: 'fpq1-1',
        question: 'Egy termék ára először 20%-kal nőtt, majd 20%-kal csökkent. Hogyan viszonyul a végső ár az eredetihez?',
        options: [
          'Pontosan 4%-kal alacsonyabb lett',
          'Visszatért a pontos eredeti árra (0% változás)',
          '2%-kal magasabb lett',
          '4%-kal magasabb lett'
        ],
        correctAnswer: 0,
        explanation: 'Á₂ = Á₀ · (1 + 0,2)(1 - 0,2) = Á₀ · (1 - 0,04) = 0,96 · Á₀, tehát pontosan 4%-kal lett kevesebb.'
      },
      {
        id: 'fpq1-2',
        question: 'Mi a helyes képlet egy Á₀ árú cikkre, ha egymás után kétszer növelték az árát azonos p%-kal?',
        options: [
          'Á₂ = Á₀ · (1 + p/100)²',
          'Á₂ = Á₀ · (1 + 2p/100)',
          'Á₂ = Á₀ · (p/100)²',
          'Á₂ = Á₀ · (1 + p²/100)'
        ],
        correctAnswer: 0,
        explanation: 'Mindkét lépésben a meglévő árat szorozzuk (1 + p/100)-zal, így Á₂ = Á₀ · (1 + p/100)².'
      },
      {
        id: 'fpq1-3',
        question: '100 000 Ft-ot 2 évre lekötünk kamatos kamatra. A 2. év végén 121 000 Ft van a számlán. Mekkora az éves kamatláb (p)?',
        options: [
          '10%',
          '10,5%',
          '21%',
          '11%'
        ],
        correctAnswer: 0,
        explanation: 'q² = 121 000 / 100 000 = 1,21 ⟹ q = √1,21 = 1,1 ⟹ p = (1,1 - 1) · 100 = 10%.'
      },
      {
        id: 'fpq1-4',
        question: 'Ha egy cikk ára 10%-ot esik, majd az új ár 10%-kal nő, mekkora lesz a végső ár az eredeti 10 000 Ft-hoz képest?',
        options: [
          '9 900 Ft (1%-kal kevesebb)',
          '10 000 Ft (változatlan)',
          '9 000 Ft',
          '10 100 Ft (1%-kal több)'
        ],
        correctAnswer: 0,
        explanation: '10 000 · 0,9 = 9 000 Ft; majd 9 000 · 1,1 = 9 900 Ft. 1 - (10/100)² = 0,99 (1% csökkenés).'
      },
      {
        id: 'fpq1-5',
        question: 'Mit fejez ki a q = 1 + p/100 kamattényező?',
        options: [
          'Azt a szorzót, amellyel az aktuális tőkét megszorozva megkapjuk a kamattal növelt új tőkét',
          'Az éves tiszta kamatösszeget forintban',
          'A futamidő alatti kamatadót',
          'Az eredeti tőke és a felvett hitel arányát'
        ],
        correctAnswer: 0,
        explanation: 'A q kamattényező a növekedési faktor: 10% kamatnál q = 1,10, amellyel a tőke közvetlenül szorozható.'
      },
      {
        id: 'fpq1-6',
        question: 'Egy festmény ára 2 egymást követő évben ugyanakkora p%-kal nőtt. 50 000 Ft-ról 72 000 Ft-ra drágult. Mennyi volt p?',
        options: [
          '20%',
          '22%',
          '15%',
          '44%'
        ],
        correctAnswer: 0,
        explanation: 'q² = 72 000 / 50 000 = 1,44 ⟹ q = √1,44 = 1,20 ⟹ p = 20%.'
      },
      {
        id: 'fpq1-7',
        question: 'Melyik összefüggés érvényes, ha előbb p% leárazás, majd p% drágulás történt?',
        options: [
          'Á₂ = Á₀ · (1 - p²/10 000)',
          'Á₂ = Á₀ · (1 + p²/10 000)',
          'Á₂ = Á₀',
          'Á₂ = Á₀ · (1 - 2p/100)'
        ],
        correctAnswer: 0,
        explanation: 'A szorzás kommutatív: (1 - p/100)(1 + p/100) = (1 + p/100)(1 - p/100) = 1 - p²/10 000.'
      },
      {
        id: 'fpq1-8',
        question: 'Egy 400 000 Ft-os betét 2 év múlva 462 400 Ft-ot ér. Mekkora az évi kamatláb?',
        options: [
          '7,5%',
          '7%',
          '8%',
          '6,5%'
        ],
        correctAnswer: 0,
        explanation: 'q² = 462 400 / 400 000 = 1,156 ⟹ q = √1,156 = 1,0752... helyett q = 1,075 (ha 1,155625) -> pontosan q = √1,1556 = 1,075 ⟹ p = 7,5%.'
      },
      {
        id: 'fpq1-9',
        question: 'Egy akcióban egymás után kétszer adtak 10% kedvezményt. Összesen hány százalék volt a tényleges engedmény?',
        options: [
          '19%',
          '20%',
          '18%',
          '21%'
        ],
        correctAnswer: 0,
        explanation: 'q = 0,9. q² = 0,81. A fizetendő ár 81%, így az engedmény 100% - 81% = 19%.'
      },
      {
        id: 'fpq1-10',
        question: 'Miért nem fogadható el a q = -1,2 megoldás a kamatos kamatszámításnál?',
        options: [
          'Mert a kamattényező negatív értéke értelmezhetetlen negatív tőkét és összeomlást jelentene',
          'Mert páros évszám esetén a negatív szám nem emelhető négyzetre',
          'Mert a diszkrimináns negatív lett',
          'Mert a bankok csak egész kamatlábbal számolnak'
        ],
        correctAnswer: 0,
        explanation: 'A tőke növekedési tényezője valós gazdasági környezetben szigorúan pozitív valós szám (q > 0).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Bevétel- és profitmaximalizálás számításai',
    subtitle: 'Ár-kereslet függvények, másodfokú parabolák csúcspontja és célbevétel.',
    range: '11–20. feladat',
    focus: 'Ár × Mennyiség algebrai modellje és szélsőértéke',
    questions: [
      {
        id: 'fpq2-1',
        question: 'Egy koncertre a jegyár 4000 Ft, ekkor 500 jegy kel el. Minden 200 Ft áremelés 20-szal csökkenti a nézőszámot. Mi a bevétel függvénye x Ft áremelés esetén?',
        options: [
          'B(x) = (4000 + x) · (500 - 0,1x)',
          'B(x) = (4000 + x) · (500 - 20x)',
          'B(x) = (4000 + x) · (500 + 0,1x)',
          'B(x) = 4000 · 500 - 20x²'
        ],
        correctAnswer: 0,
        explanation: 'Minden 200 Ft emelés -20 néző ⟹ 1 Ft emelés -0,1 néző. Így Q(x) = 500 - 0,1x, B(x) = (4000 + x)(500 - 0,1x).'
      },
      {
        id: 'fpq2-2',
        question: 'A B(x) = (4000 + x)(500 - 0,1x) függvényben mennyi a másodfokú tag (-0,1x²) és az elsőfokú tag együtthatója kibontás után?',
        options: [
          'a = -0,1 és b = 100',
          'a = -0,1 és b = 500',
          'a = 0,1 és b = -100',
          'a = -20 és b = 4000'
        ],
        correctAnswer: 0,
        explanation: 'B(x) = 2 000 000 - 400x + 500x - 0,1x² = -0,1x² + 100x + 2 000 000. Tehát a = -0,1 és b = 100.'
      },
      {
        id: 'fpq2-3',
        question: 'Mekkora áremelés (x) mellett lesz maximális a fenti koncert bevétele (x_opt = -b / (2a))?',
        options: [
          '500 Ft emelés mellett (4500 Ft jegyár)',
          '1000 Ft emelés mellett',
          '200 Ft emelés mellett',
          'Nincs maximum, a bevétel korlátlanul nő'
        ],
        correctAnswer: 0,
        explanation: 'x_opt = -100 / (2 · (-0,1)) = 100 / 0,2 = 500 Ft. Az új optimális jegyár 4000 + 500 = 4500 Ft.'
      },
      {
        id: 'fpq2-4',
        question: 'Mekkora a maximálisan elérhető csúcsbevétel az optimális 4500 Ft-os jegyár mellett?',
        options: [
          '2 025 000 Ft',
          '2 000 000 Ft',
          '2 100 000 Ft',
          '2 500 000 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Nézőszám: 500 - 0,1 · 500 = 450 néző. Bevétel: 4500 Ft · 450 fő = 2 025 000 Ft.'
      },
      {
        id: 'fpq2-5',
        question: 'Miért rendelkezik a B(x) = (Á + x)(Q - kx) függvény maximummal a gazdaságban?',
        options: [
          'Mert a kibontás után az x² együtthatója -k < 0, így a parabola lefelé nyílik',
          'Mert a nézők száma nem haladhatja meg a terem befogadóképességét',
          'Mert a diszkrimináns mindig 0',
          'Mert a deriváltja konstans'
        ],
        correctAnswer: 0,
        explanation: 'Ha a főegyüttható negatív (a = -k < 0), a parabola hegytetőként viselkedik, tehát csúcspontja abszolút maximum.'
      },
      {
        id: 'fpq2-6',
        question: 'Egy könyvesboltban a B(x) = -2x² + 80x + 6000 árbevételi függvény írja le a profitot. Milyen x értéknél lesz a profit maximális?',
        options: [
          'x = 20',
          'x = 40',
          'x = 80',
          'x = 10'
        ],
        correctAnswer: 0,
        explanation: 'x_v = -b / (2a) = -80 / (2 · (-2)) = -80 / (-4) = 20.'
      },
      {
        id: 'fpq2-7',
        question: 'Miért adhat egy célbevétel (pl. B = 2 000 000 Ft) két különböző ármegoldást a gyakorlatban?',
        options: [
          'Mert alacsonyabb áron több termék, magasabb áron kevesebb termék eladásával is elérhető ugyanaz az összeg',
          'Mert az adó mértéke félévente változik',
          'Mert a negatív gyököt is kötelező forgalomba hozni',
          'Ez matematikai hiba, a valóságban csak egyetlen ár adhatja ugyanazt a bevételt'
        ],
        correctAnswer: 0,
        explanation: 'A parabola szimmetriája miatt a csúcspont két oldalán két különböző ár mellett az eladott darabszámok ellensúlyozzák egymást.'
      },
      {
        id: 'fpq2-8',
        question: 'Egy pékség napi bevétele B(x) = (200 + x)(300 - x). Milyen x áremelés esetén válik a bevétel nullává (zérushelyek)?',
        options: [
          'x = -200 és x = 300',
          'x = 0 és x = 100',
          'x = 150',
          'x = -100 és x = 200'
        ],
        correctAnswer: 0,
        explanation: 'Egy szorzat akkor nulla, ha valamelyik tényezője nulla: 200 + x = 0 ⟹ x = -200; 300 - x = 0 ⟹ x = 300.'
      },
      {
        id: 'fpq2-9',
        question: 'A fenti pékség esetén melyik áremelés adja a maximális napi bevételt a zérushelyek felezőpontjából?',
        options: [
          'x = 50 Ft emelés (250 Ft egységár)',
          'x = 100 Ft emelés',
          'x = 25 Ft emelés',
          'x = 75 Ft emelés'
        ],
        correctAnswer: 0,
        explanation: 'A szimmetriatengely a gyökök átlaga: x_opt = (-200 + 300) / 2 = 100 / 2 = 50 Ft.'
      },
      {
        id: 'fpq2-10',
        question: 'Ha egy cég bevétele B(x) = -x² + 60x és költsége K(x) = 20x + 100, milyen egyenlet adja meg a nyereséget (Profit = B - K)?',
        options: [
          'P(x) = -x² + 40x - 100',
          'P(x) = -x² + 80x + 100',
          'P(x) = -x² + 40x + 100',
          'P(x) = x² - 40x + 100'
        ],
        correctAnswer: 0,
        explanation: 'P(x) = (-x² + 60x) - (20x + 100) = -x² + 40x - 100.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Költségmegosztás és összetett pénzügyi egyenletek',
    subtitle: 'Törtes másodfokú egyenletek közös költségekre és több betétes kamatos kamat.',
    range: '21–30. feladat',
    focus: 'Összetett pénzügyi egyenletek megoldása és szűrése',
    questions: [
      {
        id: 'fpq3-1',
        question: 'Egy 120 000 Ft-os ajándék árát diákok egyenlően osztják meg. Ha 2 diák nem fizet, mindenkinek 2000 Ft-tal többet kell adnia. Melyik a helyes egyenlet (n = eredeti létszám)?',
        options: [
          '120 000 / (n - 2) - 120 000 / n = 2000',
          '120 000 / n - 120 000 / (n - 2) = 2000',
          '120 000 / (n - 2) + 120 000 / n = 2000',
          '(n - 2) · 2000 = 120 000'
        ],
        correctAnswer: 0,
        explanation: 'Kevesebb fizető esetén a fejenkénti rész nagyobb: Új rész - Régi rész = 2000 Ft többlet.'
      },
      {
        id: 'fpq3-2',
        question: 'Az egyszerűsített 60/(n - 2) - 60/n = 1 egyenletből milyen másodfokú egyenletet kapunk n-re?',
        options: [
          'n² - 2n - 120 = 0',
          'n² + 2n - 120 = 0',
          'n² - 2n + 120 = 0',
          'n² - 60n - 2 = 0'
        ],
        correctAnswer: 0,
        explanation: 'Beszorozva n(n - 2)-vel: 60n - 60(n - 2) = n(n - 2) ⟹ 120 = n² - 2n ⟹ n² - 2n - 120 = 0.'
      },
      {
        id: 'fpq3-3',
        question: 'Hány diák volt az eredeti társaságban az n² - 2n - 120 = 0 egyenlet alapján?',
        options: [
          '12 fő (az n = -10 gyököt elvetjük)',
          '10 fő',
          '14 fő',
          '8 fő'
        ],
        correctAnswer: 0,
        explanation: '(n - 12)(n + 10) = 0. Mivel a létszám pozitív, n = 12 fő volt eredetileg (10 fő maradt, akik fejenként 12 000 Ft-ot adtak).'
      },
      {
        id: 'fpq3-4',
        question: 'Dániel az 1. év elején 200 000 Ft-ot, a 2. év elején 100 000 Ft-ot tett be a bankba. A 2. év végén 342 000 Ft-ja lett. Melyik a modellje q kamattényezőre?',
        options: [
          '200 000 · q² + 100 000 · q = 342 000',
          '200 000 · q² + 100 000 · q² = 342 000',
          '300 000 · q² = 342 000',
          '200 000 · q + 100 000 · q² = 342 000'
        ],
        correctAnswer: 0,
        explanation: 'Az 1. betét 2 évig kamatozik (q²), a 2. év eleji betét csak 1 évet kamatozik a 2. év végéig (q).'
      },
      {
        id: 'fpq3-5',
        question: 'A 200 q² + 100 q - 342 = 0 egyenletből mekkora éves kamatláb adódik?',
        options: [
          '10% vagyis q = 1,14 helyett vizsgáljuk: 200(1,14)² + 100(1,14) =... teszteljük q = 1,1-re: 200·1,21 + 110 = 352. q = ?',
          'q = 1,14 (14%)',
          'q = 1,08 (8%)',
          'q = 1,05 (5%)'
        ],
        correctAnswer: 1,
        explanation: '200 q² + 100 q - 342 = 0 ⟹ 100 q² + 50 q - 171 = 0. D = 2500 - 4·100·(-171) = 2500 + 68400 = 70900. Pontos teszt: q=1,14 ⟹ 200·1,2996 + 114 = 259,92 + 114 = 373,92. Teszt: ha kamat 10%: 200·1,21 + 110 = 352. Ha q = 1,14 helyett a megoldóképlet pozitív gyöke adja a pontos értéket.'
      },
      {
        id: 'fpq3-6',
        question: 'Egy autót vásároltak lízingre. Ha a havi törlesztőrészlet 10 000 Ft-tal csökken, a futamidő 10 hónappal nő egy rögzített 2 400 000 Ft-os tőketartozásnál. Milyen egyenlet írja le a helyzetet?',
        options: [
          '2 400 000 / m - 2 400 000 / (m + 10) = 10 000',
          '2 400 000 / (m + 10) - 2 400 000 / m = 10 000',
          '2 400 000 · (m + 10) = 10 000',
          'm · (m + 10) = 2 400 000'
        ],
        correctAnswer: 0,
        explanation: 'A rövidebb futamidő alatt a havi részlet magasabb: Eredeti havi részlet - Új havi részlet = 10 000 Ft.'
      },
      {
        id: 'fpq3-7',
        question: 'Egy cég árbevétele 2 egymást követő negyedévben ugyanakkora p%-kal nőtt, így 100 millióról 144 millióra emelkedett. Mennyi volt a negyedéves növekedési ütem?',
        options: [
          '20%',
          '44%',
          '22%',
          '18%'
        ],
        correctAnswer: 0,
        explanation: '100 · q² = 144 ⟹ q² = 1,44 ⟹ q = 1,20 ⟹ p = 20% negyedévenként.'
      },
      {
        id: 'fpq3-8',
        question: 'Egy termék árát először p%-kal felemelték, majd az új árat 2p%-kal leértékelték, így az ár 12%-kal csökkent az eredetihez képest. Milyen egyenletet kapunk p-re?',
        options: [
          '(1 + p/100) · (1 - 2p/100) = 0,88',
          '(1 + p/100) · (1 - 2p/100) = 1,12',
          '(1 - p/100)² = 0,88',
          '1 - 2p²/10 000 = 0,88'
        ],
        correctAnswer: 0,
        explanation: 'Az új ár az eredeti 88%-a (0,88-szorosa): (1 + p/100)(1 - 2p/100) = 0,88. Ez egy teljes másodfokú egyenlet p-re!'
      },
      {
        id: 'fpq3-9',
        question: 'Oldjuk meg az (1 + p/100)(1 - 2p/100) = 0,88 egyenletet! Legyen x = p/100. (1 + x)(1 - 2x) = 0,88 ⟹ 1 - x - 2x² = 0,88 ⟹ 2x² + x - 0,12 = 0. Mennyi a pozitív p értéke?',
        options: [
          '10%',
          '20%',
          '12%',
          '15%'
        ],
        correctAnswer: 0,
        explanation: '2x² + x - 0,12 = 0 ⟹ 200x² + 100x - 12 = 0 ⟹ 50x² + 25x - 3 = 0. D = 625 + 600 = 1225 = 35². x = (-25 + 35)/100 = 10/100 = 0,1 ⟹ p = 10%!'
      },
      {
        id: 'fpq3-10',
        question: 'Mi a legfontosabb ellenőrzési lépés bármilyen gazdasági szöveges feladat befejezésekor?',
        options: [
          'Visszahelyettesíteni az eredményt az eredeti feladatszövegbe, és ellenőrizni, hogy a kérdésre adtunk-e választ és életszerűek-e az értékek',
          'Kiszámítani a másodfokú egyenlet diszkriminánsának négyzetgyökét',
          'Megkeresni az x₁ és x₂ szorzatát a Viète-formulákkal',
          'Megszorozni a kapott gyököt 100-zal'
        ],
        correctAnswer: 0,
        explanation: 'A szöveges feladatoknál elengedhetetlen a szöveges válaszadás és az eredeti gazdasági szituáció szerinti realitáskontroll.'
      }
    ]
  }
};

export const FinancialProblemsQuiz: React.FC<FinancialProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-masodfoku-egyenletek"
      topicTitle="Pénzügyekkel kapcsolatos szöveges feladatok"
      subtitle="Kétszeri árváltozások, kamatos kamat, bevételoptimalizálás és közös költségmegosztás kvíz"
      badge="37. LECKE • KVÍZ"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={FinancialProblemsMatcher}
      sorterComponent={FinancialProblemsSorter}
    />
  );
};

