import { GraduationQuizQuestion } from '@/data/graduationContent';

// ============================================================================
// TOPIC 3: Geometria, koordinátageometria, trigonometria
// ============================================================================

// --- 1. Elemi és síkgeometria (g-elem-geom, g-triangles, g-quadrilaterals) ---
export const quizGeomElemEasy: GraduationQuizQuestion[] = [
  { id: "q-ge-e-1", question: "Mennyi egy háromszög belső szögeinek összege?", options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "$270^\\circ$"], correctAnswer: 0, explanation: "Minden síkbeli háromszög belső szögeinek összege $180^\\circ$." },
  { id: "q-ge-e-2", question: "Melyik tétel mondja ki, hogy derékszögű háromszögben $a^2 + b^2 = c^2$?", options: ["Pithagorasz-tétel", "Thalész-tétel", "Szinusztétel", "Koszinnusztétel"], correctAnswer: 0, explanation: "A Pithagorasz-tétel." },
  { id: "q-ge-e-3", question: "Mit állít Thalész tétele?", options: ["Kör átmérőjének két végpontját a kör bármely más pontjával összekötve derékszögű háromszöget kapunk", "A háromszög szögeinek összege 180°", "A négyzet átlói merőlegesek", "A kör területe r^2*pi"], correctAnswer: 0, explanation: "Thalész tétele." },
  { id: "q-ge-e-4", question: "Mennyi az $r = 5 \\text{ cm}$ sugarú kör területe ($T = r^2 \\pi$)?", options: ["$25\\pi \\text{ cm}^2$", "$10\\pi \\text{ cm}^2$", "$5\\pi \\text{ cm}^2$", "$50\\pi \\text{ cm}^2$"], correctAnswer: 0, explanation: "$T = 5^2 \\cdot \\pi = 25\\pi$." },
  { id: "q-ge-e-5", question: "Mennyi az $a = 6 \\text{ cm}$ oldalú kocka térfogata ($V = a^3$)?", options: ["$216 \\text{ cm}^3$", "$36 \\text{ cm}^3$", "$108 \\text{ cm}^3$", "$144 \\text{ cm}^3$"], correctAnswer: 0, explanation: "$V = 6^3 = 216 \\text{ cm}^3$." },
  { id: "q-ge-e-6", question: "Milyen transzformáció a tengelyes tükrözés?", options: ["Egybevágósági transzformáció", "Hasonlósági transzformáció", "Affin transzformáció", "Nem távolságtartó"], correctAnswer: 0, explanation: "A tengelyes tükrözés távolságtartó, egybevágósági transzformáció." },
  { id: "q-ge-e-7", question: "Mi a $\\sin(30^\\circ)$ értéke?", options: ["0.5", "1", "$\\sqrt{3}/2$", "0"], correctAnswer: 0, explanation: "$\\sin(30^\\circ) = 0.5$." },
  { id: "q-ge-e-8", question: "Adott $A(2, 4)$ és $B(6, 10)$. Mi a felezőpont ($F$) koordinátája?", options: ["F(4, 7)", "F(8, 14)", "F(2, 3)", "F(4, 3)"], correctAnswer: 0, explanation: "$F = ((2+6)/2, (4+10)/2) = (4, 7)$." },
  { id: "q-ge-e-9", question: "Mi a kerülete egy $a=5 \\text{ cm}, b=8 \\text{ cm}$ oldalú téglalapnak?", options: ["26 cm", "40 cm", "13 cm", "20 cm"], correctAnswer: 0, explanation: "$K = 2(a+b) = 2(5+8) = 26 \\text{ cm}$." },
  { id: "q-ge-e-10", question: "Háromszögben melyik vonal felezi a szemközti oldalt és halad át a csúcson?", options: ["Súlyvonal", "Magasságvonal", "Szögfelező", "Oldalfelező merőleges"], correctAnswer: 0, explanation: "A csúcsot a szemközti oldal felezőpontjával összekötő szakasz a súlyvonal." }
];

