import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { VariableQuantitiesMatcher } from './VariableQuantitiesMatcher';
import { VariableQuantitiesSorter } from './VariableQuantitiesSorter';

export interface VariableQuantitiesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const VARIABLE_QUANTITIES_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ÖSSZEFÜGGÉSEK FELISMERÉSE, IRÁNYOK ÉS ALAPFOGALMAK (1-10)
  // =========================================================================
  {
    id: 'vq1-1',
    level: 1,
    prompt: 'Hogyan változik a boltban fizetendő végösszeg, ha azonos egységár mellett 3-szor annyi ceruzát vásárolunk?',
    options: [
      'Pontosan a 3-szorosára nő',
      'A harmadára (1/3-ára) csökken',
      'Változatlan marad',
      '300 Ft-tal nő'
    ],
    correctAnswer: 0,
    explanation: 'A ceruzák darabszáma és az ár egyenes kapcsolatban állnak: ha 3-szor annyi ceruzát veszünk, pontosan 3-szor annyi pénzt kell fizetnünk.',
    hint: 'Több ceruza = arányosan több fizetendő összeg.',
    breakdown: [
      { label: 'Összefüggés', value: 'Ár = darab · egységár' },
      { label: 'Változás', value: '3 · darab -> 3 · Ár' }
    ]
  },
  {
    id: 'vq1-2',
    level: 1,
    prompt: 'Ha egy autó az eddigi sebességének pontosan a duplájával (2-szeresével) halad, hogyan változik ugyanazon távolság megtételének ideje?',
    options: [
      'A felére (1/2-ére) csökken',
      'A duplájára (2-szeresére) nő',
      'Változatlan marad',
      'A negyedére csökken'
    ],
    correctAnswer: 0,
    explanation: 'A sebesség és a menetidő ellentétesen változó adatok: minél gyorsabban haladunk, annál kevesebb időre van szükségünk ugyanahhoz az úthoz. Kétszeres sebességgel feleannyi idő alatt érünk oda.',
    hint: 'Gondolj a futásra: ha kétszer gyorsabban futsz, feleannyi idő alatt érsz a célba!',
    breakdown: [
      { label: 'Összefüggés', value: 'Idő = Út : Sebesség' },
      { label: 'Eredmény', value: 'Feleannyi idő' }
    ]
  },
  {
    id: 'vq1-3',
    level: 1,
    prompt: 'Melyik mennyiségpár között NINCS semmilyen matematikai vagy fizikai összefüggés az alábbiak közül?',
    options: [
      'Egy tanuló cipőmérete és a matematika dolgozatának pontszáma',
      'A megvásárolt füzetek száma és az értük fizetendő összeg',
      'A kerékpározás ideje és a megtett távolság állandó sebesség mellett',
      'A kerti csap nyitvatartási ideje és a kifolyt víz mennyisége'
    ],
    correctAnswer: 0,
    explanation: 'A cipőméret és a matematikai tudás teljesen független egymástól: egy nagyobb lábú diák nem ír automatikusan jobb vagy rosszabb dolgozatot.',
    hint: 'Keresd a két teljesen független, értelmetlen kapcsolatot!'
  },
  {
    id: 'vq1-4',
    level: 1,
    prompt: 'Mit jelent a vásárlásban és a kereskedelemben az „egységár” kifejezés?',
    options: [
      '1 darab termék vagy 1 mértékegység (pl. 1 kg, 1 l) ára',
      'A boltban található összes áru átlagos ára',
      'A vásárlás végén fizetendő teljes számlaösszeg',
      'A legolcsóbb akciós termék ára'
    ],
    correctAnswer: 0,
    explanation: 'Az egységár egyetlen egységre (1 db, 1 kg, 1 liter) vonatkozó ár. Ez az a szorzószám (állandó), amellyel a darabszámot megszorozzuk a teljes összeg kiszámításához.',
    hint: 'Gondolj a polccímkékre: Ft/db vagy Ft/kg.',
    breakdown: [
      { label: 'Egységár', value: '1 egységre jutó ár (Ft/db, Ft/kg)' }
    ]
  },
  {
    id: 'vq1-5',
    level: 1,
    prompt: 'Egy kockás füzet ára 240 Ft. Mennyibe kerül pontosan 5 darab ugyanilyen füzet?',
    options: [
      '1200 Ft',
      '1000 Ft',
      '1240 Ft',
      '1440 Ft'
    ],
    correctAnswer: 0,
    explanation: 'A füzetek számát megszorozzuk az egységárral: 5 · 240 = 1200 Ft.',
    hint: '5 · 200 = 1000, 5 · 40 = 200 -> 1000 + 200 = ?',
    breakdown: [
      { label: 'Számítás', value: '5 db · 240 Ft/db = 1200 Ft' }
    ]
  },
  {
    id: 'vq1-6',
    level: 1,
    prompt: 'Egy négyzet oldala 6 cm, a kerülete így 24 cm. Hogyan változik a kerülete, ha az oldala a duplájára (12 cm-re) nő?',
    options: [
      'A kerülete is pontosan a duplájára nő (48 cm lesz)',
      'A kerülete a 4-szeresére nő',
      'A kerülete változatlan marad (24 cm)',
      'A kerülete csak 6 cm-rel nő meg'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet kerülete: K = 4 · a. Mivel az oldal a 2-szeresére nőtt (6 cm -> 12 cm), a kerülete is a 2-szeresére nő: 4 · 12 = 48 cm (2 · 24 cm = 48 cm).',
    hint: 'K = 4 · a; ha az "a" duplázódik, a K is duplázódik.',
    breakdown: [
      { label: 'Eredeti K', value: '4 · 6 = 24 cm' },
      { label: 'Új K', value: '4 · 12 = 48 cm (duplája)' }
    ]
  },
  {
    id: 'vq1-7',
    level: 1,
    prompt: 'Ha 4 munkás 6 óra alatt festi le a kerítést, mennyi idő alatt végzi el ugyanezt a munkát 8 azonos tempójú munkás?',
    options: [
      '3 óra alatt',
      '12 óra alatt',
      '4 óra alatt',
      '2 óra alatt'
    ],
    correctAnswer: 0,
    explanation: 'A munkások száma a duplájára nőtt (4-ről 8-ra). Mivel kétszer annyian dolgoznak együtt, feleannyi időre van szükségük: 6 : 2 = 3 óra.',
    hint: 'Kétszer annyi ember feleannyi idő alatt végez: 6 : 2 = ?',
    breakdown: [
      { label: 'Munkások', value: '4 -> 8 (duplája)' },
      { label: 'Munkaidő', value: '6 -> 3 óra (fele)' }
    ]
  },
  {
    id: 'vq1-8',
    level: 1,
    prompt: 'A kerti csapból percenként 8 liter víz folyik a medencébe. Mennyi víz folyik be 10 perc alatt?',
    options: [
      '80 liter',
      '18 liter',
      '800 liter',
      '40 liter'
    ],
    correctAnswer: 0,
    explanation: 'Az eltelt időt megszorozzuk a percenkénti vízhozammal: 10 perc · 8 liter/perc = 80 liter.',
    hint: '10 · 8 = ?',
    breakdown: [
      { label: 'Számítás', value: '10 min · 8 l/min = 80 l' }
    ]
  },
  {
    id: 'vq1-9',
    level: 1,
    prompt: 'Milyen kapcsolatot nevezünk a matematikában „együtt növekvőnek”?',
    options: [
      'Ha az egyik mennyiség értéke növekszik, a hozzá tartozó másik mennyiség értéke is növekszik',
      'Ha az egyik mennyiség nő, a másik pontosan csökken',
      'Ha mindkét mennyiség értéke mindig nulla marad',
      'Ha a mennyiségek összege állandó'
    ],
    correctAnswer: 0,
    explanation: 'Együtt növekvő a kapcsolat, ha a kiinduló adat növekedésekor a hozzá rendelt másik adat is növekszik (pl. több füzet -> nagyobb ár).',
    hint: 'Mindkét mennyiség ugyanabba az irányba mozog (felfelé).'
  },
  {
    id: 'vq1-10',
    level: 1,
    prompt: 'Egy születésnapi tortát 4 barát vagy 8 barát között osztunk szét egyenlően. Melyik esetben kap egy ember nagyobb szeletet?',
    options: [
      'A 4 barát esetén (kétszer akkora szeletet)',
      'A 8 barát esetén',
      'Mindkét esetben egyforma szeletet kapnak',
      'Nem lehet eldönteni a torta mérete nélkül'
    ],
    correctAnswer: 0,
    explanation: 'Kevesebb részre vágva a tortát nagyobb darabok keletkeznek: 4 barát esetén mindenkinek a torta negyede (1/4) jut, 8 barát esetén csak a nyolcada (1/8). Az 1/4 pontosan a duplája az 1/8-nak.',
    hint: 'Kevesebb ember = nagyobb szelet fejenként!'
  },

  // =========================================================================
  // 2. SZINT: TÁBLÁZATOK KIEGÉSZÍTÉSE ÉS SZABÁLYOK FELISMERÉSE (11-20)
  // =========================================================================
  {
    id: 'vq2-1',
    level: 2,
    prompt: 'Egy táblázat felső sora (füzetek száma): 1, 2, 3, 5. Alsó sora (fizetendő összeg): 150, 300, 450, ?. Milyen szám hiányzik az 5 füzethez?',
    options: [
      '750 Ft',
      '600 Ft',
      '900 Ft',
      '500 Ft'
    ],
    correctAnswer: 0,
    explanation: 'Az egységár 150 Ft/db (mert 300 : 2 = 150 és 450 : 3 = 150). Így 5 füzetért: 5 · 150 = 750 Ft-ot kell fizetni.',
    hint: 'Az alsó sor a felső sor 150-szerese: 5 · 150 = ?',
    breakdown: [
      { label: 'Egységár', value: '150 Ft/db' },
      { label: '5 füzet', value: '5 · 150 = 750 Ft' }
    ]
  },
  {
    id: 'vq2-2',
    level: 2,
    prompt: 'Egy autó egyenletes sebességgel halad. 1 óra alatt 70 km-t, 2 óra alatt 140 km-t tesz meg. Melyik matematikai szabállyal számítható ki a megtett út (y) az időből (x)?',
    options: [
      'y = 70 · x',
      'y = x + 70',
      'y = 70 : x',
      'y = 140 · x'
    ],
    correctAnswer: 0,
    explanation: 'A megtett út a sebesség és az idő szorzata: 1 óránál 1 · 70 = 70, 2 óránál 2 · 70 = 140. Tehát a szabály: y = 70 · x.',
    hint: 'Minden oszlopban az alsó szám a felső szám 70-szerese.',
    breakdown: [
      { label: 'Szabály', value: 'Út = 70 · Idő (y = 70 · x)' }
    ]
  },
  {
    id: 'vq2-3',
    level: 2,
    prompt: 'A fagylaltosnál 1 gombóc fagyi 450 Ft-ba kerül. Hány gombóc fagylaltot vásárolhatunk pontosan 2700 Ft-ért?',
    options: [
      '6 gombócot',
      '5 gombócot',
      '7 gombócot',
      '8 gombócot'
    ],
    correctAnswer: 0,
    explanation: 'A teljes összeget elosztjuk az egységárral: 2700 : 450 = 6 gombóc (mert 6 · 450 = 2700 Ft).',
    hint: '2700 : 450 = 270 : 45 = ?',
    breakdown: [
      { label: 'Számítás', value: '2700 : 450 = 6 gombóc' }
    ]
  },
  {
    id: 'vq2-4',
    level: 2,
    prompt: 'Egy számpár táblázatban az összetartozó értékek: (2; 8), (3; 12), (5; 20). Milyen szabály kapcsolja össze az x és y értékeket?',
    options: [
      'y = 4 · x (vagy y : x = 4)',
      'y = x + 6',
      'y = 2 · x + 4',
      'y = x : 4'
    ],
    correctAnswer: 0,
    explanation: 'Ellenőrizzük a hányadosokat:\n8 : 2 = 4\n12 : 3 = 4\n20 : 5 = 4\nMinden esetben az y az x értékének 4-szerese: y = 4 · x.',
    hint: 'Mivel kell megszorozni a 2-t, hogy 8 legyen, a 3-at, hogy 12 legyen?',
    breakdown: [
      { label: 'Hányados', value: 'y : x = 4' },
      { label: 'Képlet', value: 'y = 4 · x' }
    ]
  },
  {
    id: 'vq2-5',
    level: 2,
    prompt: 'Péter 4 évvel idősebb Zitánál. Amikor Zita 10 éves, Péter 14 éves. Hány éves lesz Péter, amikor Zita 20 éves lesz?',
    options: [
      '24 éves',
      '28 éves',
      '40 éves',
      '22 éves'
    ],
    correctAnswer: 0,
    explanation: 'Ez a klasszikus kor-feladat! Bár az életkorok nőnek, a kettőjük közötti KÜLÖNBSÉG állandó marad: Péter mindig pontosan 4 évvel idősebb Zitánál. Amikor Zita 20 éves lesz, Péter 20 + 4 = 24 éves lesz (nem a duplája!).',
    hint: 'A korkülönbség soha nem változik az évek során!',
    breakdown: [
      { label: 'Korkülönbség', value: 'Mindig 4 év' },
      { label: 'Péter kora', value: '20 + 4 = 24 év' }
    ]
  },
  {
    id: 'vq2-6',
    level: 2,
    prompt: 'Egy nyomtató 3 perc alatt 45 oldalt nyomtat ki egyenletes sebességgel. Hány oldalt nyomtat ki 8 perc alatt?',
    options: [
      '120 oldalt',
      '105 oldalt',
      '135 oldalt',
      '90 oldalt'
    ],
    correctAnswer: 0,
    explanation: '1) Kiszámoljuk az 1 percre jutó teljesítményt: 45 : 3 = 15 oldal/perc.\n2) 8 perc alatt: 8 · 15 = 120 oldal.',
    hint: 'Először számold ki, hány oldalt nyomtat 1 perc alatt: 45 : 3 = 15.',
    breakdown: [
      { label: '1 perc alatt', value: '45 : 3 = 15 oldal' },
      { label: '8 perc alatt', value: '8 · 15 = 120 oldal' }
    ]
  },
  {
    id: 'vq2-7',
    level: 2,
    prompt: 'Ha a piacon 5 kg alma ára 1750 Ft, mennyit kell fizetnünk 2 kg almáért?',
    options: [
      '700 Ft',
      '650 Ft',
      '800 Ft',
      '750 Ft'
    ],
    correctAnswer: 0,
    explanation: '1) Egységár (1 kg alma): 1750 : 5 = 350 Ft/kg.\n2) 2 kg alma ára: 2 · 350 = 700 Ft.',
    hint: 'Számold ki 1 kg árát: 1750 : 5 = 350 Ft.',
    breakdown: [
      { label: '1 kg ára', value: '1750 : 5 = 350 Ft' },
      { label: '2 kg ára', value: '2 · 350 = 700 Ft' }
    ]
  },
  {
    id: 'vq2-8',
    level: 2,
    prompt: 'Egy táblázat adatai: (12; 1), (6; 2), (4; 3), (3; 4). Milyen összefüggés áll fenn a két mennyiség között?',
    options: [
      'A két szám szorzata állandó: x · y = 12 (vagy y = 12 : x)',
      'y = x − 11',
      'y = x : 2',
      'A két szám összege állandó: x + y = 13'
    ],
    correctAnswer: 0,
    explanation: 'Figyeld meg a szorzatokat:\n12 · 1 = 12\n6 · 2 = 12\n4 · 3 = 12\n3 · 4 = 12\nA szorzat mindig 12 marad (ellentétes változás).',
    hint: 'Szorozd össze a számpárokat: 12 · 1, 6 · 2, 4 · 3...',
    breakdown: [
      { label: 'Szorzat', value: 'x · y = 12' },
      { label: 'Képlet', value: 'y = 12 : x' }
    ]
  },
  {
    id: 'vq2-9',
    level: 2,
    prompt: 'Egy szabályos ötszög oldala 8 cm. Ha az oldalát minden oldalon 3 cm-rel megnöveljük (11 cm-re), mennyivel nő meg a kerülete?',
    options: [
      '15 cm-rel nő meg',
      '3 cm-rel nő meg',
      '24 cm-rel nő meg',
      '55 cm-rel nő meg'
    ],
    correctAnswer: 0,
    explanation: 'Mivel az ötszögnek 5 egyforma oldala van, és mindegyik oldal 3 cm-rel nőtt, a teljes kerület: 5 · 3 cm = 15 cm-rel nő meg. (Eredeti kerület: 5 · 8 = 40 cm; új kerület: 5 · 11 = 55 cm; 55 - 40 = 15 cm).',
    hint: '5 oldal van, mindegyik 3 cm-rel hosszabb: 5 · 3 = ?',
    breakdown: [
      { label: 'Oldalnövekedés', value: '3 cm / oldal' },
      { label: 'Kerület növekedése', value: '5 · 3 = 15 cm' }
    ]
  },
  {
    id: 'vq2-10',
    level: 2,
    prompt: 'Egy autó fogyasztása 6 liter benzin 100 km-en. Hány liter benzint fogyaszt el 350 km megtétele során egyenletes vezetéssel?',
    options: [
      '21 liter',
      '18 liter',
      '24 liter',
      '20 liter'
    ],
    correctAnswer: 0,
    explanation: '350 km az a 100 km-nek a 3,5-szerese. Ezért a benzin mennyisége is 3,5-szeres: 3,5 · 6 liter = 21 liter.',
    hint: '300 km-re 3 · 6 = 18 liter kell, 50 km-re fél adag, azaz 3 liter. 18 + 3 = ?',
    breakdown: [
      { label: '100 km', value: '6 liter' },
      { label: '350 km', value: '3,5 · 6 = 21 liter' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT ARÁNYOSSÁGI KÖVETKEZTETÉSEK ÉS FELADATOK (21-30)
  // =========================================================================
  {
    id: 'vq3-1',
    level: 3,
    prompt: '6 egyforma teljesítményű gép 10 óra alatt gyárt le egy alkatrész-rendelést. Hány óra alatt végezne ugyanezzel a munkával 15 ugyanilyen gép?',
    options: [
      '4 óra alatt',
      '5 óra alatt',
      '6 óra alatt',
      '8 óra alatt'
    ],
    correctAnswer: 0,
    explanation: '1) Kiszámoljuk az összes szükséges gépórát: 6 gép · 10 óra = 60 gépóra.\n2) Ha 15 gép dolgozik egyszerre: 60 : 15 = 4 óra alatt készen vannak.',
    hint: '6 · 10 = 60 összes munkaóra; 60 : 15 = ?',
    breakdown: [
      { label: 'Összes gépóra', value: '6 · 10 = 60 óra' },
      { label: '15 gép ideje', value: '60 : 15 = 4 óra' }
    ]
  },
  {
    id: 'vq3-2',
    level: 3,
    prompt: 'Egy autó 120 km/h átlagsebességgel 2 óra alatt ér az autópályán a céljához. Mennyi idő alatt tenné meg ugyanezt az utat 80 km/h sebességgel haladva?',
    options: [
      '3 óra alatt',
      '2,5 óra alatt',
      '3,5 óra alatt',
      '4 óra alatt'
    ],
    correctAnswer: 0,
    explanation: '1) A teljes távolság: 120 km/h · 2 h = 240 km.\n2) 80 km/h sebességgel a menetidő: 240 : 80 = 3 óra.',
    hint: 'Számold ki az utat: 120 · 2 = 240 km. Majd oszd el 80-nal!',
    breakdown: [
      { label: 'Megtett út', value: '120 · 2 = 240 km' },
      { label: 'Új menetidő', value: '240 : 80 = 3 óra' }
    ]
  },
  {
    id: 'vq3-3',
    level: 3,
    prompt: 'Egy palacsintatészta receptje 4 személyre 30 dkg lisztet és 4 dl tejet ír elő. Mennyi liszt és mennyi tej szükséges 10 személyre?',
    options: [
      '75 dkg liszt és 10 dl (1 liter) tej',
      '60 dkg liszt és 8 dl tej',
      '75 dkg liszt és 8 dl tej',
      '70 dkg liszt és 12 dl tej'
    ],
    correctAnswer: 0,
    explanation: 'A 10 személy a 4 személynek a 2,5-szerese (10 : 4 = 2,5).\n• Liszt: 2,5 · 30 dkg = 75 dkg.\n• Tej: 2,5 · 4 dl = 10 dl = 1 liter.',
    hint: '10 : 4 = 2,5-szeres adag kell mindenből: 2,5 · 30 és 2,5 · 4.',
    breakdown: [
      { label: 'Arányszám', value: '10 : 4 = 2,5' },
      { label: 'Liszt', value: '2,5 · 30 = 75 dkg' },
      { label: 'Tej', value: '2,5 · 4 = 10 dl = 1 l' }
    ]
  },
  {
    id: 'vq3-4',
    level: 3,
    prompt: 'Egy osztálykirándulás különbuszának bérleti díja fix 60 000 Ft. Mennyivel fizet kevesebbet egy diák, ha 20 fő helyett 30 fő vesz részt a kiránduláson?',
    options: [
      '1000 Ft-tal fizet kevesebbet fejenként',
      '1500 Ft-tal fizet kevesebbet fejenként',
      '500 Ft-tal fizet kevesebbet fejenként',
      '2000 Ft-tal fizet kevesebbet fejenként'
    ],
    correctAnswer: 0,
    explanation: '1) 20 fő esetén: 60 000 : 20 = 3000 Ft/fő.\n2) 30 fő esetén: 60 000 : 30 = 2000 Ft/fő.\n3) Megtakarítás: 3000 - 2000 = 1000 Ft-tal fizet kevesebbet mindenki.',
    hint: 'Számold ki az 1 főre jutó költséget 20 főnél (3000 Ft) és 30 főnél (2000 Ft)!',
    breakdown: [
      { label: '20 főnél', value: '60 000 : 20 = 3000 Ft' },
      { label: '30 főnél', value: '60 000 : 30 = 2000 Ft' },
      { label: 'Különbség', value: '1000 Ft megtakarítás' }
    ]
  },
  {
    id: 'vq3-5',
    level: 3,
    prompt: 'Egy négyzet oldala 3 cm, területe 9 cm². Ha az oldalát a 3-szorosára növeljük (9 cm-re), hányszorosára nő a területe?',
    options: [
      'A 9-szeresére nő (81 cm² lesz)',
      'A 3-szorosára nő (27 cm² lesz)',
      'A 6-szorosára nő (54 cm² lesz)',
      'Változatlan marad'
    ],
    correctAnswer: 0,
    explanation: 'Vigyázat, klasszikus csapda! Az új négyzet területe: 9 cm · 9 cm = 81 cm². Mivel 81 : 9 = 9, a terület nem a 3-szorosára, hanem a 3 · 3 = 9-szeresére nő! (A terület az oldalarány négyzetével arányos).',
    hint: '3 · 3 = 9 cm² volt; 9 · 9 = 81 cm² lett. 81 : 9 = ?',
    breakdown: [
      { label: 'Eredeti terület', value: '3 · 3 = 9 cm²' },
      { label: 'Új terület', value: '9 · 9 = 81 cm²' },
      { label: 'Arány', value: '81 : 9 = 9-szeresére nőtt' }
    ]
  },
  {
    id: 'vq3-6',
    level: 3,
    prompt: 'Egy ifjúsági regény 240 oldalas. Ha naponta 20 oldalt olvasunk belőle, hány nappal végzünk később, mintha naponta 30 oldalt olvasnánk?',
    options: [
      '4 nappal később',
      '3 nappal később',
      '5 nappal később',
      '6 nappal később'
    ],
    correctAnswer: 0,
    explanation: '1) 20 oldalas tempóval: 240 : 20 = 12 nap.\n2) 30 oldalas tempóval: 240 : 30 = 8 nap.\n3) Különbség: 12 - 8 = 4 nappal tart tovább a 20 oldalas olvasás.',
    hint: '240 : 20 = 12 nap; 240 : 30 = 8 nap. 12 - 8 = ?',
    breakdown: [
      { label: 'Napi 20 oldal', value: '12 nap' },
      { label: 'Napi 30 oldal', value: '8 nap' },
      { label: 'Különbség', value: '4 nap' }
    ]
  },
  {
    id: 'vq3-7',
    level: 3,
    prompt: 'Egy csomagológép percenként 18 dobozt zár le, míg egy korszerűbb gép percenként 27 dobozt. Hány perccel hamarabb zár le 540 dobozt a korszerűbb gép?',
    options: [
      '10 perccel hamarabb',
      '15 perccel hamarabb',
      '5 perccel hamarabb',
      '20 perccel hamarabb'
    ],
    correctAnswer: 0,
    explanation: '1) Régi gép: 540 : 18 = 30 perc.\n2) Új gép: 540 : 27 = 20 perc.\n3) Különbség: 30 - 20 = 10 perccel hamarabb végez az új gép.',
    hint: '540 : 18 = 30; 540 : 27 = 20. 30 - 20 = ?',
    breakdown: [
      { label: '1. gép ideje', value: '540 : 18 = 30 min' },
      { label: '2. gép ideje', value: '540 : 27 = 20 min' },
      { label: 'Előny', value: '10 perc' }
    ]
  },
  {
    id: 'vq3-8',
    level: 3,
    prompt: 'Egy gazdaságban 12 tehén számára pontosan 30 napra elegendő széna van elraktározva. Hány napig tartana ki ugyanez a széna, ha csak 8 tehenet etetnének vele?',
    options: [
      '45 napig',
      '40 napig',
      '36 napig',
      '50 napig'
    ],
    correctAnswer: 0,
    explanation: '1) A teljes takarmány: 12 tehén · 30 nap = 360 „tehénnapnyi” adag.\n2) 8 tehén esetén ez kitart: 360 : 8 = 45 napig.',
    hint: '12 · 30 = 360 állatnap; 360 : 8 = ?',
    breakdown: [
      { label: 'Összes takarmány', value: '12 · 30 = 360 egység' },
      { label: '8 tehénre', value: '360 : 8 = 45 nap' }
    ]
  },
  {
    id: 'vq3-9',
    level: 3,
    prompt: 'Egy túratérképen 1 cm távolság a valóságban pontosan 5 km-nek felel meg. Mekkora a valós távolság két kilátó között, ha a térképen 6,4 cm a távolságuk?',
    options: [
      '32 km',
      '30 km',
      '35 km',
      '28 km'
    ],
    correctAnswer: 0,
    explanation: 'Mivel minden centiméter 5 km-nek felel meg, a valós távolság: 6,4 · 5 km = 32 km.',
    hint: '6,4 · 5 = 6 · 5 + 0,4 · 5 = 30 + 2 = ?',
    breakdown: [
      { label: 'Méretarány', value: '1 cm -> 5 km' },
      { label: 'Valós távolság', value: '6,4 · 5 = 32 km' }
    ]
  },
  {
    id: 'vq3-10',
    level: 3,
    prompt: 'Három testvér életkora most 7, 10 és 13 év (összesen 30 év). Mennyi lesz az életkoruk összege pontosan 5 év múlva?',
    options: [
      '45 év (15 évvel nő az összeg)',
      '35 év (5 évvel nő az összeg)',
      '40 év',
      '50 év'
    ],
    correctAnswer: 0,
    explanation: '5 év múlva mind a HÁROM testvér 5 évvel lesz idősebb! Ezért az életkorok összege 3 · 5 = 15 évvel nő meg: 30 + 15 = 45 év. (Életkoraik: 12, 15, 18 -> 12 + 15 + 18 = 45 év).',
    hint: 'Nem csak egyetlen gyerek öregszik 5 évet, hanem mind a hárman!',
    breakdown: [
      { label: 'Jelenlegi összeg', value: '7 + 10 + 13 = 30 év' },
      { label: 'Növekedés', value: '3 · 5 = 15 év' },
      { label: 'Új összeg', value: '30 + 15 = 45 év' }
    ]
  }
];

export const VariableQuantitiesQuiz: React.FC<VariableQuantitiesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Arányosságok, változó mennyiségek kvíz"
      subtitle="30 feladat 3 szinten: együtt változó adatok, táblázatok, egységárak, sebesség-idő és szöveges következtetések"
      questions={VARIABLE_QUANTITIES_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-variable-quantities-quiz"
      storageKey="g5-variable-quantities-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <VariableQuantitiesMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <VariableQuantitiesSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">1. Szint Puskája: Változási Típusok</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Együtt növekvő:</strong> Ha az egyik nő, a másik is nő (pl. darab és ár).</div>
              <div>• <strong>Ellentétesen változó:</strong> Ha az egyik nő, a másik csökken (pl. több munkás → kevesebb idő).</div>
              <div>• <strong>Független:</strong> Nincs matematikai összefüggés (pl. életkor és cipőméret).</div>
              <div>• <strong>Egységár:</strong> 1 db vagy 1 kg ára (Ár = darab · egységár).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">2. Szint Puskája: Táblázatok és Szabályok</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Függőleges szabály:</strong> y = c · x (állandó szorzó minden oszlopban).</div>
              <div>• <strong>Vízszintes szabály:</strong> Ha a felső sor k-szorosára nő, az alsó sor is k-szorosára nő.</div>
              <div>• <strong>Állandó szorzat:</strong> x · y = c (ellentétes változásnál a szorzat fix).</div>
              <div>• <strong>Korkülönbség:</strong> Mindig állandó marad az évek során!</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">3. Szint Puskája: Következtetési Trükkök</div>
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <div>• <strong>Egységre következtetés:</strong> Számold ki előbb 1 darab vagy 1 óra értékét, majd szorozz!</div>
              <div>• <strong>Munka és gépek:</strong> Összes munka = Gépek száma · Órák száma.</div>
              <div>• <strong>Négyzet területe:</strong> Ha az oldal 3-szorosára nő, a terület 3 · 3 = 9-szeresére nő!</div>
              <div>• <strong>Több ember öregedése:</strong> n ember esetén az életkorok összege n · évvel növekszik.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
