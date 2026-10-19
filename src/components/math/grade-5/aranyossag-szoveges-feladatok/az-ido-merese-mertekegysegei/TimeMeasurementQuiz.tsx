import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { TimeMeasurementMatcher } from './TimeMeasurementMatcher';
import { TimeMeasurementSorter } from './TimeMeasurementSorter';

export interface TimeMeasurementQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const TIME_MEASUREMENT_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, ALAPEGYSÉG ÉS KÖZVETLEN VÁLTÓSZÁMOK (1-10)
  // =========================================================================
  {
    id: 'tq1-1',
    level: 1,
    prompt: 'Mi az idő mérésének hivatalos nemzetközi (SI) alapegysége?',
    options: [
      'Másodperc (s)',
      'Perc (min)',
      'Óra (h)',
      'Nap (d)'
    ],
    correctAnswer: 0,
    explanation: 'A nemzetközi mértékrendszerben (SI) az idő alapegysége a másodperc (szekundum, jele: s).',
    hint: 'Gondolj a stopperórára vagy a szívverés egyetlen ütemére!',
    breakdown: [
      { label: 'SI alapegység', value: 'Másodperc (s)' },
      { label: 'Latin neve', value: 'Secundum' }
    ]
  },
  {
    id: 'tq1-2',
    level: 1,
    prompt: 'Hány másodperc (s) tesz ki pontosan 1 percet (min)?',
    options: [
      '60 másodperc',
      '100 másodperc',
      '10 másodperc',
      '3600 másodperc'
    ],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc. Az időmérés nem tízes (decimális), hanem 60-as (szexagezimális) alapú!',
    hint: 'A percmutató 60 másodperc alatt lép egyet előre.',
    figure: (
      <svg className="w-48 h-20 mx-auto" viewBox="0 0 200 80">
        <rect x="10" y="15" width="70" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="45" y="45" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">1 min</text>
        <path d="M 90 40 L 115 40" stroke="#3b82f6" strokeWidth="2" />
        <text x="102" y="32" textAnchor="middle" fontSize="9" fill="#2563eb">· 60</text>
        <rect x="125" y="15" width="70" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="160" y="45" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">60 s</text>
      </svg>
    )
  },
  {
    id: 'tq1-3',
    level: 1,
    prompt: 'Hány perc (min) felel meg 1 órának (h)?',
    options: [
      '60 perc',
      '100 perc',
      '24 perc',
      '120 perc'
    ],
    correctAnswer: 0,
    explanation: '1 óra (1 h) pontosan 60 perc. Ez az óra számlapján a nagymutató egy teljes körbefordulása.',
    hint: 'Gondolj arra, hogy a tanóra 45 perc, ami kevesebb mint egy egész óra!',
    breakdown: [
      { label: 'Váltószám', value: '1 h = 60 min' }
    ]
  },
  {
    id: 'tq1-4',
    level: 1,
    prompt: 'Hány órából áll egy teljes naptári nap (d)?',
    options: [
      '24 óra',
      '12 óra',
      '60 óra',
      '48 óra'
    ],
    correctAnswer: 0,
    explanation: 'Egy nap pontosan 24 órából áll: ennyi idő alatt fordul meg a Föld egyszer a saját tengelye körül.',
    hint: 'A nap 0:00-tól 24:00-ig tart, két 12 órás ciklusból áll.',
    breakdown: [
      { label: '1 nap', value: '24 óra' }
    ]
  },
  {
    id: 'tq1-5',
    level: 1,
    prompt: 'Hány másodperc van 1 egész órában?',
    options: [
      '3600 másodperc',
      '600 másodperc',
      '60 másodperc',
      '360 másodperc'
    ],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc, és minden perc 60 másodperc. Így: 60 · 60 = 3600 másodperc!',
    hint: 'Szorozd össze a két váltószámot: 60 · 60 = ?',
    breakdown: [
      { label: 'Számolás', value: '60 perc · 60 s = 3600 s' }
    ]
  },
  {
    id: 'tq1-6',
    level: 1,
    prompt: 'Hány napból áll egy szökőév, és hány napos ilyenkor a február?',
    options: [
      '366 napból áll, és a február 29 napos',
      '365 napból áll, és a február 28 napos',
      '366 napból áll, és a február 30 napos',
      '364 napból áll, és a február 27 napos'
    ],
    correctAnswer: 0,
    explanation: 'Egy normál év 365 napos, szökőévben azonban a február 29 napos, így az év teljes hossza 366 nap.',
    hint: 'A Föld valójában kb. 365 nap és 6 óra alatt kerüli meg a Napot, a 4 évente felgyűlő 4 · 6 = 24 óra ad ki egy extra napot.',
    breakdown: [
      { label: 'Normál év', value: '365 nap (febr: 28 nap)' },
      { label: 'Szökőév', value: '366 nap (febr: 29 nap)' }
    ]
  },
  {
    id: 'tq1-7',
    level: 1,
    prompt: 'Hány órából áll pontosan egy teljes hét (7 nap)?',
    options: [
      '168 óra',
      '144 óra',
      '120 óra',
      '180 óra'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 nap = 24 óra, a hét 7 napjának összes órája: 7 · 24 = 168 óra.',
    hint: 'Szorozd meg a napok számát 24-gyel: 7 · 20 = 140, 7 · 4 = 28, 140 + 28 = ?',
    breakdown: [
      { label: 'Számítás', value: '7 nap · 24 óra = 168 óra' }
    ]
  },
  {
    id: 'tq1-8',
    level: 1,
    prompt: 'Egy analóg órán melyik mutató mit jelez?',
    options: [
      'A rövidebb (vastagabb) az órát, a hosszabb a percet mutatja',
      'A hosszabb az órát, a rövidebb a másodpercet mutatja',
      'A rövidebb a percet, a hosszabb az órát mutatja',
      'Mindkét mutató mindig ugyanazt az értéket jelzi'
    ],
    correctAnswer: 0,
    explanation: 'A számlapon a kis (rövidebb) mutató jelzi az órákat (lassan halad), a nagy (hosszabb) mutató jelzi a perceket.',
    hint: 'A percek gyorsabban változnak, hosszabb mutatóval pontosan leolvashatók az 1 perces beosztások.'
  },
  {
    id: 'tq1-9',
    level: 1,
    prompt: 'Hogyan írjuk le a délután 4 órát a 24 órás digitális formátumban?',
    options: [
      '16:00',
      '14:00',
      '04:00',
      '18:00'
    ],
    correctAnswer: 0,
    explanation: 'Dél (12:00) után hozzáadunk 12 órát: 4 + 12 = 16:00. A 04:00 a hajnali 4 órát jelentené.',
    hint: 'Délutáni időpontokhoz adj 12-t!',
    breakdown: [
      { label: 'Számítás', value: '4 óra + 12 óra = 16:00' }
    ]
  },
  {
    id: 'tq1-10',
    level: 1,
    prompt: 'Hány naptári hónapból áll egy év, és hány évszak váltja egymást?',
    options: [
      '12 hónap és 4 évszak',
      '10 hónap és 4 évszak',
      '12 hónap és 2 évszak',
      '24 hónap és 6 évszak'
    ],
    correctAnswer: 0,
    explanation: 'Egy naptári év 12 hónapból áll (januártól decemberig), és 4 évszak váltja egymást: tavasz, nyár, ősz, tél.',
    hint: 'Minden évszak kb. 3 hónapig tart: 4 · 3 = 12 hónap.'
  },

  // =========================================================================
  // 2. SZINT: TÖRT ÓRÁK, ÁTVÁLTÁSOK ÉS ÖSSZEHASONLÍTÁSOK (11-20)
  // =========================================================================
  {
    id: 'tq2-1',
    level: 2,
    prompt: 'Hány perc a fél óra és a negyed óra?',
    options: [
      'Fél óra = 30 perc, negyed óra = 15 perc',
      'Fél óra = 50 perc, negyed óra = 25 perc',
      'Fél óra = 30 perc, negyed óra = 20 perc',
      'Fél óra = 25 perc, negyed óra = 10 perc'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 óra = 60 perc: a fél óra fele 60-nak, azaz 30 perc; a negyed óra a negyede 60-nak, azaz 60 : 4 = 15 perc.',
    hint: 'Oszd el a 60-at 2-vel, illetve 4-gyel!',
    breakdown: [
      { label: 'Fél óra', value: '60 : 2 = 30 min' },
      { label: 'Negyed óra', value: '60 : 4 = 15 min' }
    ]
  },
  {
    id: 'tq2-2',
    level: 2,
    prompt: 'Hány percnek felel meg a háromnegyed óra?',
    options: [
      '45 perc',
      '75 perc',
      '35 perc',
      '40 perc'
    ],
    correctAnswer: 0,
    explanation: 'A háromnegyed óra három darab negyed óra: 3 · 15 perc = 45 perc (vagy egy egész óra mínusz 15 perc: 60 - 15 = 45 perc).',
    hint: '3 · 15 perc = ?',
    breakdown: [
      { label: 'Számítás', value: '3 · 15 min = 45 min' }
    ]
  },
  {
    id: 'tq2-3',
    level: 2,
    prompt: 'Hány perc van 2 és fél órában?',
    options: [
      '150 perc',
      '125 perc',
      '130 perc',
      '250 perc'
    ],
    correctAnswer: 0,
    explanation: '2 egész óra = 2 · 60 = 120 perc. Ehhez hozzáadjuk a fél órát (30 perc): 120 + 30 = 150 perc.',
    hint: 'Számold ki külön a 2 órát és a fél órát, majd add össze őket!',
    breakdown: [
      { label: '2 óra', value: '120 min' },
      { label: 'fél óra', value: '30 min' },
      { label: 'Összesen', value: '150 min' }
    ]
  },
  {
    id: 'tq2-4',
    level: 2,
    prompt: 'Hány óra és hány perc 135 perc?',
    options: [
      '2 óra 15 perc',
      '1 óra 35 perc',
      '2 óra 35 perc',
      '1 óra 75 perc'
    ],
    correctAnswer: 0,
    explanation: '135-ben a 60 megvan 2-szer (2 · 60 = 120 perc), és a maradék 135 - 120 = 15 perc. Tehát 2 óra 15 perc (2 és negyed óra).',
    hint: 'Keressük meg, hányszor fér bele a 60 a 135-be!',
    breakdown: [
      { label: '135 : 60', value: '2 óra, maradék 15 perc' }
    ]
  },
  {
    id: 'tq2-5',
    level: 2,
    prompt: 'Hány másodperc (s) 3 perc 20 másodperc?',
    options: [
      '200 másodperc',
      '320 másodperc',
      '180 másodperc',
      '220 másodperc'
    ],
    correctAnswer: 0,
    explanation: '3 perc = 3 · 60 = 180 másodperc. Ehhez hozzáadjuk a 20 másodpercet: 180 + 20 = 200 másodperc.',
    hint: '3 · 60 s = 180 s, plusz a maradék 20 s.',
    breakdown: [
      { label: '3 perc', value: '180 s' },
      { label: '+ 20 s', value: '200 s' }
    ]
  },
  {
    id: 'tq2-6',
    level: 2,
    prompt: 'Hány perc és másodperc 250 másodperc?',
    options: [
      '4 perc 10 másodperc',
      '2 perc 50 másodperc',
      '4 perc 50 másodperc',
      '3 perc 70 másodperc'
    ],
    correctAnswer: 0,
    explanation: '250 : 60 = 4, mert 4 · 60 = 240 másodperc. A maradék: 250 - 240 = 10 másodperc. Tehát 4 perc 10 másodperc.',
    hint: 'Hányszor 60 fér bele 250-be? 4 · 60 = 240.',
    breakdown: [
      { label: '250 : 60', value: '4 perc, maradék 10 másodperc' }
    ]
  },
  {
    id: 'tq2-7',
    level: 2,
    prompt: 'Hány órából áll másfél (1,5) nap?',
    options: [
      '36 óra',
      '30 óra',
      '28 óra',
      '48 óra'
    ],
    correctAnswer: 0,
    explanation: '1 nap = 24 óra. Fél nap = 12 óra. 24 + 12 = 36 óra.',
    hint: '24 óra + 12 óra = ?',
    breakdown: [
      { label: '1 nap', value: '24 óra' },
      { label: 'Fél nap', value: '12 óra' },
      { label: 'Összeg', value: '36 óra' }
    ]
  },
  {
    id: 'tq2-8',
    level: 2,
    prompt: 'Melyik a több: 1 óra 15 perc vagy 80 perc?',
    options: [
      'A 80 perc a több (5 perccel)',
      'Az 1 óra 15 perc a több (35 perccel)',
      'Pontosan egyenlőek',
      'Nem lehet összehasonlítani őket'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk percre: 1 óra 15 perc = 60 + 15 = 75 perc. Mivel 75 perc < 80 perc, ezért a 80 perc a több 5 perccel.',
    hint: 'Mindig váltsd közös mértékegységre (percre)!',
    breakdown: [
      { label: '1 óra 15 perc', value: '75 perc' },
      { label: 'Összehasonlítás', value: '75 min < 80 min' }
    ]
  },
  {
    id: 'tq2-9',
    level: 2,
    prompt: 'Melyik a leghosszabb időtartam az alábbiak közül?',
    options: [
      '100 perc',
      'Másfél óra (1,5 h)',
      '5000 másodperc',
      '1 óra 20 perc'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk mindet percre:\n• 100 perc = 100 perc\n• Másfél óra = 90 perc\n• 5000 s = 5000 : 60 ≈ 83,3 perc\n• 1 óra 20 perc = 80 perc\nA leghosszabb tehát a 100 perc!',
    hint: '1,5 óra = 90 perc, 5000 s = 83 perc és 20 s.',
    breakdown: [
      { label: '100 perc', value: '100 min' },
      { label: '1,5 óra', value: '90 min' },
      { label: '5000 s', value: 'kb. 83,3 min' }
    ]
  },
  {
    id: 'tq2-10',
    level: 2,
    prompt: 'Ha a nagy mutatónk a számlapon 20 percet halad előre, hány fokkal fordult el?',
    options: [
      '120 fokkal',
      '60 fokkal',
      '90 fokkal',
      '180 fokkal'
    ],
    correctAnswer: 0,
    explanation: 'A számlap egy teljes köre 360 fok és 60 perc. Ezért 1 perc alatt 360 : 60 = 6 fokot fordul el a percmutató. 20 perc alatt: 20 · 6 = 120 fokkal fordul el (egyharmad kör).',
    hint: 'Egy teljes kör 360 fok, a 20 perc a 60 percnek pontosan az egyharmada: 360 : 3 = ?',
    breakdown: [
      { label: 'Percenként', value: '6 fok' },
      { label: '20 perc alatt', value: '20 · 6 = 120 fok' }
    ]
  },

  // =========================================================================
  // 3. SZINT: MENETIDŐK, IDŐTARTAMOK, NAPTÁRI ÉS SZÖVEGES FELADATOK (21-30)
  // =========================================================================
  {
    id: 'tq3-1',
    level: 3,
    prompt: 'A vonat 14:35-kor indult és 16:15-kor érkezett meg az állomásra. Mennyi volt a teljes menetidő?',
    options: [
      '1 óra 40 perc (100 perc)',
      '1 óra 20 perc',
      '2 óra 20 perc',
      '1 óra 50 perc'
    ],
    correctAnswer: 0,
    explanation: 'Lépésenként számolunk kerek órára váltással:\n1) 14:35-től 15:00-ig: 25 perc\n2) 15:00-tól 16:15-ig: 1 óra 15 perc\n3) Összesen: 1 óra + (25 + 15 perc) = 1 óra 40 perc (100 perc).',
    hint: 'Egészítsd ki előbb a következő egész órára (15:00-ra)!',
    breakdown: [
      { label: '14:35 -> 15:00', value: '25 perc' },
      { label: '15:00 -> 16:15', value: '1 h 15 min' },
      { label: 'Összesen', value: '1 h 40 min = 100 min' }
    ]
  },
  {
    id: 'tq3-2',
    level: 3,
    prompt: 'Egy családi film 18:45-kor kezdődik és 110 percig tart reklámszünet nélkül. Hány órakor fejeződik be a film?',
    options: [
      '20:35',
      '20:45',
      '19:55',
      '21:15'
    ],
    correctAnswer: 0,
    explanation: '110 perc = 1 óra 50 perc.\n18:45 + 1 óra = 19:45.\n19:45-höz még 50 percet kell adni: 15 perc a 20:00-ig, és marad 35 perc -> 20:35.',
    hint: 'Váltsd a 110 percet órára és percre: 110 = 60 + 50 perc.',
    breakdown: [
      { label: '110 perc', value: '1 óra 50 perc' },
      { label: '18:45 + 1 h 50 min', value: '20:35' }
    ]
  },
  {
    id: 'tq3-3',
    level: 3,
    prompt: 'Anna reggel 7:25-kor indult el otthonról, és 25 percet sétált az iskoláig. Hány órakor érkezett meg az iskolába?',
    options: [
      '7:50',
      '7:45',
      '8:00',
      '7:55'
    ],
    correctAnswer: 0,
    explanation: '7 óra 25 perc + 25 perc = 7 óra 50 perc (tíz perccel a 8 órai csengetés előtt).',
    hint: '25 + 25 = 50 perc, az óra nem változik.',
    breakdown: [
      { label: 'Indulás', value: '7:25' },
      { label: 'Séta', value: '25 min' },
      { label: 'Érkezés', value: '7:50' }
    ]
  },
  {
    id: 'tq3-4',
    level: 3,
    prompt: 'Péter naponta 45 percet gyakorol gitározni. Hány percet gyakorol összesen egy hét (7 nap) alatt, és ez mennyi órában kifejezve?',
    options: [
      '315 perc = 5 óra 15 perc',
      '315 perc = 4 óra 45 perc',
      '270 perc = 4 óra 30 perc',
      '350 perc = 5 óra 50 perc'
    ],
    correctAnswer: 0,
    explanation: '7 · 45 = 315 perc. 315 : 60 = 5, maradék 15 perc (mivel 5 · 60 = 300 perc). Tehát 5 óra 15 perc.',
    hint: '7 · 40 = 280, 7 · 5 = 35 -> 280 + 35 = 315 perc. 300 perc = 5 óra.',
    breakdown: [
      { label: '7 · 45 min', value: '315 perc' },
      { label: 'Órára váltva', value: '5 óra 15 perc' }
    ]
  },
  {
    id: 'tq3-5',
    level: 3,
    prompt: 'Melyik két egymást követő naptári hónap 31 napos a nyáron?',
    options: [
      'Július és Augusztus',
      'Június és Július',
      'Augusztus és Szeptember',
      'Május és Június'
    ],
    correctAnswer: 0,
    explanation: 'A naptárban Július és Augusztus egymás után következő 31 napos hónapok! A bütyökszabály szerint az első kézfej utolsó bütyke (július) és a második kézfej első bütyke (augusztus) találkozik.',
    hint: 'A két legmelegebb nyári szünidei hónapról van szó.',
    breakdown: [
      { label: 'Július', value: '31 nap' },
      { label: 'Augusztus', value: '31 nap' }
    ]
  },
  {
    id: 'tq3-6',
    level: 3,
    prompt: 'Egy maratonfutó 2 óra 48 perc alatt ért célba, futótársa pedig 175 perc alatt futotta le a távot. Melyikük volt a gyorsabb és hány perccel?',
    options: [
      'Az első futó volt a gyorsabb 7 perccel',
      'A futótárs volt a gyorsabb 5 perccel',
      'Az első futó volt a gyorsabb 13 perccel',
      'Egyszerre értek célba'
    ],
    correctAnswer: 0,
    explanation: 'Váltsuk percre az első futó idejét: 2 óra 48 perc = 2 · 60 + 48 = 120 + 48 = 168 perc.\nA második futó ideje 175 perc.\nMivel a futásban a kevesebb idő a gyorsabb: 175 - 168 = 7 perc előnnyel az első futó volt a gyorsabb.',
    hint: 'Számold ki az első futó idejét percekben: 2 · 60 + 48 = ?',
    breakdown: [
      { label: '1. futó', value: '168 perc' },
      { label: '2. futó', value: '175 perc' },
      { label: 'Különbség', value: '7 perccel gyorsabb az 1.' }
    ]
  },
  {
    id: 'tq3-7',
    level: 3,
    prompt: 'Egy gyári csomagológép pontosan 15 másodpercenként készít el egy dobozt. Hány dobozt készít el 1 óra (3600 másodperc) alatt folyamatos működéssel?',
    options: [
      '240 dobozt',
      '180 dobozt',
      '400 dobozt',
      '120 dobozt'
    ],
    correctAnswer: 0,
    explanation: '1 óra = 3600 másodperc. A készített dobozok száma: 3600 : 15 = 240 darab. (Vagy 1 percben 4 darab, mert 60 : 15 = 4; így 60 percben: 60 · 4 = 240 darab).',
    hint: 'Gondold át: 1 perc alatt hány darab készül el? 60 : 15 = 4 db.',
    breakdown: [
      { label: '1 perc alatt', value: '60 : 15 = 4 db' },
      { label: '60 perc (1 óra)', value: '60 · 4 = 240 db' }
    ]
  },
  {
    id: 'tq3-8',
    level: 3,
    prompt: 'Dóri este 21:40-kor aludt el és másnap reggel 6:55-kor ébredt fel. Mennyi ideig tartott az alvása?',
    options: [
      '9 óra 15 perc',
      '8 óra 45 perc',
      '9 óra 35 perc',
      '8 óra 15 perc'
    ],
    correctAnswer: 0,
    explanation: 'Bontsuk éjfélig és éjfél utánra:\n1) 21:40-től éjfélig (24:00): 2 óra 20 perc.\n2) Éjféltől 6:55-ig: 6 óra 55 perc.\n3) Összeadva: 2 h 20 min + 6 h 55 min = 8 h 75 min = 9 óra 15 perc (mivel 75 perc = 1 h 15 min).',
    hint: 'Számolj éjfélig, majd add hozzá a reggeli időt!',
    breakdown: [
      { label: 'Éjfélig', value: '2 óra 20 perc' },
      { label: 'Reggelig', value: '6 óra 55 perc' },
      { label: 'Összeg', value: '9 óra 15 perc' }
    ]
  },
  {
    id: 'tq3-9',
    level: 3,
    prompt: 'A menetrend szerinti helyi busz pontosan 20 percenként indul a végállomásról. Az első járat 6:10-kor indul. Mikor indul a negyedik járat?',
    options: [
      '7:10',
      '7:30',
      '6:50',
      '7:00'
    ],
    correctAnswer: 0,
    explanation: 'Írjuk fel a járatok indulási idejét sorban:\n• 1. járat: 6:10\n• 2. járat: 6:30 (+20 min)\n• 3. járat: 6:50 (+20 min)\n• 4. járat: 7:10 (+20 min, átlépve az órát).\n(Az 1. és 4. járat között 3 időköz telt el: 3 · 20 min = 60 perc = 1 óra. 6:10 + 1 óra = 7:10).',
    hint: 'A 4. járatig 3 darab 20 perces időköz telik el: 3 · 20 = 60 perc = 1 egész óra!',
    breakdown: [
      { label: '3 időköz', value: '3 · 20 min = 60 perc (1 óra)' },
      { label: '4. járat', value: '6:10 + 1 h = 7:10' }
    ]
  },
  {
    id: 'tq3-10',
    level: 3,
    prompt: 'Melyik állítás IGAZ az alábbiak közül a naptárral és az évszázadokkal kapcsolatban?',
    options: [
      'A 20. század 1901. január 1-től 2000. december 31-ig tartott',
      'A 20. század 1900. január 1-től 1999. december 31-ig tartott',
      'Egy évszázad mindig pontosan 36 500 napból áll, szökőnapok nélkül',
      'Minden 100-zal osztható év automatikusan szökőév is'
    ],
    correctAnswer: 0,
    explanation: 'Mivel nincs 0. év (az 1. évszázad 1-től 100-ig tartott), a 20. század 1901. január 1-jén kezdődött és 2000. december 31-én fejeződött be. A 21. század pedig 2001. január 1-jén kezdődött.',
    hint: 'Gondolj arra, hogy az első évszázad az 1. évvel indult és a 100. év végén ért véget.',
    breakdown: [
      { label: '20. század', value: '1901. jan. 1. – 2000. dec. 31.' },
      { label: '21. század', value: '2001. jan. 1. – 2100. dec. 31.' }
    ]
  }
];

export const TimeMeasurementQuiz: React.FC<TimeMeasurementQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Az idő mérése és mértékegységei kvíz"
      subtitle="30 feladat 3 szinten: időegységek (s, min, h, nap), átváltások, digitális/analóg óra, menetidők és naptár"
      questions={TIME_MEASUREMENT_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-time-measurement-quiz"
      storageKey="g5-time-measurement-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <TimeMeasurementMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <TimeMeasurementSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-sky-700 dark:text-sky-400">1. Szint Puskája: Alapok és Váltószámok</div>
            <div className="p-2 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
              <div>• <strong>SI alapegység:</strong> Másodperc (s).</div>
              <div>• <strong>Perc és Óra:</strong> 1 min = 60 s, 1 h = 60 min = 3600 s.</div>
              <div>• <strong>Nap és Hét:</strong> 1 nap = 24 h = 1440 min, 1 hét = 7 nap = 168 h.</div>
              <div>• <strong>Év:</strong> Normál év = 365 nap, szökőév = 366 nap (február 29 napos).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-sky-700 dark:text-sky-400">2. Szint Puskája: Tört Órák és Átváltási Trükkök</div>
            <div className="p-2 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
              <div>• <strong>Fél óra:</strong> 30 perc = 1800 s.</div>
              <div>• <strong>Negyed óra:</strong> 15 perc = 900 s.</div>
              <div>• <strong>Háromnegyed óra:</strong> 45 perc = 2700 s.</div>
              <div>• <strong>Maradékos osztás 60-nal:</strong> pl. 135 min : 60 = 2 h, marad 15 min.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-sky-700 dark:text-sky-400">3. Szint Puskája: Menetidők és Naptár</div>
            <div className="p-2 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
              <div>• <strong>Kerek órára váltás:</strong> Számolj előbb a következő egész óráig, majd add hozzá a maradékot!</div>
              <div>• <strong>Éjféli átlépés:</strong> Számolj 24:00-ig, majd add hozzá a 0:00 utáni perceket!</div>
              <div>• <strong>Bütyökszabály:</strong> Jan, Márc, Máj, Júl, Aug, Okt, Dec = 31 naposak.</div>
              <div>• <strong>Gödrök:</strong> Ápr, Jún, Szept, Nov = 30 naposak. Febr = 28/29 nap.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
