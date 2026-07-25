import { GraduationQuizQuestion } from '@/data/graduationContent';

// ============================================================================
// TOPIC 2: Számelmélet, algebra
// ============================================================================

// --- 1. Alapműveletek (g-basic-operations) ---
export const quizBasicOpsEasy: GraduationQuizQuestion[] = [
  { id: "q-bo-e-1", question: "Mennyi $15 - 3 \\cdot (4 - 7)$ értéke?", options: ["24", "36", "-6", "6"], correctAnswer: 0, explanation: "$4 - 7 = -3 \\Rightarrow -3 \\cdot (-3) = +9 \\Rightarrow 15 + 9 = 24$." },
  { id: "q-bo-e-2", question: "Mennyi $-8 + (-5) \\cdot (-2)$?", options: ["2", "-18", "26", "-26"], correctAnswer: 0, explanation: "$-5 \\cdot (-2) = +10 \\Rightarrow -8 + 10 = 2$." },
  { id: "q-bo-e-3", question: "Mennyi $\\frac{3}{4} + \\frac{1}{2}$ értéke?", options: ["$\\frac{5}{4}$", "$\\frac{4}{6}$", "$\\frac{1}{2}$", "$\\frac{3}{8}$"], correctAnswer: 0, explanation: "$\\frac{3}{4} + \\frac{2}{4} = \\frac{5}{4}$." },
  { id: "q-bo-e-4", question: "Mennyi $\\frac{2}{3} \\cdot \\frac{9}{4}$ egyszerűsített alakja?", options: ["$\\frac{3}{2}$", "$\\frac{18}{12}$", "$\\frac{6}{7}$", "$\\frac{4}{3}$"], correctAnswer: 0, explanation: "$\\frac{2 \\cdot 9}{3 \\cdot 4} = \\frac{18}{12} = \\frac{3}{2}$." },
  { id: "q-bo-e-5", question: "Mennyi $\\frac{4}{5} : \\frac{2}{3}$ értéke?", options: ["$\\frac{6}{5}$", "$\\frac{8}{15}$", "$\\frac{2}{5}$", "$\\frac{12}{15}$"], correctAnswer: 0, explanation: "$\\frac{4}{5} \\cdot \\frac{3}{2} = \\frac{12}{10} = \\frac{6}{5}$." },
  { id: "q-bo-e-6", question: "Mennyi $|-15| + |7|$ értéke?", options: ["22", "8", "-8", "-22"], correctAnswer: 0, explanation: "$15 + 7 = 22$." },
  { id: "q-bo-e-7", question: "Mennyi $2^3 \\cdot 3^2$ értéke?", options: ["72", "36", "108", "54"], correctAnswer: 0, explanation: "$8 \\cdot 9 = 72$." },
  { id: "q-bo-e-8", question: "Két negatív szám szorzata milyen előjelű?", options: ["Pozitív", "Negatív", "Nulla", "Változó"], correctAnswer: 0, explanation: "$(-)\\cdot(-) = +$." },
  { id: "q-bo-e-9", question: "Mennyi $100 : 4 \\cdot 5$ értéke (balról jobbra haladva)?", options: ["125", "5", "20", "500"], correctAnswer: 0, explanation: "$100 : 4 = 25 \\Rightarrow 25 \\cdot 5 = 125$." },
  { id: "q-bo-e-10", question: "Mennyi $0,4 \\cdot 0,2$ értéke?", options: ["0.08", "0.8", "0.008", "8.0"], correctAnswer: 0, explanation: "$4 \\cdot 2 = 8$, két tizedesjegy: $0,08$." }
];

