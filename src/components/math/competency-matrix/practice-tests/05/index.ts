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

export const practiceTest05: PracticeTest = {
  id: 'PM-05',
  title: '5. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest05;
