import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import {
  MonitorPlay,
  Compass,
  Shapes,
  Maximize2,
  RefreshCw,
  Target,
  Sparkles,
  Move,
  MousePointer,
  Circle,
  HelpCircle,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { GeometrySoftwareMatcher } from './GeometrySoftwareMatcher';
import { GeometrySoftwareSorter } from './GeometrySoftwareSorter';

interface GeometrySoftwareQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Szabad vs. Kötött pontok',
    icon: <MousePointer className="w-4 h-4 text-cyan-600" />,
    formula: 'Kék = Szabadon mozgatható | Fekete/Szürke = Kötött metszet',
    note: 'A szabad pontok a szerkesztés bemeneti adatai (bárhová húzhatók). A kötött pontok matematikai relációk (metszéspont, felezőpont) eredményei.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <circle cx="35" cy="22" r="5" className="fill-blue-500 stroke-blue-700 stroke-[1.5]" />
        <path d="M 22 22 L 16 22 M 19 19 L 16 22 L 19 25" className="stroke-slate-500 stroke-[1.2]" />
        <text x="22" y="12" className="text-[7px] font-bold fill-blue-700">Szabad pont</text>
        <line x1="95" y1="32" x2="135" y2="12" className="stroke-slate-400 stroke-[1.5]" />
        <line x1="95" y1="12" x2="135" y2="32" className="stroke-slate-400 stroke-[1.5]" />
        <circle cx="115" cy="22" r="4" className="fill-slate-800" />
        <text x="100" y="10" className="text-[7px] font-bold fill-slate-800">Kötött metszet</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'Mértani helyek szoftverben',
    icon: <Target className="w-4 h-4 text-teal-600" />,
    formula: 'Felezőmerőleges: |PA| = |PB| | Szögfelező: d(P, e) = d(P, f)',
    note: 'A szoftver eszköztárában a mértani helyek azonnal, egyetlen kattintással előállíthatók és a csúcsok mozgatásakor dinamikusan követik a változást.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <line x1="20" y1="22" x2="60" y2="22" className="stroke-teal-700 stroke-[2]" />
        <line x1="40" y1="5" x2="40" y2="40" className="stroke-teal-500 stroke-[1.5] stroke-dasharray-[2,2]" />
        <circle cx="20" cy="22" r="2.5" className="fill-teal-800" />
        <circle cx="60" cy="22" r="2.5" className="fill-teal-800" />
        <text x="25" y="14" className="text-[7px] font-bold fill-teal-800">felezőmerőleges</text>
        <line x1="95" y1="35" x2="145" y2="35" className="stroke-slate-500 stroke-[1.5]" />
        <line x1="95" y1="35" x2="140" y2="10" className="stroke-slate-500 stroke-[1.5]" />
        <line x1="95" y1="35" x2="145" y2="22" className="stroke-amber-500 stroke-[1.5]" />
        <text x="105" y="18" className="text-[7px] font-bold fill-amber-800">szögfelező</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'A vonszolási teszt (Drag test)',
    icon: <Move className="w-4 h-4 text-cyan-600" />,
    formula: 'Robusztus szerkesztés = Vonszoláskor megőrzi a tulajdonságot',
    note: 'Ha egy alakzat csúcsait elvonszoljuk, a helyesen szerkesztett geometriai tulajdonságok (pl. derékszög, párhuzamosság) érvényben maradnak. A szemre illesztett rajz azonnal szétesik.',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="20,35 60,35 35,10" fill="#06b6d4" fillOpacity="0.2" className="stroke-cyan-600 stroke-[1.5]" />
        <path d="M 33 8 L 29 5 M 37 8 L 41 5" className="stroke-cyan-700 stroke-[1.2]" />
        <text x="18" y="42" className="text-[7px] font-bold fill-cyan-800">✓ Robusztus</text>
        <polygon points="100,35 145,30 118,12" fill="#f43f5e" fillOpacity="0.1" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[2,2]" />
        <text x="102" y="42" className="text-[7px] font-bold fill-rose-700">✗ Széteső szemre</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Háromszög nevezetes pontjai',
    icon: <Shapes className="w-4 h-4 text-indigo-600" />,
    formula: 'O: Felezőmerőlegesek | K: Szögfelezők | M: Magasságok | S: Súlyvonalak',
    note: 'O a csúcsoktól, K az oldalaktól egyenlő távol van. S a súlyvonalakat 2:1 arányban osztja. O, S és M egy egyenesen van (Euler-egyenes).',
    figure: (
      <svg viewBox="0 0 160 45" className="w-36 h-9">
        <polygon points="25,36 75,36 50,8" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
        <circle cx="50" cy="22" r="14" fill="none" className="stroke-cyan-400 stroke-[1] stroke-dasharray-[2,2]" />
        <circle cx="50" cy="22" r="2.5" className="fill-cyan-700" />
        <text x="53" y="21" className="text-[7px] font-bold fill-cyan-900">O</text>
        <circle cx="50" cy="26" r="2.5" className="fill-emerald-700" />
        <text x="53" y="28" className="text-[7px] font-bold fill-emerald-900">S</text>
        <circle cx="50" cy="34" r="2" className="fill-purple-700" />
        <text x="53" y="37" className="text-[7px] font-bold fill-purple-900">M</text>
        <text x="95" y="18" className="text-[8px] font-bold fill-indigo-800">O = Körülírt kör Kp.</text>
        <text x="95" y="30" className="text-[8px] font-bold fill-emerald-800">S = Súlypont (2:1)</text>
      </svg>
    )
  }
];

