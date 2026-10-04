import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { PlottingGraphsMatcher } from './PlottingGraphsMatcher';
import { PlottingGraphsSorter } from './PlottingGraphsSorter';
import { ArrowRightLeft, LayoutGrid, Pencil, TrendingUp, Table, Compass, AlertTriangle, Layers, Maximize2 } from 'lucide-react';

interface PlottingGraphsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Grafikonrajzolás Alaplépései',
    icon: <Pencil className="w-4 h-4 text-blue-600" />,
    formula: 'f(x) = ax + b \\quad (\\text{3 pontot számolunk ki})',
    note: 'Két pont kijelöli az egyenest, a harmadik pont ellenőrzi, hogy nem történt-e számolási hiba a helyettesítésnél.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <line x1="20" y1="40" x2="140" y2="10" stroke="#2563eb" strokeWidth="2" />
        <circle cx="40" cy="35" r="3" fill="#10b981" />
        <circle cx="80" cy="25" r="3" fill="#10b981" />
        <circle cx="120" cy="15" r="3" fill="#10b981" />
        <text x="80" y="44" className="text-[6.5px] font-bold fill-slate-600" textAnchor="middle">3 pont egy egyenesen</text>
      </svg>
    )
  },
  {
    id: 'c2',
    title: 'A Lépésháromszög Szabálya',
    icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
    formula: '\\text{Meredekség } a = \\frac{\\Delta y}{\\Delta x}',
    note: 'A (0; b) pontból 1 egységet lépünk jobbra, majd "a" egységet fel (ha a > 0) vagy le (ha a < 0). Törtnél a nevezőt lépjük jobbra, a számlálót fel/le.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="45" cy="35" r="3.5" fill="#10b981" />
        <line x1="45" y1="35" x2="95" y2="35" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 1" />
        <line x1="95" y1="35" x2="95" y2="15" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 1" />
        <line x1="30" y1="41" x2="115" y2="7" stroke="#2563eb" strokeWidth="2" />
        <text x="70" y="44" className="text-[6px] font-bold fill-emerald-700" textAnchor="middle">+1 lépés jobbra</text>
        <text x="108" y="27" className="text-[6px] font-bold fill-purple-700">+a fel</text>
      </svg>
    )
  },
  {
    id: 'c3',
    title: 'Tengelyek Helyes Skálázása',
    icon: <Maximize2 className="w-4 h-4 text-blue-600" />,
    formula: '\\text{Egy tengelyen belüli lépésköz állandó}',
    note: 'A két tengely skálája ELTÉRHET egymástól (pl. x-en 1 rács = 1 óra, y-on 1 rács = 50 km), de egy tengelyen belül egyenletesnek kell lennie!',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <rect x="25" y="8" width="110" height="34" rx="5" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.2" />
        <text x="80" y="22" className="text-[7px] font-black fill-blue-900" textAnchor="middle">x: 0, 1, 2, 3...</text>
        <text x="80" y="34" className="text-[6.5px] font-bold fill-blue-700" textAnchor="middle">y: 0, 50, 100, 150...</text>
      </svg>
    )
  },
  {
    id: 'c4',
    title: 'Folytonos vs. Diszkrét Grafikon',
    icon: <Layers className="w-4 h-4 text-blue-600" />,
    formula: '\\text{Darabszám } \\implies \\text{Csak pontok!}',
    note: 'Megszámlálható dolgoknál (jegyek, személyek, füzetek) tilos összekötni a pontokat folytonos vonallal. Folytonos mennyiségeknél (idő, víz, hőfok) összekötjük.',
    figure: (
      <svg viewBox="0 0 160 50" className="w-36 h-10">
        <circle cx="35" cy="35" r="2.5" fill="#f59e0b" />
        <circle cx="55" cy="27" r="2.5" fill="#f59e0b" />
        <circle cx="75" cy="19" r="2.5" fill="#f59e0b" />
        <text x="55" y="44" className="text-[6px] font-bold fill-amber-700" textAnchor="middle">Diszkrét pontok</text>
        <line x1="105" y1="35" x2="145" y2="15" stroke="#2563eb" strokeWidth="1.8" />
        <text x="125" y="44" className="text-[6px] font-bold fill-blue-700" textAnchor="middle">Folytonos egyenes</text>
      </svg>
    )
  }
];

