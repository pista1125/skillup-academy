import { AdmissionQuizQuestion } from '../../../../data/admissionContent';

// ----------------------------------------------------------------------
// TOPIC 7: Geometriai transzformációk (Quizzes)
// ----------------------------------------------------------------------

export const quizTranszformacioEasy: AdmissionQuizQuestion[] = [
  {
    id: "q-trans-e-1",
    question: "Melyik geometriai transzformáció tartja meg az alakzat méretét és alakját is (egybevágósági transzformáció)?",
    options: ["Középpontos hasonlóság", "Tengelyes tükrözés", "Nagyítás", "Kicsinyítés"],
    correctAnswer: 1,
    explanation: "A tengelyes tükrözés egybevágósági transzformáció, az alakzat mérete és alakja nem változik."
  },
  {
    id: "q-trans-e-2",
    question: "Mi a tengelyes tükrözés fixpontjainak halmaza?",
    options: ["A tükörtengely összes pontja", "Csak az origó", "A sík összes pontja", "Nincs fixpontja"],
    correctAnswer: 0,
    explanation: "A tengelyes tükrözésnél a tükörtengelyen lévő pontok helyben maradnak (helyben maradó, azaz fixpontok)."
  },
  {
    id: "q-trans-e-3",
    question: "Milyen körüljárási irányú lesz a háromszög képe tengelyes tükrözés után?",
    options: ["Megegyező", "Ellentétes", "Nem változik", "Függ a szögektől"],
    correctAnswer: 1,
    explanation: "A tengelyes tükrözés megváltoztatja az alakzat körüljárási irányát (ellentétes körüljárású lesz)."
  },
  {
    id: "q-trans-e-4",
    question: "Melyik betűnek van tengelyes szimmetriája?",
    options: ["F", "L", "A", "R"],
    correctAnswer: 2,
    explanation: "Az 'A' betű függőleges tengelyre szimmetrikus."
  },
  {
    id: "q-trans-e-5",
    question: "Mennyi a tengelyesen tükrözött szakasz hossza az eredeti szakaszhoz képest?",
    options: ["Kétszerese", "Fele", "Egyenlő", "Függ a tengelytől"],
    correctAnswer: 2,
    explanation: "A tengelyes tükrözés távolságtartó, a szakasz hossza egyenlő marad."
  },
  {
    id: "q-trans-e-6",
    question: "Hány fixpontja van a középpontos tükrözésnek?",
    options: ["Pontosan 1 (a tükrözés középpontja)", "Végtelen sok", "Nincs fixpontja", "2 fixpontja van"],
    correctAnswer: 0,
    explanation: "Egyetlen pont marad helyben: maga a tükrözési középpont."
  },
  {
    id: "q-trans-e-7",
    question: "Megváltozik-e a szög nagysága eltolás során?",
    options: ["Nem, a szögtartás miatt egyenlő marad", "Igen, megnő", "Igen, lecsökken", "Függ az eltolásvektortól"],
    correctAnswer: 0,
    explanation: "Az eltolás egybevágósági transzformáció, így szögtartó."
  },
  {
    id: "q-trans-e-8",
    question: "Melyik alakzatnak van középpontos szimmetriája?",
    options: ["Szabályos háromszög", "Paralelogramma", "Egyenlő szárú trapéz", "Deltoid"],
    correctAnswer: 1,
    explanation: "A paralelogramma átlóinak metszéspontjára középpontosan szimmetrikus."
  },
  {
    id: "q-trans-e-9",
    question: "Hány fokos elforgatás felel meg a középpontos tükrözésnek?",
    options: ["$90^\\circ$", "$180^\\circ$", "$270^\\circ$", "$360^\\circ$"],
    correctAnswer: 1,
    explanation: "A középpontos tükrözés megegyezik a $180^\\circ$-os forgatással."
  },
  {
    id: "q-trans-e-10",
    question: "Milyen transzformáció a nagyítás?",
    options: ["Egybevágósági transzformáció", "Hasonlósági transzformáció", "Eltolás", "Tükrözés"],
    correctAnswer: 1,
    explanation: "A nagyítás megnöveli a méreteket, így hasonlósági transzformáció."
  }
];

