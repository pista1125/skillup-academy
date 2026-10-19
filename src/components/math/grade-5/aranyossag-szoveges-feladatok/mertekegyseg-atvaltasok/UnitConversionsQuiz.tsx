import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { UnitConversionsMatcher } from './UnitConversionsMatcher';
import { UnitConversionsSorter } from './UnitConversionsSorter';

export interface UnitConversionsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const UNIT_CONVERSIONS_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPVETŐ ÁTVÁLTÁSOK ÉS KÖZVETLEN VÁLTÓSZÁMOK (1-10)
  // =========================================================================
  {
    id: 'uq1-1',
    level: 1,
    prompt: 'Hány centiméternek (cm) felel meg 3,5 méter (m)?',
    options: [
      '350 cm',
      '35 cm',
      '3500 cm',
      '305 cm'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 m = 100 cm, nagyobb egységből kisebbe váltva szorzunk 100-zal: 3,5 · 100 = 350 cm.',
    hint: 'A tizedesvesszőt 2 hellyel kell jobbra tolni: 3,5 -> 350.',
    breakdown: [
      { label: 'Számítás', value: '3,5 · 100 cm = 350 cm' }
    ]
  },
  {
    id: 'uq1-2',
    level: 1,
    prompt: 'Hány gramm (g) felel meg 4,2 kilogrammnak (kg)?',
    options: [
      '4200 g',
      '420 g',
      '42 000 g',
      '4020 g'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 1000 g, így 4,2 kg = 4,2 · 1000 = 4200 gramm.',
    hint: 'A kilogrammból grammba váltva 1000-rel szorzunk (3 hellyel tolódik a tizedesvessző).',
    breakdown: [
      { label: 'Váltószám', value: '1 kg = 1000 g' },
      { label: 'Művelet', value: '4,2 · 1000 = 4200 g' }
    ]
  },
  {
    id: 'uq1-3',
    level: 1,
    prompt: 'Hány milliliter (ml) felel meg 0,7 liternek (l)?',
    options: [
      '700 ml',
      '70 ml',
      '7000 ml',
      '7 ml'
    ],
    correctAnswer: 0,
    explanation: '1 liter = 1000 milliliter. Ezért: 0,7 · 1000 = 700 ml (vagy 7 dl = 700 ml).',
    hint: 'Szorozz 1000-rel: 0,7 · 1000 = ?',
    breakdown: [
      { label: 'Számítás', value: '0,7 · 1000 = 700 ml' }
    ]
  },
  {
    id: 'uq1-4',
    level: 1,
    prompt: 'Hány másodperc (s) van pontosan 3 percben (min)?',
    options: [
      '180 másodperc',
      '300 másodperc',
      '120 másodperc',
      '360 másodperc'
    ],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc. Így 3 perc = 3 · 60 = 180 másodperc.',
    hint: 'Szorozd meg a 3-at 60-nal!',
    breakdown: [
      { label: 'Számítás', value: '3 · 60 s = 180 s' }
    ]
  },
  {
    id: 'uq1-5',
    level: 1,
    prompt: 'Hány kilogramm (kg) 250 dekagramm (dkg)?',
    options: [
      '2,5 kg',
      '25 kg',
      '0,25 kg',
      '250 kg'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. Kisebb egységből nagyobba váltva osztunk 100-zal: 250 : 100 = 2,5 kg (2 és fél kg).',
    hint: 'Oszd el a 250-et 100-zal: 250 : 100 = ?',
    breakdown: [
      { label: 'Váltószám', value: '1 kg = 100 dkg' },
      { label: 'Osztás', value: '250 : 100 = 2,5 kg' }
    ]
  },
  {
    id: 'uq1-6',
    level: 1,
    prompt: 'Nagyobb mértékegységről kisebbre váltáskor milyen matematikai műveletet végzünk a mérőszámmal?',
    options: [
      'Szorzunk a váltószámmal',
      'Osztunk a váltószámmal',
      'Hozzáadjuk a váltószámot',
      'Kivonjuk a váltószámot'
    ],
    correctAnswer: 0,
    explanation: 'Az aranyszabály szerint nagyobb egységből kisebbe váltva mindig SZORZUNK a váltószámmal, mert a kisebb részekből több darab kell.',
    hint: 'Pl. 1 méterből centiméterbe: a szám 1-ről 100-ra nő (szorzás).'
  },
  {
    id: 'uq1-7',
    level: 1,
    prompt: 'Hány méter (m) felel meg 3,4 kilométernek (km)?',
    options: [
      '3400 méter',
      '340 méter',
      '34 000 méter',
      '3040 méter'
    ],
    correctAnswer: 0,
    explanation: '1 km = 1000 m. Ezért 3,4 km = 3,4 · 1000 = 3400 méter.',
    hint: '3,4 · 1000 = 3400 m.',
    breakdown: [
      { label: 'Számítás', value: '3,4 · 1000 = 3400 m' }
    ]
  },
  {
    id: 'uq1-8',
    level: 1,
    prompt: 'Hány liter (l) felel meg 500 deciliternek (dl)?',
    options: [
      '50 liter',
      '5 liter',
      '5000 liter',
      '0,5 liter'
    ],
    correctAnswer: 0,
    explanation: '1 liter = 10 deciliter. Kisebből nagyobba váltva osztunk 10-zel: 500 : 10 = 50 liter.',
    hint: '500 : 10 = ?',
    breakdown: [
      { label: 'Számítás', value: '500 dl : 10 = 50 l' }
    ]
  },
  {
    id: 'uq1-9',
    level: 1,
    prompt: 'Hány dekagramm (dkg) tesz ki 600 grammot (g)?',
    options: [
      '60 dkg',
      '6 dkg',
      '6000 dkg',
      '0,6 dkg'
    ],
    correctAnswer: 0,
    explanation: '1 dkg = 10 g. Kisebb egységből nagyobba váltva osztunk 10-zel: 600 : 10 = 60 dkg.',
    hint: 'Vágd le az utolsó nullát: 600 : 10 = 60.',
    breakdown: [
      { label: 'Számítás', value: '600 g : 10 = 60 dkg' }
    ]
  },
  {
    id: 'uq1-10',
    level: 1,
    prompt: 'Hány órából áll egy negyed (1/4) naptári nap?',
    options: [
      '6 óra',
      '4 óra',
      '8 óra',
      '12 óra'
    ],
    correctAnswer: 0,
    explanation: '1 nap = 24 óra. Ennek negyede: 24 : 4 = 6 óra.',
    hint: '24 : 4 = ?',
    breakdown: [
      { label: 'Számítás', value: '24 óra : 4 = 6 óra' }
    ]
  },

  // =========================================================================
  // 2. SZINT: TÖRT MENNYISÉGEK, TIZEDESTÖRTEK ÉS VEGYES ALAKOK (11-20)
  // =========================================================================
  {
    id: 'uq2-1',
    level: 2,
    prompt: 'Hány centiméternek felel meg a háromnegyed (3/4) méter?',
    options: [
      '75 cm',
      '70 cm',
      '80 cm',
      '7,5 cm'
    ],
    correctAnswer: 0,
    explanation: '1 méter = 100 cm. A 100 cm negyede 25 cm, ennek a 3-szorosa: 3 · 25 cm = 75 cm (0,75 m).',
    hint: '100 : 4 = 25; 25 · 3 = ?',
    breakdown: [
      { label: '3/4 m', value: '0,75 m = 75 cm' }
    ]
  },
  {
    id: 'uq2-2',
    level: 2,
    prompt: 'Hány gramm a fél (1/2) kilogramm és a 25 dekagramm összege?',
    options: [
      '750 g',
      '525 g',
      '75 g',
      '1000 g'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk mindent grammra:\n• Fél kg = 500 g\n• 25 dkg = 250 g\n• Összegük: 500 + 250 = 750 g (ami pontosan 3/4 kg).',
    hint: 'Fél kg = 500 g, 25 dkg = 250 g.',
    breakdown: [
      { label: 'Fél kg', value: '500 g' },
      { label: '25 dkg', value: '250 g' },
      { label: 'Összeg', value: '750 g' }
    ]
  },
  {
    id: 'uq2-3',
    level: 2,
    prompt: 'Hány deciliter (dl) a 3 és fél liter (3,5 l)?',
    options: [
      '35 dl',
      '350 dl',
      '30,5 dl',
      '50 dl'
    ],
    correctAnswer: 0,
    explanation: '1 liter = 10 deciliter. Ezért: 3,5 · 10 = 35 dl.',
    hint: '3 liter = 30 dl, fél liter = 5 dl.',
    breakdown: [
      { label: 'Számítás', value: '3,5 · 10 = 35 dl' }
    ]
  },
  {
    id: 'uq2-4',
    level: 2,
    prompt: 'Hány centiméter és tizedestörtként hány méter a 3 méter 5 centiméter?',
    options: [
      '305 cm = 3,05 m',
      '350 cm = 3,5 m',
      '35 cm = 0,35 m',
      '3050 cm = 30,5 m'
    ],
    correctAnswer: 0,
    explanation: '3 m = 300 cm. Ehhez adva 5 cm-t: 300 + 5 = 305 cm. Mivel 100 cm = 1 m, tizedestörtben: 305 : 100 = 3,05 m (nem 3,5 m, mert az 350 cm lenne!).',
    hint: 'Vigyázz a hiányzó nullára: 5 cm = 0,05 m!',
    breakdown: [
      { label: '3 m 5 cm', value: '300 + 5 = 305 cm' },
      { label: 'Méterben', value: '3,05 m' }
    ]
  },
  {
    id: 'uq2-5',
    level: 2,
    prompt: 'Hány dekagramm a 4 kg 7 dkg?',
    options: [
      '407 dkg',
      '47 dkg',
      '470 dkg',
      '4007 dkg'
    ],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. Így 4 kg = 400 dkg. 400 dkg + 7 dkg = 407 dkg. Gyakori hiba a 47 dkg-ra gondolni, de a váltószám 100, nem 10!',
    hint: '4 kg = 400 dkg, és ehhez még 7 dkg jön.',
    breakdown: [
      { label: '4 kg', value: '400 dkg' },
      { label: '+ 7 dkg', value: '407 dkg' }
    ]
  },
  {
    id: 'uq2-6',
    level: 2,
    prompt: 'Hány percnek felel meg 2 óra 45 perc?',
    options: [
      '165 perc',
      '145 perc',
      '245 perc',
      '180 perc'
    ],
    correctAnswer: 0,
    explanation: '2 óra = 2 · 60 = 120 perc. Ehhez hozzáadjuk a 45 percet: 120 + 45 = 165 perc.',
    hint: '2 · 60 = 120; 120 + 45 = ?',
    breakdown: [
      { label: '2 óra', value: '120 min' },
      { label: '+ 45 perc', value: '165 min' }
    ]
  },
  {
    id: 'uq2-7',
    level: 2,
    prompt: 'Melyik a nagyobb és mennyivel: 3500 milliméter vagy 3,6 méter?',
    options: [
      'A 3,6 méter a nagyobb 100 milliméterrel (10 cm-rel)',
      'A 3500 milliméter a nagyobb 100 milliméterrel',
      'Pontosan egyenlőek',
      'A 3,6 méter a nagyobb 1 milliméterrel'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk mindkettőt milliméterre: 3,6 m = 3,6 · 1000 = 3600 mm. Mivel 3600 mm > 3500 mm, a 3,6 m a nagyobb: 3600 - 3500 = 100 mm-rel (10 cm-rel).',
    hint: '3,6 m = 3600 mm.',
    breakdown: [
      { label: '3,6 m', value: '3600 mm' },
      { label: 'Különbség', value: '3600 - 3500 = 100 mm' }
    ]
  },
  {
    id: 'uq2-8',
    level: 2,
    prompt: 'Hány mázsa (q) felel meg 3,5 tonnának (t)?',
    options: [
      '35 q',
      '350 q',
      '3,5 q',
      '0,35 q'
    ],
    correctAnswer: 0,
    explanation: '1 tonna = 10 mázsa. Ezért: 3,5 · 10 = 35 mázsa (35 q = 3500 kg).',
    hint: '1 t = 10 q, szorozz 10-zel!',
    breakdown: [
      { label: 'Számítás', value: '3,5 · 10 = 35 q' }
    ]
  },
  {
    id: 'uq2-9',
    level: 2,
    prompt: 'Egy kancsóban 2 liter 4 deciliter gyümölcslé van. Kiöntünk belőle 6 decilitert. Mennyi marad a kancsóban?',
    options: [
      '1 liter 8 deciliter (18 dl = 1,8 l)',
      '1 liter 4 deciliter (14 dl = 1,4 l)',
      '2 liter 2 deciliter',
      '1 liter 2 deciliter'
    ],
    correctAnswer: 0,
    explanation: '2 l 4 dl = 24 dl. 24 dl - 6 dl = 18 dl. Ezt visszaváltva: 18 dl = 1 liter 8 deciliter = 1,8 liter.',
    hint: '24 dl - 6 dl = 18 dl.',
    breakdown: [
      { label: 'Kezdetben', value: '24 dl' },
      { label: 'Kivonás', value: '24 - 6 = 18 dl' },
      { label: 'Eredmény', value: '1 l 8 dl = 1,8 l' }
    ]
  },
  {
    id: 'uq2-10',
    level: 2,
    prompt: 'Hány másodpercnek felel meg a másfél (1,5) perc?',
    options: [
      '90 másodperc',
      '150 másodperc',
      '75 másodperc',
      '80 másodperc'
    ],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc. Fél perc = 30 másodperc. 60 + 30 = 90 másodperc (1,5 · 60 = 90 s).',
    hint: '60 s + 30 s = ?',
    breakdown: [
      { label: '1 perc', value: '60 s' },
      { label: 'Fél perc', value: '30 s' },
      { label: 'Összesen', value: '90 s' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT SZÖVEGES FELADATOK ÉS VEGYES MŰVELETEK (21-30)
  // =========================================================================
  {
    id: 'uq3-1',
    level: 3,
    prompt: 'Egy süteményhez 25 dkg vaj, 0,5 kg liszt és 150 g kristálycukor szükséges. Hány gramm a három hozzávaló együttes tömege?',
    options: [
      '900 gramm',
      '850 gramm',
      '950 gramm',
      '1000 gramm'
    ],
    correctAnswer: 0,
    explanation: 'Közös egységre (grammra) váltunk:\n• Vaj: 25 dkg = 250 g\n• Liszt: 0,5 kg = 500 g\n• Cukor: 150 g\n• Összeg: 250 + 500 + 150 = 900 g (0,9 kg).',
    hint: 'Válts mindent grammra: 250 g + 500 g + 150 g = ?',
    breakdown: [
      { label: 'Vaj', value: '250 g' },
      { label: 'Liszt', value: '500 g' },
      { label: 'Cukor', value: '150 g' },
      { label: 'Összeg', value: '900 g' }
    ]
  },
  {
    id: 'uq3-2',
    level: 3,
    prompt: 'Egy 5 méter hosszú díszszalagból levágnak 3 darab egyforma, 85 cm-es darabot. Hány centiméter szalag marad meg?',
    options: [
      '245 cm (2,45 m)',
      '255 cm (2,55 m)',
      '145 cm',
      '315 cm'
    ],
    correctAnswer: 0,
    explanation: '1) Teljes hossz centiméterben: 5 m = 500 cm.\n2) Levágott darabok: 3 · 85 cm = 255 cm.\n3) Megmaradt szalag: 500 - 255 = 245 cm = 2,45 m.',
    hint: '500 - (3 · 85) = 500 - 255 = ?',
    breakdown: [
      { label: 'Kezdeti hossz', value: '500 cm' },
      { label: 'Levágva', value: '255 cm' },
      { label: 'Maradék', value: '245 cm = 2,45 m' }
    ]
  },
  {
    id: 'uq3-3',
    level: 3,
    prompt: 'Egy 200 literes esővízgyűjtő hordóba betöltenek 1,2 hektoliter és még 45 liter vizet. Hány liter víz hiányzik még, hogy a hordó teljesen tele legyen?',
    options: [
      '35 liter',
      '45 liter',
      '25 liter',
      '15 liter'
    ],
    correctAnswer: 0,
    explanation: '1) 1,2 hektoliter = 1,2 · 100 = 120 liter.\n2) Összesen betöltve: 120 + 45 = 165 liter.\n3) A hordó mérete 200 liter, így hiányzik: 200 - 165 = 35 liter.',
    hint: '1,2 hl = 120 l. 120 + 45 = 165 l. 200 - 165 = ?',
    breakdown: [
      { label: '1,2 hl', value: '120 l' },
      { label: 'Betöltve', value: '165 l' },
      { label: 'Hiányzik', value: '200 - 165 = 35 l' }
    ]
  },
  {
    id: 'uq3-4',
    level: 3,
    prompt: 'Egy kisteherautón 3 raklap áru van. Az első 1,4 tonna, a második 8 mázsa, a harmadik 950 kg. Hány kilogramm a teherautó teljes rakománya?',
    options: [
      '3150 kg (3,15 t)',
      '2430 kg',
      '3250 kg',
      '2950 kg'
    ],
    correctAnswer: 0,
    explanation: 'Közös egységre (kilogrammra) váltunk:\n• 1. raklap: 1,4 t = 1400 kg\n• 2. raklap: 8 q = 8 · 100 = 800 kg\n• 3. raklap: 950 kg\nÖsszesen: 1400 + 800 + 950 = 3150 kg = 3,15 t = 31,5 q.',
    hint: '1400 kg + 800 kg + 950 kg = ?',
    breakdown: [
      { label: '1,4 t', value: '1400 kg' },
      { label: '8 q', value: '800 kg' },
      { label: '3. raklap', value: '950 kg' },
      { label: 'Összeg', value: '3150 kg' }
    ]
  },
  {
    id: 'uq3-5',
    level: 3,
    prompt: 'Egy kerékpártúra első szakasza 14,5 km, a második 8200 méter, a harmadik 7,3 km. Hány kilométer hosszú volt a teljes túra?',
    options: [
      '30 km',
      '29,8 km',
      '31 km',
      '30,5 km'
    ],
    correctAnswer: 0,
    explanation: 'Váltsunk kilométerre: 8200 m = 8,2 km.\nÖsszeadás: 14,5 + 8,2 + 7,3 = 14,5 + 15,5 = 30 km.',
    hint: '8200 m = 8,2 km. 14,5 + 8,2 + 7,3 = ?',
    breakdown: [
      { label: '1. szakasz', value: '14,5 km' },
      { label: '2. szakasz', value: '8,2 km' },
      { label: '3. szakasz', value: '7,3 km' },
      { label: 'Összesen', value: '30,0 km' }
    ]
  },
  {
    id: 'uq3-6',
    level: 3,
    prompt: 'Egy születésnapon 4 darab 2,5 decis poharat és 3 darab 2 decis poharat töltöttek meg teával. Hány liter tea fogyott el?',
    options: [
      '1,6 liter (16 dl)',
      '1,5 liter',
      '1,8 liter',
      '2,0 liter'
    ],
    correctAnswer: 0,
    explanation: '1) 4 db 2,5 decis: 4 · 2,5 = 10 dl (1 liter).\n2) 3 db 2 decis: 3 · 2 = 6 dl (0,6 liter).\n3) Összesen: 10 + 6 = 16 dl = 1,6 liter.',
    hint: '4 · 2,5 = 10 dl; 3 · 2 = 6 dl; 10 + 6 = 16 dl = ? liter.',
    breakdown: [
      { label: '4 · 2,5 dl', value: '10 dl' },
      { label: '3 · 2 dl', value: '6 dl' },
      { label: 'Összesen', value: '16 dl = 1,6 liter' }
    ]
  },
  {
    id: 'uq3-7',
    level: 3,
    prompt: 'Egy csavarozógép pontosan 1 óra 15 perc alatt 450 darab csavart rögzít. Hány csavart rögzít percenként egyenletes sebességgel?',
    options: [
      '6 csavart percenként',
      '5 csavart percenként',
      '7 csavart percenként',
      '8 csavart percenként'
    ],
    correctAnswer: 0,
    explanation: '1 óra 15 perc = 60 + 15 = 75 perc. A percenkénti teljesítmény: 450 : 75 = 6 darab csavar percenként.',
    hint: 'Váltsd a teljes időt percre: 75 perc. Majd oszd el: 450 : 75 = ?',
    breakdown: [
      { label: 'Idő percekben', value: '75 perc' },
      { label: 'Sebesség', value: '450 : 75 = 6 db/perc' }
    ]
  },
  {
    id: 'uq3-8',
    level: 3,
    prompt: 'Két csomag együttes tömege 3 kg 20 dkg. Az egyik csomag 600 grammal nehezebb a másiknál. Hány gramm a könnyebbik csomag?',
    options: [
      '1300 gramm (1,3 kg)',
      '1200 gramm',
      '1400 gramm',
      '1100 gramm'
    ],
    correctAnswer: 0,
    explanation: '1) Váltsunk grammra: 3 kg 20 dkg = 3200 g.\n2) Vonjuk le a különbséget: 3200 - 600 = 2600 g.\n3) Osszuk el 2 egyenlő részre: 2600 : 2 = 1300 g.\n(Ellenőrzés: 1300 g + 1900 g = 3200 g, helyes!)',
    hint: '3200 g - 600 g = 2600 g; 2600 : 2 = ?',
    breakdown: [
      { label: 'Összesen', value: '3200 g' },
      { label: 'Különbség levonása', value: '2600 g' },
      { label: 'Könnyebb csomag', value: '1300 g' }
    ]
  },
  {
    id: 'uq3-9',
    level: 3,
    prompt: 'Egy kerítéshez 4 darab 2,4 méteres és 6 darab 180 centiméteres lécet vásárolnak. Hány méter faanyagra van szükség összesen?',
    options: [
      '20,4 méter (2040 cm)',
      '20 méter',
      '21,4 méter',
      '19,8 méter'
    ],
    correctAnswer: 0,
    explanation: '1) 4 · 2,4 m = 9,6 méter.\n2) 180 cm = 1,8 m; 6 · 1,8 m = 10,8 méter.\n3) Összesen: 9,6 + 10,8 = 20,4 méter (2040 cm).',
    hint: '4 · 2,4 = 9,6 m; 6 · 1,8 = 10,8 m; 9,6 + 10,8 = ?',
    breakdown: [
      { label: 'Hosszú lécek', value: '9,6 m' },
      { label: 'Rövid lécek', value: '10,8 m' },
      { label: 'Összesen', value: '20,4 m' }
    ]
  },
  {
    id: 'uq3-10',
    level: 3,
    prompt: 'Egy nagy akvárium térfogata 150 liter vízzel tölthető meg. Hány köbdeciméter (dm³) és hány köbcentiméter (cm³) ez a térfogat?',
    options: [
      '150 dm³ és 150 000 cm³',
      '15 dm³ és 15 000 cm³',
      '1500 dm³ és 150 000 cm³',
      '150 dm³ és 15 000 cm³'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 liter = 1 dm³ és 1 dm³ = 1000 cm³: 150 liter = 150 dm³ = 150 · 1000 = 150 000 cm³.',
    hint: '1 liter pontosan 1 dm³, és 1 dm³ = 1000 cm³.',
    breakdown: [
      { label: '150 liter', value: '150 dm³' },
      { label: 'cm³-ben', value: '150 000 cm³' }
    ]
  }
];

export const UnitConversionsQuiz: React.FC<UnitConversionsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Mértékegység-átváltások kvíz"
      subtitle="30 feladat 3 szinten: hosszúság, tömeg, űrtartalom és idő átváltása, tizedestörtek és vegyes szöveges feladatok"
      questions={UNIT_CONVERSIONS_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-unit-conversions-quiz"
      storageKey="g5-unit-conversions-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <UnitConversionsMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <UnitConversionsSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-emerald-700 dark:text-emerald-400">1. Szint Puskája: Az Aranyszabály</div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div>• <strong>Nagyobból kisebbe:</strong> SZORZUNK a váltószámmal (pl. 3 m · 100 = 300 cm).</div>
              <div>• <strong>Kisebből nagyobba:</strong> OSZTUNK a váltószámmal (pl. 500 g : 1000 = 0,5 kg).</div>
              <div>• <strong>Hossz:</strong> 1 m = 10 dm = 100 cm = 1000 mm, 1 km = 1000 m.</div>
              <div>• <strong>Tömeg:</strong> 1 kg = 100 dkg = 1000 g, 1 q = 100 kg, 1 t = 1000 kg.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-emerald-700 dark:text-emerald-400">2. Szint Puskája: Tört Részek és Nullák</div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div>• <strong>Fél (1/2):</strong> 0,5 egység = 50 cm = 50 dkg = 500 g = 5 dl = 30 perc.</div>
              <div>• <strong>Negyed (1/4):</strong> 0,25 egység = 25 cm = 25 dkg = 250 g = 2,5 dl = 15 perc.</div>
              <div>• <strong>Háromnegyed (3/4):</strong> 0,75 egység = 75 cm = 75 dkg = 750 g = 7,5 dl = 45 perc.</div>
              <div>• <strong>Vigyázat:</strong> 4 kg 7 dkg = 407 dkg (nem 47 dkg, mert 1 kg = 100 dkg!).</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-emerald-700 dark:text-emerald-400">3. Szint Puskája: Vegyes Műveletek</div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div>• <strong>Közös mértékegység:</strong> Összeadás, kivonás előtt mindig váltsuk mindet azonos egységre!</div>
              <div>• <strong>Térfogat híd:</strong> 1 liter = 1 dm³ = 1000 cm³ = 1000 ml.</div>
              <div>• <strong>Hektoliter:</strong> 1 hl = 100 liter.</div>
              <div>• <strong>Tonnák és mázsák:</strong> 1 t = 10 q = 1000 kg.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
