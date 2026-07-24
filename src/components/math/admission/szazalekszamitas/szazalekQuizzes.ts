import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 4: Százalékszámítás (Quizzes)
// ----------------------------------------------------------------------

export const quizSzazalekEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-szaz-e-1",
    question: "Mennyi $200$-nak a $10\\%$-a?",
    options: ["$10$", "$20$", "$50$", "$100$"],
    correctAnswer: 1,
    explanation: "A $10\\%$ azt jelenti, hogy az $1/10$ része: $200 / 10 = 20$."
  },
  {
    id: "q-szaz-e-2",
    question: "Hány százalék a $0{,}25$ tizedes tört?",
    options: ["$2{,}5\\%$", "$25\\%$", "$250\\%$", "$0{,}25\\%$"],
    correctAnswer: 1,
    explanation: "A tizedes törtet 100-zal megszorozva kapjuk a százalékot: $0{,}25 \\cdot 100 = 25\\%$."
  },
  {
    id: "q-szaz-e-3",
    question: "Mennyi a $100$ Ft $50\\%$-a?",
    options: ["$25$ Ft", "$50$ Ft", "$75$ Ft", "$10$ Ft"],
    correctAnswer: 1,
    explanation: "A $50\\%$ a fele: $100 / 2 = 50$ Ft."
  },
  {
    id: "q-szaz-e-4",
    question: "Egy $5000$ Ft-os pólóra $20\\%$ kedvezmény jár. Hány forint a kedvezmény?",
    options: ["$500$ Ft", "$1000$ Ft", "$1500$ Ft", "$2000$ Ft"],
    correctAnswer: 1,
    explanation: "$5000 \\cdot 0{,}20 = 1000$ Ft."
  },
  {
    id: "q-szaz-e-5",
    question: "Hány százaléka a $4$-es a $20$-nak?",
    options: ["$10\\%$", "$20\\%$", "$25\\%$", "$40\\%$"],
    correctAnswer: 1,
    explanation: "$\\frac{4}{20} = \\frac{1}{5} = 0{,}20 = 20\\%$."
  },
  {
    id: "q-szaz-e-6",
    question: "Melyik tört felel meg a $75\\%$-nak?",
    options: ["$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{4}{5}$", "$\\frac{7}{5}$"],
    correctAnswer: 1,
    explanation: "$\\frac{75}{100} = \\frac{3}{4}$."
  },
  {
    id: "q-szaz-e-7",
    question: "Mennyi a $60$-nak a $100\\%$-a?",
    options: ["$30$", "$60$", "$120$", "$600$"],
    correctAnswer: 1,
    explanation: "A $100\\%$ az a teljes egész, azaz $60$."
  },
  {
    id: "q-szaz-e-8",
    question: "Ha egy fizetés $10\\%$-kal nő, hány százaléka lesz az eredetinek?",
    options: ["$90\\%$", "$100\\%$", "$110\\%$", "$120\\%$"],
    correctAnswer: 2,
    explanation: "$100\\% + 10\\% = 110\\%$."
  },
  {
    id: "q-szaz-e-9",
    question: "Mennyi $80$-nak a $25\\%$-a?",
    options: ["$10$", "$20$", "$40$", "$15$"],
    correctAnswer: 1,
    explanation: "A $25\\%$ a negyede: $80 / 4 = 20$."
  },
  {
    id: "q-szaz-e-10",
    question: "Egy szám $50\\%$-a $30$. Mi a szám?",
    options: ["$15$", "$45$", "$60$", "$90$"],
    correctAnswer: 2,
    explanation: "Ha a fele 30, akkor az egész $30 \\cdot 2 = 60$."
  }
];

