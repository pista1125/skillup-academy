import { AdmissionQuizQuestion } from '../../../data/admissionContent';

// ----------------------------------------------------------------------
// SUBTOPIC 1: Elemi kombinatorika (a-comb-elemi)
// ----------------------------------------------------------------------

export const combElemiQuizEasy: AdmissionQuizQuestion[] = [
  {
    id: "k-comb-e-1",
    question: "Egy szekrényben 3 póló (piros, kék, zöld) és 2 nadrág (fekete, farmer) van. Hányféleképpen választhatunk ki egy pólót és egy nadrágot?",
    options: ["5", "6", "8", "9"],
    correctAnswer: 1,
    explanation: "Szorzási szabály: 3 póló * 2 nadrág = 6 különböző öltözet állítható össze."
  },
  {
    id: "k-comb-e-2",
    question: "Hány különböző 2-jegyű számot tudunk képezni az 1 és 2 számjegyekből, ha a számjegyek ismétlődhetnek?",
    options: ["2", "4", "6", "8"],
    correctAnswer: 1,
    explanation: "Az első helyre 2 lehetőség van (1 vagy 2), a másodikra is 2 lehetőség: 2 * 2 = 4 (11, 12, 21, 22)."
  },
  {
    id: "k-comb-e-3",
    question: "Hányféleképpen ülhet le 3 gyerek (Anna, Balázs, Csiperke) egy padra egymás mellé?",
    options: ["3", "6", "9", "12"],
    correctAnswer: 1,
    explanation: "3 elem sorrendjeinek száma (permutáció): 3! = 3 * 2 * 1 = 6."
  },
  {
    id: "k-comb-e-4",
    question: "Egy fagylaltosnál 4-féle fagylalt van (csoki, vanília, eper, citrom). Hányféleképpen választhatunk egy 1 gombócos fagylaltot?",
    options: ["1", "2", "4", "8"],
    correctAnswer: 2,
    explanation: "Mivel 4-féle fagylalt áll rendelkezésre, pontosan 4 lehetőség közül választhatunk."
  },
  {
    id: "k-comb-e-5",
    question: "Egy dobókockával egyszer dobunk. Hányféle páros számot dobhatunk?",
    options: ["2", "3", "4", "6"],
    correctAnswer: 1,
    explanation: "A páros kimenetelek a 2, 4 és 6, azaz összesen 3 kedvező eset van."
  },
  {
    id: "k-comb-e-6",
    question: "Egy érmét egymás után 2-szer feldobunk. Hányféle írás (Í) és fej (F) sorrend keletkezhet?",
    options: ["2", "4", "6", "8"],
    correctAnswer: 1,
    explanation: "A lehetséges kimenetelek: FF, FÍ, ÍF, ÍÍ, azaz 2 * 2 = 4 lehetőség."
  },
  {
    id: "k-comb-e-7",
    question: "Hány kétjegyű páros szám képezhető az 1, 3, 4 számjegyekből, ha a számjegyek nem ismétlődhetnek?",
    options: ["2", "4", "6", "8"],
    correctAnswer: 0,
    explanation: "Ahhoz, hogy páros legyen, a második jegynek 4-nek kell lennie. Az első jegy lehet 1 vagy 3. Tehát 14 és 34 (2 lehetőség)."
  },
  {
    id: "k-comb-e-8",
    question: "Hányféleképpen választhatunk ki egy osztályból (15 fiú, 10 lány) egy fiú-lány párost a táncversenyre?",
    options: ["25", "150", "200", "300"],
    correctAnswer: 1,
    explanation: "A fiú kiválasztása 15-féleképpen, a lányé 10-féleképpen lehetséges: 15 * 10 = 150."
  },
  {
    id: "k-comb-e-9",
    question: "Hányféleképpen rendezhető sorba 2 piros és 1 kék golyó egymás mellett?",
    options: ["2", "3", "6", "9"],
    correctAnswer: 1,
    explanation: "A kék golyó 3 helyen állhat (első, második vagy harmadik): KPP, PKP, PPK. Összesen 3 eset."
  },
  {
    id: "k-comb-e-10",
    question: "Egy menüben 2-féle leves és 3-féle főétel közül választhatunk. Hányféle kétfogásos ebéd állítható össze?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    explanation: "2 * 3 = 6-féle kétfogásos menü állítható össze."
  }
];

