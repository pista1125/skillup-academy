import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 3: Algebra és egyenletek (Quizzes)
// ----------------------------------------------------------------------

export const quizAlgebraEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-alg-e-1",
    question: "Mennyi az $x + 5 = 12$ egyenlet megoldása?",
    options: ["$x = 5$", "$x = 7$", "$x = 17$", "$x = 6$"],
    correctAnswer: 1,
    explanation: "Mindkét oldalból kivonunk 5-öt: $x = 12 - 5 = 7$."
  },
  {
    id: "q-alg-e-2",
    question: "Mennyi a $2x = 10$ egyenlet gyöke?",
    options: ["$x = 2$", "$x = 5$", "$x = 20$", "$x = 8$"],
    correctAnswer: 1,
    explanation: "Mindkét oldalt osztjuk 2-vel: $x = 10 / 2 = 5$."
  },
  {
    id: "q-alg-e-3",
    question: "Vond össze az egynemű kifejezéseket: $3a + 4a$!",
    options: ["$7a^2$", "$7a$", "$12a$", "$7$"],
    correctAnswer: 1,
    explanation: "Az együtthatókat összeadjuk: $3 + 4 = 7$, így $7a$."
  },
  {
    id: "q-alg-e-4",
    question: "Mennyi az $a = 3$ helyettesítési értéke a $2a + 1$ kifejezésben?",
    options: ["$5$", "$7$", "$6$", "$9$"],
    correctAnswer: 1,
    explanation: "$2 \\cdot 3 + 1 = 6 + 1 = 7$."
  },
  {
    id: "q-alg-e-5",
    question: "Bontsd fel a zárójelet: $2(x + 3)$!",
    options: ["$2x + 3$", "$2x + 6$", "$x + 6$", "$6x$"],
    correctAnswer: 1,
    explanation: "A zárójel minden tagját megszorozzuk 2-vel: $2 \\cdot x + 2 \\cdot 3 = 2x + 6$."
  },
  {
    id: "q-alg-e-6",
    question: "Mennyi a $y - 4 = 3$ egyenlet megoldása?",
    options: ["$y = 1$", "$y = 7$", "$y = -1$", "$y = 12$"],
    correctAnswer: 1,
    explanation: "Mindkét oldalhoz hozzáadunk 4-et: $y = 3 + 4 = 7$."
  },
  {
    id: "q-alg-e-7",
    question: "Mennyi az $\\frac{x}{3} = 4$ egyenlet megoldása?",
    options: ["$x = 12$", "$x = 1$", "$x = 7$", "$x = 3/4$"],
    correctAnswer: 0,
    explanation: "Mindkét oldalt megszorozzuk 3-mal: $x = 4 \\cdot 3 = 12$."
  },
  {
    id: "q-alg-e-8",
    question: "Mennyi a $5x - 2x$ összevont alakja?",
    options: ["$3x$", "$3x^2$", "$7x$", "$10x$"],
    correctAnswer: 0,
    explanation: "$5 - 2 = 3$, így $3x$."
  },
  {
    id: "q-alg-e-9",
    question: "Mi a hatványa $x \\cdot x$-nek?",
    options: ["$2x$", "$x^2$", "$x+x$", "$x^3$"],
    correctAnswer: 1,
    explanation: "Azonos alapú tényezők szorzata: $x \\cdot x = x^2$."
  },
  {
    id: "q-alg-e-10",
    question: "Oldd meg az egyenletet: $3x + 2 = 11$!",
    options: ["$x = 3$", "$x = 4$", "$x = 5$", "$x = 2$"],
    correctAnswer: 0,
    explanation: "Kivonunk 2-t: $3x = 9$, osztunk 3-mal: $x = 3$."
  }
];

