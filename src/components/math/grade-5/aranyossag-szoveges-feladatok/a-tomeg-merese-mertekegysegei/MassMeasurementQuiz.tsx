import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { MassMeasurementMatcher } from './MassMeasurementMatcher';
import { MassMeasurementSorter } from './MassMeasurementSorter';

export interface MassMeasurementQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const MASS_MEASUREMENT_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, ALAPEGYSÉG ÉS KÖZVETLEN VÁLTÓSZÁMOK (1-10)
  // =========================================================================
  {
    id: 'mq1-1',
    level: 1,
    prompt: 'Mi a tömeg mérésének alapegysége a metrikus (SI) mértékrendszerben?',
    options: [
      'Kilogramm (kg)',
      'Gramm (g)',
      'Tonna (t)',
      'Mázsa (q)'
    ],
    correctAnswer: 0,
    explanation: 'A nemzetközi mértékrendszerben (SI) a tömeg alapegysége a kilogramm (kg). Eredetileg 1 köbdeciméter (1 liter) tiszta víz tömegeként határozták meg.',
    hint: 'Gondolj a liszt, a cukor csomagolására vagy a bolti alapegységre!',
    breakdown: [
      { label: 'Alapegység', value: 'Kilogramm (kg)' },
      { label: 'Eredete', value: '1 dm³ víz tömege' }
    ]
  },
  {
    id: 'mq1-2',
    level: 1,
    prompt: 'Hány gramm (g) felel meg pontosan 1 kilogrammnak (kg)?',
    options: [
      '1000 g',
      '100 g',
      '10 g',
      '10 000 g'
    ],
    correctAnswer: 0,
    explanation: 'A „kilo-” előtag ezret jelent, ezért 1 kilogramm pontosan 1000 gramm: 1 kg = 1000 g.',
    hint: 'A kilo görög eredetű szó, jelentése: ezer.',
    figure: (
      <svg className="w-48 h-20 mx-auto" viewBox="0 0 200 80">
        <rect x="10" y="15" width="70" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
        <text x="45" y="45" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f766e">1 kg</text>
        <path d="M 90 40 L 115 40" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="102" y="32" textAnchor="middle" fontSize="9" fill="#0d9488">· 1000</text>
        <rect x="125" y="15" width="70" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="160" y="45" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">1000 g</text>
      </svg>
    )
  },
  {
    id: 'mq1-3',
    level: 1,
    prompt: 'Hány dekagramm (dkg) tesz ki 1 kilogrammot (kg)?',
    options: [
      '100 dkg',
      '10 dkg',
      '1000 dkg',
      '50 dkg'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. Vigyázat, ez az egyik leggyakoribb csapda: a váltószám nem 10, hanem 100!',
    hint: 'Gondolj a csemegepultos vásárlásra: 10 dkg párizsi még csak a tized része a kilónak!',
    breakdown: [
      { label: 'Váltószám', value: '1 kg = 100 dkg' }
    ]
  },
  {
    id: 'mq1-4',
    level: 1,
    prompt: 'Hány gramm (g) felel meg 1 dekagrammnak (dkg)?',
    options: [
      '10 g',
      '100 g',
      '1 g',
      '1000 g'
    ],
    correctAnswer: 0,
    explanation: 'A „deka-” előtag tizet jelent, így 1 dekagramm pontosan 10 gramm: 1 dkg = 10 g.',
    hint: 'Egy tábla 100 grammos csokoládé pontosan 10 dkg.',
    breakdown: [
      { label: 'Váltószám', value: '1 dkg = 10 g' }
    ]
  },
  {
    id: 'mq1-5',
    level: 1,
    prompt: 'Hány kilogramm (kg) egy mázsa (q)?',
    options: [
      '100 kg',
      '1000 kg',
      '10 kg',
      '50 kg'
    ],
    correctAnswer: 0,
    explanation: '1 mázsa (jele: q) pontosan 100 kilogramm: 1 q = 100 kg. A mezőgazdaságban a gabonát, burgonyát és a tűzifát gyakran mázsában számolják.',
    hint: 'Két 50 kg-os cementeszsák együtt éppen 1 mázsa.',
    breakdown: [
      { label: '1 mázsa (q)', value: '100 kg' }
    ]
  },
  {
    id: 'mq1-6',
    level: 1,
    prompt: 'Hány kilogramm (kg), illetve hány mázsa (q) tesz ki 1 tonnát (t)?',
    options: [
      '1000 kg, ami 10 mázsa',
      '100 kg, ami 1 mázsa',
      '10 000 kg, ami 100 mázsa',
      '500 kg, ami 5 mázsa'
    ],
    correctAnswer: 0,
    explanation: '1 tonna (t) = 1000 kg = 10 q. A tonna a nagy teherautók, vagonok és ipari szállítmányok mértékegysége.',
    hint: 'Egy személyautó átlagos tömege kb. 1,2–1,5 tonna, azaz 1200–1500 kg.',
    figure: (
      <svg className="w-52 h-20 mx-auto" viewBox="0 0 220 80">
        <rect x="5" y="15" width="60" height="50" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
        <text x="35" y="45" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">1 t</text>
        <path d="M 70 40 L 95 40" stroke="#0f766e" strokeWidth="2" />
        <rect x="100" y="15" width="55" height="50" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
        <text x="127" y="45" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f766e">10 q</text>
        <path d="M 160 40 L 175 40" stroke="#0f766e" strokeWidth="2" />
        <rect x="180" y="15" width="65" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="212" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">1000 kg</text>
      </svg>
    )
  },
  {
    id: 'mq1-7',
    level: 1,
    prompt: 'Melyik mértékegységet használják a leggyakrabban gyógyszerek hatóanyagának megadásakor?',
    options: [
      'Milligramm (mg)',
      'Dekagramm (dkg)',
      'Kilogramm (kg)',
      'Mázsa (q)'
    ],
    correctAnswer: 0,
    explanation: 'A gyógyszerek tablettáiban lévő hatóanyagok tömege rendkívül kicsi, ezért milligrammban (mg) mérik őket (1 g = 1000 mg). Pl. egy fájdalomcsillapító tabletta gyakran 500 mg hatóanyagot tartalmaz.',
    hint: 'A gramm ezredrészét keresd!',
    breakdown: [
      { label: '1 gramm', value: '1000 mg' },
      { label: 'Használat', value: 'Gyógyszerek, vitaminok' }
    ]
  },
  {
    id: 'mq1-8',
    level: 1,
    prompt: 'Egy szelet kenyérre körülbelül 2 dkg vajat kenünk. Hány gramm vaj ez?',
    options: [
      '20 g',
      '2 g',
      '200 g',
      '0,2 g'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 dkg = 10 g, ezért 2 dkg = 2 · 10 = 20 g vaj.',
    hint: 'Szorozd meg a dekagrammok számát 10-zel!',
    breakdown: [
      { label: 'Számítás', value: '2 · 10 g = 20 g' }
    ]
  },
  {
    id: 'mq1-9',
    level: 1,
    prompt: 'Melyik mérőeszköz hasonlítja össze a mérendő testet ismert tömegű etalonsúlyokkal egy forgástengely körül billenve?',
    options: [
      'Kétkarú mérleg',
      'Hőmérő',
      'Centiméteres mérőszalag',
      'Stopperóra'
    ],
    correctAnswer: 0,
    explanation: 'A kétkarú mérleg két serpenyővel rendelkezik: az egyikbe a mérendő testet, a másikba a szabványos súlyokat helyezzük. Ha a mérleg nyelve középen áll, a két oldal tömege pontosan egyenlő.',
    hint: 'Az ókor óta ismert mérőeszköz, két karral és két serpenyővel.',
    figure: (
      <svg className="w-36 h-28 mx-auto" viewBox="0 0 120 90">
        <rect x="56" y="25" width="8" height="55" rx="2" fill="#64748b" />
        <rect x="40" y="80" width="40" height="8" rx="2" fill="#475569" />
        <line x1="20" y1="28" x2="100" y2="28" stroke="#0d9488" strokeWidth="4" />
        <circle cx="60" cy="28" r="4" fill="#0f766e" />
        <path d="M 20 28 L 10 55 L 35 55 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
        <path d="M 100 28 L 85 55 L 110 55 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: 'mq1-10',
    level: 1,
    prompt: 'Melyik állítás IGAZ a tömeggel kapcsolatban?',
    options: [
      'A test tömege állandó, a Földön és a Holdon is ugyanannyi',
      'A test tömege a Holdon a hatodára csökken',
      'A test tömegét méterben és deciméterben mérjük',
      'A tömeg és a hőmérséklet teljesen ugyanaz a fogalom'
    ],
    correctAnswer: 0,
    explanation: 'A tömeg a testben lévő anyag mennyiségét jelenti, ezért független a helyszíntől: 1 kg alma a Holdon vagy a világűrben is 1 kg tömegű marad (csak a nehézségi erő, azaz a súlyerő változik a gravitáció miatt).',
    hint: 'Gondolj arra: elfogy-e az anyag a tárgyból, ha felvisszük egy űrhajóra?',
    breakdown: [
      { label: 'Tömeg', value: 'Állandó tulajdonság' },
      { label: 'Súlyerő', value: 'Gravitációtól függ' }
    ]
  },

  // =========================================================================
  // 2. SZINT: TÖBBLÉPÉSES ÁTVÁLTÁSOK, TÖRTRÉSZEK ÉS ÖSSZEHASONLÍTÁSOK (11-20)
  // =========================================================================
  {
    id: 'mq2-1',
    level: 2,
    prompt: 'Mennyi 3 kg 25 dkg kifejezve tisztán grammban (g)?',
    options: [
      '3250 g',
      '325 g',
      '3025 g',
      '32 500 g'
    ],
    correctAnswer: 0,
    explanation: '3 kg = 3000 g, és 25 dkg = 250 g. Összeadva: 3000 g + 250 g = 3250 g.',
    hint: 'Váltsd át a kg-ot grammra (3000 g), a dkg-ot grammra (250 g), majd add össze!',
    breakdown: [
      { label: '3 kg', value: '3000 g' },
      { label: '25 dkg', value: '250 g' },
      { label: 'Összeg', value: '3250 g' }
    ]
  },
  {
    id: 'mq2-2',
    level: 2,
    prompt: 'Hány dekagramm (dkg) fél kilogramm (0,5 kg)?',
    options: [
      '50 dkg',
      '5 dkg',
      '500 dkg',
      '25 dkg'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 kg = 100 dkg, a fele: 100 : 2 = 50 dkg (ami 500 gramm).',
    hint: 'Egy egész kiló 100 dkg. Mennyi a fele?',
    breakdown: [
      { label: '1 kg', value: '100 dkg' },
      { label: 'Fél kg', value: '50 dkg = 500 g' }
    ]
  },
  {
    id: 'mq2-3',
    level: 2,
    prompt: 'Egy kétkarú mérleg bal serpenyőjében egy 1 kg-os liszteszsák van. A jobb serpenyőbe feltettünk egy 40 dkg-os és egy 35 dkg-os súlyt. Hány dekagramm hiányzik még az egyensúlyhoz?',
    options: [
      '25 dkg',
      '15 dkg',
      '35 dkg',
      '75 dkg'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. A jobb serpenyőben eddig van: 40 + 35 = 75 dkg. Az egyensúlyhoz hiányzik: 100 − 75 = 25 dkg.',
    hint: 'Számold ki, mennyi súly van eddig a jobb oldalon (40 + 35 = 75 dkg), és vond ki a 100 dkg-ból!',
    breakdown: [
      { label: 'Céltömeg', value: '1 kg = 100 dkg' },
      { label: 'Feltett súly', value: '40 + 35 = 75 dkg' },
      { label: 'Hiányzik', value: '100 − 75 = 25 dkg' }
    ]
  },
  {
    id: 'mq2-4',
    level: 2,
    prompt: 'Melyik a HELYES relációjel a két tömeg közé: 450 dkg ___ 4 kg 50 g?',
    options: [
      '> (nagyobb)',
      '< (kisebb)',
      '= (egyenlő)',
      'Nem összehasonlíthatóak'
    ],
    correctAnswer: 0,
    explanation: 'Hozzuk mindkettőt grammra: 450 dkg = 450 · 10 = 4500 g. A másik oldal: 4 kg 50 g = 4000 + 50 = 4050 g. Mivel 4500 g > 4050 g, a helyes jel a > (nagyobb).',
    hint: 'Váltsd át mindkét oldalt grammba az összehasonlításhoz!',
    breakdown: [
      { label: 'Bal oldal', value: '450 dkg = 4500 g' },
      { label: 'Jobb oldal', value: '4 kg 50 g = 4050 g' },
      { label: 'Eredmény', value: '4500 g > 4050 g' }
    ]
  },
  {
    id: 'mq2-5',
    level: 2,
    prompt: 'Hány kilogramm felel meg 2,4 tonnának (2,4 t)?',
    options: [
      '2400 kg',
      '240 kg',
      '24 000 kg',
      '24 kg'
    ],
    correctAnswer: 0,
    explanation: '1 tonna = 1000 kg. Ezért 2,4 tonna = 2,4 · 1000 = 2400 kg (vagyis 24 mázsa).',
    hint: 'Szorozd meg 2,4-et 1000-rel (a tizedesvesszőt 3 hellyel jobbra léptetjük)!',
    breakdown: [
      { label: 'Számítás', value: '2,4 · 1000 kg = 2400 kg' }
    ]
  },
  {
    id: 'mq2-6',
    level: 2,
    prompt: 'Negyed kilogramm (1/4 kg) vaj hány grammnak felel meg?',
    options: [
      '250 g',
      '25 g',
      '500 g',
      '125 g'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g. A negyede: 1000 : 4 = 250 g (ami pontosan 25 dkg). A legtöbb bolti teavaj 100 g-os vagy 250 g-os (negyed kilós) kiszerelésű.',
    hint: 'Oszd el az 1000 grammot néggyel!',
    breakdown: [
      { label: '1/4 kg', value: '1000 : 4 = 250 g' },
      { label: 'Dkg-ban', value: '25 dkg' }
    ]
  },
  {
    id: 'mq2-7',
    level: 2,
    prompt: 'Hány darab 20 dkg-os sajttömbből lesz összesen 2 kg sajt?',
    options: [
      '10 darab',
      '5 darab',
      '20 darab',
      '100 darab'
    ],
    correctAnswer: 0,
    explanation: '2 kg = 200 dkg. 200 : 20 = 10 darab 20 dkg-os sajt szükséges a 2 kg-hoz.',
    hint: 'Váltsd át a 2 kg-ot dekagrammba (200 dkg), majd oszd el 20-szal!',
    breakdown: [
      { label: '2 kg dkg-ban', value: '200 dkg' },
      { label: 'Darabszám', value: '200 : 20 = 10 db' }
    ]
  },
  {
    id: 'mq2-8',
    level: 2,
    prompt: 'Váltsd át: 7500 kg hány tonna és hány mázsa?',
    options: [
      '7 t 5 q (7,5 t)',
      '75 t',
      '750 q',
      '70 t 5 q'
    ],
    correctAnswer: 0,
    explanation: '7000 kg = 7 t. A fennmaradó 500 kg = 5 q (mivel 1 q = 100 kg). Tehát 7500 kg = 7 t 5 q = 7,5 t.',
    hint: '1000 kg az 1 t, és 100 kg az 1 q.',
    breakdown: [
      { label: '7000 kg', value: '7 t' },
      { label: '500 kg', value: '5 q' },
      { label: 'Összesen', value: '7 t 5 q = 7,5 t' }
    ]
  },
  {
    id: 'mq2-9',
    level: 2,
    prompt: 'Melyik a LEGRENEHEZEBB a következő tömegek közül?',
    options: [
      '3800 g',
      '350 dkg',
      '0,03 q',
      '3 kg 200 g'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk mindent grammra: 3800 g; 350 dkg = 3500 g; 0,03 q = 3 kg = 3000 g; 3 kg 200 g = 3200 g. A legnagyobb a 3800 g (3,8 kg).',
    hint: 'Váltsd át mindet grammba: 3800 g, 3500 g, 3000 g, 3200 g!',
    breakdown: [
      { label: '3800 g', value: '3800 g (LEGNAGYOBB)' },
      { label: '350 dkg', value: '3500 g' },
      { label: '3 kg 200 g', value: '3200 g' },
      { label: '0,03 q', value: '3000 g' }
    ]
  },
  {
    id: 'mq2-10',
    level: 2,
    prompt: '12 000 mg hány grammnak (g) felel meg?',
    options: [
      '12 g',
      '120 g',
      '1,2 g',
      '1200 g'
    ],
    correctAnswer: 0,
    explanation: '1 g = 1000 mg. Ezért 12 000 mg : 1000 = 12 gramm.',
    hint: 'Milligrammból grammba váltáskor osztunk 1000-rel (levágunk 3 nullát)!',
    breakdown: [
      { label: 'Számítás', value: '12 000 : 1000 = 12 g' }
    ]
  },

  // =========================================================================
  // 3. SZINT: NETTÓ-BRUTTÓ-TÁRA ÉS ÖSSZETETT SZÖVEGES FELADATOK (21-30)
  // =========================================================================
  {
    id: 'mq3-1',
    level: 3,
    prompt: 'Egy doboz bonbon bruttó tömege 320 g. A doboz (tára) tömege 70 g. Mennyi a nettó édesség tömege a dobozban?',
    options: [
      '250 g',
      '390 g',
      '270 g',
      '220 g'
    ],
    correctAnswer: 0,
    explanation: 'Nettó = Bruttó − Tára = 320 g − 70 g = 250 g. A tiszta édesség tömege pontosan 250 g (azaz 25 dkg).',
    hint: 'A bruttó össztömegből vond ki az üres doboz tára tömegét!',
    breakdown: [
      { label: 'Képlet', value: 'Nettó = Bruttó − Tára' },
      { label: 'Számítás', value: '320 − 70 = 250 g' }
    ]
  },
  {
    id: 'mq3-2',
    level: 3,
    prompt: 'Egy zöldséges 15 láda őszibarackot vásárol. Minden ládában nettó 8 kg barack van, és egy üres láda tára tömege 1,5 kg. Mekkora a 15 teli láda együttes bruttó tömege?',
    options: [
      '142,5 kg',
      '120 kg',
      '135 kg',
      '150 kg'
    ],
    correctAnswer: 0,
    explanation: 'Egy láda bruttó tömege: 8 kg + 1,5 kg = 9,5 kg. A 15 láda összesen: 15 · 9,5 kg = 142,5 kg.',
    hint: 'Számold ki 1 teli láda tömegét (8 + 1,5 = 9,5 kg), majd szorozd meg 15-tel!',
    breakdown: [
      { label: '1 láda bruttó', value: '8 + 1,5 = 9,5 kg' },
      { label: '15 láda összesen', value: '15 · 9,5 = 142,5 kg' }
    ]
  },
  {
    id: 'mq3-3',
    level: 3,
    prompt: 'A kavicsszállító teherautó a bánya mérlegén 4,8 tonnát nyom. Miután kiborította a kavicsot, az üres autó tömege 2100 kg. Hány mázsa (q) kavicsot szállított a jármű?',
    options: [
      '27 mázsa (q)',
      '270 mázsa (q)',
      '2,7 mázsa (q)',
      '69 mázsa (q)'
    ],
    correctAnswer: 0,
    explanation: 'Bruttó tömeg: 4,8 t = 4800 kg. Üres autó (tára): 2100 kg. Kavics nettó tömege: 4800 kg − 2100 kg = 2700 kg. Mivel 1 q = 100 kg: 2700 : 100 = 27 mázsa.',
    hint: '4,8 t = 4800 kg. Vond ki belőle a 2100 kg-ot, majd az eredményt oszd el 100-zal!',
    breakdown: [
      { label: 'Bruttó', value: '4,8 t = 4800 kg' },
      { label: 'Nettó kg', value: '4800 − 2100 = 2700 kg' },
      { label: 'Mázsában (q)', value: '2700 : 100 = 27 q' }
    ]
  },
  {
    id: 'mq3-4',
    level: 3,
    prompt: 'Egy üres befőttesüveg tömege a fedővel együtt 28 dkg. Beletöltünk 72 dkg szilvalekvárt. Mennyi a teli üveg bruttó tömege kilogrammban kifejezve?',
    options: [
      '1 kg',
      '10 kg',
      '0,1 kg',
      '100 kg'
    ],
    correctAnswer: 0,
    explanation: 'Bruttó = Tára + Nettó = 28 dkg + 72 dkg = 100 dkg. Mivel 100 dkg = 1 kg, a teli üveg pontosan 1 kg tömegű.',
    hint: 'Add össze a 28 dkg-ot és a 72 dkg-ot! Mennyi dekagramm egy egész kiló?',
    breakdown: [
      { label: 'Összeg dkg', value: '28 + 72 = 100 dkg' },
      { label: 'Kg-ban', value: '1 kg' }
    ]
  },
  {
    id: 'mq3-5',
    level: 3,
    prompt: 'Egy 50 kg-os zsák burgonyából a menzán elhasználtak 12 kg 50 dkg-ot hétfőn, és 8 kg 75 dkg-ot kedden. Mennyi krumpli maradt a zsákban?',
    options: [
      '28 kg 75 dkg (28,75 kg)',
      '29 kg 25 dkg',
      '30 kg 50 dkg',
      '27 kg 50 dkg'
    ],
    correctAnswer: 0,
    explanation: 'Összes elhasznált burgonya: 12,50 kg + 8,75 kg = 21,25 kg (21 kg 25 dkg). A megmaradt mennyiség: 50 kg − 21,25 kg = 28,75 kg = 28 kg 75 dkg.',
    hint: 'Add össze a két napon elhasznált mennyiséget (21 kg 25 dkg), majd vond ki az 50 kg-ból!',
    breakdown: [
      { label: 'Elhasznált', value: '12,5 + 8,75 = 21,25 kg' },
      { label: 'Maradt', value: '50 − 21,25 = 28,75 kg' }
    ]
  },
  {
    id: 'mq3-6',
    level: 3,
    prompt: 'Egy barkácsboltban 50 darab egyforma csavar van egy dobozban. A doboz a csavarokkal együtt 65 dkg. Az üres doboz tömege 15 dkg. Hány gramm egyetlen csavar tömege?',
    options: [
      '10 g',
      '5 g',
      '1 g',
      '20 g'
    ],
    correctAnswer: 0,
    explanation: 'A csavarok tiszta nettó tömege: 65 dkg − 15 dkg = 50 dkg = 500 g. 1 darab csavar tömege: 500 g : 50 = 10 g.',
    hint: 'Először számold ki az 50 csavar tömegét (65 − 15 = 50 dkg = 500 g), majd oszd el 50-nel!',
    breakdown: [
      { label: 'Nettó tömeg', value: '65 − 15 = 50 dkg = 500 g' },
      { label: '1 db csavar', value: '500 : 50 = 10 g' }
    ]
  },
  {
    id: 'mq3-7',
    level: 3,
    prompt: 'Egy fahíd teherbírását jelző táblán „5,5 t” szerepel. Ráhajthat-e a hídra egy olyan teherautó, amelynek saját (tára) tömege 2800 kg, és 30 mázsa (q) rakományt szállít?',
    options: [
      'Nem, mert a jármű össztömege 5,8 t, ami 300 kg-mal meghaladja a megengedettet',
      'Igen, mert a rakomány csak 3 tonna',
      'Igen, mert az össztömeg pontosan 5,5 tonna',
      'Nem, mert a hídon semmilyen jármű nem hajthat át'
    ],
    correctAnswer: 0,
    explanation: 'Saját tömeg: 2800 kg. Rakomány: 30 q = 3000 kg. Együttes össztömeg (bruttó): 2800 + 3000 = 5800 kg = 5,8 tonna. Mivel 5,8 t > 5,5 t, a teherautó 300 kg-mal túllépi a korlátozást, így NEM hajthat a hídra!',
    hint: 'Számold ki az autó és a rakomány együttes tömegét tonnában (2800 kg + 3000 kg = 5800 kg)!',
    breakdown: [
      { label: 'Össztömeg', value: '2800 + 3000 = 5800 kg = 5,8 t' },
      { label: 'Korlát', value: '5,5 t' },
      { label: 'Döntés', value: '5,8 t > 5,5 t → Nem hajthat rá' }
    ]
  },
  {
    id: 'mq3-8',
    level: 3,
    prompt: 'Melyik képlet HELYES a nettó, tára és bruttó tömeg kapcsolatára?',
    options: [
      'Nettó = Bruttó − Tára',
      'Bruttó = Nettó − Tára',
      'Tára = Bruttó + Nettó',
      'Nettó = Tára − Bruttó'
    ],
    correctAnswer: 0,
    explanation: 'Mivel Bruttó = Nettó + Tára, ezért a tiszta áru tömege: Nettó = Bruttó − Tára.',
    hint: 'A bruttó a legnagyobb (teljes) tömeg, abból kell levonni a csomagolást!',
    breakdown: [
      { label: 'Alapösszefüggés', value: 'Bruttó = Nettó + Tára' },
      { label: 'Átrendezve', value: 'Nettó = Bruttó − Tára' }
    ]
  },
  {
    id: 'mq3-9',
    level: 3,
    prompt: 'Egy méhész 20 üveg akácmézet készít eladásra. Minden üvegbe nettó 45 dkg mézet tölt. Az üres üvegek saját tömege 15 dkg. Mennyi a 20 üveg méz együttes bruttó tömege kilogrammban?',
    options: [
      '12 kg',
      '9 kg',
      '15 kg',
      '6 kg'
    ],
    correctAnswer: 0,
    explanation: 'Egyetlen teli üveg bruttó tömege: 45 dkg + 15 dkg = 60 dkg. A 20 üveg összesen: 20 · 60 dkg = 1200 dkg. Kilogrammba váltva: 1200 : 100 = 12 kg.',
    hint: 'Egy teli üveg 45 + 15 = 60 dkg. Szorozd meg 20-szal, majd váltsd át kg-ba (oszd 100-zal)!',
    breakdown: [
      { label: '1 üveg bruttó', value: '45 + 15 = 60 dkg' },
      { label: '20 üveg dkg-ban', value: '20 · 60 = 1200 dkg' },
      { label: 'Kilogrammban', value: '1200 : 100 = 12 kg' }
    ]
  },
  {
    id: 'mq3-10',
    level: 3,
    prompt: 'Egy 250 g-os prémium vaj ára 800 Ft a szupermarketben. Mennyibe kerülne ugyanezen az egységáron 1 kg ebből a vajból?',
    options: [
      '3200 Ft',
      '2400 Ft',
      '4000 Ft',
      '1600 Ft'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g. Mivel 1000 : 250 = 4, az 1 kg éppen négyszerese a 250 g-os csomagnak. Ezért az ára is négyszeres: 4 · 800 Ft = 3200 Ft.',
    hint: 'Hány 250 grammos vaj tesz ki egy egész kilogrammot (1000 g)? 4 darab!',
    breakdown: [
      { label: '1 kg vaj', value: '4 db 250 g-os csomag' },
      { label: 'Ár számítás', value: '4 · 800 Ft = 3200 Ft' }
    ]
  }
];

export const MassMeasurementQuiz: React.FC<MassMeasurementQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="A tömeg mérése és mértékegységei kvíz"
      subtitle="30 feladat 3 szinten: mértékegységek (mg, g, dkg, kg, q, t), átváltások és nettó-bruttó feladatok"
      questions={MASS_MEASUREMENT_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-mass-measurement-quiz"
      storageKey="g5-mass-measurement-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <MassMeasurementMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <MassMeasurementSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">1. Szint Puskája: Alapok és Váltószámok</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Alapegység:</strong> Kilogramm (kg) = 100 dkg = 1000 g.</div>
              <div>• <strong>Dekagramm:</strong> 1 dkg = 10 g, 100 dkg = 1 kg.</div>
              <div>• <strong>Mázsa és Tonna:</strong> 1 q = 100 kg, 1 t = 10 q = 1000 kg.</div>
              <div>• <strong>Milligramm:</strong> 1 g = 1000 mg (apró dolgok, gyógyszerek).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">2. Szint Puskája: Átváltási trükkök és Törtek</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Fél kg:</strong> 50 dkg = 500 g.</div>
              <div>• <strong>Negyed kg:</strong> 25 dkg = 250 g.</div>
              <div>• <strong>Háromnegyed kg:</strong> 75 dkg = 750 g.</div>
              <div>• <strong>Összehasonlítás:</strong> Mindig váltsd közös egységre (pl. mindent grammra)!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">3. Szint Puskája: Nettó, Tára, Bruttó</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Bruttó:</strong> Nettó + Tára (teljes tömeg mérlegelve).</div>
              <div>• <strong>Nettó:</strong> Bruttó − Tára (a tiszta áru tömege csomagolás nélkül).</div>
              <div>• <strong>Tára:</strong> Bruttó − Nettó (az üres doboz, láda, üveg tömege).</div>
              <div>• <strong>Aranyszabály:</strong> A bruttó sosem lehet kisebb a nettónál vagy a táránál!</div>
            </div>
          </div>
        )
      }}
    />
  );
};
