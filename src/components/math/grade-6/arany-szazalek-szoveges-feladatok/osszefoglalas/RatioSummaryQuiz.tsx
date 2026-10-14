import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { RatioSummaryMatcher } from './RatioSummaryMatcher';
import { RatioSummarySorter } from './RatioSummarySorter';

interface RatioSummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const RatioSummaryQuiz: React.FC<RatioSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Átfogó alapfogalmak)
    // ==========================================
    {
      id: 'sq1',
      level: 1,
      question: 'Egyszerűsítsd a 15 : 25 arányt a legkisebb egész tagokra!',
      options: ['3 : 5', '5 : 3', '1 : 2', '3 : 25'],
      correctAnswer: 0,
      hint: 'Oszd el mindkét tagot a legnagyobb közös osztójukkal (5-tel).',
      explanation: '15 : 5 = 3 és 25 : 5 = 5, tehát az egyszerűsített arány 3 : 5.'
    },
    {
      id: 'sq2',
      level: 1,
      question: 'Egyenes arányosság esetén, ha az egyik mennyiség a 3-szorosára nő, hogyan változik a hozzá tartozó másik mennyiség?',
      options: [
        'Ugyancsak a 3-szorosára nő',
        'A harmadára csökken',
        'Változatlan marad',
        '3-mal nagyobb lesz'
      ],
      correctAnswer: 0,
      hint: 'Egyenes arányosságnál a hányados állandó: ahányszorosára változik az egyik, annyiszorosára változik a másik.',
      explanation: 'Egyenes arányosságnál az összetartozó értékek aránya állandó, így ha az egyik a 3-szorosára nő, a másik is pontosan a 3-szorosára növekszik.'
    },
    {
      id: 'sq3',
      level: 1,
      question: 'Mennyi 2000 Ft-nak a 15%-a?',
      options: ['300 Ft', '150 Ft', '200 Ft', '350 Ft'],
      correctAnswer: 0,
      hint: '1% = 20 Ft, 15% = 15 · 20 Ft.',
      explanation: '2000 Ft 1%-a 20 Ft. 15 · 20 Ft = 300 Ft. (Vagy: 2000 · 0,15 = 300 Ft).'
    },
    {
      id: 'sq4',
      level: 1,
      question: 'Mit jelent a százalék kifejezés a matematikában?',
      options: [
        'Századrészt (1/100 = 0,01)',
        'Tizedrészt (1/10 = 0,1)',
        'Ezredrészt (1/1000 = 0,001)',
        'Százszoros mennyiséget'
      ],
      correctAnswer: 0,
      hint: 'A per centum latin kifejezés jelentése: százanként, századrész.',
      explanation: '1% az egésznek az egy századrésze: 1/100 = 0,01.'
    },
    {
      id: 'sq5',
      level: 1,
      question: 'Oldd meg a 3x + 5 = 26 egyenletet a racionális számok halmazán!',
      options: ['x = 7', 'x = 8', 'x = 6', 'x = 9'],
      correctAnswer: 0,
      hint: 'Vonj ki 5-öt mindkét oldalból: 3x = 21.',
      explanation: '3x + 5 = 26 ⟹ 3x = 21 ⟹ x = 7. Ellenőrzés: 3 · 7 + 5 = 21 + 5 = 26.'
    },
    {
      id: 'sq6',
      level: 1,
      question: 'Milyen vonal ábrázolja az egyenes arányosságot a derékszögű koordináta-rendszerben?',
      options: [
        'Az origóból (0; 0) kiinduló egyenes vagy félegyenes',
        'Tetszőleges görbe vonal',
        'Vízszintes egyenes a tengellyel párhuzamosan',
        'Az y tengelyt 5-nél metsző egyenes'
      ],
      correctAnswer: 0,
      hint: 'Ha x = 0, akkor y = 0, ezért a grafikon mindig átmegy az origón.',
      explanation: 'Mivel y = k · x, az arányossági függvény grafikonja mindig az origón áthaladó egyenes vagy pozitív értékeknél félegyenes.'
    },
    {
      id: 'sq7',
      level: 1,
      question: 'Egy 24 fős osztályban a fiúk és a lányok aránya 1 : 2. Hány lány jár az osztályba?',
      options: ['16 lány', '8 lány', '12 lány', '18 lány'],
      correctAnswer: 0,
      hint: 'Összesen 1 + 2 = 3 rész van. 1 rész = 24 : 3 = 8 fő.',
      explanation: '1 rész = 24 : 3 = 8 fő (fiúk). A lányok 2 részt tesznek ki: 2 · 8 = 16 lány.'
    },
    {
      id: 'sq8',
      level: 1,
      question: 'Egy télikabát eredeti ára 10 000 Ft volt, de 20%-os kedvezményt adtak rá. Mennyi az új ára?',
      options: ['8000 Ft', '8500 Ft', '7500 Ft', '9000 Ft'],
      correctAnswer: 0,
      hint: 'A kedvezmény 10 000 Ft 20%-a, azaz 2000 Ft.',
      explanation: 'A 20% kedvezmény: 10 000 · 0,20 = 2000 Ft. Az új ár: 10 000 - 2000 = 8000 Ft (az eredeti ár 80%-a).'
    },
    {
      id: 'sq9',
      level: 1,
      question: 'Mennyi a 120-nak a 3/4 része?',
      options: ['90', '80', '100', '60'],
      correctAnswer: 0,
      hint: '1/4 rész = 120 : 4 = 30. Ennek a háromszorosa: 3 · 30.',
      explanation: '120 · (3/4) = (120 : 4) · 3 = 30 · 3 = 90.'
    },
    {
      id: 'sq10',
      level: 1,
      question: 'Hány megoldása van a 0 · x = 7 egyenletnek a valós számok halmazán?',
      options: [
        'Nincs megoldása (0 darab)',
        '1 megoldása van (x = 7)',
        '1 megoldása van (x = 0)',
        'Végtelen sok megoldása van'
      ],
      correctAnswer: 0,
      hint: 'Bármilyen szám szorzata 0-val nulla, és 0 sosem egyenlő 7-tel.',
      explanation: 'Bármely valós számot szorozva 0-val 0-t kapunk, a 0 = 7 ellentmondás, így az egyenletnek nincs megoldása.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Alkalmazások és modellezés)
    // ==========================================
    {
      id: 'sq11',
      level: 2,
      question: 'Két szám aránya 4 : 7, az összegük 132. Mennyi a nagyobbik szám értéke?',
      options: ['84', '48', '77', '66'],
      correctAnswer: 0,
      hint: 'Összesen 4 + 7 = 11 rész van. 1 rész = 132 : 11 = 12.',
      explanation: '1 rész = 132 : 11 = 12. A nagyobbik szám 7 rész: 7 · 12 = 84. (A kisebbik 4 · 12 = 48, összegük 48 + 84 = 132).'
    },
    {
      id: 'sq12',
      level: 2,
      question: '3 kg alma ára 1350 Ft. Mennyibe kerül 5 kg ugyanebből az almából?',
      options: ['2250 Ft', '2100 Ft', '2400 Ft', '2000 Ft'],
      correctAnswer: 0,
      hint: 'Számold ki az 1 kg egységárat: 1350 : 3 = 450 Ft/kg.',
      explanation: 'Egységár: 1350 : 3 = 450 Ft/kg. 5 kg ára: 5 · 450 = 2250 Ft.'
    },
    {
      id: 'sq13',
      level: 2,
      question: 'Egy szám 30%-a 45. Mennyi maga az egész szám (100%)?',
      options: ['150', '135', '120', '160'],
      correctAnswer: 0,
      hint: '1% = 45 : 30 = 1,5. 100% = 100 · 1,5.',
      explanation: 'Alap = Érték / Láb = 45 : 0,30 = 150. Ellenőrzés: 150 · 0,30 = 45.'
    },
    {
      id: 'sq14',
      level: 2,
      question: 'Hány százaléka a 35 a 140-nek?',
      options: ['25%', '20%', '30%', '35%'],
      correctAnswer: 0,
      hint: '35 / 140 egyszerűsítve 1/4.',
      explanation: '35 : 140 = 1/4 = 0,25 = 25%.'
    },
    {
      id: 'sq15',
      level: 2,
      question: 'Oldd meg az 5x - 8 = 2x + 13 egyenletet!',
      options: ['x = 7', 'x = 6', 'x = 8', 'x = 5'],
      correctAnswer: 0,
      hint: 'Vonj ki 2x-et és adj hozzá 8-at mindkét oldalhoz: 3x = 21.',
      explanation: '5x - 8 = 2x + 13 ⟹ 3x - 8 = 13 ⟹ 3x = 21 ⟹ x = 7.'
    },
    {
      id: 'sq16',
      level: 2,
      question: 'Egy téglalap kerülete 48 cm, hosszúsága és szélessége 5 : 3 arányban áll. Mennyi a téglalap területe?',
      options: ['135 cm²', '120 cm²', '144 cm²', '150 cm²'],
      correctAnswer: 0,
      hint: 'K = 2(a + b) = 48 ⟹ a + b = 24. 8 rész = 24 cm ⟹ 1 rész = 3 cm.',
      explanation: 'a + b = 24 cm. 5 + 3 = 8 rész ⟹ 1 rész = 3 cm. Oldalak: a = 15 cm, b = 9 cm. Terület: T = 15 · 9 = 135 cm².'
    },
    {
      id: 'sq17',
      level: 2,
      question: 'Egy könyv árát 15%-kal felemelték, így 4600 Ft lett. Mennyi volt az eredeti ára?',
      options: ['4000 Ft', '3900 Ft', '4100 Ft', '4200 Ft'],
      correctAnswer: 0,
      hint: 'Az új ár a régi ár 115%-a: Eredeti ár · 1,15 = 4600.',
      explanation: 'Eredeti ár = 4600 : 1,15 = 4000 Ft. Ellenőrzés: 4000 15%-a 600 Ft, 4000 + 600 = 4600 Ft.'
    },
    {
      id: 'sq18',
      level: 2,
      question: 'Egy egyenlő szárú háromszög egyik szöge 70°. Hányféle belső szöghármasa lehet ennek a háromszögnek?',
      options: [
        '2 féle (70°-70°-40° vagy 70°-55°-55°)',
        'Csak 1 féle',
        '3 féle',
        'Nincs ilyen háromszög'
      ],
      correctAnswer: 0,
      hint: 'A 70° lehet alapon fekvő szög, vagy lehet a szárszög is.',
      explanation: '1. eset: 70° az alapnál: 70°, 70°, 40°. 2. eset: 70° a szárszög: (180° - 70°) : 2 = 55°, tehát 70°, 55°, 55°. Pontosan 2 megoldás.'
    },
    {
      id: 'sq19',
      level: 2,
      question: 'Anna 6 évvel idősebb Péternél. Kettejük életkorának összege 28 év. Hány éves Péter?',
      options: ['11 éves', '17 éves', '12 éves', '10 éves'],
      correctAnswer: 0,
      hint: 'Péter kora x, Anna kora x + 6. Összegük: 2x + 6 = 28.',
      explanation: '2x + 6 = 28 ⟹ 2x = 22 ⟹ x = 11 éves Péter (Anna 17 éves, összegük 28).'
    },
    {
      id: 'sq20',
      level: 2,
      question: 'Az egyenes arányosság grafikonja áthalad a (2; 10) ponton. Melyik pont illeszkedik még erre az egyenesre?',
      options: ['(4; 20)', '(3; 12)', '(5; 20)', '(1; 8)'],
      correctAnswer: 0,
      hint: 'k = y / x = 10 / 2 = 5. A képlet: y = 5x.',
      explanation: 'Az arányossági tényező: k = 10 / 2 = 5. Az x = 4-hez tartozó y érték: 5 · 4 = 20, tehát a (4; 20) pont illeszkedik.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett problémák és kihívások)
    // ==========================================
    {
      id: 'sq21',
      level: 3,
      question: 'Egy 40 000 Ft-os cipőt először 10%-kal leértékeltek, majd a kapott új árat 10%-kal felemelték. Mennyi lett a cipő végső ára?',
      options: ['39 600 Ft', '40 000 Ft', '39 000 Ft', '40 400 Ft'],
      correctAnswer: 0,
      hint: 'A csökkentett ár 36 000 Ft. Ennek a 10%-a 3600 Ft.',
      explanation: '10% leértékelés után: 40 000 · 0,90 = 36 000 Ft. 10% felemelés után: 36 000 · 1,10 = 39 600 Ft. (Nem 40 000 Ft, mert a felemelés a kisebb alapból történt!).'
    },
    {
      id: 'sq22',
      level: 3,
      question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 5. Mekkora a háromszög legnagyobb szöge?',
      options: ['90° (derékszög)', '80°', '100°', '75°'],
      correctAnswer: 0,
      hint: 'A háromszög belső szögeinek összege 180°. 2 + 3 + 5 = 10 rész.',
      explanation: '1 rész = 180° : 10 = 18°. A legnagyobb szög 5 rész: 5 · 18° = 90°. (A háromszög derékszögű!).'
    },
    {
      id: 'sq23',
      level: 3,
      question: 'Egy tartályból kiöntötték a benne lévő víz 40%-át, majd a maradék 1/3 részét. Így 24 liter víz maradt benne. Hány liter víz volt a tartályban eredetileg?',
      options: ['60 liter', '50 liter', '72 liter', '80 liter'],
      correctAnswer: 0,
      hint: 'A 40% kiöntése után a víz 60%-a maradt meg. Ennek az 1/3-át kiöntve a 2/3 része maradt meg.',
      explanation: 'Első lépés után marad 60%. A 60% 2/3 része: 40%. A tartály 40%-a 24 liter. 1% = 24 : 40 = 0,6 liter. 100% = 60 liter.'
    },
    {
      id: 'sq24',
      level: 3,
      question: 'Oldd meg a 4(x - 3) = 2(x + 5) egyenletet!',
      options: ['x = 11', 'x = 10', 'x = 9', 'x = 12'],
      correctAnswer: 0,
      hint: 'Bontsd fel a zárójeleket: 4x - 12 = 2x + 10.',
      explanation: '4x - 12 = 2x + 10 ⟹ 2x - 12 = 10 ⟹ 2x = 22 ⟹ x = 11.'
    },
    {
      id: 'sq25',
      level: 3,
      question: 'Két autó egyszerre indul egymással szemben 180 km távolságból. Sebességük 70 km/h és 50 km/h. Hány óra múlva találkoznak?',
      options: ['1,5 óra múlva', '2 óra múlva', '1,2 óra múlva', '1,8 óra múlva'],
      correctAnswer: 0,
      hint: 'Közös közeledési sebességük: 70 + 50 = 120 km/h.',
      explanation: 'Egy óra alatt összesen 70 + 50 = 120 km-t tesznek meg közösen. Találkozási idő: t = s / v = 180 : 120 = 1,5 óra (1 óra 30 perc).'
    },
    {
      id: 'sq26',
      level: 3,
      question: 'Hány olyan (x; y) természetes számpár létezik (0, 1, 2...), amely kielégíti a 2x + 3y = 18 egyenletet?',
      options: [
        '4 számpár: (9; 0), (6; 2), (3; 4), (0; 6)',
        '3 számpár',
        '5 számpár',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: 'y értéke csak páros lehet (mert 18 - 3y páros kell legyen). y = 0, 2, 4, 6.',
      explanation: 'y = 0 ⟹ x = 9; y = 2 ⟹ x = 6; y = 4 ⟹ x = 3; y = 6 ⟹ x = 0. Más természetes számra nem ad egész x-et. Pontosan 4 megoldás.'
    },
    {
      id: 'sq27',
      level: 3,
      question: 'Egy apa most 38 éves, a lánya pedig 12 éves. Hány év múlva lesz az apa életkora pontosan a kétszerese a lánya életkorának?',
      options: ['14 év múlva', '12 év múlva', '16 év múlva', '10 év múlva'],
      correctAnswer: 0,
      hint: 'Egyenlet: 38 + x = 2(12 + x).',
      explanation: '38 + x = 24 + 2x ⟹ x = 14 év múlva. (Akkor az apa 52, a lány 26 éves lesz, 52 = 2 · 26).'
    },
    {
      id: 'sq28',
      level: 3,
      question: 'Egy téglalap oldalai egész centiméterek, kerülete 20 cm. Hányféle ilyen különböző téglalap létezik (a ≤ b)?',
      options: [
        '5 féle (1×9, 2×8, 3×7, 4×6, 5×5)',
        '4 féle',
        '6 féle',
        '10 féle'
      ],
      correctAnswer: 0,
      hint: 'K = 2(a + b) = 20 ⟹ a + b = 10. Keressük az egész összegbontásokat a ≤ b mellett.',
      explanation: 'a + b = 10 cm. Lehetséges egészek: 1+9, 2+8, 3+7, 4+6 és 5+5 (a négyzet is téglalap). Ez pontosan 5 különböző téglalap.'
    },
    {
      id: 'sq29',
      level: 3,
      question: 'Egy termék árát 25%-kal csökkentették. Hány százalékkal kell most megemelni az új árat, hogy visszakapjuk az eredeti árat?',
      options: ['33 1/3 %-kal (egyharmadával)', '25%-kal', '30%-kal', '20%-kal'],
      correctAnswer: 0,
      hint: 'Ha 100 Ft volt, most 75 Ft. A 75-ről kell visszajutni 100-ra (25 Ft emelés). 25 / 75 = ?',
      explanation: '75 Ft-ot 25 Ft-tal kell emelni: 25 / 75 = 1/3 rész = 33,33%. Nem 25%-kal, mert most a 75 Ft a 100% viszonyítási alap!'
    },
    {
      id: 'sq30',
      level: 3,
      question: 'Egy téglalap területe és kerülete mérőszámban megegyezik, oldalai pedig egész centiméterek (a ≤ b). Hány ilyen téglalap létezik?',
      options: [
        '2 féle (4×4-es négyzet és 3×6-os téglalap)',
        '1 féle (csak 4×4)',
        '3 féle',
        'Végtelen sok'
      ],
      correctAnswer: 0,
      hint: '(a - 2)(b - 2) = 4 egyenlet pozitív egész megoldásai.',
      explanation: 'ab = 2a + 2b ⟹ (a - 2)(b - 2) = 4. Osztópárok: 2 · 2 ⟹ a = 4, b = 4 (T = 16, K = 16). És 1 · 4 ⟹ a = 3, b = 6 (T = 18, K = 18). Pontosan 2 megoldás.'
    }
  ];

  return (
    <QuizTemplate
      title="IV. Témaköri Összefoglaló Kvíz"
      subtitle="Átfogó témazáró felkészítő arányból, egyenes arányosságból, százalékból és szöveges feladatokból 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 TÉMAZÁRÓ KVÍZ"
      themeColor="slate"
      category="Összefoglalás"
      topicTitle="Összefoglalás"
      questions={questions}
      matcherComponent={RatioSummaryMatcher}
      sorterComponent={RatioSummarySorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default RatioSummaryQuiz;
