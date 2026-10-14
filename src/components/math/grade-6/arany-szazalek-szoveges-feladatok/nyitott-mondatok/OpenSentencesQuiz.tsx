import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { OpenSentencesMatcher } from './OpenSentencesMatcher';
import { OpenSentencesSorter } from './OpenSentencesSorter';

interface OpenSentencesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const OpenSentencesQuiz: React.FC<OpenSentencesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Egylépéses egyenletek és fogalmak)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Oldd meg az egylépéses egyenletet: x + 9 = 25. Mennyi az x értéke?',
      options: [
        'x = 16',
        'x = 34',
        'x = 14',
        'x = 18'
      ],
      correctAnswer: 0,
      hint: 'Mindkét oldalból vonj ki 9-et: 25 - 9 = ?',
      explanation: 'A mérlegelv szerint mindkét oldalból kivonunk 9-et: x = 25 - 9 = 16. Ellenőrzés: 16 + 9 = 25.'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mit kell tennünk az egyenlet mindkét oldalával az x - 12 = 30 egyenlet megoldásához?',
      options: [
        'Hozzáadunk 12-t mindkét oldalhoz',
        'Kivonunk 12-t mindkét oldalból',
        'Elosztjuk 12-vel mindkét oldalt',
        'Megszorozzuk 12-vel mindkét oldalt'
      ],
      correctAnswer: 0,
      hint: 'A kivonás ellentétes művelete az összeadás.',
      explanation: 'Hogy az ismeretlen (x) egyedül maradjon a bal oldalon, a kivont 12 ellentétét, azaz +12-t kell alkalmazni mindkét oldalra.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Oldd meg az egyenletet: 4x = 36. Mennyi az x értéke?',
      options: [
        'x = 9',
        'x = 32',
        'x = 8',
        'x = 144'
      ],
      correctAnswer: 0,
      hint: 'Mindkét oldalt oszd el 4-gyel: 36 : 4 = ?',
      explanation: 'Mindkét oldalt elosztjuk 4-gyel: x = 36 : 4 = 9. Ellenőrzés: 4 · 9 = 36.'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Oldd meg az egyenletet: x / 5 = 8. Mennyi az x értéke?',
      options: [
        'x = 40',
        'x = 13',
        'x = 3',
        'x = 1,6'
      ],
      correctAnswer: 0,
      hint: 'Az osztás ellentéte a szorzás: szorozz be 5-tel!',
      explanation: 'Mindkét oldalt megszorozzuk 5-tel: x = 8 · 5 = 40. Ellenőrzés: 40 : 5 = 8.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Melyik matematikai kifejezés felel meg a következő szövegnek: „Egy szám háromszorosánál 7-tel több”?',
      options: [
        '3x + 7',
        '3 · (x + 7)',
        'x / 3 + 7',
        '7x + 3'
      ],
      correctAnswer: 0,
      hint: 'Egy szám háromszorosa: 3x. Ennél 7-tel több: + 7.',
      explanation: 'A szám háromszorosa a 3x, ennél 7-tel több pedig a 3x + 7.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Mi a neve annak a matematikai állításnak, amelyben ismeretlen változó szerepel, és igazságtartalma a behelyettesített számtól függ?',
      options: [
        'Nyitott mondat',
        'Azonosság',
        'Bizonyítás',
        'Alaphalmaz'
      ],
      correctAnswer: 0,
      hint: 'Mivel még nem zárt a mondat értéke, nyitottnak nevezzük.',
      explanation: 'A változót tartalmazó állításokat, amelyek értéke behelyettesítéskor válik igazzá vagy hamissá, nyitott mondatnak nevezzük.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Melyik szám teszi igazzá a 35 - x = 18 egyenletet?',
      options: [
        'x = 17',
        'x = 53',
        'x = 27',
        'x = 13'
      ],
      correctAnswer: 0,
      hint: '35-ből mennyit kell elvenni, hogy 18 maradjon? 35 - 18 = ?',
      explanation: 'x = 35 - 18 = 17. Ellenőrzés: 35 - 17 = 18.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Mely természetes számok (0, 1, 2, ...) teszik igazzá az x < 4 nyitott mondatot?',
      options: [
        '0, 1, 2, 3',
        '1, 2, 3, 4',
        '0, 1, 2, 3, 4',
        '4, 5, 6, ...'
      ],
      correctAnswer: 0,
      hint: 'Szigorú egyenlőtlenség (<), tehát a 4 maga nem tartozik bele!',
      explanation: 'Mivel x szigorúan kisebb 4-nél, a természetes számok közül a 0, 1, 2 és 3 tartoznak a megoldáshalmazba.'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mit mond ki a mérlegelv az egyenlet rendezésekor?',
      options: [
        'Amit az egyenlet bal oldalával teszünk, pontosan ugyanazt kell tennünk a jobb oldalával is',
        'Mindig csak a bal oldalt szabad módosítani',
        'Az egyenletet mindig meg kell szorozni kettővel',
        'A pozitív számokat mindig át kell alakítani negatívvá'
      ],
      correctAnswer: 0,
      hint: 'A kétkarú mérleg egyensúlyának megőrzése a lényeg.',
      explanation: 'A kétkarú mérleg modellje alapján az egyensúly csak akkor marad fenn, ha mindkét oldalon pontosan ugyanazt a műveletet hajtjuk végre.'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Oldd meg: x + 15 = 15. Mennyi az x értéke?',
      options: [
        'x = 0',
        'x = 30',
        'x = 1',
        'Nincs megoldása'
      ],
      correctAnswer: 0,
      hint: 'Vonj ki 15-öt mindkét oldalból: 15 - 15 = ?',
      explanation: 'x = 15 - 15 = 0. A 0 teljesen érvényes megoldása az egyenletnek.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Kétlépéses egyenletek lebontogatással)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Oldd meg a kétlépéses egyenletet: 2x + 7 = 23. Mennyi az x értéke?',
      options: [
        'x = 8',
        'x = 15',
        'x = 16',
        'x = 6'
      ],
      correctAnswer: 0,
      hint: '1. lépés: vonj ki 7-et (2x = 16). 2. lépés: ossz 2-vel.',
      explanation: '2x + 7 = 23 ⟹ 2x = 23 - 7 = 16 ⟹ x = 16 : 2 = 8. Ellenőrzés: 2 · 8 + 7 = 16 + 7 = 23.'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Oldd meg az egyenletet: 3x - 8 = 16. Mennyi az x értéke?',
      options: [
        'x = 8',
        'x = 6',
        'x = 12',
        'x = 24'
      ],
      correctAnswer: 0,
      hint: '1. lépés: adj hozzá 8-at (3x = 24). 2. lépés: ossz 3-mal.',
      explanation: '3x - 8 = 16 ⟹ 3x = 16 + 8 = 24 ⟹ x = 24 : 3 = 8. Ellenőrzés: 3 · 8 - 8 = 24 - 8 = 16.'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Oldd meg az egyenletet: 5x + 12 = 47. Mennyi az x értéke?',
      options: [
        'x = 7',
        'x = 9',
        'x = 8',
        'x = 6'
      ],
      correctAnswer: 0,
      hint: '47 - 12 = 35. 35 : 5 = ?',
      explanation: '5x = 47 - 12 = 35 ⟹ x = 35 : 5 = 7. Ellenőrzés: 5 · 7 + 12 = 35 + 12 = 47.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Gondoltam egy számra, megszoroztam 4-gyel, majd hozzáadtam 5-öt, és 29-et kaptam. Melyik számra gondoltam?',
      options: [
        '6',
        '7',
        '8',
        '5'
      ],
      correctAnswer: 0,
      hint: 'Egyenlet: 4x + 5 = 29. Vonj ki 5-öt, majd ossz 4-gyel!',
      explanation: 'Egyenlet: 4x + 5 = 29 ⟹ 4x = 24 ⟹ x = 6. A gondolt szám a 6.'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Oldd meg az egyenletet: (x + 6) / 4 = 5. Mennyi az x értéke?',
      options: [
        'x = 14',
        'x = 20',
        'x = 26',
        'x = 11'
      ],
      correctAnswer: 0,
      hint: 'Először szorozz be 4-gyel: x + 6 = 20. Utána vonj ki 6-ot!',
      explanation: '(x + 6) / 4 = 5 ⟹ x + 6 = 20 ⟹ x = 20 - 6 = 14. Ellenőrzés: (14 + 6) / 4 = 20 / 4 = 5.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Oldd meg: 30 - 3x = 12. Mennyi az x értéke?',
      options: [
        'x = 6',
        'x = 14',
        'x = 8',
        'x = 4'
      ],
      correctAnswer: 0,
      hint: '30-ból mennyit vonunk ki, hogy 12 legyen? 3x = 18.',
      explanation: '30 - 3x = 12 ⟹ 3x = 30 - 12 = 18 ⟹ x = 18 : 3 = 6. Ellenőrzés: 30 - 3 · 6 = 30 - 18 = 12.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Oldd meg az egyenlőtlenséget a természetes számok (0, 1, 2, ...) halmazán: 2x + 3 ≤ 11. Hány darab megoldása van?',
      options: [
        '5 darab (0, 1, 2, 3, 4)',
        '4 darab (1, 2, 3, 4)',
        '6 darab (0, 1, 2, 3, 4, 5)',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: '2x ≤ 8 ⟹ x ≤ 4. A 0 is természetes szám!',
      explanation: '2x + 3 ≤ 11 ⟹ 2x ≤ 8 ⟹ x ≤ 4. A természetes számok halmazán a megoldások: 0, 1, 2, 3, 4, ez összesen 5 darab szám.'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Melyik szám teszi igazzá a 6x - 15 = 21 egyenletet?',
      options: [
        'x = 6',
        'x = 5',
        'x = 7',
        'x = 8'
      ],
      correctAnswer: 0,
      hint: '6x = 21 + 15 = 36.',
      explanation: '6x = 36 ⟹ x = 36 : 6 = 6. Ellenőrzés: 6 · 6 - 15 = 36 - 15 = 21.'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Két egymást követő egész szám összege 45. Melyik a kisebbik szám?',
      options: [
        '22',
        '23',
        '21',
        '20'
      ],
      correctAnswer: 0,
      hint: 'Egyenlet: x + (x + 1) = 45 ⟹ 2x + 1 = 45.',
      explanation: '2x + 1 = 45 ⟹ 2x = 44 ⟹ x = 22. A két szám a 22 és a 23. A kisebbik a 22.'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Egy téglalap kerülete 36 cm. A hossza kétszerese a szélességének. Hány cm a szélessége (b)?',
      options: [
        '6 cm',
        '12 cm',
        '8 cm',
        '9 cm'
      ],
      correctAnswer: 0,
      hint: 'Kerület = 2 · (a + b) = 2 · (2b + b) = 6b = 36.',
      explanation: 'A kerület képlete: 2 · (hossz + szélesség) = 2 · (2b + b) = 6b. 6b = 36 ⟹ b = 6 cm (a hossza 12 cm).'
    },

    // ==========================================
    // 3. SZINT: MESTER (Mindkét oldalon ismeretlen, zárójelek)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Oldd meg az egyenletet, ahol mindkét oldalon szerepel ismeretlen: 5x + 4 = 2x + 19. Mennyi az x?',
      options: [
        'x = 5',
        'x = 6',
        'x = 7',
        'x = 4'
      ],
      correctAnswer: 0,
      hint: 'Vonj ki 2x-et mindkét oldalból: 3x + 4 = 19. Ezután vonj ki 4-et!',
      explanation: '5x + 4 = 2x + 19 ⟹ 3x + 4 = 19 ⟹ 3x = 15 ⟹ x = 5. Ellenőrzés: 5·5 + 4 = 29, és 2·5 + 19 = 29.'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Oldd meg a zárójeles egyenletet: 3 · (x + 4) = 27. Mennyi az x értéke?',
      options: [
        'x = 5',
        'x = 9',
        'x = 7',
        'x = 6'
      ],
      correctAnswer: 0,
      hint: 'Oszd el mindkét oldalt 3-mal: x + 4 = 9. Mennyi az x?',
      explanation: 'Mindkét oldalt elosztjuk 3-mal: x + 4 = 9 ⟹ x = 9 - 4 = 5. Ellenőrzés: 3 · (5 + 4) = 3 · 9 = 27.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Oldd meg az egyenletet: 4 · (2x - 3) = 28. Mennyi az x értéke?',
      options: [
        'x = 5',
        'x = 4',
        'x = 6',
        'x = 7'
      ],
      correctAnswer: 0,
      hint: 'Oszd el 4-gyel: 2x - 3 = 7. Adj hozzá 3-at: 2x = 10.',
      explanation: '2x - 3 = 28 : 4 = 7 ⟹ 2x = 10 ⟹ x = 5. Ellenőrzés: 4 · (2·5 - 3) = 4 · 7 = 28.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Oldd meg az egyenletet: 7x - 15 = 3x + 9. Mennyi az x értéke?',
      options: [
        'x = 6',
        'x = 8',
        'x = 4',
        'x = 5'
      ],
      correctAnswer: 0,
      hint: 'Vonj ki 3x-et: 4x - 15 = 9. Adj hozzá 15-öt: 4x = 24.',
      explanation: '7x - 3x = 9 + 15 ⟹ 4x = 24 ⟹ x = 6. Ellenőrzés: 7·6 - 15 = 27 és 3·6 + 9 = 27.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy apa most 38 éves, a fia pedig 10 éves. Hány év múlva lesz az apa pontosan háromszor annyi idős, mint a fia?',
      options: [
        '4 év múlva',
        '5 év múlva',
        '6 év múlva',
        '3 év múlva'
      ],
      correctAnswer: 0,
      hint: 'x év múlva az apa 38 + x, a fia 10 + x éves. Egyenlet: 38 + x = 3 · (10 + x).',
      explanation: '38 + x = 30 + 3x ⟹ 8 = 2x ⟹ x = 4. 4 év múlva az apa 42, a fia 14 éves lesz, és 42 : 14 = 3.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Oldd meg az egyenletet: x / 2 + x / 4 = 18. Mennyi az x értéke?',
      options: [
        'x = 24',
        'x = 36',
        'x = 18',
        'x = 12'
      ],
      correctAnswer: 0,
      hint: 'Szorozz be a közös nevezővel (4-gyel): 2x + x = 72.',
      explanation: 'Mindkét oldalt megszorozzuk 4-gyel: 2x + x = 72 ⟹ 3x = 72 ⟹ x = 24. Ellenőrzés: 24/2 + 24/4 = 12 + 6 = 18.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Hány megoldása van a 2x + 6 = 2 · (x + 3) egyenletnek a valós számok halmazán?',
      options: [
        'Végtelen sok (minden szám megoldás)',
        'Pontosan 1 megoldása van',
        'Nincs megoldása',
        'Csak az x = 0'
      ],
      correctAnswer: 0,
      hint: 'Bontsd fel a zárójelet a jobb oldalon: 2 · (x + 3) = 2x + 6.',
      explanation: 'A jobb oldalon zárójelfelbontás után 2x + 6-ot kapunk. Mivel a bal és a jobb oldal minden x értékre azonos (azonosság), minden valós szám megoldás (végtelen sok).'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Hány megoldása van a 3x + 5 = 3x + 10 egyenletnek?',
      options: [
        'Egyetlen megoldása sincs (ellentmondás: 5 = 10)',
        'Végtelen sok megoldása van',
        'x = 5 a megoldás',
        'x = 0 a megoldás'
      ],
      correctAnswer: 0,
      hint: 'Vonj ki 3x-et mindkét oldalból: 5 = 10 marad!',
      explanation: 'Ha mindkét oldalból kivonunk 3x-et, azt kapjuk, hogy 5 = 10, ami lehetetlen. Ezért az egyenletnek nincs megoldása.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Oldd meg az egyenletet: 5 · (x - 2) - 2x = 11. Mennyi az x értéke?',
      options: [
        'x = 7',
        'x = 8',
        'x = 5',
        'x = 6'
      ],
      correctAnswer: 0,
      hint: 'Bontsd fel a zárójelet: 5x - 10 - 2x = 11 ⟹ 3x - 10 = 11.',
      explanation: '5x - 10 - 2x = 11 ⟹ 3x - 10 = 11 ⟹ 3x = 21 ⟹ x = 7. Ellenőrzés: 5·(7-2) - 2·7 = 25 - 14 = 11.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy kiránduláson a fiúk száma 6-tal több a lányok számának kétszeresénél. Összesen 36-an vettek részt a túrán. Hány lány volt a kiránduláson?',
      options: [
        '10 lány',
        '12 lány',
        '8 lány',
        '14 lány'
      ],
      correctAnswer: 0,
      hint: 'Lányok száma = x, fiúk száma = 2x + 6. Összesen: x + (2x + 6) = 36.',
      explanation: 'x + 2x + 6 = 36 ⟹ 3x + 6 = 36 ⟹ 3x = 30 ⟹ x = 10 lány (és 2·10 + 6 = 26 fiú). 10 + 26 = 36.'
    }
  ];

  return (
    <QuizTemplate
      title="Nyitott mondatok és egyenletek kvíz"
      subtitle="Tedd próbára a tudásodat a mérlegelv, lebontogatás és egyenletek terén 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="violet"
      category="Egyenletek"
      topicTitle="Nyitott mondatok, egyenletek"
      questions={questions}
      matcherComponent={OpenSentencesMatcher}
      sorterComponent={OpenSentencesSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default OpenSentencesQuiz;
