import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 5: Függvények és koordináta-rendszer (Quizzes)
// ----------------------------------------------------------------------

export const quizFuggvenyekEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-fug-e-1",
    question: "Melyik negyedben található a $P(3; -4)$ pont a derékszögű koordináta-rendszerben?",
    options: ["I. negyed", "II. negyed", "III. negyed", "IV. negyed"],
    correctAnswer: 3,
    explanation: "A $P(x,y)$ koordinátái: $x > 0$ és $y < 0$, ez a IV. síknegyed."
  },
  {
    id: "q-fug-e-2",
    question: "Mennyi az $f(x) = 2x + 3$ függvény értéke az $x = 4$ helyen?",
    options: ["$7$", "$9$", "$11$", "$14$"],
    correctAnswer: 2,
    explanation: "$f(4) = 2 \\cdot 4 + 3 = 8 + 3 = 11$."
  },
  {
    id: "q-fug-e-3",
    question: "Mi a neve az $f(x) = 3x - 1$ típusú függvényeknek?",
    options: ["Másodfokú függvény", "Lineáris függvény", "Hatványfüggvény", "Abszolútérték-függvény"],
    correctAnswer: 1,
    explanation: "Az $f(x) = ax + b$ alakú függvényeket lineáris (egyenes) függvényeknek nevezzük."
  },
  {
    id: "q-fug-e-4",
    question: "Hol metszi az $f(x) = 2x - 6$ egyenes az y-tengelyt?",
    options: ["$(0; 6)$", "$(0; -6)$", "$(3; 0)$", "$(-6; 0)$"],
    correctAnswer: 1,
    explanation: "Az y-tengely metszéspontjában $x = 0$, így $y = 2(0) - 6 = -6$, a pont: $(0; -6)$."
  },
  {
    id: "q-fug-e-5",
    question: "Mi a meredeksége az $f(x) = -3x + 5$ egyenesnek?",
    options: ["$5$", "$-3$", "$3$", "$-5$"],
    correctAnswer: 1,
    explanation: "Az $y = ax + b$ egyenletben a meredekség az $x$ együtthatója, azaz $-3$."
  },
  {
    id: "q-fug-e-6",
    question: "Melyik pont van az y-tengelyen?",
    options: ["$(4; 0)$", "$(0; 5)$", "$(3; 3)$", "$(-2; 1)$"],
    correctAnswer: 1,
    explanation: "Az y-tengelyen lévő pontok első (x) koordinátája mindig $0$."
  },
  {
    id: "q-fug-e-7",
    question: "Melyik pont van az x-tengelyen?",
    options: ["$(0; -3)$", "$(-5; 0)$", "$(1; 2)$", "$(0; 0)$ az origón kívül"],
    correctAnswer: 1,
    explanation: "Az x-tengelyen lévő pontok második (y) koordinátája mindig $0$."
  },
  {
    id: "q-fug-e-8",
    question: "Mennyi az $f(x) = x^2$ értéke $x = -3$ esetén?",
    options: ["$-9$", "$6$", "$9$", "$-6$"],
    correctAnswer: 2,
    explanation: "f(-3) = (-3)^2 = (-3) \\cdot (-3) = 9."
  },
  {
    id: "q-fug-e-9",
    question: "Mi az origó koordinátája?",
    options: ["$(1; 1)$", "$(0; 0)$", "$(0; 1)$", "$(1; 0)$"],
    correctAnswer: 1,
    explanation: "A koordináta-rendszer kezdőpontja az origó: $(0; 0)$."
  },
  {
    id: "q-fug-e-10",
    question: "Párhuzamos-e az $y = 2x + 1$ és $y = 2x - 4$ egyenes?",
    options: ["Igen, mert a meredekségük megegyezik ($m=2$)", "Nem", "Metszik egymást az origóban", "Merőlegesek"],
    correctAnswer: 0,
    explanation: "Két egyenes akkor párhuzamos, ha a meredekségük azonos."
  }
];