export const quizBasicOpsMedium: GraduationQuizQuestion[] = [
  { id: "q-bo-m-1", question: "Számítsd ki: $A = 24 - 3 \\cdot [12 - (5 - 8)^2]$!", options: ["15", "33", "27", "9"], correctAnswer: 0, explanation: "$5-8 = -3 \\Rightarrow (-3)^2 = 9 \\Rightarrow 12-9 = 3 \\Rightarrow 24 - 3(3) = 15$." },
  { id: "q-bo-m-2", question: "Mennyi a $\\frac{1}{2} - \\frac{1}{3} + \\frac{1}{6}$ kifejezés értéke?", options: ["$\\frac{1}{3}$", "$\\frac{1}{6}$", "$\\frac{2}{3}$", "0"], correctAnswer: 0, explanation: "$\\frac{3}{6} - \\frac{2}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3}$." },
  { id: "q-bo-m-3", question: "Kerekítsd a 23.4867 tizedes törtet századokra!", options: ["23.49", "23.48", "23.50", "23.5"], correctAnswer: 0, explanation: "A századok után 6-os áll, felfelé kerekítünk: 23.49." },
  { id: "q-bo-m-4", question: "Mennyi $1,25$ töratalakban legegyszerűbb formában?", options: ["$\\frac{5}{4}$", "$\\frac{125}{10}$", "$\\frac{4}{5}$", "$\\frac{5}{2}$"], correctAnswer: 0, explanation: "$1,25 = 125/100 = 5/4$." },
  { id: "q-bo-m-5", question: "Mennyi a $(-2)^4$ és $-2^4$ értékeinek különbsége: $(-2)^4 - (-2^4)$?", options: ["32", "0", "-32", "16"], correctAnswer: 0, explanation: "$(-2)^4 = 16$, $-2^4 = -16 \\Rightarrow 16 - (-16) = 32$." },
  { id: "q-bo-m-6", question: "Mennyi a $\\sqrt{(-5)^2}$ értéke?", options: ["5", "-5", "25", "±5"], correctAnswer: 0, explanation: "$\\sqrt{(-5)^2} = \\sqrt{25} = 5$." },
  { id: "q-bo-m-7", question: "Számítsd ki: $\\left(\\frac{2}{3}\\right)^{-2}$ értéke!", options: ["$\\frac{9}{4}$", "$\\frac{4}{9}$", "$-\\frac{4}{9}$", "$-\\frac{9}{4}$"], correctAnswer: 0, explanation: "$\\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4}$." },
  { id: "q-bo-m-8", question: "Mennyi a $120$ prímtényezős felbontása?", options: ["$2^3 \\cdot 3 \\cdot 5$", "$2^2 \\cdot 3^2 \\cdot 5$", "$2 \\cdot 60$", "$4 \\cdot 30$"], correctAnswer: 0, explanation: "$120 = 8 \\cdot 15 = 2^3 \\cdot 3 \\cdot 5$." },
  { id: "q-bo-m-9", question: "Mennyi $0,\\dot{3} = 0,333\\dots$ tört alakban?", options: ["$\\frac{1}{3}$", "$\\frac{3}{10}$", "$\\frac{1}{4}$", "$\\frac{33}{100}$"], correctAnswer: 0, explanation: "$0,\\dot{3} = 1/3$." },
  { id: "q-bo-m-10", question: "Mennyi $10^5 \\cdot 10^{-3} : 10^4$ értéke?", options: ["$10^{-2} = 0.01$", "$10^6$", "$10^2$", "$10^1$"], correctAnswer: 0, explanation: "$10^{5-3-4} = 10^{-2} = 0,01$." }
];