export const quizAlgebraMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-alg-m-1",
    question: "Oldd meg az egyenletet: $4x - 5 = 2x + 7$!",
    options: ["$x = 6$", "$x = 12$", "$x = 3$", "$x = 1$"],
    correctAnswer: 0,
    explanation: "Kivonunk $2x$-et: $2x - 5 = 7$. Hozzáadunk 5-öt: $2x = 12$. Osztunk 2-vel: $x = 6$."
  },
  {
    id: "q-alg-m-2",
    question: "Mennyi az $x = -2$ helyettesítési értéke a $3x^2 - 4x + 1$ kifejezésben?",
    options: ["$21$", "$5$", "$17$", "$-3$"],
    correctAnswer: 0,
    explanation: "$3(-2)^2 - 4(-2) + 1 = 3(4) + 8 + 1 = 12 + 8 + 1 = 21$."
  },
  {
    id: "q-alg-m-3",
    question: "Bontsd fel a zárójelet és vond össze: $3(2x - 1) - 4(x + 2)$!",
    options: ["$2x - 11$", "$2x + 5$", "$10x - 11$", "$2x - 5$"],
    correctAnswer: 0,
    explanation: "$6x - 3 - 4x - 8 = (6x - 4x) + (-3 - 8) = 2x - 11$."
  },
  {
    id: "q-alg-m-4",
    question: "Oldd meg az egyenlőtlenséget: $3x + 4 > 13$!",
    options: ["$x > 3$", "$x < 3$", "$x > 5.6$", "$x > 9$"],
    correctAnswer: 0,
    explanation: "Kivonunk 4-et: $3x > 9$. Osztunk 3-mal: $x > 3$."
  },
  {
    id: "q-alg-m-5",
    question: "Két szám összege $24$, különbségük $6$. Melyik a nagyobbik szám?",
    options: ["$15$", "$18$", "$12$", "$9$"],
    correctAnswer: 0,
    explanation: "Egyenletrendszer: $a + b = 24$ és $a - b = 6$. Összeadva a két egyenletet: $2a = 30 \\Rightarrow a = 15$."
  },
  {
    id: "q-alg-m-6",
    question: "Melyik nevezetes azonosság felel meg a $(a+b)^2$ kifejezésnek?",
    options: ["$a^2 + b^2$", "$a^2 + 2ab + b^2$", "$a^2 - 2ab + b^2$", "$2a + 2b$"],
    correctAnswer: 1,
    explanation: "A kéttagú összeg négyzete: $(a+b)^2 = a^2 + 2ab + b^2$."
  },
  {
    id: "q-alg-m-7",
    question: "Alakítsd szorzattá kiemeléssel: $6x^2 - 9x$!",
    options: ["$3x(2x - 3)$", "$3(2x^2 - 3x)$", "$x(6x - 9)$", "$3x(2x + 3)$"],
    correctAnswer: 0,
    explanation: "A legnagyobb közös kiemelhető tényező a $3x$: $3x(2x - 3)$."
  },
  {
    id: "q-alg-m-8",
    question: "Oldd meg az egyenletet: $\\frac{x+2}{3} = \\frac{x-1}{2}$!",
    options: ["$x = 7$", "$x = 5$", "$x = 1$", "$x = 4$"],
    correctAnswer: 0,
    explanation: "Keresztbeszorzás: $2(x+2) = 3(x-1) \\Rightarrow 2x + 4 = 3x - 3 \\Rightarrow x = 7$."
  },
  {
    id: "q-alg-m-9",
    question: "Egy apa 3-szor annyi idős, mint a fia. 10 év múlva kettőjük életkorának összege 76 év lesz. Hány éves most a fiú?",
    options: ["$14$ éves", "$12$ éves", "$16$ éves", "$10$ éves"],
    correctAnswer: 0,
    explanation: "Most a fiú $x$, apa $3x$. 10 év múlva $x+10$ és $3x+10$. Összegük: $4x + 20 = 76 \\Rightarrow 4x = 56 \\Rightarrow x = 14$."
  },
  {
    id: "q-alg-m-10",
    question: "Mennyi a fele a $2^{10}$ hatványnak?",
    options: ["$1^{10}$", "$2^5$", "$2^9$", "$1^5$"],
    correctAnswer: 2,
    explanation: "$\\frac{2^{10}}{2^1} = 2^{10-1} = 2^9$."
  }
];

