import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CombinatoricsPracticeMatcher } from './CombinatoricsPracticeMatcher';
import { CombinatoricsPracticeSorter } from './CombinatoricsPracticeSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';
import {
  CompleteGraph5Svg,
  RoundTableSvg,
  PigeonholeSvg,
  PodiumSvg,
  DigitSlotsSvg,
  BlockSeatingSvg,
  DegreeParitySvg,
  PolygonDiagonalsSvg
} from './CombinatoricsPracticeFigures';

interface CombinatoricsPracticeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Kombinatorikai Feladatok (Könnyű)',
    subtitle: 'Számalkotás, sorbarendezések, kézfogások és a Dirichlet-elv alapjai.',
    range: '1 - 10. feladat',
    focus: 'Alapismeretek és Gyors Számítások',
    questions: [
      {
        id: 'cpq1-1',
        questionTypeBadge: 'Számok Darabszáma',
        question: 'Hány háromjegyű pozitív egész szám létezik összesen a tízes számrendszerben?',
        figure: (
          <DigitSlotsSvg
            slots={[
              { label: 'Százasok', count: '9', note: '1..9 (nem 0)', color: '#ec4899' },
              { label: 'Tízesek', count: '10', note: '0..9', color: '#6366f1' },
              { label: 'Egyesek', count: '10', note: '0..9', color: '#10b981' }
            ]}
            size={185}
          />
        ),
        options: ['900 szám', '1 000 szám', '999 szám', '899 szám'],
        correctAnswer: 0,
        hint: 'A háromjegyű számok 100-tól 999-ig tartanak: 999 - 100 + 1.',
        explanation: 'A százasok helyére 9 jegy mehet (1..9), a tízesekre és egyesekre 10-10 jegy (0..9): 9 · 10 · 10 = 900 szám létezik.'
      },
      {
        id: 'cpq1-2',
        questionTypeBadge: 'Könyvek a Polcon',
        question: 'Hányféleképpen rakhatunk sorba 5 különböző könyvet egy könyvespolcon?',
        options: ['120 féleképpen', '25 féleképpen', '60 féleképpen', '720 féleképpen'],
        correctAnswer: 0,
        hint: '5 különböző elem permutációja: 5! = 5 · 4 · 3 · 2 · 1.',
        explanation: 'Az 5 könyv sorbarendezésének száma 5! = 5 · 4 · 3 · 2 · 1 = 120.'
      },
      {
        id: 'cpq1-3',
        questionTypeBadge: 'Kézfogások Száma',
        question: 'Hány kézfogás történik egy 6 fős társaságban, ha mindenki mindenkivel pontosan egyszer kezet fog?',
        figure: <CompleteGraph5Svg size={145} />,
        options: ['15 kézfogás', '30 kézfogás', '36 kézfogás', '12 kézfogás'],
        correctAnswer: 0,
        hint: 'Használd a kézfogási képletet: n · (n - 1) / 2.',
        explanation: '(6 · 5) / 2 = 30 / 2 = 15 kézfogás történik.'
      },
      {
        id: 'cpq1-4',
        questionTypeBadge: 'Körasztal Körüli Ülés',
        question: 'Hányféleképpen ülhet le 5 ember egy kerek asztal köré, ha a forgatási változatokat nem tekintjük különbözőnek?',
        figure: <RoundTableSvg seatsCount={5} size={150} />,
        options: ['24 féleképpen', '120 féleképpen', '60 féleképpen', '12 féleképpen'],
        correctAnswer: 0,
        hint: 'Körasztalnál a forgatási szimmetria miatt a képlet: (n - 1)!.',
        explanation: 'Egy ember helyét rögzítve a maradék 4 ember (5 - 1)! = 4! = 24-féleképpen ülhet le.'
      },
      {
        id: 'cpq1-5',
        questionTypeBadge: 'Páratlan Jegyű Számok',
        question: 'Hány olyan kétjegyű pozitív egész szám van, amelynek mindkét számjegye páratlan?',
        options: ['25 szám', '20 szám', '45 szám', '50 szám'],
        correctAnswer: 0,
        hint: 'A páratlan számjegyek az {1, 3, 5, 7, 9} (5 darab). Mindkét helyre 5 jegy választható.',
        explanation: 'A tízesek helyére 5 páratlan jegy mehet, az egyesekre szintén 5 páratlan jegy: 5 · 5 = 25 szám.'
      },
      {
        id: 'cpq1-6',
        questionTypeBadge: 'Skatulya-elv: Golyók',
        question: 'Egy dobozban 10 piros és 10 kék golyó van. Legalább hány golyót kell kihúznunk vakon, hogy biztosan legyen köztük legalább egy azonos színű pár?',
        figure: <PigeonholeSvg pigeons={3} holes={2} size={155} />,
        options: ['3 golyót', '11 golyót', '2 golyót', '21 golyót'],
        correctAnswer: 0,
        hint: 'A skatulyák száma a színek száma (2). Legrosszabb esetben 1 pirosat és 1 kéket húzunk (2 golyó).',
        explanation: 'A legrosszabb esetben az első 2 golyó különböző színű. A 3. golyó színe már biztosan megegyezik valamelyik korábbival, így 3 golyó kell.'
      },
      {
        id: 'cpq1-7',
        questionTypeBadge: 'Dobogósok Kiválasztása',
        question: 'Egy 7 fős futóversenyen hányféleképpen oszthatók ki a dobogós érmek (arany, ezüst, bronz)?',
        figure: <PodiumSvg size={145} />,
        options: ['210 féleképpen', '343 féleképpen', '42 féleképpen', '120 féleképpen'],
        correctAnswer: 0,
        hint: 'Arany: 7, ezüst: 6, bronz: 5 választási lehetőség: 7 · 6 · 5.',
        explanation: 'A sorrend számít: 7 · 6 · 5 = 210 különböző dobogó alakulhat ki.'
      },
      {
        id: 'cpq1-8',
        questionTypeBadge: 'Teljes Gráf Élei',
        question: 'Hány éle van egy 5 csúcsú teljes gráfnak (amelyben minden csúcs össze van kötve minden más csúccsal)?',
        figure: <CompleteGraph5Svg size={160} />,
        options: ['10 éle', '20 éle', '5 éle', '25 éle'],
        correctAnswer: 0,
        hint: 'A teljes gráf éleinek száma: (5 · 4) / 2.',
        explanation: 'Egy 5 csúcsú teljes gráfban (5 · 4) / 2 = 10 él van.'
      },
      {
        id: 'cpq1-9',
        questionTypeBadge: 'Banki PIN Kódok',
        question: 'Hány 4-jegyű bankkártya PIN kód készíthető a 0–9 számjegyekből, ha a jegyek ismétlődhetnek?',
        options: ['10 000 kód', '9 000 kód', '5 040 kód', '1 000 kód'],
        correctAnswer: 0,
        hint: 'Minden mezőbe 10 számjegy kerülhet: 10⁴.',
        explanation: 'A PIN kódnál a 0 is állhat elöl: 10 · 10 · 10 · 10 = 10⁴ = 10 000 különböző kód létezik.'
      },
      {
        id: 'cpq1-10',
        questionTypeBadge: 'Születési Hónapok',
        question: 'Legalább hány ember kell ahhoz, hogy biztosan legyen köztük kettő, aki ugyanabban a naptári hónapban született?',
        figure: <PigeonholeSvg pigeons={13} holes={12} size={165} />,
        options: ['13 ember', '12 ember', '24 ember', '25 ember'],
        correctAnswer: 0,
        hint: 'Az évben 12 hónap van (12 skatulya).',
        explanation: 'A Dirichlet-elv szerint, ha 13 embert osztunk szét 12 hónapba, a skatulyák száma kevesebb, mint az embereké (13 > 12), így legalább kettő azonos hónapban született.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számalkotás és Megkötéses Feladatok (Közepes)',
    subtitle: 'Nulla kezelése, paritási feltételek, blokk-trükk és gráfelméleti összefüggések.',
    range: '11 - 20. feladat',
    focus: 'Összetett Szabályok és Esetszétválasztás',
    questions: [
      {
        id: 'cpq2-1',
        questionTypeBadge: 'Nullát Tartalmazó Készlet',
        question: 'Hány 3-jegyű, különböző számjegyekből álló szám készíthető a {0, 1, 2, 3, 4} halmaz elemeiből?',
        figure: (
          <DigitSlotsSvg
            slots={[
              { label: 'Százasok', count: '4', note: '1..4 (nem 0)', color: '#ec4899' },
              { label: 'Tízesek', count: '4', note: '0 visszalép', color: '#6366f1' },
              { label: 'Egyesek', count: '3', note: 'maradék', color: '#10b981' }
            ]}
            size={185}
          />
        ),
        options: ['48 szám', '60 szám', '100 szám', '64 szám'],
        correctAnswer: 0,
        hint: 'Az első helyre a 0 nem mehet (4 lehetőség). A második helyre a maradék 4 jegy (visszajön a 0), a harmadikra 3 jegy.',
        explanation: 'Százasok: 4 lehetőség ({1,2,3,4}). Tízesek: 4 lehetőség. Egyesek: 3 lehetőség. Összesen: 4 · 4 · 3 = 48 szám.',
        breakdown: [
          'Százasok helye: 4 (nem lehet 0)',
          'Tízesek helye: 4 (a 0 visszajön, de az előző kiesik)',
          'Egyesek helye: 3 (már felhasználtak kiesnek)',
          'Eredmény: 4 · 4 · 3 = 48'
        ]
      },
      {
        id: 'cpq2-2',
        questionTypeBadge: 'Csupa Páros Jegy',
        question: 'Hány olyan 3-jegyű pozitív egész szám van, amelynek minden számjegye páros?',
        options: ['100 szám', '125 szám', '500 szám', '80 szám'],
        correctAnswer: 0,
        hint: 'Páros jegyek: {0, 2, 4, 6, 8}. A százasok helyére a 0 nem kerülhet (4 lehetőség), a többire mind az 5 jegy mehet.',
        explanation: 'Százasok: 4 (2, 4, 6, 8). Tízesek: 5 (0, 2, 4, 6, 8). Egyesek: 5 (0, 2, 4, 6, 8). Összesen: 4 · 5 · 5 = 100 szám.'
      },
      {
        id: 'cpq2-3',
        questionTypeBadge: 'Blokk-módszer',
        question: '5 barát leül egy padba. Hányféleképpen ülhetnek le, ha Anna és Béla egymás mellett akar ülni?',
        figure: <BlockSeatingSvg size={180} />,
        options: ['48 féleképpen', '24 féleképpen', '60 féleképpen', '72 féleképpen'],
        correctAnswer: 0,
        hint: 'Anna és Béla egy blokk [AB]. 4 blokk sorrendje 4! = 24. A blokkon belüli sorrend 2! = 2.',
        explanation: 'A 4 egység sorrendje 4! = 24. Anna és Béla egymás közötti sorrendje 2! = 2: 24 · 2 = 48.'
      },
      {
        id: 'cpq2-4',
        questionTypeBadge: 'Komplementer Elv',
        question: '5 barát leül egy padba. Hányféleképpen ülhetnek le, ha Anna és Béla NEM ülhet egymás mellett?',
        options: ['72 féleképpen', '48 féleképpen', '96 féleképpen', '60 féleképpen'],
        correctAnswer: 0,
        hint: 'Összes lehetséges eset (5! = 120) mínusz az egymás mellett ülős esetek (48).',
        explanation: 'Összes eset = 5! = 120. Egymás mellett ülnek = 48. Nem ülnek egymás mellett = 120 - 48 = 72.'
      },
      {
        id: 'cpq2-5',
        questionTypeBadge: 'Körmérkőzéses Torna',
        question: 'Egy 8 csapatos kézilabda-bajnokságban minden csapat mindenkivel pontosan egyszer játszik. Hány mérkőzést rendeznek összesen?',
        figure: <CompleteGraph5Svg size={145} />,
        options: ['28 mérkőzést', '56 mérkőzést', '64 mérkőzést', '32 mérkőzést'],
        correctAnswer: 0,
        hint: '8 csapatból 2 csapat kiválasztása egy meccsre: (8 · 7) / 2.',
        explanation: 'Minden csapat 7 meccset játszik (8 · 7 = 56), de minden meccsen 2 csapat játszik: 56 / 2 = 28 mérkőzés.'
      },
      {
        id: 'cpq2-6',
        questionTypeBadge: 'Legrosszabb Eset Elve',
        question: 'Egy dobozban 5 piros, 7 kék és 9 zöld ceruza van. Legalább hányat kell kihúznunk vakon, hogy biztosan legyen köztük legalább egy zöld ceruza?',
        options: ['13 ceruzát', '10 ceruzát', '14 ceruzát', '21 ceruzát'],
        correctAnswer: 0,
        hint: 'A legrosszabb esetben kihúzzuk az összes nem zöld (piros és kék) ceruzát.',
        explanation: 'Nem zöld ceruzák száma = 5 + 7 = 12. Ha mind a 12 nem zöldet kihúzzuk, a következő (13.) ceruza már garantáltan zöld lesz: 12 + 1 = 13.'
      },
      {
        id: 'cpq2-7',
        questionTypeBadge: 'Felváltva Ülés',
        question: 'Hányféleképpen ülhet le 3 fiú és 3 lány egy padba úgy, hogy a nemek felváltva következzenek?',
        figure: <RoundTableSvg seatsCount={6} alternating={true} size={150} />,
        options: ['72 féleképpen', '36 féleképpen', '144 féleképpen', '720 féleképpen'],
        correctAnswer: 0,
        hint: 'Kétféle mintázat van (FLFLFL vagy LFLFLF): 2 · 3! · 3!.',
        explanation: 'A két kezdés (fiú vagy lány) miatt 2-szeres szorzó van. A fiúk 3! = 6, a lányok 3! = 6 módon ülhetnek: 2 · 6 · 6 = 72.'
      },
      {
        id: 'cpq2-8',
        questionTypeBadge: 'Gráf Fokszámösszeg',
        question: 'Egy 6 csúcsú egyszerű gráfban a csúcsok fokszámai rendre: 2, 3, 3, 4, 4 és x. Milyen paritású lehet az x csúcs fokszáma?',
        figure: <DegreeParitySvg size={155} />,
        options: ['Csak páros lehet', 'Csak páratlan lehet', 'Bármilyen lehet', 'Nem létezhet ilyen gráf'],
        correctAnswer: 0,
        hint: 'A fokszámok összege mindig páros, így a páratlan fokszámú csúcsok száma csak páros lehet!',
        explanation: 'A megadott fokszámok között két páratlan van (3 és 3). Mivel a páratlan fokszámú csúcsok száma csak páros lehet, az x nem lehet páratlan (mert akkor 3 páratlan lenne), tehát x csak páros lehet.'
      },
      {
        id: 'cpq2-9',
        questionTypeBadge: 'Oszthatósági Feltétel',
        question: 'Hány 4-jegyű 5-tel osztható szám alkotható az {1, 2, 3, 4, 5} jegyekből, ha a számjegyek ismétlődhetnek?',
        options: ['125 szám', '625 szám', '24 szám', '500 szám'],
        correctAnswer: 0,
        hint: 'Egy szám akkor osztható 5-tel, ha 0-ra vagy 5-re végződik. Itt az utolsó jegy csak 5 lehet (1 lehetőség).',
        explanation: 'Az 1., 2. és 3. helyiértékre bármelyik számjegy mehet az 5 közül (5 · 5 · 5 = 125). Az utolsó jegynek kötelezően 5-nek kell lennie: 125 · 1 = 125 szám.'
      },
      {
        id: 'cpq2-10',
        questionTypeBadge: 'Tantárgyak Rendezése',
        question: 'Hányféleképpen rendezhető el a polcon 4 matek és 3 történelem könyv úgy, hogy a történelem könyvek egymás mellett legyenek?',
        options: ['720 féleképpen', '144 féleképpen', '5 040 féleképpen', '288 féleképpen'],
        correctAnswer: 0,
        hint: 'A 3 törikönyvet egy blokkba vonjuk. A blokk + 4 matekkönyv = 5 elem (5! = 120). A törikönyvek belső sorrendje 3! = 6.',
        explanation: 'Az 5 egység sorrendje 5! = 120. A törikönyvek belső sorrendje 3! = 6: 120 · 6 = 720 sorrend lehetséges.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Versenyfeladatok és Bizonyítások (Nehéz)',
    subtitle: 'Gráfelméleti lemmák, Dirichlet-elv általánosítása, anagrammák és összetett sziták.',
    range: '21 - 30. feladat',
    focus: 'Mesterfok és Magas Szintű Logika',
    questions: [
      {
        id: 'cpq3-1',
        questionTypeBadge: 'Gráf Létezése',
        question: 'Létezhet-e olyan 5 fős társaság, amelyben mindenkinek pontosan 3 ismerőse van a társaságból?',
        figure: <DegreeParitySvg size={160} />,
        options: [
          'Nem létezhet, mert a fokszámok összege 15 lenne (páratlan szám)',
          'Igen, minden 5 fős csoportban létezhet ilyen ismeretség',
          'Csak akkor, ha van legalább egy közös barátjuk',
          'Igen, ez egy 5 csúcsú szabályos kört alkotna'
        ],
        correctAnswer: 0,
        hint: 'Euler kézfogási tétele szerint a fokszámok összege mindig 2 · élek száma, ami páros kell legyen.',
        explanation: 'Az 5 fős társaságban a fokszámok összege 5 · 3 = 15 lenne, ami páratlan szám. Mivel a fokszámok összege mindig 2 · élek száma (páros), ilyen gráf és társaság nem létezhet.'
      },
      {
        id: 'cpq3-2',
        questionTypeBadge: 'Körasztal Blokk-elv',
        question: '6 ember ül le egy kerek asztalhoz. Hányféleképpen ülhetnek le, ha Anna és Béla egymás mellett akar ülni?',
        figure: <RoundTableSvg seatsCount={6} highlightBlock={true} size={150} />,
        options: ['48 féleképpen', '24 féleképpen', '120 féleképpen', '96 féleképpen'],
        correctAnswer: 0,
        hint: 'Az [AB] blokkot 1 egységnek véve 5 egységet ültetünk körasztalhoz: (5-1)! = 24. A blokk belső sorrendje 2! = 2.',
        explanation: 'Az 5 egység körasztalnál (5 - 1)! = 4! = 24 módon ülhet le. Anna és Béla 2! módon helyezkedhet el a blokkban: 24 · 2 = 48.'
      },
      {
        id: 'cpq3-3',
        questionTypeBadge: 'Dirichlet Általánosítása',
        question: 'Egy 30 fős osztályban legalább hány diáknak kell azonos napon (hétfőtől vasárnapig) születnie a hét 7 napja közül?',
        figure: <PigeonholeSvg pigeons={30} holes={7} size={165} />,
        options: ['Legalább 5 diáknak', 'Legalább 4 diáknak', 'Legalább 3 diáknak', 'Legalább 2 diáknak'],
        correctAnswer: 0,
        hint: 'Oszd el a diákok számát a napok számával: 30 / 7 = 4,28, és vedd a felső egészrészt!',
        explanation: 'Ha minden napra legfeljebb 4 diák születésnapja esne, összesen legfeljebb 4 · 7 = 28 diák lenne. Mivel 30 diák van (30 > 28), legalább egy napra legalább 5 diák születése esik.'
      },
      {
        id: 'cpq3-4',
        questionTypeBadge: 'Konvex Sokszög Átlói',
        question: 'Hány átlója van egy 9 csúcsú konvex sokszögnek?',
        figure: <PolygonDiagonalsSvg size={145} />,
        options: ['27 átlója', '36 átlója', '18 átlója', '45 átlója'],
        correctAnswer: 0,
        hint: 'A sokszög átlóinak száma: n · (n - 3) / 2.',
        explanation: 'Az átlók száma: 9 · (9 - 3) / 2 = (9 · 6) / 2 = 27 átló.'
      },
      {
        id: 'cpq3-5',
        questionTypeBadge: 'Ismétléses Anagramma',
        question: 'A „KOKTÉL” szó betűiből hány különböző 6 betűs karaktersorozat (anagramma) képezhető? (A K betű kétszer szerepel!)',
        options: ['360 anagramma', '720 anagramma', '180 anagramma', '120 anagramma'],
        correctAnswer: 0,
        hint: '6 betű sorbarendezése 6! = 720 lenne, de a 2 azonos K betű cseréje nem hoz új szót, így osztani kell 2!-sal.',
        explanation: '6! / 2! = 720 / 2 = 360 különböző anagramma készíthető.'
      },
      {
        id: 'cpq3-6',
        questionTypeBadge: 'Komplementer Számalkotás',
        question: 'Hány olyan 4-jegyű pozitív egész szám van, amelynek a leírásában szerepel legalább egy 0 számjegy?',
        options: ['2 439 szám', '9 000 szám', '6 561 szám', '3 000 szám'],
        correctAnswer: 0,
        hint: 'Összes 4-jegyű szám (9000) mínusz azok, amelyekben egyetlen 0 sincs (9 · 9 · 9 · 9 = 6561).',
        explanation: 'Összes 4-jegyű szám = 9000. Csupa nullamentes számok = 9 · 9 · 9 · 9 = 6561. Legalább egy nullát tartalmazó = 9000 - 6561 = 2439.'
      },
      {
        id: 'cpq3-7',
        questionTypeBadge: 'Körasztal Felváltva',
        question: '4 fiú és 4 lány ül le egy 8 fős kerek asztalhoz úgy, hogy fiúk és lányok felváltva következzenek. Hányféle ülésrend lehetséges?',
        figure: <RoundTableSvg seatsCount={8} alternating={true} size={150} />,
        options: ['144 féleképpen', '576 féleképpen', '72 féleképpen', '288 féleképpen'],
        correctAnswer: 0,
        hint: 'A fiúk körasztalhoz ültetése: (4-1)! = 6. A maradék 4 székre a 4 lány 4! = 24 módon ülhet: 6 · 24.',
        explanation: 'A 4 fiú leültetése körasztalhoz: (4 - 1)! = 3! = 6. A kialakult 4 rögzített székre a lányok 4! = 24 módon ülhetnek: 6 · 24 = 144.'
      },
      {
        id: 'cpq3-8',
        questionTypeBadge: 'Egyenrangú Csoport',
        question: 'Egy 10 fős társaságból egy 3 fős munkabizottságot jelölnek ki. Hányféleképpen tehetik meg, ha a tagok között nincs rangsor?',
        options: ['120 féleképpen', '720 féleképpen', '240 féleképpen', '360 féleképpen'],
        correctAnswer: 0,
        hint: 'Sorrenddel 10 · 9 · 8 = 720. Mivel a 3 fő sorrendje nem számít, osztani kell 3! = 6-tal.',
        explanation: '(10 · 9 · 8) / 3! = 720 / 6 = 120-féleképpen választható ki a bizottság.'
      },
      {
        id: 'cpq3-9',
        questionTypeBadge: 'Esetszétválasztás TOTÓ',
        question: 'Hányféleképpen alakulhat egy 5 mérkőzésből álló TOTÓ szelvény kitöltése (1, 2, X tippek), ha legfeljebb egyetlen döntetlen (X) szerepelhet a szelvényen?',
        options: ['112 féleképpen', '243 féleképpen', '32 féleképpen', '80 féleképpen'],
        correctAnswer: 0,
        hint: 'Két eset: 0 darab X (csak 1 vagy 2: 2⁵ = 32) VAGY 1 darab X (az X helye 5-féle, a többi 4 helyre 1 vagy 2: 5 · 2⁴ = 80).',
        explanation: '0 darab X: 2⁵ = 32 lehetőség. Pontosan 1 darab X: 5 · 2⁴ = 5 · 16 = 80 lehetőség. Összesen: 32 + 80 = 112 kitöltés.'
      },
      {
        id: 'cpq3-10',
        questionTypeBadge: 'Két Szélen Rögzített',
        question: '6 barát ül le egy padra. Hányféleképpen ülhetnek le úgy, hogy a 2 legmagasabb diák a pad két szélén foglaljon helyet?',
        options: ['48 féleképpen', '24 féleképpen', '72 féleképpen', '12 féleképpen'],
        correctAnswer: 0,
        hint: 'A két szélső helyre a 2 legmagasabb diák 2! = 2 módon ülhet le. A belső 4 székre a maradék 4 diák 4! = 24 módon.',
        explanation: 'Szélső helyek: 2! = 2 lehetőség. Belső helyek: 4! = 24 lehetőség: 2 · 24 = 48 különböző ülésrend.'
      }
    ]
  }
};

const practiceCheatSheets: CheatSheetCard[] = [
  {
    id: 'pcs-1',
    title: 'Számalkotási Alapszabályok',
    formula: 'Négyjegyű szám: 9 · 10 · 10 · 10 = 9 000 | Kód: 10⁴ = 10 000',
    description: 'Valódi többjegyű számnál a 0 nem állhat az élen. Kódoknál a 0 is megengedett első karakter.',
    note: 'Különböző jegyek: a választható jegyek száma lépésről lépésre 1-gyel csökken.',
    figure: <DigitSlotsSvg size={150} />,
    color: 'rose'
  },
  {
    id: 'pcs-2',
    title: 'Ültetési és Sorbarendezési Trükkök',
    formula: 'Blokk: (k)! · 2! | Nem együtt: Összes − Együtt | Kör: (n-1)!',
    description: 'Egymás mellett ülőket egy blokkba vonunk. Nem egymás mellett ülőknél a komplementer elv a leggyorsabb.',
    note: 'Körasztalnál a forgatás miatt mindig n-nel osztunk: n! / n = (n-1)!.',
    figure: <RoundTableSvg seatsCount={5} highlightBlock={true} size={135} />,
    color: 'purple'
  },
  {
    id: 'pcs-3',
    title: 'Kézfogási Lemma és Gráfok',
    formula: '\\sum \\text{fokszámok} = 2 \\cdot E \\quad | \\quad \\text{Élek: } \\frac{n(n-1)}{2}',
    description: 'A fokszámok összege mindig páros szám! Ebből következik: a páratlan fokszámú csúcsok száma csak páros lehet.',
    note: 'Kézfogásoknál, körmérkőzéseknél és gráf éleinél mindig osztunk 2-vel.',
    figure: <CompleteGraph5Svg size={135} />,
    color: 'emerald'
  },
  {
    id: 'pcs-4',
    title: 'Dirichlet Skatulya-elve',
    formula: 'N > k \\implies \\text{legalább 2} \\quad | \\quad \\lceil N / k \\rceil',
    description: 'Ha N tárgyat k skatulyába teszünk és N > k, akkor legalább egy skatulyába legalább 2 tárgy kerül.',
    note: 'Példa: 13 ember között biztosan van 2 azonos születési hónappal.',
    figure: <PigeonholeSvg pigeons={13} holes={12} size={150} />,
    color: 'amber'
  }
];

export const CombinatoricsPracticeQuiz: React.FC<CombinatoricsPracticeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Kombinatorika Gyakorló Kvíz"
      subtitle="Számalkotás, ültetési rendek, kézfogások, gráfok és skatulya-elv 30 feladatban"
      badgeText="9. OSZTÁLY • I. KOMBINATORIKA, HALMAZOK • 🎯 GYAKORLÓ KVÍZ"
      themeColor="rose"
      levels={quizLevels}
      topicId="g9-komb-gyakorlas-quiz"
      topicTitle="Gyakorlás (Kombinatorika)"
      grade={9}
      chapterId="kombinatorika-halmazok"
      cheatSheetCards={practiceCheatSheets}
      cheatSheetTitle="Kombinatorika Összefoglaló Segédlet"
      emoji="📝"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a feladatokat és a helyes képleteket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <CombinatoricsPracticeMatcher
              key={`comb-practice-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a feladatokat módszer és nagyságrend szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <CombinatoricsPracticeSorter
              key={`comb-practice-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default CombinatoricsPracticeQuiz;
