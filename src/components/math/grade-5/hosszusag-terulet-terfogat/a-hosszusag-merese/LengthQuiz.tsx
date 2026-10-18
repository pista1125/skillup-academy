import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { LengthMatcher } from './LengthMatcher';
import { LengthSorter } from './LengthSorter';

export interface LengthQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const LENGTH_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK ÉS KÖZVETLEN SZOMSZÉDOS ÁTVÁLTÁSOK (1-10)
  // =========================================================================
  {
    id: 'lq1-1',
    level: 1,
    prompt: 'Mi a hosszúság alapvető mértékegysége a nemzetközi metrikus (SI) rendszerben?',
    options: [
      'A méter (m)',
      'A centiméter (cm)',
      'A kilométer (km)',
      'A milliméter (mm)'
    ],
    correctAnswer: 0,
    explanation: 'A nemzetközi mértékrendszerben (SI) a hosszúság alapegysége a méter (jele: m). A többi mértékegység (mm, cm, dm, km) ennek tizedes törtrésze vagy többszöröse.',
    hint: 'Gondolj a „méterrendszer” elnevezésre és a párizsi etalon rúdra!',
    breakdown: [
      { label: 'Hosszúság alapegysége', value: 'Méter (m)' },
      { label: 'Kisebb törtrészek', value: 'dm (tized), cm (század), mm (ezred)' },
      { label: 'Nagyobb többszörös', value: 'km (ezerszeres)' }
    ]
  },
  {
    id: 'lq1-2',
    level: 1,
    prompt: 'Hány milliméter (mm) van 1 centiméterben (cm)?',
    options: [
      '10 mm',
      '100 mm',
      '1000 mm',
      '5 mm'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-48 h-16 mx-auto" viewBox="0 0 160 50" fill="none">
        <rect x="10" y="10" width="140" height="30" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <line x1="20" y1="10" x2="20" y2="30" stroke="#0f172a" strokeWidth="2" />
        <text x="20" y="38" textAnchor="middle" className="text-[9px] font-black fill-slate-800">0</text>
        <line x1="120" y1="10" x2="120" y2="30" stroke="#0f172a" strokeWidth="2" />
        <text x="120" y="38" textAnchor="middle" className="text-[9px] font-black fill-slate-800">1 cm</text>
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={20 + (i + 1) * 10}
            y1={10}
            x2={20 + (i + 1) * 10}
            y2={i === 4 ? 26 : 20}
            stroke={i === 4 ? '#0f172a' : '#94a3b8'}
            strokeWidth={i === 4 ? '1.2' : '0.8'}
          />
        ))}
        <text x="70" y="46" textAnchor="middle" className="text-[8px] font-bold fill-teal-600">10 kis vonalköz = 10 mm</text>
      </svg>
    ),
    explanation: '1 centiméter pontosan 10 darab milliméterből áll. A vonalzón két egész centiméter között 10 kis vonalköz található.',
    hint: 'Számold meg a vonalzón a legkisebb vonalközöket 0 és 1 cm között!',
    breakdown: [
      { label: 'Kezdő érték', value: '1 cm' },
      { label: 'Váltószám cm → mm', value: '· 10' },
      { label: 'Eredmény', value: '1 · 10 = 10 mm' }
    ]
  },
  {
    id: 'lq1-3',
    level: 1,
    prompt: 'Hány centiméter (cm) van 1 deciméterben (dm)?',
    options: [
      '10 cm',
      '100 cm',
      '1000 cm',
      '20 cm'
    ],
    correctAnswer: 0,
    explanation: 'A deciméter a méter tizedrésze (1 dm = 10 cm). A „deci-” előtag a tizedrészt jelöli.',
    hint: 'Gondolj a deciliterre (dl): 1 l = 10 dl; ugyanígy 1 dm = 10 cm!',
    breakdown: [
      { label: 'Deciméter fogalma', value: 'A méter tizedrésze (10⁻¹ m)' },
      { label: 'Centiméter fogalma', value: 'A méter századrésze (10⁻² m)' },
      { label: 'Összefüggés', value: '1 dm = 10 cm' }
    ]
  },
  {
    id: 'lq1-4',
    level: 1,
    prompt: 'Hány deciméter (dm) van 1 méterben (m)?',
    options: [
      '10 dm',
      '100 dm',
      '1000 dm',
      '5 dm'
    ],
    correctAnswer: 0,
    explanation: '1 méterben pontosan 10 deciméter van, mivel a deciméter a méter tizedrésze ($10 : 10 = 1$).',
    hint: '1 m = 10 dm = 100 cm = 1000 mm.',
    breakdown: [
      { label: 'Méter és deciméter', value: '1 m = 10 dm' },
      { label: 'Váltószám m → dm', value: '· 10' }
    ]
  },
  {
    id: 'lq1-5',
    level: 1,
    prompt: 'Hány méter (m) felel meg 1 kilométernek (km)?',
    options: [
      '1000 m',
      '100 m',
      '10 m',
      '10 000 m'
    ],
    correctAnswer: 0,
    explanation: 'A „kilo-” előtag a görög khilioi (ezer) szóból származik, és mindig ezret jelent. Tehát 1 km = 1000 m.',
    hint: 'Ahogyan 1 kilogramm = 1000 gramm, úgy 1 kilométer = 1000 méter!',
    breakdown: [
      { label: 'Kilo- előtag', value: '1000-szeres szorzó' },
      { label: 'Összefüggés', value: '1 km = 1000 m' }
    ]
  },
  {
    id: 'lq1-6',
    level: 1,
    prompt: 'Melyik műveletet kell elvégezni, ha centiméterből (cm) milliméterbe (mm) váltunk át?',
    options: [
      'Szorzunk 10-zel',
      'Osztunk 10-zel',
      'Szorzunk 100-zal',
      'Osztunk 100-zal'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a centiméter nagyobb egység, mint a milliméter, a darabszám meg fog nőni (több kis egység kell). Ezért SZORZUNK a váltószámmal: · 10.',
    hint: 'Nagyobból kisebbe váltunk → a számérték növekszik → szorzás!',
    breakdown: [
      { label: 'Kezdő egység', value: 'cm (nagyobb)' },
      { label: 'Cél egység', value: 'mm (kisebb)' },
      { label: 'Szabály', value: 'Nagyobból kisebbe → SZORZÁS a váltószámmal (· 10)' }
    ]
  },
  {
    id: 'lq1-7',
    level: 1,
    prompt: 'Hány centiméter 70 milliméter (70 mm)?',
    options: [
      '7 cm',
      '700 cm',
      '0,7 cm',
      '70 cm'
    ],
    correctAnswer: 0,
    explanation: 'Milliméterből centiméterbe osztunk 10-zel: $70 : 10 = 7\\text{ cm}$.',
    hint: 'Kisebből nagyobbra váltunk, tehát elosztjuk 10-zel.',
    breakdown: [
      { label: 'Kiindulás', value: '70 mm' },
      { label: 'Művelet', value: '70 : 10' },
      { label: 'Eredmény', value: '7 cm' }
    ]
  },
  {
    id: 'lq1-8',
    level: 1,
    prompt: 'Hány milliméter 4 centiméter (4 cm)?',
    options: [
      '40 mm',
      '4 mm',
      '400 mm',
      '0,4 mm'
    ],
    correctAnswer: 0,
    explanation: '$1\\text{ cm} = 10\\text{ mm}$, ezért $4\\text{ cm} = 4 \\cdot 10 = 40\\text{ mm}$.',
    hint: 'Minden egyes centiméter 10 darab milliméter.',
    breakdown: [
      { label: 'Kiindulás', value: '4 cm' },
      { label: 'Szorzás', value: '4 · 10' },
      { label: 'Eredmény', value: '40 mm' }
    ]
  },
  {
    id: 'lq1-9',
    level: 1,
    prompt: 'Hány méter 30 deciméter (30 dm)?',
    options: [
      '3 m',
      '300 m',
      '0,3 m',
      '30 m'
    ],
    correctAnswer: 0,
    explanation: 'Deciméterből méterbe osztunk 10-zel: $30 : 10 = 3\\text{ m}$.',
    hint: 'Mivel 1 m = 10 dm, 30 dm-ben 3-szor van meg a 10 dm.',
    breakdown: [
      { label: 'Kiindulás', value: '30 dm' },
      { label: 'Osztás', value: '30 : 10' },
      { label: 'Eredmény', value: '3 m' }
    ]
  },
  {
    id: 'lq1-10',
    level: 1,
    prompt: 'Melyik mértékegységet használjuk leggyakrabban két város (pl. Budapest és Szeged) távolságának megadására?',
    options: [
      'Kilométer (km)',
      'Méter (m)',
      'Centiméter (cm)',
      'Deciméter (dm)'
    ],
    correctAnswer: 0,
    explanation: 'Nagy földrajzi távolságok, utak és települések közötti távolságok mérésére a kilométert (km) használjuk, hogy elkerüljük a soknullás óriási számokat (pl. 160 km sokkal áttekinthetőbb, mint 160 000 m).',
    hint: 'Az autópályák szélén is ezt a jelölést látod a táblákon.',
    breakdown: [
      { label: 'Kis tárgyak (ceruza)', value: 'mm, cm' },
      { label: 'Emberi lépték (szoba, ajtó)', value: 'm' },
      { label: 'Földrajzi távolságok', value: 'km' }
    ]
  },

  // =========================================================================
  // 2. SZINT: UGRÓ ÁTVÁLTÁSOK, TIZEDESTÖRTEK ÉS ÖSSZEHASONLÍTÁSOK (11-20)
  // =========================================================================
  {
    id: 'lq2-1',
    level: 2,
    prompt: 'Hány centiméter (cm) van 1 méterben (m)?',
    options: [
      '100 cm',
      '10 cm',
      '1000 cm',
      '50 cm'
    ],
    correctAnswer: 0,
    explanation: '$1\\text{ m} = 10\\text{ dm} = 10 \\cdot 10\\text{ cm} = 100\\text{ cm}$. A „centi-” előtag a századrészt jelenti.',
    hint: 'Két lépcsőfok lefelé a lépcsőn: 10 · 10 = 100.',
    breakdown: [
      { label: '1 m deciméterben', value: '10 dm' },
      { label: '1 dm centiméterben', value: '10 cm' },
      { label: 'Összesen', value: '10 · 10 = 100 cm' }
    ]
  },
  {
    id: 'lq2-2',
    level: 2,
    prompt: 'Hány milliméter (mm) van 1 méterben (m)?',
    options: [
      '1000 mm',
      '100 mm',
      '10 000 mm',
      '500 mm'
    ],
    correctAnswer: 0,
    explanation: '$1\\text{ m} = 10\\text{ dm} = 100\\text{ cm} = 1000\\text{ mm}$. A „milli-” előtag az ezredrészt jelenti.',
    hint: 'Három lépcsőfok lefelé: 10 · 10 · 10 = 1000.',
    breakdown: [
      { label: 'Méter → deciméter', value: '· 10' },
      { label: 'Deciméter → centiméter', value: '· 10' },
      { label: 'Centiméter → milliméter', value: '· 10' },
      { label: 'Méter → milliméter', value: '10 · 10 · 10 = 1000 mm' }
    ]
  },
  {
    id: 'lq2-3',
    level: 2,
    prompt: 'Hány centiméter felel meg 3,5 méternek (3,5 m)?',
    options: [
      '350 cm',
      '35 cm',
      '3500 cm',
      '3,50 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel $1\\text{ m} = 100\\text{ cm}$, a 3,5 métert megszorozzuk 100-zal: $3{,}5 \\cdot 100 = 350\\text{ cm}$.',
    hint: 'A tizedesvesszőt két hellyel toljuk jobbra a 100-zal való szorzás miatt.',
    breakdown: [
      { label: 'Kiindulás', value: '3,5 m' },
      { label: 'Szorzás 100-zal', value: '3,5 · 100' },
      { label: 'Eredmény', value: '350 cm' }
    ]
  },
  {
    id: 'lq2-4',
    level: 2,
    prompt: 'Hány méter 2500 milliméter (2500 mm)?',
    options: [
      '2,5 m',
      '25 m',
      '0,25 m',
      '250 m'
    ],
    correctAnswer: 0,
    explanation: 'Milliméterből méterbe osztunk 1000-rel: $2500 : 1000 = 2{,}5\\text{ m}$.',
    hint: '3 hellyel toljuk balra a tizedesvesszőt az 1000-rel való osztásnál.',
    breakdown: [
      { label: 'Kiindulás', value: '2500 mm' },
      { label: 'Osztás 1000-rel', value: '2500 : 1000' },
      { label: 'Eredmény', value: '2,5 m (2 m 50 cm)' }
    ]
  },
  {
    id: 'lq2-5',
    level: 2,
    prompt: 'Melyik a leghosszabb távolság az alábbiak közül?',
    options: [
      '450 cm',
      '4 m',
      '42 dm',
      '4100 mm'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk át mindet centiméterbe az összehasonlításhoz:\n• 4 m = 400 cm\n• 42 dm = 420 cm\n• 4100 mm = 410 cm\n• 450 cm = 450 cm. A 450 cm a legnagyobb!',
    hint: 'Hozd az összes értéket azonos mértékegységre (pl. cm-re vagy dm-re)!',
    breakdown: [
      { label: '4 m', value: '400 cm' },
      { label: '42 dm', value: '420 cm' },
      { label: '4100 mm', value: '410 cm' },
      { label: '450 cm', value: '450 cm (LEGHOSSZABB ✓)' }
    ]
  },
  {
    id: 'lq2-6',
    level: 2,
    prompt: 'Hány méter a 4 km 60 m távolság összesen?',
    options: [
      '4060 m',
      '4600 m',
      '4006 m',
      '460 m'
    ],
    correctAnswer: 0,
    explanation: '$4\\text{ km} = 4000\\text{ m}$. Ehhez hozzáadva a $60\\text{ m}$-t: $4000 + 60 = 4060\\text{ m}$. Nem 4600 m, mert az 4 km 600 m lenne!',
    hint: 'Vigyázz a helyiértékekre: a 60 az kétjegyű, az ezer pedig három nullás!',
    breakdown: [
      { label: '4 km méterben', value: '4000 m' },
      { label: 'Plusz 60 m', value: '+ 60 m' },
      { label: 'Összeg', value: '4060 m' }
    ]
  },
  {
    id: 'lq2-7',
    level: 2,
    prompt: 'Hány centiméter hiányzik a kerek 1 méterhez, ha már van 65 centiméterünk?',
    options: [
      '35 cm',
      '45 cm',
      '25 cm',
      '135 cm'
    ],
    correctAnswer: 0,
    explanation: '$1\\text{ m} = 100\\text{ cm}$. A hiányzó rész: $100 - 65 = 35\\text{ cm}$.',
    hint: '1 m = 100 cm. Mennyit kell adni 65-höz, hogy 100 legyen?',
    breakdown: [
      { label: 'Célérték', value: '1 m = 100 cm' },
      { label: 'Meglévő rész', value: '65 cm' },
      { label: 'Különbség', value: '100 - 65 = 35 cm' }
    ]
  },
  {
    id: 'lq2-8',
    level: 2,
    prompt: 'Hány deciméter 450 centiméter (450 cm)?',
    options: [
      '45 dm',
      '4,5 dm',
      '4500 dm',
      '0,45 dm'
    ],
    correctAnswer: 0,
    explanation: '$1\\text{ dm} = 10\\text{ cm}$. Centiméterből deciméterbe osztunk 10-zel: $450 : 10 = 45\\text{ dm}$.',
    hint: 'cm → dm: osztás 10-zel.',
    breakdown: [
      { label: 'Kiindulás', value: '450 cm' },
      { label: 'Osztás', value: '450 : 10' },
      { label: 'Eredmény', value: '45 dm (4,5 m)' }
    ]
  },
  {
    id: 'lq2-9',
    level: 2,
    prompt: 'Egy ceruza hossza a vonalzón a 3 cm-es jeltől a 11,5 cm-es jelig tart. Milyen hosszú a ceruza?',
    options: [
      '8,5 cm (85 mm)',
      '11,5 cm (115 mm)',
      '14,5 cm (145 mm)',
      '7,5 cm (75 mm)'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-56 h-16 mx-auto" viewBox="0 0 200 50" fill="none">
        <rect x="10" y="10" width="180" height="30" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <rect x="52" y="16" width="119" height="10" rx="2" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
        <line x1="52" y1="10" x2="52" y2="30" stroke="#e11d48" strokeWidth="2" />
        <line x1="171" y1="10" x2="171" y2="30" stroke="#e11d48" strokeWidth="2" />
        <text x="52" y="38" textAnchor="middle" className="text-[8px] font-black fill-rose-600">3 cm</text>
        <text x="171" y="38" textAnchor="middle" className="text-[8px] font-black fill-rose-600">11,5 cm</text>
        <text x="111" y="46" textAnchor="middle" className="text-[8px] font-bold fill-teal-700">Hossz: 11,5 - 3 = 8,5 cm</text>
      </svg>
    ),
    explanation: 'Ha nem a 0-tól mérünk, a végpont értékéből ki kell vonni a kezdőpont értékét: $11{,}5 - 3 = 8{,}5\\text{ cm} = 85\\text{ mm}$.',
    hint: 'Végpont mínusz kezdőpont!',
    breakdown: [
      { label: 'Kezdőpont', value: '3,0 cm' },
      { label: 'Végpont', value: '11,5 cm' },
      { label: 'Különbség', value: '11,5 - 3,0 = 8,5 cm = 85 mm' }
    ]
  },
  {
    id: 'lq2-10',
    level: 2,
    prompt: 'Egy deszka hossza 2 méter 8 centiméter. Hogyan írjuk ezt fel helyesen centiméterben?',
    options: [
      '208 cm',
      '280 cm',
      '28 cm',
      '2008 cm'
    ],
    correctAnswer: 0,
    explanation: '$2\\text{ m} = 200\\text{ cm}$. Ehhez hozzáadva a $8\\text{ cm}$-t: $200 + 8 = 208\\text{ cm}$. A 280 cm az 2 m 80 cm (2 m 8 dm) lenne!',
    hint: 'Gondolj arra, hogy 1 m = 100 cm, a 8 pedig egyes helyiérték!',
    breakdown: [
      { label: '2 m', value: '200 cm' },
      { label: 'Plusz 8 cm', value: '+ 8 cm' },
      { label: 'Összesen', value: '208 cm' }
    ]
  },

  // =========================================================================
  // 3. SZINT: SZÖVEGES ÉS ÖSSZETETT GYAKORLATI FELADATOK (21-30)
  // =========================================================================
  {
    id: 'lq3-1',
    level: 3,
    prompt: 'Anna egy 3 méter hosszú selyemszalagból levágott egy 85 cm-es és egy 1 m 40 cm-es darabot. Hány centiméter szalagja maradt?',
    options: [
      '75 cm',
      '65 cm',
      '85 cm',
      '175 cm'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk mindent centiméterbe:\n• Kezdeti szalag: $3\\text{ m} = 300\\text{ cm}$\n• Első darab: $85\\text{ cm}$\n• Második darab: $1\\text{ m } 40\\text{ cm} = 140\\text{ cm}$\n• Levágva összesen: $85 + 140 = 225\\text{ cm}$\n• Maradék: $300 - 225 = 75\\text{ cm}$.',
    hint: 'Számold ki centiméterben a levágott részek összegét, majd vond ki a 300 cm-ből!',
    breakdown: [
      { label: 'Teljes hossz', value: '3 m = 300 cm' },
      { label: 'Levágott 1. darab', value: '85 cm' },
      { label: 'Levágott 2. darab', value: '140 cm' },
      { label: 'Levágva összesen', value: '85 + 140 = 225 cm' },
      { label: 'Maradék', value: '300 - 225 = 75 cm' }
    ]
  },
  {
    id: 'lq3-2',
    level: 3,
    prompt: 'Bence egy lépése átlagosan 75 cm hosszú. Hány lépést kell tennie, hogy megtegyen pontosan 300 métert?',
    options: [
      '400 lépést',
      '40 lépést',
      '225 lépést',
      '4000 lépést'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk át a 300 métert centiméterbe:\n$300\\text{ m} = 300 \\cdot 100 = 30\\,000\\text{ cm}$.\nEzután osszuk el egy lépés hosszával:\n$30\\,000 : 75 = 400\\text{ lépés}$.',
    hint: '300 m hány centiméter? Oszd el 75-tel!',
    breakdown: [
      { label: 'Megteendő táv', value: '300 m = 30 000 cm' },
      { label: 'Egy lépés', value: '75 cm' },
      { label: 'Lépések száma', value: '30 000 : 75 = 400 lépés' }
    ]
  },
  {
    id: 'lq3-3',
    level: 3,
    prompt: 'Egy iskolai futópálya 400 méter hosszú. Dániel lefutott 6 teljes kört. Hány kilométert és métert futott összesen?',
    options: [
      '2 km 400 m (2,4 km)',
      '24 km',
      '2 km 40 m',
      '1 km 400 m'
    ],
    correctAnswer: 0,
    explanation: '6 kör hossza méterben: $6 \\cdot 400 = 2400\\text{ m}$.\nMivel $1000\\text{ m} = 1\\text{ km}$, a 2400 m az $2\\text{ km } 400\\text{ m} = 2{,}4\\text{ km}$.',
    hint: 'Szorozd össze a körök számát a kör hosszával, majd váltsd át km-be!',
    breakdown: [
      { label: '1 kör', value: '400 m' },
      { label: '6 kör', value: '6 · 400 = 2400 m' },
      { label: 'Átváltás km-be', value: '2400 m = 2 km 400 m = 2,4 km' }
    ]
  },
  {
    id: 'lq3-4',
    level: 3,
    prompt: 'Egy téglalap alakú kiskert hosszúsága 12 méter, szélessége 8 méter. Kerítést szeretnénk köré fonni. Hány méter dróthálóra van szükségünk?',
    options: [
      '40 méter',
      '20 méter',
      '96 méter',
      '48 méter'
    ],
    correctAnswer: 0,
    explanation: 'A kerítés a kiskert kerületével egyenlő: $K = 2 \\cdot (a + b) = 2 \\cdot (12 + 8) = 2 \\cdot 20 = 40\\text{ méter}$.',
    hint: 'A kerítés a 4 oldal összhossza: 12 + 8 + 12 + 8.',
    breakdown: [
      { label: 'Hosszúság (a)', value: '12 m' },
      { label: 'Szélesség (b)', value: '8 m' },
      { label: 'Kerület (K)', value: '2 · (12 + 8) = 40 m' }
    ]
  },
  {
    id: 'lq3-5',
    level: 3,
    prompt: 'Egy könyvespolcon 40 darab egyforma vastagságú tankönyv áll egymás mellett szorosan. Egy könyv vastagsága 18 mm. Hány centiméter hosszú a könyvsor?',
    options: [
      '72 cm',
      '720 cm',
      '7,2 cm',
      '7200 cm'
    ],
    correctAnswer: 0,
    explanation: 'A sor hossza milliméterben: $40 \\cdot 18 = 720\\text{ mm}$.\nCentiméterbe váltva osztunk 10-zel: $720 : 10 = 72\\text{ cm}$.',
    hint: '40 · 18 mm = ? mm, aztán váltsd át cm-be!',
    breakdown: [
      { label: 'Könyvek száma', value: '40 db' },
      { label: '1 könyv vastagsága', value: '18 mm' },
      { label: 'Összhossz mm-ben', value: '40 · 18 = 720 mm' },
      { label: 'Átváltás cm-be', value: '720 : 10 = 72 cm' }
    ]
  },
  {
    id: 'lq3-6',
    level: 3,
    prompt: 'Számítsd ki a művelet eredményét méterben: 2 km + 350 m - 800 dm = ?',
    options: [
      '2270 m',
      '2370 m',
      '2250 m',
      '2170 m'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk mindent méterbe:\n• $2\\text{ km} = 2000\\text{ m}$\n• $350\\text{ m} = 350\\text{ m}$\n• $800\\text{ dm} = 80\\text{ m}$ (mivel $800 : 10 = 80$)\n• Művelet: $2000 + 350 - 80 = 2350 - 80 = 2270\\text{ m}$.',
    hint: 'A 800 dm-t váltsd át méterre (80 m), aztán végezd el a műveleteket!',
    breakdown: [
      { label: '2 km', value: '2000 m' },
      { label: '+ 350 m', value: '+ 350 m = 2350 m' },
      { label: '- 800 dm (= 80 m)', value: '2350 - 80 = 2270 m' }
    ]
  },
  {
    id: 'lq3-7',
    level: 3,
    prompt: 'Egy csiga percenként 5 centimétert halad előre. Hány perc alatt tesz meg 1 méter távolságot?',
    options: [
      '20 perc alatt',
      '10 perc alatt',
      '50 perc alatt',
      '5 perc alatt'
    ],
    correctAnswer: 0,
    explanation: '$1\\text{ méter} = 100\\text{ cm}$.\nMivel percenként 5 cm-t tesz meg: $100 : 5 = 20\\text{ perc}$.',
    hint: '1 m = 100 cm. Hányszor van meg az 5 a 100-ban?',
    breakdown: [
      { label: 'Távolság', value: '1 m = 100 cm' },
      { label: 'Sebesség', value: '5 cm / perc' },
      { label: 'Idő', value: '100 : 5 = 20 perc' }
    ]
  },
  {
    id: 'lq3-8',
    level: 3,
    prompt: 'Egy mérőszalag 5 méter hosszú. Hányszor kell ráfektetni egy 32 méter hosszú focipálya-vonalra, hogy a teljes szakaszt kimérjük?',
    options: [
      '7-szer (6 teljes szalag és még egy 2 méteres részlet)',
      '6-szor',
      '8-szor',
      '5-ször'
    ],
    correctAnswer: 0,
    explanation: '$32 : 5 = 6$, a maradék $2\\text{ m}$. Tehát 6-szor kell a teljes 5 méteres szalagot lefektetni ($6 \\cdot 5 = 30\\text{ m}$), és a fennmaradó 2 méterhez még egyszer le kell fektetni, azaz összesen 7 alkalommal kell használni.',
    hint: '6 · 5 = 30 méter, ami még nem éri el a 32 métert!',
    breakdown: [
      { label: 'Mérőszalag hossza', value: '5 m' },
      { label: 'Mérendő táv', value: '32 m' },
      { label: 'Osztás maradékkal', value: '32 : 5 = 6 (maradék 2 m)' },
      { label: 'Összes ráfektetés', value: '7 alkalom' }
    ]
  },
  {
    id: 'lq3-9',
    level: 3,
    prompt: 'Egy térképen 1 cm a valóságban 500 méternek felel meg (méretarány 1 : 50 000). A térképen a két falu közötti távolság 6 cm. Hány kilométerre vannak egymástól a valóságban?',
    options: [
      '3 km',
      '30 km',
      '0,3 km',
      '3000 km'
    ],
    correctAnswer: 0,
    explanation: 'A valós távolság méterben: $6 \\cdot 500\\text{ m} = 3000\\text{ m}$.\nMivel $1000\\text{ m} = 1\\text{ km}$, a $3000\\text{ m} = 3\\text{ km}$.',
    hint: '6 · 500 méter = 3000 méter, amit válts át km-be!',
    breakdown: [
      { label: '1 cm a térképen', value: '500 m' },
      { label: '6 cm a térképen', value: '6 · 500 = 3000 m' },
      { label: 'Átváltás km-be', value: '3000 m = 3 km' }
    ]
  },
  {
    id: 'lq3-10',
    level: 3,
    prompt: 'Egy torony árnyéka a déli órákban 14 méter. Ugyanekkor egy mellette álló 2 méteres mérőrúd árnyéka pontosan 1 méter. Milyen magas a torony?',
    options: [
      '28 méter magas',
      '14 méter magas',
      '7 méter magas',
      '24 méter magas'
    ],
    correctAnswer: 0,
    explanation: 'A mérőrúd magassága kétszerese az árnyékának ($2\\text{ m} : 1\\text{ m} = 2$). Ugyanebben az időpontban a torony magassága is kétszerese kell legyen az árnyékának: $14 \\cdot 2 = 28\\text{ méter}$.',
    hint: 'Ha a rúd magassága a saját árnyékának 2-szerese, a torony magassága is a saját árnyékának a kétszerese!',
    breakdown: [
      { label: 'Mérőrúd és árnyéka', value: '2 m rúd → 1 m árnyék (arány: 2×)' },
      { label: 'Torony árnyéka', value: '14 m' },
      { label: 'Torony magassága', value: '14 · 2 = 28 m' }
    ]
  }
];

export const LengthQuiz: React.FC<LengthQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      chapterId="hosszusag-terulet-terfogat"
      topicId="g5-meas-length-quiz"
      topicTitle="1. A hosszúság mérése"
      title="A hosszúság mérése Kvíz"
      subtitle="5. osztály • IV. Hosszúság, terület, térfogat • 3 szinten 30 feladat"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG • KVÍZ"
      topicBadge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT"
      documentId="grade-5-length-quiz"
      pdfFilename="5_osztaly_IV_1_hosszusag_kviz.pdf"
      emoji="📏"
      questions={LENGTH_QUESTIONS}
      cheatSheetTitle="Hosszúság és Váltószám Kisokos"
      cheatSheetCards={[
        {
          title: 'A mértékegységek sora és váltószámai',
          content: (
            <div className="space-y-1 text-xs">
              <p><strong>mm</strong> (milliméter) <span className="font-bold text-teal-600 dark:text-teal-400">→ · 10 →</span> <strong>cm</strong> (centiméter)</p>
              <p><strong>cm</strong> <span className="font-bold text-teal-600 dark:text-teal-400">→ · 10 →</span> <strong>dm</strong> (deciméter)</p>
              <p><strong>dm</strong> <span className="font-bold text-teal-600 dark:text-teal-400">→ · 10 →</span> <strong>m</strong> (méter - alapegység)</p>
              <p><strong>m</strong> <span className="font-bold text-teal-600 dark:text-teal-400">→ · 1000 →</span> <strong>km</strong> (kilométer)</p>
            </div>
          )
        },
        {
          title: 'Átváltási aranyszabályok',
          content: (
            <div className="space-y-1.5 text-xs">
              <p>• <strong>Nagyobbból kisebbe:</strong> SZORZUNK a váltószámmal (pl. 3 m = 300 cm).</p>
              <p>• <strong>Kisebből nagyobba:</strong> OSZTUNK a váltószámmal (pl. 450 mm = 45 cm).</p>
              <p>• <strong>1 km = 1000 m</strong> (a kilo- mindig ezret jelent!)</p>
              <p>• <strong>1 m = 10 dm = 100 cm = 1000 mm</strong></p>
            </div>
          )
        },
        {
          title: 'Gyakorlati méretbecslési kapaszkodók',
          content: (
            <div className="space-y-1 text-xs">
              <p>• <strong>1 mm:</strong> bankkártya vastagsága, köröm hegye</p>
              <p>• <strong>1 cm:</strong> köröm szélessége, füzetben 2 négyzetrács</p>
              <p>• <strong>1 dm (10 cm):</strong> kinyújtott tenyér szélessége</p>
              <p>• <strong>1 m:</strong> felnőtt nagy lépése, kilincs magassága</p>
              <p>• <strong>1 km (1000 m):</strong> kb. 15 perces kényelmes séta</p>
            </div>
          )
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító játék',
          subtitle: 'Találd meg a mértékegységek és átváltások párjait!',
          description: 'Párosítsd a mértékegységeket, egyenlőségeket és a mindennapi reális méreteket 3 szinten.',
          badgeText: 'Párosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <LengthMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító játék',
          subtitle: 'Válogasd szét a hosszúságokat és mértékegységeket!',
          description: 'Rendszerezd az elemeket megfelelő mértékegység, 1 méterhez viszonyítás és egyenértékűség szerint!',
          badgeText: 'Csoportosító',
          render: ({ level, onNextLevel, onOpenRules }) => (
            <LengthSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapfogalmak és Szomszédos Átváltások',
          description: 'A mértékegységek jelei, definíciói és a szomszédos váltószámok (mm, cm, dm, m, km).'
        },
        level2: {
          title: '2. Szint: Ugró Átváltások és Összehasonlítás',
          description: 'Átváltás méterből centiméterbe, vegyes mértékegységek, sorba rendezés és vonalzóleolvasás.'
        },
        level3: {
          title: '3. Szint: Szöveges és Összetett Gyakorlati Feladatok',
          description: 'Valós életbeli problémák: szalag darabolása, lépések száma, futópálya és arányos mérések.'
        }
      }}
    />
  );
};

export default LengthQuiz;