export const quizFuggvenyekMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-fug-m-1",
    question: "Hol van az $f(x) = 3x - 12$ függvény zérushelye?",
    options: ["$x = 4$", "$x = -4$", "$x = 12$", "$x = 3$"],
    correctAnswer: 0,
    explanation: "Zérushelyen $f(x) = 0 \\Rightarrow 3x - 12 = 0 \\Rightarrow 3x = 12 \\Rightarrow x = 4$."
  },
  {
    id: "q-fug-m-2",
    question: "Mi az egyenlete annak az egyenesnek, amely áthalad a $P(0; 4)$ ponton és meredeksége $m = -2$?",
    options: ["$y = -2x + 4$", "$y = 4x - 2$", "$y = 2x + 4$", "$y = -2x - 4$"],
    correctAnswer: 0,
    explanation: "Az egyenes tengelymetszet alakja $y = mx + b$, ahol $m = -2$ és $b = 4$, így $y = -2x + 4$."
  },
  {
    id: "q-fug-m-3",
    question: "Melyik pont fekszik az $y = x^2 - 2x + 1$ parabolán?",
    options: ["$(2; 3)$", "$(3; 4)$", "$(-1; 0)$", "$(1; 2)$"],
    correctAnswer: 1,
    explanation: "Behelyettesítve $x = 3$-at: $y = 3^2 - 2(3) + 1 = 9 - 6 + 1 = 4$, a pont: $(3; 4)$."
  },
  {
    id: "q-fug-m-4",
    question: "Milyen transzformációval kapjuk az $f(x) = |x - 2| + 3$ függvény grafikonját az $y = |x|$ alaptípusból?",
    options: ["2 egység jobbra, 3 egység fel", "2 egység balra, 3 egység fel", "2 egység jobbra, 3 egység le", "2 egység le, 3 egység jobbra"],
    correctAnswer: 0,
    explanation: "Az $x$ melletti $-2$ a 2 egységgel jobbra tolást jelenti az x-tengely mentén, a $+3$ pedig a 3 egységgel feljebb tolást az y-tengely mentén."
  },
  {
    id: "q-fug-m-5",
    question: "Mennyi az $A(1; 2)$ és $B(4; 6)$ pontok távolsága a síkban?",
    options: ["$3$", "$4$", "$5$", "$7$"],
    correctAnswer: 2,
    explanation: "Pithagorasz-tétellel: $d = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$."
  },
  {
    id: "q-fug-m-6",
    question: "Mi az $f(x) = -x^2 + 4x$ parabola tengelypontjának (csúcspontjának) x-koordinátája?",
    options: ["$x = 2$", "$x = -2$", "$x = 4$", "$x = 0$"],
    correctAnswer: 0,
    explanation: "A zérushelyek $x=0$ és $x=4$. A szimmetriatengely a kettő számtani közepe: $x = 2$."
  },
  {
    id: "q-fug-m-7",
    question: "Melyik tartományon szigorúan monoton növekvő az $f(x) = (x-3)^2$ függvény?",
    options: ["]-\\infty; 3]", "[3; +\\infty[", "Mindenütt növekvő", "]-\\infty; 0]"],
    correctAnswer: 1,
    explanation: "A parabola csúcsa az $x=3$ helyen van, ettől jobbra (azaz $[3; +\\infty[$ tartományon) szigorúan növekszik."
  },
  {
    id: "q-fug-m-8",
    question: "Melyik függvény páratlan függvény az alábbiak közül?",
    options: ["$f(x) = x^2$", "$f(x) = x^3$", "$f(x) = |x|$", "$f(x) = x^2 + 1$"],
    correctAnswer: 1,
    explanation: "Az $f(x) = x^3$ grafikonja az origóra szimmetrikus, teljesül rá $f(-x) = -f(x)$."
  },
  {
    id: "q-fug-m-9",
    question: "Mennyi a felezőpontja az $A(-2; 4)$ és $B(6; 2)$ szakasznak?",
    options: ["$F(2; 3)$", "$F(4; 6)$", "$F(2; 2)$", "$F(4; 3)$"],
    correctAnswer: 0,
    explanation: "$F\\left(\\frac{-2+6}{2}; \\frac{4+2}{2}\\right) = F(2; 3)$."
  },
  {
    id: "q-fug-m-10",
    question: "Melyik x értékre nem értelmezhető az $f(x) = \\frac{5}{x-3}$ függvény?",
    options: ["$x = 0$", "$x = 3$", "$x = -3$", "$x = 5$"],
    correctAnswer: 1,
    explanation: "A nevező nem lehet nullával egyenlő, így $x - 3 \\neq 0 \\Rightarrow x \\neq 3$."
  }
];

