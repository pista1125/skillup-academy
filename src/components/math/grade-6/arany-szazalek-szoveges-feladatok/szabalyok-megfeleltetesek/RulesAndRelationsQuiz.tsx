import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { RulesAndRelationsMatcher } from './RulesAndRelationsMatcher';
import { RulesAndRelationsSorter } from './RulesAndRelationsSorter';

interface RulesAndRelationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const RulesAndRelationsQuiz: React.FC<RulesAndRelationsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Alapfogalmak és egyszerű szabályok)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'A hozzárendelésben minek nevezzük a bemeneti adatokat jelölő „x” változót?',
      options: [
        'Független változónak (alaphalmaz elemeinek)',
        'Függő változónak',
        'Képhalmaznak',
        'Eredményváltozónak'
      ],
      correctAnswer: 0,
      hint: 'Az x értékét mi magunk választhatjuk meg szabadon.',
      explanation: 'A bemeneti adatokat képviselő x a független változó (az alaphalmaz eleme), míg az y kimeneti érték a függő változó (képhalmaz).'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Ha a hozzárendelés szabálya y = 2 · x + 3, mennyi az y értéke x = 4 esetén?',
      options: [
        '11',
        '14',
        '9',
        '8'
      ],
      correctAnswer: 0,
      hint: 'Számold ki: 2 · 4 + 3.',
      explanation: 'y = 2 · 4 + 3 = 8 + 3 = 11.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Mit jelent a matematikai „x ↦ 3x” jelölés?',
      options: [
        'Minden x számhoz a 3-szorosát rendeljük hozzá',
        'Minden x számhoz adjunk hozzá 3-at',
        'Minden x számot osszunk el 3-mal',
        'Az x szám értéke mindig 3'
      ],
      correctAnswer: 0,
      hint: 'A 3x azt jelenti: 3 · x.',
      explanation: 'Az x ↦ 3x hozzárendelési szabály azt jelenti, hogy a bemenő x értéket meg kell szorozni 3-mal.'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Ha a szabály y = x - 7, mennyi az y értéke x = 12 esetén?',
      options: [
        '5',
        '19',
        '6',
        '4'
      ],
      correctAnswer: 0,
      hint: 'Vond ki: 12 - 7.',
      explanation: 'y = 12 - 7 = 5.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Melyik szabály tartozik a következő szöveghez: „Minden számhoz rendeld hozzá a nála 5-tel nagyobb számot!”?',
      options: [
        'y = x + 5',
        'y = 5 · x',
        'y = x - 5',
        'y = x / 5'
      ],
      correctAnswer: 0,
      hint: 'Nagyobb = hozzáadás.',
      explanation: 'A nála 5-tel nagyobb szám hozzáadást jelent: y = x + 5.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Ha a szabály y = 4 · x, mennyi az y értéke x = 0 esetén?',
      options: [
        '0',
        '4',
        '1',
        'Nem értelmezhető'
      ],
      correctAnswer: 0,
      hint: 'Bármilyen számot nullával szorozva...',
      explanation: 'y = 4 · 0 = 0.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Egy táblázatban összetartozó párok: (1; 4), (2; 5), (3; 6), (4; 7). Mi a szabály?',
      options: [
        'y = x + 3',
        'y = 4 · x',
        'y = 2x + 2',
        'y = x - 3'
      ],
      correctAnswer: 0,
      hint: 'Mennyivel nagyobb a kimenet a bemenetnél? 4 - 1 = 3, 5 - 2 = 3...',
      explanation: 'Minden esetben y pontosan 3-mal nagyobb x-nél (1+3=4, 2+3=5, 3+3=6, 4+3=7), a szabály: y = x + 3.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Melyik bemenő értékből (x) lesz y = 18 az y = 3 · x szabály alapján?',
      options: [
        'x = 6',
        'x = 15',
        'x = 21',
        'x = 9'
      ],
      correctAnswer: 0,
      hint: 'Végezd el az ellentétes műveletet: 18 : 3 = ?',
      explanation: 'Ha y = 3x = 18, akkor x = 18 : 3 = 6.'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Melyik pont tartozik az x = 5 bemenethez az y = 10 · x szabály szerint a koordináta-rendszerben?',
      options: [
        'P(5; 50)',
        'P(50; 5)',
        'P(5; 15)',
        'P(5; 5)'
      ],
      correctAnswer: 0,
      hint: 'A pont koordinátái P(x; y), y = 10 · 5.',
      explanation: 'x = 5 esetén y = 10 · 5 = 50, így a pont P(5; 50).'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mit nevezünk értéktáblázatnak?',
      options: [
        'Olyan táblázatot, amelyben a bemenő x és a szabály alapján kiszámított y értékek párban szerepelnek',
        'A szorzótábla egy másik elnevezését',
        'A geometriai alakzatok területtáblázatát',
        'Csak a páros számokat tartalmazó listát'
      ],
      correctAnswer: 0,
      hint: 'A táblázat soraiban vagy oszlopaiban x és y áll.',
      explanation: 'Az értéktáblázat a hozzárendelés összetartozó (x; y) értékeit foglalja strukturált táblázatba.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Szabálykeresés és lebontogatás)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Adott az y = 5 · x - 4 szabály. Mennyi az y értéke x = 6 esetén?',
      options: [
        '26',
        '30',
        '24',
        '34'
      ],
      correctAnswer: 0,
      hint: 'Műveleti sorrend: előbb 5 · 6, aztán kivonás.',
      explanation: 'y = 5 · 6 - 4 = 30 - 4 = 26.'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Egy táblázatban az alábbi számpárok találhatók: (1; 5), (2; 8), (3; 11), (4; 14). Mi a hozzárendelési szabály?',
      options: [
        'y = 3 · x + 2',
        'y = 5 · x',
        'y = 2 · x + 3',
        'y = 4 · x + 1'
      ],
      correctAnswer: 0,
      hint: 'A kimenet mindig 3-mal nő, ha x 1-gyel nő (szorzó: 3). Mennyi kell még az 1 · 3-hoz, hogy 5 legyen?',
      explanation: 'Mivel a lépésköz 3, a szorzó 3. Ellenőrzés: 3 · 1 + 2 = 5; 3 · 2 + 2 = 8; 3 · 3 + 2 = 11. A szabály: y = 3x + 2.'
    },
    {
      id: 'q13',
      level: 2,
      question: 'A szabály y = 2 · x + 7. Tudjuk, hogy a kimenet y = 23. Melyik bemenő x számból kaptuk ezt?',
      options: [
        'x = 8',
        'x = 10',
        'x = 7',
        'x = 15'
      ],
      correctAnswer: 0,
      hint: 'Számolj visszafelé: először vond ki a 7-et, majd oszd el 2-vel!',
      explanation: 'Visszafelé számolva (lebontogatással): 23 - 7 = 16, majd 16 : 2 = 8. Tehát x = 8. (Ellenőrzés: 2 · 8 + 7 = 23).'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Melyik számpár NEM illeszkedik az y = 4 · x - 3 szabályhoz?',
      options: [
        '(5; 18)',
        '(1; 1)',
        '(3; 9)',
        '(4; 13)'
      ],
      correctAnswer: 0,
      hint: 'Számold ki: 4 · 5 - 3 = ?',
      explanation: 'x = 5 esetén: 4 · 5 - 3 = 20 - 3 = 17, nem pedig 18. Tehát az (5; 18) nem illeszkedik.'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Egy gép a bemenő számot megszorozza 6-tal, majd kivon belőle 10-et. Ha a kimenet y = 38, mennyi volt a bemenet?',
      options: [
        'x = 8',
        'x = 7',
        'x = 6',
        'x = 9'
      ],
      correctAnswer: 0,
      hint: 'Ellentétes műveletek: 38 + 10, majd osztás 6-tal.',
      explanation: '38 + 10 = 48, majd 48 : 6 = 8. Tehát x = 8.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Az értéktáblázatban: ha x = 2 ⟹ y = 7; ha x = 4 ⟹ y = 13; ha x = 6 ⟹ y = 19. Mennyi y értéke, ha x = 10?',
      options: [
        '31',
        '29',
        '33',
        '35'
      ],
      correctAnswer: 0,
      hint: 'Keresd meg a szabályt! y = 3x + 1.',
      explanation: 'A szabály: y = 3x + 1 (hiszen 3·2+1=7, 3·4+1=13, 3·6+1=19). Így x = 10 esetén: y = 3 · 10 + 1 = 31.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Melyik szabállyal írható le a következő feladvány: „Bence életkora (y) 4 évvel kevesebb, mint bátyja korának (x) a kétszerese”?',
      options: [
        'y = 2 · x - 4',
        'y = 2 · (x - 4)',
        'y = x / 2 - 4',
        'y = 4 · x - 2'
      ],
      correctAnswer: 0,
      hint: 'A báty korának kétszerese: 2x. Ennél 4-gyel kevesebb: - 4.',
      explanation: 'A báty korának kétszerese a 2x, ennél 4 évvel kevesebb a 2x - 4. Tehát y = 2x - 4.'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Ha a szabály y = x / 3 + 4, mennyi y értéke x = 15 esetén?',
      options: [
        '9',
        '8',
        '7',
        '10'
      ],
      correctAnswer: 0,
      hint: '15 : 3 = 5, majd adj hozzá 4-et.',
      explanation: 'y = 15 / 3 + 4 = 5 + 4 = 9.'
    },
    {
      id: 'q19',
      level: 2,
      question: 'A táblázatban összetartozó párok: (2; 10), (3; 15), (5; 25), (8; 40). Milyen speciális hozzárendelés ez?',
      options: [
        'Egyenes arányosság, mert a hányados állandó (y / x = 5)',
        'Fordított arányosság',
        'Összegtartó hozzárendelés',
        'Négyzetes függvény'
      ],
      correctAnswer: 0,
      hint: '10/2 = 5, 15/3 = 5, 25/5 = 5...',
      explanation: 'Mivel a hányados minden pontban azonos (y / x = 5), az y = 5x szabály egyenes arányosságot képvisel.'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Melyik bemeneti érték esetén lesz az y = 3x + 5 és az y = 5x - 3 szabály eredménye EGYENLŐ?',
      options: [
        'x = 4',
        'x = 2',
        'x = 3',
        'x = 5'
      ],
      correctAnswer: 0,
      hint: 'Egyenlet: 3x + 5 = 5x - 3. Vagy próbáld ki a lehetőségeket!',
      explanation: 'Ha x = 4: 3 · 4 + 5 = 17, és 5 · 4 - 3 = 17. Az eredmény mindkettőnél 17, tehát x = 4 a megoldás.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett összefüggések és nyomozás)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Egy rejtélyes szabály értéktáblázata: (1; 1), (2; 4), (3; 9), (4; 16), (5; 25). Mi a szabály?',
      options: [
        'y = x · x = x² (a szám négyzete)',
        'y = 2x - 1',
        'y = 3x - 2',
        'y = x + 3'
      ],
      correctAnswer: 0,
      hint: '1·1=1, 2·2=4, 3·3=9, 4·4=16, 5·5=25...',
      explanation: 'A kimenet mindig a bemenet önmagával vett szorzata: y = x², azaz a szám négyzete.'
    },
    {
      id: 'q22',
      level: 3,
      question: 'A szabály: y = 2 · (x + 3) - 5. Egyszerűsítsd a képletet algebrailag!',
      options: [
        'y = 2x + 1',
        'y = 2x + 6',
        'y = 2x - 1',
        'y = 2x + 5'
      ],
      correctAnswer: 0,
      hint: 'Bontsd fel a zárójelet: 2 · x + 2 · 3 - 5.',
      explanation: '2 · (x + 3) - 5 = 2x + 6 - 5 = 2x + 1.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Egy szabálygép a következő műveletet végzi: „Vond ki a számból az 1-et, az eredményt szorozd meg 4-gyel, majd adj hozzá 6-ot”. Mennyi lesz az eredmény x = 7 esetén?',
      options: [
        '30',
        '28',
        '32',
        '26'
      ],
      correctAnswer: 0,
      hint: 'Lépések: 7 - 1 = 6; 6 · 4 = 24; 24 + 6 = ?',
      explanation: '1. lépés: 7 - 1 = 6. 2. lépés: 6 · 4 = 24. 3. lépés: 24 + 6 = 30.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Ha egy szabálygépbe bedobva x-et y = 46 kimenetet kapunk a következő szabállyal: y = 3 · (x + 2) + 7, mennyi volt az eredeti x?',
      options: [
        'x = 11',
        'x = 13',
        'x = 10',
        'x = 12'
      ],
      correctAnswer: 0,
      hint: 'Lebontogatás: 46 - 7 = 39; 39 : 3 = 13; 13 - 2 = ?',
      explanation: 'Visszafelé haladva: 1. Kivonjuk a 7-et: 46 - 7 = 39. 2. Osztunk 3-mal: 39 : 3 = 13. 3. Kivonjuk a 2-t: 13 - 2 = 11. Tehát x = 11. (Ellenőrzés: 3 · (11 + 2) + 7 = 3 · 13 + 7 = 39 + 7 = 46).'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy gyufa-alakzat sorozatban: az 1. ábrához 4 szál gyufa kell, a 2. ábrához 7 szál, a 3. ábrához 10 szál, a 4. ábrához 13 szál. Hány szál gyufa kell az n-edik ábrához?',
      options: [
        'y = 3 · n + 1',
        'y = 4 · n',
        'y = 3 · n + 4',
        'y = 2 · n + 2'
      ],
      correctAnswer: 0,
      hint: 'Minden lépésben 3 új gyufaszál jön hozzá, és az 1. ábránál 3 · 1 + 1 = 4.',
      explanation: 'A számsorozat 3-asával nő (a szorzó 3). n = 1 esetén 3 · 1 + 1 = 4; n = 2 esetén 3 · 2 + 1 = 7. A szabály: y = 3n + 1.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Az előző gyufás feladat alapján (y = 3n + 1): hányadik ábra készíthető el pontosan 61 szál gyufából?',
      options: [
        'A 20. ábra',
        'A 19. ábra',
        'A 21. ábra',
        'A 18. ábra'
      ],
      correctAnswer: 0,
      hint: 'Oldd meg a 3n + 1 = 61 egyenletet!',
      explanation: '3n + 1 = 61 ⟹ 3n = 60 ⟹ n = 20. Tehát a 20. ábrához kell 61 szál gyufa.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Egy számpár táblázatban: (0; 2), (1; 3), (2; 6), (3; 11), (4; 18). Melyik szabály illeszkedik minden pontra?',
      options: [
        'y = x² + 2',
        'y = 2x + 2',
        'y = x² + 1',
        'y = 3x - 1'
      ],
      correctAnswer: 0,
      hint: 'Nézd meg a négyzeteket: 0²=0 (+2=2), 1²=1 (+2=3), 2²=4 (+2=6), 3²=9 (+2=11)...',
      explanation: 'A kimenet mindig x négyzete növelve 2-vel: 0²+2=2, 1²+2=3, 2²+2=6, 3²+2=11, 4²+2=18. A szabály: y = x² + 2.'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Két szabálygép van egymás után kapcsolva: az 1. gép szabálya a = 2x + 1, a 2. gép az „a” kimenetet veszi bemenetnek, és a szabálya y = 3a - 4. Mennyi a végső y kimenet, ha x = 3-at dobunk be az 1. gépbe?',
      options: [
        'y = 17',
        'y = 15',
        'y = 21',
        'y = 19'
      ],
      correctAnswer: 0,
      hint: '1. gép: a = 2 · 3 + 1 = 7. 2. gép: y = 3 · 7 - 4 = ?',
      explanation: '1. gép: a = 2 · 3 + 1 = 7. Ezt kapja a 2. gép: y = 3 · 7 - 4 = 21 - 4 = 17.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Ha a hozzárendelés alaphalmaza a pozitív egész számok, melyik szabály esetén kapunk MINDIG páratlan számot kimenetként?',
      options: [
        'y = 2 · x + 1',
        'y = 2 · x',
        'y = x + 1',
        'y = 3 · x'
      ],
      correctAnswer: 0,
      hint: '2x mindig páros szám. Mi történik, ha egy páros számhoz 1-et adunk?',
      explanation: 'Mivel 2 · x minden egész x esetén biztosan páros, ehhez 1-et adva (2x + 1) az eredmény garantáltan páratlan szám lesz.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy parkolóházban az első óra 600 Ft, utána minden megkezdett óra 400 Ft. Hogyan írható fel a fizetendő összeg (y) az x órák számának függvényében, ha x ≥ 1 egész szám?',
      options: [
        'y = 600 + 400 · (x - 1) = 400x + 200',
        'y = 600 · x + 400',
        'y = 400 · x',
        'y = 600 + 400x'
      ],
      correctAnswer: 0,
      hint: 'Az első órára 600 Ft, a maradék (x - 1) órára 400 Ft óránként.',
      explanation: 'Az első óra 600 Ft, a további (x - 1) óra ára 400 · (x - 1). Összesen: y = 600 + 400x - 400 = 400x + 200 Ft.'
    }
  ];

  return (
    <QuizTemplate
      title="Szabályok, megfeleltetések kvíz"
      subtitle="Gyakorold a szabályok felismerését, értéktáblázatok kitöltését és az egyenleteket 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="emerald"
      category="Szabályok"
      topicTitle="Szabályok és megfeleltetések"
      questions={questions}
      matcherComponent={RulesAndRelationsMatcher}
      sorterComponent={RulesAndRelationsSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default RulesAndRelationsQuiz;
