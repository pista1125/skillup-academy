import { LucideIcon } from 'lucide-react';
import { gondolkodasiTopic } from '../components/math/admission/gondolkodasi-modszerek-logika-kombinatorika/gondolkodasiLessons';

export interface AdmissionQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface AdmissionSubtopicContent {
  id: string;
  title: string;
  level: number; // Nesting depth: 0, 1, 2...
  requirements9th: string;
  requirements6th: string;
  requirements8th: string;
  lesson9th: string;
  lesson6th: string;
  lesson8th: string;
  quiz9th?: AdmissionQuizQuestion[];
  quiz6th?: AdmissionQuizQuestion[];
  quiz8th?: AdmissionQuizQuestion[];
  quizEasy?: AdmissionQuizQuestion[];
  quizMedium?: AdmissionQuizQuestion[];
  quizHard?: AdmissionQuizQuestion[];
}

export interface AdmissionTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subtopics: AdmissionSubtopicContent[];
}

export interface AdmissionExamPaper {
  year: number;
  type: '9-osztaly' | '6-osztaly' | '8-osztaly';
  duration: number; // minutes
  totalPoints: number;
  structure: string[];
}

export const admissionExamPapers: AdmissionExamPaper[] = [
  {
    year: 2024,
    type: '9-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-4. feladat: Alapműveletek, törtek, tizedes törtek és egyszerű logika (15 pont)",
      "5-7. feladat: Százalékszámítás, egyenletek, arányosság és grafikonok (15 pont)",
      "8-10. feladat: Geometria (kerület, terület, szögek, térfogat) és összetett szöveges feladatok (20 pont)"
    ]
  },
  {
    year: 2024,
    type: '6-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-5. feladat: Számolási készség, törtek, egyszerűbb logikai feladatok (20 pont)",
      "6-8. feladat: Mértékegység átváltás, szöveges feladatok, arányosság (15 pont)",
      "9-10. feladat: Geometriai alapok, kerület és terület (15 pont)"
    ]
  },
  {
    year: 2024,
    type: '8-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-5. feladat: Egyszerű számolások, alapműveletek játékosan, sorozatok (20 pont)",
      "6-8. feladat: Logika, mérési alapok, egyszerű szöveges feladatok (15 pont)",
      "9-10. feladat: Síkidomok felismerése, kerület és terület számolása (15 pont)"
    ]
  },
  {
    year: 2023,
    type: '9-osztaly',
    duration: 45,
    totalPoints: 50,
    structure: [
      "1-4. feladat: Számolás, törtek, mértékegységek, táblázatok (15 pont)",
      "5-7. feladat: Halmazok, logika, kombinatorika, egyenletek (15 pont)",
      "8-10. feladat: Geometriai szerkesztések, terület- és térfogatszámítás, statisztika (20 pont)"
    ]
  }
];

