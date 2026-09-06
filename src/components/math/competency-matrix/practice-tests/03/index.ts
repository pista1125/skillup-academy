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

export const practiceTest03: PracticeTest = {
  id: 'PM-03',
  title: '3. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest03;
