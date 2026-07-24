import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 8: Háromszögek nevezetes vonalai (Quizzes)
// ----------------------------------------------------------------------

export const quizHaromszogVonalaiEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-hvon-e-1",
    question: "Melyik nevezetes vonal felezi a háromszög belső szögét?",
    options: ["Oldalfelező merőleges", "Szögfelező", "Súlyvonal", "Magasságvonal"],
    correctAnswer: 1,
    explanation: "A szögfelező a belső szöget két egyenlő részre osztja."
  },
  {
    id: "q-hvon-e-2",
    question: "Melyik vonal köti össze a csúcsot a szemközti oldal felezőpontjával?",
    options: ["Súlyvonal", "Magasságvonal", "Szögfelező", "Középvonal"],
    correctAnswer: 0,
    explanation: "A súlyvonal a háromszög csúcsát a szemközti oldal felezőpontjával összekötő szakasz."
  },
  {
    id: "q-hvon-e-3",
    question: "Mi a neve a háromszög csúcsából a szemközti oldal egyenesére bocsátott merőlegesnek?",
    options: ["Súlyvonal", "Magasságvonal", "Oldalfelező merőleges", "Középvonal"],
    correctAnswer: 1,
    explanation: "A magasságvonal a csúcsból a szemközti oldal egyenesére bocsátott merőleges."
  },
  {
    id: "q-hvon-e-4",
    question: "Hol metszik egymást a háromszög oldalfelező merőlegesei?",
    options: ["A beírható kör középpontjában", "A köré írható kör középpontjában", "A súlypontban", "A magasságpontban"],
    correctAnswer: 1,
    explanation: "Az oldalfelező merőlegesek metszéspontja a háromszög köré írható körének középpontja."
  },
  {
    id: "q-hvon-e-5",
    question: "Hol metszik egymást a háromszög belső szögfelezői?",
    options: ["A beírható kör középpontjában", "A köré írható kör középpontjában", "A súlypontban", "A magasságpontban"],
    correctAnswer: 0,
    explanation: "A belső szögfelezők metszéspontja a háromszögbe írható kör középpontja."
  },
  {
    id: "q-hvon-e-6",
    question: "Melyik pont osztja a súlyvonalat $2 : 1$ arányban a csúcstól számítva?",
    options: ["Magasságpont", "Súlypont", "Köré írható kör középpontja", "Beírható kör középpontja"],
    correctAnswer: 1,
    explanation: "A súlypont a súlyvonalakat $2:1$ arányban osztja a csúcstól számítva."
  },
  {
    id: "q-hvon-e-7",
    question: "Hol található tompaszögű háromszög esetén a magasságpont?",
    options: ["A háromszög belsejében", "A háromszögön kívül", "Az egyik csúcsban", "Az átfogón"],
    correctAnswer: 1,
    explanation: "Tompaszögű háromszög magasságpontja a háromszögön kívülre esik."
  },
  {
    id: "q-hvon-e-8",
    question: "Hol van derékszögű háromszög esetén a köré írható kör középpontja?",
    options: ["Az átfogó felezőpontjában", "A derékszögű csúcsban", "A háromszög belsejében", "A leghosszabb magasságon"],
    correctAnswer: 0,
    explanation: "Thalész-tétel szerint a derékszögű háromszög köré írható körének középpontja az átfogó felezőpontja."
  },
  {
    id: "q-hvon-e-9",
    question: "Hány nevezetes vonal vonható be összesen egy háromszögben vonaltípusonként?",
    options: ["$3$", "$6$", "$12$", "$4$"],
    correctAnswer: 0,
    explanation: "Minden vonaltípusból (magasság, súlyvonal, szögfelező, oldalfelező) 3-3 darab van."
  },
  {
    id: "q-hvon-e-10",
    question: "Melyik háromszögben esik egybe a magasságvonal, súlyvonal és szögfelező mind a három csúcsból?",
    options: ["Szabályos (egyenlő oldalú) háromszögben", "Derékszögű háromszögben", "Egyenlő szárú háromszögben (csak az alaphoz tartozó)", "Bármely háromszögben"],
    correctAnswer: 0,
    explanation: "A szabályos háromszögben mindhárom csúcsból egybeesik az összes nevezetes vonal."
  }
];

export const quizHaromszogVonalaiMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-hvon-m-1",
    question: "Egy háromszög súlyvonala $12$ cm. Milyen hosszú darabokra osztja ezt a súlyvonalat a súlypont?",
    options: ["$8$ cm és $4$ cm", "$6$ cm és $6$ cm", "$9$ cm és $3$ cm", "$10$ cm és $2$ cm"],
    correctAnswer: 0,
    explanation: "A $2:1$ arányú osztás miatt: $\\frac{2}{3} \\cdot 12 = 8$ cm (a csúcstól) és $\\frac{1}{3} \\cdot 12 = 4$ cm (az oldaltól)."
  },
  {
    id: "q-hvon-m-2",
    question: "Mi a neve a két oldalfelező pontot összekötő szakasznak?",
    options: ["Súlyvonal", "Középvonal", "Magasságvonal", "Átló"],
    correctAnswer: 1,
    explanation: "A háromszög középvonala két oldal felezőpontját összekötő szakasz."
  },
  {
    id: "q-hvon-m-3",
    question: "Egy háromszög egyik oldala $a = 10$ cm. Mennyi a vele párhuzamos középvonal hossza?",
    options: ["$5$ cm", "$10$ cm", "$20$ cm", "$7.5$ cm"],
    correctAnswer: 0,
    explanation: "A középvonal párhuzamos a harmadik oldallal és hossza annak pontosan a fele: $10 / 2 = 5$ cm."
  },
  {
    id: "q-hvon-m-4",
    question: "Hol található derékszögű háromszög magasságpontja?",
    options: ["A derékszögű csúcsban", "Az átfogó felezőpontjában", "A háromszög belsejében", "A leghosszabb oldalon"],
    correctAnswer: 0,
    explanation: "Derékszögű háromszögben a két befogó maga is magasságvonal, így metszéspontjuk a derékszögű csúcs."
  },
  {
    id: "q-hvon-m-5",
    question: "Egy háromszög három középvonala a háromszöget hány darab egybevágó kis háromszögre osztja?",
    options: ["$3$", "$4$", "$6$", "$2$"],
    correctAnswer: 1,
    explanation: "A három középvonal 4 darab egymással egybevágó és az eredeti háromszöghöz hasonló kis háromszögre osztja az eredeti háromszöget."
  },
  {
    id: "q-hvon-m-6",
    question: "Egy háromszög területe $24$ $\\text{cm}^2$. Hány $\\text{cm}^2$ területű kis háromszögeket hoznak létre a középvonalai?",
    options: ["$6$ $\\text{cm}^2$", "$8$ $\\text{cm}^2$", "$12$ $\\text{cm}^2$", "$4$ $\\text{cm}^2$"],
    correctAnswer: 0,
    explanation: "A 4 egybevágó kis háromszög területe: $24 / 4 = 6$ $\\text{cm}^2$."
  },
  {
    id: "q-hvon-m-7",
    question: "Melyik állítás IGAZ a súlyvonalakra vonatkozóan?",
    options: ["A 3 súlyvonal 6 egyenlő területű háromszögre osztja a háromszöget", "A súlyvonalak merőlegesek az oldalakra", "A súlyvonalak felezik a belső szögeket", "A súlyvonalak a köré írható kör sugaraival egyenlőek"],
    correctAnswer: 0,
    explanation: "A háromszög 3 súlyvonala a háromszöget 6 darab egyenlő területű kis háromszögre bontja."
  },
  {
    id: "q-hvon-m-8",
    question: "Egy egyenlő szárú háromszög alapon fekvő szöge $50^\\circ$. Hány fokos szöget zár be az alaphoz tartozó magasságvonal a szárral?",
    options: ["$40^\\circ$", "$50^\\circ$", "$25^\\circ$", "$90^\\circ$"],
    correctAnswer: 0,
    explanation: "Az alaphoz tartozó magasságvonal derékszögű háromszöget alkot a szárral: $90^\\circ - 50^\\circ = 40^\\circ$."
  },
  {
    id: "q-hvon-m-9",
    question: "Hol fekszik a kihegyezett (hegyesszögű) háromszög köré írható körének középpontja?",
    options: ["A háromszög belsejében", "A háromszögön kívül", "Az egyik oldalon", "Az egyik csúcsban"],
    correctAnswer: 0,
    explanation: "Hegyesszögű háromszög esetén a köré írható kör középpontja a háromszög belsejébe esik."
  },
  {
    id: "q-hvon-m-10",
    question: "Hol esik tompaszögű háromszög esetén a köré írható kör középpontja?",
    options: ["A háromszögön kívül (a tompaszöggel szemközti oldal mentén)", "A háromszög belsejében", "A tompaszögű csúcsban", "A leghosszabb oldal felezőpontjában"],
    correctAnswer: 0,
    explanation: "Tompaszögű háromszög esetén a köré írható kör középpontja a háromszögön kívülre esik."
  }
];

