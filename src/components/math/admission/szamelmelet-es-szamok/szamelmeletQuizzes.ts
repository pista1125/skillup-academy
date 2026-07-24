import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 2: Számelmélet és számok (Quizzes)
// ----------------------------------------------------------------------

// 1. Műveletek törtekkel (30 questions)
export const quizTortekEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-num-t-e-1",
    question: "Mennyi $\\frac{1}{4} + \\frac{2}{4}$ értéke?",
    options: ["$\\frac{3}{8}$", "$\\frac{3}{4}$", "$\\frac{1}{2}$", "$\\frac{2}{4}$"],
    correctAnswer: 1,
    explanation: "Azonos nevezőjű törteknél a számlálókat összeadjuk, a nevező változatlan marad: $\\frac{1+2}{4} = \\frac{3}{4}$."
  },
  {
    id: "q-num-t-e-2",
    question: "Mennyi $\\frac{3}{5} - \\frac{1}{5}$ értéke?",
    options: ["$\\frac{2}{5}$", "$\\frac{2}{0}$", "$\\frac{4}{5}$", "$\\frac{1}{5}$"],
    correctAnswer: 0,
    explanation: "$\\frac{3-1}{5} = \\frac{2}{5}$."
  },
  {
    id: "q-num-t-e-3",
    question: "Mennyi $\\frac{1}{2} + \\frac{1}{4}$ értéke?",
    options: ["$\\frac{2}{6}$", "$\\frac{3}{4}$", "$\\frac{1}{4}$", "$\\frac{5}{4}$"],
    correctAnswer: 1,
    explanation: "Közös nevezőre hozunk: $\\frac{1}{2} = \\frac{2}{4}$, így $\\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}$."
  },
  {
    id: "q-num-t-e-4",
    question: "Mennyi $\\frac{2}{3} \\cdot \\frac{3}{4}$ legegyszerűbb alakja?",
    options: ["$\\frac{6}{12}$", "$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{2}{4}$"],
    correctAnswer: 1,
    explanation: "$\\frac{2 \\cdot 3}{3 \\cdot 4} = \\frac{6}{12} = \\frac{1}{2}$."
  },
  {
    id: "q-num-t-e-5",
    question: "Mennyi $\\frac{4}{5} : 2$ értéke?",
    options: ["$\\frac{8}{5}$", "$\\frac{2}{5}$", "$\\frac{4}{10}$", "$\\frac{2}{10}$"],
    correctAnswer: 1,
    explanation: "Egész számmal úgy osztunk törtet, hogy a számlálót osztjuk (ha lehet): $\\frac{4:2}{5} = \\frac{2}{5}$."
  },
  {
    id: "q-num-t-e-6",
    question: "Melyik tört azonos $\\frac{3}{6}$-dal egyszerűsítés után?",
    options: ["$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$", "$\\frac{3}{2}$"],
    correctAnswer: 1,
    explanation: "3-mal egyszerűsítve a számlálót és nevezőt: $\\frac{3:3}{6:3} = \\frac{1}{2}$."
  },
  {
    id: "q-num-t-e-7",
    question: "Mennyi $\\frac{3}{10} + \\frac{4}{10}$ értéke?",
    options: ["$\\frac{7}{20}$", "$\\frac{7}{10}$", "$\\frac{12}{10}$", "$\\frac{1}{10}$"],
    correctAnswer: 1,
    explanation: "$\\frac{3+4}{10} = \\frac{7}{10}$."
  },
  {
    id: "q-num-t-e-8",
    question: "Mennyi $1 - \\frac{1}{3}$ értéke?",
    options: ["$\\frac{1}{3}$", "$\\frac{2}{3}$", "$0$", "$\\frac{4}{3}$"],
    correctAnswer: 1,
    explanation: "$1 = \\frac{3}{3}$, így $\\frac{3}{3} - \\frac{1}{3} = \\frac{2}{3}$."
  },
  {
    id: "q-num-t-e-9",
    question: "Mennyi $\\frac{5}{6} - \\frac{1}{6}$ legegyszerűbb alakja?",
    options: ["$\\frac{4}{6}$", "$\\frac{2}{3}$", "$\\frac{1}{3}$", "$\\frac{5}{6}$"],
    correctAnswer: 1,
    explanation: "$\\frac{5-1}{6} = \\frac{4}{6} = \\frac{2}{3}$."
  },
  {
    id: "q-num-t-e-10",
    question: "Mennyi $\\frac{1}{3} \\cdot 3$ értéke?",
    options: ["$\\frac{3}{9}$", "$1$", "$\\frac{1}{9}$", "$3$"],
    correctAnswer: 1,
    explanation: "$\\frac{1}{3} \\cdot 3 = \\frac{3}{3} = 1$."
  }
];