export const quizTranszformacioMedium: AdmissionQuizQuestion[] = [
  {
    id: "q-trans-m-1",
    question: "A $P(3; 4)$ pontot az x-tengelyre tükrözzük. Mi lesz a tükörkép koordinátája?",
    options: ["$P'(3; -4)$", "$P'(-3; 4)$", "$P'(-3; -4)$", "$P'(4; 3)$"],
    correctAnswer: 0,
    explanation: "Az x-tengelyre való tükrözésnél az x-koordináta változatlan marad, az y-koordináta előjelet vált: $(3; -4)$."
  },
  {
    id: "q-trans-m-2",
    question: "A $Q(-2; 5)$ pontot az y-tengelyre tükrözzük. Mi a kapott pont koordinátája?",
    options: ["$Q'(2; 5)$", "$Q'(-2; -5)$", "$Q'(2; -5)$", "$Q'(5; -2)$"],
    correctAnswer: 0,
    explanation: "Az y-tengelyre való tükrözésnél az y-koordináta változatlan, az x-koordináta előjelet vált: $(2; 5)$."
  },
  {
    id: "q-trans-m-3",
    question: "A $K(1; 2)$ pontot az origóra mint középpontra tükrözzük. Mi lesz a képe?",
    options: ["$K'(-1; -2)$", "$K'(1; -2)$", "$K'(-1; 2)$", "$K'(2; 1)$"],
    correctAnswer: 0,
    explanation: "Origóra való tükrözéskor mindkét koordináta az ellentettjére változik: $(-1; -2)$."
  },
  {
    id: "q-trans-m-4",
    question: "Két hasonló háromszög hasonlósági aránya $k = 3$. Hányszorosa a nagyobb háromszög területe a kisebbének?",
    options: ["$3$-szorosa", "$6$-szorosa", "$9$-szerese", "$27$-szerese"],
    correctAnswer: 2,
    explanation: "Hasonló alakzatok területének aránya a hasonlósági arány négyzete: $k^2 = 3^2 = 9$."
  },
  {
    id: "q-trans-m-5",
    question: "Két hasonló test hasonlósági aránya $k = 2$. Hányszorosa a nagyobb test térfogata a kisebbének?",
    options: ["$2$-szerese", "$4$-szerese", "$6$-szorosa", "$8$-szorosa"],
    correctAnswer: 3,
    explanation: "Hasonló testek térfogatának aránya a hasonlósági arány köbe: $k^3 = 2^3 = 8$."
  },
  {
    id: "q-trans-m-6",
    question: "A $P(2; 3)$ pontot eltoljuk a $\\vec{v}(4; -1)$ vektorral. Mi lesz a kapott pont?",
    options: ["$P'(6; 2)$", "$P'(2; 4)$", "$P'(-2; 4)$", "$P'(8; -3)$"],
    correctAnswer: 0,
    explanation: "A koordinátákhoz hozzáadjuk a vektor komponenseit: $P'(2+4; 3+(-1)) = P'(6; 2)$."
  },
  {
    id: "q-trans-m-7",
    question: "Hány szimmetriatengelye van egy szabályos ötszögnek?",
    options: ["$1$", "$5$", "$10$", "$0$"],
    correctAnswer: 1,
    explanation: "Minden szabályos $n$-szögnek pontosan $n$ darab szimmetriatengelye van, így az ötszögnek 5."
  },
  {
    id: "q-trans-m-8",
    question: "Melyik állítás HAMIS a forgatásra nézve?",
    options: ["Távolságtartó", "Szögtartó", "Megváltoztatja a körüljárási irányt", "Egybevágósági transzformáció"],
    correctAnswer: 2,
    explanation: "A forgatás megtartja a körüljárási irányt, nem változtatja meg."
  },
  {
    id: "q-trans-m-9",
    question: "Hány fokos forgatási szimmetriája van a szabályos hattszögnek?",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correctAnswer: 2,
    explanation: "$360^\\circ / 6 = 60^\\circ$."
  },
  {
    id: "q-trans-m-10",
    question: "Az $A(2; 1)$ pontot elforgatjuk az origó körül $90^\\circ$-kal az óramutató járásával ellentétes irányba. Mi lesz a kép koordinátája?",
    options: ["$A'(-1; 2)$", "$A'(1; -2)$", "$A'(-2; -1)$", "$A'(1; 2)$"],
    correctAnswer: 0,
    explanation: "Pozitív (óra elleni) $90^\\circ$-os forgatásnál $(x; y) \\rightarrow (-y; x)$, így $(2; 1) \\rightarrow (-1; 2)$."
  }
];

