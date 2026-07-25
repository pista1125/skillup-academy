import { GraduationQuizQuestion } from '@/data/graduationContent';

// ============================================================================
// TOPIC 4: Függvények, az analízis elemei
// ============================================================================

// --- 1. A függvény fogalma és jellemzése (g-function-concept, g-real-functions, g-transformations, g-function-properties) ---
export const quizFuncEasy: GraduationQuizQuestion[] = [
  { id: "q-fu-e-1", question: "Mennyi az $f(x) = 2x - 7$ függvény értéke az $x = 5$ helyen?", options: ["3", "10", "17", "-3"], correctAnswer: 0, explanation: "$f(5) = 2(5) - 7 = 10 - 7 = 3$." },
  { id: "q-fu-e-2", question: "Hol metszi az $f(x) = 3x - 6$ egyenes az y-tengelyt?", options: ["(0, -6)", "(2, 0)", "(0, 3)", "(0, 6)"], correctAnswer: 0, explanation: "Az y-tengelymetszetnél $x = 0 \\Rightarrow f(0) = -6$, azaz a $(0, -6)$ pontban." },
  { id: "q-fu-e-3", question: "Hol van a zérushelye az $f(x) = 4x - 12$ függvénynek?", options: ["x = 3", "x = -3", "x = 12", "x = 4"], correctAnswer: 0, explanation: "$4x - 12 = 0 \\Rightarrow 4x = 12 \\Rightarrow x = 3$." },
  { id: "q-fu-e-4", question: "Milyen irányba tolja el az $f(x) = (x - 3)^2$ grafikonját az alap $y = x^2$ parabolához képest?", options: ["Jobbra 3 egységgel", "Balra 3 egységgel", "Felfelé 3 egységgel", "Lefelé 3 egységgel"], correctAnswer: 0, explanation: "A zárójelbeli $x-3$ az x-tengely mentén jobbra tol el 3 egységgel." },
  { id: "q-fu-e-5", question: "Milyen tulajdonságú az $f(x) = 2^x$ exponenciális függvény?", options: ["Szigorúan monoton növekvő", "Szigorúan monoton csökkenő", "Periodikus", "Konstans"], correctAnswer: 0, explanation: "Mivel az alap $2 > 1$, szigorúan monoton növekvő." },
  { id: "q-fu-e-6", question: "Mi az értelmezési tartománya az $f(x) = \\sqrt{x - 4}$ függvénynek?", options: ["$[4, \\infty)$", "$(4, \\infty)$", "$(-\\infty, 4]$", "$\\mathbb{R}$"], correctAnswer: 0, explanation: "$x - 4 \\ge 0 \\Rightarrow x \\ge 4$, így $[4, \\infty)$." },
  { id: "q-fu-e-7", question: "Mi a paritása az $f(x) = x^2$ függvénynek?", options: ["Páros (tengelyesen szimmetrikus az y-tengelyre)", "Páratlan (középpontosan szimmetrikus az origóra)", "Nem paritásos", "Periodikus"], correctAnswer: 0, explanation: "$f(-x) = (-x)^2 = x^2 = f(x)$, így páros függvény." },
  { id: "q-fu-e-8", question: "Mi a paritása az $f(x) = x^3$ függvénynek?", options: ["Páratlan (origóra szimmetrikus)", "Páros", "Nem paritásos", "Konstans"], correctAnswer: 0, explanation: "$f(-x) = (-x)^3 = -x^3 = -f(x)$, így páratlan." },
  { id: "q-fu-e-9", question: "Mi az értékkészlete az $f(x) = x^2 + 3$ másodfokú függvénynek?", options: ["$[3, \\infty)$", "$[0, \\infty)$", "$\\mathbb{R}$", "$(-\\infty, 3]$"], correctAnswer: 0, explanation: "Mivel $x^2 \\ge 0$, így $x^2 + 3 \\ge 3$, azaz $[3, \\infty)$." },
  { id: "q-fu-e-10", question: "Hol van a minimuma az $f(x) = (x - 2)^2 + 5$ függvénynek?", options: ["x = 2 helyen, értéke 5", "x = -2 helyen, értéke 5", "x = 5 helyen, értéke 2", "x = 0 helyen"], correctAnswer: 0, explanation: "A csúcspont $C(2, 5)$, a minimum értéke 5 az $x=2$ helyen." }
];

