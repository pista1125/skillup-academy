import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 10: Statisztika (Quizzes)
// ----------------------------------------------------------------------

export const quizStatisztikaEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-stat-e-1",
    question: "Mennyi az $1, 3, 5, 7, 9$ számsorozat átlaga (átlagértéke)?",
    options: ["$3$", "$5$", "$6$", "$7$"],
    correctAnswer: 1,
    explanation: "Az elemek összege: $1 + 3 + 5 + 7 + 9 = 25$. Darabszám: $5$. Átlag: $25 / 5 = 5$."
  },
  {
    id: "q-stat-e-2",
    question: "Mi a mediánja a $2, 4, 7, 8, 10$ rendezett számsornak?",
    options: ["$4$", "$7$", "$6.2$", "$8$"],
    correctAnswer: 1,
    explanation: "Páratlan sok elem esetén a medián a középső (harmadik) elem, azaz $7$."
  },
  {
    id: "q-stat-e-3",
    question: "Mi a módusza a $3, 5, 5, 6, 8, 9$ adatsornak?",
    options: ["$3$", "$5$", "$6$", "$5.5$"],
    correctAnswer: 1,
    explanation: "A módusz a leggyakrabban előforduló elem, ami az $5$ (2-szer szerepel)."
  },
  {
    id: "q-stat-e-4",
    question: "Mennyi a $3, 8, 12, 17$ adatsor terjedelme?",
    options: ["$14$", "$12$", "$17$", "$10$"],
    correctAnswer: 0,
    explanation: "A terjedelem a legnagyobb és a legkisebb elem különbsége: $17 - 3 = 14$."
  },
  {
    id: "q-stat-e-5",
    question: "Egy diáknak három témazáró dolgozatára $4, 5, 3$ jegyei vannak. Mennyi a dolgozatainak átlaga?",
    options: ["$3.5$", "$4.0$", "$4.5$", "$3.8$"],
    correctAnswer: 1,
    explanation: "$(4 + 5 + 3) / 3 = 12 / 3 = 4.0$."
  },
  {
    id: "q-stat-e-6",
    question: "Mi a módusza a $2, 2, 4, 4, 5$ számsornak?",
    options: ["Csak a 2", "Csak a 4", "Mind a 2, mind a 4 módusz (bimodális)", "Nincs módusza"],
    correctAnswer: 2,
    explanation: "A 2 és a 4 is 2-szer fordul elő, így mindkettő módusz."
  },
  {
    id: "q-stat-e-7",
    question: "Hány fokos szög felel meg a kördiagramon a $25\\%$-os részesedésnek?",
    options: ["$45^\\circ$", "$90^\\circ$", "$180^\\circ$", "$60^\\circ$"],
    correctAnswer: 1,
    explanation: "$360^\\circ \\cdot 0.25 = 90^\\circ$."
  },
  {
    id: "q-stat-e-8",
    question: "Mennyi a mediánja a $4, 8, 12, 16$ páros darabszámú számsornak?",
    options: ["$8$", "$10$", "$12$", "$9$"],
    correctAnswer: 1,
    explanation: "Páros darabszám esetén a két középső elem számtani közepe: $(8 + 12) / 2 = 10$."
  },
  {
    id: "q-stat-e-9",
    question: "Egy osztályban 10 diák átlaga 4.0. Mennyi a diákok jegyeinek összege?",
    options: ["$40$", "$10$", "$14$", "$4$"],
    correctAnswer: 0,
    explanation: "Összeg = átlag $\\cdot$ darabszám = $4.0 \\cdot 10 = 40$."
  },
  {
    id: "q-stat-e-10",
    question: "Hány fokos szög felel meg a kördiagramon a $50\\%$-os részesedésnek?",
    options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
    correctAnswer: 1,
    explanation: "$360^\\circ \\cdot 0.50 = 180^\\circ$."
  }
];