export const combElemiQuizMedium: AdmissionQuizQuestion[] = [
  {
    id: "k-comb-m-1",
    question: "Hány 3-jegyű páros szám képezhető az 1, 2, 3, 4 számjegyekből, ha a számjegyek nem ismétlődhetnek?",
    options: ["6", "12", "18", "24"],
    correctAnswer: 1,
    explanation: "Az utolsó jegy páros (2 vagy 4 -> 2 lehetőség). Az első jegy a maradék 3 számjegyből választható, a második a maradék 2-ből: 2 * 3 * 2 = 12 lehetőség."
  },
  {
    id: "k-comb-m-2",
    question: "Hány olyan 3-jegyű szám van, amelynek minden számjegye páratlan (1, 3, 5, 7, 9) és a számjegyek ismétlődhetnek?",
    options: ["60", "125", "243", "500"],
    correctAnswer: 1,
    explanation: "Mindhárom helyre 5-féle páratlan számjegy kerülhet: 5 * 5 * 5 = 125."
  },
  {
    id: "k-comb-m-3",
    question: "4 barát (A, B, C, D) mozi jegyet vesz egymás melletti székekre. Hányféleképpen ülhetnek le, ha A és B mindenképpen egymás mellett szeretne ülni?",
    options: ["8", "12", "16", "24"],
    correctAnswer: 1,
    explanation: "Tekintsük (A,B)-t egyetlen blokknak. Ekkor 3 elemet ([AB], C, D) 3! = 6-féleképpen rendezhetünk el. Mivel A és B sorrendje a blokkon belül 2-féle lehet (AB vagy BA), így 6 * 2 = 12 lehetőség van."
  },
  {
    id: "k-comb-m-4",
    question: "Hány átlója van egy konvex ötszögnek?",
    options: ["5", "10", "15", "20"],
    correctAnswer: 0,
    explanation: "Átlók száma képlet: n*(n-3)/2. Ötszögre: 5 * (5-3) / 2 = 5 * 2 / 2 = 5."
  },
  {
    id: "k-comb-m-5",
    question: "Hány olyan 2-jegyű szám van, amelyben a számjegyek összege 5?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    explanation: "Felsorolás: 14, 23, 32, 41, 50. Összesen 5 ilyen szám van."
  },
  {
    id: "k-comb-m-6",
    question: "Egy körmérkőzéses bajnokságban 5 csapat vesz részt. Minden csapat játszik mindenkivel egyszer. Hány mérkőzést játszanak összesen?",
    options: ["10", "15", "20", "25"],
    correctAnswer: 0,
    explanation: "5 csapatból 2 csapatot kell kiválasztani: (5 * 4) / 2 = 10 mérkőzés."
  },
  {
    id: "k-comb-m-7",
    question: "Hány olyan 3-jegyű szám képezhető a 0, 1, 2 számjegyekből, ahol a számjegyek ismétlődhetnek? (Szám nem kezdődhet 0-val!)",
    options: ["12", "18", "27", "36"],
    correctAnswer: 1,
    explanation: "Az első helyre 2 számjegy kerülhet (1 vagy 2), a másodikra és harmadikra 3-3 számjegy (0, 1, 2): 2 * 3 * 3 = 18."
  },
  {
    id: "k-comb-m-8",
    question: "3 piros és 2 kék golyót teszünk egy sorba. Hány különböző színösszeállítás lehetséges?",
    options: ["5", "10", "20", "120"],
    correctAnswer: 1,
    explanation: "5 helyből kell kiválasztanunk azt a 2 helyet, ahová kék golyó kerül: (5 * 4) / (2 * 1) = 10 lehetőség."
  },
  {
    id: "k-comb-m-9",
    question: "Hányféleképpen választhatunk ki 2 tanulót egy 6 fős csoportból az osztályinfó szerkesztésére?",
    options: ["12", "15", "18", "30"],
    correctAnswer: 1,
    explanation: "A sorrend nem számít: (6 * 5) / 2 = 15 lehetőség."
  },
  {
    id: "k-comb-m-10",
    question: "Hány olyan 4-jegyű szám képezhető az 1, 2, 3, 4 számjegyekből (ismétlődés nélkül), amely 5-tel nem osztható?",
    options: ["12", "18", "24", "30"],
    correctAnswer: 2,
    explanation: "Az 1, 2, 3, 4 számjegyekből álló számok utolsó jegye soha nem 0 vagy 5, így az összes permutáció (4! = 24) egyike sem osztható 5-tel."
  }
];