export const quizSzazalekMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-szaz-m-1",
    question: "Egy kabát árát $12.000$ Ft-ról $15.000$ Ft-ra emelték. Hány százalékos volt az áremelés?",
    options: ["$20\\%$", "$25\\%$", "$30\\%$", "$15\\%$"],
    correctAnswer: 1,
    explanation: "Az emelés $3000$ Ft. Az alap $12.000$ Ft. $\\frac{3000}{12000} = \\frac{1}{4} = 25\\%$."
  },
  {
    id: "q-szaz-m-2",
    question: "Egy termék ára $20\\%$-os leértékelés után $8000$ Ft. Mennyi volt az eredeti ára?",
    options: ["$9600$ Ft", "$10.000$ Ft", "$12.000$ Ft", "$8400$ Ft"],
    correctAnswer: 1,
    explanation: "A $8000$ Ft az eredeti ár $80\\%$-a. $8000 / 0{,}80 = 10.000$ Ft."
  },
  {
    id: "q-szaz-m-3",
    question: "Egy $400$ grammos oldatban $50$ gramm só van. Hány százalékos az oldat?",
    options: ["$10\\%$", "$12{,}5\\%$", "$15\\%$", "$20\\%$"],
    correctAnswer: 1,
    explanation: "$\\frac{50}{400} = \\frac{1}{8} = 0{,}125 = 12{,}5\\%$."
  },
  {
    id: "q-szaz-m-4",
    question: "Egy áru árát először $10\\%$-kal emelték, majd az új árat $10\\%$-kal csökkentették. Hány százaléka az új ár az eredetinek?",
    options: ["$100\\%$", "$99\\%$", "$101\\%$", "$98\\%$"],
    correctAnswer: 1,
    explanation: "Legyen 100 Ft. Emelés: 110 Ft. Csökkentés: $110 \\cdot 0{,}90 = 99$ Ft. Tehát $99\\%$."
  },
  {
    id: "q-szaz-m-5",
    question: "Egy iskolában $600$ diák tanul, és $45\\%$-uk fiú. Hány lány tanul az iskolában?",
    options: ["$270$", "$330$", "$300$", "$350$"],
    correctAnswer: 1,
    explanation: "A lányok aránya $100\\% - 45\\% = 55\\%$. $600 \\cdot 0{,}55 = 330$ lány."
  },
  {
    id: "q-szaz-m-6",
    question: "Mennyi az $a$ értéke, ha $a$-nak a $15\\%$-a megegyezik $90$-nek a $20\\%$-ával?",
    options: ["$120$", "$150$", "$180$", "$200$"],
    correctAnswer: 0,
    explanation: "$90$-nek a $20\\%$-a $18$. Ha $a \\cdot 0{,}15 = 18$, akkor $a = 18 / 0{,}15 = 120$."
  },
  {
    id: "q-szaz-m-7",
    question: "Egy raktárban a krumpli $15\\%$-a megromlott. Ha $510$ kg jó krumpli maradt, hány kg krumpli volt eredetileg?",
    options: ["$600$ kg", "$580$ kg", "$650$ kg", "$700$ kg"],
    correctAnswer: 0,
    explanation: "A jó krumpli az eredeti $85\\%$-a. $510 / 0{,}85 = 600$ kg."
  },
  {
    id: "q-szaz-m-8",
    question: "Hány százalékkal kell növelni egy téglalap szélességét, ha a hosszát $20\\%$-kal csökkentjük, hogy a területe ne változzon?",
    options: ["$20\\%$", "$25\\%$", "$30\\%$", "$15\\%$"],
    correctAnswer: 1,
    explanation: "Új hossz: $0{,}8 \\cdot a$. Új szélesség: $k \\cdot b$. Terület változatlan: $0{,}8 \\cdot k = 1 \\Rightarrow k = 1 / 0{,}8 = 1{,}25$, ami $25\\%$ növekedés."
  },
  {
    id: "q-szaz-m-9",
    question: "Egy bankszámlára $100.000$ Ft-ot fektetünk be évi $5\\%$-os kamatra. Mennyi pénzünk lesz 1 év múlva?",
    options: ["$105.000$ Ft", "$110.000$ Ft", "$100.500$ Ft", "$150.000$ Ft"],
    correctAnswer: 0,
    explanation: "$100.000 \\cdot 1{,}05 = 105.000$ Ft."
  },
  {
    id: "q-szaz-m-10",
    question: "A $300$ $120\\%$-a hány százaléka a $450$-nek?",
    options: ["$70\\%$", "$80\\%$", "$90\\%$", "$60\\%$"],
    correctAnswer: 1,
    explanation: "$300 \\cdot 1{,}20 = 360$. $\\frac{360}{450} = \\frac{4}{5} = 0{,}80 = 80\\%$."
  }
];