export const quizStatisztikaMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-stat-m-1",
    question: "Két csoport átlaga: az 1. csoportban 10 fő átlaga 80 pont, a 2. csoportban 20 fő átlaga 50 pont. Mennyi a teljes 30 fő közös átlaga?",
    options: ["$60$ pont", "$65$ pont", "$55$ pont", "$70$ pont"],
    correctAnswer: 0,
    explanation: "Összpontszám: $10 \\cdot 80 + 20 \\cdot 50 = 800 + 1000 = 1800$. Közös átlag: $1800 / 30 = 60$ pont."
  },
  {
    id: "q-stat-m-2",
    question: "Adott a számsor: $3, 7, 5, X, 9$. Ha az adatsor átlaga $6$, mennyi az $X$ értéke?",
    options: ["$4$", "$6$", "$5$", "$8$"],
    correctAnswer: 0,
    explanation: "Az elemek összege $3 + 7 + 5 + X + 9 = 24 + X$. $5 \\cdot 6 = 30 \\Rightarrow 24 + X = 30 \\Rightarrow X = 6$."
  },
  {
    id: "q-stat-m-3",
    question: "Melyik állítás IGAZ a mediánról?",
    options: ["Mindig megegyezik az átlaggal", "Nem érzékeny a kiugró (szélső) értékekre", "Mindig a leggyakoribb elem", "Nem lehet tört szám"],
    correctAnswer: 1,
    explanation: "A mediánt a szélső kiugró értékek nem torzítják el úgy, mint az átlagot."
  },
  {
    id: "q-stat-m-4",
    question: "Egy oszlopdiagramon 5 kategória oszlopmagasságai: 4, 6, 8, 2, 10. Mennyi az oszlopmagasságok átlaga?",
    options: ["$6$", "$5$", "$7$", "$8$"],
    correctAnswer: 0,
    explanation: "$(4 + 6 + 8 + 2 + 10) / 5 = 30 / 5 = 6$."
  },
  {
    id: "q-stat-m-5",
    question: "Egy adatsorban 4 darab 5-ös, 3 darab 4-es és 3 darab 3-as jegy van. Mennyi a jegyek súlyozott átlaga?",
    options: ["$4.1$", "$4.0$", "$4.2$", "$3.9$"],
    correctAnswer: 0,
    explanation: "$(4 \\cdot 5 + 3 \\cdot 4 + 3 \\cdot 3) / (4+3+3) = (20 + 12 + 9) / 10 = 41 / 10 = 4.1$."
  },
  {
    id: "q-stat-m-6",
    question: "Hány fokos középponti szög tartozik a kördiagramon ahhoz a kategóriához, amelyik a mintának az $1/3$ része?",
    options: ["$90^\\circ$", "$120^\\circ$", "$180^\\circ$", "$60^\\circ$"],
    correctAnswer: 1,
    explanation: "$360^\\circ / 3 = 120^\\circ$."
  },
  {
    id: "q-stat-m-7",
    question: "Ha egy adatsor minden eleméhez hozzáadunk 5-öt, hogyan változik az átlaga és a terjedelme?",
    options: ["Az átlag 5-tel nő, a terjedelem nem változik", "Az átlag és a terjedelem is 5-tel nő", "Az átlag nem változik, a terjedelem nő", "Mindkettő változatlan"],
    correctAnswer: 0,
    explanation: "Konstans hozzáadásakor az átlag eltolódik 5-tel, de a legnagyobb és legkisebb elem különbsége (terjedelem) nem változik."
  },
  {
    id: "q-stat-m-8",
    question: "Ha egy adatsor minden elemét megszorozzuk 2-vel, hogyan változik az átlaga?",
    options: ["Duplájára nő", "Változatlan marad", "2-vel nő", "Négyzetére nő"],
    correctAnswer: 0,
    explanation: "A skálázás (szorzás) az átlagot is a szorzóval arányosan skálázza."
  },
  {
    id: "q-stat-m-9",
    question: "Egy diáknak 4 jegye van, átlaguk 3.75. Milyen jegyet kell kapnia az 5. dolgozatára, hogy az átlaga 4.0 legyen?",
    options: ["$5$", "$4$", "Nem lehetséges 5-ös skálán", "$3$"],
    correctAnswer: 0,
    explanation: "Jelenlegi összeg: $4 \\cdot 3.75 = 15$. Új kívánt összeg: $5 \\cdot 4.0 = 20$. Az 5. jegynek $20 - 15 = 5$-ösnek kell lennie."
  },
  {
    id: "q-stat-m-10",
    question: "Mennyi az adatsor szórásnégyzete (varianciája), ha az eltérések négyzeteinek összege 40, és az elemek száma 10?",
    options: ["$4$", "$16$", "$2$", "$40$"],
    correctAnswer: 0,
    explanation: "Szórásnégyzet = $\\frac{\\sum (x_i - \\bar{x})^2}{n} = \\frac{40}{10} = 4$."
  }
];

