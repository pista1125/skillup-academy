import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, DifficultyLevel, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { QuadrilateralMatcher } from './QuadrilateralMatcher';
import { QuadrilateralSorter } from './QuadrilateralSorter';
import { Boxes, Compass, Sparkles } from 'lucide-react';
import {
  QuadrilateralHierarchySvg,
  QuadrilateralDiagonalsSvg,
  CyclicTangentialSvg
} from './QuadrilateralFigures';

interface QuadrilateralQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const cheatSheet: CheatSheetItem[] = [
  {
    title: 'Négyszögek Hierarchiája',
    content: 'Trapéz (a || c) ⊃ Paralelogramma (két párhuzamos pár) ⊃ Rombusz (egyenlő oldalak) & Téglalap (90°-os szögek) ⊃ Négyzet (minden oldala és szöge egyenlő). A deltoidból is rombusz lesz, ha minden oldala egyenlő.'
  },
  {
    title: 'Átlók Tulajdonságai',
    content: 'Felezik egymást: Paralelogramma, Rombusz, Téglalap, Négyzet. Egyenlő hosszúak (e = f): Húrtrapéz, Téglalap, Négyzet. Merőlegesek egymásra (e ⊥ f): Deltoid, Rombusz, Négyzet.'
  },
  {
    title: 'Szimmetriatengelyek Száma',
    content: '0 tengely: Általános paralelogramma, általános trapéz. 1 tengely: Húrtrapéz (alapok felezőmerőlegese), Deltoid (szimmetriaátló). 2 tengely: Téglalap (oldalfelezők), Rombusz (átlók). 4 tengely: Négyzet.'
  },
  {
    title: 'Húr- és Érintőnégyszögek',
    content: 'Húrnégyszög (köré írható kör): szemközti szögek összege 180° (α + γ = 180°). Példák: húrtrapéz, téglalap, négyzet. Érintőnégyszög (beírt kör): szemközti oldalak összege egyenlő (a + c = b + d). Példák: deltoid, rombusz, négyzet.'
  }
];

