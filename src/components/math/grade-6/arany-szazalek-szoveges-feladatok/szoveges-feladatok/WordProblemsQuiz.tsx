import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { WordProblemsMatcher } from './WordProblemsMatcher';
import { WordProblemsSorter } from './WordProblemsSorter';

interface WordProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const WordProblemsQuiz: React.FC<WordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Egyszerű szöveges feladatok és számkeresés)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Két szám összege 36. Az egyik szám 6-tal nagyobb a másiknál. Melyik a kisebbik szám?',
      options: [
        '15',
        '21',
        '18',
        '12'
      ],
      correctAnswer: 0,
      hint: 'Legyen a kisebbik szám x. Ekkor x + (x + 6) = 36. 2x = 30.',
      explanation: 'Egyenlet: x + (x + 6) = 36 ⟹ 2x = 30 ⟹ x = 15. A két szám a 15 és a 21. A kisebbik a 15.'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Egy szám négyszereséhez hozzáadunk 8-at, így 40-et kapunk. Melyik ez a szám?',
      options: [
        '8',
        '7',
        '9',
        '12'
      ],
      correctAnswer: 0,
      hint: 'Egyenlet: 4x + 8 = 40. Vonj ki 8-at, majd ossz 4-gyel!',
      explanation: '4x + 8 = 40 ⟹ 4x = 32 ⟹ x = 8. Ellenőrzés: 4 · 8 + 8 = 32 + 8 = 40.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Anna és Béla együtt 25 könyvet olvastak el a nyáron. Anna 5-tel több könyvet olvasott, mint Béla. Hány könyvet olvasott Béla?',
      options: [
        '10 könyvet',
        '15 könyvet',
        '12 könyvet',
        '8 könyvet'
      ],
      correctAnswer: 0,
      hint: 'Béla könyvei = x, Anna könyvei = x + 5. x + (x + 5) = 25.',
      explanation: '2x + 5 = 25 ⟹ 2x = 20 ⟹ x = 10 könyvet olvasott Béla (Anna pedig 15-öt).'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Egy téglalap szélessége 6 cm, a hosszúsága pedig háromszor akkora, mint a szélessége. Mekkora a téglalap kerülete?',
      options: [
        '48 cm',
        '24 cm',
        '36 cm',
        '108 cm'
      ],
      correctAnswer: 0,
      hint: 'Hosszúság = 3 · 6 = 18 cm. Kerület = 2 · (6 + 18).',
      explanation: 'A hosszúság: 3 · 6 = 18 cm. A kerület: K = 2 · (6 + 18) = 2 · 24 = 48 cm.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Gondoltam egy számra. Levontam belőle 15-öt, az eredményt elosztottam 3-mal, és 7-et kaptam. Melyik számra gondoltam?',
      options: [
        '36',
        '26',
        '42',
        '32'
      ],
      correctAnswer: 0,
      hint: 'Számolj visszafelé: 7 · 3 = 21, majd 21 + 15 = ?',
      explanation: '(x - 15) / 3 = 7 ⟹ x - 15 = 21 ⟹ x = 36. Ellenőrzés: (36 - 15) / 3 = 21 / 3 = 7.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Egy csomag füzet és egy toll összesen 1200 Ft-ba került. A füzet 400 Ft-tal drágább volt a tollnál. Mennyibe került a toll?',
      options: [
        '400 Ft-ba',
        '800 Ft-ba',
        '500 Ft-ba',
        '300 Ft-ba'
      ],
      correctAnswer: 0,
      hint: 'Toll = x, füzet = x + 400. x + (x + 400) = 1200.',
      explanation: '2x + 400 = 1200 ⟹ 2x = 800 ⟹ x = 400 Ft. A toll 400 Ft, a füzet 800 Ft.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mi a legelső kötelező lépés minden szöveges feladat megoldásakor?',
      options: [
        'A feladat figyelmes elolvasása és az adatok pontos kigyűjtése',
        'Azonnal felírni a végeredményt fejben',
        'Készíteni egy oszlopdiagramot',
        'Összeszorozni az összes szövegben szereplő számot'
      ],
      correctAnswer: 0,
      hint: 'A szöveg pontos értelmezése nélkül nem lehet helyes modellt felállítani.',
      explanation: 'A feladat sikeres megoldásának alapja a gondos szövegértés és az adatok, ismeretlenek pontos kigyűjtése.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Egy osztály 28 tanulójából a lányok száma 2-vel több, mint a fiúk száma. Hány fiú jár az osztályba?',
      options: [
        '13 fiú',
        '15 fiú',
        '14 fiú',
        '12 fiú'
      ],
      correctAnswer: 0,
      hint: 'Fiúk = x, lányok = x + 2. x + x + 2 = 28.',
      explanation: '2x + 2 = 28 ⟹ 2x = 26 ⟹ x = 13 fiú (és 15 lány).'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Egy szám egyötöde 14. Mennyi az eredeti szám fele?',
      options: [
        '35',
        '70',
        '28',
        '14'
      ],
      correctAnswer: 0,
      hint: 'Ha az egyötöde 14, akkor az egész szám 14 · 5 = 70. Ennek a fele?',
      explanation: 'x / 5 = 14 ⟹ x = 70. A szám fele: 70 : 2 = 35.'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Miért nem elegendő az ellenőrzést csak a felírt egyenletbe való behelyettesítéssel elvégezni?',
      options: [
        'Mert ha az egyenletet rosszul írtuk fel, az egyenletbe helyettesítés nem mutatja ki a hibát',
        'Mert a tanárok nem fogadják el az egyenleteket',
        'Mert az egyenlet mindig hamis eredményt ad',
        'Mert a negatív számokat nem lehet ellenőrizni'
      ],
      correctAnswer: 0,
      hint: 'Mindig az eredeti magyar szöveg feltételeit kell újra átvizsgálni.',
      explanation: 'Ha az egyenlet hibásan tükrözi a szöveget, akkor a hibás egyenletbe helyettesítve kijöhet az egyenlőség, holott a feladat szövegének nem felel meg a válasz.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Összetettebb modellek, életkorok, kerületek)
    // ==========================================
    {
      id: 'q11',
      level: 2,
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
      id: 'q12',
      level: 2,
      question: 'Egy téglalap kerülete 54 cm. A hossza 7 cm-rel hosszabb a szélességénél. Mekkora a téglalap szélessége?',
      options: [
        '10 cm',
        '17 cm',
        '12 cm',
        '8 cm'
      ],
      correctAnswer: 0,
      hint: 'K = 2 · (x + x + 7) = 54 ⟹ 2 · (2x + 7) = 54 ⟹ 4x + 14 = 54.',
      explanation: '4x + 14 = 54 ⟹ 4x = 40 ⟹ x = 10 cm (szélesség). A hossza 17 cm. Ellenőrzés: 2 · (10 + 17) = 54 cm.'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Két egymást követő páros szám összege 70. Melyik a nagyobbik szám?',
      options: [
        '36',
        '34',
        '38',
        '32'
      ],
      correctAnswer: 0,
      hint: 'Két egymást követő páros szám: x és x + 2. x + x + 2 = 70.',
      explanation: '2x + 2 = 70 ⟹ 2x = 68 ⟹ x = 34. A két szám a 34 és a 36. A nagyobbik a 36.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Bence elköltötte a zsebpénze felét mozira, majd a maradékból még vett 600 Ft-ért popcornt, így 900 Ft-ja maradt. Mennyi zsebpénze volt eredetileg?',
      options: [
        '3000 Ft',
        '2500 Ft',
        '3600 Ft',
        '1500 Ft'
      ],
      correctAnswer: 0,
      hint: 'A mozi után maradt: 600 + 900 = 1500 Ft. Ez a zsebpénz fele!',
      explanation: 'A megmaradt 1500 Ft a teljes összeg fele volt, így az eredeti zsebpénz 2 · 1500 = 3000 Ft.'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Egy egyenlő szárú háromszög kerülete 32 cm. Az alapja 4 cm-rel rövidebb a száránál. Milyen hosszú a háromszög szára?',
      options: [
        '12 cm',
        '8 cm',
        '10 cm',
        '14 cm'
      ],
      correctAnswer: 0,
      hint: 'Szárak = a, alap = a - 4. Kerület: a + a + (a - 4) = 32.',
      explanation: '3a - 4 = 32 ⟹ 3a = 36 ⟹ a = 12 cm a szár (az alap pedig 8 cm). 12 + 12 + 8 = 32 cm.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Három testvér életkorának összege 39 év. A középső 3 évvel idősebb a legkisebbnél, a legidősebb pedig 3 évvel idősebb a középsőnél. Hány éves a középső testvér?',
      options: [
        '13 éves',
        '10 éves',
        '16 éves',
        '12 éves'
      ],
      correctAnswer: 0,
      hint: 'Legyen a középső x éves. Ekkor a legkisebb x - 3, a legidősebb x + 3. Összegük: (x - 3) + x + (x + 3) = 39.',
      explanation: '3x = 39 ⟹ x = 13 éves a középső testvér (a kicsi 10, a nagy 16 éves). 10 + 13 + 16 = 39.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Egy gazda tyúkokat és nyulakat tart az udvarán. Összesen 20 fejet és 56 lábat számolt meg. Hány nyúl van az udvaron?',
      options: [
        '8 nyúl',
        '12 nyúl',
        '10 nyúl',
        '6 nyúl'
      ],
      correctAnswer: 0,
      hint: 'Ha nyulak = x, akkor tyúkok = 20 - x. Lábak: 4x + 2 · (20 - x) = 56.',
      explanation: '4x + 40 - 2x = 56 ⟹ 2x = 16 ⟹ x = 8 nyúl (és 12 tyúk). Ellenőrzés: 8·4 + 12·2 = 32 + 24 = 56 láb.'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Dóri kétszer annyi matricát gyűjtött, mint Lili, Zsófi pedig 10-zel többet, mint Dóri. Hármuknak összesen 85 matricájuk van. Hány matricája van Lilinek?',
      options: [
        '15 matricája',
        '30 matricája',
        '40 matricája',
        '20 matricája'
      ],
      correctAnswer: 0,
      hint: 'Lili = x, Dóri = 2x, Zsófi = 2x + 10. Összeg: x + 2x + 2x + 10 = 85.',
      explanation: '5x + 10 = 85 ⟹ 5x = 75 ⟹ x = 15 matricája van Lilinek (Dórinak 30, Zsófinak 40). 15 + 30 + 40 = 85.'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Egy kétjegyű szám számjegyeinek összege 11. Ha felcseréljük a számjegyeket, az új szám 45-tel lesz kisebb az eredetinél. Melyik az eredeti szám?',
      options: [
        '83',
        '74',
        '92',
        '65'
      ],
      correctAnswer: 0,
      hint: 'Próbáld ki a lehetőségeket vagy írd fel: 8 + 3 = 11, felcserélve 38, 83 - 38 = 45!',
      explanation: 'A számjegyek összege: 8 + 3 = 11. Felcserélve a számjegyeket 38-at kapunk: 83 - 38 = 45. Az eredeti szám a 83.'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Egy iskolai túrán 42 gyerek vett részt. A fiúk száma a lányok számának háromnegyede volt. Hány lány vett részt a túrán?',
      options: [
        '24 lány',
        '18 lány',
        '21 lány',
        '28 lány'
      ],
      correctAnswer: 0,
      hint: 'Lányok = 4 rész, fiúk = 3 rész. Összesen 7 rész = 42 gyerek.',
      explanation: '42 : 7 = 6 fő egy rész. A lányok száma 4 rész: 4 · 6 = 24 lány (a fiúk 3 · 6 = 18 fő).'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett feladatok, törtrészek maradékból)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Egy túrázó az út 2/5-ét tette meg az első napon, a második napon a maradék út felét, a harmadik napra pedig még 15 km maradt. Milyen hosszú volt a teljes túraútvonal?',
      options: [
        '50 km',
        '45 km',
        '60 km',
        '40 km'
      ],
      correctAnswer: 0,
      hint: '1. nap után maradt 3/5 rész. Ennek a fele 3/10 rész. A harmadik napra is 3/10 rész maradt = 15 km.',
      explanation: 'Ha 3/10 rész = 15 km, akkor 1/10 rész = 5 km, így az egész túra (10/10) = 50 km. Ellenőrzés: 1. nap: 20 km (marad 30 km). 2. nap: 15 km. 3. nap: 15 km. Összesen: 50 km.'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Egy anya most négyszer annyi idős, mint a fia. 6 évvel ezelőtt az anya hétszer annyi idős volt, mint a fia. Hány éves most a fiú?',
      options: [
        '12 éves',
        '10 éves',
        '14 éves',
        '8 éves'
      ],
      correctAnswer: 0,
      hint: 'Most: fia = x, anya = 4x. 6 éve: fia = x - 6, anya = 4x - 6. Egyenlet: 4x - 6 = 7 · (x - 6).',
      explanation: '4x - 6 = 7x - 42 ⟹ 36 = 3x ⟹ x = 12 éves a fiú (az anya 48). 6 éve a fiú 6, az anya 42 éves volt, és 42 : 6 = 7.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Egy könyvespolcon kétszer annyi regény van, mint mesekönyv. Ha átteszünk 6 regényt a másik polcra, és helyettük felteszünk 4 mesekönyvet, akkor a két műfaj száma egyenlő lesz. Hány mesekönyv volt eredetileg a polcon?',
      options: [
        '10 mesekönyv',
        '12 mesekönyv',
        '8 mesekönyv',
        '14 mesekönyv'
      ],
      correctAnswer: 0,
      hint: 'Mesekönyv = x, regény = 2x. Egyenlet: 2x - 6 = x + 4.',
      explanation: '2x - 6 = x + 4 ⟹ x = 10 mesekönyv volt eredetileg (és 20 regény). Változás után: 20 - 6 = 14 regény és 10 + 4 = 14 mesekönyv.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Egy kávézóban a felnőtt belépő 1500 Ft, a diákbelépő 900 Ft. Egy nap alatt összesen 80 belépőt adtak el 96 000 Ft értékben. Hány felnőtt belépőt vásároltak?',
      options: [
        '40 felnőtt belépőt',
        '35 felnőtt belépőt',
        '45 felnőtt belépőt',
        '50 felnőtt belépőt'
      ],
      correctAnswer: 0,
      hint: 'Felnőtt = x, diák = 80 - x. 1500x + 900 · (80 - x) = 96 000.',
      explanation: '1500x + 72000 - 900x = 96000 ⟹ 600x = 24000 ⟹ x = 40 felnőtt jegy (és 40 diákjegy). Ellenőrzés: 40·1500 + 40·900 = 60000 + 36000 = 96000 Ft.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy autó 60 km/h sebességgel halad. 30 perccel utána elindul egy motoros ugyanazon az úton 90 km/h sebességgel. Hány óra múlva éri utol a motoros az autót?',
      options: [
        '1 óra múlva',
        '1,5 óra múlva',
        '45 perc múlva',
        '2 óra múlva'
      ],
      correctAnswer: 0,
      hint: '30 perc = 0,5 óra alatt az autó megtett 60 · 0,5 = 30 km előnyt. A motoros sebességkülönbsége: 90 - 60 = 30 km/h.',
      explanation: 'A motoros óránként 90 - 60 = 30 km-t hoz be. Mivel az autó előnye 30 km, a motoros 30 : 30 = 1 óra múlva éri utol.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Két munkás együtt 6 óra alatt festene ki egy termet. Az egyik munkás egyedül 10 óra alatt végezne. Hány óra alatt festené ki a termet a másik munkás egyedül?',
      options: [
        '15 óra alatt',
        '12 óra alatt',
        '14 óra alatt',
        '18 óra alatt'
      ],
      correctAnswer: 0,
      hint: '1 óra alatt együtt a munka 1/6-át végzik el. Az első 1 óra alatt 1/10-et végez. A második: 1/6 - 1/10 = ?',
      explanation: '1/6 - 1/10 = 5/30 - 3/30 = 2/30 = 1/15 rész óránként. Vagyis a második munkás egyedül 15 óra alatt végezne.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Egy téglalap alakú kert hossza 5 méterrel több a szélességénél. Ha mindkét oldalt 2 méterrel megnöveljük, a kerülete 60 méter lesz. Mekkora volt az eredeti szélesség?',
      options: [
        '10,5 méter',
        '11 méter',
        '9,5 méter',
        '12 méter'
      ],
      correctAnswer: 0,
      hint: 'Új kerület: 2 · (x + 2 + x + 5 + 2) = 60 ⟹ 2 · (2x + 9) = 60.',
      explanation: '4x + 18 = 60 ⟹ 4x = 42 ⟹ x = 10,5 méter volt az eredeti szélesség (és 15,5 m a hossz). Új oldalak: 12,5 m és 17,5 m, kerület: 2 · 30 = 60 m.'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy 15%-os és egy 25%-os cukoroldatot keverünk össze. Hány gramm 25%-os oldatot kell adnunk 200 g 15%-os oldathoz, hogy a keverék 20%-os legyen?',
      options: [
        '200 grammot',
        '150 grammot',
        '250 grammot',
        '100 grammot'
      ],
      correctAnswer: 0,
      hint: 'Mivel a 20% pontosan a 15% és a 25% számtani közepe, a két tömegnek meg kell egyeznie!',
      explanation: 'Cukortartalom: 200 · 0,15 + x · 0,25 = (200 + x) · 0,20 ⟹ 30 + 0,25x = 40 + 0,20x ⟹ 0,05x = 10 ⟹ x = 200 gramm.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Egy háromjegyű szám középső számjegye 0. A százasok száma kétszerese az egyesek számának. Ha a számjegyeket megfordítjuk, az új szám 198-cal kisebb az eredetinél. Melyik az eredeti szám?',
      options: [
        '402',
        '603',
        '201',
        '804'
      ],
      correctAnswer: 0,
      hint: 'Szám = 2a · 100 + a = 201a. Megfordítva: a · 100 + 2a = 102a. 201a - 102a = 99a = 198.',
      explanation: '99a = 198 ⟹ a = 2. Az egyesek helyén 2 áll, a százasok helyén 4, a szám a 402. Megfordítva 204, és 402 - 204 = 198.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy iskola alapítványi bálján a tombolajegyek 60%-át adták el az első órában, a maradék 75%-át a második órában, és még 30 darab tombola maradt a zárásig. Hány tombolajegyet nyomtattak összesen?',
      options: [
        '300 tombolajegyet',
        '250 tombolajegyet',
        '400 tombolajegyet',
        '200 tombolajegyet'
      ],
      correctAnswer: 0,
      hint: '1. óra után maradt 40%. Ennek a maradék 25%-a = 30 db. Tehát a teljes tombolamennyiség 10%-a = 30 db!',
      explanation: 'A 40% negyede (25%-a) pontosan a teljes mennyiség 10%-a. Ha 10% = 30 darab, akkor a 100% = 300 tombolajegy. Ellenőrzés: 1. óra: 180 db eladva (marad 120 db). 2. óra: 120 · 0,75 = 90 db eladva. Megmaradt: 120 - 90 = 30 db.'
    }
  ];

  return (
    <QuizTemplate
      title="Szöveges feladatok kvíz"
      subtitle="Tedd próbára tudásodat számkeresős, életkoros, geometriai és törtrészes szöveges feladatokon 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="teal"
      category="Szöveges feladatok"
      topicTitle="Szöveges feladatok"
      questions={questions}
      matcherComponent={WordProblemsMatcher}
      sorterComponent={WordProblemsSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default WordProblemsQuiz;
