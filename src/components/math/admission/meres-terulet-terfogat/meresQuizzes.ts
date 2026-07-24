import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 9: Mérés, terület és térfogat (Quizzes)
// ----------------------------------------------------------------------

export const quizMeresEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-mer-e-1",
    question: "Mennyi a téglalap területe, ha oldalai $a = 5$ cm és $b = 8$ cm?",
    options: ["$13$ $\\text{cm}^2$", "$26$ $\\text{cm}^2$", "$40$ $\\text{cm}^2$", "$20$ $\\text{cm}^2$"],
    correctAnswer: 2,
    explanation: "$T = a \\cdot b = 5 \\cdot 8 = 40$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-e-2",
    question: "Mennyi a négyzet kerülete, ha oldala $a = 6$ cm?",
    options: ["$12$ cm", "$24$ cm", "$36$ cm", "$18$ cm"],
    correctAnswer: 1,
    explanation: "$K = 4a = 4 \\cdot 6 = 24$ cm."
  },
  {
    id: "q-mer-e-3",
    question: "Mennyi a négyzet területe, ha oldala $a = 6$ cm?",
    options: ["$24$ $\\text{cm}^2$", "$36$ $\\text{cm}^2$", "$12$ $\\text{cm}^2$", "$48$ $\\text{cm}^2$"],
    correctAnswer: 1,
    explanation: "$T = a^2 = 6^2 = 36$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-e-4",
    question: "Hány deciméter $1$ méter?",
    options: ["$10$ dm", "$100$ dm", "$1000$ dm", "$5$ dm"],
    correctAnswer: 0,
    explanation: "$1$ m = $10$ dm."
  },
  {
    id: "q-mer-e-5",
    question: "Hány $\\text{cm}^2$ $1$ $\\text{dm}^2$?",
    options: ["$10$ $\\text{cm}^2$", "$100$ $\\text{cm}^2$", "$1000$ $\\text{cm}^2$", "$50$ $\\text{cm}^2$"],
    correctAnswer: 1,
    explanation: "Terület mértékegységénél a váltószám $100$: $1$ $\\text{dm}^2$ = $100$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-e-6",
    question: "Hány liter víz fér el $1$ $\\text{dm}^3$ térfogatban?",
    options: ["$1$ liter", "$10$ liter", "$100$ liter", "$0.1$ liter"],
    correctAnswer: 0,
    explanation: "$1$ $\\text{dm}^3$ = $1$ liter."
  },
  {
    id: "q-mer-e-7",
    question: "Mennyi a kocka térfogata, ha éle $a = 3$ cm?",
    options: ["$9$ $\\text{cm}^3$", "$18$ $\\text{cm}^3$", "$27$ $\\text{cm}^3$", "$54$ $\\text{cm}^3$"],
    correctAnswer: 2,
    explanation: "$V = a^3 = 3^3 = 27$ $\\text{cm}^3$."
  },
  {
    id: "q-mer-e-8",
    question: "Mennyi a téglatest térfogata, ha élei $a = 2$ cm, $b = 3$ cm, $c = 4$ cm?",
    options: ["$9$ $\\text{cm}^3$", "$24$ $\\text{cm}^3$", "$52$ $\\text{cm}^3$", "$12$ $\\text{cm}^3$"],
    correctAnswer: 1,
    explanation: "$V = a \\cdot b \\cdot c = 2 \\cdot 3 \\cdot 4 = 24$ $\\text{cm}^3$."
  },
  {
    id: "q-mer-e-9",
    question: "Hány óra $180$ perc?",
    options: ["$2$ óra", "$3$ óra", "$4$ óra", "$1.8$ óra"],
    correctAnswer: 1,
    explanation: "$180 / 60 = 3$ óra."
  },
  {
    id: "q-mer-e-10",
    question: "Mennyi a kör területe, ha sugara $r = 1$ cm? (használj $\\pi \\approx 3.14$)",
    options: ["$3.14$ $\\text{cm}^2$", "$6.28$ $\\text{cm}^2$", "$1.57$ $\\text{cm}^2$", "$12.56$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "$T = r^2 \\pi = 1^2 \\cdot 3.14 = 3.14$ $\\text{cm}^2$."
  }
];