export const quizFuncMedium: GraduationQuizQuestion[] = [
  { id: "q-fu-m-1", question: "Hol van a csúcspontja az $f(x) = -2(x + 1)^2 + 8$ másodfokú függvénynek?", options: ["C(-1, 8)", "C(1, 8)", "C(-1, -8)", "C(2, 8)"], correctAnswer: 0, explanation: "Csúcsponti alak $a(x-u)^2 + v \\Rightarrow C(-1, 8)$." },
  { id: "q-fu-m-2", question: "Melyik állítás IGAZ az $f(x) = \\log_2(x)$ függvényre?", options: ["Csak $x > 0$ esetén van értelmezve", "Értékkészlete a pozitív számok", "Zérushelye $x = 0$", "Szigorúan monoton csökkenő"], correctAnswer: 0, explanation: "A logaritmus értelmezési tartománya $(0, \\infty)$." },
  { id: "q-fu-m-3", question: "Mekkora az $f(x) = \\sin(x)$ függvény periódusa?", options: ["$2\\pi$ (vagy $360^\\circ$)", "$\\pi$ (vagy $180^\\circ$)", "$\\pi/2$", "$4\\pi$"], correctAnswer: 0, explanation: "A szinusz alap-periódusa $2\\pi$ ($360^\\circ$)." },
  { id: "q-fu-m-4", question: "Mi az $y = 2x + 1$ függvény inverze ($f^{-1}(x)$)?", options: ["$f^{-1}(x) = \\frac{x - 1}{2}$", "$f^{-1}(x) = 2x - 1$", "$f^{-1}(x) = \\frac{1}{2x+1}$", "$f^{-1}(x) = \\frac{x + 1}{2}$"], correctAnswer: 0, explanation: "$y = 2x+1 \\Rightarrow 2x = y-1 \\Rightarrow x = (y-1)/2 \\Rightarrow f^{-1}(x) = (x-1)/2$." },
  { id: "q-fu-m-5", question: "Milyen transzformációt jelent az $f(x) = 3 \\cdot g(x)$ grafikonján?", options: ["Függőleges irányú 3-szoros nyújtás (y-tengely mentén)", "Vízszintes nyújtás", "Jobbra tolás 3-mal", "Felfelé tolás 3-mal"], correctAnswer: 0, explanation: "A függvénymagasságok 3-szorosukra nőnek (y-irányú nyújtás)." },
  { id: "q-fu-m-6", question: "Mi az értelmezési tartománya az $f(x) = \\frac{1}{x - 3}$ törttel megadott függvénynek?", options: ["$\\mathbb{R} \\setminus \\{3\\}$", "$\\mathbb{R}$", "$[3, \\infty)$", "$(3, \\infty)$"], correctAnswer: 0, explanation: "A nevező nem lehet 0: $x - 3 \\neq 0 \\Rightarrow x \\neq 3$." },
  { id: "q-fu-m-7", question: "Milyen konvexitású az $f(x) = x^2$ függvény?", options: ["Szigorúan konvex (alulról domború)", "Szigorúan konkáv", "Nem konvex és nem konkáv", "Váltakozó"], correctAnswer: 0, explanation: "Az $f(x)=x^2$ parabola alulról konvex." },
  { id: "q-fu-m-8", question: "Mi az $f(x) = \\cos(x)$ értékkészlete?", options: ["$[-1, 1]$", "$[0, 1]$", "$\\mathbb{R}$", "$(-\\infty, 1]$"], correctAnswer: 0, explanation: "A koszinusz függvény értékei a $[-1, 1]$ zárt intervallumba esnek." },
  { id: "q-fu-m-9", question: "Hol van a zérushelye az $f(x) = 2^{x-1} - 8$ exponenciális függvénynek?", options: ["x = 4", "x = 3", "x = 5", "x = 2"], correctAnswer: 0, explanation: "$2^{x-1} = 8 = 2^3 \\Rightarrow x - 1 = 3 \\Rightarrow x = 4$." },
  { id: "q-fu-m-10", question: "Hol metszik egymást az $f(x) = x^2$ és $g(x) = x$ függvények?", options: ["(0, 0) és (1, 1) pontokban", "(1, 1)-ben", "(0, 0)-ban", "(2, 4)-ben"], correctAnswer: 0, explanation: "$x^2 = x \\Rightarrow x^2 - x = 0 \\Rightarrow x(x-1) = 0 \\Rightarrow x_1=0, x_2=1$." }
];

