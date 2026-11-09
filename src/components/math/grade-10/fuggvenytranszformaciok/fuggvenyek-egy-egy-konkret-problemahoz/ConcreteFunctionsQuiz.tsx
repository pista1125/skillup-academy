import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ConcreteFunctionsMatcher } from './ConcreteFunctionsMatcher';
import { ConcreteFunctionsSorter } from './ConcreteFunctionsSorter';
import {
  FunctionMachineSvg,
  FenceOptimizationSvg,
  PricingParadoxSvg,
  DomainRestrictionSvg
} from './ConcreteFunctionsFigures';

interface ConcreteFunctionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A függvény fogalma és a változók szerepe',
    description: 'A független változó (x) a bemenet, a függő változó (y = f(x)) a kimenet. Megadható képlettel, táblázattal, grafikonnal és szöveges szabállyal.',
    note: 'Gyakorlatban mindig tisztázni kell: mit mérünk x-szel és mit y-nal!',
    color: 'from-blue-500 to-indigo-600',
    figure: <FunctionMachineSvg size={180} />
  },
  {
    title: 'Kordonkerítés és geometriai modellek',
    description: 'K összhosszból: 4 oldalú szabad terület T(x) = x(K/2 - x) [max: x = y = K/4]. 1 fal mentén T(x) = x(K - 2x) [max: dupla terület!]. Sarokban T(x) = x(K - x) [max: négyszeres terület!].',
    note: 'Minden esetben lefelé nyíló parabola írja le a területet, a csúcspont a zérushelyek számtani közepénél van.',
    color: 'from-emerald-500 to-teal-600',
    figure: <FenceOptimizationSvg size={180} />
  },
  {
    title: 'A leárazási paradoxon és az egységár',
    description: 'Mennyiségi kedvezménynél a bevétel F(x) = x · (Alapár - d · x). A csúcspont után a bevétel csökken, hiába adunk el több terméket!',
    note: 'Kivédése: minimum egységár bevezetése vagy lépcsős árazás alkalmazása.',
    color: 'from-amber-500 to-rose-600',
    figure: <PricingParadoxSvg size={180} />
  },
  {
    title: 'Reális vs. Elméleti Értelmezési Tartomány',
    description: 'A tiszta algebra szerint Df = ℝ is lehetne, de a fizikai világban a hosszúság pozitív (x > 0), a darabszám pedig természetes szám (x ∈ ℕ).',
    note: 'Mindig vizsgáld meg, hogy az elméleti csúcspont vagy zérushely beletartozik-e a megengedett reális tartományba!',
    color: 'from-purple-500 to-indigo-600',
    figure: <DomainRestrictionSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és gyakorlati összefüggések',
    subtitle: 'Független és függő változók, reprezentációs módok, reális értelmezési tartomány.',
    range: '1–10. feladat',
    focus: 'Alapfogalmak és modellfelismerés',
    questions: [
      {
        id: 'cfq1-1',
        questionTypeBadge: 'Fogalom',
        question: 'Mi a független változó szerepe egy valós folyamat függvénykapcsolatában?',
        options: [
          'A bemeneti érték (általában x), amelyet szabadon megválaszthatunk vagy mérhetünk',
          'A folyamat végeredménye, amelyet a képlet kiszámol',
          'Egy állandó számérték, amely soha nem változhat',
          'A koordináta-rendszer függőleges tengelyének beosztása'
        ],
        correctAnswer: 0,
        explanation: 'A független változó (bemenet, input, x) az a mennyiség, amelynek értékét szabadon megválaszthatjuk (pl. eltelt idő, vásárolt darabszám, kerítés szélessége), és amely meghatározza a függő változó (y = f(x)) értékét.'
      },
      {
        id: 'cfq1-2',
        questionTypeBadge: 'Modellezés',
        question: 'Egy rendezvényen 46 méter kerítéssel téglalap alakú részt kerítenek el. Ha a szélesség x méter, mekkora a hosszúság (y)?',
        options: [
          'y = 23 - x',
          'y = 46 - x',
          'y = 46 / x',
          'y = 23 + x'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap kerülete K = 2x + 2y = 46 m. Mindkét oldalt 2-vel osztva: x + y = 23 m, ebből y = 23 - x.'
      },
      {
        id: 'cfq1-3',
        questionTypeBadge: 'Értelmezési tartomány',
        question: 'Mi a reális értelmezési tartománya az előző feladatbeli T(x) = x · (23 - x) területfüggvénynek a valóságban?',
        options: [
          ']0; 23[ (vagyis 0 < x < 23)',
          'Minden valós szám (ℝ)',
          ']-∞; 23]',
          '[0; 46]'
        ],
        correctAnswer: 0,
        explanation: 'A téglalap szélességének szigorúan pozitívnak kell lennie (x > 0), és a hosszúságnak is (y = 23 - x > 0 ⟹ x < 23). Ezért a valóságban csak a ]0; 23[ nyílt intervallum értelmezhető.'
      },
      {
        id: 'cfq1-4',
        questionTypeBadge: 'Fogalom',
        question: 'Melyik NEM tartozik a függvények négy klasszikus megadási módja közé?',
        options: [
          'Véletlenszerű sorsolás',
          'Hozzárendelési szabállyal (képlettel)',
          'Értéktáblázattal',
          'Grafikonnal (koordináta-rendszerben)'
        ],
        correctAnswer: 0,
        explanation: 'A függvények négy egyenrangú megadási módja: hozzárendelési szabállyal (képlettel), értéktáblázattal, grafikonnal és szöveges szabállyal.'
      },
      {
        id: 'cfq1-5',
        questionTypeBadge: 'Számítás',
        question: 'Egy boltban újraírható DVD-lemezeket árulnak az A(x) = [(x - 3)² + 7] · 100 Ft képlet szerint. Mennyit fizetünk, ha 3 lemezt vásárolunk?',
        options: [
          '700 Ft',
          '300 Ft',
          '1000 Ft',
          '1600 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve x = 3-at: A(3) = [(3 - 3)² + 7] · 100 = [0 + 7] · 100 = 700 Ft.'
      },
      {
        id: 'cfq1-6',
        questionTypeBadge: 'Számítás',
        question: 'Az előző DVD-s feladatban mennyit fizetünk 1 darab lemez vásárlása esetén?',
        options: [
          '1100 Ft',
          '700 Ft',
          '800 Ft',
          '1000 Ft'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve x = 1-et: A(1) = [(1 - 3)² + 7] · 100 = [(-2)² + 7] · 100 = [4 + 7] · 100 = 1100 Ft.'
      },
      {
        id: 'cfq1-7',
        questionTypeBadge: 'Fogalom',
        question: 'Miért diszkrét (nem folytonos) a lemezek vagy pólók vásárlását leíró függvény értelmezési tartománya?',
        options: [
          'Mert tárgyakat csak egész darabszámban (x ∈ ℕ) lehet vásárolni, tört darab nem értelmezhető',
          'Mert a termékek ára mindig kerek 100-asra végződik',
          'Mert a bolt nem tart nyitva a nap 24 órájában',
          'Mert a hozzárendelési szabályban zárójel szerepel'
        ],
        correctAnswer: 0,
        explanation: 'Megszámlálható elemek (darabáruk, személyek, jegyek) esetén a változó csak természetes számokat (0, 1, 2, ...) vehet fel, így a grafikon különálló pontokból áll.'
      },
      {
        id: 'cfq1-8',
        questionTypeBadge: 'Modellezés',
        question: 'Egy 50 literes hordóba egy csapon át percenként 12 liter víz folyik. Melyik képlet adja meg a hordóban lévő vízmennyiséget t perc elteltével?',
        options: [
          'V(t) = 50 + 12t',
          'V(t) = 50 - 12t',
          'V(t) = 12 + 50t',
          'V(t) = 50 · 12t'
        ],
        correctAnswer: 0,
        explanation: 'A kezdeti vízmennyiség 50 liter, ehhez t perc alatt 12 · t liter víz adódik hozzá, tehát V(t) = 50 + 12t.'
      },
      {
        id: 'cfq1-9',
        questionTypeBadge: 'Számítás',
        question: 'A T(x) = x · (23 - x) kordonterület mekkora, ha a szélességet x = 10 méterre választjuk?',
        options: [
          '130 m²',
          '230 m²',
          '115 m²',
          '100 m²'
        ],
        correctAnswer: 0,
        explanation: 'Ha x = 10, akkor a hosszúság y = 23 - 10 = 13 m. A terület T = 10 · 13 = 130 m².'
      },
      {
        id: 'cfq1-10',
        questionTypeBadge: 'Fogalom',
        question: 'Mit nevezünk a gyakorlatban a függvény zérushelyének?',
        options: [
          'Azt a bemeneti értéket, amelynél a függvény értéke (kimenete) 0 lesz',
          'A koordináta-rendszer origóját (0; 0 pont)',
          'A függvény legmagasabb pontját',
          'Azt a helyet, ahol a grafikon metszi az y tengelyt'
        ],
        correctAnswer: 0,
        explanation: 'Zérushelynek nevezzük az értelmezési tartomány azon x értékeit, ahol f(x) = 0 (például ahol elfogy az üzemanyag, 0 a bevétel, vagy a fellőtt rakéta földet ér).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Modellezés, optimalizálás és összefüggések',
    subtitle: 'Kordon-optimalizálás fal mentén, egységár vs. összár, parabola szimmetriája.',
    range: '11–20. feladat',
    focus: 'Matematikai modellek felállítása és elemzése',
    questions: [
      {
        id: 'cfq2-1',
        questionTypeBadge: 'Optimalizálás',
        question: 'Mekkora szélesség (x) esetén lesz maximális a 4 oldalról bekerített téglalap területe, ha K = 46 m a kerület [T(x) = x(23-x)]?',
        options: [
          'x = 11,5 m (négyzet alaknál)',
          'x = 10 m',
          'x = 23 m',
          'x = 15 m'
        ],
        correctAnswer: 0,
        explanation: 'A T(x) = -x² + 23x másodfokú függvény zérushelyei 0 és 23. A parabola csúcspontja a két zérushely számtani közepén van: x = (0 + 23) / 2 = 11,5 m. Ekkor a hosszúság is 11,5 m (négyzet alak), és a terület maximális.'
      },
      {
        id: 'cfq2-2',
        questionTypeBadge: 'Számítás',
        question: 'Mekkora a maximális terület értéke a fenti 4 oldalas kordon esetén (K = 46 m)?',
        options: [
          '132,25 m²',
          '264,5 m²',
          '121 m²',
          '529 m²'
        ],
        correctAnswer: 0,
        explanation: 'A maximális terület: T_max = 11,5 m · 11,5 m = 132,25 m².'
      },
      {
        id: 'cfq2-3',
        questionTypeBadge: 'Modellezés',
        question: 'Hogyan módosul a területfüggvény, ha a 46 méteres kerítést egy épület egyenes fala mellé állítjuk, így a fal felőli hosszú oldalra nem kell kerítés?',
        options: [
          'T(x) = x · (46 - 2x)',
          'T(x) = x · (46 - x)',
          'T(x) = x · (23 - x)',
          'T(x) = 2x · (46 - x)'
        ],
        correctAnswer: 0,
        explanation: 'A három bekerített oldal: 2 db x szélesség és 1 db y hosszúság: 2x + y = 46 m ⟹ y = 46 - 2x. A terület ezért T(x) = x · (46 - 2x).'
      },
      {
        id: 'cfq2-4',
        questionTypeBadge: 'Optimalizálás',
        question: 'Mekkora a maximális terület, ha a 46 méter kordont egy fal mellé állítjuk fel [T(x) = x(46 - 2x)]?',
        options: [
          '264,5 m² (pontosan a duplája a 4 oldalasnak)',
          '132,25 m²',
          '529 m²',
          '350 m²'
        ],
        correctAnswer: 0,
        explanation: 'A zérushelyek: x = 0 és x = 23. A maximum a csúcspontban: x = 11,5 m. Ekkor a hosszúság y = 46 - 2 · 11,5 = 23 m. A terület T = 11,5 · 23 = 264,5 m², ami pontosan a duplája a szabadon álló 4 oldalas területnek!'
      },
      {
        id: 'cfq2-5',
        questionTypeBadge: 'Közgazdaságtan',
        question: 'Egy boltban egy szurkolói mez alapára 4000 Ft. Minden vásárolt mez után darabonként 200 Ft engedmény jár. Mennyi az egységár (E) és a fizetendő összeg (F) x darab vásárlásakor?',
        options: [
          'E(x) = 4000 - 200x, és F(x) = x · (4000 - 200x)',
          'E(x) = 4000 - 200, és F(x) = 3800x',
          'E(x) = 4000 / x, és F(x) = 4000 - 200x',
          'E(x) = 4000 - 200x, és F(x) = 4000 - 200x²'
        ],
        correctAnswer: 0,
        explanation: 'x darab vásárlása esetén a darabonkénti kedvezmény 200 · x Ft, így az egy darabra eső ár E(x) = 4000 - 200x. A teljes fizetendő összeg a darabszám és az egységár szorzata: F(x) = x · (4000 - 200x).'
      },
      {
        id: 'cfq2-6',
        questionTypeBadge: 'Számítás',
        question: 'A fenti mezakcióban mennyit kell fizetnünk 10 mez, és mennyit 15 mez megvásárlásakor?',
        options: [
          '10 mezért 20 000 Ft-ot, 15 mezért pedig 15 000 Ft-ot',
          '10 mezért 20 000 Ft-ot, 15 mezért pedig 25 000 Ft-ot',
          '10 mezért 40 000 Ft-ot, 15 mezért pedig 45 000 Ft-ot',
          '10 mezért 18 000 Ft-ot, 15 mezért pedig 12 000 Ft-ot'
        ],
        correctAnswer: 0,
        explanation: '10 meznél az egységár: 4000 - 2000 = 2000 Ft/db ⟹ F(10) = 10 · 2000 = 20 000 Ft. 15 meznél az egységár: 4000 - 3000 = 1000 Ft/db ⟹ F(15) = 15 · 1000 = 15 000 Ft! (Paradoxon: 15 mez olcsóbb, mint 10 mez!).'
      },
      {
        id: 'cfq2-7',
        questionTypeBadge: 'Értelmezés',
        question: 'A DVD-lemezek ára A(x) = [(x - 3)² + 7] · 100 Ft. Hány darab lemez esetén lesz a fizetendő teljes összeg a legkisebb?',
        options: [
          'x = 3 darab esetén (700 Ft)',
          'x = 1 darab esetén',
          'x = 0 darab esetén',
          'x = 7 darab esetén'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a teljes négyzet (x - 3)² nemnegatív (legkisebb értéke 0, amikor x = 3), az összeg akkor minimális, ha ez a tag 0. Ekkor A(3) = [0 + 7] · 100 = 700 Ft.'
      },
      {
        id: 'cfq2-8',
        questionTypeBadge: 'Számítás',
        question: 'Mennyi a DVD-lemezek darabára (egységára), ha 3 darabot, illetve ha 4 darabot veszünk az A(x) = [(x-3)² + 7] · 100 Ft szabály mellett?',
        options: [
          '3 darabnál kb. 233,3 Ft/db, 4 darabnál pedig 200 Ft/db',
          '3 darabnál 700 Ft/db, 4 darabnál 800 Ft/db',
          '3 darabnál 200 Ft/db, 4 darabnál 250 Ft/db',
          'Mindkét esetben pontosan 233,3 Ft/db'
        ],
        correctAnswer: 0,
        explanation: '3 lemeznél az összeg 700 Ft, darabára 700 / 3 ≈ 233,33 Ft/db. 4 lemeznél A(4) = [(1)² + 7] · 100 = 800 Ft, darabára 800 / 4 = 200 Ft/db! Tehát 4 lemeznél kedvezőbb az egységár!'
      },
      {
        id: 'cfq2-9',
        questionTypeBadge: 'Modellezés',
        question: 'Ha a 46 méteres kordont egy meglévő sarokba helyezzük el (így két szomszédos oldal fal), milyen képlet adja meg a területet?',
        options: [
          'T(x) = x · (46 - x)',
          'T(x) = x · (23 - x)',
          'T(x) = x · (46 - 2x)',
          'T(x) = 2x · (23 - x)'
        ],
        correctAnswer: 0,
        explanation: 'A sarokba illesztésnél csak 1 db x szélesség és 1 db y hosszúság igényel kerítést: x + y = 46 m ⟹ y = 46 - x. A terület T(x) = x · (46 - x).'
      },
      {
        id: 'cfq2-10',
        questionTypeBadge: 'Optimalizálás',
        question: 'Mekkora a maximális terület a sarokba zárt kordon esetén [T(x) = x(46 - x)]?',
        options: [
          '529 m² (a szabadon álló terület négyszerese!)',
          '264,5 m²',
          '132,25 m²',
          '1058 m²'
        ],
        correctAnswer: 0,
        explanation: 'A csúcspont a zérushelyek (0 és 46) felezőpontjában: x = 23 m. Ekkor y = 46 - 23 = 23 m (négyzet alak), és a terület T = 23 · 23 = 529 m², ami a 4 oldalas terület (132,25 m²) pontosan négyszerese!'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Elemzés, paradoxonok és érettségi szintű modellezés',
    subtitle: 'Gazdasági optimum, szakaszonként értelmezett függvények, modellek kritikája.',
    range: '21–30. feladat',
    focus: 'Összetett feladatok és gyakorlati döntéshozatal',
    questions: [
      {
        id: 'cfq3-1',
        questionTypeBadge: 'Érettségi',
        question: 'A labdarúgó pólók leárazási modelljében [F(x) = x(4000 - 200x)] hány darab eladásánál ér el a boltvezető maximális bevételt?',
        options: [
          'x = 10 db eladásánál (20 000 Ft maximális bevétel)',
          'x = 20 db eladásánál',
          'x = 15 db eladásánál',
          'x = 5 db eladásánál'
        ],
        correctAnswer: 0,
        explanation: 'Az F(x) = -200x² + 4000x másodfokú függvény zérushelyei x = 0 és x = 20. A parabola csúcspontja x = (0 + 20) / 2 = 10 db-nál van. A maximális bevétel F(10) = 10 · 2000 = 20 000 Ft.'
      },
      {
        id: 'cfq3-2',
        questionTypeBadge: 'Kritikai gondolkodás',
        question: 'Mi történik a mezakcióban, ha egy vásárló 20 darab mezt szeretne venni [F(x) = x(4000 - 200x)]?',
        options: [
          'Az egységár 0 Ft lesz, így a vásárló teljesen ingyen viheti el mind a 20 darabot',
          'A boltvezető 20 000 Ft-ot kap',
          'A boltvezető 40 000 Ft bevételre tesz szert',
          'A rendszer automatikusan törli a rendelést'
        ],
        correctAnswer: 0,
        explanation: 'x = 20 esetén az egységár E(20) = 4000 - 200 · 20 = 0 Ft/db, a fizetendő összeg F(20) = 20 · 0 = 0 Ft. Ezért hibás a korlátlan lineáris engedmény!'
      },
      {
        id: 'cfq3-3',
        questionTypeBadge: 'Modelljavítás',
        question: 'Hogyan módosíthatja a boltvezető a modellt, hogy a darabár csökkenjen a darabszámmal, de soha ne menjen 1500 Ft alá?',
        options: [
          'Szakaszonként értelmezett függvénnyel: x ≤ 12 esetén E(x) = 4000 - 200x, míg x > 12 esetén E(x) = 1500 Ft',
          'A fix kedvezményt 200 Ft-ról 1000 Ft-ra növeli',
          'Csak legfeljebb 5 darab vásárlását engedélyezi',
          'Az alapárat 10 000 Ft-ra emeli'
        ],
        correctAnswer: 0,
        explanation: 'Meg kell határozni, mikor éri el a kedvezményes ár az 1500 Ft-ot: 4000 - 200x = 1500 ⟹ 200x = 2500 ⟹ x = 12,5. Tehát 12 db-ig érvényes az eredeti engedmény (E(12) = 1600 Ft), 13 darabtól kezdve pedig fixen 1500 Ft/db az ár.'
      },
      {
        id: 'cfq3-4',
        questionTypeBadge: 'Optimalizálás',
        question: 'A DVD-s feladatban a darabár E(x) = [(x - 3)² + 7] · 100 / x. Melyik x értékre lesz minimális az egységár az x ∈ {1, 2, ..., 10} tartományon?',
        options: [
          'x = 4 darabnál (200 Ft/db)',
          'x = 3 darabnál (233,3 Ft/db)',
          'x = 5 darabnál (220 Ft/db)',
          'x = 1 darabnál (1100 Ft/db)'
        ],
        correctAnswer: 0,
        explanation: 'Számítsuk ki az értékeket: E(1) = 1100, E(2) = 400, E(3) = 233,3, E(4) = 800/4 = 200, E(5) = 1100/5 = 220, E(6) = 1600/6 = 266,7. A legkisebb egységár x = 4-nél van (200 Ft/db)!'
      },
      {
        id: 'cfq3-5',
        questionTypeBadge: 'Érettségi',
        question: 'Hogyan tud egy vásárló 100 darab DVD lemezt megvásárolni a lehető legalacsonyabb áron, ha egyszerre legfeljebb 10 lemez vehető meg?',
        options: [
          '25 alkalommal vásárol 4-4 darabot (így mindegyikért a minimális 200 Ft-os egységárat fizeti)',
          '10 alkalommal vásárol 10-10 darabot',
          '33 alkalommal vásárol 3-3 darabot és 1 alkalommal 1 darabot',
          'Egyszerre megveszi a 100 darabot egy tételben'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az egységár x = 4 lemeznél a legalacsonyabb (200 Ft/db), 100 darabot 25 darab 4-es csomagban megvásárolva a teljes összeg 25 · 800 = 20 000 Ft lesz, szemben a 10 darab 10-es csomaggal (10 · 5600 = 56 000 Ft)!'
      },
      {
        id: 'cfq3-6',
        questionTypeBadge: 'Modellezés',
        question: 'Egy vállalkozás fix havi költsége 300 000 Ft, egy termék előállítási költsége 2000 Ft. A terméket 5000 Ft-ért értékesítik. Melyik függvény írja le a havi profitot (nyereséget) x eladott termék esetén?',
        options: [
          'P(x) = 3000x - 300 000',
          'P(x) = 5000x - 300 000',
          'P(x) = 2000x - 300 000',
          'P(x) = 7000x + 300 000'
        ],
        correctAnswer: 0,
        explanation: 'Bevétel: B(x) = 5000x. Összköltség: K(x) = 300 000 + 2000x. Nyereség: P(x) = B(x) - K(x) = 5000x - (300 000 + 2000x) = 3000x - 300 000 Ft.'
      },
      {
        id: 'cfq3-7',
        questionTypeBadge: 'Számítás',
        question: 'Az előző feladatbeli P(x) = 3000x - 300 000 nyereségfüggvénynek hol van a fedezeti pontja (zérushelye)? Hány terméktől kezdve nyereséges a cég?',
        options: [
          'x = 100 darabnál van a fedezeti pont; 101 darabtól nyereséges',
          'x = 150 darabnál; 151-től nyereséges',
          'x = 60 darabnál; 61-től nyereséges',
          'x = 50 darabnál; 51-től nyereséges'
        ],
        correctAnswer: 0,
        explanation: 'A fedezeti pontban a profit 0: 3000x - 300 000 = 0 ⟹ 3000x = 300 000 ⟹ x = 100 db. Tehát legalább 101 eladott termék szükséges a pozitív nyereséghez.'
      },
      {
        id: 'cfq3-8',
        questionTypeBadge: 'Érettségi',
        question: 'Egy kő elhajításakor a talaj feletti magasságát az idő függvényében a h(t) = 20t - 5t² (m) függvény írja le (t másodpercben). Mikor éri el a kő a maximális magasságát, és mennyi ez a magasság?',
        options: [
          't = 2 másodperckor, és a magasság 20 méter',
          't = 4 másodperckor, és a magasság 40 méter',
          't = 1 másodperckor, és a magasság 15 méter',
          't = 2,5 másodperckor, és a magasság 25 méter'
        ],
        correctAnswer: 0,
        explanation: 'A zérushelyek: 5t(4 - t) = 0 ⟹ t = 0 (elhajítás) és t = 4 (földet érés). A csúcspont t = (0 + 4)/2 = 2 s-nál van. A magasság: h(2) = 20 · 2 - 5 · 4 = 40 - 20 = 20 méter.'
      },
      {
        id: 'cfq3-9',
        questionTypeBadge: 'Geometria',
        question: 'Milyen arány áll fenn a bekeríthető maximális területek között adott K kerítésből a három elrendezésnél (4 oldal szabadon : 1 fal mellett : sarokban)?',
        options: [
          '1 : 2 : 4',
          '1 : 2 : 3',
          '1 : 1,5 : 2',
          '1 : 4 : 8'
        ],
        correctAnswer: 0,
        explanation: 'Szabadon álló: T_max = K²/16. Egy fal mellett: T_max = K²/8 = 2 · (K²/16). Sarokban: T_max = K²/4 = 4 · (K²/16). Az arány pontosan 1 : 2 : 4!'
      },
      {
        id: 'cfq3-10',
        questionTypeBadge: 'Gyakorlati döntés',
        question: 'Egy téglalap alakú virágágyást szeretnénk bekeríteni 20 méter díszkerítéssel. A kertész azt javasolja, hogy a szélesség legyen 2 méter, a hosszúság 8 méter. Optimális-e a kertész döntése terület szempontjából?',
        options: [
          'Nem, mert a terület így csak 16 m², míg négyzet alaknál (5 m × 5 m) 25 m² lehetne',
          'Igen, mert a 2 m és 8 m a legarányosabb méret',
          'Igen, mert a terület nem függ a téglalap oldalainak arányától, csak a kerületétől',
          'Nem, mert 20 méterből legfeljebb 10 m²-t lehet bekeríteni'
        ],
        correctAnswer: 0,
        explanation: 'A 2 m × 8 m terület T = 16 m². Ugyanakkor adott kerületből a négyzet alak (x = y = 20/4 = 5 m) adja a maximális területet: T = 5 · 5 = 25 m², ami több mint 50%-kal nagyobb!'
      }
    ]
  }
};

export const ConcreteFunctionsQuiz: React.FC<ConcreteFunctionsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="Függvények egy-egy konkrét problémához"
      subtitle="Teszteld a tudásodat a valós jelenségek modellezésében, az értelmezési tartományok vizsgálatában és a szélsőérték-keresésben!"
      themeColor="blue"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={ConcreteFunctionsMatcher}
      sorterComponent={ConcreteFunctionsSorter}
    />
  );
};

