import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { DirectProportionMatcher } from './DirectProportionMatcher';
import { DirectProportionSorter } from './DirectProportionSorter';

export interface DirectProportionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const DIRECT_PROPORTION_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPVETŐ ARÁNYPÁROK, EGYSÉGÁR ÉS KÖZVETLEN FELISMERÉS (1-10)
  // =========================================================================
  {
    id: 'dp1-1',
    level: 1,
    prompt: 'Mikor mondjuk két összetartozó mennyiségről, hogy egyenesen arányosak?',
    options: [
      'Ha az egyik valahányszorosára változik, a másik pontosan ugyanannyiszorosára változik',
      'Ha az egyik duplájára nő, a másik pontosan a felére csökken',
      'Ha mindkét mennyiség összege mindig ugyanaz a szám',
      'Ha mindkét adat minden nap eggyel növekszik'
    ],
    correctAnswer: 0,
    explanation: 'Az egyenes arányosság definíciója: ha az egyik mennyiség valahányszorosára (pl. 2-szeresére, 3-szorosára, felére) nő vagy csökken, a hozzá tartozó másik mennyiség is PONTOSAN ugyanannyiszorosára változik.',
    hint: 'A változás iránya és mértéke (szorzója) teljesen azonos.',
    breakdown: [
      { label: 'Definíció', value: 'y / x = k (állandó hányados)' }
    ]
  },
  {
    id: 'dp1-2',
    level: 1,
    prompt: 'Ha a piacon 3 kg alma 1350 Ft-ba kerül, mennyibe kerül 1 kg alma (egységár)?',
    options: [
      '450 Ft',
      '400 Ft',
      '500 Ft',
      '350 Ft'
    ],
    correctAnswer: 0,
    explanation: 'A teljes árat elosztjuk a kilogrammok számával: 1350 : 3 = 450 Ft/kg.',
    hint: '1350 : 3 = ? (1200 : 3 = 400, 150 : 3 = 50).',
    breakdown: [
      { label: 'Számítás', value: '1350 Ft : 3 kg = 450 Ft/kg' }
    ]
  },
  {
    id: 'dp1-3',
    level: 1,
    prompt: 'Tudjuk, hogy 1 kg alma ára 450 Ft. Mennyit kell fizetnünk 6 kg almáért?',
    options: [
      '2700 Ft',
      '2400 Ft',
      '2900 Ft',
      '2500 Ft'
    ],
    correctAnswer: 0,
    explanation: 'A darabszámot (kilogrammot) megszorozzuk az egységárral: 6 · 450 = 2700 Ft.',
    hint: '6 · 400 = 2400; 6 · 50 = 300 -> 2400 + 300 = ?',
    breakdown: [
      { label: 'Számítás', value: '6 kg · 450 Ft = 2700 Ft' }
    ]
  },
  {
    id: 'dp1-4',
    level: 1,
    prompt: 'Hogyan nevezzük az egyenesen arányos mennyiségek állandó hányadosát (y : x)?',
    options: [
      'Arányossági tényező (vagy egységár, fajlagos érték)',
      'Arányossági különbség',
      'Közös osztó',
      'Maradék'
    ],
    correctAnswer: 0,
    explanation: 'Az y : x hányadost arányossági tényezőnek nevezzük (jele: k). A mindennapokban ez gyakran az egységár (Ft/db, Ft/kg) vagy a sebesség (km/h).',
    hint: 'Ez az 1 egységre jutó állandó szorzószám.',
    breakdown: [
      { label: 'Hányados', value: 'k = y / x' }
    ]
  },
  {
    id: 'dp1-5',
    level: 1,
    prompt: 'Milyen alakú az egyenes arányosság grafikonja a derékszögű koordináta-rendszerben ábrázolva?',
    options: [
      'Az origóból (0; 0) kiinduló félegyenes',
      'Egy tetszőleges görbe vonal',
      'Egy vízszintes egyenes',
      'Egy lefelé hajló parabola'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 0 mennyiséghez pontosan 0 érték tartozik (0 kg = 0 Ft), és az adatok hányadosa állandó, a pontok egy origóból (0; 0) induló egyenes vonalra (félegyenesre) esnek.',
    hint: 'Gondolj arra: 0 vásárolt termékért 0 Ft-ot fizetünk!',
    figure: (
      <svg className="w-44 h-24 mx-auto" viewBox="0 0 160 90">
        <line x1="20" y1="75" x2="145" y2="75" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="20" y1="75" x2="20" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="20" y1="75" x2="140" y2="20" stroke="#8b5cf6" strokeWidth="2.5" />
        <circle cx="20" cy="75" r="3.5" fill="#6d28d9" />
        <text x="12" y="85" fontSize="8" fill="#64748b">(0;0)</text>
        <circle cx="80" cy="47" r="3" fill="#8b5cf6" />
        <circle cx="120" cy="29" r="3" fill="#10b981" />
      </svg>
    )
  },
  {
    id: 'dp1-6',
    level: 1,
    prompt: 'Egy kerékpáros 2 óra alatt 36 km-t tesz meg egyenletes sebességgel. Hány km-t tesz meg 1 óra alatt?',
    options: [
      '18 km-t',
      '20 km-t',
      '16 km-t',
      '72 km-t'
    ],
    correctAnswer: 0,
    explanation: 'A sebesség az út és az idő hányadosa: 36 km : 2 h = 18 km/h. Tehát 1 óra alatt 18 km-t tesz meg.',
    hint: '36 : 2 = ?',
    breakdown: [
      { label: 'Számítás', value: '36 km : 2 h = 18 km/h' }
    ]
  },
  {
    id: 'dp1-7',
    level: 1,
    prompt: 'Egy automata gép 4 perc alatt 28 alkatrészt készít el. Hány alkatrészt készít el 1 perc alatt?',
    options: [
      '7 alkatrészt',
      '6 alkatrészt',
      '8 alkatrészt',
      '14 alkatrészt'
    ],
    correctAnswer: 0,
    explanation: '28 alkatrész : 4 perc = 7 alkatrész percenként.',
    hint: '28 : 4 = ?',
    breakdown: [
      { label: 'Számítás', value: '28 : 4 = 7 db/perc' }
    ]
  },
  {
    id: 'dp1-8',
    level: 1,
    prompt: 'Ha 5 doboz prémium gyümölcslé 2000 Ft-ba kerül, mennyit fizetünk 10 dobozért ugyanebből?',
    options: [
      '4000 Ft-ot (pontosan a dupláját)',
      '3000 Ft-ot',
      '5000 Ft-ot',
      '2500 Ft-ot'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 10 doboz pontosan a duplája (2-szerese) az 5 doboznak, az ár is a duplájára nő: 2 · 2000 Ft = 4000 Ft.',
    hint: 'A dobozok száma a 2-szeresére nőtt, így az ár is a 2-szeresére nő.',
    breakdown: [
      { label: 'Darabszám', value: '5 -> 10 (duplája)' },
      { label: 'Fizetendő', value: '2 · 2000 = 4000 Ft' }
    ]
  },
  {
    id: 'dp1-9',
    level: 1,
    prompt: 'Igaz vagy hamis az alábbi állítás: „Ha 0 kg banánt veszünk a boltban, 0 Ft-ot kell fizetnünk, ezért az egyenes arányosság grafikonja a (0; 0) origóból indul.”',
    options: [
      'IGAZ',
      'HAMIS, mert a boltban mindig van 500 Ft alapdíj',
      'HAMIS, a grafikon mindig az 1-es értéktől indul',
      'Csak vasárnap igaz'
    ],
    correctAnswer: 0,
    explanation: 'IGAZ! Az egyenes arányosság egyik legfőbb ismérve, hogy nulla mennyiséghez nulla érték tartozik, ezért a grafikon mindig áthalad a (0; 0) ponton.',
    hint: 'Ha nem veszel semmit, nem fizetsz semmit!'
  },
  {
    id: 'dp1-10',
    level: 1,
    prompt: 'Egy egyenes arányossági táblázatban x = 2 esetén y = 14. Mennyi az y értéke, ha x = 1?',
    options: [
      '7',
      '12',
      '28',
      '6'
    ],
    correctAnswer: 0,
    explanation: 'Az arányossági tényező: k = y : x = 14 : 2 = 7. Így x = 1 esetén y = 1 · 7 = 7.',
    hint: '14 : 2 = ?',
    breakdown: [
      { label: 'Hányados', value: '14 : 2 = 7' },
      { label: 'y (x = 1)', value: '1 · 7 = 7' }
    ]
  },

  // =========================================================================
  // 2. SZINT: HÁRMASSZABÁLY LÉPÉSEI ÉS TÁBLÁZATOK (11-20)
  // =========================================================================
  {
    id: 'dp2-1',
    level: 2,
    prompt: '4 kg édes körte ára 1800 Ft. Mennyibe kerül 7 kg ugyanolyan körte?',
    options: [
      '3150 Ft',
      '2800 Ft',
      '3500 Ft',
      '3000 Ft'
    ],
    correctAnswer: 0,
    explanation: 'A hármasszabály 2 lépése:\n1) 1 kg körte ára: 1800 : 4 = 450 Ft.\n2) 7 kg körte ára: 7 · 450 = 3150 Ft.',
    hint: '1800 : 4 = 450 Ft; 7 · 450 = ?',
    breakdown: [
      { label: '1 kg ára', value: '1800 : 4 = 450 Ft' },
      { label: '7 kg ára', value: '7 · 450 = 3150 Ft' }
    ]
  },
  {
    id: 'dp2-2',
    level: 2,
    prompt: 'Egy személygépkocsi 3 óra alatt 270 km-t tett meg egyenletes sebességgel. Hány kilométert tesz meg 5 óra alatt?',
    options: [
      '450 km-t',
      '420 km-t',
      '500 km-t',
      '360 km-t'
    ],
    correctAnswer: 0,
    explanation: '1) 1 óra alatt megtett út: 270 : 3 = 90 km (sebesség = 90 km/h).\n2) 5 óra alatt: 5 · 90 = 450 km.',
    hint: '270 : 3 = 90; 5 · 90 = ?',
    breakdown: [
      { label: '1 óra alatt', value: '270 : 3 = 90 km' },
      { label: '5 óra alatt', value: '5 · 90 = 450 km' }
    ]
  },
  {
    id: 'dp2-3',
    level: 2,
    prompt: 'Egy recept szerint 6 darab palacsintához 15 dkg liszt szükséges. Mennyi lisztre van szükség 14 darab palacsinta sütéséhez?',
    options: [
      '35 dkg',
      '30 dkg',
      '40 dkg',
      '28 dkg'
    ],
    correctAnswer: 0,
    explanation: '1) 1 palacsintához kell: 15 : 6 = 2,5 dkg liszt.\n2) 14 palacsintához kell: 14 · 2,5 = 35 dkg liszt.',
    hint: '15 : 6 = 2,5 dkg/db; 14 · 2,5 = ?',
    breakdown: [
      { label: '1 db-hoz', value: '15 : 6 = 2,5 dkg' },
      { label: '14 db-hoz', value: '14 · 2,5 = 35 dkg' }
    ]
  },
  {
    id: 'dp2-4',
    level: 2,
    prompt: '5 darab egyforma füzetért 1750 Ft-ot fizettünk. Hány ilyen füzetet tudunk vásárolni pontosan 2800 Ft-ból?',
    options: [
      '8 füzetet',
      '7 füzetet',
      '9 füzetet',
      '6 füzetet'
    ],
    correctAnswer: 0,
    explanation: '1) 1 füzet ára: 1750 : 5 = 350 Ft.\n2) 2800 Ft-ból vásárolható füzetek száma: 2800 : 350 = 8 darab.',
    hint: 'Számold ki 1 füzet árát (350 Ft), majd oszd el a 2800-at 350-nel!',
    breakdown: [
      { label: '1 füzet', value: '1750 : 5 = 350 Ft' },
      { label: 'Darabszám', value: '2800 : 350 = 8 db' }
    ]
  },
  {
    id: 'dp2-5',
    level: 2,
    prompt: '8 liter benzinért 4800 Ft-ot fizettünk a benzinkúton. Mennyibe kerül 15 liter benzin?',
    options: [
      '9000 Ft',
      '8500 Ft',
      '9600 Ft',
      '7500 Ft'
    ],
    correctAnswer: 0,
    explanation: '1) 1 liter benzin ára: 4800 : 8 = 600 Ft.\n2) 15 liter ára: 15 · 600 = 9000 Ft.',
    hint: '4800 : 8 = 600 Ft; 15 · 600 = ?',
    breakdown: [
      { label: '1 liter ára', value: '4800 : 8 = 600 Ft' },
      { label: '15 liter ára', value: '15 · 600 = 9000 Ft' }
    ]
  },
  {
    id: 'dp2-6',
    level: 2,
    prompt: 'Melyik kapcsolat NEM egyenes arányosság az alábbiak közül?',
    options: [
      'A taxi viteldíja 1000 Ft alapdíjjal + 400 Ft kilométerenként',
      'A megvásárolt alma tömege és a fizetendő összeg',
      'A szabályos négyzet oldala és a kerülete',
      'A gyaloglás ideje és a megtett út egyenletes tempó mellett'
    ],
    correctAnswer: 0,
    explanation: 'A taxi viteldíja nem egyenes arányosság, mert az 1000 Ft-os alapdíj miatt 0 km utazásért is 1000 Ft-ot kell fizetni (nem origóból indul), és a megtett km duplázódásakor a díj nem duplázódik.',
    hint: 'Keresd azt a helyzetet, ahol fix alapdíj vagy felár van!',
    breakdown: [
      { label: 'Taxi díj', value: 'Nem origóból indul (alapdíj van)' }
    ]
  },
  {
    id: 'dp2-7',
    level: 2,
    prompt: 'Egy szövőgép 6 óra alatt 150 méter textilt sző meg egyenletes munkával. Hány métert sző meg 9 óra alatt?',
    options: [
      '225 métert',
      '200 métert',
      '250 métert',
      '210 métert'
    ],
    correctAnswer: 0,
    explanation: '1) 1 óra alatt: 150 : 6 = 25 méter.\n2) 9 óra alatt: 9 · 25 = 225 méter (vagy a 9 óra a 6 óra 1,5-szerese: 1,5 · 150 = 225 m).',
    hint: '150 : 6 = 25 m/óra; 9 · 25 = ?',
    breakdown: [
      { label: '1 óra alatt', value: '150 : 6 = 25 m' },
      { label: '9 óra alatt', value: '9 · 25 = 225 m' }
    ]
  },
  {
    id: 'dp2-8',
    level: 2,
    prompt: 'Egy térképen 2 cm távolság a valóságban 15 km-nek felel meg. Mekkora a valós távolság két város között, ha a térképen 6 cm a távolságuk?',
    options: [
      '45 km',
      '30 km',
      '60 km',
      '40 km'
    ],
    correctAnswer: 0,
    explanation: 'A térképi távolság a 3-szorosára nőtt (2 cm-ről 6 cm-re, mert 6 : 2 = 3). Mivel a méretarány egyenesen arányos, a valós távolság is a 3-szorosára nő: 3 · 15 km = 45 km.',
    hint: '6 cm a 2 cm-nek a 3-szorosa, így a valós távolság is a 3-szorosa: 3 · 15 = ?',
    breakdown: [
      { label: 'Térképi növekedés', value: '3-szoros (6 : 2 = 3)' },
      { label: 'Valós távolság', value: '3 · 15 = 45 km' }
    ]
  },
  {
    id: 'dp2-9',
    level: 2,
    prompt: 'Egy irodai fénymásoló 45 másodperc alatt készít el 30 darab másolatot. Hány másodpercre van szüksége 50 darab másolat elkészítéséhez?',
    options: [
      '75 másodpercre (1 perc 15 s)',
      '60 másodpercre',
      '90 másodpercre',
      '70 másodpercre'
    ],
    correctAnswer: 0,
    explanation: '1) 1 másolat ideje: 45 másodperc : 30 db = 1,5 másodperc/másolat.\n2) 50 másolathoz: 50 · 1,5 másodperc = 75 másodperc (1 perc 15 s).',
    hint: '45 : 30 = 1,5 s; 50 · 1,5 = ?',
    breakdown: [
      { label: '1 db ideje', value: '45 : 30 = 1,5 s' },
      { label: '50 db ideje', value: '50 · 1,5 = 75 s' }
    ]
  },
  {
    id: 'dp2-10',
    level: 2,
    prompt: 'Egy egyenes arányossági táblázat összetartozó párjai: (3; 18), (5; 30), (8; 48). Milyen y érték tartozik az x = 12 számhoz?',
    options: [
      '72',
      '60',
      '84',
      '68'
    ],
    correctAnswer: 0,
    explanation: 'A hányados: 18 : 3 = 6, 30 : 5 = 6, 48 : 8 = 6. Tehát a szabály: y = 6 · x. Ha x = 12, akkor y = 6 · 12 = 72.',
    hint: 'Az arányossági szorzó 6. Mennyi 6 · 12?',
    breakdown: [
      { label: 'Szorzó (k)', value: '6' },
      { label: 'y (x = 12)', value: '6 · 12 = 72' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT HÁRMASSZABÁLY, TÖRT ADATOK ÉS ÉLETSZERŰ FELADATOK (21-30)
  // =========================================================================
  {
    id: 'dp3-1',
    level: 3,
    prompt: 'Egy 4 fős család 2 hetes balatoni nyaralásának szállásdíja 280 000 Ft volt. Mennyibe kerülne ugyanez a szállás 3 hétre ugyanezen családnak?',
    options: [
      '420 000 Ft',
      '380 000 Ft',
      '450 000 Ft',
      '350 000 Ft'
    ],
    correctAnswer: 0,
    explanation: '1) 1 hét szállásdíja: 280 000 : 2 = 140 000 Ft.\n2) 3 hét szállásdíja: 3 · 140 000 = 420 000 Ft.',
    hint: '280 000 : 2 = 140 000 Ft/hét; 3 · 140 000 = ?',
    breakdown: [
      { label: '1 hét díja', value: '140 000 Ft' },
      { label: '3 hét díja', value: '3 · 140 000 = 420 000 Ft' }
    ]
  },
  {
    id: 'dp3-2',
    level: 3,
    prompt: 'A sajtpultnál 2,5 kg trappista sajt ára 6250 Ft. Mennyibe kerül 1,2 kg ugyanebből a sajtból?',
    options: [
      '3000 Ft',
      '2800 Ft',
      '3200 Ft',
      '2500 Ft'
    ],
    correctAnswer: 0,
    explanation: '1) 1 kg sajt ára: 6250 : 2,5 = 2500 Ft/kg.\n2) 1,2 kg sajt ára: 1,2 · 2500 = 3000 Ft.',
    hint: 'Számold ki 1 kg árát: 6250 : 2,5 = 2500 Ft. 1,2 · 2500 = ?',
    breakdown: [
      { label: '1 kg sajt', value: '2500 Ft' },
      { label: '1,2 kg sajt', value: '1,2 · 2500 = 3000 Ft' }
    ]
  },
  {
    id: 'dp3-3',
    level: 3,
    prompt: 'Egy személygépkocsi átlagos fogyasztása 6,8 liter benzin 100 km-en. Hány liter benzint fogyaszt el 450 km megtétele során?',
    options: [
      '30,6 liter',
      '28,4 liter',
      '32 liter',
      '34 liter'
    ],
    correctAnswer: 0,
    explanation: 'A 450 km a 100 km-nek a 4,5-szerese (450 : 100 = 4,5). Ezért a benzinmennyiség is 4,5-szeres: 4,5 · 6,8 = 30,6 liter.',
    hint: '4 · 6,8 = 27,2; 0,5 · 6,8 = 3,4 -> 27,2 + 3,4 = ?',
    breakdown: [
      { label: 'Arányszám', value: '450 : 100 = 4,5' },
      { label: 'Fogyasztás', value: '4,5 · 6,8 = 30,6 liter' }
    ]
  },
  {
    id: 'dp3-4',
    level: 3,
    prompt: 'A festékes dobozon lévő leírás szerint 5 liter prémium falfesték 40 m² falfelület lefestésére elegendő egy rétegben. Hány liter festéket kell vásárolni egy 112 m²-es szobafalhoz?',
    options: [
      '14 litert',
      '12 litert',
      '15 litert',
      '16 litert'
    ],
    correctAnswer: 0,
    explanation: '1) 1 liter festékkel lefesthető felület: 40 m² : 5 l = 8 m²/liter.\n2) 112 m² felülethez szükséges festék: 112 : 8 = 14 liter.',
    hint: '1 liter 8 m²-re elég. 112 : 8 = ?',
    breakdown: [
      { label: 'Kiadósság', value: '40 : 5 = 8 m²/liter' },
      { label: 'Szükséges festék', value: '112 : 8 = 14 liter' }
    ]
  },
  {
    id: 'dp3-5',
    level: 3,
    prompt: 'Egy csomag 35 dkg szeletelt sonka 1260 Ft-ba kerül. Mennyibe kerülne 1 egész kilogramm (100 dkg) ebből a sonkából?',
    options: [
      '3600 Ft',
      '3500 Ft',
      '3800 Ft',
      '3200 Ft'
    ],
    correctAnswer: 0,
    explanation: '1) 1 dkg sonka ára: 1260 : 35 = 36 Ft/dkg.\n2) 1 kg = 100 dkg sonka ára: 100 · 36 = 3600 Ft.',
    hint: 'Számold ki 1 dkg árát: 1260 : 35 = 36 Ft. 100 · 36 = ?',
    breakdown: [
      { label: '1 dkg ára', value: '1260 : 35 = 36 Ft' },
      { label: '100 dkg (1 kg)', value: '100 · 36 = 3600 Ft' }
    ]
  },
  {
    id: 'dp3-6',
    level: 3,
    prompt: 'Egy szakmunkás 4 és fél óra (4,5 h) alatt 54 darab alkatrészt szerel össze egyenletes tempóban. Mennyi időre van szüksége 90 darab alkatrész elkészítéséhez?',
    options: [
      '7,5 óra (7 óra 30 perc)',
      '8 óra',
      '7 óra',
      '6 óra 45 perc'
    ],
    correctAnswer: 0,
    explanation: '1) 1 óra alatt elkészült alkatrészek: 54 : 4,5 = 12 db/óra.\n2) 90 darabhoz szükséges idő: 90 : 12 = 7,5 óra = 7 óra 30 perc.',
    hint: '54 : 4,5 = 12 db/h; 90 : 12 = ?',
    breakdown: [
      { label: 'Óránkénti tempó', value: '54 : 4,5 = 12 db/h' },
      { label: 'Szükséges idő', value: '90 : 12 = 7,5 óra' }
    ]
  },
  {
    id: 'dp3-7',
    level: 3,
    prompt: 'Egy 1200 méter hosszú vasúti pálya kiépítéséhez pontosan 80 darab egyforma sínszálat használtak fel. Milyen hosszú az a pálya, amelyhez 130 darab ilyen sínszálat építenek be?',
    options: [
      '1950 méter',
      '1800 méter',
      '2000 méter',
      '1900 méter'
    ],
    correctAnswer: 0,
    explanation: '1) 1 sínszál hossza: 1200 m : 80 = 15 méter.\n2) 130 sínszál együttes hossza: 130 · 15 = 1950 méter.',
    hint: '1200 : 80 = 15 m; 130 · 15 = ?',
    breakdown: [
      { label: '1 sín hossza', value: '1200 : 80 = 15 m' },
      { label: '130 sín hossza', value: '130 · 15 = 1950 m' }
    ]
  },
  {
    id: 'dp3-8',
    level: 3,
    prompt: 'Egy pékségben a 600 grammos kenyér ára 480 Ft. Mennyibe kerülne ugyanezen a grammonkénti áron egy 1,5 kg-os (1500 g) nagy családi kenyér?',
    options: [
      '1200 Ft',
      '1100 Ft',
      '1250 Ft',
      '1050 Ft'
    ],
    correctAnswer: 0,
    explanation: '1) 1 gramm kenyér ára: 480 : 600 = 0,8 Ft/g (vagy 100 gramm = 80 Ft).\n2) 1,5 kg = 1500 gramm kenyér ára: 1500 · 0,8 = 1200 Ft (vagy 15 · 80 = 1200 Ft).',
    hint: '100 g ára: 480 : 6 = 80 Ft. 1500 g-ban 15-ször van meg a 100 g: 15 · 80 = ?',
    breakdown: [
      { label: '100 g ára', value: '80 Ft' },
      { label: '1500 g ára', value: '15 · 80 = 1200 Ft' }
    ]
  },
  {
    id: 'dp3-9',
    level: 3,
    prompt: 'A kerti csapból 15 másodperc alatt pontosan 2,5 liter víz folyik ki. Hány perc alatt telik meg erről a csapról egy 250 literes kerti esővízgyűjtő hordó?',
    options: [
      '25 perc alatt',
      '20 perc alatt',
      '30 perc alatt',
      '15 perc alatt'
    ],
    correctAnswer: 0,
    explanation: '1) 1 perc = 60 másodperc (ami a 15 másodperc 4-szerese). Így 1 perc alatt: 4 · 2,5 = 10 liter víz folyik ki.\n2) A 250 literes hordó megtelésének ideje: 250 liter : 10 liter/perc = 25 perc.',
    hint: '1 perc (60 s) alatt 4 · 2,5 = 10 liter folyik ki. 250 : 10 = ?',
    breakdown: [
      { label: '1 perc vízhozama', value: '4 · 2,5 = 10 liter/perc' },
      { label: 'Hordó ideje', value: '250 : 10 = 25 perc' }
    ]
  },
  {
    id: 'dp3-10',
    level: 3,
    prompt: 'Egy ötödikes osztályban 18 lány és 12 fiú tanul (arányuk 3 : 2). Ha egy nagyobb tábori csoportban ugyanez a lányok és fiúk aránya, és 45 lány van jelen, hány fiú vesz részt a táborban?',
    options: [
      '30 fiú',
      '25 fiú',
      '35 fiú',
      '20 fiú'
    ],
    correctAnswer: 0,
    explanation: 'A lányok és fiúk aránya: 18 : 12 = 3 : 2. A 45 lány 3 egységnek felel meg, tehát 1 egység: 45 : 3 = 15 fő. A fiúk száma 2 egység: 2 · 15 = 30 fiú.',
    hint: '45 : 3 = 15; 15 · 2 = ?',
    breakdown: [
      { label: '1 arányos egység', value: '45 : 3 = 15 fő' },
      { label: 'Fiúk száma', value: '2 · 15 = 30 fiú' }
    ]
  }
];

export const DirectProportionQuiz: React.FC<DirectProportionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Egyenes arányosság kvíz"
      subtitle="30 feladat 3 szinten: egységár, hányados állandósága, hármasszabály, grafikon és összetett arányos szöveges feladatok"
      questions={DIRECT_PROPORTION_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-direct-proportion-quiz"
      storageKey="g5-direct-proportion-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <DirectProportionMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <DirectProportionSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-violet-700 dark:text-violet-400">1. Szint Puskája: Alapfogalmak</div>
            <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-1">
              <div>• <strong>Egyenes arányosság:</strong> Ha az egyik adat 2-szerese lesz, a másik is 2-szerese lesz.</div>
              <div>• <strong>Hányados (y : x):</strong> Minden oszlopban állandó szám (k = egységár).</div>
              <div>• <strong>Origó szabály:</strong> 0 mennyiséghez 0 érték tartozik, a grafikon a (0; 0) pontból indul.</div>
              <div>• <strong>Egységár:</strong> Összeg : Mennyiség (pl. 1500 Ft : 3 kg = 500 Ft/kg).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-violet-700 dark:text-violet-400">2. Szint Puskája: Hármasszabály 2 Lépése</div>
            <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-1">
              <div>• <strong>1. lépés (Osztás):</strong> Számold ki 1 egység értékét (pl. 1800 : 4 = 450 Ft).</div>
              <div>• <strong>2. lépés (Szorzás):</strong> Szorozd meg a keresett mennyiséggel (pl. 7 · 450 = 3150 Ft).</div>
              <div>• <strong>Keresztbeszorzás:</strong> x = (Új mennyiség · Régi ár) : Régi mennyiség.</div>
              <div>• <strong>Csapda:</strong> Az alapdíjas taxi díj nem egyenes arányosság!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-violet-700 dark:text-violet-400">3. Szint Puskája: Trükkös Szöveges Feladatok</div>
            <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-1">
              <div>• <strong>Üzemanyag:</strong> (Új km : 100 km) · 100 km-es fogyasztás.</div>
              <div>• <strong>Idő és munka:</strong> 1 óra vagy 1 perc teljesítménye = Összes darab : Idő.</div>
              <div>• <strong>Fajlagos ár:</strong> Nagyobb kiszerelésnél váltsd át közös egységre (dkg vagy gramm)!</div>
              <div>• <strong>Aránypárok:</strong> a : b aránynál oszd az ismert adatot a saját arányszámával!</div>
            </div>
          </div>
        )
      }}
    />
  );
};