export const quizTortekMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-num-t-m-1",
    question: "Mennyi $\\frac{2}{3} + \\frac{3}{4}$ értéke tiszta tört alakban?",
    options: ["$\\frac{5}{7}$", "$\\frac{17}{12}$", "$\\frac{11}{12}$", "$\\frac{5}{12}$"],
    correctAnswer: 1,
    explanation: "Közös nevező a 12: $\\frac{8}{12} + \\frac{9}{12} = \\frac{17}{12}$."
  },
  {
    id: "q-num-t-m-2",
    question: "Mennyi $\\frac{5}{6} - \\frac{3}{8}$ értéke a legkisebb közös nevezővel?",
    options: ["$\\frac{2}{2}$", "$\\frac{11}{24}$", "$\\frac{7}{24}$", "$\\frac{1}{12}$"],
    correctAnswer: 1,
    explanation: "A 6 és 8 legkisebb közös többszöröse 24. $\\frac{20}{24} - \\frac{9}{24} = \\frac{11}{24}$."
  },
  {
    id: "q-num-t-m-3",
    question: "Számítsd ki: $\\frac{3}{4} : \\frac{2}{5}$!",
    options: ["$\\frac{6}{20}$", "$\\frac{15}{8}$", "$\\frac{8}{15}$", "$\\frac{5}{9}$"],
    correctAnswer: 1,
    explanation: "Törtet törttel úgy osztunk, hogy az osztó reciprokával szorzunk: $\\frac{3}{4} \\cdot \\frac{5}{2} = \\frac{15}{8}$."
  },
  {
    id: "q-num-t-m-4",
    question: "Mennyi a $\\frac{4}{9}$ recipróka?",
    options: ["$-\\frac{4}{9}$", "$\\frac{9}{4}$", "$\\frac{1}{9}$", "$\\frac{9}{1}$"],
    correctAnswer: 1,
    explanation: "Egy $a/b$ tört recipróka a $b/a$ tört, azaz $\\frac{9}{4}$."
  },
  {
    id: "q-num-t-m-5",
    question: "Egy torta $\\frac{3}{8}$-át megettük. A maradék torta hányadrésze maradt meg?",
    options: ["$\\frac{5}{8}$", "$\\frac{3}{5}$", "$\\frac{1}{8}$", "$\\frac{1}{2}$"],
    correctAnswer: 0,
    explanation: "A teljes torta $1 = \\frac{8}{8}$. $1 - \\frac{3}{8} = \\frac{5}{8}$."
  },
  {
    id: "q-num-t-m-6",
    question: "Számítsd ki: $\\left(\\frac{1}{2} + \\frac{1}{3}\\right) \\cdot \\frac{6}{5}$!",
    options: ["$\\frac{5}{6}$", "$1$", "$\\frac{6}{5}$", "$\\frac{7}{6}$"],
    correctAnswer: 1,
    explanation: "Zárójelben: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$. Majd: $\\frac{5}{6} \\cdot \\frac{6}{5} = 1$."
  },
  {
    id: "q-num-t-m-7",
    question: "Mennyi $\\frac{7}{12} - \\frac{1}{4}$ legegyszerűbb alakja?",
    options: ["$\\frac{6}{8}$", "$\\frac{1}{3}$", "$\\frac{4}{12}$", "$\\frac{1}{2}$"],
    correctAnswer: 1,
    explanation: "$\\frac{7}{12} - \\frac{3}{12} = \\frac{4}{12} = \\frac{1}{3}$."
  },
  {
    id: "q-num-t-m-8",
    question: "Hány $12$-ed része a $3$-nak a $\\frac{3}{4}$?",
    options: ["$6$", "$9$", "$12$", "$3$"],
    correctAnswer: 1,
    explanation: "$\\frac{3}{4} = \\frac{9}{12}$, azaz $9$ darab tizenketted."
  },
  {
    id: "q-num-t-m-9",
    question: "Számítsd ki: $\\frac{5}{7} : \\frac{10}{21}$!",
    options: ["$\\frac{2}{3}$", "$\\frac{3}{2}$", "$\\frac{50}{147}$", "$\\frac{1}{2}$"],
    correctAnswer: 1,
    explanation: "$\\frac{5}{7} \\cdot \\frac{21}{10} = \\frac{5 \\cdot 21}{7 \\cdot 10} = \\frac{1 \\cdot 3}{1 \\cdot 2} = \\frac{3}{2}$."
  },
  {
    id: "q-num-t-m-10",
    question: "Melyik tört nagyobb: $\\frac{5}{8}$ vagy $\\frac{3}{5}$?",
    options: ["$\\frac{5}{8}$", "$\\frac{3}{5}$", "Egyenlőek", "Nem összehasonlíthatóak"],
    correctAnswer: 0,
    explanation: "Közös nevező a 40: $\\frac{5}{8} = \\frac{25}{40}$, míg $\\frac{3}{5} = \\frac{24}{40}$. Mivel $25 > 24$, így $\\frac{5}{8}$ a nagyobb."
  }
];