export const quizFuggvenyekHard: AdmissionQuizQuestion[] = [
  {
    id: "q-fug-h-1",
    question: "Melyik pontban metszik egymást az $y = 2x + 1$ és az $y = -x + 7$ egyenesek?",
    options: ["$(2; 5)$", "$(3; 4)$", "$(1; 3)$", "$(4; 9)$"],
    correctAnswer: 0,
    explanation: "Egyenlővé tesszük a két egyenletet: $2x + 1 = -x + 7 \\Rightarrow 3x = 6 \\Rightarrow x = 2$. Ekkor $y = 2(2) + 1 = 5$. Metszéspont: $(2; 5)$."
  },
  {
    id: "q-fug-h-2",
    question: "Mi a maximális értéke az $f(x) = -2x^2 + 8x - 3$ másodfokú függvénynek?",
    options: ["$5$", "$3$", "$8$", "$2$"],
    correctAnswer: 0,
    explanation: "Teljes négyzetté alakítás: $-2(x^2 - 4x) - 3 = -2(x-2)^2 + 8 - 3 = -2(x-2)^2 + 5$. A maximum az $x=2$ helyen $5$."
  },
  {
    id: "q-fug-h-3",
    question: "Milyen $m$ meredekség esetén merőleges az $y = \frac{1}{3}x - 2$ egyenesre egy másik egyenes?",
    options: ["$m = -3$", "$m = 3$", "$m = -1/3$", "$m = 1/3$"],
    correctAnswer: 0,
    explanation: "Merőleges egyenesek meredekségének szorzata $-1$: $m_1 \\cdot m_2 = -1 \\Rightarrow \\frac{1}{3} \\cdot m_2 = -1 \\Rightarrow m_2 = -3$."
  },
  {
    id: "q-fug-h-4",
    question: "Adott az $f(x) = \\sqrt{2x - 6}$ függvény. Mi a legbővebb értelmezési tartománya?",
    options: ["$[3; +\\infty[$", "]$-\\infty; 3]$", "$[0; +\\infty[$", "$]3; +\\infty[$"],
    correctAnswer: 0,
    explanation: "Gyök alatti kifejezés nem lehet negatív: $2x - 6 \\ge 0 \\Rightarrow 2x \\ge 6 \\Rightarrow x \\ge 3$."
  },
  {
    id: "q-fug-h-5",
    question: "Az $y = ax^2 + bx + c$ parabola áthalad a $(0; 3)$, $(1; 6)$ és $(-1; 2)$ pontokon. Mennyi $a$ értéke?",
    options: ["$1$", "$2$", "$3$", "$0$"],
    correctAnswer: 0,
    explanation: "$(0;3) \\Rightarrow c = 3$. $(1;6) \\Rightarrow a + b + 3 = 6 \\Rightarrow a + b = 3$. $(-1;2) \\Rightarrow a - b + 3 = 2 \\Rightarrow a - b = -1$. Összeadva $2a = 2 \\Rightarrow a = 1$."
  },
  {
    id: "q-fug-h-6",
    question: "Hány közös pontja van az $f(x) = x^2 - 4x + 4$ parabolának az x-tengellyel?",
    options: ["Pontosan 1 (érinti)", "2 közös pontja van", "Nincs közös pontja", "Végtelen sok"],
    correctAnswer: 0,
    explanation: "A kifejezés $(x-2)^2 = 0$, a diszkrimináns $D = 16 - 16 = 0$, így pontosan 1 közös pontja van: az $x=2$ érintési pont."
  },
  {
    id: "q-fug-h-7",
    question: "Mi a periódusa az $f(x) = \\sin(2x)$ trigonometrikus függvénynek?",
    options: ["$\\pi$", "$2\\pi$", "$\\pi/2$", "$4\\pi$"],
    correctAnswer: 0,
    explanation: "A $\\sin(x)$ periódusa $2\\pi$. A $\\sin(k \\cdot x)$ periódusa $\\frac{2\\pi}{k} = \\frac{2\\pi}{2} = \\pi$."
  },
  {
    id: "q-fug-h-8",
    question: "Mennyi az $f(x) = \\log_2(x-1)$ függvény értéke az $x = 9$ helyen?",
    options: ["$3$", "$4$", "$8$", "$2$"],
    correctAnswer: 0,
    explanation: "$f(9) = \\log_2(9-1) = \\log_2(8) = 3$, mert $2^3 = 8$."
  },
  {
    id: "q-fug-h-9",
    question: "Melyik egyenes felezi az $A(1; 1)$ és $B(5; 5)$ pontok által meghatározott szakaszt merőlegesen?",
    options: ["$y = -x + 6$", "$y = x$", "$y = -x + 4$", "$y = -x + 3$"],
    correctAnswer: 0,
    explanation: "Felezőpont: $F(3; 3)$. AB meredeksége $m = \\frac{5-1}{5-1} = 1$. Merőleges meredeksége $m' = -1$. Egyenlete $y - 3 = -1(x - 3) \\Rightarrow y = -x + 6$."
  },
  {
    id: "q-fug-h-10",
    question: "Milyen $k$ értékre lesz az $y = kx - 5$ egyenes párhuzamos a $2x - 4y = 8$ egyenessel?",
    options: ["$k = 0{,}5$", "$k = 2$", "$k = -0{,}5$", "$k = -2$"],
    correctAnswer: 0,
    explanation: "Az egyenes egyenlete $4y = 2x - 8 \\Rightarrow y = 0{,}5x - 2$. A meredeksége $0{,}5$, így $k = 0{,}5$."
  }
];
