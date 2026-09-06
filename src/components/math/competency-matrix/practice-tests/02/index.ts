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

export const practiceTest02: PracticeTest = {
  id: 'PM-02',
  title: '2. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest02;