export const quizBasicOpsHard: GraduationQuizQuestion[] = [
  { id: "q-bo-h-1", question: "Írd át a végtelen szakaszos $0,1\\dot{6} = 0,1666\\dots$ tizedestörtet törtté!", options: ["$\\frac{1}{6}$", "$\\frac{16}{100}$", "$\\frac{1}{5}$", "$\\frac{16}{99}$"], correctAnswer: 0, explanation: "Legyen $x = 0,166\\dots \\Rightarrow 100x = 16,66\\dots, 10x = 1,66\\dots \\Rightarrow 90x = 15 \\Rightarrow x = 15/90 = 1/6$." },
  { id: "q-bo-h-2", question: "Számítsd ki: $\\sqrt{12} + \\sqrt{27} - \\sqrt{48}$ pontos értékét!", options: ["$\\sqrt{3}$", "$2\\sqrt{3}$", "$5\\sqrt{3}$", "0"], correctAnswer: 0, explanation: "$2\\sqrt{3} + 3\\sqrt{3} - 4\\sqrt{3} = \\sqrt{3}$." },
  { id: "q-bo-h-3", question: "Gyökmentesítsd a $\\frac{6}{\\sqrt{3}}$ tört nevezőjét!", options: ["$2\\sqrt{3}$", "$3\\sqrt{3}$", "$\\sqrt{3}$", "6"], correctAnswer: 0, explanation: "$\\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$." },
  { id: "q-bo-h-4", question: "Gyökmentesítsd a $\\frac{2}{\\sqrt{5} - 1}$ nevezőjét!", options: ["$\\frac{\\sqrt{5} + 1}{2}$", "$\\sqrt{5} + 1$", "$\\sqrt{5} - 1$", "2"], correctAnswer: 0, explanation: "$\\frac{2(\\sqrt{5}+1)}{5-1} = \\frac{2(\\sqrt{5}+1)}{4} = \\frac{\\sqrt{5}+1}{2}$." },
  { id: "q-bo-h-5", question: "Mennyi $(2\\sqrt{2} - 3)^2$ pontos értéke?", options: ["$17 - 12\\sqrt{2}$", "$17 + 12\\sqrt{2}$", "-1", "17"], correctAnswer: 0, explanation: "$(2\\sqrt{2})^2 - 2(2\\sqrt{2})(3) + 9 = 8 - 12\\sqrt{2} + 9 = 17 - 12\\sqrt{2}$." },
  { id: "q-bo-h-6", question: "Számítsd ki: $\\log_2 16 + \\log_3 27 - \\lg 100$!", options: ["5", "4", "3", "7"], correctAnswer: 0, explanation: "$4 + 3 - 2 = 5$." },
  { id: "q-bo-h-7", question: "Mennyi $\\sqrt[3]{8^2}$ értéke?", options: ["4", "8", "2", "16"], correctAnswer: 0, explanation: "$\\sqrt[3]{64} = 4$ vagy $(8^{1/3})^2 = 2^2 = 4$." },
  { id: "q-bo-h-8", question: "Melyik állítás IGAZ az irracionális számokra?", options: ["Végtelen nem szakaszos tizedes tört alakjuk van", "Felírhatók p/q alakban", "Véges tizedes törtek", "Nincs négyzetgyökük"], correctAnswer: 0, explanation: "Az irracionális számok tizedestört alakja végtelen és nem szakaszos." },
  { id: "q-bo-h-9", question: "Számítsd ki: $(16)^{-3/4}$ értéke!", options: ["$\\frac{1}{8}$", "$\\frac{1}{16}$", "8", "-8"], correctAnswer: 0, explanation: "$(16^{1/4})^{-3} = 2^{-3} = \\frac{1}{8}$." },
  { id: "q-bo-h-10", question: "Mennyi $a = 2^{100}$ és $b = 3^{75}$ nagyságrendi kapcsolata?", options: ["$a < b$ (mivel $2^4 = 16 < 3^3 = 27$ a 25-ödik hatványon)", "$a > b$", "$a = b$", "Nem eldönthető"], correctAnswer: 0, explanation: "$2^{100} = (2^4)^{25} = 16^{25}$, $3^{75} = (3^3)^{25} = 27^{25} \\Rightarrow a < b$." }
];

// --- 2. Oszthatóság (g-divisibility) ---
export const quizDivisibilityEasy: GraduationQuizQuestion[] = [
  { id: "q-di-e-1", question: "Mikor osztható egy egész szám 2-vel?", options: ["Ha a legutolsó számjegye páros (0, 2, 4, 6, 8)", "Ha a számjegyek összege osztható 2-vel", "Ha 5-re végződik", "Ha páratlan"], correctAnswer: 0, explanation: "A 2-vel való oszthatóság feltétele a páros végződés." },
  { id: "q-di-e-2", question: "Mikor osztható egy egész szám 3-mal?", options: ["Ha a számjegyeinek összege osztható 3-mal", "Ha 3-ra végződik", "Ha páros", "Ha 0-ra végződik"], correctAnswer: 0, explanation: "A számjegyek összegének kell 3-mal oszthatónak lennie." },
  { id: "q-di-e-3", question: "Mikor osztható egy szám 5-tel?", options: ["Ha az utolsó számjegye 0 vagy 5", "Ha a számjegyek összege 5", "Ha páros", "Ha 5-tel kezdődik"], correctAnswer: 0, explanation: "Az utolsó jegy 0 vagy 5." },
  { id: "q-di-e-4", question: "Mikor osztható egy szám 10-zel?", options: ["Ha az utolsó számjegye 0", "Ha 5-re végződik", "Ha páros", "Ha 10-zel kezdődik"], correctAnswer: 0, explanation: "A 10-zel való oszthatóság feltétele a 0 végződés." },
  { id: "q-di-e-5", question: "Melyik szám prímszám az alábbiak közül?", options: ["13", "15", "9", "1"], correctAnswer: 0, explanation: "A 13 csak 1-gyel és 13-mal osztható." },
  { id: "q-di-e-6", question: "Melyik szám összetett szám az alábbiak közül?", options: ["9", "2", "3", "7"], correctAnswer: 0, explanation: "A 9 osztói: 1, 3, 9, így összetett szám." },
  { id: "q-di-e-7", question: "Mi a legkisebb prímszám?", options: ["2", "1", "0", "3"], correctAnswer: 0, explanation: "A 2 az egyetlen páros és egyben a legkisebb prímszám." },
  { id: "q-di-e-8", question: "Osztható-e a 1245 szám 3-mal?", options: ["Igen, mert a számjegyek összege (12) osztható 3-mal", "Nem, mert 5-re végződik", "Nem, mert páratlan", "Nem eldönthető"], correctAnswer: 0, explanation: "$1 + 2 + 4 + 5 = 12$, ami osztható 3-mal." },
  { id: "q-di-e-9", question: "Mi a 12 és 18 legnagyobb közös osztója: $(12, 18)$?", options: ["6", "36", "3", "2"], correctAnswer: 0, explanation: "A legnagyobb közös osztó a 6." },
  { id: "q-di-e-10", question: "Mi a 4 és 6 legkisebb közös többszöröse: $[4, 6]$?", options: ["12", "24", "2", "8"], correctAnswer: 0, explanation: "A legkisebb közös többszörös a 12." }
];

