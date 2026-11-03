import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DiagramsMatcher } from './DiagramsMatcher';
import { DiagramsSorter } from './DiagramsSorter';
import {
  BarChartSvg,
  PieChartSvg,
  LineChartSvg
} from './DiagramsFigures';
import { PieChart, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';

interface DiagramsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Diagramolvasás (Könnyű)',
    subtitle: 'Oszlopdiagramok, sávdiagramok és kördiagramok egyszerű értelmezése.',
    range: '1 - 10. feladat',
    focus: 'Diagramtípusok és Értékek',
    questions: [
      {
        id: 'dq1-1',
        questionTypeBadge: 'Oszlopdiagram Leolvasása',
        question: 'Az oszlopdiagramon 4 osztály létszáma szerepel: 9.A: 25 fő, 9.B: 32 fő, 9.C: 18 fő, 9.D: 28 fő. Melyik osztály a legnépesebb?',
        figure: <BarChartSvg size={240} />,
        options: ['9.B osztály (32 fő)', '9.D osztály (28 fő)', '9.A osztály (25 fő)', '9.C osztály (18 fő)'],
        correctAnswer: 0,
        hint: 'Keresd a legmagasabb oszlopot!',
        explanation: 'A legmagasabb oszlop a 9.B osztályhoz tartozik 32 fős létszámmal.'
      },
      {
        id: 'dq1-2',
        questionTypeBadge: 'Diagramtípus Kiválasztása',
        question: 'Melyik diagramtípus a legalkalmasabb arra, hogy szemléltessük: az iskolai büfé teljes forgalmának mekkora szeletét adják a szendvicsek, üdítők és édességek?',
        options: ['Kördiagram', 'Vonaldiagram', 'Pontdiagram', 'Hisztogram'],
        correctAnswer: 0,
        hint: 'Rész-egész arányt, egy tortaszerű felosztást szeretnénk látni.',
        explanation: 'A kördiagram a legideálisabb eszköz a részek teljes egészhez (100%-hoz) viszonyított arányának megjelenítésére.'
      },
      {
        id: 'dq1-3',
        questionTypeBadge: 'Kördiagram Egyszerű Értelmezése',
        question: 'Egy kördiagramon egy szektor pontosan félkört alkot (180°-os középponti szög). A teljes sokaság hány százalékát képviseli ez a szektor?',
        figure: <PieChartSvg size={220} />,
        options: ['50%', '25%', '75%', '100%'],
        correctAnswer: 0,
        hint: 'A teljes kör 360°, a 180° ennek a fele.',
        explanation: '180° / 360° = 1/2 = 50%.'
      },
      {
        id: 'dq1-4',
        questionTypeBadge: 'Összegzés Diagramról',
        question: 'Négy osztály tanulói: 25, 32, 18, 28 fő. Hány diák jár összesen a négy 9. osztályba?',
        options: ['103 fő', '98 fő', '105 fő', '95 fő'],
        correctAnswer: 0,
        hint: 'Add össze a négy értéket: 25 + 32 + 18 + 28.',
        explanation: '25 + 32 + 18 + 28 = 103 fő a teljes évfolyam létszáma.'
      },
      {
        id: 'dq1-5',
        questionTypeBadge: 'Kördiagram Negyedkör',
        question: 'Hány fokos középponti szög tartozik egy kördiagramon a 25%-os részarányhoz?',
        options: ['90°', '45°', '60°', '120°'],
        correctAnswer: 0,
        hint: '25% a teljes 360° negyedrésze: 360° / 4.',
        explanation: '360° · 0,25 = 90° (derékszög).'
      },
      {
        id: 'dq1-6',
        questionTypeBadge: 'Vonaldiagram Értelmezése',
        question: 'Egy vonaldiagramon a hétfői hőmérséklet 14 °C, a szerdai 24 °C. Hány fokkal emelkedett a hőmérséklet hétfőtől szerdáig?',
        figure: <LineChartSvg size={240} />,
        options: ['10 °C-kal', '14 °C-kal', '8 °C-kal', '12 °C-kal'],
        correctAnswer: 0,
        hint: 'Vond ki a hétfői értéket a szerdaiból: 24 - 14.',
        explanation: '24 °C - 14 °C = 10 °C növekedés.'
      },
      {
        id: 'dq1-7',
        questionTypeBadge: 'Sávdiagram Jellemzője',
        question: 'Miben tér el a sávdiagram az oszlopdiagramtól?',
        options: [
          'A sávdiagramon a téglalapok vízszintes irányban fekszenek',
          'A sávdiagramon nem lehet számértékeket ábrázolni',
          'A sávdiagram csak negatív számokra használható',
          'Nincs különbség, mindkettő kör alakú'
        ],
        correctAnswer: 0,
        hint: 'Gondolj a fekvő sávokra!',
        explanation: 'A sávdiagramon a sávok vízszintes elrendezésűek, ami különösen előnyös, ha a kategóriák nevei hosszúak.'
      },
      {
        id: 'dq1-8',
        questionTypeBadge: 'Diagram Olvasása',
        question: 'Egy könyvtár kölcsönzési adatai: Hétfő: 40, Kedd: 65, Szerda: 50, Csütörtök: 80, Péntek: 95. Melyik napon volt a legkisebb a forgalom?',
        options: ['Hétfő', 'Szerda', 'Kedd', 'Péntek'],
        correctAnswer: 0,
        hint: 'Keresd a legkisebb számot a listában.',
        explanation: 'A 40 kölcsönzés a hétfői naphoz tartozik, ez a hét minimuma.'
      },
      {
        id: 'dq1-9',
        questionTypeBadge: 'Oszlopok Szélessége',
        question: 'Helyes-e, ha egy oszlopdiagramon az egyik kategória oszlopát kétszer olyan szélesre rajzoljuk, mint a többit?',
        options: [
          'Nem, mert a vizuális terület megtévesztő módon négyszeres hatást kelt',
          'Igen, ha az adott kategóriát ki akarjuk emelni',
          'Igen, a szélesség tetszőlegesen változhat minden oszlopnál',
          'Csak akkor, ha a magassága nulla'
        ],
        correctAnswer: 0,
        hint: 'Az oszlopdiagramon KIZÁRÓLAG a magasság hordoz információt.',
        explanation: 'Az oszlopok szélességének mindig azonosnak kell lennie, különben a terület aránytalanul megnő és félrevezeti az olvasót.'
      },
      {
        id: 'dq1-10',
        questionTypeBadge: 'Kördiagram Egész',
        question: 'Mennyi a kördiagram összes körcikkének középponti szögének összege?',
        options: ['360°', '180°', '100°', '720°'],
        correctAnswer: 0,
        hint: 'Egy teljes kör hány fokos?',
        explanation: 'A teljes kör lefedése miatt a szektorszögek összege mindig pontosan 360° (ami 100%-nak felel meg).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kördiagram Szögei és Százalékszámítás (Közepes)',
    subtitle: 'Középponti szög kiszámítása, szektorból százalék és darabszám meghatározása.',
    range: '11 - 20. feladat',
    focus: 'Középponti Szögek és Arányok',
    questions: [
      {
        id: 'dq2-1',
        questionTypeBadge: 'Középponti Szög Kiszámítása',
        question: 'Egy iskolában a diákok 40%-a választotta az angol nyelvet. Hány fokos körcikk tartozik ehhez a kördiagramon?',
        options: ['144°', '120°', '100°', '160°'],
        correctAnswer: 0,
        hint: 'α = 40 · 3,6° (vagy a 360° 40%-a: 0,4 · 360°).',
        explanation: 'α = 0,4 · 360° = 144°. (Minden 10% = 36°, tehát 4 · 36° = 144°).'
      },
      {
        id: 'dq2-2',
        questionTypeBadge: 'Középponti Szögből Százalék',
        question: 'Egy kördiagramon a „Kerékpárral érkezők” körcikkének középponti szöge 54°. A megkérdezettek hány százaléka jár kerékpárral?',
        options: ['15%', '18%', '12%', '20%'],
        correctAnswer: 0,
        hint: 'p% = (54° / 360°) · 100% (vagy 54 / 3,6).',
        explanation: '54° / 360° = 3/20 = 0,15 = 15%.'
      },
      {
        id: 'dq2-3',
        questionTypeBadge: 'Körcikkből Létszám Számítása',
        question: 'Egy 600 fős középiskolában a kollégisták szektorszöge 72° a kördiagramon. Hány diák lakik kollégiumban?',
        options: ['120 diák', '100 diák', '150 diák', '72 diák'],
        correctAnswer: 0,
        hint: '72° a 360° ötödrésze (72 / 360 = 0,2 = 20%). Számold ki a 600 diák 20%-át!',
        explanation: '72° / 360° = 0,2 (20%). A kollégisták száma: 600 · 0,2 = 120 diák.'
      },
      {
        id: 'dq2-4',
        questionTypeBadge: 'Harmadrész Szöge',
        question: 'Ha egy tortadiagramon az egyik kategória a teljes mennyiség pontosan 1/3 részét képviseli, mekkora a középponti szöge?',
        options: ['120°', '90°', '100°', '135°'],
        correctAnswer: 0,
        hint: 'Oszd el a 360°-ot 3-mal!',
        explanation: '360° / 3 = 120°.'
      },
      {
        id: 'dq2-5',
        questionTypeBadge: 'Hiányzó Szektor Szöge',
        question: 'Egy 3 szektorból álló kördiagramon két szektor szöge 110° és 130°. Mekkora a harmadik szektor szöge?',
        options: ['120°', '115°', '130°', '100°'],
        correctAnswer: 0,
        hint: 'A három szög összege 360°: 360° - (110° + 130°).',
        explanation: '360° - (110° + 130°) = 360° - 240° = 120°.'
      },
      {
        id: 'dq2-6',
        questionTypeBadge: '1%-os Egységérték',
        question: 'Hány fokos középponti szög felel meg pontosan 1% részesedésnek a kördiagramon?',
        options: ['3,6°', '1,0°', '3,0°', '0,36°'],
        correctAnswer: 0,
        hint: '360° / 100.',
        explanation: 'Mivel 100% = 360°, ezért 1% = 360° / 100 = 3,6°.'
      },
      {
        id: 'dq2-7',
        questionTypeBadge: 'Oszlopdiagram Arányos Következtetés',
        question: 'Egy oszlopdiagramon 1 cm oszlopmagasság 50 ezer Ft bevételt jelent. Milyen magas oszlop ábrázolja a 350 ezer Ft-os bevételt?',
        options: ['7 cm', '6 cm', '8 cm', '5 cm'],
        correctAnswer: 0,
        hint: '350 / 50.',
        explanation: '350 ezer / 50 ezer = 7 cm magas oszlop szükséges.'
      },
      {
        id: 'dq2-8',
        questionTypeBadge: 'Csoportosított Oszlopdiagram',
        question: 'Egy csoportosított oszlopdiagramon minden évnél két oszlop áll: lányok (kék) és fiúk (zöld). Mire alkalmas ez az elrendezés?',
        options: [
          'Egyidejűleg mutatja a két nem arányát és azok évről évre történő változását',
          'Kizárólag a fiúk adatainak ábrázolására jó',
          'Csak akkor használható, ha pontosan ugyanannyi lány és fiú van',
          'A teljes kör felosztását jelzi'
        ],
        correctAnswer: 0,
        hint: 'A két oszlop egymás mellett teszi lehetővé az összehasonlítást kategóriánként.',
        explanation: 'A csoportosított oszlopdiagram segítségével egyszerre több alcsoport (pl. nemek) értékeit és időbeli alakulását is összevethetjük.'
      },
      {
        id: 'dq2-9',
        questionTypeBadge: 'Kördiagram Ellenőrzése',
        question: 'Egy diák kördiagramot rajzol 4 kategóriára, és a következő szögeket méri ki: 80°, 100°, 120°, 70°. Helyes a rajza?',
        options: [
          'Nem, mert a szögek összege 370°, ami meghaladja a 360°-ot',
          'Igen, mert minden szög kisebb 180°-nál',
          'Igen, a kördiagramnál megengedett a túllépés',
          'Nem, mert nincs benne derékszög'
        ],
        correctAnswer: 0,
        hint: 'Add össze a négy szöget: 80 + 100 + 120 + 70.',
        explanation: '80° + 100° + 120° + 70° = 370° ≠ 360°. A szögösszeg hibás, így a diagram pontatlan.'
      },
      {
        id: 'dq2-10',
        questionTypeBadge: 'Halmozott Oszlopdiagram',
        question: 'Egy halmozott (stacked) oszlopdiagramon egy oszlop teljes magassága mit ábrázol?',
        options: [
          'Az adott kategóriához tartozó összes részösszeg együttes értékét (összegét)',
          'Mindig a részek átlagát',
          'A legnagyobb részértéket önmagában',
          'A részek különbségét'
        ],
        correctAnswer: 0,
        hint: 'A rétegek egymásra vannak pakolva, mint a téglák egy falban.',
        explanation: 'A halmozott oszlopdiagramon az egymásra helyezett sávok összeadódnak, így az oszlop teteje a kategória teljes összegét jelzi.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Trendek, Megtévesztő Diagramok és Elemzések (Nehéz)',
    subtitle: 'Manipulatív ábrázolások leleplezése, trendek, mozgóátlagok és statisztikai következtetések.',
    range: '21 - 30. feladat',
    focus: 'Kritikus Diagramértelmezés',
    questions: [
      {
        id: 'dq3-1',
        questionTypeBadge: 'Megtévesztő Diagram Leleplezése',
        question: 'Egy híradóban bemutatott oszlopdiagramon az „A” párt oszlopa háromszor magasabb a „B” párténál. A számok viszont: A = 42%, B = 38%. Mi a manipuláció oka?',
        options: [
          'A függőleges tengely nem 0-ról indul, hanem 36%-ról (csonkolt tengely)',
          'Az A párt oszlopa szélesebb',
          'A színek nem megfelelőek',
          'Nincs hiba, a 42% tényleg háromszorosa a 38%-nak'
        ],
        correctAnswer: 0,
        hint: 'Ha levágjuk a tengely alját, a kis különbség óriásinak látszik.',
        explanation: 'A csonkolt tengely (truncated axis) miatt a 36-tól 42-ig terjedő sáv (6 egység) háromszorosa a 36-tól 38-ig terjedő sávnak (2 egység). Ez durván megtévesztő vizuális torzítás.'
      },
      {
        id: 'dq3-2',
        questionTypeBadge: 'Vonaldiagram Trendjének Értelmezése',
        question: 'Egy cég részvényárfolyamának vonaldiagramján az elmúlt évben a pontok egy balról jobbra lefelé tartó egyenes mentén helyezkednek el. Mi mondható el a trendről?',
        options: ['Monoton csökkenő tendencia', 'Monoton növekvő tendencia', 'Stagnáló érték', 'Periodikus ingadozás'],
        correctAnswer: 0,
        hint: 'Ha az idő múlásával az árfolyam csökken, a tendencia lefelé mutat.',
        explanation: 'A lefelé tartó görbe negatív meredekséget, azaz csökkenő tendenciát (trendet) jelent.'
      },
      {
        id: 'dq3-3',
        questionTypeBadge: '3D Hatás Veszélye',
        question: 'Miért nem ajánlott statisztikailag a 3D-s kördiagramok használata?',
        options: [
          'A perspektivikus torzítás miatt az elöl fekvő körcikkek nagyobbnak látszanak a valóságosnál',
          'Mert a számítógép lassabban jeleníti meg',
          'Mert a 3D-s diagramon nem lehet színeket használni',
          'Mert a szögek összege 720°-ra változik'
        ],
        correctAnswer: 0,
        hint: 'Gondolj arra, hogyan torzítja el a döntött látószög a távoli és közeli részeket!',
        explanation: 'A 3D perspektíva miatt a nézőhöz közelebb eső körcikk szöge és területe jóval nagyobbnak tűnik, ami torzítja a korrekt adatolvasást.'
      },
      {
        id: 'dq3-4',
        questionTypeBadge: 'Középponti Szög Törtszámoknál',
        question: 'Egy mintában 12,5% a selejtes termékek aránya. Mekkora középponti szög tartozik ehhez a kördiagramon?',
        options: ['45°', '40°', '50°', '36°'],
        correctAnswer: 0,
        hint: '12,5% a 25% (90°) fele, vagyis a 100% egynyolcada (360° / 8).',
        explanation: '12,5% = 1/8 rész. α = 360° / 8 = 45°.'
      },
      {
        id: 'dq3-5',
        questionTypeBadge: 'Vonaldiagram vs. Oszlopdiagram Választás',
        question: 'Egy kísérletben egy folyadék hőmérsékletét percenként mérik 20 percen keresztül. Melyik diagramtípus mutatja meg a legszemléletesebben a lehűlés folyamatát?',
        options: ['Vonaldiagram', 'Kördiagram', 'Sávdiagram', 'Piktogram'],
        correctAnswer: 0,
        hint: 'Folytonos időbeli folyamatról van szó!',
        explanation: 'A folyamatos időbeli változások és fizikai folyamatok dinamikájának követésére a vonaldiagram a legtökéletesebb választás.'
      },
      {
        id: 'dq3-6',
        questionTypeBadge: 'Piktogram Torzítása',
        question: 'Egy újságban az autógyártás megduplázódását úgy ábrázolják, hogy a rajzolt autó magasságát és hosszúságát is kétszeresére növelik. Hányszorosára nőtt az autó területe?',
        options: ['Négyszeresére (4x)', 'Kétszeresére (2x)', 'Nyolcszorosára (8x)', 'Másfélszeresére'],
        correctAnswer: 0,
        hint: 'Hasonló síkidomok területe a hasonlósági arány négyzetével arányos: 2² = 4.',
        explanation: 'Mivel a rajz mindkét dimenziója (hossz és magasság) kétszeresére nőtt, a terület 2² = 4-szeresére növekedett, ami megtévesztően négyszeresnek láttatja a duplázódást.'
      },
      {
        id: 'dq3-7',
        questionTypeBadge: 'Összetett Kördiagram Számítás',
        question: 'Egy 500 fős közvélemény-kutatásban 3 kategória van. Az A szektor 144°-os, a B szektor 108°-os. Hány ember tartozik a C kategóriába?',
        options: ['150 fő', '125 fő', '175 fő', '200 fő'],
        correctAnswer: 0,
        hint: 'Számold ki a C szektor szögét: 360° - (144° + 108°) = 108°. Ezután (108° / 360°) · 500.',
        explanation: 'A C szektor szöge: 360° - 252° = 108°. Aránya: 108° / 360° = 0,3 (30%). C létszáma: 500 · 0,3 = 150 fő.'
      },
      {
        id: 'dq3-8',
        questionTypeBadge: 'Szélsőérték Leolvasása Grafikonról',
        question: 'Egy nap 24 órájának hőmérsékleti vonaldiagramján a görbe legmagasabb pontja délután 14:00-kor található 28 °C értéknél. Mit jelent ez matematikailag?',
        options: [
          'A napi hőmérsékletfüggvény abszolút maximumhelye t = 14 óra, maximumértéke 28 °C',
          'A zérushely t = 14 óra',
          'A nap átlaghőmérséklete 28 °C',
          'A minimumhely t = 14 óra'
        ],
        correctAnswer: 0,
        hint: 'A csúcs az a pont, ahol a függvény a legnagyobb értéket veszi fel.',
        explanation: 'A legmagasabb pont koordinátái: x = 14 (maximumhely), y = 28 (maximumérték).'
      },
      {
        id: 'dq3-9',
        questionTypeBadge: 'Skála Eltorzítása X Tengelyen',
        question: 'Egy vonaldiagram vízszintes tengelyén az időpontok: 2010, 2011, 2012, 2020. Az osztásközök a rajzon teljesen egyenlőek. Mi a hiba?',
        options: [
          'Az utolsó szakasz 8 évet fed le, míg a korábbiak 1-1 évet, mégis egyenlő távolságra rajzolták őket',
          'Nem lehet évszámokat az X tengelyre tenni',
          '2020 nem szökőév',
          'Csak 5 évenkénti adatokat szabad ábrázolni'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg a különbségeket: 1 év, 1 év, majd hirtelen 8 év!',
        explanation: 'Az aránytalan időlépték (egyenlőtlen időközök azonos fizikai távolságon) eltorzítja a folyamat valódi meredekségét és sebességét.'
      },
      {
        id: 'dq3-10',
        questionTypeBadge: 'Gyakorisági Poligon',
        question: 'Mi a gyakorisági poligon az oszlopdiagramhoz viszonyítva?',
        options: [
          'Az oszlopok felső élének felezőpontjait összekötő töröttvonal',
          'Egy sokszög alakú tortadiagram',
          'Kizárólag szabályos ötszögekből álló rajz',
          'A negatív értékek ábrázolása'
        ],
        correctAnswer: 0,
        hint: 'Az oszlopok tetejének közepét pontokkal jelöljük meg és vonallal kötjük össze.',
        explanation: 'A gyakorisági poligon az oszlopdiagram oszloptetőinek felezőpontjait összekötő vonaldiagram, amely folytonosabb képet ad az eloszlásról.'
      }
    ]
  }
};

const diagramsCheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Kördiagram szektorszög',
    description: 'A 100% részesedés a teljes 360°-nak felel meg. 1% részesedés pontosan 3,6°.',
    formula: 'α = (p / 100) · 360° = p · 3,6°',
    badge: 'Kördiagram',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  },
  {
    title: 'Nevezetes szektorszögek',
    description: '50% = 180°, 25% = 90°, 33,3% = 120°, 12,5% = 45°, 10% = 36°.',
    formula: '1/2 ➔ 180° | 1/4 ➔ 90° | 1/3 ➔ 120°',
    badge: 'Gyorsértékek',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    title: 'Oszlop- és sávdiagram',
    description: 'Diszkrét kategóriák összehasonlítására. Csak a magasság (hossz) hordoz jelentést!',
    formula: 'Magasság ~ Gyakoriság | Szélesség állandó',
    badge: 'Oszlopdiagram',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    title: 'Csonkolt tengely veszélye',
    description: 'Ha a függőleges skála nem 0-ról indul, a vizuális arányok torzulnak és megtévesztőek!',
    formula: 'Kezdőérték = 0 (aránytartás)',
    badge: 'Kritikus szemlélet',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  }
];

export const DiagramsQuiz: React.FC<DiagramsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="2. Diagramok Kvíz"
      subtitle="Gyakorold az oszlop-, sáv-, kör- és vonaldiagramok olvasását, középponti szögek számítását és manipulatív ábrák felismerését 3 szinten!"
      badge="9. Osztály • V. Függvények"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 2. DIAGRAMOK"
      chapterId="fuggvenyek"
      topicId="g9-func-diagramok-quiz"
      topicTitle="2. Diagramok"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetTitle="Diagramok Segédlet"
      cheatSheetCards={diagramsCheatSheetCards}
      levelsConfig={quizLevels}
      matcherComponent={
        <DiagramsMatcher
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <DiagramsSorter
          onBack={onBack}
          onSwitchToQuiz={() => {}}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

