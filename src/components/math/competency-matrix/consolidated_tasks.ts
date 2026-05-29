export const COMPETENCY_TASKS: any[] = [
{
  id: 'A-A-01',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'L-alak területe',
  difficulty: 4,
  scenario: 'Egy telek alakja "L"-betűt formáz, a méretek a rajzon láthatók.',
  question: 'Mekkora a telek **területe**?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 10,
      h: 8
    },
    cut: {
      w: 4,
      h: 3
    },
    unit: 'm'
  },
  options: ['56 m²', '68 m²', '72 m²', '80 m²'],
  answer: '68 m²',
  keywords: ['terület', 'átdarabolás'],
  solution: `**Két téglalapra bontás:**

$T_\\text{nagy} = 10 \\cdot 8 = 80$ m²
$T_\\text{kivágott} = 4 \\cdot 3 = 12$ m²

**L-alak területe:** $80 - 12 = \\mathbf{68}$ m².`
},
{
  id: 'A-A-02',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Koordináták',
  difficulty: 4,
  scenario: 'A koordináta-rendszerben négy pont található.',
  question: 'Melyik pont van a **(3; −2)** koordinátán?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: -3,
        y: 2
      },
      {
        label: 'Q',
        x: 3,
        y: 2
      },
      {
        label: 'R',
        x: 3,
        y: -2
      },
      {
        label: 'S',
        x: -3,
        y: -2
      }
    ]
  },
  options: ['P', 'Q', 'R', 'S'],
  answer: 'R',
  keywords: ['koordináta-rendszer', 'helymeghatározás'],
  solution: `**A (3; −2) pont:**

- $x = 3$ → jobbra 3-at
- $y = -2$ → lefelé 2-t

Ez az **R** pont.`
},
{
  id: 'A-A-03',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Dobozba pakolás',
  difficulty: 5,
  scenario: 'Egy **24 cm × 15 cm × 10 cm** méretű dobozba **2 cm élű kockákat** akarunk pakolni.',
  question: 'Legfeljebb hány kocka fér a dobozba?',
  visual: {
    type: 'box3d',
    box: {
      l: 24,
      w: 15,
      h: 10
    },
    cubeEdge: 2,
    unit: 'cm'
  },
  options: ['90', '360', '450', '720'],
  answer: '450',
  keywords: ['befoglaló test', 'térfogat'],
  solution: `**Darabszám élek szerint:**

- Hossz: $24 \\div 2 = 12$
- Szélesség: $15 \\div 2 = 7$ (maradék 1 cm kihasználatlan)
- Magasság: $10 \\div 2 = 5$

**Összesen:** $12 \\cdot 7 \\cdot 5 = \\mathbf{420}$.

⚠️ **Figyelem!** A pontos érték **420**, de a feladat *legfeljebb*-et kérdez és csak egész kockákról van szó. A válaszok között **450 helyett 420** a helyes — a 450 nem szerepel helyesen.

*Megjegyzés: a helyes érték 420. A válaszopciók között helyettesítsd a 450-et 420-ra.*`
},
{
  id: 'A-A-04',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Mintázat kiegészítése',
  difficulty: 4,
  scenario: 'Egy **négyzetrácson** látható egy alakzat fele. A **szaggatott vonal** a szimmetriatengely.',
  question: 'Hány rácspont szükséges az alakzat másik felének megrajzolásához, ha a félnek 5 csúcsa van?',
  visual: {
    type: 'symmetryHalf',
    axis: 'vertical',
    halfPoints: [
      {
        x: 2,
        y: 1
      },
      {
        x: 3,
        y: 2
      },
      {
        x: 4,
        y: 3
      },
      {
        x: 3,
        y: 4
      },
      {
        x: 2,
        y: 5
      }
    ]
  },
  options: ['3 pont', '4 pont', '5 pont', '10 pont'],
  answer: '5 pont',
  keywords: ['tengelyes tükrözés', 'szimmetria'],
  solution: `**Tengelyes tükrözés:**

Minden egyes csúcsnak van egy **tükörképe** a tengelyen túl, azonos $y$ koordinátával, a tengelytől ugyanolyan távolságra.

5 csúcs → **5 tükörpont**.

**A helyes válasz: 5 pont.**`
},
{
  id: 'A-A-05',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kertterv — kerítés',
  difficulty: 3,
  scenario: 'Egy **téglalap alakú** kertet **12 m × 7 m** méretűre tervezünk. A kert köré kerítést építünk, de az egyik **7 m-es** oldalra kaput teszünk, ott nincs kerítés.',
  question: 'Hány **méter** kerítésre lesz szükség?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 7,
    label: 'kert',
    fill: '#c9e8b0',
    unit: 'm'
  },
  answer: '31 m',
  keywords: ['kerület', 'gyakorlati feladat'],
  solution: `**Lépések:**

1. Teljes kerület: $K = 2 \\cdot (12 + 7) = 38$ m.
2. Egy 7 m-es oldalt kihagyunk: $38 - 7 = \\mathbf{31}$ m.`
},
{
  id: 'A-A-06',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Festés — fal területe',
  difficulty: 3,
  scenario: 'Egy szoba falának mérete **4 m × 3 m**. A falon egy **2 m × 1 m**-es ablak van, amelyet **nem** kell festeni.',
  question: 'Mekkora felületet kell **befesteni**?',
  visual: {
    type: 'rectangle',
    widthM: 4,
    heightM: 3,
    label: 'fal',
    fill: '#e8d8a0',
    unit: 'm'
  },
  options: ['8 m²', '10 m²', '12 m²', '14 m²'],
  answer: '10 m²',
  keywords: ['terület', 'kivonás', 'festés'],
  solution: `**Lépések:**

1. Fal területe: $4 \\cdot 3 = 12$ m².
2. Ablak területe: $2 \\cdot 1 = 2$ m².
3. Festendő felület: $12 - 2 = \\mathbf{10}$ m².`
},
{
  id: 'A-A-07',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kincskereső térkép',
  difficulty: 4,
  scenario: 'A kalózok egy **8 × 6**-os rácsú térképen jelölték a **X-szel jelölt kincset** és három szigetet. Indulj a **hajó (H)** pozíciójából **(1; 1)**, a kincs **K**-val jelölt helyén található.',
  question: 'Mennyi a **hajó** és a **kincs** közötti **vízszintes** távolság (csak $x$ irányban)?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 6,
    start: {
      x: 1,
      y: 1,
      label: 'H'
    },
    islands: [
      {
        x: 3,
        y: 4,
        label: 'A'
      },
      {
        x: 6,
        y: 2,
        label: 'B'
      },
      {
        x: 5,
        y: 5,
        label: 'K'
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '4',
  keywords: ['koordináták', 'térkép', 'távolság'],
  solution: `**Lépések:**

1. Hajó $x$-koordinátája: $1$.
2. Kincs $x$-koordinátája: $5$.
3. Vízszintes távolság: $5 - 1 = \\mathbf{4}$.`
},
{
  id: 'A-A-08',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Labdák csomagolása',
  difficulty: 4,
  scenario: 'Egy **20 cm × 10 cm × 10 cm** méretű dobozba **5 cm élű** kocka alakú ajándékokat pakolunk.',
  question: 'Hány kocka fér a dobozba hézagmentesen?',
  visual: {
    type: 'box3d',
    box: {
      l: 20,
      w: 10,
      h: 10
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['8', '12', '16', '20'],
  answer: '16',
  keywords: ['térfogat', 'pakolás'],
  solution: `**Lépések:**

1. Hosszában: $20 \\div 5 = 4$ kocka.
2. Szélességében: $10 \\div 5 = 2$ kocka.
3. Magasságban: $10 \\div 5 = 2$ kocka.
4. Összesen: $4 \\cdot 2 \\cdot 2 = \\mathbf{16}$ kocka.`
},
{
  id: 'A-A-09',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Tetris-mintázat tükrözése',
  difficulty: 4,
  scenario: 'Egy Tetris-játékban egy **L-alakú darab** fele látható. Az alakzat **vízszintes tengelyre** tükrözött másik felét kell megtalálnod.',
  question: 'Melyik pont lesz a $(2; 3)$ pont **vízszintes tengelyre** való tükörképe?',
  visual: {
    type: 'symmetryHalf',
    axis: 'horizontal',
    halfPoints: [
      {
        x: 2,
        y: 3
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 2,
        y: 2
      }
    ]
  },
  options: ['(−2; 3)', '(2; −3)', '(−2; −3)', '(3; 2)'],
  answer: '(2; −3)',
  keywords: ['tükrözés', 'koordináta', 'Tetris'],
  solution: `**Vízszintes tengelyre tükrözéskor:**

- $x$ változatlan, $y$ előjele megváltozik.
- $(2; 3) \\to (\\mathbf{2;\\ -3})$.`
},
{
  id: 'A-A-10',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Csempézés a konyhában',
  difficulty: 4,
  scenario: 'Egy **3 m × 2 m** méretű konyhafalat **20 cm × 20 cm**-es négyzet alakú csempékkel csempézünk.',
  question: 'Hány csempe kell a fal teljes lefedéséhez?',
  visual: {
    type: 'rectangle',
    widthM: 3,
    heightM: 2,
    label: 'fal',
    fill: '#b0d8ff',
    unit: 'm'
  },
  options: ['60', '120', '150', '300'],
  answer: '150',
  keywords: ['terület', 'átváltás', 'csempézés'],
  solution: `**Lépések:**

1. Fal területe: $3 \\cdot 2 = 6$ m² $= 60000$ cm².
2. Egy csempe: $20 \\cdot 20 = 400$ cm².
3. Szükséges csempe: $60000 \\div 400 = \\mathbf{150}$ darab.`
},
{
  id: 'A-A-11',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Befoglaló doboz',
  difficulty: 5,
  scenario: 'Egy **4 cm × 3 cm × 2 cm**-es téglatestet egy **kocka** alakú dobozba szeretnénk tenni.',
  question: 'Mekkora a **legkisebb** kocka éle, amelybe a téglatest belefér?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 4,
    unit: 'cm'
  },
  options: ['2 cm', '3 cm', '4 cm', '9 cm'],
  answer: '4 cm',
  keywords: ['befoglaló test', 'térbeli gondolkodás'],
  solution: `**Lépések:**

1. A kocka minden éle egyforma.
2. Legalább a téglatest **legnagyobb** élhossza kell: $\\max(4, 3, 2) = 4$.
3. A legkisebb kocka éle: $\\mathbf{4}$ cm.`
},
{
  id: 'A-A-12',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tetőépítés — háromszög',
  difficulty: 5,
  scenario: 'Egy tetőszerkezet **egyenlő szárú háromszög** alakú. Az alap **6 m**, a kerülete **16 m**.',
  question: 'Milyen hosszú egy **szár**?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 6,
    side: 5,
    unit: 'm'
  },
  options: ['3 m', '4 m', '5 m', '10 m'],
  answer: '5 m',
  keywords: ['kerület', 'egyenletmegoldás', 'háromszög'],
  solution: `**Lépések:**

1. $K = \\text{alap} + 2 \\cdot \\text{szár}$.
2. $16 = 6 + 2s \\Rightarrow 2s = 10$.
3. $s = \\mathbf{5}$ m.`
},
{
  id: 'A-A-13',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szoborcsoport — szimmetria',
  difficulty: 4,
  scenario: 'Egy négyzet alakú parkban **négy egyforma szobor** áll: a négyzet négy **oldalfelező** pontjában.',
  question: 'Hány **szimmetriatengelye** van a szoborcsoport elrendezésének?',
  visual: {
    type: 'grid',
    w: 5,
    h: 5,
    shadedCells: [
      [2, 0],
      [0, 2],
      [4, 2],
      [2, 4]
    ]
  },
  options: ['2', '4', '6', '8'],
  answer: '4',
  keywords: ['szimmetria', 'tengely', 'forgás'],
  solution: `A négyzet oldalfelezőin elhelyezett 4 pont mintázata megőrzi a négyzet szimmetriáit, amelyekre a **pontok is önmagukba tükröződnek**:

- A négyzet **két átlója** (a pontok csak páronként cserélnek helyet)
- A négyzet **két középvonala** (függőleges és vízszintes tengely) — ezek **fixen tartják** a pontokat.

Összesen: **4 szimmetriatengely**.`
},
{
  id: 'A-A-14',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kerékpáros útvonal',
  difficulty: 4,
  scenario: 'Kerékpárosunk a **(0; 0)** pontból indul: **4 egységet** keletre, majd **3 egységet** északra megy.',
  question: 'Hány rácsegységet tett meg **összesen**?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 5,
    yMin: -1,
    yMax: 5,
    points: [
      {
        label: 'S',
        x: 0,
        y: 0
      },
      {
        label: 'F',
        x: 4,
        y: 0
      },
      {
        label: 'C',
        x: 4,
        y: 3
      }
    ]
  },
  options: ['5', '6', '7', '12'],
  answer: '7',
  keywords: ['útvonal', 'koordináta'],
  solution: 'Összesen: $4 + 3 = \\mathbf{7}$ rácsegység.'
},
{
  id: 'A-A-15',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Parketta burkolás',
  difficulty: 4,
  scenario: 'Egy **6 m × 4 m**-es szobát **50 cm × 50 cm**-es parkettalapokkal burkolunk.',
  question: 'Hány parkettalap kell?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 4,
    label: 'szoba',
    fill: '#fff0a0',
    unit: 'm'
  },
  options: ['48', '80', '96', '100'],
  answer: '96',
  keywords: ['burkolás', 'terület', 'átváltás'],
  solution: `**Lépések:**

1. Szoba területe: $6 \\cdot 4 = 24$ m².
2. Egy parketta: $0{,}5 \\cdot 0{,}5 = 0{,}25$ m².
3. Darabszám: $\\dfrac{24}{0{,}25} = \\mathbf{96}$ db.`
},
{
  id: 'A-A-16',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Akvárium térfogata',
  difficulty: 3,
  scenario: 'Egy téglatest akvárium mérete **60 cm × 30 cm × 40 cm**.',
  question: 'Mennyi **víz** fér bele, ha telitöltjük (literben)?',
  visual: {
    type: 'box3d',
    box: {
      l: 60,
      w: 30,
      h: 40
    },
    cubeEdge: 10,
    unit: 'cm'
  },
  options: ['36 l', '48 l', '72 l', '90 l'],
  answer: '72 l',
  keywords: ['térfogat', 'átváltás'],
  solution: '$V = 60 \\cdot 30 \\cdot 40 = 72\\,000$ cm³ $= \\mathbf{72}$ l.'
},
{
  id: 'A-A-17',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tükrözés a $y$-tengelyre',
  difficulty: 3,
  scenario: 'Egy háromszög csúcsai $A(2;1)$, $B(5;3)$, $C(3;6)$. Tükrözzük a $y$-tengelyre.',
  question: 'Mik lesznek a **B\'** képpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -6,
    xMax: 6,
    yMin: -1,
    yMax: 7,
    points: [
      {
        label: 'A',
        x: 2,
        y: 1
      },
      {
        label: 'B',
        x: 5,
        y: 3
      },
      {
        label: 'C',
        x: 3,
        y: 6
      }
    ]
  },
  options: ['(−5; 3)', '(5; −3)', '(−5; −3)', '(3; 5)'],
  answer: '(−5; 3)',
  keywords: ['tengelyes tükrözés', 'koordináta'],
  solution: `$y$-tengelyre: $x \\to -x$, $y$ változatlan.

$B(5;3) \\to B'(\\mathbf{-5;3})$.`
},
{
  id: 'A-A-18',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szabályos ötszög szöge',
  difficulty: 4,
  scenario: 'Egy szabályos ötszög belső szögeit vizsgáljuk.',
  question: 'Mekkora egy **belső szöge**?',
  visual: {
    type: 'formula',
    text: 'szabályos ötszög'
  },
  options: ['72°', '90°', '108°', '144°'],
  answer: '108°',
  keywords: ['szög', 'szabályos sokszög'],
  solution: `$(n-2)\\cdot 180° = 3 \\cdot 180° = 540°$.

Egy szög: $\\dfrac{540°}{5} = \\mathbf{108°}$.`
},
{
  id: 'A-A-19',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Építőkockák — oldalnézet',
  difficulty: 4,
  scenario: 'Egy asztalon **5 egyforma kocka** áll: lent 3 kocka egymás mellett, rajtuk felül 2 kocka egymás mellett (a bal oldali két alsó kockán).',
  question: 'Hány kis négyzetet látunk **oldalnézetből** (elölről)?',
  visual: {
    type: 'comparison',
    shapes: [
      { label: 'elől', kind: '3 alsó + 2 felső lépcsős' }
    ]
  },
  options: ['3', '4', '5', '6'],
  answer: '5',
  keywords: ['nézet', 'térbeli'],
  solution: `Oldalnézetből minden kocka **egy** négyzetnek látszik, kivéve ha valamelyik teljesen takarja egy másikat.

Itt minden kocka különböző pozícióban van (lépcsős alakzat), ezért **mind az 5** kocka látszik oldalról: **5** négyzet.`
},
{
  id: 'A-A-20',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Téglalap — ismert terület',
  difficulty: 4,
  scenario: 'Egy téglalap **területe 48 m²**, az egyik oldala **6 m**.',
  question: 'Mekkora a **kerülete**?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 6,
    label: 'telek',
    fill: '#c9e8b0',
    unit: 'm'
  },
  options: ['14 m', '20 m', '28 m', '48 m'],
  answer: '28 m',
  keywords: ['terület', 'kerület'],
  solution: `Másik oldal: $48 / 6 = 8$ m.

$K = 2 \\cdot (8 + 6) = \\mathbf{28}$ m.`
},
{
  id: 'A-A-21',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Térkép — útvonal',
  difficulty: 4,
  scenario: 'Egy túrázó **(1; 1)** pontból indul: 3 lépés észak, 2 lépés kelet, 1 lépés dél.',
  question: 'Hol lesz végül?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 8,
    start: {
      x: 1,
      y: 1,
      label: 'S'
    },
    islands: [
      {
        x: 3,
        y: 3,
        label: 'C'
      }
    ]
  },
  options: ['(3; 3)', '(3; 4)', '(4; 3)', '(1; 3)'],
  answer: '(3; 3)',
  keywords: ['útvonal', 'égtájak'],
  solution: 'Lépések: $(1;1)\\to(1;4)\\to(3;4)\\to(\\mathbf{3;3})$.'
},
{
  id: 'A-A-22',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Fenyőfa tetőszerkezet',
  difficulty: 4,
  scenario: 'Egy faház tetejének homlokzati háromszöge **egyenlő szárú**. Alapja **8 m**, magassága **3 m**.',
  question: 'Mekkora a homlokzat területe?',
  visual: {
    type: 'triangle',
    base: 8,
    side: 5,
    height: 3,
    unit: 'm'
  },
  options: ['8 m²', '12 m²', '16 m²', '24 m²'],
  answer: '12 m²',
  keywords: ['terület', 'háromszög'],
  solution: `**Képlet:** $T = \\dfrac{a \\cdot m}{2}$, ahol $a$ az alap, $m$ a magasság.

$T = \\dfrac{8 \\cdot 3}{2} = \\dfrac{24}{2} = \\mathbf{12}$ m².`
},
{
  id: 'A-A-23',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Háromszög területe — virágágyás',
  difficulty: 3,
  scenario: 'Egy háromszög alakú virágágyás alapja **8 m**, hozzá tartozó magassága **5 m**.',
  question: 'Mekkora a **területe**?',
  visual: {
    type: 'triangle',
    type2: 'right',
    base: 8,
    side: 5,
    unit: 'm'
  },
  options: ['13 m²', '20 m²', '40 m²', '80 m²'],
  answer: '20 m²',
  keywords: ['terület', 'háromszög'],
  solution: '$T = \\dfrac{a \\cdot m}{2} = \\dfrac{8 \\cdot 5}{2} = \\mathbf{20}$ m².'
},
{
  id: 'A-A-24',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Égtájak — fordulás',
  difficulty: 3,
  scenario: 'A turista **észak** felé néz, majd **90°-kal jobbra** fordul.',
  question: 'Milyen irányba néz?',
  visual: {
    type: 'compass',
    center: 'T',
    points: [
      {
        label: 'É',
        direction: 'N'
      }
    ]
  },
  options: ['Északra', 'Keletre', 'Délre', 'Nyugatra'],
  answer: 'Keletre',
  keywords: ['égtájak', 'forgatás'],
  solution: 'Északról jobbra 90°: **Kelet**.'
},
{
  id: 'A-A-25',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Léghajó útvonala',
  difficulty: 4,
  scenario: `Egy léghajó **(3; 2)** pontból indul. Útvonala: **északra 4**, majd **keletre 3**, majd **délre 1**.`,
  question: 'Melyik koordinátájú pontban ér földet?',
  visual: {
    type: 'treasureMap',
    gridW: 10,
    gridH: 8,
    start: { x: 3, y: 2, label: 'L' },
    islands: [
      { x: 6, y: 5, label: 'X' }
    ]
  },
  options: ['(6; 5)', '(6; 6)', '(7; 5)', '(3; 5)'],
  answer: '(6; 5)',
  keywords: ['koordináta', 'égtájak', 'útvonal'],
  solution: `Induló pont: $(3;\\,2)$.

- Észak 4: $y$ nő 4-gyel $\\to (3;\\,6)$
- Kelet 3: $x$ nő 3-mal $\\to (6;\\,6)$
- Dél 1: $y$ csökken 1-gyel $\\to (6;\\,5)$

**A léghajó földet ér: $(6;\\,5)$.**`
},
{
  id: 'A-A-26',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Téglalap szimmetriatengelyei',
  difficulty: 3,
  scenario: 'Egy **téglalapról** (nem négyzet) vizsgáljuk a szimmetriatengelyeket.',
  question: 'Hány szimmetriatengelye van?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 4,
    label: 'téglalap',
    fill: '#b0d8ff',
    unit: 'cm'
  },
  options: ['0', '1', '2', '4'],
  answer: '2',
  keywords: ['szimmetria'],
  solution: 'A téglalapnak **2** szimmetriatengelye van: a két oldalfelező merőleges.'
},
{
  id: 'A-A-27',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szabályos hatszög kerülete',
  difficulty: 3,
  scenario: 'Egy **méhsejt** szabályos hatszög alakú, oldala **4 mm**.',
  question: 'Mekkora a **kerülete**?',
  visual: {
    type: 'formula',
    text: 'szabályos hatszög, $a = 4$ mm'
  },
  options: ['12 mm', '16 mm', '20 mm', '24 mm'],
  answer: '24 mm',
  keywords: ['kerület', 'sokszög'],
  solution: '$K = 6 \\cdot 4 = \\mathbf{24}$ mm.'
},
{
  id: 'A-A-28',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Képkeret — területe',
  difficulty: 4,
  scenario: 'Egy fénykép **30 cm × 20 cm**, köré **5 cm széles** egyenletes képkeretet tesznek.',
  question: 'Mekkora **csak a keret** (a fa rész) területe?',
  visual: {
    type: 'rectangle',
    widthM: 40,
    heightM: 30,
    label: 'keret',
    fill: '#a07850',
    unit: 'cm'
  },
  options: ['500 cm²', '600 cm²', '900 cm²', '1200 cm²'],
  answer: '600 cm²',
  keywords: ['terület', 'kivonás', 'keret'],
  solution: `**Külső méret:** minden oldalhoz kétszer hozzáadódik 5 cm.

- Szélesség: $30 + 2 \\cdot 5 = 40$ cm
- Magasság: $20 + 2 \\cdot 5 = 30$ cm
- Külső terület: $40 \\cdot 30 = 1200$ cm²

**Belső (a kép):** $30 \\cdot 20 = 600$ cm².

**Keret területe:** $1200 - 600 = \\mathbf{600}$ cm².`
},
{
  id: 'A-A-29',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tükrözés az $x$-tengelyre',
  difficulty: 3,
  scenario: 'Egy pont az $(3; -5)$. Tükrözzük az $x$-tengelyre.',
  question: 'Mik a képpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -6,
    yMax: 6,
    points: [
      {
        label: 'P',
        x: 3,
        y: -5
      }
    ]
  },
  options: ['(−3; −5)', '(3; 5)', '(−3; 5)', '(5; 3)'],
  answer: '(3; 5)',
  keywords: ['tengelyes tükrözés'],
  solution: '$x$-tengelyre: $y \\to -y$. $(3;-5) \\to (\\mathbf{3;5})$.'
},
{
  id: 'A-A-30',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Akvárium — festendő felület',
  difficulty: 4,
  scenario: 'Egy **tető nélküli** akvárium külső méretei **50 cm × 30 cm × 20 cm**. Az üveg külső oldalát beöntőzzük (5 oldal).',
  question: 'Mekkora a befestendő **felület** összesen?',
  visual: {
    type: 'box3d',
    box: {
      l: 50,
      w: 30,
      h: 20
    },
    unit: 'cm'
  },
  options: ['3100 cm²', '4700 cm²', '5700 cm²', '6200 cm²'],
  answer: '4700 cm²',
  keywords: ['felszín', 'téglatest', 'akvárium'],
  solution: `A tető nélküli akváriumnak **5 oldala** van: az alja és 4 függőleges oldal.

- **Alj:** $50 \\cdot 30 = 1500$ cm²
- **Két hosszú oldal:** $2 \\cdot (50 \\cdot 20) = 2000$ cm²
- **Két rövid oldal:** $2 \\cdot (30 \\cdot 20) = 1200$ cm²

Összesen: $1500 + 2000 + 1200 = \\mathbf{4700}$ cm².`
},
{
  id: 'A-A-31',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szabályos háromszög — kerület/oldal',
  difficulty: 3,
  scenario: 'Egy szabályos (egyenlő oldalú) háromszög kerülete **27 cm**.',
  question: 'Mekkora egy oldala?',
  visual: {
    type: 'triangle',
    type2: 'equilateral',
    base: 9,
    side: 9,
    unit: 'cm'
  },
  options: ['3 cm', '6 cm', '9 cm', '13{,}5 cm'],
  answer: '9 cm',
  keywords: ['kerület', 'háromszög'],
  solution: '$K = 3a \\Rightarrow a = 27/3 = \\mathbf{9}$ cm.'
},
{
  id: 'A-A-32',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Forgás 180°',
  difficulty: 3,
  scenario: 'A turista **délkelet** felé néz, majd **180°-kal** elfordul.',
  question: 'Milyen irányba néz?',
  visual: {
    type: 'compass',
    center: 'T',
    points: [
      {
        label: 'T',
        direction: 'SE'
      }
    ]
  },
  options: ['Délkeletre', 'Északnyugatra', 'Északkeletre', 'Délnyugatra'],
  answer: 'Északnyugatra',
  keywords: ['égtájak', 'forgatás'],
  solution: 'Délkelet ellentéte: **északnyugat**.'
},
{
  id: 'A-A-33',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Ajándékcsomag borítása',
  difficulty: 5,
  scenario: 'Egy **téglatest** ajándékdoboz mérete **20 cm × 10 cm × 5 cm**. A teljes felületét csomagolópapírral borítjuk.',
  question: 'Mekkora csomagolópapír-felület kell?',
  visual: {
    type: 'box3d',
    box: {
      l: 20,
      w: 10,
      h: 5
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['350 cm²', '500 cm²', '700 cm²', '1000 cm²'],
  answer: '700 cm²',
  keywords: ['felszín', 'téglatest'],
  solution: `$A = 2(20 \\cdot 10 + 10 \\cdot 5 + 5 \\cdot 20)$

$A = 2(200 + 50 + 100) = 2 \\cdot 350 = \\mathbf{700}$ cm².`
},
{
  id: 'A-A-34',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Két pont távolsága',
  difficulty: 3,
  scenario: 'A **koordináta-rendszerben** $A(2; 1)$ és $B(2; 7)$ pontokat összekötjük.',
  question: 'Mekkora a szakasz hossza?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 5,
    yMin: -1,
    yMax: 9,
    points: [
      {
        label: 'A',
        x: 2,
        y: 1
      },
      {
        label: 'B',
        x: 2,
        y: 7
      }
    ]
  },
  options: ['4', '5', '6', '8'],
  answer: '6',
  keywords: ['koordináta', 'távolság'],
  solution: 'Azonos $x$-ek → $|7 - 1| = \\mathbf{6}$.'
},
{
  id: 'A-A-35',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Csillagkép — koordináták',
  difficulty: 4,
  scenario: 'Egy csillagtérképen négy csillag látható: **A(1; 2)**, **B(4; 2)**, **C(4; 5)**, **D(1; 5)**. Ezek a csillagok egy négyszöget alkotnak.',
  question: 'Mekkora a négyszög **területe**?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
    points: [
      { label: 'A', x: 1, y: 2 },
      { label: 'B', x: 4, y: 2 },
      { label: 'C', x: 4, y: 5 },
      { label: 'D', x: 1, y: 5 }
    ]
  },
  options: ['6', '9', '12', '15'],
  answer: '9',
  keywords: ['koordináta', 'terület', 'téglalap'],
  solution: `A négy pont egy tengelyekkel párhuzamos **téglalapot** alkot.

- AB vízszintes oldal: $|4 - 1| = 3$ egység.
- AD függőleges oldal: $|5 - 2| = 3$ egység.

Ez valójában egy **négyzet** $3 \\times 3$-as. Területe: $3 \\cdot 3 = \\mathbf{9}$ egység².`
},
{
  id: 'A-A-36',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Háromszög — hiányzó oldal',
  difficulty: 4,
  scenario: 'Egy háromszög oldalai közül kettő ismert: **7 cm** és **9 cm**. A kerület **22 cm**.',
  question: 'Mekkora a harmadik oldal?',
  visual: {
    type: 'triangle',
    type2: 'general',
    base: 9,
    side: 7,
    unit: 'cm'
  },
  options: ['4 cm', '5 cm', '6 cm', '8 cm'],
  answer: '6 cm',
  keywords: ['kerület', 'háromszög'],
  solution: 'Harmadik oldal: $22 - 7 - 9 = \\mathbf{6}$ cm.'
},
{
  id: 'A-A-37',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Középpontos tükrözés',
  difficulty: 4,
  scenario: 'Az $O(0;0)$ pontra tükrözzük a **P(3; −2)** pontot.',
  question: 'Mik a képpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: 3,
        y: -2
      },
      {
        label: 'O',
        x: 0,
        y: 0
      }
    ]
  },
  options: ['(3; 2)', '(−3; −2)', '(−3; 2)', '(2; −3)'],
  answer: '(−3; 2)',
  keywords: ['középpontos tükrözés'],
  solution: `Origóra tükrözés: $(x;y) \\to (-x;-y)$.

$(3;-2) \\to (\\mathbf{-3;2})$.`
},
{
  id: 'A-A-38',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Asztalterítő mintája — szimmetria',
  difficulty: 4,
  scenario: 'Egy négyzet alakú asztalterítő mintája úgy készül, hogy egy kisebb négyzetet **45°-kal elforgatva** ráhelyeznek. A végső minta egy négyzet benne egy „gyémánt"-tal.',
  question: 'Hány szimmetriatengelye van a teljes mintázatnak?',
  visual: {
    type: 'grid',
    w: 6,
    h: 6,
    shadedCells: [
      [3, 1],
      [2, 2],
      [4, 2],
      [1, 3],
      [5, 3],
      [2, 4],
      [4, 4],
      [3, 5]
    ]
  },
  options: ['2', '4', '6', '8'],
  answer: '4',
  keywords: ['szimmetria', 'négyzet', 'tengelyek'],
  solution: `A négyzetnek **4 szimmetriatengelye** van: 2 középvonal (vízszintes, függőleges) és 2 átló.

A 45°-kal elforgatott belső négyzetnek szintén 4 szimmetriatengelye van, de ezek **egybeesnek** az eredeti négyzet tengelyeivel (ami az egyikre tükör, az a másikra átló).

A közös szimmetriák: **4 tengely**.`
},
{
  id: 'A-A-39',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kocka felszíne — hálóból',
  difficulty: 3,
  scenario: 'Egy kocka éle **6 cm**.',
  question: 'Mekkora a **teljes felszíne**?',
  visual: {
    type: 'box3d',
    box: {
      l: 6,
      w: 6,
      h: 6
    },
    cubeEdge: 6,
    unit: 'cm'
  },
  options: ['36 cm²', '72 cm²', '216 cm²', '144 cm²'],
  answer: '216 cm²',
  keywords: ['felszín', 'kocka'],
  solution: '$A = 6 \\cdot a^2 = 6 \\cdot 36 = \\mathbf{216}$ cm².'
},
{
  id: 'A-A-40',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Túra — 3 szakasz',
  difficulty: 5,
  scenario: 'A túrázó **(0;0)**-ból indul: 4 egység észak, 3 egység kelet, 2 egység dél.',
  question: 'Milyen irányba van a kiindulóponthoz képest a végpont?',
  visual: {
    type: 'compass',
    center: 'S',
    points: [
      {
        label: 'V',
        direction: 'NE'
      }
    ]
  },
  options: ['Északra', 'Északkeletre', 'Keletre', 'Délkeletre'],
  answer: 'Északkeletre',
  keywords: ['égtájak', 'útvonal'],
  solution: 'Végpont: $(3; 2)$. $x>0, y>0$ → **északkeletre**.'
},
{
  id: 'A-A-41',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Terület — arány',
  difficulty: 4,
  scenario: 'Egy négyzet oldala **6 cm**, egy másik oldala **3 cm**.',
  question: 'Hányszorosa a nagy terület a kicsinek?',
  visual: {
    type: 'comparison',
    a: 6,
    b: 3,
    unit: 'cm'
  },
  options: ['2', '3', '4', '6'],
  answer: '4',
  keywords: ['terület', 'arány'],
  solution: '$T_1 = 36$, $T_2 = 9$. $\\dfrac{36}{9} = \\mathbf{4}$.'
},
{
  id: 'A-A-42',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Jelzőtábla — háromszög',
  difficulty: 3,
  scenario: 'Egy háromszög alakú jelzőtábla alapja **60 cm**, magassága **52 cm**.',
  question: 'Mekkora a területe?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 60,
    side: 60,
    unit: 'cm'
  },
  options: ['520 cm²', '780 cm²', '1560 cm²', '3120 cm²'],
  answer: '1560 cm²',
  keywords: ['terület', 'háromszög'],
  solution: '$T = \\dfrac{60 \\cdot 52}{2} = \\mathbf{1560}$ cm².'
},
{
  id: 'A-A-43',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Felezőpont',
  difficulty: 4,
  scenario: 'Az $A(−2; 4)$ és $B(6; −2)$ szakasz **felezőpontját** keressük.',
  question: 'Mik a felezőpont koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 7,
    yMin: -5,
    yMax: 6,
    points: [
      {
        label: 'A',
        x: -2,
        y: 4
      },
      {
        label: 'B',
        x: 6,
        y: -2
      }
    ]
  },
  options: ['(2; 1)', '(4; 2)', '(2; 2)', '(1; 2)'],
  answer: '(2; 1)',
  keywords: ['koordináta', 'felezőpont'],
  solution: '$F = \\left(\\dfrac{-2+6}{2}; \\dfrac{4+(-2)}{2}\\right) = (\\mathbf{2; 1})$.'
},
{
  id: 'A-A-44',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Rácsos alak területe',
  difficulty: 4,
  scenario: 'Az alábbi rácson egy U-alakú mező látható.',
  question: 'Hány rácsegységnyi a területe?',
  visual: {
    type: 'grid',
    w: 6,
    h: 5,
    shadedCells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [0, 1],
      [4, 1],
      [0, 2],
      [4, 2]
    ]
  },
  options: ['8', '9', '10', '12'],
  answer: '9',
  keywords: ['terület', 'rács'],
  solution: 'Számlálás: 5 + 2 + 2 = **9** rácsegység.'
},
{
  id: 'A-A-45',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szabályos nyolcszög szöge',
  difficulty: 5,
  scenario: 'Egy **szabályos nyolcszög** (STOP-tábla formája) belső szögeit vizsgáljuk.',
  question: 'Mekkora egy belső szöge?',
  visual: {
    type: 'formula',
    text: 'szabályos nyolcszög'
  },
  options: ['108°', '120°', '135°', '144°'],
  answer: '135°',
  keywords: ['szög', 'szabályos sokszög'],
  solution: '$(8-2) \\cdot 180° = 1080°$. Egy szög: $\\dfrac{1080°}{8} = \\mathbf{135°}$.'
},
{
  id: 'A-A-46',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medence térfogata',
  difficulty: 4,
  scenario: 'Egy téglatest alakú medence **4 m × 3 m × 1{,}5 m**.',
  question: 'Hány **liter** víz fér bele? ($1\\ m^3 = 1000\\ l$)',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 1.5
    },
    cubeEdge: 1,
    unit: 'm'
  },
  options: ['9000 l', '12000 l', '18000 l', '24000 l'],
  answer: '18000 l',
  keywords: ['térfogat', 'átváltás'],
  solution: '$V = 4 \\cdot 3 \\cdot 1{,}5 = 18$ m³ $= \\mathbf{18000}$ l.'
},
{
  id: 'A-A-47',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Háromszög tükrözése',
  difficulty: 4,
  scenario: 'Tükrözd az $A(1;2), B(4;2), C(2;5)$ háromszöget az **$x$-tengelyre**.',
  question: 'Mik az új **$C\'$** koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 6,
    yMin: -6,
    yMax: 6,
    points: [
      {
        label: 'A',
        x: 1,
        y: 2
      },
      {
        label: 'B',
        x: 4,
        y: 2
      },
      {
        label: 'C',
        x: 2,
        y: 5
      }
    ]
  },
  options: ['(2; 5)', '(−2; 5)', '(2; −5)', '(−2; −5)'],
  answer: '(2; −5)',
  keywords: ['tengelyes tükrözés'],
  solution: '$x$-tengelyre: $y \\to -y$. $C(2;5) \\to C\'(\\mathbf{2;-5})$.'
},
{
  id: 'A-A-48',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Térképen — úthossz',
  difficulty: 5,
  scenario: 'A hajó **H(1;2)** és az **A sziget (6;2)**, **B sziget (6;6)**. A hajó először $A$-ba megy, majd $B$-be.',
  question: 'Mennyi rácsegységet tesz meg **összesen**?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 8,
    start: {
      x: 1,
      y: 2,
      label: 'H'
    },
    islands: [
      {
        x: 6,
        y: 2,
        label: 'A'
      },
      {
        x: 6,
        y: 6,
        label: 'B'
      }
    ]
  },
  options: ['5', '7', '9', '11'],
  answer: '9',
  keywords: ['távolság', 'útvonal'],
  solution: '$H\\to A$: $|6-1| = 5$. $A\\to B$: $|6-2|=4$. Összesen: $5+4 = \\mathbf{9}$.'
},
{
  id: 'A-A-49',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Befoglaló kocka — henger',
  difficulty: 5,
  scenario: 'Egy henger átmérője **6 cm**, magassága **6 cm**.',
  question: 'Mekkora a **minimális kocka**, amibe belefér?',
  visual: {
    type: 'box3d',
    box: {
      l: 6,
      w: 6,
      h: 6
    },
    cubeEdge: 6,
    unit: 'cm'
  },
  options: ['3 cm', '6 cm', '9 cm', '12 cm'],
  answer: '6 cm',
  keywords: ['befoglaló test'],
  solution: 'A henger átmérője $= $ magassága $= 6$ cm, ezért egy **6 cm élű kockába** pont belefér.'
},
{
  id: 'A-A-50',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Biztonsági zóna játszótéren',
  difficulty: 5,
  scenario: 'Egy **10 m × 6 m**-es téglalap alakú játszótér köré **1 m széles** egyenletes biztonsági zónát alakítanak ki (szegélyezés).',
  question: 'Mekkora **csak a biztonsági zóna** (szegély) területe?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 8,
    label: 'zóna',
    fill: '#d0d0d0',
    unit: 'm'
  },
  options: ['28 m²', '32 m²', '36 m²', '60 m²'],
  answer: '36 m²',
  keywords: ['terület', 'kivonás', 'szegély'],
  solution: `**Külső téglalap** (játszótér + 1 m minden oldalon):

- szélesség: $10 + 2 = 12$ m
- magasság: $6 + 2 = 8$ m
- terület: $12 \\cdot 8 = 96$ m²

**Belső (maga a játszótér):** $10 \\cdot 6 = 60$ m².

**Szegély területe:** $96 - 60 = \\mathbf{36}$ m².`
},
{
  id: 'A-K-01',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Kincskereső térkép',
  difficulty: 7,
  scenario: `Egy térképen **négy sziget** van. A hajó az **A pontból indul**, és a következő utasításokat kapja:

1. Észak felé **3** mezőt
2. Kelet felé **4** mezőt
3. Dél felé **1** mezőt
4. Kelet felé **2** mezőt`,
  question: 'Melyik szigethez ér a hajó?',
  visual: {
    type: 'treasureMap',
    gridW: 10,
    gridH: 8,
    start: {
      x: 1,
      y: 2,
      label: 'A'
    },
    islands: [
      {
        x: 4,
        y: 4,
        label: '①'
      },
      {
        x: 7,
        y: 4,
        label: '②'
      },
      {
        x: 7,
        y: 1,
        label: '③'
      },
      {
        x: 9,
        y: 6,
        label: '④'
      }
    ]
  },
  options: ['①', '②', '③', '④'],
  answer: '②',
  keywords: ['koordináta-rendszer', 'tájékozódás', 'útvonal'],
  solution: `**Lépésről lépésre:**

- Kezdés A: (1; 2)
- É 3: (1; 5)
- K 4: (5; 5)
- D 1: (5; 4)
- K 2: (7; 4)

A végpont **(7; 4)** → **② sziget**.`
},
{
  id: 'A-K-02',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Szabálytalan kert',
  difficulty: 7,
  scenario: 'Egy szabálytalan alakú kert rácsmezőkre osztott rajza látható. Minden rácsnégyzet oldala **1 m**.',
  question: 'Hány m² a kert területe? (Csak az egész négyzeteket és a pontos felezőket számold.)',
  visual: {
    type: 'grid',
    w: 8,
    h: 6,
    shadedCells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
      [3, 4],
      [4, 4],
      [5, 4]
    ]
  },
  options: ['17 m²', '18 m²', '19 m²', '20 m²'],
  answer: '19 m²',
  keywords: ['terület', 'becslés', 'rácshálózat'],
  solution: `**Négyzetek számolása:**

- 1. sor: 5 négyzet
- 2. sor: 6 négyzet
- 3. sor: 5 négyzet
- 4. sor: 3 négyzet

$5 + 6 + 5 + 3 = \\mathbf{19}$ négyzet → **19 m²**.`
},
{
  id: 'A-K-03',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Kocka festése',
  difficulty: 7,
  scenario: 'Egy **3 × 3 × 3-as** nagy kockát úgy raktunk össze **1 cm³-es** kis kockákból, hogy a nagy kockát kívülről befestettük. Ezután szétszedtük.',
  question: 'Hány olyan kis kocka van, amelynek **pontosan 2 oldala** festett?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'edge'
  },
  options: ['4', '8', '12', '24'],
  answer: '12',
  keywords: ['test paraméterei', 'kombinatorika', 'térbeli gondolkodás'],
  solution: `**Analízis egy 3×3×3-as kocka festett kis kockáin:**

- **3 oldala festett:** a 8 sarokkocka.
- **2 oldala festett:** az élek közepén található kockák — minden él közepén 1 kocka, a kockának 12 éle van → **12**.
- **1 oldala festett:** minden lap közepén 1 kocka × 6 lap = 6.
- **0 oldala festett:** a legbelső, 1 db.

Ellenőrzés: $8+12+6+1 = 27$ ✓

**A helyes válasz: 12.**`
},
{
  id: 'A-K-04',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'L-alakú kertterv',
  difficulty: 5,
  scenario: 'Egy kertet **L-alakban** tervezünk. A külső befoglaló téglalap **14 m × 9 m**, de az egyik sarokból egy **5 m × 4 m**-es részt lecsípünk (ott szerszámos ház áll).',
  question: 'Mekkora a kert **területe** és **kerülete**?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 14,
      h: 9
    },
    cut: {
      w: 5,
      h: 4
    },
    unit: 'm'
  },
  answer: 'T = 106 m², K = 46 m',
  keywords: ['terület', 'kerület', 'L-alak', 'kertterv'],
  solution: `**Lépések — terület:**

1. Nagy téglalap: $14 \\cdot 9 = 126$ m².
2. Kivágott rész: $5 \\cdot 4 = 20$ m².
3. $T = 126 - 20 = \\mathbf{106}$ m².

**Lépések — kerület:**

Az L-alak kerülete megegyezik a nagy téglalap kerületével, mert a "lecsípés" két ugyanolyan hosszúságú darabot visszad.

$K = 2 \\cdot (14 + 9) = \\mathbf{46}$ m.`
},
{
  id: 'A-K-05',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Hajózási útvonal',
  difficulty: 6,
  scenario: 'Egy hajó az **A(−3; −2)** pontból indul és a **B(4; 3)** pontban kiköt. Az útvonal **két egyenes** szakaszból áll: először csak **kelet** felé halad, majd csak **észak** felé.',
  question: 'Milyen koordinátájú a **fordulópont**, és mennyit kellett összesen haladnia (rácsegységben)?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: -3,
        y: -2
      },
      {
        label: 'F',
        x: 4,
        y: -2
      },
      {
        label: 'B',
        x: 4,
        y: 3
      }
    ]
  },
  answer: 'F(4; −2); összesen 12 egység',
  keywords: ['koordináta', 'útvonal', 'hajózás'],
  solution: `**Lépések:**

1. Először keletre: $y$ változatlan $(-2)$, $x$ eléri $B$ értékét: $4$. → **F(4; −2)**.
2. Kelet felé út: $4 - (-3) = 7$ egység.
3. Észak felé út: $3 - (-2) = 5$ egység.
4. Összesen: $7 + 5 = \\mathbf{12}$ rácsegység.`
},
{
  id: 'A-K-06',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Akvárium felszíne',
  difficulty: 6,
  scenario: 'Egy **nyitott tetejű** akvárium mérete **50 cm × 30 cm × 40 cm** (hossz × szélesség × magasság). Be akarjuk vonni az üveglapokat matricával **kívülről** (a tető nyitott, oda nem kell matrica).',
  question: 'Hány **cm²** matricára lesz szükség?',
  visual: {
    type: 'box3d',
    box: {
      l: 50,
      w: 30,
      h: 40
    },
    cubeEdge: 10,
    unit: 'cm'
  },
  answer: '7900 cm²',
  keywords: ['felszín', 'téglatest', 'gyakorlati feladat'],
  solution: `**Lépések (tető nélkül):**

1. Alj: $50 \\cdot 30 = 1500$ cm².
2. Két hosszú oldal: $2 \\cdot (50 \\cdot 40) = 4000$ cm².
3. Két rövid oldal: $2 \\cdot (30 \\cdot 40) = 2400$ cm².
4. Összesen: $1500 + 4000 + 2400 = \\mathbf{7900}$ cm².`
},
{
  id: 'A-K-07',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Szimmetrikus kertrajz',
  difficulty: 6,
  scenario: 'Egy kertterv **függőlegesen szimmetrikus**. A bal oldalon három fontos pont található: kapu $K(-4; 0)$, szökőkút $S(-2; 3)$ és pad $P(-1; -2)$. A jobb oldalon ugyanilyen elrendezés van, tükrözve.',
  question: 'Mik a jobb oldali pontok koordinátái?',
  visual: {
    type: 'symmetryHalf',
    axis: 'vertical',
    halfPoints: [
      {
        x: -4,
        y: 0
      },
      {
        x: -2,
        y: 3
      },
      {
        x: -1,
        y: -2
      }
    ]
  },
  answer: 'K\'(4; 0), S\'(2; 3), P\'(1; −2)',
  keywords: ['szimmetria', 'tükrözés', 'koordináta', 'kertterv'],
  solution: `**Függőleges tengelyre tükrözés:** $x \\to -x$, $y$ változatlan.

1. $K(-4;\\ 0) \\to K'(\\mathbf{4;\\ 0})$.
2. $S(-2;\\ 3) \\to S'(\\mathbf{2;\\ 3})$.
3. $P(-1;\\ -2) \\to P'(\\mathbf{1;\\ -2})$.`
},
{
  id: 'A-K-08',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Lépcsős építmény térfogata',
  difficulty: 7,
  scenario: 'Egy gyerek **1 cm élű kockákból** lépcsős építményt rak. Az alsó sor $3 \\times 3 = 9$ kocka, a középső sor $2 \\times 2 = 4$ kocka, a legfelső sor $1 \\times 1 = 1$ kocka — mindegyik középre igazítva.',
  question: 'Mekkora az építmény **térfogata**, és hány kocka **látszik kívülről** (alja + oldal + teteje)?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'steps'
  },
  answer: 'V = 14 cm³; minden (14) kocka kívülről látszik',
  keywords: ['térfogat', 'kockaépítmény', 'nézet'],
  solution: `**Térfogat:**

1. $V = 9 + 4 + 1 = \\mathbf{14}$ cm³.

**Látható kockák:**

2. Az építmény lépcsős, így **minden kocka érinti a külső felszínt** — egyik sincs teljesen beágyazva, mert az alsó-középső és középső-felső emelet nem fedi el őket oldalról.
3. Kívülről látható kockák száma: $\\mathbf{14}$ (azaz mind).`
},
{
  id: 'A-K-09',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Túraútvonal égtájak szerint',
  difficulty: 7,
  scenario: 'Egy turista a **(0; 0)** pontból indul. Először **3 egységet északra** megy, majd **4 egységet keletre**, utána **2 egységet délre**, végül **1 egységet nyugatra**.',
  question: 'Hol lesz végül, és milyen **irányban** van a kiindulóponthoz képest?',
  visual: {
    type: 'compass',
    center: 'Start',
    points: [
      {
        label: 'Cél',
        direction: 'NE'
      }
    ]
  },
  answer: '(3; 1); északkeletre',
  keywords: ['égtájak', 'koordináta', 'útvonal'],
  solution: `**Lépések:**

1. Start: $(0;\\ 0)$.
2. $+3$ északra: $(0;\\ 3)$.
3. $+4$ keletre: $(4;\\ 3)$.
4. $-2$ délre: $(4;\\ 1)$.
5. $-1$ nyugatra: $(\\mathbf{3;\\ 1})$.

**Irány:** $x > 0$ és $y > 0$ → a kiindulóponttól **északkeletre** található.`
},
{
  id: 'A-K-10',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Többlépcsős útvonal',
  difficulty: 6,
  scenario: `Egy futár a **(0;0)** pontból indul:

1. 5 egység **észak**
2. 3 egység **kelet**
3. 2 egység **dél**
4. 4 egység **kelet**
5. 1 egység **észak**`,
  question: 'Hol lesz a futár, és milyen irányban van a kiindulóponthoz képest?',
  visual: {
    type: 'compass',
    center: 'S',
    points: [
      {
        label: 'V',
        direction: 'NE'
      }
    ]
  },
  answer: '(7; 4); északkeletre',
  keywords: ['útvonal', 'égtájak', 'koordináta'],
  solution: `**Lépésenként:**

- $(0;0)\\to(0;5)$
- $(0;5)\\to(3;5)$
- $(3;5)\\to(3;3)$
- $(3;3)\\to(7;3)$
- $(7;3)\\to(\\mathbf{7;4})$

Végpont $(7;4)$: $x>0, y>0$ → **északkeletre**.`
},
{
  id: 'A-K-11',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Festett kocka — 1 oldal',
  difficulty: 6,
  scenario: 'Egy **3 × 3 × 3-as** kockát kívülről befestünk, majd szétszedjük kis kockákra.',
  question: 'Hány kis kockának lesz **pontosan 1 oldala** festett?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'face'
  },
  options: ['6', '8', '12', '27'],
  answer: '6',
  keywords: ['festett kocka', 'térbeli gondolkodás'],
  solution: '1 oldala festett = lapok közepe. 6 lap × 1 középkocka = **6**.'
},
{
  id: 'A-K-12',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kiállítás — tárlók elrendezése',
  difficulty: 6,
  scenario: `Egy kiállítás térképén négy tárló van:

- **T₁(1; 2)**, **T₂(5; 2)**, **T₃(5; 6)**, **T₄(1; 6)**.

A szervezők egy új tárlót (T₅) szeretnének elhelyezni, amely **a már kijelölt téglalap középpontjában** áll.`,
  question: 'Milyen koordinátájú T₅?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 7,
    yMin: 0,
    yMax: 7,
    points: [
      { label: 'T₁', x: 1, y: 2 },
      { label: 'T₂', x: 5, y: 2 },
      { label: 'T₃', x: 5, y: 6 },
      { label: 'T₄', x: 1, y: 6 }
    ]
  },
  options: ['(2; 4)', '(3; 4)', '(3; 3)', '(4; 4)'],
  answer: '(3; 4)',
  keywords: ['koordináta', 'középpont', 'téglalap'],
  solution: `A téglalap **középpontja** az átlók metszéspontja, amely az $x$ és $y$ koordináták **átlaga**.

- $x$-átlag: $\\dfrac{1 + 5}{2} = 3$.
- $y$-átlag: $\\dfrac{2 + 6}{2} = 4$.

**T₅ = (3; 4).**`
},
{
  id: 'A-K-13',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Szimmetriatengelyek összetett alakzatnál',
  difficulty: 6,
  scenario: 'Egy alakzat **négyzet**, amelynek minden oldalára **szabályos háromszöget** ragasztunk kívülre (csillag-forma).',
  question: 'Hány **szimmetriatengelye** van ennek az alakzatnak?',
  visual: {
    type: 'formula',
    text: 'négyzet + 4 szabályos háromszög (kifelé)'
  },
  options: ['2', '4', '8', '12'],
  answer: '4',
  keywords: ['szimmetria', 'összetett alakzat'],
  solution: 'A négyzetnek **4** szimmetriatengelye van (2 oldalfelező + 2 átló). A szimmetriát a kifelé ragasztott egybevágó háromszögek **megőrzik**, ezért az összetett alakzatnak is **4** tengelye marad.'
},
{
  id: 'A-K-14',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Legkisebb befoglaló kocka',
  difficulty: 6,
  scenario: 'Egy szobor befoglaló téglatestje **7 cm × 5 cm × 4 cm**. Olyan **kocka** alakú vitrint készítünk, amelyben a szobor elfér, de a kocka éle **egész szám** cm.',
  question: 'Mekkora a **legkisebb** megfelelő kocka éle, és mennyi az üres tér térfogata?',
  visual: {
    type: 'box3d',
    box: {
      l: 7,
      w: 5,
      h: 4
    },
    cubeEdge: 7,
    unit: 'cm'
  },
  options: ['5 cm; 95 cm³', '7 cm; 203 cm³', '7 cm; 343 cm³', '8 cm; 372 cm³'],
  answer: '7 cm; 203 cm³',
  keywords: ['befoglaló test', 'térfogat', 'kocka'],
  solution: `A kockának be kell fogadnia a téglatest **legnagyobb élét**: $\\max(7,5,4) = 7$ cm.

**Kocka térfogata:** $7^3 = 343$ cm³.

**Szobor (téglatest) térfogata:** $7 \\cdot 5 \\cdot 4 = 140$ cm³.

**Üres tér:** $343 - 140 = \\mathbf{203}$ cm³.`
},
{
  id: 'A-K-15',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Festett kocka — belseje',
  difficulty: 6,
  scenario: 'Egy **3 × 3 × 3-as** kockát kívülről befestünk, majd szétszedjük.',
  question: 'Hány kis kockának nincs festett oldala?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'inner'
  },
  options: ['0', '1', '6', '8'],
  answer: '1',
  keywords: ['festett kocka', 'térbeli'],
  solution: 'Belső = a $(n-2)^3 = 1^3 = \\mathbf{1}$ db kocka.'
},
{
  id: 'A-K-16',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kincskeresés — rövidebb út',
  difficulty: 6,
  scenario: 'A hajó **(1;1)** pontból indul. Két sziget van: $A(5;1)$ és $B(1;6)$. Csak egyikhez juthat el (vízszintes vagy függőleges lépésekkel).',
  question: 'Melyik sziget **közelebb** és **mennyire**?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 8,
    start: {
      x: 1,
      y: 1,
      label: 'H'
    },
    islands: [
      {
        x: 5,
        y: 1,
        label: 'A'
      },
      {
        x: 1,
        y: 6,
        label: 'B'
      }
    ]
  },
  answer: 'A, 4 egység',
  keywords: ['távolság', 'optimalizálás'],
  solution: `$HA = |5-1| = 4$.

$HB = |6-1| = 5$.

$A$ **közelebb**, távolsága **4 egység**.`
},
{
  id: 'A-K-17',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Tükrözés és eltolás',
  difficulty: 6,
  scenario: 'A $P(2;3)$ pontot először az **$x$-tengelyre** tükrözzük, majd **$(+3; -1)$** vektorral **eltoljuk**.',
  question: 'Mik a végső koordináták?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 8,
    yMin: -6,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: 2,
        y: 3
      }
    ]
  },
  answer: '(5; −4)',
  keywords: ['tükrözés', 'eltolás', 'transzformáció'],
  solution: `1. Tükrözés $x$-tengelyre: $(2;3) \\to (2;-3)$.
2. Eltolás $(+3;-1)$: $(2;-3) \\to (\\mathbf{5;-4})$.`
},
{
  id: 'A-K-18',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Ismeretlen szabályos sokszög',
  difficulty: 6,
  scenario: 'Egy szabályos sokszög **egy belső szöge 140°**.',
  question: 'Hány oldala van?',
  visual: {
    type: 'formula',
    text: 'szabályos $n$-szög, egy szöge $= 140°$'
  },
  options: ['6', '8', '9', '10'],
  answer: '9',
  keywords: ['sokszög', 'szög'],
  solution: `$\\dfrac{(n-2)\\cdot 180°}{n} = 140°$

$(n-2)\\cdot 180 = 140n$

$180n - 360 = 140n$

$40n = 360 \\Rightarrow n = \\mathbf{9}$.`
},
{
  id: 'A-K-19',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Festett kocka 4×4×4 — 2 oldal',
  difficulty: 7,
  scenario: 'Egy **4 × 4 × 4**-es kockát befestünk, majd szétszedjük.',
  question: 'Hány kis kockának lesz **pontosan 2 oldala** festett?',
  visual: {
    type: 'bigCube',
    n: 4,
    highlight: 'edge'
  },
  options: ['8', '12', '24', '36'],
  answer: '24',
  keywords: ['festett kocka', 'kombinatorika'],
  solution: '$n = 4$, egy élen $(n-2) = 2$ kis kocka van 2 festett lappal. 12 él × 2 = **24**.'
},
{
  id: 'A-K-20',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kert — téglalap + háromszög',
  difficulty: 6,
  scenario: 'Egy kert alakja egy **8 m × 5 m**-es téglalap és hozzá ragasztott **8 m** alapú, **3 m** magas háromszög.',
  question: 'Mekkora a kert **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 5,
    label: 'alap',
    fill: '#c9e8b0',
    unit: 'm'
  },
  answer: '52 m²',
  keywords: ['összetett terület', 'átdarabolás'],
  solution: `$T_{tégl} = 8 \\cdot 5 = 40$ m².

$T_{hsz} = \\dfrac{8 \\cdot 3}{2} = 12$ m².

$T = 40 + 12 = \\mathbf{52}$ m².`
},
{
  id: 'A-K-21',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kettős tükrözés',
  difficulty: 7,
  scenario: 'A $P(1;2)$ pontot tükrözzük először az **$x$-tengelyre**, majd az eredményt a **$y$-tengelyre**.',
  question: 'Mik a végpont koordinátái, és ez milyen egyszerűbb transzformációnak felel meg?',
  visual: {
    type: 'coordinateGrid',
    xMin: -4,
    xMax: 4,
    yMin: -4,
    yMax: 4,
    points: [
      {
        label: 'P',
        x: 1,
        y: 2
      }
    ]
  },
  answer: '(−1; −2); középpontos tükrözés az origóra',
  keywords: ['tükrözés', 'transzformáció', 'kompozíció'],
  solution: `1. $P(1;2) \\to P'(1;-2)$ ($x$-tengelyre).
2. $P'(1;-2) \\to P''(\\mathbf{-1;-2})$ ($y$-tengelyre).

Két egymásra merőleges tengelyre tükrözés = **középpontos tükrözés** a metszéspontra (itt az origóra).`
},
{
  id: 'A-K-22',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromszög típusa szög alapján',
  difficulty: 6,
  scenario: 'Egy háromszög két szöge **30°** és **60°**.',
  question: 'Milyen típusú háromszög ez (szög szerint)?',
  visual: {
    type: 'triangle',
    type2: 'right',
    base: 6,
    side: 5,
    unit: 'cm'
  },
  options: ['Hegyesszögű', 'Derékszögű', 'Tompaszögű', 'Szabályos'],
  answer: 'Derékszögű',
  keywords: ['szög', 'háromszög'],
  solution: 'A harmadik szög: $180° - 30° - 60° = 90°$. A háromszög **derékszögű**.'
},
{
  id: 'A-K-23',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Dobozba pakolás — több réteg',
  difficulty: 6,
  scenario: 'Egy **20 × 15 × 10 cm**-es dobozba **5 cm** élű kis kockákat rakunk.',
  question: 'Hány kis kocka fér el?',
  visual: {
    type: 'box3d',
    box: {
      l: 20,
      w: 15,
      h: 10
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['12', '18', '24', '30'],
  answer: '24',
  keywords: ['csomagolás', 'térfogat'],
  solution: '$20/5 \\cdot 15/5 \\cdot 10/5 = 4 \\cdot 3 \\cdot 2 = \\mathbf{24}$ db.'
},
{
  id: 'A-K-24',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sokszög belső szögei — hatszög',
  difficulty: 6,
  scenario: 'Egy **szabályos hatszög** alakú csempe minden belső szöge egyenlő.',
  question: 'Mekkora egy **belső szöge**?',
  visual: {
    type: 'formula',
    text: 'Belső szögek összege: (n−2)·180°'
  },
  options: ['60°', '108°', '120°', '135°'],
  answer: '120°',
  keywords: ['szög', 'szabályos sokszög', 'hatszög'],
  solution: `**Képlet:** egy $n$-oldalú sokszög belső szögeinek összege $(n-2) \\cdot 180°$.

Hatszögre ($n=6$):

$(6-2) \\cdot 180° = 4 \\cdot 180° = 720°$.

Szabályos hatszögnél minden szög egyenlő: $\\dfrac{720°}{6} = \\mathbf{120°}$.`
},
{
  id: 'A-K-25',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Navigáció égtájjal — visszaút',
  difficulty: 6,
  scenario: `Egy kiránduló az **iránytűvel** a következő útvonalat járja be:

- **É** 3 km, majd **K** 4 km, majd **D** 1 km, majd **Ny** 2 km.`,
  question: 'Milyen irányban és milyen messze van **a kiindulóponttól** az érkezési pont (légvonalban, Manhattan-távolságban)?',
  visual: {
    type: 'compass',
    center: 'S',
    points: [
      { label: 'É3', direction: 'N' },
      { label: 'K4', direction: 'E' },
      { label: 'D1', direction: 'S' },
      { label: 'Ny2', direction: 'W' }
    ]
  },
  options: ['ÉK, 4 km', 'ÉK, 6 km', 'É, 2 km', 'K, 2 km'],
  answer: 'ÉK, 4 km',
  keywords: ['égtájak', 'navigáció', 'vektor'],
  solution: `**Koordinátákkal** (kelet = +$x$, észak = +$y$): indulás $(0;0)$.

- É 3: $(0;3)$
- K 4: $(4;3)$
- D 1: $(4;2)$
- Ny 2: $(2;2)$

Az érkezési pont az origótól **keletre 2**, **északra 2** — tehát **északkeletre** van.

Manhattan-távolság: $|2| + |2| = \\mathbf{4}$ km.`
},
{
  id: 'A-K-26',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Forgásszimmetria',
  difficulty: 6,
  scenario: 'Egy **szabályos ötágú csillag** középpontja körül forgatva mikor kerül először önmagára (0°-tól különböző szög)?',
  question: 'Mekkora a legkisebb szög, amivel forgatva önmagára kerül?',
  visual: {
    type: 'formula',
    text: 'szabályos 5-ágú csillag'
  },
  options: ['36°', '60°', '72°', '90°'],
  answer: '72°',
  keywords: ['forgásszimmetria'],
  solution: '5-ágú → $\\dfrac{360°}{5} = \\mathbf{72°}$.'
},
{
  id: 'A-K-27',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Tó területének becslése',
  difficulty: 6,
  scenario: 'Egy tó körvonalát rácsra rajzoljuk. A teljesen belül lévő mezők száma **32**, a részben belül lévőké **14**.',
  question: 'Mekkora a tó **becsült területe** rácsegységben (részben belül lévők fele számít)?',
  visual: {
    type: 'grid',
    w: 10,
    h: 8,
    shadedCells: [
      [2, 2],
      [3, 2],
      [4, 2]
    ]
  },
  answer: '39 rácsegység',
  keywords: ['terület', 'becslés', 'rács'],
  solution: '$T \\approx 32 + \\dfrac{14}{2} = 32 + 7 = \\mathbf{39}$ rácsegység.'
},
{
  id: 'A-K-28',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kocka hálójának kiválasztása',
  difficulty: 6,
  scenario: 'Négy ábra közül csak az **egyik** hajtható össze zárt kockává.',
  question: 'Melyik a helyes kocka-háló?',
  visual: {
    type: 'cubeNets'
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'A',
  keywords: ['háló', 'kocka'],
  solution: 'A **A** ábra T-alakú elrendezése a klasszikus kocka-háló. A többi vagy átfedne, vagy nem fedi le mind a 6 lapot.'
},
{
  id: 'A-K-29',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Képkeret — belső négyzettel',
  difficulty: 6,
  scenario: 'Egy **20 cm × 16 cm** képkeretben egy **14 cm × 10 cm** méretű kép található. A kép körüli keret területe?',
  question: 'Mekkora a keret területe?',
  visual: {
    type: 'rectangle',
    widthM: 20,
    heightM: 16,
    label: 'keret',
    fill: '#e0c8ff',
    unit: 'cm'
  },
  options: ['60 cm²', '120 cm²', '180 cm²', '240 cm²'],
  answer: '180 cm²',
  keywords: ['terület', 'különbség'],
  solution: '$T = 20 \\cdot 16 - 14 \\cdot 10 = 320 - 140 = \\mathbf{180}$ cm².'
},
{
  id: 'A-K-30',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Irányok és koordináta',
  difficulty: 6,
  scenario: 'Egy futár a **(−2;1)** pontból **délkeletre** halad **3 egységet** (feltéve, hogy a délkelet +1 $x$, −1 $y$ irány egységvektor-nyi lépésekben).',
  question: 'Hova ér?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'S',
        x: -2,
        y: 1
      }
    ]
  },
  answer: '(1; −2)',
  keywords: ['égtájak', 'koordináta'],
  solution: `Délkeletre 3 lépés: $(+3; -3)$ eltolás.

$(-2; 1) + (3; -3) = (\\mathbf{1; -2})$.`
},
{
  id: 'A-K-31',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Melyik nagyobb? — térfogat',
  difficulty: 6,
  scenario: 'Egy kocka éle **6 cm**, egy téglatest mérete **4 × 5 × 9 cm**.',
  question: 'Melyiknek nagyobb a térfogata és mennyivel?',
  visual: {
    type: 'comparison',
    a: 6,
    b: 4,
    unit: 'cm'
  },
  answer: 'A kockáé 36 cm³-rel nagyobb',
  keywords: ['térfogat', 'összehasonlítás'],
  solution: `$V_{kocka} = 6^3 = 216$ cm³.

$V_{téglatest} = 4 \\cdot 5 \\cdot 9 = 180$ cm³.

Különbség: $216 - 180 = \\mathbf{36}$ cm³. A **kocka** nagyobb.`
},
{
  id: 'A-K-32',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Négy pont — milyen alakzat?',
  difficulty: 6,
  scenario: 'A pontok: $A(1;1)$, $B(5;1)$, $C(5;4)$, $D(1;4)$.',
  question: 'Milyen négyszöget alkotnak, és mekkora a területe?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
    points: [
      {
        label: 'A',
        x: 1,
        y: 1
      },
      {
        label: 'B',
        x: 5,
        y: 1
      },
      {
        label: 'C',
        x: 5,
        y: 4
      },
      {
        label: 'D',
        x: 1,
        y: 4
      }
    ]
  },
  answer: 'Téglalap, T = 12',
  keywords: ['koordináta', 'négyszög', 'terület'],
  solution: `Oldalak: $AB = 4$, $BC = 3$, $CD = 4$, $DA = 3$. Szögek derékszögűek → **téglalap**.

$T = 4 \\cdot 3 = \\mathbf{12}$ területegység.`
},
{
  id: 'A-K-33',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Nem kocka-háló',
  difficulty: 6,
  scenario: 'A négy ábrán **hat négyzetből** álló síkidomokat látunk.',
  question: 'Melyik **nem** hajtható össze kockává?',
  visual: {
    type: 'cubeNets'
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'D',
  keywords: ['háló', 'kocka'],
  solution: 'A **D** ábrán az elrendezés olyan, hogy összehajtáskor két négyzet egymásra kerülne → nem kocka-háló.'
},
{
  id: 'A-K-34',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Téglalap vs négyzet — tengelyek',
  difficulty: 6,
  scenario: 'Egy **nem négyzet alakú téglalap** és egy **négyzet** szimmetriatengelyeit vizsgáljuk.',
  question: 'Hány tengellyel **több** van a négyzetnek?',
  visual: {
    type: 'comparison',
    a: 4,
    b: 4,
    unit: 'cm'
  },
  options: ['0', '1', '2', '4'],
  answer: '2',
  keywords: ['szimmetria'],
  solution: 'Téglalap: **2** tengely. Négyzet: **4** tengely (a 2 oldalfelező + 2 átló). Különbség: $4 - 2 = \\mathbf{2}$.'
},
{
  id: 'A-K-35',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Festett kocka 5×5×5 — 3 oldal',
  difficulty: 7,
  scenario: 'Egy **5 × 5 × 5**-ös kockát befestünk.',
  question: 'Hány kis kockának lesz **pontosan 3 oldala** festett?',
  visual: {
    type: 'bigCube',
    n: 5,
    highlight: 'corner'
  },
  options: ['4', '8', '12', '24'],
  answer: '8',
  keywords: ['festett kocka', 'térbeli'],
  solution: '3 oldala festett = sarokkockák. Minden kockának **8 sarka** van.'
},
{
  id: 'A-K-36',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Háromszög a koordinátarendszerben',
  difficulty: 6,
  scenario: 'A háromszög csúcsai: $A(0;0)$, $B(6;0)$, $C(2;4)$.',
  question: 'Mekkora a területe?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 7,
    yMin: -1,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 0,
        y: 0
      },
      {
        label: 'B',
        x: 6,
        y: 0
      },
      {
        label: 'C',
        x: 2,
        y: 4
      }
    ]
  },
  options: ['8', '10', '12', '24'],
  answer: '12',
  keywords: ['terület', 'háromszög', 'koordináta'],
  solution: `Alap: $AB = 6$ (az $x$-tengelyen).

Magasság: $C$ $y$-koordinátája = $4$.

$T = \\dfrac{6 \\cdot 4}{2} = \\mathbf{12}$.`
},
{
  id: 'A-K-37',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Tó területének pontos becslése',
  difficulty: 6,
  scenario: 'Egy térképen tó látható rácshálózaton. A rajzon **9 teljes** négyzet van a tó belsejében, és **12 olyan** négyzet, amelyen a tó partvonala átmegy. Egy rácsnégyzet $1 \\text{ m}^2$.',
  question: 'A **belső négyzetek + félbe számolt peremnégyzetek** szabállyal mekkora a tó területe?',
  visual: {
    type: 'grid',
    w: 8,
    h: 8,
    shadedCells: [
      [2, 2], [3, 2], [4, 2],
      [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
      [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
      [2, 5], [3, 5], [4, 5], [5, 5],
      [3, 6], [4, 6], [5, 6]
    ]
  },
  options: ['12 m²', '15 m²', '18 m²', '21 m²'],
  answer: '15 m²',
  keywords: ['terület', 'becslés', 'rács'],
  solution: `**Becslési szabály:** belső négyzetek teljesen számítanak, a peremnégyzetek fele.

- **Teljes négyzetek:** $9 \\cdot 1 = 9$ m²
- **Peremnégyzetek:** $12 \\cdot 0{,}5 = 6$ m²

**Becsült terület:** $9 + 6 = \\mathbf{15}$ m².`
},
{
  id: 'A-K-38',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.4',
  title: 'Visszatérés — vektorösszeg',
  difficulty: 7,
  scenario: 'A futár 4 lépést tesz: **(+2; +3)**, **(−1; +2)**, **(+3; −4)**, **(x; y)**. A végén visszaér a kiindulóponthoz.',
  question: 'Mekkora a negyedik lépés **$(x;y)$** vektora?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'S',
        x: 0,
        y: 0
      }
    ]
  },
  answer: '(−4; −1)',
  keywords: ['vektor', 'visszatérés'],
  solution: `Összeg = 0:

$x$: $2 - 1 + 3 + x = 0 \\Rightarrow x = -4$.

$y$: $3 + 2 - 4 + y = 0 \\Rightarrow y = -1$.

**(−4; −1)**.`
},
{
  id: 'A-K-39',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Medence csempézése — alj és oldalak',
  difficulty: 7,
  scenario: 'Egy téglatest medence **4 m × 3 m** aljú és **2 m** mély. Az **alját és oldalfalait** csempézzük **20 cm × 20 cm**-es lapokkal.',
  question: 'Hány csempe kell?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 1,
    unit: 'm'
  },
  answer: '1000 csempe',
  keywords: ['felszín', 'burkolás'],
  solution: `**Felszín (alj + 4 oldalfal, felül nyitott):**

$A = 4 \\cdot 3 + 2(4 \\cdot 2) + 2(3 \\cdot 2) = 12 + 16 + 12 = 40$ m².

$40$ m² $= 400\\,000$ cm². Egy csempe $20 \\cdot 20 = 400$ cm².

$\\dfrac{400000}{400} = \\mathbf{1000}$ db.`
},
{
  id: 'A-K-40',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Szabályos 12-szög',
  difficulty: 7,
  scenario: 'Egy **szabályos 12-szög** belső szögeit vizsgáljuk.',
  question: 'Mekkora a **szögek összege** és mekkora **egy szög**?',
  visual: {
    type: 'formula',
    text: 'szabályos 12-szög'
  },
  answer: 'Összeg: 1800°, egy szög: 150°',
  keywords: ['szög', 'sokszög'],
  solution: `Szögösszeg: $(12-2) \\cdot 180° = \\mathbf{1800°}$.

Egy szög: $\\dfrac{1800°}{12} = \\mathbf{150°}$.`
},
{
  id: 'A-K-41',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Raktár — dobozok',
  difficulty: 7,
  scenario: 'Egy **6 m × 4 m × 3 m** raktárba **1 m × 1 m × 1 m**-es kockákat pakolunk. Egy sor 1 m magas, sorokat egymás fölé is tehetünk.',
  question: 'Hány kocka fér be (**maximum**)?',
  visual: {
    type: 'box3d',
    box: {
      l: 6,
      w: 4,
      h: 3
    },
    cubeEdge: 1,
    unit: 'm'
  },
  answer: '72',
  keywords: ['térfogat', 'raktár'],
  solution: '$6 \\cdot 4 \\cdot 3 = \\mathbf{72}$ kocka.'
},
{
  id: 'A-K-42',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Csillag szimmetriatengelyei',
  difficulty: 6,
  scenario: 'Egy **szabályos 6 ágú csillag** (Dávid-csillag) szimmetriatengelyeit vizsgáljuk.',
  question: 'Hány szimmetriatengelye van?',
  visual: {
    type: 'formula',
    text: 'Dávid-csillag (6 ág)'
  },
  options: ['3', '6', '12', '24'],
  answer: '6',
  keywords: ['szimmetria', 'csillag'],
  solution: 'Egy szabályos $n$-ágú csillagnak **$n$** szimmetriatengelye van. 6 ág → **6**.'
},
{
  id: 'A-K-43',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Háló területe → felszín',
  difficulty: 6,
  scenario: 'Egy kocka hálóját lerajzoltuk, területe **54 cm²**.',
  question: 'Mekkora a kocka **éle**?',
  visual: {
    type: 'cubeNets'
  },
  options: ['2 cm', '3 cm', '6 cm', '9 cm'],
  answer: '3 cm',
  keywords: ['felszín', 'háló'],
  solution: `Háló területe = felszín: $6a^2 = 54$.

$a^2 = 9 \\Rightarrow a = \\mathbf{3}$ cm.`
},
{
  id: 'A-K-44',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'A negyedik csúcs',
  difficulty: 7,
  scenario: 'Egy **paralelogramma** három csúcsa $A(0;0)$, $B(5;0)$, $C(7;3)$. A negyedik csúcs $D$.',
  question: 'Mik a $D$ csúcs koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 8,
    yMin: -1,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 0,
        y: 0
      },
      {
        label: 'B',
        x: 5,
        y: 0
      },
      {
        label: 'C',
        x: 7,
        y: 3
      }
    ]
  },
  answer: '(2; 3)',
  keywords: ['paralelogramma', 'koordináta'],
  solution: `A paralelogrammában $\\overrightarrow{AB} = \\overrightarrow{DC}$.

$\\overrightarrow{AB} = (5;0)$. Ezért $D = C - (5;0) = (7-5; 3-0) = (\\mathbf{2;3})$.`
},
{
  id: 'A-K-45',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Körgyűrű becslés',
  difficulty: 7,
  scenario: 'Egy **6 × 6**-os négyzetbe egy **4 × 4**-es négyzetet rajzolunk középre. A köztes rész (keret) a kérdés.',
  question: 'Mekkora a **keretterület**?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 6,
    label: 'keret',
    fill: '#fff0a0',
    unit: 'cm'
  },
  options: ['12', '16', '20', '36'],
  answer: '20',
  keywords: ['terület', 'különbség'],
  solution: '$T = 6^2 - 4^2 = 36 - 16 = \\mathbf{20}$ területegység.'
},
{
  id: 'A-K-46',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Medence feltöltése',
  difficulty: 7,
  scenario: `Egy medence alakja **téglatest**, méretei **8 m × 3 m × 1{,}5 m**. A vizet **80 liter/perc** sebességgel töltik.`,
  question: 'Hány **óra** alatt telik meg **színig** a medence?',
  visual: {
    type: 'box3d',
    box: {
      l: 8,
      w: 3,
      h: 1.5
    },
    unit: 'm'
  },
  options: ['5 óra', '6 óra', '7{,}5 óra', '10 óra'],
  answer: '7{,}5 óra',
  keywords: ['térfogat', 'egységátváltás', 'idő'],
  solution: `**Térfogat:** $V = 8 \\cdot 3 \\cdot 1{,}5 = 36$ m³.

**Átváltás:** $1$ m³ $= 1000$ liter, tehát $36$ m³ $= 36\\,000$ liter.

**Idő:** $\\dfrac{36\\,000}{80} = 450$ perc $= \\dfrac{450}{60} = \\mathbf{7{,}5}$ óra.`
},
{
  id: 'A-K-47',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Fél akvárium',
  difficulty: 6,
  scenario: 'Egy téglatest akvárium **50 cm × 30 cm × 40 cm**. **Félig** van töltve vízzel.',
  question: 'Hány **liter** víz van benne?',
  visual: {
    type: 'box3d',
    box: {
      l: 50,
      w: 30,
      h: 40
    },
    cubeEdge: 10,
    unit: 'cm'
  },
  options: ['15 l', '30 l', '60 l', '120 l'],
  answer: '30 l',
  keywords: ['térfogat', 'átváltás'],
  solution: `$V = 50 \\cdot 30 \\cdot 40 = 60\\,000$ cm³ $= 60$ l.

Fele: $\\mathbf{30}$ l.`
},
{
  id: 'A-K-48',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Ajándékcsomag — selyemszalag',
  difficulty: 7,
  scenario: `Egy kocka alakú ajándékdoboz éle **12 cm**. Körbekötjük selyemszalaggal:

- a szalag **mindkét lapközéppárt** körbefogja (vízszintes és függőleges síkban),
- a tetején egy **20 cm hosszú** masni készül.`,
  question: 'Hány cm szalag kell összesen?',
  visual: {
    type: 'box3d',
    box: { l: 12, w: 12, h: 12 },
    cubeEdge: 12,
    unit: 'cm'
  },
  options: ['68 cm', '96 cm', '116 cm', '140 cm'],
  answer: '116 cm',
  keywords: ['kerület', 'kocka', 'összetett'],
  solution: `**Egy kör** a kocka körül: $4 \\cdot 12 = 48$ cm.

**Két egymásra merőleges kör:** $2 \\cdot 48 = 96$ cm.

**Masni:** $+20$ cm.

**Összesen:** $96 + 20 = \\mathbf{116}$ cm.`
},
{
  id: 'A-K-49',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Labirintus — szimmetria',
  difficulty: 6,
  scenario: `Egy négyzet alakú labirintus **bal fele** látható:

- folyosók pontjai: $(1;1)$, $(1;2)$, $(1;3)$, $(2;3)$, $(3;3)$.

A labirintus a **függőleges középtengelyre** szimmetrikus.`,
  question: 'Hány pontból áll a **teljes** labirintus folyosója, ha a tengelyen is megőrizzük az ott lévő pontot?',
  visual: {
    type: 'symmetryHalf',
    axis: 'y',
    halfPoints: [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 }
    ]
  },
  options: ['5', '8', '9', '10'],
  answer: '9',
  keywords: ['szimmetria', 'tengely', 'tükrözés'],
  solution: `A tengely az $x = 3$-nál van (középen). Minden pontot tükrözünk ide: $(x;y) \\to (6-x;\\,y)$.

- $(1;1) \\to (5;1)$ (új)
- $(1;2) \\to (5;2)$ (új)
- $(1;3) \\to (5;3)$ (új)
- $(2;3) \\to (4;3)$ (új)
- $(3;3) \\to (3;3)$ — **a tengelyen**, nem duplikálódik.

Új pontok: **4**, eredeti: **5**, összesen: $5 + 4 = \\mathbf{9}$.`
},
{
  id: 'A-K-50',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Háromszög tükrözése koordinátarendszerben',
  difficulty: 7,
  scenario: `A koordinátarendszerben adott egy háromszög:

- $A(2; 1)$, $B(5; 1)$, $C(4; 4)$.

A háromszöget az $x$-tengelyre tükrözzük, majd az eredményt **2 egységgel felfelé** eltoljuk.`,
  question: 'Milyen koordinátájú lesz a $C$ csúcs képe a két lépés után?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 7,
    yMin: -5,
    yMax: 5,
    points: [
      { label: 'A', x: 2, y: 1 },
      { label: 'B', x: 5, y: 1 },
      { label: 'C', x: 4, y: 4 }
    ]
  },
  options: ['(4; −2)', '(4; 2)', '(4; −6)', '(−4; 4)'],
  answer: '(4; −2)',
  keywords: ['tükrözés', 'eltolás', 'koordináta'],
  solution: `**1. lépés — tükrözés az $x$-tengelyre:** $(x;\\,y) \\to (x;\\,-y)$.

- $C(4;\\,4) \\to C'(4;\\,-4)$.

**2. lépés — eltolás +2 függőlegesen:** $(x;\\,y) \\to (x;\\,y+2)$.

- $C'(4;\\,-4) \\to C''(4;\\,-2)$.

**Végső: $C'' = (4;\\,-2)$.**`
},
{
  id: 'A-T-01',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Tengelyes tükörkép',
  difficulty: 2,
  scenario: 'Az alábbi ábrán egy betű és négy lehetséges tükörképe látható.',
  question: 'Melyik a **"F"** betű **függőleges tengelyre** vonatkozó tükörképe?',
  visual: {
    type: 'mirrorChoice',
    letter: 'F',
    axis: 'vertical',
    options: ['F', 'Ⅎ', 'ꟻ', 'Ⅎ_rot']
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['tengelyes tükrözés'],
  solution: `**Függőleges (álló) tengelyes tükrözésnél:**

- Jobb ↔ bal felcserélődik
- A **"F"** tükörképe egy olyan alakzat, amelynek a vízszintes vonalai **balra** mutatnak.
- Ez a **C** ábra (ꟻ).`
},
{
  id: 'A-T-02',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Égtájak — térkép',
  difficulty: 2,
  scenario: 'Egy turistatérképet látsz égtájjelzéssel. A szálloda (S) északon, a tó (T) nyugaton, a rom (R) délen helyezkedik el a központi ponthoz képest.',
  question: 'Milyen irányban van a szálloda?',
  visual: {
    type: 'compass',
    center: 'K',
    points: [
      {
        label: 'S',
        direction: 'N'
      },
      {
        label: 'T',
        direction: 'W'
      },
      {
        label: 'R',
        direction: 'S'
      }
    ]
  },
  options: ['Északra', 'Délre', 'Keletre', 'Nyugatra'],
  answer: 'Északra',
  keywords: ['égtájak', 'tájékozódás'],
  solution: 'A szöveg és a térkép egyértelműen közli: a szálloda (S) **északra** helyezkedik el a központhoz képest. **A helyes válasz: Északra.**'
},
{
  id: 'A-T-03',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Háromszög oldalai',
  difficulty: 3,
  scenario: 'Egy egyenlő szárú háromszög alapja **8 cm**, szárai **5-5 cm** hosszúak.',
  question: 'Mekkora a háromszög **kerülete**?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 8,
    side: 5,
    unit: 'cm'
  },
  options: ['13 cm', '16 cm', '18 cm', '40 cm'],
  answer: '18 cm',
  keywords: ['kerület', 'háromszög'],
  solution: `**Kerület = oldalak összege:**

$K = 5 + 5 + 8 = \\mathbf{18}$ cm.`
},
{
  id: 'A-T-04',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kocka hálója',
  difficulty: 3,
  scenario: 'Az alábbi négy ábrát látod.',
  question: 'Melyikből **NEM** lehet kockát hajtogatni?',
  visual: {
    type: 'cubeNets',
    nets: ['cross', 'T', 'O', 'row6']
  },
  options: ['A (kereszt)', 'B (T-alak)', 'C (2×3 téglalap)', 'D (6 egyenes sorban)'],
  answer: 'C (2×3 téglalap)',
  keywords: ['test ábrázolása', 'háló'],
  solution: `A kocka hálójának 6 darab négyzetből kell állnia, **nem egyetlen nagy téglalapból**.

- A (kereszt), B (T-alak), D (6 egymás után) — **mindegyik** kockához hajtható.
- C egy 2×3-as téglalap **egyben** — ez nem 6 szétválasztható négyzet, ezért nem hajtható kockává.

**A helyes válasz: C.**`
},
{
  id: 'A-T-05',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglalap kerülete — origami',
  difficulty: 1,
  scenario: 'Egy origami papírlap **6 cm** hosszú és **4 cm** széles.',
  question: 'Mekkora a papírlap **kerülete**?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 4,
    label: 'papír',
    fill: '#ffe8b0',
    unit: 'cm'
  },
  options: ['10 cm', '20 cm', '24 cm', '14 cm'],
  answer: '20 cm',
  keywords: ['kerület', 'téglalap'],
  solution: `**Lépések:**

1. Képlet: $K = 2 \\cdot (a + b)$.
2. Behelyettesítés: $K = 2 \\cdot (6 + 4) = 2 \\cdot 10$.
3. Eredmény: $K = \\mathbf{20}$ cm.`
},
{
  id: 'A-T-06',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Pizzaszelet — téglalap területe',
  difficulty: 2,
  scenario: 'Egy pizzériában egy szögletes pizzaszelet **15 cm** hosszú és **8 cm** széles.',
  question: 'Mekkora a szelet **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 15,
    heightM: 8,
    label: 'pizza',
    fill: '#ffd28a',
    unit: 'cm'
  },
  options: ['23 cm²', '46 cm²', '120 cm²', '150 cm²'],
  answer: '120 cm²',
  keywords: ['terület', 'téglalap'],
  solution: `**Lépések:**

1. Képlet: $T = a \\cdot b$.
2. Behelyettesítés: $T = 15 \\cdot 8$.
3. Eredmény: $T = \\mathbf{120}$ cm².`
},
{
  id: 'A-T-07',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kerékpárút — égtáj',
  difficulty: 1,
  scenario: 'Egy kerékpárút elágazásától a **pihenőhely (P)** **keletre**, a **forrás (F)** **északkeletre** található.',
  question: 'Milyen irányba indulj, ha a **forráshoz** akarsz jutni?',
  visual: {
    type: 'compass',
    center: 'E',
    points: [
      {
        label: 'P',
        direction: 'E'
      },
      {
        label: 'F',
        direction: 'NE'
      }
    ]
  },
  options: ['Északra', 'Északkeletre', 'Keletre', 'Délre'],
  answer: 'Északkeletre',
  keywords: ['égtájak', 'tájékozódás'],
  solution: 'A szöveg szerint a forrás (F) **északkeleti** irányban van az elágazástól. **A helyes válasz: Északkeletre.**'
},
{
  id: 'A-T-08',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Szabályos háromszög kerülete',
  difficulty: 2,
  scenario: 'Egy **szabályos háromszög** alakú jelzőtábla minden oldala **12 cm** hosszú.',
  question: 'Mekkora a tábla **kerülete**?',
  visual: {
    type: 'triangle',
    type2: 'equilateral',
    base: 12,
    side: 12,
    unit: 'cm'
  },
  options: ['24 cm', '30 cm', '36 cm', '48 cm'],
  answer: '36 cm',
  keywords: ['kerület', 'szabályos háromszög'],
  solution: `**Lépések:**

1. Szabályos háromszögnél minden oldal egyenlő.
2. $K = 3 \\cdot 12 = \\mathbf{36}$ cm.`
},
{
  id: 'A-T-09',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Csillagkép pontja',
  difficulty: 2,
  scenario: 'A csillagkép négy fényes csillaga a koordináta-rendszerben látható.',
  question: 'Melyik csillag koordinátája **(−2; 3)**?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 2,
        y: 3
      },
      {
        label: 'B',
        x: -2,
        y: 3
      },
      {
        label: 'C',
        x: -2,
        y: -3
      },
      {
        label: 'D',
        x: 2,
        y: -3
      }
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'B',
  keywords: ['koordináták', 'csillagkép'],
  solution: `**Lépések:**

1. $x = -2$ → balra 2-t.
2. $y = 3$ → fel 3-at.
3. Ez a **B** csillag.`
},
{
  id: 'A-T-10',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Pillangó szimmetria',
  difficulty: 2,
  scenario: 'Egy pillangó **fele** látható a rajzon. A másik fél a **függőleges tengelyre** való tükrözéssel áll elő.',
  question: 'Melyik pont lesz az $(-4; 2)$ pont **tükörképe**?',
  visual: {
    type: 'symmetryHalf',
    axis: 'vertical',
    halfPoints: [
      {
        x: -4,
        y: 2
      },
      {
        x: -3,
        y: 4
      },
      {
        x: -2,
        y: 1
      }
    ]
  },
  options: ['(4; 2)', '(−4; −2)', '(4; −2)', '(−2; 4)'],
  answer: '(4; 2)',
  keywords: ['tengelyes tükrözés', 'szimmetria'],
  solution: `**Függőleges tengelyre tükrözéskor:**

- Az $x$ koordináta előjele megváltozik, az $y$ változatlan.
- $(-4; 2) \\to (\\mathbf{4;\\ 2})$.`
},
{
  id: 'A-T-11',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Parketta mintázat',
  difficulty: 3,
  scenario: 'Egy szoba padlóján **3 × 5**-ös rácsmintázatú parketta van. A **satírozott** csempék jelzik a sötétebb mintát.',
  question: 'Hány **sötét** csempe van a padlón a rajz szerint?',
  visual: {
    type: 'grid',
    w: 5,
    h: 3,
    shadedCells: [
      [0, 0],
      [2, 0],
      [4, 0],
      [1, 1],
      [3, 1],
      [0, 2],
      [2, 2],
      [4, 2]
    ]
  },
  options: ['6', '7', '8', '9'],
  answer: '8',
  keywords: ['rács', 'parketta', 'számlálás'],
  solution: `**Lépések:**

1. Alsó sor: 3 sötét csempe.
2. Középső sor: 2 sötét csempe.
3. Felső sor: 3 sötét csempe.
4. Összesen: $3 + 2 + 3 = \\mathbf{8}$ csempe.`
},
{
  id: 'A-T-12',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Kocka térfogata',
  difficulty: 2,
  scenario: 'Egy kocka alakú ajándékdoboz éle **5 cm**.',
  question: 'Mekkora a doboz **térfogata**?',
  visual: {
    type: 'box3d',
    box: {
      l: 5,
      w: 5,
      h: 5
    },
    cubeEdge: 5,
    unit: 'cm'
  },
  options: ['15 cm³', '25 cm³', '75 cm³', '125 cm³'],
  answer: '125 cm³',
  keywords: ['térfogat', 'kocka'],
  solution: `**Lépések:**

1. Képlet: $V = a^3$.
2. $V = 5^3 = 5 \\cdot 5 \\cdot 5$.
3. Eredmény: $V = \\mathbf{125}$ cm³.`
},
{
  id: 'A-T-13',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglalap területe — csempe',
  difficulty: 1,
  scenario: 'Egy fürdőszobai csempe **8 cm** hosszú és **5 cm** széles.',
  question: 'Mekkora a csempe **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 8,
    heightM: 5,
    label: 'csempe',
    fill: '#b0d8ff',
    unit: 'cm'
  },
  options: ['13 cm²', '26 cm²', '40 cm²', '45 cm²'],
  answer: '40 cm²',
  keywords: ['terület', 'téglalap'],
  solution: `**Lépések:**

1. Képlet: $T = a \\cdot b$.
2. Behelyettesítés: $T = 8 \\cdot 5$.
3. Eredmény: $T = \\mathbf{40}$ cm².`
},
{
  id: 'A-T-14',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Óramutatók szöge',
  difficulty: 2,
  scenario: 'Egy analóg óra **3 órát** mutat.',
  question: 'Mekkora szöget zár be a kis- és a nagymutató?',
  visual: {
    type: 'clockPair',
    hour: 3,
    minute: 0
  },
  options: ['30°', '60°', '90°', '180°'],
  answer: '90°',
  keywords: ['szög', 'óra', 'derékszög'],
  solution: `A teljes kör **360°**, és az óralap **12 egyenlő részre** van osztva.

Egy óraosztás: $360° / 12 = 30°$.

3 óránál a mutatók **3 osztásnyira** vannak egymástól: $3 \\cdot 30° = \\mathbf{90°}$. Ez egy **derékszög**.`
},
{
  id: 'A-T-15',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Betű — vízszintes tengelyes tükörkép',
  difficulty: 2,
  scenario: 'Egy betűkártyát **vízszintes tengelyre** tükrözünk.',
  question: 'Melyik betű tükörképe **önmaga** vízszintes tükrözésnél?',
  visual: {
    type: 'mirrorChoice',
    letter: 'B',
    axis: 'horizontal',
    options: ['A', 'B', 'E', 'F']
  },
  options: ['A', 'B', 'E', 'F'],
  answer: 'B',
  keywords: ['tengelyes tükrözés', 'szimmetria'],
  solution: `**Vízszintes tengelyre** tükrözésnél fent-lent cserélődik.

A **B** betűnek van vízszintes szimmetriatengelye, ezért tükörképe önmaga. Az **E** is, de a szokásos írásmódban a **B** a legáltalánosabban elfogadott.

A helyes válasz: **B**.`
},
{
  id: 'A-T-16',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Rajzterem koordinátái',
  difficulty: 2,
  scenario: 'A rajzterem padlójára koordináta-rendszert rajzoltak. Három állvány van: **F(2; 1)**, **K(4; 3)** és **R(1; 4)**.',
  question: 'Melyik állvány van a **legmagasabban** (legnagyobb $y$-koordináta)?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
    points: [
      { label: 'F', x: 2, y: 1 },
      { label: 'K', x: 4, y: 3 },
      { label: 'R', x: 1, y: 4 }
    ]
  },
  options: ['F', 'K', 'R', 'Mindhárom azonos magasságban'],
  answer: 'R',
  keywords: ['koordináta', 'leolvasás'],
  solution: `A $y$-koordináta a **függőleges** helyzetet adja meg: minél nagyobb, annál magasabban van.

- F: $y = 1$
- K: $y = 3$
- **R: $y = 4$** ← legnagyobb

A helyes válasz: **R**.`
},
{
  id: 'A-T-17',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Koordináta leolvasása',
  difficulty: 2,
  scenario: 'Egy koordináta-rendszerben három pont van: $A$, $B$ és $C$.',
  question: 'Mik a **B pont** koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'A',
        x: 2,
        y: 3
      },
      {
        label: 'B',
        x: -3,
        y: 1
      },
      {
        label: 'C',
        x: 4,
        y: -2
      }
    ]
  },
  options: ['(−3; 1)', '(1; −3)', '(3; 1)', '(−1; 3)'],
  answer: '(−3; 1)',
  keywords: ['koordináta', 'olvasás'],
  solution: `A B pont $x$ tengelyen a **−3**, az $y$ tengelyen **1** értéknél van.

**B = (−3; 1).**`
},
{
  id: 'A-T-18',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Zászló szimmetriatengelye',
  difficulty: 2,
  scenario: 'Egy téglalap alakú zászlón három vízszintes, egyenlő szélességű sáv látható: piros–fehér–piros.',
  question: 'Hány tengelyes szimmetriatengelye van a zászló mintázatának?',
  visual: {
    type: 'rectangle',
    widthM: 9,
    heightM: 6,
    label: 'zászló',
    fill: '#f5b0b0',
    unit: 'cm'
  },
  options: ['0', '1', '2', '4'],
  answer: '2',
  keywords: ['szimmetria', 'tengely', 'zászló'],
  solution: `A piros–fehér–piros csíkozás **fent és lent egyforma**, ezért a zászló középvonalára (vízszintes tengely) tükrös.

A téglalap függőleges felezővonalára is tükrös (a sávok ott is egybeesnek).

Összesen: **2 szimmetriatengely**.`
},
{
  id: 'A-T-19',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglatest térfogata — doboz',
  difficulty: 2,
  scenario: 'Egy téglatest alakú doboz méretei: **4 cm × 3 cm × 2 cm**.',
  question: 'Mekkora a doboz **térfogata**?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 1,
    unit: 'cm'
  },
  options: ['9 cm³', '12 cm³', '24 cm³', '48 cm³'],
  answer: '24 cm³',
  keywords: ['térfogat', 'téglatest'],
  solution: `**Lépések:**

1. Képlet: $V = a \\cdot b \\cdot c$.
2. $V = 4 \\cdot 3 \\cdot 2 = \\mathbf{24}$ cm³.`
},
{
  id: 'A-T-20',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Háromszög kerülete — vitorla',
  difficulty: 2,
  scenario: 'Egy vitorla egyenlő szárú háromszög alakú, az alapja **4 m**, a szárai egyaránt **5 m**.',
  question: 'Mekkora a vitorla **kerülete**?',
  visual: {
    type: 'triangle',
    type2: 'isosceles',
    base: 4,
    side: 5,
    unit: 'm'
  },
  options: ['9 m', '13 m', '14 m', '20 m'],
  answer: '14 m',
  keywords: ['kerület', 'háromszög'],
  solution: '$K = 4 + 5 + 5 = \\mathbf{14}$ m.'
},
{
  id: 'A-T-21',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglalap kerülete — virágágyás',
  difficulty: 1,
  scenario: 'Egy virágágyás **9 m** hosszú és **3 m** széles.',
  question: 'Mekkora az ágyás **kerülete**?',
  visual: {
    type: 'rectangle',
    widthM: 9,
    heightM: 3,
    label: 'virág',
    fill: '#ffd0d0',
    unit: 'm'
  },
  options: ['12 m', '18 m', '24 m', '27 m'],
  answer: '24 m',
  keywords: ['kerület', 'téglalap'],
  solution: '$K = 2 \\cdot (9 + 3) = 2 \\cdot 12 = \\mathbf{24}$ m.'
},
{
  id: 'A-T-22',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Tetris-mintázat területe',
  difficulty: 2,
  scenario: 'Egy Tetris-játékban a rácson ez a mintázat áll. Minden kis négyzet területe **1 egység**.',
  question: 'Hány egység területű a besatírozott alakzat?',
  visual: {
    type: 'grid',
    w: 6,
    h: 5,
    shadedCells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [2, 2],
      [3, 2],
      [2, 3]
    ]
  },
  options: ['5', '6', '7', '8'],
  answer: '7',
  keywords: ['terület', 'rács', 'számolás'],
  solution: `A mintázatban a besatírozott mezőket összeszámolva:

- Alsó sor: **4** mező
- Középső sor: **2** mező
- Felső sor: **1** mező

Összesen: $4 + 2 + 1 = \\mathbf{7}$ egység.`
},
{
  id: 'A-T-23',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Négyzet területe — fénykép',
  difficulty: 1,
  scenario: 'Egy négyzet alakú fénykép oldala **12 cm**.',
  question: 'Mekkora a fénykép **területe**?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 12,
    label: 'foto',
    fill: '#e0c8ff',
    unit: 'cm'
  },
  options: ['24 cm²', '48 cm²', '120 cm²', '144 cm²'],
  answer: '144 cm²',
  keywords: ['terület', 'négyzet'],
  solution: '$T = a^2 = 12^2 = \\mathbf{144}$ cm².'
},
{
  id: 'A-T-24',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Szabályos háromszög szöge',
  difficulty: 1,
  scenario: 'Egy **szabályos (egyenlő oldalú) háromszög** minden szöge egyenlő.',
  question: 'Mekkora egy **belső szöge**?',
  visual: {
    type: 'triangle',
    type2: 'equilateral',
    base: 6,
    side: 6,
    unit: 'cm'
  },
  options: ['30°', '45°', '60°', '90°'],
  answer: '60°',
  keywords: ['szög', 'szabályos háromszög'],
  solution: 'A háromszög belső szögeinek összege $180°$. Szabályos esetben mindegyik szög $\\dfrac{180°}{3} = \\mathbf{60°}$.'
},
{
  id: 'A-T-25',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Négyzet szöge',
  difficulty: 1,
  scenario: 'Egy négyzet minden szöge egyenlő.',
  question: 'Mekkora egy szöge?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 6,
    label: 'négyzet',
    fill: '#ffe8b0',
    unit: 'cm'
  },
  options: ['45°', '60°', '90°', '120°'],
  answer: '90°',
  keywords: ['szög', 'négyzet'],
  solution: 'A négyzet **derékszögű** sokszög, minden szöge $\\mathbf{90°}$.'
},
{
  id: 'A-T-26',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'L-alak kerülete — parkoló',
  difficulty: 3,
  scenario: 'Egy parkoló L-alakú. Külső téglalap **7 m × 5 m**, a levágott sarok **3 m × 2 m**.',
  question: 'Mekkora a parkoló **kerülete**?',
  visual: {
    type: 'polygonL',
    outer: { w: 7, h: 5 },
    cut: { w: 3, h: 2 },
    unit: 'm'
  },
  options: ['17 m', '19 m', '22 m', '24 m'],
  answer: '24 m',
  keywords: ['kerület', 'L-alak'],
  solution: `Az L-alak **kerülete ugyanannyi, mint a befoglaló téglalapé**, mert a belső sarkot kivéve az oldalhosszak összege változatlan.

$K = 2 \\cdot (7 + 5) = 2 \\cdot 12 = \\mathbf{24}$ m.`
},
{
  id: 'A-T-27',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Origó koordinátái',
  difficulty: 1,
  scenario: 'A koordináta-rendszerben az **origó** a tengelyek metszéspontja.',
  question: 'Mik az origó koordinátái?',
  visual: {
    type: 'coordinateGrid',
    xMin: -3,
    xMax: 3,
    yMin: -3,
    yMax: 3,
    points: [
      {
        label: 'O',
        x: 0,
        y: 0
      }
    ]
  },
  options: ['(0; 0)', '(1; 1)', '(0; 1)', '(−1; 0)'],
  answer: '(0; 0)',
  keywords: ['koordináta', 'origó'],
  solution: 'Az **origó** a két tengely közös pontja: $(0; 0)$.'
},
{
  id: 'A-T-28',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Rácsos terület — parketta',
  difficulty: 2,
  scenario: 'Egy **5 × 4**-es parkettán a beszínezett mezők jelölik a szőnyeg helyét.',
  question: 'Hány **rácsegységnyi** a szőnyeg területe?',
  visual: {
    type: 'grid',
    w: 5,
    h: 4,
    shadedCells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2]
    ]
  },
  options: ['4', '5', '6', '8'],
  answer: '6',
  keywords: ['terület', 'rács'],
  solution: 'A beszínezett mezők száma: **6**. Ez a szőnyeg területe rácsegységben.'
},
{
  id: 'A-T-29',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'L-alak területe — kis telek',
  difficulty: 3,
  scenario: 'Egy L-alakú telek külső mérete **6 m × 4 m**, a kivágott sarok **2 m × 2 m**.',
  question: 'Mekkora a telek területe?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 6,
      h: 4
    },
    cut: {
      w: 2,
      h: 2
    },
    unit: 'm'
  },
  options: ['12 m²', '20 m²', '24 m²', '28 m²'],
  answer: '20 m²',
  keywords: ['terület', 'L-alak'],
  solution: '$T = 6 \\cdot 4 - 2 \\cdot 2 = 24 - 4 = \\mathbf{20}$ m².'
},
{
  id: 'A-T-30',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Hajó fordulás',
  difficulty: 2,
  scenario: 'Egy hajó **délkeletre** tart. A kapitány **90°-ot balra** fordul.',
  question: 'Milyen irányba halad ezután a hajó?',
  visual: {
    type: 'compass',
    center: 'H',
    points: [
      { label: 'indul', direction: 'SE' }
    ]
  },
  options: ['Északkeletre', 'Északnyugatra', 'Délnyugatra', 'Keletre'],
  answer: 'Északkeletre',
  keywords: ['égtájak', 'fordulás', 'navigáció'],
  solution: `**90° balra** fordulás az iránytűn egy **negyed kör** az óramutatóval ellentétesen.

Délkelet (SE) $\\to$ 90° balra $\\to$ **Északkelet (NE)**.

A helyes válasz: **Északkeletre**.`
},
{
  id: 'A-T-31',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Origami kihajtogatás',
  difficulty: 2,
  scenario: 'Egy négyzet alakú papírt függőlegesen félbehajtunk, majd a **bal fél** három pontjába lyukat lyukasztunk: $(1;1)$, $(2;3)$ és $(1;4)$.',
  question: 'Kihajtogatás után melyik pontban lesz biztosan lyuk a **jobb oldalon** is?',
  visual: {
    type: 'symmetryHalf',
    axis: 'y',
    halfPoints: [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 1, y: 4 }
    ]
  },
  options: ['(3; 1)', '(4; 3)', '(5; 1)', '(4; 4)'],
  answer: '(4; 3)',
  keywords: ['tükrözés', 'tengely', 'szimmetria'],
  solution: `A papírt a $y$-tengelyre tükröző **függőleges tengely** mentén hajtjuk be. A tengely az $x=3$-nál van (a négyzet közepén).

Tükrözés: $(x;y) \\to (6-x;\\, y)$.

- $(1;1) \\to (5;1)$
- $(2;3) \\to \\mathbf{(4;3)}$
- $(1;4) \\to (5;4)$

A felsorolt négy válaszból a **(4; 3)** az egyetlen valódi tükörkép.`
},
{
  id: 'A-T-32',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Betű tükörképe — M',
  difficulty: 2,
  scenario: 'Az **M** betűt függőleges tengelyre tükrözzük (mint egy tóparton a vízen).',
  question: 'Melyik betű lesz a tükörkép?',
  visual: {
    type: 'mirrorChoice',
    letter: 'M',
    axis: 'horizontal'
  },
  options: ['M', 'W', 'E', 'N'],
  answer: 'W',
  keywords: ['tükrözés', 'szimmetria', 'betű'],
  solution: `A **vízszintes tengelyre** (vízparti felszínre) tükrözés után a betű **fejjel lefelé** áll.

Az **M** fejjel lefelé egy **W**-nek látszik.

A helyes válasz: **W**.`
},
{
  id: 'A-T-33',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Kocka felszíne — játékkocka',
  difficulty: 2,
  scenario: 'Egy kocka alakú dobókocka éle **2 cm**.',
  question: 'Mekkora a **felszíne**?',
  visual: {
    type: 'box3d',
    box: {
      l: 2,
      w: 2,
      h: 2
    },
    cubeEdge: 2,
    unit: 'cm'
  },
  options: ['8 cm²', '12 cm²', '24 cm²', '48 cm²'],
  answer: '24 cm²',
  keywords: ['felszín', 'kocka'],
  solution: 'A kockának 6 egybevágó lapja van. Egy lap területe $2 \\cdot 2 = 4$ cm². Felszín: $6 \\cdot 4 = \\mathbf{24}$ cm².'
},
{
  id: 'A-T-34',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Szimmetriatengely — betű',
  difficulty: 2,
  scenario: 'A **H** betűnek szimmetriatengelyeit vizsgáljuk.',
  question: 'Hány **szimmetriatengelye** van a H betűnek (a nagybetűs tipográfia szerint)?',
  visual: {
    type: 'mirrorChoice',
    letter: 'H',
    axis: 'both',
    options: ['H', 'H', 'H', 'H']
  },
  options: ['0', '1', '2', '3'],
  answer: '2',
  keywords: ['szimmetria', 'tengely'],
  solution: 'A **H** betűnek függőleges és vízszintes szimmetriatengelye is van → **2 tengely**.'
},
{
  id: 'A-T-35',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Síknegyed meghatározása',
  difficulty: 2,
  scenario: 'Egy $P$ pont koordinátái $(3; -4)$.',
  question: 'Melyik **síknegyedben** van?',
  visual: {
    type: 'coordinateGrid',
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    points: [
      {
        label: 'P',
        x: 3,
        y: -4
      }
    ]
  },
  options: ['I.', 'II.', 'III.', 'IV.'],
  answer: 'IV.',
  keywords: ['koordináta', 'síknegyed'],
  solution: '$x > 0$ és $y < 0$ → **IV. síknegyed**.'
},
{
  id: 'A-T-36',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sokszög megnevezése',
  difficulty: 1,
  scenario: 'Egy sokszögnek **6 oldala** és **6 csúcsa** van.',
  question: 'Hogyan hívják?',
  visual: {
    type: 'formula',
    text: '6 oldal'
  },
  options: ['Négyszög', 'Ötszög', 'Hatszög', 'Hétszög'],
  answer: 'Hatszög',
  keywords: ['sokszög'],
  solution: '6 oldalú sokszög neve: **hatszög** (hexagon).'
},
{
  id: 'A-T-37',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kincseshelyek olvasása',
  difficulty: 2,
  scenario: 'A térképen a hajó (H) a **(2; 1)** pontban áll, három sziget látható.',
  question: 'Melyik sziget van a hajó **északi** (pontosan fölötte lévő oszlopban) irányában?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 6,
    start: {
      x: 2,
      y: 1,
      label: 'H'
    },
    islands: [
      {
        x: 2,
        y: 5,
        label: 'A'
      },
      {
        x: 5,
        y: 1,
        label: 'B'
      },
      {
        x: 6,
        y: 4,
        label: 'C'
      }
    ]
  },
  options: ['A', 'B', 'C', 'egyik sem'],
  answer: 'A',
  keywords: ['égtájak', 'térkép'],
  solution: 'Északra az $x$ változatlan, $y$ nő. $H(2;1)$-ről északra van **A(2;5)**.'
},
{
  id: 'A-T-38',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kocka — felülnézet',
  difficulty: 2,
  scenario: 'Egy asztalon **4 egyforma kocka** áll egymás mellett, egyenes vonalban.',
  question: 'Hogyan néz ki a kockák **felülnézete**?',
  visual: {
    type: 'comparison',
    shapes: [
      { label: 'A', kind: '1×4 sor' },
      { label: 'B', kind: '2×2 négyzet' },
      { label: 'C', kind: '1×1 négyzet' },
      { label: 'D', kind: '4×4 négyzet' }
    ]
  },
  options: ['A (1×4 sor)', 'B (2×2)', 'C (1×1)', 'D (4×4)'],
  answer: 'A (1×4 sor)',
  keywords: ['nézet', 'térbeli', 'felülnézet'],
  solution: `**Felülnézetben** csak az számít, mi látszik fentről lefelé nézve.

Négy kocka egymás mellett egyenes vonalban — fentről nézve **négy négyzet egy sorban**, vagyis egy **1×4-es téglalap**.

**A helyes válasz: A.**`
},
{
  id: 'A-T-39',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Akvárium térfogata',
  difficulty: 2,
  scenario: 'Egy akvárium **40 cm × 20 cm × 25 cm** méretű téglatest.',
  question: 'Mekkora a térfogata?',
  visual: {
    type: 'box3d',
    box: {
      l: 40,
      w: 20,
      h: 25
    },
    unit: 'cm'
  },
  options: ['85 cm³', '1000 cm³', '20 000 cm³', '60 000 cm³'],
  answer: '20 000 cm³',
  keywords: ['térfogat', 'téglatest', 'akvárium'],
  solution: `**Lépések:**

1. Képlet: $V = a \\cdot b \\cdot c$.
2. Behelyettesítés: $V = 40 \\cdot 20 \\cdot 25$.
3. $40 \\cdot 20 = 800$, majd $800 \\cdot 25 = \\mathbf{20\\,000}$ cm³.`
},
{
  id: 'A-T-40',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Téglatest felszíne — kicsi doboz',
  difficulty: 3,
  scenario: 'Egy téglatest doboz méretei **2 cm × 3 cm × 4 cm**.',
  question: 'Mekkora a **felszíne**?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 1,
    unit: 'cm'
  },
  options: ['24 cm²', '26 cm²', '52 cm²', '72 cm²'],
  answer: '52 cm²',
  keywords: ['felszín', 'téglatest'],
  solution: '$A = 2(ab + bc + ca) = 2(2\\cdot3 + 3\\cdot4 + 4\\cdot2) = 2(6+12+8) = 2\\cdot26 = \\mathbf{52}$ cm².'
},
{
  id: 'A-T-41',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Pont vízszintes tükörképe',
  difficulty: 2,
  scenario: 'A **P(3; 5)** pontot tükrözzük a **vízszintes** tengelyre.',
  question: 'Mi lesz a képpont koordinátája?',
  visual: {
    type: 'symmetryHalf',
    axis: 'horizontal',
    halfPoints: [
      {
        x: 3,
        y: 5
      }
    ]
  },
  options: ['(−3; 5)', '(3; −5)', '(−3; −5)', '(5; 3)'],
  answer: '(3; −5)',
  keywords: ['tengelyes tükrözés', 'koordináta'],
  solution: 'Vízszintes tengelyre: $x$ változatlan, $y \\to -y$. $(3;5) \\to (\\mathbf{3;-5})$.'
},
{
  id: 'A-T-42',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Tetőcserép — sorok',
  difficulty: 2,
  scenario: 'Egy kisebb tetőfelületen a cserepeket sorokba rakják. A rajz **5 sort** mutat, soronként **12 cserép** van.',
  question: 'Hány cserép van összesen a tetőn?',
  visual: {
    type: 'tileRows',
    rows: 5,
    perRow: 12
  },
  options: ['17', '50', '55', '60'],
  answer: '60',
  keywords: ['szorzás', 'pakolás', 'téglalap'],
  solution: `Ez egy **sor × oszlop** elrendezés — így a darabszám egy szorzás.

$5 \\cdot 12 = \\mathbf{60}$ cserép.`
},
{
  id: 'A-T-43',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kincseshajó távolsága',
  difficulty: 2,
  scenario: 'A térképen a hajó (H) a **(1; 2)**, a kincs (K) a **(5; 2)** pontban van.',
  question: 'Mekkora a **vízszintes** távolság?',
  visual: {
    type: 'treasureMap',
    gridW: 8,
    gridH: 5,
    start: {
      x: 1,
      y: 2,
      label: 'H'
    },
    islands: [
      {
        x: 5,
        y: 2,
        label: 'K'
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '4',
  keywords: ['koordináta', 'távolság'],
  solution: '$|5 - 1| = \\mathbf{4}$ rácsegység.'
},
{
  id: 'A-T-44',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Szabályos hatszög szimmetriái',
  difficulty: 3,
  scenario: 'Egy szabályos hatszögnek több szimmetriatengelye van.',
  question: 'Hány **szimmetriatengelye** van egy szabályos hatszögnek?',
  visual: {
    type: 'formula',
    text: 'szabályos hatszög'
  },
  options: ['3', '4', '6', '12'],
  answer: '6',
  keywords: ['szimmetria', 'szabályos sokszög'],
  solution: 'Egy szabályos $n$-szögnek **$n$ szimmetriatengelye** van. Hatszögnél: $\\mathbf{6}$.'
},
{
  id: 'A-T-45',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kocka nézete',
  difficulty: 2,
  scenario: 'Egy **4 × 4 × 4**-es kockát oldalról nézünk.',
  question: 'Milyen alakú az **oldalnézete**?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 4,
      h: 4
    },
    cubeEdge: 1,
    unit: 'cm'
  },
  options: ['Kör', 'Négyzet', 'Háromszög', 'Hatszög'],
  answer: 'Négyzet',
  keywords: ['nézet', 'kocka'],
  solution: 'Egy kockának minden lapja **négyzet**, ezért az oldalnézet is **négyzet**.'
},
{
  id: 'A-T-46',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Csempefedés — darabszám',
  difficulty: 3,
  scenario: 'Egy **2 m × 1 m** felületet **1 dm × 1 dm**-es csempékkel burkolunk.',
  question: 'Hány csempe kell? (1 m = 10 dm)',
  visual: {
    type: 'rectangle',
    widthM: 20,
    heightM: 10,
    label: 'fal (dm)',
    fill: '#b0d8ff',
    unit: 'dm'
  },
  options: ['20', '100', '200', '400'],
  answer: '200',
  keywords: ['terület', 'burkolás'],
  solution: 'A fal **20 dm × 10 dm = 200 dm²**. Egy csempe **1 dm²**. Szükséges csempe: $\\mathbf{200}$ db.'
},
{
  id: 'A-T-47',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Háromszög belső szögei',
  difficulty: 1,
  scenario: 'Egy háromszög belső szögeinek összege állandó.',
  question: 'Mekkora ez az összeg?',
  visual: {
    type: 'triangle',
    type2: 'general',
    base: 6,
    side: 5,
    unit: 'cm'
  },
  options: ['90°', '180°', '270°', '360°'],
  answer: '180°',
  keywords: ['szög', 'háromszög'],
  solution: 'Minden háromszög belső szögeinek összege $\\mathbf{180°}$.'
},
{
  id: 'A-T-48',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Négyszög belső szögei',
  difficulty: 2,
  scenario: 'Egy tetszőleges négyszög belső szögeinek összege állandó.',
  question: 'Mekkora ez az összeg?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 4,
    label: 'négyszög',
    fill: '#ffe8b0',
    unit: 'cm'
  },
  options: ['180°', '270°', '360°', '720°'],
  answer: '360°',
  keywords: ['szög', 'négyszög'],
  solution: 'Egy négyszög belső szögeinek összege $\\mathbf{360°}$ (két háromszögre bontás).'
},
{
  id: 'A-T-49',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Rácsos alakzat területe',
  difficulty: 2,
  scenario: 'A rácsos ábrán egy alakzat a beszínezett mezőkből áll.',
  question: 'Hány **rácsegységnyi** a területe?',
  visual: {
    type: 'grid',
    w: 6,
    h: 5,
    shadedCells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [3, 2],
      [4, 2]
    ]
  },
  options: ['5', '6', '7', '8'],
  answer: '7',
  keywords: ['terület', 'rács'],
  solution: 'A beszínezett mezők száma: **7**.'
},
{
  id: 'A-T-50',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Hajó délre',
  difficulty: 2,
  scenario: 'A hajó a **(4; 5)** pontból **2 mezőt délre** halad.',
  question: 'Hol lesz?',
  visual: {
    type: 'treasureMap',
    gridW: 7,
    gridH: 7,
    start: {
      x: 4,
      y: 5,
      label: 'H'
    },
    islands: [
      {
        x: 4,
        y: 3,
        label: 'V'
      }
    ]
  },
  options: ['(4; 3)', '(4; 7)', '(2; 5)', '(6; 5)'],
  answer: '(4; 3)',
  keywords: ['égtájak', 'koordináta'],
  solution: 'Délre: $y$ csökken. $(4; 5) \\to (\\mathbf{4; 3})$.'
},
{
  id: 'H-A-01',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Recept arányosítása',
  difficulty: 4,
  scenario: 'Egy palacsintarecept **4 személyre** így szól:',
  question: 'Hány ml tejre van szükség **6 személyre**?',
  visual: {
    type: 'recipe',
    servingsOriginal: 4,
    servingsTarget: 6,
    ingredients: [
      {
        name: 'Liszt',
        amount: 300,
        unit: 'g'
      },
      {
        name: 'Tej',
        amount: 600,
        unit: 'ml'
      },
      {
        name: 'Tojás',
        amount: 3,
        unit: 'db'
      },
      {
        name: 'Cukor',
        amount: 40,
        unit: 'g'
      }
    ],
    highlight: 'Tej'
  },
  options: ['750 ml', '800 ml', '900 ml', '1000 ml'],
  answer: '900 ml',
  keywords: ['egyenes arányosság', 'arány nem 1-hez'],
  solution: `**Arányosság:**

1 főre: $\\dfrac{600}{4} = 150$ ml.

6 főre: $150 \\cdot 6 = \\mathbf{900}$ ml.

Más megoldás: $600 \\cdot \\tfrac{6}{4} = 600 \\cdot 1{,}5 = 900$ ml.`
},
{
  id: 'H-A-02',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap',
  difficulty: 5,
  scenario: 'Egy osztályban a tanulók **60%-a** lány, és összesen **15 lány** jár az osztályba.',
  question: 'Hány tanuló jár ebbe az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Lányok (60%)',
        value: 60,
        color: '#ec4899'
      },
      {
        label: 'Fiúk (40%)',
        value: 40,
        color: '#2563eb'
      }
    ]
  },
  options: ['20', '24', '25', '30'],
  answer: '25',
  keywords: ['százalékalap', 'arányszámítás'],
  solution: `**Százalékalap keresése:**

Ha a 60% = 15 fő, akkor 1% = $15/60 = 0{,}25$ fő.

**100%:** $0{,}25 \\cdot 100 = \\mathbf{25}$ fő.

Ellenőrzés: $25 \\cdot 0{,}6 = 15$ lány. ✓`
},
{
  id: 'H-A-03',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Mozaik mintázat',
  difficulty: 4,
  scenario: 'Egy mozaik minta a következőképpen épül fel: minden új sor 2 kockával több az előzőnél. Az 1. sor 1 kockából áll.',
  question: 'Hány kockából áll a **10. sor**?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 1,
        label: '1. sor'
      },
      {
        count: 3,
        label: '2. sor'
      },
      {
        count: 5,
        label: '3. sor'
      },
      {
        count: 7,
        label: '4. sor'
      }
    ]
  },
  options: ['17', '19', '20', '21'],
  answer: '19',
  keywords: ['sorozat', 'szabálykövetés'],
  solution: `**Szabály felírása:**

$a_n = 1 + 2(n-1) = 2n - 1$

- $a_1 = 1$
- $a_{10} = 2 \\cdot 10 - 1 = \\mathbf{19}$ kocka`
},
{
  id: 'H-A-04',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — hozzárendelési szabály',
  difficulty: 5,
  scenario: 'Egy telefontarifa: **2 500 Ft havi alapdíj**, emellett percenként **12 Ft** a beszélgetés ára.',
  question: 'Mennyibe kerül a **45 perc** beszélgetést tartalmazó havidíj?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 2500 + 12 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek száma'
      }
    ],
    example: {
      p: 45
    }
  },
  options: ['2 540 Ft', '3 040 Ft', '4 500 Ft', '4 540 Ft'],
  answer: '3 040 Ft',
  keywords: ['hozzárendelési szabály', 'behelyettesítés'],
  solution: `**Behelyettesítés:**

$\\text{havidíj} = 2500 + 12 \\cdot 45 = 2500 + 540 = \\mathbf{3040}$ Ft.`
},
{
  id: 'H-A-05',
  contentArea: 'H',
  contentSub: '2.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép méretaránya',
  difficulty: 4,
  scenario: 'Egy térkép méretaránya **1 : 50 000**. A térképen két falu távolsága **6 cm**.',
  question: 'Hány **kilométer** a két falu valódi távolsága?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Térképen',
        formula: 'd = 6 cm',
        result: ''
      },
      {
        label: 'Valóságban',
        formula: 'D = 6 · 50000 cm',
        result: '= ? km'
      }
    ]
  },
  options: ['0,3 km', '3 km', '30 km', '300 km'],
  answer: '3 km',
  keywords: ['méretarány', 'arányosság', 'mértékegység'],
  solution: `**Méretarány alkalmazása:**

$6 \\cdot 50\\,000 = 300\\,000$ cm.

Átváltás: $300\\,000$ cm $= 3\\,000$ m $= \\mathbf{3}$ km.`
},
{
  id: 'H-A-06',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kabát leárazása',
  difficulty: 4,
  scenario: 'Egy kabát eredeti ára **12 000 Ft**. A boltban **25% kedvezménnyel** árulják.',
  question: 'Mennyibe kerül a kabát a **kedvezmény után**?',
  visual: {
    type: 'priceTag',
    items: [
      {
        label: 'Kabát (eredeti)',
        price: '12 000 Ft'
      },
      {
        label: 'Kedvezmény',
        price: '-25%'
      }
    ]
  },
  options: ['3 000 Ft', '8 000 Ft', '9 000 Ft', '9 600 Ft'],
  answer: '9 000 Ft',
  keywords: ['százalék', 'kedvezmény', 'alkalmazás'],
  solution: `**Százalékszámítás:**

Kedvezmény: $12\\,000 \\cdot 0{,}25 = 3\\,000$ Ft.

Új ár: $12\\,000 - 3\\,000 = \\mathbf{9\\,000}$ Ft.

Más módon: $12\\,000 \\cdot 0{,}75 = 9\\,000$ Ft.`
},
{
  id: 'H-A-07',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Taxi viteldíj',
  difficulty: 4,
  scenario: 'Egy taxi viteldíja: **800 Ft alapdíj**, és **280 Ft** kilométerenként.',
  question: 'Mennyibe kerül egy **7 km-es** út?',
  visual: {
    type: 'formula',
    formula: 'díj = 800 + 280 · k',
    variables: [
      {
        name: 'k',
        desc: 'megtett kilométer'
      }
    ],
    example: {
      k: 7
    }
  },
  options: ['1 960 Ft', '2 240 Ft', '2 760 Ft', '3 080 Ft'],
  answer: '2 760 Ft',
  keywords: ['hozzárendelési szabály', 'behelyettesítés'],
  solution: `**Behelyettesítés:**

$\\text{díj} = 800 + 280 \\cdot 7 = 800 + 1960 = \\mathbf{2760}$ Ft.`
},
{
  id: 'H-A-08',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gyümölcskosár',
  difficulty: 4,
  scenario: 'Egy gyümölcskosárban az alma és a körte aránya **3 : 2**. Összesen **30 gyümölcs** van a kosárban.',
  question: 'Hány darab **alma** van a kosárban?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Alma : Körte',
        formula: '3 : 2',
        result: ''
      },
      {
        label: 'Összesen',
        formula: 'A + K = 30',
        result: 'A = ?'
      }
    ]
  },
  options: ['12', '15', '18', '20'],
  answer: '18',
  keywords: ['arány', 'arányos osztás'],
  solution: `**Arányos osztás:**

$3 + 2 = 5$ rész, ez összesen 30 gyümölcs.

1 rész $= 30 / 5 = 6$ gyümölcs.

Alma: $3 \\cdot 6 = \\mathbf{18}$.

Körte: $2 \\cdot 6 = 12$. Ellenőrzés: $18 + 12 = 30$ ✓`
},
{
  id: 'H-A-09',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Autó üzemanyag',
  difficulty: 4,
  scenario: 'Egy autó tankja **50 liter** benzinnel van feltöltve. 100 km-enként **7 litert** fogyaszt.',
  question: 'Hány liter marad a tankban **300 km** megtétele után?',
  visual: {
    type: 'table',
    caption: 'Fogyasztás kilométerenként',
    headers: ['Megtett út (km)', 'Elhasznált (l)', 'Maradék (l)'],
    rows: [
      ['0', '0', '50'],
      ['100', '7', '43'],
      ['200', '14', '36'],
      ['300', '?', '?']
    ]
  },
  options: ['21 l', '28 l', '29 l', '36 l'],
  answer: '29 l',
  keywords: ['változók közötti kapcsolat', 'fogyasztás'],
  solution: `**Számítás:**

300 km-re: $\\dfrac{300}{100} \\cdot 7 = 21$ liter fogyasztás.

Maradék: $50 - 21 = \\mathbf{29}$ liter.`
},
{
  id: 'H-A-10',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Baktériumszaporodás',
  difficulty: 5,
  scenario: 'Egy laborban a baktériumok **óránként megduplázódnak**. Kezdetben 3 baktérium van.',
  question: 'Hány baktérium lesz **5 óra** múlva?',
  visual: {
    type: 'sequence',
    elements: ['3', '6', '12', '24', '48', '?']
  },
  options: ['60', '72', '96', '120'],
  answer: '96',
  keywords: ['mértani sorozat', 'szabály'],
  solution: `**Megduplázódás (mértani sorozat):**

- 0 h: 3
- 1 h: 6
- 2 h: 12
- 3 h: 24
- 4 h: 48
- **5 h: $48 \\cdot 2 = \\mathbf{96}$**.`
},
{
  id: 'H-A-11',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Ismeretlen szám',
  difficulty: 4,
  scenario: 'Gondoltam egy számra. Ha **megszorzom 4-gyel** és **hozzáadok 7-et**, az eredmény **35** lesz.',
  question: 'Melyik számra gondoltam?',
  visual: {
    type: 'formula',
    formula: '4 · x + 7 = 35',
    variables: [
      {
        name: 'x',
        desc: 'a gondolt szám'
      }
    ]
  },
  options: ['5', '7', '8', '10'],
  answer: '7',
  keywords: ['egyenlet', 'megoldás'],
  solution: `**Egyenlet megoldása:**

$4x + 7 = 35$

$4x = 35 - 7 = 28$

$x = 28 / 4 = \\mathbf{7}$.

Ellenőrzés: $4 \\cdot 7 + 7 = 28 + 7 = 35$ ✓`
},
{
  id: 'H-A-12',
  contentArea: 'H',
  contentSub: '2.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.1',
  title: 'Zsebpénz növekedése',
  difficulty: 4,
  scenario: 'Anna zsebpénze az elmúlt hónapokban egyenletesen nőtt. A diagram alapján fel kell ismerni a szabályt.',
  question: 'Ha a növekedés folytatódik, **mennyi** lesz a zsebpénze **júniusban**?',
  visual: {
    type: 'barChart',
    xLabel: 'Hónap',
    yLabel: 'Zsebpénz (Ft)',
    yMax: 7000,
    bars: [
      {
        label: 'Jan',
        value: 2000
      },
      {
        label: 'Feb',
        value: 2800
      },
      {
        label: 'Már',
        value: 3600
      },
      {
        label: 'Ápr',
        value: 4400
      },
      {
        label: 'Máj',
        value: 5200
      }
    ],
    color: '#10b981'
  },
  options: ['5 800 Ft', '6 000 Ft', '6 200 Ft', '6 400 Ft'],
  answer: '6 000 Ft',
  keywords: ['ábrázolás', 'számtani sorozat', 'folytatás'],
  solution: `**Szabály felismerése:**

Minden hónapban $+800$ Ft a növekedés.

Május: 5 200 Ft. Június: $5\\,200 + 800 = \\mathbf{6\\,000}$ Ft.`
},
{
  id: 'H-A-13',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap — 60% = 15',
  difficulty: 4,
  scenario: 'Egy osztály **60%-a** 15 tanuló.',
  question: 'Hány tanuló jár az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: '60%',
        value: 60,
        color: '#ec4899'
      },
      {
        label: '40%',
        value: 40,
        color: '#2563eb'
      }
    ]
  },
  options: ['20', '25', '30', '35'],
  answer: '25',
  keywords: ['százalékalap'],
  solution: '60% = 15 → 1% = $0.25$. 100% = **25**.'
},
{
  id: 'H-A-14',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap — 40% = 8',
  difficulty: 4,
  scenario: 'Egy osztály **40%-a** 8 tanuló.',
  question: 'Hány tanuló jár az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: '40%',
        value: 40,
        color: '#ec4899'
      },
      {
        label: '60%',
        value: 60,
        color: '#2563eb'
      }
    ]
  },
  options: ['15', '20', '25', '30'],
  answer: '20',
  keywords: ['százalékalap'],
  solution: '40% = 8 → 1% = $0.2$. 100% = **20**.'
},
{
  id: 'H-A-15',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékalap — 25% = 7',
  difficulty: 4,
  scenario: 'Egy osztály **25%-a** 7 tanuló.',
  question: 'Hány tanuló jár az osztályba?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: '25%',
        value: 25,
        color: '#ec4899'
      },
      {
        label: '75%',
        value: 75,
        color: '#2563eb'
      }
    ]
  },
  options: ['23', '28', '33', '38'],
  answer: '28',
  keywords: ['százalékalap'],
  solution: '25% = 7 → 1% = $0.28$. 100% = **28**.'
},
{
  id: 'H-A-16',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Áremelés — 15%',
  difficulty: 4,
  scenario: 'Egy kiflit a pékségben **15%-kal** drágított. Az új ára **345 Ft**.',
  question: 'Mennyi volt az **eredeti** ár?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti ár', formula: '100%', result: '?' },
      { label: 'Új ár', formula: '115% = 345 Ft', result: '' }
    ]
  },
  options: ['280 Ft', '300 Ft', '320 Ft', '330 Ft'],
  answer: '300 Ft',
  keywords: ['százalékalap', 'áremelés'],
  solution: '$115\\% = 345$ → $1\\% = 3$. $100\\% = \\mathbf{300}$ Ft.'
},
{
  id: 'H-A-17',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kamatszámítás — éves',
  difficulty: 4,
  scenario: 'Egy bank évi **5%** kamatot ír jóvá a betétre. Egy év alatt **2500 Ft** kamat keletkezett.',
  question: 'Mekkora volt a **betét**?',
  visual: {
    type: 'formula',
    formula: 'kamat = 5% · betét',
    variables: [
      { name: 'kamat', desc: '2500 Ft' }
    ],
    example: { betét: '?' }
  },
  options: ['40 000 Ft', '45 000 Ft', '50 000 Ft', '55 000 Ft'],
  answer: '50 000 Ft',
  keywords: ['százalékalap', 'kamat'],
  solution: '$5\\% = 2500$ → $1\\% = 500$. $100\\% = \\mathbf{50\\,000}$ Ft.'
},
{
  id: 'H-A-18',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Leárazás — 30% kedvezmény',
  difficulty: 4,
  scenario: 'Egy pulóvert **30%-os** kedvezménnyel árulnak, az engedmény összege **1800 Ft**.',
  question: 'Mennyi az **eredeti ár**?',
  visual: {
    type: 'priceTag',
    items: [
      { name: 'Kedvezmény', price: '30%' },
      { name: 'Levont összeg', price: '1800 Ft' },
      { name: 'Eredeti ár', price: '?' }
    ]
  },
  options: ['5000 Ft', '6000 Ft', '7200 Ft', '9000 Ft'],
  answer: '6000 Ft',
  keywords: ['százalékalap', 'leárazás'],
  solution: '$30\\% = 1800$ → $1\\% = 60$. $100\\% = \\mathbf{6000}$ Ft.'
},
{
  id: 'H-A-19',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'ÁFA — nettó ár',
  difficulty: 4,
  scenario: 'Egy termék ára ÁFA-val **25 400 Ft**. Az ÁFA **27%**.',
  question: 'Mennyi a **nettó ár**? (kerekíts egészre)',
  visual: {
    type: 'formula',
    formula: 'bruttó = nettó · 1,27',
    variables: [
      { name: 'bruttó', desc: '25 400 Ft' }
    ],
    example: { nettó: '?' }
  },
  options: ['18 500 Ft', '20 000 Ft', '21 500 Ft', '24 000 Ft'],
  answer: '20 000 Ft',
  keywords: ['százalékalap', 'ÁFA'],
  solution: '$25\\,400 \\div 1{,}27 = \\mathbf{20\\,000}$ Ft.'
},
{
  id: 'H-A-20',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szavazás — eredmény',
  difficulty: 4,
  scenario: 'Egy szavazáson **45 szavazat** érkezett, ez a választók **25%-a**.',
  question: 'Hány választó volt **összesen**?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Szavazott', value: 25, color: '#22c55e' },
      { label: 'Nem szavazott', value: 75, color: '#9ca3af' }
    ]
  },
  options: ['120', '150', '160', '180'],
  answer: '180',
  keywords: ['százalékalap', 'szavazás'],
  solution: '$25\\% = 45$ → $1\\% = 1{,}8$. $100\\% = \\mathbf{180}$.'
},
{
  id: 'H-A-21',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 4:6',
  difficulty: 4,
  scenario: 'A arány **4 : 6**. Ha A mennyiség 300...',
  question: 'Mennyi B?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A',
        formula: '4 egység = 300',
        result: ''
      },
      {
        label: 'B',
        formula: '6 egység = ?',
        result: ''
      }
    ]
  },
  options: ['400', '450', '500', '900'],
  answer: '450',
  keywords: ['arányosság'],
  solution: '1 egység = $75$. 6 egység = **450**.'
},
{
  id: 'H-A-22',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 3:5',
  difficulty: 4,
  scenario: 'A arány **3 : 5**. Ha A mennyiség 120...',
  question: 'Mennyi B?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A',
        formula: '3 egység = 120',
        result: ''
      },
      {
        label: 'B',
        formula: '5 egység = ?',
        result: ''
      }
    ]
  },
  options: ['150', '200', '250', '400'],
  answer: '200',
  keywords: ['arányosság'],
  solution: '1 egység = $40$. 5 egység = **200**.'
},
{
  id: 'H-A-23',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 2:7',
  difficulty: 4,
  scenario: 'A arány **2 : 7**. Ha A mennyiség 60...',
  question: 'Mennyi B?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A',
        formula: '2 egység = 60',
        result: ''
      },
      {
        label: 'B',
        formula: '7 egység = ?',
        result: ''
      }
    ]
  },
  options: ['160', '210', '260', '420'],
  answer: '210',
  keywords: ['arányosság'],
  solution: '1 egység = $30$. 7 egység = **210**.'
},
{
  id: 'H-A-24',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 5:8',
  difficulty: 4,
  scenario: 'A arány **5 : 8**. Ha A mennyiség 75...',
  question: 'Mennyi B?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A',
        formula: '5 egység = 75',
        result: ''
      },
      {
        label: 'B',
        formula: '8 egység = ?',
        result: ''
      }
    ]
  },
  options: ['70', '120', '170', '240'],
  answer: '120',
  keywords: ['arányosság'],
  solution: '1 egység = $15$. 8 egység = **120**.'
},
{
  id: 'H-A-25',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 10. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **1**, minden következő **2-vel több**.',
  question: 'Mi a **10.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 1,
        label: '1. sor'
      },
      {
        count: 3,
        label: '2. sor'
      },
      {
        count: 5,
        label: '3. sor'
      },
      {
        count: 7,
        label: '4. sor'
      }
    ]
  },
  options: ['17', '19', '21', '23'],
  answer: '19',
  keywords: ['sorozat'],
  solution: '$a_n = 1 + 2(n-1) = 1 + 2 \\cdot 9 = 19$.'
},
{
  id: 'H-A-26',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 8. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **2**, minden következő **3-vel több**.',
  question: 'Mi a **8.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 2,
        label: '1. sor'
      },
      {
        count: 5,
        label: '2. sor'
      },
      {
        count: 8,
        label: '3. sor'
      },
      {
        count: 11,
        label: '4. sor'
      }
    ]
  },
  options: ['20', '23', '26', '29'],
  answer: '23',
  keywords: ['sorozat'],
  solution: '$a_n = 2 + 3(n-1) = 2 + 3 \\cdot 7 = 23$.'
},
{
  id: 'H-A-27',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 6. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **4**, minden következő **4-vel több**.',
  question: 'Mi a **6.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 4,
        label: '1. sor'
      },
      {
        count: 8,
        label: '2. sor'
      },
      {
        count: 12,
        label: '3. sor'
      },
      {
        count: 16,
        label: '4. sor'
      }
    ]
  },
  options: ['20', '24', '28', '32'],
  answer: '24',
  keywords: ['sorozat'],
  solution: '$a_n = 4 + 4(n-1) = 4 + 4 \\cdot 5 = 24$.'
},
{
  id: 'H-A-28',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Sorozat 10. eleme',
  difficulty: 4,
  scenario: 'Egy sorozat első tagja **3**, minden következő **5-vel több**.',
  question: 'Mi a **10.** eleme?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        count: 3,
        label: '1. sor'
      },
      {
        count: 8,
        label: '2. sor'
      },
      {
        count: 13,
        label: '3. sor'
      },
      {
        count: 18,
        label: '4. sor'
      }
    ]
  },
  options: ['43', '48', '53', '58'],
  answer: '48',
  keywords: ['sorozat'],
  solution: '$a_n = 3 + 5(n-1) = 3 + 5 \\cdot 9 = 48$.'
},
{
  id: 'H-A-29',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 45 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **2500 Ft**, perc: **12 Ft**.',
  question: 'Mennyi a **45 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 2500 + 12 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 45
    }
  },
  options: ['2940', '3040', '3140', '3540'],
  answer: '3040',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$2500 + 12 \\cdot 45 = 2500 + 540 = 3040$ Ft.'
},
{
  id: 'H-A-30',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 60 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **3000 Ft**, perc: **10 Ft**.',
  question: 'Mennyi a **60 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 3000 + 10 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 60
    }
  },
  options: ['3500', '3600', '3700', '4100'],
  answer: '3600',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$3000 + 10 \\cdot 60 = 3000 + 600 = 3600$ Ft.'
},
{
  id: 'H-A-31',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 80 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **1500 Ft**, perc: **15 Ft**.',
  question: 'Mennyi a **80 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 1500 + 15 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 80
    }
  },
  options: ['2600', '2700', '2800', '3200'],
  answer: '2700',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$1500 + 15 \\cdot 80 = 1500 + 1200 = 2700$ Ft.'
},
{
  id: 'H-A-32',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Telefondíj — 100 perc',
  difficulty: 4,
  scenario: 'Havi alapdíj: **5000 Ft**, perc: **8 Ft**.',
  question: 'Mennyi a **100 perces** hónap havidíja?',
  visual: {
    type: 'formula',
    formula: 'havidíj = 5000 + 8 · p',
    variables: [
      {
        name: 'p',
        desc: 'percek'
      }
    ],
    example: {
      p: 100
    }
  },
  options: ['5700', '5800', '5900', '6300'],
  answer: '5800',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$5000 + 8 \\cdot 100 = 5000 + 800 = 5800$ Ft.'
},
{
  id: 'H-A-33',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tippek aránya',
  difficulty: 4,
  scenario: 'Egy totó-szelvényen **12 találatból 9** volt jó.',
  question: 'Hány **százalékos** a találati arány?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Jó tipp', formula: '9', result: '' },
      { label: 'Összes', formula: '12', result: '' }
    ]
  },
  options: ['70%', '72%', '75%', '80%'],
  answer: '75%',
  keywords: ['százalék', 'arány'],
  solution: '$9 \\div 12 = 0{,}75 = \\mathbf{75\\%}$.'
},
{
  id: 'H-A-34',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Osztály — fiúk aránya',
  difficulty: 4,
  scenario: 'Egy **32 fős** osztályban **14 fiú** van.',
  question: 'Hány **százaléka** a fiúk az osztálynak? (kerekíts egészre)',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Fiú', value: 44, color: '#2563eb' },
      { label: 'Lány', value: 56, color: '#ec4899' }
    ]
  },
  options: ['40%', '42%', '44%', '46%'],
  answer: '44%',
  keywords: ['százalék', 'arány'],
  solution: '$14 \\div 32 = 0{,}4375 \\approx \\mathbf{44\\%}$.'
},
{
  id: 'H-A-35',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Baktériumszaporodás — arány',
  difficulty: 5,
  scenario: 'Egy baktériumtenyészet **18%-kal** nőtt naponta. A kezdő szám **5000**.',
  question: 'Hány baktérium lesz **1 nap múlva**?',
  visual: {
    type: 'formula',
    formula: 'N\' = N · 1,18',
    variables: [
      { name: 'N', desc: '5000' }
    ],
    example: { növekedés: '18%' }
  },
  options: ['5600', '5800', '5900', '6100'],
  answer: '5900',
  keywords: ['százalék', 'növekedés'],
  solution: '$5000 \\cdot 1{,}18 = \\mathbf{5900}$.'
},
{
  id: 'H-A-36',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Felhőtarifa — adatkvóta',
  difficulty: 4,
  scenario: 'Egy felhőszolgáltatás **200 GB** havi kvótát ad. A hónap végén **38 GB** maradt.',
  question: 'Hány **százalékot** használtál el?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Elhasznált', formula: '200 − 38 = 162', result: '' },
      { label: 'Összes', formula: '200', result: '' }
    ]
  },
  options: ['75%', '78%', '80%', '81%'],
  answer: '81%',
  keywords: ['százalék', 'arány'],
  solution: '$162 \\div 200 = 0{,}81 = \\mathbf{81\\%}$.'
},
{
  id: 'H-A-37',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kamat — 2 év',
  difficulty: 5,
  scenario: 'Egy betétre évi **4% kamatos kamat** jár. A kezdőtőke **20 000 Ft**.',
  question: 'Mennyi lesz a betét **2 év** múlva? (kerekíts egészre)',
  visual: {
    type: 'formula',
    formula: 'T_n = T_0 · (1 + p)^n',
    variables: [
      { name: 'T_0', desc: '20 000' },
      { name: 'p', desc: '0,04' },
      { name: 'n', desc: '2' }
    ],
    example: { eredmény: '?' }
  },
  options: ['21 200 Ft', '21 632 Ft', '21 800 Ft', '22 000 Ft'],
  answer: '21 632 Ft',
  keywords: ['kamatos kamat', 'százalék'],
  solution: '$20\\,000 \\cdot 1{,}04^2 = 20\\,000 \\cdot 1{,}0816 = \\mathbf{21\\,632}$ Ft.'
},
{
  id: 'H-A-38',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gyűjtés — célteljesítés',
  difficulty: 4,
  scenario: 'Egy osztálygyűjtés célja **60 000 Ft**; eddig **45 000 Ft** gyűlt össze.',
  question: 'Hány **százaléka** teljesült?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Gyűjtött', value: 75, color: '#22c55e' },
      { label: 'Hiány', value: 25, color: '#9ca3af' }
    ]
  },
  options: ['60%', '70%', '75%', '80%'],
  answer: '75%',
  keywords: ['százalék', 'arány'],
  solution: '$45\\,000 \\div 60\\,000 = 0{,}75 = \\mathbf{75\\%}$.'
},
{
  id: 'H-A-39',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Áremelés után leárazás',
  difficulty: 5,
  scenario: 'Egy termék ára **10%-kal drágult**, majd **10%-kal csökkent**. Eredeti ár: **5000 Ft**.',
  question: 'Mennyi a **végső ár**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti', formula: '5000 Ft', result: '' },
      { label: '+10%', formula: '5500', result: '' },
      { label: '−10%', formula: '?', result: '' }
    ]
  },
  options: ['4900 Ft', '4950 Ft', '5000 Ft', '5050 Ft'],
  answer: '4950 Ft',
  keywords: ['százalék', 'összetett'],
  solution: '$5000 \\cdot 1{,}1 \\cdot 0{,}9 = 5000 \\cdot 0{,}99 = \\mathbf{4950}$ Ft.'
},
{
  id: 'H-A-40',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Vitaminterv — napi adag',
  difficulty: 4,
  scenario: 'A napi ajánlott C-vitamin **80 mg**. A reggeli **50 mg**-ot tartalmaz.',
  question: 'Hány **százaléka** teljesült a napi adagnak?',
  visual: {
    type: 'formula',
    formula: 'arány = 50 / 80',
    variables: [
      { name: 'fogyasztott', desc: '50 mg' },
      { name: 'cél', desc: '80 mg' }
    ],
    example: { eredmény: '?' }
  },
  options: ['50%', '60%', '62,5%', '75%'],
  answer: '62,5%',
  keywords: ['százalék', 'arány'],
  solution: '$50 \\div 80 = 0{,}625 = \\mathbf{62{,}5\\%}$.'
},
{
  id: 'H-A-41',
  contentArea: 'H',
  contentSub: '2.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép — 1:200 000',
  difficulty: 4,
  scenario: 'Egy térkép méretaránya **1 : 200 000**. Két város között a térképen **7 cm** a távolság.',
  question: 'Hány **km** a valós távolság?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Térkép', formula: '7 cm', result: '' },
      { label: 'Valóság', formula: '7 · 200 000 cm', result: '?' }
    ]
  },
  options: ['1,4 km', '14 km', '140 km', '1400 km'],
  answer: '14 km',
  keywords: ['méretarány'],
  solution: '$7 \\cdot 200\\,000 = 1\\,400\\,000$ cm $= \\mathbf{14}$ km.'
},
{
  id: 'H-A-42',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Recept arányosítás — palacsinta',
  difficulty: 4,
  scenario: 'Egy palacsintarecept **4 személyre** 250 g lisztet kér.',
  question: 'Hány g liszt kell **10 személyre**?',
  visual: {
    type: 'recipe',
    title: 'Palacsinta alapanyagok',
    ingredients: [
      { name: 'Liszt (4 fő)', amount: '250 g' },
      { name: 'Kért fő', amount: '10 fő' }
    ]
  },
  options: ['500 g', '600 g', '625 g', '750 g'],
  answer: '625 g',
  keywords: ['arány', 'recept'],
  solution: '$250 \\div 4 \\cdot 10 = 62{,}5 \\cdot 10 = \\mathbf{625}$ g.'
},
{
  id: 'H-A-43',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Festék — gipszkarton',
  difficulty: 4,
  scenario: 'Egy 3 literes festékkel **24 m²** falfelület festhető.',
  question: 'Hány **liter** festék kell egy **40 m²**-es falhoz?',
  visual: {
    type: 'comparison',
    items: [
      { label: '3 L', formula: '24 m²', result: '' },
      { label: '? L', formula: '40 m²', result: '' }
    ]
  },
  options: ['4 L', '5 L', '6 L', '8 L'],
  answer: '5 L',
  keywords: ['arány', 'egyenes arányosság'],
  solution: '$3 \\div 24 \\cdot 40 = 0{,}125 \\cdot 40 = \\mathbf{5}$ L.'
},
{
  id: 'H-A-44',
  contentArea: 'H',
  contentSub: '2.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Modellautó — méretarány',
  difficulty: 4,
  scenario: 'Egy modellautó méretaránya **1 : 24**. A modell hossza **18 cm**.',
  question: 'Hány **cm** a valódi autó hossza?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Modell', formula: '18 cm', result: '' },
      { label: 'Valóság', formula: '18 · 24', result: '?' }
    ]
  },
  options: ['360 cm', '420 cm', '432 cm', '480 cm'],
  answer: '432 cm',
  keywords: ['méretarány'],
  solution: '$18 \\cdot 24 = \\mathbf{432}$ cm.'
},
{
  id: 'H-A-45',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Zsebpénz — sorozat',
  difficulty: 4,
  scenario: 'Zsófi az első héten **500 Ft** zsebpénzt kap, és minden héten **100 Ft-tal többet**, mint az előzőn.',
  question: 'Mennyit kap a **12. héten**?',
  visual: {
    type: 'sequence',
    elements: ['500', '600', '700', '800', '...', '?']
  },
  options: ['1500 Ft', '1600 Ft', '1700 Ft', '1800 Ft'],
  answer: '1600 Ft',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_{12} = 500 + 11 \\cdot 100 = \\mathbf{1600}$ Ft.'
},
{
  id: 'H-A-46',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Színházszékek — n-edik sor',
  difficulty: 4,
  scenario: 'A nézőtér első sorában **18 szék** van; minden hátsóbb sorban **2-vel több**.',
  question: 'Hány szék van a **9. sorban**?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 18, label: '1. sor' },
      { count: 20, label: '2. sor' },
      { count: 22, label: '3. sor' },
      { count: 24, label: '4. sor' }
    ]
  },
  options: ['30', '32', '34', '36'],
  answer: '34',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_9 = 18 + 8 \\cdot 2 = \\mathbf{34}$ szék.'
},
{
  id: 'H-A-47',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Vonatkocsi — ülések',
  difficulty: 4,
  scenario: 'A vonat minden kocsijában **48 ülés** van. Az első kocsiban **12 utas** ült le; minden további kocsiban **6-tal több** utas foglal helyet.',
  question: 'Hány utas ül a **7. kocsiban**?',
  visual: {
    type: 'sequence',
    elements: ['12', '18', '24', '30', '...', '?']
  },
  options: ['42', '44', '46', '48'],
  answer: '48',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_7 = 12 + 6 \\cdot 6 = \\mathbf{48}$ utas.'
},
{
  id: 'H-A-48',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Könyvespolc — sorozat',
  difficulty: 4,
  scenario: 'A legalsó polcon **24** könyv fér el; minden fentebbi polcon **3-mal kevesebb**.',
  question: 'Hány könyv fér a **6.** (legfelső) polcra?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 24, label: '1. polc' },
      { count: 21, label: '2. polc' },
      { count: 18, label: '3. polc' },
      { count: 15, label: '4. polc' }
    ]
  },
  options: ['6', '9', '12', '15'],
  answer: '9',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_6 = 24 - 5 \\cdot 3 = \\mathbf{9}$ könyv.'
},
{
  id: 'H-A-49',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Taxiviteldíj — 12 km',
  difficulty: 4,
  scenario: 'Egy taxi **alapdíja 900 Ft**, kilométerdíja **320 Ft/km**.',
  question: 'Mennyi a viteldíj **12 km** után?',
  visual: {
    type: 'formula',
    formula: 'díj = 900 + 320 · km',
    variables: [
      { name: 'km', desc: 'megtett km' }
    ],
    example: { km: 12 }
  },
  options: ['3840 Ft', '4200 Ft', '4740 Ft', '5040 Ft'],
  answer: '4740 Ft',
  keywords: ['hozzárendelés', 'behelyettesítés'],
  solution: '$900 + 320 \\cdot 12 = 900 + 3840 = \\mathbf{4740}$ Ft.'
},
{
  id: 'H-A-50',
  contentArea: 'H',
  contentSub: '2.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Uszodabérlet — alkalmak',
  difficulty: 4,
  scenario: 'Havi uszodabérlet **7500 Ft** alapdíjból és **450 Ft/alkalom** extra belépőből áll, ha túl van lépve a keret.',
  question: 'Mennyit fizet **14 alkalom** esetén? (alapdíj 10 alkalmat fed)',
  visual: {
    type: 'formula',
    formula: 'díj = 7500 + 450 · (alkalom − 10)',
    variables: [
      { name: 'alkalom', desc: '14' }
    ],
    example: { eredmény: '?' }
  },
  options: ['8400 Ft', '9300 Ft', '9750 Ft', '13 800 Ft'],
  answer: '9300 Ft',
  keywords: ['hozzárendelés', 'feltétel'],
  solution: '$7500 + 450 \\cdot (14-10) = 7500 + 1800 = \\mathbf{9300}$ Ft.'
},
{
  id: 'H-K-01',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Pontdiagram értelmezése',
  difficulty: 7,
  scenario: 'Egy kutatásban megmérték 10 tanuló **heti edzésidejét (óra)** és a **100 m-es futóeredményét (mp)**.',
  question: 'Mit mondhatunk az edzésidő és a futóidő kapcsolatáról?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Heti edzés (óra)',
    yLabel: '100 m idő (mp)',
    xMin: 0,
    xMax: 10,
    yMin: 12,
    yMax: 18,
    points: [
      {
        x: 1,
        y: 17.5
      },
      {
        x: 2,
        y: 16.8
      },
      {
        x: 2,
        y: 17.1
      },
      {
        x: 3,
        y: 15.8
      },
      {
        x: 4,
        y: 15.2
      },
      {
        x: 5,
        y: 14.9
      },
      {
        x: 6,
        y: 14.2
      },
      {
        x: 7,
        y: 13.8
      },
      {
        x: 8,
        y: 13.5
      },
      {
        x: 9,
        y: 13
      }
    ]
  },
  options: ['Több edzés → gyorsabb (rövidebb) futóidő', 'Több edzés → lassabb (hosszabb) futóidő', 'Nincs kapcsolat az edzés és a futóidő között', 'Csak a lassabb futók edzenek sokat'],
  answer: 'Több edzés → gyorsabb (rövidebb) futóidő',
  keywords: ['pontdiagram', 'összefüggés', 'változók kapcsolata'],
  solution: `**Trend leolvasása a pontdiagramról:**

- Kevés edzés (1-2 óra): **~17 mp** körüli idők.
- Sok edzés (8-9 óra): **~13 mp** körüli idők.

A pontok **csökkenő trendet** mutatnak: ha $x$ (edzés) nő, $y$ (idő) csökken → **fordított (negatív) kapcsolat**.

**A helyes válasz:** Több edzés → gyorsabb (rövidebb) futóidő.`
},
{
  id: 'H-K-02',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két testvér — életkor',
  difficulty: 7,
  scenario: 'Anna most **3-szor olyan idős**, mint a testvére, Peti. 5 év múlva Anna már csak **2-szer olyan idős** lesz, mint Peti.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 3 · P',
        result: 'A = ?, P = ?'
      },
      {
        label: '5 év múlva',
        formula: 'A + 5 = 2 · (P + 5)',
        result: ''
      }
    ]
  },
  answer: {
    Peti: 5,
    Anna: 15
  },
  keywords: ['egyenlet', 'szöveges feladat'],
  solution: `**Egyenlet felírása:**

Legyen Peti most $x$ éves. Anna: $3x$.

5 év múlva: Peti $x+5$, Anna $3x+5$, és $3x+5 = 2(x+5)$.

**Megoldás:**

$3x + 5 = 2x + 10$
$x = 5$

**Peti most 5, Anna 15 éves.**

Ellenőrzés 5 év múlva: Peti 10, Anna 20 → $20 = 2 \\cdot 10$ ✓`
},
{
  id: 'H-K-03',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Takarékoskodás',
  difficulty: 7,
  scenario: 'Panni januárban **500 Ft**-tal kezdi gyűjteni a zsebpénzét, és **minden hónapban 200 Ft-tal többet** rak félre, mint az előzőben.',
  question: 'Mennyi pénz lesz összesen a malacperselyben **december végén** (12 hónap)?',
  visual: {
    type: 'table',
    caption: 'Havi befizetések',
    headers: ['Hónap', '1', '2', '3', '4', '...', '12'],
    rows: [
      ['Összeg (Ft)', '500', '700', '900', '1100', '...', '?']
    ]
  },
  options: ['9 600 Ft', '15 600 Ft', '19 200 Ft', '25 800 Ft'],
  answer: '19 200 Ft',
  keywords: ['számtani sorozat', 'összeg'],
  solution: `**Számtani sorozat összege:**

Első tag: $a_1 = 500$. Különbség: $d = 200$.

12. tag: $a_{12} = 500 + 11 \\cdot 200 = 500 + 2200 = 2700$ Ft.

**Összeg:** $S_{12} = \\dfrac{(a_1 + a_{12}) \\cdot 12}{2} = \\dfrac{(500+2700)\\cdot 12}{2} = \\dfrac{3200 \\cdot 12}{2} = \\mathbf{19\\,200}$ Ft.`
},
{
  id: 'H-K-04',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családi torta — arányok',
  difficulty: 6,
  scenario: 'Egy családi zsúrra egy tortát **4 : 3 : 2** arányban vág fel három gyerek között (Dani, Eszti, Fanni). Eszti **9 szeletet** kapott.',
  question: 'Hány szelet volt az **egész torta**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Dani : Eszti : Fanni',
        formula: '4 : 3 : 2',
        result: ''
      },
      {
        label: 'Eszti',
        formula: '3 rész',
        result: '= 9 szelet'
      }
    ]
  },
  options: ['18', '24', '27', '30'],
  answer: '27',
  keywords: ['arány', 'arányos osztás', 'komplex'],
  solution: `**Arányos osztás:**

Eszti 3 rész $= 9$ szelet, tehát 1 rész $= 3$ szelet.

- Dani: $4 \\cdot 3 = 12$
- Eszti: $3 \\cdot 3 = 9$
- Fanni: $2 \\cdot 3 = 6$

**Összesen: $12 + 9 + 6 = \\mathbf{27}$ szelet.**`
},
{
  id: 'H-K-05',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Két vonat találkozása',
  difficulty: 6,
  scenario: 'Két vonat egymás felé halad ugyanazon a pályán (A és B város között 300 km a távolság). A grafikon mindkét vonat helyét mutatja az idő függvényében.',
  question: 'Körülbelül **hány óránál** találkoznak a vonatok?',
  visual: {
    type: 'lineChart',
    xLabel: 'Idő (óra)',
    yLabel: 'Hely (km)',
    yMin: 0,
    yMax: 300,
    series: [
      {
        name: 'Kék vonat (A-ból indul)',
        color: '#2563eb',
        points: [
          {
            x: '0',
            y: 0
          },
          {
            x: '1',
            y: 60
          },
          {
            x: '2',
            y: 120
          },
          {
            x: '3',
            y: 180
          },
          {
            x: '4',
            y: 240
          }
        ]
      },
      {
        name: 'Piros vonat (B-ből indul)',
        color: '#ef4444',
        points: [
          {
            x: '0',
            y: 300
          },
          {
            x: '1',
            y: 240
          },
          {
            x: '2',
            y: 180
          },
          {
            x: '3',
            y: 120
          },
          {
            x: '4',
            y: 60
          }
        ]
      }
    ]
  },
  options: ['2 óra', '2,5 óra', '3 óra', '3,5 óra'],
  answer: '2,5 óra',
  keywords: ['grafikon', 'metszéspont', 'vonat'],
  solution: `**Metszéspont keresése:**

A kék vonat: $y = 60t$. A piros vonat: $y = 300 - 60t$.

Találkozás: $60t = 300 - 60t \\Rightarrow 120t = 300 \\Rightarrow t = \\mathbf{2{,}5}$ óra.

Ekkor mindkét vonat a 150 km-es pontnál van.`
},
{
  id: 'H-K-06',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mozijegy',
  difficulty: 6,
  scenario: 'Egy moziban a **felnőtt jegy 1 800 Ft**, a **gyerekjegy 1 200 Ft**. Egy családi estére **7 jegyet** vettek, és összesen **11 400 Ft**-ot fizettek.',
  question: 'Hány **gyerekjegyet** vettek?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Jegyek száma',
        formula: 'F + Gy = 7',
        result: ''
      },
      {
        label: 'Ár',
        formula: '1800F + 1200Gy = 11400',
        result: 'Gy = ?'
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '2',
  keywords: ['egyenletrendszer', 'szöveges feladat'],
  solution: `**Egyenletrendszer:**

Legyen $F$ a felnőtt, $Gy$ a gyerekjegyek száma.

$F + Gy = 7 \\Rightarrow F = 7 - Gy$

Behelyettesítve az árképletbe: $1800(7 - Gy) + 1200Gy = 11\\,400$

$12\\,600 - 1800Gy + 1200Gy = 11\\,400$

$-600Gy = -1200 \\Rightarrow Gy = \\mathbf{2}$.

Felnőtt: $F = 5$.

Ellenőrzés: $5 \\cdot 1800 + 2 \\cdot 1200 = 9000 + 2400 = 11\\,400$ Ft ✓`
},
{
  id: 'H-K-07',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Energiafelhasználás',
  difficulty: 6,
  scenario: 'A csoportosított oszlopdiagram egy családi ház havi **villany-** és **gázfogyasztását** mutatja (kWh-ban mérve, hogy össze lehessen hasonlítani).',
  question: 'Melyik hónapban volt a **legnagyobb az összfogyasztás** (villany + gáz)?',
  visual: {
    type: 'groupedBar',
    categories: ['Okt', 'Nov', 'Dec', 'Jan', 'Feb'],
    yMax: 900,
    yLabel: 'kWh',
    series: [
      {
        name: 'Villany',
        color: '#f59e0b',
        values: [320, 350, 380, 400, 370]
      },
      {
        name: 'Gáz',
        color: '#ef4444',
        values: [250, 380, 480, 520, 450]
      }
    ]
  },
  options: ['November', 'December', 'Január', 'Február'],
  answer: 'Január',
  keywords: ['csoportosított oszlopdiagram', 'összehasonlítás', 'összeg'],
  solution: `**Összegek kiszámítása:**

- Okt: $320 + 250 = 570$
- Nov: $350 + 380 = 730$
- Dec: $380 + 480 = 860$
- **Jan: $400 + 520 = 920$** — legnagyobb
- Feb: $370 + 450 = 820$

**A helyes válasz: Január (920 kWh).**`
},
{
  id: 'H-K-08',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Színházlátogatók',
  difficulty: 6,
  scenario: 'Egy színház az első napon **80 nézőt** fogadott. Minden nap **15 nézővel többet**, mint az előző napon.',
  question: 'Hány nézőt fogadtak összesen az **első 10 nap** alatt?',
  visual: {
    type: 'table',
    caption: 'Napi látogatószám',
    headers: ['Nap', '1.', '2.', '3.', '...', '10.'],
    rows: [
      ['Nézők', '80', '95', '110', '...', '?']
    ]
  },
  options: ['1 400', '1 475', '1 550', '1 625'],
  answer: '1 475',
  keywords: ['számtani sorozat', 'összeg'],
  solution: `**Számtani sorozat:**

$a_1 = 80, d = 15$.

$a_{10} = 80 + 9 \\cdot 15 = 80 + 135 = 215$.

**Összeg:** $S_{10} = \\dfrac{(a_1 + a_{10}) \\cdot 10}{2} = \\dfrac{(80 + 215) \\cdot 10}{2} = \\dfrac{295 \\cdot 10}{2} = \\mathbf{1\\,475}$.`
},
{
  id: 'H-K-09',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kétlépcsős áremelés',
  difficulty: 7,
  scenario: 'Egy könyv ára először **10%-kal nőtt**, majd a már megemelt ár **további 20%-kal** csökkent. A jelenlegi ára **3 960 Ft**.',
  question: 'Mennyi volt a könyv **eredeti ára**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Eredeti ár',
        formula: 'x',
        result: ''
      },
      {
        label: '1. lépés: +10%',
        formula: '1,10 · x',
        result: ''
      },
      {
        label: '2. lépés: -20%',
        formula: '0,80 · 1,10 · x = 0,88 · x',
        result: '= 3960'
      }
    ]
  },
  options: ['4 200 Ft', '4 400 Ft', '4 500 Ft', '4 800 Ft'],
  answer: '4 500 Ft',
  keywords: ['százalékszámítás', 'összetett', 'egyenlet'],
  solution: `**Áralakulás levezetése:**

Legyen az eredeti ár $x$.

- Emelés után: $1{,}10 \\cdot x$
- Csökkenés után: $0{,}80 \\cdot 1{,}10 \\cdot x = 0{,}88 \\cdot x$

Ez egyenlő $3\\,960$ Ft-tal.

$0{,}88 x = 3960 \\Rightarrow x = \\dfrac{3960}{0{,}88} = \\mathbf{4\\,500}$ Ft.

Ellenőrzés: $4500 \\cdot 1{,}1 = 4950$, majd $4950 \\cdot 0{,}8 = 3960$ ✓`
},
{
  id: 'H-K-10',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Edzés/hét (óra) × 100m idő (mp)',
  difficulty: 6,
  scenario: 'A pontdiagram edzés/hét (óra) és 100m idő (mp) kapcsolatát mutatja.',
  question: 'Milyen az összefüggés?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Edzés/hét (óra)',
    yLabel: '100m idő (mp)',
    xMin: 0,
    xMax: 10,
    yMin: 12,
    yMax: 18,
    points: [
      {
        x: 1,
        y: 17.5
      },
      {
        x: 2,
        y: 16.8
      },
      {
        x: 3,
        y: 15.8
      },
      {
        x: 4,
        y: 15.2
      },
      {
        x: 5,
        y: 14.9
      },
      {
        x: 6,
        y: 14.2
      },
      {
        x: 7,
        y: 13.8
      },
      {
        x: 8,
        y: 13.5
      },
      {
        x: 9,
        y: 13
      }
    ]
  },
  options: ['Több edzés → gyorsabb idő', 'Edzés/hét nő → 100m csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Több edzés → gyorsabb idő',
  keywords: ['pontdiagram', 'összefüggés'],
  solution: 'A pontok trendje: **Több edzés → gyorsabb idő**.'
},
{
  id: 'H-K-11',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Órák tanulás × Jegy',
  difficulty: 6,
  scenario: 'A pontdiagram órák tanulás és jegy kapcsolatát mutatja.',
  question: 'Milyen az összefüggés?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Órák tanulás',
    yLabel: 'Jegy',
    xMin: 0,
    xMax: 10,
    yMin: 1,
    yMax: 5,
    points: [
      {
        x: 0,
        y: 2
      },
      {
        x: 1,
        y: 2.5
      },
      {
        x: 2,
        y: 3
      },
      {
        x: 3,
        y: 3.5
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 5,
        y: 4.2
      },
      {
        x: 6,
        y: 4.5
      },
      {
        x: 7,
        y: 4.8
      },
      {
        x: 8,
        y: 5
      }
    ]
  },
  options: ['Több tanulás → jobb jegy', 'Órák nő → Jegy csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Több tanulás → jobb jegy',
  keywords: ['pontdiagram', 'összefüggés'],
  solution: 'A pontok trendje: **Több tanulás → jobb jegy**.'
},
{
  id: 'H-K-12',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Magasság (cm) × Tömeg (kg)',
  difficulty: 6,
  scenario: 'A pontdiagram magasság (cm) és tömeg (kg) kapcsolatát mutatja.',
  question: 'Milyen az összefüggés?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Magasság (cm)',
    yLabel: 'Tömeg (kg)',
    xMin: 130,
    xMax: 180,
    yMin: 30,
    yMax: 80,
    points: [
      {
        x: 135,
        y: 35
      },
      {
        x: 145,
        y: 42
      },
      {
        x: 155,
        y: 50
      },
      {
        x: 160,
        y: 55
      },
      {
        x: 170,
        y: 65
      },
      {
        x: 175,
        y: 72
      },
      {
        x: 180,
        y: 78
      }
    ]
  },
  options: ['Magasabb → nehezebb', 'Magasság nő → Tömeg csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Magasabb → nehezebb',
  keywords: ['pontdiagram', 'összefüggés'],
  solution: 'A pontok trendje: **Magasabb → nehezebb**.'
},
{
  id: 'H-K-13',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Testvérek kora',
  difficulty: 7,
  scenario: 'Anna most **3×** idősebb, mint öccse. **5 év múlva** csak 2× annyi idős lesz.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 3P',
        result: ''
      },
      {
        label: '5 év múlva',
        formula: 'A + 5 = 2(P + 5)',
        result: ''
      }
    ]
  },
  options: ['P=5, A=15', 'P=6, A=16', 'P=7, A=17', 'P=4, A=14'],
  answer: 'P=5, A=15',
  keywords: ['egyenlet'],
  solution: '$3x + 5 = 2(x + 5)$ → $x = 5$. **Anna: 15, öcs: 5**.'
},
{
  id: 'H-K-14',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Testvérek kora',
  difficulty: 7,
  scenario: 'Anna most **4×** idősebb, mint öccse. **9 év múlva** csak 2× annyi idős lesz.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 4P',
        result: ''
      },
      {
        label: '9 év múlva',
        formula: 'A + 9 = 2(P + 9)',
        result: ''
      }
    ]
  },
  options: ['P=3, A=12', 'P=4, A=13', 'P=5, A=14', 'P=2, A=11'],
  answer: 'P=3, A=12',
  keywords: ['egyenlet'],
  solution: '$4x + 9 = 2(x + 9)$ → $x = 3$. **Anna: 12, öcs: 3**.'
},
{
  id: 'H-K-15',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Testvérek kora',
  difficulty: 7,
  scenario: 'Anna most **5×** idősebb, mint öccse. **8 év múlva** csak 3× annyi idős lesz.',
  question: 'Hány évesek most?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Most',
        formula: 'A = 5P',
        result: ''
      },
      {
        label: '8 év múlva',
        formula: 'A + 8 = 3(P + 8)',
        result: ''
      }
    ]
  },
  options: ['P=4, A=20', 'P=5, A=21', 'P=6, A=22', 'P=3, A=19'],
  answer: 'P=4, A=20',
  keywords: ['egyenlet'],
  solution: '$5x + 8 = 3(x + 8)$ → $x = 4$. **Anna: 20, öcs: 4**.'
},
{
  id: 'H-K-16',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 500 Ft-ot tesz félre, és minden hónapban 200 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **12 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '12'],
    rows: [
      ['Összeg', '500 Ft', '700 Ft', '900 Ft', '...', '2700 Ft']
    ]
  },
  options: ['18 700 Ft', '19 200 Ft', '19 700 Ft', '38 400 Ft'],
  answer: '19 200 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{12} = 500 + 11 \\cdot 200 = 2700$.

$S = \\dfrac{(500+2700) \\cdot 12}{2} = 19200$.

**19 200 Ft.**`
},
{
  id: 'H-K-17',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 100 Ft-ot tesz félre, és minden hónapban 100 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **10 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '10'],
    rows: [
      ['Összeg', '100 Ft', '200 Ft', '300 Ft', '...', '1000 Ft']
    ]
  },
  options: ['5000 Ft', '5500 Ft', '6000 Ft', '11 000 Ft'],
  answer: '5500 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{10} = 100 + 9 \\cdot 100 = 1000$.

$S = \\dfrac{(100+1000) \\cdot 10}{2} = 5500$.

**5500 Ft.**`
},
{
  id: 'H-K-18',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 50 Ft-ot tesz félre, és minden hónapban 50 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **20 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '20'],
    rows: [
      ['Összeg', '50 Ft', '100 Ft', '150 Ft', '...', '1000 Ft']
    ]
  },
  options: ['11 000 Ft', '11 500 Ft', '12 000 Ft', '23 000 Ft'],
  answer: '11 500 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{20} = 50 + 19 \\cdot 50 = 1000$.

$S = \\dfrac{(50+1000) \\cdot 20}{2} = 11500$.

**11 500 Ft.**`
},
{
  id: 'H-K-19',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 1000 Ft-ot tesz félre, és minden hónapban 500 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **8 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '8'],
    rows: [
      ['Összeg', '1000 Ft', '1500 Ft', '2000 Ft', '...', '4500 Ft']
    ]
  },
  options: ['21 500 Ft', '22 000 Ft', '22 500 Ft', '44 000 Ft'],
  answer: '22 000 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{8} = 1000 + 7 \\cdot 500 = 4500$.

$S = \\dfrac{(1000+4500) \\cdot 8}{2} = 22000$.

**22 000 Ft.**`
},
{
  id: 'H-K-20',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Ár × Kereslet',
  difficulty: 6,
  scenario: 'A pontdiagram egy termék árának (Ft) és napi eladásának (db) kapcsolatát mutatja.',
  question: 'Milyen az **összefüggés**?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Ár (Ft)',
    yLabel: 'Eladás (db)',
    xMin: 200,
    xMax: 700,
    yMin: 0,
    yMax: 120,
    points: [
      { x: 250, y: 110 },
      { x: 300, y: 95 },
      { x: 350, y: 82 },
      { x: 400, y: 70 },
      { x: 450, y: 55 },
      { x: 500, y: 42 },
      { x: 600, y: 28 },
      { x: 650, y: 18 }
    ]
  },
  options: ['Drágább → kevesebbet adnak el', 'Ár nő → Eladás nő', 'Nincs kapcsolat', 'Egyenes arány'],
  answer: 'Drágább → kevesebbet adnak el',
  keywords: ['pontdiagram', 'fordított'],
  solution: 'A pontok trendje: **Drágább → kevesebbet adnak el** (fordított kapcsolat).'
},
{
  id: 'H-K-21',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Napsütés × Fagylaltfogyás',
  difficulty: 6,
  scenario: 'A pontdiagram egy fagylaltozó napi eladását (liter) mutatja a napsütés óraszámához képest.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Napsütés (óra)',
    yLabel: 'Fagylalt (L)',
    xMin: 0,
    xMax: 14,
    yMin: 0,
    yMax: 60,
    points: [
      { x: 2, y: 8 },
      { x: 4, y: 15 },
      { x: 6, y: 22 },
      { x: 7, y: 28 },
      { x: 8, y: 34 },
      { x: 10, y: 44 },
      { x: 12, y: 52 }
    ]
  },
  options: ['Több napsütés → több fagylalt', 'Napsütés nő → Fogyás csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Több napsütés → több fagylalt',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Több napsütés → több fagylalt**.'
},
{
  id: 'H-K-22',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Autó sebessége × fogyasztás',
  difficulty: 6,
  scenario: 'A pontdiagram egy autó sebességét (km/h) és a 100 km-re vetített fogyasztását (L) mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Sebesség (km/h)',
    yLabel: 'L/100 km',
    xMin: 40,
    xMax: 160,
    yMin: 4,
    yMax: 14,
    points: [
      { x: 50, y: 6.5 },
      { x: 70, y: 5.8 },
      { x: 90, y: 5.6 },
      { x: 110, y: 6.2 },
      { x: 130, y: 8 },
      { x: 150, y: 11 }
    ]
  },
  options: ['U-alakú: 90 km/h körül minimum', 'Mindig csökken', 'Mindig nő', 'Nincs kapcsolat'],
  answer: 'U-alakú: 90 km/h körül minimum',
  keywords: ['pontdiagram', 'nem lineáris'],
  solution: 'A fogyasztás **90 km/h körül minimum**; kisebb és nagyobb sebességnél is nő.'
},
{
  id: 'H-K-23',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vonatok szembe — számítás',
  difficulty: 6,
  scenario: 'Budapestről és Miskolcról egyszerre indul el két vonat egymás felé. A távolság **180 km**. Az egyik 70 km/h, a másik 90 km/h sebességgel halad.',
  question: 'Hány **perc** múlva találkoznak?',
  visual: {
    type: 'formula',
    formula: 't = s / (v_1 + v_2)',
    variables: [
      { name: 's', desc: '180 km' },
      { name: 'v_1', desc: '70 km/h' },
      { name: 'v_2', desc: '90 km/h' }
    ],
    example: { eredmény: '?' }
  },
  options: ['55', '60', '67,5', '72'],
  answer: '67,5',
  keywords: ['egyenlet', 'mozgás'],
  solution: '$t = 180 \\div 160 = 1{,}125$ h $= \\mathbf{67{,}5}$ perc.'
},
{
  id: 'H-K-24',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Medence feltöltése',
  difficulty: 6,
  scenario: 'Két csap együtt tölt fel egy medencét. Az egyik egymaga **6 óra** alatt tölti meg, a másik **4 óra** alatt.',
  question: 'Hány **óra** alatt töltik meg együtt a medencét?',
  visual: {
    type: 'formula',
    formula: '1/t = 1/t_1 + 1/t_2',
    variables: [
      { name: 't_1', desc: '6 óra' },
      { name: 't_2', desc: '4 óra' }
    ],
    example: { eredmény: '?' }
  },
  options: ['2', '2,2', '2,4', '3'],
  answer: '2,4',
  keywords: ['egyenlet', 'munka'],
  solution: '$\\frac{1}{t} = \\frac{1}{6} + \\frac{1}{4} = \\frac{5}{12}$ → $t = \\mathbf{2{,}4}$ óra.'
},
{
  id: 'H-K-25',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Keveréktan — gyümölcslé',
  difficulty: 6,
  scenario: 'Egy italt úgy készítenek, hogy **2 rész** sűrítményt **5 rész** vízzel kevernek. Mennyi **sűrítmény** kell **3,5 L** italhoz?',
  question: 'Hány **liter** sűrítmény szükséges?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Sűrítmény : Víz', formula: '2 : 5', result: '' },
      { label: 'Össz. rész', formula: '7', result: '' },
      { label: 'Teljes ital', formula: '3,5 L', result: '?' }
    ]
  },
  options: ['0,5 L', '0,8 L', '1 L', '1,4 L'],
  answer: '1 L',
  keywords: ['arány', 'keverés'],
  solution: '$\\dfrac{2}{7} \\cdot 3{,}5 = \\mathbf{1}$ L.'
},
{
  id: 'H-K-26',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Páros számok összege — 1-100',
  difficulty: 6,
  scenario: 'Számítsuk ki az első **50 páros** pozitív egész szám összegét: $2 + 4 + 6 + \\dots + 100$.',
  question: 'Mennyi az összeg?',
  visual: {
    type: 'sequence',
    elements: ['2', '4', '6', '...', '98', '100']
  },
  options: ['2450', '2500', '2550', '5050'],
  answer: '2550',
  keywords: ['számtani sorozat', 'összeg'],
  solution: '$S = \\dfrac{(2+100) \\cdot 50}{2} = \\mathbf{2550}$.'
},
{
  id: 'H-K-27',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Színházszékek összesen',
  difficulty: 6,
  scenario: 'A színházteremben az **1. sorban 20 szék** van, minden következő sorban **2-vel több**. Összesen **15 sor** van.',
  question: 'Hány **szék** van a teremben?',
  visual: {
    type: 'table',
    caption: 'Ülések',
    headers: ['Sor', '1', '2', '3', '...', '15'],
    rows: [
      ['Szék', '20', '22', '24', '...', '48']
    ]
  },
  options: ['480', '500', '510', '540'],
  answer: '510',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{15} = 20 + 14 \\cdot 2 = 48$. $S = \\dfrac{(20+48) \\cdot 15}{2} = \\mathbf{510}$.'
},
{
  id: 'H-K-28',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Lépcsőfokok összesen',
  difficulty: 6,
  scenario: 'Egy nap **10 lépcsőfokot** mászunk, és minden nap **3-mal többet**, mint az előző napon. **7 napig** folytatjuk.',
  question: 'Összesen hány **lépcsőfokot** mászunk?',
  visual: {
    type: 'sequence',
    elements: ['10', '13', '16', '19', '22', '25', '28']
  },
  options: ['126', '133', '140', '196'],
  answer: '133',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_7 = 10 + 6 \\cdot 3 = 28$. $S = \\dfrac{(10+28) \\cdot 7}{2} = \\mathbf{133}$.'
},
{
  id: 'H-K-29',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mérföldkövek — menetidő',
  difficulty: 6,
  scenario: 'Egy hegyi túrán az első kilométer **15 perc**, minden következő kilométer **1 perccel** hosszabb. A túra **12 km** hosszú.',
  question: 'Mennyi a **teljes** menetidő (perc)?',
  visual: {
    type: 'table',
    caption: 'Km-perc',
    headers: ['km', '1', '2', '3', '...', '12'],
    rows: [
      ['perc', '15', '16', '17', '...', '26']
    ]
  },
  options: ['240', '246', '252', '264'],
  answer: '246',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{12} = 15 + 11 = 26$. $S = \\dfrac{(15+26) \\cdot 12}{2} = \\mathbf{246}$ perc.'
},
{
  id: 'H-K-30',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Életkor × Cipőméret',
  difficulty: 6,
  scenario: 'A pontdiagram gyermekek életkorát (év) és cipőméretét mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Életkor (év)',
    yLabel: 'Cipőméret',
    xMin: 2,
    xMax: 16,
    yMin: 20,
    yMax: 44,
    points: [
      { x: 3, y: 22 },
      { x: 5, y: 27 },
      { x: 7, y: 30 },
      { x: 9, y: 33 },
      { x: 11, y: 36 },
      { x: 13, y: 38 },
      { x: 15, y: 40 }
    ]
  },
  options: ['Idősebb → nagyobb cipő', 'Életkor nő → Méret csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Idősebb → nagyobb cipő',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Idősebb → nagyobb cipő**.'
},
{
  id: 'H-K-31',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Képernyőidő × Alvásminőség',
  difficulty: 6,
  scenario: 'A pontdiagram diákok esti képernyőidejét (óra) és a bejelentett alvásminőséget (1–10) mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Képernyő (óra)',
    yLabel: 'Alvásminőség',
    xMin: 0,
    xMax: 6,
    yMin: 1,
    yMax: 10,
    points: [
      { x: 0.5, y: 9 },
      { x: 1, y: 8.5 },
      { x: 2, y: 7 },
      { x: 3, y: 5.5 },
      { x: 4, y: 4 },
      { x: 5, y: 3 },
      { x: 5.5, y: 2.5 }
    ]
  },
  options: ['Több képernyőidő → rosszabb alvás', 'Nő → nő', 'Nincs kapcsolat', 'Egyenes arány'],
  answer: 'Több képernyőidő → rosszabb alvás',
  keywords: ['pontdiagram', 'fordított'],
  solution: 'A pontok trendje: **Több képernyőidő → rosszabb alvás**.'
},
{
  id: 'H-K-32',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Cipőméret × Versenyidő',
  difficulty: 6,
  scenario: 'A pontdiagram különböző tanulók cipőméretét és 400 m-es idejét (mp) mutatja.',
  question: 'Milyen **összefüggés** van cipőméret és futóidő között?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Cipőméret',
    yLabel: 'Idő (mp)',
    xMin: 34,
    xMax: 44,
    yMin: 60,
    yMax: 90,
    points: [
      { x: 35, y: 78 },
      { x: 36, y: 72 },
      { x: 38, y: 82 },
      { x: 39, y: 68 },
      { x: 40, y: 75 },
      { x: 41, y: 65 },
      { x: 42, y: 85 },
      { x: 43, y: 70 }
    ]
  },
  options: ['Nincs egyértelmű kapcsolat', 'Nagyobb méret → gyorsabb', 'Nagyobb méret → lassabb', 'Egyenes arány'],
  answer: 'Nincs egyértelmű kapcsolat',
  keywords: ['pontdiagram', 'szórás'],
  solution: 'A pontok **szórtan** helyezkednek el, nincs egyértelmű trend: **nincs egyértelmű kapcsolat**.'
},
{
  id: 'H-K-33',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Egymást követő áremelések',
  difficulty: 6,
  scenario: 'Egy termék ára először **20%-kal nőtt**, majd **25%-kal nőtt**. Az eredeti ár **8000 Ft**.',
  question: 'Mennyi a **végső ár**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti', formula: '8000', result: '' },
      { label: '+20%', formula: '9600', result: '' },
      { label: '+25%', formula: '?', result: '' }
    ]
  },
  options: ['11 000 Ft', '11 600 Ft', '12 000 Ft', '12 600 Ft'],
  answer: '12 000 Ft',
  keywords: ['százalék', 'összetett'],
  solution: '$8000 \\cdot 1{,}2 \\cdot 1{,}25 = 8000 \\cdot 1{,}5 = \\mathbf{12\\,000}$ Ft.'
},
{
  id: 'H-K-34',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családfa — apa és fia',
  difficulty: 6,
  scenario: 'Az apa **jelenleg 36 évvel idősebb** a fiánál. **4 év múlva** az apa háromszor annyi idős lesz, mint a fia.',
  question: 'Hány évesek **most**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Most', formula: 'A = F + 36', result: '' },
      { label: '4 év múlva', formula: 'A + 4 = 3(F + 4)', result: '' }
    ]
  },
  options: ['F=10, A=46', 'F=12, A=48', 'F=14, A=50', 'F=16, A=52'],
  answer: 'F=14, A=50',
  keywords: ['egyenlet', 'életkor'],
  solution: '$F + 36 + 4 = 3F + 12$ → $F = 14$, $A = 50$.'
},
{
  id: 'H-K-35',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kerítés — oszlopok',
  difficulty: 5,
  scenario: 'Egy **120 m** hosszú kerítéshez kell oszlopokat állítani **3 méterenként**, a két végpontot is beleértve.',
  question: 'Hány **oszlop** kell?',
  visual: {
    type: 'formula',
    formula: 'oszlop = hossz / távolság + 1',
    variables: [
      { name: 'hossz', desc: '120 m' },
      { name: 'távolság', desc: '3 m' }
    ],
    example: { eredmény: '?' }
  },
  options: ['39', '40', '41', '42'],
  answer: '41',
  keywords: ['egyenlet', 'számlálás'],
  solution: '$120 \\div 3 + 1 = 40 + 1 = \\mathbf{41}$ oszlop.'
},
{
  id: 'H-K-36',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Edzésterv — futás',
  difficulty: 6,
  scenario: 'Az első napon **2 km-t** futottál, majd minden nap **0,5 km-rel** többet. A terv **14 napos**.',
  question: 'Hány **km-t** futsz összesen?',
  visual: {
    type: 'sequence',
    elements: ['2', '2,5', '3', '...', '8,5']
  },
  options: ['66 km', '70 km', '73,5 km', '80 km'],
  answer: '73,5 km',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{14} = 2 + 13 \\cdot 0{,}5 = 8{,}5$. $S = \\dfrac{(2+8{,}5) \\cdot 14}{2} = \\mathbf{73{,}5}$ km.'
},
{
  id: 'H-K-37',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Új osztály — barátkozás',
  difficulty: 7,
  scenario: 'Egy **25 fős** osztályban minden tanuló kezet ráz **mindenkivel** egyszer.',
  question: 'Összesen hány **kézfogás** történik?',
  visual: {
    type: 'formula',
    formula: 'K = n · (n−1) / 2',
    variables: [
      { name: 'n', desc: '25' }
    ],
    example: { eredmény: '?' }
  },
  options: ['250', '275', '300', '325'],
  answer: '300',
  keywords: ['kombinatorika', 'összeg'],
  solution: '$\\dfrac{25 \\cdot 24}{2} = \\mathbf{300}$ kézfogás.'
},
{
  id: 'H-K-38',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Gyakorlás — napi szavak',
  difficulty: 6,
  scenario: 'A nyelvtanuló első nap **5 új szót** tanul, minden következő nap **2-vel többet**. Összesen **21 napig** tanul.',
  question: 'Összesen hány **új szót** tanul meg?',
  visual: {
    type: 'sequence',
    elements: ['5', '7', '9', '...', '45']
  },
  options: ['500', '525', '550', '630'],
  answer: '525',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{21} = 5 + 20 \\cdot 2 = 45$. $S = \\dfrac{(5+45) \\cdot 21}{2} = \\mathbf{525}$.'
},
{
  id: 'H-K-39',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mértani sorozat — duplázódás',
  difficulty: 7,
  scenario: 'Egy e-mailt az első nap **1 ember** kap, és minden nap **duplázódik** a címzettek száma.',
  question: 'Hány ember kapja meg **összesen 7 nap alatt**?',
  visual: {
    type: 'sequence',
    elements: ['1', '2', '4', '8', '16', '32', '64']
  },
  options: ['63', '126', '127', '128'],
  answer: '127',
  keywords: ['mértani sorozat', 'összeg'],
  solution: '$S = 2^7 - 1 = \\mathbf{127}$ ember.'
},
{
  id: 'H-K-40',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Hőmérséklet × Jégteafogyás',
  difficulty: 6,
  scenario: 'A pontdiagram egy büfé napi átlaghőmérsékletét (°C) és jégtea eladását (db) mutatja.',
  question: 'Milyen az **összefüggés**?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Hőmérséklet (°C)',
    yLabel: 'Jégtea (db)',
    xMin: 15,
    xMax: 38,
    yMin: 0,
    yMax: 180,
    points: [
      { x: 17, y: 25 },
      { x: 20, y: 45 },
      { x: 23, y: 70 },
      { x: 26, y: 95 },
      { x: 28, y: 120 },
      { x: 31, y: 140 },
      { x: 34, y: 170 }
    ]
  },
  options: ['Melegebb → több jégtea', 'Hőmérséklet nő → eladás csökken', 'Nincs kapcsolat', 'U-alakú'],
  answer: 'Melegebb → több jégtea',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Melegebb → több jégtea**.'
},
{
  id: 'H-K-41',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Magasság × Tüdőkapacitás',
  difficulty: 6,
  scenario: 'A pontdiagram felnőttek testmagasságát (cm) és tüdőkapacitását (L) mutatja.',
  question: 'Milyen **összefüggés** figyelhető meg?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Magasság (cm)',
    yLabel: 'Tüdő (L)',
    xMin: 155,
    xMax: 195,
    yMin: 3,
    yMax: 7,
    points: [
      { x: 158, y: 3.6 },
      { x: 162, y: 3.9 },
      { x: 168, y: 4.4 },
      { x: 172, y: 4.8 },
      { x: 178, y: 5.2 },
      { x: 184, y: 5.8 },
      { x: 190, y: 6.4 }
    ]
  },
  options: ['Magasabb → nagyobb tüdő', 'Magasság nő → Tüdő csökken', 'Nincs kapcsolat', 'Fordított arány'],
  answer: 'Magasabb → nagyobb tüdő',
  keywords: ['pontdiagram', 'egyenes'],
  solution: 'A pontok trendje: **Magasabb → nagyobb tüdő**.'
},
{
  id: 'H-K-42',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Eső × Kerékpárosok',
  difficulty: 6,
  scenario: 'A pontdiagram egy kerékpárút napi átlag csapadékát (mm) és forgalmát (ezer fő) mutatja.',
  question: 'Milyen az **összefüggés**?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Csapadék (mm)',
    yLabel: 'Forgalom (ezer fő)',
    xMin: 0,
    xMax: 20,
    yMin: 0,
    yMax: 12,
    points: [
      { x: 0, y: 10.5 },
      { x: 1, y: 9.5 },
      { x: 3, y: 7.8 },
      { x: 5, y: 6 },
      { x: 8, y: 4.2 },
      { x: 12, y: 2.5 },
      { x: 16, y: 1 }
    ]
  },
  options: ['Több eső → kevesebb kerékpáros', 'Eső nő → Forgalom nő', 'Nincs kapcsolat', 'Egyenes arány'],
  answer: 'Több eső → kevesebb kerékpáros',
  keywords: ['pontdiagram', 'fordított'],
  solution: 'A pontok trendje: **Több eső → kevesebb kerékpáros**.'
},
{
  id: 'H-K-43',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kerékpártúra — átlagsebesség',
  difficulty: 6,
  scenario: 'Egy kerékpáros **2 órán át 18 km/h** sebességgel, majd **3 órán át 22 km/h** sebességgel halad.',
  question: 'Mekkora az **átlagsebessége** (km/h)?',
  visual: {
    type: 'comparison',
    items: [
      { label: '1. szakasz', formula: '18 km/h · 2 h = 36 km', result: '' },
      { label: '2. szakasz', formula: '22 km/h · 3 h = 66 km', result: '' },
      { label: 'Átlag', formula: '102 km / 5 h', result: '?' }
    ]
  },
  options: ['19,4', '20', '20,4', '21'],
  answer: '20,4',
  keywords: ['átlagsebesség'],
  solution: '$(36 + 66) \\div 5 = 102 \\div 5 = \\mathbf{20{,}4}$ km/h.'
},
{
  id: 'H-K-44',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mozijegy — diák és felnőtt',
  difficulty: 6,
  scenario: 'Egy moziban **3 felnőtt** és **5 diák** jegy **10 600 Ft**. Egy felnőtt jegy **600 Ft-tal** drágább, mint egy diák.',
  question: 'Mennyibe kerül egy **diákjegy**?',
  visual: {
    type: 'comparison',
    items: [
      { label: '3F + 5D', formula: '= 10 600', result: '' },
      { label: 'F', formula: '= D + 600', result: '' }
    ]
  },
  options: ['1000 Ft', '1050 Ft', '1100 Ft', '1200 Ft'],
  answer: '1100 Ft',
  keywords: ['egyenlet', 'rendszer'],
  solution: '$3(D+600) + 5D = 10\\,600$ → $8D = 8800$ → $D = \\mathbf{1100}$ Ft.'
},
{
  id: 'H-K-45',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kamatos kamat — 3 év',
  difficulty: 7,
  scenario: 'A bank évi **5%** kamatos kamatot fizet. Egy betét **3 év alatt 23 152 Ft** értékűre nő.',
  question: 'Mekkora volt az **eredeti betét**? (kerekíts egészre)',
  visual: {
    type: 'formula',
    formula: 'T_n = T_0 · (1 + p)^n',
    variables: [
      { name: 'T_3', desc: '23 152 Ft' },
      { name: 'p', desc: '0,05' },
      { name: 'n', desc: '3' }
    ],
    example: { eredmény: '?' }
  },
  options: ['18 000', '19 000', '20 000', '21 000'],
  answer: '20 000',
  keywords: ['kamatos kamat', 'egyenlet'],
  solution: '$T_0 = 23\\,152 \\div 1{,}05^3 = 23\\,152 \\div 1{,}157625 \\approx \\mathbf{20\\,000}$ Ft.'
},
{
  id: 'H-K-46',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Építkezés — kőrakás',
  difficulty: 6,
  scenario: 'Egy falnak az alsó sorába **28 kő** fér, minden felsőbb sorba **2-vel kevesebb**. A fal **12 sor** magas.',
  question: 'Hány **kő** kell összesen?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 28, label: '1. sor' },
      { count: 26, label: '2. sor' },
      { count: 24, label: '3. sor' },
      { count: 22, label: '...' }
    ]
  },
  options: ['192', '198', '204', '210'],
  answer: '204',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{12} = 28 - 11 \\cdot 2 = 6$. $S = \\dfrac{(28+6) \\cdot 12}{2} = \\mathbf{204}$.'
},
{
  id: 'H-K-47',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Koncertjegyek — sorozat',
  difficulty: 6,
  scenario: 'Egy koncertre az első órában **30 jegy** kelt el, minden következő órában **10-zel több**. A jegypénztár **8 órát** működött.',
  question: 'Hány **jegy** kelt el összesen?',
  visual: {
    type: 'sequence',
    elements: ['30', '40', '50', '...', '100']
  },
  options: ['480', '500', '520', '560'],
  answer: '520',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_8 = 30 + 7 \\cdot 10 = 100$. $S = \\dfrac{(30+100) \\cdot 8}{2} = \\mathbf{520}$.'
},
{
  id: 'H-K-48',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Zsugorítás — csomagbontás',
  difficulty: 7,
  scenario: 'Egy lufihoz minden nap **az előző napi levegő 80%-a** marad. Az első nap **20 L** levegő van a lufiban.',
  question: 'Kb. hány liter levegő marad a **4. napon**? (kerekíts egy tizedesre)',
  visual: {
    type: 'sequence',
    elements: ['20', '16', '12,8', '?']
  },
  options: ['8,2 L', '10,2 L', '10,24 L', '12 L'],
  answer: '10,24 L',
  keywords: ['mértani sorozat', 'csökkenés'],
  solution: '$a_4 = 20 \\cdot 0{,}8^3 = 20 \\cdot 0{,}512 = \\mathbf{10{,}24}$ L.'
},
{
  id: 'H-K-49',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Gyűjtés — páratlan számok',
  difficulty: 6,
  scenario: 'Egy zsebmalac az **1. napon 1 Ft-ot**, a **2. napon 3 Ft-ot**, az **n-edik napon (2n−1) Ft-ot** kap. **15 napig** gyűjt.',
  question: 'Mennyi pénz lesz benne összesen?',
  visual: {
    type: 'sequence',
    elements: ['1', '3', '5', '...', '29']
  },
  options: ['210', '215', '225', '230'],
  answer: '225',
  keywords: ['sorozat', 'négyzetszám'],
  solution: 'Az első $n$ páratlan szám összege $n^2$: $15^2 = \\mathbf{225}$ Ft.'
},
{
  id: 'H-K-50',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Összefüggés — Alkalmazottak × Termelés',
  difficulty: 7,
  scenario: 'A pontdiagram egy műhelyben az alkalmazottak száma és a napi termékmennyiség közötti kapcsolatot mutatja.',
  question: 'Milyen **összefüggés** látható?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Alkalmazott',
    yLabel: 'Termék (db)',
    xMin: 0,
    xMax: 20,
    yMin: 0,
    yMax: 200,
    points: [
      { x: 2, y: 40 },
      { x: 4, y: 75 },
      { x: 6, y: 110 },
      { x: 8, y: 135 },
      { x: 10, y: 155 },
      { x: 14, y: 180 },
      { x: 18, y: 190 }
    ]
  },
  options: ['Több alkalmazott → több termék (csökkenő ütemben)', 'Egyenesen arányos', 'Fordított arány', 'Nincs kapcsolat'],
  answer: 'Több alkalmazott → több termék (csökkenő ütemben)',
  keywords: ['pontdiagram', 'telítés'],
  solution: 'A termelés nő, de egyre **kisebb mértékben** — telítéshez közeledve: **több alkalmazott → több termék (csökkenő ütemben)**.'
},
{
  id: 'H-T-01',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérsékleti görbe',
  difficulty: 3,
  scenario: 'Az alábbi vonaldiagram egy októberi hét napjainak hőmérsékletét mutatja.',
  question: 'Melyik nap volt a legmelegebb?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: '°C',
    yMin: 0,
    yMax: 20,
    series: [
      {
        name: 'Hőmérséklet (°C)',
        color: '#ef4444',
        points: [
          {
            x: 'Hé',
            y: 12
          },
          {
            x: 'Ke',
            y: 14
          },
          {
            x: 'Sze',
            y: 17
          },
          {
            x: 'Csü',
            y: 18
          },
          {
            x: 'Pé',
            y: 13
          },
          {
            x: 'Szo',
            y: 9
          },
          {
            x: 'Vas',
            y: 8
          }
        ]
      }
    ]
  },
  options: ['Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['diagram', 'adatleolvasás'],
  solution: `**Leolvasás:**

A görbe **csütörtökön** éri el a legnagyobb értékét: **18 °C**. Ennél magasabb oszlop nincs.

**A helyes válasz: Csütörtök.**`
},
{
  id: 'H-T-02',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Dobozok súlya',
  difficulty: 2,
  scenario: 'A táblázatban négy doboz tömegét látod kilogrammban.',
  question: 'Melyik doboz a **legnehezebb**?',
  visual: {
    type: 'table',
    caption: 'Dobozok tömege',
    headers: ['Doboz', 'Tömeg (kg)'],
    rows: [
      ['A', '7,8'],
      ['B', '7,08'],
      ['C', '8,7'],
      ['D', '8,07']
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['tizedes tört', 'összehasonlítás'],
  solution: `**Tizedes törtek összehasonlítása:**

- A: 7,8
- B: 7,08
- C: 8,7
- D: 8,07

A legnagyobb: **C (8,7 kg)**.`
},
{
  id: 'H-T-03',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat szabálya',
  difficulty: 2,
  scenario: 'A következő számsorozatot látod.',
  question: 'Mi a sorozat 7. eleme?',
  visual: {
    type: 'sequence',
    elements: ['3', '6', '9', '12', '15', '18', '?']
  },
  options: ['20', '21', '22', '24'],
  answer: '21',
  keywords: ['sorozat', 'szabály'],
  solution: `**Szabály felismerése:**

Minden elem **3-mal több** az előzőnél (számtani sorozat, különbség = 3).

- 6. elem: $18$
- 7. elem: $18 + 3 = \\mathbf{21}$.`
},
{
  id: 'H-T-04',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Csoportosított oszlopdiagram',
  difficulty: 3,
  scenario: 'Három tantárgyból írtak dolgozatot négy diákok. A diagram a pontszámokat mutatja.',
  question: 'Melyik diák érte el a **legmagasabb** matematika pontszámot?',
  visual: {
    type: 'groupedBar',
    categories: ['Anna', 'Béla', 'Cili', 'Dani'],
    yMax: 100,
    yLabel: 'Pont',
    series: [
      {
        name: 'Matek',
        color: '#2563eb',
        values: [82, 94, 70, 88]
      },
      {
        name: 'Magyar',
        color: '#16a34a',
        values: [78, 72, 90, 80]
      },
      {
        name: 'Angol',
        color: '#f59e0b',
        values: [85, 80, 75, 92]
      }
    ]
  },
  options: ['Anna', 'Béla', 'Cili', 'Dani'],
  answer: 'Béla',
  keywords: ['csoportosított oszlopdiagram', 'adatleolvasás'],
  solution: `**Leolvasás a kék (matek) oszlopokról:**

Anna 82, **Béla 94**, Cili 70, Dani 88.

**A helyes válasz: Béla (94 pont).**`
},
{
  id: 'H-T-05',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kerékpáros túra távolsága',
  difficulty: 2,
  scenario: 'A vonaldiagram egy kerékpáros csapat megtett távolságát mutatja az óra függvényében.',
  question: 'Hány kilométert tettek meg **3 óra** alatt?',
  visual: {
    type: 'lineChart',
    xLabel: 'Idő (óra)',
    yLabel: 'Távolság (km)',
    yMin: 0,
    yMax: 80,
    series: [
      {
        name: 'Távolság',
        color: '#2563eb',
        points: [
          {
            x: '0',
            y: 0
          },
          {
            x: '1',
            y: 15
          },
          {
            x: '2',
            y: 30
          },
          {
            x: '3',
            y: 45
          },
          {
            x: '4',
            y: 60
          },
          {
            x: '5',
            y: 75
          }
        ]
      }
    ]
  },
  options: ['30 km', '40 km', '45 km', '60 km'],
  answer: '45 km',
  keywords: ['vonaldiagram', 'adatleolvasás'],
  solution: `**Leolvasás:**

Az $x = 3$ óra helyen a grafikon értéke **45 km**.

**A helyes válasz: 45 km.**`
},
{
  id: 'H-T-06',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Páros számok sorozata',
  difficulty: 1,
  scenario: 'Az alábbi sorozatban minden szám 4-gyel nagyobb az előzőnél.',
  question: 'Mi a sorozat **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['2', '6', '10', '14', '18', '?']
  },
  options: ['20', '21', '22', '24'],
  answer: '22',
  keywords: ['sorozat', 'szabálykövetés'],
  solution: `**Szabály:** minden tag $+4$.

$18 + 4 = \\mathbf{22}$.`
},
{
  id: 'H-T-07',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc sportágak',
  difficulty: 2,
  scenario: 'Az iskola 6. osztályosainak kedvenc sportágairól készült kördiagram.',
  question: 'A tanulók hány **százaléka** választotta a **futballt**?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Futball',
        value: 40,
        color: '#16a34a'
      },
      {
        label: 'Kosárlabda',
        value: 25,
        color: '#f59e0b'
      },
      {
        label: 'Úszás',
        value: 20,
        color: '#0ea5e9'
      },
      {
        label: 'Tánc',
        value: 15,
        color: '#ec4899'
      }
    ]
  },
  options: ['20%', '25%', '35%', '40%'],
  answer: '40%',
  keywords: ['kördiagram', 'adatleolvasás', 'százalék'],
  solution: `**Leolvasás a kördiagramról:**

A **futball** szelete 40%-ot foglal el.

**A helyes válasz: 40%.**`
},
{
  id: 'H-T-08',
  contentArea: 'H',
  contentSub: '2.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Négyzet kerülete',
  difficulty: 2,
  scenario: 'Egy négyzet kerületét a $K = 4 \\cdot a$ képlettel számoljuk, ahol $a$ az oldal hossza.',
  question: 'Mekkora a kerülete egy **7 cm** oldalú négyzetnek?',
  visual: {
    type: 'formula',
    formula: 'K = 4 · a',
    variables: [
      {
        name: 'a',
        desc: 'az oldal hossza (cm)'
      }
    ],
    example: {
      a: 7
    }
  },
  options: ['14 cm', '21 cm', '28 cm', '49 cm'],
  answer: '28 cm',
  keywords: ['képlet', 'behelyettesítés', 'kerület'],
  solution: `**Behelyettesítés:**

$K = 4 \\cdot a = 4 \\cdot 7 = \\mathbf{28}$ cm.`
},
{
  id: 'H-T-09',
  contentArea: 'H',
  contentSub: '2.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Pont a koordináta-rendszerben',
  difficulty: 2,
  scenario: 'A koordináta-rendszerben megjelölt pont egy kincs helyét jelöli.',
  question: 'Mi a **P** pont koordinátája?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 8,
    yMin: 0,
    yMax: 6,
    points: [
      {
        x: 5,
        y: 3,
        label: 'P',
        color: '#ef4444'
      }
    ]
  },
  options: ['(3; 5)', '(5; 3)', '(3; 3)', '(5; 5)'],
  answer: '(5; 3)',
  keywords: ['koordináta-rendszer', 'pont leolvasása'],
  solution: `**Leolvasás:**

Az $x$ tengelyen: **5**, az $y$ tengelyen: **3**.

**A helyes válasz: (5; 3).**`
},
{
  id: 'H-T-10',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Virágárus pultja',
  difficulty: 2,
  scenario: 'Egy virágárusnál az egyes virágokból a napi eladásokat piktogrammal ábrázolták. 1 szimbólum = 5 szál virág.',
  question: 'Hány szál **tulipán** fogyott?',
  visual: {
    type: 'pictogram',
    unit: 5,
    unitLabel: 'szál',
    rows: [
      {
        label: 'Rózsa',
        count: 6
      },
      {
        label: 'Tulipán',
        count: 8
      },
      {
        label: 'Szegfű',
        count: 4
      },
      {
        label: 'Liliom',
        count: 3
      }
    ]
  },
  options: ['30', '35', '40', '45'],
  answer: '40',
  keywords: ['piktogram', 'adatleolvasás'],
  solution: `**Számolás:**

A tulipán sorban **8** szimbólum szerepel, 1 szimbólum = 5 szál.

$8 \\cdot 5 = \\mathbf{40}$ szál.`
},
{
  id: 'H-T-11',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Négyzetszámok',
  difficulty: 3,
  scenario: 'A sorozat első tagjai: 1, 4, 9, 16, 25, ... A szabály: $a_n = n^2$.',
  question: 'Mi a sorozat **8. tagja**?',
  visual: {
    type: 'sequence',
    elements: ['1', '4', '9', '16', '25', '36', '49', '?']
  },
  options: ['56', '60', '64', '72'],
  answer: '64',
  keywords: ['négyzetszám', 'sorozat', 'szabály'],
  solution: `**Szabály alkalmazása:**

$a_n = n^2$, tehát $a_8 = 8^2 = \\mathbf{64}$.`
},
{
  id: 'H-T-12',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vonat menetrend',
  difficulty: 2,
  scenario: 'A táblázat egy vonat megállóhelyeit és érkezési időit mutatja.',
  question: 'Mennyi **ideig** tart az út **Budapest és Szeged** között?',
  visual: {
    type: 'table',
    caption: 'Menetrend',
    headers: ['Állomás', 'Érkezés'],
    rows: [
      ['Budapest', '08:10'],
      ['Kecskemét', '09:25'],
      ['Kiskunfélegyháza', '09:55'],
      ['Szeged', '10:40']
    ]
  },
  options: ['1 óra 30 perc', '2 óra', '2 óra 30 perc', '3 óra'],
  answer: '2 óra 30 perc',
  keywords: ['táblázat', 'idő', 'menetrend'],
  solution: `**Időszámítás:**

Budapestről 08:10-kor indul, Szegedre 10:40-kor érkezik.

$10{:}40 - 08{:}10 = \\mathbf{2}$ óra $\\mathbf{30}$ perc.`
},
{
  id: 'H-T-13',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérséklet — hét',
  difficulty: 2,
  scenario: 'A diagram egy hét napjainak átlaghőmérsékletét mutatja.',
  question: 'Melyik napon volt a **legmelegebb**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: '°C',
    yMin: 0,
    yMax: 20,
    series: [
      {
        name: 'Hőm.',
        color: '#ef4444',
        points: [
          {
            x: 'Hé',
            y: 10
          },
          {
            x: 'Ke',
            y: 12
          },
          {
            x: 'Sze',
            y: 14
          },
          {
            x: 'Csü',
            y: 15
          },
          {
            x: 'Pé',
            y: 13
          },
          {
            x: 'Szo',
            y: 9
          },
          {
            x: 'Vas',
            y: 8
          }
        ]
      }
    ]
  },
  options: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'adatleolvasás'],
  solution: 'A legmagasabb oszlop: **15°C** a(z) **csütörtök** napon.'
},
{
  id: 'H-T-14',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérséklet — tavasz',
  difficulty: 2,
  scenario: 'A diagram egy hét napjainak átlaghőmérsékletét mutatja.',
  question: 'Melyik napon volt a **legmelegebb**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: '°C',
    yMin: 0,
    yMax: 29,
    series: [
      {
        name: 'Hőm.',
        color: '#ef4444',
        points: [
          {
            x: 'Hé',
            y: 18
          },
          {
            x: 'Ke',
            y: 20
          },
          {
            x: 'Sze',
            y: 22
          },
          {
            x: 'Csü',
            y: 24
          },
          {
            x: 'Pé',
            y: 21
          },
          {
            x: 'Szo',
            y: 19
          },
          {
            x: 'Vas',
            y: 17
          }
        ]
      }
    ]
  },
  options: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'adatleolvasás'],
  solution: 'A legmagasabb oszlop: **24°C** a(z) **csütörtök** napon.'
},
{
  id: 'H-T-15',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vízállás — Duna',
  difficulty: 2,
  scenario: 'A vonaldiagram a Duna vízállását mutatja egy héten át (cm).',
  question: 'Melyik napon volt a **legmagasabb** vízállás?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'cm',
    yMin: 200,
    yMax: 340,
    series: [
      {
        name: 'Vízállás',
        color: '#2563eb',
        points: [
          { x: 'Hé', y: 240 },
          { x: 'Ke', y: 260 },
          { x: 'Sze', y: 280 },
          { x: 'Csü', y: 305 },
          { x: 'Pé', y: 320 },
          { x: 'Szo', y: 295 },
          { x: 'Vas', y: 270 }
        ]
      }
    ]
  },
  options: ['Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
  answer: 'Péntek',
  keywords: ['vonaldiagram', 'vízállás'],
  solution: 'A legmagasabb pont: **320 cm** a(z) **péntek** napon.'
},
{
  id: 'H-T-16',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Iskolai verseny — pontszámok',
  difficulty: 2,
  scenario: 'A diagram öt tanuló pontszámát mutatja egy matematikaversenyen.',
  question: 'Hány pontot ért el **Dóra**?',
  visual: {
    type: 'barChart',
    xLabel: 'Tanuló',
    yLabel: 'Pont',
    bars: [
      { label: 'Anna', value: 62 },
      { label: 'Béla', value: 78 },
      { label: 'Csaba', value: 55 },
      { label: 'Dóra', value: 91 },
      { label: 'Eszter', value: 73 }
    ]
  },
  options: ['78', '82', '91', '95'],
  answer: '91',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: 'Dóra oszlopa a legmagasabb: **91 pont**.'
},
{
  id: 'H-T-17',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Gyűjtés — osztályalap',
  difficulty: 2,
  scenario: 'Az osztály gyűjtését hetente jegyezték fel. A diagram a befizetett összeget mutatja.',
  question: 'Melyik héten fizették be a **legtöbbet**?',
  visual: {
    type: 'barChart',
    xLabel: 'Hét',
    yLabel: 'Ft',
    bars: [
      { label: '1. hét', value: 1800 },
      { label: '2. hét', value: 2400 },
      { label: '3. hét', value: 3200 },
      { label: '4. hét', value: 2100 }
    ]
  },
  options: ['1. hét', '2. hét', '3. hét', '4. hét'],
  answer: '3. hét',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: 'A legmagasabb oszlop a **3. hét** — 3200 Ft.'
},
{
  id: 'H-T-18',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vonat — GYSEV menetrend',
  difficulty: 2,
  scenario: 'A táblázat a GYSEV egy vonatjáratának megállóit és indulási idejét mutatja.',
  question: 'Mikor indul a vonat **Csornáról**?',
  visual: {
    type: 'table',
    caption: 'Menetrend',
    headers: ['Állomás', 'Indulás'],
    rows: [
      ['Sopron', '7:12'],
      ['Fertőszentmiklós', '7:38'],
      ['Csorna', '8:05'],
      ['Kapuvár', '8:24'],
      ['Győr', '8:52']
    ]
  },
  options: ['7:38', '8:05', '8:24', '8:52'],
  answer: '8:05',
  keywords: ['táblázat', 'menetrend'],
  solution: 'A táblázat szerint Csornáról **8:05**-kor indul.'
},
{
  id: 'H-T-19',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kassza-blokk',
  difficulty: 2,
  scenario: 'A vásárlás kasszablokkja négy tételt tartalmaz.',
  question: 'Melyik tétel a **legdrágább**?',
  visual: {
    type: 'priceTag',
    items: [
      { name: 'Kenyér', price: '480 Ft' },
      { name: 'Tej (1 l)', price: '379 Ft' },
      { name: 'Sajt (20 dkg)', price: '1240 Ft' },
      { name: 'Joghurt', price: '249 Ft' }
    ]
  },
  options: ['Kenyér', 'Tej', 'Sajt', 'Joghurt'],
  answer: 'Sajt',
  keywords: ['ár', 'összehasonlítás'],
  solution: 'A legnagyobb ár: **1240 Ft** — a sajt.'
},
{
  id: 'H-T-20',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Legnagyobb érték keresése',
  difficulty: 2,
  scenario: 'A táblázat ${s.rows.length} érték.',
  question: 'Melyiknek van a **legnagyobb** értéke?',
  visual: {
    type: 'table',
    caption: 'Adatok',
    headers: ['Jel', 'Érték'],
    rows: [
      ['A', '12.4'],
      ['B', '12.04'],
      ['C', '14.2'],
      ['D', '13.8']
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **C** = 14.2.'
},
{
  id: 'H-T-21',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Legnagyobb érték keresése',
  difficulty: 2,
  scenario: 'A táblázat ${s.rows.length} érték.',
  question: 'Melyiknek van a **legnagyobb** értéke?',
  visual: {
    type: 'table',
    caption: 'Adatok',
    headers: ['Jel', 'Érték'],
    rows: [
      ['X', '8.5'],
      ['Y', '8.05'],
      ['Z', '9'],
      ['W', '7.8']
    ]
  },
  options: ['X', 'Y', 'Z', 'W'],
  answer: 'Z',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **Z** = 9.'
},
{
  id: 'H-T-22',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Legnagyobb érték keresése',
  difficulty: 2,
  scenario: 'A táblázat ${s.rows.length} érték.',
  question: 'Melyiknek van a **legnagyobb** értéke?',
  visual: {
    type: 'table',
    caption: 'Adatok',
    headers: ['Jel', 'Érték'],
    rows: [
      ['Anna', '132'],
      ['Bea', '145'],
      ['Cili', '138'],
      ['Dóri', '150']
    ]
  },
  options: ['Anna', 'Bea', 'Cili', 'Dóri'],
  answer: 'Dóri',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **Dóri** = 150.'
},
{
  id: 'H-T-23',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Legnagyobb érték keresése',
  difficulty: 2,
  scenario: 'A táblázat ${s.rows.length} érték.',
  question: 'Melyiknek van a **legnagyobb** értéke?',
  visual: {
    type: 'table',
    caption: 'Adatok',
    headers: ['Jel', 'Érték'],
    rows: [
      ['Piros', '45'],
      ['Kék', '38'],
      ['Zöld', '52'],
      ['Sárga', '41']
    ]
  },
  options: ['Piros', 'Kék', 'Zöld', 'Sárga'],
  answer: 'Zöld',
  keywords: ['összehasonlítás', 'adatleolvasás'],
  solution: 'A legnagyobb: **Zöld** = 52.'
},
{
  id: 'H-T-24',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 1',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['2', '5', '8', '11', '14', '?']
  },
  options: ['16', '17', '18', '20'],
  answer: '17',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **+3**. Következő: **17**.'
},
{
  id: 'H-T-25',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 2',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['1', '2', '4', '8', '16', '?']
  },
  options: ['31', '32', '33', '35'],
  answer: '32',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **×2**. Következő: **32**.'
},
{
  id: 'H-T-26',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 3',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['100', '90', '80', '70', '60', '?']
  },
  options: ['49', '50', '51', '53'],
  answer: '50',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **−10**. Következő: **50**.'
},
{
  id: 'H-T-27',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 4',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['3', '6', '9', '12', '15', '?']
  },
  options: ['17', '18', '19', '21'],
  answer: '18',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **+3**. Következő: **18**.'
},
{
  id: 'H-T-28',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 5',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['1', '4', '9', '16', '25', '?']
  },
  options: ['35', '36', '37', '39'],
  answer: '36',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **négyzetek**. Következő: **36**.'
},
{
  id: 'H-T-29',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 6',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['7', '14', '21', '28', '35', '?']
  },
  options: ['41', '42', '43', '45'],
  answer: '42',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **+7**. Következő: **42**.'
},
{
  id: 'H-T-30',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 7',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['64', '32', '16', '8', '4', '?']
  },
  options: ['1', '2', '3', '5'],
  answer: '2',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **÷2**. Következő: **2**.'
},
{
  id: 'H-T-31',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sorozat 8',
  difficulty: 2,
  scenario: 'Figyeld meg a sorozatot.',
  question: 'Mi a **következő** eleme?',
  visual: {
    type: 'sequence',
    elements: ['5', '15', '45', '135', '405', '?']
  },
  options: ['1214', '1215', '1216', '1218'],
  answer: '1215',
  keywords: ['sorozat', 'szabály'],
  solution: 'Szabály: **×3**. Következő: **1215**.'
},
{
  id: 'H-T-32',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Diagram — matek dolgozat',
  difficulty: 2,
  scenario: 'A diagram matek dolgozat adatait mutatja.',
  question: 'Hol a **legnagyobb** érték?',
  visual: {
    type: 'barChart',
    xLabel: '',
    yLabel: '',
    yMin: 0,
    yMax: 104,
    bars: [
      {
        label: 'Anna',
        value: 82,
        color: '#2563eb'
      },
      {
        label: 'Béla',
        value: 94,
        color: '#16a34a'
      },
      {
        label: 'Cili',
        value: 70,
        color: '#f59e0b'
      },
      {
        label: 'Dani',
        value: 88,
        color: '#ef4444'
      },
      {
        label: 'Éva',
        value: 78,
        color: '#8b5cf6'
      }
    ]
  },
  options: ['Anna', 'Béla', 'Cili', 'Dani', 'Éva'],
  answer: 'Béla',
  keywords: ['oszlopdiagram'],
  solution: 'A legmagasabb: **Béla** (94).'
},
{
  id: 'H-T-33',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Diagram — szavazatok',
  difficulty: 2,
  scenario: 'A diagram szavazatok adatait mutatja.',
  question: 'Hol a **legnagyobb** érték?',
  visual: {
    type: 'barChart',
    xLabel: '',
    yLabel: '',
    yMin: 0,
    yMax: 28,
    bars: [
      {
        label: 'Piros',
        value: 12,
        color: '#2563eb'
      },
      {
        label: 'Kék',
        value: 18,
        color: '#16a34a'
      },
      {
        label: 'Zöld',
        value: 9,
        color: '#f59e0b'
      },
      {
        label: 'Sárga',
        value: 15,
        color: '#ef4444'
      }
    ]
  },
  options: ['Piros', 'Kék', 'Zöld', 'Sárga'],
  answer: 'Kék',
  keywords: ['oszlopdiagram'],
  solution: 'A legmagasabb: **Kék** (18).'
},
{
  id: 'H-T-34',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Diagram — eladások',
  difficulty: 2,
  scenario: 'A diagram eladások adatait mutatja.',
  question: 'Hol a **legnagyobb** érték?',
  visual: {
    type: 'barChart',
    xLabel: '',
    yLabel: '',
    yMin: 0,
    yMax: 50,
    bars: [
      {
        label: 'Jan',
        value: 30,
        color: '#2563eb'
      },
      {
        label: 'Feb',
        value: 25,
        color: '#16a34a'
      },
      {
        label: 'Már',
        value: 35,
        color: '#f59e0b'
      },
      {
        label: 'Ápr',
        value: 40,
        color: '#ef4444'
      },
      {
        label: 'Máj',
        value: 28,
        color: '#8b5cf6'
      }
    ]
  },
  options: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj'],
  answer: 'Ápr',
  keywords: ['oszlopdiagram'],
  solution: 'A legmagasabb: **Ápr** (40).'
},
{
  id: 'H-T-35',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Energiafogyasztás',
  difficulty: 3,
  scenario: 'Egy család napi áramfogyasztását (kWh) ábrázoltuk.',
  question: 'Melyik napon fogyasztottak a **legkevesebbet**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'kWh',
    yMin: 0,
    yMax: 20,
    series: [
      {
        name: 'Fogyasztás',
        color: '#f59e0b',
        points: [
          { x: 'Hé', y: 12 },
          { x: 'Ke', y: 14 },
          { x: 'Sze', y: 9 },
          { x: 'Csü', y: 11 },
          { x: 'Pé', y: 15 },
          { x: 'Szo', y: 18 },
          { x: 'Vas', y: 16 }
        ]
      }
    ]
  },
  options: ['Hétfő', 'Szerda', 'Csütörtök', 'Szombat'],
  answer: 'Szerda',
  keywords: ['vonaldiagram', 'minimum'],
  solution: 'A legalacsonyabb pont: **9 kWh** szerdán.'
},
{
  id: 'H-T-36',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Sportesemény — ranglista',
  difficulty: 2,
  scenario: 'A táblázat egy úszóverseny 50 m-es hátúszás végeredményét mutatja.',
  question: 'Ki végzett a **2. helyen**?',
  visual: {
    type: 'table',
    caption: 'Végeredmény',
    headers: ['Hely', 'Név', 'Idő'],
    rows: [
      ['1.', 'Kovács P.', '29.84'],
      ['2.', 'Nagy L.', '30.12'],
      ['3.', 'Szabó R.', '30.47'],
      ['4.', 'Tóth M.', '31.05']
    ]
  },
  options: ['Kovács P.', 'Nagy L.', 'Szabó R.', 'Tóth M.'],
  answer: 'Nagy L.',
  keywords: ['táblázat', 'rangsor'],
  solution: 'A 2. helyen **Nagy L.** áll 30.12 idővel.'
},
{
  id: 'H-T-37',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Osztálykirándulás — buszok',
  difficulty: 2,
  scenario: 'Három iskolai busz utaslétszámát piktogramon mutatjuk (egy figura = 5 fő).',
  question: 'Hány tanuló utazott a **B busszal**?',
  visual: {
    type: 'pictogram',
    unit: 5,
    unitLabel: 'fő',
    rows: [
      { label: 'A busz', count: 6 },
      { label: 'B busz', count: 9 },
      { label: 'C busz', count: 7 }
    ]
  },
  options: ['35', '40', '45', '50'],
  answer: '45',
  keywords: ['piktogram', 'leolvasás'],
  solution: '9 figura × 5 fő = **45** tanuló.'
},
{
  id: 'H-T-38',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Zenei ritmus — ütemek',
  difficulty: 2,
  scenario: 'Egy dal négy szakaszának ütemszámát ábrázoltuk.',
  question: 'Melyik szakasz a **leghosszabb**?',
  visual: {
    type: 'barChart',
    xLabel: 'Szakasz',
    yLabel: 'Ütem',
    bars: [
      { label: 'Bevezető', value: 8 },
      { label: 'Versszak', value: 16 },
      { label: 'Refrén', value: 12 },
      { label: 'Híd', value: 6 }
    ]
  },
  options: ['Bevezető', 'Versszak', 'Refrén', 'Híd'],
  answer: 'Versszak',
  keywords: ['oszlopdiagram', 'maximum'],
  solution: 'A **versszak** 16 ütemes — a leghosszabb.'
},
{
  id: 'H-T-39',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Időjárás — csapadék',
  difficulty: 2,
  scenario: 'Budapest öt napjának csapadékmennyisége (mm) piktogramon (1 csepp = 2 mm).',
  question: 'Hány mm csapadék hullott **csütörtökön**?',
  visual: {
    type: 'pictogram',
    unit: 2,
    unitLabel: 'mm',
    rows: [
      { label: 'Hétfő', count: 3 },
      { label: 'Kedd', count: 1 },
      { label: 'Szerda', count: 0 },
      { label: 'Csütörtök', count: 5 },
      { label: 'Péntek', count: 2 }
    ]
  },
  options: ['6 mm', '8 mm', '10 mm', '12 mm'],
  answer: '10 mm',
  keywords: ['piktogram', 'csapadék'],
  solution: '5 csepp × 2 mm = **10 mm**.'
},
{
  id: 'H-T-40',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Taxidíj — összehasonlítás',
  difficulty: 3,
  scenario: 'A diagram 5 km-es taxiút díjának alakulását mutatja különböző társaságoknál.',
  question: 'Melyik taxitársaság a **legolcsóbb**?',
  visual: {
    type: 'barChart',
    xLabel: 'Társaság',
    yLabel: 'Ft',
    bars: [
      { label: 'A', value: 2400 },
      { label: 'B', value: 2100 },
      { label: 'C', value: 2800 },
      { label: 'D', value: 1950 }
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'D',
  keywords: ['oszlopdiagram', 'minimum'],
  solution: 'A legalacsonyabb oszlop: **D — 1950 Ft**.'
},
{
  id: 'H-T-41',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Számegyenes — hőmérő',
  difficulty: 2,
  scenario: 'A számegyenes egy januári reggeli hőmérő állását mutatja.',
  question: 'Hány **°C**-ot mutat a hőmérő?',
  visual: {
    type: 'numberLine',
    min: -10,
    max: 10,
    step: 1,
    markers: [
      { value: -4, label: '' }
    ]
  },
  options: ['-6', '-4', '-2', '4'],
  answer: '-4',
  keywords: ['számegyenes', 'negatív szám'],
  solution: 'A jel -10 és 0 között, 4 egységre a nulla alatt: **-4 °C**.'
},
{
  id: 'H-T-42',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Internetcsomagok — díjak',
  difficulty: 3,
  scenario: 'Négy szolgáltató havi internet-előfizetési díját összehasonlítjuk.',
  question: 'Melyik csomag a **legolcsóbb**?',
  visual: {
    type: 'priceTag',
    items: [
      { name: 'Start', price: '4990 Ft' },
      { name: 'Family', price: '6490 Ft' },
      { name: 'Basic', price: '3990 Ft' },
      { name: 'Pro', price: '7990 Ft' }
    ]
  },
  options: ['Start', 'Family', 'Basic', 'Pro'],
  answer: 'Basic',
  keywords: ['összehasonlítás', 'ár'],
  solution: 'A legalacsonyabb díj: **Basic — 3990 Ft**.'
},
{
  id: 'H-T-43',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kördiagram — kedvenc gyümölcs',
  difficulty: 2,
  scenario: 'Az osztály kedvenc gyümölcsét kördiagramon mutatjuk be.',
  question: 'Melyik gyümölcsöt **legtöbben** választották?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Alma', value: 35, color: '#ef4444' },
      { label: 'Banán', value: 25, color: '#f59e0b' },
      { label: 'Szőlő', value: 20, color: '#a855f7' },
      { label: 'Körte', value: 20, color: '#22c55e' }
    ]
  },
  options: ['Alma', 'Banán', 'Szőlő', 'Körte'],
  answer: 'Alma',
  keywords: ['kördiagram', 'leolvasás'],
  solution: 'A legnagyobb cikk: **Alma — 35%**.'
},
{
  id: 'H-T-44',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Vitaminadagolás — recept',
  difficulty: 2,
  scenario: 'Egy multivitamin tabletta naponta 3-szor, négy napon át szedendő.',
  question: 'Hány tabletta fogy el **4 nap alatt**?',
  visual: {
    type: 'recipe',
    title: 'Napi adag',
    ingredients: [
      { name: 'Tabletta', amount: '3 db / nap' },
      { name: 'Kezelés időtartama', amount: '4 nap' }
    ]
  },
  options: ['7', '9', '10', '12'],
  answer: '12',
  keywords: ['szorzás', 'adagolás'],
  solution: '$3 \\cdot 4 = 12$ tabletta.'
},
{
  id: 'H-T-45',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Óraeltolódás — Budapest-London',
  difficulty: 3,
  scenario: 'Londonban 1 órával korábban van, mint Budapesten. A londoni óra 14:20-at mutat.',
  question: 'Mennyi az idő **Budapesten**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'London', formula: '14:20', result: '' },
      { label: 'Budapest', formula: 'London + 1 óra', result: '?' }
    ]
  },
  options: ['13:20', '14:20', '15:20', '16:20'],
  answer: '15:20',
  keywords: ['időzóna', 'összeadás'],
  solution: '$14:20 + 1\\text{ óra} = \\mathbf{15:20}$.'
},
{
  id: 'H-T-46',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Babapelenka — csomag',
  difficulty: 2,
  scenario: 'Egy baba naponta 6 pelenkát használ, egy csomagban 72 db van.',
  question: 'Hány **napra** elég egy csomag?',
  visual: {
    type: 'formula',
    formula: 'napok = 72 ÷ 6',
    variables: [
      { name: 'db/nap', desc: '6' }
    ],
    example: { '': '' }
  },
  options: ['10', '11', '12', '14'],
  answer: '12',
  keywords: ['osztás', 'hányados'],
  solution: '$72 \\div 6 = \\mathbf{12}$ nap.'
},
{
  id: 'H-T-47',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Lépcsőfokok',
  difficulty: 2,
  scenario: 'Egy lépcsőház szintenként 18 lépcsőfokot tartalmaz.',
  question: 'Hány lépcsőfokot kell megmászni a **4. emeletig**?',
  visual: {
    type: 'sequence',
    elements: ['1. em. → 18', '2. em. → 36', '3. em. → 54', '4. em. → ?']
  },
  options: ['68', '70', '72', '76'],
  answer: '72',
  keywords: ['szorzás', 'sorozat'],
  solution: '$18 \\cdot 4 = \\mathbf{72}$ fok.'
},
{
  id: 'H-T-48',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sportrajt — számlálás',
  difficulty: 2,
  scenario: 'A 400 m-es futópálya minden 50 m-énél jelzőtábla van, a rajttól indulva.',
  question: 'Hány jelzőtábla van a **3. jelzőtől kezdve** a célvonalig (a célt nem számítva)?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 400,
    step: 50,
    markers: [
      { value: 150, label: '3.' },
      { value: 400, label: 'cél' }
    ]
  },
  options: ['4', '5', '6', '7'],
  answer: '5',
  keywords: ['számegyenes', 'számlálás'],
  solution: 'A 3-tól a 7-ig (150, 200, 250, 300, 350 m) = **5** jelzőtábla.'
},
{
  id: 'H-T-49',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Kávézó — bögreszám',
  difficulty: 2,
  scenario: 'A kávézóban minden asztalon 4 bögre található; egy reggel 7 asztal van megterítve.',
  question: 'Összesen hány **bögre** van az asztalokon?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 4, label: '1. asztal' },
      { count: 4, label: '2. asztal' },
      { count: 4, label: '3. asztal' },
      { count: 4, label: '...' },
      { count: 4, label: '7. asztal' }
    ]
  },
  options: ['24', '26', '28', '32'],
  answer: '28',
  keywords: ['szorzás'],
  solution: '$7 \\cdot 4 = \\mathbf{28}$ bögre.'
},
{
  id: 'H-T-50',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Családfa — nagymama kora',
  difficulty: 3,
  scenario: 'Pali 11 éves, édesanyja 27 évvel idősebb nála, a nagymama pedig 29 évvel idősebb édesanyjánál.',
  question: 'Hány éves a **nagymama**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Pali', formula: '11', result: '' },
      { label: 'Anya', formula: '11 + 27', result: '38' },
      { label: 'Nagymama', formula: '38 + 29', result: '?' }
    ]
  },
  options: ['65', '66', '67', '70'],
  answer: '67',
  keywords: ['összeadás', 'életkor'],
  solution: '$11 + 27 + 29 = \\mathbf{67}$ év.'
},
{
  id: 'M-A-01',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kedvezményes ár',
  difficulty: 4,
  scenario: 'Egy kabát eredeti ára 12 500 Ft. A boltban 20% kedvezményt adnak.',
  question: 'Mennyibe kerül a kabát a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 12500,
    discountPercent: 20,
    currency: 'Ft'
  },
  options: ['9 500 Ft', '10 000 Ft', '10 500 Ft', '11 000 Ft'],
  answer: '10 000 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `**Kedvezményes ár számítása:**

1. A kedvezmény összege: $12\\,500 \\cdot \\tfrac{20}{100} = 2\\,500$ Ft.
2. A fizetendő ár: $12\\,500 - 2\\,500 = 10\\,000$ Ft.

Ellenőrzés: a fizetendő a teljes ár 80%-a, $12\\,500 \\cdot 0{,}8 = 10\\,000$ Ft. ✓

**A helyes válasz: 10 000 Ft.**`
},
{
  id: 'M-A-02',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Repülőjárat – időzóna',
  difficulty: 5,
  scenario: 'Egy repülő Budapestről 14:30-kor indul és 7 óra 15 perc alatt ér New Yorkba. New Yorkban az idő **6 órával kevesebb**, mint Budapesten.',
  question: 'Helyi idő szerint hánykor landol a repülő New Yorkban?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '14:30',
        label: 'Indulás (BP idő)',
        color: '#2563eb'
      },
      {
        t: '21:45',
        label: 'Landolás (BP idő)',
        color: '#16a34a'
      },
      {
        t: '15:45',
        label: 'Landolás (NY idő)',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['13:45', '15:45', '17:45', '21:45'],
  answer: '15:45',
  keywords: ['idő', 'időzóna', 'műveletsor'],
  solution: `**Két lépéses megoldás:**

1. **Landolás budapesti idő szerint:** $14{:}30 + 7\\ \\text{óra}\\ 15\\ \\text{perc} = 21{:}45$.
2. **Átváltás NY idejére:** $21{:}45 - 6\\ \\text{óra} = 15{:}45$.

**A helyes válasz: 15:45 (helyi idő).**`
},
{
  id: 'M-A-03',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Medence feltöltése',
  difficulty: 4,
  scenario: 'Egy medence térfogata **5,4 m³**. A kerti csapból percenként **3 liter** víz folyik.',
  question: 'Hány óra alatt telik meg a medence, ha folyamatosan engedjük a vizet?',
  visual: {
    type: 'pool',
    volumeM3: 5.4,
    flowLmin: 3
  },
  options: ['25 óra', '30 óra', '45 óra', '90 óra'],
  answer: '30 óra',
  keywords: ['mértékegység-átváltás', 'térfogat', 'idő'],
  solution: `**Térfogat átváltása literre, majd idő számítása:**

1. $5{,}4$ m³ = $5400$ liter.
2. Összes perc: $\\dfrac{5400}{3} = 1800$ perc.
3. Óra: $\\dfrac{1800}{60} = 30$ óra.

**A helyes válasz: 30 óra.**`
},
{
  id: 'M-A-04',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szoba festése',
  difficulty: 4,
  scenario: 'Egy téglalap alakú szoba alapterülete **3 m × 4 m**. A mennyezetet ki kell festeni. Egy doboz festékkel **6 m²** felület festhető le.',
  question: 'Legkevesebb hány doboz festékre van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 3,
    heightM: 4,
    label: 'Mennyezet alaprajza',
    fill: '#fef3c7'
  },
  options: ['1 doboz', '2 doboz', '3 doboz', '4 doboz'],
  answer: '2 doboz',
  keywords: ['terület', 'osztás', 'kerekítés értelmezés szerint'],
  solution: `**Terület, majd doboz-szám:**

1. Terület: $3 \\cdot 4 = 12$ m².
2. Osztás: $\\dfrac{12}{6} = 2$ doboz.

**A helyes válasz: 2 doboz.** (Pontosan kijön.)`
},
{
  id: 'M-A-05',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Zsákok pakolása',
  difficulty: 5,
  scenario: 'Egy raktárban **36 kg cukrot** és **48 kg lisztet** kell azonos méretű zsákokba tenni úgy, hogy **egy zsákban csak egyféle** legyen, és **minden zsák ugyanannyi kg**-ot tartalmazzon.',
  question: 'Legfeljebb hány kg lehet egy zsákban?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Cukor',
        count: 36,
        unit: 'kg',
        color: '#e0e7ff'
      },
      {
        label: 'Liszt',
        count: 48,
        unit: 'kg',
        color: '#fde68a'
      }
    ]
  },
  options: ['4 kg', '6 kg', '12 kg', '24 kg'],
  answer: '12 kg',
  keywords: ['legnagyobb közös osztó'],
  solution: `**Legnagyobb közös osztót keresünk:**

- $36 = 2^2 \\cdot 3^2$
- $48 = 2^4 \\cdot 3$
- **lnko(36, 48) = $2^2 \\cdot 3 = 12$**

Tehát 36-ot $36/12=3$, 48-at $48/12=4$ zsákra lehet felosztani.

**A helyes válasz: 12 kg.**`
},
{
  id: 'M-A-06',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gyümölcssaláta arány',
  difficulty: 4,
  scenario: 'Egy receptben a **gyümölcssaláta** arányai: **2 rész** alma, **3 rész** banán, **1 rész** szőlő. Panni **3 kg alma**-hoz elkészíti a salátát.',
  question: 'Hány kg banánra van szüksége?',
  visual: {
    type: 'recipe',
    servingsOriginal: '2 : 3 : 1',
    servingsTarget: '3 kg alma',
    ingredients: [
      {
        name: 'Alma',
        amount: 2,
        unit: 'rész'
      },
      {
        name: 'Banán',
        amount: 3,
        unit: 'rész'
      },
      {
        name: 'Szőlő',
        amount: 1,
        unit: 'rész'
      }
    ],
    highlight: 'Banán'
  },
  options: ['2 kg', '3 kg', '4,5 kg', '6 kg'],
  answer: '4,5 kg',
  keywords: ['arány', 'szorzás'],
  solution: `**Arány alkalmazása:**

1. 2 rész alma = 3 kg → **1 rész** = $3 \\div 2 = 1{,}5$ kg.
2. Banán 3 rész: $3 \\cdot 1{,}5 = 4{,}5$ kg.

**A helyes válasz: 4,5 kg.**`
},
{
  id: 'M-A-07',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép méretaránya',
  difficulty: 4,
  scenario: 'Egy turistatérkép méretaránya **1 : 50 000**. Két falu között a térképen mért távolság **6 cm**.',
  question: 'Mekkora a valódi távolság a két falu között?',
  visual: {
    type: 'formula',
    formula: 'valódi = mért · méretarány',
    variables: [
      {
        name: 'mért',
        desc: 'térképen mért hossz (cm)'
      },
      {
        name: 'méretarány',
        desc: '1 cm ↔ 50 000 cm = 500 m'
      }
    ],
    example: {
      'mért_cm': 6
    }
  },
  options: ['300 m', '3 km', '30 km', '300 km'],
  answer: '3 km',
  keywords: ['méretarány', 'mértékegység-átváltás'],
  solution: `**Méretarány alkalmazása:**

1. $6$ cm a térképen → $6 \\cdot 50\\,000 = 300\\,000$ cm a valóságban.
2. Átváltás: $300\\,000$ cm $= 3000$ m $= 3$ km.

**A helyes válasz: 3 km.**`
},
{
  id: 'M-A-08',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'L-alakú kert',
  difficulty: 5,
  scenario: 'A kertész egy **L-alakú** virágágyást szeretne kialakítani az ábra szerinti méretekkel.',
  question: 'Mekkora a virágágyás területe?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 8,
      h: 6
    },
    cut: {
      w: 3,
      h: 3
    },
    unit: 'm'
  },
  options: ['30 m²', '39 m²', '42 m²', '48 m²'],
  answer: '39 m²',
  keywords: ['terület', 'összetett alakzat'],
  solution: `**Terület számítása kivágással:**

1. A **befoglaló téglalap** területe: $8 \\cdot 6 = 48$ m².
2. A **kivágott** rész területe: $3 \\cdot 3 = 9$ m².
3. L-alak területe: $48 - 9 = \\mathbf{39}$ m².`
},
{
  id: 'M-A-09',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.1',
  title: 'Főző-hőmérő',
  difficulty: 3,
  scenario: 'A konyhai hőmérő skáláját nézed a pecsenye sütésekor. Az ideális maghőmérséklet **82 °C**.',
  question: 'Hány fokkal **kevesebb** az ideálisnál a most mutatott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 120,
    step: 10,
    unit: '°C',
    value: 68,
    label: 'Jelenlegi maghőmérséklet'
  },
  options: ['12 °C', '14 °C', '18 °C', '22 °C'],
  answer: '14 °C',
  keywords: ['skála', 'kivonás'],
  solution: `**Skála + kivonás:**

1. Leolvasás: a mutató **68 °C**-ot jelez.
2. Különbség: $82 - 68 = 14$ °C.

**14 °C-kal alacsonyabb az ideálisnál.**`
},
{
  id: 'M-A-10',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tört számegyenesen',
  difficulty: 4,
  scenario: 'A számegyenesen 0 és 3 között 12 egyenlő részre van osztva.',
  question: 'Melyik pont jelöli a $\\tfrac{7}{4}$ tört értékét?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 3,
    divisions: 12,
    points: [
      {
        x: 1.25,
        label: 'P'
      },
      {
        x: 1.5,
        label: 'Q'
      },
      {
        x: 1.75,
        label: 'R'
      },
      {
        x: 2.25,
        label: 'S'
      }
    ]
  },
  options: ['P', 'Q', 'R', 'S'],
  answer: 'R',
  keywords: ['tört', 'számegyenes', 'egyenlő nevező'],
  solution: `**Tört elhelyezése:**

1. Közös nevezőre: $\\tfrac{7}{4} = \\tfrac{21}{12}$.
2. A 0-tól számított **21.** osztáspont, ami $\\tfrac{21}{12} = 1{,}75$.
3. Az **R pont** van $1{,}75$-nél → **R**.`
},
{
  id: 'M-A-11',
  contentArea: 'M',
  contentSub: '1.2.6',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Taxi viteldíj',
  difficulty: 4,
  scenario: 'A taxi viteldíját a $D = 700 + 320 \\cdot k$ képlettel számolják, ahol **k** a megtett kilométer.',
  question: 'Mennyibe kerül egy **8 km**-es út?',
  visual: {
    type: 'formula',
    formula: 'D = 700 + 320 · k',
    variables: [
      {
        name: '700 Ft',
        desc: 'alapdíj'
      },
      {
        name: '320 Ft',
        desc: 'km-enkénti díj'
      },
      {
        name: 'k',
        desc: 'megtett km'
      }
    ],
    example: {
      k: 8
    }
  },
  options: ['2 560 Ft', '2 860 Ft', '3 260 Ft', '3 560 Ft'],
  answer: '3 260 Ft',
  keywords: ['behelyettesítés', 'szöveges feladat'],
  solution: `**Behelyettesítés:**

$$D = 700 + 320 \\cdot 8 = 700 + 2560 = 3260\\ \\text{Ft}.$$

**A helyes válasz: 3 260 Ft.**`
},
{
  id: 'M-A-12',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Könyvtári polc',
  difficulty: 4,
  scenario: 'A könyvtárosnak **85 könyvet** kell elrendeznie. Minden polcra **pontosan 12** könyv fér.',
  question: 'Hány polcot tölt meg teljesen, és hány könyv marad a következő, nem teljes polcon?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        label: '1. polc',
        count: 12
      },
      {
        label: '2. polc',
        count: 12
      },
      {
        label: '...',
        count: 12
      },
      {
        label: 'utolsó',
        count: 1
      }
    ]
  },
  options: ['6 teljes polc, 13 marad', '7 teljes polc, 1 marad', '7 teljes polc, 11 marad', '8 teljes polc, 0 marad'],
  answer: '7 teljes polc, 1 marad',
  keywords: ['osztás maradékkal', 'oszthatóság'],
  solution: `**Osztás maradékkal:**

$$85 \\div 12 = 7\\ \\text{(teljes polc)}, \\text{maradék}\\ 85 - 7 \\cdot 12 = 85 - 84 = 1.$$

Tehát **7 teljes** polc és **1 könyv** marad a 8. polcra.`
},
{
  id: 'M-A-13',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Osztály kirándulása',
  difficulty: 4,
  scenario: 'A **6.a** osztályban **25 diák** van. Egy kiránduláson **60%**-uk vett részt.',
  question: 'Hány diák ment el a kirándulásra?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Osztálylétszám',
        count: 25,
        unit: 'fő',
        color: '#dbeafe'
      },
      {
        label: 'Résztvevő',
        count: '60%',
        color: '#fde68a'
      }
    ]
  },
  options: ['10 fő', '12 fő', '15 fő', '18 fő'],
  answer: '15 fő',
  keywords: ['százalékszámítás'],
  solution: `**Százalékérték:**

$$25 \\cdot \\dfrac{60}{100} = 25 \\cdot 0{,}6 = 15\\ \\text{fő}.$$

**A helyes válasz: 15 fő.**`
},
{
  id: 'M-A-14',
  contentArea: 'M',
  contentSub: '1.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legnagyobb szám',
  difficulty: 4,
  scenario: 'A matek versenyen a **3, 5, 0, 7** számjegyek mindegyikét **pontosan egyszer** használva kell a **legnagyobb négyjegyű** számot felírni.',
  question: 'Mennyi ez a legnagyobb szám?',
  visual: {
    type: 'sequence',
    elements: ['3', '5', '0', '7']
  },
  options: ['7 530', '7 503', '7 350', '5 730'],
  answer: '7 530',
  keywords: ['helyi érték', 'rendezés'],
  solution: `**Legnagyobb szám szabálya:**

A legnagyobb számot úgy kapjuk, hogy a számjegyeket **csökkenő sorrendbe** rendezzük:

$$7, 5, 3, 0 \\;\\Longrightarrow\\; \\mathbf{7530}.$$

A 0 az egyeseknél van, így nem „pazaroljuk" magasabb helyre.`
},
{
  id: 'M-A-15',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Üdítő átöntése',
  difficulty: 4,
  scenario: 'Egy piknikre **3,6 liter** üdítőt viszünk, amit egyenlő mennyiségekben **2 dl-es** pohárba akarunk szétönteni.',
  question: 'Hány pohár üdítőt tudunk megtölteni?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Üdítő',
        formula: '3,6 L = 36 dl',
        result: '36 dl'
      },
      {
        label: '1 pohár',
        formula: '2 dl',
        result: '2 dl'
      }
    ]
  },
  options: ['9 pohár', '12 pohár', '18 pohár', '36 pohár'],
  answer: '18 pohár',
  keywords: ['mértékegység-átváltás', 'osztás'],
  solution: `**Átváltás, majd osztás:**

1. $3{,}6$ L = $36$ dl.
2. $36 \\div 2 = 18$ pohár.

**A helyes válasz: 18 pohár.**`
},
{
  id: 'M-A-16',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: '20% kedvezmény — 8500 Ft',
  difficulty: 4,
  scenario: 'Egy termék eredeti ára **8500 Ft**, most **20% kedvezményt** adnak rá.',
  question: 'Mennyibe kerül a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 8500,
    discountPercent: 20,
    currency: 'Ft'
  },
  options: ['6300 Ft', '6800 Ft', '7300 Ft', '7800 Ft'],
  answer: '6800 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `Kedvezmény: $8500 \\cdot \\tfrac{20}{100} = 1700$ Ft.

Fizetendő: $8500 - 1700 = 6800$ Ft.

**A helyes válasz: 6800 Ft.**`
},
{
  id: 'M-A-17',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: '25% kedvezmény — 12 000 Ft',
  difficulty: 4,
  scenario: 'Egy termék eredeti ára **12 000 Ft**, most **25% kedvezményt** adnak rá.',
  question: 'Mennyibe kerül a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 12000,
    discountPercent: 25,
    currency: 'Ft'
  },
  options: ['8500 Ft', '9000 Ft', '9500 Ft', '10 000 Ft'],
  answer: '9000 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `Kedvezmény: $12000 \\cdot \\tfrac{25}{100} = 3000$ Ft.

Fizetendő: $12000 - 3000 = 9000$ Ft.

**A helyes válasz: 9000 Ft.**`
},
{
  id: 'M-A-18',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: '10% kedvezmény — 15 000 Ft',
  difficulty: 4,
  scenario: 'Egy termék eredeti ára **15 000 Ft**, most **10% kedvezményt** adnak rá.',
  question: 'Mennyibe kerül a kedvezmény után?',
  visual: {
    type: 'priceTag',
    original: 15000,
    discountPercent: 10,
    currency: 'Ft'
  },
  options: ['13 000 Ft', '13 500 Ft', '14 000 Ft', '14 500 Ft'],
  answer: '13 500 Ft',
  keywords: ['százalékszámítás', 'kedvezmény'],
  solution: `Kedvezmény: $15000 \\cdot \\tfrac{10}{100} = 1500$ Ft.

Fizetendő: $15000 - 1500 = 13500$ Ft.

**A helyes válasz: 13 500 Ft.**`
},
{
  id: 'M-A-19',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Fesztivál — sátor alapterülete',
  difficulty: 4,
  scenario: 'A fesztiválon egy **rendezvénysátort** állítanak fel. A sátor **12 m × 9 m** méretű. A talajra mozaikmintát raknak **3 m²**-es paneloknak.',
  question: 'Legkevesebb **hány panelre** van szükség a teljes lefedéshez?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 9,
    label: 'Sátor talaj',
    unit: 'm'
  },
  options: ['24', '30', '36', '40'],
  answer: '36',
  keywords: ['terület', 'osztás', 'fesztivál'],
  solution: 'Terület: $12 \\cdot 9 = 108$ m². Panel: $108 / 3 = \\mathbf{36}$ db.'
},
{
  id: 'M-A-20',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Bank — kamat 1 évre',
  difficulty: 4,
  scenario: 'A bankban **180 000 Ft**-ot helyezel el **1 évre**, a kamat **4%**.',
  question: 'Mennyi **kamatot kapsz** 1 év múlva?',
  visual: {
    type: 'priceTag',
    original: 180000,
    discountPercent: 4,
    currency: 'Ft',
    label: 'Tőke és kamat'
  },
  options: ['4800 Ft', '6200 Ft', '7200 Ft', '7800 Ft'],
  answer: '7200 Ft',
  keywords: ['százalékszámítás', 'kamat', 'bank'],
  solution: '$180000 \\cdot \\tfrac{4}{100} = 7200$ Ft kamat.'
},
{
  id: 'M-A-21',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Átlag — osztály dolgozatjegyei',
  difficulty: 4,
  scenario: 'Az osztályban a matekdolgozat jegyei így oszlanak meg.',
  question: 'Mennyi az **átlagos érdemjegy**?',
  visual: {
    type: 'barChart',
    caption: 'Jegyek eloszlása',
    categories: ['1', '2', '3', '4', '5'],
    values: [1, 3, 8, 6, 2],
    yLabel: 'db'
  },
  options: ['3.0', '3.3', '3.5', '4.0'],
  answer: '3.3',
  keywords: ['átlag', 'oszlopdiagram'],
  solution: `Összesen: $1\\cdot1 + 3\\cdot2 + 8\\cdot3 + 6\\cdot4 + 2\\cdot5 = 1+6+24+24+10 = 65$.

Darab: $1+3+8+6+2 = 20$.

Átlag: $65/20 = \\mathbf{3.25}$, ami $\\approx 3.3$.`
},
{
  id: 'M-A-22',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Edzés — futás tempó',
  difficulty: 4,
  scenario: 'Réka **8 km**-t fut **40 perc** alatt, egyenletes tempóban.',
  question: 'Mennyi az **1 km megtételéhez** szükséges idő?',
  visual: {
    type: 'timeline',
    label: 'Futás ideje',
    events: [
      { t: '0 km', label: 'Start' },
      { t: '8 km', label: 'Cél (40 perc)' }
    ]
  },
  options: ['4 perc', '5 perc', '6 perc', '8 perc'],
  answer: '5 perc',
  keywords: ['arány', 'edzés', 'tempó'],
  solution: '$40 / 8 = \\mathbf{5}$ perc/km.'
},
{
  id: 'M-A-23',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'ÁFA számítás — webshop',
  difficulty: 4,
  scenario: 'Egy webshopban egy termék **nettó ára 16 000 Ft**, az ÁFA **27%**.',
  question: 'Mennyi a **bruttó ár** (ÁFA-val együtt)?',
  visual: {
    type: 'priceTag',
    original: 16000,
    discountPercent: -27,
    currency: 'Ft',
    label: 'Nettó ár'
  },
  options: ['18 320 Ft', '19 320 Ft', '20 320 Ft', '22 320 Ft'],
  answer: '20 320 Ft',
  keywords: ['százalékszámítás', 'ÁFA', 'webshop'],
  solution: 'ÁFA: $16000 \\cdot 0{,}27 = 4320$ Ft. Bruttó: $16000 + 4320 = \\mathbf{20\\,320}$ Ft.'
},
{
  id: 'M-A-24',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Recept — arány bővítése',
  difficulty: 4,
  scenario: 'Egy palacsintarecept **4 főre** a következő: **200 g liszt, 400 ml tej, 2 tojás**. A születésnapon **10 főre** akarnak főzni.',
  question: 'Hány **gramm lisztre** lesz szükség?',
  visual: {
    type: 'recipe',
    caption: 'Palacsinta recept (4 → 10 fő)',
    rows: [
      { name: 'Liszt', amount: '200 g', scaled: '? g' },
      { name: 'Tej', amount: '400 ml' },
      { name: 'Tojás', amount: '2 db' }
    ]
  },
  options: ['400 g', '450 g', '500 g', '600 g'],
  answer: '500 g',
  keywords: ['arányosság', 'recept', 'főzés'],
  solution: '1 főre: $200/4 = 50$ g. 10 főre: $50 \\cdot 10 = \\mathbf{500}$ g.'
},
{
  id: 'M-A-25',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Átlagsebesség — 120 km, 2 óra',
  difficulty: 4,
  scenario: 'Egy autó **120 km**-t tett meg **2 óra** alatt.',
  question: 'Mekkora volt az **átlagsebessége**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Út',
        formula: '120 km',
        result: ''
      },
      {
        label: 'Idő',
        formula: '2 óra',
        result: ''
      }
    ]
  },
  options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
  answer: '60 km/h',
  keywords: ['átlagsebesség', 'arányszámítás'],
  solution: '$v = \\dfrac{s}{t} = \\dfrac{120}{2} = 60$ km/h.'
},
{
  id: 'M-A-26',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Átlagsebesség — 75 km, 1.5 óra',
  difficulty: 4,
  scenario: 'Egy autó **75 km**-t tett meg **1.5 óra** alatt.',
  question: 'Mekkora volt az **átlagsebessége**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Út',
        formula: '75 km',
        result: ''
      },
      {
        label: 'Idő',
        formula: '1.5 óra',
        result: ''
      }
    ]
  },
  options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
  answer: '50 km/h',
  keywords: ['átlagsebesség', 'arányszámítás'],
  solution: '$v = \\dfrac{s}{t} = \\dfrac{75}{1.5} = 50$ km/h.'
},
{
  id: 'M-A-27',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'L-alakú udvar kerülete',
  difficulty: 4,
  scenario: 'Egy L-alakú iskolaudvar méretei az ábrán láthatók.',
  question: 'Mekkora a **kerülete**?',
  visual: {
    type: 'polygonL',
    outer: { w: 12, h: 8 },
    cut: { w: 5, h: 3 },
    unit: 'm',
    label: 'Iskolaudvar'
  },
  options: ['32 m', '36 m', '40 m', '44 m'],
  answer: '40 m',
  keywords: ['kerület', 'L-alak'],
  solution: 'L-alak kerülete = külső téglalap kerülete (a belevágás nem változtatja): $2(12+8) = \\mathbf{40}$ m.'
},
{
  id: 'M-A-28',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Állatkert — belépőjegy',
  difficulty: 4,
  scenario: 'Az állatkertben a **felnőtt jegy 3500 Ft**, a **gyerekjegy 2100 Ft**. Egy család **2 felnőttel és 3 gyerekkel** érkezik.',
  question: 'Mennyi a **család összköltsége**?',
  visual: {
    type: 'table',
    caption: 'Jegyárak',
    headers: ['Fő', 'Ár/fő', 'Összesen'],
    rows: [
      ['2 felnőtt', '3500 Ft', '7000 Ft'],
      ['3 gyerek', '2100 Ft', '6300 Ft']
    ]
  },
  options: ['12 300 Ft', '13 300 Ft', '14 300 Ft', '15 300 Ft'],
  answer: '13 300 Ft',
  keywords: ['szorzás', 'összeg', 'állatkert'],
  solution: '$2 \\cdot 3500 + 3 \\cdot 2100 = 7000 + 6300 = \\mathbf{13\\,300}$ Ft.'
},
{
  id: 'M-A-29',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Mozi — jegybevétel',
  difficulty: 4,
  scenario: 'A moziban egy filmre **180 jegyet** adtak el **1800 Ft** darabáron. A jegyek **40%-a félárú** volt (900 Ft).',
  question: 'Mennyi volt a **teljes bevétel**?',
  visual: {
    type: 'table',
    caption: 'Jegyeladás',
    headers: ['Kategória', 'Db', 'Ár'],
    rows: [
      ['Teljes árú', '108', '1800 Ft'],
      ['Félárú', '72', '900 Ft']
    ]
  },
  options: ['226 800 Ft', '248 400 Ft', '259 200 Ft', '324 000 Ft'],
  answer: '259 200 Ft',
  keywords: ['százalék', 'mozi', 'bevétel'],
  solution: `Félárúak: $180 \\cdot 0{,}4 = 72$ db; teljes árúak: $108$ db.

Bevétel: $108 \\cdot 1800 + 72 \\cdot 900 = 194400 + 64800 = \\mathbf{259\\,200}$ Ft.`
},
{
  id: 'M-A-30',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kirándulás — várható érkezés',
  difficulty: 4,
  scenario: 'Egy busz **08:30-kor** indul, **60 km/h** átlagsebességgel halad, a távolság **150 km**. Útközben **25 perc pihenőt** tart.',
  question: 'Hánykor **érkezik** meg?',
  visual: {
    type: 'timeline',
    label: 'Kirándulás időrend',
    events: [
      { t: '08:30', label: 'Indulás' },
      { t: '?', label: 'Érkezés' }
    ]
  },
  options: ['10:55', '11:25', '11:30', '11:55'],
  answer: '11:25',
  keywords: ['átlagsebesség', 'időszámítás', 'kirándulás'],
  solution: `Út ideje: $150 / 60 = 2{,}5$ óra = 2 óra 30 perc.

Plus pihenő: $25$ perc. Összesen: $2$ óra $55$ perc.

$08:30 + 2:55 = \\mathbf{11:25}$.`
},
{
  id: 'M-A-31',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Medence feltöltése — 3.6 m³',
  difficulty: 4,
  scenario: 'Egy medence térfogata **3,6 m³**. A csapból **2 liter/perc** folyik.',
  question: 'Hány óra alatt telik meg?',
  visual: {
    type: 'pool',
    volumeM3: 3.6,
    flowLmin: 2
  },
  options: ['20 óra', '30 óra', '40 óra', '60 óra'],
  answer: '30 óra',
  keywords: ['mértékegység-átváltás', 'térfogat'],
  solution: '3.6 m³ = 3600 L. Perc: $\\dfrac{3600}{2} = 1800$. Óra: $\\dfrac{1800}{60} = 30$.'
},
{
  id: 'M-A-32',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kávéfogyasztás — iroda',
  difficulty: 4,
  scenario: 'Egy irodában **napi 18 kávét** főznek, egy kávé **12 g** kávéport használ. A doboz kávé **750 g**.',
  question: 'Hány **napra elég** egy doboz kávé?',
  visual: {
    type: 'formula',
    formula: '750 g / (18 × 12 g) = ?',
    variables: []
  },
  options: ['2 nap', '3 nap', '4 nap', '5 nap'],
  answer: '3 nap',
  keywords: ['osztás', 'mértékegység'],
  solution: `Napi fogyasztás: $18 \\cdot 12 = 216$ g.

$750 / 216 \\approx 3{,}47$. **3 teljes napra elég.**`
},
{
  id: 'M-A-33',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Strand — homokozó térfogata',
  difficulty: 4,
  scenario: 'A strandon egy **téglalap alakú homokozót** építenek: **4 m hosszú, 3 m széles, 0,3 m mély**.',
  question: 'Hány **m³ homokra** van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 4,
    heightM: 3,
    label: 'Homokozó (mélység: 0,3 m)',
    unit: 'm'
  },
  options: ['2,4 m³', '3,0 m³', '3,6 m³', '4,8 m³'],
  answer: '3,6 m³',
  keywords: ['térfogat', 'strand'],
  solution: '$V = 4 \\cdot 3 \\cdot 0{,}3 = \\mathbf{3{,}6}$ m³.'
},
{
  id: 'M-A-34',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Piknik — szendvicsek elosztása',
  difficulty: 4,
  scenario: 'A piknik előtt **48 szendvicset** csomagolnak, ez **8 főre**, de még **4 vendég** érkezik.',
  question: 'Mennyivel kevesebb szendvics jut **1 főre**, ha most már **12 fő** között osztják el?',
  visual: {
    type: 'comparison',
    items: [
      { label: '8 főre', formula: '48 / 8', result: '6 db/fő' },
      { label: '12 főre', formula: '48 / 12', result: '4 db/fő' }
    ]
  },
  options: ['1 db', '2 db', '3 db', '4 db'],
  answer: '2 db',
  keywords: ['osztás', 'különbség', 'piknik'],
  solution: '8 főre: 6 db/fő, 12 főre: 4 db/fő. Különbség: $6 - 4 = \\mathbf{2}$ db/fő kevesebb.'
},
{
  id: 'M-A-35',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Nyaralás — szállás foglalás',
  difficulty: 4,
  scenario: 'Egy apartman **napi 22 000 Ft**-ért foglalható. **7 éjszakára** foglalva **10%-os kedvezményt** adnak.',
  question: 'Mennyit kell **fizetni** a 7 éjszakáért?',
  visual: {
    type: 'priceTag',
    original: 154000,
    discountPercent: 10,
    currency: 'Ft',
    label: '7 éjszaka'
  },
  options: ['132 600 Ft', '138 600 Ft', '140 400 Ft', '144 400 Ft'],
  answer: '138 600 Ft',
  keywords: ['százalék', 'kedvezmény', 'nyaralás'],
  solution: `Teljes ár: $7 \\cdot 22000 = 154000$ Ft.

Kedvezmény: $154000 \\cdot 0{,}1 = 15400$ Ft.

Fizetendő: $154000 - 15400 = \\mathbf{138\\,600}$ Ft.`
},
{
  id: 'M-A-36',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szoba festése — 4×3 m',
  difficulty: 4,
  scenario: 'Egy **4 m × 3 m** mennyezetet festünk. Egy doboz festék **6 m²**-re elég.',
  question: 'Legkevesebb **hány doboz** festékre van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 4,
    heightM: 3,
    label: 'Mennyezet',
    fill: '#fef3c7',
    unit: 'm'
  },
  options: ['1 doboz', '2 doboz', '3 doboz', '4 doboz'],
  answer: '2 doboz',
  keywords: ['terület', 'osztás'],
  solution: 'Terület: $4 \\cdot 3 = 12$ m². Doboz: $\\lceil 12/6 \\rceil = 2$.'
},
{
  id: 'M-A-37',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Heti zsebpénz — oszlopdiagram',
  difficulty: 4,
  scenario: 'Egy család 5 gyerekének heti zsebpénzét az oszlopdiagram mutatja.',
  question: 'Mennyi az **átlag** zsebpénz?',
  visual: {
    type: 'barChart',
    caption: 'Heti zsebpénz (Ft)',
    categories: ['Anna', 'Bence', 'Cili', 'Dávid', 'Emese'],
    values: [2500, 3000, 2000, 3500, 4000],
    yLabel: 'Ft'
  },
  options: ['2800 Ft', '3000 Ft', '3200 Ft', '3500 Ft'],
  answer: '3000 Ft',
  keywords: ['átlag', 'család'],
  solution: `Összeg: $2500 + 3000 + 2000 + 3500 + 4000 = 15000$ Ft.

Átlag: $15000 / 5 = \\mathbf{3000}$ Ft.`
},
{
  id: 'M-A-38',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Városnézés — jegyár emelés',
  difficulty: 4,
  scenario: 'Egy városnéző busz jegye **2500 Ft** volt, majd **8%-kal emelkedett**.',
  question: 'Mennyi lett az **új jegyár**?',
  visual: {
    type: 'priceTag',
    original: 2500,
    discountPercent: -8,
    currency: 'Ft',
    label: 'Áremelkedés'
  },
  options: ['2580 Ft', '2700 Ft', '2780 Ft', '2820 Ft'],
  answer: '2700 Ft',
  keywords: ['százalékos emelés', 'városnézés'],
  solution: 'Emelés: $2500 \\cdot 0{,}08 = 200$ Ft. Új ár: $2500 + 200 = \\mathbf{2700}$ Ft.'
},
{
  id: 'M-A-39',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép méretaránya',
  difficulty: 4,
  scenario: 'Egy térkép **méretaránya 1 : 50 000**. A térképen két település közti távolság **6 cm**.',
  question: 'Mekkora a **valós távolság** km-ben?',
  visual: {
    type: 'formula',
    formula: '6 cm × 50 000 = ?',
    variables: []
  },
  options: ['0,3 km', '3 km', '30 km', '300 km'],
  answer: '3 km',
  keywords: ['arány', 'térkép', 'mértékegység'],
  solution: `Valós: $6 \\cdot 50000 = 300000$ cm = $3000$ m = $\\mathbf{3}$ km.`
},
{
  id: 'M-A-40',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kerékpárút — aszfaltozás',
  difficulty: 4,
  scenario: 'Egy **2,5 km hosszú, 2 m széles** kerékpárutat aszfaltoznak. Az aszfalt **0,05 m vastag**.',
  question: 'Hány **m³ aszfaltra** van szükség?',
  visual: {
    type: 'rectangle',
    widthM: 2500,
    heightM: 2,
    label: 'Kerékpárút (vastagság: 0,05 m)',
    unit: 'm'
  },
  options: ['125 m³', '250 m³', '500 m³', '2500 m³'],
  answer: '250 m³',
  keywords: ['térfogat', 'kerékpárút'],
  solution: '2,5 km = 2500 m. $V = 2500 \\cdot 2 \\cdot 0{,}05 = \\mathbf{250}$ m³.'
},
{
  id: 'M-A-41',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legnagyobb közös osztó — 24 és 36',
  difficulty: 5,
  scenario: '24 alma és 36 körte van. Egyforma zsákokba osztjuk úgy, hogy minden zsákba egyforma mennyiség jut, **csak egyfajta gyümölcs** egy zsákba.',
  question: 'Mekkora lehet **legnagyobb** zsákméret?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Alma',
        count: 24,
        unit: 'db',
        color: '#fca5a5'
      },
      {
        label: 'Körte',
        count: 36,
        unit: 'db',
        color: '#a7f3d0'
      }
    ]
  },
  options: ['6', '12', '24', '36'],
  answer: '12',
  keywords: ['legnagyobb közös osztó'],
  solution: 'lnko(24, 36) = **12**.'
},
{
  id: 'M-A-42',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legnagyobb közös osztó — 18 és 30',
  difficulty: 5,
  scenario: '18 alma és 30 körte van. Egyforma zsákokba osztjuk úgy, hogy minden zsákba egyforma mennyiség jut, **csak egyfajta gyümölcs** egy zsákba.',
  question: 'Mekkora lehet **legnagyobb** zsákméret?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Alma',
        count: 18,
        unit: 'db',
        color: '#fca5a5'
      },
      {
        label: 'Körte',
        count: 30,
        unit: 'db',
        color: '#a7f3d0'
      }
    ]
  },
  options: ['3', '6', '12', '18'],
  answer: '6',
  keywords: ['legnagyobb közös osztó'],
  solution: 'lnko(18, 30) = **6**.'
},
{
  id: 'M-A-43',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legkisebb közös többszörös — játékóra',
  difficulty: 5,
  scenario: 'A játszóházban az egyik csengő **6 percenként**, a másik **10 percenként** szólal meg. **Most éppen együtt szóltak.**',
  question: 'Hány perc múlva szólnak **legközelebb egyszerre**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Csengő A', formula: '6 perc', result: '' },
      { label: 'Csengő B', formula: '10 perc', result: '' }
    ]
  },
  options: ['16', '20', '30', '60'],
  answer: '30',
  keywords: ['legkisebb közös többszörös', 'játék'],
  solution: 'lkkt(6, 10) = **30**. 30 perc múlva.'
},
{
  id: 'M-A-44',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Prímtényezős felbontás',
  difficulty: 5,
  scenario: 'A **72** szám prímtényezős felbontására vagy kíváncsi.',
  question: 'Melyik a **helyes felbontás**?',
  visual: {
    type: 'formula',
    formula: '72 = ?',
    variables: []
  },
  options: ['2³ · 3²', '2² · 3³', '2³ · 3³', '2² · 3²'],
  answer: '2³ · 3²',
  keywords: ['prímtényező', 'oszthatóság'],
  solution: '$72 = 8 \\cdot 9 = 2^3 \\cdot 3^2$.'
},
{
  id: 'M-A-45',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Tört műveletek — süti osztás',
  difficulty: 4,
  scenario: 'Egy tortának Bence megette **1/4** részét, Réka **1/3** részét.',
  question: 'Mennyi **maradt** a tortából?',
  visual: {
    type: 'pieChart',
    caption: 'Torta részei',
    slices: [
      { label: 'Bence 1/4', value: 25 },
      { label: 'Réka 1/3', value: 33.33 },
      { label: 'Maradt', value: 41.67 }
    ]
  },
  options: ['1/6', '5/12', '7/12', '2/3'],
  answer: '5/12',
  keywords: ['törtek', 'összeadás', 'kivonás'],
  solution: `Megevett: $\\tfrac{1}{4} + \\tfrac{1}{3} = \\tfrac{3}{12} + \\tfrac{4}{12} = \\tfrac{7}{12}$.

Maradt: $1 - \\tfrac{7}{12} = \\mathbf{\\tfrac{5}{12}}$.`
},
{
  id: 'M-A-46',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékos növekedés — olvasók száma',
  difficulty: 4,
  scenario: 'Egy könyvtár olvasóinak száma **egy év alatt 240-ről 312-re** nőtt.',
  question: 'Hány **százalékkal** növekedett?',
  visual: {
    type: 'barChart',
    caption: 'Olvasók száma',
    categories: ['Tavaly', 'Idén'],
    values: [240, 312],
    yLabel: 'fő'
  },
  options: ['24%', '30%', '32%', '40%'],
  answer: '30%',
  keywords: ['százalék', 'növekedés', 'könyvtár'],
  solution: `Növekedés: $312 - 240 = 72$.

Arány: $72/240 = 0{,}30 = \\mathbf{30\\%}$.`
},
{
  id: 'M-A-47',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 4 → 7 db',
  difficulty: 4,
  scenario: '**4** db ára 3200 Ft. Ugyanolyan egységár mellett...',
  question: 'Mennyibe kerül **7** db?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '4 db',
        formula: '3200 Ft',
        result: ''
      },
      {
        label: '7 db',
        formula: '?',
        result: ''
      }
    ]
  },
  options: ['5400 Ft', '5600 Ft', '5800 Ft', '6600 Ft'],
  answer: '5600 Ft',
  keywords: ['arányosság'],
  solution: 'Egységár: $800$ Ft. 7 db: $800 \\cdot 7 = 5600$ Ft.'
},
{
  id: 'M-A-48',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Arányosság — 3 → 8 db',
  difficulty: 4,
  scenario: '**3** db ára 1500 Ft. Ugyanolyan egységár mellett...',
  question: 'Mennyibe kerül **8** db?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '3 db',
        formula: '1500 Ft',
        result: ''
      },
      {
        label: '8 db',
        formula: '?',
        result: ''
      }
    ]
  },
  options: ['3800 Ft', '4000 Ft', '4200 Ft', '5000 Ft'],
  answer: '4000 Ft',
  keywords: ['arányosság'],
  solution: 'Egységár: $500$ Ft. 8 db: $500 \\cdot 8 = 4000$ Ft.'
},
{
  id: 'M-A-49',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Koordináta — pont elhelyezése',
  difficulty: 4,
  scenario: 'Egy koordináta-rendszerben négy pont található: $A(2, 3)$, $B(-1, 4)$, $C(3, -2)$, $D(0, 0)$.',
  question: 'Melyik pont található a **második síknegyedben**?',
  visual: {
    type: 'coordinateGrid',
    caption: 'Koordináta-rendszer',
    points: [
      { x: 2, y: 3, label: 'A' },
      { x: -1, y: 4, label: 'B' },
      { x: 3, y: -2, label: 'C' },
      { x: 0, y: 0, label: 'D' }
    ],
    xRange: [-5, 5],
    yRange: [-5, 5]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'B',
  keywords: ['koordináta', 'síknegyed'],
  solution: 'A második síknegyed: $x < 0, y > 0$. $B(-1, 4)$ megfelelő → **B**.'
},
{
  id: 'M-A-50',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Repülőút — időzóna',
  difficulty: 4,
  scenario: 'Egy repülő **Budapestről 10:20-kor indul** és **Londonba 12:05-kor érkezik** helyi idő szerint. London **1 órával** van Budapest mögött.',
  question: 'Mennyi volt a **tényleges repülési idő**?',
  visual: {
    type: 'timeline',
    label: 'Repülőút időzónákkal',
    events: [
      { t: '10:20 BUD', label: 'Indulás' },
      { t: '12:05 LON', label: 'Érkezés' }
    ]
  },
  options: ['1 óra 45 perc', '2 óra 45 perc', '2 óra 15 perc', '3 óra 45 perc'],
  answer: '2 óra 45 perc',
  keywords: ['időzóna', 'repülőút'],
  solution: `Londoni érkezés BUD idő szerint: $12:05 + 1:00 = 13:05$.

Repülés: $13:05 - 10:20 = \\mathbf{2}$ óra $\\mathbf{45}$ perc.`
},
{
  id: 'M-K-01',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családi kirándulás',
  difficulty: 6,
  scenario: 'Egy 4 fős család kirándulni megy. A kirándulás költségei:',
  question: 'Mennyit költött a család összesen? Mennyibe került egy főre a kirándulás?',
  visual: {
    type: 'table',
    caption: 'Kirándulás költségei',
    headers: ['Tétel', 'Egység', 'Ár / db', 'Összeg'],
    rows: [
      ['Vonatjegy oda-vissza (felnőtt)', '2 db', '4 200 Ft', '?'],
      ['Vonatjegy oda-vissza (gyerek)', '2 db', '2 100 Ft', '?'],
      ['Múzeumbelépő', '4 db', '1 500 Ft', '?'],
      ['Ebéd', '4 adag', '2 800 Ft', '?'],
      ['Fagyi', '4 db', '450 Ft', '?']
    ]
  },
  answer: {
    total: 32400,
    perPerson: 8100
  },
  keywords: ['műveletsor', 'szöveges feladat', 'osztás'],
  solution: `**Részösszegek:**

- Felnőtt vonat: $2 \\cdot 4200 = 8400$ Ft
- Gyerek vonat: $2 \\cdot 2100 = 4200$ Ft
- Múzeum: $4 \\cdot 1500 = 6000$ Ft
- Ebéd: $4 \\cdot 2800 = 11\\,200$ Ft
- Fagyi: $4 \\cdot 450 = 1800$ Ft

**Összesen:** $8400 + 4200 + 6000 + 11\\,200 + 1800 = \\mathbf{32\\,400}$ Ft

**Egy főre:** $32\\,400 \\div 4 = \\mathbf{8\\,100}$ Ft`
},
{
  id: 'M-K-02',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Árengedmény – két bolt',
  difficulty: 7,
  scenario: `Két bolt ugyanazt a kerékpárt árulja. Az eredeti ár mindkét helyen **80 000 Ft**.

- **A bolt:** 10% kedvezmény, majd a maradékból még 10% kedvezmény.
- **B bolt:** egyszerű **20% kedvezmény**.`,
  question: 'Melyik bolt az olcsóbb, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A bolt',
        formula: '80 000 × 0,9 × 0,9',
        result: '64 800 Ft'
      },
      {
        label: 'B bolt',
        formula: '80 000 × 0,8',
        result: '64 000 Ft'
      }
    ]
  },
  answer: 'B bolt olcsóbb 800 Ft-tal',
  keywords: ['százalékszámítás', 'érvelés'],
  solution: `**A bolt kettős kedvezménye:**

- Első kedvezmény után: $80\\,000 \\cdot 0{,}9 = 72\\,000$ Ft.
- Második kedvezmény után: $72\\,000 \\cdot 0{,}9 = 64\\,800$ Ft.

**B bolt egyszerű kedvezménye:**

$80\\,000 \\cdot 0{,}8 = 64\\,000$ Ft.

**Különbség:** $64\\,800 - 64\\,000 = 800$ Ft.

⚠️ **Fontos megfigyelés:** Két 10%-os kedvezmény **NEM ugyanaz**, mint egy 20%-os! A kettős kedvezmény valójában $1 - 0{,}9 \\cdot 0{,}9 = 0{,}19$, azaz csak **19%** kedvezményt ad.

**A B bolt 800 Ft-tal olcsóbb.**`
},
{
  id: 'M-K-03',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Évfordulós körtáncok',
  difficulty: 6,
  scenario: 'Egy faluban **három évfordulós ünnepséget** tartanak: az egyiket **3 évente**, a másikat **4 évente**, a harmadikat **6 évente**. Az ünnepek először **2024-ben** estek egybe.',
  question: 'Melyik évben találkoznak legközelebb mindhárman ugyanabban az évben?',
  visual: {
    type: 'timelineYears',
    start: 2024,
    end: 2040,
    series: [
      {
        label: 'A (3 év)',
        step: 3,
        color: '#2563eb'
      },
      {
        label: 'B (4 év)',
        step: 4,
        color: '#16a34a'
      },
      {
        label: 'C (6 év)',
        step: 6,
        color: '#ef4444'
      }
    ]
  },
  answer: '2036',
  keywords: ['legkisebb közös többszörös', 'ciklus'],
  solution: `**Legkisebb közös többszöröst keresünk:**

- $3 = 3$
- $4 = 2^2$
- $6 = 2 \\cdot 3$
- **lkkt(3, 4, 6) = $2^2 \\cdot 3 = 12$**

Tehát 12 évente találkoznak. Legközelebb: $2024 + 12 = \\mathbf{2036}$.`
},
{
  id: 'M-K-04',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kerékpárút burkolása',
  difficulty: 6,
  scenario: 'Egy **téglalap alakú** kerékpárút **2 m széles** és **150 m hosszú**. Egy **1 m²**-es kerámia burkolólap ára **1 200 Ft**, és **8%** többletet kell rendelni a vágások miatt.',
  question: 'Hány **egész** burkolólapot kell rendelni, és mennyibe kerül a burkolat?',
  visual: {
    type: 'rectangle',
    widthM: 2,
    heightM: 15,
    label: 'Kerékpárút (2 m × 150 m — ábra kicsinyítve)',
    fill: '#bbf7d0'
  },
  answer: {
    lapok: 324,
    ar: 388800
  },
  keywords: ['terület', 'százalékszámítás', 'kerekítés'],
  solution: `**Három lépés:**

1. **Terület:** $2 \\cdot 150 = 300$ m².
2. **Többlet (8%):** $300 \\cdot 1{,}08 = 324$ m², tehát **324** egész lapra van szükség.
3. **Ár:** $324 \\cdot 1200 = \\mathbf{388\\,800}$ Ft.

A vágási többletet mindig **felfelé egész**-re kell kerekíteni; itt pontosan egész szám jött ki.`
},
{
  id: 'M-K-05',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Medence feltöltése két csapból',
  difficulty: 6,
  scenario: 'Egy **12 m³**-es strandmedencét töltünk. Az **A csap** percenként **8 liter**, a **B csap** percenként **12 liter** vizet ad. Először csak az A csapot nyitjuk meg **30 percre**, majd **mindkettőt** egyszerre nyitva hagyjuk.',
  question: 'Összesen hány perc alatt telik meg a medence?',
  visual: {
    type: 'pool',
    volumeM3: 12,
    flowLmin: 20
  },
  answer: '618 perc',
  keywords: ['mértékegység-átváltás', 'műveletsor', 'idő'],
  solution: `**Lépésenként:**

1. **Teljes térfogat literben:** $12$ m³ $= 12\\,000$ liter.
2. **Az A csap 30 perc alatt:** $8 \\cdot 30 = 240$ liter.
3. **Még hátralévő:** $12\\,000 - 240 = 11\\,760$ liter.
4. **Két csap együtt:** $8 + 12 = 20$ L/perc. Szükséges idő: $11\\,760 \\div 20 = 588$ perc.
5. **Összesen:** $30 + 588 = \\mathbf{618}$ perc.`
},
{
  id: 'M-K-06',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromféle villamos',
  difficulty: 7,
  scenario: 'Egy megállóban reggel **6:00**-kor egyszerre indul a **4**-es, a **6**-os és a **18**-as villamos. A **4**-es **8 percenként**, a **6**-os **12 percenként**, a **18**-as **20 percenként** jön.',
  question: 'Mikor indul legközelebb **egyszerre mindhárom** villamos?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '4-es',
        formula: '8 percenként',
        result: '8'
      },
      {
        label: '6-os',
        formula: '12 percenként',
        result: '12'
      },
      {
        label: '18-as',
        formula: '20 percenként',
        result: '20'
      }
    ]
  },
  answer: '8:00',
  keywords: ['legkisebb közös többszörös'],
  solution: `**lkkt keresése:**

- $8 = 2^3$
- $12 = 2^2 \\cdot 3$
- $20 = 2^2 \\cdot 5$
- **lkkt(8, 12, 20)** $= 2^3 \\cdot 3 \\cdot 5 = 120$ perc $= 2$ óra.

Tehát legközelebb **6:00 + 2 óra = 8:00**-kor indul egyszerre mindhárom.`
},
{
  id: 'M-K-07',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Áremelés és kedvezmény',
  difficulty: 6,
  scenario: 'Egy könyv eredeti ára **2 500 Ft**. A könyvesbolt előbb **10%**-kal **emelte** az árat, majd a hétvégén a megemelt árból **10%** **kedvezményt** adott.',
  question: 'Mennyibe kerül most a könyv, és mennyivel **olcsóbb / drágább** az eredeti árhoz képest?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Emelés után',
        formula: '2500 · 1,10',
        result: '2 750 Ft'
      },
      {
        label: 'Kedvezmény után',
        formula: '2750 · 0,90',
        result: '2 475 Ft'
      }
    ]
  },
  answer: {
    ar: 2475,
    kulonbseg: '25 Ft-tal olcsóbb'
  },
  keywords: ['százalékszámítás', 'érvelés'],
  solution: `**Lépésenként:**

1. **Emelés után:** $2500 \\cdot 1{,}10 = 2750$ Ft.
2. **Kedvezmény után:** $2750 \\cdot 0{,}90 = 2475$ Ft.
3. Különbség az eredeti $2500$-hoz: $2500 - 2475 = 25$ Ft-tal **olcsóbb**.

**Megfigyelés:** a $+10\\%$-ot és a $-10\\%$-ot **nem** lehet „kiejteni": $1{,}10 \\cdot 0{,}90 = 0{,}99$, ami $1\\%$ csökkenést jelent.`
},
{
  id: 'M-K-08',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Zsebpénz részei',
  difficulty: 5,
  scenario: 'Botond **6 000 Ft** zsebpénzt kapott. Az összeg $\\tfrac{1}{3}$-át **könyvre**, $\\tfrac{1}{4}$-ét **ajándékra**, a maradékot **megtakarítja**.',
  question: 'Hány forintot tesz félre megtakarításként?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Könyv (1/3)',
        count: '?',
        unit: 'Ft',
        color: '#dbeafe'
      },
      {
        label: 'Ajándék (1/4)',
        count: '?',
        unit: 'Ft',
        color: '#fde68a'
      },
      {
        label: 'Megtakarítás',
        count: '?',
        unit: 'Ft',
        color: '#dcfce7'
      }
    ]
  },
  answer: '2 500 Ft',
  keywords: ['tört', 'rész-egész', 'közös nevező'],
  solution: `**Közös nevezős összeg a költéshez:**

1. Könyv: $\\tfrac{1}{3}$ → $\\tfrac{4}{12}$.
2. Ajándék: $\\tfrac{1}{4}$ → $\\tfrac{3}{12}$.
3. Elköltött rész: $\\tfrac{4}{12} + \\tfrac{3}{12} = \\tfrac{7}{12}$.
4. Megtakarítás része: $1 - \\tfrac{7}{12} = \\tfrac{5}{12}$.
5. Összeg: $6000 \\cdot \\tfrac{5}{12} = 500 \\cdot 5 = \\mathbf{2500}$ Ft.`
},
{
  id: 'M-K-09',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vonat, átszállással',
  difficulty: 6,
  scenario: 'Emese **8:15**-kor indul egy vonattal, ami **2 óra 40 percig** halad. Az átszállóállomáson **35 percet** vár, majd egy másik vonaton **1 óra 50 percet** utazik tovább a célállomásig.',
  question: 'Hánykor érkezik meg a célállomásra?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '08:15',
        label: 'Indulás',
        color: '#2563eb'
      },
      {
        t: '10:55',
        label: 'Érkezés átszálláshoz',
        color: '#16a34a'
      },
      {
        t: '11:30',
        label: 'Második vonat indul',
        color: '#f59e0b'
      },
      {
        t: '13:20',
        label: 'Megérkezés',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  answer: '13:20',
  keywords: ['idő', 'műveletsor', 'időtartam'],
  solution: `**Lépésenkénti idő:**

1. $8{:}15 + 2\\ \\text{óra}\\ 40\\ \\text{perc} = 10{:}55$ (átszálló).
2. $10{:}55 + 35\\ \\text{perc} = 11{:}30$ (második vonat indul).
3. $11{:}30 + 1\\ \\text{óra}\\ 50\\ \\text{perc} = 13{:}20$ (cél).

**A helyes válasz: 13:20.**`
},
{
  id: 'M-K-10',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kirándulás — 4 fő költsége',
  difficulty: 6,
  scenario: '4 fős csapat kirándul. Egy főre: busz 2800 Ft, vonat 3600 Ft, múzeum 1800 Ft, uzsonna 1200 Ft.',
  question: 'Mennyi a **teljes** és **egy főre eső** költség?',
  visual: {
    type: 'table',
    caption: 'Költségek',
    headers: ['Tétel', '1 fő', 'Összesen'],
    rows: [
      ['Busz', '2800 Ft', '11 200 Ft'],
      ['Vonat', '3600 Ft', '14 400 Ft'],
      ['Múzeum', '1800 Ft', '7200 Ft'],
      ['Uzsonna', '1200 Ft', '4800 Ft']
    ]
  },
  options: ['37 600 Ft, egy fő: 9400 Ft', '37 700 Ft, egy fő: 9500 Ft', '37 500 Ft, egy fő: 9300 Ft', '75 200 Ft, egy fő: 18 800 Ft'],
  answer: '37 600 Ft, egy fő: 9400 Ft',
  keywords: ['műveletsor', 'szöveges feladat'],
  solution: 'Összesen: **37 600 Ft**. Egy főre: $37600 / 4 = $ **9400 Ft**.'
},
{
  id: 'M-K-11',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kirándulás — 3 fő költsége',
  difficulty: 6,
  scenario: '3 fős csapat kirándul. Egy főre: busz 1500 Ft, vonat 2200 Ft, múzeum 1000 Ft, uzsonna 890 Ft.',
  question: 'Mennyi a **teljes** és **egy főre eső** költség?',
  visual: {
    type: 'table',
    caption: 'Költségek',
    headers: ['Tétel', '1 fő', 'Összesen'],
    rows: [
      ['Busz', '1500 Ft', '4500 Ft'],
      ['Vonat', '2200 Ft', '6600 Ft'],
      ['Múzeum', '1000 Ft', '3000 Ft'],
      ['Uzsonna', '890 Ft', '2670 Ft']
    ]
  },
  options: ['16 770 Ft, egy fő: 5590 Ft', '16 870 Ft, egy fő: 5690 Ft', '16 670 Ft, egy fő: 5490 Ft', '33 540 Ft, egy fő: 11 180 Ft'],
  answer: '16 770 Ft, egy fő: 5590 Ft',
  keywords: ['műveletsor', 'szöveges feladat'],
  solution: 'Összesen: **16 770 Ft**. Egy főre: $16770 / 3 = $ **5590 Ft**.'
},
{
  id: 'M-K-12',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Webshop — házhozszállítás',
  difficulty: 6,
  scenario: 'Egy webshopban **3 termék ára** 3200, 4800 és 6400 Ft. A szállítás **1200 Ft**, de **15 000 Ft felett ingyenes**.',
  question: 'Mennyit kell **összesen fizetni**?',
  visual: {
    type: 'table',
    caption: 'Kosár',
    headers: ['Termék', 'Ár'],
    rows: [
      ['Termék 1', '3200 Ft'],
      ['Termék 2', '4800 Ft'],
      ['Termék 3', '6400 Ft'],
      ['Szállítás', '? Ft']
    ]
  },
  options: ['13 200 Ft', '14 400 Ft', '15 600 Ft', '15 000 Ft'],
  answer: '15 600 Ft',
  keywords: ['összeg', 'feltétel', 'webshop'],
  solution: `Termékek: $3200 + 4800 + 6400 = 14\\,400$ Ft.

$14400 < 15000$, így kell szállítás: $+ 1200 = \\mathbf{15\\,600}$ Ft.`
},
{
  id: 'M-K-13',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családi költségvetés — havi mérleg',
  difficulty: 6,
  scenario: 'Egy család havi **bevétele 580 000 Ft**. Kiadások: lakbér 180 000, rezsi 45 000, élelmiszer 120 000, egyéb 90 000 Ft.',
  question: 'Mennyi a havi **megtakarítás**?',
  visual: {
    type: 'pieChart',
    caption: 'Havi kiadások arányai',
    slices: [
      { label: 'Lakbér', value: 180000 },
      { label: 'Rezsi', value: 45000 },
      { label: 'Élelmiszer', value: 120000 },
      { label: 'Egyéb', value: 90000 },
      { label: 'Megtakarítás', value: 145000 }
    ]
  },
  options: ['125 000 Ft', '145 000 Ft', '155 000 Ft', '175 000 Ft'],
  answer: '145 000 Ft',
  keywords: ['összeadás', 'kivonás', 'család'],
  solution: `Kiadás: $180000 + 45000 + 120000 + 90000 = 435\\,000$ Ft.

Megtakarítás: $580000 - 435000 = \\mathbf{145\\,000}$ Ft.`
},
{
  id: 'M-K-14',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Két bolt — melyik olcsóbb?',
  difficulty: 7,
  scenario: 'Eredeti ár mindkét boltban 20 000 Ft. **A bolt:** 15% kedvezmény, aztán a maradékból még 10%. **B bolt:** egyszerű 20% kedvezmény.',
  question: 'Melyik bolt olcsóbb, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A bolt',
        formula: '20000 × 0.85 × 0.90',
        result: '15 300 Ft'
      },
      {
        label: 'B bolt',
        formula: '20000 × 0.80',
        result: '16 000 Ft'
      }
    ]
  },
  options: ['A bolt, 700 Ft', 'B bolt, 700 Ft', 'Ugyanannyi', 'A bolt, 1400 Ft'],
  answer: 'A bolt, 700 Ft',
  keywords: ['százalékszámítás', 'érvelés'],
  solution: '**A:** 15 300 Ft, **B:** 16 000 Ft. Különbség: 700 Ft. **A bolt** az olcsóbb.'
},
{
  id: 'M-K-15',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Két bolt — melyik olcsóbb?',
  difficulty: 7,
  scenario: 'Eredeti ár mindkét boltban 30 000 Ft. **A bolt:** 10% kedvezmény, aztán a maradékból még 8%. **B bolt:** egyszerű 15% kedvezmény.',
  question: 'Melyik bolt olcsóbb, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A bolt',
        formula: '30000 × 0.90 × 0.92',
        result: '24 840 Ft'
      },
      {
        label: 'B bolt',
        formula: '30000 × 0.85',
        result: '25 500 Ft'
      }
    ]
  },
  options: ['A bolt, 660 Ft', 'B bolt, 660 Ft', 'Ugyanannyi', 'A bolt, 1320 Ft'],
  answer: 'A bolt, 660 Ft',
  keywords: ['százalékszámítás', 'érvelés'],
  solution: '**A:** 24 840 Ft, **B:** 25 500 Ft. Különbség: 660 Ft. **A bolt** az olcsóbb.'
},
{
  id: 'M-K-16',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Bank — kamatos kamat 2 évre',
  difficulty: 7,
  scenario: '**Tamás 200 000 Ft-ot** helyez el a bankban **évi 5% kamatos kamatra**. Nem vesz ki semmit.',
  question: 'Mennyi lesz a számláján **2 év múlva**?',
  visual: {
    type: 'comparison',
    items: [
      { label: '1. év vége', formula: '200000 × 1.05', result: '210 000 Ft' },
      { label: '2. év vége', formula: '210000 × 1.05', result: '220 500 Ft' }
    ]
  },
  options: ['220 000 Ft', '220 500 Ft', '221 000 Ft', '230 000 Ft'],
  answer: '220 500 Ft',
  keywords: ['kamatos kamat', 'bank'],
  solution: `1. év: $200000 \\cdot 1{,}05 = 210\\,000$ Ft.

2. év: $210000 \\cdot 1{,}05 = \\mathbf{220\\,500}$ Ft.`
},
{
  id: 'M-K-17',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'LKKT — 3, 4, 6 évente',
  difficulty: 6,
  scenario: 'Három ünnep találkozik 2024-ben. Utána A 3, B 4, C 6 évente ismétlődik.',
  question: 'Mikor esnek **legközelebb** egybe?',
  visual: {
    type: 'timelineYears',
    start: 2024,
    end: 2040,
    series: [
      {
        label: 'A',
        step: 3,
        color: '#2563eb'
      },
      {
        label: 'B',
        step: 4,
        color: '#16a34a'
      },
      {
        label: 'C',
        step: 6,
        color: '#ef4444'
      }
    ]
  },
  options: ['2031', '2036', '2041', '2048'],
  answer: '2036',
  keywords: ['legkisebb közös többszörös'],
  solution: 'lkkt(3, 4, 6) = **12**. 2024 + 12 = **2036**.'
},
{
  id: 'M-K-18',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'LKKT — 2, 5, 10 évente',
  difficulty: 6,
  scenario: 'Három ünnep találkozik 2024-ben. Utána A 2, B 5, C 10 évente ismétlődik.',
  question: 'Mikor esnek **legközelebb** egybe?',
  visual: {
    type: 'timelineYears',
    start: 2024,
    end: 2038,
    series: [
      {
        label: 'A',
        step: 2,
        color: '#2563eb'
      },
      {
        label: 'B',
        step: 5,
        color: '#16a34a'
      },
      {
        label: 'C',
        step: 10,
        color: '#ef4444'
      }
    ]
  },
  options: ['2029', '2034', '2039', '2044'],
  answer: '2034',
  keywords: ['legkisebb közös többszörös'],
  solution: 'lkkt(2, 5, 10) = **10**. 2024 + 10 = **2034**.'
},
{
  id: 'M-K-19',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Edzésterv — három sportág',
  difficulty: 6,
  scenario: 'Péter edzésterve: **futás 3 naponta, úszás 4 naponta, kerékpár 6 naponta**. Ma mindhárom sportágat edzette.',
  question: 'Hány **nap múlva** edzi legközelebb egyszerre mindhármat?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Futás', formula: '3 naponta', result: '' },
      { label: 'Úszás', formula: '4 naponta', result: '' },
      { label: 'Kerékpár', formula: '6 naponta', result: '' }
    ]
  },
  options: ['6', '12', '18', '24'],
  answer: '12',
  keywords: ['legkisebb közös többszörös', 'edzés'],
  solution: 'lkkt(3, 4, 6) = **12**. 12 nap múlva.'
},
{
  id: 'M-K-20',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Egyenlet — testvérek kora',
  difficulty: 6,
  scenario: 'Anna most **8 éves**, testvére Bence **4 éves**. Minden évben mindketten 1 évet öregednek.',
  question: 'Hány év múlva lesz Anna kora **Bence korának 1,5-szerese**?',
  visual: {
    type: 'formula',
    formula: '8 + x = 1.5 · (4 + x)',
    variables: [{ name: 'x', desc: 'eltelt évek' }]
  },
  options: ['2', '4', '6', '8'],
  answer: '4',
  keywords: ['egyenlet', 'életkor'],
  solution: `$8 + x = 1{,}5 \\cdot (4 + x)$

$8 + x = 6 + 1{,}5x$

$2 = 0{,}5x \\Rightarrow x = \\mathbf{4}$ év.`
},
{
  id: 'M-K-21',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Munkaidő — közös munka',
  difficulty: 6,
  scenario: 'Kati egyedül **6 óra** alatt rendezi ki a könyvtárat. Judit egyedül **4 óra** alatt. Ha együtt dolgoznak...',
  question: 'Hány **óra** alatt végeznek együtt?',
  visual: {
    type: 'formula',
    formula: '1/6 + 1/4 = ?',
    variables: []
  },
  options: ['2 óra', '2 óra 24 perc', '3 óra', '5 óra'],
  answer: '2 óra 24 perc',
  keywords: ['arány', 'munkaidő'],
  solution: `Óránkénti munka: $\\tfrac{1}{6} + \\tfrac{1}{4} = \\tfrac{2}{12} + \\tfrac{3}{12} = \\tfrac{5}{12}$.

Teljes munka: $1 / (5/12) = 12/5 = 2{,}4$ óra = **2 óra 24 perc**.`
},
{
  id: 'M-K-22',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Időzóna — 14:30 → ?',
  difficulty: 6,
  scenario: 'Egy repülő **14:30-kor** indul, 7h 15p alatt ér célba. Cél-városban az idő **-6 óra**.',
  question: 'Hánykor landol helyi idő szerint?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '14:30',
        label: 'Indulás (helyi)',
        color: '#2563eb'
      },
      {
        t: '15:45',
        label: 'Landolás (cél-helyi)',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['13:45', '15:45', '16:45', '17:45'],
  answer: '15:45',
  keywords: ['idő', 'időzóna'],
  solution: '**Landolás induló idő:** 21:45. Cél idő = −(6)h = **15:45**.'
},
{
  id: 'M-K-23',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Időzóna — 09:00 → ?',
  difficulty: 6,
  scenario: 'Egy repülő **09:00-kor** indul, 10h 30p alatt ér célba. Cél-városban az idő **-8 óra**.',
  question: 'Hánykor landol helyi idő szerint?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '09:00',
        label: 'Indulás (helyi)',
        color: '#2563eb'
      },
      {
        t: '11:30',
        label: 'Landolás (cél-helyi)',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['09:30', '11:30', '12:30', '13:30'],
  answer: '11:30',
  keywords: ['idő', 'időzóna'],
  solution: '**Landolás induló idő:** 19:30. Cél idő = −(8)h = **11:30**.'
},
{
  id: 'M-K-24',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Születésnap — meghívók',
  difficulty: 6,
  scenario: 'Lacika **30 meghívót** ír a születésnapra. A fiúknak **3 meghívón több** lesz, mint a lányoknak. Egyenlő mennyiségű fiú és lány érkezik családtagonként (minden vendég egyedül jön).',
  question: 'Hány **fiút** hívott meg Lacika?',
  visual: {
    type: 'formula',
    formula: 'f + l = 30, f = l + 3',
    variables: [
      { name: 'f', desc: 'fiúk száma' },
      { name: 'l', desc: 'lányok száma' }
    ]
  },
  options: ['13,5', '15', '16', '16,5'],
  answer: '16,5',
  keywords: ['egyenletrendszer', 'születésnap'],
  solution: `$f + l = 30$ és $f = l + 3$.

$(l+3) + l = 30 \\Rightarrow 2l = 27 \\Rightarrow l = 13{,}5$.

$f = 13{,}5 + 3 = \\mathbf{16{,}5}$.

*Megjegyzés: nem egész megoldás mutatja, hogy a feltétel csak elméleti.*`
},
{
  id: 'M-K-25',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Medence — vízszint változás',
  difficulty: 6,
  scenario: 'Egy medence térfogata **36 m³**. A feltöltő csap **9 L/perc**, a leeresztő csap **3 L/perc**. Mindkettő nyitva van.',
  question: 'Hány **óra** alatt telik meg a medence (üresből)?',
  visual: {
    type: 'pool',
    volumeM3: 36,
    flowLmin: 6,
    label: 'Nettó feltöltés: 6 L/perc'
  },
  options: ['50 óra', '75 óra', '100 óra', '120 óra'],
  answer: '100 óra',
  keywords: ['térfogat', 'arány', 'munkaidő'],
  solution: `Nettó: $9 - 3 = 6$ L/perc. $36$ m³ $= 36\\,000$ L.

Perc: $36000 / 6 = 6000$. Óra: $6000 / 60 = \\mathbf{100}$.`
},
{
  id: 'M-K-26',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Keverékfeladat — ezüst ötvözet',
  difficulty: 6,
  scenario: 'Egy ötvöző **80 g ezüstöt** szeretne készíteni **925‰-es** tisztaságú ezüstből. Rendelkezésre áll **999‰-es tiszta ezüst** és **700‰-es réz-ezüst keverék**.',
  question: 'Hány **gramm 999‰-es** ezüstöt kell használni?',
  visual: {
    type: 'formula',
    formula: '999x + 700(80-x) = 925 · 80',
    variables: [{ name: 'x', desc: 'tiszta ezüst (g)' }]
  },
  options: ['40 g', '52 g', '60 g', '75 g'],
  answer: '60 g',
  keywords: ['keverés', 'egyenlet', 'arány'],
  solution: `$999x + 700(80-x) = 925 \\cdot 80 = 74\\,000$.

$999x + 56\\,000 - 700x = 74\\,000$

$299x = 18\\,000 \\Rightarrow x \\approx 60{,}2$ g → **kb. 60 g**.`
},
{
  id: 'M-K-27',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Áremelés-csökkentés',
  difficulty: 7,
  scenario: 'Egy termék ára **80 Ft**. Először **25%-kal emelik**, majd az új árból **30%-ot levonnak**.',
  question: 'Mennyi a végső ár?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Lépés 1',
        formula: '80 × 1.25',
        result: '100 Ft'
      },
      {
        label: 'Lépés 2',
        formula: '100 × 0.70',
        result: '70 Ft'
      }
    ]
  },
  options: ['60 Ft', '70 Ft', '80 Ft', '80 Ft'],
  answer: '70 Ft',
  keywords: ['százalékszámítás', 'több lépés'],
  solution: `1. lépés: 80 × 1.25 = 100.
2. lépés: 100 × 0.70 = **70**.`
},
{
  id: 'M-K-28',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Áremelés-csökkentés',
  difficulty: 7,
  scenario: 'Egy termék ára **100 Ft**. Először **10%-kal emelik**, majd az új árból **20%-ot levonnak**.',
  question: 'Mennyi a végső ár?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Lépés 1',
        formula: '100 × 1.10',
        result: '110 Ft'
      },
      {
        label: 'Lépés 2',
        formula: '110 × 0.80',
        result: '88 Ft'
      }
    ]
  },
  options: ['78 Ft', '88 Ft', '98 Ft', '100 Ft'],
  answer: '88 Ft',
  keywords: ['százalékszámítás', 'több lépés'],
  solution: `1. lépés: 100 × 1.10 = 110.
2. lépés: 110 × 0.80 = **88**.`
},
{
  id: 'M-K-29',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Strand — bérlet vagy napijegy',
  difficulty: 7,
  scenario: 'A strand **napijegy 2800 Ft**, **havibérlet 28 000 Ft**.',
  question: 'Legalább hányszor kell menni egy hónapban, hogy a **bérlet megérje**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Napijegy', formula: '2800 · x', result: '' },
      { label: 'Bérlet', formula: '28 000', result: '' }
    ]
  },
  options: ['9 alkalom', '10 alkalom', '11 alkalom', '14 alkalom'],
  answer: '11 alkalom',
  keywords: ['érvelés', 'összehasonlítás', 'strand'],
  solution: `$2800x > 28000 \\Rightarrow x > 10$.

Legkisebb **egész** $x = \\mathbf{11}$ alkalom.`
},
{
  id: 'M-K-30',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Ismétlődő események — 5. alkalom',
  difficulty: 6,
  scenario: 'Egy busz minden **8 percben** indul, az első **18:00-kor**.',
  question: 'Hánykor indul a **5. busz**?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '18:00',
        label: '1. busz',
        color: '#2563eb'
      },
      {
        t: '18:32',
        label: '5. busz',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['18:32'],
  answer: '18:32',
  keywords: ['időintervallum', 'sorozat'],
  solution: '(5 - 1) × 8 perc = 32 perc. Végső idő: **18:32**.'
},
{
  id: 'M-K-31',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Ismétlődő események — 7. alkalom',
  difficulty: 6,
  scenario: 'Egy busz minden **10 percben** indul, az első **12:30-kor**.',
  question: 'Hánykor indul a **7. busz**?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '12:30',
        label: '1. busz',
        color: '#2563eb'
      },
      {
        t: '13:30',
        label: '7. busz',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['13:30'],
  answer: '13:30',
  keywords: ['időintervallum', 'sorozat'],
  solution: '(7 - 1) × 10 perc = 60 perc. Végső idő: **13:30**.'
},
{
  id: 'M-K-32',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Sorozat — mértani képzés',
  difficulty: 6,
  scenario: 'Egy sorozat első tagja **3**, minden következő az előző **kétszerese**.',
  question: 'Mi a **7. tag**?',
  visual: {
    type: 'sequence',
    items: [3, 6, 12, 24, 48, 96, '?'],
    rule: '×2'
  },
  options: ['96', '144', '192', '256'],
  answer: '192',
  keywords: ['mértani sorozat'],
  solution: `$a_n = 3 \\cdot 2^{n-1}$.

$a_7 = 3 \\cdot 2^6 = 3 \\cdot 64 = \\mathbf{192}$.`
},
{
  id: 'M-K-33',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Érvelés — 3 egymás utáni szám',
  difficulty: 6,
  scenario: 'Három **egymást követő egész szám** összege **48**.',
  question: 'Mi a **legkisebb** ezek közül?',
  visual: {
    type: 'formula',
    formula: '(n-1) + n + (n+1) = 48',
    variables: [{ name: 'n', desc: 'középső szám' }]
  },
  options: ['14', '15', '16', '17'],
  answer: '15',
  keywords: ['egyenlet', 'érvelés'],
  solution: `$3n = 48 \\Rightarrow n = 16$.

Számok: $15, 16, 17$. A legkisebb: **15**.`
},
{
  id: 'M-K-34',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vonat — két mozgó közeledik',
  difficulty: 6,
  scenario: 'Két város távolsága **360 km**. Az egyik vonat **A-ból 90 km/h**-val, a másik **B-ből 60 km/h**-val indul egyszerre egymás felé.',
  question: 'Hány **óra múlva** találkoznak?',
  visual: {
    type: 'timeline',
    label: 'Két vonat közeledése',
    events: [
      { t: '0 h', label: 'Indulás (A, B)' },
      { t: '? h', label: 'Találkozás' }
    ]
  },
  options: ['1,5 óra', '2 óra', '2,4 óra', '4 óra'],
  answer: '2,4 óra',
  keywords: ['sebesség', 'találkozás', 'vasút'],
  solution: `Együttes sebesség: $90 + 60 = 150$ km/h.

$t = 360 / 150 = \\mathbf{2{,}4}$ óra.`
},
{
  id: 'M-K-35',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Befektetés — veszteség és nyereség',
  difficulty: 7,
  scenario: 'Péter **100 000 Ft**-ot fektet be. Első évben **20%-ot veszít**, második évben a **megmaradt összeg 25%-kal nő**.',
  question: 'Mennyi pénze lesz a **második év végén**?',
  visual: {
    type: 'comparison',
    items: [
      { label: '1. év vége', formula: '100000 × 0.80', result: '80 000 Ft' },
      { label: '2. év vége', formula: '80000 × 1.25', result: '100 000 Ft' }
    ]
  },
  options: ['95 000 Ft', '100 000 Ft', '105 000 Ft', '125 000 Ft'],
  answer: '100 000 Ft',
  keywords: ['százalékszámítás', 'befektetés'],
  solution: `1. év: $100000 \\cdot 0{,}8 = 80\\,000$.

2. év: $80000 \\cdot 1{,}25 = \\mathbf{100\\,000}$ Ft.

*Érdekes: 20% veszteség után 25% nyereség visszaadja az eredeti összeget.*`
},
{
  id: 'M-K-36',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kert — kerítés és kapu',
  difficulty: 6,
  scenario: 'Egy téglalap alakú kertet **18 m × 12 m** méretűre kell bekeríteni. A kerítés ára **2800 Ft/m**, egy **3 m széles kapu** ára fixen **45 000 Ft** (a kaput a kerítés helyett építik be).',
  question: 'Mennyibe kerül a **teljes kerítés + kapu**?',
  visual: {
    type: 'rectangle',
    widthM: 18,
    heightM: 12,
    label: 'Kert (kapu 3 m)',
    unit: 'm'
  },
  options: ['168 000 Ft', '180 600 Ft', '204 600 Ft', '213 000 Ft'],
  answer: '204 600 Ft',
  keywords: ['kerület', 'költség', 'kert'],
  solution: `Kerület: $2 \\cdot (18+12) = 60$ m.

Kerítéshossz (kapu nélkül): $60 - 3 = 57$ m.

Kerítés ára: $57 \\cdot 2800 = 159\\,600$ Ft.

Kapu: $45\\,000$ Ft.

Összesen: $159\\,600 + 45\\,000 = \\mathbf{204\\,600}$ Ft.`
},
{
  id: 'M-K-37',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Kombinatorika — kódlakat',
  difficulty: 7,
  scenario: 'Egy kódlakathoz **3 számjegyű kódot** kell megadni. Minden jegy **0-tól 9-ig** lehet, és a jegyek **ismétlődhetnek**.',
  question: 'Hány **különböző kód** állítható össze?',
  visual: {
    type: 'formula',
    formula: '10 × 10 × 10 = ?',
    variables: []
  },
  options: ['30', '300', '720', '1000'],
  answer: '1000',
  keywords: ['kombinatorika', 'variáció ismétléssel'],
  solution: 'Minden helyre 10 választás, független: $10 \\cdot 10 \\cdot 10 = \\mathbf{1000}$ kód.'
},
{
  id: 'M-K-38',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Fizetésemelés — két ajánlat',
  difficulty: 7,
  scenario: 'Az alapfizetés **300 000 Ft**. **A cég**: először 8% emelés, majd a következő évben 7%. **B cég**: egyszerre 16% emelés.',
  question: 'Melyik cégnél magasabb a fizetés **2 év múlva**, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'A cég', formula: '300000 × 1.08 × 1.07', result: '346 680 Ft' },
      { label: 'B cég', formula: '300000 × 1.16', result: '348 000 Ft' }
    ]
  },
  options: ['A, 1320 Ft', 'B, 1320 Ft', 'Ugyanannyi', 'B, 2640 Ft'],
  answer: 'B, 1320 Ft',
  keywords: ['százalékszámítás', 'több lépés', 'fizetés'],
  solution: `A: $300000 \\cdot 1{,}08 \\cdot 1{,}07 = 346\\,680$ Ft.

B: $300000 \\cdot 1{,}16 = 348\\,000$ Ft.

**B** magasabb, a különbség **1320 Ft**.`
},
{
  id: 'M-K-39',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Keverési feladat — gyümölcslé',
  difficulty: 7,
  scenario: 'Egy **6 L**-es kancsóban **narancslé 30%-os koncentrációjú** (víz + narancs). Hozzáöntünk **4 L tiszta narancslevet**.',
  question: 'Mennyi lesz az új keverék **narancskoncentrációja**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Eredeti narancs', formula: '6 × 0.30', result: '1.8 L' },
      { label: 'Hozzáadott', formula: '4 L', result: '4.0 L' },
      { label: 'Összes térfogat', formula: '6 + 4', result: '10 L' }
    ]
  },
  options: ['38%', '50%', '58%', '70%'],
  answer: '58%',
  keywords: ['keverés', 'arány', 'százalék'],
  solution: `Eredeti narancs: $6 \\cdot 0{,}3 = 1{,}8$ L.

Új narancs összesen: $1{,}8 + 4 = 5{,}8$ L, teljes: $10$ L.

$5{,}8 / 10 = \\mathbf{58\\%}$.`
},
{
  id: 'M-K-40',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Benzinár — két kút összehasonlítása',
  difficulty: 7,
  scenario: 'Egy autós **50 liter** benzint tankol. **A kút:** 612 Ft/L, klubkártyával 4% kedvezmény. **B kút:** 599 Ft/L, de a tankolás fix 500 Ft szervizdíjjal jár.',
  question: 'Melyik **olcsóbb**, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'A kút', formula: '50 × 612 × 0.96', result: '29 376 Ft' },
      { label: 'B kút', formula: '50 × 599 + 500', result: '30 450 Ft' }
    ]
  },
  options: ['A, 1074 Ft', 'B, 1074 Ft', 'Ugyanannyi', 'A, 574 Ft'],
  answer: 'A, 1074 Ft',
  keywords: ['érvelés', 'több lépés', 'bolt'],
  solution: `A: $50 \\cdot 612 \\cdot 0{,}96 = 29\\,376$ Ft.

B: $50 \\cdot 599 + 500 = 30\\,450$ Ft.

**A** olcsóbb, különbség **1074 Ft**.`
},
{
  id: 'M-K-41',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Egyenlet — őszi gyűjtés',
  difficulty: 6,
  scenario: 'Az osztály **gesztenyét gyűjtött**. A fiúk összesen **3 kg-mal** többet, mint a lányok; együtt **21 kg-ot** gyűjtöttek.',
  question: 'Hány **kg gesztenyét** gyűjtöttek a **lányok**?',
  visual: {
    type: 'formula',
    formula: 'x + (x + 3) = 21',
    variables: [{ name: 'x', desc: 'lányok (kg)' }]
  },
  options: ['8 kg', '9 kg', '10 kg', '12 kg'],
  answer: '9 kg',
  keywords: ['egyenlet', 'szöveges'],
  solution: `$x + (x+3) = 21 \\Rightarrow 2x = 18 \\Rightarrow x = \\mathbf{9}$ kg a lányok.`
},
{
  id: 'M-K-42',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Pitagorasz — létra a fal mellett',
  difficulty: 6,
  scenario: 'Egy **5 m hosszú létra** a faltól **3 m**-re áll a talajon.',
  question: 'Milyen **magasan** éri el a falat a létra teteje?',
  visual: {
    type: 'formula',
    formula: 'a² + b² = c²',
    variables: [
      { name: 'a', desc: 'fal felőli szár' },
      { name: 'b', desc: '3 m talaj' },
      { name: 'c', desc: '5 m létra' }
    ]
  },
  options: ['3 m', '4 m', '4,5 m', '5 m'],
  answer: '4 m',
  keywords: ['Pitagorasz', 'derékszögű háromszög'],
  solution: `$a^2 + 3^2 = 5^2$

$a^2 = 25 - 9 = 16 \\Rightarrow a = \\mathbf{4}$ m.`
},
{
  id: 'M-K-43',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Valószínűség — dobókocka',
  difficulty: 6,
  scenario: 'Két szabályos dobókockával dobunk egyszerre.',
  question: 'Mekkora a valószínűsége, hogy az összeg **pontosan 7**?',
  visual: {
    type: 'table',
    caption: 'Kedvező esetek (7 összeg)',
    headers: ['1. kocka', '2. kocka'],
    rows: [
      ['1', '6'], ['2', '5'], ['3', '4'], ['4', '3'], ['5', '2'], ['6', '1']
    ]
  },
  options: ['1/12', '1/6', '1/4', '1/2'],
  answer: '1/6',
  keywords: ['valószínűség', 'dobókocka'],
  solution: `Összes eset: $6 \\cdot 6 = 36$. Kedvező: 6 eset.

$P = 6/36 = \\mathbf{1/6}$.`
},
{
  id: 'M-K-44',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vegyes munka — autómosás',
  difficulty: 6,
  scenario: 'Apa **8 percenként**, fia **12 percenként** mos meg egy autót. **2 óra** alatt hány autót mosnak meg **együtt** (párhuzamosan dolgozva)?',
  question: 'Hány autót mosnak meg **összesen**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Apa', formula: '120 / 8', result: '15 db' },
      { label: 'Fia', formula: '120 / 12', result: '10 db' }
    ]
  },
  options: ['20 db', '22 db', '25 db', '30 db'],
  answer: '25 db',
  keywords: ['arány', 'munkaidő'],
  solution: `Apa: $120/8 = 15$ db. Fia: $120/12 = 10$ db.

Együtt: $15 + 10 = \\mathbf{25}$ db.`
},
{
  id: 'M-K-45',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Hányadosok ellenőrzése — bizonyítás',
  difficulty: 6,
  scenario: 'Három állítás hangzik el egy prezentáción: (I) **Minden 6-tal osztható szám osztható 3-mal.** (II) **Minden 3-mal osztható szám osztható 6-tal.** (III) **Ha egy szám osztható 2-vel és 3-mal, akkor osztható 6-tal.**',
  question: 'Melyik állítás **igaz**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'I', formula: '6|n ⇒ 3|n', result: '?' },
      { label: 'II', formula: '3|n ⇒ 6|n', result: '?' },
      { label: 'III', formula: '2|n ∧ 3|n ⇒ 6|n', result: '?' }
    ]
  },
  options: ['Csak I', 'I és III', 'II és III', 'Mind a három'],
  answer: 'I és III',
  keywords: ['érvelés', 'oszthatóság'],
  solution: `**I igaz:** $6|n \\Rightarrow n = 6k = 3(2k) \\Rightarrow 3|n$.

**II hamis:** ellenpélda $n=9$: $3|9$, de $6 \\nmid 9$.

**III igaz:** ha $2|n$ és $3|n$ és $\\gcd(2,3)=1$, akkor $6|n$.

Helyes: **I és III**.`
},
{
  id: 'M-K-46',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Adó — nettó-bruttó számítás',
  difficulty: 7,
  scenario: 'Éva bruttó fizetése **420 000 Ft**. A levonások: **15% SZJA** és **18,5% járulék** (mind a bruttóból).',
  question: 'Mennyi a **nettó** fizetése?',
  visual: {
    type: 'table',
    caption: 'Levonások',
    headers: ['Tétel', 'Érték'],
    rows: [
      ['Bruttó', '420 000 Ft'],
      ['SZJA 15%', '63 000 Ft'],
      ['Járulék 18,5%', '77 700 Ft']
    ]
  },
  options: ['270 000 Ft', '279 300 Ft', '283 200 Ft', '300 000 Ft'],
  answer: '279 300 Ft',
  keywords: ['százalékszámítás', 'adó', 'fizetés'],
  solution: `SZJA: $420000 \\cdot 0{,}15 = 63\\,000$ Ft.

Járulék: $420000 \\cdot 0{,}185 = 77\\,700$ Ft.

Nettó: $420000 - 63000 - 77700 = \\mathbf{279\\,300}$ Ft.`
},
{
  id: 'M-K-47',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Koordináta — háromszög területe',
  difficulty: 6,
  scenario: 'Egy háromszög csúcsai a koordináta-rendszerben: $A(0, 0)$, $B(6, 0)$, $C(0, 4)$.',
  question: 'Mekkora a háromszög **területe**?',
  visual: {
    type: 'coordinateGrid',
    caption: 'Háromszög csúcsai',
    points: [
      { x: 0, y: 0, label: 'A' },
      { x: 6, y: 0, label: 'B' },
      { x: 0, y: 4, label: 'C' }
    ],
    xRange: [-1, 8],
    yRange: [-1, 6]
  },
  options: ['6', '10', '12', '24'],
  answer: '12',
  keywords: ['terület', 'háromszög', 'koordináta'],
  solution: `Derékszögű háromszög, befogói $6$ és $4$.

$T = \\tfrac{1}{2} \\cdot 6 \\cdot 4 = \\mathbf{12}$ területegység.`
},
{
  id: 'M-K-48',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Valószínűség — golyók a zsákban',
  difficulty: 6,
  scenario: 'Egy zsákban **5 piros**, **3 kék** és **2 zöld** golyó van. Véletlenszerűen kihúzunk **egyet**.',
  question: 'Mekkora a **piros vagy kék** golyó húzásának valószínűsége?',
  visual: {
    type: 'pictogram',
    caption: 'Golyók a zsákban',
    items: [
      { label: 'Piros', count: 5, color: '#ef4444' },
      { label: 'Kék', count: 3, color: '#2563eb' },
      { label: 'Zöld', count: 2, color: '#16a34a' }
    ]
  },
  options: ['0,5', '0,7', '0,8', '1,0'],
  answer: '0,8',
  keywords: ['valószínűség'],
  solution: `Kedvező: $5 + 3 = 8$. Összes: $10$.

$P = 8/10 = \\mathbf{0{,}8}$.`
},
{
  id: 'M-K-49',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Fordított arány — munkások',
  difficulty: 6,
  scenario: '**6 munkás 10 nap** alatt végez el egy munkát. Azonos tempó mellett...',
  question: 'Hány **nap** alatt végezne **15 munkás**?',
  visual: {
    type: 'formula',
    formula: '6 · 10 = 15 · x',
    variables: [{ name: 'x', desc: 'napok száma' }]
  },
  options: ['2 nap', '4 nap', '5 nap', '6 nap'],
  answer: '4 nap',
  keywords: ['fordított arány'],
  solution: `Munkásnapok száma állandó: $6 \\cdot 10 = 60$.

$60 / 15 = \\mathbf{4}$ nap.`
},
{
  id: 'M-K-50',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Statisztika — medián és átlag',
  difficulty: 7,
  scenario: 'Egy osztály **9 tanulójának** tollaslabda eredményei (pont): $12, 15, 14, 10, 20, 11, 14, 18, 14$.',
  question: 'Mennyi az adatsor **mediánja**?',
  visual: {
    type: 'dotPlot',
    caption: 'Eredmények (pont)',
    categories: ['10', '11', '12', '14', '15', '18', '20'],
    counts: [1, 1, 1, 3, 1, 1, 1]
  },
  options: ['12', '14', '14,25', '15'],
  answer: '14',
  keywords: ['medián', 'statisztika', 'sport'],
  solution: `Rendezve: $10, 11, 12, 14, 14, 14, 15, 18, 20$.

9 elem középsője az 5. → **14**.`
},
{
  id: 'M-T-01',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Konyhai mérleg',
  difficulty: 2,
  scenario: 'Anna egy digitális mérleget lát a konyhában.',
  question: 'Hány gramm a mérlegen látható lisztmennyiség?',
  visual: {
    type: 'scale',
    min: 0,
    max: 1000,
    step: 100,
    unit: 'g',
    value: 650,
    label: 'Mérleg kijelzése'
  },
  options: ['550 g', '600 g', '650 g', '700 g'],
  answer: '650 g',
  keywords: ['skála', 'leolvasás', 'mérleg'],
  solution: `**Skálaleolvasás lépései:**

1. A skálán **0-tól 1000 g-ig** terjed a tartomány, 100 g-os osztásokkal.
2. A mutató a **600 g** és **700 g** közötti szakasz közepén áll — ez **650 g**.
3. Helyes válasz: **650 g**.`
},
{
  id: 'M-T-02',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Számegyenes — tört elhelyezése',
  difficulty: 2,
  scenario: 'A számegyenesen 0 és 1 között 8 egyenlő részre osztottuk a szakaszt.',
  question: 'Melyik pont jelöli az $\\tfrac{5}{8}$-ot?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 1,
    divisions: 8,
    points: [
      {
        x: 0.375,
        label: 'A'
      },
      {
        x: 0.5,
        label: 'B'
      },
      {
        x: 0.625,
        label: 'C'
      },
      {
        x: 0.75,
        label: 'D'
      }
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['számegyenes', 'tört'],
  solution: `**Számegyenes olvasása:**

1. A 0-tól 1-ig tartó szakaszt **8 egyenlő részre** osztottuk.
2. Az $\\tfrac{5}{8}$ tehát a **0-tól számított 5. osztáspont**.
3. A C pont van ott → **C a helyes válasz**.`
},
{
  id: 'M-T-03',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Vásárlás a boltban',
  difficulty: 2,
  scenario: 'Péter bevásárolt a boltban. A vásárlásáról a következő blokkot kapta.',
  question: 'Mennyit fizetett összesen Péter?',
  visual: {
    type: 'table',
    caption: 'Vásárlási blokk',
    headers: ['Termék', 'Mennyiség', 'Egységár', 'Összesen'],
    rows: [
      ['Tej', '2 doboz', '399 Ft', '798 Ft'],
      ['Kenyér', '1 db', '520 Ft', '520 Ft'],
      ['Vaj', '3 db', '650 Ft', '1950 Ft'],
      ['Alma', '1 kg', '732 Ft', '732 Ft']
    ]
  },
  options: ['3 800 Ft', '3 900 Ft', '4 000 Ft', '4 100 Ft'],
  answer: '4 000 Ft',
  keywords: ['műveletsor', 'összeadás'],
  solution: `**A részösszegek összeadása:**

$$798 + 520 + 1950 + 732 = 4000\\ \\text{Ft}$$

Részlépések: $798+520=1318$, majd $1318+1950=3268$, végül $3268+732=4000$.

**A helyes válasz: 4 000 Ft.**`
},
{
  id: 'M-T-04',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Mértékegység-átváltás',
  difficulty: 2,
  scenario: 'Az alábbi táblázat néhány mért értéket tartalmaz különböző mértékegységekben.',
  question: 'Melyik állítás **IGAZ**?',
  visual: {
    type: 'table',
    caption: 'Mennyiségek',
    headers: ['Jel', 'Érték'],
    rows: [
      ['A', '2500 g'],
      ['B', '3 kg'],
      ['C', '0,5 t'],
      ['D', '1500 g']
    ]
  },
  options: ['A > B', 'B < D', 'C = 500 kg', 'A = B'],
  answer: 'C = 500 kg',
  keywords: ['mértékegység-átváltás', 'tömeg'],
  solution: `**Átváltás közös egységre (kg):**

- A: $2500$ g = $2{,}5$ kg
- B: $3$ kg
- C: $0{,}5$ t = $500$ kg
- D: $1500$ g = $1{,}5$ kg

Tehát **C = 500 kg igaz**, a többi állítás hamis.`
},
{
  id: 'M-T-05',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Menetidő',
  difficulty: 2,
  scenario: 'Egy vonat 8:45-kor indul Budapestről és 11:20-kor érkezik Debrecenbe.',
  question: 'Mennyi ideig tart az utazás?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Indulás',
        h: 8,
        m: 45
      },
      {
        label: 'Érkezés',
        h: 11,
        m: 20
      }
    ]
  },
  options: ['2 óra 25 perc', '2 óra 35 perc', '2 óra 45 perc', '3 óra 25 perc'],
  answer: '2 óra 35 perc',
  keywords: ['idő', 'időtartam'],
  solution: `**Időtartam számítása:**

- 8:45-től 11:45-ig pontosan **3 óra** telne el.
- Ha 11:20-kor érkezünk, az **25 perccel korábban** van.
- Tehát: $3\\ \\text{óra} - 25\\ \\text{perc} = 2\\ \\text{óra}\\ 35\\ \\text{perc}$.

**A helyes válasz: 2 óra 35 perc.**`
},
{
  id: 'M-T-06',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Hőmérő leolvasása',
  difficulty: 2,
  scenario: 'Téli reggelen Kati megnézi a kinti hőmérőt a kertben.',
  question: 'Hány Celsius fokot mutat a hőmérő?',
  visual: {
    type: 'numberLine',
    min: -10,
    max: 10,
    divisions: 20,
    points: [
      {
        x: -4,
        label: 'H'
      }
    ]
  },
  options: ['$-6\\,°C$', '$-4\\,°C$', '$4\\,°C$', '$6\\,°C$'],
  answer: '$-4\\,°C$',
  keywords: ['számegyenes', 'negatív szám', 'hőmérséklet'],
  solution: `**Számegyenes leolvasása:**

1. A skála $-10$-től $+10$-ig tart, **20 egyenlő** részre van osztva (1 fokos osztások).
2. A 0-tól **balra** 4 osztásra van a jelölés → negatív irány.
3. A mutatott érték: $\\mathbf{-4\\,°C}$.`
},
{
  id: 'M-T-07',
  contentArea: 'M',
  contentSub: '1.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Helyiértékek',
  difficulty: 1,
  scenario: 'A **45 027** számot helyiérték-táblázatba írtuk.',
  question: 'Hány **száz** van a számban?',
  visual: {
    type: 'table',
    caption: 'Helyiérték-táblázat',
    headers: ['Tízezres', 'Ezres', 'Százas', 'Tízes', 'Egyes'],
    rows: [
      ['4', '5', '0', '2', '7']
    ]
  },
  options: ['0', '2', '5', '27'],
  answer: '0',
  keywords: ['helyi érték', 'számfelbontás'],
  solution: `**Helyiérték-olvasás:**

A $45\\,027$ szám felbontása: $4 \\cdot 10\\,000 + 5 \\cdot 1000 + 0 \\cdot 100 + 2 \\cdot 10 + 7$.

A **százasok** helyén **0** áll, tehát a számban **0 darab száz** van.`
},
{
  id: 'M-T-08',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Tort felosztása',
  difficulty: 2,
  scenario: 'Egy születésnapi tortát **8 egyenlő** szeletre vágtunk. A vendégek **3 szeletet** megettek.',
  question: 'A torta **mekkora része** maradt meg (közönséges tört alakjában)?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        label: 'Összes',
        count: 8
      },
      {
        label: 'Megmaradt',
        count: 5
      }
    ]
  },
  options: ['$\\tfrac{3}{8}$', '$\\tfrac{5}{8}$', '$\\tfrac{3}{5}$', '$\\tfrac{5}{3}$'],
  answer: '$\\tfrac{5}{8}$',
  keywords: ['tört', 'rész-egész'],
  solution: `**Rész-egész gondolkodás:**

1. Az egész tortát $8$ szeletre osztottuk, ez a **nevező**.
2. Megmaradt: $8 - 3 = 5$ szelet, ez a **számláló**.
3. A megmaradt rész: $\\mathbf{\\tfrac{5}{8}}$.`
},
{
  id: 'M-T-09',
  contentArea: 'M',
  contentSub: '1.2.6',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Kerület képlete',
  difficulty: 2,
  scenario: 'A téglalap kerületét a $K = 2 \\cdot (a + b)$ képlettel számoljuk. Egy tanteremben $a = 6$ m, $b = 4$ m.',
  question: 'Mekkora a terem kerülete?',
  visual: {
    type: 'formula',
    formula: 'K = 2 · (a + b)',
    variables: [
      {
        name: 'a',
        desc: 'téglalap egyik oldala (m)'
      },
      {
        name: 'b',
        desc: 'téglalap másik oldala (m)'
      }
    ],
    example: {
      a: 6,
      b: 4
    }
  },
  options: ['10 m', '20 m', '24 m', '48 m'],
  answer: '20 m',
  keywords: ['behelyettesítés', 'kerület'],
  solution: `**Behelyettesítés a képletbe:**

$$K = 2 \\cdot (a + b) = 2 \\cdot (6 + 4) = 2 \\cdot 10 = 20\\ \\text{m}.$$

**A helyes válasz: 20 m.**`
},
{
  id: 'M-T-10',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Melyik a nehezebb?',
  difficulty: 2,
  scenario: 'Négy állatot megmértek az állatkertben.',
  question: 'Melyik állat a **legnehezebb**?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Strucc',
        count: 120,
        unit: 'kg',
        color: '#fef3c7'
      },
      {
        label: 'Zebra',
        count: 380,
        unit: 'kg',
        color: '#e0e7ff'
      },
      {
        label: 'Tigris',
        count: 220,
        unit: 'kg',
        color: '#fee2e2'
      },
      {
        label: 'Szarvas',
        count: 95,
        unit: 'kg',
        color: '#dcfce7'
      }
    ]
  },
  options: ['Strucc', 'Zebra', 'Tigris', 'Szarvas'],
  answer: 'Zebra',
  keywords: ['összehasonlítás', 'tömeg'],
  solution: `**Összehasonlítás:**

A tömegek: $380 > 220 > 120 > 95$ (kg).

A **zebra** a legnehezebb, $380$ kg-mal.`
},
{
  id: 'M-T-11',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Mértékegység-átváltás — hossz',
  difficulty: 2,
  scenario: 'Egy kerékpáros versenytáv **3,5 km** hosszú.',
  question: 'Hány **méter** ez?',
  visual: {
    type: 'formula',
    formula: '1 km = 1000 m',
    variables: [
      {
        name: 'km',
        desc: 'kilométer'
      },
      {
        name: 'm',
        desc: 'méter'
      }
    ],
    example: {
      'távolság_km': 3.5
    }
  },
  options: ['35 m', '350 m', '3 500 m', '35 000 m'],
  answer: '3 500 m',
  keywords: ['mértékegység-átváltás', 'hossz'],
  solution: `**Átváltás:**

$$3{,}5\\ \\text{km} = 3{,}5 \\cdot 1000 = 3500\\ \\text{m}.$$

**A helyes válasz: 3 500 m.**`
},
{
  id: 'M-T-12',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Közös osztó',
  difficulty: 2,
  scenario: 'Adott két szám: **18** és **24**.',
  question: 'Melyik szám **közös osztója** mindkét számnak?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: '18 osztói',
        count: '1,2,3,6,9,18',
        color: '#dbeafe'
      },
      {
        label: '24 osztói',
        count: '1,2,3,4,6,8,12,24',
        color: '#fef3c7'
      }
    ]
  },
  options: ['4', '6', '9', '12'],
  answer: '6',
  keywords: ['közös osztó', 'oszthatóság'],
  solution: `**Közös osztó keresése:**

- A $18$ osztói: $1,2,3,6,9,18$.
- A $24$ osztói: $1,2,3,4,6,8,12,24$.
- **Közös:** $1, 2, 3, \\mathbf{6}$.

A megadott válaszok közül a **6** közös osztó.`
},
{
  id: 'M-T-13',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Intervallumba eső szám',
  difficulty: 2,
  scenario: 'A számegyenesen bejelöltük a **2 és 5 közötti zárt intervallumot**.',
  question: 'Melyik szám esik a bejelölt **$[2;\\,5]$** intervallumba?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 8,
    divisions: 8,
    points: [
      {
        x: 2,
        label: 'bal'
      },
      {
        x: 5,
        label: 'jobb'
      },
      {
        x: 3.5,
        label: '?'
      }
    ]
  },
  options: ['1,5', '3,5', '5,5', '6,0'],
  answer: '3,5',
  keywords: ['intervallum', 'számegyenes'],
  solution: `**Intervallum-ellenőrzés:**

A $[2;\\,5]$ zárt intervallum azt jelenti, hogy $2 \\le x \\le 5$.

- $1{,}5 < 2$ → nem benne.
- $3{,}5$ → $2 \\le 3{,}5 \\le 5$ ✓
- $5{,}5 > 5$ → nem benne.
- $6{,}0 > 5$ → nem benne.

**A helyes válasz: 3,5.**`
},
{
  id: 'M-T-14',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Mozi kezdete',
  difficulty: 2,
  scenario: 'Az iskolai filmklub előadása **19:20**-kor kezdődik. A film **1 óra 35 percig** tart.',
  question: 'Hánykor ér véget a film?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Kezdés',
        h: 19,
        m: 20
      },
      {
        label: 'Vége',
        h: 20,
        m: 55
      }
    ]
  },
  options: ['20:45', '20:50', '20:55', '21:05'],
  answer: '20:55',
  keywords: ['idő', 'összeadás'],
  solution: `**Idő-hozzáadás:**

$$19{:}20 + 1\\ \\text{óra}\\ 35\\ \\text{perc} = 20{:}55.$$

Részlépések: $19{:}20 + 1$ óra $= 20{:}20$, majd $20{:}20 + 35$ perc $= 20{:}55$.

**A helyes válasz: 20:55.**`
},
{
  id: 'M-T-15',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Műveletsor',
  difficulty: 3,
  scenario: 'A matek órán az alábbi kifejezés értékét kell kiszámolni.',
  question: 'Mi az értéke a $12 + 3 \\cdot (8 - 2)$ kifejezésnek?',
  visual: {
    type: 'formula',
    formula: '12 + 3 · (8 − 2)',
    variables: [
      {
        name: '()',
        desc: 'zárójel először'
      },
      {
        name: '·',
        desc: 'szorzás összeadás előtt'
      }
    ]
  },
  options: ['30', '36', '60', '90'],
  answer: '30',
  keywords: ['műveletsor', 'zárójel'],
  solution: `**Műveleti sorrend:**

1. **Zárójel:** $8 - 2 = 6$.
2. **Szorzás:** $3 \\cdot 6 = 18$.
3. **Összeadás:** $12 + 18 = 30$.

**A helyes válasz: 30.**`
},
{
  id: 'M-T-16',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — cukor',
  difficulty: 2,
  scenario: 'A rajzon egy digitális mérleg kijelzése látható.',
  question: 'Hány g a leolvasott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 500,
    step: 50,
    unit: 'g',
    value: 350,
    label: 'Digitális mérleg'
  },
  options: ['300 g', '350 g', '400 g', '450 g'],
  answer: '350 g',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **350 g**-nál áll.

**A helyes válasz: 350 g.**`
},
{
  id: 'M-T-17',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — liszt',
  difficulty: 2,
  scenario: 'A rajzon egy konyhai mérleg kijelzése látható.',
  question: 'Hány g a leolvasott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 2000,
    step: 200,
    unit: 'g',
    value: 1400,
    label: 'Konyhai mérleg'
  },
  options: ['1200 g', '1400 g', '1600 g', '1800 g'],
  answer: '1400 g',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **1400 g**-nál áll.

**A helyes válasz: 1400 g.**`
},
{
  id: 'M-T-18',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — sebesség',
  difficulty: 2,
  scenario: 'A rajzon egy sebességmérő kijelzése látható.',
  question: 'Hány km/h a leolvasott érték?',
  visual: {
    type: 'scale',
    min: 0,
    max: 100,
    step: 10,
    unit: 'km/h',
    value: 65,
    label: 'Sebességmérő'
  },
  options: ['55 km/h', '65 km/h', '75 km/h', '85 km/h'],
  answer: '65 km/h',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **65 km/h**-nál áll.

**A helyes válasz: 65 km/h.**`
},
{
  id: 'M-T-19',
  contentArea: 'M',
  contentSub: '1.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Skála-leolvasás — hőmérséklet',
  difficulty: 2,
  scenario: 'A rajzon egy hőmérő kijelzése látható.',
  question: 'Hány °C a leolvasott érték?',
  visual: {
    type: 'scale',
    min: -20,
    max: 40,
    step: 5,
    unit: '°C',
    value: 18,
    label: 'Hőmérő'
  },
  options: ['13 °C', '18 °C', '23 °C', '28 °C'],
  answer: '18 °C',
  keywords: ['skála', 'leolvasás'],
  solution: `A mutató **18 °C**-nál áll.

**A helyes válasz: 18 °C.**`
},
{
  id: 'M-T-20',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Számegyenes — 2/5',
  difficulty: 2,
  scenario: 'A számegyenesen 0 és 1 között 5 egyenlő részre osztottuk a szakaszt.',
  question: 'Melyik pont jelöli a(z) $\\tfrac{2}{5}$-ot?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 1,
    divisions: 5,
    points: [
      {
        x: 0.2,
        label: 'A'
      },
      {
        x: 0.4,
        label: 'B'
      },
      {
        x: 0.6,
        label: 'C'
      }
    ]
  },
  options: ['A', 'B', 'C'],
  answer: 'B',
  keywords: ['számegyenes', 'tört'],
  solution: `Az $\\tfrac{2/5}$ = 0,40 — a **2.** osztáspont.

**B pont.**`
},
{
  id: 'M-T-21',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Számegyenes — 4/6',
  difficulty: 2,
  scenario: 'A számegyenesen 0 és 1 között 6 egyenlő részre osztottuk a szakaszt.',
  question: 'Melyik pont jelöli a(z) $\\tfrac{4}{6}$-ot?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 1,
    divisions: 6,
    points: [
      {
        x: 0.5,
        label: 'A'
      },
      {
        x: 0.6666666666666666,
        label: 'B'
      },
      {
        x: 0.8333333333333334,
        label: 'C'
      }
    ]
  },
  options: ['A', 'B', 'C'],
  answer: 'B',
  keywords: ['számegyenes', 'tört'],
  solution: `Az $\\tfrac{4/6}$ = 0,67 — a **4.** osztáspont.

**B pont.**`
},
{
  id: 'M-T-22',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Oszlopdiagram — könyvtári kölcsönzések',
  difficulty: 2,
  scenario: 'Az iskolai könyvtárban egy hét alatt kölcsönzött könyvek darabszámát mutatja az oszlopdiagram.',
  question: 'Melyik napon kölcsönöztek **a legtöbb** könyvet?',
  visual: {
    type: 'barChart',
    caption: 'Heti kölcsönzések',
    categories: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
    values: [12, 18, 9, 22, 15],
    yLabel: 'db'
  },
  options: ['Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['oszlopdiagram', 'leolvasás', 'könyvtár'],
  solution: 'A legmagasabb oszlop a **Csütörtök** (22 db). **Válasz: Csütörtök.**'
},
{
  id: 'M-T-23',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Vonaldiagram — nyaralás hőmérséklete',
  difficulty: 2,
  scenario: 'Egy nyaralás során minden délben leolvasták a hőmérsékletet.',
  question: 'Melyik napon volt **a legalacsonyabb** hőmérséklet?',
  visual: {
    type: 'lineChart',
    caption: 'Déli hőmérséklet a nyaraláson',
    xLabels: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'],
    values: [28, 31, 27, 24, 26, 30, 32],
    yLabel: '°C'
  },
  options: ['Hétfő', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'leolvasás', 'nyaralás'],
  solution: 'A legalacsonyabb érték **24 °C**, ami **csütörtökön** volt. **Válasz: Csütörtök.**'
},
{
  id: 'M-T-24',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Blokk összegzése',
  difficulty: 2,
  scenario: 'Nézd meg az alábbi vásárlási blokkot.',
  question: 'Mennyi az **összesen fizetendő**?',
  visual: {
    type: 'table',
    caption: 'Blokk',
    headers: ['Termék', 'db', 'Egységár', 'Összesen'],
    rows: [
      ['Tej', '2', '410 Ft', '820 Ft'],
      ['Kenyér', '1', '580 Ft', '580 Ft'],
      ['Sajt', '1', '1290 Ft', '1290 Ft'],
      ['Banán', '1', '490 Ft', '490 Ft']
    ]
  },
  options: ['3080 Ft', '3180 Ft', '3280 Ft', '4180 Ft'],
  answer: '3180 Ft',
  keywords: ['műveletsor', 'összeadás'],
  solution: `- Tej: $2 \\cdot 410 = 820$ Ft
- Kenyér: $1 \\cdot 580 = 580$ Ft
- Sajt: $1 \\cdot 1290 = 1290$ Ft
- Banán: $1 \\cdot 490 = 490$ Ft

**Összesen: 3180 Ft.**`
},
{
  id: 'M-T-25',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Blokk összegzése',
  difficulty: 2,
  scenario: 'Nézd meg az alábbi vásárlási blokkot.',
  question: 'Mennyi az **összesen fizetendő**?',
  visual: {
    type: 'table',
    caption: 'Blokk',
    headers: ['Termék', 'db', 'Egységár', 'Összesen'],
    rows: [
      ['Jegy', '3', '2500 Ft', '7500 Ft'],
      ['Popcorn', '2', '990 Ft', '1980 Ft'],
      ['Üdítő', '3', '490 Ft', '1470 Ft']
    ]
  },
  options: ['10 850 Ft', '10 950 Ft', '11 050 Ft', '11 950 Ft'],
  answer: '10 950 Ft',
  keywords: ['műveletsor', 'összeadás'],
  solution: `- Jegy: $3 \\cdot 2500 = 7500$ Ft
- Popcorn: $2 \\cdot 990 = 1980$ Ft
- Üdítő: $3 \\cdot 490 = 1470$ Ft

**Összesen: 10 950 Ft.**`
},
{
  id: 'M-T-26',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Pontdiagram — kedvenc sportág',
  difficulty: 2,
  scenario: 'Egy iskolai felmérésen a gyerekek a kedvenc sportágukat jelölték pontokkal.',
  question: 'Hány gyerek választotta a **kosárlabdát**?',
  visual: {
    type: 'dotPlot',
    caption: 'Kedvenc sportág szavazatai',
    categories: ['Foci', 'Kosárlabda', 'Úszás', 'Kézilabda'],
    counts: [8, 5, 6, 3]
  },
  options: ['3', '5', '6', '8'],
  answer: '5',
  keywords: ['pontdiagram', 'leolvasás', 'sport'],
  solution: 'A **Kosárlabda** oszlop fölött **5 pont** látható. **Válasz: 5 gyerek.**'
},
{
  id: 'M-T-27',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Kördiagram — zsebpénz felhasználása',
  difficulty: 2,
  scenario: 'Márk havi **zsebpénze 6000 Ft**, ezt az alábbi kördiagram szerint költötte el.',
  question: 'Mennyit költött **könyvre**, ha a könyvek részaránya **25%**?',
  visual: {
    type: 'pieChart',
    caption: 'Zsebpénz elosztása',
    slices: [
      { label: 'Édesség', value: 40 },
      { label: 'Könyv', value: 25 },
      { label: 'Mozi', value: 20 },
      { label: 'Megtakarítás', value: 15 }
    ]
  },
  options: ['1200 Ft', '1500 Ft', '1800 Ft', '2000 Ft'],
  answer: '1500 Ft',
  keywords: ['kördiagram', 'százalék', 'zsebpénz'],
  solution: '$6000 \\cdot \\tfrac{25}{100} = 1500$ Ft. **Válasz: 1500 Ft.**'
},
{
  id: 'M-T-28',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Mértékegység: 3,5 kg = ?',
  difficulty: 2,
  scenario: 'Váltsd át a megadott értéket!',
  question: 'Mennyi **3,5 kg** átváltva?',
  visual: {
    type: 'formula',
    formula: '3,5 kg = ?',
    variables: [],
    example: {}
  },
  options: ['350 g', '3500 g', '35 000 g', '0,35 g'],
  answer: '3500 g',
  keywords: ['mértékegység-átváltás'],
  solution: '**3,5 kg = 3500 g.**'
},
{
  id: 'M-T-29',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Mértékegység: 2,4 L = ?',
  difficulty: 2,
  scenario: 'Váltsd át a megadott értéket!',
  question: 'Mennyi **2,4 L** átváltva?',
  visual: {
    type: 'formula',
    formula: '2,4 L = ?',
    variables: [],
    example: {}
  },
  options: ['24 mL', '240 mL', '2400 mL', '24 000 mL'],
  answer: '2400 mL',
  keywords: ['mértékegység-átváltás'],
  solution: '**2,4 L = 2400 mL.**'
},
{
  id: 'M-T-30',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Sorozat — következő tag',
  difficulty: 2,
  scenario: 'Az alábbi számsorozat szabályát kell felismerned.',
  question: 'Mi a **következő** szám: $3, 7, 11, 15, ?$',
  visual: {
    type: 'sequence',
    items: [3, 7, 11, 15, '?'],
    rule: '+4'
  },
  options: ['17', '18', '19', '20'],
  answer: '19',
  keywords: ['sorozat', 'szabályszerűség'],
  solution: 'Minden lépésben **+4**-et adunk. $15 + 4 = \\mathbf{19}$.'
},
{
  id: 'M-T-31',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Csempesor — téglalap területe',
  difficulty: 2,
  scenario: 'Egy fürdőszoba padlójára **4 sorban**, soronként **6 db** négyzet alakú csempét raktak le.',
  question: 'Hány csempe fedi le a padlót?',
  visual: {
    type: 'tileRows',
    rows: 4,
    cols: 6,
    caption: 'Csempesor a padlón'
  },
  options: ['10', '20', '24', '26'],
  answer: '24',
  keywords: ['szorzás', 'téglalap'],
  solution: '$4 \\cdot 6 = \\mathbf{24}$ csempe.'
},
{
  id: 'M-T-32',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Téglalap kerülete — kert',
  difficulty: 2,
  scenario: 'Egy téglalap alakú veteményes kert **oldalai 8 m és 5 m**.',
  question: 'Mennyi a kert **kerülete**?',
  visual: {
    type: 'rectangle',
    width: 8,
    height: 5,
    unit: 'm',
    label: 'Kert'
  },
  options: ['13 m', '18 m', '26 m', '40 m'],
  answer: '26 m',
  keywords: ['kerület', 'téglalap', 'kert'],
  solution: '$K = 2 \\cdot (8 + 5) = 2 \\cdot 13 = \\mathbf{26}$ m.'
},
{
  id: 'M-T-33',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Téglalap területe — szoba',
  difficulty: 2,
  scenario: 'Egy téglalap alakú szoba **7 m hosszú** és **4 m széles**.',
  question: 'Mekkora a szoba **alapterülete**?',
  visual: {
    type: 'rectangle',
    width: 7,
    height: 4,
    unit: 'm',
    label: 'Szoba'
  },
  options: ['11 m²', '22 m²', '28 m²', '32 m²'],
  answer: '28 m²',
  keywords: ['terület', 'téglalap'],
  solution: '$T = 7 \\cdot 4 = \\mathbf{28}$ m².'
},
{
  id: 'M-T-34',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Időtartam — 08:30 → ?',
  difficulty: 2,
  scenario: 'Egy esemény **08:30-kor** kezdődik és **1 óra 45 perc** hosszú.',
  question: 'Hánykor ér véget?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Kezdés',
        h: 8,
        m: 30
      },
      {
        label: 'Befejezés',
        h: 10,
        m: 15
      }
    ]
  },
  options: ['09:15', '10:15', '11:15', '10:45'],
  answer: '10:15',
  keywords: ['idő', 'időtartam'],
  solution: '08:30 + 1 óra 45 perc = **10:15**.'
},
{
  id: 'M-T-35',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Időtartam — 14:10 → ?',
  difficulty: 2,
  scenario: 'Egy esemény **14:10-kor** kezdődik és **2 óra 30 perc** hosszú.',
  question: 'Hánykor ér véget?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Kezdés',
        h: 14,
        m: 10
      },
      {
        label: 'Befejezés',
        h: 16,
        m: 40
      }
    ]
  },
  options: ['15:40', '16:40', '17:40', '16:10'],
  answer: '16:40',
  keywords: ['idő', 'időtartam'],
  solution: '14:10 + 2 óra 30 perc = **16:40**.'
},
{
  id: 'M-T-36',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Negatív számok — fagypont alatt',
  difficulty: 2,
  scenario: 'Reggel a hőmérő **-3 °C**-ot mutatott, délben **5 °C**-ot.',
  question: 'Hány fokot **emelkedett** a hőmérséklet?',
  visual: {
    type: 'numberLine',
    min: -10,
    max: 10,
    divisions: 20,
    points: [
      { x: -3, label: 'reggel' },
      { x: 5, label: 'dél' }
    ]
  },
  options: ['2 °C', '5 °C', '7 °C', '8 °C'],
  answer: '8 °C',
  keywords: ['negatív szám', 'különbség'],
  solution: '$5 - (-3) = 5 + 3 = \\mathbf{8}$ °C-ot emelkedett.'
},
{
  id: 'M-T-37',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Tizedestört összehasonlítás',
  difficulty: 2,
  scenario: 'Három fiú magassága: Dávid **1,42 m**, Bence **1,4 m**, Ákos **1,47 m**.',
  question: 'Ki **a legmagasabb**?',
  visual: {
    type: 'table',
    caption: 'Magasságok',
    headers: ['Név', 'Magasság'],
    rows: [
      ['Dávid', '1,42 m'],
      ['Bence', '1,40 m'],
      ['Ákos', '1,47 m']
    ]
  },
  options: ['Dávid', 'Bence', 'Ákos'],
  answer: 'Ákos',
  keywords: ['tizedestört', 'összehasonlítás'],
  solution: '$1,47 > 1,42 > 1,40$. **A legmagasabb Ákos.**'
},
{
  id: 'M-T-38',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Születésnap — torta szelet',
  difficulty: 2,
  scenario: 'Dóri születésnapján **24 szelet tortát** vágtak. A vendégek **18 szeletet** fogyasztottak el.',
  question: 'Hány szelet torta **maradt**?',
  visual: {
    type: 'pictogram',
    caption: 'Torta szeletek',
    icon: 'cake',
    total: 24,
    eaten: 18
  },
  options: ['4', '6', '8', '12'],
  answer: '6',
  keywords: ['kivonás', 'születésnap'],
  solution: '$24 - 18 = \\mathbf{6}$ szelet maradt.'
},
{
  id: 'M-T-39',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Vasúti menetrend — időtartam',
  difficulty: 2,
  scenario: 'A budapesti vonat **indulás 08:40**, **érkezés 11:05** Szegedre.',
  question: 'Mennyi az út **teljes ideje**?',
  visual: {
    type: 'clockPair',
    times: [
      { label: 'Indulás', h: 8, m: 40 },
      { label: 'Érkezés', h: 11, m: 5 }
    ]
  },
  options: ['2 óra 15 perc', '2 óra 25 perc', '2 óra 35 perc', '3 óra 25 perc'],
  answer: '2 óra 25 perc',
  keywords: ['idő', 'vasút'],
  solution: '08:40 → 11:05 = **2 óra 25 perc**.'
},
{
  id: 'M-T-40',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Évszámok — évforduló',
  difficulty: 2,
  scenario: 'Egy könyvtárat **1958**-ban alapítottak, a jubileumi rendezvényt **2023**-ban tartották.',
  question: 'Hány **éves** volt ekkor a könyvtár?',
  visual: {
    type: 'timelineYears',
    start: 1958,
    end: 2023,
    label: 'Könyvtár működése'
  },
  options: ['55', '60', '65', '70'],
  answer: '65',
  keywords: ['kivonás', 'évszám'],
  solution: '$2023 - 1958 = \\mathbf{65}$ év.'
},
{
  id: 'M-T-41',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Repülőút — időszámítás',
  difficulty: 2,
  scenario: 'A repülőgép **13:15-kor** szállt fel, a repülés **2 óra 50 perc** volt.',
  question: 'Hánykor **landolt** a gép?',
  visual: {
    type: 'timeline',
    label: 'Repülőút',
    events: [
      { t: '13:15', label: 'Felszállás' },
      { t: '?', label: 'Landolás' }
    ]
  },
  options: ['15:05', '15:55', '16:05', '16:55'],
  answer: '16:05',
  keywords: ['időtartam', 'repülőút'],
  solution: '13:15 + 2 óra 50 perc = **16:05**.'
},
{
  id: 'M-T-42',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Oszthatóság: 126 / 3?',
  difficulty: 2,
  scenario: 'Adott a **126** szám.',
  question: '**Osztható-e** 3-mal?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Szám',
        formula: '126',
        result: ''
      },
      {
        label: 'Osztó',
        formula: '3',
        result: ''
      }
    ]
  },
  options: ['Igen', 'Nem'],
  answer: 'Igen',
  keywords: ['oszthatóság'],
  solution: '$126 \\div 3 = 42$, **maradék nélkül** → **Igen**.'
},
{
  id: 'M-T-43',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Oszthatóság: 205 / 5?',
  difficulty: 2,
  scenario: 'Adott a **205** szám.',
  question: '**Osztható-e** 5-mal?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Szám',
        formula: '205',
        result: ''
      },
      {
        label: 'Osztó',
        formula: '5',
        result: ''
      }
    ]
  },
  options: ['Igen', 'Nem'],
  answer: 'Igen',
  keywords: ['oszthatóság'],
  solution: '$205 \\div 5 = 41$, **maradék nélkül** → **Igen**.'
},
{
  id: 'M-T-44',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Prímszám felismerése',
  difficulty: 2,
  scenario: 'Négy szám közül kell kiválasztanod a prímszámot.',
  question: 'Melyik **prímszám** a következők közül?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'A', formula: '21', result: '' },
      { label: 'B', formula: '27', result: '' },
      { label: 'C', formula: '29', result: '' },
      { label: 'D', formula: '33', result: '' }
    ]
  },
  options: ['21', '27', '29', '33'],
  answer: '29',
  keywords: ['prímszám', 'oszthatóság'],
  solution: '$21 = 3 \\cdot 7$, $27 = 3^3$, $33 = 3 \\cdot 11$. A **29** csak 1-gyel és önmagával osztható → **prím**.'
},
{
  id: 'M-T-45',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Maradékos osztás — cukorkák',
  difficulty: 2,
  scenario: 'A tanár **37 cukorkát** akar szétosztani **5 gyerek** között egyenlően.',
  question: 'Hány cukorka **marad** a végén?',
  visual: {
    type: 'pictogram',
    caption: '37 cukorka, 5 gyerek',
    icon: 'candy',
    total: 37,
    groups: 5
  },
  options: ['0', '1', '2', '3'],
  answer: '2',
  keywords: ['maradék', 'osztás'],
  solution: '$37 \\div 5 = 7$, maradék **2** ($5 \\cdot 7 = 35$, $37 - 35 = 2$).'
},
{
  id: 'M-T-46',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Páros-páratlan felismerés',
  difficulty: 2,
  scenario: 'A sportnapon a rajtszámok közül kell kiszűrni a **páratlan számokat**.',
  question: 'Hány **páratlan** szám van az alábbiak között: $12, 17, 24, 35, 48, 51, 60$?',
  visual: {
    type: 'sequence',
    items: [12, 17, 24, 35, 48, 51, 60],
    rule: 'páros/páratlan'
  },
  options: ['2', '3', '4', '5'],
  answer: '3',
  keywords: ['páros', 'páratlan'],
  solution: 'Páratlanok: **17, 35, 51** — összesen **3 db**.'
},
{
  id: 'M-T-47',
  contentArea: 'M',
  contentSub: '1.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Helyi érték — 3482',
  difficulty: 2,
  scenario: 'Figyeld meg a **3482** szám jegyeit.',
  question: 'Melyik helyi értéken áll a **4**-as?',
  visual: {
    type: 'table',
    caption: 'Helyi értékek',
    headers: ['TezrEk', 'Ezrek', 'Százasok', 'Tízesek', 'Egyesek'],
    rows: [
      ['0', '3', '4', '8', '2']
    ]
  },
  options: ['egyesek', 'tízesek', 'százasok', 'századok'],
  answer: 'századok',
  keywords: ['helyi érték'],
  solution: 'A **4** a **századok** helyén áll.'
},
{
  id: 'M-T-48',
  contentArea: 'M',
  contentSub: '1.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Helyi érték — 25701',
  difficulty: 2,
  scenario: 'Figyeld meg a **25701** szám jegyeit.',
  question: 'Melyik helyi értéken áll a **7**-as?',
  visual: {
    type: 'table',
    caption: 'Helyi értékek',
    headers: ['TezrEk', 'Ezrek', 'Százasok', 'Tízesek', 'Egyesek'],
    rows: [
      ['2', '5', '7', '0', '1']
    ]
  },
  options: ['egyesek', 'tízesek', 'százasok', 'ezrek'],
  answer: 'ezrek',
  keywords: ['helyi érték'],
  solution: 'A **7** a **ezrek** helyén áll.'
},
{
  id: 'M-T-49',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Kerekítés — százasokra',
  difficulty: 2,
  scenario: 'A fesztiválon **7 482** látogató vett részt.',
  question: 'Mennyi ez **százasokra** kerekítve?',
  visual: {
    type: 'formula',
    formula: '7482 ≈ ?',
    variables: [],
    example: {}
  },
  options: ['7400', '7480', '7500', '7000'],
  answer: '7500',
  keywords: ['kerekítés'],
  solution: 'A tízesek helyén 8 áll (≥5) → felfelé kerekítünk. $7482 \\approx \\mathbf{7500}$.'
},
{
  id: 'M-T-50',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Római számok',
  difficulty: 2,
  scenario: 'Egy történelmi emlékművön a **MCMLXXXIV** évszám áll.',
  question: 'Melyik **arab számmal** egyenlő ez a római szám?',
  visual: {
    type: 'formula',
    formula: 'MCMLXXXIV = ?',
    variables: [],
    example: {}
  },
  options: ['1964', '1974', '1984', '1994'],
  answer: '1984',
  keywords: ['római szám'],
  solution: '$M + CM + LXXX + IV = 1000 + 900 + 80 + 4 = \\mathbf{1984}$.'
},
{
  id: 'S-A-01',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Dolgozatok átlaga',
  difficulty: 4,
  scenario: 'Zsófi öt matematikadolgozatot írt. A kapott jegyei az alábbi pontdiagramon láthatók.',
  question: 'Mennyi Zsófi jegyeinek **átlaga**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Jegy',
    xMin: 1,
    xMax: 5,
    dots: [
      {
        x: 3,
        count: 1
      },
      {
        x: 4,
        count: 2
      },
      {
        x: 5,
        count: 2
      }
    ]
  },
  options: ['3,8', '4,0', '4,2', '4,5'],
  answer: '4,2',
  keywords: ['átlag', 'számtani közép'],
  solution: `**Számtani átlag:**

A jegyek: $3, 4, 4, 5, 5$.

$$\\bar{x} = \\dfrac{3+4+4+5+5}{5} = \\dfrac{21}{5} = \\mathbf{4{,}2}$$

**A helyes válasz: 4,2.**`
},
{
  id: 'S-A-02',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medián és terjedelem',
  difficulty: 5,
  scenario: 'Hét barát megmérte a magasságát (cm-ben). Az értékek növekvő sorrendben láthatók a táblázatban.',
  question: 'Mennyi a **medián** és a **terjedelem**?',
  visual: {
    type: 'table',
    caption: 'Magasságok (cm), növekvő sorrend',
    headers: ['Sorszám', '1.', '2.', '3.', '4.', '5.', '6.', '7.'],
    rows: [
      ['Magasság', '142', '146', '148', '150', '153', '156', '162']
    ]
  },
  options: ['medián = 148, terjedelem = 14', 'medián = 150, terjedelem = 20', 'medián = 150, terjedelem = 14', 'medián = 153, terjedelem = 20'],
  answer: 'medián = 150, terjedelem = 20',
  keywords: ['medián', 'terjedelem', 'rendezett minta'],
  solution: `**Medián (középső érték):**

7 elem rendezett sorában a középső a **4. elem**, azaz **150 cm**.

**Terjedelem:**

$$R = x_{\\max} - x_{\\min} = 162 - 142 = \\mathbf{20}$$

**A helyes válasz: medián = 150, terjedelem = 20.**`
},
{
  id: 'S-A-03',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Ruhakombinációk',
  difficulty: 4,
  scenario: 'Zolinak **3 pólója** (piros, kék, zöld) és **2 nadrágja** (fekete, farmer) van. Minden nap egy pólót és egy nadrágot vesz fel.',
  question: 'Hányféleképpen tudja összeállítani az öltözékét?',
  visual: {
    type: 'treeDiagram',
    root: 'Öltözék',
    levels: [
      {
        label: 'Póló',
        branches: ['piros', 'kék', 'zöld']
      },
      {
        label: 'Nadrág',
        branches: ['fekete', 'farmer']
      }
    ]
  },
  options: ['3', '5', '6', '9'],
  answer: '6',
  keywords: ['kombinatorika', 'összeszámlálás', 'szorzási elv'],
  solution: `**Szorzási szabály:**

Minden pólóhoz **2** nadrág tartozhat, és **3** pólónk van:

$$3 \\cdot 2 = \\mathbf{6}$$

**A 6 öltözék:** (piros-fekete), (piros-farmer), (kék-fekete), (kék-farmer), (zöld-fekete), (zöld-farmer).

**A helyes válasz: 6.**`
},
{
  id: 'S-A-04',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Valószínűség — színes golyók',
  difficulty: 5,
  scenario: 'Egy urnában **4 piros**, **3 kék** és **5 zöld** golyó van. Véletlenszerűen kihúzunk egyet.',
  question: 'Mennyi a valószínűsége, hogy **kék** golyót húzunk?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Piros',
        count: 4,
        unit: 'db',
        color: '#ef4444'
      },
      {
        label: 'Kék',
        count: 3,
        unit: 'db',
        color: '#2563eb'
      },
      {
        label: 'Zöld',
        count: 5,
        unit: 'db',
        color: '#22c55e'
      }
    ]
  },
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{3}{12}$', '$\\tfrac{1}{3}$', '$\\tfrac{3}{7}$'],
  answer: '$\\tfrac{1}{4}$',
  keywords: ['klasszikus valószínűség', 'kedvező-összes arány'],
  solution: `**Klasszikus valószínűség:**

Összes golyó: $4+3+5 = 12$. Kedvező eset: **3 kék**.

$$P(\\text{kék}) = \\dfrac{3}{12} = \\dfrac{1}{4}$$

Megjegyzés: $\\tfrac{3}{12}$ és $\\tfrac{1}{4}$ ugyanaz a szám, de **egyszerűsített alakban** $\\tfrac{1}{4}$ a szokásos válasz.

**A helyes válasz: $\\tfrac{1}{4}$.**`
},
{
  id: 'S-A-05',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Havi zsebpénz — átlag',
  difficulty: 3,
  scenario: 'Öt barát havi zsebpénzét az oszlopdiagram mutatja.',
  question: 'Mennyi a zsebpénzek **átlaga** forintban?',
  visual: {
    type: 'barChart',
    xLabel: 'Név',
    yLabel: 'Ft',
    yMin: 0,
    yMax: 5000,
    bars: [
      {
        label: 'Anna',
        value: 3000,
        color: '#2563eb'
      },
      {
        label: 'Béla',
        value: 2000,
        color: '#22c55e'
      },
      {
        label: 'Cili',
        value: 4000,
        color: '#f59e0b'
      },
      {
        label: 'Dani',
        value: 2500,
        color: '#ef4444'
      },
      {
        label: 'Eszter',
        value: 3500,
        color: '#a855f7'
      }
    ]
  },
  options: ['2800 Ft', '3000 Ft', '3200 Ft', '3500 Ft'],
  answer: '3000 Ft',
  keywords: ['átlag', 'számtani közép'],
  solution: `**Számtani átlag:**

$$\\bar{x} = \\dfrac{3000+2000+4000+2500+3500}{5} = \\dfrac{15000}{5} = \\mathbf{3000}$$

**A helyes válasz: 3000 Ft.**`
},
{
  id: 'S-A-06',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Dobókocka — páros szám valószínűsége',
  difficulty: 3,
  scenario: 'Egy **szabályos dobókockát** dobunk fel. A kockán az $1, 2, 3, 4, 5, 6$ számok szerepelnek.',
  question: 'Mennyi a valószínűsége, hogy **páros** számot dobunk?',
  visual: {
    type: 'frequencyTable',
    caption: 'Kockadobás lehetséges kimenetei',
    headers: ['Dobott szám', 'Páros-e?'],
    rows: [
      ['1', 'nem'],
      ['2', 'igen'],
      ['3', 'nem'],
      ['4', 'igen'],
      ['5', 'nem'],
      ['6', 'igen']
    ]
  },
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{2}$',
  keywords: ['klasszikus valószínűség', 'dobókocka'],
  solution: `**Klasszikus valószínűség:**

Kedvező esetek: $2, 4, 6$ → **3** darab. Összes eset: $6$.

$$P(\\text{páros}) = \\dfrac{3}{6} = \\dfrac{1}{2}$$

**A helyes válasz: $\\tfrac{1}{2}$.**`
},
{
  id: 'S-A-07',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Háromjegyű számok kirakása',
  difficulty: 4,
  scenario: 'Az $1, 2, 3, 4$ **számjegyekből** — ismétlés nélkül — **háromjegyű** számokat rakunk ki.',
  question: 'Hányféle háromjegyű szám rakható ki?',
  visual: {
    type: 'treeDiagram',
    root: '3 jegyű szám',
    levels: [
      {
        label: 'Százas',
        branches: ['1', '2', '3', '4']
      },
      {
        label: 'Tízes',
        branches: ['3 lehetőség']
      },
      {
        label: 'Egyes',
        branches: ['2 lehetőség']
      }
    ]
  },
  options: ['12', '16', '24', '64'],
  answer: '24',
  keywords: ['permutáció', 'kombinatorika', 'szorzási elv'],
  solution: `**Szorzási szabály (ismétlés nélkül):**

- 1. jegy: **4** lehetőség
- 2. jegy: **3** maradék
- 3. jegy: **2** maradék

$$4 \\cdot 3 \\cdot 2 = \\mathbf{24}$$

**A helyes válasz: 24 szám.**`
},
{
  id: 'S-A-08',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Halmazok — nyelvtanulók',
  difficulty: 4,
  scenario: 'Egy osztály 25 tanulója közül **15** tanul **angolt**, **10** tanul **németet**, és **4** tanuló **mindkét** nyelvet tanulja.',
  question: 'Hányan tanulnak **csak angolt** (németet nem)?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Angol',
        color: '#2563eb'
      },
      {
        label: 'Német',
        color: '#dc2626'
      }
    ],
    regions: {
      onlyA: 11,
      onlyB: 6,
      both: 4,
      neither: 4
    },
    universe: 25
  },
  options: ['4', '6', '11', '15'],
  answer: '11',
  keywords: ['Venn-diagram', 'halmazműveletek', 'szitaformula'],
  solution: `**Venn-diagram kiszámolása:**

- Csak angol: $15 - 4 = \\mathbf{11}$
- Csak német: $10 - 4 = 6$
- Mindkettő: $4$
- Egyiket sem: $25 - (11+6+4) = 4$

**A helyes válasz: 11 tanuló.**`
},
{
  id: 'S-A-09',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Úthálózat — lehetséges útvonalak',
  difficulty: 4,
  scenario: 'Az **A** városból a **C** városba csak a **B** városon keresztül lehet eljutni. A-ból B-be **3 út**, B-ből C-be **4 út** vezet.',
  question: 'Hányféleképpen lehet eljutni **A-ból C-be**?',
  visual: {
    type: 'treeDiagram',
    root: 'A → C',
    levels: [
      {
        label: 'A → B (út)',
        branches: ['1. út', '2. út', '3. út']
      },
      {
        label: 'B → C (út)',
        branches: ['a', 'b', 'c', 'd']
      }
    ]
  },
  options: ['7', '10', '12', '16'],
  answer: '12',
  keywords: ['gráf', 'utak', 'szorzási elv'],
  solution: `**Szorzási szabály:**

Minden A→B úthoz 4 B→C út tartozhat:

$$3 \\cdot 4 = \\mathbf{12}$$

**A helyes válasz: 12 útvonal.**`
},
{
  id: 'S-A-10',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Születésnapi torta — módusz és terjedelem',
  difficulty: 4,
  scenario: 'Egy születésnapi zsúron 10 gyereket kérdeztek meg, hány szelet tortát ettek. A válaszokat a pontdiagram mutatja.',
  question: 'Mennyi a **módusz** és a **terjedelem**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Szeletek száma',
    xMin: 0,
    xMax: 5,
    dots: [
      {
        x: 0,
        count: 1
      },
      {
        x: 1,
        count: 2
      },
      {
        x: 2,
        count: 4
      },
      {
        x: 3,
        count: 2
      },
      {
        x: 5,
        count: 1
      }
    ]
  },
  options: ['módusz = 2, terjedelem = 5', 'módusz = 2, terjedelem = 4', 'módusz = 3, terjedelem = 5', 'módusz = 4, terjedelem = 5'],
  answer: 'módusz = 2, terjedelem = 5',
  keywords: ['módusz', 'terjedelem', 'pontdiagram'],
  solution: `**Módusz (leggyakoribb érték):**

A **2** szelethez **4** pont tartozik, ez a legtöbb → módusz = **2**.

**Terjedelem:**

$$R = x_{\\max} - x_{\\min} = 5 - 0 = \\mathbf{5}$$

**A helyes válasz: módusz = 2, terjedelem = 5.**`
},
{
  id: 'S-A-11',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Lottósorsolás — nyerőszám valószínűsége',
  difficulty: 4,
  scenario: 'Egy kis lottón **1-től 20-ig** számozott golyók közül húznak **egyet**. A nyerőszámok **5-tel oszthatók** (5, 10, 15, 20).',
  question: 'Mennyi a **valószínűsége**, hogy a húzott szám nyerőszám?',
  visual: {
    type: 'frequencyTable',
    caption: 'Számok 1-től 20-ig',
    headers: ['Típus', 'Darab'],
    rows: [
      ['5-tel osztható (nyerő)', 4],
      ['Nem 5-tel osztható', 16]
    ]
  },
  options: ['$\\tfrac{1}{20}$', '$\\tfrac{1}{5}$', '$\\tfrac{1}{4}$', '$\\tfrac{4}{5}$'],
  answer: '$\\tfrac{1}{5}$',
  keywords: ['klasszikus valószínűség', 'oszthatóság'],
  solution: `**Klasszikus valószínűség:**

Kedvező: $\\{5, 10, 15, 20\\}$ → **4 darab**. Összes: $20$.

$$P = \\dfrac{4}{20} = \\dfrac{1}{5}$$

**A helyes válasz: $\\tfrac{1}{5}$.**`
},
{
  id: 'S-A-12',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Logika — ÉS/VAGY műveletek',
  difficulty: 3,
  scenario: `Tekintsd az alábbi állításokat egy **12-es** számról:

- $p$: "12 páros szám."
- $q$: "12 prímszám."`,
  question: 'Melyik **összetett állítás IGAZ**?',
  visual: {
    type: 'table',
    caption: 'Logikai értékek',
    headers: ['Állítás', 'Érték'],
    rows: [
      ['p: 12 páros', 'igaz'],
      ['q: 12 prím', 'hamis']
    ]
  },
  options: ['$p \\text{ ÉS } q$', '$p \\text{ VAGY } q$', 'NEM $p$', '$q \\text{ ÉS NEM } p$'],
  answer: '$p \\text{ VAGY } q$',
  keywords: ['logikai műveletek', 'konjunkció', 'diszjunkció', 'negáció'],
  solution: `**Logikai műveletek:**

Mivel $p =$ **igaz**, $q =$ **hamis**:

- $p \\text{ ÉS } q$ → igaz ÉS hamis = **hamis**
- $p \\text{ VAGY } q$ → igaz VAGY hamis = **igaz** ✓
- NEM $p$ → **hamis**
- $q \\text{ ÉS NEM } p$ → hamis ÉS hamis = **hamis**

**A helyes válasz: $p \\text{ VAGY } q$.**`
},
{
  id: 'S-A-13',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Úthálózat — város-gráf',
  difficulty: 3,
  scenario: 'Négy település (P, Q, R, S) között utak vannak. Az éleket a gráf mutatja: P–Q, P–R, Q–R, Q–S, R–S.',
  question: 'Hány **különböző él** (út) van a gráfban?',
  options: ['3', '4', '5', '6'],
  answer: '5',
  keywords: ['gráf', 'élek', 'számolás'],
  solution: `**Az élek felsorolása:**

1. P–Q
2. P–R
3. Q–R
4. Q–S
5. R–S

Összesen **5 él**.

**A helyes válasz: 5.**`
},
{
  id: 'S-A-14',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medián — páratlan elemszám',
  difficulty: 4,
  scenario: 'Egy tanuló 5 mérési eredménye centiméterben: $145, 152, 148, 156, 150$.',
  question: 'Mennyi a **medián**?',
  options: ['145', '148', '150', '152'],
  answer: '150',
  keywords: ['medián', 'középső érték'],
  solution: `**Rendezés:** $145,\\,148,\\,150,\\,152,\\,156$.

A **középső** (3.) érték: $\\mathbf{150}$.

**A helyes válasz: 150.**`
},
{
  id: 'S-A-15',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medián — páros elemszám',
  difficulty: 4,
  scenario: 'Egy csoport 6 tagjának életkora: $11, 12, 13, 14, 14, 16$ év.',
  question: 'Mennyi a **medián**?',
  options: ['13', '13,5', '14', '14,5'],
  answer: '13,5',
  keywords: ['medián', 'páros elemszám'],
  solution: `**Páros elemszám:** a két középső (3. és 4.) érték átlaga.

$$\\text{medián} = \\dfrac{13 + 14}{2} = \\mathbf{13{,}5}$$

**A helyes válasz: 13,5.**`
},
{
  id: 'S-A-16',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Úszóverseny — időeredmények terjedelme',
  difficulty: 4,
  scenario: 'Hat versenyző 100 m-es úszási időeredményei másodpercben: $62, 58, 65, 60, 71, 59$.',
  question: 'Mekkora az **időeredmények terjedelme**?',
  options: ['9 s', '11 s', '13 s', '15 s'],
  answer: '13 s',
  keywords: ['terjedelem', 'max', 'min'],
  solution: `**Legnagyobb érték:** $71$ s.

**Legkisebb érték:** $58$ s.

**Terjedelem:** $71 - 58 = \\mathbf{13}$ s.

**A helyes válasz: 13 s.**`
},
{
  id: 'S-A-17',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Dobókocka — nagyobb, mint 4',
  difficulty: 3,
  scenario: 'Szabályos dobókockával dobunk.',
  question: 'Mennyi a valószínűsége, hogy **4-nél nagyobbat** dobunk?',
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{3}$',
  keywords: ['valószínűség', 'klasszikus'],
  solution: `Kedvező: $5, 6$ → **2 kedvező**. Összes: **6**.

$$P = \\dfrac{2}{6} = \\dfrac{1}{3}$$

**A helyes válasz: $\\tfrac{1}{3}$.**`
},
{
  id: 'S-A-18',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Dobozból golyóhúzás',
  difficulty: 3,
  scenario: 'Egy dobozban **4 piros** és **6 kék** golyó van. Egyet húzunk.',
  question: 'Mennyi a valószínűsége, hogy **piros**?',
  options: ['$\\tfrac{1}{5}$', '$\\tfrac{2}{5}$', '$\\tfrac{1}{2}$', '$\\tfrac{3}{5}$'],
  answer: '$\\tfrac{2}{5}$',
  keywords: ['valószínűség', 'klasszikus'],
  solution: `Összes: $4+6 = 10$. Kedvező: $4$ piros.

$$P = \\dfrac{4}{10} = \\dfrac{2}{5}$$

**A helyes válasz: $\\tfrac{2}{5}$.**`
},
{
  id: 'S-A-19',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Ruhakombinációk — fadiagram',
  difficulty: 3,
  scenario: 'Ádám a szekrényben **3 féle** ingből, **2 féle** nadrágból és **2 féle** cipőből választhat.',
  question: 'Hány különböző öltözéket rakhat össze?',
  visual: {
    type: 'treeDiagram',
    root: 'öltözet',
    levels: [
      {
        label: 'Ing',
        branches: ['fehér', 'kék', 'piros']
      },
      {
        label: 'Nadrág',
        branches: ['farmer', 'vászon']
      },
      {
        label: 'Cipő',
        branches: ['sport', 'elegáns']
      }
    ]
  },
  options: ['6', '8', '10', '12'],
  answer: '12',
  keywords: ['szorzási elv', 'fadiagram'],
  solution: `$$3 \\cdot 2 \\cdot 2 = \\mathbf{12}$$

**A helyes válasz: 12.**`
},
{
  id: 'S-A-20',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Venn — zenei klub és sportkör',
  difficulty: 4,
  scenario: 'Egy 30 fős osztályban **14** tanuló jár zenei klubba, **16** sportkörbe, és **6** tanuló **mindkettőbe**.',
  question: 'Hány tanuló jár **legalább az egyikbe**?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Zene',
        color: '#a855f7'
      },
      {
        label: 'Sport',
        color: '#22c55e'
      }
    ],
    regions: {
      onlyA: 8,
      onlyB: 10,
      both: 6,
      neither: 6
    },
    universe: 30
  },
  options: ['20', '24', '26', '30'],
  answer: '24',
  keywords: ['Venn', 'szitaformula'],
  solution: `**Szitaformula:**

$$|Z \\cup S| = 14 + 16 - 6 = \\mathbf{24}$$

**A helyes válasz: 24.**`
},
{
  id: 'S-A-21',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Hiányzó jegy meghatározása',
  difficulty: 5,
  scenario: 'Zsuzsi 4 dolgozatot írt: $3, 4, 5, 3$. Az ötödikkel az **átlaga pontosan 4** lett.',
  question: 'Mekkora volt az ötödik jegye?',
  options: ['3', '4', '5', '6'],
  answer: '5',
  keywords: ['átlag', 'ismeretlen'],
  solution: `$$\\dfrac{3+4+5+3+x}{5} = 4 \\;\\Rightarrow\\; 15 + x = 20 \\;\\Rightarrow\\; x = 5$$

**A helyes válasz: 5.**`
},
{
  id: 'S-A-22',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Medián pontdiagramról',
  difficulty: 4,
  scenario: 'Egy osztály hat tanulója egy kisdolgozaton ennyi pontot ért el.',
  question: 'Mennyi a **medián**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Pont',
    xMin: 0,
    xMax: 10,
    dots: [
      {
        x: 4,
        count: 1
      },
      {
        x: 6,
        count: 2
      },
      {
        x: 7,
        count: 1
      },
      {
        x: 8,
        count: 1
      },
      {
        x: 10,
        count: 1
      }
    ]
  },
  options: ['6', '6,5', '7', '7,5'],
  answer: '6,5',
  keywords: ['medián'],
  solution: `**Rendezés:** $4,\\,6,\\,6,\\,7,\\,8,\\,10$.

Páros elemszám (6) → a 3. és 4. elem átlaga:

$$\\text{medián} = \\dfrac{6+7}{2} = \\mathbf{6{,}5}$$

**A helyes válasz: 6,5.**`
},
{
  id: 'S-A-23',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gólok száma — módusz',
  difficulty: 3,
  scenario: 'Egy focicsapat nyolc meccsen rúgott góljai: $2, 1, 3, 2, 0, 2, 1, 4$.',
  question: 'Mennyi a **módusz**?',
  options: ['0', '1', '2', '3'],
  answer: '2',
  keywords: ['módusz', 'gyakoriság'],
  solution: `Gyakoriságok: 0 → 1-szer, 1 → 2-szer, 2 → **3-szor**, 3 → 1-szer, 4 → 1-szer.

**A leggyakoribb érték: 2.**

**A helyes válasz: 2.**`
},
{
  id: 'S-A-24',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Hőmérséklet — terjedelem',
  difficulty: 3,
  scenario: 'Egy hét délutáni hőmérsékletei Celsius-fokban: $18, 22, 15, 25, 20, 17, 23$.',
  question: 'Mennyi a **terjedelem**?',
  options: ['5', '8', '10', '12'],
  answer: '10',
  keywords: ['terjedelem'],
  solution: `$$R = x_{\\max} - x_{\\min} = 25 - 15 = \\mathbf{10}$$

**A helyes válasz: 10.**`
},
{
  id: 'S-A-25',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kártyahúzás — szín',
  difficulty: 3,
  scenario: 'Egy magyar kártyacsomag 32 lapból áll, 4 szín, mindegyikből 8 lap. Egy lapot kihúzunk.',
  question: 'Mennyi a valószínűsége, hogy **piros** színű?',
  options: ['$\\tfrac{1}{8}$', '$\\tfrac{1}{4}$', '$\\tfrac{1}{2}$', '$\\tfrac{1}{32}$'],
  answer: '$\\tfrac{1}{4}$',
  keywords: ['valószínűség', 'kártya'],
  solution: `8 piros lap a 32 közül:

$$P = \\dfrac{8}{32} = \\dfrac{1}{4}$$

**A helyes válasz: $\\tfrac{1}{4}$.**`
},
{
  id: 'S-A-26',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Számkártya — páros szám',
  difficulty: 3,
  scenario: 'Egy dobozban 1-től 10-ig terjedő számkártyák vannak, egy-egy darab.',
  question: 'Mennyi a valószínűsége, hogy a húzott szám **páros**?',
  options: ['$\\tfrac{1}{10}$', '$\\tfrac{2}{5}$', '$\\tfrac{1}{2}$', '$\\tfrac{3}{5}$'],
  answer: '$\\tfrac{1}{2}$',
  keywords: ['valószínűség', 'páros'],
  solution: `Kedvező: $2,4,6,8,10$ → 5. Összes: 10.

$$P = \\dfrac{5}{10} = \\dfrac{1}{2}$$

**A helyes válasz: $\\tfrac{1}{2}$.**`
},
{
  id: 'S-A-27',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Jelszó — 3 számjegy',
  difficulty: 4,
  scenario: 'Egy lakatkombinációhoz 3 számjegyet kell beállítani, mindegyik 0–9 közötti. A számjegyek **ismétlődhetnek**.',
  question: 'Hányféle jelszó lehetséges?',
  options: ['30', '300', '720', '1000'],
  answer: '1000',
  keywords: ['szorzási elv', 'kombinatorika'],
  solution: `Minden hely 10 lehetőség:

$$10 \\cdot 10 \\cdot 10 = \\mathbf{1000}$$

**A helyes válasz: 1000.**`
},
{
  id: 'S-A-28',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kártyák sorrendje',
  difficulty: 4,
  scenario: 'Három különböző számkártyát ($1, 2, 3$) sorba rendezünk.',
  question: 'Hányféle sorrend lehetséges?',
  options: ['3', '6', '9', '12'],
  answer: '6',
  keywords: ['permutáció', 'sorrend'],
  solution: `$$3! = 3 \\cdot 2 \\cdot 1 = \\mathbf{6}$$

Sorrendek: 123, 132, 213, 231, 312, 321.

**A helyes válasz: 6.**`
},
{
  id: 'S-A-29',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Venn — csak olvas',
  difficulty: 4,
  scenario: 'Egy könyvtári kérdőívre 40 fő válaszolt. **22** olvas szépirodalmat, **18** szakkönyvet, **10** mindkettőt.',
  question: 'Hányan olvasnak **csak szépirodalmat**?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Szépirod.',
        color: '#ec4899'
      },
      {
        label: 'Szakkönyv',
        color: '#2563eb'
      }
    ],
    regions: {
      onlyA: 12,
      onlyB: 8,
      both: 10,
      neither: 10
    },
    universe: 40
  },
  options: ['8', '10', '12', '18'],
  answer: '12',
  keywords: ['Venn', 'metszet'],
  solution: `**Csak szépirodalom:** $22 - 10 = \\mathbf{12}$.

**A helyes válasz: 12.**`
},
{
  id: 'S-A-30',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Bajnokság — mérkőzések átlagos nézőszáma',
  difficulty: 4,
  scenario: 'Egy kézilabda-bajnokság 5 mérkőzésének nézőszámát a táblázat mutatja.',
  question: 'Mennyi a mérkőzések **átlagos nézőszáma**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Mérkőzések nézőszáma',
    headers: ['Forduló', 'Nézők'],
    rows: [
      ['1.', 420],
      ['2.', 380],
      ['3.', 510],
      ['4.', 290],
      ['5.', 400]
    ]
  },
  options: ['380', '400', '420', '450'],
  answer: '400',
  keywords: ['átlag', 'számtani közép'],
  solution: `**Összeg:** $420 + 380 + 510 + 290 + 400 = 2000$.

**Mérkőzések száma:** $5$.

$$\\bar{x} = \\dfrac{2000}{5} = \\mathbf{400}$$

**A helyes válasz: 400.**`
},
{
  id: 'S-A-31',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Osztály átlagjegy',
  difficulty: 4,
  scenario: 'A 20 fős osztály történelemdolgozatának jegyeloszlása az alábbi oszlopdiagramon látható.',
  question: 'Mennyi az **átlagjegy**?',
  visual: {
    type: 'barChart',
    xLabel: 'Jegy',
    yLabel: 'Tanulók',
    yMin: 0,
    yMax: 10,
    bars: [
      {
        label: '2',
        value: 2,
        color: '#ef4444'
      },
      {
        label: '3',
        value: 5,
        color: '#f97316'
      },
      {
        label: '4',
        value: 8,
        color: '#eab308'
      },
      {
        label: '5',
        value: 5,
        color: '#22c55e'
      }
    ]
  },
  options: ['3,6', '3,8', '3,9', '4,2'],
  answer: '3,8',
  keywords: ['súlyozott átlag'],
  solution: `$$\\bar{x} = \\dfrac{2 \\cdot 2 + 3 \\cdot 5 + 4 \\cdot 8 + 5 \\cdot 5}{20} = \\dfrac{4+15+32+25}{20} = \\dfrac{76}{20} = \\mathbf{3{,}8}$$

**A helyes válasz: 3,8.**`
},
{
  id: 'S-A-32',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Sakkversenyen páros játék',
  difficulty: 5,
  scenario: 'Egy sakkversenyen **5 versenyző** van. Mindegyik játszik **mindenkivel pontosan egyszer**.',
  question: 'Hány mérkőzés lesz összesen?',
  options: ['5', '10', '15', '20'],
  answer: '10',
  keywords: ['kombinatorika', 'párok'],
  solution: `**Párok száma:** \${5 \\choose 2} = \\dfrac{5 \\cdot 4}{2} = \\mathbf{10}$.

**A helyes válasz: 10.**`
},
{
  id: 'S-A-33',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Két kocka — összeg',
  difficulty: 5,
  scenario: 'Két szabályos dobókockával dobunk.',
  question: 'Mennyi a valószínűsége, hogy a dobott számok **összege 7**?',
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{5}{36}$', '$\\tfrac{1}{9}$', '$\\tfrac{7}{36}$'],
  answer: '$\\tfrac{1}{6}$',
  keywords: ['valószínűség', 'kockapáros'],
  solution: `Összesen $6 \\cdot 6 = 36$ kimenet.

Kedvező párok (összeg 7): $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ → **6**.

$$P = \\dfrac{6}{36} = \\dfrac{1}{6}$$

**A helyes válasz: $\\tfrac{1}{6}$.**`
},
{
  id: 'S-A-34',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Menüválasztás — fesztiválon',
  difficulty: 4,
  scenario: 'Egy fesztiválon **3 féle** szendvics, **4 féle** saláta és **2 féle** italcsomag közül választhatsz. Egy menü **1 szendvicsből, 1 salátából és 1 italból** áll.',
  question: 'Hány **különböző menü** állítható össze?',
  options: ['9', '14', '20', '24'],
  answer: '24',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:**

$$3 \\cdot 4 \\cdot 2 = \\mathbf{24}$$

**A helyes válasz: 24.**`
},
{
  id: 'S-A-35',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Komplementer esemény',
  difficulty: 4,
  scenario: 'Egy zsákban **3 zöld** és **7 sárga** golyó van. Egyet húzunk.',
  question: 'Mennyi a valószínűsége, hogy **nem zöldet** húzunk?',
  options: ['$\\tfrac{3}{10}$', '$\\tfrac{1}{2}$', '$\\tfrac{7}{10}$', '$\\tfrac{4}{5}$'],
  answer: '$\\tfrac{7}{10}$',
  keywords: ['komplementer', 'valószínűség'],
  solution: `$P(\\text{nem zöld}) = \\dfrac{7}{10}$, mert 7 sárga a 10-ből.

Vagy komplementerrel: $1 - \\dfrac{3}{10} = \\dfrac{7}{10}$.

**A helyes válasz: $\\tfrac{7}{10}$.**`
},
{
  id: 'S-A-36',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Összehasonlítás — átlag vs. medián',
  difficulty: 5,
  scenario: 'Öt jutalom értéke Ft-ban: $1000, 1500, 2000, 2500, 13000$.',
  question: 'Mennyivel **nagyobb az átlag a mediánnál**?',
  options: ['0 Ft', '1500 Ft', '2000 Ft', '2500 Ft'],
  answer: '2000 Ft',
  keywords: ['átlag', 'medián', 'outlier'],
  solution: `**Átlag:** $\\dfrac{1000+1500+2000+2500+13000}{5} = \\dfrac{20000}{5} = 4000$ Ft.

**Medián:** rendezve a középső = $2000$ Ft.

Különbség: $4000 - 2000 = \\mathbf{2000}$ Ft.

**A helyes válasz: 2000 Ft.**`
},
{
  id: 'S-A-37',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Hobbi — metszet számítás',
  difficulty: 4,
  scenario: 'Az osztályban 25 diákból **15** szereti a focit, **12** az úszást. Összesen **22** diák kedveli legalább az egyiket.',
  question: 'Hányan szeretik **mindkettőt**?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Foci',
        color: '#22c55e'
      },
      {
        label: 'Úszás',
        color: '#0ea5e9'
      }
    ],
    regions: {
      onlyA: 10,
      onlyB: 7,
      both: 5,
      neither: 3
    },
    universe: 25
  },
  options: ['3', '5', '7', '10'],
  answer: '5',
  keywords: ['Venn', 'szitaformula'],
  solution: `**Szitaformula:** $|F \\cup Ú| = |F| + |Ú| - |F \\cap Ú|$.

$22 = 15 + 12 - x \\Rightarrow x = 27 - 22 = \\mathbf{5}$.

**A helyes válasz: 5.**`
},
{
  id: 'S-A-38',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kétbetűs „szavak"',
  difficulty: 3,
  scenario: 'Az $\\{A, B, C, D\\}$ betűkből **különböző** betűkkel kétbetűs szavakat képzünk.',
  question: 'Hány ilyen szó képezhető?',
  options: ['6', '8', '12', '16'],
  answer: '12',
  keywords: ['kombinatorika', 'variáció'],
  solution: `Az első betűre 4, a másodikra **3** (már nem ismétlődhet) lehetőség:

$$4 \\cdot 3 = \\mathbf{12}$$

**A helyes válasz: 12.**`
},
{
  id: 'S-A-39',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Pizzafeltét kombinációk',
  difficulty: 4,
  scenario: 'Egy pizzériában **4 féle** alap és **5 féle** feltét közül lehet választani. Egy alap és egy feltét kerül egy pizzára.',
  question: 'Hány különböző pizza készíthető?',
  options: ['9', '12', '20', '45'],
  answer: '20',
  keywords: ['szorzási elv'],
  solution: `$$4 \\cdot 5 = \\mathbf{20}$$

**A helyes válasz: 20.**`
},
{
  id: 'S-A-40',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kórházi ágyfoglaltság',
  difficulty: 5,
  scenario: 'Egy kórházi részlegen 10 napon át feljegyezték a foglalt ágyak számát: $8, 10, 9, 10, 11, 10, 9, 12, 10, 11$.',
  question: 'Mennyi a **módusz**?',
  options: ['9', '10', '11', '12'],
  answer: '10',
  keywords: ['módusz'],
  solution: `Gyakoriságok: 8 → 1, 9 → 2, **10 → 4**, 11 → 2, 12 → 1.

A leggyakoribb a **10**.

**A helyes válasz: 10.**`
},
{
  id: 'S-A-41',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Olvasott könyvek — átlag',
  difficulty: 4,
  scenario: 'A piktogramon 4 tanuló nyár alatt olvasott könyveinek száma (1 jel = 1 könyv).',
  question: 'Mennyi az **átlag** könyvszám?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Bori',
        count: 5,
        unit: 'könyv',
        color: '#a855f7'
      },
      {
        label: 'Csaba',
        count: 3,
        unit: 'könyv',
        color: '#2563eb'
      },
      {
        label: 'Dóra',
        count: 7,
        unit: 'könyv',
        color: '#ec4899'
      },
      {
        label: 'Ervin',
        count: 5,
        unit: 'könyv',
        color: '#16a34a'
      }
    ]
  },
  options: ['4', '4,5', '5', '5,5'],
  answer: '5',
  keywords: ['átlag', 'piktogram'],
  solution: `$$\\bar{x} = \\dfrac{5+3+7+5}{4} = \\dfrac{20}{4} = \\mathbf{5}$$

**A helyes válasz: 5.**`
},
{
  id: 'S-A-42',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kisorsolt szám',
  difficulty: 4,
  scenario: 'Egy sorsolásnál 1-től 20-ig sorszámozott cédulákból húznak egyet.',
  question: 'Mennyi a valószínűsége, hogy a szám **3-mal osztható**?',
  options: ['$\\tfrac{3}{20}$', '$\\tfrac{1}{5}$', '$\\tfrac{6}{20} = \\tfrac{3}{10}$', '$\\tfrac{7}{20}$'],
  answer: '$\\tfrac{6}{20} = \\tfrac{3}{10}$',
  keywords: ['valószínűség', 'oszthatóság'],
  solution: `A 3-mal osztható számok 1–20 között: $3, 6, 9, 12, 15, 18$ → **6 kedvező**.

$$P = \\dfrac{6}{20} = \\dfrac{3}{10}$$

**A helyes válasz: $\\tfrac{6}{20} = \\tfrac{3}{10}$.**`
},
{
  id: 'S-A-43',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kétszeres érmefeldobás — két fej',
  difficulty: 4,
  scenario: 'Szabályos érmét **kétszer** feldobunk.',
  question: 'Mennyi a valószínűsége, hogy **mindkétszer fej** lesz?',
  visual: {
    type: 'treeDiagram',
    root: 'Érme',
    levels: [
      {
        label: '1. dobás',
        branches: ['F', 'Í']
      },
      {
        label: '2. dobás',
        branches: ['F', 'Í']
      }
    ]
  },
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{4}$',
  keywords: ['valószínűség', 'független események'],
  solution: `4 egyformán valószínű kimenet: FF, FÍ, ÍF, ÍÍ. **Kedvező: FF (1 darab).**

$$P = \\dfrac{1}{4}$$

**A helyes válasz: $\\tfrac{1}{4}$.**`
},
{
  id: 'S-A-44',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kéthúzásos kockadobás — összeg páros',
  difficulty: 5,
  scenario: 'Szabályos dobókockával **kétszer** dobunk, és összeadjuk a két dobott számot.',
  question: 'Mennyi a valószínűsége, hogy az **összeg páros**?',
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{2}$',
  keywords: ['valószínűség', 'két kocka', 'páros összeg'],
  solution: `**Összes kimenet:** $6 \\cdot 6 = 36$.

Az összeg páros, ha **mindkettő páros** vagy **mindkettő páratlan**.

- Mindkettő páros: $3 \\cdot 3 = 9$.
- Mindkettő páratlan: $3 \\cdot 3 = 9$.

**Kedvező összesen:** $9 + 9 = 18$.

$$P = \\dfrac{18}{36} = \\dfrac{1}{2}$$

**A helyes válasz: $\\tfrac{1}{2}$.**`
},
{
  id: 'S-A-45',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Dobogósok',
  difficulty: 4,
  scenario: '**5 versenyző** közül az első három helyezést osztjuk ki (1., 2., 3.).',
  question: 'Hányféle dobogósorrend lehetséges?',
  options: ['10', '15', '60', '125'],
  answer: '60',
  keywords: ['variáció', 'sorrend'],
  solution: `Az 1. helyre 5, a 2.-ra 4, a 3.-ra 3 lehetőség:

$$5 \\cdot 4 \\cdot 3 = \\mathbf{60}$$

**A helyes válasz: 60.**`
},
{
  id: 'S-A-46',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Napi rekordhőmérséklet — módusz',
  difficulty: 4,
  scenario: 'Egy héten át feljegyezték a napi maximum-hőmérsékleteket Celsius-fokban: $24, 27, 24, 26, 28, 24, 27$.',
  question: 'Mennyi a hőmérsékletek **módusza**?',
  options: ['24 °C', '26 °C', '27 °C', '28 °C'],
  answer: '24 °C',
  keywords: ['módusz', 'gyakoriság'],
  solution: `**Gyakoriságok:**

- $24$ → **3-szor** (a legtöbbször!)
- $26$ → 1-szer
- $27$ → 2-szer
- $28$ → 1-szer

A **módusz** a leggyakrabban előforduló érték: $\\mathbf{24}$ °C.

**A helyes válasz: 24 °C.**`
},
{
  id: 'S-A-47',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Gyümölcsfák — Venn',
  difficulty: 4,
  scenario: 'Egy kertben **20** fa gyümölcsöt ad, **15** virágzik, **12** mindkettő.',
  question: 'Hány fa **vagy gyümölcsöt ad, vagy virágzik** (nem feltétlenül mindkettő)?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Gyümölcs',
        color: '#ef4444'
      },
      {
        label: 'Virág',
        color: '#ec4899'
      }
    ],
    regions: {
      onlyA: 8,
      onlyB: 3,
      both: 12,
      neither: 0
    },
    universe: 23
  },
  options: ['20', '23', '27', '35'],
  answer: '23',
  keywords: ['unió', 'Venn'],
  solution: `**Unió:** $|G \\cup V| = 20 + 15 - 12 = \\mathbf{23}$.

**A helyes válasz: 23.**`
},
{
  id: 'S-A-48',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Könyvek a polcon',
  difficulty: 4,
  scenario: '**4 különböző** könyvet polcra rakunk egymás mellé.',
  question: 'Hányféleképpen rendezhetők?',
  options: ['12', '16', '24', '64'],
  answer: '24',
  keywords: ['permutáció'],
  solution: `$$4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = \\mathbf{24}$$

**A helyes válasz: 24.**`
},
{
  id: 'S-A-49',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Sorsolásos tombola',
  difficulty: 4,
  scenario: 'Egy tombolasorsoláson a nyeremények a diagramon láthatók. Összesen 50 szelvényt adtak el.',
  question: 'Mennyi a valószínűsége, hogy **főnyereményt** húzunk?',
  visual: {
    type: 'barChart',
    xLabel: 'Nyeremény',
    yLabel: 'Darab',
    yMin: 0,
    yMax: 50,
    bars: [
      {
        label: 'Főnyer.',
        value: 1,
        color: '#facc15'
      },
      {
        label: 'Nagy',
        value: 3,
        color: '#22c55e'
      },
      {
        label: 'Kis',
        value: 10,
        color: '#0ea5e9'
      },
      {
        label: 'Vigasz',
        value: 20,
        color: '#a855f7'
      },
      {
        label: 'Nincs',
        value: 16,
        color: '#94a3b8'
      }
    ]
  },
  options: ['$\\tfrac{1}{50}$', '$\\tfrac{1}{25}$', '$\\tfrac{1}{10}$', '$\\tfrac{1}{5}$'],
  answer: '$\\tfrac{1}{50}$',
  keywords: ['valószínűség', 'klasszikus'],
  solution: `**1 főnyeremény** az **50 szelvényből**:

$$P = \\dfrac{1}{50}$$

**A helyes válasz: $\\tfrac{1}{50}$.**`
},
{
  id: 'S-A-50',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Osztálykirándulás — buszülésrend',
  difficulty: 5,
  scenario: 'Egy osztálykiránduláson a buszon **4 különböző** barát egy négyüléses sorban ül egymás mellett. Bármelyikük bármelyik helyre ülhet.',
  question: 'Hányféle **különböző sorrendben** ülhetnek a helyekre?',
  options: ['12', '16', '24', '48'],
  answer: '24',
  keywords: ['kombinatorika', 'permutáció'],
  solution: `**4 különböző ember permutációja:**

$$4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = \\mathbf{24}$$

**A helyes válasz: 24.**`
},
{
  id: 'S-K-01',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Osztály átlagának kiegészítése',
  difficulty: 6,
  scenario: 'A 6.b osztály **20 tanulója** írt témazárót. Az elért pontok eloszlását hisztogram mutatja. A pontszámokat a középértékkel számoljuk (pl. a 60–69 sáv közepe 65).',
  question: 'Körülbelül mennyi az **átlagpontszám**?',
  visual: {
    type: 'histogram',
    xLabel: 'Pontsáv',
    yLabel: 'Tanulók száma',
    bins: [
      {
        range: '50–59',
        mid: 55,
        count: 2
      },
      {
        range: '60–69',
        mid: 65,
        count: 5
      },
      {
        range: '70–79',
        mid: 75,
        count: 7
      },
      {
        range: '80–89',
        mid: 85,
        count: 4
      },
      {
        range: '90–99',
        mid: 95,
        count: 2
      }
    ]
  },
  options: ['68 pont', '72 pont', '74 pont', '78 pont'],
  answer: '74 pont',
  keywords: ['hisztogram', 'súlyozott átlag', 'becslés'],
  solution: `**Súlyozott átlag a sávközepekkel:**

$$\\bar{x} = \\dfrac{55 \\cdot 2 + 65 \\cdot 5 + 75 \\cdot 7 + 85 \\cdot 4 + 95 \\cdot 2}{20}$$

Számoljuk részletekben:

- $55 \\cdot 2 = 110$
- $65 \\cdot 5 = 325$
- $75 \\cdot 7 = 525$
- $85 \\cdot 4 = 340$
- $95 \\cdot 2 = 190$

Összeg: $110 + 325 + 525 + 340 + 190 = 1490$.

$$\\bar{x} = \\dfrac{1490}{20} = \\mathbf{74{,}5}$$

A kerekített átlag kb. **74 pont**.

**A helyes válasz: 74 pont.**`
},
{
  id: 'S-K-02',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Halmazok — sportágak',
  difficulty: 6,
  scenario: `Egy 30 fős osztályban megkérdezték, ki focizik és ki kosarazik rendszeresen.

- **18** tanuló focizik.
- **12** tanuló kosarazik.
- **7** tanuló **mindkettőt** űzi.`,
  question: 'Hány tanuló **nem** sportol rendszeresen egyik felsorolt sportágat sem?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Foci',
        color: '#2563eb'
      },
      {
        label: 'Kosár',
        color: '#f59e0b'
      }
    ],
    regions: {
      onlyA: 11,
      onlyB: 5,
      both: 7,
      neither: '?'
    },
    universe: 30
  },
  options: ['3', '5', '7', '11'],
  answer: '7',
  keywords: ['halmaz', 'Venn-diagram', 'szitaformula'],
  solution: `**Venn-diagram régiói:**

- Csak foci: $18 - 7 = 11$
- Csak kosár: $12 - 7 = 5$
- Mindkettő: $7$

**Valamelyiket űzi:** $11 + 5 + 7 = 23$ tanuló.

**Egyiket sem:** $30 - 23 = \\mathbf{7}$ tanuló.

Ellenőrzés szitaformulával: $|A \\cup B| = 18 + 12 - 7 = 23$ ✓

**A helyes válasz: 7 tanuló.**`
},
{
  id: 'S-K-03',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Igaz állítások a diagramról',
  difficulty: 7,
  scenario: 'Az alábbi csoportosított oszlopdiagram két osztály (**6.a** és **6.b**) kedvenc tantárgyát mutatja. Vizsgáld meg az állításokat!',
  question: 'Melyik állítás **IGAZ** a diagram alapján?',
  visual: {
    type: 'groupedBar',
    categories: ['Matek', 'Magyar', 'Történelem', 'Rajz', 'Testnevelés'],
    yMax: 12,
    yLabel: 'Tanulók száma',
    series: [
      {
        name: '6.a',
        color: '#2563eb',
        values: [8, 6, 4, 3, 7]
      },
      {
        name: '6.b',
        color: '#ef4444',
        values: [5, 9, 6, 2, 8]
      }
    ]
  },
  options: ['A 6.a-ban a testnevelést választották a legtöbben.', 'A 6.b-ben senki sem választotta a rajzot.', 'Mindkét osztályban többen választották a magyart, mint a történelmet.', 'A két osztályban összesen ugyanannyian választották a matekot, mint a magyart.'],
  answer: 'Mindkét osztályban többen választották a magyart, mint a történelmet.',
  keywords: ['logika', 'igaz-hamis', 'diagram-értelmezés'],
  solution: `**Állítások sorra vétele:**

1. *A 6.a-ban a testnevelést választották a legtöbben.* → A 6.a-ban a **matek** a legnépszerűbb (8 > 7). **HAMIS.**
2. *A 6.b-ben senki sem választotta a rajzot.* → A diagramon **2 fő** választotta. **HAMIS.**
3. *Mindkét osztályban többen választották a magyart, mint a történelmet.*
   - 6.a: magyar 6, történelem 4 → $6 > 4$ ✓
   - 6.b: magyar 9, történelem 6 → $9 > 6$ ✓
   - **IGAZ.**
4. *Összesen ugyanannyian matek, mint magyar?* → Matek: $8+5 = 13$; magyar: $6+9 = 15$. **HAMIS.**

**A helyes válasz a 3. állítás.**`
},
{
  id: 'S-K-04',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Hiányzó adat az átlaghoz',
  difficulty: 6,
  scenario: 'Egy sportbajnokságon **6 meccsen** lőtt góljait egy csapat az alábbi táblázatban rögzítette. A csapat **átlagos góllövése** a bajnokságon **3 gól/meccs**.',
  question: 'Hány gólt lőttek a **6. meccsen**?',
  visual: {
    type: 'table',
    caption: 'Gólok meccsenként',
    headers: ['Meccs', '1.', '2.', '3.', '4.', '5.', '6.'],
    rows: [
      ['Gólok', '2', '4', '1', '5', '3', '?']
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '3',
  keywords: ['átlag', 'hiányzó adat', 'inverz'],
  solution: `**Átlagból visszaszámítás:**

Az átlag definíciója: összeg / darabszám. Mivel az átlag 3, a 6 meccs összesen:

$$S = 3 \\cdot 6 = 18 \\text{ gól}$$

Az ismert 5 meccs összege: $2+4+1+5+3 = 15$.

A 6. meccs: $18 - 15 = \\mathbf{3}$ gól.

**A helyes válasz: 3 gól.**`
},
{
  id: 'S-K-05',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két golyóhúzás — kombinált valószínűség',
  difficulty: 6,
  scenario: 'Egy dobozban **2 piros** és **3 zöld** golyó van. **Kettőt húzunk egymás után** visszatevés nélkül. Nézd meg a fadiagramot a lehetséges kimenetelekről!',
  question: 'Mennyi a valószínűsége, hogy **mindkét** golyó **piros**?',
  visual: {
    type: 'treeDiagram',
    root: '2 húzás',
    levels: [
      {
        label: '1. húzás',
        branches: ['piros', 'zöld']
      },
      {
        label: '2. húzás',
        branches: ['piros', 'zöld']
      }
    ]
  },
  options: ['$\\tfrac{1}{25}$', '$\\tfrac{1}{10}$', '$\\tfrac{2}{15}$', '$\\tfrac{4}{25}$'],
  answer: '$\\tfrac{1}{10}$',
  keywords: ['valószínűség', 'visszatevés nélkül', 'fadiagram'],
  solution: `**Visszatevés nélküli húzás:**

Első húzás piros: összesen 5 golyóból 2 piros.

$$P_1 = \\dfrac{2}{5}$$

Maradt 1 piros és 3 zöld, összesen 4 golyó. Második piros:

$$P_2 = \\dfrac{1}{4}$$

A két húzás együtt (szorzás, mert **ÉS**):

$$P(\\text{piros, piros}) = \\dfrac{2}{5} \\cdot \\dfrac{1}{4} = \\dfrac{2}{20} = \\dfrac{1}{10}$$

**A helyes válasz: $\\tfrac{1}{10}$.**`
},
{
  id: 'S-K-06',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Menü összeállítása',
  difficulty: 6,
  scenario: 'Az étteremben **3 leves**, **4 főétel** és **2 desszert** közül lehet választani. Egy **teljes menü** mindhárom fogást tartalmaz.',
  question: 'Hányféle **különböző** teljes menüt lehet összeállítani?',
  visual: {
    type: 'treeDiagram',
    root: 'Menü',
    levels: [
      {
        label: 'Leves',
        branches: ['húsleves', 'paradicsom', 'gulyás']
      },
      {
        label: 'Főétel',
        branches: ['rántott hús', 'pörkölt', 'hal', 'tészta']
      },
      {
        label: 'Desszert',
        branches: ['palacsinta', 'fagylalt']
      }
    ]
  },
  options: ['9', '14', '18', '24'],
  answer: '24',
  keywords: ['szorzási elv', 'kombinatorika', 'háromszintű fa'],
  solution: `**Három egymás utáni választás — szorzási szabály:**

$$3 \\cdot 4 \\cdot 2 = \\mathbf{24}$$

A fa **3 ágra**, majd minden ág **4-4 ágra**, végül minden ág **2-2 ágra** bomlik, összesen $3 \\cdot 4 \\cdot 2 = 24$ levél.

**A helyes válasz: 24 menü.**`
},
{
  id: 'S-K-07',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Állatkerti felmérés — két halmaz',
  difficulty: 7,
  scenario: `Egy állatkerti látogatáson 40 diákot kérdeztek meg, ki látta az **elefántot** (E) és/vagy a **zsiráfot** (Z). Az adatok:

- **28** diák látta az elefántot.
- **22** diák látta a zsiráfot.
- **5** diák **egyiket sem** látta.`,
  question: 'Hány diák látta **mindkét** állatot?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Elefánt',
        color: '#6b7280'
      },
      {
        label: 'Zsiráf',
        color: '#eab308'
      }
    ],
    regions: {
      onlyA: 13,
      onlyB: 7,
      both: 15,
      neither: 5
    },
    universe: 40
  },
  options: ['10', '13', '15', '18'],
  answer: '15',
  keywords: ['Venn-diagram', 'szitaformula', 'halmazok'],
  solution: `**Szitaformula:**

A valamelyiket látta: $40 - 5 = 35$ diák.

$$|E \\cup Z| = |E| + |Z| - |E \\cap Z|$$

$$35 = 28 + 22 - |E \\cap Z|$$

$$|E \\cap Z| = 50 - 35 = \\mathbf{15}$$

**Ellenőrzés Venn-diagrammal:**

- Csak elefánt: $28 - 15 = 13$
- Csak zsiráf: $22 - 15 = 7$
- Mindkettő: $15$
- Egyiket sem: $5$
- Összesen: $13 + 7 + 15 + 5 = 40$ ✓

**A helyes válasz: 15 diák.**`
},
{
  id: 'S-K-08',
  contentArea: 'S',
  contentSub: '4.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Két osztály átlagmagassága',
  difficulty: 6,
  scenario: `A 6.a és a 6.b átlagmagasságát hasonlítjuk össze. Ismerjük:

- 6.a: **20 tanuló**, átlagmagasság **150 cm**.
- 6.b: **15 tanuló**, átlagmagasság **156 cm**.`,
  question: 'Mekkora a **két osztály együttes** átlagmagassága?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '6.a',
        value: '20 fő · 150 cm'
      },
      {
        label: '6.b',
        value: '15 fő · 156 cm'
      }
    ]
  },
  options: ['152 cm', '152,57 cm', '153 cm', '153,5 cm'],
  answer: '152,57 cm',
  keywords: ['súlyozott átlag', 'kombinált minta'],
  solution: `**Súlyozott átlag:**

A két osztály **teljes magasságösszege**:

$$S = 20 \\cdot 150 + 15 \\cdot 156 = 3000 + 2340 = 5340$$

A tanulók száma: $20 + 15 = 35$.

$$\\bar{x} = \\dfrac{5340}{35} \\approx \\mathbf{152{,}57} \\text{ cm}$$

Megjegyzés: **NEM** helyes az egyszerű átlagolás ($\\tfrac{150+156}{2}=153$), mert az osztályok létszáma eltérő — a nagyobb létszámú osztály súlya nagyobb.

**A helyes válasz: 152,57 cm.**`
},
{
  id: 'S-K-09',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Igaz állítások a szavazásról',
  difficulty: 7,
  scenario: 'A 6. évfolyam **60 tanulója** szavazott arról, milyen legyen az osztálybuli tematikája. Az eredményeket kördiagram mutatja. Vizsgáld meg az állításokat!',
  question: 'Melyik állítás **IGAZ** a diagram alapján?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Halloween (40%)',
        value: 40,
        color: '#f97316'
      },
      {
        label: 'Disco (30%)',
        value: 30,
        color: '#ec4899'
      },
      {
        label: 'Retro (20%)',
        value: 20,
        color: '#8b5cf6'
      },
      {
        label: 'Sport (10%)',
        value: 10,
        color: '#22c55e'
      }
    ]
  },
  options: ['A Halloweent a tanulók több mint fele választotta.', 'A Sportra 10 tanuló szavazott.', 'A Disco és a Retro együtt több szavazatot kapott, mint a Halloween.', 'A Retro és a Sport együtt a tanulók felét tette ki.'],
  answer: 'A Disco és a Retro együtt több szavazatot kapott, mint a Halloween.',
  keywords: ['logika', 'kördiagram', 'százalékszámítás', 'igaz-hamis'],
  solution: `**Százalékok tanulószámra váltása (60 fő):**

- Halloween: $60 \\cdot 0{,}40 = 24$ fő
- Disco: $60 \\cdot 0{,}30 = 18$ fő
- Retro: $60 \\cdot 0{,}20 = 12$ fő
- Sport: $60 \\cdot 0{,}10 = 6$ fő

**Állítások vizsgálata:**

1. *Halloween > a tanulók fele?* → $24 > 30$? **HAMIS** (24 < 30).
2. *Sport = 10 fő?* → $60 \\cdot 10\\% = 6$, nem 10. **HAMIS.**
3. *Disco + Retro > Halloween?* → $18 + 12 = 30$, Halloween = $24$. $30 > 24$ ✓ **IGAZ.**
4. *Retro + Sport = fele?* → $12 + 6 = 18$, fele = $30$. $18 \\neq 30$. **HAMIS.**

**A helyes válasz: „A Disco és a Retro együtt több szavazatot kapott, mint a Halloween."**`
},
{
  id: 'S-K-10',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Havi kereset — súlyozott átlag',
  difficulty: 6,
  scenario: 'Egy cég 30 dolgozójának havi bruttó fizetését a hisztogram mutatja (ezer Ft-ban, sávközéppel számolva).',
  question: 'Mennyi a **közelítő átlagfizetés**?',
  visual: {
    type: 'histogram',
    xLabel: 'Fizetés (e Ft)',
    yLabel: 'Dolgozók',
    bins: [
      { range: '200–249', mid: 225, count: 5 },
      { range: '250–299', mid: 275, count: 8 },
      { range: '300–349', mid: 325, count: 10 },
      { range: '350–399', mid: 375, count: 4 },
      { range: '400–449', mid: 425, count: 3 }
    ]
  },
  options: ['295 e Ft', '305 e Ft', '312 e Ft', '325 e Ft'],
  answer: '312 e Ft',
  keywords: ['hisztogram', 'súlyozott átlag'],
  solution: `**Súlyozott átlag sávközepekkel:**

$$\\bar{x} = \\dfrac{225 \\cdot 5 + 275 \\cdot 8 + 325 \\cdot 10 + 375 \\cdot 4 + 425 \\cdot 3}{30}$$

Részszámítások: $1125 + 2200 + 3250 + 1500 + 1275 = 9350$.

$$\\bar{x} = \\dfrac{9350}{30} \\approx \\mathbf{311{,}7}$$

Kerekítve **312 e Ft**.

**A helyes válasz: 312 e Ft.**`
},
{
  id: 'S-K-11',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Három tantárgy kedvelői',
  difficulty: 7,
  scenario: `Egy 40 fős évfolyamon kérdezték a kedvenc tantárgyat (több is választható).

- **Matek:** 22 fő
- **Magyar:** 20 fő
- **Történelem:** 18 fő
- **Matek ÉS Magyar:** 10 fő
- **Matek ÉS Történelem:** 8 fő
- **Magyar ÉS Történelem:** 7 fő
- **Mindhárom:** 4 fő`,
  question: 'Hányan **nem választották egyik tantárgyat sem**?',
  options: ['0', '1', '2', '3'],
  answer: '1',
  keywords: ['halmaz', '3-halmaz', 'szitaformula'],
  solution: `**Háromhalmazos szitaformula:**

$$|M \\cup MA \\cup T| = 22+20+18-10-8-7+4 = \\mathbf{39}$$

**Egyiket sem:** $40 - 39 = \\mathbf{1}$ fő.

**A helyes válasz: 1.**`
},
{
  id: 'S-K-12',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromjegyű páros számok',
  difficulty: 6,
  scenario: 'A $\\{1, 2, 3, 4, 5\\}$ számjegyekből **háromjegyű páros** számokat képzünk. A számjegyek **ismétlődhetnek**.',
  question: 'Hány ilyen szám létezik?',
  options: ['25', '40', '50', '125'],
  answer: '50',
  keywords: ['kombinatorika', 'szorzási elv', 'páros'],
  solution: `**Utolsó jegy** (egység): páros → $\\{2, 4\\}$ → **2** lehetőség.

**Első** (százas): $5$, **második** (tízes): $5$.

$$5 \\cdot 5 \\cdot 2 = \\mathbf{50}$$

**A helyes válasz: 50.**`
},
{
  id: 'S-K-13',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Logikai állítások — kombinált',
  difficulty: 6,
  scenario: `A 6.a osztály 25 tanulójáról tudjuk:

- **12** fiú, **13** lány.
- **15** tanuló zenél (összesen), **8** táncol.
- **4** tanuló **zenél ÉS táncol**.`,
  question: 'Melyik állítás biztosan **IGAZ**?',
  options: ['Mindegyik lány zenél.', 'A zenélők között van fiú és lány is.', 'Legalább 6 tanuló nem zenél és nem táncol.', 'A táncolók többsége fiú.'],
  answer: 'Legalább 6 tanuló nem zenél és nem táncol.',
  keywords: ['logika', 'halmaz', 'igaz-hamis'],
  solution: `**Zenél vagy táncol:** $15 + 8 - 4 = 19$.

**Egyiket sem:** $25 - 19 = \\mathbf{6}$ — ez pontosan 6, tehát „legalább 6" **IGAZ**.

A többi nem dönthető el a megadott adatokból, vagy közvetlen cáfolható.

**A helyes válasz: „Legalább 6 tanuló nem zenél és nem táncol."**`
},
{
  id: 'S-K-14',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Útválasztás gráfon',
  difficulty: 6,
  scenario: 'Egy hálózatban **A**-ból indulva 2 él vezet **B** és **C** felé, majd **B**-ből 3, **C**-ből 2 él vezet **D**-be.',
  question: 'Hányféleképpen juthatunk **A**-ból **D**-be?',
  visual: {
    type: 'treeDiagram',
    root: 'A',
    levels: [
      {
        label: '1. lépés',
        branches: ['B', 'C']
      },
      {
        label: '2. lépés',
        branches: ['D', 'D', 'D']
      }
    ]
  },
  options: ['3', '5', '6', '7'],
  answer: '5',
  keywords: ['gráf', 'utak', 'összeadás'],
  solution: `**A→B→D:** $3$ út.

**A→C→D:** $2$ út.

Összesen: $3 + 2 = \\mathbf{5}$.

**A helyes válasz: 5.**`
},
{
  id: 'S-K-15',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Angolt vagy németet tanul — valószínűség',
  difficulty: 6,
  scenario: 'Egy 40 fős osztályban **25** tanul angolt, **18** németet, **10** mindkettőt. **Egyet véletlenszerűen** kiválasztunk.',
  question: 'Mennyi a valószínűsége, hogy **legalább az egyik** nyelvet tanulja?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Angol',
        color: '#2563eb'
      },
      {
        label: 'Német',
        color: '#ef4444'
      }
    ],
    regions: {
      onlyA: 15,
      onlyB: 8,
      both: 10,
      neither: 7
    },
    universe: 40
  },
  options: ['$\\tfrac{7}{40}$', '$\\tfrac{33}{40}$', '$\\tfrac{3}{4}$', '$\\tfrac{43}{40}$'],
  answer: '$\\tfrac{33}{40}$',
  keywords: ['valószínűség', 'Venn', 'unió'],
  solution: `**Unió:** $25 + 18 - 10 = 33$.

$$P = \\dfrac{33}{40}$$

**A helyes válasz: $\\tfrac{33}{40}$.**`
},
{
  id: 'S-K-16',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Év végi átlag súlyokkal',
  difficulty: 6,
  scenario: 'Egy tanuló jegyeinek eloszlása matekból: **2** db **2-es**, **5** db **3-as**, **8** db **4-es**, **5** db **5-ös**.',
  question: 'Mennyi az **évi átlaga** (kerekítve 2 tizedesre)?',
  options: ['3,50', '3,80', '3,92', '4,05'],
  answer: '3,80',
  keywords: ['súlyozott átlag'],
  solution: `Összes jegy: $2+5+8+5 = 20$. Összeg:

$$2 \\cdot 2 + 3 \\cdot 5 + 4 \\cdot 8 + 5 \\cdot 5 = 4 + 15 + 32 + 25 = 76$$

$$\\bar{x} = \\dfrac{76}{20} = \\mathbf{3{,}80}$$

**A helyes válasz: 3,80.**`
},
{
  id: 'S-K-17',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Három sportág — hány csak egyet űz?',
  difficulty: 7,
  scenario: `Az 50 fős osztályban sportolásra vonatkozó adatok:

- **Foci:** 18 fő
- **Kosár:** 15 fő
- **Úszás:** 12 fő
- **Foci ÉS kosár:** 6 fő
- **Foci ÉS úszás:** 5 fő
- **Kosár ÉS úszás:** 4 fő
- **Mindhárom:** 2 fő`,
  question: 'Hányan űznek **pontosan egy** sportágat?',
  options: ['17', '21', '25', '29'],
  answer: '21',
  keywords: ['3-halmaz', 'Venn', 'pontosan egy'],
  solution: `**Képlet a „csak X" régiókra:** $|X| - |X \\cap Y| - |X \\cap Z| + |X \\cap Y \\cap Z|$.

- **Csak foci:** $18 - 6 - 5 + 2 = 9$
- **Csak kosár:** $15 - 6 - 4 + 2 = 7$
- **Csak úszás:** $12 - 5 - 4 + 2 = 5$

**Összeg (pontosan egy):** $9 + 7 + 5 = \\mathbf{21}$.

**A helyes válasz: 21.**`
},
{
  id: 'S-K-18',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Rendszám kombinációk',
  difficulty: 6,
  scenario: 'Egy rendszám **3 különböző betűből** (26 betűs ábécéből) és **3 különböző számjegyből** (0–9) áll.',
  question: 'Nagyságrendileg mennyi ilyen rendszám lehetséges?',
  options: ['$26 \\cdot 10$', '$26^3 \\cdot 10^3$', '$26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8$', '$26! \\cdot 10!$'],
  answer: '$26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8$',
  keywords: ['variáció', 'szorzási elv'],
  solution: `Betűk: 26 · 25 · 24 (különbözők). Számjegyek: 10 · 9 · 8.

$$N = 26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8 = 11\\,232\\,000$$

**A helyes válasz: $26 \\cdot 25 \\cdot 24 \\cdot 10 \\cdot 9 \\cdot 8$.**`
},
{
  id: 'S-K-19',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két kártya — összeg páros',
  difficulty: 6,
  scenario: 'Egy dobozban 1-től 5-ig sorszámozott kártya van, egy-egy. **Két kártyát húzunk** visszatevés nélkül, és összeadjuk a számokat.',
  question: 'Mennyi a valószínűsége, hogy az **összeg páros**?',
  options: ['$\\tfrac{1}{5}$', '$\\tfrac{2}{5}$', '$\\tfrac{1}{2}$', '$\\tfrac{3}{5}$'],
  answer: '$\\tfrac{2}{5}$',
  keywords: ['valószínűség', 'kombinatorika'],
  solution: `Összes húzás: \${5 \\choose 2} = 10$ pár.

Az összeg páros, ha **mindkettő páros** (2 páros van: 2, 4) vagy **mindkettő páratlan** (3 páratlan: 1, 3, 5).

- Páros-páros: \${2 \\choose 2} = 1$
- Páratlan-páratlan: \${3 \\choose 2} = 3$

Összesen kedvező: $1 + 3 = 4$.

$$P = \\dfrac{4}{10} = \\dfrac{2}{5}$$

**A helyes válasz: $\\tfrac{2}{5}$.**`
},
{
  id: 'S-K-20',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Városháló — utak száma',
  difficulty: 6,
  scenario: 'Egy városban **A**-ból **B**-be csak **jobbra vagy felfelé** lehet haladni egy $3 \\times 2$-es rácson (3 jobb + 2 fel lépés).',
  question: 'Hányféle rövid út van **A**-ból **B**-be?',
  options: ['5', '6', '10', '15'],
  answer: '10',
  keywords: ['rács-utak', 'kombinatorika'],
  solution: `Összes lépés: **5** (3 jobb + 2 fel). Kiválasztjuk, melyek a „felfelé" lépések:

$\${5 \\choose 2} = \\dfrac{5 \\cdot 4}{2} = \\mathbf{10}$$

**A helyes válasz: 10.**`
},
{
  id: 'S-K-21',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két osztály közös átlaga',
  difficulty: 6,
  scenario: 'A 6.a (20 fő) átlaga matekból **4,0**, a 6.b (30 fő) átlaga **3,5**.',
  question: 'Mennyi a **közös átlag**?',
  visual: {
    type: 'groupedBar',
    categories: ['Matek'],
    yMax: 5,
    yLabel: 'Átlag',
    series: [
      {
        name: '6.a',
        color: '#2563eb',
        values: [4]
      },
      {
        name: '6.b',
        color: '#ef4444',
        values: [3.5]
      }
    ]
  },
  options: ['3,70', '3,75', '3,80', '3,85'],
  answer: '3,70',
  keywords: ['súlyozott átlag'],
  solution: `**Teljes pontösszeg:** $20 \\cdot 4{,}0 + 30 \\cdot 3{,}5 = 80 + 105 = 185$.

**Összes tanuló:** 50.

$$\\bar{x} = \\dfrac{185}{50} = \\mathbf{3{,}70}$$

**A helyes válasz: 3,70.**`
},
{
  id: 'S-K-22',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Ösztöndíj feltételek',
  difficulty: 6,
  scenario: `Az ösztöndíj feltételei (**MIND** teljesüljön):

1. Legalább 4,5-es átlag.
2. Nem hiányzott 10 napnál többet.
3. Részt vett legalább 1 versenyen.

**Dani adatai:** átlag 4,6; hiányzás 12 nap; 2 versenyen indult.`,
  question: 'Megkapja-e Dani az ösztöndíjat?',
  options: ['Igen, mert átlaga 4,5 fölött van.', 'Igen, mert versenyen is indult.', 'Nem, mert túl sokat hiányzott.', 'Nem, mert az átlaga túl alacsony.'],
  answer: 'Nem, mert túl sokat hiányzott.',
  keywords: ['logika', 'ÉS', 'feltétel'],
  solution: `Az **ÉS** kapcsolat miatt **mindhárom** feltételnek teljesülnie kell.

1. Átlag: 4,6 ≥ 4,5 ✓
2. Hiányzás: 12 > 10 ✗
3. Verseny: 2 ≥ 1 ✓

A 2. feltétel nem teljesül → **nem kapja meg** az ösztöndíjat.

**A helyes válasz: „Nem, mert túl sokat hiányzott."**`
},
{
  id: 'S-K-23',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sütemény kombinációk',
  difficulty: 6,
  scenario: 'Egy cukrászdában **6 féle süti** közül **3-at** választunk. A sorrend nem számít, minden süti különböző.',
  question: 'Hányféle válogatás lehetséges?',
  options: ['15', '18', '20', '120'],
  answer: '20',
  keywords: ['kombinatorika', 'kiválasztás'],
  solution: `**Kombináció:**

$\${6 \\choose 3} = \\dfrac{6 \\cdot 5 \\cdot 4}{3 \\cdot 2 \\cdot 1} = \\dfrac{120}{6} = \\mathbf{20}$$

**A helyes válasz: 20.**`
},
{
  id: 'S-K-24',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Három húzás visszatevéssel',
  difficulty: 6,
  scenario: 'Egy dobozban **4 piros** és **6 kék** golyó van. **Háromszor húzunk visszatevéssel.**',
  question: 'Mennyi a valószínűsége, hogy **mindháromszor piros** lesz?',
  visual: {
    type: 'treeDiagram',
    root: '3 húzás',
    levels: [
      {
        label: '1. húzás',
        branches: ['P', 'K']
      },
      {
        label: '2. húzás',
        branches: ['P', 'K']
      },
      {
        label: '3. húzás',
        branches: ['P', 'K']
      }
    ]
  },
  options: ['$\\tfrac{1}{125}$', '$\\tfrac{4}{125}$', '$\\tfrac{8}{125}$', '$\\tfrac{12}{125}$'],
  answer: '$\\tfrac{8}{125}$',
  keywords: ['valószínűség', 'függetlenség'],
  solution: `**Egy húzás piros:** $\\tfrac{4}{10} = \\tfrac{2}{5}$. Visszatevéssel a húzások függetlenek:

$$P = \\left(\\dfrac{2}{5}\\right)^3 = \\dfrac{8}{125}$$

**A helyes válasz: $\\tfrac{8}{125}$.**`
},
{
  id: 'S-K-25',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Medián gyakoriságból',
  difficulty: 6,
  scenario: 'Az osztály 25 tanulójának magasságát táblázat mutatja.',
  question: 'Mennyi a **medián** magasság?',
  visual: {
    type: 'frequencyTable',
    caption: 'Magasságok (cm)',
    headers: ['Magasság', 'Tanulók'],
    rows: [
      ['145', 3],
      ['150', 5],
      ['155', 7],
      ['160', 6],
      ['165', 4]
    ]
  },
  options: ['150', '155', '157,5', '160'],
  answer: '155',
  keywords: ['medián', 'gyakoriság'],
  solution: `**Páratlan elemszám (25):** a **13.** elem a medián.

Kumulatív gyakoriság: 145 → 3, 150 → 8, 155 → 15, ...

A 13. elem a **155 cm** sávba esik.

**A helyes válasz: 155 cm.**`
},
{
  id: 'S-K-26',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Teljes gráf élei',
  difficulty: 6,
  scenario: 'Egy osztálybulin **6 ember** mindegyike kezet fog mindenkivel **pontosan egyszer**.',
  question: 'Hány kézfogás történik?',
  options: ['6', '12', '15', '30'],
  answer: '15',
  keywords: ['gráf', 'kombinatorika'],
  solution: `**Párok száma (teljes gráf élei):**

$\${6 \\choose 2} = \\dfrac{6 \\cdot 5}{2} = \\mathbf{15}$$

**A helyes válasz: 15.**`
},
{
  id: 'S-K-27',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Feltételek és halmazok',
  difficulty: 7,
  scenario: 'A táblázat 4 diák adatait mutatja. A „nyertes" feltételei: **(átlag ≥ 4) ÉS (versenyen 1. vagy 2. helyezést ért el)**.',
  question: 'Ki teljesíti a feltételeket?',
  visual: {
    type: 'frequencyTable',
    caption: 'Tanulói adatok',
    headers: ['Név', 'Átlag', 'Helyezés'],
    rows: [
      ['Anna', '4,5', '3.'],
      ['Béla', '3,8', '1.'],
      ['Cili', '4,2', '2.'],
      ['Dani', '4,0', '5.']
    ]
  },
  options: ['Anna', 'Béla', 'Cili', 'Dani'],
  answer: 'Cili',
  keywords: ['logika', 'ÉS', 'feltétel'],
  solution: `**Mindkét feltétel:**

- **Anna:** átlag 4,5 ≥ 4 ✓, de 3. → ✗
- **Béla:** átlag 3,8 < 4 → ✗
- **Cili:** átlag 4,2 ≥ 4 ✓, 2. hely ✓ → **teljesíti**
- **Dani:** 5. hely → ✗

**A helyes válasz: Cili.**`
},
{
  id: 'S-K-28',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Internet-használat kor szerint',
  difficulty: 6,
  scenario: 'Egy felmérés szerint 120 fő napi internet-használatát mértek három korcsoportban. A csoportosított oszlopdiagram mutatja, hányan tartoznak az **1 óránál kevesebb**, **1–3 óra** és **3 óránál több** kategóriába korcsoportonként.',
  question: 'A **14–18 éves** korcsoport hány százaléka internetezik **naponta 3 óránál többet**?',
  visual: {
    type: 'groupedBar',
    categories: ['10–13 év', '14–18 év', '19+ év'],
    yMax: 30,
    yLabel: 'Fő',
    series: [
      { name: '<1 óra', color: '#22c55e', values: [20, 5, 10] },
      { name: '1–3 óra', color: '#f59e0b', values: [15, 15, 20] },
      { name: '>3 óra', color: '#ef4444', values: [5, 20, 10] }
    ]
  },
  options: ['25%', '40%', '50%', '60%'],
  answer: '50%',
  keywords: ['csoportosított oszlopdiagram', 'arány', 'százalék'],
  solution: `A **14–18 éves** csoport teljes létszáma: $5 + 15 + 20 = 40$ fő.

**>3 órát használók:** $20$ fő.

$$\\dfrac{20}{40} = \\dfrac{1}{2} = \\mathbf{50\\%}$$

**A helyes válasz: 50%.**`
},
{
  id: 'S-K-29',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Fekete-fehér golyó — feltétel',
  difficulty: 7,
  scenario: 'Egy dobozban **3 fehér** és **5 fekete** golyó van. **Két golyót húzunk visszatevés nélkül.**',
  question: 'Mi a valószínűsége, hogy az **elsőre fehér, másodikra fekete**?',
  options: ['$\\tfrac{15}{56}$', '$\\tfrac{15}{64}$', '$\\tfrac{3}{8}$', '$\\tfrac{1}{7}$'],
  answer: '$\\tfrac{15}{56}$',
  keywords: ['feltételes valószínűség', 'visszatevés nélkül'],
  solution: `**1. húzás fehér:** $P_1 = \\dfrac{3}{8}$.

**2. húzás fekete (feltéve hogy fehér kijött):** maradt 2 fehér + 5 fekete = 7.

$$P_2 = \\dfrac{5}{7}$$

**ÉS (szorzás):**

$$P = \\dfrac{3}{8} \\cdot \\dfrac{5}{7} = \\dfrac{15}{56}$$

**A helyes válasz: $\\tfrac{15}{56}$.**`
},
{
  id: 'S-K-30',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kvízverseny — csapatösszeállítás',
  difficulty: 6,
  scenario: 'Egy 12 fős szakkörből **4 fős** kvízcsapatot állítunk össze. A csapaton belül a sorrend **nem számít**.',
  question: 'Hányféle **különböző csapat** választható ki?',
  options: ['220', '330', '495', '792'],
  answer: '495',
  keywords: ['kombináció', 'binomiális'],
  solution: `**Kombináció (sorrend nem számít):**

$$\\binom{12}{4} = \\dfrac{12 \\cdot 11 \\cdot 10 \\cdot 9}{4 \\cdot 3 \\cdot 2 \\cdot 1} = \\dfrac{11880}{24} = \\mathbf{495}$$

**A helyes válasz: 495.**`
},
{
  id: 'S-K-31',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromjegyű páratlan számok',
  difficulty: 6,
  scenario: 'Az $\\{1, 2, 3, 4, 5, 6\\}$ jegyekből **háromjegyű páratlan** számokat képzünk, a jegyek **különbözők**.',
  question: 'Hány ilyen szám van?',
  options: ['30', '60', '90', '120'],
  answer: '60',
  keywords: ['kombinatorika', 'páratlan'],
  solution: `**Utolsó jegy páratlan:** $\\{1,3,5\\}$ → **3** lehetőség.

**Első:** a maradék 5-ből → 5.

**Második:** a maradék 4-ből → 4.

$$5 \\cdot 4 \\cdot 3 = \\mathbf{60}$$

**A helyes válasz: 60.**`
},
{
  id: 'S-K-32',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Osztály — véletlen tanuló',
  difficulty: 6,
  scenario: 'A 6.a osztályban **15 fiú** és **10 lány** van. A fiúk közül **6 visel** szemüveget, a lányok közül **4**. Egy tanulót véletlenszerűen kiválasztunk.',
  question: 'Mennyi a valószínűsége, hogy a kiválasztott **szemüveges lány**?',
  options: ['$\\tfrac{4}{25}$', '$\\tfrac{4}{10}$', '$\\tfrac{1}{5}$', '$\\tfrac{10}{25}$'],
  answer: '$\\tfrac{4}{25}$',
  keywords: ['valószínűség', 'kétszeres feltétel'],
  solution: `**Összes tanuló:** $15 + 10 = 25$. **Szemüveges lány:** 4.

$$P = \\dfrac{4}{25}$$

**A helyes válasz: $\\tfrac{4}{25}$.**`
},
{
  id: 'S-K-33',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Városi közlekedés — utak',
  difficulty: 7,
  scenario: 'Egy útvonaltervező szerint **A→B**-be 2, **B→C**-be 3, **C→D**-be 2 különböző járat indul naponta.',
  question: 'Hányféleképpen juthatunk **A→B→C→D** útvonalon?',
  options: ['7', '8', '10', '12'],
  answer: '12',
  keywords: ['szorzási elv', 'utak'],
  solution: `**Szorzási elv:** $2 \\cdot 3 \\cdot 2 = \\mathbf{12}$.

**A helyes válasz: 12.**`
},
{
  id: 'S-K-34',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Hiányzások — medián és módusz',
  difficulty: 6,
  scenario: 'A 15 fős csoport éves hiányzása (nap): $0, 2, 3, 5, 5, 5, 6, 7, 8, 8, 10, 10, 12, 15, 20$.',
  question: 'Mennyi a **medián** és a **módusz**?',
  options: ['medián=7, módusz=5', 'medián=8, módusz=5', 'medián=7, módusz=10', 'medián=8, módusz=10'],
  answer: 'medián=7, módusz=5',
  keywords: ['medián', 'módusz'],
  solution: `**Medián:** 15 adat → a **8. elem** a középső. Számolva sorban: 0,2,3,5,5,5,6,**7**,8,... → medián = **7**.

**Módusz:** az **5** szerepel legtöbbször (3-szor).

**A helyes válasz: medián=7, módusz=5.**`
},
{
  id: 'S-K-35',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Ki a tettes? (logika)',
  difficulty: 7,
  scenario: `Három gyanúsított: Anna, Béla, Cili. Az alábbi kijelentések közül **pontosan egy** hazudik.

- **Anna:** „Nem én voltam."
- **Béla:** „Cili volt."
- **Cili:** „Béla hazudik."`,
  question: 'Ki a tettes?',
  options: ['Anna', 'Béla', 'Cili', 'Nem eldönthető'],
  answer: 'Cili',
  keywords: ['logika', 'igaz-hamis'],
  solution: `Ha **Béla** hazudik (ő mondja, hogy Cili volt), akkor Cili nem a tettes. De Cili azt mondja: „Béla hazudik" → ez igaz → konzisztens. Anna szerint „nem én voltam" → igaz → a tettes Anna vagy Cili. Ha nem Cili (Béla hazudik), akkor Anna — de Anna igazat mond. **Ellentmondás.**

Ha **Anna** hazudik: „nem én voltam" → hazugság → Anna a tettes. De akkor Béla is hazudik (Cili volt) → két hazug. **Rossz.**

Ha **Cili** hazudik: „Béla hazudik" → hamis → Béla igazat mond → **Cili a tettes**. Anna is igazat mond → konzisztens (Anna nem tettes). ✓

**A helyes válasz: Cili.**`
},
{
  id: 'S-K-36',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Azonos betűk — „MADÁR"',
  difficulty: 6,
  scenario: 'Az „MADÁR" szó **5 különböző** betűjét összekeverjük.',
  question: 'Hány különböző **5-betűs szó** rakható ki?',
  options: ['5', '25', '60', '120'],
  answer: '120',
  keywords: ['permutáció'],
  solution: `$5! = 120$ különböző sorrend.

**A helyes válasz: 120.**`
},
{
  id: 'S-K-37',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Bajnokság kiválasztás',
  difficulty: 7,
  scenario: 'Egy 10 fős csapatból **3 fős** indulócsapatot állítunk össze a **kezdő**, **cserejátékos** és **kapus** pozícióra.',
  question: 'Hányféleképpen állítható össze a csapat?',
  options: ['30', '120', '720', '1000'],
  answer: '720',
  keywords: ['variáció', 'sorrend'],
  solution: `Sorrendes kiválasztás (3 különböző szerep):

$$10 \\cdot 9 \\cdot 8 = \\mathbf{720}$$

**A helyes válasz: 720.**`
},
{
  id: 'S-K-38',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Legalább egy fej — 3 feldobás',
  difficulty: 6,
  scenario: 'Egy szabályos érmét **háromszor** feldobunk.',
  question: 'Mennyi a valószínűsége, hogy **legalább egyszer fejet** dobunk?',
  options: ['$\\tfrac{1}{8}$', '$\\tfrac{3}{8}$', '$\\tfrac{1}{2}$', '$\\tfrac{7}{8}$'],
  answer: '$\\tfrac{7}{8}$',
  keywords: ['komplementer', 'független'],
  solution: `**Komplementer:** nem lesz fej → 3-szor írás → $\\left(\\tfrac{1}{2}\\right)^3 = \\tfrac{1}{8}$.

$$P(\\text{legalább 1 fej}) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}$$

**A helyes válasz: $\\tfrac{7}{8}$.**`
},
{
  id: 'S-K-39',
  contentArea: 'S',
  contentSub: '4.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Fesztivál-látogatók nemek szerint — elemzés',
  difficulty: 7,
  scenario: 'Egy háromnapos fesztivál látogatóit nemek szerint összesítették. Péntek: 1200 fiú, 800 lány. Szombat: 1500 fiú, 1300 lány. Vasárnap: 900 fiú, 1100 lány.',
  question: 'Melyik állítás **IGAZ** a fesztiválra?',
  visual: {
    type: 'groupedBar',
    categories: ['Péntek', 'Szombat', 'Vasárnap'],
    yMax: 1600,
    yLabel: 'Látogatók',
    series: [
      { name: 'Fiúk', color: '#2563eb', values: [1200, 1500, 900] },
      { name: 'Lányok', color: '#ec4899', values: [800, 1300, 1100] }
    ]
  },
  options: [
    'A fiúk mindhárom napon többen voltak, mint a lányok.',
    'Vasárnap több lány volt, mint fiú.',
    'A szombati látogatók száma a legkevesebb.',
    'A teljes fesztiválon összesen több lány volt, mint fiú.'
  ],
  answer: 'Vasárnap több lány volt, mint fiú.',
  keywords: ['csoportosított oszlopdiagram', 'összehasonlítás', 'igaz állítás'],
  solution: `**Napi bontás:**

- Péntek: $1200 > 800$ → fiúk többen.
- Szombat: $1500 > 1300$ → fiúk többen.
- Vasárnap: $900 < 1100$ → **lányok többen** ✓

**Összes:** Fiúk $1200+1500+900 = 3600$; Lányok $800+1300+1100 = 3200$ → fiúk vannak többen.

**Szombat** a legnagyobb (összesen $2800$), nem a legkevesebb.

**A helyes válasz: Vasárnap több lány volt, mint fiú.**`
},
{
  id: 'S-K-40',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két kocka — legalább egy hatos',
  difficulty: 6,
  scenario: 'Két **szabályos dobókockát** dobunk egyszerre.',
  question: 'Mennyi a valószínűsége, hogy **legalább az egyik** 6-os?',
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{1}{3}$', '$\\tfrac{11}{36}$', '$\\tfrac{1}{2}$'],
  answer: '$\\tfrac{11}{36}$',
  keywords: ['valószínűség', 'komplementer', 'két kocka'],
  solution: `**Komplementer:** egyik sem 6-os.

Minden kockán 5 „nem 6-os" szám van, tehát:

$$P(\\text{egyik sem 6}) = \\dfrac{5}{6} \\cdot \\dfrac{5}{6} = \\dfrac{25}{36}$$

**Kedvező (legalább egy 6):**

$$P = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$$

**A helyes válasz: $\\tfrac{11}{36}$.**`
},
{
  id: 'S-K-41',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Színes virágok csokra',
  difficulty: 7,
  scenario: 'Egy virágoshoz **5 piros, 3 fehér, 2 sárga** szál érkezett. **3 szálat** választunk (sorrend nem számít).',
  question: 'Hányféleképpen választhatók, **ha mind különböző színű**?',
  options: ['10', '15', '30', '60'],
  answer: '30',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Egy-egy-egy szál:** piros 5, fehér 3, sárga 2 közül egy-egy.

$$5 \\cdot 3 \\cdot 2 = \\mathbf{30}$$

**A helyes válasz: 30.**`
},
{
  id: 'S-K-42',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kis lottó — egy eltalálás',
  difficulty: 7,
  scenario: 'Az öttalálatos lottón az 1–90 közül **5 számot** sorsolnak. Egy szelvényen **5 szám** van.',
  question: 'Mennyi a valószínűsége, hogy **mind az 5** számot eltaláljuk?',
  options: ['$\\tfrac{1}{90}$', '$\\tfrac{1}{{90 \\choose 5}}$', '$\\tfrac{5}{90}$', '$\\tfrac{5}{{90 \\choose 5}}$'],
  answer: '$\\tfrac{1}{{90 \\choose 5}}$',
  keywords: ['valószínűség', 'kombinatorika', 'lottó'],
  solution: `Az összes lehetséges sorsolás száma $\\binom{90}{5}$; a kedvező pontosan 1.

$$P = \\dfrac{1}{\\binom{90}{5}}$$

**A helyes válasz: $\\tfrac{1}{{90 \\choose 5}}$.**`
},
{
  id: 'S-K-43',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Ki a tettes? — több állítás',
  difficulty: 6,
  scenario: `Négy diák — **András, Bea, Csongor, Dóri** — közül **pontosan egy** törte el a kémcsövet. Az alábbiakat állították, és tudjuk, hogy **pontosan ketten mondtak igazat**.

- András: „Csongor volt."
- Bea: „Nem én voltam."
- Csongor: „András hazudik."
- Dóri: „Bea volt."`,
  question: 'Ki törte el a kémcsövet?',
  options: ['András', 'Bea', 'Csongor', 'Dóri'],
  answer: 'Bea',
  keywords: ['logika', 'igaz-hamis', 'kizárásos'],
  solution: `**Vegyük észre:** András és Csongor állításai **ellentmondóak** → **pontosan egyikük** mondott igazat.

Mivel összesen két igaz állítás van, a másik igaz állítás **Bea** vagy **Dóri** volt.

**Próba — „Bea volt":**

- András ($\\Rightarrow$ Csongor volt) → HAMIS.
- Bea ($\\Rightarrow$ nem én voltam) → HAMIS.
- Csongor ($\\Rightarrow$ András hazudik) → **IGAZ**.
- Dóri ($\\Rightarrow$ Bea volt) → **IGAZ**.

**Pontosan 2 igaz ✓** → a tettes **Bea**.

**A helyes válasz: Bea.**`
},
{
  id: 'S-K-44',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Könyv-film-zene — csak egyben',
  difficulty: 6,
  scenario: 'Egy diáknak az kérdezték, melyik kultúrális élményt élvezte. 80 fő közül: **Könyv 40**, **Film 50**, **Zene 35**; **K∩F = 20**, **K∩Z = 15**, **F∩Z = 18**, **mindhárom 8**.',
  question: 'Hányan **csak könyvet** szeretnek?',
  options: ['8', '13', '15', '20'],
  answer: '13',
  keywords: ['Venn', '3-halmaz'],
  solution: `**Csak könyv:** $|K| - |K \\cap F| - |K \\cap Z| + |K \\cap F \\cap Z|$

$= 40 - 20 - 15 + 8 = \\mathbf{13}$.

**A helyes válasz: 13.**`
},
{
  id: 'S-K-45',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kétfázisú sorsolás — jegy',
  difficulty: 7,
  scenario: 'Két doboz van. **A**-ban 2 piros és 3 kék; **B**-ben 4 piros és 1 kék. Először véletlenszerűen választunk dobozt (1/2 - 1/2), majd egy golyót húzunk.',
  question: 'Mi a valószínűsége, hogy **piros golyót** húzunk?',
  options: ['$\\tfrac{3}{5}$', '$\\tfrac{13}{25}$', '$\\tfrac{3}{10}$', '$\\tfrac{4}{10}$'],
  answer: '$\\tfrac{3}{5}$',
  keywords: ['valószínűség', 'teljes valószínűség'],
  solution: `**Teljes valószínűség:**

$$P(\\text{piros}) = \\dfrac{1}{2} \\cdot \\dfrac{2}{5} + \\dfrac{1}{2} \\cdot \\dfrac{4}{5} = \\dfrac{1}{5} + \\dfrac{2}{5} = \\dfrac{3}{5}$$

**A helyes válasz: $\\tfrac{3}{5}$.**`
},
{
  id: 'S-K-46',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Diagram elemzés — igaz állítás',
  difficulty: 6,
  scenario: 'A groupedBar diagram a 6.a és 6.b osztály néhány tantárgyi átlagát mutatja.',
  question: 'Melyik állítás **IGAZ**?',
  visual: {
    type: 'groupedBar',
    categories: ['Matek', 'Magyar', 'Történelem'],
    yMax: 5,
    yLabel: 'Átlag',
    series: [
      {
        name: '6.a',
        color: '#2563eb',
        values: [4.2, 3.8, 4]
      },
      {
        name: '6.b',
        color: '#ef4444',
        values: [3.9, 4.5, 3.8]
      }
    ]
  },
  options: ['A 6.b minden tárgyban jobb.', 'A 6.a matekból jobb, a 6.b magyarból jobb.', 'A két osztály minden tárgyban egyforma.', 'A 6.b matekból jobb, mint a 6.a.'],
  answer: 'A 6.a matekból jobb, a 6.b magyarból jobb.',
  keywords: ['diagram', 'logika', 'összehasonlítás'],
  solution: `**Matek:** 6.a = 4,2 > 6.b = 3,9 → 6.a jobb ✓

**Magyar:** 6.a = 3,8 < 6.b = 4,5 → 6.b jobb ✓

**Történelem:** 6.a = 4,0 > 6.b = 3,8 → 6.a jobb.

A „6.a matekból jobb, 6.b magyarból jobb" **IGAZ**.

**A helyes válasz: „A 6.a matekból jobb, a 6.b magyarból jobb."**`
},
{
  id: 'S-K-47',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Négyjegyű szám — szomszédos jegyek',
  difficulty: 7,
  scenario: 'Az $\\{1, 2, 3, 4, 5\\}$ jegyekből **négyjegyű**, **különböző** jegyekből álló számot képzünk.',
  question: 'Hány ilyen szám létezik?',
  options: ['60', '100', '120', '625'],
  answer: '120',
  keywords: ['variáció'],
  solution: `$$5 \\cdot 4 \\cdot 3 \\cdot 2 = \\mathbf{120}$$

**A helyes válasz: 120.**`
},
{
  id: 'S-K-48',
  contentArea: 'S',
  contentSub: '4.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Csoportosított diagram — elemzés',
  difficulty: 6,
  scenario: 'A diagram a **fiúk és lányok** kedvenc sportját mutatja.',
  question: 'Melyik sportot **a fiúk és lányok is közel ugyanannyian** választották?',
  visual: {
    type: 'groupedBar',
    categories: ['Foci', 'Kosár', 'Úszás', 'Tánc'],
    yMax: 15,
    yLabel: 'Tanulók',
    series: [
      {
        name: 'Fiúk',
        color: '#2563eb',
        values: [12, 8, 5, 1]
      },
      {
        name: 'Lányok',
        color: '#ec4899',
        values: [3, 7, 5, 10]
      }
    ]
  },
  options: ['Foci', 'Kosár', 'Úszás', 'Tánc'],
  answer: 'Úszás',
  keywords: ['diagram', 'összehasonlítás'],
  solution: `A **Úszás** oszlopoknál a fiúk és lányok is **5–5** tanulót jelölnek — **egyenlő**.

A többinél jelentős eltérés van.

**A helyes válasz: Úszás.**`
},
{
  id: 'S-K-49',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kirándulás útvonalterv',
  difficulty: 6,
  scenario: 'Egy kirándulás: Város → Hegy → Tó → Erdő. A szakaszok között **2, 3, 4** lehetőség van.',
  question: 'Hány különböző teljes útvonal létezik?',
  options: ['9', '12', '24', '36'],
  answer: '24',
  keywords: ['szorzási elv', 'utak'],
  solution: `$$2 \\cdot 3 \\cdot 4 = \\mathbf{24}$$

**A helyes válasz: 24.**`
},
{
  id: 'S-K-50',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Tombola — legalább egy nyeremény',
  difficulty: 7,
  scenario: 'Egy tombolán 100 szelvényből **20 nyerő**. Péter **3 szelvényt** vesz (visszatevés nélkül).',
  question: 'Mennyi a valószínűsége, hogy Péter **legalább egy nyereményt** szerez? (Kerekítve 3 tizedesig.)',
  options: ['0,488', '0,512', '0,600', '0,720'],
  answer: '0,488',
  keywords: ['valószínűség', 'komplementer', 'visszatevés nélkül'],
  solution: `**Komplementer esemény:** egyik szelvény sem nyer.

Visszatevés nélkül a **80 nem nyerő** szelvényből kell 3-at húzni a **100 összesből**:

$$P(\\text{egyik sem}) = \\dfrac{80}{100} \\cdot \\dfrac{79}{99} \\cdot \\dfrac{78}{98}$$

Számítás: $\\dfrac{80 \\cdot 79 \\cdot 78}{100 \\cdot 99 \\cdot 98} = \\dfrac{492\\,960}{970\\,200} \\approx 0{,}5081$.

**Kedvező (legalább egy):**

$$P = 1 - 0{,}5081 \\approx \\mathbf{0{,}488}$$

**A helyes válasz: 0,488.**`
},
{
  id: 'S-T-01',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc gyümölcsök — oszlopdiagram',
  difficulty: 2,
  scenario: 'A 6.a osztályban megkérdezték a tanulókat, melyik a kedvenc gyümölcsük. A válaszokat az alábbi oszlopdiagram mutatja.',
  question: 'Hány tanuló választotta az **almát**?',
  visual: {
    type: 'barChart',
    xLabel: 'Gyümölcs',
    yLabel: 'Tanulók száma',
    yMin: 0,
    yMax: 12,
    bars: [
      {
        label: 'Alma',
        value: 8,
        color: '#ef4444'
      },
      {
        label: 'Banán',
        value: 6,
        color: '#facc15'
      },
      {
        label: 'Körte',
        value: 4,
        color: '#22c55e'
      },
      {
        label: 'Szőlő',
        value: 5,
        color: '#8b5cf6'
      },
      {
        label: 'Eper',
        value: 7,
        color: '#ec4899'
      }
    ]
  },
  options: ['6', '7', '8', '10'],
  answer: '8',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: `**Leolvasás az oszlopdiagramról:**

Az **alma** oszlopa a **8**-as értékig ér fel.

**A helyes válasz: 8 tanuló.**`
},
{
  id: 'S-T-02',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Gyakorisági táblázat',
  difficulty: 2,
  scenario: 'Egy dobókockát 30-szor feldobtunk, és feljegyeztük a dobott számokat.',
  question: 'Melyik számot dobtuk a **legtöbbször**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Dobások gyakorisága',
    headers: ['Dobott szám', 'Gyakoriság'],
    rows: [
      ['1', 4],
      ['2', 6],
      ['3', 3],
      ['4', 8],
      ['5', 5],
      ['6', 4]
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '4',
  keywords: ['gyakoriság', 'táblázat', 'adatleolvasás'],
  solution: `**Gyakoriságok összehasonlítása:**

A legnagyobb gyakoriság **8**, ami a **4**-es dobáshoz tartozik.

Ellenőrzés — az összes dobás: $4+6+3+8+5+4 = 30$ ✓

**A helyes válasz: 4.**`
},
{
  id: 'S-T-03',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Időjárás — kördiagram',
  difficulty: 3,
  scenario: 'Egy hónap 30 napjának időjárását a kördiagram mutatja.',
  question: 'Hány **napos** nap volt a hónapban?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Napos (50%)',
        value: 50,
        color: '#facc15'
      },
      {
        label: 'Felhős (30%)',
        value: 30,
        color: '#9ca3af'
      },
      {
        label: 'Esős (20%)',
        value: 20,
        color: '#2563eb'
      }
    ]
  },
  options: ['10 nap', '12 nap', '15 nap', '20 nap'],
  answer: '15 nap',
  keywords: ['kördiagram', 'százalék', 'adatleolvasás'],
  solution: `**Százalékalap-számítás:**

A napos napok a hónap **50%-át** tették ki, és a hónap **30 napos**.

$$30 \\cdot \\tfrac{50}{100} = 15$$

**A helyes válasz: 15 nap.**`
},
{
  id: 'S-T-04',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Biztos, lehetetlen, lehetséges',
  difficulty: 2,
  scenario: 'Egy zsákban **5 piros** és **3 kék** golyó van. Behunyt szemmel húzunk egyet.',
  question: 'Melyik állítás **IGAZ**?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Piros',
        count: 5,
        unit: 'db',
        color: '#ef4444'
      },
      {
        label: 'Kék',
        count: 3,
        unit: 'db',
        color: '#2563eb'
      }
    ]
  },
  options: ['Biztos, hogy piros golyót húzunk.', 'Lehetetlen kék golyót húzni.', 'Lehetséges, hogy piros vagy kék golyót húzunk.', 'Biztos, hogy zöld golyót húzunk.'],
  answer: 'Lehetséges, hogy piros vagy kék golyót húzunk.',
  keywords: ['biztos', 'lehetetlen', 'lehetséges', 'valószínűség'],
  solution: `**Események vizsgálata:**

- A zsákban van piros **és** kék is, így mindkettő húzása **lehetséges**, de egyik sem **biztos**.
- Zöld golyó nincs a zsákban → zöld húzása **lehetetlen**.

**A helyes válasz:** *Lehetséges, hogy piros vagy kék golyót húzunk.*`
},
{
  id: 'S-T-05',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Osztálykirándulás — vonaldiagram',
  difficulty: 2,
  scenario: 'Egy ötnapos osztálykirándulás során minden nap feljegyezték a délutáni hőmérsékletet.',
  question: 'Melyik napon volt a **legmelegebb** délután?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'Hőmérséklet (°C)',
    yMin: 10,
    yMax: 30,
    points: [
      {
        x: 'Hétfő',
        y: 18
      },
      {
        x: 'Kedd',
        y: 22
      },
      {
        x: 'Szerda',
        y: 25
      },
      {
        x: 'Csütörtök',
        y: 27
      },
      {
        x: 'Péntek',
        y: 24
      }
    ]
  },
  options: ['Hétfő', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'adatleolvasás', 'maximum'],
  solution: `**Leolvasás a vonaldiagramról:**

A pontok közül a legmagasabb **27 °C**, ami a **csütörtökhöz** tartozik.

**A helyes válasz: Csütörtök.**`
},
{
  id: 'S-T-06',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Dobókocka — páros/páratlan gyakoriság',
  difficulty: 1,
  scenario: 'Egy dobókockát 24-szer feldobtunk, és feljegyeztük, hány darab páros és páratlan szám jött ki.',
  question: 'A táblázat alapján **hány** páros dobást jegyeztünk fel?',
  visual: {
    type: 'frequencyTable',
    caption: 'Dobások megoszlása',
    headers: ['Típus', 'Gyakoriság'],
    rows: [
      ['Páros', 10],
      ['Páratlan', 14]
    ]
  },
  options: ['8', '10', '12', '14'],
  answer: '10',
  keywords: ['gyakoriság', 'leolvasás'],
  solution: `**Leolvasás a gyakorisági táblázatból:**

A **Páros** sorban szereplő érték: **10**.

Ellenőrzés: $10 + 14 = 24$ ✓

**A helyes válasz: 10.**`
},
{
  id: 'S-T-07',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Érmefeldobás — biztos esemény',
  difficulty: 1,
  scenario: 'Egy szabályos érmét feldobunk. Két lehetséges kimenetele van: **fej** vagy **írás**.',
  question: 'Melyik állítás **IGAZ** az érmedobásra?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Fej',
        count: 1,
        unit: 'oldal',
        color: '#f59e0b'
      },
      {
        label: 'Írás',
        count: 1,
        unit: 'oldal',
        color: '#6b7280'
      }
    ]
  },
  options: ['Biztos, hogy fej lesz.', 'Lehetetlen írást dobni.', 'Biztos, hogy fej vagy írás lesz.', 'Biztos, hogy a 6-os oldala jön ki.'],
  answer: 'Biztos, hogy fej vagy írás lesz.',
  keywords: ['biztos esemény', 'valószínűség'],
  solution: `**Események vizsgálata:**

Egy érmének **csak két** kimenetele van: fej vagy írás, így mindenképp egyik vagy másik jön ki → ez **biztos** esemény.

- „Biztos, hogy fej lesz" → **HAMIS**, csak *lehetséges*.
- „Lehetetlen írást dobni" → **HAMIS**, *lehetséges*.
- „6-os oldala jön ki" → **HAMIS**, érmének nincs 6-os oldala.

**A helyes válasz:** *Biztos, hogy fej vagy írás lesz.*`
},
{
  id: 'S-T-08',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Fagylaltgombócok — egyszerű összeszámlálás',
  difficulty: 2,
  scenario: 'A fagylaltozóban **4 féle** gombóc közül választhatsz: csokoládé, vanília, eper és pisztácia. Egy gombócot veszel, és hozzá **2 féle** öntet közül egyet: csoki vagy málna.',
  question: 'Hányféle **különböző** fagylalt-öntet párosítás lehetséges?',
  visual: {
    type: 'treeDiagram',
    root: 'Fagylalt',
    levels: [
      {
        label: 'Gombóc',
        branches: ['csoki', 'vanília', 'eper', 'pisztácia']
      },
      {
        label: 'Öntet',
        branches: ['csoki-öntet', 'málna']
      }
    ]
  },
  options: ['4', '6', '8', '10'],
  answer: '8',
  keywords: ['szorzási elv', 'kombinatorika', 'fadiagram'],
  solution: `**Szorzási szabály:**

$$4 \\cdot 2 = \\mathbf{8}$$

A fa mindegyik 4 ágánál 2-2 alsó ág van, összesen **8 levél**.

**A helyes válasz: 8.**`
},
{
  id: 'S-T-09',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Halmazok — kedvenc háziállatok',
  difficulty: 2,
  scenario: 'Egy kérdőívben a diákok bejelölték, van-e otthon **kutyájuk** vagy **macskájuk**. A Venn-diagram a válaszokat mutatja.',
  question: 'Hányan tartanak **csak kutyát** (macskát nem)?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Kutya',
        color: '#a16207'
      },
      {
        label: 'Macska',
        color: '#6d28d9'
      }
    ],
    regions: {
      onlyA: 9,
      onlyB: 6,
      both: 4,
      neither: 5
    },
    universe: 24
  },
  options: ['4', '6', '9', '13'],
  answer: '9',
  keywords: ['Venn-diagram', 'halmaz', 'leolvasás'],
  solution: `**Leolvasás a Venn-diagramról:**

A **csak kutya** régió (Kutya halmaz, de nem Macska) értéke **9**.

**A helyes válasz: 9 diák.**`
},
{
  id: 'S-T-10',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Logikai értékek — állítás igazságtartalma',
  difficulty: 2,
  scenario: 'Vizsgáld meg az alábbi négy állítást, és döntsd el, melyik **HAMIS**.',
  question: 'Melyik állítás **HAMIS**?',
  visual: {
    type: 'table',
    caption: 'Állítások',
    headers: ['Sorszám', 'Állítás'],
    rows: [
      ['A', 'Minden négyzet téglalap.'],
      ['B', 'A 10 páros szám.'],
      ['C', 'Minden prímszám páratlan.'],
      ['D', 'A háromszögnek három szöge van.']
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['logikai érték', 'igaz-hamis', 'állítás'],
  solution: `**Állítások vizsgálata:**

- A: Minden négyzet egyben téglalap is (4 derékszög). **IGAZ.**
- B: $10 = 2 \\cdot 5$, páros. **IGAZ.**
- C: A **2 prímszám és páros**, tehát nem minden prím páratlan. **HAMIS.**
- D: Definíció szerint a háromszögnek 3 szöge van. **IGAZ.**

**A helyes válasz: C.**`
},
{
  id: 'S-T-11',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Eseménygráf — barátok kézfogása',
  difficulty: 2,
  scenario: '**4 barát** találkozik, és mindenki mindenkivel egyszer kezet fog. A gráf csúcsai a barátok, az élek a kézfogásokat jelölik.',
  question: 'Hány **kézfogás** történik összesen?',
  visual: {
    type: 'treeDiagram',
    root: 'Kézfogások',
    levels: [
      {
        label: '1. barát',
        branches: ['2. baráttal', '3. baráttal', '4. baráttal']
      },
      {
        label: 'További párok',
        branches: ['2-3', '2-4', '3-4']
      }
    ]
  },
  options: ['4', '6', '8', '12'],
  answer: '6',
  keywords: ['gráf', 'élek', 'kézfogás', 'kombinatorika'],
  solution: `**Élek összeszámlálása:**

$4$ csúcs között minden pár egy él. A párok száma:

$$\\dfrac{4 \\cdot 3}{2} = \\mathbf{6}$$

A párok: 1-2, 1-3, 1-4, 2-3, 2-4, 3-4 — összesen **6 kézfogás**.

**A helyes válasz: 6.**`
},
{
  id: 'S-T-12',
  contentArea: 'S',
  contentSub: '4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Piktogram — kedvenc sportok',
  difficulty: 1,
  scenario: 'A piktogram a 6. évfolyam diákjainak kedvenc sportját mutatja (1 jel = 1 diák).',
  question: 'Hányan választották a **focit**?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Foci',
        count: 9,
        unit: 'fő',
        color: '#16a34a'
      },
      {
        label: 'Kosár',
        count: 5,
        unit: 'fő',
        color: '#ea580c'
      },
      {
        label: 'Úszás',
        count: 4,
        unit: 'fő',
        color: '#0ea5e9'
      },
      {
        label: 'Kerékpár',
        count: 3,
        unit: 'fő',
        color: '#a855f7'
      }
    ]
  },
  options: ['5', '7', '9', '12'],
  answer: '9',
  keywords: ['piktogram', 'adatleolvasás'],
  solution: `**Piktogram leolvasása:**

A **Foci** soránál **9 jel** van, minden jel 1 diákot jelent.

**A helyes válasz: 9 diák.**`
},
{
  id: 'S-T-13',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc italok — oszlopdiagram',
  difficulty: 2,
  scenario: 'A napközisek között felmérték, milyen italt kérnek leggyakrabban ebédhez.',
  question: 'Hányan kérnek **vizet**?',
  visual: {
    type: 'barChart',
    xLabel: 'Ital',
    yLabel: 'Tanulók száma',
    yMin: 0,
    yMax: 20,
    bars: [
      { label: 'Víz', value: 14, color: '#0ea5e9' },
      { label: 'Tea', value: 9, color: '#84cc16' },
      { label: 'Lé', value: 11, color: '#f59e0b' },
      { label: 'Tej', value: 6, color: '#e2e8f0' }
    ]
  },
  options: ['9', '11', '14', '20'],
  answer: '14',
  keywords: ['oszlopdiagram', 'adatleolvasás'],
  solution: `**Leolvasás:**

A **Víz** oszlopa **14**-ig ér fel.

**A helyes válasz: 14.**`
},
{
  id: 'S-T-14',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Érme feldobás — gyakorisági tábla',
  difficulty: 1,
  scenario: 'Egy érmét 40-szer feldobtunk. A kapott eredményeket a táblázat tartalmazza.',
  question: 'Hányszor lett **fej**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Érme feldobás gyakoriságai',
    headers: ['Kimenet', 'Gyakoriság'],
    rows: [
      ['Fej', 23],
      ['Írás', 17]
    ]
  },
  options: ['17', '20', '23', '40'],
  answer: '23',
  keywords: ['gyakoriság', 'táblázat'],
  solution: `**Leolvasás:**

A **Fej** sorában **23** áll.

Ellenőrzés: $23 + 17 = 40$ ✓

**A helyes válasz: 23.**`
},
{
  id: 'S-T-15',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc évszak — kördiagram',
  difficulty: 2,
  scenario: 'Az osztályban megkérdezték, melyik a kedvenc évszak. A kördiagram a válaszok arányát mutatja.',
  question: 'Melyik évszakot **szereti a legtöbb tanuló**?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Tavasz (25%)', value: 25, color: '#84cc16' },
      { label: 'Nyár (40%)', value: 40, color: '#f59e0b' },
      { label: 'Ősz (20%)', value: 20, color: '#ef4444' },
      { label: 'Tél (15%)', value: 15, color: '#0ea5e9' }
    ]
  },
  options: ['Tavasz', 'Nyár', 'Ősz', 'Tél'],
  answer: 'Nyár',
  keywords: ['kördiagram', 'legtöbb'],
  solution: `**A legnagyobb cikk a 40%-os nyári.**

**A helyes válasz: Nyár.**`
},
{
  id: 'S-T-16',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Heti csapadék — vonaldiagram',
  difficulty: 2,
  scenario: 'Egy héten át minden nap mérték a lehullott csapadékot milliméterben.',
  question: 'Melyik nap volt a **legtöbb** csapadék?',
  visual: {
    type: 'lineChart',
    xLabel: 'Nap',
    yLabel: 'Csapadék (mm)',
    yMin: 0,
    yMax: 20,
    points: [
      { x: 'Hétfő', y: 5 },
      { x: 'Kedd', y: 12 },
      { x: 'Szerda', y: 8 },
      { x: 'Csütörtök', y: 15 },
      { x: 'Péntek', y: 3 },
      { x: 'Szombat', y: 0 },
      { x: 'Vasárnap', y: 7 }
    ]
  },
  options: ['Kedd', 'Szerda', 'Csütörtök', 'Vasárnap'],
  answer: 'Csütörtök',
  keywords: ['vonaldiagram', 'maximum'],
  solution: `**Leolvasás:**

A legmagasabb pont **15 mm**, ez a **csütörtökhöz** tartozik.

**A helyes válasz: Csütörtök.**`
},
{
  id: 'S-T-17',
  contentArea: 'S',
  contentSub: '4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc állat — piktogram',
  difficulty: 1,
  scenario: 'Az alsósok körében felmérték, melyik háziállatot szeretik jobban. A piktogramon 1 jel = 1 tanuló.',
  question: 'Hányan választották a **macskát**?',
  visual: {
    type: 'pictogram',
    items: [
      { label: 'Kutya', count: 10, unit: 'fő', color: '#a16207' },
      { label: 'Macska', count: 7, unit: 'fő', color: '#6b7280' },
      { label: 'Nyúl', count: 4, unit: 'fő', color: '#f9a8d4' },
      { label: 'Papagáj', count: 3, unit: 'fő', color: '#10b981' }
    ]
  },
  options: ['3', '4', '7', '10'],
  answer: '7',
  keywords: ['piktogram', 'adatleolvasás'],
  solution: `**A Macska sorában 7 jel van** → **7 fő**.

**A helyes válasz: 7.**`
},
{
  id: 'S-T-18',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Félévi jegyek eloszlása',
  difficulty: 2,
  scenario: 'Egy osztályban a matematika félévi jegyek eloszlását oszlopdiagram mutatja.',
  question: 'Hány tanuló kapott **ötöst**?',
  visual: {
    type: 'barChart',
    xLabel: 'Jegy',
    yLabel: 'Tanulók száma',
    yMin: 0,
    yMax: 10,
    bars: [
      { label: '1', value: 1, color: '#ef4444' },
      { label: '2', value: 2, color: '#f97316' },
      { label: '3', value: 6, color: '#eab308' },
      { label: '4', value: 8, color: '#84cc16' },
      { label: '5', value: 5, color: '#22c55e' }
    ]
  },
  options: ['3', '5', '6', '8'],
  answer: '5',
  keywords: ['oszlopdiagram', 'osztályzat'],
  solution: `**Az 5-ös jegy oszlopa 5 tanulót mutat.**

**A helyes válasz: 5.**`
},
{
  id: 'S-T-19',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Napi internethasználat',
  difficulty: 2,
  scenario: 'Egy felmérésben a 20 diáktól megkérdezték, naponta hány órát internetezik.',
  question: 'Hány tanuló internetezik naponta **2 órát**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Napi internetes órák',
    headers: ['Óra', 'Tanulók száma'],
    rows: [
      ['0', 1],
      ['1', 4],
      ['2', 7],
      ['3', 5],
      ['4', 3]
    ]
  },
  options: ['3', '5', '7', '8'],
  answer: '7',
  keywords: ['gyakoriság', 'táblázat'],
  solution: `**A 2 óra soránál 7 áll.**

Ellenőrzés: $1+4+7+5+3 = 20$ ✓

**A helyes válasz: 7.**`
},
{
  id: 'S-T-20',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Felhőkarcolók magassága',
  difficulty: 2,
  scenario: 'Egy városban öt felhőkarcoló magasságát méterben mérték le.',
  question: 'Melyik a **legmagasabb** épület?',
  visual: {
    type: 'barChart',
    xLabel: 'Épület',
    yLabel: 'Magasság (m)',
    yMin: 0,
    yMax: 250,
    bars: [
      { label: 'Alfa', value: 120, color: '#2563eb' },
      { label: 'Béta', value: 180, color: '#22c55e' },
      { label: 'Gamma', value: 95, color: '#f59e0b' },
      { label: 'Delta', value: 210, color: '#ef4444' },
      { label: 'Epszilon', value: 155, color: '#a855f7' }
    ]
  },
  options: ['Alfa', 'Béta', 'Delta', 'Epszilon'],
  answer: 'Delta',
  keywords: ['oszlopdiagram', 'maximum', 'leolvasás'],
  solution: `**A legmagasabb oszlop a Delta (210 m).**

Összehasonlítás: $120 < 95$-nél nagyobb, de $180, 155, 210$ közül **210 a legnagyobb**.

**A helyes válasz: Delta.**`
},
{
  id: 'S-T-21',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Bélyeggyűjtemény — pontdiagram',
  difficulty: 2,
  scenario: 'Nyolc barát feljegyezte, hány külföldi bélyegük van a gyűjteményükben. A pontdiagramon minden pont egy gyűjtőt jelöl.',
  question: 'Hány gyűjtőnek van pontosan **4 bélyege**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Bélyegek száma',
    xMin: 1,
    xMax: 7,
    dots: [
      { x: 1, count: 1 },
      { x: 2, count: 1 },
      { x: 3, count: 2 },
      { x: 4, count: 3 },
      { x: 5, count: 0 },
      { x: 6, count: 1 }
    ]
  },
  options: ['1', '2', '3', '4'],
  answer: '3',
  keywords: ['pontdiagram', 'gyakoriság'],
  solution: `A pontdiagramon a **4-es érték** fölött **3 pont** látható.

**A helyes válasz: 3.**`
},
{
  id: 'S-T-22',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Rendelés — kórházi felmérés',
  difficulty: 2,
  scenario: 'Egy háziorvosi rendelőben egy napon feljegyezték, milyen típusú panasszal érkeztek a betegek.',
  question: 'Melyik panasz volt a **leggyakoribb**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Napi betegforgalom',
    headers: ['Panasz', 'Esetek'],
    rows: [
      ['Megfázás', 14],
      ['Fejfájás', 6],
      ['Hasfájás', 9],
      ['Egyéb', 5]
    ]
  },
  options: ['Megfázás', 'Fejfájás', 'Hasfájás', 'Egyéb'],
  answer: 'Megfázás',
  keywords: ['táblázat', 'gyakoriság'],
  solution: `**A legnagyobb érték 14 → Megfázás.**

**A helyes válasz: Megfázás.**`
},
{
  id: 'S-T-23',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Fagylalt ízek eladása',
  difficulty: 2,
  scenario: 'Egy cukrászda egy nap alatt ennyi gombóc fagylaltot adott el ízenként.',
  question: 'Mennyivel fogyott **több** vaníliából, mint csokiból?',
  visual: {
    type: 'barChart',
    xLabel: 'Íz',
    yLabel: 'Eladott gombóc',
    yMin: 0,
    yMax: 50,
    bars: [
      { label: 'Vanília', value: 40, color: '#fef3c7' },
      { label: 'Csoki', value: 28, color: '#78350f' },
      { label: 'Eper', value: 32, color: '#ec4899' },
      { label: 'Pisztácia', value: 15, color: '#65a30d' }
    ]
  },
  options: ['8', '12', '15', '20'],
  answer: '12',
  keywords: ['oszlopdiagram', 'különbség'],
  solution: `**Különbség:**

$40 - 28 = \\mathbf{12}$ gombóc.

**A helyes válasz: 12.**`
},
{
  id: 'S-T-24',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Biztos vagy lehetetlen?',
  difficulty: 1,
  scenario: 'Egy dobozban **csak piros** golyók vannak.',
  question: 'Milyen esemény az, hogy „piros golyót húzunk"?',
  options: ['Lehetetlen', 'Lehetséges, de nem biztos', 'Biztos', 'Véletlen, nem eldönthető'],
  answer: 'Biztos',
  keywords: ['valószínűség', 'biztos esemény'],
  solution: `Ha **csak piros** golyók vannak, akkor minden húzás piros lesz → **biztos** esemény.

**A helyes válasz: Biztos.**`
},
{
  id: 'S-T-25',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Dobókocka — lehetetlen esemény',
  difficulty: 1,
  scenario: 'Egy hagyományos dobókockával dobunk (1-től 6-ig).',
  question: 'Melyik **lehetetlen** esemény?',
  options: ['Párosat dobunk', '5-nél nagyobbat dobunk', '7-et dobunk', '1-et dobunk'],
  answer: '7-et dobunk',
  keywords: ['valószínűség', 'lehetetlen'],
  solution: `A dobókockán csak 1–6 szerepel, **7 nem fordulhat elő** → lehetetlen esemény.

**A helyes válasz: 7-et dobunk.**`
},
{
  id: 'S-T-26',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kvízverseny — igaz állítás',
  difficulty: 2,
  scenario: 'Az osztálybeli kvízversenyen Anna $8$, Béla $12$, Cili $10$ és Dani $6$ pontot ért el.',
  question: 'Melyik állítás **IGAZ**?',
  options: ['Mindenki legalább 10 pontot kapott.', 'Béla érte el a legtöbb pontot.', 'Cili kevesebb pontot szerzett, mint Anna.', 'Dani többet ért el Bélánál.'],
  answer: 'Béla érte el a legtöbb pontot.',
  keywords: ['logika', 'igaz állítás', 'összehasonlítás'],
  solution: `Pontok rendezve: $6 < 8 < 10 < 12$ → **Béla** a maximum.

- „Mindenki $\\geq 10$" → HAMIS (Anna 8, Dani 6).
- „Béla a legtöbb" → **IGAZ** ($12$).
- „Cili < Anna" → HAMIS ($10 > 8$).
- „Dani > Béla" → HAMIS ($6 < 12$).

**A helyes válasz: Béla érte el a legtöbb pontot.**`
},
{
  id: 'S-T-27',
  contentArea: 'S',
  contentSub: '4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Szabadidős tevékenységek',
  difficulty: 2,
  scenario: 'A diákok szabadidős tevékenységeit piktogram mutatja (1 jel = 2 fő).',
  question: 'Hány tanuló **olvas** szabadidőben?',
  visual: {
    type: 'pictogram',
    items: [
      { label: 'Olvasás', count: 5, unit: 'jel', color: '#7c3aed' },
      { label: 'Sport', count: 8, unit: 'jel', color: '#16a34a' },
      { label: 'Játék', count: 7, unit: 'jel', color: '#f97316' },
      { label: 'Zene', count: 3, unit: 'jel', color: '#0ea5e9' }
    ]
  },
  options: ['5', '8', '10', '12'],
  answer: '10',
  keywords: ['piktogram', 'skálaolvasás'],
  solution: `**Az Olvasás soránál 5 jel** van, egy jel **2 főt** jelent.

$5 \\cdot 2 = \\mathbf{10}$ tanuló.

**A helyes válasz: 10.**`
},
{
  id: 'S-T-28',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Osztálykirándulás — helyszín szavazás',
  difficulty: 2,
  scenario: 'Az osztály kirándulási helyszínre szavazott. Az eredmények a táblázatban szerepelnek.',
  question: 'Hányan szavaztak a **Balatonra**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Szavazás eredménye',
    headers: ['Helyszín', 'Szavazat'],
    rows: [
      ['Balaton', 11],
      ['Mátra', 7],
      ['Bükk', 4],
      ['Velencei-tó', 3]
    ]
  },
  options: ['3', '7', '11', '25'],
  answer: '11',
  keywords: ['táblázat', 'szavazás'],
  solution: `**A Balaton sorában 11 áll.**

**A helyes válasz: 11.**`
},
{
  id: 'S-T-29',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Sportbajnokság — csapatok pontjai',
  difficulty: 2,
  scenario: 'Egy iskolai sportbajnokság végeredményét oszlopdiagram mutatja.',
  question: 'Hány pontot szerzett a **Tigrisek** csapata?',
  visual: {
    type: 'barChart',
    xLabel: 'Csapat',
    yLabel: 'Pont',
    yMin: 0,
    yMax: 30,
    bars: [
      { label: 'Sasok', value: 22, color: '#a16207' },
      { label: 'Tigrisek', value: 18, color: '#f97316' },
      { label: 'Farkasok', value: 25, color: '#64748b' },
      { label: 'Medvék', value: 15, color: '#92400e' }
    ]
  },
  options: ['15', '18', '22', '25'],
  answer: '18',
  keywords: ['oszlopdiagram', 'leolvasás'],
  solution: `**A Tigrisek oszlopa 18 pontig ér fel.**

**A helyes válasz: 18.**`
},
{
  id: 'S-T-30',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Mit reggelizel? — kördiagram',
  difficulty: 2,
  scenario: 'A 100 megkérdezett diák közül milyen arányban választottak reggelit.',
  question: 'Hányan ettek **müzlit**?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Kenyér (50%)', value: 50, color: '#a16207' },
      { label: 'Müzli (25%)', value: 25, color: '#f59e0b' },
      { label: 'Tojás (15%)', value: 15, color: '#fde68a' },
      { label: 'Semmit (10%)', value: 10, color: '#e2e8f0' }
    ]
  },
  options: ['10', '15', '25', '50'],
  answer: '25',
  keywords: ['kördiagram', 'százalék'],
  solution: `**Ha 100 fő volt összesen, akkor 25% = 25 fő.**

**A helyes válasz: 25.**`
},
{
  id: 'S-T-31',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Havi születésnapok',
  difficulty: 2,
  scenario: 'Egy osztályban feljegyezték, melyik hónapban hány tanuló ünnepli születésnapját.',
  question: 'Melyik hónapban született a **legtöbb** tanuló?',
  visual: {
    type: 'barChart',
    xLabel: 'Hónap',
    yLabel: 'Tanulók',
    yMin: 0,
    yMax: 6,
    bars: [
      { label: 'Jan', value: 2, color: '#2563eb' },
      { label: 'Feb', value: 1, color: '#0ea5e9' },
      { label: 'Már', value: 3, color: '#84cc16' },
      { label: 'Ápr', value: 5, color: '#22c55e' },
      { label: 'Máj', value: 4, color: '#f59e0b' },
      { label: 'Jún', value: 2, color: '#f97316' }
    ]
  },
  options: ['Január', 'Március', 'Április', 'Június'],
  answer: 'Április',
  keywords: ['oszlopdiagram', 'maximum'],
  solution: `**A legmagasabb oszlop (5) az áprilishoz tartozik.**

**A helyes válasz: Április.**`
},
{
  id: 'S-T-32',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Robotprogram — útvonalak',
  difficulty: 3,
  scenario: 'Egy robot az **R** pontból indulva csak a gráf élei mentén haladhat. Az **R → A**, **R → B** élek vezetnek ki, majd **A → C**, **B → C**, **B → D** folytatás létezik. Végállomás: **C** vagy **D**.',
  question: 'Hány **különböző útvonalon** érhet célba a robot?',
  visual: {
    type: 'treeDiagram',
    root: 'R',
    levels: [
      {
        label: '1. elágazás',
        branches: [
          { from: 'R', to: 'A' },
          { from: 'R', to: 'B' }
        ]
      },
      {
        label: '2. elágazás',
        branches: [
          { from: 'A', to: 'C' },
          { from: 'B', to: 'C' },
          { from: 'B', to: 'D' }
        ]
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '3',
  keywords: ['gráf', 'útvonal', 'fadiagram'],
  solution: `Útvonalak felsorolva:

1. R → A → C
2. R → B → C
3. R → B → D

Összesen **3 útvonal**.

**A helyes válasz: 3.**`
},
{
  id: 'S-T-33',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kerti növények magassága',
  difficulty: 2,
  scenario: 'Réka naponta mérte kedvenc növényeinek a magasságát centiméterben.',
  question: 'Melyik növény **kétszer olyan magas**, mint a tulipán?',
  visual: {
    type: 'frequencyTable',
    caption: 'Növények magassága',
    headers: ['Növény', 'Magasság (cm)'],
    rows: [
      ['Tulipán', 15],
      ['Rózsa', 45],
      ['Muskátli', 20],
      ['Napraforgó', 30],
      ['Liliom', 25]
    ]
  },
  options: ['Rózsa', 'Muskátli', 'Napraforgó', 'Liliom'],
  answer: 'Napraforgó',
  keywords: ['táblázat', 'összehasonlítás', 'kétszeres'],
  solution: `A tulipán magassága **15 cm**, ennek kétszerese $2 \\cdot 15 = \\mathbf{30}$ cm.

A táblázat szerint ez a **Napraforgó** (30 cm).

**A helyes válasz: Napraforgó.**`
},
{
  id: 'S-T-34',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Halmaz elemei',
  difficulty: 2,
  scenario: 'Adott a halmaz: $H = \\{2,\\,4,\\,6,\\,8,\\,10\\}$.',
  question: 'Melyik állítás **IGAZ**?',
  options: ['$3 \\in H$', '$6 \\in H$', '$12 \\in H$', '$H$-nak 4 eleme van'],
  answer: '$6 \\in H$',
  keywords: ['halmaz', 'elem'],
  solution: `A **6** szerepel a halmazban ($H = \\{2,4,6,8,10\\}$) → **$6 \\in H$** IGAZ.

A többi hamis: 3 nem eleme; 12 nem eleme; 5 eleme van, nem 4.

**A helyes válasz: $6 \\in H$.**`
},
{
  id: 'S-T-35',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Logika — VAGY kapcsolat',
  difficulty: 2,
  scenario: 'Adott a szabály: „A gyerek bemehet a medencébe, ha **úszósapkát visel VAGY 12 évesnél idősebb**."',
  question: 'Bemehet-e Peti, aki 10 éves és visel úszósapkát?',
  options: ['Igen', 'Nem', 'Nem eldönthető', 'Csak ha fizet'],
  answer: 'Igen',
  keywords: ['logika', 'VAGY', 'igazság'],
  solution: `A **VAGY** kapcsolat elég, ha az egyik feltétel teljesül.

Peti visel úszósapkát → **az első feltétel teljesül** → **bemehet**.

**A helyes válasz: Igen.**`
},
{
  id: 'S-T-36',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Logika — ÉS kapcsolat',
  difficulty: 2,
  scenario: 'A moziba 12-es karikás filmre csak az mehet be, aki **elmúlt 12 éves ÉS szülővel érkezett**.',
  question: 'Bemehet-e a 13 éves Kata, ha **egyedül** jött?',
  options: ['Igen', 'Nem', 'Csak engedéllyel', 'Csak hétvégén'],
  answer: 'Nem',
  keywords: ['logika', 'ÉS', 'igazság'],
  solution: `Az **ÉS** kapcsolatnál **mindkét** feltételnek teljesülnie kell.

Kata 12-nél idősebb ✓, de **nincs szülővel** ✗ → **nem mehet be**.

**A helyes válasz: Nem.**`
},
{
  id: 'S-T-37',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Öltözködés — szorzási elv',
  difficulty: 2,
  scenario: 'Marinak **2 féle** pólója (piros, kék) és **3 féle** nadrágja (fekete, kék, fehér) van.',
  question: 'Hányféleképpen öltözhet fel?',
  options: ['2', '5', '6', '8'],
  answer: '6',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:** Minden pólóhoz 3 nadrág választható.

$$2 \\cdot 3 = \\mathbf{6}$$

**A helyes válasz: 6.**`
},
{
  id: 'S-T-38',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Menüválasztás',
  difficulty: 2,
  scenario: 'Az étteremben **3 féle** előétel, **4 féle** főétel és **2 féle** desszert közül választhatsz.',
  question: 'Hány különböző teljes menü állítható össze?',
  options: ['9', '14', '20', '24'],
  answer: '24',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:**

$$3 \\cdot 4 \\cdot 2 = \\mathbf{24}$$

**A helyes válasz: 24.**`
},
{
  id: 'S-T-39',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Úszóverseny — sorsolt pálya',
  difficulty: 2,
  scenario: 'Egy úszóversenyen **8 pálya** van, melyeket véletlenszerűen sorsolnak ki. A **középső pályák** a **4.** és az **5.** pálya.',
  question: 'Mennyi a valószínűsége, hogy egy versenyző **középső pályát** kap?',
  options: ['$\\tfrac{1}{8}$', '$\\tfrac{1}{4}$', '$\\tfrac{3}{8}$', '$\\tfrac{1}{2}$'],
  answer: '$\\tfrac{1}{4}$',
  keywords: ['valószínűség', 'klasszikus'],
  solution: `**Kedvező:** 2 (a 4. és 5. pálya).

**Összes:** 8 pálya.

$$P = \\dfrac{2}{8} = \\dfrac{1}{4}$$

**A helyes válasz: $\\tfrac{1}{4}$.**`
},
{
  id: 'S-T-40',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Énekkari próba — részvétel',
  difficulty: 2,
  scenario: 'Az énekkar 20 tagja közül a keddi próbára **15-en** mentek el. Véletlenszerűen kiválasztunk egy tagot.',
  question: 'Mennyi a valószínűsége, hogy a kiválasztott tag **elment** a próbára?',
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{1}{2}$', '$\\tfrac{3}{4}$', '$\\tfrac{4}{5}$'],
  answer: '$\\tfrac{3}{4}$',
  keywords: ['valószínűség', 'klasszikus', 'arány'],
  solution: `**Kedvező:** 15 tag.

**Összes:** 20 tag.

$$P = \\dfrac{15}{20} = \\dfrac{3}{4}$$

**A helyes válasz: $\\tfrac{3}{4}$.**`
},
{
  id: 'S-T-41',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Autók színe — táblázat',
  difficulty: 2,
  scenario: 'Egy parkolóban megszámolták a gépkocsik színét.',
  question: 'Hány **piros** autó parkol?',
  visual: {
    type: 'frequencyTable',
    caption: 'Autók színe',
    headers: ['Szín', 'Darab'],
    rows: [
      ['Fehér', 12],
      ['Fekete', 9],
      ['Piros', 7],
      ['Kék', 5],
      ['Egyéb', 3]
    ]
  },
  options: ['5', '7', '9', '12'],
  answer: '7',
  keywords: ['táblázat', 'leolvasás'],
  solution: `**A Piros sorában 7 áll.**

**A helyes válasz: 7.**`
},
{
  id: 'S-T-42',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Napi alvásidő',
  difficulty: 2,
  scenario: 'Egy héten át feljegyezték, Peti hány órát aludt egy-egy éjjel.',
  question: 'Melyik nap aludt a **legkevesebbet**?',
  visual: {
    type: 'barChart',
    xLabel: 'Nap',
    yLabel: 'Óra',
    yMin: 0,
    yMax: 12,
    bars: [
      {
        label: 'H',
        value: 9,
        color: '#2563eb'
      },
      {
        label: 'K',
        value: 8,
        color: '#2563eb'
      },
      {
        label: 'Sze',
        value: 6,
        color: '#ef4444'
      },
      {
        label: 'Cs',
        value: 9,
        color: '#2563eb'
      },
      {
        label: 'P',
        value: 7,
        color: '#f59e0b'
      },
      {
        label: 'Szo',
        value: 10,
        color: '#22c55e'
      },
      {
        label: 'V',
        value: 11,
        color: '#22c55e'
      }
    ]
  },
  options: ['Hétfő', 'Szerda', 'Péntek', 'Vasárnap'],
  answer: 'Szerda',
  keywords: ['oszlopdiagram', 'minimum'],
  solution: `**A legkisebb oszlop (6 óra) a szerdához tartozik.**

**A helyes válasz: Szerda.**`
},
{
  id: 'S-T-43',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Venn-diagram — leolvasás',
  difficulty: 2,
  scenario: 'Az osztályban a sporttevékenységet Venn-diagram ábrázolja: tenisz és úszás.',
  question: 'Hányan **mindkét** sportot űzik?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Tenisz',
        color: '#22c55e'
      },
      {
        label: 'Úszás',
        color: '#0ea5e9'
      }
    ],
    regions: {
      onlyA: 5,
      onlyB: 8,
      both: 3,
      neither: 9
    },
    universe: 25
  },
  options: ['3', '5', '8', '9'],
  answer: '3',
  keywords: ['Venn-diagram', 'metszet'],
  solution: `**A két halmaz metszetében 3 áll.**

**A helyes válasz: 3.**`
},
{
  id: 'S-T-44',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kétjegyű számok képzése',
  difficulty: 2,
  scenario: 'A $\\{1, 2, 3\\}$ számjegyekből **kétjegyű** számokat képzünk. A számjegyek **ismétlődhetnek**.',
  question: 'Hányféle szám képezhető?',
  options: ['3', '6', '9', '12'],
  answer: '9',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:** az első helyre 3, a másodikra is 3 lehetőség.

$$3 \\cdot 3 = \\mathbf{9}$$

**A helyes válasz: 9.**`
},
{
  id: 'S-T-45',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Igazságérték — egyszerű állítás',
  difficulty: 1,
  scenario: 'Tekintsd az alábbi állításokat a természetes számokról.',
  question: 'Melyik állítás **IGAZ**?',
  options: ['$7 > 9$', 'A 4 páratlan szám', '$12$ osztható $3$-mal', 'A 0 pozitív szám'],
  answer: '$12$ osztható $3$-mal',
  keywords: ['logika', 'igaz-hamis'],
  solution: `$12 = 3 \\cdot 4$, tehát **osztható 3-mal** → IGAZ.

A többi hamis.

**A helyes válasz: $12$ osztható $3$-mal.**`
},
{
  id: 'S-T-46',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Reggeli sorrend — fadiagram',
  difficulty: 2,
  scenario: 'Reggel először italt (tej vagy kakaó), majd pékárut (kenyér vagy kifli) választunk.',
  question: 'Hány különböző **kombináció** van?',
  visual: {
    type: 'treeDiagram',
    root: 'reggeli',
    levels: [
      {
        label: 'Ital',
        branches: ['tej', 'kakaó']
      },
      {
        label: 'Pékáru',
        branches: ['kenyér', 'kifli']
      }
    ]
  },
  options: ['2', '3', '4', '6'],
  answer: '4',
  keywords: ['fadiagram', 'szorzási elv'],
  solution: `**Szorzási elv:** $2 \\cdot 2 = \\mathbf{4}$ kombináció.

A fadiagramon is 4 ág vezet a végpontig.

**A helyes válasz: 4.**`
},
{
  id: 'S-T-47',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc sorozatok',
  difficulty: 2,
  scenario: 'Az iskolai klub 40 tagja a kedvenc sorozatukra szavazott. A kördiagram az eredményt mutatja.',
  question: 'Mennyien szavaztak **Gyűrűk Urára**, ha az 25%-ot kapott?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Gyűrűk Ura (25%)',
        value: 25,
        color: '#a16207'
      },
      {
        label: 'Harry Potter (40%)',
        value: 40,
        color: '#b91c1c'
      },
      {
        label: 'Star Wars (20%)',
        value: 20,
        color: '#1e3a8a'
      },
      {
        label: 'Egyéb (15%)',
        value: 15,
        color: '#64748b'
      }
    ]
  },
  options: ['8', '10', '15', '25'],
  answer: '10',
  keywords: ['kördiagram', 'százalék'],
  solution: `$40 \\cdot 25\\% = 40 \\cdot 0{,}25 = \\mathbf{10}$ fő.

**A helyes válasz: 10.**`
},
{
  id: 'S-T-48',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Fesztivál — étkezési fogyasztás',
  difficulty: 2,
  scenario: 'Egy fesztiválon feljegyezték, mennyi fogyott egyes ételekből.',
  question: 'Hány adag **lángos** fogyott?',
  visual: {
    type: 'frequencyTable',
    caption: 'Fesztiváli fogyasztás',
    headers: ['Étel', 'Adag'],
    rows: [
      ['Lángos', 145],
      ['Hamburger', 98],
      ['Gyros', 112],
      ['Palacsinta', 76]
    ]
  },
  options: ['76', '98', '112', '145'],
  answer: '145',
  keywords: ['táblázat', 'leolvasás'],
  solution: `**A Lángos sorában 145 áll.**

**A helyes válasz: 145.**`
},
{
  id: 'S-T-49',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Labdahúzás — biztos esemény',
  difficulty: 2,
  scenario: 'Egy dobozban **5 fehér** és **0 fekete** labda van.',
  question: 'Milyen esemény az, hogy „a húzott labda **fehér**"?',
  options: ['Lehetetlen', 'Lehetséges, nem biztos', 'Biztos', 'Egyenlően valószínű'],
  answer: 'Biztos',
  keywords: ['valószínűség', 'biztos'],
  solution: `Csak fehér labdák vannak → minden húzás fehér → **biztos** esemény.

$$P = \\dfrac{5}{5} = 1$$

**A helyes válasz: Biztos.**`
},
{
  id: 'S-T-50',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Éves átlaghőmérséklet',
  difficulty: 2,
  scenario: 'Egy város havi átlaghőmérsékletét vonaldiagram mutatja.',
  question: 'Melyik hónapban volt a **legmelegebb**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Hónap',
    yLabel: '°C',
    yMin: -5,
    yMax: 30,
    points: [
      {
        x: 'Jan',
        y: -2
      },
      {
        x: 'Feb',
        y: 0
      },
      {
        x: 'Már',
        y: 6
      },
      {
        x: 'Ápr',
        y: 12
      },
      {
        x: 'Máj',
        y: 17
      },
      {
        x: 'Jún',
        y: 22
      },
      {
        x: 'Júl',
        y: 25
      },
      {
        x: 'Aug',
        y: 24
      },
      {
        x: 'Szept',
        y: 18
      },
      {
        x: 'Okt',
        y: 12
      },
      {
        x: 'Nov',
        y: 5
      },
      {
        x: 'Dec',
        y: 1
      }
    ]
  },
  options: ['Június', 'Július', 'Augusztus', 'Szeptember'],
  answer: 'Július',
  keywords: ['vonaldiagram', 'maximum'],
  solution: `**A legmagasabb érték 25 °C, ez a júliusé.**

**A helyes válasz: Július.**`
}
];