export const quizFuncHard: GraduationQuizQuestion[] = [
  { id: "q-fu-h-1", question: "Hol van lokális szélsőértéke az $f(x) = x^3 - 3x$ függvénynek?", options: ["$x = 1$ (minimum) és $x = -1$ (maximum)", "$x = 0$-ban", "$x = 3$-ban", "Nincs szélsőértéke"], correctAnswer: 0, explanation: "$f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$. $f''(1) = 6 > 0$ (min), $f''(-1) = -6 < 0$ (max)." },
  { id: "q-fu-h-2", question: "Melyik pontban van inflexiós pontja a $g(x) = x^3 - 6x^2 + 9x$ függvénynek?", options: ["x = 2", "x = 1", "x = 3", "x = 0"], correctAnswer: 0, explanation: "$g''(x) = 6x - 12 = 0 \\Rightarrow x = 2$." },
  { id: "q-fu-h-3", question: "Milyen konvexitású az $f(x) = \\ln(x)$ függvény a $(0, \\infty)$ intervallumon?", options: ["Szigorúan konkáv (felülről domború)", "Szigorúan konvex", "Lineáris", "Inflexiós"], correctAnswer: 0, explanation: "$f'(x) = 1/x \\Rightarrow f''(x) = -1/x^2 < 0$, így szigorúan konkáv." },
  { id: "q-fu-h-4", question: "Melyik állítás írja le a Bolzano-tételt folytonos $f$ függvényre az $[a, b]$ intervallumon?", options: ["Ha $f(a)$ és $f(b)$ ellentétes előjelű, akkor van legalább egy $c \\in (a, b)$, ahol $f(c) = 0$", "Mindig van maximuma", "Deriválható mindenhol", "Szigorúan monoton"], correctAnswer: 0, explanation: "A Bolzano-tétel előjelváltás esetén gyököt garantál." },
  { id: "q-fu-h-5", question: "Mi a feltétele annak, hogy egy $f$ függvénynek létezzen inverz függvénye?", options: ["$f$ kölcsönösen egyértelmű (injektív) kell legyen", "$f$ folytonos kell legyen", "$f$ páros kell legyen", "$f$ polinom kell legyen"], correctAnswer: 0, explanation: "Csak kölcsönösen egyértelmű (injektív) hozzárendelésnek létezik inverze." },
  { id: "q-fu-h-6", question: "Melyik egyenesre szimmetrikus egy $f$ függvény és $f^{-1}$ inverzének grafikonja?", options: ["Az $y = x$ főátlóra", "Az y-tengelyre", "Az x-tengelyre", "Az $y = -x$ egyenesre"], correctAnswer: 0, explanation: "Függvény és inverze az $y = x$ egyenesre tengelyesen szimmetrikusak." },
  { id: "q-fu-h-7", question: "Mi az $f(g(x))$ összetett függvény (kompozíció) értelmezése?", options: ["Először g-t alkalmazzuk x-re, majd f-et a g(x) eredményre", "Összeszorozzuk f-et és g-t", "Összeadjuk f-et és g-t", "Először f-et alkalmazzuk"], correctAnswer: 0, explanation: "Ez az összetett függvény (belső és külső függvény) definíciója." },
  { id: "q-fu-h-8", question: "Hol van függőleges aszimptótája az $f(x) = \\frac{2x+1}{x-4}$ racionális törtfüggvénynek?", options: ["x = 4", "x = -1/2", "y = 2", "x = 0"], correctAnswer: 0, explanation: "A szakadási helyen $x - 4 = 0 \\Rightarrow x = 4$." },
  { id: "q-fu-h-9", question: "Hol van vízszintes aszimptótája az $f(x) = \\frac{2x+1}{x-4}$ függvénynek a végtelenben?", options: ["y = 2", "y = 4", "y = 0", "x = 4"], correctAnswer: 0, explanation: "$\\lim_{x \\to \\infty} \\frac{2x+1}{x-4} = 2$." },
  { id: "q-fu-h-10", question: "Mi a Weierstrass-tétel korlátos és zárt $[a, b]$ intervallumon folytonos függvényre?", options: ["A függvény felveszi a legkisebb és legnagyobb értékét (minimumát és maximumát)", "A függvény deriválható", "A függvény monoton", "A függvény lineáris"], correctAnswer: 0, explanation: "A Weierstrass-tétel garantálja a szélsőértékek létezését zárt korlátos intervallumon." }
];