export const quizHaromszogVonalaiHard: AdmissionQuizQuestion[] = [
  {
    id: "q-hvon-h-1",
    question: "Egy háromszögben a súlypont és a csúcs közötti szakasz $10$ cm. Milyen hosszú a súlyvonal többi része a súlyponttól az oldalfelezőig?",
    options: ["$5$ cm", "$10$ cm", "$2.5$ cm", "$7.5$ cm"],
    correctAnswer: 0,
    explanation: "A $2:1$ arány miatt a rövidebbik rész a hosszabbik fele: $10 / 2 = 5$ cm."
  },
  {
    id: "q-hvon-h-2",
    question: "Egy háromszög oldalai $6$ cm, $8$ cm és $10$ cm. Mennyi a háromszög köré írható kör sugara ($R$)?",
    options: ["$5$ cm", "$4$ cm", "$3$ cm", "$6$ cm"],
    correctAnswer: 0,
    explanation: "A $6, 8, 10$ oldalú háromszög derékszögű ($6^2 + 8^2 = 10^2$). A köré írható kör sugara az átfogó fele: $R = 10 / 2 = 5$ cm."
  },
  {
    id: "q-hvon-h-3",
    question: "Egy derékszögű háromszög befogói $6$ cm és $8$ cm. Mennyi a beírható körének sugara ($r$)?",
    options: ["$2$ cm", "$3$ cm", "$1.5$ cm", "$4$ cm"],
    correctAnswer: 0,
    explanation: "Derékszögű háromszögre $r = \\frac{a+b-c}{2} = \\frac{6+8-10}{2} = \\frac{4}{2} = 2$ cm."
  },
  {
    id: "q-hvon-h-4",
    question: "Mi a neve annak az egyenesnek, amelyen a háromszög magasságpontja, súlypontja és a köré írható kör középpontja egy vonalba esik?",
    options: ["Euler-egyenes", "Simson-egyenes", "Pascal-egyenes", "Fermat-egyenes"],
    correctAnswer: 0,
    explanation: "Az Euler-egyenes az az egyenes, amelyen a magasságpont ($M$), súlypont ($S$) és a körülírt kör középpontja ($K$) fekszik."
  },
  {
    id: "q-hvon-h-5",
    question: "Milyen arányban osztja a súlypont ($S$) a magasságpont ($M$) és a körülírt kör középpontja ($K$) közötti szakaszt az Euler-egyenesen?",
    options: ["$MS : SK = 2 : 1$", "$MS : SK = 1 : 1$", "$MS : SK = 3 : 1$", "$MS : SK = 1 : 2$"],
    correctAnswer: 0,
    explanation: "Az Euler-egyenesen a súlypont $2:1$ arányban osztja az $MK$ szakaszt ($MS = 2 \\cdot SK$)."
  },
  {
    id: "q-hvon-h-6",
    question: "Egy szabályos háromszög magassága $9$ cm. Mennyi a beírható körének sugara ($r$)?",
    options: ["$3$ cm", "$6$ cm", "$4.5$ cm", "$2$ cm"],
    correctAnswer: 0,
    explanation: "Szabályos háromszögben a beírható kör sugara a magasság harmada: $r = 9 / 3 = 3$ cm."
  },
  {
    id: "q-hvon-h-7",
    question: "Egy szabályos háromszög magassága $9$ cm. Mennyi a köré írható körének sugara ($R$)?",
    options: ["$6$ cm", "$3$ cm", "$4.5$ cm", "$8$ cm"],
    correctAnswer: 0,
    explanation: "Szabályos háromszögben a köré írható kör sugara a magasság kétharmada: $R = \\frac{2}{3} \\cdot 9 = 6$ cm."
  },
  {
    id: "q-hvon-h-8",
    question: "A szögfelező-tétel szerint a háromszög belső szögfelezője milyen arányban osztja a szemközti oldalt?",
    options: ["A szomszédos oldalak arányában", "Felezi az oldalt", "$2:1$ arányban", "A magasságok arányában"],
    correctAnswer: 0,
    explanation: "A belső szögfelező a szemközti oldalt a szomszédos oldalak arányában osztja két részre: $\\frac{x}{y} = \\frac{a}{b}$."
  },
  {
    id: "q-hvon-h-9",
    question: "Egy háromszög oldalai $a=6$ cm és $b=9$ cm. A köztük lévő szög szögfelezője a szemközti $c=10$ cm-es oldalt két darabra osztja. Mennyi a rövidebbik darab hossza?",
    options: ["$4$ cm", "$6$ cm", "$5$ cm", "$3$ cm"],
    correctAnswer: 0,
    explanation: "Szögfelező-tétellel az arány $6 : 9 = 2 : 3$. A $10$ cm-t $2:3$ arányban osztva: $\\frac{2}{5} \\cdot 10 = 4$ cm."
  },
  {
    id: "q-hvon-h-10",
    question: "Egy háromszög oldalai $5$ cm, $6$ cm, $7$ cm. Mennyi a háromszög középvonalai által alkotott kis háromszög kerülete?",
    options: ["$9$ cm", "$18$ cm", "$12$ cm", "$15$ cm"],
    correctAnswer: 0,
    explanation: "Az eredeti kerület $K = 5 + 6 + 7 = 18$ cm. A középvonalakból álló háromszög kerülete az eredeti fele: $18 / 2 = 9$ cm."
  }
];
