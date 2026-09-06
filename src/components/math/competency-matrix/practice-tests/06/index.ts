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

export const practiceTest06: PracticeTest = {
  id: 'PM-06',
  title: '6. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest06;
