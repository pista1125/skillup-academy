import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { FractionsNumberLineMatcher } from './FractionsNumberLineMatcher';
import { FractionsNumberLineSorter } from './FractionsNumberLineSorter';

export interface FractionsNumberLineQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export function FractionsNumberLineQuiz({ onBack, onSwitchToTheory }: FractionsNumberLineQuizProps) {
  const cheatSheetCards: CheatSheetCard[] = [
    {
      title: 'Számegyenes beosztása',
      badge: 'Alapszabály',
      variant: 'blue',
      content: 'A tört nevezője mutatja meg, hány egyenlő részre osztjuk az 1 egész egységet (pl. 4-es nevező = 4 egyenlő rész).'
    },
    {
      title: 'Áltört ➔ Vegyes tört',
      badge: 'Osztás maradékkal',
      variant: 'blue',
      content: 'Oszd el a számlálót a nevezővel: az egész hányados lesz az egész rész, a maradék az új számláló (pl. 7/4 = 1 3/4).'
    },
    {
      title: 'Vegyes tört ➔ Áltört',
      badge: 'Szorzás + összeadás',
      variant: 'emerald',
      content: 'Egész szorozva a nevezővel, plusz a számláló adja az áltört számlálóját: e a/b = (e · b + a)/b (pl. 2 3/5 = 13/5).'
    },
    {
      title: 'Tört helyzete a számegyenesen',
      badge: 'Intervallum',
      variant: 'amber',
      content: 'Valódi tört (< 1) mindig 0 és 1 közé esik. Vegyes tört (pl. 2 1/4) mindig az egész része (2) és a következő egész (3) közé esik.'
    }
  ];

  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: ALAPOK (10 KÉRDÉS)
    // ==========================================
    {
      id: 'q1-1',
      level: 1,
      question: 'Hány egyenlő részre kell osztani az 1 egész egységet a számegyenesen a 3/4 tört ábrázolásához?',
      options: ['4 egyenlő részre', '3 egyenlő részre', '7 egyenlő részre', '1 részre'],
      correctAnswer: '4 egyenlő részre',
      hint: 'A tört nevezője (alsó szám) mondja meg, hány egyenlő részre vágjuk az 1 egészet.',
      explanation: 'A 3/4 nevezője 4, így az 1 egységet pontosan 4 egyenlő részre (negyedekre) kell osztani.',
      breakdown: [
        '1. Nevező = 4 ⟹ 4 egyenlő részre osztjuk a 0 és 1 közötti szakaszt.',
        '2. Számláló = 3 ⟹ 3 beosztásnyit lépünk a 0 ponttól.'
      ]
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'Melyik két szomszédos egész szám közé esik a 2/3 valódi tört a számegyenesen?',
      options: ['0 és 1 közé', '1 és 2 közé', '2 és 3 közé', '-1 és 0 közé'],
      correctAnswer: '0 és 1 közé',
      hint: 'A 2/3 egy valódi tört, mert a számlálója kisebb a nevezőjénél.',
      explanation: 'Minden pozitív valódi tört értéke kisebb 1-nél, így a számegyenesen a 0 és az 1 közé esik.',
      breakdown: [
        '1. 2/3 < 1 egész.',
        '2. 0-tól jobbra, de az 1-től balra helyezkedik el: 0 < 2/3 < 1.'
      ]
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Melyik egész szám jelölésére esik pontosan a 4/4 tört a számegyenesen?',
      options: ['1', '0', '4', '2'],
      correctAnswer: '1',
      hint: 'Ha a számláló és a nevező megegyezik, 4 : 4 = ?',
      explanation: '4/4 = 4 : 4 = 1. A 4/4 pontosan az 1-es egész szám osztópontjára esik.',
      breakdown: [
        '1. 4/4 = 1 egész.',
        '2. A számegyenesen a 0-tól indulva 4 negyed lépés pontosan az 1 egészhez vezet.'
      ]
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Melyik vegyes tört felel meg az 5/4 áltörtnek?',
      options: ['1 1/4', '2 1/4', '1 4/5', '5 1/4'],
      correctAnswer: '1 1/4',
      hint: 'Oszd el az 5-öt 4-gyel: 5 : 4 = 1, és mennyi marad?',
      explanation: '5 : 4 = 1 (egész rész), maradék 1 (új számláló). Így 5/4 = 1 1/4.',
      breakdown: [
        '1. 5 : 4 = 1 egész.',
        '2. Maradék = 1 negyed.',
        '3. Vegyes tört alak: 1 1/4.'
      ]
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Melyik áltört felel meg az 1 1/2 vegyes törtnek?',
      options: ['3/2', '2/3', '1/2', '4/2'],
      correctAnswer: '3/2',
      hint: '1 egész az 2 fél (2/2). Ehhez adjuk még hozzá az 1/2-et.',
      explanation: '1 1/2 = (1 · 2 + 1)/2 = 3/2.',
      breakdown: [
        '1. 1 egész = 2/2.',
        '2. 2/2 + 1/2 = 3/2.'
      ]
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Hol helyezkedik el a 3/2 tört a számegyenesen?',
      options: ['1 és 2 között pontosan félúton', '0 és 1 között', '2 és 3 között', '3 és 4 között'],
      correctAnswer: '1 és 2 között pontosan félúton',
      hint: '3/2 = 1 1/2 = 1,5.',
      explanation: 'A 3/2 vegyes tört alakban 1 1/2, vagyis az 1 és a 2 közötti szakasz pontos felezőpontja.',
      breakdown: [
        '1. 3/2 = 1 1/2.',
        '2. 1 egész után még 1 fél lépés ⟹ 1 és 2 felezőpontja.'
      ]
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Ha az egységszakaszt 5 egyenlő részre osztjuk, hány osztásközt kell lépnünk 0-tól a 4/5 törtig?',
      options: ['4 lépést', '5 lépést', '1 lépést', '9 lépést'],
      correctAnswer: '4 lépést',
      hint: 'A számláló (felső szám) adja meg a lépések számát.',
      explanation: 'Minden lépés 1/5 távolság. A 4/5 eléréséhez 4 darab 1/5 lépést teszünk meg a 0-tól.',
      breakdown: [
        '1. 1 beosztás = 1/5.',
        '2. 4/5 = 4 · (1/5) ⟹ 4 lépés.'
      ]
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Melyik vegyes tört felel meg a 7/3 áltörtnek?',
      options: ['2 1/3', '1 4/3', '3 1/3', '2 2/3'],
      correctAnswer: '2 1/3',
      hint: '7 : 3 = 2, mennyi a maradék?',
      explanation: '7 : 3 = 2 (egész rész), maradék 1 (új számláló). Így 7/3 = 2 1/3.',
      breakdown: [
        '1. 7 : 3 = 2 egész (mivel 2 · 3 = 6).',
        '2. Maradék = 7 - 6 = 1.',
        '3. Eredmény: 2 1/3.'
      ]
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Melyik szám nagyobb a számegyenesen: az 1 1/4 vagy a 3/4?',
      options: ['1 1/4', '3/4', 'Egyenlőek', 'Nem összehasonlíthatóak'],
      correctAnswer: '1 1/4',
      hint: 'Az 1 1/4 több mint 1 egész, míg a 3/4 kevesebb mint 1 egész.',
      explanation: '1 1/4 > 1 és 3/4 < 1, így a számegyenesen az 1 1/4 jobbra helyezkedik el, tehát nagyobb.',
      breakdown: [
        '1. 1 1/4 = 5/4 = 1,25 > 1.',
        '2. 3/4 = 0,75 < 1.',
        '3. 1 1/4 > 3/4.'
      ]
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Mi a vegyes tört egész része a 9/4 áltört felírásakor?',
      options: ['2', '1', '4', '9'],
      correctAnswer: '2',
      hint: '9-ben a 4 hányszor van meg egészszer?',
      explanation: '9 : 4 = 2 (maradék 1), tehát a 9/4 = 2 1/4, az egész rész értéke 2.',
      breakdown: [
        '1. 9 : 4 = 2 egész.',
        '2. 2 · 4 = 8, maradék 1.',
        '3. Egész rész = 2.'
      ]
    },