// --- 2. Sorozatok & Kamatszámítás (g-sequences, g-arithmetic-geometric, g-infinite-series, g-interest-annuities) ---
export const quizSeqEasy: GraduationQuizQuestion[] = [
  { id: "q-sq-e-1", question: "Mennyi az $a_n = 2n + 1$ sorozat 5-ödik tagja ($a_5$)?", options: ["11", "10", "9", "12"], correctAnswer: 0, explanation: "$a_5 = 2(5) + 1 = 11$." },
  { id: "q-sq-e-2", question: "Egy számtani sorozat első tagja $a_1 = 3$, különbsége $d = 4$. Mennyi $a_4$?", options: ["15", "12", "16", "19"], correctAnswer: 0, explanation: "$a_4 = 3 + 3(4) = 3 + 12 = 15$." },
  { id: "q-sq-e-3", question: "Egy mértani sorozat első tagja $a_1 = 2$, hányadosa $q = 3$. Mennyi $a_3$?", options: ["18", "6", "12", "54"], correctAnswer: 0, explanation: "$a_3 = a_1 \\cdot q^2 = 2 \\cdot 3^2 = 18$." },
  { id: "q-sq-e-4", question: "Mit nevezünk számtani sorozat differenciájának ($d$)?", options: ["A szomszédos tagok állandó különbségét ($a_n - a_{n-1}$)", "A szomszédos tagok hányadosát", "Az első tagot", "A tagok összegét"], correctAnswer: 0, explanation: "A differencia a szomszédos tagok állandó különbsége." },
  { id: "q-sq-e-5", question: "Mit nevezünk mértani sorozat kvóciensének ($q$)?", options: ["A szomszédos tagok állandó hányadosát ($a_n / a_{n-1}$)", "A tagok különbségét", "Az első tagot", "A tagok számát"], correctAnswer: 0, explanation: "A kvóciens a szomszédos tagok állandó hányadosa." },
  { id: "q-sq-e-6", question: "Mennyi a $2, 5, 8, 11, 14$ számtani sorozat differenciája ($d$)?", options: ["3", "2", "5", "8"], correctAnswer: 0, explanation: "$5 - 2 = 3$." },
  { id: "q-sq-e-7", question: "Mennyi a $3, 6, 12, 24$ mértani sorozat kvóciense ($q$)?", options: ["2", "3", "6", "12"], correctAnswer: 0, explanation: "$6 / 3 = 2$." },
  { id: "q-sq-e-8", question: "Számtani sorozat-e a $1, 4, 9, 16$ számsorozat?", options: ["Nem, mert a különbségek (3, 5, 7) nem állandók", "Igen", "Mértani sorozat", "Konstans sorozat"], correctAnswer: 0, explanation: "Négyzetszámok sorozata, nem számtani." },
  { id: "q-sq-e-9", question: "Mennyi az első 5 pozitív egész szám összege ($1+2+3+4+5$)?", options: ["15", "10", "20", "25"], correctAnswer: 0, explanation: "$1+2+3+4+5 = 15$." },
  { id: "q-sq-e-10", question: "100 000 Ft-ot 10%-os kamatra teszünk el 1 évre. Mennyi pénzünk lesz 1 év múlva?", options: ["110 000 Ft", "101 000 Ft", "100 100 Ft", "120 000 Ft"], correctAnswer: 0, explanation: "$100000 \\cdot 1,10 = 110000$ Ft." }
];

export const quizSeqMedium: GraduationQuizQuestion[] = [
  { id: "q-sq-m-1", question: "Mennyi az $a_1 = 5, d = 3$ számtani sorozat első 10 tagjának összege ($S_{10}$)?", options: ["185", "370", "200", "150"], correctAnswer: 0, explanation: "$a_{10} = 5 + 9(3) = 32 \\Rightarrow S_{10} = \\frac{5+32}{2} \\cdot 10 = 37 \\cdot 5 = 185$." },
  { id: "q-sq-m-2", question: "Ha egy számtani sorozatban $a_3 = 11$ és $a_7 = 23$, mennyi a különbség ($d$)?", options: ["3", "4", "6", "2"], correctAnswer: 0, explanation: "$a_7 - a_3 = 4d \\Rightarrow 23 - 11 = 12 \\Rightarrow 4d = 12 \\Rightarrow d = 3$." },
  { id: "q-sq-m-3", question: "Egy mértani sorozat első tagja $a_1 = 5, q = 3$. Mennyi az $a_4$ értéke?", options: ["135", "45", "15", "40"], correctAnswer: 0, explanation: "$a_4 = a_1 \\cdot q^3 = 5 \\cdot 3^3 = 5 \\cdot 27 = 135$." },
  { id: "q-sq-m-4", question: "Milyen tőke gyűlik össze 3 év alatt 100 000 Ft-ból évi $5\\%$-os kamatos kamat mellett?", options: ["115 762,5 Ft", "115 000 Ft", "115 500 Ft", "120 000 Ft"], correctAnswer: 0, explanation: "$T_3 = 100000 \\cdot (1.05)^3 = 100000 \\cdot 1.157625 = 115 762.5$ Ft." },
  { id: "q-sq-m-5", question: "Mennyi az $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots$ végtelen mértani sor összege ($S$)?", options: ["2", "1.5", "Végtelen", "1"], correctAnswer: 0, explanation: "$a_1 = 1, q = 1/2 \\Rightarrow S = \\frac{a_1}{1-q} = \\frac{1}{1-0.5} = 2$." },
  { id: "q-sq-m-6", question: "Hányadik tagja a $2, 5, 8, 11, \\dots$ számtani sorozatnak a 32?", options: ["11.", "10.", "12.", "9."], correctAnswer: 0, explanation: "$a_n = 2 + (n-1)3 = 32 \\Rightarrow 3n - 1 = 32 \\Rightarrow 3n = 33 \\Rightarrow n = 11$." },
  { id: "q-sq-m-7", question: "Melyik formula adja meg a mértani sorozat első $n$ tagjának összegét ($q \\neq 1$)?", options: ["$S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}$", "$S_n = a_1 \\cdot q^n$", "$S_n = n \\cdot a_1$", "$S_n = \\frac{a_1 + a_n}{2} \\cdot n$"], correctAnswer: 0, explanation: "A mértani sorozat összegképlete." },
  { id: "q-sq-m-8", question: "Mikor konvergens egy végtelen mértani sor?", options: ["Ha $|q| < 1$", "Ha $q > 1$", "Ha $q = 1$", "Minden q-ra"], correctAnswer: 0, explanation: "A végtelen mértani sor pontosan akkor konvergens (van véges összege), ha $|q| < 1$." },
  { id: "q-sq-m-9", question: "Számtani közép tulajdonság: hogyan fejezhető ki $a_n$ a szomszédai segítségével?", options: ["$a_n = \\frac{a_{n-1} + a_{n+1}}{2}$", "$a_n = \\sqrt{a_{n-1} \\cdot a_{n+1}}$", "$a_n = a_{n-1} + a_{n+1}$", "$a_n = a_{n-1} \\cdot a_{n+1}$"], correctAnswer: 0, explanation: "Számtani sorozatban minden tag a két szomszédjának számtani közepe." },
  { id: "q-sq-m-10", question: "Mértani közép tulajdonság pozitív tagú mértani sorozatban: $a_n = ?$", options: ["$a_n = \\sqrt{a_{n-1} \\cdot a_{n+1}}$", "$a_n = \\frac{a_{n-1} + a_{n+1}}{2}$", "$a_n = a_{n-1} \\cdot q$", "$a_n = a_1 \\cdot q^n$"], correctAnswer: 0, explanation: "Mértani sorozatban minden tag a szomszédjainak mértani közepe." }
];

