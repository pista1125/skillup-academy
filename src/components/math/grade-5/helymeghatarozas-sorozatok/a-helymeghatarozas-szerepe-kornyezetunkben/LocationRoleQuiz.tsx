import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { LocationRoleMatcher } from './LocationRoleMatcher';
import { LocationRoleSorter } from './LocationRoleSorter';

export interface LocationRoleQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const LOCATION_ROLE_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, FŐ ÉGTÁJAK ÉS MINDENNAPI CÍMZÉS (1-10)
  // =========================================================================
  {
    id: 'lrq1-1',
    level: 1,
    prompt: 'Mi a helymeghatározás (tájékozódás) legfőbb célja a mindennapi életben?',
    options: [
      'Hogy egyértelműen és félreérthetetlenül meg tudjuk adni, hol található egy személy, tárgy vagy épület',
      'Hogy megmérjük egy tárgy súlyát vagy térfogatát',
      'Hogy kiszámoljuk egy utazás pontos költségét',
      'Hogy kizárólag a térkép rajzolását gyakoroljuk'
    ],
    correctAnswer: 0,
    explanation: 'A helymeghatározás célja, hogy rögzített megállapodások és viszonyítási pontok alapján bárki pontosan megtalálja a keresett helyszínt (pl. a postás a házat, a mentő a beteget).',
    hint: 'Gondolj arra, miért mondasz címet, ha rendelést vársz!',
    breakdown: [
      { label: 'Cél', value: 'Egyértelmű megtalálhatóság' },
      { label: 'Alapfeltétel', value: 'Közös megállapodás és viszonyítás' }
    ]
  },
  {
    id: 'lrq1-2',
    level: 1,
    prompt: 'Mit nevezünk viszonyítási pontnak (a matematikában gyakran origónak)?',
    options: [
      'Azt a rögzített kiindulási pontot vagy tárgyat, amelyhez képest megadjuk a helyzetet és a távolságot',
      'A Föld legmagasabb hegycsúcsát',
      'A térkép méretarányát',
      'A legközelebbi buszmegállót'
    ],
    correctAnswer: 0,
    explanation: 'Egy helyzetet önmagában nem tudunk leírni, csak valamihez képest. A viszonyítási pont a kiindulási alap (pl. „a templomtól 100 m-re”).',
    hint: 'Képzeld el, hogy a barátodnak elmagyarázod: „a szökőkútnál találkozunk, attól balra gyere”. Mi volt a kiindulópont?',
    figure: (
      <svg className="w-48 h-32 mx-auto" viewBox="0 0 200 120">
        <rect x="10" y="10" width="180" height="100" rx="10" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" />
        <circle cx="100" cy="60" r="16" fill="#8b5cf6" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="2" />
        <text x="100" y="66" textAnchor="middle" fontSize="16">⛲</text>
        <text x="100" y="95" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9">Viszonyítási pont (Origó)</text>
        <path d="M 120 60 L 160 60" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="165" cy="60" r="4" fill="#ef4444" />
        <text x="165" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">Cél</text>
      </svg>
    )
  },
  {
    id: 'lrq1-3',
    level: 1,
    prompt: 'Melyik a 4 alapvető fő égtáj?',
    options: [
      'Észak (É), Kelet (K), Dél (D), Nyugat (Ny)',
      'Északkelet, Délkelet, Délnyugat, Északnyugat',
      'Fent, Lent, Jobbra, Balra',
      'Elöl, Hátul, Közel, Távol'
    ],
    correctAnswer: 0,
    explanation: 'A négy fő égtáj: Észak (0°), Kelet (90°), Dél (180°) és Nyugat (270°). A „fent-lent-jobbra-balra” csak a nézőponttól függ, nem állandó égtájak!',
    hint: 'Az iránytű 4 fő betűjét keresd: É, K, D, Ny!',
    figure: (
      <svg className="w-36 h-36 mx-auto" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="55" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="70" y1="20" x2="70" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="20" y1="70" x2="120" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="70" y="28" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#dc2626">É</text>
        <text x="122" y="74" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#0f172a">K</text>
        <text x="70" y="120" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#2563eb">D</text>
        <text x="18" y="74" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#0f172a">Ny</text>
      </svg>
    )
  },
  {
    id: 'lrq1-4',
    level: 1,
    prompt: 'A térképeken a nemzetközi megállapodás szerint hagyományosan melyik irány mutat felfelé?',
    options: [
      'Észak',
      'Dél',
      'Kelet',
      'Nyugat'
    ],
    correctAnswer: 0,
    explanation: 'A térképeken hagyományosan az északi irány mutat a lap teteje (felfelé) felé. Emiatt a jobb oldal a Kelet, a bal oldal a Nyugat, a lap alja pedig a Dél.',
    hint: 'Gondolj a térképek sarkában lévő észak-nyílra (N vagy É betű felül)!',
    breakdown: [
      { label: 'Térkép teteje', value: 'Észak (felfelé)' },
      { label: 'Térkép alja', value: 'Dél (lefelé)' },
      { label: 'Térkép jobb oldala', value: 'Kelet' },
      { label: 'Térkép bal oldala', value: 'Nyugat' }
    ]
  },
  {
    id: 'lrq1-5',
    level: 1,
    prompt: 'Melyik égtáj felől kél fel a Nap reggelente a Föld forgása miatt?',
    options: [
      'Kelet',
      'Nyugat',
      'Észak',
      'Dél'
    ],
    correctAnswer: 0,
    explanation: 'A Föld nyugatról kelet felé forog a tengelye körül, ezért úgy látjuk, hogy a Nap a keleti égbolton kél fel, és este nyugaton nyugszik.',
    hint: 'Közmondás: „Keleten kél a Nap, nyugaton nyugszik.”'
  },
  {
    id: 'lrq1-6',
    level: 1,
    prompt: 'Miért szükséges két adat (pl. 4. sor 8. szék) egy mozijegy helyének azonosításához?',
    options: [
      'Mert a nézőtér síkjában több sor is van, így a pusztán megadott székszám több különböző helyet is jelentene',
      'Mert az egyik adat a szék színét, a másik a méretét adja meg',
      'Mert a moziban kötelező ketten menni',
      'Mert a hangmérnöknek is tudnia kell, hol ülünk'
    ],
    correctAnswer: 0,
    explanation: 'A nézőtér egy kétdimenziós felület. Minden sorban van 8-as számú szék, így csak a sorszám (előre-hátra pozíció) és a székszám (jobbra-balra pozíció) együttese határozza meg a helyet egyértelműen.',
    hint: 'Ha csak annyit tudnál: „8-as szék”, tudnád, melyik sorba ülj?',
    figure: (
      <svg className="w-52 h-28 mx-auto" viewBox="0 0 220 110">
        <rect x="5" y="5" width="210" height="100" rx="8" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
        <rect x="35" y="12" width="150" height="6" rx="3" fill="#e11d48" />
        <text x="110" y="27" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#9f1239">VETÍTŐVÁSZON</text>
        {/* Székek sémája */}
        <text x="25" y="52" fontSize="9" fontWeight="bold" fill="#64748b">1. sor</text>
        <text x="25" y="72" fontSize="9" fontWeight="bold" fill="#64748b">2. sor</text>
        <text x="25" y="92" fontSize="9" fontWeight="bold" fill="#be123c">3. sor →</text>
        <circle cx="80" cy="89" r="6" fill="#e2e8f0" stroke="#94a3b8" />
        <circle cx="100" cy="89" r="6" fill="#e2e8f0" stroke="#94a3b8" />
        <circle cx="120" cy="89" r="7" fill="#e11d48" stroke="#be123c" strokeWidth="2" />
        <text x="120" y="92" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">6</text>
        <circle cx="140" cy="89" r="6" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="165" y="92" fontSize="8" fontWeight="bold" fill="#be123c">3. sor 6. szék</text>
      </svg>
    )
  },
  {
    id: 'lrq1-7',
    level: 1,
    prompt: 'Hogyan épül fel a pontos lakcím a legnagyobbtól a legszűkebb helyszínig haladva?',
    options: [
      'Település → Közterület (utca/tér) neve → Házszám → Emelet, ajtó',
      'Házszám → Település → Emelet → Utcanév',
      'Ajtószám → Utcanév → Házszám → Város',
      'Közterület neve → Irányítószám → Ajtószám'
    ],
    correctAnswer: 0,
    explanation: 'A postai címzés szigorú hierarchiát követ: először meghatározza a várost/települést, azon belül a közterületet, azon a telket/házat (házszám), végül a házon belüli lakást (emelet, ajtó).',
    hint: 'Gondolj arra, mit lát a postás a borítékon kívülről befelé haladva!'
  },
  {
    id: 'lrq1-8',
    level: 1,
    prompt: 'Ha észak felé nézel szemből, melyik égtáj van a bal kezed felől?',
    options: [
      'Nyugat',
      'Kelet',
      'Dél',
      'Északkelet'
    ],
    correctAnswer: 0,
    explanation: 'Ha észak felé fordulunk: előttünk van Észak, mögöttünk Dél, a jobb kezünk felől Kelet, a bal kezünk felől pedig Nyugat található.',
    hint: 'A térképen Észak van fent. Melyik égtáj van a térkép bal oldalán?',
    breakdown: [
      { label: 'Előttünk', value: 'Észak' },
      { label: 'Mögöttünk', value: 'Dél' },
      { label: 'Jobb kéz', value: 'Kelet' },
      { label: 'Bal kéz', value: 'Nyugat' }
    ]
  },
  {
    id: 'lrq1-9',
    level: 1,
    prompt: 'A sakktábla mezőinek megadásakor (pl. „e4”) mit jelöl a betű és mit a szám?',
    options: [
      'A betű (a-h) az oszlopot jelöli, a szám (1-8) pedig a sort',
      'A betű a figurát jelöli, a szám a pontszámot',
      'A betű a sort jelöli, a szám az oszlopot',
      'A betű a lépés idejét jelöli percekben'
    ],
    correctAnswer: 0,
    explanation: 'A sakkban az oszlopokat balról jobbra betűkkel (a, b, c, d, e, f, g, h), a sorokat pedig alulról felfelé számokkal (1-8) jelölik. Az „e4” az „e” oszlop és a 4. sor metszéspontja.',
    hint: 'Az „e” egy oszlop az oszlopok sorában, a „4” a 4. vízszintes sor!',
    figure: (
      <svg className="w-32 h-32 mx-auto" viewBox="0 0 120 120">
        <rect x="15" y="15" width="90" height="90" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
        <rect x="15" y="15" width="45" height="45" fill="#cbd5e1" />
        <rect x="60" y="60" width="45" height="45" fill="#cbd5e1" />
        <text x="37" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">d</text>
        <text x="82" y="115" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">e</text>
        <text x="8" y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">4</text>
        <text x="8" y="40" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">5</text>
        <circle cx="82" cy="82" r="10" fill="#ef4444" fillOpacity="0.8" />
        <text x="82" y="86" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">e4</text>
      </svg>
    )
  },
  {
    id: 'lrq1-10',
    level: 1,
    prompt: 'A magyar utcákban a számozási szabály szerint a haladási irányban melyik oldalon találhatók a páros házszámok?',
    options: [
      'A jobb oldalon',
      'A bal oldalon',
      'Véletlenszerűen, ahol éppen üres telek volt',
      'Csak az utca végén'
    ],
    correctAnswer: 0,
    explanation: 'Magyarországon a közterületek házszámozásának általános szabálya, hogy az utca kezdőpontjától indulva a menetirány szerinti jobb oldalon a páros (2, 4, 6...), a bal oldalon pedig a páratlan (1, 3, 5...) számok helyezkednek el.',
    hint: 'A páros számok a jobb kezünk felőli oldalon sorakoznak!',
    breakdown: [
      { label: 'Jobb oldal', value: 'Páros számok (2, 4, 6...)' },
      { label: 'Bal oldal', value: 'Páratlan számok (1, 3, 5...)' }
    ]
  },

  // =========================================================================
  // 2. SZINT: MELLÉK ÉGTÁJAK, TÉRKÉPHÁLÓ ÉS ALKALMAZÁS (11-20)
  // =========================================================================
  {
    id: 'lrq2-1',
    level: 2,
    prompt: 'Az alábbi várostérkép négyzethálóján melyik koordinátájú cellában található a Kórház (🏥)?',
    options: [
      'A5',
      'B2',
      'C3',
      'E5'
    ],
    correctAnswer: 0,
    explanation: 'A Kórház (🏥) az „A” oszlopban és az 5. sorban helyezkedik el, ezért a koordinátája A5.',
    hint: 'Nézd meg a kórház függőleges oszlopának betűjét balról és a sorának számát bal szélen!',
    figure: (
      <svg className="w-52 h-44 mx-auto" viewBox="0 0 200 160">
        <rect x="25" y="15" width="160" height="130" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        {/* Rácsvonalak */}
        <line x1="65" y1="15" x2="65" y2="145" stroke="#cbd5e1" strokeDasharray="2 2" />
        <line x1="105" y1="15" x2="105" y2="145" stroke="#cbd5e1" strokeDasharray="2 2" />
        <line x1="145" y1="15" x2="145" y2="145" stroke="#cbd5e1" strokeDasharray="2 2" />
        <line x1="25" y1="55" x2="185" y2="55" stroke="#cbd5e1" strokeDasharray="2 2" />
        <line x1="25" y1="95" x2="185" y2="95" stroke="#cbd5e1" strokeDasharray="2 2" />
        {/* Fejlécek */}
        <text x="45" y="10" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">A</text>
        <text x="85" y="10" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">B</text>
        <text x="125" y="10" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">C</text>
        <text x="165" y="10" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">D</text>
        <text x="15" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">5</text>
        <text x="15" y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">4</text>
        <text x="15" y="118" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">3</text>
        {/* Kórház az A5 mezőben */}
        <rect x="30" y="20" width="30" height="30" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="45" y="41" textAnchor="middle" fontSize="18">🏥</text>
      </svg>
    )
  },
  {
    id: 'lrq2-2',
    level: 2,
    prompt: 'Melyik mellék égtáj található pontosan Észak és Kelet között, 45 fokos szögben?',
    options: [
      'Északkelet (ÉK)',
      'Északnyugat (ÉNy)',
      'Délkelet (DK)',
      'Délnyugat (DNy)'
    ],
    correctAnswer: 0,
    explanation: 'Észak (0°) és Kelet (90°) között pontosan félúton az Északkelet (ÉK, 45°) mellék égtáj található.',
    hint: 'A két szomszédos fő égtáj nevét rakd össze: Észak + Kelet = ?'
  },
  {
    id: 'lrq2-3',
    level: 2,
    prompt: 'Melyik égtájat jelöli a „DK” rövidítés a szélrózsán?',
    options: [
      'Délkelet (135°)',
      'Délnyugat (225°)',
      'Északkelet (45°)',
      'Déli Kereszt'
    ],
    correctAnswer: 0,
    explanation: 'A DK a Délkelet rövidítése, amely Kelet (90°) és Dél (180°) között, 135°-nál található.',
    hint: 'D = Dél, K = Kelet.'
  },
  {
    id: 'lrq2-4',
    level: 2,
    prompt: 'A várostérképen az Iskola a C2 mezőben, a Park pedig a C5 mezőben van. Milyen irányban kell haladnod az Iskolától, hogy eljuss a Parkhoz?',
    options: [
      'Észak felé (felfelé ugyanabban az oszlopban)',
      'Dél felé (lefelé)',
      'Kelet felé (jobbra)',
      'Nyugat felé (balra)'
    ],
    correctAnswer: 0,
    explanation: 'Mindkét hely a „C” oszlopban található, így vízszintesen nem kell elmozdulni. A sorok 2-ről 5-re nőnek (lentről felfelé), ami a térképen az északi irány.',
    hint: 'Ugyanabban az oszlopban a 2. sorból az 5. sorba felfelé mész. Merre mutat a térkép teteje?',
    breakdown: [
      { label: 'Kiindulás', value: 'C2 mező' },
      { label: 'Cél', value: 'C5 mező' },
      { label: 'Elmozdulás', value: '3 mező felfelé (Északra)' }
    ]
  },
  {
    id: 'lrq2-5',
    level: 2,
    prompt: 'Hogyan működik a mágneses iránytű?',
    options: [
      'A szabadon forgó mágnestű beáll a Föld mágneses erővonalai mentén, megjelölt (piros) hegye Észak felé mutat',
      'A beépített elem elektronikus fényt bocsát ki a legközelebbi város felé',
      'A levegő páratartalma forgatja el a mutatót',
      'A Nap sugárzását követi, mint a napraforgó'
    ],
    correctAnswer: 0,
    explanation: 'A Földnek saját mágneses tere van (olyan, mint egy hatalmas mágnes). Az iránytűben lévő mágnestű beáll ezekbe az erővonalakba, és észak-déli irányt mutat.',
    hint: 'Gondolj a mágneses vonzásra a Föld és az iránytű hegye között!'
  },
  {
    id: 'lrq2-6',
    level: 2,
    prompt: 'Melyik közlekedési eszköznél elengedhetetlen a 3 dimenziós (szélesség, hosszúság + magasság) helymeghatározás?',
    options: [
      'A repülőgépnél a légtérben',
      'A kerékpárnál a járdán',
      'A villamosnál a síneken',
      'A gördeszkánál a játszótéren'
    ],
    correctAnswer: 0,
    explanation: 'A repülőgépek a háromdimenziós légtérben mozognak. A légi irányítóknak nemcsak a földrajzi helyzetet kell ismerniük, hanem a repülési magasságot is, hogy elkerüljék az ütközéseket.',
    hint: 'Melyik jármű repül a magasban a föld felett?'
  },
  {
    id: 'lrq2-7',
    level: 2,
    prompt: 'Hazánkban déli 12 órakor a legmagasabban álló Nap felé fordulsz (délre nézel). Merre vetül az árnyékod a talajon?',
    options: [
      'Pontosan a hátad mögé, Észak felé',
      'Pontosan előre, Dél felé',
      'Jobbra, Kelet felé',
      'Balra, Nyugat felé'
    ],
    correctAnswer: 0,
    explanation: 'A Nap délben pontosan délről süt az északi féltekén (hazánkban). Mivel az árnyék a fénnyel ellentétes oldalra vetül, a hátunk mögé, pontosan északra fog mutatni.',
    hint: 'Ha szembe süt a Nap, az árnyékod előtted vagy mögötted van?',
    figure: (
      <svg className="w-48 h-32 mx-auto" viewBox="0 0 200 120">
        <circle cx="100" cy="20" r="14" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
        <text x="100" y="24" textAnchor="middle" fontSize="12">☀️</text>
        <text x="100" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706">Nap délen (D)</text>
        {/* Emberke */}
        <circle cx="100" cy="70" r="6" fill="#3b82f6" />
        <line x1="100" y1="76" x2="100" y2="92" stroke="#3b82f6" strokeWidth="2.5" />
        {/* Árnyék északra (felfelé a képen nézve távolabb) */}
        <ellipse cx="100" cy="105" rx="18" ry="4" fill="#475569" fillOpacity="0.4" />
        <text x="100" y="117" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">Árnyék Északra (É) mutat ↑</text>
      </svg>
    )
  },
  {
    id: 'lrq2-8',
    level: 2,
    prompt: 'A torpedó játékban az ellenfél egy hadihajója a B3, B4 és B5 mezőkön helyezkedik el. Milyen hosszú a hajó és milyen tájolású?',
    options: [
      '3 mező hosszú és függőleges (észak-déli) irányú',
      '3 mező hosszú és vízszintes (kelet-nyugati) irányú',
      '5 mező hosszú és átlós irányú',
      '2 mező hosszú'
    ],
    correctAnswer: 0,
    explanation: 'A hajó 3 egymást követő mezőt foglal el a „B” oszlopban (B3, B4, B5). Mivel egy oszlopban van, a tájolása függőleges (egy oszlop mentén halad).',
    hint: 'Számold meg a megadott cellákat: B3, B4, B5. Ez hány mező? Mivel a betű ugyanaz, egy oszlopban áll!'
  },
  {
    id: 'lrq2-9',
    level: 2,
    prompt: 'Melyik égtáj van pontosan az Északnyugattal (ÉNy) szemben (180 fokkal elforgatva)?',
    options: [
      'Délkelet (DK)',
      'Délnyugat (DNy)',
      'Északkelet (ÉK)',
      'Észak (É)'
    ],
    correctAnswer: 0,
    explanation: 'Az Északnyugat (ÉNy, 315°) pontos ellentéte a Délkelet (DK, 135°): Észak ellentéte a Dél, Nyugat ellentéte a Kelet.',
    hint: 'Fordítsd meg mindkét tagot: Észak ellentéte = Dél, Nyugat ellentéte = Kelet!'
  },
  {
    id: 'lrq2-10',
    level: 2,
    prompt: 'Egy földrajzi atlasz névmutatójában ezt olvasod: „Debrecen ... 48. o. C3”. Mit jelent ez?',
    options: [
      'A 48. oldalon lévő térkép C oszlopának és 3. sorának kereszteződésében lévő négyzetben található Debrecen',
      'Debrecentől 48 km-re van a C3 nevű falu',
      'A 48-as busz C3-as megállójánál van Debrecen',
      'Debrecennek 3 folyója és 48 hídja van'
    ],
    correctAnswer: 0,
    explanation: 'Az atlaszok névmutatója először az oldalszámot (48. o.) adja meg, majd a térkép szélén található betű-szám koordinátát (C oszlop, 3. sor), amellyel azonnal megtalálható a település.',
    hint: 'Gondolj a térkép margóján lévő betűkre és számokra!'
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT HELYZETEK, CSILAGÁSZAT ÉS GPS TECHNOLÓGIA (21-30)
  // =========================================================================
  {
    id: 'lrq3-1',
    level: 3,
    prompt: 'Hogyan képes a GPS rendszer méterre pontosan megmondani a telefonod helyzetét a Földön?',
    options: [
      'A Föld körül keringő műholdak pontos időjelet sugároznak, és a telefon kiszámítja a jelek beérkezési idejéből a távolságokat',
      'A telefon kamerája fényképet készít a talajról és felismeri az utcát',
      'A telefon közvetlenül rádiós beszélgetést folytat a legközelebbi polgármesteri hivatallal',
      'A telefon megméri a Föld mágneses erejének hőmérsékletét'
    ],
    correctAnswer: 0,
    explanation: 'A GPS műholdak atomórával felszerelt rádióadók. A telefonunk méri, hogy a fénysebességgel száguldó rádiójel hány ezredmásodperc alatt ért el hozzá a műholdaktól. Több műhold távolságából kiszámítja a pontos metszéspontot.',
    hint: 'Gondolj a műholdak által sugárzott rádiójelekre és az időmérésre!'
  },
  {
    id: 'lrq3-2',
    level: 3,
    prompt: 'Legalább hány GPS műhold jelére van szükség a pontos 3 dimenziós (szélesség, hosszúság + magasság) pozíció kiszámításához?',
    options: [
      'Legalább 4 műhold jelére',
      'Csak 1 műhold elég',
      'Pontosan 100 műhold kell hozzá',
      'Nem kellenek műholdak'
    ],
    correctAnswer: 0,
    explanation: '3 műhold kell a 3 térbeli dimenzióhoz (szélesség, hosszúság, magasság), és egy 4. műhold szükséges a telefon órájának a műholdak atomóráival való hajszálpontos szinkronizálására.',
    hint: 'Gondolj arra: 3 koordináta + 1 idősík = hány műhold?',
    breakdown: [
      { label: '3 műhold', value: '3D metszéspont kiszámítása' },
      { label: '+1 műhold', value: 'Óraszinkronizáció atomórával' },
      { label: 'Összesen szükséges', value: 'Legalább 4 műhold' }
    ]
  },
  {
    id: 'lrq3-3',
    level: 3,
    prompt: 'Erdőben túrázol, lemerült a telefonod és nincs nálad iránytű. Melyik természeti megfigyelés segít a legmegbízhatóbban éjszaka az északi irány megtalálásában?',
    options: [
      'A Sarkcsillag felkeresése az égen, ami mindig pontosan észak felé mutat',
      'Megnézni, merre fúj a szél',
      'Megkérdezni az erdő madarait',
      'Megfigyelni a lehullott falevelek színét'
    ],
    correctAnswer: 0,
    explanation: 'A Sarkcsillag a Föld forgástengelyének északi meghosszabbításán áll, így az északi féltekéről nézve mozdulatlannak tűnik az égen, és mindig pontosan északra mutat.',
    hint: 'Melyik híres csillag mutatja az északi irányt évszázadok óta a tengerészeknek?'
  },
  {
    id: 'lrq3-4',
    level: 3,
    prompt: 'Hogyan találhatjuk meg a Sarkcsillagot a legismertebb csillagkép, a Nagy Medve (Göncölszekér) segítségével?',
    options: [
      'A Göncölszekér két hátsó csillagának távolságát ötször meghosszabbítjuk felfelé',
      'A szekér rúdjának irányában keresünk egy piros csillagot',
      'A legfényesebb csillag közvetlenül a Hold mellett van',
      'A Göncölszekér legelső kerekét nézzük'
    ],
    correctAnswer: 0,
    explanation: 'A népi és csillagászati szabály: a Göncölszekér „hátsó két kerekét” összekötő egyenest a szekér nyílása felé ötször meghosszabbítva pontosan a Sarkcsillaghoz jutunk (a Kis Medve rúdjának végéhez).',
    hint: 'A két hátsó csillag távolságát 5-ször kell meghosszabbítani a képzeletünkben!',
    figure: (
      <svg className="w-52 h-36 mx-auto" viewBox="0 0 220 130">
        <rect x="5" y="5" width="210" height="120" rx="8" fill="#0f172a" />
        {/* Göncölszekér 7 csillaga */}
        <circle cx="40" cy="50" r="2.5" fill="white" />
        <circle cx="65" cy="55" r="2.5" fill="white" />
        <circle cx="85" cy="70" r="2.5" fill="white" />
        <circle cx="105" cy="72" r="2.5" fill="white" />
        <circle cx="135" cy="75" r="3" fill="#fde047" />
        <circle cx="105" cy="95" r="2.5" fill="white" />
        <circle cx="135" cy="100" r="3" fill="#fde047" />
        {/* Vonalak a szekérhez */}
        <polyline points="40,50 65,55 85,70 105,72 135,75 135,100 105,95 105,72" fill="none" stroke="#64748b" strokeWidth="1" />
        {/* Ötszörös vonal felfelé a Sarkcsillaghoz */}
        <line x1="135" y1="75" x2="135" y2="25" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Sarkcsillag */}
        <circle cx="135" cy="22" r="5" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
        <text x="135" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fef08a">Sarkcsillag (Észak)</text>
      </svg>
    )
  },
  {
    id: 'lrq3-5',
    level: 3,
    prompt: 'Budapest koordinátái: kb. Északi szélesség 47,5° és Keleti hosszúság 19,0°. Mi a viszonyítási pontja (origója) a szélességi fokoknak?',
    options: [
      'Az Egyenlítő (0° szélesség)',
      'Az Északi-sark (90°)',
      'A Déli-sark',
      'A Gellért-hegy teteje'
    ],
    correctAnswer: 0,
    explanation: 'A szélességi fokok viszonyítási alapja (0° szélesség) az Egyenlítő, amely a Földet északi és déli félgömbre osztja. Budapest 47,5 fokkal van északabbra az Egyenlítőtől.',
    hint: 'Melyik nevezetes képzeletbeli vonal vágja ketté a Földet Északi és Déli félgömbre?'
  },
  {
    id: 'lrq3-6',
    level: 3,
    prompt: 'Tájékozódási feladat a rácshálón: Indulj a Főtérről (C3)! Lépj 2 mezőt keletre, majd 1 mezőt délre! Melyik mezőre érkezel?',
    options: [
      'E2 mezőre',
      'A4 mezőre',
      'E4 mezőre',
      'C1 mezőre'
    ],
    correctAnswer: 0,
    explanation: 'A C3 mezőről indulunk. 2 mező keletre (jobbra): C → D → E. Utána 1 mező délre (lefelé): 3. sorból a 2. sorba érünk. A célállomás: E2!',
    hint: 'Keletre lépés = oszlopok jobbra (C-ből E-be). Délre lépés = sorok lefelé (3-ból 2-be).',
    breakdown: [
      { label: 'Kiindulás', value: 'C3 (Főtér)' },
      { label: '2 mező keletre (jobbra)', value: 'E3 mező' },
      { label: '1 mező délre (lefelé)', value: 'E2 mező' }
    ]
  },
  {
    id: 'lrq3-7',
    level: 3,
    prompt: 'Mit jelent a térkép tájolása a terepen?',
    options: [
      'A térképet addig forgatjuk, amíg a rajta lévő északi irány pontosan egybe nem esik a valóságos északi iránnyal (iránytűvel)',
      'Összehajtogatjuk a térképet, hogy elférjen a zsebünkben',
      'Kiszínezzük a folyókat kékre',
      'Megszámoljuk a térképen lévő fákat'
    ],
    correctAnswer: 0,
    explanation: 'A térkép tájolása azt jelenti, hogy a papírtérképet úgy forgatjuk el a vízszintes síkban, hogy a rajta ábrázolt irányok megegyezzenek a valóságos terepi irányokkal. Így amit a térképen jobbra látunk, a valóságban is jobbra lesz.',
    hint: 'Gondolj arra, hogyan kell tartanod a térképet, hogy amerre nézel, arra mutasson az út a térképen is!'
  },
  {
    id: 'lrq3-8',
    level: 3,
    prompt: 'Egy körsétán elindulsz észak felé 200 métert, majd fordulsz 90 fokot jobbra (keletre) és mész 200 métert, majd ismét 90 fokot jobbra (délre) mész 200 métert. Milyen irányba és hány métert kell menned, hogy visszajuss a kiindulópontra?',
    options: [
      'Nyugat felé 200 métert',
      'Kelet felé 200 métert',
      'Észak felé 600 métert',
      'Már vissza is értél a kiindulópontra'
    ],
    correctAnswer: 0,
    explanation: 'Egy 200 méter oldalhosszúságú négyzet három oldalát jártad be: Észak (fel), Kelet (jobbra), Dél (le). A kiindulópontodhoz Nyugat (balra) felé kell visszamenned pontosan 200 métert.',
    hint: 'Rajzold le magad elé: fel, jobbra, le... melyik oldal hiányzik a négyzet bezárásához?',
    breakdown: [
      { label: '1. szakasz', value: '200 m Északra' },
      { label: '2. szakasz', value: '200 m Keletre' },
      { label: '3. szakasz', value: '200 m Délre' },
      { label: 'Visszavezető út', value: '200 m Nyugatra' }
    ]
  },
  {
    id: 'lrq3-9',
    level: 3,
    prompt: 'Péter a sportpálya közepén áll, és Annától 15 méterre keletre helyezkedik el. Anna hol áll Péterhez viszonyítva?',
    options: [
      'Pétertől 15 méterre nyugatra',
      'Pétertől 15 méterre keletre',
      'Pétertől 30 méterre északra',
      'Ugyanazon a helyen'
    ],
    correctAnswer: 0,
    explanation: 'A viszonylagos helyzet szimmetrikus ellentéte: ha Péter Annától keletre van, akkor Anna Pétertől az ellenkező irányban, vagyis nyugatra található, pontosan ugyanakkora (15 m) távolságra.',
    hint: 'Ha valaki tőled jobbra (keletre) áll, te tőle merre (balra = ?) állsz?'
  },
  {
    id: 'lrq3-10',
    level: 3,
    prompt: 'Mi az a Geocaching (geokesszing), és milyen modern matematikai-földrajzi eszközre épül?',
    options: [
      'Egy szabadtéri kincskereső játék, ahol elrejtett ládákat kell megkeresni a pontos GPS koordinátáik alapján',
      'Egy számítógépes videójáték autóversenyekkel',
      'Egy banki pénzátutalási alkalmazás',
      'Egy új típusú távcső a csillagok nézésére'
    ],
    correctAnswer: 0,
    explanation: 'A geocaching egy nemzetközi játék, amelyben a játékosok a ládák földrajzi koordinátáit (szélesség, hosszúság fokokban) töltik le, és GPS vevővel vagy okostelefonnal keresik meg őket a természetben.',
    hint: 'Geo = Föld, Cache = elrejtett doboz/kincs.'
  }
];

