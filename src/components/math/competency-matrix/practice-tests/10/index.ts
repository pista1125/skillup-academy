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

export const practiceTest10: PracticeTest = {
  id: 'PM-10',
  title: '10. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest10;