export const quizDivisibilityMedium: GraduationQuizQuestion[] = [
  { id: "q-di-m-1", question: "Mikor osztható egy szám 4-gyel?", options: ["Ha az utolsó két számjegyéből képzett szám osztható 4-gyel", "Ha 4-re végződik", "Ha a számjegyek összege osztható 4-gyel", "Ha osztható 2-vel"], correctAnswer: 0, explanation: "Az utolsó 2 számjegy oszthatósága dönt." },
  { id: "q-di-m-2", question: "Mikor osztható egy szám 9-cel?", options: ["Ha a számjegyeinek összege osztható 9-cel", "Ha 9-re végződik", "Ha 3-mal osztható", "Ha páros"], correctAnswer: 0, explanation: "A számjegyek összege osztható 9-cel." },
  { id: "q-di-m-3", question: "Mikor osztható egy szám 6-tal?", options: ["Ha 2-vel ÉS 3-mal is osztható egyszerre", "Ha 6-ra végződik", "Ha a számjegyek összege 6", "Ha 3-mal osztható"], correctAnswer: 0, explanation: "A 6 = 2 * 3 relatív prímek, így mindkettővel oszthatónak kell lennie." },
  { id: "q-di-m-4", question: "Milyen $x$ számjegy állhat a $457x$ végén, hogy osztható legyen 4-gyel?", options: ["2 és 6", "0 és 4", "2, 4, 6", "0, 2, 4, 6, 8"], correctAnswer: 0, explanation: "Az utolsó két jegy $7x$: 72 és 76 osztható 4-gyel ($x = 2, 6$)." },
  { id: "q-di-m-5", question: "Mennyi $a = 2^3 \\cdot 3^2 \\cdot 5$ és $b = 2^2 \\cdot 3^3 \\cdot 7$ legnagyobb közös osztója?", options: ["$2^2 \\cdot 3^2 = 36$", "$2^3 \\cdot 3^3 = 216$", "6", "180"], correctAnswer: 0, explanation: "A legkisebb kitevőjű közös prímtényezők szorzata: $2^2 \\cdot 3^2 = 36$." },
  { id: "q-di-m-6", question: "Mennyi $a = 12$ és $b = 15$ legkisebb közös többszöröse?", options: ["60", "180", "3", "30"], correctAnswer: 0, explanation: "$12 = 2^2 \\cdot 3$, $15 = 3 \\cdot 5 \\Rightarrow [12, 15] = 2^2 \\cdot 3 \\cdot 5 = 60$." },
  { id: "q-di-m-7", question: "Hány pozitív osztója van a $72$ számnak ($72 = 2^3 \\cdot 3^2$)?", options: ["12", "6", "8", "9"], correctAnswer: 0, explanation: "Osztók száma: $(3+1)(2+1) = 4 \\cdot 3 = 12$." },
  { id: "q-di-m-8", question: "Igaz-e a két szám szorzatára vonatkozó összefüggés: $(a, b) \\cdot [a, b] = a \\cdot b$?", options: ["Igaz minden pozitív egész a, b-re", "Hamis", "Csak prímszámokra igaz", "Csak ha a = b"], correctAnswer: 0, explanation: "A legnagyobb közös osztó és legkisebb közös többszörös szorzata az eredeti számok szorzata." },
  { id: "q-di-m-9", question: "Mit jelent az, hogy két szám relatív prím?", options: ["Legnagyobb közös osztójuk 1", "Mindkét szám prímszám", "Nincs közös többszörösük", "Különbségük 1"], correctAnswer: 0, explanation: "Relatív prímek: $(a, b) = 1$." },
  { id: "q-di-m-10", question: "Milyen maradékot adhat egy egész szám négyzete 3-mal osztva?", options: ["0 vagy 1", "0, 1 vagy 2", "Csak 1", "Csak 0"], correctAnswer: 0, explanation: "$(3k)^2 = 9k^2$ (0), $(3k \\pm 1)^2 = 9k^2 \\pm 6k + 1$ (1)." }
];

