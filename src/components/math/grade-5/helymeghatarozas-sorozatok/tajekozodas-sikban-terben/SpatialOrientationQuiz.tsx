import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { SpatialOrientationMatcher } from './SpatialOrientationMatcher';
import { SpatialOrientationSorter } from './SpatialOrientationSorter';

export interface SpatialOrientationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const SPATIAL_ORIENTATION_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: DIMENZIÓK ALAPJAI ÉS A TÉRBELI KOORDINÁTÁK (1-10)
  // =========================================================================
  {
    id: 'soq1-1',
    level: 1,
    prompt: 'Hány koordinátára van szükség egy pont vagy test helyzetének pontos megadásához a valóságos háromdimenziós (3D) térben?',
    options: [
      '3 koordinátára: szélesség (x), hosszúság (y) és magasság (z)',
      '2 koordinátára: csak vízszintes és függőleges adatra',
      '1 koordinátára: a távolságra',
      '4 koordinátára: a négy égtáj szerint'
    ],
    correctAnswer: 0,
    explanation: 'A 3D térben három egymásra merőleges irány van: szélesség (x), hosszúság/mélység (y) és magasság (z). Ezért pontosan 3 adatra van szükség.',
    hint: 'Gondolj a tér 3 dimenziójára: szélesség, hosszúság, magasság!',
    breakdown: [
      { label: 'Dimenzió', value: '3D (tér)' },
      { label: 'Koordináták', value: '(x; y; z)' },
      { label: 'Szükséges adatok', value: '3 független adat' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-40 -40 80 80">
        <line x1="0" y1="10" x2="0" y2="-35" stroke="#0d9488" strokeWidth="2" />
        <polygon points="0,-35 -3,-28 3,-28" fill="#0d9488" />
        <text x="4" y="-30" className="text-[7px] font-bold fill-teal-700">z (magasság)</text>
        <line x1="0" y1="10" x2="32" y2="28" stroke="#2563eb" strokeWidth="2" />
        <polygon points="32,28 24,24 26,30" fill="#2563eb" />
        <text x="32" y="36" className="text-[7px] font-bold fill-blue-700">x (szélesség)</text>
        <line x1="0" y1="10" x2="-32" y2="28" stroke="#7c3aed" strokeWidth="2" />
        <polygon points="-32,28 -26,30 -24,24" fill="#7c3aed" />
        <text x="-36" y="36" className="text-[7px] font-bold fill-purple-700">y (mélység)</text>
        <circle cx="0" cy="10" r="3" fill="#f59e0b" />
        <text x="-4" y="8" className="text-[6px] font-black fill-amber-700">O</text>
      </svg>
    )
  },
  {
    id: 'soq1-2',
    level: 1,
    prompt: 'Melyik az alábbiak közül tipikusan egydimenziós (1D) helymeghatározás?',
    options: [
      'A kilométerkő az autópályán vagy a higanyszál a hőmérőn',
      'A mező a sakktáblán (e4)',
      'A repülőgép helyzete a levegőben',
      'Egy hajó pozíciója a tengeren'
    ],
    correctAnswer: 0,
    explanation: 'Az 1D helymeghatározás egyetlen vonal vagy számegyenes mentén történik, ahol egyetlen szám (pl. 45. km vagy -5 °C) pontosan megadja a helyet.',
    hint: 'Keresd azt, ahol egyetlen vonal mentén mérünk egyetlen számmal!',
    breakdown: [
      { label: 'Típus', value: '1D (vonal)' },
      { label: 'Adatok száma', value: '1 szám' },
      { label: 'Példa', value: 'Kilométerkő, hőmérő skálája' }
    ]
  },
  {
    id: 'soq1-3',
    level: 1,
    prompt: 'Melyik az alábbiak közül kétdimenziós (2D) síkbeli tájékozódás?',
    options: [
      'Egy mező kiválasztása a sakktáblán (pl. e4) vagy egy papírlap rácsán',
      'Hőmérséklet leolvasása a skáláról',
      'Tengeralattjáró merülése a víz alatt',
      'Kilométerkő az M7-es autópályán'
    ],
    correctAnswer: 0,
    explanation: 'A sakktábla egy sík felület, ahol 2 adatra van szükségünk: az oszlop betűjére (vízszintes) és a sor számára (függőleges). Ez 2 dimenzió.',
    hint: 'A sík felületen két irány van: oszlop és sor.',
    breakdown: [
      { label: 'Típus', value: '2D (sík)' },
      { label: 'Adatok száma', value: '2 adat (oszlop és sor)' },
      { label: 'Példa', value: 'Sakktábla, papírlap, képernyő' }
    ]
  },
  {
    id: 'soq1-4',
    level: 1,
    prompt: 'Hány koordinátával határozható meg egy repülőgép pontos helyzete a légtérben a Föld felett?',
    options: [
      '3 koordinátával (szélességi fok, hosszúsági fok és repülési magasság)',
      '2 koordinátával (csak szélesség és hosszúság)',
      '1 koordinátával (csak a sebességével)',
      'Nem határozható meg koordinátákkal'
    ],
    correctAnswer: 0,
    explanation: 'A légtér 3 dimenziós: nem elég tudni, hogy a repülő melyik város felett jár (2D koordináta), azt is pontosan ismerni kell, hány méter magasan repül (magasság: 3. adat).',
    hint: 'A repülő a levegőben van: a földrajzi helye mellett a magassága is fontos!',
    breakdown: [
      { label: '1. adat', value: 'Szélességi fok' },
      { label: '2. adat', value: 'Hosszúsági fok' },
      { label: '3. adat', value: 'Repülési magasság (z)' }
    ]
  },
  {
    id: 'soq1-5',
    level: 1,
    prompt: 'Mi a térbeli koordináta-rendszer három tengelyének közös metszéspontja, az origó koordinátája?',
    options: [
      'O(0; 0; 0)',
      'O(1; 1; 1)',
      'O(0; 0)',
      'O(-1; -1; -1)'
    ],
    correctAnswer: 0,
    explanation: 'A 3D térbeli koordináta-rendszer origója a kiindulópont, ahol mindhárom tengely értéke nulla: O(0; 0; 0).',
    hint: '3 tengely metszéspontjában mindhárom szám nulla.',
    breakdown: [
      { label: 'Origó térben', value: 'O(0; 0; 0)' },
      { label: 'x = 0, y = 0, z = 0', value: 'A mérések kezdete' }
    ]
  },
  {
    id: 'soq1-6',
    level: 1,
    prompt: 'Melyik nevezetes szélességi kör választja ketté a Földet Északi és Déli félgömbre?',
    options: [
      'Az Egyenlítő (0° szélességi kör)',
      'A Kezdő délkör',
      'A Ráktérítő',
      'Az Északi sarkkör'
    ],
    correctAnswer: 0,
    explanation: 'Az Egyenlítő a Föld legszélesebb körvonala, a 0°-os szélességi kör, amely pontosan egyenlő távolságra van mindkét sarktól, és kettéosztja a Földet Északi és Déli félgömbre.',
    hint: 'A neve is mutatja: egyenlő részekre osztja a bolygót.',
    breakdown: [
      { label: 'Neve', value: 'Egyenlítő' },
      { label: 'Foka', value: '0° szélesség' },
      { label: 'Felosztás', value: 'Északi és Déli félgömb' }
    ]
  },
  {
    id: 'soq1-7',
    level: 1,
    prompt: 'Hol halad át a nemzetközi megállapodás szerinti kezdő délkör (0° hosszúsági kör)?',
    options: [
      'London mellett, a Greenwich-i Királyi Csillagvizsgálón',
      'Párizson',
      'Budapesten a Gellért-hegynél',
      'Washingtonban'
    ],
    correctAnswer: 0,
    explanation: '1884-ben nemzetközi egyezmény rögzítette, hogy a londoni Greenwich csillagvizsgálón áthaladó hosszúsági kör a 0°-os kezdő délkör. Ettől mérjük a keleti és nyugati hosszúságot.',
    hint: 'A londoni híres csillagvizsgáló neve Greenwich.',
    breakdown: [
      { label: 'Kezdő délkör', value: '0° hosszúság' },
      { label: 'Helyszín', value: 'Greenwich (London, Egyesült Királyság)' }
    ]
  },
  {
    id: 'soq1-8',
    level: 1,
    prompt: 'Milyen határok között változhat az északi szélesség értéke a Földön az Egyenlítőtől kiindulva?',
    options: [
      '0°-tól 90°-ig (az Északi-sarkig)',
      '0°-tól 180°-ig',
      '0°-tól 360°-ig',
      '0°-tól 45°-ig'
    ],
    correctAnswer: 0,
    explanation: 'A szélességi fokok az Egyenlítőtől (0°) az Északi-sarkig (90°) tartanak. Ez a Föld negyedköre, pontosan 90 fok.',
    hint: 'A sarkpont a derékszögnek megfelelő 90 foknál van.',
    breakdown: [
      { label: 'Egyenlítő', value: '0°' },
      { label: 'Északi-sark', value: 'É. sz. 90°' }
    ]
  },
  {
    id: 'soq1-9',
    level: 1,
    prompt: 'Milyen határok között változhat a hosszúsági fokok értéke a kezdő délkörtől keletre vagy nyugatra haladva?',
    options: [
      '0°-tól 180°-ig (a Föld túlsó oldaláig)',
      '0°-tól 90°-ig',
      '0°-tól 100°-ig',
      '0°-tól 45°-ig'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a teljes kör 360 fok, a kezdő délkörtől mindkét irányban (keletre és nyugatra) pontosan félkörnyi, azaz 180 foknyi távolságra juthatunk el a túlsó oldalig.',
    hint: 'A teljes kör fele: 360 / 2 = 180 fok.',
    breakdown: [
      { label: 'Keleti hosszúság', value: '0°-tól 180°-ig' },
      { label: 'Nyugati hosszúság', value: '0°-tól 180°-ig' },
      { label: 'Összesen körben', value: '360°' }
    ]
  },
  {
    id: 'soq1-10',
    level: 1,
    prompt: 'Mit jelent pontosan az, hogy egy hegycsúcs (pl. Kékes-tető) magassága +1014 méter?',
    options: [
      'A tenger szintjéhez viszonyítva 1014 méterrel van magasabban',
      'A hegy lábától mérve 1014 méter',
      'Budapesthez képest 1014 méter',
      'A Föld középpontjától 1014 méter'
    ],
    correctAnswer: 0,
    explanation: 'A tengerszint feletti magasság (abszolút magasság) a világóceánok átlagos szintjét tekinti nulla méternek. A Kékes-tető 1014 méterrel van a tengerszint felett.',
    hint: 'A világon a tenger szintje a magasságmérés egységes nulla pontja.',
    breakdown: [
      { label: 'Bázisszint', value: 'Tengerszint (0 m)' },
      { label: 'Magasság', value: '+1014 m tengerszint felett' }
    ]
  },

  // =========================================================================
  // 2. SZINT: FÖLDRAJZI FOKHÁLÓZAT ÉS HELYMEGHATÁROZÁS (11-20)
  // =========================================================================
  {
    id: 'soq2-1',
    level: 2,
    prompt: 'Budapest koordinátái kerekítve: É. sz. 47,5° és K. h. 19,0°. Melyik két félgömbön helyezkedik el a magyar főváros?',
    options: [
      'Az Északi és a Keleti félgömbön',
      'Az Északi és a Nyugati félgömbön',
      'A Déli és a Keleti félgömbön',
      'A Déli és a Nyugati félgömbön'
    ],
    correctAnswer: 0,
    explanation: 'Az É. sz. (Északi szélesség) azt jelenti, hogy az Egyenlítőtől északra van (Északi félgömb). A K. h. (Keleti hosszúság) azt jelenti, hogy Greenwich-től keletre van (Keleti félgömb).',
    hint: 'É. sz. = Északi félgömb, K. h. = Keleti félgömb.',
    breakdown: [
      { label: 'É. sz. 47,5°', value: 'Északi félgömb' },
      { label: 'K. h. 19,0°', value: 'Keleti félgömb' },
      { label: 'Fekvés', value: 'Észak-keleti negyed' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-30 -30 60 60">
        <circle cx="0" cy="0" r="25" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <line x1="-25" y1="0" x2="25" y2="0" stroke="#ef4444" strokeWidth="1" />
        <line x1="0" y1="-25" x2="0" y2="25" stroke="#2563eb" strokeWidth="1" />
        <circle cx="5" cy="-12" r="3" fill="#0d9488" />
        <text x="8" y="-14" className="text-[6px] font-black fill-teal-900">Budapest</text>
        <text x="14" y="-18" className="text-[7px] font-bold fill-slate-400">É-K</text>
      </svg>
    )
  },
  {
    id: 'soq2-2',
    level: 2,
    prompt: 'Melyik világváros fekszik közvetlenül az Egyenlítő mellett (szélessége kb. 0°)?',
    options: [
      'Quito (Ecuador fővárosa Dél-Amerikában)',
      'London (Egyesült Királyság)',
      'Kairó (Egyiptom)',
      'Sydney (Ausztrália)'
    ],
    correctAnswer: 0,
    explanation: 'Quito, Ecuador fővárosa szinte pontosan az Egyenlítő vonalán fekszik (D. sz. 0,2°). Maga az „Ecuador” ország neve is Egyenlítőt jelent spanyolul!',
    hint: 'Az ország neve: Ecuador, ami spanyolul Egyenlítőt jelent.',
    breakdown: [
      { label: 'Város', value: 'Quito (Ecuador)' },
      { label: 'Szélességi fok', value: '0° (Egyenlítő)' }
    ]
  },
  {
    id: 'soq2-3',
    level: 2,
    prompt: 'Ha egy hajó koordinátái D. sz. 25° és Ny. h. 40°, melyik félgömbökön hajózik az óceánon?',
    options: [
      'A Déli és a Nyugati félgömbön',
      'Az Északi és a Keleti félgömbön',
      'A Déli és a Keleti félgömbön',
      'Az Északi és a Nyugati félgömbön'
    ],
    correctAnswer: 0,
    explanation: 'A D. sz. (Déli szélesség) az Egyenlítőtől délre eső félgömböt, a Ny. h. (Nyugati hosszúság) a Greenwich-től nyugatra eső félgömböt jelöli: Déli és Nyugati félgömb.',
    hint: 'D = Déli, Ny = Nyugati.',
    breakdown: [
      { label: 'D. sz. 25°', value: 'Déli félgömb' },
      { label: 'Ny. h. 40°', value: 'Nyugati félgömb' }
    ]
  },
  {
    id: 'soq2-4',
    level: 2,
    prompt: 'Melyik pont a Föld legészakibb pontja, és mekkora a szélességi foka?',
    options: [
      'Északi-sark, koordinátája: É. sz. 90°',
      'Egyenlítő, koordinátája: 0°',
      'Déli-sark, koordinátája: D. sz. 90°',
      'Greenwich, koordinátája: 0°'
    ],
    correctAnswer: 0,
    explanation: 'A Föld forgástengelyének északi végpontja az Északi-sark, amely pontosan 90 fokos északi szélességen található. Itt minden irány dél felé mutat!',
    hint: 'A legtávolabbi északi pont a 90 fokos Északi-sark.',
    breakdown: [
      { label: 'Helyszín', value: 'Északi-sark' },
      { label: 'Szélesség', value: 'É. sz. 90°' }
    ]
  },
  {
    id: 'soq2-5',
    level: 2,
    prompt: 'Milyen tengerszint feletti magasság tartozik egy búvárhoz, aki a tenger felszíne alatt 25 méter mélyen úszik?',
    options: [
      '-25 méter (negatív tengerszint feletti magasság)',
      '+25 méter',
      '0 méter',
      '-250 méter'
    ],
    correctAnswer: 0,
    explanation: 'A tengerszint a 0 méter. Mivel a búvár a tengerszint alatt tartózkodik, a magassága negatív számként írható le: -25 méter.',
    hint: 'A nulla szint alatti magasságok negatív előjelet kapnak.',
    breakdown: [
      { label: 'Tengerszint', value: '0 m' },
      { label: '25 m víz alatt', value: '-25 m' }
    ]
  },
  {
    id: 'soq2-6',
    level: 2,
    prompt: 'Mi a Greenwich-i kezdő délkörrel (0°) pontosan szemközti hosszúsági kör foka és nemzetközi szerepe?',
    options: [
      '180° hosszúsági kör – itt húzódik a nemzetközi dátumválasztó vonal',
      '90° hosszúsági kör – az Egyenlítő felezője',
      '360° hosszúsági kör – a nulla pont',
      '45° hosszúsági kör – az időzónák közepe'
    ],
    correctAnswer: 0,
    explanation: 'A 0°-os Greenwich-i délkörrel pontosan szemközt, a Föld túlsó oldalán a 180°-os délkör található a Csendes-óceánon. Itt húzódik a nemzetközi dátumválasztó vonal.',
    hint: 'A 0° ellentettje a 360 fokos körön: 180 fok.',
    breakdown: [
      { label: 'Foka', value: '180° hosszúság' },
      { label: 'Szerepe', value: 'Dátumválasztó vonal' }
    ]
  },
  {
    id: 'soq2-7',
    level: 2,
    prompt: 'Melyik állítás IGAZ a szélességi körökre a Földgömbön?',
    options: [
      'Egymással párhuzamos körök, és a sarkok felé haladva egyre kisebb a kerületük',
      'Minden szélességi kör áthalad az Északi-sarkon',
      'Minden szélességi kör ugyanolyan hosszú',
      'A szélességi körök függőlegesen állnak'
    ],
    correctAnswer: 0,
    explanation: 'A szélességi körök párhuzamosak egymással (parallelek). A leghosszabb az Egyenlítő, és északra vagy délre haladva a körök egyre szűkülnek, míg a sarkoknál ponttá zsugorodnak.',
    hint: 'Gondolj egy felszeletelt narancsra: a közepe a legnagyobb kör, a tetején már egészen kicsi!',
    breakdown: [
      { label: 'Irányuk', value: 'Párhuzamosak az Egyenlítővel' },
      { label: 'Hosszuk', value: 'A sarkok felé csökken' }
    ]
  },
  {
    id: 'soq2-8',
    level: 2,
    prompt: 'Melyik állítás IGAZ a hosszúsági körökre (délkörökre)?',
    options: [
      'Mindegyik délkör áthalad mindkét sarkponton, és a hosszuk teljesen egyforma',
      'Egymással teljesen párhuzamosak',
      'A sarkoknál a legtávolabb vannak egymástól',
      'Csak az északi félgömbön léteznek'
    ],
    correctAnswer: 0,
    explanation: 'Minden hosszúsági kör az Északi-sarktól a Déli-sarkig tartó félkör (meridián). Mivel mindegyik a sarkokat köti össze, azonos hosszúak, és a sarkoknál összefutnak.',
    hint: 'Gondolj a földgömb hosszanti szeleteire: a sarkoknál mind találkoznak!',
    breakdown: [
      { label: 'Kezdet és vég', value: 'Északi és Déli sarkpont' },
      { label: 'Hosszuk', value: 'Mindegyik azonos hosszúságú' }
    ]
  },
  {
    id: 'soq2-9',
    level: 2,
    prompt: 'Ha egy repülőgép Budapestről (É. sz. 47,5°; K. h. 19°) pontosan DÉL felé repül egyenesen, melyik koordinátája változik folyamatosan?',
    options: [
      'A szélességi foka (csökken az északi szélessége, közeledik a 0°-os Egyenlítőhöz)',
      'A hosszúsági foka',
      'Mindkét koordinátája egyszerre változik',
      'Egyik sem változik'
    ],
    correctAnswer: 0,
    explanation: 'Ha pontosan dél felé halad egy délkör mentén, a hosszúsága változatlanul K. h. 19° marad, miközben a szélességi foka folyamatosan csökken az Egyenlítő felé haladva.',
    hint: 'Dél felé haladva a délkörön maradsz, csak a szélességed változik.',
    breakdown: [
      { label: 'Hosszúság', value: 'Állandó (K. h. 19°)' },
      { label: 'Szélesség', value: 'Folyamatosan csökken dél felé' }
    ]
  },
  {
    id: 'soq2-10',
    level: 2,
    prompt: 'Egy hegymászó 2400 méter tengerszint feletti magasságról felmászik egy 3150 méteres menedékházhoz. Hány métert emelkedett a függőleges z-tengely mentén?',
    options: [
      '750 métert',
      '650 métert',
      '5550 métert',
      '1150 métert'
    ],
    correctAnswer: 0,
    explanation: 'A magasságváltozás a két magasság különbsége: 3150 m - 2400 m = 750 méter emelkedés.',
    hint: 'Vond ki a kiindulási magasságot a célmagasságból: 3150 - 2400 = ?',
    breakdown: [
      { label: 'Kezdő magasság', value: '2400 m' },
      { label: 'Cél magasság', value: '3150 m' },
      { label: 'Emelkedés', value: '3150 - 2400 = 750 m' }
    ]
  },

  // =========================================================================
  // 3. SZINT: TÉRBELI KOORDINÁTÁK ÉS KOCKAÉPÍTMÉNYEK (21-30)
  // =========================================================================
  {
    id: 'soq3-1',
    level: 3,
    prompt: 'Egy térbeli pont koordinátája P(3; 2; 4). Milyen magasan helyezkedik el a pont a vízszintes alapsík (padlószint) felett?',
    options: [
      '4 egység magasan (a z koordináta értéke)',
      '3 egység magasan',
      '2 egység magasan',
      '9 egység magasan'
    ],
    correctAnswer: 0,
    explanation: 'A térbeli koordináták szokásos sorrendje: P(x; y; z), ahol z jelöli a függőleges magasságot. Így a z = 4 azt jelenti, hogy a pont 4 egység magasan van a padló felett.',
    hint: 'A harmadik szám a z koordináta, amely a magasságot mutatja.',
    breakdown: [
      { label: 'Szélesség (x)', value: '3' },
      { label: 'Mélység (y)', value: '2' },
      { label: 'Magasság (z)', value: '4 egység' }
    ],
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="-20 -40 60 50">
        <line x1="0" y1="5" x2="0" y2="-30" stroke="#0d9488" strokeWidth="1.5" />
        <line x1="0" y1="5" x2="25" y2="18" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="0" y1="5" x2="-20" y2="16" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="12" cy="-15" r="3" fill="#0d9488" />
        <line x1="12" y1="9" x2="12" y2="-15" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="16" y="-14" className="text-[7px] font-black fill-teal-900">P(3; 2; 4)</text>
        <text x="16" y="-2" className="text-[6px] fill-teal-700">z = 4</text>
      </svg>
    )
  },
  {
    id: 'soq3-2',
    level: 3,
    prompt: 'Egy kockaépítmény alaprajza (felülnézete) a rácshálón melyik két koordinátát ábrázolja?',
    options: [
      'A szélességet (x) és a mélységet (y)',
      'A szélességet (x) és a magasságot (z)',
      'A mélységet (y) és a magasságot (z)',
      'Csak a magasságot'
    ],
    correctAnswer: 0,
    explanation: 'Fentről lefelé nézve a vízszintes padlósíkot látjuk: a szélességi (x) és a mélységi (y) elrendezést. A magasságot (z) ebben a nézetben számokkal szoktuk beleírni a négyzetekbe.',
    hint: 'Fentről a padlót látod: x és y irányok.',
    breakdown: [
      { label: 'Nézet', value: 'Felülnézet (alaprajz)' },
      { label: 'Tengelyek', value: 'x (szélesség) és y (mélység)' }
    ]
  },
  {
    id: 'soq3-3',
    level: 3,
    prompt: 'Egy kockaépítmény elölnézetéből melyik két koordináta határozza meg a látható formát?',
    options: [
      'A szélesség (x) és a magasság (z)',
      'A mélység (y) és a magasság (z)',
      'A szélesség (x) és a mélység (y)',
      'Mind a három egyszerre'
    ],
    correctAnswer: 0,
    explanation: 'Közvetlenül szemből nézve látjuk az építmény vízszintes kiterjedését (x szélesség) és az oszlopok maximális magasságát (z magasság). A mélység nem látszik közvetlenül.',
    hint: 'Szemből nézel egy házat: látod a szélességét és a magasságát.',
    breakdown: [
      { label: 'Nézet', value: 'Elölnézet' },
      { label: 'Tengelyek', value: 'x (szélesség) és z (magasság)' }
    ]
  },
  {
    id: 'soq3-4',
    level: 3,
    prompt: 'Egy kockaépítmény oldalnézetéből melyik két koordináta határozza meg a látható formát?',
    options: [
      'A mélység (y) és a magasság (z)',
      'A szélesség (x) és a magasság (z)',
      'A szélesség (x) és a mélység (y)',
      'Csak a magasság'
    ],
    correctAnswer: 0,
    explanation: 'Oldalról (balról vagy jobbról) nézve a test mélységét (y koordináta) és az emeletek magasságát (z koordináta) látjuk.',
    hint: 'Oldalról látod, milyen mély és milyen magas az építmény.',
    breakdown: [
      { label: 'Nézet', value: 'Oldalnézet' },
      { label: 'Tengelyek', value: 'y (mélység) és z (magasság)' }
    ]
  },
  {
    id: 'soq3-5',
    level: 3,
    prompt: 'Egy kockaépítményben az (1; 2) padlómezőn 3 darab kocka van egymásra helyezve. Mik a legfelső kocka középpontjának koordinátái, ha a szintek rendre z = 1, 2, 3?',
    options: [
      '(1; 2; 3)',
      '(3; 1; 2)',
      '(1; 2; 1)',
      '(3; 3; 3)'
    ],
    correctAnswer: 0,
    explanation: 'A kocka alapja az (1; 2) mezőn van, tehát x = 1 és y = 2. Mivel a 3. szinten (legfelül) van, z = 3. A koordináta: (1; 2; 3).',
    hint: 'A talajmező (1; 2), a magassága pedig 3.',
    breakdown: [
      { label: 'x koordináta', value: '1' },
      { label: 'y koordináta', value: '2' },
      { label: 'z magasság', value: '3 (3. szint)' },
      { label: 'Pont', value: '(1; 2; 3)' }
    ]
  },
  {
    id: 'soq3-6',
    level: 3,
    prompt: 'Melyik térbeli pont fekszik közvetlenül a vízszintes alapsíkon (a padlószinten)?',
    options: [
      'P(4; 5; 0)',
      'Q(4; 0; 5)',
      'R(0; 4; 5)',
      'S(4; 5; 2)'
    ],
    correctAnswer: 0,
    explanation: 'A padlószinten a magasság értéke nulla: z = 0. A P(4; 5; 0) pontban z = 0, így ez pontosan az alapsíkon fekszik.',
    hint: 'Ha a harmadik szám (z) nulla, a pont a padlón fekszik.',
    breakdown: [
      { label: 'Szabály', value: 'z = 0 az alapsíkon' },
      { label: 'Pont', value: 'P(4; 5; 0)' }
    ]
  },
  {
    id: 'soq3-7',
    level: 3,
    prompt: 'Melyik térbeli pont fekszik a függőleges magassági z-tengelyen?',
    options: [
      'A(0; 0; 6)',
      'B(6; 0; 0)',
      'C(0; 6; 0)',
      'D(6; 6; 6)'
    ],
    correctAnswer: 0,
    explanation: 'A függőleges magassági tengelyen fekvő pontoknak sem szélességi (x = 0), sem mélységi (y = 0) elmozdulásuk sincs: alakjuk (0; 0; z). Így az A(0; 0; 6) a z-tengelyen van.',
    hint: 'A z-tengelyen x = 0 és y = 0.',
    breakdown: [
      { label: 'x érték', value: '0' },
      { label: 'y érték', value: '0' },
      { label: 'z érték', value: '6' },
      { label: 'Pont', value: 'A(0; 0; 6)' }
    ]
  },
  {
    id: 'soq3-8',
    level: 3,
    prompt: 'Két térbeli pont: A(2; 3; 1) és B(2; 3; 7). Milyen egyenesen fekszenek, és mekkora a távolságuk egymástól?',
    options: [
      'Függőleges egyenesen fekszenek, távolságuk 6 egység',
      'Vízszintes egyenesen fekszenek, távolságuk 5 egység',
      'Függőleges egyenesen fekszenek, távolságuk 8 egység',
      'Átlós egyenesen fekszenek, távolságuk 7 egység'
    ],
    correctAnswer: 0,
    explanation: 'Mindkét pontban az x = 2 és y = 3 azonos, csak a magasságuk tér el: ez egy függőleges szakasz. A távolságuk: 7 - 1 = 6 egység.',
    hint: 'Az x és y azonos, csak z változik (függőleges oszlop). Távolság: 7 - 1 = 6.',
    breakdown: [
      { label: 'Közös pont a padlón', value: '(2; 3)' },
      { label: 'Irány', value: 'Függőleges' },
      { label: 'Távolság', value: '7 - 1 = 6 egység' }
    ]
  },
  {
    id: 'soq3-9',
    level: 3,
    prompt: 'Egy téglatest alakú tanterem méretei: 6 m széles (x), 8 m hosszú (y) és 3 m magas (z). Ha a terem egyik alsó sarka az origó (0; 0; 0), mik a vele átellenes felső sarok koordinátái?',
    options: [
      '(6; 8; 3)',
      '(3; 8; 6)',
      '(8; 6; 3)',
      '(6; 3; 8)'
    ],
    correctAnswer: 0,
    explanation: 'Az origóból indulva a szélesség mentén 6 métert (x = 6), a hosszúság mentén 8 métert (y = 8) és a magasság mentén 3 métert (z = 3) kell lépnünk a túlsó felső sarokig: (6; 8; 3).',
    hint: 'A három méret sorban megadja a három koordinátát: (szélesség; hosszúság; magasság).',
    breakdown: [
      { label: 'x (szélesség)', value: '6 m' },
      { label: 'y (hosszúság)', value: '8 m' },
      { label: 'z (magasság)', value: '3 m' },
      { label: 'Csúcs', value: '(6; 8; 3)' }
    ]
  },
  {
    id: 'soq3-10',
    level: 3,
    prompt: 'Miért szükséges a valóságban legalább 4 GPS műhold jele a pontos térbeli navigációhoz a Földön?',
    options: [
      'Mert a 3 térbeli koordináta (szélesség, hosszúság, magasság) mellett az időeltérést (4. adat) is pontosítani kell',
      'Mert minden égtájhoz külön műhold kell',
      'Mert a műholdak fele mindig meghibásodik',
      'Mert 4 síknegyed van a Földön'
    ],
    correctAnswer: 0,
    explanation: 'A GPS vevő nemcsak a 3 térbeli koordinátát (x, y, z) számolja ki a távolságokból, hanem az órája pontatlanságát (idő, mint 4. dimenzió) is korrigálnia kell a műholdak atomóráihoz képest.',
    hint: '3 adat a térbeli helyhez, 1 adat a pontos idő szinkronizálásához kell.',
    breakdown: [
      { label: '3 koordináta', value: 'Szélesség, Hosszúság, Magasság' },
      { label: '4. adat', value: 'Idő szinkronizáció' },
      { label: 'Műholdak száma', value: 'Legalább 4 műhold' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'A Dimenziók Rendszere',
      badge: 'DIMENZIÓK',
      description: '1D (vonal): 1 koordináta (pl. kilométerkő). 2D (sík): 2 koordináta (x; y). 3D (tér): 3 koordináta (x; y; z: szélesség, hosszúság, magasság).',
      formula: '1D: (x) \\quad | \\quad 2D: (x; y) \\quad | \\quad 3D: (x; y; z)',
      note: 'A térbeli origó: O(0; 0; 0).'
    },
    {
      id: 'cs1-2',
      title: 'Fokhálózat Alapvonalai',
      badge: 'FOKHÁLÓZAT',
      description: 'Egyenlítő: 0° szélességi kör (Északi és Déli félgömb). Kezdő délkör: 0° hosszúsági kör Greenwichnél (Keleti és Nyugati félgömb).',
      note: 'Északi-sark: É. sz. 90°. Déli-sark: D. sz. 90°.'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'Szélességi és Hosszúsági Körök',
      badge: 'GÖMBKOORDINÁTÁK',
      description: 'Szélességi körök (É/D): 0°-tól 90°-ig. Hosszúsági körök (K/Ny): 0°-tól 180°-ig.',
      formula: '\\text{Budapest: É. sz. } 47,5^\\circ, \\quad \\text{K. h. } 19,0^\\circ',
      note: 'A 180°-os délkör a dátumválasztó vonal a Csendes-óceánon.'
    },
    {
      id: 'cs2-2',
      title: 'Tengerszint Feletti Magasság',
      badge: 'MAGASSÁG',
      description: 'Tengerszint = 0 méter. Tengerszint felett: pozitív szám (pl. hegyek: +1014 m). Tengerszint alatt: negatív szám (pl. tengerfenék: -25 m).',
      note: 'A GPS legalább 4 műhold jelével határozza meg a pontos 3D pozíciót és időt.'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Kockaépítmények Három Nézete',
      badge: '3D NÉZETEK',
      description: 'Felülnézet (alaprajz): x szélesség és y mélység. Elölnézet: x szélesség és z magasság. Oldalnézet: y mélység és z magasság.',
      formula: '\\text{Felül: } (x; y) \\quad | \\quad \\text{Elöl: } (x; z) \\quad | \\quad \\text{Oldal: } (y; z)',
      note: 'Az alapsíkon (padlón) lévő pontoknál z = 0.'
    },
    {
      id: 'cs3-2',
      title: 'Térbeli Pontok Távolsága',
      badge: 'TÁVOLSÁG',
      description: 'Függőleges szakasz: x és y azonos, hossza: |z₂ - z₁|. Vízszintes szakasz: z azonos.',
      note: 'Egy téglatest alakú szoba átellenes csúcsai: (0; 0; 0) és (a; b; c).'
    }
  ]
};

export const SpatialOrientationQuiz: React.FC<SpatialOrientationQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-spatial-quiz"
      title="Tájékozódás síkban és térben kvíz"
      subtitle="30 feladat 3 szinten: dimenziók, földrajzi fokhálózat, tengerszint feletti magasság és 3D kockamodellek"
      questions={SPATIAL_ORIENTATION_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-spatial-orientation-quiz"
      storageKey="g5-loc-spatial-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={SpatialOrientationMatcher}
      sorterComponent={SpatialOrientationSorter}
    />
  );
};
