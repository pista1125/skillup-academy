import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { MultipleSolutionsMatcher } from './MultipleSolutionsMatcher';
import { MultipleSolutionsSorter } from './MultipleSolutionsSorter';

interface MultipleSolutionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const MultipleSolutionsQuiz: React.FC<MultipleSolutionsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Megoldások száma, alaphalmaz)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Hány olyan pozitív egész szám van, amely szigorúan kisebb 5-nél?',
      options: [
        '4 darab (1, 2, 3, 4)',
        '5 darab (0, 1, 2, 3, 4)',
        '3 darab (2, 3, 4)',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'A pozitív egész számok az 1-gyel kezdődnek (a 0 nem pozitív).',
      explanation: 'A pozitív egész számok halmazán az 5-nél kisebb számok: 1, 2, 3, 4. Ez pontosan 4 megoldás.'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Hány megoldása van a 0 · x = 8 egyenletnek a valós számok halmazán?',
      options: [
        'Nincs megoldása (0 darab)',
        'Pontosan 1 megoldása van: x = 8',
        'Pontosan 1 megoldása van: x = 0',
        'Végtelen sok megoldása van'
      ],
      correctAnswer: 0,
      hint: 'Bármilyen számot szorzol nullával, az eredmény mindig nulla lesz.',
      explanation: 'Bármely valós számot 0-val szorozva 0-t kapunk, tehát a bal oldal mindig 0, ami soha nem egyenlő 8-cal. Nincs megoldás.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Hány megoldása van a 0 · x = 0 egyenletnek a valós számok halmazán?',
      options: [
        'Végtelen sok megoldása van',
        'Pontosan 1 megoldása van (x = 0)',
        'Nincs megoldása',
        'Pontosan 2 megoldása van'
      ],
      correctAnswer: 0,
      hint: 'Minden valós számra igaz, hogy 0-szorosa nulla.',
      explanation: 'Mivel bármely valós szám nullaszorosa nulla (0 = 0), ezért a valós számok bármelyike megoldás: végtelen sok megoldása van.'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Két természetes szám szorzata 6. Hány ilyen számpár létezik (a ≤ b sorrendben)?',
      options: [
        '2 számpár (1 és 6, illetve 2 és 3)',
        '1 számpár (2 és 3)',
        '3 számpár',
        '4 számpár'
      ],
      correctAnswer: 0,
      hint: 'Keresd a 6 pozitív egész osztópárjait: 1 · 6 és 2 · 3.',
      explanation: 'A 6 szorzattá bontása természetes számokon: 1 · 6 = 6 és 2 · 3 = 6. Tehát pontosan 2 számpár felel meg a feltételnek.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Egy szöveges feladatban a gyerekek számára x = 14,5 jött ki eredményül. Hogyan értelmezhető ez a valóságban?',
      options: [
        'A feladatnak a valóságban nincs megoldása, mert az emberi létszám csak nemnegatív egész szám lehet',
        'A megoldás 14 vagy 15 gyerek',
        'A feladatnak végtelen sok megoldása van',
        'A fél gyerek azt jelenti, hogy még óvodás'
      ],
      correctAnswer: 0,
      hint: 'Az alaphalmazt a feladat valós tartalma határozza meg.',
      explanation: 'A valós életben a személyek, állatok vagy tárgyak darabszáma csak egész szám lehet. A 14,5 nem egész, így a szöveges feladatnak nincs valós megoldása.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Hány megoldása van a 2x + 6 = 16 egyenletnek a racionális számok halmazán?',
      options: [
        'Pontosan 1 megoldása van (x = 5)',
        '2 megoldása van',
        'Nincs megoldása',
        'Végtelen sok megoldása van'
      ],
      correctAnswer: 0,
      hint: '2x = 10 ⟹ x = 5.',
      explanation: '2x + 6 = 16 ⟹ 2x = 10 ⟹ x = 5. Ez egyértelmű, pontosan egyetlen megoldás.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Hány olyan páros prímszám létezik a természetes számok között?',
      options: [
        'Pontosan 1 darab (a 2)',
        'Nincs ilyen prímszám (0 db)',
        '2 darab',
        'Végtelen sok páros prím van'
      ],
      correctAnswer: 0,
      hint: 'Minden 2-nél nagyobb páros szám osztható 2-vel, így összetett szám.',
      explanation: 'Az egyetlen páros prímszám a 2. Minden más páros szám osztható 2-vel, így van 2-nél nagyobb osztója is.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Egy téglalap területe 12 cm², oldalai pedig egész centiméterek. Hányféle különböző ilyen téglalap létezik (a ≤ b)?',
      options: [
        '3 féle (1×12, 2×6, 3×4)',
        '2 féle (2×6, 3×4)',
        '4 féle',
        '6 féle'
      ],
      correctAnswer: 0,
      hint: 'A 12 egész osztópárjai: 1·12, 2·6, 3·4.',
      explanation: 'A 12 lehetséges felbontásai két egész szám szorzatára: 1×12, 2×6 és 3×4 cm. Ez pontosan 3 különböző téglalapot jelent.'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mit nevezünk a feladatmegoldásban alaphalmaznak?',
      options: [
        'Azon számok vagy elemek összességét, amelyek közül a megoldásokat keressük',
        'A feladatban szereplő legkisebb számot',
        'A végeredmény kerekített értékét',
        'Az egyenlet bal oldalának kifejezését'
      ],
      correctAnswer: 0,
      hint: 'Az alaphalmaz szabja meg, milyen típusú számok jöhetnek szóba (pl. természetes számok, egészek, valós számok).',
      explanation: 'Az alaphalmaz adja meg a keretet: csak azok a számok lehetnek érvényes megoldások, amelyek elemei a megadott alaphalmaznak.'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mi a legfőbb célja a szisztematikus (rendszeres) táblázatkészítésnek, ha egy feladatnak több megoldása is lehet?',
      options: [
        'Hogy tervszerűen végigvizsgáljuk a lehetőségeket, és biztosan ne hagyjunk ki egyetlen érvényes esetet sem',
        'Hogy szebb legyen a füzetkép',
        'Hogy bebizonyítsuk, nincs megoldása a feladatnak',
        'Hogy elkerüljük az osztás műveletét'
      ],
      correctAnswer: 0,
      hint: 'A rendezett sorrend garantálja a teljességet.',
      explanation: 'A szisztematikus vizsgálat biztosítja, hogy minden lehetséges esetet áttekintsünk, kiszűrjük a hamisakat, és megtaláljuk az összes valós megoldást.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Esetvizsgálat, geometriai több megoldás)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Egy egyenlő szárú háromszög egyik szöge 50°. Hányféle belső szöghármasa lehet ennek a háromszögnek?',
      options: [
        '2 féle (50°-50°-80° vagy 50°-65°-65°)',
        'Csak 1 féle (50°-50°-80°)',
        '3 féle',
        'Nincs ilyen háromszög'
      ],
      correctAnswer: 0,
      hint: 'Az 50° lehet az alapon fekvő szög, vagy lehet a szárszög is.',
      explanation: '1. eset: ha 50° az alapon fekvő szög, a szögek: 50°, 50°, 80°. 2. eset: ha 50° a szárszög, a másik kettő: (180° - 50°) : 2 = 65°, azaz 50°, 65°, 65°. Pontosan 2 megoldás.'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Hány olyan (x; y) számpár van a természetes számok halmazán (0, 1, 2...), amelyre x + y = 6?',
      options: [
        '7 számpár',
        '6 számpár',
        '5 számpár',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'x felveheti a 0, 1, 2, 3, 4, 5, 6 értékeket. Hány eset ez?',
      explanation: 'A lehetőségek: (0;6), (1;5), (2;4), (3;3), (4;2), (5;1), (6;0). Mivel a 0 is természetes szám, ez összesen 7 különböző számpár.'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Hányféleképpen fizethetünk ki 400 Ft-ot kizárólag 100 Ft-os és 200 Ft-os érmékkel (bármelyikből lehet 0 db is)?',
      options: [
        '3 féleképpen',
        '2 féleképpen',
        '4 féleképpen',
        '1 féleképpen'
      ],
      correctAnswer: 0,
      hint: 'A 200 Ft-osok száma lehet 0, 1 vagy 2.',
      explanation: '1. eset: 2 db 200 Ft-os (és 0 db 100-as). 2. eset: 1 db 200 Ft-os és 2 db 100-as. 3. eset: 0 db 200 Ft-os és 4 db 100-as. Összesen 3 lehetőség.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Egy téglalap kerülete 18 cm, oldalai egész centiméterek (a ≤ b). Hányféle ilyen téglalap létezik?',
      options: [
        '4 féle (1+8, 2+7, 3+6, 4+5)',
        '3 féle',
        '5 féle',
        '9 féle'
      ],
      correctAnswer: 0,
      hint: 'K = 2(a + b) = 18 ⟹ a + b = 9. Keresd az egész összegbontásokat!',
      explanation: 'Mivel a + b = 9 és a ≤ b: 1+8, 2+7, 3+6, 4+5 cm. Ez pontosan 4 különböző téglalapot jelent.'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Hány megoldása van a 2x + 4y = 15 egyenletnek az egész számok halmazán?',
      options: [
        'Nincs megoldása (0 darab)',
        'Pontosan 1 megoldása van',
        '2 megoldása van',
        'Végtelen sok megoldása van'
      ],
      correctAnswer: 0,
      hint: 'Emelj ki 2-t a bal oldalon: 2(x + 2y) = 15. Lehet egy páros szám egyenlő 15-tel?',
      explanation: 'A bal oldal 2 · (x + 2y), ami bármely egész x és y esetén páros szám. A 15 páratlan szám, páros szám sosem lehet egyenlő páratlannal, így nincs egész megoldás.'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Két természetes szám szorzata 20, és az összegük páros. Melyik ez a számpár?',
      options: [
        '2 és 10',
        '4 és 5',
        '1 és 20',
        'Nincs ilyen számpár'
      ],
      correctAnswer: 0,
      hint: 'Vizsgáld a szorzatbontásokat: 1·20 összeg 21; 2·10 összeg 12; 4·5 összeg 9.',
      explanation: 'A 20 osztópárjai: (1; 20) összege 21 (páratlan); (4; 5) összege 9 (páratlan); (2; 10) összege 12 (páros). Egyedül a 2 és 10 felel meg.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Egy egyenlő szárú háromszög két oldala 4 cm és 9 cm. Hányféle ilyen háromszög létezik a háromszög-egyenlőtlenség alapján?',
      options: [
        'Csak 1 féle (oldalai: 9 cm, 9 cm, 4 cm)',
        '2 féle (4-4-9 és 9-9-4)',
        'Nincs ilyen háromszög',
        'Végtelen sok féle'
      ],
      correctAnswer: 0,
      hint: 'A háromszög bármely két oldalának összege nagyobb kell legyen a harmadik oldalnál: 4 + 4 > 9 igaz?',
      explanation: 'Ha az oldalak 4, 4, 9 lennének, akkor 4 + 4 = 8 < 9, ami megsérti a háromszög-egyenlőtlenséget. Csak a 9, 9, 4 cm-es oldalak alkothatnak háromszöget (4 + 9 = 13 > 9). Pontosan 1 megoldás van.'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Hány olyan kétjegyű pozitív egész szám van, amelynek a számjegyeinek összege pontosan 4?',
      options: [
        '4 darab (13, 22, 31, 40)',
        '3 darab (13, 22, 31)',
        '5 darab',
        '2 darab'
      ],
      correctAnswer: 0,
      hint: 'A tízesek helyén 1, 2, 3, 4 állhat (0 nem lehet az első számjegy).',
      explanation: 'A lehetséges számok: 13 (1+3), 22 (2+2), 31 (3+1) és 40 (4+0). Ez pontosan 4 darab szám.'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Hány megoldása van a 3x < 14 egyenlőtlenségnek a természetes számok halmazán (0, 1, 2...)?',
      options: [
        '5 megoldása van (0, 1, 2, 3, 4)',
        '4 megoldása van (1, 2, 3, 4)',
        'Végtelen sok megoldása van',
        'Nincs megoldása'
      ],
      correctAnswer: 0,
      hint: '14 : 3 = 4 egész 2/3. Mely természetes számok kisebbek ennél?',
      explanation: 'x < 4,66... A feltételnek megfelelő természetes számok: 0, 1, 2, 3, 4. Ez pontosan 5 darab megoldás.'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Hány egész megoldása van az |x| = 7 egyenletnek?',
      options: [
        '2 megoldása van (7 és -7)',
        '1 megoldása van (csak a 7)',
        'Nincs megoldása',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'Az abszolútérték a nullától mért távolság. Két ilyen szám is van a számegyenesen.',
      explanation: 'Mind a 7, mind a -7 nullától mért távolsága 7, vagyis |7| = 7 és |-7| = 7. Így pontosan 2 megoldás létezik.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Diofantoszi egyenletek, szélsőértékek)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Hány olyan természetes számpár (x; y) létezik, amely kielégíti a 3x + 4y = 24 egyenletet?',
      options: [
        '3 számpár: (8; 0), (4; 3), (0; 6)',
        '2 számpár: (8; 0), (0; 6)',
        '4 számpár',
        '1 számpár'
      ],
      correctAnswer: 0,
      hint: 'y értékei csak 0, 1, 2, 3, 4, 5, 6 lehetnek. Melyekre lesz 24 - 4y osztható 3-mal?',
      explanation: 'Ha y = 0 ⟹ 3x = 24 ⟹ x = 8. Ha y = 3 ⟹ 3x = 12 ⟹ x = 4. Ha y = 6 ⟹ 3x = 0 ⟹ x = 0. Más y esetén x nem egész. Pontosan 3 számpár.'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Egy derékszögű háromszög oldalainak hossza egész centiméter, és egymást követő egész számok. Hány ilyen háromszög létezik?',
      options: [
        'Pontosan 1 darab (oldalai: 3 cm, 4 cm, 5 cm)',
        '2 darab',
        'Végtelen sok',
        'Nincs ilyen háromszög'
      ],
      correctAnswer: 0,
      hint: 'Pitagorasz-tétel: a² + (a+1)² = (a+2)². Egyetlen pozitív egész megoldás létezik.',
      explanation: 'Az egyetlen egymást követő egész számokból álló pitagoraszi számhármas a (3, 4, 5), mert 3² + 4² = 9 + 16 = 25 = 5². Pontosan 1 ilyen háromszög van.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Két prímszám összege 35. Hány ilyen prímpár létezik?',
      options: [
        '0 darab (nincs ilyen prímpár)',
        '1 darab (2 és 33)',
        '2 darab',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'Két szám összege csak akkor lehet páratlan (35), ha az egyik páros. Az egyetlen páros prím a 2. Prím-e a 33?',
      explanation: 'Páratlan összeg csak páros + páratlan prímből jöhet ki. Az egyetlen páros prím a 2, ekkor a másik számnak 35 - 2 = 33-nak kellene lennie. Ám a 33 összetett szám (3 · 11), így nincs ilyen prímpár.'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Hányféleképpen válthatunk fel egy 500 Ft-ost 50 Ft-os és 100 Ft-os érmékre úgy, hogy mindkét fajtából legyen legalább egy darab?',
      options: [
        '4 féleképpen',
        '5 féleképpen',
        '3 féleképpen',
        '6 féleképpen'
      ],
      correctAnswer: 0,
      hint: 'A 100 Ft-osok száma lehet 1, 2, 3 vagy 4. Mindegyikhez tartozik megfelelő darabszámú 50 Ft-os.',
      explanation: 'A 100 Ft-osok száma 1, 2, 3 vagy 4 lehet (ha 5 lenne, nem maradna 50 Ft-os). 1×100 + 8×50, 2×100 + 6×50, 3×100 + 4×50, 4×100 + 2×50. Összesen 4 megoldás.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy téglalap területe és kerülete mérőszámban megegyezik (a · b = 2(a + b)), és mindkét oldala egész centiméter (a ≤ b). Hány ilyen téglalap létezik?',
      options: [
        '2 féle (4×4-es négyzet és 3×6-os téglalap)',
        'Csak 1 féle (4×4)',
        '3 féle',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'ab - 2a - 2b = 0 ⟹ (a - 2)(b - 2) = 4. A 4 osztói: 1 · 4 és 2 · 2.',
      explanation: '(a - 2)(b - 2) = 4. Ebből: a - 2 = 2, b - 2 = 2 ⟹ a = 4, b = 4 (T = 16, K = 16). Vagy a - 2 = 1, b - 2 = 4 ⟹ a = 3, b = 6 (T = 18, K = 18). Pontosan 2 megoldás.'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Hány olyan pozitív egész n szám van, amelyre a 12/n tört értéke is pozitív egész szám?',
      options: [
        '6 darab (1, 2, 3, 4, 6, 12)',
        '4 darab',
        '5 darab',
        '12 darab'
      ],
      correctAnswer: 0,
      hint: 'A 12 összes pozitív osztóját keressük.',
      explanation: 'A 12 pozitív osztói: 1, 2, 3, 4, 6, 12. Ez pontosan 6 darab pozitív egész szám.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Egy dobozban piros és kék golyók vannak, összesen 10 darab (mindkettőből legalább 1 db). A pirosak száma nagyobb a kékek számának kétszeresénél. Hány kék golyó lehet a dobozban?',
      options: [
        '1, 2 vagy 3 darab (3 lehetséges megoldás)',
        'Csak 1 darab',
        'Csak 2 darab',
        '4 darab'
      ],
      correctAnswer: 0,
      hint: 'p + k = 10 ⟹ p = 10 - k. Feltétel: 10 - k > 2k ⟹ 10 > 3k ⟹ k < 3,33.',
      explanation: 'Mivel k egész szám és legalább 1, a k < 3,33 egyenlőtlenségből k lehet 1, 2 vagy 3. (Ekkor pirosak: 9, 8 vagy 7 db). Pontosan 3 megoldás.'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy egyenlő szárú háromszög kerülete 20 cm, oldalai pedig egész centiméterek. Hányféle ilyen háromszög létezik a háromszög-egyenlőtlenség figyelembevételével?',
      options: [
        '4 féle (szárak: 6, 7, 8, 9 cm)',
        '3 féle',
        '5 féle',
        '2 féle'
      ],
      correctAnswer: 0,
      hint: '2a + b = 20 ⟹ b = 20 - 2a. A háromszög-egyenlőtlenség miatt 2a > b, azaz 2a > 20 - 2a ⟹ 4a > 20 ⟹ a > 5.',
      explanation: 'A szár (a) egész szám, a > 5 és a < 10 (hogy b > 0 legyen). Lehetséges szárak: 6, 7, 8, 9. Oldalak: (6,6,8), (7,7,6), (8,8,4), (9,9,2). Pontosan 4 különböző háromszög.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Hány valós megoldása van az (x - 3)(x + 5) = 0 egyenletnek?',
      options: [
        '2 megoldása van (x = 3 és x = -5)',
        '1 megoldása van',
        'Nincs megoldása',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'Egy szorzat akkor és csak akkor nulla, ha legalább az egyik tényezője nulla.',
      explanation: 'A szorzat akkor 0, ha x - 3 = 0 (ebből x = 3) vagy x + 5 = 0 (ebből x = -5). Pontosan 2 valós megoldása van.'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy kétjegyű szám számjegyeinek szorzata 12. Hány ilyen kétjegyű szám létezik?',
      options: [
        '4 darab (26, 62, 34, 43)',
        '2 darab (34, 43)',
        '3 darab',
        '6 darab'
      ],
      correctAnswer: 0,
      hint: 'A számjegyek 1 és 9 közötti egészek: 2 · 6 = 12 és 3 · 4 = 12.',
      explanation: 'A 12 egyjegyű számok szorzataként: 2 · 6, 6 · 2, 3 · 4, 4 · 3 (az 1 · 12 kiesik, mert a 12 nem egyjegyű szám). A számok: 26, 62, 34, 43. Pontosan 4 szám létezik.'
    }
  ];

  return (
    <QuizTemplate
      title="Több megoldás is lehet kvíz"
      subtitle="Tedd próbára tudásodat a megoldások számáról, a feltételek vizsgálatáról és a szisztematikus keresésről 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="amber"
      category="Esetvizsgálat"
      topicTitle="Több megoldás is lehet"
      questions={questions}
      matcherComponent={MultipleSolutionsMatcher}
      sorterComponent={MultipleSolutionsSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default MultipleSolutionsQuiz;
