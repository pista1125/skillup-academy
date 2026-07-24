import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 6: Geometriai alakzatok (Quizzes)
// ----------------------------------------------------------------------

export const quizGeometriaEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-geom-e-1",
    question: "Hány fok a háromszög belső szögeinek összege?",
    options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$270^\\circ$"],
    correctAnswer: 1,
    explanation: "Bármely háromszög belső szögeinek összege mindig $180^\\circ$."
  },
  {
    id: "q-geom-e-2",
    question: "Hány fok a négyszögek belső szögeinek összege?",
    options: ["$180^\\circ$", "$360^\\circ$", "$540^\\circ$", "$270^\\circ$"],
    correctAnswer: 1,
    explanation: "Minden négyszög belső szögeinek összege $360^\\circ$."
  },
  {
    id: "q-geom-e-3",
    question: "Mi a neve annak a háromszögnek, amelynek minden oldala egyenlő hosszúságú?",
    options: ["Derékszögű háromszög", "Egyenlő szárú háromszög", "Szabályos (egyenlő oldalú) háromszög", "Tompaszögű háromszög"],
    correctAnswer: 2,
    explanation: "A szabályos háromszög mindhárom oldala és belső szöge ($60^\\circ$) egyenlő."
  },
  {
    id: "q-geom-e-4",
    question: "Melyik tétel igaz derékszögű háromszögekre?",
    options: ["Pithagorasz-tétel ($a^2 + b^2 = c^2$)", "Thalész-tétel", "Euler-tétel", "Fibonacci-tétel"],
    correctAnswer: 0,
    explanation: "A Pithagorasz-tétel szerint a két befogó négyzeteinek összege egyenlő az átfogó négyzetével."
  },
  {
    id: "q-geom-e-5",
    question: "Egy derékszögű háromszög befogói $3$ cm és $4$ cm. Mennyi az átfogója?",
    options: ["$5$ cm", "$6$ cm", "$7$ cm", "$25$ cm"],
    correctAnswer: 0,
    explanation: "$c^2 = 3^2 + 4^2 = 9 + 16 = 25 \\Rightarrow c = 5$ cm."
  },
  {
    id: "q-geom-e-6",
    question: "Mennyi a szabályos háromszög egy belső szöge?",
    options: ["$45^\\circ$", "$60^\\circ$", "$90^\\circ$", "$120^\\circ$"],
    correctAnswer: 1,
    explanation: "$180^\\circ / 3 = 60^\\circ$."
  },
  {
    id: "q-geom-e-7",
    question: "Hány átlója van egy négyszögnek?",
    options: ["$1$", "$2$", "$4$", "$6$"],
    correctAnswer: 1,
    explanation: "A négyszögeknek 2 átlójuk van."
  },
  {
    id: "q-geom-e-8",
    question: "Hány fokos a derékszög?",
    options: ["$45^\\circ$", "$90^\\circ$", "$180^\\circ$", "$360^\\circ$"],
    correctAnswer: 1,
    explanation: "A derékszög pontosan $90^\\circ$."
  },
  {
    id: "q-geom-e-9",
    question: "Mi a párhuzamos oldalpárral rendelkező négyszög neve?",
    options: ["Deltoid", "Traéz", "Rombusz", "Téglalap"],
    correctAnswer: 1,
    explanation: "A trapéz olyan négyszög, amelynek van legalább egy párhuzamos oldalpárja."
  },
  {
    id: "q-geom-e-10",
    question: "Mi a neve a négy egyenlő oldalú négyszögnek?",
    options: ["Rombusz", "Traéz", "Deltoid", "Paralelogramma"],
    correctAnswer: 0,
    explanation: "A rombusz olyan négyszög, amelynek minden oldala egyenlő hosszúságú."
  }
];