export const admissionTopics: AdmissionTopic[] = [
  gondolkodasiTopic,
  {
    id: "a-numbers",
  {
    id: "a-numbers",
    title: "2. Számelmélet és számok",
    icon: "🍕",
    color: "from-blue-500 to-blue-600",
    subtopics: [
      {
        id: "a-num-tortek",
        title: "Műveletek törtekkel",
        level: 0,
        requirements9th: "Végezzen közönséges törtekkel összeadást, kivonást (közös nevező), szorzást és osztást szabályosan.",
        requirements6th: "Tudjon törteket összeadni, kivonni, tizedes törtekkel alapműveleteket végezni.",
        requirements8th: "Értse a tört részeit és tudjon egyszerű törtekkel számolni.",
        lesson9th: "### Műveletek törtekkel\n\n- **Összeadás/Kivonás:** Közös nevezőre kell hozni a törteket!\n  $$\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{a \\cdot d \\pm c \\cdot b}{b \\cdot d}$$\n- **Szorzás:** Számlálót a számlálóval, nevezőt a nevezővel szorozzuk.\n- **Osztás:** A osztót a reciprokával szorozzuk.",
        lesson6th: "### Törtek összeadása, kivonása\n\nKözös nevezőre hozással: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.",
        lesson8th: "### Törtek alapjai\n\nA nevező megmutatja, hány egyenlő részre vágtuk az egészet, a számláló pedig, hogy hány részt vettünk belőle.",
        quiz9th: [
          {
            id: "q-frac-9-2",
            question: "Mennyi 3/4 és 2/3 szorzata?",
            options: ["5/7", "1/2", "6/12 (ami 1/2)", "5/12"],
            correctAnswer: 2,
            explanation: "(3/4) * (2/3) = (3*2)/(4*3) = 6/12 = 1/2."
          }
        ],
        quiz6th: [
          {
            id: "q-frac-6-2",
            question: "Mennyi 5/8 és 1/4 összege?",
            options: ["6/12", "7/8", "3/8", "1"],
            correctAnswer: 1,
            explanation: "1/4 = 2/8. Így 5/8 + 2/8 = 7/8."
          }
        ],
        quiz8th: [
          {
            id: "q-frac-8-2",
            question: "Mi a fele a 3/4-nek?",
            options: ["3/2", "3/8", "6/4", "1/4"],
            correctAnswer: 1,
            explanation: "(3/4) / 2 = 3 / (4 * 2) = 3/8."
          }
        ]
      },
      {
        id: "a-num-tizedestortek",
        title: "A tizedes törtek fajtái (véges, végtelen, végtelen szakaszos)",
        level: 1,
        requirements9th: "Csoportosítsa a tizedes törteket fajtájuk szerint. Tudja átírni a közönséges törtet tizedes törtté és fordítva.",
        requirements6th: "Ismerje a véges tizedes törtek fogalmát és végrehajtását.",
        requirements8th: "Értse az egyszerű tizedes tört formátumot (pl. 0.5, 0.25).",
        lesson9th: "### Tizedes törtek típusai\n\n- **Véges tizedes tört:** A tizedes jegyek száma véges (pl. $0,25 = 1/4$). Akkor keletkezik, ha a legegyszerűbb alakban lévő tört nevezőjének prímtényezős felbontásában csak a 2 és az 5 szerepel.\n- **Végtelen szakaszos tizedes tört:** A tizedes jegyek végtelenül ismétlődnek egy szakaszon (pl. $0,333\\dots = 0,\\dot{3} = 1/3$).\n- **Végtelen nem szakaszos:** Irracionális számok (pl. $\\pi, \\sqrt{2}$).",
        lesson6th: "### Tizedes törtek tizedesjegyei\n\nTizedes tört közönséges törtté alakítása helyiérték alapján: $0,4 = 4/10 = 2/5$.",
        lesson8th: "### Mi az a tizedes tört?\n\nA tizedes tört a tizes számrendszerben ábrázolja a törtrészt. Pl. $0,5 = \\text{öt tized} = 1/2$.",
        quiz9th: [
          {
            id: "q-dec-9-1",
            question: "Melyik közönséges tört ad végtelen szakaszos tizedes törtet?",
            options: ["1/2", "1/5", "1/3", "3/8"],
            correctAnswer: 2,
            explanation: "Az 1/3 tizedes tört alakja 0.3333... ami végtelen szakaszos, mert a nevező prímtényezős felbontásában szerepel a 3."
          }
        ],
        quiz6th: [
          {
            id: "q-dec-6-1",
            question: "Mennyi 3/5 tizedes tört alakban?",
            options: ["0.3", "0.5", "0.6", "0.15"],
            correctAnswer: 2,
            explanation: "3/5 = 6/10 = 0.6."
          }
        ],
        quiz8th: [
          {
            id: "q-dec-8-1",
            question: "Mennyi 0,25 közönséges törtként egyszerűsítve?",
            options: ["2/5", "1/4", "1/2", "25/10"],
            correctAnswer: 1,
            explanation: "0.25 = 25/100 = 1/4."
          }
        ]
      },
      {
        id: "a-num-kerekites",
        title: "A kerekítés szabályainak alkalmazása",
        level: 1,
        requirements9th: "Alkalmazza magabiztosan a kerekítés szabályait tizedes törtekre és nagy számokra is.",
        requirements6th: "Kerekítsen tizedes törteket tizedre, századra.",
        requirements8th: "Kerekítsen egész számokat a megadott helyiértékre.",
        lesson9th: "### A kerekítés szabályai\n\nHa a kerekítendő helyiérték után álló számjegy:\n- $0, 1, 2, 3, 4$: lefelé kerekítünk (a jegy változatlan marad, utána 0-k állnak).\n- $5, 6, 7, 8, 9$: felfelé kerekítünk (a jegyet 1-gyel növeljük).\n\nPl. $23,546$ kerekítése századokra: $23,55$ (mivel a századok utáni jegy a 6).",
        lesson6th: "### Kerekítés tizedekre\n\nPl. $3,45$ kerekítése tizedekre $3,5$ (mert a tizedek után az 5-ös áll).",
        lesson8th: "### Kerekítés tizesekre, százasokra\n\nPl. 143 kerekítése tizesekre: 140. Kerekítése százasokra: 100.",
        quiz9th: [
          {
            id: "q-round-9-1",
            question: "Kerekítsük a 15.6749-et tizedekre!",
            options: ["15.6", "15.7", "16.0", "15.67"],
            correctAnswer: 1,
            explanation: "A tizedek után a 7-es áll, így felfelé kerekítünk: 15.7."
          }
        ],
        quiz6th: [
          {
            id: "q-round-6-1",
            question: "Kerekítsük a 124.9-et a legközelebbi egészre!",
            options: ["124", "125", "120", "130"],
            correctAnswer: 1,
            explanation: "Mivel a tizedek helyén 9 áll, felfelé kerekítünk: 125."
          }
        ],
        quiz8th: [
          {
            id: "q-round-8-1",
            question: "Kerekítsük a 88-at tizesekre!",
            options: ["80", "90", "100", "85"],
            correctAnswer: 1,
            explanation: "A 8-as miatt felfelé kerekítünk: 90."
          }
        ]
      },
      {
        id: "a-num-hatvanyok",
        title: "Pozitív egész kitevőjű hatványok ismerete és műveletei",
        level: 1,
        requirements9th: "Alkalmazza a hatványozás azonosságait (azonos alapú/kitevőjű szorzás, osztás, hatvány hatványozása).",
        requirements6th: "Tudja a négyzet és köb fogalmát.",
        requirements8th: "Értse az egyszerű hatványokat (pl. 2 a harmadikon).",
        lesson9th: "### Hatványozás azonosságai\n\n- $a^n \\cdot a^m = a^{n+m}$\n- $a^n : a^m = a^{n-m}$\n- $(a^n)^m = a^{n \\cdot m}$\n- $(a \\cdot b)^n = a^n \\cdot b^n$\n- $(a/b)^n = a^n / b^n$",
        lesson6th: "### Négyzet és köb\n\n- $a^2 = a \\cdot a$ (a a négyzeten)\n- $a^3 = a \\cdot a \\cdot a$ (a a köbön)",
        lesson8th: "### Mi a hatványozás?\n\nAzonos tényezők szorzása. Pl. $2^3 = 2 \\cdot 2 \\cdot 2 = 8$.",
        quiz9th: [
          {
            id: "q-pow-9-2",
            question: "Mennyi (3^2)^3 értéke egyszerűbb alakban?",
            options: ["3^5", "3^6", "9^2", "3^8"],
            correctAnswer: 1,
            explanation: "Azonosság szerint a kitevőket összeszorozzuk: 2 * 3 = 6, így 3^6."
          }
        ],
        quiz6th: [
          {
            id: "q-pow-6-2",
            question: "Mennyi 4 a köbön (4^3)?",
            options: ["12", "16", "64", "48"],
            correctAnswer: 2,
            explanation: "4^3 = 4 * 4 * 4 = 16 * 4 = 64."
          }
        ],
        quiz8th: [
          {
            id: "q-pow-8-2",
            question: "Mennyi 10 a másodikon (10^2)?",
            options: ["20", "100", "1000", "10"],
            correctAnswer: 1,
            explanation: "10^2 = 10 * 10 = 100."
          }
        ]
      },
      {
        id: "a-num-rendszerek",
        title: "Számrendszerek ismerete",
        level: 1,
        requirements9th: "Írjon át számokat a tizes és a kettes (bináris) számrendszer között.",
        requirements6th: "Értse a helyiértékeket a tizes számrendszerben.",
        requirements8th: "Értse az egyesek, tizesek, százasok szerepét a számok felírásában.",
        lesson9th: "### Számrendszerek\n\n- **Tízes számrendszer:** Alapja a 10, helyiértékei: $1, 10, 100, 1000 \\dots$\n- **Kettes számrendszer:** Alapja a 2, helyiértékei jobbról balra: $1, 2, 4, 8, 16, 32 \\dots$ Pl. $1101_2 = 1 \\cdot 8 + 1 \\cdot 4 + 0 \\cdot 2 + 1 \\cdot 1 = 13_{10}$.",
        lesson6th: "### Helyiérték táblázat\n\nPl. 452 = 4 százas + 5 tízes + 2 egyes.",
        lesson8th: "### A tízes számrendszer\n\nTíz darab számjegyet használunk (0-9). Minden helyiérték az előző 10-szerese.",
        quiz9th: [
          {
            id: "q-sys-9-1",
            question: "Melyik tizes számrendszerbeli számnak felel meg a 1010_2?",
            options: ["5", "8", "10", "12"],
            correctAnswer: 2,
            explanation: "1010_2 = 1*8 + 0*4 + 1*2 + 0*1 = 8 + 2 = 10."
          }
        ],
        quiz6th: [
          {
            id: "q-sys-6-1",
            question: "Mi a 2-es helyiértékű számjegye a 3425 számnak?",
            options: ["egyesek", "tízesek", "százasok", "ezresek"],
            correctAnswer: 1,
            explanation: "A 3425-ben a 2-es a tízesek helyén áll (20)."
          }
        ],
        quiz8th: [
          {
            id: "q-sys-8-1",
            question: "Hány tízest tartalmaz a 150-es szám?",
            options: ["1", "5", "15", "50"],
            correctAnswer: 2,
            explanation: "150 / 10 = 15 tízes."
          }
        ]
      },
      {
        id: "a-num-felbontas",
        title: "Összetett számok prímtényezős felbontása",
        level: 1,
        requirements9th: "Bontson fel összetett számokat prímek szorzatára.",
        requirements6th: "Ismerje a prímszámokat 20-ig.",
        requirements8th: "Értse meg a prímszám (törzsszám) fogalmát.",
        lesson9th: "### Prímtényezős felbontás\n\nMinden 1-nél nagyobb összetett szám egyértelműen felbontható prímszámok szorzatára. Pl. $90 = 2 \\cdot 3^2 \\cdot 5$.",
        lesson6th: "### Prímszámok 20-ig\n\nPrímszámok: 2, 3, 5, 7, 11, 13, 17, 19.",
        lesson8th: "### Mi a prímszám?\n\nAmelynek csak 1 és önmaga az osztója (pontosan két osztója van). A legkisebb prímszám a 2 (az egyetlen páros prím).",
        quiz9th: [
          {
            id: "q-prime-9-1",
            question: "Mi a 60 prímtényezős felbontása?",
            options: ["6 * 10", "2 * 3 * 10", "2^2 * 3 * 5", "2 * 3^2 * 5"],
            correctAnswer: 2,
            explanation: "60 = 2 * 30 = 2 * 2 * 15 = 2 * 2 * 3 * 5 = 2^2 * 3 * 5."
          }
        ],
        quiz6th: [
          {
            id: "q-prime-6-1",
            question: "Melyik szám prímszám?",
            options: ["1", "9", "13", "15"],
            correctAnswer: 2,
            explanation: "A 13-nak csak az 1 és a 13 az osztói. Az 1 nem prím."
          }
        ],
        quiz8th: [
          {
            id: "q-prime-8-1",
            question: "Melyik az egyetlen páros prímszám?",
            options: ["0", "2", "4", "Nincs ilyen"],
            correctAnswer: 1,
            explanation: "A 2 az egyetlen páros szám, ami prímszám."
          }
        ]
      },
      {
        id: "a-num-oszto",
        title: "Osztó",
        level: 1,
        requirements9th: "Határozza meg egy szám összes pozitív osztóját.",
        requirements6th: "Ismerje fel egy szám osztóit egyszerűbb esetekben.",
        requirements8th: "Értse az osztás és az osztó fogalmát.",
        lesson9th: "### Az osztó fogalma\n\nAz $a$ egész szám osztója a $b$ egész számnak, ha létezik olyan $k$ egész szám, hogy $b = a \\cdot k$. Pl. a 12 pozitív osztói: 1, 2, 3, 4, 6, 12.",
        lesson6th: "### Osztók keresése\n\nPárokat keresünk: a 10 osztói: (1, 10) és (2, 5).",
        lesson8th: "### Mi az osztó?\n\nHa elosztunk egy számot, és nincs maradék, akkor a számmal való osztás sikeres, így az az osztója. Pl. 8-nak a 2 osztója, mert 8 / 2 = 4 (maradék nélkül).",
        quiz9th: [
          {
            id: "q-div-9-1",
            question: "Hány pozitív osztója van a 12-nek?",
            options: ["4", "5", "6", "8"],
            correctAnswer: 2,
            explanation: "A 12 osztói: 1, 2, 3, 4, 6, 12. Ez összesen 6 darab osztó."
          }
        ],
        quiz6th: [
          {
            id: "q-div-6-1",
            question: "Melyik nem osztója a 15-nek?",
            options: ["3", "5", "10", "15"],
            correctAnswer: 2,
            explanation: "A 15 nem osztható maradék nélkül 10-zel."
          }
        ],
        quiz8th: [
          {
            id: "q-div-8-1",
            question: "Melyik osztója a 20-nak?",
            options: ["3", "4", "6", "7"],
            correctAnswer: 1,
            explanation: "20 / 4 = 5, így a 4 osztója a 20-nak."
          }
        ]
      },
      {
        id: "a-num-tobbszoros",
        title: "Többszörös",
        level: 1,
        requirements9th: "Határozza meg egy szám többszöröseit és vizsgálja az oszthatóságot.",
        requirements6th: "Képes legyen felsorolni egy szám első néhány többszörösét.",
        requirements8th: "Értse a többszörös fogalmát.",
        lesson9th: "### A többszörös fogalma\n\nEgy szám többszöröseit úgy kapjuk, hogy megszorozzuk egész számokkal. Pl. a 3 többszörösei: 3, 6, 9, 12, 15, 18...",
        lesson6th: "### Szorzótábla és többszörösök\n\nA 4 többszörösei: 4, 8, 12, 16, 20...",
        lesson8th: "### Mi a többszörös?\n\nHa egy számot megszorzol egy egész számmal, a szorzat a többszöröse lesz. Pl. a 10 többszörösei: 10, 20, 30, 40...",
        quiz9th: [
          {
            id: "q-mult-9-1",
            question: "Melyik a legkisebb pozitív többszöröse a 7-nek?",
            options: ["0", "1", "7", "14"],
            correctAnswer: 2,
            explanation: "A legkisebb pozitív többszörös önmaga, azaz a 7 (7 * 1 = 7)."
          }
        ],
        quiz6th: [
          {
            id: "q-mult-6-1",
            question: "Melyik szám többszöröse a 6-nak?",
            options: ["16", "18", "20", "22"],
            correctAnswer: 1,
            explanation: "18 = 6 * 3, így a 18 többszöröse a 6-nak."
          }
        ],
        quiz8th: [
          {
            id: "q-mult-8-1",
            question: "Igaz-e, hogy a 100 többszöröse az 50-nek?",
            options: ["Igaz", "Hamis"],
            correctAnswer: 0,
            explanation: "Igaz, mert 50 * 2 = 100."
          }
        ]
      },
      {
        id: "a-num-lko",
        title: "Legnagyobb közös osztó (LKÖ)",
        level: 1,
        requirements9th: "Számítsa ki két vagy több szám legnagyobb közös osztóját prímtényezős felbontással.",
        requirements6th: "Keresse meg kis számok legnagyobb közös osztóját felsorolással.",
        requirements8th: "Értse a közös osztó fogalmát.",
        lesson9th: "### Legnagyobb Közös Osztó (LKÖ)\n\nKét szám közös osztói közül a legnagyobb. Jelölése: $LKÖ(a,b)$ vagy $(a,b)$.\n- Prímtényezős felbontással: a közös prímtényezők a legkisebb kitevőjükön vett szorzata.",
        lesson6th: "### LKÖ meghatározása felsorolással\n\n- 8 osztói: 1, 2, 4, 8\n- 12 osztói: 1, 2, 3, 4, 6, 12\nKözös osztók: 1, 2, 4. Legnagyobb közülük a 4.",
        lesson8th: "### Közös osztók\n\nAzok a számok, amelyek mindkét számot maradék nélkül osztják. Pl. a 6-nak és 9-nek közös osztója a 3.",
        quiz9th: [
          {
            id: "q-gcd-9-1",
            question: "Mennyi a 24 és 36 legnagyobb közös osztója?",
            options: ["6", "12", "18", "72"],
            correctAnswer: 1,
            explanation: "24 = 2^3 * 3, 36 = 2^2 * 3^2. Közös tényezők a legkisebb kitevőn: 2^2 * 3 = 12."
          }
        ],
        quiz6th: [
          {
            id: "q-gcd-6-1",
            question: "Mi a legnagyobb közös osztója a 9 és 15 számoknak?",
            options: ["1", "3", "5", "9"],
            correctAnswer: 1,
            explanation: "9 osztói: 1, 3, 9. 15 osztói: 1, 3, 5, 15. A legnagyobb közös a 3."
          }
        ],
        quiz8th: [
          {
            id: "q-gcd-8-1",
            question: "Mi a legnagyobb közös osztója a 7 és 11 számoknak?",
            options: ["1", "7", "11", "77"],
            correctAnswer: 0,
            explanation: "Mivel mindkét szám prímszám, az egyetlen közös osztójuk az 1 (relatív prímek)."
          }
        ]
      },
      {
        id: "a-num-lkkt",
        title: "Legkisebb közös többszörös (LKKT)",
        level: 1,
        requirements9th: "Számítsa ki két vagy több szám legkisebb közös többszörösét prímtényezős felbontással.",
        requirements6th: "Keresse meg kis számok legkisebb közös többszörösét.",
        requirements8th: "Értse a közös többszörös fogalmát.",
        lesson9th: "### Legkisebb Közös Többszörös (LKKT)\n\nKét szám közös többszörösei közül a legkisebb pozitív szám. Jelölése: $LKKT(a,b)$ vagy $[a,b]$.\n- Prímtényezős felbontással: az összes előforduló prímtényező a legnagyobb kitevőjén vett szorzata.",
        lesson6th: "### LKKT kiszámolása\n\n- 4 többszörösei: 4, 8, 12, 16, 20...\n- 6 többszörösei: 6, 12, 18, 24...\nLegkisebb közös a 12.",
        lesson8th: "### Közös többszörösök\n\nAzok a számok, amelyek mindkét számmal oszthatók. Pl. a 2-nek és 5-nek közös többszörösei a 10, 20, 30...",
        quiz9th: [
          {
            id: "q-lcm-9-1",
            question: "Mennyi a 12 és 15 legkisebb közös többszöröse?",
            options: ["3", "30", "60", "180"],
            correctAnswer: 2,
            explanation: "12 = 2^2 * 3, 15 = 3 * 5. LKKT = 2^2 * 3 * 5 = 60."
          }
        ],
        quiz6th: [
          {
            id: "q-lcm-6-1",
            question: "Mi a legkisebb közös többszöröse a 6 és 8 számoknak?",
            options: ["12", "16", "24", "48"],
            correctAnswer: 2,
            explanation: "6 többszörösei: 6, 12, 18, 24. A 24 osztható 8-cal is, és ez a legkisebb."
          }
        ],
        quiz8th: [
          {
            id: "q-lcm-8-1",
            question: "Mi a legkisebb közös többszöröse a 3 és 5 számoknak?",
            options: ["1", "8", "15", "30"],
            correctAnswer: 2,
            explanation: "Mivel 3 és 5 relatív prímek, az LKKT a szorzatuk: 3 * 5 = 15."
          }
        ]
      }
    ]
  },
  {
    id: "a-algebra",
    title: "3. Algebra",
    icon: "🔤",
    color: "from-purple-500 to-purple-600",
    subtopics: [
      {
        id: "a-alg-kifejezesek",
        title: "Műveletek algebrai kifejezésekkel (zárójelfelbontás, műveleti sorrend, helyettesítési érték)",
        level: 0,
        requirements9th: "Végezzen zárójelfelbontásokat és egyszerűsítéseket algebrai kifejezésekkel. Határozza meg a helyettesítési értéket.",
        requirements6th: "Értse az ismeretlen fogalmát és számoljon behelyettesítéssel.",
        requirements8th: "Tudjon behelyettesíteni egész számokat egyszerűbb kifejezésekbe.",
        lesson9th: "### Algebrai műveletek\n\n- **Zárójel felbontása:** $-(a - b) = -a + b$, illetve $c(a - b) = ca - cb$.\n- **Műveleti sorrend:** Zárójelek belső része -> Hatványozás -> Szorzás/Osztás -> Összeadás/Kivonás.\n- **Helyettesítési érték:** Behelyettesítjük a változók értékét a kifejezésbe. Pl. $3x^2 - 2x$, ha $x=2$: $3(4) - 2(2) = 12 - 4 = 8$.",
        lesson6th: "### Behelyettesítés\n\nHa $x = 3$, akkor a $2x + 5$ értéke: $2 \\cdot 3 + 5 = 6 + 5 = 11$.",
        lesson8th: "### Egyszerű betűs kifejezések\n\nHasználjunk betűket a számok helyett! Pl. ha egy toll ára $x$ Ft, akkor 5 toll ára $5x$ Ft.",
        quiz9th: [
          {
            id: "q-expr-9-1",
            question: "Mennyi a 3(a - 2) - 2(a - 3) kifejezés egyszerűsített alakja?",
            options: ["a - 12", "a", "5a - 12", "a + 12"],
            correctAnswer: 1,
            explanation: "3a - 6 - 2a + 6 = a."
          }
        ],
        quiz6th: [
          {
            id: "q-expr-6-1",
            question: "Mi a helyettesítési értéke a 4x - 3 kifejezésnek, ha x = 5?",
            options: ["17", "20", "23", "12"],
            correctAnswer: 0,
            explanation: "4 * 5 - 3 = 20 - 3 = 17."
          }
        ],
        quiz8th: [
          {
            id: "q-expr-8-1",
            question: "Mennyi az x+y értéke, ha x = 10 és y = 7?",
            options: ["3", "17", "70", "107"],
            correctAnswer: 1,
            explanation: "10 + 7 = 17."
          }
        ]
      },
      {
        id: "a-alg-egyenletek",
        title: "Elsőfokú egyenletek megoldása",
        level: 1,
        requirements9th: "Oldjon meg elsőfokú egyenleteket mérlegelvvel, és végezzen ellenőrzést.",
        requirements6th: "Oldjon meg egyszerűbb egyenleteket lebontogatással.",
        requirements8th: "Oldjon meg egyszerű nyitott mondatokat.",
        lesson9th: "### Elsőfokú egyenletek megoldása\n\nA **mérlegelv** segítségével az egyenlet mindkét oldalán elvégezzük ugyanazokat a műveleteket az ismeretlen elkülönítésére. Pl. $5x - 3 = 2x + 9 \\Rightarrow 3x - 3 = 9 \\Rightarrow 3x = 12 \\Rightarrow x = 4$.",
        lesson6th: "### Lebontogatás\n\nHa $3x + 2 = 14$, akkor $3x = 12$, és innen $x = 4$.",
        lesson8th: "### Gondoltam egy számot\n\nx + 5 = 12 -> a gondolt szám: x = 12 - 5 = 7.",
        quiz9th: [
          {
            id: "q-eq-9-2",
            question: "Oldja meg a 4x - 8 = 2x + 10 egyenletet!",
            options: ["x = 1", "x = 9", "x = 6", "x = 18"],
            correctAnswer: 1,
            explanation: "4x - 2x = 10 + 8 -> 2x = 18 -> x = 9."
          }
        ],
        quiz6th: [
          {
            id: "q-eq-6-2",
            question: "Mennyi az x értéke: 5x + 3 = 18 ?",
            options: ["3", "4", "5", "15"],
            correctAnswer: 0,
            explanation: "5x = 15 -> x = 3."
          }
        ],
        quiz8th: [
          {
            id: "q-eq-8-2",
            question: "Melyik szám igazítja meg a 2x = 16 nyitott mondatot?",
            options: ["6", "8", "10", "14"],
            correctAnswer: 1,
            explanation: "2 * 8 = 16, így x = 8."
          }
        ]
      },
      {
        id: "a-alg-szoveges",
        title: "Szöveges feladatok megoldása egyenlettel",
        level: 1,
        requirements9th: "Írjon fel szöveges feladatot egyenletként és oldja meg azt.",
        requirements6th: "Oldjon meg egyszerűbb szöveges feladatokat következtetéssel.",
        requirements8th: "Oldjon meg játékos szöveges feladatokat.",
        lesson9th: "### Szöveges feladatok egyenlettel\n\n1. Jelöljük a keresett mennyiséget $x$-szel.\n2. Írjuk fel a többi mennyiséget $x$ segítségével.\n3. Alkossunk egyenletet a szöveg összefüggéseiből.\n4. Oldjuk meg és ellenőrizzük a szöveg alapján.",
        lesson6th: "### Rajzos feladatmegoldás\n\nSzakaszokkal ábrázoljuk az arányokat a könnyebb megértéshez.",
        lesson8th: "### Szöveges feladatok alapjai\n\nKeresd a kulcsszavakat! 'Összesen', 'különbség', 'kétszerese'...",
        quiz9th: [
          {
            id: "q-txt-9-1",
            question: "Gondoltam egy számot, hozzáadtam a kétszeresét, kaptam 45-öt. Mi volt a szám?",
            options: ["10", "15", "20", "30"],
            correctAnswer: 1,
            explanation: "x + 2x = 45 -> 3x = 45 -> x = 15."
          }
        ],
        quiz6th: [
          {
            id: "q-txt-6-1",
            question: "Peti 3 évvel idősebb Marinál. Életkoruk összege 21 év. Hány éves Mari?",
            options: ["9", "12", "8", "10"],
            correctAnswer: 0,
            explanation: "Mari: x. Peti: x+3. x + x + 3 = 21 -> 2x = 18 -> x = 9 éves Mari."
          }
        ],
        quiz8th: [
          {
            id: "q-txt-8-1",
            question: "Két toll ára 200 Ft. Mennyibe kerül 5 toll?",
            options: ["400 Ft", "500 Ft", "600 Ft", "1000 Ft"],
            correctAnswer: 1,
            explanation: "1 toll ára 100 Ft. 5 toll ára 5 * 100 = 500 Ft."
          }
        ]
      }
    ]
  },
  {
    id: "a-percentage",
    title: "4. Százalékszámítás",
    icon: "📊",
    color: "from-rose-500 to-pink-600",
    subtopics: [
      {
        id: "a-pct-ertek",
        title: "Százalékérték meghatározása összetett feladatokban",
        level: 0,
        requirements9th: "Számítsa ki a százalékértéket összetett feladatokban, áremelések és kedvezmények esetén.",
        requirements6th: "Tudjon kiszámolni százalékértéket egyszerű helyzetekben.",
        requirements8th: "Értse az 50% és 25% kiszámítását.",
        lesson9th: "### Százalékérték számolása\n\nA százalékérték ($É$) a százalékalap ($A$) és a százalékláb ($p$) szorzata osztva 100-zal:\n$$É = A \\cdot \\frac{p}{100}$$\nPl. egy termék ára 5000 Ft, 20%-kal leértékelik. A kedvezmény értéke: $5000 \\cdot 0,20 = 1000$ Ft.",
        lesson6th: "### Százalékérték alapjai\n\n10% kiszámítása a tizedrészét jelenti, 20% a kétszerese a tizedrésznek.",
        lesson8th: "### Százalék kiszámolása fejben\n\nPl. 500 Ft 50%-a a fele: 250 Ft.",
        quiz9th: [
          {
            id: "q-val-9-1",
            question: "Egy 12 000 Ft-os termék ára 15%-kal csökken. Mekkora a kedvezmény értéke?",
            options: ["1200 Ft", "1500 Ft", "1800 Ft", "2000 Ft"],
            correctAnswer: 2,
            explanation: "12 000 * 0,15 = 1800 Ft."
          }
        ],
        quiz6th: [
          {
            id: "q-val-6-1",
            question: "Mennyi 400-nak a 30%-a?",
            options: ["30", "40", "120", "150"],
            correctAnswer: 2,
            explanation: "400 * 0.30 = 120."
          }
        ],
        quiz8th: [
          {
            id: "q-val-8-1",
            question: "Mennyi 80-nak az 50%-a?",
            options: ["40", "50", "20", "10"],
            correctAnswer: 0,
            explanation: "Az 50% a fele, vagyis 80 / 2 = 40."
          }
        ]
      },
      {
        id: "a-pct-lab",
        title: "Százalékláb meghatározása összetett feladatokban",
        level: 1,
        requirements9th: "Számítsa ki a százaléklábat két mennyiség arányából.",
        requirements6th: "Határozzon meg egyszerű százaléklábat.",
        requirements8th: "Értse az arányok százalékos megfelelőjét (pl. 1/4 = 25%).",
        lesson9th: "### Százalékláb számolása\n\nA százalékláb ($p$) a százalékérték ($É$) és a százalékalap ($A$) hányadosa szorozva 100-zal:\n$$p = \\frac{É}{A} \\cdot 100\\%$$\nPl. ha egy 8000 Ft-os könyvből 1600 Ft kedvezményt kapunk, a leértékelés százaléklába: $\\frac{1600}{8000} \\cdot 100 = 20\\%$.",
        lesson6th: "### Hány százalék?\n\nHa 10-ből 2 golyó piros, az a golyók 2/10 = 20%-a.",
        lesson8th: "### Százalékos arányok\n\n1/2 = 50%, 1/4 = 25%, 1/10 = 10%.",
        quiz9th: [
          {
            id: "q-rate-9-1",
            question: "Hány százalékos leértékelést jelent, ha egy 15 000 Ft-os cipőt 12 000 Ft-ért vehetünk meg?",
            options: ["10%", "20%", "25%", "30%"],
            correctAnswer: 1,
            explanation: "A kedvezmény összege 3000 Ft. Százalékláb: (3000 / 15 000) * 100 = 20%."
          }
        ],
        quiz6th: [
          {
            id: "q-rate-6-1",
            question: "Hány százaléka az 5 a 20-nak?",
            options: ["5%", "10%", "25%", "50%"],
            correctAnswer: 2,
            explanation: "5 / 20 = 1 / 4 = 25%."
          }
        ],
        quiz8th: [
          {
            id: "q-rate-8-1",
            question: "Hány százaléka egy tortának a fele?",
            options: ["25%", "50%", "75%", "100%"],
            correctAnswer: 1,
            explanation: "A fele az 50%."
          }
        ]
      },
      {
        id: "a-pct-alap",
        title: "Alap meghatározása összetett feladatokban",
        level: 1,
        requirements9th: "Számítsa ki az eredeti értéket (százalékalapot) a megadott százalékérték és százalékláb alapján.",
        requirements6th: "Határozzon meg egyszerű százalékalapot.",
        requirements8th: "Értse az alap fogalmát mint a teljes egész (100%).",
        lesson9th: "### Százalékalap számolása\n\nA százalékalap ($A$) a teljes mennyiség (a 100%). Képlete:\n$$A = \\frac{É}{\\frac{p}{100}}$$\nPl. ha egy termék 12%-os kedvezmény után 17 600 Ft-ba kerül, akkor ez a 17 600 Ft az eredeti ár 88%-a ($100 - 12 = 88$). Az eredeti ár: $\\frac{17600}{0,88} = 20\\ 000$ Ft.",
        lesson6th: "### Az egész meghatározása\n\nHa egy szám 20%-a 40, akkor a 100%-a (az egész) ötször ennyi lesz: 200.",
        lesson8th: "### Mi a százalékalap?\n\nA százalékalap a teljes egész, azaz a 100%.",
        quiz9th: [
          {
            id: "q-base-9-1",
            question: "Melyik számnak a 40%-a a 160?",
            options: ["320", "400", "500", "640"],
            correctAnswer: 1,
            explanation: "Alap = 160 / 0.40 = 400."
          }
        ],
        quiz6th: [
          {
            id: "q-base-6-1",
            question: "Ha egy könyv árának 10%-a 300 Ft, mennyibe kerül a könyv?",
            options: ["1500 Ft", "3000 Ft", "6000 Ft", "9000 Ft"],
            correctAnswer: 1,
            explanation: "Ha a 10%-a 300, akkor a 100%-a (tízszerese) 3000 Ft."
          }
        ],
        quiz8th: [
          {
            id: "q-base-8-1",
            question: "Ha egy zsebben lévő pénz 50%-a 200 Ft, összesen mennyi pénz van a zsebben?",
            options: ["100 Ft", "200 Ft", "300 Ft", "400 Ft"],
            correctAnswer: 3,
            explanation: "Ha az 50% (a fele) 200, akkor a teljes összeg 400 Ft."
          }
        ]
      }
    ]
  },
  {
    id: "a-functions-coord",
    title: "5. Függvények, hozzárendelések és koordinátageometria",
    icon: "🔄",
    color: "from-emerald-500 to-teal-600",
    subtopics: [
      {
        id: "a-fun-hozzarendelesek",
        title: "Két halmaz közötti hozzárendelések, alaphalmaz, képhalmaz fogalma",
        level: 0,
        requirements9th: "Definiálja és ábrázolja a hozzárendeléseket. Értse az értelmezési tartomány (alaphalmaz) és értékkészlet (képhalmaz) fogalmát.",
        requirements6th: "Hozzon létre egyszerű szabályokat két halmaz között.",
        requirements8th: "Párosítson össze elemeket szabály szerint.",
        lesson9th: "### Hozzárendelések elmélete\n\n- **Hozzárendelés:** Egy $A$ halmaz elemeihez hozzárendeljük egy $B$ halmaz elemeit.\n- **Alaphalmaz (Értelmezési tartomány):** Amelyik halmaz elemeihez hozzárendelünk.\n- **Képhalmaz (Értékkészlet):** A hozzárendelt értékek halmaza.",
        lesson6th: "### Hozzárendelési szabályok\n\nPl. minden számhoz rendeljük hozzá a kétszeresét.",
        lesson8th: "### Egyszerű párosítások\n\nPl. országokhoz hozzárendeljük a fővárosaikat.",
        quiz9th: [
          {
            id: "q-map-9-2",
            question: "Ha az alaphalmaz a pozitív egész számok, és a szabály f(x) = x - 5, eshet-e a képhalmazba a -2?",
            options: ["Nem, mert az alaphalmaz csak pozitív lehet.", "Igen, például x = 3 esetén f(3) = -2.", "Nem, mert f(x) mindig pozitív.", "Nem eldönthető."],
            correctAnswer: 1,
            explanation: "x = 3 pozitív egész (alaphalmaz eleme), f(3) = 3 - 5 = -2, ami a képhalmazba esik."
          }
        ],
        quiz6th: [
          {
            id: "q-map-6-2",
            question: "Melyik szám tartozik a 4-hez, ha a szabály 'hozzáadunk 3-at és megszorozzuk 2-vel'?",
            options: ["10", "11", "14", "20"],
            correctAnswer: 2,
            explanation: "(4 + 3) * 2 = 7 * 2 = 14."
          }
        ],
        quiz8th: [
          {
            id: "q-map-8-2",
            question: "Mi a párja a 6-nak, ha a szabály 'a szám fele'?",
            options: ["2", "3", "12", "18"],
            correctAnswer: 1,
            explanation: "6 / 2 = 3."
          }
        ]
      },
      {
        id: "a-fun-egyertelmu",
        title: "Egyértelmű és többértelmű hozzárendelés, megfeleltetés",
        level: 1,
        requirements9th: "Ismerje fel és különböztesse meg az egyértelmű (függvény) és többértelmű hozzárendeléseket.",
        requirements6th: "Értse az egyértelmű hozzárendelés alapjait.",
        requirements8th: "Párosítson elemeket egyértelműen.",
        lesson9th: "### Egyértelműség a hozzárendelésben\n\n- **Egyértelmű hozzárendelés (Függvény):** Az alaphalmaz minden eleméhez a képhalmaznak **pontosan egy** elemét rendeljük hozzá.\n- **Többértelmű hozzárendelés:** Az alaphalmaz legalább egy eleméhez a képhalmaz több eleme is tartozik. Pl. a könyvekhez a szerzőiket rendeljük (ha egy könyvet többen írtak).",
        lesson6th: "### Mi a függvény?\n\nA függvény olyan gép, ami egy bemenő adathoz mindig pontosan egy kimenő adatot rendel hozzá.",
        lesson8th: "### Példák a hozzárendelésre\n\nEgyértelmű: minden emberhez hozzárendeljük az édesanyját (csak 1 édesanyja van mindenkinek).",
        quiz9th: [
          {
            id: "q-single-9-1",
            question: "Függvény-e az a hozzárendelés, amely minden emberhez hozzárendeli a telefonszámait?",
            options: [
              "Igen, mert minden embernek van telefonja.",
              "Nem, mert egy embernek több telefonszáma is lehet (többértelmű).",
              "Igen, mert a telefonszám egyedi.",
              "Csak akkor, ha vezetékes."
            ],
            correctAnswer: 1,
            explanation: "Mivel egy emberhez több telefonszám is tartozhat, a hozzárendelés nem egyértelmű, így nem függvény."
          }
        ],
        quiz6th: [
          {
            id: "q-single-6-1",
            question: "Melyik hozzárendelés egyértelmű az alábbiak közül?",
            options: [
              "Számokhoz a náluk nagyobb számok.",
              "Számokhoz a négyzetük.",
              "Emberekhez a testvéreik.",
              "Számokhoz az osztóik."
            ],
            correctAnswer: 1,
            explanation: "Minden számnak pontosan egy négyzete van, így ez egyértelmű hozzárendelés."
          }
        ],
        quiz8th: [
          {
            id: "q-single-8-1",
            question: "Függvény-e: Minden autóhoz hozzárendeljük a rendszámát?",
            options: ["Igen", "Nem"],
            correctAnswer: 0,
            explanation: "Igen, mert egy autónak csak egy rendszáma van."
          }
        ]
      },
      {
        id: "a-fun-aranyossag",
        title: "Arányos osztás és egyenes arányosság",
        level: 1,
        requirements9th: "Oldjon meg összetett arányos osztási feladatokat és alkalmazza az egyenes arányosságot.",
        requirements6th: "Számoljon egyenes arányossággal következtetéssel.",
        requirements8th: "Értse az arányos részekre osztást rajz alapján.",
        lesson9th: "### Arányosság és arányos osztás\n\n- **Egyenes arányosság:** Két változó mennyiség hányadosa állandó: $y / x = k$. Grafikonja origón átmenő egyenes.\n- **Arányos osztás:** Pl. egy 100 cm-es botot $2 : 3$ arányban vágunk ketté: $2 + 3 = 5$ rész. Egy rész hossza: $100 / 5 = 20$ cm. A részek: $2 \\cdot 20 = 40$ cm és $3 \\cdot 20 = 60$ cm.",
        lesson6th: "### Arányossági számítások\n\nHa 5 kg alma 2000 Ft, akkor 1 kg alma 400 Ft, 8 kg pedig 3200 Ft.",
        lesson8th: "### Az arányos osztás játékosan\n\nOszd el a 10 cukorkát Peti és Mari között 1:4 arányban! Peti kap 1 részt (2 cukorka), Mari kap 4 részt (8 cukorka).",
        quiz9th: [
          {
            id: "q-prop-9-1",
            question: "Egy háromszög szögeinek aránya 1:2:3. Mekkora a legnagyobb szöge?",
            options: ["60 fok", "90 fok", "120 fok", "150 fok"],
            correctAnswer: 1,
            explanation: "A szögek összege 180 fok. Részek száma: 1+2+3 = 6. 1 rész = 180 / 6 = 30 fok. A legnagyobb szög 3 rész: 3 * 30 = 90 fok."
          }
        ],
        quiz6th: [
          {
            id: "q-prop-6-1",
            question: "Ha 3 munkás 6 óra alatt végez el egy munkát, mennyi idő alatt végez el 6 munkás ugyanilyen tempóban? (Fordított arányosság)",
            options: ["3 óra", "6 óra", "12 óra", "2 óra"],
            correctAnswer: 0,
            explanation: "Kétszer annyi munkás feleannyi idő alatt végez: 6 / 2 = 3 óra."
          }
        ],
        quiz8th: [
          {
            id: "q-prop-8-1",
            question: "Ha 2 db fagyi 800 Ft, mennyibe kerül 3 db?",
            options: ["1000 Ft", "1200 Ft", "1600 Ft", "2400 Ft"],
            correctAnswer: 1,
            explanation: "1 db fagyi 400 Ft, így 3 db fagyi 3 * 400 = 1200 Ft."
          }
        ]
      },
      {
        id: "a-fun-koordinata",
        title: "Koordináta-rendszer, pont koordinátái, számpárok ábrázolása",
        level: 1,
        requirements9th: "Ábrázoljon számpárokat a 4 síknegyedben magabiztosan, és olvassa le a pontok koordinátáit.",
        requirements6th: "Határozzon meg koordinátákat az első síknegyedben.",
        requirements8th: "Ismerje meg az x és y tengelyeket.",
        lesson9th: "### Descartes-féle derékszögű koordináta-rendszer\n\nKét egymásra merőleges számegyenes határozza meg a sík pontjait. A pont helyzetét $P(x, y)$ számpár adja meg.\n- $x$: abszcissza (vízszintes távolság az origótól).\n- $y$: ordináta (függőleges távolság).",
        lesson6th: "### Pontok ábrázolása\n\nMindig a vízszintes tengelyen kezdjük a lépkedést, majd a függőlegesen folytatjuk.",
        lesson8th: "### Koordináták játékosan\n\nOlyan, mint a Torpedó játék! Pl. a B4 mezőnek a koordinátarendszerben a (2, 4) pont felel meg.",
        quiz9th: [
          {
            id: "q-co-9-1",
            question: "Hol helyezkedik el a P(5, -2) pont?",
            options: ["I. síknegyed", "II. síknegyed", "III. síknegyed", "IV. síknegyed"],
            correctAnswer: 3,
            explanation: "x pozitív (jobbra), y negatív (le), ez a IV. síknegyed."
          }
        ],
        quiz6th: [
          {
            id: "q-co-6-1",
            question: "Melyik pont fekszik az x-tengelyen?",
            options: ["(3, 3)", "(0, 4)", "(5, 0)", "(0, 0)"],
            correctAnswer: 2,
            explanation: "Az x-tengelyen lévő pontok y koordinátája mindig 0, így a (5, 0) a helyes."
          }
        ],
        quiz8th: [
          {
            id: "q-co-8-1",
            question: "Mi a neve a koordináta-rendszer (0,0) pontjának?",
            options: ["Tengely", "Síknegyed", "Origó", "Mérőszám"],
            correctAnswer: 2,
            explanation: "A (0,0) pontot origónak nevezzük."
          }
        ]
      },
      {
        id: "a-fun-grafikonok",
        title: "Grafikonok értelmezése, elemzése, adatok leolvasása és szabály megállapítása",
        level: 1,
        requirements9th: "Elemezzen összetett folyamatokat ábrázoló grafikonokat. Állapítson meg szabályt táblázatokból.",
        requirements6th: "Olvasson le adatokat egyszerűbb grafikonokról.",
        requirements8th: "Értelmezzen oszlopdiagramokat.",
        lesson9th: "### Grafikonok elemzése és szabályok\n\n- **Folyamatok ábrázolása:** Pl. hőmérséklet változása az idő függvényében.\n- **Szabály megállapítása:** Táblázat alapján keressük a matematikai összefüggést az $x$ és $y$ értékek között. Pl. ha $x=1 \\to y=3$; $x=2 \\to y=5$; $x=3 \\to y=7$, akkor a szabály: $y = 2x + 1$.",
        lesson6th: "### Grafikonok leolvasása\n\nKeressük meg a tengelyeken a megfelelő értékeket és kövessük a rácsvonalakat.",
        lesson8th: "### Diagramok\n\nAz oszlopdiagramok segítenek összehasonlítani mennyiségeket (pl. ki hány könyvet olvasott el).",
        quiz9th: [
          {
            id: "q-gr-9-1",
            question: "Milyen szabály írja le az összefüggést: x=[1, 2, 3] és y=[4, 7, 10]?",
            options: ["y = x + 3", "y = 3x + 1", "y = 4x", "y = 2x + 2"],
            correctAnswer: 1,
            explanation: "3*1 + 1 = 4; 3*2 + 1 = 7; 3*3 + 1 = 10. A szabály y = 3x + 1."
          }
        ],
        quiz6th: [
          {
            id: "q-gr-6-1",
            question: "Ha egy út-idő grafikonon a vonal vízszintes, mit csinál a jármű?",
            options: ["Gyorsít", "Áll (nem halad)", "Lassít", "Egyenletesen halad"],
            correctAnswer: 1,
            explanation: "Mivel az idő telik, de az út nem változik, a jármű áll."
          }
        ],
        quiz8th: [
          {
            id: "q-gr-8-1",
            question: "Mi a szabály? x=[1, 2, 3] -> y=[2, 4, 6]",
            options: ["y = x", "y = 2x", "y = x + 2", "y = x^2"],
            correctAnswer: 1,
            explanation: "Minden y érték az x duplája, azaz y = 2x."
          }
        ]
      }
    ]
  },
  {
    id: "a-statistics",
    title: "6. Statisztika és valószínűség",
    icon: "📈",
    color: "from-pink-500 to-rose-500",
    subtopics: [
      {
        id: "a-stat-mutatok",
        title: "Átlag, módusz, medián",
        level: 0,
        requirements9th: "Számítsa ki egy tetszőleges számsor átlagát, határozza meg a móduszát és mediánját.",
        requirements6th: "Számítsa ki egész számok átlagát és keresse meg a leggyakoribb értéket (módusz).",
        requirements8th: "Számítsa ki osztályzatok átlagát.",
        lesson9th: "### Középértékek statisztikában\n\n- **Átlag (Számtani közép):** Az adatok összege osztva a darabszámmal.\n- **Módusz:** A leggyakoribb elem az adatsorban.\n- **Medián:** A sorba rendezett adatok középső eleme. Ha az adatok száma páros, a két középső átlaga.",
        lesson6th: "### Hogyan számoljunk átlagot?\n\nÖsszeadjuk a jegyeket, majd elosztjuk a darabszámmal.",
        lesson8th: "### A leggyakoribb érték\n\nPl. ha a családban a cipőméretek: 36, 38, 38, 40, 42, akkor a módusz a 38, mert ez fordul elő legtöbbször.",
        quiz9th: [
          {
            id: "q-stat-9-2",
            question: "Mi a mediánja a következő számsornak: 2, 9, 4, 6?",
            options: ["4", "5", "6", "5.25"],
            correctAnswer: 1,
            explanation: "Rendezzük sorba: 2, 4, 6, 9. Páros darabszám miatt a középső kettő (4 és 6) átlaga: (4+6)/2 = 5."
          }
        ],
        quiz6th: [
          {
            id: "q-stat-6-2",
            question: "Mi a módusza az alábbi jegyeknek: 5, 4, 3, 5, 2, 5?",
            options: ["3", "4", "5", "4.16"],
            correctAnswer: 2,
            explanation: "Az 5-ös jegy szerepel a legtöbbször (3-szor), így az a módusz."
          }
        ],
        quiz8th: [
          {
            id: "q-stat-8-2",
            question: "Mennyi a 3, 4, 5 jegyek átlaga?",
            options: ["3", "4", "5", "12"],
            correctAnswer: 1,
            explanation: "(3 + 4 + 5) / 3 = 12 / 3 = 4."
          }
        ]
      },
      {
        id: "a-stat-gyakorisag",
        title: "Gyakoriság, relatív gyakoriság, valószínűség kapcsolata",
        level: 1,
        requirements9th: "Számítson gyakoriságot és relatív gyakoriságot. Értse a valószínűség klasszikus valószínűségi modelljét.",
        requirements6th: "Készítsen gyakoriság táblázatot.",
        requirements8th: "Értse az esélyek valószínűségét egyszerű kísérleteknél.",
        lesson9th: "### Gyakoriság és Valószínűség\n\n- **Gyakoriság:** Az esemény előfordulásának száma ($k$).\n- **Relatív gyakoriság:** $k/n$ (ahol $n$ az összes kísérlet száma).\n- **Klasszikus valószínűség:** Kedvező esetek száma / Összes egyformán valószínű esetek száma.",
        lesson6th: "### Relatív gyakoriság\n\nHa 10-szer dobunk érmével és 6-szor kapunk fejet, a fej relatív gyakorisága 6/10 = 0.6 = 60%.",
        lesson8th: "### Kockadobás esélyei\n\nAnnak a valószínűsége, hogy dobókockával 6-ost dobunk: 1/6, mert 1 kedvező eset van a 6 lehetőségből.",
        quiz9th: [
          {
            id: "q-prob-9-2",
            question: "Egy dobozban 3 piros, 2 kék és 5 zöld golyó van. Mekkora a valószínűsége annak, hogy egyet kihúzva az kék lesz?",
            options: ["20%", "30%", "50%", "10%"],
            correctAnswer: 0,
            explanation: "Összes eset = 3+2+5 = 10. Kedvező (kék) = 2. Valószínűség = 2/10 = 20%."
          }
        ],
        quiz6th: [
          {
            id: "q-prob-6-2",
            question: "Mi a valószínűsége annak, hogy dobókockával páros számot dobunk?",
            options: ["1/2", "1/3", "1/6", "5/6"],
            correctAnswer: 0,
            explanation: "A páros számok a kockán: 2, 4, 6 (3 darab). Összes eset: 6. Valószínűség: 3/6 = 1/2."
          }
        ],
        quiz8th: [
          {
            id: "q-prob-8-2",
            question: "Mekkora az esélye annak, hogy érmével írást dobunk?",
            options: ["25%", "50%", "75%", "100%"],
            correctAnswer: 1,
            explanation: "Az érmének 2 oldala van, így 1/2 = 50% az esélye az írásnak."
          }
        ]
      }
    ]
  },
  {
    id: "a-geom-shapes",
    title: "7. Geometria – síkidomok",
    icon: "📐",
    color: "from-green-500 to-green-600",
    subtopics: [
      {
        id: "a-geom-haromszogek",
        title: "A háromszögek csoportosítása",
        level: 0,
        requirements9th: "Csoportosítsa a háromszögeket oldalaik és szögeik szerint magabiztosan, ismerje a köztük lévő kapcsolatokat.",
        requirements6th: "Ismerje a szabályos, egyenlő szárú és derékszögű háromszögeket.",
        requirements8th: "Ismerje fel a háromszög formát.",
        lesson9th: "### Háromszögek felosztása\n\n- **Oldalak szerint:** sokoldalú (általános), egyenlő szárú, szabályos.\n- **Szögek szerint:** hegyesszögű (minden szöge hegyes), derékszögű (egy derékszög), tompaszögű (egy tompaszög).",
        lesson6th: "### Háromszögek szögei\n\nA háromszög belső szögeinek összege mindig 180 fok.",
        lesson8th: "### Mi a háromszög?\n\n3 csúcsa és 3 oldala van.",
        quiz9th: [
          {
            id: "q-trg-9-1",
            question: "Lehet-e egy derékszögű háromszög egyben szabályos is?",
            options: ["Igen, ha minden oldala egyenlő.", "Nem, mert a szabályos háromszög minden szöge 60 fokos.", "Igen, ha a szögei 90, 45, 45 fokosak.", "Nem eldönthető."],
            correctAnswer: 1,
            explanation: "Szabályos háromszög szögei csak 60 fokosak lehetnek, így nem lehet benne 90 fokos derékszög."
          }
        ],
        quiz6th: [
          {
            id: "q-trg-6-1",
            question: "Melyik háromszögnek van 90 fokos szöge?",
            options: ["Hegyesszögű", "Tompaszögű", "Derékszögű", "Szabályos"],
            correctAnswer: 2,
            explanation: "A derékszögű háromszögnek van egy 90 fokos szöge."
          }
        ],
        quiz8th: [
          {
            id: "q-trg-8-1",
            question: "Hány szabályos szöge van egy szabályos háromszögnek?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 2,
            explanation: "Mind a 3 belső szöge egyenlő (60 fok)."
          }
        ]
      },
      {
        id: "a-geom-negyszogek",
        title: "Négyszögek, speciális négyszögek tulajdonságai és származtatása",
        level: 1,
        requirements9th: "Ismerje a paralelogramma, trapéz és deltoid tulajdonságait, származtatását, átlóik összefüggéseit.",
        requirements6th: "Ismerje a négyzet, téglalap tulajdonságait.",
        requirements8th: "Ismerje fel a négyszögeket.",
        lesson9th: "### Speciális négyszögek\n\n- **Trapéz:** Legalább egy pár párhuzamos oldala van.\n- **Paralelogramma:** Két-két szemközti oldala párhuzamos. Szemközti szögei egyenlők. Átlói felezik egymást.\n- **Rombusz:** Minden oldala egyenlő (olyan paralelogramma, aminek szomszédos oldalai egyenlők). Átlói merőlegesek egymásra.\n- **Deltoid:** Két-két egymás melletti oldala egyenlő. Átlói merőlegesek.",
        lesson6th: "### Téglalap és Négyzet\n\n- **Téglalap:** Minden szöge derékszög, szemközti oldalai párhuzamosak és egyenlők.\n- **Négyzet:** Szabályos négyszög (minden oldala és szöge egyenlő).",
        lesson8th: "### Négyszögek alapjai\n\n4 oldallal határolt síkidomok. Belső szögeik összege 360 fok.",
        quiz9th: [
          {
            id: "q-quad-9-1",
            question: "Melyik állítás igaz minden rombuszra?",
            options: ["Minden szöge derékszög.", "Átlói egyenlő hosszúságúak.", "Átlói merőlegesek egymásra.", "Nem paralelogramma."],
            correctAnswer: 2,
            explanation: "A rombusz átlói felezik egymást és merőlegesek egymásra."
          }
        ],
        quiz6th: [
          {
            id: "q-quad-6-1",
            question: "Igaz-e, hogy minden négyzet téglalap is egyben?",
            options: ["Igen, mert minden szöge 90 fok.", "Nem, mert a téglalap oldalai nem egyenlőek.", "Csak akkor, ha átlói egyenlők.", "Nem eldönthető."],
            correctAnswer: 0,
            explanation: "Igen, mert a téglalap definíciója az, hogy minden szöge derékszög, ami a négyzetre is igaz."
          }
        ],
        quiz8th: [
          {
            id: "q-quad-8-1",
            question: "Hány fok a négyszögek belső szögeinek összege?",
            options: ["180 fok", "360 fok", "540 fok", "90 fok"],
            correctAnswer: 1,
            explanation: "Minden négyszög belső szögeinek összege 360 fok."
          }
        ]
      },
      {
        id: "a-geom-sokszogek",
        title: "Sokszögek fogalma, szögei és átlói",
        level: 1,
        requirements9th: "Számítsa ki az n-oldalú sokszög belső és külső szögeinek összegét, valamint átlóinak számát.",
        requirements6th: "Ismerje a szabályos sokszögek alapvető jellemzőit.",
        requirements8th: "Ismerje fel az ötszöget, hatszöget.",
        lesson9th: "### Sokszögek átlói és szögei\n\n- **Belső szögek összege:** $(n-2) \\cdot 180^\\circ$.\n- **Átlók száma:**\n  - Egy csúcsból húzható: $n - 3$.\n  - Összes átló száma: $\\frac{n(n-3)}{2}$.",
        lesson6th: "### Szabályos hatszög\n\nHat egyenlő oldala és hat egyenlő belső szöge van (mindegyik 120 fokos).",
        lesson8th: "### Sokszögek\n\nTöbb oldallal határolt síkidomok. Pl. ötszög, hatszög, nyolcszög.",
        quiz9th: [
          {
            id: "q-poly-9-1",
            question: "Hány átlója van összesen egy nyolcszögnek?",
            options: ["16", "20", "24", "28"],
            correctAnswer: 1,
            explanation: "n = 8. Átlók száma: 8 * (8-3) / 2 = 8 * 5 / 2 = 20."
          }
        ],
        quiz6th: [
          {
            id: "q-poly-6-1",
            question: "Mekkora a szabályos ötszög belső szögeinek összege?",
            options: ["360 fok", "540 fok", "720 fok", "180 fok"],
            correctAnswer: 1,
            explanation: "(5 - 2) * 180 = 3 * 180 = 540 fok."
          }
        ],
        quiz8th: [
          {
            id: "q-poly-8-1",
            question: "Hány átló húzható egy ötszög egyetlen csúcsából?",
            options: ["2", "3", "5", "10"],
            correctAnswer: 0,
            explanation: "n - 3 = 5 - 3 = 2 átló."
          }
        ]
      }
    ]
  },
  {
    id: "a-geom-trans",
    title: "8. Geometria – transzformációk és szimmetria",
    icon: "🔄",
    color: "from-emerald-500 to-teal-600",
    subtopics: [
      {
        id: "a-trans-alapok",
        title: "Geometriai transzformációk megadása, alkalmazása, egybevágóság",
        level: 0,
        requirements9th: "Ismerje a távolságtartó transzformációkat és az egybevágóság fogalmát.",
        requirements6th: "Értse az alakzatok egybevágóságát (pl. lefedhetőség).",
        requirements8th: "Ismerje fel a hasonló formákat.",
        lesson9th: "### Geometriai transzformációk\n\n- **Egybevágóság:** Két alakzat egybevágó, ha létezik olyan távolságtartó transzformáció, amely az egyiket a másikba viszi. Jelölése: $\\cong$.\n- **Transzformációk típusai:** Eltolás, elforgatás, tükrözés.",
        lesson6th: "### Egybevágóság\n\nKét síkidom egybevágó, ha tökéletesen lefedik egymást kivágás és egymásra helyezés után.",
        lesson8th: "### Mozgatások a síkon\n\nTologatás, forgatás és átfordítás (tükrözés).",
        quiz9th: [
          {
            id: "q-trsf-9-1",
            question: "Megváltoztatja-e az eltolás a síkidom kerületét?",
            options: ["Igen, ha nagy távolságra toljuk.", "Nem, mert az eltolás távolságtartó transzformáció.", "Igen, a mozgás miatt.", "Csak akkor, ha elforgatjuk."],
            correctAnswer: 1,
            explanation: "Az eltolás egybevágósági transzformáció (távolságtartó), így a síkidom alakja és mérete (kerülete is) változatlan marad."
          }
        ],
        quiz6th: [
          {
            id: "q-trsf-6-1",
            question: "Egybevágó-e két négyzet, ha a kerületük megegyezik?",
            options: ["Igen, mert az oldalhosszuk is egyenlő.", "Nem feltétlenül.", "Csak ha ugyanott helyezkednek el.", "Nem eldönthető."],
            correctAnswer: 0,
            explanation: "Igen, ha a négyzetek kerülete megegyezik, akkor a 4a miatt az oldalaik is egyenlőek, így egybevágóak."
          }
        ],
        quiz8th: [
          {
            id: "q-trsf-8-1",
            question: "Egybevágó-e két kör, ha a sugaruk egyenlő?",
            options: ["Igen", "Nem"],
            correctAnswer: 0,
            explanation: "Igen, mert azonos sugarú körök teljesen egybevágóak."
          }
        ]
      },
      {
        id: "a-trans-tengelyes",
        title: "Tengelyes tükrözés és tulajdonságai, tengelyes szimmetria",
        level: 1,
        requirements9th: "Tükrözzön pontokat és alakzatokat tengelyesen. Sorolja fel a tengelyesen szimmetrikus alakzatok tulajdonságait.",
        requirements6th: "Tudjon tükrözni egyszerűbb pontokat négyzethálón.",
        requirements8th: "Ismerje fel a tengelyes szimmetriát a környezetében.",
        lesson9th: "### Tengelyes tükrözés\n\nAdott egy $t$ tengely.\n- **Tulajdonságai:** Távolságtartó, szögtartó, a körüljárási irányt megfordítja (balmenetesből jobbmenetes lesz). A pont és képe összekötő szakaszára a tengely merőleges és felezi azt.",
        lesson6th: "### Tükrözés rácson\n\nSzámoljuk meg a rácsokat merőlegesen a tengelyig, majd lépjünk ugyanennyit tovább a túloldalon.",
        lesson8th: "### Szimmetria a természetben\n\nA pillangók, levelek szimmetriája tengelyes szimmetria.",
        quiz9th: [
          {
            id: "q-sym-9-1",
            question: "Hány szimmetriatengelye van egy szabályos háromszögnek?",
            options: ["1", "2", "3", "Végtelen"],
            correctAnswer: 2,
            explanation: "A szabályos háromszögnek 3 szimmetriatengelye van (a belső szögfelezők / oldalfelező merőlegesek)."
          }
        ],
        quiz6th: [
          {
            id: "q-sym-6-1",
            question: "Hány szimmetriatengelye van egy körnek?",
            options: ["1", "2", "4", "Végtelen sok"],
            correctAnswer: 3,
            explanation: "A kör minden középpontján átmenő egyenesre szimmetrikus, így végtelen sok tengelye van."
          }
        ],
        quiz8th: [
          {
            id: "q-sym-8-1",
            question: "Tengelyesen szimmetrikus-e a téglalap?",
            options: ["Nem szimmetrikus.", "Igen, 2 tengelye van.", "Igen, 4 tengelye van.", "Igen, 1 tengelye van."],
            correctAnswer: 1,
            explanation: "Igen, a téglalapnak 2 szimmetriatengelye van (az oldalfelező merőlegesek)."
          }
        ]
      },
      {
        id: "a-trans-kozepvonal",
        title: "Középpontos tükrözés és tulajdonságai, középpontos szimmetria",
        level: 1,
        requirements9th: "Tükrözzön pontokat és síkidomokat középpontosan. Ismerje fel a középpontosan szimmetrikus síkidomokat.",
        requirements6th: "Értse az origóra való tükrözés fogalmát.",
        requirements8th: "Ismerje fel a forgásszimmetriát.",
        lesson9th: "### Középpontos tükrözés\n\nAdott egy $O$ tükrözési középpont.\n- **Tulajdonságai:** Távolságtartó, szögtartó, körüljárási irányt megtartja. A pont, a középpont és a kép egy egyenesen vannak, és $O$ felezi a szakaszt.",
        lesson6th: "### Középpontos szimmetria\n\nEgy alakzat középpontosan szimmetrikus, ha 180 fokos elforgatás után önmagába megy át. Pl. a paralelogramma.",
        lesson8th: "### Forgásszimmetria\n\nPl. egy szélkerék forgatva önmagát ismétli.",
        quiz9th: [
          {
            id: "q-cen-9-1",
            question: "Középpontosan szimmetrikus-e a szabályos háromszög?",
            options: ["Igen, a súlypontjára.", "Nem, mert 180 fokos elforgatással fejjel lefelé állna.", "Igen, a csúcsaira.", "Nem eldönthető."],
            correctAnswer: 1,
            explanation: "A szabályos háromszög 180 fokos elforgatással nem esik önmagába, így nem középpontosan szimmetrikus (csak 120 fokos forgásszimmetriája van)."
          }
        ],
        quiz6th: [
          {
            id: "q-cen-6-1",
            question: "Melyik alakzat középpontosan szimmetrikus az alábbiak közül?",
            options: ["Trapéz", "Rendszám", "Paralelogramma", "Egyenlő szárú háromszög"],
            correctAnswer: 2,
            explanation: "A paralelogramma az átlóinak metszéspontjára nézve középpontosan szimmetrikus."
          }
        ],
        quiz8th: [
          {
            id: "q-cen-8-1",
            question: "Középpontosan szimmetrikus-e a négyzet?",
            options: ["Igen", "Nem"],
            correctAnswer: 0,
            explanation: "Igen, a négyzet középpontosan szimmetrikus az átlóinak metszéspontjára nézve."
          }
        ]
      }
    ]
  },
  {
    id: "a-geom-triangles",
    title: "9. Geometria – háromszögek",
    icon: "📐",
    color: "from-blue-400 to-indigo-500",
    subtopics: [
      {
        id: "a-trg-osszefuggesek",
        title: "A háromszög oldalai és szögei közötti elemi összefüggések",
        level: 0,
        requirements9th: "Alkalmazza a háromszög-egyenlőtlenséget és a szögek összegeire vonatkozó tételeket.",
        requirements6th: "Tudja, hogy a belső szögek összege 180 fok.",
        requirements8th: "Értse, hogy a rövidebb oldalakkal nem építhető háromszög.",
        lesson9th: "### Háromszög egyenlőtlenségek és szögek\n\n- **Háromszög-egyenlőtlenség:** $a + b > c$, $a + c > b$, $b + c > a$.\n- **Oldalak és szögek kapcsolata:** Hosszabb oldallal szemben nagyobb belső szög fekszik.\n- **Belső szögek összege:** $\\alpha + \\beta + \\gamma = 180^\\circ$.\n- **Külső szög tétel:** Bármely külső szög megegyezik a két nem mellette fekvő belső szög összegével: $\\alpha' = \\beta + \\gamma$.",
        lesson6th: "### Szögek összege\n\nHa egy háromszög két szöge 40 és 60 fok, a harmadik szög: 180 - (40+60) = 80 fok.",
        lesson8th: "### Háromszög oldalai\n\nHa a háromszög oldalai 2 cm, 3 cm és 6 cm lennének, a két rövidebb összege (2+3=5) kisebb lenne a 6-nál, így nem érnének össze a szárak (nem szerkeszthető).",
        quiz9th: [
          {
            id: "q-trgrel-9-1",
            question: "Egy háromszög oldalai a = 5 cm, b = 6 cm. Mekkora lehet a harmadik c oldal hossza egész cm-ben?",
            options: ["1 cm és 11 cm között", "2 cm és 10 cm között", "Bármennyi", "Csak 5 vagy 6 cm"],
            correctAnswer: 1,
            explanation: "Háromszög-egyenlőtlenség miatt: c < a+b = 11, és c > b-a = 1. Tehát 2 és 10 cm közötti egész számok lehetnek."
          }
        ],
        quiz6th: [
          {
            id: "q-trgrel-6-1",
            question: "Melyik háromszög-szöghármas nem lehetséges?",
            options: ["30, 60, 90 fok", "50, 50, 80 fok", "70, 70, 70 fok", "45, 45, 90 fok"],
            correctAnswer: 2,
            explanation: "70 + 70 + 70 = 210 fok, ami nem 180 fok, így nem létezik ilyen háromszög."
          }
        ],
        quiz8th: [
          {
            id: "q-trgrel-8-1",
            question: "Melyik oldalhossz-hármasból szerkeszthető háromszög?",
            options: ["2 cm, 2 cm, 5 cm", "3 cm, 4 cm, 5 cm", "1 cm, 2 cm, 3 cm", "2 cm, 3 cm, 6 cm"],
            correctAnswer: 1,
            explanation: "3 + 4 = 7 > 5. A háromszög-egyenlőtlenség teljesül, így szerkeszthető."
          }
        ]
      },
      {
        id: "a-trg-nevezetes",
        title: "A háromszög nevezetes vonalainak fogalma",
        level: 1,
        requirements9th: "Definiálja a magasságvonal, súlyvonal, oldalfelező merőleges, szögfelező és középvonal fogalmát és tulajdonságaikat.",
        requirements6th: "Ismerje a magasság és a magasságvonal szerepét a területnél.",
        requirements8th: "Értse a magasság és a felezőpont fogalmát.",
        lesson9th: "### Háromszög nevezetes vonalai\n\n- **Magasságvonal:** A csúcsból a szemközti oldal egyenesére állított merőleges.\n- **Súlyvonal:** A csúcsot a szemközti oldal felezőpontjával összekötő szakasz. (A súlypont a súlyvonalat $2:1$ arányban osztja a csúcstól számítva).\n- **Oldalfelező merőleges:** A háromszög oldalának felezőpontjába állított merőleges egyenes. (Metszéspontjuk a körülírt kör középpontja).\n- **Belső szögfelező:** A belső szöget felező félegyenes. (Metszéspontjuk a beírt kör középpontja).\n- **Középvonal:** Két oldal felezőpontját összekötő szakasz. Párhuzamos a harmadik oldallal és feleakkora.",
        lesson6th: "### Magasságvonal\n\nA háromszög magassága a csúcs és a szemközti oldal távolsága, ami merőleges az oldalra.",
        lesson8th: "### Súlypont\n\nA súlypont az a pont, ahol a papírból kivágott háromszöget egy tű hegyére téve az tökéletes egyensúlyban marad.",
        quiz9th: [
          {
            id: "q-lines-9-1",
            question: "Milyen arányban osztja a súlypont a súlyvonalat a csúcstól számítva?",
            options: ["1:1", "1:2", "2:1", "3:1"],
            correctAnswer: 2,
            explanation: "A súlypont a súlyvonalat 2:1 arányban osztja fel a csúcstól távolodva."
          }
        ],
        quiz6th: [
          {
            id: "q-lines-6-1",
            question: "Melyik vonal köti össze a csúcsot a szemközti oldal felezőpontjával?",
            options: ["Magasságvonal", "Súlyvonal", "Szögfelező", "Középvonal"],
            correctAnswer: 1,
            explanation: "Ez a súlyvonal definíciója."
          }
        ],
        quiz8th: [
          {
            id: "q-lines-8-1",
            question: "Hány magasságvonala van egy háromszögnek?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 2,
            explanation: "Minden háromszögnek 3 csúcsa van, így 3 magasságvonala van."
          }
        ]
      }
    ]
  },
  {
    id: "a-measurement",
    title: "10. Kerület, terület, felszín, térfogat (mérés)",
    icon: "📏",
    color: "from-cyan-500 to-blue-500",
    subtopics: [
      {
        id: "a-meas-haromszog",
        title: "A háromszög kerülete és területe",
        level: 0,
        requirements9th: "Számítsa ki a háromszög kerületét és területét a megadott adatok alapján, használja a magasságot.",
        requirements6th: "Számítsa ki a derékszögű háromszög területét téglalapként felezve.",
        requirements8th: "Értse meg a háromszög kerületének kiszámítását.",
        lesson9th: "### Háromszög kerülete és területe\n\n- **Kerület:** $K = a + b + c$\n- **Terület:**\n  $$T = \\frac{a \\cdot m_a}{2} = \\frac{b \\cdot m_b}{2} = \\frac{c \\cdot m_c}{2}$$\n  (az oldal és a hozzá tartozó magasság szorzatának a fele).",
        lesson6th: "### Derékszögű háromszög területe\n\nA derékszögű háromszög területe megegyezik a befogók szorzatának felével: $T = (a \\cdot b)/2$, mert az egy kiegészített téglalap fele.",
        lesson8th: "### Háromszög kerülete\n\nA három oldalhossz összege: $K = a + b + c$.",
        quiz9th: [
          {
            id: "q-triarea-9-1",
            question: "Mekkora a területe annak a háromszögnek, melynek egyik oldala 10 cm, a hozzá tartozó magasság pedig 4 cm?",
            options: ["40 cm2", "20 cm2", "14 cm2", "80 cm2"],
            correctAnswer: 1,
            explanation: "T = (a * m_a) / 2 = (10 * 4) / 2 = 20 cm2."
          }
        ],
        quiz6th: [
          {
            id: "q-triarea-6-1",
            question: "Mekkora a területe egy 6 cm és 8 cm befogójú derékszögű háromszögnek?",
            options: ["48 cm2", "24 cm2", "14 cm2", "28 cm2"],
            correctAnswer: 1,
            explanation: "T = (a * b) / 2 = (6 * 8) / 2 = 24 cm2."
          }
        ],
        quiz8th: [
          {
            id: "q-triarea-8-1",
            question: "Mekkora a kerülete a 3 cm, 4 cm és 5 cm oldalú háromszögnek?",
            options: ["12 cm", "6 cm", "7 cm", "20 cm"],
            correctAnswer: 0,
            explanation: "K = 3 + 4 + 5 = 12 cm."
          }
        ]
      },
      {
        id: "a-meas-paralelogramma",
        title: "A paralelogramma kerülete és területe",
        level: 1,
        requirements9th: "Számítsa ki a paralelogramma kerületét és területét oldalaiból és magasságából.",
        requirements6th: "Értse a paralelogramma átdarabolhatóságát téglalappá.",
        requirements8th: "Ismerje fel a paralelogramma formáját.",
        lesson9th: "### Paralelogramma kerülete és területe\n\n- **Kerület:** $K = 2(a + b)$\n- **Terület:**\n  $$T = a \\cdot m_a = b \\cdot m_b$$\n  (oldal szorozva a hozzá tartozó magassággal).",
        lesson6th: "### Paralelogramma átdarabolása\n\nHa levágjuk a paralelogramma egyik sarkát egy magasságvonal mentén és a túloldalra tesszük, egy téglalapot kapunk, melynek területe megegyezik a paralelogrammáéval: $T = a \\cdot m_a$.",
        lesson8th: "### Paralelogramma kerülete\n\nKét szemközti oldala egyenlő, így a kerület: $K = 2(a + b)$, mint a téglalapnál.",
        quiz9th: [
          {
            id: "q-para-9-1",
            question: "Egy paralelogramma oldala 8 cm, a hozzá tartozó magasság 5 cm. Mekkora a területe?",
            options: ["20 cm2", "40 cm2", "80 cm2", "26 cm2"],
            correctAnswer: 1,
            explanation: "T = a * m_a = 8 * 5 = 40 cm2."
          }
        ],
        quiz6th: [
          {
            id: "q-para-6-1",
            question: "Mekkora a kerülete annak a paralelogrammának, melynek oldalai 6 cm és 4 cm?",
            options: ["10 cm", "20 cm", "24 cm", "12 cm"],
            correctAnswer: 1,
            explanation: "K = 2 * (6 + 4) = 20 cm."
          }
        ],
        quiz8th: [
          {
            id: "q-para-8-1",
            question: "Melyik képlettel számoljuk a paralelogramma területét?",
            options: ["T = a * b", "T = a * m_a", "T = (a * m_a)/2", "T = a + b"],
            correctAnswer: 1,
            explanation: "A terület T = a * m_a."
          }
        ]
      },
      {
        id: "a-meas-trapez",
        title: "A trapéz kerülete és területe",
        level: 1,
        requirements9th: "Számítsa ki a trapéz kerületét és területét a párhuzamos oldalakból és magasságából.",
        requirements6th: "Értse a trapéz képletének alapjait.",
        requirements8th: "Ismerje fel a trapézt.",
        lesson9th: "### Trapéz kerülete és területe\n\n- **Kerület:** $K = a + b + c + d$\n- **Terület:**\n  $$T = \\frac{a + c}{2} \\cdot m$$\n  (a párhuzamos oldalak számtani közepe szorozva a magassággal).",
        lesson6th: "### Hogyan jegyezzük meg a trapéz területét?\n\nA trapéz területe a középvonal ($f = (a+c)/2$) szorozva a magassággal ($m$).",
        lesson8th: "### Trapéz fogalma\n\nOlyan négyszög, amelynek van legalább egy pár párhuzamos oldala (ezek az alapok: a és c).",
        quiz9th: [
          {
            id: "q-trap-9-1",
            question: "Egy trapéz párhuzamos oldalai 6 cm és 10 cm, magassága 4 cm. Mekkora a területe?",
            options: ["32 cm2", "64 cm2", "240 cm2", "16 cm2"],
            correctAnswer: 0,
            explanation: "T = ((6 + 10) / 2) * 4 = 8 * 4 = 32 cm2."
          }
        ],
        quiz6th: [
          {
            id: "q-trap-6-1",
            question: "Mekkora a kerülete a 10 cm, 5 cm, 6 cm, 5 cm oldalú trapéznak?",
            options: ["20 cm", "26 cm", "30 cm", "50 cm"],
            correctAnswer: 1,
            explanation: "K = 10 + 5 + 6 + 5 = 26 cm."
          }
        ],
        quiz8th: [
          {
            id: "q-trap-8-1",
            question: "Mit jelent a trapéz területszámításában az (a+c)/2 rész?",
            options: ["A magasságot.", "A párhuzamos oldalak átlagát.", "A kerület felét.", "A szárak összegét."],
            correctAnswer: 1,
            explanation: "Ez a párhuzamos alapok számtani közepe (a középvonal hossza)."
          }
        ]
      },
      {
        id: "a-meas-deltoid",
        title: "A deltoid kerülete és területe",
        level: 1,
        requirements9th: "Számítsa ki a deltoid kerületét és területét az átlókból és oldalakból.",
        requirements6th: "Ismerje a deltoid formáját és egyszerű tulajdonságait.",
        requirements8th: "Ismerje fel a sárkány formájú deltoidot.",
        lesson9th: "### Deltoid kerülete és területe\n\n- **Kerület:** $K = 2(a + b)$ (mivel két-két egymás melletti oldala egyenlő).\n- **Terület:**\n  $$T = \\frac{e \\cdot f}{2}$$\n  (az átlók szorzatának a fele).",
        lesson6th: "### Deltoid átlói\n\nA deltoid átlói merőlegesek egymásra, és legalább az egyik felezi a másikat.",
        lesson8th: "### Deltoid kerülete\n\nHa a deltoid oldalai 5 cm és 8 cm hosszúak, akkor a kerület: $K = 2 \\cdot (5 + 8) = 26$ cm.",
        quiz9th: [
          {
            id: "q-delt-9-1",
            question: "Egy deltoid átlói e = 6 cm és f = 8 cm. Mekkora a területe?",
            options: ["48 cm2", "24 cm2", "14 cm2", "96 cm2"],
            correctAnswer: 1,
            explanation: "T = (e * f) / 2 = (6 * 8) / 2 = 24 cm2."
          }
        ],
        quiz6th: [
          {
            id: "q-delt-6-1",
            question: "Mekkora a kerülete annak a deltoidnak, amelynek oldalai 3 cm és 7 cm?",
            options: ["10 cm", "20 cm", "21 cm", "14 cm"],
            correctAnswer: 1,
            explanation: "K = 2 * (3 + 7) = 20 cm."
          }
        ],
        quiz8th: [
          {
            id: "q-delt-8-1",
            question: "Hogyan viszonyulnak egymáshoz a deltoid átlói?",
            options: ["Párhuzamosak.", "Egyenlőek.", "Merőlegesek egymásra.", "Nem találkoznak."],
            correctAnswer: 2,
            explanation: "A deltoid átlói mindig merőlegesek egymásra."
          }
        ]
      },
      {
        id: "a-meas-hasab",
        title: "A hasáb felszíne és térfogata",
        level: 1,
        requirements9th: "Számítsa ki az egyenes hasábok felszínét és térfogatát a megadott adatokból. Végezzen mértékegység átváltást.",
        requirements6th: "Számítsa ki a téglatest és a kocka felszínét és térfogatát.",
        requirements8th: "Értse meg a kocka és téglatest alapjait.",
        lesson9th: "### Hasábok felszíne és térfogata\n\n- **Térfogat (V):** Alapterület szorozva a magassággal:\n  $$V = T_{\\text{alap}} \\cdot m$$\n- **Felszín (A):** Az összes lap területének összege:\n  $$A = 2 \\cdot T_{\\text{alap}} + T_{\\text{palást}}$$",
        lesson6th: "### Téglatest mérése\n\n- **Felszín:** $A = 2(ab + bc + ac)$\n- **Térfogat:** $V = a \\cdot b \\cdot c$",
        lesson8th: "### Kocka felszíne és térfogata\n\n- **Felszín:** $A = 6 \\cdot a^2$\n- **Térfogat:** $V = a^3$",
        quiz9th: [
          {
            id: "q-prism-9-1",
            question: "Mekkora a térfogata egy olyan egyenes hasábnak, melynek alapterülete 15 cm2, magassága pedig 6 cm?",
            options: ["90 cm3", "45 cm3", "30 cm3", "180 cm3"],
            correctAnswer: 0,
            explanation: "V = T_alap * m = 15 * 6 = 90 cm3."
          }
        ],
        quiz6th: [
          {
            id: "q-prism-6-1",
            question: "Mekkora a térfogata egy a=2 cm, b=3 cm, c=4 cm élekkel rendelkező téglatestnek?",
            options: ["9 cm3", "24 cm3", "26 cm3", "52 cm3"],
            correctAnswer: 1,
            explanation: "V = a * b * c = 2 * 3 * 4 = 24 cm3."
          }
        ],
        quiz8th: [
          {
            id: "q-prism-8-1",
            question: "Hány lapja van a téglatestnek?",
            options: ["4", "6", "8", "12"],
            correctAnswer: 1,
            explanation: "A téglatestet 6 darab téglalaplap határolja."
          }
        ]
      }
    ]
  }
];