export const quizSeqHard: GraduationQuizQuestion[] = [
  { id: "q-sq-h-1", question: "Egy számtani sorozat első 3 tagjának összege 15, szorzata 80. Melyik a középső tag ($a_2$)?", options: ["5", "3", "4", "6"], correctAnswer: 0, explanation: "$a_1 + a_2 + a_3 = 3a_2 = 15 \\Rightarrow a_2 = 5$." },
  { id: "q-sq-h-2", question: "Egy végtelen mértani sor összege $S = 18$, első tagja $a_1 = 12$. Mennyi a kvóciens ($q$)?", options: ["1/3", "2/3", "1/2", "3/4"], correctAnswer: 0, explanation: "$18 = \\frac{12}{1-q} \\Rightarrow 18(1-q) = 12 \\Rightarrow 18 - 18q = 12 \\Rightarrow 18q = 6 \\Rightarrow q = 1/3$." },
  { id: "q-sq-h-3", question: "Számítsd ki a $\\sum_{k=1}^{100} k$ első 100 pozitív egész összeget!", options: ["5050", "5000", "10100", "4950"], correctAnswer: 0, explanation: "Gauss-formula: $\\frac{100 \\cdot 101}{2} = 5050$." },
  { id: "q-sq-h-4", question: "Hány év alatt duplázódik meg a pénzünk évi 7%-os kamatos kamat mellett (72-es szabály / logaritmus)?", options: ["Kb. 10.24 év", "14 év", "7 év", "20 év"], correctAnswer: 0, explanation: "$1.07^n = 2 \\Rightarrow n = \\frac{\\lg 2}{\\lg 1.07} \\approx \\frac{0.3010}{0.0294} \\approx 10.24$ év." },
  { id: "q-sq-h-5", question: "Egy mértani sorozat első 3 tagjának összege 21, a következő 3 tagjának összege 168. Mennyi $q$?", options: ["2", "3", "4", "1/2"], correctAnswer: 0, explanation: "$S_{4..6} = q^3 \\cdot S_{1..3} \\Rightarrow 168 = q^3 \\cdot 21 \\Rightarrow q^3 = 8 \\Rightarrow q = 2$." },
  { id: "q-sq-h-6", question: "Mi a Fibonacci-sorozat rekruzív definíciója ($F_1=1, F_2=1$)?", options: ["$F_n = F_{n-1} + F_{n-2}$", "$F_n = 2F_{n-1}$", "$F_n = F_{n-1} \\cdot F_{n-2}$", "$F_n = F_{n-1} + 1$"], correctAnswer: 0, explanation: "A Fibonacci-sorozatban minden tag az előző kettő összege." },
  { id: "q-sq-h-7", question: "Melyik híres formula adja meg a Fibonacci-sorozat n-edik tagját zárt alakban?", options: ["Binet-formula", "Gauss-formula", "Euler-formula", "Cardano-formula"], correctAnswer: 0, explanation: "Binet-formula az aranymetszéssel ($\\phi$)." },
  { id: "q-sq-h-8", question: "Járadékszámítás: Évente n alkalommal a év elején elhelyezett a összegek jövőértéke (tőkehalmozás): $J = ?$", options: ["$a \\cdot r \\cdot \\frac{r^n - 1}{r - 1}$ (ahol $r = 1 + p/100$)", "$a \\cdot n \\cdot r$", "$a \\cdot r^n$", "$a \\cdot \\frac{r^n - 1}{r - 1}$"], correctAnswer: 0, explanation: "Év eleji előzetes törlesztés/tőkehalmozás jövőértéke." },
  { id: "q-sq-h-9", question: "Mennyi a $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$ nevezetes határérték?", options: ["$e \\approx 2.71828$ (Euler-féle szám)", "1", "Végtelen", "2"], correctAnswer: 0, explanation: "Az Euler-féle e szám definíciója." },
  { id: "q-sq-h-10", question: "Melyik feltétel mellett torlódnak egy sorozat tagjai egy L számhoz (határérték definíció)?", options: ["Minden $\\epsilon > 0$-hoz létezik $N$ küszöbszám, hogy minden $n > N$ esetén $|a_n - L| < \\epsilon$", "Ha növekvő", "Ha korlátos", "Ha $a_n = L$"], correctAnswer: 0, explanation: "A sorozathatárérték (Cauchy/Weierstrass) pontos definíciója." }
];