export const LocationRoleQuiz: React.FC<LocationRoleQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-role-quiz"
      title="A helymeghatározás szerepe kvíz"
      subtitle="30 feladat 3 szinten: égtájak, címek, térképi koordináták és GPS navigáció"
      questions={LOCATION_ROLE_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-location-role-quiz"
      storageKey="g5-loc-role-quiz"
      renderMatcher={(level, onBack, onSwitchToTheory) => (
        <LocationRoleMatcher
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(level, onBack, onSwitchToTheory) => (
        <LocationRoleSorter
          level={level}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-violet-700 dark:text-violet-400">1. Szint Puskája: Alapok és Fő Égtájak</div>
            <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-1">
              <div>• <strong>4 fő égtáj:</strong> Észak (É, 0° - felül), Kelet (K, 90° - jobbra), Dél (D, 180° - alul), Nyugat (Ny, 270° - balra).</div>
              <div>• <strong>Nap járása:</strong> Keleten kél, délen delel, nyugaton nyugszik.</div>
              <div>• <strong>2 adat elve:</strong> Síkban (mozi, színház, sakktábla) 2 adat kell (sor + szék, vagy oszlop + sor).</div>
              <div>• <strong>Házszámok:</strong> Menetirány szerint jobb oldalon páros, bal oldalon páratlan.</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-violet-700 dark:text-violet-400">2. Szint Puskája: Mellék Égtájak és Térképrács</div>
            <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-1">
              <div>• <strong>Mellék égtájak:</strong> ÉK (45°), DK (135°), DNy (225°), ÉNy (315°).</div>
              <div>• <strong>Térképi cella:</strong> Oszlop betűje és sor száma (pl. C3).</div>
              <div>• <strong>Déli napsütés:</strong> Délben az árnyékunk pontosan észak felé mutat!</div>
              <div>• <strong>Dimenziók:</strong> 1D = vonalon (út km), 2D = síkban (térkép), 3D = térben (+ magasság).</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-violet-700 dark:text-violet-400">3. Szint Puskája: GPS és Csillagászat</div>
            <div className="p-2 rounded bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 space-y-1">
              <div>• <strong>GPS:</strong> Legalább 4 műhold jele kell a 3D pozícióhoz és az időszinkronhoz.</div>
              <div>• <strong>Sarkcsillag:</strong> A Göncölszekér két hátsó csillagának 5-szörös meghosszabbításával található meg, északra mutat.</div>
              <div>• <strong>Földrajzi fokhálózat:</strong> Szélesség (Egyenlítőtől É/D), Hosszúság (Greenwichtől K/Ny).</div>
              <div>• <strong>Térkép tájolása:</strong> A térkép északi irányát a valóságos észak felé forgatjuk.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