export const quizMeresMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-mer-m-1",
    question: "Mennyi a háromszög területe, ha alapja $a = 8$ cm és a hozzá tartozó magassága $m_a = 5$ cm?",
    options: ["$40$ $\\text{cm}^2$", "$20$ $\\text{cm}^2$", "$13$ $\\text{cm}^2$", "$26$ $\\text{cm}^2$"],
    correctAnswer: 1,
    explanation: "$T = \\frac{a \\cdot m_a}{2} = \\frac{8 \\cdot 5}{2} = 20$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-m-2",
    question: "Mennyi a trapéz területe, ha párhuzamos alapjai $a = 6$ cm, $c = 10$ cm, és magassága $m = 4$ cm?",
    options: ["$32$ $\\text{cm}^2$", "$64$ $\\text{cm}^2$", "$16$ $\\text{cm}^2$", "$40$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "$T = \\frac{a+c}{2} \\cdot m = \\frac{6+10}{2} \\cdot 4 = 8 \\cdot 4 = 32$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-m-3",
    question: "Mennyi a rombusz területe, ha átlói $e = 6$ cm és $f = 8$ cm?",
    options: ["$48$ $\\text{cm}^2$", "$24$ $\\text{cm}^2$", "$14$ $\\text{cm}^2$", "$28$ $\\text{cm}^2$"],
    correctAnswer: 1,
    explanation: "$T = \\frac{e \\cdot f}{2} = \\frac{6 \\cdot 8}{2} = 24$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-m-4",
    question: "Hány $\\text{cm}^3$ $2.5$ liter víz?",
    options: ["$25$ $\\text{cm}^3$", "$250$ $\\text{cm}^3$", "$2500$ $\\text{cm}^3$", "$25000$ $\\text{cm}^3$"],
    correctAnswer: 2,
    explanation: "$2.5$ liter = $2.5$ $\\text{dm}^3$ = $2500$ $\\text{cm}^3$."
  },
  {
    id: "q-mer-m-5",
    question: "Mennyi a kocka felszíne, ha éle $a = 4$ cm?",
    options: ["$64$ $\\text{cm}^2$", "$96$ $\\text{cm}^2$", "$48$ $\\text{cm}^2$", "$16$ $\\text{cm}^2$"],
    correctAnswer: 1,
    explanation: "$A = 6a^2 = 6 \\cdot 4^2 = 6 \\cdot 16 = 96$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-m-6",
    question: "Mennyi a kör kerülete, ha átmérője $d = 10$ cm? (használj $\\pi \\approx 3.14$)",
    options: ["$31.4$ cm", "$62.8$ cm", "$78.5$ cm", "$15.7$ cm"],
    correctAnswer: 0,
    explanation: "$K = d \\pi = 10 \\cdot 3.14 = 31.4$ cm."
  },
  {
    id: "q-mer-m-7",
    question: "Egy téglalap területe $48$ $\\text{cm}^2$, egyik oldala $6$ cm. Mennyi a téglalap kerülete?",
    options: ["$28$ cm", "$14$ cm", "$26$ cm", "$32$ cm"],
    correctAnswer: 0,
    explanation: "Másik oldal $b = 48 / 6 = 8$ cm. Kerület $K = 2(a+b) = 2(6+8) = 28$ cm."
  },
  {
    id: "q-mer-m-8",
    question: "Egy hengeres tartály alapkörének területe $15$ $\\text{m}^2$, magassága $4$ m. Hány köbméter víz fér bele?",
    options: ["$30$ $\\text{m}^3$", "$60$ $\\text{m}^3$", "$120$ $\\text{m}^3$", "$45$ $\\text{m}^3$"],
    correctAnswer: 1,
    explanation: "$V = T_{\\text{alap}} \\cdot m = 15 \\cdot 4 = 60$ $\\text{m}^3$."
  },
  {
    id: "q-mer-m-9",
    question: "Hány másodperc $1.5$ óra?",
    options: ["$90$ mp", "$5400$ mp", "$3600$ mp", "$7200$ mp"],
    correctAnswer: 1,
    explanation: "$1.5$ óra = $90$ perc = $90 \\cdot 60 = 5400$ másodperc."
  },
  {
    id: "q-mer-m-10",
    question: "Mennyi a szabályos háromszög területe, ha oldala $a = 4$ cm?",
    options: ["$4\\sqrt{3}$ $\\text{cm}^2$", "$8\\sqrt{3}$ $\\text{cm}^2$", "$16$ $\\text{cm}^2$", "$2\\sqrt{3}$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "$T = \\frac{a^2\\sqrt{3}}{4} = \\frac{16\\sqrt{3}}{4} = 4\\sqrt{3}$ $\\text{cm}^2$."
  }
];

