import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { LogicOperationsMatcher } from './LogicOperationsMatcher';
import { LogicOperationsSorter } from './LogicOperationsSorter';
import {
  DisjunctionVennSvg,
  ConjunctionVennSvg,
  OlympicLogicSvg,
  DivisibilityVennSvg
} from './LogicOperationsFigures';
import { Brain, Sparkles, CheckCircle2, ShieldCheck, Scale, HelpCircle, Layers } from 'lucide-react';

interface LogicOperationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A VAGY Művelet (Diszjunkció, ∨)',
    description: 'A ∨ B pontosan akkor IGAZ, ha az A és B közül legalább az egyik igaz (vagy mindkettő!). Csak akkor hamis, ha mindkettő hamis (H ∨ H = H).',
    note: 'Halmazműveleti párhuzam: Unió (A ∪ B). A matematikában a vagy MINDIG megengedő!',
    color: 'from-purple-500 to-indigo-600',
    figure: <DisjunctionVennSvg size={180} />
  },
  {
    title: 'Az ÉS Művelet (Konjunkció, ∧)',
    description: 'A ∧ B kizárólag akkor IGAZ, ha mindkét állítás egyszerre igaz (I ∧ I = I). Minden más esetben hamis!',
    note: 'Halmazműveleti párhuzam: Metszet (A ∩ B). Nyelvi buktató: a „de”, „valamint”, „ugyanakkor” is ÉS művelet!',
    color: 'from-indigo-500 to-teal-600',
    figure: <ConjunctionVennSvg size={180} />
  },
  {
    title: 'Olimpiai Emlékek Logikája',
    description: 'Kulcsár Győző 1972-ben Münchenben nyert aranyat (I), 1976-ban Montrealban nem nyert (H).',
    note: 'Miklós (VAGY): I ∨ H = IGAZ ✓. Gyula (ÉS): I ∧ H = HAMIS ✗.',
    color: 'from-amber-500 to-orange-600',
    figure: <OlympicLogicSvg size={180} />
  },
  {
    title: 'Oszthatósági Metszetek Venn-diagramon',
    description: 'Összetett számelméleti vizsgálatoknál az ÉS a halmazok metszetét, a VAGY az unióját jelenti.',
    note: 'Pl. 2-vel ÉS 3-mal osztható: A ∩ B = {12; 36}. 3-mal ÉS 5-tel osztható: B ∩ C = {15}.',
    color: 'from-emerald-500 to-green-600',
    figure: <DivisibilityVennSvg size={180} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: 'Alapfogalmak és Nyelvi Kötőszavak',
    subtitle: 'A diszjunkció és konjunkció definíciója, olimpiai példák és a magyar nyelv logikai kötőszavai.',
    range: '1–10. feladat',
    focus: 'VAGY (∨) és ÉS (∧) alaptörvényei, a „de” kötőszó',
    questions: [
      {
        id: 'lq1-1',
        questionTypeBadge: 'Diszjunkció Szabálya',
        question: 'Mikor IGAZ két állítás VAGY kapcsolata (A ∨ B, diszjunkció)?',
        options: [
          'Ha az A és B állítások közül legalább az egyik igaz (vagy mindkettő)',
          'Kizárólag akkor, ha pontosan az egyik igaz, de a másik nem',
          'Csak akkor, ha mindkét állítás egyszerre igaz',
          'Ha legalább az egyik állítás hamis'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a megengedő vagy fogalmára: ha mindkettő teljesül, a mondat igaz marad!',
        explanation: 'A diszjunkció (A ∨ B) akkor és csak akkor igaz, ha legalább az egyik összetevő igaz. Csak akkor hamis, ha mindkét tag hamis.'
      },
      {
        id: 'lq1-2',
        questionTypeBadge: 'Konjunkció Szabálya',
        question: 'Mikor IGAZ két állítás ÉS kapcsolata (A ∧ B, konjunkció)?',
        options: [
          'Kizárólag akkor, ha mindkét állítás egyszerre igaz (I ∧ I = I)',
          'Ha legalább az egyik állítás igaz',
          'Ha az egyik állítás igaz, a másik pedig hamis',
          'Minden olyan esetben, amikor az állítások nem mondanak ellent egymásnak'
        ],
        correctAnswer: 0,
        hint: 'Az ÉS mindkét feltétel egyidejű teljesülését követeli meg.',
        explanation: 'A konjunkció (A ∧ B) szigorú művelet: egyetlen esetben igaz, ha mindkét része igaz, minden egyéb esetben HAMIS.'
      },
      {
        id: 'lq1-3',
        questionTypeBadge: 'Tankönyv 14. oldal (Olimpia)',
        question: 'Kulcsár Győző 1972-ben Münchenben nyert aranyat, de 1976-ban Montrealban nem nyert. Miklós azt állítja: „Kulcsár Győző Münchenben VAGY Montrealban aranyérmet nyert.” Igazat mondott-e Miklós?',
        options: [
          'IGAZ, mert a VAGY művelethez elég, ha legalább az egyik évben aranyérmet nyert (I ∨ H = I)',
          'HAMIS, mert mindkét olimpiáról kellett volna aranyat hoznia',
          'HAMIS, mert a két olimpia közül csak az egyiken nyert',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'München = IGAZ, Montreal = HAMIS. Mennyi az I ∨ H?',
        explanation: 'Mivel Münchenben valóban nyert aranyat, az egyik tag igaz. A megengedő VAGY művelet értéke: IGAZ ∨ HAMIS = IGAZ.'
      },
      {
        id: 'lq1-4',
        questionTypeBadge: 'Tankönyv 14. oldal (Olimpia)',
        question: 'Gyula úgy emlékszik: „Kulcsár Győző a müncheni olimpián ÉS a montreali olimpián is aranyérmet nyert.” Igazat mondott-e Gyula?',
        options: [
          'HAMIS, mert Montrealban nem nyert aranyat, és az ÉS-hez mindkettőnek igaznak kellene lennie (I ∧ H = H)',
          'IGAZ, mert Münchenben aranyat nyert',
          'IGAZ, mert mindkét olimpián részt vett',
          'HAMIS, mert Münchenben sem nyert aranyat'
        ],
        correctAnswer: 0,
        hint: 'Az ÉS megkívánja, hogy mindkét olimpián aranyat nyerjen.',
        explanation: 'Mivel Montrealban nem szerzett aranyérmet, a konjunkció második tagja hamis: IGAZ ∧ HAMIS = HAMIS.'
      },
      {
        id: 'lq1-5',
        questionTypeBadge: 'Tankönyv 15. oldal (Megengedő vagy)',
        question: 'Egerszegi Krisztina Perth-ben (1991) világbajnoki aranyat, Barcelonában (1992) pedig olimpiai aranyat is nyert. Mi a logikai értéke a mondatnak: „Egerszegi Krisztina 1991–1992-ben aranyérmet nyert a világbajnokságon VAGY az olimpián”?',
        options: [
          'IGAZ, mert mindkettőn nyert, és a matematikai VAGY megengedő: I ∨ I = I',
          'HAMIS, mert csak az egyik helyszínen lett volna szabad nyernie a vagy miatt',
          'Értelmetlen mondat',
          'Csak akkor lenne igaz, ha az olimpián nem nyert volna'
        ],
        correctAnswer: 0,
        hint: 'A matematika VAGY nem kizáró vagy: ha mindkettő teljesül, a mondat teljesen IGAZ!',
        explanation: 'A klasszikus logikában a VAGY megengedő (latin: vel). Ha mindkét esemény bekövetkezett, az IGAZ ∨ IGAZ eredménye IGAZ.'
      },
      {
        id: 'lq1-6',
        questionTypeBadge: 'Tankönyv 15. oldal (A „de” kötőszó)',
        question: 'Milyen logikai műveletnek felel meg a magyar nyelvben a „de” kötőszó a mondatok összekapcsolásakor?',
        options: [
          'ÉS műveletnek (Konjunkció)',
          'VAGY műveletnek (Diszjunkció)',
          'TAGADÁS műveletnek (Negáció)',
          'Egyik műveletnek sem felel meg'
        ],
        correctAnswer: 0,
        hint: '„Péter okos, DE lusta” ≡ Péter okos ÉS egyben lusta.',
        explanation: 'A magyar nyelvben a „de” kötőszó ellentétes árnyalatot fejez ki, de logikai tartalmát tekintve mindkét tag egyidejű fennállását állítja, így ÉS műveletnek felel meg.'
      },
      {
        id: 'lq1-7',
        questionTypeBadge: 'Tankönyv 16. oldal feladat 3',
        question: 'Legyen A: „Ez az állat ragadozó”, C: „Ez az állat védett”. Hogyan írjuk fel logikai jelekkel a mondatot: „Ez az állat ragadozó, de nem védett”?',
        options: [
          'A ∧ ¬C',
          'A ∨ ¬C',
          '¬A ∧ C',
          'A ∧ C'
        ],
        correctAnswer: 0,
        hint: 'A „de” = ∧, a „nem védett” = ¬C.',
        explanation: 'A ragadozó (A), a „de” kötőszó (∧) és a nem védett (¬C) összekapcsolása: A ∧ ¬C.'
      },
      {
        id: 'lq1-8',
        questionTypeBadge: 'Feladatgyűjtemény 1.1.3',
        question: 'Tudjuk, hogy Dominik a futballpályán pontrúgásokban is és hosszú passzokban is nagyon jó. Mi a logikai értéke a mondatnak: „Dominik ügyes a hosszú passzokban, de nem sikeres a pontrúgásokban”?',
        options: [
          'HAMIS, mert a pontrúgásokban is sikeres, így a második rész hamis (I ∧ H = H)',
          'IGAZ, mert a passzokban valóban ügyes',
          'IGAZ, mert a mondatban szerepel a „de” szó',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'A „de” = ÉS. Ha a második tag hamis, a konjunkció elbukik!',
        explanation: 'Mivel Dominik kitűnő pontrúgó, a „nem sikeres a pontrúgásokban” hamis. Az ÉS műveletnél egyetlen hamis tag miatt az egész állítás HAMIS.'
      },
      {
        id: 'lq1-9',
        questionTypeBadge: 'Feladatgyűjtemény 1.1.3',
        question: 'Dominik továbbra is mindkét játékelemben kiváló. Mi a logikai értéke a kijelentésnek: „Dominiknek pontosak a hosszú passzai, VAGY jól végzi el a pontrúgásokat”?',
        options: [
          'IGAZ, mert mindkettőben jó, és a VAGY műveletnél ez teljesen megengedett (I ∨ I = I)',
          'HAMIS, mert nem választhat a kettő közül',
          'HAMIS, mert a vagy kizárja, hogy mindkettőben jó legyen',
          'Csak akkor lenne igaz, ha az egyikben rossz lenne'
        ],
        correctAnswer: 0,
        hint: 'Mindkét tag igaz. I ∨ I = ?',
        explanation: 'Mivel mindkét képességben jeleskedik, mindkét tag igaz: IGAZ ∨ IGAZ = IGAZ.'
      },
      {
        id: 'lq1-10',
        questionTypeBadge: 'Halmazműveleti Párhuzam',
        question: 'Mely halmazműveletek felelnek meg rendre a logikai VAGY (diszjunkció) és ÉS (konjunkció) műveleteknek?',
        options: [
          'VAGY ≡ Unió (A ∪ B),  ÉS ≡ Metszet (A ∩ B)',
          'VAGY ≡ Metszet (A ∩ B),  ÉS ≡ Unió (A ∪ B)',
          'VAGY ≡ Komplementer,  ÉS ≡ Különbség',
          'VAGY ≡ Részhalmaz,  ÉS ≡ Alaphalmaz'
        ],
        correctAnswer: 0,
        hint: 'A VAGY egyesít (unió), az ÉS a közös részt veszi (metszet).',
        explanation: 'A diszjunkció az unió műveletének, a konjunkció pedig a metszet műveletének felel meg a halmazelméletben.'
      }
    ]
  },
  2: {
    level: 2,
    title: 'Számelméleti és Geometriai Összetett Állítások',
    subtitle: 'Oszthatósági szabályok, háromszögek tulajdonságai és Venn-diagramos kiértékelések.',
    range: '11–20. feladat',
    focus: 'Oszthatóság VAGY/ÉS műveletekkel, KLM háromszög',
    questions: [
      {
        id: 'lq2-1',
        questionTypeBadge: 'Tankönyv 15. oldal feladat 1',
        question: 'Mi a logikai értéke az állításnak: „A 24 osztható 3-mal vagy 4-gyel”?',
        options: [
          'IGAZ, mert 24 osztható 3-mal is (8) és 4-gyel is (6), így I ∨ I = I',
          'HAMIS, mert csak az egyikkel osztható',
          'HAMIS, mert 24 páros szám',
          'Nem állítás'
        ],
        correctAnswer: 0,
        hint: '24/3 = 8 (egész), 24/4 = 6 (egész).',
        explanation: 'Mindkét tag igaz, így a diszjunkció értéke: IGAZ ∨ IGAZ = IGAZ.'
      },
      {
        id: 'lq2-2',
        questionTypeBadge: 'Tankönyv 15. oldal feladat 1',
        question: 'Mi a logikai értéke a kijelentésnek: „A 36 osztható 6-tal és 8-cal”?',
        options: [
          'HAMIS, mert 36/8 = 4,5 (nem egész), így az ÉS kapcsolat elbukik (I ∧ H = H)',
          'IGAZ, mert 36 osztható 6-tal',
          'IGAZ, mert 6 és 8 összege 14',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'Osztható-e a 36 maradék nélkül 8-cal?',
        explanation: '36 osztható 6-tal (I), de 8-cal nem (H). Mivel a művelet ÉS (konjunkció), az eredmény HAMIS.'
      },
      {
        id: 'lq2-3',
        questionTypeBadge: 'Tankönyv 15. oldal feladat 1',
        question: 'Mi a logikai értéke az állításnak: „A 48 osztható 12-vel vagy 15-tel”?',
        options: [
          'IGAZ, mert 48 osztható 12-vel (4), és a VAGY műveletnél egy igaz tag elegendő (I ∨ H = I)',
          'HAMIS, mert 15-tel nem osztható',
          'HAMIS, mert mindkettővel oszthatónak kellene lennie',
          'IGAZ, mert 48 osztható 15-tel'
        ],
        correctAnswer: 0,
        hint: '48/12 = 4 (egész). Kell-e még vizsgálni a 15-öt a VAGY-nál?',
        explanation: 'Mivel 48/12 = 4 egész szám, az első tag igaz. A diszjunkció azonnal IGAZ, függetlenül a második tag hamisságától.'
      },
      {
        id: 'lq2-4',
        questionTypeBadge: 'Tankönyv 15. oldal feladat 1',
        question: 'Mi a logikai értéke a mondatnak: „Az 50 osztható 5-tel és 10-zel”?',
        options: [
          'IGAZ, mert 50/5 = 10 és 50/10 = 5, mindkét feltétel teljesül (I ∧ I = I)',
          'HAMIS, mert 50 nem osztható 10-zel',
          'HAMIS, mert csak az 5-tel való oszthatóság számít',
          'Csak VAGY művelettel lenne igaz'
        ],
        correctAnswer: 0,
        hint: '50 végződése 0, így 5-tel és 10-zel is osztható.',
        explanation: 'Mindkét oszthatóság fennáll, így a konjunkció értéke: IGAZ ∧ IGAZ = IGAZ.'
      },
      {
        id: 'lq2-5',
        questionTypeBadge: 'Tankönyv 16. oldal feladat 1',
        question: 'A KLM háromszögről két állítást fogalmazunk meg: A: „egyenlő szárú”, B: „derékszögű”. Melyik állítás igaz egy olyan KLM háromszögre, amelynek szögei 45°, 45° és 90°?',
        options: [
          'Mind az A ∨ B, mind az A ∧ B állítás IGAZ',
          'Csak az A ∨ B igaz, az A ∧ B hamis',
          'Csak az A ∧ B igaz, az A ∨ B hamis',
          'Mindkettő hamis'
        ],
        correctAnswer: 0,
        hint: 'A háromszögnek van derékszöge (90°) és két egyenlő szöge (45°-45°), ami egyenlő szárakat jelent.',
        explanation: 'Mivel van két egyenlő szöge, egyenlő szárú (A igaz). Mivel van 90°-os szöge, derékszögű (B igaz). Így A ∨ B és A ∧ B is IGAZ.'
      },
      {
        id: 'lq2-6',
        questionTypeBadge: 'Tankönyv 17. oldal Venn-diagram',
        question: 'A {12, 15, 21, 32, 35, 36} halmazból mely számokra igaz az állítás: „Osztható 2-vel ÉS osztható 3-mal, de NEM osztható 5-tel”?',
        options: [
          '12 és 36',
          '15 és 21',
          'Csak a 32',
          '12, 32 és 36'
        ],
        correctAnswer: 0,
        hint: '2-vel és 3-mal is osztható azt jelenti: osztható 6-tal, de 5-re nem végződhet!',
        explanation: 'A 12 és a 36 párosak és 3-mal is oszthatók (6-tal oszthatók), és nem oszthatók 5-tel. A 32 nem osztható 3-mal, a 15 pedig páratlan.'
      },
      {
        id: 'lq2-7',
        questionTypeBadge: 'Tankönyv 17. oldal Venn-diagram',
        question: 'A {12, 15, 21, 32, 35, 36} halmazból melyik számra teljesül: „Osztható 3-mal ÉS osztható 5-tel”?',
        options: [
          '15',
          '35',
          '21',
          'Egyikre sem'
        ],
        correctAnswer: 0,
        hint: 'Osztható 3-mal és 5-tel = osztható 15-tel.',
        explanation: 'A 15 osztható 3-mal (15/3 = 5) és 5-tel is (15/5 = 3). A 35 nem osztható 3-mal, a 21 pedig nem osztható 5-tel.'
      },
      {
        id: 'lq2-8',
        questionTypeBadge: 'Kifejezés Értéke',
        question: 'Tudjuk, hogy az A állítás IGAZ, a B állítás pedig HAMIS. Mi az (A ∨ B) ∧ ¬B kifejezés logikai értéke?',
        options: [
          'IGAZ, mert (I ∨ H) = I, és ¬B = I, így I ∧ I = I',
          'HAMIS, mert B hamis volt',
          'Nem határozható meg',
          'HAMIS, mert az ÉS művelet mindig hamis'
        ],
        correctAnswer: 0,
        hint: 'Számold ki lépésről lépésre: A ∨ B = ?, ¬B = ?',
        explanation: '(A ∨ B) = (I ∨ H) = I. Mivel B hamis, ¬B igaz (I). Ekkor I ∧ I = IGAZ.'
      },
      {
        id: 'lq2-9',
        questionTypeBadge: 'Geometria és Logika',
        question: 'Mi a logikai értéke a kijelentésnek: „Van olyan síkbeli háromszög, amely derékszögű ÉS tompaszögű is egyszerre”?',
        options: [
          'HAMIS, mert a belső szögek összege 180°, így nem lehet benne egyszerre egy 90°-os és egy 90°-nál nagyobb szög',
          'IGAZ, a tompaszögű derékszögű háromszög ilyen',
          'IGAZ, ha a háromszög nem egyenlő oldalú',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: '90° + tompaszög (> 90°) már önmagában meghaladja a 180°-ot!',
        explanation: 'Egy háromszögben legfeljebb egy derékszög vagy egy tompaszög lehet. A két tulajdonság konjunkciója lehetetlen, az állítás HAMIS.'
      },
      {
        id: 'lq2-10',
        questionTypeBadge: 'Számelméleti Szabály',
        question: 'Igaz vagy hamis a tétel: „Egy egész szám akkor és csak akkor osztható 10-zel, ha osztható 2-vel ÉS osztható 5-tel”?',
        options: [
          'IGAZ, mert a 2 és az 5 relatív prímek, így a szorzatukkal (10) pontosan akkor osztható egy szám, ha mindkettővel osztható',
          'HAMIS, mert a 4 osztható 2-vel, de 10-zel nem',
          'HAMIS, mert VAGY kapcsolatnak kellene lennie',
          'Csak páros számokra igaz'
        ],
        correctAnswer: 0,
        hint: 'A 10 törzstényezős felbontása 2 × 5.',
        explanation: 'Mivel 2 és 5 relatív prímek, az együttes (ÉS) oszthatóság pontosan egyenértékű a 10-zel való oszthatósággal.'
      }
    ]
  },
  3: {
    level: 3,
    title: 'Logikai Rejtvények és Összetett Érvelések',
    subtitle: 'Igazmondók és hazugok szigete, versenyzők nyilatkozatai és négyszögek tulajdonságai.',
    range: '21–30. feladat',
    focus: 'Összetett következtetések, rejtvények és tautológiák',
    questions: [
      {
        id: 'lq3-1',
        questionTypeBadge: 'Tankönyv 18. oldal (A 3 jóbarát)',
        question: 'A vándor három baráttal találkozik. Tóni azt mondja: „Jakab hazudik!”, Jakab: „Samu nem mond igazat!”, Samu: „Mind igazat beszélünk!”. Ki mond igazat közülük?',
        options: [
          'Csak Jakab mond igazat (Tóni és Samu hazudik)',
          'Csak Tóni mond igazat',
          'Mind a hárman igazat mondanak',
          'Csak Samu mond igazat'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e Samu mondata igaz, miközben a másik kettő egymást vádolja?',
        explanation: 'Samu mondata lehetetlen, mert Tóni és Jakab ellentmondanak egymásnak, így Samu hazudik. Ebből következően Jakab igazat mondott Samuról. Mivel Jakab igazat mond, Tóni vádja hamis, tehát Tóni hazudik. Egyedül Jakab mond igazat.'
      },
      {
        id: 'lq3-2',
        questionTypeBadge: 'Informatikai Logika (XOR vs OR)',
        question: 'Mi a különbség a logikai VAGY (OR kapu) és a Kizáró VAGY (XOR kapu) között, ha mindkét bemenet 1 (igaz)?',
        options: [
          'Az OR kimenete 1 (igaz), míg a XOR kimenete 0 (hamis)',
          'Az OR kimenete 0, míg a XOR kimenete 1',
          'Mindkét kapu kimenete 1',
          'Mindkét kapu kimenete 0'
        ],
        correctAnswer: 0,
        hint: 'A XOR jelentése: eXclusive OR (kizáró vagy, azaz „vagy az egyik, vagy a másik, de nem mindkettő”).',
        explanation: 'A megengedő OR akkor is 1-et ad, ha mindkettő igaz (1 OR 1 = 1). A kizáró XOR csak akkor ad 1-et, ha pontosan az egyik igaz, így 1 XOR 1 = 0.'
      },
      {
        id: 'lq3-3',
        questionTypeBadge: 'Tankönyv 18. oldal feladat 3',
        question: 'Egy négyszögről 5 állítás hangzik el: 1. Egyik szöge derékszög; 2. Középpontosan szimmetrikus; 3. AC átló felezi BD-t; 4. Két-két oldala egyenlő; 5. Átlói felezik egymást. Kiderül, hogy pontosan 3 igaz és 2 hamis. Milyen négyszögről lehet szó?',
        options: [
          'Deltoid (ha van derékszöge, két-két oldala egyenlő, és az egyik átlója felezi a másikat, de nem középpontosan szimmetrikus)',
          'Négyzet',
          'Téglalap',
          'Általános paralelogramma'
        ],
        correctAnswer: 0,
        hint: 'A paralelogramma, téglalap, rombusz és négyzet esetén a 2., 3., 4. és 5. állítás mind egyszerre igaz lenne (ami 4 igaz lenne)!',
        explanation: 'Egy derékszögű deltoid esetén: van derékszöge (I), AC felezi BD-t (I), két-két oldala egyenlő (I) – ez 3 igaz. Viszont nem középpontosan szimmetrikus (H) és az átlói nem felezik kölcsönösen egymást (H) – ez 2 hamis. Pontosan megfelel a feladatnak!'
      },
      {
        id: 'lq3-4',
        questionTypeBadge: 'Tautológia Fogalma',
        question: 'Mi a neve a logikában az olyan összetett formulának, amely a változók bármely igazságértéke mellett mindig IGAZ kimenetet ad (pl. A ∨ ¬A)?',
        options: [
          'Tautológia (azonosan igaz állítás)',
          'Kontradikció (ellentmondás)',
          'Kvantor',
          'Nyitott mondat'
        ],
        correctAnswer: 0,
        hint: 'A harmadik kizárásának elve egy ilyen formula.',
        explanation: 'Az olyan logikai formulát, amely a benne szereplő alapállítások minden lehetséges igazságérték-kombinációjára igaz értéket ad, tautológiának nevezzük.'
      },
      {
        id: 'lq3-5',
        questionTypeBadge: 'Mindennapi Logika Tagadása',
        question: 'Anya azt mondja: „A boltban kenyeret ÉS tejet is veszek.” Mikor bizonyul hamisnak Anya ígérete (mi a tagadása)?',
        options: [
          'Ha nem vesz kenyeret VAGY nem vesz tejet (elég, ha az egyik hiányzik)',
          'Csak akkor, ha sem kenyeret, sem tejet nem vesz',
          'Csak akkor, ha tejet vesz, de kenyeret nem',
          'Minden esetben hamis'
        ],
        correctAnswer: 0,
        hint: 'Az ÉS ígéret megtöréséhez hány dolog hiánya elég?',
        explanation: 'Az ÉS művelet tagadása: ¬(A ∧ B) ≡ ¬A ∨ ¬B. Ha legalább az egyik termék kimarad a kosárból, az ígéret már nem teljesült.'
      },
      {
        id: 'lq3-6',
        questionTypeBadge: 'Mindennapi Logika Tagadása',
        question: 'Peti azt mondta: „Holnap moziba megyek VAGY meccset nézek.” Mikor hazudott Peti (mi a tagadása)?',
        options: [
          'Ha nem ment moziba ÉS nem nézett meccset sem (egyik sem valósult meg)',
          'Ha moziba ment, de meccset nem nézett',
          'Ha mindkét programon részt vett',
          'Ha meccset nézett, de moziba nem ment'
        ],
        correctAnswer: 0,
        hint: 'A VAGY tagadása az, amikor mindkét opció elmarad.',
        explanation: 'A diszjunkció tagadása: ¬(A ∨ B) ≡ ¬A ∧ ¬B. A mondat csak akkor hamis, ha Peti se moziba nem ment, se meccset nem nézett.'
      },
      {
        id: 'lq3-7',
        questionTypeBadge: 'Tankönyv 19. oldal feladat 6',
        question: 'A közmondás szerint: „Nem mind arany, ami fénylik.” Melyik kijelentés jelenti pontosan ugyanezt logikailag?',
        options: [
          'Van olyan fénylő dolog, ami nem arany.',
          'Minden arany, ami nem fénylik.',
          'Minden fénylő dolog arany.',
          'Van olyan arany, ami nem fénylik.'
        ],
        correctAnswer: 0,
        hint: 'Nem minden fénylő dolog arany ≡ Van olyan...',
        explanation: 'A „nem minden fénylő dolog arany” kijelentés azt jelenti, hogy létezik legalább egy olyan dolog, ami fénylik, de nem aranyból van.'
      },
      {
        id: 'lq3-8',
        questionTypeBadge: 'Tankönyv 19. oldal feladat 6',
        question: 'Közmondás: „Nincsen rózsa tövis nélkül.” Melyik állítás fejezi ki logikailag pontosan ugyanezt?',
        options: [
          'Minden rózsa tövises.',
          'Van olyan rózsa, ami nem tövises.',
          'Minden tövis rózsán van.',
          'Nincs olyan tövis, ami rózsán lenne.'
        ],
        correctAnswer: 0,
        hint: 'Ha nincs kivétel nélküle, akkor minden rózsán ott van.',
        explanation: 'A „nincs olyan rózsa, amely tövis nélküli lenne” mondat azonos az univerzális állítással: „Minden rózsa tövises”.'
      },
      {
        id: 'lq3-9',
        questionTypeBadge: 'Formula Egyszerűsítés',
        question: 'Milyen egyszerűbb kifejezéssel ekvivalens az A ∨ (A ∧ B) összetett állítás?',
        options: [
          'A-val (abszorpciós / elnyelési törvény)',
          'B-vel',
          'A ∧ B-vel',
          'Mindig IGAZ-zal'
        ],
        correctAnswer: 0,
        hint: 'Ha A igaz, a kifejezés IGAZ. Ha A hamis, a kifejezés HAMIS. Tehát kizárólag A értékétől függ!',
        explanation: 'Ez a Boole-algebra klasszikus elnyelési törvénye: A ∨ (A ∧ B) ≡ A. Ha A igaz, az unió azonnal igaz; ha A hamis, mindkét tag hamis.'
      },
      {
        id: 'lq3-10',
        questionTypeBadge: 'Tankönyv 19. oldal feladat 7',
        question: 'Mi a logikai értéke a kijelentésnek: „Minden páros prímszám nagyobb, mint 1000”?',
        options: [
          'HAMIS, mert az egyetlen páros prímszám a 2, és 2 < 1000',
          'IGAZ, mert végtelen sok prímszám van',
          'IGAZ, mert 1000 felett sok páros szám van',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Hány páros prímszám létezik a számelméletben?',
        explanation: 'Az egyetlen páros prímszám a 2. Mivel 2 nem nagyobb 1000-nél, az általános állítás azonnal megbukik: HAMIS.'
      }
    ]
  }
};

export const LogicOperationsQuiz: React.FC<LogicOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="3. VAGY művelet, ÉS művelet kvíz"
      subtitle="Diszjunkció és konjunkció szabályai, igazságtáblázatok, olimpiai példák és logikai rejtvények"
      badge="10. Osztály • I. Logika"
      topicBadge="10. OSZTÁLY • I. LOGIKA"
      chapterId="logika"
      topicId="g10-logic-vagy-es"
      topicTitle="3. VAGY művelet, ÉS művelet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Logika Segédlet • VAGY és ÉS művelet"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <LogicOperationsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LogicOperationsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LogicOperationsQuiz;

