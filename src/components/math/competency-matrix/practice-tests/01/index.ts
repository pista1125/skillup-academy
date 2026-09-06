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

export const practiceTest01: PracticeTest = {
  id: 'PM-01',
  title: '1. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest01;