export const combElemiQuizHard: AdmissionQuizQuestion[] = [
  {
    id: "k-comb-h-1",
    question: "Hány olyan 4-jegyű páros szám képezhető a 0, 1, 2, 3, 4 számjegyekből ismétlődés nélkül?",
    options: ["36", "48", "60", "72"],
    correctAnswer: 2,
    explanation: "1) Ha az utolsó jegy 0 (1 lehetőség): az első 3 helyre 4*3*2 = 24 szám. 2) Ha az utolsó jegy 2 vagy 4 (2 lehetőség): az első helyre nem kerülhet 0 (3 lehetőség), így 2 * (3*3*2) = 36. Összesen: 24 + 36 = 60."
  },
  {
    id: "k-comb-h-2",
    question: "Egy 8 fős társaságban mindenki mindenkivel koccint egyszer. Hány koccintás történik összesen?",
    options: ["16", "28", "32", "56"],
    correctAnswer: 1,
    explanation: "8 emberből 2 embert kell kiválasztani: (8 * 7) / 2 = 28 koccintás."
  },
  {
    id: "k-comb-h-3",
    question: "Hány olyan 3-jegyű szám van, amelyben a számjegyek szorzata 6?",
    options: ["6", "9", "12", "15"],
    correctAnswer: 1,
    explanation: "(1,1,6) -> 3 permutáció (116, 161, 611); (1,2,3) -> 3! = 6 permutáció. Összesen: 3 + 6 = 9 szám."
  },
  {
    id: "k-comb-h-4",
    question: "Hányféleképpen ülhet le 5 ember egy kerek asztal köré? (Két ülésrendet akkor tekintünk azonosnak, ha elforgatással egymásba vihetők).",
    options: ["12", "24", "60", "120"],
    correctAnswer: 1,
    explanation: "Körpermutáció képlete (n-1)!: (5-1)! = 4! = 24."
  },
  {
    id: "k-comb-h-5",
    question: "Hány olyan 3-jegyű szám képezhető az 1, 2, 3, 4, 5 számjegyekből (ismétlődés nélkül), amely osztható 3-mal?",
    options: ["18", "24", "30", "36"],
    correctAnswer: 1,
    explanation: "A 3-mal osztható számjegyhármasok: {1,2,3}, {1,3,5}, {2,3,4}, {3,4,5} (4-féle halmaz). Mindegyikből 3! = 6 szám képezhető: 4 * 6 = 24."
  },
  {
    id: "k-comb-h-6",
    question: "Hányféleképpen választhatunk ki egy 10 fős osztályból 3 fős küldöttséget, ha az osztályelsőnek mindenképpen a küldöttségben kell lennie?",
    options: ["36", "45", "72", "120"],
    correctAnswer: 0,
    explanation: "Az osztályelső helye fix, így a maradék 9 diákból választunk 2-t: (9 * 8) / 2 = 36."
  },
  {
    id: "k-comb-h-7",
    question: "Hány olyan 4-jegyű szám van, amelynek az első és utolsó számjegye megegyezik, de nem 0?",
    options: ["900", "90", "810", "1000"],
    correctAnswer: 0,
    explanation: "Az első jegy 9-féle (1..9), ami rögzíti az utolsó jegyet. A középső 2 jegy 10*10 = 100 lehetőség: 9 * 100 = 900."
  },
  {
    id: "k-comb-h-8",
    question: "Hány olyan 3-jegyű szám van, amelyben van legalább egy 5-ös számjegy?",
    options: ["225", "252", "300", "450"],
    correctAnswer: 1,
    explanation: "Összes 3-jegyű: 900. Azok száma, amelyekben NINCS 5-ös: 8 * 9 * 9 = 648. Eredmény: 900 - 648 = 252."
  },
  {
    id: "k-comb-h-9",
    question: "Hányféleképpen állíthatunk fel egy sorba 3 fiút és 3 lányt úgy, hogy fiú és lány felváltva kövesse egymást?",
    options: ["36", "72", "144", "288"],
    correctAnswer: 1,
    explanation: "Két mintázat van (F-L-F-L-F-L és L-F-L-F-L-F). Mindkettőnél 3! * 3! = 36 lehetőség: 2 * 36 = 72."
  },
  {
    id: "k-comb-h-10",
    question: "Egy tesztben 5 igaz/hamis kérdés van. Hányféleképpen tölthető ki a teszt úgy, hogy legalább 4 válasz helyes legyen?",
    options: ["5", "6", "10", "32"],
    correctAnswer: 1,
    explanation: "Pontosan 5 helyes: 1 eset. Pontosan 4 helyes: 5 eset (a hibás válasz 5-féle helyen állhat). Összesen: 1 + 5 = 6."
  }
];