export const quizDivisibilityHard: GraduationQuizQuestion[] = [
  { id: "q-di-h-1", question: "Mikor osztható egy szám 11-gyel?", options: ["Ha a váltakozó előjelű számjegyösszeg osztható 11-gyel", "Ha az utolsó jegy 11", "Ha osztható 1-gyel", "Ha páros"], correctAnswer: 0, explanation: "Váltakozó előjelű számjegyösszeg $a_0 - a_1 + a_2 - a_3 \\dots$ osztható 11-gyel." },
  { id: "q-di-h-2", question: "Milyen maradekot ad $2^{100}$ 3-mal osztva (Euler-Fermat / kongruencia)?", options: ["1", "2", "0", "Nem határozható meg"], correctAnswer: 0, explanation: "$2 \\equiv -1 \\pmod 3 \\Rightarrow 2^{100} \\equiv (-1)^{100} = 1 \\pmod 3$." },
  { id: "q-di-h-3", question: "Hány 0-ra végződik a $100!$ (100 faktoriális) értéke?", options: ["24", "20", "10", "25"], correctAnswer: 0, explanation: "Legrandre-formula: $\\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor = 20 + 4 = 24$ darab 0." },
  { id: "q-di-h-4", question: "Mit mond ki a Kis Fermat-tétel?", options: ["Ha p prím és a nem osztható p-vel, akkor $a^{p-1} \\equiv 1 \\pmod p$", "Minden prím páratlan", "A prímek száma véges", "$a^2 + b^2 = c^2$"], correctAnswer: 0, explanation: "Ez a Kis Fermat-tétel." },
  { id: "q-di-h-5", question: "Hány pozitív egész $n \\le 100$ létezik, ami osztható 2-vel vagy 3-mal?", options: ["67", "50", "33", "83"], correctAnswer: 0, explanation: "Szita-elv: $\\lfloor 100/2 \\rfloor + \\lfloor 100/3 \\rfloor - \\lfloor 100/6 \\rfloor = 50 + 33 - 16 = 67$." },
  { id: "q-di-h-6", question: "Mennyi az Euler-féle $\\varphi(12)$ függvény értéke (12-nél kisebb relatív prímek száma)?", options: ["4 (1, 5, 7, 11)", "6", "2", "5"], correctAnswer: 0, explanation: "$\\varphi(12) = 12(1-1/2)(1-1/3) = 12 \\cdot 1/2 \\cdot 2/3 = 4$." },
  { id: "q-di-h-7", question: "Bizonyítható-e, hogy két egymást követő egész szám mindig relatív prím?", options: ["Igen, mert ha d osztaná n-et és n+1-et, osztaná a különbségüket (1-et) is", "Nem igaz", "Csak prímekre igaz", "Csak páratlanokra"], correctAnswer: 0, explanation: "$(n, n+1) = 1$ minden n-re." },
  { id: "q-di-h-8", question: "Mi az Euklideszi algoritmus célja?", options: ["Két szám legnagyobb közös osztójának hatékony kiszámítása terjedelmes prímtényezőzés nélkül", "Prímszámok keresése", "Hatványozás", "Gyökvonás"], correctAnswer: 0, explanation: "Az Euklideszi algoritmus a legnagyobb közös osztót adja meg láncolt osztásokkal." },
  { id: "q-di-h-9", question: "Milyen n egészre osztható $n^3 - n$ 6-tal?", options: ["Minden n egész számra", "Csak páros n-re", "Csak prím n-re", "Soha"], correctAnswer: 0, explanation: "$n^3 - n = (n-1)n(n+1)$ 3 egymást követő egész szám szorzata, ami mindig osztható 2-vel és 3-mal is, így 6-tal is." },
  { id: "q-di-h-10", question: "Melyik sejtés állítja, hogy minden 2-nél nagyobb páros egész szám felírható két prímszám összegeként?", options: ["Goldbach-sejtés", "Riemann-hipotézis", "Collatz-sejtés", "Fermat-sejtés"], correctAnswer: 0, explanation: "Ez a híres Goldbach-sejtés." }
];

