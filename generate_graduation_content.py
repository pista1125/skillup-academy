import os

output_path = r"src/data/graduationContent.ts"

content = """import { LucideIcon } from 'lucide-react';

export interface GraduationQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface GraduationSubtopicContent {
  id: string;
  title: string;
  level: number; // Nesting depth: 0, 1, 2...
  requirementsIntermediate: string;
  requirementsAdvanced: string;
  lessonIntermediate: string;
  lessonAdvanced: string;
  quizIntermediate: GraduationQuizQuestion[];
  quizAdvanced: GraduationQuizQuestion[];
}

export interface GraduationTopic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subtopics: GraduationSubtopicContent[];
}

export interface GraduationExamPaper {
  year: number;
  session: 'május' | 'október';
  level: 'közép' | 'emelt';
  duration: number; // minutes
  totalPoints: number;
  structure: string[];
}

export const graduationExamPapers: GraduationExamPaper[] = [
  {
    year: 2024,
    session: 'május',
    level: 'közép',
    duration: 180,
    totalPoints: 100,
    structure: [
      "I. rész: 12 rövid feladat (30 pont)",
      "II. A rész: 3 kötelező feladat (30 pont)",
      "II. B rész: 3 választható feladatból 2 megoldása (30 pont)",
      "Vizuális kommunikáció és precíz indoklás (+10 pont)"
    ]
  },
  {
    year: 2024,
    session: 'május',
    level: 'emelt',
    duration: 240,
    totalPoints: 100,
    structure: [
      "I. rész: 4 kötelező feladat (50 pont)",
      "II. rész: 5 választható feladatból 4 megoldása (50 pont)"
    ]
  },
  {
    year: 2023,
    session: 'május',
    level: 'közép',
    duration: 180,
    totalPoints: 100,
    structure: [
      "I. rész: 12 rövid feladat (30 pont)",
      "II. A rész: 3 kötelező feladat (30 pont)",
      "II. B rész: 3 választható feladatból 2 megoldása (30 pont)"
    ]
  },
  {
    year: 2023,
    session: 'május',
    level: 'emelt',
    duration: 240,
    totalPoints: 100,
    structure: [
      "I. rész: 4 kötelező feladat (50 pont)",
      "II. rész: 5 választható feladatból 4 megoldása (50 pont)"
    ]
  }
];

export const graduationTopics: GraduationTopic[] = [
  {
    id: "g-methods-sets",
    title: "Gondolkodási módszerek, halmazok, logika, kombinatorika, gráfok",
    icon: "⚡",
    color: "from-purple-500 to-indigo-600",
    subtopics: [
      {
        id: "g-sets",
        title: "Halmazok",
        level: 0,
        requirementsIntermediate: "Ismerje a halmaz, halmaz eleme fogalmát. Használja a halmazok megadásának különböző módjait. Értse az egyenlőség, részhalmaz, üres halmaz fogalmát.",
        requirementsAdvanced: "Bizonyítsa a halmazok tulajdonságait. Ismerje a halmazelmélet szerepét a matematika felépítésében.",
        lessonIntermediate: "### Halmazok alapfogalmai\\\\n\\\\nA halmaz bizonyos dolgok összessége, az elemei a halmaz tagjai ($x \\\\in A$). A halmazokat megadhatjuk elemeik felsorolásával, pl. $A = \\\\{1, 2, 3\\\\}$, vagy leírással, pl. $B = \\\\{x \\\\in \\\\mathbb{N} \\\\mid x < 5\\\\}$.",
        lessonAdvanced: "### Halmazelmélet emelt szinten\\\\n\\\\nAz emelt szint magában foglalja a halmazok axiomás felépítésének ismeretét és az összetettebb halmazműveletek bizonyítását.",
        quizIntermediate: [
          {
            id: "q-sets-i1",
            question: "Ha $A = \\\\{1, 2\\\\}$ és $B = \\\\{2, 3\\\\}$, akkor a két halmaz megegyezik?",
            options: ["Igen, mert van közös elemük.", "Nem, mert nem pontosan ugyanazokat az elemeket tartalmazzák.", "Igen, mert mindkettő 2 elemű.", "Nem eldönthető."],
            correctAnswer: 1,
            explanation: "Két halmaz akkor és csak akkor egyenlő, ha az elemeik pontosan megegyeznek."
          }
        ],
        quizAdvanced: [
          {
            id: "q-sets-a1",
            question: "Melyik állítás igaz?",
            options: ["Minden üres halmaz részhalmaza önmagának.", "Az üres halmaz nem részhalmaza semminek.", "Az üres halmaz nem létezik.", "Az üres halmaz végtelen sok elemet tartalmaz."],
            correctAnswer: 0,
            explanation: "Az üres halmaz definíció szerint minden halmaznak, így önmagának is részhalmaza."
          }
        ]
      },
      {
        id: "g-set-operations",
        title: "Halmazműveletek",
        level: 1,
        requirementsIntermediate: "Definiálja és alkalmazza az unió, metszet, különbség fogalmát.",
        requirementsAdvanced: "Ismerje és alkalmazza a de Morgan azonosságokat.",
        lessonIntermediate: "### Halmazműveletek\\\\n\\\\n- **Metszet ($A \\\\cap B$):** Közös elemek.\\\\n- **Unió ($A \\\\cup B$):** Legalább az egyik halmazban benne lévő elemek.\\\\n- **Különbség ($A \\\\setminus B$):** Csak az $A$-ban lévő elemek.",
        lessonAdvanced: "### de Morgan azonosságok\\\\n\\\\n$$\\\\overline{A \\\\cup B} = \\\\overline{A} \\\\cap \\\\overline{B}$$\\\\n$$\\\\overline{A \\\\cap B} = \\\\overline{A} \\\\cup \\\\overline{B}$$",
        quizIntermediate: [
          {
            id: "q-setops-i1",
            question: "Mi a metszete a $\\\\{1, 2\\\\}$ és $\\\\{2, 3\\\\}$ halmazoknak?",
            options: ["{1, 2, 3}", "{2}", "{1, 3}", "Üres halmaz"],
            correctAnswer: 1,
            explanation: "A metszet a közös elemeket tartalmazza, ami jelenleg a 2."
          }
        ],
        quizAdvanced: [
          {
            id: "q-setops-a1",
            question: "Mi a de Morgan szabály szerint a $\\\\overline{A \\\\cap B}$ komplementer?",
            options: ["$\\\\bar{A} \\\\cup \\\\bar{B}$", "$\\\\bar{A} \\\\cap \\\\bar{B}$", "$A \\\\cup B$", "$A \\\\cap B$"],
            correctAnswer: 0,
            explanation: "de Morgan szabály szerint a metszet komplementere a komplementerek uniója."
          }
        ]
      },
      {
        id: "g-cardinality",
        title: "Számosság, részhalmazok",
        level: 1,
        requirementsIntermediate: "Tudja meghatározni véges halmazok elemeinek számát. Használja a logikai szita elvét.",
        requirementsAdvanced: "Ismerje a megszámlálhatóan végtelen és kontinuum számosságú halmaz fogalmát.",
        lessonIntermediate: "### Számosság és Szita elv\\\\n\\\\nA számosság véges halmazoknál az elemek számát jelenti. A logikai szita formula:\\\\n$$|A \\\\cup B| = |A| + |B| - |A \\\\cap B|$$",
        lessonAdvanced: "### Végtelen halmazok számossága\\\\n\\\\n- **Megszámlálhatóan végtelen:** pl. $\\\\mathbb{N}, \\\\mathbb{Z}, \\\\mathbb{Q}$\\\\n- **Kontinuum:** pl. $\\\\mathbb{R}$, intervallumok.",
        quizIntermediate: [
          {
            id: "q-card-i1",
            question: "Hány részhalmaza van egy 3 elemű halmaznak?",
            options: ["3", "6", "8", "9"],
            correctAnswer: 2,
            explanation: "Egy n elemű halmaz részhalmazainak száma 2^n. 2^3 = 8."
          }
        ],
        quizAdvanced: [
          {
            id: "q-card-a1",
            question: "Milyen számosságú a valós számok halmaza?",
            options: ["Véges", "Megszámlálhatóan végtelen", "Kontinuum számosságú", "Nulla"],
            correctAnswer: 2,
            explanation: "Cantor átlós módszerével bizonyítható, hogy a valós számok halmaza nem megszámlálható, hanem kontinuum számosságú."
          }
        ]
      },
      {
        id: "g-logic",
        title: "Matematikai logika",
        level: 0,
        requirementsIntermediate: "Ismerje a logikai műveleteket (és, vagy, tagadás). Állapítsa meg kijelentések igazságértékét.",
        requirementsAdvanced: "Ismerje az implikáció és ekvivalencia pontos definícióját és igazságtábláját.",
        lessonIntermediate: "### Matematikai logika\\\\n\\\\n- **Konjunkció (és, $A \\\\land B$):** Csak akkor igaz, ha mindkettő igaz.\\\\n- **Diszjunkció (vagy, $A \\\\lor B$):** Igaz, ha legalább az egyik igaz.\\\\n- **Negáció (tagadás, $\\\\neg A$):** Ellenkező igazságérték.",
        lessonAdvanced: "### Implikáció és Ekvivalencia\\\\n\\\\n- **Implikáció ($A \\\\Rightarrow B$):** 'ha A, akkor B'. Csak akkor hamis, ha A igaz és B hamis.\\\\n- **Ekvivalencia ($A \\\\Leftrightarrow B$):** 'akkor és csak akkor, ha'. Akkor igaz, ha megegyezik az igazságértékük.",
        quizIntermediate: [
          {
            id: "q-logic-i1",
            question: "Ha A igaz, B pedig hamis, mi lesz az 'A és B' igazságértéke?",
            options: ["Igaz", "Hamis", "Nem eldönthető", "Mindkettő"],
            correctAnswer: 1,
            explanation: "Az 'és' művelet csak akkor igaz, ha mindkét állítás igaz."
          }
        ],
        quizAdvanced: [
          {
            id: "q-logic-a1",
            question: "Mikor hamis az $A \\\\Rightarrow B$ implikáció?",
            options: ["Ha A és B is hamis.", "Ha A hamis és B igaz.", "Ha A igaz és B hamis.", "Soha nem hamis."],
            correctAnswer: 2,
            explanation: "Az implikáció csak akkor hamis, ha az előtag igaz és az utótag hamis."
          }
        ]
      },
      {
        id: "g-proofs",
        title: "Fogalmak, tételek és bizonyítások a matematikában",
        level: 1,
        requirementsIntermediate: "Tudjon egyszerű definíciókat megfogalmazni. Különböztesse meg az igaz és hamis állításokat.",
        requirementsAdvanced: "Ismerje a direkt és indirekt bizonyítást, a skatulyaelvet és a teljes indukciót.",
        lessonIntermediate: "### Definíciók és Tételek\\\\n\\\\n- **Definíció:** Új fogalmak pontos bevezetése.\\\\n- **Tétel:** Igazolt állítás, amelyet bizonyítani kell.",
        lessonAdvanced: "### Bizonyítási módszerek\\\\n\\\\n- **Direkt bizonyítás:** Logikai lépésekkel eljutunk a kiindulástól a célig.\\\\n- **Indirekt bizonyítás:** Feltesszük a tétel állításának ellenkezőjét, és ellentmondásra jutunk.\\\\n- **Teljes indukció:** Igazoljuk n=1-re, majd feltéve n-re bizonyítjuk n+1-re.",
        quizIntermediate: [
          {
            id: "q-proofs-i1",
            question: "Mi a különbség a tétel és a definíció között?",
            options: ["A tétel megállapodás, a definíció bizonyított.", "A definíció megállapodás, a tétel bizonyított állítás.", "Nincs különbség.", "A definíciót nem kell megérteni."],
            correctAnswer: 1,
            explanation: "A definíció bevezeti a fogalmat (megállapodás), a tétel pedig egy állítás, amit bizonyítani kell."
          }
        ],
        quizAdvanced: [
          {
            id: "q-proofs-a1",
            question: "Melyik állításra használjuk tipikusan a teljes indukciót?",
            options: ["Geometriai szerkesztésekre", "Egész számokra vonatkozó sorozatok összegének igazolására", "Másodfokú egyenletek megoldására", "Statisztikai adatok ábrázolására"],
            correctAnswer: 1,
            explanation: "A teljes indukció a természetes számokon értelmezett állítások igazolására való."
          }
        ]
      },
      {
        id: "g-combinatorics",
        title: "Kombinatorika",
        level: 0,
        requirementsIntermediate: "Ismerje a permutációt, variációt, kombinációt (ismétlés nélkül).",
        requirementsAdvanced: "Ismerje az ismétléses eseteket, a binomiális tételt és a Pascal-háromszöget.",
        lessonIntermediate: "### Kombinatorika\\\\n\\\\n- **Permutáció:** $P_n = n!$\\\\n- **Variáció:** $V_n^k = \\\\frac{n!}{(n-k)!}$\\\\n- **Kombináció:** $C_n^k = \\\\binom{n}{k}$",
        lessonAdvanced: "### Binomiális tétel\\\\n\\\\n$$(a+b)^n = \\\\sum_{k=0}^{n} \\\\binom{n}{k} a^{n-k} b^k$$",
        quizIntermediate: [
          {
            id: "q-comb-i1",
            question: "Hányféleképpen választható ki 2 ember 5 közül, ha a sorrendjük nem számít?",
            options: ["10", "20", "5", "12"],
            correctAnswer: 0,
            explanation: "(5 alatt a 2) = 10."
          }
        ],
        quizAdvanced: [
          {
            id: "q-comb-a1",
            question: "Mennyi az ismétléses permutációk száma az A, A, B betűkből?",
            options: ["6", "3", "2", "1"],
            correctAnswer: 1,
            explanation: "3! / 2! = 3. A lehetséges szavak: AAB, ABA, BAA."
          }
        ]
      },
      {
        id: "g-graphs",
        title: "Gráfok",
        level: 0,
        requirementsIntermediate: "Ismerje a gráf, fokszám, él, pont fogalmát. Alkalmazza a fokszámösszeg tételt.",
        requirementsAdvanced: "Ismerje a fa gráfok tulajdonságait, Euler-kört, komplementer gráfot.",
        lessonIntermediate: "### Gráfok alapjai\\\\n\\\\nA gráf pontokból és az őket összekötő élekből áll. A pontok fokszámainak összege megegyezik az élek számának kétszeresével:\\\\n$$\\\\sum d(v) = 2e$$",
        lessonAdvanced: "### Fa gráfok\\\\n\\\\nÖsszefüggő, körmentes gráf. Egy $n$ pontú fának pontosan $n-1$ éle van.",
        quizIntermediate: [
          {
            id: "q-graphs-i1",
            question: "Hány éle van egy olyan gráfnak, amelyben a fokszámok összege 12?",
            options: ["12", "6", "24", "Nem meghatározható"],
            correctAnswer: 1,
            explanation: "Az élek száma a fokszámösszeg fele, azaz 12 / 2 = 6."
          }
        ],
        quizAdvanced: [
          {
            id: "q-graphs-a1",
            question: "Hány éle van egy 10 pontú fa gráfnak?",
            options: ["10", "9", "45", "11"],
            correctAnswer: 1,
            explanation: "Az n pontú fa éleinek száma mindig n-1, azaz 10 - 1 = 9."
          }
        ]
      }
    ]
  },
  {
    id: "g-number-algebra",
    title: "Számelmélet, algebra",
    icon: "🔢",
    color: "from-blue-500 to-indigo-600",
    subtopics: [
      {
        id: "g-basic-operations",
        title: "Alapműveletek",
        level: 0,
        requirementsIntermediate: "Tudjon alapműveleteket biztonságosan elvégezni egész és tört számokkal.",
        requirementsAdvanced: "Alkalmazza a műveleti azonosságokat összetett algebrai környezetben is.",
        lessonIntermediate: "### Alapműveletek\\\\n\\\\nÖsszeadás, kivonás, szorzás, osztás. Fontos a műveleti sorrend (szorzás/osztás megelőzi az összeadást/kivonást) és a zárójelek használata.",
        lessonAdvanced: "### Műveletek általánosítása\\\\n\\\\nAz asszociativitás, kommutativitás és disztributivitás szerepe a struktúrákban.",
        quizIntermediate: [
          {
            id: "q-basic-i1",
            question: "Mennyi a $2 + 3 \\\\cdot 4$ kifejezés értéke?",
            options: ["20", "14", "18", "9"],
            correctAnswer: 1,
            explanation: "A szorzás előrébb való: 2 + 12 = 14."
          }
        ],
        quizAdvanced: [
          {
            id: "q-basic-a1",
            question: "Melyik tulajdonság NEM teljesül a kivonásra a valós számok halmazán?",
            options: ["Kommutativitás", "Zártság", "Egyik sem", "Mindkettő"],
            correctAnswer: 0,
            explanation: "A kivonás nem kommutatív, pl. 5 - 3 = 2, de 3 - 5 = -2."
          }
        ]
      },
      {
        id: "g-natural-numbers",
        title: "A természetes számok halmaza, számelméleti ismeretek",
        level: 0,
        requirementsIntermediate: "Ismerje a természetes számokat, prímtényezős felbontást, LNKO-t és LKKT-t.",
        requirementsAdvanced: "Bizonyítsa be a számelmélet alaptételét és a prímszámok végtelenségét.",
        lessonIntermediate: "### Természetes számok és prímszámok\\\\n\\\\nPrímszámok azok a természetes számok, amelyeknek pontosan két pozitív osztójuk van (1 és önmaguk). Minden 1-nél nagyobb természetes szám felbontható prímek szorzatára.",
        lessonAdvanced: "### Prímek eloszlása\\\\n\\\\nEukleidész tétele alapján a prímszámok száma végtelen.",
        quizIntermediate: [
          {
            id: "q-nat-i1",
            question: "Melyik a legkisebb prímszám?",
            options: ["0", "1", "2", "3"],
            correctAnswer: 2,
            explanation: "A 2 a legkisebb prímszám, és egyben az egyetlen páros prím."
          }
        ],
        quizAdvanced: [
          {
            id: "q-nat-a1",
            question: "Mit mond ki a számelmélet alaptétele?",
            options: ["Minden szám páros vagy páratlan.", "Minden 1-nél nagyobb természetes szám egyértelműen felírható prímszámok szorzataként.", "Végtelen sok prímszám van.", "Minden számnak van osztója."],
            correctAnswer: 1,
            explanation: "Ez a számelmélet alaptétele (tényezők sorrendjétől eltekintve egyértelmű a felbontás)."
          }
        ]
      },
      {
        id: "g-divisibility",
        title: "Oszthatóság",
        level: 1,
        requirementsIntermediate: "Ismerje az oszthatósági szabályokat (2, 3, 4, 5, 6, 8, 9, 10).",
        requirementsAdvanced: "Oldjon meg összetett oszthatósági problémákat kongruenciák segítségével.",
        lessonIntermediate: "### Oszthatósági szabályok\\\\n\\\\n- **3-mal / 9-cel:** a számjegyek összege osztható 3-mal / 9-cel.\\\\n- **4-gyel:** az utolsó két számjegy osztható 4-gyel.\\\\n- **5-tel:** 0-ra vagy 5-re végződik.",
        lessonAdvanced: "### Kongruenciák alapjai\\\\n\\\\nKét szám kongruens modulo $m$, ha $m$ osztja a különbségüket: $a \\\\equiv b \\\\pmod m$.",
        quizIntermediate: [
          {
            id: "q-div-i1",
            question: "Osztható-e a 432 szám 4-gyel?",
            options: ["Igen, mert az utolsó két számjegye (32) osztható 4-gyel.", "Nem, mert páratlan számmal kezdődik.", "Nem, mert a számjegyek összege 9.", "Igen, mert 2-re végződik."],
            correctAnswer: 0,
            explanation: "Az utolsó két számjegyből álló számot kell vizsgálni. 32 / 4 = 8, tehát igen."
          }
        ],
        quizAdvanced: [
          {
            id: "q-div-a1",
            question: "Milyen maradékot ad $5^{100}$ 4-gyel osztva?",
            options: ["0", "1", "2", "3"],
            correctAnswer: 1,
            explanation: "$5 \\\\equiv 1 \\\\pmod 4$, így $5^{100} \\\\equiv 1^{100} = 1 \\\\pmod 4$."
          }
        ]
      },
      {
        id: "g-number-bases",
        title: "Számrendszerek",
        level: 1,
        requirementsIntermediate: "Tudjanak számokat átírni 10-es és egyéb számrendszerek között.",
        requirementsAdvanced: "Végezzen műveleteket különböző számrendszerekben közvetlenül.",
        lessonIntermediate: "### Számrendszerek\\\\n\\\\nA helyiértékes elv alapján egy $b$ alapú számrendszerben a számjegyek értéke $b$ hatványait jelöli. Pl. a kettes (bináris) rendszerben csak a 0 és 1 számjegyek szerepelnek.",
        lessonAdvanced: "### Számrendszerek közötti konverzió\\\\n\\\\nTetszőleges $p$ alapú rendszerről $q$ alapúra való közvetlen vagy 10-esen keresztüli áttérés szabályai.",
        quizIntermediate: [
          {
            id: "q-base-i1",
            question: "Mennyi a kettes számrendszerbeli $101_2$ tizes számrendszerben?",
            options: ["3", "5", "6", "101"],
            correctAnswer: 1,
            explanation: "1*2^2 + 0*2^1 + 1*2^0 = 4 + 0 + 1 = 5."
          }
        ],
        quizAdvanced: [
          {
            id: "q-base-a1",
            question: "Mennyi $11_2 + 11_2$ a kettes számrendszerben?",
            options: ["22", "110", "111", "100"],
            correctAnswer: 1,
            explanation: "11_2 + 11_2 = 3 + 3 = 6 = 110_2."
          }
        ]
      },
      {
        id: "g-rational-irrational",
        title: "Racionális és irracionális számok",
        level: 0,
        requirementsIntermediate: "Tudja definiálni a racionális és irracionális számok fogalmát.",
        requirementsAdvanced: "Bizonyítsa be, hogy $\\\\sqrt{2}$ irracionális szám.",
        lessonIntermediate: "### Racionális és irracionális számok\\\\n\\\\n- **Racionális (\\\\mathbb{Q}):** felírható két egész szám hányadosaként ($p/q$, ahol $q \\\\neq 0$). Tizedestört alakja véges vagy szakaszos végtelen.\\\\n- **Irracionális:** Nem írható fel két egész hányadosaként. Tizedestört alakja nem szakaszos végtelen.",
        lessonAdvanced: "### $\\\\sqrt{2}$ irracionálisságának bizonyítása\\\\n\\\\nIndirekt bizonyítással történik. Feltesszük, hogy felírható $\\\\sqrt{2} = p/q$ tovább nem egyszerűsíthető törtként, majd megmutatjuk, hogy $p$ és $q$ is páros kell legyen, ami ellentmondás.",
        quizIntermediate: [
          {
            id: "q-ratir-i1",
            question: "Melyik szám irracionális az alábbiak közül?",
            options: ["0.333...", "3/4", "$\\\\pi$", "2.5"],
            correctAnswer: 2,
            explanation: "A pi transzcendens irracionális szám, nem írható fel törtként."
          }
        ],
        quizAdvanced: [
          {
            id: "q-ratir-a1",
            question: "Bizonyítható-e két irracionális szám szorzatáról, hogy mindig irracionális?",
            options: ["Igen, ez alaptétel.", "Nem, mert pl. $\\\\sqrt{2} \\\\cdot \\\\sqrt{2} = 2$, ami racionális.", "Csak akkor, ha az egyik negatív.", "Nem eldönthető."],
            correctAnswer: 1,
            explanation: "KTC irracionális szám szorzata lehet racionális is (pl. gyök(2)*gyök(2)=2)."
          }
        ]
      },
      {
        id: "g-real-numbers",
        title: "Valós számok",
        level: 0,
        requirementsIntermediate: "Ismerje a valós számok halmazát, intervallumokat, abszolút értéket és a kerekítést.",
        requirementsAdvanced: "Értse a valós számok teljességi axiómáját (szuprémum elv).",
        lessonIntermediate: "### Valós számok (\\\\mathbb{R})\\\\n\\\\nA valós számok a racionális és irracionális számok uniója. A számegyenes minden pontjának pontosan egy valós szám felel meg.\\\\n- **Abszolút érték:** a szám távolsága a nullától.",
        lessonAdvanced: "### A valós számok topológiája\\\\n\\\\nA szuprémum elv szerint minden felülről korlátos nemüres valós részhalmaznak van legkisebb felső korlátja (szuprémuma) a valós számok között.",
        quizIntermediate: [
          {
            id: "q-real-i1",
            question: "Mennyi a $|-5.2|$ értéke?",
            options: ["-5.2", "5.2", "0", "5"],
            correctAnswer: 1,
            explanation: "Az abszolút érték mindig nemnegatív, megadja a távolságot a nullától."
          }
        ],
        quizAdvanced: [
          {
            id: "q-real-a1",
            question: "Melyik állítás igaz a valós számok halmazára?",
            options: ["Minden korlátos halmaznak van maximuma.", "Minden felülről korlátos halmaznak van szuprémuma.", "Nem tartalmaz irracionális elemeket.", "Megszámlálhatóan végtelen."],
            correctAnswer: 1,
            explanation: "Ez a valós számok egyik legfontosabb tulajdonsága (a teljességi axióma)."
          }
        ]
      },
      {
        id: "g-powers-roots-log",
        title: "Hatvány, gyök, logaritmus",
        level: 0,
        requirementsIntermediate: "Ismerje és alkalmazza a hatványozás, négyzetgyök és logaritmus azonosságait.",
        requirementsAdvanced: "Bizonyítsa a logaritmus azonosságait. Használja a törtkitevőjű hatványokat általános környezetben.",
        lessonIntermediate: "### Azonosságok\\\\n\\\\n- **Hatványozás:** $a^n \\\\cdot a^m = a^{n+m}$, $(a^n)^m = a^{n \\\\cdot m}$\\\\n- **Logaritmus:** $\\\\log_a(x \\\\cdot y) = \\\\log_a x + \\\\log_a y$",
        lessonAdvanced: "### Más alapú logaritmusra áttérés\\\\n\\\\n$$\\\\log_a x = \\\\frac{\\\\log_b x}{\\\\log_b a}$$",
        quizIntermediate: [
          {
            id: "q-pow-i1",
            question: "Mennyi $\\\\log_2 8$ értéke?",
            options: ["2", "3", "4", "8"],
            correctAnswer: 1,
            explanation: "2^3 = 8, így a logaritmus definíciója alapján a válasz 3."
          }
        ],
        quizAdvanced: [
          {
            id: "q-pow-a1",
            question: "Írja fel a $\\\\sqrt[3]{a^2}$ kifejezést hatványként!",
            options: ["$a^{3/2}$", "$a^{2/3}$", "$a^{-1/3}$", "$a^6$"],
            correctAnswer: 1,
            explanation: "A törtkitevős hatvány definíciója szerint: gyök_n(a^m) = a^(m/n)."
          }
        ]
      },
      {
        id: "g-expressions",
        title: "Betűkifejezések",
        level: 0,
        requirementsIntermediate: "Tudjon algebrai kifejezésekkel egyszerű műveleteket végezni (összevonás, kiemelés).",
        requirementsAdvanced: "Tudjon bonyolult racionális törtkifejezéseket egyszerűsíteni.",
        lessonIntermediate: "### Algebrai betűkifejezések\\\\n\\\\nA betűk változókat (számokat) jelölnek. Azonos változójú tagok összevonhatók, pl. $2x + 3x = 5x$. A szorzást kiemeléssel szorzattá alakíthatjuk: $ax + ay = a(x + y)$.",
        lessonAdvanced: "### Polinomok osztása\\\\n\\\\nPolinomok maradékos osztásának elmélete és alkalmazása algebrai törtek egyszerűsítésénél.",
        quizIntermediate: [
          {
            id: "q-exp-i1",
            question: "Mi a legegyszerűbb alakja a $3a + 2b - a + 4b$ kifejezésnek?",
            options: ["2a + 6b", "4a + 6b", "8ab", "2a - 2b"],
            correctAnswer: 0,
            explanation: "3a - a = 2a, és 2b + 4b = 6b. Összesen: 2a + 6b."
          }
        ],
        quizAdvanced: [
          {
            id: "q-exp-a1",
            question: "Egyszerűsítse az $\\\\frac{x^2 - x}{x - 1}$ kifejezést (feltéve, hogy $x \\\\neq 1$)!",
            options: ["x - 1", "x", "x + 1", "1"],
            correctAnswer: 1,
            explanation: "A számlálóban kiemelve x-et: x(x - 1) / (x - 1) = x."
          }
        ]
      },
      {
        id: "g-algebraic-identities",
        title: "Nevezetes azonosságok",
        level: 1,
        requirementsIntermediate: "Ismerje és alkalmazza a $(a+b)^2, (a-b)^2, a^2-b^2$ azonosságokat.",
        requirementsAdvanced: "Ismerje és alkalmazza a köbös azonosságokat és az $a^n-b^n$ szorzattá alakítását.",
        lessonIntermediate: "### Nevezetes azonosságok\\\\n\\\\n- $(a+b)^2 = a^2 + 2ab + b^2$\\\\n- $(a-b)^2 = a^2 - 2ab + b^2$\\\\n- $a^2 - b^2 = (a-b)(a+b)$",
        lessonAdvanced: "### Köbös és magasabb fokú azonosságok\\\\n\\\\n- $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$\\\\n- $a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \\\\dots + b^{n-1})$",
        quizIntermediate: [
          {
            id: "q-ident-i1",
            question: "Mennyi $(x + 3)^2$ kifejtett alakja?",
            options: ["x^2 + 9", "x^2 + 6x + 9", "x^2 + 3x + 9", "x^2 + 6x + 6"],
            correctAnswer: 1,
            explanation: "(x + 3)^2 = x^2 + 2*x*3 + 3^2 = x^2 + 6x + 9."
          }
        ],
        quizAdvanced: [
          {
            id: "q-ident-a1",
            question: "Hogyan alakítható szorzattá az $x^3 - 8$ kifejezés?",
            options: ["(x - 2)(x^2 + 2x + 4)", "(x - 2)^3", "(x - 2)(x^2 + 4)", "(x - 2)(x^2 - 2x + 4)"],
            correctAnswer: 0,
            explanation: "$a^3 - b^3 = (a-b)(a^2 + ab + b^2)$ alapján, ahol a=x, b=2."
          }
        ]
      },
      {
        id: "g-proportionality",
        title: "Arányosság",
        level: 0,
        requirementsIntermediate: "Ismerje az egyenes és fordított arányosság fogalmát és ábrázolását.",
        requirementsAdvanced: "Alkalmazza az arányossági elveket összetett fizikai és gazdasági modellekben.",
        lessonIntermediate: "### Egyenes és fordított arányosság\\\\n\\\\n- **Egyenes arányosság:** $y = k \\\\cdot x$ (hányadosuk állandó). Grafikont egy origón átmenő egyenes.\\\\n- **Fordított arányosság:** $y = k / x$ (szorzatuk állandó). Grafikont egy hiperbola.",
        lessonAdvanced: "### Változók kapcsolata\\\\n\\\\nTöbbváltozós függések leírása arányossági tényezőkkel.",
        quizIntermediate: [
          {
            id: "q-prop-i1",
            question: "Ha 3 gép 6 óra alatt végez a munkával, hány óra alatt végez 6 azonos gép (fordított arányosság)?",
            options: ["12 óra", "3 óra", "2 óra", "4 óra"],
            correctAnswer: 1,
            explanation: "Kétszer annyi gép feleannyi idő alatt végez: 6 / 2 = 3 óra."
          }
        ],
        quizAdvanced: [
          {
            id: "q-prop-a1",
            question: "Mi a fordított arányosság grafikonjának geometriai neve?",
            options: ["Parabola", "Hiperbola", "Egyenes", "Ellipszis"],
            correctAnswer: 1,
            explanation: "Az y = k/x függvény grafikonja egy hiperbola."
          }
        ]
      },
      {
        id: "g-percentages",
        title: "Százalékszámítás",
        level: 1,
        requirementsIntermediate: "Tudja kiszámolni az alap, százalékláb és százalékérték hármasát feladatokban.",
        requirementsAdvanced: "Oldjon meg összetett százalékos feladatokat (keverési és pénzügyi növekedési feladatok).",
        lessonIntermediate: "### Százalékszámítás alapjai\\\\n\\\\nA százalék egy szám századrészét jelenti ($1\\\\% = 0.01$).\\\\n- **Alap ($A$):** aminek a százalékát vesszük.\\\\n- **Százalékláb ($p$):** a százalék mértéke.\\\\n- **Százalékérték ($É$):** $É = A \\\\cdot \\\\frac{p}{100}$.",
        lessonAdvanced: "### Keverési feladatok\\\\n\\\\nOldatok és keverékek koncentrációjának számítása tömeg- és térfogatarányok alapján.",
        quizIntermediate: [
          {
            id: "q-perc-i1",
            question: "Mennyi 200-nak a 15%-a?",
            options: ["15", "30", "45", "20"],
            correctAnswer: 1,
            explanation: "200 * 0.15 = 30."
          }
        ],
        quizAdvanced: [
          {
            id: "q-perc-a1",
            question: "Összekeverünk 2 kg 10%-os és 3 kg 20%-os sóoldatot. Hány százalékos lesz a keverék?",
            options: ["15%", "16%", "14%", "18%"],
            correctAnswer: 1,
            explanation: "Só tömege: 2*0.1 + 3*0.2 = 0.2 + 0.6 = 0.8 kg. Teljes tömeg: 5 kg. Koncentráció: 0.8 / 5 = 0.16 = 16%."
          }
        ]
      },
      {
        id: "g-eq-systems-ineq",
        title: "Egyenletek, egyenletrendszerek, egyenlőtlenségek, egyenlőtlenségrendszerek",
        level: 0,
        requirementsIntermediate: "Ismerje a mérlegelv és az ekvivalens átalakítások fogalmát.",
        requirementsAdvanced: "Értse az egyenletmegoldás során a nem-ekvivalens átalakítások (pl. négyzetre emelés) következményeit.",
        lessonIntermediate: "### Egyenletek megoldása\\\\n\\\\nEgyenletek megoldásánál célunk az ismeretlen kifejezése. Alkalmazható a mérlegelv (mindkét oldalhoz ugyanazt adjuk/szorozzuk) és a behelyettesítés.",
        lessonAdvanced: "### Ekvivalencia vizsgálat\\\\n\\\\nNégyzetre emelésnél vagy változóval való szorzásnál/osztásnál a hamis gyökök kiszűrése ellenőrzéssel vagy kikötésekkel kötelező.",
        quizIntermediate: [
          {
            id: "q-eqsys-i1",
            question: "Melyik átalakítás ekvivalens mindig az egyenletmegoldásban?",
            options: ["Négyzetre emelés", "Mindkét oldal megszorzása x-szel", "Mindkét oldalhoz azonos szám hozzáadása", "Mindkét oldal elosztása nullával"],
            correctAnswer: 2,
            explanation: "Mindkét oldalhoz azonos valós szám hozzáadása mindig ekvivalens átalakítás."
          }
        ],
        quizAdvanced: [
          {
            id: "q-eqsys-a1",
            question: "Mi a teendő, ha egy egyenlet megoldása során nem ekvivalens átalakítást (pl. négyzetre emelést) végeztünk?",
            options: ["Nincs teendő.", "A kapott eredményeket kötelező ellenőrizni az eredeti egyenletben.", "Az egyenletnek nem lehet megoldása.", "A gyökök számát meg kell duplázni."],
            correctAnswer: 1,
            explanation: "A nem ekvivalens lépések behozhatnak hamis gyököket, ezért az ellenőrzés az eredeti egyenletbe helyettesítéssel kötelező."
          }
        ]
      },
      {
        id: "g-algebraic-equations",
        title: "Algebrai egyenletek, egyenletrendszerek",
        level: 1,
        requirementsIntermediate: "Oldjon meg egyszerű algebrai egyenleteket és rendszereket.",
        requirementsAdvanced: "Oldjon meg többismeretlenes lineáris és másodfokú egyenletrendszereket.",
        lessonIntermediate: "### Algebrai egyenletrendszerek\\\\n\\\\nKétismeretlenes egyenletrendszereknél alkalmazhatjuk a behelyettesítő módszert vagy az egyenlő együtthatók módszerét.",
        lessonAdvanced: "### Gauss-elimináció és nemlineáris rendszerek\\\\n\\\\nTöbbváltozós rendszerek megoldása szisztematikus kiküszöböléssel.",
        quizIntermediate: [
          {
            id: "q-algeq-i1",
            question: "Mi a megoldása az $x + y = 5$ és $x - y = 1$ rendszernek?",
            options: ["x=2, y=3", "x=3, y=2", "x=4, y=1", "x=1, y=4"],
            correctAnswer: 1,
            explanation: "Összeadva a két egyenletet: 2x = 6 => x = 3, ebből y = 2."
          }
        ],
        quizAdvanced: [
          {
            id: "q-algeq-a1",
            question: "Hány megoldása lehet egy elsőfokú, kétismeretlenes egyenletrendszernek?",
            options: ["Pontosan 1", "0 vagy 1", "0, 1 vagy végtelen sok", "Végtelen sok"],
            correctAnswer: 2,
            explanation: "Grafikusan két egyenes helyzete határozza meg: metszik egymást (1), párhuzamosak (0), vagy egybeesnek (végtelen)."
          }
        ]
      },
      {
        id: "g-linear-equations",
        title: "Elsőfokú egyenletek, egyenletrendszerek",
        level: 2,
        requirementsIntermediate: "Oldjon meg elsőfokú egyenleteket.",
        requirementsAdvanced: "Oldjon meg paraméteres elsőfokú egyenleteket.",
        lessonIntermediate: "### Elsőfokú egyenletek\\\\n\\\\nÁltalános alak: $ax + b = 0$. Ha $a \\\\neq 0$, akkor egyetlen megoldása van: $x = -b/a$.",
        lessonAdvanced: "### Paraméteres egyenletek vizsgálata\\\\n\\\\n$ax = b$ esetén:\\\\n- Ha $a \\\\neq 0$: $x = b/a$ (1 megoldás)\\\\n- Ha $a = 0$ és $b \\\\neq 0$: nincs megoldás\\\\n- Ha $a = 0$ és $b = 0$: végtelen sok megoldás (minden valós szám)",
        quizIntermediate: [
          {
            id: "q-lineq-i1",
            question: "Oldja meg: $3x - 9 = 0$!",
            options: ["x = -3", "x = 3", "x = 9", "nincs megoldás"],
            correctAnswer: 1,
            explanation: "3x = 9 => x = 3."
          }
        ],
        quizAdvanced: [
          {
            id: "q-lineq-a1",
            question: "Milyen x értékre nincs megoldása az $ax = 5$ egyenletnek, ha $a$ a paraméter?",
            options: ["a = 5", "a = 0", "a = 1", "Minden a-ra van megoldás"],
            correctAnswer: 1,
            explanation: "Ha a = 0, akkor a 0 = 5 ellentmondáshoz jutunk, így nincs megoldás."
          }
        ]
      },
      {
        id: "g-quadratic-equations",
        title: "Másodfokú egyenletek, egyenletrendszerek",
        level: 2,
        requirementsIntermediate: "Ismerje a másodfokú egyenlet megoldóképletét és diszkriminánsát.",
        requirementsAdvanced: "Igazolja a megoldóképletet teljes négyzetté alakítással. Használja a Viète-formulákat.",
        lessonIntermediate: "### Másodfokú egyenlet\\\\n\\\\n$$ax^2 + bx + c = 0 \\\\Rightarrow x_{1,2} = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}$$\\\\nDiszkrimináns: $D = b^2 - 4ac$.",
        lessonAdvanced: "### Viète-formulák\\\\n\\\\nHa $x_1, x_2$ a gyökök:\\\\n$$x_1 + x_2 = -\\\\frac{b}{a}, \\\\quad x_1 \\\\cdot x_2 = \\\\frac{c}{a}$$",
        quizIntermediate: [
          {
            id: "q-quadeq-i1",
            question: "Mennyi a diszkriminánsa az $x^2 - 5x + 6 = 0$ egyenletnek?",
            options: ["1", "5", "25", "6"],
            correctAnswer: 0,
            explanation: "D = (-5)^2 - 4*1*6 = 25 - 24 = 1."
          }
        ],
        quizAdvanced: [
          {
            id: "q-quadeq-a1",
            question: "Mennyi a gyökök szorzata az $x^2 - 7x - 8 = 0$ egyenletben a Viète-formula alapján?",
            options: ["7", "-7", "8", "-8"],
            correctAnswer: 3,
            explanation: "Viète-formula szerint a gyökök szorzata c/a = -8/1 = -8."
          }
        ]
      },
      {
        id: "g-higher-degree-equations",
        title: "Magasabb fokú egyenletek",
        level: 2,
        requirementsIntermediate: "Oldjon meg egyszerű, másodfokúra visszavezethető egyenleteket.",
        requirementsAdvanced: "Tudjon szorzattá alakítással vagy új ismeretlen bevezetésével összetett magasabb fokú egyenleteket megoldani.",
        lessonIntermediate: "### Másodfokúra visszavezethető egyenletek\\\\n\\\\nAz $ax^4 + bx^2 + c = 0$ alakú egyenleteknél bevezethető új változó: $a(x^2)^2 + b(x^2) + c = 0 \\\\Rightarrow t = x^2$.",
        lessonAdvanced: "### Polinomok gyöktényezős alakja\\\\n\\\\nHa $x_0$ a polinom gyöke, akkor a polinom osztható $(x - x_0)$-lal. Ezzel a fokszám csökkenthető.",
        quizIntermediate: [
          {
            id: "q-higheq-i1",
            question: "Milyen helyettesítéssel oldható meg az $x^4 - 5x^2 + 4 = 0$ egyenlet?",
            options: ["t = x", "t = x^2", "t = x^3", "t = x^4"],
            correctAnswer: 1,
            explanation: "A másodfokú alak eléréséhez t = x^2 helyettesítéssel t^2 - 5t + 4 = 0 másodfokú egyenletet kapunk."
          }
        ],
        quizAdvanced: [
          {
            id: "q-higheq-a1",
            question: "Hány valós gyöke van az $x^3 - x = 0$ egyenletnek?",
            options: ["1", "2", "3", "0"],
            correctAnswer: 2,
            explanation: "Kiemeléssel: x(x^2 - 1) = x(x - 1)(x + 1) = 0. A gyökök: -1, 0, 1 (tehát 3 valós gyök)."
          }
        ]
      },
      {
        id: "g-square-root-equations",
        title: "Négyzetgyökös egyenletek",
        level: 2,
        requirementsIntermediate: "Oldjon meg $\\\\sqrt{x+b} = cx+d$ típusú egyenleteket.",
        requirementsAdvanced: "Oldjon meg két négyzetgyököt tartalmazó, összetett egyenleteket.",
        lessonIntermediate: "### Négyzetgyökös egyenletek\\\\n\\\\nKikötés: a gyök alatti kifejezés nemnegatív ($x+b \\\\ge 0$). Négyzetre emelés után az ellenőrzés kötelező, mert a négyzetre emelés nem-ekvivalens lépés lehet.",
        lessonAdvanced: "### Összetett gyökös egyenletek\\\\n\\\\nPl. $\\\\sqrt{x+3} - \\\\sqrt{x-1} = 2$ megoldása két négyzetre emeléssel, szigorú értelmezési tartomány ellenőrzéssel.",
        quizIntermediate: [
          {
            id: "q-sqrteq-i1",
            question: "Mi a kötelező lépés a $\\\\sqrt{x} = -2$ egyenletnél?",
            options: ["Négyzetre emelés", "Kijelenteni, hogy nincs valós megoldás, mert a gyök értéke nem lehet negatív", "x = 4 megoldás elfogadása", "x = -4"],
            correctAnswer: 1,
            explanation: "Valós számokon a négyzetgyök értéke nemnegatív, így a jobb oldalon lévő -2 miatt az egyenletnek nincs megoldása."
          }
        ],
        quizAdvanced: [
          {
            id: "q-sqrteq-a1",
            question: "Mi a $\\\\sqrt{x + 1} = x - 1$ egyenlet egyetlen valós megoldása?",
            options: ["x = 3 és x = 0", "x = 3", "x = 0", "nincs megoldás"],
            correctAnswer: 1,
            explanation: "Négyzetre emelve: x + 1 = (x-1)^2 = x^2 - 2x + 1 => x^2 - 3x = 0 => x=0 vagy x=3. De ellenőrizve az eredetiben: x=0-ra gyök(1) = -1 (hamis gyök). Így csak x=3 megoldás."
          }
        ]
      },
      {
        id: "g-non-algebraic-equations",
        title: "Nem algebrai egyenletek",
        level: 1,
        requirementsIntermediate: "Ismerje a nem-algebrai egyenletek fogalmát.",
        requirementsAdvanced: "Tudjon nem-algebrai egyenleteket numerikus vagy grafikus módszerrel is vizsgálni.",
        lessonIntermediate: "### Nem algebrai egyenletek\\\\n\\\\nOlyan egyenletek, amelyekben a változó nemcsak polinomokban vagy gyökökben szerepel, hanem transzcendens függvényekben (exponenciális, logaritmus, trigonometrikus).",
        lessonAdvanced: "### Transzcendens egyenletek elmélete\\\\n\\\\nA gyökök egzisztenciájának és unicitásának vizsgálata monotonitás alapján.",
        quizIntermediate: [
          {
            id: "q-nonalgeq-i1",
            question: "Melyik egyenlet transzcendens (nem algebrai)?",
            options: ["$x^2 + 5x + 6 = 0$", "$\\sqrt{x} = 2$", "$\\sin x = x$", "$x^3 = 8$"],
            correctAnswer: 2,
            explanation: "A sin x = x transzcendens, mert trigonometrikus függvényben szerepel a változó."
          }
        ],
        quizAdvanced: [
          {
            id: "q-nonalgeq-a1",
            question: "Hány valós megoldása van a $\\\\sin x = x$ egyenletnek?",
            options: ["0", "1", "Végtelen sok", "2"],
            correctAnswer: 1,
            explanation: "Csak az x = 0 megoldás létezik (grafikusan az y=x egyenes és az y=sin x görbe csak az origóban metszi egymást)."
          }
        ]
      },
      {
        id: "g-abs-equations",
        title: "Abszolútértékes egyenletek",
        level: 2,
        requirementsIntermediate: "Oldjon meg egyszerű abszolútértékes egyenleteket.",
        requirementsAdvanced: "Oldjon meg több abszolútértékes kifejezést tartalmazó egyenleteket esetszétválasztással.",
        lessonIntermediate: "### Abszolútértékes egyenletek\\\\n\\\\nDefiníció alapján: $|x| = x$, ha $x \\\\ge 0$, és $|x| = -x$, ha $x < 0$. Egyszerűbb esetekben, pl. $|x - 3| = 5$ azt jelenti, hogy $x - 3 = 5$ vagy $x - 3 = -5$.",
        lessonAdvanced: "### Esetszétválasztásos módszer\\\\n\\\\nTöbb abszolút érték esetén a számegyenest intervallumokra osztjuk a zérushelyek alapján, majd minden intervallumon külön-külön oldjuk meg az egyenletet.",
        quizIntermediate: [
          {
            id: "q-abseq-i1",
            question: "Mik a megoldásai a $|x - 2| = 3$ egyenletnek?",
            options: ["5 és -1", "5 és 1", "5 és -5", "nincs megoldás"],
            correctAnswer: 0,
            explanation: "x - 2 = 3 => x = 5, vagy x - 2 = -3 => x = -1."
          }
        ],
        quizAdvanced: [
          {
            id: "q-abseq-a1",
            question: "Hány intervallumra kell osztani a számegyenest a $|x - 1| + |x + 2| = 5$ egyenlet megoldásához?",
            options: ["2", "3", "4", "1"],
            correctAnswer: 1,
            explanation: "A zérushelyek x = 1 és x = -2. Ez a számegyenest 3 részre osztja: (-végtelen, -2), [-2, 1), [1, végtelen)."
          }
        ]
      },
      {
        id: "g-exponential-equations",
        title: "Exponenciális egyenletek",
        level: 2,
        requirementsIntermediate: "Oldjon meg azonos alapra visszavezethető exponenciális egyenleteket.",
        requirementsAdvanced: "Oldjon meg új ismeretlen bevezetésével exponenciális egyenletrendszereket.",
        lessonIntermediate: "### Exponenciális egyenletek\\\\n\\\\nHa $a^f(x) = a^g(x)$ és $a > 0, a \\\\neq 1$, akkor az exponenciális függvény szigorú monotonitása miatt $f(x) = g(x)$.",
        lessonAdvanced: "### Másodfokúra visszavezethető exponenciális egyenletek\\\\n\\\\nPl. $4^x - 3 \\\\cdot 2^x + 2 = 0 \\\\Rightarrow (2^x)^2 - 3(2^x) + 2 = 0 \\\\Rightarrow t = 2^x$.",
        quizIntermediate: [
          {
            id: "q-expeq-i1",
            question: "Oldja meg: $2^{x-1} = 8$!",
            options: ["x = 3", "x = 4", "x = 2", "x = 5"],
            correctAnswer: 1,
            explanation: "2^(x-1) = 2^3 => x-1 = 3 => x = 4."
          }
        ],
        quizAdvanced: [
          {
            id: "q-expeq-a1",
            question: "Mi a helyettesítés az $9^x - 4 \\\\cdot 3^x + 3 = 0$ egyenletnél?",
            options: ["t = 3", "t = 3^x", "t = 9^x", "t = x"],
            correctAnswer: 1,
            explanation: "$9^x = (3^x)^2$, így t = 3^x helyettesítéssel t^2 - 4t + 3 = 0 egyenletet kapunk."
          }
        ]
      },
      {
        id: "g-logarithmic-equations",
        title: "Logaritmusos egyenletek",
        level: 2,
        requirementsIntermediate: "Oldjon meg egyszerű logaritmusos egyenleteket.",
        requirementsAdvanced: "Oldjon meg más alapra áttérést vagy azonosságokat igénylő logaritmusos egyenleteket.",
        lessonIntermediate: "### Logaritmusos egyenletek\\\\n\\\\nKikötés: a logaritmus alatti kifejezés csak pozitív lehet. Ha $\\\\log_a f(x) = \\\\log_a g(x)$, akkor $f(x) = g(x)$ (szigorú monotonitás miatt).",
        lessonAdvanced: "### Összetett logaritmus egyenletek\\\\n\\\\nAzonosságok alkalmazása: $\\\\log_a x + \\\\log_a y = \\\\log_a(xy)$, ügyelve arra, hogy a kikötések az eredeti kifejezésekre vonatkoznak.",
        quizIntermediate: [
          {
            id: "q-logeq-i1",
            question: "Mi a kikötés a $\\\\log_2(x - 3) = 5$ egyenletnél?",
            options: ["x >= 0", "x > 3", "x > 0", "Nincs kikötés"],
            correctAnswer: 1,
            explanation: "A logaritmus alatti résznek pozitívnak kell lennie: x - 3 > 0 => x > 3."
          }
        ],
        quizAdvanced: [
          {
            id: "q-logeq-a1",
            question: "Mi a megoldása a $\\\\log_x 9 = 2$ egyenletnek?",
            options: ["3 és -3", "3", "81", "9"],
            correctAnswer: 1,
            explanation: "A definíció szerint x^2 = 9. Mivel a logaritmus alapja csak pozitív és 1-től különböző lehet (x > 0 és x != 1), ezért csak x = 3 a megoldás."
          }
        ]
      },
      {
        id: "g-trigonometric-equations",
        title: "Trigonometrikus egyenletek",
        level: 2,
        requirementsIntermediate: "Oldjon meg alapvető szögfüggvényes egyenleteket (pl. $\\\\sin x = c$).",
        requirementsAdvanced: "Oldjon meg másodfokúra visszavezethető vagy addíciós tételeket igénylő trigonometrikus egyenleteket.",
        lessonIntermediate: "### Trigonometrikus egyenletek\\\\n\\\\nA szögfüggvények periodicitása miatt a megoldások általában végtelen sok értéket adnak. Pl. $\\\\sin x = 1/2 \\\\Rightarrow x_1 = 30^\\\\circ + k \\\\cdot 360^\\\\circ$, $x_2 = 150^\\\\circ + k \\\\cdot 360^\\\\circ$ ($k \\\\in \\\\mathbb{Z}$).",
        lessonAdvanced: "### Másodfokú trigonometrikus egyenletek\\\\n\\\\nPl. $2\\\\sin^2 x - \\\\sin x - 1 = 0 \\\\Rightarrow t = \\\\sin x$ helyettesítéssel, majd a kapott $t$ értékek visszahelyettesítésével.",
        quizIntermediate: [
          {
            id: "q-trigeq-i1",
            question: "Melyik egyenletnek NINCSEK valós megoldásai?",
            options: ["$\\sin x = 0.5$", "$\\cos x = -1.2$", "$\\tan x = 5$", "$\\sin x = 0$"],
            correctAnswer: 1,
            explanation: "A koszinusz függvény értékkészlete [-1, 1], így nem vehet fel -1.2 értéket."
          }
        ],
        quizAdvanced: [
          {
            id: "q-trigeq-a1",
            question: "Mennyi $\\\\sin x = 0$ megoldása radiánban ($k \\\\in \\\\mathbb{Z}$)?",
            options: ["$x = k\\pi$", "$x = 2k\\pi$", "$x = \\pi/2 + k\\pi$", "$x = k\\pi/2$"],
            correctAnswer: 0,
            explanation: "A szinusz függvény zérushelyei a pi egész számszorosai: x = k*pi."
          }
        ]
      },
      {
        id: "g-inequalities",
        title: "Egyenlőtlenségek, egyenlőtlenségrendszerek",
        level: 1,
        requirementsIntermediate: "Oldjon meg első- és másodfokú egyenlőtlenségeket.",
        requirementsAdvanced: "Oldjon meg törtes, abszolútértékes és exponenciális egyenlőtlenségeket.",
        lessonIntermediate: "### Egyenlőtlenségek\\\\n\\\\nMegoldásuk hasonló az egyenletekéhez, de ha negatív számmal szorzunk vagy osztunk, az egyenlőtlenség iránya megfordul! Pl. $-2x < 6 \\\\Rightarrow x > -3$.",
        lessonAdvanced: "### Törtes egyenlőtlenségek\\\\n\\\\nPl. $\\\\frac{x-1}{x+2} > 0$ megoldása a számláló és nevezelő előjel-táblázatával történik.",
        quizIntermediate: [
          {
            id: "q-ineq-i1",
            question: "Mi a megoldása a $-3x < 12$ egyenlőtlenségnek?",
            options: ["x < -4", "x > -4", "x < 4", "x > 4"],
            correctAnswer: 1,
            explanation: "-3-mal osztva az irány megfordul: x > -4."
          }
        ],
        quizAdvanced: [
          {
            id: "q-ineq-a1",
            question: "Mikor pozitív egy $\\\\frac{A}{B}$ alakú tört?",
            options: ["Ha A és B azonos előjelűek.", "Ha A pozitív.", "Ha B pozitív.", "Soha nem lehet pozitív."],
            correctAnswer: 0,
            explanation: "KTC szám hányadosa akkor és csak akkor pozitív, ha mindkettő pozitív, vagy mindkettő negatív."
          }
        ]
      },
      {
        id: "g-means-inequalities",
        title: "Középértékek, egyenlőtlenségek",
        level: 0,
        requirementsIntermediate: "Ismerje a számtani és mértani közép fogalmát.",
        requirementsAdvanced: "Bizonyítsa be a számtani és mértani közép közötti egyenlőtlenséget két pozitív számra.",
        lessonIntermediate: "### Középértékek\\\\n\\\\n- **Számtani közép:** $A = \\\\frac{a+b}{2}$\\\\n- **Mértani közép:** $G = \\\\sqrt{a \\\\cdot b}$ ($a, b \\\\ge 0$)",
        lessonAdvanced: "### Számtani és mértani közép egyenlőtlensége\\\\n\\\\n$$\\\\frac{a+b}{2} \\\\ge \\\\sqrt{ab} \\\\quad (a, b \\\\ge 0)$$\\\\nEgyenlőség akkor és csak akkor áll fenn, ha $a = b$.\\\\n*Bizonyítás:* $(\\\\sqrt{a} - \\\\sqrt{b})^2 \\\\ge 0 \\\\Rightarrow a - 2\\\\sqrt{ab} + b \\\\ge 0 \\\\Rightarrow a+b \\\\ge 2\\\\sqrt{ab} \\\\Rightarrow \\\\frac{a+b}{2} \\\\ge \\\\sqrt{ab}$.",
        quizIntermediate: [
          {
            id: "q-mean-i1",
            question: "Mennyi a 4 és 9 mértani közepe?",
            options: ["6.5", "6", "13", "5"],
            correctAnswer: 1,
            explanation: "G = gyök(4 * 9) = gyök(36) = 6."
          }
        ],
        quizAdvanced: [
          {
            id: "q-mean-a1",
            question: "Mikor egyenlő a számtani és a mértani közép értéke?",
            options: ["Ha az egyik szám 0.", "Ha a két szám megegyezik.", "Ha a számtani közép nagyobb.", "Soha nem egyenlőek."],
            correctAnswer: 1,
            explanation: "Egyenlőség pontosan akkor teljesül, ha a vizsgált számok egyenlők (a = b)."
          }
        ]
      }
    ]
  },
  {
    id: "g-functions-analysis",
    title: "Függvények, az analízis elemei",
    icon: "📈",
    color: "from-teal-500 to-indigo-600",
    subtopics: [
      {
        id: "g-function-concept",
        title: "A függvény",
        level: 0,
        requirementsIntermediate: "Értse a függvény fogalmát, értelmezési tartományát és értékkészletét.",
        requirementsAdvanced: "Ismerje a függvények kompozíciójának és inverzének pontos feltételeit.",
        lessonIntermediate: "### Függvény fogalma\\\\n\\\\nA függvény olyan hozzárendelés, ami egy $D_f$ halmaz minden eleméhez hozzárendeli egy másik halmaz pontosan egy elemét.",
        lessonAdvanced: "### Injektivitás és szürjektivitás\\\\n\\\\nInverz függvény létezésének feltétele a kölcsönösen egyértelmű (injektív) hozzárendelés.",
        quizIntermediate: [
          {
            id: "q-func-i1",
            question: "Mi az értelmezési tartománya az $f(x) = 1/x$ függvénynek a valós számok körében?",
            options: ["Minden valós szám.", "Minden pozitív valós szám.", "Minden valós szám, kivéve a 0-t.", "Az egész számok."],
            correctAnswer: 2,
            explanation: "Nullával nem oszthatunk, így a 0 nincs benne a D_f-ben."
          }
        ],
        quizAdvanced: [
          {
            id: "q-func-a1",
            question: "Melyik függvénynek van inverze az alábbiak közül a teljes értelmezési tartományán?",
            options: ["$f(x) = x^2$", "$f(x) = x^3$", "$f(x) = \\sin x$", "$f(x) = |x|$"],
            correctAnswer: 1,
            explanation: "Az f(x) = x^3 szigorúan monoton növekvő a valós számokon, így kölcsönösen egyértelmű (van inverze, a köbgyök x)."
          }
        ]
      },
      {
        id: "g-real-functions",
        title: "Egyváltozós valós függvények",
        level: 0,
        requirementsIntermediate: "Ismerje és ábrázolja a lineáris, másodfokú, abszolútérték és négyzetgyök függvényeket.",
        requirementsAdvanced: "Ábrázolja és jellemezze a hatványfüggvényeket, exponenciális, logaritmus és trigonometrikus függvényeket.",
        lessonIntermediate: "### Alapfüggvények\\\\n\\\\n- **Lineáris:** $f(x) = ax + b$ (egyenes)\\\\n- **Másodfokú:** $f(x) = x^2$ (parabola)\\\\n- **Abszolútérték:** $f(x) = |x|$ (V-alak)",
        lessonAdvanced: "### Transzcendens függvények\\\\n\\\\n- **Exponenciális:** $f(x) = a^x$ ($a > 0$)\\\\n- **Logaritmus:** $f(x) = \\\\log_a x$",
        quizIntermediate: [
          {
            id: "q-realf-i1",
            question: "Mi a képe az $f(x) = x^2$ függvénynek?",
            options: ["Egyenes", "Parabola", "Hiperbola", "Körív"],
            correctAnswer: 1,
            explanation: "A másodfokú alapfüggvény képe a parabola."
          }
        ],
        quizAdvanced: [
          {
            id: "q-realf-a1",
            question: "Hol van értelmezve az $f(x) = \\\\log_2 x$ függvény?",
            options: ["Minden valós számra.", "Minden nemnegatív valós számra.", "Minden szigorúan pozitív valós számra.", "Csak egész számokra."],
            correctAnswer: 2,
            explanation: "A logaritmus csak pozitív számokra van értelmezve (x > 0)."
          }
        ]
      },
      {
        id: "g-transformations",
        title: "A függvények grafikonja, függvénytranszformációk",
        level: 1,
        requirementsIntermediate: "Alkalmazzon egyszerű transzformációkat ($f(x)+c, f(x+c)$).",
        requirementsAdvanced: "Alkalmazzon összetett transzformációkat ($c \\\\cdot f(ax+b)+d$).",
        lessonIntermediate: "### Transzformációk\\\\n\\\\n- **$f(x) + c$:** eltolás függőlegesen $c$-vel.\\\\n- **$f(x+c)$:** eltolás vízszintesen $-c$-vel.",
        lessonAdvanced: "### Nyújtások és zsugorítások\\\\n\\\\n- **$a \\\\cdot f(x)$:** függőleges nyújtás $a$-szorosára.\\\\n- **$f(bx)$:** vízszintes zsugorítás $b$-szeresére.",
        quizIntermediate: [
          {
            id: "q-trans-i1",
            question: "Hogyan kapjuk meg a $g(x) = (x - 2)^2$ függvény grafikonját az $f(x) = x^2$ függvényéből?",
            options: ["Eltoljuk 2-vel balra.", "Eltoljuk 2-vel jobbra.", "Eltoljuk 2-vel fel.", "Eltoljuk 2-vel le."],
            correctAnswer: 1,
            explanation: "Az argumentumban lévő -2 az x-tengely mentén jobbra tolja el a grafikont 2 egységgel."
          }
        ],
        quizAdvanced: [
          {
            id: "q-trans-a1",
            question: "Hogyan hat a $g(x) = 2 \\\\cdot \\\\sin(3x)$ függvényben a 3-as szorzó az argumentumban?",
            options: ["A periódust harmadára zsugorítja.", "A periódust háromszorosára nyújtja.", "A függvényértéket háromszorozza meg.", "Nincs hatása."],
            correctAnswer: 0,
            explanation: "A sin(bx) periódusa 2*pi/|b|, így a 3-as szorzó 3-szor gyorsabbá teszi a hullámzást, azaz 1/3-ára csökkenti a periódust."
          }
        ]
      },
      {
        id: "g-function-properties",
        title: "A függvények jellemzése",
        level: 1,
        requirementsIntermediate: "Jellemezzen egyszerűbb függvényeket zérushely, szélsőérték és monotonitás szerint.",
        requirementsAdvanced: "Jellemezze a függvényeket paritás, periodicitás, konvexitás és korlátosság alapján.",
        lessonIntermediate: "### Monotonitás és Szélsőérték\\\\n\\\\n- **Lokális maximum:** a pont, ahol a függvényérték nagyobb a környezeténél.\\\\n- **Zérushely:** ahol a grafikon metszi az x-tengelyt ($f(x) = 0$).",
        lessonAdvanced: "### Paritás és periodicitás\\\\n\\\\n- **Páros:** $f(-x) = f(x)$ (szimmetrikus az y-tengelyre).\\\\n- **Páratlan:** $f(-x) = -f(x)$ (középpontosan szimmetrikus az origóra).",
        quizIntermediate: [
          {
            id: "q-propf-i1",
            question: "Mit jelent a zérushely?",
            options: ["Azt a pontot, ahol a függvény értéke 0.", "Az origót.", "A függvény értelmezési tartományának végét.", "A szélsőértéket."],
            correctAnswer: 0,
            explanation: "A zérushely az az x érték, amelyre f(x) = 0."
          }
        ],
        quizAdvanced: [
          {
            id: "q-propf-a1",
            question: "Melyik függvény páratlan az alábbiak közül?",
            options: ["$f(x) = \\cos x$", "$f(x) = \\sin x$", "$f(x) = x^2$", "$f(x) = |x|$"],
            correctAnswer: 1,
            explanation: "A szinusz függvény páratlan, mert sin(-x) = -sin(x)."
          }
        ]
      },
      {
        id: "g-sequences",
        title: "Sorozatok",
        level: 0,
        requirementsIntermediate: "Ismerje a sorozat fogalmát és különböző megadási módjait (képlet, rekurzió).",
        requirementsAdvanced: "Határozza meg a számsorozatok korlátosságát és monotonitását algebrai úton.",
        lessonIntermediate: "### Sorozat fogalma\\\\n\\\\nA sorozat olyan függvény, amely a pozitív egész számokhoz rendel valós számokat. Megadható explicit képlettel (pl. $a_n = 2n$) vagy rekurzívan (pl. $a_{n+1} = a_n + 2$).",
        lessonAdvanced: "### Határérték fogalma\\\\n\\\\nEgy sorozat konvergens, ha létezik olyan $L$ szám, hogy tetszőleges $\\\\varepsilon > 0$-hoz van olyan küszöbindex, amelytől kezdve $|a_n - L| < \\\\varepsilon$.",
        quizIntermediate: [
          {
            id: "q-seq-i1",
            question: "Ha egy rekurzív sorozatnál $a_1 = 3$ és $a_{n+1} = 2a_n$, mennyi $a_3$?",
            options: ["6", "12", "9", "8"],
            correctAnswer: 1,
            explanation: "a_2 = 2 * 3 = 6; a_3 = 2 * 6 = 12."
          }
        ],
        quizAdvanced: [
          {
            id: "q-seq-a1",
            question: "Konvergens-e az $a_n = 1/n$ sorozat?",
            options: ["Nem, mert végtelen tagja van.", "Igen, és a határértéke 0.", "Igen, és a határértéke 1.", "Nem döönthető el."],
            correctAnswer: 1,
            explanation: "lim (1/n) = 0, a sorozat konvergens."
          }
        ]
      },
      {
        id: "g-arithmetic-geometric",
        title: "Számtani és mértani sorozatok",
        level: 1,
        requirementsIntermediate: "Ismerje és alkalmazza a számtani és mértani sorozat tagjaira és összegére vonatkozó képleteket.",
        requirementsAdvanced: "Vezesse le a számtani és mértani sorozat összegképletét.",
        lessonIntermediate: "### Számtani és mértani sorozatok\\\\n\\\\n- **Számtani:** $a_n = a_1 + (n-1)d$, $S_n = \\\\frac{a_1+a_n}{2} \\\\cdot n$\\\\n- **Mértani:** $a_n = a_1 \\\\cdot q^{n-1}$, $S_n = a_1 \\\\cdot \\\\frac{q^n - 1}{q - 1}$",
        lessonAdvanced: "### Összegképlet levezetése\\\\n\\\\nA számtani sorozat összegképletének levezetése Gauss módszerével (a tagok sorrendjének felcserélésével és összeadásával).",
        quizIntermediate: [
          {
            id: "q-arigeo-i1",
            question: "Egy számtani sorozat első tagja 4, különbsége (d) 5. Mennyi a 4. tagja?",
            options: ["19", "24", "14", "9"],
            correctAnswer: 0,
            explanation: "a_4 = 4 + (4-1)*5 = 4 + 15 = 19."
          }
        ],
        quizAdvanced: [
          {
            id: "q-arigeo-a1",
            question: "Mennyi az első 10 tag összege egy olyan mértani sorozatban, ahol $a_1 = 3$ és $q = 1$?",
            options: ["30", "3", "0", "A képlet nem alkalmazható közvetlenül, de az összeg 30."],
            correctAnswer: 3,
            explanation: "Ha q=1, a mértani sorozat képlete nem alkalmazható közvetlenül (osztás 0-val), de minden tag 3, így az összeg 10 * 3 = 30."
          }
        ]
      },
      {
        id: "g-infinite-series",
        title: "Végtelen mértani sor",
        level: 1,
        requirementsIntermediate: "Ismerje a végtelen mértani sor fogalmát.",
        requirementsAdvanced: "Számítsa ki a végtelen mértani sor összegét, ha $|q| < 1$.",
        lessonIntermediate: "### Végtelen mértani sor\\\\n\\\\nHa egy mértani sorozat tagjait a végtelenségig összeadjuk: $a_1 + a_1q + a_1q^2 + \\\\dots$.",
        lessonAdvanced: "### Konvergencia feltétele\\\\n\\\\nA végtelen mértani sor akkor és csak akkor konvergens, ha $|q| < 1$. Az összeg:\\\\n$$S = \\\\frac{a_1}{1 - q}$$",
        quizIntermediate: [
          {
            id: "q-inf-i1",
            question: "Mikor konvergens egy végtelen mértani sor?",
            options: ["Ha q > 1", "Ha |q| < 1", "Ha q = 1", "Mindig konvergens"],
            correctAnswer: 1,
            explanation: "Konvergencia szükséges és elégséges feltétele: |q| < 1."
          }
        ],
        quizAdvanced: [
          {
            id: "q-inf-a1",
            question: "Mennyi az $1 + 1/2 + 1/4 + 1/8 + \\\\dots$ végtelen sor összege?",
            options: ["1.5", "2", "3", "végtelen"],
            correctAnswer: 1,
            explanation: "a_1 = 1, q = 1/2. S = 1 / (1 - 1/2) = 1 / (1/2) = 2."
          }
        ]
      },
      {
        id: "g-interest-annuities",
        title: "Kamatos kamat, járadékszámítás",
        level: 1,
        requirementsIntermediate: "Használja a kamatos kamat képletét egyszerű pénzügyi feladatokban.",
        requirementsAdvanced: "Tudjon gyűjtőjáradékot és hiteltörlesztést számítani sorozatok segítségével.",
        lessonIntermediate: "### Kamatos kamat\\\\n\\\\nHa $C_0$ tőkét $p\\\\%$-os kamatra kötünk le $n$ évre:\\\\n$$C_n = C_0 \\\\cdot (1 + \\\\frac{p}{100})^n$$",
        lessonAdvanced: "### Járadékszámítás\\\\n\\\\nA gyűjtőjáradék azonos időközönként befizetett azonos összegek jövőértékének összege, ami mértani sorozat összegeként számítható.",
        quizIntermediate: [
          {
            id: "q-int-i1",
            question: "Beteszünk 50 000 Ft-ot évi 10%-os kamatra. Mennyi lesz a pénzünk 2 év múlva?",
            options: ["60 000 Ft", "60 500 Ft", "55 000 Ft", "61 000 Ft"],
            correctAnswer: 1,
            explanation: "50000 * (1.1)^2 = 50000 * 1.21 = 60 500 Ft."
          }
        ],
        quizAdvanced: [
          {
            id: "q-int-a1",
            question: "Mi a matematikai alapja a járadékszámításnak?",
            options: ["Számtani sorozat összege", "Mértani sorozat összege", "Logaritmus azonosságok", "Klasszikus valószínűség"],
            correctAnswer: 1,
            explanation: "Mivel minden évben kamatozik a tőke, a visszafizetések/befizetések mértani sorozatot alkotnak."
          }
        ]
      },
      {
        id: "g-calculus-elements",
        title: "Az egyváltozós valós függvények analízisének elemei",
        level: 0,
        requirementsIntermediate: "Értse az elemzés alapvető céljait.",
        requirementsAdvanced: "Ismerje az analízis történeti hátterét és alapvető fogalmait.",
        lessonIntermediate: "### Az analízis elemei\\\\n\\\\nAz analízis függvények folytonos változását, határértékét, deriválását (változási ütem) és integrálását (görbe alatti terület) vizsgálja.",
        lessonAdvanced: "### Határérték precíz definíciója\\\\n\\\\nAz Weierstrass-féle $\\\\varepsilon - \\\\delta$ definíció a függvény határértékére.",
        quizIntermediate: [
          {
            id: "q-calelem-i1",
            question: "Mi a függvény analízis két fő területe?",
            options: ["Halmazok és gráfok", "Differenciálszámítás és integrálszámítás", "Kombinatorika és statisztika", "Algebra és geometria"],
            correctAnswer: 1,
            explanation: "Az analízis két fő pillére a deriválás (differenciálás) és az integrálás."
          }
        ],
        quizAdvanced: [
          {
            id: "q-calelem-a1",
            question: "Kikhez köthető az analízis független felfedezése a 17. században?",
            options: ["Pitagorasz és Thalész", "Newton és Leibniz", "Euler és Gauss", "Cantor és Hilbert"],
            correctAnswer: 1,
            explanation: "Az analízist (kalkulust) Isaac Newton és Gottfried Wilhelm Leibniz fejlesztette ki egymástól függetlenül."
          }
        ]
      },
      {
        id: "g-limits-continuity",
        title: "Határérték, folytonosság",
        level: 1,
        requirementsIntermediate: "Ismerje a határérték és folytonosság szemléletes fogalmát.",
        requirementsAdvanced: "Definiálja a folytonosságot és határértéket matematikai precizitással.",
        lessonIntermediate: "### Határérték és folytonosság\\\\n\\\\nEgy függvény folytonos egy pontban, ha a grafikonja ott nem szakad meg. Szemléletesen: a ceruzát nem kell felemelni rajzolás közben.",
        lessonAdvanced: "### Folytonosság definíciója\\\\n\\\\nAz $f$ függvény folytonos az $x_0$ pontban, ha ott értelmezve van, létezik a határértéke, és az megegyezik a helyettesítési értékkel:\\\\n$$\\\\lim_{x \\\\to x_0} f(x) = f(x_0)$$",
        quizIntermediate: [
          {
            id: "q-limcont-i1",
            question: "Folytonos-e az $f(x) = x^2$ függvény minden valós helyen?",
            options: ["Igen, mert nincs benne szakadás.", "Nem, mert 0-ban szakadása van.", "Nem, mert görbe vonalú.", "Csak pozitív x-re folytonos."],
            correctAnswer: 0,
            explanation: "A másodfokú polinomfüggvény minden pontban folytonos."
          }
        ],
        quizAdvanced: [
          {
            id: "q-limcont-a1",
            question: "Mennyi a $\\\\lim_{x \\\\to 2} \\\\frac{x^2 - 4}{x - 2}$ határérték?",
            options: ["0", "2", "4", "Nem létezik"],
            correctAnswer: 2,
            explanation: "x^2 - 4 = (x-2)(x+2). A tört egyszerűsítve x+2. A határérték x=2 helyen 2+2=4."
          }
        ]
      },
      {
        id: "g-differential-calculus",
        title: "Differenciálszámítás",
        level: 1,
        requirementsIntermediate: "Értse a derivált fizikai és geometriai jelentését (érintő meredeksége).",
        requirementsAdvanced: "Alkalmazza a deriválási szabályokat (szorzat, hányados, láncszabály). Végezzen teljes függvényvizsgálatot.",
        lessonIntermediate: "### A derivált\\\\n\\\\nA derivált a függvény változási sebessége egy adott pontban. Geometriailag a ponthoz húzott érintő meredeksége (meredekség = $f'(x)$).",
        lessonAdvanced: "### Deriválási szabályok\\\\n\\\\n- Szorzat: $(u \\\\cdot v)' = u'v + uv'$\\\\n- Hányados: $(u/v)' = \\\\frac{u'v - uv'}{v^2}$\\\\n- Láncszabály (összetett): $(f(g(x)))' = f'(g(x)) \\\\cdot g'(x)$",
        quizIntermediate: [
          {
            id: "q-diff-i1",
            question: "Mi a geometriai jelentése a függvény deriváltjának egy adott pontban?",
            options: ["A görbe alatti terület.", "A ponthoz tartozó érintő meredeksége.", "A függvényérték.", "A zérushely."],
            correctAnswer: 1,
            explanation: "A derivált megadja az érintő meredekségét (tangensét)."
          }
        ],
        quizAdvanced: [
          {
            id: "q-diff-a1",
            question: "Mennyi az $f(x) = 3x^2 + 5x$ függvény deriváltja?",
            options: ["$6x + 5$", "$3x + 5$", "$6x$", "$3x^2$"],
            correctAnswer: 0,
            explanation: "(3x^2)' = 3*2x = 6x, és (5x)' = 5. Összesen 6x + 5."
          }
        ]
      },
      {
        id: "g-integral-calculus",
        title: "Integrálszámítás",
        level: 1,
        requirementsIntermediate: "Ismerje a határozott integrál fogalmát (területszámítás).",
        requirementsAdvanced: "Ismerje a primitív függvény fogalmát és a Newton-Leibniz tételt.",
        lessonIntermediate: "### Integrál fogalma\\\\n\\\\nA határozott integrál megadja a függvény grafikonja és az x-tengely közötti területet egy $[a, b]$ intervallumon.",
        lessonAdvanced: "### Newton-Leibniz tétel\\\\n\\\\n$$\\\\int_a^b f(x)\\\\,dx = F(b) - F(a)$$\\\\nahol $F'(x) = f(x)$ (primitív függvény).",
        quizIntermediate: [
          {
            id: "q-int-i1",
            question: "Mit számolunk ki a határozott integrállal?",
            options: ["Az érintő meredekségét", "A függvény zérushelyét", "A görbe alatti területet", "A függvény maximumát"],
            correctAnswer: 2,
            explanation: "A határozott integrál geometriai jelentése a görbe alatti előjeles terület."
          }
        ],
        quizAdvanced: [
          {
            id: "q-int-a1",
            question: "Mi az $f(x) = x^2$ egy primitív függvénye?",
            options: ["$2x$", "$x^3 / 3$", "$x^3$", "$3x^2$"],
            correctAnswer: 1,
            explanation: "(x^3 / 3)' = 3x^2 / 3 = x^2, így ez a primitív függvény."
          }
        ]
      }
    ]
  },
  {
    id: "g-geometry-trig",
    title: "Geometria, koordinátageometria, trigonometria",
    icon: "📐",
    color: "from-emerald-500 to-indigo-600",
    subtopics: [
      {
        id: "g-elem-geom",
        title: "Elemi geometria",
        level: 0,
        requirementsIntermediate: "Ismerje az elemi geometria alapfogalmait (pont, egyenes, sík).",
        requirementsAdvanced: "Használjon axiomatikus megközelítést bizonyítások során.",
        lessonIntermediate: "### Geometriai alapok\\\\n\\\\nAz elemi geometria a sík és a tér pontjaival, egyeneseivel, szögfogalmakkal foglalkozik bizonyítások nélkül.",
        lessonAdvanced: "### Axiomatikus felépítés\\\\n\\\\nHilbert-féle axiómarendszer a geometriában.",
        quizIntermediate: [
          {
            id: "q-elemg-i1",
            question: "Hány pont határoz meg egyértelműen egy egyenest a síkban?",
            options: ["1", "2", "3", "Végtelen"],
            correctAnswer: 1,
            explanation: "Két különböző pontra pontosan egy egyenes illeszthető."
          }
        ],
        quizAdvanced: [
          {
            id: "q-elemg-a1",
            question: "Ki alkotta meg az első híres geometriai axiómarendszert (Elemek)?",
            options: ["Pitagorasz", "Eukleidész", "Thalész", "Bolyai János"],
            correctAnswer: 1,
            explanation: "Eukleidész 'Elemek' című műve az axiomatikus geometria alapja."
          }
        ]
      },
      {
        id: "g-spatial-elements",
        title: "Térelemek",
        level: 1,
        requirementsIntermediate: "Ismerje a térelemek távolságát és szögét (pont, sík, egyenes).",
        requirementsAdvanced: "Határozza meg kitérő egyenesek távolságát és hajlásszögét.",
        lessonIntermediate: "### Térelemek kölcsönös helyzete\\\\n\\\\n- **Párhuzamos:** síkban nem metszik egymást.\\\\n- **Metsző:** egy közös pontjuk van.\\\\n- **Kitérő (csak térben):** nem párhuzamosak és nem metszik egymást.",
        lessonAdvanced: "### Kitérő egyenesek távolsága\\\\n\\\\nA kitérő egyenesek távolsága a rájuk fektetett párhuzamos síkok távolságával egyezik meg.",
        quizIntermediate: [
          {
            id: "q-space-i1",
            question: "Melyik állítás igaz a kitérő egyenesekre?",
            options: ["Párhuzamosak.", "Metszik egymást.", "Különböző síkban vannak, és nem metszik egymást.", "Egy síkban vannak."],
            correctAnswer: 2,
            explanation: "Ez a kitérő egyenesek definíciója térben."
          }
        ],
        quizAdvanced: [
          {
            id: "q-space-a1",
            question: "Hány közös normálisa van két kitérő egyenesnek a térben?",
            options: ["0", "1", "2", "Végtelen sok"],
            correctAnswer: 1,
            explanation: "Két kitérő egyenesnek pontosan egy közös merőleges egyenese (normálisa) létezik."
          }
        ]
      },
      {
        id: "g-geometric-loci",
        title: "A távolságfogalom segítségével definiált ponthalmazok",
        level: 1,
        requirementsIntermediate: "Ismerje a szakaszfelező merőleges, szögfelező és kör fogalmát ponthalmazként.",
        requirementsAdvanced: "Definiálja a parabolát és ellipszist ponthalmazként.",
        lessonIntermediate: "### Nevezetes ponthalmazok\\\\n\\\\n- **Szakaszfelező merőleges:** a szakasz két végpontjától egyenlő távolságra lévő pontok a síkban.\\\\n- **Szögfelező:** a szög száraitól egyenlő távolságra lévő pontok a síkban.",
        lessonAdvanced: "### Parabola és Ellipszis\\\\n\\\\n- **Parabola:** egy ponttól (fókusz) és egy egyenestől (vezéregyenes) egyenlő távolságra lévő pontok halmaza.",
        quizIntermediate: [
          {
            id: "q-loci-i1",
            question: "Mi a sík azon pontjainak halmaza, amelyek egy rögzített ponttól azonos távolságra vannak?",
            options: ["Egyenes", "Körvonal", "Gömb", "Parabola"],
            correctAnswer: 1,
            explanation: "Ez a körvonal definíciója a síkban."
          }
        ],
        quizAdvanced: [
          {
            id: "q-loci-a1",
            question: "Hogyan definiálható az ellipszis a fókuszpontok segítségével?",
            options: [
              "A fókuszoktól való távolságok szorzata állandó.",
              "A fókuszoktól való távolságok összege állandó.",
              "A fókuszoktól való távolságok különbsége állandó.",
              "A fókuszoktól való távolságok hányadosa állandó."
            ],
            correctAnswer: 1,
            explanation: "Az ellipszis azon pontok halmaza, amelyek két fókuszponttól vett távolságaik összege állandó."
          }
        ]
      },
      {
        id: "g-geom-transformations",
        title: "Geometriai transzformációk",
        level: 0,
        requirementsIntermediate: "Ismerje a transzformáció mint hozzárendelés fogalmát.",
        requirementsAdvanced: "Vizsgálja a transzformációkat mint csoportot (pl. egybevágósági transzformációk csoportja).",
        lessonIntermediate: "### Geometriai transzformáció\\\\n\\\\nA sík vagy a tér pontjaihoz pontokat rendelő hozzárendelés. Ha távolságtartó, egybevágósági transzformációnak nevezzük.",
        lessonAdvanced: "### Lineáris transzformációk mátrixa\\\\n\\\\nA geometriai transzformációk leírása mátrixszorzások segítségével.",
        quizIntermediate: [
          {
            id: "q-geomt-i1",
            question: "Mi a geometriai transzformáció?",
            options: ["Egyenletmegoldás", "Síki pont-pont hozzárendelés", "Területszámítás", "Mértékegység átváltás"],
            correctAnswer: 1,
            explanation: "A transzformáció egy pontokhoz pontokat rendelő leképezés."
          }
        ],
        quizAdvanced: [
          {
            id: "q-geomt-a1",
            question: "Melyik állítás igaz az egybevágósági transzformációk kompozíciójára?",
            options: ["Nem egybevágóság.", "Szintén egybevágóság.", "Csak akkor egybevágóság, ha mindkettő eltolás.", "Változtatja a méretet."],
            correctAnswer: 1,
            explanation: "Két egybevágósági transzformáció egymás utáni elvégzése szintén távolságtartó (egybevágó)."
          }
        ]
      },
      {
        id: "g-congruence-trans",
        title: "Egybevágósági transzformációk",
        level: 1,
        requirementsIntermediate: "Ismerje a tengelyes tükrözés, középpontos tükrözés, eltolás és forgatás tulajdonságait.",
        requirementsAdvanced: "Bizonyítsa a háromszögek egybevágósági eseteit transzformációkkal.",
        lessonIntermediate: "### Egybevágóságok\\\\n\\\\n- **Tengelyes tükrözés:** irányításváltó transzformáció.\\\\n- **Középpontos tükrözés / Eltolás / Forgatás:** irányítástartó transzformációk.",
        lessonAdvanced: "### Síkidomok egybevágósága\\\\n\\\\nKét alakzat egybevágó, ha létezik olyan egybevágósági transzformáció, ami az egyiket a másikba viszi.",
        quizIntermediate: [
          {
            id: "q-cong-i1",
            question: "Melyik transzformáció vált irányítást?",
            options: ["Eltolás", "Középpontos tükrözés", "Tengelyes tükrözés", "Forgatás"],
            correctAnswer: 2,
            explanation: "A tengelyes tükrözés megváltoztatja az alakzat körüljárási irányát (irányításváltó)."
          }
        ],
        quizAdvanced: [
          {
            id: "q-cong-a1",
            question: "Mi a középpontos tükrözés ekvivalens megfelelője forgatással?",
            options: ["90 fokos forgatás", "180 fokos forgatás", "270 fokos forgatás", "360 fokos forgatás"],
            correctAnswer: 1,
            explanation: "A középpontos tükrözés megegyezik a pont körüli 180 fokos forgatással."
          }
        ]
      },
      {
        id: "g-similarity-trans",
        title: "Hasonlósági transzformációk",
        level: 1,
        requirementsIntermediate: "Ismerje a középpontos hasonlóság fogalmát és a területek/felszínek arányát ($k^2$, $k^3$).",
        requirementsAdvanced: "Bizonyítsa és alkalmazza a párhuzamos szelők tételét és a szögfelező tételt.",
        lessonIntermediate: "### Hasonlóság\\\\n\\\\n- Hasonló alakzatok megfelelő szögei egyenlők, oldalai arányosak ($k$).\\\\n- Területek aránya: $k^2$.\\\\n- Testek térfogatának aránya: $k^3$.",
        lessonAdvanced: "### Párhuzamos szelők tétele\\\\n\\\\nHa egy szög szárait párhuzamos egyenesekkel metsszük, a szárakon keletkező megfelelő szakaszok aránya megegyezik.",
        quizIntermediate: [
          {
            id: "q-sim-i1",
            question: "Ha egy háromszög oldalait kétszeresére növeljük, hányszorosára nő a területe?",
            options: ["2-szeresére", "4-szeresére", "8-szorosára", "Nem változik"],
            correctAnswer: 1,
            explanation: "A területek aránya a hasonlósági arány négyzete: 2^2 = 4."
          }
        ],
        quizAdvanced: [
          {
            id: "q-sim-a1",
            question: "Mit mond ki a belső szögfelező tétel a háromszögben?",
            options: [
              "A szögfelező felezi a szemközti oldalt.",
              "A szögfelező a szemközti oldalt a szomszédos oldalak arányában osztja meg.",
              "A szögfelezők a magasságpontban metszik egymást.",
              "A szögfelező merőleges az oldalra."
            ],
            correctAnswer: 1,
            explanation: "Ez a belső szögfelező tétel definíciója."
          }
        ]
      },
      {
        id: "g-other-transformations",
        title: "Egyéb transzformációk",
        level: 1,
        requirementsIntermediate: "Ismerje a vetítések fogalmát.",
        requirementsAdvanced: "Ismerje és alkalmazza a merőleges vetítést koordináta-rendszerben.",
        lessonIntermediate: "### Vetítések\\\\n\\\\nA síkra vagy egyenesre történő leképezések (pl. párhuzamos vetítés, merőleges vetítés), amelyek nem feltétlenül távolságtartóak.",
        lessonAdvanced: "### Affinitás\\\\n\\\\nTengelyes affinitás és hasonlósági transzformációk kapcsolata.",
        quizIntermediate: [
          {
            id: "q-othert-i1",
            question: "Távolságtartó-e a merőleges vetítés általában?",
            options: ["Igen, mindig.", "Nem, mert a pontok közelebb kerülhetnek egymáshoz a vetületen.", "Csak ha az egyenes függőleges.", "Igen, ha a vetítés párhuzamos."],
            correctAnswer: 1,
            explanation: "A vetítés csökkentheti vagy 0-vá teheti a távolságot (pl. egyenesre merőleges szakasz vetülete egyetlen pont)."
          }
        ],
        quizAdvanced: [
          {
            id: "q-othert-a1",
            question: "Mi a vetülete a $\\\\vec{v}(3, 4)$ vektornak az x-tengelyre?",
            options: ["(3, 0)", "(0, 4)", "(3, 4)", "(0, 0)"],
            correctAnswer: 0,
            explanation: "Az x-tengelyre való vetítésnél az y koordináta 0 lesz, a válasz (3, 0)."
          }
        ]
      },
      {
        id: "g-shapes-3d-2d",
        title: "Síkbeli és térbeli alakzatok",
        level: 0,
        requirementsIntermediate: "Csoportosítsa a síkidomokat és testeket tulajdonságaik alapján.",
        requirementsAdvanced: "Vizsgálja meg konvex és konkáv alakzatok topológiai tulajdonságait (Euler-féle poliédertétel).",
        lessonIntermediate: "### Alakzatok csoportosítása\\\\n\\\\n- **Konvex:** Ha az alakzat tetszőleges két pontját összekötő szakasz is az alakzaton belül fut.\\\\n- **Konkáv:** Nem konvex.",
        lessonAdvanced: "### Euler-féle poliédertétel\\\\n\\\\nKonvex poliéderekre teljesül:\\\\n$$Csúcsok - Élek + Lapok = 2$$",
        quizIntermediate: [
          {
            id: "q-shapes-i1",
            question: "Melyik alakzat konvex az alábbiak közül?",
            options: ["Félhold", "Körlap", "L-alakú idom", "Csillag"],
            correctAnswer: 1,
            explanation: "A körlap tetszőleges két pontját összekötő szakasz teljes egészében a körlapon belül van, így konvex."
          }
        ],
        quizAdvanced: [
          {
            id: "q-shapes-a1",
            question: "Hány éle van egy olyan konvex poliédernek, amelynek 8 csúcsa és 6 lapja van (pl. kocka)?",
            options: ["12", "14", "10", "8"],
            correctAnswer: 0,
            explanation: "Euler-tétel: C - É + L = 2 => 8 - É + 6 = 2 => 14 - É = 2 => É = 12."
          }
        ]
      },
      {
        id: "g-planar-shapes",
        title: "Síkbeli alakzatok",
        level: 1,
        requirementsIntermediate: "Ismerje a síkidomok (háromszög, négyszög, kör) alaptulajdonságait.",
        requirementsAdvanced: "Alkalmazzon összetett geometriai bizonyításokat sokszögekre.",
        lessonIntermediate: "### Síkidomok\\\\n\\\\nA sík zárt vonalakkal határolt részei. Legfontosabbak a sokszögek és a kör.",
        lessonAdvanced: "### Terület mérhetősége\\\\n\\\\nSíki tartományok területének mérhetőségi axiómái.",
        quizIntermediate: [
          {
            id: "q-plan-i1",
            question: "Melyik állítás igaz minden konvex sokszögre?",
            options: ["Minden oldala egyenlő.", "Belső szögeinek összege (n - 2) * 180 fok.", "Nincs átlója.", "Köré írható kör."],
            correctAnswer: 1,
            explanation: "Ez a konvex sokszögek belső szögösszegének általános képlete."
          }
        ],
        quizAdvanced: [
          {
            id: "q-plan-a1",
            question: "Hány átlója van egy konvex nyolcszögnek?",
            options: ["8", "16", "20", "28"],
            correctAnswer: 2,
            explanation: "Átlók száma: n(n-3)/2 = 8*5/2 = 20."
          }
        ]
      },
      {
        id: "g-triangles",
        title: "Háromszögek",
        level: 2,
        requirementsIntermediate: "Csoportosítsa a háromszögeket, ismerje a szögösszeget, Pitagorasz-tételt.",
        requirementsAdvanced: "Bizonyítsa be a háromszög nevezetes vonalainak (magasság, súlyvonal, oldalfelező) egy pontban való metszését.",
        lessonIntermediate: "### Háromszögek alapjai\\\\n\\\\n- Belső szögek összege: $180^\\\\circ$.\\\\n- Háromszög-egyenlőtlenség: $a + b > c$.\\\\n- Nevezetes pontok: magasságpont, súlypont, beírt és körülírt kör középpontja.",
        lessonAdvanced: "### Súlyvonalak tétele\\\\n\\\\nA háromszög súlyvonalai egy pontban (súlypont) metszik egymást, és a súlypont a súlyvonalat 2:1 arányban osztja a csúcstól számítva.",
        quizIntermediate: [
          {
            id: "q-tri-i1",
            question: "Létezik-e háromszög 3 cm, 4 cm és 8 cm oldalakkal?",
            options: ["Igen, mert tetszőleges számok lehetnek.", "Nem, mert 3 + 4 < 8 (sérül a háromszög-egyenlőtlenség).", "Igen, derékszögű háromszög.", "Nem, mert a szögek nem adják ki a 180 fokot."],
            correctAnswer: 1,
            explanation: "A háromszög-egyenlőtlenség szerint bármely két oldal összegének nagyobbnak kell lennie a harmadiknál."
          }
        ],
        quizAdvanced: [
          {
            id: "q-tri-a1",
            question: "Milyen arányban osztja a súlypont a háromszög súlyvonalait a csúcstól mérve?",
            options: ["1:1", "1:2", "2:1", "3:1"],
            correctAnswer: 2,
            explanation: "A súlypont a súlyvonalat 2:1 arányban osztja meg, a hosszabbik szelet esik a csúcs felé."
          }
        ]
      },
      {
        id: "g-quadrilaterals",
        title: "Négyszögek",
        level: 2,
        requirementsIntermediate: "Ismerje a speciális négyszögek (trapéz, paralelogramma, deltoid, rombusz) tulajdonságait.",
        requirementsAdvanced: "Bizonyítsa a húr- és érintőnégyszögek tételét és megfordításukat.",
        lessonIntermediate: "### Speciális négyszögek\\\\n\\\\n- **Trapéz:** legalább egy párhuzamos oldalpár.\\\\n- **Paralelogramma:** két párhuzamos oldalpár (szemközti szögek egyenlők).\\\\n- **Deltoid:** két-két szomszédos oldal egyenlő (átlói merőlegesek).",
        lessonAdvanced: "### Húrnégyszög\\\\n\\\\nA konvex négyszög akkor és csak akkor húrnégyszög, ha szemközti szögeinek összege $180^\\\\circ$ ($\\\\alpha + \\\\gamma = 180^\\\\circ$).",
        quizIntermediate: [
          {
            id: "q-quad-i1",
            question: "Melyik állítás igaz a rombuszra?",
            options: ["Minden szöge derékszög.", "Átlói egyenlő hosszúak.", "Átlói felezik egymást és merőlegesek egymásra.", "Nincs párhuzamos oldala."],
            correctAnswer: 2,
            explanation: "Ez a rombusz egyik alapvető tulajdonsága."
          }
        ],
        quizAdvanced: [
          {
            id: "q-quad-a1",
            question: "Melyik négyszögbe írható be mindig kör (érintőnégyszög)?",
            options: ["Téglalap", "Paralelogramma", "Rombusz", "Általános trapéz"],
            correctAnswer: 2,
            explanation: "A rombusz szemközti oldalainak összege egyenlő (minden oldala a), így teljesül rá az érintőnégyszögek tétele."
          }
        ]
      },
      {
        id: "g-polygons",
        title: "Sokszögek",
        level: 2,
        requirementsIntermediate: "Ismerje a szabályos sokszögek fogalmát, belső szögösszegét.",
        requirementsAdvanced: "Határozza meg tetszőleges szabályos sokszög beírt és körülírt körének sugarát trigonometria segítségével.",
        lessonIntermediate: "### Szabályos sokszögek\\\\n\\\\nMinden oldaluk és minden belső szögük egyenlő. Egy szabályos $n$-szög egy belső szöge:\\\\n$$\\\\alpha = \\\\frac{(n-2) \\\\cdot 180^\\\\circ}{n}$$",
        lessonAdvanced: "### Szabályos sokszögek metrikus adatai\\\\n\\\\nEgy $a$ oldalhosszúságú szabályos $n$-szög beírt körének sugara: $r = \\\\frac{a}{2 \\\\cdot \\\\tan(\\\\pi / n)}$.",
        quizIntermediate: [
          {
            id: "q-poly-i1",
            question: "Mekkora a szabályos ötszög egy belső szöge?",
            options: ["60 fok", "90 fok", "108 fok", "120 fok"],
            correctAnswer: 2,
            explanation: "(5-2)*180 / 5 = 3 * 180 / 5 = 540 / 5 = 108 fok."
          }
        ],
        quizAdvanced: [
          {
            id: "q-poly-a1",
            question: "Melyik állítás igaz a szabályos sokszögekre?",
            options: [
              "Mindig írható köréjük is és beléjük is kör.",
              "Csak páros n esetén írható beléjük kör.",
              "Nincs szimmetriatengelyük.",
              "Átlóik száma megegyezik az oldalaik számával."
            ],
            correctAnswer: 0,
            explanation: "Minden szabályos sokszögnek van körülírt és beírt köre is, melyek középpontja megegyezik."
          }
        ]
      },
      {
        id: "g-circle",
        title: "Kör",
        level: 2,
        requirementsIntermediate: "Ismerje a kör részeit (sugár, átmérő, húr, ív, körcikk, érintő).",
        requirementsAdvanced: "Bizonyítsa be a kerületi és középponti szögek tételét.",
        lessonIntermediate: "### A kör elemei\\\\n\\\\n- **Érintő:** a körrel egyetlen közös pontot tartalmazó egyenes (merőleges az érintési pontba húzott sugárra).\\\\n- **Thalész-tétel:** az átmérőhöz tartozó kerületi szög derékszög.",
        lessonAdvanced: "### Kerületi és középponti szögek tétele\\\\n\\\\nAz ugyanahhoz az ívhez tartozó középponti szög ($\\\\beta$) kétszerese a kerületi szögnek ($\\\\alpha$):\\\\n$$\\\\beta = 2\\\\alpha$$",
        quizIntermediate: [
          {
            id: "q-circ-i1",
            question: "Milyen szöget zár be a kör érintője az érintési pontba húzott sugárral?",
            options: ["45 fok", "90 fok", "180 fok", "Változó"],
            correctAnswer: 1,
            explanation: "A kör érintője merőleges az érintési pontba mutató sugárra."
          }
        ],
        quizAdvanced: [
          {
            id: "q-circ-a1",
            question: "Ha egy körívhez tartozó kerületi szög 40 fok, mekkora a hozzá tartozó középponti szög?",
            options: ["20 fok", "40 fok", "80 fok", "160 fok"],
            correctAnswer: 2,
            explanation: "Középponti szög = 2 * kerületi szög = 2 * 40 = 80 fok."
          }
        ]
      },
      {
        id: "g-spatial-shapes",
        title: "Térbeli alakzatok",
        level: 1,
        requirementsIntermediate: "Ismerje a hasáb, gúla, henger, kúp és gömb fogalmát és elemeit.",
        requirementsAdvanced: "Határozza meg a csonkagúla és csonkakúp metrikus adatait.",
        lessonIntermediate: "### Testek (Poliéderek és forgástestek)\\\\n\\\\n- **Hasáb/Henger:** Két párhuzamos lapja (alaplap) egybevágó sokszög/kör.\\\\n- **Gúla/Kúp:** Alaplapból és egy csúcspontból állnak.",
        lessonAdvanced: "### Csonka testek\\\\n\\\\nA csonkatestet a gúla/kúp alaplappal párhuzamos síkmetszésével kapjuk az alaprész megtartásával.",
        quizIntermediate: [
          {
            id: "q-3d-i1",
            question: "Melyik test forgástest az alábbiak közül?",
            options: ["Hasáb", "Gúla", "Henger", "Kocka"],
            correctAnswer: 2,
            explanation: "A henger egy téglalap tengely körüli megforgatásával kapható, így forgástest."
          }
        ],
        quizAdvanced: [
          {
            id: "q-3d-a1",
            question: "Hány alaplapja van a csonkakúpnak?",
            options: ["1", "2", "3", "Nincs alaplapja"],
            correctAnswer: 1,
            explanation: "A csonkakúpnak két párhuzamos, kör alakú lapja (alaplap és fedőlap) van."
          }
        ]
      },
      {
        id: "g-vectors",
        title: "Vektorok síkban és térben",
        level: 0,
        requirementsIntermediate: "Ismerje a vektor fogalmát, vektorműveleteket geometriai úton és koordinátákkal.",
        requirementsAdvanced: "Bizonyítsa a skaláris szorzat koordinátákkal való kiszámítási képletét.",
        lessonIntermediate: "### Vektorok\\\\n\\\\nA vektor irányított szakasz. Összeadható a háromszög- vagy paralelogramma-módszerrel. Koordinátákkal: $\\\\vec{a}(a_1, a_2) + \\\\vec{b}(b_1, b_2) = \\\\vec{c}(a_1+b_1, a_2+b_2)$.",
        lessonAdvanced: "### Skaláris szorzat\\\\n\\\\n$$\\\\vec{a} \\\\cdot \\\\vec{b} = |\\\\vec{a}| \\\\cdot |\\\\vec{b}| \\\\cdot \\\\cos\\\\varphi = a_1b_1 + a_2b_2$$",
        quizIntermediate: [
          {
            id: "q-vec-i1",
            question: "Mennyi az $\\\\vec{a}(2, 3)$ és $\\\\vec{b}(1, -1)$ vektorok összege?",
            options: ["(3, 2)", "(3, 4)", "(1, 4)", "(3, -3)"],
            correctAnswer: 0,
            explanation: "Koordinátánként összeadunk: (2+1, 3+(-1)) = (3, 2)."
          }
        ],
        quizAdvanced: [
          {
            id: "q-vec-a1",
            question: "Mikor merőleges két nemnulla vektor egymásra?",
            options: [
              "Ha skaláris szorzatuk 0.",
              "Ha skaláris szorzatuk 1.",
              "Ha összegük nullvektor.",
              "Ha párhuzamosak."
            ],
            correctAnswer: 0,
            explanation: "A skaláris szorzat képletében cos(90) = 0 szerepel, így a szorzat pontosan ekkor 0."
          }
        ]
      },
      {
        id: "g-trigonometry",
        title: "Trigonometria",
        level: 0,
        requirementsIntermediate: "Definiálja hegyesszögek szögfüggvényeit. Alkalmazza a szinusz- és koszinusztételt.",
        requirementsAdvanced: "Bizonyítsa a szinusz- és koszinusztételt. Használja az addíciós tételeket.",
        lessonIntermediate: "### Szögfüggvények derékszögű háromszögben\\\\n\\\\n- $\\\\sin\\\\alpha = \\\\text{szemközti} / \\\\text{átfogó}$\\\\n- $\\\\cos\\\\alpha = \\\\text{szomszédos} / \\\\text{átfogó}$\\\\n- $\\\\tan\\\\alpha = \\\\text{szemközti} / \\\\text{szomszédos}$",
        lessonAdvanced: "### Szinusz- és Koszinusztétel\\\\n\\\\n- Szinusztétel: $\\\\frac{a}{\\\\sin\\\\alpha} = \\\\frac{b}{\\\\sin\\\\beta}$\\\\n- Koszinusztétel: $c^2 = a^2 + b^2 - 2ab\\\\cos\\\\gamma$",
        quizIntermediate: [
          {
            id: "q-trig-i1",
            question: "Derékszögű háromszögben az átfogó 10 cm, $\\alpha$ szög szemközti befogója 6 cm. Mennyi $\\sin\\alpha$?",
            options: ["0.6", "0.8", "1.66", "0.5"],
            correctAnswer: 0,
            explanation: "sin(\\alpha) = szemközti / átfogó = 6 / 10 = 0.6."
          }
        ],
        quizAdvanced: [
          {
            id: "q-trig-a1",
            question: "Melyik képlet felel meg a koszinusztételnek?",
            options: [
              "$c^2 = a^2 + b^2$",
              "$c^2 = a^2 + b^2 - 2ab\\cos\\gamma$",
              "$a/\\sin\\alpha = b/\\sin\\beta$",
              "$c^2 = a^2 - b^2$"
            ],
            correctAnswer: 1,
            explanation: "Ez a koszinusztétel általános képlete tetszőleges háromszögekre."
          }
        ]
      },
      {
        id: "g-coordinate-geometry",
        title: "Koordinátageometria",
        level: 0,
        requirementsIntermediate: "Számoljon két pont távolságát, szakasz felezőpontját.",
        requirementsAdvanced: "Írja fel az egyenes, kör és parabola egyenletét. Számítson metszéspontokat.",
        lessonIntermediate: "### Koordinátageometria alapjai\\\\n\\\\n- **Felezőpont:** $F\\\\left(\\\\frac{x_1+x_2}{2}, \\\\frac{y_1+y_2}{2}\\\\right)$\\\\n- **Távolság:** $d = \\\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$",
        lessonAdvanced: "### Alakzatok egyenletei\\\\n\\\\n- **Kör:** $(x-u)^2 + (y-v)^2 = r^2$\\\\n- **Egyenes:** $Ax + By = C$ (ahol $\\\\vec{n}(A, B)$ a normálvektor)",
        quizIntermediate: [
          {
            id: "q-cgeo-i1",
            question: "Mennyi az A(1, 2) és B(5, 2) pontok távolsága?",
            options: ["4", "3", "5", "16"],
            correctAnswer: 0,
            explanation: "d = gyök((5-1)^2 + (2-2)^2) = gyök(16 + 0) = 4."
          }
        ],
        quizAdvanced: [
          {
            id: "q-cgeo-a1",
            question: "Mi a normálvektora a $3x - 4y = 12$ egyenesnek?",
            options: ["(3, -4)", "(4, 3)", "(3, 4)", "(-4, 3)"],
            correctAnswer: 0,
            explanation: "Az Ax + By = C egyenletű egyenes normálvektora az együtthatókból képzett (A, B) vektor, azaz (3, -4)."
          }
        ]
      },
      {
        id: "g-points-vectors",
        title: "Pontok, vektorok",
        level: 1,
        requirementsIntermediate: "Ismerje a helyvektor és a pontok koordinátái közötti kapcsolatot.",
        requirementsAdvanced: "Bizonyítsa a szakasz osztópontjainak (felezőpont, harmadolópont) és a háromszög súlypontjának koordinátáit.",
        lessonIntermediate: "### Pontok és helyvektorok\\\\n\\\\nA sík minden $P(x, y)$ pontjához egyértelműen hozzárendelhető az origóból oda mutató $\\\\vec{p} = \\\\vec{OP}$ helyvektor, melynek koordinátái megegyeznek a pont koordinátáival.",
        lessonAdvanced: "### Súlypont koordinátái\\\\n\\\\nA háromszög $S$ súlypontjának koordinátái a csúcsok koordinátáinak számtani közepe:\\\\n$$S_x = \\\\frac{A_x+B_x+C_x}{3}, \\\\quad S_y = \\\\frac{A_y+B_y+C_y}{3}$$",
        quizIntermediate: [
          {
            id: "q-ptvec-i1",
            question: "Mi a P(3, -4) pont helyvektora?",
            options: ["(3, -4)", "(-3, 4)", "(3, 4)", "(0, 0)"],
            correctAnswer: 0,
            explanation: "A helyvektor koordinátái megegyeznek a pont koordinátáival."
          }
        ],
        quizAdvanced: [
          {
            id: "q-ptvec-a1",
            question: "Mennyi az A(1, 2), B(3, 4), C(5, 6) csúcsokkal rendelkező háromszög súlypontjának koordinátája?",
            options: ["S(3, 4)", "S(4, 3)", "S(9, 12)", "S(3, 3)"],
            correctAnswer: 0,
            explanation: "S_x = (1+3+5)/3 = 3, S_y = (2+4+6)/3 = 4. Tehát S(3, 4)."
          }
        ]
      },
      {
        id: "g-line-equation",
        title: "Egyenes",
        level: 1,
        requirementsIntermediate: "Tudjon egyeneseket ábrázolni meredekségük és tengelymetszetük alapján.",
        requirementsAdvanced: "Írja fel az egyenes egyenletét különböző adatokból (pont és normálvektor, két pont, irányvektor).",
        lessonIntermediate: "### Egyenes ábrázolása\\\\n\\\\nAz $y = mx + b$ alakú egyenesnél $m$ a meredekség (iránytangens), $b$ pedig az y-tengelymetszet.",
        lessonAdvanced: "### Az egyenes egyenletei\\\\n\\\\n- Normálvektoros alak: $A(x-x_0) + B(y-y_0) = 0 \\\\Rightarrow Ax + By = Ax_0 + By_0$\\\\n- Iránytényezős alak: $y - y_0 = m(x - x_0)$",
        quizIntermediate: [
          {
            id: "q-lineeq-i1",
            question: "Hol metszi az y-tengelyt az $y = 2x - 5$ egyenes?",
            options: ["(0, 5)", "(0, -5)", "(2, 0)", "(0, 2)"],
            correctAnswer: 1,
            explanation: "x = 0 helyettesítéssel y = -5, azaz a (0, -5) pontban."
          }
        ],
        quizAdvanced: [
          {
            id: "q-lineeq-a1",
            question: "Mi a P(1, 2) ponton átmenő, $\\\\vec{n}(3, 4)$ normálvektorú egyenes egyenlete?",
            options: ["$3x + 4y = 11$", "$3x + 4y = 10$", "$4x - 3y = -2$", "$3x - 4y = -5$"],
            correctAnswer: 0,
            explanation: "3(x - 1) + 4(y - 2) = 0 => 3x + 4y - 3 - 8 = 0 => 3x + 4y = 11."
          }
        ]
      },
      {
        id: "g-circle-equation",
        title: "Kör",
        level: 1,
        requirementsIntermediate: "Ismerje a kör egyenletét.",
        requirementsAdvanced: "Tudja meghatározni kör és egyenes metszéspontját és a kör érintőjének egyenletét.",
        lessonIntermediate: "### A kör egyenlete\\\\n\\\\nA $C(u, v)$ középpontú, $r$ sugarú kör egyenlete a síkban:\\\\n$$(x-u)^2 + (y-v)^2 = r^2$$",
        lessonAdvanced: "### Kör és egyenes metszéspontja\\\\n\\\\nAz egyenes egyenletéből kifejezzük az egyik változót, behelyettesítjük a kör egyenletébe, és megoldjuk a kapott másodfokú egyenletet.",
        quizIntermediate: [
          {
            id: "q-circeq-i1",
            question: "Mi a sugara az $(x - 1)^2 + (y + 3)^2 = 9$ körnek?",
            options: ["9", "3", "1", "-3"],
            correctAnswer: 1,
            explanation: "r^2 = 9, így a sugár r = 3."
          }
        ],
        quizAdvanced: [
          {
            id: "q-circeq-a1",
            question: "Hány közös pontja lehet egy körnek és egy egyenesnek a síkban?",
            options: ["Pontosan 1", "0, 1 vagy 2", "Végtelen sok", "Mindig 2"],
            correctAnswer: 1,
            explanation: "Az egyenes elkerülheti a kört (0), érintheti (1), vagy szelheti (2)."
          }
        ]
      },
      {
        id: "g-parabola-equation",
        title: "Parabola",
        level: 1,
        requirementsIntermediate: "Ismerje a parabola másodfokú függvényként való ábrázolását.",
        requirementsAdvanced: "Levezesse a parabola $x^2 = 2py$ alakú egyenletét fókusz és vezéregyenes segítségével.",
        lessonIntermediate: "### Parabola ábrázolása\\\\n\\\\nAz $y = ax^2 + bx + c$ másodfokú függvény grafikonja egy függőleges tengelyű parabola, melynek csúcsa teljes négyzetté alakítással határozható meg.",
        lessonAdvanced: "### Parabola mint kúpszelet\\\\n\\\\nA parabola pontjainak távolsága az $F(0, p/2)$ fókusztól megegyezik az $y = -p/2$ vezéregyenestől vett távolsággal. Ebből származtatható az $x^2 = 2py$ egyenlet.",
        quizIntermediate: [
          {
            id: "q-parbeq-i1",
            question: "Melyik irányba nyitott az $y = -x^2 + 4$ parabola?",
            options: ["Felfelé", "Lefelé", "Jobbra", "Balra"],
            correctAnswer: 1,
            explanation: "Mivel a főegyüttható negatív (-1), a parabola lefelé nyitott."
          }
        ],
        quizAdvanced: [
          {
            id: "q-parbeq-a1",
            question: "Hol helyezkedik el a fókuszpontja az $x^2 = 8y$ parabolának?",
            options: ["F(0, 2)", "F(2, 0)", "F(0, 4)", "F(0, 8)"],
            correctAnswer: 0,
            explanation: "2p = 8 => p = 4. A fókusz koordinátája F(0, p/2) = F(0, 2)."
          }
        ]
      },
      {
        id: "g-perimeter-area",
        title: "Kerület, terület",
        level: 0,
        requirementsIntermediate: "Számítsa ki sokszögek, kör, körcikk kerületét és területét.",
        requirementsAdvanced: "Bizonyítsa a háromszög területképleteit, köztük a Heron-képletet.",
        lessonIntermediate: "### Kerület és Terület\\\\n\\\\n- **Kör:** $K = 2r\\\\pi$, $T = r^2\\\\pi$\\\\n- **Háromszög:** $T = \\\\frac{a \\\\cdot m_a}{2}$ vagy $T = \\\\frac{ab\\\\sin\\\\gamma}{2}$",
        lessonAdvanced: "### Heron-képlet\\\\n\\\\n$$T = \\\\sqrt{s(s-a)(s-b)(s-c)}$$\\\\nahol $s = (a+b+c)/2$ a kerület fele.",
        quizIntermediate: [
          {
            id: "q-perarea-i1",
            question: "Mennyi egy 5 cm sugarú kör kerülete?",
            options: ["5\\pi cm", "10\\pi cm", "25\\pi cm", "20 cm"],
            correctAnswer: 1,
            explanation: "K = 2 * r * \\pi = 2 * 5 * \\pi = 10\\pi cm."
          }
        ],
        quizAdvanced: [
          {
            id: "q-perarea-a1",
            question: "Mennyi egy 3 cm, 4 cm, 5 cm oldalú háromszög területe?",
            options: ["6 cm²", "12 cm²", "10 cm²", "7.5 cm²"],
            correctAnswer: 0,
            explanation: "Derékszögű háromszög (3^2+4^2=5^2), így T = a*b/2 = 3*4/2 = 6 cm²."
          }
        ]
      },
      {
        id: "g-surface-volume",
        title: "Felszín, térfogat",
        level: 0,
        requirementsIntermediate: "Számítsa ki hasábok, gúlák, henger, kúp, gömb felszínét és térfogatát egyszerűbb esetekben.",
        requirementsAdvanced: "Bizonyítsa be a csonkagúla és csonkakúp térfogatképleteit.",
        lessonIntermediate: "### Testek metrikus adatai\\\\n\\\\n- **Henger:** $V = \\\\pi r^2 m$, $A = 2\\\\pi r^2 + 2\\\\pi r m$\\\\n- **Gömb:** $V = \\\\frac{4}{3}\\\\pi r^3$, $A = 4\\\\pi r^2$",
        lessonAdvanced: "### Csonkakúp térfogata\\\\n\\\\n$$V = \\\\frac{m\\\\pi}{3} \\\\cdot (R^2 + Rr + r^2)$$",
        quizIntermediate: [
          {
            id: "q-surfvol-i1",
            question: "Mennyi egy 2 cm oldalhosszúságú kocka térfogata?",
            options: ["4 cm³", "8 cm³", "12 cm³", "6 cm³"],
            correctAnswer: 1,
            explanation: "V = a^3 = 2^3 = 8 cm³."
          }
        ],
        quizAdvanced: [
          {
            id: "q-surfvol-a1",
            question: "Melyik test térfogata számítható a $V = A_c \\\\cdot m / 3$ képlettel (ahol $A_c$ az alaplap területe)?",
            options: ["Hasáb", "Gúla", "Henger", "Kocka"],
            correctAnswer: 1,
            explanation: "A gúla és a kúp térfogata az alaplap területének és a magasság szorzatának harmada."
          }
        ]
      }
    ]
  },
  {
    id: "g-stats-prob",
    title: "Valószínűség-számítás, statisztika",
    icon: "📊",
    color: "from-pink-500 to-rose-600",
    subtopics: [
      {
        id: "g-descriptive-stats",
        title: "Leíró statisztika",
        level: 0,
        requirementsIntermediate: "Rendszerezzen adatokat, számítson átlagot, móduszt, mediánt.",
        requirementsAdvanced: "Ismerje a súlyozott számtani közepet, átlagos abszolút eltérést és a szórást.",
        lessonIntermediate: "### Statisztikai mutatók\\\\n\\\\n- **Átlag:** számtani közép.\\\\n- **Módusz:** leggyakoribb érték.\\\\n- **Medián:** nagyság szerinti rendezés után a középső érték.",
        lessonAdvanced: "### Szórás képlete\\\\n\\\\n$$\\\\sigma = \\\\sqrt{\\\\frac{\\\\sum (x_i - \\\\bar{x})^2}{n}}$$",
        quizIntermediate: [
          {
            id: "q-dstat-i1",
            question: "Mennyi az 1, 3, 5, 7, 9 adatok mediánja?",
            options: ["5", "4.5", "9", "25"],
            correctAnswer: 0,
            explanation: "Mivel az adatok rendezve vannak, a középső elem az 5."
          }
        ],
        quizAdvanced: [
          {
            id: "q-dstat-a1",
            question: "Mit mutat meg a szórás?",
            options: [
              "A legnagyobb és legkisebb elem távolságát.",
              "Az adatok átlagtól való átlagos négyzetes eltérését.",
              "A leggyakoribb elemet.",
              "Az adatok összegét."
            ],
            correctAnswer: 1,
            explanation: "A szórás az adathalmaz értékeinek az átlagtól való eltérését (ingadozását) mutatja meg."
          }
        ]
      },
      {
        id: "g-data-representation",
        title: "Statisztikai adatok gyűjtése, rendszerezése, különböző ábrázolásai",
        level: 1,
        requirementsIntermediate: "Tudjon kördiagramot és oszlopdiagramot készíteni és olvasni.",
        requirementsAdvanced: "Készítsen és hasonlítson össze adathalmazokat sodrófa (box-plot) diagramok alapján.",
        lessonIntermediate: "### Adatok ábrázolása\\\\n\\\\nAz adatok vizuális bemutatására szolgálnak a diagramok. A kördiagram az arányokat mutatja meg (összességében 100%), míg az oszlopdiagram az értékek nagyságát hasonlítja össze.",
        lessonAdvanced: "### Box-plot (Sodrófa) diagram\\\\n\\\\nAz adatok eloszlását szemlélteti az 5 fontos érték alapján: minimum, alsó kvartilis (Q1), medián (Q2), felső kvartilis (Q3), maximum.",
        quizIntermediate: [
          {
            id: "q-datarep-i1",
            question: "Melyik diagramtípus a legalkalmasabb egy egész részarányainak (pl. költségvetés megoszlás) szemléltetésére?",
            options: ["Oszlopdiagram", "Kördiagram", "Vonaldiagram", "Sodrófa diagram"],
            correctAnswer: 1,
            explanation: "A kördiagram a részek egészhez viszonyított arányát szemlélteti a legjobban."
          }
        ],
        quizAdvanced: [
          {
            id: "q-datarep-a1",
            question: "Mit ábrázol a box-plot (sodrófa) diagram 'doboz' része?",
            options: [
              "A teljes terjedelmet (minimumtól maximumig).",
              "Az alsó és felső kvartilis közötti tartományt (Q1-től Q3-ig).",
              "Csak a mediánt.",
              "Az átlagos eltérést."
            ],
            correctAnswer: 1,
            explanation: "A doboz a középső 50%-ot tartalmazza az alsó kvartilistől (Q1) a felső kvartilisig (Q3)."
          }
        ]
      },
      {
        id: "g-large-datasets",
        title: "Nagy adathalmazok jellemzői, statisztikai mutatók",
        level: 1,
        requirementsIntermediate: "Értelmezzen egyszerűbb statisztikai adatokat táblázatokból.",
        requirementsAdvanced: "Értse a súlyozott átlagot és a relatív gyakoriság eloszlását nagy adathalmazokban.",
        lessonIntermediate: "### Nagy adathalmazok statisztikája\\\\n\\\\nNagyobb adatsoroknál osztályba sorolást alkalmazunk, és gyakorisági táblázatokat készítünk a könnyebb feldolgozás érdekében.",
        lessonAdvanced: "### Súlyozott átlag számítása\\\\n\\\\nHa a tagok különböző súlyokkal bírnak:\\\\n$$\\\\bar{x}_w = \\\\frac{\\\\sum w_i x_i}{\\\\sum w_i}$$",
        quizIntermediate: [
          {
            id: "q-larged-i1",
            question: "Hogyan számítható ki a relatív gyakoriság?",
            options: [
              "A gyakoriság és az összes elemszám hányadosaként.",
              "Az adatok összeadásával.",
              "A szórás négyzetével.",
              "Nem számítható ki nagy adatokra."
            ],
            correctAnswer: 0,
            explanation: "Relatív gyakoriság = gyakoriság / összes elemszám."
          }
        ],
        quizAdvanced: [
          {
            id: "q-larged-a1",
            question: "Mennyi a súlyozott átlaga az 5 (súly: 2) és 10 (súly: 3) jegyeknek?",
            options: ["7.5", "8", "7", "8.5"],
            correctAnswer: 1,
            explanation: "Súlyozott átlag = (5*2 + 10*3) / (2+3) = (10 + 30) / 5 = 40 / 5 = 8."
          }
        ]
      },
      {
        id: "g-probability",
        title: "A valószínűség-számítás elemei",
        level: 0,
        requirementsIntermediate: "Ismerje a klasszikus valószínűségi modellt, esemény, eseménytér fogalmát.",
        requirementsAdvanced: "Használja a feltételes valószínűséget, binomiális és hipergeometriai eloszlást.",
        lessonIntermediate: "### Klasszikus valószínűség\\\\n\\\\n$$P(A) = \\\\frac{\\\\text{kedvező esetek}}{\\\\text{összes esetek}} = \\\\frac{k}{n}$$\\\\nA valószínűség értéke mindig 0 és 1 közé esik.",
        lessonAdvanced: "### Feltételes valószínűség\\\\n\\\\n$$P(A \\\\mid B) = \\\\frac{P(A \\\\cap B)}{P(B)}$$",
        quizIntermediate: [
          {
            id: "q-prob-i1",
            question: "Szabályos dobókockával dobva mennyi a valószínűsége, hogy 5-nél nagyobb számot dobunk?",
            options: ["1/6", "1/3", "1/2", "5/6"],
            correctAnswer: 0,
            explanation: "Csak a 6-os kedvező (1 eset), az összes eset 6. P = 1/6."
          }
        ],
        quizAdvanced: [
          {
            id: "q-prob-a1",
            question: "Egy dobozban 3 piros és 2 kék golyó van. Kihúzunk kettőt visszatevés nélkül. Mennyi az esélye, hogy mindkét golyó kék?",
            options: ["1/10", "4/25", "1/5", "2/5"],
            correctAnswer: 0,
            explanation: "P(1. kék) = 2/5. P(2. kék | 1. kék) = 1/4. Összesen: 2/5 * 1/4 = 2/20 = 1/10."
          }
        ]
      }
    ]
  }
];
"""

with open(output_path, "w", encoding="utf-8") as f:
    f.write(content)

print("graduationContent.ts successfully generated!")