export const quizGeomElemMedium: GraduationQuizQuestion[] = [
  { id: "q-ge-m-1", question: "Derékszögű háromszögben $c = 10 \\text{ cm}, a = 6 \\text{ cm}$. Mekkora a $b$ befogó?", options: ["8 cm", "4 cm", "7 cm", "6.5 cm"], correctAnswer: 0, explanation: "$b = \\sqrt{100 - 36} = \\sqrt{64} = 8 \\text{ cm}$." },
  { id: "q-ge-m-2", question: "Egy rombusz átlói $e = 12 \\text{ cm}$ és $f = 16 \\text{ cm}$. Mekkora a területe?", options: ["$96 \\text{ cm}^2$", "$192 \\text{ cm}^2$", "$48 \\text{ cm}^2$", "$100 \\text{ cm}^2$"], correctAnswer: 0, explanation: "$T = (e \\cdot f)/2 = (12 \\cdot 16)/2 = 96 \\text{ cm}^2$." },
  { id: "q-ge-m-3", question: "Mekkorák a szabályos hatszög belső szögei?", options: ["$120^\\circ$", "$108^\\circ$", "$135^\\circ$", "$90^\\circ$"], correctAnswer: 0, explanation: "$(6-2) \\cdot 180^\\circ / 6 = 720^\\circ / 6 = 120^\\circ$." },
  { id: "q-ge-m-4", question: "Derékszögű háromszögben $\\alpha = 30^\\circ, c = 12 \\text{ cm}$. Mekkora az $a$ befogó?", options: ["6 cm", "$6\\sqrt{3} \\text{ cm}$", "3 cm", "9 cm"], correctAnswer: 0, explanation: "$a = c \\cdot \\sin(30^\\circ) = 12 \\cdot 0.5 = 6 \\text{ cm}$." },
  { id: "q-ge-m-5", question: "Két hasonló síkidom területének aránya $1 : 9$. Mekkora az oldalaik aránya (hasonlósági arány $λ$)?", options: ["1 : 3", "1 : 9", "1 : 81", "1 : 4.5"], correctAnswer: 0, explanation: "$\\lambda = \\sqrt{1/9} = 1/3$." },
  { id: "q-ge-m-6", question: "Mekkora a sugara a $36\\pi \\text{ cm}^2$ felszínű gömbnek ($A = 4\\pi r^2$)?", options: ["3 cm", "6 cm", "9 cm", "4.5 cm"], correctAnswer: 0, explanation: "$4\\pi r^2 = 36\\pi \\Rightarrow r^2 = 9 \\Rightarrow r = 3 \\text{ cm}$." },
  { id: "q-ge-m-7", question: "Melyik állítás az Szinusztétel?", options: ["$\\frac{a}{b} = \\frac{\\sin\\alpha}{\\sin\\beta}$", "$a^2 = b^2 + c^2 - 2bc\\cos\\alpha$", "$a+b > c$", "$T = ab/2$"], correctAnswer: 0, explanation: "A szinustétel." },
  { id: "q-ge-m-8", question: "Mennyi egy n-oldalú konvex sokszög belső szögeinek összege?", options: ["$(n - 2) \\cdot 180^\\circ$", "$n \\cdot 180^\\circ$", "$360^\\circ$", "$(n - 1) \\cdot 180^\\circ$"], correctAnswer: 0, explanation: "$(n - 2) \\cdot 180^\\circ$." },
  { id: "q-ge-m-9", question: "Egy traéz párhuzamos oldalai $a = 8 \\text{ cm}, c = 4 \\text{ cm}$, magassága $m = 5 \\text{ cm}$. Mekkora a területe?", options: ["$30 \\text{ cm}^2$", "$60 \\text{ cm}^2$", "$20 \\text{ cm}^2$", "$40 \\text{ cm}^2$"], correctAnswer: 0, explanation: "$T = \\frac{a+c}{2} \\cdot m = \\frac{8+4}{2} \\cdot 5 = 6 \\cdot 5 = 30 \\text{ cm}^2$." },
  { id: "q-ge-m-10", question: "Mekkora a $r = 10$ cm sugarú körben a $60^\\circ$-os középponti szög alatti körcikk területe?", options: ["$\\frac{50\\pi}{3} \\text{ cm}^2$", "$50\\pi \\text{ cm}^2$", "$100\\pi \\text{ cm}^2$", "$\\frac{100\\pi}{3} \\text{ cm}^2$"], correctAnswer: 0, explanation: "$T_{cikk} = \\frac{r^2 \\pi \\alpha}{360} = \\frac{100\\pi \\cdot 60}{360} = \\frac{50\\pi}{3}$." }
];