// --- 3. Egyenletek és egyenletrendszerek (g-quadratic-equations, g-linear-equations, g-exponential-equations, stb.) ---
export const quizEquationsEasy: GraduationQuizQuestion[] = [
  { id: "q-eq-e-1", question: "Oldd meg a $3x - 6 = 12$ elsőfokú egyenletet!", options: ["x = 6", "x = 4", "x = 2", "x = 18"], correctAnswer: 0, explanation: "$3x = 18 \\Rightarrow x = 6$." },
  { id: "q-eq-e-2", question: "Mennyi az $x^2 = 25$ egyenlet megoldása a valós számok körében?", options: ["x = 5 és x = -5", "x = 5", "x = 25", "Nincs megoldás"], correctAnswer: 0, explanation: "Két valós gyöke van: +5 és -5." },
  { id: "q-eq-e-3", question: "Mi a gyökök száma a diszkrimináns alapján, ha $D > 0$?", options: ["2 különböző valós gyök", "1 valós gyök", "0 valós gyök", "Végtelen gyök"], correctAnswer: 0, explanation: "Ha $D > 0$, akkor 2 különböző valós gyök létezik." },
  { id: "q-eq-e-4", question: "Oldd meg a $2^x = 16$ exponenciális egyenletet!", options: ["x = 4", "x = 8", "x = 3", "x = 2"], correctAnswer: 0, explanation: "$2^4 = 16 \\Rightarrow x = 4$." },
  { id: "q-eq-e-5", question: "Oldd meg a $\\log_3 x = 2$ logaritmusos egyenletet!", options: ["x = 9", "x = 6", "x = 8", "x = 5"], correctAnswer: 0, explanation: "$x = 3^2 = 9$." },
  { id: "q-eq-e-6", question: "Oldd meg az $|x| = 7$ abszolútértékes egyenletet!", options: ["x = 7 vagy x = -7", "x = 7", "x = -7", "x = 0"], correctAnswer: 0, explanation: "Az abszolútérték geometrikusan a nullától való távolság." },
  { id: "q-eq-e-7", question: "Mi a másodfokú egyenlet általános alakja?", options: ["$ax^2 + bx + c = 0$ ($a \\neq 0$)", "$ax + b = 0$", "$a/x = b$", "$x^3 = c$"], correctAnswer: 0, explanation: "$ax^2 + bx + c = 0$." },
  { id: "q-eq-e-8", question: "Oldd meg a $\\sqrt{x} = 4$ egyenletet!", options: ["x = 16", "x = 2", "x = 8", "x = 4"], correctAnswer: 0, explanation: "Négyzetre emelve $x = 16$." },
  { id: "q-eq-e-9", question: "Oldd meg az $x + y = 5, x - y = 1$ egyenletrendszert!", options: ["x = 3, y = 2", "x = 4, y = 1", "x = 5, y = 0", "x = 2, y = 3"], correctAnswer: 0, explanation: "Összeadva $2x = 6 \\Rightarrow x = 3, y = 2$." },
  { id: "q-eq-e-10", question: "Oldd meg a $(x-2)(x+3) = 0$ szorzatalakú egyenletet!", options: ["x = 2 és x = -3", "x = -2 és x = 3", "x = 6", "x = 0"], correctAnswer: 0, explanation: "Egy szorzat akkor 0, ha valamelyik tényezője 0." }
];