// --- 3. Analízis elemei (g-calculus-elements, g-limits-continuity, g-differential-calculus, g-integral-calculus) ---
export const quizCalcEasy: GraduationQuizQuestion[] = [
  { id: "q-ca-e-1", question: "Mi a hatványszabály szerint az $f(x) = x^3$ függvény deriváltja?", options: ["$f'(x) = 3x^2$", "$f'(x) = 3x^3$", "$f'(x) = x^2$", "$f'(x) = 6x$"], correctAnswer: 0, explanation: "$(x^n)' = n x^{n-1} \\Rightarrow (x^3)' = 3x^2$." },
  { id: "q-ca-e-2", question: "Mi a konstans függvény ($f(x) = 5$) deriváltja?", options: ["0", "5", "1", "x"], correctAnswer: 0, explanation: "Konstans deriváltja mindig 0." },
  { id: "q-ca-e-3", question: "Mi az $f(x) = x$ lineáris függvény deriváltja?", options: ["1", "0", "x", "2"], correctAnswer: 0, explanation: "$(x)' = 1$." },
  { id: "q-ca-e-4", question: "Mi az $f(x) = 4x^2$ függvény deriváltja?", options: ["$8x$", "$4x$", "$8x^2$", "8"], correctAnswer: 0, explanation: "$(4x^2)' = 4(2x) = 8x$." },
  { id: "q-ca-e-5", question: "Mi a geometrikus jelentése a deriváltnak az $x_0$ pontban?", options: ["A függvény grafikonjához húzott érintő meredeksége", "A grafikon alatti terület", "Az y-tengelymetszet", "A zérushely"], correctAnswer: 0, explanation: "A derivált az érintő meredeksége." },
  { id: "q-ca-e-6", question: "Mi a határozatlan integrálálás műveletének lényege?", options: ["A deriválás ellentétes (inverz) művelete (primitív függvény keresése)", "Gyökvonás", "Hatványozás", "Középérték-számítás"], correctAnswer: 0, explanation: "Az integrálás a deriválás inverze." },
  { id: "q-ca-e-7", question: "Mi a határozott integrál geometrikus jelentése nemnegatív $f(x)$ esetén?", options: ["A görbe alatti terület az [a, b] intervallumon", "Az érintő meredeksége", "A függvény hossza", "A maximális érték"], correctAnswer: 0, explanation: "A határozott integrál a görbe alatti terület." },
  { id: "q-ca-e-8", question: "Mi a $\\sin(x)$ függvény deriváltja?", options: ["$\\cos(x)$", "$-\\cos(x)$", "$-\\sin(x)$", "$\\tan(x)$"], correctAnswer: 0, explanation: "$(\\sin x)' = \\cos x$." },
  { id: "q-ca-e-9", question: "Mi a $\\cos(x)$ függvény deriváltja?", options: ["$-\\sin(x)$", "$\\sin(x)$", "$\\cos(x)$", "$-\\cos(x)$"], correctAnswer: 0, explanation: "$(\\cos x)' = -\\sin x$." },
  { id: "q-ca-e-10", question: "Mennyi az $f(x) = 2x + 1$ határozatlan integrálja?", options: ["$x^2 + x + C$", "$2x^2 + C$", "$x^2 + C$", "$2 + C$"], correctAnswer: 0, explanation: "$\\int (2x+1) dx = x^2 + x + C$." }
];