// ----------------------------------------------------------------------
// SUBTOPIC 2: Matematikai állítások (a-logic-allitasok)
// ----------------------------------------------------------------------

export const logicAllitasokQuizEasy: AdmissionQuizQuestion[] = [
  {
    id: "k-log-e-1",
    question: "Melyik állítás IGAZ az alábbiak közül?",
    options: ["Minden páros szám osztható 4-gyel.", "Minden 10-zel osztható szám osztható 5-tel is.", "Minden háromszögnek van derékszöge.", "Nincs olyan prímszám, ami páros."],
    correctAnswer: 1,
    explanation: "Mivel a 10 osztható 5-tel, a 10 minden többszöröse is osztható 5-tel. A 2 prímszám és páros. A 6 páros, de nem osztható 4-gyel."
  },
  {
    id: "k-log-e-2",
    question: "Mi az állítás igazságértéke? 'Minden négyzet téglalap.'",
    options: ["Igaz", "Hamis"],
    correctAnswer: 0,
    explanation: "Igaz, mert a négyzet olyan téglalap, amelynek minden oldala egyenlő hosszúságú."
  },
  {
    id: "k-log-e-3",
    question: "Mi az állítás igazságértéke? 'Minden téglalap négyzet.'",
    options: ["Igaz", "Hamis"],
    correctAnswer: 1,
    explanation: "Hamis, ellenpélda: egy 3 cm x 5 cm-es téglalap nem négyzet."
  },
  {
    id: "k-log-e-4",
    question: "Mi a 'Minden kutya barna' állítás tagadása?",
    options: ["Egyik kutya sem barna.", "Minden kutya fekete.", "Van olyan kutya, ami nem barna.", "Néhány kutya barna."],
    correctAnswer: 2,
    explanation: "A 'minden A tulajdonságú' tagadása: 'Létezik/van olyan A, ami nem az'."
  },
  {
    id: "k-log-e-5",
    question: "Mikor IGAZ egy 'A és B' összetett állítás?",
    options: ["Ha legalább az egyik állítás igaz.", "Csak akkor, ha mindkét állítás igaz.", "Ha mindkét állítás hamis.", "Ha A igaz, de B hamis."],
    correctAnswer: 1,
    explanation: "Az 'és' logikai kapcsolat csak akkor igaz, ha mindkét komponense igaz."
  },
  {
    id: "k-log-e-6",
    question: "Mikor IGAZ egy 'A vagy B' összetett állítás?",
    options: ["Csak ha mindkettő igaz.", "Ha legalább az egyik állítás igaz.", "Csak ha pontosan az egyik igaz.", "Ha mindkettő hamis."],
    correctAnswer: 1,
    explanation: "A matematikai 'vagy' megengedi, hogy az egyik vagy mindkét állítás igaz legyen."
  },
  {
    id: "k-log-e-7",
    question: "Melyik szám ellenpélda arra az állításra, hogy 'Minden páratlan szám prímszám'?",
    options: ["2", "3", "7", "9"],
    correctAnswer: 3,
    explanation: "A 9 páratlan szám, de nem prímszám (mert osztható 3-mal). Ez megcáfolja az állítást."
  },
  {
    id: "k-log-e-8",
    question: "Mi a 'Létezik páros prímszám' állítás igazságértéke?",
    options: ["Igaz", "Hamis"],
    correctAnswer: 0,
    explanation: "Igaz, mert a 2 páros szám és prímszám is."
  },
  {
    id: "k-log-e-9",
    question: "Mi a 'Nincs olyan háromszög, aminek 4 oldala van' állítás igazságértéke?",
    options: ["Igaz", "Hamis"],
    correctAnswer: 0,
    explanation: "Igaz, a háromszög definíció szerint 3 oldalú síkidom."
  },
  {
    id: "k-log-e-10",
    question: "Mi a tagadása annak az állításnak, hogy 'A $x > 5$'?",
    options: ["$x < 5$", "$x \\le 5$", "$x = 5$", "$x \\ge 5$"],
    correctAnswer: 1,
    explanation: "A szigorúan nagyobb ($>$) tagadása a kisebb vagy egyenlő ($\\le$)."
  }
];