export const quizEquationsMedium: GraduationQuizQuestion[] = [
  { id: "q-eq-m-1", question: "Oldd meg a $x^2 - 5x + 6 = 0$ másodfokú egyenletet Viète-klauzula vagy megoldóképlet alapján!", options: ["x = 2 és x = 3", "x = -2 és x = -3", "x = 1 és x = 6", "x = 5 és x = 6"], correctAnswer: 0, explanation: "$(x-2)(x-3) = 0 \\Rightarrow x_1 = 2, x_2 = 3$." },
  { id: "q-eq-m-2", question: "Mennyi az $x^2 - 4x + 4 = 0$ diszkriminánsa ($D$)?", options: ["0 (1 kétszeres gyök)", "16", "8", "-8"], correctAnswer: 0, explanation: "$D = (-4)^2 - 4(1)(4) = 16 - 16 = 0$." },
  { id: "q-eq-m-3", question: "Oldd meg a $3^{x+1} + 3^x = 36$ exponenciális egyenletet!", options: ["x = 2", "x = 3", "x = 1", "x = 4"], correctAnswer: 0, explanation: "$3^x(3 + 1) = 36 \\Rightarrow 3^x \\cdot 4 = 36 \\Rightarrow 3^x = 9 \\Rightarrow x = 2$." },
  { id: "q-eq-m-4", question: "Oldd meg a $\\lg(x) + \\lg(x-3) = 1$ logaritmusos egyenletet!", options: ["x = 5 (a kikötés $x>3$ miatt)", "x = 5 és x = -2", "x = 10", "x = 3"], correctAnswer: 0, explanation: "Kikötés $x > 3$. $\\lg(x(x-3)) = 1 \\Rightarrow x^2 - 3x - 10 = 0 \\Rightarrow (x-5)(x+2) = 0$. Gyök: $x = 5$." },
  { id: "q-eq-m-5", question: "Oldd meg a $\\sqrt{2x + 1} = x - 1$ egyenletet hamis gyök szűrésével!", options: ["x = 4", "x = 0 és x = 4", "x = 0", "Nincs megoldás"], correctAnswer: 0, explanation: "$2x+1 = x^2 - 2x + 1 \\Rightarrow x^2 - 4x = 0 \\Rightarrow x=0$ vagy $x=4$. Ellenőrzés: $x=0$-ra $\\sqrt{1} \\neq -1$, így csak $x=4$ jó." },
  { id: "q-eq-m-6", question: "Oldd meg az $|2x - 3| = 5$ egyenletet!", options: ["x = 4 és x = -1", "x = 4", "x = -1", "x = 1"], correctAnswer: 0, explanation: "$2x - 3 = 5 \\Rightarrow x=4$ vagy $2x - 3 = -5 \\Rightarrow 2x = -2 \\Rightarrow x=-1$." },
  { id: "q-eq-m-7", question: "Milyen paraméter $k$ esetén nincs valós gyöke az $x^2 + 4x + k = 0$ egyenletnek?", options: ["$k > 4$", "$k < 4$", "$k = 4$", "$k > 0$"], correctAnswer: 0, explanation: "$D = 16 - 4k < 0 \\Rightarrow 4k > 16 \\Rightarrow k > 4$." },
  { id: "q-eq-m-8", question: "Oldd meg a $\\frac{x+2}{x-1} = 2$ törtes egyenletet ($x \\neq 1$)!", options: ["x = 4", "x = 2", "x = 1", "x = 3"], correctAnswer: 0, explanation: "$x + 2 = 2(x - 1) \\Rightarrow x + 2 = 2x - 2 \\Rightarrow x = 4$." },
  { id: "q-eq-m-9", question: "Mennyi az $x^2 - 7x + 10 = 0$ egyenlet gyökeinek összege (Viète-formula $x_1 + x_2$)?", options: ["7", "-7", "10", "-10"], correctAnswer: 0, explanation: "Viète-formula: $x_1 + x_2 = -b/a = -(-7)/1 = 7$." },
  { id: "q-eq-m-10", question: "Oldd meg a $2\\sin(x) - 1 = 0$ trigonometrikus egyenletet a $[0, 2\\pi]$ intervallumon!", options: ["$x = \\pi/6$ és $x = 5\\pi/6$", "$x = \\pi/3$", "$x = \\pi/4$", "$x = \\pi/2$"], correctAnswer: 0, explanation: "$\\sin x = 1/2 \\Rightarrow x = 30^\\circ (\\pi/6)$ és $150^\\circ (5\\pi/6)$." }
];

