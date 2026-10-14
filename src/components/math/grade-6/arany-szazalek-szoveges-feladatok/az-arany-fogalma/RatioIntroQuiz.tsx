import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { RatioIntroMatcher } from './RatioIntroMatcher';
import { RatioIntroSorter } from './RatioIntroSorter';

interface RatioIntroQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const ratioCheatSheetContent: CheatSheetContent = {
  title: 'Szabálytár: Az Arány Fogalma',
  sections: [
    {
      title: '1. Az arány definíciója',
      content:
        'Két mennyiség arányán a két mennyiség hányadosát (osztását) értjük. Megmutatja, hogy az első mennyiség hányszorosa a másodiknak, vagy mekkora része annak.\nJelölése: a : b  vagy tört alakban  a / b (ahol b ≠ 0).'
    },
    {
      title: '2. Előtag, utótag és sorrend',
      content:
        'Az a : b arányban az „a” az arány előtagja (első tagja), a „b” pedig az utótagja (második tagja).\nA sorrend szigorúan számít: a : b ≠ b : a (hacsak nem a = b).'
    },
    {
      title: '3. Bővítés és egyszerűsítés',
      content:
        'Ha az arány mindkét tagját ugyanazzal a 0-tól különböző számmal szorozzuk (bővítés) vagy osztjuk (egyszerűsítés), az arány értéke változatlan marad.\nEgyszerűsített alak: relatív prím pozitív egész számok aránya (pl. 12 : 18 = 2 : 3).'
    },
    {
      title: '4. Azonos mértékegységek aranyszabálya',
      content:
        'Különböző mértékegységű mennyiségek arányának felírása előtt mindkét mennyiséget azonos mértékegységre kell átváltani!\nPéldául: 20 cm : 1 m = 20 cm : 100 cm = 20 : 100 = 1 : 5.'
    },
    {
      title: '5. Többtagú arányok',
      content:
        'Három vagy több mennyiség egyidejű összehasonlításakor többtagú arányt használunk (pl. a : b : c = 2 : 3 : 5).\nA tagok összege (2 + 3 + 5 = 10) az egész egységeinek teljes számát adja meg.'
    }
  ]
};

const ratioQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'ri-q1',
    level: 1,
    question: 'Mi az arány matematikai definíciója két mennyiség között?',
    options: [
      'A két mennyiség mérőszámának hányadosa (osztása)',
      'A két mennyiség mérőszámának összege',
      'A két mennyiség mérőszámának szorzata',
      'A két mennyiség különbsége kivonással'
    ],
    correctAnswer: 0,
    hint: 'Gondolj arra, hogyan hasonlítunk össze két számot osztással (hányszorosa vagy mekkora része).',
    explanation: 'Két mennyiség arányán a két mennyiség hányadosát értjük: megmutatja, hogy az első mennyiség hányszorosa a másodiknak, vagy hányad része annak.'
  },
  {
    id: 'ri-q2',
    level: 1,
    question: 'Hogyan jelöljük matematikailag az „a aránylik a b-hez” kifejezést?',
    options: [
      'a : b  vagy tört alakban  a / b',
      'a · b',
      'a + b',
      'a - b'
    ],
    correctAnswer: 0,
    hint: 'Az osztásjel (kettőspont) vagy a törtvonal fejezi ki az arányt.',
    explanation: 'Az arányt a : b alakban jelöljük (olvasd: „a aránylik a b-hez”), ami megegyezik az a/b közönséges tört alakú hányadossal.'
  },
  {
    id: 'ri-q3',
    level: 1,
    question: 'A 4 : 7 arányban mi az első tag (előtag), és mi a második tag (utótag)?',
    options: [
      'Az előtag: 4, az utótag: 7',
      'Az előtag: 7, az utótag: 4',
      'Mindkettő előtag',
      'Az előtag mindig a nagyobbik szám, tehát a 7'
    ],
    correctAnswer: 0,
    hint: 'A bal oldali szám az első tag (előtag), a jobb oldali pedig a második tag (utótag).',
    explanation: 'Az arány bal oldalán álló tagot előtagnak (4), a jobb oldalon álló tagot utótagot (7) nevezzük.'
  },
  {
    id: 'ri-q4',
    level: 1,
    question: 'Egy tálban 3 piros és 5 sárga golyó található. Mennyi a piros és a sárga golyók aránya?',
    options: ['3 : 5', '5 : 3', '3 : 8', '5 : 8'],
    correctAnswer: 0,
    hint: 'Ügyelj a megnevezések sorrendjére: először a piros, utána a sárga golyók száma.',
    explanation: 'Mivel 3 piros és 5 sárga golyó van, a pirosak és sárgák aránya 3 : 5.',
    figure: (
      <svg viewBox="0 0 200 60" className="w-48 h-14 mx-auto my-1">
        {/* 3 red balls */}
        <circle cx="20" cy="30" r="12" fill="#ef4444" />
        <circle cx="50" cy="30" r="12" fill="#ef4444" />
        <circle cx="80" cy="30" r="12" fill="#ef4444" />
        {/* 5 yellow balls */}
        <circle cx="115" cy="30" r="12" fill="#eab308" />
        <circle cx="138" cy="30" r="12" fill="#eab308" />
        <circle cx="161" cy="30" r="12" fill="#eab308" />
        <circle cx="178" cy="18" r="8" fill="#eab308" />
        <circle cx="178" cy="42" r="8" fill="#eab308" />
      </svg>
    )
  },
  {
    id: 'ri-q5',
    level: 1,
    question: 'Egy dobozban 3 kék és 5 zöld ceruza van. Mennyi a kék ceruzák aránya az ÖSSZES ceruzához képest?',
    options: ['3 : 8', '3 : 5', '5 : 8', '8 : 3'],
    correctAnswer: 0,
    hint: 'Számold ki az összes ceruza számát (3 + 5), és ehhez viszonyítsd a kékeket!',
    explanation: 'Az összes ceruza száma 3 + 5 = 8. A kék ceruzák (3) aránya az összeshez (8) képest 3 : 8 (azaz 3/8 része).'
  },
  {
    id: 'ri-q6',
    level: 1,
    question: 'Igaz-e, hogy a 2 : 5 arány megegyezik az 5 : 2 aránnyal?',
    options: [
      'Nem igaz, mert az arányban a tagok sorrendje szigorúan számít',
      'Igaz, mert a matematikai műveletekben a tagok felcserélhetők',
      'Igaz, mert mindkettőben a 2 és az 5 szerepel',
      'Csak negatív számok esetén lenne igaz'
    ],
    correctAnswer: 0,
    hint: 'Gondolj a hányadosokra: 2/5 = 0,4, míg 5/2 = 2,5. Egyenlőek?',
    explanation: 'Az arány hányados: 2 : 5 = 0,4, míg 5 : 2 = 2,5. Mivel az osztás nem felcserélhető, a tagok sorrendje szigorúan meghatározott.'
  },
  {
    id: 'ri-q7',
    level: 1,
    question: 'Hogyan egyszerűsíthetjük a 6 : 9 arányt legegyszerűbb alakúra?',
    options: [
      'Mindkét tagot elosztjuk 3-mal, így 2 : 3 lesz',
      'Mindkét tagot elosztjuk 2-vel, így 3 : 9 lesz',
      'Mindkét tagból kivonunk 3-at, így 3 : 6 lesz',
      'Ez az arány nem egyszerűsíthető tovább'
    ],
    correctAnswer: 0,
    hint: 'Keresd meg a 6 és a 9 legnagyobb közös osztóját!',
    explanation: 'A 6 és a 9 legnagyobb közös osztója a 3. Mindkét tagot elosztva 3-mal: (6 : 3) : (9 : 3) = 2 : 3.'
  },
  {
    id: 'ri-q8',
    level: 1,
    question: 'Melyik a 10 : 20 arány legegyszerűbb, relatív prím egész számokból álló alakja?',
    options: ['1 : 2', '2 : 4', '5 : 10', '2 : 1'],
    correctAnswer: 0,
    hint: 'Oszd el mindkét tagot 10-zel!',
    explanation: 'Mindkét tagot elosztva 10-zel: 10 : 20 = 1 : 2. Az 1 és a 2 relatív prímek, így ez a legegyszerűbb alak.'
  },
  {
    id: 'ri-q9',
    level: 1,
    question: 'Ha egy arány mindkét tagját megszorozzuk 4-gyel (bővítés), hogyan változik az arány értéke?',
    options: [
      'Nem változik, az arány értéke pontosan ugyanaz marad',
      'Négyszeresére nő',
      'Negyedére csökken',
      'Néggyel nagyobb lesz'
    ],
    correctAnswer: 0,
    hint: 'Gondolj a törtek bővítésére: 1/2 értéke megváltozik, ha 4/8-cá bővítjük?',
    explanation: 'Az arány mindkét tagjának ugyanazzal a nem nulla számmal való szorzásakor (bővítéskor) az arány értéke (hányadosa) változatlan marad.'
  },
  {
    id: 'ri-q10',
    level: 1,
    question: 'A magyar zászló 3 egyenlő szélességű vízszintes sávból áll: piros, fehér és zöld. Mi a három szín sávjainak aránya?',
    options: ['1 : 1 : 1', '3 : 1 : 1', '1 : 2 : 3', '3 : 3 : 3'],
    correctAnswer: 0,
    hint: 'Mindegyik sáv pontosan ugyanolyan széles, tehát egyenlő nagyságú.',
    explanation: 'Mivel mindhárom sáv egyforma kiterjedésű, az arányuk 1 : 1 : 1.',
    figure: (
      <svg viewBox="0 0 120 70" className="w-32 h-18 mx-auto my-1 rounded border border-slate-300">
        <rect x="0" y="0" width="120" height="23.33" fill="#ce2939" />
        <rect x="0" y="23.33" width="120" height="23.33" fill="#ffffff" />
        <rect x="0" y="46.66" width="120" height="23.34" fill="#477050" />
      </svg>
    )
  },

  // ==========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ==========================================
  {
    id: 'ri-q11',
    level: 2,
    question: 'Mennyi a legegyszerűbb alakja a 24 : 36 aránynak?',
    options: ['2 : 3', '4 : 6', '6 : 9', '3 : 2'],
    correctAnswer: 0,
    hint: 'A 24 és 36 legnagyobb közös osztója a 12.',
    explanation: 'A 24 és 36 legnagyobb közös osztója 12. Mindkét tagot elosztva 12-vel: (24 : 12) : (36 : 12) = 2 : 3.'
  },
  {
    id: 'ri-q12',
    level: 2,
    question: 'Bővítsd a 3 : 5 arányt úgy, hogy az első tag 15 legyen! Mi lesz a második tag?',
    options: ['25', '20', '30', '15'],
    correctAnswer: 0,
    hint: 'Hányszorosára nőtt az első tag (15 / 3)? Ugyanennyivel szorozd meg a második tagot is!',
    explanation: 'A 3-ból úgy lett 15, hogy megszoroztuk 5-tel. Ezért a második tagot is 5-tel kell szorozni: 5 · 5 = 25. Így 3 : 5 = 15 : 25.'
  },
  {
    id: 'ri-q13',
    level: 2,
    question: 'Mennyi a 20 cm és az 1 m aránya legegyszerűbb alakban?',
    options: ['1 : 5', '20 : 1', '1 : 20', '2 : 1'],
    correctAnswer: 0,
    hint: 'Váltsd át az 1 métert centiméterre (1 m = 100 cm), majd egyszerűsíts!',
    explanation: 'Először közös mértékegységre váltunk: 1 m = 100 cm. Az arány: 20 cm : 100 cm = 20 : 100 = 1 : 5.'
  },
  {
    id: 'ri-q14',
    level: 2,
    question: 'Mennyi a 15 perc és az 1 óra aránya a legegyszerűbb alakban?',
    options: ['1 : 4', '15 : 1', '1 : 15', '1 : 6'],
    correctAnswer: 0,
    hint: '1 óra = 60 perc. Írd fel a 15 : 60 arányt és egyszerűsíts!',
    explanation: '1 óra = 60 perc. Az arány: 15 perc : 60 perc = 15 : 60. Mindkét tagot 15-tel osztva kapjuk az 1 : 4 arányt (negyedóra).'
  },
  {
    id: 'ri-q15',
    level: 2,
    question: 'Mennyi a 250 g és az 1 kg aránya a legegyszerűbb alakban?',
    options: ['1 : 4', '250 : 1', '1 : 25', '1 : 2'],
    correctAnswer: 0,
    hint: '1 kg hány gramm? 1000 g! Egyszerűsítsd a 250 : 1000 arányt!',
    explanation: '1 kg = 1000 g. Az arány: 250 g : 1000 g = 250 : 1000 = 1 : 4 (negyed kilogramm).'
  },
  {
    id: 'ri-q16',
    level: 2,
    question: 'Szörpöt készítünk: 1 rész málnaszörphöz 7 rész vizet öntünk. Mekkora része a kész szörpös italnak a tiszta málnaszörp?',
    options: ['1/8 része', '1/7 része', '7/8 része', '1/6 része'],
    correctAnswer: 0,
    hint: 'Hány rész ital keletkezik összesen? 1 rész szörp + 7 rész víz = 8 rész!',
    explanation: 'A teljes ital 1 + 7 = 8 egyenlő részből áll. Ebből 1 rész a málnaszörp, így a szörp az egész ital 1/8 része.',
    figure: (
      <svg viewBox="0 0 100 120" className="w-24 h-28 mx-auto my-1">
        {/* Glass outline */}
        <polygon points="20,10 80,10 70,110 30,110" fill="none" stroke="#94a3b8" strokeWidth="3" />
        {/* Syrup level: bottom 1 part */}
        <polygon points="30,110 70,110 68,95 32,95" fill="#f43f5e" />
        {/* Water level: upper 7 parts */}
        <polygon points="32,95 68,95 78,20 22,20" fill="#38bdf8" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 'ri-q17',
    level: 2,
    question: 'Egy osztályban 12 fiú és 16 lány tanul. Mennyi a fiúk és a lányok aránya a legegyszerűbb alakban?',
    options: ['3 : 4', '4 : 3', '6 : 8', '12 : 16'],
    correctAnswer: 0,
    hint: 'Írd fel a 12 : 16 arányt, és oszd el mindkét számot 4-gyel!',
    explanation: 'A fiúk és lányok aránya 12 : 16. Mindkét tagot 4-gyel egyszerűsítve kapjuk a 3 : 4 arányt.'
  },
  {
    id: 'ri-q18',
    level: 2,
    question: 'Egy téglalap oldalainak hossza a = 6 cm és b = 9 cm. Mennyi az oldalak a : b aránya egyszerűsítve?',
    options: ['2 : 3', '3 : 2', '1 : 3', '6 : 9'],
    correctAnswer: 0,
    hint: 'Mindkét oldalhossz osztható 3-mal.',
    explanation: 'Az a : b arány 6 : 9. Mindkét tagot 3-mal osztva kapjuk a 2 : 3 arányt.'
  },
  {
    id: 'ri-q19',
    level: 2,
    question: 'Mennyi a 4 dl és a 2 liter aránya a legegyszerűbb alakban?',
    options: ['1 : 5', '4 : 2', '2 : 1', '1 : 2'],
    correctAnswer: 0,
    hint: '2 liter az 20 dl. Mennyi a 4 : 20 arány egyszerűsítve?',
    explanation: '2 liter = 20 dl. Az arány: 4 dl : 20 dl = 4 : 20 = 1 : 5.'
  },
  {
    id: 'ri-q20',
    level: 2,
    question: 'Melyik aránypár alkot helyes egyenlőséget (egyenlő arányokat)?',
    options: [
      '6 : 8 = 15 : 20',
      '4 : 5 = 5 : 4',
      '2 : 3 = 4 : 9',
      '3 : 7 = 6 : 10'
    ],
    correctAnswer: 0,
    hint: 'Egyszerűsítsd mindkét oldalt a legkisebb egész alakjára! 6/8 = 3/4 és 15/20 = 3/4.',
    explanation: 'Mind a 6 : 8, mind a 15 : 20 legegyszerűbb alakja 3 : 4, így a két arány egyenlő: 6 : 8 = 15 : 20.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'ri-q21',
    level: 3,
    question: 'Írd fel egész számok legkisebb arányaként a következő tizedestörtek arányát: 0,6 : 1,5!',
    options: ['2 : 5', '6 : 15', '3 : 5', '1 : 2'],
    correctAnswer: 0,
    hint: 'Először szorozz 10-zel, hogy egész számokat kapj (6 : 15), majd egyszerűsíts 3-mal!',
    explanation: 'Bővítünk 10-zel: 0,6 : 1,5 = 6 : 15. Ezt egyszerűsítve 3-mal kapjuk a 2 : 5 arányt.'
  },
  {
    id: 'ri-q22',
    level: 3,
    question: 'Írd fel egész számok arányaként a következő törtes arányt: 1/2 : 1/3!',
    options: ['3 : 2', '2 : 3', '1 : 6', '5 : 6'],
    correctAnswer: 0,
    hint: 'Közös nevező a 6. Hozd közös nevezőre a törteket (3/6 : 2/6), vagy szorozz 6-tal!',
    explanation: 'A törteket közös nevezőre hozzuk: 1/2 = 3/6, 1/3 = 2/6. Az arány: 3/6 : 2/6 = 3 : 2.'
  },
  {
    id: 'ri-q23',
    level: 3,
    question: 'Egy háromszög belső szögeinek aránya 1 : 2 : 3. Mekkora a háromszög legkisebb szöge? (A háromszög belső szögeinek összege 180°.)',
    options: ['30°', '60°', '45°', '20°'],
    correctAnswer: 0,
    hint: 'Hány egyenlő részre oszlik a 180 fok? 1 + 2 + 3 = 6 részre!',
    explanation: 'A részek összege 1 + 2 + 3 = 6 rész. Egy rész értéke: 180° / 6 = 30°. Mivel a legkisebb szög 1 rész, így a nagysága 30°.'
  },
  {
    id: 'ri-q24',
    level: 3,
    question: 'Egy térkép méretaránya 1 : 100 000. Két település távolsága a térképen mérve 4 cm. Hány kilométer a valóságban a távolságuk?',
    options: ['4 km', '40 km', '0,4 km', '400 km'],
    correctAnswer: 0,
    hint: 'Szorozd meg a 4 cm-t 100 000-rel, majd váltsd át méterre és kilométerre!',
    explanation: 'A valós távolság: 4 cm · 100 000 = 400 000 cm = 4 000 m = 4 km.'
  },
  {
    id: 'ri-q25',
    level: 3,
    question: 'Egy bronz ötvözet rézből és ónból áll 4 : 1 tömegarányban. Hány százalék a szobor réztartalma?',
    options: ['80%', '75%', '85%', '20%'],
    correctAnswer: 0,
    hint: 'Összesen 4 + 1 = 5 rész van. Mennyi 4 az 5-höz százalékban kifejezve?',
    explanation: 'Az összes rész száma 4 + 1 = 5. A réz 4/5 része az ötvözetnek. 4/5 = 80/100 = 80%.'
  },
  {
    id: 'ri-q26',
    level: 3,
    question: 'Mennyi a legegyszerűbb egész számaránya a következőnek: 0,75 : 1/2?',
    options: ['3 : 2', '3 : 4', '1 : 2', '4 : 3'],
    correctAnswer: 0,
    hint: '0,75 = 3/4. Mennyi a 3/4 és a 2/4 aránya?',
    explanation: '0,75 = 3/4, az 1/2 pedig 2/4. Az arányuk: 3/4 : 2/4 = 3 : 2.'
  },
  {
    id: 'ri-q27',
    level: 3,
    question: 'Egy sütemény receptje szerint a liszt, a cukor és a vaj tömegének aránya 5 : 3 : 2. Ha 500 g lisztet használunk, hány gramm vaj szükséges?',
    options: ['200 g', '300 g', '100 g', '250 g'],
    correctAnswer: 0,
    hint: 'Ha 5 rész liszt felel meg 500 g-nak, akkor 1 rész = 100 g. A vaj 2 rész!',
    explanation: '5 rész liszt = 500 g, így 1 rész = 500 / 5 = 100 g. A vaj 2 rész, tehát 2 · 100 g = 200 g vaj szükséges.'
  },
  {
    id: 'ri-q28',
    level: 3,
    question: 'Egy téglalap kerülete 40 cm, két szomszédos oldalának aránya 1 : 3. Mekkora a téglalap rövidebb oldala?',
    options: ['5 cm', '4 cm', '10 cm', '8 cm'],
    correctAnswer: 0,
    hint: 'A téglalap félkerülete a + b = 20 cm. Ezt a 20 cm-t kell szétosztani 1 : 3 arányban (4 részre).',
    explanation: 'A félkerület a + b = 40 / 2 = 20 cm. A részek összege 1 + 3 = 4 rész. Egy rész: 20 cm / 4 = 5 cm. A rövidebb oldal (1 rész) tehát 5 cm.'
  },
  {
    id: 'ri-q29',
    level: 3,
    question: 'Ha a : b = 2 : 3 és b : c = 3 : 5, akkor mennyi az a : b : c összetett arány?',
    options: ['2 : 3 : 5', '2 : 6 : 5', '6 : 9 : 15', '5 : 3 : 2'],
    correctAnswer: 0,
    hint: 'Vedd észre, hogy a közös tag (b) mindkét arányban pontosan 3 rész!',
    explanation: 'Mivel mindkét arányban a b tag értéke 3, a két arány közvetlenül összefűzhető: a : b : c = 2 : 3 : 5.'
  },
  {
    id: 'ri-q30',
    level: 3,
    question: 'Egy sportversenyen a fiúk és lányok számaránya 5 : 4. Tudjuk, hogy 20 fiú vett részt. Hány lány indult a versenyen?',
    options: ['16 lány', '15 lány', '18 lány', '25 lány'],
    correctAnswer: 0,
    hint: 'Ha 5 rész fiú az 20 fő, akkor 1 rész = 4 fő. Mennyi 4 rész lány?',
    explanation: 'A fiúk 5 része felel meg 20 főnek, így 1 rész = 20 / 5 = 4 fő. A lányok száma 4 rész, azaz 4 · 4 = 16 lány.'
  }
];

