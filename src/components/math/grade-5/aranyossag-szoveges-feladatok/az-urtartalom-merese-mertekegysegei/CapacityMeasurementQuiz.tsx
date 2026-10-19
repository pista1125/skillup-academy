import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { CapacityMeasurementMatcher } from './CapacityMeasurementMatcher';
import { CapacityMeasurementSorter } from './CapacityMeasurementSorter';

export interface CapacityMeasurementQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const CAPACITY_MEASUREMENT_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, ALAPEGYSÉG ÉS KÖZVETLEN VÁLTÓSZÁMOK (1-10)
  // =========================================================================
  {
    id: 'cq1-1',
    level: 1,
    prompt: 'Mi az űrtartalom mérésének alapegysége?',
    options: [
      'Liter (l)',
      'Deciliter (dl)',
      'Hektoliter (hl)',
      'Milliliter (ml)'
    ],
    correctAnswer: 0,
    explanation: 'A folyadékok és üreges testek belső térfogatának alapvető mértékegysége a liter (jele: l).',
    hint: 'Gondolj arra, milyen egységben vásárolunk tejet vagy ásványvizet a boltban!',
    breakdown: [
      { label: 'Alapegység', value: 'Liter (l)' },
      { label: 'Térfogati párja', value: '1 dm³' }
    ]
  },
  {
    id: 'cq1-2',
    level: 1,
    prompt: 'Hány deciliter (dl) tesz ki pontosan 1 litert (l)?',
    options: [
      '10 dl',
      '100 dl',
      '1000 dl',
      '5 dl'
    ],
    correctAnswer: 0,
    explanation: 'A „deci-” előtag tizedrészt jelent, ezért 1 liter = 10 deciliter.',
    hint: 'A deci latin eredetű előtag, jelentése: tized.',
    breakdown: [
      { label: 'Váltószám', value: '1 l = 10 dl' }
    ]
  },
  {
    id: 'cq1-3',
    level: 1,
    prompt: 'Hány milliliter (ml) felel meg 1 liternek (l)?',
    options: [
      '1000 ml',
      '100 ml',
      '10 ml',
      '10 000 ml'
    ],
    correctAnswer: 0,
    explanation: 'A „milli-” előtag ezredrészt jelent, így 1 liter = 1000 milliliter.',
    hint: 'Gondolj a milliméterre és a milligrammra: mindegyik az alapegység ezredrésze!',
    breakdown: [
      { label: 'Váltószám', value: '1 l = 1000 ml' }
    ]
  },
  {
    id: 'cq1-4',
    level: 1,
    prompt: 'Hány liter (l) folyadék fér pontosan 1 hektoliteres (hl) hordóba?',
    options: [
      '100 liter',
      '10 liter',
      '1000 liter',
      '50 liter'
    ],
    correctAnswer: 0,
    explanation: 'A „hekto-” előtag százat jelent, ezért 1 hektoliter = 100 liter (1 hl = 100 l).',
    hint: 'Borászatban a nagy hordók méretét hl-ben adják meg. Százszorosa a liternek!',
    breakdown: [
      { label: '1 hektoliter', value: '100 liter' }
    ]
  },
  {
    id: 'cq1-5',
    level: 1,
    prompt: 'Hány milliliter (ml) felel meg 1 centiliternek (cl)?',
    options: [
      '10 ml',
      '100 ml',
      '1 ml',
      '1000 ml'
    ],
    correctAnswer: 0,
    explanation: 'A centiliter a liter századrésze, a milliliter pedig az ezredrésze. Közöttük 10 a váltószám: 1 cl = 10 ml.',
    hint: 'Gondolj a centiméter és milliméter kapcsolatára: 1 cm = 10 mm!',
    breakdown: [
      { label: 'Váltószám', value: '1 cl = 10 ml' }
    ]
  },
  {
    id: 'cq1-6',
    level: 1,
    prompt: 'Melyik mértékegységet használják a leggyakrabban kanalas orvosságok, szirupok és injekciók adagolására?',
    options: [
      'Milliliter (ml)',
      'Deciliter (dl)',
      'Liter (l)',
      'Hektoliter (hl)'
    ],
    correctAnswer: 0,
    explanation: 'A nagyon kis mennyiségű folyadékokat, orvosságokat mindig milliliterben (ml) mérik. Egy teáskanálnyi szirup kb. 5 ml.',
    hint: 'A liter ezredrészét keresd!',
    breakdown: [
      { label: 'Használat', value: 'Orvosságok, szirupok' },
      { label: 'Egység', value: 'Milliliter (ml)' }
    ]
  },
  {
    id: 'cq1-7',
    level: 1,
    prompt: 'Egy bögre forró kakaó körülbelül 2,5 deciliter. Hány milliliter (ml) ez?',
    options: [
      '250 ml',
      '25 ml',
      '2500 ml',
      '2,5 ml'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 dl = 100 ml, ezért 2,5 dl = 2,5 · 100 = 250 ml.',
    hint: 'Szorozd meg a deciliterek számát 100-zal!',
    breakdown: [
      { label: '1 dl', value: '100 ml' },
      { label: '2,5 dl', value: '250 ml' }
    ]
  },
  {
    id: 'cq1-8',
    level: 1,
    prompt: 'Mit jelent a testek űrtartalma?',
    options: [
      'Az üreges testek belső befogadóképességét, amennyi folyadék vagy gáz belefér',
      'A test külső felületének a területét',
      'A test tömegét mérlegen mérve',
      'A test magasságát és szélességét'
    ],
    correctAnswer: 0,
    explanation: 'Az űrtartalom a belső térfogatot jelenti: mekkora térfogatú anyag (folyadék, ömlesztett magvak, gáz) fér el az edény belsejében.',
    hint: 'Gondolj arra, mit mérünk, amikor teletöltünk egy üveget vízzel!',
    breakdown: [
      { label: 'Űrtartalom', value: 'Belső befogadóképesség' }
    ]
  },
  {
    id: 'cq1-9',
    level: 1,
    prompt: 'Hány darab 1 deciliteres kávéscsésze teletöltéséhez elegendő 1 liter kávé?',
    options: [
      '10 darab',
      '5 darab',
      '2 darab',
      '100 darab'
    ],
    correctAnswer: 0,
    explanation: '1 liter = 10 deciliter. Ha egy csésze 1 dl, akkor 10 : 1 = 10 darab csésze tölthető meg.',
    hint: '1 liter hány deciliter? 10 dl!',
    breakdown: [
      { label: '1 liter', value: '10 dl' },
      { label: 'Csészék száma', value: '10 : 1 = 10 db' }
    ]
  },
  {
    id: 'cq1-10',
    level: 1,
    prompt: 'Egy háztartási felmosóvödör űrtartalma körülbelül mekkora?',
    options: [
      '10–12 liter',
      '1 deciliter',
      '1 hektoliter',
      '100 milliliter'
    ],
    correctAnswer: 0,
    explanation: 'A szokásos felmosóvödrök 10 vagy 12 literesek. 1 hektoliter (100 liter) víz 100 kg lenne, amit emberi erővel nem lehetne felemelni.',
    hint: 'Gondolj a vödör méretére a tejesdobozhoz (1 l) viszonyítva!',
    breakdown: [
      { label: 'Reális méret', value: '10–12 liter' }
    ]
  },

  // =========================================================================
  // 2. SZINT: TÖBBLÉPÉSES ÁTVÁLTÁSOK, TÖRTEK ÉS TÉRFOGATI KAPCSOLAT (11-20)
  // =========================================================================
  {
    id: 'cq2-1',
    level: 2,
    prompt: 'Hány deciliter (dl) fél liter (0,5 l)?',
    options: [
      '5 dl',
      '50 dl',
      '0,5 dl',
      '2,5 dl'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 liter = 10 dl, a fele: 10 : 2 = 5 dl (ami 500 ml).',
    hint: '10 deciliternek vedd a felét!',
    breakdown: [
      { label: '1 liter', value: '10 dl' },
      { label: 'Fél liter', value: '5 dl = 500 ml' }
    ]
  },
  {
    id: 'cq2-2',
    level: 2,
    prompt: 'Negyed liter (1/4 l) hány milliliternek (ml) felel meg?',
    options: [
      '250 ml',
      '25 ml',
      '500 ml',
      '125 ml'
    ],
    correctAnswer: 0,
    explanation: '1 liter = 1000 ml. Negyed része: 1000 : 4 = 250 ml (ami 2,5 deciliter).',
    hint: 'Oszd el az 1000 millilitert néggyel!',
    breakdown: [
      { label: '1/4 liter', value: '1000 : 4 = 250 ml' },
      { label: 'Deciliterben', value: '2,5 dl' }
    ]
  },
  {
    id: 'cq2-3',
    level: 2,
    prompt: 'Egy 1 köbdeciméter (1 dm³) belső térfogatú kockába pontosan mennyi víz fér?',
    options: [
      'Pontosan 1 liter',
      '10 liter',
      '0,1 liter',
      '100 liter'
    ],
    correctAnswer: 0,
    explanation: 'A metrikus rendszer alapszabálya: 1 dm³ = 1 liter. Egy 10 cm élhosszúságú kocka űrtartalma éppen 1 liter.',
    hint: 'A liter definíciója pontosan az 1 köbdeciméterhez kapcsolódik!',
    breakdown: [
      { label: 'Aranyszabály', value: '1 dm³ = 1 liter' }
    ]
  },
  {
    id: 'cq2-4',
    level: 2,
    prompt: 'Mennyi 1 köbcentiméter (1 cm³) űrmértékben kifejezve?',
    options: [
      '1 milliliter (1 ml)',
      '1 centiliter (1 cl)',
      '1 deciliter (1 dl)',
      '1 liter (1 l)'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 dm³ = 1000 cm³ és 1 liter = 1000 ml, ezért 1 cm³ = 1 ml.',
    hint: 'Egy kockacukor méretű üregbe 1 ml víz fér.',
    breakdown: [
      { label: 'Összefüggés', value: '1 cm³ = 1 ml' }
    ]
  },
  {
    id: 'cq2-5',
    level: 2,
    prompt: 'Melyik a HELYES relációjel a két mennyiség közé: 45 dl ___ 4 liter 80 ml?',
    options: [
      '> (nagyobb)',
      '< (kisebb)',
      '= (egyenlő)',
      'Nem összehasonlítható'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk milliliterbe: 45 dl = 4500 ml. A jobb oldal: 4 liter 80 ml = 4000 + 80 = 4080 ml. Mivel 4500 ml > 4080 ml, a helyes jel a > (nagyobb).',
    hint: 'Váltsd át mindkét oldalt milliliterre: 4500 ml vs. 4080 ml!',
    breakdown: [
      { label: 'Bal oldal', value: '45 dl = 4500 ml' },
      { label: 'Jobb oldal', value: '4 l 80 ml = 4080 ml' },
      { label: 'Eredmény', value: '4500 ml > 4080 ml' }
    ]
  },
  {
    id: 'cq2-6',
    level: 2,
    prompt: 'Hány deciliter (dl) összesen 2 liter 35 centiliter (2 l 35 cl)?',
    options: [
      '23,5 dl',
      '235 dl',
      '5,5 dl',
      '2,35 dl'
    ],
    correctAnswer: 0,
    explanation: '2 liter = 20 dl. 35 cl = 3,5 dl (mivel 1 dl = 10 cl). Összesen: 20 + 3,5 = 23,5 dl.',
    hint: '2 l = 20 dl, és 35 cl = 3,5 dl.',
    breakdown: [
      { label: '2 liter', value: '20 dl' },
      { label: '35 cl', value: '3,5 dl' },
      { label: 'Összeg', value: '23,5 dl' }
    ]
  },
  {
    id: 'cq2-7',
    level: 2,
    prompt: 'Egy 1 köbméteres (1 m³) tartályba hány liter víz fér?',
    options: [
      '1000 liter (10 hl)',
      '100 liter',
      '10 000 liter',
      '10 liter'
    ],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 dm³ = 1000 liter = 10 hektoliter. Az IBC tartályok, amelyeket kertekben használnak, éppen 1 m³-esek (1000 literesek).',
    hint: '1 köbméterben 1000 köbdeciméter van!',
    breakdown: [
      { label: '1 m³', value: '1000 dm³ = 1000 l' },
      { label: 'Hektoliterben', value: '10 hl' }
    ]
  },
  {
    id: 'cq2-8',
    level: 2,
    prompt: 'Mennyi a tömege 1 liter tiszta víznek?',
    options: [
      'Pontosan 1 kilogramm (1 kg)',
      '10 dekagramm (100 g)',
      '10 kilogramm (10 kg)',
      'Fél kilogramm (500 g)'
    ],
    correctAnswer: 0,
    explanation: 'A kilogrammot eredetileg pontosan úgy határozták meg, hogy 1 liter (+4 °C-os) víz tömege legyen 1 kg. Így 1 l víz = 1 kg.',
    hint: 'Egy 1,5 literes ásványvizes palack tele vízzel pontosan 1,5 kg-ot nyom (a műanyag palack csekély tömegén felül).',
    breakdown: [
      { label: '1 liter víz', value: '1 kg tömegű' }
    ]
  },
  {
    id: 'cq2-9',
    level: 2,
    prompt: 'Válts át 350 litert hektoliterbe (hl) és literbe!',
    options: [
      '3 hl 50 l (3,5 hl)',
      '35 hl',
      '0,35 hl',
      '30 hl 5 l'
    ],
    correctAnswer: 0,
    explanation: '1 hl = 100 liter. Ezért 300 liter = 3 hl, és marad 50 liter: 3 hl 50 l = 3,5 hl.',
    hint: 'Oszd el a litereket 100-zal!',
    breakdown: [
      { label: '300 l', value: '3 hl' },
      { label: '50 l', value: '50 l' },
      { label: 'Összesen', value: '3 hl 50 l = 3,5 hl' }
    ]
  },
  {
    id: 'cq2-10',
    level: 2,
    prompt: 'Háromnegyed liter (3/4 l) narancslé hány deciliter?',
    options: [
      '7,5 dl (750 ml)',
      '3,4 dl',
      '75 dl',
      '0,75 dl'
    ],
    correctAnswer: 0,
    explanation: '1 liter = 10 dl. Ennek háromnegyed része: (10 : 4) · 3 = 2,5 · 3 = 7,5 dl (ami 750 ml).',
    hint: 'Egy negyed liter az 2,5 dl. Ennek vedd a háromszorosát!',
    breakdown: [
      { label: '1/4 liter', value: '2,5 dl' },
      { label: '3/4 liter', value: '3 · 2,5 = 7,5 dl' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT SZÖVEGES FELADATOK ÉS GYAKORLATI SZÁMÍTÁSOK (21-30)
  // =========================================================================
  {
    id: 'cq3-1',
    level: 3,
    prompt: 'Egy 2 literes üvegkancsó tele van bodzaszörppel. Hány darab 2,5 deciliteres poharat tudunk színültig megtölteni belőle?',
    options: [
      '8 darab poharat',
      '5 darab poharat',
      '10 darab poharat',
      '6 darab poharat'
    ],
    correctAnswer: 0,
    explanation: '2 liter = 20 deciliter. 20 dl : 2,5 dl = 8 darab pohár tölthető meg.',
    hint: 'Váltsd át a 2 litert deciliterre (20 dl), majd oszd el 2,5-del!',
    breakdown: [
      { label: 'Kancsó deciliterben', value: '2 l = 20 dl' },
      { label: 'Poharak száma', value: '20 : 2,5 = 8 db' }
    ]
  },
  {
    id: 'cq3-2',
    level: 3,
    prompt: 'Egy kerti esővízgyűjtő hordó űrtartalma 2 hektoliter (2 hl). Eddig 140 liter esővíz gyűlt össze benne. Hány 10 literes öntözőkannányi víz hiányzik még, hogy teljesen megteljen a hordó?',
    options: [
      '6 kannányi víz',
      '60 kannányi víz',
      '4 kannányi víz',
      '14 kannányi víz'
    ],
    correctAnswer: 0,
    explanation: 'A hordó teljes űrtartalma: 2 hl = 200 liter. Hiányzik még: 200 − 140 = 60 liter. Mivel egy kanna 10 literes: 60 : 10 = 6 kannányi víz szükséges.',
    hint: '2 hl = 200 l. Számold ki a hiányzó litereket (200 − 140 = 60 l), majd oszd el 10-zel!',
    breakdown: [
      { label: 'Teljes hordó', value: '2 hl = 200 l' },
      { label: 'Hiányzik', value: '200 − 140 = 60 l' },
      { label: 'Kannák száma', value: '60 : 10 = 6 db' }
    ]
  },
  {
    id: 'cq3-3',
    level: 3,
    prompt: 'Egy recept szerint 4 személyre 6 deciliter tej szükséges a palacsintatésztához. Hány liter tejet kell vásárolnunk, ha 10 személyre szeretnénk palacsintát sütni?',
    options: [
      '1,5 liter tejet (15 dl)',
      '1,2 liter tejet',
      '2 liter tejet',
      '0,6 liter tejet'
    ],
    correctAnswer: 0,
    explanation: '1 személyre: 6 dl : 4 = 1,5 dl tej kell. 10 személyre: 10 · 1,5 dl = 15 dl = 1,5 liter tejre van szükség.',
    hint: 'Számold ki az 1 főre jutó tejet (6 : 4 = 1,5 dl), majd szorozd meg 10-zel!',
    breakdown: [
      { label: '1 főre', value: '6 : 4 = 1,5 dl' },
      { label: '10 főre', value: '10 · 1,5 = 15 dl = 1,5 l' }
    ]
  },
  {
    id: 'cq3-4',
    level: 3,
    prompt: 'Egy szobai akvárium belső méretei: hossza 50 cm, szélessége 30 cm, magassága 40 cm. Hány liter víz fér bele, ha színültig töltjük?',
    options: [
      '60 liter',
      '600 liter',
      '6 liter',
      '120 liter'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk a méreteket deciméterre: 5 dm · 3 dm · 4 dm = 60 dm³. Mivel 1 dm³ = 1 liter, az akváriumba pontosan 60 liter víz fér.',
    hint: 'Számolj deciméterekkel: 5 dm · 3 dm · 4 dm = ? köbdeciméter!',
    breakdown: [
      { label: 'Méretek dm-ben', value: '5 dm · 3 dm · 4 dm' },
      { label: 'Térfogat', value: '60 dm³' },
      { label: 'Űrtartalom', value: '60 liter' }
    ]
  },
  {
    id: 'cq3-5',
    level: 3,
    prompt: 'Az előző feladatban szereplő 60 liter tiszta víznek mennyi a tömege kilogrammban?',
    options: [
      '60 kg',
      '6 kg',
      '600 kg',
      '0,6 kg'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 liter víz tömege pontosan 1 kg, ezért 60 liter víz tömege pontosan 60 kilogramm.',
    hint: '1 liter víz = 1 kg tömeg.',
    breakdown: [
      { label: '60 liter víz', value: '60 kg' }
    ]
  },
  {
    id: 'cq3-6',
    level: 3,
    prompt: 'Egy kerti csapból percenként 12 liter víz folyik ki. Hány perc alatt telik meg egy 1,8 hektoliteres (1,8 hl) kerti medence?',
    options: [
      '15 perc alatt',
      '12 perc alatt',
      '18 perc alatt',
      '150 perc alatt'
    ],
    correctAnswer: 0,
    explanation: 'A medence térfogata: 1,8 hl = 1,8 · 100 = 180 liter. Az idő: 180 liter : 12 liter/perc = 15 perc.',
    hint: 'Váltsd át az 1,8 hektolitert literre (180 l), majd oszd el 12-vel!',
    breakdown: [
      { label: 'Medence literben', value: '1,8 hl = 180 l' },
      { label: 'Feltöltési idő', value: '180 : 12 = 15 perc' }
    ]
  },
  {
    id: 'cq3-7',
    level: 3,
    prompt: 'Egy 0,75 literes üveg szörpből adagonként 25 ml-t keverünk 2 dl szódavízhez. Hány pohár üdítőital készíthető a teljes üveg szörpből?',
    options: [
      '30 pohár',
      '25 pohár',
      '15 pohár',
      '50 pohár'
    ],
    correctAnswer: 0,
    explanation: 'A szörp térfogata: 0,75 liter = 750 ml. Egy pohárhoz 25 ml szörp kell. Készíthető poharak száma: 750 : 25 = 30 pohár.',
    hint: 'Váltsd át a szörpöt milliliterre: 0,75 l = 750 ml! Oszd el 25-tel!',
    breakdown: [
      { label: 'Szörp ml-ben', value: '0,75 l = 750 ml' },
      { label: 'Poharak száma', value: '750 : 25 = 30 pohár' }
    ]
  },
  {
    id: 'cq3-8',
    level: 3,
    prompt: 'Egy csepegő csapból percenként 2 ml víz csöpög el feleslegesen. Hány deciliter víz megy így veszendőbe egyetlen 24 órás nap alatt?',
    options: [
      '28,8 dl (közel 3 liter)',
      '2,88 dl',
      '288 dl',
      '0,288 dl'
    ],
    correctAnswer: 0,
    explanation: 'Egy nap = 24 óra = 24 · 60 = 1440 perc. Elcsöpögött víz: 1440 · 2 ml = 2880 ml. Deciliterbe váltva (osztás 100-zal): 2880 : 100 = 28,8 dl (2 liter 8,8 dl).',
    hint: 'Számold ki a nap perceit (1440 perc), szorozd 2-vel (2880 ml), majd váltsd át dl-be!',
    breakdown: [
      { label: '1 nap percei', value: '24 · 60 = 1440 perc' },
      { label: 'Ml-ben', value: '1440 · 2 = 2880 ml' },
      { label: 'Dl-ben', value: '2880 : 100 = 28,8 dl' }
    ]
  },
  {
    id: 'cq3-9',
    level: 3,
    prompt: 'Három egyforma üvegbe összesen 2 liter 4 deciliter szörp fér. Mennyi szörp fér 5 ilyen üvegbe?',
    options: [
      '4 liter (40 dl)',
      '3,5 liter',
      '4,8 liter',
      '5 liter'
    ],
    correctAnswer: 0,
    explanation: '3 üvegbe fér: 2 l 4 dl = 24 dl. 1 üvegbe fér: 24 : 3 = 8 dl. 5 üvegbe fér: 5 · 8 dl = 40 dl = 4 liter.',
    hint: '2 l 4 dl = 24 dl. Oszd el 3-mal egy üveg méretéért (8 dl), majd szorozd meg 5-tel!',
    breakdown: [
      { label: '3 üveg', value: '24 dl' },
      { label: '1 üveg', value: '24 : 3 = 8 dl' },
      { label: '5 üveg', value: '5 · 8 = 40 dl = 4 l' }
    ]
  },
  {
    id: 'cq3-10',
    level: 3,
    prompt: 'Egy 5 literes és egy 3 literes mérőkancsónk van, egyéb jelölés nélkül. Hogyan tudunk kimérni pontosan 4 liter vizet a csapból a lehető legkevesebb lépésben?',
    options: [
      'Megtöltjük az 5 literest, átöntünk belőle a 3 literesbe (marad 2 l az 5-ösben). Kiöntjük a 3-ast, átöntjük a 2 l-t a 3-asba. Újratöltjük az 5-öst, és teleöntjük a 3-ast (1 l fér bele), így az 5-ösben pontosan 4 liter marad!',
      'Félig töltjük mindkét edényt és összeöntjük őket',
      'Megtöltjük a 3 literest és hozzáadunk 1 liter vizet szemmértékre',
      'Lehetetlen kimérni 4 litert ilyen edényekkel'
    ],
    correctAnswer: 0,
    explanation: 'Klasszikus fejtörő: 1. Tele 5 l. 2. Áttölt a 3 l-esbe -> marad 2 l. 3. 3 l-est kiürítjük, a 2 l-t beletesszük (1 l hely marad benne). 4. 5 l-est újratöltjük színültig (5 l). 5. Teleöntjük a 3 l-est (1 l átmegy) -> az 5 literes kancsóban pontosan 4 liter marad!',
    hint: 'Gondolj a Die Hard 3 híres vizeskannás feladványára!',
    breakdown: [
      { label: '1. lépés', value: '5 l tele, át a 3 l-esbe (marad 2 l)' },
      { label: '2. lépés', value: '3 l kiönt, 2 l átmegy a 3-asba (1 l hely van)' },
      { label: '3. lépés', value: '5 l tele, 1 l át a 3-asba -> pontosan 4 l marad!' }
    ]
  }
];

export const CapacityMeasurementQuiz: React.FC<CapacityMeasurementQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Az űrtartalom mérése kvíz"
      subtitle="30 feladat 3 szinten: liter, deciliter, centiliter, milliliter, hektoliter és gyakorlati szöveges feladatok"
      questions={CAPACITY_MEASUREMENT_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-capacity-measurement-quiz"
      storageKey="g5-cap-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <CapacityMeasurementMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <CapacityMeasurementSorter
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
              <div>• <strong>Alapegység:</strong> Liter (l).</div>
              <div>• <strong>Deciliter:</strong> 1 l = 10 dl.</div>
              <div>• <strong>Milliliter:</strong> 1 l = 1000 ml, 1 dl = 100 ml, 1 cl = 10 ml.</div>
              <div>• <strong>Hektoliter:</strong> 1 hl = 100 l (100-as váltószám!).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">2. Szint Puskája: Törtek és Térfogat kapcsolata</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Fél liter:</strong> 5 dl = 500 ml.</div>
              <div>• <strong>Negyed liter:</strong> 2,5 dl = 250 ml.</div>
              <div>• <strong>Háromnegyed liter:</strong> 7,5 dl = 750 ml.</div>
              <div>• <strong>Aranyhármas:</strong> 1 dm³ = 1 liter víz = 1 kg tömeg!</div>
              <div>• <strong>1 cm³:</strong> pontosan 1 ml = 1 gramm víz.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-teal-700 dark:text-teal-400">3. Szint Puskája: Szöveges feladatok stratégiája</div>
            <div className="p-2 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
              <div>• <strong>Közös egység:</strong> Mielőtt osztasz vagy összeadsz, válts mindent a kisebb közös egységre (pl. dl-be vagy ml-be)!</div>
              <div>• <strong>Hektoliter:</strong> 1 hl = 100 liter.</div>
              <div>• <strong>Köbméter:</strong> 1 m³ = 1000 liter = 10 hl.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