export const quizGeometriaMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-geom-m-1",
    question: "Egy derékszögű háromszög átfogója $13$ cm, az egyik befogója $5$ cm. Mennyi a másik befogó?",
    options: ["$8$ cm", "$12$ cm", "$10$ cm", "$11$ cm"],
    correctAnswer: 1,
    explanation: "$b^2 = 13^2 - 5^2 = 169 - 25 = 144 \\Rightarrow b = 12$ cm."
  },
  {
    id: "q-geom-m-2",
    question: "Egy egyenlő szárú háromszög szárszöge $40^\\circ$. Hány fokosak az alapon fekvő szögei?",
    options: ["$70^\\circ$ és $70^\\circ$", "$40^\\circ$ és $40^\\circ$", "$60^\\circ$ és $60^\\circ$", "$80^\\circ$ és $80^\\circ$"],
    correctAnswer: 0,
    explanation: "Az alapon fekvő szögek összege: $180^\\circ - 40^\\circ = 140^\\circ$. Egy szög: $140^\\circ / 2 = 70^\\circ$."
  },
  {
    id: "q-geom-m-3",
    question: "Hány átlója van egy konvex ötszögnek?",
    options: ["$5$", "$10$", "$8$", "$6$"],
    correctAnswer: 0,
    explanation: "Az átlók száma: $\\frac{n(n-3)}{2} = \\frac{5(5-3)}{2} = \\frac{5 \\cdot 2}{2} = 5$."
  },
  {
    id: "q-geom-m-4",
    question: "Hány fok a konvex hattszög belső szögeinek összege?",
    options: ["$540^\\circ$", "$720^\\circ$", "$900^\\circ$", "$360^\\circ$"],
    correctAnswer: 1,
    explanation: "$(n-2) \\cdot 180^\\circ = (6-2) \\cdot 180^\\circ = 4 \\cdot 180^\\circ = 720^\\circ$."
  },
  {
    id: "q-geom-m-5",
    question: "Egy derékszögű háromszög átfogójához tartozó súlyvonala $6$ cm. Mennyi az átfogó hossza?",
    options: ["$6$ cm", "$12$ cm", "$18$ cm", "$24$ cm"],
    correctAnswer: 1,
    explanation: "Thalész-tétel miatt a derékszögű háromszög átfogóhoz tartozó súlyvonala a kör sugara, ami az átfogó fele: $c = 2 \\cdot 6 = 12$ cm."
  },
  {
    id: "q-geom-m-6",
    question: "Egy téglalap oldalai $6$ cm és $8$ cm. Mennyi az átlójának a hossza?",
    options: ["$10$ cm", "$12$ cm", "$14$ cm", "$9$ cm"],
    correctAnswer: 0,
    explanation: "$d = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$ cm."
  },
  {
    id: "q-geom-m-7",
    question: "Melyik állítás IGAZ a paralelogrammára?",
    options: ["Átlói merőlegesek egymásra", "Átlói felezik egymást", "Átlói egyenlő hosszúságúak", "Belső szögei mindig derékszögek"],
    correctAnswer: 1,
    explanation: "Minden paralelogramma átlói felezik egymást."
  },
  {
    id: "q-geom-m-8",
    question: "Hány fokosak a rombusz szomszédos szögeinek összege?",
    options: ["$90^\\circ$", "$180^\\circ$", "$360^\\circ$", "$270^\\circ$"],
    correctAnswer: 1,
    explanation: "A paralelogrammák (így a rombusz) szomszédos szögei kiegészítő szögek, összegük $180^\\circ$."
  },
  {
    id: "q-geom-m-9",
    question: "Egy derékszögű háromszög egyik hegyesszöge $35^\\circ$. Hány fokos a másik hegyesszöge?",
    options: ["$45^\\circ$", "$55^\\circ$", "$65^\\circ$", "$145^\\circ$"],
    correctAnswer: 1,
    explanation: "$90^\\circ - 35^\\circ = 55^\\circ$."
  },
  {
    id: "q-geom-m-10",
    question: "Hány simmetriatengelye van egy négyzetnek?",
    options: ["$2$", "$4$", "$8$", "$v\\ddot{a}gtelen$"],
    correctAnswer: 1,
    explanation: "A négyzetnek 4 szimmetriatengelye van (2 oldalfelező és 2 átló)."
  }
];

