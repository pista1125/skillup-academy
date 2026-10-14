import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { ProportionalDivisionMatcher } from './ProportionalDivisionMatcher';
import { ProportionalDivisionSorter } from './ProportionalDivisionSorter';

interface ProportionalDivisionQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const divisionCheatSheetContent: CheatSheetContent = {
  title: 'Szabálytár: Arányos Osztás',
  sections: [
    {
      title: '1. A 4 lépéses alapszabály',
      content:
        '1. lépés: Összeadjuk az arány tagjait: Összes rész = a + b.\n2. lépés: Kiszámítjuk 1 rész értékét: 1 rész = Teljes mennyiség / (a + b).\n3. lépés: Kiszámítjuk a részeket: Rész 1 = a · (1 rész), Rész 2 = b · (1 rész).\n4. lépés: Ellenőrzés: Rész 1 + Rész 2 = Teljes mennyiség, és Rész 1 : Rész 2 = a : b.'
    },
    {
      title: '2. Többtagú arányos osztás',
      content:
        'Három vagy több rész esetén ugyanígy járunk el: Összes rész = a + b + c.\nPéldául háromszög szögei: Összeg = 180°. Ha az arány 1 : 2 : 3, akkor 6 rész = 180° -> 1 rész = 30°.'
    },
    {
      title: '3. Különbség típusú feladatok',
      content:
        'Ha nem az összeg, hanem a részek különbsége adott (pl. az egyik 24-gyel több a másiknál, arányuk 5 : 2):\n1. Kivonjuk a tagokat: 5 rész - 2 rész = 3 rész.\n2. 3 rész = 24 -> 1 rész = 8.\n3. Számok: 5 · 8 = 40 és 2 · 8 = 16.'
    },
    {
      title: '4. Geometriai összefüggések',
      content:
        'Téglalap oldalai esetén a kerület fele (félkerület: a + b = K / 2) osztandó szét az oldalak arányában!\nKiegészítő szögek összege = 180°, pótszögek összege = 90°.'
    }
  ]
};

const divisionQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'pd-q1',
    level: 1,
    question: 'Mi a legelső lépés, amikor egy adott mennyiséget megadott arány szerint osztunk szét?',
    options: [
      'Az arány tagjainak összeadása (az összes arányrész kiszámítása)',
      'A teljes összeg megszorzása az arány első tagjával',
      'Az arány tagjainak kivonása egymásból',
      'Az ellenőrzés elvégzése a kapott számokkal'
    ],
    correctAnswer: 0,
    hint: 'Gondolj arra: először tudnunk kell, hány egyenlő darabra vágjuk az egészet!',
    explanation: 'Az arányos osztás 1. lépése mindig az arány tagjainak összeadása (a + b), amiből megtudjuk, összesen hány egyenlő részre osztjuk a mennyiséget.'
  },
  {
    id: 'pd-q2',
    level: 1,
    question: 'Ha egy zsebpénzt 3 : 5 arányban kell szétosztani két testvér között, hány egyenlő részre osztjuk a teljes összeget?',
    options: ['8 részre', '15 részre', '2 részre', '5 részre'],
    correctAnswer: 0,
    hint: 'Add össze a két aránytagot: 3 + 5 = ?',
    explanation: 'Az arány tagjainak összege 3 + 5 = 8, tehát az egészet 8 egyenlő részre osztjuk szét.'
  },
  {
    id: 'pd-q3',
    level: 1,
    question: '2000 Ft-ot szeretnénk szétosztani 1 : 4 arányban. Mennyi 1 arányrész értéke?',
    options: ['400 Ft', '500 Ft', '200 Ft', '250 Ft'],
    correctAnswer: 0,
    hint: 'Összesen 1 + 4 = 5 rész van. Mennyi 2000 Ft osztva 5-tel?',
    explanation: 'Az összes rész száma 1 + 4 = 5 rész. Egy rész értéke: 2000 Ft : 5 = 400 Ft.'
  },
  {
    id: 'pd-q4',
    level: 1,
    question: '1000 Ft-ot osztunk szét két barát között 2 : 3 arányban. Mennyi pénz jut a két félnek?',
    options: [
      '400 Ft és 600 Ft',
      '300 Ft és 700 Ft',
      '200 Ft és 800 Ft',
      '500 Ft és 500 Ft'
    ],
    correctAnswer: 0,
    hint: 'Összesen 5 rész van. 1 rész = 1000 / 5 = 200 Ft. Szorozz 2-vel és 3-mal!',
    explanation: '1. Összes rész: 2 + 3 = 5 rész. 2. Egy rész: 1000 : 5 = 200 Ft. 3. Részek: 2 · 200 = 400 Ft és 3 · 200 = 600 Ft.',
    figure: (
      <svg viewBox="0 0 200 40" className="w-52 h-10 mx-auto my-1">
        <rect x="10" y="8" width="72" height="24" rx="4" fill="#f59e0b" />
        <rect x="86" y="8" width="104" height="24" rx="4" fill="#3b82f6" />
        <text x="46" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2 rész</text>
        <text x="138" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3 rész</text>
      </svg>
    )
  },
  {
    id: 'pd-q5',
    level: 1,
    question: 'Egy 60 cm hosszú szalagot 1 : 2 arányban két darabra vágunk. Milyen hosszú a rövidebb darab?',
    options: ['20 cm', '30 cm', '15 cm', '10 cm'],
    correctAnswer: 0,
    hint: 'A szalagot 1 + 2 = 3 részre osztjuk. Mennyi 60 cm harmada?',
    explanation: 'A szalag 1 + 2 = 3 egyenlő részből áll. 1 rész hossza 60 cm : 3 = 20 cm. A rövidebb darab pontosan 1 rész, így 20 cm hosszú.'
  },
  {
    id: 'pd-q6',
    level: 1,
    question: 'Hogyan ellenőrizhetjük legbiztosabban, hogy helyes-e az arányos osztásunk eredménye?',
    options: [
      'A kapott részek összegének ki kell adnia az egészet, és arányuknak meg kell egyeznie a megadott aránnyal',
      'Elég kivonni a kisebbiket a nagyobbikból',
      'Megszorozzuk a kapott számokat egymással',
      'Ha mindkét szám páros, akkor biztosan helyes'
    ],
    correctAnswer: 0,
    hint: 'Két dolgot kell ellenőrizni: az összeget és az egyszerűsített arányt.',
    explanation: 'A kettős ellenőrzés: 1. A részek összege megegyezik a kiindulási mennyiséggel. 2. A részek aránya egyszerűsítve pontosan a kiindulási arányt adja.'
  },
  {
    id: 'pd-q7',
    level: 1,
    question: 'Két testvér 15 szem cukorkán osztozik 2 : 3 arányban. Hány cukorkát kap a nagyobbik résszel rendelkező testvér?',
    options: ['9 szemet', '6 szemet', '10 szemet', '8 szemet'],
    correctAnswer: 0,
    hint: 'Összesen 5 rész van. 1 rész = 15 / 5 = 3 szem. A nagyobbik aránytag a 3!',
    explanation: '1 rész = 15 : 5 = 3 szem. A nagyobbik tag 3 rész, tehát 3 · 3 = 9 szem cukorkát kap.'
  },
  {
    id: 'pd-q8',
    level: 1,
    question: '1200 Ft-ot szétosztunk 1 : 3 arányban. Mennyi a NAGYOBBIK rész értéke?',
    options: ['900 Ft', '800 Ft', '600 Ft', '1000 Ft'],
    correctAnswer: 0,
    hint: 'Összesen 1 + 3 = 4 rész van. 1 rész = 300 Ft. A nagyobbik 3 rész!',
    explanation: 'Összes rész: 1 + 3 = 4 rész. Egy rész: 1200 : 4 = 300 Ft. A nagyobbik rész 3 · 300 Ft = 900 Ft.'
  },
  {
    id: 'pd-q9',
    level: 1,
    question: 'Ha egy arányos osztásnál 1 arányrész értéke 150 Ft, és az arány 3 : 5, mekkora volt a teljes szétosztott összeg?',
    options: ['1200 Ft', '800 Ft', '1500 Ft', '1000 Ft'],
    correctAnswer: 0,
    hint: 'Hány rész van összesen? 3 + 5 = 8 rész. Szorozd meg 150-nel!',
    explanation: 'Az összes rész száma 3 + 5 = 8 rész. A teljes összeg: 8 · 150 Ft = 1200 Ft.'
  },
  {
    id: 'pd-q10',
    level: 1,
    question: 'Egy 40 fős csoportban a fiúk és a lányok aránya 1 : 1. Hány fiú és hány lány van a csoportban?',
    options: [
      '20 fiú és 20 lány',
      '15 fiú és 25 lány',
      '10 fiú és 30 lány',
      '18 fiú és 22 lány'
    ],
    correctAnswer: 0,
    hint: 'Az 1 : 1 arány azt jelenti, hogy pontosan egyenlő a számuk.',
    explanation: 'Az 1 : 1 arány fele-fele arányt jelent. 40 : 2 = 20, így 20 fiú és 20 lány van.'
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ==========================================
  {
    id: 'pd-q11',
    level: 2,
    question: 'Két kiegészítő szög összege 180°. Arányuk 2 : 7. Mekkora a kisebbik szög?',
    options: ['40°', '20°', '50°', '70°'],
    correctAnswer: 0,
    hint: 'Összes rész: 2 + 7 = 9. 1 rész: 180° / 9 = 20°. A kisebbik szög 2 rész!',
    explanation: 'Összes rész: 2 + 7 = 9 rész. 1 rész értéke: 180° : 9 = 20°. A kisebbik szög: 2 · 20° = 40° (a nagyobbik 7 · 20° = 140°).',
    figure: (
      <svg viewBox="0 0 160 80" className="w-40 h-20 mx-auto my-1">
        <line x1="10" y1="70" x2="150" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <line x1="80" y1="70" x2="130" y2="15" stroke="#f59e0b" strokeWidth="3" />
        <path d="M 110,70 A 30 30 0 0 0 102,46" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <path d="M 102,46 A 30 30 0 0 0 50,70" fill="none" stroke="#3b82f6" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 'pd-q12',
    level: 2,
    question: 'Egy derékszöget (90°) két szögre osztunk 1 : 4 arányban. Mekkora a nagyobbik szög?',
    options: ['72°', '60°', '75°', '80°'],
    correctAnswer: 0,
    hint: 'Összesen 1 + 4 = 5 rész van. 1 rész = 90° / 5 = 18°. A nagyobbik 4 rész!',
    explanation: 'Összes rész: 1 + 4 = 5 rész. Egy rész: 90° : 5 = 18°. A nagyobbik szög: 4 · 18° = 72°.'
  },
  {
    id: 'pd-q13',
    level: 2,
    question: 'Egy téglalap kerülete 60 cm. Két szomszédos oldalának aránya 2 : 3. Mekkorák az oldalai?',
    options: [
      'a = 12 cm és b = 18 cm',
      'a = 24 cm és b = 36 cm',
      'a = 10 cm és b = 15 cm',
      'a = 15 cm és b = 20 cm'
    ],
    correctAnswer: 0,
    hint: 'Vigyázat! A félkerületet (a + b = 30 cm) kell szétosztani 2 : 3 arányban!',
    explanation: 'A téglalap félkerülete a + b = 60 : 2 = 30 cm. Összes rész: 2 + 3 = 5 rész. Egy rész: 30 : 5 = 6 cm. Oldalak: a = 2 · 6 = 12 cm és b = 3 · 6 = 18 cm.'
  },
  {
    id: 'pd-q14',
    level: 2,
    question: 'Egy 24 fős csoportban a fiúk és a lányok aránya 3 : 5. Hánnyal több lány van a csoportban, mint fiú?',
    options: ['6-tal több', '4-gyel több', '5-tel több', '8-cal több'],
    correctAnswer: 0,
    hint: 'Összes rész: 3 + 5 = 8 rész. 1 rész = 24 / 8 = 3 fő. A lányok és fiúk részének különbsége: 5 - 3 = 2 rész.',
    explanation: 'Összes rész: 3 + 5 = 8 rész. Egy rész: 24 : 8 = 3 fő. Fiúk: 3 · 3 = 9 fő, Lányok: 5 · 3 = 15 fő. A különbség: 15 - 9 = 6 fő.'
  },
  {
    id: 'pd-q15',
    level: 2,
    question: 'Egy szörpös üdítő 1 : 4 arányban tartalmaz gyümölcsszörpöt és vizet. Hány deciliter szörp szükséges 25 dl kész üdítőhöz?',
    options: ['5 dl', '4 dl', '6 dl', '10 dl'],
    correctAnswer: 0,
    hint: 'A teljes ital 1 + 4 = 5 részből áll. 25 dl / 5 = ?',
    explanation: 'A teljes ital 1 + 4 = 5 rész. Egy rész értéke: 25 dl : 5 = 5 dl. Mivel a szörp 1 rész, ezért pontosan 5 dl szörp kell.'
  },
  {
    id: 'pd-q16',
    level: 2,
    question: '4500 Ft-ot osztunk szét három személy között 1 : 2 : 3 arányban. Mennyi pénzt kap a középső személy?',
    options: ['1500 Ft', '1000 Ft', '2000 Ft', '750 Ft'],
    correctAnswer: 0,
    hint: 'Összes rész: 1 + 2 + 3 = 6 rész. 1 rész = 4500 / 6 = 750 Ft. A középső személy 2 részt kap!',
    explanation: 'Összes rész: 1 + 2 + 3 = 6 rész. Egy rész: 4500 : 6 = 750 Ft. A középső személy 2 részt kap: 2 · 750 Ft = 1500 Ft.'
  },
  {
    id: 'pd-q17',
    level: 2,
    question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 4. Mekkorák a háromszög szögei? (A belső szögek összege 180°.)',
    options: [
      '40°, 60° és 80°',
      '30°, 60° és 90°',
      '45°, 45° és 90°',
      '50°, 60° és 70°'
    ],
    correctAnswer: 0,
    hint: 'Összes rész: 2 + 3 + 4 = 9 rész. 180° / 9 = 20°. Szorozz 2-vel, 3-mal és 4-gyel!',
    explanation: 'Összes rész: 2 + 3 + 4 = 9 rész. 1 rész: 180° : 9 = 20°. A szögek: 2 · 20° = 40°, 3 · 20° = 60° és 4 · 20° = 80°.'
  },
  {
    id: 'pd-q18',
    level: 2,
    question: 'Egy 90 cm-es huzalt 2 : 3 : 5 arányban három darabra vágunk. Milyen hosszú a leghosszabb darab?',
    options: ['45 cm', '40 cm', '50 cm', '35 cm'],
    correctAnswer: 0,
    hint: 'Összes rész: 2 + 3 + 5 = 10 rész. 1 rész: 90 / 10 = 9 cm. A leghosszabb darab 5 rész!',
    explanation: 'Összes rész: 2 + 3 + 5 = 10 rész. Egy rész: 90 cm : 10 = 9 cm. A leghosszabb darab 5 rész: 5 · 9 cm = 45 cm.'
  },
  {
    id: 'pd-q19',
    level: 2,
    question: 'Egy ötvözet 350 gramm tömegű, és rézből valamint ónból áll 5 : 2 arányban. Hány gramm ón van benne?',
    options: ['100 g', '250 g', '150 g', '70 g'],
    correctAnswer: 0,
    hint: '5 + 2 = 7 rész felel meg 350 grammnak. Az ón 2 rész!',
    explanation: 'Összes rész: 5 + 2 = 7 rész. Egy rész: 350 g : 7 = 50 g. Az ón tömege: 2 · 50 g = 100 g (a réz 250 g).'
  },
  {
    id: 'pd-q20',
    level: 2,
    question: 'Egy 200 oldalas könyv már elolvasott és még hátra lévő oldalainak aránya 3 : 7. Hány oldalt olvasott el eddig az olvasó?',
    options: ['60 oldalt', '140 oldalt', '70 oldalt', '50 oldalt'],
    correctAnswer: 0,
    hint: 'Összes rész: 3 + 7 = 10 rész. 1 rész: 200 / 10 = 20 oldal. Az elolvasott rész 3 egység!',
    explanation: 'Összes rész: 3 + 7 = 10 rész. Egy rész: 200 : 10 = 20 oldal. Az elolvasott oldalak száma: 3 · 20 = 60 oldal.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'pd-q21',
    level: 3,
    question: 'Két szám aránya 7 : 3. Tudjuk, hogy a nagyobbik szám 24-gyel több a kisebbiknél. Mennyi a két szám összege?',
    options: ['60', '54', '72', '48'],
    correctAnswer: 0,
    hint: 'A részek különbsége 7 - 3 = 4 rész. Ez a 4 rész felel meg 24-nek! Mennyi 1 rész?',
    explanation: 'A részek különbsége: 7 - 3 = 4 rész. Mivel 4 rész = 24, így 1 rész = 6. A két szám: 7 · 6 = 42 és 3 · 6 = 18. Összegük: 42 + 18 = 60.'
  },
  {
    id: 'pd-q22',
    level: 3,
    question: 'Egy háromszög kerülete 36 cm, oldalainak aránya 3 : 4 : 5. Milyen háromszög ez, és mekkora a leghosszabb oldala?',
    options: [
      'Derékszögű háromszög, leghosszabb oldala 15 cm',
      'Egyenlő szárú háromszög, leghosszabb oldala 16 cm',
      'Tompaszögű háromszög, leghosszabb oldala 14 cm',
      'Szabályos háromszög, minden oldala 12 cm'
    ],
    correctAnswer: 0,
    hint: '3 + 4 + 5 = 12 rész. 36 / 12 = 3 cm. Az oldalak: 9 cm, 12 cm, 15 cm. Ellenőrizd a Pitagorasz-tételt: 9² + 12² = 15²!',
    explanation: 'Összes rész: 3 + 4 + 5 = 12 rész. 1 rész: 36 : 12 = 3 cm. Oldalak: 9 cm, 12 cm, 15 cm. Mivel 9² + 12² = 81 + 144 = 225 = 15², a háromszög derékszögű, leghosszabb oldala (átfogója) 15 cm.'
  },
  {
    id: 'pd-q23',
    level: 3,
    question: 'Egy nyereményt három barát között osztanak szét 2 : 5 : 7 arányban. A legnagyobb rész 35 000 Ft-tal több a legkisebb résznél. Mennyi volt a teljes nyeremény összege?',
    options: ['98 000 Ft', '70 000 Ft', '105 000 Ft', '84 000 Ft'],
    correctAnswer: 0,
    hint: 'A legnagyobb és legkisebb tag különbsége: 7 - 2 = 5 rész. 5 rész felel meg 35 000 Ft-nak!',
    explanation: 'A részek különbsége: 7 - 2 = 5 rész. 5 rész = 35 000 Ft -> 1 rész = 7 000 Ft. Az összes rész: 2 + 5 + 7 = 14 rész. Teljes összeg: 14 · 7 000 Ft = 98 000 Ft.'
  },
  {
    id: 'pd-q24',
    level: 3,
    question: 'Egy téglalap kerülete 120 cm, szomszédos oldalainak aránya 1 : 5. Mennyi a téglalap területe?',
    options: ['500 cm²', '600 cm²', '400 cm²', '250 cm²'],
    correctAnswer: 0,
    hint: 'Félkerület: a + b = 60 cm. 1 + 5 = 6 rész -> 1 rész = 10 cm. Számítsd ki a területet: a · b!',
    explanation: 'A félkerület a + b = 120 : 2 = 60 cm. 1 + 5 = 6 rész -> 1 rész = 10 cm. Oldalak: a = 10 cm, b = 50 cm. Terület: T = a · b = 10 cm · 50 cm = 500 cm².'
  },
  {
    id: 'pd-q25',
    level: 3,
    question: 'Egy 800 grammos süteménytésztában a liszt, a vaj és a cukor aránya 5 : 2 : 1. Hány gramm liszt található ebben a tésztában?',
    options: ['500 g', '450 g', '400 g', '550 g'],
    correctAnswer: 0,
    hint: 'Összesen 5 + 2 + 1 = 8 rész felel meg 800 grammnak. Mennyi 5 rész liszt?',
    explanation: 'Összes rész: 5 + 2 + 1 = 8 rész. Egy rész: 800 g : 8 = 100 g. A liszt 5 rész, így 5 · 100 g = 500 g liszt van a tésztában.'
  },
  {
    id: 'pd-q26',
    level: 3,
    question: 'Egy iskola 6. évfolyamán az A, B és C osztályok létszámának aránya 5 : 6 : 7. A C osztályba 6-tal több tanuló jár, mint az A osztályba. Hány hatodikos tanuló van összesen az iskolában?',
    options: ['54 tanuló', '60 tanuló', '48 tanuló', '72 tanuló'],
    correctAnswer: 0,
    hint: 'A C és A aránytagjainak különbsége: 7 - 5 = 2 rész. Ez a 2 rész jelent 6 tanulót!',
    explanation: 'A C és A osztályok különbsége: 7 - 5 = 2 rész. Mivel 2 rész = 6 tanuló, így 1 rész = 3 tanuló. Összes tanuló (5 + 6 + 7 = 18 rész): 18 · 3 = 54 tanuló.'
  },
  {
    id: 'pd-q27',
    level: 3,
    question: 'Egy édesapa 12 000 Ft zsebpénzt oszt szét két gyermeke között az életkoruk arányában. A kisebbik 8 éves, a nagyobbik 12 éves. Mennyi pénzt kap a nagyobbik gyermek?',
    options: ['7200 Ft', '6000 Ft', '8000 Ft', '6800 Ft'],
    correctAnswer: 0,
    hint: 'Egyszerűsítsd az életkorok arányát: 8 : 12 = 2 : 3. Összesen 5 rész van!',
    explanation: 'Az arány 8 : 12 = 2 : 3. Összes rész: 2 + 3 = 5 rész. Egy rész: 12 000 Ft : 5 = 2400 Ft. A nagyobbik gyermek (3 rész): 3 · 2400 Ft = 7200 Ft.'
  },
  {
    id: 'pd-q28',
    level: 3,
    question: 'Egy derékszögű háromszög két hegyesszögének aránya 4 : 5. Mekkora a háromszög legkisebb szöge?',
    options: ['40°', '50°', '35°', '45°'],
    correctAnswer: 0,
    hint: 'Egy derékszögű háromszög két hegyesszögének összege 90°. Oszd szét a 90°-ot 4 : 5 arányban!',
    explanation: 'A két hegyesszög összege 90°. Összes rész: 4 + 5 = 9 rész. Egy rész: 90° : 9 = 10°. A legkisebb szög 4 rész: 4 · 10° = 40° (a másik 50°).'
  },
  {
    id: 'pd-q29',
    level: 3,
    question: 'Egy baromfiudvarban a tyúkok és kacsák aránya 7 : 3. Ha vesznek még 10 kacsát, az arány 7 : 5-re változik. Hány tyúk van az udvarban?',
    options: ['35 tyúk', '42 tyúk', '28 tyúk', '50 tyúk'],
    correctAnswer: 0,
    hint: 'A tyúkok száma nem változott (maradt 7 rész). A kacsák 3 részről 5 részre nőttek, ez a 2 rész növekedés a 10 kacsa!',
    explanation: 'A tyúkok száma változatlan (7 rész). A kacsák arányrésze 3-ról 5-re nőtt, azaz 2 résszel gyarapodott. Ez a 2 rész felel meg 10 kacsának, így 1 rész = 5 szárnyas. A tyúkok száma: 7 · 5 = 35 tyúk.'
  },
  {
    id: 'pd-q30',
    level: 3,
    question: '1800 Ft-ot osztunk szét három diák között úgy, hogy az 1. és 2. diák pénzének aránya 1 : 2, a 2. és 3. diák pénzének aránya 2 : 3. Mennyi pénzt kap a 3. diák?',
    options: ['900 Ft', '600 Ft', '800 Ft', '1000 Ft'],
    correctAnswer: 0,
    hint: 'Mivel a 2. diák mindkét arányban 2 rész, az összetett arány 1 : 2 : 3! Összesen 6 rész van.',
    explanation: 'Az összetett arány 1 : 2 : 3. Összes rész: 1 + 2 + 3 = 6 rész. Egy rész: 1800 Ft : 6 = 300 Ft. A 3. diák 3 részt kap: 3 · 300 Ft = 900 Ft.'
  }
];

export const ProportionalDivisionQuiz: React.FC<ProportionalDivisionQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId="g6-ratio-division"
      topicTitle="Arányos osztás"
      title="Arányos osztás kvíz"
      subtitle="Mennyiségek szétosztása megadott arányban: pénzek, szögek, keverékek 3 szinten"
      emoji="➗"
      themeColor="amber"
      topicBadge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK"
      badgeText="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK"
      cheatSheetTitle="Szabálytár és Képlettár"
      cheatSheet={divisionCheatSheetContent}
      cheatSheetCards={[
        {
          title: 'A 4 lépéses szabály',
          formula: 'Összes rész = a + b',
          explanation: '1. Összeadjuk a tagokat. 2. 1 rész = Egész / (a + b). 3. Kiszámoljuk a részeket. 4. Ellenőrzünk.'
        },
        {
          title: 'Téglalap oldalai',
          formula: 'Félkerület = a + b = K / 2',
          explanation: 'Kerület esetén először mindig a félkerületet számítjuk ki, és azt osztjuk szét az oldalak arányában.'
        },
        {
          title: 'Háromszög belső szögei',
          formula: 'α + β + γ = 180°',
          explanation: 'Háromszög szögeinél az összeg mindig 180°. Ezt osztjuk szét a három aránytag (a : b : c) összegével.'
        },
        {
          title: 'Különbség típus',
          formula: 'Különbség = a - b rész',
          explanation: 'Ha a részek különbsége ismert, a tagok különbségével osztjuk el a többletet, így kapjuk az 1 rész értékét.'
        }
      ]}
      questions={divisionQuestions}
      matcherComponent={ProportionalDivisionMatcher}
      sorterComponent={ProportionalDivisionSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
export default ProportionalDivisionQuiz;
