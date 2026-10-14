import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { PercentageMatcher } from './PercentageMatcher';
import { PercentageSorter } from './PercentageSorter';

interface PercentageQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
}

export const PercentageQuiz: React.FC<PercentageQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onOpenMatcher,
  onOpenSorter
}) => {
  const questions: Question[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Alapfogalmak és nevezetes százalékok)
    // ==========================================
    {
      id: 'q1',
      level: 1,
      question: 'Mit jelent a százalék (1%) fogalma a matematikában?',
      options: [
        'A teljes egész egy századrészét (1/100 = 0,01)',
        'Egy százassal növelt számot',
        'Bármilyen tetszőleges törtet',
        'Pontosan 100 darab egységet'
      ],
      correctAnswer: 0,
      hint: 'A latin „per centum” (százanként) szóból ered.',
      explanation: 'Az 1% az egész mennyiség egy századrészét jelenti: 1% = 1/100 = 0,01.'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Hányadrészét jelenti egy mennyiség 50%-a?',
      options: [
        'A felét (1/2 részét)',
        'Az ötödrészét (1/5 részét)',
        'Az egytizedét (1/10 részét)',
        'A háromnegyedét (3/4 részét)'
      ],
      correctAnswer: 0,
      hint: '50 / 100 egyszerűsítve 50-nel.',
      explanation: '50% = 50/100 = 1/2 rész, vagyis az egész fele.'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Hány százalékot jelent a teljes egész mennyiség?',
      options: [
        '100%-ot',
        '50%-ot',
        '10%-ot',
        '1000%-ot'
      ],
      correctAnswer: 0,
      hint: 'Az egész a 100 századrészből 100 darab.',
      explanation: 'A teljes egész a 100/100 rész, ami pontosan 100%-nak felel meg.'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Hányadrésze egy számnak a 25%-a?',
      options: [
        'A negyede (1/4 része)',
        'A fele (1/2 része)',
        'Az ötöde (1/5 része)',
        'A huszada (1/20 része)'
      ],
      correctAnswer: 0,
      hint: '25 / 100 egyszerűsítve 25-tel.',
      explanation: '25% = 25/100 = 1/4 rész, tehát a szám negyede.'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi 400 Ft-nak a 10%-a?',
      options: [
        '40 Ft',
        '4 Ft',
        '10 Ft',
        '400 Ft'
      ],
      correctAnswer: 0,
      hint: 'A 10% az egytized rész (osztás 10-zel).',
      explanation: 'A 10% kiszámításához a számot elosztjuk 10-zel: 400 : 10 = 40 Ft.'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Minek nevezzük a kiinduló egész mennyiséget (a 100%-ot) a százalékszámításban?',
      options: [
        'Százalékalapnak (a)',
        'Százaléklábnak (p%)',
        'Százalékértéknek (é)',
        'Arányszámnak'
      ],
      correctAnswer: 0,
      hint: 'Minden számításnak ez az alapja.',
      explanation: 'A kiindulási egész mennyiség a 100%, amit százalékalapnak nevezünk, jele: a.'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi 600 kg-nak az 1%-a?',
      options: [
        '6 kg',
        '60 kg',
        '0,6 kg',
        '10 kg'
      ],
      correctAnswer: 0,
      hint: 'Az 1% az egész századrésze (osztás 100-zal).',
      explanation: '600 : 100 = 6 kg.'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Hány százaléka egy számnak a 3/4 része?',
      options: [
        '75%-a',
        '25%-a',
        '30%-a',
        '50%-a'
      ],
      correctAnswer: 0,
      hint: '1/4 az 25%, ennek a háromszorosa: 3 · 25%.',
      explanation: '3/4 = 75/100 = 75%.'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi 800 Ft-nak az 50%-a?',
      options: [
        '400 Ft',
        '200 Ft',
        '80 Ft',
        '50 Ft'
      ],
      correctAnswer: 0,
      hint: 'Az 50% az pontosan a fele.',
      explanation: '800 : 2 = 400 Ft.'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Minek nevezzük a % jellel ellátott számot (pl. 15%) a három alapfogalom közül?',
      options: [
        'Százaléklábnak (p%)',
        'Százalékalapnak (a)',
        'Százalékértéknek (é)',
        'Századrésznek'
      ],
      correctAnswer: 0,
      hint: 'Megmutatja, hogy az alap hány százalékáról van szó.',
      explanation: 'A százalékos arányt kifejező, % jellel megadott mennyiség a százalékláb (p%).'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Számítások mindhárom mennyiségre)
    // ==========================================
    {
      id: 'q11',
      level: 2,
      question: 'Mennyi 250 Ft-nak a 20%-a?',
      options: [
        '50 Ft',
        '25 Ft',
        '75 Ft',
        '20 Ft'
      ],
      correctAnswer: 0,
      hint: 'A 20% az ötödrész (250 : 5 = ?), vagy 1% = 2,5 Ft, 2,5 · 20 = ?',
      explanation: '20% = 1/5 rész. 250 : 5 = 50 Ft (vagy 250 · 0,20 = 50 Ft).'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Melyik számnak a 20%-a a 40?',
      options: [
        '200',
        '160',
        '80',
        '240'
      ],
      correctAnswer: 0,
      hint: 'Ha a 20% az 40, akkor az 1% az 40 : 20 = 2. Mennyi a 100%?',
      explanation: '1% = 40 : 20 = 2. A 100% (az alap): 2 · 100 = 200.'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Egy 30 fős osztályban 12 tanuló szemüveges. Az osztály hány százaléka szemüveges?',
      options: [
        '40%-a',
        '30%-a',
        '25%-a',
        '36%-a'
      ],
      correctAnswer: 0,
      hint: 'Írd fel törtként: 12 / 30, egyszerűsítsd 3-mal, majd bővítsd 100-ra!',
      explanation: '12 / 30 = 4 / 10 = 40 / 100 = 40%.'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Mennyi 450-nek a 40%-a?',
      options: [
        '180',
        '160',
        '200',
        '190'
      ],
      correctAnswer: 0,
      hint: '10% = 45. Ennek a négyszerese: 45 · 4 = ?',
      explanation: '10% = 450 : 10 = 45. A 40% ennek négyszerese: 45 · 4 = 180 (vagy 450 · 0,4 = 180).'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Melyik összegnek a 75%-a a 900 Ft?',
      options: [
        '1200 Ft',
        '1100 Ft',
        '1500 Ft',
        '1000 Ft'
      ],
      correctAnswer: 0,
      hint: 'A 75% az 3/4 rész. Ha 3 rész = 900 Ft, mennyi 4 rész?',
      explanation: '3/4 rész = 900 Ft ⟹ 1/4 rész = 300 Ft ⟹ a 4/4 rész (100%): 300 · 4 = 1200 Ft.'
    },
    {
      id: 'q16',
      level: 2,
      question: '15 perc az 1 órának hány százaléka?',
      options: [
        '25%-a',
        '15%-a',
        '20%-a',
        '30%-a'
      ],
      correctAnswer: 0,
      hint: '1 óra = 60 perc. 15 / 60 hányadrész és hány %?',
      explanation: '15 perc / 60 perc = 1/4 rész = 25%.'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Egy 16 000 Ft-os cipő árát 15%-kal leszállították. Hány forint a kedvezmény?',
      options: [
        '2400 Ft',
        '1600 Ft',
        '3200 Ft',
        '2000 Ft'
      ],
      correctAnswer: 0,
      hint: '10% = 1600 Ft, 5% = 800 Ft. 15% = 1600 + 800 = ?',
      explanation: '16 000 Ft 10%-a 1600 Ft, 5%-a 800 Ft. A 15% kedvezmény: 1600 + 800 = 2400 Ft (vagy 16 000 · 0,15 = 2400 Ft).'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Az előző feladat alapján (16 000 Ft-os cipő, 2400 Ft kedvezmény): mennyibe kerül a cipő az akcióban?',
      options: [
        '13 600 Ft',
        '14 000 Ft',
        '14 400 Ft',
        '12 800 Ft'
      ],
      correctAnswer: 0,
      hint: 'Vond ki a kedvezményt: 16 000 - 2400 = ?',
      explanation: 'Új ár: 16 000 - 2400 = 13 600 Ft (ami az eredeti ár 85%-a).'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Egy iskolában 240 fiú tanul, ami az összes tanuló 60%-a. Hány tanuló jár az iskolába?',
      options: [
        '400 tanuló',
        '360 tanuló',
        '480 tanuló',
        '300 tanuló'
      ],
      correctAnswer: 0,
      hint: '240 : 60 = 4 (ez az 1%). Mennyi a 100%?',
      explanation: '1% = 240 : 60 = 4 tanuló. Az egész iskola (100%): 4 · 100 = 400 tanuló.'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Egy dolgozatban a maximális 50 pontból Gergő 42 pontot ért el. Hány százalékos lett az eredménye?',
      options: [
        '84%-os',
        '82%-os',
        '80%-os',
        '86%-os'
      ],
      correctAnswer: 0,
      hint: '42 / 50 bővítsd 2-vel, hogy a nevező 100 legyen!',
      explanation: '42 / 50 = (42 · 2) / (50 · 2) = 84 / 100 = 84%.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Összetett feladatok, 100% felett és trükkök)
    // ==========================================
    {
      id: 'q21',
      level: 3,
      question: 'Egy termék árát először 20%-kal felemelték, majd az új árat 20%-kal leszállították. Hogyan változott az ára az eredetihez képest?',
      options: [
        '4%-kal csökkent',
        'Nem változott, ugyanannyi maradt',
        '4%-kal nőtt',
        '2%-kal csökkent'
      ],
      correctAnswer: 0,
      hint: 'Indulj ki 100 Ft-ból! +20% ⟹ 120 Ft. 120 Ft-nak a 20%-a: 24 Ft. 120 - 24 = ?',
      explanation: 'Tegyük fel, hogy az ár 100 Ft volt. +20% után: 120 Ft. A 120 Ft-nak a 20%-a 24 Ft. 120 - 24 = 96 Ft. Az eredeti 100 Ft-hoz képest 4 Ft-tal, vagyis 4%-kal csökkent!'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Egy kabát akciós ára 20% kedvezmény után 24 000 Ft. Mennyi volt az eredeti ára a leértékelés előtt?',
      options: [
        '30 000 Ft',
        '28 800 Ft',
        '32 000 Ft',
        '26 000 Ft'
      ],
      correctAnswer: 0,
      hint: '20% kedvezmény után az ár a 80%-nak felel meg. 24 000 : 80 = 300 Ft (1%).',
      explanation: 'Az akciós ár az eredeti ár 80%-a (100% - 20% = 80%). 1% = 24 000 : 80 = 300 Ft. Eredeti ár (100%): 300 · 100 = 30 000 Ft.'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Mennyi 500-nak a 120%-a?',
      options: [
        '600',
        '550',
        '620',
        '700'
      ],
      correctAnswer: 0,
      hint: '100% = 500, +20% = 100. Vagy 500 · 1,20 = ?',
      explanation: '500 · 1,20 = 600 (a 100% feletti százalék az egésznél nagyobb értéket ad).'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Egy falu lakossága 1500 főről 1800 főre nőtt. Hány százalékkal növekedett a lakosság száma?',
      options: [
        '20%-kal',
        '25%-kal',
        '30%-kal',
        '15%-kal'
      ],
      correctAnswer: 0,
      hint: 'A növekedés: 1800 - 1500 = 300 fő. Mennyi 300 / 1500?',
      explanation: 'A növekedés 300 fő. A kiindulási alaphoz (1500 főhöz) viszonyítva: 300 / 1500 = 1/5 = 20%.'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Ha egy számot megszorzunk 0,85-tel, a szám hány százalékát kapjuk meg?',
      options: [
        'A 85%-át (ami 15% csökkenést jelent)',
        'A 15%-át',
        'A 8,5%-át',
        'A 185%-át'
      ],
      correctAnswer: 0,
      hint: '0,85 = 85 / 100 = 85%.',
      explanation: 'A 0,85 tizedestört 85%-ot jelent. Ez megfelel egy 15%-os csökkenésnek (100% - 15% = 85%).'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Egy 500 grammos cukros oldat 15% cukrot tartalmaz. Hány gramm cukor van benne?',
      options: [
        '75 gramm',
        '50 gramm',
        '150 gramm',
        '60 gramm'
      ],
      correctAnswer: 0,
      hint: '10% = 50 g, 5% = 25 g. 50 + 25 = ?',
      explanation: '500 · 0,15 = 75 gramm cukrot tartalmaz.'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Melyik szám nagyobb: a 60-nak a 40%-a vagy a 40-nek a 60%-a?',
      options: [
        'Egyenlőek (mindkettő 24)',
        'A 60-nak a 40%-a nagyobb',
        'A 40-nek a 60%-a nagyobb',
        'Nem hasonlíthatóak össze'
      ],
      correctAnswer: 0,
      hint: 'Számold ki: 60 · 0,40 = ? és 40 · 0,60 = ?',
      explanation: '60 · 0,40 = 24 és 40 · 0,60 = 24. A szorzás felcserélhetősége miatt x%-a y-nak mindig egyenlő y%-a x-nek!'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy téglalap hosszúságát 10%-kal megnöveltük, szélességét 10%-kal csökkentettük. Hogyan változott a területe?',
      options: [
        '1%-kal csökkent',
        'Nem változott',
        '1%-kal nőtt',
        '2%-kal csökkent'
      ],
      correctAnswer: 0,
      hint: 'Új terület: 1,1 · 0,9 = 0,99-szerese az eredetinek.',
      explanation: 'Új hossz: 1,1 · a, új szélesség: 0,9 · b. Új terület: 1,1 · 0,9 · (a · b) = 0,99 · T, ami 99%-a az eredetinek, azaz 1%-kal csökkent.'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Egy könyv árát 25%-kal felemelték. Hány százalékkal kellene most csökkenteni az új árat, hogy visszakapjuk az eredeti árat?',
      options: [
        '20%-kal',
        '25%-kal',
        '15%-kal',
        '30%-kal'
      ],
      correctAnswer: 0,
      hint: '100 Ft-ból 125 Ft lett. A 25 Ft visszacsökkentés a 125 Ft-nak mekkora része? 25 / 125 = ?',
      explanation: '100 Ft-ról 125 Ft-ra nőtt (+25 Ft). Hogy 125-ről visszaessünk 100-ra, 25 Ft-ot kell levonni. 25 / 125 = 1/5 = 20%-os csökkentés szükséges!'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy osztály létszáma 25 fő. Egy napon 4 tanuló hiányzott. A hiányzók a jelenlévők hány százalékát teszik ki?',
      options: [
        'Kb. 19%-át (4 / 21 · 100%)',
        '16%-át (4 / 25)',
        '20%-át',
        '25%-át'
      ],
      correctAnswer: 0,
      hint: 'Figyeld meg jól a kérdés alapját! Nem az egész osztályhoz, hanem a JELENLÉVŐKHÖZ viszonyítunk (25 - 4 = 21 fő).',
      explanation: 'A jelenlévők száma: 25 - 4 = 21 fő. A hiányzók (4 fő) a jelenlévők (21 fő) arányában: 4 / 21 ≈ 0,1905 = kb. 19%-ot tesz ki (míg az egész osztálynak a 16%-a).'
    }
  ];

  return (
    <QuizTemplate
      title="Százalékszámítás kvíz"
      subtitle="Gyakorold a százalékérték, százalékalap és százalékláb kiszámítását 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🏆 KVÍZ"
      themeColor="rose"
      category="Százalékszámítás"
      topicTitle="Százalékszámítás"
      questions={questions}
      matcherComponent={PercentageMatcher}
      sorterComponent={PercentageSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PercentageQuiz;