export const quizGeometriaHard: AdmissionQuizQuestion[] = [
  {
    id: "q-geom-h-1",
    question: "Egy rombusz átlói $12$ cm és $16$ cm. Mennyi a rombusz oldalhossza?",
    options: ["$10$ cm", "$14$ cm", "$20$ cm", "$15$ cm"],
    correctAnswer: 0,
    explanation: "A rombusz átlói merőlegesen felezik egymást. A félátlók: $6$ cm és $8$ cm. Pithagorasz-tétellel: $a = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ cm."
  },
  {
    id: "q-geom-h-2",
    question: "Egy konvex sokszög átlóinak száma 20. Hány oldalú a sokszög?",
    options: ["$8$", "$7$", "$10$", "$12$"],
    correctAnswer: 0,
    explanation: "$\\frac{n(n-3)}{2} = 20 \\Rightarrow n(n-3) = 40 \\Rightarrow 8 \\cdot 5 = 40 \\Rightarrow n = 8$."
  },
  {
    id: "q-geom-h-3",
    question: "Egy szabályos sokszög egy belső szöge $135^\\circ$. Hány oldalú a sokszög?",
    options: ["$6$", "$8$", "$10$", "$12$"],
    correctAnswer: 1,
    explanation: "Külső szög: $180^\\circ - 135^\\circ = 45^\\circ$. Oldalak száma: $360^\\circ / 45^\\circ = 8$ (nyolcszög)."
  },
  {
    id: "q-geom-h-4",
    question: "Egy derékszögű háromszög átfogóhoz tartozó magassága az átfogót $4$ cm és $9$ cm hosszúságú darabokra osztja. Mennyi a magasság hossza?",
    options: ["$6$ cm", "$6.5$ cm", "$13$ cm", "$36$ cm"],
    correctAnswer: 0,
    explanation: "Magasságtétel szerint: $m^2 = p \\cdot q = 4 \\cdot 9 = 36 \\Rightarrow m = 6$ cm."
  },
  {
    id: "q-geom-h-5",
    question: "Egy trapéz párhuzamos oldalai $10$ cm és $16$ cm. Mennyi a trapéz középvonalának hossza?",
    options: ["$13$ cm", "$12$ cm", "$14$ cm", "$26$ cm"],
    correctAnswer: 0,
    explanation: "A trapéz középvonala a párhuzamos oldalak számtani közepe: $k = \\frac{a+c}{2} = \\frac{10+16}{2} = 13$ cm."
  },
  {
    id: "q-geom-h-6",
    question: "Egy körbe írt négyszög (húrnégyszög) szemközti szögeinek összege mindig:",
    options: ["$180^\\circ$", "$360^\\circ$", "$90^\\circ$", "Attól függ a négyszögtől"],
    correctAnswer: 0,
    explanation: "A húrnégyszögek tétele szerint a szemközti szögek összege mindig $180^\\circ$."
  },
  {
    id: "q-geom-h-7",
    question: "Mennyi a szabályos háromszög magassága, ha az oldala $a = 6$ cm?",
    options: ["$3\\sqrt{3}$ cm", "$3$ cm", "$6\\sqrt{3}$ cm", "$4.5$ cm"],
    correctAnswer: 0,
    explanation: "$m = \\frac{a\\sqrt{3}}{2} = \\frac{6\\sqrt{3}}{2} = 3\\sqrt{3}$ cm."
  },
  {
    id: "q-geom-h-8",
    question: "Egy derékszögű háromszög szögei $30^\\circ, 60^\\circ, 90^\\circ$. Ha a $30^\\circ$-os szöggel szemközti befogó $5$ cm, mennyi az átfogó?",
    options: ["$10$ cm", "$5\\sqrt{3}$ cm", "$15$ cm", "$20$ cm"],
    correctAnswer: 0,
    explanation: "A $30^\\circ$-os szöggel szemközti befogó a szabályos háromszög fele miatt pontosan az átfogó fele: $c = 2 \\cdot 5 = 10$ cm."
  },
  {
    id: "q-geom-h-9",
    question: "Hány fokos szöget zár be a kocka lapátlója a kocka élével a lapon belül?",
    options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correctAnswer: 0,
    explanation: "A négyzet lapátlója felezi a $90^\\circ$-os belső szöget, így $45^\\circ$."
  },
  {
    id: "q-geom-h-10",
    question: "Egy egyenlő szárú trapéz szárai $5$ cm-esek, alapjai $8$ cm és $14$ cm. Mennyi a trapéz magassága?",
    options: ["$4$ cm", "$3$ cm", "$5$ cm", "$\\sqrt{21}$ cm"],
    correctAnswer: 0,
    explanation: "A levetített kis darab az alapon: $\\frac{14-8}{2} = 3$ cm. Pithagorasz-tétel a derékszögű háromszögre: $m = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = 4$ cm."
  }
];
