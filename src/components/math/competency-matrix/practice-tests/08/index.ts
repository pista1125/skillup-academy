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

export const practiceTest08: PracticeTest = {
  id: 'PM-08',
  title: '8. Országos Kompetenciamérés Próbateszt',
  tasks: [
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
}
  ]
};

export default practiceTest08;