export const RatioIntroQuiz: React.FC<RatioIntroQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId="g6-ratio-intro"
      topicTitle="Az arány fogalma"
      title="Az arány fogalma kvíz"
      subtitle="Két mennyiség hányadosa, egyszerűsítés, bővítés és gyakorlati arányok 3 szinten"
      emoji="⚖️"
      themeColor="orange"
      topicBadge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK"
      badgeText="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK"
      cheatSheetTitle="Szabálytár és Képlettár"
      cheatSheet={ratioCheatSheetContent}
      cheatSheetCards={[
        {
          title: 'Arány definíciója',
          formula: 'a : b = a / b',
          explanation: 'Két mennyiség hányadosa (b ≠ 0). Megmutatja, hányszorosa vagy hányadrésze az egyik a másiknak.'
        },
        {
          title: 'Egyszerűsítés & Bővítés',
          formula: 'a : b = (a · k) : (b · k)',
          explanation: 'Mindkét tagot ugyanazzal a számmal szorozva vagy osztva az arány értéke változatlan marad.'
        },
        {
          title: 'Azonos mértékegységek',
          formula: '20 cm : 1 m = 20 : 100 = 1 : 5',
          explanation: 'Összehasonlítás előtt mindig azonos mértékegységre kell váltani a mennyiségeket.'
        },
        {
          title: 'Többtagú arány',
          formula: 'a : b : c (Összeg: a + b + c)',
          explanation: 'Három vagy több mennyiség egyidejű összehasonlítása. A részek összege az egész egysége.'
        }
      ]}
      questions={ratioQuestions}
      matcherComponent={RatioIntroMatcher}
      sorterComponent={RatioIntroSorter}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
export default RatioIntroQuiz;