export const logicAllitasokQuizMedium: AdmissionQuizQuestion[] = [
  {
    id: "k-log-m-1",
    question: "Mi a következményes állítás tagadása: 'Ha esik az eső, akkor viszek esernyőt'?",
    options: [
      "Ha nem esik az eső, akkor nem viszek esernyőt.",
      "Esik az eső, és nem viszek esernyőt.",
      "Nem esik az eső, de viszek esernyőt.",
      "Ha viszek esernyőt, akkor esik az eső."
    ],
    correctAnswer: 1,
    explanation: "A 'Ha A, akkor B' állítás csak akkor hamis (azaz a tagadása akkor teljesül), ha az előtag (A) igaz, de a következmény (B) hamis."
  },
  {
    id: "k-log-m-2",
    question: "Adott az állítás: 'Ha egy szám osztható 6-tal, akkor osztható 3-mal is.' Mi az állítás MEGFORGÍTÁSA?",
    options: [
      "Ha egy szám nem osztható 6-tal, akkor nem osztható 3-mal sem.",
      "Ha egy szám osztható 3-mal, akkor osztható 6-tal is.",
      "Ha egy szám nem osztható 3-mal, akkor nem osztható 6-tal sem.",
      "Minden 3-mal osztható szám osztható 2-vel is."
    ],
    correctAnswer: 1,
    explanation: "A 'Ha A, akkor B' állítás megforgatása: 'Ha B, akkor A'."
  },
  {
    id: "k-log-m-3",
    question: "Melyik állítás IGAZ az alábbiak közül?",
    options: [
      "Két páratlan szám összege mindig páratlan.",
      "Két prímszám összege mindig páros.",
      "Két páratlan szám szorzata mindig páratlan.",
      "Minden rombusz négyzet."
    ],
    correctAnswer: 2,
    explanation: "Páratlan * páratlan = páratlan. A többi állítás hamis."
  },
  {
    id: "k-log-m-4",
    question: "Mi a 'Minden rombusz átlói merőlegesek egymásra' állítás megfordítása?",
    options: [
      "Ha egy négyszög átlói merőlegesek egymásra, akkor az rombusz.",
      "Ha egy négyszög nem rombusz, akkor átlói nem merőlegesek.",
      "Nincs olyan rombusz, aminek átlói merőlegesek.",
      "Minden deltoid rombusz."
    ],
    correctAnswer: 0,
    explanation: "Az állítás: 'Rombusz -> Átlók merőlegesek'. Ennek megfordítása: 'Átlók merőlegesek -> Rombusz'."
  },
  {
    id: "k-log-m-5",
    question: "Mi a tagadása a 'Van olyan diák, aki minden tárgyból jeles' állításnak?",
    options: [
      "Minden diák minden tárgyból jeles.",
      "Egyetlen diák sincs, aki minden tárgyból jeles.",
      "Van olyan diák, aki semmiből sem jeles.",
      "Minden diák megbukott."
    ],
    correctAnswer: 1,
    explanation: "A 'Létezik olyan X, amire Y igaz' tagadása: 'Nincs olyan X / Egyetlen X-re sem igaz'."
  },
  {
    id: "k-log-m-6",
    question: "Legyen A: 'A 12 osztható 3-mal' (I) és B: 'A 12 osztható 5-tel' (H). Mi az igazságértéke az 'A vagy B' állításnak?",
    options: ["Igaz", "Hamis"],
    correctAnswer: 0,
    explanation: "Mivel A igaz (12 osztható 3-mal), a 'vagy' kapcsolat értéke Igaz (I vagy H = I)."
  },
  {
    id: "k-log-m-7",
    question: "Melyik az egyetlen PÁROS prímszám?",
    options: ["0", "1", "2", "4"],
    correctAnswer: 2,
    explanation: "A 2 az egyetlen páros prímszám, mert minden nagyobb páros szám osztható 2-vel is."
  },
  {
    id: "k-log-m-8",
    question: "Mi az alábbi következtetés igazságértéke? 'Ha egy háromszög szabályos, akkor minden szöge 60 fokos.'",
    options: ["Igaz", "Hamis"],
    correctAnswer: 0,
    explanation: "Igaz, a szabályos háromszög mindhárom oldala és mindhárom szöge egyenlő (180/3 = 60 fok)."
  },
  {
    id: "k-log-m-9",
    question: "Melyik állítás HAMIS az alábbiak közül?",
    options: [
      "Minden 100-zal osztható szám osztható 4-gyel.",
      "Minden 9-cel osztható szám osztható 3-mal.",
      "Minden 3-mal osztható szám osztható 9-cel.",
      "Minden 6-tal osztható szám osztható 2-vel."
    ],
    correctAnswer: 2,
    explanation: "Ellenpélda: A 6 osztható 3-mal, de nem osztható 9-cel. Így ez az állítás hamis."
  },
  {
    id: "k-log-m-10",
    question: "Mi a logikai kapcsolat neve: 'Pontosan akkor igaz, ha mindkét állítás igazságértéke megegyezik'?",
    options: ["Konjunkció (és)", "Diszjunkció (vagy)", "Implikáció (ha...akkor)", "Ekvivalencia (akkor és csak akkor)"],
    correctAnswer: 3,
    explanation: "Az ekvivalencia (A <=> B) akkor és csak akkor igaz, ha A és B igazságértéke azonos."
  }
];