const quizLevels: Record<number, LevelConfig> = {
  1: {
    title: '1. Szint: Értéktáblázat és Pontok Ábrázolása',
    subtitle: 'Számolj helyettesítési értékeket, határozd meg a koordinátákat és az y-tengelymetszetet!',
    badge: '1. Szint • Kezdő',
    questions: [
      {
        id: 'q1-1',
        question: 'Mi a legelső lépés, mielőtt egy függvény grafikonját megrajzoljuk?',
        options: [
          'Tisztázzuk az értelmezési tartományt, és készítünk egy 3-5 pontból álló értéktáblázatot.',
          'Véletlenszerűen vonalakat húzunk a füzetbe.',
          'Csak az origót jelöljük meg egy nagy pöttyel.',
          'Minden számot kiszámolunk mínusz egymilliótól plusz egymillióig.'
        ],
        correctAnswer: 0,
        explanation: 'Az értelmezési tartomány határozza meg a megengedett x értékeket, az értéktáblázat pedig konkrét pontokat ad a pontos rajzoláshoz.'
      },
      {
        id: 'q1-2',
        question: 'Mennyi az f(x) = 2x - 3 függvény helyettesítési értéke az x = 0 helyen?',
        options: ['-3', '2', '0', '-1'],
        correctAnswer: 0,
        explanation: 'f(0) = 2 · 0 - 3 = 0 - 3 = -3. Ez a pont a (0; -3), ami egyben az y-tengelymetszet.'
      },
      {
        id: 'q1-3',
        question: 'Hány pont határoz meg egyértelműen egy egyenest a síkban, és miért érdemes mégis 3 pontot kiszámolni?',
        options: [
          'Két pont meghatározza az egyenest, a harmadik pont ellenőrzi, hogy nem vétettünk-e számolási hibát.',
          'Csak 1 pont kell hozzá.',
          'Legalább 100 pont kötelező.',
          'Egyenest nem lehet pontokból megrajzolni.'
        ],
        correctAnswer: 0,
        explanation: 'Két ponton mindig átfektethető egy egyenes (akkor is, ha hibás a számolás). A 3. pont megmutatja a tévedést, ha nem esik ugyanarra a vonalra.'
      },
      {
        id: 'q1-4',
        question: 'Melyik pontban metszi az f(x) = -3x + 5 függvény grafikonja az y-tengelyt?',
        options: ['(0; 5)', '(5; 0)', '(0; -3)', '(-3; 5)'],
        correctAnswer: 0,
        explanation: 'Az y-tengelyen x = 0, így f(0) = -3 · 0 + 5 = 5. A metszéspont koordinátája: (0; 5).'
      },
      {
        id: 'q1-5',
        question: 'Az alábbi pontok közül melyik illeszkedik az f(x) = 3x - 1 függvény egyenesére?',
        options: [
          '(2; 5), mert 3 · 2 - 1 = 6 - 1 = 5',
          '(2; 7), mert 3 · 2 + 1 = 7',
          '(1; 4), mert 3 + 1 = 4',
          '(0; 1), mert b = 1'
        ],
        correctAnswer: 0,
        explanation: 'Behelyettesítve x = 2-t: f(2) = 3 · 2 - 1 = 5, tehát a (2; 5) pont rajta van a grafikonon.'
      },
      {
        id: 'q1-6',
        question: 'Milyen alakú az origón (0; 0) átmenő lineáris függvények hozzárendelési szabálya?',
        options: [
          'f(x) = ax (ahol b = 0, azaz egyenes arányosság)',
          'f(x) = ax + 5',
          'f(x) = 1/x',
          'f(x) = x² + 1'
        ],
        correctAnswer: 0,
        explanation: 'Ha az egyenes átmegy az origón, akkor az y-tengelymetszete b = 0, így f(x) = ax.'
      },
      {
        id: 'q1-7',
        question: 'Mi a koordinátája annak a pontnak, amelyet úgy kapunk, hogy az origóból 4 egységet lépünk balra, majd 2 egységet fel?',
        options: ['(-4; 2)', '(4; 2)', '(-4; -2)', '(2; -4)'],
        correctAnswer: 0,
        explanation: 'Balra lépés: negatív x érték (-4), felfelé lépés: pozitív y érték (+2). A pont: (-4; 2).'
      },
      {
        id: 'q1-8',
        question: 'Az f(x) = -x + 2 függvény értéktáblázatához x = 3 esetén mekkora az y értéke?',
        options: ['-1', '5', '1', '-5'],
        correctAnswer: 0,
        explanation: 'f(3) = -(3) + 2 = -1. A kapott pont: (3; -1).'
      },
      {
        id: 'q1-9',
        question: 'Mit tegyünk, ha a kiszámolt 3 pont nem esik egy egyenesbe a vonalzó mentén?',
        options: [
          'Újraszámoljuk az értéktáblázat pontjait, mert biztosan számolási vagy leolvasási hiba történt.',
          'Görbe vonallal kötjük össze őket.',
          'Kijavítjuk a vonalzót.',
          'Csak az első két pontot kötjük össze, a harmadikat letöröljük.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel az f(x) = ax + b grafikonja szigorúan egyenes, a nem illeszkedő pont számítási vagy koordináta-felmérési hibát jelez.'
      },
      {
        id: 'q1-10',
        question: 'Mit nevezünk a függvény zérushelyének a grafikonon?',
        options: [
          'Azt az x értéket, ahol a grafikon metszi az x-tengelyt (ahol y = 0).',
          'Azt a pontot, ahol x és y is nulla (mindig az origót).',
          'Ahol a grafikon eléri a maximumát.',
          'Ahol a függvény nem értelmezhető.'
        ],
        correctAnswer: 0,
        explanation: 'A zérushely az a hely (x), ahol a függvény értéke 0, azaz a grafikon metszi az x-tengelyt.'
      }
    ]
  },
  2: {
    title: '2. Szint: Meredekség, Tengelymetszet és Lépésháromszög',
    subtitle: 'Alkalmazd a lépésháromszöget, kezeld a negatív és tört meredekségeket!',
    badge: '2. Szint • Haladó',
    questions: [
      {
        id: 'q2-1',
        question: 'Hogyan ábrázoljuk gyorsan az f(x) = 3x - 2 függvényt a lépésháromszög technikával?',
        options: [
          'Bejelöljük a (0; -2) pontot, onnan 1-et lépünk jobbra és 3-at fel, majd a két pontra illesztjük a vonalzót.',
          'Bejelöljük a (3; -2) pontot és összekötjük az origóval.',
          'Az origóból 3-at lépünk le és 2-t fel.',
          '3-at lépünk jobbra és 2-t le a (0; 0)-ból.'
        ],
        correctAnswer: 0,
        explanation: 'A b = -2 miatt a (0; -2) az y-metszet. A meredekség a = +3 miatt 1 lépés jobbra, 3 lépés fel következik.'
      },
      {
        id: 'q2-2',
        question: 'Merre lépünk a (0; b) pontból, ha a meredekség negatív, például a = -2?',
        options: [
          '1 egységet jobbra, majd 2 egységet LEFELÉ.',
          '1 egységet balra, majd 2 egységet lefelé.',
          '2 egységet jobbra, majd 1 egységet fel.',
          'Nem lehet negatív meredekségű egyenest rajzolni.'
        ],
        correctAnswer: 0,
        explanation: 'Az x mindig jobbra növekszik (+1 lépés). Ha a = -2, akkor a függvényérték csökken, tehát 2 egységet lefelé lépünk.'
      },
      {
        id: 'q2-3',
        question: 'Az f(x) = (2/5)x + 1 függvény meredeksége tört (a = 2/5). Hogyan találjuk meg a legegyszerűbben a következő egész rácspontot?',
        options: [
          'A (0; 1) pontból 5 egységet lépünk jobbra és 2 egységet fel a (5; 3) pontba.',
          '2 egységet lépünk jobbra és 5 egységet fel.',
          '1 egységet lépünk jobbra és 2,5-et fel.',
          '5 egységet lépünk le és 2-t balra.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a = delta y / delta x = 2 / 5, a nevező (5) mutatja a vízszintes lépést jobbra, a számláló (2) a függőleges emelkedést fel.'
      },
      {
        id: 'q2-4',
        question: 'Milyen alakú az f(x) = 4 konstans függvény grafikonja?',
        options: [
          'Vízszintes egyenes az y = 4 magasságban (párhuzamos az x-tengellyel).',
          'Függőleges egyenes az x = 4 helyen.',
          'Origón átmenő 45 fokos egyenes.',
          'Egyetlen pont a (4; 4) helyen.'
        ],
        correctAnswer: 0,
        explanation: 'Mivel x szorzója a = 0 (f(x) = 0x + 4), a meredeksége 0, így egy vízszintes egyenest kapunk y = 4-nél.'
      },
      {
        id: 'q2-5',
        question: 'Mit tudunk két olyan egyenesről, amelyek egyenletében a meredekség megegyezik (pl. f(x) = 2x + 1 és g(x) = 2x - 4)?',
        options: [
          'Párhuzamosak egymással, nincs közös metszéspontjuk.',
          'Merőlegesek egymásra.',
          'Egybeesnek egymással.',
          'Az origóban metszik egymást.'
        ],
        correctAnswer: 0,
        explanation: 'Ha két egyenes meredeksége egyenlő (a1 = a2) és b1 ≠ b2, akkor a két egyenes párhuzamos.'
      },
      {
        id: 'q2-6',
        question: 'Hol metszi az x-tengelyt az f(x) = 2x - 6 függvény egyenese (mi a zérushelye)?',
        options: ['x = 3 helyen (a (3; 0) pontban)', 'x = -6 helyen', 'x = -3 helyen', 'x = 6 helyen'],
        correctAnswer: 0,
        explanation: '2x - 6 = 0 -> 2x = 6 -> x = 3. Tehát a metszéspont az x-tengelyen a (3; 0).'
      },
      {
        id: 'q2-7',
        question: 'Az f(x) = -(3/2)x + 2 függvény rajzolásakor a (0; 2) pontból merre lépünk a rácshálón?',
        options: [
          '2 egységet jobbra és 3 egységet LEFELÉ a (2; -1) pontba.',
          '3 egységet jobbra és 2 egységet lefelé.',
          '2 egységet balra és 3 egységet fel.',
          '1 egységet jobbra és 1,5 egységet fel.'
        ],
        correctAnswer: 0,
        explanation: 'A nevező 2 -> 2 egység jobbra. A számláló -3 -> 3 egység le. (0 + 2; 2 - 3) = (2; -1).'
      },
      {
        id: 'q2-8',
        question: 'Melyik síknegyedeken halad át az f(x) = -2x egyenes grafikonja?',
        options: [
          'A II. és a IV. síknegyeden (áthaladva az origón).',
          'Az I. és a III. síknegyeden.',
          'Csak az I. síknegyeden.',
          'Mind a négy síknegyeden.'
        ],
        correctAnswer: 0,
        explanation: 'Origón átmenő egyenes (b = 0), és mivel a < 0 (csökkenő), a bal felső (II.) és a jobb alsó (IV.) síknegyeden halad át.'
      },
      {
        id: 'q2-9',
        question: 'Mi a meredeksége annak az egyenesnek, amely átmegy a (0; 1) és a (3; 7) pontokon?',
        options: [
          'a = (7 - 1) / (3 - 0) = 6 / 3 = 2',
          'a = (3 - 0) / (7 - 1) = 3 / 6 = 0,5',
          'a = 7 - 3 = 4',
          'a = 1 + 7 = 8'
        ],
        correctAnswer: 0,
        explanation: 'A meredekség képlete: a = delta y / delta x = (y2 - y1) / (x2 - x1) = (7 - 1) / (3 - 0) = 6 / 3 = 2.'
      },
      {
        id: 'q2-10',
        question: 'Mi történik a grafikonnal, ha az f(x) = 2x függvény képletét f(x) = 2x + 3-ra változtatjuk?',
        options: [
          'A grafikon párhuzamosan eltolódik 3 egységgel felfelé az y-tengely mentén.',
          'A grafikon 3 egységgel jobbra tolódik.',
          'A grafikon háromszor meredekebb lesz.',
          'Megfordul a dőlési iránya.'
        ],
        correctAnswer: 0,
        explanation: 'A +b konstans hozzáadása a függvény grafikonját párhuzamosan eltolja a függőleges y-tengely mentén b egységgel.'
      }
    ]
  },
  3: {
    title: '3. Szint: Skálázás, Törtek és Modellezés',
    subtitle: 'Hozz jó döntést folytonos és diszkrét ábrázolásban, kezeld a skála-eltéréseket!',
    badge: '3. Szint • Mester',
    questions: [
      {
        id: 'q3-1',
        question: 'Egy kirándulócsoport belépőjegyet vásárol a múzeumba (1500 Ft/fő). Szabad-e a kapott pontokat folytonos egyenessel összekötni?',
        options: [
          'Nem, mert a személyek száma csak nemnegatív egész szám lehet; a grafikon különálló (diszkrét) pontokból áll.',
          'Igen, minden lineáris összefüggést kötelező egyenessel összekötni.',
          'Csak akkor, ha 10-nél több jegyet vásárolnak.',
          'Csak akkor, ha diákjegyeket vesznek.'
        ],
        correctAnswer: 0,
        explanation: 'Fél vagy 3,7 ember nem vehet jegyet. Az értelmezési tartomány N, ezért a grafikon diszkrét pontok halmaza.'
      },
      {
        id: 'q3-2',
        question: 'Egy autó 80 km/h állandó sebességgel halad az autópályán 3 órán keresztül. Folytonos vagy diszkrét a grafikonja?',
        options: [
          'Folytonos egyenes szakasz, mert az idő és a távolság bármilyen tört értéket felvehet.',
          'Diszkrét pontok, mert csak óránként mérjük az utat.',
          'Egyik sem, kör alakú a grafikon.',
          'Csak szaggatott vonal lehet.'
        ],
        correctAnswer: 0,
        explanation: 'Az idő folytonosan telik (van 1,25 óra, 2,7 óra is), és a megtett távolság is folytonos, így folytonos szakaszt rajzolunk.'
      },
      {
        id: 'q3-3',
        question: 'Egy fizikai kísérletben az idő t = 0..5 másodperc, a mért feszültség pedig U = 0..250 Volt. Hogyan skálázzuk a tengelyeket?',
        options: [
          'A vízszintes tengelyen 1 rács = 0,5 másodperc, a függőlegesen 1 rács = 25 Volt lehet.',
          'Kötelező mindkét tengelyen 1 rács = 1 egységet használni, még ha 250 rács nem is fér el a füzetben.',
          'Nem szabad skálázni a tengelyeket.',
          'A feszültséget nem lehet koordináta-rendszerben ábrázolni.'
        ],
        correctAnswer: 0,
        explanation: 'A két tengely skálázása eltérhet, hogy az adatok kényelmesen és átláthatóan elférjenek a füzetben.'
      },
      {
        id: 'q3-4',
        question: 'Mit jelent a hullámos törésvonal a koordinátatengely elején?',
        options: [
          'Azt jelzi, hogy a tengely egy szakaszát kihagytuk (összenyomtuk), mert az adatok egy nagyobb számnál kezdődnek (pl. 1000-től 1050-ig).',
          'Azt jelenti, hogy a ceruza megcsúszott.',
          'Azt, hogy a függvény hibás.',
          'A hullámvonal a tenger szintjét jelöli.'
        ],
        correctAnswer: 0,
        explanation: 'A tengelytörés akkor hasznos, ha az értékek távol esnek a nullától, így elkerülhető a feleslegesen nagy üres hely.'
      },
      {
        id: 'q3-5',
        question: 'Egy taxi alapdíja 1200 Ft, és minden megtett kilométerért 400 Ft-ot számol fel. Mi a fizetendő összeg képlete és y-metszete?',
        options: [
          'f(x) = 400x + 1200, y-metszete a (0; 1200) pont.',
          'f(x) = 1200x + 400, y-metszete a (0; 400) pont.',
          'f(x) = 400x - 1200, y-metszete a (0; -1200) pont.',
          'f(x) = 1600x, y-metszete az origó.'
        ],
        correctAnswer: 0,
        explanation: 'A 0 km megtételekor is fizetendő fix alapdíj b = 1200, a kilométerenkénti díj pedig a meredekség: a = 400.'
      },
      {
        id: 'q3-6',
        question: 'Mi a súlyos hiba az alábbi beosztásban az x-tengelyen: 0, 10, 20, 50, 100 egyenlő távolságokra?',
        options: [
          'Egy tengelyen belül a lépésköznek egyenletesnek kell lennie; nem ugorhat a beosztás 10-ről 30-as vagy 50-es ugrásokra egyenlő rácsközökön.',
          'Nincs benne hiba, bármilyen számokat írhatunk.',
          'Csak páros számokat szabadna írni.',
          'A nullát nem szabad kiírni.'
        ],
        correctAnswer: 0,
        explanation: 'A skála lényege az arányosság: ha 1 rács = 10 egység, akkor minden rácsnak 10 egységet kell érnie végig a tengelyen.'
      },
      {
        id: 'q3-7',
        question: 'Egy víztartályból egyenletesen szivárog a víz: V(t) = -15t + 120 (ahol t az idő órában, V a víz literben). Mikor ürül ki teljesen a tartály?',
        options: [
          't = 8 óra múlva, mert -15t + 120 = 0 -> 15t = 120 -> t = 8.',
          't = 15 óra múlva.',
          't = 120 óra múlva.',
          'Soha nem ürül ki.'
        ],
        correctAnswer: 0,
        explanation: 'A tartály akkor üres, ha V(t) = 0 (zérushely). 120 / 15 = 8 óra.'
      },
      {
        id: 'q3-8',
        question: 'Hogyan rajzoljuk meg az f(x) = -x + 3 függvényt a [-2; 4] zárt intervallumon?',
        options: [
          'A végpontok a (-2; 5) és (4; -1) pontok, és a vonalat CSAK e két pont között húzzuk meg zárt körrel a végén.',
          'A végtelenbe nyújtjuk mindkét irányban nyíllal.',
          'Csak az origót kötjük össze a (4; 3) ponttal.',
          'Csak 1 pontot jelölünk meg.'
        ],
        correctAnswer: 0,
        explanation: 'Ha az értelmezési tartomány korlátozott intervallum, a grafikon egy véges szakasz a megadott x határok között.'
      },
      {
        id: 'q3-9',
        question: 'Egy gyertya kezdeti hossza 20 cm, és óránként 2,5 cm-t ég le. Melyik képlet és grafikon írja le a folyamatot?',
        options: [
          'h(t) = -2,5t + 20, lefelé lejtő folytonos szakasz a (0; 20)-tól a (8; 0) pontig.',
          'h(t) = 2,5t + 20, felfelé emelkedő szakasz.',
          'h(t) = -20t + 2,5, meredek zuhanás.',
          'h(t) = 20 / t, hiperbola görbe.'
        ],
        correctAnswer: 0,
        explanation: 'Kezdőérték b = 20 cm, óránként csökken a = -2,5 cm-rel. Teljes leégés 20 / 2,5 = 8 óra múlva.'
      },
      {
        id: 'q3-10',
        question: 'Miért fontos az x- és y-tengely végére kitenni a nyilat?',
        options: [
          'A nyíl mutatja meg a tengely pozitív, növekvő irányát.',
          'Csak díszítés, semmilyen matematikai jelentése nincs.',
          'Azt jelzi, hogy a grafikon ott véget ér.',
          'A koordinátarendszer szélét jelöli ki.'
        ],
        correctAnswer: 0,
        explanation: 'A szabványos koordináta-rendszerben a nyíl a tengelyek növekvő (pozitív) irányát jelöli ki.'
      }
    ]
  }
};

export const PlottingGraphsQuiz: React.FC<PlottingGraphsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Készítsünk grafikont!"
      subtitle="Értéktáblázat készítése, pontok ábrázolása, lépésháromszög, skálázás és diszkrét modellezés"
      topicBadge="8. Osztály • VI. Fejezet"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító',
          subtitle: 'Találd meg a függvények, meredekségek és lépésháromszögek párjait!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-500" />,
          levels: {
            1: {
              title: '1. Szint: Képletek és Tengelymetszetek',
              subtitle: 'Párosítsd a lineáris függvényeket a kezdőpontjukkal!',
              rangeLabel: 'Párok:',
              range: '8 pár • Képletek és metszetek',
              focus: 'Képletek & Pontok'
            },
            2: {
              title: '2. Szint: Lépésháromszög és Meredekség-Lépések',
              subtitle: 'Párosítsd a meredekségeket a rácshálón végzett lépésekkel!',
              rangeLabel: 'Párok:',
              range: '8 pár • Lépésháromszög',
              focus: 'Lépésháromszög'
            },
            3: {
              title: '3. Szint: Életszerű Modellek és Ábrázolás',
              subtitle: 'Párosítsd a valós helyzeteket a helyes ábrázolási szabállyal!',
              rangeLabel: 'Párok:',
              range: '8 pár • Modellezés & Skálázás',
              focus: 'Modellezés'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToSorter }) => (
            <PlottingGraphsMatcher
              key={`pg-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToSorter={onSwitchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a folytonos/diszkrét grafikonokat, meredekségeket és fázisokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-blue-500" />,
          levels: {
            1: {
              title: '1. Szint: Folytonos vagy Diszkrét Grafikon?',
              subtitle: 'Válogasd szét: folytonos vonal, csak pontok, vagy hibás ábrázolás!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Folytonos vs. Diszkrét'
            },
            2: {
              title: '2. Szint: Meredekségi Típusok és Irányok',
              subtitle: 'Kategorizáld: emelkedő, csökkenő vagy vízszintes egyenes!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Meredekség típusok'
            },
            3: {
              title: '3. Szint: A Grafikonkészítés 3 Fázisa',
              subtitle: 'Sorold be a teendőket: táblázat, tengelyek/skálázás vagy pontozás!',
              rangeLabel: 'Besorolás:',
              range: '12 elem • 3 csoport',
              focus: 'Grafikonkészítés lépései'
            }
          },
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz, onSwitchToMatcher }) => (
            <PlottingGraphsSorter
              key={`pg-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={onSwitchToQuiz}
              onSwitchToMatcher={onSwitchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};

export default PlottingGraphsQuiz;