export const quizEquationsHard: GraduationQuizQuestion[] = [
  { id: "q-eq-h-1", question: "Oldd meg az $4^x - 5 \\cdot 2^x + 4 = 0$ másodfokúra visszavezethető exponenciális egyenletet!", options: ["x = 0 és x = 2", "x = 1 és x = 4", "x = 2 és x = 5", "x = 0 és x = 1"], correctAnswer: 0, explanation: "$y = 2^x \\Rightarrow y^2 - 5y + 4 = 0 \\Rightarrow y_1=1, y_2=4 \\Rightarrow 2^x=1 (x=0), 2^x=4 (x=2)$." },
  { id: "q-eq-h-2", question: "Oldd meg a valós számok körében: $\\sqrt{x + 2 - 4\\sqrt{x-2}} + \\sqrt{x + 7 - 6\\sqrt{x-2}} = 1$!", options: ["$[6, 11]$ zárt intervallum minden eleme", "x = 6", "x = 11", "Nincs megoldás"], correctAnswer: 0, explanation: "Teljes négyzetté alakítással $|\\sqrt{x-2}-2| + |\\sqrt{x-2}-3| = 1$, ami $2 \\le \\sqrt{x-2} \\le 3 \\Rightarrow 4 \\le x-2 \\le 9 \\Rightarrow 6 \\le x \\le 11$." },
  { id: "q-eq-h-3", question: "Hány valós gyöke van az $x^3 - 3x + 1 = 0$ harmadfokú egyenletnek?", options: ["3 valós gyök (Sturm/Cardano vizsgálattal)", "1 valós gyök", "0 valós gyök", "2 valós gyök"], correctAnswer: 0, explanation: "A lokális szélsőértékek $f(1)=-1, f(-1)=3$ ellentétes előjelűek, így 3 valós gyök van." },
  { id: "q-eq-h-4", question: "Oldd meg a $\\sin^2(x) - \\cos^2(x) = 0$ egyenletet a $[0, \\pi]$ intervallumon!", options: ["$x = \\pi/4$ és $x = 3\\pi/4$", "$x = \\pi/2$", "$x = 0$", "$x = \\pi/3$"], correctAnswer: 0, explanation: "$-\\cos(2x) = 0 \\Rightarrow 2x = \\pi/2$ vagy $3\\pi/2 \\Rightarrow x = \\pi/4$ vagy $3\\pi/4$." },
  { id: "q-eq-h-5", question: "Hány egész megoldása van az $|x - 2| + |x + 3| \\le 7$ egyenlőtlenségnek?", options: ["9 egész szám ($-4$-től $3$-ig)", "7", "5", "11"], correctAnswer: 0, explanation: "Intervallumokra bontva a megoldás $-4 \\le x \\le 3$, ami 9 egész szám." },
  { id: "q-eq-h-6", question: "Milyen $a$ paraméter esetén van az $x^2 - 2ax + a^2 - 1 = 0$ egyenletnek két pozitív gyöke?", options: ["$a > 1$", "$a > 0$", "$a < -1$", "Minden a-ra"], correctAnswer: 0, explanation: "$D = 4 > 0$. Gyökök $a - 1$ és $a + 1$. Mindkettő pozitív, ha $a - 1 > 0 \\Rightarrow a > 1$." },
  { id: "q-eq-h-7", question: "Oldd meg az $x^{\\log_2 x} = 16$ logaritmikus egyenletet!", options: ["x = 4 és x = 1/4", "x = 4", "x = 2 és x = 1/2", "x = 16"], correctAnswer: 0, explanation: "2-es alapú logaritmust véve: $(\\log_2 x)^2 = \\log_2 16 = 4 \\Rightarrow \\log_2 x = \\pm 2 \\Rightarrow x = 4$ vagy $x = 1/4$." },
  { id: "q-eq-h-8", question: "Oldd meg a $\\cos(x) + \\sin(x) = \\sqrt{2}$ trigonometrikus egyenletet a $[0, 2\\pi]$ szakaszon!", options: ["$x = \\pi/4$ (45°)", "$x = \\pi/2$", "$x = 0$", "$x = 3\\pi/4$"], correctAnswer: 0, explanation: "$\\sqrt{2}\\sin(x + \\pi/4) = \\sqrt{2} \\Rightarrow \\sin(x + \\pi/4) = 1 \\Rightarrow x + \\pi/4 = \\pi/2 \\Rightarrow x = \\pi/4$." },
  { id: "q-eq-h-9", question: "Mi az $x^4 - 10x^2 + 9 = 0$ egyenlet gyökeinek szorzata?", options: ["9", "-9", "10", "-10"], correctAnswer: 0, explanation: "A gyökök $\\pm 1$ és $\\pm 3$. Szorzatuk: $1 \\cdot (-1) \\cdot 3 \\cdot (-3) = 9$." },
  { id: "q-eq-h-10", question: "Oldd meg a $\\frac{x^2 - 9}{x - 3} = 6$ egyenletet!", options: ["Nincs megoldás (x=3 hamis gyök)", "x = 3", "x = -3", "x = 6"], correctAnswer: 0, explanation: "Egyszerűsítve $x + 3 = 6 \\Rightarrow x = 3$. De $x \\neq 3$ kikötés miatt az egyenletnek NINCS megoldása!" }
];

// Map containing dedicated quizzes for every subtopic in Számelmélet, algebra
export const szamelmeletAlgebraQuizzes: Record<string, { easy: GraduationQuizQuestion[]; medium: GraduationQuizQuestion[]; hard: GraduationQuizQuestion[] }> = {
  'g-basic-operations': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-natural-numbers': { easy: quizDivisibilityEasy, medium: quizDivisibilityMedium, hard: quizDivisibilityHard },
  'g-divisibility': { easy: quizDivisibilityEasy, medium: quizDivisibilityMedium, hard: quizDivisibilityHard },
  'g-number-bases': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-rational-irrational': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-real-numbers': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-powers-roots-log': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-expressions': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-algebraic-identities': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-proportionality': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-percentages': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard },
  'g-eq-systems-ineq': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-algebraic-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-linear-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-quadratic-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-higher-degree-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-square-root-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-non-algebraic-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-abs-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-exponential-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-logarithmic-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-trigonometric-equations': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-inequalities': { easy: quizEquationsEasy, medium: quizEquationsMedium, hard: quizEquationsHard },
  'g-means-inequalities': { easy: quizBasicOpsEasy, medium: quizBasicOpsMedium, hard: quizBasicOpsHard }
};