export const logicAllitasokQuizHard: AdmissionQuizQuestion[] = [
  {
    id: "k-log-h-1",
    question: "Adott az állítás: 'Ha egy négyszög húrnégyszög, akkor szemközti szögeinek összege 180 fok.' Melyik ezzel LOGIKAILAG EGYENÉRTÉKŰ (kontrapozíciós) állítás?",
    options: [
      "Ha egy négyszög szemközti szögeinek összege 180 fok, akkor az húrnégyszög.",
      "Ha egy négyszög szemközti szögeinek összege NEM 180 fok, akkor az NEM húrnégyszög.",
      "Ha egy négyszög nem húrnégyszög, akkor szemközti szögeinek összege nem 180 fok.",
      "Minden húrnégyszög téglalap."
    ],
    correctAnswer: 1,
    explanation: "A 'Ha A, akkor B' állítással logikailag egyenértékű annak kontrapozíciója: 'Ha nem B, akkor nem A'."
  },
  {
    id: "k-log-h-2",
    question: "Mi a 'Minden konvex sokszögnek van legalább egy átlója' állítás tagadása?",
    options: [
      "Egyetlen konvex sokszögnek sincs átlója.",
      "Létezik olyan konvex sokszög, amelynek nincs egyetlen átlója sem.",
      "Minden konvex sokszögnek pontosan egy átlója van.",
      "Minden konkáv sokszögnek van átlója."
    ],
    correctAnswer: 1,
    explanation: "A 'Minden X-nek van legalább 1 Y-ja' tagadása: 'Létezik olyan X, aminek nincs egyetlen Y-ja sem' (a háromszög éppen ilyen!)."
  },
  {
    id: "k-log-h-3",
    question: "Melyik az alábbi állítások közül a KONTRADIKCIÓ / ELLENMONDÁS (mindig hamis)?",
    options: [
      "A szám páros vagy páratlan.",
      "A szám páros és páratlan.",
      "Ha a szám páros, akkor nem páratlan.",
      "Létezik páros prímszám."
    ],
    correctAnswer: 1,
    explanation: "Egy egész szám nem lehet egyszerre páros ÉS páratlan is. Ez logikai ellentmondás (kontradikció)."
  },
  {
    id: "k-log-h-4",
    question: "Három állításunk van: A='Péter okos', B='Péter szorgalmas'. Mi a tagadása annak az állításnak, hogy 'Péter okos ÉS szorgalmas'? (De Morgan törvény)",
    options: [
      "Péter nem okos és nem szorgalmas.",
      "Péter nem okos VAGY nem szorgalmas.",
      "Péter okos, de nem szorgalmas.",
      "Péter sem nem okos, sem nem szorgalmas."
    ],
    correctAnswer: 1,
    explanation: "De Morgan törvénye szerint: NOT (A AND B) = (NOT A) OR (NOT B)."
  },
  {
    id: "k-log-h-5",
    question: "Három állításunk van: A='Esik az eső', B='Fúj a szél'. Mi a tagadása annak az állításnak, hogy 'Esik az eső VAGY fúj a szél'?",
    options: [
      "Nem esik az eső és nem fúj a szél.",
      "Nem esik az eső vagy nem fúj a szél.",
      "Esik az eső és fúj a szél.",
      "Ha nem esik az eső, fúj a szél."
    ],
    correctAnswer: 0,
    explanation: "De Morgan törvénye szerint: NOT (A OR B) = (NOT A) AND (NOT B)."
  },
  {
    id: "k-log-h-6",
    question: "Mi a 'Minden $x$ valós számra $x^2 \\ge 0$' állítás tagadása?",
    options: [
      "Minden $x$ valós számra $x^2 < 0$.",
      "Létezik olyan $x$ valós szám, amelyre $x^2 < 0$.",
      "Létezik olyan $x$ valós szám, amelyre $x^2 \\le 0$.",
      "Nincs olyan $x$ valós szám, aminek a négyzete pozitív."
    ],
    correctAnswer: 1,
    explanation: "A 'minden x-re A(x) >= 0' tagadása: 'létezik olyan x, amire A(x) < 0'."
  },
  {
    id: "k-log-h-7",
    question: "Melyik állítás IGAZ az alábbiak közül?",
    options: [
      "Ha egy szám osztható 2-vel és 3-mal, akkor nem biztos, hogy osztható 6-tal.",
      "Két összetett szám összege mindig összetett szám.",
      "Két relatív prím szám között lehet összetett szám is.",
      "Minden prím szám páratlan."
    ],
    correctAnswer: 2,
    explanation: "Relatív prímek pl. 8 és 9 (LNKO(8,9)=1), és mindkettő összetett szám!"
  },
  {
    id: "k-log-h-8",
    question: "Melyik axióma / tétel következménye a skatulya-elv?",
    options: [
      "Ha $n+1$ tárgyat teszünk $n$ skatulyába, akkor van olyan skatulya, amibe legalább 2 tárgy jut.",
      "Ha $n$ tárgyat teszünk $n$ skatulyába, mindenbe pontosan 1 jut.",
      "Minden skatulyába ugyanannyi tárgy kerül.",
      "A skatulyák száma mindig páros."
    ],
    correctAnswer: 0,
    explanation: "Ez a híres Dirichlet-féle skatulya-elv szabatos megfogalmazása."
  },
  {
    id: "k-log-h-9",
    question: "Legyen $A$ a 4-gyel osztható számok halmaza, $B$ a 6-tal osztható számok halmaza. Mi a $A \\cap B$ (metszet) halmaz elemeinek közös tulajdonsága?",
    options: [
      "A 2-vel osztható számok.",
      "A 12-vel osztható számok.",
      "A 24-gyel osztható számok.",
      "A 10-zel osztható számok."
    ],
    correctAnswer: 1,
    explanation: "A 4 és 6 legkisebb közös többszöröse (LKKT) a 12, így a metszet pontosan a 12-vel osztható számok halmaza."
  },
  {
    id: "k-log-h-10",
    question: "Melyik állítás igazságértéke bizonytalan (nem matematikai állítás)?",
    options: [
      "A 7 prímszám.",
      "A matematika a legszebb tantárgy.",
      "A derékszögű háromszögre igaz a Pitagorasz-tétel.",
      "2 + 2 = 5."
    ],
    correctAnswer: 1,
    explanation: "A 'legszebb tantárgy' szubjektív vélemény, amelyről nem dönthető el objektíven, hogy igaz vagy hamis. Ezért nem matematikai kijelentés."
  }
];
