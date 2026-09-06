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

export const practiceTest09: PracticeTest = {
  id: 'PM-09',
  title: '9. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest09;