export const quizAlgebraHard: AdmissionQuizQuestion[] = [
  {
    id: "q-alg-h-1",
    question: "Oldd meg az abszolútértékes egyenletet: $|2x - 3| = 7$!",
    options: ["$x = 5$ vagy $x = -2$", "$x = 5$ vagy $x = 2$", "$x = 2$ vagy $x = -5$", "$x = 5$ az egyetlen megoldás"],
    correctAnswer: 0,
    explanation: "Két eset van: $2x - 3 = 7 \\Rightarrow 2x = 10 \\Rightarrow x = 5$, vagy $2x - 3 = -7 \\Rightarrow 2x = -4 \\Rightarrow x = -2$."
  },
  {
    id: "q-alg-h-2",
    question: "Egyszerűsítsd a törtet: $\\frac{x^2 - 9}{x^2 - 3x}$!",
    options: ["$\\frac{x+3}{x}$", "$\\frac{x-3}{x}$", "$\\frac{3}{x}$", "$\\frac{x+3}{x-3}$"],
    correctAnswer: 0,
    explanation: "Szorzattá alakítás: $\\frac{(x-3)(x+3)}{x(x-3)} = \\frac{x+3}{x}$."
  },
  {
    id: "q-alg-h-3",
    question: "Egy téglalap területe $x^2 + 5x + 6$. Ha az egyik oldala $x+2$, mennyi a másik oldala?",
    options: ["$x+3$", "$x+1$", "$x+4$", "$x-3$"],
    correctAnswer: 0,
    explanation: "A másodfokú kifejezés szorzattá alakítása: $x^2 + 5x + 6 = (x+2)(x+3)$."
  },
  {
    id: "q-alg-h-4",
    question: "Melyek az $x^2 - 5x = 0$ egyenlet gyökei?",
    options: ["$x_1 = 0, x_2 = 5$", "$x_1 = 5, x_2 = -5$", "$x = 5$ az egyetlen gyök", "$x_1 = 0, x_2 = -5$"],
    correctAnswer: 0,
    explanation: "Kiemeléssel: $x(x - 5) = 0$. Egy szorzat akkor 0, ha valamelyik tényezője 0, így $x = 0$ vagy $x = 5$."
  },
  {
    id: "q-alg-h-5",
    question: "Két kétjegyű szám számjegyeinek összege 9. Ha a számjegyeket felcseréljük, az új szám 27-tel nagyobb az eredetinél. Mi az eredeti szám?",
    options: ["$36$", "$27$", "$45$", "$63$"],
    correctAnswer: 0,
    explanation: "Ha az eredeti $10a + b$, felcserélve $10b + a$. $9b - 9a = 27 \\Rightarrow b - a = 3$. Mivel $a + b = 9$, így $a = 3, b = 6$. A szám: 36."
  },
  {
    id: "q-alg-h-6",
    question: "Számítsd ki $x$ értékét: $\\sqrt{3x + 1} = 4$!",
    options: ["$x = 5$", "$x = 3$", "$x = 16$", "$x = 5.33$"],
    correctAnswer: 0,
    explanation: "Négyzetre emelünk: $3x + 1 = 16 \\Rightarrow 3x = 15 \\Rightarrow x = 5$."
  },
  {
    id: "q-alg-h-7",
    question: "Oldd meg a törtes egyenletet: $\\frac{3}{x-1} + \\frac{2}{x+1} = \\frac{5}{x^2-1}$!",
    options: ["$x = 6/5$", "$x = 4/5$", "$x = 1$", "$nincs megoldás$"],
    correctAnswer: 0,
    explanation: "Közös nevező $x^2 - 1 = (x-1)(x+1)$. $3(x+1) + 2(x-1) = 5 \\Rightarrow 3x + 3 + 2x - 2 = 5 \\Rightarrow 5x + 1 = 5 \\Rightarrow 5x = 4 \\Rightarrow x = 4/5$."
  },
  {
    id: "q-alg-h-8",
    question: "Milyen $k$ paraméter esetén lesz az $x^2 - 6x + k = 0$ egyenletnek egyetlen valós gyöke?",
    options: ["$k = 9$", "$k = 36$", "$k = 3$", "$k = 0$"],
    correctAnswer: 0,
    explanation: "Egyetlen gyök esetén a diszkrimináns 0: $D = (-6)^2 - 4(1)(k) = 36 - 4k = 0 \\Rightarrow 4k = 36 \\Rightarrow k = 9$."
  },
  {
    id: "q-alg-h-9",
    question: "Számítsd ki: $(2^3)^2 \\cdot 2^{-4}$ értékét!",
    options: ["$4$", "$2$", "$8$", "$16$"],
    correctAnswer: 0,
    explanation: "$(2^3)^2 = 2^6$. Így $2^6 \\cdot 2^{-4} = 2^{6-4} = 2^2 = 4$."
  },
  {
    id: "q-alg-h-10",
    question: "Egy gyalogos A-ból B-be 4 km/h sebességgel megy, majd visszafelé biciklivel 12 km/h sebességgel halad. Ha az teljes oda-vissza út 4 órát vett igénybe, milyen messze van A és B?",
    options: ["$12$ km", "$16$ km", "$8$ km", "$24$ km"],
    correctAnswer: 0,
    explanation: "Idők: $\\frac{s}{4} + \\frac{s}{12} = 4 \\Rightarrow \\frac{3s + s}{12} = 4 \\Rightarrow \\frac{4s}{12} = 4 \\Rightarrow \\frac{s}{3} = 4 \\Rightarrow s = 12$ km."
  }
];
