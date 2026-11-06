import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PracticeExamMatcher } from './PracticeExamMatcher';
import { PracticeExamSorter } from './PracticeExamSorter';
import {
  LogicSummaryTreeSvg,
  PythagorasThalesTimelineSvg,
  ZedCitiesTriangleSvg,
  SquareTrianglesSvg
} from './PracticeExamFigures';

interface PracticeExamQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A Logika Teljes Rendszere',
    description: 'A klasszikus logika alaptörvényei: Kizárt harmadik (A ∨ ¬A = I), Ellentmondásmentesség (A ∧ ¬A = H), 2ⁿ soros igazságtáblázatok.',
    note: 'Minden állítás vagy IGAZ, vagy HAMIS, harmadik eset nincs!',
    color: 'from-blue-600 to-indigo-700',
    figure: <LogicSummaryTreeSvg size={180} />
  },
  {
    title: 'Időrend és Kompetencia (Püthagorasz & Thalész)',
    description: 'Thalész (Kr. e. 624–548) és Püthagorasz (Kr. e. 560–480) élete 12 évig átfedte egymást (Kr. e. 560–548).',
    note: 'Püthagorasz Thalész születése után, de Thalész halála előtt született: elvileg találkozhattak!',
    color: 'from-amber-600 to-orange-700',
    figure: <PythagorasThalesTimelineSvg size={180} />
  },
  {
    title: 'Háromszög-egyenlőtlenség (Zedország)',
    description: 'Argad–Bugar távolság: 4000 km. Ciraz távolságai: 1300 km és 3700 km. Mivel 1300 + 3700 = 5000 > 4000 km, Ciraz NINCS az egyenes szakaszon!',
    note: 'Három pont akkor és csak akkor esik egy egyenesre, ha a két rövidebb távolság összege pontosan egyenlő a teljes távolsággal.',
    color: 'from-rose-600 to-red-700',
    figure: <ZedCitiesTriangleSvg size={180} />
  },
  {
    title: 'Geometriai Logikai Metszetek',
    description: 'ABCD négyzet háromszögeinek osztályozása:\n• P ∧ Q: derékszögű ÉS egyenlő szárú (ABCΔ)\n• P ∧ ¬Q: derékszögű, de nem egyenlő szárú (ABFΔ)\n• ¬P ∧ Q: egyenlő szárú, nem derékszögű (CFEΔ)',
    note: 'A logikai műveletek geometriai halmazokon való pontos alkalmazása.',
    color: 'from-emerald-600 to-teal-700',
    figure: <SquareTrianglesSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: 'Alapfogalmak, Tagadások és Műveletek',
    subtitle: 'Állítások felismerése, kizárt harmadik, érettségi tagadási típusfeladatok és alapműveletek.',
    range: '1–30. feladat',
    focus: 'Állítás fogalma, tagadás (érettségi sémák), VAGY, ÉS, alapvető igazságértékek',
    questions: [
      {
        id: 'pq1-1',
        questionTypeBadge: 'Állítás Fogalma',
        question: 'Mi a feltétele annak a matematikában, hogy egy mondatot kijelentésnek (állításnak) tekintsünk?',
        options: [
          'Hogy egyértelműen, objektív módon eldönthető legyen róla, hogy igaz vagy hamis',
          'Hogy mindenki egyetértsen a tartalmával',
          'Hogy tartalmazzon matematikai számokat vagy egyenletet',
          'Hogy nyelvtanilag hibátlan tőmondat legyen'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az igazságérték egyértelműségére: lehetséges-e objektíven I vagy H értéket rendelni hozzá?',
        explanation: 'A logikában állításnak (kijelentésnek) kizárólag azokat a kijelentő mondatokat nevezzük, amelyekről egyértelműen és objektíven megállapítható, hogy igazak vagy hamisak.'
      },
      {
        id: 'pq1-2',
        questionTypeBadge: 'Nem Állítás Felismerése',
        question: 'Az alábbi mondatok közül melyik NEM minősül logikai állításnak?',
        options: [
          '„Budapest sokkal szebb és élhetőbb város, mint Tokió.”',
          '„A sósav kémiai képlete HCl.”',
          '„A 2 az egyetlen páros prímszám.”',
          '„Minden háromszög belső szögeinek összege 180°.”'
        ],
        correctAnswer: 0,
        hint: 'Keresd a szubjektív, egyéni ízlést tükröző kijelentést, aminek nincs objektív igazságértéke!',
        explanation: 'A „szebb és élhetőbb” egyéni vélemény, szubjektív megítélés kérdése, objektív módon nem dönthető el róla, hogy igaz-e vagy hamis, ezért nem logikai állítás.'
      },
      {
        id: 'pq1-3',
        questionTypeBadge: 'Kizárt Harmadik Elve',
        question: 'Mit mond ki a klasszikus kétértékű logika kizárt harmadik törvénye (tertium non datur)?',
        options: [
          'Egy állítás vagy igaz, vagy hamis, harmadik lehetőség nincs (A ∨ ¬A mindig IGAZ)',
          'Két állítás közül a harmadik mindig hamis',
          'Egy állítás lehet félig igaz is bizonyos feltételekkel',
          'Ha két állítás igaz, a harmadik automatikusan igaz'
        ],
        correctAnswer: 0,
        hint: 'Nincs átmenet, nincs „talán” vagy harmadik érték a klasszikus logikában.',
        explanation: 'A kizárt harmadik elve szerint minden állítás pontosan a két lehetséges logikai érték (IGAZ vagy HAMIS) egyikét veszi fel, harmadik állapot nem létezik.'
      },
      {
        id: 'pq1-4',
        questionTypeBadge: 'Ellentmondásmentesség',
        question: 'Mit mond ki az ellentmondásmentesség elve a logikában?',
        options: [
          'Egy állítás és a tagadása nem lehet egyszerre igaz (A ∧ ¬A mindig HAMIS)',
          'Minden állítás igaz, amíg az ellenkezőjét nem bizonyítják',
          'Két hamis állításból igaz következik',
          'Egy matematikai tételnek nem lehet ellenpéldája'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e egyszerre igaz, hogy Péter 16 éves és Péter nem 16 éves?',
        explanation: 'Az ellentmondásmentesség törvénye kimondja, hogy egy állítás és annak tagadása kizárja egymást: nem lehetnek egyszerre igazak semmilyen körülmények között sem.'
      },
      {
        id: 'pq1-5',
        questionTypeBadge: 'Kettős Tagadás',
        question: 'Milyen logikai törvény érvényesül az állítás kétszeri tagadásakor: ¬(¬A)?',
        options: [
          'A kettős tagadás törvénye: ¬(¬A) logikailag egyenértékű az eredeti A állítással',
          'Mindig hamis értéket ad',
          'Mindig tautológiát eredményez',
          'Megfordítja az állítás igazságértékét'
        ],
        correctAnswer: 0,
        hint: '„Nem igaz, hogy nem szeretem a matematikát.” Mit jelent ez valójában?',
        explanation: 'A klasszikus logikában a negáció öninverz művelet: egy állítás tagadásának tagadása visszavezet az eredeti állításhoz (¬(¬A) ⟺ A).'
      },
      {
        id: 'pq1-6',
        questionTypeBadge: 'Érettségi Feladat 2005',
        question: 'Mi a pontos tagadása a következő érettségi állításnak: „Minden érettségi feladat egyszerű”?',
        options: [
          '„Van olyan érettségi feladat, ami nem egyszerű.”',
          '„Minden érettségi feladat bonyolult.”',
          '„Egyetlen érettségi feladat sem egyszerű.”',
          '„Van olyan érettségi feladat, ami egyszerű.”'
        ],
        correctAnswer: 0,
        hint: 'A „Minden...” cáfolatához hány ellenpélda szükséges?',
        explanation: 'Az univerzális állítást egyetlen ellenpélda cáfolja: elegendő, ha létezik legalább egy olyan feladat, amely nem egyszerű. A „minden feladat bonyolult” túlzó és hibás válasz.'
      },
      {
        id: 'pq1-7',
        questionTypeBadge: 'Érettségi Feladat 2013',
        question: 'Tamás azt állítja: „Minden háztartásban van televízió.” Melyik kijelentés Tamás állításának helyes tagadása?',
        options: [
          '„Van olyan háztartás, ahol nincs televízió.” (vagy: Nem minden háztartásban van TV)',
          '„Semelyik háztartásban sincs televízió.”',
          '„Van olyan háztartás, ahol van televízió.”',
          '„A legtöbb háztartásban nincs televízió.”'
        ],
        correctAnswer: 0,
        hint: 'Keresd a legkisebb feltételt, amely megdönti Tamás állítását!',
        explanation: 'A „minden háztartásban van” kijelentés tagadása az, hogy létezik legalább egy olyan háztartás, ahol nincs: „Van olyan háztartás, ahol nincs televízió.”'
      },
      {
        id: 'pq1-8',
        questionTypeBadge: 'Tankönyv 31. oldal (Kéményseprők)',
        question: '„A városban minden kéményseprő fekete ruhát visel.” Melyik állítás fejezi ki ennek a precíz tagadását?',
        options: [
          '„Van a városban olyan kéményseprő, aki nem fekete ruhát visel.”',
          '„A városban minden kéményseprő fehér ruhát visel.”',
          '„A városban nincs fekete ruhás kéményseprő.”',
          '„Egyik kéményseprő sem visel fekete ruhát.”'
        ],
        correctAnswer: 0,
        hint: 'A „Minden A rendelkezik B-vel” tagadása: „Van olyan A, ami nem rendelkezik B-vel”.',
        explanation: 'A tagadás pontos formája: létezik legalább egy kivétel: „Van a városban olyan kéményseprő, aki nem fekete ruhát visel.”'
      },
      {
        id: 'pq1-9',
        questionTypeBadge: 'Tankönyv 31. oldal (Autószalon)',
        question: '„Az autószalonban van olyan autó, amelyik kék.” Melyik kijelentés ennek a pontos tagadása?',
        options: [
          '„Az autószalonban egyik autó sem kék.” (vagy: Nincs az autószalonban kék autó)',
          '„Az autószalonban van olyan autó, amelyik nem kék.”',
          '„Az autószalonban minden autó kék.”',
          '„Az autószalonban minden autó piros.”'
        ],
        correctAnswer: 0,
        hint: 'A létezési állítás tagadása azt jelenti, hogy az adott tulajdonságú elem egyáltalán nem fordul elő.',
        explanation: 'A „Van olyan, amelyik kék” állítás akkor és csak akkor hamis, ha az összes autót megvizsgálva egyetlen kék sincs köztük: „Egyik autó sem kék.”'
      },
      {
        id: 'pq1-10',
        questionTypeBadge: 'Tankönyv 29. oldal (Atomórák)',
        question: 'Melyik állítás a pontos tagadása a „Minden atomóra pontos” kijelentésnek?',
        options: [
          '„Van olyan atomóra, amelyik pontatlan (késik vagy siet).”',
          '„Minden atomóra pontatlan.”',
          '„Egyetlen atomóra sem pontos.”',
          '„Van olyan atomóra, amelyik pontos.”'
        ],
        correctAnswer: 0,
        hint: 'Elég egyetlen pontatlan óra a cáfolathoz!',
        explanation: 'A „Minden atomóra pontos” tagadása: „Van olyan atomóra, amelyik nem pontos” (azaz pontatlan).'
      },
      {
        id: 'pq1-11',
        questionTypeBadge: 'Tankönyv 29. oldal (Feladatok)',
        question: 'Mi a tagadása a „Van olyan feladat, amit nem tudok megoldani” állításnak?',
        options: [
          '„Minden feladatot meg tudok oldani.”',
          '„Van olyan feladat, amit meg tudok oldani.”',
          '„Egyetlen feladatot sem tudok megoldani.”',
          '„Nem minden feladatot tudok megoldani.”'
        ],
        correctAnswer: 0,
        hint: 'Ha nincs egyetlen megoldhatatlan feladat sem, akkor az összes megoldható!',
        explanation: 'A „Van olyan feladat, amit nem tudok megoldani” azt állítja, hogy létezik megoldhatatlan feladat. Ennek tagadása: egyetlen ilyen sincs, vagyis az összes feladatot meg tudom oldani.'
      },
      {
        id: 'pq1-12',
        questionTypeBadge: 'Tankönyv 31. oldal (Madarak)',
        question: 'Mi a tagadása a „Minden madár tud repülni” állításnak?',
        options: [
          '„Van olyan madár, amelyik nem tud repülni (pl. a pingvin vagy strucc).”',
          '„Egyetlen madár sem tud repülni.”',
          '„Minden madár repülésre képtelen.”',
          '„Van olyan madár, amelyik tud repülni.”'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a pingvinekre mint ellenpéldára!',
        explanation: 'Mivel léteznek röpképtelen madarak (pingvin, emu, kivi), az állítás tagadása: „Van olyan madár, amelyik nem tud repülni.”'
      },
      {
        id: 'pq1-13',
        questionTypeBadge: 'Tankönyv 31. oldal (Társasjátékok)',
        question: 'Mi a tagadása a „Van olyan társasjáték, amelyhez nem kell dobókocka” mondatnak?',
        options: [
          '„Minden társasjátékhoz kell dobókocka.”',
          '„Van olyan társasjáték, amelyhez kell dobókocka.”',
          '„Egyetlen társasjátékhoz sem kell dobókocka.”',
          '„A sakkozáshoz nem kell dobókocka.”'
        ],
        correctAnswer: 0,
        hint: 'A létezési hiány tagadása: mindegyikhez kötelezően kell!',
        explanation: 'A „Létezik kocka nélküli játék” tagadása: nem létezik ilyen, azaz kivétel nélkül minden társasjátékhoz kell dobókocka.'
      },
      {
        id: 'pq1-14',
        questionTypeBadge: 'Tankönyv 31. oldal (Állítások Értéke)',
        question: 'Mi a logikai értéke az állításnak: „A kutya nem emlősállat”?',
        options: [
          'HAMIS (0), mert a kutya emlősállat',
          'IGAZ (1)',
          'Nem állítás',
          'Relatív, a fajtától függ'
        ],
        correctAnswer: 0,
        hint: 'Biológiai tény: a kutyák emlősök.',
        explanation: 'Mivel a kutya a valóságban emlősállat, a mondat egyértelműen HAMIS állítás.'
      },
      {
        id: 'pq1-15',
        questionTypeBadge: 'Tankönyv 31. oldal (Számelmélet)',
        question: 'Mi a logikai értéke a „A 2 racionális szám” kijelentésnek?',
        options: [
          'IGAZ (1), mert a 2 felírható két egész szám hányadosaként (pl. 2/1 vagy 4/2)',
          'HAMIS (0), mert a 2 egész szám és nem tört',
          'HAMIS (0), mert a 2 prímszám',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'A racionális számok definíciója: p/q alakban felírható számok.',
        explanation: 'Minden egész szám racionális is, mivel felírható 2/1 alakban. Ezért a kijelentés IGAZ.'
      },
      {
        id: 'pq1-16',
        questionTypeBadge: 'Tankönyv 31. oldal (Szorzatok)',
        question: '„Három pozitív valós szám szorzata pozitív.” Milyen logikai értékű ez az állítás?',
        options: [
          'IGAZ (1), a pozitív számok szorzata mindig szigorúan pozitív',
          'HAMIS (0), mert lehet nulla is',
          'Csak egész számokra igaz',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: '(+) · (+) · (+) = ?',
        explanation: 'Pozitív számok szorzata mindig szigorúan nagyobb mint 0, sosem lehet negatív vagy nulla, így a kijelentés IGAZ.'
      },
      {
        id: 'pq1-17',
        questionTypeBadge: 'Tankönyv 31. oldal (Pozitív Szorzat)',
        question: '„Három egész szám szorzata pozitív.” Milyen logikai értékű ez az állítás?',
        options: [
          'HAMIS (0), mert ha van köztük nulla vagy páratlan sok negatív szám, a szorzat nem lesz pozitív',
          'IGAZ (1)',
          'Csak akkor hamis, ha mindhárom negatív',
          'Nem eldönthető'
        ],
        correctAnswer: 0,
        hint: 'Mit kapunk, ha a három egész szám például: 1, 2 és -3? Vagy ha az egyik 0?',
        explanation: 'A kijelentés általánosságban állítja, hogy bármely három egész szám szorzata pozitív. Ez HAMIS, ellenpélda: 1 · 2 · (-3) = -6 < 0, vagy 0 · 5 · 7 = 0.'
      },
      {
        id: 'pq1-18',
        questionTypeBadge: 'Diszjunkció Szabálya',
        question: 'Mikor IGAZ két állítás diszjunkciója (A ∨ B, VAGY kapcsolata)?',
        options: [
          'Pontosan akkor, ha az összetevők közül legalább az egyik igaz (vagy mindkettő)',
          'Kizárólag akkor, ha mindkét állítás egyszerre igaz',
          'Csak akkor, ha pontosan az egyik igaz, de a másik nem',
          'Ha mindkét állítás hamis'
        ],
        correctAnswer: 0,
        hint: 'A matematikai vagy megengedő jellegű!',
        explanation: 'A diszjunkció (A ∨ B) akkor és csak akkor hamis, ha mindkét tagja hamis (H ∨ H = H). Minden egyéb esetben (ha legalább az egyik igaz) IGAZ.'
      },
      {
        id: 'pq1-19',
        questionTypeBadge: 'Konjunkció Szabálya',
        question: 'Mikor IGAZ két állítás konjunkciója (A ∧ B, ÉS kapcsolata)?',
        options: [
          'Kizárólag akkor, ha mindkét tag egyszerre igaz (I ∧ I = I)',
          'Ha legalább az egyik tag igaz',
          'Ha az egyik tag igaz, a másik hamis',
          'Ha egyik tag sem hamis és sem igaz'
        ],
        correctAnswer: 0,
        hint: 'Az ÉS mindkét feltétel szigorú egyidejű teljesülését követeli meg.',
        explanation: 'A konjunkció szigorú művelet: egyetlen esetben igaz, ha mindkét állítás igaz (I ∧ I = I). Ha bármelyik összetevő hamis, az egész szorzat hamissá válik.'
      },
      {
        id: 'pq1-20',
        questionTypeBadge: 'A „de” Kötőszó Logikája',
        question: 'Melyik logikai alapműveletnek felel meg a magyar nyelvben a „de”, „ugyanakkor”, „bár” kötőszó?',
        options: [
          'Konjunkció (ÉS, ∧), mert mindkét összefűzött részállítás egyidejű valóságát állítja',
          'Diszjunkció (VAGY, ∨)',
          'Implikáció (KÖVETKEZIK, ⇒)',
          'Negáció (NEM, ¬)'
        ],
        correctAnswer: 0,
        hint: '„Péter okos, de lusta.” Mit állítunk Péterről? Hogy okos ÉS lusta!',
        explanation: 'Bár a köznyelvben ellentétet érzékeltet, a logikai értéke szerint mindkét állítás egyidejű fennállását jelenti: A DE B logikailag pontosan A ÉS B (konjunkció).'
      },
      {
        id: 'pq1-21',
        questionTypeBadge: 'Tankönyv 32. oldal (Oszthatósági Művelet)',
        question: 'A: „320 osztható 40-nel.” B: „320 osztható 50-nel.” Mi az A ∧ B állítás logikai értéke?',
        options: [
          'HAMIS, mert B hamis (320 nem osztható 50-nel, 320/50 = 6,4)',
          'IGAZ, mert 320 osztható 40-nel (320/40 = 8)',
          'IGAZ, mert a konjunkcióhoz elég egy igaz tag',
          'Nem értelmezhető'
        ],
        correctAnswer: 0,
        hint: 'A konjunkcióhoz (∧) mindkét résznek igaznak kell lennie!',
        explanation: 'A igaz (320/40 = 8), de B hamis (320 nem osztható 50-nel). Mivel I ∧ H = HAMIS, a konjunkció értéke HAMIS.'
      },
      {
        id: 'pq1-22',
        questionTypeBadge: 'Tankönyv 32. oldal (Oszthatósági VAGY)',
        question: 'Az előző feladat A és B állításaira mi az A ∨ B állítás logikai értéke?',
        options: [
          'IGAZ, mert A igaz (320 osztható 40-nel), és a diszjunkcióhoz elég legalább egy igaz tag',
          'HAMIS, mert B hamis',
          'Csak akkor igaz, ha 320 páratlan',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'A diszjunkció (∨) szabálya: I ∨ H = ?',
        explanation: 'Mivel A igaz (320 osztható 40-nel), az I ∨ H diszjunkció értéke IGAZ.'
      },
      {
        id: 'pq1-23',
        questionTypeBadge: 'Tankönyv 32. oldal (Összetett Érték)',
        question: 'Mi a logikai értéke az állításnak: „A 2 prímszám, VAGY a 7 páros szám”?',
        options: [
          'IGAZ (1), mert az első tag igaz (a 2 valóban prím), így a VAGY kapcsolat teljesül',
          'HAMIS (0), mert a 7 páratlan',
          'HAMIS (0), mert mindkettőnek igaznak kellene lennie',
          'Kétértékű'
        ],
        correctAnswer: 0,
        hint: 'I ∨ H = ?',
        explanation: 'Az első tag („a 2 prím”) igaz, a második tag („a 7 páros”) hamis. A VAGY kapcsolatban legalább egy igaz tag jelenléte elégséges: I ∨ H = IGAZ.'
      },
      {
        id: 'pq1-24',
        questionTypeBadge: 'Tankönyv 32. oldal (Összetett ÉS)',
        question: 'Mi a logikai értéke az állításnak: „A 2 prímszám, ÉS a 8 páros szám”?',
        options: [
          'IGAZ (1), mert mindkét összetevő állítás igaz (I ∧ I = I)',
          'HAMIS (0), mert a prímszámok nem párosak',
          'HAMIS (0), mert 2 és 8 összege 10',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: 'I ∧ I = ?',
        explanation: 'A 2 valóban prímszám (I), és a 8 valóban páros szám (I). Két igaz állítás konjunkciója IGAZ.'
      },
      {
        id: 'pq1-25',
        questionTypeBadge: 'Tankönyv 32. oldal (Negált Diszjunkció)',
        question: 'Mi a logikai értéke az állításnak: „A 6 nem páros szám, VAGY a 7 nem páros szám”?',
        options: [
          'IGAZ (1), mert a második tag igaz („a 7 nem páros szám” valóban igaz)',
          'HAMIS (0), mert a 6 páros',
          'HAMIS (0), mert a tagadás mindkét tagot hamissá teszi',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: '1. tag: „6 nem páros” = H. 2. tag: „7 nem páros” = I. Mennyi H ∨ I?',
        explanation: 'Az első tag hamis (hiszen a 6 páros), de a második tag igaz (hiszen a 7 páratlan, tehát nem páros). H ∨ I = IGAZ.'
      },
      {
        id: 'pq1-26',
        questionTypeBadge: 'Tankönyv 32. oldal (Örökzöld Növények)',
        question: 'Mi a pontos tagadása a „Van örökzöld növény” kijelentésnek?',
        options: [
          '„Nincs egyetlen örökzöld növény sem (minden növény lombhullató).”',
          '„Van olyan növény, amelyik nem örökzöld.”',
          '„Minden növény örökzöld.”',
          '„A fenyő nem örökzöld növény.”'
        ],
        correctAnswer: 0,
        hint: 'A létezés tagadása az univerzális hiány!',
        explanation: 'A „Létezik legalább egy örökzöld” állítás tagadása az, hogy egyetlen ilyen sincs a világon: „Nincs örökzöld növény.”'
      },
      {
        id: 'pq1-27',
        questionTypeBadge: 'Tankönyv 32. oldal (Sokszögek Átlói)',
        question: 'Igaz vagy hamis: „Minden sokszögnek van átlója”?',
        options: [
          'HAMIS, ellenpélda a HÁROMSZÖG (a háromszögnek 0 átlója van)',
          'IGAZ, mert a sokszögeknek mindig van átlójuk',
          'Csak konvex sokszögekre igaz',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: 'Hány átlója van a háromszögnek?',
        explanation: 'Az n oldalú sokszög átlóinak száma n(n - 3) / 2. Háromszög esetén n = 3, így 3(3 - 3)/2 = 0 átlója van! A háromszög ellenpélda, így az állítás HAMIS.'
      },
      {
        id: 'pq1-28',
        questionTypeBadge: 'Tankönyv 32. oldal (Abszolút Érték)',
        question: 'Igaz vagy hamis a kijelentés: „Bármely x valós szám abszolút értéke pozitív (|x| > 0)”?',
        options: [
          'HAMIS, ellenpélda az x = 0 (mivel |0| = 0, a 0 pedig nem pozitív, hanem nemnegatív!)',
          'IGAZ, mert az abszolút érték sosem negatív',
          'Csak negatív számokra hamis',
          'Ekvivalens az x ≠ 0 feltétellel'
        ],
        correctAnswer: 0,
        hint: 'A nulla pozitív szám? Nem, a nulla semleges (nemnegatív és nempozitív)!',
        explanation: 'A valós számok abszolút értéke nemnegatív (|x| ≥ 0). Az x = 0 esetén |0| = 0, ami nem pozitív (> 0), így az állítás HAMIS.'
      },
      {
        id: 'pq1-29',
        questionTypeBadge: 'Kompetenciamérés 2012 (Olimpia)',
        question: 'Kulcsár Győző 1972-ben Münchenben nyert aranyat, de 1976-ban nem nyert. „Kulcsár Győző Münchenben ÉS Montrealban is aranyérmet nyert.” Igaz-e a mondat?',
        options: [
          'HAMIS, mert a konjunkcióhoz mindkét olimpián aranyat kellett volna nyernie',
          'IGAZ, mert Münchenben aranyérmes volt',
          'Csak akkor hamis, ha Montrealban ezüstöt nyert',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'I ∧ H = ?',
        explanation: 'Mivel Montrealban nem nyert aranyat, az I ∧ H konjunkció értéke HAMIS.'
      },
      {
        id: 'pq1-30',
        questionTypeBadge: 'Logikai Alapösszegzés',
        question: 'Hány soros igazságtáblázat tartozik egy olyan formulához, amely 3 egyszerű állítást (P, Q, R) tartalmaz?',
        options: [
          '8 sor (2³ = 8)',
          '6 sor (2 · 3)',
          '9 sor (3²)',
          '4 sor (2²)'
        ],
        correctAnswer: 0,
        hint: 'Minden változó 2 értéket vehet fel: 2 · 2 · 2 = ?',
        explanation: 'A 2ⁿ kombinatorikai szabály alapján 3 független változóhoz 2³ = 8 soros igazságtáblázat szükséges.'
      }
    ]
  },
  2: {
    level: 2,
    title: 'Igazságtáblázatok, De Morgan és Következtetések',
    subtitle: 'De Morgan azonosságok levezetése, implikációk értékelése, szükséges és elégséges feltételek.',
    range: '31–60. feladat',
    focus: 'De Morgan törvények, táblázatok, implikáció szabálya, szükséges/elégséges feltételek, egyenletek',
    questions: [
      {
        id: 'pq2-1',
        questionTypeBadge: 'De Morgan I. Törvény',
        question: 'Hogyan alakítható át a De Morgan-azonosság szerint a ¬(A ∧ B) kifejezés?',
        options: [
          '¬A ∨ ¬B (a konjunkció tagadása a tagadások diszjunkciója)',
          '¬A ∧ ¬B',
          'A ∨ B',
          '¬(A ∨ B)'
        ],
        correctAnswer: 0,
        hint: 'A tagadás bevitelekor az ÉS művelet VAGY-ra változik!',
        explanation: 'Augustus De Morgan 1. azonossága: ¬(A ∧ B) ⟺ ¬A ∨ ¬B. Egy ÉS állítás akkor nem teljesül, ha legalább az egyik tagja hamis.'
      },
      {
        id: 'pq2-2',
        questionTypeBadge: 'De Morgan II. Törvény',
        question: 'Hogyan alakítható át a De Morgan-azonosság szerint a ¬(A ∨ B) kifejezés?',
        options: [
          '¬A ∧ ¬B (a diszjunkció tagadása a tagadások konjunkciója)',
          '¬A ∨ ¬B',
          'A ∧ B',
          '¬A ∨ B'
        ],
        correctAnswer: 0,
        hint: 'A tagadás bevitelekor a VAGY művelet ÉS-re változik!',
        explanation: 'De Morgan 2. azonossága: ¬(A ∨ B) ⟺ ¬A ∧ ¬B. Egy VAGY állítás csak akkor dől meg, ha sem az A, sem a B nem valósul meg.'
      },
      {
        id: 'pq2-3',
        questionTypeBadge: 'Tautológia Felismerése',
        question: 'Az alábbi formulák közül melyik minősül TAUTOLÓGIÁNAK (azonosan igaz állításnak)?',
        options: [
          'A ∨ ¬A (a kizárt harmadik törvénye)',
          'A ∧ ¬A (az ellentmondásmentesség törvénye)',
          'A ∧ B',
          '¬(A ∨ ¬A)'
        ],
        correctAnswer: 0,
        hint: 'Melyik formula ad az igazságtáblázat minden sorában IGAZ (1) értéket?',
        explanation: 'Az A ∨ ¬A kifejezés A bármely értékére (I vagy H) mindig IGAZ értéket ad (I ∨ H = I és H ∨ I = I), így tautológia.'
      },
      {
        id: 'pq2-4',
        questionTypeBadge: 'Kontradikció Felismerése',
        question: 'Az alábbi kifejezések közül melyik KONTRADIKCIÓ (azonosan hamis formula)?',
        options: [
          'A ∧ ¬A (egy állítás és tagadásának konjunkciója)',
          'A ∨ ¬A',
          'A ⇒ A',
          '¬(A ∧ B) ∨ A'
        ],
        correctAnswer: 0,
        hint: 'Melyik állítás lehetetlen, vagyis minden sorban HAMIS (0)?',
        explanation: 'Az A ∧ ¬A minden sorban HAMIS értéket vesz fel (I ∧ H = H és H ∧ I = H), mert egy állítás és tagadása nem teljesülhet egyszerre.'
      },
      {
        id: 'pq2-5',
        questionTypeBadge: 'Boole Abszorpciós Törvény',
        question: 'Milyen egyszerűbb alakra hozható az A ∧ (A ∨ B) összetett logikai formula?',
        options: [
          'Egyszerűen A-ra (elnyelési azonosság)',
          'B-re',
          'A ∧ B-re',
          'Mindig IGAZ-ra'
        ],
        correctAnswer: 0,
        hint: 'Ha A = I, a kifejezés I ∧ (I ∨ B) = I. Ha A = H, a kifejezés H ∧ (H ∨ B) = H.',
        explanation: 'Az igazságtáblázat minden sorában az A ∧ (A ∨ B) értéke pontosan megegyezik A logikai értékével. Ez az elnyelési (abszorpciós) szabály.'
      },
      {
        id: 'pq2-6',
        questionTypeBadge: 'Implikáció Szabálya',
        question: 'Melyik sorban vesz fel HAMIS értéket az A ⇒ B feltételes következtetés?',
        options: [
          'Kizárólag akkor, ha A = IGAZ és B = HAMIS (I ⇒ H = H)',
          'Ha A = HAMIS és B = HAMIS',
          'Ha A = HAMIS és B = IGAZ',
          'Ha mindkét változó IGAZ'
        ],
        correctAnswer: 0,
        hint: 'A feltétel teljesült, de az ígéret nem!',
        explanation: 'Az implikáció egyetlen esetben sérül: ha a premissza igaz, de a konklúzió hamis (I ⇒ H = H). Ha a premissza hamis, az implikáció nem sérülhet, így igaz.'
      },
      {
        id: 'pq2-7',
        questionTypeBadge: 'Megfordítás Alapszabálya',
        question: 'Ha egy matematikai tétel (A ⇒ B) IGAZ, mit tudunk biztosan a megfordításáról (B ⇒ A)?',
        options: [
          'Semmit: a megfordítás lehet igaz is és hamis is, külön bizonyítani vagy cáfolni kell',
          'Biztosan igaz, mert a matematikai igazságok kétirányúak',
          'Biztosan hamis, mert a megfordítás mindig ellenpéldát szül',
          'Csak geometriai tételeknél igaz'
        ],
        correctAnswer: 0,
        hint: '„Ha 6-tal osztható, akkor 3-mal is” (igaz) vs. „Ha 3-mal osztható, akkor 6-tal is” (hamis).',
        explanation: 'Egy igaz állítás megfordítása nem feltétlenül igaz! Lehet mindkettő igaz (ekvivalencia), de lehet az eredeti igaz és a megfordítás hamis is.'
      },
      {
        id: 'pq2-8',
        questionTypeBadge: 'Elégséges Feltétel',
        question: 'Mit jelent az, hogy egy feltétel ELÉGSÉGES?',
        options: [
          'Hogy a teljesülése már önmagában garantálja a következmény bekövetkeztét (A ⇒ B igaz)',
          'Hogy nélküle a következmény nem valósulhat meg',
          'Hogy mindkét állítás értéke azonos',
          'Hogy a feltétel számértéke eléri a minimumot'
        ],
        correctAnswer: 0,
        hint: 'Elég annyit tudni, hogy a feltétel igaz, máris biztos a cél!',
        explanation: 'Az A elégséges feltétele B-nek azt jelenti, hogy A megléte elégséges garancia B teljesüléséhez: ha A fennáll, abból szükségszerűen következik B.'
      },
      {
        id: 'pq2-9',
        questionTypeBadge: 'Szükséges Feltétel',
        question: 'Mit jelent az, hogy egy feltétel SZÜKSÉGES?',
        options: [
          'Hogy a megléte elengedhetetlen: ha nem teljesül, a cél sem valósulhat meg (B nélkül nincs A)',
          'Hogy ha teljesül, a cél automatikusan bekövetkezik',
          'Hogy a feltétel egyenértékű a céllal',
          'Hogy a feltétel mindig megelőzi időben a célt'
        ],
        correctAnswer: 0,
        hint: 'Nélkülözhetetlen követelmény, de önmagában még nem feltétlenül elég.',
        explanation: 'A B szükséges feltétele A-nak azt jelenti, hogy B nélkülözhetetlen velejárója A-nak. Ha B nem teljesül, A sem állhat fenn.'
      },
      {
        id: 'pq2-10',
        questionTypeBadge: 'Ekvivalencia (Akkor és csak akkor)',
        question: 'Mikor mondjuk azt, hogy két állítás EKVIVALENS (A ⟺ B)?',
        options: [
          'Amikor mindkét irányú következtetés igaz (A ⇒ B és B ⇒ A is teljesül, azaz pontosan ugyanakkor igazak)',
          'Amikor legalább az egyik irány igaz',
          'Amikor mindkét állítás tagadása hamis',
          'Amikor mindkét kifejezés azonos betűkből áll'
        ],
        correctAnswer: 0,
        hint: 'Oda-vissza kölcsönösen feltételezik egymást.',
        explanation: 'Az ekvivalencia (kétirányú implikáció) akkor és csak akkor igaz, ha a két állítás logikai értéke minden sorban azonos: mindkettő igaz vagy mindkettő hamis.'
      },
      {
        id: 'pq2-11',
        questionTypeBadge: 'Geometriai Feltételek: Négyzet és Téglalap',
        question: 'A: „A négyszög négyzet.” B: „A négyszög téglalap.” Melyik kijelentés helyes?',
        options: [
          'A elégséges feltétele B-nek, de B csak szükséges (nem elégséges) feltétele A-nak',
          'B elégséges feltétele A-nak, de A csak szükséges feltétele B-nek',
          'A és B egymásnak szükséges és elégséges feltételei',
          'Egyik sem feltétele a másiknak'
        ],
        correctAnswer: 0,
        hint: 'Minden négyzet téglalap? Igen. Minden téglalap négyzet? Nem!',
        explanation: 'Mivel minden négyzet szükségképpen téglalap is, a négyzetlét elégséges a téglalaphoz. Viszont a téglalaplét önmagában nem elég a négyzethez, csak elengedhetetlenül szükséges.'
      },
      {
        id: 'pq2-12',
        questionTypeBadge: 'Oszthatósági Feltételek: 24 és 8',
        question: 'A: „A szám osztható 24-gyel.” B: „A szám osztható 8-cal.” Melyik állítás igaz?',
        options: [
          'A elégséges feltétele B-nek, de nem szükséges feltétele',
          'A szükséges feltétele B-nek, de nem elégséges',
          'A és B ekvivalensek',
          'B elégséges feltétele A-nak'
        ],
        correctAnswer: 0,
        hint: '24 = 3 · 8. A 16 osztható 8-cal, de 24-gyel nem!',
        explanation: 'Ha egy szám 24-gyel osztható, akkor 8-cal is osztható (elégséges). De nem szükséges, mert pl. a 16 vagy 40 is osztható 8-cal anélkül, hogy 24-gyel osztható lenne.'
      },
      {
        id: 'pq2-13',
        questionTypeBadge: 'Tankönyv 25. oldal (Egyenlet Szorzat)',
        question: 'Az (x + 3)(5 - x) = 0 szorzat valós számokra AKKOR ÉS CSAK AKKOR egyenlő nullával, ha:',
        options: [
          'x + 3 = 0 VAGY 5 - x = 0 (vagyis x = -3 vagy x = 5)',
          'x + 3 = 0 ÉS 5 - x = 0',
          'x kizárólag pozitív lehet',
          'x² = 15'
        ],
        correctAnswer: 0,
        hint: 'Egy szorzat mikor nulla? Ha legalább az egyik tényezője nulla!',
        explanation: 'A szorzat zérushelyének elve: A · B = 0 ⟺ A = 0 ∨ B = 0. Ezért x = -3 vagy x = 5.'
      },
      {
        id: 'pq2-14',
        questionTypeBadge: 'Tankönyv 25. oldal (Négyzetösszeg)',
        question: 'Az (x + 3)² + (5 - y)² = 0 összeg valós számokra AKKOR ÉS CSAK AKKOR egyenlő nullával, ha:',
        options: [
          'x + 3 = 0 ÉS 5 - y = 0 (vagyis x = -3 és y = 5 egyszerre)',
          'x + 3 = 0 VAGY 5 - y = 0',
          'x + y = 2',
          'x és y ellentétes előjelű'
        ],
        correctAnswer: 0,
        hint: 'Két nemnegatív négyzet összege mikor lehet 0?',
        explanation: 'Valós számok négyzete mindig nemnegatív (≥ 0). Két nemnegatív szám összege csak akkor lehet pontosan 0, ha mindkét tag egyszerre 0 (konjunkció / ÉS).'
      },
      {
        id: 'pq2-15',
        questionTypeBadge: 'Tankönyv 32. oldal (Két Szám Négyzetösszege)',
        question: 'Igaz vagy hamis: „Két különböző valós szám négyzetösszege pozitív (a² + b² > 0, ha a ≠ b)”?',
        options: [
          'IGAZ, mert ha a ≠ b, akkor nem lehet mindkét szám egyszerre 0, így az összeg szigorúan > 0',
          'HAMIS, mert lehet negatív is',
          'HAMIS, ellenpélda a 0 és a 0',
          'Csak egész számokra igaz'
        ],
        correctAnswer: 0,
        hint: 'Mivel a ≠ b, legfeljebb az egyikük lehet 0, a másik négyzete biztosan pozitív!',
        explanation: 'Két valós szám négyzetösszege csak akkor lenne 0, ha mindkettő 0 lenne. De a feladat szerint a ≠ b, így egyszerre nem lehetnek nullák: az összeg mindig szigorúan pozitív (> 0).'
      },
      {
        id: 'pq2-16',
        questionTypeBadge: 'Tankönyv 32. oldal (Szorzat Negativitása)',
        question: 'Igaz vagy hamis: „Egy szorzat negatív, ha van negatív szorzótényezője”?',
        options: [
          'HAMIS, ellenpélda: (-2) · (-3) = +6 (két negatív tényező szorzata pozitív!)',
          'IGAZ, mert a negatív előjel dominál',
          'Csak páratlan sok tényezőre igaz',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: 'Két negatív szám szorzata mi lesz?',
        explanation: 'Az állítás hamis, mert ha páros számú negatív tényező szerepel a szorzatban, az eredmény pozitív lesz: (-2) · (-3) = 6 > 0.'
      },
      {
        id: 'pq2-17',
        questionTypeBadge: 'Tankönyv 32. oldal (Ötszög Átlói)',
        question: 'Igaz vagy hamis a kijelentés: „Egy konvex ötszögnek négy átlója van”?',
        options: [
          'HAMIS, mert a konvex ötszögnek pontosan 5 átlója van (5 · 2 / 2 = 5)',
          'IGAZ, mert minden csúcsból 1 átló húzható',
          'Csak szabályos ötszögre igaz',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: 'Az átlók képlete: n(n - 3) / 2. Helyettesíts be n = 5-öt!',
        explanation: 'Az n oldalú konvex sokszög átlóinak száma n(n - 3) / 2. n = 5 esetén: 5 · (5 - 3) / 2 = 5 · 2 / 2 = 5 átlója van, nem 4! Ezért az állítás HAMIS.'
      },
      {
        id: 'pq2-18',
        questionTypeBadge: 'Tankönyv 32. oldal (Tört Értéke)',
        question: 'Igaz vagy hamis: „Ha egy tört számlálója nagyobb, mint a nevezője, akkor a tört értéke nagyobb, mint egy”?',
        options: [
          'HAMIS, ellenpélda: (-2) / (-5) = 0,4 (itt számláló -2 > nevező -5, de az érték 0,4 < 1)',
          'IGAZ, mert a számláló a nagyobb',
          'Csak akkor hamis, ha a nevező 0',
          'Minden valós számra igaz'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a negatív számokra! Pl. -2 > -5, de mennyi (-2) / (-5)?',
        explanation: 'A negatív számok körében a számláló lehet nagyobb a nevezőnél úgy is, hogy a tört értéke 1-nél kisebb: pl. -2 > -5, de (-2)/(-5) = 2/5 = 0,4 < 1. Ezért a kijelentés HAMIS.'
      },
      {
        id: 'pq2-19',
        questionTypeBadge: 'Tankönyv 32. oldal (Hat Szám Szorzata)',
        question: '„Ha hat valós szám szorzata pozitív, akkor a tényezők között páros darab negatív előjelű szám van (feltéve, hogy egyik sem 0).” Igaz vagy hamis?',
        options: [
          'IGAZ, mert páratlan sok negatív szám szorzata negatív lenne, a pozitivitáshoz 0, 2, 4 vagy 6 negatív tényező szükséges',
          'HAMIS, mert mindegyiknek pozitívnak kell lennie',
          'Csak akkor igaz, ha a számok egészek',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'Minden negatív pár kiejti egymás mínusz előjelét: (-) · (-) = (+).',
        explanation: 'A szorzat előjelét a negatív tényezők száma határozza meg: páros számú negatív tényező szorzata pozitív, páratlan számúé negatív. Így a kijelentés IGAZ.'
      },
      {
        id: 'pq2-20',
        questionTypeBadge: 'Tankönyv 29. oldal (Tört Előjele)',
        question: 'Az (x + 8) / (x + 2) tört pontosan akkor NEM NEGATÍV (≥ 0), ha:',
        options: [
          'x < -2 VAGY x ≥ -8 (pontosabban: x ≤ -8 VAGY x > -2)',
          'x csak pozitív lehet',
          'x = -2',
          '-8 ≤ x ≤ -2'
        ],
        correctAnswer: 0,
        hint: 'A tört akkor nemnegatív, ha a számláló és nevező azonos előjelű (vagy a számláló 0, a nevező nem 0)!',
        explanation: 'Egy tört akkor ≥ 0, ha számlálója és nevezője azonos előjelű: vagy mindkettő pozitív (x > -2), vagy mindkettő negatív (x ≤ -8). A nevező nem lehet 0 (x ≠ -2).'
      },
      {
        id: 'pq2-21',
        questionTypeBadge: 'Tankönyv 29. oldal (Egyenletrendszer)',
        question: 'Mely számpár teszi egyszerre igazzá az (x + y = 4) ∧ (x - y = 2) kijelentést?',
        options: [
          'x = 3 és y = 1',
          'x = 2 és y = 2',
          'x = 4 és y = 0',
          'x = 1 és y = 3'
        ],
        correctAnswer: 0,
        hint: 'Add össze a két egyenletet: 2x = 6!',
        explanation: 'Összeadva a két egyenletet: 2x = 6 ➔ x = 3. Visszahelyettesítve: 3 + y = 4 ➔ y = 1. Ez az egyetlen közös megoldás.'
      },
      {
        id: 'pq2-22',
        questionTypeBadge: 'Tankönyv 29. oldal (Négyzetek Különbsége)',
        question: 'Az (x + y)(x - y) = 0 egyenlet pontosan akkor igaz, ha:',
        options: [
          'x = y VAGY x = -y (a két szám abszolút értéke megegyezik)',
          'x és y is nulla',
          'x = y ÉS x = -y',
          'x > y'
        ],
        correctAnswer: 0,
        hint: 'Szorzat akkor 0, ha x + y = 0 vagy x - y = 0.',
        explanation: 'Az (x + y)(x - y) = 0 szorzat akkor és csak akkor nulla, ha x + y = 0 (vagyis x = -y), vagy x - y = 0 (vagyis x = y).'
      },
      {
        id: 'pq2-23',
        questionTypeBadge: 'Tankönyv 29. oldal (Összeg és Négyzet)',
        question: 'Az (x + y)² + (x - y)² = 0 egyenlet mikor teljesül valós számokra?',
        options: [
          'Kizárólag akkor, ha x = 0 ÉS y = 0',
          'Ha x = y',
          'Ha x = -y',
          'Minden valós számpárra'
        ],
        correctAnswer: 0,
        hint: 'Mindkét tagnak egyszerre nullának kell lennie: x + y = 0 ÉS x - y = 0!',
        explanation: 'Két négyzet összege csak akkor lehet 0, ha mindkettő 0: x + y = 0 és x - y = 0. Ennek az egyenletrendszernek az egyetlen valós megoldása: x = 0 és y = 0.'
      },
      {
        id: 'pq2-24',
        questionTypeBadge: 'Tankönyv 27. oldal (Egyenlőtlenség)',
        question: 'Mely x valós számokra teljesül, hogy a szám négyzete kisebb nála: x² < x?',
        options: [
          '0 < x < 1 (a 0 és 1 közötti nyílt intervallumon)',
          'x < 0',
          'x > 1',
          'Minden pozitív számra'
        ],
        correctAnswer: 0,
        hint: 'Próbáld ki a 0,5-öt: 0,25 < 0,5!',
        explanation: 'Átrendezve: x² - x < 0 ⟺ x(x - 1) < 0. A szorzat akkor negatív, ha a tényezők ellentétes előjelűek, vagyis 0 < x < 1.'
      },
      {
        id: 'pq2-25',
        questionTypeBadge: 'Paralelogramma Ekvivalens Tulajdonsága',
        question: 'Az alábbiak közül melyik a paralelogramma helyes ekvivalens definíciója?',
        options: [
          'Egy négyszög akkor és csak akkor paralelogramma, ha szemközti szögei páronként egyenlők',
          'Egy négyszög akkor és csak akkor paralelogramma, ha átlói merőlegesek',
          'Egy négyszög akkor és csak akkor paralelogramma, ha minden oldala egyenlő',
          'Egy négyszög akkor és csak akkor paralelogramma, ha van szimmetriatengelye'
        ],
        correctAnswer: 0,
        hint: 'A paralelogramma alaptulajdonsága: α = γ és β = δ.',
        explanation: 'A tankönyv 25. oldala szerint egy négyszög akkor és csak akkor paralelogramma, ha szemközti szögei egyenlők (ez oda-vissza érvényes, ekvivalens definíció).'
      },
      {
        id: 'pq2-26',
        questionTypeBadge: 'Deltoid Átlói',
        question: 'Miért NEM ekvivalens meghatározása a deltoidnak az, hogy „átlói merőlegesek egymásra”?',
        options: [
          'Mert az átlók merőlegessége csak szükséges feltétel: léteznek olyan merőleges átlójú négyszögek, amelyek nem deltoidok',
          'Mert a deltoid átlói valójában sosem merőlegesek',
          'Mert a deltoidnak nincs átlója',
          'Mert csak a rombusz átlói merőlegesek'
        ],
        correctAnswer: 0,
        hint: 'Rajzolj egy olyan négyszöget, amelynek átlói derékszöget zárnak be, de az oldalai mind különbözőek!',
        explanation: 'Minden deltoid átlói merőlegesek (szükséges feltétel), de fordítva nem igaz: nem minden merőleges átlójú négyszög deltoid (például ha a szomszédos oldalak nem egyenlőek). Így nem ekvivalens meghatározás.'
      },
      {
        id: 'pq2-27',
        questionTypeBadge: 'Halmazműveleti Párhuzam: Implikáció',
        question: 'Melyik halmazelméleti relációnak felel meg az A ⇒ B logikai implikáció igazsága?',
        options: [
          'Részhalmaz kapcsolatnak: A ⊆ B (az A halmaz elemei mind részei a B halmaznak)',
          'Metszetnek: A ∩ B = üres halmaz',
          'Uniónak: A ∪ B = alaphalmaz',
          'Halmazok különbségének'
        ],
        correctAnswer: 0,
        hint: 'Ha valami A-ban van, akkor benne kell lennie B-ben is!',
        explanation: 'Az A ⇒ B pontosan azt jelenti, hogy minden olyan elem, amelyre A teljesül, a B halmaznak is eleme: vagyis A részhalmaza B-nek (A ⊆ B).'
      },
      {
        id: 'pq2-28',
        questionTypeBadge: 'Ekvivalencia Halmazpárhuzama',
        question: 'Melyik halmazelméleti összefüggésnek felel meg az A ⟺ B logikai ekvivalencia?',
        options: [
          'A két halmaz egyenlőségének: A = B (egymás kölcsönös részhalmazai)',
          'Diszjunkt halmazoknak: A ∩ B = ∅',
          'Komplementerképzésnek',
          'Valódi részhalmaznak: A ⊂ B'
        ],
        correctAnswer: 0,
        hint: 'A ⊆ B ÉS B ⊆ A egyszerre.',
        explanation: 'Két halmaz akkor és csak akkor egyenlő (A = B), ha A ⊆ B és B ⊆ A egyszerre teljesül. Ez a logikai ekvivalencia pontos halmazelméleti megfelelője.'
      },
      {
        id: 'pq2-29',
        questionTypeBadge: 'Kizáró VAGY vs Megengedő VAGY',
        question: 'Miben különbözik az A ⊕ B (kizáró vagy) igazságtáblázata az A ∨ B (megengedő vagy) táblázatától?',
        options: [
          'Az (I, I) sorban: a kizáró vagy HAMIS-at ad, míg a megengedő vagy IGAZ-at',
          'A (H, H) sorban: a kizáró vagy igazat ad',
          'Minden sorban teljesen ellentétesek',
          'Nincs köztük semmilyen különbség'
        ],
        correctAnswer: 0,
        hint: '„Vagy levest, vagy desszertet választhatsz, de mindkettőt nem!”',
        explanation: 'A megengedő vagy (∨) akkor is igaz, ha mindkét állítás egyszerre teljesül (I ∨ I = I). A kizáró vagy (⊕ / XOR) ezzel szemben kizárja a két feltétel egyidejű igazságát, így I ⊕ I = HAMIS.'
      },
      {
        id: 'pq2-30',
        questionTypeBadge: 'De Morgan Általánosítása',
        question: 'Hogyan hangzik a De Morgan-törvény három állítás konjunkciójára: ¬(A ∧ B ∧ C)?',
        options: [
          '¬A ∨ ¬B ∨ ¬C (a tagadás szétoszlik, és a művelet VAGY-ra változik)',
          '¬A ∧ ¬B ∧ ¬C',
          '¬(A ∨ B ∨ C)',
          '(A ∧ B) ∨ ¬C'
        ],
        correctAnswer: 0,
        hint: 'A tagadás bevitelekor minden ÉS jelből VAGY jel lesz!',
        explanation: 'A De Morgan-azonosság tetszőleges számú változóra érvényes: a konjunkció tagadása a tagadások diszjunkciójával egyenlő: ¬(A ∧ B ∧ C) ⟺ ¬A ∨ ¬B ∨ ¬C.'
      }
    ]
  },
  3: {
    level: 3,
    title: 'Bizonyítások, Kompetencia és Összetett Fejtörők',
    subtitle: 'Direkt és indirekt bizonyítások, kontrapozíció, Zedország feladatai és szintézis.',
    range: '61–90. feladat',
    focus: 'Bizonyítási módszerek, kontrapozíció, kompetenciamérés, Püthagorasz és Thalész, 5 lány rejtvénye',
    questions: [
      {
        id: 'pq3-1',
        questionTypeBadge: 'Direkt Bizonyítás',
        question: 'Mi a direkt bizonyítás lényege a matematikában?',
        options: [
          'Az ismert axiómákból és tételekből igaz logikai lépések láncolatával közvetlenül eljutunk a bizonyítandó állításig',
          'Feltesszük az állítás tagadását, és ellentmondásra jutunk',
          'Megkeressük az összes lehetséges ellenpéldát',
          'Kipróbáljuk a tételt az első 100 pozitív egész számra'
        ],
        correctAnswer: 0,
        hint: 'Közvetlen levezetés A-ból B-be.',
        explanation: 'A direkt bizonyítás során az elfogadott alapigazságokból (axiómákból) és korábban igazolt tételekből kiindulva, helyes következtetési szabályok láncolatával közvetlenül mutatjuk meg, hogy az állítás igaz.'
      },
      {
        id: 'pq3-2',
        questionTypeBadge: 'Indirekt Bizonyítás Elve',
        question: 'Hogyan épül fel egy indirekt bizonyítási eljárás?',
        options: [
          'Feltesszük a bizonyítandó állítás tagadását, majd ebből helyes logikai lépésekkel ellentmondásra jutunk egy ismert ténnyel',
          'Bebizonyítjuk, hogy a tétel az esetek 99%-ában teljesül',
          'Megfordítjuk a tételt, és a megfordítását igazoljuk',
          'Számítógépes szimulációval ellenőrizzük az állítást'
        ],
        correctAnswer: 0,
        hint: '„Tegyük fel az ellenkezőjét... ez viszont képtelenség, tehát az eredeti állítás igaz!”',
        explanation: 'Az indirekt bizonyítás során feltesszük a tétel tagadását (¬B). Ha ebből ellentmondásra (abszurditásra) jutunk, akkor a kizárt harmadik törvénye miatt a feltevésünk hamis volt, tehát az eredeti állítás szükségszerűen IGAZ.'
      },
      {
        id: 'pq3-3',
        questionTypeBadge: 'Kontrapozíció Törvénye',
        question: 'Melyik kijelentés logikailag TELJESEN EGYENÉRTÉKŰ az A ⇒ B implikációval?',
        options: [
          '¬B ⇒ ¬A („Ha nem B, akkor nem A”)',
          'B ⇒ A (a megfordítás)',
          '¬A ⇒ ¬B',
          '¬A ∧ B'
        ],
        correctAnswer: 0,
        hint: 'Megfordítjuk a sorrendet ÉS mindkét tagot negáljuk!',
        explanation: 'A kontrapozíció elve szerint az (A ⇒ B) és a (¬B ⇒ ¬A) kifejezések igazságtáblázata minden sorban megegyezik: a tagadások megfordított sorrendű implikációja ekvivalens az eredetivel.'
      },
      {
        id: 'pq3-4',
        questionTypeBadge: 'Implikáció Tagadásának Képlete',
        question: 'Hogyan tagadjuk matematikailag helyesen az A ⇒ B feltételes állítást?',
        options: [
          'A ∧ ¬B (a feltétel teljesül, de a cél mégsem valósul meg)',
          '¬A ⇒ ¬B',
          'B ⇒ A',
          '¬A ∨ B'
        ],
        correctAnswer: 0,
        hint: 'Egy ígéret csak akkor dől meg, ha a feltétel igaz volt, de a megígért következmény hamis!',
        explanation: 'Az implikáció tagadása: ¬(A ⇒ B) ⟺ A ∧ ¬B. Például: „Ha esik, viszek esernyőt” tagadása: „Esik az eső, DE nem viszek esernyőt”.'
      },
      {
        id: 'pq3-5',
        questionTypeBadge: 'Kompetenciamérés 2018 (Zedország)',
        question: 'Argad és Bugar távolsága 4000 km. Ciraz távolsága Argadtól 1300 km, Bugartól 3700 km. Igaza van-e Dénesnek, aki szerint Ciraz az Argad–Bugar egyenes úton fekszik?',
        options: [
          'NEM, biztosan nem ott van, mert 1300 km + 3700 km = 5000 km > 4000 km (háromszög-egyenlőtlenség)',
          'IGEN, biztosan ott van',
          'Lehet, hogy ott van, a megadott adatok nem elegendőek',
          'Csak akkor, ha Ciraz a felezőpontban van'
        ],
        correctAnswer: 0,
        hint: 'Ha egy pont az egyenes szakaszon van, a két rész összege pontosan kiadja a teljes hosszt!',
        explanation: 'Ha Ciraz az AB szakaszon feküdne, a távolságok összege pontosan 4000 km lenne. Mivel 1300 + 3700 = 5000 > 4000 km, a három pont háromszöget alkot, így Ciraz biztosan nem fekszik az egyenes szakaszon!'
      },
      {
        id: 'pq3-6',
        questionTypeBadge: 'Kompetenciamérés 2011 (Püthagorasz és Thalész)',
        question: 'Thalész Kr. e. 624-ben született és Kr. e. 548-ban halt meg. Püthagorasz Kr. e. 560-ban született és Kr. e. 480-ban halt meg. Elvileg találkozhattak-e egymással?',
        options: [
          'IGEN, mert Püthagorasz Thalész születése után, de Thalész halála előtt született (12 évig éltek egyszerre)',
          'NEM, mert Thalész jóval korábban élt és halt meg, mint hogy Püthagorasz megszületett volna',
          'NEM, mert Püthagorasz Kr. e. 480-ban született',
          'Csak akkor, ha Püthagorasz utazott Milétoszba'
        ],
        correctAnswer: 0,
        hint: 'Számítsd ki a közös időszakot: Kr. e. 560 és Kr. e. 548 között hány év telt el?',
        explanation: 'Püthagorasz Kr. e. 560-ban született, ekkor Thalész még élt (Kr. e. 548-ig). Püthagorasz 12 éves volt Thalész halálakor, így életük 12 éven át átfedte egymást: elvileg találkozhattak!'
      },
      {
        id: 'pq3-7',
        questionTypeBadge: 'Kompetenciamérés 2019 (Üzemanyagárak)',
        question: 'A tankönyv 31. oldalának diagramja szerint a benzin árából a termelői ár 38%, a gázolajnál 44%. Igaz vagy hamis: „A termelői ár egyik üzemanyagnál sem haladja meg a 40%-ot”?',
        options: [
          'HAMIS, mert a gázolajnál a termelői ár 44%, ami meghaladja a 40%-ot',
          'IGAZ, mert az átlaguk 41%',
          'IGAZ a benzinre, így a mondat igaz',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg a gázolaj termelői árának százalékos értékét!',
        explanation: 'A diagram szerint a gázolaj termelői ára 44%, ami szigorúan nagyobb mint 40%. Így a kijelentés HAMIS.'
      },
      {
        id: 'pq3-8',
        questionTypeBadge: 'Kompetenciamérés 2019 (Kereskedő Haszna)',
        question: 'A diagram szerint a kereskedő haszna a benzin esetén 10%, a gázolajnál 8%. Igaz vagy hamis: „Mindkét üzemanyagnál a kereskedő haszna teszi ki a legkisebb hányadot”?',
        options: [
          'IGAZ, mert 10% kisebb a 38%-nál és az 52%-nál, illetve a 8% kisebb a 44%-nál és a 48%-nál',
          'HAMIS, mert az adóteher a legkisebb',
          'Csak a gázolajra igaz',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: 'Hasonlítsd össze az összetevőket: termelői ár, haszon, adóterhek.',
        explanation: 'Mind a benzinnél (haszon: 10% vs 38% és 52%), mind a gázolajnál (haszon: 8% vs 44% és 48%) a kereskedő haszna a legkisebb szelet, így az állítás IGAZ.'
      },
      {
        id: 'pq3-9',
        questionTypeBadge: 'Tankönyv 32. oldal (ABCD Négyzet ABCΔ)',
        question: 'Az ABCD négyzetben P: „A háromszög derékszögű”, Q: „A háromszög egyenlő szárú”. Melyik logikai formula írja le az ABC háromszöget?',
        options: [
          'P ∧ Q (derékszögű ÉS egyenlő szárú)',
          'P ∧ ¬Q (derékszögű, de nem egyenlő szárú)',
          '¬P ∧ Q',
          '¬P ∧ ¬Q'
        ],
        correctAnswer: 0,
        hint: 'Az ABC háromszög a négyzet két oldalából és az AC átlóból áll!',
        explanation: 'Az ABC háromszögben AB = BC (a négyzet oldalai miatt egyenlő szárú: Q igaz), és a B csúcsnál lévő szög 90° (derékszögű: P igaz). Így P ∧ Q teljesül.'
      },
      {
        id: 'pq3-10',
        questionTypeBadge: 'Tankönyv 32. oldal (ABCD Négyzet ABFΔ)',
        question: 'Az ABCD négyzetben F a CD oldal felezőpontja. Melyik logikai formula érvényes az ABF háromszögre?',
        options: [
          '¬P ∧ Q (egyenlő szárú, de NEM derékszögű)',
          'P ∧ Q',
          'P ∧ ¬Q',
          '¬P ∧ ¬Q'
        ],
        correctAnswer: 0,
        hint: 'AF és BF hossza a szimmetria miatt egyenlő, de van-e derékszöge?',
        explanation: 'A szimmetria tengely miatt AF = BF, tehát egyenlő szárú (Q igaz). Viszont a szögei hegyesszögek, nincs benne derékszög (P hamis). Így ¬P ∧ Q teljesül.'
      },
      {
        id: 'pq3-11',
        questionTypeBadge: 'Tankönyv 29. oldal (5 Lány Rejtvénye)',
        question: '5 unokatestvér lány sportol (úszás, atlétika, kosár, röpi, tollas). Feltétel: „Csilla és a kosaras testvérek.” Mit vonhatunk le ebből közvetlenül?',
        options: [
          'Csilla biztosan NEM kosaras (hiszen a testvére a kosaras)',
          'Csilla a kosaras',
          'Csilla biztosan úszó',
          'Csilla nem sportol'
        ],
        correctAnswer: 0,
        hint: 'Lehetsz-e saját magad testvére?',
        explanation: 'A logikai kizárás alapszabálya: senki sem saját maga testvére. Mivel Csilla testvére a kosaras, Csilla biztosan nem kosárlabdázó.'
      },
      {
        id: 'pq3-12',
        questionTypeBadge: 'Tankönyv 29. oldal (5 Lány - Röplabda)',
        question: 'A lányok feladványában: „A röplabdás tegnap együtt fagyizott Eszterrel.” Mit jelent ez Eszterre nézve?',
        options: [
          'Eszter nem lehet a röplabdás',
          'Eszter a röplabdás',
          'Eszter és a röplabdás ikrek',
          'Eszter edző'
        ],
        correctAnswer: 0,
        hint: 'Eszter mással fagyizott, nem egyedül!',
        explanation: 'Mivel Eszter a röplabdással fagyizott, Eszter személye és a röplabdás személye különbözik: Eszter biztosan nem röplabdás.'
      },
      {
        id: 'pq3-13',
        questionTypeBadge: 'Tankönyv 26. oldal (A Kalandor Napjai)',
        question: 'A kalandor hétfőn, szerdán, pénteken és vasárnap igazat mond, máskor hazudik. Melyik napon mondhatta: „Holnap hazudni fogok”?',
        options: [
          'Szombaton vagy vasárnap',
          'Hétfőn',
          'Szerdán',
          'Pénteken'
        ],
        correctAnswer: 0,
        hint: 'Igazmondó nap után hazudós nap kell, vagy hazudós nap után igazmondó nap!',
        explanation: 'Ha igazat mond, holnap hazudnia kell (vasárnap mondhatta, mert hétfő hazudós). Ha hazudik, az állítása hamis, így holnap igazat kell mondania (szombaton mondhatta, mert vasárnap igazmondó). Így szombaton vagy vasárnap hangozhatott el.'
      },
      {
        id: 'pq3-14',
        questionTypeBadge: 'Tankönyv 26. oldal (4 Úszó Versenye)',
        question: 'Aladár, Béla, Cecil és Dezső közül pontosan egy állítás hamis. Cecil: „Én győztem.” Béla: „Nem én lettem az első.” Ki lett a győztes?',
        options: [
          'Cecil',
          'Béla',
          'Aladár',
          'Dezső'
        ],
        correctAnswer: 0,
        hint: 'Ha Cecil győzött, Béla is igazat mondott, Aladár is igazat mondhat, és legfeljebb Dezső tévedhet.',
        explanation: 'Az esetelemzés során ha Cecil a győztes, Béla állítása igaz, és Aladár állítása („sem első, sem utolsó nem lettem”) is igaz marad, így pontosan egy hamis kijelentés adódik. Cecil a győztes.'
      },
      {
        id: 'pq3-15',
        questionTypeBadge: 'Tankönyv 26. oldal (Ki a Bűnös?)',
        question: 'Aladár: „Béla a bűnös.” Béla: „Aladár hazudik.” Cecil: „Én nem vagyok bűnös.” Dezső: „Béla füllent.” PONTOSAN EGY ÁLLÍTÁS IGAZ. Ki a bűnös?',
        options: [
          'Cecil',
          'Béla',
          'Aladár',
          'Dezső'
        ],
        correctAnswer: 0,
        hint: 'Aladár és Béla kijelentései egymás tagadásai, így közülük az egyik biztosan igaz! Akkor Cecil állítása micsoda?',
        explanation: 'Mivel Aladár és Béla közül pontosan az egyik mond igazat, az egyetlen igazság már el van foglalva! Tehát Cecil kijelentése („Nem vagyok bűnös”) szükségszerűen HAMIS! Ebből egyenesen következik, hogy CECIL A BŰNÖS.'
      },
      {
        id: 'pq3-16',
        questionTypeBadge: 'Indirekt Bizonyítás: √2',
        question: 'Hogyan bizonyítjuk be indirekt módon, hogy √2 irracionális szám?',
        options: [
          'Feltesszük, hogy √2 racionális (p/q alakú, tovább nem egyszerűsíthető tört), amiből levezetjük, hogy p és q is páros lenne (ellentmondás a relatív prím feltevéssel)',
          'Kiszámoljuk számológéppel a végtelen tizedestörtet',
          'Megmutatjuk, hogy a négyzete 2',
          'Megrajzoljuk egy egységnégyzet átlóját'
        ],
        correctAnswer: 0,
        hint: 'A racionális feltevés ellentmondáshoz vezet: a tört mégis egyszerűsíthető lenne 2-vel!',
        explanation: 'A klasszikus indirekt bizonyításban feltesszük, hogy √2 = p/q (egyszerűsíthetetlen tört). Ekkor 2q² = p², tehát p páros (p = 2k). Ekkor 2q² = 4k² ➔ q² = 2k², tehát q is páros! Ez ellentmond annak, hogy p/q tovább nem egyszerűsíthető. Így √2 nem lehet racionális.'
      },
      {
        id: 'pq3-17',
        questionTypeBadge: 'Indirekt Bizonyítás: Páros Négyzet',
        question: 'Hogyan bizonyítjuk azt a tételt, hogy: „Ha n² páros egész szám, akkor n is páros”?',
        options: [
          'Kontrapozícióval: feltesszük, hogy n páratlan (n = 2k + 1), ekkor n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1 is páratlan, ami igazolja a tételt',
          'Megnézzük az n = 2, 4, 6 eseteket',
          'Kiszámítjuk n négyzetgyökét',
          'Feltesszük, hogy n² = 0'
        ],
        correctAnswer: 0,
        hint: 'A ⇒ B helyett bizonyítsd a vele ekvivalens ¬B ⇒ ¬A állítást!',
        explanation: 'A kontrapozíció szerint (n² páros ⇒ n páros) ekvivalens azzal, hogy (n páratlan ⇒ n² páratlan). Egy páratlan szám négyzete mindig páratlan, ezzel a tétel bizonyítást nyert.'
      },
      {
        id: 'pq3-18',
        questionTypeBadge: 'Kvarkus Szobái és Smullyan-elv',
        question: 'Kvarkus ajtaján az 1. felirat: „Ebben a szobában lány van, a másikban szörny.” A 2. feliraton: „Az egyik szobában lány, másikban szörny van.” Pontosan az egyik igaz. Melyikben van a lány?',
        options: [
          'A 2. szobában van a lány (az 1. felirat hamis, a 2. igaz)',
          'Az 1. szobában van a lány',
          'Mindkét szobában szörny van',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Ha az 1. felirat igaz lenne, a 2. felirat is igaz lenne, ami ellentmond annak, hogy pontosan az egyik igaz!',
        explanation: 'Ha az 1. felirat igaz, a 2. is automatikusan igaz lenne (két igaz = ellentmondás). Így az 1. felirat HAMIS, a 2. felirat IGAZ. A 2. felirat szerint az egyikben lány, másikban szörny van; mivel az 1.-ben nincs lány, a lány a 2. szobában található.'
      },
      {
        id: 'pq3-19',
        questionTypeBadge: 'Tündék 3 Ládája',
        question: '3 ládán feliratok: 1. láda: „Ebben van a kulcs.” 2. láda: „Nincs ebben a kulcs.” 3. láda: „Nincs az 1.-ben a kulcs.” Pontosan egy felirat igaz. Hol van a kulcs?',
        options: [
          'A 2. ládában (ekkor az 1. hamis, a 2. hamis, a 3. igaz: pontosan 1 igaz!)',
          'Az 1. ládában',
          'A 3. ládában',
          'Egyikben sincs'
        ],
        correctAnswer: 0,
        hint: 'Esetelemzés: tegyük be a kulcsot a 2. ládába, és olvassuk le a feliratok értékeit!',
        explanation: 'Ha a kulcs a 2. ládában van: 1. felirat HAMIS; 2. felirat („nincs ebben”) HAMIS; 3. felirat („nincs az 1.-ben”) IGAZ. Pontosan egy igaz van! Ha az 1.-ben lenne, több felirat is igaz lenne.'
      },
      {
        id: 'pq3-20',
        questionTypeBadge: '3 Indián Ruhái',
        question: 'Fehér Tigris, Szürke Egér és Sárga Irigység ülnek a tűznél, senki sem a nevével egyező színű ruhában. Fehér Tigrisnek válaszol a sárga ruhás. Milyen ruhát visel Szürke Egér?',
        options: [
          'SÁRGA ruhát',
          'Fehér ruhát',
          'Szürke ruhát',
          'Kék ruhát'
        ],
        correctAnswer: 0,
        hint: 'Fehér Tigris a sárga ruháshoz beszélt, így nem sárga és nem fehér: csak szürke lehet!',
        explanation: 'Fehér Tigris nem lehet fehér, és nem lehet sárga (mert hozzá beszélt). Tehát Fehér Tigris szürke ruhát visel! Ekkor Szürke Egér nem lehet szürke, és a nevek ütközése miatt fehér sem lehet (mert Sárga Irigység nem lehet sárga). Így Szürke Egér SÁRGA ruhában van.'
      },
      {
        id: 'pq3-21',
        questionTypeBadge: '4 Iskolás Úszóverseny',
        question: 'A 4 iskola döntőjében a lakihegyis fekete sapkában a 2. vagy 3. pályán úszott a sárga és kék sapkás között. Szélső pálya nyert. Ki lett a győztes?',
        options: [
          'A Pál-völgyi iskola versenyzője',
          'Az Aranyhegyi iskola versenyzője',
          'A János-hegyi iskola versenyzője',
          'A Lakihegyi iskola versenyzője'
        ],
        correctAnswer: 0,
        hint: 'A logikai kizárásos rács alapján a belső pályák és a szomszédsági kizárások után ki maradt az 1. helyen?',
        explanation: 'Az Einstein-mátrix szisztematikus kizárásával kiderül, hogy a győztes szélső pályán a Pál-völgyi iskola versenyzője ért célba elsőként.'
      },
      {
        id: 'pq3-22',
        questionTypeBadge: 'Abszolút Érték Ellenpélda',
        question: '„Ha |x| > 1, akkor x > 1.” Melyik konkrét szám cáfolja meg ezt az állítást (ellenpélda)?',
        options: [
          'x = -5 (mivel |-5| = 5 > 1, de maga a szám -5 < 1)',
          'x = 2',
          'x = 0',
          'x = 1'
        ],
        correctAnswer: 0,
        hint: 'Olyan számot válassz, amely kielégíti a feltételt (|x| > 1), de nem elégíti ki a célt (x > 1)!',
        explanation: 'Az x = -5 esetén |-5| = 5 > 1 (a feltétel igaz), de -5 nem nagyobb 1-nél (a következmény hamis). Ez az ellenpélda azonnal megcáfolja az állítást.'
      },
      {
        id: 'pq3-23',
        questionTypeBadge: 'Tört Pozitivitása Ellenpélda',
        question: '„Ha egy tört értéke pozitív, akkor számlálója és nevezője is pozitív.” Melyik tört az ellenpélda?',
        options: [
          '(-2) / (-3)',
          '2 / 3',
          '(-2) / 3',
          '0 / 5'
        ],
        correctAnswer: 0,
        hint: 'Két negatív szám hányadosa is pozitív!',
        explanation: 'A (-2)/(-3) értéke +2/3 > 0 (a feltétel igaz), de sem a számláló, sem a nevező nem pozitív (a következmény hamis). Ez az ellenpélda cáfolja a kijelentést.'
      },
      {
        id: 'pq3-24',
        questionTypeBadge: 'Reciprok és Négyzet',
        question: 'Melyik valós számra IGAZ, hogy a négyzete megegyezik vele (x² = x), de a reciproka NEM egyenlő vele (1/x ≠ x)?',
        options: [
          'x = 0 (mert 0² = 0, de a 0-nak nincs reciproka, 1/0 nem értelmezett)',
          'x = 1',
          'x = -1',
          'x = 2'
        ],
        correctAnswer: 0,
        hint: 'Melyik szám négyzetes megoldás a {0; 1} halmazból, amivel nem szabad osztani?',
        explanation: 'A 0 négyzete 0² = 0, de a 0 reciproka nem is létezik a valós számok körében, így a két tulajdonság nem vonja maga után egymást.'
      },
      {
        id: 'pq3-25',
        questionTypeBadge: 'Szükséges és Elégséges Feltétel',
        question: '„Egy természetes szám osztható 10-zel.” Milyen feltétele ennek az, hogy „az utolsó számjegye 0”?',
        options: [
          'Szükséges ÉS elégséges feltétele (ekvivalens azonosság)',
          'Csak elégséges feltétele',
          'Csak szükséges feltétele',
          'Nem feltétele'
        ],
        correctAnswer: 0,
        hint: 'Egy szám pontosan akkor osztható 10-zel, ha 0-ra végződik!',
        explanation: 'A tízes oszthatósági szabály oda-vissza érvényes: ha 10-zel osztható, 0-ra végződik, és ha 0-ra végződik, 10-zel osztható. Tehát szükséges és elégséges feltétel.'
      },
      {
        id: 'pq3-26',
        questionTypeBadge: 'Komplex Ekvivalencia: Trapéz',
        question: '„Ha egy négyszög húrtrapéz, akkor van körülírt köre.” Igaz vagy hamis a tétel megfordítása a négyszögek körében?',
        options: [
          'HAMIS, mert léteznek olyan nem trapéz négyszögek is, amelyeknek van körülírt köre (pl. általános húrnégyszögek vagy derékszögű deltoidok)',
          'IGAZ, mert csak a húrtrapéznak lehet körülírt köre',
          'Csak téglalapokra igaz',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: 'Minden húrnégyszög trapéz? Nem!',
        explanation: 'Egy négyszögnek akkor van körülírt köre, ha szemközti szögeinek összege 180° (húrnégyszög). Bármely húrnégyszögnek van körülírt köre anélkül, hogy párhuzamos oldalai lennének (trapéz lenne). A megfordítás tehát HAMIS.'
      },
      {
        id: 'pq3-27',
        questionTypeBadge: 'Implikáció Tagadás Alkalmazás',
        question: 'Mi a tagadása a következő feltételes mondatnak: „Ha átmegyek a vizsgán, autót veszek magamnak”?',
        options: [
          '„Átmegyek a vizsgán, de nem veszek autót magamnak.” (A ∧ ¬B)',
          '„Ha nem megyek át a vizsgán, nem veszek autót.”',
          '„Nem megyek át a vizsgán és nem veszek autót.”',
          '„Autót veszek, de nem megyek át a vizsgán.”'
        ],
        correctAnswer: 0,
        hint: 'Az ígéret megtörése: a feltétel teljesült, de a vásárlás elmaradt!',
        explanation: 'Az A ⇒ B állítás tagadása: A ∧ ¬B. A diák átmegy a vizsgán, ám mégsem vesz autót.'
      },
      {
        id: 'pq3-28',
        questionTypeBadge: 'Tautológia Bizonyítás Táblázattal',
        question: 'Hogyan igazolható egy összetett logikai kifejezésről, hogy tautológia?',
        options: [
          'Elkészítjük a teljes igazságtáblázatát, és ha az eredményoszlop minden egyes sorában IGAZ (1) szerepel, a kifejezés tautológia',
          'Kipróbálunk egy tetszőleges sort',
          'Megnézzük, hogy szerepel-e benne VAGY művelet',
          'Megszámoljuk a változók számát'
        ],
        correctAnswer: 0,
        hint: 'Minden lehetséges kiértékelést ellenőrizni kell!',
        explanation: 'Egy formula akkor és csak akkor tautológia, ha a változók bármely igazságérték-kombinációjára IGAZ-at ad. Ezt a $2^n$ soros igazságtáblázat teljes kitöltésével bizonyítjuk.'
      },
      {
        id: 'pq3-29',
        questionTypeBadge: 'Indirekt Lépés Tagadás',
        question: 'Ha azt akarjuk indirekt módon bebizonyítani, hogy „Minden prím nagyobb mint 1”, mi a helyes kiinduló feltevés?',
        options: [
          '„Feltesszük, hogy létezik olyan prím, amely kisebb vagy egyenlő 1-gyel.”',
          '„Feltesszük, hogy minden prím kisebb 1-nél.”',
          '„Feltesszük, hogy a prímek száma végtelen.”',
          '„Feltesszük, hogy az 1 prímszám.”'
        ],
        correctAnswer: 0,
        hint: 'A „Minden x-re P(x)” állítás tagadásával kell indítani!',
        explanation: 'Az indirekt bizonyítás mindig a tétel precíz tagadásával indul: az univerzális állítás („minden prím > 1”) tagadása: „Van olyan prím, amely nem nagyobb 1-nél (vagyis ≤ 1)”.'
      },
      {
        id: 'pq3-30',
        questionTypeBadge: 'Teljes Fejezeti Szintézis',
        question: 'Melyik állítás foglalja össze a leghitelesebben a matematikai logika szerepét?',
        options: [
          'A logikai műveletek és következtetési szabályok biztosítják a matematikai definíciók egyértelműségét és a bizonyítások cáfolhatatlan szilárdságát',
          'A logika csak a számítógépes programozásban hasznos, a geometriában nem',
          'A logikában a mindennapi köznyelvi érvelések szabályait alkalmazzuk változtatás nélkül',
          'A logikai formulák mindig kiválthatók geometriai rajzokkal'
        ],
        correctAnswer: 0,
        hint: 'Miért tanultunk állításokat, műveleteket, táblázatokat, szükséges/elégséges feltételeket és bizonyításokat?',
        explanation: 'A matematikai logika a precíz gondolkodás alapja: egyértelművé teszi a fogalmakat, kiküszöböli a félreértéseket, és lehetővé teszi a direkt, indirekt bizonyítások és cáfolatok szigorú levezetését.'
      }
    ]
  }
};

export const PracticeExamQuiz: React.FC<PracticeExamQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="6. Gyakorlás, tudáspróba Kvíz"
      subtitle="Fejezeti összefoglaló, érettségi és kompetenciamérési típusfeladatok (30 feladat szintenként)"
      badge="10. Osztály • I. Logika"
      topicBadge="10. OSZTÁLY • I. LOGIKA"
      chapterId="logika"
      topicId="g10-logic-tudasproba"
      topicTitle="6. Gyakorlás, tudáspróba"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Logika Segédlet • Témazáró Összefoglalás"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <PracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PracticeExamQuiz;

