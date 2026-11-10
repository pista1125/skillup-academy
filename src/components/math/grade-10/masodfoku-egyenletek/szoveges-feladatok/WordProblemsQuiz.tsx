import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { WordProblemsMatcher } from './WordProblemsMatcher';
import { WordProblemsSorter } from './WordProblemsSorter';
import {
  WordProblemStrategySvg,
  ConsecutiveNumbersSvg,
  ReciprocalProblemSvg,
  SharingCostProblemSvg
} from './WordProblemsFigures';

interface WordProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A szöveges feladat megoldásának 5 lépése',
    description: '1. Ismeretlen (x) és mértékegység ⟶ 2. Algebrai kifejezések ⟶ 3. Egyenlet felállítása és 0-ra rendezése ⟶ 4. Szöveges szűrés (valósághű gyök) ⟶ 5. Szöveges válasz.',
    note: 'Mindig az eredeti szöveg alapján ellenőrizz, ne csak a felállított egyenletbe helyettesíts vissza!',
    color: 'from-blue-500 to-indigo-600',
    figure: <WordProblemStrategySvg size={220} />
  },
  {
    title: 'Szomszédos számok algebrai alakjai',
    description: 'Egymást követő egészek: x és x + 1 (szorzatuk x² + x). Egymást követő páros/páratlan számok: x és x + 2 (szorzatuk x² + 2x). Négyzetösszeg: x² + (x + 1)².',
    note: 'Tetszőleges egész számoknál a negatív gyökpár (pl. -8 és -7) is érvényes megoldás!',
    color: 'from-purple-500 to-pink-600',
    figure: <ConsecutiveNumbersSvg size={220} />
  },
  {
    title: 'Szám és reciproka (x + 1/x = s)',
    description: 'A szám reciproka 1/x (x ≠ 0). Az egyenletet beszorozzuk x-szel: x² - sx + 1 = 0. A kapott gyökök mindig egymás reciprokai lesznek (pl. 2 és 1/2).',
    note: 'A két gyök szorzata a Viète-formula szerint mindig c/a = 1/1 = 1!',
    color: 'from-amber-500 to-orange-600',
    figure: <ReciprocalProblemSvg size={220} />
  },
  {
    title: 'Osztozkodási feladatok modellje',
    description: 'Összköltség K. Eredetileg K/x Ft/fő. Ha k fő kiesik, az új díj K/(x - k) Ft/fő. Az egyenlet: K/(x - k) - K/x = d (ahol d a díjnövekedés).',
    note: 'Figyelj a kérdésre: az eredeti (x) vagy a ténylegesen megmaradt (x - k) létszám a válasz!',
    color: 'from-emerald-500 to-teal-600',
    figure: <SharingCostProblemSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Ismeretlen kijelölése és számelméleti alapok',
    subtitle: 'Szomszédos számok, szorzatok, négyzetek és az alapvető egyenletalkotás.',
    range: '1–10. feladat',
    focus: 'Ismeretlen kijelölése és szomszédos számok',
    questions: [
      {
        id: 'wpq1-1',
        questionTypeBadge: 'Módszertan',
        question: 'Mi a legelső és legfontosabb lépés bármely szöveges feladat megoldásakor?',
        options: [
          'A szöveg alapos értelmezése és az ismeretlen (x) pontos kijelölése mértékegységgel',
          'Azonnal felírni a másodfokú megoldóképletet',
          'Összeszorozni az összes számot a szövegből',
          'Kitalálni a választ fejben próba-szerencse alapon'
        ],
        correctAnswer: 0,
        explanation: 'A sikeres megoldás alapja az ismeretlen egyértelmű rögzítése (pl. „Legyen x a kisebbik egész szám”). Ha nincs rögzítve, mit jelent az x, a kapott számokat sem tudjuk helyesen értelmezni a végén.'
      },
      {
        id: 'wpq1-2',
        questionTypeBadge: 'Modellalkotás',
        question: 'Hogyan jelölünk két egymást követő (szomszédos) egész számot algebrailag?',
        options: [
          'x és x + 1',
          'x és 2x',
          'x és x + 2',
          'x és x²'
        ],
        correctAnswer: 0,
        explanation: 'Az egész számok egyesével követik egymást a számegyenesen, így ha az egyik x, akkor a közvetlenül utána következő szomszédja x + 1.'
      },
      {
        id: 'wpq1-3',
        questionTypeBadge: 'Páros számok',
        question: 'Hogyan jelölünk két egymást követő PÁROS számot algebrailag?',
        options: [
          'x és x + 2 (ahol x páros szám)',
          'x és x + 1',
          '2x és 3x',
          'x és 2x + 1'
        ],
        correctAnswer: 0,
        explanation: 'A páros számok kettesével követik egymást (pl. 4, 6, 8...), ezért a különbségük mindig 2. Ha az egyik x, akkor a rákövetkező páros szám x + 2.'
      },
      {
        id: 'wpq1-4',
        questionTypeBadge: 'Egyenletalkotás',
        question: 'Két szomszédos pozitív egész szám szorzata 56. Melyik egyenlet írja le helyesen a feladatot?',
        options: [
          'x · (x + 1) = 56 ⟹ x² + x - 56 = 0',
          'x + (x + 1) = 56',
          'x · (x + 2) = 56',
          'x² + 56 = 0'
        ],
        correctAnswer: 0,
        explanation: 'A két szám x és x + 1. Szorzatuk: x(x + 1) = 56. Zárójelbontás és 0-ra rendezés után: x² + x - 56 = 0.'
      },
      {
        id: 'wpq1-5',
        questionTypeBadge: 'Szűrés és válasz',
        question: 'Az x² + x - 56 = 0 gyökei x₁ = 7 és x₂ = -8. Mi a helyes válasz arra a kérdésre, hogy „melyik két POZITÍV egész szám szorzata 56”?',
        options: [
          'A 7 és a 8',
          'A -8 és a -7',
          'A 7 és a -8',
          'Mindkét számpár jó'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a feladat kifejezetten POZITÍV számokat kért, az x₂ = -8 kiesik. Így x = 7, a másik szám x + 1 = 8. A válasz: 7 és 8.'
      },
      {
        id: 'wpq1-6',
        questionTypeBadge: 'Egész számok szorzata',
        question: 'Mi a válasz, ha a feladat szövege csak annyit mondott: „Melyik két EGÉSZ szám szorzata 56”?',
        options: [
          'Két számpár is megfelel: a (7; 8) és a (-8; -7)',
          'Csak a (7; 8)',
          'Csak a (-8; -7)',
          'Nincs ilyen egész számpár'
        ],
        correctAnswer: 0,
        explanation: 'Az egész számok halmazába (ℤ) a negatív számok is beletartoznak! Mivel (-8) · (-7) = +56, és a -8 és -7 szomszédos egészek, ez a pár is tökéletes és kötelező megoldás.'
      },
      {
        id: 'wpq1-7',
        questionTypeBadge: 'Szám és négyzete',
        question: 'Egy szám négyzete 30-cal nagyobb magánál a számnál. Melyik másodfokú egyenlet felel meg ennek?',
        options: [
          'x² - x - 30 = 0',
          'x² + x - 30 = 0',
          'x² = 30x',
          '2x - 30 = x²'
        ],
        correctAnswer: 0,
        explanation: 'A szám négyzete x², maga a szám x. A feltétel: x² = x + 30. Nullára rendezve: x² - x - 30 = 0.'
      },
      {
        id: 'wpq1-8',
        questionTypeBadge: 'Gyökök ellenőrzése',
        question: 'Melyik két valós szám elégíti ki az x² - x - 30 = 0 egyenletet?',
        options: [
          'x₁ = 6 és x₂ = -5',
          'x₁ = 5 és x₂ = -6',
          'x₁ = 10 és x₂ = -3',
          'x₁ = 30 és x₂ = 1'
        ],
        correctAnswer: 0,
        explanation: 'D = 1 - 4·1·(-30) = 121, √121 = 11. x = (1 ± 11) / 2 ⟹ x₁ = 6 és x₂ = -5. Valóban: 6² - 6 = 30, és (-5)² - (-5) = 25 + 5 = 30.'
      },
      {
        id: 'wpq1-9',
        questionTypeBadge: 'Különbség modellje',
        question: 'Két szám különbsége 7. Hogyan érdemes felírni a két számot egyetlen ismeretlennel?',
        options: [
          'x és x + 7',
          'x és 7x',
          'x és x - 14',
          'x és 7/x'
        ],
        correctAnswer: 0,
        explanation: 'Ha a kisebbik szám x, akkor a 7-tel nagyobb szám x + 7. Így a különbségük: (x + 7) - x = 7, pontosan a feltétel szerint.'
      },
      {
        id: 'wpq1-10',
        questionTypeBadge: 'Egyenletalkotás',
        question: 'Két szám szorzata 60, és az egyik 4-gyel nagyobb a másiknál. Melyik a 0-ra rendezett egyenlet?',
        options: [
          'x² + 4x - 60 = 0',
          'x² - 4x - 60 = 0',
          'x² + 4x + 60 = 0',
          '4x² - 60 = 0'
        ],
        correctAnswer: 0,
        explanation: 'A két szám x és x + 4. Szorzatuk: x(x + 4) = 60 ⟹ x² + 4x = 60 ⟹ x² + 4x - 60 = 0.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Reciprokos és geometriai szöveges feladatok',
    subtitle: 'Szám és reciproka, négyzetösszegek, téglalap-méretezés és fizikai szűrés.',
    range: '11–20. feladat',
    focus: 'Reciprok, téglalapok és négyzetösszegek',
    questions: [
      {
        id: 'wpq2-1',
        questionTypeBadge: 'Reciprok fogalma',
        question: 'Mit nevezünk egy 0-tól különböző x szám reciprokának?',
        options: [
          'Az 1/x számot, amellyel az x-et megszorozva 1-et kapunk',
          'A -x ellentettet',
          'Az x² négyzetet',
          'A √x négyzetgyököt'
        ],
        correctAnswer: 0,
        explanation: 'Egy szám reciproka az a szám, amellyel megszorozva az eredetit a szorzat 1 lesz: x · (1/x) = 1. Feltétel: x ≠ 0.'
      },
      {
        id: 'wpq2-2',
        questionTypeBadge: 'Reciprokos egyenlet',
        question: 'Egy pozitív szám és reciprokának összege 2,5 (5/2). Melyik másodfokú egyenlethez jutunk beszorzás után?',
        options: [
          '2x² - 5x + 2 = 0',
          'x² - 5x + 2 = 0',
          '2x² + 5x + 2 = 0',
          'x² + 1 = 2,5'
        ],
        correctAnswer: 0,
        explanation: 'x + 1/x = 5/2. Beszorozzuk mindkét oldalt 2x-szel: 2x² + 2 = 5x. Nullára rendezve: 2x² - 5x + 2 = 0.'
      },
      {
        id: 'wpq2-3',
        questionTypeBadge: 'Kölcsönös gyökök',
        question: 'Mik a 2x² - 5x + 2 = 0 egyenlet gyökei?',
        options: [
          'x₁ = 2 és x₂ = 1/2',
          'x₁ = 5 és x₂ = 2',
          'x₁ = -2 és x₂ = -1/2',
          'x₁ = 4 és x₂ = 1'
        ],
        correctAnswer: 0,
        explanation: 'D = 25 - 16 = 9. x = (5 ± 3) / 4 ⟹ x₁ = 8/4 = 2, x₂ = 2/4 = 1/2. Mindkét szám megfelel, hiszen 2 + 1/2 = 2,5 és 1/2 + 2 = 2,5.'
      },
      {
        id: 'wpq2-4',
        questionTypeBadge: 'Négyzetek összege',
        question: 'Két szomszédos egész szám négyzetének összege 41. Melyik másodfokú egyenlet fejezi ki ezt?',
        options: [
          'x² + (x + 1)² = 41 ⟹ 2x² + 2x - 40 = 0 ⟹ x² + x - 20 = 0',
          '(x + x + 1)² = 41',
          'x² + x + 1 = 41',
          '2x² + 1 = 41'
        ],
        correctAnswer: 0,
        explanation: 'Az első szám négyzete x², a szomszédos négyzete (x + 1)² = x² + 2x + 1. Összegük: 2x² + 2x + 1 = 41 ⟹ 2x² + 2x - 40 = 0 ⟹ x² + x - 20 = 0.'
      },
      {
        id: 'wpq2-5',
        questionTypeBadge: 'Számpárok megadása',
        question: 'Mely számpárok elégítik ki, hogy két szomszédos egész szám négyzetösszege 41?',
        options: [
          'A (4; 5) és a (-5; -4)',
          'Csak a (4; 5)',
          'A (3; 4) és a (5; 6)',
          'Nincs ilyen egész számpár'
        ],
        correctAnswer: 0,
        explanation: 'Az x² + x - 20 = 0 gyökei x₁ = 4 és x₂ = -5. Ha x = 4, a szomszédja 5 (4² + 5² = 16 + 25 = 41). Ha x = -5, a szomszédja -4 ((-5)² + (-4)² = 25 + 16 = 41).'
      },
      {
        id: 'wpq2-6',
        questionTypeBadge: 'Téglalap modell',
        question: 'Egy téglalap területe 40 cm², egyik oldala 3 cm-rel hosszabb a másiknál. Hány cm a rövidebb oldal?',
        options: [
          '5 cm (mert az x = -8 gyök fizikailag lehetetlen)',
          '8 cm',
          '5 cm vagy -8 cm',
          '13 cm'
        ],
        correctAnswer: 0,
        explanation: 'x · (x + 3) = 40 ⟹ x² + 3x - 40 = 0. A gyökök x₁ = 5 és x₂ = -8. Mivel hosszúság nem lehet negatív, a rövidebb oldal 5 cm (a hosszabb 8 cm).'
      },
      {
        id: 'wpq2-7',
        questionTypeBadge: 'Szűrés indoklása',
        question: 'Miért kötelező elvetni az x = -8 gyököt egy téglalap oldalának kiszámításakor?',
        options: [
          'Mert a fizikai geometriában a szakasz hossza kötelezően szigorúan pozitív valós szám',
          'Mert a negatív számoknak nincs négyzete',
          'Mert a téglalap területe páros szám',
          'Mert az x² mindig pozitív kell legyen'
        ],
        correctAnswer: 0,
        explanation: 'A valós térben nem létezik negatív hosszúságú oldal. A matematikai egyenlet két gyököt ad, de a feladat fizikai szövege kizárja a negatív értéket.'
      },
      {
        id: 'wpq2-8',
        questionTypeBadge: 'Tört és reciprok',
        question: 'Egy számhoz hozzáadva a reciprokát 26/5-öt kapunk. Mi a két lehetséges szám?',
        options: [
          '5 és 1/5',
          '2 és 1/2',
          '3 és 1/3',
          '26 és 5'
        ],
        correctAnswer: 0,
        explanation: 'x + 1/x = 26/5 ⟹ 5x² - 26x + 5 = 0. D = 676 - 100 = 576, √576 = 24. x = (26 ± 24)/10 ⟹ x₁ = 5, x₂ = 2/10 = 1/5.'
      },
      {
        id: 'wpq2-9',
        questionTypeBadge: 'Páratlan számok',
        question: 'Két szomszédos pozitív páratlan szám szorzata 63. Melyik ez a két szám?',
        options: [
          '7 és 9',
          '9 és 11',
          '5 és 7',
          '3 és 21'
        ],
        correctAnswer: 0,
        explanation: 'x(x + 2) = 63 ⟹ x² + 2x - 63 = 0. Gyökök: x₁ = 7, x₂ = -9. Mivel pozitív páratlan számokat keresünk, x = 7, a következő pedig x + 2 = 9.'
      },
      {
        id: 'wpq2-10',
        questionTypeBadge: 'Kerület és terület',
        question: 'Egy téglalap kerülete 26 cm, területe 40 cm². Mik a téglalap oldalai?',
        options: [
          '5 cm és 8 cm',
          '4 cm és 10 cm',
          '2 cm és 20 cm',
          '6 cm és 7 cm'
        ],
        correctAnswer: 0,
        explanation: 'K = 2(a + b) = 26 ⟹ a + b = 13 ⟹ b = 13 - a. Terület: a(13 - a) = 40 ⟹ a² - 13a + 40 = 0. Gyökök: 5 és 8. Az oldalak 5 cm és 8 cm.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Osztozkodási és összetett szöveges problémák',
    subtitle: 'Csoportos költségmegosztás, munkavégzés, körmérkőzések és a precíz válaszadás.',
    range: '21–30. feladat',
    focus: 'Osztozkodás, komplex modellezés és válaszpontosság',
    questions: [
      {
        id: 'wpq3-1',
        questionTypeBadge: 'Osztozkodási modell',
        question: 'Egy társaság 120 000 Ft-ért bérel termet. Ha 5 fővel többen mennek, fejenként 800 Ft-tal kevesebbet fizetnek. Melyik egyenlet írja le ezt?',
        options: [
          '120 000 / x - 120 000 / (x + 5) = 800',
          '120 000 / (x + 5) - 120 000 / x = 800',
          '120 000 / x + 800 = x + 5',
          'x · (x + 5) = 120 000'
        ],
        correctAnswer: 0,
        explanation: 'Az eredeti fejenkénti díj 120000/x Ft. A megnövekedett létszám mellett az új díj 120000/(x + 5) Ft. Mivel a kevesebb fő többet fizet, a régi díjból kivonva az újat kapjuk meg a 800 Ft megtakarítást.'
      },
      {
        id: 'wpq3-2',
        questionTypeBadge: 'Törtes kivonási sorrend',
        question: 'Miért áll a nagyobb létszámú tört a kivonásban HÁTUL: 120000/x - 120000/(x + 5) = 800?',
        options: [
          'Mert nagyobb nevezőjű tört értéke KISEBB, és pozitív különbséget csak nagyobból kisebbet kivonva kaphatunk',
          'Mert az x betű mindig megelőzi az x + 5-öt',
          'Mert a törteknél a bal oldalnak nagyobbnak kell lennie 0-nál',
          'Nincs jelentősége a sorrendnek'
        ],
        correctAnswer: 0,
        explanation: 'Ha a számláló azonos (120 000), a tört értéke annál nagyobb, minél kisebb a nevezője. Mivel x < x + 5, ezért 120000/x > 120000/(x + 5). A különbség így lesz pozitív (+800).'
      },
      {
        id: 'wpq3-3',
        questionTypeBadge: 'Buszos feladat vége',
        question: 'Egy 60 000 Ft-os buszt bérel egy társaság. 2 fő lemondta, emiatt fejenként 1500 Ft-tal többet fizettek. Hányan mentek el VÉGÜL?',
        options: [
          '8 fő ment el (az egyenlet x = 10 eredeti létszámot adott, ebből 2 lemondta)',
          '10 fő ment el',
          '12 fő ment el',
          '6 fő ment el'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenlet: 60000/(x - 2) - 60000/x = 1500 ⟹ x² - 2x - 80 = 0 ⟹ x₁ = 10 (a -8 kiesik). Az x = 10 az EREDETI terv volt! Végül 10 - 2 = 8 fő utazott el.'
      },
      {
        id: 'wpq3-4',
        questionTypeBadge: 'Pitagorasz-modell',
        question: 'Egy derékszögű háromszög átfogója 10 cm, egyik befogója 2 cm-rel hosszabb a másiknál. Mennyi a rövidebb befogó?',
        options: [
          '6 cm (befogók: 6 cm és 8 cm)',
          '4 cm',
          '8 cm',
          '5 cm'
        ],
        correctAnswer: 0,
        explanation: 'Pitagorasz-tétel: x² + (x + 2)² = 10² ⟹ x² + x² + 4x + 4 = 100 ⟹ 2x² + 4x - 96 = 0 ⟹ x² + 2x - 48 = 0. Gyökök: 6 és -8. A rövidebb befogó 6 cm.'
      },
      {
        id: 'wpq3-5',
        questionTypeBadge: 'Kétjegyű számok',
        question: 'Egy kétjegyű szám számjegyeinek szorzata 18. A tízesek helyén álló szám 3-mal kisebb az egyesekénél. Mi a szám?',
        options: [
          '36',
          '63',
          '29',
          '18'
        ],
        correctAnswer: 0,
        explanation: 'Legyen a tízes helyiérték x, ekkor az egyes helyiérték x + 3. Szorzatuk: x(x + 3) = 18 ⟹ x² + 3x - 18 = 0 ⟹ x = 3 (a -6 nem lehet számjegy). A szám: 36.'
      },
      {
        id: 'wpq3-6',
        questionTypeBadge: 'Körmérkőzés',
        question: 'Egy sakktornán minden résztvevő pontosan egyszer játszott mindenkivel. Összesen 45 partit játszottak le. Hányan vettek részt a tornán?',
        options: [
          '10 résztvevő',
          '9 résztvevő',
          '15 résztvevő',
          '45 résztvevő'
        ],
        correctAnswer: 0,
        explanation: 'n résztvevő esetén a mérkőzések száma n(n - 1)/2. Az egyenlet: n(n - 1)/2 = 45 ⟹ n² - n = 90 ⟹ n² - n - 90 = 0. Gyökök: 10 és -9. A létszám 10 fő.'
      },
      {
        id: 'wpq3-7',
        questionTypeBadge: 'Munkavégzés',
        question: 'Két csap együtt 6 óra alatt tölt fel egy medencét. Az egyik egyedül 5 órával gyorsabb a másiknál. Melyik egyenlet modellezi ezt?',
        options: [
          '1/x + 1/(x + 5) = 1/6',
          'x + (x + 5) = 6',
          'x · (x + 5) = 6',
          '1/x + 1/5 = 1/6'
        ],
        correctAnswer: 0,
        explanation: '1 óra alatt az első csap a medence 1/x részét, a második az 1/(x + 5) részét tölti fel. Együtt 1 óra alatt a medence 1/6 részét töltik fel: 1/x + 1/(x + 5) = 1/6.'
      },
      {
        id: 'wpq3-8',
        questionTypeBadge: 'Két szám összege és szorzata',
        question: 'Két valós szám összege 20, szorzatuk 96. Melyik ez a két szám?',
        options: [
          '8 és 12',
          '6 és 16',
          '10 és 10',
          '4 és 24'
        ],
        correctAnswer: 0,
        explanation: 'x · (20 - x) = 96 ⟹ 20x - x² = 96 ⟹ x² - 20x + 96 = 0. D = 400 - 384 = 16. x = (20 ± 4)/2 ⟹ x₁ = 12, x₂ = 8. A két szám a 8 és a 12.'
      },
      {
        id: 'wpq3-9',
        questionTypeBadge: 'Válaszadási pontosság',
        question: 'Miért veszíthet pontot egy diák a dolgozatban, ha egy szöveges feladatra csak annyit ír: „x₁ = 12, x₂ = -5”?',
        options: [
          'Mert a szöveges feladatra szöveges választ kell adni mértékegységgel, és a reális gyököt ki kell választani!',
          'Mert az x betűt tilos használni a válaszban',
          'Mert mindkét gyököt át kell húzni',
          'Mert a megoldóképletet kötelező leírni a válaszban'
        ],
        correctAnswer: 0,
        explanation: 'A szöveges feladat a valóságról szól: a pontozási útmutató kötelezően megköveteli a válasz szöveges megfogalmazását, a mértékegység feltüntetését és az életszerűtlen gyökök elhagyásának indoklását.'
      },
      {
        id: 'wpq3-10',
        questionTypeBadge: 'Ellenőrzés módja',
        question: 'Hogyan kell helyesen ellenőrizni a szöveges feladat végeredményét?',
        options: [
          'A kapott eredményt az EREDETI szövegbe helyettesítjük vissza, és megvizsgáljuk, hogy minden állítás teljesül-e',
          'Csak a felírt algebrai egyenletbe helyettesítünk vissza',
          'Újraszámoljuk a diszkriminánst',
          'Nem szükséges ellenőrizni, ha jó a képlet'
        ],
        correctAnswer: 0,
        explanation: 'Ha csak a felírt egyenletbe helyettesítünk vissza, a modellalkotási hibák nem derülnek ki! Kizárólag az eredeti szöveges feltételekbe való visszahelyettesítés garantálja, hogy a válasz valóban a kérdésre felel meg.'
      }
    ]
  }
};

export const WordProblemsQuiz: React.FC<WordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      grade={10}
      chapterId="masodfoku-egyenletek"
      topicId="szoveges-feladatok"
      topicTitle="Szöveges feladatok"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      renderMatcher={(level, onNext, onRules, onB) => (
        <WordProblemsMatcher
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onB}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      )}
      renderSorter={(level, onNext, onRules, onB) => (
        <WordProblemsSorter
          level={level}
          onNextLevel={onNext}
          onOpenRules={onRules}
          onBack={onB}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      )}
    />
  );
};

export default WordProblemsQuiz;

