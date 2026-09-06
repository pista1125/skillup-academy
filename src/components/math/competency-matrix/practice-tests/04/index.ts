export interface Task {
  id: string;
  contentArea: string;
  thinkingLevel: string;
  title: string;
  difficulty: number;
  scenario?: string;
  question: string;
  visual?: any;
  options?: string[];
  answer: string;
  keywords?: string[];
  solution: string;
}

export interface PracticeTest {
  id: string;
  title: string;
  tasks: Task[];
}

export const practiceTest04: PracticeTest = {
  id: 'PM-04',
  title: '4. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest04;