    // ==========================================
    // 2. SZINT: KÖZÉPHALADÓ (10 KÉRDÉS)
    // ==========================================
    {
      id: 'q2-1',
      level: 2,
      question: 'Melyik két szomszédos egész szám közé esik a 11/3 tört a számegyenesen?',
      options: ['3 és 4 közé', '2 és 3 közé', '4 és 5 közé', '1 és 2 közé'],
      correctAnswer: '3 és 4 közé',
      hint: 'Alakítsd vegyes törtté: 11 : 3 = ?',
      explanation: '11 : 3 = 3 (maradék 2) ⟹ 11/3 = 3 2/3. Ez a 3 és a 4 közé esik.',
      breakdown: [
        '1. 11/3 = 3 2/3.',
        '2. Mivel 3 < 3 2/3 < 4, a tört a 3 és 4 közé esik.'
      ]
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Írd fel áltörtként a 2 3/5 vegyes törtet!',
      options: ['13/5', '11/5', '15/5', '10/5'],
      correctAnswer: '13/5',
      hint: 'Szorozd meg az egész részt a nevezővel (2 · 5), majd add hozzá a számlálót (3).',
      explanation: '2 3/5 = (2 · 5 + 3)/5 = (10 + 3)/5 = 13/5.',
      breakdown: [
        '1. 2 egész = 2 · 5 = 10 ötöd (10/5).',
        '2. 10/5 + 3/5 = 13/5.'
      ]
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'A számegyenesen 0 és 1 között 6 egyenlő beosztás van. Melyik törtet jelöli az 5. beosztás?',
      options: ['5/6', '6/5', '1/6', '5/1'],
      correctAnswer: '5/6',
      hint: 'Minden beosztás 1/6 értékű, az 5. beosztás 5 ilyen lépést jelent.',
      explanation: 'Ha az 1 egység 6 részre van osztva, egy beosztás 1/6. Az 5. pont az 5/6.',
      breakdown: [
        '1. Beosztásköze = 1/6.',
        '2. 5 lépés a 0-tól = 5/6.'
      ]
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Melyik vegyes tört felel meg a 17/4 áltörtnek?',
      options: ['4 1/4', '3 3/4', '4 3/4', '17 1/4'],
      correctAnswer: '4 1/4',
      hint: '17 : 4 = 4 (mert 4 · 4 = 16), mennyi maradt?',
      explanation: '17 : 4 = 4, a maradék 1. Így 17/4 = 4 1/4.',
      breakdown: [
        '1. 17 : 4 = 4 egész.',
        '2. 4 · 4 = 16, 17 - 16 = 1 maradék.',
        '3. Eredmény: 4 1/4.'
      ]
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'Melyik tört van KÖZELEBB a 2 egészhez a számegyenesen: az 1 3/4 vagy a 2 1/2?',
      options: ['1 3/4 (távolság 1/4)', '2 1/2 (távolság 1/2)', 'Egyenlő távolságra vannak', 'Egyik sem'],
      correctAnswer: '1 3/4 (távolság 1/4)',
      hint: 'Számold ki mindkét szám távolságát a 2-től: |2 - 1 3/4| = ? és |2 1/2 - 2| = ?',
      explanation: 'A 2-től az 1 3/4 távolsága 1/4 (0,25), míg a 2 1/2 távolsága 1/2 (0,50). Az 1/4 kisebb távolság, így az 1 3/4 van közelebb.',
      breakdown: [
        '1. 2 - 1 3/4 = 1/4.',
        '2. 2 1/2 - 2 = 1/2 = 2/4.',
        '3. 1/4 < 2/4 ⟹ az 1 3/4 van közelebb.'
      ]
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Írd fel áltörtként a 3 2/7 vegyes törtet!',
      options: ['23/7', '21/7', '13/7', '42/7'],
      correctAnswer: '23/7',
      hint: '(3 · 7 + 2) / 7 = ?',
      explanation: '3 2/7 = (3 · 7 + 2)/7 = (21 + 2)/7 = 23/7.',
      breakdown: [
        '1. 3 egész = 3 · 7 = 21 heted.',
        '2. 21/7 + 2/7 = 23/7.'
      ]
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Melyik állítás IGAZ az áltörtekre a számegyenesen?',
      options: [
        'Minden áltört ≥ 1, így a számegyenesen az 1-es ponton vagy attól jobbra van',
        'Minden áltört a 0 és 1 közé esik',
        'Az áltörteket nem lehet vegyes tört alakra hozni',
        'Az áltörtek számlálója kisebb a nevezőjénél'
      ],
      correctAnswer: 'Minden áltört ≥ 1, így a számegyenesen az 1-es ponton vagy attól jobbra van',
      hint: 'Az áltört számlálója nem kisebb a nevezőjénél (számláló ≥ nevező).',
      explanation: 'Mivel az áltört számlálója legalább akkora, mint a nevezője, értéke legalább 1 egész, így a számegyenesen az 1-es ponton vagy attól jobbra helyezkedik el.',
      breakdown: [
        '1. Áltört definíciója: számláló ≥ nevező.',
        '2. Tört értéke ≥ 1 ⟹ helye a számegyenesen az 1 pont vagy attól jobbra.'
      ]
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'A számegyenesen a 2 és a 3 között 4 egyenlő rész van. Melyik szám felel meg a 2-től jobbra lévő 3. osztópontnak?',
      options: ['2 3/4 (= 11/4)', '2 1/4', '3 1/4', '2 1/3'],
      correctAnswer: '2 3/4 (= 11/4)',
      hint: 'A 2 egészből indulunk ki, és 3 darab negyedet lépünk jobbra.',
      explanation: 'A 2 egészhez hozzáadva 3 darab 1/4 lépést, a 2 3/4 = 11/4 ponthoz érkezünk.',
      breakdown: [
        '1. Kezdőpont = 2.',
        '2. Lépések = 3 negyed (3/4).',
        '3. Pont értéke: 2 + 3/4 = 2 3/4 = 11/4.'
      ]
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Mennyi a 14/3 áltört vegyes tört alakja?',
      options: ['4 2/3', '3 2/3', '4 1/3', '5 1/3'],
      correctAnswer: '4 2/3',
      hint: '14 : 3 = 4 (mert 4 · 3 = 12), mennyi a maradék?',
      explanation: '14 : 3 = 4 (maradék 2). Így 14/3 = 4 2/3.',
      breakdown: [
        '1. 14 : 3 = 4 egész.',
        '2. 14 - 12 = 2 maradék.',
        '3. Eredmény: 4 2/3.'
      ]
    },
    {
      id: 'q2-10',
      level: 2,
      question: 'Melyik a helyes reláció a 2 1/3 és a 7/3 között?',
      options: ['2 1/3 = 7/3', '2 1/3 > 7/3', '2 1/3 < 7/3', 'Nem hasonlíthatóak össze'],
      correctAnswer: '2 1/3 = 7/3',
      hint: 'Alakítsd át a 2 1/3-ot áltörtté: (2 · 3 + 1)/3 = ?',
      explanation: '2 1/3 = (2 · 3 + 1)/3 = 7/3. A két felírás pontosan ugyanazt a pontot jelöli a számegyenesen.',
      breakdown: [
        '1. 2 1/3 = 6/3 + 1/3 = 7/3.',
        '2. A két érték pontosan egyenlő: 2 1/3 = 7/3.'
      ]
    },