export const quizTortekHard: AdmissionQuizQuestion[] = [
  {
    id: "q-num-t-h-1",
    question: "Számítsd ki a lánctört értékét: $1 + \\frac{1}{1 + \\frac{1}{2}}$!",
    options: ["$\\frac{4}{3}$", "$\\frac{5}{3}$", "$\\frac{3}{2}$", "$\\frac{2}{3}$"],
    correctAnswer: 1,
    explanation: "Az alsó nevező: $1 + \\frac{1}{2} = \\frac{3}{2}$. Ennek recipróka $\\frac{2}{3}$. Így $1 + \\frac{2}{3} = \\frac{5}{3}$."
  },
  {
    id: "q-num-t-h-2",
    question: "Egy tartályban lévő víz $\\frac{2}{5}$-ét kiszivattyúztuk, majd a maradék $\frac{3}{4}$-ét. Ha még $15$ liter víz maradt, hány liter volt benne eredetileg?",
    options: ["$60$ liter", "$80$ liter", "$100$ liter", "$120$ liter"],
    correctAnswer: 2,
    explanation: "Az 1. szivattyúzás után megmaradt $\\frac{3}{5}$. Ennek a $\\frac{3}{4}$-ét elvéve megmarad a $\\frac{3}{5}$ része, ami $\\frac{3}{5} \\cdot \\frac{1}{4} = \\frac{3}{20}$. Ha $\\frac{3}{20}$ rész = 15 liter, akkor az egész = $15 \\cdot \\frac{20}{3} = 100$ liter."
  },
  {
    id: "q-num-t-h-3",
    question: "Melyik tört esik pontosan félútra a $\\frac{1}{3}$ és a $\\frac{1}{2}$ közé?",
    options: ["$\\frac{5}{12}$", "$\\frac{2}{5}$", "$\\frac{7}{24}$", "$\\frac{3}{8}$"],
    correctAnswer: 0,
    explanation: "A számtani közép: $\\frac{\\frac{1}{3} + \\frac{1}{2}}{2} = \\frac{\\frac{5}{6}}{2} = \\frac{5}{12}$."
  },
  {
    id: "q-num-t-h-4",
    question: "Számítsd ki: $\\frac{\\frac{2}{3} - \\frac{1}{4}}{\\frac{5}{6} + \\frac{1}{2}}$!",
    options: ["$\\frac{5}{16}$", "$\\frac{1}{4}$", "$\\frac{5}{12}$", "$\\frac{3}{8}$"],
    correctAnswer: 0,
    explanation: "Számláló: $\\frac{8-3}{12} = \\frac{5}{12}$. Nevező: $\\frac{5+3}{6} = \\frac{8}{6} = \\frac{4}{3}$. Osztás: $\\frac{5}{12} : \\frac{4}{3} = \\frac{5}{12} \\cdot \\frac{3}{4} = \\frac{5}{16}$."
  },
  {
    id: "q-num-t-h-5",
    question: "Az 1. munkás 1 óra alatt a munka $\\frac{1}{3}$-át, a 2. a $\\frac{1}{4}$-ét végzi el. A 3. mekkora részét végzi el 1 óra alatt, ha hárman együtt 1 óra alatt végznek?",
    options: ["$\\frac{5}{12}$", "$\\frac{1}{6}$", "$\\frac{1}{2}$", "$\\frac{7}{12}$"],
    correctAnswer: 0,
    explanation: "Együttes teljesítmény $1$. A 3. munkás része: $1 - \\left(\\frac{1}{3} + \\frac{1}{4}\\right) = 1 - \\frac{7}{12} = \\frac{5}{12}$."
  },
  {
    id: "q-num-t-h-6",
    question: "Melyik az a legkisebb pozitív egész $n$, amire $\\frac{n}{60}$ egyszerűsíthetetlen tört, ha $1 \\le n \\le 60$?",
    options: ["$1$", "$7$", "$11$", "$13$"],
    correctAnswer: 0,
    explanation: "Az $n=1$ esetén a tört $\\frac{1}{60}$, ami már egyszerűsíthetetlen."
  },
  {
    id: "q-num-t-h-7",
    question: "Számítsd ki a szorzatot: $\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{4}\\right)\\dots\\left(1 - \\frac{1}{10}\\right)$!",
    options: ["$\\frac{1}{10}$", "$\\frac{1}{9}$", "$\\frac{1}{2}$", "$\\frac{9}{10}$"],
    correctAnswer: 0,
    explanation: "$\\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{3}{4} \\dots \\frac{9}{10}$. Átlósan egyszerűsítve csak az első számláló és az utolsó nevező marad: $\\frac{1}{10}$."
  },
  {
    id: "q-num-t-h-8",
    question: "Ha $x = \\frac{3}{4}$ és $y = \\frac{2}{5}$, mennyi az $\\frac{x+y}{x-y}$ kifejezés értéke?",
    options: ["$\\frac{23}{7}$", "$\\frac{15}{7}$", "$\\frac{23}{20}$", "$\\frac{7}{20}$"],
    correctAnswer: 0,
    explanation: "$x+y = \\frac{15+8}{20} = \\frac{23}{20}$. $x-y = \\frac{15-8}{20} = \\frac{7}{20}$. Osztásuk: $\\frac{23}{20} : \\frac{7}{20} = \\frac{23}{7}$."
  },
  {
    id: "q-num-t-h-9",
    question: "Egy osztályban a tanulók $\\frac{3}{5}$-e lány. A lányok $\\frac{2}{3}$-a szőke. Az osztály hányadrésze szőke lány?",
    options: ["$\\frac{2}{5}$", "$\\frac{1}{5}$", "$\\frac{3}{10}$", "$\\frac{4}{15}$"],
    correctAnswer: 0,
    explanation: "$\\frac{3}{5} \\cdot \\frac{2}{3} = \\frac{2}{5}$."
  },
  {
    id: "q-num-t-h-10",
    question: "Számítsd ki: $\\frac{3}{8} \\cdot \\frac{4}{9} + \\frac{5}{6} : \\frac{5}{3}$!",
    options: ["$\\frac{2}{3}$", "$\\frac{1}{6}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$"],
    correctAnswer: 0,
    explanation: "1. kifejezés: $\\frac{3 \\cdot 4}{8 \\cdot 9} = \\frac{1}{6}$. 2. kifejezés: $\\frac{5}{6} \\cdot \\frac{3}{5} = \\frac{3}{6} = \\frac{1}{2}$. Összegük: $\\frac{1}{6} + \\frac{3}{6} = \\frac{4}{6} = \\frac{2}{3}$."
  }
];