export const quizCalcMedium: GraduationQuizQuestion[] = [
  { id: "q-ca-m-1", question: "Mi az $f(x) = 3x^2 - 4x + 5$ függvény deriváltja?", options: ["$6x - 4$", "$3x - 4$", "$6x^2 - 4$", "$6x + 5$"], correctAnswer: 0, explanation: "$f'(x) = 6x - 4$." },
  { id: "q-ca-m-2", question: "Mennyi az $\\int_0^2 3x^2 dx$ határozott integrál értéke?", options: ["8", "12", "4", "16"], correctAnswer: 0, explanation: "$F(x) = x^3 \\Rightarrow F(2) - F(0) = 8 - 0 = 8$." },
  { id: "q-ca-m-3", question: "Mennyi a $\\lim_{x \\to \\infty} \\frac{4x^2 + 1}{2x^2 - 3}$ határérték?", options: ["2", "4", "0", "Végtelen"], correctAnswer: 0, explanation: "$4 / 2 = 2$." },
  { id: "q-ca-m-4", question: "Mi az $f(x) = e^x$ exponenciális függvény deriváltja?", options: ["$e^x$", "$x e^{x-1}$", "$\\ln(x)$", "$1/e^x$"], correctAnswer: 0, explanation: "$(e^x)' = e^x$." },
  { id: "q-ca-m-5", question: "Mi az $f(x) = \\ln(x)$ természetes logaritmus deriváltja ($x > 0$)?", options: ["$1/x$", "$e^x$", "$x$", "1"], correctAnswer: 0, explanation: "$(\\ln x)' = 1/x$." },
  { id: "q-ca-m-6", question: "Hol lehet egy deriválható függvénynek lokális szélsőértéke?", options: ["Ahol az első deriváltja 0 ($f'(x) = 0$)", "Ahol f(x)=0", "Minden pontban", "Ahol f''(x)=0"], correctAnswer: 0, explanation: "Szükséges feltétel: $f'(x) = 0$." },
  { id: "q-ca-m-7", question: "Ha az $x_0$ pontban $f'(x_0) = 0$ és $f''(x_0) > 0$, milyen szélsőérték van ott?", options: ["Lokális MINIMUM", "Lokális MAXIMUM", "Inflexiós pont", "Nincs szélsőérték"], correctAnswer: 0, explanation: "Második derivált pozitív $\\Rightarrow$ konvex $\\Rightarrow$ minimum." },
  { id: "q-ca-m-8", question: "Ha $f'(x_0) = 0$ és $f''(x_0) < 0$, milyen szélsőérték van ott?", options: ["Lokális MAXIMUM", "Lokális MINIMUM", "Inflexiós pont", "Szakadási hely"], correctAnswer: 0, explanation: "Második derivált negatív $\\Rightarrow$ konkáv $\\Rightarrow$ maximum." },
  { id: "q-ca-m-9", question: "Mennyi az $\\int_1^3 2x dx$ határozott integrál?", options: ["8", "4", "9", "6"], correctAnswer: 0, explanation: "$[x^2]_1^3 = 9 - 1 = 8$." },
  { id: "q-ca-m-10", question: "Mi a szorzatszabály két deriválható függvény szorzatára: $(u \\cdot v)' = ?$", options: ["$u'v + uv'$", "$u'v'$", "$u'v - uv'$", "$u + v'$"], correctAnswer: 0, explanation: "Szorzatszabály: $(uv)' = u'v + uv'$." }
];