const questions: Question[] = [
  // --- 1. SZINT: Négyszögek Alapfogalmai és Definíciói (10 kérdés) ---
  {
    id: 'qq1-1',
    level: 1,
    question: 'Mennyi bármely síkbeli konvex négyszög belső szögeinek összege?',
    options: ['360°', '180°', '540°', '720°'],
    correctAnswer: 0,
    explanation: 'A sokszögek belső szögeinek összege (n − 2) · 180°. Négyszögre (n = 4): (4 − 2) · 180° = 360°.'
  },
  {
    id: 'qq1-2',
    level: 1,
    question: 'Mi a trapéz pontos matematikai definíciója?',
    figure: <QuadrilateralHierarchySvg size={200} />,
    options: [
      'Olyan négyszög, amelynek van legalább egy párhuzamos oldalpárja',
      'Olyan négyszög, amelynek minden oldala egyenlő hosszúságú',
      'Olyan négyszög, amelynek minden szöge derékszög',
      'Olyan négyszög, amelynek átlói merőlegesek egymásra'
    ],
    correctAnswer: 0,
    explanation: 'A trapéz definíciója: olyan négyszög, amelynek van legalább egy párhuzamos oldalpárja (ezeket alapoknak nevezzük).'
  },
  {
    id: 'qq1-3',
    level: 1,
    question: 'Melyik állítás igaz a paralelogrammára?',
    options: [
      'Két párhuzamos oldalpárja van, és az átlói felezik egymást',
      'Átlói mindig merőlegesek egymásra',
      'Minden szöge kötelezően 90°',
      'Nincs középpontos szimmetriája'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogramma mindkét szemközti oldalpárja párhuzamos, szemközti oldalai és szögei egyenlők, átlói pedig felezik egymást.'
  },
  {
    id: 'qq1-4',
    level: 1,
    question: 'Mi a rombusz definíciója?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      'Olyan paralelogramma, amelynek minden oldala egyenlő hosszúságú',
      'Olyan négyszög, amelynek minden szöge derékszög',
      'Olyan trapéz, amelynek átlói egyenlők',
      'Olyan négyszög, amelynek csak egy szimmetriatengelye van'
    ],
    correctAnswer: 0,
    explanation: 'A rombusz egyenlő oldalú paralelogramma (a = b = c = d). Átlói merőlegesen felezik egymást és felezik a belső szögeket.'
  },
  {
    id: 'qq1-5',
    level: 1,
    question: 'Hány szimmetriatengelye van egy általános téglalapnak (amely nem négyzet)?',
    options: ['2 szimmetriatengelye (a szemközti oldalak felezőmerőlegesei)', '4 szimmetriatengelye', '1 szimmetriatengelye', '0 (nincs tengelye)'],
    correctAnswer: 0,
    explanation: 'A téglalapnak 2 szimmetriatengelye van: a két szemközti oldalpár felezőmerőlegese. Átlói nem szimmetriatengelyek (kivéve, ha négyzet).'
  },
  {
    id: 'qq1-6',
    level: 1,
    question: 'Melyik négyszögnek van PONTOSAN 4 szimmetriatengelye?',
    options: ['A négyzetnek', 'A téglalapnak', 'A rombusznak', 'A paralelogrammának'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 szimmetriatengelye van: a 2 oldalfelező merőleges és a 2 átló.'
  },
  {
    id: 'qq1-7',
    level: 1,
    question: 'Mi a deltoid definíciója?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      'Olyan négyszög, amelynek van két-két szomszédos egyenlő oldala',
      'Olyan négyszög, amelynek szemközti oldalai párhuzamosak',
      'Olyan négyszög, amelynek átlói egyenlő hosszúak',
      'Olyan négyszög, amelynek minden belső szöge egyenlő'
    ],
    correctAnswer: 0,
    explanation: 'A deltoidban két szomszédos oldal hossza a, a másik két szomszédos oldal hossza pedig b (a = b, c = d).'
  },
  {
    id: 'qq1-8',
    level: 1,
    question: 'Hány szimmetriatengelye van egy általános húrtrapéznak?',
    options: ['1 (az alapok közös felezőmerőlegese)', '2', '4', '0'],
    correctAnswer: 0,
    explanation: 'A húrtrapéznak 1 szimmetriatengelye van, ami a két párhuzamos alap közös felezőmerőlegese.'
  },
  {
    id: 'qq1-9',
    level: 1,
    question: 'Mit jelent a húrnégyszög kifejezés?',
    figure: <CyclicTangentialSvg size={200} />,
    options: [
      'Olyan négyszög, amelynek csúcsai egy körre illeszkednek (köré írható kör)',
      'Olyan négyszög, amelynek oldalai érintenek egy belső kört',
      'Olyan négyszög, amelynek átlói merőlegesek egymásra',
      'Olyan négyszög, amelynek oldalai húrok egy parabolában'
    ],
    correctAnswer: 0,
    explanation: 'A húrnégyszög olyan négyszög, amelynek mind a 4 csúcsa egy körön fekszik (oldalai a kör húrjai).'
  },
  {
    id: 'qq1-10',
    level: 1,
    question: 'Mit jelent az érintőnégyszög kifejezés?',
    figure: <CyclicTangentialSvg size={200} />,
    options: [
      'Olyan négyszög, amelynek minden oldala egy és ugyanazt a kört érinti (beírt kör)',
      'Olyan négyszög, amelynek csúcsai érintik a koordinátatengelyeket',
      'Olyan négyszög, amelynek átlói érintik egymást a felezőpontban',
      'Olyan négyszög, amelynek kerülete egyenlő a beírt kör kerületével'
    ],
    correctAnswer: 0,
    explanation: 'Az érintőnégyszög olyan négyszög, amelybe kör írható úgy, hogy a kör mind a négy oldalt belső pontban érinti.'
  },

  // --- 2. SZINT: Átlók, Szimmetriák és Tételek (10 kérdés) ---
  {
    id: 'qq2-1',
    level: 2,
    question: 'Melyik négyszögcsaládra igaz, hogy az átlói MERŐLEGESEK egymásra?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      'Deltoid, Rombusz, Négyzet',
      'Téglalap, Négyzet, Paralelogramma',
      'Trapéz, Húrtrapéz, Paralelogramma',
      'Csak a négyzetre'
    ],
    correctAnswer: 0,
    explanation: 'A deltoid, a rombusz és a négyzet átlói egymásra merőlegesek (e ⊥ f).'
  },
  {
    id: 'qq2-2',
    level: 2,
    question: 'Melyik négyszögcsaládra igaz, hogy az átlói EGYENLŐ HOSSZÚAK (e = f)?',
    options: [
      'Húrtrapéz, Téglalap, Négyzet',
      'Rombusz, Paralelogramma, Deltoid',
      'Általános trapéz, Rombusz, Téglalap',
      'Csak a téglalapra'
    ],
    correctAnswer: 0,
    explanation: 'A húrtrapéz, a téglalap és a négyzet átlói egyenlő hosszúak (e = f).'
  },
  {
    id: 'qq2-3',
    level: 2,
    question: 'Egy paralelogramma egyik szöge 70°. Mekkorák a többi belső szögei?',
    options: [
      '70°, 110°, 110°',
      '70°, 70°, 70°',
      '110°, 110°, 110°',
      '90°, 90°, 110°'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogramma szemközti szögei egyenlők (70°), a szomszédos szögek összege pedig 180°, így 180° − 70° = 110° a másik két szög.'
  },
  {
    id: 'qq2-4',
    level: 2,
    question: 'Mi a feltétele annak, hogy egy négyszög HÚRNÉGYSZÖG legyen?',
    options: [
      'A szemközti szögeinek összege 180° legyen: α + γ = β + δ = 180°',
      'A szemközti oldalainak összege egyenlő legyen: a + c = b + d',
      'Az átlói merőlegesen felezzék egymást',
      'Minden oldala egyenlő hosszú legyen'
    ],
    correctAnswer: 0,
    explanation: 'A húrnégyszög-tétel szerint egy négyszög akkor és csak akkor húrnégyszög, ha szemközti szögeinek összege 180°.'
  },
  {
    id: 'qq2-5',
    level: 2,
    question: 'Mi a feltétele annak, hogy egy négyszög ÉRINTŐNÉGYSZÖG legyen (Pithot-tétel)?',
    options: [
      'A szemközti oldalainak összege egyenlő legyen: a + c = b + d',
      'A szemközti szögeinek összege 180° legyen',
      'Az átlói egyenlő hosszúak legyenek',
      'Legyen legalább egy szimmetriatengelye'
    ],
    correctAnswer: 0,
    explanation: 'Pithot tétele kimondja: egy négyszög akkor és csak akkor érintőnégyszög, ha két szemközti oldalának összege egyenlő a másik két szemközti oldal összegével.'
  },
  {
    id: 'qq2-6',
    level: 2,
    question: 'Igaz-e, hogy egy általános paralelogramma (amely nem téglalap) húrnégyszög?',
    options: [
      'Nem, mert szemközti szögei egyenlők, így csak akkor adnának 180°-ot, ha mindkettő 90° lenne (azaz téglalap lenne)',
      'Igen, minden paralelogramma köré írható kör',
      'Csak akkor, ha rombusz alakú',
      'Igen, a középpontos szimmetria miatt mindig'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogrammában α = γ. Ha α + γ = 180°, akkor 2α = 180° → α = 90°. Vagyis csak a téglalap és négyzet lehet húrnégyszög!'
  },
  {
    id: 'qq2-7',
    level: 2,
    question: 'Igaz-e, hogy minden rombusz érintőnégyszög?',
    options: [
      'Igen, mert minden oldala egyenlő (a = b = c = d), így a + c = a + a = 2a = b + d mindig teljesül',
      'Nem, csak a négyzet érintőnégyszög a rombuszok közül',
      'Csak akkor, ha a szögei 60° és 120°',
      'Nem, a rombuszba sosem írható kör'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a rombusz minden oldala egyenlő, szemközti oldalainak összege triviálisan megegyezik (2a = 2a), így bármely rombuszba írható kör.'
  },
  {
    id: 'qq2-8',
    level: 2,
    question: 'Melyik négyszög KÖZÉPPONTOSAN szimmetrikus az alábbiak közül?',
    options: [
      'A paralelogramma (és minden leszármazottja: rombusz, téglalap, négyzet)',
      'A deltoid',
      'A húrtrapéz',
      'Az általános trapéz'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogramma átlóinak metszéspontja szimmetriaközéppont (180°-os forgatásra önmagába megy át). A trapéz és deltoid nem középpontosan szimmetrikus.'
  },
  {
    id: 'qq2-9',
    level: 2,
    question: 'Egy húrtrapéz alapjai a = 12 cm és c = 6 cm, szárai b = d = 5 cm. Mekkora a kerülete?',
    options: ['28 cm', '23 cm', '30 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'A kerület az oldalak összege: K = a + b + c + d = 12 + 5 + 6 + 5 = 28 cm.'
  },
  {
    id: 'qq2-10',
    level: 2,
    question: 'Egy deltoid átlói e = 8 cm és f = 6 cm. Milyen szöget zárnak be egymással az átlók?',
    options: ['90°-ot (merőlegesek egymásra)', '60°-ot', '45°-ot', 'Attól függ, melyik a hosszabbik átló'],
    correctAnswer: 0,
    explanation: 'A deltoid alapvető definíciós tulajdonsága, hogy átlói mindig merőlegesek egymásra (90°).'
  },

  // --- 3. SZINT: Összetett Állítások, Szögszámolás és Bizonyítások (10 kérdés) ---
  {
    id: 'qq3-1',
    level: 3,
    question: 'Melyik az az egyetlen négyszög, amely EGYSZERRE húrnégyszög ÉS érintőnégyszög a paralelogrammák közül?',
    options: [
      'A négyzet',
      'A rombusz',
      'A téglalap',
      'Minden paralelogramma'
    ],
    correctAnswer: 0,
    explanation: 'A paralelogrammák közül csak a téglalap húrnégyszög, és csak a rombusz érintőnégyszög. A kettő metszete a négyzet!'
  },
  {
    id: 'qq3-2',
    level: 3,
    question: 'Egy húrnégyszög három belső szöge: α = 75°, β = 110°, γ = 105°. Mekkora a hiányzó negyedik szög (δ)?',
    figure: <CyclicTangentialSvg size={200} />,
    options: [
      '70° (mert β + δ = 180°)',
      '105°',
      '80°',
      '95°'
    ],
    correctAnswer: 0,
    explanation: 'A húrnégyszög-tétel szerint a szemközti szögek összege 180°: β + δ = 180° → 110° + δ = 180° → δ = 70°. (Ellenőrzés: α + γ = 75° + 105° = 180°).'
  },
  {
    id: 'qq3-3',
    level: 3,
    question: 'Egy érintőnégyszög három egymást követő oldala: a = 7 cm, b = 11 cm, c = 9 cm. Mekkora a d oldal hossza?',
    figure: <CyclicTangentialSvg size={200} />,
    options: [
      '5 cm (mert a + c = b + d → 7 + 9 = 11 + d → 16 = 11 + d)',
      '13 cm',
      '8 cm',
      '6 cm'
    ],
    correctAnswer: 0,
    explanation: 'A Pithot-tétel szerint a szemközti oldalak összege egyenlő: a + c = b + d → 7 + 9 = 11 + d → 16 = 11 + d → d = 5 cm.'
  },
  {
    id: 'qq3-4',
    level: 3,
    question: 'Igaz-e az alábbi kijelentés: "Minden négyzet téglalap, de nem minden téglalap négyzet"?',
    figure: <QuadrilateralHierarchySvg size={200} />,
    options: [
      'Igaz, mert a négyzet rendelkezik a téglalap minden tulajdonságával (minden szöge 90°), plusz az oldalai is egyenlők',
      'Hamis, a négyzet és a téglalap két egymást kizáró alakzat',
      'Hamis, mert nem minden négyzet téglalap',
      'Csak akkor igaz, ha a téglalap oldalai egész számok'
    ],
    correctAnswer: 0,
    explanation: 'A négyszögek hierarchiájában a négyzetek halmaza a téglalapok halmazának valódi részhalmaza.'
  },
  {
    id: 'qq3-5',
    level: 3,
    question: 'Egy négyszög átlói egyenlő hosszúak és merőlegesen felezik egymást. Milyen négyszögről van szó?',
    figure: <QuadrilateralDiagonalsSvg size={200} />,
    options: [
      'Biztosan négyzetről',
      'Lehet általános téglalap is',
      'Lehet általános rombusz is',
      'Deltoidról'
    ],
    correctAnswer: 0,
    explanation: 'Mivel felezik egymást → paralelogramma. Mivel merőlegesek → rombusz. Mivel egyenlők → téglalap. Rombusz és téglalap egyszerre = Négyzet!'
  },
  {
    id: 'qq3-6',
    level: 3,
    question: 'Egy rombusz egyik átlója egyenlő hosszúságú az oldalával (e = a). Mekkorák a rombusz belső szögei?',
    options: [
      '60° és 120°',
      '45° és 135°',
      '90° és 90°',
      '30° és 150°'
    ],
    correctAnswer: 0,
    explanation: 'Ha e = a, akkor a rombuszt az átló két szabályos háromszögre osztja, amelyeknek minden szöge 60°. Így az egyik szögpár 60°, a másik szögpár 2 × 60° = 120°.'
  },
  {
    id: 'qq3-7',
    level: 3,
    question: 'Mit kapunk, ha egy tetszőleges négyszög oldalfelező pontjait sorban összekötjük (Varignon-tétel)?',
    options: [
      'Mindig paralelogrammát',
      'Mindig téglalapot',
      'Mindig trapézt',
      'Attól függ, milyen a négyszög'
    ],
    correctAnswer: 0,
    explanation: 'Varignon tétele kimondja, hogy bármely négyszög oldalfelező pontjait összekötve mindig paralelogrammát kapunk, amelynek oldalai párhuzamosak az eredeti négyszög átlóival!'
  },
  {
    id: 'qq3-8',
    level: 3,
    question: 'Milyen feltétel mellett lesz a Varignon-paralelogramma TÉGLALAP?',
    options: [
      'Ha az eredeti négyszög átlói merőlegesek egymásra (e ⊥ f)',
      'Ha az eredeti négyszög átlói egyenlő hosszúak',
      'Ha az eredeti négyszög húrnégyszög',
      'Ha az eredeti négyszög trapéz'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a Varignon-paralelogramma oldalai párhuzamosak az átlókkal, az oldalai pontosan akkor zárnak be 90°-ot (lesz téglalap), ha az eredeti négyszög átlói merőlegesek egymásra!'
  },
  {
    id: 'qq3-9',
    level: 3,
    question: 'Egy húrtrapéz hosszabbik alapja a = 14 cm, rövidebbik alapja c = 6 cm, a szára b = 5 cm. Mekkora a trapéz magassága (m)?',
    options: [
      '3 cm (a derékszögű háromszög befogója: x = (14 − 6)/2 = 4 cm, m² + 4² = 5² → m = 3 cm)',
      '4 cm',
      '5 cm',
      '2,5 cm'
    ],
    correctAnswer: 0,
    explanation: 'A szimmetria miatt a magasság által levágott vetület az alapon x = (a − c) / 2 = (14 − 6) / 2 = 4 cm. Pitagorasz-tétellel: m = √(5² − 4²) = √(25 − 16) = √9 = 3 cm.'
  },
  {
    id: 'qq3-10',
    level: 3,
    question: 'Lehet-e egy rombusz húrnégyszög úgy, hogy NE legyen négyzet?',
    options: [
      'Nem, mert a rombusz szemközti szögei egyenlők, így ha összegük 180°, akkor mindkettő 90°, azaz a rombusz szükségképpen négyzet',
      'Igen, bármely hegyesszögű rombusz lehet húrnégyszög',
      'Csak akkor, ha az átlói aránya 2:1',
      'Igen, ha a tompaszöge 135°'
    ],
    correctAnswer: 0,
    explanation: 'A rombuszban α = γ. Húrnégyszögben α + γ = 180° → 2α = 180° → α = 90°. Ha egy rombusz szögei 90°-osak, akkor az definíció szerint négyzet!'
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Definíciók',
    subtitle: 'Négyszögek fajtái, belső szögek összege, trapéz és paralelogramma alapok.',
    range: '1 - 10. feladat',
    focus: 'Definíciók és Alapok',
    badgeText: '10 Kérdés',
    questions: questions.slice(0, 10)
  },
  2: {
    level: 2,
    title: '2. Szint: Átlók, Szimmetriák és Pitot-tétel',
    subtitle: 'Átlók merőlegessége és felezése, húrnégyszögek, érintőnégyszögek és oldalszámítás.',
    range: '11 - 20. feladat',
    focus: 'Átlók & Szimmetriák',
    badgeText: '10 Kérdés',
    questions: questions.slice(10, 20)
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Feladatok és Bizonyítások',
    subtitle: 'Szögfelezők metszéspontja, Varignon-tétel, Pitot-tétel alkalmazása és emelt szint.',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    badgeText: '10 Kérdés',
    questions: questions.slice(20, 30)
  }
};

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Négyszögek Hierarchiája',
    badge: 'Osztályozás',
    badgeColor: 'bg-violet-100 text-violet-800 border-violet-300',
    description: 'Trapéz ⊃ Paralelogramma ⊃ Rombusz & Téglalap ⊃ Négyzet.',
    formula: 'Belső szögek összege: (4 − 2) · 180° = 360°',
    note: 'Deltoidból rombusz lesz, ha minden oldala egyenlő hosszúságú.',
    icon: <Boxes className="w-5 h-5 text-violet-600" />
  },
  {
    title: 'Átlók Viszonyai',
    badge: 'e és f átlók',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Felezik egymást: paralelogrammák. Egyenlők (e = f): húrtrapéz, téglalap, négyzet.',
    formula: 'Merőlegesek (e ⊥ f): Deltoid, Rombusz, Négyzet',
    note: 'Négyzetben az átlók egyenlők, felezik egymást és merőlegesek is.',
    icon: <Compass className="w-5 h-5 text-blue-600" />
  },
  {
    title: 'Húr- és Érintőnégyszögek',
    badge: 'Pitot-tétel',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Húrnégyszög: α + γ = β + δ = 180°. Érintőnégyszög: a + c = b + d.',
    formula: 'a + c = b + d (szemközti oldalak összege egyenlő)',
    note: 'Bármely négyszög oldalfelezőit összekötve paralelogramma keletkezik (Varignon).',
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />
  }
];

export const QuadrilateralQuiz: React.FC<QuadrilateralQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  topicId = 'g9-trans-negyszogek',
  topicTitle = '6. Szimmetrikus négyszögek'
}) => {
  return (
    <QuizTemplate
      title="6. Szimmetrikus négyszögek kvíz"
      subtitle="30 válogatott feladat 3 szinten: definíciók, átlók viszonyai, Pitot-tétel és bizonyítások"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG, NÉGYSZÖGEK"
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      questions={questions}
      levels={quizLevels}
      cheatSheet={cheatSheet}
      cheatSheetCards={cheatSheetCards}
      cheatSheetTitle="Geometria Segédlet"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <QuadrilateralMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <QuadrilateralSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

