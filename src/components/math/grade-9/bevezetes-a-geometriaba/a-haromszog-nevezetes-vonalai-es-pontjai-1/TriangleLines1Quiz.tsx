import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { TriangleLines1Matcher } from './TriangleLines1Matcher';
import { TriangleLines1Sorter } from './TriangleLines1Sorter';
import {
  CircumcircleSvg,
  IncircleSvg,
  RightTriangleCirclesSvg
} from './TriangleLines1Figures';
import { ArrowRightLeft, LayoutGrid, Layers, Scale, Circle, Compass, Award } from 'lucide-react';

interface TriangleLines1QuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Nevezetes Középpontok (Könnyű)',
    subtitle: 'Oldalfelező merőlegesek (O) és belső szögfelezők (I) tulajdonságai és helyzete.',
    range: '1 - 10. feladat',
    focus: 'A körülírt és beírt kör alapismeretei',
    questions: [
      {
        id: 'lq1-1',
        questionTypeBadge: 'Körülírt Kör Középpontja',
        question: 'Mely nevezetes vonalak metszéspontja adja a háromszög köré írható körének középpontját (O)?',
        figure: <CircumcircleSvg size={200} />,
        options: [
          'Az oldalfelező merőlegesek',
          'A belső szögfelezők',
          'A magasságvonalak',
          'A súlyvonalak'
        ],
        correctAnswer: 0,
        hint: 'A háromszög csúcsaitól kell egyenlő távol lennie.',
        explanation: 'A szakaszfelező merőlegesek pontjai egyenlő távol vannak a szakasz végpontjaitól. Ezért az oldalfelező merőlegesek metszéspontja mindhárom csúcstól egyenlő ($R$) távolságra van, ez a körülírt kör középpontja.'
      },
      {
        id: 'lq1-2',
        questionTypeBadge: 'Beírt Kör Középpontja',
        question: 'Mely nevezetes vonalak metszéspontja adja a háromszögbe írt kör középpontját (I)?',
        figure: <IncircleSvg size={200} />,
        options: [
          'A belső szögfelezők',
          'Az oldalfelező merőlegesek',
          'A súlyvonalak',
          'A magasságvonalak'
        ],
        correctAnswer: 0,
        hint: 'A háromszög oldalaitól kell egyenlő távol lennie.',
        explanation: 'A szögfelező pontjai egyenlő távol vannak a szögszáraktól, így a három belső szögfelező metszéspontja mindhárom oldaltól egyenlő ($r$) távolságra van. Ez a beírt kör középpontja.'
      },
      {
        id: 'lq1-3',
        questionTypeBadge: 'Körülírt Kör Derékszögű Háromszögben',
        question: 'Hol található a körülírt kör középpontja egy derékszögű háromszögben?',
        figure: <RightTriangleCirclesSvg size={200} />,
        options: [
          'Pontosan az átfogó felezőpontján (R = c / 2)',
          'A derékszögű csúcsban',
          'Mindig a háromszögön kívül',
          'A hosszabbik befogó felezőpontján'
        ],
        correctAnswer: 0,
        hint: 'A Thalész-tétel szerint a derékszögű háromszög átfogója a köré írt kör átmérője.',
        explanation: 'A Thalész-tétel értelmében a derékszögű háromszög átfogója a körülírt kör átmérője ($d = c$), így a kör középpontja pontosan az átfogó felezőpontja, és sugara $R = c / 2$.'
      },
      {
        id: 'lq1-4',
        questionTypeBadge: 'Beírt Kör Elhelyezkedése',
        question: 'Hol helyezkedik el a beírt kör középpontja (I) egy tompaszögű háromszögben?',
        options: [
          'Mindig a háromszög belsejében',
          'A háromszögön kívül',
          'A leghosszabb oldal felezőpontján',
          'A tompaszögű csúcsban'
        ],
        correctAnswer: 0,
        hint: 'A beírt kör a háromszög mindhárom oldalát belülről érinti.',
        explanation: 'A beírt körnek a háromszög belsejében kell lennie, hogy minden oldalát érinthesse, ezért középpontja ($I$) KIVÉTEL NÉLKÜL MINDEN háromszögben (hegyes-, derék- és tompaszögűben is) a háromszög belsejében fekszik.'
      },
      {
        id: 'lq1-5',
        questionTypeBadge: 'Körülírt Kör Tompaszögű Háromszögben',
        question: 'Hol található a körülírt kör középpontja (O) egy tompaszögű háromszög esetén?',
        options: [
          'A háromszögön kívül (a tompaszöggel szemközti oldal oldalán)',
          'A háromszögön belül',
          'A leghosszabb oldal felezőpontján',
          'Nem létezik körülírt köre'
        ],
        correctAnswer: 0,
        hint: 'A tompaszöghöz tartozó körív nagyobb a félkörnél, így a középpont kívülre kerül.',
        explanation: 'Tompaszögű háromszögben a körülírt kör középpontja mindig a háromszög területén kívül helyezkedik el.'
      },
      {
        id: 'lq1-6',
        questionTypeBadge: 'Körülírt Kör Sugara',
        question: 'Egy derékszögű háromszög átfogója c = 14 cm. Mekkora a háromszög köré írható körének sugara (R)?',
        options: ['7 cm', '14 cm', '28 cm', '3,5 cm'],
        correctAnswer: 0,
        hint: 'R = c / 2.',
        explanation: 'Mivel a derékszögű háromszög körülírt körének középpontja az átfogó felezőpontja: R = c / 2 = 14 / 2 = 7 cm.'
      },
      {
        id: 'lq1-7',
        questionTypeBadge: 'Egyenlő Távolság a Csúcsoktól',
        question: 'Egy háromszög síkjában melyik pont van egyenlő távolságra a háromszög mindhárom csúcsától?',
        options: [
          'A körülírt kör középpontja (O)',
          'A beírt kör középpontja (I)',
          'A súlypont (S)',
          'A magasságpont (M)'
        ],
        correctAnswer: 0,
        hint: 'A csúcsok alkotják a körülírt körvonal pontjait.',
        explanation: 'A körülírt kör középpontja ($O$) mindhárom csúcstól azonos, $R$ sugárnyi távolságra van: $|OA| = |OB| = |OC| = R$.'
      },
      {
        id: 'lq1-8',
        questionTypeBadge: 'Egyenlő Távolság az Oldalaktól',
        question: 'Melyik pont van egyenlő távol egy háromszög mindhárom oldalegyenesétől a háromszög belsejében?',
        options: [
          'A beírt kör középpontja (I)',
          'A körülírt kör középpontja (O)',
          'A magasságpont (M)',
          'A súlypont (S)'
        ],
        correctAnswer: 0,
        hint: 'A beírt kör mindegyik oldalt érinti, távolsága a beírt sugár (r).',
        explanation: 'A belső szögfelezők metszéspontja ($I$) mindhárom oldaltól pontosan $r$ távolságra van: $d(I, a) = d(I, b) = d(I, c) = r$.'
      },
      {
        id: 'lq1-9',
        questionTypeBadge: 'Szerkesztési Lépések Száma',
        question: 'Hány oldalfelező merőlegest elegendő megszerkeszteni a körülírt kör középpontjának megtalálásához?',
        options: [
          '2 darabot (a harmadik automatikusan átmegy a metszésponton)',
          'Mind a 3 darabot muszáj',
          '1 darab elegendő',
          '4 darabot'
        ],
        correctAnswer: 0,
        hint: 'Két egyenes metszéspontja egyértelmű, a tétel garantálja a harmadik illeszkedését.',
        explanation: 'Mivel a tétel garantálja, hogy a három oldalfelező merőleges egyetlen pontban metszi egymást, elegendő tetszőleges 2 oldalfelező merőleges metszéspontját megszerkeszteni.'
      },
      {
        id: 'lq1-10',
        questionTypeBadge: 'Szabályos Háromszög Nevezetes Pontjai',
        question: 'Mi igaz a szabályos (egyenlő oldalú) háromszög nevezetes pontjaira (O, I, M, S)?',
        options: [
          'Mind a négy pont egyetlen közös pontba esik egybe',
          'Különböző pontok, de egy egyenesre esnek',
          'Négyzetet alkotnak',
          'Kettő belül, kettő kívül van'
        ],
        correctAnswer: 0,
        hint: 'A szimmetria miatt a magasságvonal, a szögfelező, a súlyvonal és az oldalfelező merőleges mind egybeesik.',
        explanation: 'A szabályos háromszög magas fokú szimmetriája miatt a körülírt kör középpontja ($O$), a beírt kör középpontja ($I$), a súlypont ($S$) és a magasságpont ($M$) egyetlen pontban esik egybe.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások, Képletek és Szögfelező-tétel (Közepes)',
    subtitle: 'Derékszögű háromszög körsugarai (R és r), r = T/s összefüggés és szögfelező arányok.',
    range: '11 - 20. feladat',
    focus: 'Körök sugarainak és arányainak kiszámítása',
    questions: [
      {
        id: 'lq2-1',
        questionTypeBadge: 'Beírt Kör Sugara Derékszögű Háromszögben',
        question: 'Egy derékszögű háromszög befogói a = 6 cm és b = 8 cm (átfogó c = 10 cm). Mekkora a beírt körének sugara (r)?',
        figure: <RightTriangleCirclesSvg size={200} />,
        options: ['2 cm', '4 cm', '5 cm', '1 cm'],
        correctAnswer: 0,
        hint: 'r = (a + b - c) / 2.',
        explanation: 'r = (a + b - c) / 2 = (6 + 8 - 10) / 2 = 4 / 2 = 2 cm.'
      },
      {
        id: 'lq2-2',
        questionTypeBadge: 'Mindkét Kör Sugara',
        question: 'Egy derékszögű háromszög oldalai 5 cm, 12 cm és 13 cm. Mekkora a körülírt és beírt kör sugara (R és r)?',
        options: ['R = 6,5 cm és r = 2 cm', 'R = 13 cm és r = 4 cm', 'R = 6 cm és r = 3 cm', 'R = 7 cm és r = 2,5 cm'],
        correctAnswer: 0,
        hint: 'R = c / 2 = 13 / 2; r = (5 + 12 - 13) / 2.',
        explanation: 'R = c / 2 = 13 / 2 = 6,5 cm. r = (5 + 12 - 13) / 2 = 4 / 2 = 2 cm.'
      },
      {
        id: 'lq2-3',
        questionTypeBadge: 'Beírt Sugár a Területből',
        question: 'Egy háromszög területe T = 84 cm², kerülete K = 42 cm. Mekkora a háromszögbe írt kör sugara (r)?',
        options: ['4 cm', '2 cm', '8 cm', '6 cm'],
        correctAnswer: 0,
        hint: 'r = T / s, ahol s a félkerület (s = K / 2 = 21 cm).',
        explanation: 'A félkerület s = 42 / 2 = 21 cm. A beírt kör sugara: r = T / s = 84 / 21 = 4 cm.'
      },
      {
        id: 'lq2-4',
        questionTypeBadge: 'Szögfelező-tétel Alkalmazása',
        question: 'Egy háromszög belső szögfelezője a szemközti 10 cm-es oldalt két szakaszra osztja. A szomszédos oldalak hossza 6 cm és 9 cm. Milyen hosszú a két levágott szakasz (x és y)?',
        options: ['4 cm és 6 cm', '5 cm és 5 cm', '3 cm és 7 cm', '2 cm és 8 cm'],
        correctAnswer: 0,
        hint: 'A szögfelező-tétel szerint x / y = 6 / 9 = 2 / 3. A 10 cm-t oszd 2 : 3 arányban!',
        explanation: 'x / y = 6 / 9 = 2 / 3. Az arányos részek összege 2 + 3 = 5 egység. 1 egység = 10 / 5 = 2 cm. A szakaszok: x = 2 · 2 = 4 cm és y = 3 · 2 = 6 cm.'
      },
      {
        id: 'lq2-5',
        questionTypeBadge: 'Szögfelező-tétel Fordított Feladat',
        question: 'Egy háromszögben a szögfelező a szemközti oldalt 3 cm-es és 5 cm-es szakaszokra bontja. Ha a rövidebbik szomszédos oldal 9 cm, milyen hosszú a másik szomszédos oldal?',
        options: ['15 cm', '12 cm', '10 cm', '18 cm'],
        correctAnswer: 0,
        hint: 'b / c = 3 / 5. Ha b = 9 cm, akkor 9 / c = 3 / 5.',
        explanation: '3 / 5 = 9 / c => c = (9 · 5) / 3 = 45 / 3 = 15 cm.'
      },
      {
        id: 'lq2-6',
        questionTypeBadge: 'Egyenlő Szárú Háromszög Körei',
        question: 'Egy egyenlő szárú háromszög alapja 12 cm, magassága 8 cm (szárai 10 cm). Mekkora a beírt körének sugara (r)?',
        options: ['3 cm', '4 cm', '2,5 cm', '5 cm'],
        correctAnswer: 0,
        hint: 'T = (12 · 8) / 2 = 48 cm². s = (12 + 10 + 10) / 2 = 16 cm. r = T / s.',
        explanation: 'T = (12 · 8) / 2 = 48 cm². A félkerület s = (12 + 10 + 10) / 2 = 16 cm. r = T / s = 48 / 16 = 3 cm.'
      },
      {
        id: 'lq2-7',
        questionTypeBadge: 'Szabályos Háromszög R és r Aránya',
        question: 'Egy szabályos háromszögben hányszorosa a körülírt kör sugara (R) a beírt kör sugarának (r)?',
        options: ['Pontosan 2-szerese (R = 2r)', '3-szorosa', '√3-szorosa', 'Egyenlők'],
        correctAnswer: 0,
        hint: 'A súlypont a magasságot 2 : 1 arányban osztja. R a felső 2/3 rész, r az alsó 1/3 rész.',
        explanation: 'Mivel szabályos háromszögben a súlypont és a középpontok egybeesnek, a súlypont a magasságot 2 : 1 arányban osztja: R = (2/3)m és r = (1/3)m, tehát R = 2r.'
      },
      {
        id: 'lq2-8',
        questionTypeBadge: 'Körülírt Kör Helyzete Oldalakból',
        question: 'Egy háromszög oldalai 4 cm, 6 cm és 9 cm. Hová esik a körülírt kör középpontja (O)?',
        options: [
          'A háromszögön kívül (mert tompaszögű: 4² + 6² = 52 < 9² = 81)',
          'A háromszögön belül',
          'A 9 cm-es oldal felezőpontjára',
          'A háromszög csúcsába'
        ],
        correctAnswer: 0,
        hint: 'Vizsgáld meg a Pitagorasz-tétel megfordítását: 4² + 6² = 52 és 9² = 81.',
        explanation: '4² + 6² = 16 + 36 = 52 < 81 = 9², így a háromszög tompaszögű. Tompaszögű háromszög esetén a körülírt kör középpontja mindig a háromszögön KÍVÜL helyezkedik el.'
      },
      {
        id: 'lq2-9',
        questionTypeBadge: 'Derékszögű Befogók Összege R és r-ből',
        question: 'Egy derékszögű háromszögben a körülírt kör sugara R = 5 cm, a beírt kör sugara r = 2 cm. Mennyi a két befogó összege (a + b)?',
        options: ['14 cm', '12 cm', '10 cm', '17 cm'],
        correctAnswer: 0,
        hint: 'c = 2R = 10 cm. r = (a + b - c) / 2 => 2 = (a + b - 10) / 2.',
        explanation: 'Átfogó c = 2R = 10 cm. r = (a + b - c) / 2 => 2 = (a + b - 10) / 2 => 4 = a + b - 10 => a + b = 14 cm. (Ez a 6-8-10-es háromszög!).'
      },
      {
        id: 'lq2-10',
        questionTypeBadge: 'Belső Szögfelezők Metszésszöge',
        question: 'Egy háromszög egyik belső szöge α = 80°. Mekkora tompaszöget zár be egymással a másik két szög belső szögfelezője a beírt kör I középpontjában?',
        options: ['130°', '100°', '140°', '120°'],
        correctAnswer: 0,
        hint: 'A másik két félszög összege (180° - 80°) / 2 = 50°. Az I-nél lévő szög: 180° - 50° = 130° (vagy 90° + α/2).',
        explanation: 'A szögfelezők metszésszöge az I pontban: 90° + α / 2 = 90° + 40° = 130°.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Emelt Szintű Számítások és Tételek (Nehéz)',
    subtitle: 'Euler-távolság formula (d² = R² - 2Rr), szabályos és összetett alakzatok körei, külső szögfelezők.',
    range: '21 - 30. feladat',
    focus: 'Összetett összefüggések és elméleti geometriai tételek',
    questions: [
      {
        id: 'lq3-1',
        questionTypeBadge: 'Euler-formula a Középpontok Távolságára',
        question: 'Mi az összefüggés a háromszög körülírt körének (O) és beírt körének (I) középpontja közötti d távolság, valamint az R és r sugarak között (Euler-tétel)?',
        options: [
          'd² = R² - 2Rr (amiből következik, hogy R ≥ 2r)',
          'd = R - r',
          'd² = R² + r²',
          'd = (R + r) / 2'
        ],
        correctAnswer: 0,
        hint: 'Ez Leonhard Euler híres formulája a két középpont távolságára.',
        explanation: 'Az Euler-féle távolságtétel szerint a síkbeli háromszögben a körülírt kör és beírt kör középpontjának távolságára $d^2 = R^2 - 2Rr$. Mivel $d^2 \ge 0$, ebből következik az Euler-egyenlőtlenség: $R \ge 2r$, ahol egyenlőség pontosan a szabályos háromszögnél áll fenn (ekkor $d = 0$).'
      },
      {
        id: 'lq3-2',
        questionTypeBadge: 'Szabályos Háromszög Oldala R-ből',
        question: 'Egy szabályos háromszög körülírt körének sugara R = 6 cm. Milyen hosszú a háromszög oldala (a)?',
        options: ['6√3 cm (kb. 10,39 cm)', '12 cm', '6√2 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'R = (a · √3) / 3 => a = R · √3.',
        explanation: 'Szabályos háromszögben R = a / √3 = (a√3) / 3, így a = R · √3 = 6√3 cm.'
      },
      {
        id: 'lq3-3',
        questionTypeBadge: 'Szabályos Háromszög Beírt Sugara',
        question: 'Az előző feladatban (R = 6 cm, a = 6√3 cm) mekkora a beírt kör sugara (r)?',
        options: ['3 cm', '2 cm', '3√3 cm', '1,5 cm'],
        correctAnswer: 0,
        hint: 'Szabályos háromszögben r = R / 2.',
        explanation: 'Mivel R = 2r szabályos háromszögben, ezért r = R / 2 = 6 / 2 = 3 cm.'
      },
      {
        id: 'lq3-4',
        questionTypeBadge: 'Egyenlő Szárú Derékszögű Háromszög Körei',
        question: 'Egy egyenlő szárú derékszögű háromszög átfogója c = 8 cm. Mekkora a beírt körének sugara (r)?',
        options: ['4√2 - 4 cm (kb. 1,66 cm)', '2 cm', '4 cm', '2√2 cm'],
        correctAnswer: 0,
        hint: 'A befogók a = b = 8 / √2 = 4√2 cm. r = (a + b - c) / 2 = (4√2 + 4√2 - 8) / 2.',
        explanation: 'a = b = 4√2 cm. r = (2a - c) / 2 = a - c / 2 = 4√2 - 4 cm = 4(√2 - 1) cm.'
      },
      {
        id: 'lq3-5',
        questionTypeBadge: 'Körülírt Sugár Területi Képlete',
        question: 'Egy háromszög oldalai a = 13 cm, b = 14 cm, c = 15 cm. A területe T = 84 cm². Mekkora a körülírt körének sugara (R)?',
        options: ['8,125 cm (65 / 8 cm)', '8,5 cm', '7,5 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'Alkalmazd az R = (a · b · c) / (4T) képletet!',
        explanation: 'R = (a · b · c) / (4T) = (13 · 14 · 15) / (4 · 84) = 2730 / 336 = 65 / 8 = 8,125 cm.'
      },
      {
        id: 'lq3-6',
        questionTypeBadge: 'Külső Szögfelezők és Hozzáírt Körök',
        question: 'Hány hozzáírt köre (a háromszög egy oldalát és két másik oldalának meghosszabbítását érintő köre) van egy háromszögnek?',
        options: [
          'Pontosan 3 darab (mindegyik oldalhoz egy-egy)',
          '1 darab',
          'Végtelen sok',
          '2 darab'
        ],
        correctAnswer: 0,
        hint: 'Mindhárom oldalhoz kívülről hozzáírható egy-egy kör, melynek középpontja egy belső és két külső szögfelező metszéspontja.',
        explanation: 'Minden háromszögnek pontosan 3 hozzáírt köre van. Ezek középpontjait egy belső szögfelező és a másik két csúcshoz tartozó külső szögfelezők metszéspontjai határozzák meg.'
      },
      {
        id: 'lq3-7',
        questionTypeBadge: 'Szögfelező Szakasz Hossza',
        question: 'Egy egyenlő szárú háromszög alapja 12 cm, szárai 10 cm. Milyen hosszú az alappal szemközti csúcsból induló belső szögfelező szakasz?',
        options: ['8 cm', '10 cm', '6 cm', '9 cm'],
        correctAnswer: 0,
        hint: 'Egyenlő szárú háromszögben az alaphoz tartozó szögfelező egybeesik az alaphoz tartozó magassággal!',
        explanation: 'Az egyenlő szárú háromszög csúcsszögének szögfelezője a szimmetria miatt egybeesik az alaphoz tartozó magasságvonallal: m = √(10² - 6²) = √(100 - 36) = √64 = 8 cm.'
      },
      {
        id: 'lq3-8',
        questionTypeBadge: 'Érintési Pontok a Beírt Körön',
        question: 'A háromszög oldalait érintő beírt kör érintési pontjai a csúcsokból induló érintőszakaszokat határoznak meg. Milyen hosszú az A csúcsból induló érintőszakasz (x), ha a háromszög félkerülete s, és a szemközti oldal a?',
        options: ['x = s - a', 'x = s - b', 'x = a / 2', 'x = s / 3'],
        correctAnswer: 0,
        hint: 'A három csúcsból induló szakaszok: x + y = c, x + z = b, y + z = a. Összegük 2(x + y + z) = 2s.',
        explanation: 'Mivel x + y + z = s és y + z = a, ezért az A csúcsból induló érintőszakasz hossza: x = s - (y + z) = s - a.'
      },
      {
        id: 'lq3-9',
        questionTypeBadge: 'Derékszögű Háromszög Területe r és s-ből',
        question: 'Egy derékszögű háromszög átfogója c = 25 cm, beírt körének sugara r = 4 cm. Mekkora a háromszög területe (T)?',
        options: ['116 cm²', '100 cm²', '120 cm²', '96 cm²'],
        correctAnswer: 0,
        hint: 'r = (a + b - c) / 2 => 4 = (a + b - 25) / 2 => a + b = 33 cm. Ekkor a félkerület s = (a + b + c) / 2 = (33 + 25) / 2 = 29 cm. T = r · s.',
        explanation: 'r = (a + b - c) / 2 => 8 = a + b - 25 => a + b = 33 cm. A félkerület: s = (a + b + c) / 2 = (33 + 25) / 2 = 29 cm. A terület: T = r · s = 4 · 29 = 116 cm².'
      },
      {
        id: 'lq3-10',
        questionTypeBadge: 'Középpontok egybeesése',
        question: 'Ha egy háromszögben a körülírt kör középpontja (O) és a beírt kör középpontja (I) egybeesik (O = I), mi következik ebből a háromszög alakjára nézve?',
        options: [
          'A háromszög szükségképpen szabályos (egyenlő oldalú)',
          'A háromszög derékszögű',
          'A háromszög egyenlő szárú, de nem szabályos',
          'Bármilyen háromszög lehet'
        ],
        correctAnswer: 0,
        hint: 'Az Euler-tétel szerint d² = R² - 2Rr = 0 pontosan akkor teljesül, ha a háromszög szabályos.',
        explanation: 'Ha O = I, akkor a középpont egyszerre egyenlő távol van a 3 csúcstól és a 3 oldaltól. Ez kizárólag a szabályos (egyenlő oldalú) háromszög esetén valósulhat meg.'
      }
    ]
  }
};

export const TriangleLines1Quiz: React.FC<TriangleLines1QuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="A háromszög nevezetes vonalai és pontjai I."
      subtitle="30 feladat 3 szinten az oldalfelező merőlegesekről, belső szögfelezőkről, körülírt (O) és beírt (I) körökről"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-nevezetes-vonalak-1"
      topicBadge="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • KVÍZ"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      levels={quizLevels}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Keresd meg az összetartozó geometriai párokat!',
          icon: <ArrowRightLeft className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <TriangleLines1Matcher
              key={`triangle-lines-1-matcher-${level}`}
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Csoportosítsd a köröket, középpontokat és képleteket!',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <TriangleLines1Sorter
              key={`triangle-lines-1-sorter-${level}`}
              level={level}
              currentLevel={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      cheatSheetContent={
        <div className="space-y-4">
          <CheatSheetCard
            title="Körülírt Kör (O) és Oldalfelező Merőlegesek"
            icon={<Circle className="w-5 h-5 text-violet-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Metszéspont (O):</strong> mindhárom csúcstól egyenlő távol: |OA| = |OB| = |OC| = R</li>
              <li><strong>Hegyesszögű háromszög:</strong> O a háromszögön belül van</li>
              <li><strong>Derékszögű háromszög:</strong> O az átfogó felezőpontja (R = c / 2)</li>
              <li><strong>Tompaszögű háromszög:</strong> O a háromszögön kívül van</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Beírt Kör (I) és Belső Szögfelezők"
            icon={<Compass className="w-5 h-5 text-pink-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Metszéspont (I):</strong> mindhárom oldaltól egyenlő távol: d(I, a) = d(I, b) = d(I, c) = r</li>
              <li><strong>Elhelyezkedés:</strong> kivétel nélkül MINDIG a háromszögön belül van</li>
              <li><strong>Területi képlet:</strong> T = r · s  (ahol s = (a+b+c)/2 a félkerület)</li>
              <li><strong>Derékszögű háromszögben:</strong> r = (a + b - c) / 2</li>
            </ul>
          </CheatSheetCard>

          <CheatSheetCard
            title="Szögfelező-tétel & Szabályos Háromszög"
            icon={<Layers className="w-5 h-5 text-amber-600" />}
          >
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li><strong>Szögfelező-tétel:</strong> x / y = b / c (szomszédos oldalak arányában oszt)</li>
              <li><strong>Szabályos háromszög:</strong> O = I = M = S (egybeesnek)</li>
              <li><strong>Szabályos háromszög sugarai:</strong> R = 2r = (a · √3) / 3  és  r = (a · √3) / 6</li>
              <li><strong>Euler-tétel:</strong> d² = R² - 2Rr (és R ≥ 2r)</li>
            </ul>
          </CheatSheetCard>
        </div>
      }
    />
  );
};