export const quizGeomElemHard: GraduationQuizQuestion[] = [
  { id: "q-ge-h-1", question: "Háromszögben $a = 5, b = 7, \\gamma = 60^\\circ$. Mekkora a $c$ oldal koszinusztétellel?", options: ["$\\sqrt{39}$", "$\\sqrt{74}$", "$\\sqrt{34}$", "6"], correctAnswer: 0, explanation: "$c^2 = 25 + 49 - 2(5)(7)(0.5) = 74 - 35 = 39 \\Rightarrow c = \\sqrt{39}$." },
  { id: "q-ge-h-2", question: "Csonkakúp: $R=6, r=3, m=4$. Mekkora a térfogata ($V = \\frac{\\pi m}{3}(R^2 + Rr + r^2)$)?", options: ["$84\\pi$", "$63\\pi$", "$108\\pi$", "$96\\pi$"], correctAnswer: 0, explanation: "$V = \\frac{4\\pi}{3} (36 + 18 + 9) = 84\\pi$." },
  { id: "q-ge-h-3", question: "Háromszög oldalai $a=5, b=6, c=7$. Mekkora a területe (Héron-képlet)?", options: ["$6\\sqrt{6}$", "$14\\sqrt{3}$", "21", "$12\\sqrt{5}$"], correctAnswer: 0, explanation: "$s = 9 \\Rightarrow T = \\sqrt{9 \\cdot 4 \\cdot 3 \\cdot 2} = \\sqrt{216} = 6\\sqrt{6}$." },
  { id: "q-ge-h-4", question: "Forgáskúp $r=3, a=5$. Mekkora a palást területe ($P = r \\pi a$)?", options: ["$15\\pi$", "$30\\pi$", "$12\\pi$", "$24\\pi$"], correctAnswer: 0, explanation: "$P = 3 \\cdot \\pi \\cdot 5 = 15\\pi$." },
  { id: "q-ge-h-5", question: "Egy $R$ sugarú körbe írt szabályos háromszög oldala mekkora?", options: ["$R\\sqrt{3}$", "$R\\sqrt{2}$", "$2R$", "$R/2$"], correctAnswer: 0, explanation: "Köré írható kör sugara $R = \\frac{a}{\\sqrt{3}} \\Rightarrow a = R\\sqrt{3}$." },
  { id: "q-ge-h-6", question: "Egy $R$ sugarú kör köré írt szabályos háromszög oldala mekkora?", options: ["$2R\\sqrt{3}$", "$R\\sqrt{3}$", "$3R$", "$2R$"], correctAnswer: 0, explanation: "Beírható kör sugara $r = \\frac{a}{2\\sqrt{3}} \\Rightarrow a = 2r\\sqrt{3}$." },
  { id: "q-ge-h-7", question: "Mekkora a szabályos tetraéder magassága $a$ oldal esetén?", options: ["$a\\sqrt{\\frac{2}{3}}$", "$a\\sqrt{3}$", "$a\\frac{\\sqrt{2}}{2}$", "$a/2$"], correctAnswer: 0, explanation: "Szabályos tetraéder magassága $m = a\\sqrt{2/3}$." },
  { id: "q-ge-h-8", question: "Pithagoraszi számhármas-e a $7, 24, 25$?", options: ["Igen, mert $7^2 + 24^2 = 49 + 576 = 625 = 25^2$", "Nem", "Csak tizedes alapon", "Nem eldönthető"], correctAnswer: 0, explanation: "$49 + 576 = 625$." },
  { id: "q-ge-h-9", question: "Euler-egyenes geometriában: mely nevezetes pontokon halad át?", options: ["Súlypont, Magasságpont, Köré írható kör középpontja", "Beírható kör középpontja", "Csúcsok", "Súlypont és beírt kör"], correctAnswer: 0, explanation: "Az Euler-egyenes az $S, M, K$ pontokat köti össze." },
  { id: "q-ge-h-10", question: "Feuerbach-kör (9 pont köre): mekkora a sugara a háromszög köré írt kör $R$ sugarához képest?", options: ["$R / 2$", "$R / 3$", "$2R$", "$R$"], correctAnswer: 0, explanation: "A Feuerbach-kör sugara pontosan a köré írt kör sugarának fele ($R/2$)." }
];

