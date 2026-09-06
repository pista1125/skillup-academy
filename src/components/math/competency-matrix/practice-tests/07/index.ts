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

export const practiceTest07: PracticeTest = {
  id: 'PM-07',
  title: '7. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest07;