export const quizMeresHard: AdmissionQuizQuestion[] = [
  {
    id: "q-mer-h-1",
    question: "Egy derékszögű háromszög átfogója $10$ cm, egyik befogója $6$ cm. Mennyi a háromszög területe?",
    options: ["$24$ $\\text{cm}^2$", "$48$ $\\text{cm}^2$", "$30$ $\\text{cm}^2$", "$15$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "Másik befogó $b = \\sqrt{10^2 - 6^2} = 8$ cm. Terület $T = \\frac{a \\cdot b}{2} = \\frac{6 \\cdot 8}{2} = 24$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-h-2",
    question: "Egy kocka testen átlójának hossza $\\sqrt{27}$ cm. Mennyi a kocka térfogata?",
    options: ["$27$ $\\text{cm}^3$", "$9$ $\\text{cm}^3$", "$81$ $\\text{cm}^3$", "$64$ $\\text{cm}^3$"],
    correctAnswer: 0,
    explanation: "Testátló $d_t = a\\sqrt{3} = \\sqrt{27} = 3\\sqrt{3} \\Rightarrow a = 3$ cm. Térfogat $V = 3^3 = 27$ $\\text{cm}^3$."
  },
  {
    id: "q-mer-h-3",
    question: "Egy $6$ cm sugarú körből kivágunk egy $60^\\circ$-os középponti szögű körccikket. Mennyi a körcikk területe?",
    options: ["$6\\pi$ $\\text{cm}^2$", "$12\\pi$ $\\text{cm}^2$", "$36\\pi$ $\\text{cm}^2$", "$3\\pi$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "Teljes kör területe $T = r^2 \\pi = 36\\pi$. A $60^\\circ$-os körcikk a hatoda: $T = \\frac{36\\pi}{6} = 6\\pi$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-h-4",
    question: "Egy szabályos négyoldalú gúla alapéle $6$ cm, magassága $4$ cm. Mennyi a gúla térfogata?",
    options: ["$48$ $\\text{cm}^3$", "$144$ $\\text{cm}^3$", "$36$ $\\text{cm}^3$", "$72$ $\\text{cm}^3$"],
    correctAnswer: 0,
    explanation: "$V = \\frac{1}{3} T_{\\text{alap}} \\cdot m = \\frac{1}{3} (6^2) \\cdot 4 = \\frac{1}{3} (36) \\cdot 4 = 12 \\cdot 4 = 48$ $\\text{cm}^3$."
  },
  {
    id: "q-mer-h-5",
    question: "Egy gömb sugara $r = 3$ cm. Mennyi a gömb felszíne? (kifejezve $\\pi$-vel)",
    options: ["$36\\pi$ $\\text{cm}^2$", "$12\\pi$ $\\text{cm}^2$", "$108\\pi$ $\\text{cm}^2$", "$18\\pi$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "$A = 4\\pi r^2 = 4\\pi (3^2) = 36\\pi$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-h-6",
    question: "Egy gömb sugara $r = 3$ cm. Mennyi a gömb térfogata? (kifejezve $\\pi$-vel)",
    options: ["$36\\pi$ $\\text{cm}^3$", "$108\\pi$ $\\text{cm}^3$", "$27\\pi$ $\\text{cm}^3$", "$12\\pi$ $\\text{cm}^3$"],
    correctAnswer: 0,
    explanation: "$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi (27) = 36\\pi$ $\\text{cm}^3$."
  },
  {
    id: "q-mer-h-7",
    question: "Egy téglatest éleinek aránya $1 : 2 : 3$, térfogata $48$ $\\text{cm}^3$. Mennyi a leghosszabb éle?",
    options: ["$6$ cm", "$4$ cm", "$2$ cm", "$8$ cm"],
    correctAnswer: 0,
    explanation: "Élek: $x, 2x, 3x$. Térfogat $V = x \\cdot 2x \\cdot 3x = 6x^3 = 48 \\Rightarrow x^3 = 8 \\Rightarrow x = 2$ cm. Leghosszabb él $3x = 6$ cm."
  },
  {
    id: "q-mer-h-8",
    question: "Egy $10$ cm átmérőjű és $12$ cm magasságú egyenes henger felszíne mekkora? (kifejezve $\\pi$-vel)",
    options: ["$170\\pi$ $\\text{cm}^2$", "$120\\pi$ $\\text{cm}^2$", "$50\\pi$ $\\text{cm}^2$", "$140\\pi$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "Sugar $r = 5$ cm. $A = 2\\pi r^2 + 2\\pi r m = 2\\pi (25) + 2\\pi (5)(12) = 50\\pi + 120\\pi = 170\\pi$ $\\text{cm}^2$."
  },
  {
    id: "q-mer-h-9",
    question: "Hány liter víz van egy $2$ m hosszú, $1.5$ m széles és $1.2$ m mély medencében, ha az színültig teli van?",
    options: ["$3600$ liter", "$360$ liter", "$36.000$ liter", "$1800$ liter"],
    correctAnswer: 0,
    explanation: "Térfogat $V = 2 \\cdot 1.5 \\cdot 1.2 = 3.6$ $\\text{m}^3$ = $3600$ $\\text{dm}^3$ = $3600$ liter."
  },
  {
    id: "q-mer-h-10",
    question: "Egy egyenes kúp alapkörének sugara $r = 3$ cm, alkotója $a = 5$ cm. Mennyi a kúp térfogata? (kifejezve $\\pi$-vel)",
    options: ["$12\\pi$ $\\text{cm}^3$", "$15\\pi$ $\\text{cm}^3$", "$36\\pi$ $\\text{cm}^3$", "$45\\pi$ $\\text{cm}^3$"],
    correctAnswer: 0,
    explanation: "A kúp magassága Pithagorasszal: $m = \\sqrt{5^2 - 3^2} = 4$ cm. Térfogat $V = \\frac{1}{3} \\pi r^2 m = \\frac{1}{3} \\pi (9) (4) = 12\\pi$ $\\text{cm}^3$."
  }
];