// --- 2. Koordinátageometria & Vektorok (g-coordinate-geometry, g-line-equation, g-circle-equation, g-vectors) ---
export const quizCoordEasy: GraduationQuizQuestion[] = [
  { id: "q-cg-e-1", question: "Adott $A(1, 2)$ és $B(4, 6)$. Mi az $\\vec{AB}$ vektor koordinátája?", options: ["(3, 4)", "(5, 8)", "(-3, -4)", "(2.5, 4)"], correctAnswer: 0, explanation: "$\\vec{AB} = (4-1, 6-2) = (3, 4)$." },
  { id: "q-cg-e-2", question: "Mekkora a $\\mathbf{v}(3, 4)$ vektor hossza ($|\\mathbf{v}|$)?", options: ["5", "7", "25", "1"], correctAnswer: 0, explanation: "$|v| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$." },
  { id: "q-cg-e-3", question: "Mi a $K(0, 0)$ középpontú, $r = 4$ sugarú kör egyenlete?", options: ["$x^2 + y^2 = 16$", "$x^2 + y^2 = 4$", "$x + y = 4$", "$(x-4)^2 + y^2 = 0$"], correctAnswer: 0, explanation: "$x^2 + y^2 = r^2 = 16$." },
  { id: "q-cg-e-4", question: "Mi a $P(2, 3)$ pont origótól $(0,0)$ való távolsága?", options: ["$\\sqrt{13}$", "5", "6", "1"], correctAnswer: 0, explanation: "$d = \\sqrt{2^2 + 3^2} = \\sqrt{13}$." },
  { id: "q-cg-e-5", question: "Mi az $y = 2x + 3$ egyenes meredeksége ($m$)?", options: ["2", "3", "1/2", "-2"], correctAnswer: 0, explanation: "Az $x$ együtthatója a meredekség: $m = 2$." },
  { id: "q-cg-e-6", question: "Mi az $y = 2x + 3$ egyenes y-tengelymetszete?", options: ["(0, 3)", "(3, 0)", "(0, 2)", "(2, 0)"], correctAnswer: 0, explanation: "Ha $x=0$, akkor $y=3$, így $(0, 3)$." },
  { id: "q-cg-e-7", question: "Adott az $\\mathbf{a}(2, 3)$ és $\\mathbf{b}(4, -1)$ vektor. Mennyi $\\mathbf{a} + \\mathbf{b}$?", options: ["(6, 2)", "(8, -3)", "(2, 4)", "(6, 4)"], correctAnswer: 0, explanation: "$(2+4, 3+(-1)) = (6, 2)$." },
  { id: "q-cg-e-8", question: "Ha az egyenes normálvektora $\\mathbf{n}(A, B)$, mi az egyenes egyenletének bal oldala?", options: ["$Ax + By$", "$Bx - Ay$", "$x/A + y/B$", "$A + B + x + y$"], correctAnswer: 0, explanation: "Normálvektoros alak: $Ax + By = Ax_0 + By_0$." },
  { id: "q-cg-e-9", question: "Adott $\\mathbf{a}(1, 2)$ vektor. Mennyi $3\\mathbf{a}$?", options: ["(3, 6)", "(4, 5)", "(3, 2)", "(1, 6)"], correctAnswer: 0, explanation: "$3(1, 2) = (3, 6)$." },
  { id: "q-cg-e-10", question: "Hol metszi az $y = x - 4$ egyenes az x-tengelyt?", options: ["(4, 0)", "(0, -4)", "(-4, 0)", "(0, 4)"], correctAnswer: 0, explanation: "Ha $y=0 \\Rightarrow x - 4 = 0 \\Rightarrow x=4$." }
];

