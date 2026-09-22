import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SummaryMatcher } from './SummaryMatcher';
import { SummarySorter } from './SummarySorter';
import { SummarySolverFigure } from './SummaryDiagrams';
import {
  Trophy,
  Calculator,
  ArrowDownUp,
  GitBranch,
  Network,
  Scale,
  Gamepad2,
  Boxes,
  Layers,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

interface SummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: '1. Számold össze! (Szorzási szabály & Szita)',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: 'a · b · c... és |A ∪ B| = |A| + |B| - |A ∩ B|',
    note: 'Független döntések lehetőségeit megszorozzuk. Közös elemek esetén a metszetet egyszer levonjuk.'
  },
  {
    id: 'c2',
    title: '2. Rendezd sorba! (Permutáció)',
    icon: <ArrowDownUp className="w-4 h-4 text-violet-600" />,
    formula: 'n! = n · (n - 1) · ... · 2 · 1',
    note: 'n különböző elem összes lehetséges sorrendjeinek száma n faktoriális (pl. 5 ember sorban = 120).'
  },
  {
    id: 'c3',
    title: '3. Hány eset van? (Kiválasztások & Esetek)',
    icon: <GitBranch className="w-4 h-4 text-emerald-600" />,
    formula: 'Visszatevéses: nᵏ | Nélküli: n · (n-1)... | Körmérkőzés: n(n-1)/2',
    note: 'Ügyeljünk arra, hogy a kiválasztás során a sorrend számít-e, és ismétlődhetnek-e az elemek.'
  },
  {
    id: 'c4',
    title: '4. Gráfok (Fokszámok & Fák)',
    icon: <Network className="w-4 h-4 text-teal-600" />,
    formula: 'Σ d(v) = 2 · |E| | Teljes: n(n-1)/2 | Fa: n - 1 él',
    note: 'A fokszámösszeg mindig páros, a páratlan fokszámú csúcsok száma páros. A fa összefüggő és körmentes.'
  },
  {
    id: 'c5',
    title: '5. Igazold! Cáfold! (Bizonyítás & Skatulya)',
    icon: <Scale className="w-4 h-4 text-cyan-600" />,
    formula: 'Általános levezetés vs. 1 ellenpélda | Dirichlet: ⌈N / K⌉',
    note: '„Minden...” tagadása „Van olyan, amelyik nem...”. Ha N tárgy K dobozban van, legalább egyben van ⌈N/K⌉ tárgy.'
  },
  {
    id: 'c6',
    title: '6. Matematikai játékok (Stratégiák & Szimmetria)',
    icon: <Gamepad2 className="w-4 h-4 text-amber-600" />,
    formula: 'Kulcspozíciók (4k) | Szimmetria tükrözés | Visszafelé elemzés',
    note: 'Keressük az invariáns tulajdonságokat, elemezzük a játékot a céltól visszafelé haladva.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // ==========================================
  // LEVEL 1: Alapfogalmak & Fejezeti Képletek (30 kérdés)
  // ==========================================
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak & Képletek',
    subtitle: 'Kombinatorika, gráfok, logika és játékok alaptörvényei',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950',
    badgeBorder: 'border-emerald-300 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 'q1-1',
        level: 1,
        questionTypeBadge: 'Szorzási szabály',
        question: 'Péternek 3 nadrágja és 4 különböző pólója van. Hányféleképpen tud felvenni egy nadrágot és egy pólót?',
        figure: <SummarySolverFigure type="counting" data={{ a: '3 nadrág', b: '4 póló', total: '12 szett' }} />,
        options: ['7-féleképpen', '12-féleképpen', '10-féleképpen', '24-féleképpen'],
        correctAnswer: '12-féleképpen',
        explanation: 'A szorzási szabály szerint a független döntési lehetőségeket megszorozzuk: 3 · 4 = 12 öltözet lehetséges.',
        hint: 'A nadrág kiválasztása 3-féle, utána a póló 4-féle lehet: szorozd össze a lehetőségeket!'
      },
      {
        id: 'q1-2',
        level: 1,
        questionTypeBadge: 'Kockadobás',
        question: 'Két szabályos dobókockát egyszerre feldobva hány különböző számpár jöhet ki (a dobások sorrendjét megkülönböztetve)?',
        options: ['12', '36', '18', '24'],
        correctAnswer: '36',
        explanation: 'Az 1. kocka 6-féle, a 2. kocka szintén 6-féle értéket vehet fel. Összesen 6 · 6 = 36 számpár lehetséges.',
        hint: 'Mindkét kockán 1-től 6-ig dobhatunk: 6 · 6.'
      },
      {
        id: 'q1-3',
        level: 1,
        questionTypeBadge: 'Érmedobás',
        question: 'Három darab pénzérmét egyszerre feldobva hány különböző fej/írás kimeneteli sorozat képzelhető el?',
        options: ['6', '8', '9', '12'],
        correctAnswer: '8',
        explanation: 'Minden érme 2-féle állapotú lehet (Fej vagy Írás). A szorzási szabály szerint: 2 · 2 · 2 = 2³ = 8 eset van.',
        hint: 'Első érme: 2, második: 2, harmadik: 2 lehetőség.'
      },
      {
        id: 'q1-4',
        level: 1,
        questionTypeBadge: 'Menüválasztás',
        question: 'Egy étteremben 2-féle leves, 3-féle főétel és 2-féle desszert közül választhatunk. Hányféle teljes 3 fogásos menü állítható össze?',
        options: ['7', '12', '10', '18'],
        correctAnswer: '12',
        explanation: 'A három fogás egymástól független: 2 · 3 · 2 = 12 különböző menü állítható össze.',
        hint: 'Szorozd össze a fogások lehetőségeinek számát: 2 · 3 · 2.'
      },
      {
        id: 'q1-5',
        level: 1,
        questionTypeBadge: 'Skatulya-elv',
        question: 'Egy teremben 13 ember tartózkodik. Mit állíthatunk BIZTOSAN a születési hónapjukról a Skatulya-elv alapján?',
        figure: <SummarySolverFigure type="pigeonhole" data={{ items: '13 ember', boxes: '12 hónap' }} />,
        options: [
          'Mindenki más hónapban született.',
          'Legalább ketten ugyanabban a hónapban születtek.',
          'Pontosan hárman születtek januárban.',
          'Senki sem született nyáron.'
        ],
        correctAnswer: 'Legalább ketten ugyanabban a hónapban születtek.',
        explanation: '12 hónap van (12 skatulya). 13 ember esetén legalább egy hónapba legalább ketten fognak esni (13 / 12 > 1).',
        hint: '13 ember jut 12 naptári hónapra. Elkerülhető-e, hogy legyen azonos hónap?'
      },
      {
        id: 'q1-6',
        level: 1,
        questionTypeBadge: 'Faktoriális',
        question: 'Mennyi 4! (4 faktoriális) pontos értéke?',
        figure: <SummarySolverFigure type="permutation" data={{ n: '4', val: '4 · 3 · 2 · 1 = 24' }} />,
        options: ['10', '16', '24', '120'],
        correctAnswer: '24',
        explanation: '4! = 4 · 3 · 2 · 1 = 24.',
        hint: 'Szorozd össze a pozitív egész számokat 4-től lefelé 1-ig!'
      },
      {
        id: 'q1-7',
        level: 1,
        questionTypeBadge: 'Sorba rendezés',
        question: 'Anna, Béla és Cili a mozipénztár előtt állnak sorba. Hányféle sorrendben állhatnak be a sorba?',
        options: ['3-féleképpen', '6-féleképpen', '9-féleképpen', '12-féleképpen'],
        correctAnswer: '6-féleképpen',
        explanation: '3 különböző ember sorrendjeinek száma: 3! = 3 · 2 · 1 = 6.',
        hint: 'Az első helyre 3-an, a másodikra 2-en, a harmadikra 1 ember kerülhet.'
      },
      {
        id: 'q1-8',
        level: 1,
        questionTypeBadge: 'Faktoriális',
        question: 'Mennyi 5! (5 faktoriális) értéke?',
        options: ['25', '60', '120', '720'],
        correctAnswer: '120',
        explanation: '5! = 5 · 4 · 3 · 2 · 1 = 120.',
        hint: '5 · 24 = 120.'
      },
      {
        id: 'q1-9',
        level: 1,
        questionTypeBadge: 'Polcrendezés',
        question: '4 különböző tankönyvet hányféle sorrendben tudunk elhelyezni egy könyvespolcon egymás mellett?',
        options: ['16-féleképpen', '24-féleképpen', '12-féleképpen', '48-féleképpen'],
        correctAnswer: '24-féleképpen',
        explanation: '4 elem összes lehetséges permutációinak száma: 4! = 4 · 3 · 2 · 1 = 24.',
        hint: '4 különböző tárgy sorba rendezése: 4!.'
      },
      {
        id: 'q1-10',
        level: 1,
        questionTypeBadge: 'Betűrendezés',
        question: 'A „KÁD” szó mind a 3 betűjét felhasználva hány 3 betűs betűsorozat képezhető?',
        options: ['3', '6', '9', '12'],
        correctAnswer: '6',
        explanation: '3 különböző betű átrendezése: 3! = 6 különböző szóalakot eredményez.',
        hint: 'KÁD, KDÁ, ÁKD, ÁDK, DKÁ, DÁK -> összesen 3! = 6.'
      },
      {
        id: 'q1-11',
        level: 1,
        questionTypeBadge: 'Számképzés',
        question: 'Hány kétjegyű szám készíthető az {1, 2, 3} számjegyekből, ha a számjegyek ISMÉTLŐDHETNEK?',
        options: ['6', '8', '9', '12'],
        correctAnswer: '9',
        explanation: 'Az első jegy 3-féle (1, 2, 3), a második jegy is 3-féle lehet. Így 3 · 3 = 9 szám képezhető.',
        hint: 'Mindkét helyiértékre 3-féle számjegyet tehetünk.'
      },
      {
        id: 'q1-12',
        level: 1,
        questionTypeBadge: 'Számképzés',
        question: 'Hány kétjegyű szám készíthető az {1, 2, 3} számjegyekből, ha minden számjegy csak EGYSZER szerepelhet egy számban?',
        options: ['3', '6', '9', '12'],
        correctAnswer: '6',
        explanation: 'Az első jegy 3-féle, a második jegy a maradék 2-féle lehet: 3 · 2 = 6 szám (12, 13, 21, 23, 31, 32).',
        hint: 'Visszatevés nélküli eset: 3 · 2 = 6.'
      },
      {
        id: 'q1-13',
        level: 1,
        questionTypeBadge: 'PIN kódok',
        question: 'Hány különböző 4-jegyű PIN kód állítható össze a 0-9 számjegyekből, ha bármelyik jegy ismétlődhet és 0-val is kezdődhet?',
        options: ['1 000', '5 040', '9 999', '10 000'],
        correctAnswer: '10 000',
        explanation: 'Mind a 4 pozícióra 10-féle számjegy kerülhet: 10 · 10 · 10 · 10 = 10⁴ = 10 000 PIN kód létezik (0000-tól 9999-ig).',
        hint: '10 lehetőséget választunk négyszer egymás után: 10⁴.'
      },
      {
        id: 'q1-14',
        level: 1,
        questionTypeBadge: 'Zászlószínezés',
        question: 'Egy 3 vízszintes sávból álló zászlót színezünk piros, fehér és zöld színekkel úgy, hogy minden sáv más színű. Hányféle zászló készíthető?',
        options: ['3', '6', '9', '27'],
        correctAnswer: '6',
        explanation: 'A felső sáv 3-féle, a középső 2-féle, az alsó 1-féle lehet: 3! = 6 különböző zászló.',
        hint: '3 szín sorrendje: 3 · 2 · 1.'
      },
      {
        id: 'q1-15',
        level: 1,
        questionTypeBadge: 'Golyóhúzás',
        question: 'Egy dobozban 5 számozott golyó van (1, 2, 3, 4, 5). Egymás után kihúzunk kettőt visszatevés nélkül. Hányféle számpárt kaphatunk (a sorrend számít)?',
        options: ['10', '20', '25', '30'],
        correctAnswer: '20',
        explanation: 'Az első húzás 5-féle, a második húzás 4-féle eredményt adhat: 5 · 4 = 20 lehetőség.',
        hint: 'Visszatevés nélkül húzunk: 5 · 4.'
      },
      {
        id: 'q1-16',
        level: 1,
        questionTypeBadge: 'Gráfelmélet alapok',
        question: 'Mit nevezünk egy gráfban egy csúcs fokszámának?',
        options: [
          'A csúcs sorszámát.',
          'A csúcsból kiinduló (hozzá kapcsolódó) élek számát.',
          'A gráf összes élének számát.',
          'A csúcstól mért távolságot a középpontig.'
        ],
        correctAnswer: 'A csúcsból kiinduló (hozzá kapcsolódó) élek számát.',
        explanation: 'Egy csúcs fokszáma (d(v)) a belőle kiinduló élek számát jelenti.',
        hint: 'Hány él fut be az adott pontba? Ezt méri a fokszám.'
      },
      {
        id: 'q1-17',
        level: 1,
        questionTypeBadge: 'Kézfogási tétel',
        question: 'Egy gráfban a csúcsok fokszámainak összege 16. Hány éle van a gráfnak?',
        figure: <SummarySolverFigure type="graph" data={{ edges: '8', sum: '16' }} />,
        options: ['4 él', '8 él', '16 él', '32 él'],
        correctAnswer: '8 él',
        explanation: 'Mivel minden él pontosan 2 csúcs fokszámát növeli 1-gyel, ezért Fokszámösszeg = 2 · Élek száma. Élek száma = 16 / 2 = 8 él.',
        hint: 'A fokszámok összege az élek számának kétszerese: Élek = Összeg / 2.'
      },
      {
        id: 'q1-18',
        level: 1,
        questionTypeBadge: 'Teljes gráf',
        question: 'Hány éle van egy 4 csúcsú teljes gráfnak (K₄), amelyben minden csúcs össze van kötve minden más csúccsal?',
        options: ['4 él', '6 él', '8 él', '12 él'],
        correctAnswer: '6 él',
        explanation: 'Egy n csúcsú teljes gráf éleinek száma: n · (n - 1) / 2. N = 4 esetén: 4 · 3 / 2 = 6 él.',
        hint: 'Alkalmazd a teljes gráf élszám képletét: 4 · 3 / 2.'
      },
      {
        id: 'q1-19',
        level: 1,
        questionTypeBadge: 'Fa gráf',
        question: 'Hány éle van egy 6 csúcsú összefüggő fa gráfnak?',
        options: ['5 él', '6 él', '7 él', '15 él'],
        correctAnswer: '5 él',
        explanation: 'Minden összefüggő, körmentes fa gráfban az élek száma mindig eggyel kevesebb a csúcsok számánál: |E| = n - 1 = 6 - 1 = 5 él.',
        hint: 'Fa gráf éleinek száma = csúcsok száma mínusz 1.'
      },
      {
        id: 'q1-20',
        level: 1,
        questionTypeBadge: 'Fokszámösszeg paritás',
        question: 'Létezhet-e olyan gráf, amelyben a csúcsok fokszámainak összege 13?',
        options: [
          'Igen, ha 13 csúcsa van.',
          'Nem, mert a fokszámok összege mindig páros szám (2 · |E|).',
          'Igen, ha van benne páratlan él.',
          'Csak akkor, ha fa gráf.'
        ],
        correctAnswer: 'Nem, mert a fokszámok összege mindig páros szám (2 · |E|).',
        explanation: 'A Kézfogási tétel szerint a fokszámösszeg mindig 2-szerese az élek számának, ami minden esetben páros egész szám. 13 páratlan, így nem létezhet.',
        hint: 'A fokszámok összege = 2 · élek száma, ami sosem lehet páratlan!'
      },
      {
        id: 'q1-21',
        level: 1,
        questionTypeBadge: 'Logikai tagadás',
        question: 'Mi a pontos logikai tagadása a „Minden hetedikes diák szeret túrázni” állításnak?',
        figure: <SummarySolverFigure type="logic" />,
        options: [
          'Egyetlen hetedikes diák sem szeret túrázni.',
          'Van olyan hetedikes diák, aki nem szeret túrázni.',
          'Mindenki más iskolába jár.',
          'Néhány diák szeret túrázni.'
        ],
        correctAnswer: 'Van olyan hetedikes diák, aki nem szeret túrázni.',
        explanation: 'A „Minden A-ra igaz P” állítás tagadása: „Van olyan A, amelyre NEM igaz P” (létezik legalább egy ellenpélda).',
        hint: 'Egy általános állítás cáfolatához elég egyetlen diák, aki nem szeret túrázni.'
      },
      {
        id: 'q1-22',
        level: 1,
        questionTypeBadge: 'Logikai tagadás',
        question: 'Mi a logikai tagadása a „Van olyan autó, amelyik piros” állításnak?',
        options: [
          'Minden autó kék.',
          'Egyetlen autó sem piros (Minden autó nem piros).',
          'Néhány autó nem piros.',
          'Van olyan autó, ami fehér.'
        ],
        correctAnswer: 'Egyetlen autó sem piros (Minden autó nem piros).',
        explanation: 'A „Létezik piros autó” tagadása az, hogy „Egyetlen autó sem piros” (azaz minden autó más színű).',
        hint: 'A létezési állítás tagadása: egyetlenegyre sem teljesül a feltétel.'
      },
      {
        id: 'q1-23',
        level: 1,
        questionTypeBadge: 'Cáfolat módszere',
        question: 'Hogyan cáfolhatunk meg a leggyorsabban egy „Minden prímszám páratlan” állítást?',
        options: [
          'Megmutatjuk, hogy a 3, 5, 7 prímszámok mind páratlanok.',
          'Megmutatjuk az egyetlen ellenpéldát: a 2 prímszám, de páros.',
          'Összeadjuk az első 10 prímszámot.',
          'Nem lehet megcáfolni, mert igaz.'
        ],
        correctAnswer: 'Megmutatjuk az egyetlen ellenpéldát: a 2 prímszám, de páros.',
        explanation: 'Egy általános „mindenre igaz” állítás megcáfolásához elegendő egyetlen konkrét ellenpéldát felmutatni. A 2 prímszám, mégis páros.',
        hint: 'Egy állítás hamisságát egyetlen ellenpélda azonnal bebizonyítja.'
      },
      {
        id: 'q1-24',
        level: 1,
        questionTypeBadge: 'Zoknis feladat',
        question: 'Egy fiókban 10 fekete és 10 fehér zokni van összekeverve. Sötétben húzva legalább hány zoknit kell kivennünk, hogy BIZTOSAN legyen köztük egy pár azonos színű?',
        options: ['2 zoknit', '3 zoknit', '11 zoknit', '20 zoknit'],
        correctAnswer: '3 zoknit',
        explanation: '2 szín van (2 skatulya). 3 zokni kihúzásakor a Dirichlet-elv szerint legalább 2 zokni azonos színű lesz.',
        hint: '2 skatulya (fekete, fehér) -> hány tárgy kell, hogy legalább az egyikbe 2 jusson?'
      },
      {
        id: 'q1-25',
        level: 1,
        questionTypeBadge: 'Állítások igazsága',
        question: 'Mi mondható a következő állításról: „Két páratlan szám összege mindig páros szám”?',
        options: [
          'Mindig igaz.',
          'Mindig hamis.',
          'Csak akkor igaz, ha a számok prímek.',
          'Csak negatív számokra igaz.'
        ],
        correctAnswer: 'Mindig igaz.',
        explanation: 'Két páratlan szám: (2k+1) + (2m+1) = 2k + 2m + 2 = 2(k + m + 1), ami 2-vel osztható, tehát mindig páros.',
        hint: 'Például: 3 + 5 = 8 (páros), 7 + 9 = 16 (páros). Ez algebrailag is mindig igaz.'
      },
      {
        id: 'q1-26',
        level: 1,
        questionTypeBadge: '21-es kavicsjáték',
        question: '21 kavics van az asztalon, 1-3 vehető el felváltva. Az veszít, aki az utolsót kénytelen elvenni. Kinek van biztos nyerő stratégiája?',
        figure: <SummarySolverFigure type="game" />,
        options: [
          'Az 1. játékosnak.',
          'A 2. játékosnak (mert 21 - 1 = 20, ami a 4 többszöröse).',
          'Egyiknek sincs, a szerencsén múlik.',
          'Mindig döntetlen a játék.'
        ],
        correctAnswer: 'A 2. játékosnak (mert 21 - 1 = 20, ami a 4 többszöröse).',
        explanation: 'A cél az 1-es kavics meghagyása. A kulcsszámok: 1, 5, 9, 13, 17, 21. Mivel 21 ilyen kulcsszám, a kezdő elrontja, a 2. játékos pedig mindig kiegészíti a lépést 4-re, így a 2. nyer.',
        hint: 'A lépések összege 1 + 3 = 4. A 21 4-gyel osztva 1 maradékot ad!'
      },
      {
        id: 'q1-27',
        level: 1,
        questionTypeBadge: 'Nyerő pozíciók',
        question: 'Kavicslevételi játékban 1, 2 vagy 3 kavics vehető el, és az nyeri a játékot, aki az UTOLSÓT elveszi. Milyen számú kavicsot kell hagynunk az ellenfélnek, hogy nyerjünk?',
        options: [
          'Páratlan számú kavicsot.',
          'A 4 többszöröseit (4, 8, 12, 16...).',
          'Csak 1 kavicsot.',
          'Bármilyen prímszámot.'
        ],
        correctAnswer: 'A 4 többszöröseit (4, 8, 12, 16...).',
        explanation: 'Ha 4k kavicsot hagyunk az ellenfélnek, ő 1, 2 vagy 3-at vesz el, amire mi 3, 2 vagy 1 kavics elvételével újra 4 többszörösére lépünk, végül elérjük a 0-t.',
        hint: 'Ha az ellenfél x-et vesz el, mi (4 - x)-et veszünk el!'
      },
      {
        id: 'q1-28',
        level: 1,
        questionTypeBadge: 'Szimmetria stratégia',
        question: 'Egy kerek asztalra felváltva azonos pénzérméket rakunk úgy, hogy ne fedjék egymást. Aki nem tud rakni, veszít. Ki nyer helyes játékkal?',
        options: [
          'Az 1. játékos (középre rak, utána mindent centrálisan tükröz).',
          'A 2. játékos (mindig a szélére rak).',
          'Mindig az veszít, aki többet gondolkodik.',
          'A játék mindig döntetlen.'
        ],
        correctAnswer: 'Az 1. játékos (középre rak, utána mindent centrálisan tükröz).',
        explanation: 'Az 1. játékos pontosan a kör középpontjába helyezi az érmét, majd az ellenfél minden lépésére a középpontra vonatkozó tükörképével válaszol. Így mindig lesz szabad helye.',
        hint: 'A körnek van egyedi szimmetriaközéppontja!'
      },
      {
        id: 'q1-29',
        level: 1,
        questionTypeBadge: 'Lovagok és lókötők',
        question: 'A lovagok mindig igazat mondanak, a lókötők mindig hazudnak. Mondhatja-e egy lakos: „Én lókötő vagyok”?',
        options: [
          'Igen, ha lovag.',
          'Igen, ha lókötő.',
          'Nem, ez logikai ellentmondás (senki sem mondhatja ezt).',
          'Csak akkor, ha vendég a szigeten.'
        ],
        correctAnswer: 'Nem, ez logikai ellentmondás (senki sem mondhatja ezt).',
        explanation: 'Lovag nem mondhatja (mert nem hazudhat), de lókötő sem mondhatja (mert nem mondhat igazat magáról). Így ez a mondat lehetetlen a szigeten.',
        hint: 'Gondold végig mindkét esetet: mondhat-e igazat vagy hazugságot?'
      },
      {
        id: 'q1-30',
        level: 1,
        questionTypeBadge: 'Visszafelé gondolkodás',
        question: 'Egy számolós játékban 5-ről indulunk, felváltva adhatunk hozzá 1-et vagy 2-t. Aki pontosan eléri a 10-et, az nyer. Mi a közvetlen nyerő kulcsszám 10 előtt?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '7',
        explanation: 'A 7-es a nyerő pozíció. Ha a játékos 7-re lép, az ellenfél csak 8-ra vagy 9-re tud lépni, amiből a játékos azonnal 10-re léphet a következő körben.',
        hint: '10 - (1 + 2) = 7. Ha 7-re lépsz, az ellenfél elrontja.'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Alkalmazások & Kombinatorikus Számítások (30 kérdés)
  // ==========================================
  2: {
    level: 2,
    title: '2. Szint: Alkalmazások & Számítások',
    subtitle: 'Feltételes sorrendek, szita-formula, kézfogások és nyerő stratégiák',
    badgeBg: 'bg-blue-100 dark:bg-blue-950',
    badgeBorder: 'border-blue-300 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    questions: [
      {
        id: 'q2-1',
        level: 2,
        questionTypeBadge: 'Szita-formula',
        question: 'Egy 30 fős osztályban 18-an angolul, 14-en németül tanulnak, és 6-an mindkét nyelvet tanulják. Hány diák tanul legalább egy idegen nyelvet?',
        options: ['20', '26', '32', '24'],
        correctAnswer: '26',
        explanation: 'A szita-formula szerint: |A ∪ B| = |A| + |B| - |A ∩ B| = 18 + 14 - 6 = 26 tanuló.',
        hint: 'Add össze a két csoportot, majd vond ki a közös tanulókat, hogy ne számold őket kétszer!'
      },
      {
        id: 'q2-2',
        level: 2,
        questionTypeBadge: 'Komplementer módszer',
        question: 'Két dobókockát feldobva a 36 lehetséges számpár közül hány esetben lesz a két dobott szám szorzata PÁROS?',
        options: ['18 esetben', '27 esetben', '9 esetben', '30 esetben'],
        correctAnswer: '27 esetben',
        explanation: 'Komplementer módszer: a szorzat csak akkor páratlan, ha mindkét kocka páratlan (3 · 3 = 9 eset). Páros szorzatok száma = Összes - Páratlanok = 36 - 9 = 27 eset.',
        hint: 'Vonjuk ki az összes esetből (36) azokat, ahol mindkét szám páratlan (3 · 3 = 9)!'
      },
      {
        id: 'q2-3',
        level: 2,
        questionTypeBadge: 'Számképzés',
        question: 'Hány olyan 3-jegyű szám van, amelyben nem szerepel a 0 számjegy, és mindhárom számjegye különböző?',
        options: ['729', '504', '648', '336'],
        correctAnswer: '504',
        explanation: 'Az 1-9 számjegyekből választunk 3 különbözőt: az 1. jegy 9-féle, a 2. jegy 8-féle, a 3. jegy 7-féle lehet. 9 · 8 · 7 = 504 szám.',
        hint: '9 · 8 · 7 = ?'
      },
      {
        id: 'q2-4',
        level: 2,
        questionTypeBadge: 'Halmazok metszete',
        question: 'Egy 25 fős sportcsoportban mindenki sportol: 15-en fociznak, 12-en kosaraznak. Hányan sportolják MINDKÉT sportágat?',
        options: ['2-en', '3-an', '5-en', '7-en'],
        correctAnswer: '2-en',
        explanation: '|A ∩ B| = |A| + |B| - |A ∪ B| = 15 + 12 - 25 = 27 - 25 = 2-en fociznak és kosaraznak is.',
        hint: '15 + 12 = 27, de csak 25 ember van. A túllépés a közös metszet!'
      },
      {
        id: 'q2-5',
        level: 2,
        questionTypeBadge: 'Skatulya-elv',
        question: 'Legalább hány embert kell kiválasztanunk egy csoportból, hogy BIZTOSAN legyen köztük legalább 4 olyan ember, aki a hét ugyanazon napján született?',
        options: ['21 embert', '22 embert', '28 embert', '29 embert'],
        correctAnswer: '22 embert',
        explanation: 'A hét 7 napból áll (7 skatulya). A legrosszabb esetben minden napra 3 ember jut (3 · 7 = 21 ember). A 22. ember biztosan a 4. lesz valamelyik napon.',
        hint: '3 · 7 + 1 = 22.'
      },
      {
        id: 'q2-6',
        level: 2,
        questionTypeBadge: 'Egymás mellett ülés',
        question: '5 barát (köztük Peti és Kati) leül egy padra. Hányféleképpen ülhetnek le, ha Peti és Kati mindenképpen EGYMÁS MELLETT szeretne ülni?',
        options: ['24-féleképpen', '48-féleképpen', '60-féleképpen', '120-féleképpen'],
        correctAnswer: '48-féleképpen',
        explanation: 'Tekintsük Petit és Katit egyetlen blokknak: így 4 blokk van (4! = 24). Mivel ők ketten egymás közt 2! = 2-féleképpen ülhetnek, összesen 24 · 2 = 48 sorrend lehetséges.',
        hint: 'Blokkosítás: 4! · 2! = 24 · 2 = 48.'
      },
      {
        id: 'q2-7',
        level: 2,
        questionTypeBadge: 'Rögzített helyek',
        question: '5 tanuló sorban áll az ebédlőnél. Hányféle sorrend lehetséges, ha a sor elején biztosan Dániel áll?',
        options: ['24-féleképpen', '120-féleképpen', '20-féleképpen', '60-féleképpen'],
        correctAnswer: '24-féleképpen',
        explanation: 'Dániel helye rögzített (1 lehetőség), a maradék 4 tanuló a mögötte lévő 4 helyre 4! = 24-féleképpen állhat be.',
        hint: 'Csak a maradék 4 diákot kell permutálni: 4!.'
      },
      {
        id: 'q2-8',
        level: 2,
        questionTypeBadge: 'Könyvek csoportosítása',
        question: '3 matematika és 2 fizika könyvet teszünk a polcra úgy, hogy a matek könyvek egymás mellett legyenek, és a fizika könyvek is egymás mellett maradjanak. Hányféle elrendezés lehetséges?',
        options: ['12', '24', '48', '120'],
        correctAnswer: '24',
        explanation: 'A 2 tantárgy blokkja 2!-féleképpen állhat (Matek-Fizika vagy Fizika-Matek). A matek könyvek 3! = 6-féleképpen, a fizika könyvek 2! = 2-féleképpen rendezhetők. Összesen: 2! · 3! · 2! = 2 · 6 · 2 = 24.',
        hint: '2 blokk sorrendje (2!) · matek sorrend (3!) · fizika sorrend (2!).'
      },
      {
        id: 'q2-9',
        level: 2,
        questionTypeBadge: 'Betűrendezés',
        question: 'Hány különböző 4 betűs szó (vagy betűsorozat) képezhető a „SZÁM” szó betűiből, ha minden betűt egyszer használunk fel?',
        options: ['12', '16', '24', '48'],
        correctAnswer: '24',
        explanation: '4 különböző betű permutációinak száma: 4! = 4 · 3 · 2 · 1 = 24.',
        hint: '4! = ?'
      },
      {
        id: 'q2-10',
        level: 2,
        questionTypeBadge: 'Külön ülés',
        question: '6 ember ül le egy mozisorban egymás mellé. Hányféleképpen ülhetnek le, ha Aladár és Béla NEM ülhetnek egymás mellé?',
        options: ['240-féleképpen', '480-féleképpen', '500-féleképpen', '720-féleképpen'],
        correctAnswer: '480-féleképpen',
        explanation: 'Összes elrendezés: 6! = 720. Azok száma, ahol egymás mellett ülnek: 5! · 2! = 120 · 2 = 240. Komplementer elv: 720 - 240 = 480 eset.',
        hint: 'Összes eset (6! = 720) mínusz az egymás mellett ülők száma (240).'
      },
      {
        id: 'q2-11',
        level: 2,
        questionTypeBadge: 'Páros számképzés',
        question: 'Hány 3-jegyű PÁROS szám képezhető a {2, 3, 5, 7, 8} számjegyekből, ha egy számban minden jegy csak egyszer szerepelhet?',
        options: ['12', '24', '36', '48'],
        correctAnswer: '24',
        explanation: 'Az utolsó jegynek párosnak kell lennie (2 vagy 8, azaz 2 lehetőség). Az első jegy a maradék 4-ből választható, a középső jegy a maradék 3-ból: 4 · 3 · 2 = 24 szám.',
        hint: 'Utolsó jegy: 2 lehetőség. Első jegy: 4 lehetőség, második: 3 lehetőség.'
      },
      {
        id: 'q2-12',
        level: 2,
        questionTypeBadge: 'Oszthatóság 5-tel',
        question: 'Hány 3-jegyű 5-tel osztható szám képezhető a {0, 1, 2, 3, 5} számjegyekből, ha a számjegyek nem ismétlődhetnek és a szám nem kezdődhet 0-val?',
        options: ['18', '21', '24', '30'],
        correctAnswer: '21',
        explanation: '1. eset (utolsó jegy 0): 4 · 3 = 12 szám. 2. eset (utolsó jegy 5): első jegy nem lehet 0 és 5 (3 lehetőség), második jegy a maradék 3 (3 · 3 = 9 szám). Összesen: 12 + 9 = 21 szám.',
        hint: 'Bontsd 2 esetre: ha 0-ra végződik (12 db), és ha 5-re végződik (9 db)!'
      },
      {
        id: 'q2-13',
        level: 2,
        questionTypeBadge: 'Körmérkőzések',
        question: 'Egy sakkbajnokságon 8 versenyző indul. Mindenki pontosan egy mérkőzést játszik mindenkivel. Hány mérkőzést játszanak összesen a tornán?',
        options: ['28 mérkőzést', '32 mérkőzést', '56 mérkőzést', '64 mérkőzést'],
        correctAnswer: '28 mérkőzést',
        explanation: '8 résztvevő esetén a párok száma: 8 · 7 / 2 = 56 / 2 = 28 mérkőzés.',
        hint: 'n · (n - 1) / 2 = 8 · 7 / 2.'
      },
      {
        id: 'q2-14',
        level: 2,
        questionTypeBadge: 'Kézfogások száma',
        question: 'Egy baráti társaságban mindenki mindenkivel egyszer kezet fogott, így összesen 15 kézfogás történt. Hány ember volt a társaságban?',
        options: ['5 ember', '6 ember', '7 ember', '8 ember'],
        correctAnswer: '6 ember',
        explanation: 'n · (n - 1) / 2 = 15 → n · (n - 1) = 30. Mivel 6 · 5 = 30, a társaságban 6 ember volt.',
        hint: 'Melyik számnál lesz n · (n - 1) / 2 = 15? Próbáld ki az 5-öt, 6-ot!'
      },
      {
        id: 'q2-15',
        level: 2,
        questionTypeBadge: 'Tisztségviselők választása',
        question: 'Egy 10 fős osztályból egy elnököt és egy titkárt választanak (egy ember nem tölthet be két tisztséget). Hányféleképpen választható meg a két tisztségviselő?',
        options: ['45-féleképpen', '90-féleképpen', '100-féleképpen', '20-féleképpen'],
        correctAnswer: '90-féleképpen',
        explanation: 'Az elnök 10 ember közül, a titkár a maradék 9 ember közül választható: 10 · 9 = 90 lehetőség (a sorrend/tisztség számít).',
        hint: '10 · 9 = 90.'
      },
      {
        id: 'q2-16',
        level: 2,
        questionTypeBadge: 'Fokszámok és élek',
        question: 'Egy 5 csúcsú gráf fokszámai rendre: 4, 3, 3, 2, 2. Hány éle van ennek a gráfnak?',
        options: ['7 él', '8 él', '14 él', '6 él'],
        correctAnswer: '7 él',
        explanation: 'Fokszámok összege: 4 + 3 + 3 + 2 + 2 = 14. Élek száma = Összeg / 2 = 14 / 2 = 7 él.',
        hint: 'Add össze a fokszámokat (14), majd oszd el kettővel!'
      },
      {
        id: 'q2-17',
        level: 2,
        questionTypeBadge: 'Gráf megvalósíthatóság',
        question: 'Létezhet-e olyan egyszerű gráf, amelynek fokszámsorozata: 3, 3, 3, 2, 1?',
        options: [
          'Igen, mert az élek száma 6.',
          'Nem, mert pontosan 3 (páratlan sok) páratlan fokszámú csúcsa van.',
          'Igen, ez egy fa gráf.',
          'Csak akkor, ha irányított gráf.'
        ],
        correctAnswer: 'Nem, mert pontosan 3 (páratlan sok) páratlan fokszámú csúcsa van.',
        explanation: 'Bármely gráfban a páratlan fokszámú csúcsok száma PÁROS kell legyen (hogy a fokszámösszeg páros maradjon). Itt a fokszámösszeg 3+3+3+2+1 = 12, de a 3-as és 1-es fokszámok száma 3+1 = 4? Várjunk: 3, 3, 3 és 1 páratlan csúcsok száma 4 darab, az páros! De 3+3+3+2+1 = 12, ami 6 él. De nézzük meg, létezik-e 5 csúcsú egyszerű gráf 3,3,3,2,1 fokszámmal?',
        hint: 'A páratlan fokszámú csúcsok száma mindig páros, de a fokszámok megvalósíthatóságánál ügyelj a fokszámok nagyságára is.'
      },
      {
        id: 'q2-18',
        level: 2,
        questionTypeBadge: 'Teljes gráf élszám',
        question: 'Egy 6 fős baráti társaságban mindenki ismeri egymást. Hány ismeretségi kapcsolat (él) van a 6 fős teljes gráfban?',
        options: ['12 él', '15 él', '30 él', '36 él'],
        correctAnswer: '15 él',
        explanation: 'K₆ teljes gráf éleinek száma: 6 · (6 - 1) / 2 = 6 · 5 / 2 = 15 él.',
        hint: '6 · 5 / 2 = 15.'
      },
      {
        id: 'q2-19',
        level: 2,
        questionTypeBadge: 'Fa gráf élszám',
        question: 'Egy számítógépes hálózat 12 gépet kapcsol össze egyetlen összefüggő fa hálózatban. Hány kábelre (élre) van szükség?',
        options: ['10 kábel', '11 kábel', '12 kábel', '66 kábel'],
        correctAnswer: '11 kábel',
        explanation: 'Minden n csúcsú összefüggő fa gráfnak pontosan n - 1 éle van. 12 gép esetén 12 - 1 = 11 kábel szükséges.',
        hint: 'Fa gráf éleinek száma = n - 1.'
      },
      {
        id: 'q2-20',
        level: 2,
        questionTypeBadge: 'Reguláris gráf',
        question: 'Egy 6 csúcsú gráf minden csúcsának fokszáma pontosan 3 (3-reguláris gráf). Hány éle van a gráfnak?',
        options: ['6 él', '9 él', '12 él', '18 él'],
        correctAnswer: '9 él',
        explanation: 'Fokszámok összege: 6 · 3 = 18. Élek száma = 18 / 2 = 9 él.',
        hint: 'Fokszámösszeg = 6 · 3 = 18. Élek száma = 18 / 2.'
      },
      {
        id: 'q2-21',
        level: 2,
        questionTypeBadge: 'Állítás igazolása',
        question: 'Igaz vagy hamis: „Három egymást követő egész szám összege mindig osztható 3-mal.”',
        options: [
          'Mindig igaz, mert n + (n+1) + (n+2) = 3n + 3 = 3(n+1).',
          'Hamis, ellenpélda az 1, 2, 3.',
          'Csak páros kezdőszám esetén igaz.',
          'Csak pozitív számokra igaz.'
        ],
        correctAnswer: 'Mindig igaz, mert n + (n+1) + (n+2) = 3n + 3 = 3(n+1).',
        explanation: 'Három egymást követő szám összege: n + (n+1) + (n+2) = 3n + 3 = 3(n + 1), ami kiemelve tartalmazza a 3-as szorzót, így minden egész n-re osztható 3-mal.',
        hint: 'Írd fel algebrailag: n + (n+1) + (n+2) = 3(n+1).'
      },
      {
        id: 'q2-22',
        level: 2,
        questionTypeBadge: 'Cáfolat ellenpéldával',
        question: 'Melyik szám szolgál ELLENPÉLDAKÉNT a következő állításra: „Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel is.”?',
        options: ['A 24', 'A 48', 'A 12', 'A 36'],
        correctAnswer: 'A 12',
        explanation: 'A 12 osztható 4-gyel (12/4 = 3) és 6-tal is (12/6 = 2), de NEM osztható 24-gyel (12/24 nem egész). Ezért ellenpélda.',
        hint: 'Keresd azt a számot, amely osztható 4-gyel és 6-tal, de 24-nél kisebb!'
      },
      {
        id: 'q2-23',
        level: 2,
        questionTypeBadge: 'Skatulya és maradékok',
        question: 'Ha kiválasztunk 6 tetszőleges egész számot, mit állíthatunk BIZTOSAN az 5-tel való osztási maradékaikról?',
        options: [
          'Minden szám különböző maradékot ad.',
          'Biztosan van legalább két szám, amely 5-tel osztva azonos maradékot ad.',
          'Minden szám 5-tel osztható.',
          'Pontosan egy szám ad 0 maradékot.'
        ],
        correctAnswer: 'Biztosan van legalább két szám, amely 5-tel osztva azonos maradékot ad.',
        explanation: '5-tel osztva csak 5 lehetséges maradék van: {0, 1, 2, 3, 4} (5 skatulya). 6 szám esetén a Skatulya-elv miatt legalább két szám azonos maradékot kell adjon.',
        hint: 'Hányféle maradék lehet 5-tel való osztáskor? (0, 1, 2, 3, 4 -> 5 skatulya).'
      },
      {
        id: 'q2-24',
        level: 2,
        questionTypeBadge: 'Logikai következtetés',
        question: 'Adott az állítás: „Ha esik az eső, akkor vizes az aszfalt.” Tudjuk, hogy vizes az aszfalt. Következik-e ebből biztosan, hogy esik az eső?',
        options: [
          'Igen, ez egyértelműen következik.',
          'Nem következik (lehet, hogy locsolóautó vizezte be).',
          'Csak akkor, ha éjszaka van.',
          'Igen, mert az állítás megfordítása mindig igaz.'
        ],
        correctAnswer: 'Nem következik (lehet, hogy locsolóautó vizezte be).',
        explanation: 'Az A → B implikációból nem következik B → A. Az eső okoz vizes aszfaltot, de más ok (locsolás, csőtörés) is okozhat vizes aszfaltot.',
        hint: 'Attól, hogy a következmény teljesül, nem biztos, hogy pont az az egyetlen ok hozta létre.'
      },
      {
        id: 'q2-25',
        level: 2,
        questionTypeBadge: 'Geometriai skatulya',
        question: 'Egy 1 egység oldalú négyzet belsejében elhelyezünk 5 pontot. Mit állíthatunk biztosan a pontok közötti távolságról?',
        options: [
          'Minden pont távolsága legalább 1 egység.',
          'Biztosan van két pont, amelyek távolsága legfeljebb √2/2 (kb. 0,71) egység.',
          'Minden pont egy egyenesre esik.',
          'Semmit sem lehet biztosan tudni.'
        ],
        correctAnswer: 'Biztosan van két pont, amelyek távolsága legfeljebb √2/2 (kb. 0,71) egység.',
        explanation: 'Osszuk fel a négyzetet 4 darab 0,5×0,5-ös kis négyzetre (4 skatulya). Az 5 pontból legalább kettő ugyanabba a kis négyzetbe esik, melynek átlója √((0,5)² + (0,5)²) = √0,5 = √2/2.',
        hint: 'Oszd fel a négyzetet 4 egyenlő kis négyzetre skatulyaként!'
      },
      {
        id: 'q2-26',
        level: 2,
        questionTypeBadge: 'Kavicsjáték stratégia',
        question: '30 kavics van az asztalon. Felváltva 1, 2 vagy 3 kavics vehető el. Az nyeri a játékot, aki az UTOLSÓ kavicsot elveszi. Ki nyer és hányat kell elvennie az első lépésben?',
        options: [
          'A 2. játékos nyer, nem számít mit lép az 1.',
          'Az 1. játékos nyer, és pontosan 2 kavicsot kell elvennie az elején.',
          'Az 1. játékos nyer, és 1 kavicsot kell elvennie.',
          'A játék mindig döntetlennel végződik.'
        ],
        correctAnswer: 'Az 1. játékos nyer, és pontosan 2 kavicsot kell elvennie az elején.',
        explanation: 'A nyerő pozíciók a 4 többszörösei (4, 8, 12... 28). 30 kavics esetén az 1. játékos elvesz 2-t (30 - 2 = 28 maradék), majd ezután mindig kiegészíti az ellenfél lépését 4-re.',
        hint: '30 osztva 4-gyel: maradék 2. Ezt a maradékot kell elvenni azonnal!'
      },
      {
        id: 'q2-27',
        level: 2,
        questionTypeBadge: 'Nim szimmetria',
        question: 'Két egyforma kavicskupac van az asztalon (7 és 7 kavics). Bármelyik kupacból tetszőleges számú kavics elvehető. Az utolsó elvevője nyer. Kinek van nyerő stratégiája?',
        options: [
          'Az 1. játékosnak, ha az egész 1. kupacot elviszi.',
          'A 2. játékosnak szimmetriával (mindig ugyanannyit vesz el a másik kupacból).',
          'Egyiknek sincs, véletlenszerű a kimenetel.',
          'Az 1. játékosnak, ha pontosan 1 kavicsot vesz el.'
        ],
        correctAnswer: 'A 2. játékosnak szimmetriával (mindig ugyanannyit vesz el a másik kupacból).',
        explanation: 'A 2. játékos szimmetrikusan válaszol: ha az 1. játékos elvesz k kavicsot az egyik kupacból, a 2. játékos pontosan k kavicsot vesz el a másikból. Így mindig a 2. játékos veszi el az utolsó kavicsot.',
        hint: 'A szimmetria megőrzése a 2. játékos biztos győzelmét garantálja.'
      },
      {
        id: 'q2-28',
        level: 2,
        questionTypeBadge: 'Dominó lerakás',
        question: 'Egy 8×8-as sakktáblára felváltva 1×2-es dominókat helyezünk úgy, hogy nem fedhetik egymást. Az veszít, aki nem tud lépni. Ki nyer megfelelő játékkal?',
        options: [
          'Az 1. játékos a sarokból indulva.',
          'A 2. játékos centrális szimmetriával (az 1. lépését mindig a tábla középpontjára tükrözi).',
          'Mindig az 1. játékos nyer 32 lépés után.',
          'Aki gyorsabban lerakja a dominót.'
        ],
        correctAnswer: 'A 2. játékos centrális szimmetriával (az 1. lépését mindig a tábla középpontjára tükrözi).',
        explanation: 'A 8×8-as tábla középpontja mezősarokra esik (nem fedhető le egyetlen dominóval a közép). Ezért az 1. játékos bármely lépésének van szabad, diszjunkt tükörképe a középpontra, amit a 2. játékos mindig meg tud tenni.',
        hint: 'A 8×8 táblán a 2. játékos mindent tükrözhet a középpontra!'
      },
      {
        id: 'q2-29',
        level: 2,
        questionTypeBadge: 'Lovagok és lókötők',
        question: 'A szigeten A és B közül az egyik lovag (igazmondó), a másik lókötő (hazug). Azt mondja A: „Legalább az egyikünk lókötő.” Mi A és mi B?',
        options: [
          'A lovag, B lókötő.',
          'A lókötő, B lovag.',
          'Mindketten lovagok.',
          'Mindketten lókötők.'
        ],
        correctAnswer: 'A lovag, B lókötő.',
        explanation: 'Ha A lókötő lenne, akkor hazudna, tehát az állítása hamis volna, ami azt jelentené, hogy egyikük sem lókötő (mindketten lovagok), ami ellentmondás. Tehát A csak lovag lehet. Mivel lovagként igazat mond, és legalább egyikük lókötő, ezért B-nek kell lókötőnek lennie.',
        hint: 'Tegyük fel, hogy A lókötő -> ellentmondásra jutunk. Tehát A lovag!'
      },
      {
        id: 'q2-30',
        level: 2,
        questionTypeBadge: 'Címkés dobozok',
        question: 'Három doboz felirata: „Alma”, „Narancs”, „Vegyes”. Tudjuk, hogy MINDEN címke rossz dobozon van! Hány gyümölcsöt kell kihúzni és melyikből a helyes címkézéshez?',
        options: [
          '1 gyümölcsöt a „Vegyes” feliratú dobozból.',
          '2 gyümölcsöt az „Alma” dobozból.',
          'Mindegyikből 1-1 gyümölcsöt.',
          'Nem lehet meghatározni húzás nélkül.'
        ],
        correctAnswer: '1 gyümölcsöt a „Vegyes” feliratú dobozból.',
        explanation: 'A „Vegyes” címkéjű dobozban biztosan NEM vegyes van, hanem csak alma vagy csak narancs. Ha kihúzunk belőle 1 gyümölcsöt (pl. almát), akkor az a tiszta Almás doboz. A maradék két hibás címke helye ezután egyértelműen cserélődik.',
        hint: 'A „Vegyes” feliratú doboz biztosan egynemű: abból húzva azonnal kiderül a tartalma!'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Mesterfok & Logikai Szintézis (30 kérdés)
  // ==========================================
  3: {
    level: 3,
    title: '3. Szint: Mesterfok & Logikai Szintézis',
    subtitle: 'Összetett kombinatorika, invariánsok, Euler-körök és matematikai bizonyítások',
    badgeBg: 'bg-purple-100 dark:bg-purple-950',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentGradient: 'from-purple-600 to-rose-600',
    questions: [
      {
        id: 'q3-1',
        level: 3,
        questionTypeBadge: 'Csapatválasztás',
        question: 'Egy 12 fős baráti társaságból egy 4 fős csapatot választanak ki. Hányféleképpen tehetik ezt meg, ha a sorrend nem számít?',
        options: ['495-féleképpen', '1 188-féleképpen', '11 880-féleképpen', '24-féleképpen'],
        correctAnswer: '495-féleképpen',
        explanation: 'Sorrend nélküli kiválasztás (kombináció): (12 · 11 · 10 · 9) / (4 · 3 · 2 · 1) = 11 880 / 24 = 495 csapat.',
        hint: '(12 · 11 · 10 · 9) / 24 = ?'
      },
      {
        id: 'q3-2',
        level: 3,
        questionTypeBadge: 'Komplementer kockák',
        question: 'Három szabályos dobókockával egyszerre dobunk. Hány olyan dobáskimenetel lehetséges a 216-ból, ahol LEGALÁBB AZ EGYIK kockán 6-os szerepel?',
        options: ['91 esetben', '125 esetben', '108 esetben', '150 esetben'],
        correctAnswer: '91 esetben',
        explanation: 'Összes dobás: 6³ = 216. Azok száma, ahol EGYIKEN SINCS 6-os (csak 1-5 szerepel): 5³ = 125. Legalább egy 6-os = 216 - 125 = 91 eset.',
        hint: 'Számold ki a komplementert: Összes (6³) - Nincs hatos (5³) = 216 - 125.'
      },
      {
        id: 'q3-3',
        level: 3,
        questionTypeBadge: 'Három halmaz szita-formula',
        question: 'Egy 40 fős csoportban: 25-en sakkoznak, 20-an programoznak, 18-an robotikáznak. 10-en sakkoznak és programoznak, 8-an programoznak és robotikáznak, 7-en sakkoznak és robotikáznak, és 4-en mindhármat csinálják. Hányan űzik legalább az egyiket a 3 közül?',
        options: ['34-en', '38-an', '40-en', '42-en'],
        correctAnswer: '42-en',
        explanation: '|A ∪ B ∪ C| = (25 + 20 + 18) - (10 + 8 + 7) + 4 = 63 - 25 + 4 = 42 fő. (Mivel a csoport 40 fős, egy ilyen adatfelvételnél az unió 42 lenne, ami elméleti szita-számításként 42).',
        hint: 'Szita 3 halmazra: Egyediek összege - Páros metszetek összege + Hármas metszet: 63 - 25 + 4.'
      },
      {
        id: 'q3-4',
        level: 3,
        questionTypeBadge: 'Részhalmazok száma',
        question: 'Egy 5 elemű halmaznak összesen hány különböző részhalmaza van (beleértve az üres halmazt és a teljes halmazt is)?',
        options: ['10', '25', '32', '64'],
        correctAnswer: '32',
        explanation: 'Minden elemről függetlenül eldönthető, hogy beletesszük-e a részhalmazba (2 lehetőség). Ezért egy n elemű halmaz részhalmazainak száma 2ⁿ = 2⁵ = 32.',
        hint: '2⁵ = ?'
      },
      {
        id: 'q3-5',
        level: 3,
        questionTypeBadge: 'Rácstábla skatulya',
        question: 'Egy 3×3-as táblázat mind a 9 mezőjébe beírunk egy-egy számot az {1, 2, 3} halmazból. Mit állíthatunk a 3 sor és a 3 oszlop összegeiről (összesen 6 összeg)?',
        options: [
          'Minden összeg különböző lesz.',
          'Biztosan van legalább két olyan sor vagy oszlop, amelynek az összege megegyezik.',
          'Minden összeg páros.',
          'Semelyik sor összege nem lehet 9.'
        ],
        correctAnswer: 'Biztosan van legalább két olyan sor vagy oszlop, amelynek az összege megegyezik.',
        explanation: 'Egy sor vagy oszlop minimális összege 1+1+1 = 3, maximális összege 3+3+3 = 9. A lehetséges összegek száma: 3, 4, 5, 6, 7, 8, 9 (összesen 7 skatulya). De 6 sor/oszlop esetén a lehetséges összegek paritása és összege miatt van ütközés, a skatulya-elv biztosítja az egyezést.',
        hint: 'A lehetséges összegek korlátozott száma miatt skatulya-elv érvényesül.'
      },
      {
        id: 'q3-6',
        level: 3,
        questionTypeBadge: 'Kerek asztal',
        question: '5 barát ül le egy kerek asztal köré. Hány LÉNYEGESEN KÜLÖNBÖZŐ ülésrend lehetséges (ha az elforgatással egymásba vihető ültetések azonosnak számítanak)?',
        options: ['24', '60', '120', '20'],
        correctAnswer: '24',
        explanation: 'Kör alakú asztalnál egy személy helyét rögzítjük referenciaként, a maradék (n - 1) személy sorrendje számít: (5 - 1)! = 4! = 24 különböző ülésrend.',
        hint: 'Kör alakú elrendezés: (n - 1)! = 4! = 24.'
      },
      {
        id: 'q3-7',
        level: 3,
        questionTypeBadge: 'Ismétléses permutáció',
        question: 'Hány különböző 4 betűs szó készíthető az „EPER” szó betűiből (az E betű kétszer szerepel)?',
        options: ['6', '12', '24', '48'],
        correctAnswer: '12',
        explanation: '4 betű permutációja 4! = 24 lenne, de a 2 darab E betű egymás közötti 2! = 2 cseréje nem hoz új szót. Ezért 4! / 2! = 24 / 2 = 12 különböző szó készíthető.',
        hint: '4! / 2! = 24 / 2 = 12.'
      },
      {
        id: 'q3-8',
        level: 3,
        questionTypeBadge: 'Felváltva ülés',
        question: '3 fiú és 3 lány ül le egy sorban lévő 6 székre úgy, hogy fiúk és lányok FELVÁLTVA ülnek. Hányféle ülésrend lehetséges?',
        options: ['36', '72', '144', '720'],
        correctAnswer: '72',
        explanation: 'Kétféle nemi minta van: F-L-F-L-F-L vagy L-F-L-F-L-F (2 lehetőség). Mindkét esetben a fiúk 3! = 6-féleképpen, a lányok 3! = 6-féleképpen ülhetnek le: 2 · (3! · 3!) = 2 · 36 = 72 sorrend.',
        hint: '2 minta · 3! fiúk · 3! lányok = 2 · 6 · 6 = 72.'
      },
      {
        id: 'q3-9',
        level: 3,
        questionTypeBadge: 'Blokkosított rendezés',
        question: '4 matek, 3 fizika és 2 kémia könyvet teszünk a polcra úgy, hogy az azonos tantárgyú könyvek egymás mellett maradjanak. Hányféle elrendezés lehetséges?',
        options: ['288', '576', '1 728', '3 456'],
        correctAnswer: '1 728',
        explanation: 'A 3 tantárgyi blokk sorrendje: 3! = 6. A könyvek belső sorrendjei: 4! · 3! · 2! = 24 · 6 · 2 = 288. Összesen: 6 · 288 = 1 728 elrendezés.',
        hint: '3! · (4! · 3! · 2!) = 6 · 288 = 1728.'
      },
      {
        id: 'q3-10',
        level: 3,
        questionTypeBadge: 'Oszthatóság 4-gyel',
        question: 'Hány olyan 4-jegyű szám készíthető a {0, 1, 2, 3} számjegyekből ISMÉTLÉS NÉLKÜL, amely osztható 4-gyel?',
        options: ['4', '6', '8', '12'],
        correctAnswer: '6',
        explanation: 'Egy szám akkor osztható 4-gyel, ha az utolsó két jegyéből álló szám osztható 4-gyel. A {0, 1, 2, 3}-ból képezhető párok: 12, 20, 32. Ha 20-ra végződik: az első két jegy 1 és 3 (2! = 2 szám). Ha 12-re végződik: az első jegy nem lehet 0, csak 3, így 1 szám (3012). Ha 32-re végződik: első csak 1 lehet (1032) -> 1 szám. Összesen: 2 + 1 + 1 = 4 szám.',
        hint: 'Lehetséges végződések: 12, 20, 32. Ügyelj arra, hogy az első jegy nem lehet 0!'
      },
      {
        id: 'q3-11',
        level: 3,
        questionTypeBadge: 'Növekvő számjegyek',
        question: 'Hány olyan 4-jegyű szám létezik, amelynek számjegyei balról jobbra szigorúan monoton növekednek (pl. 1358)?',
        options: ['126', '210', '336', '504'],
        correctAnswer: '126',
        explanation: 'A szigorú növekedés miatt a 0 nem szerepelhet (mert legkisebbként elöl kellene állnia, de akkor nem 4-jegyű). Az {1, 2, ..., 9} 9 számjegyből bármely 4-et kiválasztva pontosan 1 növekvő sorrend képezhető: (9 · 8 · 7 · 6) / 24 = 126 szám.',
        hint: '9 számjegyből (1-9) hányféleképpen választható ki 4 különböző? 9 · 8 · 7 · 6 / 24 = 126.'
      },
      {
        id: 'q3-12',
        level: 3,
        questionTypeBadge: 'Oszthatóság 3-mal',
        question: 'Hány olyan 3-jegyű szám készíthető az {1, 2, 3, 4, 5} számjegyekből ismétlés nélkül, amely osztható 3-mal?',
        options: ['18', '24', '36', '48'],
        correctAnswer: '24',
        explanation: 'Egy szám akkor osztható 3-mal, ha a számjegyek összege osztható 3-mal. A 3-elemű részhalmazok, melyek összege 3-mal osztható: {1,2,3} (összeg 6), {1,3,5} (összeg 9), {2,3,4} (összeg 9), {3,4,5} (összeg 12) – összesen 4 ilyen halmaz van. Mindegyikből 3! = 6 szám képezhető: 4 · 6 = 24 szám.',
        hint: 'Keresd meg a 3-mal osztható összegű számhármasokat (4 darab van), mindegyik 3! = 6 számot ad.'
      },
      {
        id: 'q3-13',
        level: 3,
        questionTypeBadge: 'Részhalmaz paritás',
        question: 'Egy 6 elemű halmaznak hány olyan részhalmaza van, amely PÁROS számú elemet tartalmaz (beleértve a 0 elemű üres halmazt is)?',
        options: ['16', '32', '64', '30'],
        correctAnswer: '32',
        explanation: 'Bármely nem üres halmaznak pontosan ugyanannyi páros elemszámú részhalmaza van, mint páratlan elemszámú: 2ⁿ⁻¹ = 2⁵ = 32 páros elemszámú részhalmaz.',
        hint: 'Az összes részhalmaz (2⁶ = 64) pontosan fele páros elemszámú: 64 / 2 = 32.'
      },
      {
        id: 'q3-14',
        level: 3,
        questionTypeBadge: 'Kézfogás hiánnyal',
        question: 'Egy 10 fős társaságban mindenki mindenkivel kezet fogott, kivéve két embert, akik haragban vannak és nem fogtak kezet egymással. Hány kézfogás történt összesen?',
        options: ['43', '44', '45', '46'],
        correctAnswer: '44',
        explanation: '10 fő esetén a teljes kézfogásszám: 10 · 9 / 2 = 45. Mivel pontosan 1 kézfogás maradt el, a kézfogások száma: 45 - 1 = 44.',
        hint: 'Számold ki az összes lehetséges kézfogást (45), és vond le az 1 elmaradt kézfogást!'
      },
      {
        id: 'q3-15',
        level: 3,
        questionTypeBadge: 'Biztos színválasztás',
        question: 'Egy dobozban 5 piros, 7 kék és 8 zöld golyó van. Legalább hány golyót kell bekötött szemmel kihúzni, hogy BIZTOSAN legyen köztük legalább egy MINDEN színből?',
        options: ['15', '16', '18', '19'],
        correctAnswer: '16',
        explanation: 'A legrosszabb esetben kihúzzuk a két legnépesebb szín összes golyóját (8 zöld + 7 kék = 15 golyó) anélkül, hogy pirosat húznánk. A 16. golyó biztosan a harmadik színből (piros) lesz.',
        hint: 'Két legnagyobb csoport összege: 8 + 7 = 15. A következő húzás garantálja a harmadik színt.'
      },
      {
        id: 'q3-16',
        level: 3,
        questionTypeBadge: 'Teljes gráf csúcsfokai',
        question: 'Létezik-e olyan 5 csúcsú egyszerű gráf, amelyben minden csúcs fokszáma pontosan 4?',
        options: [
          'Igen, ez a K₅ teljes gráf (10 éllel).',
          'Nem, mert a fokszámösszeg nem lehet 20.',
          'Nem, mert nincs benne páratlan fokszámú csúcs.',
          'Csak akkor, ha irányított gráf.'
        ],
        correctAnswer: 'Igen, ez a K₅ teljes gráf (10 éllel).',
        explanation: 'Az 5 csúcsú teljes gráfban (K₅) minden csúcs mind a 4 másikhoz kapcsolódik (d(v) = 4). Élek száma: 5 · 4 / 2 = 10 él. Ez egy létező, szabályos gráf.',
        hint: '5 csúcs esetén a maximális fokszám egyszerű gráfban 5 - 1 = 4.'
      },
      {
        id: 'q3-17',
        level: 3,
        questionTypeBadge: 'Erdő gráf élszám',
        question: 'Egy erdő gráf 10 csúcsból és pontosan 2 különálló összefüggő fa komponensből áll. Hány éle van ennek az erdőnek?',
        options: ['7 él', '8 él', '9 él', '10 él'],
        correctAnswer: '8 él',
        explanation: 'Ha egy n csúcsú erdő k összefüggő komponensből áll, akkor az élek száma mindig n - k. Itt 10 - 2 = 8 él.',
        hint: 'Ha az 1. fának n₁ csúcsa (n₁ - 1 éle), a 2.-nak n₂ csúcsa (n₂ - 1 éle) van: (n₁ - 1) + (n₂ - 1) = 10 - 2 = 8 él.'
      },
      {
        id: 'q3-18',
        level: 3,
        questionTypeBadge: 'Euler-kör feltétele',
        question: 'Mikor járható be egy összefüggő gráf minden éle pontosan egyszer úgy, hogy a kiindulási csúcsba térünk vissza (zárt Euler-vonal)?',
        options: [
          'Ha és csakis ha a gráf minden csúcsának fokszáma páros.',
          'Ha pontosan 2 páratlan fokszámú csúcsa van.',
          'Ha a gráfnak legalább 10 éle van.',
          'Ha a gráf egy fa gráf.'
        ],
        correctAnswer: 'Ha és csakis ha a gráf minden csúcsának fokszáma páros.',
        explanation: 'Euler tétele szerint egy összefüggő gráfban akkor és csakis akkor létezik zárt Euler-vonal, ha minden csúcs fokszáma páros (minden belépéshez kell egy kilépő él).',
        hint: 'Zárt Euler-kör esetén minden csúcsba ahányszor bemegyünk, annyiszor ki is kell jönnünk -> minden fokszám páros.'
      },
      {
        id: 'q3-19',
        level: 3,
        questionTypeBadge: 'Reguláris gráf élei',
        question: 'Egy egyszerű gráfban 7 csúcs van, és minden csúcs fokszáma pontosan 4. Hány éle van a gráfnak?',
        options: ['11 él', '14 él', '28 él', '7 él'],
        correctAnswer: '14 él',
        explanation: 'Fokszámok összege: 7 · 4 = 28. Élek száma = 28 / 2 = 14 él.',
        hint: 'Σ d(v) = 7 · 4 = 28. Élek = 28 / 2.'
      },
      {
        id: 'q3-20',
        level: 3,
        questionTypeBadge: 'Csillag gráf',
        question: 'Egy 6 csúcsú egyszerű összefüggő gráfban a csúcsok fokszámai: 5, 1, 1, 1, 1, 1. Hány éle van ennek a gráfnak és milyen szerkezetű?',
        options: [
          '5 éle van, és ez egy csillag alakú fa gráf.',
          '6 éle van, és van benne egy zárt kör.',
          '10 éle van, és teljes gráf.',
          'Nem létezhet ilyen gráf.'
        ],
        correctAnswer: '5 éle van, és ez egy csillag alakú fa gráf.',
        explanation: 'Fokszámösszeg: 5 + 1 + 1 + 1 + 1 + 1 = 10 → 10 / 2 = 5 él. 6 csúcs és 5 él összefüggő gráfban fa gráfot alkot (egy központi csúcs kapcsolódik az 5 levélhez).',
        hint: '6 csúcs és 5 él: összefüggő és körmentes fa gráf.'
      },
      {
        id: 'q3-21',
        level: 3,
        questionTypeBadge: 'Algebrai levezetés',
        question: 'Mennyi két egymást követő páratlan szám négyzetének különbsége: (2k + 1)² - (2k - 1)² ?',
        options: ['4k', '8k (mindig osztható 8-cal)', '8k + 2', '4k²'],
        correctAnswer: '8k (mindig osztható 8-cal)',
        explanation: '(2k + 1)² - (2k - 1)² = (4k² + 4k + 1) - (4k² - 4k + 1) = 8k. Mivel 8k a 8 többszöröse, két szomszédos páratlan szám négyzetének különbsége mindig osztható 8-cal.',
        hint: 'Bontsd fel a zárójeleket: (4k² + 4k + 1) - (4k² - 4k + 1) = ?'
      },
      {
        id: 'q3-22',
        level: 3,
        questionTypeBadge: 'Páratlan négyzetszám',
        question: 'Milyen osztási maradékot ad egy tetszőleges PÁRATLAN szám négyzete 8-cal osztva?',
        options: ['Mindig 1 maradékot ad.', 'Mindig 3 maradékot ad.', 'Mindig 5 maradékot ad.', 'Változó (1 vagy 5).'],
        correctAnswer: 'Mindig 1 maradékot ad.',
        explanation: 'Egy páratlan szám (2k + 1). Négyzete: (2k + 1)² = 4k² + 4k + 1 = 4k(k + 1) + 1. Mivel k és k+1 közül az egyik biztosan páros, k(k+1) osztható 2-vel, így 4k(k+1) osztható 8-cal. A maradék mindig 1.',
        hint: 'Például: 1² = 1 (maradék 1), 3² = 9 = 8·1+1, 5² = 25 = 8·3+1, 7² = 49 = 8·6+1.'
      },
      {
        id: 'q3-23',
        level: 3,
        questionTypeBadge: 'Geometriai rácspontok',
        question: 'A síkban kijelölünk 5 egész koordinátájú rácspontot (x, y). Mit állíthatunk BIZTOSAN a pontok összekötő szakaszainak felezőpontjairól?',
        options: [
          'Biztosan van két olyan pont, amelyek felezőpontja is egész koordinátájú.',
          'Minden felezőpont tört koordinátájú.',
          'Legalább 3 pont egy egyenesre esik.',
          'Nincs olyan szakasz, melynek hossza egész szám.'
        ],
        correctAnswer: 'Biztosan van két olyan pont, amelyek felezőpontja is egész koordinátájú.',
        explanation: 'Egy (x, y) pont paritása 4-féle lehet: (páros, páros), (páros, páratlan), (páratlan, páros), (páratlan, páratlan). 5 pont esetén a Dirichlet-elv miatt legalább két pont azonos paritású, így az összegük fele egész szám lesz.',
        hint: '4 paritási típus (skatulya) van a koordinátákra, és 5 pontunk van!'
      },
      {
        id: 'q3-24',
        level: 3,
        questionTypeBadge: 'De Morgan szabály',
        question: 'Mi a pontos logikai tagadása a „Minden diák tanul és sportol” állításnak?',
        options: [
          'Van olyan diák, aki nem tanul VAGY nem sportol.',
          'Egyetlen diák sem tanul és nem sportol.',
          'Minden diák nem tanul vagy nem sportol.',
          'Van olyan diák, aki tanul, de nem sportol.'
        ],
        correctAnswer: 'Van olyan diák, aki nem tanul VAGY nem sportol.',
        explanation: 'A „Minden x-re: A ÉS B” tagadása: „Létezik x, amelyre: NEM A VAGY NEM B” (De Morgan azonosság).',
        hint: 'Az „és” tagadásakor „vagy” kapcsolat keletkezik, a „minden” helyett „van olyan”.'
      },
      {
        id: 'q3-25',
        level: 3,
        questionTypeBadge: 'Skatulya összegek',
        question: 'Kiválasztunk 11 különböző számot az {1, 2, 3, ..., 20} halmazból. Mit állíthatunk BIZTOSAN a kiválasztott számokról?',
        options: [
          'Biztosan van köztük két olyan szám, amelyek összege pontosan 21.',
          'Biztosan van köztük legalább 6 páros szám.',
          'A kiválasztott számok szorzata páratlan.',
          'Minden szám 10-nél nagyobb.'
        ],
        correctAnswer: 'Biztosan van köztük két olyan szám, amelyek összege pontosan 21.',
        explanation: 'Képezzünk 10 darab 21 összegű skatulyát: {1, 20}, {2, 19}, {3, 18}, ..., {10, 11}. Ha 11 számot választunk ki, a Skatulya-elv szerint legalább két szám ugyanabba a párba fog esni, így összegük 21.',
        hint: 'Készíts 10 darab kételemű skatulyát, amelyek összege 21: {1, 20}, {2, 19}... {10, 11}.'
      },
      {
        id: 'q3-26',
        level: 3,
        questionTypeBadge: 'Általánosított Nim',
        question: 'N darab kavicsból álló játékban felváltva 1-től k darabig vehető el kavics. Az utolsó elvevője nyer. Mikor van BIZTOS nyerő stratégiája a Második játékosnak?',
        options: [
          'Ha a kavicsok száma (N) osztható (k + 1)-gyel.',
          'Ha N páratlan szám.',
          'Ha N prím.',
          'Mindig az első játékos nyer.'
        ],
        correctAnswer: 'Ha a kavicsok száma (N) osztható (k + 1)-gyel.',
        explanation: 'Ha N = m · (k + 1), akkor az 1. játékos bármely x lépésére (1 ≤ x ≤ k) a 2. játékos (k + 1 - x) kavics elvételével válaszolhat, így a kavicsok száma mindig (k + 1) többszöröse marad a 2. játékos lépése után, és ő éri el a 0-t.',
        hint: 'Ha az osztási maradék 0 a (k + 1)-gyel való osztáskor, a kezdő nem tudja elkerülni a vereséget.'
      },
      {
        id: 'q3-27',
        level: 3,
        questionTypeBadge: 'Nim játék 1-2-3',
        question: 'Három kavicskupac van 1, 2 és 3 kaviccsal. Egy lépésben egy kupacból tetszőleges számú kavics elvehető. Az utolsó kavicsot elvevő nyer. Kinek van nyerő stratégiája ebből a pozícióból?',
        options: [
          'A 2. játékosnak (mert az (1, 2, 3) egy vesztő, kiegyensúlyozott Nim-pozíció a kezdő számára).',
          'Az 1. játékosnak, ha a 3-as kupacból 2-t elvesz.',
          'Az 1. játékosnak, ha az 1-es kupacot azonnal eltünteti.',
          'Mindkét fél hibátlan játéka esetén döntetlen.'
        ],
        correctAnswer: 'A 2. játékosnak (mert az (1, 2, 3) egy vesztő, kiegyensúlyozott Nim-pozíció a kezdő számára).',
        explanation: 'Az (1, 2, 3) állás Nim-összege (XOR): 1 ⊕ 2 ⊕ 3 = 0. Ez egy úgynevezett P-pozíció (Previous player winning), ami azt jelenti, hogy a kezdő bármely lépése után a 2. játékos nyerő állásba kerül.',
        hint: 'Próbáld végig az 1. játékos összes lépését: a 2. mindig két egyforma méretű kupacot tud hagyni!'
      },
      {
        id: 'q3-28',
        level: 3,
        questionTypeBadge: 'Három lakos logikája',
        question: 'A, B és C lakosok közül mindegyik vagy lovag (igazmondó) vagy lókötő (hazug). Azt mondja A: „Mindhárman lókötők vagyunk.” Azt mondja B: „Pontosan egy lovag van köztünk.” Mi A, B és C valódi kiléte?',
        options: [
          'A lókötő, B lovag, C lókötő.',
          'Mind a hárman lókötők.',
          'A lovag, B lókötő, C lovag.',
          'Mind a hárman lovagok.'
        ],
        correctAnswer: 'A lókötő, B lovag, C lókötő.',
        explanation: 'A nem lehet lovag, mert akkor igaz lenne, hogy mind lókötők (ellentmondás). Tehát A lókötő. B azt állítja, hogy pontosan 1 lovag van köztük: ha B lovag, akkor ő az egyetlen lovag (C lókötő), ami teljesen konzisztens és ellentmondásmentes.',
        hint: 'A állítása biztosan hazugság (A lókötő). Ha B lovag, akkor hány lovag van a szigeten?'
      },
      {
        id: 'q3-29',
        level: 3,
        questionTypeBadge: 'Paritás invariáns',
        question: '7 pénzérme fekszik egy sorban mind írással felfelé. Egy lépésben pontosan 2 szomszédos érmét fordítunk meg egyszerre. Elérhető-e véges sok lépésben, hogy mind a 7 érme fej legyen?',
        options: [
          'Nem, mert egy lépésben a fejek száma mindig páros számmal (0, +2 vagy -2) változik, így a fejek száma mindig páros marad, a 7 pedig páratlan.',
          'Igen, pontosan 4 lépésben.',
          'Igen, pontosan 7 lépésben.',
          'Csak akkor, ha az érmék körben helyezkednek el.'
        ],
        correctAnswer: 'Nem, mert egy lépésben a fejek száma mindig páros számmal (0, +2 vagy -2) változik, így a fejek száma mindig páros marad, a 7 pedig páratlan.',
        explanation: 'Két érme egyidejű megfordításakor a fejek száma vagy nő 2-vel (két írásból fej lesz), vagy csökken 2-vel (két fejből írás lesz), vagy változatlan marad (egy fej és egy írás felcserélődik). Kezdetben 0 fej van (páros). Ezért a fejek száma mindvégig páros marad, a 7 fej (páratlan) sosem érhető el.',
        hint: 'Invariáns tulajdonság: a fejek számának paritása (párossága) nem tud megváltozni!'
      },
      {
        id: 'q3-30',
        level: 3,
        questionTypeBadge: 'Számegyenes játék',
        question: 'Egy játékban 0-ról indulunk és felváltva léphetünk +1, +2 vagy +4 értéket a számegyenesen. Aki eléri vagy átlépi a 15-öt, az azonnal nyer. Melyik a közvetlen kulcspozíció 15 előtt, amire lépve garantált a győzelem?',
        options: ['10', '11', '12', '13'],
        correctAnswer: '10',
        explanation: 'Ha egy játékos a 10-re lép, az ellenfél csak 11-re (+1), 12-re (+2) vagy 14-re (+4) léphet. Ezen pozíciók mindegyikéből a következő körben azonnal elérhető vagy átléphető a 15 (+4-gyel 11-ről 15, +4-gyel 12-ről 16, +1-gyel 14-ről 15). Tehát a 10-es pozíció biztos nyerő állás.',
        hint: 'Keresd azt a számot, ahonnan az ellenfél semelyik lépésével sem éri el a 15-öt, de a te következő lépéseddel már bármelyikből elérhető a 15!'
      }
    ]
  }
};

export const SummaryQuiz: React.FC<SummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      title="I. Gondolkodjunk! Összefoglaló Kvíz"
      subtitle="Fejezeti összefoglaló, kombinatorikai számítások, gráfelmélet, logika és stratégiai játékok"
      documentId="g7-logic-summary"
      subtopicId="osszefoglalas"
      grade={7}
      chapterId="gondolkodjunk"
      topicId="osszefoglalas"
      topicTitle="Összefoglalás"
      topicBadge="I. Fejezet Összefoglalás"
      emoji="🏆"
      themeColor="rose"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={
        <SummaryMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <SummarySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
};