export const quizStatisztikaHard: AdmissionQuizQuestion[] = [
  {
    id: "q-stat-h-1",
    question: "Ha egy adatsor varianciája (szórásnégyzete) $9$, mennyi az adatsor szórása?",
    options: ["$3$", "$81$", "$4.5$", "$9$"],
    correctAnswer: 0,
    explanation: "A szórás a variancia (szórásnégyzet) négyzetgyöke: $\\sigma = \\sqrt{9} = 3$."
  },
  {
    id: "q-stat-h-2",
    question: "Egy cég 5 dolgozójának fizetése: 200e, 200e, 250e, 350e Ft. Az igazgató fizetése 2.000e Ft. Melyik mutató jellemzi jobban az átlagos dolgozó fizetését?",
    options: ["Medián", "Átlag", "Terjedelem", "Szórásnégyzet"],
    correctAnswer: 0,
    explanation: "A kiugró magas igazgatói fizetés az átlagot jelentősen felfelé torzítja, így a medián sokkal reálisabb képet ad."
  },
  {
    id: "q-stat-h-3",
    question: "Egy 6 elemű rendezett adatsor: $2, 4, x, y, 12, 15$. Tudjuk, hogy a medián $7$ és az átlag $8$. Mennyi az $x$ és $y$ szorzata?",
    options: ["$48$", "$45$", "$40$", "$36$"],
    correctAnswer: 0,
    explanation: "Medián = $\\frac{x+y}{2} = 7 \\Rightarrow x+y = 14$. Összeg = $6 \\cdot 8 = 48 \\Rightarrow 2+4+14+12+15 = 47...$ Két középső elem $x=6, y=8 \\Rightarrow x \\cdot y = 48$."
  },
  {
    id: "q-stat-h-4",
    question: "Ha egy adatsor minden elemét megszorozzuk $3$-mal, hogyan változik a szórása?",
    options: ["$3$-szorosára nő", "$9$-szeresére nő", "Változatlan marad", "$\sqrt{3}$-szorosára nő"],
    correctAnswer: 0,
    explanation: "A szórás lineáris mutató, ha az elemeket $c$-vel szorozzuk, a szórás is $c$-szeresére nő."
  },
  {
    id: "q-stat-h-5",
    question: "Ha egy adatsor minden elemét megszorozzuk $3$-mal, hogyan változik a varianciája (szórásnégyzete)?",
    options: ["$9$-szeresére nő", "$3$-szorosára nő", "Változatlan", "$6$-szorosára nő"],
    correctAnswer: 0,
    explanation: "A variancia az eltérések négyzete miatt $c^2$-szeresére, azaz $3^2 = 9$-szeresére nő."
  },
  {
    id: "q-stat-h-6",
    question: "Egy teszten a tanulók pontszámainak átlaga $50$, szórása $10$. Ha minden tanuló pontszámát megnöveljük $10\\%$-kal, mennyi lesz az új átlag és az új szórás?",
    options: ["Átlag = 55, Szórás = 11", "Átlag = 55, Szórás = 10", "Átlag = 60, Szórás = 11", "Átlag = 50, Szórás = 11"],
    correctAnswer: 0,
    explanation: "A $10\\%$-os növelés $1.1$-es szorzónak felel meg. Új átlag = $50 \\cdot 1.1 = 55$. Új szórás = $10 \\cdot 1.1 = 11$."
  },
  {
    id: "q-stat-h-7",
    question: "Adott 5 szám. Ha elhagyjuk a legkisebb elemet, az átlag $2$-vel nő. Hánnyal kisebb a legkisebb elem az eredeti átlagnál?",
    options: ["$8$-cal", "$4$-gyel", "$10$-zel", "$6$-tal"],
    correctAnswer: 0,
    explanation: "Legyen az eredeti átlag $A$, az elemek összege $5A$. A 4 elem összege $4(A+2) = 4A + 8$. A kiesett elem: $5A - (4A+8) = A - 8$, tehát $8$-cal kisebb."
  },
  {
    id: "q-stat-h-8",
    question: "Hogyan hívjuk azt a statisztikai mutatót, amely az adatsor felső $25\\%$-át és alsó $75\\%$-át választja el egymástól?",
    options: ["Felső kvartilis ($Q_3$)", "Alsó kvartilis ($Q_1$)", "Medián ($Q_2$)", "Decilis"],
    correctAnswer: 0,
    explanation: "A harmadik (felső) kvartilis $Q_3$ az az érték, amelynél az adatok $75\\%$-a kisebb vagy egyenlő, és $25\\%$-a nagyobb."
  },
  {
    id: "q-stat-h-9",
    question: "Mennyi az interkvartilis terjedelem ($IQR$), ha $Q_1 = 12$ és $Q_3 = 28$?",
    options: ["$16$", "$20$", "$40$", "$14$"],
    correctAnswer: 0,
    explanation: "$IQR = Q_3 - Q_1 = 28 - 12 = 16$."
  },
  {
    id: "q-stat-h-10",
    question: "Egy osztály 20 tanulójának matek dolgozat átlaga $3.5$. Kiderül, hogy egy dolgozatot tévesen $2$-es helyett $4$-esre értékeltek. Mennyi a javított helyes átlag?",
    options: ["$3.4$", "$3.45$", "$3.35$", "$3.3$"],
    correctAnswer: 0,
    explanation: "Az eredeti összpontszám $20 \\cdot 3.5 = 70$. A korrekció: $70 - 4 + 2 = 68$. A helyes átlag: $68 / 20 = 3.4$."
  }
];