export const quizCoordMedium: GraduationQuizQuestion[] = [
  { id: "q-cg-m-1", question: "Mi a $(x-3)^2 + (y+2)^2 = 25$ kör középpontja ($K$) és sugara ($r$)?", options: ["K(3, -2), r = 5", "K(-3, 2), r = 25", "K(3, 2), r = 5", "K(-3, -2), r = 5"], correctAnswer: 0, explanation: "$K(3, -2), r = \\sqrt{25} = 5$." },
  { id: "q-cg-m-2", question: "Adott $n(3, -4)$ normálvektor és $P(1, 2)$ pont. Mi az egyenes egyenlete?", options: ["$3x - 4y = -5$", "$3x - 4y = 5$", "$4x + 3y = 10$", "$3x + 4y = 11$"], correctAnswer: 0, explanation: "$3(1) - 4(2) = 3 - 8 = -5 \\Rightarrow 3x - 4y = -5$." },
  { id: "q-cg-m-3", question: "Mennyi $\\mathbf{a}(3, 4)$ és $\\mathbf{b}(2, -1)$ skaláris szorzata ($\\mathbf{a} \\cdot \\mathbf{b}$)?", options: ["2", "14", "10", "-2"], correctAnswer: 0, explanation: "$3(2) + 4(-1) = 6 - 4 = 2$." },
  { id: "q-cg-m-4", question: "Mikor merőleges két egyenes egymásra a meredekségük ($m_1, m_2$) alapján?", options: ["$m_1 \\cdot m_2 = -1$", "$m_1 = m_2$", "$m_1 + m_2 = 0$", "$m_1 \\cdot m_2 = 1$"], correctAnswer: 0, explanation: "Merőlegesség feltétele: $m_1 \\cdot m_2 = -1$." },
  { id: "q-cg-m-5", question: "Adott $v(2, 5)$ irányvektor. Mi a hozzá tartozó normálvektor?", options: ["(-5, 2) vagy (5, -2)", "(2, -5)", "(5, 2)", "(1/2, 1/5)"], correctAnswer: 0, explanation: "Az irányvektor 90°-os elforgatottja a normálvektor: $(-5, 2)$." },
  { id: "q-cg-m-6", question: "Melyik egyenes párhuzamos az $y = 3x - 1$ egyenessel?", options: ["$y = 3x + 7$", "$y = -3x + 1$", "$y = -\\frac{1}{3}x$", "$y = x + 3$"], correctAnswer: 0, explanation: "Párhuzamos egyenesek meredeksége megegyezik ($m=3$)." },
  { id: "q-cg-m-7", question: "Mi az $A(1, 1)$ és $B(5, 5)$ pontok távolsága ($d$)?", options: ["$\\sqrt{32} = 4\\sqrt{2}$", "8", "4", "16"], correctAnswer: 0, explanation: "$d = \\sqrt{(5-1)^2 + (5-1)^2} = \\sqrt{16+16} = \\sqrt{32} = 4\\sqrt{2}$." },
  { id: "q-cg-m-8", question: "Illeszkedik-e a $P(3, 4)$ pont az $x^2 + y^2 = 25$ körre?", options: ["Igen, mert $3^2 + 4^2 = 9 + 16 = 25$", "Nem", "A körön belül van", "A körön kívül van"], correctAnswer: 0, explanation: "$9 + 16 = 25$, így a pont rajta van a körvonalon." },
  { id: "q-cg-m-9", question: "Mi a tengelyponti egyenlete a $C(0, 0)$ csúcspontú, felfelé nyíló parabolának?", options: ["$y = a x^2$", "$x = a y^2$", "$y = a/x$", "$x^2 + y^2 = a$"], correctAnswer: 0, explanation: "$y = a x^2$." },
  { id: "q-cg-m-10", question: "Mekkora a szög a $\\mathbf{v}(1, 0)$ és $\\mathbf{w}(0, 1)$ vektorok között?", options: ["$90^\\circ$", "$0^\\circ$", "$180^\\circ$", "$45^\\circ$"], correctAnswer: 0, explanation: "Az i és j bázisvektorok merőlegesek ($90^\\circ$)." }
];