const quizLevels: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Eszközök',
    subtitle: 'Szabad pontok, metszéspontok, alapvető vonalak és dinamikus mérések',
    range: '1-10. kérdés',
    focus: 'Eszköztár, szabad és kötött objektumok, szög- és távolságmérés',
    questions: [
      {
        id: 'gs-q1',
        level: 1,
        question: 'Mi a legfőbb előnye egy dinamikus geometriai programnak (pl. GeoGebra) a hagyományos papír alapú rajzolással szemben?',
        options: [
          'A szabad csúcsok elmozdításával (vonszolás) azonnal ellenőrizhető, hogy az állítás tetszőleges helyzetben is érvényes marad-e.',
          'Csak szoftverben lehet egyeneseket és köröket rajzolni.',
          'A programban nincsenek érvényben a matematikai axiómák.',
          'Minden feladatot automatikusan megold anélkül, hogy a felhasználónak szerkesztenie kellene.'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, mit csinál a vonszolás (drag-and-drop) az ábrával!',
        explanation: 'A dinamikus geometria alapelve, hogy az alakzat csúcsait elmozdítva a szerkesztési relációk mindvégig megmaradnak, így pillanatok alatt több száz különböző alakzatot vizsgálhatunk meg.',
        breakdown: [
          { label: 'Dinamikus elv', value: 'Vonszolás (drag-and-drop)' },
          { label: 'Előny', value: 'Általánosítás és kísérletezés gyors ellenőrzése' }
        ]
      },
      {
        id: 'gs-q2',
        level: 1,
        question: 'Mit jelent a dinamikus geometriai szoftverekben a "szabad pont" (általában kék színű) fogalma?',
        options: [
          'Olyan pont, amely az egérrel a sík bármely részére tetszőlegesen elvonszolható, nem függ más alakzattól.',
          'Olyan pont, amelyet semmiképpen sem lehet megmozdítani.',
          'Két vonal automatikus metszéspontja, ami sosem változtatja a helyét.',
          'Olyan pont, amelyet csak törölni lehet, átnevezni nem.'
        ],
        correctAnswer: 0,
        hint: 'A szabad pontok jelentik a szerkesztés kezdő paramétereit.',
        explanation: 'A szabad pontok a konstrukció bemeneti elemei. Bárhová mozgathatók a rajzlapon, és helyzetük módosításával a belőlük felépülő teljes ábra alakja dinamikusan változik.',
        breakdown: [
          { label: 'Szabad pont', value: 'Független objektum' },
          { label: 'Jellemző szín', value: 'Kék (vagy egyedileg beállított)' }
        ]
      },
      {
        id: 'gs-q3',
        level: 1,
        question: 'Egy diák két egyenes metszéspontjaként hozta létre az M pontot (szürke/fekete pont). Mi történik, ha az egérrel megpróbálja elhúzni közvetlenül ezt az M pontot?',
        options: [
          'Az M pont önmagában nem mozdítható el, mert helyzetét a két metsző egyenes egyértelműen meghatározza (kötött pont).',
          'Az M pont azonnal elmozdul, és a két egyenes is magától utánafordul.',
          'A program hibaüzenettel azonnal leáll és bezárul.',
          'Az M pont elmozdul, de a két egyenes a helyén marad.'
        ],
        correctAnswer: 0,
        hint: 'A metszéspont függő (kötött) objektum, nem önálló bemenet.',
        explanation: 'A metszéspont függő objektum: a koordinátái a két szülőegyenes egyenletéből számítódnak. Csak úgy mozdul el, ha a két kiinduló egyenest (vagy azok szabad pontjait) mozgatjuk.',
        breakdown: [
          { label: 'Objektumtípus', value: 'Függő / Kötött objektum' },
          { label: 'Mozgathatóság', value: 'Csak szülőobjektumokon keresztül' }
        ]
      },
      {
        id: 'gs-q4',
        level: 1,
        question: 'Milyen mértani helyet határoz meg a "Szakaszfelező merőleges" eszköz egy AB szakaszra kattintva?',
        options: [
          'A sík azon pontjainak halmazát, amelyek az A és B pontoktól egyenlő távolságra vannak (|PA| = |PB|).',
          'A szakasz hosszának négyzetét.',
          'A szakaszra illeszkedő összes lehetséges kör középpontját kizárólag a szakasz belsejében.',
          'Egy olyan egyenest, amely 45°-os szöget zár be a szakasszal.'
        ],
        correctAnswer: 0,
        hint: 'Két ponttól egyenlő távol lévő pontok a síkban.',
        explanation: 'Egy AB szakasz felezőmerőlegese az összes olyan P pont halmaza a síkban, amelyre |PA| = |PB|. Minden pontja egyenlő távolságra van mindkét végponttól.',
        breakdown: [
          { label: 'Definíció', value: '|PA| = |PB|' },
          { label: 'Eszköz', value: 'Szakaszfelező merőleges' }
        ]
      },
      {
        id: 'gs-q5',
        level: 1,
        question: 'Mit hoz létre a "Szögfelező" eszköz egy megadott szög három csúcspontjára kattintva?',
        options: [
          'A szög száraitól egyenlő távolságra lévő pontok egyenesét, amely a szöget két egyenlő részre osztja.',
          'Egy 90°-os merőleges egyenest a szög egyik szárára.',
          'A szög nagyságának numerikus értékét radiánban kifejezve.',
          'Egy párhuzamos egyenest a szögfelező ponttal.'
        ],
        correctAnswer: 0,
        hint: 'A szög száraitól (egyeneseitől) egyenlő távolságra lévő pontok mértani helye.',
        explanation: 'A szögfelező azon pontok halmaza, amelyek a szög két szárától (határoló egyenesétől) egyenlő merőleges távolságra vannak. A szöget két pontosan egyenlő nagyságú részszögre vágja.',
        breakdown: [
          { label: 'Feltétel', value: 'd(P, szár1) = d(P, szár2)' },
          { label: 'Geometriai szerep', value: 'Szög felezése két egyenlő részre' }
        ]
      },
      {
        id: 'gs-q6',
        level: 1,
        question: 'Egy geometriai programban kört szeretnénk rajzolni a "Kör középponttal és ponttal" eszközzel. Hogyan kell használni ezt az eszközt?',
        options: [
          'Először rákattintunk a leendő O középpontra, majd a kerület egy tetszőleges P pontjára (ekkor r = OP).',
          'Kijelölünk három párhuzamos egyenest a képernyőn.',
          'Beírjuk a billentyűzeten a kör színét és területét.',
          'Rákattintunk egy szakasz felezőpontjára kétszer egymás után.'
        ],
        correctAnswer: 0,
        hint: 'A kör meghatározásához kell egy középpont és a sugár hossza.',
        explanation: 'A "Kör középponttal és kerületi ponttal" eszköz első kattintásra rögzíti a kör O középpontját, a második kattintással pedig kijelöli a kör kerületének egy P pontját, így a sugár r = |OP| lesz.',
        breakdown: [
          { label: '1. lépés', value: 'Középpont (O) kijelölése' },
          { label: '2. lépés', value: 'Kerületi pont (P) kijelölése, sugár r = |OP|' }
        ]
      },
      {
        id: 'gs-q7',
        level: 1,
        question: 'Mit igényel bemenetként a "Merőleges egyenes" eszköz a legtöbb szerkesztőprogramban?',
        options: [
          'Egy pontot (amelyen átmenjen a merőleges) és egy egyenest (amelyre merőlegesnek kell lennie).',
          'Két tetszőleges kör sugarát és színét.',
          'Három pontot, amelyek szükségképpen egy egyenesre esnek.',
          'Csak a koordinátarendszer origóját.'
        ],
        correctAnswer: 0,
        hint: 'Adott ponton keresztül adott egyenesre merőleges.',
        explanation: 'A merőleges egyenes egyértelmű megszerkesztéséhez pontosan egy pontra (amin áthalad) és egy referenciaegyenesre (amelyre 90°-ot kell zárnia) van szükség.',
        breakdown: [
          { label: 'Referencia', value: 'Egyenes (adott irány)' },
          { label: 'Átmenő pont', value: 'Pont (hely rögzítése)' }
        ]
      },
      {
        id: 'gs-q8',
        level: 1,
        question: 'Milyen összefüggés áll fenn egy egyenes és a "Párhuzamos egyenes" eszközzel szerkesztett új egyenes között?',
        options: [
          'A két egyenes iránya megegyezik, nincsen közös metszéspontjuk (ha a pont nem az egyenesen volt), és távolságuk mindenütt állandó.',
          'A két egyenes pontosan 90°-os szöget zár be egymással.',
          'A két egyenes egyetlen pontban metszi egymást a rajzlapon kívül.',
          'A két egyenes hossza megegyezik.'
        ],
        correctAnswer: 0,
        hint: 'Párhuzamosság alapvető definíciója az euklideszi síkban.',
        explanation: 'A párhuzamos egyeneseknek a síkban nincs közös pontjuk, vagy egybeesnek. Irányuk azonos, és a két egyenes közötti távolság minden pontban azonos.',
        breakdown: [
          { label: 'Reláció', value: '{"e \\parallel e\'"}' },
          { label: 'Közös pont', value: '0 db (ha nem esnek egybe)' }
        ]
      },
      {
        id: 'gs-q9',
        level: 1,
        question: 'Egy háromszög B csúcsánál lévő belső szögét szeretnénk lemérni a szoftver "Szög" eszközével. Milyen sorrendben kell rákattintani a pontokra?',
        options: [
          'A, B, C vagy C, B, A pontokra (a szög csúcsának, B-nek mindig a középső kattintásnak kell lennie).',
          'Mindig a B csúcsra kell kattintani először, majd A-ra és C-re.',
          'Mindig az origóra, majd a B pontra kell kattintani.',
          'Tetszőleges sorrendben, a program automatikusan kitalálja a legkisebb szöget.'
        ],
        correctAnswer: 0,
        hint: 'A szög csúcsa mindig a két szár találkozása: a középső pont.',
        explanation: 'A szög eszköz 3 pont kijelölését várja: az első a kezdőszár pontja, a második maga a szög CSÚCSA (itt B), a harmadik a zárószár pontja. Így az ABC vagy CBA kijelölés adja a B csúcsbeli szöget.',
        breakdown: [
          { label: 'Középső pont', value: 'A szög csúcsa (Vertex)' },
          { label: 'Szélső pontok', value: 'A szögszárak pontjai' }
        ]
      },
      {
        id: 'gs-q10',
        level: 1,
        question: 'Mire szolgál a "Távolság vagy hossz" eszköz a dinamikus geometria programban?',
        options: [
          'Két pont távolságának, egy szakasz hosszának vagy egy sokszög kerületének numerikus lemérésére és kiírására.',
          'A pontok tömegének és sűrűségének kiszámítására.',
          'A rajzlap nagyítására és kicsinyítésére.',
          'Egyenesek egymáshoz viszonyított dőlésszögének megváltoztatására.'
        ],
        correctAnswer: 0,
        hint: 'Távolság, hosszúság, kerület kimérése.',
        explanation: 'A távolságmérő eszköz rákattintáskor megméri két pont távolságát vagy egy szakasz hosszát, és ezt a rajzlapon dinamikus szövegként felcímkézi, ami vonszoláskor valós időben frissül.',
        breakdown: [
          { label: 'Eszköz célja', value: 'Hosszméret leolvasása' },
          { label: 'Dinamikus frissülés', value: 'Vonszoláskor azonnal újraszámolja' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Mértani Helyek és Nevezetes Vonalak',
    subtitle: 'Körülírt kör, beírt kör, magasság- és súlypont, transzformációk',
    range: '11-20. kérdés',
    focus: 'Háromszög nevezetes vonalai, érintőszerkesztés, szabályos sokszögek',
    questions: [
      {
        id: 'gs-q11',
        level: 2,
        question: 'Hogyan szerkeszthető meg egy háromszög köré írható körének O középpontja szoftverben minimális lépésszámmal?',
        options: [
          'Megszerkesztjük a háromszög két oldalának oldalfelező merőlegesét, és képezzük ezek metszéspontját (Metszéspont eszköz).',
          'Szemre kijelölünk egy pontot a háromszög közepén.',
          'Megszerkesztjük a belső szögfelezőket, és a legnagyobb oldalra állítunk merőlegest.',
          'Összekötjük a csúcsokat a szemközti oldalak harmadolópontjaival.'
        ],
        correctAnswer: 0,
        hint: 'A körülírt kör középpontja a 3 oldalfelező merőleges metszéspontja.',
        explanation: 'Mivel a háromszög köré írt kör középpontja mindhárom csúcstól egyenlő távol van, az oldalfelező merőlegesek közös metszéspontjában található. Elég 2 oldalfelező merőlegest behúzni, metszéspontjuk adja O-t.',
        breakdown: [
          { label: 'Szükséges vonalak', value: '2 db oldalfelező merőleges' },
          { label: 'Középpont', value: 'Metszéspont (O)' },
          { label: 'Sugár', value: 'r = |OA| = |OB| = |OC|' }
        ]
      },
      {
        id: 'gs-q12',
        level: 2,
        question: 'Hogyan kapjuk meg a háromszög beírt körének K középpontját a program eszközeivel?',
        options: [
          'Legalább két belső szögfelező egyenes megszerkesztésével és azok metszéspontjának kijelölésével.',
          'A három oldalfelező pontot összekötő szakaszok metszéspontjával.',
          'A háromszög leghosszabb magasságának felezőpontjával.',
          'A háromszög súlypontjának 180°-os elforgatásával.'
        ],
        correctAnswer: 0,
        hint: 'A beírt kör mindhárom oldalt érinti, tehát az oldalaktól egyenlő távol van.',
        explanation: 'A beírt kör középpontja mindhárom oldaltól egyenlő távolságra van, ezért a belső szögfelezők közös metszéspontjában (K) található. Bármely két belső szögfelező metszéspontja meghatározza K-t.',
        breakdown: [
          { label: 'Mértani hely', value: 'Szögfelezők metszéspontja' },
          { label: 'Tulajdonság', value: 'Mindhárom oldaltól azonos sugárnyi távolság (ρ)' }
        ]
      },
      {
        id: 'gs-q13',
        level: 2,
        question: 'Hogyan szerkesztjük meg a háromszög magasságpontját (M) a szerkesztőprogramban?',
        options: [
          'A csúcsokból a szemközti oldalegyenesekre bocsátunk merőlegeseket a "Merőleges egyenes" eszközzel, majd metszéspontot képezünk.',
          'Megmérjük az oldalak hosszát és elosztjuk kettővel.',
          'Párhuzamosokat húzunk a háromszög oldalaira a súlyponton át.',
          'Köröket rajzolunk a csúcsok köré az oldalak hosszával.'
        ],
        correctAnswer: 0,
        hint: 'A magasságvonal a csúcsból a szemközti oldal egyenesére bocsátott merőleges.',
        explanation: 'A háromszög magasságvonala a csúcson átmenő és a szemközti oldalegyenesre merőleges egyenes. Ezek metszéspontja az M magasságpont (orthocentrum).',
        breakdown: [
          { label: 'Eszköz', value: 'Merőleges egyenes (csúcs + szemközti oldal)' },
          { label: 'Magasságpont', value: 'A 3 magasságvonal közös metszéspontja (M)' }
        ]
      },
      {
        id: 'gs-q14',
        level: 2,
        question: 'Melyik állítás írja le helyesen a háromszög súlypontjának (S) szoftveres előállítását?',
        options: [
          'A "Felezőpont" eszközzel megkeressük az oldalak felezőpontjait, szakasszal összekötjük a szemközti csúcsokkal, majd vesszük a metszéspontjukat.',
          'A csúcsokból merőlegeseket húzunk az oldalakra.',
          'A szögfelezők metszéspontját tükrözzük a leghosszabb oldalra.',
          'Kiszámoljuk a háromszög területét és a harmadához igazítunk egy pontot.'
        ],
        correctAnswer: 0,
        hint: 'Súlyvonal = csúcsot a szemközti oldalfelező ponttal összekötő szakasz.',
        explanation: 'A súlyvonal a háromszög csúcsát a szemközti oldal felezőpontjával összekötő szakasz. A 3 súlyvonal egy pontban metszi egymást, ez az S súlypont, amely a súlyvonalakat 2:1 arányban osztja.',
        breakdown: [
          { label: 'Lépés 1', value: 'Oldalfelező pontok kijelölése' },
          { label: 'Lépés 2', value: 'Szakasz a csúcshoz (súlyvonal)' },
          { label: 'Lépés 3', value: 'Metszéspont = Súlypont (S)' }
        ]
      },
      {
        id: 'gs-q15',
        level: 2,
        question: 'Hogyan szerkeszthető meg egy kör adott P kerületi pontjában a kör érintője szoftverben?',
        options: [
          'Az OP sugár egyenesére állítunk merőleges egyenest a P ponton keresztül.',
          'Párhuzamost húzunk az OP sugárral a kör középpontján át.',
          'Két pontot veszünk fel a körön és összekötjük őket.',
          'A kör területét elosztjuk a kerülettel.'
        ],
        correctAnswer: 0,
        hint: 'A kör érintője merőleges az érintési pontba húzott sugárra.',
        explanation: 'Egy kör érintője a sík azon egyenese, amelynek pontosan egy közös pontja van a körrel. Az érintő egyenes mindig merőleges az érintési pontba (P) mutató sugárra (OP).',
        breakdown: [
          { label: 'Geometriai tétel', value: '{"e_{érintő} \\perp OP"}' },
          { label: 'Szoftveres lépés', value: 'Merőleges egyenes eszköz (P pont + OP sugár)' }
        ]
      },
      {
        id: 'gs-q16',
        level: 2,
        question: 'Egy AB szakaszból kiindulva hogyan kapjuk meg egy szabályos háromszög harmadik C csúcsát körökkel a programban?',
        options: [
          'Megrajzolunk egy A középpontú AB sugarú és egy B középpontú BA sugarú kört, metszéspontjuk adja a C csúcsot.',
          'Szemre kiválasztunk egy pontot felül és odakattintunk.',
          'Húzunk egy 45°-os félegyenest és lemérünk 5 cm-t.',
          'A szakasz felezőpontjában felveszünk egy tetszőleges pontot.'
        ],
        correctAnswer: 0,
        hint: 'A szabályos háromszög mindhárom oldala egyenlő hosszúságú (|AB| = |AC| = |BC|).',
        explanation: 'Az A középpontú |AB| sugarú kör pontjai |AB| távol vannak A-tól. A B középpontú |AB| sugarú kör pontjai |AB| távol vannak B-től. Közös metszéspontjuk C mindkettőtől |AB| távolságra lesz, így |AB| = |AC| = |BC|.',
        breakdown: [
          { label: 'Euklidesz I. tétele', value: 'Szabályos háromszög szerkesztése 2 körrel' },
          { label: 'Oldalhosszak', value: '|AB| = |BC| = |CA|' }
        ]
      },
      {
        id: 'gs-q17',
        level: 2,
        question: 'Mire szolgál a szoftverben a "Centrális (középpontos) tükrözés" eszköz?',
        options: [
          'Egy kijelölt alakzat minden pontját egy adott C tükrözési centrumon át azonos távolságra képezi le (180°-os forgatás).',
          'A pontokat az origó felé kicsinyíti a felére.',
          'Egy tükörtengelyre merőlegesen tükrözi az alakzatot.',
          'Megméri a háromszög súlypontjának koordinátáit.'
        ],
        correctAnswer: 0,
        hint: 'A pontra való tükrözés egybevágósági transzformáció.',
        explanation: 'A középpontos tükrözés során a program az alakzat minden P pontjához hozzárendeli a P\' pontot úgy, hogy a C centrum a PP\' szakasz felezőpontja legyen. Ez egyben 180°-os elforgatás is C körül.',
        breakdown: [
          { label: 'Transzformáció', value: 'Középpontos tükrözés' },
          { label: 'Centrum', value: 'A PP\' szakasz felezőpontja' }
        ]
      },
      {
        id: 'gs-q18',
        level: 2,
        question: 'Hogyan készíthetünk tengelyesen tükrözött képet egy sokszögről a szoftverben?',
        options: [
          'Kiválasztjuk a "Tengelyes tükrözés" eszközt, rákattintunk a sokszögre, majd a tükörtengely egyenesére.',
          'Megrajzolunk egy kört a sokszög köré és elforgatjuk 90°-kal.',
          'A sokszög minden csúcsát eltoljuk 5 egységgel jobbra.',
          'Kijelöljük a sokszöget és megnyomjuk a Delete billentyűt.'
        ],
        correctAnswer: 0,
        hint: 'Objektum kijelölése + tükörtengely kijelölése.',
        explanation: 'A szoftver tengelyes tükrözés eszköze két bemenetet kér: a leképezendő alakzatot (tárgy) és a tükörtengelyt képviselő egyenest. Az eredmény egy egybevágó, fordított körüljárású tükörkép.',
        breakdown: [
          { label: 'Bemenet 1', value: 'Alakzat (kijelölés)' },
          { label: 'Bemenet 2', value: 'Tükörtengely (egyenes)' }
        ]
      },
      {
        id: 'gs-q19',
        level: 2,
        question: 'Hogyan vizsgálható a párhuzamos szelők tétele dinamikus szerkesztőprogramban?',
        options: [
          'Egy szög szárait több párhuzamos egyenessel metsszük, és a levágott szakaszok hosszának arányát vonszolás közben is ellenőrizzük.',
          'Két pontot összekötünk és megmérjük a szögüket.',
          'Háromszöget rajzolunk és töröljük a magasságvonalait.',
          'A képernyő felbontását növeljük 4K-ra.'
        ],
        correctAnswer: 0,
        hint: 'A párhuzamos szelők az egyik száron levágott szakaszok arányát viszik át a másik szárra.',
        explanation: 'A dinamikus programban a szög szárait elmetsző párhuzamosok által létrehozott szakaszok aránya (a/b és a\'/b\') vonszolás közben folyamatosan megegyezik, ami szemléletesen bizonyítja a tételt.',
        breakdown: [
          { label: 'Tétel', value: 'Párhuzamos szelők tétele' },
          { label: 'Invariáns arány', value: '{"a / b = a\' / b\'"}' }
        ]
      },
      {
        id: 'gs-q20',
        level: 2,
        question: 'Mire használható a dinamikus szoftverekben a "Csúszka" (Slider) eszköz?',
        options: [
          'Egy numerikus érték (hosszúság, szög, nagyítási arány) intervallumon belüli folyamatos, interaktív változtatására.',
          'A rajzlap színének beállítására.',
          'Kizárólag az egér görgőjének sebességének mérésére.',
          'A felhőbe történő automatikus mentés időközének beállítására.'
        ],
        correctAnswer: 0,
        hint: 'Egy változó paraméter finomhangolására, animációkra.',
        explanation: 'A csúszka egy változó paramétert (pl. a = 1-től 10-ig) jelenít meg, amelyet az egérrel húzhatunk vagy animálhatunk. Ezzel dinamikusan növelhetjük egy kör sugarát, egy forgatás szögét vagy a hasonlósági arányt.',
        breakdown: [
          { label: 'Szerepe', value: 'Paramétervezérlés' },
          { label: 'Példák', value: 'Sugár (r), szög (α), arány (λ)' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Vonszolási Teszt és Invariánsok',
    subtitle: 'Robusztus szerkesztések, Thalész-kör, Pitagorasz-modell és hibakeresés',
    range: '21-30. kérdés',
    focus: 'Vonszolási elv, szemre rajz vs. kötött szerkesztés, Euler-egyenes, stabilitás',
    questions: [
      {
        id: 'gs-q21',
        level: 3,
        question: 'Egy tanuló négyzetet akart rajzolni a programban úgy, hogy letett 4 pontot, és szemre úgy igazította, hogy a szögek 90°-nak tűnjenek. Mi történik a "vonszolási teszt" során?',
        options: [
          'Bármelyik csúcs elhúzásakor az alakzat azonnal elveszíti négyzet mivoltát, mert nincsenek matematikai relációk (merőlegesség, egyenlő oldalak) rögzítve.',
          'A program felismeri a szándékot és automatikusan négyzetként tartja.',
          'A csúcsok lefagynak és nem lehet őket elmozdítani.',
          'Az alakzat területe állandó marad.'
        ],
        correctAnswer: 0,
        hint: 'A szemre illesztett rajz nem tartalmaz geometriai kötöttségeket.',
        explanation: 'A vonszolási teszt lényege a szerkesztés robusztusságának ellenőrzése. Ha nem használtunk merőlegeseket, köröket az oldalak egyenlőségéhez, az alakzat szabad pontjai külön mozognak, és az ábra szétesik.',
        breakdown: [
          { label: 'Hiba oka', value: 'Hiányzó geometriai relációk' },
          { label: 'Teszt eredménye', value: 'A négyzet azonnal torzul és szétesik' }
        ]
      },
      {
        id: 'gs-q22',
        level: 3,
        question: 'Hogyan szerkeszthetünk olyan derékszögű háromszöget, amelynek C csúcsát vonszolva a γ szög mindig, minden helyzetben garantáltan 90° marad?',
        options: [
          'Megrajzolunk egy AB szakaszt, annak F felezőpontja köré |FA| sugarú kört (Thalész-kör), és a C csúcsot e körvonalra illesztjük rá.',
          'Megrajzolunk egy vízszintes és egy függőleges szakaszt a négyzethálón.',
          'Szemre 90°-ra állítjuk a szögmérő eszközt, majd elmentjük a fájlt.',
          'Egy tetszőleges háromszögben addig húzzuk a csúcsot, amíg a szögmérő 90,0°-ot nem ír ki.'
        ],
        correctAnswer: 0,
        hint: 'Thalész tétele: az átmérő fölé emelt kerületi szög derékszög.',
        explanation: 'Thalész tétele kimondja, hogy ha egy kör átmérőjének két végpontját összekötjük a körvonal bármely más pontjával, derékszöget kapunk. Ha C-t a körvonalhoz kötjük mint pályát, vonszoláskor mindig pontosan 90° marad.',
        breakdown: [
          { label: 'Matematikai alap', value: 'Thalész tétele' },
          { label: 'Szerkesztési lépés', value: 'Kör átmérővel + kerületre kötött C pont' },
          { label: 'Stabilitás', value: 'Vonszoláskor folyamatosan γ = 90°' }
        ]
      },
      {
        id: 'gs-q23',
        level: 3,
        question: 'Mi történik a háromszög köré írt körének O középpontjával, ha egy hegyesszögű háromszög egyik csúcsát addig vonszoljuk, amíg a szemközti szög tompaszöggé (> 90°) nem válik?',
        options: [
          'Az O középpont átlépi a leghosszabb oldalt, és a háromszögön kívülre kerül.',
          'Az O középpont megsemmisül, mert tompaszögű háromszögnek nincs körülírt köre.',
          'Az O pont mindig a háromszög súlypontjába ugrik.',
          'Semmi sem változik, az O pont mindig a háromszög belsejében marad.'
        ],
        correctAnswer: 0,
        hint: 'Hegyesszögűnél belül, derékszögűnél az átfogón, tompaszögűnél kívül van O.',
        explanation: 'Hegyesszögű háromszög esetén a körülírt kör középpontja a belső tartományban van; derékszögű háromszögnél pontosan az átfogó felezőpontjára esik; tompaszögű háromszögnél pedig a tompaszöggel szemközti oldalán KÍVÜLRE kerül.',
        breakdown: [
          { label: 'Hegyesszögű', value: 'O a háromszög belsejében' },
          { label: 'Derékszögű', value: 'O az átfogó felezőpontján' },
          { label: 'Tompaszögű', value: 'O a háromszögön KÍVÜL' }
        ]
      },
      {
        id: 'gs-q24',
        level: 3,
        question: 'Hol helyezkedik el a körülírt kör O középpontja, ha a háromszög pontosan derékszögű?',
        options: [
          'Pontosan az átfogó (leghosszabb oldal) felezőpontjában.',
          'A derékszögű csúcsban.',
          'A háromszög súlypontjában.',
          'A háromszög legrövidebb befogójának harmadpontjánál.'
        ],
        correctAnswer: 0,
        hint: 'Thalész tétele alapján az átfogó éppen a kör átmérője.',
        explanation: 'Derékszögű háromszögben az átfogó a körülírt kör átmérője (Thalész-tétel megfordítása), ezért a körülírt kör középpontja az átfogó felezőpontja, sugara pedig az átfogó fele: r = c / 2.',
        breakdown: [
          { label: 'Helyzet', value: 'Átfogó felezőpontja (F_c)' },
          { label: 'Kör sugara', value: 'r = c / 2' }
        ]
      },
      {
        id: 'gs-q25',
        level: 3,
        question: 'Hogyan modellezhető a Pitagorasz-tétel egy dinamikus szoftverben szemléletesen?',
        options: [
          'Egy robusztusan derékszögű háromszög mindhárom oldalára négyzetet szerkesztünk, és a területmérővel kimutatjuk, hogy a befogónégyzetek területeinek összege egyenlő az átfogónégyzet területével.',
          'Megmérjük a háromszög kerületét és kivonjuk a belső szögek összegét.',
          'Megrajzolunk egy kört és felosztjuk 3 részre.',
          'A csúcsok koordinátáit megszorozzuk π-vel.'
        ],
        correctAnswer: 0,
        hint: 'a² + b² = c² területi interpretációja.',
        explanation: 'A Pitagorasz-tétel mértani jelentése, hogy a befogókra emelt négyzetek területösszege megegyezik az átfogóra emelt négyzet területével (T_a + T_b = T_c). A szoftverben ez a csúcsok mozgatása közben is állandóan teljesül.',
        breakdown: [
          { label: 'Területi összefüggés', value: '{"T_a + T_b = T_c"}' },
          { label: 'Dinamikus ellenőrzés', value: 'Vonszoláskor a területek összege azonnal egyezik' }
        ]
      },
      {
        id: 'gs-q26',
        level: 3,
        question: 'Egy rögzített AB átfogójú derékszögű háromszög C derékszögű csúcsára bekapcsoljuk a "Nyomvonal" (Trace) funkciót, majd C-t mozgatjuk. Milyen görbét rajzol ki a pont a síkban?',
        options: [
          'Egy kört (az AB átmérőjű Thalész-kört a végpontok kivételével).',
          'Egy parabolát.',
          'Egy szabályos hatszöget.',
          'Egyenes vonalat az AB szakasszal párhuzamosan.'
        ],
        correctAnswer: 0,
        hint: 'A pontok, amelyekből egy szakasz 90°-os szögben látszik.',
        explanation: 'A Thalész-tétel miatt azok a pontok a síkban, amelyekből az AB szakasz derékszögben látszik, pontosan az AB átmérőjű körön helyezkednek el. Ezért a pont nyomvonala ezt a kört fedi le.',
        breakdown: [
          { label: 'Mértani hely', value: 'Thalész-kör' },
          { label: 'Kirajzolt pálya', value: 'Körvonal AB átmérővel' }
        ]
      },
      {
        id: 'gs-q27',
        level: 3,
        question: 'Egy tetszőleges háromszögben megszerkesztjük az O (körülírt kör Kp.), S (súlypont) és M (magasságpont) pontokat. Milyen nevezetes tételt figyelhetünk meg vonszoláskor?',
        options: [
          'Az O, S és M pontok mindig egyetlen egyenesre esnek (Euler-egyenes), és az S pont az OM szakaszt 2:1 arányban osztja (MS : SO = 2 : 1).',
          'Az O, S és M pontok mindig egy egyenlő oldalú háromszöget alkotnak.',
          'A három pont mindig a háromszög leghosszabb oldalára esik.',
          'A pontok távolsága egymástól mindig pontosan 10 cm.'
        ],
        correctAnswer: 0,
        hint: 'Euler-egyenes (Leonhard Euler tétele).',
        explanation: 'Leonhard Euler fedezte fel, hogy minden háromszögben a magasságpont (M), a súlypont (S) és a körülírt kör középpontja (O) egy egyenesen van (Euler-egyenes), és az S pont az MO szakaszt MS = 2·SO arányban osztja.',
        breakdown: [
          { label: 'Tétel', value: 'Euler-egyenes' },
          { label: 'Kollinearitás', value: 'O, S, M egy egyenesen vannak' },
          { label: 'Arány', value: 'MS : SO = 2 : 1' }
        ]
      },
      {
        id: 'gs-q28',
        level: 3,
        question: 'Egy diák megszerkesztette a háromszög beírt körének K középpontját (szögfelezők metszéspontja). Hogyan kell pontosan megrajzolni magát a beírt kört?',
        options: [
          'K-ból merőlegest bocsátunk az egyik oldalegyenesre (ez adja a T érintési pontot), majd megrajzoljuk a K középpontú KT sugarú kört.',
          'Szemre addig húzzuk a kört a K pontból, amíg nem látszik úgy, hogy éppen érinti az oldalt.',
          'Összekötjük K-t a legközelebbi csúccsal, és az lesz a sugár.',
          'A körülírt kör sugarát elosztjuk kettővel.'
        ],
        correctAnswer: 0,
        hint: 'A kör érintője merőleges az érintési pontba mutató sugárra.',
        explanation: 'A beírt kör érinti az oldalakat, tehát a sugara a K pont távolsága az oldaltól. Ezt pontosan úgy kapjuk meg, hogy K-ból merőlegest állítunk az oldalra, annak metszéspontja adja az érintési pontot, a távolság pedig a sugarat.',
        breakdown: [
          { label: 'Lépés 1', value: 'Merőleges K-ból az oldalra' },
          { label: 'Lépés 2', value: 'Metszéspont T (érintési pont)' },
          { label: 'Lépés 3', value: 'Kör K középponttal és T ponttal' }
        ]
      },
      {
        id: 'gs-q29',
        level: 3,
        question: 'Miért veszélyes és hibás geometriai eljárás egy szoftverben a "szemre illesztés" a valódi szerkesztési eszközök helyett?',
        options: [
          'Mert az ábra nem tartalmazza az elvárt matematikai axiómákat és relációkat; dinamikus mozgatáskor az összefüggések felborulnak és hamis következtetéshez vezetnek.',
          'Mert a számítógép processzora túlmelegszik tőle.',
          'Mert a szemre rajzolt vonalak vastagabbak a képernyőn.',
          'Mert a program automatikusan levon 10 pontot a dolgozatból.'
        ],
        correctAnswer: 0,
        hint: 'A dinamikus geometria lényege a matematikai kapcsolatok programozása.',
        explanation: 'A dinamikus geometriai környezet ereje a matematikai dependenciákban (függőségekben) rejlik. A szemre illesztett objektum független marad, így elmozdításkor nem követi a tételeket, és hamis intuíciókat eredményez.',
        breakdown: [
          { label: 'Matematikai hiba', value: 'Hiányzó összefüggésrendszer' },
          { label: 'Következmény', value: 'Általánosíthatóság elvesztése' }
        ]
      },
      {
        id: 'gs-q30',
        level: 3,
        question: 'Egy tetszőleges háromszög csúcsait elvonszolva a szögmérő eszköz értékeit összeadva mindig pontosan 180°-ot kapunk. Miért nevezzük ezt "geometriai invariánsnak"?',
        options: [
          'Mert az alakzat formájának, méretének vagy helyzetének változása (vonszolás) ellenére ez az érték matematikai tétel alapján szigorúan állandó marad.',
          'Mert a szoftver fejlesztői ezt egy fix számként beégették a forráskódba.',
          'Mert a képernyő pixeljei csak 180 fokot képesek megjeleníteni.',
          'Mert a csúszka értéke nem haladhatja meg a 180-at.'
        ],
        correctAnswer: 0,
        hint: 'Invariáns = a transzformáció vagy deformáció során változatlanul maradó tulajdonság.',
        explanation: 'Geometriai invariánsnak nevezzük azokat a tulajdonságokat vagy mennyiségeket, amelyek egy megengedett műveletcsoport (itt a síkbeli szabad csúcsvonszolás) során változatlanok maradnak. A síkháromszög belső szögeinek összege az euklideszi geometria egyik legfőbb invariánsa.',
        breakdown: [
          { label: 'Fogalom', value: 'Geometriai Invariáns' },
          { label: 'Matematikai tétel', value: '{"\\alpha + \\beta + \\gamma = 180^\\circ"}' },
          { label: 'Jelentősége', value: 'Bármely háromszögre érvényes alapigazság' }
        ]
      }
    ]
  }
};

export const GeometrySoftwareQuiz: React.FC<GeometrySoftwareQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g8-geom-software"
      grade={8}
      chapterId="geometria"
      topicTitle="Használjunk szerkesztőprogramot!"
      emoji="💻"
      topicBadge="8. Osztály • II. Geometria • 3. Témakör"
      badgeText="8. Osztály • Matematika"
      title="Szerkesztőprogram kvíz"
      subtitle="Dinamikus geometria, mértani helyek, kötöttségek és vonszolás 3 szinten"
      cheatSheetTitle="Dinamikus Geometria Segédlet"
      cheatSheetCards={cheatSheetCards}
      hintText="💡 Figyeld a különbséget a szabadon mozgatható kék pontok és a szerkesztett kötött szürke pontok között!"
      levels={quizLevels}
      matcherComponent={<GeometrySoftwareMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<GeometrySoftwareSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="cyan"
    />
  );
};

export default GeometrySoftwareQuiz;