export const quizCalcHard: GraduationQuizQuestion[] = [
  { id: "q-ca-h-1", question: "Mi az $f(x) = x \\cdot e^x$ szorzat deriváltja?", options: ["$(x + 1)e^x$", "$e^x$", "$x e^x$", "$e^x + 1$"], correctAnswer: 0, explanation: "$(1)e^x + x(e^x) = (x+1)e^x$." },
  { id: "q-ca-h-2", question: "Számítsd ki a $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$ nevezetes határértéket!", options: ["1", "0", "Végtelen", "Nem létezik"], correctAnswer: 0, explanation: "Nevezetes trigonometrikus határérték." },
  { id: "q-ca-h-3", question: "Mekkora a területe az $y = 4 - x^2$ parabola és az x-tengely által közbezárt idomnak?", options: ["32/3", "16/3", "8", "16"], correctAnswer: 0, explanation: "$T = \\int_{-2}^2 (4-x^2)dx = [4x - x^3/3]_{-2}^2 = (8 - 8/3) - (-8 + 8/3) = 32/3$." },
  { id: "q-ca-h-4", question: "Mi a $h(x) = \\sin(2x + 1)$ összetett függvény deriváltja (láncszabály)?", options: ["$2\\cos(2x + 1)$", "$\\cos(2x + 1)$", "$-2\\cos(2x + 1)$", "$2\\sin(2x+1)$"], correctAnswer: 0, explanation: "$\\cos(2x+1) \\cdot 2 = 2\\cos(2x+1)$." },
  { id: "q-ca-h-5", question: "Mi az $f(x) = \\ln(x)$ függvény határozatlan integrálja parciális integrálással?", options: ["$x \\ln x - x + C$", "$\\frac{1}{x} + C$", "$x \\ln x + C$", "$\\ln x - x + C$"], correctAnswer: 0, explanation: "$\\int 1 \\cdot \\ln x dx = x \\ln x - x + C$." },
  { id: "q-ca-h-6", question: "Melyik szabályt használjuk a $\\lim_{x \\to a} \\frac{f(x)}{g(x)}$ határértéknél, ha $0/0$ vagy $\\infty/\\infty$ határozatlanság van?", options: ["L'Hospital-szabály", "Newton-Leibniz formula", "Lagrange-tétel", "Taylor-tétel"], correctAnswer: 0, explanation: "A L'Hospital-szabály számláló és nevező külön deriválását alkalmazza." },
  { id: "q-ca-h-7", question: "Mi a Newton-Leibniz tétele határozott integrálra?", options: ["$\\int_a^b f(x)dx = F(b) - F(a)$, ahol $F'(x) = f(x)$", "$\\int f dx = F + C$", "$f'(x) = 0$", "$F(a) = F(b)$"], correctAnswer: 0, explanation: "A kalkulus alaptétele." },
  { id: "q-ca-h-8", question: "Mi a törtszabály deriválásra: $(u/v)' = ?$", options: ["$\\frac{u'v - uv'}{v^2}$", "$\\frac{u'}{v'}$", "$\\frac{u'v + uv'}{v^2}$", "$\\frac{u-v}{v^2}$"], correctAnswer: 0, explanation: "Hányados deriválási szabálya." },
  { id: "q-ca-h-9", question: "Mi a Taylor-polinom szerepe az analízisben?", options: ["Bonyolult deriválható függvények közelítése hatványsorral a pont környezetében", "Integrálási trükk", "Mátrixok inverze", "Gráfok színezése"], correctAnswer: 0, explanation: "A Taylor-sor/polinom a függvény helyi hatványsoros közelítése." },
  { id: "q-ca-h-10", question: "Melyik tétel állítja, hogy ha f folytonos [a,b]-n és deriválható (a,b)-n, akkor van olyan c in (a,b), ahol $f'(c) = \\frac{f(b)-f(a)}{b-a}$?", options: ["Lagrange-féle középértéktétel", "Rolle-tétel", "Cauchy-tétel", "Bolzano-tétel"], correctAnswer: 0, explanation: "Ez a Lagrange-féle differenciálszámítási középértéktétel." }
];

// Map containing dedicated quizzes for every subtopic in Függvények, analízis
export const fuggvenyekAnalizisQuizzes: Record<string, { easy: GraduationQuizQuestion[]; medium: GraduationQuizQuestion[]; hard: GraduationQuizQuestion[] }> = {
  'g-function-concept': { easy: quizFuncEasy, medium: quizFuncMedium, hard: quizFuncHard },
  'g-real-functions': { easy: quizFuncEasy, medium: quizFuncMedium, hard: quizFuncHard },
  'g-transformations': { easy: quizFuncEasy, medium: quizFuncMedium, hard: quizFuncHard },
  'g-function-properties': { easy: quizFuncEasy, medium: quizFuncMedium, hard: quizFuncHard },
  'g-sequences': { easy: quizSeqEasy, medium: quizSeqMedium, hard: quizSeqHard },
  'g-arithmetic-geometric': { easy: quizSeqEasy, medium: quizSeqMedium, hard: quizSeqHard },
  'g-infinite-series': { easy: quizSeqEasy, medium: quizSeqMedium, hard: quizSeqHard },
  'g-interest-annuities': { easy: quizSeqEasy, medium: quizSeqMedium, hard: quizSeqHard },
  'g-calculus-elements': { easy: quizCalcEasy, medium: quizCalcMedium, hard: quizCalcHard },
  'g-limits-continuity': { easy: quizCalcEasy, medium: quizCalcMedium, hard: quizCalcHard },
  'g-differential-calculus': { easy: quizCalcEasy, medium: quizCalcMedium, hard: quizCalcHard },
  'g-integral-calculus': { easy: quizCalcEasy, medium: quizCalcMedium, hard: quizCalcHard }
};