export const quizSzazalekHard: AdmissionQuizQuestion[] = [
  {
    id: "q-szaz-h-1",
    question: "Hány gramm $20\\%$-os és hány gramm $50\\%$-os cukoroldatot kell összekeverni, hogy $300$ gramm $30\\%$-os oldatot kapjunk?",
    options: ["$200$ g (20%) és $100$ g (50%)", "$150$ g (20%) és $150$ g (50%)", "$100$ g (20%) és $200$ g (50%)", "$250$ g (20%) és $50$ g (50%)"],
    correctAnswer: 0,
    explanation: "Oldott anyag egyenlet: $0{,}20 x + 0{,}50 (300 - x) = 0{,}30 \\cdot 300 \\Rightarrow 0{,}20x + 150 - 0{,}50x = 90 \\Rightarrow -0{,}30x = -60 \\Rightarrow x = 200$ g."
  },
  {
    id: "q-szaz-h-2",
    question: "Két egymást követő évben a termék ára először $20\\%$-kal, majd $30\\%$-kal nőtt. Hány százalékkal nőtt az ára az eredetihez képest?",
    options: ["$50\\%$", "$56\\%$", "$60\\%$", "$52\\%$"],
    correctAnswer: 1,
    explanation: "Összetett szorzó: $1{,}20 \\cdot 1{,}30 = 1{,}56$, azaz $56\\%$ az emelkedés."
  },
  {
    id: "q-szaz-h-3",
    question: "Egy kocka élét $10\\%$-kal megnöveljük. Hány százalékkal nő a kocka térfogata?",
    options: ["$10\\%$", "$30\\%$", "$33{,}1\\%$", "$31\\%$"],
    correctAnswer: 2,
    explanation: "Új él: $1{,}10a$. Új térfogat: $(1{,}10a)^3 = 1{,}331 a^3$, ami $33{,}1\\%$-os növekedés."
  },
  {
    id: "q-szaz-h-4",
    question: "Egy bolti akcióban 'Kettőt fizet, hármat vihet' ajánlat van. Hány százalékos kedvezménynek felel meg ez darabarányosan?",
    options: ["$25\\%$", "$33{,}3\\%$", "$50\\%$", "$30\\%$"],
    correctAnswer: 1,
    explanation: "3 termékből 1 ingyen van, így $\\frac{1}{3} = 33{,}33\\%$ a kedvezmény."
  },
  {
    id: "q-szaz-h-5",
    question: "Egy friss gyümölcs $80\\%$ vizet tartalmaz. A szárítás után a aszalt gyümölcs víztartalma $20\\%$-ra csökken. Hány kg aszalt gyümölcsöt kapunk $100$ kg friss gyümölcsből?",
    options: ["$25$ kg", "$20$ kg", "$40$ kg", "$50$ kg"],
    correctAnswer: 0,
    explanation: "A szárazanyag változatlan! $100$ kg friss gyümölcsben $20$ kg a szárazanyag. Az aszalt gyümölcsben ez a $80\\%$-ot teszi ki: $20 / 0{,}80 = 25$ kg."
  },
  {
    id: "q-szaz-h-6",
    question: "Egy város lakossága az 1. évben $10\\%$-kal nőtt, a 2. évben $10\\%$-kal csökkent. Ha most $99.000$ lakosa van, mennyi volt a lakosság 2 évvel ezelőtt?",
    options: ["$99.000$", "$100.000$", "$101.000$", "$98.000$"],
    correctAnswer: 1,
    explanation: "$x \\cdot 1{,}10 \\cdot 0{,}90 = 0{,}99x = 99.000 \\Rightarrow x = 100.000$."
  },
  {
    id: "q-szaz-h-7",
    question: "Egy kereskedő az áruira olyan árat határoz meg, hogy a $20\\%$-os engedmény megadása után is $10\\%$ haszna legyen. Hány százalékkal tette a beszerzési ár fölé az eladási árat?",
    options: ["$30\\%$", "$37{,}5\\%$", "$35\\%$", "$40\\%$"],
    correctAnswer: 1,
    explanation: "Legyen a beszerzési ár 100. Elvárt eladási ár $110$. Ha az eladási ár $80\\%$-a a 110, akkor a kikiáltási ár: $110 / 0{,}80 = 137{,}5$, azaz $37{,}5\\%$-kal emelt."
  },
  {
    id: "q-szaz-h-8",
    question: "Ha egy számot megnövelünk $25\\%$-kal, majd a kapott számot csökkentjük $x\\%$-kal, és visszakapjuk az eredeti számot, mennyi az $x$?",
    options: ["$20\\%$", "$25\\%$", "$15\\%$", "$18\\%$"],
    correctAnswer: 0,
    explanation: "$1{,}25 \\cdot (1 - x/100) = 1 \\Rightarrow 1 - x/100 = 1 / 1{,}25 = 0{,}80 \\Rightarrow x = 20\\%$."
  },
  {
    id: "q-szaz-h-9",
    question: "Egy osztályban a fiúk száma $50\\%$-kal több a lányok számánál. Az osztály hány százaléka lány?",
    options: ["$40\\%$", "$33{,}3\\%$", "$50\\%$", "$45\\%$"],
    correctAnswer: 0,
    explanation: "Lányok: $L$. Fiúk: $1{,}5 L$. Összesen: $2{,}5 L$. Lányok aránya: $\\frac{L}{2{,}5 L} = \\frac{1}{2{,}5} = 0{,}40 = 40\\%$."
  },
  {
    id: "q-szaz-h-10",
    question: "Egy tőke 2 év alatt kamatos kamattal $21\\%$-ot növekedett. Hány százalékos volt az éves kamatláb?",
    options: ["$10\\%$", "$10{,}5\\%$", "$11\\%$", "$9.5\\%$"],
    correctAnswer: 0,
    explanation: "$(1 + r)^2 = 1{,}21 \\Rightarrow 1 + r = 1{,}10 \\Rightarrow r = 0{,}10 = 10\\%$."
  }
];