export const quizCoordHard: GraduationQuizQuestion[] = [
  { id: "q-cg-h-1", question: "Mi a $P(3, 4)$ pont távolsága a $3x + 4y - 10 = 0$ egyenestől?", options: ["3", "5", "2.5", "15"], correctAnswer: 0, explanation: "$d = \\frac{|3(3)+4(4)-10|}{\\sqrt{9+16}} = \\frac{15}{5} = 3$." },
  { id: "q-cg-h-2", question: "Hol metszik egymást az $x^2 + y^2 = 25$ kör és az $y = x + 1$ egyenes?", options: ["(3, 4) és (-4, -3)", "(4, 3) és (-3, -4)", "(0, 5) és (-5, 0)", "Nem metszik egymást"], correctAnswer: 0, explanation: "$x^2 + (x+1)^2 = 25 \\Rightarrow 2x^2 + 2x - 24 = 0 \\Rightarrow x=3 (y=4), x=-4 (y=-3)$." },
  { id: "q-cg-h-3", question: "Mi a $C(2, -1)$ csúcspontú, felfelé nyíló parabola egyenlete?", options: ["$y = (x - 2)^2 - 1$", "$y = (x + 2)^2 - 1$", "$y = -(x - 2)^2 - 1$", "$x = (y - 2)^2 - 1$"], correctAnswer: 0, explanation: "$y = a(x-u)^2 + v \\Rightarrow y = (x-2)^2 - 1$." },
  { id: "q-cg-h-4", question: "Mi a merőleges feltétele két vektorra vonatkozóan skaláris szorzattal?", options: ["$\\mathbf{a} \\cdot \\mathbf{b} = 0$", "$\\mathbf{a} \\cdot \\mathbf{b} = 1$", "$\\mathbf{a} \\cdot \\mathbf{b} = |a||b|$", "Párhuzamosak"], correctAnswer: 0, explanation: "Skaláris szorzat 0." },
  { id: "q-cg-h-5", question: "Mi a $2x - 3y = 7$ egyenes meredeksége ($m$)?", options: ["2/3", "-2/3", "3/2", "2"], correctAnswer: 0, explanation: "$3y = 2x - 7 \\Rightarrow y = (2/3)x - 7/3 \\Rightarrow m = 2/3$." },
  { id: "q-cg-h-6", question: "Mi a kör érintőjének egyenlete a $P(x_0, y_0)$ körponton az $(x-u)^2 + (y-v)^2 = r^2$ körre?", options: ["$(x_0-u)(x-u) + (y_0-v)(y-v) = r^2$", "$x x_0 + y y_0 = r$", "$y - y_0 = m(x - x_0)$", "$x^2 + y^2 = r^2$"], correctAnswer: 0, explanation: "A kör érintőjének egyenlete a megadott pontban." },
  { id: "q-cg-h-7", question: "Mekkora a $\\mathbf{a}(1, 2)$ és $\\mathbf{b}(3, 4)$ vektorok által bezárt szög koszinusza ($\\cos\\varphi$)?", options: ["$\\frac{11}{5\\sqrt{5}} = \\frac{11}{\\sqrt{125}}$", "1", "0", "1/2"], correctAnswer: 0, explanation: "$\\cos\\varphi = \\frac{1(3)+2(4)}{\\sqrt{1+4}\\sqrt{9+16}} = \\frac{3+8}{\\sqrt{5}\\cdot 5} = \\frac{11}{5\\sqrt{5}}$." },
  { id: "q-cg-h-8", question: "Mi az $x^2 + y^2 - 4x + 6y - 12 = 0$ kör sugara ($r$)?", options: ["5", "25", "7", "4"], correctAnswer: 0, explanation: "$(x-2)^2 - 4 + (y+3)^2 - 9 - 12 = 0 \\Rightarrow (x-2)^2 + (y+3)^2 = 25 \\Rightarrow r = 5$." },
  { id: "q-cg-h-9", question: "Mi a súlypont ($S$) koordinátája az $A(1, 2), B(3, 8), C(5, 2)$ csúcsú háromszögben?", options: ["S(3, 4)", "S(4, 5)", "S(3, 5)", "S(9, 12)"], correctAnswer: 0, explanation: "$S = ((1+3+5)/3, (2+8+2)/3) = (9/3, 12/3) = (3, 4)$." },
  { id: "q-cg-h-10", question: "Mi a parabola fókuszpontjának ($F$) koordinátája az $y = \\frac{1}{4} x^2$ egyenletnél?", options: ["F(0, 1)", "F(1, 0)", "F(0, 4)", "F(0, 1/4)"], correctAnswer: 0, explanation: "$y = \\frac{1}{4p} x^2 \\Rightarrow 4p = 4 \\Rightarrow p = 1 \\Rightarrow F(0, p) = F(0, 1)$." }
];

// Map containing dedicated quizzes for every subtopic in Geometria
export const geometriaQuizzes: Record<string, { easy: GraduationQuizQuestion[]; medium: GraduationQuizQuestion[]; hard: GraduationQuizQuestion[] }> = {
  'g-elem-geom': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-spatial-elements': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-geometric-loci': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-geom-transformations': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-congruence-trans': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-similarity-trans': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-other-transformations': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-shapes-3d-2d': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-planar-shapes': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-triangles': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-quadrilaterals': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-polygons': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-circle': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-spatial-shapes': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-vectors': { easy: quizCoordEasy, medium: quizCoordMedium, hard: quizCoordHard },
  'g-trigonometry': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-coordinate-geometry': { easy: quizCoordEasy, medium: quizCoordMedium, hard: quizCoordHard },
  'g-points-vectors': { easy: quizCoordEasy, medium: quizCoordMedium, hard: quizCoordHard },
  'g-line-equation': { easy: quizCoordEasy, medium: quizCoordMedium, hard: quizCoordHard },
  'g-circle-equation': { easy: quizCoordEasy, medium: quizCoordMedium, hard: quizCoordHard },
  'g-parabola-equation': { easy: quizCoordEasy, medium: quizCoordMedium, hard: quizCoordHard },
  'g-perimeter-area': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard },
  'g-surface-volume': { easy: quizGeomElemEasy, medium: quizGeomElemMedium, hard: quizGeomElemHard }
};