export const quizTranszformacioHard: AdmissionQuizQuestion[] = [
  {
    id: "q-trans-h-1",
    question: "A $P(4; 5)$ pont tükörképe a $C(1; 2)$ pontra mint középpontra melyik pont lesz?",
    options: ["$P'(-2; -1)$", "$P'(-1; -2)$", "$P'(2; 3)$", "$P'(-3; -3)$"],
    correctAnswer: 0,
    explanation: "A középpont a felezőpont: $C = \\frac{P + P'}{2} \\Rightarrow P' = 2C - P = 2(1; 2) - (4; 5) = (2; 4) - (4; 5) = (-2; -1)$."
  },
  {
    id: "q-trans-h-2",
    question: "Két hasonló háromszög területe $16$ $\\text{cm}^2$ és $36$ $\\text{cm}^2$. Ha a kisebbik háromszög egyik oldala $6$ cm, mennyi a nagyobbik háromszög megfelelő oldala?",
    options: ["$9$ cm", "$12$ cm", "$8$ cm", "$13.5$ cm"],
    correctAnswer: 0,
    explanation: "Területek aránya: $\\frac{36}{16} = \\frac{9}{4} = k^2 \\Rightarrow k = \\sqrt{\\frac{9}{4}} = \\frac{3}{2} = 1{,}5$. A nagyobbik oldal: $6 \\cdot 1{,}5 = 9$ cm."
  },
  {
    id: "q-trans-h-3",
    question: "Melyik egyenesre való tükrözés cseréli fel a pontok $x$ és $y$ koordinátáit ($(x;y) \\rightarrow (y;x)$)?",
    options: ["Az $y = x$ egyenesre (I. és III. síknegyed felezője)", "Az $y = -x$ egyenesre", "Az $x$-tengelyre", "Az $y$-tengelyre"],
    correctAnswer: 0,
    explanation: "Az $y = x$ tengelyre való tükrözésnél az x és y koordináták felcserélődnek."
  },
  {
    id: "q-trans-h-4",
    question: "Két egymást metsző egyenesre való egymás utáni tengelyes tükrözés milyen egyetlen transzformációval helyettesíthető?",
    options: ["Forgatással a metszéspont körül (a hajlásszög kétszeresével)", "Eltolással", "Középpontos tükrözéssel", "Tengelyes tükrözéssel"],
    correctAnswer: 0,
    explanation: "Két metsző tengelyre való egymás utáni tükrözés forgatást eredményez a metszéspont körül, a tengelyek hajlásszögének kétszeresével."
  },
  {
    id: "q-trans-h-5",
    question: "Két párhuzamos egyenesre való egymás utáni tengelyes tükrözés mit eredményez?",
    options: ["Eltolást a tengelyekre merőlegesen (a távolságuk kétszeresével)", "Forgatást", "Középpontos tükrözést", "Helybenhagyást"],
    correctAnswer: 0,
    explanation: "Két párhuzamos tengelyre való egymás utáni tükrözés a tengelyek közötti távolság kétszeresével való eltolást ad."
  },
  {
    id: "q-trans-h-6",
    question: "Egy gúla magasságát a felénél elvágjuk az alappal párhuzamos síkkal. Hányadrésze a keletkező kis gúla térfogata az eredeti gúla térfogatának?",
    options: ["$\\frac{1}{8}$ része", "$\\frac{1}{4}$ része", "$\\frac{1}{2}$ része", "$\\frac{1}{16}$ része"],
    correctAnswer: 0,
    explanation: "A hasonlósági arány $k = \\frac{1}{2}$. A térfogatok aránya $k^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$."
  },
  {
    id: "q-trans-h-7",
    question: "A $P(1; 3)$ pontot elforgatjuk a $C(1; 1)$ pont körül $90^\\circ$-kal pozitív irányba. Mi lesz a kép koordinátája?",
    options: ["$P'(-1; 1)$", "$P'(3; 1)$", "$P'(1; -1)$", "$P'(0; 2)$"],
    correctAnswer: 0,
    explanation: "Vektor $C$-ből $P$-be: $\\vec{v} = (0; 2)$. Elforgatva $90^\\circ$-kal pozitív irányba: $\\vec{v}' = (-2; 0)$. Új pont: $C + \\vec{v}' = (1-2; 1+0) = (-1; 1)$."
  },
  {
    id: "q-trans-h-8",
    question: "Melyik geometriai alakzatnak VAN középpontos szimmetriája, de NINCS tengelyes szimmetriája?",
    options: ["Paralelogramma (ami nem téglalap és nem rombusz)", "Téglalap", "Rombusz", "Kör"],
    correctAnswer: 0,
    explanation: "Az általános paralelogrammának az átlók metszéspontja középpontos szimmetriaközéppontja, de nincs tengelyes szimmetriatengelye."
  },
  {
    id: "q-trans-h-9",
    question: "Egy háromszög oldalait $20\\%$-kal megnöveljük. Hány százalékkal nő a háromszög területe?",
    options: ["$44\\%$", "$20\\%$", "$40\\%$", "$24\\%$"],
    correctAnswer: 0,
    explanation: "Hasonlósági arány $k = 1{,}20$. Területarány $k^2 = 1{,}20^2 = 1{,}44$, ami $44\\%$-os növekedés."
  },
  {
    id: "q-trans-h-10",
    question: "Hány egybevágósági transzformáció visz át egy szabályos háromszöget önmagába (a szimmetriák száma)?",
    options: ["$6$ (3 tengelyes tükrözés + 3 forgatás)", "$3$", "$4$", "$12$"],
    correctAnswer: 0,
    explanation: "A szabályos háromszög szimmetriacsoportja 6 elemű (identitás, $120^\\circ$, $240^\\circ$ forgatás és 3 tengelyes tükrözés)."
  }
];