    // ==========================================
    // 3. SZINT: MESTERFOK (10 KÉRDÉS)
    // ==========================================
    {
      id: 'q3-1',
      level: 3,
      question: 'Melyik két szomszédos egész szám közé esik a 29/6 tört a számegyenesen?',
      options: ['4 és 5 közé (4 5/6)', '3 és 4 közé', '5 és 6 közé', '2 és 3 közé'],
      correctAnswer: '4 és 5 közé (4 5/6)',
      hint: '29 : 6 = 4 (mert 4 · 6 = 24), a maradék 5.',
      explanation: '29 : 6 = 4 (maradék 5) ⟹ 29/6 = 4 5/6. Mivel 4 < 4 5/6 < 5, a tört a 4 és 5 közé esik.',
      breakdown: [
        '1. 29 : 6 = 4 egész.',
        '2. 29 - 24 = 5 maradék ⟹ 4 5/6.',
        '3. 4 és 5 közé esik, nagyon közel az 5-höz.'
      ]
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Írd fel áltörtként az 5 4/9 vegyes törtet!',
      options: ['49/9', '45/9', '29/9', '54/9'],
      correctAnswer: '49/9',
      hint: '5 · 9 = 45, ehhez add hozzá a 4-et.',
      explanation: '5 4/9 = (5 · 9 + 4)/9 = (45 + 4)/9 = 49/9.',
      breakdown: [
        '1. 5 egész = 5 · 9 = 45 kilenced.',
        '2. 45/9 + 4/9 = 49/9.'
      ]
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'A számegyenesen az 1 és a 2 közötti szakasz 8 egyenlő részre van osztva. Melyik tört felel meg az 1-től számított 6. osztópontnak legegyszerűbb alakban?',
      options: ['1 3/4 (= 7/4)', '1 6/8', '1 1/2', '1 5/8'],
      correctAnswer: '1 3/4 (= 7/4)',
      hint: '1 6/8 egyszerűsíthető 2-vel.',
      explanation: 'Az 1-től 6 nyolcad lépésre az 1 6/8 van. Egyszerűsítve 6/8 = 3/4, így a pont 1 3/4 = 7/4.',
      breakdown: [
        '1. Pont = 1 + 6/8 = 1 6/8.',
        '2. 6/8 egyszerűsítése 2-vel = 3/4.',
        '3. Legegyszerűbb vegyes tört alak: 1 3/4 = 7/4.'
      ]
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Egy süteményhez 2 1/4 kg liszt szükséges. A boltban 1/4 kg-os kiszerelésű tasakokban árulják. Hány tasakot kell venni?',
      options: ['9 darabot', '8 darabot', '7 darabot', '10 darabot'],
      correctAnswer: '9 darabot',
      hint: 'Alakítsd át a 2 1/4 kg-ot negyedekké (áltörtté)!',
      explanation: '2 1/4 = (2 · 4 + 1)/4 = 9/4 kg. Mivel egy tasak 1/4 kg, összesen 9 darab tasakra van szükség.',
      breakdown: [
        '1. 2 egész kg = 8 db 1/4 kg-os tasak.',
        '2. Még 1/4 kg = 1 db tasak.',
        '3. Összesen: 8 + 1 = 9 db tasak (9/4).'
      ]
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Melyik vegyes tört felel meg a 37/8 áltörtnek?',
      options: ['4 5/8', '4 3/8', '5 1/8', '3 7/8'],
      correctAnswer: '4 5/8',
      hint: '37 : 8 = 4 (mert 4 · 8 = 32), mennyi a maradék?',
      explanation: '37 : 8 = 4 (maradék 5, mert 37 - 32 = 5). Így 37/8 = 4 5/8.',
      breakdown: [
        '1. 37 : 8 = 4 egész.',
        '2. 37 - 32 = 5 maradék.',
        '3. Vegyes tört alak: 4 5/8.'
      ]
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Melyik a helyes növekvő sorrend az alábbi számok között: 1 1/2, 5/4, 2, 7/4?',
      options: [
        '5/4 < 1 1/2 < 7/4 < 2',
        '1 1/2 < 5/4 < 7/4 < 2',
        '5/4 < 7/4 < 1 1/2 < 2',
        '2 < 7/4 < 1 1/2 < 5/4'
      ],
      correctAnswer: '5/4 < 1 1/2 < 7/4 < 2',
      hint: 'Alakíts mindent negyedekké: 1 1/2 = 6/4, 2 = 8/4.',
      explanation: 'Közös nevezővel: 5/4, 1 1/2 = 6/4, 7/4, 2 = 8/4. A sorrend: 5/4 < 6/4 (1 1/2) < 7/4 < 8/4 (2).',
      breakdown: [
        '1. 5/4 = 1,25.',
        '2. 1 1/2 = 6/4 = 1,50.',
        '3. 7/4 = 1,75.',
        '4. 2 = 8/4 = 2,00.',
        '5. Sorrend: 5/4 < 1 1/2 < 7/4 < 2.'
      ]
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Melyik számegyenes pont fekszik PONTOSAN FÉLÚTON a 2 1/4 és a 2 3/4 között?',
      options: ['2 1/2 (= 2 2/4)', '2 1/3', '2 3/8', '3'],
      correctAnswer: '2 1/2 (= 2 2/4)',
      hint: 'A 2 1/4 és 2 3/4 számlálóinak közepe az (1 + 3) / 2 = 2.',
      explanation: 'A 2 1/4 (2,25) és a 2 3/4 (2,75) középpontja a 2 2/4 = 2 1/2 (2,50).',
      breakdown: [
        '1. A két szám távolsága: 2 3/4 - 2 1/4 = 2/4.',
        '2. Fél távolság: 1/4.',
        '3. Középpont: 2 1/4 + 1/4 = 2 2/4 = 2 1/2.'
      ]
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Írd fel vegyes törtként a 43/7 áltörtet!',
      options: ['6 1/7', '5 6/7', '6 3/7', '7 1/7'],
      correctAnswer: '6 1/7',
      hint: '43 : 7 = 6 (mert 6 · 7 = 42), maradék 1.',
      explanation: '43 : 7 = 6 (maradék 1). Így 43/7 = 6 1/7.',
      breakdown: [
        '1. 43 : 7 = 6 egész.',
        '2. 43 - 42 = 1 maradék.',
        '3. Eredmény: 6 1/7.'
      ]
    },
    {
      id: 'q3-9',
      level: 3,
      question: 'Egy túrázó délelőtt 3 2/5 km-t, délután 1 4/5 km-t tett meg. Hány km-t gyalogolt összesen áltört alakban?',
      options: ['26/5 km', '24/5 km', '22/5 km', '25/5 km'],
      correctAnswer: '26/5 km',
      hint: 'Áltörtként: 3 2/5 = 17/5 és 1 4/5 = 9/5. Add össze őket!',
      explanation: '3 2/5 = 17/5 km, 1 4/5 = 9/5 km. Összegük: 17/5 + 9/5 = 26/5 km (= 5 1/5 km).',
      breakdown: [
        '1. 3 2/5 = (3 · 5 + 2)/5 = 17/5.',
        '2. 1 4/5 = (1 · 5 + 4)/5 = 9/5.',
        '3. 17/5 + 9/5 = 26/5 km.'
      ]
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'A számegyenesen a P pont értéke 3 3/4. Milyen távolságra van P a legközelebbi egész számtól?',
      options: ['1/4 egységre (a 4-től)', '3/4 egységre (a 3-tól)', '1/2 egységre', '1 egységre'],
      correctAnswer: '1/4 egységre (a 4-től)',
      hint: 'A 3 3/4 a 3 és a 4 közé esik. Melyikhez van közelebb?',
      explanation: 'A 3-tól a távolság 3/4, a 4-től a távolság 1/4 (4 - 3 3/4 = 1/4). A legközelebbi egész a 4, távolsága 1/4 egység.',
      breakdown: [
        '1. Távolság a 3-tól: 3 3/4 - 3 = 3/4.',
        '2. Távolság a 4-től: 4 - 3 3/4 = 1/4.',
        '3. 1/4 < 3/4 ⟹ a legközelebbi egész a 4, a távolság 1/4.'
      ]
    }
  ];

  return (
    <QuizTemplate
      title="Törtek a számegyenesen, vegyes törtek kvíz"
      subtitle="Gyakorold a számegyenes beosztását, a pontok leolvasását és az áltörtek-vegyes törtek átváltását!"
      badge="📏 5. Osztály • II. Törtek, tizedes törtek"
      topicId="g5-fractions-number-line-quiz"
      documentId="fractions-number-line-quiz-doc"
      pdfFilename="5_osztaly_tortek_szamegyenesen_vegyes_tortek_kviz.pdf"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
      renderMatcher={({ level, onNextLevel, onOpenRules, onBack: mbBack, onSwitchToQuiz: mbQuiz, onSwitchToSorter: mbSorter, onSwitchToTheory: mbTheory }) => (
        <FractionsNumberLineMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={mbBack}
          onSwitchToQuiz={mbQuiz}
          onSwitchToSorter={mbSorter}
          onSwitchToTheory={mbTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules, onBack: sbBack, onSwitchToQuiz: sbQuiz, onSwitchToMatcher: sbMatcher, onSwitchToTheory: sbTheory }) => (
        <FractionsNumberLineSorter
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={sbBack}
          onSwitchToQuiz={sbQuiz}
          onSwitchToMatcher={sbMatcher}
          onSwitchToTheory={sbTheory}
        />
      )}
    />
  );
}

export default FractionsNumberLineQuiz;
